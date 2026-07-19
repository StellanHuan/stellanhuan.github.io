# Foundation Report — V2 工程结构初始化

> 执行日期：2026-07-19
> 版本：V2 Foundation
> 原则：创建结构，不修改任何现有文件（index.html / CSS / JS / images）

---

## 一、新增目录（8 个）

| 目录 | 用途 |
|------|------|
| `docs/` | 项目文档中心 |
| `src/` | 未来重构源码 |
| `src/components/` | 可复用组件（导航、卡片、画廊等） |
| `src/layouts/` | 页面布局模板 |
| `src/pages/` | 各页面入口 |
| `src/styles/` | 拆分的 CSS 模块 |
| `src/scripts/` | 拆分的 JS 模块 |
| `src/data/` | 数据结构与常量 |
| `content/` | 用户可编辑内容 |
| `content/series/` | 系列作品内容 |
| `content/projects/` | 项目案例 |
| `content/journal/` | 摄影日志 |
| `content/prints/` | 打印/作品销售 |
| `content/exhibitions/` | 展览记录 |
| `public/` | 静态资源与 SEO 文件 |

---

## 二、新增文件（22 个，全部空文件）

### docs/ (9 个)
| 文件 | 计划内容 |
|------|---------|
| `ROADMAP.md` | 版本规划和里程碑 |
| `ARCHITECTURE.md` | 系统架构、组件树、数据流 |
| `DESIGN_SYSTEM.md` | 色彩、字体、间距、动效规范 |
| `BRAND.md` | 品牌定位、调性、声音 |
| `CONTENT.md` | 内容策略、文案指南 |
| `SEO.md` | SEO 配置、结构化数据 |
| `PERFORMANCE.md` | 性能优化策略与指标 |
| `CMS.md` | 内容管理系统方案 |
| `CHANGELOG.md` | 版本变更记录 |

### src/ (6 个子目录，空)
| 目录 | 计划内容 |
|------|---------|
| `src/components/` | Nav、Hero、Gallery、BookingCard、Timeline 等 |
| `src/layouts/` | BaseLayout、SeriesLayout |
| `src/pages/` | Home、Series、About |
| `src/styles/` | variables.css、typography.css、animations.css |
| `src/scripts/` | i18n.js、parallax.js、gallery.js |
| `src/data/` | photos.json、i18n.json |

### content/ (5 个子目录，空)
| 目录 | 计划内容 |
|------|---------|
| `content/series/` | portrait.md、street.md 等 系列描述 |
| `content/projects/` | 独立项目案例 |
| `content/journal/` | 摄影日志/博客 |
| `content/prints/` | 作品售卖页面 |
| `content/exhibitions/` | 参展记录 |

### public/ (3 个)
| 文件 | 计划内容 |
|------|---------|
| `public/robots.txt` | `Allow: /` + Sitemap 引用 |
| `public/manifest.json` | PWA manifest（图标、主题色） |
| `public/404.html` | 自定义 404 错误页 |

---

## 三、未修改文件确认

| 文件 | 状态 |
|------|------|
| `index.html` | ✅ 未修改（mtime: 1784477411，44,150 bytes） |
| `series/index.html` | ✅ 未修改 |
| `admin.html` | ✅ 未修改 |
| `data.js` | ✅ 未修改 |
| `data.json` | ✅ 未修改 |
| `PROJECT.md` | ✅ 未修改 |
| `AUDIT.md` | ✅ 未修改 |
| `images/` (60张) | ✅ 未修改 |
| 所有 CSS | ✅ 未修改（内嵌于 HTML 中） |
| 所有 JS | ✅ 未修改（内嵌于 HTML 中） |

---

## 四、目录树（V2 Foundation 就位后）

```
website/
├── .gitignore
├── index.html              ← V1 主站（未修改）
├── admin.html              ← V1 后台（未修改）
├── data.js                 ← V1 数据配置（未修改）
├── data.json               ← V1 数据备份（未修改）
├── PROJECT.md              ← V1 项目文档
├── AUDIT.md                ← V1 审计报告
├── FOUNDATION_REPORT.md    ← 本文件
├── images/                 ← 60 张照片（未修改）
├── series/
│   └── index.html          ← V1 系列页（未修改）
│
├── docs/                   ← 🆕 V2 文档中心
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── BRAND.md
│   ├── CONTENT.md
│   ├── SEO.md
│   ├── PERFORMANCE.md
│   ├── CMS.md
│   └── CHANGELOG.md
│
├── src/                    ← 🆕 V2 源码（空）
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── scripts/
│   └── data/
│
├── content/                ← 🆕 V2 内容层（空）
│   ├── series/
│   ├── projects/
│   ├── journal/
│   ├── prints/
│   └── exhibitions/
│
└── public/                 ← 🆕 V2 静态资源
    ├── robots.txt
    ├── manifest.json
    └── 404.html
```

---

## 五、下一步建议

1. **填写 docs/** — 从 PROJECT.md 和 AUDIT.md 提取信息填入各文档
2. **创建 src/data/photos.json** — 从 data.js 迁移数据结构
3. **实现 public/robots.txt** — 解决 P0 SEO 问题
4. **创建 src/styles/variables.css** — 提取 197 条 CSS 规则中的变量
5. **实现 src/scripts/i18n.js** — 从 HTML 中 116 处 data-lang 提取为统一模块

---

> **结论**：V2 工程结构已就位。22 个文件、8 个新目录，全部空。现有 V1 网站零改动。随时可以开始往新结构中迁移代码。
