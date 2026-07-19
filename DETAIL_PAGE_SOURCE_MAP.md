# Detail Page Source Map

## URL → Data Chain

| 阅读更多 | URL | 组件 | 数据文件 | 图片字段 | CMS入口 |
|----------|-----|------|---------|---------|---------|
| 01 目光所及 | series/#portrait | series/index.html | src/data/series.js | SERIES_DATA.portrait.photos | Admin→Sections→featured+booking_portrait |
| 02 街头的呼吸 | series/#street | series/index.html | src/data/series.js | SERIES_DATA.street.photos | Admin→Sections→hscroll |
| 03 大地与天空 | series/#landscape | series/index.html | src/data/series.js | SERIES_DATA.landscape.photos | Admin→Sections→landscape+aerial |
| 写真预约 Portrait | series/#portrait | series/index.html | src/data/series.js | 同上 | Admin→Sections→booking_portrait |

## 验证结果

- ✅ 0 硬编码图片
- ✅ 0 隐藏 JSON 数组
- ✅ 100% series.js 数据驱动
- ✅ series.js 由 Admin deploy 自动生成
- ✅ 所有图片反查 CMS 有编辑入口
