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
question:"أكل کدام است؟",
speak:"أكل",
options:[
{text:"نام",image:"../../media/actions/sleep.webp"},
{text:"أكل",image:"../../media/actions/eat.webp"},
{text:"مشى",image:"../../media/actions/walk.webp"},
{text:"قرأ",image:"../../media/actions/read.webp"}
],
answer:"أكل"
},

{
type:"image",
question:"نام کدام است؟",
speak:"نام",
options:[
{text:"كتب",image:"../../media/actions/write.webp"},
{text:"نام",image:"../../media/actions/sleep.webp"},
{text:"أكل",image:"../../media/actions/eat.webp"},
{text:"مشى",image:"../../media/actions/walk.webp"}
],
answer:"نام"
},

{
type:"image",
question:"مشى کدام است؟",
speak:"مشى",
options:[
{text:"أكل",image:"../../media/actions/eat.webp"},
{text:"مشى",image:"../../media/actions/walk.webp"},
{text:"كتب",image:"../../media/actions/write.webp"},
{text:"نام",image:"../../media/actions/sleep.webp"}
],
answer:"مشى"
},

{
type:"image",
question:"قرأ کدام است؟",
speak:"قرأ",
options:[
{text:"مشى",image:"../../media/actions/walk.webp"},
{text:"نام",image:"../../media/actions/sleep.webp"},
{text:"قرأ",image:"../../media/actions/read.webp"},
{text:"أكل",image:"../../media/actions/eat.webp"}
],
answer:"قرأ"
},

{
type:"image",
question:"كتب کدام است؟",
speak:"كتب",
options:[
{text:"قرأ",image:"../../media/actions/read.webp"},
{text:"أكل",image:"../../media/actions/eat.webp"},
{text:"نام",image:"../../media/actions/sleep.webp"},
{text:"كتب",image:"../../media/actions/write.webp"}
],
answer:"كتب"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["نام","أكل","مشى","قرأ"],
answer:"أكل"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["كتب","نام","أكل","مشى"],
answer:"نام"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["أكل","مشى","كتب","نام"],
answer:"مشى"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["مشى","نام","قرأ","أكل"],
answer:"قرأ"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["قرأ","أكل","نام","كتب"],
answer:"كتب"
},

/* AUDIO */

{
type:"audio",
speak:"أكل",
question:"کدام کلمه را شنیدی؟",
options:["نام","أكل","مشى","قرأ"],
answer:"أكل"
},

{
type:"audio",
speak:"نام",
question:"کدام کلمه را شنیدی؟",
options:["كتب","نام","أكل","مشى"],
answer:"نام"
},

{
type:"audio",
speak:"مشى",
question:"کدام کلمه را شنیدی؟",
options:["أكل","مشى","كتب","نام"],
answer:"مشى"
},

{
type:"audio",
speak:"قرأ",
question:"کدام کلمه را شنیدی؟",
options:["مشى","نام","قرأ","أكل"],
answer:"قرأ"
},

{
type:"audio",
speak:"كتب",
question:"کدام کلمه را شنیدی؟",
options:["قرأ","أكل","نام","كتب"],
answer:"كتب"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"آكل الخبز",
question:"جمله عربی را بساز:",
text:"من نان می‌خورم",
words:["آكل","الخبز"],
answer:["آكل","الخبز"]
},

{
type:"build-ar",
speak:"تنام في الليل",
question:"جمله عربی را بساز:",
text:"او شب می‌خوابد",
words:["تنام","في","الليل"],
answer:["تنام","في","الليل"]
},

{
type:"build-ar",
speak:"يمشي إلى المدرسة",
question:"جمله عربی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["يمشي","إلى","المدرسة"],
answer:["يمشي","إلى","المدرسة"]
},

{
type:"build-ar",
speak:"أقرأ كتاباً",
question:"جمله عربی را بساز:",
text:"من یک کتاب می‌خوانم",
words:["أقرأ","كتاباً"],
answer:["أقرأ","كتاباً"]
},

{
type:"build-ar",
speak:"أكتب رسالة",
question:"جمله عربی را بساز:",
text:"من یک نامه می‌نویسم",
words:["أكتب","رسالة"],
answer:["أكتب","رسالة"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"آكل الخبز",
question:"ترجمه را بساز:",
text:"آكل الخبز",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"تنام في الليل",
question:"ترجمه را بساز:",
text:"تنام في الليل",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"يمشي إلى المدرسة",
question:"ترجمه را بساز:",
text:"يمشي إلى المدرسة",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"أقرأ كتاباً",
question:"ترجمه را بساز:",
text:"أقرأ كتاباً",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"أكتب رسالة",
question:"ترجمه را بساز:",
text:"أكتب رسالة",
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