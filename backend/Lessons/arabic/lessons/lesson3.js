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
question:"بيت کدام است؟",
speak:"بيت",
options:[
{text:"غرفة",image:"../../media/house/room.webp"},
{text:"بيت",image:"../../media/house/house.webp"},
{text:"باب",image:"../../media/house/door.webp"},
{text:"نافذة",image:"../../media/house/window.webp"}
],
answer:"بيت"
},

{
type:"image",
question:"غرفة کدام است؟",
speak:"غرفة",
options:[
{text:"نافذة",image:"../../media/house/window.webp"},
{text:"غرفة",image:"../../media/house/room.webp"},
{text:"مطبخ",image:"../../media/house/kitchen.webp"},
{text:"بيت",image:"../../media/house/house.webp"}
],
answer:"غرفة"
},

{
type:"image",
question:"باب کدام است؟",
speak:"باب",
options:[
{text:"بيت",image:"../../media/house/house.webp"},
{text:"باب",image:"../../media/house/door.webp"},
{text:"نافذة",image:"../../media/house/window.webp"},
{text:"غرفة",image:"../../media/house/room.webp"}
],
answer:"باب"
},

{
type:"image",
question:"نافذة کدام است؟",
speak:"نافذة",
options:[
{text:"باب",image:"../../media/house/door.webp"},
{text:"بيت",image:"../../media/house/house.webp"},
{text:"نافذة",image:"../../media/house/window.webp"},
{text:"غرفة",image:"../../media/house/room.webp"}
],
answer:"نافذة"
},

{
type:"image",
question:"مطبخ کدام است؟",
speak:"مطبخ",
options:[
{text:"غرفة",image:"../../media/house/room.webp"},
{text:"نافذة",image:"../../media/house/window.webp"},
{text:"بيت",image:"../../media/house/house.webp"},
{text:"مطبخ",image:"../../media/house/kitchen.webp"}
],
answer:"مطبخ"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/house.webp",
options:["غرفة","بيت","باب","نافذة"],
answer:"بيت"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/room.webp",
options:["نافذة","غرفة","مطبخ","بيت"],
answer:"غرفة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/door.webp",
options:["بيت","باب","نافذة","غرفة"],
answer:"باب"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/window.webp",
options:["باب","بيت","نافذة","غرفة"],
answer:"نافذة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/kitchen.webp",
options:["غرفة","نافذة","بيت","مطبخ"],
answer:"مطبخ"
},

/* AUDIO */

{
type:"audio",
speak:"بيت",
question:"کدام کلمه را شنیدی؟",
options:["غرفة","بيت","باب","نافذة"],
answer:"بيت"
},

{
type:"audio",
speak:"غرفة",
question:"کدام کلمه را شنیدی؟",
options:["نافذة","غرفة","مطبخ","بيت"],
answer:"غرفة"
},

{
type:"audio",
speak:"باب",
question:"کدام کلمه را شنیدی؟",
options:["بيت","باب","نافذة","غرفة"],
answer:"باب"
},

{
type:"audio",
speak:"نافذة",
question:"کدام کلمه را شنیدی؟",
options:["باب","بيت","نافذة","غرفة"],
answer:"نافذة"
},

{
type:"audio",
speak:"مطبخ",
question:"کدام کلمه را شنیدی؟",
options:["غرفة","نافذة","بيت","مطبخ"],
answer:"مطبخ"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"هذا بيت",
question:"جمله عربی را بساز:",
text:"این یک خانه است",
words:["هذا","بيت"],
answer:["هذا","بيت"]
},

{
type:"build-ar",
speak:"أرى باباً",
question:"جمله عربی را بساز:",
text:"من یک در می‌بینم",
words:["أرى","باباً"],
answer:["أرى","باباً"]
},

{
type:"build-ar",
speak:"تفتح النافذة",
question:"جمله عربی را بساز:",
text:"او پنجره را باز می‌کند",
words:["تفتح","النافذة"],
answer:["تفتح","النافذة"]
},

{
type:"build-ar",
speak:"لنا مطبخ",
question:"جمله عربی را بساز:",
text:"ما یک آشپزخانه داریم",
words:["لنا","مطبخ"],
answer:["لنا","مطبخ"]
},

{
type:"build-ar",
speak:"هم في الغرفة",
question:"جمله عربی را بساز:",
text:"آنها در اتاق هستند",
words:["هم","في","الغرفة"],
answer:["هم","في","الغرفة"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"هذا بيت",
question:"ترجمه را بساز:",
text:"هذا بيت",
words:["است","خانه","این"],
answer:["این","خانه","است"]
},

{
type:"build-fa",
speak:"أرى باباً",
question:"ترجمه را بساز:",
text:"أرى باباً",
words:["می‌بینم","در","یک","من"],
answer:["من","یک","در","می‌بینم"]
},

{
type:"build-fa",
speak:"تفتح النافذة",
question:"ترجمه را بساز:",
text:"تفتح النافذة",
words:["را","باز","پنجره","می‌کند","او"],
answer:["او","پنجره","را","باز","می‌کند"]
},

{
type:"build-fa",
speak:"لنا مطبخ",
question:"ترجمه را بساز:",
text:"لنا مطبخ",
words:["داریم","آشپزخانه","ما"],
answer:["ما","آشپزخانه","داریم"]
},

{
type:"build-fa",
speak:"هم في الغرفة",
question:"ترجمه را بساز:",
text:"هم في الغرفة",
words:["در","هستند","اتاق","آنها"],
answer:["آنها","در","اتاق","هستند"]
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