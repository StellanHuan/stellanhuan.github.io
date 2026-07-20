# V15 展示系统重构规划

## 核心原则

1. **照片比例由数据决定，不由 CSS nth-child 决定**
2. **横版/竖版/方版建立固定展示尺寸**
3. **CMS 数据驱动展示，PC/Mobile 同一数据源**

## 数据模型变更

### Photo schema 新增字段
```json
{
  "orientation": "landscape",  // landscape | portrait | square
  "display_width": 4,          // 展示比例宽
  "display_height": 3,         // 展示比例高
  "display_size": "large"      // large | medium | small (视觉权重)
}
```

### CMS 管理入口
- Admin → Photos → 编辑单张照片 → 设置 orientation
- 批量设置：选中多张 → 批量 orientation
- 默认值：从 EXIF 自动推断（width > height = landscape）

## 展示规范

### Desktop Masonry
| Orientation | Grid Span | Aspect Ratio | 用途 |
|-------------|-----------|-------------|------|
| landscape | span 2 cols | 16:9 或 4:3 | 风光、街拍 |
| portrait | span 1 col, 2 rows | 3:4 或 4:5 | 人像 |
| square | span 1 col, 1 row | 1:1 | 方构图 |
| large landscape | span 3 cols, 2 rows | 2:1 | 首图/封面 |

### Mobile Editorial
| Orientation | Width | Aspect Ratio |
|-------------|-------|-------------|
| landscape | 100% | 16:9 |
| portrait | 100% | 3:4 |
| square | 85% 居中 | 1:1 |
| large | 100% full-bleed | 2:1 |

## 删除的逻辑

| 当前 | 替换为 |
|------|--------|
| `.masonry>:nth-child(odd) img{aspect-ratio:3/4}` | `img[data-orientation="portrait"]{aspect-ratio:3/4}` |
| `.masonry>:nth-child(even) img{aspect-ratio:4/3}` | `img[data-orientation="landscape"]{aspect-ratio:4/3}` |
| `.masonry>:first-child img{aspect-ratio:4/5}` | `img[data-display-size="large"]{grid-column:span 3}` |
| CSS 中所有 nth-child 定位规则 | JS 根据 data-orientation 分配 grid 位置 |

## 实施步骤

1. data.js photos 数组增加 orientation 字段
2. Admin Photos 页面增加 orientation 选择器
3. 替换 CSS nth-child → data-orientation 选择器
4. 替换 JS 渲染逻辑 → 根据 orientation 分配 grid-area
5. 删除所有 odd/even/nth-child 图片比例规则
