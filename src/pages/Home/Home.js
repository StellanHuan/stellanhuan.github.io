/* ═══════════════════════════════════
   Homepage JS — V4.2
   从 data.js + series.js 渲染所有区块
   ═══════════════════════════════════ */

(function () {
  const D = window.SITE_DATA;
  const photos = D?.photos || [];
  const sections = D?.sections || {};

  // Helper: get photo by filename
  function p(file) {
    return photos.find(pp => pp.file.split('/').pop() === file);
  }

  // Helper: get image src from section
  function src(key, i = 0) {
    const arr = sections[key];
    if (!arr || !arr[i]) return photos[i]?.file || '';
    return `images/${arr[i]}`;
  }

  // ═══ HERO ═══
  (function renderHero() {
    const hero = document.getElementById('hero');
    hero.innerHTML = `
      <img class="hero-img parallax" src="${src('hero')}" alt="" data-speed=".25">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>瓛 瓛</h1>
        <p class="sub" data-lang="ja">フォトグラフィー</p>
        <p class="sub" data-lang="zh">Stellan</p>
        <p class="sub" data-lang="en">Stellan</p>
        <div class="rule"></div>
        <div class="desc" data-lang="zh">按下快门的那一秒，世界安静下来<br>郑州与东京之间，光替我说话</div>
        <div class="desc" data-lang="ja">シャッターを切る一秒、世界が静まる<br>鄭州と東京のあいだで、光が代わりに語る</div>
        <div class="desc" data-lang="en">The world goes quiet at the shutter's click<br>Between Zhengzhou and Tokyo, the light speaks for me</div>
      </div>`;
    setTimeout(() => hero.classList.add('loaded'), 300);
  })();

  // ═══ QUOTE ═══
  (function renderQuote() {
    const q = document.getElementById('quote');
    q.innerHTML = `
      <div class="big reveal">
        <span data-lang="zh">拍照走路时<br><span class="hl">不看地图。</span><br>本来就没有目的地<br>看了也没用。</span>
        <span data-lang="ja">写真を撮りながら街を歩く時は<br><span class="hl">地図を見ない。</span><br>そもそも目的地などないわけなので<br>地図を見たところで仕方がない。</span>
        <span data-lang="en">When walking the streets with a camera,<br><span class="hl">I never look at a map.</span><br>Since I have no destination,<br>there's no point.</span>
      </div>
      <p class="ref reveal" style="transition-delay:.2s">— Arimoto Shinya · 有元慎也</p>`;
  })();

  // ═══ FULL IMAGE ═══
  (function renderFullImage() {
    const el = document.getElementById('fullImage');
    el.innerHTML = `
      <div class="full-img-inner"><img src="${src('featured', 0)}" alt=""></div>
      <div class="vignette"></div>
      <div class="cap">Nikon Z8 · 2026</div>`;
    el.classList.add('parallax');
    el.dataset.speed = '.08';
    new IntersectionObserver(e => {
      if (e[0].isIntersecting) el.classList.add('zoomed');
    }, { threshold: .3 }).observe(el);
  })();

  // ═══ 01 FEATURED DUO ═══
  (function renderFeaturedDuo() {
    const duo = document.getElementById('featuredDuo');
    duo.innerHTML = `
      <div class="duo-item reveal">
        <img src="${src('featured', 0)}" alt="">
        <div class="duo-label">PORTRAIT</div>
        <div class="duo-overlay"><span class="duo-title">肖像</span><span class="duo-meta">Nikon Z8 · 2026</span></div>
      </div>
      <div class="duo-item reveal" style="transition-delay:.1s">
        <img src="${src('featured', 1)}" alt="">
        <div class="duo-label">STREET</div>
        <div class="duo-overlay"><span class="duo-title">街头</span><span class="duo-meta">Nikon Z8 · 2026</span></div>
      </div>`;
  })();

  // ═══ 02 HSCROLL ═══
  (function renderHScroll() {
    const track = document.getElementById('hscrollTrack');
    const dots = document.getElementById('hscrollDots');
    const files = sections.hscroll || [];
    track.innerHTML = files.map((f, i) => `
      <div class="hscroll-card">
        <img src="images/${f}" alt="Street ${i + 1}" loading="lazy" width="1600" height="900">
        <div class="info"><span class="t">街头 ${i + 1}</span><span class="m">Nikon Z8</span></div>
      </div>`).join('');
    dots.innerHTML = files.map(() => '<div class="hscroll-dot"></div>').join('');
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / (track.scrollWidth / files.length));
      dots.querySelectorAll('.hscroll-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    });
  })();

  // ═══ 03 LANDSCAPE DUO ═══
  (function renderLandscapeDuo() {
    const duo = document.getElementById('landscapeDuo');
    duo.innerHTML = `
      <div class="duo-item reveal">
        <img src="${src('landscape', 0)}" alt="">
        <div class="duo-label">LANDSCAPE</div>
        <div class="duo-overlay"><span class="duo-title">风光</span><span class="duo-meta">Nikon Z8 · 2026</span></div>
      </div>
      <div class="duo-item reveal" style="transition-delay:.1s">
        <img src="${src('aerial', 0)}" alt="">
        <div class="duo-label">AERIAL</div>
        <div class="duo-overlay"><span class="duo-title">俯瞰</span><span class="duo-meta">DJI · 2026</span></div>
      </div>`;
  })();

  // ═══ 04 BOOKING ═══
  (function renderBooking() {
    const cards = document.getElementById('bookingCards');
    cards.innerHTML = `
      <a href="series/#portrait" class="bk-card bk-card--featured reveal">
        <div class="bk-photo"><img src="${src('booking_portrait')}" alt=""><div class="bk-photo-overlay"></div><div class="bk-badge">MOST POPULAR</div></div>
        <div class="bk-info"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.8rem"><span class="bk-label">PORTRAIT</span><span class="bk-price">¥398</span></div>
        <div class="bk-desc" data-lang="zh">个人写真 · 情侣 · 闺蜜 · 含精修 · Nikon Z8</div>
        <div class="bk-desc" data-lang="ja">個人 · カップル · レタッチ込み · Nikon Z8</div>
        <div class="bk-desc" data-lang="en">Solo · Couple · Friends · Retouched · Nikon Z8</div></div>
      </a>
      <a href="series/#street" class="bk-card reveal" style="transition-delay:.1s">
        <div class="bk-photo"><img src="${src('booking_event')}" alt=""><div class="bk-photo-overlay"></div></div>
        <div class="bk-info"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.8rem"><span class="bk-label">EVENT</span><span class="bk-price">¥1500</span></div>
        <div class="bk-desc" data-lang="zh">活动跟拍 · 半天4小时 · 年会 · 开业</div>
        <div class="bk-desc" data-lang="ja">イベント · 半日 · 年会 · 開業式</div>
        <div class="bk-desc" data-lang="en">Event · Half Day · Conference · Ceremony</div></div>
      </a>
      <a href="series/#aerial" class="bk-card reveal" style="transition-delay:.2s">
        <div class="bk-photo"><img src="${src('booking_aerial')}" alt=""><div class="bk-photo-overlay"></div></div>
        <div class="bk-info"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.8rem"><span class="bk-label">AERIAL</span><span class="bk-price">+¥500</span></div>
        <div class="bk-desc" data-lang="zh">航拍加购 · DJI 4K · 城市全景</div>
        <div class="bk-desc" data-lang="ja">空撮オプション · DJI 4K · 都市</div>
        <div class="bk-desc" data-lang="en">Aerial Add-on · DJI 4K · City Panorama</div></div>
      </a>`;
    document.getElementById('bookingProcess').innerHTML = [
      { zh: '微信联系', ja: 'WeChat', en: 'Contact' },
      { zh: '沟通需求', ja: '打ち合わせ', en: 'Discuss' },
      { zh: '拍摄交付', ja: '撮影 · 納品', en: 'Shoot & Deliver' }
    ].map((s, i) => `
      <div class="process-step reveal" style="transition-delay:${i * .15}s">
        <div class="circle">${i + 1}</div>
        <div class="label" data-lang="zh">${s.zh}</div>
        <div class="label" data-lang="ja">${s.ja}</div>
        <div class="label" data-lang="en">${s.en}</div>
      </div>
      ${i < 2 ? '<div class="process-arrow">→</div>' : ''}
    `).join('');
  })();

  // ═══ 05 ABOUT ═══
  (function renderAbout() {
    const el = document.getElementById('about');
    el.innerHTML = `
      <div class="about-visual reveal"><img src="${src('about')}" alt="" id="aboutImg"></div>
      <div class="about-text">
        <span class="about-num">05</span>
        <h3 data-lang="zh">关于</h3><h3 data-lang="ja">について</h3><h3 data-lang="en">About</h3>
        <div class="about-lead" data-lang="zh">相机不是工具，是另一双眼睛。<br>街上的人、低头的瞬间、被忽略的角落——<br>都在取景框里重新活过来。</div>
        <div class="about-lead" data-lang="ja">カメラは道具じゃなく、もう一つの目。<br>街の人、うつむく瞬間、見過ごされた隅——<br>すべてがファインダーのなかで息を吹き返す。</div>
        <div class="about-lead" data-lang="en">A camera isn't a tool. It's another pair of eyes.<br>Strangers on the street, a downward glance, the overlooked corner—<br>all come alive again inside the frame.</div>
        <div class="timeline">
          <div class="timeline-item reveal"><span class="year">1999</span><span class="event" data-lang="zh">生于河南临颍</span><span class="event" data-lang="ja">河南省臨潁県に生まれる</span><span class="event" data-lang="en">Born in Linying, Henan</span></div>
          <div class="timeline-item reveal" style="transition-delay:.1s"><span class="year">2022</span><span class="event" data-lang="zh">赴日，东京TVA</span><span class="event" data-lang="ja">来日、東京TVA</span><span class="event" data-lang="en">Tokyo TVA, Japan</span></div>
          <div class="timeline-item reveal" style="transition-delay:.2s"><span class="year">2025</span><span class="event" data-lang="zh">归国，自由摄影师</span><span class="event" data-lang="ja">帰国、フリーランス</span><span class="event" data-lang="en">Freelance photographer</span></div>
          <div class="timeline-item reveal" style="transition-delay:.3s"><span class="year">Now</span><span class="event" data-lang="zh">郑州 · 漯河</span><span class="event" data-lang="ja">鄭州 · 漯河</span><span class="event" data-lang="en">Zhengzhou · Luohe</span></div>
        </div>
        <div class="pills"><span>Nikon Z8</span><span>DJI</span><span>RICOH GXR</span><span>郑州</span><span>东京</span><span>漯河</span><span>Portrait</span><span>Street</span><span>Aerial</span></div>
      </div>`;
  })();

  // ═══ LANGUAGE ═══
  function setLang(lang) {
    document.documentElement.setAttribute('data-current-lang', lang);
    const names = { zh: '中文', ja: '日本語', en: 'English' };
    const lc = document.getElementById('langCurrent');
    if (lc) lc.childNodes[0].textContent = names[lang];
    document.querySelectorAll('.lang-dropdown button').forEach(b => b.classList.toggle('active', b.dataset.langSwitch === lang));
  }
  document.getElementById('langCurrent')?.addEventListener('click', e => { e.stopPropagation(); document.getElementById('langCurrent').classList.toggle('open'); document.getElementById('langDropdown').classList.toggle('open'); });
  document.addEventListener('click', () => { document.getElementById('langCurrent')?.classList.remove('open'); document.getElementById('langDropdown')?.classList.remove('open'); });
  document.querySelectorAll('.lang-dropdown button').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.langSwitch); document.getElementById('langCurrent')?.classList.remove('open'); document.getElementById('langDropdown')?.classList.remove('open'); }));
  setLang('zh');

  // ═══ SCROLL REVEAL ═══
  new IntersectionObserver(e => e.forEach(ee => { if (ee.isIntersecting) ee.target.classList.add('visible'); }), { threshold: .12, rootMargin: '0px 0px -20px 0px' }).observe(document.querySelector('.macro-type .big'));
  document.querySelectorAll('.reveal').forEach(el => new IntersectionObserver(e => e.forEach(ee => { if (ee.isIntersecting) ee.target.classList.add('visible'); }), { threshold: .12 }).observe(el));

  // ═══ NAV + PROGRESS ═══
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.getElementById('nav').classList.toggle('hidden', y > last && y > 400);
    last = y;
  }, { passive: true });

  // ═══ ABOUT PHOTO CYCLE ═══
  let aboutIdx = 0;
  setInterval(() => { aboutIdx = (aboutIdx + 1) % photos.length; const img = document.getElementById('aboutImg'); if (img) img.src = photos[aboutIdx].file; }, 6000);

  // ═══ COPY WECHAT ═══
  document.getElementById('copyWechat')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('S0688888860'); document.getElementById('copyWechat').textContent = '✓ 已复制'; }
    catch { document.getElementById('copyWechat').textContent = '微信: S0688888860'; }
    setTimeout(() => { document.getElementById('copyWechat').innerHTML = '<span data-lang="zh">复制微信号</span><span data-lang="ja">WeChatをコピー</span><span data-lang="en">Copy WeChat</span>'; }, 1500);
  });

  // ═══ SMOOTH SCROLL ═══
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }); }));

  // ═══ IMAGE FADE ═══
  document.querySelectorAll('img').forEach(img => { img.style.transition = 'opacity .6s var(--ease-out)'; img.style.opacity = '0'; img.addEventListener('load', function () { this.style.opacity = '1'; }); if (img.complete) img.style.opacity = '1'; });
})();
