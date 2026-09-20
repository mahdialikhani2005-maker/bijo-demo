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
question:"番茄 (fānqié) کدام است؟",
speak:"番茄",
options:[
{text:"土豆 (tǔdòu)",image:"../../media/vegetables/potato.webp"},
{text:"番茄 (fānqié)",image:"../../media/vegetables/tomato.webp"},
{text:"胡萝卜 (húluóbo)",image:"../../media/vegetables/carrot.webp"},
{text:"洋葱 (yángcōng)",image:"../../media/vegetables/onion.webp"}
],
answer:"番茄 (fānqié)"
},

{
type:"image",
question:"土豆 (tǔdòu) کدام است؟",
speak:"土豆",
options:[
{text:"洋葱 (yángcōng)",image:"../../media/vegetables/onion.webp"},
{text:"土豆 (tǔdòu)",image:"../../media/vegetables/potato.webp"},
{text:"黄瓜 (huángguā)",image:"../../media/vegetables/cucumber.webp"},
{text:"番茄 (fānqié)",image:"../../media/vegetables/tomato.webp"}
],
answer:"土豆 (tǔdòu)"
},

{
type:"image",
question:"胡萝卜 (húluóbo) کدام است؟",
speak:"胡萝卜",
options:[
{text:"番茄 (fānqié)",image:"../../media/vegetables/tomato.webp"},
{text:"胡萝卜 (húluóbo)",image:"../../media/vegetables/carrot.webp"},
{text:"黄瓜 (huángguā)",image:"../../media/vegetables/cucumber.webp"},
{text:"土豆 (tǔdòu)",image:"../../media/vegetables/potato.webp"}
],
answer:"胡萝卜 (húluóbo)"
},

{
type:"image",
question:"洋葱 (yángcōng) کدام است؟",
speak:"洋葱",
options:[
{text:"胡萝卜 (húluóbo)",image:"../../media/vegetables/carrot.webp"},
{text:"土豆 (tǔdòu)",image:"../../media/vegetables/potato.webp"},
{text:"洋葱 (yángcōng)",image:"../../media/vegetables/onion.webp"},
{text:"番茄 (fānqié)",image:"../../media/vegetables/tomato.webp"}
],
answer:"洋葱 (yángcōng)"
},

{
type:"image",
question:"黄瓜 (huángguā) کدام است؟",
speak:"黄瓜",
options:[
{text:"洋葱 (yángcōng)",image:"../../media/vegetables/onion.webp"},
{text:"番茄 (fānqié)",image:"../../media/vegetables/tomato.webp"},
{text:"土豆 (tǔdòu)",image:"../../media/vegetables/potato.webp"},
{text:"黄瓜 (huángguā)",image:"../../media/vegetables/cucumber.webp"}
],
answer:"黄瓜 (huángguā)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.webp",
options:["土豆 (tǔdòu)","番茄 (fānqié)","胡萝卜 (húluóbo)","洋葱 (yángcōng)"],
answer:"番茄 (fānqié)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.webp",
options:["洋葱 (yángcōng)","土豆 (tǔdòu)","黄瓜 (huángguā)","番茄 (fānqié)"],
answer:"土豆 (tǔdòu)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.webp",
options:["番茄 (fānqié)","胡萝卜 (húluóbo)","黄瓜 (huángguā)","土豆 (tǔdòu)"],
answer:"胡萝卜 (húluóbo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.webp",
options:["胡萝卜 (húluóbo)","土豆 (tǔdòu)","洋葱 (yángcōng)","番茄 (fānqié)"],
answer:"洋葱 (yángcōng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.webp",
options:["洋葱 (yángcōng)","番茄 (fānqié)","土豆 (tǔdòu)","黄瓜 (huángguā)"],
answer:"黄瓜 (huángguā)"
},

/* AUDIO */

{
type:"audio",
speak:"番茄",
question:"کدام کلمه را شنیدی؟",
options:["土豆 (tǔdòu)","番茄 (fānqié)","胡萝卜 (húluóbo)","洋葱 (yángcōng)"],
answer:"番茄 (fānqié)"
},

{
type:"audio",
speak:"土豆",
question:"کدام کلمه را شنیدی؟",
options:["洋葱 (yángcōng)","土豆 (tǔdòu)","黄瓜 (huángguā)","番茄 (fānqié)"],
answer:"土豆 (tǔdòu)"
},

{
type:"audio",
speak:"胡萝卜",
question:"کدام کلمه را شنیدی؟",
options:["番茄 (fānqié)","胡萝卜 (húluóbo)","黄瓜 (huángguā)","土豆 (tǔdòu)"],
answer:"胡萝卜 (húluóbo)"
},

{
type:"audio",
speak:"洋葱",
question:"کدام کلمه را شنیدی؟",
options:["胡萝卜 (húluóbo)","土豆 (tǔdòu)","洋葱 (yángcōng)","番茄 (fānqié)"],
answer:"洋葱 (yángcōng)"
},

{
type:"audio",
speak:"黄瓜",
question:"کدام کلمه را شنیدی؟",
options:["洋葱 (yángcōng)","番茄 (fānqié)","土豆 (tǔdòu)","黄瓜 (huángguā)"],
answer:"黄瓜 (huángguā)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我喜欢番茄",
question:"جمله چینی را بساز:",
text:"من گوجه‌فرنگی دوست دارم",
words:["我","喜欢","番茄"],
answer:["我","喜欢","番茄"]
},

{
type:"build-zh",
speak:"她吃一个土豆",
question:"جمله چینی را بساز:",
text:"او یک سیب‌زمینی می‌خورد",
words:["她","吃","一个","土豆"],
answer:["她","吃","一个","土豆"]
},

{
type:"build-zh",
speak:"这是一个胡萝卜",
question:"جمله چینی را بساز:",
text:"این یک هویج است",
words:["这","是","一个","胡萝卜"],
answer:["这","是","一个","胡萝卜"]
},

{
type:"build-zh",
speak:"我有一个洋葱",
question:"جمله چینی را بساز:",
text:"من یک پیاز دارم",
words:["我","有","一个","洋葱"],
answer:["我","有","一个","洋葱"]
},

{
type:"build-zh",
speak:"他吃一个黄瓜",
question:"جمله چینی را بساز:",
text:"او یک خیار می‌خورد",
words:["他","吃","一个","黄瓜"],
answer:["他","吃","一个","黄瓜"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我喜欢番茄",
question:"ترجمه را بساز:",
text:"我喜欢番茄",
words:["دارم","دوست","گوجه‌فرنگی","من"],
answer:["من","گوجه‌فرنگی","دوست","دارم"]
},

{
type:"build-fa",
speak:"她吃一个土豆",
question:"ترجمه را بساز:",
text:"她吃一个土豆",
words:["می‌خورد","سیب‌زمینی","یک","او"],
answer:["او","یک","سیب‌زمینی","می‌خورد"]
},

{
type:"build-fa",
speak:"这是一个胡萝卜",
question:"ترجمه را بساز:",
text:"这是一个胡萝卜",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"我有一个洋葱",
question:"ترجمه را بساز:",
text:"我有一个洋葱",
words:["دارم","پیاز","یک","من"],
answer:["من","یک","پیاز","دارم"]
},

{
type:"build-fa",
speak:"他吃一个黄瓜",
question:"ترجمه را بساز:",
text:"他吃一个黄瓜",
words:["می‌خورد","خیار","یک","او"],
answer:["او","یک","خیار","می‌خورد"]
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