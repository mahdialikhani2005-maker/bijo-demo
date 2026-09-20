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
question:"누구 (nugu) کدام است؟",
speak:"누구",
options:[
{text:"무엇 (mueot)",image:"../../media/questions/what.webp"},
{text:"누구 (nugu)",image:"../../media/questions/who.webp"},
{text:"어디 (eodi)",image:"../../media/questions/where.webp"},
{text:"언제 (eonje)",image:"../../media/questions/when.webp"}
],
answer:"누구 (nugu)"
},

{
type:"image",
question:"무엇 (mueot) کدام است؟",
speak:"무엇",
options:[
{text:"왜 (wae)",image:"../../media/questions/why.webp"},
{text:"무엇 (mueot)",image:"../../media/questions/what.webp"},
{text:"누구 (nugu)",image:"../../media/questions/who.webp"},
{text:"어디 (eodi)",image:"../../media/questions/where.webp"}
],
answer:"무엇 (mueot)"
},

{
type:"image",
question:"어디 (eodi) کدام است؟",
speak:"어디",
options:[
{text:"무엇 (mueot)",image:"../../media/questions/what.webp"},
{text:"어디 (eodi)",image:"../../media/questions/where.webp"},
{text:"왜 (wae)",image:"../../media/questions/why.webp"},
{text:"누구 (nugu)",image:"../../media/questions/who.webp"}
],
answer:"어디 (eodi)"
},

{
type:"image",
question:"언제 (eonje) کدام است؟",
speak:"언제",
options:[
{text:"어디 (eodi)",image:"../../media/questions/where.webp"},
{text:"누구 (nugu)",image:"../../media/questions/who.webp"},
{text:"언제 (eonje)",image:"../../media/questions/when.webp"},
{text:"무엇 (mueot)",image:"../../media/questions/what.webp"}
],
answer:"언제 (eonje)"
},

{
type:"image",
question:"왜 (wae) کدام است؟",
speak:"왜",
options:[
{text:"언제 (eonje)",image:"../../media/questions/when.webp"},
{text:"무엇 (mueot)",image:"../../media/questions/what.webp"},
{text:"누구 (nugu)",image:"../../media/questions/who.webp"},
{text:"왜 (wae)",image:"../../media/questions/why.webp"}
],
answer:"왜 (wae)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/who.webp",
options:["무엇","누구","어디","언제"],
answer:"누구"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/what.webp",
options:["왜","무엇","누구","어디"],
answer:"무엇"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/where.webp",
options:["무엇","어디","왜","누구"],
answer:"어디"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/when.webp",
options:["어디","누구","언제","무엇"],
answer:"언제"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/questions/why.webp",
options:["언제","무엇","누구","왜"],
answer:"왜"
},

/* AUDIO */

{
type:"audio",
speak:"누구",
question:"کدام کلمه را شنیدی؟",
options:["무엇","누구","어디","언제"],
answer:"누구"
},

{
type:"audio",
speak:"무엇",
question:"کدام کلمه را شنیدی؟",
options:["왜","무엇","누구","어디"],
answer:"무엇"
},

{
type:"audio",
speak:"어디",
question:"کدام کلمه را شنیدی؟",
options:["무엇","어디","왜","누구"],
answer:"어디"
},

{
type:"audio",
speak:"언제",
question:"کدام کلمه را شنیدی؟",
options:["어디","누구","언제","무엇"],
answer:"언제"
},

{
type:"audio",
speak:"왜",
question:"کدام کلمه را شنیدی؟",
options:["언제","무엇","누구","왜"],
answer:"왜"
},

/* BUILD JP - ساخت جمله کرهای */

{
type:"build-jp",
speak:"그녀는 누구입니까?",
question:"جمله کرهای را بساز:",
text:"او کیست؟",
words:["그녀","는","누구","입니까","?"],
answer:["그녀","는","누구","입니까","?"]
},

{
type:"build-jp",
speak:"이것은 무엇입니까?",
question:"جمله کرهای را بساز:",
text:"این چیست؟",
words:["이것","은","무엇","입니까","?"],
answer:["이것","은","무엇","입니까","?"]
},

{
type:"build-jp",
speak:"학교는 어디입니까?",
question:"جمله کرهای را بساز:",
text:"مدرسه کجاست؟",
words:["학교","는","어디","입니까","?"],
answer:["학교","는","어디","입니까","?"]
},

{
type:"build-jp",
speak:"수업은 언제입니까?",
question:"جمله کرهای را بساز:",
text:"کلاس کی است؟",
words:["수업","은","언제","입니까","?"],
answer:["수업","은","언제","입니까","?"]
},

{
type:"build-jp",
speak:"당신은 왜 기쁩니까?",
question:"جمله کرهای را بساز:",
text:"چرا خوشحالی؟",
words:["당신","은","왜","기쁩","니까","?"],
answer:["당신","은","왜","기쁩","니까","?"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"그녀는 누구입니까?",
question:"ترجمه را بساز:",
text:"그녀는 누구입니까؟",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"이것은 무엇입니까?",
question:"ترجمه را بساز:",
text:"이것은 무엇입니까؟",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"학교는 어디입니까?",
question:"ترجمه را بساز:",
text:"학교는 어디입니까؟",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"수업은 언제입니까?",
question:"ترجمه را بساز:",
text:"수업은 언제입니까؟",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"당신은 왜 기쁩니까?",
question:"ترجمه را بساز:",
text:"당신은 왜 기쁩니까؟",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی"]
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

  // BUILD JAPANESE / FA

  else if (q.type === "build-jp" || q.type === "build-fa") {
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

  if (q.type === "build-jp") {
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