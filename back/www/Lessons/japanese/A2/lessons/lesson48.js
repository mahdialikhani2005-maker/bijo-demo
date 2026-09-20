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

// ===== سوالات درس ۴۸ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "だいがく" است؟',
    speak: 'だいがく',
    options: [
      { text: 'だいがく', image: '../../../media/a2/school/university.png' },
      { text: 'カレッジ', image: '../../../media/a2/school/college.png' },
      { text: 'キャンパス', image: '../../../media/a2/school/campus.png' },
      { text: 'りょう', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: 'だいがく'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "カレッジ" است؟',
    speak: 'カレッジ',
    options: [
      { text: 'けんきゅうしつ', image: '../../../media/a2/school/laboratory.png' },
      { text: 'カレッジ', image: '../../../media/a2/school/college.png' },
      { text: 'だいがく', image: '../../../media/a2/school/university.png' },
      { text: 'キャンパス', image: '../../../media/a2/school/campus.png' }
    ],
    answer: 'カレッジ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "キャンパス" است؟',
    speak: 'キャンパス',
    options: [
      { text: 'だいがく', image: '../../../media/a2/school/university.png' },
      { text: 'キャンパス', image: '../../../media/a2/school/campus.png' },
      { text: 'りょう', image: '../../../media/a2/school/dormitory.png' },
      { text: 'カレッジ', image: '../../../media/a2/school/college.png' }
    ],
    answer: 'キャンパス'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "りょう" است؟',
    speak: 'りょう',
    options: [
      { text: 'カレッジ', image: '../../../media/a2/school/college.png' },
      { text: 'だいがく', image: '../../../media/a2/school/university.png' },
      { text: 'キャンパス', image: '../../../media/a2/school/campus.png' },
      { text: 'りょう', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: 'りょう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "けんきゅうしつ" است؟',
    speak: 'けんきゅうしつ',
    options: [
      { text: 'けんきゅうしつ', image: '../../../media/a2/school/laboratory.png' },
      { text: 'りょう', image: '../../../media/a2/school/dormitory.png' },
      { text: 'だいがく', image: '../../../media/a2/school/university.png' },
      { text: 'キャンパス', image: '../../../media/a2/school/campus.png' }
    ],
    answer: 'けんきゅうしつ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/university.png',
    options: ['だいがく', 'カレッジ', 'キャンパス', 'りょう'],
    answer: 'だいがく'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/college.png',
    options: ['だいがく', 'カレッジ', 'キャンパス', 'けんきゅうしつ'],
    answer: 'カレッジ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/campus.png',
    options: ['けんきゅうしつ', 'だいがく', 'キャンパス', 'カレッジ'],
    answer: 'キャンパス'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dormitory.png',
    options: ['キャンパス', 'カレッジ', 'りょう', 'だいがく'],
    answer: 'りょう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/laboratory.png',
    options: ['だいがく', 'けんきゅうしつ', 'キャンパス', 'りょう'],
    answer: 'けんきゅうしつ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'だいがく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['だいがく', 'カレッジ', 'キャンパス', 'りょう'],
    answer: 'だいがく'
  },
  {
    type: 'audio',
    speak: 'カレッジ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['けんきゅうしつ', 'カレッジ', 'だいがく', 'キャンパス'],
    answer: 'カレッジ'
  },
  {
    type: 'audio',
    speak: 'キャンパス',
    question: 'کدام کلمه را شنیدی؟',
    options: ['だいがく', 'キャンパス', 'りょう', 'カレッジ'],
    answer: 'キャンパス'
  },
  {
    type: 'audio',
    speak: 'りょう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['カレッジ', 'だいがく', 'キャンパス', 'りょう'],
    answer: 'りょう'
  },
  {
    type: 'audio',
    speak: 'けんきゅうしつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['けんきゅうしつ', 'りょう', 'だいがく', 'キャンパス'],
    answer: 'けんきゅうしつ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'だいがく',
    image: '../../../media/a2/school/university.png',
    meaning: 'دانشگاه'
  },
  {
    type: 'speak',
    word: 'カレッジ',
    image: '../../../media/a2/school/college.png',
    meaning: 'کالج'
  },
  {
    type: 'speak',
    word: 'キャンパス',
    image: '../../../media/a2/school/campus.png',
    meaning: 'محوطه دانشگاه'
  },
  {
    type: 'speak',
    word: 'りょう',
    image: '../../../media/a2/school/dormitory.png',
    meaning: 'خوابگاه'
  },
  {
    type: 'speak',
    word: 'けんきゅうしつ',
    image: '../../../media/a2/school/laboratory.png',
    meaning: 'آزمایشگاه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'だいがくに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'به دانشگاه می‌روم',
    words: ['ます', '行き', 'に', 'だいがく'],
    answer: ['だいがく', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'カレッジで勉強します',
    question: 'جمله ژاپنی را بساز:',
    text: 'در کالج تحصیل می‌کنم',
    words: ['ます', '勉強', 'で', 'カレッジ'],
    answer: ['カレッジ', 'で', '勉強', 'します']
  },
  {
    type: 'build-it',
    speak: 'キャンパスは広いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'محوطه دانشگاه بزرگ است',
    words: ['です', '広い', 'は', 'キャンパス'],
    answer: ['キャンパス', 'は', '広い', 'です']
  },
  {
    type: 'build-it',
    speak: 'りょうに住んでいます',
    question: 'جمله ژاپنی را بساز:',
    text: 'در خوابگاه زندگی می‌کنم',
    words: ['ます', '住ん', 'に', 'りょう'],
    answer: ['りょう', 'に', '住ん', 'で', 'います']
  },
  {
    type: 'build-it',
    speak: 'けんきゅうしつで実験します',
    question: 'جمله ژاپنی را بساز:',
    text: 'در آزمایشگاه آزمایش می‌کنم',
    words: ['ます', '実験', 'で', 'けんきゅうしつ'],
    answer: ['けんきゅうしつ', 'で', '実験', 'します']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'だいがくに行きます',
    question: 'ترجمه را بساز:',
    text: 'だいがくに行きます',
    words: ['به', 'دانشگاه', 'می‌روم'],
    answer: ['به', 'دانشگاه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'カレッジで勉強します',
    question: 'ترجمه را بساز:',
    text: 'カレッジで勉強します',
    words: ['در', 'کالج', 'تحصیل', 'می‌کنم'],
    answer: ['در', 'کالج', 'تحصیل', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'キャンパスは広いです',
    question: 'ترجمه را بساز:',
    text: 'キャンパスは広いです',
    words: ['محوطه دانشگاه', 'بزرگ', 'است'],
    answer: ['محوطه دانشگاه', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'りょうに住んでいます',
    question: 'ترجمه را بساز:',
    text: 'りょうに住んでいます',
    words: ['در', 'خوابگاه', 'زندگی', 'می‌کنم'],
    answer: ['در', 'خوابگاه', 'زندگی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'けんきゅうしつで実験します',
    question: 'ترجمه را بساز:',
    text: 'けんきゅうしつで実験します',
    words: ['در', 'آزمایشگاه', 'آزمایش', 'می‌کنم'],
    answer: ['در', 'آزمایشگاه', 'آزمایش', 'می‌کنم']
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