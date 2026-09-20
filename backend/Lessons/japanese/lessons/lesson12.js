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
question:"一 (ichi) کدام است؟",
speak:"一",
options:[
{text:"二 (ni)",image:"../../media/numbers/two.webp"},
{text:"一 (ichi)",image:"../../media/numbers/one.webp"},
{text:"三 (san)",image:"../../media/numbers/three.webp"},
{text:"四 (yon)",image:"../../media/numbers/four.webp"}
],
answer:"一 (ichi)"
},

{
type:"image",
question:"二 (ni) کدام است؟",
speak:"二",
options:[
{text:"四 (yon)",image:"../../media/numbers/four.webp"},
{text:"二 (ni)",image:"../../media/numbers/two.webp"},
{text:"五 (go)",image:"../../media/numbers/five.webp"},
{text:"一 (ichi)",image:"../../media/numbers/one.webp"}
],
answer:"二 (ni)"
},

{
type:"image",
question:"三 (san) کدام است؟",
speak:"三",
options:[
{text:"一 (ichi)",image:"../../media/numbers/one.webp"},
{text:"三 (san)",image:"../../media/numbers/three.webp"},
{text:"五 (go)",image:"../../media/numbers/five.webp"},
{text:"二 (ni)",image:"../../media/numbers/two.webp"}
],
answer:"三 (san)"
},

{
type:"image",
question:"四 (yon) کدام است؟",
speak:"四",
options:[
{text:"三 (san)",image:"../../media/numbers/three.webp"},
{text:"二 (ni)",image:"../../media/numbers/two.webp"},
{text:"四 (yon)",image:"../../media/numbers/four.webp"},
{text:"一 (ichi)",image:"../../media/numbers/one.webp"}
],
answer:"四 (yon)"
},

{
type:"image",
question:"五 (go) کدام است؟",
speak:"五",
options:[
{text:"四 (yon)",image:"../../media/numbers/four.webp"},
{text:"一 (ichi)",image:"../../media/numbers/one.webp"},
{text:"二 (ni)",image:"../../media/numbers/two.webp"},
{text:"五 (go)",image:"../../media/numbers/five.webp"}
],
answer:"五 (go)"
},

/* WORD */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.webp",
options:["二","一","三","四"],
answer:"一"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.webp",
options:["四","二","五","一"],
answer:"二"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.webp",
options:["一","三","五","二"],
answer:"三"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.webp",
options:["三","二","四","一"],
answer:"四"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.webp",
options:["四","一","二","五"],
answer:"五"
},

/* AUDIO */

{
type:"audio",
speak:"一",
question:"کدام کلمه را شنیدی؟",
options:["二","一","三","四"],
answer:"一"
},

{
type:"audio",
speak:"二",
question:"کدام کلمه را شنیدی؟",
options:["四","二","五","一"],
answer:"二"
},

{
type:"audio",
speak:"三",
question:"کدام کلمه را شنیدی؟",
options:["一","三","五","二"],
answer:"三"
},

{
type:"audio",
speak:"四",
question:"کدام کلمه را شنیدی؟",
options:["三","二","四","一"],
answer:"四"
},

{
type:"audio",
speak:"五",
question:"کدام کلمه را شنیدی؟",
options:["四","一","二","五"],
answer:"五"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"私は猫が一匹います",
question:"جمله ژاپنی را بساز:",
text:"من یک گربه دارم",
words:["私","は","猫","が","一匹","います"],
answer:["私","は","猫","が","一匹","います"]
},

{
type:"build-jp",
speak:"彼女は犬が二匹います",
question:"جمله ژاپنی را بساز:",
text:"او دو سگ دارد",
words:["彼女","は","犬","が","二匹","います"],
answer:["彼女","は","犬","が","二匹","います"]
},

{
type:"build-jp",
speak:"私は鳥を三羽見ます",
question:"جمله ژاپنی را بساز:",
text:"من سه پرنده می‌بینم",
words:["私","は","鳥","を","三羽","見ます"],
answer:["私","は","鳥","を","三羽","見ます"]
},

{
type:"build-jp",
speak:"彼はりんごが四つあります",
question:"جمله ژاپنی را بساز:",
text:"او چهار سیب دارد",
words:["彼","は","りんご","が","四つ","あります"],
answer:["彼","は","りんご","が","四つ","あります"]
},

{
type:"build-jp",
speak:"私はパンを五つ食べます",
question:"جمله ژاپنی را بساز:",
text:"من پنج نان می‌خورم",
words:["私","は","パン","を","五つ","食べます"],
answer:["私","は","パン","を","五つ","食べます"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"私は猫が一匹います",
question:"ترجمه را بساز:",
text:"私は猫が一匹います",
words:["دارم","یک","گربه","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"彼女は犬が二匹います",
question:"ترجمه را بساز:",
text:"彼女は犬が二匹います",
words:["دارد","دو","سگ","او"],
answer:["او","دو","سگ","دارد"]
},

{
type:"build-fa",
speak:"私は鳥を三羽見ます",
question:"ترجمه را بساز:",
text:"私は鳥を三羽見ます",
words:["می‌بینم","سه","پرنده","من"],
answer:["من","سه","پرنده","می‌بینم"]
},

{
type:"build-fa",
speak:"彼はりんごが四つあります",
question:"ترجمه را بساز:",
text:"彼はりんごが四つあります",
words:["دارد","چهار","سیب","او"],
answer:["او","چهار","سیب","دارد"]
},

{
type:"build-fa",
speak:"私はパンを五つ食べます",
question:"ترجمه را بساز:",
text:"私はパンを五つ食べます",
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