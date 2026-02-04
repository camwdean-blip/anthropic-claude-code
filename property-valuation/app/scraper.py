"""
Web scraper for Zillow and Redfin property data.

Note: Web scraping may be against the Terms of Service of these websites.
Use responsibly and consider using official APIs when available.
"""
import re
import time
import json
import logging
from typing import Optional
from dataclasses import dataclass
from urllib.parse import quote_plus

import requests
from bs4 import BeautifulSoup

try:
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from webdriver_manager.chrome import ChromeDriverManager
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False

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


class BaseScraper:
    """Base class for property scrapers."""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': Config.USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        self.timeout = Config.SCRAPING_TIMEOUT
        self.retry_attempts = Config.SCRAPING_RETRY_ATTEMPTS
        self.delay = Config.SCRAPING_DELAY

    def _get_with_retry(self, url: str) -> Optional[requests.Response]:
        """Make HTTP request with retry logic."""
        for attempt in range(self.retry_attempts):
            try:
                time.sleep(self.delay)  # Rate limiting
                response = self.session.get(url, timeout=self.timeout)
                if response.status_code == 200:
                    return response
                elif response.status_code == 403:
                    logger.warning(f"Access forbidden (403) on attempt {attempt + 1}")
                elif response.status_code == 429:
                    logger.warning(f"Rate limited (429), waiting longer...")
                    time.sleep(self.delay * 3)
                else:
                    logger.warning(f"HTTP {response.status_code} on attempt {attempt + 1}")
            except requests.RequestException as e:
                logger.error(f"Request failed on attempt {attempt + 1}: {e}")

        return None

    def _parse_price(self, price_str: str) -> Optional[float]:
        """Parse price string to float."""
        if not price_str:
            return None
        # Remove currency symbols, commas, and whitespace
        cleaned = re.sub(r'[^\d.]', '', str(price_str))
        try:
            return float(cleaned)
        except (ValueError, TypeError):
            return None

    def _parse_int(self, value: str) -> Optional[int]:
        """Parse string to integer."""
        if not value:
            return None
        cleaned = re.sub(r'[^\d]', '', str(value))
        try:
            return int(cleaned)
        except (ValueError, TypeError):
            return None


