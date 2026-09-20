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
question:"행복하다 (haengbokhada) کدام است؟",
speak:"행복하다",
options:[
{text:"슬프다 (seulpeuda)",image:"../../media/feelings/sad.webp"},
{text:"행복하다 (haengbokhada)",image:"../../media/feelings/happy.webp"},
{text:"화나다 (hwanada)",image:"../../media/feelings/angry.webp"},
{text:"피곤하다 (pigonhada)",image:"../../media/feelings/tired.webp"}
],
answer:"행복하다 (haengbokhada)"
},

{
type:"image",
question:"슬프다 (seulpeuda) کدام است؟",
speak:"슬프다",
options:[
{text:"피곤하다 (pigonhada)",image:"../../media/feelings/tired.webp"},
{text:"슬프다 (seulpeuda)",image:"../../media/feelings/sad.webp"},
{text:"무섭다 (museopda)",image:"../../media/feelings/scared.webp"},
{text:"행복하다 (haengbokhada)",image:"../../media/feelings/happy.webp"}
],
answer:"슬프다 (seulpeuda)"
},

{
type:"image",
question:"화나다 (hwanada) کدام است؟",
speak:"화나다",
options:[
{text:"행복하다 (haengbokhada)",image:"../../media/feelings/happy.webp"},
{text:"화나다 (hwanada)",image:"../../media/feelings/angry.webp"},
{text:"무섭다 (museopda)",image:"../../media/feelings/scared.webp"},
{text:"슬프다 (seulpeuda)",image:"../../media/feelings/sad.webp"}
],
answer:"화나다 (hwanada)"
},

{
type:"image",
question:"피곤하다 (pigonhada) کدام است؟",
speak:"피곤하다",
options:[
{text:"화나다 (hwanada)",image:"../../media/feelings/angry.webp"},
{text:"슬프다 (seulpeuda)",image:"../../media/feelings/sad.webp"},
{text:"피곤하다 (pigonhada)",image:"../../media/feelings/tired.webp"},
{text:"행복하다 (haengbokhada)",image:"../../media/feelings/happy.webp"}
],
answer:"피곤하다 (pigonhada)"
},

{
type:"image",
question:"무섭다 (museopda) کدام است؟",
speak:"무섭다",
options:[
{text:"피곤하다 (pigonhada)",image:"../../media/feelings/tired.webp"},
{text:"행복하다 (haengbokhada)",image:"../../media/feelings/happy.webp"},
{text:"슬프다 (seulpeuda)",image:"../../media/feelings/sad.webp"},
{text:"무섭다 (museopda)",image:"../../media/feelings/scared.webp"}
],
answer:"무섭다 (museopda)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["슬프다","행복하다","화나다","피곤하다"],
answer:"행복하다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["피곤하다","슬프다","무섭다","행복하다"],
answer:"슬프다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["행복하다","화나다","무섭다","슬프다"],
answer:"화나다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["화나다","슬프다","피곤하다","행복하다"],
answer:"피곤하다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["피곤하다","행복하다","슬프다","무섭다"],
answer:"무섭다"
},

/* AUDIO */

{
type:"audio",
speak:"행복하다",
question:"کدام کلمه را شنیدی؟",
options:["슬프다","행복하다","화나다","피곤하다"],
answer:"행복하다"
},

{
type:"audio",
speak:"슬프다",
question:"کدام کلمه را شنیدی؟",
options:["피곤하다","슬프다","무섭다","행복하다"],
answer:"슬프다"
},

{
type:"audio",
speak:"화나다",
question:"کدام کلمه را شنیدی؟",
options:["행복하다","화나다","무섭다","슬프다"],
answer:"화나다"
},

{
type:"audio",
speak:"피곤하다",
question:"کدام کلمه را شنیدی؟",
options:["화나다","슬프다","피곤하다","행복하다"],
answer:"피곤하다"
},

{
type:"audio",
speak:"무섭다",
question:"کدام کلمه را شنیدی؟",
options:["피곤하다","행복하다","슬프다","무섭다"],
answer:"무섭다"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 행복합니다",
question:"جمله کرهای را بساز:",
text:"من خوشحال هستم",
words:["저는","행복","합니다"],
answer:["저는","행복","합니다"]
},

{
type:"build-ko",
speak:"그녀는 슬픕니다",
question:"جمله کرهای را بساز:",
text:"او ناراحت است",
words:["그녀는","슬","픕니다"],
answer:["그녀는","슬","픕니다"]
},

{
type:"build-ko",
speak:"그는 화납니다",
question:"جمله کرهای را بساز:",
text:"او عصبانی است",
words:["그는","화","납니다"],
answer:["그는","화","납니다"]
},

{
type:"build-ko",
speak:"우리는 피곤합니다",
question:"جمله کرهای را بساز:",
text:"ما خسته هستیم",
words:["우리는","피곤","합니다"],
answer:["우리는","피곤","합니다"]
},

{
type:"build-ko",
speak:"그들은 무섭습니다",
question:"جمله کرهای را بساز:",
text:"آنها ترسیده هستند",
words:["그들은","무섭","습니다"],
answer:["그들은","무섭","습니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 행복합니다",
question:"ترجمه را بساز:",
text:"저는 행복합니다",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"그녀는 슬픕니다",
question:"ترجمه را بساز:",
text:"그녀는 슬픕니다",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"그는 화납니다",
question:"ترجمه را بساز:",
text:"그는 화납니다",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"우리는 피곤합니다",
question:"ترجمه را بساز:",
text:"우리는 피곤합니다",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"그들은 무섭습니다",
question:"ترجمه را بساز:",
text:"그들은 무섭습니다",
words:["هستند","ترسیده","آنها"],
answer:["آنها","ترسیده","هستند"]
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