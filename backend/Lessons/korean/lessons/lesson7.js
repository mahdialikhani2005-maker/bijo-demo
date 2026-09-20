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
question:"토마토 (tomato) کدام است؟",
speak:"토마토",
options:[
{text:"감자 (gamja)",image:"../../media/vegetables/potato.webp"},
{text:"토마토 (tomato)",image:"../../media/vegetables/tomato.webp"},
{text:"당근 (danggeun)",image:"../../media/vegetables/carrot.webp"},
{text:"양파 (yangpa)",image:"../../media/vegetables/onion.webp"}
],
answer:"토마토 (tomato)"
},

{
type:"image",
question:"감자 (gamja) کدام است؟",
speak:"감자",
options:[
{text:"양파 (yangpa)",image:"../../media/vegetables/onion.webp"},
{text:"감자 (gamja)",image:"../../media/vegetables/potato.webp"},
{text:"오이 (oi)",image:"../../media/vegetables/cucumber.webp"},
{text:"토마토 (tomato)",image:"../../media/vegetables/tomato.webp"}
],
answer:"감자 (gamja)"
},

{
type:"image",
question:"당근 (danggeun) کدام است؟",
speak:"당근",
options:[
{text:"토마토 (tomato)",image:"../../media/vegetables/tomato.webp"},
{text:"당근 (danggeun)",image:"../../media/vegetables/carrot.webp"},
{text:"오이 (oi)",image:"../../media/vegetables/cucumber.webp"},
{text:"감자 (gamja)",image:"../../media/vegetables/potato.webp"}
],
answer:"당근 (danggeun)"
},

{
type:"image",
question:"양파 (yangpa) کدام است؟",
speak:"양파",
options:[
{text:"당근 (danggeun)",image:"../../media/vegetables/carrot.webp"},
{text:"감자 (gamja)",image:"../../media/vegetables/potato.webp"},
{text:"양파 (yangpa)",image:"../../media/vegetables/onion.webp"},
{text:"토마토 (tomato)",image:"../../media/vegetables/tomato.webp"}
],
answer:"양파 (yangpa)"
},

{
type:"image",
question:"오이 (oi) کدام است؟",
speak:"오이",
options:[
{text:"양파 (yangpa)",image:"../../media/vegetables/onion.webp"},
{text:"토마토 (tomato)",image:"../../media/vegetables/tomato.webp"},
{text:"감자 (gamja)",image:"../../media/vegetables/potato.webp"},
{text:"오이 (oi)",image:"../../media/vegetables/cucumber.webp"}
],
answer:"오이 (oi)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.webp",
options:["감자","토마토","당근","양파"],
answer:"토마토"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.webp",
options:["양파","감자","오이","토마토"],
answer:"감자"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.webp",
options:["토마토","당근","오이","감자"],
answer:"당근"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.webp",
options:["당근","감자","양파","토마토"],
answer:"양파"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.webp",
options:["양파","토마토","감자","오이"],
answer:"오이"
},

/* AUDIO */

{
type:"audio",
speak:"토마토",
question:"کدام کلمه را شنیدی؟",
options:["감자","토마토","당근","양파"],
answer:"토마토"
},

{
type:"audio",
speak:"감자",
question:"کدام کلمه را شنیدی؟",
options:["양파","감자","오이","토마토"],
answer:"감자"
},

{
type:"audio",
speak:"당근",
question:"کدام کلمه را شنیدی؟",
options:["토마토","당근","오이","감자"],
answer:"당근"
},

{
type:"audio",
speak:"양파",
question:"کدام کلمه را شنیدی؟",
options:["당근","감자","양파","토마토"],
answer:"양파"
},

{
type:"audio",
speak:"오이",
question:"کدام کلمه را شنیدی؟",
options:["양파","토마토","감자","오이"],
answer:"오이"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 토마토를 좋아합니다",
question:"جمله کرهای را بساز:",
text:"من گوجه‌فرنگی دوست دارم",
words:["저는","토마토를","좋아합니다"],
answer:["저는","토마토를","좋아합니다"]
},

{
type:"build-ko",
speak:"그녀는 감자를 먹습니다",
question:"جمله کرهای را بساز:",
text:"او یک سیب‌زمینی می‌خورد",
words:["그녀는","감자를","먹습니다"],
answer:["그녀는","감자를","먹습니다"]
},

{
type:"build-ko",
speak:"이것은 당근입니다",
question:"جمله کرهای را بساز:",
text:"این یک هویج است",
words:["이것은","당근","입니다"],
answer:["이것은","당근","입니다"]
},

{
type:"build-ko",
speak:"저는 양파가 있습니다",
question:"جمله کرهای را بساز:",
text:"من یک پیاز دارم",
words:["저는","양파가","있습니다"],
answer:["저는","양파가","있습니다"]
},

{
type:"build-ko",
speak:"그는 오이를 먹습니다",
question:"جمله کرهای را بساز:",
text:"او یک خیار می‌خورد",
words:["그는","오이를","먹습니다"],
answer:["그는","오이를","먹습니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 토마토를 좋아합니다",
question:"ترجمه را بساز:",
text:"저는 토마토를 좋아합니다",
words:["دارم","دوست","گوجه‌فرنگی","من"],
answer:["من","گوجه‌فرنگی","دوست","دارم"]
},

{
type:"build-fa",
speak:"그녀는 감자를 먹습니다",
question:"ترجمه را بساز:",
text:"그녀는 감자를 먹습니다",
words:["می‌خورد","سیب‌زمینی","یک","او"],
answer:["او","یک","سیب‌زمینی","می‌خورد"]
},

{
type:"build-fa",
speak:"이것은 당근입니다",
question:"ترجمه را بساز:",
text:"이것은 당근입니다",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"저는 양파가 있습니다",
question:"ترجمه را بساز:",
text:"저는 양파가 있습니다",
words:["دارم","پیاز","یک","من"],
answer:["من","یک","پیاز","دارم"]
},

{
type:"build-fa",
speak:"그는 오이를 먹습니다",
question:"ترجمه را بساز:",
text:"그는 오이를 먹습니다",
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