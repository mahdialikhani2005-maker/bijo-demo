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

/* IMAGE - میوه‌ها */

{
type:"image",
question:"Яблоко کدام است؟",
speak:"яблоко",
options:[
{text:"банан",image:"../../media/fruits/banana.webp"},
{text:"яблоко",image:"../../media/fruits/apple.webp"},
{text:"апельсин",image:"../../media/fruits/orange.webp"},
{text:"виноград",image:"../../media/fruits/grape.webp"}
],
answer:"яблоко"
},

{
type:"image",
question:"Банан کدام است؟",
speak:"банан",
options:[
{text:"виноград",image:"../../media/fruits/grape.webp"},
{text:"банан",image:"../../media/fruits/banana.webp"},
{text:"арбуз",image:"../../media/fruits/watermelon.webp"},
{text:"яблоко",image:"../../media/fruits/apple.webp"}
],
answer:"банан"
},

{
type:"image",
question:"Апельсин کدام است؟",
speak:"апельсин",
options:[
{text:"яблоко",image:"../../media/fruits/apple.webp"},
{text:"апельсин",image:"../../media/fruits/orange.webp"},
{text:"арбуз",image:"../../media/fruits/watermelon.webp"},
{text:"банан",image:"../../media/fruits/banana.webp"}
],
answer:"апельсин"
},

{
type:"image",
question:"Виноград کدام است؟",
speak:"виноград",
options:[
{text:"апельсин",image:"../../media/fruits/orange.webp"},
{text:"банан",image:"../../media/fruits/banana.webp"},
{text:"виноград",image:"../../media/fruits/grape.webp"},
{text:"яблоко",image:"../../media/fruits/apple.webp"}
],
answer:"виноград"
},

{
type:"image",
question:"Арбуз کدام است؟",
speak:"арбуз",
options:[
{text:"виноград",image:"../../media/fruits/grape.webp"},
{text:"яблоко",image:"../../media/fruits/apple.webp"},
{text:"банан",image:"../../media/fruits/banana.webp"},
{text:"арбуз",image:"../../media/fruits/watermelon.webp"}
],
answer:"арбуз"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/apple.webp",
options:["банан","яблоко","апельсин","виноград"],
answer:"яблоко"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/banana.webp",
options:["виноград","банан","арбуз","яблоко"],
answer:"банан"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/orange.webp",
options:["яблоко","апельсин","арбуз","банан"],
answer:"апельсин"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/grape.webp",
options:["апельсин","банан","виноград","яблоко"],
answer:"виноград"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/watermelon.webp",
options:["виноград","яблоко","банан","арбуз"],
answer:"арбуз"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"яблоко",
question:"کدام کلمه را شنیدی؟",
options:["банан","яблоко","апельсин","виноград"],
answer:"яблоко"
},

{
type:"audio",
speak:"банан",
question:"کدام کلمه را شنیدی؟",
options:["виноград","банан","арбуз","яблоко"],
answer:"банан"
},

{
type:"audio",
speak:"апельсин",
question:"کدام کلمه را شنیدی؟",
options:["яблоко","апельсин","арбуз","банан"],
answer:"апельсин"
},

{
type:"audio",
speak:"виноград",
question:"کدام کلمه را شنیدی؟",
options:["апельсин","банан","виноград","яблоко"],
answer:"виноград"
},

{
type:"audio",
speak:"арбуз",
question:"کدام کلمه را شنیدی؟",
options:["виноград","яблоко","банан","арбуз"],
answer:"арбуз"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Я ем яблоко",
question:"جمله روسی را بساز:",
text:"من یک سیب می‌خورم",
words:["Я","ем","яблоко"],
answer:["Я","ем","яблоко"]
},

{
type:"build-ru",
speak:"У неё есть банан",
question:"جمله روسی را بساز:",
text:"او یک موز دارد",
words:["У","неё","есть","банан"],
answer:["У","неё","есть","банан"]
},

{
type:"build-ru",
speak:"Это апельсин",
question:"جمله روسی را بساز:",
text:"این یک پرتقال است",
words:["Это","апельсин"],
answer:["Это","апельсин"]
},

{
type:"build-ru",
speak:"Я люблю виноград",
question:"جمله روسی را بساز:",
text:"من انگور دوست دارم",
words:["Я","люблю","виноград"],
answer:["Я","люблю","виноград"]
},

{
type:"build-ru",
speak:"Он ест арбуз",
question:"جمله روسی را بساز:",
text:"او هندوانه می‌خورد",
words:["Он","ест","арбуз"],
answer:["Он","ест","арбуз"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Я ем яблоко",
question:"ترجمه را بساز:",
text:"Я ем яблоко",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"У неё есть банан",
question:"ترجمه را بساز:",
text:"У неё есть банан",
words:["دارد","موز","یک","او"],
answer:["او","یک","موز","دارد"]
},

{
type:"build-fa",
speak:"Это апельсин",
question:"ترجمه را بساز:",
text:"Это апельсин",
words:["است","پرتقال","یک","این"],
answer:["این","یک","پرتقال","است"]
},

{
type:"build-fa",
speak:"Я люблю виноград",
question:"ترجمه را بساز:",
text:"Я люблю виноград",
words:["دارم","دوست","انگور","من"],
answer:["من","انگور","دوست","دارم"]
},

{
type:"build-fa",
speak:"Он ест арбуз",
question:"ترجمه را بساز:",
text:"Он ест арбуз",
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