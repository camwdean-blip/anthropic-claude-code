"""
PDF Report Generator for Property Valuations

Uses WeasyPrint to generate professional PDF reports from HTML templates.
"""
import os
import logging
from pathlib import Path
from datetime import datetime
from typing import Union

from jinja2 import Environment, BaseLoader

logger = logging.getLogger(__name__)

# Try to import WeasyPrint, fall back to simple text report if unavailable
try:
    from weasyprint import HTML, CSS
    WEASYPRINT_AVAILABLE = True
except ImportError:
    WEASYPRINT_AVAILABLE = False
    logger.warning("WeasyPrint not available. PDF generation will use basic text format.")


PDF_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Property Valuation Report</title>
    <style>
        @page {
            size: letter;
            margin: 0.75in;
            @top-right {
                content: "Page " counter(page) " of " counter(pages);
                font-size: 9pt;
                color: #666;
            }
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 30px;
            margin: -0.75in -0.75in 30px -0.75in;
            text-align: center;
        }

        .header h1 {
            margin: 0 0 10px 0;
            font-size: 28pt;
            font-weight: 600;
        }

        .header .address {
            font-size: 14pt;
            opacity: 0.9;
        }

        .header .date {
            font-size: 10pt;
            opacity: 0.7;
            margin-top: 10px;
        }

        .value-box {
            background: #f8fafc;
            border: 2px solid #2563eb;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
        }

        .value-box .label {
            font-size: 12pt;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .value-box .value {
            font-size: 36pt;
            font-weight: 700;
            color: #2563eb;
            margin: 10px 0;
        }

        .value-box .range {
            font-size: 11pt;
            color: #666;
        }

        .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }

        .section-title {
            font-size: 14pt;
            font-weight: 600;
            color: #1e40af;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }

        .grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }

        .grid-row {
            display: table-row;
        }

        .grid-cell {
            display: table-cell;
            padding: 8px 12px;
            border-bottom: 1px solid #e5e7eb;
        }

        .grid-cell.label {
            color: #666;
            width: 40%;
        }

        .grid-cell.value {
            font-weight: 500;
        }

        .two-column {
            display: table;
            width: 100%;
        }

        .column {
            display: table-cell;
            width: 50%;
            padding-right: 20px;
            vertical-align: top;
        }

        .column:last-child {
            padding-right: 0;
            padding-left: 20px;
        }

        .estimates-grid {
            display: table;
            width: 100%;
            margin-top: 15px;
        }

        .estimate-box {
            display: table-cell;
            width: 33.33%;
            text-align: center;
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
        }

        .estimate-box:not(:last-child) {
            margin-right: 10px;
        }

        .estimate-box .source {
            font-size: 10pt;
            color: #666;
            margin-bottom: 5px;
        }

        .estimate-box .amount {
            font-size: 16pt;
            font-weight: 600;
            color: #333;
        }

        .estimate-box .amount.zillow { color: #006aff; }
        .estimate-box .amount.redfin { color: #a02021; }
        .estimate-box .amount.sale { color: #059669; }

        .breakdown-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .breakdown-table th,
        .breakdown-table td {
            padding: 10px 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }

        .breakdown-table th {
            background: #f8fafc;
            font-weight: 600;
            color: #374151;
        }

        .breakdown-table td.amount {
            text-align: right;
            font-family: 'Courier New', monospace;
        }

        .breakdown-table tr.total {
            background: #eff6ff;
            font-weight: 600;
        }

        .breakdown-table tr.total td {
            border-bottom: 2px solid #2563eb;
        }

        .positive { color: #059669; }
        .negative { color: #dc2626; }

        .notes-box {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin-top: 20px;
        }

        .notes-box h4 {
            margin: 0 0 10px 0;
            color: #92400e;
        }

        .disclaimer {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 15px;
            margin-top: 30px;
            font-size: 9pt;
            color: #991b1b;
        }

        .disclaimer h4 {
            margin: 0 0 8px 0;
            color: #991b1b;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 9pt;
            color: #666;
        }

        .metric-row {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }

        .metric {
            display: table-cell;
            width: 25%;
            text-align: center;
            padding: 10px;
        }

        .metric .number {
            font-size: 18pt;
            font-weight: 600;
            color: #2563eb;
        }

        .metric .label {
            font-size: 9pt;
            color: #666;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Property Valuation Report</h1>
        <div class="address">{{ valuation.full_address }}</div>
        <div class="date">Generated on {{ report_date }}</div>
    </div>

    <div class="value-box">
        <div class="label">Estimated Market Value</div>
        <div class="value">${{ "{:,.0f}".format(valuation.calculated_value) }}</div>
        <div class="range">
            Value Range: ${{ "{:,.0f}".format(valuation.value_low) }} - ${{ "{:,.0f}".format(valuation.value_high) }}
        </div>
    </div>

    <div class="metric-row">
        <div class="metric">
            <div class="number">${{ "{:,.2f}".format(valuation.price_per_sqft_calculated) }}</div>
            <div class="label">Price per Sq Ft</div>
        </div>
        <div class="metric">
            <div class="number">{{ "{:,.0f}".format(valuation.square_footage) }}</div>
            <div class="label">Square Feet</div>
        </div>
        <div class="metric">
            <div class="number">{{ valuation.bedrooms }}</div>
            <div class="label">Bedrooms</div>
        </div>
        <div class="metric">
            <div class="number">{{ valuation.bathrooms }}</div>
            <div class="label">Bathrooms</div>
        </div>
    </div>

    <div class="two-column">
        <div class="column">
            <div class="section">
                <div class="section-title">Property Details</div>
                <div class="grid">
                    <div class="grid-row">
                        <div class="grid-cell label">Address</div>
                        <div class="grid-cell value">{{ valuation.street_address }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">City, State ZIP</div>
                        <div class="grid-cell value">{{ valuation.city }}, {{ valuation.state }} {{ valuation.zip_code }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Neighborhood</div>
                        <div class="grid-cell value">{{ valuation.neighborhood or 'Not specified' }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Property Type</div>
                        <div class="grid-cell value">{{ valuation.property_type | replace('_', ' ') | title }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Condition</div>
                        <div class="grid-cell value">{{ valuation.condition | title }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="section">
                <div class="section-title">Property Specifications</div>
                <div class="grid">
                    <div class="grid-row">
                        <div class="grid-cell label">Square Footage</div>
                        <div class="grid-cell value">{{ "{:,.0f}".format(valuation.square_footage) }} sq ft</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Lot Size</div>
                        <div class="grid-cell value">{{ "{:,.0f}".format(valuation.lot_size) if valuation.lot_size else 'N/A' }} sq ft</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Bedrooms</div>
                        <div class="grid-cell value">{{ valuation.bedrooms }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Bathrooms</div>
                        <div class="grid-cell value">{{ valuation.bathrooms }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Year Built</div>
                        <div class="grid-cell value">{{ valuation.year_built or 'N/A' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">External Estimates Comparison</div>
        <div class="estimates-grid">
            <div class="estimate-box">
                <div class="source">Zillow Estimate</div>
                <div class="amount zillow">
                    {% if valuation.zillow_estimate %}
                        ${{ "{:,.0f}".format(valuation.zillow_estimate) }}
                    {% else %}
                        Not Available
                    {% endif %}
                </div>
            </div>
            <div class="estimate-box">
                <div class="source">Redfin Estimate</div>
                <div class="amount redfin">
                    {% if valuation.redfin_estimate %}
                        ${{ "{:,.0f}".format(valuation.redfin_estimate) }}
                    {% else %}
                        Not Available
                    {% endif %}
                </div>
            </div>
            <div class="estimate-box">
                <div class="source">Last Sale Price</div>
                <div class="amount sale">
                    {% if valuation.last_purchase_price %}
                        ${{ "{:,.0f}".format(valuation.last_purchase_price) }}
                    {% else %}
                        Not Available
                    {% endif %}
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Market Trend Analysis</div>
        <div class="grid">
            <div class="grid-row">
                <div class="grid-cell label">Price/SqFt 12 Months Ago</div>
                <div class="grid-cell value">${{ "{:,.2f}".format(valuation.price_per_sqft_12mo) }}</div>
            </div>
            <div class="grid-row">
                <div class="grid-cell label">Price/SqFt 6 Months Ago</div>
                <div class="grid-cell value">${{ "{:,.2f}".format(valuation.price_per_sqft_6mo) }}</div>
            </div>
            <div class="grid-row">
                <div class="grid-cell label">Current Price/SqFt (Calculated)</div>
                <div class="grid-cell value">${{ "{:,.2f}".format(valuation.current_price_per_sqft) }}</div>
            </div>
            <div class="grid-row">
                <div class="grid-cell label">6-Month Appreciation</div>
                <div class="grid-cell value {{ 'positive' if appreciation_6mo > 0 else 'negative' }}">
                    {{ "{:+.1f}".format(appreciation_6mo) }}%
                </div>
            </div>
            <div class="grid-row">
                <div class="grid-cell label">12-Month Appreciation</div>
                <div class="grid-cell value {{ 'positive' if appreciation_12mo > 0 else 'negative' }}">
                    {{ "{:+.1f}".format(appreciation_12mo) }}%
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Valuation Breakdown</div>
        <table class="breakdown-table">
            <thead>
                <tr>
                    <th>Component</th>
                    <th class="amount">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Comparable Market Value</td>
                    <td class="amount">${{ "{:,.0f}".format(valuation.comparable_value) if valuation.comparable_value else 'N/A' }}</td>
                </tr>
                <tr>
                    <td>Trend Adjusted Value</td>
                    <td class="amount">${{ "{:,.0f}".format(valuation.trend_adjusted_value) if valuation.trend_adjusted_value else 'N/A' }}</td>
                </tr>
                <tr>
                    <td>Condition Adjustment</td>
                    <td class="amount {{ 'positive' if valuation.condition_adjustment and valuation.condition_adjustment > 0 else 'negative' if valuation.condition_adjustment and valuation.condition_adjustment < 0 else '' }}">
                        {{ "{:+,.0f}".format(valuation.condition_adjustment) if valuation.condition_adjustment else '$0' }}
                    </td>
                </tr>
                <tr>
                    <td>Age Adjustment</td>
                    <td class="amount {{ 'positive' if valuation.age_adjustment and valuation.age_adjustment > 0 else 'negative' if valuation.age_adjustment and valuation.age_adjustment < 0 else '' }}">
                        {{ "{:+,.0f}".format(valuation.age_adjustment) if valuation.age_adjustment else '$0' }}
                    </td>
                </tr>
                <tr class="total">
                    <td>Final Estimated Value</td>
                    <td class="amount">${{ "{:,.0f}".format(valuation.calculated_value) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    {% if valuation.notes %}
    <div class="notes-box">
        <h4>Additional Notes</h4>
        <p>{{ valuation.notes }}</p>
    </div>
    {% endif %}

    <div class="disclaimer">
        <h4>Important Disclaimer</h4>
        <p>
            This valuation report is for informational purposes only and should not be considered
            a formal appraisal or a guarantee of market value. The estimated value is based on
            available data and algorithmic calculations, and actual market conditions may vary.
            This report does not constitute professional real estate advice. For official property
            valuations, please consult a licensed appraiser. The user assumes all responsibility
            for any decisions made based on this information.
        </p>
    </div>

    <div class="footer">
        <p>Property Valuation Report | Generated {{ report_date }} | Report ID: {{ valuation.id }}</p>
        <p>This report was generated automatically and is valid as of the generation date.</p>
    </div>
</body>
</html>
"""


def generate_valuation_report(
    valuation,
    output_dir: Union[str, Path]
) -> Path:
    """
    Generate a PDF report for a property valuation.

    Args:
        valuation: PropertyValuation model instance
        output_dir: Directory to save the PDF file

    Returns:
        Path to the generated PDF file
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Calculate appreciation rates for template
    appreciation_6mo = 0.0
    appreciation_12mo = 0.0

    if valuation.price_per_sqft_6mo and valuation.current_price_per_sqft:
        appreciation_6mo = (
            (valuation.current_price_per_sqft - valuation.price_per_sqft_6mo)
            / valuation.price_per_sqft_6mo * 100
        )

    if valuation.price_per_sqft_12mo and valuation.current_price_per_sqft:
        appreciation_12mo = (
            (valuation.current_price_per_sqft - valuation.price_per_sqft_12mo)
            / valuation.price_per_sqft_12mo * 100
        )

    # Prepare template context
    context = {
        'valuation': valuation,
        'report_date': datetime.now().strftime('%B %d, %Y at %I:%M %p'),
        'appreciation_6mo': appreciation_6mo,
        'appreciation_12mo': appreciation_12mo,
    }

    # Render HTML template
    env = Environment(loader=BaseLoader())
    template = env.from_string(PDF_TEMPLATE)
    html_content = template.render(**context)

    # Generate filename
    safe_address = "".join(
        c if c.isalnum() or c in (' ', '-', '_') else '_'
        for c in valuation.street_address
    ).strip()[:50]

    filename = f"valuation_{valuation.id}_{safe_address}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    pdf_path = output_dir / filename

    if WEASYPRINT_AVAILABLE:
        # Generate PDF using WeasyPrint
        try:
            html = HTML(string=html_content)
            html.write_pdf(pdf_path)
            logger.info(f"PDF generated successfully: {pdf_path}")
            return pdf_path
        except Exception as e:
            logger.error(f"WeasyPrint PDF generation failed: {e}")
            # Fall back to text report
            return _generate_text_report(valuation, output_dir, context)
    else:
        # Fall back to simple text report
        return _generate_text_report(valuation, output_dir, context)


def _generate_text_report(valuation, output_dir: Path, context: dict):
    """
    Generate a simple text-based report as fallback.

    This is used when WeasyPrint is not available.
    """
    # Generate filename with .txt extension
    safe_address = "".join(
        c if c.isalnum() or c in (' ', '-', '_') else '_'
        for c in valuation.street_address
    ).strip()[:50]

    filename = f"valuation_{valuation.id}_{safe_address}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    text_path = output_dir / filename

    report_lines = [
        "=" * 70,
        "PROPERTY VALUATION REPORT",
        "=" * 70,
        "",
        f"Address: {valuation.full_address}",
        f"Report Date: {context['report_date']}",
        f"Report ID: {valuation.id}",
        "",
        "-" * 70,
        "ESTIMATED VALUE",
        "-" * 70,
        "",
        f"  Estimated Market Value:  ${valuation.calculated_value:,.0f}",
        f"  Value Range:             ${valuation.value_low:,.0f} - ${valuation.value_high:,.0f}",
        f"  Price per Sq Ft:         ${valuation.price_per_sqft_calculated:,.2f}",
        "",
        "-" * 70,
        "PROPERTY DETAILS",
        "-" * 70,
        "",
        f"  Square Footage:  {valuation.square_footage:,} sq ft",
        f"  Lot Size:        {valuation.lot_size:,} sq ft" if valuation.lot_size else "  Lot Size:        N/A",
        f"  Bedrooms:        {valuation.bedrooms}",
        f"  Bathrooms:       {valuation.bathrooms}",
        f"  Year Built:      {valuation.year_built}" if valuation.year_built else "  Year Built:      N/A",
        f"  Property Type:   {valuation.property_type.replace('_', ' ').title()}",
        f"  Condition:       {valuation.condition.title()}",
        "",
        "-" * 70,
        "EXTERNAL ESTIMATES",
        "-" * 70,
        "",
        f"  Zillow Estimate:    ${valuation.zillow_estimate:,.0f}" if valuation.zillow_estimate else "  Zillow Estimate:    Not Available",
        f"  Redfin Estimate:    ${valuation.redfin_estimate:,.0f}" if valuation.redfin_estimate else "  Redfin Estimate:    Not Available",
        f"  Last Sale Price:    ${valuation.last_purchase_price:,.0f}" if valuation.last_purchase_price else "  Last Sale Price:    Not Available",
        "",
        "-" * 70,
        "MARKET TRENDS",
        "-" * 70,
        "",
        f"  Price/SqFt 12 Months Ago:  ${valuation.price_per_sqft_12mo:,.2f}",
        f"  Price/SqFt 6 Months Ago:   ${valuation.price_per_sqft_6mo:,.2f}",
        f"  Current Price/SqFt:        ${valuation.current_price_per_sqft:,.2f}",
        f"  6-Month Appreciation:      {context['appreciation_6mo']:+.1f}%",
        f"  12-Month Appreciation:     {context['appreciation_12mo']:+.1f}%",
        "",
        "-" * 70,
        "DISCLAIMER",
        "-" * 70,
        "",
        "This valuation report is for informational purposes only and should",
        "not be considered a formal appraisal. Consult a licensed appraiser",
        "for official property valuations.",
        "",
        "=" * 70,
    ]

    with open(text_path, 'w') as f:
        f.write('\n'.join(report_lines))

    logger.info(f"Text report generated: {text_path}")

    return text_path
