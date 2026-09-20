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

/* IMAGE - حیوانات */

{
type:"image",
question:"Собака کدام است؟",
speak:"собака",
options:[
{text:"кошка",image:"../../media/animals/cat.webp"},
{text:"собака",image:"../../media/animals/dog.webp"},
{text:"птица",image:"../../media/animals/bird.webp"},
{text:"рыба",image:"../../media/animals/fish.webp"}
],
answer:"собака"
},

{
type:"image",
question:"Кошка کدام است؟",
speak:"кошка",
options:[
{text:"рыба",image:"../../media/animals/fish.webp"},
{text:"кошка",image:"../../media/animals/cat.webp"},
{text:"лошадь",image:"../../media/animals/horse.webp"},
{text:"собака",image:"../../media/animals/dog.webp"}
],
answer:"кошка"
},

{
type:"image",
question:"Птица کدام است؟",
speak:"птица",
options:[
{text:"собака",image:"../../media/animals/dog.webp"},
{text:"птица",image:"../../media/animals/bird.webp"},
{text:"лошадь",image:"../../media/animals/horse.webp"},
{text:"кошка",image:"../../media/animals/cat.webp"}
],
answer:"птица"
},

{
type:"image",
question:"Рыба کدام است؟",
speak:"рыба",
options:[
{text:"птица",image:"../../media/animals/bird.webp"},
{text:"кошка",image:"../../media/animals/cat.webp"},
{text:"рыба",image:"../../media/animals/fish.webp"},
{text:"собака",image:"../../media/animals/dog.webp"}
],
answer:"рыба"
},

{
type:"image",
question:"Лошадь کدام است؟",
speak:"лошадь",
options:[
{text:"рыба",image:"../../media/animals/fish.webp"},
{text:"собака",image:"../../media/animals/dog.webp"},
{text:"кошка",image:"../../media/animals/cat.webp"},
{text:"лошадь",image:"../../media/animals/horse.webp"}
],
answer:"лошадь"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/dog.webp",
options:["кошка","собака","птица","рыба"],
answer:"собака"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/cat.webp",
options:["рыба","кошка","лошадь","собака"],
answer:"кошка"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/bird.webp",
options:["собака","птица","лошадь","кошка"],
answer:"птица"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/fish.webp",
options:["птица","кошка","рыба","собака"],
answer:"рыба"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/horse.webp",
options:["рыба","собака","кошка","лошадь"],
answer:"лошадь"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"собака",
question:"کدام کلمه را شنیدی؟",
options:["кошка","собака","птица","рыба"],
answer:"собака"
},

{
type:"audio",
speak:"кошка",
question:"کدام کلمه را شنیدی؟",
options:["рыба","кошка","лошадь","собака"],
answer:"кошка"
},

{
type:"audio",
speak:"птица",
question:"کدام کلمه را شنیدی؟",
options:["собака","птица","лошадь","кошка"],
answer:"птица"
},

{
type:"audio",
speak:"рыба",
question:"کدام کلمه را شنیدی؟",
options:["птица","кошка","рыба","собака"],
answer:"рыба"
},

{
type:"audio",
speak:"лошадь",
question:"کدام کلمه را شنیدی؟",
options:["рыба","собака","кошка","лошадь"],
answer:"лошадь"
},

/* BUILD RU - ساخت جمله روسی */

{
type:"build-ru",
speak:"У меня есть собака",
question:"جمله روسی را بساز:",
text:"من یک سگ دارم",
words:["У","меня","есть","собака"],
answer:["У","меня","есть","собака"]
},

{
type:"build-ru",
speak:"У неё есть кошка",
question:"جمله روسی را بساز:",
text:"او یک گربه دارد",
words:["У","неё","есть","кошка"],
answer:["У","неё","есть","кошка"]
},

{
type:"build-ru",
speak:"Я вижу птицу",
question:"جمله روسی را بساز:",
text:"من یک پرنده می‌بینم",
words:["Я","вижу","птицу"],
answer:["Я","вижу","птицу"]
},

{
type:"build-ru",
speak:"У него есть рыба",
question:"جمله روسی را بساز:",
text:"او یک ماهی دارد",
words:["У","него","есть","рыба"],
answer:["У","него","есть","рыба"]
},

{
type:"build-ru",
speak:"Это лошадь",
question:"جمله روسی را بساز:",
text:"این یک اسب است",
words:["Это","лошадь"],
answer:["Это","лошадь"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"У меня есть собака",
question:"ترجمه را بساز:",
text:"У меня есть собака",
words:["دارم","سگ","یک","من"],
answer:["من","یک","سگ","دارم"]
},

{
type:"build-fa",
speak:"У неё есть кошка",
question:"ترجمه را بساز:",
text:"У неё есть кошка",
words:["دارد","گربه","یک","او"],
answer:["او","یک","گربه","دارد"]
},

{
type:"build-fa",
speak:"Я вижу птицу",
question:"ترجمه را بساز:",
text:"Я вижу птицу",
words:["می‌بینم","پرنده","یک","من"],
answer:["من","یک","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"У него есть рыба",
question:"ترجمه را بساز:",
text:"У него есть рыба",
words:["دارد","ماهی","یک","او"],
answer:["او","یک","ماهی","دارد"]
},

{
type:"build-fa",
speak:"Это лошадь",
question:"ترجمه را بساز:",
text:"Это лошадь",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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