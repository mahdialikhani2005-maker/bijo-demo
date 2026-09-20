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
question:"高兴 (gāoxìng) کدام است؟",
speak:"高兴",
options:[
{text:"难过 (nánguò)",image:"../../media/feelings/sad.webp"},
{text:"高兴 (gāoxìng)",image:"../../media/feelings/happy.webp"},
{text:"生气 (shēngqì)",image:"../../media/feelings/angry.webp"},
{text:"累 (lèi)",image:"../../media/feelings/tired.webp"}
],
answer:"高兴 (gāoxìng)"
},

{
type:"image",
question:"难过 (nánguò) کدام است؟",
speak:"难过",
options:[
{text:"累 (lèi)",image:"../../media/feelings/tired.webp"},
{text:"难过 (nánguò)",image:"../../media/feelings/sad.webp"},
{text:"害怕 (hàipà)",image:"../../media/feelings/scared.webp"},
{text:"高兴 (gāoxìng)",image:"../../media/feelings/happy.webp"}
],
answer:"难过 (nánguò)"
},

{
type:"image",
question:"生气 (shēngqì) کدام است؟",
speak:"生气",
options:[
{text:"高兴 (gāoxìng)",image:"../../media/feelings/happy.webp"},
{text:"生气 (shēngqì)",image:"../../media/feelings/angry.webp"},
{text:"害怕 (hàipà)",image:"../../media/feelings/scared.webp"},
{text:"难过 (nánguò)",image:"../../media/feelings/sad.webp"}
],
answer:"生气 (shēngqì)"
},

{
type:"image",
question:"累 (lèi) کدام است؟",
speak:"累",
options:[
{text:"生气 (shēngqì)",image:"../../media/feelings/angry.webp"},
{text:"难过 (nánguò)",image:"../../media/feelings/sad.webp"},
{text:"累 (lèi)",image:"../../media/feelings/tired.webp"},
{text:"高兴 (gāoxìng)",image:"../../media/feelings/happy.webp"}
],
answer:"累 (lèi)"
},

{
type:"image",
question:"害怕 (hàipà) کدام است؟",
speak:"害怕",
options:[
{text:"累 (lèi)",image:"../../media/feelings/tired.webp"},
{text:"高兴 (gāoxìng)",image:"../../media/feelings/happy.webp"},
{text:"难过 (nánguò)",image:"../../media/feelings/sad.webp"},
{text:"害怕 (hàipà)",image:"../../media/feelings/scared.webp"}
],
answer:"害怕 (hàipà)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["难过 (nánguò)","高兴 (gāoxìng)","生气 (shēngqì)","累 (lèi)"],
answer:"高兴 (gāoxìng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["累 (lèi)","难过 (nánguò)","害怕 (hàipà)","高兴 (gāoxìng)"],
answer:"难过 (nánguò)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["高兴 (gāoxìng)","生气 (shēngqì)","害怕 (hàipà)","难过 (nánguò)"],
answer:"生气 (shēngqì)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["生气 (shēngqì)","难过 (nánguò)","累 (lèi)","高兴 (gāoxìng)"],
answer:"累 (lèi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["累 (lèi)","高兴 (gāoxìng)","难过 (nánguò)","害怕 (hàipà)"],
answer:"害怕 (hàipà)"
},

/* AUDIO */

{
type:"audio",
speak:"高兴",
question:"کدام کلمه را شنیدی؟",
options:["难过 (nánguò)","高兴 (gāoxìng)","生气 (shēngqì)","累 (lèi)"],
answer:"高兴 (gāoxìng)"
},

{
type:"audio",
speak:"难过",
question:"کدام کلمه را شنیدی؟",
options:["累 (lèi)","难过 (nánguò)","害怕 (hàipà)","高兴 (gāoxìng)"],
answer:"难过 (nánguò)"
},

{
type:"audio",
speak:"生气",
question:"کدام کلمه را شنیدی؟",
options:["高兴 (gāoxìng)","生气 (shēngqì)","害怕 (hàipà)","难过 (nánguò)"],
answer:"生气 (shēngqì)"
},

{
type:"audio",
speak:"累",
question:"کدام کلمه را شنیدی؟",
options:["生气 (shēngqì)","难过 (nánguò)","累 (lèi)","高兴 (gāoxìng)"],
answer:"累 (lèi)"
},

{
type:"audio",
speak:"害怕",
question:"کدام کلمه را شنیدی؟",
options:["累 (lèi)","高兴 (gāoxìng)","难过 (nánguò)","害怕 (hàipà)"],
answer:"害怕 (hàipà)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我很高兴",
question:"جمله چینی را بساز:",
text:"من خوشحال هستم",
words:["我","很","高兴"],
answer:["我","很","高兴"]
},

{
type:"build-zh",
speak:"她很难过",
question:"جمله چینی را بساز:",
text:"او ناراحت است",
words:["她","很","难过"],
answer:["她","很","难过"]
},

{
type:"build-zh",
speak:"他很生气",
question:"جمله چینی را بساز:",
text:"او عصبانی است",
words:["他","很","生气"],
answer:["他","很","生气"]
},

{
type:"build-zh",
speak:"我们很累",
question:"جمله چینی را بساز:",
text:"ما خسته هستیم",
words:["我们","很","累"],
answer:["我们","很","累"]
},

{
type:"build-zh",
speak:"他们很害怕",
question:"جمله چینی را بساز:",
text:"آنها ترسیده هستند",
words:["他们","很","害怕"],
answer:["他们","很","害怕"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我很高兴",
question:"ترجمه را بساز:",
text:"我很高兴",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"她很难过",
question:"ترجمه را بساز:",
text:"她很难过",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"他很生气",
question:"ترجمه را بساز:",
text:"他很生气",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"我们很累",
question:"ترجمه را بساز:",
text:"我们很累",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"他们很害怕",
question:"ترجمه را بساز:",
text:"他们很害怕",
words:["هستند","ترسیده","آنها"],
answer:["آنها","ترسیده","هستند"]
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