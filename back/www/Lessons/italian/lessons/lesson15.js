let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "it-IT",
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
  utter.lang = "it-IT";
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
question:"la macchina کدام است؟",
speak:"la macchina",
options:[
{text:"l'autobus",image:"../../media/vehicles/bus.webp"},
{text:"la macchina",image:"../../media/vehicles/car.webp"},
{text:"il treno",image:"../../media/vehicles/train.webp"},
{text:"l'aereo",image:"../../media/vehicles/airplane.webp"}
],
answer:"la macchina"
},

{
type:"image",
question:"l'autobus کدام است؟",
speak:"l'autobus",
options:[
{text:"l'aereo",image:"../../media/vehicles/airplane.webp"},
{text:"l'autobus",image:"../../media/vehicles/bus.webp"},
{text:"la bicicletta",image:"../../media/vehicles/bicycle.webp"},
{text:"la macchina",image:"../../media/vehicles/car.webp"}
],
answer:"l'autobus"
},

{
type:"image",
question:"il treno کدام است؟",
speak:"il treno",
options:[
{text:"la macchina",image:"../../media/vehicles/car.webp"},
{text:"il treno",image:"../../media/vehicles/train.webp"},
{text:"la bicicletta",image:"../../media/vehicles/bicycle.webp"},
{text:"l'autobus",image:"../../media/vehicles/bus.webp"}
],
answer:"il treno"
},

{
type:"image",
question:"l'aereo کدام است؟",
speak:"l'aereo",
options:[
{text:"il treno",image:"../../media/vehicles/train.webp"},
{text:"l'autobus",image:"../../media/vehicles/bus.webp"},
{text:"l'aereo",image:"../../media/vehicles/airplane.webp"},
{text:"la macchina",image:"../../media/vehicles/car.webp"}
],
answer:"l'aereo"
},

{
type:"image",
question:"la bicicletta کدام است؟",
speak:"la bicicletta",
options:[
{text:"l'aereo",image:"../../media/vehicles/airplane.webp"},
{text:"la macchina",image:"../../media/vehicles/car.webp"},
{text:"l'autobus",image:"../../media/vehicles/bus.webp"},
{text:"la bicicletta",image:"../../media/vehicles/bicycle.webp"}
],
answer:"la bicicletta"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/car.webp",
options:["l'autobus","la macchina","il treno","l'aereo"],
answer:"la macchina"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bus.webp",
options:["l'aereo","l'autobus","la bicicletta","la macchina"],
answer:"l'autobus"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/train.webp",
options:["la macchina","il treno","la bicicletta","l'autobus"],
answer:"il treno"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/airplane.webp",
options:["il treno","l'autobus","l'aereo","la macchina"],
answer:"l'aereo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bicycle.webp",
options:["l'aereo","la macchina","l'autobus","la bicicletta"],
answer:"la bicicletta"
},

/* AUDIO */

{
type:"audio",
speak:"la macchina",
question:"کدام کلمه را شنیدی؟",
options:["l'autobus","la macchina","il treno","l'aereo"],
answer:"la macchina"
},

{
type:"audio",
speak:"l'autobus",
question:"کدام کلمه را شنیدی؟",
options:["l'aereo","l'autobus","la bicicletta","la macchina"],
answer:"l'autobus"
},

{
type:"audio",
speak:"il treno",
question:"کدام کلمه را شنیدی؟",
options:["la macchina","il treno","la bicicletta","l'autobus"],
answer:"il treno"
},

{
type:"audio",
speak:"l'aereo",
question:"کدام کلمه را شنیدی؟",
options:["il treno","l'autobus","l'aereo","la macchina"],
answer:"l'aereo"
},

{
type:"audio",
speak:"la bicicletta",
question:"کدام کلمه را شنیدی؟",
options:["l'aereo","la macchina","l'autobus","la bicicletta"],
answer:"la bicicletta"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Io ho una macchina",
question:"جمله ایتالیایی را بساز:",
text:"من یک ماشین دارم",
words:["Io","ho","una","macchina"],
answer:["Io","ho","una","macchina"]
},

{
type:"build-it",
speak:"Lei ha un autobus",
question:"جمله ایتالیایی را بساز:",
text:"او یک اتوبوس دارد",
words:["Lei","ha","un","autobus"],
answer:["Lei","ha","un","autobus"]
},

{
type:"build-it",
speak:"Vedo un treno",
question:"جمله ایتالیایی را بساز:",
text:"من یک قطار می‌بینم",
words:["Vedo","un","treno"],
answer:["Vedo","un","treno"]
},

{
type:"build-it",
speak:"Lui ha un aereo",
question:"جمله ایتالیایی را بساز:",
text:"او یک هواپیما دارد",
words:["Lui","ha","un","aereo"],
answer:["Lui","ha","un","aereo"]
},

{
type:"build-it",
speak:"Mi piace la bicicletta",
question:"جمله ایتالیایی را بساز:",
text:"من دوچرخه را دوست دارم",
words:["Mi","piace","la","bicicletta"],
answer:["Mi","piace","la","bicicletta"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Io ho una macchina",
question:"ترجمه را بساز:",
text:"Io ho una macchina",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"Lei ha un autobus",
question:"ترجمه را بساز:",
text:"Lei ha un autobus",
words:["دارد","اتوبوس","یک","او"],
answer:["او","یک","اتوبوس","دارد"]
},

{
type:"build-fa",
speak:"Vedo un treno",
question:"ترجمه را بساز:",
text:"Vedo un treno",
words:["می‌بینم","قطار","یک","من"],
answer:["من","یک","قطار","می‌بینم"]
},

{
type:"build-fa",
speak:"Lui ha un aereo",
question:"ترجمه را بساز:",
text:"Lui ha un aereo",
words:["دارد","هواپیما","یک","او"],
answer:["او","یک","هواپیما","دارد"]
},

{
type:"build-fa",
speak:"Mi piace la bicicletta",
question:"ترجمه را بساز:",
text:"Mi piace la bicicletta",
words:["دارم","دوست","دوچرخه","را","من"],
answer:["من","دوچرخه","را","دوست","دارم"]
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

  // BUILD ITALIAN / FA

  else if (q.type === "build-it" || q.type === "build-fa") {
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

  if (q.type === "build-it") {
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