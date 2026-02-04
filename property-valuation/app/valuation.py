"""
Custom Property Valuation Algorithm

This module implements a comprehensive property valuation algorithm that:
1. Considers comparable market data (price per square foot trends)
2. Adjusts for property-specific factors (condition, age, type)
3. Incorporates external estimates (Zillow, Redfin) for conservative calibration
4. Provides a value range (low, mid, high) for confidence assessment
"""
from dataclasses import dataclass
from typing import Optional, Tuple
from datetime import datetime
import logging

from config import Config

logger = logging.getLogger(__name__)


@dataclass
class ValuationInput:
    """Input data for property valuation."""
    # Required fields
    square_footage: int
    bedrooms: int
    bathrooms: float
    property_type: str
    condition: str
    price_per_sqft_6mo: float
    price_per_sqft_12mo: float

    # Optional fields with defaults
    lot_size: Optional[int] = None
    year_built: Optional[int] = None
    neighborhood: Optional[str] = None

    # External estimates (optional)
    zillow_estimate: Optional[float] = None
    redfin_estimate: Optional[float] = None
    last_purchase_price: Optional[float] = None


@dataclass
class ValuationResult:
    """Result of property valuation calculation."""
    # Final values
    estimated_value: float
    value_low: float
    value_high: float
    price_per_sqft: float

    # Component breakdown
    base_value: float
    comparable_value: float
    trend_adjusted_value: float
    condition_adjustment: float
    age_adjustment: float
    bedroom_bathroom_adjustment: float
    lot_size_adjustment: float
    property_type_adjustment: float
    external_estimate_influence: float

    # Trend analysis
    appreciation_6mo: float  # percentage
    appreciation_12mo: float  # percentage
    projected_annual_appreciation: float

    # Confidence metrics
    confidence_score: float  # 0-100
    confidence_factors: dict

    # Comparison with external estimates
    vs_zillow_diff: Optional[float] = None  # percentage difference
    vs_redfin_diff: Optional[float] = None  # percentage difference
    external_avg: Optional[float] = None


