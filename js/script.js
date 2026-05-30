/* ============================================================
   GestraCOO — script.js
   Deps loaded in HTML: GSAP, ScrollTrigger, Lenis
============================================================ */

// ── Lucide icons ─────────────────────────────────────────────
if (typeof lucide !== 'undefined') lucide.createIcons();

// ── Typewriter hero ───────────────────────────────────────────
(function initTypewriter() {
  const line1El  = document.getElementById('tw-line1');
  const line2El  = document.getElementById('tw-line2');
  const cursor   = document.querySelector('.tw-cursor');
  if (!line1El || !line2El) return;

  const line1 = 'Conecta tu programa y';
  const line2 = 'automatiza tus operaciones con IA';
  const speed = 90;

  function type(el, text, cb) {
    let i = 0;
    function step() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(step, speed);
      } else if (cb) {
        cb();
      }
    }
    step();
  }

  setTimeout(() => {
    type(line1El, line1, () => {
      setTimeout(() => {
        type(line2El, line2, () => {
          // Detener cursor parpadeante al terminar
          if (cursor) setTimeout(() => cursor.style.display = 'none', 1500);
        });
      }, 300);
    });
  }, 600);
})();


// ── Lenis smooth scroll ──────────────────────────────────────
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  function rafLoop(time) {
    lenis.raf(time);
    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
}

// ── GSAP scroll animations ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal elements
  gsap.utils.toArray('.gs-reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stagger cards in modules grid
  const cards = gsap.utils.toArray('.gs-card');
  if (cards.length) {
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '#modulos',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }
});

// ── Nav scroll behaviour ─────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
// Start scrolled-state check on load (in case of refresh mid-page)
if (window.scrollY > 40) nav.classList.add('scrolled');

// ── Mobile menu ───────────────────────────────────────────────
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Smooth anchor scroll with nav offset ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    if (lenis) {
      lenis.scrollTo(top, { duration: 1 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Open modal helpers ────────────────────────────────────────
function openModal() {
  document.getElementById('beta-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// CTA buttons → open modal
['nav-cta-btn', 'mobile-cta-btn', 'hero-cta-btn', 'cta-final-btn'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', openModal);
});

// ── Modal close ───────────────────────────────────────────────
document.querySelector('.modal-close').addEventListener('click', () => closeModal('beta-modal'));

document.getElementById('beta-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal('beta-modal');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal('beta-modal');
    closeModal('success-modal');
  }
});

document.getElementById('success-close-btn').addEventListener('click', () => closeModal('success-modal'));

// ── Country code sync ─────────────────────────────────────────
const paisSelect   = document.getElementById('pais');
const countryCode  = document.getElementById('country-code');
if (paisSelect && countryCode) {
  paisSelect.addEventListener('change', () => {
    const opt = paisSelect.options[paisSelect.selectedIndex];
    countryCode.textContent = opt.getAttribute('data-code') || '+56';
  });
}

// ── Form submission ───────────────────────────────────────────
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXbcMgVJYTef_SR00ID-jWC_8E1V89BUuVVmXCW1cT1DSC1XPWg22ClCc11rko2W2P/exec';

document.getElementById('beta-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit-btn');
  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Enviando…';

  const pais = paisSelect.value;
  if (!pais) {
    alert('Por favor, selecciona tu país');
    btn.disabled = false;
    btn.textContent = orig;
    return;
  }

  const payload = {
    nombre:  document.getElementById('nombre').value,
    correo:  document.getElementById('correo').value,
    pais,
    telefono: countryCode.textContent + ' ' + document.getElementById('telefono').value,
    empresa: document.getElementById('empresa').value,
    fecha:   new Date().toLocaleString('es-CL'),
  };

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    closeModal('beta-modal');
    e.target.reset();
    countryCode.textContent = '+56';
    document.getElementById('success-modal').classList.add('active');
  } catch {
    alert('Error al enviar. Por favor intenta nuevamente.');
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
    document.body.style.overflow = '';
  }
});

