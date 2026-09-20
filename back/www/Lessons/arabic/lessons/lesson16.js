let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
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
  utter.lang = "ar-SA";
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
question:"مدرسة کدام است؟",
speak:"مدرسة",
options:[
{text:"مستشفى",image:"../../media/places/hospital.webp"},
{text:"مدرسة",image:"../../media/places/school.webp"},
{text:"متجر",image:"../../media/places/store.webp"},
{text:"حديقة",image:"../../media/places/park.webp"}
],
answer:"مدرسة"
},

{
type:"image",
question:"مستشفى کدام است؟",
speak:"مستشفى",
options:[
{text:"حديقة",image:"../../media/places/park.webp"},
{text:"مستشفى",image:"../../media/places/hospital.webp"},
{text:"مسجد",image:"../../media/places/mosque.webp"},
{text:"مدرسة",image:"../../media/places/school.webp"}
],
answer:"مستشفى"
},

{
type:"image",
question:"متجر کدام است؟",
speak:"متجر",
options:[
{text:"مدرسة",image:"../../media/places/school.webp"},
{text:"متجر",image:"../../media/places/store.webp"},
{text:"مسجد",image:"../../media/places/mosque.webp"},
{text:"مستشفى",image:"../../media/places/hospital.webp"}
],
answer:"متجر"
},

{
type:"image",
question:"حديقة کدام است؟",
speak:"حديقة",
options:[
{text:"متجر",image:"../../media/places/store.webp"},
{text:"مستشفى",image:"../../media/places/hospital.webp"},
{text:"حديقة",image:"../../media/places/park.webp"},
{text:"مدرسة",image:"../../media/places/school.webp"}
],
answer:"حديقة"
},

{
type:"image",
question:"مسجد کدام است؟",
speak:"مسجد",
options:[
{text:"حديقة",image:"../../media/places/park.webp"},
{text:"مدرسة",image:"../../media/places/school.webp"},
{text:"مستشفى",image:"../../media/places/hospital.webp"},
{text:"مسجد",image:"../../media/places/mosque.webp"}
],
answer:"مسجد"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["مستشفى","مدرسة","متجر","حديقة"],
answer:"مدرسة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["حديقة","مستشفى","مسجد","مدرسة"],
answer:"مستشفى"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["مدرسة","متجر","مسجد","مستشفى"],
answer:"متجر"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["متجر","مستشفى","حديقة","مدرسة"],
answer:"حديقة"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["حديقة","مدرسة","مستشفى","مسجد"],
answer:"مسجد"
},

/* AUDIO */

{
type:"audio",
speak:"مدرسة",
question:"کدام کلمه را شنیدی؟",
options:["مستشفى","مدرسة","متجر","حديقة"],
answer:"مدرسة"
},

{
type:"audio",
speak:"مستشفى",
question:"کدام کلمه را شنیدی؟",
options:["حديقة","مستشفى","مسجد","مدرسة"],
answer:"مستشفى"
},

{
type:"audio",
speak:"متجر",
question:"کدام کلمه را شنیدی؟",
options:["مدرسة","متجر","مسجد","مستشفى"],
answer:"متجر"
},

{
type:"audio",
speak:"حديقة",
question:"کدام کلمه را شنیدی؟",
options:["متجر","مستشفى","حديقة","مدرسة"],
answer:"حديقة"
},

{
type:"audio",
speak:"مسجد",
question:"کدام کلمه را شنیدی؟",
options:["حديقة","مدرسة","مستشفى","مسجد"],
answer:"مسجد"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"هذه مدرسة",
question:"جمله عربی را بساز:",
text:"این یک مدرسه است",
words:["هذه","مدرسة"],
answer:["هذه","مدرسة"]
},

{
type:"build-ar",
speak:"أذهب إلى المستشفى",
question:"جمله عربی را بساز:",
text:"من به بیمارستان می‌روم",
words:["أذهب","إلى","المستشفى"],
answer:["أذهب","إلى","المستشفى"]
},

{
type:"build-ar",
speak:"هي في المتجر",
question:"جمله عربی را بساز:",
text:"او در فروشگاه است",
words:["هي","في","المتجر"],
answer:["هي","في","المتجر"]
},

{
type:"build-ar",
speak:"نحن في الحديقة",
question:"جمله عربی را بساز:",
text:"ما در پارک هستیم",
words:["نحن","في","الحديقة"],
answer:["نحن","في","الحديقة"]
},

{
type:"build-ar",
speak:"يذهب إلى المسجد",
question:"جمله عربی را بساز:",
text:"او به مسجد می‌رود",
words:["يذهب","إلى","المسجد"],
answer:["يذهب","إلى","المسجد"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"هذه مدرسة",
question:"ترجمه را بساز:",
text:"هذه مدرسة",
words:["است","مدرسه","این"],
answer:["این","مدرسه","است"]
},

{
type:"build-fa",
speak:"أذهب إلى المستشفى",
question:"ترجمه را بساز:",
text:"أذهب إلى المستشفى",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"هي في المتجر",
question:"ترجمه را بساز:",
text:"هي في المتجر",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"نحن في الحديقة",
question:"ترجمه را بساز:",
text:"نحن في الحديقة",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"يذهب إلى المسجد",
question:"ترجمه را بساز:",
text:"يذهب إلى المسجد",
words:["می‌رود","به","مسجد","او"],
answer:["او","به","مسجد","می‌رود"]
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

  // BUILD ARABIC / FA

  else if (q.type === "build-ar" || q.type === "build-fa") {
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

  if (q.type === "build-ar") {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
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