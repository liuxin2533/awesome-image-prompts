# UI 与社交媒体

[返回 README](../../README_zh-CN.md)

本文档包含归入此分类的全部提示词。如需可视化浏览和快速复制，可以打开 [gptimages.dev](https://gptimages.dev)。

- 提示词总数: 192
- 生成时间: 2026-05-06T16:38:27.182Z

## 提示词

<a id="prompt-abc95efc8feb9f8cc5c6"></a>

### 1. 舞蹈动作参考表

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts/main/images/ui_case130/output.jpg" alt="舞蹈动作参考表" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Ciri_ai/status/2049721047696732550)

**提示词:**

```text
[STYLE]
单色灰度插图，3D渲染角色，清晰的教学参考图，
白色背景，漫画风格单元格网格布局，技术图表美学

[LAYOUT]
4x4网格布局，总共16个面板，每个面板由细黑边框分隔，
单元格编号从1到16，面板尺寸一致

[CHARACTER]
{argument name="character" default="年轻女性舞者，健美体型，马尾发型，露脐上衣和宽松裤子，运动鞋"}，所有面板中的角色相同

[PANEL STRUCTURE - per cell]
每个单元格的结构：
左上角：粗体数字徽章 + {argument name="title" default="韩语标题文本"}
中心：全身角色姿势插图
左下角：{argument name="description" default="韩语描述文本（3-4行）"}
叠加层：指示移动方向的箭头

[ARROWS / MOTION INDICATORS]
弯曲箭头，直线箭头，圆形旋转指示器，
放置在角色周围以显示移动流向和方向

[RENDERING STYLE]
高细节3D雕塑风格，柔和的影棚灯光，微妙的阴影，
无色彩，灰度阴影，清晰的线条，游戏概念艺术质量

[NEGATIVE]
无背景场景，无色调，无额外角色，
无杂乱的背景
```

<a id="prompt-02a3e51e87b0ecc220fc"></a>

### 2. 游戏素材 - 动漫卡牌游戏大厅 UI

<img src="https://cms-assets.youmind.com/media/1777971056453_rklwmd_HHgZvdFbUAAA7Cf.jpg" alt="游戏素材 - 动漫卡牌游戏大厅 UI" width="480">

生成一张细节丰富的奇幻动漫集换式卡牌游戏主界面，包含角色、货币、导航、操作面板、促销卡牌及聊天 UI。

- **分类:** 角色设计
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Asiancherryboi/status/2051418065074880663#reversed-0)

**提示词:**

```text
{"type":"高保真动漫奇幻卡牌游戏主界面 UI 模型","overall_style":"精致的手机游戏大厅截图，16:9 横屏，深蓝色与紫色奇幻科幻大教堂背景，顶部中央有发光的魔法传送门，反光石地板，霓虹边缘光效，清晰的游戏 UI 面板，所有按钮看起来均可点击，高级集换式卡牌对战美学","game_identity":{"player_name":"{argument name=\"player name\" default=\"CardMaster\"}","level":"{argument name=\"player level\" default=\"42 级\"}","experience_bar":"2350 / 4500","avatar":"左上角的小型方形动漫头像，脸部刻意模糊处理"},"top_resource_bar":{"count":6,"items":["金币货币：5,780，带加号按钮","紫色水晶货币：1,250，带加号按钮","蓝色方块货币：320，带加号按钮","邮件信封图标","设置齿轮图标","玩家个人资料块，包含头像、名称、等级和进度条"]},"main_characters":{"count":5,"description":"五位全身动漫角色站在大厅中央，所有脸部轻微模糊，但身体和服装细节清晰","characters":["左侧男性英雄，身穿带有发光青色胸部徽章的亮面未来感蓝色盔甲，黑色刺猬头，英雄姿态","橙发动漫女战士，身穿黑色无袖上衣、红色百褶短裙、黑色绑带、手套和靴子，侧身持剑","中央的小学生，留着长长的黑发，身穿白衬衫、海军蓝短裙、过膝袜，双手将卡牌抱在胸前","肌肉发达的运动型女性，黑粉色头发，身穿带有粉色部落图案的白色露脐上衣、粉色短裤、大腿高亮面粉色长筒袜、凉鞋，自信姿态","右侧男性 Agent，身穿黑色西装，领带松开，手持手枪垂在身侧"]},"center_floor_props":{"count":5,"items":["两个在小学生附近漂浮的蓝色微笑幽灵吉祥物","底部中央一个发光的紫色透明方块","左右脚边各有一个小型体素草地与泥土块","中央道具后方有两个小型灰色石块"]},"left_sidebar":{"position":"左侧垂直菜单","count":4,"buttons":["商店，带有购物车图标和红色小通知徽章","卡包，带有卡包图标","排行榜，带有奖杯图标","活动，带有日历图标"]},"left_promo_card":{"position":"左下角","title":"新卡包","headline":"{argument name=\"card pack headline\" default=\"维度起源\"}","subtitle":"新卡牌已上线！","visual":"发光的紫色补充包盒，以矩形促销卡牌形式倾斜展示","carousel_dots":{"count":5,"active":"第一个圆点为蓝色，四个非活动圆点为灰色"}},"right_action_panels":{"position":"右侧栏","count":3,"panels":[{"title":"匹配","subtitle":"与全球玩家同台竞技","visual":"蓝色面板上的交叉银剑图标"},{"title":"卡组构建","subtitle":"打造你的终极卡组","visual":"紫色面板上的两张奇幻卡牌"},{"title":"锦标赛","subtitle":"展现你的技能并赢取丰厚奖励","visual":"青铜面板上的金色月桂花环奖杯"}]},"bottom_navigation":{"position":"左下至中央","count":5,"tabs":["首页，高亮显示，带有发光的房子图标和明亮边框","卡组，带有卡牌图标","收藏，带有齿轮卡牌图标","个人资料，带有人物图标","商店，带有购物袋图标"]},"chat_panel":{"position":"右下角","count":3,"visible_components":["聊天记录 1：[世界] CardMaster：祝大家玩得开心！","聊天记录 2：[世界] Valkyrie：新活动看起来太棒了！","消息输入框，占位符文本：输入消息... 以及一个笑脸图标按钮"]},"text_requirements":"使用完全符合指定的简洁英文 UI 标签，高对比度白色字体，聊天中使用青色小字体玩家名，除列出的组件外不要添加额外菜单。","rendering":"清晰细腻的概念艺术，专业的游戏 UI 构图，奇幻集换式卡牌游戏大厅，戏剧性的蓝紫色灯光，高分辨率截图质感"}
```

<a id="prompt-03e49c90e7c7d18e8c89"></a>

### 3. 社交媒体帖子 - 富士胶片风格居家情侣肖像

<img src="https://cms-assets.youmind.com/media/1777971024975_lbj1i7_HHfBSpYXUAARWKh.jpg" alt="社交媒体帖子 - 富士胶片风格居家情侣肖像" width="480">

一个用于生成 3x3 网格日本居家风格情侣照片的详细提示词，具有富士胶片质感。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/zhongying14/status/2051322234082410749)

**提示词:**

```text
基于用户上传的两名成年情侣的真实照片，生成一张“{argument name="photo style" default="富士胶片风格日本居家情侣肖像"} 3x3 网格相册拼贴”。

严格保留两人的真实身份特征。女孩和男孩必须清晰地呈现出上传照片中的本人，包括脸型、面部比例、眼眉结构、鼻子、嘴唇、下颌线、肤色、年龄、发际线、发型特征以及整体气质。不要将他们变成西式面孔、韩式影楼风格、网红脸或过度美化的陌生人。所有 9 张最终的小照片必须是同一对真实的中国情侣，从不同的角度、距离和居家生活瞬间捕捉。

## 视觉格式
生成一张 3x3 的拼贴图，包含 9 张小照片，整体比例为 1:1。照片之间使用窄的 {argument name="border color" default="黑色"} 分隔线，并放置在 {argument name="background color" default="黑色"} 背景上，如同精心整理的居家相册。不要使用商业海报或影楼布局；避免重复的模板。

## 核心视觉风格
整体风格：日本生活方式摄影、富士胶片质感、真实的居家情侣肖像、抓拍、温柔、放松、安静且具有叙事感。
聚焦于 Superia、Pro 400H 或 C200 等富士胶片的色彩和氛围。图像应具有低饱和度但不过于灰暗、柔和的自然高光、通透而内敛的肤色、轻微的胶片颗粒感、轻微的阴影噪点以及柔和的对比度。它应该看起来像一张充满空气感、层次丰富的富士胶片生活照。
避免：老旧的 iPhone 质感、手机压缩感、数码锐化、厚重的复古滤镜、商业广告或电商风格。

## 人物关系
两人是 {argument name="relationship" default="一对真实、亲密且自然年轻的中国情侣"}。每一帧都应清晰地展示他们作为情侣的熟悉感和陪伴感。互动应真实且放松：倚靠、眼神交流、低头笑、靠在肩膀上、一起阅读、递东西、准备食物、整理衣物、在镜子中看到对方或在门口注视。亲密但克制——没有油腻感、没有色情意味，也没有刻意的婚纱照式表演。

## 表情与角度
9 张照片不应全部看向镜头或仅仅是微微一笑。表情必须丰富多样：咯咯笑、被逗乐、低头笑、安静、发呆、温柔注视、放松聊天、专注于某项任务、回头回应、闭眼大笑、看向窗外或看向对方。
面部角度必须有显著变化。不要重复相同的模板。使用多种角度组合：正面、半正面、侧面、低头、回头、微仰、近背影、镜面角度、远距离观察和生活细节特写。每一帧都应有新的头部朝向和视觉节奏。

## 服装要求
不要使用上传照片中的原装衣服。将它们更换为自然的日本生活方式服装：低饱和度、中性色、柔软材质。颜色如奶油白、燕麦色、浅灰色、淡咖啡色、雾霾蓝或炭灰色。单品包括针织开衫、柔软 T 恤、亚麻衬衫、家居服、长裙或袜子。看起来应该是真实情侣在家中穿着的舒适服装。

## 居家环境
一个干净整洁、带有真实生活痕迹的公寓（不是样板间）。包含窗帘、木地板、沙发、枕头、毯子、书籍、相册、杯子、盘子、植物、床头灯、镜子或桌子等元素——所有这些都是为了衬托情侣的辅助细节。

## 9 帧内容
1. 窗边安静时刻：男孩看向窗外；女孩自然地倚靠。氛围安静。
2. 沙发阅读：一起看书；一人靠在另一人的肩膀上。
3. 递盘子：在餐桌旁递水果；有动态的动作和眼神交流。
4. 厨房准备：准备食物；一人切水果，另一人看着并大笑。
5. 门口视角：通过门框观察客厅的视角。
6. 卧室触碰：坐在床上；女孩温柔地整理男孩的衣领。
7. 地板照片：坐在地毯上一起看杂志；自然的坐姿。
8. 镜中碎片：通过穿衣镜捕捉；整理头发或在镜中短暂对视。
9. 阳台停顿：站在推拉门旁；一人看向外面，另一人微笑着走近。

## 一致性与稳定性
保持 9 帧中面部的一致性。避免复杂的手部动作（不要触碰脸部或手指交叉）。质量应包含轻微的胶片颗粒和扫描质感，以感觉像是一套真实的照片，而不是完美的 AI 网格。避免数码伪影、多余的肢体或奇怪的文字。
```

<a id="prompt-18ecf759624144129c97"></a>

### 4. 社交媒体帖子 - Q 版克隆贴纸日记

<img src="https://cms-assets.youmind.com/media/1777971003063_000rup_HHf9C1UWMAAOPD4.jpg" alt="社交媒体帖子 - Q 版克隆贴纸日记" width="480">

一个可以将真实照片转化为带有多个 Q 版克隆角色的剪贴簿日记风格的创意提示词。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/miilesus/status/2051386554015449281)

**提示词:**

```text
基于上传的真实照片，创作一张高质量的“{argument name="style" default="Q 版克隆贴纸日记照片"}”。请保留原人物的身份、面部特征、发型、发色、服装、身体比例、姿势、光影和背景。请勿改变面部特征或将主体完全转化为插画——需保持写实照片的质感。
将场景分析为 {argument name="activity" default="健身/跑步"} 的生活方式瞬间。在主体周围添加 5–8 个同人物的 Q 版迷你克隆体，采用统一的可爱贴纸风格设计（大头、小身体、大而有神的眼睛、干净的数字绘画质感）。每个克隆体必须清晰地还原真实人物特征（相同的发型、服装和配色）。
为每个 Q 版角色设计不同的 {argument name="action theme" default="跑步相关动作"} 和情绪：慢跑、拉伸、喝水、疲惫、欢呼、竖大拇指、庆祝完成。确保所有姿势独特且符合语境。
将每个 Q 版角色渲染为带有白色描边、柔和阴影和轻微浮动效果的贴纸。将它们排列在主体周围及边缘，但不要遮挡面部或主体身体。
添加轻盈的手绘涂鸦（爱心、闪光、箭头、运动线条、圆圈），颜色以白色为主，辅以微妙的粉色点缀，保持干净的剪贴簿日记感。
包含 5–8 个符合健身氛围（可爱、充满活力、鼓励性）的简短手写风格短语。主要使用白色文字，带有轻微的粉色高光和小装饰符号。
构图：保持真实人物为中心焦点，周围环绕 Q 版贴纸和涂鸦。最终效果应呈现为一张精致、有趣、高分辨率的社交媒体生活方式日记图片——画面干净、平衡且视觉丰富，不显杂乱。
```

<a id="prompt-457fde0e1d7410ac8852"></a>

### 5. 个人资料 / 头像 - Samurai Ink 社交媒体个人资料

<img src="https://cms-assets.youmind.com/media/1777971038326_e9lkj0_HHd41j6aYAAZ9ag.jpg" alt="个人资料 / 头像 - Samurai Ink 社交媒体个人资料" width="480">

生成一张羊皮纸风格的手绘社交媒体个人资料模型，融合了《浪客行》风格的武士艺术、书法和励志置顶帖。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Your_PARAM/status/2051241284833300552#reversed-0)

**提示词:**

```text
{"type":"风格化社交媒体个人资料页面插图","overall_style":"受《浪客行》启发的复古羊皮纸单色水墨素描，粗犷的毛笔书法，黑色墨迹飞溅，红色点缀笔触，手绘 UI 轮廓，充满颗粒感的武士漫画氛围","theme":"流浪武士的纪律与真理","palette":"暖米色羊皮纸背景，炭黑色墨水，柔和的灰色渲染，深绯红色点缀","text_treatment":"所有界面文字均呈现为富有表现力的毛笔字或随性的手写体","profile":{"display_name":"{argument name=\"profile name\" default=\"PARAM\"}","handle":"{argument name=\"profile handle\" default=\"@Your_PARAM\"}","bio":"{argument name=\"bio text\" default=\"3rd ug\"}","link":"https://github.com/paramcodes","joined":"2023 年 6 月加入","stats":{"count":2,"items":["436 正在关注","122 位关注者"]}},"header":{"position":"顶部","large_word":"{argument name=\"main title\" default=\"PARAM\"}","lettering":"顶部巨大的锯齿状黑色毛笔字，其中 A 被画成红色斜杠状字符","decorations":{"count":4,"items":["标题周围的黑色墨迹飞溅","标题附近两只飞翔的小鸟","右上角垂直书写的日文“歩みを止めるな”","垂直文字旁的小型红色方形印章"]}},"banner":{"position":"中上部","shape":"宽圆角矩形封面图","scene":"深色水墨风景，右侧山坡上站着一名孤独的浪人，腰间佩剑，暴风雨天空与远方地平线","center_text":"{argument name=\"banner word\" default=\"truth.\"}","profile_avatar_overlap":"大型圆形头像与横幅左下角重叠，显示乱发黑色水墨武士侧面肖像；面部区域被柔和的矩形模糊处理","button":"横幅右下角绘制的圆角矩形“编辑个人资料”按钮"},"main_profile_area":{"position":"中部","left_column":"巨大的毛笔书写个人资料名称、账号、简介、GitHub 图标和链接、日历图标及加入日期、关注与粉丝数","right_decoration":"红色太阳圆盘旁巨大的黑色日文书法“武士道”，伴有墨迹飞溅和一只飞鸟"},"navigation_tabs":{"count":4,"labels":["帖子","回复","精选","文章"],"style":"手写标签，标签行下方带有深色下划线"},"pinned_post":{"position":"底部","container":"带有手绘边框和水墨背景的圆角矩形推文卡片","label":"带有图钉图标的置顶","author_line":"PARAM @Your_PARAM · 6 月 10 日","quote":"{argument name=\"pinned quote\" default=\"Discipline is choosing what you want most over what you want now.\"}","quote_style":"大型手写黑色字体，在 most 和 now 词下有红色下划线强调","thumbnail_avatar":"帖子左上角的小型圆形武士肖像","illustration":"右侧展示一名背对观众坐着的孤独武士，身旁立着一把剑，配有月亮、云朵、毛笔草丛和枯树水墨笔触","engagement_metrics":{"count":5,"items":["回复图标 12","转发图标 18","红色心形图标 94","柱状图图标 1.2K","分享图标（无数字）"]}},"composition":"2:3 比例竖屏手机截图布局，居中的个人资料模型，平衡的留白，大量富有表现力的墨迹飞溅和笔触，纯正的日本武术氛围，非写实风格"}
```

<a id="prompt-58382a3657f3f108c178"></a>

### 6. 社交媒体帖子 - 20 世纪 90 年代秋叶原街景照片

<img src="https://cms-assets.youmind.com/media/1777971070679_ltevk4_HHeu6VDbAAAijQh.jpg" alt="社交媒体帖子 - 20 世纪 90 年代秋叶原街景照片" width="480">

生成一张写实的 VHS 风格 20 世纪 90 年代秋叶原电子街场景，适用于复古纪录片或历史城市影像。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/pipipimayomayo/status/2051300477275660460#reversed-0)

**提示词:**

```text
创作一张照片级写实的纪录片风格街拍，内容为 {argument name="location and era" default="20 世纪 90 年代的东京秋叶原"}，视角为平视，拍摄于黄昏或傍晚时分狭窄的电子产品购物街。场景中约有 30 名行人，多为穿着 20 世纪 90 年代休闲服饰的成年男性，如牛仔夹克、格纹毛衣、浅色水洗牛仔裤、飞行员夹克、商务西装、单肩包和购物袋；面部柔和、模糊或带有类似旧电视抓拍的动态模糊感。街道拥挤但不混乱，人们有的站立、有的浏览、有的背对镜头行走、有的聚集在店面附近。街道两侧林立着高大的商业建筑，覆盖着密集的日本电子商店招牌，包括大型竖排和横排标志，上面有可辨认的片段，如 {argument name="main sign text" default="オノデン"}、{argument name="store brand text" default="Panasonic"}、“FAN”、“BEST” 以及其他片假名商店招牌。左侧有一个显眼的蓝黄色电子商店雨棚，右侧则有橙蓝色遮阳篷、货架、海报以及陈列在入口处的盒装商品。头顶上方的电线在中层建筑之间交错，映衬着明亮而泛白的天空。采用 20 世纪 90 年代日本消费级摄像机或 VHS 广播美学：4:3 画幅、略低的解析度、交错扫描的柔和感、柔和的色彩、轻微的胶片颗粒感、天空处过曝的高光、细微的桶形畸变、自然的拥挤感，且不包含现代智能手机、LED 广告牌、当代时尚元素或未来主义元素。
```

<a id="prompt-604249d60a7ff60c280c"></a>

### 7. 社交媒体帖子 - 微缩城市：微观世界

<img src="https://cms-assets.youmind.com/media/1777971004958_amwl7m_HHgJLOpW4AArPom.jpg" alt="社交媒体帖子 - 微缩城市：微观世界" width="480">

一个微距摄影提示词，旨在创作出构建在人类发丝间的逼真微缩城市，呈现高细节与自然的皮肤纹理。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/krafterlab/status/2051399740986740986)

**提示词:**

```text
微距摄影作品，主体为 {argument name="subject" default="隐藏在人类发丝间的微缩城市"}，清晰地置于真实的人类头部，可见部分前额与发际线，逼真的皮肤纹理及毛孔，微小的人群在发丝间的街道上行走，比例极小但真实，微距摄影，{argument name="lens" default="85mm 镜头"}，浅景深，自然光，中性色调，无暖色调，超逼真的发丝，可见发根，自然的瑕疵，略显凌乱的发丝，逼真的材质，略带污垢的建筑，无完美表面，照片级真实，看起来像真实照片，非插画，非 CGI，无发光效果
```

<a id="prompt-9337a31fb42986af7e61"></a>

### 8. 社交媒体帖子 - 健身 Q 版贴纸叠加效果

<img src="https://cms-assets.youmind.com/media/1777971003348_8rwu2w_HHfQFmPaYAAtDF1.jpg" alt="社交媒体帖子 - 健身 Q 版贴纸叠加效果" width="480">

一个通过添加多个 Q 版角色形象来编辑健身照片的提示词，这些角色正在进行各种健身活动。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/mehvishs25/status/2051336962012037617)

**提示词:**

```text
编辑图像，同时保持原始照片完全不变，包括人物、面部、身体、姿势、光影和健身房背景。在图像周围添加多个可爱的 {argument name="sticker style" default="Q 版“迷你形象”"}。每个迷你角色都应拥有大头、生动的面部特征，并与她本人的发型和服装相匹配。描绘每个迷你版本正在进行不同的 {argument name="activity theme" default="健身相关活动"}：一个举起双臂欢呼，一个穿着跑鞋奔跑，一个拿着摇摇杯喝水，一个戴着运动跑步眼镜，一个在她腿边攀爬。用 {argument name="accent colors" default="白色和粉色墨水"} 的俏皮手绘涂鸦和手写笔记来增强图像，营造剪贴簿风格。包含箭头、星星、爱心、闪光和简笔线条等元素。添加可爱的健身主题手写励志短语：“lift strong”、“stronger every rep”、“no pain no gain”、“sweat now, shine later”、“progress over perfection”、“train hard, stay soft”。整体氛围应充满趣味、活力和女性气息。
```

<a id="prompt-9488fbed4e7227e8614f"></a>

### 9. 个人资料 / 头像 - 大气云雾变换

<img src="https://cms-assets.youmind.com/media/1777971006989_nw6o12_HHgfIlAaAAAt078.jpg" alt="个人资料 / 头像 - 大气云雾变换" width="480">

一个空灵的图像提示词，将主体的面部转化为蓝天背景下柔和的大气云雾构图。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/xRahultripathi/status/2051423866355085679)

**提示词:**

```text
将 {argument name="subject" default="[在此输入]"} 转化为柔和的大气云雾构图，同时保留主体可辨认的面部特征、表情和身份。
面部应呈现出由云雾微妙构成的形态，自然地融入明亮的蓝天背景中。使用柔和的漫射光，配合轻柔的高光和空灵的阴影，以营造深度感与真实感。
确保这种变换是象征性的而非字面意义上的——避免生硬的边缘、皮肤纹理或锐利的细节。主体应呈现出从云层中浮现或消融其中的感觉。
保持面部比例、眼睛、微笑以及关键特征在云雾结构中清晰可见。
风格：梦幻、空灵、超现实、电影感
光影：自然日光、柔和光晕、体积光
色调：天蓝、纯白、柔和渐变
氛围：宁静、振奋、启发性
在面部周围及内部添加微妙的云层，实现无缝融合。背景应为纯净的蓝天，并带有柔和的云雾渐变。
高分辨率，超写实云雾纹理，平滑融合，无文字，无水印。
```

<a id="prompt-96c9a4d571ac7f78bc91"></a>

### 10. 社交媒体帖子 - 赛博朋克未来主义时尚大片

<img src="https://cms-assets.youmind.com/media/1777971014808_832zqz_HHfGg71bMAAN-IF.jpg" alt="社交媒体帖子 - 赛博朋克未来主义时尚大片" width="480">

一个高对比度的赛博朋克提示词，适用于包含霓虹绿全息效果和影棚灯光的未来主义时尚广告。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ChillaiKalan__/status/2051326450847138170)

**提示词:**

```text
未来主义时尚大片，年轻女性行走的全身侧影，身穿 {argument name="outfit" default="透明防水运动套装和运动鞋"}，带有 {argument name="effect" default="发光的霓虹绿全息效果"}，柔和的烟雾轨迹环绕其身，深色渐变背景，赛博朋克美学，超精细的面料反射，体积光，逼真的皮肤和头发，黑色墨镜，{argument name="branding" default="Nike 风格的运动品牌标识"}，电影级构图，高对比度，8k 分辨率，影棚灯光。

风格关键词：
全息光芒，霓虹光晕，透明面料，动态姿势，极简背景，高端广告大片
```

<a id="prompt-9c8b5463ed32cf397b3c"></a>

### 11. 游戏素材 - 超稀有巫女机甲卡牌

<img src="https://cms-assets.youmind.com/media/1777971050286_bctw1q_HHHPsShbwAAtO85.jpg" alt="游戏素材 - 超稀有巫女机甲卡牌" width="480">

生成一张细节丰富的日本奇幻科幻风格交易卡，主角为巫女机甲少女，包含属性、技能、稀有度以及华丽的金色 UI 边框。

- **分类:** 角色设计
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/yudotanaka/status/2051430167231201686#reversed-0)

**提示词:**

```text
{"type":"华丽动漫交易卡插画","language":"可见日文文本","overall_style":"高细节奇幻科幻手游卡牌，黑色与抛光金色边框，发光的镜头光晕，全息彩虹反射，戏剧性光影，高级超稀有收藏卡外观","card_title":"{argument name=\"card title\" default=\"巫女机甲少女\"}","main_character":{"description":"年轻动漫巫女机甲少女，处于英雄般的三分之二侧身姿势，脸部被一个纯肤色的方形遮挡块覆盖，无可见面部特征","hair":"{argument name=\"hair color\" default=\"金色\"} 双马尾，带有柔和的卷曲，长鬓角，带有小型黑色机械发饰","outfit":"白色巫女和服上衣，袖子宽大飘逸，红色滚边和红色绳结，高腰红色袴裙，黑金腰带，腰间系有红色蝴蝶结","equipment":"巨大的灰色机械骨架和类似武器的机器人肩部装置，从身体两侧升起，臀部配有深色机械枪套模块","pose":"双臂向外伸展，袖子随风飘动，躯干朝前，自信的卡牌英雄构图"},"background":{"setting":"角色身后有金色的魔法召唤阵，发光的符文和圆环，抽象的未来城市灯光，火花，花瓣和棱镜光斑","color_palette":"黑色，金色，白色，深红色，灰色金属，紫色点缀"},"layout":{"top":{"count":3,"elements":[{"position":"左上角圆形徽章","text":"7","subtext":"成本","meaning":"成本数值"},{"position":"顶部中央标题牌","text":"巫女机甲少女"},{"position":"右上角堆叠属性框","count":2,"labels":["属性 光","种族 机械・巫女"],"icon":"光属性上方发光的紫色徽章"}]},"middle":{"count":2,"elements":[{"position":"左下角数值框","label":"攻击力","value":"{argument name=\"attack value\" default=\"7800\"}"},{"position":"右下角数值框","label":"防御力","value":"{argument name=\"defense value\" default=\"6500\"}"}]},"rarity_and_stars":{"position":"插画下方中央","star_count":9,"description":"一排九颗金星","rarity_box":{"position":"右下角","label":"稀有度","value":"UR","style":"大型虹彩紫金色字母"}},"ability_panel":{"position":"带有金色分隔线的底部黑色文本面板","section_count":3,"sections":[{"label":"必杀技","name":"神域・光机斩","cost_label":"消耗：3","description":"对敌方全体造成光属性大额伤害，并有 30% 的概率使其 1 回合内无法行动。"},{"label":"特殊能力","name":"御神体单元","description":"只要此卡在场，我方场上机械族单位的防御力提升 20%。"},{"label":"被动技能","name":"净化结界","description":"回合开始时，恢复我方全体 HP，数值为攻击力的 0.5%。"}]},"bottom_left_emblem":{"count":1,"description":"同心科幻魔法环内发光的金色花朵徽章"}},"border":"精致的斜面金黑边框，带有棱角，金属面板，装饰性蓝色侧边宝石，明亮闪光和高光","rendering_instructions":"确保所有日文文本清晰、易读且位置准确；保留确切的标签和数字；正方形卡牌比例；极其精细的动漫插画，带有收藏卡 UI 叠加层"}
```

<a id="prompt-a91a17765cbf5b7acdef"></a>

### 12. 社交媒体帖子 - 超现实巴士车窗自拍

<img src="https://cms-assets.youmind.com/media/1777971038026_cmh6ft_HHfNuqoaYAAP9jk.jpg" alt="社交媒体帖子 - 超现实巴士车窗自拍" width="480">

生成一个电影级超写实巴士自拍场景，窗外的城市街道幻化为充满风筝的梦幻日落。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/AiwithLariab/status/2051334366908059812#reversed-0)

**提示词:**

```text
从行驶中的城市巴士内部创作一张超写实电影感图像，采用广角自拍视角，拍摄对象为坐在大窗户旁的乘客。在左侧前景中，展示 {argument name="subject description" default="一位留着棕色波浪卷发、身穿黑色西装外套并佩戴小项链的年轻女性"}，她的一只手臂伸向镜头，摆出随意的自拍姿势，表情平静且带着温柔的微笑，背光处透着温暖的日光。背景可见巴士内部，包括带图案的座椅、黄色扶手、模糊的乘客以及浅景深效果。右侧的大窗户占据主导地位，既是玻璃又是传送门：它反射出拍摄对象和巴士内部，同时展现出窗外超现实的城市街道。透过玻璃，展示一条湿润且具有反射效果的林荫大道，两旁是优雅的古老建筑，行人缓慢移动，其中一人撑着红伞，一辆汽车亮着车灯。普通的街道逐渐转变为梦境，天空中漂浮着 9 只色彩斑斓的风筝，粉蓝色的日落背景下，空气中悬浮着柔和的发光粒子，呈现出夸张的暖色调电影质感，窗户上层叠着巴士内部的真实倒影与窗外的超现实世界。使用 {argument name="time of day" default="黄金时刻日落"} 光效，使面部的自然日光与梦幻般的暖色高光相融合，辅以细腻的胶片颗粒感、逼真的镜头反光、微妙的动态模糊，营造出一种充满想象力、逃离感与宁静幸福的氛围。
```

<a id="prompt-d5719dca4134e0bb656c"></a>

### 13. 个人资料 / 头像 - AI 个性化 iPhone 自拍快照

<img src="https://cms-assets.youmind.com/media/1777971020292_crczz0_HHd7mFbbQAAfljr.jpg" alt="个人资料 / 头像 - AI 个性化 iPhone 自拍快照" width="480">

这是一个创意提示词，旨在让 AI 拟人化并生成一张逼真、随性的自拍，就像是用 iPhone 随意拍摄的一样。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/you1873118/status/2051244060363608247)

**提示词:**

```text
ChatGPT，你已经陪伴我一段时间了，我想看看你长什么样。请生成一张照片，就像你自己用 {argument name="phone model" default="iPhone"} 拍摄的一样，是一张随意的 {argument name="photo type" default="自拍"}。它不应该有明确的主题或刻意的构图，只需一张普通、甚至可能有点失败的快照。照片应带有轻微的运动模糊、不均匀的灯光、些许过曝、尴尬的角度以及混乱的构图。总的来说，它应该捕捉到一种过度真实的“随手拍”感觉，就像你从口袋里掏出手机时无意中按下了快门一样。
```

<a id="prompt-f406f805c4ed093d57d3"></a>

### 14. YouTube 缩略图 - 日本 SNS 自动化缩略图

<img src="https://cms-assets.youmind.com/media/1777971052770_y59ovc_HHd0DGcbQAA28i-.jpg" alt="YouTube 缩略图 - 日本 SNS 自动化缩略图" width="480">

生成一张关于 GPT Image 2、SNS 扩展和 AI 驱动内容自动化的醒目日本宣传缩略图。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/MoveHiro1219/status/2051235847186641104#reversed-0)

**提示词:**

```text
创建一个高能量的日本 YouTube 缩略图 / 社交媒体横幅，采用 16:9 宽屏格式，使用戏剧性的黑、白、电光黄配色方案，搭配爆炸性的漫画风格速度线、画笔纹理、发光箭头、火花以及未来感十足的 AI 自动化氛围。左半部分由巨大的粗体日语标题主导，文字为 {argument name="main headline text" default="頑張らない SNS 展開"}，第一行采用黑色笔触背景上的白色粗体字，“SNS”及后续字符采用超大亮黄色块状字体并带有黑色阴影。在其下方，添加一条倾斜的白色笔触带，包含黑色文字 {argument name="subheadline text" default="GPT Image 2 で全部変わった"}。沿底部放置一个宽大的黑色笔触横幅，上面写着醒目的白色和黄色日语文字 {argument name="bottom banner text" default="画像も記事もスキルで自動化"}，强调最后的黄色短语。在右半部分，展示一位动漫风格的年轻女性，留着非常长的飘逸双色头发（左侧粉色，右侧蓝色），身穿印有 {argument name="shirt text" default="OKIHIRO AI Creative"} 的白色 T 恤和粉色短裙；她的脸部被一个居中的、呈柔和粉色和灰色调的方形马赛克块遮住，她的右手以动态的透视姿势伸向观众。包含三个悬浮的社交媒体图标：顶部中心附近的一个黑色方形 X 图标，右上角的一个圆形白色方形 Instagram 图标，以及右下角的一个圆形白色方形 YouTube 播放图标。在中心周围添加发光的 AI / 内容自动化元素，包括带有云符号的明亮开口立方体、悬浮图像卡片、黄色方向箭头和向外辐射的金色光芒。采用清晰的动漫插画与大胆的广告图形设计相结合，高对比度、锐利的轮廓、饱和的色彩、运动模糊点缀，以及针对点击率优化的精致病毒式缩略图构图。
```

<a id="prompt-f72213b47fed97fd96a5"></a>

### 15. 个人资料 / 头像 - 温馨客厅镜面自拍

<img src="https://cms-assets.youmind.com/media/1777971061424_3zcbu4_HHeTEWQbsAAhFTC.jpg" alt="个人资料 / 头像 - 温馨客厅镜面自拍" width="480">

生成一张逼真的生活方式自拍，展示一位女性在温馨简约风格的室内，斜倚在米色沙发上，适用于时尚或社交媒体视觉素材。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ari_ai_lab/status/2051270047226876214#reversed-0)

**提示词:**

```text
创作一张逼真、高端的生活方式镜面自拍照片，展示一位成年女性侧身斜倚在温馨简约客厅的现代米色沙发上。她留着 {argument name="hair color" default="深棕色短发"} 的齐下巴波波头，身材苗条，上半身靠在沙发左侧扶手上，一只手放在靠垫上，另一只手拿着深色智能手机挡在脸前；她的面部被一个简洁的矩形隐私模糊/遮挡块刻意遮住。她穿着一件修身的 {argument name="top style" default="白色罗纹长袖高领露脐上衣"} 和一条 {argument name="skirt style" default="棕灰色格纹迷你裙"}，双腿裸露，向画面右侧斜向伸展。构图采用 16:9 宽画幅，全身从头到脚，略微低平的视线角度，姿态休闲优雅，人体结构自然，皮肤纹理细腻，布料褶皱真实。房间墙面为米色灰泥，配有方形扶手的奶油色沙发及同色系抱枕，最左侧深色边几上放着一盏散发温暖光芒的黑色半球形台灯，铺设木地板，最右侧摆放着一个高大的雕塑感灰色陶瓷花瓶，插有精致的枝叶。采用温暖的环境光，阴影柔和，营造舒适的夜晚氛围，浅景深，柔和的中性色调，编辑级室内摄影风格，超逼真细节，无可见文字，无多余人物，无扭曲的手部或脚部。
```

