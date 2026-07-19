# Image Pipeline Report — V2.2

> 执行日期：2026-07-20
> 工具：Python Pillow + pillow-avif-plugin

---

## 原始图片

| 项目 | 数值 |
|------|------|
| 数量 | 150 张 |
| 格式 | JPEG，2000px 宽 |
| 原始总大小 | **71.2 MB** |
| 来源 | `images/web_001~150.jpeg`（Apple Photos 美学评分筛选 + sips 压缩） |

---

## 转换结果

| 格式 | 数量 | 总大小 | vs 原始 | 压缩率 | 质量设置 | 用途 |
|------|------|--------|---------|--------|---------|------|
| **Original** (JPEG) | 150 | 71.2 MB | — | — | — | 存档 / 下载 |
| **WebP** | 150 | **23.1 MB** | −48.1 MB | **68%** | quality=80 | 网站首选 |
| **AVIF** | 150 | **17.1 MB** | −54.1 MB | **76%** | quality=60 | 支持 AVIF 的浏览器 |
| **Thumb** (WebP 400px) | 150 | **1.6 MB** | −69.6 MB | **98%** | quality=75 | 网格/列表缩略图 |

---

## 目录结构

```
assets/images/
├── original/          ← 150 JPEG (71.2MB) — 原始备份
├── webp/              ← 150 WebP (23.1MB) — 主展示格式
├── avif/              ← 150 AVIF (17.1MB) — 现代浏览器优化
└── thumb/             ← 150 WebP 缩略图 (1.6MB) — 网格/列表
```

文件命名保持一致：`web_001.jpeg` → `web_001.webp` / `web_001.avif` / `web_001.webp`

---

## 前端接入建议

### 当前（V2.1）
```html
<img src="images/web_001.jpeg" alt="">
```
→ 加载 2000px JPEG，单张 200-500KB

### 建议（V2.2+）
```html
<picture>
  <source srcset="assets/images/avif/web_001.avif" type="image/avif">
  <source srcset="assets/images/webp/web_001.webp" type="image/webp">
  <img src="images/web_001.jpeg" alt="" loading="lazy" width="1600" height="1067">
</picture>
```
→ AVIF 优先（最小），WebP 备选，JPEG 兜底

### 缩略图
```html
<img src="assets/images/thumb/web_001.webp" alt="" loading="lazy">
```
→ 400px 缩略图，用于网格/列表，减少首屏载荷

### 预估收益
- 首页 30 张图从 **~14MB → ~4.6MB**（WebP）或 **~3.4MB**（AVIF）
- 缩略图网格从 **14MB → ~320KB**
- Lighthouse Performance 提升 15-20 分

---

## 自动化

运行以下命令重新处理全部图片：

```bash
python3 scripts/build_images.py
```

脚本自动：
1. 读取 `images/*.jpeg`
2. 生成 WebP / AVIF / Thumb 到 `assets/images/`
3. 输出统计

---

## 依赖

```bash
pip3 install Pillow pillow-avif-plugin
```

---

## 文件列表（前 5 和后 5）

| # | 文件 | Original | WebP | AVIF | Thumb |
|---|------|----------|------|------|-------|
| 1 | web_001 | 329KB | 118KB | 85KB | 6KB |
| 2 | web_002 | 353KB | 132KB | 98KB | 7KB |
| 3 | web_003 | 696KB | 248KB | 182KB | 12KB |
| 4 | web_004 | 175KB | 62KB | 48KB | 4KB |
| 5 | web_005 | 667KB | 241KB | 175KB | 11KB |
| ... | ... | ... | ... | ... | ... |
| 148 | web_148 | 311KB | 98KB | 72KB | 5KB |
| 149 | web_149 | 244KB | 78KB | 58KB | 4KB |
| 150 | web_150 | 308KB | 101KB | 74KB | 5KB |
