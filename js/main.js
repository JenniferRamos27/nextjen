// Nextjen Digital — site scripts

document.addEventListener('DOMContentLoaded', function () {
  // Scroll-reveal: fade + slide up elements as they enter the viewport
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // Count-up numbers (hero stats)
  var counters = document.querySelectorAll('[data-count-to]');
  counters.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Contact form handling (Netlify Forms, submitted via AJAX)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('form-success');
      var formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then(function () {
          form.reset();
          if (success) {
            success.style.display = 'block';
            success.textContent = "Thanks! Your message has been sent — we'll be in touch within 1–2 business days.";
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        })
        .catch(function () {
          if (success) {
            success.style.display = 'block';
            success.textContent = "Something went wrong sending your message. Please try again, or email jramos@nextjenresults.com directly.";
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
    });
  }
});
