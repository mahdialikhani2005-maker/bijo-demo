let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "es-ES",
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
  utter.lang = "es-ES";
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

/* IMAGE - افعال */

{
type:"image",
question:"Comer کدام است؟",
speak:"comer",
options:[
{text:"dormir",image:"../../media/actions/sleep.webp"},
{text:"comer",image:"../../media/actions/eat.webp"},
{text:"caminar",image:"../../media/actions/walk.webp"},
{text:"leer",image:"../../media/actions/read.webp"}
],
answer:"comer"
},

{
type:"image",
question:"Dormir کدام است؟",
speak:"dormir",
options:[
{text:"escribir",image:"../../media/actions/write.webp"},
{text:"dormir",image:"../../media/actions/sleep.webp"},
{text:"comer",image:"../../media/actions/eat.webp"},
{text:"caminar",image:"../../media/actions/walk.webp"}
],
answer:"dormir"
},

{
type:"image",
question:"Caminar کدام است؟",
speak:"caminar",
options:[
{text:"comer",image:"../../media/actions/eat.webp"},
{text:"caminar",image:"../../media/actions/walk.webp"},
{text:"escribir",image:"../../media/actions/write.webp"},
{text:"dormir",image:"../../media/actions/sleep.webp"}
],
answer:"caminar"
},

{
type:"image",
question:"Leer کدام است؟",
speak:"leer",
options:[
{text:"caminar",image:"../../media/actions/walk.webp"},
{text:"dormir",image:"../../media/actions/sleep.webp"},
{text:"leer",image:"../../media/actions/read.webp"},
{text:"comer",image:"../../media/actions/eat.webp"}
],
answer:"leer"
},

{
type:"image",
question:"Escribir کدام است؟",
speak:"escribir",
options:[
{text:"leer",image:"../../media/actions/read.webp"},
{text:"comer",image:"../../media/actions/eat.webp"},
{text:"dormir",image:"../../media/actions/sleep.webp"},
{text:"escribir",image:"../../media/actions/write.webp"}
],
answer:"escribir"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["dormir","comer","caminar","leer"],
answer:"comer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["escribir","dormir","comer","caminar"],
answer:"dormir"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["comer","caminar","escribir","dormir"],
answer:"caminar"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["caminar","dormir","leer","comer"],
answer:"leer"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["leer","comer","dormir","escribir"],
answer:"escribir"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"comer",
question:"کدام کلمه را شنیدی؟",
options:["dormir","comer","caminar","leer"],
answer:"comer"
},

{
type:"audio",
speak:"dormir",
question:"کدام کلمه را شنیدی؟",
options:["escribir","dormir","comer","caminar"],
answer:"dormir"
},

{
type:"audio",
speak:"caminar",
question:"کدام کلمه را شنیدی؟",
options:["comer","caminar","escribir","dormir"],
answer:"caminar"
},

{
type:"audio",
speak:"leer",
question:"کدام کلمه را شنیدی؟",
options:["caminar","dormir","leer","comer"],
answer:"leer"
},

{
type:"audio",
speak:"escribir",
question:"کدام کلمه را شنیدی؟",
options:["leer","comer","dormir","escribir"],
answer:"escribir"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Como pan",
question:"جمله اسپانیایی را بساز:",
text:"من نان می‌خورم",
words:["Como","pan"],
answer:["Como","pan"]
},

{
type:"build-es",
speak:"Ella duerme por la noche",
question:"جمله اسپانیایی را بساز:",
text:"او شب می‌خوابد",
words:["Ella","duerme","por","la","noche"],
answer:["Ella","duerme","por","la","noche"]
},

{
type:"build-es",
speak:"Él camina a la escuela",
question:"جمله اسپانیایی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["Él","camina","a","la","escuela"],
answer:["Él","camina","a","la","escuela"]
},

{
type:"build-es",
speak:"Leo un libro",
question:"جمله اسپانیایی را بساز:",
text:"من کتاب می‌خوانم",
words:["Leo","un","libro"],
answer:["Leo","un","libro"]
},

{
type:"build-es",
speak:"Escribo una carta",
question:"جمله اسپانیایی را بساز:",
text:"من نامه می‌نویسم",
words:["Escribo","una","carta"],
answer:["Escribo","una","carta"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Como pan",
question:"ترجمه را بساز:",
text:"Como pan",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Ella duerme por la noche",
question:"ترجمه را بساز:",
text:"Ella duerme por la noche",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"Él camina a la escuela",
question:"ترجمه را بساز:",
text:"Él camina a la escuela",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"Leo un libro",
question:"ترجمه را بساز:",
text:"Leo un libro",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"Escribo una carta",
question:"ترجمه را بساز:",
text:"Escribo una carta",
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

  // BUILD SPANISH / FA

  else if (q.type === "build-es" || q.type === "build-fa") {
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

  if (q.type === "build-es") {
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