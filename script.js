/* ============================================================
   Rincón del Pacífico — Main JavaScript
   ============================================================ */

/* --- Sticky header shadow on scroll --- */
(function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* --- Scroll reveal --- */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => io.observe(el));
})();

/* --- FAQ accordion --- */
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
})();

/* --- Smooth scroll for anchor links --- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* --- WhatsApp link builder ---
   Adds UTM / tracking-friendly message to the WhatsApp URL.
   Usage: data-wa-msg attribute on any <a> with class .wa-link
   ----------------------------------------------------------- */
(function initWaLinks() {
  const PHONE = '529545820101'; // WhatsApp number without + or spaces

  document.querySelectorAll('a.wa-link').forEach(link => {
    const msg = link.dataset.waMsg || 'Hola, me gustaría consultar disponibilidad.';
    link.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });
})();
