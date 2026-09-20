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
question:"der Mann کدام است؟",
speak:"der Mann",
options:[
{text:"die Frau",image:"../../media/people/woman.webp"},
{text:"der Mann",image:"../../media/people/man.webp"},
{text:"der Junge",image:"../../media/people/boy.webp"},
{text:"das Mädchen",image:"../../media/people/girl.webp"}
],
answer:"der Mann"
},

{
type:"image",
question:"die Frau کدام است؟",
speak:"die Frau",
options:[
{text:"das Mädchen",image:"../../media/people/girl.webp"},
{text:"die Frau",image:"../../media/people/woman.webp"},
{text:"der Junge",image:"../../media/people/boy.webp"},
{text:"der Mann",image:"../../media/people/man.webp"}
],
answer:"die Frau"
},

{
type:"image",
question:"der Junge کدام است؟",
speak:"der Junge",
options:[
{text:"der Mann",image:"../../media/people/man.webp"},
{text:"der Junge",image:"../../media/people/boy.webp"},
{text:"das Baby",image:"../../media/people/baby.webp"},
{text:"das Mädchen",image:"../../media/people/girl.webp"}
],
answer:"der Junge"
},

{
type:"image",
question:"das Mädchen کدام است؟",
speak:"das Mädchen",
options:[
{text:"der Junge",image:"../../media/people/boy.webp"},
{text:"der Mann",image:"../../media/people/man.webp"},
{text:"das Mädchen",image:"../../media/people/girl.webp"},
{text:"das Baby",image:"../../media/people/baby.webp"}
],
answer:"das Mädchen"
},

{
type:"image",
question:"das Baby کدام است؟",
speak:"das Baby",
options:[
{text:"das Mädchen",image:"../../media/people/girl.webp"},
{text:"der Junge",image:"../../media/people/boy.webp"},
{text:"der Mann",image:"../../media/people/man.webp"},
{text:"das Baby",image:"../../media/people/baby.webp"}
],
answer:"das Baby"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["der Junge","der Mann","die Frau","das Mädchen"],
answer:"der Mann"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["die Frau","das Mädchen","das Baby","der Mann"],
answer:"die Frau"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["der Junge","der Mann","das Baby","das Mädchen"],
answer:"der Junge"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["das Mädchen","die Frau","der Junge","das Baby"],
answer:"das Mädchen"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["das Baby","der Junge","das Mädchen","der Mann"],
answer:"das Baby"
},

/* AUDIO */

{
type:"audio",
speak:"der Mann",
question:"کدام کلمه را شنیدی؟",
options:["der Mann","der Junge","die Frau","das Mädchen"],
answer:"der Mann"
},

{
type:"audio",
speak:"die Frau",
question:"کدام کلمه را شنیدی؟",
options:["das Mädchen","die Frau","der Junge","der Mann"],
answer:"die Frau"
},

{
type:"audio",
speak:"der Junge",
question:"کدام کلمه را شنیدی؟",
options:["der Junge","der Mann","das Baby","das Mädchen"],
answer:"der Junge"
},

{
type:"audio",
speak:"das Mädchen",
question:"کدام کلمه را شنیدی؟",
options:["der Junge","die Frau","das Mädchen","das Baby"],
answer:"das Mädchen"
},

{
type:"audio",
speak:"das Baby",
question:"کدام کلمه را شنیدی؟",
options:["das Baby","der Junge","der Mann","das Mädchen"],
answer:"das Baby"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Das ist ein Mann",
question:"جمله آلمانی را بساز:",
text:"این یک مرد است",
words:["Das","ist","ein","Mann"],
answer:["Das","ist","ein","Mann"]
},

{
type:"build-de",
speak:"Das ist eine Frau",
question:"جمله آلمانی را بساز:",
text:"این یک زن است",
words:["Das","ist","eine","Frau"],
answer:["Das","ist","eine","Frau"]
},

{
type:"build-de",
speak:"Das ist ein Junge",
question:"جمله آلمانی را بساز:",
text:"این یک پسر است",
words:["Das","ist","ein","Junge"],
answer:["Das","ist","ein","Junge"]
},

{
type:"build-de",
speak:"Das ist ein Mädchen",
question:"جمله آلمانی را بساز:",
text:"این یک دختر است",
words:["Das","ist","ein","Mädchen"],
answer:["Das","ist","ein","Mädchen"]
},

{
type:"build-de",
speak:"Das Baby ist klein",
question:"جمله آلمانی را بساز:",
text:"نوزاد کوچک است",
words:["Das","Baby","ist","klein"],
answer:["Das","Baby","ist","klein"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Das ist ein Mann",
question:"ترجمه را بساز:",
text:"Das ist ein Mann",
words:["است","مرد","یک","این"],
answer:["این","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Das ist eine Frau",
question:"ترجمه را بساز:",
text:"Das ist eine Frau",
words:["یک","است","زن","این"],
answer:["این","یک","زن","است"]
},

{
type:"build-fa",
speak:"Das ist ein Junge",
question:"ترجمه را بساز:",
text:"Das ist ein Junge",
words:["است","پسر","یک","این"],
answer:["این","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Das ist ein Mädchen",
question:"ترجمه را بساز:",
text:"Das ist ein Mädchen",
words:["است","دختر","یک","این"],
answer:["این","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Das Baby ist klein",
question:"ترجمه را بساز:",
text:"Das Baby ist klein",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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