(() => {
  const getTheme = () => {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  };
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const dark = theme === 'dark';
      toggle.textContent = dark ? '☀' : '☾';
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    }
  };
  applyTheme(getTheme());
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme' || event.key === null) applyTheme(getTheme());
  });

  const loadSelectedPublications = async () => {
    const container = document.getElementById('selected-publications');
    if (!container) return;

    try {
      const response = await fetch('publications.html', {
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error('Could not load publications.html');
      }

      const html = await response.text();
      const source = new DOMParser().parseFromString(html, 'text/html');

      const papers = [...source.querySelectorAll('.publication-item')];

      console.log('Total publications found:', papers.length);

      const selected = papers
        .map((paper, position) => {
          const authors =
            (
              paper.querySelector('.authors') || paper.querySelector('p strong')
            )?.textContent.trim() || '';

          // First name before comma
          const firstAuthor = authors.split(',')[0].replace(/\*/g, '').trim();

          // Find year such as 2022, 2024, 2026
          const yearMatch = paper.textContent.match(/\b(20\d{2})\b/);

          const year = yearMatch ? Number(yearMatch[1]) : 0;

          console.log({
            firstAuthor,
            year,
            authors,
          });

          return {
            paper,
            position,
            firstAuthor,
            year,
          };
        })

        // Your first-author publications
        .filter(
          ({ firstAuthor }) =>
            /^V\s*Tiwari$/i.test(firstAuthor) ||
            /^V\.?\s*Tiwari$/i.test(firstAuthor) ||
            /^Vikas\s+Tiwari$/i.test(firstAuthor),
        )

        // newest first
        .sort((a, b) => b.year - a.year || a.position - b.position)

        // only latest 3
        .slice(0, 3)

        .map(({ paper }) => {
          const copy = paper.cloneNode(true);

          copy.removeAttribute('id');

          copy.querySelectorAll('[id]').forEach((el) => {
            el.removeAttribute('id');
          });

          return copy;
        });

      console.log('First-author publications found:', selected.length);

      if (selected.length) {
        container.replaceChildren(...selected);
      } else {
        container.innerHTML = '<p><a href="publications.html">View publications →</a></p>';
      }
    } catch (error) {
      console.error('Publication loading error:', error);

      container.innerHTML = '<p><a href="publications.html">View publications →</a></p>';
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadSelectedPublications();
    applyTheme(getTheme());
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* Theme still works without storage. */
      }
    });
    const buttons = document.querySelectorAll('[data-filter]');
    const years = document.querySelectorAll('.publication-year');
    const filter = (value) => {
      buttons.forEach((button) => {
        const active = button.dataset.filter === value;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      years.forEach((year) => {
        year.hidden = value !== 'all' && year.dataset.year !== value;
      });
    };
    buttons.forEach((button) =>
      button.addEventListener('click', () => filter(button.dataset.filter)),
    );
    window.addEventListener('hashchange', () => {
      if (document.querySelector('.publication-item:target')) {
        filter('all');
        document.querySelector('.publication-item:target').scrollIntoView();
      }
    });
  });
})();
