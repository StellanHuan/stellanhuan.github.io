# Admin V2 — Photography CMS 设计文档

## 核心理念

从 **Code-First** 到 **Content-First**。

V1 的问题：`data.js` 是代码，编辑它 = 编辑代码。admin.html 只是 data.js 的可视化编辑器。本质上是"给代码加了个 GUI"，不是"管理系统"。

V2 的答案：后台围绕 **Content（内容）** 而非 **Code（代码）** 设计。所有数据存为 JSON/Markdown，网站只负责展示，后台负责内容。

## 架构

```
浏览器
  │
  ▼
Admin V2 CMS (纯前端 SPA)
  │
  ▼
JSON / Markdown 文件
  │
  ▼
Static Site Generator (构建)
  │
  ▼
Website (GitHub Pages)
```

后台永远不碰 JS 代码。用户只操作内容实体：Photo、Series、Project、Journal、Print、Exhibition。

---

## 功能模块

### 1. Dashboard

打开即见统计面板：

```
┌─────────────────────────────────────────┐
│              Stellan CMS                │
│                                         │
│  📷 照片   60    📚 系列   4            │
│  🗂 Project 2    ✍ Journal 8           │
│  🖼 Print   0    🏛 Exhibition 0        │
│                                         │
│  Last Deploy  2026-07-20                │
│  GitHub       Connected ✅              │
│  SEO          98/100                    │
│  Performance  100/100                   │
└─────────────────────────────────────────┘
```

- 每项数据实时从内容文件统计
- SEO/Performance 通过 Lighthouse API 自动检测（可选）
- Deploy 状态显示最近部署时间

### 2. Photos（照片库）

#### 2.1 网格视图
- 无限滚动网格（所有照片，不只 60 张）
- 每张卡片：缩略图 + 标题 + 系列标签 + 评分

#### 2.2 筛选系统
侧边栏多选过滤器：
```
☑ Tokyo      ☑ Portrait      ☑ Z8
☑ Zhengzhou  ☑ Street        ☑ DJI
☑ Luohe      ☑ Landscape     ☑ RICOH
☑ 2026       ☑ Aerial        ☑ iPhone
☑ 2025
☑ 2024
☑ 未使用照片
```
- **搜索**：文件名、标题、标签模糊搜索
- **多选**：Shift/Cmd 点击批量选择

#### 2.3 批量操作
- 批量添加/移除标签
- 批量修改系列
- 批量导出（ZIP 下载原图或压缩版）
- 批量删除

#### 2.4 图片上传
- 支持 RAW → 自动 Pipeline：
  ```
  RAW (上传)
    ↓
  JPEG (全尺寸，存 images/full/)
    ↓
  WebP (2000px，存 images/webp/)
    ↓
  AVIF (2000px，存 images/avif/)
    ↓
  Thumb (400px，存 images/thumb/)
    ↓
  Blur (40px base64，存 JSON 内联)
    ↓
  JSON (EXIF + GPS + 元数据)
    ↓
  SEO (自动生成 alt + og:image)
  ```

### 3. Sections（区块编辑器）

#### 3.1 Notion 风格拖拽
```
┌─ Sections ──────────────────────────────┐
│                                          │
│  Hero                                    │
│  ┌──────────────────────────────────┐   │
│  │         [ 照片 ]                 │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Featured                                │
│  ┌─────────┐ ┌─────────┐               │
│  │ [照片1] │ │ [照片2] │   ✚          │
│  └─────────┘ └─────────┘               │
│                                          │
│  Series                                  │
│  ┌ Portrait ────────────────────────┐   │
│  │ [照片] [照片] [照片] [照片]      │   │
│  └──────────────────────────────────┘   │
│  ┌ Street ──────────────────────────┐   │
│  │ [照片] [照片] [照片] [照片]      │   │
│  └──────────────────────────────────┘   │
│  ┌ Landscape ───────────────────────┐   │
│  │ [照片] [照片]                    │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Booking                                 │
│  ┌──────────┐┌──────────┐┌─────────┐   │
│  │ ¥398     ││ ¥1500    ││ +¥500   │   │
│  └──────────┘└──────────┘└─────────┘   │
│                                          │
│  拖照片到任意 Section                    │
│  拖 Section 排序                         │
└──────────────────────────────────────────┘
```