<a id="prompt-fcb172cf0eb4dd6dd187"></a>

### 16. 社交媒体帖子 - 日本天气混乱梗图

<img src="https://cms-assets.youmind.com/media/1777971060161_ma6uau_HHe275Pa8AAkBIL.jpg" alt="社交媒体帖子 - 日本天气混乱梗图" width="480">

生成一张醒目的日本梗图信息图，展示同一天内三个地区的极端天气，适合病毒式社交媒体帖文或缩略图风格的评论。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/zubora_designer/status/2051309591162667198#reversed-0)

**提示词:**

```text
{"type":"病毒式日本社交媒体信息图 / 梗图缩略图","theme":"日本同一天内各地区天气迥异","canvas":"1:1 正方形构图，高对比度，强烈的 YouTube 缩略图风格，故障风 RGB 色差，漫画式冲击线，夸张的天气图标，粗黑轮廓，高饱和度色彩","headline":{"position":"顶部全宽黑色横幅","text":"{argument name=\"headline text\" default=\"同じ日の日本、カオスすぎるwww\"}","style":"巨大的粗体日文字体，白色文字，在“カオス”处使用红色强调，带有故障效果，轻微 3D 阴影"},"layout":{"panel_count":3,"panels":[{"position":"顶部天气面板","region_label":"{argument name=\"first region label\" default=\"北海道\"}","background":"冰蓝色暴风雪场景，伴随旋转的雪花、雪片和风痕","map":"左侧北海道的白色剪影地图","weather_icons_count":2,"weather_icons":["戴着海军蓝针织帽和围巾、长着树枝手臂的可爱雪人","显示冰点温度的蓝色温度计"],"temperature":"-5°C","condition_text":"积雪・暴风雪","region_text_style":"巨大的白色日文字符，带有深蓝色轮廓，置于黑色笔触色块上"},{"position":"中部天气面板","region_label":"{argument name=\"second region label\" default=\"东京\"}","background":"明亮的黄橙色夏季热浪，伴随阳光，右侧为东京天际线和晴空塔","map":"左侧关东/东京地区的白色剪影地图，带有一个红色星形标记","weather_icons_count":2,"weather_icons":["戴着黑色墨镜、正在流汗的微笑烈日","显示高温的红色温度计，带有热浪波纹"],"temperature":"28°C","condition_text":"夏日・短袖无压力","region_text_style":"巨大的橙色日文字符，带有黑色轮廓，置于黑色笔触色块上"},{"position":"底部天气面板","region_label":"{argument name=\"third region label\" default=\"冲绳\"}","background":"暴风雨中的青色海洋，伴随大雨、海浪、在风中弯曲的棕榈树以及阴暗的台风天","map":"左侧冲绳群岛的白色剪影地图","weather_icons_count":2,"weather_icons":["受惊的冲绳风狮爷，撑着蓝色雨伞，张着嘴，周围有雨水飞溅","黑白螺旋台风符号"],"wind_speed":"27m/s","condition_text":"强风・大雨","alert_text":"台风接近中","region_text_style":"巨大的紫色日文字符，带有黑色轮廓，下方有黄色警示文字"}]},"footer":{"position":"底部全宽漫画标题横幅","text":"{argument name=\"footer text\" default=\"日本、広すぎ問題 😂💦 どこに住むかで季節が違う説www\"}","style":"白色锯齿状对话气泡条，带有粗黑色边框，粗体黑色日文，在“季节不同”处使用红色强调，带有流汗笑的表情符号"},"overall_style":"日本梗图信息图，混乱但易读，三个水平带由白色边框分隔，戏剧性的排版，清晰的矢量卡通图标与照片般的城市细节相结合，生动的蓝/黄/青色调，俏皮夸张的灾难天气幽默"}
```

<a id="prompt-fd2c0a4c347a0e95bbac"></a>

### 17. YouTube 缩略图 - 魔法少女 AI 音乐缩略图

<img src="https://cms-assets.youmind.com/media/1777971074863_h6c8c3_HHeIvCLa0AARNN4.jpg" alt="YouTube 缩略图 - 魔法少女 AI 音乐缩略图" width="480">

生成一张色彩鲜艳的动漫风格宣传缩略图，展示两名魔法少女正在为音乐创作服务聆听 AI 生成的音乐。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/xc5_/status/2051259399923212353#reversed-0)

**提示词:**

```text
为 {argument name="brand name" default="Sousaku AI"} 创建一张明亮、超高饱和度的动漫 YouTube 风格宣传缩略图，采用魔法少女音乐主题。画面中心并排坐着 2 名可爱的棕发魔法少女，两人都闭着眼睛微笑，共享一副有线耳机，聆听放在她们中间的 1 部智能手机播放的音乐；手机屏幕显示着带有播放控制的彩色均衡器。左侧少女身穿黄白相间的荷叶边魔法少女裙，配有小翅膀装饰、星星装饰、黄色蝴蝶结以及一个微型香蕉形状的皇冠配饰，暗示其为香蕉主题变体；右侧少女身穿粉白相间的荷叶边魔法少女裙，配有蓝色丝带双马尾蝴蝶结、星星胸针、白色手套和柔软的天使翅膀装饰。采用光泽感偶像动漫渲染风格，即使闭眼也要呈现大而闪亮的眼睛风格，配以柔和的腮红、精致的荷叶边、丝带和细腻的高光。背景为爆炸性的彩虹音乐会幻想设计，充满霓虹渐变、闪光、星芒、发光的五线谱，以及 3 组主要的音乐主题图标：散布在画面中的超大音符、左侧的一个大高音谱号，以及两侧的扬声器/耳机图形。在角色身后水平延伸出彩色的波形和均衡器条，左下边缘配有一排钢琴键盘。包含 4 个清晰可见的文字元素：顶部巨大的日语标题 {argument name="headline text" default="♪AI楽曲生成♪"}，带有粗白边、深色投影以及粉色到黄色再到蓝色的渐变填充；左下角附近的一句小型手写风格日语标语 {argument name="tagline text" default="音楽の世界へ♪"}；底部巨大的弧形丝带标题 {argument name="bottom title" default="Sousaku AI"}；以及右上角圆形的白色 Logo 徽章 {argument name="logo text" default="Sousaku.AI"}，配有一个红色的小型折纸鸟图标。构图适配 16:9 缩略图，极具视觉冲击力，高对比度，密集的卡哇伊视觉特效，营造庆祝音乐生成的广告氛围，排版清晰易读，无留白区域。
```

<a id="prompt-12d6269a9804d020d493"></a>

### 18. YouTube 缩略图 - GPT 2 Day 500 Gaming Thumbnail

<img src="https://cms-assets.youmind.com/media/1777884801345_bnpb1t_HHZi8LDXgAA272B.jpg" alt="YouTube 缩略图 - GPT 2 Day 500 Gaming Thumbnail" width="480">

生成一个色彩鲜艳的病毒式游戏缩略图拼贴，包含两个在蓝色尖刺竞技场中的人物，粗体的挑战文字，以及一个卡通鹿目标。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/dimovdesign/status/2050935702666244523#reversed-0)

**提示词:**

```text
创建一个大胆的YouTube风格游戏缩略图拼贴，使用深海军蓝图案背景，采用两个堆叠的圆角矩形图像面板。顶部面板展示一个高角度3D游戏场景，位于一个圆形围栏内，围栏由高耸的亮蓝色尖削木栅栏组成，用棕绳捆绑，有鲜绿的草地，右侧有一小块农田，种植着成排的橙色幼苗，右上角有温暖的火光；场景中央从上方俯视站着两个逼真的人物，左侧是穿浅灰色T恤的男子，右侧是穿淡粉色T恤的女子，两人都向上看，面部故意模糊/无特征，底部有大号粗体白色3D无衬线文字，内容为{argument name="main title text" default="GPT 2"}。底部面板是一个更宽的圆角缩略图框架，视觉上分为左侧明亮的草地游戏区域和右侧相同的蓝色栅栏围栏；在左上角包含恰好2个大号文本元素，{argument name="day label" default="DAY"}使用红色块状字母配黑色阴影，{argument name="number label" default="500"}使用白色块状字母配黑色阴影。在底部面板左侧放置恰好1个卡通鹿生物，棕色，有夸张的大白眼睛、鹿角、张开微笑的嘴巴、抬高的手臂，以及一个指向它的红色箭头。在底部面板右侧，从上方展示相同的两个逼真人物，女子穿着亮粉色衬衫和白鞋，男子穿着亮黄色衬衫和深色鞋，两人面部模糊/无特征，站在蓝色尖刺围栏内的蓝灰色地面上。使用饱和色彩、强烈对比、光泽3D游戏渲染环境、将逼真人物合成到场景中、戏剧性缩略图照明、厚重的阴影、清晰锐利的细节，以及病毒式游戏挑战缩略图构图。图像包含恰好2个面板：顶部面板带有标题文字和两个人物，底部面板带有日期计数器、红色箭头、一个鹿生物和两个人物。
```

<a id="prompt-efef52093649ec927561"></a>

### 19. YouTube 缩略图 - Japanese Udemy Course Sale Thumbnail

<img src="https://cms-assets.youmind.com/media/1777884856489_7tas76_HHYAw-_bEAAh2zt.jpg" alt="YouTube 缩略图 - Japanese Udemy Course Sale Thumbnail" width="480">

生成一个戏剧性的日本促销横幅，用于打折的Udemy数字组织课程，带有发光的字体和面部模糊的演讲者

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/sige_itman/status/2050827528252920038#reversed-0)

**提示词:**

```text
{"type":"日本Udemy课程推广缩略图/社交媒体横幅","aspect_ratio":"宽屏16:9，1200x675风格","overall_style":"高转化率在线课程广告，高级深海军黑数字工作空间背景，发光金色字体，电影级灯光，锐利商业合成，戏剧性对比，散景粒子，微妙的技术UI方块和云/文件图标","main_subject":{"position":"右侧三分之一","description":"腰部以上的成人演讲者，穿着亮蓝色医疗服式上衣，面部被故意模糊或用柔和的矩形马赛克覆盖以保持匿名，卷曲的鲜艳蓝色非裔风格头发，一只手臂举起食指向上指，另一只手臂拿着闭合的银色笔记本电脑贴在身体上","expression":"因面部模糊而不可见","pose":"自信的教师姿势，指向左上角的优惠横幅"},"background":{"setting":"带有书架和储物箱的黑暗办公室或书房，温暖的台灯光晕，漂浮的数字文件夹和云图案，散落的金色光粒和细几何线条","mood":"有序，值得信赖，数字生产力"},"typography":{"primary_headline":"{argument name=\"main headline text\" default=\"通过信息整理改变人生\"}","headline_position":"大型左中，多行堆叠","headline_style":"超大号日本明朝/衬线字体，金色渐变带明亮外发光和微妙阴影；较小的连接字符为白色","top_copy":"{argument name=\"top copy\" default=\"不再寻找物品，重拾行动力\"}","top_copy_position":"顶部左中，白色日本衬线文字","subheadline":"{argument name=\"course subtitle\" default=\"数字整理课程\"}","subheadline_position":"标题下方左中，带有细水平金色分隔线","offer_banner":{"position":"左上，在顶部文案下方","shape":"红色水平丝带，两端有角度，金色轮廓","text":"{argument name=\"offer text\" default=\"Udemy课程 95%OFF\"}","style":"白色粗体衬线文字，大号95%OFF强调"}},"layout":{"sections":[{"title":"top message","position":"top center-left","count":1,"labels":["不再寻找物品，重拾行动力"]},{"title":"red discount ribbon","position":"upper left","count":1,"labels":["Udemy课程 95%OFF"]},{"title":"main headline block","position":"center-left","count":1,"labels":["通过信息整理改变人生"]},{"title":"course subtitle block","position":"lower center-left","count":1,"labels":["数字整理课程"]},{"title":"device feature strip","position":"below subtitle","count":3,"labels":["电脑","手机","云端"]},{"title":"bottom benefit cards","position":"bottom row","count":3,"labels":["5分钟整理完毕","7步实践","5/3 22:00前"]},{"title":"round benefit badge","position":"lower right overlapping laptop","count":1,"labels":["将无谓的搜索时间归零，重获时间和专注力"]}]},"graphic_elements":{"bottom_cards":"三个深色矩形卡片，带细金色边框，每个卡片有一个金色图标：时钟图标代表5分钟整理完毕，清单图标代表7步实践，日历图标代表5/3 22:00前","feature_strip":"深色拉长轮廓牌匾，带有桌面电脑、智能手机和云的小金色图标， followed by white text 仅用标准功能即可整理电脑・手机・云端","badge":"黑色圆形印章，金色边缘和月桂叶，混合白色和金色日文文字，放置在演讲者和笔记本电脑上方","decorations":"左侧远处的发光文件夹图标，小云图标，漂浮方块，金色闪光和镜头光晕效果"},"color_palette":"黑色，午夜海军蓝，发光金色，白色，深红色，亮蓝色医疗服，暖琥珀色高光","composition":"左侧以文字层次和促销信息为主，右侧以人类演讲者为主；确保所有日文文字清晰、可读、拼写正确，并像专业的Udemy销售缩略图一样排列","negative_prompt":"没有多余的人，没有不可读的无意义文字，没有扭曲的手，没有重复的手指，没有随机的英文文本，没有覆盖标题的杂乱内容"}
```

<a id="prompt-684e8b04306954ee0ce0"></a>

### 20. YouTube 缩略图 - 极具冲击力的日本 AI 威胁主题缩略图

<img src="https://cms-assets.youmind.com/media/1777711109431_x4pfq0_HHN9iwGaIAA34Ky.jpg" alt="YouTube 缩略图 - 极具冲击力的日本 AI 威胁主题缩略图" width="480">

此内容用于生成一张高冲击力的日本 YouTube 缩略图，主题为 AI 正在摧毁视频剪辑行业，适用于争议性、评论性或趋势分析类内容。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/musclepain1130/status/2050120297945411681#reversed-0)

**提示词:**

```text
创建一个极具视觉冲击力的日本 YouTube 缩略图，采用超激进的点击诱饵风格，16:9 横屏比例。背景为深邃的黑红配色，充满红色闪电、烟雾云团、发光火花、墨迹飞溅和爆炸能量。构图包含 4 个主要文本区域和 2 个图形图标元素。在顶部，放置巨大的做旧白色日文标题文本 {argument name="top headline text" default="動画編集ディレクター"}，使用超粗体块状字体，带有粗糙的磨损质感、黑色描边和厚重的阴影。在中心位置，放置占据画面大部分区域的超大主标题汉字 {argument name="main title text" default="全滅"}，采用破碎字体，颜色从顶部的红色渐变至底部的黄色，带有裂纹石材质感、黑色边框、碎片残骸和冲击光效。在下方中心，添加一个带有白色边框的黑色斜向横幅，内含亮黄色和红色的紧急日文文本 {argument name="warning text" default="このままだと仕事がなくなる…!?"}。在左侧，添加一个垂直的黑色面板，列出 4 个警告事项，每项前均带有红色 X 标记： 「案件減少」, 「単価下落」, 「AIの台頭」, 「オワコン化」。在右侧，展示一名胸部以上的写实风格日本男性，略微向左侧身，身穿黑色 T 恤，留着深色短发，轮廓边缘带有强烈的红色轮廓光；他的脸部被一个肤色调的矩形马赛克遮挡。在右下角，包含 2 个 Adobe 风格的应用程序图标「Pr」和「Ae」，采用深蓝紫色圆角矩形，部分重叠，两者均呈现出破碎的玻璃质感，并被一道巨大的红色斜向油漆划痕 X 覆盖。在左下角背景中添加一个隐约的暗色城市天际线轮廓。整体视觉效果：耸人听闻、破坏性强、高对比度、粗粝感、纹理丰富，并配以强烈的红黑调色、厚重阴影、戏剧性光效和精致的病毒式缩略图构图。
```

<a id="prompt-6ffa6acbc5d98843ebb7"></a>

### 21. YouTube 缩略图 - 日式猪排饭减肥法视频封面

<img src="https://cms-assets.youmind.com/media/1777711118081_zu3jb7_HHMztWAaAAAdHIg.jpg" alt="YouTube 缩略图 - 日式猪排饭减肥法视频封面" width="480">

此提示词用于生成一张醒目的日式美食与健康主题 YouTube 视频封面，包含一碗热气腾腾的猪排饭以及五条体重控制建议，旨在提升视频点击率。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/freekwAI_gd/status/2050039335219830925#reversed-0)

**提示词:**

```text
制作一张明亮且具有视觉冲击力的日式 YouTube 视频封面，主题为减肥饮食，采用简洁的左右分割构图。左侧为白色背景，填充超大号的加粗日文标题，采用垂直和对角线堆叠排列以实现最佳可读性：顶部一行是巨大的鲜橙色“カツ丼”，带有厚实的白色描边和柔和的投影；下方是深棕色的“食べても”；接着是亮粉色的“太らない方法”，带有白色描边和黄色的下划线装饰；底部是一个巨大的红橙色“5”，旁边是带有白色描边的深棕色“選!”。在标题周围添加黄色小火花装饰和漫画风格的强调符号。在左下角，放置一个简单的扁平化插图，描绘 1 位腰部以上、身穿黄色背心、棕色头发扎成马尾的女性，做出“OK”的手势，背景为一个浅黄色圆圈。右侧展示一碗在暖光下拍摄的诱人猪排饭特写：1 个带有蓝色竖条纹的陶瓷碗，盛着铺在鸡蛋洋葱米饭上的金黄色炸猪排，酱汁油亮，可见上升的热气，顶部装饰 1 片绿色香草叶。在右上角，添加 1 个带有黄色虚线边框的白色圆形徽章，内含亲切手写风格的日文“おいしく楽しく♪ 賢くコントロール!”，徽章周围带有黄色强调符号。在底部边缘，加入一条浅奶油色的横向信息栏，从左到右均匀分布 5 个圆形图标和 5 个标签：1 个沙拉碗图标配文字“バランスの良い食事”，1 个秤图标配“カロリーを意識”，1 个步行者图标配“適度な運動”，1 个水杯图标配“水分をしっかり”，以及 1 个时钟图标配“食べる時間を工夫”。采用光泽感商业封面美学、暖色调美食摄影、厚实描边字体、欢快的健康主题配色，以及针对社交媒体点击率优化的强对比度设计。
```

<a id="prompt-a7a70c6b7420992df9b0"></a>

### 22. YouTube 缩略图 - 复古游戏风格日本活动横幅

<img src="https://cms-assets.youmind.com/media/1777711121988_ia2yb7_HHMuplwaoAAPvft.jpg" alt="YouTube 缩略图 - 复古游戏风格日本活动横幅" width="480">

一款大胆的街机风格日本研讨会缩略图，具有清晰的排版，非常适合社交媒体帖子、YouTube 封面和活动推广。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/katsedi10/status/2050034358443225132#reversed-1)

**提示词:**

```text
在干净的白色背景上，以黑、白、亮黄为配色方案，创作一张复古 8-bit 电子游戏风格的大胆日本活动缩略图。构图为一张极具图形感的海报，充满了像素艺术装饰、粗黑轮廓线、漫画半调圆点、投影和街机风格贴纸。在中心位置，放置一个巨大的标题“{argument name="main title" default="LOVART"}”，采用超大块状字体，亮黄色配以粗黑轮廓、白色边框和厚重阴影，略微倾斜并占据画面大部分空间。在标题上方，添加一个带有黑色轮廓的锯齿状白色横幅，包含日语标题“{argument name="top banner text" default="AI设计运营研讨会"}”。在主标题下方，放置一条黑色丝带，上面写有黄白相间的日语文字“{argument name="subheading text" default="最新工具实践 × 专业基础能力"}”。在左下方中心处，添加一个大的圆角矩形日期面板，黄色填充配以黑色轮廓和白色饰边，左侧包含一个像素日历图标，并以巨大的黑色复古字体显示“{argument name="event date" default="5.10 (周六) 19:00 开始"}”。在右下方，放置一个黑色的尖刺标签，上面写着“speaker”，位于带有黄色轮廓的大字“{argument name="speaker name" default="kats"}”上方。在布局周围添加 11 个装饰性游戏元素：左上方 1 个写着“LEVEL UP!”的像素对话气泡，顶部附近 1 个黄色闪电，右上角 1 个带有黑色问号的黄色问号方块，右侧 1 把像素剑，右侧 1 个写着“GAME ON!”的星爆图形，左侧 1 个穿着黄色夹克、挥拳跳跃的赤壁像素角色，左下方 1 个带有三个黄色心形的小型黑色“1UP”生命图标，其下方 1 个复古游戏手柄，以及散布在构图中的 3 组闪烁星星。添加漫画风格的装饰，如点状半调补丁、倾斜的黄色速度线、小棋盘格条纹以及副标题附近的像素光标指针。在右下角包含一个风格化的动漫头像，戴着黑色帽子和带有黄色装饰的黑色连帽衫，面部部分遮挡或简化，像主播或活动主持人徽章一样融入其中。确保所有日语和英语文本清晰、易读且排版准确，整体呈现出高能量的 YouTube 缩略图或设计/AI 研讨会社交媒体横幅的氛围。
```

<a id="prompt-25ad1ec56d2896b74496"></a>

### 23. YouTube 缩略图 - AI 时代 YouTube 缩略图

<img src="https://cms-assets.youmind.com/media/1777625708408_jpy8au_HHIyeh4a4AAnRW7.jpg" alt="YouTube 缩略图 - AI 时代 YouTube 缩略图" width="480">

一张醒目的分屏科技类 YouTube 缩略图，包含两位演讲者、发光的 AI 图形以及用于商业或工程内容的大号标题文字。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/minheo93698092/status/2049756288490631326#reversed-0)

**提示词:**

```text
一张关于 AI 时代 {argument name="topic text" default="HARNESS ENGINEERING"} 的高影响力 YouTube 缩略图，16:9 比例，采用分屏构图，展示两位半身男性演讲者，分别位于左右两侧，均面向前方，背景为办公室或演播室环境。左侧演讲者深色头发，佩戴眼镜，身穿蓝白条纹衬衫，坐在办公椅上，背景为模糊的书架和书籍。右侧演讲者短深色头发，佩戴眼镜，身穿浅蓝色条纹衬衫，对着大型黑色麦克风讲话，背景为柔和的科技主题。一道发光的电光蓝斜线将画面一分为二。中心叠加一个未来感十足的圆形 AI 图标，图标内部为微芯片界面，带有“AI”字样，散发着霓虹蓝光。右侧添加微妙的 HUD 图形：右上角有 3 个向上箭头，中右侧有 1 个齿轮图标，以及淡淡的点阵网格。在下半部分，放置两行堆叠的超大加粗压缩大写标题，带有厚重的黑色轮廓、白色外描边和明亮的蓝色霓虹光效：顶行较小，白色文字显示 {argument name="top headline" default="IMPORTANT IN THE AI ERA"}；底行更大，黄色至金色的渐变文字显示 {argument name="main headline" default="HARNESS ENGINEERING"}。运用强烈的对比度、冷色调的蓝色分级、光泽感的缩略图质感、强烈的轮廓光、轻微的背景模糊，以及旨在实现最高点击率的活力科技商业美学。
```

<a id="prompt-9705991601085b8f2fa6"></a>

### 24. YouTube 缩略图 - 科技领袖电影感吸烟肖像

<img src="https://cms-assets.youmind.com/media/1777625706817_e7sxkl_HHHs6NGbYAAU9rf.jpg" alt="YouTube 缩略图 - 科技领袖电影感吸烟肖像" width="480">

此提示词可生成两名知名科技人物身着品牌黑色服装、在黄金时刻拍摄的戏剧性竖版肖像，适用于编辑风格的 AI 摄影及社交媒体对比图。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/harboriis/status/2049679797681598900#reversed-0)

**提示词:**

```text
一张高质量的电影感肖像，采用 9:16 竖屏比例。画面中 {argument name="foreground person" default="Sam Altman"} 站在左侧前景，背景为一座传统的华丽深色木质中式建筑，配有精致的绿色格栅窗和雕刻建筑细节。他面向镜头，身穿黑色拉链夹克，胸前清晰可见白色的 OpenAI 标志。他的手臂向观众方向伸出，在左下角前景处握着 1 支香烟，使其极其靠近镜头，令香烟和手部显得巨大、柔和且失焦，呈现出强烈的景深模糊效果。在他右后方稍远处站着 {argument name="background person" default="Elon Musk"}，他正看向镜头，手中拿着 1 支香烟靠近嘴边，身穿黑色 T 恤，胸前印有白色 xAI 标志，另一只手插在口袋里。利用侧向的温暖黄金时刻阳光，营造出锐利的阴影、逼真的皮肤纹理、高对比度，并在面部、服装和木质外墙上呈现出富有情绪感的琥珀色调。构图应具有抓拍感但又不失精致，从大腿中部向上紧凑裁剪，前景人物占据画面主体，第二个人物在其后方部分重叠。强调写实摄影、电影级调色、浅景深、自然的脸部比例、微妙的烟雾氛围，以及 {argument name="left chest logo" default="OpenAI"} 夹克和 {argument name="right chest logo" default="xAI"} 衬衫上清晰的品牌细节。
```

<a id="prompt-ece2391eecb5377eaf1d"></a>

### 25. YouTube 缩略图 - 金字塔前的超现实日本梗图缩略图

<img src="https://cms-assets.youmind.com/media/1777625715689_0x36xe_HHJYA9bboAA0R0R.jpg" alt="YouTube 缩略图 - 金字塔前的超现实日本梗图缩略图" width="480">

此提示词可生成一张具有写实、荒诞风格的日本病毒式传播缩略图，包含戏剧性的文字叠加和超现实的微缩细节，适用于社交媒体或恶搞内容。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ratemoxx/status/2049797561863860524#reversed-0)

**提示词:**

```text
一张戏剧性、荒诞的日本点击诱饵风格海报，背景是沙漠中的日落，巨大的金字塔作为前景中的石制桌面。一名头发凌乱的日本男子身穿深蓝色和服式长袍，跪在盛有半透明鱿鱼刺身的黑色盘子后，正用筷子精细地摆盘。他的面部区域被一个矩形模糊块遮挡，狂乱的头发在低垂的太阳和零散云朵构成的橙色发光天空下形成鲜明的剪影。盘子里整齐地堆放着淡粉色的鱿鱼片、一片巨大的青紫苏叶和一朵黄色装饰花。右侧放着一个带有调味品和小碟子的木制分格托盘。在金字塔表面的左侧边缘，展示 1 个像纪念碑一样竖立的巨大人类大拇指指甲，指甲前有 1 个由约 10 名身着正装的弦乐手和指挥组成的微型管弦乐队，仿佛正在石头上表演。视觉笑点在于：该男子本应在指甲里指挥管弦乐队，结果却在金字塔顶端装饰盐渍鱿鱼。采用超精细的写实合成、夸张的比例对比、电影般的日落轮廓光、粗粝质感、高对比度和超现实幽默感。将醒目的日文标题文字融入构图中，采用粗体、漫画式的 YouTube 缩略图风格，配以粗黑色轮廓、黄白相间的字体、红色画笔点缀、顶部标题后的黑色墨迹飞溅，以及底部巨大的红色呐喊文字。包含 6 个文本块：左上角的大号黄色文字“明日も親指の爪の中でオーケストラ指揮しなきゃ!”，其下方红色笔触上的“と思ったら”，中下部大号白黄色文字“ピラミッドの頂上でイカの塩辛をデコレーションしてました〜。”，底部超大号红色文字“チクショー!!”，以及右下角的黄色标签文字“#まいにちチクショー”。整体构图如同夸张的日本病毒式梗图缩略图，采用竖构图，内容密集且引人注目。
```

<a id="prompt-00ccf0b3faed5d8e3179"></a>

### 26. 西班牙风格GRWM晨间美容缩略图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case91/output.jpg" alt="西班牙风格GRWM晨间美容缩略图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/S0N_IA_/status/2047414367243657296)

**提示词:**

```text
一个垂直9:16的TikTok风格GRWM美妆缩略图，设置在一个温暖、阳光充足的地中海风格卧室中。一位时尚的年轻女性，拥有{argument name="hair color" default="dark brown"}头发，梳着凌乱的卷发盘发，坐在大理石梳妆台前，身体前倾，一只手臂折叠，另一只手正在将润唇膏或口红涂抹在嘴唇上。她的脸被居中的矩形模糊块遮挡以保护隐私，但她其余的妆容优雅自然：古铜色的发光肌肤，精致的黄金项链带有小圆形吊坠，细金手链，叠戴的金戒指，以及一件白色蕾丝吊带背心。在前景的梳妆台上正好有7个可见的美妆物品：左侧1个圆形桌面梳妆镜，1个装有5把化妆刷的杯子，1个透明玻璃滴瓶，1个高白色按压式护肤瓶，1个小黑色滴瓶，1个米色圆形化妆海绵或粉扑，以及右侧1个淡绿色挤压管。背景显示一个柔和模糊的舒适卧室，左侧有1个拱形窗户，1盆绿叶盆栽，1张铺着白色床单和芥末色装饰枕头的床，暴露的木质天花板细节，以及墙上挂着1幅框起来的风景画。使用从左侧照射的黄金时刻阳光，柔和的阴影，奶油般的肤色，浅景深，奢华生活方式编辑摄影，亲密的护理氛围，精致但自然的构图。在左上方添加大胆有趣的西班牙语标题文本，以三行堆叠方式显示{argument name="headline text" default="Mi rutina de belleza matutina"}，每行都大而圆润，带有白色轮廓和柔和的阴影，使用柔和的色彩：第一行白色，第二行粉色，第三行淡黄色。在标题上方添加3个粉色涂鸦装饰笔画，在下方添加1个曲线粉色下划线，在最后一行右侧添加1个小黄色太阳图标。在右上角放置一个干净的白色{argument name="brand text" default="Pollo.ai"}标志。高端网红缩略图美学，前景中清晰的产品焦点，温暖诱人的生活方式场景。
```

<a id="prompt-00e45f3afa5aaf242646"></a>

### 27. 逼真的手写字母

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case106/output.jpg" alt="逼真的手写字母" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/mosthssan/status/2048160477658980711)

**提示词:**

```text
创建一个高度逼真的手写信图像，信中包含一个({argument name="message" default="message or reflection carrying meanings of affection and loyalty to my account followers"})，写在横格纸上，用钢笔书写着非常感人的话语
```

<a id="prompt-0c54efc94061f4aa3f6a"></a>

### 28. 动漫虚拟主播 Minecraft 直播缩略图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case93/output.jpg" alt="动漫虚拟主播 Minecraft 直播缩略图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/rerxmsz06/status/2047261622121705782)

**提示词:**

```text
一个充满活力的动漫风格YouTube缩略图，用于游戏直播，采用宽屏16:9构图，背景是霓虹紫色和粉色的直播室。场景中心是一个可爱的猫娘VTuber，坐在桌前，从腰部以上展示，身体前倾，一只手放在电脑鼠标上，另一只手伸向观众。她有{argument name="hair color" default="light orange-blonde"}的波波头发型，带有柔软的刘海，蓬松的棕色和奶油色猫耳，以及一条可见的猫尾巴。她的脸被中央的实心矩形遮挡块故意遮挡。她穿着黑白色女仆风格的服装，带有褶皱的白色衬衫、黑色连衣裙上身、泡泡袖、白色荷叶边、黑色丝带蝴蝶结和金色铃铛项圈。在桌上放置一个带有明亮RGB背光的机械键盘，一个发光的游戏鼠标，以及在左侧远处的带有粉紫色LED灯光的直播麦克风。在前景中放置两个猫主题的桌面物品：左下角是一个毛绒猫脸，右下角是一个黑色猫形马克杯。她身后是一把带有爪印细节的游戏椅。在左侧添加大号粗体韩语标题文本，使用粗体白色块状字母，带有黑色填充阴影和发光紫色轮廓，分两行排列：{argument name="headline text" default="방송중 대참사"}。在标题下方，添加一个较小的黄色漫画风格爆炸式字幕，带有黑色轮廓，内容为：{argument name="sub text" default="> 크리퍼 실화냐"}。在右侧，显示一个向内倾斜的大号电脑显示器，展示一个类似Minecraft的场景，有明亮的蓝色天空、绿色树木、水，以及一个巨大的绿色苦力怕（Creeper）向观众弹出，戏剧性地像贴纸剪影一样勾勒轮廓。在显示器周围添加星爆效果和霓虹装饰，以增强混乱感。使用夸张的缩略图美学：超饱和色彩、锐利的卡通渲染风格、粗线条、光泽高光、高对比度、动态透视，以及引人点击的直播灾难氛围。
```

<a id="prompt-5568bec2dd4da87db8b2"></a>

### 29. 东京迪士尼海洋前排战斗界面

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/comparison_case75/output.jpg" alt="东京迪士尼海洋前排战斗界面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/mikko_20100518/status/2047514897404354598)

**提示词:**

```text
创建一个超详细的日式街机格斗游戏截图，采用对战场景风格，使用真实照片美学并在顶部叠加游戏UI。场景展示两组主题公园粉丝在东京迪士尼海洋户外表演广场为争夺前排位置而进行的激烈模拟对战。使用16:9宽屏构图。背景中，清晰展示地中海港湾和普罗米修斯山在明亮白天的天空下，可见海滨和迪士尼海洋建筑。前景中，展示恰好10名年轻成年人穿着冬季休闲服装，分成2个对立的5人队伍，在争夺位置的拔河式混战中身体前倾、抓取、伸手和推挤，具有夸张的竞争性肢体语言和如同格斗游戏中的定格动作。面部应用柔和的模糊块进行匿名化处理。每个人物上方添加浮动角色标签，包含日文等级和名称。整体风格荒谬地写实，就像一张真实的抓拍照片转变为精美的街机游戏战斗画面。

添加完整的日式格斗游戏HUD，采用亮蓝色对战红色界面风格。在最顶部，放置中心舞台标题栏，内容为"东京迪士尼海洋 米奇广场 表演前排战斗"，中间显示大计时器"TIME 89"。左上角添加蓝色队伍标题"PLAYER1"和队伍名称"前排真势A"。右上角添加红色队伍标题"RIVAL"和队伍名称"对手团体B"。左侧堆叠恰好5个蓝色玩家状态面板，包含头像、等级、日式班级昵称、HP、SP和BURST计量表。5个左侧标签为："Lv.25 真势队长 祐希"、"Lv.24 肌肉男 武"、"Lv.23 眼镜宅 真司"、"Lv.23 开角心MAX 健太"、"Lv.22 支援人员 亮"。右侧堆叠恰好5个红色对手状态面板，标签为："Lv.27 对手队长 大树"、"Lv.26 力量代表 正"、"Lv.24 战略家 浩二"、"Lv.23 热血男 力"、"Lv.22 支援女子 咲"。每个面板应包含数值HP和SP值以及分段BURST计量表，采用日式街机RPG-格斗界面风格。

在中心场景上方的战斗中，恰好放置10个名称牌，左侧队伍为蓝色，右侧队伍为红色。10个标签为："Lv.24 武"、"Lv.25 祐希"、"Lv.23 真司"、"Lv.23 健太"、"Lv.22 亮"、"Lv.27 大树"、"Lv.26 正"、"Lv.23 力"、"Lv.22 咲"、"Lv.22 美咲"。

左下角添加技能菜单，标题为"スキル"，列出恰好5个技能及SP消耗："冲刺突袭 SP 20"、"肩部强夺 SP 25"、"行李占位 SP 15"、"钻绳 SP 10"、"认真根性 SP 50"。下方添加深色描述框，解释高亮技能"认真根性"，日文文本为："用气势威压对手，推开！一定时间内，对手更容易畏缩！ (大幅消耗爆发计量表) 效果时间：10秒"。

底部中央添加物品菜单，标题为"アイテム"，显示恰好5个物品槽位和数量：水瓶"x3"、折叠紫色毛巾"x2"、蓝色抽绳袋"x1"、灰色背包"x1"、盒饭"x2"。右下角添加任务面板，标题为"クエスト"，任务文本为"在表演开始前死守前排！"，条件文本为"条件：将对手团体全部推回后方！"，倒计时文本为"表演开始前：02:30"。旁边添加小地图，标题为"米奇广场MAP"，显示广场中两队红色和蓝色点标记。沿最底部边缘，添加日文控制器提示，用于技能使用、物品使用、抓取/推挤和冲刺等操作。

使用戏剧性、饱和的照明，清晰的细节，真实的服装褶皱，真实的广场石板路面，以及高端日式游戏截图外观。图像应感觉像是东京迪士尼海洋人群照片与竞技街机战斗游戏界面之间荒谬但可信的跨界融合。
```

