/* ═══════════════════════════════════
   Social Sharing — V8.6
   OG/Twitter meta generator + share tracking
   ═══════════════════════════════════ */

const SocialMeta = {
  defaults: {
    siteName: 'Stellan Huan Photography',
    twitterHandle: '@stellanhuan',
    locale: 'zh_CN',
    image: 'https://stellanhuan.github.io/images/web_001.jpeg',
    imageWidth: 1200,
    imageHeight: 630
  },

  /* ── Generate & Inject Meta Tags ── */
  inject(page) {
    const config = { ...this.defaults, ...page };
    const tags = [
      { property: 'og:type', content: config.type || 'website' },
      { property: 'og:site_name', content: config.siteName },
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:image', content: config.image },
      { property: 'og:image:width', content: config.imageWidth },
      { property: 'og:image:height', content: config.imageHeight },
      { property: 'og:locale', content: config.locale },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image },
    ];

    // Remove existing OG tags
    document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach(el => el.remove());

    // Inject new tags
    tags.forEach(t => {
      const meta = document.createElement('meta');
      if (t.property) meta.setAttribute('property', t.property);
      if (t.name) meta.setAttribute('name', t.name);
      meta.setAttribute('content', String(t.content));
      document.head.appendChild(meta);
    });
  },

  /* ── Share Button Tracking ── */
  trackShare(platform, page) {
    Analytics?.track('share_click', { platform, page });
  },

  /* ── Social Referral Detection ── */
  detectReferral() {
    const ref = document.referrer;
    const platforms = [
      { name: 'instagram', pattern: 'instagram.com' },
      { name: 'xiaohongshu', pattern: 'xiaohongshu.com' },
      { name: 'twitter', pattern: /twitter\.com|x\.com/ },
      { name: 'wechat', pattern: 'mp.weixin.qq.com' },
      { name: 'google', pattern: 'google.com' },
    ];
    const match = platforms.find(p => ref.match(p.pattern));
    if (match) {
      Analytics?.track('social_referral', { platform: match.name, referrer: ref });
    }
    return match?.name || null;
  }
};

// Auto-detect referrals on load
SocialMeta.detectReferral();

/* ── Page configs ── */
SocialMeta.pages = {
  home: {
    title: '瓛瓛 HuanHuan — Photography',
    description: 'Nikon Z8 · 郑州与东京之间的光',
    image: 'https://stellanhuan.github.io/images/web_001.jpeg'
  },
  series: (name) => ({
    title: `${name} — 瓛瓛 HuanHuan`,
    description: `Photography series: ${name}`,
    type: 'article'
  }),
  projects: (name) => ({
    title: `${name} — 瓛瓛 HuanHuan`,
    description: `Photography project: ${name}`,
    type: 'article'
  }),
  journal: (title) => ({
    title: `${title} — 瓛瓛 HuanHuan`,
    description: `Journal entry: ${title}`,
    type: 'article'
  })
};
