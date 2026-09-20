let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "zh-CN",
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
  utter.lang = "zh-CN";
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
question:"学校 (xuéxiào) کدام است؟",
speak:"学校",
options:[
{text:"医院 (yīyuàn)",image:"../../media/places/hospital.webp"},
{text:"学校 (xuéxiào)",image:"../../media/places/school.webp"},
{text:"商店 (shāngdiàn)",image:"../../media/places/store.webp"},
{text:"公园 (gōngyuán)",image:"../../media/places/park.webp"}
],
answer:"学校 (xuéxiào)"
},

{
type:"image",
question:"医院 (yīyuàn) کدام است؟",
speak:"医院",
options:[
{text:"公园 (gōngyuán)",image:"../../media/places/park.webp"},
{text:"医院 (yīyuàn)",image:"../../media/places/hospital.webp"},
{text:"清真寺 (qīngzhēnsì)",image:"../../media/places/mosque.webp"},
{text:"学校 (xuéxiào)",image:"../../media/places/school.webp"}
],
answer:"医院 (yīyuàn)"
},

{
type:"image",
question:"商店 (shāngdiàn) کدام است؟",
speak:"商店",
options:[
{text:"学校 (xuéxiào)",image:"../../media/places/school.webp"},
{text:"商店 (shāngdiàn)",image:"../../media/places/store.webp"},
{text:"清真寺 (qīngzhēnsì)",image:"../../media/places/mosque.webp"},
{text:"医院 (yīyuàn)",image:"../../media/places/hospital.webp"}
],
answer:"商店 (shāngdiàn)"
},

{
type:"image",
question:"公园 (gōngyuán) کدام است؟",
speak:"公园",
options:[
{text:"商店 (shāngdiàn)",image:"../../media/places/store.webp"},
{text:"医院 (yīyuàn)",image:"../../media/places/hospital.webp"},
{text:"公园 (gōngyuán)",image:"../../media/places/park.webp"},
{text:"学校 (xuéxiào)",image:"../../media/places/school.webp"}
],
answer:"公园 (gōngyuán)"
},

{
type:"image",
question:"清真寺 (qīngzhēnsì) کدام است؟",
speak:"清真寺",
options:[
{text:"公园 (gōngyuán)",image:"../../media/places/park.webp"},
{text:"学校 (xuéxiào)",image:"../../media/places/school.webp"},
{text:"医院 (yīyuàn)",image:"../../media/places/hospital.webp"},
{text:"清真寺 (qīngzhēnsì)",image:"../../media/places/mosque.webp"}
],
answer:"清真寺 (qīngzhēnsì)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["医院 (yīyuàn)","学校 (xuéxiào)","商店 (shāngdiàn)","公园 (gōngyuán)"],
answer:"学校 (xuéxiào)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["公园 (gōngyuán)","医院 (yīyuàn)","清真寺 (qīngzhēnsì)","学校 (xuéxiào)"],
answer:"医院 (yīyuàn)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["学校 (xuéxiào)","商店 (shāngdiàn)","清真寺 (qīngzhēnsì)","医院 (yīyuàn)"],
answer:"商店 (shāngdiàn)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["商店 (shāngdiàn)","医院 (yīyuàn)","公园 (gōngyuán)","学校 (xuéxiào)"],
answer:"公园 (gōngyuán)"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["公园 (gōngyuán)","学校 (xuéxiào)","医院 (yīyuàn)","清真寺 (qīngzhēnsì)"],
answer:"清真寺 (qīngzhēnsì)"
},

/* AUDIO */

{
type:"audio",
speak:"学校",
question:"کدام کلمه را شنیدی؟",
options:["医院 (yīyuàn)","学校 (xuéxiào)","商店 (shāngdiàn)","公园 (gōngyuán)"],
answer:"学校 (xuéxiào)"
},

{
type:"audio",
speak:"医院",
question:"کدام کلمه را شنیدی؟",
options:["公园 (gōngyuán)","医院 (yīyuàn)","清真寺 (qīngzhēnsì)","学校 (xuéxiào)"],
answer:"医院 (yīyuàn)"
},

{
type:"audio",
speak:"商店",
question:"کدام کلمه را شنیدی؟",
options:["学校 (xuéxiào)","商店 (shāngdiàn)","清真寺 (qīngzhēnsì)","医院 (yīyuàn)"],
answer:"商店 (shāngdiàn)"
},

{
type:"audio",
speak:"公园",
question:"کدام کلمه را شنیدی؟",
options:["商店 (shāngdiàn)","医院 (yīyuàn)","公园 (gōngyuán)","学校 (xuéxiào)"],
answer:"公园 (gōngyuán)"
},

{
type:"audio",
speak:"清真寺",
question:"کدام کلمه را شنیدی؟",
options:["公园 (gōngyuán)","学校 (xuéxiào)","医院 (yīyuàn)","清真寺 (qīngzhēnsì)"],
answer:"清真寺 (qīngzhēnsì)"
},

/* BUILD ZH - ساخت جمله چینی */

{
type:"build-zh",
speak:"这是学校",
question:"جمله چینی را بساز:",
text:"این یک مدرسه است",
words:["这","是","学校"],
answer:["这","是","学校"]
},

{
type:"build-zh",
speak:"我去医院",
question:"جمله چینی را بساز:",
text:"من به بیمارستان می‌روم",
words:["我","去","医院"],
answer:["我","去","医院"]
},

{
type:"build-zh",
speak:"她在商店",
question:"جمله چینی را بساز:",
text:"او در فروشگاه است",
words:["她","在","商店"],
answer:["她","在","商店"]
},

{
type:"build-zh",
speak:"我们在公园",
question:"جمله چینی را بساز:",
text:"ما در پارک هستیم",
words:["我们","在","公园"],
answer:["我们","在","公园"]
},

{
type:"build-zh",
speak:"他去清真寺",
question:"جمله چینی را بساز:",
text:"او به مسجد می‌رود",
words:["他","去","清真寺"],
answer:["他","去","清真寺"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"这是学校",
question:"ترجمه را بساز:",
text:"这是学校",
words:["است","مدرسه","این"],
answer:["این","مدرسه","است"]
},

{
type:"build-fa",
speak:"我去医院",
question:"ترجمه را بساز:",
text:"我去医院",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"她在商店",
question:"ترجمه را بساز:",
text:"她在商店",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"我们在公园",
question:"ترجمه را بساز:",
text:"我们在公园",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"他去清真寺",
question:"ترجمه را بساز:",
text:"他去清真寺",
words:["می‌رود","به","مسجد","او"],
answer:["او","به","مسجد","می‌رود"]
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

  // BUILD CHINESE / FA

  else if (q.type === "build-zh" || q.type === "build-fa") {
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

  if (q.type === "build-zh") {
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