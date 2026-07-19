/* ═══════════════════════════════════
   Analytics Config — V6.1
   事件定义 + 适配器配置
   ═══════════════════════════════════ */

const ANALYTICS_CONFIG = {
  // 是否启用（生产环境 true，本地开发可关闭）
  enabled: true,

  // 调试模式（控制台打印事件）
  debug: false,

  // 数据发送端点（将来接第三方 SDK）
  endpoint: null,

  // 会话 ID（页面级唯一标识）
  sessionId: 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),

  // 页面信息
  page: {
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer
  },

  // 事件分类
  events: {
    // ── Page ──
    page_view:            { category: 'page',     label: '页面浏览' },
    page_exit:            { category: 'page',     label: '页面退出' },

    // ── Content ──
    series_view:          { category: 'content',  label: '系列浏览' },
    project_view:         { category: 'content',  label: '项目浏览' },
    journal_read:         { category: 'content',  label: '日志阅读' },

    // ── Photo ──
    lightbox_open:        { category: 'photo',    label: '灯箱打开' },
    lightbox_close:       { category: 'photo',    label: '灯箱关闭' },
    photo_next:           { category: 'photo',    label: '下一张' },
    photo_prev:           { category: 'photo',    label: '上一张' },
    photo_zoom:           { category: 'photo',    label: '缩放' },

    // ── Interaction ──
    hscroll_swipe:        { category: 'interact', label: '横向滑动' },
    booking_card_click:   { category: 'interact', label: '预约卡点击' },
    lang_switch:          { category: 'interact', label: '语言切换' },

    // ── Conversion ──
    contact_click:        { category: 'conversion', label: '联系点击' },
    inquiry_start:        { category: 'conversion', label: '咨询开始' },
    inquiry_submit:       { category: 'conversion', label: '咨询提交' },
    wechat_copy:          { category: 'conversion', label: '复制微信' },

    // ── Performance ──
    image_load_time:      { category: 'perf',     label: '图片加载时间' },
    page_ready:           { category: 'perf',     label: '页面就绪' }
  }
};
