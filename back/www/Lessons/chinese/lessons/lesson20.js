let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "zh-CN",
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
  utter.lang = "zh-CN";
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
question:"谁 (shéi) کدام است؟",
speak:"谁",
options:[
{text:"什么 (shénme)",image:"../../media/questions/what.webp"},
{text:"谁 (shéi)",image:"../../media/questions/who.webp"},
{text:"哪里 (nǎlǐ)",image:"../../media/questions/where.webp"},
{text:"什么时候 (shénme shíhou)",image:"../../media/questions/when.webp"}
],
answer:"谁 (shéi)"
},

{
type:"image",
question:"什么 (shénme) کدام است؟",
speak:"什么",
options:[
{text:"为什么 (wèishénme)",image:"../../media/questions/why.webp"},
{text:"什么 (shénme)",image:"../../media/questions/what.webp"},
{text:"谁 (shéi)",image:"../../media/questions/who.webp"},
{text:"哪里 (nǎlǐ)",image:"../../media/questions/where.webp"}
],
answer:"什么 (shénme)"
},

{
type:"image",
question:"哪里 (nǎlǐ) کدام است؟",
speak:"哪里",
options:[
{text:"什么 (shénme)",image:"../../media/questions/what.webp"},
{text:"哪里 (nǎlǐ)",image:"../../media/questions/where.webp"},
{text:"为什么 (wèishénme)",image:"../../media/questions/why.webp"},
{text:"谁 (shéi)",image:"../../media/questions/who.webp"}
],
answer:"哪里 (nǎlǐ)"
},

{
type:"image",
question:"什么时候 (shénme shíhou) کدام است؟",
speak:"什么时候",
options:[
{text:"哪里 (nǎlǐ)",image:"../../media/questions/where.webp"},
{text:"谁 (shéi)",image:"../../media/questions/who.webp"},
{text:"什么时候 (shénme shíhou)",image:"../../media/questions/when.webp"},
{text:"什么 (shénme)",image:"../../media/questions/what.webp"}
],
answer:"什么时候 (shénme shíhou)"
},

{
type:"image",
question:"为什么 (wèishénme) کدام است؟",
speak:"为什么",
options:[
{text:"什么时候 (shénme shíhou)",image:"../../media/questions/when.webp"},
{text:"什么 (shénme)",image:"../../media/questions/what.webp"},
{text:"谁 (shéi)",image:"../../media/questions/who.webp"},
{text:"为什么 (wèishénme)",image:"../../media/questions/why.webp"}
],
answer:"为什么 (wèishénme)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["什么 (shénme)","谁 (shéi)","哪里 (nǎlǐ)","什么时候 (shénme shíhou)"],
answer:"谁 (shéi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["为什么 (wèishénme)","什么 (shénme)","谁 (shéi)","哪里 (nǎlǐ)"],
answer:"什么 (shénme)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["什么 (shénme)","哪里 (nǎlǐ)","为什么 (wèishénme)","谁 (shéi)"],
answer:"哪里 (nǎlǐ)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["哪里 (nǎlǐ)","谁 (shéi)","什么时候 (shénme shíhou)","什么 (shénme)"],
answer:"什么时候 (shénme shíhou)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["什么时候 (shénme shíhou)","什么 (shénme)","谁 (shéi)","为什么 (wèishénme)"],
answer:"为什么 (wèishénme)"
},

/* AUDIO */

{
type:"audio",
speak:"谁",
question:"کدام کلمه را شنیدی؟",
options:["什么 (shénme)","谁 (shéi)","哪里 (nǎlǐ)","什么时候 (shénme shíhou)"],
answer:"谁 (shéi)"
},

{
type:"audio",
speak:"什么",
question:"کدام کلمه را شنیدی؟",
options:["为什么 (wèishénme)","什么 (shénme)","谁 (shéi)","哪里 (nǎlǐ)"],
answer:"什么 (shénme)"
},

{
type:"audio",
speak:"哪里",
question:"کدام کلمه را شنیدی؟",
options:["什么 (shénme)","哪里 (nǎlǐ)","为什么 (wèishénme)","谁 (shéi)"],
answer:"哪里 (nǎlǐ)"
},

{
type:"audio",
speak:"什么时候",
question:"کدام کلمه را شنیدی？",
options:["哪里 (nǎlǐ)","谁 (shéi)","什么时候 (shénme shíhou)","什么 (shénme)"],
answer:"什么时候 (shénme shíhou)"
},

{
type:"audio",
speak:"为什么",
question:"کدام کلمه را شنیدی؟",
options:["什么时候 (shénme shíhou)","什么 (shénme)","谁 (shéi)","为什么 (wèishénme)"],
answer:"为什么 (wèishénme)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"她是谁？",
question:"جمله چینی را بساز:",
text:"او کیست؟",
words:["她","是","谁"],
answer:["她","是","谁"]
},

{
type:"build-zh",
speak:"这是什么？",
question:"جمله چینی را بساز:",
text:"این چیست؟",
words:["这","是","什么"],
answer:["这","是","什么"]
},

{
type:"build-zh",
speak:"学校在哪里？",
question:"جمله چینی را بساز:",
text:"مدرسه کجاست؟",
words:["学校","在","哪里"],
answer:["学校","在","哪里"]
},

{
type:"build-zh",
speak:"课是什么时候？",
question:"جمله چینی را بساز:",
text:"کلاس کی است؟",
words:["课","是","什么","时候"],
answer:["课","是","什么","时候"]
},

{
type:"build-zh",
speak:"你为什么高兴？",
question:"جمله چینی را بساز:",
text:"چرا خوشحالی؟",
words:["你","为什么","高兴"],
answer:["你","为什么","高兴"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"她是谁？",
question:"ترجمه را بساز:",
text:"她是谁？",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"这是什么？",
question:"ترجمه را بساز:",
text:"这是什么？",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"学校在哪里？",
question:"ترجمه را بساز:",
text:"学校在哪里？",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"课是什么时候？",
question:"ترجمه را بساز:",
text:"课是什么时候？",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"你为什么高兴？",
question:"ترجمه را بساز:",
text:"你为什么高兴？",
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

  // BUILD CHINESE / FA

  else if (q.type === "build-zh" || q.type === "build-fa") {
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

  if (q.type === "build-zh") {
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