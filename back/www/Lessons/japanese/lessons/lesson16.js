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
question:"学校 (gakkou) کدام است؟",
speak:"学校",
options:[
{text:"病院 (byouin)",image:"../../media/places/hospital.webp"},
{text:"学校 (gakkou)",image:"../../media/places/school.webp"},
{text:"店 (mise)",image:"../../media/places/store.webp"},
{text:"公園 (kouen)",image:"../../media/places/park.webp"}
],
answer:"学校 (gakkou)"
},

{
type:"image",
question:"病院 (byouin) کدام است؟",
speak:"病院",
options:[
{text:"公園 (kouen)",image:"../../media/places/park.webp"},
{text:"病院 (byouin)",image:"../../media/places/hospital.webp"},
{text:"モスク (mosuku)",image:"../../media/places/mosque.webp"},
{text:"学校 (gakkou)",image:"../../media/places/school.webp"}
],
answer:"病院 (byouin)"
},

{
type:"image",
question:"店 (mise) کدام است؟",
speak:"店",
options:[
{text:"学校 (gakkou)",image:"../../media/places/school.webp"},
{text:"店 (mise)",image:"../../media/places/store.webp"},
{text:"モスク (mosuku)",image:"../../media/places/mosque.webp"},
{text:"病院 (byouin)",image:"../../media/places/hospital.webp"}
],
answer:"店 (mise)"
},

{
type:"image",
question:"公園 (kouen) کدام است؟",
speak:"公園",
options:[
{text:"店 (mise)",image:"../../media/places/store.webp"},
{text:"病院 (byouin)",image:"../../media/places/hospital.webp"},
{text:"公園 (kouen)",image:"../../media/places/park.webp"},
{text:"学校 (gakkou)",image:"../../media/places/school.webp"}
],
answer:"公園 (kouen)"
},

{
type:"image",
question:"モスク (mosuku) کدام است؟",
speak:"モスク",
options:[
{text:"公園 (kouen)",image:"../../media/places/park.webp"},
{text:"学校 (gakkou)",image:"../../media/places/school.webp"},
{text:"病院 (byouin)",image:"../../media/places/hospital.webp"},
{text:"モスク (mosuku)",image:"../../media/places/mosque.webp"}
],
answer:"モスク (mosuku)"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/school.webp",
options:["病院","学校","店","公園"],
answer:"学校"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/hospital.webp",
options:["公園","病院","モスク","学校"],
answer:"病院"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/store.webp",
options:["学校","店","モスク","病院"],
answer:"店"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/park.webp",
options:["店","病院","公園","学校"],
answer:"公園"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/places/mosque.webp",
options:["公園","学校","病院","モスク"],
answer:"モスク"
},

/* AUDIO */

{
type:"audio",
speak:"学校",
question:"کدام کلمه را شنیدی؟",
options:["病院","学校","店","公園"],
answer:"学校"
},

{
type:"audio",
speak:"病院",
question:"کدام کلمه را شنیدی؟",
options:["公園","病院","モスク","学校"],
answer:"病院"
},

{
type:"audio",
speak:"店",
question:"کدام کلمه را شنیدی؟",
options:["学校","店","モスク","病院"],
answer:"店"
},

{
type:"audio",
speak:"公園",
question:"کدام کلمه را شنیدی؟",
options:["店","病院","公園","学校"],
answer:"公園"
},

{
type:"audio",
speak:"モスク",
question:"کدام کلمه را شنیدی؟",
options:["公園","学校","病院","モスク"],
answer:"モスク"
},

/* BUILD JP - ساخت جمله ژاپنی */

{
type:"build-jp",
speak:"これは学校です",
question:"جمله ژاپنی را بساز:",
text:"این یک مدرسه است",
words:["これ","は","学校","です"],
answer:["これ","は","学校","です"]
},

{
type:"build-jp",
speak:"私は病院に行きます",
question:"جمله ژاپنی را بساز:",
text:"من به بیمارستان می‌روم",
words:["私","は","病院","に","行きます"],
answer:["私","は","病院","に","行きます"]
},

{
type:"build-jp",
speak:"彼女は店にいます",
question:"جمله ژاپنی را بساز:",
text:"او در فروشگاه است",
words:["彼女","は","店","に","います"],
answer:["彼女","は","店","に","います"]
},

{
type:"build-jp",
speak:"私たちは公園にいます",
question:"جمله ژاپنی را بساز:",
text:"ما در پارک هستیم",
words:["私","たち","は","公園","に","います"],
answer:["私","たち","は","公園","に","います"]
},

{
type:"build-jp",
speak:"彼はモスクに行きます",
question:"جمله ژاپنی را بساز:",
text:"او به مسجد می‌رود",
words:["彼","は","モスク","に","行きます"],
answer:["彼","は","モスク","に","行きます"]
},

/* BUILD FA - ترجمه به فارسی */

{
type:"build-fa",
speak:"これは学校です",
question:"ترجمه را بساز:",
text:"これは学校です",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"私は病院に行きます",
question:"ترجمه را بساز:",
text:"私は病院に行きます",
words:["می‌روم","به","بیمارستان","من"],
answer:["من","به","بیمارستان","می‌روم"]
},

{
type:"build-fa",
speak:"彼女は店にいます",
question:"ترجمه را بساز:",
text:"彼女は店にいます",
words:["است","در","فروشگاه","او"],
answer:["او","در","فروشگاه","است"]
},

{
type:"build-fa",
speak:"私たちは公園にいます",
question:"ترجمه را بساز:",
text:"私たちは公園にいます",
words:["هستیم","در","پارک","ما"],
answer:["ما","در","پارک","هستیم"]
},

{
type:"build-fa",
speak:"彼はモスクに行きます",
question:"ترجمه را بساز:",
text:"彼はモスクに行きます",
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