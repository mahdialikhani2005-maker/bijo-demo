let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "zh-CN",
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
  utter.lang = "zh-CN";
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
question:"热 (rè) کدام است؟",
speak:"热",
options:[
{text:"冷 (lěng)",image:"../../media/weather/cold.webp"},
{text:"热 (rè)",image:"../../media/weather/hot.webp"},
{text:"晴朗 (qínglǎng)",image:"../../media/weather/sunny.webp"},
{text:"多云 (duōyún)",image:"../../media/weather/cloudy.webp"}
],
answer:"热 (rè)"
},

{
type:"image",
question:"冷 (lěng) کدام است؟",
speak:"冷",
options:[
{text:"晴朗 (qínglǎng)",image:"../../media/weather/sunny.webp"},
{text:"冷 (lěng)",image:"../../media/weather/cold.webp"},
{text:"风 (fēng)",image:"../../media/weather/wind.webp"},
{text:"热 (rè)",image:"../../media/weather/hot.webp"}
],
answer:"冷 (lěng)"
},

{
type:"image",
question:"晴朗 (qínglǎng) کدام است؟",
speak:"晴朗",
options:[
{text:"热 (rè)",image:"../../media/weather/hot.webp"},
{text:"晴朗 (qínglǎng)",image:"../../media/weather/sunny.webp"},
{text:"风 (fēng)",image:"../../media/weather/wind.webp"},
{text:"冷 (lěng)",image:"../../media/weather/cold.webp"}
],
answer:"晴朗 (qínglǎng)"
},

{
type:"image",
question:"多云 (duōyún) کدام است؟",
speak:"多云",
options:[
{text:"晴朗 (qínglǎng)",image:"../../media/weather/sunny.webp"},
{text:"冷 (lěng)",image:"../../media/weather/cold.webp"},
{text:"多云 (duōyún)",image:"../../media/weather/cloudy.webp"},
{text:"热 (rè)",image:"../../media/weather/hot.webp"}
],
answer:"多云 (duōyún)"
},

{
type:"image",
question:"风 (fēng) کدام است؟",
speak:"风",
options:[
{text:"多云 (duōyún)",image:"../../media/weather/cloudy.webp"},
{text:"热 (rè)",image:"../../media/weather/hot.webp"},
{text:"冷 (lěng)",image:"../../media/weather/cold.webp"},
{text:"风 (fēng)",image:"../../media/weather/wind.webp"}
],
answer:"风 (fēng)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.webp",
options:["冷 (lěng)","热 (rè)","晴朗 (qínglǎng)","多云 (duōyún)"],
answer:"热 (rè)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.webp",
options:["晴朗 (qínglǎng)","冷 (lěng)","风 (fēng)","热 (rè)"],
answer:"冷 (lěng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.webp",
options:["热 (rè)","晴朗 (qínglǎng)","风 (fēng)","冷 (lěng)"],
answer:"晴朗 (qínglǎng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.webp",
options:["晴朗 (qínglǎng)","冷 (lěng)","多云 (duōyún)","热 (rè)"],
answer:"多云 (duōyún)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.webp",
options:["多云 (duōyún)","热 (rè)","冷 (lěng)","风 (fēng)"],
answer:"风 (fēng)"
},

/* AUDIO */

{
type:"audio",
speak:"热",
question:"کدام کلمه را شنیدی؟",
options:["冷 (lěng)","热 (rè)","晴朗 (qínglǎng)","多云 (duōyún)"],
answer:"热 (rè)"
},

{
type:"audio",
speak:"冷",
question:"کدام کلمه را شنیدی؟",
options:["晴朗 (qínglǎng)","冷 (lěng)","风 (fēng)","热 (rè)"],
answer:"冷 (lěng)"
},

{
type:"audio",
speak:"晴朗",
question:"کدام کلمه را شنیدی؟",
options:["热 (rè)","晴朗 (qínglǎng)","风 (fēng)","冷 (lěng)"],
answer:"晴朗 (qínglǎng)"
},

{
type:"audio",
speak:"多云",
question:"کدام کلمه را شنیدی؟",
options:["晴朗 (qínglǎng)","冷 (lěng)","多云 (duōyún)","热 (rè)"],
answer:"多云 (duōyún)"
},

{
type:"audio",
speak:"风",
question:"کدام کلمه را شنیدی؟",
options:["多云 (duōyún)","热 (rè)","冷 (lěng)","风 (fēng)"],
answer:"风 (fēng)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"天气很热",
question:"جمله چینی را بساز:",
text:"هوا گرم است",
words:["天气","很","热"],
answer:["天气","很","热"]
},

{
type:"build-zh",
speak:"天气很冷",
question:"جمله چینی را بساز:",
text:"هوا سرد است",
words:["天气","很","冷"],
answer:["天气","很","冷"]
},

{
type:"build-zh",
speak:"太阳很热",
question:"جمله چینی را بساز:",
text:"خورشید گرم است",
words:["太阳","很","热"],
answer:["太阳","很","热"]
},

{
type:"build-zh",
speak:"天空多云",
question:"جمله چینی را بساز:",
text:"آسمان ابری است",
words:["天空","多云"],
answer:["天空","多云"]
},

{
type:"build-zh",
speak:"我喜欢晴朗的天气",
question:"جمله چینی را بساز:",
text:"من هوای آفتابی را دوست دارم",
words:["我","喜欢","晴朗","的","天气"],
answer:["我","喜欢","晴朗","的","天气"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"天气很热",
question:"ترجمه را بساز:",
text:"天气很热",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"天气很冷",
question:"ترجمه را بساز:",
text:"天气很冷",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"太阳很热",
question:"ترجمه را بساز:",
text:"太阳很热",
words:["است","گرم","خورشید"],
answer:["خورشید","گرم","است"]
},

{
type:"build-fa",
speak:"天空多云",
question:"ترجمه را بساز:",
text:"天空多云",
words:["است","ابری","آسمان"],
answer:["آسمان","ابری","است"]
},

{
type:"build-fa",
speak:"我喜欢晴朗的天气",
question:"ترجمه را بساز:",
text:"我喜欢晴朗的天气",
words:["دارم","دوست","آفتابی","هوای","من"],
answer:["من","هوای","آفتابی","را","دوست","دارم"]
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

  // BUILD CHINESE / FA

  else if (q.type === "build-zh" || q.type === "build-fa") {
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

  if (q.type === "build-zh") {
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