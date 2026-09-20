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

/* IMAGE - اعداد ۱ تا ۵ */

{
type:"image",
question:"Uno کدام است؟",
speak:"uno",
options:[
{text:"dos",image:"../../media/numbers/two.webp"},
{text:"uno",image:"../../media/numbers/one.webp"},
{text:"tres",image:"../../media/numbers/three.webp"},
{text:"cuatro",image:"../../media/numbers/four.webp"}
],
answer:"uno"
},

{
type:"image",
question:"Dos کدام است؟",
speak:"dos",
options:[
{text:"cuatro",image:"../../media/numbers/four.webp"},
{text:"dos",image:"../../media/numbers/two.webp"},
{text:"cinco",image:"../../media/numbers/five.webp"},
{text:"uno",image:"../../media/numbers/one.webp"}
],
answer:"dos"
},

{
type:"image",
question:"Tres کدام است؟",
speak:"tres",
options:[
{text:"uno",image:"../../media/numbers/one.webp"},
{text:"tres",image:"../../media/numbers/three.webp"},
{text:"cinco",image:"../../media/numbers/five.webp"},
{text:"dos",image:"../../media/numbers/two.webp"}
],
answer:"tres"
},

{
type:"image",
question:"Cuatro کدام است؟",
speak:"cuatro",
options:[
{text:"tres",image:"../../media/numbers/three.webp"},
{text:"dos",image:"../../media/numbers/two.webp"},
{text:"cuatro",image:"../../media/numbers/four.webp"},
{text:"uno",image:"../../media/numbers/one.webp"}
],
answer:"cuatro"
},

{
type:"image",
question:"Cinco کدام است؟",
speak:"cinco",
options:[
{text:"cuatro",image:"../../media/numbers/four.webp"},
{text:"uno",image:"../../media/numbers/one.webp"},
{text:"dos",image:"../../media/numbers/two.webp"},
{text:"cinco",image:"../../media/numbers/five.webp"}
],
answer:"cinco"
},

/* WORD - عدد از روی تصویر */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["dos","uno","tres","cuatro"],
answer:"uno"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["cuatro","dos","cinco","uno"],
answer:"dos"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["uno","tres","cinco","dos"],
answer:"tres"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["tres","dos","cuatro","uno"],
answer:"cuatro"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["cuatro","uno","dos","cinco"],
answer:"cinco"
},

/* AUDIO - گوش دادن و انتخاب */

{
type:"audio",
speak:"uno",
question:"کدام عدد را شنیدی؟",
options:["dos","uno","tres","cuatro"],
answer:"uno"
},

{
type:"audio",
speak:"dos",
question:"کدام عدد را شنیدی؟",
options:["cuatro","dos","cinco","uno"],
answer:"dos"
},

{
type:"audio",
speak:"tres",
question:"کدام عدد را شنیدی؟",
options:["uno","tres","cinco","dos"],
answer:"tres"
},

{
type:"audio",
speak:"cuatro",
question:"کدام عدد را شنیدی؟",
options:["tres","dos","cuatro","uno"],
answer:"cuatro"
},

{
type:"audio",
speak:"cinco",
question:"کدام عدد را شنیدی؟",
options:["cuatro","uno","dos","cinco"],
answer:"cinco"
},

/* BUILD ES - ساخت جمله اسپانیایی */

{
type:"build-es",
speak:"Tengo un gato",
question:"جمله اسپانیایی را بساز:",
text:"من یک گربه دارم",
words:["Tengo","un","gato"],
answer:["Tengo","un","gato"]
},

{
type:"build-es",
speak:"Ella tiene dos perros",
question:"جمله اسپانیایی را بساز:",
text:"او دو سگ دارد",
words:["Ella","tiene","dos","perros"],
answer:["Ella","tiene","dos","perros"]
},

{
type:"build-es",
speak:"Veo tres pájaros",
question:"جمله اسپانیایی را بساز:",
text:"من سه پرنده می‌بینم",
words:["Veo","tres","pájaros"],
answer:["Veo","tres","pájaros"]
},

{
type:"build-es",
speak:"Él tiene cuatro manzanas",
question:"جمله اسپانیایی را بساز:",
text:"او چهار سیب دارد",
words:["Él","tiene","cuatro","manzanas"],
answer:["Él","tiene","cuatro","manzanas"]
},

{
type:"build-es",
speak:"Como cinco panes",
question:"جمله اسپانیایی را بساز:",
text:"من پنج نان می‌خورم",
words:["Como","cinco","panes"],
answer:["Como","cinco","panes"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Tengo un gato",
question:"ترجمه را بساز:",
text:"Tengo un gato",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"Ella tiene dos perros",
question:"ترجمه را بساز:",
text:"Ella tiene dos perros",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"Veo tres pájaros",
question:"ترجمه را بساز:",
text:"Veo tres pájaros",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"Él tiene cuatro manzanas",
question:"ترجمه را بساز:",
text:"Él tiene cuatro manzanas",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"Como cinco panes",
question:"ترجمه را بساز:",
text:"Como cinco panes",
words:["می‌خورم","پنج","نان","من"],
answer:["من","پنج","نان","می‌خورم"]
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