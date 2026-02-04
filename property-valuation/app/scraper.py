"""
Web scraper for Zillow and Redfin property data.

Uses API endpoints where possible for more reliable data retrieval.
"""
import re
import time
import json
import logging
from typing import Optional
from dataclasses import dataclass
from urllib.parse import quote_plus, quote

import requests
from bs4 import BeautifulSoup

from config import Config

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class PropertyData:
    """Data class to hold scraped property information."""
    source: str
    address: str
    estimate: Optional[float] = None
    rent_estimate: Optional[float] = None
    last_sold_price: Optional[float] = None
    last_sold_date: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[float] = None
    square_footage: Optional[int] = None
    lot_size: Optional[int] = None
    year_built: Optional[int] = None
    property_type: Optional[str] = None
    price_history: Optional[list] = None
    error: Optional[str] = None
    raw_data: Optional[dict] = None


class ZillowScraper:
    """Scraper for Zillow property data using their search API."""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
        })

    def _parse_price(self, price_str) -> Optional[float]:
        """Parse price string to float."""
        if price_str is None:
            return None
        if isinstance(price_str, (int, float)):
            return float(price_str)
        cleaned = re.sub(r'[^\d.]', '', str(price_str))
        try:
            return float(cleaned)
        except (ValueError, TypeError):
            return None

    def scrape(self, address: str) -> PropertyData:
        """
        Scrape Zillow for property data.

        Args:
            address: Full property address

        Returns:
            PropertyData object with scraped information
        """
        result = PropertyData(source='zillow', address=address)

        try:
            # Try the Zillow search/property page
            encoded_address = quote(address.replace(',', '').replace(' ', '-'))

            # Method 1: Try direct property URL pattern
            urls_to_try = [
                f"https://www.zillow.com/homes/{quote_plus(address)}_rb/",
                f"https://www.zillow.com/homedetails/{encoded_address}",
            ]

            for url in urls_to_try:
                logger.info(f"Trying Zillow URL: {url}")
                try:
                    response = self.session.get(url, timeout=15, allow_redirects=True)

                    if response.status_code == 200:
                        # Look for JSON data in the page
                        data = self._extract_data_from_page(response.text)
                        if data:
                            result.estimate = data.get('zestimate')
                            result.rent_estimate = data.get('rentZestimate')
                            result.bedrooms = data.get('bedrooms')
                            result.bathrooms = data.get('bathrooms')
                            result.square_footage = data.get('livingArea')
                            result.lot_size = data.get('lotSize')
                            result.year_built = data.get('yearBuilt')
                            result.last_sold_price = data.get('lastSoldPrice')
                            result.raw_data = data

                            if result.estimate:
                                logger.info(f"Zillow estimate found: ${result.estimate:,.0f}")
                                return result

                except requests.RequestException as e:
                    logger.warning(f"Request failed for {url}: {e}")
                    continue

            # If we get here, scraping failed
            result.error = "Could not retrieve Zillow estimate. Try entering manually."

        except Exception as e:
            logger.error(f"Zillow scraping error: {e}")
            result.error = str(e)

        return result

    def _extract_data_from_page(self, html: str) -> Optional[dict]:
        """Extract property data from Zillow page HTML."""
        try:
            soup = BeautifulSoup(html, 'lxml')

            # Look for __NEXT_DATA__ script tag (Next.js data)
            script = soup.find('script', {'id': '__NEXT_DATA__'})
            if script and script.string:
                try:
                    data = json.loads(script.string)
                    # Navigate to property data
                    props = data.get('props', {}).get('pageProps', {})

                    # Try different paths
                    property_data = (
                        props.get('initialReduxState', {}).get('gdp', {}).get('building') or
                        props.get('componentProps', {}).get('gdpClientCache', {}) or
                        props.get('property') or
                        {}
                    )

                    # If gdpClientCache, need to extract the first property
                    if isinstance(property_data, dict) and not property_data.get('zestimate'):
                        for key, value in property_data.items():
                            if isinstance(value, dict) and 'property' in value:
                                property_data = value.get('property', {})
                                break

                    if property_data:
                        return {
                            'zestimate': self._parse_price(property_data.get('zestimate')),
                            'rentZestimate': self._parse_price(property_data.get('rentZestimate')),
                            'bedrooms': property_data.get('bedrooms'),
                            'bathrooms': property_data.get('bathrooms'),
                            'livingArea': property_data.get('livingArea'),
                            'lotSize': property_data.get('lotSize'),
                            'yearBuilt': property_data.get('yearBuilt'),
                            'lastSoldPrice': self._parse_price(property_data.get('lastSoldPrice')),
                        }
                except json.JSONDecodeError:
                    pass

            # Fallback: Look for preloaded state
            for script in soup.find_all('script'):
                if script.string and 'gdpClientCache' in script.string:
                    match = re.search(r'"zestimate"\s*:\s*(\d+)', script.string)
                    if match:
                        return {'zestimate': float(match.group(1))}

            # Fallback: Parse HTML directly
            zestimate_elem = soup.select_one('[data-testid="zestimate-text"]')
            if zestimate_elem:
                return {'zestimate': self._parse_price(zestimate_elem.get_text())}

        except Exception as e:
            logger.error(f"Error extracting Zillow data: {e}")

        return None


