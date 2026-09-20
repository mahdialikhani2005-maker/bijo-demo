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

// ===== سوالات درس ۲۱ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "주스" است؟',
    speak: '주스',
    options: [
      { text: '주스', image: '../../../media/a2/food/juice.png' },
      { text: '커피', image: '../../../media/a2/food/coffee.png' },
      { text: '차', image: '../../../media/a2/food/tea.png' },
      { text: '수프', image: '../../../media/a2/food/soup.png' }
    ],
    answer: '주스'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "커피" است؟',
    speak: '커피',
    options: [
      { text: '케이크', image: '../../../media/a2/food/cake.png' },
      { text: '커피', image: '../../../media/a2/food/coffee.png' },
      { text: '주스', image: '../../../media/a2/food/juice.png' },
      { text: '차', image: '../../../media/a2/food/tea.png' }
    ],
    answer: '커피'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "차" است؟',
    speak: '차',
    options: [
      { text: '주스', image: '../../../media/a2/food/juice.png' },
      { text: '차', image: '../../../media/a2/food/tea.png' },
      { text: '수프', image: '../../../media/a2/food/soup.png' },
      { text: '커피', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: '차'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "수프" است؟',
    speak: '수프',
    options: [
      { text: '커피', image: '../../../media/a2/food/coffee.png' },
      { text: '주스', image: '../../../media/a2/food/juice.png' },
      { text: '차', image: '../../../media/a2/food/tea.png' },
      { text: '수프', image: '../../../media/a2/food/soup.png' }
    ],
    answer: '수프'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "케이크" است؟',
    speak: '케이크',
    options: [
      { text: '케이크', image: '../../../media/a2/food/cake.png' },
      { text: '수프', image: '../../../media/a2/food/soup.png' },
      { text: '주스', image: '../../../media/a2/food/juice.png' },
      { text: '커피', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: '케이크'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/juice.png',
    options: ['주스', '커피', '차', '수프'],
    answer: '주스'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/coffee.png',
    options: ['주스', '커피', '차', '케이크'],
    answer: '커피'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/tea.png',
    options: ['케이크', '주스', '차', '커피'],
    answer: '차'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/soup.png',
    options: ['차', '커피', '수프', '주스'],
    answer: '수프'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cake.png',
    options: ['주스', '수프', '커피', '케이크'],
    answer: '케이크'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '주스',
    question: 'کدام کلمه را شنیدی؟',
    options: ['주스', '커피', '차', '수프'],
    answer: '주스'
  },
  {
    type: 'audio',
    speak: '커피',
    question: 'کدام کلمه را شنیدی؟',
    options: ['케이크', '커피', '주스', '차'],
    answer: '커피'
  },
  {
    type: 'audio',
    speak: '차',
    question: 'کدام کلمه را شنیدی؟',
    options: ['주스', '차', '수프', '커피'],
    answer: '차'
  },
  {
    type: 'audio',
    speak: '수프',
    question: 'کدام کلمه را شنیدی؟',
    options: ['커피', '주스', '차', '수프'],
    answer: '수프'
  },
  {
    type: 'audio',
    speak: '케이크',
    question: 'کدام کلمه را شنیدی؟',
    options: ['케이크', '수프', '주스', '커피'],
    answer: '케이크'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '주스',
    image: '../../../media/a2/food/juice.png',
    meaning: 'آبمیوه'
  },
  {
    type: 'speak',
    word: '커피',
    image: '../../../media/a2/food/coffee.png',
    meaning: 'قهوه'
  },
  {
    type: 'speak',
    word: '차',
    image: '../../../media/a2/food/tea.png',
    meaning: 'چای'
  },
  {
    type: 'speak',
    word: '수프',
    image: '../../../media/a2/food/soup.png',
    meaning: 'سوپ'
  },
  {
    type: 'speak',
    word: '케이크',
    image: '../../../media/a2/food/cake.png',
    meaning: 'کیک'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '주스를 마십니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'آبمیوه می‌نوشم',
    words: ['마십니다', '을', '주스'],
    answer: ['주스를', '마십니다']
  },
  {
    type: 'build-it',
    speak: '커피를 마십니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'قهوه می‌نوشم',
    words: ['마십니다', '를', '커피'],
    answer: ['커피를', '마십니다']
  },
  {
    type: 'build-it',
    speak: '차를 마십니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'چای می‌نوشم',
    words: ['마십니다', '를', '차'],
    answer: ['차를', '마십니다']
  },
  {
    type: 'build-it',
    speak: '수프를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'سوپ می‌خورم',
    words: ['먹습니다', '를', '수프'],
    answer: ['수프를', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '케이크를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'کیک می‌خورم',
    words: ['먹습니다', '를', '케이크'],
    answer: ['케이크를', '먹습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '주스를 마십니다',
    question: 'ترجمه را بساز:',
    text: '주스를 마십니다',
    words: ['آبمیوه', 'می‌نوشم'],
    answer: ['آبمیوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: '커피를 마십니다',
    question: 'ترجمه را بساز:',
    text: '커피를 마십니다',
    words: ['قهوه', 'می‌نوشم'],
    answer: ['قهوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: '차를 마십니다',
    question: 'ترجمه را بساز:',
    text: '차를 마십니다',
    words: ['چای', 'می‌نوشم'],
    answer: ['چای', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: '수프를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '수프를 먹습니다',
    words: ['سوپ', 'می‌خورم'],
    answer: ['سوپ', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '케이크를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '케이크를 먹습니다',
    words: ['کیک', 'می‌خورم'],
    answer: ['کیک', 'می‌خورم']
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