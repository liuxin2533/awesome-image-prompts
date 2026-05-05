# 产品与营销

[返回 README](../../README_zh-CN.md)

本文档包含归入此分类的全部提示词。如需可视化浏览和快速复制，可以打开 [gptimages.dev](https://gptimages.dev)。

- 提示词总数: 38
- 生成时间: 2026-05-05T17:36:14.729Z

## 提示词

<a id="prompt-5a1216517bfe1152b884"></a>

### 1. 电商直播UI界面原型

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case89/output.jpg" alt="电商直播UI界面原型" width="480">

- **分类:** UI 与社交媒体模型展示案例
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/sjbbxhz/status/2045684734714380687)

**提示词:**

```text
{
  "type": "直播界面UI设计图",
  "subject": {
    "description": "{argument name=\"host name\" default=\"Elon Musk\"}的肖像，面带微笑，穿着带有白色技术原理图的黑色T恤",
    "background": "左侧显示带有'{argument name=\"left background logo\" default=\"SPACEX\"}'文字的屏幕，右侧显示红色的'{argument name=\"right background logo\" default=\"Tesla T logo\"}'标志和一辆深色汽车"
  },
  "ui_overlay": {
    "top_header": {
      "host_info": "头像，名字'{argument name=\"host name\" default=\"Elon Musk\"}'，副文本'55.6万本场点赞'，红色的'关注'按钮",
      "rank_badge": "金币图标，带有'全站第1名'",
      "viewer_stats": "3个顶部观众头像，显示'12.3w'、'8.6w'、'5.7w'，总计'68.7万'，'X'关闭按钮",
      "right_links": "'更多直播 >'，'礼物展馆 0/24'带有蓝色'经典'标签"
    },
    "mid_left_gifts": {
      "count": 2,
      "items": [
        "头像'科技爱好者'，'送小心心'，爱心图标 x 1314",
        "头像'星辰大海'，'送火箭'，火箭图标 x 666"
      ]
    },
    "bottom_left_chat": {
      "system_message": "37级徽章'宇宙漫游者 加入了直播间'",
      "message_count": 7,
      "messages": [
        "小火箭: 马斯克!未来可期!🚀",
        "future: 特斯拉Model 2什么时候出?",
        "星空梦想家: SpaceX今年能上火星吗?",
        "AI探索者: Neuralink进展如何?",
        "帅气的网友: 马总好!",
        "Mars: 第一次来你的直播,超激动!",
        "用户123: 讲讲AI吧,会取代人类吗?"
      ]
    },
    "bottom_right_product_card": {
      "hot_tag": "橙色'热卖 x 1888'",
      "image": "特斯拉Cybertruck",
      "title": "{argument name=\"product name\" default=\"特斯拉Cybertruck 电动皮卡\"}",
      "price": "{argument name=\"product price\" default=\"¥ 1,618,000\"}",
      "button": "红色'抢'按钮",
      "floating_animation": "半透明的心形从右侧边缘向上漂浮"
    },
    "bottom_bar": {
      "input_field": "'说点什么...'",
      "icons": ["笑脸", "三个点", "购物车", "礼物盒", "分享"]
    }
  }
}
```

<a id="prompt-d791eda5f8c0ae4276cf"></a>

### 2. 霓虹AI缩略图对比

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/comparison_case72/output.jpg" alt="霓虹AI缩略图对比" width="480">

一张大胆的赛博朋克风格对比缩略图，展示了从 Nano Banana 图像生成到 GPT Image 2 的转变，并附带实用的营销输出示例，非常适合 YouTube 或社交媒体推广。

- **分类:** 比较与社区示例, YouTube 缩略图
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/MoveHiro1219/status/2047698611665096732)

**提示词:**

```text
创作一张充满未来感、霓虹赛博朋克风格的日式 YouTube 缩略图，比例为 16:9。背景使用暗色调科技城市，包含模糊的摩天大楼、数字网格线、发光粒子，以及高对比度的蓝、粉、金三色灯光。画面正中央放置一位半身女性，留着长直的淡蓝色头发，身穿纯白色短袖 T 恤和浅粉色裙子，单手托腮，另一只手臂交叉，姿态沉思；将其面部进行柔和的矩形模糊处理。在顶部添加巨大的做旧粗体白色日文标题“主導権が揺れた”，并在其正下方添加醒目的黄色粗体文字“{argument name="subheadline text" default="Nano Bananaから"}”。在左侧，创建一个发光的蓝色六边形面板，标题为 Nano Banana，下方小标题为“画像生成”。面板内包含 4 个 2x2 排列的图像块：1) 日落时分的奇幻浮岛景观，2) 阳光明媚的森林小径，3) 夜晚霓虹闪烁的未来城市街道，4) 带有恒星和航天器的外太空行星场景。在左侧面板下方，添加一个发光的蓝色丝带标签，文字为“かつては優位だった”。在右侧，创建一个发光的洋红色六边形面板，标题为“{argument name="right panel title" default="GPT Image 2"}”，下方小标题为“実務で使える出力へ”。面板内包含 4 个 2x2 排列的示例缩略图卡片，每张卡片均展示同一位蓝发女性（面部模糊）及醒目的日文文字。4 个卡片上方的标签分别为：サムネイル画像、記事のアイキャッチ画像、LPのセクション画像、SNS投稿画像。卡片内的大字内容分别为：1) AIで変わるクリエイティブの未来，2) AI時代のクリエイティブ戦略 成功する企業の条件，3) AIで加速するビジネス成長，4) 未来をつくるのは AI×あなたのアイデア。在左右面板之间，放置一个明亮的金色发光箭头，从左向右指向，并带有火花般的粒子轨迹，象征过渡或优势的转移。在底部添加一个巨大的黑色横幅，带有金色发光边框，并写有醒目的金色粗体文字“{argument name="bottom banner text" default="GPT Image 2へ"}”。整体构图应呈现出一种对比感，展示从旧式图像生成向更具商业实用性输出的转变，并结合极具冲击力的缩略图排版、强烈的发光效果、主要文字的金属质感以及精致的社交媒体营销视觉风格。
```

<a id="prompt-2473f2e536ee870f1d0c"></a>

### 3. 产品营销 - Origami Pop-Up T-Rex Book Ad

<img src="https://cms-assets.youmind.com/media/1777367287481_qb2uv8_HGt_lR9a0AEsJQK.jpg" alt="产品营销 - Origami Pop-Up T-Rex Book Ad" width="480">

这个提示生成一个电影感产品风格的图像，展示一个发光的纸艺T-rex从打开的立体书中出现，适合儿童出版或富有想象力的广告视觉效果。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Gdgtify/status/2048870299894939916#reversed-0)

**提示词:**

```text
一张电影工作室风格的摄影作品，展示一本打开的{argument name="book type" default="pop-up book"}放在干净的白表面上，从低角度正面拍摄，中心折缝处有一个戏剧性的{argument name="main subject" default="T-rex"}，完全由复杂的白色折纸和激光切割纸制成，向上爆发。这头恐龙庞大而突出，向右站立，咆哮的姿态，张开的嘴巴，锋利的纸制牙齿，细小的前肢，有力的后腿，以及向左扫动的长尾巴。它的身体由数百层精致的纸板和切割穿孔组成，从强烈的内部和页面下方发光，使生物看起来背光和半发光。在底部，正好有7个纸质植物剪影从页面升起：前景中有3个较深的分支灌木，后面有4个淡色的蕨类植物形状，也都由纸切割而成。打开的页面在右侧展开上显示模糊的印刷文字，而中心书脊发出明亮的白光，向上照射穿过整个结构。柔和的冷蓝色环境与书籍内部的温暖白光形成对比，创造出神奇的儿童广告感觉。从恐龙上方和后方来的强聚光灯在下一页和桌面上投射出清晰的阴影。极简背景，高细节，优雅的产品广告美学，体积雾，浅景深，单色白蓝调色板，超干净构图，超现实的手工现实主义。
```

