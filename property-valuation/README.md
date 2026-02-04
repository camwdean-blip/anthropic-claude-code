# Property Valuation Software

A comprehensive web-based property valuation tool that calculates estimated property values using market data, external estimates (Zillow/Redfin), and a custom valuation algorithm.

## Features

- **Custom Valuation Algorithm**: Calculates property value based on:
  - Square footage and price per square foot trends
  - Property condition and age adjustments
  - Bedroom/bathroom configurations
  - Lot size premiums
  - Property type factors

- **External Estimate Integration**:
  - Web scraping for Zillow estimates (Zestimate)
  - Web scraping for Redfin estimates
  - Last purchase price history

- **Market Trend Analysis**:
  - 6-month and 12-month price per square foot comparison
  - Appreciation rate calculations
  - Projected annual appreciation

- **Valuation History**:
  - SQLite database storage
  - View and compare past valuations
  - Delete unwanted records

- **PDF Report Generation**:
  - Professional PDF reports with WeasyPrint
  - Complete valuation breakdown
  - Market analysis summary

## Installation

### Prerequisites

- Python 3.8 or later
- pip (Python package manager)

### Setup

1. **Clone the repository**:
   ```bash
   cd property-valuation
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

   Note: WeasyPrint requires additional system dependencies for PDF generation:
   - **Ubuntu/Debian**: `sudo apt-get install libpango-1.0-0 libharfbuzz0b libpangoft2-1.0-0`
   - **macOS**: `brew install pango`
   - **Windows**: See [WeasyPrint documentation](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#windows)

4. **Run the application**:
   ```bash
   python run.py
   ```

5. **Open your browser** and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## Usage

### Creating a Valuation

1. Enter the **property address** (street, city, state, ZIP)
2. Enter **property details**:
   - Square footage
   - Bedrooms and bathrooms
   - Year built (optional)
   - Property type
   - Condition rating
3. Enter **market data**:
   - Price per square foot 6 months ago
   - Price per square foot 12 months ago
4. Optionally enter **external estimates** manually, or leave blank to auto-fetch
5. Click **Calculate Valuation**

### Understanding Results

The valuation results include:

- **Estimated Value**: The calculated market value
- **Value Range**: Low and high estimates
- **Price per Square Foot**: Calculated price/sqft
- **External Comparisons**: Zillow, Redfin, and last sale prices
- **Market Trends**: Appreciation rates
- **Valuation Breakdown**: Component-by-component analysis

### Generating PDF Reports

Click the **Download PDF Report** button on any valuation result to generate a professional PDF report.

## Configuration

### Environment Variables

- `SECRET_KEY`: Flask secret key for session security
- `FLASK_ENV`: Set to `production` for production deployment

### Configuration Files

- `config.py`: Application settings and valuation algorithm weights
- `.claude/settings.json`: Project-specific settings

### Customizing the Valuation Algorithm

Edit `config.py` to adjust:

```python
# Valuation weights
VALUATION_WEIGHTS = {
    'zillow_estimate': 0.25,
    'redfin_estimate': 0.25,
    'comparable_analysis': 0.30,
    'trend_analysis': 0.20,
}

# Property type factors
PROPERTY_TYPE_FACTORS = {
    'single_family': 1.0,
    'condo': 0.90,
    'townhouse': 0.95,
    ...
}

# Condition factors
CONDITION_FACTORS = {
    'excellent': 1.15,
    'good': 1.05,
    'average': 1.0,
    ...
}
```

## Project Structure

```
property-valuation/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── models.py            # Database models
│   ├── routes.py            # Web routes and API
│   ├── forms.py             # WTForms definitions
│   ├── scraper.py           # Zillow/Redfin scrapers
│   ├── valuation.py         # Valuation algorithm
│   ├── pdf_generator.py     # PDF report generation
│   ├── templates/           # HTML templates
│   │   ├── base.html
│   │   ├── index.html
│   │   ├── results.html
│   │   └── history.html
│   └── static/
│       ├── css/style.css
│       └── js/main.js
├── data/                    # SQLite database
├── reports/                 # Generated PDF reports
├── config.py                # Configuration
├── requirements.txt         # Python dependencies
├── run.py                   # Application entry point
└── README.md
```

## API Endpoints

- `GET /` - Home page with valuation form
- `POST /valuate` - Process valuation
- `GET /results/<id>` - View valuation results
- `GET /history` - View valuation history
- `GET /valuation/<id>/pdf` - Generate PDF report
- `POST /api/scrape` - Scrape external estimates (JSON)
- `GET /api/valuation/<id>` - Get valuation data (JSON)
- `GET /api/history` - Get valuation history (JSON)

## Disclaimer

This tool is for **informational purposes only** and should not be considered a formal appraisal or professional real estate advice. Actual market values may vary based on factors not captured in this analysis. For official property valuations, please consult a licensed appraiser.

## Web Scraping Notice

This application includes web scraping functionality for Zillow and Redfin. Web scraping may be against the Terms of Service of these websites. Use responsibly and consider using official APIs when available for production use.

## License

This project is for personal use. All rights reserved.
