// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های آلمانی =====
const allLessons = {
  "de-lesson1": {
    title: "Lektion 1: Personen",
    nextPage: "lesson1.html",
    words: [
      { en: "Mann", fa: "مرد", image: "../../media/people/man.webp" },
      { en: "Frau", fa: "زن", image: "../../media/people/woman.webp" },
      { en: "Junge", fa: "پسر", image: "../../media/people/boy.webp" },
      { en: "Mädchen", fa: "دختر", image: "../../media/people/girl.webp" },
      { en: "Baby", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "de-lesson2": {
    title: "Lektion 2: Körperteile",
    nextPage: "lesson2.html",
    words: [
      { en: "Kopf", fa: "سر", image: "../../media/body/head.webp" },
      { en: "Hand", fa: "دست", image: "../../media/body/hand.webp" },
      { en: "Auge", fa: "چشم", image: "../../media/body/eye.webp" },
      { en: "Fuß", fa: "پا", image: "../../media/body/foot.webp" },
      { en: "Nase", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "de-lesson3": {
    title: "Lektion 3: Das Haus",
    nextPage: "lesson3.html",
    words: [
      { en: "Haus", fa: "خانه", image: "../../media/house/house.webp" },
      { en: "Zimmer", fa: "اتاق", image: "../../media/house/room.webp" },
      { en: "Tür", fa: "در", image: "../../media/house/door.webp" },
      { en: "Fenster", fa: "پنجره", image: "../../media/house/window.webp" },
      { en: "Küche", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "de-lesson4": {
    title: "Lektion 4: Kleidung",
    nextPage: "lesson4.html",
    words: [
      { en: "Hemd", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { en: "Hose", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { en: "Schuhe", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { en: "Hut", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { en: "Kleid", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "de-lesson5": {
    title: "Lektion 5: Essen",
    nextPage: "lesson5.html",
    words: [
      { en: "Brot", fa: "نان", image: "../../media/food/bread.webp" },
      { en: "Reis", fa: "برنج", image: "../../media/food/rice.webp" },
      { en: "Fleisch", fa: "گوشت", image: "../../media/food/meat.webp" },
      { en: "Ei", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { en: "Milch", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "de-lesson6": {
    title: "Lektion 6: Obst",
    nextPage: "lesson6.html",
    words: [
      { en: "Apfel", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { en: "Banane", fa: "موز", image: "../../media/fruits/banana.webp" },
      { en: "Orange", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { en: "Traube", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { en: "Wassermelone", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "de-lesson7": {
    title: "Lektion 7: Gemüse",
    nextPage: "lesson7.html",
    words: [
      { en: "Tomate", fa: "گوجه", image: "../../media/vegetables/tomato.webp" },
      { en: "Kartoffel", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { en: "Karotte", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { en: "Zwiebel", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { en: "Gurke", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "de-lesson8": {
    title: "Lektion 8: Tiere",
    nextPage: "lesson8.html",
    words: [
      { en: "Hund", fa: "سگ", image: "../../media/animals/dog.webp" },
      { en: "Katze", fa: "گربه", image: "../../media/animals/cat.webp" },
      { en: "Vogel", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { en: "Fisch", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { en: "Pferd", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "de-lesson9": {
    title: "Lektion 9: Die Natur",
    nextPage: "lesson9.html",
    words: [
      { en: "Sonne", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { en: "Mond", fa: "ماه", image: "../../media/nature/moon.webp" },
      { en: "Stern", fa: "ستاره", image: "../../media/nature/star.webp" },
      { en: "Himmel", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { en: "Regen", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "de-lesson10": {
    title: "Lektion 10: Das Wetter",
    nextPage: "lesson10.html",
    words: [
      { en: "heiß", fa: "گرم", image: "../../media/weather/hot.webp" },
      { en: "kalt", fa: "سرد", image: "../../media/weather/cold.webp" },
      { en: "sonnig", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { en: "bewölkt", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { en: "Wind", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "de-lesson11": {
    title: "Lektion 11: Farben",
    nextPage: "lesson11.html",
    words: [
      { en: "rot", fa: "قرمز", image: "../../media/colors/red.webp" },
      { en: "blau", fa: "آبی", image: "../../media/colors/blue.webp" },
      { en: "grün", fa: "سبز", image: "../../media/colors/green.webp" },
      { en: "gelb", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { en: "schwarz", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "de-lesson12": {
    title: "Lektion 12: Zahlen",
    nextPage: "lesson12.html",
    words: [
      { en: "eins", fa: "یک", image: "../../media/numbers/one.webp" },
      { en: "zwei", fa: "دو", image: "../../media/numbers/two.webp" },
      { en: "drei", fa: "سه", image: "../../media/numbers/three.webp" },
      { en: "vier", fa: "چهار", image: "../../media/numbers/four.webp" },
      { en: "fünf", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "de-lesson13": {
    title: "Lektion 13: Die Zeit",
    nextPage: "lesson13.html",
    words: [
      { en: "heute", fa: "امروز", image: "../../media/time/today.webp" },
      { en: "morgen", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { en: "gestern", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { en: "Morgen", fa: "صبح", image: "../../media/time/morning.webp" },
      { en: "Nacht", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "de-lesson14": {
    title: "Lektion 14: Berufe",
    nextPage: "lesson14.html",
    words: [
      { en: "Lehrer", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { en: "Arzt", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { en: "Ingenieur", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { en: "Schüler", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { en: "Fahrer", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "de-lesson15": {
    title: "Lektion 15: Fahrzeuge",
    nextPage: "lesson15.html",
    words: [
      { en: "Auto", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { en: "Bus", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { en: "Zug", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { en: "Flugzeug", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { en: "Fahrrad", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "de-lesson16": {
    title: "Lektion 16: Orte",
    nextPage: "lesson16.html",
    words: [
      { en: "Schule", fa: "مدرسه", image: "../../media/places/school.webp" },
      { en: "Krankenhaus", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { en: "Geschäft", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { en: "Park", fa: "پارک", image: "../../media/places/park.webp" },
      { en: "Moschee", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "de-lesson17": {
    title: "Lektion 17: Gefühle",
    nextPage: "lesson17.html",
    words: [
      { en: "glücklich", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { en: "traurig", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { en: "wütend", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { en: "müde", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { en: "hungrig", fa: "گرسنه", image: "../../media/feelings/hungry.webp" }
    ]
  },
  "de-lesson18": {
    title: "Lektion 18: Tägliche Aktivitäten",
    nextPage: "lesson18.html",
    words: [
      { en: "essen", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { en: "schlafen", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { en: "gehen", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { en: "lesen", fa: "خواندن", image: "../../media/actions/read.webp" },
      { en: "schreiben", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "de-lesson19": {
    title: "Lektion 19: Adjektive",
    nextPage: "lesson19.html",
    words: [
      { en: "groß", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { en: "klein", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { en: "hoch", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { en: "kurz", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { en: "schön", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "de-lesson20": {
    title: "Lektion 20: Fragen",
    nextPage: "lesson20.html",
    words: [
      { en: "wer", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { en: "was", fa: "چه", image: "../../media/questions/what.webp" },
      { en: "wo", fa: "کجا", image: "../../media/questions/where.webp" },
      { en: "wann", fa: "کی", image: "../../media/questions/when.webp" },
      { en: "warum", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (آلمانی) =====
function speak(text) {
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "de-DE",
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
  utter.lang = "de-DE";
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