# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import json
import os
from datetime import datetime
from typing import List, Dict, Any
from uuid import uuid4

HISTORY_FILE = "history.json"

def load_history() -> List[Dict[str, Any]]:
    """Load the research history from the file."""
    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r") as f:
        try:
            history = json.load(f)
            return history if isinstance(history, list) else []
        except json.JSONDecodeError:
            return []

def save_history(history: List[Dict[str, Any]]) -> None:
    """Save the research history to the file."""
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)

def add_research_topic(topic: str, summary: str = "", content: Dict[str, Any] = None) -> str:
    """Add a new research topic to the history.

    Args:
        topic: The research topic
        summary: A brief summary of the research
        content: Optional additional content (e.g., full report)

    Returns:
        The unique ID of the added research topic
    """
    history = load_history()
    research_id = str(uuid4())

    entry = {
        "id": research_id,
        "timestamp": datetime.utcnow().isoformat(),
        "topic": topic,
        "summary": summary,
        "content": content or {}
    }

    history.append(entry)
    save_history(history)
    return research_id

def get_research_topic(research_id: str) -> Dict[str, Any]:
    """Get a research topic by its ID.

    Args:
        research_id: The unique ID of the research topic

    Returns:
        The research topic data if found, None otherwise
    """
    history = load_history()
    for entry in history:
        if entry.get("id") == research_id:
            return entry
    return None

def get_all_research_topics() -> List[Dict[str, Any]]:
    """Get all research topics.

    Returns:
        A list of all research topics
    """
    return load_history()