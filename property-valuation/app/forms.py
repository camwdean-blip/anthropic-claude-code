"""
WTForms form definitions for Property Valuation Application
"""
from flask_wtf import FlaskForm
from wtforms import (
    StringField, IntegerField, FloatField, SelectField,
    TextAreaField, DecimalField
)
from wtforms.validators import (
    DataRequired, NumberRange, Optional, Length, Regexp
)


class PropertyValuationForm(FlaskForm):
    """Form for entering property details for valuation."""

    # Address Fields
    street_address = StringField(
        'Street Address',
        validators=[
            DataRequired(message="Street address is required"),
            Length(min=5, max=255, message="Address must be between 5 and 255 characters")
        ],
        render_kw={"placeholder": "123 Main Street"}
    )

    city = StringField(
        'City',
        validators=[
            DataRequired(message="City is required"),
            Length(min=2, max=100)
        ],
        render_kw={"placeholder": "San Francisco"}
    )

    state = SelectField(
        'State',
        validators=[DataRequired(message="State is required")],
        choices=[
            ('', 'Select State'),
            ('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'),
            ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'),
            ('CT', 'Connecticut'), ('DE', 'Delaware'), ('FL', 'Florida'),
            ('GA', 'Georgia'), ('HI', 'Hawaii'), ('ID', 'Idaho'),
            ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'),
            ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'),
            ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'),
            ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'),
            ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'),
            ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'),
            ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'),
            ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'),
            ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'),
            ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'),
            ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'),
            ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'),
            ('WI', 'Wisconsin'), ('WY', 'Wyoming'), ('DC', 'Washington D.C.')
        ]
    )

    zip_code = StringField(
        'ZIP Code',
        validators=[
            DataRequired(message="ZIP code is required"),
            Regexp(r'^\d{5}(-\d{4})?$', message="Invalid ZIP code format")
        ],
        render_kw={"placeholder": "94102"}
    )

    neighborhood = StringField(
        'Neighborhood',
        validators=[Optional(), Length(max=100)],
        render_kw={"placeholder": "Pacific Heights (optional)"}
    )

    # Property Details
    square_footage = IntegerField(
        'Square Footage',
        validators=[
            DataRequired(message="Square footage is required"),
            NumberRange(min=100, max=100000, message="Square footage must be between 100 and 100,000")
        ],
        render_kw={"placeholder": "1500"}
    )

    lot_size = IntegerField(
        'Lot Size (sq ft)',
        validators=[
            Optional(),
            NumberRange(min=0, max=10000000, message="Lot size must be reasonable")
        ],
        render_kw={"placeholder": "5000 (optional)"}
    )

    bedrooms = IntegerField(
        'Bedrooms',
        validators=[
            DataRequired(message="Number of bedrooms is required"),
            NumberRange(min=0, max=50, message="Bedrooms must be between 0 and 50")
        ],
        render_kw={"placeholder": "3"}
    )

    bathrooms = FloatField(
        'Bathrooms',
        validators=[
            DataRequired(message="Number of bathrooms is required"),
            NumberRange(min=0.5, max=50, message="Bathrooms must be between 0.5 and 50")
        ],
        render_kw={"placeholder": "2.5"}
    )

    year_built = IntegerField(
        'Year Built',
        validators=[
            Optional(),
            NumberRange(min=1800, max=2030, message="Year built must be between 1800 and 2030")
        ],
        render_kw={"placeholder": "1990 (optional)"}
    )

    property_type = SelectField(
        'Property Type',
        validators=[DataRequired(message="Property type is required")],
        choices=[
            ('single_family', 'Single Family Home'),
            ('condo', 'Condominium'),
            ('townhouse', 'Townhouse'),
            ('multi_family', 'Multi-Family'),
            ('land', 'Land/Lot')
        ]
    )

    condition = SelectField(
        'Property Condition',
        validators=[DataRequired(message="Property condition is required")],
        choices=[
            ('excellent', 'Excellent - Recently renovated, modern finishes'),
            ('good', 'Good - Well maintained, minor updates needed'),
            ('average', 'Average - Typical wear, functional'),
            ('fair', 'Fair - Needs some repairs/updates'),
            ('poor', 'Poor - Major repairs needed')
        ]
    )

    # Market Data (Manual Entry)
    price_per_sqft_6mo = FloatField(
        'Price/SqFt 6 Months Ago',
        validators=[
            DataRequired(message="6-month price per sqft is required"),
            NumberRange(min=1, max=10000, message="Price must be between $1 and $10,000 per sqft")
        ],
        render_kw={"placeholder": "350.00"}
    )

    price_per_sqft_12mo = FloatField(
        'Price/SqFt 12 Months Ago',
        validators=[
            DataRequired(message="12-month price per sqft is required"),
            NumberRange(min=1, max=10000, message="Price must be between $1 and $10,000 per sqft")
        ],
        render_kw={"placeholder": "340.00"}
    )

    # Optional: Manual entry of external estimates
    zillow_estimate_manual = FloatField(
        'Zillow Estimate (Manual)',
        validators=[
            Optional(),
            NumberRange(min=0, message="Estimate must be positive")
        ],
        render_kw={"placeholder": "Leave blank to auto-fetch"}
    )

    redfin_estimate_manual = FloatField(
        'Redfin Estimate (Manual)',
        validators=[
            Optional(),
            NumberRange(min=0, message="Estimate must be positive")
        ],
        render_kw={"placeholder": "Leave blank to auto-fetch"}
    )

    last_purchase_price_manual = FloatField(
        'Last Purchase Price (if known)',
        validators=[
            Optional(),
            NumberRange(min=0, message="Price must be positive")
        ],
        render_kw={"placeholder": "Optional"}
    )

    # Notes
    notes = TextAreaField(
        'Additional Notes',
        validators=[Optional(), Length(max=2000)],
        render_kw={
            "placeholder": "Any additional information about the property...",
            "rows": 3
        }
    )

    def get_full_address(self) -> str:
        """Construct full address from form fields."""
        return f"{self.street_address.data}, {self.city.data}, {self.state.data} {self.zip_code.data}"
