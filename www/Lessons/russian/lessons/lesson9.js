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

/* IMAGE - طبیعت */

{
type:"image",
question:"Солнце کدام است؟",
speak:"солнце",
options:[
{text:"луна",image:"../../media/nature/moon.webp"},
{text:"солнце",image:"../../media/nature/sun.webp"},
{text:"звезда",image:"../../media/nature/star.webp"},
{text:"небо",image:"../../media/nature/sky.webp"}
],
answer:"солнце"
},

{
type:"image",
question:"Луна کدام است؟",
speak:"луна",
options:[
{text:"звезда",image:"../../media/nature/star.webp"},
{text:"луна",image:"../../media/nature/moon.webp"},
{text:"дождь",image:"../../media/nature/rain.webp"},
{text:"солнце",image:"../../media/nature/sun.webp"}
],
answer:"луна"
},

{
type:"image",
question:"Звезда کدام است؟",
speak:"звезда",
options:[
{text:"солнце",image:"../../media/nature/sun.webp"},
{text:"звезда",image:"../../media/nature/star.webp"},
{text:"дождь",image:"../../media/nature/rain.webp"},
{text:"луна",image:"../../media/nature/moon.webp"}
],
answer:"звезда"
},

{
type:"image",
question:"Небо کدام است؟",
speak:"небо",
options:[
{text:"звезда",image:"../../media/nature/star.webp"},
{text:"луна",image:"../../media/nature/moon.webp"},
{text:"небо",image:"../../media/nature/sky.webp"},
{text:"солнце",image:"../../media/nature/sun.webp"}
],
answer:"небо"
},

{
type:"image",
question:"Дождь کدام است؟",
speak:"дождь",
options:[
{text:"небо",image:"../../media/nature/sky.webp"},
{text:"солнце",image:"../../media/nature/sun.webp"},
{text:"луна",image:"../../media/nature/moon.webp"},
{text:"дождь",image:"../../media/nature/rain.webp"}
],
answer:"дождь"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["луна","солнце","звезда","небо"],
answer:"солнце"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["звезда","луна","дождь","солнце"],
answer:"луна"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["солнце","звезда","дождь","луна"],
answer:"звезда"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["звезда","луна","небо","солнце"],
answer:"небо"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["небо","солнце","луна","дождь"],
answer:"дождь"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"солнце",
question:"کدام کلمه را شنیدی؟",
options:["луна","солнце","звезда","небо"],
answer:"солнце"
},

{
type:"audio",
speak:"луна",
question:"کدام کلمه را شنیدی؟",
options:["звезда","луна","дождь","солнце"],
answer:"луна"
},

{
type:"audio",
speak:"звезда",
question:"کدام کلمه را شنیدی؟",
options:["солнце","звезда","дождь","луна"],
answer:"звезда"
},

{
type:"audio",
speak:"небо",
question:"کدام کلمه را شنیدی؟",
options:["звезда","луна","небо","солнце"],
answer:"небо"
},

{
type:"audio",
speak:"дождь",
question:"کدام کلمه را شنیدی؟",
options:["небо","солнце","луна","дождь"],
answer:"дождь"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Я вижу солнце",
question:"جمله روسی را بساز:",
text:"من خورشید را می‌بینم",
words:["Я","вижу","солнце"],
answer:["Я","вижу","солнце"]
},

{
type:"build-ru",
speak:"Луна большая",
question:"جمله روسی را بساز:",
text:"ماه بزرگ است",
words:["Луна","большая"],
answer:["Луна","большая"]
},

{
type:"build-ru",
speak:"Звезда маленькая",
question:"جمله روسی را بساز:",
text:"ستاره کوچک است",
words:["Звезда","маленькая"],
answer:["Звезда","маленькая"]
},

{
type:"build-ru",
speak:"Небо голубое",
question:"جمله روسی را بساز:",
text:"آسمان آبی است",
words:["Небо","голубое"],
answer:["Небо","голубое"]
},

{
type:"build-ru",
speak:"Я люблю дождь",
question:"جمله روسی را بساز:",
text:"من باران را دوست دارم",
words:["Я","люблю","дождь"],
answer:["Я","люблю","дождь"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Я вижу солнце",
question:"ترجمه را بساز:",
text:"Я вижу солнце",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"Луна большая",
question:"ترجمه را بساز:",
text:"Луна большая",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"Звезда маленькая",
question:"ترجمه را بساز:",
text:"Звезда маленькая",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"Небо голубое",
question:"ترجمه را بساز:",
text:"Небо голубое",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Я люблю дождь",
question:"ترجمه را بساز:",
text:"Я люблю дождь",
words:["دارم","دوست","باران","را","من"],
answer:["من","باران","را","دوست","دارم"]
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