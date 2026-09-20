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
question:"essen کدام است؟",
speak:"essen",
options:[
{text:"schlafen",image:"../../media/actions/sleep.webp"},
{text:"essen",image:"../../media/actions/eat.webp"},
{text:"gehen",image:"../../media/actions/walk.webp"},
{text:"lesen",image:"../../media/actions/read.webp"}
],
answer:"essen"
},

{
type:"image",
question:"schlafen کدام است؟",
speak:"schlafen",
options:[
{text:"schreiben",image:"../../media/actions/write.webp"},
{text:"schlafen",image:"../../media/actions/sleep.webp"},
{text:"essen",image:"../../media/actions/eat.webp"},
{text:"gehen",image:"../../media/actions/walk.webp"}
],
answer:"schlafen"
},

{
type:"image",
question:"gehen کدام است؟",
speak:"gehen",
options:[
{text:"essen",image:"../../media/actions/eat.webp"},
{text:"gehen",image:"../../media/actions/walk.webp"},
{text:"schreiben",image:"../../media/actions/write.webp"},
{text:"schlafen",image:"../../media/actions/sleep.webp"}
],
answer:"gehen"
},

{
type:"image",
question:"lesen کدام است؟",
speak:"lesen",
options:[
{text:"gehen",image:"../../media/actions/walk.webp"},
{text:"schlafen",image:"../../media/actions/sleep.webp"},
{text:"lesen",image:"../../media/actions/read.webp"},
{text:"essen",image:"../../media/actions/eat.webp"}
],
answer:"lesen"
},

{
type:"image",
question:"schreiben کدام است؟",
speak:"schreiben",
options:[
{text:"lesen",image:"../../media/actions/read.webp"},
{text:"essen",image:"../../media/actions/eat.webp"},
{text:"schlafen",image:"../../media/actions/sleep.webp"},
{text:"schreiben",image:"../../media/actions/write.webp"}
],
answer:"schreiben"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["schlafen","essen","gehen","lesen"],
answer:"essen"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["schreiben","schlafen","essen","gehen"],
answer:"schlafen"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["essen","gehen","schreiben","schlafen"],
answer:"gehen"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["gehen","schlafen","lesen","essen"],
answer:"lesen"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["lesen","essen","schlafen","schreiben"],
answer:"schreiben"
},

/* AUDIO */

{
type:"audio",
speak:"essen",
question:"کدام کلمه را شنیدی؟",
options:["schlafen","essen","gehen","lesen"],
answer:"essen"
},

{
type:"audio",
speak:"schlafen",
question:"کدام کلمه را شنیدی؟",
options:["schreiben","schlafen","essen","gehen"],
answer:"schlafen"
},

{
type:"audio",
speak:"gehen",
question:"کدام کلمه را شنیدی؟",
options:["essen","gehen","schreiben","schlafen"],
answer:"gehen"
},

{
type:"audio",
speak:"lesen",
question:"کدام کلمه را شنیدی؟",
options:["gehen","schlafen","lesen","essen"],
answer:"lesen"
},

{
type:"audio",
speak:"schreiben",
question:"کدام کلمه را شنیدی؟",
options:["lesen","essen","schlafen","schreiben"],
answer:"schreiben"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich esse Brot",
question:"جمله آلمانی را بساز:",
text:"من نان می‌خورم",
words:["Ich","esse","Brot"],
answer:["Ich","esse","Brot"]
},

{
type:"build-de",
speak:"Sie schläft in der Nacht",
question:"جمله آلمانی را بساز:",
text:"او شب می‌خوابد",
words:["Sie","schläft","in","der","Nacht"],
answer:["Sie","schläft","in","der","Nacht"]
},

{
type:"build-de",
speak:"Er geht zur Schule",
question:"جمله آلمانی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["Er","geht","zur","Schule"],
answer:["Er","geht","zur","Schule"]
},

{
type:"build-de",
speak:"Ich lese ein Buch",
question:"جمله آلمانی را بساز:",
text:"من یک کتاب می‌خوانم",
words:["Ich","lese","ein","Buch"],
answer:["Ich","lese","ein","Buch"]
},

{
type:"build-de",
speak:"Ich schreibe einen Brief",
question:"جمله آلمانی را بساز:",
text:"من یک نامه می‌نویسم",
words:["Ich","schreibe","einen","Brief"],
answer:["Ich","schreibe","einen","Brief"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich esse Brot",
question:"ترجمه را بساز:",
text:"Ich esse Brot",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Sie schläft in der Nacht",
question:"ترجمه را بساز:",
text:"Sie schläft in der Nacht",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"Er geht zur Schule",
question:"ترجمه را بساز:",
text:"Er geht zur Schule",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"Ich lese ein Buch",
question:"ترجمه را بساز:",
text:"Ich lese ein Buch",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"Ich schreibe einen Brief",
question:"ترجمه را بساز:",
text:"Ich schreibe einen Brief",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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