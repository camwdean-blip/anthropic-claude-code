"""
Generates a commission invoice as a Word document.
"""

import os
from datetime import datetime

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

import config


def generate_invoice(transaction, invoice_number=None, output_path=None):
    """
    Generate a commission invoice Word document.

    Args:
        transaction: dict with keys from the CSV row.
        invoice_number: optional; auto-generated from timestamp if omitted.
        output_path: optional explicit path; otherwise auto-generated.

    Returns:
        str: path to the generated .docx file.
    """
    if invoice_number is None:
        invoice_number = f"INV-{datetime.now().strftime('%Y%m%d%H%M%S')}"

    sale_price = float(transaction["sale_price"])
    rate = float(transaction["commission_rate"])
    commission = sale_price * (rate / 100)

    doc = Document()

    # --- Header ---
    header = doc.add_heading("Commission Invoice", level=0)
    header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for run in header.runs:
        run.font.color.rgb = RGBColor(0x1A, 0x3C, 0x6E)

    # Invoice metadata
    meta = doc.add_paragraph()
    meta.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    meta.add_run(f"Invoice #: {invoice_number}\n").bold = True
    meta.add_run(f"Date: {datetime.now().strftime('%B %d, %Y')}\n")
    meta.add_run(f"Due: At closing ({transaction['closing_date']})\n")

    doc.add_paragraph()  # spacer

    # --- From (Brokerage) ---
    from_p = doc.add_paragraph()
    from_p.add_run("FROM:\n").bold = True
    from_p.add_run(f"{transaction['brokerage_name']}\n")
    from_p.add_run(f"{transaction['brokerage_address']}\n")
    from_p.add_run(f"Agent: {transaction['agent_name']} (Lic# {transaction['agent_license']})\n")

    # --- To (Attorney) ---
    to_p = doc.add_paragraph()
    to_p.add_run("TO:\n").bold = True
    to_p.add_run(f"{transaction['attorney_name']}\n")
    to_p.add_run(f"{transaction['attorney_email']}\n")

    doc.add_paragraph()  # spacer

    # --- Line Items Table ---
    table = doc.add_table(rows=4, cols=2)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    headers = [
        ("Description", "Amount"),
        ("Property", transaction["property_address"]),
        (f"Commission ({rate}% of ${sale_price:,.2f})", f"${commission:,.2f}"),
        ("Total Due", f"${commission:,.2f}"),
    ]

    for i, (col1, col2) in enumerate(headers):
        c1 = table.cell(i, 0)
        c2 = table.cell(i, 1)
        c1.text = col1
        c2.text = str(col2)

        is_header = i == 0
        is_total = i == len(headers) - 1

        for cell in (c1, c2):
            for paragraph in cell.paragraphs:
                for run in paragraph.runs:
                    run.font.size = Pt(10)
                    if is_header or is_total:
                        run.bold = True
                    if is_total:
                        run.font.color.rgb = RGBColor(0x1A, 0x3C, 0x6E)

    doc.add_paragraph()  # spacer

    # --- Payment Terms ---
    terms = doc.add_paragraph()
    terms.add_run("Payment Terms: ").bold = True
    terms.add_run(config.PAYMENT_TERMS)

    notes = doc.add_paragraph()
    notes.add_run("Notes: ").bold = True
    notes.add_run(config.INVOICE_NOTES)

    # --- Determine output path ---
    if output_path is None:
        safe_address = transaction["property_address"].replace(" ", "_").replace("/", "-")
        filename = f"Invoice_{safe_address}_{invoice_number}.docx"
        output_path = os.path.join(config.OUTPUT_DIR, filename)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    return output_path, invoice_number, commission
