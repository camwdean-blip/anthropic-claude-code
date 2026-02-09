"""
Generates a professional Transaction Detail sheet as a PDF.
Uses reportlab for reliable cross-platform PDF generation.
Designed to fit on a single page.
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
GRAY = colors.HexColor("#cccccc")


def generate_td_sheet_pdf(txn):
    """
    Generate a TD sheet PDF for the given Transaction model instance.
    Everything fits on one page.
    Returns the path to the generated PDF file.
    """
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    tmp.close()

    doc = SimpleDocTemplate(
        tmp.name,
        pagesize=letter,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
        leftMargin=0.6 * inch,
        rightMargin=0.6 * inch,
    )

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        "Title2", parent=styles["Title"],
        textColor=BRAND_BLUE, fontSize=16, spaceAfter=2, spaceBefore=0, alignment=1,
    ))
    styles.add(ParagraphStyle(
        "SectionHead", parent=styles["Heading2"],
        textColor=BRAND_BLUE, fontSize=10, spaceBefore=8, spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        "SubInfo", parent=styles["Normal"],
        textColor=colors.HexColor("#555555"), fontSize=8, alignment=1,
    ))
    styles.add(ParagraphStyle(
        "NoteStyle", parent=styles["Normal"],
        fontSize=8, textColor=DARK_TEXT, spaceBefore=1, spaceAfter=1,
    ))

    elements = []

    # --- Title ---
    elements.append(Paragraph("Transaction Detail Sheet", styles["Title2"]))
    elements.append(Paragraph(
        f"MLS # {txn.mls_number} &nbsp;&nbsp;|&nbsp;&nbsp; "
        f"{txn.deal_type.title()} Side &nbsp;&nbsp;|&nbsp;&nbsp; "
        f"Offer Accepted: {_fmt_date(txn.offer_accepted_date)}",
        styles["SubInfo"]
    ))
    elements.append(Spacer(1, 4))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=BRAND_BLUE))
    elements.append(Spacer(1, 4))

    # --- Property Information (compact single table) ---
    elements.append(Paragraph("Property", styles["SectionHead"]))
    elements.append(_make_table([
        ("Address", txn.full_address),
        ("MLS #", txn.mls_number),
        ("Sale Price", f"${txn.price:,.2f}"),
        ("Neighborhood", txn.neighborhood),
    ]))

    # --- Buyer & Seller side by side ---
    elements.append(Paragraph("Parties", styles["SectionHead"]))
    half_w = 3.3 * inch
    buyer_data = [
        ["BUYER", ""],
        ["Name", txn.buyer_name or "—"],
        ["Email", txn.buyer_email or "—"],
    ]
    seller_data = [
        ["SELLER", ""],
        ["Name", txn.seller_name or "—"],
        ["Email", txn.seller_email or "—"],
    ]
    side_by_side = _two_column_tables(buyer_data, seller_data, half_w)
    elements.append(side_by_side)

    # --- Attorneys side by side ---
    elements.append(Paragraph("Attorneys", styles["SectionHead"]))
    buyer_atty = [
        ["BUYER'S ATTORNEY", ""],
        ["Name", txn.buyer_attorney_name or "—"],
        ["Firm", txn.buyer_attorney_firm or "—"],
        ["Address", txn.buyer_attorney_address or "—"],
        ["Phone", txn.buyer_attorney_phone or "—"],
        ["Email", txn.buyer_attorney_email or "—"],
    ]
    seller_atty = [
        ["SELLER'S ATTORNEY", ""],
        ["Name", txn.seller_attorney_name or "—"],
        ["Firm", txn.seller_attorney_firm or "—"],
        ["Address", txn.seller_attorney_address or "—"],
        ["Phone", txn.seller_attorney_phone or "—"],
        ["Email", txn.seller_attorney_email or "—"],
    ]
    elements.append(_two_column_tables(buyer_atty, seller_atty, half_w))

    # --- Key Dates & Commission side by side (dates gets more space) ---
    elements.append(Paragraph("Dates & Commission", styles["SectionHead"]))
    commission = txn.price * (txn.commission_percentage / 100)
    dates_data = [
        ["KEY DATES", ""],
        ["Offer Accepted", _fmt_date(txn.offer_accepted_date)],
        ["Purchase & Sale", _fmt_date(txn.purchase_and_sale_date)],
        ["Mortgage Contingency", _fmt_date(txn.mortgage_contingency_date)],
        ["Commission Deadline", _fmt_date(txn.commission_deadline)],
        ["Closing Date", _fmt_date(txn.closing_date)],
        ["Inspection", txn.inspection_date or "TBD"],
    ]
    commission_data = [
        ["COMMISSION", ""],
        ["Rate", f"{txn.commission_percentage}%"],
        ["Amount", f"${commission:,.2f}"],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
    ]
    dates_w = 4.2 * inch
    comm_w = 2.4 * inch
    elements.append(_two_column_tables_split(
        dates_data, right_data=commission_data,
        left_width=dates_w, right_width=comm_w,
        left_label_w=1.6 * inch, right_label_w=0.9 * inch,
    ))

    # --- Notes (only if any) ---
    notes_parts = []
    if txn.lead_paint_signed:
        notes_parts.append("Lead paint disclosure signed with offer")
    if txn.inspection_contingency_waived:
        notes_parts.append("Inspection contingency waived")
    if txn.dual_agency:
        notes_parts.append("Dual agency — consent required")

    if notes_parts:
        elements.append(Spacer(1, 4))
        elements.append(Paragraph("Notes", styles["SectionHead"]))
        for note in notes_parts:
            elements.append(Paragraph(f"  •  {note}", styles["NoteStyle"]))

    doc.build(elements)
    return tmp.name


def _make_table(rows):
    """Create a compact two-column label/value table."""
    data = [[label, value or "—"] for label, value in rows]
    table = Table(data, colWidths=[1.8 * inch, 5.0 * inch])
    table.setStyle(_base_style())
    return table


def _two_column_tables(left_data, right_data, half_width):
    """
    Place two mini-tables side by side inside an outer table.
    First row of each is treated as a sub-header.
    """
    label_w = 1.2 * inch
    value_w = half_width - label_w - 0.1 * inch

    def make_inner(data):
        t = Table(data, colWidths=[label_w, value_w])
        style_cmds = list(_base_style().getCommands())
        # Sub-header row styling
        style_cmds.extend([
            ("SPAN", (0, 0), (1, 0)),
            ("BACKGROUND", (0, 0), (1, 0), BRAND_BLUE),
            ("TEXTCOLOR", (0, 0), (1, 0), colors.white),
            ("FONTNAME", (0, 0), (1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (1, 0), 7),
            ("ALIGN", (0, 0), (1, 0), "LEFT"),
        ])
        t.setStyle(TableStyle(style_cmds))
        return t

    left_table = make_inner(left_data)
    right_table = make_inner(right_data)

    outer = Table(
        [[left_table, right_table]],
        colWidths=[half_width, half_width],
    )
    outer.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 6),
        ("RIGHTPADDING", (1, 0), (1, 0), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return outer


def _two_column_tables_split(left_data, right_data, left_width, right_width,
                              left_label_w, right_label_w):
    """
    Like _two_column_tables but with independent widths for each side.
    Allows dates to get more room and commission to be narrower.
    """
    def make_inner(data, label_w, total_w):
        value_w = total_w - label_w - 0.1 * inch
        t = Table(data, colWidths=[label_w, value_w])
        style_cmds = list(_base_style().getCommands())
        style_cmds.extend([
            ("SPAN", (0, 0), (1, 0)),
            ("BACKGROUND", (0, 0), (1, 0), BRAND_BLUE),
            ("TEXTCOLOR", (0, 0), (1, 0), colors.white),
            ("FONTNAME", (0, 0), (1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (1, 0), 7),
            ("ALIGN", (0, 0), (1, 0), "LEFT"),
        ])
        t.setStyle(TableStyle(style_cmds))
        return t

    left_table = make_inner(left_data, left_label_w, left_width)
    right_table = make_inner(right_data, right_label_w, right_width)

    outer = Table(
        [[left_table, right_table]],
        colWidths=[left_width, right_width],
    )
    outer.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 6),
        ("RIGHTPADDING", (1, 0), (1, 0), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return outer


def _base_style():
    """Shared compact table style."""
    return TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), BRAND_LIGHT),
        ("TEXTCOLOR", (0, 0), (0, -1), BRAND_BLUE),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("TEXTCOLOR", (1, 0), (1, -1), DARK_TEXT),
        ("GRID", (0, 0), (-1, -1), 0.4, GRAY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ])


def _fmt_date(d):
    if d is None:
        return "TBD"
    return d.strftime("%B %d, %Y")