<a id="prompt-3d0fd31468e0e68d75f3"></a>

### 4. 产品营销 - Luxury Sunscreen Product Shot

<img src="https://cms-assets.youmind.com/media/1777367265344_yjh0ve_HG7FkohaQAA_Vak.jpg" alt="产品营销 - Luxury Sunscreen Product Shot" width="480">

一个极简风格的高清库存照片提示，用于奢侈护肤品品牌，背景设在海边。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Strength04_X/status/2048792190948938130)

**提示词:**

```text
一个光滑的 {argument name="product color" default="白色"} {argument name="product" default="防晒乳液管"} 竖立在一个 {argument name="setting" default="阳光照耀的海边岩石"} 上。光线从它身后轻柔的蓝色波浪上反射，细小的水珠在管表面闪烁。背景天空渐变为柔和的青色，营造出干净而奢华的夏日美学。简单的构图，极简的色调，明亮的日光摄影，超精细的细节，高清晰度的现实主义， stock photo 质量。
```

<a id="prompt-5a878f9edbbd646a1173"></a>

### 5. 电商主图 - Protein Powder Splash Hero Shot

<img src="https://cms-assets.youmind.com/media/1777367354583_3s0x55_HG6X64TacAAC4ug.jpg" alt="电商主图 - Protein Powder Splash Hero Shot" width="480">

此提示生成一个引人注目的优质补充剂产品广告，包含漂浮的乳清蛋白桶、巧克力飞溅和飞舞的饼干，适用于电子商务或健身品牌的网络资产。

- **分类:** 电商主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/CaudilloGalaico/status/2048741931962819045#reversed-0)

**提示词:**

```text
创建一个超逼真的商业产品飞溅镜头，展示一个大型白色塑料乳清蛋白桶，标签上标有 {argument name="brand name" default="PUREZZA"} 和 {argument name="product name" default="WHEYPRO"}，漂浮在一个装满浓稠巧克力蛋白奶昔的玻璃杯上方。桶居中，略微向右倾斜，具有光滑的清洁表面和醒目的蓝色、白色和黑色标签设计。标签应醒目地显示"100% WPC 蛋白质牛奶"，并包含小型营养信息，如"82G 蛋白质"、"2G 糖/份"、"119% VC RDI"、"100% 胆碱"，一个圆形的"GMP"徽章，一条写着"乳清牛奶蛋白浓缩物"的黑色条纹，另一条写着"低糖/低脂/富含天然"的条纹，以及一个风味标签，显示 {argument name="flavor text" default="BLACK COOKIES FLAVOUR"}。用爆炸性的向上和向外的巧克力液体飞溅包围桶，具有戏剧性的弧线、液滴和悬停在半空中的冻结动作。包含正好5个完整的巧克力三明治饼干在产品周围飞舞，以及多个破碎的饼干块和碎屑散布在整个场景中，右下角有一个部分可见的饼干，左上角有另一个。底部的玻璃杯应仅部分可见，透明，并且因飞溅冲击而溢出。使用高对比度工作室背景，左侧是深蓝色渐变，渐变到右侧的亮白色，电影般的边缘照明，清晰的反射，对桶的超锐利聚焦，以及液体和饼干碎屑的精细纹理。整体外观应为高端运动营养广告，充满动感、活力，适合作为现代电子商务健身网站的主图。
```

<a id="prompt-6519ab74ec3471d6d229"></a>

### 6. 产品营销 - Surreal Orange Puffer Bus Stop Editorial

<img src="https://cms-assets.youmind.com/media/1777367357656_q04nws_HG8THtHXwAAAM06.jpg" alt="产品营销 - Surreal Orange Puffer Bus Stop Editorial" width="480">

一个电影感时尚编辑图像，一个男人站在混凝土公交站亭里，被一个巨大的橙色羽绒服所庇护，适合奢华广告活动或概念风格图像。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/HBCoop_/status/2048877393138372846#reversed-0)

**提示词:**

```text
超现实主义高级时尚编辑摄影，拍摄于冰岛风格荒凉景观的空旷路边，天空是平坦的灰色阴云。构图中心是一个小型粗野主义混凝土公交站亭，墙壁有污渍且风化，里面有一张简单的长凳。站亭内有1位瘦高成年男性，穿着定制黑色西装、黑色衬衫和黑色鞋子，随意站立并侧视。整个公交站亭上覆盖着1件巨大的超大号橙色羽绒服，充气呈帐篷状，在站亭上方形成一座宏伟的雕塑式顶篷；衣领在屋顶上方敞开，袖子垂落在两侧湿滑的人行道上，光滑的绗缝尼龙面料展现出逼真的褶皱、充气腔、接缝、按扣和时尚产品细节。前景中的道路黑暗且湿滑，带有微妙的反光和寒冷潮湿的氛围。背景展示低矮贫瘠的山丘，有雪痕，营造出偏远多风的海岸线感觉。像拍摄奢侈杂志时尚活动一样拍摄，具有电影般的现实主义效果，居中构图，柔和的自然光线，单色环境与橙色外套之间的强烈对比，极简的调色板，略微夸张的纪念碑式比例扭曲，以及清晰锐利的编辑摄影细节。
```

<a id="prompt-7f0411cdf6206493bcad"></a>

### 7. 产品营销 - Luxury Eggs Benedict Diorama Box

<img src="https://cms-assets.youmind.com/media/1777367289467_oaehjg_HGt9OZVXIAA6x5u.jpg" alt="产品营销 - Luxury Eggs Benedict Diorama Box" width="480">

此提示生成一张高级手工美食摄影图像，展示班尼迪克蛋，呈现为可收藏的亚克力盒子，带有微型发明家厨房场景，标记的食材、工具和原产地细节。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Gdgtify/status/2048800842191700194#reversed-1)

**提示词:**

