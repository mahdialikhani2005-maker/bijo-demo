// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های ایتالیایی =====
const allLessons = {
  "it-lesson1": {
    title: "درس ۱: افراد",
    nextPage: "lesson1-it.html",
    words: [
      { it: "l'uomo", fa: "مرد", image: "../../media/people/man.webp" },
      { it: "la donna", fa: "زن", image: "../../media/people/woman.webp" },
      { it: "il ragazzo", fa: "پسر", image: "../../media/people/boy.webp" },
      { it: "la ragazza", fa: "دختر", image: "../../media/people/girl.webp" },
      { it: "il bambino", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "it-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "lesson2-it.html",
    words: [
      { it: "la testa", fa: "سر", image: "../../media/body/head.webp" },
      { it: "la mano", fa: "دست", image: "../../media/body/hand.webp" },
      { it: "l'occhio", fa: "چشم", image: "../../media/body/eye.webp" },
      { it: "il piede", fa: "پا", image: "../../media/body/foot.webp" },
      { it: "il naso", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "it-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "lesson3-it.html",
    words: [
      { it: "la casa", fa: "خانه", image: "../../media/house/house.webp" },
      { it: "la stanza", fa: "اتاق", image: "../../media/house/room.webp" },
      { it: "la porta", fa: "در", image: "../../media/house/door.webp" },
      { it: "la finestra", fa: "پنجره", image: "../../media/house/window.webp" },
      { it: "la cucina", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "it-lesson4": {
    title: "درس ۴: لباس‌ها",
    nextPage: "lesson4-it.html",
    words: [
      { it: "la camicia", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { it: "i pantaloni", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { it: "le scarpe", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { it: "il cappello", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { it: "il vestito", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "it-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "lesson5-it.html",
    words: [
      { it: "il pane", fa: "نان", image: "../../media/food/bread.webp" },
      { it: "il riso", fa: "برنج", image: "../../media/food/rice.webp" },
      { it: "la carne", fa: "گوشت", image: "../../media/food/meat.webp" },
      { it: "l'uovo", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { it: "il latte", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "it-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "lesson6-it.html",
    words: [
      { it: "la mela", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { it: "la banana", fa: "موز", image: "../../media/fruits/banana.webp" },
      { it: "l'arancia", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { it: "l'uva", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { it: "l'anguria", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "it-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "lesson7-it.html",
    words: [
      { it: "il pomodoro", fa: "گوجه‌فرنگی", image: "../../media/vegetables/tomato.webp" },
      { it: "la patata", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { it: "la carota", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { it: "la cipolla", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { it: "il cetriolo", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "it-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "lesson8-it.html",
    words: [
      { it: "il cane", fa: "سگ", image: "../../media/animals/dog.webp" },
      { it: "il gatto", fa: "گربه", image: "../../media/animals/cat.webp" },
      { it: "l'uccello", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { it: "il pesce", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { it: "il cavallo", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "it-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "lesson9-it.html",
    words: [
      { it: "il sole", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { it: "la luna", fa: "ماه", image: "../../media/nature/moon.webp" },
      { it: "la stella", fa: "ستاره", image: "../../media/nature/star.webp" },
      { it: "il cielo", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { it: "la pioggia", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "it-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "lesson10-it.html",
    words: [
      { it: "caldo", fa: "گرم", image: "../../media/weather/hot.webp" },
      { it: "freddo", fa: "سرد", image: "../../media/weather/cold.webp" },
      { it: "soleggiato", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { it: "nuvoloso", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { it: "vento", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "it-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "lesson11-it.html",
    words: [
      { it: "rosso", fa: "قرمز", image: "../../media/colors/red.webp" },
      { it: "blu", fa: "آبی", image: "../../media/colors/blue.webp" },
      { it: "verde", fa: "سبز", image: "../../media/colors/green.webp" },
      { it: "giallo", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { it: "nero", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "it-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "lesson12-it.html",
    words: [
      { it: "uno", fa: "یک", image: "../../media/numbers/one.webp" },
      { it: "due", fa: "دو", image: "../../media/numbers/two.webp" },
      { it: "tre", fa: "سه", image: "../../media/numbers/three.webp" },
      { it: "quattro", fa: "چهار", image: "../../media/numbers/four.webp" },
      { it: "cinque", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "it-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "lesson13-it.html",
    words: [
      { it: "oggi", fa: "امروز", image: "../../media/time/today.webp" },
      { it: "domani", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { it: "ieri", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { it: "mattina", fa: "صبح", image: "../../media/time/morning.webp" },
      { it: "notte", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "it-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "lesson14-it.html",
    words: [
      { it: "l'insegnante", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { it: "il medico", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { it: "l'ingegnere", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { it: "lo studente", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { it: "l'autista", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "it-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "lesson15-it.html",
    words: [
      { it: "la macchina", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { it: "l'autobus", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { it: "il treno", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { it: "l'aereo", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { it: "la bicicletta", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "it-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "lesson16-it.html",
    words: [
      { it: "la scuola", fa: "مدرسه", image: "../../media/places/school.webp" },
      { it: "l'ospedale", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { it: "il negozio", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { it: "il parco", fa: "پارک", image: "../../media/places/park.webp" },
      { it: "la moschea", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "it-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "lesson17-it.html",
    words: [
      { it: "felice", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { it: "triste", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { it: "arrabbiato", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { it: "stanco", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { it: "spaventato", fa: "ترسیده", image: "../../media/feelings/scared.webp" }
    ]
  },
  "it-lesson18": {
    title: "درس ۱۸: فعالیت‌های روزمره",
    nextPage: "lesson18-it.html",
    words: [
      { it: "mangiare", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { it: "dormire", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { it: "camminare", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { it: "leggere", fa: "خواندن", image: "../../media/actions/read.webp" },
      { it: "scrivere", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "it-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "lesson19-it.html",
    words: [
      { it: "grande", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { it: "piccolo", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { it: "alto", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { it: "basso", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { it: "bello", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "it-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "lesson20-it.html",
    words: [
      { it: "chi", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { it: "che", fa: "چه", image: "../../media/questions/what.webp" },
      { it: "dove", fa: "کجا", image: "../../media/questions/where.webp" },
      { it: "quando", fa: "کی", image: "../../media/questions/when.webp" },
      { it: "perché", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (ایتالیایی) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "it-IT",
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
  utter.lang = "it-IT";
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
      <a href="../index-it.html">بازگشت به صفحه اصلی</a>
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
        <div class="word-en">${w.it}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.it}">
    `;
    card.addEventListener("click", () => {
      speak(w.it);
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