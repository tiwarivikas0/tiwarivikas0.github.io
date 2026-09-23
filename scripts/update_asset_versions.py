"""Refresh shared asset URLs after CSS/JS edits, before publishing to GitHub Pages."""

import hashlib
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
assets = ("css/style.css", "js/script.js")

for asset in assets:
    version = hashlib.sha256((root / asset).read_bytes()).hexdigest()[:12]
    pattern = re.compile(r'(["\'])' + re.escape(asset) + r'(?:\?[^"\']*)?\1')
    for page in root.glob("*.html"):
        original = page.read_text()
        updated = pattern.sub(lambda match: f"{match[1]}{asset}?v={version}{match[1]}", original)
        if updated != original:
            page.write_text(updated)
    print(f"{asset}?v={version}")
