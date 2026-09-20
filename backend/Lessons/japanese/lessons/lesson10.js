let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ja-JP",
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
  utter.lang = "ja-JP";
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
question:"暑い (atsui) کدام است؟",
speak:"暑い",
options:[
{text:"寒い (samui)",image:"../../media/weather/cold.webp"},
{text:"暑い (atsui)",image:"../../media/weather/hot.webp"},
{text:"晴れ (hare)",image:"../../media/weather/sunny.webp"},
{text:"曇り (kumori)",image:"../../media/weather/cloudy.webp"}
],
answer:"暑い (atsui)"
},

{
type:"image",
question:"寒い (samui) کدام است؟",
speak:"寒い",
options:[
{text:"晴れ (hare)",image:"../../media/weather/sunny.webp"},
{text:"寒い (samui)",image:"../../media/weather/cold.webp"},
{text:"風 (kaze)",image:"../../media/weather/wind.webp"},
{text:"暑い (atsui)",image:"../../media/weather/hot.webp"}
],
answer:"寒い (samui)"
},

{
type:"image",
question:"晴れ (hare) کدام است؟",
speak:"晴れ",
options:[
{text:"暑い (atsui)",image:"../../media/weather/hot.webp"},
{text:"晴れ (hare)",image:"../../media/weather/sunny.webp"},
{text:"風 (kaze)",image:"../../media/weather/wind.webp"},
{text:"寒い (samui)",image:"../../media/weather/cold.webp"}
],
answer:"晴れ (hare)"
},

{
type:"image",
question:"曇り (kumori) کدام است؟",
speak:"曇り",
options:[
{text:"晴れ (hare)",image:"../../media/weather/sunny.webp"},
{text:"寒い (samui)",image:"../../media/weather/cold.webp"},
{text:"曇り (kumori)",image:"../../media/weather/cloudy.webp"},
{text:"暑い (atsui)",image:"../../media/weather/hot.webp"}
],
answer:"曇り (kumori)"
},

{
type:"image",
question:"風 (kaze) کدام است؟",
speak:"風",
options:[
{text:"曇り (kumori)",image:"../../media/weather/cloudy.webp"},
{text:"暑い (atsui)",image:"../../media/weather/hot.webp"},
{text:"寒い (samui)",image:"../../media/weather/cold.webp"},
{text:"風 (kaze)",image:"../../media/weather/wind.webp"}
],
answer:"風 (kaze)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.webp",
options:["寒い","暑い","晴れ","曇り"],
answer:"暑い"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.webp",
options:["晴れ","寒い","風","暑い"],
answer:"寒い"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.webp",
options:["暑い","晴れ","風","寒い"],
answer:"晴れ"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.webp",
options:["晴れ","寒い","曇り","暑い"],
answer:"曇り"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.webp",
options:["曇り","暑い","寒い","風"],
answer:"風"
},

/* AUDIO */

{
type:"audio",
speak:"暑い",
question:"کدام کلمه را شنیدی؟",
options:["寒い","暑い","晴れ","曇り"],
answer:"暑い"
},

{
type:"audio",
speak:"寒い",
question:"کدام کلمه را شنیدی؟",
options:["晴れ","寒い","風","暑い"],
answer:"寒い"
},

{
type:"audio",
speak:"晴れ",
question:"کدام کلمه را شنیدی؟",
options:["暑い","晴れ","風","寒い"],
answer:"晴れ"
},

{
type:"audio",
speak:"曇り",
question:"کدام کلمه را شنیدی؟",
options:["晴れ","寒い","曇り","暑い"],
answer:"曇り"
},

{
type:"audio",
speak:"風",
question:"کدام کلمه را شنیدی؟",
options:["曇り","暑い","寒い","風"],
answer:"風"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"今日は暑いです",
question:"جمله ژاپنی را بساز:",
text:"امروز هوا گرم است",
words:["今日","は","暑い","です"],
answer:["今日","は","暑い","です"]
},

{
type:"build-jp",
speak:"明日は寒いです",
question:"جمله ژاپنی را بساز:",
text:"فردا هوا سرد است",
words:["明日","は","寒い","です"],
answer:["明日","は","寒い","です"]
},

{
type:"build-jp",
speak:"太陽は暑いです",
question:"جمله ژاپنی را بساز:",
text:"خورشید گرم است",
words:["太陽","は","暑い","です"],
answer:["太陽","は","暑い","です"]
},

{
type:"build-jp",
speak:"空は曇りです",
question:"جمله ژاپنی را بساز:",
text:"آسمان ابری است",
words:["空","は","曇り","です"],
answer:["空","は","曇り","です"]
},

{
type:"build-jp",
speak:"私は晴れが好きです",
question:"جمله ژاپنی را بساز:",
text:"من هوای آفتابی را دوست دارم",
words:["私","は","晴れ","が","好き","です"],
answer:["私","は","晴れ","が","好き","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"今日は暑いです",
question:"ترجمه را بساز:",
text:"今日は暑いです",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"明日は寒いです",
question:"ترجمه را بساز:",
text:"明日は寒いです",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"太陽は暑いです",
question:"ترجمه را بساز:",
text:"太陽は暑いです",
words:["است","گرم","خورشید"],
answer:["خورشید","گرم","است"]
},

{
type:"build-fa",
speak:"空は曇りです",
question:"ترجمه را بساز:",
text:"空は曇りです",
words:["است","ابری","آسمان"],
answer:["آسمان","ابری","است"]
},

{
type:"build-fa",
speak:"私は晴れが好きです",
question:"ترجمه را بساز:",
text:"私は晴れが好きです",
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

  // BUILD JAPANESE / FA

  else if (q.type === "build-jp" || q.type === "build-fa") {
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

  if (q.type === "build-jp") {
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