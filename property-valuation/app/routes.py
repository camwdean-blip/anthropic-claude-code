"""
Flask routes for Property Valuation Application
"""
import os
import logging
from datetime import datetime
from pathlib import Path

from flask import (
    Blueprint, render_template, request, redirect,
    url_for, flash, jsonify, send_file, current_app
)

from app import db
from app.models import PropertyValuation, ScrapingLog
from app.forms import PropertyValuationForm
from app.scraper import PropertyScraper
from app.valuation import PropertyValuator, ValuationInput
from app.pdf_generator import generate_valuation_report

logger = logging.getLogger(__name__)

main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    """Home page with valuation form."""
    form = PropertyValuationForm()
    return render_template('index.html', form=form)


@main_bp.route('/valuate', methods=['POST'])
def valuate():
    """Process valuation form and calculate property value."""
    form = PropertyValuationForm()

    if not form.validate_on_submit():
        # Return to form with errors
        for field, errors in form.errors.items():
            for error in errors:
                flash(f"{field}: {error}", 'error')
        return render_template('index.html', form=form)

    try:
        # Build full address
        full_address = form.get_full_address()

        # Initialize scraped data dictionary
        scraped_data = {
            'zillow_estimate': None,
            'redfin_estimate': None,
            'zillow_rent_estimate': None,
            'last_sold_price': None,
            'last_sold_date': None,
            'errors': []
        }

        # Check if user provided manual estimates
        manual_zillow = form.zillow_estimate_manual.data
        manual_redfin = form.redfin_estimate_manual.data
        manual_last_price = form.last_purchase_price_manual.data

        # If no manual estimates, try to scrape
        if not manual_zillow and not manual_redfin:
            try:
                scraper = PropertyScraper(use_selenium_fallback=True)
                scraped_result = scraper.get_aggregated_data(full_address)

                scraped_data['zillow_estimate'] = scraped_result.get('zillow_estimate')
                scraped_data['redfin_estimate'] = scraped_result.get('redfin_estimate')
                scraped_data['zillow_rent_estimate'] = (
                    scraped_result.get('raw_zillow').rent_estimate
                    if scraped_result.get('raw_zillow') else None
                )
                scraped_data['last_sold_price'] = scraped_result.get('last_sold_price')
                scraped_data['last_sold_date'] = scraped_result.get('last_sold_date')
                scraped_data['errors'] = scraped_result.get('errors', [])

                # Log scraping attempts
                for source in ['zillow', 'redfin']:
                    raw_data = scraped_result.get(f'raw_{source}')
                    if raw_data:
                        log = ScrapingLog(
                            source=source,
                            address=full_address,
                            status='success' if not raw_data.error else 'failed',
                            error_message=raw_data.error,
                        )
                        db.session.add(log)

            except Exception as e:
                logger.error(f"Scraping failed: {e}")
                scraped_data['errors'].append(f"Scraping error: {str(e)}")
        else:
            # Use manual estimates
            scraped_data['zillow_estimate'] = manual_zillow
            scraped_data['redfin_estimate'] = manual_redfin

        if manual_last_price:
            scraped_data['last_sold_price'] = manual_last_price

        # Create valuation input
        valuation_input = ValuationInput(
            square_footage=form.square_footage.data,
            bedrooms=form.bedrooms.data,
            bathrooms=form.bathrooms.data,
            property_type=form.property_type.data,
            condition=form.condition.data,
            price_per_sqft_6mo=form.price_per_sqft_6mo.data,
            price_per_sqft_12mo=form.price_per_sqft_12mo.data,
            lot_size=form.lot_size.data,
            year_built=form.year_built.data,
            neighborhood=form.neighborhood.data,
            zillow_estimate=scraped_data['zillow_estimate'],
            redfin_estimate=scraped_data['redfin_estimate'],
            last_purchase_price=scraped_data['last_sold_price'],
        )

        # Calculate valuation
        valuator = PropertyValuator()
        result = valuator.calculate_valuation(valuation_input)

        # Save to database
        valuation_record = PropertyValuation(
            # Address
            street_address=form.street_address.data,
            city=form.city.data,
            state=form.state.data,
            zip_code=form.zip_code.data,
            full_address=full_address,

            # Property details
            square_footage=form.square_footage.data,
            lot_size=form.lot_size.data,
            bedrooms=form.bedrooms.data,
            bathrooms=form.bathrooms.data,
            year_built=form.year_built.data,
            property_type=form.property_type.data,
            condition=form.condition.data,
            neighborhood=form.neighborhood.data,

            # Market data
            price_per_sqft_6mo=form.price_per_sqft_6mo.data,
            price_per_sqft_12mo=form.price_per_sqft_12mo.data,
            current_price_per_sqft=result.price_per_sqft,

            # External estimates
            zillow_estimate=scraped_data['zillow_estimate'],
            zillow_rent_estimate=scraped_data.get('zillow_rent_estimate'),
            redfin_estimate=scraped_data['redfin_estimate'],
            last_purchase_price=scraped_data['last_sold_price'],

            # Calculated values
            calculated_value=result.estimated_value,
            value_low=result.value_low,
            value_high=result.value_high,
            price_per_sqft_calculated=result.price_per_sqft,

            # Components
            comparable_value=result.comparable_value,
            trend_adjusted_value=result.trend_adjusted_value,
            condition_adjustment=result.condition_adjustment,
            age_adjustment=result.age_adjustment,

            # Notes
            notes=form.notes.data,
            scraping_status='completed' if not scraped_data['errors'] else 'partial',
            scraping_error='; '.join(scraped_data['errors']) if scraped_data['errors'] else None,
        )

        db.session.add(valuation_record)
        db.session.commit()

        # Flash any scraping errors as warnings
        for error in scraped_data['errors']:
            flash(error, 'warning')

        return redirect(url_for('main.results', valuation_id=valuation_record.id))

    except Exception as e:
        logger.error(f"Valuation error: {e}")
        db.session.rollback()
        flash(f"An error occurred: {str(e)}", 'error')
        return render_template('index.html', form=form)


