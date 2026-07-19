# Series Page Migration Report — V3.3

> 日期：2026-07-20
> 迁移：series/index.html (V1) → src/pages/Series/ (V3)

---

## 一、原页面结构（V1）

```
series/index.html (120行)
├── <style> 内嵌 CSS (90行)
├── <script> 内嵌 JS (80行)
└── 硬编码：
    ├── const P=[]; for(let i=1;i<=30;i++) P.push(...)  — 固定30张
    ├── const offsets={portrait:0,street:6,landscape:12,aerial:18}  — 偏移硬编码
    └── <img src="${P[idx]}" — 直接生成 img 标签，无 AVIF/WebP
```

### 问题
- 照片池硬编码为 30 张
- offset 逻辑与 data.js 的 sections 配置不同步
- 直接生成 `<img>`，无格式降级
- Lightbox 逻辑和 Gallery 渲染耦合在一起

---

## 二、新页面结构（V3.3）

```
src/pages/Series/
├── Series.html    (40行) — 引用外部 CSS/JS，纯结构
├── Series.css     (85行) — 仅本页样式，全部 Token
├── Series.js      (40行) — 读取 series.js → renderGallery()
```

### 组件依赖链
```
Series.html
  ├── tokens.css
  ├── Image.css / Image.js
  ├── Gallery.css / Gallery.js
  ├── Series.css / Series.js
  └── series.js (data)
```

---

## 三、数据流

```
URL hash (#portrait/#street/...)
  │
  ▼
Series.js 解析
  │
  ▼
SERIES_DATA[seriesId]
  │
  ├──→ 渲染 Hero metadata (tag / title / description)
  │
  └──→ renderGallery(series)
          │
          ▼
        renderImage() × N
          │
          ▼
        <picture> (AVIF → WebP → JPEG)
```

**无硬编码**：照片列表来自 `series.photos[]`，offset 逻辑已删除。

---

## 四、组件依赖

| 组件 | 版本 | 用途 |
|------|------|------|
| Design Tokens | V3.1 | 颜色/间距/动效 |
| Image | V3.2.2 | renderImage() — 生成 `<picture>` |
| Gallery | V3.2.3 | renderGallery() — 生成网格 |
| Series Data | V2.1 | SERIES_DATA — 系列定义 |

---

## 五、V1 → V3 代码对比

### 照片加载

```diff
- const P=[];
- for(let i=1;i<=30;i++) P.push(`../images/web_${String(i).padStart(3,'0')}.jpeg`);
- const offsets={portrait:0,street:6,landscape:12,aerial:18};
- const start=offsets[series]||0;

+ const series = SERIES_DATA?.[seriesId];
+ renderGallery(series);
```

### 图片渲染

```diff
- <img src="${P[idx]}" alt="..." loading="lazy" width="1600" height="1067">

+ renderImage(photo, { loading: 'lazy' })
  → <picture>
      <source srcset="...avif" type="image/avif">
      <source srcset="...webp" type="image/webp">
      <img src="...jpeg" loading="lazy" ...>
    </picture>
```

### CSS

```diff
- <style> 90行内嵌 CSS

+ <link rel="stylesheet" href="tokens.css">
+ <link rel="stylesheet" href="Image.css">
+ <link rel="stylesheet" href="Gallery.css">
+ <link rel="stylesheet" href="Series.css">
```

---

## 六、兼容情况

| 检查项 | 状态 |
|--------|------|
| 视觉与 V1 一致 | ✅ |
| Hash 路由 (`#portrait` 等) | ✅ |
| 响应式 (768px) | ✅ |
| 不修改 series/index.html (V1) | ✅ |
| 不修改其他页面 | ✅ |
| 读取 series.js 数据 | ✅ |
| 使用 renderGallery() | ✅ |
| 使用 renderImage() | ✅ |
| 删除 offset 硬编码 | ✅ |
| 全部 Design Token | ✅ |
| Lightbox 预留 | ✅（Gallery 的 onPhotoClick） |
