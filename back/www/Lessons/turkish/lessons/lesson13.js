let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "tr-TR",
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
  utter.lang = "tr-TR";
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
question:"Bugün کدام است؟",
speak:"bugün",
options:[
{text:"yarın",image:"../../media/time/tomorrow.webp"},
{text:"bugün",image:"../../media/time/today.webp"},
{text:"dün",image:"../../media/time/yesterday.webp"},
{text:"sabah",image:"../../media/time/morning.webp"}
],
answer:"bugün"
},

{
type:"image",
question:"Yarın کدام است؟",
speak:"yarın",
options:[
{text:"gece",image:"../../media/time/night.webp"},
{text:"yarın",image:"../../media/time/tomorrow.webp"},
{text:"bugün",image:"../../media/time/today.webp"},
{text:"dün",image:"../../media/time/yesterday.webp"}
],
answer:"yarın"
},

{
type:"image",
question:"Dün کدام است؟",
speak:"dün",
options:[
{text:"bugün",image:"../../media/time/today.webp"},
{text:"dün",image:"../../media/time/yesterday.webp"},
{text:"gece",image:"../../media/time/night.webp"},
{text:"yarın",image:"../../media/time/tomorrow.webp"}
],
answer:"dün"
},

{
type:"image",
question:"Sabah کدام است؟",
speak:"sabah",
options:[
{text:"dün",image:"../../media/time/yesterday.webp"},
{text:"yarın",image:"../../media/time/tomorrow.webp"},
{text:"sabah",image:"../../media/time/morning.webp"},
{text:"bugün",image:"../../media/time/today.webp"}
],
answer:"sabah"
},

{
type:"image",
question:"Gece کدام است؟",
speak:"gece",
options:[
{text:"sabah",image:"../../media/time/morning.webp"},
{text:"bugün",image:"../../media/time/today.webp"},
{text:"yarın",image:"../../media/time/tomorrow.webp"},
{text:"gece",image:"../../media/time/night.webp"}
],
answer:"gece"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["yarın","bugün","dün","sabah"],
answer:"bugün"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["gece","yarın","bugün","dün"],
answer:"yarın"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["bugün","dün","gece","yarın"],
answer:"dün"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["dün","yarın","sabah","bugün"],
answer:"sabah"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["sabah","bugün","yarın","gece"],
answer:"gece"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"bugün",
question:"کدام کلمه را شنیدی؟",
options:["yarın","bugün","dün","sabah"],
answer:"bugün"
},

{
type:"audio",
speak:"yarın",
question:"کدام کلمه را شنیدی؟",
options:["gece","yarın","bugün","dün"],
answer:"yarın"
},

{
type:"audio",
speak:"dün",
question:"کدام کلمه را شنیدی؟",
options:["bugün","dün","gece","yarın"],
answer:"dün"
},

{
type:"audio",
speak:"sabah",
question:"کدام کلمه را شنیدی؟",
options:["dün","yarın","sabah","bugün"],
answer:"sabah"
},

{
type:"audio",
speak:"gece",
question:"کدام کلمه را شنیدی؟",
options:["sabah","bugün","yarın","gece"],
answer:"gece"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Bugün hava sıcak",
question:"جمله ترکی را بساز:",
text:"امروز هوا گرم است",
words:["Bugün","hava","sıcak"],
answer:["Bugün","hava","sıcak"]
},

{
type:"build-tr",
speak:"Yarın hava soğuk",
question:"جمله ترکی را بساز:",
text:"فردا هوا سرد است",
words:["Yarın","hava","soğuk"],
answer:["Yarın","hava","soğuk"]
},

{
type:"build-tr",
speak:"Dün hava güneşliydi",
question:"جمله ترکی را بساز:",
text:"دیروز هوا آفتابی بود",
words:["Dün","hava","güneşliydi"],
answer:["Dün","hava","güneşliydi"]
},

{
type:"build-tr",
speak:"Günaydın",
question:"جمله ترکی را بساز:",
text:"صبح بخیر",
words:["Günaydın"],
answer:["Günaydın"]
},

{
type:"build-tr",
speak:"İyi geceler",
question:"جمله ترکی را بساز:",
text:"شب بخیر",
words:["İyi","geceler"],
answer:["İyi","geceler"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Bugün hava sıcak",
question:"ترجمه را بساز:",
text:"Bugün hava sıcak",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Yarın hava soğuk",
question:"ترجمه را بساز:",
text:"Yarın hava soğuk",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Dün hava güneşliydi",
question:"ترجمه را بساز:",
text:"Dün hava güneşliydi",
words:["بود","آفتابی","دیروز","هوا"],
answer:["دیروز","هوا","آفتابی","بود"]
},

{
type:"build-fa",
speak:"Günaydın",
question:"ترجمه را بساز:",
text:"Günaydın",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"İyi geceler",
question:"ترجمه را بساز:",
text:"İyi geceler",
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

  // BUILD TURKISH / FA

  else if (q.type === "build-tr" || q.type === "build-fa") {
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

  if (q.type === "build-tr") {
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