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
question:"der Hund کدام است؟",
speak:"der Hund",
options:[
{text:"die Katze",image:"../../media/animals/cat.webp"},
{text:"der Hund",image:"../../media/animals/dog.webp"},
{text:"der Vogel",image:"../../media/animals/bird.webp"},
{text:"der Fisch",image:"../../media/animals/fish.webp"}
],
answer:"der Hund"
},

{
type:"image",
question:"die Katze کدام است؟",
speak:"die Katze",
options:[
{text:"der Fisch",image:"../../media/animals/fish.webp"},
{text:"die Katze",image:"../../media/animals/cat.webp"},
{text:"das Pferd",image:"../../media/animals/horse.webp"},
{text:"der Hund",image:"../../media/animals/dog.webp"}
],
answer:"die Katze"
},

{
type:"image",
question:"der Vogel کدام است؟",
speak:"der Vogel",
options:[
{text:"der Hund",image:"../../media/animals/dog.webp"},
{text:"der Vogel",image:"../../media/animals/bird.webp"},
{text:"das Pferd",image:"../../media/animals/horse.webp"},
{text:"die Katze",image:"../../media/animals/cat.webp"}
],
answer:"der Vogel"
},

{
type:"image",
question:"der Fisch کدام است؟",
speak:"der Fisch",
options:[
{text:"der Vogel",image:"../../media/animals/bird.webp"},
{text:"die Katze",image:"../../media/animals/cat.webp"},
{text:"der Fisch",image:"../../media/animals/fish.webp"},
{text:"der Hund",image:"../../media/animals/dog.webp"}
],
answer:"der Fisch"
},

{
type:"image",
question:"das Pferd کدام است؟",
speak:"das Pferd",
options:[
{text:"der Fisch",image:"../../media/animals/fish.webp"},
{text:"der Hund",image:"../../media/animals/dog.webp"},
{text:"die Katze",image:"../../media/animals/cat.webp"},
{text:"das Pferd",image:"../../media/animals/horse.webp"}
],
answer:"das Pferd"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/dog.webp",
options:["die Katze","der Hund","der Vogel","der Fisch"],
answer:"der Hund"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/cat.webp",
options:["der Fisch","die Katze","das Pferd","der Hund"],
answer:"die Katze"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/bird.webp",
options:["der Hund","der Vogel","das Pferd","die Katze"],
answer:"der Vogel"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/fish.webp",
options:["der Vogel","die Katze","der Fisch","der Hund"],
answer:"der Fisch"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/horse.webp",
options:["der Fisch","der Hund","die Katze","das Pferd"],
answer:"das Pferd"
},

/* AUDIO */

{
type:"audio",
speak:"der Hund",
question:"کدام کلمه را شنیدی؟",
options:["die Katze","der Hund","der Vogel","der Fisch"],
answer:"der Hund"
},

{
type:"audio",
speak:"die Katze",
question:"کدام کلمه را شنیدی؟",
options:["der Fisch","die Katze","das Pferd","der Hund"],
answer:"die Katze"
},

{
type:"audio",
speak:"der Vogel",
question:"کدام کلمه را شنیدی؟",
options:["der Hund","der Vogel","das Pferd","die Katze"],
answer:"der Vogel"
},

{
type:"audio",
speak:"der Fisch",
question:"کدام کلمه را شنیدی؟",
options:["der Vogel","die Katze","der Fisch","der Hund"],
answer:"der Fisch"
},

{
type:"audio",
speak:"das Pferd",
question:"کدام کلمه را شنیدی؟",
options:["der Fisch","der Hund","die Katze","das Pferd"],
answer:"das Pferd"
},

/* BUILD DE - ساخت جمله آلمانی */

{
type:"build-de",
speak:"Ich habe einen Hund",
question:"جمله آلمانی را بساز:",
text:"من یک سگ دارم",
words:["Ich","habe","einen","Hund"],
answer:["Ich","habe","einen","Hund"]
},

{
type:"build-de",
speak:"Sie hat eine Katze",
question:"جمله آلمانی را بساز:",
text:"او یک گربه دارد",
words:["Sie","hat","eine","Katze"],
answer:["Sie","hat","eine","Katze"]
},

{
type:"build-de",
speak:"Ich sehe einen Vogel",
question:"جمله آلمانی را بساز:",
text:"من یک پرنده می‌بینم",
words:["Ich","sehe","einen","Vogel"],
answer:["Ich","sehe","einen","Vogel"]
},

{
type:"build-de",
speak:"Er hat einen Fisch",
question:"جمله آلمانی را بساز:",
text:"او یک ماهی دارد",
words:["Er","hat","einen","Fisch"],
answer:["Er","hat","einen","Fisch"]
},

{
type:"build-de",
speak:"Das ist ein Pferd",
question:"جمله آلمانی را بساز:",
text:"این یک اسب است",
words:["Das","ist","ein","Pferd"],
answer:["Das","ist","ein","Pferd"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ich habe einen Hund",
question:"ترجمه را بساز:",
text:"Ich habe einen Hund",
words:["دارم","سگ","یک","من"],
answer:["من","یک","سگ","دارم"]
},

{
type:"build-fa",
speak:"Sie hat eine Katze",
question:"ترجمه را بساز:",
text:"Sie hat eine Katze",
words:["دارد","گربه","یک","او"],
answer:["او","یک","گربه","دارد"]
},

{
type:"build-fa",
speak:"Ich sehe einen Vogel",
question:"ترجمه را بساز:",
text:"Ich sehe einen Vogel",
words:["می‌بینم","پرنده","یک","من"],
answer:["من","یک","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Er hat einen Fisch",
question:"ترجمه را بساز:",
text:"Er hat einen Fisch",
words:["دارد","ماهی","یک","او"],
answer:["او","یک","ماهی","دارد"]
},

{
type:"build-fa",
speak:"Das ist ein Pferd",
question:"ترجمه را بساز:",
text:"Das ist ein Pferd",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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