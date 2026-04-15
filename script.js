const sections = document.querySelectorAll('.fade-section');
const navbar = document.querySelector('.navbar');

let lastScrollY = window.scrollY;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.05
});

sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
});
const profileTabs = document.querySelectorAll('.profile-tab');
const profilePanels = document.querySelectorAll('.profile-panel');

profileTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    profileTabs.forEach((t) => t.classList.remove('active'));
    profilePanels.forEach((panel) => panel.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});
const starfield = document.getElementById('starfield');

if (starfield) {
  const starCount = window.innerWidth < 768 ? 90 : 180;

  function createStars() {
    starfield.innerHTML = '';

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 2.2 + 0.8;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 5;
      const minOpacity = Math.random() * 0.15 + 0.05;
      const maxOpacity = Math.random() * 0.6 + 0.35;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      star.style.setProperty('--min-opacity', minOpacity);
      star.style.setProperty('--max-opacity', maxOpacity);

      if (Math.random() > 0.92) {
        star.style.boxShadow = '0 0 8px rgba(255,255,255,0.95)';
      }

      starfield.appendChild(star);
    }
  }

  createStars();

  window.addEventListener('resize', createStars);
}
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = 'thankyou.html';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  });
}