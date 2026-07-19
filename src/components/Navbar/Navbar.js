/* ═══════════════════════════════════
   Navbar Component — V3.2
   Language switch + Scroll hide + Smooth scroll
   ═══════════════════════════════════ */

function initNavbar() {

  // ── Language Switch ──
  function setLang(lang) {
    document.documentElement.setAttribute('data-current-lang', lang);
    const names = { zh: '中文', ja: '日本語', en: 'English' };
    const langCurrent = document.getElementById('langCurrent');
    if (langCurrent) langCurrent.childNodes[0].textContent = names[lang];
    document.querySelectorAll('.lang-dropdown button').forEach(b =>
      b.classList.toggle('active', b.dataset.langSwitch === lang)
    );
  }

  const langCurrent = document.getElementById('langCurrent');
  const langDropdown = document.getElementById('langDropdown');

  if (langCurrent) {
    langCurrent.addEventListener('click', (e) => {
      e.stopPropagation();
      langCurrent.classList.toggle('open');
      if (langDropdown) langDropdown.classList.toggle('open');
    });
  }

  document.addEventListener('click', () => {
    if (langCurrent) langCurrent.classList.remove('open');
    if (langDropdown) langDropdown.classList.remove('open');
  });

  document.querySelectorAll('.lang-dropdown button').forEach(b => {
    b.addEventListener('click', () => {
      setLang(b.dataset.langSwitch);
      if (langCurrent) langCurrent.classList.remove('open');
      if (langDropdown) langDropdown.classList.remove('open');
    });
  });

  setLang('zh');

  // ── Smooth Scroll ──
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Scroll Hide ──
  let lastScroll = 0;
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('hidden', y > lastScroll && y > 400);
    lastScroll = y;
  }, { passive: true });
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
