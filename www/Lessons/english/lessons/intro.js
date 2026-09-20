// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های انگلیسی =====
const allLessons = {
  "en-lesson1": {
    title: "Lesson 1: People",
    nextPage: "lesson1.html",
    words: [
      { en: "man", fa: "مرد", image: "../../media/people/man.webp" },
      { en: "woman", fa: "زن", image: "../../media/people/woman.webp" },
      { en: "boy", fa: "پسر", image: "../../media/people/boy.webp" },
      { en: "girl", fa: "دختر", image: "../../media/people/girl.webp" },
      { en: "baby", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "en-lesson2": {
    title: "Lesson 2: Body Parts",
    nextPage: "lesson2.html",
    words: [
      { en: "head", fa: "سر", image: "../../media/body/head.webp" },
      { en: "hand", fa: "دست", image: "../../media/body/hand.webp" },
      { en: "eye", fa: "چشم", image: "../../media/body/eye.webp" },
      { en: "foot", fa: "پا", image: "../../media/body/foot.webp" },
      { en: "nose", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "en-lesson3": {
    title: "Lesson 3: House",
    nextPage: "lesson3.html",
    words: [
      { en: "house", fa: "خانه", image: "../../media/house/house.webp" },
      { en: "room", fa: "اتاق", image: "../../media/house/room.webp" },
      { en: "door", fa: "در", image: "../../media/house/door.webp" },
      { en: "window", fa: "پنجره", image: "../../media/house/window.webp" },
      { en: "kitchen", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "en-lesson4": {
    title: "Lesson 4: Clothes",
    nextPage: "lesson4.html",
    words: [
      { en: "shirt", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { en: "pants", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { en: "shoes", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { en: "hat", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { en: "dress", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "en-lesson5": {
    title: "Lesson 5: Food",
    nextPage: "lesson5.html",
    words: [
      { en: "bread", fa: "نان", image: "../../media/food/bread.webp" },
      { en: "rice", fa: "برنج", image: "../../media/food/rice.webp" },
      { en: "meat", fa: "گوشت", image: "../../media/food/meat.webp" },
      { en: "egg", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { en: "milk", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "en-lesson6": {
    title: "Lesson 6: Fruits",
    nextPage: "lesson6.html",
    words: [
      { en: "apple", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { en: "banana", fa: "موز", image: "../../media/fruits/banana.webp" },
      { en: "orange", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { en: "grape", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { en: "watermelon", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "en-lesson7": {
    title: "Lesson 7: Vegetables",
    nextPage: "lesson7.html",
    words: [
      { en: "tomato", fa: "گوجه", image: "../../media/vegetables/tomato.webp" },
      { en: "potato", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { en: "carrot", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { en: "onion", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { en: "cucumber", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "en-lesson8": {
    title: "Lesson 8: Animals",
    nextPage: "lesson8.html",
    words: [
      { en: "dog", fa: "سگ", image: "../../media/animals/dog.webp" },
      { en: "cat", fa: "گربه", image: "../../media/animals/cat.webp" },
      { en: "bird", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { en: "fish", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { en: "horse", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "en-lesson9": {
    title: "Lesson 9: Nature",
    nextPage: "lesson9.html",
    words: [
      { en: "sun", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { en: "moon", fa: "ماه", image: "../../media/nature/moon.webp" },
      { en: "star", fa: "ستاره", image: "../../media/nature/star.webp" },
      { en: "sky", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { en: "rain", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "en-lesson10": {
    title: "Lesson 10: Weather",
    nextPage: "lesson10.html",
    words: [
      { en: "hot", fa: "گرم", image: "../../media/weather/hot.webp" },
      { en: "cold", fa: "سرد", image: "../../media/weather/cold.webp" },
      { en: "sunny", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { en: "cloudy", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { en: "wind", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "en-lesson11": {
    title: "Lesson 11: Colors",
    nextPage: "lesson11.html",
    words: [
      { en: "red", fa: "قرمز", image: "../../media/colors/red.webp" },
      { en: "blue", fa: "آبی", image: "../../media/colors/blue.webp" },
      { en: "green", fa: "سبز", image: "../../media/colors/green.webp" },
      { en: "yellow", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { en: "black", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "en-lesson12": {
    title: "Lesson 12: Numbers",
    nextPage: "lesson12.html",
    words: [
      { en: "one", fa: "یک", image: "../../media/numbers/one.webp" },
      { en: "two", fa: "دو", image: "../../media/numbers/two.webp" },
      { en: "three", fa: "سه", image: "../../media/numbers/three.webp" },
      { en: "four", fa: "چهار", image: "../../media/numbers/four.webp" },
      { en: "five", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "en-lesson13": {
    title: "Lesson 13: Time",
    nextPage: "lesson13.html",
    words: [
      { en: "today", fa: "امروز", image: "../../media/time/today.webp" },
      { en: "tomorrow", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { en: "yesterday", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { en: "morning", fa: "صبح", image: "../../media/time/morning.webp" },
      { en: "night", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "en-lesson14": {
    title: "Lesson 14: Jobs",
    nextPage: "lesson14.html",
    words: [
      { en: "teacher", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { en: "doctor", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { en: "engineer", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { en: "student", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { en: "driver", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "en-lesson15": {
    title: "Lesson 15: Vehicles",
    nextPage: "lesson15.html",
    words: [
      { en: "car", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { en: "bus", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { en: "train", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { en: "airplane", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { en: "bicycle", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "en-lesson16": {
    title: "Lesson 16: Places",
    nextPage: "lesson16.html",
    words: [
      { en: "school", fa: "مدرسه", image: "../../media/places/school.webp" },
      { en: "hospital", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { en: "store", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { en: "park", fa: "پارک", image: "../../media/places/park.webp" },
      { en: "mosque", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "en-lesson17": {
    title: "Lesson 17: Feelings",
    nextPage: "lesson17.html",
    words: [
      { en: "happy", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { en: "sad", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { en: "angry", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { en: "tired", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { en: "hungry", fa: "گرسنه", image: "../../media/feelings/hungry.webp" }
    ]
  },
  "en-lesson18": {
    title: "Lesson 18: Daily Activities",
    nextPage: "lesson18.html",
    words: [
      { en: "eat", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { en: "sleep", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { en: "walk", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { en: "read", fa: "خواندن", image: "../../media/actions/read.webp" },
      { en: "write", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "en-lesson19": {
    title: "Lesson 19: Adjectives",
    nextPage: "lesson19.html",
    words: [
      { en: "big", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { en: "small", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { en: "tall", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { en: "short", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { en: "beautiful", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "en-lesson20": {
    title: "Lesson 20: Questions",
    nextPage: "lesson20.html",
    words: [
      { en: "who", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { en: "what", fa: "چه", image: "../../media/questions/what.webp" },
      { en: "where", fa: "کجا", image: "../../media/questions/where.webp" },
      { en: "when", fa: "کی", image: "../../media/questions/when.webp" },
      { en: "why", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (انگلیسی) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "en-US",
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
  utter.lang = "en-US";
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
      <h2>❌ Lesson not found!</h2>
      <p>Please enter from the main page.</p>
      <a href="../index.html">Back to main page</a>
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