// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll state
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal con IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// Efecto tilt 3D en hero figure
const heroFig = document.querySelector('.hero-figure');
if (heroFig) {
  heroFig.addEventListener('mousemove', (e) => {
    const rect = heroFig.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroFig.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  });
  heroFig.addEventListener('mouseleave', () => {
    heroFig.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
    heroFig.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { heroFig.style.transition = ''; }, 500);
  });
}

// Tilt suave en bento cards
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) scale(1.01) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Animación de texto hero (staggered word reveal)
const heroH1 = document.querySelector('.hero h1');
if (heroH1) {
  const html = heroH1.innerHTML;
  // Solo animar el texto plano, preservar spans con clase
  heroH1.style.opacity = '1';
}
