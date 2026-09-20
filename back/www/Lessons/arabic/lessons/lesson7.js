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
question:"طماطم کدام است؟",
speak:"طماطم",
options:[
{text:"بطاطا",image:"../../media/vegetables/potato.webp"},
{text:"طماطم",image:"../../media/vegetables/tomato.webp"},
{text:"جزر",image:"../../media/vegetables/carrot.webp"},
{text:"بصل",image:"../../media/vegetables/onion.webp"}
],
answer:"طماطم"
},

{
type:"image",
question:"بطاطا کدام است؟",
speak:"بطاطا",
options:[
{text:"بصل",image:"../../media/vegetables/onion.webp"},
{text:"بطاطا",image:"../../media/vegetables/potato.webp"},
{text:"خيار",image:"../../media/vegetables/cucumber.webp"},
{text:"طماطم",image:"../../media/vegetables/tomato.webp"}
],
answer:"بطاطا"
},

{
type:"image",
question:"جزر کدام است؟",
speak:"جزر",
options:[
{text:"طماطم",image:"../../media/vegetables/tomato.webp"},
{text:"جزر",image:"../../media/vegetables/carrot.webp"},
{text:"خيار",image:"../../media/vegetables/cucumber.webp"},
{text:"بطاطا",image:"../../media/vegetables/potato.webp"}
],
answer:"جزر"
},

{
type:"image",
question:"بصل کدام است؟",
speak:"بصل",
options:[
{text:"جزر",image:"../../media/vegetables/carrot.webp"},
{text:"بطاطا",image:"../../media/vegetables/potato.webp"},
{text:"بصل",image:"../../media/vegetables/onion.webp"},
{text:"طماطم",image:"../../media/vegetables/tomato.webp"}
],
answer:"بصل"
},

{
type:"image",
question:"خيار کدام است؟",
speak:"خيار",
options:[
{text:"بصل",image:"../../media/vegetables/onion.webp"},
{text:"طماطم",image:"../../media/vegetables/tomato.webp"},
{text:"بطاطا",image:"../../media/vegetables/potato.webp"},
{text:"خيار",image:"../../media/vegetables/cucumber.webp"}
],
answer:"خيار"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.webp",
options:["بطاطا","طماطم","جزر","بصل"],
answer:"طماطم"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.webp",
options:["بصل","بطاطا","خيار","طماطم"],
answer:"بطاطا"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.webp",
options:["طماطم","جزر","خيار","بطاطا"],
answer:"جزر"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.webp",
options:["جزر","بطاطا","بصل","طماطم"],
answer:"بصل"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.webp",
options:["بصل","طماطم","بطاطا","خيار"],
answer:"خيار"
},

/* AUDIO */

{
type:"audio",
speak:"طماطم",
question:"کدام کلمه را شنیدی؟",
options:["بطاطا","طماطم","جزر","بصل"],
answer:"طماطم"
},

{
type:"audio",
speak:"بطاطا",
question:"کدام کلمه را شنیدی؟",
options:["بصل","بطاطا","خيار","طماطم"],
answer:"بطاطا"
},

{
type:"audio",
speak:"جزر",
question:"کدام کلمه را شنیدی؟",
options:["طماطم","جزر","خيار","بطاطا"],
answer:"جزر"
},

{
type:"audio",
speak:"بصل",
question:"کدام کلمه را شنیدی؟",
options:["جزر","بطاطا","بصل","طماطم"],
answer:"بصل"
},

{
type:"audio",
speak:"خيار",
question:"کدام کلمه را شنیدی؟",
options:["بصل","طماطم","بطاطا","خيار"],
answer:"خيار"
},

/* BUILD AR - ساخت جمله عربی */

{
type:"build-ar",
speak:"أحب الطماطم",
question:"جمله عربی را بساز:",
text:"من گوجه‌فرنگی دوست دارم",
words:["أحب","الطماطم"],
answer:["أحب","الطماطم"]
},

{
type:"build-ar",
speak:"تأكل بطاطا",
question:"جمله عربی را بساز:",
text:"او یک سیب‌زمینی می‌خورد",
words:["تأكل","بطاطا"],
answer:["تأكل","بطاطا"]
},

{
type:"build-ar",
speak:"هذه جزر",
question:"جمله عربی را بساز:",
text:"این یک هویج است",
words:["هذه","جزر"],
answer:["هذه","جزر"]
},

{
type:"build-ar",
speak:"لي بصل",
question:"جمله عربی را بساز:",
text:"من یک پیاز دارم",
words:["لي","بصل"],
answer:["لي","بصل"]
},

{
type:"build-ar",
speak:"يأكل خياراً",
question:"جمله عربی را بساز:",
text:"او یک خیار می‌خورد",
words:["يأكل","خياراً"],
answer:["يأكل","خياراً"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"أحب الطماطم",
question:"ترجمه را بساز:",
text:"أحب الطماطم",
words:["دارم","دوست","گوجه‌فرنگی","من"],
answer:["من","گوجه‌فرنگی","دوست","دارم"]
},

{
type:"build-fa",
speak:"تأكل بطاطا",
question:"ترجمه را بساز:",
text:"تأكل بطاطا",
words:["می‌خورد","سیب‌زمینی","یک","او"],
answer:["او","یک","سیب‌زمینی","می‌خورد"]
},

{
type:"build-fa",
speak:"هذه جزر",
question:"ترجمه را بساز:",
text:"هذه جزر",
words:["است","هویج","این"],
answer:["این","هویج","است"]
},

{
type:"build-fa",
speak:"لي بصل",
question:"ترجمه را بساز:",
text:"لي بصل",
words:["دارم","پیاز","من"],
answer:["من","پیاز","دارم"]
},

{
type:"build-fa",
speak:"يأكل خياراً",
question:"ترجمه را بساز:",
text:"يأكل خياراً",
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