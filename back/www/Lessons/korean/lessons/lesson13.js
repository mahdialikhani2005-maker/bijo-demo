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
question:"오늘 (oneul) کدام است؟",
speak:"오늘",
options:[
{text:"내일 (naeil)",image:"../../media/time/tomorrow.webp"},
{text:"오늘 (oneul)",image:"../../media/time/today.webp"},
{text:"어제 (eoje)",image:"../../media/time/yesterday.webp"},
{text:"아침 (achim)",image:"../../media/time/morning.webp"}
],
answer:"오늘 (oneul)"
},

{
type:"image",
question:"내일 (naeil) کدام است؟",
speak:"내일",
options:[
{text:"밤 (bam)",image:"../../media/time/night.webp"},
{text:"내일 (naeil)",image:"../../media/time/tomorrow.webp"},
{text:"오늘 (oneul)",image:"../../media/time/today.webp"},
{text:"어제 (eoje)",image:"../../media/time/yesterday.webp"}
],
answer:"내일 (naeil)"
},

{
type:"image",
question:"어제 (eoje) کدام است؟",
speak:"어제",
options:[
{text:"오늘 (oneul)",image:"../../media/time/today.webp"},
{text:"어제 (eoje)",image:"../../media/time/yesterday.webp"},
{text:"밤 (bam)",image:"../../media/time/night.webp"},
{text:"내일 (naeil)",image:"../../media/time/tomorrow.webp"}
],
answer:"어제 (eoje)"
},

{
type:"image",
question:"아침 (achim) کدام است؟",
speak:"아침",
options:[
{text:"어제 (eoje)",image:"../../media/time/yesterday.webp"},
{text:"내일 (naeil)",image:"../../media/time/tomorrow.webp"},
{text:"아침 (achim)",image:"../../media/time/morning.webp"},
{text:"오늘 (oneul)",image:"../../media/time/today.webp"}
],
answer:"아침 (achim)"
},

{
type:"image",
question:"밤 (bam) کدام است؟",
speak:"밤",
options:[
{text:"아침 (achim)",image:"../../media/time/morning.webp"},
{text:"오늘 (oneul)",image:"../../media/time/today.webp"},
{text:"내일 (naeil)",image:"../../media/time/tomorrow.webp"},
{text:"밤 (bam)",image:"../../media/time/night.webp"}
],
answer:"밤 (bam)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["내일","오늘","어제","아침"],
answer:"오늘"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["밤","내일","오늘","어제"],
answer:"내일"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["오늘","어제","밤","내일"],
answer:"어제"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["어제","내일","아침","오늘"],
answer:"아침"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["아침","오늘","내일","밤"],
answer:"밤"
},

/* AUDIO */

{
type:"audio",
speak:"오늘",
question:"کدام کلمه را شنیدی؟",
options:["내일","오늘","어제","아침"],
answer:"오늘"
},

{
type:"audio",
speak:"내일",
question:"کدام کلمه را شنیدی؟",
options:["밤","내일","오늘","어제"],
answer:"내일"
},

{
type:"audio",
speak:"어제",
question:"کدام کلمه را شنیدی؟",
options:["오늘","어제","밤","내일"],
answer:"어제"
},

{
type:"audio",
speak:"아침",
question:"کدام کلمه را شنیدی؟",
options:["어제","내일","아침","오늘"],
answer:"아침"
},

{
type:"audio",
speak:"밤",
question:"کدام کلمه را شنیدی؟",
options:["아침","오늘","내일","밤"],
answer:"밤"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"오늘은 덥습니다",
question:"جمله کرهای را بساز:",
text:"امروز هوا گرم است",
words:["오늘은","덥","습니다"],
answer:["오늘은","덥","습니다"]
},

{
type:"build-ko",
speak:"내일은 춥습니다",
question:"جمله کرهای را بساز:",
text:"فردا هوا سرد است",
words:["내일은","춥","습니다"],
answer:["내일은","춥","습니다"]
},

{
type:"build-ko",
speak:"어제는 맑았습니다",
question:"جمله کرهای را بساز:",
text:"دیروز هوا آفتابی بود",
words:["어제는","맑았","습니다"],
answer:["어제는","맑았","습니다"]
},

{
type:"build-ko",
speak:"안녕하세요",
question:"جمله کرهای را بساز:",
text:"صبح بخیر / سلام",
words:["안녕하세요"],
answer:["안녕하세요"]
},

{
type:"build-ko",
speak:"안녕히 주무세요",
question:"جمله کرهای را بساز:",
text:"شب بخیر",
words:["안녕히","주무세요"],
answer:["안녕히","주무세요"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"오늘은 덥습니다",
question:"ترجمه را بساز:",
text:"오늘은 덥습니다",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"내일은 춥습니다",
question:"ترجمه را بساز:",
text:"내일은 춥습니다",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"어제는 맑았습니다",
question:"ترجمه را بساز:",
text:"어제는 맑았습니다",
words:["بود","آفتابی","دیروز","هوا"],
answer:["دیروز","هوا","آفتابی","بود"]
},

{
type:"build-fa",
speak:"안녕하세요",
question:"ترجمه را بساز:",
text:"안녕하세요",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"안녕히 주무세요",
question:"ترجمه را بساز:",
text:"안녕히 주무세요",
words:["بخیر","شب"],
answer:["شب","بخیر"]
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