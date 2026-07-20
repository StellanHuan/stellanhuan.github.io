# V13 Data Architecture Audit

## 图片引用完整映射

| 页面 | 数据文件 | Section | CMS 入口 | 状态 |
|------|---------|---------|---------|------|
| 首页 Hero | data.js | hero | Admin→Sections→hero | ✅ |
| 首页 01 | data.js | featured | Admin→Sections→featured | ✅ |
| 首页 02 | data.js | hscroll | Admin→Sections→hscroll | ✅ |
| 首页 03 | data.js | landscape+aerial | Admin→Sections→landscape/aerial | ✅ |
| 首页 04 | data.js | booking_* | Admin→Sections→booking_* | ✅ |
| 首页 05 | data.js | about | Admin→Sections→about | ✅ |
| 详情 portrait | series.js | ← deploy生成 | Admin→Sections→deploy | ✅ |
| 详情 street | series.js | ← deploy生成 | Admin→Sections→deploy | ✅ |
| 详情 landscape | series.js | ← deploy生成 | Admin→Sections→deploy | ✅ |
| 详情 aerial | series.js | ← deploy生成 | Admin→Sections→deploy | ✅ |
| Projects页 | projects.json | — | Admin→Projects | ⚠️ |
| Journal页 | journal.json | — | Admin→Journal | ⚠️ |
| Prints页 | 硬编码JS | — | ❌ 无 | ❌ |

## 数据文件层级

```
CMS 编辑层 (Admin V2)
  ├── Sections → data.js SITE_DATA.sections
  ├── Photos → data.js SITE_DATA.photos  
  ├── Projects → projects.json
  ├── Journal → journal.json
  └── Prints → (硬编码，无JSON)

构建层 (deploy/CI)
  ├── data.js → series.js (deploy时生成)
  └── export_content.py → data.js (CI重新生成)

展示层 (Website)
  ├── index.html → data.js
  ├── series/index.html → series.js
  ├── Projects.html → projects.json
  ├── Journal.html → journal.json
  └── Prints.html → (硬编码)
```

## 发现的问题

| # | 问题 | 影响 |
|---|------|------|
| 1 | Prints页图片硬编码在JS中 | CMS无法管理 |
| 2 | content/series/index.json 与 src/data/series.json 重复 | 双数据源风险 |
| 3 | content/photos/index.json 与 data.js photos 可能不同步 | CI覆盖风险 |
| 4 | Projects/Journal 的 Admin UI 简陋 | 仅基本字段编辑 |
| 5 | booking_event/aerial 照片数量极少 | 视觉不完整 |

## 建议

1. Prints页接入CMS数据源 (content/prints/index.json → Prints.js)
2. 合并 content/ 和 src/data/ 重复文件
3. Admin Projects/Journal 增加富文本编辑
4. booking_event/aerial 各增加至少2张照片
