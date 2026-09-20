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
question:"das Brot کدام است؟",
speak:"das Brot",
options:[
{text:"der Reis",image:"../../media/food/rice.webp"},
{text:"das Brot",image:"../../media/food/bread.webp"},
{text:"das Fleisch",image:"../../media/food/meat.webp"},
{text:"das Ei",image:"../../media/food/egg.webp"}
],
answer:"das Brot"
},

{
type:"image",
question:"der Reis کدام است؟",
speak:"der Reis",
options:[
{text:"das Ei",image:"../../media/food/egg.webp"},
{text:"der Reis",image:"../../media/food/rice.webp"},
{text:"die Milch",image:"../../media/food/milk.webp"},
{text:"das Brot",image:"../../media/food/bread.webp"}
],
answer:"der Reis"
},

{
type:"image",
question:"das Fleisch کدام است؟",
speak:"das Fleisch",
options:[
{text:"das Brot",image:"../../media/food/bread.webp"},
{text:"das Fleisch",image:"../../media/food/meat.webp"},
{text:"die Milch",image:"../../media/food/milk.webp"},
{text:"der Reis",image:"../../media/food/rice.webp"}
],
answer:"das Fleisch"
},

{
type:"image",
question:"das Ei کدام است؟",
speak:"das Ei",
options:[
{text:"das Fleisch",image:"../../media/food/meat.webp"},
{text:"der Reis",image:"../../media/food/rice.webp"},
{text:"das Ei",image:"../../media/food/egg.webp"},
{text:"das Brot",image:"../../media/food/bread.webp"}
],
answer:"das Ei"
},

{
type:"image",
question:"die Milch کدام است؟",
speak:"die Milch",
options:[
{text:"das Ei",image:"../../media/food/egg.webp"},
{text:"das Brot",image:"../../media/food/bread.webp"},
{text:"der Reis",image:"../../media/food/rice.webp"},
{text:"die Milch",image:"../../media/food/milk.webp"}
],
answer:"die Milch"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["der Reis","das Brot","das Fleisch","das Ei"],
answer:"das Brot"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["das Ei","der Reis","die Milch","das Brot"],
answer:"der Reis"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["das Brot","das Fleisch","die Milch","der Reis"],
answer:"das Fleisch"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["das Fleisch","der Reis","das Ei","das Brot"],
answer:"das Ei"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["das Ei","das Brot","der Reis","die Milch"],
answer:"die Milch"
},

/* AUDIO */

{
type:"audio",
speak:"das Brot",
question:"کدام کلمه را شنیدی؟",
options:["der Reis","das Brot","das Fleisch","das Ei"],
answer:"das Brot"
},

{
type:"audio",
speak:"der Reis",
question:"کدام کلمه را شنیدی؟",
options:["das Ei","der Reis","die Milch","das Brot"],
answer:"der Reis"
},

{
type:"audio",
speak:"das Fleisch",
question:"کدام کلمه را شنیدی؟",
options:["das Brot","das Fleisch","die Milch","der Reis"],
answer:"das Fleisch"
},

{
type:"audio",
speak:"das Ei",
question:"کدام کلمه را شنیدی؟",
options:["das Fleisch","der Reis","das Ei","das Brot"],
answer:"das Ei"
},

{
type:"audio",
speak:"die Milch",
question:"کدام کلمه را شنیدی؟",
options:["das Ei","das Brot","der Reis","die Milch"],
answer:"die Milch"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich mag Brot",
question:"جمله آلمانی را بساز:",
text:"من نان دوست دارم",
words:["Ich","mag","Brot"],
answer:["Ich","mag","Brot"]
},

{
type:"build-de",
speak:"Sie isst Reis",
question:"جمله آلمانی را بساز:",
text:"او برنج می‌خورد",
words:["Sie","isst","Reis"],
answer:["Sie","isst","Reis"]
},

{
type:"build-de",
speak:"Ich habe Fleisch",
question:"جمله آلمانی را بساز:",
text:"من گوشت دارم",
words:["Ich","habe","Fleisch"],
answer:["Ich","habe","Fleisch"]
},

{
type:"build-de",
speak:"Er isst ein Ei",
question:"جمله آلمانی را بساز:",
text:"او یک تخم‌مرغ می‌خورد",
words:["Er","isst","ein","Ei"],
answer:["Er","isst","ein","Ei"]
},

{
type:"build-de",
speak:"Ich trinke Milch",
question:"جمله آلمانی را بساز:",
text:"من شیر می‌نوشم",
words:["Ich","trinke","Milch"],
answer:["Ich","trinke","Milch"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich mag Brot",
question:"ترجمه را بساز:",
text:"Ich mag Brot",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"Sie isst Reis",
question:"ترجمه را بساز:",
text:"Sie isst Reis",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"Ich habe Fleisch",
question:"ترجمه را بساز:",
text:"Ich habe Fleisch",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"Er isst ein Ei",
question:"ترجمه را بساز:",
text:"Er isst ein Ei",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"Ich trinke Milch",
question:"ترجمه را بساز:",
text:"Ich trinke Milch",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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