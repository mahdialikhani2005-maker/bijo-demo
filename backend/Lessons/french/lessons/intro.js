// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های فرانسوی =====
const allLessons = {
  "fr-lesson1": {
    title: "درس ۱: افراد",
    nextPage: "lesson1.html",
    words: [
      { fr: "homme", fa: "مرد", image: "../../media/people/man.webp" },
      { fr: "femme", fa: "زن", image: "../../media/people/woman.webp" },
      { fr: "garçon", fa: "پسر", image: "../../media/people/boy.webp" },
      { fr: "fille", fa: "دختر", image: "../../media/people/girl.webp" },
      { fr: "bébé", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "fr-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "lesson2.html",
    words: [
      { fr: "tête", fa: "سر", image: "../../media/body/head.webp" },
      { fr: "main", fa: "دست", image: "../../media/body/hand.webp" },
      { fr: "œil", fa: "چشم", image: "../../media/body/eye.webp" },
      { fr: "pied", fa: "پا", image: "../../media/body/foot.webp" },
      { fr: "nez", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "fr-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "lesson3.html",
    words: [
      { fr: "maison", fa: "خانه", image: "../../media/house/house.webp" },
      { fr: "pièce", fa: "اتاق", image: "../../media/house/room.webp" },
      { fr: "porte", fa: "در", image: "../../media/house/door.webp" },
      { fr: "fenêtre", fa: "پنجره", image: "../../media/house/window.webp" },
      { fr: "cuisine", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "fr-lesson4": {
    title: "درس ۴: لباس‌ها",
    nextPage: "lesson4.html",
    words: [
      { fr: "chemise", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { fr: "pantalon", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { fr: "chaussures", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { fr: "chapeau", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { fr: "robe", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "fr-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "lesson5.html",
    words: [
      { fr: "pain", fa: "نان", image: "../../media/food/bread.webp" },
      { fr: "riz", fa: "برنج", image: "../../media/food/rice.webp" },
      { fr: "viande", fa: "گوشت", image: "../../media/food/meat.webp" },
      { fr: "œuf", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { fr: "lait", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "fr-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "lesson6.html",
    words: [
      { fr: "pomme", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { fr: "banane", fa: "موز", image: "../../media/fruits/banana.webp" },
      { fr: "orange", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { fr: "raisin", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { fr: "pastèque", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "fr-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "lesson7.html",
    words: [
      { fr: "tomate", fa: "گوجه‌فرنگی", image: "../../media/vegetables/tomato.webp" },
      { fr: "pomme de terre", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { fr: "carotte", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { fr: "oignon", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { fr: "concombre", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "fr-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "lesson8.html",
    words: [
      { fr: "chien", fa: "سگ", image: "../../media/animals/dog.webp" },
      { fr: "chat", fa: "گربه", image: "../../media/animals/cat.webp" },
      { fr: "oiseau", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { fr: "poisson", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { fr: "cheval", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "fr-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "lesson9.html",
    words: [
      { fr: "soleil", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { fr: "lune", fa: "ماه", image: "../../media/nature/moon.webp" },
      { fr: "étoile", fa: "ستاره", image: "../../media/nature/star.webp" },
      { fr: "ciel", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { fr: "pluie", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "fr-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "lesson10.html",
    words: [
      { fr: "chaud", fa: "گرم", image: "../../media/weather/hot.webp" },
      { fr: "froid", fa: "سرد", image: "../../media/weather/cold.webp" },
      { fr: "ensoleillé", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { fr: "nuageux", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { fr: "vent", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "fr-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "lesson11.html",
    words: [
      { fr: "rouge", fa: "قرمز", image: "../../media/colors/red.webp" },
      { fr: "bleu", fa: "آبی", image: "../../media/colors/blue.webp" },
      { fr: "vert", fa: "سبز", image: "../../media/colors/green.webp" },
      { fr: "jaune", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { fr: "noir", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "fr-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "lesson12.html",
    words: [
      { fr: "un", fa: "یک", image: "../../media/numbers/one.webp" },
      { fr: "deux", fa: "دو", image: "../../media/numbers/two.webp" },
      { fr: "trois", fa: "سه", image: "../../media/numbers/three.webp" },
      { fr: "quatre", fa: "چهار", image: "../../media/numbers/four.webp" },
      { fr: "cinq", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "fr-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "lesson13.html",
    words: [
      { fr: "aujourd'hui", fa: "امروز", image: "../../media/time/today.webp" },
      { fr: "demain", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { fr: "hier", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { fr: "matin", fa: "صبح", image: "../../media/time/morning.webp" },
      { fr: "nuit", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "fr-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "lesson14.html",
    words: [
      { fr: "professeur", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { fr: "médecin", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { fr: "ingénieur", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { fr: "étudiant", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { fr: "chauffeur", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "fr-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "lesson15.html",
    words: [
      { fr: "voiture", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { fr: "bus", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { fr: "train", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { fr: "avion", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { fr: "vélo", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "fr-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "lesson16.html",
    words: [
      { fr: "école", fa: "مدرسه", image: "../../media/places/school.webp" },
      { fr: "hôpital", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { fr: "magasin", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { fr: "parc", fa: "پارک", image: "../../media/places/park.webp" },
      { fr: "mosquée", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "fr-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "lesson17.html",
    words: [
      { fr: "heureux", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { fr: "triste", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { fr: "en colère", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { fr: "fatigué", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { fr: "affamé", fa: "گرسنه", image: "../../media/feelings/hungry.webp" }
    ]
  },
  "fr-lesson18": {
    title: "درس ۱۸: فعالیت‌های روزمره",
    nextPage: "lesson18.html",
    words: [
      { fr: "manger", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { fr: "dormir", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { fr: "marcher", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { fr: "lire", fa: "خواندن", image: "../../media/actions/read.webp" },
      { fr: "écrire", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "fr-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "lesson19.html",
    words: [
      { fr: "grand", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { fr: "petit", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { fr: "grand (taille)", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { fr: "court", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { fr: "beau", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "fr-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "lesson20.html",
    words: [
      { fr: "qui", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { fr: "quoi", fa: "چه", image: "../../media/questions/what.webp" },
      { fr: "où", fa: "کجا", image: "../../media/questions/where.webp" },
      { fr: "quand", fa: "کی", image: "../../media/questions/when.webp" },
      { fr: "pourquoi", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (فرانسوی) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "fr-FR",
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
  utter.lang = "fr-FR";
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
        <div class="word-en">${w.fr}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.fr}">
    `;
    card.addEventListener("click", () => {
      speak(w.fr);
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