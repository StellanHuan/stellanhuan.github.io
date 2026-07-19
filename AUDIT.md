# 🔍 完整审计报告 — stellanhuan.github.io

> 生成时间：2026-07-19
> 审计范围：`/Users/stellan/Desktop/OH-WorkSpace/portfolio/website/`
> 分析方法：纯静态分析，未修改任何文件

---

## 1. 完整目录树

```
website/
├── .gitignore                    (21B)
├── PROJECT.md                    (9.2KB, 221行)
├── admin.html                    (8.2KB, 159行)
├── data.js                       (9.7KB, 541行)
├── data.json                     (9.6KB, 539行)
├── favicon.svg                   (未出现在文件列表 — 可能被 gitignore 或在父目录)
├── index.html                    (43KB, 708行)
├── images/
│   ├── web_001.jpeg (328KB)
│   ├── web_002.jpeg (353KB)
│   ├── ...
│   └── web_060.jpeg (244KB)
└── series/
    └── index.html                (7.4KB)
```

---

## 2. HTML 页面及职责

| 文件 | 职责 | 大小 | 行数 |
|------|------|------|------|
| `index.html` | 主站首页，含 Hero/引用/作品/预约/关于/联系 全部区块 | 43KB | 708 |
| `series/index.html` | 系列子页，通过 hash 切换 portrait/street/landscape/aerial | 7.4KB | — |
| `admin.html` | 可视化后台管理，60张照片拖拽分配、编辑标题/分类 | 8.2KB | 159 |

**重要发现**：`admin.html` 未被 git 跟踪（或已在 git 中但路径确认需要核实）。

---

## 3. CSS 分析

### 引用关系
- **无外部 CSS 文件**：所有样式均内嵌于 `<style>` 标签（单文件架构）
- `index.html`：197 条 CSS 规则，全部在 `<head>` 中的 `<style>` 块
- `series/index.html`：独立 `<style>` 块
- `admin.html`：独立 `<style>` 块

### 内联样式污染
- **74 处内联 `style="..."` 属性**（极高）
- 集中在写真预约区（`.booking-cards` 及内部卡片），大量 `padding`、`flex`、`color` 写死在 HTML 中
- 此区域经历了多次迭代（3列→大卡→照片卡），每次改动都用内联样式快速实现，未重构为 CSS class

### 不可维护的 CSS
- 写真预约区（`#booking`）的卡片样式全部在 HTML 中，无法复用
- `data-current-lang` 语言切换依赖 `!important` 优先级（6 条规则），架构脆弱

---

## 4. JavaScript 分析

### 文件与依赖
| 文件 | 行数 | 依赖 |
|------|------|------|
| `data.js` | 541 | 无（纯数据声明，赋值到 `window.SITE_DATA`） |
| `index.html` (内嵌) | ~170 行 JS | **依赖 `data.js` 先加载**（`<script src="data.js"></script>`） |
| `series/index.html` (内嵌) | ~80 行 JS | **不依赖 `data.js`** — 硬编码了 30 张照片路径 |
| `admin.html` (内嵌) | ~70 行 JS | **依赖 `data.js` 先加载** |

### 关键问题
- **`series/index.html` 未读取 `data.js`**：照片固定用 `web_001~030` 的 offset 分组，与主页 data.js 的照片分配**不同步**
- **`index.html` 中 18 个 `getElementById` 调用**：无 null 检查，任一个元素缺失即抛异常（已有 2 个使用了 `?.` 可选链）
- **`aboutImg` 重复获取**：两个地方分别调用了 `getElementById('aboutImg')`
- **`copyWechat` 按钮的恢复逻辑用 `location.reload()`**：用户复制后整个页面刷新，体验粗暴
- **全局变量污染**：`P`、`sec`、`hscroll`、`DATA` 等变量在全局作用域

### 关键 Bug
- `aboutImg` 轮换逻辑在页面加载时可能访问到不存在的 `P` 数组索引（`P` 由 `SITE_DATA.photos.map(p=>p.file)` 生成，但 admin.html 不创建 `sec` 对象）

---

## 5. 图片资源统计

