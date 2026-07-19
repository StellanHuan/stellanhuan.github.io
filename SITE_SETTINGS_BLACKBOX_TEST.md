# Site Settings Blackbox Test

## Test: Admin Settings → 修改标题 → 全站同步

### Method
- 手动修改 site.json + index.html → git push
- 等待 CI + CDN → 验证

### Result: FAIL (Git Race Condition)

**原因**: CI 自动提交比手动 push 快，导致 rebase 冲突，测试 commit 丢失。

```
最新 commit: f7f3286 auto: content rebuild [skip ci]
测试 commit: 不在历史中（被 CI rebase 覆盖）
```

### 对比：Admin API 部署 ✅ 工作

之前的黑盒测试（`40e332b`）通过 GitHub API PUT 部署成功，因为 API 使用文件 SHA 避免冲突。

### 结论

| 部署方式 | 结果 |
|----------|------|
| Admin → GitHub API PUT | ✅ 工作（已在前序测试验证） |
| 手动 git push | ❌ CI 竞态条件覆盖 |

### 修复建议

Admin 的 Settings 标题修改需要通过 deploy() → GitHub API（与 Sections 相同流程），而非直接 git push。
