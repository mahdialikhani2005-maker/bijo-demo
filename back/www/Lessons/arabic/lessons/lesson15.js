let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
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
  utter.lang = "ar-SA";
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
question:"سيارة کدام است؟",
speak:"سيارة",
options:[
{text:"حافلة",image:"../../media/vehicles/bus.webp"},
{text:"سيارة",image:"../../media/vehicles/car.webp"},
{text:"قطار",image:"../../media/vehicles/train.webp"},
{text:"طائرة",image:"../../media/vehicles/airplane.webp"}
],
answer:"سيارة"
},

{
type:"image",
question:"حافلة کدام است؟",
speak:"حافلة",
options:[
{text:"طائرة",image:"../../media/vehicles/airplane.webp"},
{text:"حافلة",image:"../../media/vehicles/bus.webp"},
{text:"دراجة",image:"../../media/vehicles/bicycle.webp"},
{text:"سيارة",image:"../../media/vehicles/car.webp"}
],
answer:"حافلة"
},

{
type:"image",
question:"قطار کدام است؟",
speak:"قطار",
options:[
{text:"سيارة",image:"../../media/vehicles/car.webp"},
{text:"قطار",image:"../../media/vehicles/train.webp"},
{text:"دراجة",image:"../../media/vehicles/bicycle.webp"},
{text:"حافلة",image:"../../media/vehicles/bus.webp"}
],
answer:"قطار"
},

{
type:"image",
question:"طائرة کدام است؟",
speak:"طائرة",
options:[
{text:"قطار",image:"../../media/vehicles/train.webp"},
{text:"حافلة",image:"../../media/vehicles/bus.webp"},
{text:"طائرة",image:"../../media/vehicles/airplane.webp"},
{text:"سيارة",image:"../../media/vehicles/car.webp"}
],
answer:"طائرة"
},

{
type:"image",
question:"دراجة کدام است؟",
speak:"دراجة",
options:[
{text:"طائرة",image:"../../media/vehicles/airplane.webp"},
{text:"سيارة",image:"../../media/vehicles/car.webp"},
{text:"حافلة",image:"../../media/vehicles/bus.webp"},
{text:"دراجة",image:"../../media/vehicles/bicycle.webp"}
],
answer:"دراجة"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/car.webp",
options:["حافلة","سيارة","قطار","طائرة"],
answer:"سيارة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bus.webp",
options:["طائرة","حافلة","دراجة","سيارة"],
answer:"حافلة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/train.webp",
options:["سيارة","قطار","دراجة","حافلة"],
answer:"قطار"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/airplane.webp",
options:["قطار","حافلة","طائرة","سيارة"],
answer:"طائرة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bicycle.webp",
options:["طائرة","سيارة","حافلة","دراجة"],
answer:"دراجة"
},

/* AUDIO */

{
type:"audio",
speak:"سيارة",
question:"کدام کلمه را شنیدی؟",
options:["حافلة","سيارة","قطار","طائرة"],
answer:"سيارة"
},

{
type:"audio",
speak:"حافلة",
question:"کدام کلمه را شنیدی؟",
options:["طائرة","حافلة","دراجة","سيارة"],
answer:"حافلة"
},

{
type:"audio",
speak:"قطار",
question:"کدام کلمه را شنیدی؟",
options:["سيارة","قطار","دراجة","حافلة"],
answer:"قطار"
},

{
type:"audio",
speak:"طائرة",
question:"کدام کلمه را شنیدی؟",
options:["قطار","حافلة","طائرة","سيارة"],
answer:"طائرة"
},

{
type:"audio",
speak:"دراجة",
question:"کدام کلمه را شنیدی؟",
options:["طائرة","سيارة","حافلة","دراجة"],
answer:"دراجة"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"لي سيارة",
question:"جمله عربی را بساز:",
text:"من یک ماشین دارم",
words:["لي","سيارة"],
answer:["لي","سيارة"]
},

{
type:"build-ar",
speak:"لها حافلة",
question:"جمله عربی را بساز:",
text:"او یک اتوبوس دارد",
words:["لها","حافلة"],
answer:["لها","حافلة"]
},

{
type:"build-ar",
speak:"أرى قطاراً",
question:"جمله عربی را بساز:",
text:"من یک قطار می‌بینم",
words:["أرى","قطاراً"],
answer:["أرى","قطاراً"]
},

{
type:"build-ar",
speak:"له طائرة",
question:"جمله عربی را بساز:",
text:"او یک هواپیما دارد",
words:["له","طائرة"],
answer:["له","طائرة"]
},

{
type:"build-ar",
speak:"أحب الدراجة",
question:"جمله عربی را بساز:",
text:"من دوچرخه را دوست دارم",
words:["أحب","الدراجة"],
answer:["أحب","الدراجة"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"لي سيارة",
question:"ترجمه را بساز:",
text:"لي سيارة",
words:["دارم","ماشین","من"],
answer:["من","ماشین","دارم"]
},

{
type:"build-fa",
speak:"لها حافلة",
question:"ترجمه را بساز:",
text:"لها حافلة",
words:["دارد","اتوبوس","او"],
answer:["او","اتوبوس","دارد"]
},

{
type:"build-fa",
speak:"أرى قطاراً",
question:"ترجمه را بساز:",
text:"أرى قطاراً",
words:["می‌بینم","قطار","یک","من"],
answer:["من","یک","قطار","می‌بینم"]
},

{
type:"build-fa",
speak:"له طائرة",
question:"ترجمه را بساز:",
text:"له طائرة",
words:["دارد","هواپیما","او"],
answer:["او","هواپیما","دارد"]
},

{
type:"build-fa",
speak:"أحب الدراجة",
question:"ترجمه را بساز:",
text:"أحب الدراجة",
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

  // BUILD ARABIC / FA

  else if (q.type === "build-ar" || q.type === "build-fa") {
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

  if (q.type === "build-ar") {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
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