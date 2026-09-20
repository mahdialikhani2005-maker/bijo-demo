let current = 0;
let xp = 0;

function speak(text){
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

  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = 0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

window.onload = async function() {
  // قبل از هر چیز، اطلاعات واقعی کاربر (قلب، XP) رو از سرور می‌گیریم
  if (typeof initUserData === "function") {
    try {
      await initUserData();
    } catch (err) {
      console.warn("گرفتن اطلاعات کاربر ناموفق بود:", err);
    }
  }

  updateHeartDisplay();

  if (typeof getHearts === "function" && getHearts() <= 0) {
    alert("قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.");
    window.location.href = "../home.html";
    return;
  }

  showQuestion();
};

function updateHeartDisplay() {
  const heartElement = document.getElementById("heart-count");
  if (heartElement && typeof getHearts === "function") {
    heartElement.textContent = getHearts();
  }
}

const questions = [

/* IMAGE */

{
type:"image",
question:"학교 (hakgyo) کدام است؟",
speak:"학교",
options:[
{text:"병원 (byeongwon)",image:"../../media/places/hospital.webp"},
{text:"학교 (hakgyo)",image:"../../media/places/school.webp"},
{text:"가게 (gage)",image:"../../media/places/store.webp"},
{text:"공원 (gongwon)",image:"../../media/places/park.webp"}
],
answer:"학교 (hakgyo)"
},

{
type:"image",
question:"병원 (byeongwon) کدام است؟",
speak:"병원",
options:[
{text:"공원 (gongwon)",image:"../../media/places/park.webp"},
{text:"병원 (byeongwon)",image:"../../media/places/hospital.webp"},
{text:"모스크 (moseukeu)",image:"../../media/places/mosque.webp"},
{text:"학교 (hakgyo)",image:"../../media/places/school.webp"}
],
answer:"병원 (byeongwon)"
},

{
type:"image",
question:"가게 (gage) کدام است؟",
speak:"가게",
options:[
{text:"학교 (hakgyo)",image:"../../media/places/school.webp"},
{text:"가게 (gage)",image:"../../media/places/store.webp"},
{text:"모스크 (moseukeu)",image:"../../media/places/mosque.webp"},
{text:"병원 (byeongwon)",image:"../../media/places/hospital.webp"}
],
answer:"가게 (gage)"
},

{
type:"image",
question:"공원 (gongwon) کدام است؟",
speak:"공원",
options:[
{text:"가게 (gage)",image:"../../media/places/store.webp"},
{text:"병원 (byeongwon)",image:"../../media/places/hospital.webp"},
{text:"공원 (gongwon)",image:"../../media/places/park.webp"},
{text:"학교 (hakgyo)",image:"../../media/places/school.webp"}
],
answer:"공원 (gongwon)"
},

{
type:"image",
question:"모스크 (moseukeu) کدام است؟",
speak:"모스크",
options:[
{text:"공원 (gongwon)",image:"../../media/places/park.webp"},
{text:"학교 (hakgyo)",image:"../../media/places/school.webp"},
{text:"병원 (byeongwon)",image:"../../media/places/hospital.webp"},
{text:"모스크 (moseukeu)",image:"../../media/places/mosque.webp"}
],
answer:"모스크 (moseukeu)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["병원","학교","가게","공원"],
answer:"학교"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["공원","병원","모스크","학교"],
answer:"병원"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["학교","가게","모스크","병원"],
answer:"가게"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["가게","병원","공원","학교"],
answer:"공원"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["공원","학교","병원","모스크"],
answer:"모스크"
},

/* AUDIO */

{
type:"audio",
speak:"학교",
question:"کدام کلمه را شنیدی؟",
options:["병원","학교","가게","공원"],
answer:"학교"
},

{
type:"audio",
speak:"병원",
question:"کدام کلمه را شنیدی؟",
options:["공원","병원","모스크","학교"],
answer:"병원"
},

{
type:"audio",
speak:"가게",
question:"کدام کلمه را شنیدی؟",
options:["학교","가게","모스크","병원"],
answer:"가게"
},

{
type:"audio",
speak:"공원",
question:"کدام کلمه را شنیدی؟",
options:["가게","병원","공원","학교"],
answer:"공원"
},

{
type:"audio",
speak:"모스크",
question:"کدام کلمه را شنیدی؟",
options:["공원","학교","병원","모스크"],
answer:"모스크"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"이것은 학교입니다",
question:"جمله کرهای را بساز:",
text:"این یک مدرسه است",
words:["이것은","학교","입니다"],
answer:["이것은","학교","입니다"]
},

{
type:"build-ko",
speak:"저는 병원에 갑니다",
question:"جمله کرهای را بساز:",
text:"من به بیمارستان می‌روم",
words:["저는","병원에","갑니다"],
answer:["저는","병원에","갑니다"]
},

{
type:"build-ko",
speak:"그녀는 가게에 있습니다",
question:"جمله کرهای را بساز:",
text:"او در فروشگاه است",
words:["그녀는","가게에","있습니다"],
answer:["그녀는","가게에","있습니다"]
},

{
type:"build-ko",
speak:"우리는 공원에 있습니다",
question:"جمله کرهای را بساز:",
text:"ما در پارک هستیم",
words:["우리는","공원에","있습니다"],
answer:["우리는","공원에","있습니다"]
},

{
type:"build-ko",
speak:"그는 모스크에 갑니다",
question:"جمله کرهای را بساز:",
text:"او به مسجد می‌رود",
words:["그는","모스크에","갑니다"],
answer:["그는","모스크에","갑니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"이것은 학교입니다",
question:"ترجمه را بساز:",
text:"이것은 학교입니다",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"저는 병원에 갑니다",
question:"ترجمه را بساز:",
text:"저는 병원에 갑니다",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"그녀는 가게에 있습니다",
question:"ترجمه را بساز:",
text:"그녀는 가게에 있습니다",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"우리는 공원에 있습니다",
question:"ترجمه را بساز:",
text:"우리는 공원에 있습니다",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"그는 모스크에 갑니다",
question:"ترجمه را بساز:",
text:"그는 모스크에 갑니다",
words:["می‌رود","به","مسجد","او"],
answer:["او","به","مسجد","می‌رود"]
}

];


// =====================================
// نمایش سوال
// =====================================

function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === "function" ? getTotalXP() : xp;

    document.getElementById("app").innerHTML = `
      <h2>درس تمام شد 🎉</h2>
      <p>XP دریافت‌شده: <b>${finalXP}</b></p>
      <a href="../index.html">بازگشت</a>
    `;
    return;
  }


  const q = questions[current];
  if (q.speak) {
  setTimeout(() => {
    speak(q.speak);
  }, 200);
}

  const title = document.getElementById("question-title");
  const content = document.getElementById("question-content");
  const optionsBox = document.getElementById("options");
  const wordBuilder = document.getElementById("word-builder");
  const repeatBtn = document.getElementById("repeat-audio-btn");

  if (repeatBtn) {
    if (q.speak) {
      repeatBtn.style.display = "inline-block";
      repeatBtn.onclick = () => speak(q.speak);
    } else {
      repeatBtn.style.display = "none";
      repeatBtn.onclick = null;
    }
  }

  title.innerText = q.question;
  content.innerHTML = "";
  optionsBox.innerHTML = "";
  wordBuilder.innerHTML = "";
wordBuilder.classList.add("hidden");

  // IMAGE SELECTION
if (q.type === "image") {
  optionsBox.classList.add("image-grid");

 shuffleArray(q.options).forEach(opt => {

    let btn = document.createElement("button");
    btn.className = "option image-option";
    btn.innerHTML = `
      <img src="${opt.image}" alt="${opt.text}">
    `;
    btn.onclick = () => select(opt.text);
    optionsBox.appendChild(btn);
  });
}


  // WORD FROM IMAGE
  if (q.type === "word") {
    content.innerHTML = `<img src="${q.image}">`;
shuffleArray(q.options).forEach(opt => {

      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // AUDIO
  if (q.type === "audio") {
    content.innerHTML = "";

shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // BUILD KOREAN / FA

  else if (q.type === "build-ko" || q.type === "build-fa") {
  content.innerHTML = `<p>${q.text}</p>`;

  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");
  if (!wordBuilder || !optionsBox) return;

  // پاک کردن محتوای قبلی
  wordBuilder.innerHTML = "";
  optionsBox.innerHTML = "";
 wordBuilder.classList.remove("hidden");
  // تنظیم جهت
  wordBuilder.classList.remove("ltr", "rtl");
  optionsBox.classList.remove("ltr", "rtl");

  if (q.type === "build-ko") {
    wordBuilder.classList.add("ltr");
    optionsBox.classList.add("ltr");
  } else {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
  }

shuffleArray(q.words).forEach(w => {

    const tile = document.createElement("span");
    tile.className = "tile";
    tile.innerText = w;
    tile.dataset.word = w;

    // کلیک اول: انتقال از options به word-builder
    tile.onclick = () => {
  // اگر کارت در گزینه‌هاست → بفرستش داخل builder
  if (tile.parentNode === optionsBox) {
    wordBuilder.appendChild(tile);

  // اگر کارت داخل builder بود → برگردونش به گزینه‌ها
  } else if (tile.parentNode === wordBuilder) {
    optionsBox.appendChild(tile);
  }

  // بررسی کامل بودن جواب
  const userWords = [...wordBuilder.children].map(el => el.dataset.word);
  if (userWords.length === q.answer.length) {
    checkBuild(userWords, q.answer);
  }
};


    optionsBox.appendChild(tile);
  });
}

async function safeAddXP(amount) {
  try {
    if (typeof addXP === "function") {
      await addXP(amount);
    }
  } catch (err) {
    console.warn("ثبت XP رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function safeLoseHeart() {
  try {
    if (typeof loseHeart === "function") {
      await loseHeart();
    }
  } catch (err) {
    console.warn("کم کردن قلب رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;

    await safeAddXP(5);

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    await safeLoseHeart();

    updateHeartDisplay();

    if (typeof getHearts === "function" && getHearts() <= 0) {
      document.getElementById("app").innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../home.html">بازگشت</a>
      `;
      return;
    }
  }
}


async function select(ans) {
  const correct = questions[current].answer;

  if (String(ans).trim() === String(correct).trim()) {
    xp += 5;

    await safeAddXP(5);

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    await safeLoseHeart();

    updateHeartDisplay();

    if (typeof getHearts === "function" && getHearts() <= 0) {
      document.getElementById("app").innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../home.html">بازگشت</a>
      `;
      return;
    }
  }
}



  // اگر بعداً آرایه‌ی selected هم ساختی، اینجا باید از آن هم حذف شود
}
function removeLastBuilderItem() {
  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");

  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;

  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) {
    optionsBox.prepend(lastItem);
  }
}

// Word Builder Keyboard Control

document.addEventListener("keydown", function (e) {
  const wordBuilder = document.getElementById("word-builder");
  if (!wordBuilder) return;

  //if (document.activeElement !== wordBuilder) return;

  if (e.key === "Backspace") {
    e.preventDefault();
    removeLastBuilderItem();
  }
});

function returnTileToOptions(tile) {
  const optionsBox = document.getElementById("options");
  if (!optionsBox || !tile) return;

  optionsBox.appendChild(tile);
  tile.classList.remove("selected");

  if (tile.returnFunction) {
    tile.removeEventListener("click", tile.returnFunction);
    delete tile.returnFunction;
  }
}


function shuffleArray(arr) {
  let array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}