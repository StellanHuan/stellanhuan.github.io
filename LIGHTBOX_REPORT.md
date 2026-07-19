# Lightbox Component Report — V4.1

> 日期：2026-07-20
> 组件：Lightbox（全屏照片查看器）
> 依赖：Design Tokens V3.1

---

## 一、API

```js
Lightbox.open(photos, index)   // 打开，从第 index 张开始
Lightbox.close()               // 关闭
Lightbox.next()                // 下一张
Lightbox.prev()                // 上一张
```

### photos 参数
支持两种格式：
```js
// 字符串数组（文件名）
Lightbox.open(['web_001.jpeg', 'web_002.jpeg'], 0)

// Photo 对象数组（schema）
Lightbox.open([
  { file: 'images/web_001.jpeg', title: '光的粒子', camera: 'Nikon Z8', ... }
], 0)
```

---

## 二、交互支持

| 交互 | 实现 |
|------|------|
| ESC 关闭 | ✅ `keydown` → `Escape` |
| ← → 键盘切换 | ✅ `ArrowLeft` / `ArrowRight` |
| 点击背景关闭 | ✅ click on `.lightbox` |
| 关闭按钮 | ✅ `.lb-close` |
| 左右箭头按钮 | ✅ `.lb-nav` |
| 移动端手势 | ✅ `touchstart`/`touchend`，滑动 > 50px 触发切换 |
| aria 无障碍 | ✅ `aria-hidden` 切换 + `aria-label` |

---

## 三、显示元数据

底部面板显示 photo schema 中存在的字段：

| 字段 | 标签 | 来源 |
|------|------|------|
| `camera` | 相机 | photo.camera |
| `lens` | 镜头 | photo.lens |
| `location` | 地点 | photo.location |
| `date` | 日期 | photo.date |
| `iso` | ISO | photo.iso |
| `aperture` | 光圈 | photo.aperture |
| `shutter` | 快门 | photo.shutter |

标题始终显示在最上方。

---

## 四、Gallery 集成

```js
// Gallery V3.2.3 的 onPhotoClick 回调
renderGallery(series, {
  onPhotoClick: (index) => {
    Lightbox.open(series.photos, index);
  }
});
```

一行代码完成 Lightbox 与 Gallery 的绑定。

---

## 五、组件文件

```
src/components/Lightbox/
├── Lightbox.html   (25行) — HTML 结构（container + image + meta + nav + counter）
├── Lightbox.css    (130行) — 全部 Design Token，无硬编码
└── Lightbox.js     (120行) — IIFE 模块，暴露 { open, close, next, prev }
```

---

## 六、视觉设计

- 96% 不透明黑色背景
- 图片最大 75vw × 80vh，box-shadow
- 底部半透明 metadata 面板（毛玻璃 + 金色边框）
- 左右箭头金色 hover
- 移动端箭头隐藏（手势代替）

---

## 七、使用示例

```html
<link rel="stylesheet" href="src/styles/tokens.css">
<link rel="stylesheet" href="src/components/Lightbox/Lightbox.css">

<!-- Lightbox HTML -->
<include src="src/components/Lightbox/Lightbox.html">

<script src="src/components/Lightbox/Lightbox.js"></script>
<script>
  const photos = SERIES_DATA.portrait.photos;
  Lightbox.open(photos, 0);
</script>
```
