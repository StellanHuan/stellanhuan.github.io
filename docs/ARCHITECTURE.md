# Architecture — Content-First System

## 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                     Photography CMS (Admin V2)                  │
│  Dashboard │ Photos │ Sections │ Journal │ Projects │ Settings │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    写入 JSON / MD
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Content Layer (文件系统)                      │
│  data/photos.json   content/journal/*.md   content/projects/     │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                      Static Site Gen (可选)
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                   Website (GitHub Pages)                         │
│  纯静态 HTML/CSS/JS，零运行时依赖，只负责展示                     │
└──────────────────────────────────────────────────────────────────┘
```

## 核心原则

1. **Content vs Code** — 用户操作的是 Photo/Series/Project/Journal，不是 data.js
2. **单文件可部署** — 最终产物仍是纯静态文件，兼容 GitHub Pages
3. **后台渐进增强** — Admin V2 可用可不用，网站独立运行
4. **数据驱动 UI** — 所有页面从 JSON 渲染，无硬编码

## 数据流

```
用户操作 (Admin V2)
    │
    ▼
Content Store (LocalStorage)
    │
    ├──→ 实时预览 (iframe postMessage)
    │
    └──→ 导出
          │
          ├── data/photos.json
          ├── data/i18n.json
          ├── content/journal/*.md
          └── content/projects/*.json
                │
                ▼
          GitHub Push
                │
                ▼
          GitHub Pages Deploy
```

## 组件树（V2 网站前端）

```
<BaseLayout>
  ├── <Nav />
  │     ├── Logo
  │     ├── NavLinks (Work / About / Booking / Contact)
  │     └── LangSwitcher
  ├── <Hero />
  ├── <Quote />
  ├── <FullBleedImage />
  ├── <FeaturedDuo />
  ├── <HorizontalScroll />
  ├── <LandscapeDuo />
  ├── <BookingCards />
  ├── <AboutSection />
  │     ├── PhotoCarousel
  │     ├── Timeline
  │     └── TagCloud
  ├── <ContactSection />
  └── <Footer />
```

## 技术栈决策

| 层面 | V1 (当前) | V2 (目标) |
|------|----------|----------|
| 构建 | 无 | 无（保持纯静态） |
| 框架 | 无 | 无（保持零依赖） |
| CSS | 内嵌 197 条规则 | 拆分为 variables.css + 组件 CSS |
| JS | 内嵌 ~170 行 | 拆分为模块（i18n / parallax / gallery） |
| 数据 | data.js (window 全局) | data/photos.json (fetch 加载) |
| 后台 | admin.html (data.js 编辑器) | Admin V2 (Content CMS) |
| 部署 | git push | git push（不变） |

## 关键设计决策

1. **不引入构建工具** — 保持 GitHub Pages 零配置部署
2. **不引入框架** — 当前 43KB 的 index.html 已快速加载
3. **admin-v2/ 为独立目录** — 不影响现有网站
4. **数据格式 JSON** — 不引入数据库，文件即数据
5. **图片处理浏览器端** — Canvas API + Web Worker，不上传服务器
