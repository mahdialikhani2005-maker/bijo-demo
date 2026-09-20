let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "fr-FR",
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
  utter.lang = "fr-FR";
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
question:"un کدام است؟",
speak:"un",
options:[
{text:"deux",image:"../../media/numbers/two.webp"},
{text:"un",image:"../../media/numbers/one.webp"},
{text:"trois",image:"../../media/numbers/three.webp"},
{text:"quatre",image:"../../media/numbers/four.webp"}
],
answer:"un"
},

{
type:"image",
question:"deux کدام است؟",
speak:"deux",
options:[
{text:"quatre",image:"../../media/numbers/four.webp"},
{text:"deux",image:"../../media/numbers/two.webp"},
{text:"cinq",image:"../../media/numbers/five.webp"},
{text:"un",image:"../../media/numbers/one.webp"}
],
answer:"deux"
},

{
type:"image",
question:"trois کدام است؟",
speak:"trois",
options:[
{text:"un",image:"../../media/numbers/one.webp"},
{text:"trois",image:"../../media/numbers/three.webp"},
{text:"cinq",image:"../../media/numbers/five.webp"},
{text:"deux",image:"../../media/numbers/two.webp"}
],
answer:"trois"
},

{
type:"image",
question:"quatre کدام است؟",
speak:"quatre",
options:[
{text:"trois",image:"../../media/numbers/three.webp"},
{text:"deux",image:"../../media/numbers/two.webp"},
{text:"quatre",image:"../../media/numbers/four.webp"},
{text:"un",image:"../../media/numbers/one.webp"}
],
answer:"quatre"
},

{
type:"image",
question:"cinq کدام است؟",
speak:"cinq",
options:[
{text:"quatre",image:"../../media/numbers/four.webp"},
{text:"un",image:"../../media/numbers/one.webp"},
{text:"deux",image:"../../media/numbers/two.webp"},
{text:"cinq",image:"../../media/numbers/five.webp"}
],
answer:"cinq"
},

/* WORD */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["deux","un","trois","quatre"],
answer:"un"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["quatre","deux","cinq","un"],
answer:"deux"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["un","trois","cinq","deux"],
answer:"trois"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["trois","deux","quatre","un"],
answer:"quatre"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["quatre","un","deux","cinq"],
answer:"cinq"
},

/* AUDIO */

{
type:"audio",
speak:"un",
question:"کدام کلمه را شنیدی؟",
options:["deux","un","trois","quatre"],
answer:"un"
},

{
type:"audio",
speak:"deux",
question:"کدام کلمه را شنیدی؟",
options:["quatre","deux","cinq","un"],
answer:"deux"
},

{
type:"audio",
speak:"trois",
question:"کدام کلمه را شنیدی؟",
options:["un","trois","cinq","deux"],
answer:"trois"
},

{
type:"audio",
speak:"quatre",
question:"کدام کلمه را شنیدی؟",
options:["trois","deux","quatre","un"],
answer:"quatre"
},

{
type:"audio",
speak:"cinq",
question:"کدام کلمه را شنیدی؟",
options:["quatre","un","deux","cinq"],
answer:"cinq"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"J'ai un chat",
question:"جمله فرانسوی را بساز:",
text:"من یک گربه دارم",
words:["J'ai","un","chat"],
answer:["J'ai","un","chat"]
},

{
type:"build-fr",
speak:"Elle a deux chiens",
question:"جمله فرانسوی را بساز:",
text:"او دو سگ دارد",
words:["Elle","a","deux","chiens"],
answer:["Elle","a","deux","chiens"]
},

{
type:"build-fr",
speak:"Je vois trois oiseaux",
question:"جمله فرانسوی را بساز:",
text:"من سه پرنده می‌بینم",
words:["Je","vois","trois","oiseaux"],
answer:["Je","vois","trois","oiseaux"]
},

{
type:"build-fr",
speak:"Il a quatre pommes",
question:"جمله فرانسوی را بساز:",
text:"او چهار سیب دارد",
words:["Il","a","quatre","pommes"],
answer:["Il","a","quatre","pommes"]
},

{
type:"build-fr",
speak:"Je mange cinq pains",
question:"جمله فرانسوی را بساز:",
text:"من پنج نان می‌خورم",
words:["Je","mange","cinq","pains"],
answer:["Je","mange","cinq","pains"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"J'ai un chat",
question:"ترجمه را بساز:",
text:"J'ai un chat",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"Elle a deux chiens",
question:"ترجمه را بساز:",
text:"Elle a deux chiens",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"Je vois trois oiseaux",
question:"ترجمه را بساز:",
text:"Je vois trois oiseaux",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Il a quatre pommes",
question:"ترجمه را بساز:",
text:"Il a quatre pommes",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"Je mange cinq pains",
question:"ترجمه را بساز:",
text:"Je mange cinq pains",
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

  // BUILD FRENCH / FA

  else if (q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-fr") {
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