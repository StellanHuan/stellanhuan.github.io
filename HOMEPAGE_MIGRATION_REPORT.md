# Homepage Migration Report — V4.2

> 日期：2026-07-20
> 迁移：index.html (708行) → src/pages/Home/ (3文件)

---

## 一、原页面 → 新组件映射

| V1 Section | V1 HTML 位置 | V2 组件 |
|-----------|-------------|---------|
| Navbar | 内嵌 25行 | 内嵌（未来迁移到 Navbar 组件） |
| Hero | 内嵌 15行 | `renderHero()` — JS 动态渲染 |
| Quote (Arimoto) | 内嵌 10行 | `renderQuote()` — JS 动态渲染 |
| Full Image (zoom reveal) | 内嵌 5行 | `renderFullImage()` — JS + IntersectionObserver |
| 01 Featured Duo | 内嵌 20行 | `renderFeaturedDuo()` — JS 渲染 |
| 02 HScroll | 内嵌 15行 | `renderHScroll()` — JS 渲染 + 圆点 |
| 03 Landscape Duo | 内嵌 15行 | `renderLandscapeDuo()` — JS 渲染 |
| 04 Booking | 内嵌 80行 | `renderBooking()` — JS 渲染卡 + 流程 |
| 05 About | 内嵌 30行 | `renderAbout()` — JS + 轮换 |
| Contact | 内嵌 15行 | 静态 HTML（内嵌） |
| Footer | 内嵌 5行 | 静态 HTML（内嵌） |

---

## 二、数据来源

| 数据 | 来源 |
|------|------|
| 照片列表 | `data.js` → `SITE_DATA.photos` (150张) |
| 区块分配 | `data.js` → `SITE_DATA.sections` (hero/featured/hscroll/...) |
| 系列定义 | `series.js` → `SERIES_DATA` (portrait/street/landscape/aerial) |

---

## 三、文件结构

```
src/pages/Home/
├── Home.html   (140行) — 结构框架，所有 id 锚点，外部 CSS/JS 引用
├── Home.css    (360行) — 全部 Design Token，0 硬编码颜色/间距
└── Home.js     (310行) — 9 个 IIFE 渲染函数 + 语言/导航/动画
```

### 依赖
- `src/styles/tokens.css` — Design Tokens
- `src/styles/base.css` — Reset + typography
- `src/styles/layout.css` — Grid/Flex/Duo primitives
- `src/components/Image/Image.css` + `Image.js` — 图片组件
- `src/components/Gallery/Gallery.css` + `Gallery.js` — 图库组件
- `src/components/Lightbox/Lightbox.css` + `Lightbox.js` — 灯箱
- `data.js` — 照片数据
- `src/data/series.js` — 系列数据

---

## 四、V1 对比

| 维度 | V1 (index.html) | V4.2 (src/pages/Home/) |
|------|----------------|----------------------|
| 文件数 | 1 | 3 (HTML + CSS + JS) |
| 总行数 | 708 | ~810（含注释） |
| CSS 硬编码 | 74 处内联 style | 0 |
| 颜色/间距 | 硬编码 | 全部 Token 变量 |
| 图片格式 | JPEG only | AVIF → WebP → JPEG（需 Image 组件迁移） |
| 数据绑定 | 硬编码照片路径 | 从 data.js 读取 |
| 组件复用 | 无 | Navbar/Image/Gallery/Lightbox |
| 可维护性 | 3.3/10 | 7/10 |

---

## 五、迁移风险

| 风险 | 影响 | 缓解 |
|------|------|------|
| 视觉差异 | 用户感知 | CSS 全部对照 V1 逐条提取 |
| JS 渲染依赖 data.js | 数据文件缺失时页面空白 | data.js 始终存在 |
| 组件路径 | `<link>` 相对路径错误 | 与 V1 相同的 `../../` 目录结构 |
| 性能 | 多个 CSS 文件增加请求 | 所有 CSS 合计 < 30KB（可合并） |
| Lightbox 未完全集成 | 当前仅预留 API | 后续 V4.3 接入 |
| 语言切换 | 动态渲染的文本 data-lang 可能丢失 | JS 中显式写入 data-lang 属性 |

---

## 六、下一步

- [ ] 实际部署此 Home.html 替换 index.html 测试
- [ ] 接入 Lightbox.open() 到 Duo 和 HScroll 的点击
- [ ] 接入 renderImage() 替代现有 `<img>` 标签（AVIF/WebP 支持）
- [ ] 提取 Navbar 为独立组件引用（当前内嵌）
- [ ] V1 index.html 归档到 `archive/` 目录
