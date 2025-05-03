// Immediately initialize theme when script loads
(function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  document.getElementById('theme-toggle').innerHTML = 
    `<i class="fas fa-${savedTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
})();

// Theme toggle handler for all pages
$(function() {
  $('#theme-toggle').on('click', function() {
    const isDarkMode = $('body').toggleClass('dark-mode').hasClass('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    $(this).html(`<i class="fas fa-${isDarkMode ? 'sun' : 'moon'}"></i>`);
  });

  // Mobile menu toggle (existing code)
  $('#menu-toggle').on('click touchstart', function(e) {
    e.preventDefault();
    $('#top-nav').toggleClass('active');
  });

  // Close menu when clicking outside (existing code)
  $(document).on('click touchstart', function(e) {
    if (!$(e.target).closest('#header').length) {
      $('#top-nav').removeClass('active');
    }
  });

  // Header height offset (existing code)
  $('body').css('padding-top', $('#header').outerHeight() + 'px');
});

// Sync theme across browser tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    const isDarkMode = event.newValue === 'dark';
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('theme-toggle').innerHTML = 
      `<i class="fas fa-${isDarkMode ? 'sun' : 'moon'}"></i>`;
  }
});

// Publication filtering (existing code)
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-buttons .button");
  const publicationYears = document.querySelectorAll(".publication-year");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      publicationYears.forEach(section => {
        section.style.display = (filter === "all" || 
          section.getAttribute("data-year") === filter) ? "block" : "none";
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    // tell Formspree we want JSON back
    const opts = {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' },
    };

    try {
      const res = await fetch(form.action, opts);
      if (res.ok) {
        status.textContent = '🎉 Message sent successfully!';
        status.className = 'form-status success';
        form.reset();
      } else {
        const err = await res.json();
        status.textContent = err.error || '⚠️ Something went wrong.';
        status.className = 'form-status error';
      }
    } catch (err) {
      status.textContent = '⚠️ Network error. Please try again.';
      status.className = 'form-status error';
    }
  });
});
