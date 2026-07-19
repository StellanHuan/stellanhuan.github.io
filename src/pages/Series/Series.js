/* ═══════════════════════════════════
   Series Page — V3.3
   读取 series.js → renderGallery()
   无硬编码 offset / 无硬编码照片路径
   ═══════════════════════════════════ */

(function () {
  // ── Parse series from URL hash ──
  const seriesId = (window.location.hash || '#portrait').replace('#', '');
  const series = SERIES_DATA?.[seriesId] || SERIES_DATA?.portrait;

  if (!series) {
    document.getElementById('gallery').innerHTML =
      '<div class="gallery-empty">系列未找到</div>';
    return;
  }

  // ── Render metadata ──
  const meta = {
    portrait:  { tag: 'PORTRAIT',              zh: '肖像',       en: 'Portrait' },
    street:    { tag: 'STREET',                zh: '街头的呼吸',  en: 'Street' },
    landscape: { tag: 'LANDSCAPE & AERIAL',    zh: '大地与天空',  en: 'Landscape & Aerial' },
    aerial:    { tag: 'AERIAL',                zh: '俯瞰',       en: 'Aerial' }
  };

  const m = meta[seriesId] || meta.portrait;
  document.getElementById('seriesTag').textContent = m.tag;
  document.getElementById('seriesTitle').textContent = m.zh + ' / ' + m.en;
  document.getElementById('seriesDesc').textContent =
    series.description?.zh || '';

  // ── Render gallery ──
  renderGallery(series, {
    containerId: 'gallery',
    maxItems: 24
  });
})();
