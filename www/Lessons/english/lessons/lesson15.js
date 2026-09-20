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
question:"car کدام است؟",
speak:"car",
options:[
{text:"bus",image:"../../media/vehicles/bus.webp"},
{text:"car",image:"../../media/vehicles/car.webp"},
{text:"train",image:"../../media/vehicles/train.webp"},
{text:"airplane",image:"../../media/vehicles/airplane.webp"}
],
answer:"car"
},

{
type:"image",
question:"bus کدام است؟",
speak:"bus",
options:[
{text:"airplane",image:"../../media/vehicles/airplane.webp"},
{text:"bus",image:"../../media/vehicles/bus.webp"},
{text:"bicycle",image:"../../media/vehicles/bicycle.webp"},
{text:"car",image:"../../media/vehicles/car.webp"}
],
answer:"bus"
},

{
type:"image",
question:"train کدام است؟",
speak:"train",
options:[
{text:"car",image:"../../media/vehicles/car.webp"},
{text:"train",image:"../../media/vehicles/train.webp"},
{text:"bicycle",image:"../../media/vehicles/bicycle.webp"},
{text:"bus",image:"../../media/vehicles/bus.webp"}
],
answer:"train"
},

{
type:"image",
question:"airplane کدام است؟",
speak:"airplane",
options:[
{text:"train",image:"../../media/vehicles/train.webp"},
{text:"bus",image:"../../media/vehicles/bus.webp"},
{text:"airplane",image:"../../media/vehicles/airplane.webp"},
{text:"car",image:"../../media/vehicles/car.webp"}
],
answer:"airplane"
},

{
type:"image",
question:"bicycle کدام است؟",
speak:"bicycle",
options:[
{text:"airplane",image:"../../media/vehicles/airplane.webp"},
{text:"car",image:"../../media/vehicles/car.webp"},
{text:"bus",image:"../../media/vehicles/bus.webp"},
{text:"bicycle",image:"../../media/vehicles/bicycle.webp"}
],
answer:"bicycle"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/car.webp",
options:["bus","car","train","airplane"],
answer:"car"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bus.webp",
options:["airplane","bus","bicycle","car"],
answer:"bus"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/train.webp",
options:["car","train","bicycle","bus"],
answer:"train"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/airplane.webp",
options:["train","bus","airplane","car"],
answer:"airplane"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bicycle.webp",
options:["airplane","car","bus","bicycle"],
answer:"bicycle"
},

/* AUDIO */

{
type:"audio",
speak:"car",
question:"کدام کلمه را شنیدی؟",
options:["bus","car","train","airplane"],
answer:"car"
},

{
type:"audio",
speak:"bus",
question:"کدام کلمه را شنیدی؟",
options:["airplane","bus","bicycle","car"],
answer:"bus"
},

{
type:"audio",
speak:"train",
question:"کدام کلمه را شنیدی؟",
options:["car","train","bicycle","bus"],
answer:"train"
},

{
type:"audio",
speak:"airplane",
question:"کدام کلمه را شنیدی؟",
options:["train","bus","airplane","car"],
answer:"airplane"
},

{
type:"audio",
speak:"bicycle",
question:"کدام کلمه را شنیدی؟",
options:["airplane","car","bus","bicycle"],
answer:"bicycle"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I have a car",
question:"جمله انگلیسی را بساز:",
text:"من یک ماشین دارم",
words:["have","car","a","I"],
answer:["I","have","a","car"]
},

{
type:"build-en",
speak:"She has a bus",
question:"جمله انگلیسی را بساز:",
text:"او یک اتوبوس دارد",
words:["has","bus","a","She"],
answer:["She","has","a","bus"]
},

{
type:"build-en",
speak:"I see a train",
question:"جمله انگلیسی را بساز:",
text:"من یک قطار می‌بینم",
words:["see","train","a","I"],
answer:["I","see","a","train"]
},

{
type:"build-en",
speak:"He has an airplane",
question:"جمله انگلیسی را بساز:",
text:"او یک هواپیما دارد",
words:["has","airplane","an","He"],
answer:["He","has","an","airplane"]
},

{
type:"build-en",
speak:"I like the bicycle",
question:"جمله انگلیسی را بساز:",
text:"من دوچرخه را دوست دارم",
words:["like","the","bicycle","I"],
answer:["I","like","the","bicycle"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I have a car",
question:"ترجمه را بساز:",
text:"I have a car",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"She has a bus",
question:"ترجمه را بساز:",
text:"She has a bus",
words:["دارد","اتوبوس","یک","او"],
answer:["او","یک","اتوبوس","دارد"]
},

{
type:"build-fa",
speak:"I see a train",
question:"ترجمه را بساز:",
text:"I see a train",
words:["می‌بینم","قطار","یک","من"],
answer:["من","یک","قطار","می‌بینم"]
},

{
type:"build-fa",
speak:"He has an airplane",
question:"ترجمه را بساز:",
text:"He has an airplane",
words:["دارد","هواپیما","یک","او"],
answer:["او","یک","هواپیما","دارد"]
},

{
type:"build-fa",
speak:"I like the bicycle",
question:"ترجمه را بساز:",
text:"I like the bicycle",
words:["دارم","دوست","دوچرخه","را","من"],
answer:["من","دوچرخه","را","دوست","دارم"]
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