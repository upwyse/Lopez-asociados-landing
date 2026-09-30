/* v2: resalta en el menú la sección que se está viendo */
document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('#nav a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    const el = id === 'top' ? document.querySelector('.hero') : document.getElementById(id);
    if (el) map.set(el, a);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove('on'));
      map.get(en.target).classList.add('on');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  map.forEach((_, el) => io.observe(el));
});
