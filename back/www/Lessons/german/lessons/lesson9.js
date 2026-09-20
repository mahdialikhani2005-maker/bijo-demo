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
question:"die Sonne کدام است؟",
speak:"die Sonne",
options:[
{text:"der Mond",image:"../../media/nature/moon.webp"},
{text:"die Sonne",image:"../../media/nature/sun.webp"},
{text:"der Stern",image:"../../media/nature/star.webp"},
{text:"der Himmel",image:"../../media/nature/sky.webp"}
],
answer:"die Sonne"
},

{
type:"image",
question:"der Mond کدام است؟",
speak:"der Mond",
options:[
{text:"der Stern",image:"../../media/nature/star.webp"},
{text:"der Mond",image:"../../media/nature/moon.webp"},
{text:"der Regen",image:"../../media/nature/rain.webp"},
{text:"die Sonne",image:"../../media/nature/sun.webp"}
],
answer:"der Mond"
},

{
type:"image",
question:"der Stern کدام است؟",
speak:"der Stern",
options:[
{text:"die Sonne",image:"../../media/nature/sun.webp"},
{text:"der Stern",image:"../../media/nature/star.webp"},
{text:"der Regen",image:"../../media/nature/rain.webp"},
{text:"der Mond",image:"../../media/nature/moon.webp"}
],
answer:"der Stern"
},

{
type:"image",
question:"der Himmel کدام است؟",
speak:"der Himmel",
options:[
{text:"der Stern",image:"../../media/nature/star.webp"},
{text:"der Mond",image:"../../media/nature/moon.webp"},
{text:"der Himmel",image:"../../media/nature/sky.webp"},
{text:"die Sonne",image:"../../media/nature/sun.webp"}
],
answer:"der Himmel"
},

{
type:"image",
question:"der Regen کدام است؟",
speak:"der Regen",
options:[
{text:"der Himmel",image:"../../media/nature/sky.webp"},
{text:"die Sonne",image:"../../media/nature/sun.webp"},
{text:"der Mond",image:"../../media/nature/moon.webp"},
{text:"der Regen",image:"../../media/nature/rain.webp"}
],
answer:"der Regen"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["der Mond","die Sonne","der Stern","der Himmel"],
answer:"die Sonne"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["der Stern","der Mond","der Regen","die Sonne"],
answer:"der Mond"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["die Sonne","der Stern","der Regen","der Mond"],
answer:"der Stern"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["der Stern","der Mond","der Himmel","die Sonne"],
answer:"der Himmel"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["der Himmel","die Sonne","der Mond","der Regen"],
answer:"der Regen"
},

/* AUDIO */

{
type:"audio",
speak:"die Sonne",
question:"کدام کلمه را شنیدی؟",
options:["der Mond","die Sonne","der Stern","der Himmel"],
answer:"die Sonne"
},

{
type:"audio",
speak:"der Mond",
question:"کدام کلمه را شنیدی؟",
options:["der Stern","der Mond","der Regen","die Sonne"],
answer:"der Mond"
},

{
type:"audio",
speak:"der Stern",
question:"کدام کلمه را شنیدی؟",
options:["die Sonne","der Stern","der Regen","der Mond"],
answer:"der Stern"
},

{
type:"audio",
speak:"der Himmel",
question:"کدام کلمه را شنیدی؟",
options:["der Stern","der Mond","der Himmel","die Sonne"],
answer:"der Himmel"
},

{
type:"audio",
speak:"der Regen",
question:"کدام کلمه را شنیدی؟",
options:["der Himmel","die Sonne","der Mond","der Regen"],
answer:"der Regen"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich sehe die Sonne",
question:"جمله آلمانی را بساز:",
text:"من خورشید را می‌بینم",
words:["Ich","sehe","die","Sonne"],
answer:["Ich","sehe","die","Sonne"]
},

{
type:"build-de",
speak:"Der Mond ist groß",
question:"جمله آلمانی را بساز:",
text:"ماه بزرگ است",
words:["Der","Mond","ist","groß"],
answer:["Der","Mond","ist","groß"]
},

{
type:"build-de",
speak:"Der Stern ist klein",
question:"جمله آلمانی را بساز:",
text:"ستاره کوچک است",
words:["Der","Stern","ist","klein"],
answer:["Der","Stern","ist","klein"]
},

{
type:"build-de",
speak:"Der Himmel ist blau",
question:"جمله آلمانی را بساز:",
text:"آسمان آبی است",
words:["Der","Himmel","ist","blau"],
answer:["Der","Himmel","ist","blau"]
},

{
type:"build-de",
speak:"Ich mag den Regen",
question:"جمله آلمانی را بساز:",
text:"من باران را دوست دارم",
words:["Ich","mag","den","Regen"],
answer:["Ich","mag","den","Regen"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich sehe die Sonne",
question:"ترجمه را بساز:",
text:"Ich sehe die Sonne",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"Der Mond ist groß",
question:"ترجمه را بساز:",
text:"Der Mond ist groß",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"Der Stern ist klein",
question:"ترجمه را بساز:",
text:"Der Stern ist klein",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"Der Himmel ist blau",
question:"ترجمه را بساز:",
text:"Der Himmel ist blau",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Ich mag den Regen",
question:"ترجمه را بساز:",
text:"Ich mag den Regen",
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