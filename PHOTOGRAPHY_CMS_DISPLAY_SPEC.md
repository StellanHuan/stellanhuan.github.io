# Photography CMS Display Specification V15.2

> 状态: FROZEN · 日期: 2026-07-20
> 此文档为 Stellan Photography 展示系统的唯一开发标准。

---

## 1. 图片唯一标识

每张照片通过 `file` 字段唯一标识：
```
格式: images/web_XXX.jpeg
规则: XXX 为 3 位数字，001-999
新增照片时 CMS 自动分配下一个可用编号
```

## 2. orientation 字段

| 值 | 条件 | 展示比例 |
|----|------|---------|
| `landscape` | width > height | 4:3 |
| `portrait` | height > width | 3:4 |
| `square` | |width - height| / max ≤ 0.05 | 1:1 |

默认值：从 EXIF 自动推断。CMS 可手动覆盖。

## 3. display 字段

| 值 | 含义 | 默认分配 |
|----|------|---------|
| `large` | 首图/封面 | 每个 section 第 1 张 |
| `medium` | 标准展示 | 默认 |
| `small` | 辅助 | 手动设置 |

## 4. object-position 字段（预留）

| 值 | 说明 |
|----|------|
| `center` | 默认，居中裁切 |
| `top` | 人物肖像偏上 |
| `bottom` | 建筑/地面偏下 |
| `left` / `right` | 偏移构图 |

> V15.2 暂不实现，预留字段供后续使用。

## 5. priority 排序字段

| 值 | 说明 |
|----|------|
| 1-100 | 数字越小越靠前 |
| 默认 50 | 未设置的照片排中间 |

> Sections 内照片按 priority 升序排列。CMS 拖拽排序时自动更新 priority。

## 6. PC Layout 规则

### Masonry Grid
```css
.masonry { display: grid; grid-auto-rows: 340px; max-width: 1100px; margin: 0 auto; }

/* 由 data-orientation + data-display 驱动 */
[data-orientation="landscape"][data-display="large"]  { grid-column: span 2; grid-row: span 2 }
[data-orientation="landscape"][data-display="medium"] { grid-column: span 2; grid-row: span 1 }
[data-orientation="portrait"][data-display="large"]   { grid-column: span 1; grid-row: span 2 }
[data-orientation="portrait"][data-display="medium"]  { grid-column: span 1; grid-row: span 1 }
[data-orientation="square"]                            { grid-column: span 1; grid-row: span 1 }
```

### 禁止规则
```css
/* ❌ 以下规则永久禁止 */
.masonry > :nth-child(odd)  { aspect-ratio: ... }
.masonry > :nth-child(even) { aspect-ratio: ... }
.masonry > :first-child     { aspect-ratio: ... }
/* 所有基于 DOM 位置的图片比例控制 */
```

## 7. Mobile Layout 规则

```css
@media (max-width: 768px) {
  .masonry .duo-item img { width: 100vw; margin-left: 50%; transform: translateX(-50%); }
  [data-orientation="landscape"] { aspect-ratio: 16/9 }
  [data-orientation="portrait"]  { aspect-ratio: 3/4 }
  [data-orientation="square"]    { aspect-ratio: 1/1; width: 85%; margin: 0 auto }
  [data-display="large"]         { aspect-ratio: 4/5 }
}
```

## 8. 数据示例

```json
{
  "file": "images/web_001.jpeg",
  "title": "光の粒子",
  "orientation": "landscape",
  "display": "large",
  "priority": 1,
  "series": "portrait"
}
```

## 9. 迁移路径

1. 所有现有照片添加 orientation 字段（从 EXIF 批量推断）
2. Sections 前 2 张设为 display: large
3. 其余设为 display: medium
4. 按 sections 内顺序设置 priority
5. CSS 替换 nth-child → data-* 选择器
6. 删除所有 odd/even/first-child 图片规则

---

**此规范冻结。所有展示相关修改必须符合本文档。**
