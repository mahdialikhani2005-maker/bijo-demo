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
question:"one کدام است؟",
speak:"one",
options:[
{text:"two",image:"../../media/numbers/two.webp"},
{text:"one",image:"../../media/numbers/one.webp"},
{text:"three",image:"../../media/numbers/three.webp"},
{text:"four",image:"../../media/numbers/four.webp"}
],
answer:"one"
},

{
type:"image",
question:"two کدام است؟",
speak:"two",
options:[
{text:"four",image:"../../media/numbers/four.webp"},
{text:"two",image:"../../media/numbers/two.webp"},
{text:"five",image:"../../media/numbers/five.webp"},
{text:"one",image:"../../media/numbers/one.webp"}
],
answer:"two"
},

{
type:"image",
question:"three کدام است؟",
speak:"three",
options:[
{text:"one",image:"../../media/numbers/one.webp"},
{text:"three",image:"../../media/numbers/three.webp"},
{text:"five",image:"../../media/numbers/five.webp"},
{text:"two",image:"../../media/numbers/two.webp"}
],
answer:"three"
},

{
type:"image",
question:"four کدام است؟",
speak:"four",
options:[
{text:"three",image:"../../media/numbers/three.webp"},
{text:"two",image:"../../media/numbers/two.webp"},
{text:"four",image:"../../media/numbers/four.webp"},
{text:"one",image:"../../media/numbers/one.webp"}
],
answer:"four"
},

{
type:"image",
question:"five کدام است؟",
speak:"five",
options:[
{text:"four",image:"../../media/numbers/four.webp"},
{text:"one",image:"../../media/numbers/one.webp"},
{text:"two",image:"../../media/numbers/two.webp"},
{text:"five",image:"../../media/numbers/five.webp"}
],
answer:"five"
},

/* WORD */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["two","one","three","four"],
answer:"one"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["four","two","five","one"],
answer:"two"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["one","three","five","two"],
answer:"three"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["three","two","four","one"],
answer:"four"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["four","one","two","five"],
answer:"five"
},

/* AUDIO */

{
type:"audio",
speak:"one",
question:"کدام کلمه را شنیدی؟",
options:["two","one","three","four"],
answer:"one"
},

{
type:"audio",
speak:"two",
question:"کدام کلمه را شنیدی؟",
options:["four","two","five","one"],
answer:"two"
},

{
type:"audio",
speak:"three",
question:"کدام کلمه را شنیدی؟",
options:["one","three","five","two"],
answer:"three"
},

{
type:"audio",
speak:"four",
question:"کدام کلمه را شنیدی؟",
options:["three","two","four","one"],
answer:"four"
},

{
type:"audio",
speak:"five",
question:"کدام کلمه را شنیدی؟",
options:["four","one","two","five"],
answer:"five"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I have one cat",
question:"جمله انگلیسی را بساز:",
text:"من یک گربه دارم",
words:["one","have","cat","I"],
answer:["I","have","one","cat"]
},

{
type:"build-en",
speak:"She has two dogs",
question:"جمله انگلیسی را بساز:",
text:"او دو سگ دارد",
words:["has","two","dogs","She"],
answer:["She","has","two","dogs"]
},

{
type:"build-en",
speak:"I see three birds",
question:"جمله انگلیسی را بساز:",
text:"من سه پرنده می‌بینم",
words:["see","three","birds","I"],
answer:["I","see","three","birds"]
},

{
type:"build-en",
speak:"He has four apples",
question:"جمله انگلیسی را بساز:",
text:"او چهار سیب دارد",
words:["has","four","apples","He"],
answer:["He","has","four","apples"]
},

{
type:"build-en",
speak:"I eat five breads",
question:"جمله انگلیسی را بساز:",
text:"من پنج تا نون می‌خورم",
words:["eat","five","breads","I"],
answer:["I","eat","five","breads"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I have one cat",
question:"ترجمه را بساز:",
text:"I have one cat",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"She has two dogs",
question:"ترجمه را بساز:",
text:"She has two dogs",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"I see three birds",
question:"ترجمه را بساز:",
text:"I see three birds",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"He has four apples",
question:"ترجمه را بساز:",
text:"He has four apples",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"I eat five breads",
question:"ترجمه را بساز:",
text:"I eat five breads",
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