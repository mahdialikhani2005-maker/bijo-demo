let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "fr-FR",
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
  utter.lang = "fr-FR";
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
question:"aujourd'hui کدام است؟",
speak:"aujourd'hui",
options:[
{text:"demain",image:"../../media/time/tomorrow.webp"},
{text:"aujourd'hui",image:"../../media/time/today.webp"},
{text:"hier",image:"../../media/time/yesterday.webp"},
{text:"matin",image:"../../media/time/morning.webp"}
],
answer:"aujourd'hui"
},

{
type:"image",
question:"demain کدام است؟",
speak:"demain",
options:[
{text:"nuit",image:"../../media/time/night.webp"},
{text:"demain",image:"../../media/time/tomorrow.webp"},
{text:"aujourd'hui",image:"../../media/time/today.webp"},
{text:"hier",image:"../../media/time/yesterday.webp"}
],
answer:"demain"
},

{
type:"image",
question:"hier کدام است؟",
speak:"hier",
options:[
{text:"aujourd'hui",image:"../../media/time/today.webp"},
{text:"hier",image:"../../media/time/yesterday.webp"},
{text:"nuit",image:"../../media/time/night.webp"},
{text:"demain",image:"../../media/time/tomorrow.webp"}
],
answer:"hier"
},

{
type:"image",
question:"matin کدام است؟",
speak:"matin",
options:[
{text:"hier",image:"../../media/time/yesterday.webp"},
{text:"demain",image:"../../media/time/tomorrow.webp"},
{text:"matin",image:"../../media/time/morning.webp"},
{text:"aujourd'hui",image:"../../media/time/today.webp"}
],
answer:"matin"
},

{
type:"image",
question:"nuit کدام است؟",
speak:"nuit",
options:[
{text:"matin",image:"../../media/time/morning.webp"},
{text:"aujourd'hui",image:"../../media/time/today.webp"},
{text:"demain",image:"../../media/time/tomorrow.webp"},
{text:"nuit",image:"../../media/time/night.webp"}
],
answer:"nuit"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["demain","aujourd'hui","hier","matin"],
answer:"aujourd'hui"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["nuit","demain","aujourd'hui","hier"],
answer:"demain"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["aujourd'hui","hier","nuit","demain"],
answer:"hier"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["hier","demain","matin","aujourd'hui"],
answer:"matin"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["matin","aujourd'hui","demain","nuit"],
answer:"nuit"
},

/* AUDIO */

{
type:"audio",
speak:"aujourd'hui",
question:"کدام کلمه را شنیدی؟",
options:["demain","aujourd'hui","hier","matin"],
answer:"aujourd'hui"
},

{
type:"audio",
speak:"demain",
question:"کدام کلمه را شنیدی؟",
options:["nuit","demain","aujourd'hui","hier"],
answer:"demain"
},

{
type:"audio",
speak:"hier",
question:"کدام کلمه را شنیدی؟",
options:["aujourd'hui","hier","nuit","demain"],
answer:"hier"
},

{
type:"audio",
speak:"matin",
question:"کدام کلمه را شنیدی؟",
options:["hier","demain","matin","aujourd'hui"],
answer:"matin"
},

{
type:"audio",
speak:"nuit",
question:"کدام کلمه را شنیدی؟",
options:["matin","aujourd'hui","demain","nuit"],
answer:"nuit"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Aujourd'hui il fait chaud",
question:"جمله فرانسوی را بساز:",
text:"امروز هوا گرم است",
words:["Aujourd'hui","il","fait","chaud"],
answer:["Aujourd'hui","il","fait","chaud"]
},

{
type:"build-fr",
speak:"Demain il fait froid",
question:"جمله فرانسوی را بساز:",
text:"فردا هوا سرد است",
words:["Demain","il","fait","froid"],
answer:["Demain","il","fait","froid"]
},

{
type:"build-fr",
speak:"Hier il faisait soleil",
question:"جمله فرانسوی را بساز:",
text:"دیروز هوا آفتابی بود",
words:["Hier","il","faisait","soleil"],
answer:["Hier","il","faisait","soleil"]
},

{
type:"build-fr",
speak:"Bonjour",
question:"جمله فرانسوی را بساز:",
text:"صبح بخیر",
words:["Bonjour"],
answer:["Bonjour"]
},

{
type:"build-fr",
speak:"Bonne nuit",
question:"جمله فرانسوی را بساز:",
text:"شب بخیر",
words:["Bonne","nuit"],
answer:["Bonne","nuit"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Aujourd'hui il fait chaud",
question:"ترجمه را بساز:",
text:"Aujourd'hui il fait chaud",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Demain il fait froid",
question:"ترجمه را بساز:",
text:"Demain il fait froid",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Hier il faisait soleil",
question:"ترجمه را بساز:",
text:"Hier il faisait soleil",
words:["بود","آفتابی","دیروز","هوا"],
answer:["دیروز","هوا","آفتابی","بود"]
},

{
type:"build-fa",
speak:"Bonjour",
question:"ترجمه را بساز:",
text:"Bonjour",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Bonne nuit",
question:"ترجمه را بساز:",
text:"Bonne nuit",
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

  // BUILD FRENCH / FA

  else if (q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-fr") {
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