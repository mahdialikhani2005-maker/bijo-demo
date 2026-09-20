let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "tr-TR",
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
  utter.lang = "tr-TR";
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

/* IMAGE - اعداد ۱ تا ۵ */

{
type:"image",
question:"Bir کدام است؟",
speak:"bir",
options:[
{text:"iki",image:"../../media/numbers/two.webp"},
{text:"bir",image:"../../media/numbers/one.webp"},
{text:"üç",image:"../../media/numbers/three.webp"},
{text:"dört",image:"../../media/numbers/four.webp"}
],
answer:"bir"
},

{
type:"image",
question:"İki کدام است؟",
speak:"iki",
options:[
{text:"dört",image:"../../media/numbers/four.webp"},
{text:"iki",image:"../../media/numbers/two.webp"},
{text:"beş",image:"../../media/numbers/five.webp"},
{text:"bir",image:"../../media/numbers/one.webp"}
],
answer:"iki"
},

{
type:"image",
question:"Üç کدام است؟",
speak:"üç",
options:[
{text:"bir",image:"../../media/numbers/one.webp"},
{text:"üç",image:"../../media/numbers/three.webp"},
{text:"beş",image:"../../media/numbers/five.webp"},
{text:"iki",image:"../../media/numbers/two.webp"}
],
answer:"üç"
},

{
type:"image",
question:"Dört کدام است؟",
speak:"dört",
options:[
{text:"üç",image:"../../media/numbers/three.webp"},
{text:"iki",image:"../../media/numbers/two.webp"},
{text:"dört",image:"../../media/numbers/four.webp"},
{text:"bir",image:"../../media/numbers/one.webp"}
],
answer:"dört"
},

{
type:"image",
question:"Beş کدام است؟",
speak:"beş",
options:[
{text:"dört",image:"../../media/numbers/four.webp"},
{text:"bir",image:"../../media/numbers/one.webp"},
{text:"iki",image:"../../media/numbers/two.webp"},
{text:"beş",image:"../../media/numbers/five.webp"}
],
answer:"beş"
},

/* WORD - عدد از روی تصویر */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["iki","bir","üç","dört"],
answer:"bir"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["dört","iki","beş","bir"],
answer:"iki"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["bir","üç","beş","iki"],
answer:"üç"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["üç","iki","dört","bir"],
answer:"dört"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["dört","bir","iki","beş"],
answer:"beş"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"bir",
question:"کدام عدد را شنیدی؟",
options:["iki","bir","üç","dört"],
answer:"bir"
},

{
type:"audio",
speak:"iki",
question:"کدام عدد را شنیدی؟",
options:["dört","iki","beş","bir"],
answer:"iki"
},

{
type:"audio",
speak:"üç",
question:"کدام عدد را شنیدی؟",
options:["bir","üç","beş","iki"],
answer:"üç"
},

{
type:"audio",
speak:"dört",
question:"کدام عدد را شنیدی؟",
options:["üç","iki","dört","bir"],
answer:"dört"
},

{
type:"audio",
speak:"beş",
question:"کدام عدد را شنیدی؟",
options:["dört","bir","iki","beş"],
answer:"beş"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Bir kedim var",
question:"جمله ترکی را بساز:",
text:"من یک گربه دارم",
words:["Bir","kedim","var"],
answer:["Bir","kedim","var"]
},

{
type:"build-tr",
speak:"İki köpeği var",
question:"جمله ترکی را بساز:",
text:"او دو سگ دارد",
words:["İki","köpeği","var"],
answer:["İki","köpeği","var"]
},

{
type:"build-tr",
speak:"Üç kuş görüyorum",
question:"جمله ترکی را بساز:",
text:"من سه پرنده می‌بینم",
words:["Üç","kuş","görüyorum"],
answer:["Üç","kuş","görüyorum"]
},

{
type:"build-tr",
speak:"Dört elması var",
question:"جمله ترکی را بساز:",
text:"او چهار سیب دارد",
words:["Dört","elması","var"],
answer:["Dört","elması","var"]
},

{
type:"build-tr",
speak:"Beş ekmek yiyorum",
question:"جمله ترکی را بساز:",
text:"من پنج نان می‌خورم",
words:["Beş","ekmek","yiyorum"],
answer:["Beş","ekmek","yiyorum"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Bir kedim var",
question:"ترجمه را بساز:",
text:"Bir kedim var",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"İki köpeği var",
question:"ترجمه را بساز:",
text:"İki köpeği var",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"Üç kuş görüyorum",
question:"ترجمه را بساز:",
text:"Üç kuş görüyorum",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Dört elması var",
question:"ترجمه را بساز:",
text:"Dört elması var",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"Beş ekmek yiyorum",
question:"ترجمه را بساز:",
text:"Beş ekmek yiyorum",
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

  // BUILD TURKISH / FA

  else if (q.type === "build-tr" || q.type === "build-fa") {
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

  if (q.type === "build-tr") {
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