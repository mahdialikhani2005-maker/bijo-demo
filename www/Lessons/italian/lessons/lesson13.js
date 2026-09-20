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
question:"oggi کدام است؟",
speak:"oggi",
options:[
{text:"domani",image:"../../media/time/tomorrow.webp"},
{text:"oggi",image:"../../media/time/today.webp"},
{text:"ieri",image:"../../media/time/yesterday.webp"},
{text:"mattina",image:"../../media/time/morning.webp"}
],
answer:"oggi"
},

{
type:"image",
question:"domani کدام است؟",
speak:"domani",
options:[
{text:"notte",image:"../../media/time/night.webp"},
{text:"domani",image:"../../media/time/tomorrow.webp"},
{text:"oggi",image:"../../media/time/today.webp"},
{text:"ieri",image:"../../media/time/yesterday.webp"}
],
answer:"domani"
},

{
type:"image",
question:"ieri کدام است؟",
speak:"ieri",
options:[
{text:"oggi",image:"../../media/time/today.webp"},
{text:"ieri",image:"../../media/time/yesterday.webp"},
{text:"notte",image:"../../media/time/night.webp"},
{text:"domani",image:"../../media/time/tomorrow.webp"}
],
answer:"ieri"
},

{
type:"image",
question:"mattina کدام است؟",
speak:"mattina",
options:[
{text:"ieri",image:"../../media/time/yesterday.webp"},
{text:"domani",image:"../../media/time/tomorrow.webp"},
{text:"mattina",image:"../../media/time/morning.webp"},
{text:"oggi",image:"../../media/time/today.webp"}
],
answer:"mattina"
},

{
type:"image",
question:"notte کدام است؟",
speak:"notte",
options:[
{text:"mattina",image:"../../media/time/morning.webp"},
{text:"oggi",image:"../../media/time/today.webp"},
{text:"domani",image:"../../media/time/tomorrow.webp"},
{text:"notte",image:"../../media/time/night.webp"}
],
answer:"notte"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["domani","oggi","ieri","mattina"],
answer:"oggi"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["notte","domani","oggi","ieri"],
answer:"domani"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["oggi","ieri","notte","domani"],
answer:"ieri"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["ieri","domani","mattina","oggi"],
answer:"mattina"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["mattina","oggi","domani","notte"],
answer:"notte"
},

/* AUDIO */

{
type:"audio",
speak:"oggi",
question:"کدام کلمه را شنیدی؟",
options:["domani","oggi","ieri","mattina"],
answer:"oggi"
},

{
type:"audio",
speak:"domani",
question:"کدام کلمه را شنیدی؟",
options:["notte","domani","oggi","ieri"],
answer:"domani"
},

{
type:"audio",
speak:"ieri",
question:"کدام کلمه را شنیدی؟",
options:["oggi","ieri","notte","domani"],
answer:"ieri"
},

{
type:"audio",
speak:"mattina",
question:"کدام کلمه را شنیدی؟",
options:["ieri","domani","mattina","oggi"],
answer:"mattina"
},

{
type:"audio",
speak:"notte",
question:"کدام کلمه را شنیدی؟",
options:["mattina","oggi","domani","notte"],
answer:"notte"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Oggi fa caldo",
question:"جمله ایتالیایی را بساز:",
text:"امروز هوا گرم است",
words:["Oggi","fa","caldo"],
answer:["Oggi","fa","caldo"]
},

{
type:"build-it",
speak:"Domani fa freddo",
question:"جمله ایتالیایی را بساز:",
text:"فردا هوا سرد است",
words:["Domani","fa","freddo"],
answer:["Domani","fa","freddo"]
},

{
type:"build-it",
speak:"Ieri c'era il sole",
question:"جمله ایتالیایی را بساز:",
text:"دیروز هوا آفتابی بود",
words:["Ieri","c'era","il","sole"],
answer:["Ieri","c'era","il","sole"]
},

{
type:"build-it",
speak:"Buongiorno",
question:"جمله ایتالیایی را بساز:",
text:"صبح بخیر",
words:["Buongiorno"],
answer:["Buongiorno"]
},

{
type:"build-it",
speak:"Buonanotte",
question:"جمله ایتالیایی را بساز:",
text:"شب بخیر",
words:["Buonanotte"],
answer:["Buonanotte"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Oggi fa caldo",
question:"ترجمه را بساز:",
text:"Oggi fa caldo",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Domani fa freddo",
question:"ترجمه را بساز:",
text:"Domani fa freddo",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Ieri c'era il sole",
question:"ترجمه را بساز:",
text:"Ieri c'era il sole",
words:["بود","آفتابی","دیروز","هوا"],
answer:["دیروز","هوا","آفتابی","بود"]
},

{
type:"build-fa",
speak:"Buongiorno",
question:"ترجمه را بساز:",
text:"Buongiorno",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Buonanotte",
question:"ترجمه را بساز:",
text:"Buonanotte",
words:["بخیر","شب"],
answer:["شب","بخیر"]
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