/**
 * Cylestio Documentation - Main JavaScript
 * This file consolidates the most important JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize any interactive elements
  enhanceCodeBlocks();
  setupScrollEffects();
  setupMobileNavigation();
  initializeFeatureCards();
});

/**
 * Enhance code blocks with copy button and syntax highlighting
 */
function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  if (codeBlocks.length) {
    codeBlocks.forEach(block => {
      // Add language label if not already present
      const parent = block.parentNode;
      const language = block.className.match(/language-(\w+)/);
      
      if (language && !parent.querySelector('.code-label')) {
        const label = document.createElement('div');
        label.className = 'code-label';
        label.textContent = language[1];
        parent.insertBefore(label, block);
      }
    });
  }
}

/**
 * Setup scroll effects for navigation and headers
 */
function setupScrollEffects() {
  let lastScrollTop = 0;
  const header = document.querySelector('.md-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add shadow to header on scroll
      if (scrollTop > 10) {
        header.classList.add('md-header--shadow');
      } else {
        header.classList.remove('md-header--shadow');
      }
      
      // Auto-hide header when scrolling down (on mobile)
      if (window.innerWidth < 960) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          header.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL but don't scroll again
          history.pushState(null, null, href);
        }
      }
    });
  });
}

/**
 * Setup mobile navigation enhancements
 */
function setupMobileNavigation() {
  const toggleButton = document.querySelector('.md-header__button.md-icon');
  const drawer = document.querySelector('.md-sidebar--primary');
  
  if (toggleButton && drawer) {
    // Add active class to current page in mobile nav
    const currentPath = window.location.pathname;
    const navLinks = drawer.querySelectorAll('.md-nav__link');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath && currentPath.endsWith(linkPath)) {
        link.classList.add('md-nav__link--active');
        
        // Expand parent sections
        let parent = link.closest('.md-nav__item--nested');
        while (parent) {
          const input = parent.querySelector('input');
          if (input) {
            input.checked = true;
          }
          parent = parent.parentNode.closest('.md-nav__item--nested');
        }
      }
    });
  }
}

/**
 * Initialize feature cards with hover effects
 */
function initializeFeatureCards() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (featureCards.length) {
    featureCards.forEach((card, index) => {
      // Add a slight delay to each card for a staggered animation
      card.style.animationDelay = `${index * 0.1}s`;
      
      // Add click handler if the card has a link
      const link = card.querySelector('a');
      if (link) {
        card.addEventListener('click', function() {
          link.click();
        });
        card.style.cursor = 'pointer';
      }
    });
  }
}

/**
 * Initialize dark mode toggle with animation
 */
document.addEventListener('DOMContentLoaded', function() {
  const toggles = document.querySelectorAll('.md-header__button[for="__palette"]');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      document.body.classList.add('color-theme-in-transition');
      setTimeout(() => {
        document.body.classList.remove('color-theme-in-transition');
      }, 300);
    });
  });
}); 