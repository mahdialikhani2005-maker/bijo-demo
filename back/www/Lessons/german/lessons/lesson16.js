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
question:"die Schule کدام است؟",
speak:"die Schule",
options:[
{text:"das Krankenhaus",image:"../../media/places/hospital.webp"},
{text:"die Schule",image:"../../media/places/school.webp"},
{text:"das Geschäft",image:"../../media/places/store.webp"},
{text:"der Park",image:"../../media/places/park.webp"}
],
answer:"die Schule"
},

{
type:"image",
question:"das Krankenhaus کدام است؟",
speak:"das Krankenhaus",
options:[
{text:"der Park",image:"../../media/places/park.webp"},
{text:"das Krankenhaus",image:"../../media/places/hospital.webp"},
{text:"die Moschee",image:"../../media/places/mosque.webp"},
{text:"die Schule",image:"../../media/places/school.webp"}
],
answer:"das Krankenhaus"
},

{
type:"image",
question:"das Geschäft کدام است؟",
speak:"das Geschäft",
options:[
{text:"die Schule",image:"../../media/places/school.webp"},
{text:"das Geschäft",image:"../../media/places/store.webp"},
{text:"die Moschee",image:"../../media/places/mosque.webp"},
{text:"das Krankenhaus",image:"../../media/places/hospital.webp"}
],
answer:"das Geschäft"
},

{
type:"image",
question:"der Park کدام است؟",
speak:"der Park",
options:[
{text:"das Geschäft",image:"../../media/places/store.webp"},
{text:"das Krankenhaus",image:"../../media/places/hospital.webp"},
{text:"der Park",image:"../../media/places/park.webp"},
{text:"die Schule",image:"../../media/places/school.webp"}
],
answer:"der Park"
},

{
type:"image",
question:"die Moschee کدام است؟",
speak:"die Moschee",
options:[
{text:"der Park",image:"../../media/places/park.webp"},
{text:"die Schule",image:"../../media/places/school.webp"},
{text:"das Krankenhaus",image:"../../media/places/hospital.webp"},
{text:"die Moschee",image:"../../media/places/mosque.webp"}
],
answer:"die Moschee"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["das Krankenhaus","die Schule","das Geschäft","der Park"],
answer:"die Schule"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["der Park","das Krankenhaus","die Moschee","die Schule"],
answer:"das Krankenhaus"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["die Schule","das Geschäft","die Moschee","das Krankenhaus"],
answer:"das Geschäft"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["das Geschäft","das Krankenhaus","der Park","die Schule"],
answer:"der Park"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["der Park","die Schule","das Krankenhaus","die Moschee"],
answer:"die Moschee"
},

/* AUDIO */

{
type:"audio",
speak:"die Schule",
question:"کدام کلمه را شنیدی؟",
options:["das Krankenhaus","die Schule","das Geschäft","der Park"],
answer:"die Schule"
},

{
type:"audio",
speak:"das Krankenhaus",
question:"کدام کلمه را شنیدی؟",
options:["der Park","das Krankenhaus","die Moschee","die Schule"],
answer:"das Krankenhaus"
},

{
type:"audio",
speak:"das Geschäft",
question:"کدام کلمه را شنیدی؟",
options:["die Schule","das Geschäft","die Moschee","das Krankenhaus"],
answer:"das Geschäft"
},

{
type:"audio",
speak:"der Park",
question:"کدام کلمه را شنیدی؟",
options:["das Geschäft","das Krankenhaus","der Park","die Schule"],
answer:"der Park"
},

{
type:"audio",
speak:"die Moschee",
question:"کدام کلمه را شنیدی؟",
options:["der Park","die Schule","das Krankenhaus","die Moschee"],
answer:"die Moschee"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Das ist eine Schule",
question:"جمله آلمانی را بساز:",
text:"این یک مدرسه است",
words:["Das","ist","eine","Schule"],
answer:["Das","ist","eine","Schule"]
},

{
type:"build-de",
speak:"Ich gehe ins Krankenhaus",
question:"جمله آلمانی را بساز:",
text:"من به بیمارستان می‌روم",
words:["Ich","gehe","ins","Krankenhaus"],
answer:["Ich","gehe","ins","Krankenhaus"]
},

{
type:"build-de",
speak:"Sie ist im Geschäft",
question:"جمله آلمانی را بساز:",
text:"او در فروشگاه است",
words:["Sie","ist","im","Geschäft"],
answer:["Sie","ist","im","Geschäft"]
},

{
type:"build-de",
speak:"Wir sind im Park",
question:"جمله آلمانی را بساز:",
text:"ما در پارک هستیم",
words:["Wir","sind","im","Park"],
answer:["Wir","sind","im","Park"]
},

{
type:"build-de",
speak:"Er geht in die Moschee",
question:"جمله آلمانی را بساز:",
text:"او به مسجد می‌رود",
words:["Er","geht","in","die","Moschee"],
answer:["Er","geht","in","die","Moschee"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Das ist eine Schule",
question:"ترجمه را بساز:",
text:"Das ist eine Schule",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Ich gehe ins Krankenhaus",
question:"ترجمه را بساز:",
text:"Ich gehe ins Krankenhaus",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"Sie ist im Geschäft",
question:"ترجمه را بساز:",
text:"Sie ist im Geschäft",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Wir sind im Park",
question:"ترجمه را بساز:",
text:"Wir sind im Park",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"Er geht in die Moschee",
question:"ترجمه را بساز:",
text:"Er geht in die Moschee",
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