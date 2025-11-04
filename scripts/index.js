// Ensure page starts at top on reload, without breaking anchor links
(() => {
  const nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
  const isReload = nav ? nav.type === 'reload' : (performance.navigation && performance.navigation.type === 1);
  if (isReload) {
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
    window.addEventListener('DOMContentLoaded', () => {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 0);
      setTimeout(() => window.scrollTo(0, 0), 120);
    }, { once: true });
  }
})();

// Scroll-triggered animations using a single Intersection Observer
(() => {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  const observeIfPresent = (el) => {
    if (el) observer.observe(el);
  };

  // Elements to observe
  const heroText = document.getElementById('heroText');
  const photoContainer = document.getElementById('photoContainer');
  const textContent = document.getElementById('textContent');
  const pillarsSection = document.getElementById('pillarsSection');
  const contactSection = document.getElementById('contactSection');

  observeIfPresent(heroText);
  observeIfPresent(photoContainer);
  observeIfPresent(textContent);
  observeIfPresent(pillarsSection);
  observeIfPresent(contactSection);

  // Observe lists
  document.querySelectorAll('.portfolio-item, .service-item, .slide-in-left, .slide-in-right, .slide-in-up')
    .forEach(item => observer.observe(item));

  // Initial animation on load + force for items already in view
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (heroText) heroText.classList.add('animate');

      document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, #pillarsSection, #contactSection')
        .forEach(item => {
          const rect = item.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            item.classList.add('animate');
          }
        });
    }, 500);
  });
})();

