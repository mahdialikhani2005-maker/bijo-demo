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
question:"felice کدام است؟",
speak:"felice",
options:[
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"felice",image:"../../media/feelings/happy.webp"},
{text:"arrabbiato",image:"../../media/feelings/angry.webp"},
{text:"stanco",image:"../../media/feelings/tired.webp"}
],
answer:"felice"
},

{
type:"image",
question:"triste کدام است؟",
speak:"triste",
options:[
{text:"stanco",image:"../../media/feelings/tired.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"spaventato",image:"../../media/feelings/scared.webp"},
{text:"felice",image:"../../media/feelings/happy.webp"}
],
answer:"triste"
},

{
type:"image",
question:"arrabbiato کدام است؟",
speak:"arrabbiato",
options:[
{text:"felice",image:"../../media/feelings/happy.webp"},
{text:"arrabbiato",image:"../../media/feelings/angry.webp"},
{text:"spaventato",image:"../../media/feelings/scared.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"}
],
answer:"arrabbiato"
},

{
type:"image",
question:"stanco کدام است؟",
speak:"stanco",
options:[
{text:"arrabbiato",image:"../../media/feelings/angry.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"stanco",image:"../../media/feelings/tired.webp"},
{text:"felice",image:"../../media/feelings/happy.webp"}
],
answer:"stanco"
},

{
type:"image",
question:"spaventato کدام است؟",
speak:"spaventato",
options:[
{text:"stanco",image:"../../media/feelings/tired.webp"},
{text:"felice",image:"../../media/feelings/happy.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"spaventato",image:"../../media/feelings/scared.webp"}
],
answer:"spaventato"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["triste","felice","arrabbiato","stanco"],
answer:"felice"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["stanco","triste","spaventato","felice"],
answer:"triste"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["felice","arrabbiato","spaventato","triste"],
answer:"arrabbiato"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["arrabbiato","triste","stanco","felice"],
answer:"stanco"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["stanco","felice","triste","spaventato"],
answer:"spaventato"
},

/* AUDIO */

{
type:"audio",
speak:"felice",
question:"کدام کلمه را شنیدی؟",
options:["triste","felice","arrabbiato","stanco"],
answer:"felice"
},

{
type:"audio",
speak:"triste",
question:"کدام کلمه را شنیدی؟",
options:["stanco","triste","spaventato","felice"],
answer:"triste"
},

{
type:"audio",
speak:"arrabbiato",
question:"کدام کلمه را شنیدی؟",
options:["felice","arrabbiato","spaventato","triste"],
answer:"arrabbiato"
},

{
type:"audio",
speak:"stanco",
question:"کدام کلمه را شنیدی؟",
options:["arrabbiato","triste","stanco","felice"],
answer:"stanco"
},

{
type:"audio",
speak:"spaventato",
question:"کدام کلمه را شنیدی؟",
options:["stanco","felice","triste","spaventato"],
answer:"spaventato"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Io sono felice",
question:"جمله ایتالیایی را بساز:",
text:"من خوشحال هستم",
words:["Io","sono","felice"],
answer:["Io","sono","felice"]
},

{
type:"build-it",
speak:"Lei è triste",
question:"جمله ایتالیایی را بساز:",
text:"او ناراحت است",
words:["Lei","è","triste"],
answer:["Lei","è","triste"]
},

{
type:"build-it",
speak:"Lui è arrabbiato",
question:"جمله ایتالیایی را بساز:",
text:"او عصبانی است",
words:["Lui","è","arrabbiato"],
answer:["Lui","è","arrabbiato"]
},

{
type:"build-it",
speak:"Noi siamo stanchi",
question:"جمله ایتالیایی را بساز:",
text:"ما خسته هستیم",
words:["Noi","siamo","stanchi"],
answer:["Noi","siamo","stanchi"]
},

{
type:"build-it",
speak:"Loro sono spaventati",
question:"جمله ایتالیایی را بساز:",
text:"آنها ترسیده هستند",
words:["Loro","sono","spaventati"],
answer:["Loro","sono","spaventati"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Io sono felice",
question:"ترجمه را بساز:",
text:"Io sono felice",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Lei è triste",
question:"ترجمه را بساز:",
text:"Lei è triste",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"Lui è arrabbiato",
question:"ترجمه را بساز:",
text:"Lui è arrabbiato",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"Noi siamo stanchi",
question:"ترجمه را بساز:",
text:"Noi siamo stanchi",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"Loro sono spaventati",
question:"ترجمه را بساز:",
text:"Loro sono spaventati",
words:["هستند","ترسیده","آنها"],
answer:["آنها","ترسیده","هستند"]
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