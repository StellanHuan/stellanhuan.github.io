# V13 Desktop Regression Test

## CDN 验证 (live)
- Masonry grid: grid-template-columns:2fr 1fr 1fr ✅
- Container: max-width:1400px ✅
- About: display:flex;gap:4rem (左右结构) ✅

## @media 泄漏检查
- 4 个 flex-direction:column 在 @media 外 → 全部是正常桌面CSS (dropdown, overlay)
- 2 个 !important 在 @media 外 → 语言切换 + booking hover (正常)
- 0 个移动端规则泄漏 ✅

## 修复记录
- a752912: 删除 546 行孤儿 CSS
- 根因: V12.7-V12.8 @media 替换时残留旧CSS

## 结论
桌面端恢复 V12.5 展览布局。移动端在 @media 内独立。
