"""
Configuration settings for Property Valuation Application
"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent

class Config:
    """Base configuration class"""

    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

    # Database settings
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{BASE_DIR}/data/valuations.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Reports directory
    REPORTS_DIR = BASE_DIR / 'reports'

    # Scraping settings
    SCRAPING_TIMEOUT = 30  # seconds
    SCRAPING_RETRY_ATTEMPTS = 3
    SCRAPING_DELAY = 2  # seconds between requests

    # User agent for web scraping
    USER_AGENT = (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/120.0.0.0 Safari/537.36'
    )

    # Valuation algorithm weights
    VALUATION_WEIGHTS = {
        'zillow_estimate': 0.25,
        'redfin_estimate': 0.25,
        'comparable_analysis': 0.30,
        'trend_analysis': 0.20,
    }

    # Property type multipliers (adjustment factors)
    PROPERTY_TYPE_FACTORS = {
        'single_family': 1.0,
        'condo': 0.90,
        'townhouse': 0.95,
        'multi_family': 1.10,
        'land': 0.70,
    }

    # Condition multipliers
    CONDITION_FACTORS = {
        'excellent': 1.15,
        'good': 1.05,
        'average': 1.0,
        'fair': 0.90,
        'poor': 0.75,
    }

    # Age depreciation factors (per year, capped)
    AGE_DEPRECIATION_RATE = 0.005  # 0.5% per year
    AGE_DEPRECIATION_MAX = 0.25    # Maximum 25% depreciation

    # Bedroom/Bathroom value adjustments
    BEDROOM_VALUE = 15000  # Base value per bedroom
    BATHROOM_VALUE = 10000  # Base value per bathroom

    # Lot size premium (per square foot over typical)
    LOT_SIZE_PREMIUM = 5  # $ per sq ft for excess lot


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')


# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig,
}
