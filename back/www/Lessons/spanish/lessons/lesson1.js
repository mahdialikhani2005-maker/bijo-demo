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

/* IMAGE - افراد */

{
type:"image",
question:"Hombre کدام است؟",
speak:"hombre",
options:[
{text:"mujer",image:"../../media/people/woman.webp"},
{text:"hombre",image:"../../media/people/man.webp"},
{text:"niño",image:"../../media/people/boy.webp"},
{text:"chica",image:"../../media/people/girl.webp"}
],
answer:"hombre"
},

{
type:"image",
question:"Mujer کدام است؟",
speak:"mujer",
options:[
{text:"chica",image:"../../media/people/girl.webp"},
{text:"mujer",image:"../../media/people/woman.webp"},
{text:"niño",image:"../../media/people/boy.webp"},
{text:"hombre",image:"../../media/people/man.webp"}
],
answer:"mujer"
},

{
type:"image",
question:"Niño کدام است؟",
speak:"niño",
options:[
{text:"hombre",image:"../../media/people/man.webp"},
{text:"niño",image:"../../media/people/boy.webp"},
{text:"bebé",image:"../../media/people/baby.webp"},
{text:"chica",image:"../../media/people/girl.webp"}
],
answer:"niño"
},

{
type:"image",
question:"Chica کدام است؟",
speak:"chica",
options:[
{text:"niño",image:"../../media/people/boy.webp"},
{text:"hombre",image:"../../media/people/man.webp"},
{text:"chica",image:"../../media/people/girl.webp"},
{text:"bebé",image:"../../media/people/baby.webp"}
],
answer:"chica"
},

{
type:"image",
question:"Bebé کدام است؟",
speak:"bebé",
options:[
{text:"chica",image:"../../media/people/girl.webp"},
{text:"niño",image:"../../media/people/boy.webp"},
{text:"hombre",image:"../../media/people/man.webp"},
{text:"bebé",image:"../../media/people/baby.webp"}
],
answer:"bebé"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["niño","hombre","mujer","chica"],
answer:"hombre"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["mujer","chica","bebé","hombre"],
answer:"mujer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["niño","hombre","bebé","chica"],
answer:"niño"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["chica","mujer","niño","bebé"],
answer:"chica"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["bebé","niño","chica","hombre"],
answer:"bebé"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"hombre",
question:"کدام کلمه را شنیدی؟",
options:["hombre","niño","mujer","chica"],
answer:"hombre"
},

{
type:"audio",
speak:"mujer",
question:"کدام کلمه را شنیدی؟",
options:["chica","mujer","niño","hombre"],
answer:"mujer"
},

{
type:"audio",
speak:"niño",
question:"کدام کلمه را شنیدی؟",
options:["niño","hombre","bebé","chica"],
answer:"niño"
},

{
type:"audio",
speak:"chica",
question:"کدام کلمه را شنیدی؟",
options:["niño","mujer","chica","bebé"],
answer:"chica"
},

{
type:"audio",
speak:"bebé",
question:"کدام کلمه را شنیدی؟",
options:["bebé","niño","hombre","chica"],
answer:"bebé"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Él es un hombre",
question:"جمله اسپانیایی را بساز:",
text:"این یک مرد است",
words:["Él","es","un","hombre"],
answer:["Él","es","un","hombre"]
},

{
type:"build-es",
speak:"Ella es una mujer",
question:"جمله اسپانیایی را بساز:",
text:"این یک زن است",
words:["Ella","es","una","mujer"],
answer:["Ella","es","una","mujer"]
},

{
type:"build-es",
speak:"Él es un niño",
question:"جمله اسپانیایی را بساز:",
text:"این یک پسر است",
words:["Él","es","un","niño"],
answer:["Él","es","un","niño"]
},

{
type:"build-es",
speak:"Ella es una chica",
question:"جمله اسپانیایی را بساز:",
text:"این یک دختر است",
words:["Ella","es","una","chica"],
answer:["Ella","es","una","chica"]
},

{
type:"build-es",
speak:"El bebé es pequeño",
question:"جمله اسپانیایی را بساز:",
text:"نوزاد کوچک است",
words:["El","bebé","es","pequeño"],
answer:["El","bebé","es","pequeño"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Él es un hombre",
question:"ترجمه را بساز:",
text:"Él es un hombre",
words:["است","مرد","یک","این"],
answer:["این","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Ella es una mujer",
question:"ترجمه را بساز:",
text:"Ella es una mujer",
words:["یک","است","زن","این"],
answer:["این","یک","زن","است"]
},

{
type:"build-fa",
speak:"Él es un niño",
question:"ترجمه را بساز:",
text:"Él es un niño",
words:["است","پسر","یک","این"],
answer:["این","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Ella es una chica",
question:"ترجمه را بساز:",
text:"Ella es una chica",
words:["است","دختر","یک","این"],
answer:["این","یک","دختر","است"]
},

{
type:"build-fa",
speak:"El bebé es pequeño",
question:"ترجمه را بساز:",
text:"El bebé es pequeño",
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