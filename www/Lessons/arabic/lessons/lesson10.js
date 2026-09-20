let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
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
  utter.lang = "ar-SA";
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
question:"حار کدام است؟",
speak:"حار",
options:[
{text:"بارد",image:"../../media/weather/cold.webp"},
{text:"حار",image:"../../media/weather/hot.webp"},
{text:"مشمس",image:"../../media/weather/sunny.webp"},
{text:"غائم",image:"../../media/weather/cloudy.webp"}
],
answer:"حار"
},

{
type:"image",
question:"بارد کدام است؟",
speak:"بارد",
options:[
{text:"مشمس",image:"../../media/weather/sunny.webp"},
{text:"بارد",image:"../../media/weather/cold.webp"},
{text:"ريح",image:"../../media/weather/wind.webp"},
{text:"حار",image:"../../media/weather/hot.webp"}
],
answer:"بارد"
},

{
type:"image",
question:"مشمس کدام است؟",
speak:"مشمس",
options:[
{text:"حار",image:"../../media/weather/hot.webp"},
{text:"مشمس",image:"../../media/weather/sunny.webp"},
{text:"ريح",image:"../../media/weather/wind.webp"},
{text:"بارد",image:"../../media/weather/cold.webp"}
],
answer:"مشمس"
},

{
type:"image",
question:"غائم کدام است؟",
speak:"غائم",
options:[
{text:"مشمس",image:"../../media/weather/sunny.webp"},
{text:"بارد",image:"../../media/weather/cold.webp"},
{text:"غائم",image:"../../media/weather/cloudy.webp"},
{text:"حار",image:"../../media/weather/hot.webp"}
],
answer:"غائم"
},

{
type:"image",
question:"ريح کدام است؟",
speak:"ريح",
options:[
{text:"غائم",image:"../../media/weather/cloudy.webp"},
{text:"حار",image:"../../media/weather/hot.webp"},
{text:"بارد",image:"../../media/weather/cold.webp"},
{text:"ريح",image:"../../media/weather/wind.webp"}
],
answer:"ريح"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.webp",
options:["بارد","حار","مشمس","غائم"],
answer:"حار"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.webp",
options:["مشمس","بارد","ريح","حار"],
answer:"بارد"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.webp",
options:["حار","مشمس","ريح","بارد"],
answer:"مشمس"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.webp",
options:["مشمس","بارد","غائم","حار"],
answer:"غائم"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.webp",
options:["غائم","حار","بارد","ريح"],
answer:"ريح"
},

/* AUDIO */

{
type:"audio",
speak:"حار",
question:"کدام کلمه را شنیدی؟",
options:["بارد","حار","مشمس","غائم"],
answer:"حار"
},

{
type:"audio",
speak:"بارد",
question:"کدام کلمه را شنیدی؟",
options:["مشمس","بارد","ريح","حار"],
answer:"بارد"
},

{
type:"audio",
speak:"مشمس",
question:"کدام کلمه را شنیدی؟",
options:["حار","مشمس","ريح","بارد"],
answer:"مشمس"
},

{
type:"audio",
speak:"غائم",
question:"کدام کلمه را شنیدی؟",
options:["مشمس","بارد","غائم","حار"],
answer:"غائم"
},

{
type:"audio",
speak:"ريح",
question:"کدام کلمه را شنیدی؟",
options:["غائم","حار","بارد","ريح"],
answer:"ريح"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"الجو حار",
question:"جمله عربی را بساز:",
text:"هوا گرم است",
words:["الجو","حار"],
answer:["الجو","حار"]
},

{
type:"build-ar",
speak:"الجو بارد",
question:"جمله عربی را بساز:",
text:"هوا سرد است",
words:["الجو","بارد"],
answer:["الجو","بارد"]
},

{
type:"build-ar",
speak:"الشمس حارة",
question:"جمله عربی را بساز:",
text:"خورشید گرم است",
words:["الشمس","حارة"],
answer:["الشمس","حارة"]
},

{
type:"build-ar",
speak:"السماء غائمة",
question:"جمله عربی را بساز:",
text:"آسمان ابری است",
words:["السماء","غائمة"],
answer:["السماء","غائمة"]
},

{
type:"build-ar",
speak:"أحب الأيام المشمسة",
question:"جمله عربی را بساز:",
text:"من روزهای آفتابی را دوست دارم",
words:["أحب","الأيام","المشمسة"],
answer:["أحب","الأيام","المشمسة"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"الجو حار",
question:"ترجمه را بساز:",
text:"الجو حار",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"الجو بارد",
question:"ترجمه را بساز:",
text:"الجو بارد",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"الشمس حارة",
question:"ترجمه را بساز:",
text:"الشمس حارة",
words:["است","گرم","خورشید"],
answer:["خورشید","گرم","است"]
},

{
type:"build-fa",
speak:"السماء غائمة",
question:"ترجمه را بساز:",
text:"السماء غائمة",
words:["است","ابری","آسمان"],
answer:["آسمان","ابری","است"]
},

{
type:"build-fa",
speak:"أحب الأيام المشمسة",
question:"ترجمه را بساز:",
text:"أحب الأيام المشمسة",
words:["دارم","دوست","آفتابی","روزهای","من"],
answer:["من","روزهای","آفتابی","را","دوست","دارم"]
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

  // BUILD ARABIC / FA

  else if (q.type === "build-ar" || q.type === "build-fa") {
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

  if (q.type === "build-ar") {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
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