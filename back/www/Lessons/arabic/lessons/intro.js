// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های عربی =====
const allLessons = {
  "ar-lesson1": {
    title: "درس ۱: افراد",
    nextPage: "lesson1-ar.html",
    words: [
      { ar: "رجل", fa: "مرد", image: "../../media/people/man.webp" },
      { ar: "امرأة", fa: "زن", image: "../../media/people/woman.webp" },
      { ar: "ولد", fa: "پسر", image: "../../media/people/boy.webp" },
      { ar: "بنت", fa: "دختر", image: "../../media/people/girl.webp" },
      { ar: "طفل", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "ar-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "lesson2-ar.html",
    words: [
      { ar: "رأس", fa: "سر", image: "../../media/body/head.webp" },
      { ar: "ید", fa: "دست", image: "../../media/body/hand.webp" },
      { ar: "عين", fa: "چشم", image: "../../media/body/eye.webp" },
      { ar: "قدم", fa: "پا", image: "../../media/body/foot.webp" },
      { ar: "أنف", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "ar-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "lesson3-ar.html",
    words: [
      { ar: "بيت", fa: "خانه", image: "../../media/house/house.webp" },
      { ar: "غرفة", fa: "اتاق", image: "../../media/house/room.webp" },
      { ar: "باب", fa: "در", image: "../../media/house/door.webp" },
      { ar: "نافذة", fa: "پنجره", image: "../../media/house/window.webp" },
      { ar: "مطبخ", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "ar-lesson4": {
    title: "درس ۴: لباس‌ها",
    nextPage: "lesson4-ar.html",
    words: [
      { ar: "قميص", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { ar: "سروال", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { ar: "حذاء", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { ar: "قبعة", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { ar: "فستان", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "ar-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "lesson5-ar.html",
    words: [
      { ar: "خبز", fa: "نان", image: "../../media/food/bread.webp" },
      { ar: "أرز", fa: "برنج", image: "../../media/food/rice.webp" },
      { ar: "لحم", fa: "گوشت", image: "../../media/food/meat.webp" },
      { ar: "بيض", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { ar: "حليب", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "ar-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "lesson6-ar.html",
    words: [
      { ar: "تفاحة", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { ar: "موز", fa: "موز", image: "../../media/fruits/banana.webp" },
      { ar: "برتقالة", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { ar: "عنب", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { ar: "بطيخ", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "ar-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "lesson7-ar.html",
    words: [
      { ar: "طماطم", fa: "گوجه‌فرنگی", image: "../../media/vegetables/tomato.webp" },
      { ar: "بطاطا", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { ar: "جزر", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { ar: "بصل", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { ar: "خيار", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "ar-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "lesson8-ar.html",
    words: [
      { ar: "كلب", fa: "سگ", image: "../../media/animals/dog.webp" },
      { ar: "قط", fa: "گربه", image: "../../media/animals/cat.webp" },
      { ar: "طائر", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { ar: "سمك", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { ar: "حصان", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "ar-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "lesson9-ar.html",
    words: [
      { ar: "شمس", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { ar: "قمر", fa: "ماه", image: "../../media/nature/moon.webp" },
      { ar: "نجم", fa: "ستاره", image: "../../media/nature/star.webp" },
      { ar: "سماء", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { ar: "مطر", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "ar-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "lesson10-ar.html",
    words: [
      { ar: "حار", fa: "گرم", image: "../../media/weather/hot.webp" },
      { ar: "بارد", fa: "سرد", image: "../../media/weather/cold.webp" },
      { ar: "مشمس", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { ar: "غائم", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { ar: "ريح", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "ar-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "lesson11-ar.html",
    words: [
      { ar: "أحمر", fa: "قرمز", image: "../../media/colors/red.webp" },
      { ar: "أزرق", fa: "آبی", image: "../../media/colors/blue.webp" },
      { ar: "أخضر", fa: "سبز", image: "../../media/colors/green.webp" },
      { ar: "أصفر", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { ar: "أسود", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "ar-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "lesson12-ar.html",
    words: [
      { ar: "واحد", fa: "یک", image: "../../media/numbers/one.webp" },
      { ar: "اثنان", fa: "دو", image: "../../media/numbers/two.webp" },
      { ar: "ثلاثة", fa: "سه", image: "../../media/numbers/three.webp" },
      { ar: "أربعة", fa: "چهار", image: "../../media/numbers/four.webp" },
      { ar: "خمسة", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "ar-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "lesson13-ar.html",
    words: [
      { ar: "اليوم", fa: "امروز", image: "../../media/time/today.webp" },
      { ar: "غداً", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { ar: "أمس", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { ar: "صباح", fa: "صبح", image: "../../media/time/morning.webp" },
      { ar: "ليل", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "ar-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "lesson14-ar.html",
    words: [
      { ar: "معلم", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { ar: "طبيب", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { ar: "مهندس", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { ar: "طالب", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { ar: "سائق", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "ar-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "lesson15-ar.html",
    words: [
      { ar: "سيارة", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { ar: "حافلة", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { ar: "قطار", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { ar: "طائرة", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { ar: "دراجة", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "ar-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "lesson16-ar.html",
    words: [
      { ar: "مدرسة", fa: "مدرسه", image: "../../media/places/school.webp" },
      { ar: "مستشفى", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { ar: "متجر", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { ar: "حديقة", fa: "پارک", image: "../../media/places/park.webp" },
      { ar: "مسجد", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "ar-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "lesson17-ar.html",
    words: [
      { ar: "سعيد", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { ar: "حزين", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { ar: "غاضب", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { ar: "متعب", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { ar: "خائف", fa: "ترسیده", image: "../../media/feelings/scared.webp" }
    ]
  },
  "ar-lesson18": {
    title: "درس ۱۸: فعالیت‌های روزمره",
    nextPage: "lesson18-ar.html",
    words: [
      { ar: "أكل", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { ar: "نام", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { ar: "مشى", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { ar: "قرأ", fa: "خواندن", image: "../../media/actions/read.webp" },
      { ar: "كتب", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "ar-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "lesson19-ar.html",
    words: [
      { ar: "كبير", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { ar: "صغير", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { ar: "طويل", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { ar: "قصير", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { ar: "جميل", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "ar-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "lesson20-ar.html",
    words: [
      { ar: "من", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { ar: "ما", fa: "چه", image: "../../media/questions/what.webp" },
      { ar: "أين", fa: "کجا", image: "../../media/questions/where.webp" },
      { ar: "متى", fa: "کی", image: "../../media/questions/when.webp" },
      { ar: "لماذا", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (عربی) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
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
  utter.lang = "ar-SA";
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
        <div class="word-en">${w.ar}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.ar}">
    `;
    card.addEventListener("click", () => {
      speak(w.ar);
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