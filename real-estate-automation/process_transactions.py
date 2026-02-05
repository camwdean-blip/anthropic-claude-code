#!/usr/bin/env python3
"""
Real Estate Transaction Automation

Reads transactions from a CSV file, and for each row:
  1. Generates a Transaction Detail (TD) sheet (.docx)
  2. Generates a Commission Invoice (.docx)
  3. Emails both documents to the closing attorney
  4. Logs everything to a tracking spreadsheet (.xlsx)

Usage:
    python process_transactions.py transactions.csv
    python process_transactions.py transactions.csv --dry-run
"""

import argparse
import csv
import os
import sys

import config
from td_sheet import generate_td_sheet
from commission_invoice import generate_invoice
from email_sender import send_documents
from tracker import log_transaction

REQUIRED_FIELDS = [
    "property_address", "city", "state", "zip", "sale_price",
    "buyer_name", "buyer_email", "seller_name", "seller_email",
    "attorney_name", "attorney_email", "closing_date",
    "commission_rate", "agent_name", "agent_license",
    "brokerage_name", "brokerage_address", "mls_number",
]


def validate_row(row, row_num):
    """Check that all required fields are present and non-empty."""
    missing = [f for f in REQUIRED_FIELDS if not row.get(f, "").strip()]
    if missing:
        print(f"  WARNING: Row {row_num} is missing fields: {', '.join(missing)} — skipping.")
        return False
    try:
        float(row["sale_price"])
        float(row["commission_rate"])
    except ValueError:
        print(f"  WARNING: Row {row_num} has non-numeric sale_price or commission_rate — skipping.")
        return False
    return True


def process_csv(csv_path, dry_run=False):
    """Process all transactions in the given CSV file."""
    if not os.path.isfile(csv_path):
        print(f"ERROR: File not found: {csv_path}")
        sys.exit(1)

    os.makedirs(config.OUTPUT_DIR, exist_ok=True)

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    if not rows:
        print("No transactions found in the CSV file.")
        return

    print(f"Found {len(rows)} transaction(s) in {csv_path}\n")

    success_count = 0
    error_count = 0

    for i, row in enumerate(rows, start=1):
        addr = row.get("property_address", "UNKNOWN")
        print(f"[{i}/{len(rows)}] Processing: {addr}")

        if not validate_row(row, i):
            error_count += 1
            continue

        # 1. Generate TD Sheet
        try:
            td_path = generate_td_sheet(row)
            print(f"  TD Sheet  -> {td_path}")
        except Exception as e:
            print(f"  ERROR generating TD sheet: {e}")
            error_count += 1
            continue

        # 2. Generate Commission Invoice
        try:
            inv_path, inv_number, commission = generate_invoice(row)
            print(f"  Invoice   -> {inv_path}")
            print(f"  Commission: ${commission:,.2f} (Invoice #{inv_number})")
        except Exception as e:
            print(f"  ERROR generating invoice: {e}")
            error_count += 1
            continue

        # 3. Email to Attorney
        try:
            email_result = send_documents(row, td_path, inv_path, dry_run=dry_run)
            email_status = email_result["status"]
            print(f"  Email     -> {email_result['message']}")
        except Exception as e:
            email_status = "error"
            print(f"  ERROR sending email: {e}")

        # 4. Log to Tracking Spreadsheet
        try:
            log_path = log_transaction(
                row, inv_number, commission, td_path, inv_path, email_status
            )
            print(f"  Logged    -> {log_path}")
        except Exception as e:
            print(f"  ERROR logging transaction: {e}")

        success_count += 1
        print()

    print("=" * 60)
    print(f"Done. {success_count} succeeded, {error_count} failed out of {len(rows)} total.")
    print(f"Output directory: {config.OUTPUT_DIR}")
    print(f"Tracking spreadsheet: {config.TRACKING_SPREADSHEET}")


def main():
    parser = argparse.ArgumentParser(
        description="Automate real estate transaction document generation and delivery."
    )
    parser.add_argument(
        "csv_file",
        help="Path to the CSV file containing transaction data.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Generate documents but skip sending emails.",
    )
    args = parser.parse_args()
    process_csv(args.csv_file, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
