let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "it-IT",
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
  utter.lang = "it-IT";
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
question:"il cane کدام است؟",
speak:"il cane",
options:[
{text:"il gatto",image:"../../media/animals/cat.webp"},
{text:"il cane",image:"../../media/animals/dog.webp"},
{text:"l'uccello",image:"../../media/animals/bird.webp"},
{text:"il pesce",image:"../../media/animals/fish.webp"}
],
answer:"il cane"
},

{
type:"image",
question:"il gatto کدام است؟",
speak:"il gatto",
options:[
{text:"il pesce",image:"../../media/animals/fish.webp"},
{text:"il gatto",image:"../../media/animals/cat.webp"},
{text:"il cavallo",image:"../../media/animals/horse.webp"},
{text:"il cane",image:"../../media/animals/dog.webp"}
],
answer:"il gatto"
},

{
type:"image",
question:"l'uccello کدام است؟",
speak:"l'uccello",
options:[
{text:"il cane",image:"../../media/animals/dog.webp"},
{text:"l'uccello",image:"../../media/animals/bird.webp"},
{text:"il cavallo",image:"../../media/animals/horse.webp"},
{text:"il gatto",image:"../../media/animals/cat.webp"}
],
answer:"l'uccello"
},

{
type:"image",
question:"il pesce کدام است؟",
speak:"il pesce",
options:[
{text:"l'uccello",image:"../../media/animals/bird.webp"},
{text:"il gatto",image:"../../media/animals/cat.webp"},
{text:"il pesce",image:"../../media/animals/fish.webp"},
{text:"il cane",image:"../../media/animals/dog.webp"}
],
answer:"il pesce"
},

{
type:"image",
question:"il cavallo کدام است؟",
speak:"il cavallo",
options:[
{text:"il pesce",image:"../../media/animals/fish.webp"},
{text:"il cane",image:"../../media/animals/dog.webp"},
{text:"il gatto",image:"../../media/animals/cat.webp"},
{text:"il cavallo",image:"../../media/animals/horse.webp"}
],
answer:"il cavallo"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/dog.webp",
options:["il gatto","il cane","l'uccello","il pesce"],
answer:"il cane"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/cat.webp",
options:["il pesce","il gatto","il cavallo","il cane"],
answer:"il gatto"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/bird.webp",
options:["il cane","l'uccello","il cavallo","il gatto"],
answer:"l'uccello"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/fish.webp",
options:["l'uccello","il gatto","il pesce","il cane"],
answer:"il pesce"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/horse.webp",
options:["il pesce","il cane","il gatto","il cavallo"],
answer:"il cavallo"
},

/* AUDIO */

{
type:"audio",
speak:"il cane",
question:"کدام کلمه را شنیدی؟",
options:["il gatto","il cane","l'uccello","il pesce"],
answer:"il cane"
},

{
type:"audio",
speak:"il gatto",
question:"کدام کلمه را شنیدی؟",
options:["il pesce","il gatto","il cavallo","il cane"],
answer:"il gatto"
},

{
type:"audio",
speak:"l'uccello",
question:"کدام کلمه را شنیدی؟",
options:["il cane","l'uccello","il cavallo","il gatto"],
answer:"l'uccello"
},

{
type:"audio",
speak:"il pesce",
question:"کدام کلمه را شنیدی؟",
options:["l'uccello","il gatto","il pesce","il cane"],
answer:"il pesce"
},

{
type:"audio",
speak:"il cavallo",
question:"کدام کلمه را شنیدی؟",
options:["il pesce","il cane","il gatto","il cavallo"],
answer:"il cavallo"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Io ho un cane",
question:"جمله ایتالیایی را بساز:",
text:"من یک سگ دارم",
words:["Io","ho","un","cane"],
answer:["Io","ho","un","cane"]
},

{
type:"build-it",
speak:"Lei ha un gatto",
question:"جمله ایتالیایی را بساز:",
text:"او یک گربه دارد",
words:["Lei","ha","un","gatto"],
answer:["Lei","ha","un","gatto"]
},

{
type:"build-it",
speak:"Io vedo un uccello",
question:"جمله ایتالیایی را بساز:",
text:"من یک پرنده می‌بینم",
words:["Io","vedo","un","uccello"],
answer:["Io","vedo","un","uccello"]
},

{
type:"build-it",
speak:"Lui ha un pesce",
question:"جمله ایتالیایی را بساز:",
text:"او یک ماهی دارد",
words:["Lui","ha","un","pesce"],
answer:["Lui","ha","un","pesce"]
},

{
type:"build-it",
speak:"Questo è un cavallo",
question:"جمله ایتالیایی را بساز:",
text:"این یک اسب است",
words:["Questo","è","un","cavallo"],
answer:["Questo","è","un","cavallo"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Io ho un cane",
question:"ترجمه را بساز:",
text:"Io ho un cane",
words:["دارم","سگ","یک","من"],
answer:["من","یک","سگ","دارم"]
},

{
type:"build-fa",
speak:"Lei ha un gatto",
question:"ترجمه را بساز:",
text:"Lei ha un gatto",
words:["دارد","گربه","یک","او"],
answer:["او","یک","گربه","دارد"]
},

{
type:"build-fa",
speak:"Io vedo un uccello",
question:"ترجمه را بساز:",
text:"Io vedo un uccello",
words:["می‌بینم","پرنده","یک","من"],
answer:["من","یک","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Lui ha un pesce",
question:"ترجمه را بساز:",
text:"Lui ha un pesce",
words:["دارد","ماهی","یک","او"],
answer:["او","یک","ماهی","دارد"]
},

{
type:"build-fa",
speak:"Questo è un cavallo",
question:"ترجمه را بساز:",
text:"Questo è un cavallo",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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

  // BUILD ITALIAN / FA

  else if (q.type === "build-it" || q.type === "build-fa") {
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

  if (q.type === "build-it") {
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