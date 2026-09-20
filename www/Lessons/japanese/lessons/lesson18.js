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
question:"食べる (taberu) کدام است؟",
speak:"食べる",
options:[
{text:"寝る (neru)",image:"../../media/actions/sleep.webp"},
{text:"食べる (taberu)",image:"../../media/actions/eat.webp"},
{text:"歩く (aruku)",image:"../../media/actions/walk.webp"},
{text:"読む (yomu)",image:"../../media/actions/read.webp"}
],
answer:"食べる (taberu)"
},

{
type:"image",
question:"寝る (neru) کدام است؟",
speak:"寝る",
options:[
{text:"書く (kaku)",image:"../../media/actions/write.webp"},
{text:"寝る (neru)",image:"../../media/actions/sleep.webp"},
{text:"食べる (taberu)",image:"../../media/actions/eat.webp"},
{text:"歩く (aruku)",image:"../../media/actions/walk.webp"}
],
answer:"寝る (neru)"
},

{
type:"image",
question:"歩く (aruku) کدام است؟",
speak:"歩く",
options:[
{text:"食べる (taberu)",image:"../../media/actions/eat.webp"},
{text:"歩く (aruku)",image:"../../media/actions/walk.webp"},
{text:"書く (kaku)",image:"../../media/actions/write.webp"},
{text:"寝る (neru)",image:"../../media/actions/sleep.webp"}
],
answer:"歩く (aruku)"
},

{
type:"image",
question:"読む (yomu) کدام است؟",
speak:"読む",
options:[
{text:"歩く (aruku)",image:"../../media/actions/walk.webp"},
{text:"寝る (neru)",image:"../../media/actions/sleep.webp"},
{text:"読む (yomu)",image:"../../media/actions/read.webp"},
{text:"食べる (taberu)",image:"../../media/actions/eat.webp"}
],
answer:"読む (yomu)"
},

{
type:"image",
question:"書く (kaku) کدام است؟",
speak:"書く",
options:[
{text:"読む (yomu)",image:"../../media/actions/read.webp"},
{text:"食べる (taberu)",image:"../../media/actions/eat.webp"},
{text:"寝る (neru)",image:"../../media/actions/sleep.webp"},
{text:"書く (kaku)",image:"../../media/actions/write.webp"}
],
answer:"書く (kaku)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["寝る","食べる","歩く","読む"],
answer:"食べる"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["書く","寝る","食べる","歩く"],
answer:"寝る"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["食べる","歩く","書く","寝る"],
answer:"歩く"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["歩く","寝る","読む","食べる"],
answer:"読む"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["読む","食べる","寝る","書く"],
answer:"書く"
},

/* AUDIO */

{
type:"audio",
speak:"食べる",
question:"کدام کلمه را شنیدی؟",
options:["寝る","食べる","歩く","読む"],
answer:"食べる"
},

{
type:"audio",
speak:"寝る",
question:"کدام کلمه را شنیدی؟",
options:["書く","寝る","食べる","歩く"],
answer:"寝る"
},

{
type:"audio",
speak:"歩く",
question:"کدام کلمه را شنیدی؟",
options:["食べる","歩く","書く","寝る"],
answer:"歩く"
},

{
type:"audio",
speak:"読む",
question:"کدام کلمه را شنیدی؟",
options:["歩く","寝る","読む","食べる"],
answer:"読む"
},

{
type:"audio",
speak:"書く",
question:"کدام کلمه را شنیدی؟",
options:["読む","食べる","寝る","書く"],
answer:"書く"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"私はパンを食べます",
question:"جمله ژاپنی را بساز:",
text:"من نان می‌خورم",
words:["私","は","パン","を","食べます"],
answer:["私","は","パン","を","食べます"]
},

{
type:"build-jp",
speak:"彼女は夜に寝ます",
question:"جمله ژاپنی را بساز:",
text:"او شب می‌خوابد",
words:["彼女","は","夜","に","寝ます"],
answer:["彼女","は","夜","に","寝ます"]
},

{
type:"build-jp",
speak:"彼は学校へ歩きます",
question:"جمله ژاپنی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["彼","は","学校","へ","歩きます"],
answer:["彼","は","学校","へ","歩きます"]
},

{
type:"build-jp",
speak:"私は本を読みます",
question:"جمله ژاپنی را بساز:",
text:"من یک کتاب می‌خوانم",
words:["私","は","本","を","読みます"],
answer:["私","は","本","を","読みます"]
},

{
type:"build-jp",
speak:"私は手紙を書きます",
question:"جمله ژاپنی را بساز:",
text:"من یک نامه می‌نویسم",
words:["私","は","手紙","を","書きます"],
answer:["私","は","手紙","を","書きます"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"私はパンを食べます",
question:"ترجمه را بساز:",
text:"私はパンを食べます",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"彼女は夜に寝ます",
question:"ترجمه را بساز:",
text:"彼女は夜に寝ます",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"彼は学校へ歩きます",
question:"ترجمه را بساز:",
text:"彼は学校へ歩きます",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"私は本を読みます",
question:"ترجمه را بساز:",
text:"私は本を読みます",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"私は手紙を書きます",
question:"ترجمه را بساز:",
text:"私は手紙を書きます",
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