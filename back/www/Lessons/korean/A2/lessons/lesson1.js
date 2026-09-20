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

// ===== سوالات درس ۱ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "삼촌" است؟',
    speak: '삼촌',
    options: [
      { text: '삼촌', image: '../../../media/a2/family/uncle.png' },
      { text: '고모/이모', image: '../../../media/a2/family/aunt.png' },
      { text: '사촌', image: '../../../media/a2/family/cousin.png' },
      { text: '조카 (남)', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: '삼촌'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "고모/이모" است؟',
    speak: '고모',
    options: [
      { text: '조카 (여)', image: '../../../media/a2/family/niece.png' },
      { text: '고모/이모', image: '../../../media/a2/family/aunt.png' },
      { text: '삼촌', image: '../../../media/a2/family/uncle.png' },
      { text: '사촌', image: '../../../media/a2/family/cousin.png' }
    ],
    answer: '고모/이모'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "사촌" است؟',
    speak: '사촌',
    options: [
      { text: '고모/이모', image: '../../../media/a2/family/aunt.png' },
      { text: '사촌', image: '../../../media/a2/family/cousin.png' },
      { text: '삼촌', image: '../../../media/a2/family/uncle.png' },
      { text: '조카 (남)', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: '사촌'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "조카 (남)" (برادرزاده) است؟',
    speak: '조카',
    options: [
      { text: '삼촌', image: '../../../media/a2/family/uncle.png' },
      { text: '고모/이모', image: '../../../media/a2/family/aunt.png' },
      { text: '사촌', image: '../../../media/a2/family/cousin.png' },
      { text: '조카 (남)', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: '조카 (남)'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "조카 (여)" (خواهرزاده) است؟',
    speak: '조카',
    options: [
      { text: '사촌', image: '../../../media/a2/family/cousin.png' },
      { text: '삼촌', image: '../../../media/a2/family/uncle.png' },
      { text: '조카 (여)', image: '../../../media/a2/family/niece.png' },
      { text: '고모/이모', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: '조카 (여)'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/uncle.png',
    options: ['삼촌', '고모/이모', '사촌', '조카 (남)'],
    answer: '삼촌'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/aunt.png',
    options: ['삼촌', '고모/이모', '사촌', '조카 (여)'],
    answer: '고모/이모'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/cousin.png',
    options: ['고모/이모', '사촌', '삼촌', '조카 (남)'],
    answer: '사촌'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/nephew.png',
    options: ['삼촌', '고모/이모', '사촌', '조카 (남)'],
    answer: '조카 (남)'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/niece.png',
    options: ['조카 (남)', '조카 (여)', '사촌', '삼촌'],
    answer: '조카 (여)'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '삼촌',
    question: 'کدام کلمه را شنیدی؟',
    options: ['삼촌', '고모/이모', '사촌', '조카 (남)'],
    answer: '삼촌'
  },
  {
    type: 'audio',
    speak: '고모',
    question: 'کدام کلمه را شنیدی؟',
    options: ['삼촌', '고모/이모', '사촌', '조카 (여)'],
    answer: '고모/이모'
  },
  {
    type: 'audio',
    speak: '사촌',
    question: 'کدام کلمه را شنیدی؟',
    options: ['고모/이모', '사촌', '삼촌', '조카 (남)'],
    answer: '사촌'
  },
  {
    type: 'audio',
    speak: '조카',
    question: 'کدام کلمه را شنیدی؟',
    options: ['삼촌', '고모/이모', '사촌', '조카 (남)'],
    answer: '조카 (남)'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '삼촌',
    image: '../../../media/a2/family/uncle.png',
    meaning: 'عمو/دایی'
  },
  {
    type: 'speak',
    word: '고모/이모',
    image: '../../../media/a2/family/aunt.png',
    meaning: 'عمه/خاله'
  },
  {
    type: 'speak',
    word: '사촌',
    image: '../../../media/a2/family/cousin.png',
    meaning: 'پسرعمو/پسرخاله'
  },
  {
    type: 'speak',
    word: '조카 (남)',
    image: '../../../media/a2/family/nephew.png',
    meaning: 'برادرزاده (پسر)'
  },
  {
    type: 'speak',
    word: '조카 (여)',
    image: '../../../media/a2/family/niece.png',
    meaning: 'خواهرزاده (دختر)'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '이분은 제 삼촌입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'این عموی من است',
    words: ['입니다', '삼촌', '제', '이분은'],
    answer: ['이분은', '제', '삼촌', '입니다']
  },
  {
    type: 'build-it',
    speak: '이분은 제 고모입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'این خاله من است',
    words: ['입니다', '고모', '제', '이분은'],
    answer: ['이분은', '제', '고모', '입니다']
  },
  {
    type: 'build-it',
    speak: '이분은 제 사촌입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'این پسرعموی من است',
    words: ['입니다', '사촌', '제', '이분은'],
    answer: ['이분은', '제', '사촌', '입니다']
  },
  {
    type: 'build-it',
    speak: '이분은 제 조카입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'این برادرزاده من است',
    words: ['입니다', '조카', '제', '이분은'],
    answer: ['이분은', '제', '조카', '입니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '이분은 제 삼촌입니다',
    question: 'ترجمه را بساز:',
    text: '이분은 제 삼촌입니다',
    words: ['این', 'عموی', 'من', 'است'],
    answer: ['این', 'عموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '이분은 제 고모입니다',
    question: 'ترجمه را بساز:',
    text: '이분은 제 고모입니다',
    words: ['این', 'خاله', 'من', 'است'],
    answer: ['این', 'خاله', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '이분은 제 사촌입니다',
    question: 'ترجمه را بساز:',
    text: '이분은 제 사촌입니다',
    words: ['این', 'پسرعموی', 'من', 'است'],
    answer: ['این', 'پسرعموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '이분은 제 조카입니다',
    question: 'ترجمه را بساز:',
    text: '이분은 제 조카입니다',
    words: ['این', 'برادرزاده', 'من', 'است'],
    answer: ['این', 'برادرزاده', 'من', 'است']
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