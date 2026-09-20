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
question:"das Hemd کدام است؟",
speak:"das Hemd",
options:[
{text:"die Hose",image:"../../media/clothes/pants.webp"},
{text:"das Hemd",image:"../../media/clothes/shirt.webp"},
{text:"der Hut",image:"../../media/clothes/hat.webp"},
{text:"das Kleid",image:"../../media/clothes/dress.webp"}
],
answer:"das Hemd"
},

{
type:"image",
question:"die Hose کدام است؟",
speak:"die Hose",
options:[
{text:"das Kleid",image:"../../media/clothes/dress.webp"},
{text:"die Hose",image:"../../media/clothes/pants.webp"},
{text:"die Schuhe",image:"../../media/clothes/shoes.webp"},
{text:"das Hemd",image:"../../media/clothes/shirt.webp"}
],
answer:"die Hose"
},

{
type:"image",
question:"die Schuhe کدام است؟",
speak:"die Schuhe",
options:[
{text:"das Hemd",image:"../../media/clothes/shirt.webp"},
{text:"die Schuhe",image:"../../media/clothes/shoes.webp"},
{text:"der Hut",image:"../../media/clothes/hat.webp"},
{text:"die Hose",image:"../../media/clothes/pants.webp"}
],
answer:"die Schuhe"
},

{
type:"image",
question:"der Hut کدام است؟",
speak:"der Hut",
options:[
{text:"die Schuhe",image:"../../media/clothes/shoes.webp"},
{text:"die Hose",image:"../../media/clothes/pants.webp"},
{text:"der Hut",image:"../../media/clothes/hat.webp"},
{text:"das Hemd",image:"../../media/clothes/shirt.webp"}
],
answer:"der Hut"
},

{
type:"image",
question:"das Kleid کدام است؟",
speak:"das Kleid",
options:[
{text:"der Hut",image:"../../media/clothes/hat.webp"},
{text:"das Hemd",image:"../../media/clothes/shirt.webp"},
{text:"die Hose",image:"../../media/clothes/pants.webp"},
{text:"das Kleid",image:"../../media/clothes/dress.webp"}
],
answer:"das Kleid"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["die Hose","das Hemd","der Hut","das Kleid"],
answer:"das Hemd"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["das Kleid","die Hose","die Schuhe","das Hemd"],
answer:"die Hose"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["das Hemd","die Schuhe","der Hut","die Hose"],
answer:"die Schuhe"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["die Schuhe","die Hose","der Hut","das Hemd"],
answer:"der Hut"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["der Hut","das Hemd","die Hose","das Kleid"],
answer:"das Kleid"
},

/* AUDIO */

{
type:"audio",
speak:"das Hemd",
question:"کدام کلمه را شنیدی؟",
options:["die Hose","das Hemd","der Hut","das Kleid"],
answer:"das Hemd"
},

{
type:"audio",
speak:"die Hose",
question:"کدام کلمه را شنیدی؟",
options:["das Kleid","die Hose","die Schuhe","das Hemd"],
answer:"die Hose"
},

{
type:"audio",
speak:"die Schuhe",
question:"کدام کلمه را شنیدی؟",
options:["das Hemd","die Schuhe","der Hut","die Hose"],
answer:"die Schuhe"
},

{
type:"audio",
speak:"der Hut",
question:"کدام کلمه را شنیدی؟",
options:["die Schuhe","die Hose","der Hut","das Hemd"],
answer:"der Hut"
},

{
type:"audio",
speak:"das Kleid",
question:"کدام کلمه را شنیدی؟",
options:["der Hut","das Hemd","die Hose","das Kleid"],
answer:"das Kleid"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Das ist ein Hemd",
question:"جمله آلمانی را بساز:",
text:"این یک پیراهن است",
words:["Das","ist","ein","Hemd"],
answer:["Das","ist","ein","Hemd"]
},

{
type:"build-de",
speak:"Das ist ein Hut",
question:"جمله آلمانی را بساز:",
text:"این یک کلاه است",
words:["Das","ist","ein","Hut"],
answer:["Das","ist","ein","Hut"]
},

{
type:"build-de",
speak:"Das sind Schuhe",
question:"جمله آلمانی را بساز:",
text:"این کفش‌ها هستند",
words:["Das","sind","Schuhe"],
answer:["Das","sind","Schuhe"]
},

{
type:"build-de",
speak:"Das sind Hosen",
question:"جمله آلمانی را بساز:",
text:"این شلوارها هستند",
words:["Das","sind","Hosen"],
answer:["Das","sind","Hosen"]
},

{
type:"build-de",
speak:"Das ist ein Kleid",
question:"جمله آلمانی را بساز:",
text:"این یک لباس است",
words:["Das","ist","ein","Kleid"],
answer:["Das","ist","ein","Kleid"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Das ist ein Hemd",
question:"ترجمه را بساز:",
text:"Das ist ein Hemd",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"Das ist ein Hut",
question:"ترجمه را بساز:",
text:"Das ist ein Hut",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"Das sind Schuhe",
question:"ترجمه را بساز:",
text:"Das sind Schuhe",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"Das sind Hosen",
question:"ترجمه را بساز:",
text:"Das sind Hosen",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"Das ist ein Kleid",
question:"ترجمه را بساز:",
text:"Das ist ein Kleid",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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