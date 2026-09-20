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
question:"사과 (sagwa) کدام است؟",
speak:"사과",
options:[
{text:"바나나 (banana)",image:"../../media/fruits/banana.webp"},
{text:"사과 (sagwa)",image:"../../media/fruits/apple.webp"},
{text:"오렌지 (orenji)",image:"../../media/fruits/orange.webp"},
{text:"포도 (podo)",image:"../../media/fruits/grape.webp"}
],
answer:"사과 (sagwa)"
},

{
type:"image",
question:"바나나 (banana) کدام است؟",
speak:"바나나",
options:[
{text:"포도 (podo)",image:"../../media/fruits/grape.webp"},
{text:"바나나 (banana)",image:"../../media/fruits/banana.webp"},
{text:"수박 (subak)",image:"../../media/fruits/watermelon.webp"},
{text:"사과 (sagwa)",image:"../../media/fruits/apple.webp"}
],
answer:"바나나 (banana)"
},

{
type:"image",
question:"오렌지 (orenji) کدام است؟",
speak:"오렌지",
options:[
{text:"사과 (sagwa)",image:"../../media/fruits/apple.webp"},
{text:"오렌지 (orenji)",image:"../../media/fruits/orange.webp"},
{text:"수박 (subak)",image:"../../media/fruits/watermelon.webp"},
{text:"바나나 (banana)",image:"../../media/fruits/banana.webp"}
],
answer:"오렌지 (orenji)"
},

{
type:"image",
question:"포도 (podo) کدام است؟",
speak:"포도",
options:[
{text:"오렌지 (orenji)",image:"../../media/fruits/orange.webp"},
{text:"바나나 (banana)",image:"../../media/fruits/banana.webp"},
{text:"포도 (podo)",image:"../../media/fruits/grape.webp"},
{text:"사과 (sagwa)",image:"../../media/fruits/apple.webp"}
],
answer:"포도 (podo)"
},

{
type:"image",
question:"수박 (subak) کدام است؟",
speak:"수박",
options:[
{text:"포도 (podo)",image:"../../media/fruits/grape.webp"},
{text:"사과 (sagwa)",image:"../../media/fruits/apple.webp"},
{text:"바나나 (banana)",image:"../../media/fruits/banana.webp"},
{text:"수박 (subak)",image:"../../media/fruits/watermelon.webp"}
],
answer:"수박 (subak)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/apple.webp",
options:["바나나","사과","오렌지","포도"],
answer:"사과"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/banana.webp",
options:["포도","바나나","수박","사과"],
answer:"바나나"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/orange.webp",
options:["사과","오렌지","수박","바나나"],
answer:"오렌지"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/grape.webp",
options:["오렌지","바나나","포도","사과"],
answer:"포도"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/fruits/watermelon.webp",
options:["포도","사과","바나나","수박"],
answer:"수박"
},

/* AUDIO */

{
type:"audio",
speak:"사과",
question:"کدام کلمه را شنیدی؟",
options:["바나나","사과","오렌지","포도"],
answer:"사과"
},

{
type:"audio",
speak:"바나나",
question:"کدام کلمه را شنیدی؟",
options:["포도","바나나","수박","사과"],
answer:"바나나"
},

{
type:"audio",
speak:"오렌지",
question:"کدام کلمه را شنیدی؟",
options:["사과","오렌지","수박","바나나"],
answer:"오렌지"
},

{
type:"audio",
speak:"포도",
question:"کدام کلمه را شنیدی؟",
options:["오렌지","바나나","포도","사과"],
answer:"포도"
},

{
type:"audio",
speak:"수박",
question:"کدام کلمه را شنیدی؟",
options:["포도","사과","바나나","수박"],
answer:"수박"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 사과를 먹습니다",
question:"جمله کرهای را بساز:",
text:"من یک سیب می‌خورم",
words:["저는","사과를","먹습니다"],
answer:["저는","사과를","먹습니다"]
},

{
type:"build-ko",
speak:"그녀는 바나나가 있습니다",
question:"جمله کرهای را بساز:",
text:"او یک موز دارد",
words:["그녀는","바나나가","있습니다"],
answer:["그녀는","바나나가","있습니다"]
},

{
type:"build-ko",
speak:"이것은 오렌지입니다",
question:"جمله کرهای را بساز:",
text:"این یک پرتقال است",
words:["이것은","오렌지","입니다"],
answer:["이것은","오렌지","입니다"]
},

{
type:"build-ko",
speak:"저는 포도를 좋아합니다",
question:"جمله کرهای را بساز:",
text:"من انگور دوست دارم",
words:["저는","포도를","좋아합니다"],
answer:["저는","포도를","좋아합니다"]
},

{
type:"build-ko",
speak:"그는 수박을 먹습니다",
question:"جمله کرهای را بساز:",
text:"او هندوانه می‌خورد",
words:["그는","수박을","먹습니다"],
answer:["그는","수박을","먹습니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 사과를 먹습니다",
question:"ترجمه را بساز:",
text:"저는 사과를 먹습니다",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"그녀는 바나나가 있습니다",
question:"ترجمه را بساز:",
text:"그녀는 바나나가 있습니다",
words:["دارد","موز","یک","او"],
answer:["او","یک","موز","دارد"]
},

{
type:"build-fa",
speak:"이것은 오렌지입니다",
question:"ترجمه را بساز:",
text:"이것은 오렌지입니다",
words:["است","پرتقال","یک","این"],
answer:["این","یک","پرتقال","است"]
},

{
type:"build-fa",
speak:"저는 포도를 좋아합니다",
question:"ترجمه را بساز:",
text:"저는 포도를 좋아합니다",
words:["دارم","دوست","انگور","من"],
answer:["من","انگور","دوست","دارم"]
},

{
type:"build-fa",
speak:"그는 수박을 먹습니다",
question:"ترجمه را بساز:",
text:"그는 수박을 먹습니다",
words:["می‌خورد","هندوانه","او"],
answer:["او","هندوانه","می‌خورد"]
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