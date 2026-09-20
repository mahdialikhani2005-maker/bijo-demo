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
question:"头 (tóu) کدام است؟",
speak:"头",
options:[
{text:"手 (shǒu)",image:"../../media/body/hand.webp"},
{text:"头 (tóu)",image:"../../media/body/head.webp"},
{text:"眼睛 (yǎnjīng)",image:"../../media/body/eye.webp"},
{text:"鼻子 (bízi)",image:"../../media/body/nose.webp"}
],
answer:"头 (tóu)"
},

{
type:"image",
question:"手 (shǒu) کدام است؟",
speak:"手",
options:[
{text:"眼睛 (yǎnjīng)",image:"../../media/body/eye.webp"},
{text:"手 (shǒu)",image:"../../media/body/hand.webp"},
{text:"脚 (jiǎo)",image:"../../media/body/foot.webp"},
{text:"头 (tóu)",image:"../../media/body/head.webp"}
],
answer:"手 (shǒu)"
},

{
type:"image",
question:"眼睛 (yǎnjīng) کدام است؟",
speak:"眼睛",
options:[
{text:"头 (tóu)",image:"../../media/body/head.webp"},
{text:"眼睛 (yǎnjīng)",image:"../../media/body/eye.webp"},
{text:"鼻子 (bízi)",image:"../../media/body/nose.webp"},
{text:"手 (shǒu)",image:"../../media/body/hand.webp"}
],
answer:"眼睛 (yǎnjīng)"
},

{
type:"image",
question:"脚 (jiǎo) کدام است؟",
speak:"脚",
options:[
{text:"手 (shǒu)",image:"../../media/body/hand.webp"},
{text:"头 (tóu)",image:"../../media/body/head.webp"},
{text:"脚 (jiǎo)",image:"../../media/body/foot.webp"},
{text:"眼睛 (yǎnjīng)",image:"../../media/body/eye.webp"}
],
answer:"脚 (jiǎo)"
},

{
type:"image",
question:"鼻子 (bízi) کدام است؟",
speak:"鼻子",
options:[
{text:"眼睛 (yǎnjīng)",image:"../../media/body/eye.webp"},
{text:"鼻子 (bízi)",image:"../../media/body/nose.webp"},
{text:"头 (tóu)",image:"../../media/body/head.webp"},
{text:"手 (shǒu)",image:"../../media/body/hand.webp"}
],
answer:"鼻子 (bízi)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["手 (shǒu)","头 (tóu)","眼睛 (yǎnjīng)","鼻子 (bízi)"],
answer:"头 (tóu)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["眼睛 (yǎnjīng)","手 (shǒu)","脚 (jiǎo)","头 (tóu)"],
answer:"手 (shǒu)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["头 (tóu)","眼睛 (yǎnjīng)","鼻子 (bízi)","手 (shǒu)"],
answer:"眼睛 (yǎnjīng)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["手 (shǒu)","脚 (jiǎo)","头 (tóu)","眼睛 (yǎnjīng)"],
answer:"脚 (jiǎo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["眼睛 (yǎnjīng)","鼻子 (bízi)","手 (shǒu)","头 (tóu)"],
answer:"鼻子 (bízi)"
},

/* AUDIO */

{
type:"audio",
speak:"头",
question:"کدام کلمه را شنیدی؟",
options:["手 (shǒu)","头 (tóu)","眼睛 (yǎnjīng)","鼻子 (bízi)"],
answer:"头 (tóu)"
},

{
type:"audio",
speak:"手",
question:"کدام کلمه را شنیدی؟",
options:["眼睛 (yǎnjīng)","手 (shǒu)","脚 (jiǎo)","头 (tóu)"],
answer:"手 (shǒu)"
},

{
type:"audio",
speak:"眼睛",
question:"کدام کلمه را شنیدی؟",
options:["头 (tóu)","眼睛 (yǎnjīng)","鼻子 (bízi)","手 (shǒu)"],
answer:"眼睛 (yǎnjīng)"
},

{
type:"audio",
speak:"脚",
question:"کدام کلمه را شنیدی؟",
options:["手 (shǒu)","脚 (jiǎo)","头 (tóu)","眼睛 (yǎnjīng)"],
answer:"脚 (jiǎo)"
},

{
type:"audio",
speak:"鼻子",
question:"کدام کلمه را شنیدی؟",
options:["眼睛 (yǎnjīng)","鼻子 (bízi)","手 (shǒu)","头 (tóu)"],
answer:"鼻子 (bízi)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我有一个头",
question:"جمله چینی را بساز:",
text:"من یک سر دارم",
words:["我有","一个","头"],
answer:["我有","一个","头"]
},

{
type:"build-zh",
speak:"你有一只手",
question:"جمله چینی را بساز:",
text:"تو یک دست داری",
words:["你","有","一只","手"],
answer:["你","有","一只","手"]
},

{
type:"build-zh",
speak:"她有两只眼睛",
question:"جمله چینی را بساز:",
text:"او دو چشم دارد",
words:["她","有","两只","眼睛"],
answer:["她","有","两只","眼睛"]
},

{
type:"build-zh",
speak:"他有一个鼻子",
question:"جمله چینی را بساز:",
text:"او یک بینی دارد",
words:["他","有","一个","鼻子"],
answer:["他","有","一个","鼻子"]
},

{
type:"build-zh",
speak:"这是我的脚",
question:"جمله چینی را بساز:",
text:"این پای من است",
words:["这","是","我的","脚"],
answer:["这","是","我的","脚"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我有一个头",
question:"ترجمه را بساز:",
text:"我有一个头",
words:["دارم","سر","یک","من"],
answer:["من","یک","سر","دارم"]
},

{
type:"build-fa",
speak:"你有一只手",
question:"ترجمه را بساز:",
text:"你有一只手",
words:["یک","داری","دست","تو"],
answer:["تو","یک","دست","داری"]
},

{
type:"build-fa",
speak:"她有两只眼睛",
question:"ترجمه را بساز:",
text:"她有两只眼睛",
words:["دارد","او","دو","چشم"],
answer:["او","دو","چشم","دارد"]
},

{
type:"build-fa",
speak:"他有一个鼻子",
question:"ترجمه را بساز:",
text:"他有一个鼻子",
words:["دارد","یک","او","بینی"],
answer:["او","یک","بینی","دارد"]
},

{
type:"build-fa",
speak:"这是我的脚",
question:"ترجمه را بساز:",
text:"这是我的脚",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
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