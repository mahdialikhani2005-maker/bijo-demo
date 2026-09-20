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
question:"il sole کدام است؟",
speak:"il sole",
options:[
{text:"la luna",image:"../../media/nature/moon.webp"},
{text:"il sole",image:"../../media/nature/sun.webp"},
{text:"la stella",image:"../../media/nature/star.webp"},
{text:"il cielo",image:"../../media/nature/sky.webp"}
],
answer:"il sole"
},

{
type:"image",
question:"la luna کدام است؟",
speak:"la luna",
options:[
{text:"la stella",image:"../../media/nature/star.webp"},
{text:"la luna",image:"../../media/nature/moon.webp"},
{text:"la pioggia",image:"../../media/nature/rain.webp"},
{text:"il sole",image:"../../media/nature/sun.webp"}
],
answer:"la luna"
},

{
type:"image",
question:"la stella کدام است؟",
speak:"la stella",
options:[
{text:"il sole",image:"../../media/nature/sun.webp"},
{text:"la stella",image:"../../media/nature/star.webp"},
{text:"la pioggia",image:"../../media/nature/rain.webp"},
{text:"la luna",image:"../../media/nature/moon.webp"}
],
answer:"la stella"
},

{
type:"image",
question:"il cielo کدام است؟",
speak:"il cielo",
options:[
{text:"la stella",image:"../../media/nature/star.webp"},
{text:"la luna",image:"../../media/nature/moon.webp"},
{text:"il cielo",image:"../../media/nature/sky.webp"},
{text:"il sole",image:"../../media/nature/sun.webp"}
],
answer:"il cielo"
},

{
type:"image",
question:"la pioggia کدام است؟",
speak:"la pioggia",
options:[
{text:"il cielo",image:"../../media/nature/sky.webp"},
{text:"il sole",image:"../../media/nature/sun.webp"},
{text:"la luna",image:"../../media/nature/moon.webp"},
{text:"la pioggia",image:"../../media/nature/rain.webp"}
],
answer:"la pioggia"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["la luna","il sole","la stella","il cielo"],
answer:"il sole"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["la stella","la luna","la pioggia","il sole"],
answer:"la luna"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["il sole","la stella","la pioggia","la luna"],
answer:"la stella"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["la stella","la luna","il cielo","il sole"],
answer:"il cielo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["il cielo","il sole","la luna","la pioggia"],
answer:"la pioggia"
},

/* AUDIO */

{
type:"audio",
speak:"il sole",
question:"کدام کلمه را شنیدی؟",
options:["la luna","il sole","la stella","il cielo"],
answer:"il sole"
},

{
type:"audio",
speak:"la luna",
question:"کدام کلمه را شنیدی؟",
options:["la stella","la luna","la pioggia","il sole"],
answer:"la luna"
},

{
type:"audio",
speak:"la stella",
question:"کدام کلمه را شنیدی؟",
options:["il sole","la stella","la pioggia","la luna"],
answer:"la stella"
},

{
type:"audio",
speak:"il cielo",
question:"کدام کلمه را شنیدی؟",
options:["la stella","la luna","il cielo","il sole"],
answer:"il cielo"
},

{
type:"audio",
speak:"la pioggia",
question:"کدام کلمه را شنیدی؟",
options:["il cielo","il sole","la luna","la pioggia"],
answer:"la pioggia"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Io vedo il sole",
question:"جمله ایتالیایی را بساز:",
text:"من خورشید را می‌بینم",
words:["Io","vedo","il","sole"],
answer:["Io","vedo","il","sole"]
},

{
type:"build-it",
speak:"La luna è grande",
question:"جمله ایتالیایی را بساز:",
text:"ماه بزرگ است",
words:["La","luna","è","grande"],
answer:["La","luna","è","grande"]
},

{
type:"build-it",
speak:"La stella è piccola",
question:"جمله ایتالیایی را بساز:",
text:"ستاره کوچک است",
words:["La","stella","è","piccola"],
answer:["La","stella","è","piccola"]
},

{
type:"build-it",
speak:"Il cielo è azzurro",
question:"جمله ایتالیایی را بساز:",
text:"آسمان آبی است",
words:["Il","cielo","è","azzurro"],
answer:["Il","cielo","è","azzurro"]
},

{
type:"build-it",
speak:"Mi piace la pioggia",
question:"جمله ایتالیایی را بساز:",
text:"من باران را دوست دارم",
words:["Mi","piace","la","pioggia"],
answer:["Mi","piace","la","pioggia"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Io vedo il sole",
question:"ترجمه را بساز:",
text:"Io vedo il sole",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"La luna è grande",
question:"ترجمه را بساز:",
text:"La luna è grande",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"La stella è piccola",
question:"ترجمه را بساز:",
text:"La stella è piccola",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"Il cielo è azzurro",
question:"ترجمه را بساز:",
text:"Il cielo è azzurro",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Mi piace la pioggia",
question:"ترجمه را بساز:",
text:"Mi piace la pioggia",
words:["دارم","دوست","باران","را","من"],
answer:["من","باران","را","دوست","دارم"]
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