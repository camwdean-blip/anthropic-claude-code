# Real Estate Transaction Automation

Automates the document generation and delivery workflow for real estate closings.

## What It Does

For each transaction row in a CSV file, the script:

1. **Generates a Transaction Detail (TD) sheet** — a formatted Word document with property, buyer, seller, agent, and attorney information
2. **Generates a Commission Invoice** — a Word document with line items, totals, and payment terms
3. **Emails both documents** to the closing attorney via SMTP
4. **Logs everything** to a tracking spreadsheet (`transaction_log.xlsx`)

## Setup

```bash
cd real-estate-automation
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Configure Email (optional)

Set environment variables for SMTP:

```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=you@gmail.com
export SMTP_PASSWORD=your-app-password
export EMAIL_FROM_NAME="Transaction Coordinator"
```

Or edit `config.py` directly.

## Usage

```bash
# Process transactions (dry-run — generates docs but skips email)
python3 process_transactions.py sample/transactions.csv --dry-run

# Process and send emails
python3 process_transactions.py sample/transactions.csv
```

## CSV Format

Your CSV must include these columns:

| Column | Description |
|---|---|
| `property_address` | Street address |
| `city` | City |
| `state` | State abbreviation |
| `zip` | ZIP code |
| `sale_price` | Numeric sale price |
| `buyer_name` | Buyer full name |
| `buyer_email` | Buyer email |
| `seller_name` | Seller full name |
| `seller_email` | Seller email |
| `attorney_name` | Closing attorney name |
| `attorney_email` | Attorney email |
| `closing_date` | Closing date (YYYY-MM-DD) |
| `commission_rate` | Commission percentage (e.g., 3.0) |
| `agent_name` | Agent full name |
| `agent_license` | Agent license number |
| `brokerage_name` | Brokerage name |
| `brokerage_address` | Brokerage address |
| `mls_number` | MLS listing number |

See `sample/transactions.csv` for an example.

## Output

All generated files go to the `output/` directory:

- `TD_Sheet_<address>.docx` — Transaction Detail sheets
- `Invoice_<address>_<number>.docx` — Commission invoices
- `transaction_log.xlsx` — Tracking spreadsheet with all processed transactions