- **Section 排序**：Hero/Featured/Series/Booking/About/Contact 可拖拽重排
- **照片增删**：每个 Section 点 ✚ 添加，点 × 移除
- **实时预览**：右边同步显示网站效果

### 4. Gallery（批量管理）

- **拖拽排序**：在 Section 内拖拽照片调整顺序
- **复制**：一张照片可同时出现在多个 Section
- **批量操作**：选中多张 → 批量标签/系列/导出
- **未使用照片提示**：标注哪些照片未出现在任何 Section

### 5. Journal（摄影日志）

#### Markdown 编辑器
- 分屏：左编辑 / 右预览
- 字段：标题、日期、封面图、正文（Markdown）、标签
- 一键发布 → 构建时生成 HTML 页面
- 支持草稿状态（不在网站显示）

### 6. Project（摄影项目）

结构化编辑器：
```
项目名称：Tokyo Rain
简介：2025 年梅雨季的东京街头
地图：[GPS 坐标 / 交互地图]
封面图：[照片]
照片集：[Gallery]
EXIF 数据：[自动提取]
摄影思考：[Markdown]
```

### 7. Print（艺术微喷）

- 作品 → 选择尺寸（A4/A3/A2）→ 库存数量 → 价格 → 是否公开
- 后台自动生成 Print Store 页面

### 8. Exhibitions（展览）

- 展览名称、日期、地点、简介、海报、参展作品列表
- 自动生成展览页面

---

## 最核心功能：Live Preview

```
┌──────────────────┬──────────────────┐
│                  │                  │
│    Admin CMS     │    Live Preview  │
│    (左侧 50%)    │    (右侧 50%)    │
│                  │                  │
│  编辑标题...     │   网站实时变化   │
│  拖拽照片...     │                  │
│  改价格...       │                  │
│                  │                  │
└──────────────────┴──────────────────┘
```

- 改标题 → 网站立刻更新
- 拖照片 → 布局立刻变化
- 不需要导出、不需要 GitHub、不需要刷新

技术方案：Admin 运行在 iframe 中加载网站，数据变更通过 postMessage 实时同步。

---

## Deploy 系统

### 模式 A：连接 GitHub Token（全自动）
```
保存 → Commit → Push → GitHub Actions → Pages Deploy
```

### 模式 B：导出模式（半自动）
```
保存 → 下载 data.js → 手动替换 GitHub
```

### 模式 C：本地模式（无网络）
```
保存 → 本地 JSON 文件 → 本地预览
```

---

## Analytics（站点健康）

```
📊 Site Health

Photos        60     ✅
Projects       2     ✅
Articles       8     ✅
SEO Score     98     ✅
Image Size   27MB    ⚠️ >20MB
Dead Links     0     ✅
Lighthouse    92     ✅
Last Deploy   Today  ✅
```

---

## 技术选型建议

| 组件 | 方案 |
|------|------|
| 框架 | 纯 HTML/CSS/JS（与 V1 一致）或 Svelte（编译后零依赖） |
| Markdown | marked.js（12KB） |
| 图片处理 | 浏览器端 Canvas + Web Worker（不依赖后端） |
| 拖拽 | 原生 HTML5 Drag & Drop API |
| 数据存储 | LocalStorage + JSON 文件导出 |
| 预览 | iframe + postMessage |
| 部署 | GitHub API（需要 Token）或手动导出 |

---

## 文件结构（Admin V2）

```
admin-v2/
├── index.html              ← Admin 入口
├── css/
│   └── admin.css           ← 后台专用样式
├── js/
│   ├── app.js              ← 主应用
│   ├── router.js           ← 路由（Dashboard/Photos/Sections/...）
│   ├── store.js            ← 状态管理
│   ├── api.js              ← 数据读写
│   ├── preview.js          ← Live Preview
│   ├── deploy.js           ← 部署
│   ├── pipeline.js         ← 图片处理
│   └── analytics.js        ← 站点健康
├── components/
│   ├── Dashboard.js
│   ├── PhotoGrid.js
│   ├── PhotoFilter.js
│   ├── SectionEditor.js
│   ├── MarkdownEditor.js
│   ├── ProjectEditor.js
│   └── PrintManager.js
└── data/
    └── (运行时存储在 LocalStorage)
```
