# Analytics Layer Report — V6.1

## 架构
```
config.js (事件定义)
    │
analytics.js (核心引擎 + 适配器模式)
    │
events.js (自动埋点辅助)
    │
adapters ──→ console / localStorage / GA4 / Plausible / custom
```

## 事件模型 (18 事件)

| 分类 | 事件 | 触发位置 |
|------|------|---------|
| Page | page_view | 页面加载自动 |
| Page | page_exit | 标签页隐藏 |
| Page | page_ready | load 完成 + 加载时间 |
| Content | series_view | Series 页 |
| Content | project_view | Projects 页 |
| Content | journal_read | Journal 详情 |
| Photo | lightbox_open/close | Lightbox |
| Photo | photo_next/prev | 左右切换 |
| Interaction | hscroll_swipe | HScroll 区 |
| Interaction | booking_card_click | 预约卡片 |
| Interaction | lang_switch | 语言切换 |
| Conversion | contact_click | 联系按钮 |
| Conversion | wechat_copy | 复制微信 |
| Conversion | inquiry_start/submit | 咨询流程 |
| Perf | image_load_time | 图片加载 |
| Perf | page_ready | 页面就绪 |

## 数据结构
```json
{
  "event": "wechat_copy",
  "data": {
    "sessionId": "sess_1721...",
    "page": "/index.html",
    "timestamp": 1721476800000
  }
}
```

## 适配器
- **console** — 开发调试
- **localStorage** — 本地记录（按天分文件，上限 500 条/天）
- **未来** — GA4 / Plausible / Umami（实现 send() 即可）

## Dashboard 方案
localStorage 数据可通过 Admin V2 → Analytics 页面可视化：
- 日 PV/UV
- 热门系列
- 转化漏斗（浏览 → 联系 → 咨询）
