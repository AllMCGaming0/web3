/**
 * 📸 Gallery & Lightbox
 * Polaroid-style gallery with full-screen lightbox and keyboard navigation
 */
(function () {
  'use strict';

  var currentIndex = 0;
  var galleryItems = [];

  /**
   * Build the gallery grid and wire up the lightbox.
   * @param {Array} photos - Array of { src, caption }
   */
  window.initGallery = function (photos) {
    var grid = document.getElementById('gallery-grid');
    if (!grid || !photos) return;

    galleryItems = photos;

    // Create polaroid-style gallery items with random tilts
    photos.forEach(function (photo, i) {
      var tilt = -3 + Math.random() * 6;
      var item = document.createElement('div');
      item.className = 'gallery-item interactive';
      item.style.setProperty('--tilt', tilt + 'deg');
      item.setAttribute('data-index', i);

      // Check for admin-uploaded photo in localStorage first
      var savedSrc = window.PhotoEditor ? window.PhotoEditor.getPhoto('gallery-' + i) : null;
      var actualSrc = savedSrc || photo.src;

      if (actualSrc) {
        item.innerHTML =
          '<img class="gallery-item-img" src="' + actualSrc + '" alt="' + (photo.caption || 'Memory ' + (i + 1)) + '">' +
          '<span class="gallery-item-caption">' + (photo.caption || 'Our memory #' + (i + 1)) + '</span>';
      } else {
        item.innerHTML =
          '<div class="gallery-item-img">📷</div>' +
          '<span class="gallery-item-caption">' + (photo.caption || 'Our memory #' + (i + 1)) + '</span>';
      }

      item.addEventListener('click', function () { openLightbox(i); });
      grid.appendChild(item);
    });

    // Lightbox controls
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () { navigateLightbox(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { navigateLightbox(1); });

    // Click backdrop to close
    document.getElementById('lightbox').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      var lightbox = document.getElementById('lightbox');
      if (lightbox.classList.contains('hidden')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  };

  function setLightboxContent(index) {
    var item = galleryItems[index];
    var img = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');

    // Check for saved photo first
    var savedSrc = window.PhotoEditor ? window.PhotoEditor.getPhoto('gallery-' + index) : null;
    var actualSrc = savedSrc || item.src;

    if (actualSrc) {
      img.src = actualSrc;
      img.style.background = '';
      img.style.minWidth = '';
      img.style.minHeight = '';
    } else {
      // Show gradient placeholder
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      img.style.background = 'linear-gradient(135deg, #FDE4EC, #EDE4F3)';
      img.style.minWidth = '300px';
      img.style.minHeight = '300px';
    }

    img.alt = item.caption || 'Photo ' + (index + 1);
    caption.textContent = item.caption || 'Our memory #' + (index + 1);
  }

  function openLightbox(index) {
    currentIndex = index;
    var lightbox = document.getElementById('lightbox');

    setLightboxContent(index);

    lightbox.classList.remove('hidden');
    requestAnimationFrame(function () { lightbox.classList.add('visible'); });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('visible');
    setTimeout(function () {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  function navigateLightbox(dir) {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    setLightboxContent(currentIndex);
  }
})();
