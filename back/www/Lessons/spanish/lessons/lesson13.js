let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "es-ES",
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
  utter.lang = "es-ES";
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

/* IMAGE - زمان */

{
type:"image",
question:"Hoy کدام است؟",
speak:"hoy",
options:[
{text:"mañana",image:"../../media/time/tomorrow.webp"},
{text:"hoy",image:"../../media/time/today.webp"},
{text:"ayer",image:"../../media/time/yesterday.webp"},
{text:"mañana (día)",image:"../../media/time/morning.webp"}
],
answer:"hoy"
},

{
type:"image",
question:"Mañana (futuro) کدام است؟",
speak:"mañana",
options:[
{text:"noche",image:"../../media/time/night.webp"},
{text:"mañana (futuro)",image:"../../media/time/tomorrow.webp"},
{text:"hoy",image:"../../media/time/today.webp"},
{text:"ayer",image:"../../media/time/yesterday.webp"}
],
answer:"mañana (futuro)"
},

{
type:"image",
question:"Ayer کدام است؟",
speak:"ayer",
options:[
{text:"hoy",image:"../../media/time/today.webp"},
{text:"ayer",image:"../../media/time/yesterday.webp"},
{text:"noche",image:"../../media/time/night.webp"},
{text:"mañana (futuro)",image:"../../media/time/tomorrow.webp"}
],
answer:"ayer"
},

{
type:"image",
question:"Mañana (día) کدام است؟",
speak:"mañana (día)",
options:[
{text:"ayer",image:"../../media/time/yesterday.webp"},
{text:"mañana (futuro)",image:"../../media/time/tomorrow.webp"},
{text:"mañana (día)",image:"../../media/time/morning.webp"},
{text:"hoy",image:"../../media/time/today.webp"}
],
answer:"mañana (día)"
},

{
type:"image",
question:"Noche کدام است؟",
speak:"noche",
options:[
{text:"mañana (día)",image:"../../media/time/morning.webp"},
{text:"hoy",image:"../../media/time/today.webp"},
{text:"mañana (futuro)",image:"../../media/time/tomorrow.webp"},
{text:"noche",image:"../../media/time/night.webp"}
],
answer:"noche"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["mañana (futuro)","hoy","ayer","mañana (día)"],
answer:"hoy"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["noche","mañana (futuro)","hoy","ayer"],
answer:"mañana (futuro)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["hoy","ayer","noche","mañana (futuro)"],
answer:"ayer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["ayer","mañana (futuro)","mañana (día)","hoy"],
answer:"mañana (día)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["mañana (día)","hoy","mañana (futuro)","noche"],
answer:"noche"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"hoy",
question:"کدام کلمه را شنیدی؟",
options:["mañana (futuro)","hoy","ayer","mañana (día)"],
answer:"hoy"
},

{
type:"audio",
speak:"mañana (futuro)",
question:"کدام کلمه را شنیدی؟",
options:["noche","mañana (futuro)","hoy","ayer"],
answer:"mañana (futuro)"
},

{
type:"audio",
speak:"ayer",
question:"کدام کلمه را شنیدی؟",
options:["hoy","ayer","noche","mañana (futuro)"],
answer:"ayer"
},

{
type:"audio",
speak:"mañana (día)",
question:"کدام کلمه را شنیدی؟",
options:["ayer","mañana (futuro)","mañana (día)","hoy"],
answer:"mañana (día)"
},

{
type:"audio",
speak:"noche",
question:"کدام کلمه را شنیدی؟",
options:["mañana (día)","hoy","mañana (futuro)","noche"],
answer:"noche"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Hoy hace calor",
question:"جمله اسپانیایی را بساز:",
text:"امروز هوا گرم است",
words:["Hoy","hace","calor"],
answer:["Hoy","hace","calor"]
},

{
type:"build-es",
speak:"Mañana hará frío",
question:"جمله اسپانیایی را بساز:",
text:"فردا هوا سرد است",
words:["Mañana","hará","frío"],
answer:["Mañana","hará","frío"]
},

{
type:"build-es",
speak:"Ayer hacía sol",
question:"جمله اسپانیایی را بساز:",
text:"دیروز هوا آفتابی بود",
words:["Ayer","hacía","sol"],
answer:["Ayer","hacía","sol"]
},

{
type:"build-es",
speak:"Buenos días",
question:"جمله اسپانیایی را بساز:",
text:"صبح بخیر",
words:["Buenos","días"],
answer:["Buenos","días"]
},

{
type:"build-es",
speak:"Buenas noches",
question:"جمله اسپانیایی را بساز:",
text:"شب بخیر",
words:["Buenas","noches"],
answer:["Buenas","noches"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Hoy hace calor",
question:"ترجمه را بساز:",
text:"Hoy hace calor",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Mañana hará frío",
question:"ترجمه را بساز:",
text:"Mañana hará frío",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Ayer hacía sol",
question:"ترجمه را بساز:",
text:"Ayer hacía sol",
words:["بود","آفتابی","دیروز","هوا"],
answer:["دیروز","هوا","آفتابی","بود"]
},

{
type:"build-fa",
speak:"Buenos días",
question:"ترجمه را بساز:",
text:"Buenos días",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Buenas noches",
question:"ترجمه را بساز:",
text:"Buenas noches",
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

  // BUILD SPANISH / FA

  else if (q.type === "build-es" || q.type === "build-fa") {
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

  if (q.type === "build-es") {
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