let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "tr-TR",
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
  utter.lang = "tr-TR";
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

/* IMAGE - سوالی‌ها */

{
type:"image",
question:"Kim کدام است؟",
speak:"kim",
options:[
{text:"ne",image:"../../media/questions/what.webp"},
{text:"kim",image:"../../media/questions/who.webp"},
{text:"nerede",image:"../../media/questions/where.webp"},
{text:"ne zaman",image:"../../media/questions/when.webp"}
],
answer:"kim"
},

{
type:"image",
question:"Ne کدام است؟",
speak:"ne",
options:[
{text:"neden",image:"../../media/questions/why.webp"},
{text:"ne",image:"../../media/questions/what.webp"},
{text:"kim",image:"../../media/questions/who.webp"},
{text:"nerede",image:"../../media/questions/where.webp"}
],
answer:"ne"
},

{
type:"image",
question:"Nerede کدام است؟",
speak:"nerede",
options:[
{text:"ne",image:"../../media/questions/what.webp"},
{text:"nerede",image:"../../media/questions/where.webp"},
{text:"neden",image:"../../media/questions/why.webp"},
{text:"kim",image:"../../media/questions/who.webp"}
],
answer:"nerede"
},

{
type:"image",
question:"Ne zaman کدام است؟",
speak:"ne zaman",
options:[
{text:"nerede",image:"../../media/questions/where.webp"},
{text:"kim",image:"../../media/questions/who.webp"},
{text:"ne zaman",image:"../../media/questions/when.webp"},
{text:"ne",image:"../../media/questions/what.webp"}
],
answer:"ne zaman"
},

{
type:"image",
question:"Neden کدام است؟",
speak:"neden",
options:[
{text:"ne zaman",image:"../../media/questions/when.webp"},
{text:"ne",image:"../../media/questions/what.webp"},
{text:"kim",image:"../../media/questions/who.webp"},
{text:"neden",image:"../../media/questions/why.webp"}
],
answer:"neden"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["ne","kim","nerede","ne zaman"],
answer:"kim"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["neden","ne","kim","nerede"],
answer:"ne"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["ne","nerede","neden","kim"],
answer:"nerede"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["nerede","kim","ne zaman","ne"],
answer:"ne zaman"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["ne zaman","ne","kim","neden"],
answer:"neden"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"kim",
question:"کدام کلمه را شنیدی؟",
options:["ne","kim","nerede","ne zaman"],
answer:"kim"
},

{
type:"audio",
speak:"ne",
question:"کدام کلمه را شنیدی؟",
options:["neden","ne","kim","nerede"],
answer:"ne"
},

{
type:"audio",
speak:"nerede",
question:"کدام کلمه را شنیدی؟",
options:["ne","nerede","neden","kim"],
answer:"nerede"
},

{
type:"audio",
speak:"ne zaman",
question:"کدام کلمه را شنیدی؟",
options:["nerede","kim","ne zaman","ne"],
answer:"ne zaman"
},

{
type:"audio",
speak:"neden",
question:"کدام کلمه را شنیدی؟",
options:["ne zaman","ne","kim","neden"],
answer:"neden"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"O kim?",
question:"جمله ترکی را بساز:",
text:"او کیست؟",
words:["O","kim"],
answer:["O","kim"]
},

{
type:"build-tr",
speak:"Bu ne?",
question:"جمله ترکی را بساز:",
text:"این چیست؟",
words:["Bu","ne"],
answer:["Bu","ne"]
},

{
type:"build-tr",
speak:"Okul nerede?",
question:"جمله ترکی را بساز:",
text:"مدرسه کجاست؟",
words:["Okul","nerede"],
answer:["Okul","nerede"]
},

{
type:"build-tr",
speak:"Ders ne zaman?",
question:"جمله ترکی را بساز:",
text:"کلاس کی است؟",
words:["Ders","ne","zaman"],
answer:["Ders","ne","zaman"]
},

{
type:"build-tr",
speak:"Neden mutlusun?",
question:"جمله ترکی را بساز:",
text:"چرا خوشحالی؟",
words:["Neden","mutlusun"],
answer:["Neden","mutlusun"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"O kim?",
question:"ترجمه را بساز:",
text:"O kim?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"Bu ne?",
question:"ترجمه را بساز:",
text:"Bu ne?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"Okul nerede?",
question:"ترجمه را بساز:",
text:"Okul nerede?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"Ders ne zaman?",
question:"ترجمه را بساز:",
text:"Ders ne zaman?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"Neden mutlusun?",
question:"ترجمه را بساز:",
text:"Neden mutlusun?",
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

  // BUILD TURKISH / FA

  else if (q.type === "build-tr" || q.type === "build-fa") {
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

  if (q.type === "build-tr") {
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