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
question:"bread کدام است؟",
speak:"bread",
options:[
{text:"rice",image:"../../media/food/rice.webp"},
{text:"bread",image:"../../media/food/bread.webp"},
{text:"meat",image:"../../media/food/meat.webp"},
{text:"egg",image:"../../media/food/egg.webp"}
],
answer:"bread"
},

{
type:"image",
question:"rice کدام است؟",
speak:"rice",
options:[
{text:"egg",image:"../../media/food/egg.webp"},
{text:"rice",image:"../../media/food/rice.webp"},
{text:"milk",image:"../../media/food/milk.webp"},
{text:"bread",image:"../../media/food/bread.webp"}
],
answer:"rice"
},

{
type:"image",
question:"meat کدام است؟",
speak:"meat",
options:[
{text:"bread",image:"../../media/food/bread.webp"},
{text:"meat",image:"../../media/food/meat.webp"},
{text:"milk",image:"../../media/food/milk.webp"},
{text:"rice",image:"../../media/food/rice.webp"}
],
answer:"meat"
},

{
type:"image",
question:"egg کدام است؟",
speak:"egg",
options:[
{text:"meat",image:"../../media/food/meat.webp"},
{text:"rice",image:"../../media/food/rice.webp"},
{text:"egg",image:"../../media/food/egg.webp"},
{text:"bread",image:"../../media/food/bread.webp"}
],
answer:"egg"
},

{
type:"image",
question:"milk کدام است؟",
speak:"milk",
options:[
{text:"egg",image:"../../media/food/egg.webp"},
{text:"bread",image:"../../media/food/bread.webp"},
{text:"rice",image:"../../media/food/rice.webp"},
{text:"milk",image:"../../media/food/milk.webp"}
],
answer:"milk"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["rice","bread","meat","egg"],
answer:"bread"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["egg","rice","milk","bread"],
answer:"rice"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["bread","meat","milk","rice"],
answer:"meat"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["meat","rice","egg","bread"],
answer:"egg"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["egg","bread","rice","milk"],
answer:"milk"
},

/* AUDIO */

{
type:"audio",
speak:"bread",
question:"کدام کلمه را شنیدی؟",
options:["rice","bread","meat","egg"],
answer:"bread"
},

{
type:"audio",
speak:"rice",
question:"کدام کلمه را شنیدی؟",
options:["egg","rice","milk","bread"],
answer:"rice"
},

{
type:"audio",
speak:"meat",
question:"کدام کلمه را شنیدی؟",
options:["bread","meat","milk","rice"],
answer:"meat"
},

{
type:"audio",
speak:"egg",
question:"کدام کلمه را شنیدی؟",
options:["meat","rice","egg","bread"],
answer:"egg"
},

{
type:"audio",
speak:"milk",
question:"کدام کلمه را شنیدی؟",
options:["egg","bread","rice","milk"],
answer:"milk"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I like bread",
question:"جمله انگلیسی را بساز:",
text:"من نان دوست دارم",
words:["like","bread","I"],
answer:["I","like","bread"]
},

{
type:"build-en",
speak:"She eats rice",
question:"جمله انگلیسی را بساز:",
text:"او برنج می‌خورد",
words:["eats","rice","She"],
answer:["She","eats","rice"]
},

{
type:"build-en",
speak:"I have meat",
question:"جمله انگلیسی را بساز:",
text:"من گوشت دارم",
words:["have","meat","I"],
answer:["I","have","meat"]
},

{
type:"build-en",
speak:"He eats an egg",
question:"جمله انگلیسی را بساز:",
text:"او تخم‌مرغ می‌خورد",
words:["eats","an","egg","He"],
answer:["He","eats","an","egg"]
},

{
type:"build-en",
speak:"I drink milk",
question:"جمله انگلیسی را بساز:",
text:"من شیر می‌نوشم",
words:["drink","milk","I"],
answer:["I","drink","milk"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I like bread",
question:"ترجمه را بساز:",
text:"I like bread",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"She eats rice",
question:"ترجمه را بساز:",
text:"She eats rice",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"I have meat",
question:"ترجمه را بساز:",
text:"I have meat",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"He eats an egg",
question:"ترجمه را بساز:",
text:"He eats an egg",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"I drink milk",
question:"ترجمه را بساز:",
text:"I drink milk",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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