# 瓛瓛个人摄影网站 · 项目全貌

## 终极目标
一个能代表「瓛瓛 Stellan」个人品牌的独立摄影网站。三语切换（中/日/英），作品展示 + 写真预约 + 联系方式。设计参考导师有元慎也（arimotoshinya.com）的极简哲学 + Apple 流体界面原则。目标受众：潜在约拍客户、策展人、粉丝。

---

## 当前版本
**线上地址**：https://stellanhuan.github.io
**GitHub仓库**：https://github.com/StellanHuan/stellanhuan.github.io
**本地路径**：`/Users/stellan/Desktop/OH-WorkSpace/portfolio/website/`

## 技术栈
- 纯 HTML/CSS/JS（无框架，零依赖）
- GitHub Pages 托管（免费）
- 照片来源：Mac Photos App（Nikon Z8 主力，5552张总库）
- 照片筛选：Apple Photos.sqlite 美学评分（ZOVERALLAESTHETICSCORE）
- 图片压缩：sips → 2000px 宽 JPEG 82%

## 照片素材
- 总库 5552 张（Nikon Z8 4500万像素为主，另有 DJI/RICOH GXR/iPhone）
- 本地高分横版：673 张可选
- 已部署：60 张（前30在用，后30备选），评分 0.87~1.00，平均 0.90
- 管理员可在 admin.html 中从 60 张拖拽分配到各区块

---

## 网站结构（从上到下）

### 导航栏
- 左：Stellan（斜体艺术字，金色发光）
- 右：作品 | 关于 | 预约 | 联系 · 语言下拉（中/日/EN，默认中文）
- 毛玻璃 backdrop-filter: blur(16px)
- 向下滚动自动隐藏，向上显示

### Hero（全屏封面）
- 全屏照片背景 + 渐变遮罩
- 「瓛瓛」大标题 → Stellan → 金线横拉 → 描述文字
- 页面加载时 staggered 渐现：
  - 0ms：标题模糊→清晰 + 上浮
  - 250ms：副标题淡入
  - 500ms：金线 scaleX 展开
  - 650ms：描述文字淡入

### 引用区（有元慎也）
- 三语版本（zh/ja/en）
- 滚动到视口时逐字浮现（每个字 0.03s 间隔），「不看地图」金色高亮
- ja版原文：「写真を撮りながら街を歩く時は地図を見ない。そもそも目的地などないわけなので地図を見たところで仕方がない。」

### 全屏大图
- 滚动驱动缩放效果：图片从 scale(1.08) 缩到 scale(1)
- 暗角（vignette）同步消散
- 像镜头对焦的视觉体验

### 01 目光所及（精选作品区块）
- 非对称 Duo 布局：左 1.5:1 + 右 1:1
- 每张图 hover：
  - 照片 spring 缩放 1.03
  - 底部暗色遮罩从底部滑入（translateY 12px→0）
  - 显示中文标题 + 设备信息
  - 左上角金色标签半透明退让
- 「阅读更多 →」按钮 → 跳转 series/#portrait

### 02 街头的呼吸（水平滚动画廊）
- 16:9 横版卡片，触控板原生横向滑动
- scroll-snap 定位 + 底部圆点指示器（当前卡片高亮）
- 鼠标拖拽 + 惯性衰减（velocity * 0.92 逐帧衰减）
- 「阅读更多 →」→ series/#street

### 03 大地与天空（景观+航拍）
- 同上非对称 Duo 布局：左 flex:1 + 右 flex:1.7
- LANDSCAPE / AERIAL 标签
- 「阅读更多 →」→ series/#landscape

### 04 写真预约（沉浸式照片卡）
- 三张卡片并排：PORTRAIT（大，flex:1.3）/ EVENT / AERIAL
- 每张卡片：
  - 上半：作品照片（hover 时 scale 1.04）
  - 下半：毛玻璃信息区（标签 + 价格 + 描述 + 「点击查看作品 →」）
- 整卡 hover 上浮 2px + 阴影弹出
- 定价：¥398 / ¥1500（半天）/ +¥500
- 底部三步流程：① 微信联系 → ② 沟通需求 → ③ 拍摄交付
- 每张卡片链接到对应系列页（series/#portrait 等）

### 05 关于
- 左图右文布局
- 竖幅 3:4 照片（每 6 秒自动轮换）
- 右侧：引文 + 时间线双列网格（1999/2022 | 2025/Now）
- 标签云（Nikon Z8 / DJI / RICOH GXR / 东京 / 郑州 / 漯河），hover 浮起 + 金色描边
- CURRENTLY 卡片（📍郑州 · 📷Nikon Z8 · 🎓师从有元慎也）

### 联系区
- 卡片式布局：微信 / 地区 / 服务 各一行
- 「复制微信号」按钮 → 点击复制 S0688888860 到剪贴板 → 显示 ✓ 已复制

### Footer
- © 2026 瓛瓛 HuanHuan · 有元慎也に師事 · 光を追いかけて

---

## 交互设计细节
- **全局胶片颗粒**：固定 SVG feTurbulence 纹理叠加，opacity 0.035
- **滚动揭示**：opacity 0→1 + translateY 36px→0 + scale 0.97→1，easing: cubic-bezier(.16,1,.3,1)，threshold 0.12
- **视差滚动**：parallax 元素用 translate3d 做 GPU 加速视差，不同 speed 参数
- **导航毛玻璃**：backdrop-filter: blur(16px) saturate(.8)，背景 rgba(8,6,4,.7)
- **顶部滚动进度条**：金色 1.5px 线，随滚动 0%→100%
- **Hero 滚动渐隐**：随滚动 opacity 降到 0.6
- **图片加载**：opacity 0 初始 + transition 0.6s fade in；首屏外图片 fetchpriority=low + decoding=async
- **所有 easing**：使用 Apple 风格的 cubic-bezier(.16,1,.3,1) ≈ damping 1.0 spring

