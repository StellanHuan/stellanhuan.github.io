# 项目进度总结 — 2026-07-20 02:17

## 线上地址
- 网站：https://stellanhuan.github.io
- 后台：https://stellanhuan.github.io/admin-v2/
- GitHub：https://github.com/StellanHuan/stellanhuan.github.io
- 审计：https://github.com/StellanHuan/stellanhuan.github.io/blob/main/AUDIT.md
- 项目文档：https://github.com/StellanHuan/stellanhuan.github.io/blob/main/PROJECT.md

## 数据
- 照片池：150 张（120 横版 + 30 竖版），Apple AI 美学评分 0.81~1.00
- 文件：web_001~150.jpeg，2000px 宽，总 71MB
- 来源：Mac Photos App → Photos.sqlite → Python 脚本自动筛选 → sips 压缩

---

## 网站（V1，已完成，线上运行）
- 单文件 708 行 index.html，纯 HTML/CSS/JS，零依赖
- 三语切换（中/日/EN），html data-current-lang 属性驱动 + 下拉菜单
- 页面结构：Hero → 引文（有元慎也）→ 全屏大图 → 01 目光所及 → 02 街头的呼吸 → 03 大地与天空 → 04 写真预约 → 05 关于 → 联系
- Apple Fluid 动画体系：spring easing、视差、clip-path reveal、滚动进度条
- 写真预约区：三张沉浸式照片卡（¥398 / ¥1500 / +¥500）+ 三步流程
- 系列子页：series/index.html，hash 路由（#portrait/#street/#landscape/#aerial）
- 已知问题：74 处内联样式、series 页不读 data.js、缺 robots/sitemap/404、og:image 文件缺失

---

## Admin V2（后台管理系统，已完成核心功能）
- 单文件，纯前端 SPA，hash 路由
- 侧边栏导航：Dashboard / Photos / Sections / Journal / Projects / Prints / Exhibitions / Settings
- 数据持久化：LocalStorage（元数据）+ IndexedDB（上传的照片预览）
- 导出：一键下载 data.js + 自动下载上传照片

### 各页面功能
| 页面 | 功能 |
|------|------|
| Dashboard | 150 照片 / 9 区块 / Projects/Prints/Exhibitions 实时统计 |
| Photos | 150 张网格 + 系列/标签/搜索筛选 + 单击多选 + 批量标签/系列/删除 + 本地上传 + 删除 + 视图尺寸切换(S/M/L) |
| Sections | 9 区块 Notion 式拖拽编辑，从未使用池拖照片进区块，点 × 移除 |
| Journal | 左右分屏 Markdown 编辑器 + 预览 + 导出 .md |
| Projects | 新建/编辑/删除项目（名称/简介/EXIF/笔记） |
| Prints | 作品管理（尺寸 A4/A3/A2 / 库存 / 价格 / 公开开关） |
| Exhibitions | 展览管理（名称/日期/地点/简介） |
| Settings | 站点信息 + SEO 状态 + 导出全部 JSON + 重置编辑 |
| Deploy | 侧边栏 🚀 导出 data.js，自动清理上传元数据 |

### 上传照片流程
1. 点 📤 本地上传 → 选照片
2. 浏览器自动下载照片文件
3. 拖到项目的 images/ 文件夹
4. 导出 data.js → 替换 GitHub 上的同名文件

### 手机端
- 768px 以下侧边栏变顶部横滚、照片网格缩小、筛选器横排可滑

---

## V2 工程结构（docs/ src/ content/ public/ 已创建，空文件待填）
- 路线图：docs/ROADMAP.md（V1→V1.1→V2→V2.5→V3）
- 架构：docs/ARCHITECTURE.md（Content-First 三层架构）
- CMS 设计：docs/CMS.md（Admin V2 完整设计文档）

---

## 待完成
- [ ] series 页同步 data.js（当前硬编码偏移量）
- [ ] 网站 favicon 路径修正
- [ ] 网站 og:image 文件创建
- [ ] robots.txt / sitemap.xml / 404.html 填写内容
- [ ] 网站 74 处内联样式重构（预约区全写死在 HTML 里）
- [ ] 图片转 WebP 格式（71MB → 预计 35MB）
- [ ] Admin V2 的 Live Preview（iframe 实时预览）
- [ ] Admin V2 的图片自动压缩 Pipeline
- [ ] Admin V2 与 GitHub API 打通（一键部署不手动替换文件）

---

## 技术栈
- 纯 HTML/CSS/JS，零框架，零构建工具
- 数据格式：JSON（data.js / data.json）
- 存储：LocalStorage + IndexedDB（浏览器端）
- 部署：GitHub Pages（git push 即上线）
- 图片处理：sips（macOS 内置）+ Python 脚本
