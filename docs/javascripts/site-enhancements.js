document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for anchor links
  setupSmoothScrolling();
  
  // Add scroll-to-top button
  addScrollToTopButton();
  
  // Add fade-in animations for content sections
  addFadeInAnimations();
  
  // Add external link icons
  markExternalLinks();
  
  // Add image lightbox functionality
  setupImageLightbox();
  
  // Add keyboard navigation
  setupKeyboardNavigation();
});

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Get header height for offset
        const headerHeight = document.querySelector('.md-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Add a scroll-to-top button
 */
function addScrollToTopButton() {
  // Create the button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.setAttribute('title', 'Scroll to top');
  
  // Add to the document
  document.body.appendChild(scrollTopBtn);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Add fade-in animations for content sections
 */
function addFadeInAnimations() {
  // Only run if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;
  
  // Elements to animate
  const animateElements = document.querySelectorAll('.md-content h1, .md-content h2, .md-content h3, .md-content p, .md-content ul, .md-content ol, .md-content pre, .md-content blockquote, .md-content table');
  
  // Add animation class
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
  });
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe elements
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Mark external links with an icon
 */
function markExternalLinks() {
  const currentHost = window.location.hostname;
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip if no href, or it's an anchor, or it's a relative link
    if (!href || href.startsWith('#') || href.startsWith('/') || !href.includes('://')) {
      return;
    }
    
    try {
      const url = new URL(href);
      if (url.hostname !== currentHost) {
        // It's an external link
        link.classList.add('external-link');
        
        // Add target="_blank" and rel="noopener" for security
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }
        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener');
        }
        
        // Add icon if it doesn't already have one
        if (!link.querySelector('svg') && !link.classList.contains('md-social__link')) {
          const icon = document.createElement('span');
          icon.className = 'external-link-icon';
          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
          link.appendChild(icon);
        }
      }
    } catch (e) {
      // Invalid URL, skip
    }
  });
}

/**
 * Setup image lightbox functionality
 */
function setupImageLightbox() {
  // Get all images in the content
  const images = document.querySelectorAll('.md-content img:not(.emoji):not(.no-lightbox)');
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'cylestio-lightbox';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'cylestio-lightbox-img';
  
  const lightboxClose = document.createElement('button');
  lightboxClose.className = 'cylestio-lightbox-close';
  lightboxClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'cylestio-lightbox-caption';
  
  // Add elements to lightbox
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxClose);
  lightbox.appendChild(lightboxCaption);
  
  // Add lightbox to document
  document.body.appendChild(lightbox);
  
  // Add click event to images
  images.forEach(img => {
    // Make images clickable
    img.style.cursor = 'zoom-in';
    
    img.addEventListener('click', function() {
      // Set image source
      lightboxImg.src = this.src;
      
      // Set caption if alt text exists
      if (this.alt) {
        lightboxCaption.textContent = this.alt;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.style.display = 'none';
      }
      
      // Show lightbox
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox when clicking close button or outside the image
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Only if not in an input, textarea, or select
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }
    
    // Previous/Next page navigation
    if (e.altKey) {
      // Alt + Left Arrow: Previous page
      if (e.key === 'ArrowLeft') {
        const prevLink = document.querySelector('.md-footer__link--prev');
        if (prevLink) {
          prevLink.click();
        }
      }
      
      // Alt + Right Arrow: Next page
      if (e.key === 'ArrowRight') {
        const nextLink = document.querySelector('.md-footer__link--next');
        if (nextLink) {
          nextLink.click();
        }
      }
      
      // Alt + Home: Go to homepage
      if (e.key === 'Home') {
        window.location.href = '/';
      }
      
      // Alt + S: Focus search
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        const searchInput = document.querySelector('.md-search__input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    }
  });
} 