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

// ===== سوالات درس ۳۰ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "かさ" است؟',
    speak: 'かさ',
    options: [
      { text: 'かさ', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'バッグ', image: '../../../media/a2/clothes/bag.png' },
      { text: 'リュックサック', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'さいふ', image: '../../../media/a2/clothes/wallet.png' }
    ],
    answer: 'かさ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "バッグ" است؟',
    speak: 'バッグ',
    options: [
      { text: 'ハンドバッグ', image: '../../../media/a2/clothes/purse.png' },
      { text: 'バッグ', image: '../../../media/a2/clothes/bag.png' },
      { text: 'かさ', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'リュックサック', image: '../../../media/a2/clothes/backpack.png' }
    ],
    answer: 'バッグ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "リュックサック" است؟',
    speak: 'リュックサック',
    options: [
      { text: 'かさ', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'リュックサック', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'さいふ', image: '../../../media/a2/clothes/wallet.png' },
      { text: 'バッグ', image: '../../../media/a2/clothes/bag.png' }
    ],
    answer: 'リュックサック'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "さいふ" است؟',
    speak: 'さいふ',
    options: [
      { text: 'バッグ', image: '../../../media/a2/clothes/bag.png' },
      { text: 'かさ', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'リュックサック', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'さいふ', image: '../../../media/a2/clothes/wallet.png' }
    ],
    answer: 'さいふ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ハンドバッグ" است؟',
    speak: 'ハンドバッグ',
    options: [
      { text: 'ハンドバッグ', image: '../../../media/a2/clothes/purse.png' },
      { text: 'さいふ', image: '../../../media/a2/clothes/wallet.png' },
      { text: 'かさ', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'バッグ', image: '../../../media/a2/clothes/bag.png' }
    ],
    answer: 'ハンドバッグ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/umbrella.png',
    options: ['かさ', 'バッグ', 'リュックサック', 'さいふ'],
    answer: 'かさ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bag.png',
    options: ['かさ', 'バッグ', 'リュックサック', 'ハンドバッグ'],
    answer: 'バッグ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/backpack.png',
    options: ['ハンドバッグ', 'かさ', 'リュックサック', 'バッグ'],
    answer: 'リュックサック'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/wallet.png',
    options: ['リュックサック', 'バッグ', 'さいふ', 'かさ'],
    answer: 'さいふ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/purse.png',
    options: ['かさ', 'さいふ', 'バッグ', 'ハンドバッグ'],
    answer: 'ハンドバッグ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'かさ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かさ', 'バッグ', 'リュックサック', 'さいふ'],
    answer: 'かさ'
  },
  {
    type: 'audio',
    speak: 'バッグ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ハンドバッグ', 'バッグ', 'かさ', 'リュックサック'],
    answer: 'バッグ'
  },
  {
    type: 'audio',
    speak: 'リュックサック',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かさ', 'リュックサック', 'さいふ', 'バッグ'],
    answer: 'リュックサック'
  },
  {
    type: 'audio',
    speak: 'さいふ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['バッグ', 'かさ', 'リュックサック', 'さいふ'],
    answer: 'さいふ'
  },
  {
    type: 'audio',
    speak: 'ハンドバッグ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ハンドバッグ', 'さいふ', 'かさ', 'バッグ'],
    answer: 'ハンドバッグ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'かさ',
    image: '../../../media/a2/clothes/umbrella.png',
    meaning: 'چتر'
  },
  {
    type: 'speak',
    word: 'バッグ',
    image: '../../../media/a2/clothes/bag.png',
    meaning: 'کیف'
  },
  {
    type: 'speak',
    word: 'リュックサック',
    image: '../../../media/a2/clothes/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: 'さいふ',
    image: '../../../media/a2/clothes/wallet.png',
    meaning: 'کیف پول'
  },
  {
    type: 'speak',
    word: 'ハンドバッグ',
    image: '../../../media/a2/clothes/purse.png',
    meaning: 'کیف دستی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'かさを持っています',
    question: 'جمله ژاپنی را بساز:',
    text: 'چتر دارم',
    words: ['ます', '持っ', 'を', 'かさ'],
    answer: ['かさ', 'を', '持っ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'バッグを持っています',
    question: 'جمله ژاپنی را بساز:',
    text: 'کیف دارم',
    words: ['ます', '持っ', 'を', 'バッグ'],
    answer: ['バッグ', 'を', '持っ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'リュックサックを持っています',
    question: 'جمله ژاپنی را بساز:',
    text: 'کوله پشتی دارم',
    words: ['ます', '持っ', 'を', 'リュックサック'],
    answer: ['リュックサック', 'を', '持っ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'さいふを持っています',
    question: 'جمله ژاپنی را بساز:',
    text: 'کیف پول دارم',
    words: ['ます', '持っ', 'を', 'さいふ'],
    answer: ['さいふ', 'を', '持っ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'ハンドバッグを持っています',
    question: 'جمله ژاپنی را بساز:',
    text: 'کیف دستی دارم',
    words: ['ます', '持っ', 'を', 'ハンドバッグ'],
    answer: ['ハンドバッグ', 'を', '持っ', 'ています']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'かさを持っています',
    question: 'ترجمه را بساز:',
    text: 'かさを持っています',
    words: ['چتر', 'دارم'],
    answer: ['چتر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'バッグを持っています',
    question: 'ترجمه را بساز:',
    text: 'バッグを持っています',
    words: ['کیف', 'دارم'],
    answer: ['کیف', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'リュックサックを持っています',
    question: 'ترجمه را بساز:',
    text: 'リュックサックを持っています',
    words: ['کوله پشتی', 'دارم'],
    answer: ['کوله پشتی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'さいふを持っています',
    question: 'ترجمه را بساز:',
    text: 'さいふを持っています',
    words: ['کیف پول', 'دارم'],
    answer: ['کیف پول', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'ハンドバッグを持っています',
    question: 'ترجمه را بساز:',
    text: 'ハンドバッグを持っています',
    words: ['کیف دستی', 'دارم'],
    answer: ['کیف دستی', 'دارم']
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