class RedfinScraper:
    """Scraper for Redfin property data using their API."""

    SEARCH_URL = "https://www.redfin.com/stingray/do/location-autocomplete"
    INITIAL_INFO_URL = "https://www.redfin.com/stingray/api/home/details/initialInfo"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.redfin.com/',
        })

    def _parse_price(self, price_str) -> Optional[float]:
        """Parse price string to float."""
        if price_str is None:
            return None
        if isinstance(price_str, (int, float)):
            return float(price_str)
        cleaned = re.sub(r'[^\d.]', '', str(price_str))
        try:
            return float(cleaned)
        except (ValueError, TypeError):
            return None

    def _clean_json_response(self, text: str) -> str:
        """Clean Redfin's JSON response (removes prefix)."""
        # Redfin prepends responses with {}&&
        if text.startswith('{}&&'):
            return text[4:]
        return text

    def scrape(self, address: str) -> PropertyData:
        """
        Scrape Redfin for property data.

        Args:
            address: Full property address

        Returns:
            PropertyData object with scraped information
        """
        result = PropertyData(source='redfin', address=address)

        try:
            # Step 1: Search for the property to get its URL/ID
            search_params = {
                'location': address,
                'v': '2',
            }

            logger.info(f"Searching Redfin for: {address}")
            search_response = self.session.get(
                self.SEARCH_URL,
                params=search_params,
                timeout=15
            )

            if search_response.status_code != 200:
                result.error = f"Redfin search failed: HTTP {search_response.status_code}"
                return result

            search_text = self._clean_json_response(search_response.text)

            try:
                search_data = json.loads(search_text)
            except json.JSONDecodeError:
                result.error = "Could not parse Redfin search response"
                return result

            # Extract property URL from search results
            property_url = None
            payload = search_data.get('payload', {})

            # Try exactMatch first
            exact_match = payload.get('exactMatch', {})
            if exact_match and exact_match.get('url'):
                property_url = exact_match.get('url')
            else:
                # Try sections
                sections = payload.get('sections', [])
                for section in sections:
                    rows = section.get('rows', [])
                    for row in rows:
                        if row.get('url'):
                            property_url = row.get('url')
                            break
                    if property_url:
                        break

            if not property_url:
                result.error = "Property not found on Redfin"
                return result

            # Step 2: Get property details page
            full_url = f"https://www.redfin.com{property_url}"
            logger.info(f"Fetching Redfin property: {full_url}")

            property_response = self.session.get(full_url, timeout=15)

            if property_response.status_code == 200:
                data = self._extract_data_from_page(property_response.text)
                if data:
                    result.estimate = data.get('avm')
                    result.rent_estimate = data.get('rentAvm')
                    result.bedrooms = data.get('beds')
                    result.bathrooms = data.get('baths')
                    result.square_footage = data.get('sqFt')
                    result.lot_size = data.get('lotSize')
                    result.year_built = data.get('yearBuilt')
                    result.last_sold_price = data.get('lastSoldPrice')
                    result.last_sold_date = data.get('lastSoldDate')
                    result.raw_data = data

                    if result.estimate:
                        logger.info(f"Redfin estimate found: ${result.estimate:,.0f}")
                    return result

            result.error = "Could not retrieve Redfin estimate. Try entering manually."

        except Exception as e:
            logger.error(f"Redfin scraping error: {e}")
            result.error = str(e)

        return result

    def _extract_data_from_page(self, html: str) -> Optional[dict]:
        """Extract property data from Redfin page HTML."""
        try:
            soup = BeautifulSoup(html, 'lxml')

            # Look for preloaded data in scripts
            for script in soup.find_all('script'):
                if not script.string:
                    continue

                # Look for initialData or reactServerState
                if 'root.__reactServerState' in script.string or 'window.__PRELOADED_STATE__' in script.string:
                    # Try to extract AVM value
                    avm_match = re.search(r'"avm"\s*:\s*\{\s*"value"\s*:\s*(\d+)', script.string)
                    price_match = re.search(r'"price"\s*:\s*(\d+)', script.string)
                    beds_match = re.search(r'"beds"\s*:\s*(\d+)', script.string)
                    baths_match = re.search(r'"baths"\s*:\s*([\d.]+)', script.string)
                    sqft_match = re.search(r'"sqFt"\s*:\s*\{\s*"value"\s*:\s*(\d+)', script.string)
                    year_match = re.search(r'"yearBuilt"\s*:\s*\{\s*"value"\s*:\s*(\d+)', script.string)

                    data = {}
                    if avm_match:
                        data['avm'] = float(avm_match.group(1))
                    if price_match and not data.get('avm'):
                        data['avm'] = float(price_match.group(1))
                    if beds_match:
                        data['beds'] = int(beds_match.group(1))
                    if baths_match:
                        data['baths'] = float(baths_match.group(1))
                    if sqft_match:
                        data['sqFt'] = int(sqft_match.group(1))
                    if year_match:
                        data['yearBuilt'] = int(year_match.group(1))

                    if data:
                        return data

            # Fallback: Parse HTML elements
            estimate_elem = soup.select_one('.avm-price, .estimated-value')
            if estimate_elem:
                return {'avm': self._parse_price(estimate_elem.get_text())}

        except Exception as e:
            logger.error(f"Error extracting Redfin data: {e}")

        return None


