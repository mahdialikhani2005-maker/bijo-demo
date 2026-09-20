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

/* IMAGE - طبیعت */

{
type:"image",
question:"Güneş کدام است؟",
speak:"güneş",
options:[
{text:"ay",image:"../../media/nature/moon.webp"},
{text:"güneş",image:"../../media/nature/sun.webp"},
{text:"yıldız",image:"../../media/nature/star.webp"},
{text:"gökyüzü",image:"../../media/nature/sky.webp"}
],
answer:"güneş"
},

{
type:"image",
question:"Ay کدام است؟",
speak:"ay",
options:[
{text:"yıldız",image:"../../media/nature/star.webp"},
{text:"ay",image:"../../media/nature/moon.webp"},
{text:"yağmur",image:"../../media/nature/rain.webp"},
{text:"güneş",image:"../../media/nature/sun.webp"}
],
answer:"ay"
},

{
type:"image",
question:"Yıldız کدام است؟",
speak:"yıldız",
options:[
{text:"güneş",image:"../../media/nature/sun.webp"},
{text:"yıldız",image:"../../media/nature/star.webp"},
{text:"yağmur",image:"../../media/nature/rain.webp"},
{text:"ay",image:"../../media/nature/moon.webp"}
],
answer:"yıldız"
},

{
type:"image",
question:"Gökyüzü کدام است؟",
speak:"gökyüzü",
options:[
{text:"yıldız",image:"../../media/nature/star.webp"},
{text:"ay",image:"../../media/nature/moon.webp"},
{text:"gökyüzü",image:"../../media/nature/sky.webp"},
{text:"güneş",image:"../../media/nature/sun.webp"}
],
answer:"gökyüzü"
},

{
type:"image",
question:"Yağmur کدام است؟",
speak:"yağmur",
options:[
{text:"gökyüzü",image:"../../media/nature/sky.webp"},
{text:"güneş",image:"../../media/nature/sun.webp"},
{text:"ay",image:"../../media/nature/moon.webp"},
{text:"yağmur",image:"../../media/nature/rain.webp"}
],
answer:"yağmur"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.webp",
options:["ay","güneş","yıldız","gökyüzü"],
answer:"güneş"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.webp",
options:["yıldız","ay","yağmur","güneş"],
answer:"ay"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.webp",
options:["güneş","yıldız","yağmur","ay"],
answer:"yıldız"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.webp",
options:["yıldız","ay","gökyüzü","güneş"],
answer:"gökyüzü"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.webp",
options:["gökyüzü","güneş","ay","yağmur"],
answer:"yağmur"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"güneş",
question:"کدام کلمه را شنیدی؟",
options:["ay","güneş","yıldız","gökyüzü"],
answer:"güneş"
},

{
type:"audio",
speak:"ay",
question:"کدام کلمه را شنیدی؟",
options:["yıldız","ay","yağmur","güneş"],
answer:"ay"
},

{
type:"audio",
speak:"yıldız",
question:"کدام کلمه را شنیدی؟",
options:["güneş","yıldız","yağmur","ay"],
answer:"yıldız"
},

{
type:"audio",
speak:"gökyüzü",
question:"کدام کلمه را شنیدی؟",
options:["yıldız","ay","gökyüzü","güneş"],
answer:"gökyüzü"
},

{
type:"audio",
speak:"yağmur",
question:"کدام کلمه را شنیدی؟",
options:["gökyüzü","güneş","ay","yağmur"],
answer:"yağmur"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Güneşi görüyorum",
question:"جمله ترکی را بساز:",
text:"من خورشید را می‌بینم",
words:["Güneşi","görüyorum"],
answer:["Güneşi","görüyorum"]
},

{
type:"build-tr",
speak:"Ay büyük",
question:"جمله ترکی را بساز:",
text:"ماه بزرگ است",
words:["Ay","büyük"],
answer:["Ay","büyük"]
},

{
type:"build-tr",
speak:"Yıldız küçük",
question:"جمله ترکی را بساز:",
text:"ستاره کوچک است",
words:["Yıldız","küçük"],
answer:["Yıldız","küçük"]
},

{
type:"build-tr",
speak:"Gökyüzü mavi",
question:"جمله ترکی را بساز:",
text:"آسمان آبی است",
words:["Gökyüzü","mavi"],
answer:["Gökyüzü","mavi"]
},

{
type:"build-tr",
speak:"Yağmuru severim",
question:"جمله ترکی را بساز:",
text:"من باران را دوست دارم",
words:["Yağmuru","severim"],
answer:["Yağmuru","severim"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Güneşi görüyorum",
question:"ترجمه را بساز:",
text:"Güneşi görüyorum",
words:["می‌بینم","خورشید","را","من"],
answer:["من","خورشید","را","می‌بینم"]
},

{
type:"build-fa",
speak:"Ay büyük",
question:"ترجمه را بساز:",
text:"Ay büyük",
words:["است","بزرگ","ماه"],
answer:["ماه","بزرگ","است"]
},

{
type:"build-fa",
speak:"Yıldız küçük",
question:"ترجمه را بساز:",
text:"Yıldız küçük",
words:["است","کوچک","ستاره"],
answer:["ستاره","کوچک","است"]
},

{
type:"build-fa",
speak:"Gökyüzü mavi",
question:"ترجمه را بساز:",
text:"Gökyüzü mavi",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Yağmuru severim",
question:"ترجمه را بساز:",
text:"Yağmuru severim",
words:["دارم","دوست","باران","را","من"],
answer:["من","باران","را","دوست","دارم"]
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