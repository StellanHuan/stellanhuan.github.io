# Gallery Component Report — V3.2.3

> 日期：2026-07-20
> 组件：Gallery（摄影图库）
> 依赖：Image Component V3.2.2 + Design Tokens V3.1 + Series Schema V2.3

---

## 一、组件结构

```
src/components/Gallery/
├── Gallery.html    (12行) — 容器 div
├── Gallery.css     (90行) — Grid + Overlay + Reveal，全 Token 引用
└── Gallery.js      (85行) — renderGallery() 函数
```

### 依赖链
```
renderGallery() → renderImage() → <picture> (AVIF/WebP/JPEG)
     ↑                ↑
  series.json     photo.json
```

---

## 二、数据输入格式

```js
renderGallery(series, opts)

// series: 符合 series.schema.json
{
  "id": "portrait",
  "name": {"zh": "肖像", "en": "Portrait"},
  "photos": ["web_002.jpeg", "web_003.jpeg", "web_001.jpeg"]
}

// opts:
{
  containerId: 'gallery',          // 目标 DOM ID
  onPhotoClick: (index) => {...},  // Lightbox 回调
  maxItems: 24                     // 最大展示数
}
```

---

## 三、渲染流程

```
1. 读取 series.photos[] 数组
2. 遍历 photos，每个调用 renderImage() 生成 <picture>
3. 包装为 .gallery-item（含 overlay + 标题 + meta）
4. 注入到 #gallery 容器
5. IntersectionObserver 监听 → staggered reveal
```

### 关键约束
- **禁止** 直接生成 `<img>` 标签 — 必须通过 `renderImage()`
- **禁止** 硬编码颜色/间距 — 全部引用 tokens.css

---

## 四、性能策略

| 策略 | 实现 |
|------|------|
| 懒加载 | `renderImage()` 默认 `loading="lazy"` |
| 异步解码 | `decoding="async"` 自动设置 |
| AVIF 优先 | Image 组件自动降级链 |
| 缩略图占位 | 400px WebP 由 Image 组件处理 |
| Staggered reveal | 每个 item 递增 60ms delay + IntersectionObserver |
| 最大展示数 | `maxItems` 参数限制 DOM 数量 |
| CSS GPU 加速 | transform + opacity 动画，不触发 layout |

---

## 五、Gallery 视觉效果

与 V1 series/index.html 的 gallery 一致：
- Grid 自动填充列（min 380px）
- 1px 金色分割线
- Hover：4% 放大 + 底部渐变遮罩滑入 + 标题浮现
- 5n+1 竖幅、7n+2 宽幅节奏变化
- 卷动进入时 staggered 淡入

---

## 六、Lightbox 集成方案

当前 Gallery 的 `onPhotoClick` 回调预留了 Lightbox 接口：

```js
// 未来集成
import { openLightbox } from './Lightbox.js';

renderGallery(series, {
  onPhotoClick: (index) => openLightbox(series.photos, index)
});
```

Lightbox 组件（后续 V3.2.4）接收：
- `photos[]` — 照片数组
- `index` — 当前索引
- 功能：全屏预览 + 左右翻页 + 键盘导航 + 缩放手势

---

## 七、使用示例

### 独立使用
```html
<link rel="stylesheet" href="src/styles/tokens.css">
<link rel="stylesheet" href="src/components/Gallery/Gallery.css">

<div class="gallery" id="gallery"></div>

<script src="src/components/Image/Image.js"></script>
<script src="src/components/Gallery/Gallery.js"></script>
<script src="src/data/series.js"></script>
<script>
  renderGallery(SERIES_DATA.portrait);
</script>
```

### 替换 V1 series/index.html
当前 series/index.html 的硬编码照片展示可直接替换为 `renderGallery()` 调用，删除 30 行内联 HTML 生成代码。

---

## 八、兼容性

| 检查项 | 状态 |
|--------|------|
| 不修改现有 Gallery (V1 series) | ✅ |
| 不修改 index.html | ✅ |
| 不直接生成 img 标签 | ✅ |
| 全部 Token 引用 | ✅ |
| 预留 Lightbox | ✅ |
