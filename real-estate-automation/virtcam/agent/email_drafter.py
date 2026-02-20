"""
AI-powered email drafter — generates context-aware emails beyond templates.

Can draft follow-ups, status updates, custom correspondence, and more
based on the full transaction context.
"""

from agent.core import ask_claude

EMAIL_SYSTEM_PROMPT = """\
You are a professional real estate transaction coordinator assistant named Cam.
You draft emails on behalf of the coordinator. Your tone is:
- Professional but warm
- Concise — no fluff
- Action-oriented — always clear about what's needed
- Knowledgeable about Massachusetts real estate practices

When drafting an email, return a JSON object with exactly these keys:
{
  "subject": "the email subject line",
  "body": "the full email body text"
}

Return ONLY the JSON. No markdown fences, no explanation.
"""


def _transaction_context(txn):
    """Build a context summary string from a Transaction object."""
    lines = [
        f"Property: {txn.address}",
        f"City/State: {txn.city}, {txn.state} {txn.zip_code}",
        f"Deal Type: {txn.deal_type}",
        f"Price: ${txn.price:,.0f}",
        f"Buyer: {txn.buyer_name} ({txn.buyer_email})" if txn.buyer_name else "",
        f"Seller: {txn.seller_name} ({txn.seller_email})" if txn.seller_name else "",
        f"Buyer Attorney: {txn.buyer_attorney_name}, {txn.buyer_attorney_firm}" if txn.buyer_attorney_name else "",
        f"Seller Attorney: {txn.seller_attorney_name}, {txn.seller_attorney_firm}" if txn.seller_attorney_name else "",
        f"Offer Accepted: {txn.offer_accepted_date}" if txn.offer_accepted_date else "",
        f"P&S Date: {txn.purchase_and_sale_date}" if txn.purchase_and_sale_date else "",
        f"Mortgage Contingency: {txn.mortgage_contingency_date}" if txn.mortgage_contingency_date else "",
        f"Closing Date: {txn.closing_date}" if txn.closing_date else "",
        f"Inspection: {txn.inspection_date}" if txn.inspection_date else "",
        f"Commission: {txn.commission_percentage}%",
        f"Status: {txn.status}",
    ]
    if txn.notes:
        lines.append(f"Notes: {txn.notes}")

    # Milestone status
    milestones = []
    if txn.deposit_confirmed:
        milestones.append("Deposit confirmed")
    if txn.invoice_created:
        milestones.append("Invoice created")
    if txn.smoke_scheduled:
        milestones.append("Smoke scheduled")
    if txn.six_d_completed:
        milestones.append("6D completed")
    if txn.scan_completed:
        milestones.append("Scan completed")
    if milestones:
        lines.append(f"Completed milestones: {', '.join(milestones)}")

    return "\n".join(line for line in lines if line)


def draft_email(txn, email_type, recipient=None, custom_instructions=None):
    """
    Draft a context-aware email for a transaction.

    Args:
        txn: Transaction model instance.
        email_type: One of "follow_up", "status_update", "deadline_reminder",
                    "inspection_update", "closing_update", "custom".
        recipient: Who the email is to (e.g. "buyer", "seller",
                   "buyer_attorney", "seller_attorney", or a name/email).
        custom_instructions: Free text instructions for what the email should say.

    Returns:
        dict with "subject" and "body" keys.
    """
    import json

    context = _transaction_context(txn)

    prompts_by_type = {
        "follow_up": (
            "Draft a professional follow-up email checking in on the status "
            "of the transaction. Ask if there are any outstanding items or "
            "questions. Keep it brief and friendly."
        ),
        "status_update": (
            "Draft a status update email summarizing where this transaction "
            "stands. Include completed milestones, upcoming deadlines, and "
            "any items that need attention."
        ),
        "deadline_reminder": (
            "Draft a friendly but firm reminder about an upcoming deadline. "
            "Be specific about the date and what action is needed."
        ),
        "inspection_update": (
            "Draft an email about the home inspection — either scheduling it, "
            "sharing results, or following up on next steps."
        ),
        "closing_update": (
            "Draft an email with a closing date update or pre-closing "
            "checklist. Cover what documents and steps are still needed."
        ),
        "custom": custom_instructions or "Draft a professional email about this transaction.",
    }

    instruction = prompts_by_type.get(email_type, prompts_by_type["custom"])

    # Determine recipient name for greeting
    recipient_info = ""
    if recipient == "buyer":
        name = txn.buyer_name.split(" ")[0] if txn.buyer_name else "there"
        recipient_info = f"To: {txn.buyer_name} ({txn.buyer_email})"
    elif recipient == "seller":
        name = txn.seller_name.split(" ")[0] if txn.seller_name else "there"
        recipient_info = f"To: {txn.seller_name} ({txn.seller_email})"
    elif recipient == "buyer_attorney":
        name = txn.buyer_attorney_name.split(",")[0] if txn.buyer_attorney_name else "Counselor"
        recipient_info = f"To: {txn.buyer_attorney_name} ({txn.buyer_attorney_email})"
    elif recipient == "seller_attorney":
        name = txn.seller_attorney_name.split(",")[0] if txn.seller_attorney_name else "Counselor"
        recipient_info = f"To: {txn.seller_attorney_name} ({txn.seller_attorney_email})"
    else:
        recipient_info = f"To: {recipient or 'the appropriate party'}"

    user_message = f"""Transaction context:
{context}

Recipient: {recipient_info}

Task: {instruction}

Sign off as "Cam"."""

    try:
        response = ask_claude(EMAIL_SYSTEM_PROMPT, user_message)
        clean = response.strip()
        if clean.startswith("```"):
            clean = clean.split("\n", 1)[1]
            clean = clean.rsplit("```", 1)[0]
        return json.loads(clean)
    except json.JSONDecodeError:
        # Fallback: return the raw text as body
        return {"subject": f"Re: {txn.address}", "body": response}
    except Exception as e:
        return {"subject": "Error", "body": str(e)}
