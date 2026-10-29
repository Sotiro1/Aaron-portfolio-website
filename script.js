// Hide the navbar when scrolling down, show it when scrolling up
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  navbar.classList.toggle('hidden', currentScrollY > lastScrollY && currentScrollY > 100);
  lastScrollY = currentScrollY;
}, { passive: true });

// Twinkling starfield background
const starfield = document.getElementById('starfield');

if (starfield) {
  function createStars() {
    const starCount = window.innerWidth < 768 ? 90 : 180;
    starfield.innerHTML = '';

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 2.2 + 0.8;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 4 + 3}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.setProperty('--min-opacity', Math.random() * 0.15 + 0.05);
      star.style.setProperty('--max-opacity', Math.random() * 0.6 + 0.35);

      if (Math.random() > 0.92) {
        star.style.boxShadow = '0 0 8px rgba(255,255,255,0.95)';
      }

      starfield.appendChild(star);
    }
  }

  createStars();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createStars, 200);
  });
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.textContent = '↑';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Highlight the nav link for the section in view (home page only)
const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sectionLinks.length) {
  const linkFor = new Map();
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) linkFor.set(section, link);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => link.classList.remove('active-link'));
        linkFor.get(entry.target).classList.add('active-link');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  linkFor.forEach((_, section) => sectionObserver.observe(section));
}

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Contact form (Formspree)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      window.location.href = 'thankyou.html';
    } catch (error) {
      status.textContent = 'Something went wrong. Please try again, or email me directly.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}
