let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ko-KR",
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
  utter.lang = "ko-KR";
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
question:"집 (jip) کدام است؟",
speak:"집",
options:[
{text:"방 (bang)",image:"../../media/house/room.webp"},
{text:"집 (jip)",image:"../../media/house/house.webp"},
{text:"문 (mun)",image:"../../media/house/door.webp"},
{text:"창문 (changmun)",image:"../../media/house/window.webp"}
],
answer:"집 (jip)"
},

{
type:"image",
question:"방 (bang) کدام است؟",
speak:"방",
options:[
{text:"창문 (changmun)",image:"../../media/house/window.webp"},
{text:"방 (bang)",image:"../../media/house/room.webp"},
{text:"부엌 (bueok)",image:"../../media/house/kitchen.webp"},
{text:"집 (jip)",image:"../../media/house/house.webp"}
],
answer:"방 (bang)"
},

{
type:"image",
question:"문 (mun) کدام است؟",
speak:"문",
options:[
{text:"집 (jip)",image:"../../media/house/house.webp"},
{text:"문 (mun)",image:"../../media/house/door.webp"},
{text:"창문 (changmun)",image:"../../media/house/window.webp"},
{text:"방 (bang)",image:"../../media/house/room.webp"}
],
answer:"문 (mun)"
},

{
type:"image",
question:"창문 (changmun) کدام است؟",
speak:"창문",
options:[
{text:"문 (mun)",image:"../../media/house/door.webp"},
{text:"집 (jip)",image:"../../media/house/house.webp"},
{text:"창문 (changmun)",image:"../../media/house/window.webp"},
{text:"방 (bang)",image:"../../media/house/room.webp"}
],
answer:"창문 (changmun)"
},

{
type:"image",
question:"부엌 (bueok) کدام است؟",
speak:"부엌",
options:[
{text:"방 (bang)",image:"../../media/house/room.webp"},
{text:"창문 (changmun)",image:"../../media/house/window.webp"},
{text:"집 (jip)",image:"../../media/house/house.webp"},
{text:"부엌 (bueok)",image:"../../media/house/kitchen.webp"}
],
answer:"부엌 (bueok)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/house.webp",
options:["방","집","문","창문"],
answer:"집"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/room.webp",
options:["창문","방","부엌","집"],
answer:"방"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/door.webp",
options:["집","문","창문","방"],
answer:"문"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/window.webp",
options:["문","집","창문","방"],
answer:"창문"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/kitchen.webp",
options:["방","창문","집","부엌"],
answer:"부엌"
},

/* AUDIO */

{
type:"audio",
speak:"집",
question:"کدام کلمه را شنیدی؟",
options:["방","집","문","창문"],
answer:"집"
},

{
type:"audio",
speak:"방",
question:"کدام کلمه را شنیدی؟",
options:["창문","방","부엌","집"],
answer:"방"
},

{
type:"audio",
speak:"문",
question:"کدام کلمه را شنیدی؟",
options:["집","문","창문","방"],
answer:"문"
},

{
type:"audio",
speak:"창문",
question:"کدام کلمه را شنیدی؟",
options:["문","집","창문","방"],
answer:"창문"
},

{
type:"audio",
speak:"부엌",
question:"کدام کلمه را شنیدی؟",
options:["방","창문","집","부엌"],
answer:"부엌"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"이것은 집입니다",
question:"جمله کرهای را بساز:",
text:"این یک خانه است",
words:["이것은","집","입니다"],
answer:["이것은","집","입니다"]
},

{
type:"build-ko",
speak:"저는 문을 봅니다",
question:"جمله کرهای را بساز:",
text:"من یک در می‌بینم",
words:["저는","문을","봅니다"],
answer:["저는","문을","봅니다"]
},

{
type:"build-ko",
speak:"그녀는 창문을 엽니다",
question:"جمله کرهای را بساز:",
text:"او پنجره را باز می‌کند",
words:["그녀는","창문을","엽니다"],
answer:["그녀는","창문을","엽니다"]
},

{
type:"build-ko",
speak:"우리는 부엌이 있습니다",
question:"جمله کرهای را بساز:",
text:"ما یک آشپزخانه داریم",
words:["우리는","부엌이","있습니다"],
answer:["우리는","부엌이","있습니다"]
},

{
type:"build-ko",
speak:"그들은 방에 있습니다",
question:"جمله کرهای را بساز:",
text:"آنها در اتاق هستند",
words:["그들은","방에","있습니다"],
answer:["그들은","방에","있습니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"이것은 집입니다",
question:"ترجمه را بساز:",
text:"이것은 집입니다",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"저는 문을 봅니다",
question:"ترجمه را بساز:",
text:"저는 문을 봅니다",
words:["می‌بینم","در","یک","من"],
answer:["من","یک","در","می‌بینم"]
},

{
type:"build-fa",
speak:"그녀는 창문을 엽니다",
question:"ترجمه را بساز:",
text:"그녀는 창문을 엽니다",
words:["را","باز","پنجره","می‌کند","او"],
answer:["او","پنجره","را","باز","می‌کند"]
},

{
type:"build-fa",
speak:"우리는 부엌이 있습니다",
question:"ترجمه را بساز:",
text:"우리는 부엌이 있습니다",
words:["داریم","آشپزخانه","یک","ما"],
answer:["ما","یک","آشپزخانه","داریم"]
},

{
type:"build-fa",
speak:"그들은 방에 있습니다",
question:"ترجمه را بساز:",
text:"그들은 방에 있습니다",
words:["در","هستند","اتاق","آنها"],
answer:["آنها","در","اتاق","هستند"]
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

  // BUILD KOREAN / FA

  else if (q.type === "build-ko" || q.type === "build-fa") {
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

  if (q.type === "build-ko") {
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