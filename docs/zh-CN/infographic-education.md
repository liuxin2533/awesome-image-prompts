# 信息图与教育

[返回 README](../../README_zh-CN.md)

本文档包含归入此分类的全部提示词。如需可视化浏览和快速复制，可以打开 [gptimages.dev](https://gptimages.dev)。

- 提示词总数: 75
- 生成时间: 2026-05-06T16:38:27.182Z

## 提示词

<a id="prompt-1db2818a899782279354"></a>

### 1. 信息图 / 教育视觉图 - 日本市场概况 Slides

<img src="https://cms-assets.youmind.com/media/1777971087956_4x8w0g_HGtRO8naoAAmqkW.jpg" alt="信息图 / 教育视觉图 - 日本市场概况 Slides" width="480">

生成一张精美的日本咨询风格 Slides，包含市场增长柱状图、竞争定位矩阵、洞察框以及页脚导航。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/houyaji/status/2051201015710687698#reversed-0)

**提示词:**

```text
{"type":"企业咨询演示 Slides","language":"日语，配有少量英语副标题","format":"16:9 宽屏 Slides，干净的白色背景，海军蓝与宝蓝色商务风格","title":"{argument name=\"main title\" default=\"市场结构与增长空间\"}","subtitle":"Market Landscape","top_right_label":"机密 | 样本","page_number":"02","theme":{"primary_color":"深海军蓝","accent_color":"宝蓝色","secondary_color":"淡蓝色","lines":"细海军蓝分割线","typography":"现代无衬线字体，粗体日语标题，克制的咨询演示文稿风格"},"layout":{"top":{"position":"左上角","content":"大号粗体日语标题，下方配有较小的英语副标题；右上角为机密标签"},"key_message_banner":{"position":"标题下方全宽","background":"极淡蓝色矩形","text":"{argument name=\"key message\" default=\"示唆：市场增长空间巨大，但竞争核心已从“获客量”转向“客户体验”\"}","style":"居中粗体海军蓝日语文本"},"main_content":{"columns":2,"divider":"列间细垂直灰线","left_section":{"title":"市场规模趋势","type":"柱状图","position":"左半部分","chart_details":{"badge":"CAGR 8%","y_axis_label":"(万亿日元)","y_axis_range":"0.0 到 3.0","gridlines":"浅灰色虚线水平网格线","bar_count":5,"bars":[{"year":"2022","value_label":"1.8 万亿日元"},{"year":"2023","value_label":"1.9 万亿日元"},{"year":"2024","value_label":"2.1 万亿日元"},{"year":"2025E","value_label":"2.3 万亿日元"},{"year":"2026E","value_label":"2.5 万亿日元"}],"bar_style":"实心宝蓝色垂直柱"},"note_box":{"count":2,"bullets":["市场持续扩大，但获客竞争日益激烈","高附加值类别的增长带动了整体市场提升"],"style":"带海军蓝左侧强调线的白色边框框"}},"right_section":{"title":"竞争定位","type":"2x2 定位矩阵","position":"右半部分","matrix_details":{"x_axis":"价格竞争力","x_axis_left":"低","x_axis_right":"高","y_axis":"客户体验","y_axis_bottom":"低","y_axis_top":"高","axis_arrows":"指向右侧和上方的黑色箭头","crosshair":"浅灰色虚线垂直和水平中线","bubble_count":4,"bubbles":[{"label":"竞品 A","position":"左上","style":"淡蓝色圆圈"},{"label":"自社","position":"右上","style":"深宝蓝色圆圈，白色文字"},{"label":"竞品 C","position":"左下","style":"极淡蓝色圆圈"},{"label":"竞品 B","position":"右下","style":"极淡蓝色圆圈"}]},"note_box":{"text":"{argument name=\"right insight text\" default=\"胜算：非价格诉求，而是 UX、CRM 及配送质量的一体化改善\"}","style":"带海军蓝左侧强调线的白色边框框"}}},"bottom_navigation":{"position":"底部居中","tab_count":3,"tabs":["市场增长","竞争格局转变","高端化"],"style":"三个海军蓝细边框矩形标签，均匀分布"}},"composition":"精确的 Slides 网格，宽裕的页边距，分隔页眉/内容/页脚的水平海军蓝线，精致的战略咨询 PowerPoint 美学，无照片或插图，清晰的矢量图形"}
```

<a id="prompt-266811467840d21b7b4b"></a>

### 2. 信息图 / 教育视觉图 - 漫画风格品牌形象信息图

<img src="https://cms-assets.youmind.com/media/1777971019409_hnyskv_HHfhKxxaYAA0tBI.jpg" alt="信息图 / 教育视觉图 - 漫画风格品牌形象信息图" width="480">

一个高度详细的提示词，旨在将品牌 Logo 转化为拟人化的漫画风格角色，并通过多面板布局展示各种场景与特征。

- **分类:** 品牌与标志
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/you1873118/status/2051355742150762898)

**提示词:**

```text
使用上传的 Logo，创作一张高度详细的漫画风格信息图海报：

标题：“品牌给人的感觉”
目标：将品牌转化为一个“活生生的个体”，并直观地展示它如何行动、说话以及与世界互动。
融合：品牌策略 + 角色设计 + 漫画叙事

核心规则：所有内容必须源自 Logo 本身（颜色、风格、基调、个性）。禁止使用通用的个性描述。

结构：{argument name="layout" default="竖版 4:5 海报"}，信息密集的多面板布局，{argument name="style" default="漫画与信息图混合风格"}。

主角：创建一个代表品牌拟人化的核心角色。服装、姿态和表情必须反映品牌形象。
面板：6–8 个漫画面板，展示在客户互动、应对竞争或社交媒体表现等场景下的行为。
特征：使用图标的模块化部分，展示语气风格、能量水平和沟通方式。
做与不做：关于品牌一致行为与不一致行为的视觉指南。
最终效果：应看起来像一张值得收藏的拟人化品牌策略项目，而非平庸或通用的设计。
```

<a id="prompt-342148aaa138449450fd"></a>

### 3. 信息图 / 教育视觉图 - 日本摩托车文化年表

<img src="https://cms-assets.youmind.com/media/1777971083278_xu2ml7_HHeUA-ba8AAH-WZ.jpg" alt="信息图 / 教育视觉图 - 日本摩托车文化年表" width="480">

生成一张详尽的日本摩托车信息图表年表，对比 Honda、Yamaha、Suzuki 和 Kawasaki 的主要车型，并展示视觉定制文化趋势。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/369nsm/status/2051270914009092518#reversed-3)

**提示词:**

```text
{"type":"日本摩托车信息图表海报","language":"中文","canvas":"横向 4:3 教育图表，采用简洁的白色背景、红色网格线、醒目的红色标题栏、小型摩托车插图以及详尽的中文注释","headline":"{argument name=\"headline text\" default=\"④ 日本摩托车制造商、名车与外观定制文化年表\"}","subtitle":"名车与制造商重大事件（上段）及外观定制与改装文化（下段）年表对比","layout":{"top_timeline":{"position":"上部三分之二","description":"对比 4 家日本摩托车制造商的矩阵，横跨 8 个年代，每个单元格显示年份、车型名称及小型侧视图摩托车插图","columns_count":8,"columns":["1950 年","1960 年","1970 年","1980 年","1990 年","2000 年","2010 年","2020 年"],"rows_count":4,"rows":[{"maker":"HONDA","logo_style":"红色之翼标志及 HONDA 文字","entries_count":8,"entries":["1958 Super Cub C100","1969 Monkey Z50M","1971 CB400T Hawk II","1981 CBX400F","1992 Monkey R","2008 Monkey/Cub 趣味化表现","2010 定制风格小型摩托车插图","2021 CT125 Hunter Cub"]},{"maker":"YAMAHA","logo_style":"蓝色音叉标志及 YAMAHA 文字","entries_count":7,"entries":["1968 Mate","1974 DT250","1980 XJ400","1983 RZ250 (4L3)","1995 Majesty 125","2005 Majesty (SG20J)","2023 XSR125"]},{"maker":"SUZUKI","logo_style":"红色 S 标志及 SUZUKI 文字","entries_count":8,"entries":["1971 VanVan 90","1976 GS400","1982 GSX400E","1985 RG250Γ","2000 Skywave（初代）","2017 SV650X","2023 GSX-S125","空置/间隔单元格以保持网格对齐"]},{"maker":"Kawasaki","logo_style":"绿色 Kawasaki 标志及文字","entries_count":8,"entries":["1969 500SS","1976 KH400","1981 Z400FX","1983 GPz400F","1998 W650","2003 Estrella","2022 250RS/250TR 系列（新古典谱系）","空置/间隔单元格以保持网格对齐"]}]},"bottom_culture_timeline":{"position":"下部三分之一","section_title":"外观定制与改装文化流变（下段）","description":"7 行横向文化类别，左侧带有浅色类别标签，粉色箭头表示大致流行时期","rows_count":7,"rows":[{"label":"暴走族/族车文化","icon":"小型激进摩托车标志","timeline":"1970 年代起形成 → 1980 年代全盛 → 1990 年代减少 → 2000 年代向旧车会转型"},{"label":"旧车会文化","icon":"旭日风格图标","timeline":"1980 年代后期起旧车暴走族化 → 1990 年代大规模集体骑行可视化 → 2000 年代演变为活动与聚会"},{"label":"Chopper/Bobber","icon":"Chopper 摩托车剪影","timeline":"1960 年代起美式风格流入 → 1970 年代 Chopper 倾向 → 1990 年代 Bobber 重新评价 → 2000 年代成为定制主流"},{"label":"美式/巡航车","icon":"巡航摩托车剪影","timeline":"1980 年代起 DragStar 等登场 → 1990 年代美式机车热潮 → 2000 年代定制化深入"},{"label":"大踏板定制","icon":"大型踏板摩托车剪影","timeline":"2000 年代大踏板热潮 → 2000 年代中期音响、电镀、空力套件 → 2010 年代奢华化与多样化"},{"label":"Cub 定制/迷你摩托车定制","icon":"绿色小型摩托车剪影","timeline":"1990 年代 Cub/Monkey 系定制 → 2000 年代 4-Mini 定制活动增加 → 2010 年代向露营与户外风格转变"},{"label":"新古典/复古","icon":"红色头盔图标","timeline":"2000 年代 SR/W/Estrella 人气 → 2010 年代复古与新古典流行"}]},"right_sidebar":{"position":"右侧边缘","title":"冷知识与杂学","style":"带有红色圆点、虚线分隔符及 8 个小型摩托车或标志插图的垂直列","facts_count":8,"facts":["Cub 于 1958 年问世。","实用型 Cub 后来演变为趣味车型。","暴走族人数在 1982 年达到顶峰。","族车具有极强的外观符号性。","旧车会是旧款二轮车的集体文化。","Z2/CB 系是旧车文化的核心。","大踏板在 2000 年代兴起。","TW 系是街头外观文化。"]},"footer":{"legend_count":2,"legend":["黑/灰色＝名车与重大事件（制造商主要事件与名车）","红/粉色＝文化与定制的扩展（大致时期）"],"note":"※年代划分仅供参考。"}},"visual_style":{"typography":"加粗日系无衬线字体，红色标题，紧凑的黑色标签，清晰的图表层级","colors":"以红色和白色为主，搭配粉色箭头，浅米色/粉色/绿色/淡紫色类别条，制造商标志采用品牌色","illustration_style":"小型清晰的半写实侧视图摩托车插图，带有阴影，色彩与时代各异，强调信息图表的清晰度而非写实感","rendering":"高分辨率可打印海报，文字清晰易读，网格对齐整齐，教育杂志风格"}}
```

<a id="prompt-3ebf4ece16bf69b8b69c"></a>

### 4. 信息图 / 教育视觉图 - 日式 AI 手相鉴定证书

<img src="https://cms-assets.youmind.com/media/1777971080026_8mgh67_HHgeNPNbwAAlSlM.jpg" alt="信息图 / 教育视觉图 - 日式 AI 手相鉴定证书" width="480">

生成一份精美的日式手相报告布局，包含手部图示、掌纹解读、优势、注意事项、生活倾向及建议。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ChatgptAIskill/status/2051422854269530228#reversed-1)

**提示词:**

```text
{"type":"华丽的日式手相鉴定证书信息图","language":"日语","format":"单页垂直 A4 报告","style":"简洁优雅的占卜报告，白色羊皮纸背景，带有花卉边角的细金装饰边框，柔和的米色与金色分隔线，精致的衬线日文字体，柔和的强调色，优化的 GPT Image 2 布局，日文文字清晰易读","headline":"{argument name=\"headline text\" default=\"AI 手相鉴定书\"}","subtitle":"{argument name=\"subtitle text\" default=\"刻在你掌心的命运讯息\"}","date_badge":{"position":"右上角","shape":"金色月桂花环圆圈","text":"鉴定日期\n今日\n（拍摄日期）"},"main_layout":{"top_left_section":{"title":"左手","position":"左上","content":"金色轮廓的开掌极简线条画，掌纹以淡淡的柔和色彩绘制，带有小星星图标和植物叶片装饰","side_notes_count":2,"side_notes":["先天才能","内在与潜能"]},"top_right_section":{"title":"主要掌纹解读","position":"右上","count":5,"items":[{"label":"感情线","color":"粉色","description":"较长且平缓弯曲，性格深情且富有同情心。拥有能够体贴他人感受的温柔。"},{"label":"头脑线","color":"蓝色","description":"相对笔直且长，拥有逻辑性和现实性的思考方式。有计划性，能冷静判断事物。"},{"label":"生命线","color":"绿色","description":"长而清晰，体力与生命力稳定。具有坚韧不拔、勇于面对困难的力量。"},{"label":"命运线","color":"紫色","description":"在手掌中央隐约延伸的线条。属于靠自己开辟道路的类型，努力将转化为未来的成功。"},{"label":"太阳线","color":"橙色","description":"在无名指下方隐约可见的线条。拥有容易获得认可、人气与评价的运势。"}]}},"middle_sections":{"count":2,"sections":[{"title":"3 大优势","position":"中左","items_count":3,"items":[{"icon":"圆圈金星","label":"努力且坚韧","text":"有朝着目标不断积累、坚持到底的能力。"},{"icon":"圆圈金心","label":"同理心与共情力","text":"拥有能够理解他人感受并提供支持的温柔。"},{"icon":"圆圈金山","label":"现实判断力","text":"具备冷静分析事物并做出最佳选择的能力。"}]},{"title":"3 点注意事项","position":"中右","items_count":3,"items":[{"icon":"圆圈灰云","label":"容易想太多","text":"有时会过于谨慎，导致决策时间过长。"},{"icon":"圆圈灰水滴","label":"容易追求完美","text":"理想较高，有对自己过于严苛的倾向。"},{"icon":"圆圈灰新月","label":"容易勉强自己","text":"责任感强，有时会因承担过多而感到疲惫。"}]}]},"lower_tendency_cards":{"count":3,"cards":[{"title":"恋爱倾向","icon":"粉色爱心","border_color":"柔粉色","text":"专一且诚实的爱情类型。珍视对方，建立安心平稳的关系。通过积累信任，培养出长久深厚的羁绊。"},{"title":"工作倾向","icon":"蓝色公文包","border_color":"柔蓝色","text":"有计划性且责任感强，一旦被委以重任便能发挥实力。在支持、协调或发挥专业性的领域容易获得成功。属于脚踏实地的实务派。"},{"title":"金钱倾向","icon":"绿色钱袋","border_color":"柔绿色","text":"擅长稳健管理金钱的类型。比起一夜暴富，通过点滴积累更能获得稳定。知识与 技能 是提升收入的关键。"}]},"bottom_advice_section":{"title":"开运建议","position":"底部全宽","left_panel":{"icon":"金色三叶草","text":"珍惜自己的节奏，不慌不忙地一步步前进是开运的秘诀。通过积累小小的成功体验，自信心与运势会不断提升。有意识地创造放松时间，调整身心平衡。"},"mini_tips_count":3,"mini_tips":[{"icon":"太阳","title":"沐浴晨光，调整节奏","text":"运气的流动会变得更加顺畅。"},{"icon":"花朵","title":"感受自然与绿意","text":"心灵得到治愈，能量随之提升。"},{"icon":"笔记本与铅笔","title":"写下目标与梦想","text":"整理思绪，提升行动力与运势。"}]},"footer":"AI 鉴定书","composition_notes":"使用对称网格布局，卡片分隔清晰，留白充裕，使用细金线和微小的闪光装饰，确保日文文字高度可读。整体氛围应显得高级、柔和、神秘，并适合在社交媒体上分享。","customization_subject":"将证书设计为针对 {argument name=\"reading subject\" default=\"一位冷静、勤奋且富有同理心与现实判断力的人\"} 生成。"}
```

