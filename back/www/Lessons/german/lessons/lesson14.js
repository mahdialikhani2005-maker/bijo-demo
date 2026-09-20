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
question:"der Lehrer کدام است؟",
speak:"der Lehrer",
options:[
{text:"der Arzt",image:"../../media/jobs/doctor.webp"},
{text:"der Lehrer",image:"../../media/jobs/teacher.webp"},
{text:"der Ingenieur",image:"../../media/jobs/engineer.webp"},
{text:"der Schüler",image:"../../media/jobs/student.webp"}
],
answer:"der Lehrer"
},

{
type:"image",
question:"der Arzt کدام است؟",
speak:"der Arzt",
options:[
{text:"der Schüler",image:"../../media/jobs/student.webp"},
{text:"der Arzt",image:"../../media/jobs/doctor.webp"},
{text:"der Fahrer",image:"../../media/jobs/driver.webp"},
{text:"der Lehrer",image:"../../media/jobs/teacher.webp"}
],
answer:"der Arzt"
},

{
type:"image",
question:"der Ingenieur کدام است؟",
speak:"der Ingenieur",
options:[
{text:"der Lehrer",image:"../../media/jobs/teacher.webp"},
{text:"der Ingenieur",image:"../../media/jobs/engineer.webp"},
{text:"der Fahrer",image:"../../media/jobs/driver.webp"},
{text:"der Arzt",image:"../../media/jobs/doctor.webp"}
],
answer:"der Ingenieur"
},

{
type:"image",
question:"der Schüler کدام است؟",
speak:"der Schüler",
options:[
{text:"der Ingenieur",image:"../../media/jobs/engineer.webp"},
{text:"der Arzt",image:"../../media/jobs/doctor.webp"},
{text:"der Schüler",image:"../../media/jobs/student.webp"},
{text:"der Lehrer",image:"../../media/jobs/teacher.webp"}
],
answer:"der Schüler"
},

{
type:"image",
question:"der Fahrer کدام است؟",
speak:"der Fahrer",
options:[
{text:"der Schüler",image:"../../media/jobs/student.webp"},
{text:"der Lehrer",image:"../../media/jobs/teacher.webp"},
{text:"der Arzt",image:"../../media/jobs/doctor.webp"},
{text:"der Fahrer",image:"../../media/jobs/driver.webp"}
],
answer:"der Fahrer"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["der Arzt","der Lehrer","der Ingenieur","der Schüler"],
answer:"der Lehrer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["der Schüler","der Arzt","der Fahrer","der Lehrer"],
answer:"der Arzt"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["der Lehrer","der Ingenieur","der Fahrer","der Arzt"],
answer:"der Ingenieur"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["der Ingenieur","der Arzt","der Schüler","der Lehrer"],
answer:"der Schüler"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["der Schüler","der Lehrer","der Arzt","der Fahrer"],
answer:"der Fahrer"
},

/* AUDIO */

{
type:"audio",
speak:"der Lehrer",
question:"کدام کلمه را شنیدی؟",
options:["der Arzt","der Lehrer","der Ingenieur","der Schüler"],
answer:"der Lehrer"
},

{
type:"audio",
speak:"der Arzt",
question:"کدام کلمه را شنیدی؟",
options:["der Schüler","der Arzt","der Fahrer","der Lehrer"],
answer:"der Arzt"
},

{
type:"audio",
speak:"der Ingenieur",
question:"کدام کلمه را شنیدی؟",
options:["der Lehrer","der Ingenieur","der Fahrer","der Arzt"],
answer:"der Ingenieur"
},

{
type:"audio",
speak:"der Schüler",
question:"کدام کلمه را شنیدی؟",
options:["der Ingenieur","der Arzt","der Schüler","der Lehrer"],
answer:"der Schüler"
},

{
type:"audio",
speak:"der Fahrer",
question:"کدام کلمه را شنیدی؟",
options:["der Schüler","der Lehrer","der Arzt","der Fahrer"],
answer:"der Fahrer"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Sie ist Lehrerin",
question:"جمله آلمانی را بساز:",
text:"او یک معلم است",
words:["Sie","ist","Lehrerin"],
answer:["Sie","ist","Lehrerin"]
},

{
type:"build-de",
speak:"Er ist Arzt",
question:"جمله آلمانی را بساز:",
text:"او یک دکتر است",
words:["Er","ist","Arzt"],
answer:["Er","ist","Arzt"]
},

{
type:"build-de",
speak:"Sie ist Ingenieurin",
question:"جمله آلمانی را بساز:",
text:"او یک مهندس است",
words:["Sie","ist","Ingenieurin"],
answer:["Sie","ist","Ingenieurin"]
},

{
type:"build-de",
speak:"Ich bin Schüler",
question:"جمله آلمانی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["Ich","bin","Schüler"],
answer:["Ich","bin","Schüler"]
},

{
type:"build-de",
speak:"Er ist Fahrer",
question:"جمله آلمانی را بساز:",
text:"او یک راننده است",
words:["Er","ist","Fahrer"],
answer:["Er","ist","Fahrer"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Sie ist Lehrerin",
question:"ترجمه را بساز:",
text:"Sie ist Lehrerin",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"Er ist Arzt",
question:"ترجمه را بساز:",
text:"Er ist Arzt",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"Sie ist Ingenieurin",
question:"ترجمه را بساز:",
text:"Sie ist Ingenieurin",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"Ich bin Schüler",
question:"ترجمه را بساز:",
text:"Ich bin Schüler",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Er ist Fahrer",
question:"ترجمه را بساز:",
text:"Er ist Fahrer",
words:["است","راننده","یک","او"],
answer:["او","یک","راننده","است"]
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