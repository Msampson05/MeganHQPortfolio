// Scroll-triggered animations using Intersection Observer
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

// Elements to observe
const heroText = document.getElementById('heroText');
const photoContainer = document.getElementById('photoContainer');
const textContent = document.getElementById('textContent');

observer.observe(heroText);
observer.observe(photoContainer);
observer.observe(textContent);

// Initial animation on load
window.addEventListener('load', () => {
  setTimeout(() => {
    heroText.classList.add('animate');
  }, 500);
});
