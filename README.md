# Vikas Tiwari — personal website

Static HTML/CSS/JavaScript site for GitHub Pages. No build step is needed.

## Preview

Run `python -m http.server 8000` in this directory, then open http://localhost:8000.

## Content

- `index.html`: About, research highlights, selected publications, and contact details.
- `research.html`: research overview and expandable related-publication lists.
- `publications.html`: complete publication list, Scholar link, and year filters.
- `presentations.html`: conferences, posters, and workshops.
- `cv.html`: original CV content with PDF view/download links.
- `news.html`: dated milestones, publications, software contributions, and presentations.
- `software.html`: packages, contribution links, research repositories, and forks.

Shared styling is in `css/style.css`; theme and publication filtering are in
`js/script.js`. Navigation and footer markup are static: update all seven HTML pages
when changing shared links. The layout, fonts, palette, header, and footer follow
the local `sahilg06.github.io` reference, with a circular portrait and VT favicon.

The Contact page has been removed; current contact details are on About and social
links remain in the navigation.

Related publications use native HTML disclosures, so they also work without
JavaScript. When updating papers, update their related lists on Research as needed.
The About page automatically loads its three newest first-author papers from
`publications.html`. Add papers to the appropriate `.publication-year` section and
keep papers within each year ordered newest first. Put the author list in the
first `<strong>` inside the paper's `<p>`; `V Tiwari`, `V. Tiwari`, `Vikas Tiwari`,
and `Tiwari, V` are recognized when listed first. No separate About-page edit is
needed. If loading fails or JavaScript is disabled, a link to Publications remains
available. Preview through the local server above rather than opening `index.html`
directly as a file.

News entries use month/year dates in reverse chronological order. Publication
dates refer to first online publication; sources are recorded in
`data/news-sources.json`. Update that record alongside `news.html`.

## Formatting

HTML, CSS, JavaScript, and JSON use two-space indentation, with a target line
width of 100 characters. Long text values in JSON remain intact. Editor defaults
are in `.editorconfig`, and Prettier settings are in `.prettierrc.json`.

With Node.js installed, apply the same formatting after editing:

```sh
npx prettier@3.5.3 --write "*.html" "css/*.css" "js/*.js" "data/*.json" .prettierrc.json
npx prettier@3.5.3 --write images/favicon.svg --parser html
```

## CV PDF

`docs/Vikas-Tiwari-CV.pdf` is generated from `cv.html` with the print stylesheet.
After editing the CV, regenerate it:

```sh
python -m pip install playwright
python -m playwright install chromium
python scripts/generate_cv.py
```

## Publishing CSS and JavaScript changes

After formatting changes to `css/style.css` or `js/script.js`, run:

```sh
python scripts/update_asset_versions.py
```

Commit and push the updated HTML pages along with the assets. This adds a version
derived from each asset's contents to its URL on every page, preventing browsers
from mixing a new page with a cached stylesheet or script from an older deployment.
No build step or extra Python packages are required. If a browser already has an
older page open, reload it after the GitHub Pages deployment finishes.

## Repository listings

The Software page contains a static snapshot of public GitHub repositories checked
on 22 September 2026, so it works without API access or JavaScript. Source metadata
is recorded in `data/repositories.json`. Update the page and snapshot together when
adding projects. Package summaries come from their READMEs; contributions link to
specific upstream pull requests. Forks are identified separately without implying
upstream contributions. The page links to GitHub for current activity.
