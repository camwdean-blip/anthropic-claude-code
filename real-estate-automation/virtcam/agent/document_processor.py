"""
AI-powered document processor — extracts transaction fields from PDFs using Claude.

Replaces regex-based extraction with intelligent parsing that understands
context, handles varying formats, and catches fields regex would miss.
"""

import json
import fitz  # PyMuPDF

from agent.core import ask_claude


EXTRACTION_PROMPT = """\
You are a real estate transaction data extraction specialist. You will receive
the raw text content of a PDF document (either a purchase offer or an MLS
listing sheet). Extract every relevant field you can find.

Return ONLY a JSON object with these keys (use empty string "" for any field
you cannot find — never invent data):

{
  "address": "street address",
  "unit": "unit/apt number",
  "city": "city name",
  "state": "two-letter state code",
  "zip_code": "ZIP code",
  "neighborhood": "neighborhood or area name",
  "mls_number": "MLS listing number",
  "price": "sale price as a number (no commas or $)",
  "deal_type": "buyer or seller (infer from context, default to buyer)",
  "buyer_name": "full buyer name(s)",
  "seller_name": "full seller name(s)",
  "buyer_email": "buyer email if present",
  "seller_email": "seller email if present",
  "offer_accepted_date": "YYYY-MM-DD format",
  "purchase_and_sale_date": "YYYY-MM-DD format",
  "mortgage_contingency_date": "YYYY-MM-DD format",
  "closing_date": "YYYY-MM-DD format",
  "commission_deadline": "YYYY-MM-DD format",
  "inspection_date": "free text date/time",
  "commission_percentage": "number (e.g. 2.5)",
  "agent": "listing or buyer agent name",
  "buyer_attorney_name": "",
  "buyer_attorney_firm": "",
  "buyer_attorney_email": "",
  "buyer_attorney_phone": "",
  "seller_attorney_name": "",
  "seller_attorney_firm": "",
  "seller_attorney_email": "",
  "seller_attorney_phone": ""
}

Important:
- For dates, convert to YYYY-MM-DD format. If only month/day given, assume current year.
- Price should be a plain number (e.g. 650000, not $650,000).
- Commission percentage should be a plain number (e.g. 2.5, not 2.5%).
- If the document mentions both a buyer agent and listing agent, extract both
  but put the primary agent in the "agent" field.
- Return ONLY the JSON. No explanation, no markdown fences.
"""


def extract_text_from_pdf(pdf_path):
    """Extract all text from a PDF using PyMuPDF."""
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text


def ai_extract_fields(pdf_path, doc_type="auto"):
    """
    Extract transaction fields from a PDF using Claude.

    Args:
        pdf_path: Path to the PDF file.
        doc_type: "offer", "mls", or "auto" (let Claude figure it out).

    Returns:
        dict of extracted fields.
    """
    raw_text = extract_text_from_pdf(pdf_path)

    if not raw_text.strip():
        return {"error": "Could not extract text from PDF."}

    # Truncate very long documents to stay within token limits
    if len(raw_text) > 15000:
        raw_text = raw_text[:15000] + "\n...[truncated]"

    context = ""
    if doc_type == "offer":
        context = "This is a PURCHASE OFFER document. "
    elif doc_type == "mls":
        context = "This is an MLS LISTING SHEET. "

    user_message = f"{context}Here is the document text:\n\n{raw_text}"

    try:
        response = ask_claude(EXTRACTION_PROMPT, user_message)
        # Parse JSON from response — handle potential markdown fences
        clean = response.strip()
        if clean.startswith("```"):
            clean = clean.split("\n", 1)[1]
            clean = clean.rsplit("```", 1)[0]
        fields = json.loads(clean)

        # Clean up: remove keys with empty/null values for cleaner output
        return {k: v for k, v in fields.items() if v}
    except json.JSONDecodeError:
        return {"error": "AI response was not valid JSON.", "raw": response}
    except Exception as e:
        return {"error": str(e)}


def ai_extract_multiple(pdf_paths):
    """
    Extract fields from multiple PDFs and merge results.
    Later documents overwrite earlier ones for conflicting fields.
    """
    merged = {}
    for path, doc_type in pdf_paths:
        fields = ai_extract_fields(path, doc_type)
        if "error" not in fields:
            merged.update(fields)
    return merged
