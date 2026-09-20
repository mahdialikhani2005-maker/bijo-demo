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
question:"soleil کدام است؟",
speak:"soleil",
options:[
{text:"lune",image:"../../media/nature/moon.webp"},
{text:"soleil",image:"../../media/nature/sun.webp"},
{text:"étoile",image:"../../media/nature/star.webp"},
{text:"ciel",image:"../../media/nature/sky.webp"}
],
answer:"soleil"
},

{
type:"image",
question:"lune کدام است؟",
speak:"lune",
options:[
{text:"étoile",image:"../../media/nature/star.webp"},
{text:"lune",image:"../../media/nature/moon.webp"},
{text:"pluie",image:"../../media/nature/rain.webp"},
{text:"soleil",image:"../../media/nature/sun.webp"}
],
answer:"lune"
},

{
type:"image",
question:"étoile کدام است؟",
speak:"étoile",
options:[
{text:"soleil",image:"../../media/nature/sun.webp"},
{text:"étoile",image:"../../media/nature/star.webp"},
{text:"pluie",image:"../../media/nature/rain.webp"},
{text:"lune",image:"../../media/nature/moon.webp"}
],
answer:"étoile"
},

{
type:"image",
question:"ciel کدام است؟",
speak:"ciel",
options:[
{text:"étoile",image:"../../media/nature/star.webp"},
{text:"lune",image:"../../media/nature/moon.webp"},
{text:"ciel",image:"../../media/nature/sky.webp"},
{text:"soleil",image:"../../media/nature/sun.webp"}
],
answer:"ciel"
},

{
type:"image",
question:"pluie کدام است؟",
speak:"pluie",
options:[
{text:"ciel",image:"../../media/nature/sky.webp"},
{text:"soleil",image:"../../media/nature/sun.webp"},
{text:"lune",image:"../../media/nature/moon.webp"},
{text:"pluie",image:"../../media/nature/rain.webp"}
],
answer:"pluie"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["lune","soleil","étoile","ciel"],
answer:"soleil"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["étoile","lune","pluie","soleil"],
answer:"lune"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["soleil","étoile","pluie","lune"],
answer:"étoile"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["étoile","lune","ciel","soleil"],
answer:"ciel"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["ciel","soleil","lune","pluie"],
answer:"pluie"
},

/* AUDIO */

{
type:"audio",
speak:"soleil",
question:"کدام کلمه را شنیدی؟",
options:["lune","soleil","étoile","ciel"],
answer:"soleil"
},

{
type:"audio",
speak:"lune",
question:"کدام کلمه را شنیدی؟",
options:["étoile","lune","pluie","soleil"],
answer:"lune"
},

{
type:"audio",
speak:"étoile",
question:"کدام کلمه را شنیدی؟",
options:["soleil","étoile","pluie","lune"],
answer:"étoile"
},

{
type:"audio",
speak:"ciel",
question:"کدام کلمه را شنیدی؟",
options:["étoile","lune","ciel","soleil"],
answer:"ciel"
},

{
type:"audio",
speak:"pluie",
question:"کدام کلمه را شنیدی؟",
options:["ciel","soleil","lune","pluie"],
answer:"pluie"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Je vois le soleil",
question:"جمله فرانسوی را بساز:",
text:"من خورشید را می‌بینم",
words:["Je","vois","le","soleil"],
answer:["Je","vois","le","soleil"]
},

{
type:"build-fr",
speak:"La lune est grande",
question:"جمله فرانسوی را بساز:",
text:"ماه بزرگ است",
words:["La","lune","est","grande"],
answer:["La","lune","est","grande"]
},

{
type:"build-fr",
speak:"L'étoile est petite",
question:"جمله فرانسوی را بساز:",
text:"ستاره کوچک است",
words:["L'","étoile","est","petite"],
answer:["L'","étoile","est","petite"]
},

{
type:"build-fr",
speak:"Le ciel est bleu",
question:"جمله فرانسوی را بساز:",
text:"آسمان آبی است",
words:["Le","ciel","est","bleu"],
answer:["Le","ciel","est","bleu"]
},

{
type:"build-fr",
speak:"J'aime la pluie",
question:"جمله فرانسوی را بساز:",
text:"من باران را دوست دارم",
words:["J'aime","la","pluie"],
answer:["J'aime","la","pluie"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Je vois le soleil",
question:"ترجمه را بساز:",
text:"Je vois le soleil",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"La lune est grande",
question:"ترجمه را بساز:",
text:"La lune est grande",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"L'étoile est petite",
question:"ترجمه را بساز:",
text:"L'étoile est petite",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"Le ciel est bleu",
question:"ترجمه را بساز:",
text:"Le ciel est bleu",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"J'aime la pluie",
question:"ترجمه را بساز:",
text:"J'aime la pluie",
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