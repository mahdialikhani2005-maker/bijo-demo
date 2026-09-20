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

/* IMAGE - سبزیجات */

{
type:"image",
question:"Tomate کدام است؟",
speak:"tomate",
options:[
{text:"patata",image:"../../media/vegetables/potato.webp"},
{text:"tomate",image:"../../media/vegetables/tomato.webp"},
{text:"zanahoria",image:"../../media/vegetables/carrot.webp"},
{text:"cebolla",image:"../../media/vegetables/onion.webp"}
],
answer:"tomate"
},

{
type:"image",
question:"Patata کدام است؟",
speak:"patata",
options:[
{text:"cebolla",image:"../../media/vegetables/onion.webp"},
{text:"patata",image:"../../media/vegetables/potato.webp"},
{text:"pepino",image:"../../media/vegetables/cucumber.webp"},
{text:"tomate",image:"../../media/vegetables/tomato.webp"}
],
answer:"patata"
},

{
type:"image",
question:"Zanahoria کدام است؟",
speak:"zanahoria",
options:[
{text:"tomate",image:"../../media/vegetables/tomato.webp"},
{text:"zanahoria",image:"../../media/vegetables/carrot.webp"},
{text:"pepino",image:"../../media/vegetables/cucumber.webp"},
{text:"patata",image:"../../media/vegetables/potato.webp"}
],
answer:"zanahoria"
},

{
type:"image",
question:"Cebolla کدام است؟",
speak:"cebolla",
options:[
{text:"zanahoria",image:"../../media/vegetables/carrot.webp"},
{text:"patata",image:"../../media/vegetables/potato.webp"},
{text:"cebolla",image:"../../media/vegetables/onion.webp"},
{text:"tomate",image:"../../media/vegetables/tomato.webp"}
],
answer:"cebolla"
},

{
type:"image",
question:"Pepino کدام است؟",
speak:"pepino",
options:[
{text:"cebolla",image:"../../media/vegetables/onion.webp"},
{text:"tomate",image:"../../media/vegetables/tomato.webp"},
{text:"patata",image:"../../media/vegetables/potato.webp"},
{text:"pepino",image:"../../media/vegetables/cucumber.webp"}
],
answer:"pepino"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.webp",
options:["patata","tomate","zanahoria","cebolla"],
answer:"tomate"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.webp",
options:["cebolla","patata","pepino","tomate"],
answer:"patata"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.webp",
options:["tomate","zanahoria","pepino","patata"],
answer:"zanahoria"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.webp",
options:["zanahoria","patata","cebolla","tomate"],
answer:"cebolla"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.webp",
options:["cebolla","tomate","patata","pepino"],
answer:"pepino"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"tomate",
question:"کدام کلمه را شنیدی؟",
options:["patata","tomate","zanahoria","cebolla"],
answer:"tomate"
},

{
type:"audio",
speak:"patata",
question:"کدام کلمه را شنیدی؟",
options:["cebolla","patata","pepino","tomate"],
answer:"patata"
},

{
type:"audio",
speak:"zanahoria",
question:"کدام کلمه را شنیدی؟",
options:["tomate","zanahoria","pepino","patata"],
answer:"zanahoria"
},

{
type:"audio",
speak:"cebolla",
question:"کدام کلمه را شنیدی؟",
options:["zanahoria","patata","cebolla","tomate"],
answer:"cebolla"
},

{
type:"audio",
speak:"pepino",
question:"کدام کلمه را شنیدی؟",
options:["cebolla","tomate","patata","pepino"],
answer:"pepino"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Me gustan los tomates",
question:"جمله اسپانیایی را بساز:",
text:"من گوجه‌فرنگی دوست دارم",
words:["Me","gustan","los","tomates"],
answer:["Me","gustan","los","tomates"]
},

{
type:"build-es",
speak:"Ella come una patata",
question:"جمله اسپانیایی را بساز:",
text:"او یک سیب‌زمینی می‌خورد",
words:["Ella","come","una","patata"],
answer:["Ella","come","una","patata"]
},

{
type:"build-es",
speak:"Esta es una zanahoria",
question:"جمله اسپانیایی را بساز:",
text:"این یک هویج است",
words:["Esta","es","una","zanahoria"],
answer:["Esta","es","una","zanahoria"]
},

{
type:"build-es",
speak:"Tengo una cebolla",
question:"جمله اسپانیایی را بساز:",
text:"من یک پیاز دارم",
words:["Tengo","una","cebolla"],
answer:["Tengo","una","cebolla"]
},

{
type:"build-es",
speak:"Él come un pepino",
question:"جمله اسپانیایی را بساز:",
text:"او یک خیار می‌خورد",
words:["Él","come","un","pepino"],
answer:["Él","come","un","pepino"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Me gustan los tomates",
question:"ترجمه را بساز:",
text:"Me gustan los tomates",
words:["دارم","دوست","گوجه‌فرنگی","من"],
answer:["من","گوجه‌فرنگی","دوست","دارم"]
},

{
type:"build-fa",
speak:"Ella come una patata",
question:"ترجمه را بساز:",
text:"Ella come una patata",
words:["می‌خورد","سیب‌زمینی","یک","او"],
answer:["او","یک","سیب‌زمینی","می‌خورد"]
},

{
type:"build-fa",
speak:"Esta es una zanahoria",
question:"ترجمه را بساز:",
text:"Esta es una zanahoria",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"Tengo una cebolla",
question:"ترجمه را بساز:",
text:"Tengo una cebolla",
words:["دارم","پیاز","یک","من"],
answer:["من","یک","پیاز","دارم"]
},

{
type:"build-fa",
speak:"Él come un pepino",
question:"ترجمه را بساز:",
text:"Él come un pepino",
words:["می‌خورد","خیار","یک","او"],
answer:["او","یک","خیار","می‌خورد"]
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