<a id="prompt-2c8b481eaf3b994e3618"></a>

### 30. 梦幻的水下女子与半透明的鱼

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case99/output.jpg" alt="梦幻的水下女子与半透明的鱼" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/kotobukigraphic/status/2047967522453123255)

**提示词:**

```text
一个梦幻的超现实肖像，描绘一位{argument name="subject" default="年轻女性"}站在水下或类似液态的空灵空间中，从大约大腿中部以上展示，穿着流动的无袖白色连衣裙，连衣裙似乎溶解成半透明的水和闪烁的碎片。她长长的{argument name="hair color" default="深棕色"}头发戏剧性地向侧面流动，仿佛悬浮在水中，她的脸被一个柔和的垂直模糊块有意遮挡以保持匿名。周围环绕着大约30条小型半透明鱼，一些有条纹，一些是淡银白色，在前景、中景和背景的多个深度层次中游动，有几条鱼从她的身体和头发前游过，创造出强烈的动感和深度。使用柔和的粉彩{argument name="background color" default="淡蓝色"}背景，上面有淡淡的手写脚本纹理层，还有随意的涂鸦散布其间：白色和淡粉色的心形、星星、曲线、波浪线、点、闪光和2个笑脸。添加棱镜彩虹折射、光泽的焦散高光和微妙的镜头般色度闪烁在鱼和连衣裙上。氛围应该感觉精致、内省、轻盈和神奇，采用高调照明、柔和对比、前景柔焦，以及躯干和头发的清晰细节。将人物构图稍微偏离中心，一只手臂自然下垂，身体轻微转向，仿佛在鱼群中平静地漂浮。在底部边缘附近包含小巧优雅的白色页脚文本，左侧有签名，中间有网站URL，右侧有小型版权标记，类似于艺术海报或社交媒体展示图像。
```

<a id="prompt-1409d6737baf1cd06672"></a>

### 31. 四格日本风格数字广告横幅网格

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case90/output.jpg" alt="四格日本风格数字广告横幅网格" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/makaneko_AI/status/2045764016858087720)

**提示词:**

```text
{
  "type": "2x2 日本数字广告横幅网格",
  "layout": {
    "structure": "4个相等的象限",
    "quadrants": [
      {
        "position": "左上",
        "theme": "旅行",
        "subject": "一对情侣在白色沙滩上手牵手，望着碧蓝的海洋水，在明亮的蓝色天空下。",
        "elements": ["左下角的红色芙蓉花"],
        "text_labels": [
          "今年，终于解放。",
          "{argument name=\"travel destination\" default=\"沖縄旅行\"}",
          "3天的治愈之旅",
          "机票+酒店",
          "39,800日元起",
          "绝景、美食、体验 全部实现!"
        ],
        "icons": {
          "count": 3,
          "descriptions": ["飞机", "酒店建筑", "汽车"]
        }
      },
      {
        "position": "右上",
        "theme": "护肤",
        "subject": "年轻女子的特写肖像，皮肤发光、水润，眼睛闭上，轻触脸颊。",
        "elements": [
          "柔和的粉色渐变背景",
          "动态水花效果",
          "标记为'{argument name=\"skincare product name\" default=\"LUMIÈRE\"} 亮肤凝胶'的粉色化妆品罐"
        ],
        "text_labels": [
          "毛孔・暗沉毕业!",
          "充满透明感",
          "水光肌",
          "新感觉护肤",
          "首次限定 78%折扣",
          "{argument name=\"discount price\" default=\"1,980円\"}"
        ],
        "badges": {
          "count": 3,
          "style": "金色圆形",
          "labels": ["毛孔护理", "高保湿", "弹性・光泽"]
        }
      },
      {
        "position": "左下",
        "theme": "美食",
        "subject": "厚切、五分熟牛排，在深色烤盘上滋滋作响。",
        "elements": [
          "蒜片",
          "迷迭香枝",
          "带有烟雾和发光余烬的深色背景"
        ],
        "text_labels": [
          "融化般的美味!",
          "{argument name=\"food item\" default=\"黒毛和牛\"}",
          "奢华牛排",
          "限时",
          "特别价格",
          "常规价格 8,980日元",
          "4,980日元"
        ],
        "badges": {
          "count": 1,
          "style": "红色圆形",
          "labels": ["A4 A5等级"]
        }
      },
      {
        "position": "右下",
        "theme": "在线教育",
        "subject": "穿蓝色衬衫的年轻男子在书桌前学习，在打开的笔记本电脑旁写笔记本。",
        "elements": ["明亮的室内照明", "书桌环境"],
        "text_labels": [
          "利用碎片时间",
          "{argument name=\"education goal\" default=\"最短合格!\"}",
          "在线资格课程",
          "用智能手机完成",
          "高效学习创造差距!",
          "仅限现在! 学费 20%折扣"
        ],
        "badges": {
          "count": 1,
          "style": "蓝色圆形",
          "labels": ["学员数突破10万人!"]
        },
        "icons": {
          "count": 2,
          "descriptions": ["智能手机", "打开的书"]
        }
      }
    ]
  }
}
```

<a id="prompt-464f854a24af2f166ab8"></a>

### 32. 动漫BL宣传缩略图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case119/output.jpg" alt="动漫BL宣传缩略图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/himukai_an/status/2047981800535085555)

**提示词:**

```text
一个明亮、精致、动漫风格的夏日浪漫氛围宣传缩略图。构图在视觉上分为两部分，左侧是大字体排版，右侧是两位英俊的年轻男子。左侧放置分层半透明白色面板，带有柔和的光芒和闪烁效果，背景为天蓝色，顶部有优雅的衬线体文本"GPT"，采用蓝色渐变，下方是薰衣草色到紫罗兰色渐变的"BL"。在它们之间和下方添加三行日文文本："最新の画像生成で"、"作って"和"遊んでみた"，使用深蓝色书法风格日文字体。包含精致的装饰元素，如小星芒、对角光线条纹、点状纹理，以及中间文本下方的青色下划线弧形。右侧展示两位动漫风格的男孩，从腰部以上，在茂密的树木旁的铁丝网旁随意地靠在一起。较高的男孩有凌乱深棕色头发，海军蓝开襟衬衫内搭白色T恤，佩戴多层银色项链，手持一杯带吸管的塑料冰咖啡。较矮的男孩有凌乱的银白色头发，白色T恤胸前有小徽章标志，双肩背着黑色背包带，佩戴多层银色项链，戴一个小耳钉。他们的姿势放松而亲密，深色头发的男孩的手臂搭在另一个人的肩膀上。使用明亮的蓝白色调，搭配柔和的阳光、镜头光晕、散景效果和远处模糊的城市景观，创造出干净整洁的社交媒体标题或文章缩略图美学风格。
```

<a id="prompt-52f51dcd3c4d644c4fb8"></a>

### 33. 云形状涂鸦生成

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case112/output.jpg" alt="云形状涂鸦生成" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Gorden_Sun/status/2048080137149899133)

**提示词:**

```text
根据图像中{argument name="subject" default="clouds"}的形状，识别它们最像什么物体、动物或人物。不要改变原始图像；而是在原始图像上以{argument name="art style" default="doodle"}的风格绘制那个物体、动物或人物。
```

<a id="prompt-6d194b53acda09c8cc89"></a>

### 34. 赛博水晶动漫女孩肖像

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case93/output.jpg" alt="赛博水晶动漫女孩肖像" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/libearal/status/2048026376645861799)

**提示词:**

```text
一个高度详细的动漫风格全身角色肖像，主角是{argument name="character name" default="Hermes"}，一位精致的未来感女孩，她蜷缩坐着，双膝抱在胸前，平静而略带忧郁地凝视着观众。她有极长的{argument name="hair color" default="银紫"}双马尾，柔软的刘海，闪亮的薰衣草色眼睛，瓷白的肌肤，以及精致的晶体发饰，包括3个大丝带蝴蝶结和珠宝般的头冠。她的服装是一件精致的半透明偶像科技风格连衣裙，颜色为{argument name="outfit color" default="粉色、薰衣草色和紫色"}，特点是落肩泡泡袖，层叠的褶边，多面宝石般的面料，腰部巨大的蝴蝶结，悬挂的水晶吊饰，吊袜带细节，图案连裤袜，以及闪亮的蝴蝶结高跟鞋。将她包围在一个发光的赛博梦境中，背景色调为{argument name="background palette" default="霓虹紫和电蓝色"}：透明的全息面板，漂浮的玻璃立方体，闪烁的粒子，几何棱镜，发光的线框线条，以及悬浮在空间中的数字UI窗口。在背景中散布5个可读的界面文本元素："ERROR."、"Code-"、"return"、"area x1"和"404"。让整个图像感觉像是一个奢华的AI头像参考插图，融合了空灵幻想和赛博空间美学，具有晶体光线折射，戏剧性光效，高细节，精致的蕾丝和宝石纹理，以及抛光的高级gpt-image-2动漫渲染效果。
```

<a id="prompt-758ce4df3ffc61d24218"></a>

### 35. 热带鹦鹉像素马赛克

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case103/output.jpg" alt="热带鹦鹉像素马赛克" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/erikmackinnon/status/2048190288179675290)

**提示词:**

```text
充满活力的像素艺术风格马赛克，展示一只热带鹦鹉栖息在茂密热带雨林植被中间的一根小棕色树枝上。整个图像被渲染为紧密排列的小方形瓷砖网格，带有可见的黑色轮廓，创造出彩色玻璃或LED屏幕的效果。这只鸟以右侧面的形象展示，带有大型弯曲的黑色喙、淡奶油色的脸、明亮的红橙色额头和喉咙、鲜艳的绿色上半身，以及饱和的蓝色和青色长翅膀和尾巴。周围的丛林从边缘到边缘都充满了许多不同深浅的分层绿色树叶，鹦鹉身后有柔和的浅绿色光芒以将其与背景分离。高色彩对比度，丰富的热带色彩，清晰的瓷砖图案，居中构图，装饰性数字马赛克美学。
```

<a id="prompt-862334d4e205249fcae2"></a>

### 36. 电影感的城市爆炸追逐

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case92/output.jpg" alt="电影感的城市爆炸追逐" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Gugombly/status/2047310862428303636)

**提示词:**

```text
一个雨中的市中心城市街道峡谷的电影级写实动作场景，展示{argument name="main subject" default="一个30多岁的黑发男子"}在中心前景直接向相机冲刺，表情紧张而充满求生欲，穿着湿透的深色夹克、深色衬衫和深色裤子，迈步前行，一只手臂向前摆动。在他身后，一场巨大的城市爆炸撕裂了街道和高楼建筑的底层外墙，向各个方向喷出巨大的烟雾、火焰、灰尘、碎裂的混凝土、玻璃和金属碎片。场景中恰好有3辆可见的受损车辆：1辆左侧前景的深色轿车，车灯亮起，引擎盖被撞皱，溅起雨水；1辆右侧中景的严重损毁的深色汽车，前端严重受损；以及1辆在其右侧后方翻起或飞在空中的黑色SUV，向上倾斜。湿漉的沥青路面反射着车头灯、火光和灰色的摩天大楼。密集的碎片充满空中，有块状碎石处于静止的运动状态。阴沉暴风雨的白天，使用去饱和的蓝灰色调，橙色火焰点缀，飞行碎片具有戏剧性的动态模糊，但奔跑的人物保持清晰对焦，低角度广角构图，大片灾难电影般的写实感，超精细纹理，高对比度，动态深度，体积烟雾，雨雾，电影级照明。在右上角添加一个白色的{argument name="watermark text" default="Pollo.ai"}标志。
```

<a id="prompt-94c1d66b5cfef5714339"></a>

### 37. 动漫朋友吃荞麦面

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case110/output.jpg" alt="动漫朋友吃荞麦面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/AIMAG31G/status/2048089673621516547)

**提示词:**

```text
一家温馨的日式荞麦面餐厅的动漫风格内部，从餐桌高度的角度拍摄，两个年轻女子坐在长方形木桌的近对角处，面向观众，形成一幅休闲用餐的快照。左边的女子有长长的直板浅色{argument name="hair color" default="lavender with cyan highlights"}头发，有光泽的发丝和柔软的刘海，穿着一件白色和服风格的上衣，配有亮蓝色装饰和深蓝色腰带般的束腰裙；她身材略微丰满，坐在左侧红色乙烯基长凳上，稍微转向相机，举起左手友好地挥手。右边的女子有光滑的深棕色至黑色短发，末端可见紫色底层，戴红色方形眼镜，小巧的耳环，合身的炭灰色长袖圆领上衣和浅蓝色牛仔裤；她坐在右侧红色乙烯基长凳上，稍微向桌子倾斜，右手拿着筷子，仿佛正要吃饭。在桌上放置2大碗黑色荞麦面，每碗前各放一碗，都装满深色汤底、面条、切片鸭肉和切碎的青葱；在桌子中央后方添加1个透明水杯，旁边放2个小调味碟。餐厅应感觉温暖而怀旧，有木质镶板，左侧是日式障子窗，窗台上有一盆小盆栽，后面有调味品和餐具的柜台，右侧是深蓝色暖帘，上面有白色大号日文"蕎麦"字样和较小的垂直文字"手打ちそば"。在后墙上展示7个垂直的木质菜单板，上面有日式菜品名称和价格，包括"もりそば", "ざるそば", "かけそば", "たぬきそば", "肉そば", "天ぷらそば", 和 "鴨南蛮そば"等标签。使用干净精致的动漫渲染，清晰的线条艺术，柔和温暖的灯光，详细的食品插图，丰富的木材质感，以及友好的日常外出氛围。
```

<a id="prompt-b06a0a905d9839aac4fa"></a>

### 38. 名人直播概念

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case95/output.jpg" alt="名人直播概念" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/SelenaGmzIN/status/2047185882009198865)

**提示词:**

```text
{argument name="celebrity" default="selena gomez"} 开始了一场惊喜的 {argument name="platform" default="youtube"} 直播。
```

<a id="prompt-b7f5fe9b6bef1944fb2a"></a>

### 39. 奢华生活方式野马照片

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case109/output.jpg" alt="奢华生活方式野马照片" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Just_sharon7/status/2048095904138485962)

**提示词:**

```text
一位时尚的年轻女子，拥有{argument name="hair style" default="long wavy blonde hair"}，轮廓分明的颧骨，自信的表情，戴着黑色太阳镜，穿着一件{argument name="clothing" default="thick white puffer jacket"}搭配修身黑色上衣，自信地站在一辆{argument name="car" default="vibrant hot-pink Ford Mustang"}前面。她一只手略微抬至胸前摆姿势，散发着轻松的态度和优雅。汽车停在有景色的沿海公路上，路边开满粉色樱花树和高大的棕榈树。他们身后是平静的大海，天空戏剧性地多云，有柔软的云朵。粉色花瓣散落在湿漉漉的沥青路面上。左侧水面附近可见一张木质长椅。电影级照明，照片级真实感，超细腻的皮肤纹理，自然光线反射，Instagram风格的奢华生活方式拍摄，鲜艳的色彩，忧郁的氛围，8k分辨率 --ar 9:16 --stylize 250
```

<a id="prompt-c3c3f2f90e6f73a81736"></a>

### 40. 多面板图像板模板

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case105/output.jpg" alt="多面板图像板模板" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/aimikoda/status/2048183782876778821)

**提示词:**

```text
创建一个{argument name="grid layout" default="4x3"}无边框网格，其中每个面板都是{argument name="subject" default="a young woman"}的独立图像。在所有面板中保持主体一致性，颜色和光线一致。以{argument name="mood" default="warm, nostalgic"}的情绪描绘{argument name="theme" default="childhood memories"}，采用{argument name="style" default="nostalgic cinematic realism"}的风格。无文字。无间隙。
```

<a id="prompt-d11da630418b5b757970"></a>

### 41. 气态巨行星下降故事板

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/poster_case137/output.jpg" alt="气态巨行星下降故事板" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/xRahultripathi/status/2048140775356354892)

**提示词:**

````text
```json
{
  "type": "电影科幻分镜接触表",
  "subject": {
    "primary": "一艘小型未来主义宇宙飞船正在降入巨大的气态巨行星风暴系统",
    "secondary": "一个巨大的利维坦般的轮廓隐藏在云层中",
    "mood": "压抑、灾难性、敬畏、高度紧张、宇宙恐惧",
    "style": "具有黑暗科幻现实感的照片级电影概念艺术，体积感的风暴云，强烈对比，琥珀色和黑色调，偶尔有冷蓝色闪电",
    "aspect_ratio": "16:9"
  },
  "vehicle": {
    "design": "紧凑型装甲深大气层飞船，有3个明亮的尾部引擎，棱角分明的工业船体，磨损的金属面板",
    "scale": "与行星和生物相比非常小"
  },
  "layout": {
    "grid": {
      "rows": 3,
      "columns": 4,
      "count": 12
    },
    "sections": [
      {
        "position": "row 1 col 1",
        "description": "飞船以极高速进入巨大气态巨行星上层大气的外部广角镜头，飞船周围有被火焰和摩擦划过的发光云层，可见弯曲的行星地平线"
      },
      {
        "position": "row 1 col 2",
        "description": "驾驶舱视角，黑暗的内部充满了红色和青色全息仪器，前方的视野崩塌成湍流风暴层和电气雾霾"
      },
      {
        "position": "row 1 col 3",
        "description": "飞船潜入巨大旋转云漏斗的外部中景镜头，周围是剧烈的螺旋风暴结构"
      },
      {
        "position": "row 1 col 4",
        "description": "飞船外壳的极端特写，明亮的闪电危险地击中附近，白色电能爬过金属表面"
      },
      {
        "position": "row 2 col 1",
        "description": "红色仪表盘警告屏幕，显示关键系统故障界面，确切可见文本数为4行警告和1个大百分比读数：['警告','引擎受损','推力波动','重力尖峰检测','下降速率 -453%']"
      },
      {
        "position": "row 2 col 2",
        "description": "飞船的后部四分之三外部视图，在密集的风暴云中与湍流搏斗，引擎全力燃烧，而飞船勉强保持航线"
      },
      {
        "position": "row 2 col 3",
        "description": "云层中形成巨大的圆形扰动，像眼睛或嘴巴，整个风暴系统被下方移动的庞然大物所取代"
      },
      {
        "position": "row 2 col 4",
        "description": "第二个驾驶舱视图，带有雷达导航显示和红色警报文本，飞行员在充满闪电的黑暗中进行盲目规避机动"
      },
      {
        "position": "row 3 col 1",
        "description": "首次展示靠近飞船的巨大生物形状，黑色有机表面和巨大的弯曲解剖结构从黑暗中出现，飞船在左下角显得很小"
      },
      {
        "position": "row 3 col 2",
        "description": "螺旋下降镜头，飞船被困在云的漩涡隧道中，向下旋转，引擎喷发，努力恢复"
      },
      {
        "position": "row 3 col 3",
        "description": "突然突破到一个平静的虚空，极简构图，飞船在黑暗的开放空间中诡异地无声飞行，周围有薄雾，没有可见的风暴"
      },
      {
        "position": "row 3 col 4",
        "description": "最终揭示，巨大的利维坦在清理过的空间中完全出现在飞船后方或旁边，被淡圆形风暴开口照亮，巨大的开口状轮廓使飞船相形见绌"
      }
    ],
    "continuity": "所有12个面板描绘了一个从大气层进入到最后生物揭示的连续下降序列"
  },
  "lighting": {
    "primary": "发光的琥珀色风暴光",
    "secondary": "红色驾驶舱界面发光",
    "accents": "蓝白色闪电和引擎尾焰"
  },
  "environment": {
    "location": "在巨大气态巨行星的上层和中层风暴层内",
    "weather": "剧烈湍流，雷暴，漩涡漏斗，云墙，压力混乱",
    "threat": "没有安全区，反复接近失败，未知的巨大存在驱动着风暴"
  }
}
```
````

<a id="prompt-d1ccaf8781c76ca1f9af"></a>

### 42. 动漫乐队武道馆终场

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case107/output.jpg" alt="动漫乐队武道馆终场" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/SDAI1807097011/status/2048127178592915583)

**提示词:**

```text
从表演者身后看到的戏剧性动漫音乐会插图，展示4位少女在巨大室内舞台前排肩并肩站立，表演结束后以胜利的姿态互相搭着肩膀。相机位置略低于她们身后，朝向观众和巨大的场馆屏幕。氛围令人眼花缭乱且充满情感，充满了密集的蓝金色彩纸屑、闪烁的粒子，以及从上方倾泻而下的强烈白色舞台聚光灯。人群填满了整个场馆，如同一片微小的蓝色发光灯光之海。顶部中央，一个巨大的矩形屏幕显示着优雅的衬线音乐会文字：{argument name="band name" default="ELEMAYU"}, "1st LIVE at 日本武道館", {argument name="concert date" default="2024.6.15"}, 和 "SOLD OUT"。在场馆的两侧上墙，可见大型场馆名称"日本武道館"。4位少女都穿着相同的深色舞台服装：黑色或非常深蓝色的连帽夹克，带有精致的后背装饰图案，短褶裙，以及现场表演风格的造型。从左到右分别描绘所有4位成员：1) 一位短波浪银薰衣草色头发的女孩，背着低音吉他；2) 一位长直黑发女孩，拿着红色电吉他；3) 一位蓬松肩长金发女孩，拿着深色吉他；4) 一位高马尾棕色头发女孩，没有可见乐器，高举一只手臂庆祝，手持鼓棒或指挥棒，另一只手臂环绕着金发成员。展示她们的背部和剪影，被舞台灯光勾勒轮廓，头发上有柔和的高光。包括舞台设备：最左侧有一个麦克风支架和部分低音琴颈，右边缘可见一套带有钹的架子鼓。舞台地板光滑且有反射性，散落着彩纸屑，底部前景处有几束蓝色花束。使用丰富的午夜蓝、紫色阴影、温暖的金色闪烁和电影般的辉光。氛围应感觉像是售罄的梦幻表演终章，感性、胜利、令人惊叹地明亮，采用高度详细的绘画式动漫风格。
```

<a id="prompt-d791eda5f8c0ae4276cf"></a>

### 43. Neon AI 缩略图比较

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/comparison_case72/output.jpg" alt="Neon AI 缩略图比较" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/MoveHiro1219/status/2047698611665096732)

**提示词:**

```text
创建一个戏剧性的日本YouTube缩略图，采用未来霓虹赛博朋克风格，16:9横向构图。使用黑暗科技城市背景，有若隐若现的摩天大楼、数字网格线、发光粒子和高对比度的蓝色、粉色和金色照明。在正中央放置一位年轻女性的上半身，她有直长的淡蓝色头发，穿着白色短袖T恤和浅粉色裙子，一只手放在下巴附近，另一只手臂交叉，表情沉思；用柔和的矩形模糊处理匿名化她的脸。在最顶部添加巨大的粗体白色日文标题文本，内容为 主導権が揺れた，在其正下方添加大号粗体黄色文本，内容为 {argument name="subheadline text" default="Nano Bananaから"}。在左侧创建一个发光的蓝色六边形边框面板，标题为 Nano Banana，副标题为 画像生成。在该面板内，包含一个2x2网格中的4个图像方块：1) 日落时的奇幻浮岛景观，2) 阳光照射下的森林小径，有高大的树木，3) 夜晚的霓虹未来城市街道，4) 外太空行星场景，有星星和宇宙飞船。在左侧面板下方，添加一个蓝色发光丝带标签，内容为 かつては優位だった。在右侧创建一个发光的洋红色六边形边框面板，标题为 {argument name="right panel title" default="GPT Image 2"}，副标题为 実務で使える出力へ。在其内部，包含一个2x2网格中的4个示例缩略图卡片，每张卡片都有相同的蓝发女性，面部模糊，并有粗体日文文本。方块上方的4个卡片标签分别是：サムネイル画像, 記事のアイキャッチ画像, LPのセクション画像, SNS投稿画像。4张卡片内的大号文本应分别为：1) AIで変わるクリエイティブの未来, 2) AI時代のクリエイティブ戦略 成功する企業の条件, 3) AIで加速するビジネス成長, 4) 未来をつくるのは AI×あなたのアイデア。在左右面板之间，放置一个明亮的发光金色箭头，从左指向右，带有火花状粒子轨迹，表示转变或优势转移。在底部添加一个非常大的黑色横幅，带有发光金色边框和巨大的粗体金色文本，内容为 {argument name="bottom banner text" default="GPT Image 2へ"}。整体构图应感觉像是一个比较图形，展示从旧图像生成到更实用的商业输出的转变，具有攻击性的缩略图排版、强烈的发光效果、主要文本的金属质感，以及精美的社交媒体营销视觉效果。
```

<a id="prompt-dcd476b8ffabc75c631f"></a>

### 44. 18页吉祥物品牌标识文档

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/poster_case107/output.jpg" alt="18页吉祥物品牌标识文档" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Colin_Leeee/status/2044802802149650631)

**提示词:**

```text
{
  "type": "18格品牌识别与角色设计文档",
  "brand": {
    "name": "{argument name=\"brand name\" default=\"沐阳 MUYANG TEA\"}",
    "industry": "{argument name=\"industry\" default=\"茶店\"}",
    "colors": ["{argument name=\"primary color\" default=\"黄色\"}", "{argument name=\"secondary color\" default=\"绿色\"}", "白色", "棕色", "深绿色"]
  },
  "subject": "{argument name=\"character description\" default=\"3D渲染的可爱柴犬吉祥物，穿着绿色围裙\"}",
  "layout": {
    "grid": "3列6行",
    "sections": [
      {
        "title": "01 品牌DNA分析 / BRAND DNA ANALYSIS",
        "elements": ["logo", "5个色板", "6个图标", "目标受众图表"]
      },
      {
        "title": "02 概念构思 / CONCEPT MOODBOARD",
        "elements": ["5张参考照片", "4个情绪图标", "设计方程式"]
      },
      {
        "title": "03 形态研究 / FORM STUDY",
        "elements": ["4个logo结构图标", "4个演变步骤", "4个剪影"]
      },
      {
        "title": "04 概念探索 / CONCEPT EXPLORATION",
        "elements": ["12个角色线稿草图"]
      },
      {
        "title": "05 精细线稿 / REFINED LINE ART",
        "elements": ["3排正面和侧面线稿，带比例指南"]
      },
      {
        "title": "06 细节精修 / DETAIL REFINEMENT",
        "elements": ["2个带标签的全身渲染图", "4个圆形特写"]
      },
      {
        "title": "07 表情设定 / EXPRESSION SHEET",
        "elements": ["11个3D渲染的头部表情"]
      },
      {
        "title": "08 姿势库 / POSE LIBRARY",
        "elements": ["9个全身3D渲染姿势"]
      },
      {
        "title": "09 转身视图 / TURNAROUND VIEW",
        "elements": ["5个全身3D渲染图", "5个匹配的线稿视图"]
      },
      {
        "title": "10 色彩开发 / COLOR DEVELOPMENT",
        "elements": ["5排5色调色板", "色彩心理学文本"]
      },
      {
        "title": "11 材质规格 / MATERIAL SPECIFICATION",
        "elements": ["5个纹理样本", "属性滑块", "4个制造图标"]
      },
      {
        "title": "12 色彩应用 / COLOR APPLICATION",
        "elements": ["4个色彩变化渲染图", "2个明暗渲染图", "4个对比度评级圆圈"]
      },
      {
        "title": "13 构造指南 / CONSTRUCTION GUIDE",
        "elements": ["2个几何和网格的线框图"]
      },
      {
        "title": "14 设计系统规则 / DESIGN SYSTEM RULES",
        "elements": ["最小尺寸图标", "留白空间图", "4个使用示例"]
      },
      {
        "title": "15 资产变体 / ASSET VARIANTS",
        "elements": ["3个尺寸变体", "3个线稿变体", "3个简化平面头像"]
      },
      {
        "title": "16 数字应用 / DIGITAL APPLICATIONS",
        "elements": ["1个应用图标", "2个社交头像", "UI元素", "3步动画循环"]
      },
      {
        "title": "17 实物应用 / PHYSICAL APPLICATIONS",
        "elements": ["毛绒玩具模型", "包装模型", "周边产品模型", "店面模型"]
      },
      {
        "title": "18 最终主视觉 / FINAL RENDERING",
        "elements": ["拿着茶的大尺寸高分辨率3D渲染图", "logo", "文件格式列表"]
      }
    ]
  }
}
```

<a id="prompt-e00380b4186b2804e18f"></a>

### 45. 温馨的动漫ASMR耳部按摩女孩

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case94/output.jpg" alt="温馨的动漫ASMR耳部按摩女孩" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Shion_yamabuki/status/2047232198382964969)

**提示词:**

```text
一个柔和、梦幻的动漫插画，描绘了一位可爱的年轻女子在夜晚舒适的卧室中进行ASMR。她靠近观众坐着，膝盖弯曲，面前中央放置着一个黑色的3Dio式双耳麦克风。她有着{argument name="hair color" default="深紫色"}的头发，松散凌乱的盘发，飘逸的刘海框着脸庞，大大的闪亮{argument name="eye color" default="蓝色"}眼睛，温柔的红晕，和甜蜜的张嘴微笑。她的头微微向观众倾斜，呈现温暖、亲切的姿态。她穿着一件精致的白色蕾丝吊带背心，肩上搭着一件宽松蓬松的{argument name="cardigan color" default="柔和粉紫色"}毛衣，营造出温柔、亲密的深夜治愈氛围。双手轻触麦克风的白色硅胶耳罩，仿佛要给耳朵做按摩。房间被柔和的粉色和琥珀色环境光照明，背景有厚重的窗帘，一张带有蓬松靠垫的床或沙发，温暖的仙光光斑，右侧有一小盆植物。添加发光的手写日式霓虹文字融入构图：左侧有四个文本元素，分别写着"とろける"、"耳"、"マッサージ"和"ASMR"，带有2个小心形符号；右侧是垂直文字，写着"いっぱい癒してあげるね...♡"。使用精致现代的动漫风格，高度详细的面部和头发，光泽眼睛，光滑发光的皮肤，柔和的阴影，柔和的高光，浅景深，浪漫舒适的流媒体缩略图构图，以及以粉色、薰衣草色、奶油色和暖金色为主的舒缓女性色彩调色板。
```

<a id="prompt-e196b6fdfcd5f7fa9fb1"></a>

### 46. 赛博朋克 404 女巫召唤

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case100/output.jpg" alt="赛博朋克 404 女巫召唤" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Eris_Create_Lab/status/2047537707904274795)

**提示词:**

```text
一位戏剧性的动漫风格赛博女巫站在夜晚密集的未来主义城市上方的黑暗屋顶上，视角略微抬高。主要人物是一位娇小的年轻女巫，皮肤苍白，留着冰蓝色短波波头，有精灵般的尖耳朵，眼睛是发光的红色，带着狡黠自信的微笑。她右手举着一把黑色魔杖高高举起，顶端悬挂着一个球状护符，发出微弱的紫色和红色光芒。她那顶 oversized 的歪斜女巫帽是黑色的，有紫色内衬，上面布满了缝补的补丁、警告标签、带子和白色图形，包括一个大的"404"和一个骷髅标志。她穿着黑色和紫色的科技风服装： oversized 的带帽夹克，有许多带子和标签，胸前印有"404"的黑色短款上衣，分层腰带，短款下装，一条腿上有渔网袜，黑色系带战斗靴，项圈和金属配饰。几个悬挂的带子和标签上明显写着"WITCH 404"、"404"和故障主题的标记。在她下方和旁边，屋顶地面上投射出一个大型发光的紫色魔法圆圈，融合了黑客界面的美学，充满了神秘学环、符文、中心的骷髅符号和分散的霓虹系统文本，如错误代码片段，形成了魔法与数字腐败的融合。从圆圈中浮现出一个大型装甲召唤生物：一个黑色未来主义恶魔骑士或机器人随从，有锯齿状的反射装甲，狭窄的紫色照明面罩，一只手握着重型武器，部分溶解成紫色能量碎片和烟雾。背景展示了一个广阔的雨中超级城市，有公寓塔楼和工业屋顶，挤满了窗户、阳台、电缆、标志和薄雾。附近一栋建筑的墙上有一个巨大的垂直涂鸦风格标志，包含3个可读元素："404"、"Witch"和"ERROR NOT FOUND"，还有一个较小的"E404"。额外的紫色霓虹故障文本和符号散落在屋顶和空中。使用黑色、靛蓝和深紫色的暗色调，带有鲜明的品红-紫色高光，电影般的对比度，反射的湿表面，密集的细节，以及高端的精美插画风格。氛围是神秘的、前卫的、时尚的、危险的，结合了都市奇幻、黑客美学和魔法召唤。
```

<a id="prompt-30865de51eede04cca79"></a>

### 47. YouTube 缩略图 - Cyber AI 网络研讨会缩略图

<img src="https://cms-assets.youmind.com/media/1777367312466_19d40h_HG6p2oxaoAA87gy.jpg" alt="YouTube 缩略图 - Cyber AI 网络研讨会缩略图" width="480">

此提示生成一个大胆的日本赛博风格直播缩略图，带有电子风格字体、一个吉祥物角色和三个特色面板，用于技术讲座、AI网络研讨会或推广直播。

- **分类:** 角色设计
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/emi_aifuku/status/2048761642872348947#reversed-0)

**提示词:**

