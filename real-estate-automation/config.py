"""
Configuration for the real estate transaction automation tool.
Copy config_example.py to config.py and fill in your values.
"""

import os

# --- Email (SMTP) Settings ---
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Transaction Coordinator")
EMAIL_FROM_ADDRESS = os.environ.get("EMAIL_FROM_ADDRESS", SMTP_USER)

# --- File Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
TRACKING_SPREADSHEET = os.path.join(OUTPUT_DIR, "transaction_log.xlsx")

# --- Commission Invoice Defaults ---
PAYMENT_TERMS = "Net 30 — due at closing"
INVOICE_NOTES = "Thank you for your business."
