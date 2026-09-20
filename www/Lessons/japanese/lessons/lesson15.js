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
question:"車 (kuruma) کدام است؟",
speak:"車",
options:[
{text:"バス (basu)",image:"../../media/vehicles/bus.webp"},
{text:"車 (kuruma)",image:"../../media/vehicles/car.webp"},
{text:"電車 (densha)",image:"../../media/vehicles/train.webp"},
{text:"飛行機 (hikouki)",image:"../../media/vehicles/airplane.webp"}
],
answer:"車 (kuruma)"
},

{
type:"image",
question:"バス (basu) کدام است؟",
speak:"バス",
options:[
{text:"飛行機 (hikouki)",image:"../../media/vehicles/airplane.webp"},
{text:"バス (basu)",image:"../../media/vehicles/bus.webp"},
{text:"自転車 (jitensha)",image:"../../media/vehicles/bicycle.webp"},
{text:"車 (kuruma)",image:"../../media/vehicles/car.webp"}
],
answer:"バス (basu)"
},

{
type:"image",
question:"電車 (densha) کدام است؟",
speak:"電車",
options:[
{text:"車 (kuruma)",image:"../../media/vehicles/car.webp"},
{text:"電車 (densha)",image:"../../media/vehicles/train.webp"},
{text:"自転車 (jitensha)",image:"../../media/vehicles/bicycle.webp"},
{text:"バス (basu)",image:"../../media/vehicles/bus.webp"}
],
answer:"電車 (densha)"
},

{
type:"image",
question:"飛行機 (hikouki) کدام است؟",
speak:"飛行機",
options:[
{text:"電車 (densha)",image:"../../media/vehicles/train.webp"},
{text:"バス (basu)",image:"../../media/vehicles/bus.webp"},
{text:"飛行機 (hikouki)",image:"../../media/vehicles/airplane.webp"},
{text:"車 (kuruma)",image:"../../media/vehicles/car.webp"}
],
answer:"飛行機 (hikouki)"
},

{
type:"image",
question:"自転車 (jitensha) کدام است؟",
speak:"自転車",
options:[
{text:"飛行機 (hikouki)",image:"../../media/vehicles/airplane.webp"},
{text:"車 (kuruma)",image:"../../media/vehicles/car.webp"},
{text:"バス (basu)",image:"../../media/vehicles/bus.webp"},
{text:"自転車 (jitensha)",image:"../../media/vehicles/bicycle.webp"}
],
answer:"自転車 (jitensha)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/car.webp",
options:["バス","車","電車","飛行機"],
answer:"車"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bus.webp",
options:["飛行機","バス","自転車","車"],
answer:"バス"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/train.webp",
options:["車","電車","自転車","バス"],
answer:"電車"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/airplane.webp",
options:["電車","バス","飛行機","車"],
answer:"飛行機"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bicycle.webp",
options:["飛行機","車","バス","自転車"],
answer:"自転車"
},

/* AUDIO */

{
type:"audio",
speak:"車",
question:"کدام کلمه را شنیدی؟",
options:["バス","車","電車","飛行機"],
answer:"車"
},

{
type:"audio",
speak:"バス",
question:"کدام کلمه را شنیدی؟",
options:["飛行機","バス","自転車","車"],
answer:"バス"
},

{
type:"audio",
speak:"電車",
question:"کدام کلمه را شنیدی؟",
options:["車","電車","自転車","バス"],
answer:"電車"
},

{
type:"audio",
speak:"飛行機",
question:"کدام کلمه را شنیدی؟",
options:["電車","バス","飛行機","車"],
answer:"飛行機"
},

{
type:"audio",
speak:"自転車",
question:"کدام کلمه را شنیدی؟",
options:["飛行機","車","バス","自転車"],
answer:"自転車"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"私は車があります",
question:"جمله ژاپنی را بساز:",
text:"من یک ماشین دارم",
words:["私","は","車","が","あります"],
answer:["私","は","車","が","あります"]
},

{
type:"build-jp",
speak:"彼女はバスがあります",
question:"جمله ژاپنی را بساز:",
text:"او یک اتوبوس دارد",
words:["彼女","は","バス","が","あります"],
answer:["彼女","は","バス","が","あります"]
},

{
type:"build-jp",
speak:"私は電車を見ます",
question:"جمله ژاپنی را بساز:",
text:"من یک قطار می‌بینم",
words:["私","は","電車","を","見ます"],
answer:["私","は","電車","を","見ます"]
},

{
type:"build-jp",
speak:"彼は飛行機があります",
question:"جمله ژاپنی را بساز:",
text:"او یک هواپیما دارد",
words:["彼","は","飛行機","が","あります"],
answer:["彼","は","飛行機","が","あります"]
},

{
type:"build-jp",
speak:"私は自転車が好きです",
question:"جمله ژاپنی را بساز:",
text:"من دوچرخه را دوست دارم",
words:["私","は","自転車","が","好き","です"],
answer:["私","は","自転車","が","好き","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"私は車があります",
question:"ترجمه را بساز:",
text:"私は車があります",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"彼女はバスがあります",
question:"ترجمه را بساز:",
text:"彼女はバスがあります",
words:["دارد","اتوبوس","یک","او"],
answer:["او","یک","اتوبوس","دارد"]
},

{
type:"build-fa",
speak:"私は電車を見ます",
question:"ترجمه را بساز:",
text:"私は電車を見ます",
words:["می‌بینم","قطار","یک","من"],
answer:["من","یک","قطار","می‌بینم"]
},

{
type:"build-fa",
speak:"彼は飛行機があります",
question:"ترجمه را بساز:",
text:"彼は飛行機があります",
words:["دارد","هواپیما","یک","او"],
answer:["او","یک","هواپیما","دارد"]
},

{
type:"build-fa",
speak:"私は自転車が好きです",
question:"ترجمه را بساز:",
text:"私は自転車が好きです",
words:["دارم","دوست","دوچرخه","را","من"],
answer:["من","دوچرخه","را","دوست","دارم"]
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