class ZillowScraper(BaseScraper):
    """Scraper for Zillow property data."""

    BASE_URL = "https://www.zillow.com"

    def __init__(self):
        super().__init__()
        self.session.headers.update({
            'Referer': 'https://www.zillow.com/',
        })

    def _build_search_url(self, address: str) -> str:
        """Build Zillow search URL from address."""
        encoded_address = quote_plus(address)
        return f"{self.BASE_URL}/homes/{encoded_address}_rb/"

    def _extract_json_data(self, soup: BeautifulSoup) -> Optional[dict]:
        """Extract JSON data embedded in Zillow page."""
        # Look for the __NEXT_DATA__ script tag
        script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
        if script_tag:
            try:
                data = json.loads(script_tag.string)
                return data
            except json.JSONDecodeError:
                pass

        # Alternative: Look for preloaded state
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string and 'window.__PRELOADED_STATE__' in script.string:
                try:
                    match = re.search(r'window\.__PRELOADED_STATE__\s*=\s*({.+?});', script.string, re.DOTALL)
                    if match:
                        return json.loads(match.group(1))
                except (json.JSONDecodeError, AttributeError):
                    pass

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
            url = self._build_search_url(address)
            logger.info(f"Scraping Zillow: {url}")

            response = self._get_with_retry(url)
            if not response:
                result.error = "Failed to fetch Zillow page after retries"
                return result

            soup = BeautifulSoup(response.text, 'lxml')

            # Try to extract JSON data first (most reliable)
            json_data = self._extract_json_data(soup)
            if json_data:
                result.raw_data = json_data
                self._parse_json_data(result, json_data)
                return result

            # Fallback to HTML parsing
            self._parse_html_data(result, soup)

        except Exception as e:
            logger.error(f"Zillow scraping error: {e}")
            result.error = str(e)

        return result

    def _parse_json_data(self, result: PropertyData, data: dict):
        """Parse JSON data from Zillow page."""
        try:
            # Navigate through the JSON structure (varies by page type)
            props = data.get('props', {}).get('pageProps', {})

            # Try different paths for property data
            property_data = (
                props.get('initialReduxState', {}).get('gdp', {}).get('building', {}) or
                props.get('property', {}) or
                props.get('initialData', {}).get('property', {}) or
                {}
            )

            if property_data:
                result.estimate = self._parse_price(property_data.get('zestimate'))
                result.rent_estimate = self._parse_price(property_data.get('rentZestimate'))
                result.bedrooms = self._parse_int(property_data.get('bedrooms'))
                result.bathrooms = property_data.get('bathrooms')
                result.square_footage = self._parse_int(property_data.get('livingArea'))
                result.lot_size = self._parse_int(property_data.get('lotSize'))
                result.year_built = self._parse_int(property_data.get('yearBuilt'))
                result.property_type = property_data.get('homeType')

                # Price history
                price_history = property_data.get('priceHistory', [])
                if price_history:
                    result.price_history = price_history
                    # Find last sale
                    for event in price_history:
                        if event.get('event') in ['Sold', 'SOLD']:
                            result.last_sold_price = self._parse_price(event.get('price'))
                            result.last_sold_date = event.get('date')
                            break

        except Exception as e:
            logger.error(f"Error parsing Zillow JSON: {e}")

    def _parse_html_data(self, result: PropertyData, soup: BeautifulSoup):
        """Fallback HTML parsing for Zillow data."""
        try:
            # Try to find Zestimate
            zestimate_elem = soup.find('span', {'data-testid': 'zestimate-text'})
            if zestimate_elem:
                result.estimate = self._parse_price(zestimate_elem.get_text())

            # Try to find price
            price_elem = soup.find('span', {'data-testid': 'price'})
            if price_elem and not result.estimate:
                result.estimate = self._parse_price(price_elem.get_text())

            # Property details
            beds_elem = soup.find('span', {'data-testid': 'bed-bath-item'})
            if beds_elem:
                beds_text = beds_elem.get_text()
                beds_match = re.search(r'(\d+)\s*bd', beds_text, re.I)
                if beds_match:
                    result.bedrooms = int(beds_match.group(1))

                baths_match = re.search(r'(\d+\.?\d*)\s*ba', beds_text, re.I)
                if baths_match:
                    result.bathrooms = float(baths_match.group(1))

            sqft_elem = soup.find('span', text=re.compile(r'sqft', re.I))
            if sqft_elem:
                sqft_text = sqft_elem.find_parent().get_text() if sqft_elem.find_parent() else sqft_elem.get_text()
                sqft_match = re.search(r'([\d,]+)\s*sqft', sqft_text, re.I)
                if sqft_match:
                    result.square_footage = self._parse_int(sqft_match.group(1))

        except Exception as e:
            logger.error(f"Error parsing Zillow HTML: {e}")