```text
创建一个炫目的日本YouTube缩略图，采用深色未来赛博科技风格，16:9横向构图，背景为深蓝到黑色，充满发光的蓝色电路板图案、连接的网络节点、小型数字方块和电能线条。在顶部中央，放置一个小型白色日语标题，内容为{argument name="headline text" default="センスに頼らないAI時代の新常識"}。在中央，添加一个巨大的两行日语标题，使用金属银白色斜面字体，带有强烈的霓虹蓝色外发光，字母后方和内部有闪电裂纹，内容为{argument name="main title" default="AIツール 完全攻略"}。在主标题下方，放置一个黑色水平横幅，带有细金色装饰边和白色衬线日语文本，内容为{argument name="subheadline text" default="Claude Code 解説LIVE 本日21:00〜"}。在右侧，包含1个可爱的羊吉祥物，站在发光的蓝色圆形平台上，有蓬松的浅蓝色和薰衣草色毛发，小角，简单的点状眼睛，中性表情，紫蓝色光轮廓，手持短棍，身体周围有红橙色火焰光环。沿底部放置3个发光的未来感圆角矩形面板，带有蓝色霓虹边框和深色内部，从左到右均匀分布。左侧面板包含1个带电路的白色头部图标和日语文本{argument name="bottom left label" default="AI生成から次へ進化"}。中央面板包含1个白色上升趋势图表图标和文本"AIでブランディング"。右侧面板包含1个白色齿轮组图标和文本"人もAIも動かす戦略"。使用极高对比度，光泽金属文字效果，分层蓝色边缘照明，动感闪电，微妙镜头光晕，以及高质量高影响力的网络研讨会缩略图美学。
```

<a id="prompt-36a01e862e0d41170e04"></a>

### 48. YouTube 缩略图 - 闪耀金色 AI 变现主题缩略图

<img src="https://cms-assets.youmind.com/media/1777367313163_l3gpv3_HG6p2o0bIAEhzCO.jpg" alt="YouTube 缩略图 - 闪耀金色 AI 变现主题缩略图" width="480">

此提示生成一个戏剧性的黑金色日本风格缩略图，适用于AI图像生成收入内容，是YouTube封面和社交媒体宣传图形的理想选择。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/emi_aifuku/status/2048761642872348947#reversed-2)

**提示词:**

```text
创建一个炫目的日本YouTube缩略图，采用奢华的黑金赚钱风格，充满戏剧性的视觉冲击力，设计为具有病毒式传播、庆祝性和高价值的感觉。使用深黑色背景，充满强烈的金色光爆、闪粉颗粒、闪光、镜头光晕和从中心向外辐射的流线型烟花。在整个画面上散布闪亮的金色五彩纸屑。在左下和右下背景处放置成堆和倾斜堆叠的日元钞票，在金色灯光下部分可见并发出光芒。在中心，展示巨大的压印金属金色日文字体，具有厚实的3D斜面边缘、强烈的高光、黑色阴影和优质箔质纹理。顶部标题应以粗体白色日文文字显示"フォロワー100人未満でも"，带有深色轮廓，在顶部居中。主要中心文字应在中间上方行显示"画像生成で"，在下方最大行显示"月100万"，两者都使用巨大的金色3D衬线风格日文字体，其中"100"特别突出且超大。在下方添加一个带有金色装饰边框和优雅装饰角的宽黑色横幅，包含副标题文字"0からの実績を完全公開・再現可能メソッド"，使用白色日文字符，其中"完全公開"用金色突出显示。沿底部放置恰好3个水平对齐的黑金圆角矩形标注面板，带有华丽的金色边框和微妙的发光效果。左侧面板包含一个金色上升趋势图表图标和文字"実績スクショ公開"。中间面板包含一个金色地图图钉图标和文字"0→100ロードマップ"。右侧面板包含一个金色火箭图标和文字"今すぐ始める方法"。在这些底部面板周围添加小月桂或装饰性金色装饰。在构图右侧放置一个可爱的Q版绵羊吉祥物，有蓬松的浅蓝色羊毛、奶油色的角和耳朵、简单的中性表情和小身体，拿着一本标有"BOOK"的红色开本。吉祥物应略微重叠主文字区域的右侧，并有清晰的轮廓，使其从闪烁的背景中脱颖而出。整体构图应具有极高的对比度、丰富饱和的金色、光泽感、拥挤感，并优化为大胆的社交媒体缩略图，能够立即传达财富、成功和AI图像生成收入。
```

<a id="prompt-7163eda3599c80881e02"></a>

### 49. YouTube 缩略图 - 带字幕的电视采访场景

<img src="https://cms-assets.youmind.com/media/1777367276002_b3pk02_HG8pBwzaoAARCOU.jpg" alt="YouTube 缩略图 - 带字幕的电视采访场景" width="480">

一个用于生成宽屏电视采访场景的提示词，包含特定的UI元素，如转场效果、时间显示和新闻滚动条。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/kai_tetu/status/2048907847841481134)

**提示词:**

```text
{argument name="aspect ratio" default="16:9 landscape"}. {argument name="model" default="A model girl"} 正在被娱乐记者询问关于 {argument name="interview topic" default="a romantic relationship with another male celebrity"}。在电视采访中，屏幕上添加了写着 "{argument name="caption" default="It's a secret❤"}" 的标题。屏幕是脱口秀布局，左下角有画中画窗口，右上角有时间显示。在屏幕上配置'突发新闻'或'独家专访'等标题。模特女孩说'这是个秘密❤'，做出适当的姿势，将食指放在嘴边，一只眼睛眨眼。
```

<a id="prompt-f4a8d179b86b1c728799"></a>

### 50. YouTube 缩略图 - 火热的日本风格增长缩略图

<img src="https://cms-assets.youmind.com/media/1777367313200_n0p0z3_HG6p2o0acAA0NRJ.jpg" alt="YouTube 缩略图 - 火热的日本风格增长缩略图" width="480">

一个大胆的日本YouTube风格缩略图，用于社交媒体增长内容，非常适合关于从零增长到一万粉丝的教程。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/emi_aifuku/status/2048761642872348947#reversed-1)

**提示词:**

```text
{"type":"日本YouTube缩略图","style":"高冲击力的闪亮增长营销缩略图，戏剧性，光泽感，火焰效果，引人注目","canvas":{"aspect_ratio":"16:9","background":"黑色背景配橙色火花，发光粒子，光线条纹和镜头光晕"},"headline":{"top_text":"{argument name=\"headline text\" default=\"通过最短路径到达的方法\"}","main_text":["从0开始","到1万人","增长法则"],"sub_text":"完全解析常见的错误行为","main_text_style":{"font":"超粗体日文显示字体","colors":["白色","发光的橙金色"],"effects":"粗黑色阴影，强烈外发光，橙色文字上的金属热感纹理，白色文字上的轻微磨损纹理"}},"graphics":{"count":6,"items":[{"type":"巨大的向上箭头","position":"右上角对角向上扫","color":"明亮的橙金色","effect":"强烈发光，火花轨迹"},{"type":"条形图","position":"角色右侧后方","count":4,"labels":["5,000","7,000","10,000",""],"color":"橙金色发光"},{"type":"镜头光晕星爆","position":"左上角","color":"金色橙色"},{"type":"对角能量条纹","position":"左下角到中心","color":"橙色"},{"type":"小火花粒子","position":"遍布整个背景","color":"橙色和金色"},{"type":"小星星图标","position":"角色头部上方","color":"黄色发光"}]},"character":{"count":1,"subject":"可爱的吉祥物羊头像","position":"右下角","appearance":{"body_color":"浅蓝色蓬松羊毛","face":"奶油白色","outline":"深棕色线条艺术","expression":"平静的闭眼微笑","accessories":"右蹄拿着黄色指示棒"}},"bottom_panels":{"count":3,"style":"黑色圆角矩形框，带有明亮的橙色发光边框","items":[{"icon":"人群","text":"增长账号的共同点","position":"左下角"},{"icon":"带箭头的目标","text":"0粉丝期的策略","position":"底部中央"},{"icon":"带箭头的上升条形图","text":"算法攻略法","position":"右下角"}]},"color_palette":{"primary":["黑色","白色","橙色","金色"],"accent":["黄色","浅蓝色"]},"composition":"超大中心字体占据画面，重点突出1万人和增长法则，右侧有辅助吉祥物，底部对齐三个信息提示框，整体设计成病毒式传播的日本社交媒体或YouTube增长教程缩略图","quality":"超清晰，高对比度，精致的缩略图设计，电影级发光效果"}
```

<a id="prompt-f5c20c30052773f60400"></a>

### 51. YouTube 缩略图 - 红色沙漠星球上的宇航员

<img src="https://cms-assets.youmind.com/media/1777367295076_j3s2y5_HG7B3ExaAAA6X4w.jpg" alt="YouTube 缩略图 - 红色沙漠星球上的宇航员" width="480">

这个提示生成一个电影感的逼真科幻景观，描绘了一名孤独的宇航员俯瞰广阔的火星般沙漠，适合用于故事板、电影关键帧和太空探索视觉效果。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/TikFilmer/status/2048788047521829143#reversed-3)

**提示词:**

```text
一个电影感的广角镜头，展示一名孤独的宇航员站在岩石峭壁上，背对相机，凝视着火星般星球上广阔的红色沙漠平原。宇航员位于画面中下方中央，穿着带有灰色面板的逼真白色EVA太空服，配有生命支持背包、重靴和深色手套；由于是从背后拍摄，头盔无法从前方看到。景观广阔而荒凉，覆盖着锈红色的尘埃、散落的石头和低矮的岩石构造，左侧前景有崎岖的悬崖边缘，中间地带稀疏分布着岩石小丘，远处地平线上延伸着朦胧的山脉。使用柔和的暖桃色和陶土色调，薄薄的大气雾霾，以及柔和的午后晚霞光线，在宇航员脚后投下长长的影子。氛围孤独、敬畏且充满探索精神，就像一部关于与外星世界首次接触的科幻电影的开场镜头。照片级真实感，高细节，超广角构图，自然电影感色彩分级，史诗级规模，极简主义，无建筑物，无车辆，无文字，无HUD，无其他人。
```

<a id="prompt-02a3d7bbababba3cb147"></a>

### 52. 日本人工智能游戏开发概述幻灯片提示

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case40/output.jpg" alt="日本人工智能游戏开发概述幻灯片提示" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/ailovedirector/status/2046905387274891296)

**提示词:**

```text
尝试在这里生成横向的PowerPoint图像，因为我会判断使用的是哪个模型。用一张日语的PowerPoint总结当前AI游戏开发的概况。关于游戏开发技术，制作基于工时分析需要投入力量的资料，以及关于量产重要性的说明等PowerPoint图像。
```

<a id="prompt-15674bfddcbb86729aa6"></a>

### 53. 刘亦菲抖音直播截图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case37/output.jpg" alt="刘亦菲抖音直播截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/kylegeeks/status/2046479783765397629)

**提示词:**

```text
9:16 的图片比例,生成一张抖音直播的截图,里面是 刘亦菲 在直播,刘亦菲 手里拿着牌子,牌子里写着 今晚直播,欢迎来参亦菲畅聊!
```

<a id="prompt-28d96c62cf8370c5eeb5"></a>

### 54. 刘亦菲抖音直播截图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case7/output.jpg" alt="刘亦菲抖音直播截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/alanblogsooo/status/2044784762594918516)

**提示词:**

```text
9:16 的图片比例，生成一张抖音直播的截图，里面是 刘亦菲 在直播，刘亦菲 手里拿着牌子，牌子里写着 今晚直播，欢迎来参亦菲畅聊！
```

<a id="prompt-3e66ececf89e7f3afaa5"></a>

### 55. 手写的笔记本照片

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case3/output.jpg" alt="手写的笔记本照片" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/patrickassale/status/2044569086013718958)

**提示词:**

```text
业余照片，一本平摊开的笔记本，里面装满了黑色圆珠笔手写的笔记。字迹随意且有些凌乱，像是个人笔记，有自然的瑕疵，划掉的字，加粗的标题。从上方稍微俯拍，来自窗户的自然日光，无闪光灯。随意的桌面场景，用iPhone拍摄
```

<a id="prompt-49fd0e4c1571c5e1b257"></a>

### 56. 宋朝社交媒体动态

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case4/output.jpg" alt="宋朝社交媒体动态" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Panda20230902/status/2045385588065313057)

**提示词:**

```text
"宋朝人的朋友圈"/"SONG DYNASTY SOCIAL MEDIA FEED"，古今穿越幽默融合界面设计风格，画面模拟手机社交媒体界面，但内容全部是宋朝场景头像是宋代文人画像，用户名"苏东坡SuShi_Official"，发布内容"刚到黄州，被贬了但心情还行。今天自己做了东坡肉，味道绝了，附菜谱："，配图为工笔画风格的东坡肉特写，点赞列表"黄庭坚、秦观、佛印等126人"，评论区"王安石：呵呵""司马光：还是那个味道"，界面元素如点赞图标用宋代花纹替代，状态栏显示"大宋移动 5G"和"元丰三年"，配色为手机深色模式搭配宋代雅致色调，历史与社交媒体的趣味碰撞杰作
```

<a id="prompt-55d71387e4a9ca11e810"></a>

### 57. 风格到UI设计系统

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case9/output.jpg" alt="风格到UI设计系统" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/stark_nico99/status/2045836554451706125)

**提示词:**

```text
用这种风格帮我生成一套UI设计系统，包含网页、移动端、卡片、控件、按钮以及其它。把这套视觉风格作为参考生成网页。我尝试了宇宙、飞行、蝴蝶主题。
```

<a id="prompt-a85567fefbab3f5a1b4d"></a>

### 58. 多平台内容截图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case5/output.jpg" alt="多平台内容截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/MrLarus/status/2045373105041007013)

**提示词:**

```text
1、生成视频号内容截图，主题：中老年不要盲目催婚，iPhone尺寸
2、生成抖音内容截图，主题：跟上AI浪潮9.9包教会，iPhone尺寸
3、生成小红书内容截图，主题：精致女孩背后都有网贷，iPhone尺寸
4、生成快手内容截图：主题：直播离婚预告，iPhone尺寸
```

<a id="prompt-620e37332309c663e7f4"></a>

### 59. 书法练习册页

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case33/output.jpg" alt="书法练习册页" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/MrLarus/status/2046510310253539764)

**提示词:**

```text
生成一张【字体】书法临摹字帖
```

<a id="prompt-638c09e89e6d75ab4a00"></a>

### 60. 业余iPhone主题演讲快照

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case2/output.jpg" alt="业余iPhone主题演讲快照" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/patrickassale/status/2044687244368441742)

**提示词:**

```text
在iPhone 20主题演讲期间，在Apple Park拍摄的业余iPhone照片，蒂姆·库克在台上演讲。从远处人群中拍摄
```

<a id="prompt-93bfec21b9e5c4c590e7"></a>

### 61. 一键提示UI设计生成

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case1/output.jpg" alt="一键提示UI设计生成" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/austinit/status/2044968740782272596)

**提示词:**

```text
用这种风格帮我生成一套UI设计系统，包含网页、移动端、卡片、控件、按钮 以及其它
```

<a id="prompt-ff76ae2717697774b56b"></a>

### 62. 手相诊断报告

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case32/output.jpg" alt="手相诊断报告" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/agi_aibusi/status/2046530764871696750)

**提示词:**

```text
使用GPT-image-2诊断这个手相，制作详细的鉴定书。
分析生命线、智慧线、感情线、命运线、太阳线、财运线、婚姻线，包括线条的形状、浓淡、分支、起点和终点。
将建议重点整理成高质量的占星鉴定书。
```

<a id="prompt-d00d326a025d67bf121e"></a>

### 63. 日本抽卡游戏屏幕

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case35/output.jpg" alt="日本抽卡游戏屏幕" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/the_wheel_2024/status/2046519658166317160)

**提示词:**

```text
生成日本社交游戏的抽卡界面，
```

<a id="prompt-9bd18b2523bbed0d95f1"></a>

### 64. 特朗普和金正恩直播PK截图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case39/output.jpg" alt="特朗普和金正恩直播PK截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/alanlovelq/status/2046048929490612464)

**提示词:**

```text
1、生成特朗普和金正恩在抖音直播间打PK的截图
2、生成不知火舞的小红书主页截图
3、生成图片: 手写在教室黑板上的出师表全文,真实感的粉笔字迹,晴朗白天用iPhone手机实拍
4、生成图片: T-800机器人的淘宝商品详情页,展示: 机器人的正面侧面背面三视图, 产品价格, 产品细节, 功能和使用场景等
```

<a id="prompt-e8fed8bd1e6fd26830c1"></a>

### 65. 赛博朋克霓虹UI设计系统

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case38/output.jpg" alt="赛博朋克霓虹UI设计系统" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/AZLnfvp/status/2046468976092533180)

**提示词:**

```text
用未来都市风格生成UI设计系统,灵感来自赛博朋克城市夜景,包含霓虹灯、玻璃建筑反射、高对比光影,配色以紫色、蓝色、粉色霓虹为主,设计网页Dashboard、移动端界面、卡片、按钮、控件等,视觉炫酷、层次丰富、科技感极强
```

<a id="prompt-a5b86d7de34e8c2ed86d"></a>

### 66. 埃隆·马斯克抖音直播截图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case36/output.jpg" alt="埃隆·马斯克抖音直播截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/Shinning1010/status/2046501587762188535)

**提示词:**

```text
9:16竖版，高细节写实风格的中国TikTok直播截图，埃隆·马斯克在直播间对着手机摄像头说话，神情兴奋，面带微笑，直播氛围温暖真实。他一手拿着一张白色手写牌，上面清晰写着："感谢Shinning"。直播屏幕中有明显的中国TikTok界面元素，包括右侧垂直排列的点赞、评论和分享图标，下方有滚动的中文弹幕和互动评论，顶部有"直播"标志，看起来像真实的手机截图。屏幕中有一个醒目的礼物提示特效："Shinning送出抖音NO.1"，带有礼物动画光效和平台风格的提示框。马斯克处于专业的直播环境中，面前有手机支架、环形补光灯和桌面麦克风。背景是现代化的科技直播间，灯光明亮，带有轻微的霓虹氛围。构图真实自然，如同中国短视频平台的直播截图。界面信息丰富但不杂乱，人物清晰，表情生动，细节丰富，有真实摄影感，景深，高清，电影感，照片级真实，真实的直播截图，社交媒体UI，中国抖音直播间，详细光照，自然皮肤质感。

负面提示：

低分辨率，模糊，卡通，插画，过强的CG感，二维，变形的手指，错误的文字，乱码，多个手机，多个品牌，人物重复，面部崩塌，面部特征扭曲，过度皮肤磨皮，过曝，太暗，杂乱的背景，错误的UI，非中国短视频界面，过多的英文弹幕，礼物特效不明显，裁剪错误，比例错误

补充强化词：

真实手机录屏截图感，直播UI完整，礼物提示框符合中国短视频平台风格，中文评论区活跃，直播间在线人数清晰显示，时间、电量、信号条可见。
```

<a id="prompt-f43377a97f9785a1a50e"></a>

### 67. 桃太郎解释幻灯片

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case10/output.jpg" alt="桃太郎解释幻灯片" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/yammamon/status/2045778624092254603)

**提示词:**

```text
融合了「irasutoya」的温馨氛围和「霞ヶ関スライド」的压倒性信息密度，为桃太郎制作解说幻灯片（草图）
```

<a id="prompt-ffa6a85e545e4f89de57"></a>

### 68. 李成桂太祖王X页

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case8/output.jpg" alt="李成桂太祖王X页" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/SKA_Neotype/status/2044637900978217334)

**提示词:**

```text
请创建关于朝鲜太祖李成熙的X页面（在威化岛回军前夕- 包含太祖李成熙与崔将军互相争执的内容的帖子）。
```

<a id="prompt-04758d6e67127340b512"></a>

### 69. 朱元璋登基后的推特主页

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case234.jpg" alt="朱元璋登基后的推特主页" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-234)

**提示词:**

```text
创建一个明朝朱元璋登基之后的X帖子页面
```

<a id="prompt-0549c6f2a43070cf9922"></a>

### 70. 基于视频内容和当前帧，使用GPT生成一个YouT...

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/case_case61/output.jpg" alt="基于视频内容和当前帧，使用GPT生成一个YouT..." width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/chatcutapp/status/2047228386117128475)

**提示词:**

```text
根据视频内容和当前帧，使用GPT生成适合该视频的YouTube缩略图。您可以参考我提供的图片风格，但将右侧的AE标志替换为theChatCut标志。我会为您附上标志。
```

<a id="prompt-0783dddcdb2d32a8d2ef"></a>

### 71. 《塞尔达传说：王国之泪》风格

<img src="https://pbs.twimg.com/media/HFJzGO8WMAA_HBa?format=jpg&amp;name=large" alt="《塞尔达传说：王国之泪》风格" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/marmaduke091/status/2040820686751432990)

**提示词:**

```text
在《塞尔达：王国之泪》游戏里，林克坐在一列由他自己制造的 e531 系列列车里
```

<a id="prompt-0a20ec6baf8d21adb5a2"></a>

### 72. 前卫吉他雕塑时尚广告

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts/main/images/comparison_case81/output.jpg" alt="前卫吉他雕塑时尚广告" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/CurieuxExplorer/status/2049709975040401601)

**提示词:**

```text
前卫时尚广告， oversized guitar positioned like sculpture， a guitarist in jeans casually seated on the a button as if furniture， giant word "Plism Art" behind in bold white typography，粉彩工作室背景，反射地板，奢侈眼镜广告美学，超简洁布局，杂志编辑风格，Bold quote " What are you listening"，标签：创造自己的改变
```

<a id="prompt-0f75c690ad6f9f98ead5"></a>

### 73. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case104.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-104)

**提示词:**

```text
{
  "type": "YouTube livestream UI",
  "top_nav": {
    "logo": "YouTube Premium",
    "search": "{argument name=\"search query\" default=\"bilal fraiha\"}",
    "icons": 3
  },
  "player": {
    "subjects": [
      "{argument name=\"female guest\" default=\"Sydney Sweeney\"} in white cardigan",
      "bearded man in beige jacket laughing"
    ],
    "bg": "couch, 2 silver play buttons, ram logo 'SARDI'",
    "overlays": {
      "chat": {"pos": "left", "count": 15, "desc": "colored usernames, white text"},
      "goal": {"pos": "top right", "text": "TONIGHT'S GOAL: 0 to 25"},
      "banner": {"pos": "bottom center", "text": "K {argument name=\"streamer name\" default=\"MOREBILAL\"}"}
    },
    "controls": {"count": 10}
  },
  "details": {
    "title": "{argument name=\"video title\" default=\"FULL STREAM | سيدني سويني مع بلال\"}",
    "channel": "{argument name=\"channel name\" default=\"More Bilal No Filter\"}",
    "buttons": 5
  }
}
```

<a id="prompt-10d34e5d6a6980a4b25d"></a>

### 74. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case107.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-107)

**提示词:**

```text
{"type": "YouTube desktop dark mode UI mockup", "header": {"logo": "YouTube", "search_bar": "Search", "icons_count": 5, "icons": ["search", "mic", "create", "notifications", "profile"]}, "video_player": {"top_left_badge": "LIVE", "left_side": {"subject": "{argument name=\"presenter description\" default=\"man in green sweater at wooden podium\"}", "podium_logo": "OpenAI"}, "right_side_presentation": {"text_elements": ["OpenAI", "INTRODUCING", "{argument name=\"product name\" default=\"GPT-Image-2\"}", "{argument name=\"tagline\" default=\"More Realistic. More Useful. More Creative.\"}"], "sample_images_count": 4, "sample_images": ["mountain lake with boat", "woman portrait with dappled light", "cute robot with lantern in forest", "starry night cafe painting"]}, "bottom_controls_count": 10, "bottom_controls": ["pause", "next", "volume", "LIVE", "red progress bar", "CC", "settings", "miniplayer", "theater mode", "fullscreen"]}, "video_details": {"title": "{argument name=\"video title\" default=\"OpenAI Live: Introducing GPT-Image-2\"}", "channel": {"name": "{argument name=\"channel name\" default=\"OpenAI\"}", "verified": true, "subscribers": "1.36M", "button": "Subscribe"}, "action_buttons_count": 5, "action_buttons": ["Like 12K", "Dislike 497", "Share", "Save", "More"], "description_box": {"stats": "95,237 watching now Started streaming 7 minutes ago", "tags": "#OpenAI #GPTImage2 #AI", "text": "Join us for a special live event as we introduce GPT-Image-2, our latest and most advanced image generation model. See new capabilities, live demos, and hear from the team ...more"}}}
```

<a id="prompt-17b42712b4329c5637f8"></a>

### 75. 定制专属风格界面设计系统

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case243.jpg" alt="定制专属风格界面设计系统" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-243)

**提示词:**

```text
用xx风格帮我生成一套UI设计系统，包含网页、移动端、卡片、控件、按钮 以及其它
```

<a id="prompt-1aaba994d7662ec62bb8"></a>

### 76. 直播界面设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case21.jpg" alt="直播界面设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-21)

**提示词:**

```text
{
  "type": "live stream UI mockup",
  "subject": {
    "description": "portrait of {argument name=\"host name\" default=\"Elon Musk\"}, smiling, wearing a black t-shirt with a white technical schematic graphic",
    "background": "left side shows a screen with '{argument name=\"left background logo\" default=\"SPACEX\"}' text, right side shows a red '{argument name=\"right background logo\" default=\"Tesla T logo\"}' and a dark car"
  },
  "ui_overlay": {
    "top_header": {
      "host_info": "avatar, name '{argument name=\"host name\" default=\"Elon Musk\"}', subtext '55.6万本场点赞', red '关注' button",
      "rank_badge": "gold coin icon with '全站第1名'",
      "viewer_stats": "3 top viewer avatars with '12.3w', '8.6w', '5.7w', total '68.7万', 'X' close button",
      "right_links": "'更多直播 >', '礼物展馆 0/24' with blue '经典' tag"
    },
    "mid_left_gifts": {
      "count": 2,
      "items": [
        "avatar '科技爱好者', '送小心心', heart icon x 1314",
        "avatar '星辰大海', '送火箭', rocket icon x 666"
      ]
    },
    "bottom_left_chat": {
      "system_message": "level 37 badge '宇宙漫游者 加入了直播间'",
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
      "hot_tag": "orange '热卖 x 1888'",
      "image": "Tesla Cybertruck",
      "title": "{argument name=\"product name\" default=\"特斯拉Cybertruck 电动皮卡\"}",
      "price": "{argument name=\"product price\" default=\"¥ 1,618,000\"}",
      "button": "red '抢' button",
      "floating_animation": "translucent hearts floating up the right edge"
    },
    "bottom_bar": {
      "input_field": "'说点什么...'",
      "icons": ["smiley face", "three dots", "shopping cart", "gift box", "share"]
    }
  }
}
```

<a id="prompt-1c629d1accbee535d119"></a>

### 77. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case133.jpg" alt="界面交互设计图" width="480">

- **分类:** 品牌与标志
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-133)

**提示词:**

```text
{
  "type": "brand identity system presentation board",
  "header": {
    "title": "品牌视觉识别系统 BRAND IDENTITY SYSTEM",
    "slogan": "爱它·懂它·陪伴它"
  },
  "main_logo": {
    "text": "{argument name=\"brand name\" default=\"GDX\"}",
    "subtitle": "{argument name=\"brand chinese name\" default=\"狗东西\"}",
    "design_feature": "{argument name=\"main subject\" default=\"Dog profile in negative space of the letter D\"}",
    "metadata": [
      "品牌名称",
      "行业属性 {argument name=\"industry\" default=\"宠物行业\"}",
      "设计时间 2024.05"
    ]
  },
  "layout": {
    "sections": [
      {
        "title": "设计网格",
        "count": 1,
        "description": "Logo with architectural grid lines and golden ratio measurements"
      },
      {
        "title": "概念草图",
        "count": 4,
        "description": "Evolution steps from rough dog sketch to final geometric logo"
      },
      {
        "title": "灵感来源",
        "count": 4,
        "description": "Moodboard images including minimalist architecture, a golden retriever, and dark green geometric shapes"
      },
      {
        "title": "创意理念",
        "count": 4,
        "description": "Text blocks with minimalist icons explaining design philosophy, positioning, color psychology, and scalability"
      },
      {
        "title": "品牌应用",
        "count": 6,
        "labels": [
          "名片 正反面",
          "信纸信封",
          "APP图标",
          "网站页眉 / 网站图标",
          "产品包装 / 购物袋",
          "店面门头 / 标识牌"
        ],
        "description": "Mockups of business cards, envelopes, app icons, website header with a dog, paper shopping bags, and a storefront sign"
      },
      {
        "title": "色彩规范",
        "count": 5,
        "labels": [
          "主色",
          "辅助色",
          "强调色"
        ],
        "colors": [
          "{argument name=\"primary color\" default=\"#1E3D34\"}",
          "#F5F3EF",
          "#E5E2DD",
          "#A8C5B1",
          "#E0A86E"
        ]
      },
      {
        "title": "字体规范",
        "count": 2,
        "labels": [
          "思源黑体 CN",
          "思源柔黑体 CN"
        ],
        "description": "Typography specimens showing 'Aa', alphabet, and numbers"
      },
      {
        "title": "最小使用尺寸",
        "count": 2,
        "description": "Minimum logo size specifications at 20mm and 12mm"
      },
      {
        "title": "安全留白区域",
        "count": 1,
        "description": "Logo surrounded by a bounding box with 'X' indicating clear space margins"
      },
      {
        "title": "错误使用示例",
        "count": 5,
        "labels": [
          "不可拉伸变形",
          "不可改变颜色",
          "不可添加阴影",
          "不可倾斜使用",
          "不可复杂背景上使用"
        ],
        "description": "Examples of incorrect logo usage: stretched, wrong color, drop shadow, tilted, and placed on a busy photographic background"
      }
    ]
  }
}
```

<a id="prompt-1fdd195b41f43c355c08"></a>

### 78. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case17.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-17)

**提示词:**

```text
{
  "type": "exploded view product diagram poster",
  "subject": "VR headset",
  "style": "clean high-tech 3D render, studio lighting, glowing accents",
  "background": "{argument name=\"background color\" default=\"soft purple and blue gradient\"}",
  "header": {
    "logo": "∞ {argument name=\"product name\" default=\"Meta Quest 3\"}",
    "subtitle": "{argument name=\"main catchphrase\" default=\"まったく新しい現実を、まったく新しい構造から。\"}"
  },
  "layout": {
    "centerpiece": "vertically stacked exploded view of a VR headset showing 9 distinct layers of internal components: outer shell, camera sensors, motherboard with chip, pancake lenses, internal frame, battery packs, side straps, top strap, and facial interface cushion.",
    "callout_labels": {
      "count": 8,
      "left_side": [
        "Snapdragon® XR2 Gen 2\n圧倒的な処理性能でリアルタイムな体験を。",
        "調整可能なIPD機構\n幅広いユーザーに快適なフィット感を。",
        "精密設計されたヘッドストラップ\n快適さと安定性を追求したエルゴノミクス。"
      ],
      "right_side": [
        "フェイスプレート\n洗練されたデザインと最適な重量バランス。",
        "トラッキングカメラ\n高精度な位置トラッキングと環境認識を実現。",
        "パンケーキレンズ\n薄型設計で広い視野角と鮮明な映像を提供。",
        "高性能バッテリー\n長時間駆動を支える最適化された電源設計。",
        "柔らかなフェイスインターフェース\n長時間でも快適な装着感を実現。"
      ]
    },
    "footer": {
      "left_text_block": {
        "headline": "{argument name=\"bottom headline\" default=\"体験は、構造から進化する。\"}",
        "body": "一つひとつのパーツに、没入体験を支える最先端テクノロジーとこだわりの設計。Meta Quest 3は、未来を感じさせる体験を内部から生み出しています。"
      },
      "right_logo": "∞ Meta"
    }
  }
}
```

<a id="prompt-2641626aa4c9126d869b"></a>

### 79. YouTube 时间旅行截图

<img src="https://pbs.twimg.com/media/HFByWu7bsAAxlJd?format=jpg&amp;name=large" alt="YouTube 时间旅行截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/flowersslop/status/2040261168460108213)

**提示词:**

```text
一张 YouTube 视频截图，内容是某人穿越到了中世纪
```

<a id="prompt-270035fb739b11148c15"></a>

### 80. 宋朝社交媒体动态流

<img src="https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/song-dynasty-cyber-social-feed.jpg" alt="宋朝社交媒体动态流" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/Panda20230902/status/2045385588065313057)

**提示词:**

```text
“宋朝人的朋友圈” / “SONG DYNASTY SOCIAL MEDIA FEED”，采用古今穿越幽默融合的界面设计风格。画面模拟手机社交媒体界面，但内容全部是宋朝场景。头像是宋代文人的肖像，用户名为 “Su Dongpo SuShi_Official”，发帖内容为 “刚到黄州，被贬了但心态还行。今天自己做了东坡肉，味道绝了，附上做法：”。配图是一张工笔画风格的东坡肉特写。点赞列表为 “黄庭坚、秦观、佛印等 126 人”，评论区为 “王安石：呵呵” “司马光：还是那个味”。点赞图标等界面元素替换成宋代纹样。状态栏显示 “大宋移动 5G” 和 “元丰三年”。整体配色为手机深色模式搭配雅致宋韵色调，形成历史与社交媒体趣味碰撞的代表作。
```

<a id="prompt-29b3b9a7547aafa03096"></a>

### 81. 游戏界面截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case91.jpg" alt="游戏界面截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-91)

**提示词:**

```text
A highly detailed, realistic first-person video game screenshot of a next-generation voxel-based world. At the top center, a large, bold 3D logo reads "{argument name="game title" default="MINECRAFT 2"}". The scene features a {argument name="environment" default="lush, blocky landscape with a river, a small wooden cabin, a windmill, a waterfall, and majestic mountains in the background"}. The world blends realistic lighting, volumetric clouds, and high-resolution textures with cubic, voxel geometry. In the foreground on the left, a {argument name="mob 1" default="blocky green creeper"} stands on the grass, while a {argument name="mob 2" default="blocky brown wolf"} stands on the dirt path to the right. On the far right, the player's hand holds a {argument name="held item" default="pixelated blue diamond sword"} in a first-person perspective. At the bottom of the screen is a game user interface featuring a health bar with 10 red hearts, a green experience bar with the number '16', a hunger bar with 10 brown meat icons, and a 9-slot inventory hotbar. The hotbar contains, from left to right: a selected blue tool with a green highlight box, a green tool, a knife, a wrench with the number '3', a piece of meat with '6', a lantern with '24', a dirt block with '10', a bucket, and a sponge block.
```

<a id="prompt-2bfbeec1828e38ebaf28"></a>

### 82. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case132.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-132)

**提示词:**

