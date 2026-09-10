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

  /* ---------- Images: fall back to a labeled placeholder until the file exists ----------
     Applies to the portrait, every .shot, and every .tilt-card (e.g. the FridayFlicks
     screenshot) — add more of any of these and they get this for free, no JS changes needed. */
  var watchForMissingImage = function (img) {
    var container = img.closest('.portrait, .shot, .tilt-card') || img.parentNode;
    var markMissing = function () { container.classList.add('is-missing'); };
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  };
  document.querySelectorAll('.portrait img, .shot img, .tilt-card img').forEach(watchForMissingImage);

  /* ---------- Tilt cards: lean toward the pointer in 3D ----------
     Continuous follow on mouse (no need to click first, same feel as the usual
     "tilt.js"-style device mockups); press-and-drag on touch, since touch has no hover.
     Skipped entirely for prefers-reduced-motion, not just eased differently. */
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var MAX_TILT_DEG = 14;

    var applyTilt = function (card, clientX, clientY) {
      var rect = card.getBoundingClientRect();
      var px = (clientX - rect.left) / rect.width;   // 0..1 across the card
      var py = (clientY - rect.top) / rect.height;   // 0..1 down the card
      px = Math.min(1, Math.max(0, px));
      py = Math.min(1, Math.max(0, py));

      var ry = (px - 0.5) * 2 * MAX_TILT_DEG;   // left/right tilt
      var rx = (0.5 - py) * 2 * MAX_TILT_DEG;   // up/down tilt
      var shadowX = (px - 0.5) * -36;
      var shadowBlur = 26 + Math.abs(px - 0.5) * 24;

      card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      card.style.setProperty('--shadow-x', shadowX.toFixed(1) + 'px');
      card.style.setProperty('--shadow-blur', shadowBlur.toFixed(1) + 'px');
    };

    var resetTilt = function (card) {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--shadow-x', '0px');
      card.style.setProperty('--shadow-blur', '30px');
    };

    document.querySelectorAll('.tilt-card').forEach(function (card) {
      // Mouse: follow continuously while hovering.
      card.addEventListener('mouseenter', function () { card.classList.add('is-tilting'); });
      card.addEventListener('mousemove', function (e) { applyTilt(card, e.clientX, e.clientY); });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-tilting');
        resetTilt(card);
      });

      // Touch: only while a finger is actually down and dragging on the card.
      card.addEventListener('touchstart', function () { card.classList.add('is-tilting'); }, { passive: true });
      card.addEventListener('touchmove', function (e) {
        var t = e.touches[0];
        if (t) applyTilt(card, t.clientX, t.clientY);
      }, { passive: true });
      card.addEventListener('touchend', function () {
        card.classList.remove('is-tilting');
        resetTilt(card);
      });
    });
  }

  /* ---------- Portfolio Observability mock: working tabs + fake reload ----------
     It's a recreation with invented data, but the tabs and buttons behave like the
     real page so it reads as a UI, not a screenshot. */
  document.querySelectorAll('.obs').forEach(function (obs) {
    var tabs = obs.querySelectorAll('.obs__tab');
    var panels = obs.querySelectorAll('.obs__panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var name = tab.getAttribute('data-obs-tab');
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', String(on));
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute('data-obs-panel') !== name;
        });
      });
    });

    obs.querySelectorAll('[data-obs-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-spinning')) return;
        btn.classList.add('is-spinning');
        var stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        window.setTimeout(function () {
          btn.classList.remove('is-spinning');
          obs.querySelectorAll('.obs__updated-value').forEach(function (el) { el.textContent = stamp; });
        }, 650);
      });
    });
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
