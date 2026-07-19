# Projects Page Migration Report — V4.3

> 日期：2026-07-20
> 迁移：新建 Projects 展示页面

---

## 一、页面结构

```
src/pages/Projects/
├── Projects.html   (50行) — 框架 + 外部引用
├── Projects.css    (120行) — 全部 Design Token
└── Projects.js     (100行) — fetch projects.json → 渲染
```

### 依赖
- `src/styles/tokens.css` / `base.css` / `layout.css`
- `src/components/Image/Image.js` — renderImage()
- `src/components/Gallery/Gallery.js` — renderGallery()
- `src/components/Lightbox/Lightbox.js` — Lightbox.open()
- `src/data/projects.json` — 项目数据

---

## 二、数据模型

基于 `schemas/project.schema.json`：

```json
{
  "name": "Tokyo Rain",
  "description": "...",
  "cover": "web_023.jpeg",
  "photos": ["web_023.jpeg", "web_009.jpeg", ...],
  "location": "东京 · 新宿 / 涩谷",
  "date": "2025-06",
  "client": "个人项目",
  "exif": "Nikon Z8 · 35mm f/1.8",
  "notes": "...",
  "published": true
}
```

---

## 三、渲染特性

| 功能 | 实现 |
|------|------|
| 空状态 | 提示"在 Admin V2 → Projects 创建" |
| 项目封面 | 全宽 50vh 大图 |
| 元数据 | 地点 / 日期 / 客户 / 设备 横向排列 |
| 项目笔记 | 金色边框卡片，Markdown 文本 |
| 作品图库 | 内嵌 `renderGallery()`，点击 → Lightbox |
| Staggered reveal | 每个项目 150ms 递增延迟 |

---

## 四、Lightbox 集成

```js
renderGallery(series, {
  onPhotoClick: (idx) => Lightbox.open(proj.photos.map(f => `images/${f}`), idx)
});
```

每个项目内的图库直接绑定 Lightbox。

---

## 五、当前数据

1 个示例项目：**Tokyo Rain**（6 张照片，东京梅雨季主题）

用户可在 Admin V2 → Projects 中创建更多。

---

## 六、访问路径

`stellanhuan.github.io/src/pages/Projects/Projects.html`
