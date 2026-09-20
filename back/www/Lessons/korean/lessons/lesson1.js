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
question:"남자 (namja) کدام است؟",
speak:"남자",
options:[
{text:"여자 (yeoja)",image:"../../media/people/woman.webp"},
{text:"남자 (namja)",image:"../../media/people/man.webp"},
{text:"소년 (sonyeon)",image:"../../media/people/boy.webp"},
{text:"소녀 (sonyeo)",image:"../../media/people/girl.webp"}
],
answer:"남자 (namja)"
},

{
type:"image",
question:"여자 (yeoja) کدام است؟",
speak:"여자",
options:[
{text:"소녀 (sonyeo)",image:"../../media/people/girl.webp"},
{text:"여자 (yeoja)",image:"../../media/people/woman.webp"},
{text:"소년 (sonyeon)",image:"../../media/people/boy.webp"},
{text:"남자 (namja)",image:"../../media/people/man.webp"}
],
answer:"여자 (yeoja)"
},

{
type:"image",
question:"소년 (sonyeon) کدام است؟",
speak:"소년",
options:[
{text:"남자 (namja)",image:"../../media/people/man.webp"},
{text:"소년 (sonyeon)",image:"../../media/people/boy.webp"},
{text:"아기 (agi)",image:"../../media/people/baby.webp"},
{text:"소녀 (sonyeo)",image:"../../media/people/girl.webp"}
],
answer:"소년 (sonyeon)"
},

{
type:"image",
question:"소녀 (sonyeo) کدام است؟",
speak:"소녀",
options:[
{text:"소년 (sonyeon)",image:"../../media/people/boy.webp"},
{text:"남자 (namja)",image:"../../media/people/man.webp"},
{text:"소녀 (sonyeo)",image:"../../media/people/girl.webp"},
{text:"아기 (agi)",image:"../../media/people/baby.webp"}
],
answer:"소녀 (sonyeo)"
},

{
type:"image",
question:"아기 (agi) کدام است؟",
speak:"아기",
options:[
{text:"소녀 (sonyeo)",image:"../../media/people/girl.webp"},
{text:"소년 (sonyeon)",image:"../../media/people/boy.webp"},
{text:"남자 (namja)",image:"../../media/people/man.webp"},
{text:"아기 (agi)",image:"../../media/people/baby.webp"}
],
answer:"아기 (agi)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["소년","남자","여자","소녀"],
answer:"남자"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["여자","소녀","아기","남자"],
answer:"여자"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["소년","남자","아기","소녀"],
answer:"소년"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["소녀","여자","소년","아기"],
answer:"소녀"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["아기","소년","소녀","남자"],
answer:"아기"
},

/* AUDIO */

{
type:"audio",
speak:"남자",
question:"کدام کلمه را شنیدی؟",
options:["남자","소년","여자","소녀"],
answer:"남자"
},

{
type:"audio",
speak:"여자",
question:"کدام کلمه را شنیدی؟",
options:["소녀","여자","소년","남자"],
answer:"여자"
},

{
type:"audio",
speak:"소년",
question:"کدام کلمه را شنیدی؟",
options:["소년","남자","아기","소녀"],
answer:"소년"
},

{
type:"audio",
speak:"소녀",
question:"کدام کلمه را شنیدی؟",
options:["소년","여자","소녀","아기"],
answer:"소녀"
},

{
type:"audio",
speak:"아기",
question:"کدام کلمه را شنیدی؟",
options:["아기","소년","남자","소녀"],
answer:"아기"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"이 사람은 남자입니다",
question:"جمله کرهای را بساز:",
text:"این یک مرد است",
words:["이","사람은","남자","입니다"],
answer:["이","사람은","남자","입니다"]
},

{
type:"build-ko",
speak:"이 사람은 여자입니다",
question:"جمله کرهای را بساز:",
text:"این یک زن است",
words:["이","사람은","여자","입니다"],
answer:["이","사람은","여자","입니다"]
},

{
type:"build-ko",
speak:"이 사람은 소년입니다",
question:"جمله کرهای را بساز:",
text:"این یک پسر است",
words:["이","사람은","소년","입니다"],
answer:["이","사람은","소년","입니다"]
},

{
type:"build-ko",
speak:"이 사람은 소녀입니다",
question:"جمله کرهای را بساز:",
text:"این یک دختر است",
words:["이","사람은","소녀","입니다"],
answer:["이","사람은","소녀","입니다"]
},

{
type:"build-ko",
speak:"아기는 작습니다",
question:"جمله کرهای را بساز:",
text:"نوزاد کوچک است",
words:["아기는","작","습니다"],
answer:["아기는","작","습니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"이 사람은 남자입니다",
question:"ترجمه را بساز:",
text:"이 사람은 남자입니다",
words:["است","مرد","یک","این"],
answer:["این","یک","مرد","است"]
},

{
type:"build-fa",
speak:"이 사람은 여자입니다",
question:"ترجمه را بساز:",
text:"이 사람은 여자입니다",
words:["یک","است","زن","این"],
answer:["این","یک","زن","است"]
},

{
type:"build-fa",
speak:"이 사람은 소년입니다",
question:"ترجمه را بساز:",
text:"이 사람은 소년입니다",
words:["است","پسر","یک","این"],
answer:["این","یک","پسر","است"]
},

{
type:"build-fa",
speak:"이 사람은 소녀입니다",
question:"ترجمه را بساز:",
text:"이 사람은 소녀입니다",
words:["است","دختر","یک","این"],
answer:["این","یک","دختر","است"]
},

{
type:"build-fa",
speak:"아기는 작습니다",
question:"ترجمه را بساز:",
text:"아기는 작습니다",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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