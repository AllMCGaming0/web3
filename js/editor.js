/**
 * 📷 Photo Editor
 * Allows admin to upload/replace photos in gallery and timeline.
 * Photos are stored as compressed base64 in localStorage.
 */
(function () {
  'use strict';

  var STORAGE_PREFIX = 'gf_day_photo_';
  var MAX_SIZE = 800;   // Max width/height in pixels
  var QUALITY = 0.7;    // JPEG compression quality (0-1)

  window.PhotoEditor = {

    /** Get a saved photo from localStorage */
    getPhoto: function (key) {
      try { return localStorage.getItem(STORAGE_PREFIX + key); }
      catch (e) { return null; }
    },

    /** Save a photo data URL to localStorage */
    savePhoto: function (key, dataUrl) {
      try {
        localStorage.setItem(STORAGE_PREFIX + key, dataUrl);
        return true;
      } catch (e) {
        alert('⚠️ Storage is full! Try a smaller image or clear some old photos.');
        return false;
      }
    },

    /** Remove a saved photo */
    removePhoto: function (key) {
      localStorage.removeItem(STORAGE_PREFIX + key);
    },

    /**
     * Open file picker, resize the selected image, and save it.
     * @param {string} key - Storage key (e.g., 'gallery-0', 'timeline-2')
     * @param {function} callback - Called with the dataUrl on success
     */
    uploadPhoto: function (key, callback) {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      document.body.appendChild(input);

      input.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (!file) { input.remove(); return; }

        var reader = new FileReader();
        reader.onload = function (ev) {
          var img = new Image();
          img.onload = function () {
            // Resize to fit within MAX_SIZE
            var canvas = document.createElement('canvas');
            var w = img.width, h = img.height;

            if (w > MAX_SIZE || h > MAX_SIZE) {
              var ratio = Math.min(MAX_SIZE / w, MAX_SIZE / h);
              w = Math.round(w * ratio);
              h = Math.round(h * ratio);
            }

            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);

            var dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
            if (window.PhotoEditor.savePhoto(key, dataUrl)) {
              if (callback) callback(dataUrl);
            }
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
        input.remove();
      });

      input.click();
    },

    /**
     * Add edit overlay buttons to all gallery and timeline photos.
     * Only call this when the user is logged in as admin.
     */
    addEditOverlays: function () {
      if (!window.AuthSystem || !window.AuthSystem.isAdmin()) return;

      // Add body class for admin-specific CSS
      document.body.classList.add('admin-mode');

      // Gallery items
      document.querySelectorAll('.gallery-item').forEach(function (item, i) {
        var key = 'gallery-' + i;
        _addEditBtn(item, key, function (dataUrl) {
          var existing = item.querySelector('.gallery-item-img');
          if (existing && existing.tagName === 'IMG') {
            existing.src = dataUrl;
          } else if (existing) {
            // Replace placeholder div with real img
            var img = document.createElement('img');
            img.className = 'gallery-item-img';
            img.src = dataUrl;
            img.alt = 'Memory photo';
            existing.replaceWith(img);
          }
        });
      });

      // Timeline photos
      document.querySelectorAll('.timeline-item').forEach(function (item, i) {
        var photoDiv = item.querySelector('.timeline-photo');
        if (!photoDiv) return;
        var key = 'timeline-' + i;
        _addEditBtn(photoDiv, key, function (dataUrl) {
          photoDiv.innerHTML = '<img src="' + dataUrl + '" alt="Timeline photo">';
        });
      });
    }
  };

  /** Internal: create and append an edit button */
  function _addEditBtn(container, key, onUpload) {
    container.style.position = 'relative';

    var btn = document.createElement('button');
    btn.className = 'edit-photo-btn';
    btn.innerHTML = '📷 Edit';
    btn.title = 'Upload / change photo';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      window.PhotoEditor.uploadPhoto(key, onUpload);
    });

    container.appendChild(btn);
  }
})();
