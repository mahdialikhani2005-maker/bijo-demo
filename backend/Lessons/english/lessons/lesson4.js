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
question:"shirt کدام است؟",
speak:"shirt",
options:[
{text:"pants",image:"../../media/clothes/pants.webp"},
{text:"shirt",image:"../../media/clothes/shirt.webp"},
{text:"hat",image:"../../media/clothes/hat.webp"},
{text:"dress",image:"../../media/clothes/dress.webp"}
],
answer:"shirt"
},

{
type:"image",
question:"pants کدام است؟",
speak:"pants",
options:[
{text:"dress",image:"../../media/clothes/dress.webp"},
{text:"pants",image:"../../media/clothes/pants.webp"},
{text:"shoes",image:"../../media/clothes/shoes.webp"},
{text:"shirt",image:"../../media/clothes/shirt.webp"}
],
answer:"pants"
},

{
type:"image",
question:"shoes کدام است؟",
speak:"shoes",
options:[
{text:"shirt",image:"../../media/clothes/shirt.webp"},
{text:"shoes",image:"../../media/clothes/shoes.webp"},
{text:"hat",image:"../../media/clothes/hat.webp"},
{text:"pants",image:"../../media/clothes/pants.webp"}
],
answer:"shoes"
},

{
type:"image",
question:"hat کدام است؟",
speak:"hat",
options:[
{text:"shoes",image:"../../media/clothes/shoes.webp"},
{text:"pants",image:"../../media/clothes/pants.webp"},
{text:"hat",image:"../../media/clothes/hat.webp"},
{text:"shirt",image:"../../media/clothes/shirt.webp"}
],
answer:"hat"
},

{
type:"image",
question:"dress کدام است؟",
speak:"dress",
options:[
{text:"hat",image:"../../media/clothes/hat.webp"},
{text:"shirt",image:"../../media/clothes/shirt.webp"},
{text:"pants",image:"../../media/clothes/pants.webp"},
{text:"dress",image:"../../media/clothes/dress.webp"}
],
answer:"dress"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["pants","shirt","hat","dress"],
answer:"shirt"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["dress","pants","shoes","shirt"],
answer:"pants"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["shirt","shoes","hat","pants"],
answer:"shoes"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["shoes","pants","hat","shirt"],
answer:"hat"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["hat","shirt","pants","dress"],
answer:"dress"
},

/* AUDIO */

{
type:"audio",
speak:"shirt",
question:"کدام کلمه را شنیدی؟",
options:["pants","shirt","hat","dress"],
answer:"shirt"
},

{
type:"audio",
speak:"pants",
question:"کدام کلمه را شنیدی؟",
options:["dress","pants","shoes","shirt"],
answer:"pants"
},

{
type:"audio",
speak:"shoes",
question:"کدام کلمه را شنیدی؟",
options:["shirt","shoes","hat","pants"],
answer:"shoes"
},

{
type:"audio",
speak:"hat",
question:"کدام کلمه را شنیدی؟",
options:["shoes","pants","hat","shirt"],
answer:"hat"
},

{
type:"audio",
speak:"dress",
question:"کدام کلمه را شنیدی؟",
options:["hat","shirt","pants","dress"],
answer:"dress"
},

/* BUILD EN - ساده برای A1 */

{
type:"build-en",
speak:"This is a shirt",
question:"جمله انگلیسی را بساز:",
text:"این یک پیراهن است",
words:["shirt","a","is","This"],
answer:["This","is","a","shirt"]
},

{
type:"build-en",
speak:"This is a hat",
question:"جمله انگلیسی را بساز:",
text:"این یک کلاه است",
words:["hat","a","is","This"],
answer:["This","is","a","hat"]
},

{
type:"build-en",
speak:"These are shoes",
question:"جمله انگلیسی را بساز:",
text:"این کفش‌ها هستند",
words:["shoes","are","These"],
answer:["These","are","shoes"]
},

{
type:"build-en",
speak:"These are pants",
question:"جمله انگلیسی را بساز:",
text:"این شلوارها هستند",
words:["pants","are","These"],
answer:["These","are","pants"]
},

{
type:"build-en",
speak:"This is a dress",
question:"جمله انگلیسی را بساز:",
text:"این یک لباس است",
words:["dress","a","is","This"],
answer:["This","is","a","dress"]
},

/* BUILD FA - ساده برای A1 */

{
type:"build-fa",
speak:"This is a shirt",
question:"ترجمه را بساز:",
text:"This is a shirt",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"This is a hat",
question:"ترجمه را بساز:",
text:"This is a hat",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"These are shoes",
question:"ترجمه را بساز:",
text:"These are shoes",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"These are pants",
question:"ترجمه را بساز:",
text:"These are pants",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"This is a dress",
question:"ترجمه را بساز:",
text:"This is a dress",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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