/**
 * 📅 Timeline Interactions
 * Scroll-driven animations and progress line fill
 */
(function () {
  'use strict';

  /**
   * Build timeline milestones and set up scroll-driven progress.
   * @param {Array} milestones - Array of { date, title, caption, photo }
   */
  window.initTimeline = function (milestones) {
    const container = document.getElementById('timeline-container');
    const progressBar = document.getElementById('timeline-progress');
    if (!container || !milestones) return;

    // Build timeline items from config
    milestones.forEach(function (m, i) {
      var item = document.createElement('div');
      item.className = 'timeline-item';

      // Check for admin-uploaded photo in localStorage first
      var savedPhoto = window.PhotoEditor ? window.PhotoEditor.getPhoto('timeline-' + i) : null;
      var photoSrc = savedPhoto || m.photo;

      var photoHTML;
      if (photoSrc) {
        photoHTML = '<div class="timeline-photo"><img src="' + photoSrc + '" alt="' + m.title + '"></div>';
      } else {
        photoHTML = '<div class="timeline-photo">📷 Add your photo here</div>';
      }

      item.innerHTML =
        '<span class="timeline-date">' + m.date + '</span>' +
        '<h3 class="timeline-title">' + m.title + '</h3>' +
        '<p class="timeline-caption">' + m.caption + '</p>' +
        photoHTML;

      container.appendChild(item);
    });

    // Fade-in on scroll via IntersectionObserver
    var items = container.querySelectorAll('.timeline-item');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (item) { observer.observe(item); });

    // Scroll-driven progress line
    function updateProgress() {
      // Only compute if timeline page is active
      var page = container.closest('.page');
      if (!page || !page.classList.contains('active')) return;

      var rect = container.getBoundingClientRect();
      var winH = window.innerHeight;
      var progress = 0;

      if (rect.top < winH) {
        progress = Math.min(1, (winH - rect.top) / (rect.height + winH * 0.3));
      }

      progressBar.style.height = (progress * 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });

    // Also update when the timeline page becomes visible
    window.updateTimelineProgress = updateProgress;
    updateProgress();
  };
})();
