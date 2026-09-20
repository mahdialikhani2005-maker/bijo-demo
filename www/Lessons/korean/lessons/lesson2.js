let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ko-KR",
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
  utter.lang = "ko-KR";
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
question:"머리 (meori) کدام است؟",
speak:"머리",
options:[
{text:"손 (son)",image:"../../media/body/hand.webp"},
{text:"머리 (meori)",image:"../../media/body/head.webp"},
{text:"눈 (nun)",image:"../../media/body/eye.webp"},
{text:"코 (ko)",image:"../../media/body/nose.webp"}
],
answer:"머리 (meori)"
},

{
type:"image",
question:"손 (son) کدام است؟",
speak:"손",
options:[
{text:"눈 (nun)",image:"../../media/body/eye.webp"},
{text:"손 (son)",image:"../../media/body/hand.webp"},
{text:"발 (bal)",image:"../../media/body/foot.webp"},
{text:"머리 (meori)",image:"../../media/body/head.webp"}
],
answer:"손 (son)"
},

{
type:"image",
question:"눈 (nun) کدام است؟",
speak:"눈",
options:[
{text:"머리 (meori)",image:"../../media/body/head.webp"},
{text:"눈 (nun)",image:"../../media/body/eye.webp"},
{text:"코 (ko)",image:"../../media/body/nose.webp"},
{text:"손 (son)",image:"../../media/body/hand.webp"}
],
answer:"눈 (nun)"
},

{
type:"image",
question:"발 (bal) کدام است؟",
speak:"발",
options:[
{text:"손 (son)",image:"../../media/body/hand.webp"},
{text:"머리 (meori)",image:"../../media/body/head.webp"},
{text:"발 (bal)",image:"../../media/body/foot.webp"},
{text:"눈 (nun)",image:"../../media/body/eye.webp"}
],
answer:"발 (bal)"
},

{
type:"image",
question:"코 (ko) کدام است؟",
speak:"코",
options:[
{text:"눈 (nun)",image:"../../media/body/eye.webp"},
{text:"코 (ko)",image:"../../media/body/nose.webp"},
{text:"머리 (meori)",image:"../../media/body/head.webp"},
{text:"손 (son)",image:"../../media/body/hand.webp"}
],
answer:"코 (ko)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["손","머리","눈","코"],
answer:"머리"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["눈","손","발","머리"],
answer:"손"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["머리","눈","코","손"],
answer:"눈"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["손","발","머리","눈"],
answer:"발"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["눈","코","손","머리"],
answer:"코"
},

/* AUDIO */

{
type:"audio",
speak:"머리",
question:"کدام کلمه را شنیدی؟",
options:["손","머리","눈","코"],
answer:"머리"
},

{
type:"audio",
speak:"손",
question:"کدام کلمه را شنیدی؟",
options:["눈","손","발","머리"],
answer:"손"
},

{
type:"audio",
speak:"눈",
question:"کدام کلمه را شنیدی؟",
options:["머리","눈","코","손"],
answer:"눈"
},

{
type:"audio",
speak:"발",
question:"کدام کلمه را شنیدی؟",
options:["손","발","머리","눈"],
answer:"발"
},

{
type:"audio",
speak:"코",
question:"کدام کلمه را شنیدی؟",
options:["눈","코","손","머리"],
answer:"코"
},

/* BUILD KO - ساخت جمله کرهای */

{
type:"build-ko",
speak:"저는 머리가 있습니다",
question:"جمله کرهای را بساز:",
text:"من یک سر دارم",
words:["저는","머리가","있습니다"],
answer:["저는","머리가","있습니다"]
},

{
type:"build-ko",
speak:"당신은 손이 있습니다",
question:"جمله کرهای را بساز:",
text:"تو یک دست داری",
words:["당신은","손이","있습니다"],
answer:["당신은","손이","있습니다"]
},

{
type:"build-ko",
speak:"그녀는 눈이 두 개 있습니다",
question:"جمله کرهای را بساز:",
text:"او دو چشم دارد",
words:["그녀는","눈이","두","개","있습니다"],
answer:["그녀는","눈이","두","개","있습니다"]
},

{
type:"build-ko",
speak:"그는 코가 있습니다",
question:"جمله کرهای را بساز:",
text:"او یک بینی دارد",
words:["그는","코가","있습니다"],
answer:["그는","코가","있습니다"]
},

{
type:"build-ko",
speak:"이것은 제 발입니다",
question:"جمله کرهای را بساز:",
text:"این پای من است",
words:["이것은","제","발","입니다"],
answer:["이것은","제","발","입니다"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"저는 머리가 있습니다",
question:"ترجمه را بساز:",
text:"저는 머리가 있습니다",
words:["دارم","سر","یک","من"],
answer:["من","یک","سر","دارم"]
},

{
type:"build-fa",
speak:"당신은 손이 있습니다",
question:"ترجمه را بساز:",
text:"당신은 손이 있습니다",
words:["یک","داری","دست","تو"],
answer:["تو","یک","دست","داری"]
},

{
type:"build-fa",
speak:"그녀는 눈이 두 개 있습니다",
question:"ترجمه را بساز:",
text:"그녀는 눈이 두 개 있습니다",
words:["دارد","او","دو","چشم"],
answer:["او","دو","چشم","دارد"]
},

{
type:"build-fa",
speak:"그는 코가 있습니다",
question:"ترجمه را بساز:",
text:"그는 코가 있습니다",
words:["دارد","یک","او","بینی"],
answer:["او","یک","بینی","دارد"]
},

{
type:"build-fa",
speak:"이것은 제 발입니다",
question:"ترجمه را بساز:",
text:"이것은 제 발입니다",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
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

  // BUILD KOREAN / FA

  else if (q.type === "build-ko" || q.type === "build-fa") {
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

  if (q.type === "build-ko") {
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