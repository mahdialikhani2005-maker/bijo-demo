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
question:"男の人 (otoko no hito) کدام است؟",
speak:"男の人",
options:[
{text:"女の人 (onna no hito)",image:"../../media/people/woman.webp"},
{text:"男の人 (otoko no hito)",image:"../../media/people/man.webp"},
{text:"男の子 (otoko no ko)",image:"../../media/people/boy.webp"},
{text:"女の子 (onna no ko)",image:"../../media/people/girl.webp"}
],
answer:"男の人 (otoko no hito)"
},

{
type:"image",
question:"女の人 (onna no hito) کدام است؟",
speak:"女の人",
options:[
{text:"女の子 (onna no ko)",image:"../../media/people/girl.webp"},
{text:"女の人 (onna no hito)",image:"../../media/people/woman.webp"},
{text:"男の子 (otoko no ko)",image:"../../media/people/boy.webp"},
{text:"男の人 (otoko no hito)",image:"../../media/people/man.webp"}
],
answer:"女の人 (onna no hito)"
},

{
type:"image",
question:"男の子 (otoko no ko) کدام است؟",
speak:"男の子",
options:[
{text:"男の人 (otoko no hito)",image:"../../media/people/man.webp"},
{text:"男の子 (otoko no ko)",image:"../../media/people/boy.webp"},
{text:"赤ちゃん (akachan)",image:"../../media/people/baby.webp"},
{text:"女の子 (onna no ko)",image:"../../media/people/girl.webp"}
],
answer:"男の子 (otoko no ko)"
},

{
type:"image",
question:"女の子 (onna no ko) کدام است؟",
speak:"女の子",
options:[
{text:"男の子 (otoko no ko)",image:"../../media/people/boy.webp"},
{text:"男の人 (otoko no hito)",image:"../../media/people/man.webp"},
{text:"女の子 (onna no ko)",image:"../../media/people/girl.webp"},
{text:"赤ちゃん (akachan)",image:"../../media/people/baby.webp"}
],
answer:"女の子 (onna no ko)"
},

{
type:"image",
question:"赤ちゃん (akachan) کدام است؟",
speak:"赤ちゃん",
options:[
{text:"女の子 (onna no ko)",image:"../../media/people/girl.webp"},
{text:"男の子 (otoko no ko)",image:"../../media/people/boy.webp"},
{text:"男の人 (otoko no hito)",image:"../../media/people/man.webp"},
{text:"赤ちゃん (akachan)",image:"../../media/people/baby.webp"}
],
answer:"赤ちゃん (akachan)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/man.webp",
options:["男の子","男の人","女の人","女の子"],
answer:"男の人"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/woman.webp",
options:["女の人","女の子","赤ちゃん","男の人"],
answer:"女の人"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/boy.webp",
options:["男の子","男の人","赤ちゃん","女の子"],
answer:"男の子"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/girl.webp",
options:["女の子","女の人","男の子","赤ちゃん"],
answer:"女の子"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/people/baby.webp",
options:["赤ちゃん","男の子","女の子","男の人"],
answer:"赤ちゃん"
},

/* AUDIO */

{
type:"audio",
speak:"男の人",
question:"کدام کلمه را شنیدی؟",
options:["男の人","男の子","女の人","女の子"],
answer:"男の人"
},

{
type:"audio",
speak:"女の人",
question:"کدام کلمه را شنیدی؟",
options:["女の子","女の人","男の子","男の人"],
answer:"女の人"
},

{
type:"audio",
speak:"男の子",
question:"کدام کلمه را شنیدی؟",
options:["男の子","男の人","赤ちゃん","女の子"],
answer:"男の子"
},

{
type:"audio",
speak:"女の子",
question:"کدام کلمه را شنیدی؟",
options:["男の子","女の人","女の子","赤ちゃん"],
answer:"女の子"
},

{
type:"audio",
speak:"赤ちゃん",
question:"کدام کلمه را شنیدی؟",
options:["赤ちゃん","男の子","男の人","女の子"],
answer:"赤ちゃん"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"これは男の人です",
question:"جمله ژاپنی را بساز:",
text:"این یک مرد است",
words:["これ","は","男の人","です"],
answer:["これ","は","男の人","です"]
},

{
type:"build-jp",
speak:"これは女の人です",
question:"جمله ژاپنی را بساز:",
text:"این یک زن است",
words:["これ","は","女の人","です"],
answer:["これ","は","女の人","です"]
},

{
type:"build-jp",
speak:"これは男の子です",
question:"جمله ژاپنی را بساز:",
text:"این یک پسر است",
words:["これ","は","男の子","です"],
answer:["これ","は","男の子","です"]
},

{
type:"build-jp",
speak:"これは女の子です",
question:"جمله ژاپنی را بساز:",
text:"این یک دختر است",
words:["これ","は","女の子","です"],
answer:["これ","は","女の子","です"]
},

{
type:"build-jp",
speak:"赤ちゃんは小さいです",
question:"جمله ژاپنی را بساز:",
text:"نوزاد کوچک است",
words:["赤ちゃん","は","小さい","です"],
answer:["赤ちゃん","は","小さい","です"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"これは男の人です",
question:"ترجمه را بساز:",
text:"これは男の人です",
words:["است","مرد","یک","این"],
answer:["این","یک","مرد","است"]
},

{
type:"build-fa",
speak:"これは女の人です",
question:"ترجمه را بساز:",
text:"これは女の人です",
words:["یک","است","زن","این"],
answer:["این","یک","زن","است"]
},

{
type:"build-fa",
speak:"これは男の子です",
question:"ترجمه را بساز:",
text:"これは男の子です",
words:["است","پسر","یک","این"],
answer:["این","یک","پسر","است"]
},

{
type:"build-fa",
speak:"これは女の子です",
question:"ترجمه را بساز:",
text:"これは女の子です",
words:["است","دختر","یک","این"],
answer:["این","یک","دختر","است"]
},

{
type:"build-fa",
speak:"赤ちゃんは小さいです",
question:"ترجمه را بساز:",
text:"赤ちゃんは小さいです",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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