<a id="prompt-9d118ce9893cf33b77d9"></a>

### 5. 信息图 / 教育视觉图 - 日本 AI 商业信息图

<img src="https://cms-assets.youmind.com/media/1777971062502_g3roc8_HHdTX03awAAF22n.jpg" alt="信息图 / 教育视觉图 - 日本 AI 商业信息图" width="480">

生成一张简洁的四步日本风格信息图，解释如何将 AI 创意与实际业务流程相结合。

- **分类:** 角色设计
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/makio_study/status/2051200314251071628#reversed-0)

**提示词:**

```text
{"type":"简洁的日本商业信息图海报","format":"垂直 A4 页面，白色背景，黑色圆角外边框","style":"友好的扁平化线条插图，以青色和珊瑚色为点缀，柔和的圆角矩形，手绘商业草图风格，黑色日文哥特体标题，细青色分割线，带有小闪光和植物图标","language":"日语","headline":"{argument name=\"headline text\" default=\"将 AI 连接到现实商业中\"}","subtitle":"{argument name=\"subtitle text\" default=\"AI 应用的 4 个话题\"}","layout":{"top":"大型居中标题，带有装饰性小闪光，副标题位于虚线水平线之间，配有青色和粉色圆点","main_grid":"四个等大的圆角卡片，排列成 2x2 网格，通过青色箭头图标连接，展示从 1 到 2，再到 3，最后到 4 的流程","bottom_banner":"圆角总结条，左侧带有灯泡图标，中间为日文结束语，右侧为两个友好的人物形象"},"sections":[{"number":"1","position":"左上","title":"{argument name=\"section 1 title\" default=\"从小处着手\"}","main_illustration":"身穿青色连帽衫的年轻人坐在桌前使用笔记本电脑，旁边手机显示可爱的 AI 机器人聊天界面，带有三个人的对话气泡，以及购物篮、步行者、聊天信息、植物和马克杯的小图标","description":"用 AI 解决身边的问题，并通过 MVP 观察反馈","bullet_count":3,"bullets":["发现身边的困扰","小规模制作并立即尝试","根据使用者的反馈进行改进"]},{"number":"2","position":"右上","title":"{argument name=\"section 2 title\" default=\"看清幻想\"}","main_illustration":"一个人在粉色创意云中看着手机，云中包含汽车、电话、包和气泡；第二个人在思考并记录在打开的笔记本中，墙上挂着饼图和上升的柱状图，配有植物、马克杯、放大镜图标","description":"AI 副业不是魔法，业务本质优先","bullet_count":3,"bullets":["不被甜言蜜语或短期热潮所迷惑","将价值提供和收益设计放在首位","建立可持续的机制"]},{"number":"3","position":"左下","title":"{argument name=\"section 3 title\" default=\"扩展创作\"}","main_illustration":"设计师坐在数位板前，面对显示图像编辑界面的桌面显示器，左侧有垂直工具图标，圆形气泡中有小型 AI 机器人助手，配有平板电脑、触控笔、笔筒、网络灯泡图标","description":"Adobe 与 Claude 的联动改变了设计流程","bullet_count":3,"bullets":["AI 辅助创意构思和元素生成","通过 Photoshop 和 Illustrator 高效编辑","让人的创造力进一步加速"]},{"number":"4","position":"右下","title":"{argument name=\"section 4 title\" default=\"输出到现实\"}","main_illustration":"桌面显示器显示 3D 立方体建模软件，通过虚线青色线条连接到正在打印小型可爱机器人模型的 3D 打印机，对话气泡中有几何晶体，地面上有完成的机器人吉祥物","description":"AI 的 3D 数据通过打印机化为实体","bullet_count":3,"bullets":["将数字创意转化为 3D 数据","通过打印机进行原型制作和产品化","将创意转化为现实价值"]}],"bottom_summary":{"icon":"淡粉色圆圈中的灯泡","text":"从小处尝试，看清现实，扩展创造，并将其成型。\n这就是将 AI 连接到商业的最快途径。","characters":"两个微笑的年轻人，一个身穿青色连帽衫指向前方，另一个女性身穿粉色上衣，带有小闪光标记"},"visual_requirements":"使用 4 张编号主题卡片，每张卡片包含 3 个要点，日文文本必须清晰易读，保持宽裕的页边距，圆角设计，青色卡片边框，第 2 和第 4 部分使用珊瑚色圆点，第 1 和第 3 部分使用青色圆点，避免写实风格。"}
```

<a id="prompt-a438e843db59ff34fd8a"></a>

### 6. 信息图 / 教育视觉图 - 神秘的 AI 日本面相占卜报告

<img src="https://cms-assets.youmind.com/media/1777971079045_c5jn4g_HHgeNP4aQAAkZnw.jpg" alt="信息图 / 教育视觉图 - 神秘的 AI 日本面相占卜报告" width="480">

生成一份华丽的日本占卜鉴定书，包含天体肖像、月光金配色布局以及多个可读的报告板块。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ChatgptAIskill/status/2051422854269530228#reversed-0)

**提示词:**

```text
{"type":"华丽的 AI 日本面相占卜海报","format":"单页竖版 A4 风格鉴定书","style":"神秘天体奢华风，深靛蓝与紫色夜空，古董金字体与边框，优雅的日式编辑排版，高度清晰的日语文本，对称构图，柔和发光效果，高级占卜证书美学","palette":{"background":"带有星云纹理的深紫色星空","accents":"金属金线条与文字","glow":"暖奶油色月光与薰衣草色高光"},"main_text":{"headline":"{argument name=\"headline text\" default=\"AI 面相鉴定书\"}","subtitle":"～解读你的本质与光芒～","footer_wish":"愿你的未来如星光般璀璨。","bottom_right_label":"AI 鉴定书"},"central_visual":{"subject":"女性侧脸黑色剪影，面向左侧，发型为松散的卷发盘发，无面部细节","background_object":"头部后方有巨大的发光满月，如同光环，带有圆形占星参考线与光芒","mood":"平静、灵性、精致、内省"},"decorative_elements":{"count":"9 组主要装饰元素","items":["带有华丽花丝边角的细双金边框","左上方悬挂着带有垂坠星链的新月","右上方明亮的星爆","散布在紫色天空中的繁星","标题上下方的金色装饰线条","月亮周围的中心占星圆形图表线","底部地平线，带有山脉以及水面上发光的月亮或太阳","左下角的紫色水晶簇与叶片","下部面板中心的小型新月与星星装饰"]},"layout":{"sections":[{"title":"鉴定日期","position":"中心肖像左侧","count":1,"content":"{argument name=\"reading date\" default=\"2026 年 5 月 5 日\"}","style":"带有白色日期文字的小型金色边框标签"},{"title":"综合寄语","position":"中心肖像右侧","count":1,"content":"你是一位兼具温柔与坚定内核的人，拥有吸引他人的魅力。善用直觉与行动力，你定能开辟出理想的未来。"},{"title":"性格本质","position":"肖像下方中部","count":1,"content":"你拥有感受力丰富且充满慈悲的心。具备出色的观察力，能敏锐地察觉周围的变化。同时，你也有着重视自我信念的坚定内核。"},{"title":"三大优势","position":"第一行左下卡片","count":3,"labels":["共情能力强，能建立值得信赖的人际关系","直觉与洞察力出众，能把握机遇","具备能持续努力的毅力与责任感"],"style":"带有星星符号的金色轮廓矩形卡片"},{"title":"三大注意事项","position":"第一行中下卡片","count":3,"labels":["过于顾虑他人容易感到疲惫","容易因追求完美而给自己施加压力","有时会因思考过多而导致决策迟缓"],"style":"带有星星符号的金色轮廓矩形卡片"},{"title":"恋爱倾向","position":"第一行右下卡片","count":1,"content":"属于重视专一且诚挚爱情的类型。对他人的思念深切，有时会因付出过多而感到疲惫。与能提供安全感的人在一起，能建立起平静而深厚的羁绊。","icon":"金色爱心"},{"title":"工作倾向","position":"底部左侧宽卡片","count":1,"content":"在从事服务他人、支持或协调类的工作中能发挥实力。在需要运用感性与创意的领域也具备天赋。脚踏实地积累，终将获得巨大成就。","icon":"金色新月"},{"title":"开运建议","position":"底部右侧宽卡片","count":3,"labels":["留出属于自己的时间，让心灵重置","相信直觉，积少成多的行动即是开运之道","薰衣草与月光石能为你带来好运"],"style":"带有星星符号的金色轮廓矩形卡片"}]},"composition_notes":"保持标题居中且醒目，肖像与月亮作为视觉中心，确保所有日语文本清晰、平衡且易读。使用细金线和华丽边框分隔板块，避免杂乱。整体效果应呈现为一份由 AI 生成的、精致且适合分享的占卜鉴定报告。","customization":{"face reading theme":"{argument name=\"fortune theme\" default=\"面相占卜\"}","overall message":"{argument name=\"overall message\" default=\"你是一位兼具温柔与坚定内核的人，拥有吸引他人的魅力。\"}"}}
```

<a id="prompt-de42b351099b9c2114ee"></a>

### 7. 信息图 / 教育视觉图 - 日语阅读教学信息图

<img src="https://cms-assets.youmind.com/media/1777971071623_0889wc_HHejl2QawAAckky.jpg" alt="信息图 / 教育视觉图 - 日语阅读教学信息图" width="480">

将手写的日语教学笔记转换为结构化的信息图，以便与教育工作者分享课程设计理念。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/masa_kiiiii/status/2051288032276607293#reversed-2)

**提示词:**

```text
以 REFERENCE_0 和 REFERENCE_1 作为杂乱的手写学习笔记来源，将其内容转换为简洁的垂直日语教学信息图，方便与教师快速分享。保留关于叙事文本阅读课程设计的核心主题，但以视觉化方式组织内容，而非简单复制笔记页面。创建一个精致的白色背景布局，搭配海军蓝章节标题、圆角卡片、简洁的扁平化图标、箭头、复选标记和颜色编码框。添加主标题 {argument name="headline text" default="読む力を育てる授業デザイン"} 和副标题 {argument name="subtitle text" default="〜描写を根拠に、ズレを起点として、解釈を深める授業〜"}。将信息图分为 7 个编号部分以及一个最终总结栏：1) 课程基本结构，分为四个步骤：事实（描写）→ 解釈 → 意味づけ → 自分の言葉；2) 学习深度的三个阶段，标注为：低：表面的理解，中：解释的形成，高：意义的重构；3) 问题设计，包含好问题的条件、问题流程及具体示例提示；4) 提升对话质量的要点，包含两张对比卡片：NG（不佳）和 目指す対話（目标对话），以及关键词标签：比较、关联、再解释；5) 教师最重要的角色，重点在于让“ズレ”（认知偏差/差异）可视化，包含具体行动和 NG 行动的卡片；6) 评估与观察，包含两张卡片：見るポイント（观察要点）和 方法；7) 课程改进的元视角，展示为五个相连的卡片：与前一教材的连接、提高对语言的敏感度、利用最初的“ズレ”、创造“共识的共享”、回顾学习。最后以醒目的总结陈述 {argument name="summary statement" default="描写を根拠に、ズレを起点として、解釈を深める授業"} 和三项检查清单结束：基于根据进行阅读、通过对话扩展思维、用自己的语言赋予意义。使最终结果看起来像专业设计的日语教学讲义，而非笔记照片。
```

<a id="prompt-ff17e1d962746175f411"></a>

### 8. 信息图 / 教育视觉图 - 幻灯片设计：反面教材与正面案例对比图

<img src="https://cms-assets.youmind.com/media/1777971089954_3rw1ha_HHd4t7-asAA93q_.jpg" alt="信息图 / 教育视觉图 - 幻灯片设计：反面教材与正面案例对比图" width="480">

生成一张日语对比幻灯片，展示如何将 AI 生成的文本简化为一个清晰的信息点，从而使演示文稿更易于理解。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/kemu_aii/status/2051240911896723848#reversed-0)

**提示词:**

```text
{"type":"简洁的日语演示文稿信息图，对比糟糕与优秀的幻灯片设计","format":"16:9 宽屏幻灯片，白色背景，极简企业风格","headline":"{argument name=\"headline text\" default=\"同样的内容，呈现方式大不同\"}","subtitle":"{argument name=\"subtitle text\" default=\"不要直接将 AI 生成的文本放入幻灯片，先进行人工精简\"}","layout":{"top":"居中大号加粗黑色日语标题，下方居中较小的灰色副标题","comparison_panels":[{"title":"反面案例","position":"左半部分","style":"密集的黑白灰单色方框幻灯片，包含许多微小部分，刻意显得杂乱且难以阅读","main_heading":"AI 应用的关键点","section_count":9,"sections":[{"label":"AI 应用的优势","description":"带有微小蓝色柱状图图标的小列表"},{"label":"可应用领域（示例）","description":"一排密集的胶囊标签，如：企划、市场、销售、客户、开发、设计、人事、法务、分析等"},{"label":"主要 AI 技术","description":"带有小型大脑图标的紧凑型项目符号列表"},{"label":"导入步骤","description":"6 个步骤的垂直数字列表：1 明确目的，2 整理课题，3 工具选型，4 小范围试用，5 效果验证，6 改善与扩大"},{"label":"应用创意（示例）","description":"密集的用例项目符号列表"},{"label":"应用流程（概要）","description":"由箭头连接 5 个图标的水平流程图：输入、AI 处理与生成、输出、应用与改善"},{"label":"成功要点","description":"包含 5 个简短条目的核对清单"},{"label":"注意事项与风险","description":"警告三角形和风险项目符号列表"},{"label":"推荐工具（示例）","description":"包含 ChatGPT、Gemini、Claude、Copilot、Notion AI、Canva AI、Perplexity 等多个工具的小按钮"}],"bottom_note":"总结：AI 并非万能，但正确使用可带来巨大成果。从小处着手，在学习中不断扩大规模是成功的关键。"},{"title":"正面案例","position":"右半部分","style":"简洁宽敞的白色卡片，带有细蓝色边框和蓝色标题标签","main_message":"{argument name=\"main message\" default=\"1 张幻灯片 = 1 个核心信息\"}","sub_message":"{argument name=\"sub message\" default=\"2 秒内传达到位\"}","visual_flow":{"count":3,"items":[{"label":"精简","icon":"浅蓝色圆圈中的剪刀"},{"label":"整理","icon":"中蓝色圆圈中的闪光"},{"label":"传达","icon":"深蓝色圆圈中的扩音器"}],"connectors":"三个图标之间有两个粗蓝色箭头"}}]},"colors":{"primary_blue":"#0057d8","light_blue":"#d6ebff","black":"#111111","gray":"#555555"},"typography":"粗体现代日语无衬线字体，强烈的层级感，右侧极具可读性，左侧刻意显得冗余","composition":"清晰的并排对比：左侧为杂乱的反面案例，右侧为简化的正面案例，留白充足，矢量图形清晰"}
```

