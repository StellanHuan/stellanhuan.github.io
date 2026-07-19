# Admin Content Pipeline Report — V5.1

> 日期：2026-07-20
> 目标：Admin V2 → Content → Website 完整发布流程

---

## 一、当前数据流（V4）

```
Admin V2 (编辑)
  │ 读 data.js (SITE_DATA)
  │ 存 LocalStorage
  ▼
导出 data.js 下载
  │
  ▼
手动替换 GitHub 文件
  │
  ▼
Website (从 data.js 读取)
```

### 问题
- 单一 data.js 承载所有内容（照片+区块+配置）
- Admin 无法写回文件系统（纯前端限制）
- 导出-替换-部署全部手动
- content/ 目录空置

---

## 二、新数据流（V5.1）

```
Admin V2 (编辑)
  │ 读 content/*.json
  │ 存 LocalStorage
  ▼
┌─────────────────────────────┐
│      content/ 目录           │
│  photos/index.json          │ ← 150 photos
│  series/index.json          │ ← 4 series
│  projects/index.json        │ ← projects
│  journal/index.json         │ ← articles
│  prints/index.json          │ ← prints
└─────────────────────────────┘
  │
  ▼
scripts/export_content.py
  │ 读取 content/ → 生成 data.js + series.js
  ▼
Website (从 data.js 读取)
```

---

## 三、content/ 目录结构

```
content/
├── photos/
│   ├── index.json          ← 150 张照片
│   └── README.md
├── series/
│   ├── index.json          ← 4 个系列
│   └── README.md
├── projects/
│   ├── index.json          ← 1 个项目 (Tokyo Rain)
│   └── README.md
├── journal/
│   ├── index.json          ← 1 篇文章
│   └── README.md
└── prints/
    ├── index.json          ← 空
    └── README.md
```

### 与 src/data/ 的关系

| 文件 | content/ (编辑源) | src/data/ (构建产物) | data.js (网站用) |
|------|------------------|---------------------|-----------------|
| photos | content/photos/index.json | src/data/photos.json | SITE_DATA.photos |
| series | content/series/index.json | src/data/series.json | SERIES_DATA |
| projects | content/projects/index.json | src/data/projects.json | — |
| journal | content/journal/index.json | src/data/journal.json | — |
| prints | content/prints/index.json | src/data/prints.json | — |

**规则**：content/ 是编辑源（Admin V2 读写），src/data/ 是构建中间产物，data.js 是网站运行时。

---

## 四、发布流程

### 标准流程（手动）
```bash
# 1. 在 Admin V2 编辑内容
# 2. 导出 data.js（或直接在 GitHub 编辑 content/ JSON）
# 3. 运行构建脚本
python3 scripts/export_content.py
# 4. 提交
git add content/ data.js data.json src/data/
git commit -m "content update"
git push
```

### 自动化流程（将来）
```bash
# GitHub Actions 在 content/ 变更时自动运行
python3 scripts/export_content.py
git commit -m "auto: content rebuild"
git push
```

### Admin V2 导出增强
Admin 的导出按钮现在生成：
1. `data.js`（网站用，兼容 V1）
2. 拆分后的 content JSON 文件（可单独替换）

---

## 五、回滚方案

| 场景 | 操作 |
|------|------|
| 新内容出错 | `git revert` 上一次 content/ 提交 |
| data.js 损坏 | 运行 `python3 scripts/export_content.py` 重新生成 |
| 想回到 V1 | data.js 始终保留，V1 index.html 不受影响 |
| Admin 数据丢失 | 从 content/ JSON 重新导入（LocalStorage 恢复） |

---

## 六、文件清单

```
新增:
  content/photos/index.json     ← 150 photos
  content/series/index.json     ← 4 series
  content/projects/index.json   ← 1 project
  content/journal/index.json    ← 1 article
  content/prints/index.json     ← empty
  scripts/export_content.py     ← 构建脚本

已存在 (不受影响):
  data.js                       ← V1 兼容
  data.json
  src/data/*.json
  src/data/series.js
```
