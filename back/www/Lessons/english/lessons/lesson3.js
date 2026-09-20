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
question:"house کدام است؟",
speak:"house",
options:[
{text:"room",image:"../../media/house/room.webp"},
{text:"house",image:"../../media/house/house.webp"},
{text:"door",image:"../../media/house/door.webp"},
{text:"window",image:"../../media/house/window.webp"}
],
answer:"house"
},

{
type:"image",
question:"room کدام است؟",
speak:"room",
options:[
{text:"window",image:"../../media/house/window.webp"},
{text:"room",image:"../../media/house/room.webp"},
{text:"kitchen",image:"../../media/house/kitchen.webp"},
{text:"house",image:"../../media/house/house.webp"}
],
answer:"room"
},

{
type:"image",
question:"door کدام است؟",
speak:"door",
options:[
{text:"house",image:"../../media/house/house.webp"},
{text:"door",image:"../../media/house/door.webp"},
{text:"window",image:"../../media/house/window.webp"},
{text:"room",image:"../../media/house/room.webp"}
],
answer:"door"
},

{
type:"image",
question:"window کدام است؟",
speak:"window",
options:[
{text:"door",image:"../../media/house/door.webp"},
{text:"house",image:"../../media/house/house.webp"},
{text:"window",image:"../../media/house/window.webp"},
{text:"room",image:"../../media/house/room.webp"}
],
answer:"window"
},

{
type:"image",
question:"kitchen کدام است؟",
speak:"kitchen",
options:[
{text:"room",image:"../../media/house/room.webp"},
{text:"window",image:"../../media/house/window.webp"},
{text:"house",image:"../../media/house/house.webp"},
{text:"kitchen",image:"../../media/house/kitchen.webp"}
],
answer:"kitchen"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/house.webp",
options:["room","house","door","window"],
answer:"house"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/room.webp",
options:["window","room","kitchen","house"],
answer:"room"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/door.webp",
options:["house","door","window","room"],
answer:"door"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/window.webp",
options:["door","house","window","room"],
answer:"window"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/house/kitchen.webp",
options:["room","window","house","kitchen"],
answer:"kitchen"
},

/* AUDIO */

{
type:"audio",
speak:"house",
question:"کدام کلمه را شنیدی؟",
options:["room","house","door","window"],
answer:"house"
},

{
type:"audio",
speak:"room",
question:"کدام کلمه را شنیدی؟",
options:["window","room","kitchen","house"],
answer:"room"
},

{
type:"audio",
speak:"door",
question:"کدام کلمه را شنیدی؟",
options:["house","door","window","room"],
answer:"door"
},

{
type:"audio",
speak:"window",
question:"کدام کلمه را شنیدی؟",
options:["door","house","window","room"],
answer:"window"
},

{
type:"audio",
speak:"kitchen",
question:"کدام کلمه را شنیدی؟",
options:["room","window","house","kitchen"],
answer:"kitchen"
},

/* BUILD EN - جدید با تنوع شخصی */

{
type:"build-en",
speak:"This is a house",
question:"جمله انگلیسی را بساز:",
text:"این یک خانه است",
words:["house","a","is","This"],
answer:["This","is","a","house"]
},

{
type:"build-en",
speak:"I see a door",
question:"جمله انگلیسی را بساز:",
text:"من یک در می‌بینم",
words:["see","a","door","I"],
answer:["I","see","a","door"]
},

{
type:"build-en",
speak:"She opens the window",
question:"جمله انگلیسی را بساز:",
text:"او پنجره را باز می‌کند",
words:["opens","the","She","window"],
answer:["She","opens","the","window"]
},

{
type:"build-en",
speak:"We have a kitchen",
question:"جمله انگلیسی را بساز:",
text:"ما یک آشپزخانه داریم",
words:["have","a","We","kitchen"],
answer:["We","have","a","kitchen"]
},

{
type:"build-en",
speak:"They are in the room",
question:"جمله انگلیسی را بساز:",
text:"آنها در اتاق هستند",
words:["are","in","the","They","room"],
answer:["They","are","in","the","room"]
},

/* BUILD FA - جدید با تنوع شخصی */

{
type:"build-fa",
speak:"This is a house",
question:"ترجمه را بساز:",
text:"This is a house",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"I see a door",
question:"ترجمه را بساز:",
text:"I see a door",
words:["می‌بینم","یک","در","من"],
answer:["من","یک","در","می‌بینم"]
},

{
type:"build-fa",
speak:"She opens the window",
question:"ترجمه را بساز:",
text:"She opens the window",
words:["را","باز","پنجره","می‌کند","او"],
answer:["او","پنجره","را","باز","می‌کند"]
},

{
type:"build-fa",
speak:"We have a kitchen",
question:"ترجمه را بساز:",
text:"We have a kitchen",
words:["داریم","آشپزخانه","یک","ما"],
answer:["ما","یک","آشپزخانه","داریم"]
},

{
type:"build-fa",
speak:"They are in the room",
question:"ترجمه را بساز:",
text:"They are in the room",
words:["در","هستند","اتاق","آنها"],
answer:["آنها","در","اتاق","هستند"]
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