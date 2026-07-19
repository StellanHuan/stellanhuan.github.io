/* ═══════════════════════════════════
   Lightbox Component — V4.1
   Full API: open / close / next / prev + keyboard + gesture
   ═══════════════════════════════════ */

const Lightbox = (function () {
  let photos = [];
  let currentIndex = 0;
  let el, img, title, meta, counter;
  let touchStartX = 0, touchEndX = 0;

  function init() {
    el = document.getElementById('lightbox');
    img = document.getElementById('lbImage');
    title = document.getElementById('lbTitle');
    meta = document.getElementById('lbMetaGrid');
    counter = document.getElementById('lbCounter');
    if (!el) return;

    // ── Close handlers ──
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.classList.contains('lb-close')) close();
    });

    // ── Nav buttons ──
    document.querySelector('.lb-prev')?.addEventListener('click', (e) => {
      e.stopPropagation(); prev();
    });
    document.querySelector('.lb-next')?.addEventListener('click', (e) => {
      e.stopPropagation(); next();
    });

    // ── Keyboard ──
    document.addEventListener('keydown', (e) => {
      if (!el.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    // ── Touch gestures ──
    el.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    el.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
    }, { passive: true });
  }

  /* ── API ── */

  function open(photoList, index = 0) {
    photos = Array.isArray(photoList) ? photoList : [photoList];
    currentIndex = Math.max(0, Math.min(index, photos.length - 1));
    update();
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function next() {
    if (!photos.length) return;
    currentIndex = (currentIndex + 1) % photos.length;
    update();
  }

  function prev() {
    if (!photos.length) return;
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    update();
  }

  /* ── Internal ── */

  function update() {
    const photo = resolvePhoto(photos[currentIndex]);
    img.src = photo.file || photo;
    img.alt = photo.title || photo.alt || '';
    title.textContent = photo.title || '';

    // Metadata
    const items = [];
    if (photo.camera)  items.push({ key: '相机', val: photo.camera });
    if (photo.lens)    items.push({ key: '镜头', val: photo.lens });
    if (photo.location) items.push({ key: '地点', val: photo.location });
    if (photo.date)    items.push({ key: '日期', val: photo.date });
    if (photo.iso)     items.push({ key: 'ISO', val: photo.iso });
    if (photo.aperture) items.push({ key: '光圈', val: photo.aperture });
    if (photo.shutter) items.push({ key: '快门', val: photo.shutter });

    meta.innerHTML = items.map(i =>
      `<div class="lb-meta-item"><span class="key">${i.key}</span><span class="val">${i.val}</span></div>`
    ).join('');

    counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  function resolvePhoto(photo) {
    // Handle both string paths and full photo objects
    if (typeof photo === 'string') {
      const base = photo.replace(/^.*\/|\.\w+$/g, '');
      return {
        file: `images/${photo}`,
        title: base
      };
    }
    return photo;
  }

  init();

  return { open, close, next, prev };
})();
