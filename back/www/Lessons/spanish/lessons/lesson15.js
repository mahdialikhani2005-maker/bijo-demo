let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "es-ES",
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
  utter.lang = "es-ES";
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

/* IMAGE - وسایل نقلیه */

{
type:"image",
question:"Coche کدام است؟",
speak:"coche",
options:[
{text:"autobús",image:"../../media/vehicles/bus.webp"},
{text:"coche",image:"../../media/vehicles/car.webp"},
{text:"tren",image:"../../media/vehicles/train.webp"},
{text:"avión",image:"../../media/vehicles/airplane.webp"}
],
answer:"coche"
},

{
type:"image",
question:"Autobús کدام است؟",
speak:"autobús",
options:[
{text:"avión",image:"../../media/vehicles/airplane.webp"},
{text:"autobús",image:"../../media/vehicles/bus.webp"},
{text:"bicicleta",image:"../../media/vehicles/bicycle.webp"},
{text:"coche",image:"../../media/vehicles/car.webp"}
],
answer:"autobús"
},

{
type:"image",
question:"Tren کدام است؟",
speak:"tren",
options:[
{text:"coche",image:"../../media/vehicles/car.webp"},
{text:"tren",image:"../../media/vehicles/train.webp"},
{text:"bicicleta",image:"../../media/vehicles/bicycle.webp"},
{text:"autobús",image:"../../media/vehicles/bus.webp"}
],
answer:"tren"
},

{
type:"image",
question:"Avión کدام است؟",
speak:"avión",
options:[
{text:"tren",image:"../../media/vehicles/train.webp"},
{text:"autobús",image:"../../media/vehicles/bus.webp"},
{text:"avión",image:"../../media/vehicles/airplane.webp"},
{text:"coche",image:"../../media/vehicles/car.webp"}
],
answer:"avión"
},

{
type:"image",
question:"Bicicleta کدام است؟",
speak:"bicicleta",
options:[
{text:"avión",image:"../../media/vehicles/airplane.webp"},
{text:"coche",image:"../../media/vehicles/car.webp"},
{text:"autobús",image:"../../media/vehicles/bus.webp"},
{text:"bicicleta",image:"../../media/vehicles/bicycle.webp"}
],
answer:"bicicleta"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/car.webp",
options:["autobús","coche","tren","avión"],
answer:"coche"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bus.webp",
options:["avión","autobús","bicicleta","coche"],
answer:"autobús"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/train.webp",
options:["coche","tren","bicicleta","autobús"],
answer:"tren"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/airplane.webp",
options:["tren","autobús","avión","coche"],
answer:"avión"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vehicles/bicycle.webp",
options:["avión","coche","autobús","bicicleta"],
answer:"bicicleta"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"coche",
question:"کدام کلمه را شنیدی؟",
options:["autobús","coche","tren","avión"],
answer:"coche"
},

{
type:"audio",
speak:"autobús",
question:"کدام کلمه را شنیدی؟",
options:["avión","autobús","bicicleta","coche"],
answer:"autobús"
},

{
type:"audio",
speak:"tren",
question:"کدام کلمه را شنیدی؟",
options:["coche","tren","bicicleta","autobús"],
answer:"tren"
},

{
type:"audio",
speak:"avión",
question:"کدام کلمه را شنیدی؟",
options:["tren","autobús","avión","coche"],
answer:"avión"
},

{
type:"audio",
speak:"bicicleta",
question:"کدام کلمه را شنیدی؟",
options:["avión","coche","autobús","bicicleta"],
answer:"bicicleta"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Tengo un coche",
question:"جمله اسپانیایی را بساز:",
text:"من یک ماشین دارم",
words:["Tengo","un","coche"],
answer:["Tengo","un","coche"]
},

{
type:"build-es",
speak:"Ella tiene un autobús",
question:"جمله اسپانیایی را بساز:",
text:"او یک اتوبوس دارد",
words:["Ella","tiene","un","autobús"],
answer:["Ella","tiene","un","autobús"]
},

{
type:"build-es",
speak:"Veo un tren",
question:"جمله اسپانیایی را بساز:",
text:"من یک قطار می‌بینم",
words:["Veo","un","tren"],
answer:["Veo","un","tren"]
},

{
type:"build-es",
speak:"Él tiene un avión",
question:"جمله اسپانیایی را بساز:",
text:"او یک هواپیما دارد",
words:["Él","tiene","un","avión"],
answer:["Él","tiene","un","avión"]
},

{
type:"build-es",
speak:"Me gusta la bicicleta",
question:"جمله اسپانیایی را بساز:",
text:"من دوچرخه را دوست دارم",
words:["Me","gusta","la","bicicleta"],
answer:["Me","gusta","la","bicicleta"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Tengo un coche",
question:"ترجمه را بساز:",
text:"Tengo un coche",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"Ella tiene un autobús",
question:"ترجمه را بساز:",
text:"Ella tiene un autobús",
words:["دارد","اتوبوس","یک","او"],
answer:["او","یک","اتوبوس","دارد"]
},

{
type:"build-fa",
speak:"Veo un tren",
question:"ترجمه را بساز:",
text:"Veo un tren",
words:["می‌بینم","قطار","یک","من"],
answer:["من","یک","قطار","می‌بینم"]
},

{
type:"build-fa",
speak:"Él tiene un avión",
question:"ترجمه را بساز:",
text:"Él tiene un avión",
words:["دارد","هواپیما","یک","او"],
answer:["او","یک","هواپیما","دارد"]
},

{
type:"build-fa",
speak:"Me gusta la bicicleta",
question:"ترجمه را بساز:",
text:"Me gusta la bicicleta",
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

  // BUILD SPANISH / FA

  else if (q.type === "build-es" || q.type === "build-fa") {
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

  if (q.type === "build-es") {
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