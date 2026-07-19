// 编辑此文件修改照片标题、分类、各区块照片分配
// 前30张为当前使用，31-60为备选池
const SITE_DATA = {
  "photos": [
    {
      "file": "images/web_001.jpeg",
      "title": "光的粒子",
      "series": "portrait",
      "tags": [
        "人像",
        "自然光"
      ]
    },
    {
      "file": "images/web_002.jpeg",
      "title": "午后的静寂",
      "series": "portrait",
      "tags": [
        "人像",
        "情绪"
      ]
    },
    {
      "file": "images/web_003.jpeg",
      "title": "街の断片",
      "series": "street",
      "tags": [
        "街拍",
        "东京"
      ]
    },
    {
      "file": "images/web_004.jpeg",
      "title": "俯瞰",
      "series": "aerial",
      "tags": [
        "航拍",
        "城市"
      ]
    },
    {
      "file": "images/web_005.jpeg",
      "title": "风的轨迹",
      "series": "landscape",
      "tags": [
        "风光",
        "自然"
      ]
    },
    {
      "file": "images/web_006.jpeg",
      "title": "视线の先",
      "series": "portrait",
      "tags": [
        "人像"
      ]
    },
    {
      "file": "images/web_007.jpeg",
      "title": "都市の影",
      "series": "street",
      "tags": [
        "街拍",
        "郑州"
      ]
    },
    {
      "file": "images/web_008.jpeg",
      "title": "沈黙の肖像",
      "series": "portrait",
      "tags": [
        "人像",
        "情绪"
      ]
    },
    {
      "file": "images/web_009.jpeg",
      "title": "路地裏",
      "series": "street",
      "tags": [
        "街拍",
        "东京"
      ]
    },
    {
      "file": "images/web_010.jpeg",
      "title": "空からの視点",
      "series": "aerial",
      "tags": [
        "航拍",
        "DJI"
      ]
    },
    {
      "file": "images/web_011.jpeg",
      "title": "夜の輪郭",
      "series": "landscape",
      "tags": [
        "风光",
        "夜景"
      ]
    },
    {
      "file": "images/web_012.jpeg",
      "title": "朝の気配",
      "series": "portrait",
      "tags": [
        "人像"
      ]
    },
    {
      "file": "images/web_013.jpeg",
      "title": "水鏡",
      "series": "landscape",
      "tags": [
        "风光"
      ]
    },
    {
      "file": "images/web_014.jpeg",
      "title": "故郷の風景",
      "series": "landscape",
      "tags": [
        "风光",
        "漯河"
      ]
    },
    {
      "file": "images/web_015.jpeg",
      "title": "都市の脈絡",
      "series": "street",
      "tags": [
        "街拍"
      ]
    },
    {
      "file": "images/web_016.jpeg",
      "title": "時の層",
      "series": "portrait",
      "tags": [
        "人像"
      ]
    },
    {
      "file": "images/web_017.jpeg",
      "title": "空と大地",
      "series": "aerial",
      "tags": [
        "航拍"
      ]
    },
    {
      "file": "images/web_018.jpeg",
      "title": "街角の光",
      "series": "street",
      "tags": [
        "街拍",
        "郑州"
      ]
    },
    {
      "file": "images/web_019.jpeg",
      "title": "無言の対話",
      "series": "portrait",
      "tags": [
        "人像",
        "情绪"
      ]
    },
    {
      "file": "images/web_020.jpeg",
      "title": "雲の上",
      "series": "aerial",
      "tags": [
        "航拍",
        "DJI"
      ]
    },
    {
      "file": "images/web_021.jpeg",
      "title": "暮色",
      "series": "landscape",
      "tags": [
        "风光"
      ]
    },
    {
      "file": "images/web_022.jpeg",
      "title": "一瞬の表情",
      "series": "portrait",
      "tags": [
        "人像"
      ]
    },
    {
      "file": "images/web_023.jpeg",
      "title": "東京の隙間",
      "series": "street",
      "tags": [
        "街拍",
        "东京"
      ]
    },
    {
      "file": "images/web_024.jpeg",
      "title": "遠くの灯",
      "series": "landscape",
      "tags": [
        "风光",
        "夜景"
      ]
    },
    {
      "file": "images/web_025.jpeg",
      "title": "静寂の朝",
      "series": "portrait",
      "tags": [
        "人像",
        "自然光"
      ]
    },
    {
      "file": "images/web_026.jpeg",
      "title": "交差点",
      "series": "street",
      "tags": [
        "街拍"
      ]
    },
    {
      "file": "images/web_027.jpeg",
      "title": "鳥瞰",
      "series": "aerial",
      "tags": [
        "航拍"
      ]
    },
    {
      "file": "images/web_028.jpeg",
      "title": "光と影",
      "series": "portrait",
      "tags": [
        "人像"
      ]
    },
    {
      "file": "images/web_029.jpeg",
      "title": "風の通り道",
      "series": "landscape",
      "tags": [
        "风光"
      ]
    },
    {
      "file": "images/web_030.jpeg",
      "title": "記憶の隅",
      "series": "street",
      "tags": [
        "街拍",
        "东京"
      ]
    },
    {
      "file": "images/web_031.jpeg",
      "title": "余白",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_032.jpeg",
      "title": "光跡",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_033.jpeg",
      "title": "隙間",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_034.jpeg",
      "title": "行方",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_035.jpeg",
      "title": "残像",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_036.jpeg",
      "title": "層",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_037.jpeg",
      "title": "輪郭",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_038.jpeg",
      "title": "対話",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_039.jpeg",
      "title": "温度",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_040.jpeg",
      "title": "気配",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_041.jpeg",
      "title": "遠景",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_042.jpeg",
      "title": "静物",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_043.jpeg",
      "title": "交差",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_044.jpeg",
      "title": "片隅",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_045.jpeg",
      "title": "明暗",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_046.jpeg",
      "title": "通り雨",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_047.jpeg",
      "title": "陽だまり",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_048.jpeg",
      "title": "影絵",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_049.jpeg",
      "title": "遊歩",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_050.jpeg",
      "title": "浮遊",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_051.jpeg",
      "title": "瞬き",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_052.jpeg",
      "title": "黄昏",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_053.jpeg",
      "title": "朝霧",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_054.jpeg",
      "title": "夜明け",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_055.jpeg",
      "title": "水面",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_056.jpeg",
      "title": "坂道",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_057.jpeg",
      "title": "路傍",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_058.jpeg",
      "title": "灯台",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_059.jpeg",
      "title": "霧中",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    },
    {
      "file": "images/web_060.jpeg",
      "title": "帰路",
      "series": "portrait",
      "tags": [
        "备用"
      ]
    }
  ],
  "sections": {
    "hero": [
      "web_001.jpeg"
    ],
    "featured": [
      "web_002.jpeg",
      "web_003.jpeg"
    ],
    "hscroll": [
      "web_007.jpeg",
      "web_009.jpeg",
      "web_015.jpeg",
      "web_018.jpeg",
      "web_023.jpeg",
      "web_026.jpeg",
      "web_030.jpeg"
    ],
    "landscape": [
      "web_005.jpeg",
      "web_029.jpeg"
    ],
    "aerial": [
      "web_020.jpeg",
      "web_027.jpeg"
    ],
    "about": [
      "web_008.jpeg"
    ],
    "booking_portrait": [
      "web_001.jpeg"
    ],
    "booking_event": [
      "web_015.jpeg"
    ],
    "booking_aerial": [
      "web_004.jpeg"
    ]
  }
};