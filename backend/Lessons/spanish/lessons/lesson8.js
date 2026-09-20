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

/* IMAGE - حیوانات */

{
type:"image",
question:"Perro کدام است؟",
speak:"perro",
options:[
{text:"gato",image:"../../media/animals/cat.webp"},
{text:"perro",image:"../../media/animals/dog.webp"},
{text:"pájaro",image:"../../media/animals/bird.webp"},
{text:"pez",image:"../../media/animals/fish.webp"}
],
answer:"perro"
},

{
type:"image",
question:"Gato کدام است؟",
speak:"gato",
options:[
{text:"pez",image:"../../media/animals/fish.webp"},
{text:"gato",image:"../../media/animals/cat.webp"},
{text:"caballo",image:"../../media/animals/horse.webp"},
{text:"perro",image:"../../media/animals/dog.webp"}
],
answer:"gato"
},

{
type:"image",
question:"Pájaro کدام است؟",
speak:"pájaro",
options:[
{text:"perro",image:"../../media/animals/dog.webp"},
{text:"pájaro",image:"../../media/animals/bird.webp"},
{text:"caballo",image:"../../media/animals/horse.webp"},
{text:"gato",image:"../../media/animals/cat.webp"}
],
answer:"pájaro"
},

{
type:"image",
question:"Pez کدام است؟",
speak:"pez",
options:[
{text:"pájaro",image:"../../media/animals/bird.webp"},
{text:"gato",image:"../../media/animals/cat.webp"},
{text:"pez",image:"../../media/animals/fish.webp"},
{text:"perro",image:"../../media/animals/dog.webp"}
],
answer:"pez"
},

{
type:"image",
question:"Caballo کدام است؟",
speak:"caballo",
options:[
{text:"pez",image:"../../media/animals/fish.webp"},
{text:"perro",image:"../../media/animals/dog.webp"},
{text:"gato",image:"../../media/animals/cat.webp"},
{text:"caballo",image:"../../media/animals/horse.webp"}
],
answer:"caballo"
},

/* WORD - کلمه از روی تصویر */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/dog.webp",
options:["gato","perro","pájaro","pez"],
answer:"perro"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/cat.webp",
options:["pez","gato","caballo","perro"],
answer:"gato"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/bird.webp",
options:["perro","pájaro","caballo","gato"],
answer:"pájaro"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/fish.webp",
options:["pájaro","gato","pez","perro"],
answer:"pez"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/horse.webp",
options:["pez","perro","gato","caballo"],
answer:"caballo"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"perro",
question:"کدام کلمه را شنیدی؟",
options:["gato","perro","pájaro","pez"],
answer:"perro"
},

{
type:"audio",
speak:"gato",
question:"کدام کلمه را شنیدی؟",
options:["pez","gato","caballo","perro"],
answer:"gato"
},

{
type:"audio",
speak:"pájaro",
question:"کدام کلمه را شنیدی؟",
options:["perro","pájaro","caballo","gato"],
answer:"pájaro"
},

{
type:"audio",
speak:"pez",
question:"کدام کلمه را شنیدی؟",
options:["pájaro","gato","pez","perro"],
answer:"pez"
},

{
type:"audio",
speak:"caballo",
question:"کدام کلمه را شنیدی؟",
options:["pez","perro","gato","caballo"],
answer:"caballo"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Tengo un perro",
question:"جمله اسپانیایی را بساز:",
text:"من یک سگ دارم",
words:["Tengo","un","perro"],
answer:["Tengo","un","perro"]
},

{
type:"build-es",
speak:"Ella tiene un gato",
question:"جمله اسپانیایی را بساز:",
text:"او یک گربه دارد",
words:["Ella","tiene","un","gato"],
answer:["Ella","tiene","un","gato"]
},

{
type:"build-es",
speak:"Veo un pájaro",
question:"جمله اسپانیایی را بساز:",
text:"من یک پرنده می‌بینم",
words:["Veo","un","pájaro"],
answer:["Veo","un","pájaro"]
},

{
type:"build-es",
speak:"Él tiene un pez",
question:"جمله اسپانیایی را بساز:",
text:"او یک ماهی دارد",
words:["Él","tiene","un","pez"],
answer:["Él","tiene","un","pez"]
},

{
type:"build-es",
speak:"Este es un caballo",
question:"جمله اسپانیایی را بساز:",
text:"این یک اسب است",
words:["Este","es","un","caballo"],
answer:["Este","es","un","caballo"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Tengo un perro",
question:"ترجمه را بساز:",
text:"Tengo un perro",
words:["دارم","سگ","یک","من"],
answer:["من","یک","سگ","دارم"]
},

{
type:"build-fa",
speak:"Ella tiene un gato",
question:"ترجمه را بساز:",
text:"Ella tiene un gato",
words:["دارد","گربه","یک","او"],
answer:["او","یک","گربه","دارد"]
},

{
type:"build-fa",
speak:"Veo un pájaro",
question:"ترجمه را بساز:",
text:"Veo un pájaro",
words:["می‌بینم","پرنده","یک","من"],
answer:["من","یک","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Él tiene un pez",
question:"ترجمه را بساز:",
text:"Él tiene un pez",
words:["دارد","ماهی","یک","او"],
answer:["او","یک","ماهی","دارد"]
},

{
type:"build-fa",
speak:"Este es un caballo",
question:"ترجمه را بساز:",
text:"Este es un caballo",
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