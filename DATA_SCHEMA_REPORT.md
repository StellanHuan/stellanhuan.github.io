# Data Schema Report — V2.3

> 日期：2026-07-20
> 目标：为 Stellan Photography CMS 建立正式数据模型

---

## 一、当前数据字段分析

### photo（src/data/photos.json, 150 条）

| 字段 | 类型 | 现状 | Schema 动作 |
|------|------|------|------------|
| `file` | string | 存在 | required |
| `title` | string | 存在 | required |
| `series` | string | 存在，但无校验 | required + enum |
| `tags` | string[] | 存在 | optional |
| `_isUpload` | boolean | Admin 内部字段 | optional，标记内部 |
| `_dataUrl` | string | Admin 内部字段 | ❌ 不入 schema（运行时） |
| `camera` | — | ❌ 缺 | 新增 optional |
| `lens` | — | ❌ 缺 | 新增 optional |
| `location` | — | ❌ 缺 | 新增 optional |
| `date` | — | ❌ 缺 | 新增 optional |
| `score` | number | 源于 Apple DB 但未写入 | 新增 optional |

### series（src/data/series.json, 4 条）

| 字段 | 类型 | 现状 | Schema 动作 |
|------|------|------|------------|
| `id` | string | 存在 | required + enum |
| `name` | {zh,ja,en} | 存在 | required |
| `description` | {zh,ja,en} | 存在 | optional |
| `cover` | string | 存在 | optional |
| `photos` | string[] | 存在 | required |
| `order` | number | ❌ 缺 | 新增 optional |
| `hidden` | boolean | ❌ 缺 | 新增 optional |

### project（src/data/projects.json, 空）

字段完全来自 Admin V2 的 Project 编辑器设计：
name, description, cover, photos, location, coordinates, date, exif, notes, published

### journal（src/data/journal.json, 空）

字段来自 Admin V2 的 Journal 编辑器：
title, date, cover, body, excerpt, tags, photos, draft, language

### print（src/data/prints.json, 空）

字段来自 Admin V2 的 Print 编辑器：
title, photo, size(A4/A3/A2), price, stock, public

### site（src/data/site.json, 1 条）

| 字段 | 类型 | 现状 | Schema 动作 |
|------|------|------|------------|
| `name` | {zh,en} | 存在 | required |
| `title` | string | 存在 | required |
| `domain` | string | 存在 | required |
| `language` | string | 存在 | required + enum |
| `social` | object | 存在，仅 wechat+github | 扩展 instagram/email |
| `sections` | object | 存在，9 个区块 | required |
| `booking` | object | 存在 | optional |
| `description` | string | ❌ 缺 | 新增（SEO meta） |
| `seo` | object | ❌ 缺 | 新增（GA/robots） |

---

## 二、Schema 文件清单

| 文件 | 实体 | required 字段 | optional 字段 |
|------|------|-------------|-------------|
| `photo.schema.json` | 照片 | file, title, series | tags, camera, lens, location, date, exif, favorite, score |
| `series.schema.json` | 系列 | id, name, photos | description, cover, order, hidden |
| `project.schema.json` | 项目 | name | slug, description, cover, photos, location, coordinates, date, exif, notes, published |
| `journal.schema.json` | 日志 | title, date | slug, cover, body, excerpt, tags, photos, draft, language |
| `print.schema.json` | 打印 | title, size, price | photo, stock, public, paperType, edition |
| `site.schema.json` | 站点 | name, title, domain, language | description, languages, social, sections, booking, copyright, seo |

---

## 三、设计原因

### 为什么 photo 新增 camera/lens/location/date
当前照片元数据只有 title 和 tags。Admin V2 的照片筛选器需要按相机（Nikon Z8/DJI/RICOH）、地点（东京/郑州/漯河）、年份筛选。这些字段从 Photos.sqlite 自动提取，是内容管理的刚需。

### 为什么 series 加 order 和 hidden
当前 4 个系列按硬编码顺序显示。`order` 让 Admin 可拖拽重排，`hidden` 支持草稿/隐藏系列。

### 为什么 project 有 coordinates
Admin V2 设计文档中 Project 编辑器有"地图"字段。coordinates 是交互地图的数据基础。

### 为什么 journal 有 draft 和 language
摄影师日志可能是多语言的。`draft` 支持草稿箱，`language` 支持按语言筛选。

### 为什么 site 扩展 social 和 seo
AUDIT.md 中 SEO 和社交链接是 P0 待办。Schema 预先定义字段，后续填入。

---

## 四、兼容方案

| 场景 | 处理方式 |
|------|---------|
| 现有 data.js 不符合 Schema | 保留 data.js 不动，新数据写入 src/data/*.json |
| Admin V2 不校验 Schema | Schema 作为文档规范，Admin 暂不强制校验 |
| JSON Schema 工具链 | 可用 `ajv`（JS）/ `jsonschema`（Python）做校验 |
| 字段迁移 | photos.json 新增字段设为 optional，不影响现有数据 |
| _dataUrl / _isUpload | 标记为运行时字段，不纳入正式 Schema |

---

## 五、CMS 使用方式

```
Admin V2 (编辑)
    │
    ▼
src/data/*.json (持久化)
    │
    ▼
JSON Schema 校验 (可选)
    │
    ▼
Website (展示)
```

1. Admin V2 读写 `src/data/*.json`
2. 保存时自动校验格式（未来集成 Schema validator）
3. 导出 data.js 时按 Schema 结构生成
4. Schema 文件同时作为 API 文档，供前端开发者参考
