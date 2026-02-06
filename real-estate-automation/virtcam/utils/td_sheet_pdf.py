"""
Generates a professional Transaction Detail sheet as a PDF.
Uses reportlab for reliable cross-platform PDF generation.
"""

import os
import tempfile

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, HRFlowable
)


BRAND_BLUE = colors.HexColor("#1a3c6e")
BRAND_LIGHT = colors.HexColor("#e8edf4")
DARK_TEXT = colors.HexColor("#1e1e1e")


def generate_td_sheet_pdf(txn):
    """
    Generate a TD sheet PDF for the given Transaction model instance.
    Returns the path to the generated PDF file.
    """
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()

    doc = SimpleDocTemplate(
        tmp.name,
        pagesize=letter,
        topMargin=0.6 * inch,
        bottomMargin=0.5 * inch,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
    )

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        "BrandTitle", parent=styles["Title"],
        textColor=BRAND_BLUE, fontSize=20, spaceAfter=4, alignment=1,
    ))
    styles.add(ParagraphStyle(
        "SectionHead", parent=styles["Heading2"],
        textColor=BRAND_BLUE, fontSize=13, spaceBefore=14, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        "SubInfo", parent=styles["Normal"],
        textColor=colors.HexColor("#555555"), fontSize=9, alignment=1,
    ))

    elements = []

    # --- Title ---
    elements.append(Paragraph("VirtCam — Transaction Detail Sheet", styles["BrandTitle"]))
    elements.append(Paragraph(
        f"MLS # {txn.mls_number} &nbsp;&nbsp;|&nbsp;&nbsp; "
        f"{txn.deal_type.title()} Side &nbsp;&nbsp;|&nbsp;&nbsp; "
        f"Offer Accepted: {_fmt_date(txn.offer_accepted_date)}",
        styles["SubInfo"]
    ))
    elements.append(Spacer(1, 10))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=BRAND_BLUE))
    elements.append(Spacer(1, 8))

    # --- Property Information ---
    elements.append(Paragraph("Property Information", styles["SectionHead"]))
    elements.append(_make_table([
        ("Address", txn.full_address),
        ("MLS #", txn.mls_number),
        ("Sale Price", f"${txn.price:,.2f}"),
        ("Neighborhood", txn.neighborhood),
    ]))

    # --- Parties ---
    elements.append(Paragraph("Buyer", styles["SectionHead"]))
    elements.append(_make_table([
        ("Name", txn.buyer_name),
        ("Email", txn.buyer_email),
    ]))

    elements.append(Paragraph("Seller", styles["SectionHead"]))
    elements.append(_make_table([
        ("Name", txn.seller_name),
        ("Email", txn.seller_email),
    ]))

    # --- Attorneys ---
    elements.append(Paragraph("Buyer's Attorney", styles["SectionHead"]))
    elements.append(_make_table([
        ("Name", txn.buyer_attorney_name),
        ("Firm", txn.buyer_attorney_firm),
        ("Address", txn.buyer_attorney_address),
        ("Phone", txn.buyer_attorney_phone),
        ("Email", txn.buyer_attorney_email),
    ]))

    elements.append(Paragraph("Seller's Attorney", styles["SectionHead"]))
    elements.append(_make_table([
        ("Name", txn.seller_attorney_name),
        ("Firm", txn.seller_attorney_firm),
        ("Address", txn.seller_attorney_address),
        ("Phone", txn.seller_attorney_phone),
        ("Email", txn.seller_attorney_email),
    ]))

    # --- Key Dates ---
    elements.append(Paragraph("Key Dates", styles["SectionHead"]))
    elements.append(_make_table([
        ("Offer Accepted", _fmt_date(txn.offer_accepted_date)),
        ("Purchase & Sale", _fmt_date(txn.purchase_and_sale_date)),
        ("Mortgage Contingency", _fmt_date(txn.mortgage_contingency_date)),
        ("Commission Deadline", _fmt_date(txn.commission_deadline)),
        ("Closing Date", _fmt_date(txn.closing_date)),
        ("Inspection", txn.inspection_date or "TBD"),
    ]))

    # --- Commission ---
    commission = txn.price * (txn.commission_percentage / 100)
    elements.append(Paragraph("Commission", styles["SectionHead"]))
    elements.append(_make_table([
        ("Rate", f"{txn.commission_percentage}%"),
        ("Commission", f"${commission:,.2f}"),
        ("Bonus", f"${txn.bonus:,.2f}" if txn.bonus else "—"),
        ("Total GCI", f"${txn.gci:,.2f}"),
    ]))

    # --- Notes ---
    notes_parts = []
    if txn.lead_paint_signed:
        notes_parts.append("Lead paint disclosure signed with offer")
    if txn.inspection_contingency_waived:
        notes_parts.append("Inspection contingency waived")
    if txn.dual_agency:
        notes_parts.append("Dual agency — consent required")

    if notes_parts:
        elements.append(Paragraph("Notes", styles["SectionHead"]))
        for note in notes_parts:
            elements.append(Paragraph(f"• {note}", styles["Normal"]))

    doc.build(elements)
    return tmp.name


def _make_table(rows):
    """Create a styled two-column label/value table."""
    data = [[label, value or "—"] for label, value in rows]
    table = Table(data, colWidths=[2.2 * inch, 4.5 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), BRAND_LIGHT),
        ("TEXTCOLOR", (0, 0), (0, -1), BRAND_BLUE),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (1, 0), (1, -1), DARK_TEXT),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cccccc")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ]))
    return table


def _fmt_date(d):
    if d is None:
        return "TBD"
    return d.strftime("%B %d, %Y")