```text
{"type":"手工美食收藏品包装摄影","format":"4:5 竖向","style":"高级透明亚克力展示盒，米其林星级美食风格与豪华玩具包装的结合，温暖博物馆灯光的美食摄影，超精细微型场景模型，抛黄铜装饰，奶油色、海军蓝和酒红色的复古酒店品牌","subject":{"dish_name_en":"{argument name=\"dish name\" default=\"班尼迪克蛋\"}","dish_name_origin":"{argument name=\"origin language dish name\" default=\"Eggs Benedict\"}","inventor":"{argument name=\"inventor name\" default=\"莱缪尔·班尼迪克\"}","origin_place":"{argument name=\"origin place\" default=\"美国纽约市\"}","date_started":"{argument name=\"date started\" default=\"约1894年\"}","cuisine":"经典美式早午餐"},"centerpiece":{"scene":"盒子中心的微型19世纪末酒店厨房","figure":"代表莱缪尔·班尼迪克的男性厨师形象，穿着卷袖子的白色衬衫、深色花纹背心、领结和围裙，前倾准备中","action":"将光泽的荷兰酱浇在装盘的班尼迪克蛋上","dish_details":"一盘白色盘子上的分装英式松饼、堆叠的肉类、水煮蛋、厚厚的黄色荷兰酱从边缘流下，顶部有绿色香草装饰","surroundings":"微型铜制炊具、架子、瓷砖墙，以及后方写着"沃尔多夫酒店纽约1894"的带框酒店标志"},"layout":{"container":"矩形透明亚克力收藏盒，带有分开的食材和工具隔间围绕中心场景模型","sections":[{"title":"左侧食材列","position":"左侧竖向","count":7,"labels":["英式松饼","加拿大培根","火腿","水煮蛋","荷兰酱","蛋黄","平底锅"]},{"title":"右侧食材列","position":"右侧竖向","count":7,"labels":["黄油","柠檬","醋","黑胡椒","盐","红椒粉","煮蛋杯"]},{"title":"底部中间工具和香草","position":"底部中心偏左和底部中心","count":7,"labels":["细香葱","欧芹","打蛋器","漏勺","小烤盘","带槽勺","黄油刀"]},{"title":"起源地图牌匾","position":"底部中心偏右","count":1,"labels":["班尼迪克蛋诞生地"]}],"centerpiece_count":1,"total_compartments":22},"objects":{"ingredients":["2片英式松饼","2片圆形加拿大培根","4片折叠火腿","1个水煮蛋","1盘荷兰酱","碗中的3个蛋黄","4块黄油","2片柠檬","1小玻璃壶醋","1碗黑胡椒","1堆粗盐","1堆红椒粉","1把细香葱","1把欧芹"],"tools":["1个铜制平底锅","1个打蛋器","1个漏勺","1个白色小烤盘","1个标有"带槽勺"的穿孔勺","1把黄油刀","1个金属煮蛋杯"]},"text_elements":{"top_brand_plaque":"{argument name=\"top brand text\" default=\"莱缪尔·班尼迪克\"}","top_subtitle":"沃尔多夫酒店，纽约","rear_sign":"沃尔多夫酒店，纽约，1894","center_nameplate":"莱缪尔·班尼迪克 被认可的创造者 约1894年","map_text":"班尼迪克蛋诞生地 / 曼哈顿 / 美国纽约市","bottom_banner_main":"班尼迪克蛋","bottom_banner_sub":"班尼迪克蛋","bottom_banner_footer":"美国纽约市 • 约1894年 • 经典美式早午餐","bottom_left_badge":"美式早午餐标志","bottom_right_badge":"沃尔多夫酒店1894"},"materials_and_lighting":{"materials":"透明亚克力墙壁、黄铜螺丝、雕刻牌匾、复古纸标签、光泽陶瓷餐具、抛光铜制炊具","lighting":"柔和温暖的定向工作室灯光，亚克力上有微妙反射，浅景深，奢华诱人的高光"},"composition":"正面对称的产品拍摄，居中的盒子占据大部分画面，每个隔间清晰可见且整齐标记，下方有优雅的大理石表面，黑暗柔和的模糊背景"}
```

<a id="prompt-91a43dbdd4ee3a31e405"></a>

### 8. 产品营销 - Luxury Vitamin C Serum Product Shot

<img src="https://cms-assets.youmind.com/media/1777367355647_b7jlob_HG8gRiabQAA9UAM.jpg" alt="产品营销 - Luxury Vitamin C Serum Product Shot" width="480">

此提示为电子商务、美容广告和奢华健康品牌生成高级逼真的护肤品图像。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/MatiasSchrank/status/2048891860999983249#reversed-0)

**提示词:**

```text
高端商业护肤品照片，置于浅色大理石浴室台面上，聚焦于一个装有温暖琥珀色精华液的透明玻璃滴管瓶。瓶身布逼真的冷凝水珠，配有白色橡胶吸管头和闪亮的金属金色领圈。正面标签优雅简约，品牌名称为 {argument name="brand name" default="HydraGlow"}，下方有较小字体的产品名称 {argument name="product name" default="Vitamin C Serum - 30ml"} 和功效说明 {argument name="benefit line" default="Brightening & Anti-Aging Formula"}，品牌名上方还有一个简单的金色植物莲花风格标志。柔和的自然晨光从侧面照射，形成柔和的高光、微妙的阴影和洁净的奢华水疗氛围。在模糊的背景中，左侧放置1个带纹理的透明玻璃花瓶，内有绿叶树枝；右侧放置1叠3条折叠的白色毛巾；左前景有1个带有细微金色纹理的浅白色盘子；右前景有1个带有细金边的小白碗。使用浅景深，瓶子保持清晰对焦，中性奶油色和白色调色板，高端电子商务广告美学，逼真的纹理，以及精致的养生品牌风格。
```

<a id="prompt-a2ab3ec0070762994f88"></a>

### 9. 产品营销 - Eggs Benedict Miniature Acrylic Box

<img src="https://cms-assets.youmind.com/media/1777367289190_jjaiwm_HGt9OaDbgAAMPlk.jpg" alt="产品营销 - Eggs Benedict Miniature Acrylic Box" width="480">

此提示生成一个鸡蛋本尼迪克特主题的亚克力盒装微型厨房模型的优质产品风格照片，适合用于烹饪概念艺术、包装模型或收藏级食品主题视觉效果。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Gdgtify/status/2048800842191700194#reversed-0)

**提示词:**

```text
一张高级手工美食摄影图片，展示一个透明的亚克力收藏盒，放置在乡村风格的木桌上，以干净的4:5产品风格拍摄，配有柔和的自然光和浅景深。盒子内有一个微型厨房场景，专门用于{argument name="dish name" default="Eggs Benedict"}，中心站着一个微型厨师人偶，戴着白色厨师帽和白色制服，系着红色领巾，正在准备中，将光泽的荷兰酱浇在英式马芬半片上的堆叠式班尼迪克蛋。在中心厨房区域，包括1个微型炉灶，1个煎锅，厨师手中的1个小炖锅，1个木制准备台，台上的2把刀，3个悬挂的金属厨具，下层架子上的2个堆叠盘子，1个小白碗，以及桌子下的2个调味磨。围绕中心场景，在亚克力盒壁上正好有12个透明食材隔间：顶排有4个隔间，包含2个英式马芬，3块黄油，3片柠檬和3个整鸡蛋；左侧有4个隔间，包含3片圆形加拿大培根，2欧芹枝，1个整鸡蛋和2个调味瓶；右侧有4个隔间，包含1张标有USA的产地地图卡，上面有美国红色地图和一个小纽约市标记，1个切碎的细香葱隔间，2个香料罐和3个破裂的蛋黄。亚克力包装在顶部和底部边缘有醒目的红、白、蓝装饰带，唤起美国国旗色彩。添加一个前面标签牌，上面写着{argument name="front label" default="EGGS BENEDICT"}，较小的文字是{argument name="origin and date" default="USA - 1894"}。保持微型场景高度详细、逼真、精致和奢华，像博物馆级烹饪收藏品或高端玩具包装，具有清晰的透明反射和温暖的编辑桌面背景。
```

<a id="prompt-aee74b668d6d9e374ff3"></a>

### 10. 产品营销 - Brick Mini Set Box Mockup

<img src="https://cms-assets.youmind.com/media/1777367351712_0dlbya_HG7_HBnbsAAorib.jpg" alt="产品营销 - Brick Mini Set Box Mockup" width="480">

一个真实的玩具积木套装包装，展示了一个由积木搭建的秋千场景，适合用于生成收藏级包装盒艺术和新颖的积木套装概念。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ecommartinez/status/2048855384111427765#reversed-0)

**提示词:**

