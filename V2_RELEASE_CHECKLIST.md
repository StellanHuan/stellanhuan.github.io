# V2 Release Checklist

## Pre-launch
- [x] 所有 JSON 有效
- [x] 所有 150 张图片存在
- [x] 所有 9 个 HTML 页面存在
- [x] sitemap.xml / robots.txt / JSON-LD 存在
- [x] CI/CD pipeline 配置
- [x] `scripts/check_release.py` 全部通过

## Functional
- [ ] 表单提交 → 邮件通知测试
- [ ] 语言切换 三语 正常
- [ ] Admin V2 导出 data.js 正常
- [ ] 系列页 hash 路由正常
- [ ] Lightbox 键盘/手势正常

## Performance
- [x] Hero fetchpriority="high"
- [x] 全部图 loading="lazy"
- [x] width/height 防 CLS
- [ ] 实际 Lighthouse 跑分 > 80

## Content
- [ ] 瓛瓛确认照片选择和标题
- [ ] 联系方式确认
- [ ] 定价确认

## Post-launch
- [ ] Google Search Console 提交 sitemap
- [ ] 自定义域名 stellanhuan.com（可选）
- [ ] Analytics adapter 接入（GA4/Plausible）
