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
question:"l'uomo کدام است؟",
speak:"l'uomo",
options:[
{text:"la donna",image:"../../media/people/woman.webp"},
{text:"l'uomo",image:"../../media/people/man.webp"},
{text:"il ragazzo",image:"../../media/people/boy.webp"},
{text:"la ragazza",image:"../../media/people/girl.webp"}
],
answer:"l'uomo"
},

{
type:"image",
question:"la donna کدام است؟",
speak:"la donna",
options:[
{text:"la ragazza",image:"../../media/people/girl.webp"},
{text:"la donna",image:"../../media/people/woman.webp"},
{text:"il ragazzo",image:"../../media/people/boy.webp"},
{text:"l'uomo",image:"../../media/people/man.webp"}
],
answer:"la donna"
},

{
type:"image",
question:"il ragazzo کدام است؟",
speak:"il ragazzo",
options:[
{text:"l'uomo",image:"../../media/people/man.webp"},
{text:"il ragazzo",image:"../../media/people/boy.webp"},
{text:"il bambino",image:"../../media/people/baby.webp"},
{text:"la ragazza",image:"../../media/people/girl.webp"}
],
answer:"il ragazzo"
},

{
type:"image",
question:"la ragazza کدام است؟",
speak:"la ragazza",
options:[
{text:"il ragazzo",image:"../../media/people/boy.webp"},
{text:"l'uomo",image:"../../media/people/man.webp"},
{text:"la ragazza",image:"../../media/people/girl.webp"},
{text:"il bambino",image:"../../media/people/baby.webp"}
],
answer:"la ragazza"
},

{
type:"image",
question:"il bambino کدام است؟",
speak:"il bambino",
options:[
{text:"la ragazza",image:"../../media/people/girl.webp"},
{text:"il ragazzo",image:"../../media/people/boy.webp"},
{text:"l'uomo",image:"../../media/people/man.webp"},
{text:"il bambino",image:"../../media/people/baby.webp"}
],
answer:"il bambino"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["il ragazzo","l'uomo","la donna","la ragazza"],
answer:"l'uomo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["la donna","la ragazza","il bambino","l'uomo"],
answer:"la donna"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["il ragazzo","l'uomo","il bambino","la ragazza"],
answer:"il ragazzo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["la ragazza","la donna","il ragazzo","il bambino"],
answer:"la ragazza"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["il bambino","il ragazzo","la ragazza","l'uomo"],
answer:"il bambino"
},

/* AUDIO */

{
type:"audio",
speak:"l'uomo",
question:"کدام کلمه را شنیدی؟",
options:["l'uomo","il ragazzo","la donna","la ragazza"],
answer:"l'uomo"
},

{
type:"audio",
speak:"la donna",
question:"کدام کلمه را شنیدی؟",
options:["la ragazza","la donna","il ragazzo","l'uomo"],
answer:"la donna"
},

{
type:"audio",
speak:"il ragazzo",
question:"کدام کلمه را شنیدی؟",
options:["il ragazzo","l'uomo","il bambino","la ragazza"],
answer:"il ragazzo"
},

{
type:"audio",
speak:"la ragazza",
question:"کدام کلمه را شنیدی؟",
options:["il ragazzo","la donna","la ragazza","il bambino"],
answer:"la ragazza"
},

{
type:"audio",
speak:"il bambino",
question:"کدام کلمه را شنیدی؟",
options:["il bambino","il ragazzo","l'uomo","la ragazza"],
answer:"il bambino"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Questo è un uomo",
question:"جمله ایتالیایی را بساز:",
text:"این یک مرد است",
words:["Questo","è","un","uomo"],
answer:["Questo","è","un","uomo"]
},

{
type:"build-it",
speak:"Questa è una donna",
question:"جمله ایتالیایی را بساز:",
text:"این یک زن است",
words:["Questa","è","una","donna"],
answer:["Questa","è","una","donna"]
},

{
type:"build-it",
speak:"Questo è un ragazzo",
question:"جمله ایتالیایی را بساز:",
text:"این یک پسر است",
words:["Questo","è","un","ragazzo"],
answer:["Questo","è","un","ragazzo"]
},

{
type:"build-it",
speak:"Questa è una ragazza",
question:"جمله ایتالیایی را بساز:",
text:"این یک دختر است",
words:["Questa","è","una","ragazza"],
answer:["Questa","è","una","ragazza"]
},

{
type:"build-it",
speak:"Il bambino è piccolo",
question:"جمله ایتالیایی را بساز:",
text:"نوزاد کوچک است",
words:["Il","bambino","è","piccolo"],
answer:["Il","bambino","è","piccolo"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Questo è un uomo",
question:"ترجمه را بساز:",
text:"Questo è un uomo",
words:["است","مرد","یک","این"],
answer:["این","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Questa è una donna",
question:"ترجمه را بساز:",
text:"Questa è una donna",
words:["یک","است","زن","این"],
answer:["این","یک","زن","است"]
},

{
type:"build-fa",
speak:"Questo è un ragazzo",
question:"ترجمه را بساز:",
text:"Questo è un ragazzo",
words:["است","پسر","یک","این"],
answer:["این","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Questa è una ragazza",
question:"ترجمه را بساز:",
text:"Questa è una ragazza",
words:["است","دختر","یک","این"],
answer:["این","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Il bambino è piccolo",
question:"ترجمه را بساز:",
text:"Il bambino è piccolo",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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