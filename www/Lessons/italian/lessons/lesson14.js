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
question:"l'insegnante کدام است؟",
speak:"l'insegnante",
options:[
{text:"il medico",image:"../../media/jobs/doctor.webp"},
{text:"l'insegnante",image:"../../media/jobs/teacher.webp"},
{text:"l'ingegnere",image:"../../media/jobs/engineer.webp"},
{text:"lo studente",image:"../../media/jobs/student.webp"}
],
answer:"l'insegnante"
},

{
type:"image",
question:"il medico کدام است؟",
speak:"il medico",
options:[
{text:"lo studente",image:"../../media/jobs/student.webp"},
{text:"il medico",image:"../../media/jobs/doctor.webp"},
{text:"l'autista",image:"../../media/jobs/driver.webp"},
{text:"l'insegnante",image:"../../media/jobs/teacher.webp"}
],
answer:"il medico"
},

{
type:"image",
question:"l'ingegnere کدام است؟",
speak:"l'ingegnere",
options:[
{text:"l'insegnante",image:"../../media/jobs/teacher.webp"},
{text:"l'ingegnere",image:"../../media/jobs/engineer.webp"},
{text:"l'autista",image:"../../media/jobs/driver.webp"},
{text:"il medico",image:"../../media/jobs/doctor.webp"}
],
answer:"l'ingegnere"
},

{
type:"image",
question:"lo studente کدام است؟",
speak:"lo studente",
options:[
{text:"l'ingegnere",image:"../../media/jobs/engineer.webp"},
{text:"il medico",image:"../../media/jobs/doctor.webp"},
{text:"lo studente",image:"../../media/jobs/student.webp"},
{text:"l'insegnante",image:"../../media/jobs/teacher.webp"}
],
answer:"lo studente"
},

{
type:"image",
question:"l'autista کدام است؟",
speak:"l'autista",
options:[
{text:"lo studente",image:"../../media/jobs/student.webp"},
{text:"l'insegnante",image:"../../media/jobs/teacher.webp"},
{text:"il medico",image:"../../media/jobs/doctor.webp"},
{text:"l'autista",image:"../../media/jobs/driver.webp"}
],
answer:"l'autista"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["il medico","l'insegnante","l'ingegnere","lo studente"],
answer:"l'insegnante"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["lo studente","il medico","l'autista","l'insegnante"],
answer:"il medico"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["l'insegnante","l'ingegnere","l'autista","il medico"],
answer:"l'ingegnere"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["l'ingegnere","il medico","lo studente","l'insegnante"],
answer:"lo studente"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["lo studente","l'insegnante","il medico","l'autista"],
answer:"l'autista"
},

/* AUDIO */

{
type:"audio",
speak:"l'insegnante",
question:"کدام کلمه را شنیدی؟",
options:["il medico","l'insegnante","l'ingegnere","lo studente"],
answer:"l'insegnante"
},

{
type:"audio",
speak:"il medico",
question:"کدام کلمه را شنیدی؟",
options:["lo studente","il medico","l'autista","l'insegnante"],
answer:"il medico"
},

{
type:"audio",
speak:"l'ingegnere",
question:"کدام کلمه را شنیدی؟",
options:["l'insegnante","l'ingegnere","l'autista","il medico"],
answer:"l'ingegnere"
},

{
type:"audio",
speak:"lo studente",
question:"کدام کلمه را شنیدی؟",
options:["l'ingegnere","il medico","lo studente","l'insegnante"],
answer:"lo studente"
},

{
type:"audio",
speak:"l'autista",
question:"کدام کلمه را شنیدی؟",
options:["lo studente","l'insegnante","il medico","l'autista"],
answer:"l'autista"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Lei è un'insegnante",
question:"جمله ایتالیایی را بساز:",
text:"او یک معلم است",
words:["Lei","è","un'","insegnante"],
answer:["Lei","è","un'","insegnante"]
},

{
type:"build-it",
speak:"Lui è un medico",
question:"جمله ایتالیایی را بساز:",
text:"او یک دکتر است",
words:["Lui","è","un","medico"],
answer:["Lui","è","un","medico"]
},

{
type:"build-it",
speak:"Lei è un'ingegnere",
question:"جمله ایتالیایی را بساز:",
text:"او یک مهندس است",
words:["Lei","è","un'","ingegnere"],
answer:["Lei","è","un'","ingegnere"]
},

{
type:"build-it",
speak:"Io sono uno studente",
question:"جمله ایتالیایی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["Io","sono","uno","studente"],
answer:["Io","sono","uno","studente"]
},

{
type:"build-it",
speak:"Lui è un autista",
question:"جمله ایتالیایی را بساز:",
text:"او یک راننده است",
words:["Lui","è","un","autista"],
answer:["Lui","è","un","autista"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Lei è un'insegnante",
question:"ترجمه را بساز:",
text:"Lei è un'insegnante",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"Lui è un medico",
question:"ترجمه را بساز:",
text:"Lui è un medico",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"Lei è un'ingegnere",
question:"ترجمه را بساز:",
text:"Lei è un'ingegnere",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"Io sono uno studente",
question:"ترجمه را بساز:",
text:"Io sono uno studente",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Lui è un autista",
question:"ترجمه را بساز:",
text:"Lui è un autista",
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