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
question:"衬衫 (chènshān) کدام است؟",
speak:"衬衫",
options:[
{text:"裤子 (kùzi)",image:"../../media/clothes/pants.webp"},
{text:"衬衫 (chènshān)",image:"../../media/clothes/shirt.webp"},
{text:"帽子 (màozi)",image:"../../media/clothes/hat.webp"},
{text:"裙子 (qúnzi)",image:"../../media/clothes/dress.webp"}
],
answer:"衬衫 (chènshān)"
},

{
type:"image",
question:"裤子 (kùzi) کدام است؟",
speak:"裤子",
options:[
{text:"裙子 (qúnzi)",image:"../../media/clothes/dress.webp"},
{text:"裤子 (kùzi)",image:"../../media/clothes/pants.webp"},
{text:"鞋子 (xiézi)",image:"../../media/clothes/shoes.webp"},
{text:"衬衫 (chènshān)",image:"../../media/clothes/shirt.webp"}
],
answer:"裤子 (kùzi)"
},

{
type:"image",
question:"鞋子 (xiézi) کدام است؟",
speak:"鞋子",
options:[
{text:"衬衫 (chènshān)",image:"../../media/clothes/shirt.webp"},
{text:"鞋子 (xiézi)",image:"../../media/clothes/shoes.webp"},
{text:"帽子 (màozi)",image:"../../media/clothes/hat.webp"},
{text:"裤子 (kùzi)",image:"../../media/clothes/pants.webp"}
],
answer:"鞋子 (xiézi)"
},

{
type:"image",
question:"帽子 (màozi) کدام است؟",
speak:"帽子",
options:[
{text:"鞋子 (xiézi)",image:"../../media/clothes/shoes.webp"},
{text:"裤子 (kùzi)",image:"../../media/clothes/pants.webp"},
{text:"帽子 (màozi)",image:"../../media/clothes/hat.webp"},
{text:"衬衫 (chènshān)",image:"../../media/clothes/shirt.webp"}
],
answer:"帽子 (màozi)"
},

{
type:"image",
question:"裙子 (qúnzi) کدام است؟",
speak:"裙子",
options:[
{text:"帽子 (màozi)",image:"../../media/clothes/hat.webp"},
{text:"衬衫 (chènshān)",image:"../../media/clothes/shirt.webp"},
{text:"裤子 (kùzi)",image:"../../media/clothes/pants.webp"},
{text:"裙子 (qúnzi)",image:"../../media/clothes/dress.webp"}
],
answer:"裙子 (qúnzi)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["裤子 (kùzi)","衬衫 (chènshān)","帽子 (màozi)","裙子 (qúnzi)"],
answer:"衬衫 (chènshān)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["裙子 (qúnzi)","裤子 (kùzi)","鞋子 (xiézi)","衬衫 (chènshān)"],
answer:"裤子 (kùzi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["衬衫 (chènshān)","鞋子 (xiézi)","帽子 (màozi)","裤子 (kùzi)"],
answer:"鞋子 (xiézi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["鞋子 (xiézi)","裤子 (kùzi)","帽子 (màozi)","衬衫 (chènshān)"],
answer:"帽子 (màozi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["帽子 (màozi)","衬衫 (chènshān)","裤子 (kùzi)","裙子 (qúnzi)"],
answer:"裙子 (qúnzi)"
},

/* AUDIO */

{
type:"audio",
speak:"衬衫",
question:"کدام کلمه را شنیدی؟",
options:["裤子 (kùzi)","衬衫 (chènshān)","帽子 (màozi)","裙子 (qúnzi)"],
answer:"衬衫 (chènshān)"
},

{
type:"audio",
speak:"裤子",
question:"کدام کلمه را شنیدی؟",
options:["裙子 (qúnzi)","裤子 (kùzi)","鞋子 (xiézi)","衬衫 (chènshān)"],
answer:"裤子 (kùzi)"
},

{
type:"audio",
speak:"鞋子",
question:"کدام کلمه را شنیدی؟",
options:["衬衫 (chènshān)","鞋子 (xiézi)","帽子 (màozi)","裤子 (kùzi)"],
answer:"鞋子 (xiézi)"
},

{
type:"audio",
speak:"帽子",
question:"کدام کلمه را شنیدی؟",
options:["鞋子 (xiézi)","裤子 (kùzi)","帽子 (màozi)","衬衫 (chènshān)"],
answer:"帽子 (màozi)"
},

{
type:"audio",
speak:"裙子",
question:"کدام کلمه را شنیدی؟",
options:["帽子 (màozi)","衬衫 (chènshān)","裤子 (kùzi)","裙子 (qúnzi)"],
answer:"裙子 (qúnzi)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"这是衬衫",
question:"جمله چینی را بساز:",
text:"این یک پیراهن است",
words:["这是","衬衫"],
answer:["这是","衬衫"]
},

{
type:"build-zh",
speak:"这是帽子",
question:"جمله چینی را بساز:",
text:"این یک کلاه است",
words:["这是","帽子"],
answer:["这是","帽子"]
},

{
type:"build-zh",
speak:"这些是鞋子",
question:"جمله چینی را بساز:",
text:"این کفش‌ها هستند",
words:["这些","是","鞋子"],
answer:["这些","是","鞋子"]
},

{
type:"build-zh",
speak:"这些是裤子",
question:"جمله چینی را بساز:",
text:"این شلوارها هستند",
words:["这些","是","裤子"],
answer:["这些","是","裤子"]
},

{
type:"build-zh",
speak:"这是裙子",
question:"جمله چینی را بساز:",
text:"این یک لباس است",
words:["这是","裙子"],
answer:["这是","裙子"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"这是衬衫",
question:"ترجمه را بساز:",
text:"这是衬衫",
words:["است","پیراهن","این"],
answer:["این","پیراهن","است"]
},

{
type:"build-fa",
speak:"这是帽子",
question:"ترجمه را بساز:",
text:"这是帽子",
words:["است","کلاه","این"],
answer:["این","کلاه","است"]
},

{
type:"build-fa",
speak:"这些是鞋子",
question:"ترجمه را بساز:",
text:"这些是鞋子",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"这些是裤子",
question:"ترجمه را بساز:",
text:"这些是裤子",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"这是裙子",
question:"ترجمه را بساز:",
text:"这是裙子",
words:["است","لباس","این"],
answer:["این","لباس","است"]
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