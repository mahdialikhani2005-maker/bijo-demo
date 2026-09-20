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
question:"빵 (ppang) کدام است؟",
speak:"빵",
options:[
{text:"밥 (bap)",image:"../../media/food/rice.webp"},
{text:"빵 (ppang)",image:"../../media/food/bread.webp"},
{text:"고기 (gogi)",image:"../../media/food/meat.webp"},
{text:"계란 (gyeran)",image:"../../media/food/egg.webp"}
],
answer:"빵 (ppang)"
},

{
type:"image",
question:"밥 (bap) کدام است؟",
speak:"밥",
options:[
{text:"계란 (gyeran)",image:"../../media/food/egg.webp"},
{text:"밥 (bap)",image:"../../media/food/rice.webp"},
{text:"우유 (uyu)",image:"../../media/food/milk.webp"},
{text:"빵 (ppang)",image:"../../media/food/bread.webp"}
],
answer:"밥 (bap)"
},

{
type:"image",
question:"고기 (gogi) کدام است؟",
speak:"고기",
options:[
{text:"빵 (ppang)",image:"../../media/food/bread.webp"},
{text:"고기 (gogi)",image:"../../media/food/meat.webp"},
{text:"우유 (uyu)",image:"../../media/food/milk.webp"},
{text:"밥 (bap)",image:"../../media/food/rice.webp"}
],
answer:"고기 (gogi)"
},

{
type:"image",
question:"계란 (gyeran) کدام است؟",
speak:"계란",
options:[
{text:"고기 (gogi)",image:"../../media/food/meat.webp"},
{text:"밥 (bap)",image:"../../media/food/rice.webp"},
{text:"계란 (gyeran)",image:"../../media/food/egg.webp"},
{text:"빵 (ppang)",image:"../../media/food/bread.webp"}
],
answer:"계란 (gyeran)"
},

{
type:"image",
question:"우유 (uyu) کدام است؟",
speak:"우유",
options:[
{text:"계란 (gyeran)",image:"../../media/food/egg.webp"},
{text:"빵 (ppang)",image:"../../media/food/bread.webp"},
{text:"밥 (bap)",image:"../../media/food/rice.webp"},
{text:"우유 (uyu)",image:"../../media/food/milk.webp"}
],
answer:"우유 (uyu)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["밥","빵","고기","계란"],
answer:"빵"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["계란","밥","우유","빵"],
answer:"밥"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["빵","고기","우유","밥"],
answer:"고기"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["고기","밥","계란","빵"],
answer:"계란"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["계란","빵","밥","우유"],
answer:"우유"
},

/* AUDIO */

{
type:"audio",
speak:"빵",
question:"کدام کلمه را شنیدی؟",
options:["밥","빵","고기","계란"],
answer:"빵"
},

{
type:"audio",
speak:"밥",
question:"کدام کلمه را شنیدی؟",
options:["계란","밥","우유","빵"],
answer:"밥"
},

{
type:"audio",
speak:"고기",
question:"کدام کلمه را شنیدی؟",
options:["빵","고기","우유","밥"],
answer:"고기"
},

{
type:"audio",
speak:"계란",
question:"کدام کلمه را شنیدی؟",
options:["고기","밥","계란","빵"],
answer:"계란"
},

{
type:"audio",
speak:"우유",
question:"کدام کلمه را شنیدی؟",
options:["계란","빵","밥","우유"],
answer:"우유"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 빵을 좋아합니다",
question:"جمله کرهای را بساز:",
text:"من نان دوست دارم",
words:["저는","빵을","좋아합니다"],
answer:["저는","빵을","좋아합니다"]
},

{
type:"build-ko",
speak:"그녀는 밥을 먹습니다",
question:"جمله کرهای را بساز:",
text:"او برنج می‌خورد",
words:["그녀는","밥을","먹습니다"],
answer:["그녀는","밥을","먹습니다"]
},

{
type:"build-ko",
speak:"저는 고기가 있습니다",
question:"جمله کرهای را بساز:",
text:"من گوشت دارم",
words:["저는","고기가","있습니다"],
answer:["저는","고기가","있습니다"]
},

{
type:"build-ko",
speak:"그는 계란을 먹습니다",
question:"جمله کرهای را بساز:",
text:"او تخم‌مرغ می‌خورد",
words:["그는","계란을","먹습니다"],
answer:["그는","계란을","먹습니다"]
},

{
type:"build-ko",
speak:"저는 우유를 마십니다",
question:"جمله کرهای را بساز:",
text:"من شیر می‌نوشم",
words:["저는","우유를","마십니다"],
answer:["저는","우유를","마십니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 빵을 좋아합니다",
question:"ترجمه را بساز:",
text:"저는 빵을 좋아합니다",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"그녀는 밥을 먹습니다",
question:"ترجمه را بساز:",
text:"그녀는 밥을 먹습니다",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"저는 고기가 있습니다",
question:"ترجمه را بساز:",
text:"저는 고기가 있습니다",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"그는 계란을 먹습니다",
question:"ترجمه را بساز:",
text:"그는 계란을 먹습니다",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"저는 우유를 마십니다",
question:"ترجمه را بساز:",
text:"저는 우유를 마십니다",
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