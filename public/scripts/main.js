// ─── Floating geometric shapes background ───────────────────────────────────
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, shapes = [];

  const COLORS = [
    'rgba(155,89,255,',
    'rgba(124,58,237,',
    'rgba(192,132,252,',
    'rgba(109,40,217,',
    'rgba(80,20,180,',
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Shape {
    constructor() { this.reset(true); }
    reset(init) {
      this.type   = ['triangle','rect','circle','hexagon','diamond'][Math.floor(rand(0,5))];
      this.x      = rand(0, W);
      this.y      = init ? rand(0, H) : H + 60;
      this.size   = rand(12, 60);
      this.speed  = rand(0.15, 0.55);
      this.angle  = rand(0, Math.PI * 2);
      this.spin   = rand(-0.008, 0.008);
      this.dx     = rand(-0.3, 0.3);
      this.alpha  = rand(0.04, 0.18);
      this.color  = COLORS[Math.floor(rand(0, COLORS.length))];
      this.targetAlpha = this.alpha;
      this.pulseDir = 1;
    }
    update() {
      this.y      -= this.speed;
      this.x      += this.dx;
      this.angle  += this.spin;
      // gentle pulse
      this.alpha  += 0.0003 * this.pulseDir;
      if (this.alpha > this.targetAlpha * 1.4 || this.alpha < this.targetAlpha * 0.6) this.pulseDir *= -1;
      if (this.y < -80 || this.x < -80 || this.x > W + 80) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = this.color + '1)';
      ctx.lineWidth   = 1;
      ctx.fillStyle   = this.color + '0.03)';
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      const s = this.size;
      ctx.beginPath();
      switch (this.type) {
        case 'triangle':
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.866, s * 0.5); ctx.lineTo(-s * 0.866, s * 0.5); ctx.closePath(); break;
        case 'rect':
          ctx.rect(-s / 2, -s / 2, s, s); break;
        case 'circle':
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2); break;
        case 'hexagon':
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            i === 0 ? ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s) : ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
          }
          ctx.closePath(); break;
        case 'diamond':
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.6, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.6, 0); ctx.closePath(); break;
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    shapes = Array.from({ length: 55 }, () => new Shape());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    shapes.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

// ─── Intersection Observer fade-in ─────────────────────────────────────────
document.querySelectorAll('.fade-in').forEach(el => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('visible'); }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }).observe(el);
});

// ─── Active nav link on scroll ──────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const nav       = document.querySelector('nav');

window.addEventListener('scroll', () => {
  // Nav shadow
  if (nav) nav.style.boxShadow = scrollY > 10 ? '0 1px 0 rgba(155,89,255,0.15)' : 'none';

  // Active link
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });
