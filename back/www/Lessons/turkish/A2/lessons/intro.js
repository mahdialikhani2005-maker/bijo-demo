const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');
// ===== دیتابیس همه درس‌های A2 آلمانی (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "Lektion 1: Familie",
    nextPage: "lesson1.html",
    words: [
      { de: "der Onkel", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { de: "die Tante", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { de: "der Cousin", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { de: "der Neffe", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { de: "die Nichte", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "Lektion 2: Familie 2",
    nextPage: "lesson2.html",
    words: [
      { de: "der Ehemann", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { de: "die Ehefrau", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { de: "die Eltern", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { de: "die Großeltern", fa: "پدربزرگ/مادربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { de: "das Enkelkind", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "Lektion 3: Familienbeziehungen",
    nextPage: "lesson3.html",
    words: [
      { de: "der Verwandte", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { de: "der Zwilling", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { de: "die Waise", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { de: "die Witwe", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { de: "die Braut", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "Lektion 4: Stieffamilie",
    nextPage: "lesson4.html",
    words: [
      { de: "der Bräutigam", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { de: "der Schwager", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { de: "der Stiefvater", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { de: "die Stiefmutter", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { de: "die Stiefschwester", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "Lektion 5: Abstammung",
    nextPage: "lesson5.html",
    words: [
      { de: "der Vorfahre", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { de: "der Nachkomme", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { de: "das Geschwister", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { de: "der Verlobte", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { de: "die Verlobte", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "Lektion 6: Haushaltsgegenstände",
    nextPage: "lesson6.html",
    words: [
      { de: "das Sofa", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { de: "der Kühlschrank", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { de: "der Kleiderschrank", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { de: "der Spiegel", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { de: "das Regal", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "Lektion 7: Haushaltsgegenstände 2",
    nextPage: "lesson7.html",
    words: [
      { de: "der Vorhang", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { de: "der Teppich", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { de: "das Kissen", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { de: "die Decke", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { de: "die Lampe", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "Lektion 8: Räume im Haus",
    nextPage: "lesson8.html",
    words: [
      { de: "der Balkon", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { de: "die Garage", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { de: "der Keller", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { de: "der Dachboden", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { de: "der Hof", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "Lektion 9: Küchengeräte",
    nextPage: "lesson9.html",
    words: [
      { de: "der Wasserkocher", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { de: "der Toaster", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { de: "der Mixer", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { de: "die Mikrowelle", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { de: "die Spülmaschine", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "Lektion 10: Elektrogeräte",
    nextPage: "lesson10.html",
    words: [
      { de: "die Heizung", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { de: "der Ventilator", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { de: "das Bügeleisen", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { de: "der Staubsauger", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { de: "der Besen", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "Lektion 11: Orte in der Stadt",
    nextPage: "lesson11.html",
    words: [
      { de: "die Bank", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { de: "die Bibliothek", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { de: "das Kino", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { de: "das Museum", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { de: "das Restaurant", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "Lektion 12: Orte in der Stadt 2",
    nextPage: "lesson12.html",
    words: [
      { de: "das Hotel", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { de: "das Café", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { de: "die Bäckerei", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { de: "die Apotheke", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { de: "die Metzgerei", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "Lektion 13: Bauwerke",
    nextPage: "lesson13.html",
    words: [
      { de: "die Brücke", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { de: "der Platz", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { de: "der Brunnen", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { de: "der Turm", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { de: "das Schloss", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "Lektion 14: Religiöse Stätten",
    nextPage: "lesson14.html",
    words: [
      { de: "der Tempel", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { de: "die Kirche", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { de: "die Synagoge", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { de: "die Moschee", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { de: "das Heiligtum", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "Lektion 15: Verwaltungsgebäude",
    nextPage: "lesson15.html",
    words: [
      { de: "die Botschaft", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { de: "das Gericht", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { de: "das Gefängnis", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { de: "die Fabrik", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { de: "das Lagerhaus", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "Lektion 16: Berufe 1",
    nextPage: "lesson16.html",
    words: [
      { de: "der Pilot", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { de: "die Krankenschwester", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { de: "der Anwalt", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { de: "der Künstler", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { de: "der Koch", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "Lektion 17: Berufe 2",
    nextPage: "lesson17.html",
    words: [
      { de: "der Kellner", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { de: "die Kellnerin", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { de: "der Friseur", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { de: "der Schneider", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { de: "der Metzger", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "Lektion 18: Berufe 3",
    nextPage: "lesson18.html",
    words: [
      { de: "der Mechaniker", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { de: "der Klempner", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { de: "der Elektriker", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { de: "der Zimmermann", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { de: "der Maurer", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "Lektion 19: Berufe 4",
    nextPage: "lesson19.html",
    words: [
      { de: "der Wissenschaftler", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { de: "der Professor", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { de: "der Autor", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { de: "der Dichter", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { de: "der Musiker", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "Lektion 20: Berufe 5",
    nextPage: "lesson20.html",
    words: [
      { de: "der Schauspieler", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { de: "die Schauspielerin", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { de: "der Regisseur", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { de: "der Produzent", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { de: "der Redakteur", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "Lektion 21: Getränke",
    nextPage: "lesson21.html",
    words: [
      { de: "der Saft", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { de: "der Kaffee", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { de: "der Tee", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { de: "die Suppe", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { de: "der Kuchen", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "Lektion 22: Beliebte Gerichte",
    nextPage: "lesson22.html",
    words: [
      { de: "die Pizza", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { de: "die Pasta", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { de: "der Salat", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { de: "das Sandwich", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { de: "der Burger", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "Lektion 23: Meeresfrüchte",
    nextPage: "lesson23.html",
    words: [
      { de: "das Steak", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { de: "die Garnele", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { de: "der Hummer", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { de: "die Auster", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { de: "die Krabbe", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "Lektion 24: Milchprodukte",
    nextPage: "lesson24.html",
    words: [
      { de: "die Butter", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { de: "der Käse", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { de: "die Sahne", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { de: "der Joghurt", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { de: "das Eis", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "Lektion 25: Frühstück",
    nextPage: "lesson25.html",
    words: [
      { de: "der Toast", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { de: "das Müsli", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { de: "der Haferbrei", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { de: "die Marmelade", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { de: "der Honig", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "Lektion 26: Accessoires",
    nextPage: "lesson26.html",
    words: [
      { de: "der Gürtel", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { de: "der Schal", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { de: "die Handschuhe", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { de: "die Armbanduhr", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { de: "die Halskette", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "Lektion 27: Schmuck",
    nextPage: "lesson27.html",
    words: [
      { de: "das Armband", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { de: "der Ohrring", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { de: "der Ring", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { de: "die Kette", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { de: "die Krone", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "Lektion 28: Warme Kleidung",
    nextPage: "lesson28.html",
    words: [
      { de: "die Jeans", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { de: "die Jacke", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { de: "der Mantel", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { de: "die Weste", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { de: "der Pullover", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "Lektion 29: Sommerkleidung",
    nextPage: "lesson29.html",
    words: [
      { de: "die Shorts", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { de: "der Rock", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { de: "die Socken", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { de: "die Unterwäsche", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { de: "der Schlafanzug", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "Lektion 30: Persönliche Gegenstände",
    nextPage: "lesson30.html",
    words: [
      { de: "der Regenschirm", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { de: "die Tasche", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { de: "der Rucksack", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { de: "die Brieftasche", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { de: "die Handtasche", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  // ===== ادامه دیتابیس درس‌های A2 آلمانی (درس ۳۱ تا ۶۰) =====

  // ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====
  "a2-lesson31": {
    title: "Lektion 31: Fahrzeuge 1",
    nextPage: "lesson31.html",
    words: [
      { de: "das Taxi", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { de: "das Boot", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { de: "das Motorrad", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { de: "der Hubschrauber", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { de: "der Lastwagen", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "Lektion 32: Fahrzeuge 2",
    nextPage: "lesson32.html",
    words: [
      { de: "der Kleinbus", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { de: "der Geländewagen", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { de: "die Limousine", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { de: "der Krankenwagen", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { de: "das Feuerwehrauto", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "Lektion 33: Wasserfahrzeuge",
    nextPage: "lesson33.html",
    words: [
      { de: "das U-Boot", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { de: "die Fähre", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { de: "die Yacht", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { de: "das Kanu", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { de: "das Floß", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "Lektion 34: Moderne Fahrzeuge",
    nextPage: "lesson34.html",
    words: [
      { de: "der Roller", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { de: "das Skateboard", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { de: "der Inlineskate", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { de: "das Hoverboard", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { de: "das Einrad", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "Lektion 35: Traditionelle Fahrzeuge",
    nextPage: "lesson35.html",
    words: [
      { de: "die Kutsche", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { de: "der Wagen", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { de: "der Schlitten", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { de: "die Rikscha", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { de: "die Straßenbahn", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "Lektion 36: Natur",
    nextPage: "lesson36.html",
    words: [
      { de: "der Fluss", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { de: "der Wald", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { de: "die Wüste", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { de: "die Insel", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { de: "der Sturm", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "Lektion 37: Naturphänomene",
    nextPage: "lesson37.html",
    words: [
      { de: "der Wasserfall", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { de: "der Vulkan", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { de: "der Gletscher", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { de: "die Schlucht", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { de: "die Höhle", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "Lektion 38: Strand und Meer",
    nextPage: "lesson38.html",
    words: [
      { de: "der Strand", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { de: "die Küste", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { de: "die Welle", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { de: "die Gezeiten", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { de: "die Klippe", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "Lektion 39: Wetter",
    nextPage: "lesson39.html",
    words: [
      { de: "der Nebel", fa: "مه", image: "../../../media/a2/nature/fog.png" },
      { de: "der Hagel", fa: "تگرگ", image: "../../../media/a2/nature/hail.png" },
      { de: "die Schneeflocke", fa: "دانه برف", image: "../../../media/a2/nature/snowflake.png" },
      { de: "der Blitz", fa: "صاعقه", image: "../../../media/a2/nature/lightning.png" },
      { de: "der Donner", fa: "رعد", image: "../../../media/a2/nature/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "Lektion 40: Wetterphänomene",
    nextPage: "lesson40.html",
    words: [
      { de: "der Regenbogen", fa: "رنگین‌کمان", image: "../../../media/a2/nature/rainbow.png" },
      { de: "die Brise", fa: "نسیم", image: "../../../media/a2/nature/breeze.png" },
      { de: "die Überschwemmung", fa: "سیل", image: "../../../media/a2/nature/flood.png" },
      { de: "die Dürre", fa: "خشکسالی", image: "../../../media/a2/nature/drought.png" },
      { de: "das Erdbeben", fa: "زلزله", image: "../../../media/a2/nature/earthquake.png" }
    ]
  },  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "Lektion 41: Der menschliche Körper",
    nextPage: "lesson41.html",
    words: [
      { de: "das Herz", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { de: "der Knochen", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { de: "der Muskel", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { de: "die Haut", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { de: "das Blut", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "Lektion 42: Körpersystem",
    nextPage: "lesson42.html",
    words: [
      { de: "das Gehirn", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { de: "der Nerv", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { de: "die Vene", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { de: "die Arterie", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { de: "das Gelenk", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "Lektion 43: Krankheiten",
    nextPage: "lesson43.html",
    words: [
      { de: "der Husten", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { de: "das Fieber", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { de: "das Aspirin", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { de: "die Medizin", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { de: "die Injektion", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "Lektion 44: Verletzungen und Behandlung",
    nextPage: "lesson44.html",
    words: [
      { de: "die Allergie", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { de: "die Infektion", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { de: "die Verletzung", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { de: "die Wunde", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { de: "die Narbe", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "Lektion 45: Behandlung und Krankenhaus",
    nextPage: "lesson45.html",
    words: [
      { de: "die Operation", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { de: "die Trage", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { de: "der Rollstuhl", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { de: "der Gips", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { de: "der Verband", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "Lektion 46: Schulsachen",
    nextPage: "lesson46.html",
    words: [
      { de: "das Heft", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { de: "der Bleistift", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { de: "das Lineal", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { de: "der Radiergummi", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { de: "der Taschenrechner", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "Lektion 47: Bücher und Studium",
    nextPage: "lesson47.html",
    words: [
      { de: "das Wörterbuch", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { de: "die Enzyklopädie", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { de: "der Atlas", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { de: "der Kompass", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { de: "der Winkelmesser", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "Lektion 48: Universität",
    nextPage: "lesson48.html",
    words: [
      { de: "die Universität", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { de: "das College", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { de: "der Campus", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { de: "das Wohnheim", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { de: "das Labor", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "Lektion 49: Studium",
    nextPage: "lesson49.html",
    words: [
      { de: "die Note", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { de: "die Prüfung", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { de: "die Lektion", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { de: "das Fach", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { de: "der Lehrer", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "Lektion 50: Forschung und Aufsätze",
    nextPage: "lesson50.html",
    words: [
      { de: "der Aufsatz", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { de: "die Dissertation", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { de: "der Bericht", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { de: "das Projekt", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { de: "der Workshop", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "Lektion 51: Reisen",
    nextPage: "lesson51.html",
    words: [
      { de: "der Reisepass", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { de: "das Hotel", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { de: "das Gepäck", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { de: "der Flug", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { de: "die Landkarte", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "Lektion 52: Reiseausrüstung",
    nextPage: "lesson52.html",
    words: [
      { de: "der Rucksack", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { de: "das Zelt", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { de: "der Kompass", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { de: "das Fernglas", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { de: "die Sonnencreme", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "Lektion 53: Tourismus",
    nextPage: "lesson53.html",
    words: [
      { de: "der Reiseführer", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { de: "der Tourist", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { de: "das Souvenir", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { de: "das Abenteuer", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { de: "die Reise", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "Lektion 54: Hafen und Flughafen",
    nextPage: "lesson54.html",
    words: [
      { de: "der Hafen", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { de: "der Hafen", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { de: "das Terminal", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { de: "das Tor", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { de: "die Crew", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "Lektion 55: Reisedokumente",
    nextPage: "lesson55.html",
    words: [
      { de: "das Visum", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { de: "die Währung", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { de: "der Umtausch", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { de: "der Abflug", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { de: "die Ankunft", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "Lektion 56: Computer",
    nextPage: "lesson56.html",
    words: [
      { de: "der Computer", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { de: "die Tastatur", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { de: "die Maus", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { de: "das Internet", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { de: "die E-Mail", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "Lektion 57: Computerzubehör",
    nextPage: "lesson57.html",
    words: [
      { de: "der Bildschirm", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { de: "der Monitor", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { de: "der Drucker", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { de: "der Scanner", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { de: "der Lautsprecher", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "Lektion 58: Software",
    nextPage: "lesson58.html",
    words: [
      { de: "die Software", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { de: "die Hardware", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { de: "das Update", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { de: "das Passwort", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { de: "der Account", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "Lektion 59: Internet",
    nextPage: "lesson59.html",
    words: [
      { de: "der Download", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { de: "der Upload", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { de: "der Stream", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { de: "das Video", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { de: "das Audio", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "Lektion 60: Neue Technologien",
    nextPage: "lesson60.html",
    words: [
      { de: "das Gerät", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { de: "das Gadget", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { de: "der Roboter", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { de: "die Drohne", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { de: "die Smartwatch", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (آلمانی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Lektion nicht gefunden!</h2>
      <p>Bitte von der Hauptseite aus eingeben.</p>
      <a href="../index.html">Zurück zur Hauptseite</a>
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
      <img src="${w.image}" alt="${w.de}">
      <div class="word-en" style="font-size: 20px;">${w.de}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.de);
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