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
question:"rosso کدام است؟",
speak:"rosso",
options:[
{text:"blu",image:"../../media/colors/blue.webp"},
{text:"rosso",image:"../../media/colors/red.webp"},
{text:"verde",image:"../../media/colors/green.webp"},
{text:"giallo",image:"../../media/colors/yellow.webp"}
],
answer:"rosso"
},

{
type:"image",
question:"blu کدام است؟",
speak:"blu",
options:[
{text:"giallo",image:"../../media/colors/yellow.webp"},
{text:"blu",image:"../../media/colors/blue.webp"},
{text:"nero",image:"../../media/colors/black.webp"},
{text:"rosso",image:"../../media/colors/red.webp"}
],
answer:"blu"
},

{
type:"image",
question:"verde کدام است؟",
speak:"verde",
options:[
{text:"rosso",image:"../../media/colors/red.webp"},
{text:"verde",image:"../../media/colors/green.webp"},
{text:"nero",image:"../../media/colors/black.webp"},
{text:"blu",image:"../../media/colors/blue.webp"}
],
answer:"verde"
},

{
type:"image",
question:"giallo کدام است؟",
speak:"giallo",
options:[
{text:"verde",image:"../../media/colors/green.webp"},
{text:"blu",image:"../../media/colors/blue.webp"},
{text:"giallo",image:"../../media/colors/yellow.webp"},
{text:"rosso",image:"../../media/colors/red.webp"}
],
answer:"giallo"
},

{
type:"image",
question:"nero کدام است؟",
speak:"nero",
options:[
{text:"giallo",image:"../../media/colors/yellow.webp"},
{text:"rosso",image:"../../media/colors/red.webp"},
{text:"blu",image:"../../media/colors/blue.webp"},
{text:"nero",image:"../../media/colors/black.webp"}
],
answer:"nero"
},

/* WORD */

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/red.webp",
options:["blu","rosso","verde","giallo"],
answer:"rosso"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/blue.webp",
options:["giallo","blu","nero","rosso"],
answer:"blu"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/green.webp",
options:["rosso","verde","nero","blu"],
answer:"verde"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/yellow.webp",
options:["verde","blu","giallo","rosso"],
answer:"giallo"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/black.webp",
options:["giallo","rosso","blu","nero"],
answer:"nero"
},

/* AUDIO */

{
type:"audio",
speak:"rosso",
question:"کدام کلمه را شنیدی؟",
options:["blu","rosso","verde","giallo"],
answer:"rosso"
},

{
type:"audio",
speak:"blu",
question:"کدام کلمه را شنیدی؟",
options:["giallo","blu","nero","rosso"],
answer:"blu"
},

{
type:"audio",
speak:"verde",
question:"کدام کلمه را شنیدی؟",
options:["rosso","verde","nero","blu"],
answer:"verde"
},

{
type:"audio",
speak:"giallo",
question:"کدام کلمه را شنیدی؟",
options:["verde","blu","giallo","rosso"],
answer:"giallo"
},

{
type:"audio",
speak:"nero",
question:"کدام کلمه را شنیدی؟",
options:["giallo","rosso","blu","nero"],
answer:"nero"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"La mela è rossa",
question:"جمله ایتالیایی را بساز:",
text:"سیب قرمز است",
words:["La","mela","è","rossa"],
answer:["La","mela","è","rossa"]
},

{
type:"build-it",
speak:"Il cielo è blu",
question:"جمله ایتالیایی را بساز:",
text:"آسمان آبی است",
words:["Il","cielo","è","blu"],
answer:["Il","cielo","è","blu"]
},

{
type:"build-it",
speak:"L'albero è verde",
question:"جمله ایتالیایی را بساز:",
text:"درخت سبز است",
words:["L'","albero","è","verde"],
answer:["L'","albero","è","verde"]
},

{
type:"build-it",
speak:"Il sole è giallo",
question:"جمله ایتالیایی را بساز:",
text:"خورشید زرد است",
words:["Il","sole","è","giallo"],
answer:["Il","sole","è","giallo"]
},

{
type:"build-it",
speak:"Il gatto è nero",
question:"جمله ایتالیایی را بساز:",
text:"گربه مشکی است",
words:["Il","gatto","è","nero"],
answer:["Il","gatto","è","nero"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"La mela è rossa",
question:"ترجمه را بساز:",
text:"La mela è rossa",
words:["است","قرمز","سیب"],
answer:["سیب","قرمز","است"]
},

{
type:"build-fa",
speak:"Il cielo è blu",
question:"ترجمه را بساز:",
text:"Il cielo è blu",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"L'albero è verde",
question:"ترجمه را بساز:",
text:"L'albero è verde",
words:["است","سبز","درخت"],
answer:["درخت","سبز","است"]
},

{
type:"build-fa",
speak:"Il sole è giallo",
question:"ترجمه را بساز:",
text:"Il sole è giallo",
words:["است","زرد","خورشید"],
answer:["خورشید","زرد","است"]
},

{
type:"build-fa",
speak:"Il gatto è nero",
question:"ترجمه را بساز:",
text:"Il gatto è nero",
words:["است","مشکی","گربه"],
answer:["گربه","مشکی","است"]
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