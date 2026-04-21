// Polyfill for Intersection Observer
if (!('IntersectionObserver' in window)) {
    import('intersection-observer').then(setupLazyLoading);
  } else {
    setupLazyLoading();
  }
  
  function setupLazyLoading() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
              // In your setupLazyLoading function:
          // const section = entry.target;
          // section.classList.add('loading');

          // Array of script URLs to load
          const scripts = [
            'js/kiosksLocations02022026_woSTCandVirgin.js',
            'js/item03022026.js'
          ];
          // showLoadingIndicator(section);
  
          loadScripts(scripts)
            .then(() => {
              // section.classList.remove('loading');
              // section.classList.add('loaded');
              if (typeof initializeSection === 'function') {
                initializeSection();
              }
            })
            .catch(error => {
              console.error('Failed to load scripts:', error);
              // section.classList.remove('loading');
              // section.classList.add('error');
              hideLoadingIndicator(section);
            });
  
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
  
    const sectionElement = document.querySelector('#new_landing_kiosk');
    if (sectionElement) {
      observer.observe(sectionElement);
    }
  }
  

  function loadScripts(urls) {
    return urls.reduce((promise, url) => {
      return promise.then(() => loadScript(url));
    }, Promise.resolve());
  }
  
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  // This function should be defined in one of your loaded scripts
//   function initializeSection() {
//     console.log('All scripts loaded, initializing section...');
//     // Your initialization code here
//   }
  function showLoadingIndicator(section) {
    // const indicator = document.createElement('div');
    // indicator.className = 'loading-indicator';
    // indicator.textContent = 'Loading...';
    // section.appendChild(indicator);
  }
  
  function hideLoadingIndicator(section) {
    // const indicator = section.querySelector('.loading-indicator');
    // if (indicator) {
      // indicator.remove();
    // }
  }
  
