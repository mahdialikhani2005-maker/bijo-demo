let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "es-ES",
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
  utter.lang = "es-ES";
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

/* IMAGE - احساسات */

{
type:"image",
question:"Feliz کدام است؟",
speak:"feliz",
options:[
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"feliz",image:"../../media/feelings/happy.webp"},
{text:"enojado",image:"../../media/feelings/angry.webp"},
{text:"cansado",image:"../../media/feelings/tired.webp"}
],
answer:"feliz"
},

{
type:"image",
question:"Triste کدام است؟",
speak:"triste",
options:[
{text:"cansado",image:"../../media/feelings/tired.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"asustado",image:"../../media/feelings/scared.webp"},
{text:"feliz",image:"../../media/feelings/happy.webp"}
],
answer:"triste"
},

{
type:"image",
question:"Enojado کدام است؟",
speak:"enojado",
options:[
{text:"feliz",image:"../../media/feelings/happy.webp"},
{text:"enojado",image:"../../media/feelings/angry.webp"},
{text:"asustado",image:"../../media/feelings/scared.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"}
],
answer:"enojado"
},

{
type:"image",
question:"Cansado کدام است؟",
speak:"cansado",
options:[
{text:"enojado",image:"../../media/feelings/angry.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"cansado",image:"../../media/feelings/tired.webp"},
{text:"feliz",image:"../../media/feelings/happy.webp"}
],
answer:"cansado"
},

{
type:"image",
question:"Asustado کدام است؟",
speak:"asustado",
options:[
{text:"cansado",image:"../../media/feelings/tired.webp"},
{text:"feliz",image:"../../media/feelings/happy.webp"},
{text:"triste",image:"../../media/feelings/sad.webp"},
{text:"asustado",image:"../../media/feelings/scared.webp"}
],
answer:"asustado"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["triste","feliz","enojado","cansado"],
answer:"feliz"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["cansado","triste","asustado","feliz"],
answer:"triste"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["feliz","enojado","asustado","triste"],
answer:"enojado"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["enojado","triste","cansado","feliz"],
answer:"cansado"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["cansado","feliz","triste","asustado"],
answer:"asustado"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"feliz",
question:"کدام کلمه را شنیدی؟",
options:["triste","feliz","enojado","cansado"],
answer:"feliz"
},

{
type:"audio",
speak:"triste",
question:"کدام کلمه را شنیدی؟",
options:["cansado","triste","asustado","feliz"],
answer:"triste"
},

{
type:"audio",
speak:"enojado",
question:"کدام کلمه را شنیدی؟",
options:["feliz","enojado","asustado","triste"],
answer:"enojado"
},

{
type:"audio",
speak:"cansado",
question:"کدام کلمه را شنیدی؟",
options:["enojado","triste","cansado","feliz"],
answer:"cansado"
},

{
type:"audio",
speak:"asustado",
question:"کدام کلمه را شنیدی؟",
options:["cansado","feliz","triste","asustado"],
answer:"asustado"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Estoy feliz",
question:"جمله اسپانیایی را بساز:",
text:"من خوشحال هستم",
words:["Estoy","feliz"],
answer:["Estoy","feliz"]
},

{
type:"build-es",
speak:"Ella está triste",
question:"جمله اسپانیایی را بساز:",
text:"او ناراحت است",
words:["Ella","está","triste"],
answer:["Ella","está","triste"]
},

{
type:"build-es",
speak:"Él está enojado",
question:"جمله اسپانیایی را بساز:",
text:"او عصبانی است",
words:["Él","está","enojado"],
answer:["Él","está","enojado"]
},

{
type:"build-es",
speak:"Estamos cansados",
question:"جمله اسپانیایی را بساز:",
text:"ما خسته هستیم",
words:["Estamos","cansados"],
answer:["Estamos","cansados"]
},

{
type:"build-es",
speak:"Ellos están asustados",
question:"جمله اسپانیایی را بساز:",
text:"آنها ترسیده هستند",
words:["Ellos","están","asustados"],
answer:["Ellos","están","asustados"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Estoy feliz",
question:"ترجمه را بساز:",
text:"Estoy feliz",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Ella está triste",
question:"ترجمه را بساز:",
text:"Ella está triste",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"Él está enojado",
question:"ترجمه را بساز:",
text:"Él está enojado",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"Estamos cansados",
question:"ترجمه را بساز:",
text:"Estamos cansados",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"Ellos están asustados",
question:"ترجمه را بساز:",
text:"Ellos están asustados",
words:["هستند","ترسیده","آنها"],
answer:["آنها","ترسیده","هستند"]
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

  // BUILD SPANISH / FA

  else if (q.type === "build-es" || q.type === "build-fa") {
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

  if (q.type === "build-es") {
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