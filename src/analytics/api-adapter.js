/* ═══════════════════════════════════
   Analytics API Adapter — V7.4
   升级 localStorage → 支持远程 API
   ═══════════════════════════════════ */

const AnalyticsAPIAdapter = {
  name: 'api',

  // 配置：改为你的真实 API endpoint
  config: {
    endpoint: null,  // 'https://api.example.com/analytics'
    batchSize: 10,
    flushInterval: 30000, // 30秒批量发送
    retryOnFail: true
  },

  // 待发送队列
  _queue: [],
  _timer: null,

  init() {
    if (!this.config.endpoint) return;
    this._timer = setInterval(() => this.flush(), this.config.flushInterval);
    // 页面关闭时发送
    window.addEventListener('beforeunload', () => this.flush(true));
  },

  async send(event, data) {
    // 始终存 localStorage 作为 fallback
    this._saveLocal(event, data);

    // 如果配置了 API endpoint，加入发送队列
    if (this.config.endpoint) {
      this._queue.push({ event, data, timestamp: Date.now() });
      if (this._queue.length >= this.config.batchSize) this.flush();
    }
  },

  async flush(immediate = false) {
    if (!this._queue.length || !this.config.endpoint) return;
    const batch = [...this._queue];
    this._queue = [];

    try {
      const res = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: batch, source: 'stellan-photography' })
      });
      if (!res.ok) throw new Error('API error');
    } catch (e) {
      // 失败时放回队列或存 localStorage
      if (this.config.retryOnFail) {
        this._queue.unshift(...batch);
      } else {
        batch.forEach(b => this._saveLocal(b.event, b.data));
      }
    }
  },

  /* ── localStorage fallback ── */
  _saveLocal(event, data) {
    try {
      const key = 'analytics_' + new Date().toISOString().split('T')[0];
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ event, data, time: Date.now() });
      if (existing.length > 1000) existing.splice(0, existing.length - 1000);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch(e) {}
  },

  /* ── Data Export ── */
  exportData(days = 30) {
    const all = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = 'analytics_' + d.toISOString().split('T')[0];
      try { all.push(...JSON.parse(localStorage.getItem(key) || '[]')); } catch(e) {}
    }
    return all;
  },

  /* ── Clear old data ── */
  clearOld(daysToKeep = 90) {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - daysToKeep);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('analytics_')) {
        const d = new Date(key.replace('analytics_', ''));
        if (d < cutoff) localStorage.removeItem(key);
      }
    }
  }
};

// 注册为 Analytics adapter
if (window.Analytics?.registerAdapter) {
  Analytics.registerAdapter(AnalyticsAPIAdapter);
  AnalyticsAPIAdapter.init();
}
