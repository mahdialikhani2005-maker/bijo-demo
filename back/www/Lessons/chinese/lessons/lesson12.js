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
question:"一 (yī) کدام است؟",
speak:"一",
options:[
{text:"二 (èr)",image:"../../media/numbers/two.webp"},
{text:"一 (yī)",image:"../../media/numbers/one.webp"},
{text:"三 (sān)",image:"../../media/numbers/three.webp"},
{text:"四 (sì)",image:"../../media/numbers/four.webp"}
],
answer:"一 (yī)"
},

{
type:"image",
question:"二 (èr) کدام است؟",
speak:"二",
options:[
{text:"四 (sì)",image:"../../media/numbers/four.webp"},
{text:"二 (èr)",image:"../../media/numbers/two.webp"},
{text:"五 (wǔ)",image:"../../media/numbers/five.webp"},
{text:"一 (yī)",image:"../../media/numbers/one.webp"}
],
answer:"二 (èr)"
},

{
type:"image",
question:"三 (sān) کدام است؟",
speak:"三",
options:[
{text:"一 (yī)",image:"../../media/numbers/one.webp"},
{text:"三 (sān)",image:"../../media/numbers/three.webp"},
{text:"五 (wǔ)",image:"../../media/numbers/five.webp"},
{text:"二 (èr)",image:"../../media/numbers/two.webp"}
],
answer:"三 (sān)"
},

{
type:"image",
question:"四 (sì) کدام است؟",
speak:"四",
options:[
{text:"三 (sān)",image:"../../media/numbers/three.webp"},
{text:"二 (èr)",image:"../../media/numbers/two.webp"},
{text:"四 (sì)",image:"../../media/numbers/four.webp"},
{text:"一 (yī)",image:"../../media/numbers/one.webp"}
],
answer:"四 (sì)"
},

{
type:"image",
question:"五 (wǔ) کدام است؟",
speak:"五",
options:[
{text:"四 (sì)",image:"../../media/numbers/four.webp"},
{text:"一 (yī)",image:"../../media/numbers/one.webp"},
{text:"二 (èr)",image:"../../media/numbers/two.webp"},
{text:"五 (wǔ)",image:"../../media/numbers/five.webp"}
],
answer:"五 (wǔ)"
},

/* WORD */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["二 (èr)","一 (yī)","三 (sān)","四 (sì)"],
answer:"一 (yī)"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["四 (sì)","二 (èr)","五 (wǔ)","一 (yī)"],
answer:"二 (èr)"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["一 (yī)","三 (sān)","五 (wǔ)","二 (èr)"],
answer:"三 (sān)"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["三 (sān)","二 (èr)","四 (sì)","一 (yī)"],
answer:"四 (sì)"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["四 (sì)","一 (yī)","二 (èr)","五 (wǔ)"],
answer:"五 (wǔ)"
},

/* AUDIO */

{
type:"audio",
speak:"一",
question:"کدام کلمه را شنیدی؟",
options:["二 (èr)","一 (yī)","三 (sān)","四 (sì)"],
answer:"一 (yī)"
},

{
type:"audio",
speak:"二",
question:"کدام کلمه را شنیدی؟",
options:["四 (sì)","二 (èr)","五 (wǔ)","一 (yī)"],
answer:"二 (èr)"
},

{
type:"audio",
speak:"三",
question:"کدام کلمه را شنیدی؟",
options:["一 (yī)","三 (sān)","五 (wǔ)","二 (èr)"],
answer:"三 (sān)"
},

{
type:"audio",
speak:"四",
question:"کدام کلمه را شنیدی؟",
options:["三 (sān)","二 (èr)","四 (sì)","一 (yī)"],
answer:"四 (sì)"
},

{
type:"audio",
speak:"五",
question:"کدام کلمه را شنیدی؟",
options:["四 (sì)","一 (yī)","二 (èr)","五 (wǔ)"],
answer:"五 (wǔ)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"我有一只猫",
question:"جمله چینی را بساز:",
text:"من یک گربه دارم",
words:["我","有","一只","猫"],
answer:["我","有","一只","猫"]
},

{
type:"build-zh",
speak:"她有两只狗",
question:"جمله چینی را بساز:",
text:"او دو سگ دارد",
words:["她","有","两只","狗"],
answer:["她","有","两只","狗"]
},

{
type:"build-zh",
speak:"我看见三只鸟",
question:"جمله چینی را بساز:",
text:"من سه پرنده می‌بینم",
words:["我","看见","三只","鸟"],
answer:["我","看见","三只","鸟"]
},

{
type:"build-zh",
speak:"他有四个苹果",
question:"جمله چینی را بساز:",
text:"او چهار سیب دارد",
words:["他","有","四个","苹果"],
answer:["他","有","四个","苹果"]
},

{
type:"build-zh",
speak:"我吃五个面包",
question:"جمله چینی را بساز:",
text:"من پنج نان می‌خورم",
words:["我","吃","五个","面包"],
answer:["我","吃","五个","面包"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"我有一只猫",
question:"ترجمه را بساز:",
text:"我有一只猫",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"她有两只狗",
question:"ترجمه را بساز:",
text:"她有两只狗",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"我看见三只鸟",
question:"ترجمه را بساز:",
text:"我看见三只鸟",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"他有四个苹果",
question:"ترجمه را بساز:",
text:"他有四个苹果",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"我吃五个面包",
question:"ترجمه را بساز:",
text:"我吃五个面包",
words:["می‌خورم","پنج","نان","من"],
answer:["من","پنج","نان","می‌خورم"]
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