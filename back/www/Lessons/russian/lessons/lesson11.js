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

/* IMAGE - رنگ‌ها */

{
type:"image",
question:"Красный کدام است؟",
speak:"красный",
options:[
{text:"синий",image:"../../media/colors/blue.webp"},
{text:"красный",image:"../../media/colors/red.webp"},
{text:"зелёный",image:"../../media/colors/green.webp"},
{text:"жёлтый",image:"../../media/colors/yellow.webp"}
],
answer:"красный"
},

{
type:"image",
question:"Синий کدام است؟",
speak:"синий",
options:[
{text:"жёлтый",image:"../../media/colors/yellow.webp"},
{text:"синий",image:"../../media/colors/blue.webp"},
{text:"чёрный",image:"../../media/colors/black.webp"},
{text:"красный",image:"../../media/colors/red.webp"}
],
answer:"синий"
},

{
type:"image",
question:"Зелёный کدام است؟",
speak:"зелёный",
options:[
{text:"красный",image:"../../media/colors/red.webp"},
{text:"зелёный",image:"../../media/colors/green.webp"},
{text:"чёрный",image:"../../media/colors/black.webp"},
{text:"синий",image:"../../media/colors/blue.webp"}
],
answer:"зелёный"
},

{
type:"image",
question:"Жёлтый کدام است؟",
speak:"жёлтый",
options:[
{text:"зелёный",image:"../../media/colors/green.webp"},
{text:"синий",image:"../../media/colors/blue.webp"},
{text:"жёлтый",image:"../../media/colors/yellow.webp"},
{text:"красный",image:"../../media/colors/red.webp"}
],
answer:"жёлтый"
},

{
type:"image",
question:"Чёрный کدام است؟",
speak:"чёрный",
options:[
{text:"жёлтый",image:"../../media/colors/yellow.webp"},
{text:"красный",image:"../../media/colors/red.webp"},
{text:"синий",image:"../../media/colors/blue.webp"},
{text:"чёрный",image:"../../media/colors/black.webp"}
],
answer:"чёрный"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/red.webp",
options:["синий","красный","зелёный","жёлтый"],
answer:"красный"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/blue.webp",
options:["жёлтый","синий","чёрный","красный"],
answer:"синий"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/green.webp",
options:["красный","зелёный","чёрный","синий"],
answer:"зелёный"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/yellow.webp",
options:["зелёный","синий","жёлтый","красный"],
answer:"жёлтый"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/black.webp",
options:["жёлтый","красный","синий","чёрный"],
answer:"чёрный"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"красный",
question:"کدام کلمه را شنیدی؟",
options:["синий","красный","зелёный","жёлтый"],
answer:"красный"
},

{
type:"audio",
speak:"синий",
question:"کدام کلمه را شنیدی؟",
options:["жёлтый","синий","чёрный","красный"],
answer:"синий"
},

{
type:"audio",
speak:"зелёный",
question:"کدام کلمه را شنیدی؟",
options:["красный","зелёный","чёрный","синий"],
answer:"зелёный"
},

{
type:"audio",
speak:"жёлтый",
question:"کدام کلمه را شنیدی؟",
options:["зелёный","синий","жёлтый","красный"],
answer:"жёлтый"
},

{
type:"audio",
speak:"чёрный",
question:"کدام کلمه را شنیدی؟",
options:["жёлтый","красный","синий","чёрный"],
answer:"чёрный"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Яблоко красное",
question:"جمله روسی را بساز:",
text:"سیب قرمز است",
words:["Яблоко","красное"],
answer:["Яблоко","красное"]
},

{
type:"build-ru",
speak:"Небо синее",
question:"جمله روسی را بساز:",
text:"آسمان آبی است",
words:["Небо","синее"],
answer:["Небо","синее"]
},

{
type:"build-ru",
speak:"Дерево зелёное",
question:"جمله روسی را بساز:",
text:"درخت سبز است",
words:["Дерево","зелёное"],
answer:["Дерево","зелёное"]
},

{
type:"build-ru",
speak:"Солнце жёлтое",
question:"جمله روسی را بساز:",
text:"خورشید زرد است",
words:["Солнце","жёлтое"],
answer:["Солнце","жёлтое"]
},

{
type:"build-ru",
speak:"Кошка чёрная",
question:"جمله روسی را بساز:",
text:"گربه مشکی است",
words:["Кошка","чёрная"],
answer:["Кошка","чёрная"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Яблоко красное",
question:"ترجمه را بساز:",
text:"Яблоко красное",
words:["است","قرمز","سیب"],
answer:["سیب","قرمز","است"]
},

{
type:"build-fa",
speak:"Небо синее",
question:"ترجمه را بساز:",
text:"Небо синее",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Дерево зелёное",
question:"ترجمه را بساز:",
text:"Дерево зелёное",
words:["است","سبز","درخت"],
answer:["درخت","سبز","است"]
},

{
type:"build-fa",
speak:"Солнце жёлтое",
question:"ترجمه را بساز:",
text:"Солнце жёлтое",
words:["است","زرد","خورشید"],
answer:["خورشید","زرد","است"]
},

{
type:"build-fa",
speak:"Кошка чёрная",
question:"ترجمه را بساز:",
text:"Кошка чёрная",
words:["است","مشکی","گربه"],
answer:["گربه","مشکی","است"]
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