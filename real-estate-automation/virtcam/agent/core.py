"""
Core agent — manages the Anthropic client and orchestrates tasks.
"""

import os
import anthropic


def get_client():
    """Return a configured Anthropic client."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError(
            "ANTHROPIC_API_KEY environment variable is not set. "
            "Get your key at https://console.anthropic.com/settings/keys"
        )
    return anthropic.Anthropic(api_key=api_key)


def ask_claude(system_prompt, user_message, model="claude-sonnet-4-5-20250929"):
    """Send a message to Claude and return the text response."""
    client = get_client()
    response = client.messages.create(
        model=model,
        max_tokens=4096,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )
    return response.content[0].text
