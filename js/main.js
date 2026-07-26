/* ==========================================================================
   KAWAALA COLLEGE SCHOOL — main.js
   Plain JavaScript, no libraries, no build step.
   Every block below is independent: if a page does not contain a carousel,
   the carousel code simply does nothing.
   ========================================================================== */

/* --------------------------------------------------------------------------
   FORM ENDPOINT — CHANGE THIS ONE LINE TO MAKE THE FORMS WORK
   ----------------------------------------------------------------------------
   The enquiry form and the contact form both send to the address below.
   Right now it is a placeholder and submissions will NOT reach the school.

   To switch it on, free of charge:
     1. Go to https://formspree.io and create an account with the school email
        (kawaalacollegeschool1341@gmail.com).
     2. Create a new form. Formspree gives you a web address that looks like
        https://formspree.io/f/abcdwxyz
     3. Paste that address between the quotes below, replacing the placeholder.
     4. Save this file and upload it. Send a test message to check it arrives.

   Until that is done, visitors get a clear message telling them to phone the
   school instead, so nobody is left thinking their message was delivered.
-------------------------------------------------------------------------- */
var FORM_ENDPOINT = 'REPLACE_WITH_YOUR_FORMSPREE_URL';
/* ------------------------------------------------------------------------ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /* ====================================================================== */
  /* 1. HEADER — solid background once the page scrolls                     */
  /* ====================================================================== */
  (function header() {
    var el = $('.site-header');
    if (!el) return;

    var onScroll = function () {
      el.classList.toggle('is-solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ====================================================================== */
  /* 2. MOBILE MENU — focus trap, Esc to close, focus returned on close     */
  /* ====================================================================== */
  (function mobileMenu() {
    var menu   = $('.mobile-menu');
    var open   = $('.nav-toggle');
    var close  = $('.mobile-menu__close');
    if (!menu || !open) return;

    var lastFocused = null;
    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function openMenu() {
      lastFocused = document.activeElement;
      menu.classList.add('is-open');
      menu.removeAttribute('aria-hidden');
      open.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      var first = $(FOCUSABLE, menu);
      if (first) first.focus();
      document.addEventListener('keydown', onKeydown);
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      open.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKeydown);
      /* Send focus back where it came from. If the menu was opened by touch or
         by a script, activeElement was <body>, which cannot hold focus — fall
         back to the toggle so the keyboard user never lands at the page top. */
      var target = (lastFocused && lastFocused !== document.body) ? lastFocused : open;
      target.focus();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key !== 'Tab') return;

      var items = $$(FOCUSABLE, menu).filter(function (n) { return n.offsetParent !== null; });
      if (!items.length) return;
      var first = items[0];
      var last  = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    open.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  })();

  /* ====================================================================== */
  /* 3. HERO CAROUSEL — crossfade, autoplay, dots, arrows, pause on hover   */
  /* ====================================================================== */
  (function carousel() {
    var root = $('.hero__slides');
    if (!root) return;

    var slides = $$('.hero__slide', root);
    var dotsWrap = $('.hero__dots');
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var DELAY = 6000;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { go(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function go(next) {
      slides[index].classList.remove('is-active');
      dots[index].setAttribute('aria-selected', 'false');
      index = (next + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      dots[index].setAttribute('aria-selected', 'true');
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(function () { go(index + 1); }, DELAY);
    }
    function stop() { clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }

    var hero = $('.hero');
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);

    if (dotsWrap) {
      dotsWrap.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { go(index + 1); restart(); dots[index].focus(); }
        if (e.key === 'ArrowLeft')  { go(index - 1); restart(); dots[index].focus(); }
      });
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    /* Bring in the later slides only once the page itself has finished
       loading, so they never compete with the first view for bandwidth. */
    function hydrateSlides() {
      slides.forEach(function (slide) {
        var img = slide.querySelector('img[data-src]');
        if (!img) return;
        if (img.getAttribute('data-srcset')) img.setAttribute('srcset', img.getAttribute('data-srcset'));
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
      });
    }
    if (document.readyState === 'complete') hydrateSlides();
    else window.addEventListener('load', hydrateSlides);

    start();
  })();

  /* ====================================================================== */
  /* 4. SCROLL REVEALS — fade and rise, staggered inside a group            */
  /* ====================================================================== */
  (function reveals() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ====================================================================== */
  /* 5. STATS COUNT-UP — runs once, on first intersection                   */
  /* ====================================================================== */
  (function countUp() {
    var nums = $$('.stat__num[data-count]');
    if (!nums.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        var target = parseInt(el.getAttribute('data-count'), 10);
        var DURATION = 1100;
        var startTime = null;

        function frame(now) {
          if (startTime === null) startTime = now;
          var progress = Math.min((now - startTime) / DURATION, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(frame);
          else el.textContent = target;
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.5 });

    nums.forEach(function (el) { el.textContent = '0'; io.observe(el); });
  })();

  /* ====================================================================== */
  /* 6. BACK TO TOP                                                          */
  /* ====================================================================== */
  (function backToTop() {
    var btn = $('.fab-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  })();

  /* ====================================================================== */
  /* 7. GALLERY — category filter plus lightbox                             */
  /* ====================================================================== */
  (function gallery() {
    var grid = $('.gallery-grid');
    var box  = $('.lightbox');
    if (!grid) return;

    var items = $$('.gallery-item', grid);

    /* -- filter -- */
    var filters = $$('.filter-btn');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.getAttribute('data-filter');
        filters.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        items.forEach(function (item) {
          var cat = item.getAttribute('data-category');
          item.hidden = !(want === 'all' || cat === want);
        });
      });
    });

    if (!box) return;

    /* -- lightbox -- */
    var img     = $('.lightbox__fig img', box);
    var caption = $('.lightbox__fig figcaption', box);
    var counter = $('.lightbox__count', box);
    var lastFocused = null;
    var current = 0;

    function visibleItems() { return items.filter(function (i) { return !i.hidden; }); }

    function show(i) {
      var list = visibleItems();
      if (!list.length) return;
      current = (i + list.length) % list.length;
      var item = list[current];
      var full = item.getAttribute('data-full');
      var alt  = item.getAttribute('data-alt') || '';
      var cap  = item.getAttribute('data-caption') || '';
      img.setAttribute('src', full);
      img.setAttribute('alt', alt);
      caption.textContent = cap;
      counter.textContent = (current + 1) + ' of ' + list.length;
    }

    function openBox(i, trigger) {
      /* Remember the tile itself rather than whatever happened to have focus —
         a tap leaves activeElement on <body>, which cannot take focus back. */
      lastFocused = trigger || document.activeElement;
      show(i);
      box.classList.add('is-open');
      box.removeAttribute('aria-hidden');
      document.body.classList.add('is-locked');
      $('.lightbox__close', box).focus();
      document.addEventListener('keydown', onKey);
    }

    function closeBox() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      if (lastFocused) lastFocused.focus();
    }

    function onKey(e) {
      if (e.key === 'Escape')     { closeBox(); }
      if (e.key === 'ArrowRight') { show(current + 1); }
      if (e.key === 'ArrowLeft')  { show(current - 1); }
      if (e.key === 'Tab') {
        /* keep focus inside the lightbox */
        var focusables = $$('button', box);
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        openBox(visibleItems().indexOf(item), item);
      });
    });

    $('.lightbox__close', box).addEventListener('click', closeBox);
    $('.lightbox__prev',  box).addEventListener('click', function () { show(current - 1); });
    $('.lightbox__next',  box).addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) closeBox(); });
  })();

  /* ====================================================================== */
  /* 8. FORMS — inline validation, real success state, honest error state   */
  /* ====================================================================== */
  (function forms() {
    var forms = $$('form[data-kcs-form]');
    if (!forms.length) return;

    function setError(field, message) {
      field.classList.add('has-error');
      var slot = $('.field__error', field);
      if (slot) slot.textContent = message;
      var input = $('input, textarea, select', field);
      if (input) input.setAttribute('aria-invalid', 'true');
    }

    function clearError(field) {
      field.classList.remove('has-error');
      var input = $('input, textarea, select', field);
      if (input) input.removeAttribute('aria-invalid');
    }

    function validate(form) {
      var ok = true;
      var firstBad = null;

      $$('.field', form).forEach(function (field) {
        var input = $('input, textarea, select', field);
        if (!input) return;
        clearError(field);

        var value = (input.value || '').trim();

        if (input.hasAttribute('required') && !value) {
          setError(field, 'Please fill this in.');
          ok = false; firstBad = firstBad || input; return;
        }
        if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          setError(field, 'Please check the email address.');
          ok = false; firstBad = firstBad || input; return;
        }
        if (input.type === 'tel' && value && value.replace(/[^0-9]/g, '').length < 9) {
          setError(field, 'Please enter a full phone number.');
          ok = false; firstBad = firstBad || input;
        }
      });

      if (firstBad) firstBad.focus();
      return ok;
    }

    forms.forEach(function (form) {
      var okBox  = $('.form__status--ok', form);
      var errBox = $('.form__status--err', form);
      var submit = $('button[type="submit"]', form);

      form.setAttribute('novalidate', 'novalidate');

      $$('.field input, .field textarea, .field select', form).forEach(function (input) {
        input.addEventListener('input', function () {
          var field = input.closest('.field');
          if (field && field.classList.contains('has-error')) clearError(field);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (okBox)  okBox.classList.remove('is-shown');
        if (errBox) errBox.classList.remove('is-shown');

        if (!validate(form)) return;

        /* Endpoint not configured yet — say so plainly rather than pretend. */
        if (!FORM_ENDPOINT || FORM_ENDPOINT.indexOf('REPLACE_WITH') === 0) {
          if (errBox) { errBox.classList.add('is-shown'); errBox.focus(); }
          return;
        }

        var original = submit ? submit.textContent : '';
        if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }

        fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Bad response');
            form.reset();
            if (okBox) { okBox.classList.add('is-shown'); okBox.focus(); }
          })
          .catch(function () {
            if (errBox) { errBox.classList.add('is-shown'); errBox.focus(); }
          })
          .then(function () {
            if (submit) { submit.disabled = false; submit.textContent = original; }
          });
      });
    });
  })();

  /* ====================================================================== */
  /* 9. FOOTER YEAR                                                          */
  /* ====================================================================== */
  $$('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
