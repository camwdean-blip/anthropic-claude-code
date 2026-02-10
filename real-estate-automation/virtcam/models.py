"""
VirtCam database models.

Each Transaction row represents one deal — all the fields you track
from offer acceptance through closing.
"""

from datetime import datetime, date

from app import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # --- Status ---
    status = db.Column(db.String(20), default="active")  # active, closed, withdrawn

    # --- Property ---
    address = db.Column(db.String(200), nullable=False)
    unit = db.Column(db.String(20), default="")
    neighborhood = db.Column(db.String(100), default="")
    city = db.Column(db.String(100), default="")
    state = db.Column(db.String(2), default="MA")
    zip_code = db.Column(db.String(10), default="")
    mls_number = db.Column(db.String(50), default="")

    # --- Deal Info ---
    deal_type = db.Column(db.String(10), nullable=False)  # buyer, seller
    price = db.Column(db.Float, nullable=False)
    offer_accepted_date = db.Column(db.Date, nullable=True)
    purchase_and_sale_date = db.Column(db.Date, nullable=True)
    mortgage_contingency_date = db.Column(db.Date, nullable=True)
    closing_date = db.Column(db.Date, nullable=True)
    commission_deadline = db.Column(db.Date, nullable=True)
    commission_percentage = db.Column(db.Float, default=0.0)
    bonus = db.Column(db.Float, default=0.0)
    agent = db.Column(db.String(100), default="")
    deal_count = db.Column(db.Integer, default=0)

    # --- Buyer ---
    buyer_name = db.Column(db.String(200), default="")
    buyer_email = db.Column(db.String(200), default="")

    # --- Seller ---
    seller_name = db.Column(db.String(200), default="")
    seller_email = db.Column(db.String(200), default="")

    # --- Buyer Attorney ---
    buyer_attorney_name = db.Column(db.String(200), default="")
    buyer_attorney_firm = db.Column(db.String(200), default="")
    buyer_attorney_address = db.Column(db.String(300), default="")
    buyer_attorney_phone = db.Column(db.String(30), default="")
    buyer_attorney_email = db.Column(db.String(200), default="")

    # --- Seller Attorney ---
    seller_attorney_name = db.Column(db.String(200), default="")
    seller_attorney_firm = db.Column(db.String(200), default="")
    seller_attorney_address = db.Column(db.String(300), default="")
    seller_attorney_phone = db.Column(db.String(30), default="")
    seller_attorney_email = db.Column(db.String(200), default="")

    # --- Inspection ---
    inspection_date = db.Column(db.String(100), default="")  # free text: "1:30pm Friday 3/15"
    inspection_contingency_waived = db.Column(db.Boolean, default=False)

    # --- Notes ---
    notes = db.Column(db.Text, default="")

    # --- Toggles ---
    lead_paint_signed = db.Column(db.Boolean, default=False)
    dual_agency = db.Column(db.Boolean, default=False)

    # --- Milestone Tracking ---
    deposit_confirmed = db.Column(db.Boolean, default=False)
    invoice_created = db.Column(db.Boolean, default=False)
    smoke_scheduled = db.Column(db.Boolean, default=False)
    six_d_completed = db.Column(db.Boolean, default=False)
    scan_completed = db.Column(db.Boolean, default=False)

    # --- Computed ---
    @property
    def gci(self):
        """Gross Commission Income for this deal."""
        commission = self.price * (self.commission_percentage / 100)
        return commission + (self.bonus or 0)

    @property
    def full_address(self):
        parts = [self.address]
        if self.unit:
            parts.append(f"Unit {self.unit}")
        if self.city:
            parts.append(self.city)
        if self.state:
            parts.append(self.state)
        if self.zip_code:
            parts.append(self.zip_code)
        return ", ".join(parts)

    @property
    def deadline_status(self):
        """Returns 'green', 'yellow', or 'red' based on nearest upcoming deadline."""
        today = date.today()
        deadlines = []
        for field_name in ["purchase_and_sale_date", "mortgage_contingency_date",
                           "commission_deadline", "closing_date"]:
            d = getattr(self, field_name)
            if d and d >= today:
                deadlines.append(d)

        if not deadlines:
            return "green"

        nearest = min(deadlines)
        days_until = (nearest - today).days

        if days_until <= 3:
            return "red"
        elif days_until <= 7:
            return "yellow"
        return "green"


class DealFile(db.Model):
    """Uploaded files associated with a transaction."""
    __tablename__ = "deal_files"

    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"), nullable=False)
    filename = db.Column(db.String(300), nullable=False)
    original_name = db.Column(db.String(300), nullable=False)
    file_type = db.Column(db.String(50), default="other")  # offer, mls, condo_docs, financials, what_to_expect, other
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    transaction = db.relationship("Transaction", backref=db.backref("files", lazy=True))
