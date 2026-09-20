let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ja-JP",
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
  utter.lang = "ja-JP";
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
question:"パン (pan) کدام است؟",
speak:"パン",
options:[
{text:"ご飯 (gohan)",image:"../../media/food/rice.webp"},
{text:"パン (pan)",image:"../../media/food/bread.webp"},
{text:"肉 (niku)",image:"../../media/food/meat.webp"},
{text:"卵 (tamago)",image:"../../media/food/egg.webp"}
],
answer:"パン (pan)"
},

{
type:"image",
question:"ご飯 (gohan) کدام است؟",
speak:"ご飯",
options:[
{text:"卵 (tamago)",image:"../../media/food/egg.webp"},
{text:"ご飯 (gohan)",image:"../../media/food/rice.webp"},
{text:"牛乳 (gyuunyuu)",image:"../../media/food/milk.webp"},
{text:"パン (pan)",image:"../../media/food/bread.webp"}
],
answer:"ご飯 (gohan)"
},

{
type:"image",
question:"肉 (niku) کدام است؟",
speak:"肉",
options:[
{text:"パン (pan)",image:"../../media/food/bread.webp"},
{text:"肉 (niku)",image:"../../media/food/meat.webp"},
{text:"牛乳 (gyuunyuu)",image:"../../media/food/milk.webp"},
{text:"ご飯 (gohan)",image:"../../media/food/rice.webp"}
],
answer:"肉 (niku)"
},

{
type:"image",
question:"卵 (tamago) کدام است؟",
speak:"卵",
options:[
{text:"肉 (niku)",image:"../../media/food/meat.webp"},
{text:"ご飯 (gohan)",image:"../../media/food/rice.webp"},
{text:"卵 (tamago)",image:"../../media/food/egg.webp"},
{text:"パン (pan)",image:"../../media/food/bread.webp"}
],
answer:"卵 (tamago)"
},

{
type:"image",
question:"牛乳 (gyuunyuu) کدام است؟",
speak:"牛乳",
options:[
{text:"卵 (tamago)",image:"../../media/food/egg.webp"},
{text:"パン (pan)",image:"../../media/food/bread.webp"},
{text:"ご飯 (gohan)",image:"../../media/food/rice.webp"},
{text:"牛乳 (gyuunyuu)",image:"../../media/food/milk.webp"}
],
answer:"牛乳 (gyuunyuu)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["ご飯","パン","肉","卵"],
answer:"パン"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["卵","ご飯","牛乳","パン"],
answer:"ご飯"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["パン","肉","牛乳","ご飯"],
answer:"肉"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["肉","ご飯","卵","パン"],
answer:"卵"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["卵","パン","ご飯","牛乳"],
answer:"牛乳"
},

/* AUDIO */

{
type:"audio",
speak:"パン",
question:"کدام کلمه را شنیدی؟",
options:["ご飯","パン","肉","卵"],
answer:"パン"
},

{
type:"audio",
speak:"ご飯",
question:"کدام کلمه را شنیدی؟",
options:["卵","ご飯","牛乳","パン"],
answer:"ご飯"
},

{
type:"audio",
speak:"肉",
question:"کدام کلمه را شنیدی؟",
options:["パン","肉","牛乳","ご飯"],
answer:"肉"
},

{
type:"audio",
speak:"卵",
question:"کدام کلمه را شنیدی؟",
options:["肉","ご飯","卵","パン"],
answer:"卵"
},

{
type:"audio",
speak:"牛乳",
question:"کدام کلمه را شنیدی؟",
options:["卵","パン","ご飯","牛乳"],
answer:"牛乳"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"私はパンが好きです",
question:"جمله ژاپنی را بساز:",
text:"من نان دوست دارم",
words:["私","は","パン","が","好き","です"],
answer:["私","は","パン","が","好き","です"]
},

{
type:"build-jp",
speak:"彼女はご飯を食べます",
question:"جمله ژاپنی را بساز:",
text:"او برنج می‌خورد",
words:["彼女","は","ご飯","を","食べます"],
answer:["彼女","は","ご飯","を","食べます"]
},

{
type:"build-jp",
speak:"私は肉があります",
question:"جمله ژاپنی را بساز:",
text:"من گوشت دارم",
words:["私","は","肉","が","あります"],
answer:["私","は","肉","が","あります"]
},

{
type:"build-jp",
speak:"彼は卵を食べます",
question:"جمله ژاپنی را بساز:",
text:"او تخم‌مرغ می‌خورد",
words:["彼","は","卵","を","食べます"],
answer:["彼","は","卵","を","食べます"]
},

{
type:"build-jp",
speak:"私は牛乳を飲みます",
question:"جمله ژاپنی را بساز:",
text:"من شیر می‌نوشم",
words:["私","は","牛乳","を","飲みます"],
answer:["私","は","牛乳","を","飲みます"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"私はパンが好きです",
question:"ترجمه را بساز:",
text:"私はパンが好きです",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"彼女はご飯を食べます",
question:"ترجمه را بساز:",
text:"彼女はご飯を食べます",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"私は肉があります",
question:"ترجمه را بساز:",
text:"私は肉があります",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"彼は卵を食べます",
question:"ترجمه را بساز:",
text:"彼は卵を食べます",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"私は牛乳を飲みます",
question:"ترجمه را بساز:",
text:"私は牛乳を飲みます",
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

  // BUILD JAPANESE / FA

  else if (q.type === "build-jp" || q.type === "build-fa") {
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

  if (q.type === "build-jp") {
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