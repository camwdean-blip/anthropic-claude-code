"""
Sends transaction documents to the attorney via email (SMTP).
"""

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

import config


def send_documents(transaction, td_sheet_path, invoice_path, dry_run=False):
    """
    Email the TD sheet and commission invoice to the attorney.

    Args:
        transaction: dict with keys from the CSV row.
        td_sheet_path: path to the TD sheet .docx.
        invoice_path: path to the invoice .docx.
        dry_run: if True, build the message but skip actual sending.

    Returns:
        dict with status info.
    """
    attorney_email = transaction["attorney_email"]
    attorney_name = transaction["attorney_name"]
    property_addr = transaction["property_address"]

    msg = MIMEMultipart()
    msg["From"] = f"{config.EMAIL_FROM_NAME} <{config.EMAIL_FROM_ADDRESS}>"
    msg["To"] = attorney_email
    msg["Subject"] = f"Transaction Documents — {property_addr}"

    body = (
        f"Dear {attorney_name},\n\n"
        f"Please find attached the Transaction Detail sheet and Commission Invoice "
        f"for the property at {property_addr}.\n\n"
        f"Closing Date: {transaction['closing_date']}\n"
        f"Buyer: {transaction['buyer_name']}\n"
        f"Seller: {transaction['seller_name']}\n\n"
        f"Please let us know if you need any additional information.\n\n"
        f"Best regards,\n"
        f"{transaction['agent_name']}\n"
        f"{transaction['brokerage_name']}"
    )
    msg.attach(MIMEText(body, "plain"))

    # Attach files
    for filepath in [td_sheet_path, invoice_path]:
        with open(filepath, "rb") as f:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={os.path.basename(filepath)}",
            )
            msg.attach(part)

    result = {
        "to": attorney_email,
        "subject": msg["Subject"],
        "attachments": [os.path.basename(td_sheet_path), os.path.basename(invoice_path)],
    }

    if dry_run:
        result["status"] = "dry_run"
        result["message"] = "Email built but not sent (dry-run mode)"
        return result

    if not config.SMTP_USER or not config.SMTP_PASSWORD:
        result["status"] = "skipped"
        result["message"] = (
            "SMTP credentials not configured. Set SMTP_USER and SMTP_PASSWORD "
            "environment variables or update config.py."
        )
        return result

    try:
        with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(config.SMTP_USER, config.SMTP_PASSWORD)
            server.send_message(msg)
        result["status"] = "sent"
        result["message"] = f"Email sent to {attorney_email}"
    except Exception as e:
        result["status"] = "error"
        result["message"] = str(e)

    return result
