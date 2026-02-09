"""
PDF text extraction and field parsing for real estate documents.

Extracts raw text from PDFs using PyMuPDF, then applies pattern matching
to pull out common fields from offer and MLS sheet formats.
"""

import re
from datetime import datetime


def extract_text_from_pdf(file_path):
    """Extract all text from a PDF file using PyMuPDF."""
    import fitz  # PyMuPDF
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            page_text = page.get_text()
            if page_text:
                text += page_text + "\n"
    return text


def parse_offer_fields(text):
    """
    Attempt to extract deal fields from an offer PDF's raw text.
    Returns a dict of field_name -> value for any fields found.
    Works best with standard Massachusetts real estate offer forms.
    """
    fields = {}
    text_upper = text.upper()

    # --- Price ---
    price_patterns = [
        r'(?:purchase|sale|offer)\s*price[:\s]*\$?\s*([\d,]+(?:\.\d{2})?)',
        r'(?:price|amount)[:\s]*\$\s*([\d,]+(?:\.\d{2})?)',
        r'\$\s*([\d,]{6,}(?:\.\d{2})?)',  # any large dollar amount
    ]
    for pat in price_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            fields["price"] = m.group(1).replace(",", "")
            break

    # --- Address ---
    addr_patterns = [
        r'(?:property|premises|address)[:\s]*(\d+[^,\n]{5,60})',
        r'(?:located at|known as)[:\s]*(\d+[^,\n]{5,60})',
    ]
    for pat in addr_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            addr = m.group(1).strip().rstrip(".,;")
            fields["address"] = addr
            break

    # --- City / State / Zip from address context ---
    # Require city to start with a letter and be at least 3 alpha chars
    city_state_pat = r'([A-Za-z][A-Za-z\s]{2,30}),\s*(MA|Massachusetts)\s+(\d{5}(?:-\d{4})?)'
    m = re.search(city_state_pat, text, re.IGNORECASE)
    if m:
        city = m.group(1).strip()
        if len(city) >= 3:
            fields["city"] = city
        fields["state"] = "MA"
        fields["zip_code"] = m.group(3).strip()

    # --- Buyer ---
    buyer_patterns = [
        r'(?:buyer|purchaser|offered by)[:\s]*([A-Z][a-zA-Z\s\.\-\']{3,60})',
        r'(?:BUYER|PURCHASER)[:\s]*([A-Z][a-zA-Z\s\.\-\']{3,60})',
    ]
    for pat in buyer_patterns:
        m = re.search(pat, text)
        if m:
            name = m.group(1).strip()
            # Clean up — stop at common following words
            name = re.split(r'\b(?:of|at|herein|hereby|agrees|the)\b', name, flags=re.IGNORECASE)[0].strip()
            if len(name) > 3 and not name.isupper():
                fields["buyer_name"] = name
            elif name.isupper() and len(name) > 3:
                fields["buyer_name"] = name.title()
            break

    # --- Seller ---
    seller_patterns = [
        r'(?:seller|owner|offered to)[:\s]*([A-Z][a-zA-Z\s\.\-\']{3,60})',
        r'(?:SELLER|OWNER)[:\s]*([A-Z][a-zA-Z\s\.\-\']{3,60})',
    ]
    for pat in seller_patterns:
        m = re.search(pat, text)
        if m:
            name = m.group(1).strip()
            name = re.split(r'\b(?:of|at|herein|hereby|agrees|the)\b', name, flags=re.IGNORECASE)[0].strip()
            if len(name) > 3 and not name.isupper():
                fields["seller_name"] = name
            elif name.isupper() and len(name) > 3:
                fields["seller_name"] = name.title()
            break

    # --- Dates ---
    date_patterns = [
        (r'(?:offer|acceptance)\s*date[:\s]*([\d]{1,2}[/\-][\d]{1,2}[/\-][\d]{2,4})', "offer_accepted_date"),
        (r'(?:closing|close)\s*date[:\s]*([\d]{1,2}[/\-][\d]{1,2}[/\-][\d]{2,4})', "closing_date"),
        (r'(?:inspection)[^.]{0,40}([\d]{1,2}[/\-][\d]{1,2}[/\-][\d]{2,4})', "inspection_date"),
    ]
    for pat, field in date_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            date_str = m.group(1)
            parsed = _try_parse_date(date_str)
            if parsed:
                fields[field] = parsed

    # --- Unit/Apt ---
    unit_pat = r'(?:unit|apt|apartment|#)\s*(\w{1,10})'
    m = re.search(unit_pat, text, re.IGNORECASE)
    if m:
        unit = m.group(1).strip()
        if unit and not unit.lower() in ("the", "and", "for"):
            fields["unit"] = unit

    # --- Deposit ---
    deposit_pat = r'(?:deposit|earnest\s*money)[:\s]*\$?\s*([\d,]+(?:\.\d{2})?)'
    m = re.search(deposit_pat, text, re.IGNORECASE)
    if m:
        fields["_deposit"] = m.group(1).replace(",", "")

    return fields


