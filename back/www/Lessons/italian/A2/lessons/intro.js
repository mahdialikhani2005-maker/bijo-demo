

// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 ایتالیایی (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "Lezione 1: Famiglia",
    nextPage: "lesson1.html",
    words: [
      { it: "lo zio", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { it: "la zia", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { it: "il cugino", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { it: "il nipote", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { it: "la nipote", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "Lezione 2: Famiglia 2",
    nextPage: "lesson2.html",
    words: [
      { it: "il marito", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { it: "la moglie", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { it: "il genitore", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { it: "il nonno", fa: "پدربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { it: "il nipote", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "Lezione 3: Relazioni familiari",
    nextPage: "lesson3.html",
    words: [
      { it: "il parente", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { it: "il gemello", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { it: "l'orfano", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { it: "la vedova", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { it: "la sposa", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "Lezione 4: Famiglia acquisita",
    nextPage: "lesson4.html",
    words: [
      { it: "lo sposo", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { it: "il suocero", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { it: "il patrigno", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { it: "la matrigna", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { it: "la sorellastra", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "Lezione 5: Ascendenza",
    nextPage: "lesson5.html",
    words: [
      { it: "l'antenato", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { it: "il discendente", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { it: "il fratello/sorella", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { it: "il fidanzato", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { it: "la fidanzata", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "Lezione 6: Mobili di casa",
    nextPage: "lesson6.html",
    words: [
      { it: "il divano", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { it: "il frigorifero", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { it: "l'armadio", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { it: "lo specchio", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { it: "lo scaffale", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "Lezione 7: Mobili di casa 2",
    nextPage: "lesson7.html",
    words: [
      { it: "la tenda", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { it: "il tappeto", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { it: "il cuscino", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { it: "la coperta", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { it: "la lampada", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "Lezione 8: Parti della casa",
    nextPage: "lesson8.html",
    words: [
      { it: "il balcone", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { it: "il garage", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { it: "la cantina", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { it: "la soffitta", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { it: "il cortile", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "Lezione 9: Elettrodomestici da cucina",
    nextPage: "lesson9.html",
    words: [
      { it: "il bollitore", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { it: "il tostapane", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { it: "il frullatore", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { it: "il microonde", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { it: "la lavastoviglie", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "Lezione 10: Elettrodomestici",
    nextPage: "lesson10.html",
    words: [
      { it: "il termosifone", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { it: "il ventilatore", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { it: "il ferro da stiro", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { it: "l'aspirapolvere", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { it: "la scopa", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "Lezione 11: Luoghi della città",
    nextPage: "lesson11.html",
    words: [
      { it: "la banca", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { it: "la biblioteca", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { it: "il cinema", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { it: "il museo", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { it: "il ristorante", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "Lezione 12: Luoghi della città 2",
    nextPage: "lesson12.html",
    words: [
      { it: "l'hotel", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { it: "il bar", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { it: "la panetteria", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { it: "la farmacia", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { it: "la macelleria", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "Lezione 13: Monumenti e strutture",
    nextPage: "lesson13.html",
    words: [
      { it: "il ponte", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { it: "la piazza", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { it: "la fontana", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { it: "la torre", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { it: "il castello", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "Lezione 14: Luoghi di culto",
    nextPage: "lesson14.html",
    words: [
      { it: "il tempio", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { it: "la chiesa", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { it: "la sinagoga", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { it: "la moschea", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { it: "il santuario", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "Lezione 15: Uffici pubblici",
    nextPage: "lesson15.html",
    words: [
      { it: "l'ambasciata", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { it: "il tribunale", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { it: "il carcere", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { it: "la fabbrica", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { it: "il magazzino", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "Lezione 16: Professioni 1",
    nextPage: "lesson16.html",
    words: [
      { it: "il pilota", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { it: "l'infermiera", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { it: "l'avvocato", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { it: "l'artista", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { it: "lo chef", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "Lezione 17: Professioni 2",
    nextPage: "lesson17.html",
    words: [
      { it: "il cameriere", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { it: "la cameriera", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { it: "il barbiere", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { it: "il sarto", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { it: "il macellaio", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "Lezione 18: Professioni 3",
    nextPage: "lesson18.html",
    words: [
      { it: "il meccanico", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { it: "l'idraulico", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { it: "l'elettricista", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { it: "il falegname", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { it: "il muratore", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "Lezione 19: Professioni 4",
    nextPage: "lesson19.html",
    words: [
      { it: "lo scienziato", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { it: "il professore", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { it: "l'autore", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { it: "il poeta", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { it: "il musicista", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "Lezione 20: Professioni 5",
    nextPage: "lesson20.html",
    words: [
      { it: "l'attore", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { it: "l'attrice", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { it: "il regista", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { it: "il produttore", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { it: "il redattore", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "Lezione 21: Bevande",
    nextPage: "lesson21.html",
    words: [
      { it: "il succo", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { it: "il caffè", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { it: "il tè", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { it: "la zuppa", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { it: "la torta", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "Lezione 22: Cibi comuni",
    nextPage: "lesson22.html",
    words: [
      { it: "la pizza", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { it: "la pasta", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { it: "l'insalata", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { it: "il panino", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { it: "l'hamburger", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "Lezione 23: Frutti di mare",
    nextPage: "lesson23.html",
    words: [
      { it: "la bistecca", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { it: "il gambero", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { it: "l'aragosta", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { it: "l'ostrica", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { it: "il granchio", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "Lezione 24: Latticini",
    nextPage: "lesson24.html",
    words: [
      { it: "il burro", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { it: "il formaggio", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { it: "la panna", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { it: "lo yogurt", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { it: "il gelato", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "Lezione 25: Colazione",
    nextPage: "lesson25.html",
    words: [
      { it: "il toast", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { it: "i cereali", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { it: "il porridge", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { it: "la marmellata", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { it: "il miele", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "Lezione 26: Accessori",
    nextPage: "lesson26.html",
    words: [
      { it: "la cintura", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { it: "la sciarpa", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { it: "i guanti", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { it: "l'orologio", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { it: "la collana", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "Lezione 27: Gioielli",
    nextPage: "lesson27.html",
    words: [
      { it: "il braccialetto", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { it: "l'orecchino", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { it: "l'anello", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { it: "la catena", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { it: "la corona", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "Lezione 28: Vestiti caldi",
    nextPage: "lesson28.html",
    words: [
      { it: "i jeans", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { it: "la giacca", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { it: "il cappotto", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { it: "il gilet", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { it: "il maglione", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "Lezione 29: Vestiti estivi",
    nextPage: "lesson29.html",
    words: [
      { it: "i pantaloncini", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { it: "la gonna", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { it: "i calzini", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { it: "la biancheria intima", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { it: "il pigiama", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "Lezione 30: Oggetti personali",
    nextPage: "lesson30.html",
    words: [
      { it: "l'ombrello", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { it: "la borsa", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { it: "lo zaino", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { it: "il portafoglio", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { it: "la borsetta", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  // ===== ادامه دیتابیس درس‌های A2 ایتالیایی (درس ۳۱ تا ۶۰) =====

  // ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====
  "a2-lesson31": {
    title: "Lezione 31: Mezzi di trasporto 1",
    nextPage: "lesson31.html",
    words: [
      { it: "il taxi", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { it: "la barca", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { it: "la moto", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { it: "l'elicottero", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { it: "il camion", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "Lezione 32: Mezzi di trasporto 2",
    nextPage: "lesson32.html",
    words: [
      { it: "il furgone", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { it: "la jeep", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { it: "la limousine", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { it: "l'ambulanza", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { it: "il camion dei pompieri", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "Lezione 33: Mezzi acquatici",
    nextPage: "lesson33.html",
    words: [
      { it: "il sottomarino", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { it: "il traghetto", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { it: "lo yacht", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { it: "la canoa", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { it: "lo zatterone", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "Lezione 34: Mezzi moderni",
    nextPage: "lesson34.html",
    words: [
      { it: "il monopattino", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { it: "lo skateboard", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { it: "i pattini a rotelle", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { it: "l'hoverboard", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { it: "il monociclo", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "Lezione 35: Mezzi tradizionali",
    nextPage: "lesson35.html",
    words: [
      { it: "la carrozza", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { it: "il carro", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { it: "la slitta", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { it: "il risciò", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { it: "il tram", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "Lezione 36: Natura",
    nextPage: "lesson36.html",
    words: [
      { it: "il fiume", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { it: "la foresta", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { it: "il deserto", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { it: "l'isola", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { it: "la tempesta", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "Lezione 37: Fenomeni naturali",
    nextPage: "lesson37.html",
    words: [
      { it: "la cascata", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { it: "il vulcano", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { it: "il ghiacciaio", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { it: "il canyon", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { it: "la grotta", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "Lezione 38: Spiaggia e mare",
    nextPage: "lesson38.html",
    words: [
      { it: "la spiaggia", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { it: "la costa", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { it: "l'onda", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { it: "la marea", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { it: "la scogliera", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "Lezione 39: Meteo",
    nextPage: "lesson39.html",
    words: [
      { it: "la nebbia", fa: "مه", image: "../../../media/a2/weather/fog.png" },
      { it: "la grandine", fa: "تگرگ", image: "../../../media/a2/weather/hail.png" },
      { it: "il fiocco di neve", fa: "دانه برف", image: "../../../media/a2/weather/snowflake.png" },
      { it: "il fulmine", fa: "صاعقه", image: "../../../media/a2/weather/lightning.png" },
      { it: "il tuono", fa: "رعد", image: "../../../media/a2/weather/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "Lezione 40: Fenomeni atmosferici",
    nextPage: "lesson40.html",
    words: [
      { it: "l'arcobaleno", fa: "رنگین‌کمان", image: "../../../media/a2/weather/rainbow.png" },
      { it: "la brezza", fa: "نسیم", image: "../../../media/a2/weather/breeze.png" },
      { it: "l'alluvione", fa: "سیل", image: "../../../media/a2/weather/flood.png" },
      { it: "la siccità", fa: "خشکسالی", image: "../../../media/a2/weather/drought.png" },
      { it: "il terremoto", fa: "زلزله", image: "../../../media/a2/weather/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "Lezione 41: Corpo umano",
    nextPage: "lesson41.html",
    words: [
      { it: "il cuore", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { it: "l'osso", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { it: "il muscolo", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { it: "la pelle", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { it: "il sangue", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "Lezione 42: Sistema corporeo",
    nextPage: "lesson42.html",
    words: [
      { it: "il cervello", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { it: "il nervo", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { it: "la vena", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { it: "l'arteria", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { it: "l'articolazione", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "Lezione 43: Malattie",
    nextPage: "lesson43.html",
    words: [
      { it: "la tosse", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { it: "la febbre", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { it: "l'aspirina", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { it: "la medicina", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { it: "l'iniezione", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "Lezione 44: Ferite e cure",
    nextPage: "lesson44.html",
    words: [
      { it: "l'allergia", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { it: "l'infezione", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { it: "la ferita", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { it: "la piaga", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { it: "la cicatrice", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "Lezione 45: Cure e ospedale",
    nextPage: "lesson45.html",
    words: [
      { it: "l'operazione", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { it: "la barella", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { it: "la sedia a rotelle", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { it: "il gesso", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { it: "la benda", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "Lezione 46: Materiale scolastico",
    nextPage: "lesson46.html",
    words: [
      { it: "il quaderno", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { it: "la matita", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { it: "il righello", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { it: "la gomma", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { it: "la calcolatrice", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "Lezione 47: Libri e studio",
    nextPage: "lesson47.html",
    words: [
      { it: "il dizionario", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { it: "l'enciclopedia", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { it: "l'atlante", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { it: "la bussola", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { it: "il goniometro", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "Lezione 48: Università",
    nextPage: "lesson48.html",
    words: [
      { it: "l'università", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { it: "il college", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { it: "il campus", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { it: "il dormitorio", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { it: "il laboratorio", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "Lezione 49: Studio",
    nextPage: "lesson49.html",
    words: [
      { it: "il voto", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { it: "l'esame", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { it: "la lezione", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { it: "la materia", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { it: "l'insegnante", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "Lezione 50: Ricerca e saggi",
    nextPage: "lesson50.html",
    words: [
      { it: "il saggio", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { it: "la tesi", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { it: "il rapporto", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { it: "il progetto", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { it: "il workshop", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "Lezione 51: Viaggi",
    nextPage: "lesson51.html",
    words: [
      { it: "il passaporto", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { it: "l'hotel", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { it: "il bagaglio", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { it: "il volo", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { it: "la mappa", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "Lezione 52: Attrezzatura da viaggio",
    nextPage: "lesson52.html",
    words: [
      { it: "lo zaino", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { it: "la tenda", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { it: "la bussola", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { it: "il binocolo", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { it: "la crema solare", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "Lezione 53: Turismo",
    nextPage: "lesson53.html",
    words: [
      { it: "la guida", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { it: "il turista", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { it: "il souvenir", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { it: "l'avventura", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { it: "il viaggio", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "Lezione 54: Porto e aeroporto",
    nextPage: "lesson54.html",
    words: [
      { it: "il porto", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { it: "il porto", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { it: "il terminal", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { it: "il cancello", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { it: "l'equipaggio", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "Lezione 55: Documenti di viaggio",
    nextPage: "lesson55.html",
    words: [
      { it: "il visto", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { it: "la valuta", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { it: "il cambio", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { it: "la partenza", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { it: "l'arrivo", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "Lezione 56: Computer",
    nextPage: "lesson56.html",
    words: [
      { it: "il computer", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { it: "la tastiera", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { it: "il mouse", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { it: "internet", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { it: "l'email", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "Lezione 57: Accessori per computer",
    nextPage: "lesson57.html",
    words: [
      { it: "lo schermo", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { it: "il monitor", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { it: "la stampante", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { it: "lo scanner", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { it: "l'altoparlante", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "Lezione 58: Software",
    nextPage: "lesson58.html",
    words: [
      { it: "il software", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { it: "l'hardware", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { it: "l'aggiornamento", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { it: "la password", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { it: "l'account", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "Lezione 59: Internet",
    nextPage: "lesson59.html",
    words: [
      { it: "il download", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { it: "l'upload", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { it: "lo streaming", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { it: "il video", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { it: "l'audio", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "Lezione 60: Nuove tecnologie",
    nextPage: "lesson60.html",
    words: [
      { it: "il dispositivo", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { it: "il gadget", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { it: "il robot", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { it: "il drone", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { it: "lo smartwatch", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (ایتالیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Lezione non trovata!</h2>
      <p>Si prega di entrare dalla pagina principale.</p>
      <a href="../index.html">Torna alla home</a>
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
      <img src="${w.image}" alt="${w.it}">
      <div class="word-en" style="font-size: 20px;">${w.it}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.it);
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



