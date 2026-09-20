let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "tr-TR",
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
  utter.lang = "tr-TR";
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

/* IMAGE - غذاها */

{
type:"image",
question:"Ekmek کدام است؟",
speak:"ekmek",
options:[
{text:"pirinç",image:"../../media/food/rice.webp"},
{text:"ekmek",image:"../../media/food/bread.webp"},
{text:"et",image:"../../media/food/meat.webp"},
{text:"yumurta",image:"../../media/food/egg.webp"}
],
answer:"ekmek"
},

{
type:"image",
question:"Pirinç کدام است؟",
speak:"pirinç",
options:[
{text:"yumurta",image:"../../media/food/egg.webp"},
{text:"pirinç",image:"../../media/food/rice.webp"},
{text:"süt",image:"../../media/food/milk.webp"},
{text:"ekmek",image:"../../media/food/bread.webp"}
],
answer:"pirinç"
},

{
type:"image",
question:"Et کدام است؟",
speak:"et",
options:[
{text:"ekmek",image:"../../media/food/bread.webp"},
{text:"et",image:"../../media/food/meat.webp"},
{text:"süt",image:"../../media/food/milk.webp"},
{text:"pirinç",image:"../../media/food/rice.webp"}
],
answer:"et"
},

{
type:"image",
question:"Yumurta کدام است؟",
speak:"yumurta",
options:[
{text:"et",image:"../../media/food/meat.webp"},
{text:"pirinç",image:"../../media/food/rice.webp"},
{text:"yumurta",image:"../../media/food/egg.webp"},
{text:"ekmek",image:"../../media/food/bread.webp"}
],
answer:"yumurta"
},

{
type:"image",
question:"Süt کدام است؟",
speak:"süt",
options:[
{text:"yumurta",image:"../../media/food/egg.webp"},
{text:"ekmek",image:"../../media/food/bread.webp"},
{text:"pirinç",image:"../../media/food/rice.webp"},
{text:"süt",image:"../../media/food/milk.webp"}
],
answer:"süt"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["pirinç","ekmek","et","yumurta"],
answer:"ekmek"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["yumurta","pirinç","süt","ekmek"],
answer:"pirinç"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["ekmek","et","süt","pirinç"],
answer:"et"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["et","pirinç","yumurta","ekmek"],
answer:"yumurta"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["yumurta","ekmek","pirinç","süt"],
answer:"süt"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"ekmek",
question:"کدام کلمه را شنیدی؟",
options:["pirinç","ekmek","et","yumurta"],
answer:"ekmek"
},

{
type:"audio",
speak:"pirinç",
question:"کدام کلمه را شنیدی؟",
options:["yumurta","pirinç","süt","ekmek"],
answer:"pirinç"
},

{
type:"audio",
speak:"et",
question:"کدام کلمه را شنیدی؟",
options:["ekmek","et","süt","pirinç"],
answer:"et"
},

{
type:"audio",
speak:"yumurta",
question:"کدام کلمه را شنیدی؟",
options:["et","pirinç","yumurta","ekmek"],
answer:"yumurta"
},

{
type:"audio",
speak:"süt",
question:"کدام کلمه را شنیدی؟",
options:["yumurta","ekmek","pirinç","süt"],
answer:"süt"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Ekmek severim",
question:"جمله ترکی را بساز:",
text:"من نان دوست دارم",
words:["Ekmek","severim"],
answer:["Ekmek","severim"]
},

{
type:"build-tr",
speak:"Pirinç yiyor",
question:"جمله ترکی را بساز:",
text:"او برنج می‌خورد",
words:["Pirinç","yiyor"],
answer:["Pirinç","yiyor"]
},

{
type:"build-tr",
speak:"Etim var",
question:"جمله ترکی را بساز:",
text:"من گوشت دارم",
words:["Etim","var"],
answer:["Etim","var"]
},

{
type:"build-tr",
speak:"Bir yumurta yiyor",
question:"جمله ترکی را بساز:",
text:"او یک تخم‌مرغ می‌خورد",
words:["Bir","yumurta","yiyor"],
answer:["Bir","yumurta","yiyor"]
},

{
type:"build-tr",
speak:"Süt içiyorum",
question:"جمله ترکی را بساز:",
text:"من شیر می‌نوشم",
words:["Süt","içiyorum"],
answer:["Süt","içiyorum"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ekmek severim",
question:"ترجمه را بساز:",
text:"Ekmek severim",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"Pirinç yiyor",
question:"ترجمه را بساز:",
text:"Pirinç yiyor",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"Etim var",
question:"ترجمه را بساز:",
text:"Etim var",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"Bir yumurta yiyor",
question:"ترجمه را بساز:",
text:"Bir yumurta yiyor",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"Süt içiyorum",
question:"ترجمه را بساز:",
text:"Süt içiyorum",
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

  // BUILD TURKISH / FA

  else if (q.type === "build-tr" || q.type === "build-fa") {
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

  if (q.type === "build-tr") {
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