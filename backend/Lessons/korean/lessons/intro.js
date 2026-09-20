// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های کرهای =====
const allLessons = {
  "ko-lesson1": {
    title: "درس ۱: افراد",
    nextPage: "lesson1-ko.html",
    words: [
      { ko: "남자 (namja)", fa: "مرد", image: "../../media/people/man.webp" },
      { ko: "여자 (yeoja)", fa: "زن", image: "../../media/people/woman.webp" },
      { ko: "소년 (sonyeon)", fa: "پسر", image: "../../media/people/boy.webp" },
      { ko: "소녀 (sonyeo)", fa: "دختر", image: "../../media/people/girl.webp" },
      { ko: "아기 (agi)", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "ko-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "lesson2-ko.html",
    words: [
      { ko: "머리 (meori)", fa: "سر", image: "../../media/body/head.webp" },
      { ko: "손 (son)", fa: "دست", image: "../../media/body/hand.webp" },
      { ko: "눈 (nun)", fa: "چشم", image: "../../media/body/eye.webp" },
      { ko: "발 (bal)", fa: "پا", image: "../../media/body/foot.webp" },
      { ko: "코 (ko)", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "ko-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "lesson3-ko.html",
    words: [
      { ko: "집 (jip)", fa: "خانه", image: "../../media/house/house.webp" },
      { ko: "방 (bang)", fa: "اتاق", image: "../../media/house/room.webp" },
      { ko: "문 (mun)", fa: "در", image: "../../media/house/door.webp" },
      { ko: "창문 (changmun)", fa: "پنجره", image: "../../media/house/window.webp" },
      { ko: "부엌 (bueok)", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "ko-lesson4": {
    title: "درس ۴: لباس‌ها",
    nextPage: "lesson4-ko.html",
    words: [
      { ko: "셔츠 (syeocheu)", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { ko: "바지 (baji)", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { ko: "신발 (sinbal)", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { ko: "모자 (moja)", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { ko: "드레스 (deureseu)", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "ko-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "lesson5-ko.html",
    words: [
      { ko: "빵 (ppang)", fa: "نان", image: "../../media/food/bread.webp" },
      { ko: "밥 (bap)", fa: "برنج", image: "../../media/food/rice.webp" },
      { ko: "고기 (gogi)", fa: "گوشت", image: "../../media/food/meat.webp" },
      { ko: "계란 (gyeran)", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { ko: "우유 (uyu)", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "ko-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "lesson6-ko.html",
    words: [
      { ko: "사과 (sagwa)", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { ko: "바나나 (banana)", fa: "موز", image: "../../media/fruits/banana.webp" },
      { ko: "오렌지 (orenji)", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { ko: "포도 (podo)", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { ko: "수박 (subak)", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "ko-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "lesson7-ko.html",
    words: [
      { ko: "토마토 (tomato)", fa: "گوجه‌فرنگی", image: "../../media/vegetables/tomato.webp" },
      { ko: "감자 (gamja)", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { ko: "당근 (danggeun)", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { ko: "양파 (yangpa)", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { ko: "오이 (oi)", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "ko-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "lesson8-ko.html",
    words: [
      { ko: "개 (gae)", fa: "سگ", image: "../../media/animals/dog.webp" },
      { ko: "고양이 (goyangi)", fa: "گربه", image: "../../media/animals/cat.webp" },
      { ko: "새 (sae)", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { ko: "물고기 (mulgogi)", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { ko: "말 (mal)", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "ko-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "lesson9-ko.html",
    words: [
      { ko: "태양 (taeyang)", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { ko: "달 (dal)", fa: "ماه", image: "../../media/nature/moon.webp" },
      { ko: "별 (byeol)", fa: "ستاره", image: "../../media/nature/star.webp" },
      { ko: "하늘 (haneul)", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { ko: "비 (bi)", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "ko-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "lesson10-ko.html",
    words: [
      { ko: "덥다 (deopda)", fa: "گرم", image: "../../media/weather/hot.webp" },
      { ko: "춥다 (chupda)", fa: "سرد", image: "../../media/weather/cold.webp" },
      { ko: "맑다 (makda)", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { ko: "흐리다 (heurida)", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { ko: "바람 (baram)", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "ko-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "lesson11-ko.html",
    words: [
      { ko: "빨간색 (ppalgansaek)", fa: "قرمز", image: "../../media/colors/red.webp" },
      { ko: "파란색 (paransaek)", fa: "آبی", image: "../../media/colors/blue.webp" },
      { ko: "초록색 (choroksaek)", fa: "سبز", image: "../../media/colors/green.webp" },
      { ko: "노란색 (noransaek)", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { ko: "검은색 (geomeunsaek)", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "ko-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "lesson12-ko.html",
    words: [
      { ko: "일 (il)", fa: "یک", image: "../../media/numbers/one.webp" },
      { ko: "이 (i)", fa: "دو", image: "../../media/numbers/two.webp" },
      { ko: "삼 (sam)", fa: "سه", image: "../../media/numbers/three.webp" },
      { ko: "사 (sa)", fa: "چهار", image: "../../media/numbers/four.webp" },
      { ko: "오 (o)", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "ko-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "lesson13-ko.html",
    words: [
      { ko: "오늘 (oneul)", fa: "امروز", image: "../../media/time/today.webp" },
      { ko: "내일 (naeil)", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { ko: "어제 (eoje)", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { ko: "아침 (achim)", fa: "صبح", image: "../../media/time/morning.webp" },
      { ko: "밤 (bam)", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "ko-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "lesson14-ko.html",
    words: [
      { ko: "선생님 (seonsaengnim)", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { ko: "의사 (uisa)", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { ko: "엔지니어 (enjinieo)", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { ko: "학생 (haksaeng)", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { ko: "운전사 (unjeonsa)", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "ko-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "lesson15-ko.html",
    words: [
      { ko: "자동차 (jadongcha)", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { ko: "버스 (beoseu)", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { ko: "기차 (gicha)", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { ko: "비행기 (bihaenggi)", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { ko: "자전거 (jajeongeo)", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "ko-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "lesson16-ko.html",
    words: [
      { ko: "학교 (hakgyo)", fa: "مدرسه", image: "../../media/places/school.webp" },
      { ko: "병원 (byeongwon)", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { ko: "가게 (gage)", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { ko: "공원 (gongwon)", fa: "پارک", image: "../../media/places/park.webp" },
      { ko: "모스크 (moseukeu)", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "ko-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "lesson17-ko.html",
    words: [
      { ko: "행복하다 (haengbokhada)", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { ko: "슬프다 (seulpeuda)", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { ko: "화나다 (hwanada)", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { ko: "피곤하다 (pigonhada)", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { ko: "무섭다 (museopda)", fa: "ترسیده", image: "../../media/feelings/scared.webp" }
    ]
  },
  "ko-lesson18": {
    title: "درس ۱۸: فعالیت‌های روزمره",
    nextPage: "lesson18-ko.html",
    words: [
      { ko: "먹다 (meokda)", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { ko: "자다 (jada)", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { ko: "걷다 (geotda)", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { ko: "읽다 (ikda)", fa: "خواندن", image: "../../media/actions/read.webp" },
      { ko: "쓰다 (sseuda)", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "ko-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "lesson19-ko.html",
    words: [
      { ko: "크다 (keuda)", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { ko: "작다 (jakda)", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { ko: "키가 크다 (kiga keuda)", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { ko: "키가 작다 (kiga jakda)", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { ko: "아름답다 (areumdapda)", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "ko-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "lesson20-ko.html",
    words: [
      { ko: "누구 (nugu)", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { ko: "무엇 (mueot)", fa: "چه", image: "../../media/questions/what.webp" },
      { ko: "어디 (eodi)", fa: "کجا", image: "../../media/questions/where.webp" },
      { ko: "언제 (eonje)", fa: "کی", image: "../../media/questions/when.webp" },
      { ko: "왜 (wae)", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (کرهای) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ko-KR",
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
  utter.lang = "ko-KR";
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
      <a href="../index-ko.html">بازگشت به صفحه اصلی</a>
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
        <div class="word-en">${w.ko}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.ko}">
    `;
    card.addEventListener("click", () => {
      // استخراج فقط بخش کرهای (قبل از پرانتز)
      const koText = w.ko.replace(/\([^)]*\)/g, '').trim();
      speak(koText);
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