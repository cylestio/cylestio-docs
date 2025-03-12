// Enhanced navigation JavaScript for Cylestio Docs
document.addEventListener('DOMContentLoaded', function() {
  // Function to initialize the navigation
  function initNavigation() {
    // Target Material checkboxes for navigation toggles
    const toggles = document.querySelectorAll('.md-nav__toggle');
    
    // Expand sections containing the active page
    const activeLink = document.querySelector('.md-nav__link--active');
    if (activeLink) {
      // Find all parent navigation sections
      let parent = activeLink.closest('.md-nav__item--nested');
      while (parent) {
        // Find the toggle checkbox and check it
        const toggle = parent.querySelector('.md-nav__toggle');
        if (toggle) {
          toggle.checked = true;
        }
        // Move up to the next parent
        parent = parent.parentElement.closest('.md-nav__item--nested');
      }
    }
    
    // Ensure primary navigation is visible
    const primaryNav = document.querySelector('.md-nav--primary');
    if (primaryNav) {
      primaryNav.style.visibility = 'visible';
      primaryNav.style.display = 'block';
    }
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#' && document.querySelector(targetId)) {
          e.preventDefault();
          document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add copy button functionality to code blocks
    document.querySelectorAll('.md-typeset pre').forEach(pre => {
      // Only add if it doesn't already have a copy button
      if (!pre.querySelector('.md-clipboard')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'md-clipboard';
        copyButton.title = 'Copy to clipboard';
        copyButton.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>';
        
        copyButton.addEventListener('click', () => {
          const code = pre.querySelector('code').textContent;
          navigator.clipboard.writeText(code).then(() => {
            copyButton.classList.add('md-clipboard--copied');
            setTimeout(() => copyButton.classList.remove('md-clipboard--copied'), 2000);
          });
        });
        
        pre.appendChild(copyButton);
      }
    });
    
    // Add class to monitoring page for specific styling
    const monitoringPage = document.querySelector('.md-content__inner h1');
    if (monitoringPage && monitoringPage.textContent.trim() === 'Monitoring') {
      document.querySelectorAll('.md-content__inner > section').forEach(section => {
        section.classList.add('monitoring-section');
      });
      
      document.querySelectorAll('.md-typeset pre').forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'monitoring-code';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      });
    }
  }
  
  // Initialize immediately
  initNavigation();
  
  // Also initialize after a small delay to ensure everything is loaded
  setTimeout(initNavigation, 300);
  
  // And initialize when window resizes
  window.addEventListener('resize', function() {
    setTimeout(initNavigation, 100);
  });
  
  // Add back-to-top button functionality
  const backToTopButton = document.querySelector('.md-top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}); 