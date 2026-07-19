# Design Token Report — V3.1

> 日期：2026-07-20
> 目标：从 V1 内嵌 CSS 提取统一设计令牌，建立前端设计系统基础

---

## 一、文件清单

| 文件 | 职责 | 行数 |
|------|------|------|
| `src/styles/tokens.css` | 所有 CSS 变量（颜色/字体/间距/动效） | 110 |
| `src/styles/base.css` | Reset + body + 标题 + 链接 + 图片 + focus + reduced-motion | 85 |
| `src/styles/layout.css` | Container / Section / Grid / Flex / Duo / Full-bleed | 90 |
| `src/styles/components.css` | 预留 20+ 组件插槽，当前空 | 55 |

---

## 二、Token 分类

### Color（12 变量）
| Token | 当前 V1 值 | 用途 |
|-------|----------|------|
| `--color-bg` | `#080604` | 页面底色 |
| `--color-bg-elevated` | `#0e0b08` | 抬升面（卡片、侧栏） |
| `--color-bg-card` | `#110d0a` | 卡片内部 |
| `--color-gold` | `#b8934f` | 主品牌色 |
| `--color-gold-light` | `#d4b978` | 强调文字 |
| `--color-gold-dim` | `#7a6238` | 弱化金色 |
| `--color-text` | `#d4cec4` | 正文 |
| `--color-text-dim` | `#9a9288` | 次级文字 |
| `--color-text-bright` | `#e8e0d4` | 高亮文字 |
| `--color-border` | `rgba(184,147,79,.12)` | 分割线 |
| `--color-success` | `#7bae7f` | 成功/在线 |
| `--color-danger` | `#8b3a3a` | 危险/删除 |

### Typography（18 变量）
6 级字号（hero→micro）、3 级行高、3 级字距、3 个字族栈

### Spacing（12 变量）
4px 网格系统：0 → 0.25rem → 0.5rem → … → 10rem

### Motion（12 变量）
3 条 Apple Fluid easing 曲线、5 档时长、3 个 spring 参数

### 其他
Grid/Breakpoint/Layout/Radius/Z-Index/Shadow 各 3-8 个变量

---

## 三、V1 迁移映射

V1 内嵌 CSS → V3.1 Token 对照（部分示例）：

| V1 硬编码 | V3.1 Token |
|----------|-----------|
| `color: #b8934f` | `color: var(--color-gold)` |
| `padding: 1.4rem 3rem` | `padding: var(--space-5) var(--space-8)` |
| `transition: transform .4s cubic-bezier(.16,1,.3,1)` | `transition: transform var(--duration-normal) var(--ease-out)` |
| `font-size: clamp(3rem, 7vw, 5.5rem)` | `font-size: var(--text-hero)` |
| `letter-spacing: .25em` | `letter-spacing: var(--tracking-wide)` |
| `border: 1px solid rgba(184,147,79,.12)` | `border: 1px solid var(--color-border)` |

---

## 四、使用方式

### V3 重构时（未来）
```html
<link rel="stylesheet" href="src/styles/tokens.css">
<link rel="stylesheet" href="src/styles/base.css">
<link rel="stylesheet" href="src/styles/layout.css">
<link rel="stylesheet" href="src/styles/components.css">
```

### V1 渐进迁移（当前）
不改动 index.html。新创建的 Admin V2 页面、系列页、404 页等可以引用 token 文件。V1 的内嵌样式逐步替换为 class + token 变量。

---

## 五、设计原则

1. **Tokens 是唯一真相来源** — 所有组件引用变量，不写硬编码值
2. **4px 网格系统** — 间距必须是 4 的倍数
3. **Apple 动效标准** — easing 曲线对应 damping 1.0 spring，duration 100-800ms
4. **字号不超 6 级** — hero/display/h1/h2/h3/body/small/caption/micro
5. **字重不超 400** — 层级靠字号+明度+字距区分，不靠加粗
6. **reduced-motion 支持** — base.css 已内置 `prefers-reduced-motion` 降级
