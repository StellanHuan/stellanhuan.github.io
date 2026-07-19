# Admin CMS Audit — V12.4.1

## 数据流（修复后）

```
Admin Sections 编辑
  │ 拖拽照片 / 修改标题
  │ 自动 saveStore() → localStorage
  ▼
点击「💾 保存并发布」
  │
  ▼
deploy() → publishToGitHub()
  │
  ├── PUT data.js          (SITE_DATA)
  ├── PUT src/data/series.js (SERIES_DATA)  
  └── PUT src/data/site.json (sections)
  │
  ▼
GitHub Pages 检测 main 分支变更
  │
  ▼
CI: export_content.py 读取 site.json → 生成 data.js ✅
  │
  ▼
官网 stellanhuan.github.io 自动更新 (1-2分钟)
```

## 修复内容

| 项目 | 修复前 | 修复后 |
|------|--------|--------|
| site.json 同步 | ❌ 未更新 | ✅ 部署时同步写入 |
| 保存按钮位置 | 仅侧边栏 | Sections 页内 + 侧边栏 |
| 部署状态 | 无反馈 | 显示 commit SHA + 状态 |
| 失败处理 | 静默失败 | 显示具体错误信息 |

## 修改文件

- `admin-v2/index.html`: deploy + publishToGitHub + Sections UI
- `src/data/site.json`: 新增为部署目标

## commit

`b8f4ae6` — V12.4.1: Sections save+deploy button + commit SHA status

## 测试步骤

1. 打开 https://stellanhuan.github.io/admin-v2/#sections
2. 在 Settings 输入 GitHub Token
3. 修改 01 区块照片（拖入/移除）
4. 点击「💾 保存并发布」
5. 观察状态：✅ 已发布 · abc1234
6. 等待 1-2 分钟
7. 刷新官网验证变化
