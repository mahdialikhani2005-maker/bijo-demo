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
question:"红色 (hóngsè) کدام است؟",
speak:"红色",
options:[
{text:"蓝色 (lánsè)",image:"../../media/colors/blue.webp"},
{text:"红色 (hóngsè)",image:"../../media/colors/red.webp"},
{text:"绿色 (lǜsè)",image:"../../media/colors/green.webp"},
{text:"黄色 (huángsè)",image:"../../media/colors/yellow.webp"}
],
answer:"红色 (hóngsè)"
},

{
type:"image",
question:"蓝色 (lánsè) کدام است؟",
speak:"蓝色",
options:[
{text:"黄色 (huángsè)",image:"../../media/colors/yellow.webp"},
{text:"蓝色 (lánsè)",image:"../../media/colors/blue.webp"},
{text:"黑色 (hēisè)",image:"../../media/colors/black.webp"},
{text:"红色 (hóngsè)",image:"../../media/colors/red.webp"}
],
answer:"蓝色 (lánsè)"
},

{
type:"image",
question:"绿色 (lǜsè) کدام است؟",
speak:"绿色",
options:[
{text:"红色 (hóngsè)",image:"../../media/colors/red.webp"},
{text:"绿色 (lǜsè)",image:"../../media/colors/green.webp"},
{text:"黑色 (hēisè)",image:"../../media/colors/black.webp"},
{text:"蓝色 (lánsè)",image:"../../media/colors/blue.webp"}
],
answer:"绿色 (lǜsè)"
},

{
type:"image",
question:"黄色 (huángsè) کدام است؟",
speak:"黄色",
options:[
{text:"绿色 (lǜsè)",image:"../../media/colors/green.webp"},
{text:"蓝色 (lánsè)",image:"../../media/colors/blue.webp"},
{text:"黄色 (huángsè)",image:"../../media/colors/yellow.webp"},
{text:"红色 (hóngsè)",image:"../../media/colors/red.webp"}
],
answer:"黄色 (huángsè)"
},

{
type:"image",
question:"黑色 (hēisè) کدام است؟",
speak:"黑色",
options:[
{text:"黄色 (huángsè)",image:"../../media/colors/yellow.webp"},
{text:"红色 (hóngsè)",image:"../../media/colors/red.webp"},
{text:"蓝色 (lánsè)",image:"../../media/colors/blue.webp"},
{text:"黑色 (hēisè)",image:"../../media/colors/black.webp"}
],
answer:"黑色 (hēisè)"
},

/* WORD */

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/red.webp",
options:["蓝色 (lánsè)","红色 (hóngsè)","绿色 (lǜsè)","黄色 (huángsè)"],
answer:"红色 (hóngsè)"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/blue.webp",
options:["黄色 (huángsè)","蓝色 (lánsè)","黑色 (hēisè)","红色 (hóngsè)"],
answer:"蓝色 (lánsè)"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/green.webp",
options:["红色 (hóngsè)","绿色 (lǜsè)","黑色 (hēisè)","蓝色 (lánsè)"],
answer:"绿色 (lǜsè)"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/yellow.webp",
options:["绿色 (lǜsè)","蓝色 (lánsè)","黄色 (huángsè)","红色 (hóngsè)"],
answer:"黄色 (huángsè)"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/black.webp",
options:["黄色 (huángsè)","红色 (hóngsè)","蓝色 (lánsè)","黑色 (hēisè)"],
answer:"黑色 (hēisè)"
},

/* AUDIO */

{
type:"audio",
speak:"红色",
question:"کدام کلمه را شنیدی؟",
options:["蓝色 (lánsè)","红色 (hóngsè)","绿色 (lǜsè)","黄色 (huángsè)"],
answer:"红色 (hóngsè)"
},

{
type:"audio",
speak:"蓝色",
question:"کدام کلمه را شنیدی؟",
options:["黄色 (huángsè)","蓝色 (lánsè)","黑色 (hēisè)","红色 (hóngsè)"],
answer:"蓝色 (lánsè)"
},

{
type:"audio",
speak:"绿色",
question:"کدام کلمه را شنیدی؟",
options:["红色 (hóngsè)","绿色 (lǜsè)","黑色 (hēisè)","蓝色 (lánsè)"],
answer:"绿色 (lǜsè)"
},

{
type:"audio",
speak:"黄色",
question:"کدام کلمه را شنیدی؟",
options:["绿色 (lǜsè)","蓝色 (lánsè)","黄色 (huángsè)","红色 (hóngsè)"],
answer:"黄色 (huángsè)"
},

{
type:"audio",
speak:"黑色",
question:"کدام کلمه را شنیدی؟",
options:["黄色 (huángsè)","红色 (hóngsè)","蓝色 (lánsè)","黑色 (hēisè)"],
answer:"黑色 (hēisè)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"苹果是红色的",
question:"جمله چینی را بساز:",
text:"سیب قرمز است",
words:["苹果","是","红色","的"],
answer:["苹果","是","红色","的"]
},

{
type:"build-zh",
speak:"天空是蓝色的",
question:"جمله چینی را بساز:",
text:"آسمان آبی است",
words:["天空","是","蓝色","的"],
answer:["天空","是","蓝色","的"]
},

{
type:"build-zh",
speak:"树是绿色的",
question:"جمله چینی را بساز:",
text:"درخت سبز است",
words:["树","是","绿色","的"],
answer:["树","是","绿色","的"]
},

{
type:"build-zh",
speak:"太阳是黄色的",
question:"جمله چینی را بساز:",
text:"خورشید زرد است",
words:["太阳","是","黄色","的"],
answer:["太阳","是","黄色","的"]
},

{
type:"build-zh",
speak:"猫是黑色的",
question:"جمله چینی را بساز:",
text:"گربه مشکی است",
words:["猫","是","黑色","的"],
answer:["猫","是","黑色","的"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"苹果是红色的",
question:"ترجمه را بساز:",
text:"苹果是红色的",
words:["است","قرمز","سیب"],
answer:["سیب","قرمز","است"]
},

{
type:"build-fa",
speak:"天空是蓝色的",
question:"ترجمه را بساز:",
text:"天空是蓝色的",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"树是绿色的",
question:"ترجمه را بساز:",
text:"树是绿色的",
words:["است","سبز","درخت"],
answer:["درخت","سبز","است"]
},

{
type:"build-fa",
speak:"太阳是黄色的",
question:"ترجمه را بساز:",
text:"太阳是黄色的",
words:["است","زرد","خورشید"],
answer:["خورشید","زرد","است"]
},

{
type:"build-fa",
speak:"猫是黑色的",
question:"ترجمه را بساز:",
text:"猫是黑色的",
words:["است","مشکی","گربه"],
answer:["گربه","مشکی","است"]
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