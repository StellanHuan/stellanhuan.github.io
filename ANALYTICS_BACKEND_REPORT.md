# Analytics Backend — V7.4

## 升级内容
- 新增 `AnalyticsAPIAdapter`：远程 API + localStorage 双写
- 批量发送（10条/批，30秒间隔）
- 失败重试 + localStorage fallback
- 数据导出 `exportData(days)` + 旧数据清理 `clearOld(days)`
- Dashboard 自动读取 localStorage（已兼容）
- 现有 `Analytics.track()` 接口不变

## 接入真实后端
```js
AnalyticsAPIAdapter.config.endpoint = 'https://your-api.com/analytics';
```
