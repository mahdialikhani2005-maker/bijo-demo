// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 ژاپنی (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "第1課: 家族 (かぞく)",
    nextPage: "lesson1.html",
    words: [
      { jp: "おじ", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { jp: "おば", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { jp: "いとこ", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { jp: "おい", fa: "برادرزاده (پسر)", image: "../../../media/a2/family/nephew.png" },
      { jp: "めい", fa: "خواهرزاده (دختر)", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "第2課: 家族 2 (かぞく 2)",
    nextPage: "lesson2.html",
    words: [
      { jp: "おっと", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { jp: "つま", fa: "همسر (زن)", image: "../../../media/a2/family/wife.png" },
      { jp: "りょうしん", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { jp: "そふ", fa: "پدربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { jp: "そぼ", fa: "مادربزرگ", image: "../../../media/a2/family/grandparent.png" }
    ]
  },
  "a2-lesson3": {
    title: "第3課: 親族関係 (しんぞくかんけい)",
    nextPage: "lesson3.html",
    words: [
      { jp: "しんせき", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { jp: "ふたご", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { jp: "みなしご", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { jp: "やもめ", fa: "بیوه (زن)", image: "../../../media/a2/family/widow.png" },
      { jp: "はなよめ", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "第4課: 義理の家族 (ぎりのかぞく)",
    nextPage: "lesson4.html",
    words: [
      { jp: "はなむこ", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { jp: "ぎり", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { jp: "けいふ", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { jp: "けいぼ", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { jp: "ぎまい", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "第5課: 祖先 (そせん)",
    nextPage: "lesson5.html",
    words: [
      { jp: "そせん", fa: "جد/نیاکان", image: "../../../media/a2/family/ancestor.png" },
      { jp: "しそん", fa: "فرزند/نسل", image: "../../../media/a2/family/descendant.png" },
      { jp: "きょうだい", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { jp: "こんやくしゃ", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { jp: "こんやくしゃ", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "第6課: 家の家具 (いえのかぐ)",
    nextPage: "lesson6.html",
    words: [
      { jp: "ソファ", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { jp: "れいぞうこ", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { jp: "ようふくいれ", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { jp: "かがみ", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { jp: "ほんだな", fa: "قفسه کتاب", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "第7課: 家の家具 2 (いえのかぐ 2)",
    nextPage: "lesson7.html",
    words: [
      { jp: "カーテン", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { jp: "じゅうたん", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { jp: "まくら", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { jp: "けっとう", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { jp: "ランプ", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "第8課: 家の部分 (いえのぶぶん)",
    nextPage: "lesson8.html",
    words: [
      { jp: "バルコニー", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { jp: "ガレージ", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { jp: "ちかしつ", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { jp: "やねうら", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { jp: "にわ", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "第9課: 台所用品 (だいどころようひん)",
    nextPage: "lesson9.html",
    words: [
      { jp: "やかん", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { jp: "トースター", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { jp: "ミキサー", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { jp: "でんしレンジ", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { jp: "しょっきあらいき", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "第10課: 電化製品 (でんかせいひん)",
    nextPage: "lesson10.html",
    words: [
      { jp: "だんぼう", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { jp: "せんぷうき", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { jp: "アイロン", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { jp: "そうじき", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { jp: "ほうき", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "第11課: 街の場所 (まちのばしょ)",
    nextPage: "lesson11.html",
    words: [
      { jp: "ぎんこう", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { jp: "としょかん", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { jp: "えいがかん", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { jp: "はくぶつかん", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { jp: "レストラン", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "第12課: 街の場所 2 (まちのばしょ 2)",
    nextPage: "lesson12.html",
    words: [
      { jp: "ホテル", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { jp: "カフェ", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { jp: "パンや", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { jp: "くすりや", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { jp: "にくや", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "第13課: 建物とモニュメント (たてものとモニュメント)",
    nextPage: "lesson13.html",
    words: [
      { jp: "はし", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { jp: "ひろば", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { jp: "ふんすい", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { jp: "とう", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { jp: "しろ", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "第14課: 宗教施設 (しゅうきょうしせつ)",
    nextPage: "lesson14.html",
    words: [
      { jp: "じんじゃ", fa: "معبد شینتویی", image: "../../../media/a2/city/temple.png" },
      { jp: "きょうかい", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { jp: "シナゴーグ", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { jp: "モスク", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { jp: "れいじょう", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "第15課: 公共施設 (こうきょうしせつ)",
    nextPage: "lesson15.html",
    words: [
      { jp: "たいしかん", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { jp: "さいばんしょ", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { jp: "けいむしょ", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { jp: "こうじょう", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { jp: "そうこ", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "第16課: 職業 1 (しょくぎょう 1)",
    nextPage: "lesson16.html",
    words: [
      { jp: "パイロット", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { jp: "かんごし", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { jp: "べんごし", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { jp: "げいじゅつか", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { jp: "シェフ", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "第17課: 職業 2 (しょくぎょう 2)",
    nextPage: "lesson17.html",
    words: [
      { jp: "ウエイター", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { jp: "ウエイトレス", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { jp: "りはつし", fa: "آرایشگر مرد", image: "../../../media/a2/jobs/barber.png" },
      { jp: "さいてんし", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { jp: "にくや", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "第18課: 職業 3 (しょくぎょう 3)",
    nextPage: "lesson18.html",
    words: [
      { jp: "せいびし", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { jp: "はいかんこう", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { jp: "でんきこう", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { jp: "だいく", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { jp: "いしや", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "第19課: 職業 4 (しょくぎょう 4)",
    nextPage: "lesson19.html",
    words: [
      { jp: "かがくしゃ", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { jp: "きょうじゅ", fa: "استاد دانشگاه", image: "../../../media/a2/jobs/professor.png" },
      { jp: "ちょしゃ", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { jp: "しじん", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { jp: "おんがくか", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "第20課: 職業 5 (しょくぎょう 5)",
    nextPage: "lesson20.html",
    words: [
      { jp: "はいゆう", fa: "بازیگر (مرد)", image: "../../../media/a2/jobs/actor.png" },
      { jp: "じょゆう", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { jp: "かんとく", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { jp: "せいさくしゃ", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { jp: "へんしゅうしゃ", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "第21課: 飲み物 (のみもの)",
    nextPage: "lesson21.html",
    words: [
      { jp: "ジュース", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { jp: "コーヒー", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { jp: "おちゃ", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { jp: "スープ", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { jp: "ケーキ", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "第22課: 食べ物 (たべもの)",
    nextPage: "lesson22.html",
    words: [
      { jp: "ピザ", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { jp: "パスタ", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { jp: "サラダ", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { jp: "サンドイッチ", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { jp: "ハンバーガー", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "第23課: 魚介類 (ぎょかいるい)",
    nextPage: "lesson23.html",
    words: [
      { jp: "ステーキ", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { jp: "エビ", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { jp: "ロブスター", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { jp: "カキ", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { jp: "カニ", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "第24課: 乳製品 (にゅうせいひん)",
    nextPage: "lesson24.html",
    words: [
      { jp: "バター", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { jp: "チーズ", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { jp: "クリーム", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { jp: "ヨーグルト", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { jp: "アイスクリーム", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "第25課: 朝ごはん (あさごはん)",
    nextPage: "lesson25.html",
    words: [
      { jp: "トースト", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { jp: "シリアル", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { jp: "オートミール", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { jp: "ジャム", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { jp: "はちみつ", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "第26課: アクセサリー (アクセサリー)",
    nextPage: "lesson26.html",
    words: [
      { jp: "ベルト", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { jp: "マフラー", fa: "شال گردن", image: "../../../media/a2/clothes/scarf.png" },
      { jp: "てぶくろ", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { jp: "うでどけい", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { jp: "ネックレス", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "第27課: 宝石 (ほうせき)",
    nextPage: "lesson27.html",
    words: [
      { jp: "ブレスレット", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { jp: "イヤリング", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { jp: "ゆびわ", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { jp: "くさり", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { jp: "かんむり", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "第28課: 冬服 (ふゆふく)",
    nextPage: "lesson28.html",
    words: [
      { jp: "ジーンズ", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { jp: "ジャケット", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { jp: "コート", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { jp: "ベスト", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { jp: "セーター", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "第29課: 夏服 (なつふく)",
    nextPage: "lesson29.html",
    words: [
      { jp: "ショートパンツ", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { jp: "スカート", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { jp: "くつした", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { jp: "したぎ", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { jp: "パジャマ", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "第30課: 身の回り品 (みのまわりひん)",
    nextPage: "lesson30.html",
    words: [
      { jp: "かさ", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { jp: "バッグ", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { jp: "リュックサック", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { jp: "さいふ", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { jp: "ハンドバッグ", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  // ===== ادامه دیتابیس درس‌های A2 ژاپنی (درس ۳۱ تا ۶۰) =====

  // ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====
  "a2-lesson31": {
    title: "第31課: 乗り物 1 (のりもの 1)",
    nextPage: "lesson31.html",
    words: [
      { jp: "タクシー", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { jp: "ボート", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { jp: "オートバイ", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { jp: "ヘリコプター", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { jp: "トラック", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "第32課: 乗り物 2 (のりもの 2)",
    nextPage: "lesson32.html",
    words: [
      { jp: "バン", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { jp: "ジープ", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { jp: "リムジン", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { jp: "きゅうきゅうしゃ", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { jp: "しょうぼうしゃ", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "第33課: 水上の乗り物 (すいじょうののりもの)",
    nextPage: "lesson33.html",
    words: [
      { jp: "せんすいかん", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { jp: "フェリー", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { jp: "ヨット", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { jp: "カヌー", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { jp: "いかだ", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "第34課: 新しい乗り物 (あたらしいのりもの)",
    nextPage: "lesson34.html",
    words: [
      { jp: "キックボード", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { jp: "スケートボード", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { jp: "ローラーブレード", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { jp: "ホバーボード", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { jp: "ひとりでこぎ", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "第35課: 伝統的な乗り物 (でんとうてきなのりもの)",
    nextPage: "lesson35.html",
    words: [
      { jp: "ばしゃ", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { jp: "おうしゃ", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { jp: "そり", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { jp: "リキシャ", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { jp: "路面電車", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "第36課: 自然 (しぜん)",
    nextPage: "lesson36.html",
    words: [
      { jp: "かわ", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { jp: "もり", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { jp: "さばく", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { jp: "しま", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { jp: "あらし", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "第37課: 自然現象 (しぜんげんしょう)",
    nextPage: "lesson37.html",
    words: [
      { jp: "たき", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { jp: "かざん", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { jp: "ひょうが", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { jp: "きょうこく", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { jp: "どうくつ", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "第38課: 海辺 (うみべ)",
    nextPage: "lesson38.html",
    words: [
      { jp: "ビーチ", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { jp: "かいがん", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { jp: "なみ", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { jp: "ちょうせき", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { jp: "がけ", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "第39課: 天気 (てんき)",
    nextPage: "lesson39.html",
    words: [
      { jp: "きり", fa: "مه", image: "../../../media/a2/weather/fog.png" },
      { jp: "ひょう", fa: "تگرگ", image: "../../../media/a2/weather/hail.png" },
      { jp: "ゆきのけっしょう", fa: "دانه برف", image: "../../../media/a2/weather/snowflake.png" },
      { jp: "いなずま", fa: "صاعقه", image: "../../../media/a2/weather/lightning.png" },
      { jp: "かみなり", fa: "رعد", image: "../../../media/a2/weather/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "第40課: 気象現象 (きしょうげんしょう)",
    nextPage: "lesson40.html",
    words: [
      { jp: "にじ", fa: "رنگین‌کمان", image: "../../../media/a2/weather/rainbow.png" },
      { jp: "そよかぜ", fa: "نسیم", image: "../../../media/a2/weather/breeze.png" },
      { jp: "こうずい", fa: "سیل", image: "../../../media/a2/weather/flood.png" },
      { jp: "かんばつ", fa: "خشکسالی", image: "../../../media/a2/weather/drought.png" },
      { jp: "じしん", fa: "زلزله", image: "../../../media/a2/weather/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "第41課: 人体 (じんたい)",
    nextPage: "lesson41.html",
    words: [
      { jp: "しんぞう", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { jp: "ほね", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { jp: "きんにく", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { jp: "はだ", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { jp: "ち", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "第42課: 身体の仕組み (からだのしくみ)",
    nextPage: "lesson42.html",
    words: [
      { jp: "のう", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { jp: "しんけい", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { jp: "じょうみゃく", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { jp: "どうみゃく", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { jp: "かんせつ", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "第43課: 病気 (びょうき)",
    nextPage: "lesson43.html",
    words: [
      { jp: "せき", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { jp: "ねつ", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { jp: "アスピリン", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { jp: "くすり", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { jp: "ちゅうしゃ", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "第44課: 怪我と治療 (けがとちりょう)",
    nextPage: "lesson44.html",
    words: [
      { jp: "アレルギー", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { jp: "かんせん", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { jp: "けが", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { jp: "きず", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { jp: "きずあと", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "第45課: 治療と病院 (ちりょうとびょういん)",
    nextPage: "lesson45.html",
    words: [
      { jp: "しゅじゅつ", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { jp: "しょくせん", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { jp: "くるまいす", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { jp: "ギプス", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { jp: "ほうたい", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "第46課: 文房具 (ぶんぼうぐ)",
    nextPage: "lesson46.html",
    words: [
      { jp: "ノート", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { jp: "えんぴつ", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { jp: "じょうぎ", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { jp: "けしごむ", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { jp: "でんたく", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "第47課: 本と勉強 (ほんとべんきょう)",
    nextPage: "lesson47.html",
    words: [
      { jp: "じてん", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { jp: "ひゃっかじてん", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { jp: "ちず", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { jp: "らしんばん", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { jp: "ぶんどき", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "第48課: 大学 (だいがく)",
    nextPage: "lesson48.html",
    words: [
      { jp: "だいがく", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { jp: "カレッジ", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { jp: "キャンパス", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { jp: "りょう", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { jp: "けんきゅうしつ", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "第49課: 勉強 (べんきょう)",
    nextPage: "lesson49.html",
    words: [
      { jp: "せいせき", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { jp: "しけん", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { jp: "じゅぎょう", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { jp: "かもく", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { jp: "せんせい", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "第50課: 研究と論文 (けんきゅうとろんぶん)",
    nextPage: "lesson50.html",
    words: [
      { jp: "エッセイ", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { jp: "ろんぶん", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { jp: "レポート", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { jp: "プロジェクト", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { jp: "ワークショップ", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "第51課: 旅行 (りょこう)",
    nextPage: "lesson51.html",
    words: [
      { jp: "パスポート", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { jp: "ホテル", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { jp: "にもの", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { jp: "フライト", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { jp: "ちず", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "第52課: 旅行用品 (りょこうようひん)",
    nextPage: "lesson52.html",
    words: [
      { jp: "リュックサック", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { jp: "テント", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { jp: "らしんばん", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { jp: "そうがんきょう", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { jp: "にっこうやく", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "第53課: 観光 (かんこう)",
    nextPage: "lesson53.html",
    words: [
      { jp: "ガイド", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { jp: "かんこうきゃく", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { jp: "おみやげ", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { jp: "ぼうけん", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { jp: "たび", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "第54課: 港と空港 (みなととくうこう)",
    nextPage: "lesson54.html",
    words: [
      { jp: "みなと", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { jp: "さんばし", fa: "اسکله", image: "../../../media/a2/travel/pier.png" },
      { jp: "ターミナル", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { jp: "ゲート", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { jp: "クルー", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "第55課: 旅行書類 (りょこうしょるい)",
    nextPage: "lesson55.html",
    words: [
      { jp: "ビザ", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { jp: "つうか", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { jp: "りょうがえ", fa: "تبادل ارز", image: "../../../media/a2/travel/exchange.png" },
      { jp: "しゅっぱつ", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { jp: "とうちゃく", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "第56課: コンピューター",
    nextPage: "lesson56.html",
    words: [
      { jp: "コンピューター", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { jp: "キーボード", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { jp: "マウス", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { jp: "インターネット", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { jp: "メール", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "第57課: コンピューター周辺機器 (しゅうへんきき)",
    nextPage: "lesson57.html",
    words: [
      { jp: "がめん", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { jp: "モニター", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { jp: "プリンター", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { jp: "スキャナー", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { jp: "スピーカー", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "第58課: ソフトウェア (ソフトウェア)",
    nextPage: "lesson58.html",
    words: [
      { jp: "ソフトウェア", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { jp: "ハードウェア", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { jp: "アップデート", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { jp: "パスワード", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { jp: "アカウント", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "第59課: インターネット",
    nextPage: "lesson59.html",
    words: [
      { jp: "ダウンロード", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { jp: "アップロード", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { jp: "ストリーミング", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { jp: "ビデオ", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { jp: "オーディオ", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "第60課: 新しい技術 (あたらしいぎじゅつ)",
    nextPage: "lesson60.html",
    words: [
      { jp: "デバイス", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { jp: "ガジェット", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { jp: "ロボット", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { jp: "ドローン", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { jp: "スマートウォッチ", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};


// ===== تابع پخش صدا (ژاپنی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ レッスンが見つかりません！</h2>
      <p>ホームページから入ってください。</p>
      <a href="../index.html">ホームに戻る</a>
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
      <img src="${w.image}" alt="${w.ja}">
      <div class="word-en" style="font-size: 22px;">${w.ja}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ja);
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