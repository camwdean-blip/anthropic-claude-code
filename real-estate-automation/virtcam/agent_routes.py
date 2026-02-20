"""
VirtCam Agent routes — AI-powered endpoints.
"""

import os
import uuid

from flask import (
    Blueprint, request, jsonify, current_app, render_template
)
from werkzeug.utils import secure_filename

from app import db
from models import Transaction

agent_bp = Blueprint("agent", __name__, url_prefix="/agent")

ALLOWED_EXTENSIONS = {"pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg"}


def _ai_available():
    """Check if the Anthropic API key is configured."""
    return bool(os.environ.get("ANTHROPIC_API_KEY"))


# ---------------------------------------------------------------------------
# AI-Powered PDF Extraction
# ---------------------------------------------------------------------------

@agent_bp.route("/extract", methods=["POST"])
def ai_extract():
    """
    Accept PDFs, extract fields using Claude AI, return JSON.
    Falls back to regex extraction if API key is not set.
    """
    if not _ai_available():
        return jsonify({"error": "ANTHROPIC_API_KEY not set. AI extraction unavailable."}), 503

    from agent.document_processor import ai_extract_fields

    staging_dir = os.path.join(current_app.config["UPLOAD_FOLDER"], "_staging")
    os.makedirs(staging_dir, exist_ok=True)

    all_fields = {}
    uploaded_files = {}

    file_map = [
        ("offer_file", "offer"),
        ("mls_file", "mls"),
        ("condo_docs_file", "condo_docs"),
        ("financials_file", "financials"),
    ]

    for form_key, file_type in file_map:
        file = request.files.get(form_key)
        if not file or file.filename == "":
            continue

        ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
        if ext not in ALLOWED_EXTENSIONS:
            continue

        # Save to staging
        safe_name = secure_filename(file.filename)
        staged_name = f"{uuid.uuid4().hex[:8]}_{safe_name}"
        staged_path = os.path.join(staging_dir, staged_name)
        file.save(staged_path)

        uploaded_files[file_type] = staged_name

        # AI extraction on PDFs
        if file_type in ("offer", "mls") and ext == "pdf":
            try:
                fields = ai_extract_fields(staged_path, file_type)
                if "error" not in fields:
                    all_fields.update(fields)
            except Exception as e:
                all_fields["_extraction_error"] = str(e)

    # Remove internal fields
    all_fields = {k: v for k, v in all_fields.items() if not k.startswith("_")}

    return jsonify({"fields": all_fields, "uploaded_files": uploaded_files})


# ---------------------------------------------------------------------------
# AI Email Drafting
# ---------------------------------------------------------------------------

@agent_bp.route("/draft-email", methods=["POST"])
def ai_draft_email():
    """
    Draft a context-aware email for a transaction.

    Expects JSON: {
        "txn_id": 1,
        "email_type": "follow_up|status_update|deadline_reminder|...|custom",
        "recipient": "buyer|seller|buyer_attorney|seller_attorney",
        "custom_instructions": "optional free text"
    }
    """
    if not _ai_available():
        return jsonify({"error": "ANTHROPIC_API_KEY not set."}), 503

    from agent.email_drafter import draft_email

    data = request.get_json()
    txn_id = data.get("txn_id")
    email_type = data.get("email_type", "custom")
    recipient = data.get("recipient", "buyer")
    custom_instructions = data.get("custom_instructions", "")

    txn = Transaction.query.get(txn_id)
    if not txn:
        return jsonify({"error": "Transaction not found."}), 404

    result = draft_email(txn, email_type, recipient, custom_instructions)
    return jsonify(result)


# ---------------------------------------------------------------------------
# Daily Briefing
# ---------------------------------------------------------------------------

@agent_bp.route("/briefing")
def ai_briefing():
    """
    Generate an AI-powered daily briefing of upcoming deadlines.
    Returns JSON with deadlines list and AI-generated summary.
    """
    if not _ai_available():
        return jsonify({"error": "ANTHROPIC_API_KEY not set."}), 503

    from agent.deadline_monitor import generate_briefing

    transactions = Transaction.query.all()
    result = generate_briefing(transactions)
    return jsonify(result)


# ---------------------------------------------------------------------------
# Agent Status
# ---------------------------------------------------------------------------

@agent_bp.route("/status")
def agent_status():
    """Check if the AI agent is configured and available."""
    available = _ai_available()
    return jsonify({
        "available": available,
        "message": "AI agent is ready." if available else (
            "Set ANTHROPIC_API_KEY environment variable to enable AI features."
        ),
    })
