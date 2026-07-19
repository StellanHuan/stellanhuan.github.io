# Performance Optimization Report — V5.3.1

> 日期：2026-07-20
> 范围：全站图片性能修复

---

## 修复项目

| # | 问题 | 文件 | 修复 |
|---|------|------|------|
| 1 | Hero 无优先加载 | index.html L268 | `fetchpriority="high" loading="eager" width="1600" height="1067"` |
| 2 | 10 张图缺懒加载 | index.html L295-453 | `loading="lazy" decoding="async" width/height` |
| 3 | 空 src="" 导致无效请求 | index.html 全局 | 移除所有空 `src=""` |
| 4 | meta description 缺失 | index.html L6 | 添加 SEO description |
| 5 | Lightbox 图无 decoding | series/index.html L52 | `decoding="async"` |

## 修改文件

| 文件 | 改动 |
|------|------|
| `index.html` | 11 张图全部补属性 + meta description + 清除空 src |
| `series/index.html` | Lightbox 图补 decoding + 清除空 src |

## 数量统计

| 属性 | 修复前 | 修复后 |
|------|--------|--------|
| `fetchpriority="high"` | 0 | 1 |
| `loading="lazy"` | 1 | 11 |
| `loading="eager"` | 0 | 1 |
| `decoding="async"` | 0 | 10 |
| `width`/`height` | 0 | 12 |
| `<meta name="description">` | 0 | 1 |
| 空 `src=""` | 10 | 0 |

## Lighthouse 预测

| 指标 | 修复前 | 修复后 |
|------|--------|--------|
| LCP | ~3.2s | ~2.5s |
| CLS | ~0.08 | ~0.02 |
| Performance | ~72 | ~82 |
| SEO | ~65 | ~75 |

## 剩余问题

- [ ] 图片仍是 JPEG，未走 AVIF/WebP（需 V3 Image 组件迁移）
- [ ] V4 页面（Home/Projects/Journal）未集成 renderImage()
- [ ] parallax RAF 无可见性暂停
- [ ] data.js 未 defer 加载
