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
question:"tomato کدام است؟",
speak:"tomato",
options:[
{text:"potato",image:"../../media/vegetables/potato.webp"},
{text:"tomato",image:"../../media/vegetables/tomato.webp"},
{text:"carrot",image:"../../media/vegetables/carrot.webp"},
{text:"onion",image:"../../media/vegetables/onion.webp"}
],
answer:"tomato"
},

{
type:"image",
question:"potato کدام است؟",
speak:"potato",
options:[
{text:"onion",image:"../../media/vegetables/onion.webp"},
{text:"potato",image:"../../media/vegetables/potato.webp"},
{text:"cucumber",image:"../../media/vegetables/cucumber.webp"},
{text:"tomato",image:"../../media/vegetables/tomato.webp"}
],
answer:"potato"
},

{
type:"image",
question:"carrot کدام است؟",
speak:"carrot",
options:[
{text:"tomato",image:"../../media/vegetables/tomato.webp"},
{text:"carrot",image:"../../media/vegetables/carrot.webp"},
{text:"cucumber",image:"../../media/vegetables/cucumber.webp"},
{text:"potato",image:"../../media/vegetables/potato.webp"}
],
answer:"carrot"
},

{
type:"image",
question:"onion کدام است؟",
speak:"onion",
options:[
{text:"carrot",image:"../../media/vegetables/carrot.webp"},
{text:"potato",image:"../../media/vegetables/potato.webp"},
{text:"onion",image:"../../media/vegetables/onion.webp"},
{text:"tomato",image:"../../media/vegetables/tomato.webp"}
],
answer:"onion"
},

{
type:"image",
question:"cucumber کدام است؟",
speak:"cucumber",
options:[
{text:"onion",image:"../../media/vegetables/onion.webp"},
{text:"tomato",image:"../../media/vegetables/tomato.webp"},
{text:"potato",image:"../../media/vegetables/potato.webp"},
{text:"cucumber",image:"../../media/vegetables/cucumber.webp"}
],
answer:"cucumber"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.webp",
options:["potato","tomato","carrot","onion"],
answer:"tomato"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.webp",
options:["onion","potato","cucumber","tomato"],
answer:"potato"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.webp",
options:["tomato","carrot","cucumber","potato"],
answer:"carrot"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.webp",
options:["carrot","potato","onion","tomato"],
answer:"onion"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.webp",
options:["onion","tomato","potato","cucumber"],
answer:"cucumber"
},

/* AUDIO */

{
type:"audio",
speak:"tomato",
question:"کدام کلمه را شنیدی؟",
options:["potato","tomato","carrot","onion"],
answer:"tomato"
},

{
type:"audio",
speak:"potato",
question:"کدام کلمه را شنیدی؟",
options:["onion","potato","cucumber","tomato"],
answer:"potato"
},

{
type:"audio",
speak:"carrot",
question:"کدام کلمه را شنیدی؟",
options:["tomato","carrot","cucumber","potato"],
answer:"carrot"
},

{
type:"audio",
speak:"onion",
question:"کدام کلمه را شنیدی؟",
options:["carrot","potato","onion","tomato"],
answer:"onion"
},

{
type:"audio",
speak:"cucumber",
question:"کدام کلمه را شنیدی؟",
options:["onion","tomato","potato","cucumber"],
answer:"cucumber"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I like tomatoes",
question:"جمله انگلیسی را بساز:",
text:"من گوجه‌فرنگی دوست دارم",
words:["like","tomatoes","I"],
answer:["I","like","tomatoes"]
},

{
type:"build-en",
speak:"She eats a potato",
question:"جمله انگلیسی را بساز:",
text:"او یک سیب‌زمینی می‌خورد",
words:["eats","a","potato","She"],
answer:["She","eats","a","potato"]
},

{
type:"build-en",
speak:"This is a carrot",
question:"جمله انگلیسی را بساز:",
text:"این یک هویج است",
words:["is","a","carrot","This"],
answer:["This","is","a","carrot"]
},

{
type:"build-en",
speak:"I have an onion",
question:"جمله انگلیسی را بساز:",
text:"من یک پیاز دارم",
words:["have","an","onion","I"],
answer:["I","have","an","onion"]
},

{
type:"build-en",
speak:"He eats a cucumber",
question:"جمله انگلیسی را بساز:",
text:"او یک خیار می‌خورد",
words:["eats","a","cucumber","He"],
answer:["He","eats","a","cucumber"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I like tomatoes",
question:"ترجمه را بساز:",
text:"I like tomatoes",
words:["دارم","دوست","گوجه‌فرنگی","من"],
answer:["من","گوجه‌فرنگی","دوست","دارم"]
},

{
type:"build-fa",
speak:"She eats a potato",
question:"ترجمه را بساز:",
text:"She eats a potato",
words:["می‌خورد","سیب‌زمینی","یک","او"],
answer:["او","یک","سیب‌زمینی","می‌خورد"]
},

{
type:"build-fa",
speak:"This is a carrot",
question:"ترجمه را بساز:",
text:"This is a carrot",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"I have an onion",
question:"ترجمه را بساز:",
text:"I have an onion",
words:["دارم","پیاز","یک","من"],
answer:["من","یک","پیاز","دارم"]
},

{
type:"build-fa",
speak:"He eats a cucumber",
question:"ترجمه را بساز:",
text:"He eats a cucumber",
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