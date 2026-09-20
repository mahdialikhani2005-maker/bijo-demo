// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 روسی (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "Урок 1: Семья",
    nextPage: "lesson1.html",
    words: [
      { ru: "дядя", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { ru: "тётя", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { ru: "двоюродный брат", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { ru: "племянник", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { ru: "племянница", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "Урок 2: Семья 2",
    nextPage: "lesson2.html",
    words: [
      { ru: "муж", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { ru: "жена", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { ru: "родитель", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { ru: "дедушка", fa: "پدربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { ru: "внук", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "Урок 3: Родственные связи",
    nextPage: "lesson3.html",
    words: [
      { ru: "родственник", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { ru: "близнец", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { ru: "сирота", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { ru: "вдова", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { ru: "невеста", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "Урок 4: Приёмная семья",
    nextPage: "lesson4.html",
    words: [
      { ru: "жених", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { ru: "свояк", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { ru: "отчим", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { ru: "мачеха", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { ru: "сводная сестра", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "Урок 5: Предки",
    nextPage: "lesson5.html",
    words: [
      { ru: "предок", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { ru: "потомок", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { ru: "брат/сестра", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { ru: "жених", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { ru: "невеста", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "Урок 6: Мебель",
    nextPage: "lesson6.html",
    words: [
      { ru: "диван", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { ru: "холодильник", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { ru: "шкаф", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { ru: "зеркало", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { ru: "полка", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "Урок 7: Мебель 2",
    nextPage: "lesson7.html",
    words: [
      { ru: "штора", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { ru: "ковёр", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { ru: "подушка", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { ru: "одеяло", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { ru: "лампа", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "Урок 8: Части дома",
    nextPage: "lesson8.html",
    words: [
      { ru: "балкон", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { ru: "гараж", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { ru: "подвал", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { ru: "чердак", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { ru: "двор", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "Урок 9: Кухонные приборы",
    nextPage: "lesson9.html",
    words: [
      { ru: "чайник", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { ru: "тостер", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { ru: "блендер", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { ru: "микроволновка", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { ru: "посудомойка", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "Урок 10: Электроприборы",
    nextPage: "lesson10.html",
    words: [
      { ru: "обогреватель", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { ru: "вентилятор", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { ru: "утюг", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { ru: "пылесос", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { ru: "веник", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "Урок 11: Места в городе",
    nextPage: "lesson11.html",
    words: [
      { ru: "банк", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { ru: "библиотека", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { ru: "кинотеатр", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { ru: "музей", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { ru: "ресторан", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "Урок 12: Места в городе 2",
    nextPage: "lesson12.html",
    words: [
      { ru: "отель", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { ru: "кафе", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { ru: "пекарня", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { ru: "аптека", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { ru: "мясная лавка", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "Урок 13: Памятники и сооружения",
    nextPage: "lesson13.html",
    words: [
      { ru: "мост", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { ru: "площадь", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { ru: "фонтан", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { ru: "башня", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { ru: "замок", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "Урок 14: Места поклонения",
    nextPage: "lesson14.html",
    words: [
      { ru: "храм", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { ru: "церковь", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { ru: "синагога", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { ru: "мечеть", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { ru: "святилище", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "Урок 15: Общественные здания",
    nextPage: "lesson15.html",
    words: [
      { ru: "посольство", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { ru: "суд", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { ru: "тюрьма", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { ru: "фабрика", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { ru: "склад", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "Урок 16: Профессии 1",
    nextPage: "lesson16.html",
    words: [
      { ru: "пилот", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { ru: "медсестра", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { ru: "адвокат", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { ru: "художник", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { ru: "шеф-повар", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "Урок 17: Профессии 2",
    nextPage: "lesson17.html",
    words: [
      { ru: "официант", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { ru: "официантка", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { ru: "парикмахер", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { ru: "портной", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { ru: "мясник", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "Урок 18: Профессии 3",
    nextPage: "lesson18.html",
    words: [
      { ru: "механик", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { ru: "сантехник", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { ru: "электрик", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { ru: "плотник", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { ru: "каменщик", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "Урок 19: Профессии 4",
    nextPage: "lesson19.html",
    words: [
      { ru: "учёный", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { ru: "профессор", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { ru: "автор", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { ru: "поэт", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { ru: "музыкант", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "Урок 20: Профессии 5",
    nextPage: "lesson20.html",
    words: [
      { ru: "актёр", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { ru: "актриса", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { ru: "режиссёр", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { ru: "продюсер", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { ru: "редактор", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "Урок 21: Напитки",
    nextPage: "lesson21.html",
    words: [
      { ru: "сок", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { ru: "кофе", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { ru: "чай", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { ru: "суп", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { ru: "торт", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "Урок 22: Обычная еда",
    nextPage: "lesson22.html",
    words: [
      { ru: "пицца", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { ru: "паста", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { ru: "салат", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { ru: "бутерброд", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { ru: "гамбургер", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "Урок 23: Морепродукты",
    nextPage: "lesson23.html",
    words: [
      { ru: "стейк", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { ru: "креветка", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { ru: "омар", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { ru: "устрица", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { ru: "краб", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "Урок 24: Молочные продукты",
    nextPage: "lesson24.html",
    words: [
      { ru: "масло", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { ru: "сыр", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { ru: "сливки", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { ru: "йогурт", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { ru: "мороженое", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "Урок 25: Завтрак",
    nextPage: "lesson25.html",
    words: [
      { ru: "тост", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { ru: "хлопья", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { ru: "овсянка", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { ru: "варенье", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { ru: "мёд", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "Урок 26: Аксессуары",
    nextPage: "lesson26.html",
    words: [
      { ru: "ремень", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { ru: "шарф", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { ru: "перчатки", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { ru: "часы", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { ru: "ожерелье", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "Урок 27: Ювелирные украшения",
    nextPage: "lesson27.html",
    words: [
      { ru: "браслет", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { ru: "серьга", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { ru: "кольцо", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { ru: "цепь", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { ru: "корона", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "Урок 28: Тёплая одежда",
    nextPage: "lesson28.html",
    words: [
      { ru: "джинсы", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { ru: "куртка", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { ru: "пальто", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { ru: "жилет", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { ru: "свитер", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "Урок 29: Летняя одежда",
    nextPage: "lesson29.html",
    words: [
      { ru: "шорты", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { ru: "юбка", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { ru: "носки", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { ru: "нижнее бельё", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { ru: "пижама", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "Урок 30: Личные вещи",
    nextPage: "lesson30.html",
    words: [
      { ru: "зонт", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { ru: "сумка", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { ru: "рюкзак", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { ru: "бумажник", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { ru: "сумочка", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  "a2-lesson31": {
    title: "Урок 31: Транспорт 1",
    nextPage: "lesson31.html",
    words: [
      { ru: "такси", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { ru: "лодка", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { ru: "мотоцикл", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { ru: "вертолёт", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { ru: "грузовик", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "Урок 32: Транспорт 2",
    nextPage: "lesson32.html",
    words: [
      { ru: "фургон", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { ru: "джип", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { ru: "лимузин", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { ru: "скорая помощь", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { ru: "пожарная машина", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "Урок 33: Водный транспорт",
    nextPage: "lesson33.html",
    words: [
      { ru: "подводная лодка", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { ru: "паром", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { ru: "яхта", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { ru: "каноэ", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { ru: "плот", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "Урок 34: Современный транспорт",
    nextPage: "lesson34.html",
    words: [
      { ru: "самокат", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { ru: "скейтборд", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { ru: "ролики", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { ru: "ховерборд", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { ru: "одноколёсный велосипед", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "Урок 35: Традиционный транспорт",
    nextPage: "lesson35.html",
    words: [
      { ru: "карета", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { ru: "повозка", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { ru: "сани", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { ru: "рикша", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { ru: "трамвай", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "Урок 36: Природа",
    nextPage: "lesson36.html",
    words: [
      { ru: "река", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { ru: "лес", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { ru: "пустыня", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { ru: "остров", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { ru: "буря", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "Урок 37: Природные явления",
    nextPage: "lesson37.html",
    words: [
      { ru: "водопад", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { ru: "вулкан", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { ru: "ледник", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { ru: "каньон", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { ru: "пещера", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "Урок 38: Пляж и море",
    nextPage: "lesson38.html",
    words: [
      { ru: "пляж", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { ru: "побережье", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { ru: "волна", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { ru: "прилив", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { ru: "утес", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "Урок 39: Погода",
    nextPage: "lesson39.html",
    words: [
      { ru: "туман", fa: "مه", image: "../../../media/a2/weather/fog.png" },
      { ru: "град", fa: "تگرگ", image: "../../../media/a2/weather/hail.png" },
      { ru: "снежинка", fa: "دانه برف", image: "../../../media/a2/weather/snowflake.png" },
      { ru: "молния", fa: "صاعقه", image: "../../../media/a2/weather/lightning.png" },
      { ru: "гром", fa: "رعد", image: "../../../media/a2/weather/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "Урок 40: Атмосферные явления",
    nextPage: "lesson40.html",
    words: [
      { ru: "радуга", fa: "رنگین‌کمان", image: "../../../media/a2/weather/rainbow.png" },
      { ru: "ветерок", fa: "نسیم", image: "../../../media/a2/weather/breeze.png" },
      { ru: "наводнение", fa: "سیل", image: "../../../media/a2/weather/flood.png" },
      { ru: "засуха", fa: "خشکسالی", image: "../../../media/a2/weather/drought.png" },
      { ru: "землетрясение", fa: "زلزله", image: "../../../media/a2/weather/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "Урок 41: Тело человека",
    nextPage: "lesson41.html",
    words: [
      { ru: "сердце", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { ru: "кость", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { ru: "мышца", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { ru: "кожа", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { ru: "кровь", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "Урок 42: Системы организма",
    nextPage: "lesson42.html",
    words: [
      { ru: "мозг", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { ru: "нерв", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { ru: "вена", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { ru: "артерия", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { ru: "сустав", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "Урок 43: Болезни",
    nextPage: "lesson43.html",
    words: [
      { ru: "кашель", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { ru: "лихорадка", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { ru: "аспирин", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { ru: "лекарство", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { ru: "укол", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "Урок 44: Раны и лечение",
    nextPage: "lesson44.html",
    words: [
      { ru: "аллергия", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { ru: "инфекция", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { ru: "травма", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { ru: "рана", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { ru: "шрам", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "Урок 45: Лечение и больница",
    nextPage: "lesson45.html",
    words: [
      { ru: "операция", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { ru: "носилки", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { ru: "инвалидная коляска", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { ru: "гипс", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { ru: "повязка", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "Урок 46: Школьные принадлежности",
    nextPage: "lesson46.html",
    words: [
      { ru: "тетрадь", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { ru: "карандаш", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { ru: "линейка", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { ru: "ластик", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { ru: "калькулятор", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "Урок 47: Книги и учёба",
    nextPage: "lesson47.html",
    words: [
      { ru: "словарь", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { ru: "энциклопедия", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { ru: "атлас", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { ru: "компас", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { ru: "транспортир", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "Урок 48: Университет",
    nextPage: "lesson48.html",
    words: [
      { ru: "университет", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { ru: "колледж", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { ru: "кампус", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { ru: "общежитие", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { ru: "лаборатория", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "Урок 49: Учёба",
    nextPage: "lesson49.html",
    words: [
      { ru: "оценка", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { ru: "экзамен", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { ru: "урок", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { ru: "предмет", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { ru: "учитель", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "Урок 50: Исследования и эссе",
    nextPage: "lesson50.html",
    words: [
      { ru: "эссе", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { ru: "диссертация", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { ru: "отчёт", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { ru: "проект", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { ru: "семинар", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "Урок 51: Путешествия",
    nextPage: "lesson51.html",
    words: [
      { ru: "паспорт", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { ru: "отель", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { ru: "багаж", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { ru: "рейс", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { ru: "карта", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "Урок 52: Туристическое снаряжение",
    nextPage: "lesson52.html",
    words: [
      { ru: "рюкзак", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { ru: "палатка", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { ru: "компас", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { ru: "бинокль", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { ru: "солнцезащитный крем", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "Урок 53: Туризм",
    nextPage: "lesson53.html",
    words: [
      { ru: "гид", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { ru: "турист", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { ru: "сувенир", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { ru: "приключение", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { ru: "путешествие", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "Урок 54: Порт и аэропорт",
    nextPage: "lesson54.html",
    words: [
      { ru: "порт", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { ru: "порт", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { ru: "терминал", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { ru: "выход", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { ru: "экипаж", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "Урок 55: Документы",
    nextPage: "lesson55.html",
    words: [
      { ru: "виза", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { ru: "валюта", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { ru: "обмен", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { ru: "отправление", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { ru: "прибытие", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "Урок 56: Компьютер",
    nextPage: "lesson56.html",
    words: [
      { ru: "компьютер", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { ru: "клавиатура", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { ru: "мышь", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { ru: "интернет", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { ru: "электронная почта", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "Урок 57: Компьютерные аксессуары",
    nextPage: "lesson57.html",
    words: [
      { ru: "экран", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { ru: "монитор", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { ru: "принтер", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { ru: "сканер", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { ru: "динамик", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "Урок 58: Программное обеспечение",
    nextPage: "lesson58.html",
    words: [
      { ru: "программное обеспечение", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { ru: "аппаратное обеспечение", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { ru: "обновление", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { ru: "пароль", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { ru: "аккаунт", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "Урок 59: Интернет",
    nextPage: "lesson59.html",
    words: [
      { ru: "загрузка", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { ru: "выгрузка", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { ru: "потоковое вещание", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { ru: "видео", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { ru: "аудио", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "Урок 60: Новые технологии",
    nextPage: "lesson60.html",
    words: [
      { ru: "устройство", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { ru: "гаджет", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { ru: "робот", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { ru: "дрон", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { ru: "умные часы", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Урок не найден!</h2>
      <p>Пожалуйста, войдите с главной страницы.</p>
      <a href="../index.html">Вернуться на главную</a>
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
      <img src="${w.image}" alt="${w.ru}">
      <div class="word-en" style="font-size: 20px;">${w.ru}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ru);
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