# StellanHuan Photography — Roadmap

## V1 (当前线上版本)
- [x] 主站 index.html（708行单文件）
- [x] 三语切换（中/日/EN）
- [x] Apple 流体动画（spring、视差、reveal）
- [x] 60 张照片素材（Apple 美学评分 TOP 60）
- [x] 写真预约区块 + 定价卡
- [x] 系列子页（hash 路由）
- [x] data.js 数据配置
- [x] admin.html 可视化编辑器
- [x] GitHub Pages 部署（stellanhuan.github.io）
- [x] 移动端响应式（768px 断点）

## V1.1 (维护阶段 — 当前)
- [ ] P0: favicon 路径修复
- [ ] P0: og:image 文件创建
- [ ] P0: robots.txt + sitemap.xml + 404.html
- [ ] P0: 添加 `<meta name="description">`
- [ ] P1: 图片转 WebP（27MB → 12MB）
- [ ] P1: series 页同步 data.js
- [ ] P1: 视差 RAF 可见性优化
- [ ] P1: 复制微信号不刷新页面

## V2 (工程化重构)
- [ ] 创建 V2 目录结构（✅ 已完成）
- [ ] 拆分 index.html → 模块化组件
- [ ] 提取 CSS 变量到 src/styles/variables.css
- [ ] 提取 i18n 到 src/scripts/i18n.js
- [ ] 创建 src/data/photos.json 正式数据文件
- [ ] 网站和后台共享数据层
- [ ] 消除 74 处内联样式
- [ ] 统一组件 API

## V2.5 (Admin V2 — Photography CMS)
- [ ] Dashboard 统计面板
- [ ] Photos 照片库（搜索/筛选/批量操作）
- [ ] Sections 区块编辑器（Notion 风格拖拽）
- [ ] Live Preview（实时预览）
- [ ] Image Pipeline（RAW→JPEG→WebP→AVIF→Thumb）
- [ ] Journal（Markdown 编辑器）
- [ ] Project 编辑器
- [ ] Print 管理
- [ ] Exhibitions 管理
- [ ] 一键 Deploy（GitHub Token 或导出）
- [ ] Analytics 站点健康检查

## V3 (生态扩展)
- [ ] Instagram 自动同步
- [ ] 多语言自动翻译（AI 辅助）
- [ ] CDN 加速（Cloudflare Pages）
- [ ] 自定义域名 stellanhuan.com
- [ ] 邮件订阅
- [ ] 在线预约系统
- [ ] 客户画廊（密码保护）
