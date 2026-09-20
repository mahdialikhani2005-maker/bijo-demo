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
question:"苹果 (píngguǒ) کدام است؟",
speak:"苹果",
options:[
{text:"香蕉 (xiāngjiāo)",image:"../../media/fruits/banana.webp"},
{text:"苹果 (píngguǒ)",image:"../../media/fruits/apple.webp"},
{text:"橙子 (chéngzi)",image:"../../media/fruits/orange.webp"},
{text:"葡萄 (pútáo)",image:"../../media/fruits/grape.webp"}
],
answer:"苹果 (píngguǒ)"
},

{
type:"image",
question:"香蕉 (xiāngjiāo) کدام است؟",
speak:"香蕉",
options:[
{text:"葡萄 (pútáo)",image:"../../media/fruits/grape.webp"},
{text:"香蕉 (xiāngjiāo)",image:"../../media/fruits/banana.webp"},
{text:"西瓜 (xīguā)",image:"../../media/fruits/watermelon.webp"},
{text:"苹果 (píngguǒ)",image:"../../media/fruits/apple.webp"}
],
answer:"香蕉 (xiāngjiāo)"
},

{
type:"image",
question:"橙子 (chéngzi) کدام است؟",
speak:"橙子",
options:[
{text:"苹果 (píngguǒ)",image:"../../media/fruits/apple.webp"},
{text:"橙子 (chéngzi)",image:"../../media/fruits/orange.webp"},
{text:"西瓜 (xīguā)",image:"../../media/fruits/watermelon.webp"},
{text:"香蕉 (xiāngjiāo)",image:"../../media/fruits/banana.webp"}
],
answer:"橙子 (chéngzi)"
},

{
type:"image",
question:"葡萄 (pútáo) کدام است؟",
speak:"葡萄",
options:[
{text:"橙子 (chéngzi)",image:"../../media/fruits/orange.webp"},
{text:"香蕉 (xiāngjiāo)",image:"../../media/fruits/banana.webp"},
{text:"葡萄 (pútáo)",image:"../../media/fruits/grape.webp"},
{text:"苹果 (píngguǒ)",image:"../../media/fruits/apple.webp"}
],
answer:"葡萄 (pútáo)"
},

{
type:"image",
question:"西瓜 (xīguā) کدام است؟",
speak:"西瓜",
options:[
{text:"葡萄 (pútáo)",image:"../../media/fruits/grape.webp"},
{text:"苹果 (píngguǒ)",image:"../../media/fruits/apple.webp"},
{text:"香蕉 (xiāngjiāo)",image:"../../media/fruits/banana.webp"},
{text:"西瓜 (xīguā)",image:"../../media/fruits/watermelon.webp"}
],
answer:"西瓜 (xīguā)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/apple.webp",
options:["香蕉 (xiāngjiāo)","苹果 (píngguǒ)","橙子 (chéngzi)","葡萄 (pútáo)"],
answer:"苹果 (píngguǒ)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/banana.webp",
options:["葡萄 (pútáo)","香蕉 (xiāngjiāo)","西瓜 (xīguā)","苹果 (píngguǒ)"],
answer:"香蕉 (xiāngjiāo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/orange.webp",
options:["苹果 (píngguǒ)","橙子 (chéngzi)","西瓜 (xīguā)","香蕉 (xiāngjiāo)"],
answer:"橙子 (chéngzi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/grape.webp",
options:["橙子 (chéngzi)","香蕉 (xiāngjiāo)","葡萄 (pútáo)","苹果 (píngguǒ)"],
answer:"葡萄 (pútáo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/watermelon.webp",
options:["葡萄 (pútáo)","苹果 (píngguǒ)","香蕉 (xiāngjiāo)","西瓜 (xīguā)"],
answer:"西瓜 (xīguā)"
},

/* AUDIO */

{
type:"audio",
speak:"苹果",
question:"کدام کلمه را شنیدی؟",
options:["香蕉 (xiāngjiāo)","苹果 (píngguǒ)","橙子 (chéngzi)","葡萄 (pútáo)"],
answer:"苹果 (píngguǒ)"
},

{
type:"audio",
speak:"香蕉",
question:"کدام کلمه را شنیدی؟",
options:["葡萄 (pútáo)","香蕉 (xiāngjiāo)","西瓜 (xīguā)","苹果 (píngguǒ)"],
answer:"香蕉 (xiāngjiāo)"
},

{
type:"audio",
speak:"橙子",
question:"کدام کلمه را شنیدی؟",
options:["苹果 (píngguǒ)","橙子 (chéngzi)","西瓜 (xīguā)","香蕉 (xiāngjiāo)"],
answer:"橙子 (chéngzi)"
},

{
type:"audio",
speak:"葡萄",
question:"کدام کلمه را شنیدی؟",
options:["橙子 (chéngzi)","香蕉 (xiāngjiāo)","葡萄 (pútáo)","苹果 (píngguǒ)"],
answer:"葡萄 (pútáo)"
},

{
type:"audio",
speak:"西瓜",
question:"کدام کلمه را شنیدی؟",
options:["葡萄 (pútáo)","苹果 (píngguǒ)","香蕉 (xiāngjiāo)","西瓜 (xīguā)"],
answer:"西瓜 (xīguā)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我吃一个苹果",
question:"جمله چینی را بساز:",
text:"من یک سیب می‌خورم",
words:["我","吃","一个","苹果"],
answer:["我","吃","一个","苹果"]
},

{
type:"build-zh",
speak:"她有一个香蕉",
question:"جمله چینی را بساز:",
text:"او یک موز دارد",
words:["她","有","一个","香蕉"],
answer:["她","有","一个","香蕉"]
},

{
type:"build-zh",
speak:"这是一个橙子",
question:"جمله چینی را بساز:",
text:"این یک پرتقال است",
words:["这","是","一个","橙子"],
answer:["这","是","一个","橙子"]
},

{
type:"build-zh",
speak:"我喜欢葡萄",
question:"جمله چینی را بساز:",
text:"من انگور دوست دارم",
words:["我","喜欢","葡萄"],
answer:["我","喜欢","葡萄"]
},

{
type:"build-zh",
speak:"他吃西瓜",
question:"جمله چینی را بساز:",
text:"او هندوانه می‌خورد",
words:["他","吃","西瓜"],
answer:["他","吃","西瓜"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我吃一个苹果",
question:"ترجمه را بساز:",
text:"我吃一个苹果",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"她有一个香蕉",
question:"ترجمه را بساز:",
text:"她有一个香蕉",
words:["دارد","موز","یک","او"],
answer:["او","یک","موز","دارد"]
},

{
type:"build-fa",
speak:"这是一个橙子",
question:"ترجمه را بساز:",
text:"这是一个橙子",
words:["است","پرتقال","یک","این"],
answer:["این","یک","پرتقال","است"]
},

{
type:"build-fa",
speak:"我喜欢葡萄",
question:"ترجمه را بساز:",
text:"我喜欢葡萄",
words:["دارم","دوست","انگور","من"],
answer:["من","انگور","دوست","دارم"]
},

{
type:"build-fa",
speak:"他吃西瓜",
question:"ترجمه را بساز:",
text:"他吃西瓜",
words:["می‌خورد","هندوانه","او"],
answer:["او","هندوانه","می‌خورد"]
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