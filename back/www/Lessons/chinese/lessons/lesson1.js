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
question:"人 (rén) کدام است؟",
speak:"人",
options:[
{text:"女人 (nǚrén)",image:"../../media/people/woman.webp"},
{text:"人 (rén)",image:"../../media/people/man.webp"},
{text:"男孩 (nánhái)",image:"../../media/people/boy.webp"},
{text:"女孩 (nǚhái)",image:"../../media/people/girl.webp"}
],
answer:"人 (rén)"
},

{
type:"image",
question:"女人 (nǚrén) کدام است؟",
speak:"女人",
options:[
{text:"女孩 (nǚhái)",image:"../../media/people/girl.webp"},
{text:"女人 (nǚrén)",image:"../../media/people/woman.webp"},
{text:"男孩 (nánhái)",image:"../../media/people/boy.webp"},
{text:"人 (rén)",image:"../../media/people/man.webp"}
],
answer:"女人 (nǚrén)"
},

{
type:"image",
question:"男孩 (nánhái) کدام است؟",
speak:"男孩",
options:[
{text:"人 (rén)",image:"../../media/people/man.webp"},
{text:"男孩 (nánhái)",image:"../../media/people/boy.webp"},
{text:"婴儿 (yīng'ér)",image:"../../media/people/baby.webp"},
{text:"女孩 (nǚhái)",image:"../../media/people/girl.webp"}
],
answer:"男孩 (nánhái)"
},

{
type:"image",
question:"女孩 (nǚhái) کدام است؟",
speak:"女孩",
options:[
{text:"男孩 (nánhái)",image:"../../media/people/boy.webp"},
{text:"人 (rén)",image:"../../media/people/man.webp"},
{text:"女孩 (nǚhái)",image:"../../media/people/girl.webp"},
{text:"婴儿 (yīng'ér)",image:"../../media/people/baby.webp"}
],
answer:"女孩 (nǚhái)"
},

{
type:"image",
question:"婴儿 (yīng'ér) کدام است؟",
speak:"婴儿",
options:[
{text:"女孩 (nǚhái)",image:"../../media/people/girl.webp"},
{text:"男孩 (nánhái)",image:"../../media/people/boy.webp"},
{text:"人 (rén)",image:"../../media/people/man.webp"},
{text:"婴儿 (yīng'ér)",image:"../../media/people/baby.webp"}
],
answer:"婴儿 (yīng'ér)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["男孩 (nánhái)","人 (rén)","女人 (nǚrén)","女孩 (nǚhái)"],
answer:"人 (rén)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["女人 (nǚrén)","女孩 (nǚhái)","婴儿 (yīng'ér)","人 (rén)"],
answer:"女人 (nǚrén)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["男孩 (nánhái)","人 (rén)","婴儿 (yīng'ér)","女孩 (nǚhái)"],
answer:"男孩 (nánhái)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["女孩 (nǚhái)","女人 (nǚrén)","男孩 (nánhái)","婴儿 (yīng'ér)"],
answer:"女孩 (nǚhái)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["婴儿 (yīng'ér)","男孩 (nánhái)","女孩 (nǚhái)","人 (rén)"],
answer:"婴儿 (yīng'ér)"
},

/* AUDIO */

{
type:"audio",
speak:"人",
question:"کدام کلمه را شنیدی؟",
options:["人 (rén)","男孩 (nánhái)","女人 (nǚrén)","女孩 (nǚhái)"],
answer:"人 (rén)"
},

{
type:"audio",
speak:"女人",
question:"کدام کلمه را شنیدی؟",
options:["女孩 (nǚhái)","女人 (nǚrén)","男孩 (nánhái)","人 (rén)"],
answer:"女人 (nǚrén)"
},

{
type:"audio",
speak:"男孩",
question:"کدام کلمه را شنیدی؟",
options:["男孩 (nánhái)","人 (rén)","婴儿 (yīng'ér)","女孩 (nǚhái)"],
answer:"男孩 (nánhái)"
},

{
type:"audio",
speak:"女孩",
question:"کدام کلمه را شنیدی؟",
options:["男孩 (nánhái)","女人 (nǚrén)","女孩 (nǚhái)","婴儿 (yīng'ér)"],
answer:"女孩 (nǚhái)"
},

{
type:"audio",
speak:"婴儿",
question:"کدام کلمه را شنیدی؟",
options:["婴儿 (yīng'ér)","男孩 (nánhái)","人 (rén)","女孩 (nǚhái)"],
answer:"婴儿 (yīng'ér)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"这是人",
question:"جمله چینی را بساز:",
text:"این یک مرد است",
words:["这是","人"],
answer:["这是","人"]
},

{
type:"build-zh",
speak:"这是女人",
question:"جمله چینی را بساز:",
text:"این یک زن است",
words:["这是","女人"],
answer:["这是","女人"]
},

{
type:"build-zh",
speak:"这是男孩",
question:"جمله چینی را بساز:",
text:"این یک پسر است",
words:["这是","男孩"],
answer:["这是","男孩"]
},

{
type:"build-zh",
speak:"这是女孩",
question:"جمله چینی را بساز:",
text:"این یک دختر است",
words:["这是","女孩"],
answer:["这是","女孩"]
},

{
type:"build-zh",
speak:"婴儿小",
question:"جمله چینی را بساز:",
text:"نوزاد کوچک است",
words:["婴儿","小"],
answer:["婴儿","小"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"这是人",
question:"ترجمه را بساز:",
text:"这是人",
words:["است","مرد","این"],
answer:["این","مرد","است"]
},

{
type:"build-fa",
speak:"这是女人",
question:"ترجمه را بساز:",
text:"这是女人",
words:["است","زن","این"],
answer:["این","زن","است"]
},

{
type:"build-fa",
speak:"这是男孩",
question:"ترجمه را بساز:",
text:"这是男孩",
words:["است","پسر","این"],
answer:["این","پسر","است"]
},

{
type:"build-fa",
speak:"这是女孩",
question:"ترجمه را بساز:",
text:"这是女孩",
words:["است","دختر","این"],
answer:["این","دختر","است"]
},

{
type:"build-fa",
speak:"婴儿小",
question:"ترجمه را بساز:",
text:"婴儿小",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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