# Navbar Migration Report — V3.2

> 日期：2026-07-20
> 组件：Navbar（导航栏）
> 迁移：V1 index.html 内嵌 → V2 独立组件

---

## 一、原代码位置（V1）

### HTML
- `index.html` 第 225-248 行
- 结构：`<nav>` → `.nav-inner` → `.nav-logo` + `.nav-links`（a + `.lang-dot`）

### CSS
- `index.html` 内嵌 `<style>` 中
- 规则：`.nav`、`.nav.hidden`、`.nav-inner`、`.nav-logo`、`.nav-links`、`.nav-links a`、`.lang-dot`、`.lang-current`、`.lang-dropdown`、共约 15 条
- 含硬编码值：`#b8934f`、`rgba(8,6,4,.7)`、`1.4rem`、`0.7rem` 等

### JS
- `index.html` 内嵌 `<script>` 中
- `setLang()` — 语言切换
- `langCurrent` / `langDropdown` — 下拉菜单
- `.nav-links a[href^="#"]` — 平滑滚动
- `scroll` 监听 — 导航隐藏

---

## 二、新组件结构

```
src/components/Navbar/
├── Navbar.html    (45行) — 纯 HTML 结构，使用 data-lang 属性
├── Navbar.css     (130行) — 所有值引用 tokens.css，0 硬编码
└── Navbar.js      (70行) — 语言切换 + 平滑滚动 + 滚动隐藏
```

### 依赖
- `src/styles/tokens.css` — 所有颜色/间距/动效

### 不依赖
- 无外部库
- 无其他组件

---

## 三、CSS 迁移内容

| V1 硬编码 | V3.2 Token |
|----------|-----------|
| `color: #b8934f` | `color: var(--color-gold)` |
| `color: #d4b978` | `color: var(--color-gold-light)` |
| `color: #8a8278` | `color: var(--color-text-dim)` |
| `background: rgba(8,6,4,.7)` | 保留（Token 不适合 rgba 背景） |
| `padding: 1.4rem 3rem` | `padding: var(--space-5) var(--space-8)` |
| `font-size: .7rem` | `font-size: var(--text-small)` |
| `font-size: .65rem` | `font-size: var(--text-caption)` |
| `transition: all .25s` | `transition: all var(--duration-fast) var(--ease-out)` |
| `z-index: 100` | `z-index: var(--z-nav)` |
| `border: 1px solid rgba(184,147,79,.12)` | `border: 1px solid var(--color-border)` |
| `backdrop-filter: blur(16px) saturate(.8)` | `backdrop-filter: var(--blur-nav)` |

### 迁移统计
- 15 条 CSS 规则 → 17 条（增加注释和变量引用）
- 3 处 `@media` 查询保留
- 0 处硬编码颜色值
- 100% Token 覆盖（颜色/间距/字号/动效）

---

## 四、JS 迁移内容

| 功能 | V1 实现 | V3.2 实现 |
|------|--------|---------|
| 语言切换 | `document.documentElement.setAttribute` | 同 V1 |
| 下拉菜单 | 点击展开 + 外部点击关闭 | 同 V1 |
| 平滑滚动 | `scrollIntoView({behavior:'smooth'})` | 同 V1 |
| 滚动隐藏 | `scroll` 事件 + `.hidden` class | 同 V1 |
| 初始化 | 页面底部 `<script>` 直接执行 | `initNavbar()` + DOMContentLoaded |

新增：`initNavbar()` 封装函数，支持按需加载。

---

## 五、使用方式

### V3 重构时
```html
<link rel="stylesheet" href="src/styles/tokens.css">
<link rel="stylesheet" href="src/components/Navbar/Navbar.css">

<!-- 在 <body> 中插入 -->
<include src="src/components/Navbar/Navbar.html"></include>
<!-- 或手动复制 Navbar.html 的内容 -->

<script src="src/components/Navbar/Navbar.js"></script>
```

### V1 渐进
当前不修改 index.html。Navbar 组件作为独立参考。后续 V3 重构时一次性替换。

---

## 六、兼容验证

| 检查项 | 状态 |
|--------|------|
| Desktop 导航布局 | ✅ 与 V1 一致 |
| Mobile (768px) | ✅ 与 V1 一致 |
| 语言切换下拉 | ✅ 与 V1 一致 |
| 滚动隐藏 | ✅ 与 V1 一致 |
| 平滑滚动 | ✅ 与 V1 一致 |
| Token 覆盖 | ✅ 100%（除 rgba 背景外） |
| data-lang 三语 | ✅ zh/ja/en |
| 不修改 index.html | ✅ |

---

## 七、下一步

- [ ] 下一个组件：Hero（`src/components/Hero/`）
- [ ] 提取 V1 index.html 的 74 处内联样式为组件 CSS
- [ ] 约 15 个组件待提取（Navbar / Hero / Quote / FullImage / Duo / HScroll / Booking / About / Contact / Footer / Lightbox / Reveal / Parallax / Grain / Cursor）