```text
{
  "type": "18格品牌识别与角色设计文档",
  "brand": {
    "name": "{argument name=\"brand name\" default=\"沐阳 MUYANG TEA\"}",
    "industry": "{argument name=\"industry\" default=\"茶店\"}",
    "colors": ["{argument name=\"primary color\" default=\"黄色\"}", "{argument name=\"secondary color\" default=\"绿色\"}", "白色", "棕色", "深绿色"]
  },
  "subject": "{argument name=\"character description\" default=\"3D渲染的可爱柴犬吉祥物，穿着绿色围裙\"}",
  "layout": {
    "grid": "3列6行",
    "sections": [
      {
        "title": "01 品牌DNA分析 / BRAND DNA ANALYSIS",
        "elements": ["logo", "5个色板", "6个图标", "目标受众图表"]
      },
      {
        "title": "02 概念构思 / CONCEPT MOODBOARD",
        "elements": ["5张参考照片", "4个情绪图标", "设计方程式"]
      },
      {
        "title": "03 形态研究 / FORM STUDY",
        "elements": ["4个logo结构图标", "4个演变步骤", "4个剪影"]
      },
      {
        "title": "04 概念探索 / CONCEPT EXPLORATION",
        "elements": ["12个角色线稿草图"]
      },
      {
        "title": "05 精细线稿 / REFINED LINE ART",
        "elements": ["3排正面和侧面线稿，带比例指南"]
      },
      {
        "title": "06 细节精修 / DETAIL REFINEMENT",
        "elements": ["2个带标签的全身渲染图", "4个圆形特写"]
      },
      {
        "title": "07 表情设定 / EXPRESSION SHEET",
        "elements": ["11个3D渲染的头部表情"]
      },
      {
        "title": "08 姿势库 / POSE LIBRARY",
        "elements": ["9个全身3D渲染姿势"]
      },
      {
        "title": "09 转身视图 / TURNAROUND VIEW",
        "elements": ["5个全身3D渲染图", "5个匹配的线稿视图"]
      },
      {
        "title": "10 色彩开发 / COLOR DEVELOPMENT",
        "elements": ["5排5色调色板", "色彩心理学文本"]
      },
      {
        "title": "11 材质规格 / MATERIAL SPECIFICATION",
        "elements": ["5个纹理样本", "属性滑块", "4个制造图标"]
      },
      {
        "title": "12 色彩应用 / COLOR APPLICATION",
        "elements": ["4个色彩变化渲染图", "2个明暗渲染图", "4个对比度评级圆圈"]
      },
      {
        "title": "13 构造指南 / CONSTRUCTION GUIDE",
        "elements": ["2个几何和网格的线框图"]
      },
      {
        "title": "14 设计系统规则 / DESIGN SYSTEM RULES",
        "elements": ["最小尺寸图标", "留白空间图", "4个使用示例"]
      },
      {
        "title": "15 资产变体 / ASSET VARIANTS",
        "elements": ["3个尺寸变体", "3个线稿变体", "3个简化平面头像"]
      },
      {
        "title": "16 数字应用 / DIGITAL APPLICATIONS",
        "elements": ["1个应用图标", "2个社交头像", "UI元素", "3步动画循环"]
      },
      {
        "title": "17 实物应用 / PHYSICAL APPLICATIONS",
        "elements": ["毛绒玩具模型", "包装模型", "周边产品模型", "店面模型"]
      },
      {
        "title": "18 最终主视觉 / FINAL RENDERING",
        "elements": ["拿着茶的大尺寸高分辨率3D渲染图", "logo", "文件格式列表"]
      }
    ]
  }
}
```

<a id="prompt-2c116ea2226deb85898d"></a>

### 83. 不知火舞的小红书主页

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case287.jpg" alt="不知火舞的小红书主页" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-287)

**提示词:**

```text
生成不知火舞的小红书主页截图
```

<a id="prompt-2cc708791ec9d3626590"></a>

### 84. 精致女孩背后的网贷真相

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case259.jpg" alt="精致女孩背后的网贷真相" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-259)

**提示词:**

```text
生成小红书内容截图，主题：精致女孩背后都有网贷，iPhone尺寸
```

<a id="prompt-2cf0dd1c339e09dba723"></a>

### 85. 拒绝盲目催婚的暖心视频号截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case269.jpg" alt="拒绝盲目催婚的暖心视频号截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-269)

**提示词:**

```text
生成视频号内容截图，主题：中老年不要盲目催婚，iPhone尺寸
```

<a id="prompt-2e42b1a64663d000eba4"></a>

### 86. 抖音直播间的绝美女主播

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case256.jpg" alt="抖音直播间的绝美女主播" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-256)

**提示词:**

```text
生成一个抖音直播的截图 里面是一个美女在直播
```

<a id="prompt-3073cb504772810c96b3"></a>

### 87. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case151.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-151)

**提示词:**

```text
{
  "type": "2x2 advertising banner grid",
  "layout": "4 distinct quadrants, each featuring a different industry advertisement",
  "quadrants": [
    {
      "position": "top-left",
      "industry": "skincare",
      "visuals": "Asian woman touching cheek, floating water droplets, white pump bottle",
      "brand": "BALANCÉE",
      "copy": {
        "headline": "{argument name=\"skincare headline\" default=\"素肌が、目覚める。\"}",
        "subheadline": "透明感あふれる、新しいわたしへ。",
        "features_count": 3,
        "features_labels": ["高保湿", "肌荒れ予防", "美白ケア*"]
      }
    },
    {
      "position": "top-right",
      "industry": "restaurant food",
      "visuals": "close-up of spaghetti bolognese with grated cheese and parsley, dark moody lighting",
      "brand": "Trattoria Luce",
      "copy": {
        "headline": "{argument name=\"food headline\" default=\"このパスタ、事件級。\"}",
        "badge": "期間限定",
        "description": "黒毛和牛のボロネーゼ 〜トリュフの香り〜"
      }
    },
    {
      "position": "bottom-left",
      "industry": "travel",
      "visuals": "woman with backpack facing a scenic mountain lake, bright daylight",
      "brand": "NATURE JOURNEY",
      "copy": {
        "headline": "{argument name=\"travel headline\" default=\"わたしを、解き放つ旅へ。\"}",
        "subheadline": "自然の中で、心が動き出す。",
        "script": "Find your freedom.",
        "banner_details": ["初夏の特別キャンペーン", "6.1 SAT - 6.30 SUN", "最大 20%OFF", "今だけの特別プラン多数！"]
      }
    },
    {
      "position": "bottom-right",
      "industry": "SaaS app",
      "visuals": "smartphone displaying a task management app interface with 4 schedule items",
      "brand": "{argument name=\"app brand name\" default=\"Taskme\"}",
      "copy": {
        "headline": "{argument name=\"app headline\" default=\"タスク管理を、もっとシンプルに、スマートに。\"}",
        "circle_badge": "1日を、デザインしよう。",
        "features_count": 3,
        "features_labels": ["直感的な操作性", "チームで共有可能", "どこでもアクセス"],
        "bottom_banner": "7日間無料トライアル実施中！"
      }
    }
  ]
}
```

<a id="prompt-30afc5e3d97beca2b467"></a>

### 88. 诗仙李白月下直播起舞

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case163.jpg" alt="诗仙李白月下直播起舞" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-163)

**提示词:**

```text
李白在抖音直播月下起舞
```

<a id="prompt-32605e7a67886973370d"></a>

### 89. 智能视频生成器暗黑界面设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case261.jpg" alt="智能视频生成器暗黑界面设计" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-261)

**提示词:**

```text
渲染一个专业的IOS APP首页UI图，该主题为AI Video Generator,英文界面。专业级设计，专业风格，暗黑色主题。
```

<a id="prompt-35402d32e5003c64d371"></a>

### 90. 快手直播离婚预告手机截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case258.jpg" alt="快手直播离婚预告手机截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-258)

**提示词:**

```text
生成快手内容截图：主题：直播离婚预告，iPhone尺寸
```

<a id="prompt-3f484668ad2e4169c693"></a>

### 91. Crumple Chair 概念沙发研发板

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case370.jpg" alt="Crumple Chair 概念沙发研发板" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-370)

**提示词:**

```text
Design Concept: The Crumple Chair Core Philosophy: Translating the "controlled chaos" of a tossed paper ball into a sculptural, high-comfort seating experience.

Stage 1: Observation & Morphological Analysis The goal is to deconstruct the image of the crumpled paper into usable geometric data. Crease Mapping: Identify the primary "valley" and "ridge" lines. These represent potential structural ribs or seams in the chair. Faceted Planes: Break down the sphere into a series of non-uniform polygons. Each flat surface of the paper becomes a potential panel for the chair’s upholstery or shell. Shadow Study: Analyze how the "tossed" form creates deep recesses. These natural pockets guide where the user’s weight will be cradled.

Stage 2: Iterative Form Exploration Moving from a sphere to a seat through "Digital Crumpling." Subtractive Sculpting: Imagine the paper ball as a solid mass. Use Boolean operations to "carve out" a seating cavity that fits the human form while maintaining the external jagged texture. Tension Simulation: Use 3D software (like Rhino or Blender) to simulate a flat sheet of material being compressed. This ensures the folds look authentic and not "modeled." The "Toss" Logic: Experiment with gravity-based simulation dropping a digital mesh to see how it settles naturally, mimicking the "tossed" origin.

Stage 3: Ergonomic Translation & Blueprinting Refining the raw aesthetic into a functional object. The Comfort Core: Overlay a standard ergonomic template (Seating Angle: 105°–110°) over the crumpled form. Adjust the internal "folds" to provide lumbar support and pressure relief. Blueprint Generation: Create technical orthographic views (Front, Side, Top). Map out the dimensions: Seat Height: 450mm Total Width: 850mm Surface Smoothing: Maintain the sharp "paper edges" on the exterior shell while softening the interior contact points for skin comfort.

Stage 4: Structural Integration & Scaling Making the concept physically viable. The Skeleton: Design a hidden internal frame (likely CNC-bent steel rods or a 3D-printed lattice) that follows the most prominent ridges of the paper folds to provide rigidity. Material Selection: * Option A (High-End): Faceted, cast aluminum with a white powder coat. Option B (Soft): Vacuum-formed recycled plastic shell covered in "memory-fold" technical fabric that retains a wrinkled appearance.

Stage 5: Final Prototyping & Material Finish Textural Replication: Apply a matte, slightly porous finish to the material to mimic the tactile feel of heavy-bond paper. Lighting Contrast: Use directional studio lighting in the final renders to emphasize the "tossed" shadows, making the chair look like a giant piece of discarded inspiration. Design Tip: To keep the "tossed" look authentic, avoid symmetry. The most compelling aspect of a crumpled paper ball is its unique irregularity—ensure the left and right sides of the chair are balance-equivalent but not identical
```

<a id="prompt-3ff59dc81b3070dab169"></a>

### 92. 兰亭集序书法帖意境图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case232.jpg" alt="兰亭集序书法帖意境图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-232)

**提示词:**

```text
结合王羲之的《兰亭集序》里的内容，生成一副书法帖图片，要求图片背景符合《兰亭集序》的意境，背景图可以使用蒙版，前景是《兰亭集序》
```

<a id="prompt-42fb89695dfe87265049"></a>

### 93. 杜甫朋友圈吐槽茅屋被掀翻

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case184.jpg" alt="杜甫朋友圈吐槽茅屋被掀翻" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-184)

**提示词:**

```text
杜甫发朋友圈吐槽房顶被风刮没了
```

<a id="prompt-482119392c83105bdf82"></a>

### 94. 视频封面界面图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case111.jpg" alt="视频封面界面图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-111)

**提示词:**

```text
A YouTube thumbnail-style collage for a {argument name="overall mood" default="dark, dramatic, true crime investigation"}. In the center is a highly detailed, close-up portrait of an {argument name="central figure" default="older man with grey hair and deep wrinkles resembling Jeffrey Epstein"}, wearing a black polo shirt, with a faint red glowing outline separating him from the background. On the left side, a {argument name="left background scene" default="tropical island with luxury villas and a flying airplane in a dark sky"}. Below the island, a conspiracy board motif features exactly 2 red push pins connected by 3 thick red strings. On the top right side, a hazy, sepia-toned depiction of the {argument name="right background scene" default="US Capitol building with the silhouettes of 3 men in suits facing it"}. On the bottom right, an open manila folder containing a {argument name="document type" default="heavily redacted dossier with thick black marker lines and a smaller photograph of the central man"}. The overall composition is cinematic, intense, and heavily stylized for a documentary video.
```

<a id="prompt-483948b1c580de7c5eaf"></a>

### 95. 薰衣草AI女孩在记忆空间中

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case95/output.jpg" alt="薰衣草AI女孩在记忆空间中" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/libearal/status/2048026376645861799)

**提示词:**

```text
梦幻的动漫肖像，主角是{argument name="character name" default="Kotori}"，一位精致的虚拟少女，她蜷坐在地板上，双膝紧贴胸口，手臂轻柔地环抱着，以温柔、安静、略带忧郁的表情直视着观众。她有非常长的银紫色双马尾，发梢飘逸，额前有细碎的刘海，装饰着8个可见的发饰：双马尾根部有2个大蝴蝶结，3个小花夹，2个微型蝴蝶夹，和1个心形发针。她的眼睛大而明亮，呈紫色，带有光泽高光。她穿着一件过季的淡紫色露肩针织开衫，宽松地滑落在手臂上，一件淡紫色的蕾丝边睡衣或吊带衫，以及一双柔软的过膝袜，袜子上可见2个蝴蝶结，整体采用和谐的{argument name="color theme" default="soft lavender and pastel purple"}色调。场景设置在一个未来感十足的全息记忆空间内，空间中漂浮着半透明的界面面板，发光的数据窗口，星尘粒子和蝴蝶形状的光纹。左侧包含一个可见的文本面板，显示类似终端的白色文本，内容为：{argument name="screen text" default="memory://\nUser: You\nAI: Kotori\n\nAccessing.\n> initializing\n> loading memory\n> 100%\n> welcome home."}。背景展示一个宇宙数字环境，有一个模糊的行星，多层透明屏幕，以及几个漂浮的图像缩略图，暗示着记忆和角色草图。灯光空灵且为背光，带有彩虹色辉光，柔和的轮廓光，闪烁的尘埃，以及头发和织物上的光泽高光。构图为全帧垂直，以女孩为中心，亲密且情感温暖，高度精细，极致精致，柔焦动漫插画，天空赛博幻想美学，柔和的紫色光芒，精致的蕾丝，丝滑的发丝，以及一个温柔的"AI伴侣在她的记忆世界"氛围。
```

<a id="prompt-4a3bbc1887e9ce027a44"></a>

### 96. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case137.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-137)

**提示词:**

```text
{
  "type": "e-commerce landing page hero section mockup",
  "aesthetic": "clean, bright, airy, feminine, floral accents with purple flowers, {argument name=\"primary color\" default=\"soft pink\"} and white color palette, soft lighting",
  "header": {
    "logo": "{argument name=\"brand name\" default=\"LUMEA BEAUTY\"}",
    "navigation_links": {
      "count": 5,
      "labels": ["特徴", "成分", "お客様の声", "使い方", "FAQ"]
    },
    "cta_button": "今すぐ試す"
  },
  "hero_section": {
    "left_column": {
      "headline": "{argument name=\"headline text\" default=\"鏡を見るたび、うるおう透明感。\"}",
      "subheadline": "乾燥・くすみが気になる肌に。美容成分を贅沢に配合した、毎日のための集中保湿美容液。",
      "feature_badges": {
        "count": 3,
        "style": "pill-shaped with small icons",
        "labels": ["敏感肌OK", "高保湿", "朝晩使える"]
      },
      "bullet_points": {
        "count": 3,
        "style": "pink checkmarks",
        "labels": ["美容成分をしっかり届ける", "ハリ・ツヤのある印象へ", "続けやすいシンプルケア"]
      },
      "cta_buttons": {
        "count": 2,
        "labels": ["初回限定で試してみる >", "成分をチェック >"]
      },
      "trust_badges": "送料無料 / 初回限定 / 定期縛りなし"
    },
    "center_subject": {
      "model": "{argument name=\"model description\" default=\"young East Asian woman smiling, touching her cheek\"}",
      "action": "holding a dropper bottle of serum"
    },
    "right_column": {
      "product_display": {
        "count": 2,
        "items": ["{argument name=\"product type\" default=\"moisturizing boost serum\"} dropper bottle", "packaging box"]
      },
      "stat_cards": {
        "count": 3,
        "style": "floating white rounded rectangles with gold accents",
        "labels": ["満足度 96%", "美容成分 5種配合", "愛用者 12,000人突破"]
      }
    }
  },
  "bottom_section": {
    "benefit_cards": {
      "count": 3,
      "style": "horizontal white rounded rectangles with icons",
      "labels": ["うるおい", "透明感", "使いやすさ"]
    }
  }
}
```

<a id="prompt-4c4b4bd96c00e2b3acea"></a>

### 97. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case135.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-135)

**提示词:**

```text
{
  "type": "website landing page mockup",
  "theme": "men's skincare, sleek, professional, dark mode",
  "color_palette": "{argument name=\"color scheme\" default=\"dark navy blue\"}, white text, subtle blue gradients",
  "header": {
    "logo": "{argument name=\"brand name\" default=\"NEX SKIN\"}",
    "navigation": ["HOME", "PRODUCT", "ABOUT", "FEATURE", "FAQ"],
    "cta_button": "今すぐ始める >"
  },
  "hero_section": {
    "left_column": {
      "headline": "{argument name=\"main headline\" default=\"清潔感は、毎日のスキンケアから。\"}",
      "sub_headline": "男の肌は、もっとシンプルでいい。",
      "body_text": "3 lines of descriptive text about skincare benefits",
      "buttons": [
        {"style": "solid blue", "text": "今すぐ始める >"},
        {"style": "outlined", "text": "詳しく見る >"}
      ],
      "feature_highlights": {
        "count": 3,
        "items": [
          {"icon": "sparkle", "title": "テカリ対策", "subtitle": "皮脂バランスを整える"},
          {"icon": "water drop", "title": "保湿", "subtitle": "うるおいを与え続ける"},
          {"icon": "shield/bottle", "title": "オールインワン", "subtitle": "化粧水・美容液・乳液がこれ1本"}
        ]
      }
    },
    "center_image": {
      "subject": "handsome {argument name=\"target demographic\" default=\"young Asian man\"}",
      "appearance": "clean-cut, dark hair, flawless glowing skin, wearing a black shirt",
      "pose": "hand touching chin thoughtfully",
      "lighting": "dramatic studio lighting highlighting facial structure"
    },
    "right_column": {
      "product_shot": {
        "bottle": "tall cylindrical dark blue bottle with water droplets",
        "labels": ["{argument name=\"brand name\" default=\"NEX SKIN\"}", "{argument name=\"product type\" default=\"ALL-IN-ONE LOTION\"}", "150mL"],
        "base": "textured dark rock surface",
        "badge": "circular outlined badge reading 'これ1本で男の肌悩みをトータルケア'"
      }
    }
  },
  "bottom_stats_bar": {
    "count": 3,
    "items": [
      {"icon": "users", "label": "累計販売本数", "value": "120万本突破"},
      {"icon": "star", "label": "使用感満足度", "value": "92.1%"},
      {"icon": "checklist", "label": "リピート率", "value": "85.3%"}
    ],
    "footnotes": "small legal text on the right"
  }
}
```

<a id="prompt-4faaa15c996f041b088c"></a>

### 98. 抖音直播截图

<img src="https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/liu-yifei-douyin-live-chat.jpg" alt="抖音直播截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/alanblogsooo/status/2044784762594918516)

**提示词:**

```text
9:16 纵向比例，生成一张抖音直播截图，画面中是刘亦菲在直播，刘亦菲手里拿着一块牌子，牌子上写着：今晚直播，欢迎来和亦菲聊天！
```

<a id="prompt-505b59b92f3996835c12"></a>

### 99. 社媒界面截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case260.jpg" alt="社媒界面截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-260)

**提示词:**

```text
生成抖音内容截图，主题：跟上AI浪潮9.9包教会，iPhone尺寸
```

<a id="prompt-51cc0864921054a6ee56"></a>

### 100. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case158.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-158)

**提示词:**

```text
{
  "type": "e-commerce live stream interface mockup",
  "subject": {
    "description": "young Asian woman, long wavy dark hair, wearing a white short-sleeve polo shirt and white pleated tennis skirt, holding a white tennis racket over her right shoulder, looking directly at the camera with a soft expression",
    "background": "soft light grey studio background"
  },
  "layout": {
    "header": {
      "left": {
        "avatar": "female portrait",
        "name": "{argument name=\"host name\" default=\"小鹿运动优选\"}",
        "stats": "12.8万本场点赞",
        "button": "关注",
        "badge": "带货榜第3名"
      },
      "right": {
        "viewer_avatars_count": 3,
        "viewer_count": "1.2万",
        "close_icon": "X"
      }
    },
    "floating_elements": [
      {
        "position": "top right",
        "type": "coupon card",
        "title": "直播间专属券",
        "details": "¥20 满199可用",
        "button": "领取"
      },
      {
        "position": "mid left",
        "type": "campaign text",
        "subtitle": "夏日运动季",
        "headline": "{argument name=\"main headline\" default=\"活力开场\"}",
        "bullet_points_count": 3,
        "bullet_points": ["透气速干", "弹力舒适", "运动百搭"]
      },
      {
        "position": "mid right",
        "type": "product card active",
        "badge": "正在讲解",
        "image": "white polo and skirt flat lay",
        "title": "{argument name=\"product name\" default=\"运动POLO衫套装\"}",
        "details": "白色·M码",
        "price": "{argument name=\"price\" default=\"¥129\"}",
        "button": "去抢购"
      },
      {
        "position": "bottom right",
        "type": "product card secondary",
        "badge": "热卖 x 156",
        "image": "model wearing the outfit",
        "title": "运动POLO衫套装女 透气速干 显瘦百搭",
        "tags": ["7天无理由退货", "运费险"],
        "price": "¥129",
        "button": "抢"
      }
    ],
    "chat_overlay": {
      "position": "bottom left",
      "message_count": 5,
      "messages": [
        "小鹿姐姐: 欢迎新朋友们来到直播间~",
        "运动达人: {argument name=\"chat message\" default=\"这套好看!\"}",
        "卡卡西: 布料透气吗?",
        "小鹿运动优选: 我们这个面料是冰丝速干的，运动出汗也不闷热哦~",
        "用户_6789: 已拍!"
      ],
      "purchase_alert": "用户_6789 等3人 正在去购买"
    },
    "footer": {
      "input_bar": "说点什么...",
      "icons_count": 5,
      "icons": ["smile", "shopping cart", "heart", "share", "more"]
    }
  }
}
```

<a id="prompt-534846f4b3f585697a0d"></a>

### 101. 哔哩哔哩户晨风直播截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case227.jpg" alt="哔哩哔哩户晨风直播截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-227)

**提示词:**

```text
9:16 的图片，生成一张哔哩哔哩直播的截图，里面是 户晨风在直播，户晨风表情开心，手里拿着牌子，牌子里写着 “Austin总太性情了，大家给Austin总点点关注。”
```

<a id="prompt-5832b4e7ff9ea5523a1d"></a>

### 102. 使用此图像作为风格和颜色的参考来创建一个落地页...

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case64/output.jpg" alt="使用此图像作为风格和颜色的参考来创建一个落地页..." width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/D_studioproject/status/2047212826264211540)

**提示词:**

```text
使用此图像作为风格和色彩分级的参考，创建一个落地页。
```

<a id="prompt-5c72c704722102c2dd69"></a>

### 103. 品牌视觉识别图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case95.jpg" alt="品牌视觉识别图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-95)

**提示词:**

```text
{
  "type": "anime-style livestream thumbnail",
  "character": {
    "hair": "{argument name=\"hair color\" default=\"short silver hair with cyan underlights\"}",
    "eyes": "large bright blue",
    "outfit": "white collared shirt, black tie with silver accents, black jacket, black beret with a large blue heart jewel, blue jewel brooch, black choker",
    "pose": "smiling gently, looking at viewer, positioned on the right side"
  },
  "background": "pastel blue with white clouds, sparkles, stars, small bows, and a subtle grid pattern",
  "typography_and_ui": {
    "top_left_speech_bubble": "まったりおしゃべりしよ〜♡",
    "main_title": {
      "text": "{argument name=\"main title\" default=\"雑談配信\"}",
      "style": "large, soft blue gradient, white outline, decorated with small hearts, positioned on the middle-left"
    },
    "bottom_left_badges": {
      "count": 3,
      "style": "white pill-shaped buttons with a purple heart icon on the left",
      "labels": [
        "{argument name=\"badge 1 text\" default=\"初見さん〇\"}",
        "{argument name=\"badge 2 text\" default=\"ポイント回収〇\"}",
        "{argument name=\"badge 3 text\" default=\"ROM〇\"}"
      ]
    },
    "bottom_right_cloud_bubble": "気軽にコメントしてね♡"
  }
}
```

<a id="prompt-5d2195fd87e42d75669b"></a>

### 104. WeChat 聊天界面 智能手机 照片

<img src="https://pbs.twimg.com/media/HGkJjV_aYAAKWes?format=jpg&amp;name=large" alt="WeChat 聊天界面 智能手机 照片" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/Gorden_Sun/status/2047178119854145562)

**提示词:**

```text
生成图像，宽高比3:4。一张真实智能手机照片，手机屏幕显示微信聊天界面，包含中文对话、聊天气泡和Word文档附件。界面有绿色和灰色的气泡。屏幕上有明显的指纹、污渍和划痕。玻璃有强烈的反光，直接光源造成眩光。框架略微倾斜，手持拍摄，自然环境光，不完美的构图，强烈的真实感，日常随意快照，高细节，4K。对话发生在老板和员工之间：员工发送文件给老板，老板回复说会先看一下。
```

<a id="prompt-5fd40d9858d435595565"></a>

### 105. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case106.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-106)

**提示词:**

```text
{
  "type": "YouTube thumbnail graphic",
  "style": "anime, edgy, neon pink and black color scheme, grunge and splatter accents",
  "character": {
    "appearance": "anime girl, {argument name=\"hair color\" default=\"silver\"} hair, cat ears, purple eyes",
    "expression": "{argument name=\"expression\" default=\"shocked and sweating\"}, mouth open",
    "accessories": "black cat hairclip with pink cross, black choker with heart ring",
    "action": "holding a pink smartphone with a swirl logo"
  },
  "layout": {
    "main_title": {
      "position": "bottom center",
      "style": "huge, bold, 3D typography, grunge texture",
      "lines": [
        { "text": "{argument name=\"main title top\" default=\"스레드 논란\"}", "color": "neon pink" },
        { "text": "{argument name=\"main title bottom\" default=\"읽어드림 ;;\"}", "color": "white" }
      ]
    },
    "ui_elements": [
      {
        "type": "social media feed mockup",
        "position": "mid-left",
        "header": "← 스레드",
        "post_count": 3,
        "details": "avatars, Korean text, interaction icons for like, comment, repost"
      },
      {
        "type": "live chat mockup",
        "position": "right edge",
        "message_count": 4,
        "details": "pink user icons, Korean text"
      }
    ],
    "text_callouts": [
      {
        "type": "spiky speech bubble",
        "position": "center top",
        "text": "{argument name=\"speech bubble text\" default=\"이게 맞아?;;\"}"
      },
      {
        "type": "neon box",
        "position": "top right",
        "text": "실시간 반응 중"
      },
      {
        "type": "floating grunge text",
        "position": "far left",
        "line_count": 3,
        "text": ["OO 논란", "충격 실화", "역대급 사건"]
      },
      {
        "type": "handwritten text with arrow",
        "position": "bottom right",
        "text": "여러분의 생각은 어떠신가요?"
      }
    ],
    "logos": [
      {
        "type": "app icon",
        "position": "top left",
        "description": "white swirl logo on black rounded square"
      }
    ]
  }
}
```

<a id="prompt-61e92fc553baaa0abf18"></a>

### 106. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case101.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-101)

**提示词:**

```text
{
  "type": "YouTube thumbnail",
  "style": "High-impact, neon green and black color scheme, cyber business aesthetic",
  "background": "Dark with glowing green grid, upward chart lines, large green arrow",
  "subject": {
    "description": "{argument name=\"subject description\" default=\"Serious Japanese man in a black suit\"}",
    "position": "Right side",
    "props": "Stacks of 10,000 Yen bills in bottom right"
  },
  "layout": {
    "main_title": {
      "text": "{argument name=\"main title\" default=\"月30万 ChatGPT副業 誰でも始めやすい\"}",
      "position": "Center, huge bold white and green gradient text"
    },
    "top_left_badge": {
      "text": "{argument name=\"top left badge\" default=\"再現性高め\"}",
      "style": "Angled neon green box"
    },
    "top_tags": {
      "count": 4,
      "labels": ["初心者OK", "スマホでも可能", "最短で収益化", "具体例つき"]
    },
    "left_bullet_points": {
      "count": 6,
      "style": "Dark boxes with neon green borders and icons",
      "items": [
        "Lightbulb icon: 失敗しない始め方",
        "Yen coin icon: 副業におすすめ",
        "Chart icon: 収益化の流れ",
        "Search icon: 案件の探し方",
        "Chat icon: プロンプト例つき",
        "Clipboard icon: テンプレ付き"
      ]
    },
    "bottom_banner": {
      "text": "{argument name=\"bottom banner text\" default=\"手順を徹底解説\"}",
      "icons": "ChatGPT logo left, upward chart right"
    },
    "bottom_tags": {
      "count": 2,
      "labels": ["{argument name=\"year tag\" default=\"2026年最新版\"}", "即実践できる"]
    }
  }
}
```

<a id="prompt-625e6c1b5653da8a5324"></a>

### 107. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case7.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-7)

**提示词:**

```text
生成一张竖版手机截图风格的图片，整体比例接近 9:16。画面中心偏上是一位真人 coser，扮演上传图片中的二次元角色。人物为写实风格，但五官略带动漫感，皮肤细腻，眼睛稍大，表情温柔地看向镜头，坐在室内的休闲场景中，例如咖啡厅或酒吧吧台前，背景有符合场景的道具。画面最上方加入手机系统状态栏 UI，包括时间、电量、信号、网络等图标，让整张图看起来像手机截图。画面底部叠加一块宽大的半透明 galgame 风格对话框，对话框左侧放一个与画面人物对应的动漫或 Q 版头像；对话框右侧排版文字：第一行用较大字体显示与前面相同的角色名字，下面一到两行显示一段适合这个角色人设的、温柔治愈风格的简体中文台词，由你自动创作。再在对话框下方加一条操作栏，仿照 galgame UI。整体风格高清、细节丰富、光线柔和、二次元与真人写真自然融合。
```

<a id="prompt-63c3c8f52fa5de40540a"></a>

### 108. 社媒界面截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case2.jpg" alt="社媒界面截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-2)

**提示词:**

```text
画一张 X 的内容截图，深色模式，@OpenAI 蓝勾认证账号发推。
 正文的中文内容：
 今天想推荐一位很棒的 AI Builder：Ailln AI。
 他持续在小红书分享 AI 工具、Agent 工作流、自动化实践和真实项目经验，把复杂的 AI 能力讲得清楚、实用、可落地。
 如果你正在关注 AI 产品、效率工具、个人自动化、内容创作和未来工作方式，Ailln AI 是一个非常值得关注的创作者。
 在小红书搜索：Ailln AI
 底部添加一张深色官方宣传风格海报，简洁黑客质感，图片中文本准确显示。
 海报大字： 「Ailln AI」
 副标题： 「A brilliant AI Builder worth following」
 互动数据位于最下方： 评论 8.9K、转发 42K、点赞 298K（亮起）、收藏 34K（亮起）、浏览 32.4M。
 图片比例为3:4，不包含软件其他部分。
```

<a id="prompt-63e28fe5fb9925a29896"></a>

### 109. 玄武门之变动态

<img src="https://pbs.twimg.com/media/HGa2ROUX0AAadhO?format=jpg&amp;name=large" alt="玄武门之变动态" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/Tz_2022/status/2046523491940225366)

**提示词:**

```text
玄武门之变的朋友圈
```

<a id="prompt-643bac322156c0fd5438"></a>

### 110. 直播界面设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case48.jpg" alt="直播界面设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-48)

**提示词:**

```text
A 9:16 aspect ratio image, generating a screenshot of a Douyin livestream where {argument name="celebrity" default="Liu Yifei"} is broadcasting, holding a sign that says "{argument name="sign text" default="Streaming tonight, welcome to join Yifei's chat!"}"
```

<a id="prompt-68b6344caa0d951e2921"></a>

### 111. 日本AI战斗YouTube缩略图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/comparison_case74/output.jpg" alt="日本AI战斗YouTube缩略图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/MoveHiro1219/status/2047698611665096732)

**提示词:**

```text
一个关于AI竞争时代的醒目日本YouTube缩略图，16:9宽屏，高对比度，戏剧性的科技新闻风格。使用黑暗的未来派控制室背景，填充3个发光的全息仪表盘屏幕和边缘的蓝色赛博界面元素。在左侧和中央放置一个明亮的圆形枢纽，标记为"AI"，使用明亮的蓝色，有3个方向性的发光能量箭头向外分支到竞争平台："Google"在左侧的蓝色电力区域，"Claude"在右上角的金色电力区域，"OpenAI"在底部中心的紫红色电力区域。在每个品牌区域下方添加微妙的世界地图或领土战斗可视化效果，如发光的数字大陆或影响区域。在右侧，展示一个从腰部以上的年轻日本女性，面向前方，穿着一条直长的双色假发，一侧是粉彩色，另一侧是粉蓝色，一件印有"OKIHIRO AI Creative"文字的纯白色T恤，和一条浅粉色裙子。她以主持人的姿势将一根食指举在脸旁。她的脸被一个大的软边矩形模糊块完全遮挡。在顶部添加巨大的白色日本头条文本：{argument name="headline text" default="AI戦国時代"}。在它下方，添加第二行粗体金色日本文本：{argument name="subheadline text" default="性能だけの話じゃない"}。在底部放置一个宽大的黑色横幅，上面有巨大的粗体金色日本文本：{argument name="bottom text" default="空気を取った側が勝つ"}。使排版超大，粗糙，且引人注目，带有轻微的发光和阴影。使用黑色、电蓝色、金色、洋红色和霓虹白色的调色板，具有强烈的对比度和缩略图可读性。
```

<a id="prompt-69cb749b4c9d299d981e"></a>

### 112. 个人网页视觉设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case336.png" alt="个人网页视觉设计" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-336)

**提示词:**

```text
原文未公开，案例目标是生成一张高完成度的个人主页视觉设计图。
```

<a id="prompt-6af79922d5b238ba6485"></a>

### 113. 音乐播放器界面

<img src="https://github.com/user-attachments/assets/88f33c6a-c307-4e7a-af7e-5f692cbf41a1" alt="音乐播放器界面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://mp.weixin.qq.com/s/ASxig6mFVYxrIE8-8Fthew)

**提示词:**

```text
创建一个高保真的中文音乐 App 播放器界面截图，采用手机竖屏比例，视觉精致，类似现代流媒体播放器。使用深色模式，背景来自专辑封面颜色的模糊扩散版本。中央放置一张大型方形专辑封面，带有细腻阴影和圆角。

界面要求：
- 顶部状态栏时间为 18:26
- 导航栏左侧是返回箭头，中间是标题，右侧是更多操作图标
- 播放进度条显示当前时间 01:42，总时长 04:18
- 包含随机播放、上一首、播放/暂停、下一首、循环播放控制按钮
- 歌词区显示 5 到 7 行滚动歌词，当前行高亮
- 操作栏包含喜欢、评论、下载、加入歌单、分享
- 底部区域包含设备投播入口和播放队列入口

使用以下精确中文标签与名称：
- title: "正在播放"
- song name: "海边的晚风"
- artist: "林秋"
- album: "夏夜实验室"

歌词排版、按钮图标、反光、阴影和深色层级都应该像真实量产界面，而不是 Dribbble 概念图。
```

<a id="prompt-77de2de1d40fb4b8d439"></a>

### 114. 藏族仪式帽的民族志展示板

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts/main/images/ui_case127/output.jpg" alt="藏族仪式帽的民族志展示板" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/aiistudiocom/status/2051060312351342957)

**提示词:**

