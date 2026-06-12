// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll state
const header = document.querySelector('header');

// ===== Animaciones ligadas al scroll =====
const cutDone = document.getElementById('cutDone');
const sawIcon = document.getElementById('sawIcon');
const buildChair = document.getElementById('buildChair');
const chairPaths = buildChair ? Array.from(buildChair.querySelectorAll('.draw')) : [];
const blobs = document.querySelectorAll('.bg-blob');

// preparar trazos de la silla: cada path conoce su largo
let chairTotal = 0;
const chairLens = chairPaths.map(p => {
  const len = p.getTotalLength();
  p.style.strokeDasharray = len;
  p.style.strokeDashoffset = len;
  chairTotal += len;
  return len;
});

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

  header.classList.toggle('scrolled', window.scrollY > 40);

  // serrucho avanza cortando
  if (cutDone && sawIcon) {
    const pct = progress * 100;
    cutDone.style.width = pct + '%';
    sawIcon.style.left = pct + '%';
  }

  // la silla se dibuja trazo a trazo, en orden (respaldo → asiento → patas)
  if (chairPaths.length) {
    let budget = progress * chairTotal;
    for (let i = 0; i < chairPaths.length; i++) {
      const len = chairLens[i];
      const drawn = Math.max(0, Math.min(len, budget));
      chairPaths[i].style.strokeDashoffset = len - drawn;
      budget -= len;
    }
  }

  // parallax suave en los blobs de luz
  blobs.forEach((b, i) => {
    const speed = (i + 1) * 40;
    b.style.translate = `0 ${progress * speed}px`;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

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

// ===== Virutas de madera cayendo (canvas) =====
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { canvas.remove(); return; }

  const ctx = canvas.getContext('2d');
  let w, h, shavings;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = Math.min(18, Math.floor(window.innerWidth / 90));

  function makeShaving(initial) {
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h : -30,
      size: Math.random() * 10 + 6,          // radio de la espiral
      turns: Math.random() * 1.5 + 1.5,      // vueltas de la viruta
      speedY: Math.random() * 0.4 + 0.18,    // caída lenta
      sway: Math.random() * 1.2 + 0.6,       // balanceo lateral
      swayPhase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
      alpha: Math.random() * 0.22 + 0.1,
      warm: Math.random() > 0.4
    };
  }
  shavings = Array.from({ length: COUNT }, () => makeShaving(true));

  // dibuja una viruta: espiral que se abre (como cepillado de madera)
  function drawShaving(s) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.beginPath();
    const steps = 40;
    const maxAngle = s.turns * Math.PI * 2;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * maxAngle;
      const r = (i / steps) * s.size;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r * 0.75; // espiral levemente achatada
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = s.warm
      ? `rgba(201, 142, 90, ${s.alpha})`
      : `rgba(224, 172, 120, ${s.alpha * 0.8})`;
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    t += 0.01;
    for (let i = 0; i < shavings.length; i++) {
      const s = shavings[i];
      s.y += s.speedY;
      s.x += Math.sin(t * s.sway + s.swayPhase) * 0.5; // vaivén como hoja cayendo
      s.rot += s.rotSpeed;

      if (s.y > h + 40) {
        shavings[i] = makeShaving(false);
        continue;
      }
      drawShaving(s);
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
