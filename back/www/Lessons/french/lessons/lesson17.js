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
question:"heureux کدام است؟",
speak:"heureux",
options:[
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"heureux",image:"../../media/feelings/happy.webp"},
{text:"en colère",image:"../../media/feelings/angry.webp"},
{text:"fatigué",image:"../../media/feelings/tired.webp"}
],
answer:"heureux"
},

{
type:"image",
question:"triste کدام است؟",
speak:"triste",
options:[
{text:"fatigué",image:"../../media/feelings/tired.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"effrayé",image:"../../media/feelings/scared.webp"},
{text:"heureux",image:"../../media/feelings/happy.webp"}
],
answer:"triste"
},

{
type:"image",
question:"en colère کدام است؟",
speak:"en colère",
options:[
{text:"heureux",image:"../../media/feelings/happy.webp"},
{text:"en colère",image:"../../media/feelings/angry.webp"},
{text:"effrayé",image:"../../media/feelings/scared.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"}
],
answer:"en colère"
},

{
type:"image",
question:"fatigué کدام است؟",
speak:"fatigué",
options:[
{text:"en colère",image:"../../media/feelings/angry.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"fatigué",image:"../../media/feelings/tired.webp"},
{text:"heureux",image:"../../media/feelings/happy.webp"}
],
answer:"fatigué"
},

{
type:"image",
question:"effrayé کدام است؟",
speak:"effrayé",
options:[
{text:"fatigué",image:"../../media/feelings/tired.webp"},
{text:"heureux",image:"../../media/feelings/happy.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"effrayé",image:"../../media/feelings/scared.webp"}
],
answer:"effrayé"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["triste","heureux","en colère","fatigué"],
answer:"heureux"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["fatigué","triste","effrayé","heureux"],
answer:"triste"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["heureux","en colère","effrayé","triste"],
answer:"en colère"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["en colère","triste","fatigué","heureux"],
answer:"fatigué"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["fatigué","heureux","triste","effrayé"],
answer:"effrayé"
},

/* AUDIO */

{
type:"audio",
speak:"heureux",
question:"کدام کلمه را شنیدی؟",
options:["triste","heureux","en colère","fatigué"],
answer:"heureux"
},

{
type:"audio",
speak:"triste",
question:"کدام کلمه را شنیدی؟",
options:["fatigué","triste","effrayé","heureux"],
answer:"triste"
},

{
type:"audio",
speak:"en colère",
question:"کدام کلمه را شنیدی؟",
options:["heureux","en colère","effrayé","triste"],
answer:"en colère"
},

{
type:"audio",
speak:"fatigué",
question:"کدام کلمه را شنیدی؟",
options:["en colère","triste","fatigué","heureux"],
answer:"fatigué"
},

{
type:"audio",
speak:"effrayé",
question:"کدام کلمه را شنیدی؟",
options:["fatigué","heureux","triste","effrayé"],
answer:"effrayé"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Je suis heureux",
question:"جمله فرانسوی را بساز:",
text:"من خوشحال هستم",
words:["Je","suis","heureux"],
answer:["Je","suis","heureux"]
},

{
type:"build-fr",
speak:"Elle est triste",
question:"جمله فرانسوی را بساز:",
text:"او ناراحت است",
words:["Elle","est","triste"],
answer:["Elle","est","triste"]
},

{
type:"build-fr",
speak:"Il est en colère",
question:"جمله فرانسوی را بساز:",
text:"او عصبانی است",
words:["Il","est","en","colère"],
answer:["Il","est","en","colère"]
},

{
type:"build-fr",
speak:"Nous sommes fatigués",
question:"جمله فرانسوی را بساز:",
text:"ما خسته هستیم",
words:["Nous","sommes","fatigués"],
answer:["Nous","sommes","fatigués"]
},

{
type:"build-fr",
speak:"Ils sont effrayés",
question:"جمله فرانسوی را بساز:",
text:"آنها ترسیده هستند",
words:["Ils","sont","effrayés"],
answer:["Ils","sont","effrayés"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Je suis heureux",
question:"ترجمه را بساز:",
text:"Je suis heureux",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Elle est triste",
question:"ترجمه را بساز:",
text:"Elle est triste",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"Il est en colère",
question:"ترجمه را بساز:",
text:"Il est en colère",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"Nous sommes fatigués",
question:"ترجمه را بساز:",
text:"Nous sommes fatigués",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"Ils sont effrayés",
question:"ترجمه را بساز:",
text:"Ils sont effrayés",
words:["هستند","ترسیده","آنها"],
answer:["آنها","ترسیده","هستند"]
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