## 配色系统
- --bg: #080604（深层黑褐）
- --gold: #b8934f / --gold-light: #d4b978 / --gold-dim: #7a6238
- --text: #d4cec4 / --text-dim: #9a9288 / --text-bright: #e8e0d4
- --border: rgba(184,147,79,.12)

## 多语言系统
- 语言切换 CSS 规则（html 标签 data-current-lang 属性驱动）：
  `html[data-current-lang="zh"] [data-lang="ja"] { display:none!important }`（六条规则覆盖所有组合）
- JS 只改变 `document.documentElement.setAttribute('data-current-lang', lang)`
- 导航栏语言选择器：下拉菜单，点击展开/收起
- 所有文案三语版本：中文（默认）/ 日本語 / English

---

## 项目文件结构

```
website/
├── index.html          ← 主页面
├── data.js             ← 可编辑内容配置（照片标题、分类、区块分配）
├── data.json           ← data.js 的 JSON 版本（备用）
├── admin.html          ← 可视化后台管理（拖拽照片分配，改标题）
├── favicon.svg         ← 相机图标
├── series/
│   └── index.html      ← 系列页（通过 hash #portrait/#street 等切换）
└── images/
    └── web_001~060.jpeg ← 60张压缩照片（2000px宽，共26.6MB）
```

## 系列页（series/index.html）
- 通过 URL hash 切换（#portrait/#street/#landscape/#aerial）
- 网格布局 + staggered 入场动画（每张 0.06s 间隔）
- hover 底部遮罩滑入 + 标题 + 设备信息
- 点击 → 全屏 Lightbox + 键盘 ← → 翻页 + Esc 关闭
- 「← 返回主页」导航

---

## 内容管理系统（admin.html）
- 左侧：60 张照片缩略图网格（点击编辑标题/分类/标签）
- 右侧：每个区块拖放区（从左侧拖照片到目标区块）
- 右上角「导出并下载 data.js」
- 操作流程：拖拽 → 导出 → 去 GitHub 替换 data.js → 提交 → 网站更新

---

## 部署流程
```bash
# 本地修改后推送
cd ~/Desktop/OH-WorkSpace/portfolio/website
git add -A && git commit -m "update" && git push

# 网站自动部署到 https://stellanhuan.github.io
```

---

## 已实现功能清单
✅ 三语切换（中/日/EN）下拉菜单
✅ 分级排版：Hero → 引用 → 全屏大图 → Duo → 水平滚动 → Duo → 预约卡 → 关于 → 联系
✅ Apple 流体动画（自定义 cubic-bezier、spring hover、视差、clip-path 揭示）
✅ 照片按 Apple AI 美学评分自动选 TOP60
✅ 可视化后台管理（admin.html）
✅ 系列子页（4 个系列，hash 路由）
✅ 水平滚动画廊（scroll-snap + 惯性拖拽 + 圆点指示器）
✅ 写真预约区（照片卡片 + 三步流程 + 定价）
✅ 关于区时间线 + CURRENTLY 卡片 + 照片轮换
✅ 全屏大图滚动缩放 + 暗角消散
✅ 引文逐字浮现动画
✅ Hero 电影片头 staggered 渐现
✅ 联系区「复制微信号」按钮
✅ 导航毛玻璃 + 滚动隐藏 + 进度条
✅ 胶片颗粒纹理
✅ 移动端响应式（768px 断点）
✅ GitHub Pages 部署（stellanhuan.github.io）

---

## 已知问题 + 待优化

### 高优先级
- [ ] admin.html 备用池的照片标记为"备用"，且后台需要支持预览大图
- [ ] 系列页（series/index.html）的照片分配也需要从 data.js 读取，目前是硬编码 offset
- [ ] "阅读更多"链接的系列页照片和主页面区块照片不匹配（PORTRAIT 卡片去的是 series/#portrait，但系列页显示的照片不是同一批）
- [ ] 移动端预约卡三列变单列时卡片太高
- [ ] 照片标题目前是自动生成的日语标题（「光の粒子」等），需要瓛瓛根据实际内容手动修改

### 中优先级
- [ ] 没有 Instagram/小红书等社交链接图标
- [ ] footer 没有返回顶部按钮
- [ ] 水平滚动区没有键盘快捷键提示
- [ ] 没有暗色/亮色模式切换
- [ ] 没有 SEO 优化（sitemap、robots.txt、结构化数据）
- [ ] 联系区缺少邮箱

### 低优先级
- [ ] 字体加载优化（当前依赖系统字体）
- [ ] 404 页面
- [ ] 加载骨架屏
- [ ] 照片 EXIF 信息展示
- [ ] 评论区/留言板

---

## 设计体系（供参考）
- 设计哲学：Apple Fluid Interfaces（WWDC 2018）+ Emil Kowalski Design Engineering
- 动效原则：spring > fixed-duration，damping 1.0 默认，0.8 仅在手势驱动时
- 响应原则：pointer-down 即时反馈，不做延迟动画
- 空间原则：进入/退出同一路径，transform-origin 锚定触发源
- 触感原则：毛玻璃叠加、胶片颗粒纹理、金色点缀不超过版面 5%
