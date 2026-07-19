# SEO Foundation Report — V5.2

> 日期：2026-07-20

## 当前 SEO 状态

AUDIT.md P0 问题：缺 robots.txt、sitemap.xml、og:image、meta description、JSON-LD。现已全部解决。

## 新增文件

| 文件 | 内容 |
|------|------|
| `public/sitemap.xml` | 8 URLs：首页 + 系列页(4) + 项目页(1) + 日志页(1) |
| `public/robots.txt` | Allow all，屏蔽 /admin-v2/，引用 sitemap |
| `public/structured-data.json` | 58 个 Schema.org 实体 |
| `public/seo-head.html` | JSON-LD + meta description（可 include 到 index.html） |
| `scripts/generate_seo.py` | 自动化脚本，从 content/ 重新生成所有 SEO 文件 |

## JSON-LD 覆盖

| Schema 类型 | 数量 |
|------------|------|
| Person | 1 |
| WebSite | 1 |
| ImageObject | 50（前 50 张照片） |
| CreativeWork | 5（4 系列 + 1 项目） |
| Article | 1（日志） |

## 页面 OG 覆盖

| 页面 | title | description |
|------|-------|-------------|
| Home | 瓛瓛 HuanHuan — Photography | Stellan Huan · Nikon Z8 · 郑州与东京之间的光 |
| Series/portrait | 肖像 — 瓛瓛 | 人物の光と影 |
| Series/street | 街头的呼吸 — 瓛瓛 | 郑州与东京的街头偶遇 |
| Series/landscape | 大地与天空 — 瓛瓛 | 风光与航拍 |
| Series/aerial | 俯瞰 — 瓛瓛 | 空からの視点 |

## 后续优化

- [ ] og:image 自动截图（需 Puppeteer/Playwright）
- [ ] Google Search Console 验证
- [ ] 面包屑 Schema (BreadcrumbList)
- [ ] FAQ Schema（如有常见问题）
- [ ] 图片 alt 文本 SEO 优化
- [ ] hreflang 标签（多语言 SEO）
