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
question:"heiß کدام است؟",
speak:"heiß",
options:[
{text:"kalt",image:"../../media/weather/cold.webp"},
{text:"heiß",image:"../../media/weather/hot.webp"},
{text:"sonnig",image:"../../media/weather/sunny.webp"},
{text:"bewölkt",image:"../../media/weather/cloudy.webp"}
],
answer:"heiß"
},

{
type:"image",
question:"kalt کدام است؟",
speak:"kalt",
options:[
{text:"sonnig",image:"../../media/weather/sunny.webp"},
{text:"kalt",image:"../../media/weather/cold.webp"},
{text:"windig",image:"../../media/weather/wind.webp"},
{text:"heiß",image:"../../media/weather/hot.webp"}
],
answer:"kalt"
},

{
type:"image",
question:"sonnig کدام است؟",
speak:"sonnig",
options:[
{text:"heiß",image:"../../media/weather/hot.webp"},
{text:"sonnig",image:"../../media/weather/sunny.webp"},
{text:"windig",image:"../../media/weather/wind.webp"},
{text:"kalt",image:"../../media/weather/cold.webp"}
],
answer:"sonnig"
},

{
type:"image",
question:"bewölkt کدام است؟",
speak:"bewölkt",
options:[
{text:"sonnig",image:"../../media/weather/sunny.webp"},
{text:"kalt",image:"../../media/weather/cold.webp"},
{text:"bewölkt",image:"../../media/weather/cloudy.webp"},
{text:"heiß",image:"../../media/weather/hot.webp"}
],
answer:"bewölkt"
},

{
type:"image",
question:"windig کدام است؟",
speak:"windig",
options:[
{text:"bewölkt",image:"../../media/weather/cloudy.webp"},
{text:"heiß",image:"../../media/weather/hot.webp"},
{text:"kalt",image:"../../media/weather/cold.webp"},
{text:"windig",image:"../../media/weather/wind.webp"}
],
answer:"windig"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.webp",
options:["kalt","heiß","sonnig","bewölkt"],
answer:"heiß"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.webp",
options:["sonnig","kalt","windig","heiß"],
answer:"kalt"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.webp",
options:["heiß","sonnig","windig","kalt"],
answer:"sonnig"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.webp",
options:["sonnig","kalt","bewölkt","heiß"],
answer:"bewölkt"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.webp",
options:["bewölkt","heiß","kalt","windig"],
answer:"windig"
},

/* AUDIO */

{
type:"audio",
speak:"heiß",
question:"کدام کلمه را شنیدی؟",
options:["kalt","heiß","sonnig","bewölkt"],
answer:"heiß"
},

{
type:"audio",
speak:"kalt",
question:"کدام کلمه را شنیدی؟",
options:["sonnig","kalt","windig","heiß"],
answer:"kalt"
},

{
type:"audio",
speak:"sonnig",
question:"کدام کلمه را شنیدی؟",
options:["heiß","sonnig","windig","kalt"],
answer:"sonnig"
},

{
type:"audio",
speak:"bewölkt",
question:"کدام کلمه را شنیدی؟",
options:["sonnig","kalt","bewölkt","heiß"],
answer:"bewölkt"
},

{
type:"audio",
speak:"windig",
question:"کدام کلمه را شنیدی؟",
options:["bewölkt","heiß","kalt","windig"],
answer:"windig"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Das Wetter ist heiß",
question:"جمله آلمانی را بساز:",
text:"هوا گرم است",
words:["Das","Wetter","ist","heiß"],
answer:["Das","Wetter","ist","heiß"]
},

{
type:"build-de",
speak:"Das Wetter ist kalt",
question:"جمله آلمانی را بساز:",
text:"هوا سرد است",
words:["Das","Wetter","ist","kalt"],
answer:["Das","Wetter","ist","kalt"]
},

{
type:"build-de",
speak:"Die Sonne ist heiß",
question:"جمله آلمانی را بساز:",
text:"خورشید گرم است",
words:["Die","Sonne","ist","heiß"],
answer:["Die","Sonne","ist","heiß"]
},

{
type:"build-de",
speak:"Der Himmel ist bewölkt",
question:"جمله آلمانی را بساز:",
text:"آسمان ابری است",
words:["Der","Himmel","ist","bewölkt"],
answer:["Der","Himmel","ist","bewölkt"]
},

{
type:"build-de",
speak:"Ich mag sonniges Wetter",
question:"جمله آلمانی را بساز:",
text:"من هوای آفتابی را دوست دارم",
words:["Ich","mag","sonniges","Wetter"],
answer:["Ich","mag","sonniges","Wetter"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Das Wetter ist heiß",
question:"ترجمه را بساز:",
text:"Das Wetter ist heiß",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Das Wetter ist kalt",
question:"ترجمه را بساز:",
text:"Das Wetter ist kalt",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Die Sonne ist heiß",
question:"ترجمه را بساز:",
text:"Die Sonne ist heiß",
words:["است","گرم","خورشید"],
answer:["خورشید","گرم","است"]
},

{
type:"build-fa",
speak:"Der Himmel ist bewölkt",
question:"ترجمه را بساز:",
text:"Der Himmel ist bewölkt",
words:["است","ابری","آسمان"],
answer:["آسمان","ابری","است"]
},

{
type:"build-fa",
speak:"Ich mag sonniges Wetter",
question:"ترجمه را بساز:",
text:"Ich mag sonniges Wetter",
words:["دارم","دوست","آفتابی","هوای","من"],
answer:["من","هوای","آفتابی","را","دوست","دارم"]
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