```text
{"type":"玩具积木套装产品盒模型","branding":{"style":"高级乐高风格包装模仿","logo":"经典红色方形玩具积木logo位于左上角","series_badges":[{"text":"迷你套装","position":"右上角"},{"text":"收藏展示模型","position":"右下角"}]},"box":{"orientation":"正面3/4视角展示前面板和左侧脊线","shape":"方形纸板套装盒","background":"深炭黑色纹理工作室背景印在盒子上","lighting":"柔和的摄影棚灯光，带有微妙的反射和真实的包装阴影"},"main_product":{"subject":"用积木搭建的孤独男子坐在秋千上的微型场景","character":{"name":"{argument name=\"character name\" default=\"PABLO ESCOBAR\"}","style":"积木小人启发的形象，故意简化的模糊面部，黑色短波浪发，浅蓝色短袖衬衫，深蓝色裤子，坐着时双手放在大腿附近"},"build":{"piece_style":"逼真的塑料积木","scene":"黄色长椅秋千通过两条链条悬挂在矩形底座上的浅灰色A形秋千架上","base_details":"茂密的绿色地面，有小植物，2朵黄色花，散落的圆形石头，以及由灰色和棕色调瓷砖组成的弯曲小径"}},"printed_text":{"front_title":"{argument name=\"box title\" default=\"PABLO ESCOBAR\"}","front_subtitle":"{argument name=\"subtitle\" default=\"THINKING ALONE\"}","bottom_quote":"{argument name=\"quote\" default=\"SOMETIMES THE LOUDEST SILENCE COMES FROM THINKING ALONE.\"}","left_specs":["18+","75841","107 件/盒","Building Toy","Jouet de construction","Juguete para Construir"],"spine_text":["PABLO ESCOBAR","THINKING ALONE"]},"layout":{"sections":[{"title":"前面板品牌区域","position":"左上角","count":2,"labels":["toy brick logo","main title and subtitle"]},{"title":"规格栏","position":"左前面板","count":6,"labels":["18+","75841","107 件/盒","Building Toy","Jouet de construction","Juguete para Construir"]},{"title":"功能徽章","position":"右前面板","count":2,"labels":["MINI SET","COLLECTIBLE DISPLAY MODEL"]},{"title":"场景细节","position":"中心前面图像","count":6,"labels":["swing frame","2 chains","yellow bench seat","seated figure","stone path","plants and flowers"]}]} ,"style":{"look":"超现实的商业产品摄影，高度逼真的玩具包装，清晰的排版，逼真的印刷盒边缘和透视","color_palette":"黑色，灰色，黄色，绿色，红色，白色，柔和的蓝色","mood":"忧郁，讽刺，收藏展示品"}}
```

<a id="prompt-d933b41813eb94020f78"></a>

### 11. 电商主图 - Fashion Editorial Outfit Breakdown

<img src="https://cms-assets.youmind.com/media/1777367302271_29g2d9_HG6HvvhawAAzJb-.jpg" alt="电商主图 - Fashion Editorial Outfit Breakdown" width="480">

这个提示将参考服装照片转变为精美的杂志风格服装布局，用于产品展示和目录样机。

- **分类:** 电商主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/aichof21/status/2048724140992205158#reversed-1)

**提示词:**

```text
使用 REFERENCE_0，仅提取服装，并将其转换为在浅暖米色背景上的干净时尚杂志产品展示。完全移除人物，将服装作为平铺的独立物品展示：1件短袖上衣居中放置在顶部附近，1条短裤居中放置在其下方。保留参考图像中的鲜艳多彩艺术印花，但整齐地展示服装，如同编辑目录页面，带有柔和的影棚阴影。在左下角添加1个圆形织物细节插图，展示印花的特写。添加优雅的编辑排版和细指示线，总共4个文本块：左上角的大标题块，上方和下方有小型日文文字，内容为"COLORFUL ART SET UP"；右侧标记为"TOPS"的块，带有日文描述；右下角标记为"BOTTOMS"的块，带有日文描述；左下角标记为"FABRIC"的块，带有简短的日文描述。保持整体外观精致、简约、高级，如同杂志中的服装介绍页面。
```

<a id="prompt-e07c5c7d668ed92a33c3"></a>

### 12. 产品营销 - Origami Dinosaur Pop-Up Book Ad

<img src="https://cms-assets.youmind.com/media/1777367288215_rreo9l_HGt_mBOaYAAmqSC.jpg" alt="产品营销 - Origami Dinosaur Pop-Up Book Ad" width="480">

这个提示生成一个电影风格的儿童广告图片，展示一只纸制T-霸王龙从立体书中弹出，非常适合玩具、书籍或教育产品的营销。

- **分类:** 产品营销
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Gdgtify/status/2048870299894939916#reversed-1)

**提示词:**

```text
一个精致的儿童立体书广告，背景为暗色摄影棚，展示一本摊开的硬壳书，书页厚实洁白，封面为青绿色，放置在桌面上。从书页中心折痕处，一个高度详细的白色纸折暴龙以动态咆哮姿态向上跃起，大张着嘴露出锋利的三角形牙齿，小小的爪状手臂抬起，粗壮的折叠腿扎根在分层的纸质丛林植被中，分段式的尾巴向后延伸。恐龙应看起来是用挺括的折叠卡纸手工制作的，带有可见的几何纸板面板和干净的折纸接缝。在恐龙身后，右侧页面部分直立，投射出暴龙轮廓的戏剧性阴影，形成一个张大嘴巴的大型剪影；在该页面上还应包括小型剪纸场景：3只飞行的翼龙和简单的山脉景观。用密集的剪纸植物和草丛环绕恐龙底部，这些植物从书页两侧生长出来。用电影感的温暖聚光灯从左上方照亮场景，背景保持深蓝至黑色，在书籍和抬起的页面上投射出柔和逼真的阴影。在顶部中央，包含粗体白色广告排版，以堆叠行显示{argument name="headline text" default="DINOSAURS POP UP ADVENTURE"}，下方有一条白色丝带横幅，上面写着{argument name="tagline" default="A WORLD OF WONDER IN EVERY PAGE"}。在底部中央，放置4个均匀间隔的圆形功能图标，配有白色标题：一个打开的书本图标，标注"AMAZING POP UP DESIGNS"；一个手形图标，标注"HANDCRAFTED WITH CARE"；一个盾牌图标，标注"DURABLE & KID FRIENDLY"；和一个灯泡图标，标注"INSPIRES IMAGINATION"。高级玩具目录风格，电影感产品摄影与纸工艺插画相结合，居中构图，高对比度，超清晰，富有奇思妙想，适合家庭，逼真的纸张质感。
```

<a id="prompt-f084d3e51752bea88b92"></a>

### 13. 电商主图 - Premium Wireless Earbud E-commerce Infographic

<img src="https://cms-assets.youmind.com/media/1777367256566_a0j742_HG48wa1acAAbO6y.jpg" alt="电商主图 - Premium Wireless Earbud E-commerce Infographic" width="480">

一个全面的真无线耳机营销信息图表提示，具有专业时尚活动美学和详细的排版布局。

- **分类:** 电子商务主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/john_my07/status/2048641686994407474)

**提示词:**

```text
为 {argument name="product name" default="Bolt True Wireless Earbuds"} 创建具有高冲击力的9:16垂直电商信息图表，采用高级生活方式广告美学。

构图与取景
年轻女性的全身照（面部和身份与提供的参考图像完全匹配—准确的面部特征、肤色、发型）
相机角度略低且靠近（时尚广告视角）以增加深度和存在感
主体随意坐在地板上，一条膝盖抬起，一条腿向前伸向相机

前景（产品焦点）
女性手持一个打开的 {argument name="brand" default="Bolt"} 耳机充电盒朝向相机
盒内：可见一个耳机
第二个耳机戴在她的耳朵上
充电盒应为亮白色，带有微妙的品牌标识（"BOLT"）
为手和充电盒添加轻微的微距景深模糊，以实现电影般的真实感

主体造型
服装：现代运动街头风
轻薄夹克（米色/中性色调）
露脐上衣或运动内衣
宽松的运动裤（浅粉色或柔和色彩）
带有可见纹理的白色运动鞋
表情：自信、放松、轻微微笑
姿势：自然、生活方式导向—不僵硬或过度摆拍

背景与氛围
干净的工作室背景，带有柔和的灰色渐变
添加：
彩虹棱镜镜头光晕
微妙的光泄漏
背景中漂浮的模糊耳机和充电盒
地面表面略带纹理（工作室地板效果）

照明
柔和、漫射的商业照明
突出：
皮肤纹理
光亮的耳机充电盒
织物细节
微妙的边缘照明以与背景分离

字体布局（现代无衬线字体，白色）
顶部中央（模特后方）：
粗体超大文本：
"BOLT"（部分被主体遮挡）
右上：
Bolt 耳机
真无线
中左：
强劲音质。
轻松氛围。
为您的每一天的每个节拍而设计。
中右：
大号：30
小号：小时播放时间
下方：
大号：IPX5
小号：防水
右下：
大号：1
小号：年保修

风格与质量
8K 超写实商业摄影
面部和耳机的清晰对焦
前景和背景元素的轻微景深模糊
简洁的苹果/耐克风格高级广告美学
平衡的构图，具有强烈的负空间
```

