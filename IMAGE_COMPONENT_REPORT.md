# Image Component Report — V3.2.2

> 日期：2026-07-20
> 组件：Image（统一图片组件）
> 依赖：Image Pipeline V2.2 + Photo Schema V2.3 + Design Tokens V3.1

---

## 一、API 设计

### 函数签名
```js
renderImage(photo, options) → string
```

### 输入参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `photo` | object | ✅ | — | 符合 photo.schema.json，含 `file`、`title`、可选 `alt` |
| `opts.loading` | `'lazy'\|'eager'` | ❌ | `'lazy'` | 原生懒加载 |
| `opts.sizes` | string | ❌ | `''` | 响应式 sizes（如 `(max-width:768px) 100vw, 50vw`） |
| `opts.width` | number | ❌ | `1600` | 回退宽度 |
| `opts.height` | number | ❌ | `1067` | 回退高度 |
| `opts.className` | string | ❌ | `''` | 附加 CSS class |

### 输出结构
```html
<picture class="...">
  <source srcset="assets/images/avif/web_001.avif" type="image/avif">
  <source srcset="assets/images/webp/web_001.webp" type="image/webp">
  <img src="images/web_001.jpeg"
       alt="光的粒子"
       loading="lazy"
       width="1600" height="1067"
       decoding="async">
</picture>
```

---

## 二、格式支持

| 格式 | 路径 | 浏览器支持 | 优先级 |
|------|------|----------|--------|
| AVIF | `assets/images/avif/{name}.avif` | Chrome 85+, Firefox 93+ | 🥇 首选（最小） |
| WebP | `assets/images/webp/{name}.webp` | 全平台 97%+ | 🥈 备选 |
| JPEG | `images/{name}.jpeg` | 全部 | 🥉 兜底 |

`<picture>` 元素自动降级：浏览器选第一个支持的 `<source>`，否则用 `<img>` 的 JPEG。

---

## 三、性能优化

| 优化 | 实现 |
|------|------|
| AVIF 首选 | `assets/images/avif/` — 17MB vs JPEG 71MB（76% 压缩） |
| WebP 备选 | `assets/images/webp/` — 23MB（68% 压缩） |
| 懒加载 | `loading="lazy"` 默认，首屏可设 `eager` |
| 异步解码 | `decoding="async"` 配合懒加载 |
| 宽高预设 | `width`/`height` 属性防 CLS 布局偏移 |
| 响应式 | `sizes` 属性支持不同断点 |
| 缩略图占位 | 懒加载图片可加 `srcset` 指向 400px 缩略图 |

---

## 四、CSS 工具类

| Class | 效果 |
|-------|------|
| `.img-cover` | `object-fit: cover` — 全屏/卡片的背景填充 |
| `.img-contain` | `object-fit: contain` — 灯箱/画廊 |
| `.img-4x3` | 4:3 比例 |
| `.img-3x4` | 3:4 竖幅比例 |
| `.img-16x9` | 16:9 宽幅比例 |
| `.img-1x1` | 方形 |
| `.img-zoom` | hover 缩放 1.04（spring easing） |
| `.img-rounded` | 圆角 var(--radius-md) |
| `.img-shadow` | 图片投影 |

---

## 五、Gallery 集成方案（后续）

### 当前（V1）
```js
// index.html 硬编码
card.innerHTML = `<img src="${pool[i]}" alt="..." loading="lazy" width="1600" height="900">`;
```

### V3 迁移后
```js
// 使用 Image 组件
card.innerHTML = renderImage(photos[i], {
  className: 'img-16x9 img-zoom',
  loading: 'lazy'
});
```

### 迁移收益
- 自动 AVIF/WebP 支持 → 图片体积 -68%
- 统一 alt 文本
- 减少 30 处 `<img>` 硬编码
- Photo schema 数据驱动

---

## 六、与现有代码兼容

| 检查项 | 状态 |
|--------|------|
| 不修改现有 Gallery | ✅ |
| 不修改 index.html | ✅ |
| 不修改 series/index.html | ✅ |
| 依赖 Image Pipeline (assets/) | ✅（已有） |
| 依赖 Design Tokens | ✅（CSS 全部引用 token） |
| 依赖 Photo Schema | ✅（photo 对象格式兼容） |
