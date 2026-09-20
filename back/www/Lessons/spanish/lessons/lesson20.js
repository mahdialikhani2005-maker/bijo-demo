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

/* IMAGE - سوالی‌ها */

{
type:"image",
question:"Quién کدام است؟",
speak:"quién",
options:[
{text:"qué",image:"../../media/questions/what.webp"},
{text:"quién",image:"../../media/questions/who.webp"},
{text:"dónde",image:"../../media/questions/where.webp"},
{text:"cuándo",image:"../../media/questions/when.webp"}
],
answer:"quién"
},

{
type:"image",
question:"Qué کدام است؟",
speak:"qué",
options:[
{text:"por qué",image:"../../media/questions/why.webp"},
{text:"qué",image:"../../media/questions/what.webp"},
{text:"quién",image:"../../media/questions/who.webp"},
{text:"dónde",image:"../../media/questions/where.webp"}
],
answer:"qué"
},

{
type:"image",
question:"Dónde کدام است؟",
speak:"dónde",
options:[
{text:"qué",image:"../../media/questions/what.webp"},
{text:"dónde",image:"../../media/questions/where.webp"},
{text:"por qué",image:"../../media/questions/why.webp"},
{text:"quién",image:"../../media/questions/who.webp"}
],
answer:"dónde"
},

{
type:"image",
question:"Cuándo کدام است؟",
speak:"cuándo",
options:[
{text:"dónde",image:"../../media/questions/where.webp"},
{text:"quién",image:"../../media/questions/who.webp"},
{text:"cuándo",image:"../../media/questions/when.webp"},
{text:"qué",image:"../../media/questions/what.webp"}
],
answer:"cuándo"
},

{
type:"image",
question:"Por qué کدام است؟",
speak:"por qué",
options:[
{text:"cuándo",image:"../../media/questions/when.webp"},
{text:"qué",image:"../../media/questions/what.webp"},
{text:"quién",image:"../../media/questions/who.webp"},
{text:"por qué",image:"../../media/questions/why.webp"}
],
answer:"por qué"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["qué","quién","dónde","cuándo"],
answer:"quién"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["por qué","qué","quién","dónde"],
answer:"qué"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["qué","dónde","por qué","quién"],
answer:"dónde"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["dónde","quién","cuándo","qué"],
answer:"cuándo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["cuándo","qué","quién","por qué"],
answer:"por qué"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"quién",
question:"کدام کلمه را شنیدی؟",
options:["qué","quién","dónde","cuándo"],
answer:"quién"
},

{
type:"audio",
speak:"qué",
question:"کدام کلمه را شنیدی؟",
options:["por qué","qué","quién","dónde"],
answer:"qué"
},

{
type:"audio",
speak:"dónde",
question:"کدام کلمه را شنیدی؟",
options:["qué","dónde","por qué","quién"],
answer:"dónde"
},

{
type:"audio",
speak:"cuándo",
question:"کدام کلمه را شنیدی؟",
options:["dónde","quién","cuándo","qué"],
answer:"cuándo"
},

{
type:"audio",
speak:"por qué",
question:"کدام کلمه را شنیدی؟",
options:["cuándo","qué","quién","por qué"],
answer:"por qué"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"¿Quién es ella?",
question:"جمله اسپانیایی را بساز:",
text:"او کیست؟",
words:["¿Quién","es","ella"],
answer:["¿Quién","es","ella"]
},

{
type:"build-es",
speak:"¿Qué es esto?",
question:"جمله اسپانیایی را بساز:",
text:"این چیست؟",
words:["¿Qué","es","esto"],
answer:["¿Qué","es","esto"]
},

{
type:"build-es",
speak:"¿Dónde está la escuela?",
question:"جمله اسپانیایی را بساز:",
text:"مدرسه کجاست؟",
words:["¿Dónde","está","la","escuela"],
answer:["¿Dónde","está","la","escuela"]
},

{
type:"build-es",
speak:"¿Cuándo es la clase?",
question:"جمله اسپانیایی را بساز:",
text:"کلاس کی است؟",
words:["¿Cuándo","es","la","clase"],
answer:["¿Cuándo","es","la","clase"]
},

{
type:"build-es",
speak:"¿Por qué estás feliz?",
question:"جمله اسپانیایی را بساز:",
text:"چرا خوشحالی؟",
words:["¿Por qué","estás","feliz"],
answer:["¿Por qué","estás","feliz"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"¿Quién es ella?",
question:"ترجمه را بساز:",
text:"¿Quién es ella?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"¿Qué es esto?",
question:"ترجمه را بساز:",
text:"¿Qué es esto?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"¿Dónde está la escuela?",
question:"ترجمه را بساز:",
text:"¿Dónde está la escuela?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"¿Cuándo es la clase?",
question:"ترجمه را بساز:",
text:"¿Cuándo es la clase?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"¿Por qué estás feliz?",
question:"ترجمه را بساز:",
text:"¿Por qué estás feliz?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی"]
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