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
question:"chaud کدام است؟",
speak:"chaud",
options:[
{text:"froid",image:"../../media/weather/cold.webp"},
{text:"chaud",image:"../../media/weather/hot.webp"},
{text:"ensoleillé",image:"../../media/weather/sunny.webp"},
{text:"nuageux",image:"../../media/weather/cloudy.webp"}
],
answer:"chaud"
},

{
type:"image",
question:"froid کدام است؟",
speak:"froid",
options:[
{text:"ensoleillé",image:"../../media/weather/sunny.webp"},
{text:"froid",image:"../../media/weather/cold.webp"},
{text:"vent",image:"../../media/weather/wind.webp"},
{text:"chaud",image:"../../media/weather/hot.webp"}
],
answer:"froid"
},

{
type:"image",
question:"ensoleillé کدام است؟",
speak:"ensoleillé",
options:[
{text:"chaud",image:"../../media/weather/hot.webp"},
{text:"ensoleillé",image:"../../media/weather/sunny.webp"},
{text:"vent",image:"../../media/weather/wind.webp"},
{text:"froid",image:"../../media/weather/cold.webp"}
],
answer:"ensoleillé"
},

{
type:"image",
question:"nuageux کدام است؟",
speak:"nuageux",
options:[
{text:"ensoleillé",image:"../../media/weather/sunny.webp"},
{text:"froid",image:"../../media/weather/cold.webp"},
{text:"nuageux",image:"../../media/weather/cloudy.webp"},
{text:"chaud",image:"../../media/weather/hot.webp"}
],
answer:"nuageux"
},

{
type:"image",
question:"vent کدام است؟",
speak:"vent",
options:[
{text:"nuageux",image:"../../media/weather/cloudy.webp"},
{text:"chaud",image:"../../media/weather/hot.webp"},
{text:"froid",image:"../../media/weather/cold.webp"},
{text:"vent",image:"../../media/weather/wind.webp"}
],
answer:"vent"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.webp",
options:["froid","chaud","ensoleillé","nuageux"],
answer:"chaud"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.webp",
options:["ensoleillé","froid","vent","chaud"],
answer:"froid"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.webp",
options:["chaud","ensoleillé","vent","froid"],
answer:"ensoleillé"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.webp",
options:["ensoleillé","froid","nuageux","chaud"],
answer:"nuageux"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.webp",
options:["nuageux","chaud","froid","vent"],
answer:"vent"
},

/* AUDIO */

{
type:"audio",
speak:"chaud",
question:"کدام کلمه را شنیدی؟",
options:["froid","chaud","ensoleillé","nuageux"],
answer:"chaud"
},

{
type:"audio",
speak:"froid",
question:"کدام کلمه را شنیدی؟",
options:["ensoleillé","froid","vent","chaud"],
answer:"froid"
},

{
type:"audio",
speak:"ensoleillé",
question:"کدام کلمه را شنیدی؟",
options:["chaud","ensoleillé","vent","froid"],
answer:"ensoleillé"
},

{
type:"audio",
speak:"nuageux",
question:"کدام کلمه را شنیدی؟",
options:["ensoleillé","froid","nuageux","chaud"],
answer:"nuageux"
},

{
type:"audio",
speak:"vent",
question:"کدام کلمه را شنیدی؟",
options:["nuageux","chaud","froid","vent"],
answer:"vent"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Il fait chaud",
question:"جمله فرانسوی را بساز:",
text:"هوا گرم است",
words:["Il","fait","chaud"],
answer:["Il","fait","chaud"]
},

{
type:"build-fr",
speak:"Il fait froid",
question:"جمله فرانسوی را بساز:",
text:"هوا سرد است",
words:["Il","fait","froid"],
answer:["Il","fait","froid"]
},

{
type:"build-fr",
speak:"Le soleil est chaud",
question:"جمله فرانسوی را بساز:",
text:"خورشید گرم است",
words:["Le","soleil","est","chaud"],
answer:["Le","soleil","est","chaud"]
},

{
type:"build-fr",
speak:"Le ciel est nuageux",
question:"جمله فرانسوی را بساز:",
text:"آسمان ابری است",
words:["Le","ciel","est","nuageux"],
answer:["Le","ciel","est","nuageux"]
},

{
type:"build-fr",
speak:"J'aime les jours ensoleillés",
question:"جمله فرانسوی را بساز:",
text:"من روزهای آفتابی را دوست دارم",
words:["J'aime","les","jours","ensoleillés"],
answer:["J'aime","les","jours","ensoleillés"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Il fait chaud",
question:"ترجمه را بساز:",
text:"Il fait chaud",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Il fait froid",
question:"ترجمه را بساز:",
text:"Il fait froid",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Le soleil est chaud",
question:"ترجمه را بساز:",
text:"Le soleil est chaud",
words:["است","گرم","خورشید"],
answer:["خورشید","گرم","است"]
},

{
type:"build-fa",
speak:"Le ciel est nuageux",
question:"ترجمه را بساز:",
text:"Le ciel est nuageux",
words:["است","ابری","آسمان"],
answer:["آسمان","ابری","است"]
},

{
type:"build-fa",
speak:"J'aime les jours ensoleillés",
question:"ترجمه را بساز:",
text:"J'aime les jours ensoleillés",
words:["دارم","دوست","آفتابی","روزهای","من"],
answer:["من","روزهای","آفتابی","را","دوست","دارم"]
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