@main_bp.route('/results/<int:valuation_id>')
def results(valuation_id):
    """Display valuation results."""
    valuation = PropertyValuation.query.get_or_404(valuation_id)
    return render_template('results.html', valuation=valuation)


@main_bp.route('/history')
def history():
    """Display valuation history."""
    page = request.args.get('page', 1, type=int)
    per_page = 10

    valuations = PropertyValuation.query.order_by(
        PropertyValuation.created_at.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)

    return render_template('history.html', valuations=valuations)


@main_bp.route('/valuation/<int:valuation_id>')
def view_valuation(valuation_id):
    """View a specific valuation from history."""
    valuation = PropertyValuation.query.get_or_404(valuation_id)
    return render_template('results.html', valuation=valuation)


@main_bp.route('/valuation/<int:valuation_id>/delete', methods=['POST'])
def delete_valuation(valuation_id):
    """Delete a valuation record."""
    valuation = PropertyValuation.query.get_or_404(valuation_id)

    # Delete associated PDF if exists
    if valuation.report_path:
        try:
            Path(valuation.report_path).unlink(missing_ok=True)
        except Exception as e:
            logger.error(f"Failed to delete PDF: {e}")

    db.session.delete(valuation)
    db.session.commit()

    flash('Valuation deleted successfully.', 'success')
    return redirect(url_for('main.history'))


@main_bp.route('/valuation/<int:valuation_id>/pdf')
def generate_pdf(valuation_id):
    """Generate and download PDF or text report."""
    valuation = PropertyValuation.query.get_or_404(valuation_id)

    try:
        # Generate report (PDF if WeasyPrint available, otherwise text)
        reports_dir = current_app.config['REPORTS_DIR']
        report_path = generate_valuation_report(valuation, reports_dir)

        # Update record with report path
        valuation.report_path = str(report_path)
        db.session.commit()

        # Determine file type based on extension
        is_pdf = str(report_path).endswith('.pdf')

        if is_pdf:
            return send_file(
                report_path,
                mimetype='application/pdf',
                as_attachment=True,
                download_name=f"valuation_{valuation.id}_{datetime.now().strftime('%Y%m%d')}.pdf"
            )
        else:
            return send_file(
                report_path,
                mimetype='text/plain',
                as_attachment=True,
                download_name=f"valuation_{valuation.id}_{datetime.now().strftime('%Y%m%d')}.txt"
            )

    except Exception as e:
        logger.error(f"Report generation error: {e}")
        flash(f"Failed to generate report: {str(e)}", 'error')
        return redirect(url_for('main.results', valuation_id=valuation_id))


@main_bp.route('/api/scrape', methods=['POST'])
def api_scrape():
    """API endpoint to scrape property data without full valuation."""
    data = request.get_json()
    address = data.get('address')

    if not address:
        return jsonify({'error': 'Address is required'}), 400

    try:
        scraper = PropertyScraper(use_selenium_fallback=True)
        result = scraper.get_aggregated_data(address)

        return jsonify({
            'success': True,
            'data': {
                'zillow_estimate': result.get('zillow_estimate'),
                'redfin_estimate': result.get('redfin_estimate'),
                'last_sold_price': result.get('last_sold_price'),
                'last_sold_date': result.get('last_sold_date'),
                'bedrooms': result.get('bedrooms'),
                'bathrooms': result.get('bathrooms'),
                'square_footage': result.get('square_footage'),
                'year_built': result.get('year_built'),
            },
            'errors': result.get('errors', [])
        })

    except Exception as e:
        logger.error(f"API scrape error: {e}")
        return jsonify({'error': str(e)}), 500


@main_bp.route('/api/valuation/<int:valuation_id>')
def api_valuation(valuation_id):
    """API endpoint to get valuation data as JSON."""
    valuation = PropertyValuation.query.get_or_404(valuation_id)
    return jsonify(valuation.to_dict())


@main_bp.route('/api/history')
def api_history():
    """API endpoint to get valuation history as JSON."""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    valuations = PropertyValuation.query.order_by(
        PropertyValuation.created_at.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'valuations': [v.to_dict() for v in valuations.items],
        'total': valuations.total,
        'pages': valuations.pages,
        'current_page': valuations.page,
    })


@main_bp.errorhandler(404)
def not_found(e):
    """Handle 404 errors."""
    return render_template('404.html'), 404


@main_bp.errorhandler(500)
def server_error(e):
    """Handle 500 errors."""
    return render_template('500.html'), 500