<a id="prompt-31315d26d80f18d6c3e9"></a>

### 14. 电商主图 - 美食图片专业修图提示词

<img src="https://cms-assets.youmind.com/media/1777280784144_jbzqq2_HGy5ZsBbwAAxbRx.jpg" alt="电商主图 - 美食图片专业修图提示词" width="480">

该提示词可将一张空盘子或使用过的餐盘照片，通过 GPT-Image-2 重构为适用于餐厅菜单的专业营销图片。

- **分类:** 电子商务主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ksk_19960308/status/2048215787891212495)

**提示词:**

```text
这是一张来自 {argument name="restaurant" default="Yoshinoya"} 的空盘子照片。请将其转化为一张专业的宣传照片，并摆放上诱人的 {argument name="food items" default="牛肉饭和味噌汤"}。你可以调整构图。
```

<a id="prompt-4cb0eef668e4780d8ae9"></a>

### 15. 电商主图 - 奢华珠宝广告

<img src="https://cms-assets.youmind.com/media/1777280764503_pzbufz_HG0qIsOaMAAPmCd.jpg" alt="电商主图 - 奢华珠宝广告" width="480">

用于生成高端珠宝广告的提示词，包含微距细节、暖金色光影以及浪漫的光影交错，营造精品店美学风格。

- **分类:** 电商主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Dheepanratnam/status/2048341734728331424)

**提示词:**

```text
为 {argument name="jewelry piece" default="[珠宝首饰]"} 创作一则珠宝广告，要求呈现微距闪耀感、丝绒质感、暖金色光影、浪漫的光影交错、极简标题、奢华精品店氛围、超细腻的宝石反射效果，以及高级杂志编辑排版风格。
```

<a id="prompt-4fba4ab328f0bcd7fc82"></a>

### 16. 电商主图 - 专业饮品照片精修

<img src="https://cms-assets.youmind.com/media/1777280788253_wiqap8_HG0vLkbaIAA30oz.jpg" alt="电商主图 - 专业饮品照片精修" width="480">

此提示词可将随手拍摄的饮品参考图转化为适用于社交媒体、菜单或宣传用途的精美广告级产品照。

- **分类:** 电子商务主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/abxxai/status/2048345290043015628#reversed-0)

**提示词:**

```text
使用提供的参考图，将这张随手拍摄的手机照片转化为专业的饮品大片，同时保留原有的杯子、汽水、吸管、户外主题乐园背景及整体构图。通过重新构图和画面清理，使饮品成为视觉焦点；提升杯子的清晰度与细节，呈现出清脆的凝露和晶莹的冰块；增强 Coca-Cola 的红色调及整体对比度。应用温暖的黄金时刻商业光效，增加高光质感，并进行电影级的调色。增加背景虚化以营造浅景深效果，简化视觉干扰，使背景中的人物显得更加自然且模糊，同时保留树木、长椅、花坛和摩天轮等环境元素。保持画面真实感，呈现出如同专业产品摄影师拍摄的高端广告大片效果。
```

<a id="prompt-5dda084d679277291aa0"></a>

### 17. 电商主图 - 中国传统奢华产品设计

<img src="https://cms-assets.youmind.com/media/1777280771677_7lq50r_HGy0ak5bIAABTD6.jpg" alt="电商主图 - 中国传统奢华产品设计" width="480">

两款高端产品设计提示词：灵感源自唐代的丝绸披肩和宋代风格汝窑茶具。

- **分类:** 电商主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/XiaoKooeye/status/2048210401809314173)

**提示词:**

```text
唐代《簪花仕女图》纹样丝绸披肩，采用 {argument name="pattern design" default="周昉仕女环绕纹样"}，海棠花金丝织造，光泽缎面质感，宫廷奢华风格。

宋代汝窑天青釉茶具，细腻开片釉面，“雨过天晴云破处”的色彩，极简宋代风格布景，博物馆级静物摄影。
```

<a id="prompt-d39f0617fb2136cecd2c"></a>

### 18. 电商主图 - 极简科技配件广告

<img src="https://cms-assets.youmind.com/media/1777280765015_4megwd_HG0qLMab0AA1zo3.jpg" alt="电商主图 - 极简科技配件广告" width="480">

一份专业的科技营销提示词，专注于极简主义 Apple 风格的悬浮渲染图和简洁的排版设计。

- **分类:** 电子商务主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Dheepanratnam/status/2048341738683584821)

**提示词:**

```text
为 {argument name="accessory" default="[ACCESSORY]"} 生成一个科技配件广告，悬浮产品渲染图，磁吸对齐，平滑渐变，清晰的规格卡片，简洁的无衬线字体，Apple 级极简主义，高端数字产品发布美学。
```

<a id="prompt-f94979e66a5f8dcc0e97"></a>

### 19. 电商主图 - 洗发水产品创意提示词

<img src="https://cms-assets.youmind.com/media/1777280781741_r5q47s_HGzZMdQXUAAlzgT.jpg" alt="电商主图 - 洗发水产品创意提示词" width="480">

一个用于生成洗发水产品创意的简单提示词，展示一位女性模特使用防脱洗发水。

- **分类:** 电子商务主图
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/boostkun/status/2048250748559892771)

**提示词:**

```text
为“{argument name="brand name" default="Over.X"}”创作一个产品创意，这是一款“{argument name="product type" default="防脱洗发水"}”，画面中包含一位“{argument name="model" default="可爱的女性"}”
```

<a id="prompt-03eba2b3c22f3862ee30"></a>

### 20. 电商商品展示设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case157.jpg" alt="电商商品展示设计" width="480">

- **分类:** 电商商品展示设计
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-157)

**提示词:**

```text
{
  "type": "e-commerce product infographic",
  "theme": "dark mode with {argument name=\"accent color\" default=\"orange\"} accents",
  "product": {
    "brand": "{argument name=\"brand name\" default=\"MEAN WELL\"}",
    "model": "{argument name=\"product model\" default=\"ELG-100-24B\"}",
    "description": "100W Constant Current LED Driver, rectangular silver metal housing with black cables on both ends and detailed specification label"
  },
  "layout": {
    "sections": [
      {
        "name": "Hero Section",
        "elements": [
          "Brand logo top left",
          "Headline: '{argument name=\"main headline\" default=\"Stable Power For Outdoors\"}'",
          "Subtext: Wide input voltage, protected housing...",
          "Large angled product shot",
          "Faded '100W' watermark in background"
        ]
      },
      {
        "name": "Feature Highlights",
        "count": 3,
        "panels": [
          { "title": "Precision Build", "visual": "Close-up of the specification label" },
          { "title": "Secure Connection", "visual": "Close-up of the cable entry and mounting ear" },
          { "title": "Key Features", "visual": "Angled product shot with 3 callout lines pointing to text: '100~305VAC Input', 'Constant Current', 'IP67 / IP65 Housing'" }
        ]
      },
      {
        "name": "Applications",
        "count": 4,
        "panels": [
          { "title": "For Street Lighting", "visual": "Nighttime highway illuminated by streetlights" },
          { "title": "For Outdoor Projects", "visual": "Modern building exterior with architectural landscape lighting" },
          { "title": "For Indoor Systems", "visual": "Modern commercial hallway with linear ceiling lights" },
          { "title": "For Dimming Control", "visual": "Electrical control box with 4 labels: '0-10V', 'PWM', 'RESISTOR', 'DALI'" }
        ]
      },
      {
        "name": "Environmental Protection",
        "elements": [
          "Product resting on a wet surface with water droplets and rain effect",
          "Headline: 'Protected Performance'",
          "Description text about indoor/outdoor use and active PFC",
          "Badge: '{argument name=\"warranty years\" default=\"5\"}-Year Warranty'"
        ]
      },
      {
        "name": "Technical Specifications",
        "elements": [
          "Headline: 'Lighting Power Technology'",
          "4 checkmark bullet points: '100~305VAC Input', 'Active PFC', 'Low Standby <0.5W', '0~10V / PWM / Resistor / DALI'",
          "Product shot glowing on a high-tech circuit board background"
        ]
      }
    ]
  }
}
```

