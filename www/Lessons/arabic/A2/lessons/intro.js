// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس درس‌های A2 عربی به فارسی (درس ۱ تا ۳۰) =====

const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "الدرس ۱: العائلة",
    nextPage: "lesson1.html",
    words: [
      { ar: "عم / خال", fa: "عمو / دایی", image: "../../../media/a2/family/uncle.png" },
      { ar: "عمة / خالة", fa: "عمه / خاله", image: "../../../media/a2/family/aunt.png" },
      { ar: "ابن عم / ابن خال", fa: "پسرعمو / پسرخاله", image: "../../../media/a2/family/cousin.png" },
      { ar: "ابن الأخ", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { ar: "ابنة الأخ", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "الدرس ۲: العائلة ۲",
    nextPage: "lesson2.html",
    words: [
      { ar: "زوج", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { ar: "زوجة", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { ar: "والد", fa: "پدر و مادر", image: "../../../media/a2/family/parent.png" },
      { ar: "جد / جدة", fa: "پدربزرگ / مادربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { ar: "حفيد", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "الدرس ۳: العلاقات العائلية",
    nextPage: "lesson3.html",
    words: [
      { ar: "قريب", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { ar: "توأم", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { ar: "يتيم", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { ar: "أرملة", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { ar: "عروس", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "الدرس ۴: العائلة غير البيولوجية",
    nextPage: "lesson4.html",
    words: [
      { ar: "عريس", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { ar: "نسيب", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { ar: "زوج الأم", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { ar: "زوجة الأب", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { ar: "أخت غير شقيقة", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "الدرس ۵: النسب والنسل",
    nextPage: "lesson5.html",
    words: [
      { ar: "جد", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { ar: "نسل", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { ar: "أخ / أخت", fa: "برادر / خواهر", image: "../../../media/a2/family/sibling.png" },
      { ar: "خطيب", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { ar: "خطيبة", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "الدرس ۶: أثاث المنزل",
    nextPage: "lesson6.html",
    words: [
      { ar: "أريكة", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { ar: "ثلاجة", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { ar: "خزانة ملابس", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { ar: "مرآة", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { ar: "رف", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "الدرس ۷: أثاث المنزل ۲",
    nextPage: "lesson7.html",
    words: [
      { ar: "ستارة", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { ar: "سجادة", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { ar: "وسادة", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { ar: "بطانية", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { ar: "مصباح", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "الدرس ۸: أجزاء المنزل",
    nextPage: "lesson8.html",
    words: [
      { ar: "شرفة", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { ar: "جراج", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { ar: "قبو", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { ar: "علية", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { ar: "فناء", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "الدرس ۹: أدوات المطبخ",
    nextPage: "lesson9.html",
    words: [
      { ar: "غلاية", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { ar: "محمصة", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { ar: "خلاط", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { ar: "ميكروويف", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { ar: "غسالة صحون", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "الدرس ۱۰: الأجهزة الكهربائية",
    nextPage: "lesson10.html",
    words: [
      { ar: "مدفأة", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { ar: "مروحة", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { ar: "مكواة", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { ar: "مكنسة كهربائية", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { ar: "مكنسة", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "الدرس ۱۱: أماكن المدينة",
    nextPage: "lesson11.html",
    words: [
      { ar: "بنك", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { ar: "مكتبة", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { ar: "سينما", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { ar: "متحف", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { ar: "مطعم", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "الدرس ۱۲: أماكن المدينة ۲",
    nextPage: "lesson12.html",
    words: [
      { ar: "فندق", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { ar: "مقهى", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { ar: "مخبز", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { ar: "صيدلية", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { ar: "جزارة", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "الدرس ۱۳: المباني والمنشآت",
    nextPage: "lesson13.html",
    words: [
      { ar: "جسر", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { ar: "ميدان", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { ar: "نافورة", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { ar: "برج", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { ar: "قلعة", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "الدرس ۱۴: الأماكن الدينية",
    nextPage: "lesson14.html",
    words: [
      { ar: "معبد", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { ar: "كنيسة", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { ar: "كنيس", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { ar: "مسجد", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { ar: "مزار", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "الدرس ۱۵: الأماكن الإدارية",
    nextPage: "lesson15.html",
    words: [
      { ar: "سفارة", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { ar: "محكمة", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { ar: "سجن", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { ar: "مصنع", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { ar: "مستودع", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "الدرس ۱۶: المهن ۱",
    nextPage: "lesson16.html",
    words: [
      { ar: "طيّار", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { ar: "ممرّض", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { ar: "محامي", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { ar: "فنّان", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { ar: "طبّاخ", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "الدرس ۱۷: المهن ۲",
    nextPage: "lesson17.html",
    words: [
      { ar: "نادل", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { ar: "نادلة", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { ar: "حلّاق", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { ar: "خيّاط", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { ar: "جزار", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "الدرس ۱۸: المهن ۳",
    nextPage: "lesson18.html",
    words: [
      { ar: "ميكانيكي", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { ar: "سبّاك", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { ar: "كهربائي", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { ar: "نجّار", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { ar: "بنّاء", fa: "بنا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "الدرس ۱۹: المهن ۴",
    nextPage: "lesson19.html",
    words: [
      { ar: "عالِم", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { ar: "أستاذ", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { ar: "مؤلِّف", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { ar: "شاعر", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { ar: "موسيقي", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "الدرس ۲۰: المهن ۵",
    nextPage: "lesson20.html",
    words: [
      { ar: "ممثّل", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { ar: "ممثِّلة", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { ar: "مخرج", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { ar: "منتج", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { ar: "محرِّر", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "الدرس ۲۱: المشروبات",
    nextPage: "lesson21.html",
    words: [
      { ar: "عصير", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { ar: "قهوة", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { ar: "شاي", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { ar: "شوربة", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { ar: "كعكة", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "الدرس ۲۲: الأطعمة الشائعة",
    nextPage: "lesson22.html",
    words: [
      { ar: "بيتزا", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { ar: "باستا", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { ar: "سلطة", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { ar: "ساندويتش", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { ar: "برغر", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "الدرس ۲۳: المأكولات البحرية",
    nextPage: "lesson23.html",
    words: [
      { ar: "ستيك", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { ar: "روبيان", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { ar: "كركند", fa: "خرچنگ دریایی", image: "../../../media/a2/food/lobster.png" },
      { ar: "محار", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { ar: "سلطعون", fa: "خرچنگ", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "الدرس ۲۴: الألبان",
    nextPage: "lesson24.html",
    words: [
      { ar: "زبدة", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { ar: "جبن", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { ar: "قشدة", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { ar: "زبادي", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { ar: "آيس كريم", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "الدرس ۲۵: الإفطار",
    nextPage: "lesson25.html",
    words: [
      { ar: "توست", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { ar: "حبوب الإفطار", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { ar: "شوفان", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { ar: "مربى", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { ar: "عسل", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "الدرس ۲۶: الإكسسوارات",
    nextPage: "lesson26.html",
    words: [
      { ar: "حزام", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { ar: "وشاح", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { ar: "قفازات", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { ar: "ساعة يد", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { ar: "قلادة", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "الدرس ۲۷: المجوهرات",
    nextPage: "lesson27.html",
    words: [
      { ar: "سوار", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { ar: "قرط", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { ar: "خاتم", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { ar: "سلسلة", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { ar: "تاج", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "الدرس ۲۸: الملابس الشتوية",
    nextPage: "lesson28.html",
    words: [
      { ar: "جينز", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { ar: "سترة", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { ar: "معطف", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { ar: "سترة صدرية", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { ar: "كنزة", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "الدرس ۲۹: الملابس الصيفية",
    nextPage: "lesson29.html",
    words: [
      { ar: "شورت", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { ar: "تنورة", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { ar: "جوارب", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { ar: "ملابس داخلية", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { ar: "بيجاما", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "الدرس ۳۰: الأغراض الشخصية",
    nextPage: "lesson30.html",
    words: [
      { ar: "مظلة", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { ar: "حقيبة", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { ar: "حقيبة ظهر", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { ar: "محفظة نقود", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { ar: "حقيبة يد", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
// ===== ادامه درس‌های A2 عربی به فارسی (درس ۳۱ تا ۶۰) =====

  // ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====
  "a2-lesson31": {
    title: "الدرس ۳۱: وسائل النقل ۱",
    nextPage: "lesson31.html",
    words: [
      { ar: "تاكسي", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { ar: "قارب", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { ar: "دراجة نارية", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { ar: "مروحية", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { ar: "شاحنة", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "الدرس ۳۲: وسائل النقل ۲",
    nextPage: "lesson32.html",
    words: [
      { ar: "فان", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { ar: "جيب", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { ar: "ليموزين", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { ar: "إسعاف", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { ar: "سيارة إطفاء", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "الدرس ۳۳: وسائل النقل البحرية",
    nextPage: "lesson33.html",
    words: [
      { ar: "غواصة", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { ar: "عبّارة", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { ar: "يخت", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { ar: "زورق", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { ar: "طوافة", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "الدرس ۳۴: وسائل النقل الحديثة",
    nextPage: "lesson34.html",
    words: [
      { ar: "سكوتر", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { ar: "لوح تزلج", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { ar: "حذاء تزلج", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { ar: "هوفر بورد", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { ar: "دراجة أحادية", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "الدرس ۳۵: وسائل النقل التقليدية",
    nextPage: "lesson35.html",
    words: [
      { ar: "عربة", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { ar: "عربة نقل", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { ar: "مزلجة", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { ar: "ريكشا", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { ar: "ترام", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "الدرس ۳۶: الطبيعة",
    nextPage: "lesson36.html",
    words: [
      { ar: "نهر", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { ar: "غابة", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { ar: "صحراء", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { ar: "جزيرة", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { ar: "عاصفة", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "الدرس ۳۷: الظواهر الطبيعية",
    nextPage: "lesson37.html",
    words: [
      { ar: "شلال", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { ar: "بركان", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { ar: "نهر جليدي", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { ar: "وادٍ", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { ar: "كهف", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "الدرس ۳۸: الشاطئ والبحر",
    nextPage: "lesson38.html",
    words: [
      { ar: "شاطئ", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { ar: "ساحل", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { ar: "موجة", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { ar: "مدّ وجزر", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { ar: "جرف", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "الدرس ۳۹: الطقس",
    nextPage: "lesson39.html",
    words: [
      { ar: "ضباب", fa: "مه", image: "../../../media/a2/nature/fog.png" },
      { ar: "بَرَد", fa: "تگرگ", image: "../../../media/a2/nature/hail.png" },
      { ar: "ندفة ثلج", fa: "دانه برف", image: "../../../media/a2/nature/snowflake.png" },
      { ar: "برق", fa: "صاعقه", image: "../../../media/a2/nature/lightning.png" },
      { ar: "رعد", fa: "رعد", image: "../../../media/a2/nature/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "الدرس ۴۰: الظواهر الجوية",
    nextPage: "lesson40.html",
    words: [
      { ar: "قوس قزح", fa: "رنگین‌کمان", image: "../../../media/a2/nature/rainbow.png" },
      { ar: "نسيم", fa: "نسیم", image: "../../../media/a2/nature/breeze.png" },
      { ar: "فيضان", fa: "سیل", image: "../../../media/a2/nature/flood.png" },
      { ar: "جفاف", fa: "خشکسالی", image: "../../../media/a2/nature/drought.png" },
      { ar: "زلزال", fa: "زلزله", image: "../../../media/a2/nature/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "الدرس ۴۱: جسم الإنسان",
    nextPage: "lesson41.html",
    words: [
      { ar: "قلب", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { ar: "عظم", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { ar: "عضلة", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { ar: "جلد", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { ar: "دم", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "الدرس ۴۲: أجهزة الجسم",
    nextPage: "lesson42.html",
    words: [
      { ar: "دماغ", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { ar: "عصب", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { ar: "وريد", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { ar: "شريان", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { ar: "مفصل", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "الدرس ۴۳: الأمراض",
    nextPage: "lesson43.html",
    words: [
      { ar: "سعال", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { ar: "حمّى", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { ar: "أسبرين", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { ar: "دواء", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { ar: "حقنة", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "الدرس ۴۴: الإصابات والعلاج",
    nextPage: "lesson44.html",
    words: [
      { ar: "حساسية", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { ar: "عدوى", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { ar: "إصابة", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { ar: "جرح", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { ar: "ندبة", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "الدرس ۴۵: العلاج والمستشفى",
    nextPage: "lesson45.html",
    words: [
      { ar: "جراحة", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { ar: "نقالة", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { ar: "كرسي متحرك", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { ar: "جبس", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { ar: "ضمادة", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "الدرس ۴۶: أدوات المدرسة",
    nextPage: "lesson46.html",
    words: [
      { ar: "دفتر", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { ar: "قلم رصاص", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { ar: "مسطرة", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { ar: "ممحاة", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { ar: "آلة حاسبة", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "الدرس ۴۷: الكتاب والدراسة",
    nextPage: "lesson47.html",
    words: [
      { ar: "قاموس", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { ar: "موسوعة", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { ar: "أطلس", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { ar: "بوصلة", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { ar: "منقلة", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "الدرس ۴۸: الجامعة",
    nextPage: "lesson48.html",
    words: [
      { ar: "جامعة", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { ar: "كلية", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { ar: "حرم جامعي", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { ar: "سكن طلابي", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { ar: "مختبر", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "الدرس ۴۹: الدراسة",
    nextPage: "lesson49.html",
    words: [
      { ar: "درجة", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { ar: "امتحان", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { ar: "درس", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { ar: "مادة", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { ar: "معلّم", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "الدرس ۵۰: البحث والمقال",
    nextPage: "lesson50.html",
    words: [
      { ar: "مقال", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { ar: "أطروحة", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { ar: "تقرير", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { ar: "مشروع", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { ar: "ورشة عمل", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "الدرس ۵۱: السفر",
    nextPage: "lesson51.html",
    words: [
      { ar: "جواز سفر", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { ar: "فندق", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { ar: "أمتعة", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { ar: "رحلة جوية", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { ar: "خريطة", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "الدرس ۵۲: أدوات السفر",
    nextPage: "lesson52.html",
    words: [
      { ar: "حقيبة ظهر", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { ar: "خيمة", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { ar: "بوصلة", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { ar: "منظار ثنائي", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { ar: "واقي شمس", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "الدرس ۵۳: السياحة",
    nextPage: "lesson53.html",
    words: [
      { ar: "مرشد", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { ar: "سائح", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { ar: "تذكار", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { ar: "مغامرة", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { ar: "رحلة", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "الدرس ۵۴: الميناء والمطار",
    nextPage: "lesson54.html",
    words: [
      { ar: "ميناء", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { ar: "مرسى", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { ar: "محطة", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { ar: "بوابة", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { ar: "طاقم", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "الدرس ۵۵: وثائق السفر",
    nextPage: "lesson55.html",
    words: [
      { ar: "تأشيرة", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { ar: "عملة", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { ar: "تبادل", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { ar: "مغادرة", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { ar: "وصول", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "الدرس ۵۶: الحاسوب",
    nextPage: "lesson56.html",
    words: [
      { ar: "حاسوب", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { ar: "لوحة مفاتيح", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { ar: "فأرة", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { ar: "إنترنت", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { ar: "بريد إلكتروني", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "الدرس ۵۷: ملحقات الحاسوب",
    nextPage: "lesson57.html",
    words: [
      { ar: "شاشة", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { ar: "شاشة عرض", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { ar: "طابعة", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { ar: "ماسح ضوئي", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { ar: "مكبر صوت", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "الدرس ۵۸: البرمجيات",
    nextPage: "lesson58.html",
    words: [
      { ar: "برمجيات", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { ar: "عتاد", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { ar: "تحديث", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { ar: "كلمة مرور", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { ar: "حساب", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "الدرس ۵۹: الإنترنت",
    nextPage: "lesson59.html",
    words: [
      { ar: "تحميل", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { ar: "رفع", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { ar: "بث مباشر", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { ar: "فيديو", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { ar: "صوت", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "الدرس ۶۰: التقنيات الحديثة",
    nextPage: "lesson60.html",
    words: [
      { ar: "جهاز", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { ar: "أداة", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { ar: "روبوت", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { ar: "طائرة بدون طيّار", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { ar: "ساعة ذكية", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};


// ===== تابع پخش صدا (عربی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ الدرس غير موجود!</h2>
      <p>يرجى الدخول من الصفحة الرئيسية.</p>
      <a href="../index.html">العودة إلى الصفحة الرئيسية</a>
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
      <img src="${w.image}" alt="${w.ar}">
      <div class="word-en" style="font-family: 'Traditional Arabic', 'Amiri', serif; font-size: 22px;">${w.ar}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ar);
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