// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های روسی =====
const allLessons = {
  "ru-lesson1": {
    title: "Урок 1: Люди",
    nextPage: "lesson1.html",
    words: [
      { en: "мужчина", fa: "مرد", image: "../../media/people/man.webp" },
      { en: "женщина", fa: "زن", image: "../../media/people/woman.webp" },
      { en: "мальчик", fa: "پسر", image: "../../media/people/boy.webp" },
      { en: "девушка", fa: "دختر", image: "../../media/people/girl.webp" },
      { en: "ребёнок", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "ru-lesson2": {
    title: "Урок 2: Части тела",
    nextPage: "lesson2.html",
    words: [
      { en: "голова", fa: "سر", image: "../../media/body/head.webp" },
      { en: "рука", fa: "دست", image: "../../media/body/hand.webp" },
      { en: "глаз", fa: "چشم", image: "../../media/body/eye.webp" },
      { en: "нога", fa: "پا", image: "../../media/body/foot.webp" },
      { en: "нос", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "ru-lesson3": {
    title: "Урок 3: Дом",
    nextPage: "lesson3.html",
    words: [
      { en: "дом", fa: "خانه", image: "../../media/house/house.webp" },
      { en: "комната", fa: "اتاق", image: "../../media/house/room.webp" },
      { en: "дверь", fa: "در", image: "../../media/house/door.webp" },
      { en: "окно", fa: "پنجره", image: "../../media/house/window.webp" },
      { en: "кухня", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "ru-lesson4": {
    title: "Урок 4: Одежда",
    nextPage: "lesson4.html",
    words: [
      { en: "рубашка", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { en: "брюки", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { en: "туфли", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { en: "шляпа", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { en: "платье", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "ru-lesson5": {
    title: "Урок 5: Еда",
    nextPage: "lesson5.html",
    words: [
      { en: "хлеб", fa: "نان", image: "../../media/food/bread.webp" },
      { en: "рис", fa: "برنج", image: "../../media/food/rice.webp" },
      { en: "мясо", fa: "گوشت", image: "../../media/food/meat.webp" },
      { en: "яйцо", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { en: "молоко", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "ru-lesson6": {
    title: "Урок 6: Фрукты",
    nextPage: "lesson6.html",
    words: [
      { en: "яблоко", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { en: "банан", fa: "موز", image: "../../media/fruits/banana.webp" },
      { en: "апельсин", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { en: "виноград", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { en: "арбуз", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "ru-lesson7": {
    title: "Урок 7: Овощи",
    nextPage: "lesson7.html",
    words: [
      { en: "помидор", fa: "گوجه", image: "../../media/vegetables/tomato.webp" },
      { en: "картофель", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { en: "морковь", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { en: "лук", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { en: "огурец", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "ru-lesson8": {
    title: "Урок 8: Животные",
    nextPage: "lesson8.html",
    words: [
      { en: "собака", fa: "سگ", image: "../../media/animals/dog.webp" },
      { en: "кошка", fa: "گربه", image: "../../media/animals/cat.webp" },
      { en: "птица", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { en: "рыба", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { en: "лошадь", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "ru-lesson9": {
    title: "Урок 9: Природа",
    nextPage: "lesson9.html",
    words: [
      { en: "солнце", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { en: "луна", fa: "ماه", image: "../../media/nature/moon.webp" },
      { en: "звезда", fa: "ستاره", image: "../../media/nature/star.webp" },
      { en: "небо", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { en: "дождь", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "ru-lesson10": {
    title: "Урок 10: Погода",
    nextPage: "lesson10.html",
    words: [
      { en: "жарко", fa: "گرم", image: "../../media/weather/hot.webp" },
      { en: "холодно", fa: "سرد", image: "../../media/weather/cold.webp" },
      { en: "солнечно", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { en: "облачно", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { en: "ветрено", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "ru-lesson11": {
    title: "Урок 11: Цвета",
    nextPage: "lesson11.html",
    words: [
      { en: "красный", fa: "قرمز", image: "../../media/colors/red.webp" },
      { en: "синий", fa: "آبی", image: "../../media/colors/blue.webp" },
      { en: "зелёный", fa: "سبز", image: "../../media/colors/green.webp" },
      { en: "жёлтый", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { en: "чёрный", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "ru-lesson12": {
    title: "Урок 12: Числа",
    nextPage: "lesson12.html",
    words: [
      { en: "один", fa: "یک", image: "../../media/numbers/one.webp" },
      { en: "два", fa: "دو", image: "../../media/numbers/two.webp" },
      { en: "три", fa: "سه", image: "../../media/numbers/three.webp" },
      { en: "четыре", fa: "چهار", image: "../../media/numbers/four.webp" },
      { en: "пять", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "ru-lesson13": {
    title: "Урок 13: Время",
    nextPage: "lesson13.html",
    words: [
      { en: "сегодня", fa: "امروز", image: "../../media/time/today.webp" },
      { en: "завтра", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { en: "вчера", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { en: "утро", fa: "صبح", image: "../../media/time/morning.webp" },
      { en: "ночь", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "ru-lesson14": {
    title: "Урок 14: Профессии",
    nextPage: "lesson14.html",
    words: [
      { en: "учитель", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { en: "врач", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { en: "инженер", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { en: "ученик", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { en: "водитель", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "ru-lesson15": {
    title: "Урок 15: Транспорт",
    nextPage: "lesson15.html",
    words: [
      { en: "машина", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { en: "автобус", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { en: "поезд", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { en: "самолёт", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { en: "велосипед", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "ru-lesson16": {
    title: "Урок 16: Места",
    nextPage: "lesson16.html",
    words: [
      { en: "школа", fa: "مدرسه", image: "../../media/places/school.webp" },
      { en: "больница", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { en: "магазин", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { en: "парк", fa: "پارک", image: "../../media/places/park.webp" },
      { en: "мечеть", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "ru-lesson17": {
    title: "Урок 17: Чувства",
    nextPage: "lesson17.html",
    words: [
      { en: "счастливый", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { en: "грустный", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { en: "злой", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { en: "уставший", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { en: "голодный", fa: "گرسنه", image: "../../media/feelings/hungry.webp" }
    ]
  },
  "ru-lesson18": {
    title: "Урок 18: Действия",
    nextPage: "lesson18.html",
    words: [
      { en: "есть", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { en: "спать", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { en: "идти", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { en: "читать", fa: "خواندن", image: "../../media/actions/read.webp" },
      { en: "писать", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "ru-lesson19": {
    title: "Урок 19: Прилагательные",
    nextPage: "lesson19.html",
    words: [
      { en: "большой", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { en: "маленький", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { en: "высокий", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { en: "короткий", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { en: "красивый", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "ru-lesson20": {
    title: "Урок 20: Вопросы",
    nextPage: "lesson20.html",
    words: [
      { en: "кто", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { en: "что", fa: "چه", image: "../../media/questions/what.webp" },
      { en: "где", fa: "کجا", image: "../../media/questions/where.webp" },
      { en: "когда", fa: "کی", image: "../../media/questions/when.webp" },
      { en: "почему", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ru-RU",
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
  utter.lang = "ru-RU";
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