def parse_mls_fields(text):
    """
    Attempt to extract fields from an MLS sheet PDF's raw text.
    MLS sheets tend to be more structured with labeled fields.
    """
    fields = {}

    # --- MLS Number ---
    mls_patterns = [
        r'(?:MLS|ML)\s*#?\s*:?\s*(\d{5,12})',
        r'(?:Listing)\s*#?\s*:?\s*(\d{5,12})',
    ]
    for pat in mls_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            fields["mls_number"] = m.group(1)
            break

    # --- Address ---
    addr_patterns = [
        r'(?:address|location)[:\s]*(\d+[^,\n]{5,60})',
        r'^(\d+\s+\w[^\n]{5,50})',  # first line starting with a number
    ]
    for pat in addr_patterns:
        m = re.search(pat, text, re.IGNORECASE | re.MULTILINE)
        if m:
            fields["address"] = m.group(1).strip().rstrip(".,;")
            break

    # --- City/State/Zip ---
    city_state_pat = r'([A-Za-z][A-Za-z\s]{2,30}),\s*(MA|Massachusetts)\s+(\d{5}(?:-\d{4})?)'
    m = re.search(city_state_pat, text, re.IGNORECASE)
    if m:
        city = m.group(1).strip()
        if len(city) >= 3:
            fields["city"] = city
        fields["state"] = "MA"
        fields["zip_code"] = m.group(3).strip()

    # --- Price ---
    price_patterns = [
        r'(?:list\s*price|price|asking)[:\s]*\$?\s*([\d,]+(?:\.\d{2})?)',
        r'\$\s*([\d,]{6,}(?:\.\d{2})?)',
    ]
    for pat in price_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            fields["price"] = m.group(1).replace(",", "")
            break

    # --- Neighborhood / Area ---
    area_patterns = [
        r'(?:neighborhood|area|subdivision)[:\s]*([A-Za-z\s]{3,40})',
    ]
    for pat in area_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            fields["neighborhood"] = m.group(1).strip()
            break

    # --- Unit ---
    unit_pat = r'(?:unit|apt)\s*#?\s*:?\s*(\w{1,10})'
    m = re.search(unit_pat, text, re.IGNORECASE)
    if m:
        fields["unit"] = m.group(1).strip()

    # --- Listing Agent ---
    agent_patterns = [
        r'(?:listing\s*agent|agent)[:\s]*([A-Z][a-zA-Z\s\.\-\']{3,40})',
    ]
    for pat in agent_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            fields["agent"] = m.group(1).strip()
            break

    return fields


def extract_fields_from_pdf(file_path, file_type):
    """
    Main entry point. Extract text from a PDF and parse based on doc type.

    Args:
        file_path: path to the PDF
        file_type: "offer" or "mls"

    Returns:
        dict of extracted fields (may be empty if nothing found)
    """
    try:
        text = extract_text_from_pdf(file_path)
    except Exception:
        return {}

    if not text.strip():
        return {}

    if file_type == "offer":
        return _clean_fields(parse_offer_fields(text))
    elif file_type == "mls":
        return _clean_fields(parse_mls_fields(text))
    else:
        # Try both and merge (offer takes precedence for overlapping fields)
        mls_fields = parse_mls_fields(text)
        offer_fields = parse_offer_fields(text)
        mls_fields.update(offer_fields)
        return _clean_fields(mls_fields)


def _clean_fields(fields):
    """Clean up common extraction artifacts — newlines, trailing junk."""
    cleaned = {}
    for key, val in fields.items():
        if isinstance(val, str):
            # Take only the first line (newlines come from PDF layout)
            val = val.split("\n")[0].strip()
            # Remove trailing punctuation artifacts
            val = val.rstrip(".,;:")
        cleaned[key] = val
    return cleaned


def _try_parse_date(date_str):
    """Try to parse common date formats, return ISO string or None."""
    for fmt in ("%m/%d/%Y", "%m/%d/%y", "%m-%d-%Y", "%m-%d-%y"):
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None
