/**
 * Main JavaScript
 * Grupo Alista Website v2
 */

'use strict';

(function () {
  /**
   * DOM Ready handler
   * @param {Function} fn - Callback function
   */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /**
   * Initialize the application
   */
  function init() {
    initSmoothScroll();
    initMobileNav();
    initScrollAnimations();
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');

        if (targetId === '#') {
          return;
        }

        var target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  /**
   * Mobile navigation toggle
   */
  function initMobileNav() {
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.querySelector('.nav__list');

    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('nav__list--open');
    });
  }

  /**
   * Scroll-triggered animations using Intersection Observer
   */
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length || !('IntersectionObserver' in window)) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Initialize when DOM is ready
  ready(init);
})();
