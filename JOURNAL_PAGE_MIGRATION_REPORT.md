# Journal Page Migration Report — V4.4

> 日期：2026-07-20

## 文件
```
src/pages/Journal/
├── Journal.html   — 框架 + 外部引用
├── Journal.css    — 全部 Design Token
└── Journal.js     — 列表/详情双视图 + hash 路由
```

## 功能
- **文章列表**：封面缩略图 + 标题 + 日期/地点 + 摘要 + 标签
- **文章详情**：大图 Hero + 全文 Markdown + 关联照片 Gallery
- **Hash 路由**：`#rainy-shinjuku` → 详情页，空 hash → 列表
- **空状态**：引导去 Admin V2 创建
- **响应式**：768px 卡片纵向

## 数据
`src/data/journal.json` — 含 1 篇示例《雨天的新宿》

## 依赖
Image Component · Gallery Component · Design Tokens
