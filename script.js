// alice erasen.exe — tiny retro interactions
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Placeholder links never pretend to be real profiles. Add your URLs in index.html.
document.querySelectorAll('.placeholder-link').forEach(link => {
  link.addEventListener('click', event => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
      showToast(`Add your real ${link.dataset.platform || 'profile'} URL in index.html ✿`);
    }
  });
});

// Highlight the current section in the retro navigation.
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  sections.forEach(section => observer.observe(section));
}

// Pixel mode toggles sharper, more square UI.
const pixelToggle = document.getElementById('pixelToggle');
pixelToggle.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('pixel-mode');
  pixelToggle.setAttribute('aria-pressed', String(enabled));
  pixelToggle.querySelector('b').textContent = enabled ? 'ON+' : 'ON';
  showToast(enabled ? 'PIXEL MODE: EXTRA CRUNCHY' : 'PIXEL MODE: SOFT EDGES');
});

// Decorative fake visitor counter: explicitly labelled imaginary in the UI.
const counter = document.getElementById('visitor-count');
counter.textContent = String(184 + Math.floor(Math.random() * 37)).padStart(6, '0');

// Tiny click feedback for old-school window controls.
document.querySelectorAll('.window-buttons button').forEach(button => {
  button.addEventListener('click', () => showToast('this window is part of the page ✧'));
});
