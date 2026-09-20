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
question:"rot کدام است؟",
speak:"rot",
options:[
{text:"blau",image:"../../media/colors/blue.webp"},
{text:"rot",image:"../../media/colors/red.webp"},
{text:"grün",image:"../../media/colors/green.webp"},
{text:"gelb",image:"../../media/colors/yellow.webp"}
],
answer:"rot"
},

{
type:"image",
question:"blau کدام است؟",
speak:"blau",
options:[
{text:"gelb",image:"../../media/colors/yellow.webp"},
{text:"blau",image:"../../media/colors/blue.webp"},
{text:"schwarz",image:"../../media/colors/black.webp"},
{text:"rot",image:"../../media/colors/red.webp"}
],
answer:"blau"
},

{
type:"image",
question:"grün کدام است؟",
speak:"grün",
options:[
{text:"rot",image:"../../media/colors/red.webp"},
{text:"grün",image:"../../media/colors/green.webp"},
{text:"schwarz",image:"../../media/colors/black.webp"},
{text:"blau",image:"../../media/colors/blue.webp"}
],
answer:"grün"
},

{
type:"image",
question:"gelb کدام است؟",
speak:"gelb",
options:[
{text:"grün",image:"../../media/colors/green.webp"},
{text:"blau",image:"../../media/colors/blue.webp"},
{text:"gelb",image:"../../media/colors/yellow.webp"},
{text:"rot",image:"../../media/colors/red.webp"}
],
answer:"gelb"
},

{
type:"image",
question:"schwarz کدام است؟",
speak:"schwarz",
options:[
{text:"gelb",image:"../../media/colors/yellow.webp"},
{text:"rot",image:"../../media/colors/red.webp"},
{text:"blau",image:"../../media/colors/blue.webp"},
{text:"schwarz",image:"../../media/colors/black.webp"}
],
answer:"schwarz"
},

/* WORD */

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/red.webp",
options:["blau","rot","grün","gelb"],
answer:"rot"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/blue.webp",
options:["gelb","blau","schwarz","rot"],
answer:"blau"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/green.webp",
options:["rot","grün","schwarz","blau"],
answer:"grün"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/yellow.webp",
options:["grün","blau","gelb","rot"],
answer:"gelb"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/black.webp",
options:["gelb","rot","blau","schwarz"],
answer:"schwarz"
},

/* AUDIO */

{
type:"audio",
speak:"rot",
question:"کدام کلمه را شنیدی؟",
options:["blau","rot","grün","gelb"],
answer:"rot"
},

{
type:"audio",
speak:"blau",
question:"کدام کلمه را شنیدی؟",
options:["gelb","blau","schwarz","rot"],
answer:"blau"
},

{
type:"audio",
speak:"grün",
question:"کدام کلمه را شنیدی؟",
options:["rot","grün","schwarz","blau"],
answer:"grün"
},

{
type:"audio",
speak:"gelb",
question:"کدام کلمه را شنیدی؟",
options:["grün","blau","gelb","rot"],
answer:"gelb"
},

{
type:"audio",
speak:"schwarz",
question:"کدام کلمه را شنیدی؟",
options:["gelb","rot","blau","schwarz"],
answer:"schwarz"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Der Apfel ist rot",
question:"جمله آلمانی را بساز:",
text:"سیب قرمز است",
words:["Der","Apfel","ist","rot"],
answer:["Der","Apfel","ist","rot"]
},

{
type:"build-de",
speak:"Der Himmel ist blau",
question:"جمله آلمانی را بساز:",
text:"آسمان آبی است",
words:["Der","Himmel","ist","blau"],
answer:["Der","Himmel","ist","blau"]
},

{
type:"build-de",
speak:"Der Baum ist grün",
question:"جمله آلمانی را بساز:",
text:"درخت سبز است",
words:["Der","Baum","ist","grün"],
answer:["Der","Baum","ist","grün"]
},

{
type:"build-de",
speak:"Die Sonne ist gelb",
question:"جمله آلمانی را بساز:",
text:"خورشید زرد است",
words:["Die","Sonne","ist","gelb"],
answer:["Die","Sonne","ist","gelb"]
},

{
type:"build-de",
speak:"Die Katze ist schwarz",
question:"جمله آلمانی را بساز:",
text:"گربه مشکی است",
words:["Die","Katze","ist","schwarz"],
answer:["Die","Katze","ist","schwarz"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Der Apfel ist rot",
question:"ترجمه را بساز:",
text:"Der Apfel ist rot",
words:["است","قرمز","سیب"],
answer:["سیب","قرمز","است"]
},

{
type:"build-fa",
speak:"Der Himmel ist blau",
question:"ترجمه را بساز:",
text:"Der Himmel ist blau",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Der Baum ist grün",
question:"ترجمه را بساز:",
text:"Der Baum ist grün",
words:["است","سبز","درخت"],
answer:["درخت","سبز","است"]
},

{
type:"build-fa",
speak:"Die Sonne ist gelb",
question:"ترجمه را بساز:",
text:"Die Sonne ist gelb",
words:["است","زرد","خورشید"],
answer:["خورشید","زرد","است"]
},

{
type:"build-fa",
speak:"Die Katze ist schwarz",
question:"ترجمه را بساز:",
text:"Die Katze ist schwarz",
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