| 项目 | 数值 |
|------|------|
| 总数 | 60 张 |
| 格式 | 全部 JPEG |
| 尺寸 | 2000px 宽（通过 sips 压缩，原始为 8256×5504 Nikon Z8 原片） |
| 总大小 | **27MB** |
| 大小范围 | 150KB ~ 1.6MB |
| 平均大小 | ~460KB/张 |
| 最大文件 | web_023.jpeg (1.6MB) |
| 最小文件 | web_046.jpeg (150KB) |

### 问题
- **无 WebP 格式**：27MB 对移动端不友好，换成 WebP 可减少 40-60%
- **无响应式图片**：没有 `<picture>` 或 `srcset`，移动端也加载 2000px 宽图片
- **最大文件 1.6MB**：单张超过 Google Lighthouse 推荐的 1MB 上限
- **全部图片用 `loading="lazy"`**：但 Hero 封面图应该是 `eager`

---

## 6. JSON 数据结构

```json
{
  "photos": [
    {
      "file": "images/web_001.jpeg",
      "title": "光的粒子",
      "series": "portrait",
      "tags": ["人像", "自然光"]
    }
    // ... ×60
  ],
  "sections": {
    "hero": ["web_001.jpeg"],
    "featured": ["web_002.jpeg", "web_003.jpeg"],
    "hscroll": ["web_007.jpeg", ...],       // 7 张
    "landscape": ["web_005.jpeg", "web_029.jpeg"],
    "aerial": ["web_020.jpeg", "web_027.jpeg"],
    "about": ["web_008.jpeg"],
    "booking_portrait": ["web_001.jpeg"],
    "booking_event": ["web_015.jpeg"],
    "booking_aerial": ["web_004.jpeg"]
  }
}
```

### 问题
- **`hero` 和 `booking_portrait` 共用同一张照片**（web_001.jpeg），两个位置视觉重复
- **`hscroll` 有 7 张但 `featured` 只有 2 张**，配比不均衡
- **60 张中仅 17 张被 `sections` 引用（28%）**，43 张标记「备用」但从未使用
- **无照片顺序字段**：`sections` 中照片按数组顺序显示，但无 `order` 字段

---

## 7. 重复代码

| 类型 | 位置 | 影响 |
|------|------|------|
| `data-lang` 三语 block | index.html 中 116 处 | 每加一种语言需改 N 处 |
| 内联 style="..." | index.html 74 处 | 无法复用，修改需全局搜索 |
| photo 循环生成 | series/index.html 硬编码 | 与主页逻辑不同，两套代码 |
| `getElementById` | index.html 18 次 | 无封装，重复字符串 |
| parallax RAF loop | index.html 独立实现 | 无通用动画工具函数 |

---

## 8. 无用文件

| 文件 | 理由 |
|------|------|
| `data.json` | 功能与 `data.js` 完全重复，仅作为数据备份。`admin.html` 和 `index.html` 都不读取 `data.json`，只读 `data.js` |
| `PROJECT.md` | 项目文档，不影响功能但暴露内部设计细节（注：本次审计产物，原始已有） |

---

## 9. 死链接检查

| 链接 | 状态 |
|------|------|
| `href="#"` | **死链接** — 导航栏 HOME 按钮无实际跳转 |
| `href="#work"` | ✅ 指向 `id="work"` 区块 |
| `href="#about"` | ✅ 指向 `id="about"` 区块 |
| `href="#booking"` | ✅ 指向 `id="booking"` 区块 |
| `href="#contact"` | ✅ 指向 `id="contact"` 区块 |
| `href="../favicon.svg"` | ⚠️ **路径错误** — 引用 `../favicon.svg` 但 favicon 在父目录 `portfolio/` 下，不在 website 的父目录 |
| `href="series/#portrait"` 等 | ⚠️ **hash 路由** — `series/#portrait` 依赖浏览器解析，但实际文件是 `series/index.html`，直接访问可能失败 |
| `href="weixin://"` | ❌ **已删除但残留** — 原预约按钮有 `onclick="window.location.href='weixin://'"`，现在改为 `copyWechat` 按钮 |

---

## 10. SEO 检查

