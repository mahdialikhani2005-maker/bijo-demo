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
question:"태양 (taeyang) کدام است؟",
speak:"태양",
options:[
{text:"달 (dal)",image:"../../media/nature/moon.webp"},
{text:"태양 (taeyang)",image:"../../media/nature/sun.webp"},
{text:"별 (byeol)",image:"../../media/nature/star.webp"},
{text:"하늘 (haneul)",image:"../../media/nature/sky.webp"}
],
answer:"태양 (taeyang)"
},

{
type:"image",
question:"달 (dal) کدام است؟",
speak:"달",
options:[
{text:"별 (byeol)",image:"../../media/nature/star.webp"},
{text:"달 (dal)",image:"../../media/nature/moon.webp"},
{text:"비 (bi)",image:"../../media/nature/rain.webp"},
{text:"태양 (taeyang)",image:"../../media/nature/sun.webp"}
],
answer:"달 (dal)"
},

{
type:"image",
question:"별 (byeol) کدام است؟",
speak:"별",
options:[
{text:"태양 (taeyang)",image:"../../media/nature/sun.webp"},
{text:"별 (byeol)",image:"../../media/nature/star.webp"},
{text:"비 (bi)",image:"../../media/nature/rain.webp"},
{text:"달 (dal)",image:"../../media/nature/moon.webp"}
],
answer:"별 (byeol)"
},

{
type:"image",
question:"하늘 (haneul) کدام است؟",
speak:"하늘",
options:[
{text:"별 (byeol)",image:"../../media/nature/star.webp"},
{text:"달 (dal)",image:"../../media/nature/moon.webp"},
{text:"하늘 (haneul)",image:"../../media/nature/sky.webp"},
{text:"태양 (taeyang)",image:"../../media/nature/sun.webp"}
],
answer:"하늘 (haneul)"
},

{
type:"image",
question:"비 (bi) کدام است؟",
speak:"비",
options:[
{text:"하늘 (haneul)",image:"../../media/nature/sky.webp"},
{text:"태양 (taeyang)",image:"../../media/nature/sun.webp"},
{text:"달 (dal)",image:"../../media/nature/moon.webp"},
{text:"비 (bi)",image:"../../media/nature/rain.webp"}
],
answer:"비 (bi)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["달","태양","별","하늘"],
answer:"태양"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["별","달","비","태양"],
answer:"달"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["태양","별","비","달"],
answer:"별"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["별","달","하늘","태양"],
answer:"하늘"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["하늘","태양","달","비"],
answer:"비"
},

/* AUDIO */

{
type:"audio",
speak:"태양",
question:"کدام کلمه را شنیدی؟",
options:["달","태양","별","하늘"],
answer:"태양"
},

{
type:"audio",
speak:"달",
question:"کدام کلمه را شنیدی؟",
options:["별","달","비","태양"],
answer:"달"
},

{
type:"audio",
speak:"별",
question:"کدام کلمه را شنیدی؟",
options:["태양","별","비","달"],
answer:"별"
},

{
type:"audio",
speak:"하늘",
question:"کدام کلمه را شنیدی؟",
options:["별","달","하늘","태양"],
answer:"하늘"
},

{
type:"audio",
speak:"비",
question:"کدام کلمه را شنیدی؟",
options:["하늘","태양","달","비"],
answer:"비"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 태양을 봅니다",
question:"جمله کرهای را بساز:",
text:"من خورشید را می‌بینم",
words:["저는","태양을","봅니다"],
answer:["저는","태양을","봅니다"]
},

{
type:"build-ko",
speak:"달은 큽니다",
question:"جمله کرهای را بساز:",
text:"ماه بزرگ است",
words:["달은","큽니다"],
answer:["달은","큽니다"]
},

{
type:"build-ko",
speak:"별은 작습니다",
question:"جمله کرهای را بساز:",
text:"ستاره کوچک است",
words:["별은","작습니다"],
answer:["별은","작습니다"]
},

{
type:"build-ko",
speak:"하늘은 파랗습니다",
question:"جمله کرهای را بساز:",
text:"آسمان آبی است",
words:["하늘은","파랗습니다"],
answer:["하늘은","파랗습니다"]
},

{
type:"build-ko",
speak:"저는 비를 좋아합니다",
question:"جمله کرهای را بساز:",
text:"من باران را دوست دارم",
words:["저는","비를","좋아합니다"],
answer:["저는","비를","좋아합니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 태양을 봅니다",
question:"ترجمه را بساز:",
text:"저는 태양을 봅니다",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"달은 큽니다",
question:"ترجمه را بساز:",
text:"달은 큽니다",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"별은 작습니다",
question:"ترجمه را بساز:",
text:"별은 작습니다",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"하늘은 파랗습니다",
question:"ترجمه را بساز:",
text:"하늘은 파랗습니다",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"저는 비를 좋아합니다",
question:"ترجمه را بساز:",
text:"저는 비를 좋아합니다",
words:["دارم","دوست","باران","را","من"],
answer:["من","باران","را","دوست","دارم"]
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