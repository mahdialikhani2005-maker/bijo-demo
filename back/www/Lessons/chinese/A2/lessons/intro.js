// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های چینی =====
const allLessons = {
  "a2-lesson1": {
    title: "第 1 课：家庭",
    nextPage: "lesson1.html",
    words: [
      { zh: "叔叔 / 舅舅", fa: "عمو / دایی", image: "../../../media/a2/family/uncle.png" },
      { zh: "姑姑 / 阿姨", fa: "عمه / خاله", image: "../../../media/a2/family/aunt.png" },
      { zh: "堂兄弟 / 表兄弟", fa: "پسرعمو / پسرخاله", image: "../../../media/a2/family/cousin.png" },
      { zh: "侄子", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { zh: "侄女", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "第 2 课：家庭 2",
    nextPage: "lesson2.html",
    words: [
      { zh: "丈夫", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { zh: "妻子", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { zh: "父母", fa: "پدر و مادر", image: "../../../media/a2/family/parent.png" },
      { zh: "祖父母", fa: "پدربزرگ / مادربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { zh: "孙子 / 孙女", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "第 3 课：家庭关系",
    nextPage: "lesson3.html",
    words: [
      { zh: "亲戚", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { zh: "双胞胎", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { zh: "孤儿", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { zh: "寡妇", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { zh: "新娘", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "第 4 课：继亲家庭",
    nextPage: "lesson4.html",
    words: [
      { zh: "新郎", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { zh: "姻亲", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { zh: "继父", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { zh: "继母", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { zh: "异父/异母姐妹", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "第 5 课：血统与后代",
    nextPage: "lesson5.html",
    words: [
      { zh: "祖先", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { zh: "后代", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { zh: "兄弟姐妹", fa: "خواهر / برادر", image: "../../../media/a2/family/sibling.png" },
      { zh: "未婚夫", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { zh: "未婚妻", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== 类别 2: 房屋与家具 (第 6-10 课) =====
  "a2-lesson6": {
    title: "第 6 课：家具",
    nextPage: "lesson6.html",
    words: [
      { zh: "沙发", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { zh: "冰箱", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { zh: "衣柜", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { zh: "镜子", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { zh: "架子", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "第 7 课：家具 2",
    nextPage: "lesson7.html",
    words: [
      { zh: "窗帘", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { zh: "地毯", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { zh: "枕头", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { zh: "毯子", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { zh: "灯", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "第 8 课：房屋的各个部分",
    nextPage: "lesson8.html",
    words: [
      { zh: "阳台", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { zh: "车库", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { zh: "地下室", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { zh: "阁楼", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { zh: "院子", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "第 9 课：厨房用具",
    nextPage: "lesson9.html",
    words: [
      { zh: "水壶", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { zh: "烤面包机", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { zh: "搅拌机", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { zh: "微波炉", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { zh: "洗碗机", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "第 10 课：电器",
    nextPage: "lesson10.html",
    words: [
      { zh: "暖气", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { zh: "风扇", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { zh: "熨斗", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { zh: "吸尘器", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { zh: "扫帚", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== 类别 3: 城市与地点 (第 11-15 课) =====
  "a2-lesson11": {
    title: "第 11 课：城市地点",
    nextPage: "lesson11.html",
    words: [
      { zh: "银行", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { zh: "图书馆", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { zh: "电影院", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { zh: "博物馆", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { zh: "餐厅", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "第 12 课：城市地点 2",
    nextPage: "lesson12.html",
    words: [
      { zh: "酒店", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { zh: "咖啡馆", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { zh: "面包店", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { zh: "药店", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { zh: "肉店", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "第 13 课：建筑物与构造",
    nextPage: "lesson13.html",
    words: [
      { zh: "桥", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { zh: "广场", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { zh: "喷泉", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { zh: "塔", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { zh: "城堡", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "第 14 课：宗教场所",
    nextPage: "lesson14.html",
    words: [
      { zh: "寺庙", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { zh: "教堂", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { zh: "犹太教堂", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { zh: "清真寺", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { zh: "圣地", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "第 15 课：行政场所",
    nextPage: "lesson15.html",
    words: [
      { zh: "大使馆", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { zh: "法院", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { zh: "监狱", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { zh: "工厂", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { zh: "仓库", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== 类别 4: 职业 (第 16-20 课) =====
  "a2-lesson16": {
    title: "第 16 课：职业 1",
    nextPage: "lesson16.html",
    words: [
      { zh: "飞行员", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { zh: "护士", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { zh: "律师", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { zh: "艺术家", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { zh: "厨师", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "第 17 课：职业 2",
    nextPage: "lesson17.html",
    words: [
      { zh: "服务员", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { zh: "女服务员", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { zh: "理发师", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { zh: "裁缝", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { zh: "屠夫", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "第 18 课：职业 3",
    nextPage: "lesson18.html",
    words: [
      { zh: "机械师", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { zh: "水管工", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { zh: "电工", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { zh: "木匠", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { zh: "泥瓦匠", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "第 19 课：职业 4",
    nextPage: "lesson19.html",
    words: [
      { zh: "科学家", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { zh: "教授", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { zh: "作家", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { zh: "诗人", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { zh: "音乐家", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "第 20 课：职业 5",
    nextPage: "lesson20.html",
    words: [
      { zh: "演员", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { zh: "女演员", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { zh: "导演", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { zh: "制片人", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { zh: "编辑", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== 类别 5: 食物与饮料 (第 21-25 课) =====
  "a2-lesson21": {
    title: "第 21 课：饮料",
    nextPage: "lesson21.html",
    words: [
      { zh: "果汁", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { zh: "咖啡", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { zh: "茶", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { zh: "汤", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { zh: "蛋糕", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "第 22 课：常见食物",
    nextPage: "lesson22.html",
    words: [
      { zh: "披萨", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { zh: "意大利面", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { zh: "沙拉", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { zh: "三明治", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { zh: "汉堡", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "第 23 课：海鲜",
    nextPage: "lesson23.html",
    words: [
      { zh: "牛排", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { zh: "虾", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { zh: "龙虾", fa: "خرچنگ دریایی", image: "../../../media/a2/food/lobster.png" },
      { zh: "牡蛎", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { zh: "螃蟹", fa: "خرچنگ", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "第 24 课：乳制品",
    nextPage: "lesson24.html",
    words: [
      { zh: "黄油", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { zh: "奶酪", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { zh: "奶油", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { zh: "酸奶", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { zh: "冰淇淋", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "第 25 课：早餐",
    nextPage: "lesson25.html",
    words: [
      { zh: "吐司", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { zh: "谷物", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { zh: "燕麦", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { zh: "果酱", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { zh: "蜂蜜", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== 类别 6: 服装与配饰 (第 26-30 课) =====
  "a2-lesson26": {
    title: "第 26 课：配饰",
    nextPage: "lesson26.html",
    words: [
      { zh: "腰带", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { zh: "围巾", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { zh: "手套", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { zh: "手表", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { zh: "项链", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "第 27 课：珠宝",
    nextPage: "lesson27.html",
    words: [
      { zh: "手镯", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { zh: "耳环", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { zh: "戒指", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { zh: "链子", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { zh: "皇冠", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "第 28 课：冬装",
    nextPage: "lesson28.html",
    words: [
      { zh: "牛仔裤", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { zh: "夹克", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { zh: "外套", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { zh: "背心", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { zh: "毛衣", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "第 29 课：夏装",
    nextPage: "lesson29.html",
    words: [
      { zh: "短裤", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { zh: "裙子", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { zh: "袜子", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { zh: "内衣", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { zh: "睡衣", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "第 30 课：个人物品",
    nextPage: "lesson30.html",
    words: [
      { zh: "雨伞", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { zh: "包", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { zh: "背包", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { zh: "钱包", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { zh: "手提包", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  "a2-lesson31": {
    title: "第 31 课：交通工具 1",
    nextPage: "lesson31.html",
    words: [
      { zh: "出租车", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { zh: "船", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { zh: "摩托车", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { zh: "直升机", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { zh: "卡车", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "第 32 课：交通工具 2",
    nextPage: "lesson32.html",
    words: [
      { zh: "面包车", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { zh: "吉普车", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { zh: "豪华轿车", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { zh: "救护车", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { zh: "消防车", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "第 33 课：水上交通工具",
    nextPage: "lesson33.html",
    words: [
      { zh: "潜水艇", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { zh: "渡轮", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { zh: "游艇", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { zh: "独木舟", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { zh: "筏子", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "第 34 课：现代交通工具",
    nextPage: "lesson34.html",
    words: [
      { zh: "滑板车", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { zh: "滑板", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { zh: "直排轮", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { zh: "悬浮滑板", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { zh: "独轮车", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "第 35 课：传统交通工具",
    nextPage: "lesson35.html",
    words: [
      { zh: "马车", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { zh: "货车", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { zh: "雪橇", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { zh: "人力车", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { zh: "有轨电车", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== 类别 8: 自然与天气 (第 36-40 课) =====
  "a2-lesson36": {
    title: "第 36 课：自然",
    nextPage: "lesson36.html",
    words: [
      { zh: "河流", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { zh: "森林", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { zh: "沙漠", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { zh: "岛屿", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { zh: "风暴", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "第 37 课：自然现象",
    nextPage: "lesson37.html",
    words: [
      { zh: "瀑布", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { zh: "火山", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { zh: "冰川", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { zh: "峡谷", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { zh: "洞穴", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "第 38 课：海滩与海洋",
    nextPage: "lesson38.html",
    words: [
      { zh: "海滩", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { zh: "海岸", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { zh: "波浪", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { zh: "潮汐", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { zh: "悬崖", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "第 39 课：天气",
    nextPage: "lesson39.html",
    words: [
      { zh: "雾", fa: "مه", image: "../../../media/a2/nature/fog.png" },
      { zh: "冰雹", fa: "تگرگ", image: "../../../media/a2/nature/hail.png" },
      { zh: "雪花", fa: "دانه برف", image: "../../../media/a2/nature/snowflake.png" },
      { zh: "闪电", fa: "صاعقه", image: "../../../media/a2/nature/lightning.png" },
      { zh: "雷声", fa: "رعد", image: "../../../media/a2/nature/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "第 40 课：气象现象",
    nextPage: "lesson40.html",
    words: [
      { zh: "彩虹", fa: "رنگین‌کمان", image: "../../../media/a2/nature/rainbow.png" },
      { zh: "微风", fa: "نسیم", image: "../../../media/a2/nature/breeze.png" },
      { zh: "洪水", fa: "سیل", image: "../../../media/a2/nature/flood.png" },
      { zh: "干旱", fa: "خشکسالی", image: "../../../media/a2/nature/drought.png" },
      { zh: "地震", fa: "زلزله", image: "../../../media/a2/nature/earthquake.png" }
    ]
  },  // ===== 类别 9: 健康与身体 (第 41-45 课) =====
  "a2-lesson41": {
    title: "第 41 课：人体",
    nextPage: "lesson41.html",
    words: [
      { zh: "心脏", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { zh: "骨头", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { zh: "肌肉", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { zh: "皮肤", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { zh: "血液", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "第 42 课：身体系统",
    nextPage: "lesson42.html",
    words: [
      { zh: "大脑", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { zh: "神经", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { zh: "静脉", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { zh: "动脉", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { zh: "关节", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "第 43 课：疾病",
    nextPage: "lesson43.html",
    words: [
      { zh: "咳嗽", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { zh: "发烧", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { zh: "阿司匹林", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { zh: "药", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { zh: "注射", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "第 44 课：伤害与治疗",
    nextPage: "lesson44.html",
    words: [
      { zh: "过敏", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { zh: "感染", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { zh: "受伤", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { zh: "伤口", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { zh: "疤痕", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "第 45 课：治疗与医院",
    nextPage: "lesson45.html",
    words: [
      { zh: "手术", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { zh: "担架", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { zh: "轮椅", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { zh: "石膏", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { zh: "绷带", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== 类别 10: 教育与学校 (第 46-50 课) =====
  "a2-lesson46": {
    title: "第 46 课：学校用品",
    nextPage: "lesson46.html",
    words: [
      { zh: "笔记本", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { zh: "铅笔", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { zh: "尺子", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { zh: "橡皮擦", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { zh: "计算器", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "第 47 课：书籍与学习",
    nextPage: "lesson47.html",
    words: [
      { zh: "词典", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { zh: "百科全书", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { zh: "地图册", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { zh: "指南针", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { zh: "量角器", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "第 48 课：大学",
    nextPage: "lesson48.html",
    words: [
      { zh: "大学", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { zh: "学院", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { zh: "校园", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { zh: "宿舍", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { zh: "实验室", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "第 49 课：学习",
    nextPage: "lesson49.html",
    words: [
      { zh: "成绩", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { zh: "考试", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { zh: "课", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { zh: "科目", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { zh: "老师", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "第 50 课：研究与论文",
    nextPage: "lesson50.html",
    words: [
      { zh: "论文", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { zh: "毕业论文", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { zh: "报告", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { zh: "项目", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { zh: "研讨会", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== 类别 11: 旅行与旅游 (第 51-55 课) =====
  "a2-lesson51": {
    title: "第 51 课：旅行",
    nextPage: "lesson51.html",
    words: [
      { zh: "护照", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { zh: "酒店", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { zh: "行李", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { zh: "航班", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { zh: "地图", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "第 52 课：旅行用品",
    nextPage: "lesson52.html",
    words: [
      { zh: "背包", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { zh: "帐篷", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { zh: "指南针", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { zh: "双筒望远镜", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { zh: "防晒霜", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "第 53 课：旅游",
    nextPage: "lesson53.html",
    words: [
      { zh: "导游", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { zh: "游客", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { zh: "纪念品", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { zh: "冒险", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { zh: "旅程", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "第 54 课：港口与机场",
    nextPage: "lesson54.html",
    words: [
      { zh: "港口", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { zh: "码头", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { zh: "航站楼", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { zh: "登机口", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { zh: "机组人员", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "第 55 课：旅行证件",
    nextPage: "lesson55.html",
    words: [
      { zh: "签证", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { zh: "货币", fa: "واحد پول", image: "../../../media/a2/travel/currency.png" },
      { zh: "兑换", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { zh: "出发", fa: "خروج", image: "../../../media/a2/travel/departure.png" },
      { zh: "到达", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== 类别 12: 科技与计算机 (第 56-60 课) =====
  "a2-lesson56": {
    title: "第 56 课：计算机",
    nextPage: "lesson56.html",
    words: [
      { zh: "计算机", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { zh: "键盘", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { zh: "鼠标", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { zh: "互联网", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { zh: "电子邮件", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "第 57 课：电脑配件",
    nextPage: "lesson57.html",
    words: [
      { zh: "屏幕", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { zh: "显示器", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { zh: "打印机", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { zh: "扫描仪", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { zh: "扬声器", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "第 58 课：软件",
    nextPage: "lesson58.html",
    words: [
      { zh: "软件", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { zh: "硬件", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { zh: "更新", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { zh: "密码", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { zh: "账户", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "第 59 课：互联网",
    nextPage: "lesson59.html",
    words: [
      { zh: "下载", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { zh: "上传", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { zh: "直播", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { zh: "视频", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { zh: "音频", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "第 60 课：新技术",
    nextPage: "lesson60.html",
    words: [
      { zh: "设备", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { zh: "小工具", fa: "ابزار دیجیتال", image: "../../../media/a2/technology/gadget.png" },
      { zh: "机器人", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { zh: "无人机", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { zh: "智能手表", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (چینی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ 未找到课程!</h2>
      <p>请从主页进入。</p>
      <a href="../index.html">返回主页</a>
    `;
    return;
  }

  document.getElementById("lesson-title").textContent = "📚 " + lesson.title;

  const container = document.getElementById("word-grid");
  container.innerHTML = "";

  lesson.words.forEach((w) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <img src="${w.image}" alt="${w.zh}">
      <div class="word-en" style="font-size: 22px;">${w.zh}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.zh);
      card.style.borderColor = "#00b894";
      setTimeout(() => {
        card.style.borderColor = "transparent";
      }, 800);
    });
    container.appendChild(card);
  });

  document.getElementById("start-lesson-btn").addEventListener("click", () => {
    window.location.href = lesson.nextPage;
  });
}

window.onload = renderIntro;