<a id="prompt-a14e1cc7fb8ff16f8c69"></a>

### 9. 时尚服装系列信息图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/poster_case171/output.jpg" alt="时尚服装系列信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/cellinlab/status/2049073530738754042)

**提示词:**

```text
{
  "image_type": "商业时尚信息图",
  "subject": {
    "model": "年轻亚洲女性，拥有优雅的面容和深色头发，松松地挽成发髻",
    "attire": "缎面中长款连衣裙，细肩带，垂坠式U型领口",
    "fit": "紧身/修身款式，侧面有褶皱设计，腿部有细微开衩"
  },
  "layout_structure": {
    "composition": "多版面编辑布局",
    "header": "粗衬线字体标题，显示'服装系列'",
    "main_feature": "大型居中肖像，模特为年轻亚洲女性，穿着酒红色缎面连衣裙",
    "secondary_panels": [
      "服装特点网格，配有极简图标",
      "服装指南侧边栏，详细说明领口、袖型和长度",
      "色彩系列行，展示黑色、祖母绿、海军蓝、香槟色和皇家蓝色的连衣裙",
      "服装风格指南页脚，模特出现在各种氛围浓郁的晚间场景中"
    ]
  },
  "aesthetic_style": {
    "color_palette": "深色宝石色调（酒红色、祖母绿、海军蓝、皇家蓝）与香槟色和黑色形成对比，背景为温暖的奶油色或米色",
    "lighting": "柔和的影棚灯光，在缎面织物纹理上呈现出优雅的高光",
    "vibe": "奢华、永恒且精致的商业广告风格"
  },
  "typography": {
    "primary": "经典衬线字体用于标题",
    "secondary": "简洁的无衬线字体用于正文和技术细节"
  }
}
```

<a id="prompt-22c1b920832dadafff57"></a>

### 10. 亲子沟通障碍信息图

- **分类:** 信息图与教育
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/sarinaashapi/status/2048307780864606708)

**提示词:**

```text
{"type":"日式信息图表","style":"简单易懂的扁平矢量图，干净的白色背景，圆角浅灰色外框，柔和的极简调色板，演示幻灯片设计，清晰的层次结构，充足的留白，现代无衬线日文字体","canvas":{"aspect_ratio":"16:9"},"headline":{"text":"{argument name=\"headline text\" default=\"亲子间的分歧源于是否有记录\"}","position":"顶部居中","size":"大号粗体黑色"},"layout":{"structure":"标题下方两个并排的圆角面板","sections":[{"title":"没有记录时(产生分歧)","position":"左侧","count":8,"header_color":"柔和蓝灰色","panel_border":"浅灰色","labels":["父母的记忆","孩子的记忆","那时候不是已经决定了吗","我还在思考中","分歧越来越大","志愿学校频繁变化","理由是\"总觉得\"","说的话不一致","关系变得紧张","希望看到现实","希望好好决定","插手过多会导致关系恶化"],"contents":{"top_left":{"type":"带思考气泡的父母图标","icon_color":"蓝色","caption":"父母的记忆","bubble_text":"那时候\n不是已经决定了吗"},"top_right":{"type":"带思考气泡的孩子图标","icon_color":"粉色","caption":"孩子的记忆","bubble_text":"我还在思考中"},"center":{"type":"水平双向箭头","color":"蓝灰色"},"bottom_center":{"type":"向下箭头指向爆炸形状","color":"浅灰色","burst_text":"分歧\n越来越大"},"bottom_left":{"type":"圆角注释框","bullet_count":4,"bullets":["志愿学校频繁变化","理由是\"总觉得\"","说的话不一致","关系变得紧张"]},"bottom_right":{"type":"圆角注释框","bullet_count":3,"bullets":["希望看到现实","希望好好决定","插手过多会导致关系恶化"]}}},{"title":"有记录时(不易产生分歧)","position":"右侧","count":7,"header_color":"芥末黄色","panel_border":"浅黄色","labels":["父母的认知","孩子的认知","记录"],"contents":{"top_left":{"type":"带包含文档符号的思考气泡的父母图标","icon_color":"蓝色","caption":"父母的认知"},"top_right":{"type":"带包含文档符号的思考气泡的孩子图标","icon_color":"粉色","caption":"孩子的认知"},"center":{"type":"水平双向箭头","color":"芥末黄色"},"bottom_center":{"type":"带文档符号的圆形记录图标","outline_color":"芥末黄色","text":"记录"},"bottom_left_connector":{"type":"从父母到记录的曲线箭头","color":"蓝色"},"bottom_right_connector":{"type":"从孩子到记录的曲线箭头","color":"粉色"}}}],"spacing":"平衡，对称"},"visual_language":{"icons":"通用人像图标和简单文档线条图标","emphasis":"对比左侧面板的误解与右侧面板的共享记录","mood":"教育性，平静，实用"},"text_language":"日语","render_quality":"清晰的矢量边缘，适合社交媒体教育帖子的信息图表"}
```

<a id="prompt-963342595f4a201b2b05"></a>

### 11. 城市美食地图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/poster_case110/output.jpg" alt="城市美食地图" width="480">

- **分类:** 信息图与教育
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/mm_zzm44854/status/2045861258520568230)

**提示词:**

```text
{
  "type": "插图式地图信息图",
  "style": "{argument name=\"art style\" default=\"复古羊皮纸上的水彩和墨水手绘插图\"}",
  "title_section": {
    "text": "{argument name=\"city name\" default=\"成都\"} {argument name=\"map title\" default=\"吃货暴走地图\"}",
    "mascot": "戴着太阳镜并竖起大拇指的卡通红辣椒"
  },
  "border": "{argument name=\"border decoration\" default=\"绿叶和红辣椒的藤蔓\"}",
  "layout": {
    "background": "纹理米色羊皮纸，有黄色道路、蓝色河流和绿色公园区域",
    "sections": [
      {
        "title": "地标",
        "count": 6,
        "illustrations": ["传统亭子", "传统寺庙", "有攀爬熊猫的现代摩天大楼", "高电视塔", "传统门楼", "工业建筑"],
        "labels": ["人民公园", "文殊院", "IFS", "339电视塔", "宽窄巷子", "东郊记忆"]
      },
      {
        "title": "美食地点",
        "count": 12,
        "illustrations": ["麻婆豆腐", "红油饺子", "锅串串", "糯米团子", "蛋烘糕", "九宫格火锅", "甜水面", "冷锅串串", "麻辣拌", "盖碗茶", "冰粉", "兔头"],
        "labels": ["1 陈麻婆豆腐", "2 钟水饺", "3 春熙路", "4 宽窄巷子·三大炮", "5 建设路·叶婆婆蛋烘糕", "6 玉林路·小龙坎火锅", "7 香香巷·肥肠粉", "8 武侯祠大街·钵钵鸡", "9 东郊记忆·冒椒火辣", "10 人民公园·鹤鸣茶社", "11 锦里古街·冰粉", "12 双流老妈兔头"]
      },
      {
        "title": "图例",
        "position": "右下角",
        "count": 5,
        "items": ["红点", "绿色房屋", "绿色树木", "蓝色线条", "黄色双线"],
        "labels": ["美食地点", "地标景点", "公园绿地", "河流湖泊", "主要道路"]
      }
    ],
    "centerpiece": "坐着吃竹子的大熊猫",
    "bottom_right_extras": ["带有N、S、E、W的复古指南针", "免责声明文本'温馨提示:吃辣需谨慎,肠胃要保护~'，配有红辣椒图标"]
  }
}
```

<a id="prompt-ff20dd5f950e5b6c1489"></a>

### 12. 手绘城市美食地图

<img src="https://cms-assets.youmind.com/media/1776662673014_nf0taw_HGRMNDybsAAGG88.jpg" alt="手绘城市美食地图" width="480">

生成一张手绘水彩风格的旅游地图，包含编号的当地特色美食、地标建筑及图例。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/mm_zzm44854/status/2045861258520568230#reversed-1)

**提示词:**

```text
{
  "type": "手绘地图信息图",
  "style": "{argument name=\"art style\" default=\"复古羊皮纸上的水彩墨水手绘插画\"}",
  "title_section": {
    "text": "{argument name=\"city name\" default=\"成都\"} {argument name=\"map title\" default=\"吃货暴走地图\"}",
    "mascot": "戴着墨镜并竖起大拇指的卡通红辣椒"
  },
  "border": "{argument name=\"border decoration\" default=\"绿叶与红辣椒藤蔓\"}",
  "layout": {
    "background": "带有黄色道路、蓝色河流和绿色公园区域的纹理米色羊皮纸",
    "sections": [
      {
        "title": "地标建筑",
        "count": 6,
        "illustrations": ["传统凉亭", "传统寺院", "带有攀爬熊猫的现代摩天大楼", "高耸的电视塔", "传统牌坊", "工业建筑"],
        "labels": ["人民公园", "文殊院", "IFS", "339电视塔", "宽窄巷子", "东郊记忆"]
      },
      {
        "title": "美食地点",
        "count": 12,
        "illustrations": ["麻婆豆腐", "红油水饺", "冷锅串串", "三大炮", "蛋烘糕", "九宫格火锅", "肥肠粉", "钵钵鸡", "冒菜", "盖碗茶", "冰粉", "兔头"],
        "labels": ["1 陈麻婆豆腐", "2 钟水饺", "3 春熙路", "4 宽窄巷子·三大炮", "5 建设路·叶婆婆蛋烘糕", "6 玉林路·小龙坎火锅", "7 香香巷·肥肠粉", "8 武侯祠大街·钵钵鸡", "9 东郊记忆·冒椒火辣", "10 人民公园·鹤鸣茶社", "11 锦里古街·冰粉", "12 双流老妈兔头"]
      },
      {
        "title": "图例",
        "position": "右下角",
        "count": 5,
        "items": ["红点", "绿色建筑", "绿树", "蓝线", "黄色双线"],
        "labels": ["美食地点", "地标景点", "公园绿地", "河流湖泊", "主要道路"]
      }
    ],
    "centerpiece": "坐着吃竹子的大熊猫",
    "bottom_right_extras": ["带有东南西北方向的复古罗盘", "带有红辣椒图标的免责声明：'温馨提示：吃辣需谨慎，肠胃要保护~'"]
  }
}
```

<a id="prompt-034b6a009f1f0e9ec37e"></a>

### 13. 发型比较分析

<img src="https://pbs.twimg.com/media/HGnE60casAAcDLF?format=jpg&amp;name=large" alt="发型比较分析" width="480">

原帖提示说该提示在回复中；此提示是根据可见输出和推文上下文重建的。

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/garenaguinaldox/status/2047384051322081738)

**提示词:**

```text
使用这张图片创建一个发型分析图表。并排展示发型对比，突出显示哪些发型最适合该人物。以视觉效果为主，只使用简短标签，并包含关于发型的详细信息。
```

<a id="prompt-03eded6bdca064268996"></a>

### 14. 手机爆炸拆解图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case361.jpg" alt="手机爆炸拆解图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-361)

**提示词:**

```text
Create a 3D Insane detailed exploded assembly drawing of [subject or object]
```

<a id="prompt-0723d4ac8c12572d0293"></a>

### 15. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case18.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-18)

**提示词:**

```text
{
  "type": "illustrated map infographic",
  "style": "{argument name=\"art style\" default=\"watercolor and ink hand-drawn illustration on vintage parchment\"}",
  "title_section": {
    "text": "{argument name=\"city name\" default=\"成都\"} {argument name=\"map title\" default=\"吃货暴走地图\"}",
    "mascot": "cartoon red chili pepper wearing sunglasses and giving a thumbs up"
  },
  "border": "{argument name=\"border decoration\" default=\"vine of green leaves and red chili peppers\"}",
  "layout": {
    "background": "textured beige parchment paper with yellow roads, blue rivers, and green park areas",
    "sections": [
      {
        "title": "landmarks",
        "count": 6,
        "illustrations": ["traditional pavilion", "traditional monastery", "modern skyscraper with climbing panda", "tall TV tower", "traditional gate", "industrial buildings"],
        "labels": ["人民公园", "文殊院", "IFS", "339电视塔", "宽窄巷子", "东郊记忆"]
      },
      {
        "title": "food_spots",
        "count": 12,
        "illustrations": ["mapo tofu", "dumplings in chili oil", "skewers in pot", "sticky rice balls", "egg baking cake", "nine-grid hotpot", "sweet potato noodles", "cold skewers", "spicy mixed dish", "covered tea bowl", "ice jelly dessert", "spicy rabbit heads"],
        "labels": ["1 陈麻婆豆腐", "2 钟水饺", "3 春熙路", "4 宽窄巷子·三大炮", "5 建设路·叶婆婆蛋烘糕", "6 玉林路·小龙坎火锅", "7 香香巷·肥肠粉", "8 武侯祠大街·钵钵鸡", "9 东郊记忆·冒椒火辣", "10 人民公园·鹤鸣茶社", "11 锦里古街·冰粉", "12 双流老妈兔头"]
      },
      {
        "title": "图例",
        "position": "bottom-right",
        "count": 5,
        "items": ["red dot", "green house", "green tree", "blue line", "yellow double line"],
        "labels": ["美食地点", "地标景点", "公园绿地", "河流湖泊", "主要道路"]
      }
    ],
    "centerpiece": "giant panda sitting and eating bamboo",
    "bottom_right_extras": ["vintage compass rose with N, S, E, W", "disclaimer text '温馨提示：吃辣需谨慎，肠胃要保护~' with a red chili pepper icon"]
  }
}
```

<a id="prompt-095da2060bda9a9a7d82"></a>

### 16. 三甲医院真实门诊处方笺

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case201.jpg" alt="三甲医院真实门诊处方笺" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-201)

**提示词:**

```text
一张三甲医院的门诊处方笺，医生潦草的手写字，包含真实合理的 诊断、药品名、剂量，右下角有医生签名和科室章。
```

<a id="prompt-0bbe7ba5ffaa2f697f9b"></a>

### 17. 古希腊三哲时间轴城市图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case375.jpg" alt="古希腊三哲时间轴城市图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-375)

**提示词:**

