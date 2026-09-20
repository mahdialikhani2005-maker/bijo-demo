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
question:"la scuola کدام است؟",
speak:"la scuola",
options:[
{text:"l'ospedale",image:"../../media/places/hospital.webp"},
{text:"la scuola",image:"../../media/places/school.webp"},
{text:"il negozio",image:"../../media/places/store.webp"},
{text:"il parco",image:"../../media/places/park.webp"}
],
answer:"la scuola"
},

{
type:"image",
question:"l'ospedale کدام است؟",
speak:"l'ospedale",
options:[
{text:"il parco",image:"../../media/places/park.webp"},
{text:"l'ospedale",image:"../../media/places/hospital.webp"},
{text:"la moschea",image:"../../media/places/mosque.webp"},
{text:"la scuola",image:"../../media/places/school.webp"}
],
answer:"l'ospedale"
},

{
type:"image",
question:"il negozio کدام است؟",
speak:"il negozio",
options:[
{text:"la scuola",image:"../../media/places/school.webp"},
{text:"il negozio",image:"../../media/places/store.webp"},
{text:"la moschea",image:"../../media/places/mosque.webp"},
{text:"l'ospedale",image:"../../media/places/hospital.webp"}
],
answer:"il negozio"
},

{
type:"image",
question:"il parco کدام است؟",
speak:"il parco",
options:[
{text:"il negozio",image:"../../media/places/store.webp"},
{text:"l'ospedale",image:"../../media/places/hospital.webp"},
{text:"il parco",image:"../../media/places/park.webp"},
{text:"la scuola",image:"../../media/places/school.webp"}
],
answer:"il parco"
},

{
type:"image",
question:"la moschea کدام است؟",
speak:"la moschea",
options:[
{text:"il parco",image:"../../media/places/park.webp"},
{text:"la scuola",image:"../../media/places/school.webp"},
{text:"l'ospedale",image:"../../media/places/hospital.webp"},
{text:"la moschea",image:"../../media/places/mosque.webp"}
],
answer:"la moschea"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["l'ospedale","la scuola","il negozio","il parco"],
answer:"la scuola"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["il parco","l'ospedale","la moschea","la scuola"],
answer:"l'ospedale"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["la scuola","il negozio","la moschea","l'ospedale"],
answer:"il negozio"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["il negozio","l'ospedale","il parco","la scuola"],
answer:"il parco"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["il parco","la scuola","l'ospedale","la moschea"],
answer:"la moschea"
},

/* AUDIO */

{
type:"audio",
speak:"la scuola",
question:"کدام کلمه را شنیدی؟",
options:["l'ospedale","la scuola","il negozio","il parco"],
answer:"la scuola"
},

{
type:"audio",
speak:"l'ospedale",
question:"کدام کلمه را شنیدی؟",
options:["il parco","l'ospedale","la moschea","la scuola"],
answer:"l'ospedale"
},

{
type:"audio",
speak:"il negozio",
question:"کدام کلمه را شنیدی؟",
options:["la scuola","il negozio","la moschea","l'ospedale"],
answer:"il negozio"
},

{
type:"audio",
speak:"il parco",
question:"کدام کلمه را شنیدی؟",
options:["il negozio","l'ospedale","il parco","la scuola"],
answer:"il parco"
},

{
type:"audio",
speak:"la moschea",
question:"کدام کلمه را شنیدی؟",
options:["il parco","la scuola","l'ospedale","la moschea"],
answer:"la moschea"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Questa è una scuola",
question:"جمله ایتالیایی را بساز:",
text:"این یک مدرسه است",
words:["Questa","è","una","scuola"],
answer:["Questa","è","una","scuola"]
},

{
type:"build-it",
speak:"Vado all'ospedale",
question:"جمله ایتالیایی را بساز:",
text:"من به بیمارستان می‌روم",
words:["Vado","all'","ospedale"],
answer:["Vado","all'","ospedale"]
},

{
type:"build-it",
speak:"Lei è al negozio",
question:"جمله ایتالیایی را بساز:",
text:"او در فروشگاه است",
words:["Lei","è","al","negozio"],
answer:["Lei","è","al","negozio"]
},

{
type:"build-it",
speak:"Noi siamo al parco",
question:"جمله ایتالیایی را بساز:",
text:"ما در پارک هستیم",
words:["Noi","siamo","al","parco"],
answer:["Noi","siamo","al","parco"]
},

{
type:"build-it",
speak:"Lui va alla moschea",
question:"جمله ایتالیایی را بساز:",
text:"او به مسجد می‌رود",
words:["Lui","va","alla","moschea"],
answer:["Lui","va","alla","moschea"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Questa è una scuola",
question:"ترجمه را بساز:",
text:"Questa è una scuola",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Vado all'ospedale",
question:"ترجمه را بساز:",
text:"Vado all'ospedale",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"Lei è al negozio",
question:"ترجمه را بساز:",
text:"Lei è al negozio",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Noi siamo al parco",
question:"ترجمه را بساز:",
text:"Noi siamo al parco",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"Lui va alla moschea",
question:"ترجمه را بساز:",
text:"Lui va alla moschea",
words:["می‌رود","به","مسجد","او"],
answer:["او","به","مسجد","می‌رود"]
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