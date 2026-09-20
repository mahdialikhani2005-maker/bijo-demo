let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "zh-CN",
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
  utter.lang = "zh-CN";
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
question:"大 (dà) کدام است؟",
speak:"大",
options:[
{text:"小 (xiǎo)",image:"../../media/adjectives/small.webp"},
{text:"大 (dà)",image:"../../media/adjectives/big.webp"},
{text:"高 (gāo)",image:"../../media/adjectives/tall.webp"},
{text:"矮 (ǎi)",image:"../../media/adjectives/short.webp"}
],
answer:"大 (dà)"
},

{
type:"image",
question:"小 (xiǎo) کدام است؟",
speak:"小",
options:[
{text:"漂亮 (piàoliang)",image:"../../media/adjectives/beautiful.webp"},
{text:"小 (xiǎo)",image:"../../media/adjectives/small.webp"},
{text:"大 (dà)",image:"../../media/adjectives/big.webp"},
{text:"高 (gāo)",image:"../../media/adjectives/tall.webp"}
],
answer:"小 (xiǎo)"
},

{
type:"image",
question:"高 (gāo) کدام است؟",
speak:"高",
options:[
{text:"大 (dà)",image:"../../media/adjectives/big.webp"},
{text:"高 (gāo)",image:"../../media/adjectives/tall.webp"},
{text:"漂亮 (piàoliang)",image:"../../media/adjectives/beautiful.webp"},
{text:"小 (xiǎo)",image:"../../media/adjectives/small.webp"}
],
answer:"高 (gāo)"
},

{
type:"image",
question:"矮 (ǎi) کدام است؟",
speak:"矮",
options:[
{text:"高 (gāo)",image:"../../media/adjectives/tall.webp"},
{text:"小 (xiǎo)",image:"../../media/adjectives/small.webp"},
{text:"矮 (ǎi)",image:"../../media/adjectives/short.webp"},
{text:"大 (dà)",image:"../../media/adjectives/big.webp"}
],
answer:"矮 (ǎi)"
},

{
type:"image",
question:"漂亮 (piàoliang) کدام است؟",
speak:"漂亮",
options:[
{text:"矮 (ǎi)",image:"../../media/adjectives/short.webp"},
{text:"大 (dà)",image:"../../media/adjectives/big.webp"},
{text:"小 (xiǎo)",image:"../../media/adjectives/small.webp"},
{text:"漂亮 (piàoliang)",image:"../../media/adjectives/beautiful.webp"}
],
answer:"漂亮 (piàoliang)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/big.webp",
options:["小 (xiǎo)","大 (dà)","高 (gāo)","矮 (ǎi)"],
answer:"大 (dà)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/small.webp",
options:["漂亮 (piàoliang)","小 (xiǎo)","大 (dà)","高 (gāo)"],
answer:"小 (xiǎo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/tall.webp",
options:["大 (dà)","高 (gāo)","漂亮 (piàoliang)","小 (xiǎo)"],
answer:"高 (gāo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/short.webp",
options:["高 (gāo)","小 (xiǎo)","矮 (ǎi)","大 (dà)"],
answer:"矮 (ǎi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/adjectives/beautiful.webp",
options:["矮 (ǎi)","大 (dà)","小 (xiǎo)","漂亮 (piàoliang)"],
answer:"漂亮 (piàoliang)"
},

/* AUDIO */

{
type:"audio",
speak:"大",
question:"کدام کلمه را شنیدی؟",
options:["小 (xiǎo)","大 (dà)","高 (gāo)","矮 (ǎi)"],
answer:"大 (dà)"
},

{
type:"audio",
speak:"小",
question:"کدام کلمه را شنیدی؟",
options:["漂亮 (piàoliang)","小 (xiǎo)","大 (dà)","高 (gāo)"],
answer:"小 (xiǎo)"
},

{
type:"audio",
speak:"高",
question:"کدام کلمه را شنیدی؟",
options:["大 (dà)","高 (gāo)","漂亮 (piàoliang)","小 (xiǎo)"],
answer:"高 (gāo)"
},

{
type:"audio",
speak:"矮",
question:"کدام کلمه را شنیدی؟",
options:["高 (gāo)","小 (xiǎo)","矮 (ǎi)","大 (dà)"],
answer:"矮 (ǎi)"
},

{
type:"audio",
speak:"漂亮",
question:"کدام کلمه را شنیدی؟",
options:["矮 (ǎi)","大 (dà)","小 (xiǎo)","漂亮 (piàoliang)"],
answer:"漂亮 (piàoliang)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"狗很大",
question:"جمله چینی را بساز:",
text:"سگ بزرگ است",
words:["狗","很","大"],
answer:["狗","很","大"]
},

{
type:"build-zh",
speak:"猫很小",
question:"جمله چینی را بساز:",
text:"گربه کوچک است",
words:["猫","很","小"],
answer:["猫","很","小"]
},

{
type:"build-zh",
speak:"他很高",
question:"جمله چینی را بساز:",
text:"او بلند است",
words:["他","很","高"],
answer:["他","很","高"]
},

{
type:"build-zh",
speak:"她很矮",
question:"جمله چینی را بساز:",
text:"او کوتاه است",
words:["她","很","矮"],
answer:["她","很","矮"]
},

{
type:"build-zh",
speak:"花很漂亮",
question:"جمله چینی را بساز:",
text:"گل زیبا است",
words:["花","很","漂亮"],
answer:["花","很","漂亮"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"狗很大",
question:"ترجمه را بساز:",
text:"狗很大",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"猫很小",
question:"ترجمه را بساز:",
text:"猫很小",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"他很高",
question:"ترجمه را بساز:",
text:"他很高",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"她很矮",
question:"ترجمه را بساز:",
text:"她很矮",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"花很漂亮",
question:"ترجمه را بساز:",
text:"花很漂亮",
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

  // BUILD CHINESE / FA

  else if (q.type === "build-zh" || q.type === "build-fa") {
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

  if (q.type === "build-zh") {
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