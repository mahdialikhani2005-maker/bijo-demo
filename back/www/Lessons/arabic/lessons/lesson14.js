let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
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
  utter.lang = "ar-SA";
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
question:"معلم کدام است؟",
speak:"معلم",
options:[
{text:"طبيب",image:"../../media/jobs/doctor.webp"},
{text:"معلم",image:"../../media/jobs/teacher.webp"},
{text:"مهندس",image:"../../media/jobs/engineer.webp"},
{text:"طالب",image:"../../media/jobs/student.webp"}
],
answer:"معلم"
},

{
type:"image",
question:"طبيب کدام است؟",
speak:"طبيب",
options:[
{text:"طالب",image:"../../media/jobs/student.webp"},
{text:"طبيب",image:"../../media/jobs/doctor.webp"},
{text:"سائق",image:"../../media/jobs/driver.webp"},
{text:"معلم",image:"../../media/jobs/teacher.webp"}
],
answer:"طبيب"
},

{
type:"image",
question:"مهندس کدام است؟",
speak:"مهندس",
options:[
{text:"معلم",image:"../../media/jobs/teacher.webp"},
{text:"مهندس",image:"../../media/jobs/engineer.webp"},
{text:"سائق",image:"../../media/jobs/driver.webp"},
{text:"طبيب",image:"../../media/jobs/doctor.webp"}
],
answer:"مهندس"
},

{
type:"image",
question:"طالب کدام است؟",
speak:"طالب",
options:[
{text:"مهندس",image:"../../media/jobs/engineer.webp"},
{text:"طبيب",image:"../../media/jobs/doctor.webp"},
{text:"طالب",image:"../../media/jobs/student.webp"},
{text:"معلم",image:"../../media/jobs/teacher.webp"}
],
answer:"طالب"
},

{
type:"image",
question:"سائق کدام است؟",
speak:"سائق",
options:[
{text:"طالب",image:"../../media/jobs/student.webp"},
{text:"معلم",image:"../../media/jobs/teacher.webp"},
{text:"طبيب",image:"../../media/jobs/doctor.webp"},
{text:"سائق",image:"../../media/jobs/driver.webp"}
],
answer:"سائق"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["طبيب","معلم","مهندس","طالب"],
answer:"معلم"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["طالب","طبيب","سائق","معلم"],
answer:"طبيب"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["معلم","مهندس","سائق","طبيب"],
answer:"مهندس"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["مهندس","طبيب","طالب","معلم"],
answer:"طالب"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["طالب","معلم","طبيب","سائق"],
answer:"سائق"
},

/* AUDIO */

{
type:"audio",
speak:"معلم",
question:"کدام کلمه را شنیدی؟",
options:["طبيب","معلم","مهندس","طالب"],
answer:"معلم"
},

{
type:"audio",
speak:"طبيب",
question:"کدام کلمه را شنیدی؟",
options:["طالب","طبيب","سائق","معلم"],
answer:"طبيب"
},

{
type:"audio",
speak:"مهندس",
question:"کدام کلمه را شنیدی؟",
options:["معلم","مهندس","سائق","طبيب"],
answer:"مهندس"
},

{
type:"audio",
speak:"طالب",
question:"کدام کلمه را شنیدی؟",
options:["مهندس","طبيب","طالب","معلم"],
answer:"طالب"
},

{
type:"audio",
speak:"سائق",
question:"کدام کلمه را شنیدی؟",
options:["طالب","معلم","طبيب","سائق"],
answer:"سائق"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"هي معلمة",
question:"جمله عربی را بساز:",
text:"او یک معلم است",
words:["هي","معلمة"],
answer:["هي","معلمة"]
},

{
type:"build-ar",
speak:"هو طبيب",
question:"جمله عربی را بساز:",
text:"او یک دکتر است",
words:["هو","طبيب"],
answer:["هو","طبيب"]
},

{
type:"build-ar",
speak:"هي مهندسة",
question:"جمله عربی را بساز:",
text:"او یک مهندس است",
words:["هي","مهندسة"],
answer:["هي","مهندسة"]
},

{
type:"build-ar",
speak:"أنا طالب",
question:"جمله عربی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["أنا","طالب"],
answer:["أنا","طالب"]
},

{
type:"build-ar",
speak:"هو سائق",
question:"جمله عربی را بساز:",
text:"او یک راننده است",
words:["هو","سائق"],
answer:["هو","سائق"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"هي معلمة",
question:"ترجمه را بساز:",
text:"هي معلمة",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"هو طبيب",
question:"ترجمه را بساز:",
text:"هو طبيب",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"هي مهندسة",
question:"ترجمه را بساز:",
text:"هي مهندسة",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"أنا طالب",
question:"ترجمه را بساز:",
text:"أنا طالب",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"هو سائق",
question:"ترجمه را بساز:",
text:"هو سائق",
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

  // BUILD ARABIC / FA

  else if (q.type === "build-ar" || q.type === "build-fa") {
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

  if (q.type === "build-ar") {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
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