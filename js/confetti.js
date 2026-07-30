/**
 * 🎉 Confetti Animation
 * Canvas-based confetti burst for the surprise page
 */
(function () {
  'use strict';

  const COLORS = [
    '#F8C8D4', '#D7C4E0', '#D4A853', '#C2185B', '#E91E63',
    '#F0D48A', '#FF80AB', '#EA80FC', '#FFD54F', '#FF8A65',
    '#CE93D8', '#80DEEA', '#A5D6A7'
  ];
  const PARTICLE_COUNT = 180;
  const GRAVITY = 0.25;
  const DRAG = 0.015;

  let canvas, ctx;
  let particles = [];
  let animId = null;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 24;
      this.vy = -6 - Math.random() * 14;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.opacity = 1;
      this.width = 5 + Math.random() * 7;
      this.height = this.width * (0.3 + Math.random() * 0.7);
      this.shape = Math.random();
    }

    update() {
      this.vy += GRAVITY;
      this.vx *= (1 - DRAG);
      this.vy *= (1 - DRAG);
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.opacity -= 0.004;
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.shape < 0.33) {
        // Rectangle
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      } else if (this.shape < 0.66) {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Strip / streamer
        ctx.fillRect(-this.width / 2, -1, this.width, 3);
      }

      ctx.restore();
    }

    isDead() {
      return this.opacity <= 0 || this.y > (canvas ? canvas.height + 30 : 9999);
    }
  }

  function animate() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => !p.isDead());
    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    if (particles.length > 0) {
      animId = requestAnimationFrame(animate);
    }
  }

  /**
   * Launch a confetti burst from the center-top of the screen.
   * Can be called multiple times — new particles add to existing ones.
   */
  window.launchConfetti = function () {
    canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height * 0.25;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(
        cx + (Math.random() - 0.5) * 120,
        cy + (Math.random() - 0.5) * 40
      ));
    }

    if (animId) cancelAnimationFrame(animId);
    animate();
  };

  // Keep canvas sized correctly
  window.addEventListener('resize', function () {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
})();
