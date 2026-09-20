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
question:"cat کدام است؟",
speak:"cat",
options:[
{text:"dog",image:"../../media/animals/dog.webp"},
{text:"cat",image:"../../media/animals/cat.webp"},
{text:"bird",image:"../../media/animals/bird.webp"},
{text:"fish",image:"../../media/animals/fish.webp"}
],
answer:"cat"
},

{
type:"image",
question:"dog کدام است؟",
speak:"dog",
options:[
{text:"fish",image:"../../media/animals/fish.webp"},
{text:"dog",image:"../../media/animals/dog.webp"},
{text:"rabbit",image:"../../media/animals/rabbit.webp"},
{text:"cat",image:"../../media/animals/cat.webp"}
],
answer:"dog"
},

{
type:"image",
question:"bird کدام است؟",
speak:"bird",
options:[
{text:"cat",image:"../../media/animals/cat.webp"},
{text:"bird",image:"../../media/animals/bird.webp"},
{text:"rabbit",image:"../../media/animals/rabbit.webp"},
{text:"dog",image:"../../media/animals/dog.webp"}
],
answer:"bird"
},

{
type:"image",
question:"fish کدام است؟",
speak:"fish",
options:[
{text:"bird",image:"../../media/animals/bird.webp"},
{text:"dog",image:"../../media/animals/dog.webp"},
{text:"fish",image:"../../media/animals/fish.webp"},
{text:"cat",image:"../../media/animals/cat.webp"}
],
answer:"fish"
},

{
type:"image",
question:"rabbit کدام است؟",
speak:"rabbit",
options:[
{text:"cat",image:"../../media/animals/cat.webp"},
{text:"fish",image:"../../media/animals/fish.webp"},
{text:"dog",image:"../../media/animals/dog.webp"},
{text:"rabbit",image:"../../media/animals/rabbit.webp"}
],
answer:"rabbit"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/cat.webp",
options:["dog","cat","bird","fish"],
answer:"cat"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/dog.webp",
options:["fish","dog","rabbit","cat"],
answer:"dog"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/bird.webp",
options:["cat","bird","rabbit","dog"],
answer:"bird"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/fish.webp",
options:["bird","dog","fish","cat"],
answer:"fish"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/animals/rabbit.webp",
options:["cat","fish","dog","rabbit"],
answer:"rabbit"
},

/* AUDIO */

{
type:"audio",
speak:"cat",
question:"کدام کلمه را شنیدی؟",
options:["dog","cat","bird","fish"],
answer:"cat"
},

{
type:"audio",
speak:"dog",
question:"کدام کلمه را شنیدی؟",
options:["fish","dog","rabbit","cat"],
answer:"dog"
},

{
type:"audio",
speak:"bird",
question:"کدام کلمه را شنیدی؟",
options:["cat","bird","rabbit","dog"],
answer:"bird"
},

{
type:"audio",
speak:"fish",
question:"کدام کلمه را شنیدی؟",
options:["bird","dog","fish","cat"],
answer:"fish"
},

{
type:"audio",
speak:"rabbit",
question:"کدام کلمه را شنیدی؟",
options:["cat","fish","dog","rabbit"],
answer:"rabbit"
},

/* BUILD EN - جدید با تنوع */

{
type:"build-en",
speak:"I have a cat",
question:"جمله انگلیسی را بساز:",
text:"من یک گربه دارم",
words:["have","a","cat","I"],
answer:["I","have","a","cat"]
},

{
type:"build-en",
speak:"She has a dog",
question:"جمله انگلیسی را بساز:",
text:"او یک سگ دارد",
words:["has","a","dog","She"],
answer:["She","has","a","dog"]
},

{
type:"build-en",
speak:"This is a bird",
question:"جمله انگلیسی را بساز:",
text:"این یک پرنده است",
words:["is","a","bird","This"],
answer:["This","is","a","bird"]
},

{
type:"build-en",
speak:"I see a fish",
question:"جمله انگلیسی را بساز:",
text:"من یک ماهی می‌بینم",
words:["see","a","fish","I"],
answer:["I","see","a","fish"]
},

{
type:"build-en",
speak:"He has a rabbit",
question:"جمله انگلیسی را بساز:",
text:"او یک خرگوش دارد",
words:["has","a","rabbit","He"],
answer:["He","has","a","rabbit"]
},

/* BUILD FA - جدید با تنوع */

{
type:"build-fa",
speak:"I have a cat",
question:"ترجمه را بساز:",
text:"I have a cat",
words:["دارم","گربه","یک","من"],
answer:["من","یک","گربه","دارم"]
},

{
type:"build-fa",
speak:"She has a dog",
question:"ترجمه را بساز:",
text:"She has a dog",
words:["دارد","سگ","یک","او"],
answer:["او","یک","سگ","دارد"]
},

{
type:"build-fa",
speak:"This is a bird",
question:"ترجمه را بساز:",
text:"This is a bird",
words:["است","پرنده","یک","این"],
answer:["این","یک","پرنده","است"]
},

{
type:"build-fa",
speak:"I see a fish",
question:"ترجمه را بساز:",
text:"I see a fish",
words:["می‌بینم","ماهی","یک","من"],
answer:["من","یک","ماهی","می‌بینم"]
},

{
type:"build-fa",
speak:"He has a rabbit",
question:"ترجمه را بساز:",
text:"He has a rabbit",
words:["دارد","خرگوش","یک","او"],
answer:["او","یک","خرگوش","دارد"]
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