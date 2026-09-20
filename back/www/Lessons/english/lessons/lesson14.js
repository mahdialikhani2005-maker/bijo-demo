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
question:"teacher کدام است؟",
speak:"teacher",
options:[
{text:"doctor",image:"../../media/jobs/doctor.webp"},
{text:"teacher",image:"../../media/jobs/teacher.webp"},
{text:"engineer",image:"../../media/jobs/engineer.webp"},
{text:"student",image:"../../media/jobs/student.webp"}
],
answer:"teacher"
},

{
type:"image",
question:"doctor کدام است؟",
speak:"doctor",
options:[
{text:"student",image:"../../media/jobs/student.webp"},
{text:"doctor",image:"../../media/jobs/doctor.webp"},
{text:"driver",image:"../../media/jobs/driver.webp"},
{text:"teacher",image:"../../media/jobs/teacher.webp"}
],
answer:"doctor"
},

{
type:"image",
question:"engineer کدام است؟",
speak:"engineer",
options:[
{text:"teacher",image:"../../media/jobs/teacher.webp"},
{text:"engineer",image:"../../media/jobs/engineer.webp"},
{text:"driver",image:"../../media/jobs/driver.webp"},
{text:"doctor",image:"../../media/jobs/doctor.webp"}
],
answer:"engineer"
},

{
type:"image",
question:"student کدام است؟",
speak:"student",
options:[
{text:"engineer",image:"../../media/jobs/engineer.webp"},
{text:"doctor",image:"../../media/jobs/doctor.webp"},
{text:"student",image:"../../media/jobs/student.webp"},
{text:"teacher",image:"../../media/jobs/teacher.webp"}
],
answer:"student"
},

{
type:"image",
question:"driver کدام است؟",
speak:"driver",
options:[
{text:"student",image:"../../media/jobs/student.webp"},
{text:"teacher",image:"../../media/jobs/teacher.webp"},
{text:"doctor",image:"../../media/jobs/doctor.webp"},
{text:"driver",image:"../../media/jobs/driver.webp"}
],
answer:"driver"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["doctor","teacher","engineer","student"],
answer:"teacher"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["student","doctor","driver","teacher"],
answer:"doctor"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["teacher","engineer","driver","doctor"],
answer:"engineer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["engineer","doctor","student","teacher"],
answer:"student"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["student","teacher","doctor","driver"],
answer:"driver"
},

/* AUDIO */

{
type:"audio",
speak:"teacher",
question:"کدام کلمه را شنیدی؟",
options:["doctor","teacher","engineer","student"],
answer:"teacher"
},

{
type:"audio",
speak:"doctor",
question:"کدام کلمه را شنیدی؟",
options:["student","doctor","driver","teacher"],
answer:"doctor"
},

{
type:"audio",
speak:"engineer",
question:"کدام کلمه را شنیدی؟",
options:["teacher","engineer","driver","doctor"],
answer:"engineer"
},

{
type:"audio",
speak:"student",
question:"کدام کلمه را شنیدی؟",
options:["engineer","doctor","student","teacher"],
answer:"student"
},

{
type:"audio",
speak:"driver",
question:"کدام کلمه را شنیدی؟",
options:["student","teacher","doctor","driver"],
answer:"driver"
},

/* BUILD EN - جدید */

{
type:"build-en",
speak:"She is a teacher",
question:"جمله انگلیسی را بساز:",
text:"او یک معلم است",
words:["teacher","a","is","She"],
answer:["She","is","a","teacher"]
},

{
type:"build-en",
speak:"He is a doctor",
question:"جمله انگلیسی را بساز:",
text:"او یک دکتر است",
words:["doctor","a","is","He"],
answer:["He","is","a","doctor"]
},

{
type:"build-en",
speak:"She is an engineer",
question:"جمله انگلیسی را بساز:",
text:"او یک مهندس است",
words:["engineer","an","is","She"],
answer:["She","is","an","engineer"]
},

{
type:"build-en",
speak:"I am a student",
question:"جمله انگلیسی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["student","a","am","I"],
answer:["I","am","a","student"]
},

{
type:"build-en",
speak:"He is a driver",
question:"جمله انگلیسی را بساز:",
text:"او یک راننده است",
words:["driver","a","is","He"],
answer:["He","is","a","driver"]
},

/* BUILD FA - جدید */

{
type:"build-fa",
speak:"She is a teacher",
question:"ترجمه را بساز:",
text:"She is a teacher",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"He is a doctor",
question:"ترجمه را بساز:",
text:"He is a doctor",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"She is an engineer",
question:"ترجمه را بساز:",
text:"She is an engineer",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"I am a student",
question:"ترجمه را بساز:",
text:"I am a student",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"He is a driver",
question:"ترجمه را بساز:",
text:"He is a driver",
words:["است","راننده","یک","او"],
answer:["او","یک","راننده","است"]
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