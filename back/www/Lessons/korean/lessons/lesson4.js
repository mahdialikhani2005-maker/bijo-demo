let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ko-KR",
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
  utter.lang = "ko-KR";
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
question:"셔츠 (syeocheu) کدام است؟",
speak:"셔츠",
options:[
{text:"바지 (baji)",image:"../../media/clothes/pants.webp"},
{text:"셔츠 (syeocheu)",image:"../../media/clothes/shirt.webp"},
{text:"모자 (moja)",image:"../../media/clothes/hat.webp"},
{text:"드레스 (deureseu)",image:"../../media/clothes/dress.webp"}
],
answer:"셔츠 (syeocheu)"
},

{
type:"image",
question:"바지 (baji) کدام است؟",
speak:"바지",
options:[
{text:"드레스 (deureseu)",image:"../../media/clothes/dress.webp"},
{text:"바지 (baji)",image:"../../media/clothes/pants.webp"},
{text:"신발 (sinbal)",image:"../../media/clothes/shoes.webp"},
{text:"셔츠 (syeocheu)",image:"../../media/clothes/shirt.webp"}
],
answer:"바지 (baji)"
},

{
type:"image",
question:"신발 (sinbal) کدام است؟",
speak:"신발",
options:[
{text:"셔츠 (syeocheu)",image:"../../media/clothes/shirt.webp"},
{text:"신발 (sinbal)",image:"../../media/clothes/shoes.webp"},
{text:"모자 (moja)",image:"../../media/clothes/hat.webp"},
{text:"바지 (baji)",image:"../../media/clothes/pants.webp"}
],
answer:"신발 (sinbal)"
},

{
type:"image",
question:"모자 (moja) کدام است؟",
speak:"모자",
options:[
{text:"신발 (sinbal)",image:"../../media/clothes/shoes.webp"},
{text:"바지 (baji)",image:"../../media/clothes/pants.webp"},
{text:"모자 (moja)",image:"../../media/clothes/hat.webp"},
{text:"셔츠 (syeocheu)",image:"../../media/clothes/shirt.webp"}
],
answer:"모자 (moja)"
},

{
type:"image",
question:"드레스 (deureseu) کدام است؟",
speak:"드레스",
options:[
{text:"모자 (moja)",image:"../../media/clothes/hat.webp"},
{text:"셔츠 (syeocheu)",image:"../../media/clothes/shirt.webp"},
{text:"바지 (baji)",image:"../../media/clothes/pants.webp"},
{text:"드레스 (deureseu)",image:"../../media/clothes/dress.webp"}
],
answer:"드레스 (deureseu)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["바지","셔츠","모자","드레스"],
answer:"셔츠"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["드레스","바지","신발","셔츠"],
answer:"바지"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["셔츠","신발","모자","바지"],
answer:"신발"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["신발","바지","모자","셔츠"],
answer:"모자"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["모자","셔츠","바지","드레스"],
answer:"드레스"
},

/* AUDIO */

{
type:"audio",
speak:"셔츠",
question:"کدام کلمه را شنیدی؟",
options:["바지","셔츠","모자","드레스"],
answer:"셔츠"
},

{
type:"audio",
speak:"바지",
question:"کدام کلمه را شنیدی؟",
options:["드레스","바지","신발","셔츠"],
answer:"바지"
},

{
type:"audio",
speak:"신발",
question:"کدام کلمه را شنیدی؟",
options:["셔츠","신발","모자","바지"],
answer:"신발"
},

{
type:"audio",
speak:"모자",
question:"کدام کلمه را شنیدی؟",
options:["신발","바지","모자","셔츠"],
answer:"모자"
},

{
type:"audio",
speak:"드레스",
question:"کدام کلمه را شنیدی؟",
options:["모자","셔츠","바지","드레스"],
answer:"드레스"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"이것은 셔츠입니다",
question:"جمله کرهای را بساز:",
text:"این یک پیراهن است",
words:["이것은","셔츠","입니다"],
answer:["이것은","셔츠","입니다"]
},

{
type:"build-ko",
speak:"이것은 모자입니다",
question:"جمله کرهای را بساز:",
text:"این یک کلاه است",
words:["이것은","모자","입니다"],
answer:["이것은","모자","입니다"]
},

{
type:"build-ko",
speak:"이것들은 신발입니다",
question:"جمله کرهای را بساز:",
text:"این کفش‌ها هستند",
words:["이것들은","신발","입니다"],
answer:["이것들은","신발","입니다"]
},

{
type:"build-ko",
speak:"이것들은 바지입니다",
question:"جمله کرهای را بساز:",
text:"این شلوارها هستند",
words:["이것들은","바지","입니다"],
answer:["이것들은","바지","입니다"]
},

{
type:"build-ko",
speak:"이것은 드레스입니다",
question:"جمله کرهای را بساز:",
text:"این یک لباس است",
words:["이것은","드레스","입니다"],
answer:["이것은","드레스","입니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"이것은 셔츠입니다",
question:"ترجمه را بساز:",
text:"이것은 셔츠입니다",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"이것은 모자입니다",
question:"ترجمه را بساز:",
text:"이것은 모자입니다",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"이것들은 신발입니다",
question:"ترجمه را بساز:",
text:"이것들은 신발입니다",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"이것들은 바지입니다",
question:"ترجمه را بساز:",
text:"이것들은 바지입니다",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"이것은 드레스입니다",
question:"ترجمه را بساز:",
text:"이것은 드레스입니다",
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

  // BUILD KOREAN / FA

  else if (q.type === "build-ko" || q.type === "build-fa") {
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

  if (q.type === "build-ko") {
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