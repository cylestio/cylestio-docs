// Monitoring page enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Only run on the monitoring page
  const monitoringPage = document.querySelector('.md-content__inner h1');
  if (!monitoringPage || monitoringPage.textContent.trim() !== 'Monitoring') {
    return;
  }
  
  // Add monitoring-title class to the main heading
  monitoringPage.classList.add('monitoring-title');
  
  // Add monitoring-section class to all sections
  document.querySelectorAll('.md-content__inner > h2, .md-content__inner > h3').forEach(heading => {
    const section = document.createElement('section');
    section.classList.add('monitoring-section');
    
    // Get all elements until the next heading of the same or higher level
    let nextElement = heading.nextElementSibling;
    const elements = [];
    
    while (nextElement && 
           !(nextElement.tagName === 'H2' || 
             (nextElement.tagName === 'H3' && heading.tagName === 'H3'))) {
      elements.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }
    
    // Move the heading and all related elements into the section
    heading.parentNode.insertBefore(section, heading);
    section.appendChild(heading);
    
    elements.forEach(el => {
      section.appendChild(el);
    });
  });
  
  // Add bash class to bash code blocks
  document.querySelectorAll('pre > code.language-bash').forEach(code => {
    const pre = code.parentElement;
    const wrapper = pre.parentElement;
    if (wrapper.classList.contains('monitoring-code')) {
      wrapper.classList.add('bash');
    }
  });
  
  // Add monitoring-code class to all code blocks
  document.querySelectorAll('.md-typeset pre').forEach(pre => {
    if (!pre.parentElement.classList.contains('monitoring-code')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'monitoring-code';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      
      // Add bash class if it's a bash code block
      if (pre.querySelector('code.language-bash')) {
        wrapper.classList.add('bash');
      }
    }
  });
  
  // Add best-practices class to the Best Practices section
  const bestPracticesHeading = Array.from(document.querySelectorAll('.md-content__inner h2')).find(
    h => h.textContent.trim() === 'Best Practices'
  );
  
  if (bestPracticesHeading) {
    const bestPracticesSection = bestPracticesHeading.closest('.monitoring-section');
    if (bestPracticesSection) {
      bestPracticesSection.classList.add('best-practices');
    }
  }
  
  // Add troubleshooting class to the Troubleshooting section
  const troubleshootingHeading = Array.from(document.querySelectorAll('.md-content__inner h2')).find(
    h => h.textContent.trim() === 'Troubleshooting'
  );
  
  if (troubleshootingHeading) {
    const troubleshootingSection = troubleshootingHeading.closest('.monitoring-section');
    if (troubleshootingSection) {
      troubleshootingSection.classList.add('troubleshooting');
    }
  }
  
  // Add copy button functionality to code blocks
  document.querySelectorAll('.monitoring-code pre').forEach(pre => {
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
  
  // Framework tabs functionality
  setupFrameworkTabs();
  
  // Add copy button functionality for code blocks
  setupCodeCopyButtons();
  
  // Add animations for metric cards
  setupMetricCardAnimations();
  
  // Set up table of contents highlighting
  setupTOCHighlighting();
});

// Framework tabs functionality
function setupFrameworkTabs() {
  const tabs = document.querySelectorAll('.framework-tab');
  if (tabs.length === 0) return;
  
  // Add tab selection class to the first tab by default
  tabs[0].classList.add('active-tab');
}

// Add copy button functionality for code blocks
function setupCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(function(codeBlock) {
    const container = codeBlock.parentNode;
    
    // Only add the button if it doesn't already exist
    if (!container.querySelector('.copy-button')) {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      
      button.addEventListener('click', function() {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(function() {
          // Change button text temporarily
          button.textContent = 'Copied!';
          setTimeout(function() {
            button.textContent = 'Copy';
          }, 2000);
        }).catch(function(err) {
          console.error('Could not copy text: ', err);
          button.textContent = 'Error';
          setTimeout(function() {
            button.textContent = 'Copy';
          }, 2000);
        });
      });
      
      container.appendChild(button);
    }
  });
}

// Add animations for metric cards
function setupMetricCardAnimations() {
  const cards = document.querySelectorAll('.metric-card, .practice-card');
  
  cards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// Set up table of contents highlighting
function setupTOCHighlighting() {
  const tocLinks = document.querySelectorAll('.md-nav--secondary .md-nav__link');
  const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
  
  if (tocLinks.length === 0 || headings.length === 0) return;

  // Intersection Observer to detect when headings are in view
  const observerOptions = {
    rootMargin: '-100px 0px -66%',
    threshold: 0
  };
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        
        // Remove active class from all links
        tocLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to the current link
        const activeLink = document.querySelector(`.md-nav--secondary .md-nav__link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Observe all headings
  headings.forEach(heading => {
    observer.observe(heading);
  });
} 