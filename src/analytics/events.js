/* ═══════════════════════════════════
   Analytics Events — V6.1
   自动埋点辅助函数
   ═══════════════════════════════════ */

(function () {
  if (!window.Analytics || !Analytics.track) return;

  const A = Analytics;

  // ── Page Ready ──
  window.addEventListener('load', () => {
    const perf = performance?.getEntriesByType?.('navigation')?.[0];
    A.track('page_ready', {
      loadTime: perf ? Math.round(perf.loadEventEnd - perf.fetchStart) : 0
    });
  });

  // ── Page Exit ──
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      A.track('page_exit', { duration: Math.round(performance?.now?.() || 0) });
    }
  });

  /* ═══════════ Lightbox Integration ═══════════
     在 Lightbox.open() 中调用:
       Analytics.track('lightbox_open', { photo: currentPhoto, index })
     在 Lightbox.next()/prev() 中调用:
       Analytics.track('photo_next', { index })
  */
  window._analyticsLightbox = {
    onOpen: (photo, index) => A.track('lightbox_open', { photo, index }),
    onClose: () => A.track('lightbox_close'),
    onNext: (index) => A.track('photo_next', { index }),
    onPrev: (index) => A.track('photo_prev', { index })
  };

  /* ═══════════ Series View ═══════════
     在 Series 页渲染时调用:
       Analytics.track('series_view', { series: seriesId })
  */
  window._analyticsContent = {
    seriesView: (id) => A.track('series_view', { series: id }),
    projectView: (slug) => A.track('project_view', { project: slug }),
    journalRead: (slug) => A.track('journal_read', { article: slug })
  };

  /* ═══════════ Conversion ═══════════
     在联系按钮点击时调用:
       Analytics.track('contact_click')
     在复制微信时调用:
       Analytics.track('wechat_copy')
  */
  window._analyticsConversion = {
    contactClick: () => A.track('contact_click'),
    wechatCopy: () => A.track('wechat_copy'),
    bookingClick: (type) => A.track('booking_card_click', { type }),
    langSwitch: (lang) => A.track('lang_switch', { lang })
  };

  /* ═══════════ Auto-track Outbound Links ═══════════ */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('weixin'))) {
      A.track('contact_click', { url: href });
    }
  });
})();
