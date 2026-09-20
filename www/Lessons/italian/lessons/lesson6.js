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
question:"la mela کدام است؟",
speak:"la mela",
options:[
{text:"la banana",image:"../../media/fruits/banana.webp"},
{text:"la mela",image:"../../media/fruits/apple.webp"},
{text:"l'arancia",image:"../../media/fruits/orange.webp"},
{text:"l'uva",image:"../../media/fruits/grape.webp"}
],
answer:"la mela"
},

{
type:"image",
question:"la banana کدام است؟",
speak:"la banana",
options:[
{text:"l'uva",image:"../../media/fruits/grape.webp"},
{text:"la banana",image:"../../media/fruits/banana.webp"},
{text:"l'anguria",image:"../../media/fruits/watermelon.webp"},
{text:"la mela",image:"../../media/fruits/apple.webp"}
],
answer:"la banana"
},

{
type:"image",
question:"l'arancia کدام است؟",
speak:"l'arancia",
options:[
{text:"la mela",image:"../../media/fruits/apple.webp"},
{text:"l'arancia",image:"../../media/fruits/orange.webp"},
{text:"l'anguria",image:"../../media/fruits/watermelon.webp"},
{text:"la banana",image:"../../media/fruits/banana.webp"}
],
answer:"l'arancia"
},

{
type:"image",
question:"l'uva کدام است؟",
speak:"l'uva",
options:[
{text:"l'arancia",image:"../../media/fruits/orange.webp"},
{text:"la banana",image:"../../media/fruits/banana.webp"},
{text:"l'uva",image:"../../media/fruits/grape.webp"},
{text:"la mela",image:"../../media/fruits/apple.webp"}
],
answer:"l'uva"
},

{
type:"image",
question:"l'anguria کدام است؟",
speak:"l'anguria",
options:[
{text:"l'uva",image:"../../media/fruits/grape.webp"},
{text:"la mela",image:"../../media/fruits/apple.webp"},
{text:"la banana",image:"../../media/fruits/banana.webp"},
{text:"l'anguria",image:"../../media/fruits/watermelon.webp"}
],
answer:"l'anguria"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/apple.webp",
options:["la banana","la mela","l'arancia","l'uva"],
answer:"la mela"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/banana.webp",
options:["l'uva","la banana","l'anguria","la mela"],
answer:"la banana"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/orange.webp",
options:["la mela","l'arancia","l'anguria","la banana"],
answer:"l'arancia"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/grape.webp",
options:["l'arancia","la banana","l'uva","la mela"],
answer:"l'uva"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/watermelon.webp",
options:["l'uva","la mela","la banana","l'anguria"],
answer:"l'anguria"
},

/* AUDIO */

{
type:"audio",
speak:"la mela",
question:"کدام کلمه را شنیدی؟",
options:["la banana","la mela","l'arancia","l'uva"],
answer:"la mela"
},

{
type:"audio",
speak:"la banana",
question:"کدام کلمه را شنیدی؟",
options:["l'uva","la banana","l'anguria","la mela"],
answer:"la banana"
},

{
type:"audio",
speak:"l'arancia",
question:"کدام کلمه را شنیدی؟",
options:["la mela","l'arancia","l'anguria","la banana"],
answer:"l'arancia"
},

{
type:"audio",
speak:"l'uva",
question:"کدام کلمه را شنیدی؟",
options:["l'arancia","la banana","l'uva","la mela"],
answer:"l'uva"
},

{
type:"audio",
speak:"l'anguria",
question:"کدام کلمه را شنیدی؟",
options:["l'uva","la mela","la banana","l'anguria"],
answer:"l'anguria"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Io mangio una mela",
question:"جمله ایتالیایی را بساز:",
text:"من یک سیب می‌خورم",
words:["Io","mangio","una","mela"],
answer:["Io","mangio","una","mela"]
},

{
type:"build-it",
speak:"Lei ha una banana",
question:"جمله ایتالیایی را بساز:",
text:"او یک موز دارد",
words:["Lei","ha","una","banana"],
answer:["Lei","ha","una","banana"]
},

{
type:"build-it",
speak:"Questa è un'arancia",
question:"جمله ایتالیایی را بساز:",
text:"این یک پرتقال است",
words:["Questa","è","un'","arancia"],
answer:["Questa","è","un'","arancia"]
},

{
type:"build-it",
speak:"Mi piace l'uva",
question:"جمله ایتالیایی را بساز:",
text:"من انگور دوست دارم",
words:["Mi","piace","l'uva"],
answer:["Mi","piace","l'uva"]
},

{
type:"build-it",
speak:"Lui mangia l'anguria",
question:"جمله ایتالیایی را بساز:",
text:"او هندوانه می‌خورد",
words:["Lui","mangia","l'anguria"],
answer:["Lui","mangia","l'anguria"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Io mangio una mela",
question:"ترجمه را بساز:",
text:"Io mangio una mela",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"Lei ha una banana",
question:"ترجمه را بساز:",
text:"Lei ha una banana",
words:["دارد","موز","یک","او"],
answer:["او","یک","موز","دارد"]
},

{
type:"build-fa",
speak:"Questa è un'arancia",
question:"ترجمه را بساز:",
text:"Questa è un'arancia",
words:["است","پرتقال","یک","این"],
answer:["این","یک","پرتقال","است"]
},

{
type:"build-fa",
speak:"Mi piace l'uva",
question:"ترجمه را بساز:",
text:"Mi piace l'uva",
words:["دارم","دوست","انگور","من"],
answer:["من","انگور","دوست","دارم"]
},

{
type:"build-fa",
speak:"Lui mangia l'anguria",
question:"ترجمه را بساز:",
text:"Lui mangia l'anguria",
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