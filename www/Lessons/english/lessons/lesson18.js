let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "en-US",
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
  utter.lang = "en-US";
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
question:"eat کدام است؟",
speak:"eat",
options:[
{text:"sleep",image:"../../media/actions/sleep.webp"},
{text:"eat",image:"../../media/actions/eat.webp"},
{text:"walk",image:"../../media/actions/walk.webp"},
{text:"read",image:"../../media/actions/read.webp"}
],
answer:"eat"
},

{
type:"image",
question:"sleep کدام است؟",
speak:"sleep",
options:[
{text:"write",image:"../../media/actions/write.webp"},
{text:"sleep",image:"../../media/actions/sleep.webp"},
{text:"eat",image:"../../media/actions/eat.webp"},
{text:"walk",image:"../../media/actions/walk.webp"}
],
answer:"sleep"
},

{
type:"image",
question:"walk کدام است؟",
speak:"walk",
options:[
{text:"eat",image:"../../media/actions/eat.webp"},
{text:"walk",image:"../../media/actions/walk.webp"},
{text:"write",image:"../../media/actions/write.webp"},
{text:"sleep",image:"../../media/actions/sleep.webp"}
],
answer:"walk"
},

{
type:"image",
question:"read کدام است؟",
speak:"read",
options:[
{text:"walk",image:"../../media/actions/walk.webp"},
{text:"sleep",image:"../../media/actions/sleep.webp"},
{text:"read",image:"../../media/actions/read.webp"},
{text:"eat",image:"../../media/actions/eat.webp"}
],
answer:"read"
},

{
type:"image",
question:"write کدام است؟",
speak:"write",
options:[
{text:"read",image:"../../media/actions/read.webp"},
{text:"eat",image:"../../media/actions/eat.webp"},
{text:"sleep",image:"../../media/actions/sleep.webp"},
{text:"write",image:"../../media/actions/write.webp"}
],
answer:"write"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["sleep","eat","walk","read"],
answer:"eat"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["write","sleep","eat","walk"],
answer:"sleep"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["eat","walk","write","sleep"],
answer:"walk"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["walk","sleep","read","eat"],
answer:"read"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["read","eat","sleep","write"],
answer:"write"
},

/* AUDIO */

{
type:"audio",
speak:"eat",
question:"کدام کلمه را شنیدی؟",
options:["sleep","eat","walk","read"],
answer:"eat"
},

{
type:"audio",
speak:"sleep",
question:"کدام کلمه را شنیدی؟",
options:["write","sleep","eat","walk"],
answer:"sleep"
},

{
type:"audio",
speak:"walk",
question:"کدام کلمه را شنیدی؟",
options:["eat","walk","write","sleep"],
answer:"walk"
},

{
type:"audio",
speak:"read",
question:"کدام کلمه را شنیدی؟",
options:["walk","sleep","read","eat"],
answer:"read"
},

{
type:"audio",
speak:"write",
question:"کدام کلمه را شنیدی؟",
options:["read","eat","sleep","write"],
answer:"write"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I eat bread",
question:"جمله انگلیسی را بساز:",
text:"من نان می‌خورم",
words:["eat","bread","I"],
answer:["I","eat","bread"]
},

{
type:"build-en",
speak:"She sleeps at night",
question:"جمله انگلیسی را بساز:",
text:"او شب می‌خوابد",
words:["sleeps","at","night","She"],
answer:["She","sleeps","at","night"]
},

{
type:"build-en",
speak:"He walks to school",
question:"جمله انگلیسی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["walks","to","school","He"],
answer:["He","walks","to","school"]
},

{
type:"build-en",
speak:"I read a book",
question:"جمله انگلیسی را بساز:",
text:"من یک کتاب می‌خوانم",
words:["read","book","a","I"],
answer:["I","read","a","book"]
},

{
type:"build-en",
speak:"I write a letter",
question:"جمله انگلیسی را بساز:",
text:"من یک نامه می‌نویسم",
words:["write","letter","a","I"],
answer:["I","write","a","letter"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I eat bread",
question:"ترجمه را بساز:",
text:"I eat bread",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"She sleeps at night",
question:"ترجمه را بساز:",
text:"She sleeps at night",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"He walks to school",
question:"ترجمه را بساز:",
text:"He walks to school",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"I read a book",
question:"ترجمه را بساز:",
text:"I read a book",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"I write a letter",
question:"ترجمه را بساز:",
text:"I write a letter",
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

  // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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

  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
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