# Deploy Pipeline Report — V5.4

> 日期：2026-07-20

## CI 流程

```
push to main (content/** / data.js / images/** / index.html)
  │
  ▼
Checkout
  │
  ▼
Validate JSON Schemas ──→ 失败？→ 停止部署，标记 ✗
  │
  ▼
Check Images (150 张)
  │
  ▼
export_content.py ──→ 生成 data.js + series.js
  │
  ▼
generate_seo.py ──→ 生成 sitemap.xml + robots.txt + JSON-LD
  │
  ▼
Verify Build ──→ data.js/sitemap/robots 全部存在？
  │
  ▼
Auto-commit generated files
  │
  ▼
GitHub Pages Deploy
```

## 触发条件

| 条件 | 说明 |
|------|------|
| `push` to `main` | 推送代码时自动触发 |
| `paths` 过滤 | 仅 content/、data.js、images/、index.html 等变更时触发 |
| `workflow_dispatch` | 手动触发（GitHub Actions 页面点按钮） |

## 失败处理

| 场景 | 行为 |
|------|------|
| JSON 格式错误 | Validate 步骤失败 → 部署中止 |
| 图片文件缺失 | Check Images 步骤失败 → 部署中止 |
| export_content.py 报错 | 构建失败 → 不部署 |
| generate_seo.py 报错 | 构建失败 → 不部署 |
| Pages deploy 失败 | 站点保持上一版本 |

## 回滚

```bash
git revert <commit-hash>
git push
# CI 自动用上一版本重新部署
```

## 文件清单

```
.github/workflows/deploy.yml
```

## V1/V2 共存

CI 生成 `data.js`（V1 兼容），不影响 V2 组件架构的 `src/data/` 和 `src/pages/`。两个版本并行运行。
