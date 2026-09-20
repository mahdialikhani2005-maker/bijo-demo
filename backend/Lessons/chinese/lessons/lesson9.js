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
question:"太阳 (tàiyáng) کدام است؟",
speak:"太阳",
options:[
{text:"月亮 (yuèliàng)",image:"../../media/nature/moon.webp"},
{text:"太阳 (tàiyáng)",image:"../../media/nature/sun.webp"},
{text:"星星 (xīngxing)",image:"../../media/nature/star.webp"},
{text:"天空 (tiānkōng)",image:"../../media/nature/sky.webp"}
],
answer:"太阳 (tàiyáng)"
},

{
type:"image",
question:"月亮 (yuèliàng) کدام است؟",
speak:"月亮",
options:[
{text:"星星 (xīngxing)",image:"../../media/nature/star.webp"},
{text:"月亮 (yuèliàng)",image:"../../media/nature/moon.webp"},
{text:"雨 (yǔ)",image:"../../media/nature/rain.webp"},
{text:"太阳 (tàiyáng)",image:"../../media/nature/sun.webp"}
],
answer:"月亮 (yuèliàng)"
},

{
type:"image",
question:"星星 (xīngxing) کدام است؟",
speak:"星星",
options:[
{text:"太阳 (tàiyáng)",image:"../../media/nature/sun.webp"},
{text:"星星 (xīngxing)",image:"../../media/nature/star.webp"},
{text:"雨 (yǔ)",image:"../../media/nature/rain.webp"},
{text:"月亮 (yuèliàng)",image:"../../media/nature/moon.webp"}
],
answer:"星星 (xīngxing)"
},

{
type:"image",
question:"天空 (tiānkōng) کدام است؟",
speak:"天空",
options:[
{text:"星星 (xīngxing)",image:"../../media/nature/star.webp"},
{text:"月亮 (yuèliàng)",image:"../../media/nature/moon.webp"},
{text:"天空 (tiānkōng)",image:"../../media/nature/sky.webp"},
{text:"太阳 (tàiyáng)",image:"../../media/nature/sun.webp"}
],
answer:"天空 (tiānkōng)"
},

{
type:"image",
question:"雨 (yǔ) کدام است؟",
speak:"雨",
options:[
{text:"天空 (tiānkōng)",image:"../../media/nature/sky.webp"},
{text:"太阳 (tàiyáng)",image:"../../media/nature/sun.webp"},
{text:"月亮 (yuèliàng)",image:"../../media/nature/moon.webp"},
{text:"雨 (yǔ)",image:"../../media/nature/rain.webp"}
],
answer:"雨 (yǔ)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["月亮 (yuèliàng)","太阳 (tàiyáng)","星星 (xīngxing)","天空 (tiānkōng)"],
answer:"太阳 (tàiyáng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["星星 (xīngxing)","月亮 (yuèliàng)","雨 (yǔ)","太阳 (tàiyáng)"],
answer:"月亮 (yuèliàng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["太阳 (tàiyáng)","星星 (xīngxing)","雨 (yǔ)","月亮 (yuèliàng)"],
answer:"星星 (xīngxing)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["星星 (xīngxing)","月亮 (yuèliàng)","天空 (tiānkōng)","太阳 (tàiyáng)"],
answer:"天空 (tiānkōng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["天空 (tiānkōng)","太阳 (tàiyáng)","月亮 (yuèliàng)","雨 (yǔ)"],
answer:"雨 (yǔ)"
},

/* AUDIO */

{
type:"audio",
speak:"太阳",
question:"کدام کلمه را شنیدی؟",
options:["月亮 (yuèliàng)","太阳 (tàiyáng)","星星 (xīngxing)","天空 (tiānkōng)"],
answer:"太阳 (tàiyáng)"
},

{
type:"audio",
speak:"月亮",
question:"کدام کلمه را شنیدی؟",
options:["星星 (xīngxing)","月亮 (yuèliàng)","雨 (yǔ)","太阳 (tàiyáng)"],
answer:"月亮 (yuèliàng)"
},

{
type:"audio",
speak:"星星",
question:"کدام کلمه را شنیدی؟",
options:["太阳 (tàiyáng)","星星 (xīngxing)","雨 (yǔ)","月亮 (yuèliàng)"],
answer:"星星 (xīngxing)"
},

{
type:"audio",
speak:"天空",
question:"کدام کلمه را شنیدی؟",
options:["星星 (xīngxing)","月亮 (yuèliàng)","天空 (tiānkōng)","太阳 (tàiyáng)"],
answer:"天空 (tiānkōng)"
},

{
type:"audio",
speak:"雨",
question:"کدام کلمه را شنیدی؟",
options:["天空 (tiānkōng)","太阳 (tàiyáng)","月亮 (yuèliàng)","雨 (yǔ)"],
answer:"雨 (yǔ)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我看见太阳",
question:"جمله چینی را بساز:",
text:"من خورشید را می‌بینم",
words:["我","看见","太阳"],
answer:["我","看见","太阳"]
},

{
type:"build-zh",
speak:"月亮很大",
question:"جمله چینی را بساز:",
text:"ماه بزرگ است",
words:["月亮","很","大"],
answer:["月亮","很","大"]
},

{
type:"build-zh",
speak:"星星很小",
question:"جمله چینی را بساز:",
text:"ستاره کوچک است",
words:["星星","很","小"],
answer:["星星","很","小"]
},

{
type:"build-zh",
speak:"天空很蓝",
question:"جمله چینی را بساز:",
text:"آسمان آبی است",
words:["天空","很","蓝"],
answer:["天空","很","蓝"]
},

{
type:"build-zh",
speak:"我喜欢雨",
question:"جمله چینی را بساز:",
text:"من باران را دوست دارم",
words:["我","喜欢","雨"],
answer:["我","喜欢","雨"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我看见太阳",
question:"ترجمه را بساز:",
text:"我看见太阳",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"月亮很大",
question:"ترجمه را بساز:",
text:"月亮很大",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"星星很小",
question:"ترجمه را بساز:",
text:"星星很小",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"天空很蓝",
question:"ترجمه را بساز:",
text:"天空很蓝",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"我喜欢雨",
question:"ترجمه را بساز:",
text:"我喜欢雨",
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