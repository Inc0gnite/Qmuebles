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
