let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ko-KR",
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
  utter.lang = "ko-KR";
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
question:"선생님 (seonsaengnim) کدام است؟",
speak:"선생님",
options:[
{text:"의사 (uisa)",image:"../../media/jobs/doctor.webp"},
{text:"선생님 (seonsaengnim)",image:"../../media/jobs/teacher.webp"},
{text:"엔지니어 (enjinieo)",image:"../../media/jobs/engineer.webp"},
{text:"학생 (haksaeng)",image:"../../media/jobs/student.webp"}
],
answer:"선생님 (seonsaengnim)"
},

{
type:"image",
question:"의사 (uisa) کدام است؟",
speak:"의사",
options:[
{text:"학생 (haksaeng)",image:"../../media/jobs/student.webp"},
{text:"의사 (uisa)",image:"../../media/jobs/doctor.webp"},
{text:"운전사 (unjeonsa)",image:"../../media/jobs/driver.webp"},
{text:"선생님 (seonsaengnim)",image:"../../media/jobs/teacher.webp"}
],
answer:"의사 (uisa)"
},

{
type:"image",
question:"엔지니어 (enjinieo) کدام است؟",
speak:"엔지니어",
options:[
{text:"선생님 (seonsaengnim)",image:"../../media/jobs/teacher.webp"},
{text:"엔지니어 (enjinieo)",image:"../../media/jobs/engineer.webp"},
{text:"운전사 (unjeonsa)",image:"../../media/jobs/driver.webp"},
{text:"의사 (uisa)",image:"../../media/jobs/doctor.webp"}
],
answer:"엔지니어 (enjinieo)"
},

{
type:"image",
question:"학생 (haksaeng) کدام است؟",
speak:"학생",
options:[
{text:"엔지니어 (enjinieo)",image:"../../media/jobs/engineer.webp"},
{text:"의사 (uisa)",image:"../../media/jobs/doctor.webp"},
{text:"학생 (haksaeng)",image:"../../media/jobs/student.webp"},
{text:"선생님 (seonsaengnim)",image:"../../media/jobs/teacher.webp"}
],
answer:"학생 (haksaeng)"
},

{
type:"image",
question:"운전사 (unjeonsa) کدام است؟",
speak:"운전사",
options:[
{text:"학생 (haksaeng)",image:"../../media/jobs/student.webp"},
{text:"선생님 (seonsaengnim)",image:"../../media/jobs/teacher.webp"},
{text:"의사 (uisa)",image:"../../media/jobs/doctor.webp"},
{text:"운전사 (unjeonsa)",image:"../../media/jobs/driver.webp"}
],
answer:"운전사 (unjeonsa)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/teacher.webp",
options:["의사","선생님","엔지니어","학생"],
answer:"선생님"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/doctor.webp",
options:["학생","의사","운전사","선생님"],
answer:"의사"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/engineer.webp",
options:["선생님","엔지니어","운전사","의사"],
answer:"엔지니어"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/student.webp",
options:["엔지니어","의사","학생","선생님"],
answer:"학생"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/jobs/driver.webp",
options:["학생","선생님","의사","운전사"],
answer:"운전사"
},

/* AUDIO */

{
type:"audio",
speak:"선생님",
question:"کدام کلمه را شنیدی؟",
options:["의사","선생님","엔지니어","학생"],
answer:"선생님"
},

{
type:"audio",
speak:"의사",
question:"کدام کلمه را شنیدی؟",
options:["학생","의사","운전사","선생님"],
answer:"의사"
},

{
type:"audio",
speak:"엔지니어",
question:"کدام کلمه را شنیدی؟",
options:["선생님","엔지니어","운전사","의사"],
answer:"엔지니어"
},

{
type:"audio",
speak:"학생",
question:"کدام کلمه را شنیدی؟",
options:["엔지니어","의사","학생","선생님"],
answer:"학생"
},

{
type:"audio",
speak:"운전사",
question:"کدام کلمه را شنیدی؟",
options:["학생","선생님","의사","운전사"],
answer:"운전사"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"그녀는 선생님입니다",
question:"جمله کرهای را بساز:",
text:"او یک معلم است",
words:["그녀는","선생님","입니다"],
answer:["그녀는","선생님","입니다"]
},

{
type:"build-ko",
speak:"그는 의사입니다",
question:"جمله کرهای را بساز:",
text:"او یک دکتر است",
words:["그는","의사","입니다"],
answer:["그는","의사","입니다"]
},

{
type:"build-ko",
speak:"그녀는 엔지니어입니다",
question:"جمله کرهای را بساز:",
text:"او یک مهندس است",
words:["그녀는","엔지니어","입니다"],
answer:["그녀는","엔지니어","입니다"]
},

{
type:"build-ko",
speak:"저는 학생입니다",
question:"جمله کرهای را بساز:",
text:"من یک دانش‌آموز هستم",
words:["저는","학생","입니다"],
answer:["저는","학생","입니다"]
},

{
type:"build-ko",
speak:"그는 운전사입니다",
question:"جمله کرهای را بساز:",
text:"او یک راننده است",
words:["그는","운전사","입니다"],
answer:["그는","운전사","입니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"그녀는 선생님입니다",
question:"ترجمه را بساز:",
text:"그녀는 선생님입니다",
words:["است","معلم","یک","او"],
answer:["او","یک","معلم","است"]
},

{
type:"build-fa",
speak:"그는 의사입니다",
question:"ترجمه را بساز:",
text:"그는 의사입니다",
words:["است","دکتر","یک","او"],
answer:["او","یک","دکتر","است"]
},

{
type:"build-fa",
speak:"그녀는 엔지니어입니다",
question:"ترجمه را بساز:",
text:"그녀는 엔지니어입니다",
words:["است","مهندس","یک","او"],
answer:["او","یک","مهندس","است"]
},

{
type:"build-fa",
speak:"저는 학생입니다",
question:"ترجمه را بساز:",
text:"저는 학생입니다",
words:["هستم","دانش‌آموز","یک","من"],
answer:["من","یک","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"그는 운전사입니다",
question:"ترجمه را بساز:",
text:"그는 운전사입니다",
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

  // BUILD KOREAN / FA

  else if (q.type === "build-ko" || q.type === "build-fa") {
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

  if (q.type === "build-ko") {
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