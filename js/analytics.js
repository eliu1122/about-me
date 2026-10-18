/* Visitor analytics via PostHog. PostHog's autocapture records pageviews, every click, and
   each visitor's IP and rough location; the events below add what autocapture can't see:
   how long each section was on screen, which cards were opened, and which lessons played.

   Visit any page with ?notrack=1 once to stop counting your own visits in this browser
   (?notrack=0 undoes it). Nothing is sent from localhost or a file:// preview. */

(function () {
  'use strict';

  var POSTHOG_KEY = 'phc_AAGjscSrW6cgyceuRZWkhx9Wqqh6GixYKUhGzTmgN2dH';  // Project settings → Project API key
  var POSTHOG_HOST = 'https://us.i.posthog.com';  // or https://eu.i.posthog.com

  if (POSTHOG_KEY.indexOf('REPLACE_ME') !== -1) return;
  if (location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;

  var optOut = false;
  try {
    var flag = new URLSearchParams(location.search).get('notrack');
    if (flag === '1') localStorage.setItem('notrack', '1');
    if (flag === '0') localStorage.removeItem('notrack');
    optOut = localStorage.getItem('notrack') === '1';
  } catch (e) { /* private mode: track as normal */ }
  if (optOut) return;

  /* PostHog's standard loader: queues calls until the library arrives. */
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify setPersonProperties reset get_distinct_id get_session_id opt_in_capturing opt_out_capturing has_opted_out_capturing startSessionRecording stopSessionRecording".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  var posthog = window.posthog;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'always',   // a profile for every visitor, not just identified ones
    capture_pageview: true,
    capture_pageleave: true
  });

  var page = location.pathname.split('/').pop() || 'index.html';

  /* ---------- Time on each section ----------
     The section crossing the middle of the viewport is the one being read. When that
     changes, or the tab is hidden, the outgoing section is logged with its seconds. */
  var sections = document.querySelectorAll('section[id]');
  var current = null;
  var since = 0;

  var flush = function () {
    if (!current) return;
    var seconds = Math.round((Date.now() - since) / 1000);
    if (seconds >= 1) posthog.capture('section_viewed', { section: current, seconds: seconds, page: page });
    current = null;
  };

  var enter = function (id) {
    if (id === current) return;
    flush();
    current = id;
    since = Date.now();
  };

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && document.visibilityState === 'visible') enter(entry.target.id);
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(function (s) { observer.observe(s); });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') { flush(); return; }
      // Back on the tab: resume whichever section is under the middle of the screen.
      var mid = window.innerHeight / 2;
      sections.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) enter(s.id);
      });
    });
    window.addEventListener('pagehide', flush);
  }

  var sectionOf = function (el) {
    var s = el.closest('section[id]');
    return s ? s.id : null;
  };

  /* ---------- Project and job cards opened or closed ---------- */
  document.querySelectorAll('details.job__body').forEach(function (d) {
    var h3 = d.querySelector('h3');
    var name = h3 ? h3.textContent.trim() : d.id;
    d.addEventListener('toggle', function () {
      posthog.capture(d.open ? 'card_opened' : 'card_closed', { card: name, section: sectionOf(d) });
    });
  });

  /* ---------- Lessons and videos ---------- */
  document.addEventListener('click', function (e) {
    var item = e.target.closest('.media__item');
    if (!item) return;
    var title = item.querySelector('.media__item-title');
    posthog.capture('lesson_selected', { lesson: title ? title.textContent.trim() : item.getAttribute('data-src') });
  });

  document.querySelectorAll('video').forEach(function (v) {
    v.addEventListener('play', function () {
      posthog.capture('video_played', { src: v.getAttribute('src'), section: sectionOf(v) });
    });
  });

  /* ---------- Links: résumé, GitHub, LinkedIn, email, PRD, itch.io ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.charAt(0) === '#') return;   // in-page nav is covered by section_viewed
    posthog.capture('link_clicked', {
      href: href,
      label: a.textContent.replace(/\s+/g, ' ').trim(),
      section: sectionOf(a),
      page: page
    });
  });
})();
