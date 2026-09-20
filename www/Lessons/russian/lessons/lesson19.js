let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ru-RU",
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
  utter.lang = "ru-RU";
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

/* IMAGE - صفت‌ها */

{
type:"image",
question:"Большой کدام است؟",
speak:"большой",
options:[
{text:"маленький",image:"../../media/adjectives/small.webp"},
{text:"большой",image:"../../media/adjectives/big.webp"},
{text:"высокий",image:"../../media/adjectives/tall.webp"},
{text:"короткий",image:"../../media/adjectives/short.webp"}
],
answer:"большой"
},

{
type:"image",
question:"Маленький کدام است؟",
speak:"маленький",
options:[
{text:"красивый",image:"../../media/adjectives/beautiful.webp"},
{text:"маленький",image:"../../media/adjectives/small.webp"},
{text:"большой",image:"../../media/adjectives/big.webp"},
{text:"высокий",image:"../../media/adjectives/tall.webp"}
],
answer:"маленький"
},

{
type:"image",
question:"Высокий کدام است؟",
speak:"высокий",
options:[
{text:"большой",image:"../../media/adjectives/big.webp"},
{text:"высокий",image:"../../media/adjectives/tall.webp"},
{text:"красивый",image:"../../media/adjectives/beautiful.webp"},
{text:"маленький",image:"../../media/adjectives/small.webp"}
],
answer:"высокий"
},

{
type:"image",
question:"Короткий کدام است؟",
speak:"короткий",
options:[
{text:"высокий",image:"../../media/adjectives/tall.webp"},
{text:"маленький",image:"../../media/adjectives/small.webp"},
{text:"короткий",image:"../../media/adjectives/short.webp"},
{text:"большой",image:"../../media/adjectives/big.webp"}
],
answer:"короткий"
},

{
type:"image",
question:"Красивый کدام است؟",
speak:"красивый",
options:[
{text:"короткий",image:"../../media/adjectives/short.webp"},
{text:"большой",image:"../../media/adjectives/big.webp"},
{text:"маленький",image:"../../media/adjectives/small.webp"},
{text:"красивый",image:"../../media/adjectives/beautiful.webp"}
],
answer:"красивый"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/big.webp",
options:["маленький","большой","высокий","короткий"],
answer:"большой"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/small.webp",
options:["красивый","маленький","большой","высокий"],
answer:"маленький"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/tall.webp",
options:["большой","высокий","красивый","маленький"],
answer:"высокий"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/short.webp",
options:["высокий","маленький","короткий","большой"],
answer:"короткий"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/beautiful.webp",
options:["короткий","большой","маленький","красивый"],
answer:"красивый"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"большой",
question:"کدام کلمه را شنیدی؟",
options:["маленький","большой","высокий","короткий"],
answer:"большой"
},

{
type:"audio",
speak:"маленький",
question:"کدام کلمه را شنیدی؟",
options:["красивый","маленький","большой","высокий"],
answer:"маленький"
},

{
type:"audio",
speak:"высокий",
question:"کدام کلمه را شنیدی؟",
options:["большой","высокий","красивый","маленький"],
answer:"высокий"
},

{
type:"audio",
speak:"короткий",
question:"کدام کلمه را شنیدی؟",
options:["высокий","маленький","короткий","большой"],
answer:"короткий"
},

{
type:"audio",
speak:"красивый",
question:"کدام کلمه را شنیدی؟",
options:["короткий","большой","маленький","красивый"],
answer:"красивый"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Собака большая",
question:"جمله روسی را بساز:",
text:"سگ بزرگ است",
words:["Собака","большая"],
answer:["Собака","большая"]
},

{
type:"build-ru",
speak:"Кошка маленькая",
question:"جمله روسی را بساز:",
text:"گربه کوچک است",
words:["Кошка","маленькая"],
answer:["Кошка","маленькая"]
},

{
type:"build-ru",
speak:"Он высокий",
question:"جمله روسی را بساز:",
text:"او بلند است",
words:["Он","высокий"],
answer:["Он","высокий"]
},

{
type:"build-ru",
speak:"Она короткая",
question:"جمله روسی را بساز:",
text:"او کوتاه است",
words:["Она","короткая"],
answer:["Она","короткая"]
},

{
type:"build-ru",
speak:"Цветок красивый",
question:"جمله روسی را بساز:",
text:"گل زیبا است",
words:["Цветок","красивый"],
answer:["Цветок","красивый"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Собака большая",
question:"ترجمه را بساز:",
text:"Собака большая",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"Кошка маленькая",
question:"ترجمه را بساز:",
text:"Кошка маленькая",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"Он высокий",
question:"ترجمه را بساز:",
text:"Он высокий",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"Она короткая",
question:"ترجمه را بساز:",
text:"Она короткая",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"Цветок красивый",
question:"ترجمه را بساز:",
text:"Цветок красивый",
words:["است","زیبا","گل"],
answer:["گل","زیبا","است"]
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

  // BUILD RUSSIAN / FA

  else if (q.type === "build-ru" || q.type === "build-fa") {
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

  if (q.type === "build-ru") {
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

  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
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