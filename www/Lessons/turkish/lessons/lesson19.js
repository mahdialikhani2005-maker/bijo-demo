let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "tr-TR",
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
  utter.lang = "tr-TR";
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

/* IMAGE - صفت‌ها */

{
type:"image",
question:"Büyük کدام است؟",
speak:"büyük",
options:[
{text:"küçük",image:"../../media/adjectives/small.webp"},
{text:"büyük",image:"../../media/adjectives/big.webp"},
{text:"uzun",image:"../../media/adjectives/tall.webp"},
{text:"kısa",image:"../../media/adjectives/short.webp"}
],
answer:"büyük"
},

{
type:"image",
question:"Küçük کدام است؟",
speak:"küçük",
options:[
{text:"güzel",image:"../../media/adjectives/beautiful.webp"},
{text:"küçük",image:"../../media/adjectives/small.webp"},
{text:"büyük",image:"../../media/adjectives/big.webp"},
{text:"uzun",image:"../../media/adjectives/tall.webp"}
],
answer:"küçük"
},

{
type:"image",
question:"Uzun کدام است؟",
speak:"uzun",
options:[
{text:"büyük",image:"../../media/adjectives/big.webp"},
{text:"uzun",image:"../../media/adjectives/tall.webp"},
{text:"güzel",image:"../../media/adjectives/beautiful.webp"},
{text:"küçük",image:"../../media/adjectives/small.webp"}
],
answer:"uzun"
},

{
type:"image",
question:"Kısa کدام است؟",
speak:"kısa",
options:[
{text:"uzun",image:"../../media/adjectives/tall.webp"},
{text:"küçük",image:"../../media/adjectives/small.webp"},
{text:"kısa",image:"../../media/adjectives/short.webp"},
{text:"büyük",image:"../../media/adjectives/big.webp"}
],
answer:"kısa"
},

{
type:"image",
question:"Güzel کدام است؟",
speak:"güzel",
options:[
{text:"kısa",image:"../../media/adjectives/short.webp"},
{text:"büyük",image:"../../media/adjectives/big.webp"},
{text:"küçük",image:"../../media/adjectives/small.webp"},
{text:"güzel",image:"../../media/adjectives/beautiful.webp"}
],
answer:"güzel"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/big.webp",
options:["küçük","büyük","uzun","kısa"],
answer:"büyük"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/small.webp",
options:["güzel","küçük","büyük","uzun"],
answer:"küçük"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/tall.webp",
options:["büyük","uzun","güzel","küçük"],
answer:"uzun"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/short.webp",
options:["uzun","küçük","kısa","büyük"],
answer:"kısa"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/beautiful.webp",
options:["kısa","büyük","küçük","güzel"],
answer:"güzel"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"büyük",
question:"کدام کلمه را شنیدی؟",
options:["küçük","büyük","uzun","kısa"],
answer:"büyük"
},

{
type:"audio",
speak:"küçük",
question:"کدام کلمه را شنیدی؟",
options:["güzel","küçük","büyük","uzun"],
answer:"küçük"
},

{
type:"audio",
speak:"uzun",
question:"کدام کلمه را شنیدی؟",
options:["büyük","uzun","güzel","küçük"],
answer:"uzun"
},

{
type:"audio",
speak:"kısa",
question:"کدام کلمه را شنیدی؟",
options:["uzun","küçük","kısa","büyük"],
answer:"kısa"
},

{
type:"audio",
speak:"güzel",
question:"کدام کلمه را شنیدی؟",
options:["kısa","büyük","küçük","güzel"],
answer:"güzel"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Köpek büyük",
question:"جمله ترکی را بساز:",
text:"سگ بزرگ است",
words:["Köpek","büyük"],
answer:["Köpek","büyük"]
},

{
type:"build-tr",
speak:"Kedi küçük",
question:"جمله ترکی را بساز:",
text:"گربه کوچک است",
words:["Kedi","küçük"],
answer:["Kedi","küçük"]
},

{
type:"build-tr",
speak:"Uzun",
question:"جمله ترکی را بساز:",
text:"او بلند است",
words:["Uzun"],
answer:["Uzun"]
},

{
type:"build-tr",
speak:"Kısa",
question:"جمله ترکی را بساز:",
text:"او کوتاه است",
words:["Kısa"],
answer:["Kısa"]
},

{
type:"build-tr",
speak:"Çiçek güzel",
question:"جمله ترکی را بساز:",
text:"گل زیبا است",
words:["Çiçek","güzel"],
answer:["Çiçek","güzel"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Köpek büyük",
question:"ترجمه را بساز:",
text:"Köpek büyük",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"Kedi küçük",
question:"ترجمه را بساز:",
text:"Kedi küçük",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"Uzun",
question:"ترجمه را بساز:",
text:"Uzun",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"Kısa",
question:"ترجمه را بساز:",
text:"Kısa",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"Çiçek güzel",
question:"ترجمه را بساز:",
text:"Çiçek güzel",
words:["است","زیبا","گل"],
answer:["گل","زیبا","است"]
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

  // BUILD TURKISH / FA

  else if (q.type === "build-tr" || q.type === "build-fa") {
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

  if (q.type === "build-tr") {
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