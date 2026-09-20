let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "de-DE",
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
  utter.lang = "de-DE";
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
question:"der Apfel کدام است؟",
speak:"der Apfel",
options:[
{text:"die Banane",image:"../../media/fruits/banana.webp"},
{text:"der Apfel",image:"../../media/fruits/apple.webp"},
{text:"die Orange",image:"../../media/fruits/orange.webp"},
{text:"die Traube",image:"../../media/fruits/grape.webp"}
],
answer:"der Apfel"
},

{
type:"image",
question:"die Banane کدام است؟",
speak:"die Banane",
options:[
{text:"die Traube",image:"../../media/fruits/grape.webp"},
{text:"die Banane",image:"../../media/fruits/banana.webp"},
{text:"die Wassermelone",image:"../../media/fruits/watermelon.webp"},
{text:"der Apfel",image:"../../media/fruits/apple.webp"}
],
answer:"die Banane"
},

{
type:"image",
question:"die Orange کدام است؟",
speak:"die Orange",
options:[
{text:"der Apfel",image:"../../media/fruits/apple.webp"},
{text:"die Orange",image:"../../media/fruits/orange.webp"},
{text:"die Wassermelone",image:"../../media/fruits/watermelon.webp"},
{text:"die Banane",image:"../../media/fruits/banana.webp"}
],
answer:"die Orange"
},

{
type:"image",
question:"die Traube کدام است؟",
speak:"die Traube",
options:[
{text:"die Orange",image:"../../media/fruits/orange.webp"},
{text:"die Banane",image:"../../media/fruits/banana.webp"},
{text:"die Traube",image:"../../media/fruits/grape.webp"},
{text:"der Apfel",image:"../../media/fruits/apple.webp"}
],
answer:"die Traube"
},

{
type:"image",
question:"die Wassermelone کدام است؟",
speak:"die Wassermelone",
options:[
{text:"die Traube",image:"../../media/fruits/grape.webp"},
{text:"der Apfel",image:"../../media/fruits/apple.webp"},
{text:"die Banane",image:"../../media/fruits/banana.webp"},
{text:"die Wassermelone",image:"../../media/fruits/watermelon.webp"}
],
answer:"die Wassermelone"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/apple.webp",
options:["die Banane","der Apfel","die Orange","die Traube"],
answer:"der Apfel"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/banana.webp",
options:["die Traube","die Banane","die Wassermelone","der Apfel"],
answer:"die Banane"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/orange.webp",
options:["der Apfel","die Orange","die Wassermelone","die Banane"],
answer:"die Orange"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/grape.webp",
options:["die Orange","die Banane","die Traube","der Apfel"],
answer:"die Traube"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/watermelon.webp",
options:["die Traube","der Apfel","die Banane","die Wassermelone"],
answer:"die Wassermelone"
},

/* AUDIO */

{
type:"audio",
speak:"der Apfel",
question:"کدام کلمه را شنیدی؟",
options:["die Banane","der Apfel","die Orange","die Traube"],
answer:"der Apfel"
},

{
type:"audio",
speak:"die Banane",
question:"کدام کلمه را شنیدی؟",
options:["die Traube","die Banane","die Wassermelone","der Apfel"],
answer:"die Banane"
},

{
type:"audio",
speak:"die Orange",
question:"کدام کلمه را شنیدی؟",
options:["der Apfel","die Orange","die Wassermelone","die Banane"],
answer:"die Orange"
},

{
type:"audio",
speak:"die Traube",
question:"کدام کلمه را شنیدی؟",
options:["die Orange","die Banane","die Traube","der Apfel"],
answer:"die Traube"
},

{
type:"audio",
speak:"die Wassermelone",
question:"کدام کلمه را شنیدی؟",
options:["die Traube","der Apfel","die Banane","die Wassermelone"],
answer:"die Wassermelone"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich esse einen Apfel",
question:"جمله آلمانی را بساز:",
text:"من یک سیب می‌خورم",
words:["Ich","esse","einen","Apfel"],
answer:["Ich","esse","einen","Apfel"]
},

{
type:"build-de",
speak:"Sie hat eine Banane",
question:"جمله آلمانی را بساز:",
text:"او یک موز دارد",
words:["Sie","hat","eine","Banane"],
answer:["Sie","hat","eine","Banane"]
},

{
type:"build-de",
speak:"Das ist eine Orange",
question:"جمله آلمانی را بساز:",
text:"این یک پرتقال است",
words:["Das","ist","eine","Orange"],
answer:["Das","ist","eine","Orange"]
},

{
type:"build-de",
speak:"Ich mag Trauben",
question:"جمله آلمانی را بساز:",
text:"من انگور دوست دارم",
words:["Ich","mag","Trauben"],
answer:["Ich","mag","Trauben"]
},

{
type:"build-de",
speak:"Er isst Wassermelone",
question:"جمله آلمانی را بساز:",
text:"او هندوانه می‌خورد",
words:["Er","isst","Wassermelone"],
answer:["Er","isst","Wassermelone"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich esse einen Apfel",
question:"ترجمه را بساز:",
text:"Ich esse einen Apfel",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"Sie hat eine Banane",
question:"ترجمه را بساز:",
text:"Sie hat eine Banane",
words:["دارد","موز","یک","او"],
answer:["او","یک","موز","دارد"]
},

{
type:"build-fa",
speak:"Das ist eine Orange",
question:"ترجمه را بساز:",
text:"Das ist eine Orange",
words:["است","پرتقال","یک","این"],
answer:["این","یک","پرتقال","است"]
},

{
type:"build-fa",
speak:"Ich mag Trauben",
question:"ترجمه را بساز:",
text:"Ich mag Trauben",
words:["دارم","دوست","انگور","من"],
answer:["من","انگور","دوست","دارم"]
},

{
type:"build-fa",
speak:"Er isst Wassermelone",
question:"ترجمه را بساز:",
text:"Er isst Wassermelone",
words:["می‌خورد","هندوانه","او"],
answer:["او","هندوانه","می‌خورد"]
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

  // BUILD GERMAN / FA

  else if (q.type === "build-de" || q.type === "build-fa") {
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

  if (q.type === "build-de") {
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