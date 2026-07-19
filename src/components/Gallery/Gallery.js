/* ═══════════════════════════════════
   Gallery Component — V3.2.3
   Depends on: Image.js (renderImage), Gallery.css, tokens.css
   ═══════════════════════════════════ */

/**
 * Render a photo gallery from series data.
 *
 * @param {Object} series — series schema object { id, name, photos[], cover }
 * @param {Object} [opts]
 * @param {string} [opts.containerId='gallery'] — target DOM element ID
 * @param {Function} [opts.onPhotoClick] — click callback (receives photo index)
 * @param {number} [opts.maxItems=24] — maximum items to render
 * @returns {HTMLElement} the gallery container element
 *
 * @example
 *   renderGallery(SERIES_DATA.portrait, { onPhotoClick: (i) => openLightbox(i) });
 */
function renderGallery(series, opts = {}) {
  const {
    containerId = 'gallery',
    onPhotoClick = null,
    maxItems = 24
  } = opts;

  const container = document.getElementById(containerId);
  if (!container || !series) return container;

  const photos = series.photos || [];
  if (!photos.length) {
    container.innerHTML = `<div class="gallery-empty">暂无照片</div>`;
    return container;
  }

  const count = Math.min(photos.length, maxItems);
  let html = '';

  for (let i = 0; i < count; i++) {
    const filename = photos[i];
    // Build a minimal photo object for renderImage()
    const photo = {
      file: `images/${filename}`,
      title: `${series.name?.zh || ''} · ${i + 1}`,
      alt: `${series.name?.zh || 'Photo'} ${i + 1}`
    };

    // Determine aspect ratio class
    let ratioClass = '';
    if (i % 5 === 0) ratioClass = ' gallery-item--portrait';
    if (i % 7 === 2) ratioClass = ' gallery-item--pano';

    const clickAttr = onPhotoClick
      ? ` onclick="arguments[0].stopPropagation();(${onPhotoClick.toString()})(${i})"`
      : '';

    html += `<div class="gallery-item${ratioClass}" style="transition-delay:${i * 0.06}s"${clickAttr}>
  ${renderImage(photo, { loading: 'lazy' })}
  <div class="gallery-overlay">
    <span class="title">${series.name?.zh || ''} · ${i + 1}</span>
    <span class="meta">Nikon Z8 · 2026</span>
  </div>
</div>`;
  }

  container.innerHTML = html;

  // Staggered reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  container.querySelectorAll('.gallery-item').forEach(el => revealObs.observe(el));

  return container;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderGallery };
}
