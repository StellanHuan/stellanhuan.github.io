# V12.7 Mobile Art Direction Audit

## 设计原则
手机端不是桌面缩小版。每张照片根据内容决定展示比例。

## 修改内容

| Section | 桌面 | 手机 (修改后) |
|---------|------|-------------|
| 01 Portfolio | Masonry 2fr 1fr 1fr | 单列：4/5 → 1/1 → 3/2 → 4/3 交替 |
| 03 Series | Masonry 同上 | 同01，竖屏叙事节奏 |
| About | 左图右文 | 图上文下，4:5 cover |
| Contact | 三栏卡片 | 单列纵向 + 品牌文案 |
| Hero | 左下角 | 字号1.8rem，宽度受限 |
| Booking | 三卡并排 | 全宽堆叠 |

## 视觉节奏 (01 Portfolio 手机端)
1. 首张 4:5 — 竖幅人像，视觉冲击
2. 1:1 — 方形构图，呼吸
3. 3:2 — 横幅，打破节奏
4. 4:3 — 经典画幅
5. 1:1 — 方形，节奏回归
... 循环

## Commit
48b6ba3 — V12.7: Mobile Art Direction

## 验证
2-3分钟后 CDN 刷新，iPhone 14 Pro Max (390px) 打开验证。
