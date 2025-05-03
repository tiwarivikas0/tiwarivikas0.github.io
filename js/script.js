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

