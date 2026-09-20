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
question:"wer کدام است؟",
speak:"wer",
options:[
{text:"was",image:"../../media/questions/what.webp"},
{text:"wer",image:"../../media/questions/who.webp"},
{text:"wo",image:"../../media/questions/where.webp"},
{text:"wann",image:"../../media/questions/when.webp"}
],
answer:"wer"
},

{
type:"image",
question:"was کدام است؟",
speak:"was",
options:[
{text:"warum",image:"../../media/questions/why.webp"},
{text:"was",image:"../../media/questions/what.webp"},
{text:"wer",image:"../../media/questions/who.webp"},
{text:"wo",image:"../../media/questions/where.webp"}
],
answer:"was"
},

{
type:"image",
question:"wo کدام است؟",
speak:"wo",
options:[
{text:"was",image:"../../media/questions/what.webp"},
{text:"wo",image:"../../media/questions/where.webp"},
{text:"warum",image:"../../media/questions/why.webp"},
{text:"wer",image:"../../media/questions/who.webp"}
],
answer:"wo"
},

{
type:"image",
question:"wann کدام است؟",
speak:"wann",
options:[
{text:"wo",image:"../../media/questions/where.webp"},
{text:"wer",image:"../../media/questions/who.webp"},
{text:"wann",image:"../../media/questions/when.webp"},
{text:"was",image:"../../media/questions/what.webp"}
],
answer:"wann"
},

{
type:"image",
question:"warum کدام است؟",
speak:"warum",
options:[
{text:"wann",image:"../../media/questions/when.webp"},
{text:"was",image:"../../media/questions/what.webp"},
{text:"wer",image:"../../media/questions/who.webp"},
{text:"warum",image:"../../media/questions/why.webp"}
],
answer:"warum"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["was","wer","wo","wann"],
answer:"wer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["warum","was","wer","wo"],
answer:"was"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["was","wo","warum","wer"],
answer:"wo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["wo","wer","wann","was"],
answer:"wann"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["wann","was","wer","warum"],
answer:"warum"
},

/* AUDIO */

{
type:"audio",
speak:"wer",
question:"کدام کلمه را شنیدی؟",
options:["was","wer","wo","wann"],
answer:"wer"
},

{
type:"audio",
speak:"was",
question:"کدام کلمه را شنیدی؟",
options:["warum","was","wer","wo"],
answer:"was"
},

{
type:"audio",
speak:"wo",
question:"کدام کلمه را شنیدی؟",
options:["was","wo","warum","wer"],
answer:"wo"
},

{
type:"audio",
speak:"wann",
question:"کدام کلمه را شنیدی؟",
options:["wo","wer","wann","was"],
answer:"wann"
},

{
type:"audio",
speak:"warum",
question:"کدام کلمه را شنیدی؟",
options:["wann","was","wer","warum"],
answer:"warum"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Wer ist sie?",
question:"جمله آلمانی را بساز:",
text:"او کیست؟",
words:["Wer","ist","sie"],
answer:["Wer","ist","sie"]
},

{
type:"build-de",
speak:"Was ist das?",
question:"جمله آلمانی را بساز:",
text:"این چیست؟",
words:["Was","ist","das"],
answer:["Was","ist","das"]
},

{
type:"build-de",
speak:"Wo ist die Schule?",
question:"جمله آلمانی را بساز:",
text:"مدرسه کجاست؟",
words:["Wo","ist","die","Schule"],
answer:["Wo","ist","die","Schule"]
},

{
type:"build-de",
speak:"Wann ist der Kurs?",
question:"جمله آلمانی را بساز:",
text:"کلاس کی است؟",
words:["Wann","ist","der","Kurs"],
answer:["Wann","ist","der","Kurs"]
},

{
type:"build-de",
speak:"Warum bist du glücklich?",
question:"جمله آلمانی را بساز:",
text:"چرا خوشحالی؟",
words:["Warum","bist","du","glücklich"],
answer:["Warum","bist","du","glücklich"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Wer ist sie?",
question:"ترجمه را بساز:",
text:"Wer ist sie?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"Was ist das?",
question:"ترجمه را بساز:",
text:"Was ist das?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"Wo ist die Schule?",
question:"ترجمه را بساز:",
text:"Wo ist die Schule?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"Wann ist der Kurs?",
question:"ترجمه را بساز:",
text:"Wann ist der Kurs?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"Warum bist du glücklich?",
question:"ترجمه را بساز:",
text:"Warum bist du glücklich?",
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