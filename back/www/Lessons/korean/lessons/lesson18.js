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
question:"먹다 (meokda) کدام است؟",
speak:"먹다",
options:[
{text:"자다 (jada)",image:"../../media/actions/sleep.webp"},
{text:"먹다 (meokda)",image:"../../media/actions/eat.webp"},
{text:"걷다 (geotda)",image:"../../media/actions/walk.webp"},
{text:"읽다 (ikda)",image:"../../media/actions/read.webp"}
],
answer:"먹다 (meokda)"
},

{
type:"image",
question:"자다 (jada) کدام است؟",
speak:"자다",
options:[
{text:"쓰다 (sseuda)",image:"../../media/actions/write.webp"},
{text:"자다 (jada)",image:"../../media/actions/sleep.webp"},
{text:"먹다 (meokda)",image:"../../media/actions/eat.webp"},
{text:"걷다 (geotda)",image:"../../media/actions/walk.webp"}
],
answer:"자다 (jada)"
},

{
type:"image",
question:"걷다 (geotda) کدام است؟",
speak:"걷다",
options:[
{text:"먹다 (meokda)",image:"../../media/actions/eat.webp"},
{text:"걷다 (geotda)",image:"../../media/actions/walk.webp"},
{text:"쓰다 (sseuda)",image:"../../media/actions/write.webp"},
{text:"자다 (jada)",image:"../../media/actions/sleep.webp"}
],
answer:"걷다 (geotda)"
},

{
type:"image",
question:"읽다 (ikda) کدام است؟",
speak:"읽다",
options:[
{text:"걷다 (geotda)",image:"../../media/actions/walk.webp"},
{text:"자다 (jada)",image:"../../media/actions/sleep.webp"},
{text:"읽다 (ikda)",image:"../../media/actions/read.webp"},
{text:"먹다 (meokda)",image:"../../media/actions/eat.webp"}
],
answer:"읽다 (ikda)"
},

{
type:"image",
question:"쓰다 (sseuda) کدام است؟",
speak:"쓰다",
options:[
{text:"읽다 (ikda)",image:"../../media/actions/read.webp"},
{text:"먹다 (meokda)",image:"../../media/actions/eat.webp"},
{text:"자다 (jada)",image:"../../media/actions/sleep.webp"},
{text:"쓰다 (sseuda)",image:"../../media/actions/write.webp"}
],
answer:"쓰다 (sseuda)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["자다","먹다","걷다","읽다"],
answer:"먹다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["쓰다","자다","먹다","걷다"],
answer:"자다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["먹다","걷다","쓰다","자다"],
answer:"걷다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["걷다","자다","읽다","먹다"],
answer:"읽다"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["읽다","먹다","자다","쓰다"],
answer:"쓰다"
},

/* AUDIO */

{
type:"audio",
speak:"먹다",
question:"کدام کلمه را شنیدی؟",
options:["자다","먹다","걷다","읽다"],
answer:"먹다"
},

{
type:"audio",
speak:"자다",
question:"کدام کلمه را شنیدی؟",
options:["쓰다","자다","먹다","걷다"],
answer:"자다"
},

{
type:"audio",
speak:"걷다",
question:"کدام کلمه را شنیدی؟",
options:["먹다","걷다","쓰다","자다"],
answer:"걷다"
},

{
type:"audio",
speak:"읽다",
question:"کدام کلمه را شنیدی؟",
options:["걷다","자다","읽다","먹다"],
answer:"읽다"
},

{
type:"audio",
speak:"쓰다",
question:"کدام کلمه را شنیدی؟",
options:["읽다","먹다","자다","쓰다"],
answer:"쓰다"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 빵을 먹습니다",
question:"جمله کرهای را بساز:",
text:"من نان می‌خورم",
words:["저는","빵을","먹습니다"],
answer:["저는","빵을","먹습니다"]
},

{
type:"build-ko",
speak:"그녀는 밤에 잡니다",
question:"جمله کرهای را بساز:",
text:"او شب می‌خوابد",
words:["그녀는","밤에","잡니다"],
answer:["그녀는","밤에","잡니다"]
},

{
type:"build-ko",
speak:"그는 학교에 걷습니다",
question:"جمله کرهای را بساز:",
text:"او به مدرسه راه می‌رود",
words:["그는","학교에","걷습니다"],
answer:["그는","학교에","걷습니다"]
},

{
type:"build-ko",
speak:"저는 책을 읽습니다",
question:"جمله کرهای را بساز:",
text:"من یک کتاب می‌خوانم",
words:["저는","책을","읽습니다"],
answer:["저는","책을","읽습니다"]
},

{
type:"build-ko",
speak:"저는 편지를 씁니다",
question:"جمله کرهای را بساز:",
text:"من یک نامه می‌نویسم",
words:["저는","편지를","씁니다"],
answer:["저는","편지를","씁니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 빵을 먹습니다",
question:"ترجمه را بساز:",
text:"저는 빵을 먹습니다",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"그녀는 밤에 잡니다",
question:"ترجمه را بساز:",
text:"그녀는 밤에 잡니다",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"그는 학교에 걷습니다",
question:"ترجمه را بساز:",
text:"그는 학교에 걷습니다",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"저는 책을 읽습니다",
question:"ترجمه را بساز:",
text:"저는 책을 읽습니다",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"저는 편지를 씁니다",
question:"ترجمه را بساز:",
text:"저는 편지를 씁니다",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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