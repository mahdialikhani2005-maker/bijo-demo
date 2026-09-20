let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
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
  utter.lang = "ar-SA";
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
question:"قميص کدام است؟",
speak:"قميص",
options:[
{text:"سروال",image:"../../media/clothes/pants.webp"},
{text:"قميص",image:"../../media/clothes/shirt.webp"},
{text:"قبعة",image:"../../media/clothes/hat.webp"},
{text:"فستان",image:"../../media/clothes/dress.webp"}
],
answer:"قميص"
},

{
type:"image",
question:"سروال کدام است؟",
speak:"سروال",
options:[
{text:"فستان",image:"../../media/clothes/dress.webp"},
{text:"سروال",image:"../../media/clothes/pants.webp"},
{text:"حذاء",image:"../../media/clothes/shoes.webp"},
{text:"قميص",image:"../../media/clothes/shirt.webp"}
],
answer:"سروال"
},

{
type:"image",
question:"حذاء کدام است؟",
speak:"حذاء",
options:[
{text:"قميص",image:"../../media/clothes/shirt.webp"},
{text:"حذاء",image:"../../media/clothes/shoes.webp"},
{text:"قبعة",image:"../../media/clothes/hat.webp"},
{text:"سروال",image:"../../media/clothes/pants.webp"}
],
answer:"حذاء"
},

{
type:"image",
question:"قبعة کدام است؟",
speak:"قبعة",
options:[
{text:"حذاء",image:"../../media/clothes/shoes.webp"},
{text:"سروال",image:"../../media/clothes/pants.webp"},
{text:"قبعة",image:"../../media/clothes/hat.webp"},
{text:"قميص",image:"../../media/clothes/shirt.webp"}
],
answer:"قبعة"
},

{
type:"image",
question:"فستان کدام است؟",
speak:"فستان",
options:[
{text:"قبعة",image:"../../media/clothes/hat.webp"},
{text:"قميص",image:"../../media/clothes/shirt.webp"},
{text:"سروال",image:"../../media/clothes/pants.webp"},
{text:"فستان",image:"../../media/clothes/dress.webp"}
],
answer:"فستان"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["سروال","قميص","قبعة","فستان"],
answer:"قميص"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["فستان","سروال","حذاء","قميص"],
answer:"سروال"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["قميص","حذاء","قبعة","سروال"],
answer:"حذاء"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["حذاء","سروال","قبعة","قميص"],
answer:"قبعة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["قبعة","قميص","سروال","فستان"],
answer:"فستان"
},

/* AUDIO */

{
type:"audio",
speak:"قميص",
question:"کدام کلمه را شنیدی؟",
options:["سروال","قميص","قبعة","فستان"],
answer:"قميص"
},

{
type:"audio",
speak:"سروال",
question:"کدام کلمه را شنیدی؟",
options:["فستان","سروال","حذاء","قميص"],
answer:"سروال"
},

{
type:"audio",
speak:"حذاء",
question:"کدام کلمه را شنیدی؟",
options:["قميص","حذاء","قبعة","سروال"],
answer:"حذاء"
},

{
type:"audio",
speak:"قبعة",
question:"کدام کلمه را شنیدی؟",
options:["حذاء","سروال","قبعة","قميص"],
answer:"قبعة"
},

{
type:"audio",
speak:"فستان",
question:"کدام کلمه را شنیدی؟",
options:["قبعة","قميص","سروال","فستان"],
answer:"فستان"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"هذا قميص",
question:"جمله عربی را بساز:",
text:"این یک پیراهن است",
words:["هذا","قميص"],
answer:["هذا","قميص"]
},

{
type:"build-ar",
speak:"هذه قبعة",
question:"جمله عربی را بساز:",
text:"این یک کلاه است",
words:["هذه","قبعة"],
answer:["هذه","قبعة"]
},

{
type:"build-ar",
speak:"هذه أحذية",
question:"جمله عربی را بساز:",
text:"این کفش‌ها هستند",
words:["هذه","أحذية"],
answer:["هذه","أحذية"]
},

{
type:"build-ar",
speak:"هذه سراويل",
question:"جمله عربی را بساز:",
text:"این شلوارها هستند",
words:["هذه","سراويل"],
answer:["هذه","سراويل"]
},

{
type:"build-ar",
speak:"هذا فستان",
question:"جمله عربی را بساز:",
text:"این یک لباس است",
words:["هذا","فستان"],
answer:["هذا","فستان"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"هذا قميص",
question:"ترجمه را بساز:",
text:"هذا قميص",
words:["است","پیراهن","این"],
answer:["این","پیراهن","است"]
},

{
type:"build-fa",
speak:"هذه قبعة",
question:"ترجمه را بساز:",
text:"هذه قبعة",
words:["است","کلاه","این"],
answer:["این","کلاه","است"]
},

{
type:"build-fa",
speak:"هذه أحذية",
question:"ترجمه را بساز:",
text:"هذه أحذية",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"هذه سراويل",
question:"ترجمه را بساز:",
text:"هذه سراويل",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"هذا فستان",
question:"ترجمه را بساز:",
text:"هذا فستان",
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

  // BUILD ARABIC / FA

  else if (q.type === "build-ar" || q.type === "build-fa") {
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

  if (q.type === "build-ar") {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
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

  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
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