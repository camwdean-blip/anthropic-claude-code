#!/usr/bin/env python3
"""
VirtCam — Real Estate Transaction Automation
Run this file to start the web app.

Usage:
    python3 run.py
    Then open http://localhost:5000 in your browser.
"""

from app import create_app

app = create_app()

if __name__ == "__main__":
    print("\n  VirtCam is running!")
    print("  Open http://localhost:5000 in your browser.\n")
    app.run(debug=True, host="0.0.0.0", port=5000)
