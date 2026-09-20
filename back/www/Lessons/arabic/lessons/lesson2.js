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
question:"رأس کدام است؟",
speak:"رأس",
options:[
{text:"ید",image:"../../media/body/hand.webp"},
{text:"رأس",image:"../../media/body/head.webp"},
{text:"عين",image:"../../media/body/eye.webp"},
{text:"أنف",image:"../../media/body/nose.webp"}
],
answer:"رأس"
},

{
type:"image",
question:"ید کدام است؟",
speak:"ید",
options:[
{text:"عين",image:"../../media/body/eye.webp"},
{text:"ید",image:"../../media/body/hand.webp"},
{text:"قدم",image:"../../media/body/foot.webp"},
{text:"رأس",image:"../../media/body/head.webp"}
],
answer:"ید"
},

{
type:"image",
question:"عين کدام است؟",
speak:"عين",
options:[
{text:"رأس",image:"../../media/body/head.webp"},
{text:"عين",image:"../../media/body/eye.webp"},
{text:"أنف",image:"../../media/body/nose.webp"},
{text:"ید",image:"../../media/body/hand.webp"}
],
answer:"عين"
},

{
type:"image",
question:"قدم کدام است؟",
speak:"قدم",
options:[
{text:"ید",image:"../../media/body/hand.webp"},
{text:"رأس",image:"../../media/body/head.webp"},
{text:"قدم",image:"../../media/body/foot.webp"},
{text:"عين",image:"../../media/body/eye.webp"}
],
answer:"قدم"
},

{
type:"image",
question:"أنف کدام است؟",
speak:"أنف",
options:[
{text:"عين",image:"../../media/body/eye.webp"},
{text:"أنف",image:"../../media/body/nose.webp"},
{text:"رأس",image:"../../media/body/head.webp"},
{text:"ید",image:"../../media/body/hand.webp"}
],
answer:"أنف"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["ید","رأس","عين","أنف"],
answer:"رأس"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["عين","ید","قدم","رأس"],
answer:"ید"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["رأس","عين","أنف","ید"],
answer:"عين"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["ید","قدم","رأس","عين"],
answer:"قدم"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["عين","أنف","ید","رأس"],
answer:"أنف"
},

/* AUDIO */

{
type:"audio",
speak:"رأس",
question:"کدام کلمه را شنیدی؟",
options:["ید","رأس","عين","أنف"],
answer:"رأس"
},

{
type:"audio",
speak:"ید",
question:"کدام کلمه را شنیدی؟",
options:["عين","ید","قدم","رأس"],
answer:"ید"
},

{
type:"audio",
speak:"عين",
question:"کدام کلمه را شنیدی؟",
options:["رأس","عين","أنف","ید"],
answer:"عين"
},

{
type:"audio",
speak:"قدم",
question:"کدام کلمه را شنیدی؟",
options:["ید","قدم","رأس","عين"],
answer:"قدم"
},

{
type:"audio",
speak:"أنف",
question:"کدام کلمه را شنیدی؟",
options:["عين","أنف","ید","رأس"],
answer:"أنف"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"لي رأس",
question:"جمله عربی را بساز:",
text:"من یک سر دارم",
words:["لي","رأس"],
answer:["لي","رأس"]
},

{
type:"build-ar",
speak:"لك يد",
question:"جمله عربی را بساز:",
text:"تو یک دست داری",
words:["لك","يد"],
answer:["لك","يد"]
},

{
type:"build-ar",
speak:"لها عينان",
question:"جمله عربی را بساز:",
text:"او دو چشم دارد",
words:["لها","عينان"],
answer:["لها","عينان"]
},

{
type:"build-ar",
speak:"له أنف",
question:"جمله عربی را بساز:",
text:"او یک بینی دارد",
words:["له","أنف"],
answer:["له","أنف"]
},

{
type:"build-ar",
speak:"هذه قدمي",
question:"جمله عربی را بساز:",
text:"این پای من است",
words:["هذه","قدمي"],
answer:["هذه","قدمي"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"لي رأس",
question:"ترجمه را بساز:",
text:"لي رأس",
words:["دارم","سر","من"],
answer:["من","سر","دارم"]
},

{
type:"build-fa",
speak:"لك يد",
question:"ترجمه را بساز:",
text:"لك يد",
words:["داری","دست","تو"],
answer:["تو","دست","داری"]
},

{
type:"build-fa",
speak:"لها عينان",
question:"ترجمه را بساز:",
text:"لها عينان",
words:["دارد","او","دو","چشم"],
answer:["او","دو","چشم","دارد"]
},

{
type:"build-fa",
speak:"له أنف",
question:"ترجمه را بساز:",
text:"له أنف",
words:["دارد","بینی","او"],
answer:["او","بینی","دارد"]
},

{
type:"build-fa",
speak:"هذه قدمي",
question:"ترجمه را بساز:",
text:"هذه قدمي",
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