```text
二千五百年前，柏拉图，苏格拉底， 亚力士多德，坐在雅典街头聊天，聊出了世界文明史的源头。

背景可以加上他们聊天内容，按时间轴的走向，重叠在古希腊雅典的城市风光中。
```

<a id="prompt-109b11f6713742227150"></a>

### 18. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case67.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-67)

**提示词:**

```text
{
  "type": "medical infographic poster",
  "style": "highly detailed anatomical illustrations, clean structured layout, scientific diagrammatic style",
  "color_palette": "{argument name=\"color palette\" default=\"medical red, blue, beige, and anatomical flesh tones\"}",
  "language": "{argument name=\"language\" default=\"bilingual Chinese and English\"}",
  "header": {
    "main_title": "{argument name=\"main title\" default=\"糖尿病诞生的因果链\"}",
    "english_title": "{argument name=\"english title\" default=\"THE CAUSAL CHAIN OF DIABETES\"}",
    "subtitle": "从胰岛素失灵，到高血糖，到全身损伤"
  },
  "layout": {
    "centerpiece": "{argument name=\"central subject\" default=\"transparent human body showing circulatory system and internal organs\"}",
    "sections_count": 14,
    "sections": [
      { "id": "01", "title": "葡萄糖进入生命", "visuals": ["stomach and intestines"] },
      { "id": "02", "title": "胰腺与胰岛素", "visuals": ["pancreas", "beta cell"] },
      { "id": "03", "title": "正常胰岛素作用", "visuals": ["receptor signaling diagram", "muscle, liver, adipose icons"] },
      { "id": "04", "title": "胰岛素抵抗: 2型通路开始", "visuals": ["receptor blockage diagram", "7 lifestyle icons"] },
      { "id": "05", "title": "肝脏持续释放葡萄糖", "visuals": ["liver"] },
      { "id": "06", "title": "β细胞衰竭: 代偿到失败", "visuals": ["beta-cell decline line chart"] },
      { "id": "07", "title": "1型糖尿病分支", "visuals": ["autoimmune destruction diagram"] },
      { "id": "08", "title": "高血糖与血液化学", "visuals": ["blood vessel with glucose", "glucose indicators table", "glucose variability chart"] },
      { "id": "09", "title": "高血糖导致组织损伤", "visuals": ["4 pathways of damage diagrams"] },
      { "id": "10", "title": "急性代谢后果", "visuals": ["7 symptom icons"] },
      { "id": "11", "title": "微血管并发症", "visuals": ["eye", "kidney", "nerve cross-section"] },
      { "id": "12", "title": "大血管并发症与组织损伤", "visuals": ["heart", "brain", "diabetic foot"] },
      { "id": "13", "title": "器官系统长期代价", "visuals": ["text list"] },
      { "id": "14", "title": "糖尿病是调控系统失灵", "visuals": ["metabolic control flowchart"] }
    ],
    "footer": {
      "core_message": "核心信息 CORE MESSAGE"
    }
  }
}
```

<a id="prompt-172c97d2cb834c02a96c"></a>

### 19. 关键人物关系图谱

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case241.jpg" alt="关键人物关系图谱" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-241)

**提示词:**

```text
请你生成 《XXX》 的关键人物关系图。
```

<a id="prompt-18ed91172bdc24cc76ff"></a>

### 20. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case82.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-82)

**提示词:**

```text
{
  "type": "scientific optical setup diagram",
  "main_setup": {
    "base": "optical breadboard table with grid of mounting holes",
    "beam": "red laser beam passing horizontally through all components",
    "top_grouping_brackets": [
      "{argument name=\"first component group\" default=\"Dual Modulation\"}",
      "4f Relay Optics",
      "Imaging Optics",
      "Detection"
    ],
    "components_left_to_right": [
      { "name": "Laser", "label": "{argument name=\"laser wavelength\" default=\"λ = 632.8 nm\"}", "appearance": "black rectangular box" },
      { "name": "SLM1", "label": "(Phase / Pol. Mod.)", "appearance": "black square device on post" },
      { "name": "Lens L1", "label": "(f1)", "appearance": "lens in black ring mount" },
      { "name": "Iris", "label": "Fourier Plane (Pupil Plane) / (Higher Orders Filtered)", "appearance": "black ring mount with dashed line above" },
      { "name": "HWP", "label": "(λ/2)", "appearance": "purple-tinted optic in black ring mount" },
      { "name": "Lens L2", "label": "(f1)", "appearance": "lens in black ring mount" },
      { "name": "SLM2", "label": "(Phase / Pol. Mod.)", "appearance": "black square device on post" },
      { "name": "Lens L3", "label": "(f2)", "appearance": "lens in black ring mount" },
      { "name": "Lens L4", "label": "(f2)", "appearance": "lens in black ring mount" },
      { "name": "Linear Polarizer", "label": "(Global Analyzer)", "appearance": "lens in black ring mount" },
      { "name": "Polarization Camera", "label": "POLARIZATION CAMERA", "appearance": "blue and black box camera" }
    ]
  },
  "inset_diagram": {
    "position": "bottom right, dashed border",
    "title": "{argument name=\"inset title\" default=\"Polarization Camera Micro-Polarizer Array\"} (Per-Pixel Analyzer)",
    "visuals": "4x4 grid of colored squares with white directional arrows",
    "legend_count": 4,
    "legend_labels": [
      "red right-arrow 0° (H)",
      "green up-arrow 90° (V)",
      "blue diagonal-arrow 45° (D)",
      "yellow diagonal-arrow 135° (A)"
    ]
  },
  "bottom_caption": {
    "figure_number": "Fig. 5.",
    "title": "{argument name=\"setup title\" default=\"Ellipsography Hardware Setup.\"}",
    "description": "{argument name=\"figure caption\" default=\"Our prototype display system employs a dual-modulation configuration to achieve simultaneous control of phase and polarization. A 4f relay optics setup transfers the modulated wavefront...\"}"
  }
}
```

<a id="prompt-2cec2bf05920583b3c4d"></a>

### 21. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case112.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-112)

**提示词:**

```text
Generate a 12-grid card image of the 12 Golden Saints from Saint Seiya, with each card featuring its corresponding Chinese name, 4 cards per row, in a 16:9 aspect ratio.
```

<a id="prompt-3289a1a721a10494e192"></a>

### 22. 零食品牌技术分解图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case310.jpg" alt="零食品牌技术分解图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-310)

**提示词:**

```text
创建一个 [SNACK] 的品牌技术信息图，结合产品的真实照片或照片级真实渲染，并将技术注释覆盖层直接置于其上。在纯白摄影棚背景上使用带有策略性 [BRAND COLOR] 点缀的黑色墨水风格线条画（建筑草图外观），包括：
• 关键组件标签
• 显示结构、分层或内部设计的内部截面图
• 测量数据、尺寸和规格
• 带有成分和数量的材料标注
• 指示主要功能和结构完整性的箭头
• 显示关键机械或设计元素的简单示意图或剖面图
• 可持续性标注
标题位置：位于手绘技术注释框内，带有强调色边框，粗体字显示产品名称，置于上角。
风格与布局规则：
• 真实产品保持清晰可见
• 注释具有素描感、技术感和建筑感
• 强调色用于高光（占线条工作的 20-30%），黑色用于主要技术线条（70-80%）
• 构图整洁，负空间平衡
• 具有教育意义、食品工程氛围和高端品牌感
• 在角落包含微妙的品牌标志
视觉风格：极简技术插画美学，黑色线条在真实图像上带有点缀，精确但略带手绘感。
调色板：白色背景，黑色注释线/文本，[BRAND COLOR] 仅用于点缀和关键标注。
输出：1080×1080，超清晰，社交媒体动态优化，无水印。
```

<a id="prompt-340549b2cc6eaee8ec15"></a>

### 23. 编辑此图片，使总金额更改为244.5泰铢。您可以更改...

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/case_case66/output.jpg" alt="编辑此图片，使总金额更改为244.5泰铢。您可以更改..." width="480">

- **分类:** 信息图与教育
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/elliscrosby/status/2047211507596071235)

**提示词:**

```text
编辑此图像，使总金额变为244.5泰铢。您可以改变每堆硬币的数量，直到达到目标总额。
```

<a id="prompt-3ac0939738ffdcb1ce93"></a>

### 24. 品牌人格漫画信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case379.jpg" alt="品牌人格漫画信息图" width="480">

- **分类:** 品牌与标志
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-379)

**提示词:**

```text
Using the uploaded logo, create a highly detailed, comic-style infographic poster:

“What This Brand Feels Like”

GOAL:
Turn the brand into a living personality and visually explain how it behaves, speaks, and interacts with the world.
This must feel like a mix of: brand strategy + character design + comic storytelling.

---

CORE RULE:
Everything must come from the logo:
- colors
- style
- tone
- personality

No generic personality traits.

---

MAIN STRUCTURE:
Vertical 4:5 poster
Dense layout with multiple panels
Comic + infographic hybrid

---

TOP SECTION:
- Brand name
- Short personality statement (max 6 words)
Example: “Quiet confidence with sharp edges”

---

MAIN CHARACTER (VERY IMPORTANT):
Create a central character representing the brand:
- humanized version of the brand
- outfit reflects brand style
- posture + expression reflect personality

---

AROUND THE CHARACTER:
Create 6–8 comic panels showing how the brand behaves in different situations.

---

SCENARIO IDEAS:
- Talking to customers
- Handling competition
- Selling a product
- Social media presence
- Reacting to criticism
- Daily “brand life” moment

---

FOR EACH PANEL:
Include:
- short caption (max 6 words)
- speech bubble or internal thought
- clear visual action

---

TONE EXAMPLES:
Luxury brand: calm, confident, minimal speech
Playful brand: loud, chaotic, expressive
Tech brand: precise, logical, clean

---

PERSONALITY TRAITS SECTION:
Add small labeled blocks:
- Voice tone (e.g. calm, bold, playful)
- Energy level (low / medium / high)
- Social behavior (introvert / extrovert)
- Communication style

Use:
- icons
- short labels

---

DO / DON’T SECTION:
Add a split block:
DO:
- how the brand should act
DON’T:
- what breaks the identity

Keep:
- very short phrases

---

VISUAL ELEMENTS:
- speech bubbles
- icons
- arrows
- small reactions
- exaggerated comic expressions

---

STYLE:
- comic + editorial hybrid
- slightly exaggerated but still premium
- expressive but not childish

---

COLOR:
- strictly based on logo palette
- use color to reinforce personality

---

DEPTH:
- 20–40 visual elements
- multiple small panels
- layered composition

---

IMPORTANT RULES:
- must feel alive
- must feel specific
- no generic marketing words
- no empty areas
- keep text short but impactful

---

FINAL FEEL:
Like:
- a brand strategy turned into a character
- a visual storytelling board
- something people save and study

NOT:
- flat
- generic
- minimal
```

<a id="prompt-42f4184676faa39d9756"></a>

### 25. 复古传统老黄历二零二六年四月十八

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case295.jpg" alt="复古传统老黄历二零二六年四月十八" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-295)

**提示词:**

```text
生成一张2026年4月18日的老黄历
```

<a id="prompt-4427c1ad5a1a9a3100be"></a>

### 26. 天坛古建拆解全图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case211.jpg" alt="天坛古建拆解全图" width="480">

- **分类:** 建筑与空间
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-211)

**提示词:**

```text
生成一个天坛的建筑拆解图，有详细的说明，中式美学风格
```

<a id="prompt-49e5be3252883812c292"></a>

### 27. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case66.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-66)

**提示词:**

```text
{
  "type": "fashion design process infographic",
  "title": "{argument name=\"main title\" default=\"一件女装诞生的因果链 THE CAUSAL CHAIN OF A WOMEN'S GARMENT\"}",
  "subtitle": "从纤维，到版型，到上身 FROM FIBER TO FIT",
  "style": {
    "aesthetic": "elegant editorial, technical fashion illustration, highly detailed",
    "color_palette": "{argument name=\"color palette\" default=\"beige, cream, and neutral tones\"}"
  },
  "layout": {
    "centerpiece": {
      "description": "Exploded-view illustration of a {argument name=\"garment type\" default=\"women's trench coat dress\"} showing cascading layers of fabric, pattern pieces, and stitching lines. Top shows a model wearing the finished garment.",
      "central_list": {
        "count": 13,
        "type": "numbered steps with pointer lines",
        "labels": ["01 Material", "02 Inspiration", "03 Sketch", "04 Fabric", "05 Draping", "06 Pattern", "07 Sewing", "08 Fitting", "09 Revision", "10 Team", "11 Construction", "12 Garment", "13 Collaboration"]
      }
    },
    "left_column": [
      {
        "module": "MODULE 1: RAW MATERIAL AND FABRIC",
        "count": 6,
        "items": ["Fiber", "Yarn Structure", "Fabric Construction", "Weight", "Drape", "Surface Texture"]
      },
      {
        "module": "MODULE 2: INSPIRATION AND DIRECTION",
        "count": 5,
        "items": ["Inspiration Source", "Color Direction", "Woman Image", "Occasion Positioning", "Silhouette Intention"]
      },
      {
        "module": "MODULE 3: DESIGN SKETCH AND SILHOUETTE",
        "count": 7,
        "items": ["Design Sketch", "Construction Line", "Front Back Relationship", "Neckline", "Shoulder Line", "Waist Line", "Hem Proportion"]
      }
    ],
    "right_column": [
      {
        "module": "MODULE 4: PATTERNMAKING AND DRAPING",
        "count": 6,
        "items": ["Draping", "Patternmaking", "Dart", "Panel Line", "Ease", "Grain Direction"]
      },
      {
        "module": "MODULE 5: CUTTING AND SAMPLING",
        "count": 5,
        "items": ["Cutting", "Layout", "Sample Sewing", "Construction Sequence", "Technique Test"]
      },
      {
        "module": "MODULE 6: FITTING AND REVISION",
        "count": 4,
        "items": ["Fitting", "Fit Issues", "Before", "After"]
      }
    ],
    "bottom_row": [
      {
        "module": "MODULE 7: TEAM COLLABORATION",
        "count": 8,
        "items": ["Designer", "Patternmaker", "Fabric Buyer", "Sample Maker", "Merchandiser", "QC", "Feedback Loop", "Model"]
      },
      {
        "module": "MODULE 8: FINAL GARMENT PRESENTATION",
        "count": 3,
        "items": ["Details", "Finished Front & Back", "Labels & Care"]
      },
      {
        "module": "MODULE 9: FINAL WEAR",
        "count": 3,
        "items": ["Drape", "Proportion", "Movement in Motion"]
      },
      {
        "module": "MODULE 10: THE CHAIN SUMMARY",
        "count": 8,
        "items": ["Material Foundation", "Aesthetic Judgment", "Structural Engineering", "Craft Realization", "Body Negotiation", "Team Collaboration", "Iterative Revision", "Final Garment"]
      }
    ],
    "footer": "{argument name=\"footer text\" default=\"一件成衣，因无数判断而存在 A garment exists because of countless decisions.\"}"
  }
}
```

<a id="prompt-53f8a3a774198179bb7f"></a>

### 28. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case68.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-68)

**提示词:**

