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

/* IMAGE - لباس‌ها */

{
type:"image",
question:"Gömlek کدام است؟",
speak:"gömlek",
options:[
{text:"pantolon",image:"../../media/clothes/pants.webp"},
{text:"gömlek",image:"../../media/clothes/shirt.webp"},
{text:"şapka",image:"../../media/clothes/hat.webp"},
{text:"elbise",image:"../../media/clothes/dress.webp"}
],
answer:"gömlek"
},

{
type:"image",
question:"Pantolon کدام است؟",
speak:"pantolon",
options:[
{text:"elbise",image:"../../media/clothes/dress.webp"},
{text:"pantolon",image:"../../media/clothes/pants.webp"},
{text:"ayakkabı",image:"../../media/clothes/shoes.webp"},
{text:"gömlek",image:"../../media/clothes/shirt.webp"}
],
answer:"pantolon"
},

{
type:"image",
question:"Ayakkabı کدام است؟",
speak:"ayakkabı",
options:[
{text:"gömlek",image:"../../media/clothes/shirt.webp"},
{text:"ayakkabı",image:"../../media/clothes/shoes.webp"},
{text:"şapka",image:"../../media/clothes/hat.webp"},
{text:"pantolon",image:"../../media/clothes/pants.webp"}
],
answer:"ayakkabı"
},

{
type:"image",
question:"Şapka کدام است؟",
speak:"şapka",
options:[
{text:"ayakkabı",image:"../../media/clothes/shoes.webp"},
{text:"pantolon",image:"../../media/clothes/pants.webp"},
{text:"şapka",image:"../../media/clothes/hat.webp"},
{text:"gömlek",image:"../../media/clothes/shirt.webp"}
],
answer:"şapka"
},

{
type:"image",
question:"Elbise کدام است؟",
speak:"elbise",
options:[
{text:"şapka",image:"../../media/clothes/hat.webp"},
{text:"gömlek",image:"../../media/clothes/shirt.webp"},
{text:"pantolon",image:"../../media/clothes/pants.webp"},
{text:"elbise",image:"../../media/clothes/dress.webp"}
],
answer:"elbise"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shirt.webp",
options:["pantolon","gömlek","şapka","elbise"],
answer:"gömlek"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/pants.webp",
options:["elbise","pantolon","ayakkabı","gömlek"],
answer:"pantolon"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/shoes.webp",
options:["gömlek","ayakkabı","şapka","pantolon"],
answer:"ayakkabı"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/hat.webp",
options:["ayakkabı","pantolon","şapka","gömlek"],
answer:"şapka"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/clothes/dress.webp",
options:["şapka","gömlek","pantolon","elbise"],
answer:"elbise"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"gömlek",
question:"کدام کلمه را شنیدی؟",
options:["pantolon","gömlek","şapka","elbise"],
answer:"gömlek"
},

{
type:"audio",
speak:"pantolon",
question:"کدام کلمه را شنیدی؟",
options:["elbise","pantolon","ayakkabı","gömlek"],
answer:"pantolon"
},

{
type:"audio",
speak:"ayakkabı",
question:"کدام کلمه را شنیدی؟",
options:["gömlek","ayakkabı","şapka","pantolon"],
answer:"ayakkabı"
},

{
type:"audio",
speak:"şapka",
question:"کدام کلمه را شنیدی؟",
options:["ayakkabı","pantolon","şapka","gömlek"],
answer:"şapka"
},

{
type:"audio",
speak:"elbise",
question:"کدام کلمه را شنیدی؟",
options:["şapka","gömlek","pantolon","elbise"],
answer:"elbise"
},

/* BUILD TR - ساخت جمله ترکی */

{
type:"build-tr",
speak:"Bu bir gömlek",
question:"جمله ترکی را بساز:",
text:"این یک پیراهن است",
words:["Bu","bir","gömlek"],
answer:["Bu","bir","gömlek"]
},

{
type:"build-tr",
speak:"Bu bir şapka",
question:"جمله ترکی را بساز:",
text:"این یک کلاه است",
words:["Bu","bir","şapka"],
answer:["Bu","bir","şapka"]
},

{
type:"build-tr",
speak:"Bunlar ayakkabı",
question:"جمله ترکی را بساز:",
text:"این کفش‌ها هستند",
words:["Bunlar","ayakkabı"],
answer:["Bunlar","ayakkabı"]
},

{
type:"build-tr",
speak:"Bunlar pantolon",
question:"جمله ترکی را بساز:",
text:"این شلوارها هستند",
words:["Bunlar","pantolon"],
answer:["Bunlar","pantolon"]
},

{
type:"build-tr",
speak:"Bu bir elbise",
question:"جمله ترکی را بساز:",
text:"این یک لباس است",
words:["Bu","bir","elbise"],
answer:["Bu","bir","elbise"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Bu bir gömlek",
question:"ترجمه را بساز:",
text:"Bu bir gömlek",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"Bu bir şapka",
question:"ترجمه را بساز:",
text:"Bu bir şapka",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"Bunlar ayakkabı",
question:"ترجمه را بساز:",
text:"Bunlar ayakkabı",
words:["هستند","کفش","این"],
answer:["این","کفش","هستند"]
},

{
type:"build-fa",
speak:"Bunlar pantolon",
question:"ترجمه را بساز:",
text:"Bunlar pantolon",
words:["هستند","شلوار","این"],
answer:["این","شلوار","هستند"]
},

{
type:"build-fa",
speak:"Bu bir elbise",
question:"ترجمه را بساز:",
text:"Bu bir elbise",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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