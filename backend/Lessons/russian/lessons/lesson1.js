let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ru-RU",
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
  utter.lang = "ru-RU";
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

/* IMAGE - افراد */

{
type:"image",
question:"Мужчина کدام است؟",
speak:"мужчина",
options:[
{text:"женщина",image:"../../media/people/woman.webp"},
{text:"мужчина",image:"../../media/people/man.webp"},
{text:"мальчик",image:"../../media/people/boy.webp"},
{text:"девушка",image:"../../media/people/girl.webp"}
],
answer:"мужчина"
},

{
type:"image",
question:"Женщина کدام است؟",
speak:"женщина",
options:[
{text:"девушка",image:"../../media/people/girl.webp"},
{text:"женщина",image:"../../media/people/woman.webp"},
{text:"мальчик",image:"../../media/people/boy.webp"},
{text:"мужчина",image:"../../media/people/man.webp"}
],
answer:"женщина"
},

{
type:"image",
question:"Мальчик کدام است؟",
speak:"мальчик",
options:[
{text:"мужчина",image:"../../media/people/man.webp"},
{text:"мальчик",image:"../../media/people/boy.webp"},
{text:"ребёнок",image:"../../media/people/baby.webp"},
{text:"девушка",image:"../../media/people/girl.webp"}
],
answer:"мальчик"
},

{
type:"image",
question:"Девушка کدام است؟",
speak:"девушка",
options:[
{text:"мальчик",image:"../../media/people/boy.webp"},
{text:"мужчина",image:"../../media/people/man.webp"},
{text:"девушка",image:"../../media/people/girl.webp"},
{text:"ребёнок",image:"../../media/people/baby.webp"}
],
answer:"девушка"
},

{
type:"image",
question:"Ребёнок کدام است؟",
speak:"ребёнок",
options:[
{text:"девушка",image:"../../media/people/girl.webp"},
{text:"мальчик",image:"../../media/people/boy.webp"},
{text:"мужчина",image:"../../media/people/man.webp"},
{text:"ребёнок",image:"../../media/people/baby.webp"}
],
answer:"ребёнок"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["мальчик","мужчина","женщина","девушка"],
answer:"мужчина"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["женщина","девушка","ребёнок","мужчина"],
answer:"женщина"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["мальчик","мужчина","ребёнок","девушка"],
answer:"мальчик"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["девушка","женщина","мальчик","ребёнок"],
answer:"девушка"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["ребёнок","мальчик","девушка","мужчина"],
answer:"ребёнок"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"мужчина",
question:"کدام کلمه را شنیدی؟",
options:["мужчина","мальчик","женщина","девушка"],
answer:"мужчина"
},

{
type:"audio",
speak:"женщина",
question:"کدام کلمه را شنیدی؟",
options:["девушка","женщина","мальчик","мужчина"],
answer:"женщина"
},

{
type:"audio",
speak:"мальчик",
question:"کدام کلمه را شنیدی؟",
options:["мальчик","мужчина","ребёнок","девушка"],
answer:"мальчик"
},

{
type:"audio",
speak:"девушка",
question:"کدام کلمه را شنیدی؟",
options:["мальчик","женщина","девушка","ребёнок"],
answer:"девушка"
},

{
type:"audio",
speak:"ребёнок",
question:"کدام کلمه را شنیدی؟",
options:["ребёнок","мальчик","мужчина","девушка"],
answer:"ребёнок"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"Это мужчина",
question:"جمله روسی را بساز:",
text:"این یک مرد است",
words:["Это","мужчина"],
answer:["Это","мужчина"]
},

{
type:"build-ru",
speak:"Это женщина",
question:"جمله روسی را بساز:",
text:"این یک زن است",
words:["Это","женщина"],
answer:["Это","женщина"]
},

{
type:"build-ru",
speak:"Это мальчик",
question:"جمله روسی را بساز:",
text:"این یک پسر است",
words:["Это","мальчик"],
answer:["Это","мальчик"]
},

{
type:"build-ru",
speak:"Это девушка",
question:"جمله روسی را بساز:",
text:"این یک دختر است",
words:["Это","девушка"],
answer:["Это","девушка"]
},

{
type:"build-ru",
speak:"Ребёнок маленький",
question:"جمله روسی را بساز:",
text:"نوزاد کوچک است",
words:["Ребёнок","маленький"],
answer:["Ребёнок","маленький"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Это мужчина",
question:"ترجمه را بساز:",
text:"Это мужчина",
words:["است","مرد","یک","این"],
answer:["این","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Это женщина",
question:"ترجمه را بساز:",
text:"Это женщина",
words:["یک","است","زن","این"],
answer:["این","یک","زن","است"]
},

{
type:"build-fa",
speak:"Это мальчик",
question:"ترجمه را بساز:",
text:"Это мальчик",
words:["است","پسر","یک","این"],
answer:["این","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Это девушка",
question:"ترجمه را بساز:",
text:"Это девушка",
words:["است","دختر","یک","این"],
answer:["این","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Ребёнок маленький",
question:"ترجمه را بساز:",
text:"Ребёнок маленький",
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

  // BUILD RUSSIAN / FA

  else if (q.type === "build-ru" || q.type === "build-fa") {
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

  if (q.type === "build-ru") {
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