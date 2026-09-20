let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "en-US",
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
  utter.lang = "en-US";
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
question:"today کدام است؟",
speak:"today",
options:[
{text:"tomorrow",image:"../../media/time/tomorrow.webp"},
{text:"today",image:"../../media/time/today.webp"},
{text:"yesterday",image:"../../media/time/yesterday.webp"},
{text:"morning",image:"../../media/time/morning.webp"}
],
answer:"today"
},

{
type:"image",
question:"tomorrow کدام است؟",
speak:"tomorrow",
options:[
{text:"night",image:"../../media/time/night.webp"},
{text:"tomorrow",image:"../../media/time/tomorrow.webp"},
{text:"today",image:"../../media/time/today.webp"},
{text:"yesterday",image:"../../media/time/yesterday.webp"}
],
answer:"tomorrow"
},

{
type:"image",
question:"yesterday کدام است؟",
speak:"yesterday",
options:[
{text:"today",image:"../../media/time/today.webp"},
{text:"yesterday",image:"../../media/time/yesterday.webp"},
{text:"night",image:"../../media/time/night.webp"},
{text:"tomorrow",image:"../../media/time/tomorrow.webp"}
],
answer:"yesterday"
},

{
type:"image",
question:"morning کدام است؟",
speak:"morning",
options:[
{text:"yesterday",image:"../../media/time/yesterday.webp"},
{text:"tomorrow",image:"../../media/time/tomorrow.webp"},
{text:"morning",image:"../../media/time/morning.webp"},
{text:"today",image:"../../media/time/today.webp"}
],
answer:"morning"
},

{
type:"image",
question:"night کدام است؟",
speak:"night",
options:[
{text:"morning",image:"../../media/time/morning.webp"},
{text:"today",image:"../../media/time/today.webp"},
{text:"tomorrow",image:"../../media/time/tomorrow.webp"},
{text:"night",image:"../../media/time/night.webp"}
],
answer:"night"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["tomorrow","today","yesterday","morning"],
answer:"today"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["night","tomorrow","today","yesterday"],
answer:"tomorrow"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["today","yesterday","night","tomorrow"],
answer:"yesterday"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["yesterday","tomorrow","morning","today"],
answer:"morning"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["morning","today","tomorrow","night"],
answer:"night"
},

/* AUDIO */

{
type:"audio",
speak:"today",
question:"کدام کلمه را شنیدی؟",
options:["tomorrow","today","yesterday","morning"],
answer:"today"
},

{
type:"audio",
speak:"tomorrow",
question:"کدام کلمه را شنیدی؟",
options:["night","tomorrow","today","yesterday"],
answer:"tomorrow"
},

{
type:"audio",
speak:"yesterday",
question:"کدام کلمه را شنیدی؟",
options:["today","yesterday","night","tomorrow"],
answer:"yesterday"
},

{
type:"audio",
speak:"morning",
question:"کدام کلمه را شنیدی؟",
options:["yesterday","tomorrow","morning","today"],
answer:"morning"
},

{
type:"audio",
speak:"night",
question:"کدام کلمه را شنیدی؟",
options:["morning","today","tomorrow","night"],
answer:"night"
},

/* BUILD EN - جدید ساده */

{
type:"build-en",
speak:"Today is hot",
question:"جمله انگلیسی را بساز:",
text:"امروز گرم است",
words:["is","Today","hot"],
answer:["Today","is","hot"]
},

{
type:"build-en",
speak:"Tomorrow is cold",
question:"جمله انگلیسی را بساز:",
text:"فردا سرد است",
words:["Tomorrow","is","cold"],
answer:["Tomorrow","is","cold"]
},

{
type:"build-en",
speak:"Yesterday was sunny",
question:"جمله انگلیسی را بساز:",
text:"دیروز آفتابی بود",
words:["Yesterday","was","sunny"],
answer:["Yesterday","was","sunny"]
},

{
type:"build-en",
speak:"Good morning",
question:"جمله انگلیسی را بساز:",
text:"صبح بخیر",
words:["morning","Good"],
answer:["Good","morning"]
},

{
type:"build-en",
speak:"Good night",
question:"جمله انگلیسی را بساز:",
text:"شب بخیر",
words:["night","Good"],
answer:["Good","night"]
},

/* BUILD FA - جدید ساده */

{
type:"build-fa",
speak:"Today is hot",
question:"ترجمه را بساز:",
text:"Today is hot",
words:["است","گرم","امروز"],
answer:["امروز","گرم","است"]
},

{
type:"build-fa",
speak:"Tomorrow is cold",
question:"ترجمه را بساز:",
text:"Tomorrow is cold",
words:["است","سرد","فردا"],
answer:["فردا","سرد","است"]
},

{
type:"build-fa",
speak:"Yesterday was sunny",
question:"ترجمه را بساز:",
text:"Yesterday was sunny",
words:["بود","آفتابی","دیروز"],
answer:["دیروز","آفتابی","بود"]
},

{
type:"build-fa",
speak:"Good morning",
question:"ترجمه را بساز:",
text:"Good morning",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Good night",
question:"ترجمه را بساز:",
text:"Good night",
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

  // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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