class PropertyScraper:
    """
    Main interface for scraping property data from multiple sources.
    """

    def __init__(self):
        self.zillow_scraper = ZillowScraper()
        self.redfin_scraper = RedfinScraper()

    def scrape_all(self, address: str) -> dict:
        """
        Scrape property data from all sources.

        Args:
            address: Full property address

        Returns:
            Dictionary with data from each source
        """
        results = {
            'zillow': None,
            'redfin': None,
            'errors': [],
        }

        # Scrape Zillow
        logger.info("Starting Zillow scrape...")
        zillow_data = self.zillow_scraper.scrape(address)
        if zillow_data.error:
            results['errors'].append(f"Zillow: {zillow_data.error}")
        results['zillow'] = zillow_data

        # Small delay between sources
        time.sleep(1)

        # Scrape Redfin
        logger.info("Starting Redfin scrape...")
        redfin_data = self.redfin_scraper.scrape(address)
        if redfin_data.error:
            results['errors'].append(f"Redfin: {redfin_data.error}")
        results['redfin'] = redfin_data

        return results

    def get_aggregated_data(self, address: str) -> dict:
        """
        Get aggregated property data from all sources.

        Args:
            address: Full property address

        Returns:
            Dictionary with aggregated and source-specific data
        """
        raw_results = self.scrape_all(address)

        zillow = raw_results['zillow']
        redfin = raw_results['redfin']

        aggregated = {
            'address': address,
            'zillow_estimate': zillow.estimate if zillow else None,
            'zillow_rent_estimate': zillow.rent_estimate if zillow else None,
            'redfin_estimate': redfin.estimate if redfin else None,
            'last_sold_price': None,
            'last_sold_date': None,
            'bedrooms': None,
            'bathrooms': None,
            'square_footage': None,
            'lot_size': None,
            'year_built': None,
            'property_type': None,
            'errors': raw_results['errors'],
            'raw_zillow': zillow,
            'raw_redfin': redfin,
        }

        # Prefer Zillow data, fall back to Redfin
        for source in [zillow, redfin]:
            if source:
                if aggregated['last_sold_price'] is None and source.last_sold_price:
                    aggregated['last_sold_price'] = source.last_sold_price
                    aggregated['last_sold_date'] = source.last_sold_date

                if aggregated['bedrooms'] is None and source.bedrooms:
                    aggregated['bedrooms'] = source.bedrooms

                if aggregated['bathrooms'] is None and source.bathrooms:
                    aggregated['bathrooms'] = source.bathrooms

                if aggregated['square_footage'] is None and source.square_footage:
                    aggregated['square_footage'] = source.square_footage

                if aggregated['lot_size'] is None and source.lot_size:
                    aggregated['lot_size'] = source.lot_size

                if aggregated['year_built'] is None and source.year_built:
                    aggregated['year_built'] = source.year_built

                if aggregated['property_type'] is None and source.property_type:
                    aggregated['property_type'] = source.property_type

        return aggregated
