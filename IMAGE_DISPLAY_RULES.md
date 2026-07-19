# Image Display Rules — V12.1

## Ratios (LOCKED)
| Section | Aspect Ratio | object-fit |
|---------|-------------|------------|
| Hero | 16:9 (cover full viewport) | cover |
| Gallery/Duo | 4:3 | cover |
| HScroll Card | 16:9 | cover |
| Booking Card | 4:3 | cover |
| About | 4:3 | cover |
| Portrait (vertical) | 3:4 | cover |

## Rules
- 禁止改变任何已锁定比例
- 所有 img 必须有 width + height 属性
- 所有非首屏图片 loading="lazy"
- Hero 图片 loading="eager" fetchpriority="high"
