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

/* IMAGE - مکان‌ها */

{
type:"image",
question:"Школа کدام است؟",
speak:"школа",
options:[
{text:"больница",image:"../../media/places/hospital.webp"},
{text:"школа",image:"../../media/places/school.webp"},
{text:"магазин",image:"../../media/places/store.webp"},
{text:"парк",image:"../../media/places/park.webp"}
],
answer:"школа"
},

{
type:"image",
question:"Больница کدام است؟",
speak:"больница",
options:[
{text:"парк",image:"../../media/places/park.webp"},
{text:"больница",image:"../../media/places/hospital.webp"},
{text:"мечеть",image:"../../media/places/mosque.webp"},
{text:"школа",image:"../../media/places/school.webp"}
],
answer:"больница"
},

{
type:"image",
question:"Магазин کدام است؟",
speak:"магазин",
options:[
{text:"школа",image:"../../media/places/school.webp"},
{text:"магазин",image:"../../media/places/store.webp"},
{text:"мечеть",image:"../../media/places/mosque.webp"},
{text:"больница",image:"../../media/places/hospital.webp"}
],
answer:"магазин"
},

{
type:"image",
question:"Парк کدام است؟",
speak:"парк",
options:[
{text:"магазин",image:"../../media/places/store.webp"},
{text:"больница",image:"../../media/places/hospital.webp"},
{text:"парк",image:"../../media/places/park.webp"},
{text:"школа",image:"../../media/places/school.webp"}
],
answer:"парк"
},

{
type:"image",
question:"Мечеть کدام است؟",
speak:"мечеть",
options:[
{text:"парк",image:"../../media/places/park.webp"},
{text:"школа",image:"../../media/places/school.webp"},
{text:"больница",image:"../../media/places/hospital.webp"},
{text:"мечеть",image:"../../media/places/mosque.webp"}
],
answer:"мечеть"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["больница","школа","магазин","парк"],
answer:"школа"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["парк","больница","мечеть","школа"],
answer:"больница"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["школа","магазин","мечеть","больница"],
answer:"магазин"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["магазин","больница","парк","школа"],
answer:"парк"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["парк","школа","больница","мечеть"],
answer:"мечеть"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"школа",
question:"کدام کلمه را شنیدی؟",
options:["больница","школа","магазин","парк"],
answer:"школа"
},

{
type:"audio",
speak:"больница",
question:"کدام کلمه را شنیدی؟",
options:["парк","больница","мечеть","школа"],
answer:"больница"
},

{
type:"audio",
speak:"магазин",
question:"کدام کلمه را شنیدی؟",
options:["школа","магазин","мечеть","больница"],
answer:"магазин"
},

{
type:"audio",
speak:"парк",
question:"کدام کلمه را شنیدی؟",
options:["магазин","больница","парк","школа"],
answer:"парк"
},

{
type:"audio",
speak:"мечеть",
question:"کدام کلمه را شنیدی؟",
options:["парк","школа","больница","мечеть"],
answer:"мечеть"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Это школа",
question:"جمله روسی را بساز:",
text:"این یک مدرسه است",
words:["Это","школа"],
answer:["Это","школа"]
},

{
type:"build-ru",
speak:"Я иду в больницу",
question:"جمله روسی را بساز:",
text:"من به بیمارستان می‌روم",
words:["Я","иду","в","больницу"],
answer:["Я","иду","в","больницу"]
},

{
type:"build-ru",
speak:"Она в магазине",
question:"جمله روسی را بساز:",
text:"او در فروشگاه است",
words:["Она","в","магазине"],
answer:["Она","в","магазине"]
},

{
type:"build-ru",
speak:"Мы в парке",
question:"جمله روسی را بساز:",
text:"ما در پارک هستیم",
words:["Мы","в","парке"],
answer:["Мы","в","парке"]
},

{
type:"build-ru",
speak:"Он идёт в мечеть",
question:"جمله روسی را بساز:",
text:"او به مسجد می‌رود",
words:["Он","идёт","в","мечеть"],
answer:["Он","идёт","в","мечеть"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Это школа",
question:"ترجمه را بساز:",
text:"Это школа",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Я иду в больницу",
question:"ترجمه را بساز:",
text:"Я иду в больницу",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"Она в магазине",
question:"ترجمه را بساز:",
text:"Она в магазине",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Мы в парке",
question:"ترجمه را بساز:",
text:"Мы в парке",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"Он идёт в мечеть",
question:"ترجمه را بساز:",
text:"Он идёт в мечеть",
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