let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "fr-FR",
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
  utter.lang = "fr-FR";
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
question:"grand کدام است؟",
speak:"grand",
options:[
{text:"petit",image:"../../media/adjectives/small.webp"},
{text:"grand",image:"../../media/adjectives/big.webp"},
{text:"grand (taille)",image:"../../media/adjectives/tall.webp"},
{text:"court",image:"../../media/adjectives/short.webp"}
],
answer:"grand"
},

{
type:"image",
question:"petit کدام است؟",
speak:"petit",
options:[
{text:"beau",image:"../../media/adjectives/beautiful.webp"},
{text:"petit",image:"../../media/adjectives/small.webp"},
{text:"grand",image:"../../media/adjectives/big.webp"},
{text:"grand (taille)",image:"../../media/adjectives/tall.webp"}
],
answer:"petit"
},

{
type:"image",
question:"grand (taille) کدام است؟",
speak:"grand",
options:[
{text:"grand",image:"../../media/adjectives/big.webp"},
{text:"grand (taille)",image:"../../media/adjectives/tall.webp"},
{text:"beau",image:"../../media/adjectives/beautiful.webp"},
{text:"petit",image:"../../media/adjectives/small.webp"}
],
answer:"grand (taille)"
},

{
type:"image",
question:"court کدام است؟",
speak:"court",
options:[
{text:"grand (taille)",image:"../../media/adjectives/tall.webp"},
{text:"petit",image:"../../media/adjectives/small.webp"},
{text:"court",image:"../../media/adjectives/short.webp"},
{text:"grand",image:"../../media/adjectives/big.webp"}
],
answer:"court"
},

{
type:"image",
question:"beau کدام است؟",
speak:"beau",
options:[
{text:"court",image:"../../media/adjectives/short.webp"},
{text:"grand",image:"../../media/adjectives/big.webp"},
{text:"petit",image:"../../media/adjectives/small.webp"},
{text:"beau",image:"../../media/adjectives/beautiful.webp"}
],
answer:"beau"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/big.webp",
options:["petit","grand","grand (taille)","court"],
answer:"grand"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/small.webp",
options:["beau","petit","grand","grand (taille)"],
answer:"petit"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/tall.webp",
options:["grand","grand (taille)","beau","petit"],
answer:"grand (taille)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/short.webp",
options:["grand (taille)","petit","court","grand"],
answer:"court"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/beautiful.webp",
options:["court","grand","petit","beau"],
answer:"beau"
},

/* AUDIO */

{
type:"audio",
speak:"grand",
question:"کدام کلمه را شنیدی؟",
options:["petit","grand","grand (taille)","court"],
answer:"grand"
},

{
type:"audio",
speak:"petit",
question:"کدام کلمه را شنیدی؟",
options:["beau","petit","grand","grand (taille)"],
answer:"petit"
},

{
type:"audio",
speak:"grand (taille)",
question:"کدام کلمه را شنیدی؟",
options:["grand","grand (taille)","beau","petit"],
answer:"grand (taille)"
},

{
type:"audio",
speak:"court",
question:"کدام کلمه را شنیدی؟",
options:["grand (taille)","petit","court","grand"],
answer:"court"
},

{
type:"audio",
speak:"beau",
question:"کدام کلمه را شنیدی؟",
options:["court","grand","petit","beau"],
answer:"beau"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Le chien est grand",
question:"جمله فرانسوی را بساز:",
text:"سگ بزرگ است",
words:["Le","chien","est","grand"],
answer:["Le","chien","est","grand"]
},

{
type:"build-fr",
speak:"Le chat est petit",
question:"جمله فرانسوی را بساز:",
text:"گربه کوچک است",
words:["Le","chat","est","petit"],
answer:["Le","chat","est","petit"]
},

{
type:"build-fr",
speak:"Il est grand",
question:"جمله فرانسوی را بساز:",
text:"او بلند است",
words:["Il","est","grand"],
answer:["Il","est","grand"]
},

{
type:"build-fr",
speak:"Elle est petite",
question:"جمله فرانسوی را بساز:",
text:"او کوتاه است",
words:["Elle","est","petite"],
answer:["Elle","est","petite"]
},

{
type:"build-fr",
speak:"La fleur est belle",
question:"جمله فرانسوی را بساز:",
text:"گل زیبا است",
words:["La","fleur","est","belle"],
answer:["La","fleur","est","belle"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Le chien est grand",
question:"ترجمه را بساز:",
text:"Le chien est grand",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"Le chat est petit",
question:"ترجمه را بساز:",
text:"Le chat est petit",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"Il est grand",
question:"ترجمه را بساز:",
text:"Il est grand",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"Elle est petite",
question:"ترجمه را بساز:",
text:"Elle est petite",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"La fleur est belle",
question:"ترجمه را بساز:",
text:"La fleur est belle",
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

  // BUILD FRENCH / FA

  else if (q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-fr") {
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