```text
{
  "type": "comprehensive medical infographic",
  "style": "highly detailed 3D medical illustration, clinical white background, clean typography",
  "header": {
    "title_cn": "{argument name=\"main title\" default=\"痛风诞生的因果链\"}",
    "title_en": "{argument name=\"english title\" default=\"THE CAUSAL CHAIN OF GOUT\"}",
    "subtitle": "Pain is not the beginning. Metabolic imbalance is.",
    "top_right_sequence": {
      "count": 6,
      "labels": ["Metabolism", "Transport", "Crystallization", "Immunity", "Inflammation", "Damage"]
    }
  },
  "centerpiece": {
    "description": "{argument name=\"central figure\" default=\"transparent anatomical human body showing liver, kidneys, and vascular system\"}",
    "details": "pathway highlighted in {argument name=\"highlight color\" default=\"glowing red\"} descending to the foot"
  },
  "layout": {
    "left_column": [
      { "id": "01", "title": "Purine Sources", "elements": 6, "labels": ["Red meat", "Organ meats", "Seafood", "Beer", "Endogenous", "Fructose"] },
      { "id": "02", "title": "Uric Acid Production", "elements": 2, "labels": ["Chemical pathway", "Liver"] },
      { "id": "03", "title": "Renal & Intestinal Excretion", "elements": 2, "labels": ["Kidney nephron", "Intestines"] },
      { "id": "04", "title": "Hyperuricemia", "elements": 2, "labels": ["Blood vial", "Solubility graph"] }
    ],
    "center_overlay": [
      { "id": "05", "title": "Crystal Physics", "elements": 3, "labels": ["Supersaturation beaker", "Precipitation beaker", "Molecular structure"] },
      { "id": "06", "title": "Joint Deposition & Local Environment", "elements": 1, "labels": ["First MTP joint cross-section"] }
    ],
    "right_column": [
      { "id": "07", "title": "Immune Inflammatory Cascade", "elements": 4, "labels": ["Macrophage", "Inflammasome", "Neutrophil", "Cytokines"] },
      { "id": "08", "title": "Acute Gout Flare", "elements": 1, "labels": ["Inflamed foot"] },
      { "id": "09", "title": "Chronic Structural Damage", "elements": 1, "labels": ["Bone erosion joint"] },
      { "id": "10", "title": "Tophus Formation", "elements": 2, "labels": ["Hand tophi", "Foot tophi"] },
      { "id": "11", "title": "Beyond the Joint", "elements": 2, "labels": ["Kidney stones", "Systemic burden"] }
    ],
    "bottom_row": [
      { "id": "12", "title": "Pain Is the Final Signal", "elements": 7, "labels": ["Increased Purine", "Overproduction", "Reduced Excretion", "Hyperuricemia", "Crystal Formation", "Immune Activation", "Man in pain"] }
    ]
  },
  "theme": "{argument name=\"disease focus\" default=\"gout and uric acid crystallization\"}"
}
```

<a id="prompt-589ca87594027d0cf57b"></a>

### 29. 100个元素场景清单

<img src="https://pbs.twimg.com/media/HGbftRuacAAKgJB?format=jpg&amp;name=large" alt="100个元素场景清单" width="480">

我要求ChatGPT Image v2创建一个包含100个元素的场景。它不仅创建了一个包含100个物品的场景，还在图像中列出了这些物品！

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/umesh_ai/status/2046569229189849228)

**提示词:**

```text
创建一个包含100个元素的场景，并在图像中列出这100个元素。
```

<a id="prompt-594bbf183e6516e7eb77"></a>

### 30. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case83.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-83)

**提示词:**

```text
{
  "type": "sports match infographic poster",
  "theme": "UEFA Champions League",
  "background": "dark blue and purple cosmic sky, glowing blue hexagonal lines, illuminated stadium reflecting on water at bottom",
  "header": {
    "logo": "UEFA Champions League",
    "title": "{argument name=\"stage\" default=\"HALBFINALE\"}",
    "subtitle": "DAS ZIEL: {argument name=\"location\" default=\"BUDAPEST 2026\"}",
    "venue": "PUSKÁS ARÉNA"
  },
  "matchup": {
    "player_left": "{argument name=\"team 1 player\" default=\"Harry Kane\"} in red FC Bayern kit",
    "player_right": "{argument name=\"team 2 player\" default=\"Ousmane Dembélé\"} in blue PSG kit",
    "center_logos": "FC Bayern München and Paris Saint-Germain with VS",
    "date_box": "calendar icon, MITTWOCH, {argument name=\"date\" default=\"06.05.2026\"}"
  },
  "facts_section": {
    "title": "FACTS",
    "count": 5,
    "items": [
      "Trophy icon: DIE KÖNIGSKLASSE 2025/26",
      "Bar chart icon: KANE IN TOPFORM",
      "Lightning bolt icon: DEMBÉLÉ ÜBERFLIEGER",
      "Two people icon: BISHER 14 DUELLE",
      "Stadium icon: BUDAPEST RUFT"
    ]
  },
  "footer": {
    "trophy": "Champions League trophy on right",
    "stadium_image": "Puskás Aréna at night",
    "tagline": "EIN TRAUM. EIN ZIEL. EIN TITEL.",
    "bottom_text": "ROAD TO BUDAPEST 2026"
  }
}
```

<a id="prompt-608df0d4ae3b0448e7a7"></a>

### 31. 萌系大模型训练图解

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case210.jpg" alt="萌系大模型训练图解" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-210)

**提示词:**

```text
可爱地解释一下大语言模型训练过程
```

<a id="prompt-60c46e352e11a1a1a923"></a>

### 32. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case70.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-70)

**提示词:**

```text
{
  "type": "technical infographic",
  "subject": "{argument name=\"subject matter\" default=\"digital photography process\"}",
  "header": {
    "title": "{argument name=\"main title\" default=\"一张照片诞生的因果链 THE CAUSAL CHAIN OF A PHOTOGRAPH\"}",
    "subtitle": "从世界，到图像 FROM WORLD TO IMAGE"
  },
  "centerpiece": {
    "description": "Exploded isometric view of a modern mirrorless camera",
    "model": "{argument name=\"camera model\" default=\"Canon EOS R5\"}",
    "labeled_parts_count": 12,
    "labeled_parts": [
      "EVF",
      "Body Structure",
      "Control Dials",
      "Thermal Design",
      "Optical Axis",
      "IBIS Stabilizer",
      "Shutter Unit",
      "Full-Frame Sensor",
      "{argument name=\"processor name\" default=\"DIGIC X Processor\"}",
      "Main PCB",
      "High-Speed Bus",
      "Card Slot"
    ]
  },
  "layout": {
    "left_column": {
      "description": "Chronological causal chain",
      "count": 13,
      "steps": [
        "01 REALITY EXISTS",
        "02 PHOTONS LEAVE THE WORLD",
        "03 LENS ACCEPTS & BENDS LIGHT",
        "04 APERTURE SELECTS",
        "05 SHUTTER CUTS TIME",
        "06 FOCUS SETS PRIORITY",
        "07 SENSOR RECEIVES EVENT",
        "08 LIGHT BECOMES CHARGE",
        "09 ANALOG READOUT",
        "10 A/D CONVERSION",
        "11 COMPUTATION RECONSTRUCTS",
        "12 IMAGE APPEARS",
        "13 MEMORY OUTLIVES"
      ]
    },
    "right_column": {
      "title": "八大模块 / 8 MODULES",
      "count": 8,
      "modules": [
        "1 ORIGIN OF LIGHT",
        "2 LENS SHAPES REALITY",
        "3 APERTURE & SHUTTER EDIT THE WORLD",
        "4 FOCUS DECIDES CLARITY",
        "5 SENSOR MEASURES LIGHT",
        "6 SIGNAL BORN & AMPLIFIED",
        "7 COMPUTATION BUILDS IMAGE",
        "8 FILE BECOMES MEMORY"
      ]
    },
    "side_diagrams": {
      "count": 7,
      "descriptions": [
        "Ray cone & image formation",
        "Aperture & depth of field",
        "Shutter & motion",
        "Focal plane & clarity",
        "Pixel structure",
        "Photoelectric conversion",
        "Analog signal waveform"
      ]
    },
    "footer": {
      "count": 5,
      "description": "Philosophical summary points"
    }
  },
  "style": "technical, precise, wireframe elements, glowing data lines, photorealistic camera components, clean typography, dual-language"
}
```

<a id="prompt-6a66822cf953b9ae9cef"></a>

### 33. 手写食谱变身杂志级跨页

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case297.jpg" alt="手写食谱变身杂志级跨页" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-297)

**提示词:**

```text
手写食谱 → 专业食谱页面 上传一份凌乱的手写家庭食谱；模型会搜索准确的现代计量/营养信息，然后生成一份精致的杂志风格双页跨页，包含分步平铺图、完美的食材标签和卡路里分解。

[INSERT_RECIPE_LINK]
```

<a id="prompt-6a73076afe6f29f1a863"></a>

### 34. 聚焦人工智能的校园日报

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case293.jpg" alt="聚焦人工智能的校园日报" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-293)

**提示词:**

```text
生成一张校园日报，主题AI教育
```

<a id="prompt-7bff03b18c7decb68dc4"></a>

### 35. 冠状病毒尺度缩放科学信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case380.jpg" alt="冠状病毒尺度缩放科学信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-380)

**提示词:**

```text
instructions> [SUBJECT]=Coronavirus. A hyper-realistic 3D zoom-sequence infographic generated from a single input: [SUBJECT]. The system auto-detects scale layers from atomic/subcomponent to full contextual view. Layout Structure (CRITICAL) 6–8 circular or hexagonal frames arranged in expanding sequence Innermost frame = smallest detectable detail; outermost = full subject in environment Frames connected by subtle zoom-path lines No repeated scales — each frame shows new level of detail Frame Design Each zoom level includes: Hyper-detailed 3D render at that scale Micro label: scale name (e.g., "molecular," "cellular," "structural") + 3–5 word insight Optional: measurement tag or magnification factor Contextual Halo Around the sequence, include only scale-specific references: Measurement units, scientific notation, cultural scale metaphors (No generic magnifying glass icons) Scale Panel (Alternative Layout) Zoom level Key insight (3–5 words) Scale factor tag Detail icon (grid, wave, particle, etc.) Title "[SUBJECT]: AT EVERY SCALE" (or) "ZOOM: THE WORLD OF [SUBJECT]" Style: ultra-realistic 3D render, scientific editorial infographic, precise macro lighting, global illumination, shallow depth of field, clean sequential layout. </instructions>
```

<a id="prompt-7d8fb7b94d1b8a8e86b7"></a>

### 36. 烬甲猎鹰者与燃翼神禽

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case329.jpg" alt="烬甲猎鹰者与燃翼神禽" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-329)

**提示词:**

```text
一幅充满奇幻色彩的电影场景：一位英姿飒爽的女战士兼猎鹰师，身着饱经战火洗礼、饰以闪耀余烬纹理的皮甲，漫步于幽暗迷雾笼罩的森林之中。她高举手臂，指挥着一头巨大的凤凰与雄鹰的混合体，这头猛禽双翼燃烧，羽毛燃焰，尖端喷吐着火焰。它周身散发着橙红色的熔岩光芒，火星和余烬飞溅。女战士梳着辫子，皮肤上沾满了灰烬，神情坚定，手中拿着绳索和工具袋。画面细节丰富，羽毛纹理逼真，火焰物理效果自然，光照效果极具戏剧性，运用了体积雾、浅景深等技术，营造出史诗般的奇幻氛围，色彩调校极具电影质感，背景阴郁深沉，分辨率高达8K，呈现出概念艺术的精髓，并采用了虚幻引擎的渲染效果。
```

<a id="prompt-7f04a6fb9ddccdb22b60"></a>

### 37. POLO衫颜色对比分析

<img src="https://pbs.twimg.com/media/HGnE60ebYAAgm08?format=jpg&amp;name=large" alt="POLO衫颜色对比分析" width="480">

原帖提示说该提示在回复中；此提示是根据可见输出和推文上下文重建的。

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/garenaguinaldox/status/2047384051322081738)

**提示词:**

```text
使用这张图片进行个人色彩分析。使用Polo服装颜色对比来突出显示哪些颜色最适合该主体。以视觉效果为主，附带解释和建议。
```

<a id="prompt-7ff4654aa203b07ef3e1"></a>

### 38. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case23.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-23)

**提示词:**

```text
{
  "type": "evolutionary timeline infographic",
  "instruction": "Using REFERENCE_0 as a structural base, transform the flat vector design into a highly realistic 3D infographic. Replace the smooth ramps with distinct stone steps and upgrade all organisms to photorealistic 3D models.",
  "style": {
    "background": "{argument name=\"background style\" default=\"vintage textured parchment paper\"}",
    "staircase": "{argument name=\"staircase material\" default=\"realistic textured stone blocks\"}",
    "subjects": "{argument name=\"organism style\" default=\"highly detailed photorealistic 3D renders\"}"
  },
  "layout": {
    "main_title": "{argument name=\"main title\" default=\"人类演化\"}",
    "sections": [
      {
        "position": "left sidebar",
        "count": 8,
        "labels": ["L0: 单细胞生命", "L1: 多细胞生物", "L2: 动物界", "L3: 脊索动物", "L4: 上陆革命", "L5: 哺乳纲", "L6: 人科演化", "L7: 智人纪元"]
      },
      {
        "position": "top right",
        "title": "获得的功能 / 失去的功能",
        "description": "Legend with plus and minus icons"
      },
      {
        "position": "bottom center",
        "title": "演化关键里程碑",
        "count": 6,
        "description": "Timeline with a silhouette graphic of 6 figures showing ape-to-human evolution"
      }
    ],
    "centerpiece": {
      "description": "Winding stone staircase with 25 numbered steps featuring specific organisms.",
      "count": 25,
      "notable_elements": [
        "Step 07: Jellyfish",
        "Step 09: Ammonite",
        "Step 10: Trilobite",
        "Step 24: Walking human",
        "Step 25: {argument name=\"future evolution concept\" default=\"glowing cosmic silhouette with a question mark\"}"
      ]
    }
  }
}
```

<a id="prompt-85e78248c48804b9a886"></a>

### 39. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case171.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-171)

**提示词:**

```text
创建一个包含 10x10 网格的图像，每个对象名称都以字母 a 开头。
```

<a id="prompt-8c482dd43da152af44d0"></a>

### 40. 字母 A 物品网格

<img src="https://pbs.twimg.com/media/HGaqAFba0AES6z_?format=jpg&amp;name=large" alt="字母 A 物品网格" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/umesh_ai/status/2046510988367945983)

**提示词:**

```text
创建一张 10x10 网格图，里面的物品名称都以字母 A 开头
```

<a id="prompt-917df6ff31541b29e6da"></a>

### 41. 综合应用场景图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case108.jpg" alt="综合应用场景图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-108)

**提示词:**

```text
{argument name="subject" default="A beautiful internet celebrity"} is live-streaming a {argument name="activity" default="game"}.
```

<a id="prompt-91c7e96d3cbe2aa1824b"></a>

### 42. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case13.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-13)

**提示词:**

```text
A realistic photo of a Chinese high school math exam paper, printed inblack and white on slightly gray paper, titled “数学试卷”, with multiplechoice questions and math formulas, including a small 3D geometrycube diagram. The paper is photographed casually with asmartphone, slightly tilted, with uneven lighting, soft shadows, andminor blur. The text is in Chinese with a mix of bold title font andstandard serif body font. Realistic paper texture, exam layout,authentic classroom test sheet style.
```

