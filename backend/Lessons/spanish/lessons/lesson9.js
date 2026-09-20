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

/* IMAGE - طبیعت */

{
type:"image",
question:"Sol کدام است؟",
speak:"sol",
options:[
{text:"luna",image:"../../media/nature/moon.webp"},
{text:"sol",image:"../../media/nature/sun.webp"},
{text:"estrella",image:"../../media/nature/star.webp"},
{text:"cielo",image:"../../media/nature/sky.webp"}
],
answer:"sol"
},

{
type:"image",
question:"Luna کدام است؟",
speak:"luna",
options:[
{text:"estrella",image:"../../media/nature/star.webp"},
{text:"luna",image:"../../media/nature/moon.webp"},
{text:"lluvia",image:"../../media/nature/rain.webp"},
{text:"sol",image:"../../media/nature/sun.webp"}
],
answer:"luna"
},

{
type:"image",
question:"Estrella کدام است؟",
speak:"estrella",
options:[
{text:"sol",image:"../../media/nature/sun.webp"},
{text:"estrella",image:"../../media/nature/star.webp"},
{text:"lluvia",image:"../../media/nature/rain.webp"},
{text:"luna",image:"../../media/nature/moon.webp"}
],
answer:"estrella"
},

{
type:"image",
question:"Cielo کدام است؟",
speak:"cielo",
options:[
{text:"estrella",image:"../../media/nature/star.webp"},
{text:"luna",image:"../../media/nature/moon.webp"},
{text:"cielo",image:"../../media/nature/sky.webp"},
{text:"sol",image:"../../media/nature/sun.webp"}
],
answer:"cielo"
},

{
type:"image",
question:"Lluvia کدام است؟",
speak:"lluvia",
options:[
{text:"cielo",image:"../../media/nature/sky.webp"},
{text:"sol",image:"../../media/nature/sun.webp"},
{text:"luna",image:"../../media/nature/moon.webp"},
{text:"lluvia",image:"../../media/nature/rain.webp"}
],
answer:"lluvia"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["luna","sol","estrella","cielo"],
answer:"sol"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["estrella","luna","lluvia","sol"],
answer:"luna"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["sol","estrella","lluvia","luna"],
answer:"estrella"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["estrella","luna","cielo","sol"],
answer:"cielo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["cielo","sol","luna","lluvia"],
answer:"lluvia"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"sol",
question:"کدام کلمه را شنیدی؟",
options:["luna","sol","estrella","cielo"],
answer:"sol"
},

{
type:"audio",
speak:"luna",
question:"کدام کلمه را شنیدی؟",
options:["estrella","luna","lluvia","sol"],
answer:"luna"
},

{
type:"audio",
speak:"estrella",
question:"کدام کلمه را شنیدی؟",
options:["sol","estrella","lluvia","luna"],
answer:"estrella"
},

{
type:"audio",
speak:"cielo",
question:"کدام کلمه را شنیدی؟",
options:["estrella","luna","cielo","sol"],
answer:"cielo"
},

{
type:"audio",
speak:"lluvia",
question:"کدام کلمه را شنیدی؟",
options:["cielo","sol","luna","lluvia"],
answer:"lluvia"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Veo el sol",
question:"جمله اسپانیایی را بساز:",
text:"من خورشید را می‌بینم",
words:["Veo","el","sol"],
answer:["Veo","el","sol"]
},

{
type:"build-es",
speak:"La luna es grande",
question:"جمله اسپانیایی را بساز:",
text:"ماه بزرگ است",
words:["La","luna","es","grande"],
answer:["La","luna","es","grande"]
},

{
type:"build-es",
speak:"La estrella es pequeña",
question:"جمله اسپانیایی را بساز:",
text:"ستاره کوچک است",
words:["La","estrella","es","pequeña"],
answer:["La","estrella","es","pequeña"]
},

{
type:"build-es",
speak:"El cielo es azul",
question:"جمله اسپانیایی را بساز:",
text:"آسمان آبی است",
words:["El","cielo","es","azul"],
answer:["El","cielo","es","azul"]
},

{
type:"build-es",
speak:"Me gusta la lluvia",
question:"جمله اسپانیایی را بساز:",
text:"من باران را دوست دارم",
words:["Me","gusta","la","lluvia"],
answer:["Me","gusta","la","lluvia"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Veo el sol",
question:"ترجمه را بساز:",
text:"Veo el sol",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"La luna es grande",
question:"ترجمه را بساز:",
text:"La luna es grande",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"La estrella es pequeña",
question:"ترجمه را بساز:",
text:"La estrella es pequeña",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"El cielo es azul",
question:"ترجمه را بساز:",
text:"El cielo es azul",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Me gusta la lluvia",
question:"ترجمه را بساز:",
text:"Me gusta la lluvia",
words:["دارم","دوست","باران","را","من"],
answer:["من","باران","را","دوست","دارم"]
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