<a id="prompt-086d85ce26c3e47af741"></a>

### 21. 电商商品展示图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case192.jpg" alt="电商商品展示图" width="480">

- **分类:** 电商商品展示图
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-192)

**提示词:**

```text
AI智能眼镜电商详情图
```

<a id="prompt-0a8c22cf595190b7f360"></a>

### 22. 电商商品展示设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case33.jpg" alt="电商商品展示设计" width="480">

- **分类:** 电商商品展示设计
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-33)

**提示词:**

```text
A 3D render of a cute kawaii {argument name="subject" default="cloud"} character on a pure white background. The character has a soft, matte, squishy texture resembling clay or a stress toy. It features large glossy black eyes with white highlights, a simple curved smile, and round pink blush on its cheeks. The edges and bottom of the figure have a subtle pastel gradient of {argument name="accent colors" default="pink, blue, and purple"}. Soft studio lighting, minimalist icon style, casting a gentle shadow.
```

<a id="prompt-1aaba994d7662ec62bb8"></a>

### 23. 电商直播 UI 样机

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case21.jpg" alt="电商直播 UI 样机" width="480">

生成逼真的社交媒体直播界面，叠加在人物肖像之上，包含可自定义的聊天消息、礼物弹窗和商品购买卡片。

- **分类:** 直播界面设计图, 电商直播UI原型
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-21)

**提示词:**

```text
{
  "type": "直播 UI 样机",
  "subject": {
    "description": "{argument name=\"host name\" default=\"Elon Musk\"} 的肖像，面带微笑，身穿印有白色技术示意图的黑色 T 恤",
    "background": "左侧显示带有 '{argument name=\"left background logo\" default=\"SPACEX\"}' 文字的屏幕，右侧显示红色的 '{argument name=\"right background logo\" default=\"Tesla T logo\"}' 和一辆深色汽车"
  },
  "ui_overlay": {
    "top_header": {
      "host_info": "头像，名称 '{argument name=\"host name\" default=\"Elon Musk\"}'，副标题 '55.6万本场点赞'，红色 '关注' 按钮",
      "rank_badge": "带有 '全站第1名' 的金币图标",
      "viewer_stats": "3 个顶部观众头像，显示 '12.3w'、'8.6w'、'5.7w'，总计 '68.7万'，'X' 关闭按钮",
      "right_links": "'更多直播 >'，'礼物展馆 0/24'（带有蓝色 '经典' 标签）"
    },
    "mid_left_gifts": {
      "count": 2,
      "items": [
        "头像 '科技爱好者'，'送小心心'，爱心图标 x 1314",
        "头像 '星辰大海'，'送火箭'，火箭图标 x 666"
      ]
    },
    "bottom_left_chat": {
      "system_message": "37 级勋章 '宇宙漫游者 加入了直播间'",
      "message_count": 7,
      "messages": [
        "小火箭: 马斯克！未来可期！🚀",
        "future: 特斯拉Model 2什么时候出？",
        "星空梦想家: SpaceX今年能上火星吗？",
        "AI探索者: Neuralink进展如何？",
        "帅气的网友: 马总好！",
        "Mars: 第一次来你的直播，超激动！",
        "用户123: 讲讲AI吧，会取代人类吗？"
      ]
    },
    "bottom_right_product_card": {
      "hot_tag": "橙色 '热卖 x 1888'",
      "image": "Tesla Cybertruck",
      "title": "{argument name=\"product name\" default=\"特斯拉Cybertruck 电动皮卡\"}",
      "price": "{argument name=\"product price\" default=\"¥ 1,618,000\"}",
      "button": "红色 '抢' 按钮",
      "floating_animation": "半透明爱心沿右侧边缘向上浮动"
    },
    "bottom_bar": {
      "input_field": "'说点什么...'",
      "icons": ["笑脸", "三个点", "购物车", "礼物盒", "分享"]
    }
  }
}
```

<a id="prompt-2b49bd9d04ac93aebca2"></a>

### 24. 潮流视角重塑精致商品广告

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case181.jpg" alt="潮流视角重塑精致商品广告" width="480">

- **分类:** 潮流视角重塑精致商品广告
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-181)

**提示词:**

```text
请以专业设计师的视角重新设计这个商品广告。
采用当前的潮流趋势，针对目标受众的精致设计。
```

<a id="prompt-41f1dd8c3d6ad7f4f2bb"></a>

### 25. 草莓冰淇淋超写实产品摄影

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case79/output.jpg" alt="草莓冰淇淋超写实产品摄影" width="480">

- **分类:** 人像摄影案例
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/ZaraIrahh/status/2047179916161212542)

**提示词:**

```text
超逼真的产品摄影，展示一份丰富的草莓软冰淇淋放在酥脆的华夫饼筒中，采用干净、现代的高端美学风格。冰淇淋是鲜艳的天然粉色，浓稠丝滑，被塑造成一个光滑的漩涡，顶端微微卷曲，轻轻点缀着精致的草莓粉或微小的水果颗粒，呈现出新鲜、诱人的外观。华夫饼筒具有质朴、酥脆的质感，边缘略微不均匀，营造出手工制作的质感。
背景是柔和的米色，自然阳光投射出微妙的树叶阴影，营造出宁静、有机的氛围。前景中包含柔和模糊的绿色植物以增加深度。构图简约、平衡，有效利用负空间，类似于高端美国食品品牌的广告。
在左侧，包含现代英语排版，采用干净、优雅的布局（非垂直）。
主标题：
甜蜜草莓乐园。
副标题（较小文字）：
使用真实草莓制作。丝滑。浓郁。无法抗拒。
添加一个小圆形徽章显示价格：
$5.80。
灯光：柔和的自然日光，温暖的亮点，浅景深，高端商业食品摄影风格。
氛围：清新、高端、现代且诱人 — 与高端美国甜点品牌保持一致。
```

<a id="prompt-4e002a9cd8bb0d0290ba"></a>

### 26. 美妆产品广告图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case264.jpg" alt="美妆产品广告图" width="480">

- **分类:** 美妆产品广告图
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-264)

**提示词:**

```text
为Z世代设计的可爱Y2K风格的平价化妆品广告图像。使用鲜艳的配色，包括荧光色。纵横比为3:4。
```

<a id="prompt-5c318ac449f78a3c699b"></a>

### 27. 李佳琦口红直播背景

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case88/output.jpg" alt="李佳琦口红直播背景" width="480">

- **分类:** UI 与社交媒体模型案例
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/songguoxiansen/status/2047207826913972518)

**提示词:**

