let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "en-US",
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
  utter.lang = "en-US";
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
question:"hot کدام است؟",
speak:"hot",
options:[
{text:"cold",image:"../../media/weather/cold.webp"},
{text:"hot",image:"../../media/weather/hot.webp"},
{text:"sunny",image:"../../media/weather/sunny.webp"},
{text:"cloudy",image:"../../media/weather/cloudy.webp"}
],
answer:"hot"
},

{
type:"image",
question:"cold کدام است؟",
speak:"cold",
options:[
{text:"sunny",image:"../../media/weather/sunny.webp"},
{text:"cold",image:"../../media/weather/cold.webp"},
{text:"wind",image:"../../media/weather/wind.webp"},
{text:"hot",image:"../../media/weather/hot.webp"}
],
answer:"cold"
},

{
type:"image",
question:"sunny کدام است؟",
speak:"sunny",
options:[
{text:"hot",image:"../../media/weather/hot.webp"},
{text:"sunny",image:"../../media/weather/sunny.webp"},
{text:"wind",image:"../../media/weather/wind.webp"},
{text:"cold",image:"../../media/weather/cold.webp"}
],
answer:"sunny"
},

{
type:"image",
question:"cloudy کدام است؟",
speak:"cloudy",
options:[
{text:"sunny",image:"../../media/weather/sunny.webp"},
{text:"cold",image:"../../media/weather/cold.webp"},
{text:"cloudy",image:"../../media/weather/cloudy.webp"},
{text:"hot",image:"../../media/weather/hot.webp"}
],
answer:"cloudy"
},

{
type:"image",
question:"wind کدام است؟",
speak:"wind",
options:[
{text:"cloudy",image:"../../media/weather/cloudy.webp"},
{text:"hot",image:"../../media/weather/hot.webp"},
{text:"cold",image:"../../media/weather/cold.webp"},
{text:"wind",image:"../../media/weather/wind.webp"}
],
answer:"wind"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.webp",
options:["cold","hot","sunny","cloudy"],
answer:"hot"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.webp",
options:["sunny","cold","wind","hot"],
answer:"cold"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.webp",
options:["hot","sunny","wind","cold"],
answer:"sunny"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.webp",
options:["sunny","cold","cloudy","hot"],
answer:"cloudy"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.webp",
options:["cloudy","hot","cold","wind"],
answer:"wind"
},

/* AUDIO */

{
type:"audio",
speak:"hot",
question:"کدام کلمه را شنیدی؟",
options:["cold","hot","sunny","cloudy"],
answer:"hot"
},

{
type:"audio",
speak:"cold",
question:"کدام کلمه را شنیدی؟",
options:["sunny","cold","wind","hot"],
answer:"cold"
},

{
type:"audio",
speak:"sunny",
question:"کدام کلمه را شنیدی؟",
options:["hot","sunny","wind","cold"],
answer:"sunny"
},

{
type:"audio",
speak:"cloudy",
question:"کدام کلمه را شنیدی؟",
options:["sunny","cold","cloudy","hot"],
answer:"cloudy"
},

{
type:"audio",
speak:"wind",
question:"کدام کلمه را شنیدی؟",
options:["cloudy","hot","cold","wind"],
answer:"wind"
},

/* BUILD EN - جدید ساده با تنوع */

{
type:"build-en",
speak:"It is hot",
question:"جمله انگلیسی را بساز:",
text:"هوا گرم است",
words:["hot","is","It"],
answer:["It","is","hot"]
},

{
type:"build-en",
speak:"It is cold",
question:"جمله انگلیسی را بساز:",
text:"هوا سرد است",
words:["cold","is","It"],
answer:["It","is","cold"]
},

{
type:"build-en",
speak:"The sun is hot",
question:"جمله انگلیسی را بساز:",
text:"خورشید گرم است",
words:["sun","hot","is","The"],
answer:["The","sun","is","hot"]
},

{
type:"build-en",
speak:"The sky is cloudy",
question:"جمله انگلیسی را بساز:",
text:"آسمان ابری است",
words:["sky","cloudy","is","The"],
answer:["The","sky","is","cloudy"]
},

{
type:"build-en",
speak:"I like sunny days",
question:"جمله انگلیسی را بساز:",
text:"من روزهای آفتابی را دوست دارم",
words:["like","sunny","days","I"],
answer:["I","like","sunny","days"]
},

/* BUILD FA - جدید ساده با تنوع */

{
type:"build-fa",
speak:"It is hot",
question:"ترجمه را بساز:",
text:"It is hot",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"It is cold",
question:"ترجمه را بساز:",
text:"It is cold",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"The sun is hot",
question:"ترجمه را بساز:",
text:"The sun is hot",
words:["است","گرم","خورشید"],
answer:["خورشید","گرم","است"]
},

{
type:"build-fa",
speak:"The sky is cloudy",
question:"ترجمه را بساز:",
text:"The sky is cloudy",
words:["است","ابری","آسمان"],
answer:["آسمان","ابری","است"]
},

{
type:"build-fa",
speak:"I like sunny days",
question:"ترجمه را بساز:",
text:"I like sunny days",
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

  // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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