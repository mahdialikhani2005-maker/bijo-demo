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

// ===== سوالات درس ۲۸ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ジーンズ" است؟',
    speak: 'ジーンズ',
    options: [
      { text: 'ジーンズ', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'ジャケット', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'コート', image: '../../../media/a2/clothes/coat.png' },
      { text: 'ベスト', image: '../../../media/a2/clothes/vest.png' }
    ],
    answer: 'ジーンズ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ジャケット" است؟',
    speak: 'ジャケット',
    options: [
      { text: 'セーター', image: '../../../media/a2/clothes/sweater.png' },
      { text: 'ジャケット', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'ジーンズ', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'コート', image: '../../../media/a2/clothes/coat.png' }
    ],
    answer: 'ジャケット'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "コート" است؟',
    speak: 'コート',
    options: [
      { text: 'ジーンズ', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'コート', image: '../../../media/a2/clothes/coat.png' },
      { text: 'ベスト', image: '../../../media/a2/clothes/vest.png' },
      { text: 'ジャケット', image: '../../../media/a2/clothes/jacket.png' }
    ],
    answer: 'コート'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ベスト" است؟',
    speak: 'ベスト',
    options: [
      { text: 'ジャケット', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'ジーンズ', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'コート', image: '../../../media/a2/clothes/coat.png' },
      { text: 'ベスト', image: '../../../media/a2/clothes/vest.png' }
    ],
    answer: 'ベスト'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "セーター" است؟',
    speak: 'セーター',
    options: [
      { text: 'セーター', image: '../../../media/a2/clothes/sweater.png' },
      { text: 'ベスト', image: '../../../media/a2/clothes/vest.png' },
      { text: 'ジーンズ', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'ジャケット', image: '../../../media/a2/clothes/jacket.png' }
    ],
    answer: 'セーター'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/jeans.png',
    options: ['ジーンズ', 'ジャケット', 'コート', 'ベスト'],
    answer: 'ジーンズ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/jacket.png',
    options: ['ジーンズ', 'ジャケット', 'コート', 'セーター'],
    answer: 'ジャケット'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/coat.png',
    options: ['セーター', 'ジーンズ', 'コート', 'ジャケット'],
    answer: 'コート'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/vest.png',
    options: ['コート', 'ジャケット', 'ベスト', 'ジーンズ'],
    answer: 'ベスト'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/sweater.png',
    options: ['ジーンズ', 'ベスト', 'ジャケット', 'セーター'],
    answer: 'セーター'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ジーンズ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ジーンズ', 'ジャケット', 'コート', 'ベスト'],
    answer: 'ジーンズ'
  },
  {
    type: 'audio',
    speak: 'ジャケット',
    question: 'کدام کلمه را شنیدی؟',
    options: ['セーター', 'ジャケット', 'ジーンズ', 'コート'],
    answer: 'ジャケット'
  },
  {
    type: 'audio',
    speak: 'コート',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ジーンズ', 'コート', 'ベスト', 'ジャケット'],
    answer: 'コート'
  },
  {
    type: 'audio',
    speak: 'ベスト',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ジャケット', 'ジーンズ', 'コート', 'ベスト'],
    answer: 'ベスト'
  },
  {
    type: 'audio',
    speak: 'セーター',
    question: 'کدام کلمه را شنیدی؟',
    options: ['セーター', 'ベスト', 'ジーンズ', 'ジャケット'],
    answer: 'セーター'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ジーンズ',
    image: '../../../media/a2/clothes/jeans.png',
    meaning: 'شلوار جین'
  },
  {
    type: 'speak',
    word: 'ジャケット',
    image: '../../../media/a2/clothes/jacket.png',
    meaning: 'ژاکت'
  },
  {
    type: 'speak',
    word: 'コート',
    image: '../../../media/a2/clothes/coat.png',
    meaning: 'کت'
  },
  {
    type: 'speak',
    word: 'ベスト',
    image: '../../../media/a2/clothes/vest.png',
    meaning: 'جلیقه'
  },
  {
    type: 'speak',
    word: 'セーター',
    image: '../../../media/a2/clothes/sweater.png',
    meaning: 'پلیور'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ジーンズを履きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'شلوار جین می‌پوشم',
    words: ['ます', '履き', 'を', 'ジーンズ'],
    answer: ['ジーンズ', 'を', '履き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ジャケットを着ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'ژاکت می‌پوشم',
    words: ['ます', '着', 'を', 'ジャケット'],
    answer: ['ジャケット', 'を', '着', 'ます']
  },
  {
    type: 'build-it',
    speak: 'コートを着ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'کت می‌پوشم',
    words: ['ます', '着', 'を', 'コート'],
    answer: ['コート', 'を', '着', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ベストを着ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'جلیقه می‌پوشم',
    words: ['ます', '着', 'を', 'ベスト'],
    answer: ['ベスト', 'を', '着', 'ます']
  },
  {
    type: 'build-it',
    speak: 'セーターを着ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'پلیور می‌پوشم',
    words: ['ます', '着', 'を', 'セーター'],
    answer: ['セーター', 'を', '着', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ジーンズを履きます',
    question: 'ترجمه را بساز:',
    text: 'ジーンズを履きます',
    words: ['شلوار جین', 'می‌پوشم'],
    answer: ['شلوار جین', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'ジャケットを着ます',
    question: 'ترجمه را بساز:',
    text: 'ジャケットを着ます',
    words: ['ژاکت', 'می‌پوشم'],
    answer: ['ژاکت', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'コートを着ます',
    question: 'ترجمه را بساز:',
    text: 'コートを着ます',
    words: ['کت', 'می‌پوشم'],
    answer: ['کت', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'ベストを着ます',
    question: 'ترجمه را بساز:',
    text: 'ベストを着ます',
    words: ['جلیقه', 'می‌پوشم'],
    answer: ['جلیقه', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'セーターを着ます',
    question: 'ترجمه را بساز:',
    text: 'セーターを着ます',
    words: ['پلیور', 'می‌پوشم'],
    answer: ['پلیور', 'می‌پوشم']
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