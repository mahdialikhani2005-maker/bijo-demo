let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "zh-CN",
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
  utter.lang = "zh-CN";
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
question:"房子 (fángzi) کدام است؟",
speak:"房子",
options:[
{text:"房间 (fángjiān)",image:"../../media/house/room.webp"},
{text:"房子 (fángzi)",image:"../../media/house/house.webp"},
{text:"门 (mén)",image:"../../media/house/door.webp"},
{text:"窗户 (chuānghu)",image:"../../media/house/window.webp"}
],
answer:"房子 (fángzi)"
},

{
type:"image",
question:"房间 (fángjiān) کدام است؟",
speak:"房间",
options:[
{text:"窗户 (chuānghu)",image:"../../media/house/window.webp"},
{text:"房间 (fángjiān)",image:"../../media/house/room.webp"},
{text:"厨房 (chúfáng)",image:"../../media/house/kitchen.webp"},
{text:"房子 (fángzi)",image:"../../media/house/house.webp"}
],
answer:"房间 (fángjiān)"
},

{
type:"image",
question:"门 (mén) کدام است؟",
speak:"门",
options:[
{text:"房子 (fángzi)",image:"../../media/house/house.webp"},
{text:"门 (mén)",image:"../../media/house/door.webp"},
{text:"窗户 (chuānghu)",image:"../../media/house/window.webp"},
{text:"房间 (fángjiān)",image:"../../media/house/room.webp"}
],
answer:"门 (mén)"
},

{
type:"image",
question:"窗户 (chuānghu) کدام است؟",
speak:"窗户",
options:[
{text:"门 (mén)",image:"../../media/house/door.webp"},
{text:"房子 (fángzi)",image:"../../media/house/house.webp"},
{text:"窗户 (chuānghu)",image:"../../media/house/window.webp"},
{text:"房间 (fángjiān)",image:"../../media/house/room.webp"}
],
answer:"窗户 (chuānghu)"
},

{
type:"image",
question:"厨房 (chúfáng) کدام است؟",
speak:"厨房",
options:[
{text:"房间 (fángjiān)",image:"../../media/house/room.webp"},
{text:"窗户 (chuānghu)",image:"../../media/house/window.webp"},
{text:"房子 (fángzi)",image:"../../media/house/house.webp"},
{text:"厨房 (chúfáng)",image:"../../media/house/kitchen.webp"}
],
answer:"厨房 (chúfáng)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/house.webp",
options:["房间 (fángjiān)","房子 (fángzi)","门 (mén)","窗户 (chuānghu)"],
answer:"房子 (fángzi)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/room.webp",
options:["窗户 (chuānghu)","房间 (fángjiān)","厨房 (chúfáng)","房子 (fángzi)"],
answer:"房间 (fángjiān)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/door.webp",
options:["房子 (fángzi)","门 (mén)","窗户 (chuānghu)","房间 (fángjiān)"],
answer:"门 (mén)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/window.webp",
options:["门 (mén)","房子 (fángzi)","窗户 (chuānghu)","房间 (fángjiān)"],
answer:"窗户 (chuānghu)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/kitchen.webp",
options:["房间 (fángjiān)","窗户 (chuānghu)","房子 (fángzi)","厨房 (chúfáng)"],
answer:"厨房 (chúfáng)"
},

/* AUDIO */

{
type:"audio",
speak:"房子",
question:"کدام کلمه را شنیدی؟",
options:["房间 (fángjiān)","房子 (fángzi)","门 (mén)","窗户 (chuānghu)"],
answer:"房子 (fángzi)"
},

{
type:"audio",
speak:"房间",
question:"کدام کلمه را شنیدی؟",
options:["窗户 (chuānghu)","房间 (fángjiān)","厨房 (chúfáng)","房子 (fángzi)"],
answer:"房间 (fángjiān)"
},

{
type:"audio",
speak:"门",
question:"کدام کلمه را شنیدی؟",
options:["房子 (fángzi)","门 (mén)","窗户 (chuānghu)","房间 (fángjiān)"],
answer:"门 (mén)"
},

{
type:"audio",
speak:"窗户",
question:"کدام کلمه را شنیدی؟",
options:["门 (mén)","房子 (fángzi)","窗户 (chuānghu)","房间 (fángjiān)"],
answer:"窗户 (chuānghu)"
},

{
type:"audio",
speak:"厨房",
question:"کدام کلمه را شنیدی؟",
options:["房间 (fángjiān)","窗户 (chuānghu)","房子 (fángzi)","厨房 (chúfáng)"],
answer:"厨房 (chúfáng)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"这是房子",
question:"جمله چینی را بساز:",
text:"این یک خانه است",
words:["这是","房子"],
answer:["这是","房子"]
},

{
type:"build-zh",
speak:"我看见门",
question:"جمله چینی را بساز:",
text:"من یک در می‌بینم",
words:["我","看见","门"],
answer:["我","看见","门"]
},

{
type:"build-zh",
speak:"她打开窗户",
question:"جمله چینی را بساز:",
text:"او پنجره را باز می‌کند",
words:["她","打开","窗户"],
answer:["她","打开","窗户"]
},

{
type:"build-zh",
speak:"我们有厨房",
question:"جمله چینی را بساز:",
text:"ما یک آشپزخانه داریم",
words:["我们","有","厨房"],
answer:["我们","有","厨房"]
},

{
type:"build-zh",
speak:"他们在房间里",
question:"جمله چینی را بساز:",
text:"آنها در اتاق هستند",
words:["他们","在","房间","里"],
answer:["他们","在","房间","里"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"这是房子",
question:"ترجمه را بساز:",
text:"这是房子",
words:["است","خانه","این"],
answer:["این","خانه","است"]
},

{
type:"build-fa",
speak:"我看见门",
question:"ترجمه را بساز:",
text:"我看见门",
words:["می‌بینم","در","یک","من"],
answer:["من","یک","در","می‌بینم"]
},

{
type:"build-fa",
speak:"她打开窗户",
question:"ترجمه را بساز:",
text:"她打开窗户",
words:["را","باز","پنجره","می‌کند","او"],
answer:["او","پنجره","را","باز","می‌کند"]
},

{
type:"build-fa",
speak:"我们有厨房",
question:"ترجمه را بساز:",
text:"我们有厨房",
words:["داریم","آشپزخانه","ما"],
answer:["ما","آشپزخانه","داریم"]
},

{
type:"build-fa",
speak:"他们在房间里",
question:"ترجمه را بساز:",
text:"他们在房间里",
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

  // BUILD CHINESE / FA

  else if (q.type === "build-zh" || q.type === "build-fa") {
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

  if (q.type === "build-zh") {
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