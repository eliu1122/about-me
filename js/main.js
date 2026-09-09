/* Nav, theme, and scroll reveals. Vanilla — no dependencies. */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme: remembered per browser, defaults to the OS setting ---------- */
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* private mode */ }

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  var setTheme = function (next) {
    // Suppress transitions across the swap, otherwise Chrome holds the previously
    // resolved color on anything with `transition: color`.
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', next);
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { root.classList.remove('theme-switching'); });
    });
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  };

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Hairline under the nav once the page scrolls ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Highlight the section currently in view ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var linkFor = {};
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var visible = {};
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });

      var current = null;
      sections.forEach(function (s) { if (visible[s.id]) current = current || s.id; });

      Object.keys(linkFor).forEach(function (id) {
        linkFor[id].classList.toggle('is-active', id === current);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------- Open a collapsed panel when a link points at it ----------
     Used by the hero's "See what I'm building" button (data-open="sec-simplifier")
     and by any deep link such as /#fridayflicks. ------------------------------------- */
  var openPanel = function (id) {
    if (!id) return;
    var el = document.getElementById(id.replace(/^#/, ''));
    if (!el) return;
    var panel = el.tagName === 'DETAILS' ? el : (el.closest ? el.closest('details') : null);
    if (panel) panel.open = true;
  };

  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"], [data-open]') : null;
    if (!link) return;
    openPanel(link.getAttribute('data-open') || link.getAttribute('href'));
  });

  window.addEventListener('hashchange', function () { openPanel(window.location.hash); });
  openPanel(window.location.hash);

  /* ---------- Portrait: fall back to a labeled placeholder until the file exists ---------- */
  var portrait = document.querySelector('.portrait img');
  if (portrait) {
    var markMissing = function () { portrait.parentNode.classList.add('is-missing'); };
    portrait.addEventListener('error', markMissing);
    if (portrait.complete && portrait.naturalWidth === 0) markMissing();
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
