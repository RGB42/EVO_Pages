/* ===== Umadum Website — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initContactForm();
  initTesterForm();
});

/* ---------- Navbar scroll + mobile toggle ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    // Close mobile menu on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

/* ---------- Fade-in on scroll ---------- */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

/* ---------- Location search → Web App ---------- */
function goToApp(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('location-input');
  const location = input ? input.value.trim() : '';

  // Flutter Web App unter /app/ (gleiche Domain)
  const appBase = '/index.html';

  if (location) {
    window.location.href = appBase + '?location=' + encodeURIComponent(location);
  } else {
    window.location.href = appBase;
  }
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) return;

    const mailSubject = subject || 'Kontaktanfrage von ' + name;
    const mailBody    = 'Name: ' + name + '\nE-Mail: ' + email + '\n\n' + message;

    window.location.href = 'mailto:zutoruffy@gmail.com'
      + '?subject=' + encodeURIComponent(mailSubject)
      + '&body='    + encodeURIComponent(mailBody);

    // Show success state
    form.style.display = 'none';
    const success = document.getElementById('form-success');
    if (success) success.style.display = 'block';
  });
}

/* ---------- Tester signup ---------- */
function initTesterForm() {
  const form = document.getElementById('tester-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('[name="tester-email"]').value.trim();
    if (!email) return;

    const mailSubject = 'Tester-Bewerbung: ' + email;
    const mailBody = 'Hallo,\n\nich möchte mich als Tester für die Umadum App bewerben.\n\nMeine Google Play Store E-Mail-Adresse: ' + email + '\n\nVielen Dank!';

    window.location.href = 'mailto:zutoruffy@gmail.com'
      + '?subject=' + encodeURIComponent(mailSubject)
      + '&body='    + encodeURIComponent(mailBody);

    form.querySelector('[name="tester-email"]').value = '';
  });
}