class RedfinScraper(BaseScraper):
    """Scraper for Redfin property data."""

    BASE_URL = "https://www.redfin.com"
    SEARCH_API = "https://www.redfin.com/stingray/do/location-autocomplete"

    def __init__(self):
        super().__init__()
        self.session.headers.update({
            'Referer': 'https://www.redfin.com/',
        })

    def _search_property(self, address: str) -> Optional[str]:
        """Search for property and get URL."""
        try:
            params = {
                'location': address,
                'v': '2',
            }
            response = self.session.get(
                self.SEARCH_API,
                params=params,
                timeout=self.timeout
            )

            if response.status_code == 200:
                # Redfin returns JSON with extra characters
                text = response.text
                if text.startswith('{}&&'):
                    text = text[4:]

                data = json.loads(text)
                results = data.get('payload', {}).get('exactMatch', {})
                if results:
                    url = results.get('url')
                    if url:
                        return self.BASE_URL + url

                # Try sections
                sections = data.get('payload', {}).get('sections', [])
                for section in sections:
                    rows = section.get('rows', [])
                    if rows:
                        url = rows[0].get('url')
                        if url:
                            return self.BASE_URL + url

        except Exception as e:
            logger.error(f"Redfin search error: {e}")

        return None

    def _extract_json_data(self, soup: BeautifulSoup) -> Optional[dict]:
        """Extract JSON data embedded in Redfin page."""
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string and 'window.__PRELOADED_STATE__' in script.string:
                try:
                    match = re.search(r'window\.__PRELOADED_STATE__\s*=\s*({.+?});?\s*(?:</script>|window\.)', script.string, re.DOTALL)
                    if match:
                        return json.loads(match.group(1))
                except (json.JSONDecodeError, AttributeError):
                    pass

            # Alternative pattern
            if script.string and 'reactServerState' in script.string:
                try:
                    match = re.search(r'"reactServerState"\s*:\s*({.+?})\s*,\s*"', script.string, re.DOTALL)
                    if match:
                        return json.loads(match.group(1))
                except (json.JSONDecodeError, AttributeError):
                    pass

        return None

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
            # First, search for the property to get its URL
            property_url = self._search_property(address)
            if not property_url:
                # Try direct URL construction
                address_slug = re.sub(r'[^\w\s-]', '', address.lower())
                address_slug = re.sub(r'[\s]+', '-', address_slug)
                property_url = f"{self.BASE_URL}/home/{address_slug}"

            logger.info(f"Scraping Redfin: {property_url}")

            response = self._get_with_retry(property_url)
            if not response:
                result.error = "Failed to fetch Redfin page after retries"
                return result

            soup = BeautifulSoup(response.text, 'lxml')

            # Try to extract JSON data first
            json_data = self._extract_json_data(soup)
            if json_data:
                result.raw_data = json_data
                self._parse_json_data(result, json_data)
                return result

            # Fallback to HTML parsing
            self._parse_html_data(result, soup)

        except Exception as e:
            logger.error(f"Redfin scraping error: {e}")
            result.error = str(e)

        return result

    def _parse_json_data(self, result: PropertyData, data: dict):
        """Parse JSON data from Redfin page."""
        try:
            # Navigate through Redfin's JSON structure
            home_data = (
                data.get('home', {}) or
                data.get('initialReduxState', {}).get('home', {}) or
                {}
            )

            if home_data:
                result.estimate = self._parse_price(home_data.get('avm', {}).get('value'))
                result.rent_estimate = self._parse_price(home_data.get('rentAvm', {}).get('value'))
                result.bedrooms = home_data.get('beds')
                result.bathrooms = home_data.get('baths')
                result.square_footage = self._parse_int(home_data.get('sqFt'))
                result.lot_size = self._parse_int(home_data.get('lotSize'))
                result.year_built = self._parse_int(home_data.get('yearBuilt'))
                result.property_type = home_data.get('propertyType')

                # Last sale
                last_sale = home_data.get('lastSale', {})
                if last_sale:
                    result.last_sold_price = self._parse_price(last_sale.get('price'))
                    result.last_sold_date = last_sale.get('date')

        except Exception as e:
            logger.error(f"Error parsing Redfin JSON: {e}")

    def _parse_html_data(self, result: PropertyData, soup: BeautifulSoup):
        """Fallback HTML parsing for Redfin data."""
        try:
            # Redfin estimate
            estimate_elem = soup.find('div', {'class': re.compile(r'avm', re.I)})
            if estimate_elem:
                price_elem = estimate_elem.find('span', {'class': re.compile(r'value', re.I)})
                if price_elem:
                    result.estimate = self._parse_price(price_elem.get_text())

            # Try price from listing
            price_elem = soup.find('div', {'data-rf-test-id': 'abp-price'})
            if price_elem and not result.estimate:
                result.estimate = self._parse_price(price_elem.get_text())

            # Stats row (beds, baths, sqft)
            stats = soup.find_all('div', {'class': re.compile(r'stat', re.I)})
            for stat in stats:
                text = stat.get_text().lower()
                if 'bed' in text:
                    match = re.search(r'(\d+)', text)
                    if match:
                        result.bedrooms = int(match.group(1))
                elif 'bath' in text:
                    match = re.search(r'(\d+\.?\d*)', text)
                    if match:
                        result.bathrooms = float(match.group(1))
                elif 'sq ft' in text or 'sqft' in text:
                    match = re.search(r'([\d,]+)', text)
                    if match:
                        result.square_footage = self._parse_int(match.group(1))

        except Exception as e:
            logger.error(f"Error parsing Redfin HTML: {e}")


