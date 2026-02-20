"""
Deadline monitor — scans active transactions and generates alert summaries.

Can produce a daily briefing or an alert for a specific transaction.
"""

from datetime import date, timedelta

from agent.core import ask_claude


BRIEFING_PROMPT = """\
You are a real estate transaction coordinator's AI assistant. You will receive
a list of upcoming deadlines across active deals. Generate a concise daily
briefing that:

1. Highlights urgent items (within 3 days) at the top with clear action items
2. Lists upcoming items (within 7 days) with reminders
3. Provides a quick overall status summary
4. Suggests any proactive actions the coordinator should take

Keep it scannable — use bullet points and bold the most important info.
Format as plain text (no markdown), suitable for displaying in a web app or
sending as an email. Keep it under 500 words.
"""


def get_upcoming_deadlines(transactions, days_ahead=7):
    """
    Scan transactions and return a list of upcoming deadlines.

    Returns:
        list of dicts with keys: txn_id, address, field_label, date, days_until
    """
    today = date.today()
    cutoff = today + timedelta(days=days_ahead)

    date_fields = [
        ("Purchase & Sale", "purchase_and_sale_date"),
        ("Mortgage Contingency", "mortgage_contingency_date"),
        ("Commission Deadline", "commission_deadline"),
        ("Closing", "closing_date"),
    ]

    deadlines = []
    for txn in transactions:
        if txn.status != "active":
            continue
        for label, field in date_fields:
            d = getattr(txn, field)
            if d and today <= d <= cutoff:
                deadlines.append({
                    "txn_id": txn.id,
                    "address": txn.address,
                    "field_label": label,
                    "date": d.isoformat(),
                    "days_until": (d - today).days,
                })

    deadlines.sort(key=lambda x: x["date"])
    return deadlines


def generate_briefing(transactions):
    """
    Generate an AI-powered daily briefing from all active transactions.

    Args:
        transactions: list of Transaction model instances.

    Returns:
        dict with "deadlines" (raw list) and "briefing" (AI-generated summary).
    """
    deadlines = get_upcoming_deadlines(transactions, days_ahead=14)

    if not deadlines:
        active = [t for t in transactions if t.status == "active"]
        return {
            "deadlines": [],
            "briefing": (
                f"All clear! You have {len(active)} active deal(s) with no "
                "deadlines coming up in the next 14 days."
            ),
        }

    # Build context for Claude
    lines = []
    for d in deadlines:
        urgency = ""
        if d["days_until"] == 0:
            urgency = " [TODAY]"
        elif d["days_until"] <= 3:
            urgency = f" [URGENT - {d['days_until']} day(s)]"
        else:
            urgency = f" [{d['days_until']} days]"

        lines.append(f"- {d['address']}: {d['field_label']} on {d['date']}{urgency}")

    # Add milestone context for urgent deals
    urgent_txn_ids = {d["txn_id"] for d in deadlines if d["days_until"] <= 3}
    for txn in transactions:
        if txn.id in urgent_txn_ids:
            incomplete = []
            if not txn.deposit_confirmed:
                incomplete.append("deposit not confirmed")
            if not txn.invoice_created:
                incomplete.append("invoice not created")
            if not txn.smoke_scheduled:
                incomplete.append("smoke not scheduled")
            if not txn.six_d_completed:
                incomplete.append("6D not completed")
            if not txn.scan_completed:
                incomplete.append("scan not completed")
            if incomplete:
                lines.append(f"  ^ {txn.address} incomplete milestones: {', '.join(incomplete)}")

    active_count = sum(1 for t in transactions if t.status == "active")
    context = (
        f"Today is {date.today().isoformat()}.\n"
        f"Total active deals: {active_count}\n\n"
        f"Upcoming deadlines:\n" + "\n".join(lines)
    )

    try:
        briefing = ask_claude(BRIEFING_PROMPT, context)
    except Exception as e:
        briefing = f"Could not generate AI briefing: {e}\n\nRaw deadlines:\n" + "\n".join(lines)

    return {
        "deadlines": deadlines,
        "briefing": briefing,
    }
