// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 اسپانیایی (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "Lección 1: Familia",
    nextPage: "lesson1.html",
    words: [
      { es: "el tío", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { es: "la tía", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { es: "el primo", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { es: "el sobrino", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { es: "la sobrina", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "Lección 2: Familia 2",
    nextPage: "lesson2.html",
    words: [
      { es: "el marido", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { es: "la mujer", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { es: "el padre", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { es: "el abuelo", fa: "پدربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { es: "el nieto", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "Lección 3: Relaciones familiares",
    nextPage: "lesson3.html",
    words: [
      { es: "el pariente", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { es: "el gemelo", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { es: "el huérfano", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { es: "la viuda", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { es: "la novia", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "Lección 4: Familia política",
    nextPage: "lesson4.html",
    words: [
      { es: "el novio", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { es: "el pariente político", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { es: "el padrastro", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { es: "la madrastra", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { es: "la hermanastra", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "Lección 5: Ascendencia",
    nextPage: "lesson5.html",
    words: [
      { es: "el antepasado", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { es: "el descendiente", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { es: "el hermano/hermana", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { es: "el prometido", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { es: "la prometida", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "Lección 6: Muebles de casa",
    nextPage: "lesson6.html",
    words: [
      { es: "el sofá", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { es: "la nevera", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { es: "el armario", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { es: "el espejo", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { es: "el estante", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "Lección 7: Muebles de casa 2",
    nextPage: "lesson7.html",
    words: [
      { es: "la cortina", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { es: "la alfombra", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { es: "la almohada", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { es: "la manta", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { es: "la lámpara", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "Lección 8: Partes de la casa",
    nextPage: "lesson8.html",
    words: [
      { es: "el balcón", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { es: "el garaje", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { es: "el sótano", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { es: "el ático", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { es: "el patio", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "Lección 9: Electrodomésticos de cocina",
    nextPage: "lesson9.html",
    words: [
      { es: "la tetera", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { es: "la tostadora", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { es: "la batidora", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { es: "el microondas", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { es: "el lavavajillas", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "Lección 10: Electrodomésticos",
    nextPage: "lesson10.html",
    words: [
      { es: "el calentador", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { es: "el ventilador", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { es: "la plancha", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { es: "la aspiradora", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { es: "la escoba", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "Lección 11: Lugares de la ciudad",
    nextPage: "lesson11.html",
    words: [
      { es: "el banco", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { es: "la biblioteca", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { es: "el cine", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { es: "el museo", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { es: "el restaurante", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "Lección 12: Lugares de la ciudad 2",
    nextPage: "lesson12.html",
    words: [
      { es: "el hotel", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { es: "la cafetería", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { es: "la panadería", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { es: "la farmacia", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { es: "la carnicería", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "Lección 13: Monumentos y estructuras",
    nextPage: "lesson13.html",
    words: [
      { es: "el puente", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { es: "la plaza", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { es: "la fuente", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { es: "la torre", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { es: "el castillo", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "Lección 14: Lugares de culto",
    nextPage: "lesson14.html",
    words: [
      { es: "el templo", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { es: "la iglesia", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { es: "la sinagoga", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { es: "la mezquita", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { es: "el santuario", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "Lección 15: Oficinas públicas",
    nextPage: "lesson15.html",
    words: [
      { es: "la embajada", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { es: "el tribunal", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { es: "la cárcel", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { es: "la fábrica", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { es: "el almacén", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "Lección 16: Profesiones 1",
    nextPage: "lesson16.html",
    words: [
      { es: "el piloto", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { es: "la enfermera", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { es: "el abogado", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { es: "el artista", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { es: "el chef", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "Lección 17: Profesiones 2",
    nextPage: "lesson17.html",
    words: [
      { es: "el camarero", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { es: "la camarera", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { es: "el peluquero", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { es: "el sastre", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { es: "el carnicero", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "Lección 18: Profesiones 3",
    nextPage: "lesson18.html",
    words: [
      { es: "el mecánico", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { es: "el fontanero", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { es: "el electricista", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { es: "el carpintero", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { es: "el albañil", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "Lección 19: Profesiones 4",
    nextPage: "lesson19.html",
    words: [
      { es: "el científico", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { es: "el profesor", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { es: "el autor", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { es: "el poeta", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { es: "el músico", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "Lección 20: Profesiones 5",
    nextPage: "lesson20.html",
    words: [
      { es: "el actor", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { es: "la actriz", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { es: "el director", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { es: "el productor", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { es: "el editor", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "Lección 21: Bebidas",
    nextPage: "lesson21.html",
    words: [
      { es: "el zumo", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { es: "el café", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { es: "el té", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { es: "la sopa", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { es: "la tarta", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "Lección 22: Comidas comunes",
    nextPage: "lesson22.html",
    words: [
      { es: "la pizza", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { es: "la pasta", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { es: "la ensalada", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { es: "el sándwich", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { es: "la hamburguesa", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "Lección 23: Mariscos",
    nextPage: "lesson23.html",
    words: [
      { es: "el bistec", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { es: "el camarón", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { es: "la langosta", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { es: "la ostra", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { es: "el cangrejo", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "Lección 24: Lácteos",
    nextPage: "lesson24.html",
    words: [
      { es: "la mantequilla", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { es: "el queso", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { es: "la nata", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { es: "el yogur", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { es: "el helado", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "Lección 25: Desayuno",
    nextPage: "lesson25.html",
    words: [
      { es: "la tostada", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { es: "los cereales", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { es: "la avena", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { es: "la mermelada", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { es: "la miel", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "Lección 26: Accesorios",
    nextPage: "lesson26.html",
    words: [
      { es: "el cinturón", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { es: "la bufanda", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { es: "los guantes", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { es: "el reloj", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { es: "el collar", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "Lección 27: Joyas",
    nextPage: "lesson27.html",
    words: [
      { es: "la pulsera", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { es: "el pendiente", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { es: "el anillo", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { es: "la cadena", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { es: "la corona", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "Lección 28: Ropa de abrigo",
    nextPage: "lesson28.html",
    words: [
      { es: "los vaqueros", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { es: "la chaqueta", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { es: "el abrigo", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { es: "el chaleco", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { es: "el suéter", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "Lección 29: Ropa de verano",
    nextPage: "lesson29.html",
    words: [
      { es: "los pantalones cortos", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { es: "la falda", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { es: "los calcetines", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { es: "la ropa interior", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { es: "el pijama", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "Lección 30: Objetos personales",
    nextPage: "lesson30.html",
    words: [
      { es: "el paraguas", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { es: "la bolsa", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { es: "la mochila", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { es: "la cartera", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { es: "el bolso", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  "a2-lesson31": {
    title: "Lección 31: Medios de transporte 1",
    nextPage: "lesson31.html",
    words: [
      { es: "el taxi", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { es: "el barco", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { es: "la moto", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { es: "el helicóptero", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { es: "el camión", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "Lección 32: Medios de transporte 2",
    nextPage: "lesson32.html",
    words: [
      { es: "la furgoneta", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { es: "el jeep", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { es: "la limusina", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { es: "la ambulancia", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { es: "el camión de bomberos", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "Lección 33: Medios acuáticos",
    nextPage: "lesson33.html",
    words: [
      { es: "el submarino", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { es: "el ferry", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { es: "el yate", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { es: "la canoa", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { es: "la balsa", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "Lección 34: Medios modernos",
    nextPage: "lesson34.html",
    words: [
      { es: "el patinete", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { es: "la patineta", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { es: "los patines en línea", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { es: "el hoverboard", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { es: "el monociclo", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "Lección 35: Medios tradicionales",
    nextPage: "lesson35.html",
    words: [
      { es: "el carruaje", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { es: "el vagón", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { es: "el trineo", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { es: "el rickshaw", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { es: "el tranvía", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "Lección 36: Naturaleza",
    nextPage: "lesson36.html",
    words: [
      { es: "el río", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { es: "el bosque", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { es: "el desierto", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { es: "la isla", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { es: "la tormenta", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "Lección 37: Fenómenos naturales",
    nextPage: "lesson37.html",
    words: [
      { es: "la cascada", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { es: "el volcán", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { es: "el glaciar", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { es: "el cañón", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { es: "la cueva", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "Lección 38: Playa y mar",
    nextPage: "lesson38.html",
    words: [
      { es: "la playa", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { es: "la costa", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { es: "la ola", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { es: "la marea", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { es: "el acantilado", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "Lección 39: Clima",
    nextPage: "lesson39.html",
    words: [
      { es: "la niebla", fa: "مه", image: "../../../media/a2/weather/fog.png" },
      { es: "el granizo", fa: "تگرگ", image: "../../../media/a2/weather/hail.png" },
      { es: "el copo de nieve", fa: "دانه برف", image: "../../../media/a2/weather/snowflake.png" },
      { es: "el relámpago", fa: "صاعقه", image: "../../../media/a2/weather/lightning.png" },
      { es: "el trueno", fa: "رعد", image: "../../../media/a2/weather/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "Lección 40: Fenómenos atmosféricos",
    nextPage: "lesson40.html",
    words: [
      { es: "el arcoíris", fa: "رنگین‌کمان", image: "../../../media/a2/weather/rainbow.png" },
      { es: "la brisa", fa: "نسیم", image: "../../../media/a2/weather/breeze.png" },
      { es: "la inundación", fa: "سیل", image: "../../../media/a2/weather/flood.png" },
      { es: "la sequía", fa: "خشکسالی", image: "../../../media/a2/weather/drought.png" },
      { es: "el terremoto", fa: "زلزله", image: "../../../media/a2/weather/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "Lección 41: Cuerpo humano",
    nextPage: "lesson41.html",
    words: [
      { es: "el corazón", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { es: "el hueso", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { es: "el músculo", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { es: "la piel", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { es: "la sangre", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "Lección 42: Sistema corporal",
    nextPage: "lesson42.html",
    words: [
      { es: "el cerebro", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { es: "el nervio", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { es: "la vena", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { es: "la arteria", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { es: "la articulación", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "Lección 43: Enfermedades",
    nextPage: "lesson43.html",
    words: [
      { es: "la tos", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { es: "la fiebre", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { es: "la aspirina", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { es: "la medicina", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { es: "la inyección", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "Lección 44: Heridas y curas",
    nextPage: "lesson44.html",
    words: [
      { es: "la alergia", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { es: "la infección", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { es: "la lesión", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { es: "la herida", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { es: "la cicatriz", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "Lección 45: Curas y hospital",
    nextPage: "lesson45.html",
    words: [
      { es: "la operación", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { es: "la camilla", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { es: "la silla de ruedas", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { es: "el yeso", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { es: "la venda", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "Lección 46: Material escolar",
    nextPage: "lesson46.html",
    words: [
      { es: "el cuaderno", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { es: "el lápiz", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { es: "la regla", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { es: "la goma de borrar", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { es: "la calculadora", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "Lección 47: Libros y estudio",
    nextPage: "lesson47.html",
    words: [
      { es: "el diccionario", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { es: "la enciclopedia", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { es: "el atlas", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { es: "la brújula", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { es: "el transportador", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "Lección 48: Universidad",
    nextPage: "lesson48.html",
    words: [
      { es: "la universidad", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { es: "el colegio", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { es: "el campus", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { es: "la residencia", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { es: "el laboratorio", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "Lección 49: Estudio",
    nextPage: "lesson49.html",
    words: [
      { es: "la nota", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { es: "el examen", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { es: "la lección", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { es: "la asignatura", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { es: "el profesor", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "Lección 50: Investigación y ensayos",
    nextPage: "lesson50.html",
    words: [
      { es: "el ensayo", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { es: "la tesis", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { es: "el informe", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { es: "el proyecto", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { es: "el taller", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "Lección 51: Viajes",
    nextPage: "lesson51.html",
    words: [
      { es: "el pasaporte", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { es: "el hotel", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { es: "el equipaje", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { es: "el vuelo", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { es: "el mapa", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "Lección 52: Equipo de viaje",
    nextPage: "lesson52.html",
    words: [
      { es: "la mochila", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { es: "la tienda de campaña", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { es: "la brújula", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { es: "los prismáticos", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { es: "la crema solar", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "Lección 53: Turismo",
    nextPage: "lesson53.html",
    words: [
      { es: "el guía", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { es: "el turista", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { es: "el recuerdo", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { es: "la aventura", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { es: "el viaje", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "Lección 54: Puerto y aeropuerto",
    nextPage: "lesson54.html",
    words: [
      { es: "el puerto", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { es: "el puerto", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { es: "la terminal", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { es: "la puerta", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { es: "la tripulación", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "Lección 55: Documentos de viaje",
    nextPage: "lesson55.html",
    words: [
      { es: "el visado", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { es: "la moneda", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { es: "el cambio", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { es: "la salida", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { es: "la llegada", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "Lección 56: Ordenador",
    nextPage: "lesson56.html",
    words: [
      { es: "el ordenador", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { es: "el teclado", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { es: "el ratón", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { es: "internet", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { es: "el correo electrónico", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "Lección 57: Accesorios de ordenador",
    nextPage: "lesson57.html",
    words: [
      { es: "la pantalla", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { es: "el monitor", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { es: "la impresora", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { es: "el escáner", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { es: "el altavoz", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "Lección 58: Software",
    nextPage: "lesson58.html",
    words: [
      { es: "el software", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { es: "el hardware", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { es: "la actualización", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { es: "la contraseña", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { es: "la cuenta", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "Lección 59: Internet",
    nextPage: "lesson59.html",
    words: [
      { es: "la descarga", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { es: "la subida", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { es: "la transmisión en vivo", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { es: "el vídeo", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { es: "el audio", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "Lección 60: Nuevas tecnologías",
    nextPage: "lesson60.html",
    words: [
      { es: "el dispositivo", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { es: "el gadget", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { es: "el robot", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { es: "el dron", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { es: "el reloj inteligente", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ ¡Lección no encontrada!</h2>
      <p>Por favor, ingrese desde la página principal.</p>
      <a href="../index.html">Volver al inicio</a>
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
      <img src="${w.image}" alt="${w.es}">
      <div class="word-en" style="font-size: 20px;">${w.es}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.es);
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