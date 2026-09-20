let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
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
  recognition.lang = 'ko-KR';
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

// ===== سوالات درس ۴۳ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "기침" است؟',
    speak: '기침',
    options: [
      { text: '기침', image: '../../../media/a2/health/cough.png' },
      { text: '열', image: '../../../media/a2/health/fever.png' },
      { text: '아스피린', image: '../../../media/a2/health/aspirin.png' },
      { text: '주사', image: '../../../media/a2/health/injection.png' }
    ],
    answer: '기침'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "열" است؟',
    speak: '열',
    options: [
      { text: '약', image: '../../../media/a2/health/medicine.png' },
      { text: '열', image: '../../../media/a2/health/fever.png' },
      { text: '기침', image: '../../../media/a2/health/cough.png' },
      { text: '아스피린', image: '../../../media/a2/health/aspirin.png' }
    ],
    answer: '열'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "아스피린" است؟',
    speak: '아스피린',
    options: [
      { text: '기침', image: '../../../media/a2/health/cough.png' },
      { text: '아스피린', image: '../../../media/a2/health/aspirin.png' },
      { text: '주사', image: '../../../media/a2/health/injection.png' },
      { text: '열', image: '../../../media/a2/health/fever.png' }
    ],
    answer: '아스피린'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "약" است؟',
    speak: '약',
    options: [
      { text: '열', image: '../../../media/a2/health/fever.png' },
      { text: '기침', image: '../../../media/a2/health/cough.png' },
      { text: '아스피린', image: '../../../media/a2/health/aspirin.png' },
      { text: '약', image: '../../../media/a2/health/medicine.png' }
    ],
    answer: '약'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "주사" است؟',
    speak: '주사',
    options: [
      { text: '주사', image: '../../../media/a2/health/injection.png' },
      { text: '약', image: '../../../media/a2/health/medicine.png' },
      { text: '기침', image: '../../../media/a2/health/cough.png' },
      { text: '열', image: '../../../media/a2/health/fever.png' }
    ],
    answer: '주사'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cough.png',
    options: ['기침', '열', '아스피린', '주사'],
    answer: '기침'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/fever.png',
    options: ['기침', '열', '약', '아스피린'],
    answer: '열'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/aspirin.png',
    options: ['약', '기침', '아스피린', '열'],
    answer: '아스피린'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/medicine.png',
    options: ['아스피린', '열', '주사', '약'],
    answer: '약'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injection.png',
    options: ['기침', '약', '열', '주사'],
    answer: '주사'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '기침',
    question: 'کدام کلمه را شنیدی؟',
    options: ['기침', '열', '아스피린', '주사'],
    answer: '기침'
  },
  {
    type: 'audio',
    speak: '열',
    question: 'کدام کلمه را شنیدی؟',
    options: ['약', '열', '기침', '아스피린'],
    answer: '열'
  },
  {
    type: 'audio',
    speak: '아스피린',
    question: 'کدام کلمه را شنیدی؟',
    options: ['기침', '아스피린', '주사', '열'],
    answer: '아스피린'
  },
  {
    type: 'audio',
    speak: '약',
    question: 'کدام کلمه را شنیدی؟',
    options: ['열', '기침', '아스피린', '약'],
    answer: '약'
  },
  {
    type: 'audio',
    speak: '주사',
    question: 'کدام کلمه را شنیدی؟',
    options: ['주사', '약', '기침', '열'],
    answer: '주사'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '기침',
    image: '../../../media/a2/health/cough.png',
    meaning: 'سرفه'
  },
  {
    type: 'speak',
    word: '열',
    image: '../../../media/a2/health/fever.png',
    meaning: 'تب'
  },
  {
    type: 'speak',
    word: '아스피린',
    image: '../../../media/a2/health/aspirin.png',
    meaning: 'آسپرین'
  },
  {
    type: 'speak',
    word: '약',
    image: '../../../media/a2/health/medicine.png',
    meaning: 'دارو'
  },
  {
    type: 'speak',
    word: '주사',
    image: '../../../media/a2/health/injection.png',
    meaning: 'آمپول'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '기침이 납니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'سرفه می‌کنم',
    words: ['납니다', '이', '기침'],
    answer: ['기침이', '납니다']
  },
  {
    type: 'build-it',
    speak: '열이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'تب دارم',
    words: ['있습니다', '이', '열'],
    answer: ['열이', '있습니다']
  },
  {
    type: 'build-it',
    speak: '아스피린을 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'آسپرین می‌خورم',
    words: ['먹습니다', '을', '아스피린'],
    answer: ['아스피린을', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '약을 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'دارو می‌خورم',
    words: ['먹습니다', '을', '약'],
    answer: ['약을', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '주사를 맞습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'آمپول می‌زنم',
    words: ['맞습니다', '를', '주사'],
    answer: ['주사를', '맞습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '기침이 납니다',
    question: 'ترجمه را بساز:',
    text: '기침이 납니다',
    words: ['سرفه', 'می‌کنم'],
    answer: ['سرفه', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '열이 있습니다',
    question: 'ترجمه را بساز:',
    text: '열이 있습니다',
    words: ['تب', 'دارم'],
    answer: ['تب', 'دارم']
  },
  {
    type: 'build-fa',
    speak: '아스피린을 먹습니다',
    question: 'ترجمه را بساز:',
    text: '아스피린을 먹습니다',
    words: ['آسپرین', 'می‌خورم'],
    answer: ['آسپرین', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '약을 먹습니다',
    question: 'ترجمه را بساز:',
    text: '약을 먹습니다',
    words: ['دارو', 'می‌خورم'],
    answer: ['دارو', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '주사를 맞습니다',
    question: 'ترجمه را بساز:',
    text: '주사를 맞습니다',
    words: ['آمپول', 'می‌زنم'],
    answer: ['آمپول', 'می‌زنم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 레슨이 끝났습니다! 🎉</h2>
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