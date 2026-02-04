"""
Database models for Property Valuation Application
"""
from datetime import datetime
from app import db


class PropertyValuation(db.Model):
    """
    Model to store property valuation records and history.
    """
    __tablename__ = 'property_valuations'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Property Address
    street_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    full_address = db.Column(db.String(500), nullable=False)

    # Property Details
    square_footage = db.Column(db.Integer, nullable=False)
    lot_size = db.Column(db.Integer, nullable=True)  # in sq ft
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Float, nullable=False)  # Allow 1.5, 2.5, etc.
    year_built = db.Column(db.Integer, nullable=True)
    property_type = db.Column(db.String(50), nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    neighborhood = db.Column(db.String(100), nullable=True)

    # Market Data (Manual Entry)
    price_per_sqft_6mo = db.Column(db.Float, nullable=False)  # 6 months ago
    price_per_sqft_12mo = db.Column(db.Float, nullable=False)  # 12 months ago
    current_price_per_sqft = db.Column(db.Float, nullable=True)  # Current market

    # External Estimates
    zillow_estimate = db.Column(db.Float, nullable=True)
    zillow_rent_estimate = db.Column(db.Float, nullable=True)
    redfin_estimate = db.Column(db.Float, nullable=True)
    last_purchase_price = db.Column(db.Float, nullable=True)
    last_purchase_date = db.Column(db.Date, nullable=True)

    # Calculated Valuation
    calculated_value = db.Column(db.Float, nullable=True)
    value_low = db.Column(db.Float, nullable=True)
    value_high = db.Column(db.Float, nullable=True)
    price_per_sqft_calculated = db.Column(db.Float, nullable=True)

    # Valuation Components (for transparency)
    comparable_value = db.Column(db.Float, nullable=True)
    trend_adjusted_value = db.Column(db.Float, nullable=True)
    condition_adjustment = db.Column(db.Float, nullable=True)
    age_adjustment = db.Column(db.Float, nullable=True)

    # Notes and additional info
    notes = db.Column(db.Text, nullable=True)
    scraping_status = db.Column(db.String(50), default='pending')
    scraping_error = db.Column(db.Text, nullable=True)

    # PDF Report path
    report_path = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f'<PropertyValuation {self.full_address} - ${self.calculated_value:,.0f}>'

    def to_dict(self):
        """Convert model to dictionary for JSON serialization."""
        return {
            'id': self.id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'address': {
                'street': self.street_address,
                'city': self.city,
                'state': self.state,
                'zip_code': self.zip_code,
                'full': self.full_address,
            },
            'property_details': {
                'square_footage': self.square_footage,
                'lot_size': self.lot_size,
                'bedrooms': self.bedrooms,
                'bathrooms': self.bathrooms,
                'year_built': self.year_built,
                'property_type': self.property_type,
                'condition': self.condition,
                'neighborhood': self.neighborhood,
            },
            'market_data': {
                'price_per_sqft_6mo': self.price_per_sqft_6mo,
                'price_per_sqft_12mo': self.price_per_sqft_12mo,
                'current_price_per_sqft': self.current_price_per_sqft,
            },
            'external_estimates': {
                'zillow': self.zillow_estimate,
                'zillow_rent': self.zillow_rent_estimate,
                'redfin': self.redfin_estimate,
                'last_purchase_price': self.last_purchase_price,
                'last_purchase_date': self.last_purchase_date.isoformat() if self.last_purchase_date else None,
            },
            'valuation': {
                'calculated_value': self.calculated_value,
                'value_low': self.value_low,
                'value_high': self.value_high,
                'price_per_sqft': self.price_per_sqft_calculated,
            },
            'components': {
                'comparable_value': self.comparable_value,
                'trend_adjusted_value': self.trend_adjusted_value,
                'condition_adjustment': self.condition_adjustment,
                'age_adjustment': self.age_adjustment,
            },
            'notes': self.notes,
            'report_path': self.report_path,
        }

    @property
    def appreciation_6mo(self):
        """Calculate 6-month appreciation rate."""
        if self.current_price_per_sqft and self.price_per_sqft_6mo:
            return ((self.current_price_per_sqft - self.price_per_sqft_6mo)
                    / self.price_per_sqft_6mo) * 100
        return None

    @property
    def appreciation_12mo(self):
        """Calculate 12-month appreciation rate."""
        if self.current_price_per_sqft and self.price_per_sqft_12mo:
            return ((self.current_price_per_sqft - self.price_per_sqft_12mo)
                    / self.price_per_sqft_12mo) * 100
        return None

    @property
    def property_age(self):
        """Calculate property age in years."""
        if self.year_built:
            return datetime.now().year - self.year_built
        return None


class ScrapingLog(db.Model):
    """
    Model to log scraping attempts for debugging and rate limiting.
    """
    __tablename__ = 'scraping_logs'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    valuation_id = db.Column(db.Integer, db.ForeignKey('property_valuations.id'), nullable=True)
    source = db.Column(db.String(50), nullable=False)  # 'zillow' or 'redfin'
    address = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(50), nullable=False)  # 'success', 'failed', 'blocked'
    response_code = db.Column(db.Integer, nullable=True)
    error_message = db.Column(db.Text, nullable=True)
    data_retrieved = db.Column(db.JSON, nullable=True)

    # Relationship
    valuation = db.relationship('PropertyValuation', backref=db.backref('scraping_logs', lazy=True))

    def __repr__(self):
        return f'<ScrapingLog {self.source} - {self.status}>'
