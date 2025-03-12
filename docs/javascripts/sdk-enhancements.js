// SDK Reference page enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Only run on SDK reference pages
  if (!window.location.pathname.includes('/sdk/')) {
    return;
  }

  // Add a class to the main content
  const contentContainer = document.querySelector('.md-content__inner');
  if (contentContainer) {
    contentContainer.classList.add('sdk-container');
  }

  // Wrap all h2 headings and their subsequent elements in a section
  wrapSections();
  
  // Enhance code blocks with language labels and copy buttons
  enhanceCodeBlocks();
  
  // Add SDK navigation bar
  addSDKNavBar();
  
  // Highlight current SDK in the sidebar
  highlightCurrentSDKInSidebar();
});

/**
 * Wrap each h2 heading and its content in a section until the next h2
 */
function wrapSections() {
  const container = document.querySelector('.sdk-container');
  if (!container) return;
  
  const headings = container.querySelectorAll('h2');
  headings.forEach((heading, index) => {
    // Create a section element
    const section = document.createElement('div');
    section.className = 'sdk-section';
    section.id = `sdk-section-${index}`;
    
    // Insert the section before the heading
    heading.parentNode.insertBefore(section, heading);
    
    // Move the heading into the section
    section.appendChild(heading);
    
    // Move all subsequent elements until the next h2 into this section
    let nextElement = section.nextSibling;
    while (nextElement && nextElement.tagName !== 'H2') {
      const elementToMove = nextElement;
      nextElement = nextElement.nextSibling;
      section.appendChild(elementToMove);
    }
  });
}

/**
 * Enhance code blocks with language labels and copy buttons
 */
function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.sdk-container pre code');
  
  codeBlocks.forEach((codeBlock, index) => {
    // Get the language class
    const classes = Array.from(codeBlock.classList);
    const languageClass = classes.find(cls => cls.startsWith('language-'));
    const language = languageClass ? languageClass.replace('language-', '') : 'text';
    
    // Wrap the pre element with our wrapper
    const pre = codeBlock.parentNode;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-label-wrapper';
    wrapper.id = `code-block-${index}`;
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    
    // Add language label
    const label = document.createElement('div');
    label.className = 'code-label';
    label.textContent = getLanguageName(language);
    wrapper.appendChild(label);
    
    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'sdk-copy-btn';
    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy`;
    copyBtn.setAttribute('data-code-id', `code-block-${index}`);
    wrapper.appendChild(copyBtn);
    
    // Add click event to copy button
    copyBtn.addEventListener('click', function() {
      const code = this.parentNode.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        // Success feedback
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Copied!`;
        this.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
        this.style.color = '#2ecc71';
        
        // Reset after 2 seconds
        setTimeout(() => {
          this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy`;
          this.style.backgroundColor = '';
          this.style.color = '';
        }, 2000);
      }).catch((error) => {
        // Error feedback
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>Error`;
        this.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
        this.style.color = '#e74c3c';
        
        // Reset after 2 seconds
        setTimeout(() => {
          this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy`;
          this.style.backgroundColor = '';
          this.style.color = '';
        }, 2000);
      });
    });
  });
}

/**
 * Add SDK navigation bar at the top of the content
 */
function addSDKNavBar() {
  const container = document.querySelector('.sdk-container');
  if (!container) return;
  
  // Get current SDK
  const currentSDK = getCurrentSDK();
  
  // Create the navbar
  const navbar = document.createElement('div');
  navbar.className = 'sdk-navbar';
  
  // Add SDK links
  const sdks = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'go', name: 'Go' },
    { id: 'java', name: 'Java' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'php', name: 'PHP' },
    { id: 'dotnet', name: '.NET' }
  ];
  
  sdks.forEach(sdk => {
    const link = document.createElement('a');
    link.className = 'sdk-nav-link';
    link.href = `/sdk/${sdk.id}/`;
    link.textContent = sdk.name;
    
    if (sdk.id === currentSDK) {
      link.classList.add('active');
    }
    
    navbar.appendChild(link);
  });
  
  // Insert at the top of the container, before any content
  container.insertBefore(navbar, container.firstChild);
}

/**
 * Highlight the current SDK in the sidebar
 */
function highlightCurrentSDKInSidebar() {
  const currentSDK = getCurrentSDK();
  if (!currentSDK) return;
  
  // Find the SDK link in the sidebar that contains the current SDK
  const sidebarLinks = document.querySelectorAll('.md-nav__link');
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(`/sdk/${currentSDK}/`)) {
      link.classList.add('sdk-active-link');
    }
  });
}

/**
 * Get the current SDK from the URL path
 * @returns {string} Current SDK name or null
 */
function getCurrentSDK() {
  const path = window.location.pathname;
  const match = path.match(/\/sdk\/([^\/]+)/);
  return match ? match[1] : null;
}

/**
 * Get the proper language name for code blocks
 * @param {string} shortName The short name of the language
 * @returns {string} The proper display name
 */
function getLanguageName(shortName) {
  const languageMap = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'ts': 'TypeScript',
    'typescript': 'TypeScript',
    'py': 'Python',
    'python': 'Python',
    'go': 'Go',
    'java': 'Java',
    'rb': 'Ruby',
    'ruby': 'Ruby',
    'php': 'PHP',
    'csharp': 'C#',
    'cs': 'C#',
    'json': 'JSON',
    'yaml': 'YAML',
    'bash': 'Shell',
    'sh': 'Shell',
    'zsh': 'Shell',
    'text': 'Plain Text',
    'html': 'HTML',
    'css': 'CSS'
  };
  
  return languageMap[shortName.toLowerCase()] || shortName;
} 