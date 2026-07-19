# Content Migration Report — V2.1

> 执行日期：2026-07-20
> 迁移方向：V1 单一 data.js → Content-First 多文件 JSON 体系

---

## 原数据结构（data.js V1）

```js
SITE_DATA = {
  photos: [{file, title, series, tags}, ...],  // 150张
  sections: {                                    // 9个区块
    hero: ["web_001.jpeg"],
    featured: ["web_002.jpeg", "web_003.jpeg"],
    hscroll: ["web_007.jpeg", ...],
    landscape: [...], aerial: [...],
    about: [...],
    booking_portrait: [...], booking_event: [...], booking_aerial: [...]
  }
}
```

## 新数据结构（src/data/）

### photos.json
```json
[{file, title, series, tags}, ...]  // 150张，直接从 data.js 迁移
```

### series.json
```json
{
  "portrait": {
    "id": "portrait",
    "name": {"zh": "肖像", "ja": "ポートレート", "en": "Portrait"},
    "description": {"zh": "…", "ja": "…", "en": "…"},
    "cover": "web_001.jpeg",
    "photos": ["web_002.jpeg", "web_003.jpeg", "web_001.jpeg"]
  },
  "street": { ... "photos": 7张 },
  "landscape": { ... "photos": 4张 },
  "aerial": { ... "photos": 2张 }
}
```

### site.json
```json
{
  "name": {"zh": "瓛瓛", "en": "Stellan Huan"},
  "domain": "stellanhuan.github.io",
  "language": "zh",
  "languages": ["zh", "ja", "en"],
  "social": {"wechat": "S0688888860", "github": "StellanHuan"},
  "sections": { ... },   // 9个区块（原 data.js sections）
  "booking": {
    "portrait": {"price": 398},
    "event": {"price": 1500, "unit": "half-day"},
    "aerial": {"price": 500, "addon": true}
  }
}
```

### projects.json / journal.json / prints.json
空数组 `[]`，预留给 Admin V2 填充。

---

## 转换数量

| 源 | 目标 | 数量 |
|----|------|------|
| data.js photos | src/data/photos.json | 150 张 |
| data.js sections | src/data/site.json (sections) | 9 个区块 |
| data.js sections 重组 | src/data/series.json | 4 个系列，共 16 张引用 |
| — | src/data/projects.json | 0 |
| — | src/data/journal.json | 0 |
| — | src/data/prints.json | 0 |
| — | src/data/series.js | 1（JS 版本，供 series 页加载） |

---

## 兼容问题

| 问题 | 影响 | 解决方案 |
|------|------|---------|
| data.js 保留不删 | 新旧数据并存 | V1 网站沿用 data.js；V2 逐步迁移到 src/data/ |
| series.json photos 数组偏小 | portrait 3张/street 7张/landscape 4张/aerial 2张 | 系列页目前展示这些，后续 Admin V2 拖入更多照片后更新 |
| site.json 新增 booking 字段 | index.html 定价硬编码 | 待 V2 重构时从 site.json 读取 |
| series.js 是 JS 文件 | 需要 src/data/ 目录在 Pages 部署中存在 | GitHub Pages 已部署包含 src/data/ 目录 |

---

## 系列页改造（series/index.html）

| 改前 | 改后 |
|------|------|
| 硬编码 30 张照片 `web_001~030.jpeg` | 从 `SERIES_DATA[series].photos` 读取 |
| `offsets` 按数组偏移分组 | 每个系列有独立的 `photos` 数组 |
| 固定 12 张展示 | 动态取 `photos.length`（最多 24 张） |
| 数据来源：内嵌 JS | 数据来源：`<script src="../src/data/series.js">` |

---

## 下一步建议

1. **Admin V2 写回 series.json**：Sections 编辑器的修改同步更新 `src/data/series.json`
2. **网站从 site.json 读配置**：书名、定价、社交链接统一从 site.json 读取，不再硬编码
3. **series.json photos 扩容**：目前每个系列只有几张照片，需要 Admin 中拖入更多
4. **生成 site.js**：类似 series.js，供 V1 网站逐步迁移
5. **删除或标记 data.json 为 legacy**：避免混淆
