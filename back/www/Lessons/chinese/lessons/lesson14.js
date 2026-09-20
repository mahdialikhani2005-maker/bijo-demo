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
question:"老师 (lǎoshī) کدام است؟",
speak:"老师",
options:[
{text:"医生 (yīshēng)",image:"../../media/jobs/doctor.webp"},
{text:"老师 (lǎoshī)",image:"../../media/jobs/teacher.webp"},
{text:"工程师 (gōngchéngshī)",image:"../../media/jobs/engineer.webp"},
{text:"学生 (xuésheng)",image:"../../media/jobs/student.webp"}
],
answer:"老师 (lǎoshī)"
},

{
type:"image",
question:"医生 (yīshēng) کدام است؟",
speak:"医生",
options:[
{text:"学生 (xuésheng)",image:"../../media/jobs/student.webp"},
{text:"医生 (yīshēng)",image:"../../media/jobs/doctor.webp"},
{text:"司机 (sījī)",image:"../../media/jobs/driver.webp"},
{text:"老师 (lǎoshī)",image:"../../media/jobs/teacher.webp"}
],
answer:"医生 (yīshēng)"
},

{
type:"image",
question:"工程师 (gōngchéngshī) کدام است؟",
speak:"工程师",
options:[
{text:"老师 (lǎoshī)",image:"../../media/jobs/teacher.webp"},
{text:"工程师 (gōngchéngshī)",image:"../../media/jobs/engineer.webp"},
{text:"司机 (sījī)",image:"../../media/jobs/driver.webp"},
{text:"医生 (yīshēng)",image:"../../media/jobs/doctor.webp"}
],
answer:"工程师 (gōngchéngshī)"
},

{
type:"image",
question:"学生 (xuésheng) کدام است؟",
speak:"学生",
options:[
{text:"工程师 (gōngchéngshī)",image:"../../media/jobs/engineer.webp"},
{text:"医生 (yīshēng)",image:"../../media/jobs/doctor.webp"},
{text:"学生 (xuésheng)",image:"../../media/jobs/student.webp"},
{text:"老师 (lǎoshī)",image:"../../media/jobs/teacher.webp"}
],
answer:"学生 (xuésheng)"
},

{
type:"image",
question:"司机 (sījī) کدام است؟",
speak:"司机",
options:[
{text:"学生 (xuésheng)",image:"../../media/jobs/student.webp"},
{text:"老师 (lǎoshī)",image:"../../media/jobs/teacher.webp"},
{text:"医生 (yīshēng)",image:"../../media/jobs/doctor.webp"},
{text:"司机 (sījī)",image:"../../media/jobs/driver.webp"}
],
answer:"司机 (sījī)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["医生 (yīshēng)","老师 (lǎoshī)","工程师 (gōngchéngshī)","学生 (xuésheng)"],
answer:"老师 (lǎoshī)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["学生 (xuésheng)","医生 (yīshēng)","司机 (sījī)","老师 (lǎoshī)"],
answer:"医生 (yīshēng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["老师 (lǎoshī)","工程师 (gōngchéngshī)","司机 (sījī)","医生 (yīshēng)"],
answer:"工程师 (gōngchéngshī)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["工程师 (gōngchéngshī)","医生 (yīshēng)","学生 (xuésheng)","老师 (lǎoshī)"],
answer:"学生 (xuésheng)"
},

{
type:"word",
question:"این تصویر چیست？",
image:"../../media/jobs/driver.webp",
options:["学生 (xuésheng)","老师 (lǎoshī)","医生 (yīshēng)","司机 (sījī)"],
answer:"司机 (sījī)"
},

/* AUDIO */

{
type:"audio",
speak:"老师",
question:"کدام کلمه را شنیدی؟",
options:["医生 (yīshēng)","老师 (lǎoshī)","工程师 (gōngchéngshī)","学生 (xuésheng)"],
answer:"老师 (lǎoshī)"
},

{
type:"audio",
speak:"医生",
question:"کدام کلمه را شنیدی؟",
options:["学生 (xuésheng)","医生 (yīshēng)","司机 (sījī)","老师 (lǎoshī)"],
answer:"医生 (yīshēng)"
},

{
type:"audio",
speak:"工程师",
question:"کدام کلمه را شنیدی؟",
options:["老师 (lǎoshī)","工程师 (gōngchéngshī)","司机 (sījī)","医生 (yīshēng)"],
answer:"工程师 (gōngchéngshī)"
},

{
type:"audio",
speak:"学生",
question:"کدام کلمه را شنیدی؟",
options:["工程师 (gōngchéngshī)","医生 (yīshēng)","学生 (xuésheng)","老师 (lǎoshī)"],
answer:"学生 (xuésheng)"
},

{
type:"audio",
speak:"司机",
question:"کدام کلمه را شنیدی؟",
options:["学生 (xuésheng)","老师 (lǎoshī)","医生 (yīshēng)","司机 (sījī)"],
answer:"司机 (sījī)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"她是老师",
question:"جمله چینی را بساز:",
text:"او یک معلم است",
words:["她","是","老师"],
answer:["她","是","老师"]
},

{
type:"build-zh",
speak:"他是医生",
question:"جمله چینی را بساز:",
text:"او یک دکتر است",
words:["他","是","医生"],
answer:["他","是","医生"]
},

{
type:"build-zh",
speak:"她是工程师",
question:"جمله چینی را بساز:",
text:"او یک مهندس است",
words:["她","是","工程师"],
answer:["她","是","工程师"]
},

{
type:"build-zh",
speak:"我是学生",
question:"جمله چینی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["我","是","学生"],
answer:["我","是","学生"]
},

{
type:"build-zh",
speak:"他是司机",
question:"جمله چینی را بساز:",
text:"او یک راننده است",
words:["他","是","司机"],
answer:["他","是","司机"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"她是老师",
question:"ترجمه را بساز:",
text:"她是老师",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"他是医生",
question:"ترجمه را بساز:",
text:"他是医生",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"她是工程师",
question:"ترجمه را بساز:",
text:"她是工程师",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"我是学生",
question:"ترجمه را بساز:",
text:"我是学生",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"他是司机",
question:"ترجمه را بساز:",
text:"他是司机",
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