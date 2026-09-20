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

/* IMAGE - سوالی‌ها */

{
type:"image",
question:"Кто کدام است؟",
speak:"кто",
options:[
{text:"что",image:"../../media/questions/what.webp"},
{text:"кто",image:"../../media/questions/who.webp"},
{text:"где",image:"../../media/questions/where.webp"},
{text:"когда",image:"../../media/questions/when.webp"}
],
answer:"кто"
},

{
type:"image",
question:"Что کدام است؟",
speak:"что",
options:[
{text:"почему",image:"../../media/questions/why.webp"},
{text:"что",image:"../../media/questions/what.webp"},
{text:"кто",image:"../../media/questions/who.webp"},
{text:"где",image:"../../media/questions/where.webp"}
],
answer:"что"
},

{
type:"image",
question:"Где کدام است؟",
speak:"где",
options:[
{text:"что",image:"../../media/questions/what.webp"},
{text:"где",image:"../../media/questions/where.webp"},
{text:"почему",image:"../../media/questions/why.webp"},
{text:"кто",image:"../../media/questions/who.webp"}
],
answer:"где"
},

{
type:"image",
question:"Когда کدام است؟",
speak:"когда",
options:[
{text:"где",image:"../../media/questions/where.webp"},
{text:"кто",image:"../../media/questions/who.webp"},
{text:"когда",image:"../../media/questions/when.webp"},
{text:"что",image:"../../media/questions/what.webp"}
],
answer:"когда"
},

{
type:"image",
question:"Почему کدام است؟",
speak:"почему",
options:[
{text:"когда",image:"../../media/questions/when.webp"},
{text:"что",image:"../../media/questions/what.webp"},
{text:"кто",image:"../../media/questions/who.webp"},
{text:"почему",image:"../../media/questions/why.webp"}
],
answer:"почему"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["что","кто","где","когда"],
answer:"кто"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["почему","что","кто","где"],
answer:"что"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["что","где","почему","кто"],
answer:"где"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["где","кто","когда","что"],
answer:"когда"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["когда","что","кто","почему"],
answer:"почему"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"кто",
question:"کدام کلمه را شنیدی؟",
options:["что","кто","где","когда"],
answer:"кто"
},

{
type:"audio",
speak:"что",
question:"کدام کلمه را شنیدی؟",
options:["почему","что","кто","где"],
answer:"что"
},

{
type:"audio",
speak:"где",
question:"کدام کلمه را شنیدی؟",
options:["что","где","почему","кто"],
answer:"где"
},

{
type:"audio",
speak:"когда",
question:"کدام کلمه را شنیدی؟",
options:["где","кто","когда","что"],
answer:"когда"
},

{
type:"audio",
speak:"почему",
question:"کدام کلمه را شنیدی؟",
options:["когда","что","кто","почему"],
answer:"почему"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Кто она?",
question:"جمله روسی را بساز:",
text:"او کیست؟",
words:["Кто","она"],
answer:["Кто","она"]
},

{
type:"build-ru",
speak:"Что это?",
question:"جمله روسی را بساز:",
text:"این چیست؟",
words:["Что","это"],
answer:["Что","это"]
},

{
type:"build-ru",
speak:"Где школа?",
question:"جمله روسی را بساز:",
text:"مدرسه کجاست؟",
words:["Где","школа"],
answer:["Где","школа"]
},

{
type:"build-ru",
speak:"Когда урок?",
question:"جمله روسی را بساز:",
text:"کلاس کی است؟",
words:["Когда","урок"],
answer:["Когда","урок"]
},

{
type:"build-ru",
speak:"Почему ты счастлив?",
question:"جمله روسی را بساز:",
text:"چرا خوشحالی؟",
words:["Почему","ты","счастлив"],
answer:["Почему","ты","счастлив"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Кто она?",
question:"ترجمه را بساز:",
text:"Кто она?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"Что это?",
question:"ترجمه را بساز:",
text:"Что это?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"Где школа?",
question:"ترجمه را بساز:",
text:"Где школа?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"Когда урок?",
question:"ترجمه را بساز:",
text:"Когда урок?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"Почему ты счастлив?",
question:"ترجمه را بساز:",
text:"Почему ты счастлив?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی"]
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