# Admin CMS Audit

## 数据流
Admin Sections编辑 → localStorage(cms_sections) → Deploy按钮 → GitHub API PUT
  ├── data.js ✅
  ├── src/data/series.js ✅  
  └── src/data/site.json ✅ (V12.4.1修复)

## 断点
❌ site.json 未被更新 → CI export_content.py 用旧 sections 覆盖 data.js

## 修复
admin-v2/index.html: publishToGitHub 增加 site.json 写入

## 验证
1. Admin修改01照片数量 → 部署 → site.json updated
2. CI触发 → export_content.py读取新site.json → data.js正确
3. 官网刷新 → 显示最新sections
