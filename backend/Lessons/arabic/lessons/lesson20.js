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
question:"من کدام است؟",
speak:"من",
options:[
{text:"ما",image:"../../media/questions/what.webp"},
{text:"من",image:"../../media/questions/who.webp"},
{text:"أين",image:"../../media/questions/where.webp"},
{text:"متى",image:"../../media/questions/when.webp"}
],
answer:"من"
},

{
type:"image",
question:"ما کدام است؟",
speak:"ما",
options:[
{text:"لماذا",image:"../../media/questions/why.webp"},
{text:"ما",image:"../../media/questions/what.webp"},
{text:"من",image:"../../media/questions/who.webp"},
{text:"أين",image:"../../media/questions/where.webp"}
],
answer:"ما"
},

{
type:"image",
question:"أين کدام است؟",
speak:"أين",
options:[
{text:"ما",image:"../../media/questions/what.webp"},
{text:"أين",image:"../../media/questions/where.webp"},
{text:"لماذا",image:"../../media/questions/why.webp"},
{text:"من",image:"../../media/questions/who.webp"}
],
answer:"أين"
},

{
type:"image",
question:"متى کدام است؟",
speak:"متى",
options:[
{text:"أين",image:"../../media/questions/where.webp"},
{text:"من",image:"../../media/questions/who.webp"},
{text:"متى",image:"../../media/questions/when.webp"},
{text:"ما",image:"../../media/questions/what.webp"}
],
answer:"متى"
},

{
type:"image",
question:"لماذا کدام است؟",
speak:"لماذا",
options:[
{text:"متى",image:"../../media/questions/when.webp"},
{text:"ما",image:"../../media/questions/what.webp"},
{text:"من",image:"../../media/questions/who.webp"},
{text:"لماذا",image:"../../media/questions/why.webp"}
],
answer:"لماذا"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["ما","من","أين","متى"],
answer:"من"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["لماذا","ما","من","أين"],
answer:"ما"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["ما","أين","لماذا","من"],
answer:"أين"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["أين","من","متى","ما"],
answer:"متى"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["متى","ما","من","لماذا"],
answer:"لماذا"
},

/* AUDIO */

{
type:"audio",
speak:"من",
question:"کدام کلمه را شنیدی؟",
options:["ما","من","أين","متى"],
answer:"من"
},

{
type:"audio",
speak:"ما",
question:"کدام کلمه را شنیدی؟",
options:["لماذا","ما","من","أين"],
answer:"ما"
},

{
type:"audio",
speak:"أين",
question:"کدام کلمه را شنیدی؟",
options:["ما","أين","لماذا","من"],
answer:"أين"
},

{
type:"audio",
speak:"متى",
question:"کدام کلمه را شنیدی؟",
options:["أين","من","متى","ما"],
answer:"متى"
},

{
type:"audio",
speak:"لماذا",
question:"کدام کلمه را شنیدی؟",
options:["متى","ما","من","لماذا"],
answer:"لماذا"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"من هي؟",
question:"جمله عربی را بساز:",
text:"او کیست؟",
words:["من","هي"],
answer:["من","هي"]
},

{
type:"build-ar",
speak:"ما هذا؟",
question:"جمله عربی را بساز:",
text:"این چیست؟",
words:["ما","هذا"],
answer:["ما","هذا"]
},

{
type:"build-ar",
speak:"أين المدرسة؟",
question:"جمله عربی را بساز:",
text:"مدرسه کجاست؟",
words:["أين","المدرسة"],
answer:["أين","المدرسة"]
},

{
type:"build-ar",
speak:"متى الدرس؟",
question:"جمله عربی را بساز:",
text:"کلاس کی است؟",
words:["متى","الدرس"],
answer:["متى","الدرس"]
},

{
type:"build-ar",
speak:"لماذا أنت سعيد؟",
question:"جمله عربی را بساز:",
text:"چرا خوشحالی؟",
words:["لماذا","أنت","سعيد"],
answer:["لماذا","أنت","سعيد"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"من هي؟",
question:"ترجمه را بساز:",
text:"من هي؟",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"ما هذا؟",
question:"ترجمه را بساز:",
text:"ما هذا؟",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"أين المدرسة؟",
question:"ترجمه را بساز:",
text:"أين المدرسة؟",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"متى الدرس؟",
question:"ترجمه را بساز:",
text:"متى الدرس؟",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"لماذا أنت سعيد؟",
question:"ترجمه را بساز:",
text:"لماذا أنت سعيد؟",
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