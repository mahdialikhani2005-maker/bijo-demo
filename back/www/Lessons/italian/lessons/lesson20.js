let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "it-IT",
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
  utter.lang = "it-IT";
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
question:"chi کدام است؟",
speak:"chi",
options:[
{text:"che",image:"../../media/questions/what.webp"},
{text:"chi",image:"../../media/questions/who.webp"},
{text:"dove",image:"../../media/questions/where.webp"},
{text:"quando",image:"../../media/questions/when.webp"}
],
answer:"chi"
},

{
type:"image",
question:"che کدام است؟",
speak:"che",
options:[
{text:"perché",image:"../../media/questions/why.webp"},
{text:"che",image:"../../media/questions/what.webp"},
{text:"chi",image:"../../media/questions/who.webp"},
{text:"dove",image:"../../media/questions/where.webp"}
],
answer:"che"
},

{
type:"image",
question:"dove کدام است؟",
speak:"dove",
options:[
{text:"che",image:"../../media/questions/what.webp"},
{text:"dove",image:"../../media/questions/where.webp"},
{text:"perché",image:"../../media/questions/why.webp"},
{text:"chi",image:"../../media/questions/who.webp"}
],
answer:"dove"
},

{
type:"image",
question:"quando کدام است؟",
speak:"quando",
options:[
{text:"dove",image:"../../media/questions/where.webp"},
{text:"chi",image:"../../media/questions/who.webp"},
{text:"quando",image:"../../media/questions/when.webp"},
{text:"che",image:"../../media/questions/what.webp"}
],
answer:"quando"
},

{
type:"image",
question:"perché کدام است؟",
speak:"perché",
options:[
{text:"quando",image:"../../media/questions/when.webp"},
{text:"che",image:"../../media/questions/what.webp"},
{text:"chi",image:"../../media/questions/who.webp"},
{text:"perché",image:"../../media/questions/why.webp"}
],
answer:"perché"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["che","chi","dove","quando"],
answer:"chi"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["perché","che","chi","dove"],
answer:"che"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["che","dove","perché","chi"],
answer:"dove"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["dove","chi","quando","che"],
answer:"quando"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["quando","che","chi","perché"],
answer:"perché"
},

/* AUDIO */

{
type:"audio",
speak:"chi",
question:"کدام کلمه را شنیدی؟",
options:["che","chi","dove","quando"],
answer:"chi"
},

{
type:"audio",
speak:"che",
question:"کدام کلمه را شنیدی؟",
options:["perché","che","chi","dove"],
answer:"che"
},

{
type:"audio",
speak:"dove",
question:"کدام کلمه را شنیدی؟",
options:["che","dove","perché","chi"],
answer:"dove"
},

{
type:"audio",
speak:"quando",
question:"کدام کلمه را شنیدی؟",
options:["dove","chi","quando","che"],
answer:"quando"
},

{
type:"audio",
speak:"perché",
question:"کدام کلمه را شنیدی؟",
options:["quando","che","chi","perché"],
answer:"perché"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Chi è lei?",
question:"جمله ایتالیایی را بساز:",
text:"او کیست؟",
words:["Chi","è","lei"],
answer:["Chi","è","lei"]
},

{
type:"build-it",
speak:"Che cosa è questo?",
question:"جمله ایتالیایی را بساز:",
text:"این چیست؟",
words:["Che","cosa","è","questo"],
answer:["Che","cosa","è","questo"]
},

{
type:"build-it",
speak:"Dov'è la scuola?",
question:"جمله ایتالیایی را بساز:",
text:"مدرسه کجاست؟",
words:["Dove","è","la","scuola"],
answer:["Dove","è","la","scuola"]
},

{
type:"build-it",
speak:"Quando è il corso?",
question:"جمله ایتالیایی را بساز:",
text:"کلاس کی است؟",
words:["Quando","è","il","corso"],
answer:["Quando","è","il","corso"]
},

{
type:"build-it",
speak:"Perché sei felice?",
question:"جمله ایتالیایی را بساز:",
text:"چرا خوشحالی؟",
words:["Perché","sei","felice"],
answer:["Perché","sei","felice"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Chi è lei?",
question:"ترجمه را بساز:",
text:"Chi è lei?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"Che cosa è questo?",
question:"ترجمه را بساز:",
text:"Che cosa è questo?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"Dov'è la scuola?",
question:"ترجمه را بساز:",
text:"Dov'è la scuola?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"Quando è il corso?",
question:"ترجمه را بساز:",
text:"Quando è il corso?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"Perché sei felice?",
question:"ترجمه را بساز:",
text:"Perché sei felice?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی"]
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

  // BUILD ITALIAN / FA

  else if (q.type === "build-it" || q.type === "build-fa") {
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

  if (q.type === "build-it") {
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