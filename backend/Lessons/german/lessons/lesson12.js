let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "de-DE",
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
  utter.lang = "de-DE";
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
question:"eins کدام است؟",
speak:"eins",
options:[
{text:"zwei",image:"../../media/numbers/two.webp"},
{text:"eins",image:"../../media/numbers/one.webp"},
{text:"drei",image:"../../media/numbers/three.webp"},
{text:"vier",image:"../../media/numbers/four.webp"}
],
answer:"eins"
},

{
type:"image",
question:"zwei کدام است؟",
speak:"zwei",
options:[
{text:"vier",image:"../../media/numbers/four.webp"},
{text:"zwei",image:"../../media/numbers/two.webp"},
{text:"fünf",image:"../../media/numbers/five.webp"},
{text:"eins",image:"../../media/numbers/one.webp"}
],
answer:"zwei"
},

{
type:"image",
question:"drei کدام است؟",
speak:"drei",
options:[
{text:"eins",image:"../../media/numbers/one.webp"},
{text:"drei",image:"../../media/numbers/three.webp"},
{text:"fünf",image:"../../media/numbers/five.webp"},
{text:"zwei",image:"../../media/numbers/two.webp"}
],
answer:"drei"
},

{
type:"image",
question:"vier کدام است؟",
speak:"vier",
options:[
{text:"drei",image:"../../media/numbers/three.webp"},
{text:"zwei",image:"../../media/numbers/two.webp"},
{text:"vier",image:"../../media/numbers/four.webp"},
{text:"eins",image:"../../media/numbers/one.webp"}
],
answer:"vier"
},

{
type:"image",
question:"fünf کدام است؟",
speak:"fünf",
options:[
{text:"vier",image:"../../media/numbers/four.webp"},
{text:"eins",image:"../../media/numbers/one.webp"},
{text:"zwei",image:"../../media/numbers/two.webp"},
{text:"fünf",image:"../../media/numbers/five.webp"}
],
answer:"fünf"
},

/* WORD */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["zwei","eins","drei","vier"],
answer:"eins"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["vier","zwei","fünf","eins"],
answer:"zwei"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["eins","drei","fünf","zwei"],
answer:"drei"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["drei","zwei","vier","eins"],
answer:"vier"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["vier","eins","zwei","fünf"],
answer:"fünf"
},

/* AUDIO */

{
type:"audio",
speak:"eins",
question:"کدام کلمه را شنیدی؟",
options:["zwei","eins","drei","vier"],
answer:"eins"
},

{
type:"audio",
speak:"zwei",
question:"کدام کلمه را شنیدی؟",
options:["vier","zwei","fünf","eins"],
answer:"zwei"
},

{
type:"audio",
speak:"drei",
question:"کدام کلمه را شنیدی؟",
options:["eins","drei","fünf","zwei"],
answer:"drei"
},

{
type:"audio",
speak:"vier",
question:"کدام کلمه را شنیدی؟",
options:["drei","zwei","vier","eins"],
answer:"vier"
},

{
type:"audio",
speak:"fünf",
question:"کدام کلمه را شنیدی؟",
options:["vier","eins","zwei","fünf"],
answer:"fünf"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich habe eine Katze",
question:"جمله آلمانی را بساز:",
text:"من یک گربه دارم",
words:["Ich","habe","eine","Katze"],
answer:["Ich","habe","eine","Katze"]
},

{
type:"build-de",
speak:"Sie hat zwei Hunde",
question:"جمله آلمانی را بساز:",
text:"او دو سگ دارد",
words:["Sie","hat","zwei","Hunde"],
answer:["Sie","hat","zwei","Hunde"]
},

{
type:"build-de",
speak:"Ich sehe drei Vögel",
question:"جمله آلمانی را بساز:",
text:"من سه پرنده می‌بینم",
words:["Ich","sehe","drei","Vögel"],
answer:["Ich","sehe","drei","Vögel"]
},

{
type:"build-de",
speak:"Er hat vier Äpfel",
question:"جمله آلمانی را بساز:",
text:"او چهار سیب دارد",
words:["Er","hat","vier","Äpfel"],
answer:["Er","hat","vier","Äpfel"]
},

{
type:"build-de",
speak:"Ich esse fünf Brötchen",
question:"جمله آلمانی را بساز:",
text:"من پنج نان می‌خورم",
words:["Ich","esse","fünf","Brötchen"],
answer:["Ich","esse","fünf","Brötchen"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich habe eine Katze",
question:"ترجمه را بساز:",
text:"Ich habe eine Katze",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"Sie hat zwei Hunde",
question:"ترجمه را بساز:",
text:"Sie hat zwei Hunde",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"Ich sehe drei Vögel",
question:"ترجمه را بساز:",
text:"Ich sehe drei Vögel",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Er hat vier Äpfel",
question:"ترجمه را بساز:",
text:"Er hat vier Äpfel",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"Ich esse fünf Brötchen",
question:"ترجمه را بساز:",
text:"Ich esse fünf Brötchen",
words:["می‌خورم","پنج","نان","من"],
answer:["من","پنج","نان","می‌خورم"]
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

  // BUILD GERMAN / FA

  else if (q.type === "build-de" || q.type === "build-fa") {
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

  if (q.type === "build-de") {
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