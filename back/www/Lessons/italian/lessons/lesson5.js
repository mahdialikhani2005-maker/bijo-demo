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
question:"il pane کدام است؟",
speak:"il pane",
options:[
{text:"il riso",image:"../../media/food/rice.webp"},
{text:"il pane",image:"../../media/food/bread.webp"},
{text:"la carne",image:"../../media/food/meat.webp"},
{text:"l'uovo",image:"../../media/food/egg.webp"}
],
answer:"il pane"
},

{
type:"image",
question:"il riso کدام است؟",
speak:"il riso",
options:[
{text:"l'uovo",image:"../../media/food/egg.webp"},
{text:"il riso",image:"../../media/food/rice.webp"},
{text:"il latte",image:"../../media/food/milk.webp"},
{text:"il pane",image:"../../media/food/bread.webp"}
],
answer:"il riso"
},

{
type:"image",
question:"la carne کدام است؟",
speak:"la carne",
options:[
{text:"il pane",image:"../../media/food/bread.webp"},
{text:"la carne",image:"../../media/food/meat.webp"},
{text:"il latte",image:"../../media/food/milk.webp"},
{text:"il riso",image:"../../media/food/rice.webp"}
],
answer:"la carne"
},

{
type:"image",
question:"l'uovo کدام است؟",
speak:"l'uovo",
options:[
{text:"la carne",image:"../../media/food/meat.webp"},
{text:"il riso",image:"../../media/food/rice.webp"},
{text:"l'uovo",image:"../../media/food/egg.webp"},
{text:"il pane",image:"../../media/food/bread.webp"}
],
answer:"l'uovo"
},

{
type:"image",
question:"il latte کدام است؟",
speak:"il latte",
options:[
{text:"l'uovo",image:"../../media/food/egg.webp"},
{text:"il pane",image:"../../media/food/bread.webp"},
{text:"il riso",image:"../../media/food/rice.webp"},
{text:"il latte",image:"../../media/food/milk.webp"}
],
answer:"il latte"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/bread.webp",
options:["il riso","il pane","la carne","l'uovo"],
answer:"il pane"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/rice.webp",
options:["l'uovo","il riso","il latte","il pane"],
answer:"il riso"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/meat.webp",
options:["il pane","la carne","il latte","il riso"],
answer:"la carne"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/egg.webp",
options:["la carne","il riso","l'uovo","il pane"],
answer:"l'uovo"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/food/milk.webp",
options:["l'uovo","il pane","il riso","il latte"],
answer:"il latte"
},

/* AUDIO */

{
type:"audio",
speak:"il pane",
question:"کدام کلمه را شنیدی؟",
options:["il riso","il pane","la carne","l'uovo"],
answer:"il pane"
},

{
type:"audio",
speak:"il riso",
question:"کدام کلمه را شنیدی؟",
options:["l'uovo","il riso","il latte","il pane"],
answer:"il riso"
},

{
type:"audio",
speak:"la carne",
question:"کدام کلمه را شنیدی؟",
options:["il pane","la carne","il latte","il riso"],
answer:"la carne"
},

{
type:"audio",
speak:"l'uovo",
question:"کدام کلمه را شنیدی؟",
options:["la carne","il riso","l'uovo","il pane"],
answer:"l'uovo"
},

{
type:"audio",
speak:"il latte",
question:"کدام کلمه را شنیدی؟",
options:["l'uovo","il pane","il riso","il latte"],
answer:"il latte"
},

/* BUILD IT - ساخت جمله ایتالیایی */

{
type:"build-it",
speak:"Mi piace il pane",
question:"جمله ایتالیایی را بساز:",
text:"من نان دوست دارم",
words:["Mi","piace","il","pane"],
answer:["Mi","piace","il","pane"]
},

{
type:"build-it",
speak:"Lei mangia il riso",
question:"جمله ایتالیایی را بساز:",
text:"او برنج می‌خورد",
words:["Lei","mangia","il","riso"],
answer:["Lei","mangia","il","riso"]
},

{
type:"build-it",
speak:"Io ho la carne",
question:"جمله ایتالیایی را بساز:",
text:"من گوشت دارم",
words:["Io","ho","la","carne"],
answer:["Io","ho","la","carne"]
},

{
type:"build-it",
speak:"Lui mangia un uovo",
question:"جمله ایتالیایی را بساز:",
text:"او یک تخم‌مرغ می‌خورد",
words:["Lui","mangia","un","uovo"],
answer:["Lui","mangia","un","uovo"]
},

{
type:"build-it",
speak:"Io bevo il latte",
question:"جمله ایتالیایی را بساز:",
text:"من شیر می‌نوشم",
words:["Io","bevo","il","latte"],
answer:["Io","bevo","il","latte"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"Mi piace il pane",
question:"ترجمه را بساز:",
text:"Mi piace il pane",
words:["دارم","دوست","نان","من"],
answer:["من","نان","دوست","دارم"]
},

{
type:"build-fa",
speak:"Lei mangia il riso",
question:"ترجمه را بساز:",
text:"Lei mangia il riso",
words:["می‌خورد","برنج","او"],
answer:["او","برنج","می‌خورد"]
},

{
type:"build-fa",
speak:"Io ho la carne",
question:"ترجمه را بساز:",
text:"Io ho la carne",
words:["دارم","گوشت","من"],
answer:["من","گوشت","دارم"]
},

{
type:"build-fa",
speak:"Lui mangia un uovo",
question:"ترجمه را بساز:",
text:"Lui mangia un uovo",
words:["می‌خورد","تخم‌مرغ","یک","او"],
answer:["او","یک","تخم‌مرغ","می‌خورد"]
},

{
type:"build-fa",
speak:"Io bevo il latte",
question:"ترجمه را بساز:",
text:"Io bevo il latte",
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