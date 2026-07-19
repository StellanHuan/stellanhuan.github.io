/* ═══════════════════════════════════
   Image Component — V3.2.2
   Unified <picture> generator with AVIF/WebP/JPEG
   ═══════════════════════════════════ */

/**
 * Render a responsive <picture> element for a photo.
 *
 * @param {Object} photo — from photo schema { file, title, alt?, width?, height? }
 * @param {Object} [opts]
 * @param {'lazy'|'eager'} [opts.loading='lazy'] — native lazy loading
 * @param {string} [opts.sizes] — responsive sizes attribute
 * @param {number} [opts.width=1600] — fallback width
 * @param {number} [opts.height=1067] — fallback height
 * @param {string} [opts.className] — additional CSS class
 * @returns {string} HTML string
 *
 * @example
 *   renderImage({ file: 'images/web_001.jpeg', title: '光的粒子' })
 *   // <picture><source srcset="assets/images/avif/web_001.avif" type="image/avif">...
 */
function renderImage(photo, opts = {}) {
  const {
    loading = 'lazy',
    sizes = '',
    width = 1600,
    height = 1067,
    className = ''
  } = opts;

  // Extract base filename: "images/web_001.jpeg" → "web_001"
  const file = photo.file || photo;
  const base = file.replace(/^.*\/|\.\w+$/g, '');
  const alt = photo.alt || photo.title || '';

  // Paths
  const jpegSrc = file;                                          // images/web_001.jpeg
  const webpSrc = `assets/images/webp/${base}.webp`;            // assets/images/webp/web_001.webp
  const avifSrc = `assets/images/avif/${base}.avif`;            // assets/images/avif/web_001.avif
  const thumbSrc = `assets/images/thumb/${base}.webp`;          // assets/images/thumb/web_001.webp

  const classAttr = className ? ` class="${className}"` : '';
  const sizesAttr = sizes ? ` sizes="${sizes}"` : '';
  const srcsetThumb = loading === 'lazy'
    ? ` srcset="${thumbSrc} 400w"`
    : '';

  return `<picture${classAttr}>
  <source srcset="${avifSrc}" type="image/avif">
  <source srcset="${webpSrc}" type="image/webp">
  <img
    src="${jpegSrc}"
    alt="${alt}"
    loading="${loading}"
    width="${width}"
    height="${height}"
    ${sizes ? `sizes="${sizes}"` : ''}
    decoding="${loading === 'lazy' ? 'async' : 'sync'}"
  >
</picture>`;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderImage };
}
