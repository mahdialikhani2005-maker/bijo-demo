let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع ضبط صدا =====
function startRecording(targetWord) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("مرورگر شما از ضبط صدا پشتیبانی نمی‌کند. لطفاً از Chrome استفاده کنید.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = false;

  const recordBtn = document.getElementById('record-btn');
  const statusText = document.getElementById('record-status');

  if (isRecording) {
    recognition.stop();
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
    if (statusText) statusText.textContent = 'برای شروع ضبط کلیک کن';
    return;
  }

  isRecording = true;
  if (recordBtn) recordBtn.textContent = '⏹️ توقف';
  if (statusText) statusText.textContent = 'در حال گوش دادن...';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    if (transcript === targetWord) {
      if (statusText) statusText.textContent = '✅ عالی! درست گفتی! 🎉';
      if (recordBtn) recordBtn.textContent = '✅';
      
      xp += 5;
      if (typeof addXP === 'function') {
        addXP(5);
      }
      
      setTimeout(() => {
        current++;
        showQuestion();
      }, 1000);
    } else {
      if (statusText) statusText.textContent = '❌ اشتباه! دوباره تلاش کن. کلمه: ' + targetWord;
      if (typeof loseHeart === 'function') {
        loseHeart();
      }
      const heartElement = document.getElementById('heart-count');
      if (heartElement && typeof getHearts === 'function') {
        heartElement.textContent = getHearts();
      }
    }
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.onerror = function(event) {
    if (statusText) statusText.textContent = '❌ خطا: ' + event.error;
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.onend = function() {
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.start();
}

// ===== تابع رد کردن بخش صدا =====
function skipSpeak() {
  current++;
  showQuestion();
}

// ===== بررسی قلب در شروع =====
window.onload = function() {
  if (typeof checkAndRegenHearts === 'function') {
    checkAndRegenHearts();
  }

  if (typeof getHearts === 'function') {
    const currentHearts = getHearts();
    const heartElement = document.getElementById('heart-count');
    if (heartElement) {
      heartElement.textContent = currentHearts;
    }

    if (currentHearts <= 0) {
      alert('قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.');
      window.location.href = '../../../home.html';
    }
  }
};

// ===== سوالات درس ۴۴ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "アレルギー" است؟',
    speak: 'アレルギー',
    options: [
      { text: 'アレルギー', image: '../../../media/a2/health/allergy.png' },
      { text: 'かんせん', image: '../../../media/a2/health/infection.png' },
      { text: 'けが', image: '../../../media/a2/health/injury.png' },
      { text: 'きず', image: '../../../media/a2/health/wound.png' }
    ],
    answer: 'アレルギー'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かんせん" است؟',
    speak: 'かんせん',
    options: [
      { text: 'きずあと', image: '../../../media/a2/health/scar.png' },
      { text: 'かんせん', image: '../../../media/a2/health/infection.png' },
      { text: 'アレルギー', image: '../../../media/a2/health/allergy.png' },
      { text: 'けが', image: '../../../media/a2/health/injury.png' }
    ],
    answer: 'かんせん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "けが" است؟',
    speak: 'けが',
    options: [
      { text: 'アレルギー', image: '../../../media/a2/health/allergy.png' },
      { text: 'けが', image: '../../../media/a2/health/injury.png' },
      { text: 'きず', image: '../../../media/a2/health/wound.png' },
      { text: 'かんせん', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'けが'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "きず" است؟',
    speak: 'きず',
    options: [
      { text: 'かんせん', image: '../../../media/a2/health/infection.png' },
      { text: 'アレルギー', image: '../../../media/a2/health/allergy.png' },
      { text: 'けが', image: '../../../media/a2/health/injury.png' },
      { text: 'きず', image: '../../../media/a2/health/wound.png' }
    ],
    answer: 'きず'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "きずあと" است؟',
    speak: 'きずあと',
    options: [
      { text: 'きずあと', image: '../../../media/a2/health/scar.png' },
      { text: 'きず', image: '../../../media/a2/health/wound.png' },
      { text: 'アレルギー', image: '../../../media/a2/health/allergy.png' },
      { text: 'かんせん', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'きずあと'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/allergy.png',
    options: ['アレルギー', 'かんせん', 'けが', 'きず'],
    answer: 'アレルギー'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/infection.png',
    options: ['アレルギー', 'かんせん', 'けが', 'きずあと'],
    answer: 'かんせん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injury.png',
    options: ['きずあと', 'アレルギー', 'けが', 'かんせん'],
    answer: 'けが'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wound.png',
    options: ['けが', 'かんせん', 'きず', 'アレルギー'],
    answer: 'きず'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/scar.png',
    options: ['アレルギー', 'きず', 'かんせん', 'きずあと'],
    answer: 'きずあと'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'アレルギー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アレルギー', 'かんせん', 'けが', 'きずあと'],
    answer: 'アレルギー'
  },
  {
    type: 'audio',
    speak: 'かんせん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['きずあと', 'かんせん', 'アレルギー', 'けが'],
    answer: 'かんせん'
  },
  {
    type: 'audio',
    speak: 'けが',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アレルギー', 'けが', 'きず', 'かんせん'],
    answer: 'けが'
  },
  {
    type: 'audio',
    speak: 'きず',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かんせん', 'アレルギー', 'けが', 'きず'],
    answer: 'きず'
  },
  {
    type: 'audio',
    speak: 'きずあと',
    question: 'کدام کلمه را شنیدی؟',
    options: ['きずあと', 'きず', 'アレルギー', 'かんせん'],
    answer: 'きずあと'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'アレルギー',
    image: '../../../media/a2/health/allergy.png',
    meaning: 'حساسیت'
  },
  {
    type: 'speak',
    word: 'かんせん',
    image: '../../../media/a2/health/infection.png',
    meaning: 'عفونت'
  },
  {
    type: 'speak',
    word: 'けが',
    image: '../../../media/a2/health/injury.png',
    meaning: 'آسیب'
  },
  {
    type: 'speak',
    word: 'きず',
    image: '../../../media/a2/health/wound.png',
    meaning: 'زخم'
  },
  {
    type: 'speak',
    word: 'きずあと',
    image: '../../../media/a2/health/scar.png',
    meaning: 'جای زخم'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'アレルギーがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'حساسیت دارم',
    words: ['ます', 'あり', 'が', 'アレルギー'],
    answer: ['アレルギー', 'が', 'あり', 'ます']
  },
  {
    type: 'build-it',
    speak: 'かんせんしました',
    question: 'جمله ژاپنی را بساز:',
    text: 'عفونت کردم',
    words: ['ました', 'し', 'を', 'かんせん'],
    answer: ['かんせん', 'を', 'し', 'ました']
  },
  {
    type: 'build-it',
    speak: 'けがをしました',
    question: 'جمله ژاپنی را بساز:',
    text: 'آسیب دیدم',
    words: ['ました', 'し', 'を', 'けが'],
    answer: ['けが', 'を', 'し', 'ました']
  },
  {
    type: 'build-it',
    speak: 'きずがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'زخم دارم',
    words: ['ます', 'あり', 'が', 'きず'],
    answer: ['きず', 'が', 'あり', 'ます']
  },
  {
    type: 'build-it',
    speak: 'きずあとが残りました',
    question: 'جمله ژاپنی را بساز:',
    text: 'جای زخم باقی ماند',
    words: ['ました', '残り', 'が', 'きずあと'],
    answer: ['きずあと', 'が', '残り', 'ました']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'アレルギーがあります',
    question: 'ترجمه را بساز:',
    text: 'アレルギーがあります',
    words: ['حساسیت', 'دارم'],
    answer: ['حساسیت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'かんせんしました',
    question: 'ترجمه را بساز:',
    text: 'かんせんしました',
    words: ['عفونت', 'کردم'],
    answer: ['عفونت', 'کردم']
  },
  {
    type: 'build-fa',
    speak: 'けがをしました',
    question: 'ترجمه را بساز:',
    text: 'けがをしました',
    words: ['آسیب', 'دیدم'],
    answer: ['آسیب', 'دیدم']
  },
  {
    type: 'build-fa',
    speak: 'きずがあります',
    question: 'ترجمه را بساز:',
    text: 'きずがあります',
    words: ['زخم', 'دارم'],
    answer: ['زخم', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'きずあとが残りました',
    question: 'ترجمه را بساز:',
    text: 'きずあとが残りました',
    words: ['جای زخم', 'باقی', 'ماند'],
    answer: ['جای زخم', 'باقی', 'ماند']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 レッスンが終わりました！ 🎉</h2>
      <p>امتیاز دریافت‌شده: <b>${finalXP}</b></p>
      <a href="../index.html">بازگشت</a>
    `;
    return;
  }

  const q = questions[current];
  const title = document.getElementById('question-title');
  const content = document.getElementById('question-content');
  const optionsBox = document.getElementById('options');
  const wordBuilder = document.getElementById('word-builder');

  title.innerText = '';
  content.innerHTML = '';
  optionsBox.innerHTML = '';
  wordBuilder.innerHTML = '';
  wordBuilder.classList.add('hidden');

  // ===== بخش SPEAK =====
  if (q.type === 'speak') {
    title.innerText = '🗣️ کلمه را بگو';
    content.innerHTML = `
      <div class="speak-card">
        <img src="${q.image}" alt="${q.word}">
        <div class="word-big">${q.word}</div>
        <div class="word-meaning">${q.meaning}</div>
        <button class="audio-btn" onclick="speak('${q.word}')">🔊 تکرار</button>
        <div class="record-area">
          <button id="record-btn" class="record-btn" onclick="startRecording('${q.word}')">🎤 ضبط</button>
          <div id="record-status" class="record-status">برای شروع ضبط کلیک کن</div>
        </div>
        <div class="skip-area">
          <button class="skip-btn" onclick="skipSpeak()">⏭️ رد کردن (بدون امتیاز)</button>
        </div>
      </div>
    `;
    return;
  }

  // ===== بخش IMAGE =====
  if (q.type === 'image') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn repeat-btn" onclick="speak('${q.speak}')">🔊 تکرار صدا</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    optionsBox.classList.add('image-grid');
    shuffleArray(q.options).forEach(opt => {
      let btn = document.createElement('button');
      btn.className = 'option image-option';
      btn.innerHTML = `<img src="${opt.image}" alt="${opt.text}">`;
      btn.onclick = () => select(opt.text);
      optionsBox.appendChild(btn);
    });
    return;
  }

  // ===== بخش WORD =====
  if (q.type === 'word') {
    title.innerText = q.question;
    content.innerHTML = `<img src="${q.image}">`;
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement('button');
      b.className = 'option';
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
    return;
  }

  // ===== بخش AUDIO =====
  if (q.type === 'audio') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تکرار</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement('button');
      b.className = 'option';
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
    return;
  }

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
    title.innerText = q.question;
    content.innerHTML = `
      <p style="margin-bottom:10px;">${q.text}</p>
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تکرار جمله</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    
    wordBuilder.innerHTML = '';
    optionsBox.innerHTML = '';
    wordBuilder.classList.remove('hidden');
    wordBuilder.classList.remove('ltr', 'rtl');
    optionsBox.classList.remove('ltr', 'rtl');

    if (q.type === 'build-it') {
      wordBuilder.classList.add('ltr');
      optionsBox.classList.add('ltr');
    } else {
      wordBuilder.classList.add('rtl');
      optionsBox.classList.add('rtl');
    }

    shuffleArray(q.words).forEach(w => {
      const tile = document.createElement('span');
      tile.className = 'tile';
      tile.innerText = w;
      tile.dataset.word = w;

      tile.onclick = () => {
        if (tile.parentNode === optionsBox) {
          wordBuilder.appendChild(tile);
        } else if (tile.parentNode === wordBuilder) {
          optionsBox.appendChild(tile);
        }
        const userWords = [...wordBuilder.children].map(el => el.dataset.word);
        if (userWords.length === q.answer.length) {
          checkBuild(userWords, q.answer);
        }
      };
      optionsBox.appendChild(tile);
    });
    return;
  }
}

// ===== توابع کمکی =====
function nextQuestion() {
  current++;
  showQuestion();
}

async function select(ans) {
  const correct = questions[current].answer;
  if (String(ans).trim() === String(correct).trim()) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('❌ اشتباه! دوباره تلاش کن.');
    if (typeof loseHeart === 'function') {
      await loseHeart();
    }
    if (typeof checkAndRegenHearts === 'function') {
      checkAndRegenHearts();
    }
    const heartElement = document.getElementById('heart-count');
    if (heartElement && typeof getHearts === 'function') {
      heartElement.textContent = getHearts();
    }
    if (typeof getHearts === 'function' && getHearts() <= 0) {
      document.getElementById('app').innerHTML = `
        <h2>💔 قلب شما تمام شد!</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim());
  const c = correct.map(w => w.trim());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('❌ اشتباه! دوباره تلاش کن.');
    if (typeof loseHeart === 'function') {
      await loseHeart();
    }
    if (typeof checkAndRegenHearts === 'function') {
      checkAndRegenHearts();
    }
    const heartElement = document.getElementById('heart-count');
    if (heartElement && typeof getHearts === 'function') {
      heartElement.textContent = getHearts();
    }
    if (typeof getHearts === 'function' && getHearts() <= 0) {
      document.getElementById('app').innerHTML = `
        <h2>💔 قلب شما تمام شد!</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

function removeLastBuilderItem() {
  const wordBuilder = document.getElementById('word-builder');
  const optionsBox = document.getElementById('options');
  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;
  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) {
    optionsBox.prepend(lastItem);
  }
}

document.addEventListener('keydown', function (e) {
  const wordBuilder = document.getElementById('word-builder');
  if (!wordBuilder) return;
  if (e.key === 'Backspace') {
    e.preventDefault();
    removeLastBuilderItem();
  }
});

function shuffleArray(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

showQuestion();