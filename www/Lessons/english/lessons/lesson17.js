let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "en-US",
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
  utter.lang = "en-US";
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
question:"happy کدام است؟",
speak:"happy",
options:[
{text:"sad",image:"../../media/feelings/sad.webp"},
{text:"happy",image:"../../media/feelings/happy.webp"},
{text:"angry",image:"../../media/feelings/angry.webp"},
{text:"tired",image:"../../media/feelings/tired.webp"}
],
answer:"happy"
},

{
type:"image",
question:"sad کدام است؟",
speak:"sad",
options:[
{text:"tired",image:"../../media/feelings/tired.webp"},
{text:"sad",image:"../../media/feelings/sad.webp"},
{text:"scared",image:"../../media/feelings/scared.webp"},
{text:"happy",image:"../../media/feelings/happy.webp"}
],
answer:"sad"
},

{
type:"image",
question:"angry کدام است؟",
speak:"angry",
options:[
{text:"happy",image:"../../media/feelings/happy.webp"},
{text:"angry",image:"../../media/feelings/angry.webp"},
{text:"scared",image:"../../media/feelings/scared.webp"},
{text:"sad",image:"../../media/feelings/sad.webp"}
],
answer:"angry"
},

{
type:"image",
question:"tired کدام است؟",
speak:"tired",
options:[
{text:"angry",image:"../../media/feelings/angry.webp"},
{text:"sad",image:"../../media/feelings/sad.webp"},
{text:"tired",image:"../../media/feelings/tired.webp"},
{text:"happy",image:"../../media/feelings/happy.webp"}
],
answer:"tired"
},

{
type:"image",
question:"scared کدام است؟",
speak:"scared",
options:[
{text:"tired",image:"../../media/feelings/tired.webp"},
{text:"happy",image:"../../media/feelings/happy.webp"},
{text:"sad",image:"../../media/feelings/sad.webp"},
{text:"scared",image:"../../media/feelings/scared.webp"}
],
answer:"scared"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["sad","happy","angry","tired"],
answer:"happy"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["tired","sad","scared","happy"],
answer:"sad"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["happy","angry","scared","sad"],
answer:"angry"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["angry","sad","tired","happy"],
answer:"tired"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["tired","happy","sad","scared"],
answer:"scared"
},

/* AUDIO */

{
type:"audio",
speak:"happy",
question:"کدام کلمه را شنیدی؟",
options:["sad","happy","angry","tired"],
answer:"happy"
},

{
type:"audio",
speak:"sad",
question:"کدام کلمه را شنیدی؟",
options:["tired","sad","scared","happy"],
answer:"sad"
},

{
type:"audio",
speak:"angry",
question:"کدام کلمه را شنیدی؟",
options:["happy","angry","scared","sad"],
answer:"angry"
},

{
type:"audio",
speak:"tired",
question:"کدام کلمه را شنیدی؟",
options:["angry","sad","tired","happy"],
answer:"tired"
},

{
type:"audio",
speak:"scared",
question:"کدام کلمه را شنیدی؟",
options:["tired","happy","sad","scared"],
answer:"scared"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I am happy",
question:"جمله انگلیسی را بساز:",
text:"من خوشحال هستم",
words:["happy","am","I"],
answer:["I","am","happy"]
},

{
type:"build-en",
speak:"She is sad",
question:"جمله انگلیسی را بساز:",
text:"او ناراحت است",
words:["sad","is","She"],
answer:["She","is","sad"]
},

{
type:"build-en",
speak:"He is angry",
question:"جمله انگلیسی را بساز:",
text:"او عصبانی است",
words:["angry","is","He"],
answer:["He","is","angry"]
},

{
type:"build-en",
speak:"We are tired",
question:"جمله انگلیسی را بساز:",
text:"ما خسته هستیم",
words:["tired","are","We"],
answer:["We","are","tired"]
},

{
type:"build-en",
speak:"They are scared",
question:"جمله انگلیسی را بساز:",
text:"آنها ترسیده هستند",
words:["scared","are","They"],
answer:["They","are","scared"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I am happy",
question:"ترجمه را بساز:",
text:"I am happy",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"She is sad",
question:"ترجمه را بساز:",
text:"She is sad",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"He is angry",
question:"ترجمه را بساز:",
text:"He is angry",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"We are tired",
question:"ترجمه را بساز:",
text:"We are tired",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"They are scared",
question:"ترجمه را بساز:",
text:"They are scared",
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

  // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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