class PropertyValuator:
    """
    Property valuation engine that calculates property value using
    multiple factors and methodologies.
    """

    def __init__(self, config: Optional[Config] = None):
        self.config = config or Config()
        self.weights = self.config.VALUATION_WEIGHTS
        self.property_type_factors = self.config.PROPERTY_TYPE_FACTORS
        self.condition_factors = self.config.CONDITION_FACTORS

    def calculate_valuation(self, input_data: ValuationInput) -> ValuationResult:
        """
        Calculate comprehensive property valuation.

        Args:
            input_data: ValuationInput with property details and market data

        Returns:
            ValuationResult with estimated value and detailed breakdown
        """
        # Step 1: Calculate current market price per sqft (extrapolated from trends)
        current_price_per_sqft = self._calculate_current_price_per_sqft(
            input_data.price_per_sqft_6mo,
            input_data.price_per_sqft_12mo
        )

        # Step 2: Calculate base value from comparable market data
        base_value = input_data.square_footage * current_price_per_sqft

        # Step 3: Calculate individual adjustments
        condition_adj = self._calculate_condition_adjustment(
            base_value, input_data.condition
        )

        age_adj = self._calculate_age_adjustment(
            base_value, input_data.year_built
        )

        br_ba_adj = self._calculate_bedroom_bathroom_adjustment(
            input_data.bedrooms, input_data.bathrooms,
            input_data.square_footage, input_data.property_type
        )

        lot_adj = self._calculate_lot_size_adjustment(
            input_data.lot_size, input_data.square_footage,
            input_data.property_type
        )

        type_adj = self._calculate_property_type_adjustment(
            base_value, input_data.property_type
        )

        # Step 4: Calculate comparable value with adjustments
        comparable_value = (
            base_value +
            condition_adj +
            age_adj +
            br_ba_adj +
            lot_adj +
            type_adj
        )

        # Step 5: Apply trend analysis
        appreciation_6mo, appreciation_12mo = self._calculate_appreciation_rates(
            input_data.price_per_sqft_6mo,
            input_data.price_per_sqft_12mo,
            current_price_per_sqft
        )

        trend_adjusted_value = self._apply_trend_adjustment(
            comparable_value, appreciation_6mo, appreciation_12mo
        )

        # Step 6: Incorporate external estimates for conservative calibration
        external_influence, external_avg = self._incorporate_external_estimates(
            trend_adjusted_value,
            input_data.zillow_estimate,
            input_data.redfin_estimate
        )

        # Step 7: Calculate final estimated value
        estimated_value = trend_adjusted_value + external_influence

        # Step 8: Calculate value range
        value_low, value_high = self._calculate_value_range(
            estimated_value, input_data
        )

        # Step 9: Calculate confidence score
        confidence_score, confidence_factors = self._calculate_confidence(
            input_data, external_avg, estimated_value
        )

        # Step 10: Calculate differences from external estimates
        vs_zillow = None
        vs_redfin = None
        if input_data.zillow_estimate and input_data.zillow_estimate > 0:
            vs_zillow = ((estimated_value - input_data.zillow_estimate)
                         / input_data.zillow_estimate) * 100
        if input_data.redfin_estimate and input_data.redfin_estimate > 0:
            vs_redfin = ((estimated_value - input_data.redfin_estimate)
                         / input_data.redfin_estimate) * 100

        # Calculate projected annual appreciation
        projected_annual = self._project_annual_appreciation(
            appreciation_6mo, appreciation_12mo
        )

        return ValuationResult(
            estimated_value=round(estimated_value, 2),
            value_low=round(value_low, 2),
            value_high=round(value_high, 2),
            price_per_sqft=round(estimated_value / input_data.square_footage, 2),
            base_value=round(base_value, 2),
            comparable_value=round(comparable_value, 2),
            trend_adjusted_value=round(trend_adjusted_value, 2),
            condition_adjustment=round(condition_adj, 2),
            age_adjustment=round(age_adj, 2),
            bedroom_bathroom_adjustment=round(br_ba_adj, 2),
            lot_size_adjustment=round(lot_adj, 2),
            property_type_adjustment=round(type_adj, 2),
            external_estimate_influence=round(external_influence, 2),
            appreciation_6mo=round(appreciation_6mo, 2),
            appreciation_12mo=round(appreciation_12mo, 2),
            projected_annual_appreciation=round(projected_annual, 2),
            confidence_score=round(confidence_score, 1),
            confidence_factors=confidence_factors,
            vs_zillow_diff=round(vs_zillow, 2) if vs_zillow else None,
            vs_redfin_diff=round(vs_redfin, 2) if vs_redfin else None,
            external_avg=round(external_avg, 2) if external_avg else None,
        )

    def _calculate_current_price_per_sqft(
        self,
        price_6mo: float,
        price_12mo: float
    ) -> float:
        """
        Extrapolate current market price per sqft from historical data.

        Uses the trend between 12mo and 6mo data to project current value.
        """
        if price_12mo <= 0:
            return price_6mo

        # Calculate the 6-month change rate
        change_rate_6mo = (price_6mo - price_12mo) / price_12mo

        # Project forward by half that rate (3 months)
        # Being slightly conservative in projection
        projection_factor = 1 + (change_rate_6mo * 0.4)

        current_price = price_6mo * projection_factor

        # Ensure we don't go below the 6mo price if market was rising
        # or above if market was falling (conservative approach)
        if change_rate_6mo > 0:
            current_price = max(current_price, price_6mo)
        else:
            current_price = min(current_price, price_6mo)

        return current_price

    def _calculate_condition_adjustment(
        self,
        base_value: float,
        condition: str
    ) -> float:
        """Calculate value adjustment based on property condition."""
        factor = self.condition_factors.get(condition.lower(), 1.0)
        adjustment = base_value * (factor - 1.0)
        return adjustment

    def _calculate_age_adjustment(
        self,
        base_value: float,
        year_built: Optional[int]
    ) -> float:
        """
        Calculate depreciation adjustment based on property age.

        Newer properties command a premium; older properties are discounted.
        Depreciation is capped to prevent excessive discounting.
        """
        if not year_built:
            return 0.0

        current_year = datetime.now().year
        age = current_year - year_built

        if age <= 0:
            # New construction premium
            return base_value * 0.05
        elif age <= 5:
            # Near-new premium
            return base_value * 0.03
        elif age <= 10:
            # Recent construction - no adjustment
            return 0.0
        else:
            # Apply depreciation for older properties
            depreciation_rate = min(
                age * self.config.AGE_DEPRECIATION_RATE,
                self.config.AGE_DEPRECIATION_MAX
            )
            return -base_value * depreciation_rate

    def _calculate_bedroom_bathroom_adjustment(
        self,
        bedrooms: int,
        bathrooms: float,
        square_footage: int,
        property_type: str
    ) -> float:
        """
        Adjust value based on bedroom/bathroom count relative to size.

        More bedrooms/bathrooms per sqft generally increases value.
        """
        # Calculate expected bedrooms based on square footage
        if property_type.lower() == 'condo':
            expected_beds = max(1, square_footage // 600)
            expected_baths = max(1, square_footage // 800)
        else:
            expected_beds = max(2, square_footage // 500)
            expected_baths = max(1.5, square_footage // 600)

        # Calculate excess/deficit
        bed_diff = bedrooms - expected_beds
        bath_diff = bathrooms - expected_baths

        # Apply value adjustments
        bed_adjustment = bed_diff * self.config.BEDROOM_VALUE
        bath_adjustment = bath_diff * self.config.BATHROOM_VALUE

        return bed_adjustment + bath_adjustment

    def _calculate_lot_size_adjustment(
        self,
        lot_size: Optional[int],
        square_footage: int,
        property_type: str
    ) -> float:
        """
        Calculate adjustment based on lot size relative to property size.

        Larger lots command a premium for single-family homes.
        """
        if not lot_size or property_type.lower() in ['condo', 'townhouse']:
            return 0.0

        # Typical lot-to-building ratio varies by area
        # Using conservative estimate of 4:1 as typical
        typical_lot = square_footage * 4

        if lot_size > typical_lot:
            excess_sqft = lot_size - typical_lot
            # Diminishing returns on very large lots
            effective_excess = min(excess_sqft, typical_lot)
            return effective_excess * self.config.LOT_SIZE_PREMIUM
        elif lot_size < typical_lot * 0.5:
            # Penalty for very small lots
            deficit = typical_lot * 0.5 - lot_size
            return -deficit * (self.config.LOT_SIZE_PREMIUM * 0.5)

        return 0.0

    def _calculate_property_type_adjustment(
        self,
        base_value: float,
        property_type: str
    ) -> float:
        """Apply property type factor to value."""
        factor = self.property_type_factors.get(property_type.lower(), 1.0)
        return base_value * (factor - 1.0)

    def _calculate_appreciation_rates(
        self,
        price_6mo: float,
        price_12mo: float,
        current_price: float
    ) -> Tuple[float, float]:
        """Calculate appreciation rates for 6-month and 12-month periods."""
        appreciation_6mo = 0.0
        appreciation_12mo = 0.0

        if price_6mo > 0:
            appreciation_6mo = ((current_price - price_6mo) / price_6mo) * 100

        if price_12mo > 0:
            appreciation_12mo = ((current_price - price_12mo) / price_12mo) * 100

        return appreciation_6mo, appreciation_12mo

    def _apply_trend_adjustment(
        self,
        value: float,
        appreciation_6mo: float,
        appreciation_12mo: float
    ) -> float:
        """
        Apply trend-based adjustment to value.

        If market is appreciating rapidly, be slightly conservative.
        If market is declining, apply caution.
        """
        # Weight recent trend more heavily
        weighted_trend = (appreciation_6mo * 0.7 + appreciation_12mo * 0.3) / 100

        # Apply conservative adjustment based on trend
        if weighted_trend > 0.05:  # > 5% appreciation
            # Market may be overheated, be conservative
            adjustment = -value * 0.02
        elif weighted_trend < -0.05:  # > 5% decline
            # Market declining, apply caution
            adjustment = -value * 0.03
        else:
            # Stable market, no adjustment
            adjustment = 0.0

        return value + adjustment

    def _incorporate_external_estimates(
        self,
        calculated_value: float,
        zillow_estimate: Optional[float],
        redfin_estimate: Optional[float]
    ) -> Tuple[float, Optional[float]]:
        """
        Incorporate external estimates (Zillow, Redfin) into valuation.

        External estimates help calibrate our model and provide a
        conservative anchor, especially useful when our calculation
        significantly differs from market consensus.
        """
        external_estimates = []
        if zillow_estimate and zillow_estimate > 0:
            external_estimates.append(zillow_estimate)
        if redfin_estimate and redfin_estimate > 0:
            external_estimates.append(redfin_estimate)

        if not external_estimates:
            return 0.0, None

        external_avg = sum(external_estimates) / len(external_estimates)

        # Calculate difference from external average
        diff_pct = (calculated_value - external_avg) / external_avg

        # If our estimate is significantly higher than external estimates,
        # apply a conservative adjustment toward the external average
        if diff_pct > 0.15:  # More than 15% higher
            # Pull toward external average by 30% of the difference
            adjustment = -(calculated_value - external_avg) * 0.3
        elif diff_pct < -0.15:  # More than 15% lower
            # Our estimate is lower - consider location/intangibles
            # might make it worth less. Apply smaller adjustment.
            adjustment = (external_avg - calculated_value) * 0.15
        else:
            # Within reasonable range, minimal adjustment
            adjustment = (external_avg - calculated_value) * 0.1

        return adjustment, external_avg

    def _calculate_value_range(
        self,
        estimated_value: float,
        input_data: ValuationInput
    ) -> Tuple[float, float]:
        """
        Calculate low and high value estimates for confidence range.

        Range width depends on data quality and market conditions.
        """
        # Base range: +/- 5%
        base_range = 0.05

        # Widen range if missing data
        if not input_data.year_built:
            base_range += 0.02
        if not input_data.lot_size:
            base_range += 0.01
        if not input_data.zillow_estimate and not input_data.redfin_estimate:
            base_range += 0.03

        # Calculate appreciation volatility
        if input_data.price_per_sqft_12mo > 0:
            price_change = abs(
                input_data.price_per_sqft_6mo - input_data.price_per_sqft_12mo
            ) / input_data.price_per_sqft_12mo

            if price_change > 0.10:  # Volatile market
                base_range += 0.03

        value_low = estimated_value * (1 - base_range)
        value_high = estimated_value * (1 + base_range)

        return value_low, value_high

    def _calculate_confidence(
        self,
        input_data: ValuationInput,
        external_avg: Optional[float],
        estimated_value: float
    ) -> Tuple[float, dict]:
        """
        Calculate confidence score (0-100) for the valuation.

        Higher scores indicate more reliable estimates.
        """
        confidence = 70.0  # Base confidence
        factors = {}

        # Factor 1: Data completeness (up to +15)
        data_score = 0
        if input_data.year_built:
            data_score += 3
        if input_data.lot_size:
            data_score += 3
        if input_data.zillow_estimate:
            data_score += 4
        if input_data.redfin_estimate:
            data_score += 4
        if input_data.last_purchase_price:
            data_score += 1

        factors['data_completeness'] = data_score
        confidence += data_score

        # Factor 2: External estimate agreement (up to +10 or -10)
        if external_avg and external_avg > 0:
            diff_pct = abs(estimated_value - external_avg) / external_avg
            if diff_pct < 0.05:
                agreement_score = 10
            elif diff_pct < 0.10:
                agreement_score = 5
            elif diff_pct < 0.15:
                agreement_score = 0
            elif diff_pct < 0.25:
                agreement_score = -5
            else:
                agreement_score = -10

            factors['external_agreement'] = agreement_score
            confidence += agreement_score

        # Factor 3: Market stability (up to +5 or -5)
        if input_data.price_per_sqft_12mo > 0:
            change = (input_data.price_per_sqft_6mo - input_data.price_per_sqft_12mo)
            change_pct = abs(change) / input_data.price_per_sqft_12mo

            if change_pct < 0.03:
                stability_score = 5
            elif change_pct < 0.07:
                stability_score = 2
            elif change_pct < 0.12:
                stability_score = 0
            else:
                stability_score = -5

            factors['market_stability'] = stability_score
            confidence += stability_score

        # Clamp confidence to 0-100
        confidence = max(0, min(100, confidence))

        return confidence, factors

    def _project_annual_appreciation(
        self,
        appreciation_6mo: float,
        appreciation_12mo: float
    ) -> float:
        """Project annual appreciation rate based on historical data."""
        # Use weighted average of recent trends
        # 12-month gives actual annual, 6-month gives recent momentum

        if appreciation_12mo == 0:
            return appreciation_6mo * 2  # Annualize 6-month rate

        # Blend: 60% actual 12-month, 40% annualized 6-month
        annualized_6mo = appreciation_6mo * 2
        projected = (appreciation_12mo * 0.6) + (annualized_6mo * 0.4)

        return projected


def create_valuation_from_form(form_data: dict, scraped_data: dict) -> ValuationResult:
    """
    Convenience function to create valuation from web form and scraped data.

    Args:
        form_data: Dictionary with form field values
        scraped_data: Dictionary with scraped Zillow/Redfin data

    Returns:
        ValuationResult with complete valuation
    """
    input_data = ValuationInput(
        square_footage=int(form_data['square_footage']),
        bedrooms=int(form_data['bedrooms']),
        bathrooms=float(form_data['bathrooms']),
        property_type=form_data['property_type'],
        condition=form_data['condition'],
        price_per_sqft_6mo=float(form_data['price_per_sqft_6mo']),
        price_per_sqft_12mo=float(form_data['price_per_sqft_12mo']),
        lot_size=int(form_data['lot_size']) if form_data.get('lot_size') else None,
        year_built=int(form_data['year_built']) if form_data.get('year_built') else None,
        neighborhood=form_data.get('neighborhood'),
        zillow_estimate=scraped_data.get('zillow_estimate'),
        redfin_estimate=scraped_data.get('redfin_estimate'),
        last_purchase_price=scraped_data.get('last_sold_price'),
    )

    valuator = PropertyValuator()
    return valuator.calculate_valuation(input_data)
