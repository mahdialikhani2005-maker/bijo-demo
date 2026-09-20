let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ja-JP",
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
  utter.lang = "ja-JP";
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
question:"嬉しい (ureshii) کدام است؟",
speak:"嬉しい",
options:[
{text:"悲しい (kanashii)",image:"../../media/feelings/sad.webp"},
{text:"嬉しい (ureshii)",image:"../../media/feelings/happy.webp"},
{text:"怒っている (okotteiru)",image:"../../media/feelings/angry.webp"},
{text:"疲れた (tsukareta)",image:"../../media/feelings/tired.webp"}
],
answer:"嬉しい (ureshii)"
},

{
type:"image",
question:"悲しい (kanashii) کدام است؟",
speak:"悲しい",
options:[
{text:"疲れた (tsukareta)",image:"../../media/feelings/tired.webp"},
{text:"悲しい (kanashii)",image:"../../media/feelings/sad.webp"},
{text:"怖い (kowai)",image:"../../media/feelings/scared.webp"},
{text:"嬉しい (ureshii)",image:"../../media/feelings/happy.webp"}
],
answer:"悲しい (kanashii)"
},

{
type:"image",
question:"怒っている (okotteiru) کدام است؟",
speak:"怒っている",
options:[
{text:"嬉しい (ureshii)",image:"../../media/feelings/happy.webp"},
{text:"怒っている (okotteiru)",image:"../../media/feelings/angry.webp"},
{text:"怖い (kowai)",image:"../../media/feelings/scared.webp"},
{text:"悲しい (kanashii)",image:"../../media/feelings/sad.webp"}
],
answer:"怒っている (okotteiru)"
},

{
type:"image",
question:"疲れた (tsukareta) کدام است؟",
speak:"疲れた",
options:[
{text:"怒っている (okotteiru)",image:"../../media/feelings/angry.webp"},
{text:"悲しい (kanashii)",image:"../../media/feelings/sad.webp"},
{text:"疲れた (tsukareta)",image:"../../media/feelings/tired.webp"},
{text:"嬉しい (ureshii)",image:"../../media/feelings/happy.webp"}
],
answer:"疲れた (tsukareta)"
},

{
type:"image",
question:"怖い (kowai) کدام است؟",
speak:"怖い",
options:[
{text:"疲れた (tsukareta)",image:"../../media/feelings/tired.webp"},
{text:"嬉しい (ureshii)",image:"../../media/feelings/happy.webp"},
{text:"悲しい (kanashii)",image:"../../media/feelings/sad.webp"},
{text:"怖い (kowai)",image:"../../media/feelings/scared.webp"}
],
answer:"怖い (kowai)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/happy.webp",
options:["悲しい","嬉しい","怒っている","疲れた"],
answer:"嬉しい"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/sad.webp",
options:["疲れた","悲しい","怖い","嬉しい"],
answer:"悲しい"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/angry.webp",
options:["嬉しい","怒っている","怖い","悲しい"],
answer:"怒っている"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/tired.webp",
options:["怒っている","悲しい","疲れた","嬉しい"],
answer:"疲れた"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/feelings/scared.webp",
options:["疲れた","嬉しい","悲しい","怖い"],
answer:"怖い"
},

/* AUDIO */

{
type:"audio",
speak:"嬉しい",
question:"کدام کلمه را شنیدی؟",
options:["悲しい","嬉しい","怒っている","疲れた"],
answer:"嬉しい"
},

{
type:"audio",
speak:"悲しい",
question:"کدام کلمه را شنیدی؟",
options:["疲れた","悲しい","怖い","嬉しい"],
answer:"悲しい"
},

{
type:"audio",
speak:"怒っている",
question:"کدام کلمه را شنیدی؟",
options:["嬉しい","怒っている","怖い","悲しい"],
answer:"怒っている"
},

{
type:"audio",
speak:"疲れた",
question:"کدام کلمه را شنیدی؟",
options:["怒っている","悲しい","疲れた","嬉しい"],
answer:"疲れた"
},

{
type:"audio",
speak:"怖い",
question:"کدام کلمه را شنیدی؟",
options:["疲れた","嬉しい","悲しい","怖い"],
answer:"怖い"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"私は嬉しいです",
question:"جمله ژاپنی را بساز:",
text:"من خوشحال هستم",
words:["私","は","嬉しい","です"],
answer:["私","は","嬉しい","です"]
},

{
type:"build-jp",
speak:"彼女は悲しいです",
question:"جمله ژاپنی را بساز:",
text:"او ناراحت است",
words:["彼女","は","悲しい","です"],
answer:["彼女","は","悲しい","です"]
},

{
type:"build-jp",
speak:"彼は怒っています",
question:"جمله ژاپنی را بساز:",
text:"او عصبانی است",
words:["彼","は","怒って","います"],
answer:["彼","は","怒って","います"]
},

{
type:"build-jp",
speak:"私たちは疲れました",
question:"جمله ژاپنی را بساز:",
text:"ما خسته هستیم",
words:["私","たち","は","疲れ","ました"],
answer:["私","たち","は","疲れ","ました"]
},

{
type:"build-jp",
speak:"彼らは怖いです",
question:"جمله ژاپنی را بساز:",
text:"آنها ترسیده هستند",
words:["彼ら","は","怖い","です"],
answer:["彼ら","は","怖い","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"私は嬉しいです",
question:"ترجمه را بساز:",
text:"私は嬉しいです",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"彼女は悲しいです",
question:"ترجمه را بساز:",
text:"彼女は悲しいです",
words:["است","ناراحت","او"],
answer:["او","ناراحت","است"]
},

{
type:"build-fa",
speak:"彼は怒っています",
question:"ترجمه را بساز:",
text:"彼は怒っています",
words:["است","عصبانی","او"],
answer:["او","عصبانی","است"]
},

{
type:"build-fa",
speak:"私たちは疲れました",
question:"ترجمه را بساز:",
text:"私たちは疲れました",
words:["هستیم","خسته","ما"],
answer:["ما","خسته","هستیم"]
},

{
type:"build-fa",
speak:"彼らは怖いです",
question:"ترجمه را بساز:",
text:"彼らは怖いです",
words:["هستند","ترسیده","آنها"],
answer:["آنها","ترسیده","هستند"]
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