let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "fr-FR",
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
  utter.lang = "fr-FR";
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
question:"professeur کدام است؟",
speak:"professeur",
options:[
{text:"médecin",image:"../../media/jobs/doctor.webp"},
{text:"professeur",image:"../../media/jobs/teacher.webp"},
{text:"ingénieur",image:"../../media/jobs/engineer.webp"},
{text:"étudiant",image:"../../media/jobs/student.webp"}
],
answer:"professeur"
},

{
type:"image",
question:"médecin کدام است؟",
speak:"médecin",
options:[
{text:"étudiant",image:"../../media/jobs/student.webp"},
{text:"médecin",image:"../../media/jobs/doctor.webp"},
{text:"chauffeur",image:"../../media/jobs/driver.webp"},
{text:"professeur",image:"../../media/jobs/teacher.webp"}
],
answer:"médecin"
},

{
type:"image",
question:"ingénieur کدام است؟",
speak:"ingénieur",
options:[
{text:"professeur",image:"../../media/jobs/teacher.webp"},
{text:"ingénieur",image:"../../media/jobs/engineer.webp"},
{text:"chauffeur",image:"../../media/jobs/driver.webp"},
{text:"médecin",image:"../../media/jobs/doctor.webp"}
],
answer:"ingénieur"
},

{
type:"image",
question:"étudiant کدام است؟",
speak:"étudiant",
options:[
{text:"ingénieur",image:"../../media/jobs/engineer.webp"},
{text:"médecin",image:"../../media/jobs/doctor.webp"},
{text:"étudiant",image:"../../media/jobs/student.webp"},
{text:"professeur",image:"../../media/jobs/teacher.webp"}
],
answer:"étudiant"
},

{
type:"image",
question:"chauffeur کدام است؟",
speak:"chauffeur",
options:[
{text:"étudiant",image:"../../media/jobs/student.webp"},
{text:"professeur",image:"../../media/jobs/teacher.webp"},
{text:"médecin",image:"../../media/jobs/doctor.webp"},
{text:"chauffeur",image:"../../media/jobs/driver.webp"}
],
answer:"chauffeur"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["médecin","professeur","ingénieur","étudiant"],
answer:"professeur"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["étudiant","médecin","chauffeur","professeur"],
answer:"médecin"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["professeur","ingénieur","chauffeur","médecin"],
answer:"ingénieur"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["ingénieur","médecin","étudiant","professeur"],
answer:"étudiant"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["étudiant","professeur","médecin","chauffeur"],
answer:"chauffeur"
},

/* AUDIO */

{
type:"audio",
speak:"professeur",
question:"کدام کلمه را شنیدی؟",
options:["médecin","professeur","ingénieur","étudiant"],
answer:"professeur"
},

{
type:"audio",
speak:"médecin",
question:"کدام کلمه را شنیدی؟",
options:["étudiant","médecin","chauffeur","professeur"],
answer:"médecin"
},

{
type:"audio",
speak:"ingénieur",
question:"کدام کلمه را شنیدی؟",
options:["professeur","ingénieur","chauffeur","médecin"],
answer:"ingénieur"
},

{
type:"audio",
speak:"étudiant",
question:"کدام کلمه را شنیدی؟",
options:["ingénieur","médecin","étudiant","professeur"],
answer:"étudiant"
},

{
type:"audio",
speak:"chauffeur",
question:"کدام کلمه را شنیدی؟",
options:["étudiant","professeur","médecin","chauffeur"],
answer:"chauffeur"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"Elle est professeur",
question:"جمله فرانسوی را بساز:",
text:"او یک معلم است",
words:["Elle","est","professeur"],
answer:["Elle","est","professeur"]
},

{
type:"build-fr",
speak:"Il est médecin",
question:"جمله فرانسوی را بساز:",
text:"او یک دکتر است",
words:["Il","est","médecin"],
answer:["Il","est","médecin"]
},

{
type:"build-fr",
speak:"Elle est ingénieure",
question:"جمله فرانسوی را بساز:",
text:"او یک مهندس است",
words:["Elle","est","ingénieure"],
answer:["Elle","est","ingénieure"]
},

{
type:"build-fr",
speak:"Je suis étudiant",
question:"جمله فرانسوی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["Je","suis","étudiant"],
answer:["Je","suis","étudiant"]
},

{
type:"build-fr",
speak:"Il est chauffeur",
question:"جمله فرانسوی را بساز:",
text:"او یک راننده است",
words:["Il","est","chauffeur"],
answer:["Il","est","chauffeur"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Elle est professeur",
question:"ترجمه را بساز:",
text:"Elle est professeur",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"Il est médecin",
question:"ترجمه را بساز:",
text:"Il est médecin",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"Elle est ingénieure",
question:"ترجمه را بساز:",
text:"Elle est ingénieure",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"Je suis étudiant",
question:"ترجمه را بساز:",
text:"Je suis étudiant",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Il est chauffeur",
question:"ترجمه را بساز:",
text:"Il est chauffeur",
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

  // BUILD FRENCH / FA

  else if (q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-fr") {
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