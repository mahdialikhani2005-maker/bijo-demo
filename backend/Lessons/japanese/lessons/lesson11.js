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
question:"赤 (aka) کدام است؟",
speak:"赤",
options:[
{text:"青 (ao)",image:"../../media/colors/blue.webp"},
{text:"赤 (aka)",image:"../../media/colors/red.webp"},
{text:"緑 (midori)",image:"../../media/colors/green.webp"},
{text:"黄 (ki)",image:"../../media/colors/yellow.webp"}
],
answer:"赤 (aka)"
},

{
type:"image",
question:"青 (ao) کدام است؟",
speak:"青",
options:[
{text:"黄 (ki)",image:"../../media/colors/yellow.webp"},
{text:"青 (ao)",image:"../../media/colors/blue.webp"},
{text:"黒 (kuro)",image:"../../media/colors/black.webp"},
{text:"赤 (aka)",image:"../../media/colors/red.webp"}
],
answer:"青 (ao)"
},

{
type:"image",
question:"緑 (midori) کدام است؟",
speak:"緑",
options:[
{text:"赤 (aka)",image:"../../media/colors/red.webp"},
{text:"緑 (midori)",image:"../../media/colors/green.webp"},
{text:"黒 (kuro)",image:"../../media/colors/black.webp"},
{text:"青 (ao)",image:"../../media/colors/blue.webp"}
],
answer:"緑 (midori)"
},

{
type:"image",
question:"黄 (ki) کدام است؟",
speak:"黄",
options:[
{text:"緑 (midori)",image:"../../media/colors/green.webp"},
{text:"青 (ao)",image:"../../media/colors/blue.webp"},
{text:"黄 (ki)",image:"../../media/colors/yellow.webp"},
{text:"赤 (aka)",image:"../../media/colors/red.webp"}
],
answer:"黄 (ki)"
},

{
type:"image",
question:"黒 (kuro) کدام است؟",
speak:"黒",
options:[
{text:"黄 (ki)",image:"../../media/colors/yellow.webp"},
{text:"赤 (aka)",image:"../../media/colors/red.webp"},
{text:"青 (ao)",image:"../../media/colors/blue.webp"},
{text:"黒 (kuro)",image:"../../media/colors/black.webp"}
],
answer:"黒 (kuro)"
},

/* WORD */

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/red.webp",
options:["青","赤","緑","黄"],
answer:"赤"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/blue.webp",
options:["黄","青","黒","赤"],
answer:"青"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/green.webp",
options:["赤","緑","黒","青"],
answer:"緑"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/yellow.webp",
options:["緑","青","黄","赤"],
answer:"黄"
},

{
type:"word",
question:"این رنگ چیست؟",
image:"../../media/colors/black.webp",
options:["黄","赤","青","黒"],
answer:"黒"
},

/* AUDIO */

{
type:"audio",
speak:"赤",
question:"کدام کلمه را شنیدی؟",
options:["青","赤","緑","黄"],
answer:"赤"
},

{
type:"audio",
speak:"青",
question:"کدام کلمه را شنیدی؟",
options:["黄","青","黒","赤"],
answer:"青"
},

{
type:"audio",
speak:"緑",
question:"کدام کلمه را شنیدی؟",
options:["赤","緑","黒","青"],
answer:"緑"
},

{
type:"audio",
speak:"黄",
question:"کدام کلمه را شنیدی؟",
options:["緑","青","黄","赤"],
answer:"黄"
},

{
type:"audio",
speak:"黒",
question:"کدام کلمه را شنیدی؟",
options:["黄","赤","青","黒"],
answer:"黒"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"りんごは赤いです",
question:"جمله ژاپنی را بساز:",
text:"سیب قرمز است",
words:["りんご","は","赤い","です"],
answer:["りんご","は","赤い","です"]
},

{
type:"build-jp",
speak:"空は青いです",
question:"جمله ژاپنی را بساز:",
text:"آسمان آبی است",
words:["空","は","青い","です"],
answer:["空","は","青い","です"]
},

{
type:"build-jp",
speak:"木は緑です",
question:"جمله ژاپنی را بساز:",
text:"درخت سبز است",
words:["木","は","緑","です"],
answer:["木","は","緑","です"]
},

{
type:"build-jp",
speak:"太陽は黄色いです",
question:"جمله ژاپنی را بساز:",
text:"خورشید زرد است",
words:["太陽","は","黄色い","です"],
answer:["太陽","は","黄色い","です"]
},

{
type:"build-jp",
speak:"猫は黒いです",
question:"جمله ژاپنی را بساز:",
text:"گربه مشکی است",
words:["猫","は","黒い","です"],
answer:["猫","は","黒い","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"りんごは赤いです",
question:"ترجمه را بساز:",
text:"りんごは赤いです",
words:["است","قرمز","سیب"],
answer:["سیب","قرمز","است"]
},

{
type:"build-fa",
speak:"空は青いです",
question:"ترجمه را بساز:",
text:"空は青いです",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"木は緑です",
question:"ترجمه را بساز:",
text:"木は緑です",
words:["است","سبز","درخت"],
answer:["درخت","سبز","است"]
},

{
type:"build-fa",
speak:"太陽は黄色いです",
question:"ترجمه را بساز:",
text:"太陽は黄色いです",
words:["است","زرد","خورشید"],
answer:["خورشید","زرد","است"]
},

{
type:"build-fa",
speak:"猫は黒いです",
question:"ترجمه را بساز:",
text:"猫は黒いです",
words:["است","مشکی","گربه"],
answer:["گربه","مشکی","است"]
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