| 检查项 | 状态 |
|--------|------|
| `<title>` | ✅ `瓛瓛 HuanHuan — Photography` |
| `<meta description>` | ❌ **缺失** — 没有 `name="description"` meta |
| `og:title` | ✅ |
| `og:description` | ✅ |
| `og:image` | ❌ **缺失** — 声明了但 `images/og-cover.jpg` 文件不存在 |
| `og:type` | ❌ **缺失** |
| `twitter:card` | ❌ **缺失** |
| **JSON-LD 结构化数据** | ❌ **缺失** — Google 搜索结果无法显示富文本片段 |
| `robots.txt` | ❌ **缺失** |
| `sitemap.xml` | ❌ **缺失** |
| `404.html` | ❌ **缺失** — GitHub Pages 自定义 404 页未配置 |
| 语义化 HTML | ⚠️ `<section>` 标签使用不当 — 预约区用了裸 `<div>` |
| `<html lang>` | ✅ `lang="zh-CN"` |

---

## 11. Accessibility 检查

| 检查项 | 状态 |
|--------|------|
| ARIA roles | ❌ 0 个 |
| `aria-*` 属性 | ❌ 0 个 |
| `<img alt>` | ✅ 11/11 全有 alt |
| 键盘导航 | ⚠️ 只有 Lightbox 支持 ← → Esc，其余不可键盘操作 |
| 焦点样式 | ❌ 无 `:focus-visible` 样式，按钮键盘导航不可见 |
| 颜色对比度 | ⚠️ 未测试，`--text-dim` (#9a9288) 在 `--bg` (#080604) 上对比度约 5.3:1，勉强及格 |
| 屏幕阅读器 | ❌ 无 `aria-label`、`role` 标注 |
| `prefers-reduced-motion` | ❌ 未支持 — 所有动画无降级方案 |
| 触控目标大小 | ⚠️ 导航栏按钮过小（padding: .3rem），小于推荐 44px |

---

## 12. Lighthouse 优化建议

| 建议 | 预估收益 |
|------|---------|
| 图片转 WebP | Performance +15-20 分 |
| 添加 `<meta description>` | SEO +10 分 |
| 添加 JSON-LD（Person/Photographer schema） | SEO +5 分 |
| 响应式图片 `srcset` | Performance +5-10 分 |
| 移除阻塞渲染的 CSS（拆分关键 CSS） | Performance +5 分 |
| 添加 `robots.txt` + `sitemap.xml` | SEO +3 分 |
| 修复 favicon 404 | Best Practices +2 分 |
| 添加 `aria-label` | Accessibility +10 分 |

---

## 13. Performance 问题

| 问题 | 严重程度 |
|------|---------|
| **图片总大小 27MB** | 🔴 高 |
| **无 WebP 格式** | 🔴 高 |
| **Hero 封面用 `loading="lazy"`** — 首屏图片应该是 `eager` | 🟡 中 |
| **视差 RAF 循环永不停止** — 即使页面不可见也在计算 | 🟡 中 |
| **aboutImg 5 秒轮换** — 一直请求新图片，增加带宽 | 🟡 中 |
| **CSS 197 条规则全部内嵌** — 无代码分割，首次渲染需解析全部 | 🟢 低 |
| **`data.js` 60 张照片元数据（9.7KB）阻塞渲染** — 可异步加载 | 🟢 低 |
| **胶片颗粒 SVG data URI** — 虽小但影响 GPU 合成 | 🟢 低 |

---

## 14. Responsive 问题

| 断点 | 处理情况 |
|------|---------|
| 768px | ✅ 有 `@media(max-width:768px)` |
| 480px | ❌ 无小屏断点 |
| 平板 (1024px) | ❌ 无专门处理 |
| 预约卡片 | ⚠️ `flex-wrap` 处理，但三卡在小屏上纵向过高 |
| 导航栏 | ⚠️ 768px 下链接字体 0.65rem，过小 |
| 水平滚动卡片 | ✅ `width: 82vw` 在移动端自适应 |
| about 区照片 | ✅ `max-height: 40vh` 在移动端 |

---

## 15. Backend（admin.html）分析

### 功能覆盖
- ✅ 60 张照片缩略图网格
- ✅ 点击编辑标题、分类、标签
- ✅ 拖拽照片到 9 个区块
- ✅ 一键导出 `data.js`

### 问题
- **无撤销功能**：拖错了只能手动拖回去
- **无预览**：编辑后不能立即预览网站效果
- **导出按钮生成的是完整 `data.js`**：替换 GitHub 上的文件需要手动操作，无自动推送
- **拖拽仅支持桌面端**：移动设备无法使用
- **无数据验证**：section 数组可能为空的边界情况未处理

---

## 16. 数据流分析

```
Photos.sqlite (Apple DB) → Python 脚本 → images/web_XXX.jpeg
                                              ↓
                          手动编辑 → data.js → index.html (读取 window.SITE_DATA)
                              ↑                  ↓
                         admin.html ←──────── 拖拽修改 → 导出 data.js → 手动替换 GitHub
                                                    ↓
                                         series/index.html ❌ 不读 data.js（硬编码）
```

### 断裂点
- **series/index.html 是孤岛**：不读取 `data.js`，照片分配与主页不同步
- **admin.html 导出后需手动 GitHub 操作**：无法一键部署
- **data.js 和 data.json 不同步风险**：修改一个忘记另一个

---

## 17. 可维护性评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码结构 | 3/10 | 单文件 708 行，CSS/HTML/JS 混在一起 |
| 内联样式 | 2/10 | 74 处内联 style，修改一个颜色需全局搜索 |
| 数据与视图分离 | 5/10 | data.js 迈出了一步，但 series 页未跟上 |
| 可扩展性 | 3/10 | 添加新语言需改 116 处，添加新区块需改 HTML+CSS+JS |
| 文档 | 7/10 | PROJECT.md 详细 |
| 测试覆盖 | 0/10 | 无任何测试 |
| **综合** | **3.3/10** | |

---

## 18. 技术债列表（按优先级排序）

### 🔴 P0 — 阻塞上线
| # | 问题 | 修复建议 |
|---|------|---------|
| 1 | favicon 404 | 把 `href="../favicon.svg"` 改为 `href="favicon.svg"`（复制到 website/ 下） |
| 2 | `og:image` 文件不存在 | 创建 `images/og-cover.jpg`（可用 web_001.jpeg 复制一张） |
| 3 | 网站可访问性为 0（无 robots.txt/sitemap/404） | 生成 robots.txt、sitemap.xml、404.html |
| 4 | 无 `<meta name="description">` | 添加 SEO description |

### 🟡 P1 — 用户体验
| # | 问题 | 修复建议 |
|---|------|---------|
| 5 | series 页照片与主页不同步 | 让 series/index.html 也读取 data.js，按 series 字段过滤 |
| 6 | 27MB 图片总大小 | 批量转 WebP（`cwebp -q 80`），预计降至 12-15MB |
| 7 | Hero 封面用了 `loading="lazy"` | 改为 `fetchpriority="high" loading="eager"` |
| 8 | 视差 RAF 循环无可见性检查 | 用 `requestAnimationFrame` + `document.hidden` 检查暂停 |
| 9 | 复制微信号后整页刷新 | 改为只恢复按钮文本，不 `location.reload()` |
| 10 | 预约卡片共用 Hero 同一张照片 | 数据配置中去重 |

### 🟢 P2 — 代码质量
| # | 问题 | 修复建议 |
|---|------|---------|
| 11 | 74 处内联样式 | 提取为 CSS class，集中在预约区 |
| 12 | 18 个 getElementById 无 null 安全 | 封装 `$()` 函数 + null check |
| 13 | `prefers-reduced-motion` 不支持 | 添加媒体查询关闭动画 |
| 14 | data.json 冗余 | 删除或改为 data.js 的构建源 |
| 15 | 无 ESLint/Prettier | 配置代码格式化 |

### ⚪ P3 — 长期
| # | 问题 | 修复建议 |
|---|------|---------|
| 16 | 单文件 708 行 | 拆分为 index.html + style.css + main.js |
| 17 | 三语系统无 i18n 框架 | 考虑 `data-i18n` 属性 + 统一翻译表 |
| 18 | admin.html 无自动部署 | GitHub Actions 自动构建 |
| 19 | 无 CDN | Cloudflare Pages 免费 CDN + 自动 HTTPS |

---

> **审计结论**：网站功能完整、设计有辨识度、部署顺畅。但可维护性差（3.3/10），技术债集中在代码组织（单文件 708 行、74 处内联样式、无模块化）和 SEO 基础设施（缺 robots/sitemap/JSON-LD/og:image）。建议优先修 P0 的 4 项（共约 1 小时工作量），然后逐步偿还 P1 的图片优化和 series 页同步。
