let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ru-RU",
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
  utter.lang = "ru-RU";
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

/* IMAGE - اعضای بدن */

{
type:"image",
question:"Голова کدام است؟",
speak:"голова",
options:[
{text:"рука",image:"../../media/body/hand.webp"},
{text:"голова",image:"../../media/body/head.webp"},
{text:"глаз",image:"../../media/body/eye.webp"},
{text:"нос",image:"../../media/body/nose.webp"}
],
answer:"голова"
},

{
type:"image",
question:"Рука کدام است؟",
speak:"рука",
options:[
{text:"глаз",image:"../../media/body/eye.webp"},
{text:"рука",image:"../../media/body/hand.webp"},
{text:"нога",image:"../../media/body/foot.webp"},
{text:"голова",image:"../../media/body/head.webp"}
],
answer:"рука"
},

{
type:"image",
question:"Глаз کدام است؟",
speak:"глаз",
options:[
{text:"голова",image:"../../media/body/head.webp"},
{text:"глаз",image:"../../media/body/eye.webp"},
{text:"нос",image:"../../media/body/nose.webp"},
{text:"рука",image:"../../media/body/hand.webp"}
],
answer:"глаз"
},

{
type:"image",
question:"Нога کدام است؟",
speak:"нога",
options:[
{text:"рука",image:"../../media/body/hand.webp"},
{text:"голова",image:"../../media/body/head.webp"},
{text:"нога",image:"../../media/body/foot.webp"},
{text:"глаз",image:"../../media/body/eye.webp"}
],
answer:"нога"
},

{
type:"image",
question:"Нос کدام است؟",
speak:"нос",
options:[
{text:"глаз",image:"../../media/body/eye.webp"},
{text:"нос",image:"../../media/body/nose.webp"},
{text:"голова",image:"../../media/body/head.webp"},
{text:"рука",image:"../../media/body/hand.webp"}
],
answer:"нос"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["рука","голова","глаз","нос"],
answer:"голова"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["глаз","рука","нога","голова"],
answer:"рука"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["голова","глаз","нос","рука"],
answer:"глаз"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["рука","нога","голова","глаз"],
answer:"нога"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["глаз","нос","рука","голова"],
answer:"нос"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"голова",
question:"کدام کلمه را شنیدی؟",
options:["рука","голова","глаз","нос"],
answer:"голова"
},

{
type:"audio",
speak:"рука",
question:"کدام کلمه را شنیدی؟",
options:["глаз","рука","нога","голова"],
answer:"рука"
},

{
type:"audio",
speak:"глаз",
question:"کدام کلمه را شنیدی؟",
options:["голова","глаз","нос","рука"],
answer:"глаз"
},

{
type:"audio",
speak:"нога",
question:"کدام کلمه را شنیدی؟",
options:["рука","нога","голова","глаз"],
answer:"нога"
},

{
type:"audio",
speak:"нос",
question:"کدام کلمه را شنیدی؟",
options:["глаз","нос","рука","голова"],
answer:"нос"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"У меня есть голова",
question:"جمله روسی را بساز:",
text:"من یک سر دارم",
words:["У","меня","есть","голова"],
answer:["У","меня","есть","голова"]
},

{
type:"build-ru",
speak:"У тебя есть рука",
question:"جمله روسی را بساز:",
text:"تو یک دست داری",
words:["У","тебя","есть","рука"],
answer:["У","тебя","есть","рука"]
},

{
type:"build-ru",
speak:"У неё два глаза",
question:"جمله روسی را بساز:",
text:"او دو چشم دارد",
words:["У","неё","два","глаза"],
answer:["У","неё","два","глаза"]
},

{
type:"build-ru",
speak:"У него есть нос",
question:"جمله روسی را بساز:",
text:"او یک بینی دارد",
words:["У","него","есть","нос"],
answer:["У","него","есть","нос"]
},

{
type:"build-ru",
speak:"Это моя нога",
question:"جمله روسی را بساز:",
text:"این پای من است",
words:["Это","моя","нога"],
answer:["Это","моя","нога"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"У меня есть голова",
question:"ترجمه را بساز:",
text:"У меня есть голова",
words:["دارم","سر","یک","من"],
answer:["من","یک","سر","دارم"]
},

{
type:"build-fa",
speak:"У тебя есть рука",
question:"ترجمه را بساز:",
text:"У тебя есть рука",
words:["یک","داری","دست","تو"],
answer:["تو","یک","دست","داری"]
},

{
type:"build-fa",
speak:"У неё два глаза",
question:"ترجمه را بساز:",
text:"У неё два глаза",
words:["دارد","او","دو","چشم"],
answer:["او","دو","چشم","دارد"]
},

{
type:"build-fa",
speak:"У него есть нос",
question:"ترجمه را بساز:",
text:"У него есть нос",
words:["دارد","یک","او","بینی"],
answer:["او","یک","بینی","دارد"]
},

{
type:"build-fa",
speak:"Это моя нога",
question:"ترجمه را بساز:",
text:"Это моя нога",
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

  // BUILD RUSSIAN / FA

  else if (q.type === "build-ru" || q.type === "build-fa") {
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

  if (q.type === "build-ru") {
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