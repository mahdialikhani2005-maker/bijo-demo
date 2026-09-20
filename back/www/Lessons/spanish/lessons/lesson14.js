let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "es-ES",
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
  utter.lang = "es-ES";
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

/* IMAGE - شغل‌ها */

{
type:"image",
question:"Maestro کدام است؟",
speak:"maestro",
options:[
{text:"médico",image:"../../media/jobs/doctor.webp"},
{text:"maestro",image:"../../media/jobs/teacher.webp"},
{text:"ingeniero",image:"../../media/jobs/engineer.webp"},
{text:"estudiante",image:"../../media/jobs/student.webp"}
],
answer:"maestro"
},

{
type:"image",
question:"Médico کدام است؟",
speak:"médico",
options:[
{text:"estudiante",image:"../../media/jobs/student.webp"},
{text:"médico",image:"../../media/jobs/doctor.webp"},
{text:"conductor",image:"../../media/jobs/driver.webp"},
{text:"maestro",image:"../../media/jobs/teacher.webp"}
],
answer:"médico"
},

{
type:"image",
question:"Ingeniero کدام است؟",
speak:"ingeniero",
options:[
{text:"maestro",image:"../../media/jobs/teacher.webp"},
{text:"ingeniero",image:"../../media/jobs/engineer.webp"},
{text:"conductor",image:"../../media/jobs/driver.webp"},
{text:"médico",image:"../../media/jobs/doctor.webp"}
],
answer:"ingeniero"
},

{
type:"image",
question:"Estudiante کدام است؟",
speak:"estudiante",
options:[
{text:"ingeniero",image:"../../media/jobs/engineer.webp"},
{text:"médico",image:"../../media/jobs/doctor.webp"},
{text:"estudiante",image:"../../media/jobs/student.webp"},
{text:"maestro",image:"../../media/jobs/teacher.webp"}
],
answer:"estudiante"
},

{
type:"image",
question:"Conductor کدام است؟",
speak:"conductor",
options:[
{text:"estudiante",image:"../../media/jobs/student.webp"},
{text:"maestro",image:"../../media/jobs/teacher.webp"},
{text:"médico",image:"../../media/jobs/doctor.webp"},
{text:"conductor",image:"../../media/jobs/driver.webp"}
],
answer:"conductor"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["médico","maestro","ingeniero","estudiante"],
answer:"maestro"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["estudiante","médico","conductor","maestro"],
answer:"médico"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["maestro","ingeniero","conductor","médico"],
answer:"ingeniero"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["ingeniero","médico","estudiante","maestro"],
answer:"estudiante"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["estudiante","maestro","médico","conductor"],
answer:"conductor"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"maestro",
question:"کدام کلمه را شنیدی؟",
options:["médico","maestro","ingeniero","estudiante"],
answer:"maestro"
},

{
type:"audio",
speak:"médico",
question:"کدام کلمه را شنیدی؟",
options:["estudiante","médico","conductor","maestro"],
answer:"médico"
},

{
type:"audio",
speak:"ingeniero",
question:"کدام کلمه را شنیدی؟",
options:["maestro","ingeniero","conductor","médico"],
answer:"ingeniero"
},

{
type:"audio",
speak:"estudiante",
question:"کدام کلمه را شنیدی؟",
options:["ingeniero","médico","estudiante","maestro"],
answer:"estudiante"
},

{
type:"audio",
speak:"conductor",
question:"کدام کلمه را شنیدی؟",
options:["estudiante","maestro","médico","conductor"],
answer:"conductor"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Ella es maestra",
question:"جمله اسپانیایی را بساز:",
text:"او یک معلم است",
words:["Ella","es","maestra"],
answer:["Ella","es","maestra"]
},

{
type:"build-es",
speak:"Él es médico",
question:"جمله اسپانیایی را بساز:",
text:"او یک دکتر است",
words:["Él","es","médico"],
answer:["Él","es","médico"]
},

{
type:"build-es",
speak:"Ella es ingeniera",
question:"جمله اسپانیایی را بساز:",
text:"او یک مهندس است",
words:["Ella","es","ingeniera"],
answer:["Ella","es","ingeniera"]
},

{
type:"build-es",
speak:"Soy estudiante",
question:"جمله اسپانیایی را بساز:",
text:"من یک دانش‌آموز هستم",
words:["Soy","estudiante"],
answer:["Soy","estudiante"]
},

{
type:"build-es",
speak:"Él es conductor",
question:"جمله اسپانیایی را بساز:",
text:"او یک راننده است",
words:["Él","es","conductor"],
answer:["Él","es","conductor"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ella es maestra",
question:"ترجمه را بساز:",
text:"Ella es maestra",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"Él es médico",
question:"ترجمه را بساز:",
text:"Él es médico",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"Ella es ingeniera",
question:"ترجمه را بساز:",
text:"Ella es ingeniera",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"Soy estudiante",
question:"ترجمه را بساز:",
text:"Soy estudiante",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Él es conductor",
question:"ترجمه را بساز:",
text:"Él es conductor",
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

  // BUILD SPANISH / FA

  else if (q.type === "build-es" || q.type === "build-fa") {
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

  if (q.type === "build-es") {
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