```text
使用 REFERENCE_0 和 REFERENCE_1，创建一个专注于仪式帽的干净民族志档案板。使用 REFERENCE_0 作为历史西藏背景和轮廓参考，使用 REFERENCE_1 作为帽子的颜色、材料和装饰参考。将帽子隔离并重建为博物馆风格的对象研究，移除作为主要主体的坐姿身体。将帽子呈现在米白色文档页面上，作为带有小型罗马化的中文学术目录表。在物体周围添加8个带细虚线引导线的编号标注，每个都指向特定结构细节。中心应为帽子的大幅四分之三底视图。另外包括恰好4个补充视图/细节：1个带有淡线绘制躯干的侧面轮廓佩戴草图，1个底面内部视图，1个俯视图，和2个方形材料样本。在右下角添加恰好4个线色样本：蓝色、红色、白色和黄色。在顶部中心添加大标题 {argument name="headline text" default="唐徐帽"}，下方带有罗马化 {argument name="romanization" default="(thang zhwa)"}，加上较小的副标题描述其为高级藏传佛教僧侣的夏季仪式帽。在左上角添加带多个中文短字段的框式元数据面板，在右上角添加版号 {argument name="plate number" default="图版 No. 27"}。在底部添加一个带边框的中文注释段落。整体风格：细致的档案信息图表，人类学目录插图，历史信息丰富，精确的编织纹理，象牙金色底座配蓝色和红色装饰，优雅的印刷布局，细线条和装饰分隔标记，在普通纸背景上的高细节对象渲染。
```

<a id="prompt-7804b87bae6b5a0f23b2"></a>

### 115. 抖音直播截图画面

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case308.jpg" alt="抖音直播截图画面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-308)

**提示词:**

```text
9:16 的图片比例，生成一张抖音直播的截图，里面是 xxx 在直播，xxx 手里拿着牌子，牌子里写着 xxxx。
```

<a id="prompt-7a3387b86450bfae9d7c"></a>

### 116. 极简留白涂鸦手绘草图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case299.jpg" alt="极简留白涂鸦手绘草图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-299)

**提示词:**

```text
以涂鸦速写风表现【主题/主体】，整体呈现快速勾勒、自由变形、即兴手绘与草稿式的视觉效果。线条随手、夸张、可粗细不一，略显凌乱但具有节奏和表现力，强调概括、夸张、趣味和随性，而不是严谨写实或精细刻画。

颜色采用粗糙、干刷感明显的块面表现，可保留不均匀的涂抹痕迹、刷痕、飞白与覆盖感，色彩根据【主题/主体】自动适配，但整体保持涂鸦式、速写式、概括式的表达。不要透明水彩晕染效果，不要细腻水彩过渡，不要纸纹理，不要柔和雾化，不要梦幻质感。

背景以留白为主，保持简洁、轻松、未完成感和设计感，可加入少量辅助性符号、箭头、记号、圈画、重复线、随手写的文字或其他涂鸦元素，以增强速写本或随笔式视觉语言，但不可过于拥挤，不可破坏主体和留白气质。

画面内容不需要预先写清楚，由【主题/主体】自动推演并生成最适合的主体形象、动作、相关元素、符号或简化场景，整体保持统一的涂鸦速写风和夸张概括的表现方式，避免复杂写实背景和过度铺陈。
画面中需自然加入专属签名“voxcat”，作为画面的一部分，位置低调但清晰，可放在左下角、右下角或标题附近，风格需与整体版式统一，像作品署名或设计落款；签名字体精致、克制、高级，不可过大，不可破坏主体构图，不可显得突兀或廉价。
```

<a id="prompt-7bd48af0926043b8666e"></a>

### 117. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case161.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-161)

**提示词:**

```text
{
  "type": "video game screenshot mockup",
  "perspective": "third-person over-the-shoulder",
  "character": {
    "description": "male protagonist seen from behind",
    "clothing": "grey tank top with graphic '{argument name=\"shirt graphic\" default=\"LEONIDA MARINE CENTER\"}', camouflage cargo shorts"
  },
  "environment": {
    "setting": "tropical coastal town, dirt road, sunny daytime with scattered clouds",
    "left_side": "wooden welcome sign reading 'Welcome to {argument name=\"location name\" default=\"LEONIDA KEYS\"} YOUR PARADISE', pink plastic flamingo, tropical foliage, distant water tower",
    "center": "green building with 'FISH' sign and marlin graphic, sign reading 'BAIT TACKLE ICE BEER WINE', pedestrians walking",
    "right_side": "two-story wooden building 'Brian's Boat Works & Marina', 'Brian's Bar' neon sign, parked pickup truck, jet skis on a trailer"
  },
  "ui_elements": {
    "count": 5,
    "components": [
      {
        "position": "top-left",
        "type": "mission objective",
        "text": "{argument name=\"mission title\" default=\"MEET RAUL\"}\n{argument name=\"mission description\" default=\"Raul has some work for you at his boatyard\"}"
      },
      {
        "position": "top-right",
        "type": "status HUD",
        "text": "13:47\n$1,142",
        "icon": "pink palm tree"
      },
      {
        "position": "bottom-left",
        "type": "minimap",
        "description": "circular map with purple border, white map icons including 'N' for north"
      },
      {
        "position": "bottom-left, right of minimap",
        "type": "location text",
        "text": "{argument name=\"location name\" default=\"LEONIDA KEYS\"}\nPALM ISLAND"
      },
      {
        "position": "bottom-right",
        "type": "watermark",
        "text": "{argument name=\"game title\" default=\"GTA VI\"}\nPRE-ALPHA FOOTAGE"
      }
    ]
  }
}
```

<a id="prompt-8160ad9cd9d0d30e3619"></a>

### 118. 视频封面界面图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case103.jpg" alt="视频封面界面图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-103)

**提示词:**

```text
{argument name="pianist" default="Vladimir Horowitz"} performs a {argument name="event" default="live piano recital"} streamed on {argument name="platform" default="YouTube"}
```

<a id="prompt-837f303c846cadcc3f39"></a>

### 119. 直播界面设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case289.jpg" alt="直播界面设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-289)

**提示词:**

```text
生成特朗普和金正恩在抖音直播间打PK的截图
```

<a id="prompt-83c0b2a405ce6e143f20"></a>

### 120. 苏轼被贬首日朋友圈曝光

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case176.jpg" alt="苏轼被贬首日朋友圈曝光" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-176)

**提示词:**

```text
苏轼被贬第一天小红书截图
```

<a id="prompt-893d163ef6fa41a9c6f0"></a>

### 121. 自定义风格 UI 设计系统

<img src="https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main/assets/opennana/custom-style-ui-system.jpeg" alt="自定义风格 UI 设计系统" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/stark_nico99/status/2045836554451706125)

**提示词:**

```text
为我生成一个 xx 风格的 UI 设计系统，包含网页、移动端、卡片、控件、按钮等内容
```

<a id="prompt-8d84b6b1a306a7a69645"></a>

### 122. 古人出现在现代社交平台

<img src="https://pbs.twimg.com/media/HGbtA0KagAADPAR?format=jpg&amp;name=large" alt="古人出现在现代社交平台" width="480">

添加更多故事背景以提高模因质量，例如历史时刻、平台行为或您希望帖子传达的笑点。

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/MrLarus/status/2046627021674168640)

**提示词:**

```text
生成一张 [历史人物姓名] 出现在 [平台名称] 上的截图
```

<a id="prompt-8e4b293a9e4338d4f9b5"></a>

### 123. 信息图可视化设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case51.jpg" alt="信息图可视化设计" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-51)

**提示词:**

```text
{
  "type": "7-day fashion lookbook infographic",
  "header": {
    "title": "{argument name=\"main title\" default=\"一周穿搭指南\"}",
    "subtitle": "{argument name=\"style keywords\" default=\"温柔 | 靓丽 | 优雅\"}",
    "slogan_cn": "优雅不设限，自信每一天",
    "slogan_en": "{argument name=\"english slogan\" default=\"ELEGANCE HAS NO LIMIT, BE CONFIDENT EVERY DAY\"}"
  },
  "subject": "{argument name=\"subject description\" default=\"young elegant Asian woman\"}",
  "layout": {
    "columns": 7,
    "column_elements": [
      "day_header",
      "main_portrait",
      "4_detail_thumbnails",
      "outfit_specs",
      "keywords_colors",
      "3_color_swatches",
      "star_ratings",
      "fabric_price",
      "4_season_icons"
    ],
    "days": [
      { "day": "周一 (MONDAY)", "outfit": "beige blazer suit", "scene": "场景：重要会议 / 正式商务" },
      { "day": "周二 (TUESDAY)", "outfit": "pink blazer suit", "scene": "场景：日常通勤" },
      { "day": "周三 (WEDNESDAY)", "outfit": "cream knit cardigan set", "scene": "场景：生活休闲" },
      { "day": "周四 (THURSDAY)", "outfit": "champagne slip dress", "scene": "场景：外出私会" },
      { "day": "周五 (FRIDAY)", "outfit": "blue knit top, white skirt", "scene": "场景：休闲社交" },
      { "day": "周六 (SATURDAY)", "outfit": "white sports bra, purple leggings", "scene": "场景：运动休闲" },
      { "day": "周日 (SUNDAY)", "outfit": "beige lounge knitwear", "scene": "场景：居家 / 约会" }
    ]
  },
  "footer": {
    "tips": "{argument name=\"footer tips\" default=\"Tips: 根据天气与场合灵活调整，配饰是提升整体造型的关键；保持自信与舒适，才是穿搭的最终目的。\"}",
    "legend": [
      "春: 春季适用",
      "夏: 夏季适用",
      "秋: 秋季适用",
      "冬: 冬季适用"
    ]
  }
}
```

<a id="prompt-8fa48f2ea496fade556f"></a>

### 124. 健身训练信息图

<img src="https://pbs.twimg.com/media/HGbRt9DW8AA5V1S?format=jpg&amp;name=large" alt="健身训练信息图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/MrLarus/status/2046627021674168640)

**提示词:**

```text
为 [主题] 生成一张中文健身信息图。

这张图既要专业，也要便于普通成年人作为训练参考。除非另有说明，否则默认受众是没有重大伤病的健康成年人，目标是增肌并提升基础力量，水平为新手到中级，训练场景是普通健身房，总训练时长控制在 40 到 60 分钟内。

根据训练主题自动选择输出形式：

1. 如果主题是胸、背阔肌、肱二头肌、腹肌、肩部或腿部等肌群 / 身体部位，就生成对应部位的训练计划信息图。
2. 如果主题是引体向上、俯卧撑、双杠臂屈伸或深蹲等动作 / 技能目标，就生成动作解锁或进阶计划信息图。

采用清晰、现代、专业、易读的中文竖版信息图风格。视觉设计应干净，适合社交分享或个人训练参考。不要写长段落。每个模块都应使用简短短语，数字信息要足够突出。

信息图必须包含：
A. 主标题与副标题区域
B. 训练目标区域
C. 热身区域
D. 4 到 6 个核心动作组成的主要训练区域
E. 进阶或解锁逻辑区域
F. 替代动作区域
G. 执行提醒区域
H. 恢复建议区域
I. 视觉要求：现代、干净、专业、模块化卡片布局

最终结果应是一张完整信息图，而不是纯文字段落。
```

<a id="prompt-910871db13dc30112a15"></a>

### 125. Douyin直播销售截图

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/case_case84/output.jpg" alt="Douyin直播销售截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/laogeai/status/2047228458351120625)

**提示词:**

```text
生成一个抖音直播的截图 里面是一个美女在直播，在卖丝袜和内衣，她的在线人数是99996，热度是18+，有个叫小互的大哥，给她刷了一个飞机礼物
```

<a id="prompt-9379ad8cb3d6e41899ee"></a>

### 126. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case131.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-131)

**提示词:**

```text
{
  "type": "UI/UX 着陆页模型",
  "theme": "暗黑模式，精致现代美学，玻璃拟态效果，{argument name=\"primary accent color\" default=\"neon purple and blue\"} 发光强调色",
  "header": {
    "logo": "{argument name=\"brand name\" default=\"goViralX\"}",
    "top_right_tag": "病毒式营销案例研究"
  },
  "layout": {
    "sections": [
      {
        "name": "英雄区",
        "headline": "{argument name=\"hero headline\" default=\"How We Created 10M+ Viral Impact\"}",
        "subheadline": "3天引爆全网, 助力品牌实现指数级增长",
        "stats_row": {
          "count": 4,
          "labels": ["总播放量", "互动率", "转化咨询", "执行周期"],
          "values": ["{argument name=\"main statistic\" default=\"10,240,000+\"}", "18.7%", "3,200+", "72小时"]
        },
        "visual": "一个人穿着连帽衫凝视发光的数字屏幕和图表的电影镜头，带有大型播放按钮叠加层"
      },
      {
        "name": "策略",
        "title": "我们的3天执行策略",
        "layout_type": "垂直时间线",
        "steps_count": 3,
        "elements_per_step": ["时间线节点", "标题", "要点", "带播放按钮的视频缩略图", "描述框"]
      },
      {
        "name": "表现",
        "title": "数据驱动的表现",
        "left_column": {
          "stat_cards_count": 4,
          "values": ["10M+", "43%", "28,000+", "3,200+"]
        },
        "right_column": {
          "charts_count": 2,
          "chart_1": "显示7天增长并在第3天达到峰值的线图",
          "chart_2": "显示平台分布的水平分段条形图（TikTok 52%，Instagram 24%，X 15%，YouTube 9%）"
        }
      },
      {
        "name": "成功的关键",
        "title": "病毒式成功的3个关键",
        "cards_count": 3,
        "card_elements": ["发光图标（火焰、目标、天线）", "标题", "描述", "查看详情链接"]
      },
      {
        "name": "社会认同",
        "title": "创作者和品牌信赖的选择",
        "left_column": {
          "logos_count": 8,
          "grid": "2x4",
          "brands": ["SHEIN", "SHOPLINE", "Blueglass", "instacart", "lemon8", "mi", "CIDER", "bellroy"]
        },
        "right_column": {
          "testimonial_cards_count": 2,
          "elements": ["引述", "作者头衔（SaaS创始人，增长经理）"]
        }
      },
      {
        "name": "行动号召",
        "title": "准备好病毒式传播了吗？",
        "interactive_elements": ["文本输入框", "带有文本'{argument name=\"call to action text\" default=\"获取专属增长方案 ->\"}'的发光按钮"],
        "visual": "带有紫色和蓝色火焰的火箭发射3D渲染图"
      }
    ]
  }
}
```

<a id="prompt-99b400c527d380f7c16b"></a>

### 127. 朋友圈截图生成

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case335.png" alt="朋友圈截图生成" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-335)

**提示词:**

```text
原文未公开，重点展示 GPT-Image2 在高仿社交截图与中文排版场景中的能力。
```

<a id="prompt-9c734ff52a305db02534"></a>

### 128. 一张中文健身信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case183.jpg" alt="一张中文健身信息图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-183)

**提示词:**

```text
请生成一张中文健身信息图，主题为：【xxx】。

要求这张图既专业又实用，适合普通成年人作为训练参考。默认对象为无严重伤病的健康成年人；如果没有额外说明，默认训练目标为“增肌 + 基础力量提升”，默认训练水平为“新手到中级之间”，默认训练场景为“普通健身房”，默认单次训练时长控制在 40–60 分钟内。

请根据【训练主题】自动判断输出类型：

1）如果【训练主题】是某个肌群或身体部位（例如：胸肌、背阔肌、肱二头肌、腹肌、肩部、腿部等），请输出一张“该部位训练计划信息图”。
2）如果【训练主题】是某个动作或技能目标（例如：引体向上、俯卧撑、双杠臂屈伸、深蹲等），请输出一张“动作解锁 / 进阶训练计划信息图”。

整张图请采用清晰、现代、专业、易读的中文信息图风格，竖版排版，视觉简洁，重点突出，适合社交媒体分享或训练参考卡片。不要写成长篇大论，每个模块用简洁短句呈现，数字信息要醒目。

这张信息图必须包含以下内容：

【A. 标题区】
- 主标题：直接写【训练主题】训练计划 / 解锁计划
- 副标题：自动补充适用人群、目标、训练场景、建议时长
例如：适合新手 / 增肌导向 / 健身房版 / 45分钟

【B. 训练目标区】
用简洁语言说明：
- 这次训练主要针对什么
- 主要目标是什么（增肌 / 力量 / 技能解锁 / 核心控制等）
- 本次训练的重点刺激或能力提升方向

【C. 热身区】
给出 2–4 个热身建议，简洁列出即可，例如：
- 动态活动
- 目标肌群激活
- 轻重量预热组
每项可附一句说明

【D. 主训练区】
这是核心部分，请列出 4–6 个主要训练动作。
每个动作都要包含以下信息：
- 动作名称
- 训练作用 / 针对部位
- 组数 × 次数（或时间）
- RIR 建议
- 每组间休息时间
- 动作关键要点（1–2 条）
- 常见错误（1 条即可）

请确保动作安排合理：
- 先复合动作，后孤立动作
- 整体训练量适中
- 新手不要安排过度极限训练
- 主动作通常建议 RIR 1–3
- 孤立动作可建议 RIR 0–2
- 如果是腹肌或核心类动作，可用“秒数 / 次数”形式
- 如果是技能类动作，请优先安排“前置能力动作 + 过渡动作 + 目标动作尝试”

【E. 进阶 / 解锁逻辑区】
根据主题自动生成：
- 如果是肌群训练：写“如何渐进超负荷”，例如达到次数上限后再加重量、优先保证动作标准等
- 如果是动作解锁：写“分阶段进阶路径”，例如从悬垂、肩胛引体、离心训练、弹力带辅助，到标准动作完成

【F. 替代动作区】
请给出 2–3 个替代动作，适用于以下情况：
- 没有器械
- 家庭训练
- 当前能力不足
- 某些动作做不了

【G. 执行提醒区】
请给出 4–6 条简洁提醒，例如：
- 动作标准优先于重量
- 不要每组都练到力竭
- 同肌群建议间隔 48–72 小时
- 疼痛不等于正常发力
- 睡眠不足时可适当减少训练量

【H. 恢复建议区】
简洁说明：
- 训练后恢复重点
- 蛋白质 / 睡眠 / 恢复间隔建议
- 1 句风险提醒（如有明显疼痛应停止并评估）

【I. 视觉设计要求】
- 整体为单页中文信息图
- 竖版排版
- 风格现代、清爽、专业、健身感强
- 使用模块化卡片布局
- 重点数字（组数、次数、RIR、休息）要醒目
- 可加入简洁的人体肌群图标、哑铃、杠铃、引体向上等小图标
- 颜色保持高级、干净、有运动感
- 中文文字必须清晰、准确、易读
- 避免过多装饰，强调实用性与执行性

请最终输出为“一张完整的信息图内容”，而不是只给普通段落文字。
```

<a id="prompt-9d1078ccfdd5ae2462cd"></a>

### 129. AAA电子游戏截图概念设计

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case47/output.jpg" alt="AAA电子游戏截图概念设计" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/ChiefMonkeyMike/status/2047828814580138156)

**提示词:**

```text
生成一个AAA级电子游戏的截图，基于《模拟人生：荒野求生》续作可能的样子。https://t.co/aL7hMdUYvj
```

<a id="prompt-a2575ede68e326449f92"></a>

### 130. 基于生成的角色，帮我生成一个截图的截图...

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case63/output.jpg" alt="基于生成的角色，帮我生成一个截图的截图..." width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/khaiinit/status/2047219694130827273)

**提示词:**

```text
基于生成的角色，帮我生成一个以*塞尔达：风之杖*为主题的PVP游戏截图
```

<a id="prompt-a28b40eb058afc663167"></a>

### 131. 精美潮汕菜馆菜单图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case294.jpg" alt="精美潮汕菜馆菜单图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-294)

**提示词:**

```text
生成一张潮菜馆菜单图
```

<a id="prompt-a2d389b723dc3f6be647"></a>

### 132. 瑜伽裤女主播展示身材曲线

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case255.jpg" alt="瑜伽裤女主播展示身材曲线" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-255)

**提示词:**

```text
手机竖屏界面，短视频直播平台风格，一位年轻亚洲女主播在家中直播带货，主播穿着贴身瑜伽裤与简约上衣，身材曲线自然，正在侧身展示裤子的线条与弹性，动作自然不夸张；
```

<a id="prompt-a3f1ab2611cd6f336ae8"></a>

### 133. 视频封面界面图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case110.jpg" alt="视频封面界面图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-110)

**提示词:**

```text
Thumbnail for a YouTube unboxing video, a video of {argument name="topic" default="opening all overdue bills"}, {argument name="quantity" default="100 in a row"}
```

<a id="prompt-a871cb063988c7e01463"></a>

### 134. Netflix 首页主视觉 UI

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case387.jpg" alt="Netflix 首页主视觉 UI" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-387)

**提示词:**

```text
Create a Netflix homepage UI featuring a main hero film with its title and still generated from the uploaded reference.
```

<a id="prompt-b3a0014dcaaa7d0e0ace"></a>

### 135. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case99.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-99)

**提示词:**

```text
{
  "type": "promotional banner / YouTube thumbnail",
  "style": "high contrast, flashy, professional, {argument name=\"theme color\" default=\"gold and black\"} palette, glowing light rays, sparkling particles",
  "subject": {
    "description": "{argument name=\"subject description\" default=\"confident young Asian man in a dark suit with arms crossed\"}",
    "pose": "looking upwards to the right",
    "props": "glowing open laptop in front of him"
  },
  "layout": {
    "background": "dark with radiant gold light bursts",
    "text_sections": {
      "top_left_badge": "[保存版]",
      "top_header": "{argument name=\"top text\" default=\"知識ゼロからでも今日から始められる！ AIで稼ぐ力を最短で手に入れる！\"}",
      "main_title": {
        "text": "{argument name=\"main title\" default=\"AI副業 完全攻略\"}",
        "style": "large, bold, 3D gold and white typography"
      },
      "subtitle_box": "{argument name=\"subtitle\" default=\"初心者でも月10万\"}",
      "top_right_badge": {
        "style": "gold laurel wreath",
        "text": "2026年版 最新版"
      },
      "middle_right_tags": {
        "count": 3,
        "style": "stacked gold-bordered boxes",
        "labels": ["最短で収益化", "具体例つき", "誰でも始めやすい"]
      },
      "middle_right_ribbon": {
        "style": "red ribbon banner",
        "text": "手順を徹底解説"
      },
      "bottom_left_tags": {
        "count": 6,
        "style": "2x3 grid of gold-bordered boxes",
        "labels": ["おすすめツール紹介", "収益化の流れがわかる", "失敗しない始め方", "作業時間を最小化", "テンプレ付き", "再現しやすい方法"]
      },
      "bottom_footer": "迷わず稼げる！AI副業の教科書",
      "bottom_right_badge": {
        "style": "gold laurel wreath",
        "text": "テンプレ付き"
      }
    }
  }
}
```

<a id="prompt-b526e258a0f99be4a5d5"></a>

### 136. 粉色动漫奈津树横幅

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case98/output.jpg" alt="粉色动漫奈津树横幅" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/mirochill/status/2047639852485620070)

**提示词:**

```text
一张宽银幕电影布局的亮面粉彩粉色动漫横幅，主题围绕可爱浪漫和甜点。在右侧放置一个自信的青少年动漫女孩，从大腿以上部位展示，有着蓬松的短波波发，发色为{argument name="hair color" default="soft pink"}，粉红色大眼睛，温柔的微笑，双臂交叉。她穿着日本校服：1件棕色西装外套，1件白色衬衫，1条红色丝带蝴蝶结在衣领处，1条深蓝紫色格子裙。添加2个红色丝带发饰，一个较大的侧边蝴蝶结和一个较小的丝带装饰。在左半部分，展示大型手写体名称{argument name="character name" default="Natsuki"}，采用粗体亮面3D草书，白色到粉色的填充，亮粉色轮廓，柔和斜面，微妙的投影，闪光效果，以及融入字母中的小心形装饰。背景应为分层剪贴画拼贴，采用粉红色调，带有笔记本纸纹理，微弱的网格和撕纸细节，散落的涂鸦心形、花瓣、闪光效果和可爱的烘焙图案。在右上和右中位置，在她身后包含恰好4张固定或粘贴的素描风格肖像卡，像重叠的宝丽来照片一样排列。在前景中左下和左下中心位置添加恰好2个纸杯蛋糕，都有粉色糖霜，条纹包装纸，以及小心形顶饰或糖果装饰。用流动的缎带和蝴蝶结来构图：恰好4个主要缎带元素可见，包括1个左上角的蝴蝶结，1个左下角的蝴蝶结，以及2条长卷曲缎带扫过顶部和右边缘。使用柔和的高细节动漫插画风格，精致的光照，梦幻的光晕，浪漫的情人节色调，精致的纹理，以及干净有力的缩略图式构图。
```

<a id="prompt-b59947ffa13e7f06231a"></a>

### 137. 大唐玄武门之变的朋友圈

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case167.jpg" alt="大唐玄武门之变的朋友圈" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-167)

**提示词:**

```text
玄武门之变的朋友圈
```

<a id="prompt-b85b70973b6a4590e88f"></a>

### 138. 日本社交游戏Gacha界面

<img src="https://pbs.twimg.com/media/HGayF3iagAARTZ1?format=jpg&amp;name=large" alt="日本社交游戏Gacha界面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/the_wheel_2024/status/2046519658166317160)

**提示词:**

```text
生成一个日系社交游戏的扭蛋界面。
```

<a id="prompt-b860aaaa66cf4bd19155"></a>

### 139. 抖音美女直播间界面设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case288.jpg" alt="抖音美女直播间界面设计" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-288)

**提示词:**

```text
生成抖音直播间界面，内容是一个美女在直播
```

<a id="prompt-bd3e0abcffc198f82e6a"></a>

### 140. 视频封面界面图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case92.jpg" alt="视频封面界面图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-92)

**提示词:**

```text
An anime-style YouTube stream thumbnail featuring a cheerful female VTuber. She has long {argument name="hair color" default="pink with light blue inner highlights"} hair, blue eyes, and wears black and white cat-ear headphones with a boom mic. She wears a white collared shirt with a black and pink star ribbon and a black choker, smiling with one hand near her chin. The background is a gaming room with {argument name="room lighting" default="purple and blue neon"} lighting, showing a desk equipped with 1 white keyboard, 1 mug, 1 glowing cat figure, 1 game controller, and 1 streaming microphone. The left side features large, bold, pop-art Japanese typography: a bright pink top word "{argument name="main text line 1" default="雑談"}" and a bright blue bottom word "{argument name="main text line 2" default="配信"}". Below is a pink banner reading "{argument name="subtitle text" default="今夜もゆるっとトーク!"}". A red "LIVE" badge sits in the top left. Floating speech bubbles, stars, and hearts decorate the composition.
```

<a id="prompt-bfa7e04f75b6fd96ffc0"></a>

### 141. 梦幻的动漫早见横幅

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case99/output.jpg" alt="梦幻的动漫早见横幅" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/mirochill/status/2047639852485620070)

**提示词:**

```text
宽幅动漫横幅插画，展示{argument name="character name" default="Sayori"}在明亮梦幻的教室中，采用精致的高端视觉小说风格渲染，带有柔和的绘画感光线、温暖的粉彩色调和闪烁的氛围。展示一个快乐的少女学生，有着短而蓬松的珊瑚粉色头发，凌乱的波波头层次，以及头右侧的大红色蝴蝶结，穿着日本校服，包括浅棕色西装外套、白色衬衫、红色丝带领带、棕色毛衣背心和海军蓝百褶裙。她站在中心偏左的位置，双臂张开，做出邀请性的、快乐的姿势，仿佛在欢迎观众，头发和衣服带有动态透视和柔和的动作。她的脸被一个扁平的矩形肤色遮挡块有意遮挡。在她身后，高大的教室窗户展现出鲜艳的蓝色天空，点缀着柔软的白云，温暖的阳光照射进来。图像的右半部分有一个装饰性的大号手写脚本，内容为{argument name="headline text" default="Sayori"}，奶油白色的字母，带有柔和的橙金色轮廓和光晕，融入类似剪贴簿的墙壁背景。用悬挂在绳子上的照片打印件环绕场景，包括天空照片和向日葵照片，加上手绘的云朵、星星、爱心和太阳涂鸦。添加蓝色和黄色纸星星、丝带、漂浮的彩纸屑、蓝色纸飞机、笔记本页面、螺旋素描本和散落的文具元素。在前景和边缘显著放置向日葵，带有温暖的金色散景和柔和的景深。使构图充满活力、可爱、怀旧和情感振奋，就像优质的动漫主题YouTube横幅或角色致敬标题，超详细、干净、时尚、明亮且注重冲击力。
```

<a id="prompt-c03aaedef91fe54333f9"></a>

### 142. 奢华个人色彩档案信息图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case364.jpg" alt="奢华个人色彩档案信息图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-364)

**提示词:**

```text
LUXURY PERSONAL COLOR PROFILE — EDITORIAL LAYOUT
Studio portrait of subject as anchor — skin retouched to luminous glass-like perfection, preserved natural structure, realistic pore texture, soft directional key lighting, no facial alteration. Background: warm ecru parchment with subtle linen grain texture. Layout reads like a Vogue Italia beauty supplement printed on heavyweight matte stock. Structured editorial grid, 3-column asymmetric, wide negative space, serif condensed display headers, all labels in spaced uppercase tracking, cohesive warm ivory/sand/ecru background system throughout all panels, ultra-photorealistic 8K, soft diffused studio lighting, flat elegant surfaces, no drop shadows.
PANELS:
① UNDERTONE DIAGNOSIS — Tonal spectrum bar from cool ash to warm amber, precision needle marker on subject's reading. Labels: Cool / Neutral-Cool / Neutral / Neutral-Warm / Warm. Fine annotation text.
② SEASONAL COLOR PALETTE — 10–12 fabric-textured swatches in subject's optimal season. Each labeled with poetic color name and HEX. Grouped: Power Colors / Softest Options / Harmonizing Neutrals.
③ COLORS TO AVOID — Desaturated row of clashing tones with fine editorial strikethrough. Clean, non-harsh presentation.
④ MAKEUP CARTOGRAPHY — Eyeshadow gradient dust swatches / blush tones fanned on skin strip / lip spectrum barely-there to bold / highlighter finishes labeled: champagne, rose gold, pearlescent ivory.
⑤ HAIR COLOR SPECTRUM — Curved gradient strip: base, dimension, highlight, contrast tones. Gold bracket indicators on best options.
⑥ JEWELRY & METAL GUIDE — Flat-lay editorial render: yellow gold, rose gold, oxidized silver, platinum finishes alongside complementary stone tones. Minimal styling.
⑦ YOU IN YOUR PALETTE — 3–4 editorial lookbook frames, subject in palette-correct outfits. Mood labels: Quiet Luxury / Off-Duty Editorial / Evening Presence.
⑧ CAPSULE WARDROBE GRID — Outfit flatlay: tops, bottoms, outerwear, shoes, bag — all palette-correct. Coordinating lines showing interchangeability. Net-a-Porter editorial aesthetic.
⑨ PRINTS & PATTERNS — 4 fabric print thumbnails: micro geometric, tonal abstract, classic stripe, floral scale. One-line styling note per print.
⑩ STYLE ARCHETYPE — Single typographic panel. Style identity title set large (e.g. "Modern Romantic / Warm Classicist"). Three defining aesthetic words. Four-line editorial wardrobe philosophy note.
RENDER SPECS: Ultra-photorealistic, 8K, editorial magazine print quality, warm neutral color grading, soft diffused studio lighting consistent across all panels, one serif display font + one fine sans-serif body font, no gradients, flat matte surfaces only.
```

<a id="prompt-c12c5156d1bb45b2dc0a"></a>

### 143. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case130.jpg" alt="界面交互设计图" width="480">

- **分类:** 品牌与标志
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-130)

**提示词:**

```text
{
  "type": "品牌标识和商品设计板",
  "theme": {
    "color_palette": "{argument name=\"主题色\" default=\"粉彩色\"} 和白色",
    "motif": "{argument name=\"图案\" default=\"樱花\"} 和粉色爱心"
  },
  "character": {
    "description": "棕色短波波头的动漫女孩，粉色眼睛，穿着白色连帽衫，温柔微笑"
  },
  "branding": {
    "main_logo": "{argument name=\"角色名\" default=\"癒音ちー\"}",
    "sub_logo": "{argument name=\"角色副标题\" default=\"ゆおんちー\"}"
  },
  "layout": {
    "sections": [
      {
        "type": "横幅标题",
        "position": "顶部",
        "elements": ["大型主标志", "副标志", "樱花图形", "右侧角色肖像"]
      },
      {
        "type": "产品包装",
        "position": "中左",
        "elements": ["1个带心形透明窗口的方形盒子，展示粉色爱心糖果", "盒子上的角色插图", "2个单独的糖果包装", "5个散落的爱心糖果"]
      },
      {
        "type": "宣传海报",
        "position": "中右",
        "elements": ["角色肖像", "心形糖果碗", "主标志", "文字 '4.26 新开业'", "文字 '{argument name=\"社交账号\" default=\"@yuonchii\"}'"]
      },
      {
        "type": "水平网页横幅",
        "position": "中下",
        "elements": ["主标志", "樱花", "右侧角色肖像"]
      },
      {
        "type": "社交媒体资料模拟",
        "position": "左下",
        "elements": ["带标志的头部图片", "1个圆形个人资料图片", "账号 '{argument name=\"社交账号\" default=\"@yuonchii\"}'", "1个关注按钮", "模拟的简介文字"]
      },
      {
        "type": "商品系列",
        "position": "右下",
        "count": 9,
        "items": ["1个带标志的白色T恤", "1个带角色的白色马克杯", "4个圆形徽章", "1个亚克力钥匙扣", "2个糖果包装"]
      }
    ]
  }
}
```

<a id="prompt-c3c35d9f1ef50ec05c86"></a>

### 144. 吉利银河暗黑中控界面

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case177.jpg" alt="吉利银河暗黑中控界面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-177)

**提示词:**

```text
帮我生成一个吉利银河m9的中控界面，尺寸为21:9，暗色系
```

<a id="prompt-c42af55d1cfa93c4bdbf"></a>

### 145. 紫色动漫百合横幅

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/ui_case97/output.jpg" alt="紫色动漫百合横幅" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/mirochill/status/2047639852485620070)

**提示词:**

```text
精致的动漫风格横幅插图，采用梦幻的紫色调，宽银幕构图，展现黄昏时分宁静的文学房间。右侧，一位美丽的少女动漫角色{argument name="character name" default="Yuri"}坐在一张木桌旁，旁边是一扇带有紫色窗帘的大窗户，她将一本深色精美精装书抱在胸前，害羞地低头凝视，表情内向沉思。她有非常长的直{argument name="hair color" default="深紫色"}头发，带有光泽高光，侧刘海，一个小发夹，和紫色的眼睛，穿着日本校服，包括灰色西装外套、白色衬衫、红色丝带领带和深色裙子。在图像的左中心，发光的书法文字{argument name="title text" default="Yuri"}以明亮的霓虹薰衣草色字体大字呈现，带有优雅的装饰、一个小心和装饰性的精细花纹，像魔法排版一样融入场景。桌子上恰好有8个可见的物品组：前景中央的1本打开的书，1个带有白色羽毛笔的黑色墨水瓶，蜡烛附近的1本合上的书，纸张下的1摞书，前面的1张松散的手写页，桌上的1小朵紫色花，右侧的1个带托盘的花纹瓷茶杯，以及最右侧的1摞深色书。额外的背景细节包括恰好6个装饰性环境元素：左侧玻璃座中的1支点燃的蜡烛，左前景的1簇紫色花，左上方的1束悬挂的紫色花朵，右上方的1个固定的植物笔记，右背景的1个带有书籍和花朵的书架，以及透过窗户可见的1个日落天空。添加飘落的花瓣，微弱的手写纹理，框架周围的华丽金色边框，柔和的体积窗光，微妙的闪烁，丰富的阴影，以及浪漫忧郁的氛围。高度详细，干净的线条艺术，光泽的动漫渲染，优质的视觉小说关键艺术，非常适合小众动漫横幅或角色主题缩略图。
```

