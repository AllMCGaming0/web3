/**
 * 💕 Floating Hearts Animation
 * Creates floating heart elements that drift upward across the screen
 */
(function () {
  'use strict';

  const HEARTS = ['💕', '💖', '💗', '💝', '💘', '♥️', '❤️', '💓', '💞', '🩷'];
  const HEART_COUNT = 25;

  function createHeart(container) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];

    const size = 0.8 + Math.random() * 1.5;
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 10;
    const delay = Math.random() * duration;
    const opacity = 0.15 + Math.random() * 0.45;
    const rotate = -30 + Math.random() * 60;
    const blur = Math.random() > 0.7 ? (1 + Math.random() * 2) : 0;

    heart.style.setProperty('--size', size + 'rem');
    heart.style.setProperty('--left', left + '%');
    heart.style.setProperty('--duration', duration + 's');
    heart.style.setProperty('--delay', '-' + delay + 's');
    heart.style.setProperty('--opacity', opacity);
    heart.style.setProperty('--rotate', rotate + 'deg');
    heart.style.setProperty('--blur', blur + 'px');

    container.appendChild(heart);
  }

  function initHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    for (let i = 0; i < HEART_COUNT; i++) {
      createHeart(container);
    }
  }

  /**
   * Mini heart burst effect — called when flip cards are clicked, quiz answers
   * are correct, or clicker milestones are hit.
   * @param {number} x - Center X position (page coordinates)
   * @param {number} y - Center Y position (page coordinates)
   */
  window.createHeartBurst = function (x, y) {
    const count = 8;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      span.style.position = 'fixed';
      span.style.left = x + 'px';
      span.style.top = y + 'px';
      span.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
      span.style.pointerEvents = 'none';
      span.style.zIndex = '9999';

      const angle = (i / count) * Math.PI * 2;
      const dist = 30 + Math.random() * 50;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      span.style.setProperty('--tx', tx + 'px');
      span.style.setProperty('--ty', ty + 'px');
      span.style.animation = 'burstHeart 0.8s ease forwards';

      document.body.appendChild(span);
      setTimeout(() => span.remove(), 900);
    }
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHearts);
  } else {
    initHearts();
  }
})();
