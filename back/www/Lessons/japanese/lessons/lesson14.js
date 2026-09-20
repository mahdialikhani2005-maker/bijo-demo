let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ja-JP",
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
  utter.lang = "ja-JP";
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
question:"先生 (sensei) کدام است؟",
speak:"先生",
options:[
{text:"医者 (isha)",image:"../../media/jobs/doctor.webp"},
{text:"先生 (sensei)",image:"../../media/jobs/teacher.webp"},
{text:"エンジニア (enjinia)",image:"../../media/jobs/engineer.webp"},
{text:"学生 (gakusei)",image:"../../media/jobs/student.webp"}
],
answer:"先生 (sensei)"
},

{
type:"image",
question:"医者 (isha) کدام است؟",
speak:"医者",
options:[
{text:"学生 (gakusei)",image:"../../media/jobs/student.webp"},
{text:"医者 (isha)",image:"../../media/jobs/doctor.webp"},
{text:"運転手 (untenshu)",image:"../../media/jobs/driver.webp"},
{text:"先生 (sensei)",image:"../../media/jobs/teacher.webp"}
],
answer:"医者 (isha)"
},

{
type:"image",
question:"エンジニア (enjinia) کدام است؟",
speak:"エンジニア",
options:[
{text:"先生 (sensei)",image:"../../media/jobs/teacher.webp"},
{text:"エンジニア (enjinia)",image:"../../media/jobs/engineer.webp"},
{text:"運転手 (untenshu)",image:"../../media/jobs/driver.webp"},
{text:"医者 (isha)",image:"../../media/jobs/doctor.webp"}
],
answer:"エンジニア (enjinia)"
},

{
type:"image",
question:"学生 (gakusei) کدام است؟",
speak:"学生",
options:[
{text:"エンジニア (enjinia)",image:"../../media/jobs/engineer.webp"},
{text:"医者 (isha)",image:"../../media/jobs/doctor.webp"},
{text:"学生 (gakusei)",image:"../../media/jobs/student.webp"},
{text:"先生 (sensei)",image:"../../media/jobs/teacher.webp"}
],
answer:"学生 (gakusei)"
},

{
type:"image",
question:"運転手 (untenshu) کدام است؟",
speak:"運転手",
options:[
{text:"学生 (gakusei)",image:"../../media/jobs/student.webp"},
{text:"先生 (sensei)",image:"../../media/jobs/teacher.webp"},
{text:"医者 (isha)",image:"../../media/jobs/doctor.webp"},
{text:"運転手 (untenshu)",image:"../../media/jobs/driver.webp"}
],
answer:"運転手 (untenshu)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["医者","先生","エンジニア","学生"],
answer:"先生"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["学生","医者","運転手","先生"],
answer:"医者"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["先生","エンジニア","運転手","医者"],
answer:"エンジニア"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["エンジニア","医者","学生","先生"],
answer:"学生"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["学生","先生","医者","運転手"],
answer:"運転手"
},

/* AUDIO */

{
type:"audio",
speak:"先生",
question:"کدام کلمه را شنیدی؟",
options:["医者","先生","エンジニア","学生"],
answer:"先生"
},

{
type:"audio",
speak:"医者",
question:"کدام کلمه را شنیدی؟",
options:["学生","医者","運転手","先生"],
answer:"医者"
},

{
type:"audio",
speak:"エンジニア",
question:"کدام کلمه را شنیدی؟",
options:["先生","エンジニア","運転手","医者"],
answer:"エンジニア"
},

{
type:"audio",
speak:"学生",
question:"کدام کلمه را شنیدی؟",
options:["エンジニア","医者","学生","先生"],
answer:"学生"
},

{
type:"audio",
speak:"運転手",
question:"کدام کلمه را شنیدی؟",
options:["学生","先生","医者","運転手"],
answer:"運転手"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"彼女は先生です",
question:"جمله ژاپنی را بساز:",
text:"او یک معلم است",
words:["彼女","は","先生","です"],
answer:["彼女","は","先生","です"]
},

{
type:"build-jp",
speak:"彼は医者です",
question:"جمله ژاپنی را بساز:",
text:"او یک دکتر است",
words:["彼","は","医者","です"],
answer:["彼","は","医者","です"]
},

{
type:"build-jp",
speak:"彼女はエンジニアです",
question:"جمله ژاپنی را بساز:",
text:"او یک مهندس است",
words:["彼女","は","エンジニア","です"],
answer:["彼女","は","エンジニア","です"]
},

{
type:"build-jp",
speak:"私は学生です",
question:"جمله ژاپنی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["私","は","学生","です"],
answer:["私","は","学生","です"]
},

{
type:"build-jp",
speak:"彼は運転手です",
question:"جمله ژاپنی را بساز:",
text:"او یک راننده است",
words:["彼","は","運転手","です"],
answer:["彼","は","運転手","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"彼女は先生です",
question:"ترجمه را بساز:",
text:"彼女は先生です",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"彼は医者です",
question:"ترجمه را بساز:",
text:"彼は医者です",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"彼女はエンジニアです",
question:"ترجمه را بساز:",
text:"彼女はエンジニアです",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"私は学生です",
question:"ترجمه را بساز:",
text:"私は学生です",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"彼は運転手です",
question:"ترجمه را بساز:",
text:"彼は運転手です",
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

  // BUILD JAPANESE / FA

  else if (q.type === "build-jp" || q.type === "build-fa") {
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

  if (q.type === "build-jp") {
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