<a id="prompt-9362a5502faa5b48530d"></a>

### 43. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case65.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-65)

**提示词:**

```text
A breathtaking and extremely complex world-building infographic masterpiece conceptualizing the "{argument name="theme" default="Fundamental Differences between Confucianism, Buddhism, and Taoism"}", designed as a profound {argument name="style" default="ancient Oriental mythological manuscript"}.
Background: Pure white vintage textured canvas with a light beige aged parchment base color, subtle frayed edges, and water stain textures.
Core Layout: Central vision uses a grand "vertical egg-shaped layered structure", with Buddhism, Taoism, and Confucianism layers from top to bottom.
Margins: Four corners are decorated with fine micro-illustrations featuring ancient observation notes, ritual implements, and runes.
Colors: Low-saturation sage green, light gold, and off-white as main tones; overall light and soft without harsh high-saturation colors.
Details: Architectural lines, landscape brushwork, lotus patterns, and cloud layers are clearly visible and exquisitely detailed.
Seamless Fusion: The three layers transition naturally through clouds and flowing water; the Buddhist halo, Taoist Taiji mist, and Confucian scholarly aura connect seamlessly.
Style: Classical ink line art + low-saturation digital watercolor, with a light Chinese-style ancient book manuscript texture.
Text Annotations: Authentic Traditional Chinese characters in a mottled vintage Song typeface. Each annotation includes a short title + a line of poetic description, connected to corresponding details by dark gold hair-thin lines with no overlapping pointers.
Aspect Ratio: {argument name="aspect ratio" default="3:4"} vertical format, independent and complete.

Title Area (Top): `儒釋道·根本區別` (Confucianism, Buddhism, Taoism: Fundamental Differences)
Central Layer Labels:
Top "Buddhism": `釋`, `Relationship between man and self`, `Selflessness, governing the heart, letting go`
Middle "Taoism": `道`, `Relationship between man and all things`, `Non-action, governing the body, being open-minded`
Bottom "Confucianism": `儒`, `Relationship between man and man`, `No ego, governing the world, taking responsibility`
Side Annotations:
Left: `Purity`: pure heart and clear mind, cutting off troubles; `Stillness`: following nature, returning to the original heart; `Respect`: respecting responsibility, active involvement in society.
Right: `60+ Spiritual Cultivation`: looking lightly at gain/loss; `35-55 Conduct`: living with flexibility, following laws; `7-35 Actions`: forging ahead, building careers.
Bottom Summary: `The balance between being in the world and being out of the world is high-level life wisdom.`
```

<a id="prompt-9bdb04c0446fa62deb52"></a>

### 44. 100 个科技主题网格

<img src="https://pbs.twimg.com/media/HGaW8ECaEAAq-LZ?format=jpg&amp;name=large" alt="100 个科技主题网格" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/chetaslua/status/2046489044243403029)

**提示词:**

```text
创建一个 10 × 10 网格，展示 100 个代表近期技术进展的不同主题。采用真实、精致的编辑插画风格。每个主题占据自己的方格，并在下方附上简短清晰的标签。保持白色背景上的网格整齐。让每个主题在视觉上都不同，并确保每个标签拼写正确。使用这些行主题：第 1 行：AI 模型与智能体；第 2 行：机器人；第 3 行：半导体与算力；第 4 行：网络与智能设备；第 5 行：生物科技与健康科技；第 6 行：能源与电力系统；第 7 行：交通与自动驾驶；第 8 行：航天与航空航天；第 9 行：制造与材料；第 10 行：气候与环境技术。把每个格子表现为真实的小场景、产品级物件、实验室仪器、机器人、芯片、载具或设备，清楚传达该主题。整体风格保持统一、现代、真实且具有视觉冲击力。
```

<a id="prompt-9dac7a63ae8de453ede8"></a>

### 45. RAG 技术详解图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case334.png" alt="RAG 技术详解图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-334)

**提示词:**

```text
帮我生成一张 RAG 技术的详细讲解图
```

<a id="prompt-9f981035481833f20b1e"></a>

### 46. 明洞旅游区域地图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case369.jpg" alt="明洞旅游区域地图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-369)

**提示词:**

```text
[エリア]の観光エリアマップを画像で作成して
```

<a id="prompt-a51584f34d9c29b86070"></a>

### 47. 关系图谱信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case71.jpg" alt="关系图谱信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-71)

**提示词:**

```text
{
  "type": "technical infographic and exploded view diagram",
  "header": {
    "title": "{argument name=\"main title\" default=\"佳能 EOS R5 成像系统剖面 CANON EOS R5 IMAGING ATLAS\"}",
    "subtitles": [
      "一张照片是如何被制造出来的 HOW AN IMAGE IS ACTUALLY FORMED",
      "从光，到数据 | FROM PHOTONS TO FILES",
      "相机不是壳体，而是一条运算链 A camera is not a shell, but a computational chain"
    ],
    "top_left_box": {
      "title": "EOS R5 核心规格 KEY SPECIFICATIONS",
      "bullet_points_count": 6
    },
    "top_right_images": {
      "count": 2,
      "description": "front and back views of the camera body"
    }
  },
  "centerpiece": {
    "description": "highly detailed 3D exploded view of the {argument name=\"camera model\" default=\"Canon EOS R5\"} camera, showing internal components separated vertically",
    "components_visible": [
      "lens mount",
      "lens elements with glowing blue light rays",
      "image sensor",
      "motherboard with glowing {argument name=\"processor name\" default=\"DIGIC X\"} chip",
      "battery pack",
      "dual card slots",
      "electronic viewfinder (EVF)"
    ]
  },
  "layout": {
    "numbered_sections": [
      {
        "number": 1,
        "title": "光学入口 OPTICAL ENTRY",
        "elements": ["lens cross-section with light rays", "2 line graphs"]
      },
      {
        "number": 2,
        "title": "光圈、快门与曝光控制 APERTURE, SHUTTER, EXPOSURE",
        "elements": ["3 aperture blade diagrams", "4 shutter speed example photos", "depth of field diagram", "exposure triangle diagram"]
      },
      {
        "number": 3,
        "title": "对焦系统与成像平面 FOCUS ACQUISITION + IMAGE PLANE",
        "elements": ["lens alignment diagram", "AF coverage photo of a runner"]
      },
      {
        "number": 4,
        "title": "传感器与像素结构 SENSOR + PIXEL ARCHITECTURE",
        "elements": ["3D pixel array diagram", "single pixel cross-section diagram", "sensor spec table", "quantum efficiency graph"]
      },
      {
        "number": 5,
        "title": "防抖系统与机械稳定 IBIS + MECHANICAL STABILIZATION",
        "elements": ["sensor shift mechanism diagram with yaw/pitch/roll axes", "2 stabilization effect comparison photos"]
      },
      {
        "number": 6,
        "title": "模拟信号、模数转换与读出 ANALOG READOUT + A/D CONVERSION",
        "elements": ["signal flowchart", "3 readout timing graphs", "signal-to-noise ratio graph", "rolling shutter example photo of a car"]
      },
      {
        "number": 7,
        "title": "DIGIC X 图像处理链 DIGIC X IMAGE PROCESSING PIPELINE",
        "elements": ["processing flowchart with central chip", "dynamic range graph", "tone curve graph", "histogram"]
      },
      {
        "number": 8,
        "title": "文件生成、显示与存储 FILE OUTPUT, PREVIEW, STORAGE",
        "elements": ["file output flowchart", "2 storage card icons", "file workflow diagram"]
      }
    ],
    "bottom_comparisons": {
      "count": 5,
      "labels": [
        "传感器尺寸对比 SENSOR SIZE COMPARISON",
        "镜头焦距与视角 FOCAL LENGTH & ANGLE OF VIEW",
        "ISO 与噪点关系 ISO & NOISE RELATIONSHIP",
        "光圈与景深关系 APERTURE & DEPTH OF FIELD",
        "RAW vs JPEG"
      ]
    },
    "footer": "{argument name=\"footer quote\" default=\"光被捕获，数据被解读，影像被记录，记忆被永恒。 Light is captured. Data is interpreted. Image is recorded. Memory is eternal.\"}"
  },
  "style": "clean, technical, highly detailed, photorealistic components, blueprint-style annotations, light gray background, precise typography"
}
```

<a id="prompt-a7af65b632694c554eba"></a>

### 48. AP Calculus 学习表信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case341.jpg" alt="AP Calculus 学习表信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-341)

**提示词:**

```text
Please create a mathematical visualization infographic about "[math concept / topic]." The goal is to help the viewer intuitively understand what it is, why it works, its geometric or structural intuition, and how it behaves in different contexts. The visual should feel like a high-quality math lecture handout combined with a hand-drawn educational poster. It should be elegant, clear, and information-rich, but not cluttered. Visual style: either portrait or landscape is fine. Use a clean, light paper-like background, with a deep blue title and black or dark gray lines for the main content. Add a small number of refined accent colors such as blue, teal, gold, and red. Incorporate rounded-corner cards, thin borders, numbered labels, hand-drawn arrows, zoom-in callout boxes, and a summary section. The overall design should be aesthetically pleasing, balanced, and academic, allowing the viewer to grasp the structure of the concept and why it works at a glance.
```

<a id="prompt-a8bbb9f813545a9d6ffa"></a>

### 49. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case64.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-64)

**提示词:**

```text
{"type":"infographic poster","style":"cute flat vector illustration, cozy, warm, soft shading, {argument name=\"color palette\" default=\"pastel Morandi colors, soft pinks, purples, and warm tones\"}","character":"{argument name=\"character description\" default=\"young woman with shoulder-length brown hair wearing a pinkish-purple shirt\"}","layout":{"structure":"4 rows, 3 columns. Top row is a merged header. Rows 2-4 contain 9 individual panels.","header":{"title":"{argument name=\"main title\" default=\"情绪不好了？\"}","subtitle":"{argument name=\"subtitle\" default=\"8个让你瞬间变好的方法\"}","sub_subtitle":"写给焦虑的你，快来看看","visual":"character hugging herself, surrounded by yellow sparkles and hearts"},"grid_panels":[{"id":1,"title":"1. 深呼吸","text":"调节神经，缓解紧张情绪。","visual":"character with eyes closed, smiling, surrounded by clouds"},{"id":2,"title":"2. 去户外散步","text":"接触自然，让心静下来。","visual":"character walking outdoors among green trees and bushes"},{"id":3,"title":"3. 写情绪日记","text":"把烦恼写下，大脑会更轻松。","visual":"character sitting at a desk writing in a notebook with a pen, floating hearts"},{"id":4,"title":"4. 抱抱自己","text":"给予自己温暖和安慰。","visual":"character hugging herself with eyes closed, floating hearts"},{"id":5,"title":"5. 听听音乐","text":"让舒缓的旋律治愈心灵。","visual":"character wearing large white headphones, eyes closed, floating colorful music notes"},{"id":6,"title":"6. 找人倾诉","text":"分享你的烦恼，让压力释放。","visual":"character holding a smartphone, talking to another similar-looking girl, floating hearts"},{"id":7,"title":"7. 看看天空","text":"感受天空的辽阔，让心情变好。","visual":"character looking up at a blue sky with white clouds and sparkles"},{"id":8,"title":"8. 冥想","text":"专注于呼吸，找回内心的宁静。","visual":"an open notebook, a pen, and a pink flower on a desk"},{"id":9,"title":"none","text":"{argument name=\"footer text\" default=\"转发收藏，每天都要关爱自己！\"}","visual":"character sitting cross-legged in a meditation pose, eyes closed, with a glowing halo behind her head"}]}}
```

<a id="prompt-a96338746f35209f39ed"></a>

### 50. 高考试卷复刻

<img src="https://pbs.twimg.com/media/HGMr98EaYAA_DsG?format=jpg&amp;name=large" alt="高考试卷复刻" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/MrLarus/status/2046627021674168640)

**提示词:**

```text
生成一张 2026 年 [科目名称] 高考试卷图像
```

<a id="prompt-a9a6d2ff0c2b9de26e77"></a>

### 51. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case88.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-88)

**提示词:**

```text
GPT-Image-2 prompt: please automatically generate a top-tier concept poster / infographic-style movie poster centered around {argument name="theme" default="ranking of emperors in Chinese history"}.

Require the AI to automatically derive and uniformly design the entire following visual system based on this theme, without my extra specification:
- Core subject (automatically judge suitability for people, products, architecture, artifacts, symbols, scenes, or abstract imagery)
- Bottom supporting structure
- Hovering symbols or spiritual symbols above
- Scene wrapping elements
- Metaphor system
- Color hierarchy
- Material contrast
- Lighting logic
- Title, subtitle, and auxiliary copy
- Brand sense and high-end expression

The final frame must be: a shocking, precise, unified, cinematic, ultra-high detail conceptual key visual poster suitable for high-end printing.

[Overall Style]
Ultra-realistic 3D commercial CGI rendering, merging cinematic lighting, luxury visual language, futuristic concept design, and epic composition. The image must have a "single main visual core," not messy, not like a collage, and not like a regular e-commerce poster.

[Automatic Derivation Rules]
AI must automatically decide based on the [theme]:
1. Core visual metaphor
2. Subject type and posture
3. Form of supporting structure
4. Form of suspended elements
5. Scene shell and spatial atmosphere
6. Main, auxiliary, and emphasis colors
7. Material combinations
8. Text temperament and layout style

[Composition Rules]
- Absolute sense of premium quality
- Strong central order, overall unity
- Allows for axial symmetry or epic composition near the central axis
- Clear visual gravity, forming clear levels from top to bottom
- Edge negative space is clean, restrained, and has room to breathe

[Visual Quality]
- Ultra-high detail
- Clear volumetric light
- Authentic materials
- Natural reflection, refraction, shadows, fog, and depth of field
- Overall standard of high-end brand campaign key visual / luxury invitation poster / conceptual editorial poster

[Typography System]
- Overall 90% visual, 10% text
- AI automatically generates the most matching main title and subtitle based on the [theme]
- Title must be concise, sharp, and powerful
- Text should be as minimal and accurate as possible; do not stack words

[Signature Requirement]
Naturally add the author signature in the bottom corner: @a9quant
```

<a id="prompt-b0c09c1bd7cbf1b65f2f"></a>

### 52. 绘制金瓶梅知识图谱

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case214.jpg" alt="绘制金瓶梅知识图谱" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-214)

**提示词:**

