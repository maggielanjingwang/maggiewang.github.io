/* =========================================================
   Lanjing (Maggie) Wang — interactions
   ========================================================= */
(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- scroll progress + sticky nav ---------- */
  const progress = document.getElementById('progress');
  const nav = document.getElementById('nav');
  function onScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('is-stuck', st > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          const el = e.target;
          // light stagger among siblings entering together
          setTimeout(function () { el.classList.add('is-in'); }, Math.min(i * 70, 280));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- active nav + sliding pill ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav__links a[data-nav]'));
  const pill = document.getElementById('navPill');
  const sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function movePill(link) {
    if (!pill || !link || window.innerWidth <= 760) { if (pill) pill.style.opacity = '0'; return; }
    pill.style.left = link.offsetLeft + 'px';
    pill.style.width = link.offsetWidth + 'px';
    pill.style.opacity = '1';
  }
  function setActive() {
    const y = window.scrollY + window.innerHeight * 0.32;
    let current = null;
    sections.forEach(function (sec, i) {
      if (sec.offsetTop <= y) current = navLinks[i];
    });
    navLinks.forEach(function (a) { a.classList.remove('is-active'); });
    if (current) { current.classList.add('is-active'); movePill(current); }
    else if (pill) { pill.style.opacity = '0'; }
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  navLinks.forEach(function (a) { a.addEventListener('mouseenter', function () { movePill(a); }); });
  const linksWrap = document.querySelector('.nav__links');
  if (linksWrap) {
    linksWrap.addEventListener('mouseleave', function () {
      const active = document.querySelector('.nav__links a.is-active');
      if (active) movePill(active); else if (pill) pill.style.opacity = '0';
    });
  }
  setActive();
})();