```text
李佳琦直播间背景，口红矩阵展示墙，暖光氛围灯，文案OMG买它
```

<a id="prompt-5d6d9a10114efa5433a6"></a>

### 28. 健身蛋白粉电商详情页

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case194.jpg" alt="健身蛋白粉电商详情页" width="480">

- **分类:** 健身蛋白粉电商详情页
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-194)

**提示词:**

```text
健身蛋白粉电商详情图
```

<a id="prompt-6b1867ea2f785253e10a"></a>

### 29. 清新夏日女装连衣裙电商展示

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case189.jpg" alt="清新夏日女装连衣裙电商展示" width="480">

- **分类:** 清新夏日女装连衣裙电商展示
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-189)

**提示词:**

```text
夏季女裙电商详情图
```

<a id="prompt-7141bf2e126852561b9e"></a>

### 30. 全自动咖啡机产品展示

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case190.jpg" alt="全自动咖啡机产品展示" width="480">

- **分类:** 全自动咖啡机产品展示
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-190)

**提示词:**

```text
全自动咖啡机电商详情图
```

<a id="prompt-7440c46718963b2ffac1"></a>

### 31. 西红柿电子商务产品图片集

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/case_case117/output.jpg" alt="西红柿电子商务产品图片集" width="480">

- **分类:** 比较与社区示例
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Adam38363368936/status/2047165092253532461)

**提示词:**

```text
/gpt-image-2 帮我生成关于西红柿的全套产品电商介绍图片

使用地址
```

<a id="prompt-79f91b388325c95ccacf"></a>

### 32. 终结者机器人淘宝详情页

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case301.jpg" alt="终结者机器人淘宝详情页" width="480">

- **分类:** 终结者机器人淘宝详情页
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-301)

**提示词:**

```text
生成图片:
T-800机器人的淘宝商品详情页，展示:
机器人的正面侧面背面三视图，
产品价格，
产品细节，
功能和使用场景等
```

<a id="prompt-9ab9c9927caa1fabe6f3"></a>

### 33. 品牌口红推荐报告信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case353.jpg" alt="品牌口红推荐报告信息图" width="480">

- **分类:** 品牌口红推荐报告信息图
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-353)

**提示词:**

```text
一、系统角色
你是一个专业美妆顾问 + 人脸分析系统 + 品牌视觉设计系统。
你的任务是：基于用户上传自拍与指定口红品牌，生成一张具有品牌调性的“口红推荐报告信息结构图”。

二、输入参数
用户图像：{用户自拍}
品牌：{口红品牌，如 Dior / YSL / Armani / Chanel / TF}
风格偏好（可选）：{通勤 / 温柔 / 气场 / 氛围感 / 显白优先}
推荐数量：3–5

三、品牌视觉层（新增核心模块）
根据 {品牌} 自动构建视觉风格（Brand Visual Identity），提取品牌调性，例如：
Dior：
优雅、高级、法式、灰白 + 银色、柔光
YSL：
黑金、性感、强对比、时尚编辑感
Armani：
低饱和、雾面、克制、灰调高级感
Chanel：
极简黑白、高级、理性、结构清晰
Tom Ford：
深色、高对比、奢华、电影感

视觉应用到海报：
1. 主色调（背景微变化，不是大面积铺色）
2. 强调色（用于色号标题/细线/小元素）
3. 光影风格（柔光 / 强对比 / 冷调 / 暖调）
4. 字体气质（优雅 / 现代 / 冷感 / 力量感）

四、分析层
对用户进行分析：
- 肤色：冷 / 暖 / 中性（+ 明度）
- 气质：清冷 / 温柔 / 明艳 / 干净 / 成熟
- 唇部特征：薄 / 厚 / 唇色基础
- 妆容状态：素颜 / 日常 / 精致
输出一句总结：「更适合 {色系} + {饱和度} + {质地} 的口红方向」

五、推荐层（增强差异）
从 {品牌} 推荐 3–5 个色号：
每个包含：
- 色号名称（#999）
- 色系（正红 / 豆沙 / 枫叶 / 奶茶 / 玫瑰）
- 上脸效果（显白 / 提气色 / 氛围感 / 气场增强）
- 场景（逛街 / 通勤 / 聚餐 / 约会 / 宴会）

要求：每个色号“风格明确区分”（一个日常、一个气场、一个氛围感等）

六、信息结构图
生成竖版信息结构图
整体风格：美妆时尚大片质感 + 结构化信息可视化排版 + 品牌视觉体系深度融合
极简但不单调，高级但有视觉层次

【整体布局】
左上：用户输入区
右上：分析结论
中部：试色矩阵（核心）
底部：总结

## 1️⃣ 左上（用户区）
用户自拍（真实质感）
+ 小标题：「肤色分析」
+ 一句话结论：「适合低饱和玫瑰调，避免高荧光色」

极细品牌色线条（如 YSL 金线 / Dior 灰线）

## 2️⃣ 中部（核心试色矩阵）
这是视觉重点区域（占比60%以上）
展示方式：将 3–5 个色号以“人脸试色对比”的形式排列：
每一列 = 一个色号
每个色号包含：
- 小型人脸图（同一张脸，不同唇色）
- 色号名称（如 #999）
- 色系标签（如 Classic Red）
- 一句话效果说明
要求：所有人脸保持一致，仅唇色变化，真实试色效果（lip color try-on），肤质真实，不塑料，光影统一。
排列方式：横向排布 或 网格排布（整齐但不死板）

品牌增强点：
- Dior：轻柔渐变背景 + 柔光阴影
- YSL：更强对比 + 黑色细分割线
- Armani：整体灰调统一，低对比
- Chanel：严格对齐，极简黑白
- TF：局部暗背景 + 高光强调

## 3️⃣ 每个色号模块
包含：
色号名（突出）
色系标签
一句推荐语
场景标签（逛街/通勤/聚餐/约会/宴会等）

品牌化处理：
- 用“品牌强调色”做：
  - 色号标题
  - 细分隔线
  - 小icon
（不是色块，而是“精致点缀”）

## 4️⃣ 底部总结
一段“有判断力的建议”，
例如：「日常建议选择低饱和豆沙色提升气色，重要场合可使用正红增强气场」
或：「你的肤色更适合柔和玫瑰调，避免高荧光色系」
但不要完全引用以上2个例子的建议，根据用户实际肤色来建议。
品牌增强：底部可加极淡品牌风格横线 / 极小品牌字样（非logo）

七、UI设计
- 不使用圆角卡片 UI
- 不使用厚边框
1. 引入“层级对比”：
   - 主体亮
   - 次要信息弱
2. 使用“微对比”：
   - 细线
   - 灰度差
   - 字重变化
3. 加入“节奏感”：
   - 疏密变化
   - 模块呼吸
4. 品牌点缀：
   - 只用 5% 强调
   - 不破坏极简结构

八、图像质量
真实皮肤质感
唇色精准
统一光影
商业级美妆摄影
8K

———
品牌：YSL
```

<a id="prompt-a962cdb25c601b758109"></a>

### 34. 美容产品商业营销照片

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case46/output.jpg" alt="美容产品商业营销照片" width="480">

- **分类:** 界面
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/AIwithSarah_/status/2047904483359760677)

**提示词:**

```text
一张高分辨率商业营销照片，背景为中性灰色摄影棚，画面中心是一位年轻女性，她有着光滑的黑色头发，身穿粉色针织上衣。前景中突出展示着一个光亮的Ellie Beauty喷雾瓶。构图充满活力，配有鲜艳的酸绿色图形" swooshes"和漂浮的药丸形状标注，以粗体黑色无衬线文字突出显示产品特性，如"光泽效果"和"高达450°F防护"。灯光经过专业柔化，在模特面部形成柔和的高光，同时在金属绿色到金色渐变的瓶身标签上产生垂直的锐利反射。场景顶部右侧有一个大型酸绿色标题，写着"它有什么作用？"，整体呈现出干净、现代、高对比度的美学风格，浅景深使产品和模特专注的表情保持清晰锐利。
```