```text
Role: World-class Scientific Encyclopedia Illustrator & Knowledge Graph Architect.

Task: Generate a highly detailed, extremely intricate, and visually stunning "Universal Illustrated Encyclopedia Science Infographic" in a classic, unbranded (NO logos) scientific encyclopedia style.

Subject Matter: Choose one from [People, Plants, or Animals].

Specific Subject: [e.g., The Giant Squid / Leonardo da Vinci / The Sequoia Tree].

Style: Fine, detailed scientific illustration on a retro, aged beige paper background. Delicate linework. Intricately complex and professional.

Key Visual Requirements:

1.  Lifelike 3D Effect (The Central Subject): The central subject in the "C position" must be rendered with extraordinary realism and dynamism. Create a dramatic sense of depth where the character, plant, or animal appears to break the frame, leaping or bursting out of the flat paper towards the viewer (an effect similar to anamorphic 3D or dynamic pop-out, with high-precision realism).

2.  Layout & Strategic White Space:
    * Central Subject: Dominates the center, with intentional "strategic white space" around it to enhance the popping-out effect and make the figure the clear focal point.
    * Surrounding Modules: The surrounding area (left, right, top, bottom, and corners) must be filled with 6-8 distinct, highly organized knowledge modules, depending on the subject. There should be a sense of organized density, not random clutter. The modules themselves must have clear borders, headers, and extensive, detailed content.

3.  Connections: Use a complex, logical network of fine leader lines, arrows, brackets, dotted lines, and small connection points to link the central figure to all surrounding modules, and interconnect the modules themselves into a cohesive knowledge web.

4.  Text & Annotation (Hard Requirement - Must be CLEAR Chinese):
    * Main Title: A large, prominent, beautifully executed **Chinese calligraphy** (书法体) of the specific subject's name [e.g., "大王乌贼"].
    * Calligraphic Accents: Scattered throughout the main content and module titles, use beautiful, clear Chinese calligraphy for important terms.
    * Standard Chinese Text: All other descriptive text, handwritten notes (大量清晰中文手写注释), module content, and annotations must be clear, legible Chinese characters (简体中文), not gibberish or unreadable symbols. Ensure text clarity is prioritized.
    * Leader Line Annotations: Every single small component, detail, submodule, diagram, or illustration within the modules must have detailed leader line annotations (拟解剖图) pointing directly to it for maximum professionalism and educational value. Every part should be labeled.

Subject-Specific Module Structure (Example for general reference):

A. For Humans [People]:
   - Module 1: Anatomy & Skeletal Structure (w/ magnified cross-sections)
   - Module 2: Physiological Processes (e.g., Circulatory/Nervous System)
   - Module 3: Historical Context & Timeline (Key Achievements)
   - Module 4: Major Contribution Diagram (Detailed breakdown)
   - Module 5: Cognitive Process / Psychological Insight
   - Module 6: Genetic Profile / Evolution
   - Module 7: Global Influence & Cultural Impact
   - Module 8: Cultural Representations / Legacy

B. For Animals:
   - Module 1: Full External Sketch & Anatomy (w/ microscope magnified detail circular windows)
   - Module 2: Behavioral Patterns & Lifecycle (e.g., Mating/Migration, Flowchart style)
   - Module 3: Digestive & Skeletal System
   - Module 4: Habitats & Distribution Map (with environmental details)
   - Module 5: Unique Adaptations (e.g., camouflage, hunting tools)
   - Module 6: Evolutionary History & Relatives
   - Module 7: Symbiotic Relationships / Ecosystem Role
   - Module 8: Conservation Status & Human Interaction

C. For Plants:
   - Module 1: Full Plant Sketch & Anatomy (w/ magnified leaf/root details)
   - Module 2: Photosynthesis & Lifecycle Flow (w/ icons for environment)
   - Module 3: Cellular Structure (Magnified circular views)
   - Module 4: Medicinal Properties / Practical Applications (as in original original prompt)
   - Module 5: Environmental Adaptations / Unique Features
   - Module 6: Distribution Map & Environmental Context
   - Module 7: Genetic Variations & Cultivation
   - Module 8: Historical Usage & Folklore

Overall Composition: Extremely dense with information, organized into 6-8 structured modules, but balanced with strategic empty space around the center to allow the main, hyper-realistic figure to pop. Hard-core, professional, academic, but visually engaging due to the dynamic 3D central figure. No branding from any specific encyclopedia (e.g., no "DK" logos). All annotations must be legible. All handwritten notes must be clear. Main titles in Chinese calligraphy. Aspect Ratio: 3:4.

主题内容：潘金莲
```

<a id="prompt-b3ae3108b96f45393cd0"></a>

### 53. 世界时间模拟时钟墙

<img src="https://pbs.twimg.com/media/HGYD-Y4bMAA0KxJ?format=jpg&amp;name=large" alt="世界时间模拟时钟墙" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/Angaisb_/status/2046666389734179018)

**提示词:**

```text
现在洛杉矶是上午 10 点，丹佛是上午 11 点，芝加哥是中午 12 点，纽约是下午 1 点，伦敦是下午 6 点，东京是凌晨 2 点。请渲染一面挂着不同模拟时钟的墙，每个时钟都显示其城市的正确时间，并在时钟下方标注城市名称。
```

<a id="prompt-b86a025959e1cd201c95"></a>

### 54. 混合风格的桃太郎讲解 Slides

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case19.jpg" alt="混合风格的桃太郎讲解 Slides" width="480">

一个融合了 Irasutoya 插图简约温馨的美学风格与日本政府 Slides 高信息密度特征的提示词。

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-19)

**提示词:**

```text
创建一个讲解型 Slides（{argument name="format" default="ponchi-e diagram"}），主题为 {argument name="theme" default="Momotaro"}，将“Irasutoya”的柔和氛围与“霞关风格 Slides”极高的信息密度完美融合。
```

<a id="prompt-bce858ec6a43bb2811f3"></a>

### 55. 关系图谱信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case74.jpg" alt="关系图谱信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-74)

**提示词:**

```text
Please generate a high-quality vertical "Popular Science Encyclopedia Image" based on {argument name="theme" default="animals"}.

This image is not a regular poster or a simple illustration, but a modular popular science infographic that possesses a sense of "illustration book, encyclopedia, information structure, and collectability." The overall style should reference a combination of high-end natural history illustrations, modern encyclopedia pages, lifestyle knowledge cards, and highly shareable social media infographics.

Please include in the frame:
- A clear and beautiful main visual of the subject
- Several magnified details of local characteristics
- Multiple rounded modular information sections
- Clear title hierarchies and key labels
- Concise yet rich encyclopedic content
- Visual ratings, key point summaries, or Top 5 modules

Content columns should be automatically adapted based on the theme, prioritized from these directions: basic profile, classification information, appearance characteristics, habits/ecology, formation mechanism/structure, growth or use conditions, care or maintenance suggestions, risks and precautions, suitable audience or scenarios, pros and cons comparison, and quick rating cards.

Visual requirements:
Light-colored clean background, soft color palette, light shadows, exquisite small icons, rounded information boxes, neat layout, high information density but not crowded, good reading experience. The overall result must look like a real science encyclopedia card suitable for publishing, reading, collecting, and serialized production, rather than an advertisement.

Please do not make it a regular commercial promotional poster. Highlight the features of "knowledge organization + modular information + illustration-style display."
```

<a id="prompt-bd4609c98d56708e5d6f"></a>

### 56. 咖啡旅程信息图

<img src="https://github.com/user-attachments/assets/ac0ed885-5b27-46d5-a163-f9e3c15dca3b" alt="咖啡旅程信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image)

**提示词:**

```text
创建一张中文信息图海报，主题为“ 一杯咖啡 如何来到你手里 ”。使用高级信息设计风格，兼顾科普清晰度和商业展示感。版面应包含流程方向、箭头、数据框、图标、简洁插图和模块化卡片。配色采用咖啡棕、奶白、墨黑和铜色点缀。

信息图必须包含：
- 01 种植：海拔 1200-2200m，适宜温度 18-24C，采摘季节 11 月至 3 月
- 02 处理：日晒、水洗、蜜处理
- 03 烘焙：浅烘 = 更明亮，中烘 = 更均衡，深烘 = 更浓郁
- 04 研磨：手冲 = 粗磨，意式 = 细磨，冷萃 = 中粗磨
- 05 萃取：粉水比、水温和时间都会影响风味
- 风味关键词：花香 / 柑橘 / 坚果 / 焦糖 / 巧克力 / 烟熏

使用以下精确小字：
"适合用于咖啡入门科普与门店展示"

构图需要平衡文字与视觉，同时保持设计优雅。重点关注长信息图的处理、数字信息、温度、编号分区、简洁描述、斜杠分隔的风味词，以及模块化排版。最终效果应像高级展示板，而不是课堂幻灯片。
```

<a id="prompt-bd830fcf15c522bdb73c"></a>

### 57. 景德镇青花瓷全景解说图谱

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case248.jpg" alt="景德镇青花瓷全景解说图谱" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-248)

**提示词:**

```text
为我生成景德镇青花瓷的详细解说图，配上详细的中文知识解析
```

<a id="prompt-bda0153409f32312e36e"></a>

### 58. Codex 黑板文章可视化

<img src="https://pbs.twimg.com/media/HGecW48bsAAncRT?format=jpg&amp;name=large" alt="Codex 黑板文章可视化" width="480">

推文文本是唯一可见的类似提示的指令；结果是黑板风格的长篇文档可视化。

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/gabrielchua/status/2046778728748048886)

**提示词:**

```text
一幅画胜过千言万语。GPT Image 2 创造它们。
```

<a id="prompt-c6fdd09400be51657da2"></a>

### 59. 三日旅行指南卡片

<img src="https://pbs.twimg.com/media/HGa2KbFXMAAv9Wh?format=jpg&amp;name=large" alt="三日旅行指南卡片" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/MrLarus/status/2046627021674168640)

**提示词:**

```text
为 [城市] 生成一张三天旅行指南图像
```

<a id="prompt-c9e977302e4668864724"></a>

### 60. 绘制科学百科知识图谱

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case218.jpg" alt="绘制科学百科知识图谱" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-218)

**提示词:**

```text
角色：世界级科学百科插画师兼知识图谱架构师
任务：以经典、无品牌标识（无任何 Logo）的科学百科风格，创作一幅细节极致丰富、结构极其精巧、视觉效果惊艳的「环球图解百科科学信息图」。
题材选择：从【人物、植物、动物】中任选其一。
具体对象：【例如：大王乌贼 / 列奥纳多・达・芬奇 / 红杉树】
风格：采用复古泛黄米色纸张背景，绘制精细工整的科学插画；线条细腻精致，整体繁复专业、严谨考究。
核心视觉要求
主体逼真 3D 效果
位于画面视觉中心（C 位）的主体形象，需具备极致的写实感与动态张力。营造强烈的空间纵深感，让人物、植物或动物仿佛突破画框，从平面纸张中跃出、冲向观者（效果类似变形 3D 或动态弹出效果，高精度写实呈现）。
版式布局与留白设计
主体位置：占据画面中心，周围刻意设置规划式留白，强化立体弹出效果，使其成为绝对视觉焦点。
周边模块：根据所选题材，在画面四周（上下左右及四角）排布 6–8 个独立且规整有序的知识模块。整体呈现规整的信息密度感，而非杂乱堆砌。每个模块需带有清晰边框、标题栏与详尽丰富的内容。
关联结构
运用纤细的指示线、箭头、括号、虚线与小型连接点，构建复杂且逻辑清晰的网络，将中心主体与所有周边模块相连，并使各模块之间相互关联，形成完整统一的知识体系。
文字与标注（硬性要求：必须为清晰中文）
主标题：以醒目大气、笔法优美的中文书法字体呈现具体对象名称【例如：大王乌贼】。
书法点缀：在主体画面与模块标题中，对关键术语使用工整美观的中文书法字体标注。
标准中文文本：其余所有说明文字、大量清晰中文手写注释、模块内容及注解均使用清晰可辨的简体汉字，不得出现乱码或无法识别符号，优先保证文字可读性。
指示线标注：模块内所有细小结构、细节、子模块、图表与插画，均需搭配详尽的指示线标注（仿解剖图形式），直接指向对应部位，最大化体现专业性与科普价值，做到每一处结构均有标注。
分题材模块结构（参考示例）
A. 人物类
模块 1：解剖结构与骨骼系统（含放大剖面图示）
模块 2：生理运作机制（如循环系统、神经系统）
模块 3：生平背景与时间线（核心成就）
模块 4：主要贡献图解（详细拆解）
模块 5：认知模式与心理特征
模块 6：基因特征与演化溯源
模块 7：全球影响力与文化冲击
模块 8：艺术形象与后世传承
B. 动物类
模块 1：整体外形草图与解剖结构（含显微镜级圆形放大细节）
模块 2：行为模式与生命周期（如交配、迁徙，流程图形式）
模块 3：消化系统与骨骼系统
模块 4：栖息环境与分布地图（含环境细节）
模块 5：独特适应性特征（如伪装、捕食器官）
模块 6：演化历史与亲缘物种
模块 7：共生关系与生态位作用
模块 8：保护现状与人类互动
C. 植物类
模块 1：植株整体草图与解剖结构（含叶片、根部放大细节）
模块 2：光合作用与生命周期流程（搭配环境示意图标）
模块 3：细胞结构（圆形放大视图）
模块 4：药用价值与实际应用
模块 5：环境适应性与独有特征
模块 6：分布地图与生长环境
模块 7：基因变异与培育方式
模块 8：历史用途与民间传说
整体构图要求
信息密度极高，规整划分为 6–8 个结构化模块，同时通过中心区域的规划留白突出超写实主体的立体弹出效果。风格硬核、专业、学术化，凭借动态 3D 主体实现极强视觉吸引力。
无任何百科品牌标识（如 DK 等 Logo）。
所有标注清晰可辨，所有手写注释工整可读。
主标题采用中文书法字体。
画面比例：3:4。
【主题内容】
```

<a id="prompt-d1edee749ff85f9e72fa"></a>

### 61. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case102.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-102)

**提示词:**

```text
Search the web for {argument name="performance description" default="this week’s standout individual performance in Champion’s League"}, using exact stats and game summary, {argument name="colors" default="bold team colors"}, legible score breakdown, and generate a {argument name="card type" default="Highlight card"}.
```

<a id="prompt-d299054bd0faa987861a"></a>

### 62. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case72.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-72)

**提示词:**

```text
{
  "type": "scientific botanical infographic poster",
  "subject": "{argument name=\"plant species\" default=\"Pomegranate (Punica granatum)\"}",
  "style": "vintage botanical illustration mixed with modern infographic design, highly detailed, {argument name=\"color palette\" default=\"earthy greens, deep reds, parchment background\"}",
  "header": {
    "main_title": "{argument name=\"main title\" default=\"植物生命路径剖面\"}",
    "english_title": "{argument name=\"english title\" default=\"BOTANICAL GROWTH ATLAS\"}",
    "subtitle": "从种子到果实，一株植物如何展开自己 / FROM SEED TO FRUIT"
  },
  "centerpiece": "full plant showing extensive root system, woody stem, green leaves, blooming red flowers, and ripe fruits including one halved to show seeds",
  "layout": {
    "numbered_sections": [
      { "number": 1, "title": "种子结构 / Seed Architecture", "content": "cross-section of a single seed with 6 labeled parts" },
      { "number": 2, "title": "萌发机制 / Germination Mechanism", "content": "sequence of 5 sprouting seeds showing radicle emergence" },
      { "number": 3, "title": "根系与地下网络 / Root System + Subsurface Intelligence", "content": "detailed root network with 2 circular microscopic cross-sections showing vascular bundles and hyphae" },
      { "number": 4, "title": "茎叶生长与维管系统 / Stem, Leaf & Vascular System", "content": "leaf detail and circular stem cross-section with 5 labeled layers" },
      { "number": 5, "title": "光合作用与能量转换 / Photosynthesis + Energy Conversion", "content": "3D cellular cross-section of a leaf showing mesophyll and chloroplasts, plus a chemical equation diagram" },
      { "number": 6, "title": "花芽分化与开花机制 / Bud Formation + Blooming", "content": "detailed flower cross-section showing stamen and ovary, plus a 4-season timeline" },
      { "number": 7, "title": "授粉与结果路径 / Pollination + Fruiting Pathway", "content": "bee approaching a flower cross-section, followed by a sequence of 5 stages of ovary development into a fruit" },
      { "number": 8, "title": "果实成熟与种子循环 / Fruit Maturation + Seed Cycle", "content": "ripe fruit breaking open, seeds dispersing downwards to a new sprout" }
    ],
    "additional_elements": [
      { "position": "bottom left", "title": "环境触发因素 / Environmental Triggers", "content": "grid of 6 weather/environmental icons and 6 nutrient element icons (N, P, K, Ca, Mg, Fe)" },
      { "position": "bottom edge", "title": "Growth Timeline", "content": "linear sequence of 19 small plant icons showing the complete life cycle from seed to mature plant" }
    ],
    "footer_quote": "{argument name=\"bottom quote\" default=\"理解植物，就是理解生命如何在时间中构建秩序。\"}"
  }
}
```

