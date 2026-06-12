// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll state
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Partículas de fondo (polvo de taller / brasas) =====
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { canvas.remove(); return; }

  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = Math.min(70, Math.floor(window.innerWidth / 18));

  function makeParticle(initial) {
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: Math.random() * 2.2 + 0.5,
      speedY: Math.random() * 0.35 + 0.08,
      driftX: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
      // tonos cobre y crema
      warm: Math.random() > 0.55,
      alpha: Math.random() * 0.45 + 0.12
    };
  }
  particles = Array.from({ length: COUNT }, () => makeParticle(true));

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    t += 0.008;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.speedY;
      p.x += p.driftX + Math.sin(t * 2 + p.phase) * 0.18;
      // parpadeo suave
      const flicker = 0.75 + Math.sin(t * 3 + p.phase) * 0.25;

      if (p.y < -12 || p.x < -12 || p.x > w + 12) {
        particles[i] = makeParticle(false);
        continue;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.warm
        ? `rgba(224, 172, 120, ${p.alpha * flicker})`
        : `rgba(242, 237, 228, ${p.alpha * flicker * 0.5})`;
      ctx.fill();
      // halo en las más grandes
      if (p.r > 1.8 && p.warm) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 142, 90, ${p.alpha * flicker * 0.08})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Tilt 3D suave en hero visual
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('mousemove', (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroVisual.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  heroVisual.addEventListener('mouseleave', () => {
    heroVisual.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)';
    heroVisual.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    setTimeout(() => { heroVisual.style.transition = ''; }, 600);
  });
}
