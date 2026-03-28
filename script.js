/* ============================================
   MMMIC — script.js
   Madan Mohan Malviya Inter College
============================================ */

/* ---------- CUSTOM CURSOR ---------- */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move dot cursor instantly
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

// Animate ring cursor with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .course-card, .event-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.opacity = '1';
    cursorRing.style.transform += ' scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.opacity = '0.5';
  });
});

/* ---------- SCROLL PROGRESS BAR ---------- */
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrolled  = document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${scrolled / maxScroll})`;
});

/* ---------- NAVBAR — add glass on scroll ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- SCROLL REVEAL (reveal + cards) ---------- */
const revealElements = document.querySelectorAll('.reveal, .course-card, .event-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => revealObserver.observe(el));

/* ---------- COUNT-UP ANIMATION ---------- */
function countUp(el, target, duration = 1800) {
  let current = 0;
  const step  = target / (duration / 16);

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    // Show "+" suffix only for large numbers (e.g. 500)
    el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

// Trigger count-up when hero stats enter viewport
const statsSection = document.querySelector('.hero-stats');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-count]').forEach((el) => {
          countUp(el, parseInt(el.dataset.count));
        });
        statsObserver.disconnect(); // run only once
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

/* ---------- CONTACT FORM SUBMISSION ---------- */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Loading state
    submitBtn.textContent       = 'Sending...';
    submitBtn.style.background  = 'rgba(200, 151, 42, 0.6)';
    submitBtn.style.pointerEvents = 'none';

    // Simulate sending (replace with real fetch/API call)
    setTimeout(() => {
      submitBtn.textContent     = '✓ Message Sent!';
      submitBtn.style.background = '#2a7c4e';

      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.textContent       = 'Send Message';
        submitBtn.style.background  = '';
        submitBtn.style.pointerEvents = '';
        contactForm.reset();
      }, 3000);
    }, 1200);
  });
}
