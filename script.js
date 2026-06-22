/* ===== Progress bar ===== */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('progress').style.width = progress + '%';
});

/* ===== Nav scrolled state ===== */
const siteNav = document.getElementById('siteNav');
const handleNavScroll = () => {
  if (window.scrollY > 40) {
    siteNav.classList.add('scrolled');
  } else {
    siteNav.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

/* ===== Mobile nav toggle ===== */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
});
});
}


/* ===== Carousel fade ===== */
const slides = document.querySelectorAll('.carousel img');
let slideIndex = 0;
if (slides.length > 1) {
  setInterval(() => {
    slides[slideIndex].classList.remove('is-active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('is-active');
  }, 6000);
}

/* ===== Word rotate ===== */
document.addEventListener('DOMContentLoaded', () => {
  const words = ['wedding', 'occasion', 'event', 'reception'];
  const el = document.querySelector('.word-rotate');

  if (el) {
    let wordIndex = 0;
    setInterval(() => {
      el.style.opacity = 0;
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        el.textContent = words[wordIndex];
        el.style.opacity = 1;
      }, 700);
    }, 4200);
  }
});

/* ===== FAQ accordion ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

/* ===== Scroll reveal ===== */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
