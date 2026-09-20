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

/* IMAGE - خانه */

{
type:"image",
question:"Дом کدام است؟",
speak:"дом",
options:[
{text:"комната",image:"../../media/house/room.webp"},
{text:"дом",image:"../../media/house/house.webp"},
{text:"дверь",image:"../../media/house/door.webp"},
{text:"окно",image:"../../media/house/window.webp"}
],
answer:"дом"
},

{
type:"image",
question:"Комната کدام است؟",
speak:"комната",
options:[
{text:"окно",image:"../../media/house/window.webp"},
{text:"комната",image:"../../media/house/room.webp"},
{text:"кухня",image:"../../media/house/kitchen.webp"},
{text:"дом",image:"../../media/house/house.webp"}
],
answer:"комната"
},

{
type:"image",
question:"Дверь کدام است؟",
speak:"дверь",
options:[
{text:"дом",image:"../../media/house/house.webp"},
{text:"дверь",image:"../../media/house/door.webp"},
{text:"окно",image:"../../media/house/window.webp"},
{text:"комната",image:"../../media/house/room.webp"}
],
answer:"дверь"
},

{
type:"image",
question:"Окно کدام است؟",
speak:"окно",
options:[
{text:"дверь",image:"../../media/house/door.webp"},
{text:"дом",image:"../../media/house/house.webp"},
{text:"окно",image:"../../media/house/window.webp"},
{text:"комната",image:"../../media/house/room.webp"}
],
answer:"окно"
},

{
type:"image",
question:"Кухня کدام است؟",
speak:"кухня",
options:[
{text:"комната",image:"../../media/house/room.webp"},
{text:"окно",image:"../../media/house/window.webp"},
{text:"дом",image:"../../media/house/house.webp"},
{text:"кухня",image:"../../media/house/kitchen.webp"}
],
answer:"кухня"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/house.webp",
options:["комната","дом","дверь","окно"],
answer:"дом"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/room.webp",
options:["окно","комната","кухня","дом"],
answer:"комната"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/door.webp",
options:["дом","дверь","окно","комната"],
answer:"дверь"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/window.webp",
options:["дверь","дом","окно","комната"],
answer:"окно"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/kitchen.webp",
options:["комната","окно","дом","кухня"],
answer:"кухня"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"дом",
question:"کدام کلمه را شنیدی؟",
options:["комната","дом","дверь","окно"],
answer:"дом"
},

{
type:"audio",
speak:"комната",
question:"کدام کلمه را شنیدی؟",
options:["окно","комната","кухня","дом"],
answer:"комната"
},

{
type:"audio",
speak:"дверь",
question:"کدام کلمه را شنیدی؟",
options:["дом","дверь","окно","комната"],
answer:"дверь"
},

{
type:"audio",
speak:"окно",
question:"کدام کلمه را شنیدی؟",
options:["дверь","дом","окно","комната"],
answer:"окно"
},

{
type:"audio",
speak:"кухня",
question:"کدام کلمه را شنیدی؟",
options:["комната","окно","дом","кухня"],
answer:"кухня"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Это дом",
question:"جمله روسی را بساز:",
text:"این یک خانه است",
words:["Это","дом"],
answer:["Это","дом"]
},

{
type:"build-ru",
speak:"Я вижу дверь",
question:"جمله روسی را بساز:",
text:"من یک در می‌بینم",
words:["Я","вижу","дверь"],
answer:["Я","вижу","дверь"]
},

{
type:"build-ru",
speak:"Она открывает окно",
question:"جمله روسی را بساز:",
text:"او پنجره را باز می‌کند",
words:["Она","открывает","окно"],
answer:["Она","открывает","окно"]
},

{
type:"build-ru",
speak:"У нас есть кухня",
question:"جمله روسی را بساز:",
text:"ما یک آشپزخانه داریم",
words:["У","нас","есть","кухня"],
answer:["У","нас","есть","кухня"]
},

{
type:"build-ru",
speak:"Они в комнате",
question:"جمله روسی را بساز:",
text:"آنها در اتاق هستند",
words:["Они","в","комнате"],
answer:["Они","в","комнате"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Это дом",
question:"ترجمه را بساز:",
text:"Это дом",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"Я вижу дверь",
question:"ترجمه را بساز:",
text:"Я вижу дверь",
words:["می‌بینم","در","یک","من"],
answer:["من","یک","در","می‌بینم"]
},

{
type:"build-fa",
speak:"Она открывает окно",
question:"ترجمه را بساز:",
text:"Она открывает окно",
words:["را","باز","پنجره","می‌کند","او"],
answer:["او","پنجره","را","باز","می‌کند"]
},

{
type:"build-fa",
speak:"У нас есть кухня",
question:"ترجمه را بساز:",
text:"У нас есть кухня",
words:["داریم","آشپزخانه","یک","ما"],
answer:["ما","یک","آشپزخانه","داریم"]
},

{
type:"build-fa",
speak:"Они в комнате",
question:"ترجمه را بساز:",
text:"Они в комнате",
words:["در","هستند","اتاق","آنها"],
answer:["آنها","در","اتاق","هستند"]
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