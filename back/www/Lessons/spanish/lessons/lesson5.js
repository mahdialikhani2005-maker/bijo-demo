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

/* IMAGE - غذا */

{
type:"image",
question:"Pan کدام است؟",
speak:"pan",
options:[
{text:"arroz",image:"../../media/food/rice.webp"},
{text:"pan",image:"../../media/food/bread.webp"},
{text:"carne",image:"../../media/food/meat.webp"},
{text:"huevo",image:"../../media/food/egg.webp"}
],
answer:"pan"
},

{
type:"image",
question:"Arroz کدام است؟",
speak:"arroz",
options:[
{text:"huevo",image:"../../media/food/egg.webp"},
{text:"arroz",image:"../../media/food/rice.webp"},
{text:"leche",image:"../../media/food/milk.webp"},
{text:"pan",image:"../../media/food/bread.webp"}
],
answer:"arroz"
},

{
type:"image",
question:"Carne کدام است؟",
speak:"carne",
options:[
{text:"pan",image:"../../media/food/bread.webp"},
{text:"carne",image:"../../media/food/meat.webp"},
{text:"leche",image:"../../media/food/milk.webp"},
{text:"arroz",image:"../../media/food/rice.webp"}
],
answer:"carne"
},

{
type:"image",
question:"Huevo کدام است؟",
speak:"huevo",
options:[
{text:"carne",image:"../../media/food/meat.webp"},
{text:"arroz",image:"../../media/food/rice.webp"},
{text:"huevo",image:"../../media/food/egg.webp"},
{text:"pan",image:"../../media/food/bread.webp"}
],
answer:"huevo"
},

{
type:"image",
question:"Leche کدام است؟",
speak:"leche",
options:[
{text:"huevo",image:"../../media/food/egg.webp"},
{text:"pan",image:"../../media/food/bread.webp"},
{text:"arroz",image:"../../media/food/rice.webp"},
{text:"leche",image:"../../media/food/milk.webp"}
],
answer:"leche"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["arroz","pan","carne","huevo"],
answer:"pan"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["huevo","arroz","leche","pan"],
answer:"arroz"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["pan","carne","leche","arroz"],
answer:"carne"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["carne","arroz","huevo","pan"],
answer:"huevo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["huevo","pan","arroz","leche"],
answer:"leche"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"pan",
question:"کدام کلمه را شنیدی؟",
options:["arroz","pan","carne","huevo"],
answer:"pan"
},

{
type:"audio",
speak:"arroz",
question:"کدام کلمه را شنیدی؟",
options:["huevo","arroz","leche","pan"],
answer:"arroz"
},

{
type:"audio",
speak:"carne",
question:"کدام کلمه را شنیدی؟",
options:["pan","carne","leche","arroz"],
answer:"carne"
},

{
type:"audio",
speak:"huevo",
question:"کدام کلمه را شنیدی؟",
options:["carne","arroz","huevo","pan"],
answer:"huevo"
},

{
type:"audio",
speak:"leche",
question:"کدام کلمه را شنیدی؟",
options:["huevo","pan","arroz","leche"],
answer:"leche"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Me gusta el pan",
question:"جمله اسپانیایی را بساز:",
text:"من نان دوست دارم",
words:["Me","gusta","el","pan"],
answer:["Me","gusta","el","pan"]
},

{
type:"build-es",
speak:"Ella come arroz",
question:"جمله اسپانیایی را بساز:",
text:"او برنج می‌خورد",
words:["Ella","come","arroz"],
answer:["Ella","come","arroz"]
},

{
type:"build-es",
speak:"Tengo carne",
question:"جمله اسپانیایی را بساز:",
text:"من گوشت دارم",
words:["Tengo","carne"],
answer:["Tengo","carne"]
},

{
type:"build-es",
speak:"Él come un huevo",
question:"جمله اسپانیایی را بساز:",
text:"او یک تخم‌مرغ می‌خورد",
words:["Él","come","un","huevo"],
answer:["Él","come","un","huevo"]
},

{
type:"build-es",
speak:"Bebo leche",
question:"جمله اسپانیایی را بساز:",
text:"من شیر می‌نوشم",
words:["Bebo","leche"],
answer:["Bebo","leche"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Me gusta el pan",
question:"ترجمه را بساز:",
text:"Me gusta el pan",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"Ella come arroz",
question:"ترجمه را بساز:",
text:"Ella come arroz",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"Tengo carne",
question:"ترجمه را بساز:",
text:"Tengo carne",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"Él come un huevo",
question:"ترجمه را بساز:",
text:"Él come un huevo",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"Bebo leche",
question:"ترجمه را بساز:",
text:"Bebo leche",
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