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
question:"吃 (chī) کدام است؟",
speak:"吃",
options:[
{text:"睡觉 (shuìjiào)",image:"../../media/actions/sleep.webp"},
{text:"吃 (chī)",image:"../../media/actions/eat.webp"},
{text:"走路 (zǒulù)",image:"../../media/actions/walk.webp"},
{text:"读 (dú)",image:"../../media/actions/read.webp"}
],
answer:"吃 (chī)"
},

{
type:"image",
question:"睡觉 (shuìjiào) کدام است؟",
speak:"睡觉",
options:[
{text:"写 (xiě)",image:"../../media/actions/write.webp"},
{text:"睡觉 (shuìjiào)",image:"../../media/actions/sleep.webp"},
{text:"吃 (chī)",image:"../../media/actions/eat.webp"},
{text:"走路 (zǒulù)",image:"../../media/actions/walk.webp"}
],
answer:"睡觉 (shuìjiào)"
},

{
type:"image",
question:"走路 (zǒulù) کدام است؟",
speak:"走路",
options:[
{text:"吃 (chī)",image:"../../media/actions/eat.webp"},
{text:"走路 (zǒulù)",image:"../../media/actions/walk.webp"},
{text:"写 (xiě)",image:"../../media/actions/write.webp"},
{text:"睡觉 (shuìjiào)",image:"../../media/actions/sleep.webp"}
],
answer:"走路 (zǒulù)"
},

{
type:"image",
question:"读 (dú) کدام است؟",
speak:"读",
options:[
{text:"走路 (zǒulù)",image:"../../media/actions/walk.webp"},
{text:"睡觉 (shuìjiào)",image:"../../media/actions/sleep.webp"},
{text:"读 (dú)",image:"../../media/actions/read.webp"},
{text:"吃 (chī)",image:"../../media/actions/eat.webp"}
],
answer:"读 (dú)"
},

{
type:"image",
question:"写 (xiě) کدام است؟",
speak:"写",
options:[
{text:"读 (dú)",image:"../../media/actions/read.webp"},
{text:"吃 (chī)",image:"../../media/actions/eat.webp"},
{text:"睡觉 (shuìjiào)",image:"../../media/actions/sleep.webp"},
{text:"写 (xiě)",image:"../../media/actions/write.webp"}
],
answer:"写 (xiě)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["睡觉 (shuìjiào)","吃 (chī)","走路 (zǒulù)","读 (dú)"],
answer:"吃 (chī)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["写 (xiě)","睡觉 (shuìjiào)","吃 (chī)","走路 (zǒulù)"],
answer:"睡觉 (shuìjiào)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["吃 (chī)","走路 (zǒulù)","写 (xiě)","睡觉 (shuìjiào)"],
answer:"走路 (zǒulù)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["走路 (zǒulù)","睡觉 (shuìjiào)","读 (dú)","吃 (chī)"],
answer:"读 (dú)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["读 (dú)","吃 (chī)","睡觉 (shuìjiào)","写 (xiě)"],
answer:"写 (xiě)"
},

/* AUDIO */

{
type:"audio",
speak:"吃",
question:"کدام کلمه را شنیدی؟",
options:["睡觉 (shuìjiào)","吃 (chī)","走路 (zǒulù)","读 (dú)"],
answer:"吃 (chī)"
},

{
type:"audio",
speak:"睡觉",
question:"کدام کلمه را شنیدی؟",
options:["写 (xiě)","睡觉 (shuìjiào)","吃 (chī)","走路 (zǒulù)"],
answer:"睡觉 (shuìjiào)"
},

{
type:"audio",
speak:"走路",
question:"کدام کلمه را شنیدی؟",
options:["吃 (chī)","走路 (zǒulù)","写 (xiě)","睡觉 (shuìjiào)"],
answer:"走路 (zǒulù)"
},

{
type:"audio",
speak:"读",
question:"کدام کلمه را شنیدی؟",
options:["走路 (zǒulù)","睡觉 (shuìjiào)","读 (dú)","吃 (chī)"],
answer:"读 (dú)"
},

{
type:"audio",
speak:"写",
question:"کدام کلمه را شنیدی؟",
options:["读 (dú)","吃 (chī)","睡觉 (shuìjiào)","写 (xiě)"],
answer:"写 (xiě)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我吃面包",
question:"جمله چینی را بساز:",
text:"من نان می‌خورم",
words:["我","吃","面包"],
answer:["我","吃","面包"]
},

{
type:"build-zh",
speak:"她晚上睡觉",
question:"جمله چینی را بساز:",
text:"او شب می‌خوابد",
words:["她","晚上","睡觉"],
answer:["她","晚上","睡觉"]
},

{
type:"build-zh",
speak:"他走路去学校",
question:"جمله چینی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["他","走路","去","学校"],
answer:["他","走路","去","学校"]
},

{
type:"build-zh",
speak:"我读一本书",
question:"جمله چینی را بساز:",
text:"من یک کتاب می‌خوانم",
words:["我","读","一本","书"],
answer:["我","读","一本","书"]
},

{
type:"build-zh",
speak:"我写一封信",
question:"جمله چینی را بساز:",
text:"من یک نامه می‌نویسم",
words:["我","写","一封","信"],
answer:["我","写","一封","信"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我吃面包",
question:"ترجمه را بساز:",
text:"我吃面包",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"她晚上睡觉",
question:"ترجمه را بساز:",
text:"她晚上睡觉",
words:["می‌خوابد","شب","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"他走路去学校",
question:"ترجمه را بساز:",
text:"他走路去学校",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"我读一本书",
question:"ترجمه را بساز:",
text:"我读一本书",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"我写一封信",
question:"ترجمه را بساز:",
text:"我写一封信",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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