document.addEventListener('DOMContentLoaded', function() {
  // Only run on homepage
  if (!document.querySelector('.landing-hero')) return;
  
  // Set up animations for SDK buttons
  setupSDKButtonAnimations();
  
  // Set up animations for features section
  setupFeaturesAnimations();
  
  // Set up smooth scrolling for anchor links
  setupSmoothScrolling();
  
  // Add fade-in animation for hero section
  animateHeroSection();
});

function setupSDKButtonAnimations() {
  const sdkButtons = document.querySelectorAll('.sdk-button');
  
  sdkButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      // Add subtle animation or effect when hovering
      this.style.transition = 'transform 0.2s, box-shadow 0.2s';
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
      // Reset to original state
      this.style.transform = '';
      this.style.boxShadow = '';
    });
    
    // Add click feedback
    button.addEventListener('click', function() {
      this.classList.add('sdk-button-clicked');
      setTimeout(() => {
        this.classList.remove('sdk-button-clicked');
      }, 300);
    });
  });
}

function setupFeaturesAnimations() {
  // Use Intersection Observer to animate features as they come into view
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (featureCards.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('feature-animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });
  
  featureCards.forEach(card => {
    card.classList.add('feature-to-animate');
    observer.observe(card);
  });
}

function setupSmoothScrolling() {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

function animateHeroSection() {
  const heroSection = document.querySelector('.landing-hero');
  
  if (!heroSection) return;
  
  // Add animation class
  setTimeout(() => {
    heroSection.classList.add('hero-animated');
  }, 100);
  
  // Animate the main elements with a small delay between each
  const elements = heroSection.querySelectorAll('h1, .landing-subtitle, .landing-hero-cta');
  
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('element-animated');
    }, 300 + (index * 200));
  });
} 