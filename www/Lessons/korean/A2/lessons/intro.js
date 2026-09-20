// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 کره‌ای (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "제1과: 가족 (가족)",
    nextPage: "lesson1.html",
    words: [
      { kr: "삼촌", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { kr: "고모/이모", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { kr: "사촌", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { kr: "조카 (남)", fa: "برادرزاده (پسر)", image: "../../../media/a2/family/nephew.png" },
      { kr: "조카 (여)", fa: "خواهرزاده (دختر)", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "제2과: 가족 2 (가족 2)",
    nextPage: "lesson2.html",
    words: [
      { kr: "남편", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { kr: "아내", fa: "همسر (زن)", image: "../../../media/a2/family/wife.png" },
      { kr: "부모님", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { kr: "할아버지", fa: "پدربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { kr: "할머니", fa: "مادربزرگ", image: "../../../media/a2/family/grandparent.png" }
    ]
  },
  "a2-lesson3": {
    title: "제3과: 친척 관계 (친척 관계)",
    nextPage: "lesson3.html",
    words: [
      { kr: "친척", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { kr: "쌍둥이", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { kr: "고아", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { kr: "과부", fa: "بیوه (زن)", image: "../../../media/a2/family/widow.png" },
      { kr: "신부", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "제4과: 인척 관계 (인척 관계)",
    nextPage: "lesson4.html",
    words: [
      { kr: "신랑", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { kr: "인척", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { kr: "계부", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { kr: "계모", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { kr: "의붓여동생", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "제5과: 조상 (조상)",
    nextPage: "lesson5.html",
    words: [
      { kr: "조상", fa: "جد/نیاکان", image: "../../../media/a2/family/ancestor.png" },
      { kr: "후손", fa: "فرزند/نسل", image: "../../../media/a2/family/descendant.png" },
      { kr: "형제자매", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { kr: "약혼자 (남)", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { kr: "약혼자 (여)", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "제6과: 집 가구 (집 가구)",
    nextPage: "lesson6.html",
    words: [
      { kr: "소파", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { kr: "냉장고", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { kr: "옷장", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { kr: "거울", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { kr: "책장", fa: "قفسه کتاب", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "제7과: 집 가구 2 (집 가구 2)",
    nextPage: "lesson7.html",
    words: [
      { kr: "커튼", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { kr: "양탄자", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { kr: "베개", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { kr: "담요", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { kr: "램프", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "제8과: 집의 부분 (집의 부분)",
    nextPage: "lesson8.html",
    words: [
      { kr: "발코니", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { kr: "차고", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { kr: "지하실", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { kr: "다락방", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { kr: "마당", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "제9과: 주방용품 (주방용품)",
    nextPage: "lesson9.html",
    words: [
      { kr: "주전자", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { kr: "토스터", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { kr: "믹서기", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { kr: "전자레인지", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { kr: "식기세척기", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "제10과: 전자제품 (전자제품)",
    nextPage: "lesson10.html",
    words: [
      { kr: "난로", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { kr: "선풍기", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { kr: "다리미", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { kr: "청소기", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { kr: "빗자루", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "제11과: 도시의 장소 (도시의 장소)",
    nextPage: "lesson11.html",
    words: [
      { kr: "은행", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { kr: "도서관", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { kr: "영화관", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { kr: "박물관", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { kr: "레스토랑", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "제12과: 도시의 장소 2 (도시의 장소 2)",
    nextPage: "lesson12.html",
    words: [
      { kr: "호텔", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { kr: "카페", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { kr: "빵집", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { kr: "약국", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { kr: "정육점", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "제13과: 건물과 기념물 (건물과 기념물)",
    nextPage: "lesson13.html",
    words: [
      { kr: "다리", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { kr: "광장", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { kr: "분수", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { kr: "탑", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { kr: "성", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "제14과: 종교 시설 (종교 시설)",
    nextPage: "lesson14.html",
    words: [
      { kr: "신사", fa: "معبد شینتویی", image: "../../../media/a2/city/temple.png" },
      { kr: "교회", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { kr: "시나고그", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { kr: "모스크", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { kr: "성지", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "제15과: 공공 시설 (공공 시설)",
    nextPage: "lesson15.html",
    words: [
      { kr: "대사관", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { kr: "법원", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { kr: "교도소", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { kr: "공장", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { kr: "창고", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "제16과: 직업 1 (직업 1)",
    nextPage: "lesson16.html",
    words: [
      { kr: "조종사", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { kr: "간호사", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { kr: "변호사", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { kr: "예술가", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { kr: "셰프", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "제17과: 직업 2 (직업 2)",
    nextPage: "lesson17.html",
    words: [
      { kr: "웨이터", fa: "پیشخدمت (مرد)", image: "../../../media/a2/jobs/waiter.png" },
      { kr: "웨이트리스", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { kr: "이발사", fa: "آرایشگر مرد", image: "../../../media/a2/jobs/barber.png" },
      { kr: "재단사", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { kr: "정육점 주인", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "제18과: 직업 3 (직업 3)",
    nextPage: "lesson18.html",
    words: [
      { kr: "정비사", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { kr: "배관공", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { kr: "전기기사", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { kr: "목수", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { kr: "석공", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "제19과: 직업 4 (직업 4)",
    nextPage: "lesson19.html",
    words: [
      { kr: "과학자", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { kr: "교수", fa: "استاد دانشگاه", image: "../../../media/a2/jobs/professor.png" },
      { kr: "작가", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { kr: "시인", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { kr: "음악가", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "제20과: 직업 5 (직업 5)",
    nextPage: "lesson20.html",
    words: [
      { kr: "배우 (남)", fa: "بازیگر (مرد)", image: "../../../media/a2/jobs/actor.png" },
      { kr: "배우 (여)", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { kr: "감독", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { kr: "제작자", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { kr: "편집자", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "제21과: 음료 (음료)",
    nextPage: "lesson21.html",
    words: [
      { kr: "주스", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { kr: "커피", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { kr: "차", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { kr: "수프", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { kr: "케이크", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "제22과: 음식 (음식)",
    nextPage: "lesson22.html",
    words: [
      { kr: "피자", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { kr: "파스타", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { kr: "샐러드", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { kr: "샌드위치", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { kr: "햄버거", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "제23과: 해산물 (해산물)",
    nextPage: "lesson23.html",
    words: [
      { kr: "스테이크", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { kr: "새우", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { kr: "랍스터", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { kr: "굴", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { kr: "게", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "제24과: 유제품 (유제품)",
    nextPage: "lesson24.html",
    words: [
      { kr: "버터", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { kr: "치즈", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { kr: "크림", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { kr: "요구르트", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { kr: "아이스크림", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "제25과: 아침 식사 (아침 식사)",
    nextPage: "lesson25.html",
    words: [
      { kr: "토스트", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { kr: "시리얼", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { kr: "오트밀", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { kr: "잼", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { kr: "꿀", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "제26과: 액세서리 (액세서리)",
    nextPage: "lesson26.html",
    words: [
      { kr: "벨트", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { kr: "목도리", fa: "شال گردن", image: "../../../media/a2/clothes/scarf.png" },
      { kr: "장갑", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { kr: "손목시계", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { kr: "목걸이", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "제27과: 보석 (보석)",
    nextPage: "lesson27.html",
    words: [
      { kr: "팔찌", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { kr: "귀걸이", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { kr: "반지", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { kr: "목걸이 (금)", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { kr: "왕관", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "제28과: 겨울옷 (겨울옷)",
    nextPage: "lesson28.html",
    words: [
      { kr: "청바지", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { kr: "자켓", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { kr: "코트", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { kr: "조끼", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { kr: "스웨터", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "제29과: 여름옷 (여름옷)",
    nextPage: "lesson29.html",
    words: [
      { kr: "반바지", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { kr: "치마", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { kr: "양말", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { kr: "속옷", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { kr: "파자마", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "제30과: 소지품 (소지품)",
    nextPage: "lesson30.html",
    words: [
      { kr: "우산", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { kr: "가방", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { kr: "배낭", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { kr: "지갑", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { kr: "핸드백", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  // ===== ادامه دیتابیس درس‌های A2 کره‌ای (درس ۳۱ تا ۶۰) =====

  // ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====
  "a2-lesson31": {
    title: "제31과: 교통수단 1 (교통수단 1)",
    nextPage: "lesson31.html",
    words: [
      { kr: "택시", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { kr: "보트", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { kr: "오토바이", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { kr: "헬리콥터", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { kr: "트럭", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "제32과: 교통수단 2 (교통수단 2)",
    nextPage: "lesson32.html",
    words: [
      { kr: "밴", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { kr: "지프", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { kr: "리무진", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { kr: "구급차", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { kr: "소방차", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "제33과: 수상 교통수단 (수상 교통수단)",
    nextPage: "lesson33.html",
    words: [
      { kr: "잠수함", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { kr: "페리", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { kr: "요트", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { kr: "카누", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { kr: "뗏목", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "제34과: 새로운 교통수단 (새로운 교통수단)",
    nextPage: "lesson34.html",
    words: [
      { kr: "킥보드", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { kr: "스케이트보드", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { kr: "롤러블레이드", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { kr: "호버보드", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { kr: "외발자전거", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "제35과: 전통 교통수단 (전통 교통수단)",
    nextPage: "lesson35.html",
    words: [
      { kr: "마차", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { kr: "수레", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { kr: "썰매", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { kr: "인력거", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { kr: "노면전차", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "제36과: 자연 (자연)",
    nextPage: "lesson36.html",
    words: [
      { kr: "강", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { kr: "숲", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { kr: "사막", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { kr: "섬", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { kr: "폭풍", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "제37과: 자연 현상 (자연 현상)",
    nextPage: "lesson37.html",
    words: [
      { kr: "폭포", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { kr: "화산", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { kr: "빙하", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { kr: "협곡", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { kr: "동굴", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "제38과: 해변 (해변)",
    nextPage: "lesson38.html",
    words: [
      { kr: "해변", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { kr: "해안", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { kr: "파도", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { kr: "조수", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { kr: "절벽", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "제39과: 날씨 (날씨)",
    nextPage: "lesson39.html",
    words: [
      { kr: "안개", fa: "مه", image: "../../../media/a2/weather/fog.png" },
      { kr: "우박", fa: "تگرگ", image: "../../../media/a2/weather/hail.png" },
      { kr: "눈송이", fa: "دانه برف", image: "../../../media/a2/weather/snowflake.png" },
      { kr: "번개", fa: "صاعقه", image: "../../../media/a2/weather/lightning.png" },
      { kr: "천둥", fa: "رعد", image: "../../../media/a2/weather/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "제40과: 기상 현상 (기상 현상)",
    nextPage: "lesson40.html",
    words: [
      { kr: "무지개", fa: "رنگین‌کمان", image: "../../../media/a2/weather/rainbow.png" },
      { kr: "산들바람", fa: "نسیم", image: "../../../media/a2/weather/breeze.png" },
      { kr: "홍수", fa: "سیل", image: "../../../media/a2/weather/flood.png" },
      { kr: "가뭄", fa: "خشکسالی", image: "../../../media/a2/weather/drought.png" },
      { kr: "지진", fa: "زلزله", image: "../../../media/a2/weather/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "제41과: 인체 (인체)",
    nextPage: "lesson41.html",
    words: [
      { kr: "심장", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { kr: "뼈", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { kr: "근육", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { kr: "피부", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { kr: "피", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "제42과: 신체 구조 (신체 구조)",
    nextPage: "lesson42.html",
    words: [
      { kr: "뇌", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { kr: "신경", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { kr: "정맥", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { kr: "동맥", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { kr: "관절", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "제43과: 질병 (질병)",
    nextPage: "lesson43.html",
    words: [
      { kr: "기침", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { kr: "열", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { kr: "아스피린", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { kr: "약", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { kr: "주사", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "제44과: 부상과 치료 (부상과 치료)",
    nextPage: "lesson44.html",
    words: [
      { kr: "알레르기", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { kr: "감염", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { kr: "부상", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { kr: "상처", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { kr: "흉터", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "제45과: 치료와 병원 (치료와 병원)",
    nextPage: "lesson45.html",
    words: [
      { kr: "수술", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { kr: "들것", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { kr: "휠체어", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { kr: "깁스", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { kr: "붕대", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "제46과: 문구류 (문구류)",
    nextPage: "lesson46.html",
    words: [
      { kr: "공책", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { kr: "연필", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { kr: "자", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { kr: "지우개", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { kr: "계산기", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "제47과: 책과 공부 (책과 공부)",
    nextPage: "lesson47.html",
    words: [
      { kr: "사전", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { kr: "백과사전", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { kr: "지도", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { kr: "나침반", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { kr: "각도기", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "제48과: 대학교 (대학교)",
    nextPage: "lesson48.html",
    words: [
      { kr: "대학교", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { kr: "칼리지", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { kr: "캠퍼스", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { kr: "기숙사", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { kr: "연구실", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "제49과: 공부 (공부)",
    nextPage: "lesson49.html",
    words: [
      { kr: "성적", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { kr: "시험", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { kr: "수업", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { kr: "과목", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { kr: "선생님", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "제50과: 연구와 논문 (연구와 논문)",
    nextPage: "lesson50.html",
    words: [
      { kr: "에세이", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { kr: "논문", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { kr: "보고서", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { kr: "프로젝트", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { kr: "워크숍", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "제51과: 여행 (여행)",
    nextPage: "lesson51.html",
    words: [
      { kr: "여권", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { kr: "호텔", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { kr: "짐", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { kr: "비행기표", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { kr: "지도", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "제52과: 여행용품 (여행용품)",
    nextPage: "lesson52.html",
    words: [
      { kr: "배낭", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { kr: "텐트", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { kr: "나침반", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { kr: "쌍안경", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { kr: "선크림", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "제53과: 관광 (관광)",
    nextPage: "lesson53.html",
    words: [
      { kr: "가이드", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { kr: "관광객", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { kr: "기념품", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { kr: "모험", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { kr: "여행", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "제54과: 항구와 공항 (항구와 공항)",
    nextPage: "lesson54.html",
    words: [
      { kr: "항구", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { kr: "부두", fa: "اسکله", image: "../../../media/a2/travel/pier.png" },
      { kr: "터미널", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { kr: "게이트", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { kr: "승무원", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "제55과: 여행 서류 (여행 서류)",
    nextPage: "lesson55.html",
    words: [
      { kr: "비자", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { kr: "통화", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { kr: "환전", fa: "تبدیل ارز", image: "../../../media/a2/travel/exchange.png" },
      { kr: "출발", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { kr: "도착", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "제56과: 컴퓨터",
    nextPage: "lesson56.html",
    words: [
      { kr: "컴퓨터", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { kr: "키보드", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { kr: "마우스", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { kr: "인터넷", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { kr: "이메일", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "제57과: 컴퓨터 주변기기 (컴퓨터 주변기기)",
    nextPage: "lesson57.html",
    words: [
      { kr: "화면", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { kr: "모니터", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { kr: "프린터", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { kr: "스캐너", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { kr: "스피커", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "제58과: 소프트웨어 (소프트웨어)",
    nextPage: "lesson58.html",
    words: [
      { kr: "소프트웨어", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { kr: "하드웨어", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { kr: "업데이트", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { kr: "비밀번호", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { kr: "계정", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "제59과: 인터넷",
    nextPage: "lesson59.html",
    words: [
      { kr: "다운로드", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { kr: "업로드", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { kr: "스트리밍", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { kr: "비디오", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { kr: "오디오", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "제60과: 새로운 기술 (새로운 기술)",
    nextPage: "lesson60.html",
    words: [
      { kr: "기기", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { kr: "가젯", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { kr: "로봇", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { kr: "드론", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { kr: "스마트워치", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (کره‌ای) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ 레슨을 찾을 수 없습니다!</h2>
      <p>홈페이지에서 들어가주세요.</p>
      <a href="../index.html">홈으로 돌아가기</a>
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
      <img src="${w.image}" alt="${w.ko}">
      <div class="word-en" style="font-size: 22px;">${w.ko}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ko);
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