"""
Property Valuation Application
Flask application factory and initialization
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config

# Initialize extensions
db = SQLAlchemy()


def create_app(config_name='default'):
    """
    Application factory for creating Flask app instances.

    Args:
        config_name: Configuration environment name

    Returns:
        Flask application instance
    """
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)

    # Ensure directories exist
    app.config['REPORTS_DIR'].mkdir(parents=True, exist_ok=True)

    # Register blueprints
    from app.routes import main_bp
    app.register_blueprint(main_bp)

    # Create database tables
    with app.app_context():
        db.create_all()

    return app
