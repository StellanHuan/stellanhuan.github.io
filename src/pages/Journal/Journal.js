/* ═══════════════════════════════════
   Journal Page JS — V4.4
   列表 / 详情双视图，hash 路由
   ═══════════════════════════════════ */

(async function () {
  const el = document.getElementById('journalContent');

  // Load journal data
  let articles = [];
  try {
    const res = await fetch('../../src/data/journal.json');
    articles = (await res.json()).filter(a => !a.draft);
  } catch {
    const inline = document.getElementById('journalData');
    if (inline) articles = JSON.parse(inline.textContent).filter(a => !a.draft);
  }

  // ── Hash routing ──
  const hash = window.location.hash.replace('#', '');

  if (hash && articles.length) {
    renderDetail(hash);
  } else {
    renderList();
  }

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    h ? renderDetail(h) : renderList();
  });

  // ═══ Article List ═══
  function renderList() {
    if (!articles.length) {
      el.innerHTML = `<div class="journal-empty"><p>暂无文章</p><p style="font-size:var(--text-small);margin-top:var(--space-4)">在 Admin V2 → Journal 中创建</p></div>`;
      return;
    }

    el.innerHTML = `<div class="article-list">${articles.map((a, i) => `
      <article class="article-card" onclick="location.hash='${a.slug || 'article-' + i}'" style="animation:fadeUp .5s var(--ease-out) ${i * .1}s both">
        ${a.cover ? `<div class="article-cover"><img src="../../images/${a.cover}" alt="${a.title}" loading="lazy"></div>` : ''}
        <div class="article-info">
          <h2>${a.title}</h2>
          <div class="meta">${a.date || ''}${a.location ? ' · ' + a.location : ''}</div>
          ${a.excerpt ? `<div class="excerpt">${a.excerpt}</div>` : ''}
          ${a.tags ? `<div class="article-tags">${a.tags.map(t => `<span class="article-tag">${t}</span>`).join('')}</div>` : ''}
        </div>
      </article>`).join('')}</div>
    `;
  }

  // ═══ Article Detail ═══
  function renderDetail(slug) {
    const idx = articles.findIndex(a => (a.slug || 'article-' + articles.indexOf(a)) === slug);
    if (idx === -1) { renderList(); return; }
    const a = articles[idx];

    el.innerHTML = `
      <div class="article-detail">
        <span class="back-link" onclick="location.hash=''">← 返回列表</span>
        ${a.cover ? `<img class="article-hero-img" src="../../images/${a.cover}" alt="${a.title}">` : ''}
        <h2>${a.title}</h2>
        <div class="detail-meta">${a.date || ''}${a.location ? ' · ' + a.location : ''}${a.tags ? ' · ' + a.tags.join(' ') : ''}</div>
        <div class="article-body">${(a.body || '').split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')}</div>
        ${a.photos && a.photos.length ? `<div class="section article-gallery" id="articleGallery-${idx}"></div>` : ''}
      </div>`;

    // Render gallery if photos exist
    if (a.photos && a.photos.length) {
      setTimeout(() => {
        renderGallery({
          name: { zh: a.title },
          photos: a.photos
        }, {
          containerId: `articleGallery-${idx}`,
          maxItems: a.photos.length
        });
      }, 100);
    }
  }
})();
