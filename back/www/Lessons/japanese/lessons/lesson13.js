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
question:"今日 (kyou) کدام است؟",
speak:"今日",
options:[
{text:"明日 (ashita)",image:"../../media/time/tomorrow.webp"},
{text:"今日 (kyou)",image:"../../media/time/today.webp"},
{text:"昨日 (kinou)",image:"../../media/time/yesterday.webp"},
{text:"朝 (asa)",image:"../../media/time/morning.webp"}
],
answer:"今日 (kyou)"
},

{
type:"image",
question:"明日 (ashita) کدام است؟",
speak:"明日",
options:[
{text:"夜 (yoru)",image:"../../media/time/night.webp"},
{text:"明日 (ashita)",image:"../../media/time/tomorrow.webp"},
{text:"今日 (kyou)",image:"../../media/time/today.webp"},
{text:"昨日 (kinou)",image:"../../media/time/yesterday.webp"}
],
answer:"明日 (ashita)"
},

{
type:"image",
question:"昨日 (kinou) کدام است؟",
speak:"昨日",
options:[
{text:"今日 (kyou)",image:"../../media/time/today.webp"},
{text:"昨日 (kinou)",image:"../../media/time/yesterday.webp"},
{text:"夜 (yoru)",image:"../../media/time/night.webp"},
{text:"明日 (ashita)",image:"../../media/time/tomorrow.webp"}
],
answer:"昨日 (kinou)"
},

{
type:"image",
question:"朝 (asa) کدام است؟",
speak:"朝",
options:[
{text:"昨日 (kinou)",image:"../../media/time/yesterday.webp"},
{text:"明日 (ashita)",image:"../../media/time/tomorrow.webp"},
{text:"朝 (asa)",image:"../../media/time/morning.webp"},
{text:"今日 (kyou)",image:"../../media/time/today.webp"}
],
answer:"朝 (asa)"
},

{
type:"image",
question:"夜 (yoru) کدام است؟",
speak:"夜",
options:[
{text:"朝 (asa)",image:"../../media/time/morning.webp"},
{text:"今日 (kyou)",image:"../../media/time/today.webp"},
{text:"明日 (ashita)",image:"../../media/time/tomorrow.webp"},
{text:"夜 (yoru)",image:"../../media/time/night.webp"}
],
answer:"夜 (yoru)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.webp",
options:["明日","今日","昨日","朝"],
answer:"今日"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.webp",
options:["夜","明日","今日","昨日"],
answer:"明日"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.webp",
options:["今日","昨日","夜","明日"],
answer:"昨日"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.webp",
options:["昨日","明日","朝","今日"],
answer:"朝"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.webp",
options:["朝","今日","明日","夜"],
answer:"夜"
},

/* AUDIO */

{
type:"audio",
speak:"今日",
question:"کدام کلمه را شنیدی؟",
options:["明日","今日","昨日","朝"],
answer:"今日"
},

{
type:"audio",
speak:"明日",
question:"کدام کلمه را شنیدی؟",
options:["夜","明日","今日","昨日"],
answer:"明日"
},

{
type:"audio",
speak:"昨日",
question:"کدام کلمه را شنیدی؟",
options:["今日","昨日","夜","明日"],
answer:"昨日"
},

{
type:"audio",
speak:"朝",
question:"کدام کلمه را شنیدی؟",
options:["昨日","明日","朝","今日"],
answer:"朝"
},

{
type:"audio",
speak:"夜",
question:"کدام کلمه را شنیدی؟",
options:["朝","今日","明日","夜"],
answer:"夜"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"今日は暑いです",
question:"جمله ژاپنی را بساز:",
text:"امروز هوا گرم است",
words:["今日","は","暑い","です"],
answer:["今日","は","暑い","です"]
},

{
type:"build-jp",
speak:"明日は寒いです",
question:"جمله ژاپنی را بساز:",
text:"فردا هوا سرد است",
words:["明日","は","寒い","です"],
answer:["明日","は","寒い","です"]
},

{
type:"build-jp",
speak:"昨日は晴れでした",
question:"جمله ژاپنی را بساز:",
text:"دیروز هوا آفتابی بود",
words:["昨日","は","晴れ","でした"],
answer:["昨日","は","晴れ","でした"]
},

{
type:"build-jp",
speak:"おはようございます",
question:"جمله ژاپنی را بساز:",
text:"صبح بخیر",
words:["おはよう","ございます"],
answer:["おはよう","ございます"]
},

{
type:"build-jp",
speak:"おやすみなさい",
question:"جمله ژاپنی را بساز:",
text:"شب بخیر",
words:["おやすみ","なさい"],
answer:["おやすみ","なさい"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"今日は暑いです",
question:"ترجمه را بساز:",
text:"今日は暑いです",
words:["است","گرم","امروز","هوا"],
answer:["امروز","هوا","گرم","است"]
},

{
type:"build-fa",
speak:"明日は寒いです",
question:"ترجمه را بساز:",
text:"明日は寒いです",
words:["است","سرد","فردا","هوا"],
answer:["فردا","هوا","سرد","است"]
},

{
type:"build-fa",
speak:"昨日は晴れでした",
question:"ترجمه را بساز:",
text:"昨日は晴れでした",
words:["بود","آفتابی","دیروز","هوا"],
answer:["دیروز","هوا","آفتابی","بود"]
},

{
type:"build-fa",
speak:"おはようございます",
question:"ترجمه را بساز:",
text:"おはようございます",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"おやすみなさい",
question:"ترجمه را بساز:",
text:"おやすみなさい",
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