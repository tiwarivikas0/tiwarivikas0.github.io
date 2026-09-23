"""Regenerate the downloadable PDF from the CV page. Requires Playwright Chromium."""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto((root / 'cv.html').as_uri())
    page.evaluate('document.fonts.ready')
    page.pdf(
        path=str(root / 'docs/Vikas-Tiwari-CV.pdf'),
        format='A4',
        margin=dict(top='16mm', bottom='16mm', left='16mm', right='16mm'),
        print_background=True,
    )
    browser.close()
print('Updated docs/Vikas-Tiwari-CV.pdf')