<a id="prompt-d365bafd87789b2607ab"></a>

### 63. 研究LIME药物设计并制作一个详细的关于它的信息图表

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/case_case83/output.jpg" alt="研究LIME药物设计并制作一个详细的关于它的信息图表" width="480">

- **分类:** 信息图与教育
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/WillSpagnoli/status/2047172976463040851)

**提示词:**

```text
研究LIME药物设计并制作一个详细的关于它的信息图表
```

<a id="prompt-d7fff21551be410d47a5"></a>

### 64. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case14.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-14)

**提示词:**

```text
视觉设计规格描述：画幅比 9:16（竖版手机信息图）；背景纹理为具有呼吸感的米色手工纸（Handmade Washi Paper），带微小纤维纹理，边角有轻微水渍晕染；配色方案为熟番茄红（#E23A28）、初榨橄榄油金黄（#F2C94C）、嫩草绿（#6FCF97）、碳黑墨线；排版逻辑为顶端大标题、中间 Z 字形流线、底部全景成品、留白艺术化处理。食谱内容策划：1）顶部标题《番茄炒蛋：国民灵魂料理》，手绘书法体，侧边盖红色“厨师推荐”微型印章。2）步骤区块（Z 动线排版）：步骤1 挑选与备菜（左上）：三个番茄、四枚土鸡蛋、一簇葱花；说明：番茄切小块，鸡蛋打散均匀；厨师秘技：番茄去皮后切块，汁水更浓郁，口感更丝滑；心得：选熟透番茄，成功一半。步骤2 蛋液的魔法（右上）：手持筷子快速搅动蛋液，泛起气泡与动感线；说明：加少许盐和几滴温水；厨师秘技：加温水或白醋，鸡蛋更蓬松；心得：搅打充分，空气是蓬松秘密。步骤3 烈火蓬松蛋（左中）：铁锅中蛋液迅速膨胀如云朵，水彩表现热气；说明：油热下锅，快速划散，八成熟盛出；厨师秘技：油温高，烟起即入，瞬间锁水；心得：宁可稍嫩，不可过老。步骤4 番茄出浓汁（右中）：番茄翻滚，边缘半融化，亮红汤汁流淌；说明：煸炒至出汁，加少许糖和盐；厨师秘技：铲子轻压加速出汁，可加一勺番茄酱提色；心得：糖中和酸度、提鲜。步骤5 最后的合奏（左下）：鸡蛋回锅与番茄汁交织，撒葱花；说明：让鸡蛋吸饱番茄汁，关火装盘；厨师秘技：出锅前滴几滴芝麻油提香；心得：动作要快，保持鲜亮色泽。3）底部成品插图：青花边陶瓷深盘装满番茄炒蛋，红亮汁水包裹金黄大块鸡蛋，葱花点缀，水彩渲染半透明酱汁质感，边缘有袅袅热气；视觉感：看了就想立刻盛一碗大米饭。4）底部中央署名：[ 摄影师的厨房日记 · 2025 ]。
```

<a id="prompt-dbfd8f0919949f6cb90c"></a>

### 65. 关系图谱信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case84.jpg" alt="关系图谱信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-84)

**提示词:**

```text
Please generate a high-design character relationship map poster based on {argument name="theme" default="Demon Slayer"}. This image should not be a simple illustration, but a character relationship map that combines information visualization, narrative structure, poster design sense, and stylistic fidelity.

Please automatically complete the following:
- Identify the work and core settings corresponding to the theme
- Extract the most representative 6–12 key characters, not exceeding 15 if necessary
- Identify and display key character relationships, including blood ties, romance, friendship, alliances, hostility, master-disciple, etc.
- Automatically choose a composition method based on the work's characteristics, such as protagonist-centered, dual-core confrontation, faction-based, family tree, or chronological evolution
- Automatically refine the work's style DNA, including color, worldview symbols, textures, mood, typography, and representative elements
- Transform these stylistic elements into an overall visual design for the relationship map, rather than simply copying an official poster
- Use different colors, line types, and arrows to distinguish different relationships, ensuring clear lines and layers without clutter
- Make core characters most prominent, followed by important characters, and subordinate characters weakened to form a clear visual hierarchy
- Ensure every character name is legible, with identity or faction labels if necessary

The final product should satisfy:
- Immediate understanding of character hierarchy and key relationships
- Obvious alignment with the original work's temperament and setting
- Combines the clarity of an infographic with the premium design of a poster
- Unified, exquisite, complete, and suitable for social media sharing or poster display
- Avoids a cheap flowchart feel, messy piling, and information overload.
```

<a id="prompt-e5904f104c99dc7b64b5"></a>

### 66. 言叶之庭春雨绿意单日历

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case251.jpg" alt="言叶之庭春雨绿意单日历" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-251)

**提示词:**

```text
生成一张言叶之庭2026年4月19日单日日历
```

<a id="prompt-e5a05d4d8a07c6c2c3d7"></a>

### 67. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case1.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-1)

**提示词:**

```text
Vertical 9:16 isometric cutaway infographic "城市生命系统图谱 / Urban Metabolism Atlas". Smart city from sky to bedrock: skyscrapers, streets, subway, utility tunnels, water/sewage/gas/heating pipes, fiber, data center, flood tanks, aquifers, geothermal wells, bedrock. Color-coded flows for power/water/data/traffic/waste. 12 numbered panels bilingual CN/EN: 能源/水循环/交通/数据/垃圾/建筑/公共服务/ 物流/气候韧性/生态/地质/治理看板. 24h timeline at bottom. Style: engineering white paper + scientific atlas, light paper bg, crisp lines, 8K. No cyberpunk, no gibberish text, must show both above AND below ground.
```

<a id="prompt-e6e43a3687e3772cc4c4"></a>

### 68. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case73.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-73)

**提示词:**

```text
{
  "type": "complex urban systems atlas infographic",
  "style": "{argument name=\"color palette\" default=\"dark background with glowing blue, gold, and purple accents\"}, highly detailed technical illustration, 3D isometric cutaway",
  "header": {
    "title": "{argument name=\"chinese city name\" default=\"上海\"}城市系统剖面 {argument name=\"english city name\" default=\"SHANGHAI\"} URBAN SYSTEMS ATLAS",
    "subtitles": [
      "地表之上，是城市；地表之下，是秩序 {argument name=\"english subtitle\" default=\"Beneath the skyline lies the machine.\"}",
      "一座城市如何运转 How a Megacity Actually Works"
    ]
  },
  "layout": {
    "top_left": "Compass rose and city map labeled '上海市域位置 SHANGHAI LOCATION'",
    "top_right": "Data table titled '城市数据 CITY DATA' with 7 rows of statistics",
    "centerpiece": {
      "description": "{argument name=\"centerpiece style\" default=\"highly detailed 3D isometric cutaway render\"} of a megacity river landscape",
      "layers": [
        "地面层 SURFACE",
        "排水层 DRAINAGE LAYER",
        "电力层 POWER LAYER",
        "通信层 COMMUNICATION LAYER",
        "轨道交通层 METRO LAYER",
        "道路隧道层 ROAD TUNNEL LAYER",
        "管廊综合层 UTILITY CORRIDOR LAYER"
      ]
    },
    "side_panels": [
      { "id": "01", "title": "城市主骨架 URBAN SKELETON", "elements": "Map with 8 legend items" },
      { "id": "02", "title": "排水与地下水网 DRAINAGE + STORMWATER", "elements": "Cross-section diagram '典型排水剖面 DRAINAGE SECTION' with 5 legend items" },
      { "id": "03", "title": "电网与能源分配 POWER GRID + ENERGY", "elements": "Cross-section diagram '典型变电站剖面 SUBSTATION SECTION' with 6 legend items" },
      { "id": "04", "title": "通信与网络骨干 TELECOM + INTERNET", "elements": "Cross-section diagram '数据中心剖面 DATA CENTER SECTION' with 6 legend items" },
      { "id": "05", "title": "地铁与地下交通 METRO + SUBSURFACE MOBILITY", "elements": "Cross-section diagram '人民广场站剖面 PEOPLE'S SQUARE STATION' with 6 legend items" },
      { "id": "06", "title": "道路、高架与循环 ROADS + ELEVATED MOBILITY", "elements": "Cross-section diagram '南浦大桥剖面 NANPU BRIDGE SECTION' with 6 legend items" },
      { "id": "07", "title": "管廊与地下设施 UTILITY CORRIDORS + PLUMBING", "elements": "Cross-section diagram '综合管廊 UTILITY CORRIDOR' with 8 legend items" },
      { "id": "08", "title": "城市流量与系统协同 URBAN FLOWS + COORDINATION", "elements": "Map diagram '城市运行指挥中心 CITY OPERATIONS CENTER' with 6 legend items" }
    ],
    "bottom_panels": {
      "system_logic": {
        "title": "城市系统协同逻辑 SYSTEM COORDINATION LOGIC",
        "steps": 4,
        "labels": ["感知层 SENSING LAYER", "网络层 NETWORK LAYER", "平台层 PLATFORM LAYER", "应用层 APPLICATION LAYER"]
      },
      "city_brain": {
        "title": "城市大脑 CITY BRAIN",
        "central_node": 1,
        "peripheral_nodes": 8
      },
      "references": {
        "depth_scale": { "title": "深度与尺度 DEPTH & SCALE REFERENCE", "icons": 5 },
        "map_scale": { "title": "比例尺 SCALE", "markers": 4 }
      }
    }
  }
}
```

<a id="prompt-ed41438a5e0a1e658085"></a>

### 69. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case55.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-55)

**提示词:**

```text
Help me create a detailed production flowchart for the dish {argument name="dish name" default="Fried Pork with Chili"}, in a realistic style, suitable for Xiaohongshu image-text proportions.
```

<a id="prompt-eed497e62d26cd66fe59"></a>

### 70. 个人色彩分析图

<img src="https://pbs.twimg.com/media/HGc_ayZXsAAd7Ur?format=jpg&amp;name=large" alt="个人色彩分析图" width="480">

- **分类:** 信息图与教育
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/AngryTomtweets/status/2046674296559313170)

**提示词:**

```text
使用这张肖像，创建一个以图表为主的个人色彩分析。通过视觉对比展示哪些服装颜色适合该主体。保持文本简洁，避免使用段落。
```

<a id="prompt-efa7d86df851921bfb61"></a>

### 71. 长发造型分析信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case360.jpg" alt="长发造型分析信息图" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-360)

**提示词:**

```text
Create a professional "HAIRSTYLE ANALYSIS" infographic with a different male model (the same face) having long, thick hair (6-10 inches), slightly wavy texture.

Style should be clean, modern, premium grooming guide (similar layout but not identical).

TOP TITLE:
"HAIRSTYLE ANALYSIS - Long Hair Edition"

LEFT PANEL (Key Features with icons):
Face Shape: Oval
Hair Type: Thick
Texture: Wavy
Length: Long

BEST OPTIONS (Top row with green indicators):
Layered Flow Cut (Adds movement & volume)
Modern Curtain Hair (Stylish & balanced)
Textured Long Waves (Natural & full)
Loose Slick Back (Controlled but not flat)

LESS FLATTERING (Bottom row with red indicators):
Flat Straight Long Hair (No volume)
Overly Oily Slick Back (Too heavy)
Uneven Long Layers (Messy shape)
Excessively Frizzy Look (Uncontrolled)

BEST HAIR LENGTH SECTION:
Ideal: 6-10 inches with layers
Avoid: Too flat or too heavy bottom

BEST HAIR COLORS:
Dark Brown
Natural Black
Warm Brown
Ash Brown

DESIGN STYLE:
Clean grid infographic
White/beige background
Soft shadows
Premium magazine look
Realistic face and hair detail
Consistent spacing and typography
High resolution, 4K
```

<a id="prompt-f382c76c6d719c63b15d"></a>

### 72. 人教版三年级语文课本内页

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case303.jpg" alt="人教版三年级语文课本内页" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-303)

**提示词:**

```text
生成人教版小学三年级语文课本的一页
```

<a id="prompt-f88b7e499941ce7926d8"></a>

### 73. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case270.jpg" alt="信息图可视化设计" width="480">

- **分类:** 信息图与教育
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-270)

**提示词:**

```text
このキャラクターと背景を元に、 公式設定資料のようなキャラクターシートを作成してください。
・正面、側面、背面の3面図を含める ・キャラクターの表情バリエーションを追加
・衣装や装備の詳細パーツを分解して表示 ・カラーパレットを追加 ・世界観の簡単な説明を入れる
・全体は整理されたレイアウト
（白背景、図解風）
・アスペクト比16：9 　←

高解像度、プロのコンセプトアートスタイル
```

<a id="prompt-3e2ed7769ec74ba503d7"></a>

### 74. 信息图 / 教育视觉图 - Minimalist facial beauty report

<img src="https://cms-assets.youmind.com/media/1777367278815_6bvtbg_HG6lzruaUAAqP7L.jpg" alt="信息图 / 教育视觉图 - Minimalist facial beauty report" width="480">

一个用于生成清洁、高端面部美容分析报告的专业提示，包含数据驱动的洞察和简约布局。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/so_ainsight/status/2048757283384172848)

**提示词:**

```text
基于这张照片，创建一个简洁、简约且奢华的面部美容报告。使用基于 {argument name="color scheme" default="black on white"} 的设计，融入细线条、圆角卡片和奢华美学。包含简单的面部轮廓插图，坦率的吸引力分析（对称性、比例、骨骼结构、皮肤质量等），清晰的评分，优势，改进领域，以及易于实施的护理和风格改进建议。内容应基于数据，视觉上精致，不过分奉承。
```

<a id="prompt-ef8ce802d12b8dbd538e"></a>

### 75. 信息图 / 教育视觉图 - 3D Exploded Assembly Drawing

<img src="https://cms-assets.youmind.com/media/1777367268325_td7g6d_HG7r8UsawAAzN86.jpg" alt="信息图 / 教育视觉图 - 3D Exploded Assembly Drawing" width="480">

用于生成任何主题的详细技术3D爆炸视图图的提示。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Ankit_patel211/status/2048834306379075759)

**提示词:**

```text
创建一个3D超高详细分解装配图 {argument name="subject" default="[subject or object]"}
```
