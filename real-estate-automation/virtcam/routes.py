"""
VirtCam routes — all pages and actions.
"""

import os
import uuid
from datetime import datetime, date

from flask import (
    Blueprint, render_template, request, redirect, url_for, flash,
    current_app, send_file
)
from werkzeug.utils import secure_filename

from app import db
from models import Transaction, DealFile
from utils.td_sheet_pdf import generate_td_sheet_pdf

main_bp = Blueprint("main", __name__)


# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------

@main_bp.route("/")
def dashboard():
    status_filter = request.args.get("status", "active")
    deal_type_filter = request.args.get("deal_type", "all")

    query = Transaction.query

    if status_filter != "all":
        query = query.filter_by(status=status_filter)
    if deal_type_filter != "all":
        query = query.filter_by(deal_type=deal_type_filter)

    transactions = query.order_by(Transaction.offer_accepted_date.desc()).all()

    total_gci = sum(t.gci for t in transactions)
    active_count = Transaction.query.filter_by(status="active").count()

    return render_template(
        "dashboard.html",
        transactions=transactions,
        total_gci=total_gci,
        active_count=active_count,
        status_filter=status_filter,
        deal_type_filter=deal_type_filter,
    )


# ---------------------------------------------------------------------------
# New Transaction
# ---------------------------------------------------------------------------

@main_bp.route("/transaction/new", methods=["GET", "POST"])
def new_transaction():
    if request.method == "POST":
        txn = Transaction(
            # Property
            address=request.form.get("address", "").strip(),
            unit=request.form.get("unit", "").strip(),
            neighborhood=request.form.get("neighborhood", "").strip(),
            city=request.form.get("city", "").strip(),
            state=request.form.get("state", "MA").strip(),
            zip_code=request.form.get("zip_code", "").strip(),
            mls_number=request.form.get("mls_number", "").strip(),
            # Deal
            deal_type=request.form.get("deal_type", "buyer"),
            price=float(request.form.get("price", 0) or 0),
            offer_accepted_date=_parse_date(request.form.get("offer_accepted_date")),
            purchase_and_sale_date=_parse_date(request.form.get("purchase_and_sale_date")),
            mortgage_contingency_date=_parse_date(request.form.get("mortgage_contingency_date")),
            closing_date=_parse_date(request.form.get("closing_date")),
            commission_deadline=_parse_date(request.form.get("commission_deadline")),
            commission_percentage=float(request.form.get("commission_percentage", 0) or 0),
            bonus=float(request.form.get("bonus", 0) or 0),
            agent=request.form.get("agent", "").strip(),
            deal_count=int(request.form.get("deal_count", 0) or 0),
            # Buyer
            buyer_name=request.form.get("buyer_name", "").strip(),
            buyer_email=request.form.get("buyer_email", "").strip(),
            # Seller
            seller_name=request.form.get("seller_name", "").strip(),
            seller_email=request.form.get("seller_email", "").strip(),
            # Buyer Attorney
            buyer_attorney_name=request.form.get("buyer_attorney_name", "").strip(),
            buyer_attorney_firm=request.form.get("buyer_attorney_firm", "").strip(),
            buyer_attorney_address=request.form.get("buyer_attorney_address", "").strip(),
            buyer_attorney_phone=request.form.get("buyer_attorney_phone", "").strip(),
            buyer_attorney_email=request.form.get("buyer_attorney_email", "").strip(),
            # Seller Attorney
            seller_attorney_name=request.form.get("seller_attorney_name", "").strip(),
            seller_attorney_firm=request.form.get("seller_attorney_firm", "").strip(),
            seller_attorney_address=request.form.get("seller_attorney_address", "").strip(),
            seller_attorney_phone=request.form.get("seller_attorney_phone", "").strip(),
            seller_attorney_email=request.form.get("seller_attorney_email", "").strip(),
            # Inspection
            inspection_date=request.form.get("inspection_date", "").strip(),
            inspection_contingency_waived="inspection_contingency_waived" in request.form,
            # Toggles
            lead_paint_signed="lead_paint_signed" in request.form,
            dual_agency="dual_agency" in request.form,
        )

        db.session.add(txn)
        db.session.commit()

        flash(f"Transaction created for {txn.address}!", "success")
        return redirect(url_for("main.transaction_detail", txn_id=txn.id))

    return render_template("new_transaction.html")


# ---------------------------------------------------------------------------
# Transaction Detail
# ---------------------------------------------------------------------------

@main_bp.route("/transaction/<int:txn_id>")
def transaction_detail(txn_id):
    txn = Transaction.query.get_or_404(txn_id)
    tab = request.args.get("tab", "overview")
    files = DealFile.query.filter_by(transaction_id=txn_id).order_by(DealFile.uploaded_at.desc()).all()
    return render_template("transaction_detail.html", txn=txn, tab=tab, files=files)


# ---------------------------------------------------------------------------
# Edit Transaction
# ---------------------------------------------------------------------------

