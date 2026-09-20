// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های آلمانی =====
const allLessons = {
  "de-lesson1": {
    title: "درس ۱: افراد",
    nextPage: "lesson1-de.html",
    words: [
      { de: "der Mann", fa: "مرد", image: "../../media/people/man.webp" },
      { de: "die Frau", fa: "زن", image: "../../media/people/woman.webp" },
      { de: "der Junge", fa: "پسر", image: "../../media/people/boy.webp" },
      { de: "das Mädchen", fa: "دختر", image: "../../media/people/girl.webp" },
      { de: "das Baby", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "de-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "lesson2-de.html",
    words: [
      { de: "der Kopf", fa: "سر", image: "../../media/body/head.webp" },
      { de: "die Hand", fa: "دست", image: "../../media/body/hand.webp" },
      { de: "das Auge", fa: "چشم", image: "../../media/body/eye.webp" },
      { de: "der Fuß", fa: "پا", image: "../../media/body/foot.webp" },
      { de: "die Nase", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "de-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "lesson3-de.html",
    words: [
      { de: "das Haus", fa: "خانه", image: "../../media/house/house.webp" },
      { de: "das Zimmer", fa: "اتاق", image: "../../media/house/room.webp" },
      { de: "die Tür", fa: "در", image: "../../media/house/door.webp" },
      { de: "das Fenster", fa: "پنجره", image: "../../media/house/window.webp" },
      { de: "die Küche", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "de-lesson4": {
    title: "درس ۴: لباس‌ها",
    nextPage: "lesson4-de.html",
    words: [
      { de: "das Hemd", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { de: "die Hose", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { de: "die Schuhe", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { de: "der Hut", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { de: "das Kleid", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "de-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "lesson5-de.html",
    words: [
      { de: "das Brot", fa: "نان", image: "../../media/food/bread.webp" },
      { de: "der Reis", fa: "برنج", image: "../../media/food/rice.webp" },
      { de: "das Fleisch", fa: "گوشت", image: "../../media/food/meat.webp" },
      { de: "das Ei", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { de: "die Milch", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "de-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "lesson6-de.html",
    words: [
      { de: "der Apfel", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { de: "die Banane", fa: "موز", image: "../../media/fruits/banana.webp" },
      { de: "die Orange", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { de: "die Traube", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { de: "die Wassermelone", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "de-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "lesson7-de.html",
    words: [
      { de: "die Tomate", fa: "گوجه‌فرنگی", image: "../../media/vegetables/tomato.webp" },
      { de: "die Kartoffel", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { de: "die Karotte", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { de: "die Zwiebel", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { de: "die Gurke", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "de-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "lesson8-de.html",
    words: [
      { de: "der Hund", fa: "سگ", image: "../../media/animals/dog.webp" },
      { de: "die Katze", fa: "گربه", image: "../../media/animals/cat.webp" },
      { de: "der Vogel", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { de: "der Fisch", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { de: "das Pferd", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "de-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "lesson9-de.html",
    words: [
      { de: "die Sonne", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { de: "der Mond", fa: "ماه", image: "../../media/nature/moon.webp" },
      { de: "der Stern", fa: "ستاره", image: "../../media/nature/star.webp" },
      { de: "der Himmel", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { de: "der Regen", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "de-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "lesson10-de.html",
    words: [
      { de: "heiß", fa: "گرم", image: "../../media/weather/hot.webp" },
      { de: "kalt", fa: "سرد", image: "../../media/weather/cold.webp" },
      { de: "sonnig", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { de: "bewölkt", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { de: "windig", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "de-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "lesson11-de.html",
    words: [
      { de: "rot", fa: "قرمز", image: "../../media/colors/red.webp" },
      { de: "blau", fa: "آبی", image: "../../media/colors/blue.webp" },
      { de: "grün", fa: "سبز", image: "../../media/colors/green.webp" },
      { de: "gelb", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { de: "schwarz", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "de-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "lesson12-de.html",
    words: [
      { de: "eins", fa: "یک", image: "../../media/numbers/one.webp" },
      { de: "zwei", fa: "دو", image: "../../media/numbers/two.webp" },
      { de: "drei", fa: "سه", image: "../../media/numbers/three.webp" },
      { de: "vier", fa: "چهار", image: "../../media/numbers/four.webp" },
      { de: "fünf", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "de-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "lesson13-de.html",
    words: [
      { de: "heute", fa: "امروز", image: "../../media/time/today.webp" },
      { de: "morgen", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { de: "gestern", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { de: "Morgen", fa: "صبح", image: "../../media/time/morning.webp" },
      { de: "Nacht", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "de-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "lesson14-de.html",
    words: [
      { de: "der Lehrer", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { de: "der Arzt", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { de: "der Ingenieur", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { de: "der Schüler", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { de: "der Fahrer", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "de-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "lesson15-de.html",
    words: [
      { de: "das Auto", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { de: "der Bus", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { de: "der Zug", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { de: "das Flugzeug", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { de: "das Fahrrad", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "de-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "lesson16-de.html",
    words: [
      { de: "die Schule", fa: "مدرسه", image: "../../media/places/school.webp" },
      { de: "das Krankenhaus", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { de: "das Geschäft", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { de: "der Park", fa: "پارک", image: "../../media/places/park.webp" },
      { de: "die Moschee", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "de-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "lesson17-de.html",
    words: [
      { de: "glücklich", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { de: "traurig", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { de: "wütend", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { de: "müde", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { de: "ängstlich", fa: "ترسیده", image: "../../media/feelings/scared.webp" }
    ]
  },
  "de-lesson18": {
    title: "درس ۱۸: فعالیت‌های روزمره",
    nextPage: "lesson18-de.html",
    words: [
      { de: "essen", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { de: "schlafen", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { de: "gehen", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { de: "lesen", fa: "خواندن", image: "../../media/actions/read.webp" },
      { de: "schreiben", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "de-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "lesson19-de.html",
    words: [
      { de: "groß", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { de: "klein", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { de: "hoch", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { de: "kurz", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { de: "schön", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "de-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "lesson20-de.html",
    words: [
      { de: "wer", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { de: "was", fa: "چه", image: "../../media/questions/what.webp" },
      { de: "wo", fa: "کجا", image: "../../media/questions/where.webp" },
      { de: "wann", fa: "کی", image: "../../media/questions/when.webp" },
      { de: "warum", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (آلمانی) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
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

  // وگرنه (تو مرورگر معمولی/سایت)، از همون روش قبلی استفاده کن
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// فایل‌های لازم برای هر درس رو می‌سازه: صفحه‌ی درس، اسکریپتش،
// استایل مشترک، و تمام عکس‌های همون درس
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
      <a href="../index-de.html">بازگشت به صفحه اصلی</a>
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
        <div class="word-en">${w.de}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.de}">
    `;
    card.addEventListener("click", () => {
      speak(w.de);
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