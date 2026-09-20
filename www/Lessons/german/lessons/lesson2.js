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
question:"der Kopf کدام است؟",
speak:"der Kopf",
options:[
{text:"die Hand",image:"../../media/body/hand.webp"},
{text:"der Kopf",image:"../../media/body/head.webp"},
{text:"das Auge",image:"../../media/body/eye.webp"},
{text:"die Nase",image:"../../media/body/nose.webp"}
],
answer:"der Kopf"
},

{
type:"image",
question:"die Hand کدام است؟",
speak:"die Hand",
options:[
{text:"das Auge",image:"../../media/body/eye.webp"},
{text:"die Hand",image:"../../media/body/hand.webp"},
{text:"der Fuß",image:"../../media/body/foot.webp"},
{text:"der Kopf",image:"../../media/body/head.webp"}
],
answer:"die Hand"
},

{
type:"image",
question:"das Auge کدام است؟",
speak:"das Auge",
options:[
{text:"der Kopf",image:"../../media/body/head.webp"},
{text:"das Auge",image:"../../media/body/eye.webp"},
{text:"die Nase",image:"../../media/body/nose.webp"},
{text:"die Hand",image:"../../media/body/hand.webp"}
],
answer:"das Auge"
},

{
type:"image",
question:"der Fuß کدام است؟",
speak:"der Fuß",
options:[
{text:"die Hand",image:"../../media/body/hand.webp"},
{text:"der Kopf",image:"../../media/body/head.webp"},
{text:"der Fuß",image:"../../media/body/foot.webp"},
{text:"das Auge",image:"../../media/body/eye.webp"}
],
answer:"der Fuß"
},

{
type:"image",
question:"die Nase کدام است؟",
speak:"die Nase",
options:[
{text:"das Auge",image:"../../media/body/eye.webp"},
{text:"die Nase",image:"../../media/body/nose.webp"},
{text:"der Kopf",image:"../../media/body/head.webp"},
{text:"die Hand",image:"../../media/body/hand.webp"}
],
answer:"die Nase"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["die Hand","der Kopf","das Auge","die Nase"],
answer:"der Kopf"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["das Auge","die Hand","der Fuß","der Kopf"],
answer:"die Hand"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["der Kopf","das Auge","die Nase","die Hand"],
answer:"das Auge"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["die Hand","der Fuß","der Kopf","das Auge"],
answer:"der Fuß"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["das Auge","die Nase","die Hand","der Kopf"],
answer:"die Nase"
},

/* AUDIO */

{
type:"audio",
speak:"der Kopf",
question:"کدام کلمه را شنیدی؟",
options:["die Hand","der Kopf","das Auge","die Nase"],
answer:"der Kopf"
},

{
type:"audio",
speak:"die Hand",
question:"کدام کلمه را شنیدی؟",
options:["das Auge","die Hand","der Fuß","der Kopf"],
answer:"die Hand"
},

{
type:"audio",
speak:"das Auge",
question:"کدام کلمه را شنیدی؟",
options:["der Kopf","das Auge","die Nase","die Hand"],
answer:"das Auge"
},

{
type:"audio",
speak:"der Fuß",
question:"کدام کلمه را شنیدی؟",
options:["die Hand","der Fuß","der Kopf","das Auge"],
answer:"der Fuß"
},

{
type:"audio",
speak:"die Nase",
question:"کدام کلمه را شنیدی؟",
options:["das Auge","die Nase","die Hand","der Kopf"],
answer:"die Nase"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich habe einen Kopf",
question:"جمله آلمانی را بساز:",
text:"من یک سر دارم",
words:["Ich","habe","einen","Kopf"],
answer:["Ich","habe","einen","Kopf"]
},

{
type:"build-de",
speak:"Du hast eine Hand",
question:"جمله آلمانی را بساز:",
text:"تو یک دست داری",
words:["Du","hast","eine","Hand"],
answer:["Du","hast","eine","Hand"]
},

{
type:"build-de",
speak:"Sie hat zwei Augen",
question:"جمله آلمانی را بساز:",
text:"او دو چشم دارد",
words:["Sie","hat","zwei","Augen"],
answer:["Sie","hat","zwei","Augen"]
},

{
type:"build-de",
speak:"Er hat eine Nase",
question:"جمله آلمانی را بساز:",
text:"او یک بینی دارد",
words:["Er","hat","eine","Nase"],
answer:["Er","hat","eine","Nase"]
},

{
type:"build-de",
speak:"Das ist mein Fuß",
question:"جمله آلمانی را بساز:",
text:"این پای من است",
words:["Das","ist","mein","Fuß"],
answer:["Das","ist","mein","Fuß"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich habe einen Kopf",
question:"ترجمه را بساز:",
text:"Ich habe einen Kopf",
words:["دارم","سر","یک","من"],
answer:["من","یک","سر","دارم"]
},

{
type:"build-fa",
speak:"Du hast eine Hand",
question:"ترجمه را بساز:",
text:"Du hast eine Hand",
words:["یک","داری","دست","تو"],
answer:["تو","یک","دست","داری"]
},

{
type:"build-fa",
speak:"Sie hat zwei Augen",
question:"ترجمه را بساز:",
text:"Sie hat zwei Augen",
words:["دارد","او","دو","چشم"],
answer:["او","دو","چشم","دارد"]
},

{
type:"build-fa",
speak:"Er hat eine Nase",
question:"ترجمه را بساز:",
text:"Er hat eine Nase",
words:["دارد","یک","او","بینی"],
answer:["او","یک","بینی","دارد"]
},

{
type:"build-fa",
speak:"Das ist mein Fuß",
question:"ترجمه را بساز:",
text:"Das ist mein Fuß",
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