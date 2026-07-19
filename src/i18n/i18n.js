/* ═══════════════════════════════════
   i18n Module — V8.5
   多语言支持：zh-CN / ja-JP / en-US
   ═══════════════════════════════════ */

const I18n = {
  current: 'zh-CN',
  locales: ['zh-CN', 'ja-JP', 'en-US'],
  translations: {},
  fallback: 'zh-CN',

  async init(lang) {
    if (lang) this.current = lang;
    try {
      const res = await fetch(`../../src/i18n/${this.current}.json`);
      this.translations = await res.json();
    } catch(e) {
      // fallback: use zh-CN
      if (this.current !== this.fallback) {
        this.current = this.fallback;
        return this.init();
      }
    }
    this.applyToDOM();
    document.documentElement.lang = this.current;
    document.documentElement.setAttribute('data-current-lang', this.current.split('-')[0]);
    return this;
  },

  t(key) {
    return key.split('.').reduce((o, k) => o?.[k], this.translations) || key;
  },

  setLang(lang) {
    if (lang === this.current) return;
    this.current = lang;
    localStorage.setItem('preferred_lang', lang);
    return this.init(lang);
  },

  applyToDOM() {
    // Match existing data-lang attribute system
    const short = this.current.split('-')[0]; // zh, ja, en
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === short ? '' : 'none';
    });
  }
};

// Auto-init from localStorage or browser
const saved = localStorage.getItem('preferred_lang');
const browser = navigator.language?.startsWith('ja') ? 'ja-JP' :
                navigator.language?.startsWith('zh') ? 'zh-CN' : 'en-US';
I18n.init(saved || browser);
