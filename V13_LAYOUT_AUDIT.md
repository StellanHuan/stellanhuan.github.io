# V13 Layout Audit

## Desktop (≥769px)
| 组件 | 宽度 | 布局 |
|------|------|------|
| Sections | max-width:1400px | 宽屏展览 |
| Masonry | 2fr 1fr 1fr, 340px rows | 不规则网格 |
| About | flex, gap:6rem | 左图右文 |
| Duo | max-width:1400px | 非对称双栏 |

## Mobile (≤768px)
| 组件 | 布局 | 图片比例 |
|------|------|---------|
| Masonry | 单列, gap:2.5rem | 3:4 / 4:3 交替 |
| HScroll | 纵向堆叠, gap:3rem | 3:2 full-bleed |
| About | 上下结构 | 4:5 cover |
| Contact | 单列 + 品牌文案 | — |

## CMS 数据链
Admin → site.json → data.js → index.html (desktop+mobile同一数据)

## Commit
8f0e8c2 — V13: Responsive layout
