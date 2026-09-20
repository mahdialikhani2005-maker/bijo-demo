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
question:"シャツ (shatsu) کدام است؟",
speak:"シャツ",
options:[
{text:"ズボン (zubon)",image:"../../media/clothes/pants.webp"},
{text:"シャツ (shatsu)",image:"../../media/clothes/shirt.webp"},
{text:"帽子 (boushi)",image:"../../media/clothes/hat.webp"},
{text:"ドレス (doresu)",image:"../../media/clothes/dress.webp"}
],
answer:"シャツ (shatsu)"
},

{
type:"image",
question:"ズボン (zubon) کدام است؟",
speak:"ズボン",
options:[
{text:"ドレス (doresu)",image:"../../media/clothes/dress.webp"},
{text:"ズボン (zubon)",image:"../../media/clothes/pants.webp"},
{text:"靴 (kutsu)",image:"../../media/clothes/shoes.webp"},
{text:"シャツ (shatsu)",image:"../../media/clothes/shirt.webp"}
],
answer:"ズボン (zubon)"
},

{
type:"image",
question:"靴 (kutsu) کدام است؟",
speak:"靴",
options:[
{text:"シャツ (shatsu)",image:"../../media/clothes/shirt.webp"},
{text:"靴 (kutsu)",image:"../../media/clothes/shoes.webp"},
{text:"帽子 (boushi)",image:"../../media/clothes/hat.webp"},
{text:"ズボン (zubon)",image:"../../media/clothes/pants.webp"}
],
answer:"靴 (kutsu)"
},

{
type:"image",
question:"帽子 (boushi) کدام است؟",
speak:"帽子",
options:[
{text:"靴 (kutsu)",image:"../../media/clothes/shoes.webp"},
{text:"ズボン (zubon)",image:"../../media/clothes/pants.webp"},
{text:"帽子 (boushi)",image:"../../media/clothes/hat.webp"},
{text:"シャツ (shatsu)",image:"../../media/clothes/shirt.webp"}
],
answer:"帽子 (boushi)"
},

{
type:"image",
question:"ドレス (doresu) کدام است؟",
speak:"ドレス",
options:[
{text:"帽子 (boushi)",image:"../../media/clothes/hat.webp"},
{text:"シャツ (shatsu)",image:"../../media/clothes/shirt.webp"},
{text:"ズボン (zubon)",image:"../../media/clothes/pants.webp"},
{text:"ドレス (doresu)",image:"../../media/clothes/dress.webp"}
],
answer:"ドレス (doresu)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["ズボン","シャツ","帽子","ドレス"],
answer:"シャツ"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["ドレス","ズボン","靴","シャツ"],
answer:"ズボン"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["シャツ","靴","帽子","ズボン"],
answer:"靴"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["靴","ズボン","帽子","シャツ"],
answer:"帽子"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["帽子","シャツ","ズボン","ドレス"],
answer:"ドレス"
},

/* AUDIO */

{
type:"audio",
speak:"シャツ",
question:"کدام کلمه را شنیدی؟",
options:["ズボン","シャツ","帽子","ドレス"],
answer:"シャツ"
},

{
type:"audio",
speak:"ズボン",
question:"کدام کلمه را شنیدی؟",
options:["ドレス","ズボン","靴","シャツ"],
answer:"ズボン"
},

{
type:"audio",
speak:"靴",
question:"کدام کلمه را شنیدی؟",
options:["シャツ","靴","帽子","ズボン"],
answer:"靴"
},

{
type:"audio",
speak:"帽子",
question:"کدام کلمه را شنیدی؟",
options:["靴","ズボン","帽子","シャツ"],
answer:"帽子"
},

{
type:"audio",
speak:"ドレス",
question:"کدام کلمه را شنیدی؟",
options:["帽子","シャツ","ズボン","ドレス"],
answer:"ドレス"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"これはシャツです",
question:"جمله ژاپنی را بساز:",
text:"این یک پیراهن است",
words:["これ","は","シャツ","です"],
answer:["これ","は","シャツ","です"]
},

{
type:"build-jp",
speak:"これは帽子です",
question:"جمله ژاپنی را بساز:",
text:"این یک کلاه است",
words:["これ","は","帽子","です"],
answer:["これ","は","帽子","です"]
},

{
type:"build-jp",
speak:"これらは靴です",
question:"جمله ژاپنی را بساز:",
text:"این کفش‌ها هستند",
words:["これら","は","靴","です"],
answer:["これら","は","靴","です"]
},

{
type:"build-jp",
speak:"これらはズボンです",
question:"جمله ژاپنی را بساز:",
text:"این شلوارها هستند",
words:["これら","は","ズボン","です"],
answer:["これら","は","ズボン","です"]
},

{
type:"build-jp",
speak:"これはドレスです",
question:"جمله ژاپنی را بساز:",
text:"این یک لباس است",
words:["これ","は","ドレス","です"],
answer:["これ","は","ドレス","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"これはシャツです",
question:"ترجمه را بساز:",
text:"これはシャツです",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"これは帽子です",
question:"ترجمه را بساز:",
text:"これは帽子です",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"これらは靴です",
question:"ترجمه را بساز:",
text:"これらは靴です",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"これらはズボンです",
question:"ترجمه را بساز:",
text:"これらはズボンです",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"これはドレスです",
question:"ترجمه را بساز:",
text:"これはドレスです",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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