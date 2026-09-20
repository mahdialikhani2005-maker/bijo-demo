// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های ژاپنی =====
const allLessons = {
  "jp-lesson1": {
    title: "درس ۱: افراد",
    nextPage: "lesson1-jp.html",
    words: [
      { jp: "男の人 (otoko no hito)", fa: "مرد", image: "../../media/people/man.webp" },
      { jp: "女の人 (onna no hito)", fa: "زن", image: "../../media/people/woman.webp" },
      { jp: "男の子 (otoko no ko)", fa: "پسر", image: "../../media/people/boy.webp" },
      { jp: "女の子 (onna no ko)", fa: "دختر", image: "../../media/people/girl.webp" },
      { jp: "赤ちゃん (akachan)", fa: "نوزاد", image: "../../media/people/baby.webp" }
    ]
  },
  "jp-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "lesson2-jp.html",
    words: [
      { jp: "頭 (atama)", fa: "سر", image: "../../media/body/head.webp" },
      { jp: "手 (te)", fa: "دست", image: "../../media/body/hand.webp" },
      { jp: "目 (me)", fa: "چشم", image: "../../media/body/eye.webp" },
      { jp: "足 (ashi)", fa: "پا", image: "../../media/body/foot.webp" },
      { jp: "鼻 (hana)", fa: "بینی", image: "../../media/body/nose.webp" }
    ]
  },
  "jp-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "lesson3-jp.html",
    words: [
      { jp: "家 (ie)", fa: "خانه", image: "../../media/house/house.webp" },
      { jp: "部屋 (heya)", fa: "اتاق", image: "../../media/house/room.webp" },
      { jp: "ドア (doa)", fa: "در", image: "../../media/house/door.webp" },
      { jp: "窓 (mado)", fa: "پنجره", image: "../../media/house/window.webp" },
      { jp: "台所 (daidokoro)", fa: "آشپزخانه", image: "../../media/house/kitchen.webp" }
    ]
  },
  "jp-lesson4": {
    title: "درس ۴: لباس‌ها",
    nextPage: "lesson4-jp.html",
    words: [
      { jp: "シャツ (shatsu)", fa: "پیراهن", image: "../../media/clothes/shirt.webp" },
      { jp: "ズボン (zubon)", fa: "شلوار", image: "../../media/clothes/pants.webp" },
      { jp: "靴 (kutsu)", fa: "کفش", image: "../../media/clothes/shoes.webp" },
      { jp: "帽子 (boushi)", fa: "کلاه", image: "../../media/clothes/hat.webp" },
      { jp: "ドレス (doresu)", fa: "لباس", image: "../../media/clothes/dress.webp" }
    ]
  },
  "jp-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "lesson5-jp.html",
    words: [
      { jp: "パン (pan)", fa: "نان", image: "../../media/food/bread.webp" },
      { jp: "ご飯 (gohan)", fa: "برنج", image: "../../media/food/rice.webp" },
      { jp: "肉 (niku)", fa: "گوشت", image: "../../media/food/meat.webp" },
      { jp: "卵 (tamago)", fa: "تخم‌مرغ", image: "../../media/food/egg.webp" },
      { jp: "牛乳 (gyuunyuu)", fa: "شیر", image: "../../media/food/milk.webp" }
    ]
  },
  "jp-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "lesson6-jp.html",
    words: [
      { jp: "りんご (ringo)", fa: "سیب", image: "../../media/fruits/apple.webp" },
      { jp: "バナナ (banana)", fa: "موز", image: "../../media/fruits/banana.webp" },
      { jp: "オレンジ (orenji)", fa: "پرتقال", image: "../../media/fruits/orange.webp" },
      { jp: "ぶどう (budou)", fa: "انگور", image: "../../media/fruits/grape.webp" },
      { jp: "すいか (suika)", fa: "هندوانه", image: "../../media/fruits/watermelon.webp" }
    ]
  },
  "jp-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "lesson7-jp.html",
    words: [
      { jp: "トマト (tomato)", fa: "گوجه‌فرنگی", image: "../../media/vegetables/tomato.webp" },
      { jp: "じゃがいも (jagaimo)", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.webp" },
      { jp: "にんじん (ninjin)", fa: "هویج", image: "../../media/vegetables/carrot.webp" },
      { jp: "たまねぎ (tamanegi)", fa: "پیاز", image: "../../media/vegetables/onion.webp" },
      { jp: "きゅうり (kyuuri)", fa: "خیار", image: "../../media/vegetables/cucumber.webp" }
    ]
  },
  "jp-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "lesson8-jp.html",
    words: [
      { jp: "犬 (inu)", fa: "سگ", image: "../../media/animals/dog.webp" },
      { jp: "猫 (neko)", fa: "گربه", image: "../../media/animals/cat.webp" },
      { jp: "鳥 (tori)", fa: "پرنده", image: "../../media/animals/bird.webp" },
      { jp: "魚 (sakana)", fa: "ماهی", image: "../../media/animals/fish.webp" },
      { jp: "馬 (uma)", fa: "اسب", image: "../../media/animals/horse.webp" }
    ]
  },
  "jp-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "lesson9-jp.html",
    words: [
      { jp: "太陽 (taiyou)", fa: "خورشید", image: "../../media/nature/sun.webp" },
      { jp: "月 (tsuki)", fa: "ماه", image: "../../media/nature/moon.webp" },
      { jp: "星 (hoshi)", fa: "ستاره", image: "../../media/nature/star.webp" },
      { jp: "空 (sora)", fa: "آسمان", image: "../../media/nature/sky.webp" },
      { jp: "雨 (ame)", fa: "باران", image: "../../media/nature/rain.webp" }
    ]
  },
  "jp-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "lesson10-jp.html",
    words: [
      { jp: "暑い (atsui)", fa: "گرم", image: "../../media/weather/hot.webp" },
      { jp: "寒い (samui)", fa: "سرد", image: "../../media/weather/cold.webp" },
      { jp: "晴れ (hare)", fa: "آفتابی", image: "../../media/weather/sunny.webp" },
      { jp: "曇り (kumori)", fa: "ابری", image: "../../media/weather/cloudy.webp" },
      { jp: "風 (kaze)", fa: "باد", image: "../../media/weather/wind.webp" }
    ]
  },
  "jp-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "lesson11-jp.html",
    words: [
      { jp: "赤 (aka)", fa: "قرمز", image: "../../media/colors/red.webp" },
      { jp: "青 (ao)", fa: "آبی", image: "../../media/colors/blue.webp" },
      { jp: "緑 (midori)", fa: "سبز", image: "../../media/colors/green.webp" },
      { jp: "黄 (ki)", fa: "زرد", image: "../../media/colors/yellow.webp" },
      { jp: "黒 (kuro)", fa: "مشکی", image: "../../media/colors/black.webp" }
    ]
  },
  "jp-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "lesson12-jp.html",
    words: [
      { jp: "一 (ichi)", fa: "یک", image: "../../media/numbers/one.webp" },
      { jp: "二 (ni)", fa: "دو", image: "../../media/numbers/two.webp" },
      { jp: "三 (san)", fa: "سه", image: "../../media/numbers/three.webp" },
      { jp: "四 (yon)", fa: "چهار", image: "../../media/numbers/four.webp" },
      { jp: "五 (go)", fa: "پنج", image: "../../media/numbers/five.webp" }
    ]
  },
  "jp-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "lesson13-jp.html",
    words: [
      { jp: "今日 (kyou)", fa: "امروز", image: "../../media/time/today.webp" },
      { jp: "明日 (ashita)", fa: "فردا", image: "../../media/time/tomorrow.webp" },
      { jp: "昨日 (kinou)", fa: "دیروز", image: "../../media/time/yesterday.webp" },
      { jp: "朝 (asa)", fa: "صبح", image: "../../media/time/morning.webp" },
      { jp: "夜 (yoru)", fa: "شب", image: "../../media/time/night.webp" }
    ]
  },
  "jp-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "lesson14-jp.html",
    words: [
      { jp: "先生 (sensei)", fa: "معلم", image: "../../media/jobs/teacher.webp" },
      { jp: "医者 (isha)", fa: "دکتر", image: "../../media/jobs/doctor.webp" },
      { jp: "エンジニア (enjinia)", fa: "مهندس", image: "../../media/jobs/engineer.webp" },
      { jp: "学生 (gakusei)", fa: "دانش‌آموز", image: "../../media/jobs/student.webp" },
      { jp: "運転手 (untenshu)", fa: "راننده", image: "../../media/jobs/driver.webp" }
    ]
  },
  "jp-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "lesson15-jp.html",
    words: [
      { jp: "車 (kuruma)", fa: "ماشین", image: "../../media/vehicles/car.webp" },
      { jp: "バス (basu)", fa: "اتوبوس", image: "../../media/vehicles/bus.webp" },
      { jp: "電車 (densha)", fa: "قطار", image: "../../media/vehicles/train.webp" },
      { jp: "飛行機 (hikouki)", fa: "هواپیما", image: "../../media/vehicles/airplane.webp" },
      { jp: "自転車 (jitensha)", fa: "دوچرخه", image: "../../media/vehicles/bicycle.webp" }
    ]
  },
  "jp-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "lesson16-jp.html",
    words: [
      { jp: "学校 (gakkou)", fa: "مدرسه", image: "../../media/places/school.webp" },
      { jp: "病院 (byouin)", fa: "بیمارستان", image: "../../media/places/hospital.webp" },
      { jp: "店 (mise)", fa: "فروشگاه", image: "../../media/places/store.webp" },
      { jp: "公園 (kouen)", fa: "پارک", image: "../../media/places/park.webp" },
      { jp: "モスク (mosuku)", fa: "مسجد", image: "../../media/places/mosque.webp" }
    ]
  },
  "jp-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "lesson17-jp.html",
    words: [
      { jp: "嬉しい (ureshii)", fa: "خوشحال", image: "../../media/feelings/happy.webp" },
      { jp: "悲しい (kanashii)", fa: "ناراحت", image: "../../media/feelings/sad.webp" },
      { jp: "怒っている (okotteiru)", fa: "عصبانی", image: "../../media/feelings/angry.webp" },
      { jp: "疲れた (tsukareta)", fa: "خسته", image: "../../media/feelings/tired.webp" },
      { jp: "怖い (kowai)", fa: "ترسیده", image: "../../media/feelings/scared.webp" }
    ]
  },
  "jp-lesson18": {
    title: "درس ۱۸: فعالیت‌های روزمره",
    nextPage: "lesson18-jp.html",
    words: [
      { jp: "食べる (taberu)", fa: "خوردن", image: "../../media/actions/eat.webp" },
      { jp: "寝る (neru)", fa: "خوابیدن", image: "../../media/actions/sleep.webp" },
      { jp: "歩く (aruku)", fa: "راه رفتن", image: "../../media/actions/walk.webp" },
      { jp: "読む (yomu)", fa: "خواندن", image: "../../media/actions/read.webp" },
      { jp: "書く (kaku)", fa: "نوشتن", image: "../../media/actions/write.webp" }
    ]
  },
  "jp-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "lesson19-jp.html",
    words: [
      { jp: "大きい (ookii)", fa: "بزرگ", image: "../../media/adjectives/big.webp" },
      { jp: "小さい (chiisai)", fa: "کوچک", image: "../../media/adjectives/small.webp" },
      { jp: "高い (takai)", fa: "بلند", image: "../../media/adjectives/tall.webp" },
      { jp: "低い (hikui)", fa: "کوتاه", image: "../../media/adjectives/short.webp" },
      { jp: "美しい (utsukushii)", fa: "زیبا", image: "../../media/adjectives/beautiful.webp" }
    ]
  },
  "jp-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "lesson20-jp.html",
    words: [
      { jp: "誰 (dare)", fa: "چه کسی", image: "../../media/questions/who.webp" },
      { jp: "何 (nani)", fa: "چه", image: "../../media/questions/what.webp" },
      { jp: "どこ (doko)", fa: "کجا", image: "../../media/questions/where.webp" },
      { jp: "いつ (itsu)", fa: "کی", image: "../../media/questions/when.webp" },
      { jp: "なぜ (naze)", fa: "چرا", image: "../../media/questions/why.webp" }
    ]
  }
};

// ===== تابع پخش صدا (ژاپنی) =====
function speak(text) {
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ja-JP",
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
  utter.lang = "ja-JP";
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
      <a href="../index-jp.html">بازگشت به صفحه اصلی</a>
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
        <div class="word-en">${w.jp}</div>
        <div class="word-fa">${w.fa}</div>
      </div>
      <img src="${w.image}" alt="${w.jp}">
    `;
    card.addEventListener("click", () => {
      // استخراج فقط بخش ژاپنی (قبل از پرانتز)
      const jpText = w.jp.replace(/\([^)]*\)/g, '').trim();
      speak(jpText);
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