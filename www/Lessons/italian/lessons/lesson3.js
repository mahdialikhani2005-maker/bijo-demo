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
question:"la casa کدام است؟",
speak:"la casa",
options:[
{text:"la stanza",image:"../../media/house/room.webp"},
{text:"la casa",image:"../../media/house/house.webp"},
{text:"la porta",image:"../../media/house/door.webp"},
{text:"la finestra",image:"../../media/house/window.webp"}
],
answer:"la casa"
},

{
type:"image",
question:"la stanza کدام است؟",
speak:"la stanza",
options:[
{text:"la finestra",image:"../../media/house/window.webp"},
{text:"la stanza",image:"../../media/house/room.webp"},
{text:"la cucina",image:"../../media/house/kitchen.webp"},
{text:"la casa",image:"../../media/house/house.webp"}
],
answer:"la stanza"
},

{
type:"image",
question:"la porta کدام است؟",
speak:"la porta",
options:[
{text:"la casa",image:"../../media/house/house.webp"},
{text:"la porta",image:"../../media/house/door.webp"},
{text:"la finestra",image:"../../media/house/window.webp"},
{text:"la stanza",image:"../../media/house/room.webp"}
],
answer:"la porta"
},

{
type:"image",
question:"la finestra کدام است؟",
speak:"la finestra",
options:[
{text:"la porta",image:"../../media/house/door.webp"},
{text:"la casa",image:"../../media/house/house.webp"},
{text:"la finestra",image:"../../media/house/window.webp"},
{text:"la stanza",image:"../../media/house/room.webp"}
],
answer:"la finestra"
},

{
type:"image",
question:"la cucina کدام است؟",
speak:"la cucina",
options:[
{text:"la stanza",image:"../../media/house/room.webp"},
{text:"la finestra",image:"../../media/house/window.webp"},
{text:"la casa",image:"../../media/house/house.webp"},
{text:"la cucina",image:"../../media/house/kitchen.webp"}
],
answer:"la cucina"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/house.webp",
options:["la stanza","la casa","la porta","la finestra"],
answer:"la casa"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/room.webp",
options:["la finestra","la stanza","la cucina","la casa"],
answer:"la stanza"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/door.webp",
options:["la casa","la porta","la finestra","la stanza"],
answer:"la porta"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/window.webp",
options:["la porta","la casa","la finestra","la stanza"],
answer:"la finestra"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/kitchen.webp",
options:["la stanza","la finestra","la casa","la cucina"],
answer:"la cucina"
},

/* AUDIO */

{
type:"audio",
speak:"la casa",
question:"کدام کلمه را شنیدی؟",
options:["la stanza","la casa","la porta","la finestra"],
answer:"la casa"
},

{
type:"audio",
speak:"la stanza",
question:"کدام کلمه را شنیدی؟",
options:["la finestra","la stanza","la cucina","la casa"],
answer:"la stanza"
},

{
type:"audio",
speak:"la porta",
question:"کدام کلمه را شنیدی؟",
options:["la casa","la porta","la finestra","la stanza"],
answer:"la porta"
},

{
type:"audio",
speak:"la finestra",
question:"کدام کلمه را شنیدی؟",
options:["la porta","la casa","la finestra","la stanza"],
answer:"la finestra"
},

{
type:"audio",
speak:"la cucina",
question:"کدام کلمه را شنیدی؟",
options:["la stanza","la finestra","la casa","la cucina"],
answer:"la cucina"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Questa è una casa",
question:"جمله ایتالیایی را بساز:",
text:"این یک خانه است",
words:["Questa","è","una","casa"],
answer:["Questa","è","una","casa"]
},

{
type:"build-it",
speak:"Io vedo una porta",
question:"جمله ایتالیایی را بساز:",
text:"من یک در می‌بینم",
words:["Io","vedo","una","porta"],
answer:["Io","vedo","una","porta"]
},

{
type:"build-it",
speak:"Lei apre la finestra",
question:"جمله ایتالیایی را بساز:",
text:"او پنجره را باز می‌کند",
words:["Lei","apre","la","finestra"],
answer:["Lei","apre","la","finestra"]
},

{
type:"build-it",
speak:"Noi abbiamo una cucina",
question:"جمله ایتالیایی را بساز:",
text:"ما یک آشپزخانه داریم",
words:["Noi","abbiamo","una","cucina"],
answer:["Noi","abbiamo","una","cucina"]
},

{
type:"build-it",
speak:"Loro sono nella stanza",
question:"جمله ایتالیایی را بساز:",
text:"آنها در اتاق هستند",
words:["Loro","sono","nella","stanza"],
answer:["Loro","sono","nella","stanza"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Questa è una casa",
question:"ترجمه را بساز:",
text:"Questa è una casa",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"Io vedo una porta",
question:"ترجمه را بساز:",
text:"Io vedo una porta",
words:["می‌بینم","در","یک","من"],
answer:["من","یک","در","می‌بینم"]
},

{
type:"build-fa",
speak:"Lei apre la finestra",
question:"ترجمه را بساز:",
text:"Lei apre la finestra",
words:["را","باز","پنجره","می‌کند","او"],
answer:["او","پنجره","را","باز","می‌کند"]
},

{
type:"build-fa",
speak:"Noi abbiamo una cucina",
question:"ترجمه را بساز:",
text:"Noi abbiamo una cucina",
words:["داریم","آشپزخانه","یک","ما"],
answer:["ما","یک","آشپزخانه","داریم"]
},

{
type:"build-fa",
speak:"Loro sono nella stanza",
question:"ترجمه را بساز:",
text:"Loro sono nella stanza",
words:["در","هستند","اتاق","آنها"],
answer:["آنها","در","اتاق","هستند"]
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