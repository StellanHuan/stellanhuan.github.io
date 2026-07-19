/* ═══════════════════════════════════
   Projects Page JS — V4.3
   从 projects.json 读取，渲染项目卡片
   ═══════════════════════════════════ */

(async function () {
  const el = document.getElementById('projectsList');

  // Load projects data
  let projects = [];
  try {
    const res = await fetch('../../src/data/projects.json');
    projects = await res.json();
  } catch {
    // Fallback: try inline JSON
    const inline = document.getElementById('projectsData');
    if (inline) projects = JSON.parse(inline.textContent);
  }

  // ── Empty State ──
  if (!projects || !projects.length) {
    el.innerHTML = `
      <div class="projects-empty">
        <p>暂无项目</p>
        <p class="highlight" style="margin-top:var(--space-4);font-size:var(--text-small)">
          在 Admin V2 → Projects 中创建你的第一个项目
        </p>
      </div>`;
    return;
  }

  // ── Render Projects ──
  let html = '';
  projects.forEach((proj, i) => {
    const cover = proj.cover ? `../../images/${proj.cover}` : '';
    const photos = proj.photos || [];
    const meta = [];
    if (proj.location) meta.push({ k: '地点', v: proj.location });
    if (proj.date) meta.push({ k: '日期', v: proj.date });
    if (proj.client) meta.push({ k: '客户', v: proj.client });
    if (proj.exif) meta.push({ k: '设备', v: proj.exif });

    const galleryId = `proj-gallery-${i}`;

    html += `
    <article class="project-card reveal" style="transition-delay:${i * .15}s">
      ${cover ? `<img class="project-hero-img" src="${cover}" alt="${proj.name}" loading="lazy">` : ''}
      <div class="project-body">
        <h2>${proj.name || '未命名项目'}</h2>
        ${proj.description ? `<p class="proj-desc">${proj.description}</p>` : ''}
        ${meta.length ? `<div class="project-meta">${meta.map(m => `<div class="project-meta-item"><span class="k">${m.k}</span><span class="v">${m.v}</span></div>`).join('')}</div>` : ''}
        ${proj.notes ? `<div class="project-notes">${proj.notes}</div>` : ''}
        ${photos.length ? `<div class="project-gallery-title">作品 · ${photos.length} 张</div><div class="gallery" id="${galleryId}"></div>` : ''}
      </div>
    </article>`;
  });

  el.innerHTML = html;

  // ── Render Galleries ──
  projects.forEach((proj, i) => {
    if (!proj.photos || !proj.photos.length) return;
    const container = document.getElementById(`proj-gallery-${i}`);
    if (!container) return;
    renderGallery({
      name: { zh: proj.name },
      photos: proj.photos
    }, {
      containerId: `proj-gallery-${i}`,
      maxItems: proj.photos.length,
      onPhotoClick: (idx) => {
        Lightbox.open(proj.photos.map(f => `images/${f}`), idx);
      }
    });
  });

  // ── Reveal ──
  const obs = new IntersectionObserver(e => {
    e.forEach(ee => { if (ee.isIntersecting) { ee.target.classList.add('visible'); obs.unobserve(ee.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

})();
