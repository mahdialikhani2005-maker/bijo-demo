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
question:"école کدام است؟",
speak:"école",
options:[
{text:"hôpital",image:"../../media/places/hospital.webp"},
{text:"école",image:"../../media/places/school.webp"},
{text:"magasin",image:"../../media/places/store.webp"},
{text:"parc",image:"../../media/places/park.webp"}
],
answer:"école"
},

{
type:"image",
question:"hôpital کدام است؟",
speak:"hôpital",
options:[
{text:"parc",image:"../../media/places/park.webp"},
{text:"hôpital",image:"../../media/places/hospital.webp"},
{text:"mosquée",image:"../../media/places/mosque.webp"},
{text:"école",image:"../../media/places/school.webp"}
],
answer:"hôpital"
},

{
type:"image",
question:"magasin کدام است؟",
speak:"magasin",
options:[
{text:"école",image:"../../media/places/school.webp"},
{text:"magasin",image:"../../media/places/store.webp"},
{text:"mosquée",image:"../../media/places/mosque.webp"},
{text:"hôpital",image:"../../media/places/hospital.webp"}
],
answer:"magasin"
},

{
type:"image",
question:"parc کدام است؟",
speak:"parc",
options:[
{text:"magasin",image:"../../media/places/store.webp"},
{text:"hôpital",image:"../../media/places/hospital.webp"},
{text:"parc",image:"../../media/places/park.webp"},
{text:"école",image:"../../media/places/school.webp"}
],
answer:"parc"
},

{
type:"image",
question:"mosquée کدام است؟",
speak:"mosquée",
options:[
{text:"parc",image:"../../media/places/park.webp"},
{text:"école",image:"../../media/places/school.webp"},
{text:"hôpital",image:"../../media/places/hospital.webp"},
{text:"mosquée",image:"../../media/places/mosque.webp"}
],
answer:"mosquée"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["hôpital","école","magasin","parc"],
answer:"école"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["parc","hôpital","mosquée","école"],
answer:"hôpital"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["école","magasin","mosquée","hôpital"],
answer:"magasin"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["magasin","hôpital","parc","école"],
answer:"parc"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["parc","école","hôpital","mosquée"],
answer:"mosquée"
},

/* AUDIO */

{
type:"audio",
speak:"école",
question:"کدام کلمه را شنیدی؟",
options:["hôpital","école","magasin","parc"],
answer:"école"
},

{
type:"audio",
speak:"hôpital",
question:"کدام کلمه را شنیدی؟",
options:["parc","hôpital","mosquée","école"],
answer:"hôpital"
},

{
type:"audio",
speak:"magasin",
question:"کدام کلمه را شنیدی؟",
options:["école","magasin","mosquée","hôpital"],
answer:"magasin"
},

{
type:"audio",
speak:"parc",
question:"کدام کلمه را شنیدی؟",
options:["magasin","hôpital","parc","école"],
answer:"parc"
},

{
type:"audio",
speak:"mosquée",
question:"کدام کلمه را شنیدی؟",
options:["parc","école","hôpital","mosquée"],
answer:"mosquée"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"C'est une école",
question:"جمله فرانسوی را بساز:",
text:"این یک مدرسه است",
words:["C'est","une","école"],
answer:["C'est","une","école"]
},

{
type:"build-fr",
speak:"Je vais à l'hôpital",
question:"جمله فرانسوی را بساز:",
text:"من به بیمارستان می‌روم",
words:["Je","vais","à","l'hôpital"],
answer:["Je","vais","à","l'hôpital"]
},

{
type:"build-fr",
speak:"Elle est au magasin",
question:"جمله فرانسوی را بساز:",
text:"او در فروشگاه است",
words:["Elle","est","au","magasin"],
answer:["Elle","est","au","magasin"]
},

{
type:"build-fr",
speak:"Nous sommes dans le parc",
question:"جمله فرانسوی را بساز:",
text:"ما در پارک هستیم",
words:["Nous","sommes","dans","le","parc"],
answer:["Nous","sommes","dans","le","parc"]
},

{
type:"build-fr",
speak:"Il va à la mosquée",
question:"جمله فرانسوی را بساز:",
text:"او به مسجد می‌رود",
words:["Il","va","à","la","mosquée"],
answer:["Il","va","à","la","mosquée"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"C'est une école",
question:"ترجمه را بساز:",
text:"C'est une école",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Je vais à l'hôpital",
question:"ترجمه را بساز:",
text:"Je vais à l'hôpital",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"Elle est au magasin",
question:"ترجمه را بساز:",
text:"Elle est au magasin",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Nous sommes dans le parc",
question:"ترجمه را بساز:",
text:"Nous sommes dans le parc",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"Il va à la mosquée",
question:"ترجمه را بساز:",
text:"Il va à la mosquée",
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