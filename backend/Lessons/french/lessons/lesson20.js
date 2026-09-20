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
question:"qui کدام است؟",
speak:"qui",
options:[
{text:"quoi",image:"../../media/questions/what.webp"},
{text:"qui",image:"../../media/questions/who.webp"},
{text:"où",image:"../../media/questions/where.webp"},
{text:"quand",image:"../../media/questions/when.webp"}
],
answer:"qui"
},

{
type:"image",
question:"quoi کدام است؟",
speak:"quoi",
options:[
{text:"pourquoi",image:"../../media/questions/why.webp"},
{text:"quoi",image:"../../media/questions/what.webp"},
{text:"qui",image:"../../media/questions/who.webp"},
{text:"où",image:"../../media/questions/where.webp"}
],
answer:"quoi"
},

{
type:"image",
question:"où کدام است؟",
speak:"où",
options:[
{text:"quoi",image:"../../media/questions/what.webp"},
{text:"où",image:"../../media/questions/where.webp"},
{text:"pourquoi",image:"../../media/questions/why.webp"},
{text:"qui",image:"../../media/questions/who.webp"}
],
answer:"où"
},

{
type:"image",
question:"quand کدام است؟",
speak:"quand",
options:[
{text:"où",image:"../../media/questions/where.webp"},
{text:"qui",image:"../../media/questions/who.webp"},
{text:"quand",image:"../../media/questions/when.webp"},
{text:"quoi",image:"../../media/questions/what.webp"}
],
answer:"quand"
},

{
type:"image",
question:"pourquoi کدام است؟",
speak:"pourquoi",
options:[
{text:"quand",image:"../../media/questions/when.webp"},
{text:"quoi",image:"../../media/questions/what.webp"},
{text:"qui",image:"../../media/questions/who.webp"},
{text:"pourquoi",image:"../../media/questions/why.webp"}
],
answer:"pourquoi"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["quoi","qui","où","quand"],
answer:"qui"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["pourquoi","quoi","qui","où"],
answer:"quoi"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["quoi","où","pourquoi","qui"],
answer:"où"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["où","qui","quand","quoi"],
answer:"quand"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["quand","quoi","qui","pourquoi"],
answer:"pourquoi"
},

/* AUDIO */

{
type:"audio",
speak:"qui",
question:"کدام کلمه را شنیدی؟",
options:["quoi","qui","où","quand"],
answer:"qui"
},

{
type:"audio",
speak:"quoi",
question:"کدام کلمه را شنیدی؟",
options:["pourquoi","quoi","qui","où"],
answer:"quoi"
},

{
type:"audio",
speak:"où",
question:"کدام کلمه را شنیدی؟",
options:["quoi","où","pourquoi","qui"],
answer:"où"
},

{
type:"audio",
speak:"quand",
question:"کدام کلمه را شنیدی؟",
options:["où","qui","quand","quoi"],
answer:"quand"
},

{
type:"audio",
speak:"pourquoi",
question:"کدام کلمه را شنیدی؟",
options:["quand","quoi","qui","pourquoi"],
answer:"pourquoi"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Qui est-elle ?",
question:"جمله فرانسوی را بساز:",
text:"او کیست؟",
words:["Qui","est","elle"],
answer:["Qui","est","elle"]
},

{
type:"build-fr",
speak:"Qu'est-ce que c'est ?",
question:"جمله فرانسوی را بساز:",
text:"این چیست؟",
words:["Qu'est-ce","que","c'est"],
answer:["Qu'est-ce","que","c'est"]
},

{
type:"build-fr",
speak:"Où est l'école ?",
question:"جمله فرانسوی را بساز:",
text:"مدرسه کجاست؟",
words:["Où","est","l'école"],
answer:["Où","est","l'école"]
},

{
type:"build-fr",
speak:"Quand est le cours ?",
question:"جمله فرانسوی را بساز:",
text:"کلاس کی است؟",
words:["Quand","est","le","cours"],
answer:["Quand","est","le","cours"]
},

{
type:"build-fr",
speak:"Pourquoi es-tu heureux ?",
question:"جمله فرانسوی را بساز:",
text:"چرا خوشحالی؟",
words:["Pourquoi","es-tu","heureux"],
answer:["Pourquoi","es-tu","heureux"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Qui est-elle ?",
question:"ترجمه را بساز:",
text:"Qui est-elle ?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"Qu'est-ce que c'est ?",
question:"ترجمه را بساز:",
text:"Qu'est-ce que c'est ?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"Où est l'école ?",
question:"ترجمه را بساز:",
text:"Où est l'école ?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"Quand est le cours ?",
question:"ترجمه را بساز:",
text:"Quand est le cours ?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"Pourquoi es-tu heureux ?",
question:"ترجمه را بساز:",
text:"Pourquoi es-tu heureux ?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی"]
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