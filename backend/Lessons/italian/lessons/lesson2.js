let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "it-IT",
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
  utter.lang = "it-IT";
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
question:"la testa کدام است؟",
speak:"la testa",
options:[
{text:"la mano",image:"../../media/body/hand.webp"},
{text:"la testa",image:"../../media/body/head.webp"},
{text:"l'occhio",image:"../../media/body/eye.webp"},
{text:"il naso",image:"../../media/body/nose.webp"}
],
answer:"la testa"
},

{
type:"image",
question:"la mano کدام است؟",
speak:"la mano",
options:[
{text:"l'occhio",image:"../../media/body/eye.webp"},
{text:"la mano",image:"../../media/body/hand.webp"},
{text:"il piede",image:"../../media/body/foot.webp"},
{text:"la testa",image:"../../media/body/head.webp"}
],
answer:"la mano"
},

{
type:"image",
question:"l'occhio کدام است؟",
speak:"l'occhio",
options:[
{text:"la testa",image:"../../media/body/head.webp"},
{text:"l'occhio",image:"../../media/body/eye.webp"},
{text:"il naso",image:"../../media/body/nose.webp"},
{text:"la mano",image:"../../media/body/hand.webp"}
],
answer:"l'occhio"
},

{
type:"image",
question:"il piede کدام است؟",
speak:"il piede",
options:[
{text:"la mano",image:"../../media/body/hand.webp"},
{text:"la testa",image:"../../media/body/head.webp"},
{text:"il piede",image:"../../media/body/foot.webp"},
{text:"l'occhio",image:"../../media/body/eye.webp"}
],
answer:"il piede"
},

{
type:"image",
question:"il naso کدام است؟",
speak:"il naso",
options:[
{text:"l'occhio",image:"../../media/body/eye.webp"},
{text:"il naso",image:"../../media/body/nose.webp"},
{text:"la testa",image:"../../media/body/head.webp"},
{text:"la mano",image:"../../media/body/hand.webp"}
],
answer:"il naso"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["la mano","la testa","l'occhio","il naso"],
answer:"la testa"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["l'occhio","la mano","il piede","la testa"],
answer:"la mano"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["la testa","l'occhio","il naso","la mano"],
answer:"l'occhio"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["la mano","il piede","la testa","l'occhio"],
answer:"il piede"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["l'occhio","il naso","la mano","la testa"],
answer:"il naso"
},

/* AUDIO */

{
type:"audio",
speak:"la testa",
question:"کدام کلمه را شنیدی؟",
options:["la mano","la testa","l'occhio","il naso"],
answer:"la testa"
},

{
type:"audio",
speak:"la mano",
question:"کدام کلمه را شنیدی؟",
options:["l'occhio","la mano","il piede","la testa"],
answer:"la mano"
},

{
type:"audio",
speak:"l'occhio",
question:"کدام کلمه را شنیدی؟",
options:["la testa","l'occhio","il naso","la mano"],
answer:"l'occhio"
},

{
type:"audio",
speak:"il piede",
question:"کدام کلمه را شنیدی؟",
options:["la mano","il piede","la testa","l'occhio"],
answer:"il piede"
},

{
type:"audio",
speak:"il naso",
question:"کدام کلمه را شنیدی؟",
options:["l'occhio","il naso","la mano","la testa"],
answer:"il naso"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Io ho una testa",
question:"جمله ایتالیایی را بساز:",
text:"من یک سر دارم",
words:["Io","ho","una","testa"],
answer:["Io","ho","una","testa"]
},

{
type:"build-it",
speak:"Tu hai una mano",
question:"جمله ایتالیایی را بساز:",
text:"تو یک دست داری",
words:["Tu","hai","una","mano"],
answer:["Tu","hai","una","mano"]
},

{
type:"build-it",
speak:"Lei ha due occhi",
question:"جمله ایتالیایی را بساز:",
text:"او دو چشم دارد",
words:["Lei","ha","due","occhi"],
answer:["Lei","ha","due","occhi"]
},

{
type:"build-it",
speak:"Lui ha un naso",
question:"جمله ایتالیایی را بساز:",
text:"او یک بینی دارد",
words:["Lui","ha","un","naso"],
answer:["Lui","ha","un","naso"]
},

{
type:"build-it",
speak:"Questo è il mio piede",
question:"جمله ایتالیایی را بساز:",
text:"این پای من است",
words:["Questo","è","il","mio","piede"],
answer:["Questo","è","il","mio","piede"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Io ho una testa",
question:"ترجمه را بساز:",
text:"Io ho una testa",
words:["دارم","سر","یک","من"],
answer:["من","یک","سر","دارم"]
},

{
type:"build-fa",
speak:"Tu hai una mano",
question:"ترجمه را بساز:",
text:"Tu hai una mano",
words:["یک","داری","دست","تو"],
answer:["تو","یک","دست","داری"]
},

{
type:"build-fa",
speak:"Lei ha due occhi",
question:"ترجمه را بساز:",
text:"Lei ha due occhi",
words:["دارد","او","دو","چشم"],
answer:["او","دو","چشم","دارد"]
},

{
type:"build-fa",
speak:"Lui ha un naso",
question:"ترجمه را بساز:",
text:"Lui ha un naso",
words:["دارد","یک","او","بینی"],
answer:["او","یک","بینی","دارد"]
},

{
type:"build-fa",
speak:"Questo è il mio piede",
question:"ترجمه را بساز:",
text:"Questo è il mio piede",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
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

  // BUILD ITALIAN / FA

  else if (q.type === "build-it" || q.type === "build-fa") {
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

  if (q.type === "build-it") {
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