class SeleniumScraper:
    """
    Selenium-based scraper for JavaScript-heavy pages.
    Falls back to this when basic requests fail.
    """

    def __init__(self):
        if not SELENIUM_AVAILABLE:
            raise ImportError("Selenium is not installed")

        self.options = Options()
        self.options.add_argument('--headless')
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--disable-dev-shm-usage')
        self.options.add_argument('--disable-gpu')
        self.options.add_argument(f'--user-agent={Config.USER_AGENT}')

    def _get_driver(self):
        """Get a configured Chrome WebDriver."""
        service = Service(ChromeDriverManager().install())
        return webdriver.Chrome(service=service, options=self.options)

    def scrape_zillow(self, address: str) -> PropertyData:
        """Scrape Zillow using Selenium."""
        result = PropertyData(source='zillow', address=address)
        driver = None

        try:
            driver = self._get_driver()
            encoded_address = quote_plus(address)
            url = f"https://www.zillow.com/homes/{encoded_address}_rb/"

            logger.info(f"Selenium scraping Zillow: {url}")
            driver.get(url)

            # Wait for content to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            time.sleep(3)  # Additional wait for JS

            # Get page source and parse
            soup = BeautifulSoup(driver.page_source, 'lxml')
            scraper = ZillowScraper()
            json_data = scraper._extract_json_data(soup)

            if json_data:
                result.raw_data = json_data
                scraper._parse_json_data(result, json_data)
            else:
                scraper._parse_html_data(result, soup)

        except Exception as e:
            logger.error(f"Selenium Zillow error: {e}")
            result.error = str(e)
        finally:
            if driver:
                driver.quit()

        return result

    def scrape_redfin(self, address: str) -> PropertyData:
        """Scrape Redfin using Selenium."""
        result = PropertyData(source='redfin', address=address)
        driver = None

        try:
            driver = self._get_driver()
            address_slug = re.sub(r'[^\w\s-]', '', address.lower())
            address_slug = re.sub(r'[\s]+', '-', address_slug)
            url = f"https://www.redfin.com/home/{address_slug}"

            logger.info(f"Selenium scraping Redfin: {url}")
            driver.get(url)

            # Wait for content to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            time.sleep(3)

            # Get page source and parse
            soup = BeautifulSoup(driver.page_source, 'lxml')
            scraper = RedfinScraper()
            json_data = scraper._extract_json_data(soup)

            if json_data:
                result.raw_data = json_data
                scraper._parse_json_data(result, json_data)
            else:
                scraper._parse_html_data(result, soup)

        except Exception as e:
            logger.error(f"Selenium Redfin error: {e}")
            result.error = str(e)
        finally:
            if driver:
                driver.quit()

        return result


class PropertyScraper:
    """
    Main interface for scraping property data from multiple sources.
    Handles fallback logic and aggregation.
    """

    def __init__(self, use_selenium_fallback: bool = True):
        self.zillow_scraper = ZillowScraper()
        self.redfin_scraper = RedfinScraper()
        self.use_selenium = use_selenium_fallback and SELENIUM_AVAILABLE
        self.selenium_scraper = SeleniumScraper() if self.use_selenium else None

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
        zillow_data = self.zillow_scraper.scrape(address)
        if zillow_data.error and self.selenium_scraper:
            logger.info("Falling back to Selenium for Zillow")
            zillow_data = self.selenium_scraper.scrape_zillow(address)

        if zillow_data.error:
            results['errors'].append(f"Zillow: {zillow_data.error}")
        results['zillow'] = zillow_data

        # Small delay between sources
        time.sleep(Config.SCRAPING_DELAY)

        # Scrape Redfin
        redfin_data = self.redfin_scraper.scrape(address)
        if redfin_data.error and self.selenium_scraper:
            logger.info("Falling back to Selenium for Redfin")
            redfin_data = self.selenium_scraper.scrape_redfin(address)

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
