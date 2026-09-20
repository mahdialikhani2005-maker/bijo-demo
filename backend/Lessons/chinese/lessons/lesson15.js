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
question:"汽车 (qìchē) کدام است؟",
speak:"汽车",
options:[
{text:"公共汽车 (gōnggòng qìchē)",image:"../../media/vehicles/bus.webp"},
{text:"汽车 (qìchē)",image:"../../media/vehicles/car.webp"},
{text:"火车 (huǒchē)",image:"../../media/vehicles/train.webp"},
{text:"飞机 (fēijī)",image:"../../media/vehicles/airplane.webp"}
],
answer:"汽车 (qìchē)"
},

{
type:"image",
question:"公共汽车 (gōnggòng qìchē) کدام است؟",
speak:"公共汽车",
options:[
{text:"飞机 (fēijī)",image:"../../media/vehicles/airplane.webp"},
{text:"公共汽车 (gōnggòng qìchē)",image:"../../media/vehicles/bus.webp"},
{text:"自行车 (zìxíngchē)",image:"../../media/vehicles/bicycle.webp"},
{text:"汽车 (qìchē)",image:"../../media/vehicles/car.webp"}
],
answer:"公共汽车 (gōnggòng qìchē)"
},

{
type:"image",
question:"火车 (huǒchē) کدام است؟",
speak:"火车",
options:[
{text:"汽车 (qìchē)",image:"../../media/vehicles/car.webp"},
{text:"火车 (huǒchē)",image:"../../media/vehicles/train.webp"},
{text:"自行车 (zìxíngchē)",image:"../../media/vehicles/bicycle.webp"},
{text:"公共汽车 (gōnggòng qìchē)",image:"../../media/vehicles/bus.webp"}
],
answer:"火车 (huǒchē)"
},

{
type:"image",
question:"飞机 (fēijī) کدام است؟",
speak:"飞机",
options:[
{text:"火车 (huǒchē)",image:"../../media/vehicles/train.webp"},
{text:"公共汽车 (gōnggòng qìchē)",image:"../../media/vehicles/bus.webp"},
{text:"飞机 (fēijī)",image:"../../media/vehicles/airplane.webp"},
{text:"汽车 (qìchē)",image:"../../media/vehicles/car.webp"}
],
answer:"飞机 (fēijī)"
},

{
type:"image",
question:"自行车 (zìxíngchē) کدام است؟",
speak:"自行车",
options:[
{text:"飞机 (fēijī)",image:"../../media/vehicles/airplane.webp"},
{text:"汽车 (qìchē)",image:"../../media/vehicles/car.webp"},
{text:"公共汽车 (gōnggòng qìchē)",image:"../../media/vehicles/bus.webp"},
{text:"自行车 (zìxíngchē)",image:"../../media/vehicles/bicycle.webp"}
],
answer:"自行车 (zìxíngchē)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/car.webp",
options:["公共汽车 (gōnggòng qìchē)","汽车 (qìchē)","火车 (huǒchē)","飞机 (fēijī)"],
answer:"汽车 (qìchē)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bus.webp",
options:["飞机 (fēijī)","公共汽车 (gōnggòng qìchē)","自行车 (zìxíngchē)","汽车 (qìchē)"],
answer:"公共汽车 (gōnggòng qìchē)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/train.webp",
options:["汽车 (qìchē)","火车 (huǒchē)","自行车 (zìxíngchē)","公共汽车 (gōnggòng qìchē)"],
answer:"火车 (huǒchē)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/airplane.webp",
options:["火车 (huǒchē)","公共汽车 (gōnggòng qìchē)","飞机 (fēijī)","汽车 (qìchē)"],
answer:"飞机 (fēijī)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bicycle.webp",
options:["飞机 (fēijī)","汽车 (qìchē)","公共汽车 (gōnggòng qìchē)","自行车 (zìxíngchē)"],
answer:"自行车 (zìxíngchē)"
},

/* AUDIO */

{
type:"audio",
speak:"汽车",
question:"کدام کلمه را شنیدی؟",
options:["公共汽车 (gōnggòng qìchē)","汽车 (qìchē)","火车 (huǒchē)","飞机 (fēijī)"],
answer:"汽车 (qìchē)"
},

{
type:"audio",
speak:"公共汽车",
question:"کدام کلمه را شنیدی؟",
options:["飞机 (fēijī)","公共汽车 (gōnggòng qìchē)","自行车 (zìxíngchē)","汽车 (qìchē)"],
answer:"公共汽车 (gōnggòng qìchē)"
},

{
type:"audio",
speak:"火车",
question:"کدام کلمه را شنیدی؟",
options:["汽车 (qìchē)","火车 (huǒchē)","自行车 (zìxíngchē)","公共汽车 (gōnggòng qìchē)"],
answer:"火车 (huǒchē)"
},

{
type:"audio",
speak:"飞机",
question:"کدام کلمه را شنیدی؟",
options:["火车 (huǒchē)","公共汽车 (gōnggòng qìchē)","飞机 (fēijī)","汽车 (qìchē)"],
answer:"飞机 (fēijī)"
},

{
type:"audio",
speak:"自行车",
question:"کدام کلمه را شنیدی؟",
options:["飞机 (fēijī)","汽车 (qìchē)","公共汽车 (gōnggòng qìchē)","自行车 (zìxíngchē)"],
answer:"自行车 (zìxíngchē)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我有一辆汽车",
question:"جمله چینی را بساز:",
text:"من یک ماشین دارم",
words:["我","有","一辆","汽车"],
answer:["我","有","一辆","汽车"]
},

{
type:"build-zh",
speak:"她有一辆公共汽车",
question:"جمله چینی را بساز:",
text:"او یک اتوبوس دارد",
words:["她","有","一辆","公共汽车"],
answer:["她","有","一辆","公共汽车"]
},

{
type:"build-zh",
speak:"我看见一列火车",
question:"جمله چینی را بساز:",
text:"من یک قطار می‌بینم",
words:["我","看见","一列","火车"],
answer:["我","看见","一列","火车"]
},

{
type:"build-zh",
speak:"他有一架飞机",
question:"جمله چینی را بساز:",
text:"او یک هواپیما دارد",
words:["他","有","一架","飞机"],
answer:["他","有","一架","飞机"]
},

{
type:"build-zh",
speak:"我喜欢自行车",
question:"جمله چینی را بساز:",
text:"من دوچرخه را دوست دارم",
words:["我","喜欢","自行车"],
answer:["我","喜欢","自行车"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我有一辆汽车",
question:"ترجمه را بساز:",
text:"我有一辆汽车",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"她有一辆公共汽车",
question:"ترجمه را بساز:",
text:"她有一辆公共汽车",
words:["دارد","اتوبوس","یک","او"],
answer:["او","یک","اتوبوس","دارد"]
},

{
type:"build-fa",
speak:"我看见一列火车",
question:"ترجمه را بساز:",
text:"我看见一列火车",
words:["می‌بینم","قطار","یک","من"],
answer:["من","یک","قطار","می‌بینم"]
},

{
type:"build-fa",
speak:"他有一架飞机",
question:"ترجمه را بساز:",
text:"他有一架飞机",
words:["دارد","هواپیما","یک","او"],
answer:["او","یک","هواپیما","دارد"]
},

{
type:"build-fa",
speak:"我喜欢自行车",
question:"ترجمه را بساز:",
text:"我喜欢自行车",
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