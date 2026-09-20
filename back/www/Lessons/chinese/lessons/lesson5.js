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
question:"面包 (miànbāo) کدام است؟",
speak:"面包",
options:[
{text:"米饭 (mǐfàn)",image:"../../media/food/rice.webp"},
{text:"面包 (miànbāo)",image:"../../media/food/bread.webp"},
{text:"肉 (ròu)",image:"../../media/food/meat.webp"},
{text:"鸡蛋 (jīdàn)",image:"../../media/food/egg.webp"}
],
answer:"面包 (miànbāo)"
},

{
type:"image",
question:"米饭 (mǐfàn) کدام است؟",
speak:"米饭",
options:[
{text:"鸡蛋 (jīdàn)",image:"../../media/food/egg.webp"},
{text:"米饭 (mǐfàn)",image:"../../media/food/rice.webp"},
{text:"牛奶 (niúnǎi)",image:"../../media/food/milk.webp"},
{text:"面包 (miànbāo)",image:"../../media/food/bread.webp"}
],
answer:"米饭 (mǐfàn)"
},

{
type:"image",
question:"肉 (ròu) کدام است؟",
speak:"肉",
options:[
{text:"面包 (miànbāo)",image:"../../media/food/bread.webp"},
{text:"肉 (ròu)",image:"../../media/food/meat.webp"},
{text:"牛奶 (niúnǎi)",image:"../../media/food/milk.webp"},
{text:"米饭 (mǐfàn)",image:"../../media/food/rice.webp"}
],
answer:"肉 (ròu)"
},

{
type:"image",
question:"鸡蛋 (jīdàn) کدام است؟",
speak:"鸡蛋",
options:[
{text:"肉 (ròu)",image:"../../media/food/meat.webp"},
{text:"米饭 (mǐfàn)",image:"../../media/food/rice.webp"},
{text:"鸡蛋 (jīdàn)",image:"../../media/food/egg.webp"},
{text:"面包 (miànbāo)",image:"../../media/food/bread.webp"}
],
answer:"鸡蛋 (jīdàn)"
},

{
type:"image",
question:"牛奶 (niúnǎi) کدام است؟",
speak:"牛奶",
options:[
{text:"鸡蛋 (jīdàn)",image:"../../media/food/egg.webp"},
{text:"面包 (miànbāo)",image:"../../media/food/bread.webp"},
{text:"米饭 (mǐfàn)",image:"../../media/food/rice.webp"},
{text:"牛奶 (niúnǎi)",image:"../../media/food/milk.webp"}
],
answer:"牛奶 (niúnǎi)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["米饭 (mǐfàn)","面包 (miànbāo)","肉 (ròu)","鸡蛋 (jīdàn)"],
answer:"面包 (miànbāo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["鸡蛋 (jīdàn)","米饭 (mǐfàn)","牛奶 (niúnǎi)","面包 (miànbāo)"],
answer:"米饭 (mǐfàn)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["面包 (miànbāo)","肉 (ròu)","牛奶 (niúnǎi)","米饭 (mǐfàn)"],
answer:"肉 (ròu)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["肉 (ròu)","米饭 (mǐfàn)","鸡蛋 (jīdàn)","面包 (miànbāo)"],
answer:"鸡蛋 (jīdàn)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["鸡蛋 (jīdàn)","面包 (miànbāo)","米饭 (mǐfàn)","牛奶 (niúnǎi)"],
answer:"牛奶 (niúnǎi)"
},

/* AUDIO */

{
type:"audio",
speak:"面包",
question:"کدام کلمه را شنیدی؟",
options:["米饭 (mǐfàn)","面包 (miànbāo)","肉 (ròu)","鸡蛋 (jīdàn)"],
answer:"面包 (miànbāo)"
},

{
type:"audio",
speak:"米饭",
question:"کدام کلمه را شنیدی؟",
options:["鸡蛋 (jīdàn)","米饭 (mǐfàn)","牛奶 (niúnǎi)","面包 (miànbāo)"],
answer:"米饭 (mǐfàn)"
},

{
type:"audio",
speak:"肉",
question:"کدام کلمه را شنیدی؟",
options:["面包 (miànbāo)","肉 (ròu)","牛奶 (niúnǎi)","米饭 (mǐfàn)"],
answer:"肉 (ròu)"
},

{
type:"audio",
speak:"鸡蛋",
question:"کدام کلمه را شنیدی؟",
options:["肉 (ròu)","米饭 (mǐfàn)","鸡蛋 (jīdàn)","面包 (miànbāo)"],
answer:"鸡蛋 (jīdàn)"
},

{
type:"audio",
speak:"牛奶",
question:"کدام کلمه را شنیدی؟",
options:["鸡蛋 (jīdàn)","面包 (miànbāo)","米饭 (mǐfàn)","牛奶 (niúnǎi)"],
answer:"牛奶 (niúnǎi)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我喜欢面包",
question:"جمله چینی را بساز:",
text:"من نان دوست دارم",
words:["我","喜欢","面包"],
answer:["我","喜欢","面包"]
},

{
type:"build-zh",
speak:"她吃米饭",
question:"جمله چینی را بساز:",
text:"او برنج می‌خورد",
words:["她","吃","米饭"],
answer:["她","吃","米饭"]
},

{
type:"build-zh",
speak:"我有肉",
question:"جمله چینی را بساز:",
text:"من گوشت دارم",
words:["我","有","肉"],
answer:["我","有","肉"]
},

{
type:"build-zh",
speak:"他吃一个鸡蛋",
question:"جمله چینی را بساز:",
text:"او یک تخم‌مرغ می‌خورد",
words:["他","吃","一个","鸡蛋"],
answer:["他","吃","一个","鸡蛋"]
},

{
type:"build-zh",
speak:"我喝牛奶",
question:"جمله چینی را بساز:",
text:"من شیر می‌نوشم",
words:["我","喝","牛奶"],
answer:["我","喝","牛奶"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我喜欢面包",
question:"ترجمه را بساز:",
text:"我喜欢面包",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"她吃米饭",
question:"ترجمه را بساز:",
text:"她吃米饭",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"我有肉",
question:"ترجمه را بساز:",
text:"我有肉",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"他吃一个鸡蛋",
question:"ترجمه را بساز:",
text:"他吃一个鸡蛋",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"我喝牛奶",
question:"ترجمه را بساز:",
text:"我喝牛奶",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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