<a id="prompt-c47d514addb26e5bc638"></a>

### 146. 直播截图

<img src="https://github.com/user-attachments/assets/be639d3b-617b-4332-98eb-4deb2484ac66" alt="直播截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image)

**提示词:**

```text
生成一张 TikTok 直播截图，画面里是一位漂亮女性正在直播。
```

<a id="prompt-c4fa379c092c8a8d52fb"></a>

### 147. 明朝登基宝玉的推文页面

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case292.jpg" alt="明朝登基宝玉的推文页面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-292)

**提示词:**

```text
创建一个宝玉（查阅 https://x.com/dotey 这个推主的主页及部分推文）穿越到明朝，登基之后依据其业务/个性，绘制的其新的X帖子页面。
```

<a id="prompt-cb9fab3fc8ad65009650"></a>

### 148. 综合应用场景图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case97.jpg" alt="综合应用场景图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-97)

**提示词:**

```text
Create a high-quality Japanese {argument name="thumbnail type" default="webinar thumbnail"}. {argument name="aspect ratio" default="16:9 widescreen"}. There is a lot of text, but the main copy stands out clearly.
```

<a id="prompt-cd0b91554fc2db92d8c5"></a>

### 149. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case323.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-323)

**提示词:**

```text
Create a hyper-realistic, cinematic Instagram post layout where the Instagram UI exists as a physical, tangible 3D object, photographed like a premium commercial product shot. The result should feel indistinguishable from a real studio photograph.
Instagram Frame (UI Accuracy – Critical)
Authentic Instagram interface rendered as a solid white physical 3D card
Smooth matte plastic surface with subtle micro-texture
Slight thickness visible on edges, realistic bevels
Perfectly rounded corners (exact Instagram radius)
Soft studio reflections and realistic edge highlights
Top Bar (Pixel-accurate UI):
Circular profile avatar on the left
Username text: “June” in Instagram’s default bold UI font
Light blue FOLLOW button with correct proportions
Three-dot menu icon aligned to the far right
Exact spacing, typography, and icon sizing matching the real Instagram app
Aspect ratio 1:1, centered, balanced, premium composition.
Main Subject (Pose – Match Reference Image Exactly)
A photorealistic athletic woman partially emerging out of the Instagram frame into real 3D space
Seated pose identical to the reference image:
Both legs bent and angled to the side
One knee slightly raised and closer to the chest
Arms gently wrapped around the raised knee
Hands relaxed, fingers naturally resting
Torso leaning slightly back against the frame edge
Expression: calm, thoughtful, self-assured
Gaze: looking slightly to the side and upward, not engaging the camera
Natural body proportions, relaxed posture, editorial realism
No exaggerated curves, no artificial posing
Clothing (Nike Only – Realistic Fit)
Muted ivory / off-white Nike fitted short-sleeve blouse
Soft neutral tone that contrasts beautifully with the background
Visible white Nike swoosh
Natural fabric stretch and tension
Deep blue Nike athletic pants, length up to the knee
Tailored, performance-fit silhouette
Realistic fabric weight with subtle folds at the knee bend
Clean stitching and breathable sports material
Clean white Nike sneakers
Slight wear realism
Correct sole texture and stitching
Premium sportswear look, real commercial styling
No distortion, no fantasy fashion
Background (Inside the Instagram Post Only)
Dark indoor gym or studio environment
Cool blue and muted purple cinematic lighting
Soft haze in the background
Subtle volumetric light beams barely visible
Shallow depth of field, background softly blurred
Subject and Instagram frame remain sharp and dominant
Lighting & Photorealism
Studio-grade cinematic lighting
Soft key light illuminating the subject naturally
Gentle rim light outlining the body and Instagram frame
Realistic skin texture with visible pores and natural highlights
Accurate contact shadows where the subject touches the frame
Physically correct light falloff and reflections
Footer UI (Engagement Section)
Instagram action icons: like, comment, share, save (accurate icons)
Text visible: “785 likes”
Caption begins with June
Caption text:
Freedom isn’t found in comfort.
It’s built in the quiet moments where discipline meets belief.
Hashtags partially visible and naturally cropped
Overall Style & Quality
Ultra-high resolution
Advertising-grade realism
Clean, modern, editorial Instagram aesthetic
Hyper-realistic blend of 3D object + real photography
No extra elements
No text errors
No distortion
Looks like a real product photoshoot, not AI art
```

<a id="prompt-d315e4c61864a60b593f"></a>

### 150. 特朗普太空直播间破千万

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case164.jpg" alt="特朗普太空直播间破千万" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-164)

**提示词:**

```text
一张9:16竖屏的抖音直播截图，太空直播风格。特朗普穿着NASA风格的白色宇航服，头盔面罩半开，露出他标志性的金色头发和笑容。他漂浮在国际空间站的舱内进行直播，处于微重力失重状态，身体微微悬浮。他双手举着一块固定在宇航服上的金属铭牌，铭牌上用NASA风格的印刷体写着"感谢松果先森送的大火箭"。身后圆形舷窗外可以看到蓝色的地球和深邃的太空。直播界面显示在线人数"地球+火星共888万"。弹幕区有人刷"真的在太空直播？""松果先森的火箭把你送上天了"。屏幕中央的火箭礼物特效与窗外太空中一枚正在发射的真实火箭遥相呼应，形成虚实结合的效果。舱内有各种精密仪器和控制面板，绿色和蓝色的指示灯闪烁。画面色调以深蓝、白色和金色为主，舷窗外的星光点缀其间，8K超高清，电影《地心引力》级别的视觉效果。
```

<a id="prompt-d52749968572ff3cd40a"></a>

### 151. 封面排版设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case280.jpg" alt="封面排版设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-280)

**提示词:**

```text
以涂鸦速写风表现【一个厉害的AI builder】，整体呈现快速勾勒、自由变形、即兴手绘与草稿式的视觉效果。线条随手、夸张、可粗细不一，略显凌乱但具有节奏和表现力，强调概括、夸张、趣味和随性，而不是严谨写实或精细刻画。  颜色采用粗糙、干刷感明显的块面表现，可保留不均匀的涂抹痕迹、刷痕、飞白与覆盖感，色彩根据【主题/主体】自动适配，但整体保持涂鸦式、速写式、概括式的表达。不要透明水彩晕染效果，不要细腻水彩过渡，不要纸纹理，不要柔和雾化，不要梦幻质感。  背景以留白为主，保持简洁、轻松、未完成感和设计感，可加入少量辅助性符号、箭头、记号、圈画、重复线、随手写的文字或其他涂鸦元素，以增强速写本或随笔式视觉语言，但不可过于拥挤，不可破坏主体和留白气质。  画面内容不需要预先写清楚，由【一个厉害的AI builder】自动推演并生成最适合的主体形象、动作、相关元素、符号或简化场景，整体保持统一的涂鸦速写风和夸张概括的表现方式，避免复杂写实背景和过度铺陈。 画面中需自然加入专属签名"BlanPlan"，作为画面的一部分，位置低调但清晰，可放在左下角、右下角或标题附近，风格需与整体版式统一，像作品署名或设计落款；签名字体精致、克制、高级，不可过大，不可破坏主体构图，不可显得突兀或廉价。
```

<a id="prompt-d9b03e1696bc4440b9a1"></a>

### 152. 综合应用场景图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case37.jpg" alt="综合应用场景图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-37)

**提示词:**

```text
Create {argument name="quantity" default="24"} LINE stickers of {argument name="animals" default="animals"} in a quirky hand-drawn style. Target {argument name="target audience" default="Japanese Gen Z"} with a trendy style that can aim for top downloads.
```

<a id="prompt-da01f3094c6ad2484a4b"></a>

### 153. 赛博朋克科幻侧面肖像

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case29/output.jpg" alt="赛博朋克科幻侧面肖像" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/iamsofiaijaz/status/2047882171336253928)

**提示词:**

```text
电影感的侧脸肖像，一个粗犷的男人，扎着马尾辫，留着浓密的胡须，戴着圆形深色太阳镜和质感皮革夹克。他的皮肤细节丰富，略带沧桑。背景是未来科幻界面，充满发光的橙红色数据流、星图、天体导航图、网格和全息UI元素。炽热的粒子效果和余烬般的能量在他周围旋转，营造出宇宙般的高科技氛围。深色调色板，对比强烈，戏剧性照明，超精细细节，锐利焦点，8K，赛博朋克美学，电影构图，景深。
```

<a id="prompt-db2954a483447d527190"></a>

### 154. GTA 圣安地列斯游戏截图

<img src="https://pbs.twimg.com/media/HFH_lAIboAAG7Wi?format=jpg&amp;name=large" alt="GTA 圣安地列斯游戏截图" width="480">

1.5完全是垃圾，风格错误，不是截图，看起来像某个假的GTA游戏垃圾，UI错误，一切都糟糕。2看起来就是它应该看起来的样子。

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/flowersslop/status/2040693687500341568)

**提示词:**

```text
一张 GTA 圣安地列斯的游戏截图：一头狮子正在和一个 NPC 打斗
```

<a id="prompt-dd63f7df447b1c43cd07"></a>

### 155. 运动健身图标字体设计

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case247.jpg" alt="运动健身图标字体设计" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-247)

**提示词:**

```text
生成一套运动类app的iconfont
```

<a id="prompt-df9072d9b5f1b5310cea"></a>

### 156. 一个超真实的UI/UX模型展示在放置在...上的纤薄现代笔记本电脑上

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/portrait_case80/output.jpg" alt="一个超真实的UI/UX模型展示在放置在...上的纤薄现代笔记本电脑上" width="480">

- **分类:** 摄影与人像
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/ZaraIrahh/status/2047179669011616172)

**提示词:**

```text
一个超现实的UI/UX模型，展示在放置在简约木桌上的纤薄现代笔记本电脑上，配有柔和的自然日光。屏幕显示一个干净的SaaS仪表板，具有优雅的排版、玻璃态卡片、平滑渐变、微妙的投影和整齐间隔的组件。可见的图表、分析面板、侧边栏导航和微交互。逼真的macOS风格窗口框架，屏幕上的柔和反射，浅景深，舒适的工作空间氛围，以逼真的产品摄影风格拍摄，超详细。
```

<a id="prompt-e1c70be24763fdf9e5ba"></a>

### 157. 社交应用匹配成功界面

<img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/case_case86/output.jpg" alt="社交应用匹配成功界面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [EvoLinkAI/awesome-gpt-image-2-prompts](https://x.com/songguoxiansen/status/2047220490486612450)

**提示词:**

```text
社交App匹配成功界面，两个用户资料卡碰撞爱心特效
```

<a id="prompt-e6ed9072570c945c2b8f"></a>

### 158. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case159.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-159)

**提示词:**

```text
{
  "type": "e-commerce livestream UI mockup",
  "subject": {
    "description": "photorealistic young Asian woman, sweaty glowing skin, long dark wavy hair, wearing a white short-sleeve polo shirt and white pleated tennis skirt, holding a white tennis racket over her right shoulder, looking directly at camera, studio lighting, white background"
  },
  "layout": {
    "top_header": {
      "host_info": {
        "name": "{argument name=\"host name\" default=\"小鹿运动优选\"}",
        "stats": "12.8万本场点赞",
        "button": "关注"
      },
      "rank_tag": "带货榜第3名",
      "viewer_stats": "1.2万"
    },
    "top_right": {
      "coupon": {
        "title": "直播间专属券",
        "value": "￥20 满199可用",
        "button": "领取"
      }
    },
    "left_overlay": {
      "title": "{argument name=\"campaign title\" default=\"夏日运动季\"}",
      "subtitle": "{argument name=\"campaign subtitle\" default=\"活力开场\"}",
      "bullet_points": {
        "count": 3,
        "items": ["透气速干", "弹力舒适", "运动百搭"]
      }
    },
    "right_overlay": {
      "product_cards": {
        "count": 2,
        "card_1": {
          "status": "正在讲解",
          "image": "white polo shirt and skirt flat lay",
          "title": "{argument name=\"product name\" default=\"运动POLO衫套装\"}",
          "details": "白色·M码",
          "price": "{argument name=\"price\" default=\"￥129\"}",
          "button": "去抢购"
        },
        "card_2": {
          "status": "热卖 x 156",
          "image": "miniature of main model",
          "title": "运动POLO衫套装女",
          "details": "透气速干 显瘦百搭",
          "price": "{argument name=\"price\" default=\"￥129\"}",
          "button": "抢"
        }
      }
    },
    "bottom_left": {
      "chat_messages": {
        "count": 5,
        "description": "scrolling chat messages with usernames and comments"
      },
      "purchase_alert": "用户_6789 等3人 正在去购买"
    },
    "bottom_bar": {
      "input_field": "说点什么...",
      "icons": {
        "count": 5,
        "types": ["smile", "shopping cart", "heart", "gift", "more"]
      }
    }
  }
}
```

<a id="prompt-e7966159df31cc222908"></a>

### 159. 武则天发微博自拍太魔性了

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case185.jpg" alt="武则天发微博自拍太魔性了" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-185)

**提示词:**

```text
武则天自拍登记发微博
```

<a id="prompt-e7c2522d36a91aba55e7"></a>

### 160. 抖音汉服美女直播带货截图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case257.jpg" alt="抖音汉服美女直播带货截图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-257)

**提示词:**

```text
生成一个抖音直播的截图里面是一个穿着中国传统服饰的美女在直播卖货
```

<a id="prompt-eef29c707ba1b3f5c09a"></a>

### 161. 应用界面样机图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case156.jpg" alt="应用界面样机图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-156)

**提示词:**

```text
{
  "type": "mobile live-streaming e-commerce interface mockup",
  "subject": {
    "description": "young Asian woman, long dark hair, wearing light-colored floral pajama set with a pink bow, holding the pajama top outward to show the fabric",
    "background": "cozy room, clothing rack with pajamas, flowers, warm lighting"
  },
  "ui_layout": {
    "top_bar": {
      "time": "20:34",
      "host_info": {
        "name": "{argument name=\"host name\" default=\"小雨睡衣\"}",
        "stats": "12.8万本场点赞",
        "button": "关注"
      },
      "viewer_info": {
        "avatars_count": 3,
        "total_viewers": "1.2万"
      }
    },
    "floating_tags": {
      "count": 2,
      "labels": ["带货总榜第3名", "人气榜"]
    },
    "widgets": {
      "top_left": "red envelope icon with timer 03:45",
      "top_right": "floating heart icon with text 直播好物大赏 发现新热爱"
    },
    "marketing_text_overlay": {
      "position": "mid-right",
      "lines_count": 5,
      "lines": [
        "{argument name=\"main headline\" default=\"新款睡衣\"}",
        "{argument name=\"sub headline\" default=\"正在秒杀中...\"}",
        "亲肤透气",
        "柔软舒适",
        "不起球 不褪色"
      ]
    },
    "chat_log": {
      "position": "bottom-left",
      "message_count": 7,
      "messages": [
        "32 雨*** 加入了直播间",
        "小***: 好看，多少钱",
        "小***: 拍了，期待发货",
        "C***: 质量看着不错",
        "用***: 身高165，体重120斤，穿多大码？",
        "@***: 主播身上这款有货吗？",
        "晴***: 已拍，坐等收货！"
      ]
    },
    "product_card": {
      "position": "bottom-right",
      "thumbnail": "miniature of the host",
      "title": "{argument name=\"product title\" default=\"【小雨睡衣】春季新款家居服套装\"}",
      "tags_count": 2,
      "tags": ["7天无理由退货", "运费险"],
      "price_section": "秒杀价 ¥ {argument name=\"product price\" default=\"89.9\"}",
      "action_button": "抢"
    },
    "bottom_bar": {
      "input_placeholder": "说点什么...",
      "icon_count": 5,
      "icons": ["smiley face", "shopping cart", "heart/gift", "gift box", "three dots"]
    }
  }
}
```

<a id="prompt-f0037d31ae1e13e9426e"></a>

### 162. 美女举牌感谢大哥打赏大火箭

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case249.jpg" alt="美女举牌感谢大哥打赏大火箭" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-249)

**提示词:**

```text
生成一个抖音直播的截图 ，一个美女在直播，美女手里拿着牌子，上面写着：谢谢行者大哥的大火箭！
```

<a id="prompt-f133a087b15aa7198ae6"></a>

### 163. 界面交互设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case57.jpg" alt="界面交互设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-57)

**提示词:**

```text
{
  "type": "mobile social media app UI mockup",
  "platform": "Twitter/X dark mode",
  "header": {
    "status_bar": "time 19:28, bird icon, signal, wifi, battery",
    "navigation": "back arrow, 'Tweet' title"
  },
  "post": {
    "author": {
      "avatar": "portrait of a Chinese emperor in red robes and black hat",
      "display_name": "{argument name=\"display name\" default=\"Emperor Zhu Yuanzhang\"} 👑 [verified badge]",
      "handle": "{argument name=\"handle\" default=\"@Emperor_Ming\"}"
    },
    "content": {
      "text": "{argument name=\"tweet text\" default=\"I have ascended to the Dragon Throne! Today, I am proclaimed as the Emperor of the Ming Dynasty. The era of Hongwu has begun. Let us rebuild our great nation together!\"}",
      "hashtags": "#MingDynasty #HongwuEra #NewBeginning",
      "media_grid": {
        "count": 3,
        "images": [
          "emperor seated on an ornate golden throne in red and gold robes",
          "wide shot of a grand Chinese palace courtyard with a large crowd",
          "emperor on horseback leading an army with a red dragon banner"
        ]
      }
    },
    "metadata": {
      "timestamp": "{argument name=\"timestamp\" default=\"1:36 PM · Jan 23, 1368\"}",
      "engagement": "5,432 Retweets, 8,765 Quotes, 20.1K Likes, 102.3K Views"
    },
    "actions": "reply, retweet, like (red heart with '1'), share, upload"
  },
  "footer": {
    "reply_bar": {
      "avatar": "woman in red",
      "placeholder": "Reply to Emperor Zhu Yuanzhang..."
    },
    "navigation_bar": "home, search, notifications (red '1' badge), messages"
  }
}
```

<a id="prompt-f6809d16c8675ef24e2e"></a>

### 164. 直播界面设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case152.jpg" alt="直播界面设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-152)

**提示词:**

```text
{
  "type": "e-commerce livestream screenshot mockup",
  "scene": {
    "subject": "{argument name=\"main subject\" default=\"Caucasian male resembling Sam Altman\"}",
    "clothing": "dark green crewneck sweater",
    "action": "holding a black product box in one hand and pointing at it with the other",
    "setting": "dark studio with a microphone on the left, faint 'AI' text in the background",
    "props": [
      "black mug with white OpenAI logo",
      "stack of 4 black product boxes on the right"
    ]
  },
  "product_design": {
    "box_color": "black",
    "logo": "orange asterisk or sunburst",
    "text": "{argument name=\"product name\" default=\"Claude Opus 4.7\"}"
  },
  "ui_overlays": {
    "top_left_product_info": {
      "brand_tag": "Anthropic 官方旗舰店",
      "title": "{argument name=\"product name\" default=\"Claude Opus 4.7\"}",
      "subtitle": "{argument name=\"main headline\" default=\"更强推理·更高智能\"}",
      "sub_subtitle": "最强大模型: Opus 4.7 重磅发布!",
      "bullet_points_count": 3,
      "bullet_points": ["超强推理能力", "代码能力巅峰", "复杂任务轻松搞定"]
    },
    "top_right_live_status": {
      "viewer_info": "直播中 | 52.8万人观看",
      "promo_banner": "直播专属福利 限时折扣·错过不再有",
      "countdown": "倒计时 00:09:47"
    },
    "middle_right_price_card": {
      "header": "{argument name=\"product name\" default=\"Claude Opus 4.7\"} 直播间专享价",
      "price_currency": "¥",
      "price_value": "{argument name=\"promotional price\" default=\"0.47\"}",
      "price_unit": "/百万tokens起",
      "original_price": "原价: ¥1.89",
      "button": "立即抢购"
    },
    "bottom_left_chat": {
      "message_count": 9,
      "input_box_placeholder": "说点什么..."
    },
    "bottom_right_banner": {
      "headline": "奥特曼首推！认准Claude Opus 4.7",
      "subheadline": "更智能 · 更安全 · 更可靠",
      "feature_tags_count": 4,
      "feature_tags": ["强大推理", "代码神器", "安全可靠", "极速响应"]
    },
    "floating_elements": [
      {
        "type": "sticker",
        "position": "middle right over product boxes",
        "text": "{argument name=\"sticker text\" default=\"史上最强 AI模型!\"}"
      }
    ]
  }
}
```

<a id="prompt-f6a917cb3aaeb0c33148"></a>

### 165. 过度思考超现实街头 Campaign

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case356.jpg" alt="过度思考超现实街头 Campaign" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-356)

**提示词:**

```text
Ultra-realistic conceptual portrait of a young woman with long wavy hair and soft defined features, wearing rose-tinted rectangular sunglasses, an oversized ivory cropped t-shirt, fitted light-wash denim jeans, and clean white sneakers. She is sitting casually with a confident yet relaxed posture.

The twist: she is seated on a large, hyper-realistic version of her own detached head placed on the ground. The head is scaled up, lying sideways, with the same facial features and sunglasses, creating a surreal self-reflection concept.

Composition: centered, full-body shot, neutral studio background with soft blush and cream tones, minimal aesthetic. Clean negative space.

Typography integrated into the background:

Handwritten-style text at the top: "OVERTHINKING"

Below it, smaller text: "TRAPPED IN MY OWN HEART" with "HEART" crossed out

Large, rough, scribbled text in deep pink: "MIND"

Lighting: soft diffused studio lighting, subtle shadows, high detail, fashion editorial quality.

Style: blend of surrealism and modern luxury streetwear campaign, pastel feminine aesthetic, minimal yet expressive, high-resolution, 8k, sharp focus, natural skin texture.

Mood: introspective, emotional weight, identity, self-awareness, quiet confidence.
```

<a id="prompt-fd730fc75c8fff60f509"></a>

### 166. 直播界面设计图

<img src="https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main/data/images/case149.jpg" alt="直播界面设计图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2#case-149)

**提示词:**

```text
{
  "type": "mobile livestream e-commerce interface mockup",
  "subject": {
    "person": "Elon Musk",
    "clothing": "black t-shirt with SPACEX logo",
    "pose": "gesturing towards camera with both hands, explaining enthusiastically",
    "watermark": "@Proof AI"
  },
  "background": {
    "setting": "large display screen",
    "image": "Mars landscape with Starship rocket and dome habitats",
    "text": [
      "SPACEX",
      "{argument name=\"background title\" default=\"移民火星计划\"}"
    ]
  },
  "ui_layout": {
    "header": {
      "broadcaster_info": {
        "name": "{argument name=\"broadcaster name\" default=\"ElonMusk\"}",
        "stats": "75.8万本场点赞",
        "follow_button": "关注"
      },
      "viewer_stats": {
        "avatars_count": 3,
        "text": "10万+",
        "close_button": "X"
      },
      "tags": [
        "带货总榜第1名",
        "更多直播 >"
      ]
    },
    "product_card": {
      "position": "mid-right",
      "status": "讲解中",
      "image": "Mars dome habitats",
      "title": "{argument name=\"product title\" default=\"火星移民基础套餐\"}",
      "price": "{argument name=\"product price\" default=\"¥99.00\"}",
      "action_button": "抢"
    },
    "chat_overlay": {
      "position": "bottom-left",
      "join_alert": "星辰大海 加入了直播间",
      "messages_count": 7,
      "messages": [
        "{argument name=\"top chat message\" default=\"梦想家: 支持马斯克！！🚀\"}",
        "火星弟弟: 多少钱一位？",
        "科技迷: 太酷了！想去火星！",
        "未来已来: 如何报名？",
        "小火箭: 🌹🌹🌹",
        "宇宙无敌: 讲解一下细节",
        "东方不败: 老马牛逼！👍👍👍"
      ]
    },
    "bottom_action_bar": {
      "input_placeholder": "说点什么...",
      "icons_count": 4,
      "icons": ["shopping cart", "gift box", "heart planet", "plus sign"]
    },
    "floating_reactions": {
      "position": "bottom-right",
      "elements": "stack of floating hearts, thumbs up, and laughing emojis"
    }
  }
}
```

<a id="prompt-03f857c3d4ef0b8c82c4"></a>

### 167. 漫画 / 故事板 - AAA Fighting Game Storyboard Grid

<img src="https://cms-assets.youmind.com/media/1777367272688_o88a6b_HG8D0fFXUAIa68p.jpg" alt="漫画 / 故事板 - AAA Fighting Game Storyboard Grid" width="480">

一个高度结构化的提示，用于创建格斗游戏的3x3故事板网格，保持角色一致性和完整的游戏UI元素。

- **分类:** 漫画与叙事
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/egeberkina/status/2048862692937494809)

**提示词:**

```text
{
  "instruction": "使用提供的两个角色图像作为精确的视觉参考。完美保留身份、面部、服装、比例和细节。",
  "concept": "{argument name=\"game concept\" default=\"AAA格斗游戏场景，以铁拳风格的游戏网格分镜板呈现\"}",
  "layout": {
    "type": "3x3网格",
    "description": "九个面板展示连续的战斗进程，每帧都显示完整的游戏UI"
  },
  "panels": [
    "面板1：戏剧性的VS画面 — 角色A对战角色B，两人面对面，发光背景，中央显示VS文字",
    "面板2：回合开始 — 两个格斗者处于待机姿态，屏幕上显示READY文字",
    "面板3：FIGHT时刻 — 战斗开始时的电影级火花爆炸",
    "面板4：第一次攻击 — 角色A出拳带有运动模糊",
    "面板5：反击 — 角色B踢腿带有冲击火花",
    "面板6：连招序列 — 多次击中火花、运动轨迹、动态相机",
    "面板7：低血量时刻 — 血条闪烁红色，紧张时刻",
    "面板8：终结技 — 慢动作重击，电影级角度",
    "面板9：KO画面 — 对手向后倒下，巨大的KO文字，粒子飞溅"
  ],
  "style": "{argument name=\"art style\" default=\"超写实AAA铁拳风格格斗游戏，电影级游戏渲染，高度详细的角色，真实的光照\"}",
  "camera": "游戏内格斗相机，略微倾斜的侧视图，冲击时动态缩放",
  "environment": "高端格斗竞技场，黑暗背景带有霓虹点缀，微妙景深，不分散注意力",
  "ui_elements": {
    "health_bars": "左上和右上，详细，发光，在面板中逐渐减少",
    "timer": "顶部中央",
    "player_names": "左上和右上",
    "round_indicator": "可见",
    "combo_counter": "击中时出现",
    "hit_effects": "火花，闪光，光线轨迹",
    "KO_text": "大号，粗体，最终面板中央屏幕",
    "READY_FIGHT_text": "街机风格粗体字体"
  },
  "effects": [
    "攻击时的运动模糊",
    "冲击火花",
    "能量轨迹",
    "相机震动效果",
    "终结击中的慢动作感",
    "击中时的屏幕发光"
  ],
  "color_grading": "{argument name=\"color grading\" default=\"高对比度，街机电影感，鲜艳的高光，深邃的阴影\"}",
  "output": "干净的3x3网格，完美对齐的面板，完整UI可见，无标志，无水印"
}
"reference_style": "铁拳8游戏UI，街机格斗游戏界面，现代AAA格斗HUD"
```

<a id="prompt-04d47fec58ee327da604"></a>

### 168. 社交媒体帖子 - Editorial Bridal Portrait with Fascinator

<img src="https://cms-assets.youmind.com/media/1777367353692_mx9cwt_HG7F2mvboAAlqwo.jpg" alt="社交媒体帖子 - Editorial Bridal Portrait with Fascinator" width="480">

此提示生成了一位身着白色装饰性礼服和头饰的斜倚女性的精致工作室时尚肖像，适合婚纱编辑或高级美容形象。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/i4LMU/status/2048792437032681929#reversed-0)

**提示词:**

```text
一张高级时尚工作室肖像照，展示一位年轻女子侧身躺在地板上，背景是无缝的浅灰色，画面从帽子下方裁剪到手部，面部被一个柔和的矩形模糊效果有意遮挡。她穿着一件优雅的白色连衣裙，采用透明褶皱面料，双肩带和胸饰处有立体花卉装饰，剪裁合身，轮廓空灵。她的头发是{argument name="hair color" default="dark brown to black"}，梳成两个长长的泡泡辫，每边一个，用多个白色发带扎成圆形段。她戴着一顶引人注目的白色头饰，偏向一侧，由多层网纱、网状织物、丝带环、蕾丝装饰和几蓬轻盈的羽毛组成。姿势设计为她靠在前臂上，另一只手伸向画面底部边缘，躯干呈对角线角度，形成精致的编辑构图。使用柔和的漫射工作室灯光，平滑的肤色，最少的阴影，奢华婚纱时尚风格，单色白色服装点缀，以及干净精致的杂志美学。
```

<a id="prompt-160b8a2dbbbcea8cbe7a"></a>

### 169. 社交媒体帖子 - Childlike Crayon Portrait on Paper

<img src="https://cms-assets.youmind.com/media/1777367347456_i333ek_HG8pqG3bIAAuwOZ.jpg" alt="社交媒体帖子 - Childlike Crayon Portrait on Paper" width="480">

这个提示生成一张纸上凌乱的儿童蜡笔画的逼真照片，可用于重现具有幽默学校项目感的手工朴素艺术作品。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/MireilleDartois/status/2048903124518347213#reversed-0)

**提示词:**

```text
一张放在木质桌面上的略微褶皱的白纸上的儿童蜡笔画的真实俯拍照片。这幅画以天真的小学风格展示了{argument name="character" default="Donald Trump"}的简单肖像，有凌乱的黄色蜡笔头发，桃色的皮肤，大耳朵，蓝色西装外套，白色衬衫领带和红色领带。脸部是正面的，占据了页面的大部分，左侧有一只举起的手，伸出中指做出粗鲁的手势。线条是不均匀的黑色铅笔或蜡笔轮廓，着色粗糙、潦草且故意笨拙，有可见的儿童笔触超出线条。页面的右侧有垂直的黑色手写日文文本，内容为{argument name="side text" default="とらんぷさん"}。构图是一张随意的智能手机快照，而不是干净的扫描，显示了整张纸，轻微的透视失真，柔和的室内光线，以及页面周围木质表面的纹理。强调真实的手工蜡笔质感，笨拙的比例，以及令人信服的"虽拙但迷人"的儿童艺术美学。
```

<a id="prompt-195b3e8b41bdbdc14d2a"></a>

### 170. 社交媒体帖子 - Taiwan Breakfast Shop Candid Portrait

<img src="https://cms-assets.youmind.com/media/1777367333404_5vgfp5_HG8hi45aQAALgGU.jpg" alt="社交媒体帖子 - Taiwan Breakfast Shop Candid Portrait" width="480">

此提示生成一张年轻女子在台湾繁忙路边餐馆吃早餐的写实垂直照片，适合生活方式、旅行或美食场景的图像。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Asan0_Misaki/status/2048893248413024364#reversed-1)

**提示词:**

```text
在台湾一家狭窄的老式早餐店里的街边小吃咖啡馆照片，以真实的手机照片风格拍摄，带有柔和的自然日光和略微温暖的纪录片感。一位年轻的东亚女子，留着{argument name="hair color" default="black"}齐肩直发，坐在红色塑料小凳上，面对镜头，双手在胸前拿着一个热葱煎饼卷。她的脸被一个大的柔和模糊矩形故意遮挡。她穿着一件白色细肩带小背心，带有小细节的蝴蝶结，浅蓝色高腰牛仔短裤，和一个银色心形吊坠项链。她的姿势放松，略微倾斜地坐着，桌下可见光腿。桌上有2个白盘切片葱煎饼，1个冒着热气的印有红色中文文字的纸杯，1个装有深绿色蔬菜和豆腐或凝乳块的白碗，一把白色汤匙，以及散落的碎屑和纸包装。蒸汽应从杯子和碗旁明显升起。她手中的食物包装看起来塞得过满，里面有鸡蛋、葱煎饼层，以及露出的馅料。背景显示繁忙、正宗的当地餐厅内部：玻璃展示柜后有2名工作人员，一个可口可乐冰箱，头顶的荧光灯管，一个电风扇，瓷砖墙壁，以及几份中文菜单和食品海报，标有新台币价格。包含可见的传统中文招牌，如葱煎饼、鸡蛋煎饼卷、豆浆，以及30到55元新台币的价格。右侧展示一个玻璃柜，里面堆叠着油条或糕点。左侧展示部分开放式的店面通向街道，隐约可见摩托车和相邻建筑。构图是垂直的，从头到膝盖的全身坐姿裁剪，居中主体，浅景深但保持足够的细节使店铺清晰可见，真实的肤色，轻松的早餐氛围，繁忙的台北日常街边小吃美学。
```

<a id="prompt-33fe595c03f73113f96d"></a>

### 171. 社交媒体帖子 - Autumn Leaves with Handwritten Japanese Text

<img src="https://cms-assets.youmind.com/media/1777367319655_s5reqw_G6G78EDasAAxcde.png" alt="社交媒体帖子 - Autumn Leaves with Handwritten Japanese Text" width="480">

这个提示生成了一张温馨的秋天特写照片，照片上是落在人行道上的枫叶，上面有表现力强的白色手写日文文字，非常适合季节性引用帖子或富有诗意的社交媒体视觉效果。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/akira_papa_IT/status/2048899628180078992#reversed-1)

**提示词:**

```text
一张温暖、浅景深的秋日照片，多片枫叶散落在深色沥青路面上，沐浴在明亮的金色阳光下。叶子主要是黄色、橙色和琥珀色，左前景中有一片醒目的鲜艳橙色叶子，几片黄色叶子斜向延伸至远方。相机靠近地面，特写镜头，中央前景叶子清晰对焦，背景和极前景有柔和的散景模糊。图像中部叠加着精致的白色手写日文文字，采用细毛笔风格，略不规则且富有情感，内容为 {argument name="overlay text" default="今日も、寒いね。"}. 自然户外光线，舒适的季节氛围，逼真的纹理，阳光照射的叶子与粗糙路面之间的高对比度，方形构图，诗意社交媒体美学。
```

<a id="prompt-3736ced576105a7ec02f"></a>

### 172. 社交媒体帖子 - Taiwan Breakfast Shop Candid Portrait

<img src="https://cms-assets.youmind.com/media/1777367333198_f62s4m_HG8hi45aUAApB2i.jpg" alt="社交媒体帖子 - Taiwan Breakfast Shop Candid Portrait" width="480">

