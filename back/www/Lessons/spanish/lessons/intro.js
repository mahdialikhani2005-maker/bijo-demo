// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های اسپانیایی =====
const allLessons = {
  "es-lesson1": {
    title: "Lección 1: Personas",
    nextPage: "lesson1.html",
    words: [
      { en: "hombre", fa: "مرد", image: "../../media/people/man.webp" },
      { en: "mujer", fa: "زن", image: "../../media/people/woman.webp" },
      { en: "niño", fa: "پسر", image: "../../media/people/boy.webp" },
      { en: "chica", fa: "دختر", image: "../../media/people/girl.webp" },
      { en: "bebé", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "es-lesson2": {
    title: "Lección 2: Partes del cuerpo",
    nextPage: "lesson2.html",
    words: [
      { en: "cabeza", fa: "سر", image: "../../media/body/head.webp" },
      { en: "mano", fa: "دست", image: "../../media/body/hand.webp" },
      { en: "ojo", fa: "چشم", image: "../../media/body/eye.webp" },
      { en: "pie", fa: "پا", image: "../../media/body/foot.webp" },
      { en: "nariz", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "es-lesson3": {
    title: "Lección 3: La casa",
    nextPage: "lesson3.html",
    words: [
      { en: "casa", fa: "خانه", image: "../../media/house/house.webp" },
      { en: "habitación", fa: "اتاق", image: "../../media/house/room.webp" },
      { en: "puerta", fa: "در", image: "../../media/house/door.webp" },
      { en: "ventana", fa: "پنجره", image: "../../media/house/window.webp" },
      { en: "cocina", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "es-lesson4": {
    title: "Lección 4: Ropa",
    nextPage: "lesson4.html",
    words: [
      { en: "camisa", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { en: "pantalones", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { en: "zapatos", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { en: "sombrero", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { en: "vestido", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "es-lesson5": {
    title: "Lección 5: Comida",
    nextPage: "lesson5.html",
    words: [
      { en: "pan", fa: "نان", image: "../../media/food/bread.webp" },
      { en: "arroz", fa: "برنج", image: "../../media/food/rice.webp" },
      { en: "carne", fa: "گوشت", image: "../../media/food/meat.webp" },
      { en: "huevo", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { en: "leche", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "es-lesson6": {
    title: "Lección 6: Frutas",
    nextPage: "lesson6.html",
    words: [
      { en: "manzana", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { en: "plátano", fa: "موز", image: "../../media/fruits/banana.webp" },
      { en: "naranja", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { en: "uva", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { en: "sandía", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "es-lesson7": {
    title: "Lección 7: Verduras",
    nextPage: "lesson7.html",
    words: [
      { en: "tomate", fa: "گوجه", image: "../../media/vegetables/tomato.webp" },
      { en: "patata", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { en: "zanahoria", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { en: "cebolla", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { en: "pepino", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "es-lesson8": {
    title: "Lección 8: Animales",
    nextPage: "lesson8.html",
    words: [
      { en: "perro", fa: "سگ", image: "../../media/animals/dog.webp" },
      { en: "gato", fa: "گربه", image: "../../media/animals/cat.webp" },
      { en: "pájaro", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { en: "pez", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { en: "caballo", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "es-lesson9": {
    title: "Lección 9: Naturaleza",
    nextPage: "lesson9.html",
    words: [
      { en: "sol", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { en: "luna", fa: "ماه", image: "../../media/nature/moon.webp" },
      { en: "estrella", fa: "ستاره", image: "../../media/nature/star.webp" },
      { en: "cielo", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { en: "lluvia", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "es-lesson10": {
    title: "Lección 10: Clima",
    nextPage: "lesson10.html",
    words: [
      { en: "calor", fa: "گرم", image: "../../media/weather/hot.webp" },
      { en: "frío", fa: "سرد", image: "../../media/weather/cold.webp" },
      { en: "soleado", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { en: "nublado", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { en: "viento", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "es-lesson11": {
    title: "Lección 11: Colores",
    nextPage: "lesson11.html",
    words: [
      { en: "rojo", fa: "قرمز", image: "../../media/colors/red.webp" },
      { en: "azul", fa: "آبی", image: "../../media/colors/blue.webp" },
      { en: "verde", fa: "سبز", image: "../../media/colors/green.webp" },
      { en: "amarillo", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { en: "negro", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "es-lesson12": {
    title: "Lección 12: Números",
    nextPage: "lesson12.html",
    words: [
      { en: "uno", fa: "یک", image: "../../media/numbers/one.webp" },
      { en: "dos", fa: "دو", image: "../../media/numbers/two.webp" },
      { en: "tres", fa: "سه", image: "../../media/numbers/three.webp" },
      { en: "cuatro", fa: "چهار", image: "../../media/numbers/four.webp" },
      { en: "cinco", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "es-lesson13": {
    title: "Lección 13: Tiempo",
    nextPage: "lesson13.html",
    words: [
      { en: "hoy", fa: "امروز", image: "../../media/time/today.webp" },
      { en: "mañana", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { en: "ayer", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { en: "mañana (día)", fa: "صبح", image: "../../media/time/morning.webp" },
      { en: "noche", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "es-lesson14": {
    title: "Lección 14: Profesiones",
    nextPage: "lesson14.html",
    words: [
      { en: "maestro", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { en: "médico", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { en: "ingeniero", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { en: "estudiante", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { en: "conductor", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "es-lesson15": {
    title: "Lección 15: Vehículos",
    nextPage: "lesson15.html",
    words: [
      { en: "coche", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { en: "autobús", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { en: "tren", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { en: "avión", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { en: "bicicleta", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "es-lesson16": {
    title: "Lección 16: Lugares",
    nextPage: "lesson16.html",
    words: [
      { en: "escuela", fa: "مدرسه", image: "../../media/places/school.webp" },
      { en: "hospital", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { en: "tienda", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { en: "parque", fa: "پارک", image: "../../media/places/park.webp" },
      { en: "mezquita", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "es-lesson17": {
    title: "Lección 17: Sentimientos",
    nextPage: "lesson17.html",
    words: [
      { en: "feliz", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { en: "triste", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { en: "enojado", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { en: "cansado", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { en: "hambriento", fa: "گرسنه", image: "../../media/feelings/hungry.webp" }
    ]
  },
  "es-lesson18": {
    title: "Lección 18: Acciones",
    nextPage: "lesson18.html",
    words: [
      { en: "comer", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { en: "dormir", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { en: "caminar", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { en: "leer", fa: "خواندن", image: "../../media/actions/read.webp" },
      { en: "escribir", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "es-lesson19": {
    title: "Lección 19: Adjetivos",
    nextPage: "lesson19.html",
    words: [
      { en: "grande", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { en: "pequeño", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { en: "alto", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { en: "bajo", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { en: "bonito", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "es-lesson20": {
    title: "Lección 20: Preguntas",
    nextPage: "lesson20.html",
    words: [
      { en: "quién", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { en: "qué", fa: "چه", image: "../../media/questions/what.webp" },
      { en: "dónde", fa: "کجا", image: "../../media/questions/where.webp" },
      { en: "cuándo", fa: "کی", image: "../../media/questions/when.webp" },
      { en: "por qué", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "es-ES",
        rate: 0.9,
        category: "ambient"
      });
    } catch (err) {
      console.warn("خطا در پخش صدا (native):", err);
    }
    return;
  }

  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// فایل‌های لازم برای هر درس رو می‌سازه
function getLessonAssetUrls(lesson) {
  const jsFile = lesson.nextPage.replace(".html", ".js");
  const images = lesson.words.map(w => w.image);

  return [
    lesson.nextPage,
    jsFile,
    "lesson.css",
    ...images
  ];
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];

  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ درس پیدا نشد!</h2>
      <p>لطفاً از صفحه اصلی وارد شوید.</p>
      <a href="../index.html">بازگشت به صفحه اصلی</a>
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
      <span class="word-speaker">🔊</span>
      <div class="word-text">
        <div class="word-en">${w.en}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.en}">
    `;
    card.addEventListener("click", () => {
      speak(w.en);
      card.classList.add("playing");
      setTimeout(() => {
        card.classList.remove("playing");
      }, 800);
    });
    container.appendChild(card);
  });

  document.getElementById("start-lesson-btn").addEventListener("click", () => {
    const urls = getLessonAssetUrls(lesson);
    window.startLessonWithDownload(lessonId, urls, lesson.nextPage, "lesson-loading");
  });
}

async function initIntroPage() {
  const lesson = allLessons[lessonId];
  const loadingEl = document.getElementById("lesson-loading");

  if (lesson) {
    if (loadingEl) loadingEl.style.display = "flex";
    try {
      const urls = getLessonAssetUrls(lesson);
      await window.downloadLesson(lessonId, urls);
    } catch (err) {
      console.warn("دانلود اولیه‌ی درس ناموفق بود:", err);
    }
    if (loadingEl) loadingEl.style.display = "none";
  }

  renderIntro();
}

window.onload = initIntroPage;