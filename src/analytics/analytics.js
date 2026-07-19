/* ═══════════════════════════════════
   Analytics Core — V6.1
   统一跟踪接口 + 适配器模式
   ═══════════════════════════════════ */

const Analytics = (function () {
  const config = ANALYTICS_CONFIG;
  let adapters = [];
  let eventQueue = [];
  let initialized = false;

  /* ── Adapter Interface ──
     每个 adapter 必须实现: send(event, data)
     可选: init(), flush()
     Adapter 示例:
       { name: 'console', send: (e,d) => console.log('[Analytics]', e, d) }
       { name: 'ga4',     send: (e,d) => gtag('event', e, d) }
       { name: 'plausible', send: (e,d) => plausible(e, {props: d}) }
  */

  function init() {
    if (initialized) return;

    // 默认: console adapter (开发环境)
    if (config.debug) {
      registerAdapter({
        name: 'console',
        send: (event, data) => {
          console.log(`%c[Analytics] %c${event}`,
            'color: #b8934f', 'color: #d4cec4', data);
        }
      });
    }

    // 默认: localStorage adapter (本地记录)
    registerAdapter({
      name: 'local',
      send: (event, data) => {
        try {
          const key = `analytics_${new Date().toISOString().split('T')[0]}`;
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push({ event, data, time: Date.now() });
          if (existing.length > 500) existing.splice(0, existing.length - 500);
          localStorage.setItem(key, JSON.stringify(existing));
        } catch (e) { /* quota exceeded, ignore */ }
      }
    });

    // 自动发送 page_view
    track('page_view', { path: config.page.path, title: config.page.title });

    initialized = true;

    // 发送队列中的事件
    while (eventQueue.length) {
      const { event, data } = eventQueue.shift();
      sendToAdapters(event, data);
    }
  }

  /* ═══════════ Public API ═══════════ */

  function track(event, data = {}) {
    const enriched = {
      ...data,
      sessionId: config.sessionId,
      page: config.page.path,
      timestamp: Date.now()
    };

    if (!initialized) {
      eventQueue.push({ event, data: enriched });
      return;
    }

    sendToAdapters(event, enriched);
  }

  function registerAdapter(adapter) {
    if (typeof adapter.send !== 'function') {
      console.warn('[Analytics] Adapter missing send():', adapter.name);
      return;
    }
    adapters.push(adapter);
    if (config.debug) console.log(`[Analytics] Adapter registered: ${adapter.name}`);
  }

  function getAdapters() {
    return adapters.map(a => a.name);
  }

  /* ═══════════ Internal ═══════════ */

  function sendToAdapters(event, data) {
    adapters.forEach(adapter => {
      try {
        adapter.send(event, data);
      } catch (e) {
        if (config.debug) console.warn(`[Analytics] Adapter ${adapter.name} error:`, e);
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { track, registerAdapter, getAdapters, config: ANALYTICS_CONFIG };
})();
