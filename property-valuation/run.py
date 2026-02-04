#!/usr/bin/env python3
"""
Property Valuation Application Entry Point

Run this file to start the Flask development server.

Usage:
    python run.py
    python run.py --debug
    python run.py --host 0.0.0.0 --port 8080
"""
import argparse
import os
import sys

from app import create_app, db


def main():
    """Main entry point for the application."""
    parser = argparse.ArgumentParser(description='Property Valuation Application')
    parser.add_argument(
        '--host',
        default='127.0.0.1',
        help='Host to bind to (default: 127.0.0.1)'
    )
    parser.add_argument(
        '--port',
        type=int,
        default=5000,
        help='Port to bind to (default: 5000)'
    )
    parser.add_argument(
        '--debug',
        action='store_true',
        help='Enable debug mode'
    )
    parser.add_argument(
        '--config',
        default='development',
        choices=['development', 'production'],
        help='Configuration to use (default: development)'
    )

    args = parser.parse_args()

    # Create the Flask application
    app = create_app(args.config)

    # Set debug mode
    if args.debug:
        app.debug = True

    # Print startup information
    print("\n" + "=" * 60)
    print("  Property Valuation Application")
    print("=" * 60)
    print(f"  Host:        http://{args.host}:{args.port}")
    print(f"  Config:      {args.config}")
    print(f"  Debug:       {app.debug}")
    print(f"  Database:    {app.config['SQLALCHEMY_DATABASE_URI']}")
    print("=" * 60)
    print("\n  Press Ctrl+C to quit\n")

    # Run the application
    try:
        app.run(
            host=args.host,
            port=args.port,
            debug=app.debug,
            threaded=True
        )
    except KeyboardInterrupt:
        print("\n\nShutting down...")
        sys.exit(0)


if __name__ == '__main__':
    main()