// ── Blog slider ───────────────────────────────────────────────
(function initBlogSlider() {
  const track    = document.querySelector('.blog-track');
  const cards    = document.querySelectorAll('.blog-card-slider');
  const prevBtn  = document.querySelector('.blog-prev');
  const nextBtn  = document.querySelector('.blog-next');
  const dots     = document.querySelectorAll('.blog-dot');
  if (!track || !cards.length) return;

  let current = 0;
  const total = cards.length;

  function perView() {
    const w = window.innerWidth;
    if (w < 768)  return 1;
    if (w < 1024) return 2;
    return 3;
  }

  function go(index) {
    const pv      = perView();
    const max     = total - pv;
    current       = Math.max(0, Math.min(index, max));
    const cardW   = cards[0].offsetWidth;
    const gap     = parseInt(getComputedStyle(track).gap) || 24;
    track.style.transform = `translateX(-${current * (cardW + gap)}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    if (prevBtn) prevBtn.style.opacity = current === 0 ? '0.4' : '1';
    if (nextBtn) nextBtn.style.opacity = current >= max ? '0.4' : '1';
  }

  if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

  // Touch / drag
  let startX = 0, dragging = false;
  track.addEventListener('mousedown',  (e) => { startX = e.clientX; dragging = true; });
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
  function endDrag(endX) {
    if (!dragging) return;
    dragging = false;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) go(diff > 0 ? current + 1 : current - 1);
  }
  track.addEventListener('mouseup',    (e) => endDrag(e.clientX));
  track.addEventListener('mouseleave', (e) => endDrag(e.clientX));
  track.addEventListener('touchend',   (e) => endDrag(e.changedTouches[0].clientX));

  // Auto-play
  let timer = setInterval(() => go(current + 1 > total - perView() ? 0 : current + 1), 4000);
  const slider = document.querySelector('.blog-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => {
      timer = setInterval(() => go(current + 1 > total - perView() ? 0 : current + 1), 4000);
    });
  }

  window.addEventListener('resize', () => go(0));
  go(0);
})();

// ── Alerts panel animation ────────────────────────────────────
(function initAlerts() {
  const wrapper = document.querySelector('.alerts-wrapper');
  if (!wrapper) return;
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.alerts-anim').forEach(card => card.classList.add('visible'));
    observer.disconnect();
  }, { threshold: 0.2 });
  observer.observe(wrapper);
})();

// ── Platform visual cards animations ─────────────────────────
(function initPlatformVisual() {
  const wrapper = document.querySelector('.pv-wrapper');
  if (!wrapper) return;

  let fired = false;
  const observer = new IntersectionObserver((entries) => {
    if (fired || !entries[0].isIntersecting) return;
    fired = true;

    // Animate progress bars
    document.querySelectorAll('.pv-bar').forEach((bar, i) => {
      setTimeout(() => bar.classList.add('animated'), i * 200);
    });

    // Count-up numbers
    document.querySelectorAll('.pv-stat-num').forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const dur = 1400, step = 16;
      let cur = 0;
      const inc = target / (dur / step);
      const timer = setInterval(() => {
        cur = Math.min(cur + inc, target);
        el.textContent = Math.round(cur);
        if (cur >= target) clearInterval(timer);
      }, step);
    });

  }, { threshold: 0.3 });

  observer.observe(wrapper);
})();

// ── Cookie consent ────────────────────────────────────────────
(function initCookies() {
  const KEY = 'gestracoo_cookies_accepted';
  const get = (n) => document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(n + '='))?.split('=')[1] ?? null;
  const set = (n, v) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    document.cookie = `${n}=${v};expires=${d.toUTCString()};path=/;SameSite=Strict`;
  };

  const banner = document.getElementById('cookie-banner');
  const consent = get(KEY);

  if (!consent) {
    setTimeout(() => banner.classList.add('show'), 800);
  } else if (consent === 'rejected') {
    window['ga-disable-G-R7TBYB7HTG'] = true;
  }

  document.getElementById('cookie-accept').addEventListener('click', () => {
    set(KEY, 'accepted');
    banner.classList.remove('show');
  });

  document.getElementById('cookie-reject').addEventListener('click', () => {
    set(KEY, 'rejected');
    window['ga-disable-G-R7TBYB7HTG'] = true;
    banner.classList.remove('show');
  });
})();
