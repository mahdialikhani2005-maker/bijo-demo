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
question:"homme کدام است؟",
speak:"homme",
options:[
{text:"femme",image:"../../media/people/woman.webp"},
{text:"homme",image:"../../media/people/man.webp"},
{text:"garçon",image:"../../media/people/boy.webp"},
{text:"fille",image:"../../media/people/girl.webp"}
],
answer:"homme"
},

{
type:"image",
question:"femme کدام است؟",
speak:"femme",
options:[
{text:"fille",image:"../../media/people/girl.webp"},
{text:"femme",image:"../../media/people/woman.webp"},
{text:"garçon",image:"../../media/people/boy.webp"},
{text:"homme",image:"../../media/people/man.webp"}
],
answer:"femme"
},

{
type:"image",
question:"garçon کدام است؟",
speak:"garçon",
options:[
{text:"homme",image:"../../media/people/man.webp"},
{text:"garçon",image:"../../media/people/boy.webp"},
{text:"bébé",image:"../../media/people/baby.webp"},
{text:"fille",image:"../../media/people/girl.webp"}
],
answer:"garçon"
},

{
type:"image",
question:"fille کدام است؟",
speak:"fille",
options:[
{text:"garçon",image:"../../media/people/boy.webp"},
{text:"homme",image:"../../media/people/man.webp"},
{text:"fille",image:"../../media/people/girl.webp"},
{text:"bébé",image:"../../media/people/baby.webp"}
],
answer:"fille"
},

{
type:"image",
question:"bébé کدام است؟",
speak:"bébé",
options:[
{text:"fille",image:"../../media/people/girl.webp"},
{text:"garçon",image:"../../media/people/boy.webp"},
{text:"homme",image:"../../media/people/man.webp"},
{text:"bébé",image:"../../media/people/baby.webp"}
],
answer:"bébé"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["garçon","homme","femme","fille"],
answer:"homme"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["femme","fille","bébé","homme"],
answer:"femme"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["garçon","homme","bébé","fille"],
answer:"garçon"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["fille","femme","garçon","bébé"],
answer:"fille"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["bébé","garçon","fille","homme"],
answer:"bébé"
},

/* AUDIO */

{
type:"audio",
speak:"homme",
question:"کدام کلمه را شنیدی؟",
options:["homme","garçon","femme","fille"],
answer:"homme"
},

{
type:"audio",
speak:"femme",
question:"کدام کلمه را شنیدی؟",
options:["fille","femme","garçon","homme"],
answer:"femme"
},

{
type:"audio",
speak:"garçon",
question:"کدام کلمه را شنیدی؟",
options:["garçon","homme","bébé","fille"],
answer:"garçon"
},

{
type:"audio",
speak:"fille",
question:"کدام کلمه را شنیدی؟",
options:["garçon","femme","fille","bébé"],
answer:"fille"
},

{
type:"audio",
speak:"bébé",
question:"کدام کلمه را شنیدی؟",
options:["bébé","garçon","homme","fille"],
answer:"bébé"
},

/* BUILD FR - ساخت جمله فرانسوی */

{
type:"build-fr",
speak:"C'est un homme",
question:"جمله فرانسوی را بساز:",
text:"او یک مرد است",
words:["C'est","un","homme"],
answer:["C'est","un","homme"]
},

{
type:"build-fr",
speak:"C'est une femme",
question:"جمله فرانسوی را بساز:",
text:"او یک زن است",
words:["C'est","une","femme"],
answer:["C'est","une","femme"]
},

{
type:"build-fr",
speak:"C'est un garçon",
question:"جمله فرانسوی را بساز:",
text:"او یک پسر است",
words:["C'est","un","garçon"],
answer:["C'est","un","garçon"]
},

{
type:"build-fr",
speak:"C'est une fille",
question:"جمله فرانسوی را بساز:",
text:"او یک دختر است",
words:["C'est","une","fille"],
answer:["C'est","une","fille"]
},

{
type:"build-fr",
speak:"Le bébé est petit",
question:"جمله فرانسوی را بساز:",
text:"نوزاد کوچک است",
words:["Le","bébé","est","petit"],
answer:["Le","bébé","est","petit"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"C'est un homme",
question:"ترجمه را بساز:",
text:"C'est un homme",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"C'est une femme",
question:"ترجمه را بساز:",
text:"C'est une femme",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"C'est un garçon",
question:"ترجمه را بساز:",
text:"C'est un garçon",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"C'est une fille",
question:"ترجمه را بساز:",
text:"C'est une fille",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Le bébé est petit",
question:"ترجمه را بساز:",
text:"Le bébé est petit",
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