@main_bp.route("/transaction/<int:txn_id>/edit", methods=["GET", "POST"])
def edit_transaction(txn_id):
    txn = Transaction.query.get_or_404(txn_id)

    if request.method == "POST":
        txn.address = request.form.get("address", "").strip()
        txn.unit = request.form.get("unit", "").strip()
        txn.neighborhood = request.form.get("neighborhood", "").strip()
        txn.city = request.form.get("city", "").strip()
        txn.state = request.form.get("state", "MA").strip()
        txn.zip_code = request.form.get("zip_code", "").strip()
        txn.mls_number = request.form.get("mls_number", "").strip()
        txn.deal_type = request.form.get("deal_type", "buyer")
        txn.price = float(request.form.get("price", 0) or 0)
        txn.offer_accepted_date = _parse_date(request.form.get("offer_accepted_date"))
        txn.purchase_and_sale_date = _parse_date(request.form.get("purchase_and_sale_date"))
        txn.mortgage_contingency_date = _parse_date(request.form.get("mortgage_contingency_date"))
        txn.closing_date = _parse_date(request.form.get("closing_date"))
        txn.commission_deadline = _parse_date(request.form.get("commission_deadline"))
        txn.commission_percentage = float(request.form.get("commission_percentage", 0) or 0)
        txn.bonus = float(request.form.get("bonus", 0) or 0)
        txn.agent = request.form.get("agent", "").strip()
        txn.deal_count = int(request.form.get("deal_count", 0) or 0)
        txn.buyer_name = request.form.get("buyer_name", "").strip()
        txn.buyer_email = request.form.get("buyer_email", "").strip()
        txn.seller_name = request.form.get("seller_name", "").strip()
        txn.seller_email = request.form.get("seller_email", "").strip()
        txn.buyer_attorney_name = request.form.get("buyer_attorney_name", "").strip()
        txn.buyer_attorney_firm = request.form.get("buyer_attorney_firm", "").strip()
        txn.buyer_attorney_address = request.form.get("buyer_attorney_address", "").strip()
        txn.buyer_attorney_phone = request.form.get("buyer_attorney_phone", "").strip()
        txn.buyer_attorney_email = request.form.get("buyer_attorney_email", "").strip()
        txn.seller_attorney_name = request.form.get("seller_attorney_name", "").strip()
        txn.seller_attorney_firm = request.form.get("seller_attorney_firm", "").strip()
        txn.seller_attorney_address = request.form.get("seller_attorney_address", "").strip()
        txn.seller_attorney_phone = request.form.get("seller_attorney_phone", "").strip()
        txn.seller_attorney_email = request.form.get("seller_attorney_email", "").strip()
        txn.inspection_date = request.form.get("inspection_date", "").strip()
        txn.inspection_contingency_waived = "inspection_contingency_waived" in request.form
        txn.lead_paint_signed = "lead_paint_signed" in request.form
        txn.dual_agency = "dual_agency" in request.form
        txn.status = request.form.get("status", "active")

        # Milestone checkboxes
        txn.deposit_confirmed = "deposit_confirmed" in request.form
        txn.invoice_created = "invoice_created" in request.form
        txn.smoke_scheduled = "smoke_scheduled" in request.form
        txn.six_d_completed = "six_d_completed" in request.form
        txn.scan_completed = "scan_completed" in request.form

        db.session.commit()
        flash("Transaction updated.", "success")
        return redirect(url_for("main.transaction_detail", txn_id=txn.id))

    return render_template("edit_transaction.html", txn=txn)


# ---------------------------------------------------------------------------
# TD Sheet PDF Download
# ---------------------------------------------------------------------------

@main_bp.route("/transaction/<int:txn_id>/td-sheet")
def download_td_sheet(txn_id):
    txn = Transaction.query.get_or_404(txn_id)
    pdf_path = generate_td_sheet_pdf(txn)
    return send_file(pdf_path, as_attachment=True,
                     download_name=f"TD_Sheet_{txn.address.replace(' ', '_')}.pdf")


# ---------------------------------------------------------------------------
# File Upload
# ---------------------------------------------------------------------------

ALLOWED_EXTENSIONS = {"pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg"}


@main_bp.route("/transaction/<int:txn_id>/upload", methods=["POST"])
def upload_file(txn_id):
    txn = Transaction.query.get_or_404(txn_id)

    if "file" not in request.files:
        flash("No file selected.", "error")
        return redirect(url_for("main.transaction_detail", txn_id=txn.id, tab="documents"))

    file = request.files["file"]
    if file.filename == "":
        flash("No file selected.", "error")
        return redirect(url_for("main.transaction_detail", txn_id=txn.id, tab="documents"))

    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        flash(f"File type .{ext} not allowed.", "error")
        return redirect(url_for("main.transaction_detail", txn_id=txn.id, tab="documents"))

    # Create deal-specific folder
    deal_folder = os.path.join(current_app.config["UPLOAD_FOLDER"], str(txn.id))
    os.makedirs(deal_folder, exist_ok=True)

    original_name = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4().hex[:8]}_{original_name}"
    file.save(os.path.join(deal_folder, unique_name))

    file_type = request.form.get("file_type", "other")
    deal_file = DealFile(
        transaction_id=txn.id,
        filename=unique_name,
        original_name=file.filename,
        file_type=file_type,
    )
    db.session.add(deal_file)
    db.session.commit()

    flash(f"Uploaded {file.filename}.", "success")
    return redirect(url_for("main.transaction_detail", txn_id=txn.id, tab="documents"))


@main_bp.route("/transaction/<int:txn_id>/file/<int:file_id>/download")
def download_file(txn_id, file_id):
    deal_file = DealFile.query.get_or_404(file_id)
    file_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"], str(txn_id), deal_file.filename
    )
    return send_file(file_path, as_attachment=True, download_name=deal_file.original_name)


@main_bp.route("/transaction/<int:txn_id>/file/<int:file_id>/delete", methods=["POST"])
def delete_file(txn_id, file_id):
    deal_file = DealFile.query.get_or_404(file_id)
    file_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"], str(txn_id), deal_file.filename
    )
    if os.path.exists(file_path):
        os.remove(file_path)
    db.session.delete(deal_file)
    db.session.commit()
    flash("File deleted.", "success")
    return redirect(url_for("main.transaction_detail", txn_id=txn_id, tab="documents"))


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _parse_date(val):
    if not val:
        return None
    try:
        return datetime.strptime(val, "%Y-%m-%d").date()
    except ValueError:
        return None
