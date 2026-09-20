let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "tr-TR",
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
  utter.lang = "tr-TR";
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

/* IMAGE - افعال */

{
type:"image",
question:"Yemek کدام است؟",
speak:"yemek",
options:[
{text:"uyumak",image:"../../media/actions/sleep.webp"},
{text:"yemek",image:"../../media/actions/eat.webp"},
{text:"yürümek",image:"../../media/actions/walk.webp"},
{text:"okumak",image:"../../media/actions/read.webp"}
],
answer:"yemek"
},

{
type:"image",
question:"Uyumak کدام است؟",
speak:"uyumak",
options:[
{text:"yazmak",image:"../../media/actions/write.webp"},
{text:"uyumak",image:"../../media/actions/sleep.webp"},
{text:"yemek",image:"../../media/actions/eat.webp"},
{text:"yürümek",image:"../../media/actions/walk.webp"}
],
answer:"uyumak"
},

{
type:"image",
question:"Yürümek کدام است؟",
speak:"yürümek",
options:[
{text:"yemek",image:"../../media/actions/eat.webp"},
{text:"yürümek",image:"../../media/actions/walk.webp"},
{text:"yazmak",image:"../../media/actions/write.webp"},
{text:"uyumak",image:"../../media/actions/sleep.webp"}
],
answer:"yürümek"
},

{
type:"image",
question:"Okumak کدام است؟",
speak:"okumak",
options:[
{text:"yürümek",image:"../../media/actions/walk.webp"},
{text:"uyumak",image:"../../media/actions/sleep.webp"},
{text:"okumak",image:"../../media/actions/read.webp"},
{text:"yemek",image:"../../media/actions/eat.webp"}
],
answer:"okumak"
},

{
type:"image",
question:"Yazmak کدام است؟",
speak:"yazmak",
options:[
{text:"okumak",image:"../../media/actions/read.webp"},
{text:"yemek",image:"../../media/actions/eat.webp"},
{text:"uyumak",image:"../../media/actions/sleep.webp"},
{text:"yazmak",image:"../../media/actions/write.webp"}
],
answer:"yazmak"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.webp",
options:["uyumak","yemek","yürümek","okumak"],
answer:"yemek"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.webp",
options:["yazmak","uyumak","yemek","yürümek"],
answer:"uyumak"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.webp",
options:["yemek","yürümek","yazmak","uyumak"],
answer:"yürümek"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.webp",
options:["yürümek","uyumak","okumak","yemek"],
answer:"okumak"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.webp",
options:["okumak","yemek","uyumak","yazmak"],
answer:"yazmak"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"yemek",
question:"کدام کلمه را شنیدی؟",
options:["uyumak","yemek","yürümek","okumak"],
answer:"yemek"
},

{
type:"audio",
speak:"uyumak",
question:"کدام کلمه را شنیدی؟",
options:["yazmak","uyumak","yemek","yürümek"],
answer:"uyumak"
},

{
type:"audio",
speak:"yürümek",
question:"کدام کلمه را شنیدی؟",
options:["yemek","yürümek","yazmak","uyumak"],
answer:"yürümek"
},

{
type:"audio",
speak:"okumak",
question:"کدام کلمه را شنیدی؟",
options:["yürümek","uyumak","okumak","yemek"],
answer:"okumak"
},

{
type:"audio",
speak:"yazmak",
question:"کدام کلمه را شنیدی؟",
options:["okumak","yemek","uyumak","yazmak"],
answer:"yazmak"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Ekmek yiyorum",
question:"جمله ترکی را بساز:",
text:"من نان می‌خورم",
words:["Ekmek","yiyorum"],
answer:["Ekmek","yiyorum"]
},

{
type:"build-tr",
speak:"Gece uyuyor",
question:"جمله ترکی را بساز:",
text:"او شب می‌خوابد",
words:["Gece","uyuyor"],
answer:["Gece","uyuyor"]
},

{
type:"build-tr",
speak:"Okula yürüyor",
question:"جمله ترکی را بساز:",
text:"او به مدرسه راه می‌رود",
words:["Okula","yürüyor"],
answer:["Okula","yürüyor"]
},

{
type:"build-tr",
speak:"Kitap okuyorum",
question:"جمله ترکی را بساز:",
text:"من کتاب می‌خوانم",
words:["Kitap","okuyorum"],
answer:["Kitap","okuyorum"]
},

{
type:"build-tr",
speak:"Mektup yazıyorum",
question:"جمله ترکی را بساز:",
text:"من نامه می‌نویسم",
words:["Mektup","yazıyorum"],
answer:["Mektup","yazıyorum"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Ekmek yiyorum",
question:"ترجمه را بساز:",
text:"Ekmek yiyorum",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Gece uyuyor",
question:"ترجمه را بساز:",
text:"Gece uyuyor",
words:["می‌خوابد","شب","در","او"],
answer:["او","شب","می‌خوابد"]
},

{
type:"build-fa",
speak:"Okula yürüyor",
question:"ترجمه را بساز:",
text:"Okula yürüyor",
words:["می‌رود","مدرسه","به","او"],
answer:["او","به","مدرسه","می‌رود"]
},

{
type:"build-fa",
speak:"Kitap okuyorum",
question:"ترجمه را بساز:",
text:"Kitap okuyorum",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"Mektup yazıyorum",
question:"ترجمه را بساز:",
text:"Mektup yazıyorum",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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

  // BUILD TURKISH / FA

  else if (q.type === "build-tr" || q.type === "build-fa") {
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

  if (q.type === "build-tr") {
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