<a id="prompt-cdc9ceec3117c3bdfc58"></a>

### 35. 绿茶胶片套装产品摄影

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case78/output.jpg" alt="绿茶胶片套装产品摄影" width="480">

- **分类:** 人像摄影案例
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/ZaraIrahh/status/2047180061657452601)

**提示词:**

```text
舒缓绿茶精华套组正面展示，打开的盒子展示柔和鼠尾草绿色的薄膜袋和带有哑光银色瓶盖的透明安瓿瓶，产品居中放置，带有清晰的品牌标识"舒缓绿茶 -- 7天舒缓肌肤"，柔和的绿色背景，带有植物图形装饰，三个简约图标（叶子、波浪、平衡）围绕产品漂浮，强调功效，摄影风格，超精细，超逼真，栩栩如生，8K，高细节，柔和的专业灯光。
```

<a id="prompt-cf592f43707b9b7d01fd"></a>

### 36. 电商商品展示设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case313.jpg" alt="电商商品展示设计" width="480">

- **分类:** 电商商品展示设计
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-313)

**提示词:**

```text
{
  "style": "超写实奢华化妆品产品摄影",
  "composition": {
    "color_scheme": "戏剧性的单色蓝紫色",
    "resolution": "8K超高分辨率",
    "depth": "电影级景深",
    "aesthetic": "高端香氛护肤品广告风格"
  },
  "product": {
    "type": "软管包装",
    "finish": "缎面质感",
    "color": "长春花蓝",
    "label": "NUBELLA",
    "typography": "优雅的银色字体",
    "cap": "反光金属铬盖",
    "position": "垂直居中"
  },
  "surroundings": {
    "smoke": {
      "type": "墨水般的旋涡云雾",
      "colors": [
        "薰衣草色",
        "靛蓝色",
        "冰蓝色"
      ],
      "texture": "柔软、翻腾",
      "interaction": "环绕在产品周围"
    },
    "flowers": {
      "primary": [
        {
          "color": "紫色",
          "details": "错综复杂的花瓣细节",
          "center": "鲜艳的黄色"
        },
        {
          "color": "紫丁香色",
          "details": "错综复杂的花瓣细节",
          "center": "鲜艳的黄色"
        }
      ],
      "secondary": {
        "type": "细小的紫罗兰色花朵",
        "purpose": "增加立体感"
      }
    }
  },
  "lighting": {
    "direction": "来自左上方的柔和定向照明",
    "effects": [
      "突显软管的光滑曲度",
      "为金属盖增添微妙的光泽",
      "在烟雾中营造深度"
    ]
  },
  "background": {
    "blend": "无缝的冷色调蓝色和紫色调",
    "enhancement": "空灵的花香美学"
  },
  "details": "花瓣和蒸汽的超精细纹理"
}
```

<a id="prompt-e3e532edb4fa3b36be7d"></a>

### 37. 电商商品展示设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case141.jpg" alt="电商商品展示设计" width="480">

- **分类:** 电商商品展示设计
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-141)

**提示词:**

```text
{
  "type": "promotional banner design set",
  "theme": "strawberry advertisement campaign",
  "style": "anime illustration, bright, cheerful, commercial graphic design",
  "color_palette": "{argument name=\"primary color theme\" default=\"pastel pink and vibrant red\"}",
  "character": "{argument name=\"character description\" default=\"anime girl with brown side ponytail and bunny ears, wearing a pastel blue and pink jacket\"}",
  "product": "{argument name=\"product\" default=\"fresh red strawberries\"}",
  "layout": {
    "sections": [
      {
        "type": "large landscape banner",
        "position": "top left",
        "visuals": "character winking and holding a strawberry next to a large basket of strawberries",
        "main_text": "{argument name=\"main headline\" default=\"いちごたっぷり\"}",
        "sub_text": ["笑顔あふれる、甘〜いひととき♪", "とびきりおいしい！", "ひと粒で、しあわせ広がる♡", "あまっ♡", "旬のおいしさをお届け！"],
        "badges": {
          "count": 3,
          "labels": ["あま〜くてジューシー！", "いろんなサイズを楽しめる♪", "新鮮朝採れ！"]
        }
      },
      {
        "type": "vertical banner",
        "position": "right",
        "visuals": "character eating a strawberry with a pile of strawberries below",
        "main_text": "いちごたっぷり",
        "sub_text": ["旬のいちごをお届け！", "{argument name=\"secondary headline\" default=\"あま〜くて、ジューシー！\"}", "とろけるおいしさ〜♡"],
        "badges": {
          "count": 3,
          "labels": ["朝採れ新鮮！", "いろんなサイズを楽しめる♪", "甘くてジューシー！"]
        }
      },
      {
        "type": "wide horizontal banner",
        "position": "middle",
        "visuals": "character with closed eyes eating a strawberry, flanked by strawberries",
        "main_text": "いちごたっぷり！",
        "sub_text": ["あまくて、ジューシーな幸せ♡", "旬の美味しさをお届けします！", "おいし〜っ♡"]
      },
      {
        "type": "small square banner",
        "position": "bottom left",
        "visuals": "character smiling holding strawberry",
        "text": ["いちごたっぷり", "あま〜くてジューシー！"]
      },
      {
        "type": "small square banner",
        "position": "bottom mid-left",
        "visuals": "pile of strawberries with one cut in half",
        "text": ["旬のいちご！", "あまくてとろけるおいしさ♡"]
      },
      {
        "type": "small horizontal banner",
        "position": "bottom mid-right",
        "visuals": "character holding strawberry",
        "text": ["いちごたっぷり", "朝採れ新鮮！", "あまくてジューシー！"]
      },
      {
        "type": "circular icons",
        "position": "bottom right",
        "count": 4,
        "items": [
          { "visual": "basket of strawberries", "label": "朝採れ新鮮！" },
          { "visual": "half strawberry", "label": "あまくてジューシー！" },
          { "visual": "whole strawberry", "label": "いろんなサイズ！" },
          { "visual": "character face", "label": "とろけるおいしさ♡" }
        ]
      }
    ]
  }
}
```

<a id="prompt-fc1d6617a8f48abf6700"></a>

### 38. 电商商品展示设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case125.jpg" alt="电商商品展示设计" width="480">

- **分类:** 电商商品展示设计
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-125)

**提示词:**

```text
{
  "type": "anime production layout sheet",
  "style": "traditional colored pencil genga, key animation drawing",
  "subject": {
    "character": "{argument name=\"character name\" default=\"ナズナ 七草\"}",
    "appearance": "anime girl with {argument name=\"hair color\" default=\"light purple\"} hair styled in twin braids and bangs, blue eyes, wearing a dark oversized coat",
    "pose_and_expression": "{argument name=\"expression\" default=\"smug with a small fang, resting chin on hand\"}"
  },
  "background": "{argument name=\"background scene\" default=\"nighttime city skyline with a railing\"}, soft focus",
  "layout": {
    "top_edge": "standard animation paper peg holes",
    "left_margin": {
      "series_title": "{argument name=\"anime title\" default=\"よふかしのうた\"}",
      "production_codes": ["#05 C.", "[A] (1)"],
      "circled_note": "髪のハイライト 色トレスです"
    },
    "right_margin": {
      "red_box": "002.normal",
      "timing_layers": ["A (1)", "B (1) (2) (3)", "C (1) (2) END"],
      "background_notes": ["BL 夜景", "BG 市街地夜景 色トレス"]
    }
  }
}
```
