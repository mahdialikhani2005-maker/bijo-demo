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
question:"狗 (gǒu) کدام است؟",
speak:"狗",
options:[
{text:"猫 (māo)",image:"../../media/animals/cat.webp"},
{text:"狗 (gǒu)",image:"../../media/animals/dog.webp"},
{text:"鸟 (niǎo)",image:"../../media/animals/bird.webp"},
{text:"鱼 (yú)",image:"../../media/animals/fish.webp"}
],
answer:"狗 (gǒu)"
},

{
type:"image",
question:"猫 (māo) کدام است؟",
speak:"猫",
options:[
{text:"鱼 (yú)",image:"../../media/animals/fish.webp"},
{text:"猫 (māo)",image:"../../media/animals/cat.webp"},
{text:"马 (mǎ)",image:"../../media/animals/horse.webp"},
{text:"狗 (gǒu)",image:"../../media/animals/dog.webp"}
],
answer:"猫 (māo)"
},

{
type:"image",
question:"鸟 (niǎo) کدام است؟",
speak:"鸟",
options:[
{text:"狗 (gǒu)",image:"../../media/animals/dog.webp"},
{text:"鸟 (niǎo)",image:"../../media/animals/bird.webp"},
{text:"马 (mǎ)",image:"../../media/animals/horse.webp"},
{text:"猫 (māo)",image:"../../media/animals/cat.webp"}
],
answer:"鸟 (niǎo)"
},

{
type:"image",
question:"鱼 (yú) کدام است؟",
speak:"鱼",
options:[
{text:"鸟 (niǎo)",image:"../../media/animals/bird.webp"},
{text:"猫 (māo)",image:"../../media/animals/cat.webp"},
{text:"鱼 (yú)",image:"../../media/animals/fish.webp"},
{text:"狗 (gǒu)",image:"../../media/animals/dog.webp"}
],
answer:"鱼 (yú)"
},

{
type:"image",
question:"马 (mǎ) کدام است؟",
speak:"马",
options:[
{text:"鱼 (yú)",image:"../../media/animals/fish.webp"},
{text:"狗 (gǒu)",image:"../../media/animals/dog.webp"},
{text:"猫 (māo)",image:"../../media/animals/cat.webp"},
{text:"马 (mǎ)",image:"../../media/animals/horse.webp"}
],
answer:"马 (mǎ)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/dog.webp",
options:["猫 (māo)","狗 (gǒu)","鸟 (niǎo)","鱼 (yú)"],
answer:"狗 (gǒu)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/cat.webp",
options:["鱼 (yú)","猫 (māo)","马 (mǎ)","狗 (gǒu)"],
answer:"猫 (māo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/bird.webp",
options:["狗 (gǒu)","鸟 (niǎo)","马 (mǎ)","猫 (māo)"],
answer:"鸟 (niǎo)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/fish.webp",
options:["鸟 (niǎo)","猫 (māo)","鱼 (yú)","狗 (gǒu)"],
answer:"鱼 (yú)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/horse.webp",
options:["鱼 (yú)","狗 (gǒu)","猫 (māo)","马 (mǎ)"],
answer:"马 (mǎ)"
},

/* AUDIO */

{
type:"audio",
speak:"狗",
question:"کدام کلمه را شنیدی؟",
options:["猫 (māo)","狗 (gǒu)","鸟 (niǎo)","鱼 (yú)"],
answer:"狗 (gǒu)"
},

{
type:"audio",
speak:"猫",
question:"کدام کلمه را شنیدی؟",
options:["鱼 (yú)","猫 (māo)","马 (mǎ)","狗 (gǒu)"],
answer:"猫 (māo)"
},

{
type:"audio",
speak:"鸟",
question:"کدام کلمه را شنیدی؟",
options:["狗 (gǒu)","鸟 (niǎo)","马 (mǎ)","猫 (māo)"],
answer:"鸟 (niǎo)"
},

{
type:"audio",
speak:"鱼",
question:"کدام کلمه را شنیدی؟",
options:["鸟 (niǎo)","猫 (māo)","鱼 (yú)","狗 (gǒu)"],
answer:"鱼 (yú)"
},

{
type:"audio",
speak:"马",
question:"کدام کلمه را شنیدی؟",
options:["鱼 (yú)","狗 (gǒu)","猫 (māo)","马 (mǎ)"],
answer:"马 (mǎ)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我有一只狗",
question:"جمله چینی را بساز:",
text:"من یک سگ دارم",
words:["我","有","一只","狗"],
answer:["我","有","一只","狗"]
},

{
type:"build-zh",
speak:"她有一只猫",
question:"جمله چینی را بساز:",
text:"او یک گربه دارد",
words:["她","有","一只","猫"],
answer:["她","有","一只","猫"]
},

{
type:"build-zh",
speak:"我看见一只鸟",
question:"جمله چینی را بساز:",
text:"من یک پرنده می‌بینم",
words:["我","看见","一只","鸟"],
answer:["我","看见","一只","鸟"]
},

{
type:"build-zh",
speak:"他有一条鱼",
question:"جمله چینی را بساز:",
text:"او یک ماهی دارد",
words:["他","有","一条","鱼"],
answer:["他","有","一条","鱼"]
},

{
type:"build-zh",
speak:"这是一匹马",
question:"جمله چینی را بساز:",
text:"این یک اسب است",
words:["这","是","一匹","马"],
answer:["这","是","一匹","马"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我有一只狗",
question:"ترجمه را بساز:",
text:"我有一只狗",
words:["دارم","سگ","یک","من"],
answer:["من","یک","سگ","دارم"]
},

{
type:"build-fa",
speak:"她有一只猫",
question:"ترجمه را بساز:",
text:"她有一只猫",
words:["دارد","گربه","یک","او"],
answer:["او","یک","گربه","دارد"]
},

{
type:"build-fa",
speak:"我看见一只鸟",
question:"ترجمه را بساز:",
text:"我看见一只鸟",
words:["می‌بینم","پرنده","یک","من"],
answer:["من","یک","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"他有一条鱼",
question:"ترجمه را بساز:",
text:"他有一条鱼",
words:["دارد","ماهی","یک","او"],
answer:["او","یک","ماهی","دارد"]
},

{
type:"build-fa",
speak:"这是一匹马",
question:"ترجمه را بساز:",
text:"这是一匹马",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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