# CMS Image Control Audit

## 数据源映射

| 页面 | 数据源 | CMS 编辑入口 |
|------|--------|-------------|
| 首页 sections | data.js → SITE_DATA.sections | Admin → Sections ✅ |
| 阅读更多/详情 | src/data/series.js → SERIES_DATA | Admin deploy 自动生成 ✅ |

## 已验证

- data.js sections = series.js photos ✅ (内容一致)
- Admin deploy 同步更新两者 ✅
- CDN series.js 曾缓存旧版 → 已加 ?v=2 修复

## 修复

- series/index.html: series.js 加载加 ?v=2 缓存破坏
