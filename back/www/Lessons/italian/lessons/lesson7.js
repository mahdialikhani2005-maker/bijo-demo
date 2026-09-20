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
question:"il pomodoro کدام است؟",
speak:"il pomodoro",
options:[
{text:"la patata",image:"../../media/vegetables/potato.webp"},
{text:"il pomodoro",image:"../../media/vegetables/tomato.webp"},
{text:"la carota",image:"../../media/vegetables/carrot.webp"},
{text:"la cipolla",image:"../../media/vegetables/onion.webp"}
],
answer:"il pomodoro"
},

{
type:"image",
question:"la patata کدام است؟",
speak:"la patata",
options:[
{text:"la cipolla",image:"../../media/vegetables/onion.webp"},
{text:"la patata",image:"../../media/vegetables/potato.webp"},
{text:"il cetriolo",image:"../../media/vegetables/cucumber.webp"},
{text:"il pomodoro",image:"../../media/vegetables/tomato.webp"}
],
answer:"la patata"
},

{
type:"image",
question:"la carota کدام است؟",
speak:"la carota",
options:[
{text:"il pomodoro",image:"../../media/vegetables/tomato.webp"},
{text:"la carota",image:"../../media/vegetables/carrot.webp"},
{text:"il cetriolo",image:"../../media/vegetables/cucumber.webp"},
{text:"la patata",image:"../../media/vegetables/potato.webp"}
],
answer:"la carota"
},

{
type:"image",
question:"la cipolla کدام است؟",
speak:"la cipolla",
options:[
{text:"la carota",image:"../../media/vegetables/carrot.webp"},
{text:"la patata",image:"../../media/vegetables/potato.webp"},
{text:"la cipolla",image:"../../media/vegetables/onion.webp"},
{text:"il pomodoro",image:"../../media/vegetables/tomato.webp"}
],
answer:"la cipolla"
},

{
type:"image",
question:"il cetriolo کدام است؟",
speak:"il cetriolo",
options:[
{text:"la cipolla",image:"../../media/vegetables/onion.webp"},
{text:"il pomodoro",image:"../../media/vegetables/tomato.webp"},
{text:"la patata",image:"../../media/vegetables/potato.webp"},
{text:"il cetriolo",image:"../../media/vegetables/cucumber.webp"}
],
answer:"il cetriolo"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.webp",
options:["la patata","il pomodoro","la carota","la cipolla"],
answer:"il pomodoro"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.webp",
options:["la cipolla","la patata","il cetriolo","il pomodoro"],
answer:"la patata"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.webp",
options:["il pomodoro","la carota","il cetriolo","la patata"],
answer:"la carota"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.webp",
options:["la carota","la patata","la cipolla","il pomodoro"],
answer:"la cipolla"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.webp",
options:["la cipolla","il pomodoro","la patata","il cetriolo"],
answer:"il cetriolo"
},

/* AUDIO */

{
type:"audio",
speak:"il pomodoro",
question:"کدام کلمه را شنیدی؟",
options:["la patata","il pomodoro","la carota","la cipolla"],
answer:"il pomodoro"
},

{
type:"audio",
speak:"la patata",
question:"کدام کلمه را شنیدی؟",
options:["la cipolla","la patata","il cetriolo","il pomodoro"],
answer:"la patata"
},

{
type:"audio",
speak:"la carota",
question:"کدام کلمه را شنیدی؟",
options:["il pomodoro","la carota","il cetriolo","la patata"],
answer:"la carota"
},

{
type:"audio",
speak:"la cipolla",
question:"کدام کلمه را شنیدی؟",
options:["la carota","la patata","la cipolla","il pomodoro"],
answer:"la cipolla"
},

{
type:"audio",
speak:"il cetriolo",
question:"کدام کلمه را شنیدی؟",
options:["la cipolla","il pomodoro","la patata","il cetriolo"],
answer:"il cetriolo"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Mi piacciono i pomodori",
question:"جمله ایتالیایی را بساز:",
text:"من گوجه‌فرنگی دوست دارم",
words:["Mi","piacciono","i","pomodori"],
answer:["Mi","piacciono","i","pomodori"]
},

{
type:"build-it",
speak:"Lei mangia una patata",
question:"جمله ایتالیایی را بساز:",
text:"او یک سیب‌زمینی می‌خورد",
words:["Lei","mangia","una","patata"],
answer:["Lei","mangia","una","patata"]
},

{
type:"build-it",
speak:"Questa è una carota",
question:"جمله ایتالیایی را بساز:",
text:"این یک هویج است",
words:["Questa","è","una","carota"],
answer:["Questa","è","una","carota"]
},

{
type:"build-it",
speak:"Io ho una cipolla",
question:"جمله ایتالیایی را بساز:",
text:"من یک پیاز دارم",
words:["Io","ho","una","cipolla"],
answer:["Io","ho","una","cipolla"]
},

{
type:"build-it",
speak:"Lui mangia un cetriolo",
question:"جمله ایتالیایی را بساز:",
text:"او یک خیار می‌خورد",
words:["Lui","mangia","un","cetriolo"],
answer:["Lui","mangia","un","cetriolo"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Mi piacciono i pomodori",
question:"ترجمه را بساز:",
text:"Mi piacciono i pomodori",
words:["دارم","دوست","گوجه‌فرنگی","من"],
answer:["من","گوجه‌فرنگی","دوست","دارم"]
},

{
type:"build-fa",
speak:"Lei mangia una patata",
question:"ترجمه را بساز:",
text:"Lei mangia una patata",
words:["می‌خورد","سیب‌زمینی","یک","او"],
answer:["او","یک","سیب‌زمینی","می‌خورد"]
},

{
type:"build-fa",
speak:"Questa è una carota",
question:"ترجمه را بساز:",
text:"Questa è una carota",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"Io ho una cipolla",
question:"ترجمه را بساز:",
text:"Io ho una cipolla",
words:["دارم","پیاز","یک","من"],
answer:["من","یک","پیاز","دارم"]
},

{
type:"build-fa",
speak:"Lui mangia un cetriolo",
question:"ترجمه را بساز:",
text:"Lui mangia un cetriolo",
words:["می‌خورد","خیار","یک","او"],
answer:["او","یک","خیار","می‌خورد"]
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