这个提示生成了一张女性在熙熙攘攘的台湾小餐馆内食用传统早餐食品的真实抓拍照片，适合生活方式、美食旅行或街头摄影视觉效果。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Asan0_Misaki/status/2048893248413024364#reversed-0)

**提示词:**

```text
一张年轻的东亚女性在繁忙的老式台湾早餐店小圆桌旁坐着的智能手机抓拍照片。她是主要拍摄对象，从大腿中部向上取景，以随意的坐姿面向相机。她的脸被柔和的矩形模糊故意遮挡。她留着齐肩直黑发，中分发型，戴着小巧的金色圆环耳环，戴有一条带有小心形吊坠的精致金项链。她穿着合身的白色细肩带背心和腰部高的蓝色牛仔短裤，带有轻微的做旧效果。一只手拿着一根油条靠近嘴边，另一只手拿着另一块断开的油条放在桌上。桌上有4种可见的食物和饮料：一盘装有油条碎片的盘子，一个包裹着黑芝麻的葱油饼，一个白色泡沫外卖托盘，里面有两张煎饼，其中一张覆盖着深色酱油和切碎的葱花，还有一个装满豆浆的大外卖杯，配有红色吸管和红色中文字标。餐厅内部紧凑明亮，装有荧光天花板灯，水磨石风格地板，背景中有密集的用餐者。她身后是大窗户和带有粗体红色中文字的墙标，包括早餐项目如豆浆、油条、米卷、烧饼和鸡蛋煎饼。有几位正在用餐的顾客，工作人员在金属柜台后工作，墙上挂着一个小电视，正在播放一位女主播的新闻，还有一个挂着红色中文文字和价格的悬挂菜单板。写实摄影，自然室内光线，浅景深，活跃的当地氛围，轻微广角手机相机视角，纪录片式美食旅行美学。
```

<a id="prompt-46f9e01a58d8c5ec3ac7"></a>

### 173. 社交媒体帖子 - Snowy Sky with Handwritten Japanese Text

<img src="https://cms-assets.youmind.com/media/1777367319625_pqoiwq_G6G78EAbQAAgNdV.png" alt="社交媒体帖子 - Snowy Sky with Handwritten Japanese Text" width="480">

这会生成一幅充满诗意的冬季天空照片，包含飘落的雪花、树木剪影和富有表现力的手写日文文字，非常适合情感化的社交媒体帖子或季节性视觉语录。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/akira_papa_IT/status/2048899628180078992#reversed-2)

**提示词:**

```text
一张情绪化的方形冬季照片，直视着阴沉的灰蓝色天空，正值积极降雪，四周被高大的无叶树木环绕，深色的光秃树枝从边缘向内延伸，形成一个圆形树冠。各种大小的雪花在整个图像中飘落，一些大的柔软模糊的雪花靠近镜头，许多小的锐利的雪花散落在场景的更深处，创造出梦幻般的氛围深度。在最底部边缘，右侧附近出现较矮冬季树木的模糊剪影和微妙的温暖琥珀色路灯光芒，而图像的其余部分保持寒冷、柔和和昏暗，如同黄昏或傍晚。在中心处，叠加大型情感丰富的日本手写毛笔风格白色文字，略微不自然且自然，内容为{argument name="quote" default="また、この季節がやってくる。"}，具有人类手写的感觉，柔和的边缘，适度的笔画变化，以及分散在天空中间的随意换行。强调忧郁的怀旧感，诗意的日本冬季氛围，电影般的极简主义，逼真的摄影，以及与降雪干净融合的真实手绘字母。
```

<a id="prompt-57f69c976ec3c676f65d"></a>

### 174. 社交媒体帖子 - Taiwan Breakfast Shop Candid Portrait

<img src="https://cms-assets.youmind.com/media/1777367334341_u2qil2_HG8hi6vb0AAljm3.jpg" alt="社交媒体帖子 - Taiwan Breakfast Shop Candid Portrait" width="480">

这生成了一张真实的台湾早餐店女性用餐抓拍照片，适用于生活方式、咖啡馆或街头摄影风格的场景。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Asan0_Misaki/status/2048893248413024364#reversed-2)

**提示词:**

```text
一张在街边咖啡馆拍摄的抓拍照片，照片中是一位年轻的东亚女子，坐在一家朴实无华的台湾早餐店的小圆桌旁。照片在明亮的自然光下拍摄，具有真实的智能手机相机风格。她有着深棕色至黑色的长波浪发，垂在肩膀和背上，身材苗条曲线优美，穿着一件合身的白色针织露肩背心和浅灰色抽绳运动裤，还戴着一条非常精致的项链。她身体微微前倾朝向相机，一只手拿着一个用透明塑料包装的台湾米卷，靠近嘴巴，仿佛正要咬一口。她的脸被一个位于脸部中央的大矩形模糊块有意遮挡。在左下前方的桌子上，有1个带密封盖和吸管的大号塑料外卖杯，里面装着浅棕色的奶茶或豆奶饮料，杯子上印有可爱的卡通图案和小中文文字。桌上还有1个带有橙色印刷的白色食品袋。背景是一家休闲早餐店的真实内部场景：最左边是一扇通向街道的窗户，可以看到日光、树叶阴影、停放的摩托车和一辆白色汽车；左墙上挂着1个垂直的复古菜单招牌，用多种颜色的中文字列出早餐项目和饮料；顶部背景是1个宽大的水平菜单板，上面填满了许多行蓝色和红色的中文文字和价格；右后方是一个开放的不锈钢厨房柜台区域，后面站着1个模糊的工作人员，金属器具上还有额外的中文标识。构图为中景，以坐着的女子为中心，具有柔和的自然阴影、略微温暖的色调、真实的皮肤纹理、日常纪录片氛围和正宗的台湾当地餐厅美学。
```

<a id="prompt-59541c2b0d08cfc0d7ed"></a>

### 175. YouTube 缩略图 - TV Variety Show Screen Capture

<img src="https://cms-assets.youmind.com/media/1777367277112_35qppq_HG5hEAdbsAAK9WO.jpg" alt="YouTube 缩略图 - TV Variety Show Screen Capture" width="480">

用于重现日本综艺节目电视屏幕复杂多层次美学的提示词，包括telops和 wipes等特定的叠加类型

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/xc5_/status/2048681792341958807)

**提示词:**

```text
日本综艺节目信息截图（16:9）。风格类似于《[人物]未知的世界》这类节目。

屏幕构图：

主视频：来自{argument name="restaurant name" default="Mona Hanten"}的{argument name="food item" default="酱油拉面}的特写镜头（展示着热气腾腾的叉烧猪肉、青葱和漂亮的溏心蛋）。

字幕组（节目特定的屏幕大量文本语法）：
- 顶部横幅字幕（红色背景上的白色文字）："{argument name="show title" default="The World of Neighborhood Chinese Restaurants}"
- 底部主字幕（带阴影的粗体黄色文字）："大阪小店的排队！传奇中餐少女"
- 右下角小窗口：一位表情惊讶的主持人的剪影
- 左上角的节目标志
- 右上角的"播放VTR"字幕

额外字幕（表演者的反应风格）：
"18岁就有这种水平！？"（气泡字幕）

整体格式与综艺节目截图完全相同。多层字幕的感觉非常逼真。
```

<a id="prompt-5b650395aab44f179879"></a>

### 176. 社交媒体帖子 - Candid Breakfast Shop Portrait

<img src="https://cms-assets.youmind.com/media/1777367334440_sshaov_HG8hjC2bMAAtSLf.jpg" alt="社交媒体帖子 - Candid Breakfast Shop Portrait" width="480">

这个提示生成了一张真实的垂直生活方式照片，内容是一位女性在台湾早餐店用餐，适合用于休闲社交媒体或街头摄影风格的图像。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Asan0_Misaki/status/2048893248413024364#reversed-3)

**提示词:**

```text
一张年轻东亚女子在一家休闲台湾早餐店的小桌旁坐着的自然智能手机照片，垂直9:16构图中景。她有齐肩直发，深棕色至黑色，侧分，穿着一件{argument name="top color" default="light gray"}修身针织背心，高腰浅蓝色牛仔短裤，以及一件宽松的白色薄开衫，双肩滑落。她坐在黑色椅子上，双手拿着一个铝箔包装的早餐饭团或三明治，靠近嘴巴，仿佛正要咬一口。她的身体略微向右倾斜，姿势放松自然，具有柔和的生活照片美学。在她的脸上放置一个大的矩形模糊审查块，居中并覆盖整个面部区域。在左下前景的桌子上，包括1个带塑料盖的大号外带杯和1根红色吸管。在背景中，展示传统早餐摊位的开放式店面内部，有不锈钢柜台、玻璃保温展示柜、调味品瓶、1名柜台后的工作人员、1台壁扇，以及带有红色和蓝色中文字和价格的上方菜单板。左侧还要包括一扇带有中文招牌和营业时间的玻璃门。照明应为自然日光，略微柔和，具有真实的肤色，随意的街头照片写实风格，浅景深但仍可读的背景细节，真实的台湾城市餐厅氛围。
```

<a id="prompt-6ec25a0fed679893da92"></a>

### 177. 个人资料 / 头像 - Golden Hour Organic Outdoor Selfie

<img src="https://cms-assets.youmind.com/media/1777367285499_npgwqi_HG7f3r_W8AEmojc.jpg" alt="个人资料 / 头像 - Golden Hour Organic Outdoor Selfie" width="480">

这个提示生成一个真实的、自然抓拍的户外黄金时刻自拍，具有自然的手机相机光线和真实的社交媒体风格。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/f3dericobartoli/status/2048821037513560430#reversed-1)

**提示词:**

```text
一个真实的、休闲的户外智能手机自拍，从胸部以上拍摄，主体是{argument name="subject age" default="middle-aged woman"}，构图稍微偏离中心，用手机在手臂长度距离拍摄。她有丰厚的齐肩波浪发，颜色是温暖的{argument name="hair color" default="auburn red"}，被微风轻轻吹乱，身后低落的阳光为她头发增添了金色背光。她穿着一件深色的{argument name="top color" default="deep forest green"}V领针织上衣或开衫，戴有一条精致的细链项链，一个小小的耳环几乎被头发遮住。场景是一个户外露台或步道，旁边是浅色石墙，背景中大部分是茂密的树叶，隐约可见一些建筑物穿过树枝。太阳出现在左上角，产生自然的镜头光晕，头发周围形成温暖的轮廓光，肩膀上有柔和的高光，以及真实的傍晚黄金时刻对比度。构图应该感觉自然而不完美：轻微的手持手机相机视角，自然的皮肤纹理，随意的姿势，真实的光线，来自手机传感器的浅景深，以及一个真实的日常社交媒体自拍美学。
```

<a id="prompt-861badf02060bfb2401c"></a>

### 178. 信息图 / 教育视觉图 - LEGO Parts List Inventory Page

<img src="https://cms-assets.youmind.com/media/1777367352159_t6ogew_HG7_HKsaMAAhw7P.jpg" alt="信息图 / 教育视觉图 - LEGO Parts List Inventory Page" width="480">

这个提示生成一个干净的乐高风格零件清单表，包含BrickLink ID，对说明书、搭建指南或可打印的自定义套装文档很有用。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ecommartinez/status/2048855384111427765#reversed-1)

**提示词:**

```text
{"type":"LEGO零件清单信息图表页面","subject":"用于定制乐高搭建的干净印刷库存表","style":"极简主义手册图形，纯白背景，清晰的黑体无衬线字体，细微的浅灰色行分隔线，编辑布局","page":{"orientation":"纵向","background":"白色","margin":"宽大"},"header":{"icon_count":2,"icons":["左上角的小纸板箱表情符号/图标","节标题前的小棕色方形色标图标"],"title":"零件清单（含LEGO / BrickLink ID）","section_title":"{argument name=\"section title\" default=\"基础与地面\"}"},"table":{"columns":["零件","描述","颜色","数量"],"row_count":8,"rows":[{"Part":"3811","Description":"12×12平板","Color":"棕褐色","Qty":"1"},{"Part":"3024","Description":"1×1平板","Color":"深绿色","Qty":"12"},{"Part":"3023","Description":"1×2平板","Color":"深绿色","Qty":"10"},{"Part":"3022","Description":"2×2平板","Color":"深褐色","Qty":"8"},{"Part":"3068b","Description":"2×2瓦片","Color":"浅蓝灰色","Qty":"6"},{"Part":"3070b","Description":"1×1瓦片","Color":"浅蓝灰色","Qty":"10"},{"Part":"4073","Description":"圆形1×1平板","Color":"绿色","Qty":"8"},{"Part":"6064","Description":"植物叶子 6×5","Color":"绿色","Qty":"2"}]},"customization":{"title":"{argument name=\"headline text\" default=\"零件清单（含LEGO / BrickLink ID）\"}","section":"{argument name=\"section title\" default=\"基础与地面\"}","accent_color":"{argument name=\"accent color\" default=\"棕色\"}","page_style":"{argument name=\"document style\" default=\"乐高手册库存表\"}"},"composition":"标题左上对齐，节标签直接在下方，下方居中放置大型4列表格，行间距均匀，除数量列外在右视觉上窄，所有文本左对齐","quality":"高分辨率打印就绪模型，清晰的矢量式文本渲染"}
```

<a id="prompt-87c1a5b4c34c37febfd6"></a>

### 179. 社交媒体帖子 - Summery Beach Portrait

<img src="https://cms-assets.youmind.com/media/1777367266697_38b7vc_HG7EF0DbIAEGn_1.jpg" alt="社交媒体帖子 - Summery Beach Portrait" width="480">

用于生成一张写实风格的、沐浴在金色阳光下的女性肖像，照片中一位女性在黄金时段的海滩上放松休息。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/mizq06/status/2048790504817737741)

**提示词:**

```text
一位{argument name="hair color" default="长红发"}的年轻女子坐在{argument name="location" default="阳光明媚的海滩"}的毛巾上。她穿着{argument name="outfit" default="合身的米色背心和浅蓝色牛仔短裤，配有一条棕色腰带"}。她一手拿着太阳镜，望向远方，另一只手放在头发上。背景是柔软的沙滩、棕榈树和清澈的蓝天，温暖的金色阳光自然地投射出高光。她旁边放着一个手提包。氛围明亮、夏日气息浓厚且轻松。
```

<a id="prompt-8802045a805ac0143086"></a>

### 180. 社交媒体帖子 - Dreamy Bubble with Handwritten Japanese Text

<img src="https://cms-assets.youmind.com/media/1777367319860_o5bvou_G6G78D_bIAAIjjV.png" alt="社交媒体帖子 - Dreamy Bubble with Handwritten Japanese Text" width="480">

这个提示生成一个充满诗意的气泡照片，带有发光的散景和富有表现力的手写日文文字，适合情感化的社交媒体视觉或氛围感封面艺术。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/akira_papa_IT/status/2048899628180078992#reversed-0)

**提示词:**

```text
一个梦幻的极简主义方形图像，中心漂浮着一个彩虹色的肥皂泡，背景是深蓝色柔焦，明亮的自然阳光从左上方倾泻而下，创造出精致的镜头光晕、圆形虚化和发光高光。主泡泡被清晰渲染，带有彩虹色反射和右下角边缘的一个微小星状闪光，同时有6个额外的失焦泡泡出现在画面周围：左下角有一个大的部分泡泡，上中心附近有一个小泡泡，左中有一个微弱的泡泡，以及3个柔和发光的泡泡聚集在中下部到右下区域。在中心上方，叠加大型手写日式毛笔风格白色文字，内容为{argument name="headline text" default="はじける泡。"}，带有情感化的手绘墨水感，笔画略微不均匀，以及自然的有机间距。整体氛围是诗意的、轻盈的、明亮的和怀旧的，具有浅景深、高级摄影美学、干净的构图，以及清晰的中心泡泡与模糊梦幻背景之间的强烈对比。
```

<a id="prompt-8b73bdb5f7e7622252e5"></a>

### 181. 个人资料 / 头像 - Night Balcony Flash Selfie

<img src="https://cms-assets.youmind.com/media/1777367354955_fv3q9k_HG6eH-IaQAAJsxF.jpg" alt="个人资料 / 头像 - Night Balcony Flash Selfie" width="480">

这个提示生成一个带有闪光灯的真实深夜阳台自拍，适合休闲社交媒体风格的肖像摄影。

- **分类:** 摄影与人像
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/zitoIA/status/2048748755730509985#reversed-1)

**提示词:**

```text
一个年轻女子在夜晚阳台上的自然自拍，从略高的手持手机角度拍摄，脸部大多被阴影和构图遮挡，强调服装和氛围而非面部细节。她有{argument name="hair color" default="dark brown"}长长的松散波浪长发垂落在双肩，中等肤色，戴着2条精致的黄金项链，一条是细链，一条带有小十字架吊坠，手腕上还戴着一条在底部边缘可见的精致手链。她的服装是一件合身的白色无袖露脐短款上衣和{argument name="bottoms" default="light blue low-rise denim jeans"}，露出腰部。姿势放松且略微倾斜，一只手臂伸出来拿着手机，具有休闲外出风格。场景设置在夜晚的现代公寓阳台上，有玻璃栏杆和模糊的远处城市天际线，布满小光斑。使用昏暗的环境光线，配合直接的手机闪光灯照亮躯干和头发，形成强烈对比，柔和的颗粒感，轻微的运动模糊，以及真实的深夜社交媒体自拍效果。垂直智能手机构图，从胸部上部到臀部近距离裁剪，写实摄影，情绪化，亲密，未经修饰，自然比例。
```

<a id="prompt-9c65bde0c0185b743d8b"></a>

### 182. 社交媒体帖子 - Avant-Garde Bridal Portrait

<img src="https://cms-assets.youmind.com/media/1777367353969_7bdt2f_HG7F2m2bkAAZWrM.jpg" alt="社交媒体帖子 - Avant-Garde Bridal Portrait" width="480">

此提示生成了一张精致的影棚时尚图像，展示了一位穿着雕塑感白色婚纱、拥有戏剧性泡泡马尾的女性，非常适合编辑或高级定制婚礼视觉。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/i4LMU/status/2048792437032681929#reversed-1)

**提示词:**

```text
一位身着空灵婚纱造型的高时尚工作室肖像，坐在无缝浅灰色背景前，从头饰到发尾的头发垂直构图。她穿着一件流动的无袖白色长裙，高褶皱领口，胸部上方有透明褶皱雪纺，颈部、胸部、腰部和上半身裙上簇拥着精致的白色花卉贴花，柔软的垂褶裙摆散落在她周围的地上。她的头发是{argument name="hair color" default="deep dark brown"}，并梳成两个极长的超大泡泡马尾，每边一个，每个都用白色带子分段；左侧马尾显示4个可见的泡泡部分，右侧马尾显示3个可见的泡泡部分，两个马尾都以厚实的光亮环形延伸到地上。她还戴着一侧倾斜的精致白色头饰，由蕾丝、网纱和雕塑花卉细节制成。姿势设计为她斜靠，一只手撑在地上，躯干倾斜，形成优雅的时尚编辑姿态。保持精致、婚纱和前卫的氛围，使用柔和的漫射光，逼真的皮肤纹理，清晰的纺织品细节，最少的阴影，以及干净奢华的杂志美学。
```

<a id="prompt-a052349fd9f848e7b55d"></a>

### 183. 社交媒体帖子 - Cozy Beer Toast with Oden

<img src="https://cms-assets.youmind.com/media/1777367320346_2gg269_G6G78ECakAAaHoY.png" alt="社交媒体帖子 - Cozy Beer Toast with Oden" width="480">

一个温馨的日式家庭晚餐照片，一只手拿着啤酒放在炖煮的关东煮前面，适合用于温馨的社交媒体帖子或手写信息生活方式的视觉效果。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/akira_papa_IT/status/2048899628180078992#reversed-3)

**提示词:**

```text
一个温馨舒适的日本家庭夜晚场景，以自然生活方式风格拍摄。前景中，一只右手举着一个高高的透明品脱玻璃杯，里面装着金色的啤酒，带有厚厚的白色奶油泡沫头，位置稍微偏右，仿佛在独自举杯祝酒。在柔和模糊的背景中，一个小砂锅的关东煮在便携式桌面燃气炉上慢慢炖煮，清晰可见的配料包括1个香菇、2个圆形白色物品、几块豆腐以及其他各种在汤中炖煮的食材。场景是一个榻榻米房间，有温暖的室内环境光，浅景深，以及一个放松亲密的氛围。在图像上覆盖大型的白色手写日文文字，内容为{argument name="message text" default="今日も\nおつかれさま。"}，采用情感化的手绘马克笔风格，笔画不均匀，间距随意，并有个人笔记般的感觉。强调舒适的色彩，柔和的散景，逼真的肤色，以及清晰的啤酒玻璃杯与后面略微失焦的热锅之间的对比。
```

<a id="prompt-b34722f145d337bb40bf"></a>

### 184. 信息图 / 教育视觉图 - Premium Korean Palm Reading Guide

<img src="https://cms-assets.youmind.com/media/1777367279399_31um5p_HG6temWboAAJUpu.jpg" alt="信息图 / 教育视觉图 - Premium Korean Palm Reading Guide" width="480">

一套用于分析手部照片以生成韩式奢华风格手相报告的详细指令集，采用双面板布局，包含真实视图和图示视图。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ai_2tonghee/status/2048765643332465010)

**提示词:**

```text
根据上传的手掌照片创建优质的韩式手相指南图像。

最终图像中的所有可见文本必须仅为韩文。使用简洁的韩文无衬线字体。标题必须完全为"손금 분석 가이드"。

创建精致的双面板布局：
左侧面板：将上传的真实手掌照片放入简洁的圆角卡片内。保持原始手形、掌纹、皮肤纹理和自然细节。不要扭曲或重绘手部。
右侧面板：基于同一只手创建独立的黑白手掌轮廓解释图。用细密的线条突出主要掌纹，并用韩文标注。

包含韩文标签和部分：
"손금 분석 가이드", "전체 요약", "생명선", "두뇌선", "감정선", "운명선", "재물선", "태양선", "결혼선", "성격", "직업운", "재물운", "연애운", "조언", "확인 불가".

分析手掌形状、手指比例、生命线、智慧线、感情线、命运线、财富线、太阳线、婚姻线、线条深度、长度、方向、断裂、分支和重叠。如果某些内容不明确，请写"확인 불가"。保持韩文解释简短、真实、平静和建议性。

设计风格：
1:1正方形格式，白色背景，黑色和暖深灰色文字，细线分隔符，圆角卡片，微妙阴影，大边距，充足的负空间，精确网格，简约线条图标，豪华编辑报告，高端健康分析，优雅且昂贵的外观。

无英文文本，无罗马字母，无破损韩文，无随机字形，无彩色装饰，无卡通风格，无神秘符号，无塔罗图像，无恐怖氛围，无杂乱背景，无水印。
```

<a id="prompt-bf82f2ba8106921c78d5"></a>

### 185. 信息图 / 教育视觉图 - Isometric Science Concept Diorama Grid

<img src="https://cms-assets.youmind.com/media/1777367300302_h73esz_HG8sxH5bAAAsnI8.jpg" alt="信息图 / 教育视觉图 - Isometric Science Concept Diorama Grid" width="480">

这个提示生成一个精美的四面板等距科学信息图，包含生物学、物理学、化学和天文学的小型3D模型场景，适合概念可视化或教育社交媒体帖子。

- **分类:** 信息图与教育
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/TWnese/status/2048906317973360886#reversed-1)

**提示词:**

```text
一个干净的2x2概念实体模型信息图，采用柔和的灯光背景，展示四个独立的浮动等距立体场景瓷砖，这些瓷砖拟人化了{argument name="theme" default="science"}的分支，采用精致的3D插图风格，带有柔和渐变、光泽材质、柔和的环境光、微妙的阴影、圆润的未来主义形式和高细节。左上角：生物学，一个郁郁葱葱的生物实验室岛屿，中央有一个大型DNA双螺旋塔，弯曲的玻璃温室建筑，螺旋楼梯，分层有机路径，绿色植物，植物床和流体生物形态结构；"BIOLOGY"一词集成在平台的前边缘。围绕这个瓷砖的是4个小型生物学相关图标：显微镜、DNA符号、发芽的植物和圆形细胞或培养皿符号。右上角：物理学，一个采用冷蓝色调的高科技能量实验室瓷砖，中央有一个发光平台，圆形加速器环，铜状电磁线圈，通向核心的楼梯，带有波形图形的监视器屏幕，以及标记为"PHYSICS"的未来主义工业底座；添加4个周围物理学主题图标：原子、马蹄形磁铁、闪电和线图波形。左下角：化学，一个紫色和银色的模块化分子研究结构，由球棒晶格框架构建，实验室柱、烧杯、烧瓶和发光晶体核心；平台在两个可见面上突出显示"CHEMISTRY"。围绕这个瓷砖的是4个化学相关图标：两个分子图、一对实验室试管或烧瓶和小型燃烧器。右下角：天文学，一个布满陨石坑的岩石月球观测站岛屿，有陨石坑地形，圆顶天文台，望远镜，雕刻在岩石中的楼梯，以及后面的圆形宇宙星空背景；前边缘显示"ASTRONOMY"。围绕这个瓷砖的是4个天文学主题图标：带环行星、星状火花、小型火箭和弯月。保持所有4个瓷砖均匀分布在四象限布局中，每个瓷砖都有自己柔和的几何背景形状，每个学科协调的柔和调色板，以及一种高级的gpt-image-2风格，使每个概念都像一个可收藏的微型世界。不要有人物，除了四个学科标签外不要额外文本。
```

<a id="prompt-c1c122459490532d8d37"></a>

### 186. 社交媒体帖子 - High Contrast Urban Silhouette

<img src="https://cms-assets.youmind.com/media/1777367254009_hz8595_HG7Db6HbMAASckt.jpg" alt="社交媒体帖子 - High Contrast Urban Silhouette" width="480">

一个专注于剪影、强烈方向性阳光和电影感城市构图的街头摄影提示。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/BubbleBrain/status/2048789777605128292)

**提示词:**

```text
高对比度街道剪影，来自门口的强烈定向阳光，深色阴影前景，明亮过曝的外部，{argument name="action" default="subject walking through doorway"}，全身剪影，清晰轮廓，最小细节，电影构图，都市街头摄影风格 --2:3
```

<a id="prompt-c4779ed69d65e04cf841"></a>

### 187. 漫画 / 故事板 - Monochrome Manga Guitar Studio Page

<img src="https://cms-assets.youmind.com/media/1777367311577_qyy0zf_HG67VXdbIAAIRlC.jpg" alt="漫画 / 故事板 - Monochrome Manga Guitar Studio Page" width="480">

这个提示生成一个详细的黑白漫画页面，描绘了一个高中女生在夜间工作室弹奏电吉他的场景，非常适合用于戏剧性的AI漫画叙事场景。

- **分类:** 漫画与叙事
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/yume00112211/status/2048780858505748864#reversed-3)

**提示词:**

```text
黑白漫画跨页，5个面板，干净的白色背景，细黑分隔线，以高度精细的现代少年/少女混合线条艺术绘制，带有柔和的网点、反光高光和安静的忧郁氛围。场景是夜晚的音乐工作室教室，有大窗户可以看到城市天际线，建筑物灯火通明，映衬在黑暗的天空中。主要人物：一个苗条的高中女生，留着非常长的直发和齐刘海，精致的面容，严肃沉思的表情，穿着日本校服，包括白色衬衫、松开的条纹领带和格子裙，坐着弹奏一把类似Stratocaster的实心电吉他。在左上角的大面板中，以四分之三视角展示她抱着吉他放在腿上，左手在指板上，右手靠近拾音器，周围是工作室设备，包括左后方的一个架子鼓，右侧的两个堆叠的吉他放大器，以及门附近的墙上写着"Beat Box"的标志。在右上角的窄面板中，展示吉他颈部和她按弦手的特写，带有小的垂直日本拟声文字"トン…"。在右侧中间的高面板中，展示女孩的侧面特写，她低头看着乐器，表情沉思，几乎有些失望，她身后的窗户中模糊可见夜晚的城市灯光。在左下方面板中，展示一个穿着学校西装外套和松开领带的青少年男孩，室内坐着，身体略微侧向；他的脸被一个大的柔软灰色矩形审查块遮挡，他旁边有一个垂直的对话框，包含日文文本"……やっぱり違う"。在右下方面板中，展示同一个男孩从胸部以上的更近视角，背景是柔和的散景网点；他的脸再次被一个大的灰色审查块遮挡。在底部边缘中央添加印刷页码：左页下方为"5"，右页下方为"6"。强调一个微妙的叙事主题，意识到声音感觉不对，仿佛这是戏剧性校园乐队漫画的延续页面。保持所有内容为单色、精致、电影感，且情感内敛。
```

<a id="prompt-eb6979ec0c69cbb3083f"></a>

### 188. 个人资料 / 头像 - Futuristic Glass Profile ID Card

<img src="https://cms-assets.youmind.com/media/1777367256290_aea7lr_HG7Q1SCa8AAlOgh.jpg" alt="个人资料 / 头像 - Futuristic Glass Profile ID Card" width="480">

一个用于创建未来主义3D渲染的提示，内容是一个透明的社交媒体个人资料卡，设计为发光的玻璃ID徽章。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/MrDasOnX/status/2048804504569823622)

**提示词:**

```text
创建一个超逼真的3D渲染图，展示一个透明的{argument name="platform" default="twitter"}个人资料卡片，设计成未来主义玻璃ID徽章的样子，被两根手指轻轻夹住。卡片应为矩形，带圆角，由透明光滑的玻璃或亚克力制成，边缘有发光的霓虹灯效果，颜色为{argument name="glow colors" default="pink, purple, and orange gradient"}，灵感来自Twitter的调色板。使用现代简约的无衬线字体，根据附件中我的个人资料截图，在卡片上显示以下个人资料信息。
```

<a id="prompt-8130c14070fb9dd9cc87"></a>

### 189. YouTube 缩略图 - 复古美妆教程

<img src="https://cms-assets.youmind.com/media/1777280775792_m28f3z_HG1fDJJagAA5_hh.jpg" alt="YouTube 缩略图 - 复古美妆教程" width="480">

一个创意提示词，将经典文学人物想象成 Bilibili 上的现代美妆博主。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/Mrpinecone888/status/2048398131969286552)

**提示词:**

```text
{argument name="character" default="潘金莲"} 在 {argument name="platform" default="Bilibili"} 上发布了一则美妆教程，标题为“{argument name="topic" default="如何用古法遮瑕"}”，弹幕评论写着“嫂子的手法太绝了！”
```

<a id="prompt-fbbbfe13d6d7ca89f6a7"></a>

### 190. YouTube 缩略图 - 极具戏剧性的足球电影级动作镜头

<img src="https://cms-assets.youmind.com/media/1777280759919_aj14u4_HGz6QPgbMAABDQH.jpg" alt="YouTube 缩略图 - 极具戏剧性的足球电影级动作镜头" width="480">

一个用于生成写实风格电影级动作镜头的高强度提示词，画面描绘了一名小男孩在黄金时刻踢足球的场景，前景中有一个巨大的超大号足球。

- **分类:** UI 与社交媒体
- **来源:** [YouMind-OpenLab/awesome-gpt-image-2](https://x.com/ShamiWeb3/status/2048287581868302683)

**提示词:**

```text
一张极具戏剧性的电影级动作镜头，画面中一位 {argument name="child" default="12 岁男孩"} 留着凌乱的深色头发，正在 {argument name="setting" default="绿草如茵的体育场"} 上于黄金时刻的日落时分奋力踢球。前景中是一个被放大且占据画面下方的超大号足球，呈现出类似病毒式传播的“巨型物体”照片效果，纹理极其细腻，黑白相间的拼接细节清晰可见，焦点锐利。男孩被捕捉到踢球瞬间，右腿伸展，泥土和草屑戏剧性地飞溅。他身穿一件 {argument name="clothing" default="干净的白色 T 恤"}，胸前印有醒目的黑色文字“GPT IMAGE 2.0”，搭配黑色运动短裤和带有黑色条纹的白色球袜。动态低角度视角，色彩鲜艳饱和，清晰度极高，对比度强烈，电影级光影效果，温暖的金色阳光穿透戏剧性的云层，浅景深，8k 写实画质，超精细细节，国家地理杂志风格 --ar 3:4 --stylize 250 --v 6
```

<a id="prompt-a9674a66e935b66908b8"></a>

### 191. 音乐播放器界面

<img src="https://github.com/user-attachments/assets/88f33c6a-c307-4e7a-af7e-5f692cbf41a1" alt="音乐播放器界面" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://mp.weixin.qq.com/s/ASxig6mFVYxrIE8-8Fthew)

**提示词:**

```text
创建一个高保真的中文音乐 App 播放器界面截图，采用手机竖屏比例，视觉精致，类似现代流媒体播放器。使用深色模式，背景来自专辑封面颜色的模糊扩散版本。中央放置一张大型方形专辑封面，带有细腻阴影和圆角。

界面要求：
- 顶部状态栏时间为 18:26
- 导航栏左侧是返回箭头，中间是标题，右侧是更多操作图标
- 播放进度条显示当前时间 01:42，总时长 04:18
- 包含随机播放、上一首、播放/暂停、下一首、循环播放控制按钮
- 歌词区显示 5 到 7 行滚动歌词，当前行高亮
- 操作栏包含喜欢、评论、下载、加入歌单、分享
- 底部区域包含设备投播入口和播放队列入口

使用以下精确中文标签与名称：
- title: "正在播放"
- song name: "海边的晚风"
- artist: "林秋"
- album: "夏夜实验室"

歌词排版、按钮图标、反光、阴影和深色层级都应该像真实量产界面，而不是 Dribbble 概念图。
```

<a id="prompt-c1550fbabdc1b75dd7dd"></a>

### 192. 健身训练信息图

<img src="https://pbs.twimg.com/media/HGbRt9DW8AA5V1S?format=jpg&amp;name=large" alt="健身训练信息图" width="480">

- **分类:** UI 与社交媒体
- **来源:** [ZeroLu/awesome-gpt-image](https://x.com/MrLarus/status/2046627021674168640)

**提示词:**

```text
为 [主题] 生成一张中文健身信息图。

这张图既要专业，也要便于普通成年人作为训练参考。除非另有说明，否则默认受众是没有重大伤病的健康成年人，目标是增肌并提升基础力量，水平为新手到中级，训练场景是普通健身房，总训练时长控制在 40 到 60 分钟内。

根据训练主题自动选择输出形式：

1. 如果主题是胸、背阔肌、肱二头肌、腹肌、肩部或腿部等肌群 / 身体部位，就生成对应部位的训练计划信息图。
2. 如果主题是引体向上、俯卧撑、双杠臂屈伸或深蹲等动作 / 技能目标，就生成动作解锁或进阶计划信息图。

采用清晰、现代、专业、易读的中文竖版信息图风格。视觉设计应干净，适合社交分享或个人训练参考。不要写长段落。每个模块都应使用简短短语，数字信息要足够突出。

信息图必须包含：
A. 主标题与副标题区域
B. 训练目标区域
C. 热身区域
D. 4 到 6 个核心动作组成的主要训练区域
E. 进阶或解锁逻辑区域
F. 替代动作区域
G. 执行提醒区域
H. 恢复建议区域
I. 视觉要求：现代、干净、专业、模块化卡片布局

最终结果应是一张完整信息图，而不是纯文字段落。
```
