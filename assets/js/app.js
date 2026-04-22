/**
 * Common UI logic and Global Search
 */

document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupMobileMenu();
});

function setupSearch() {
  const searchForms = document.querySelectorAll('.search-form');
  
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const query = input.value.trim();
      
      if (query) {
        window.location.href = `/search/index.html?q=${encodeURIComponent(query)}`;
      }
    });
  });
}

function setupMobileMenu() {
  // Mobile menu logic can be added here if a hamburger menu is implemented
  console.log('UI logic initialized');
}

/**
 * Utility: Scroll to top
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
