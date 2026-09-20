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

// ===== سوالات درس ۵۱ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "여권" است؟',
    speak: '여권',
    options: [
      { text: '여권', image: '../../../media/a2/travel/passport.png' },
      { text: '호텔', image: '../../../media/a2/travel/hotel.png' },
      { text: '짐', image: '../../../media/a2/travel/luggage.png' },
      { text: '비행기표', image: '../../../media/a2/travel/flight.png' }
    ],
    answer: '여권'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "호텔" است؟',
    speak: '호텔',
    options: [
      { text: '지도', image: '../../../media/a2/travel/map.png' },
      { text: '호텔', image: '../../../media/a2/travel/hotel.png' },
      { text: '여권', image: '../../../media/a2/travel/passport.png' },
      { text: '짐', image: '../../../media/a2/travel/luggage.png' }
    ],
    answer: '호텔'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "짐" است؟',
    speak: '짐',
    options: [
      { text: '여권', image: '../../../media/a2/travel/passport.png' },
      { text: '짐', image: '../../../media/a2/travel/luggage.png' },
      { text: '비행기표', image: '../../../media/a2/travel/flight.png' },
      { text: '호텔', image: '../../../media/a2/travel/hotel.png' }
    ],
    answer: '짐'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "비행기표" است؟',
    speak: '비행기표',
    options: [
      { text: '호텔', image: '../../../media/a2/travel/hotel.png' },
      { text: '여권', image: '../../../media/a2/travel/passport.png' },
      { text: '짐', image: '../../../media/a2/travel/luggage.png' },
      { text: '비행기표', image: '../../../media/a2/travel/flight.png' }
    ],
    answer: '비행기표'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "지도" است؟',
    speak: '지도',
    options: [
      { text: '지도', image: '../../../media/a2/travel/map.png' },
      { text: '비행기표', image: '../../../media/a2/travel/flight.png' },
      { text: '여권', image: '../../../media/a2/travel/passport.png' },
      { text: '호텔', image: '../../../media/a2/travel/hotel.png' }
    ],
    answer: '지도'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/passport.png',
    options: ['여권', '호텔', '짐', '비행기표'],
    answer: '여권'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/hotel.png',
    options: ['여권', '호텔', '짐', '지도'],
    answer: '호텔'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/luggage.png',
    options: ['지도', '여권', '짐', '호텔'],
    answer: '짐'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/flight.png',
    options: ['짐', '호텔', '비행기표', '여권'],
    answer: '비행기표'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/map.png',
    options: ['여권', '비행기표', '호텔', '지도'],
    answer: '지도'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '여권',
    question: 'کدام کلمه را شنیدی؟',
    options: ['여권', '호텔', '짐', '비행기표'],
    answer: '여권'
  },
  {
    type: 'audio',
    speak: '호텔',
    question: 'کدام کلمه را شنیدی؟',
    options: ['지도', '호텔', '여권', '짐'],
    answer: '호텔'
  },
  {
    type: 'audio',
    speak: '짐',
    question: 'کدام کلمه را شنیدی؟',
    options: ['여권', '짐', '비행기표', '호텔'],
    answer: '짐'
  },
  {
    type: 'audio',
    speak: '비행기표',
    question: 'کدام کلمه را شنیدی؟',
    options: ['호텔', '여권', '짐', '비행기표'],
    answer: '비행기표'
  },
  {
    type: 'audio',
    speak: '지도',
    question: 'کدام کلمه را شنیدی؟',
    options: ['지도', '비행기표', '여권', '호텔'],
    answer: '지도'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '여권',
    image: '../../../media/a2/travel/passport.png',
    meaning: 'گذرنامه'
  },
  {
    type: 'speak',
    word: '호텔',
    image: '../../../media/a2/travel/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: '짐',
    image: '../../../media/a2/travel/luggage.png',
    meaning: 'چمدان'
  },
  {
    type: 'speak',
    word: '비행기표',
    image: '../../../media/a2/travel/flight.png',
    meaning: 'پرواز'
  },
  {
    type: 'speak',
    word: '지도',
    image: '../../../media/a2/travel/map.png',
    meaning: 'نقشه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '여권을 잃어버렸습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'گذرنامه را گم کردم',
    words: ['잃어버렸습니다', '을', '여권'],
    answer: ['여권을', '잃어버렸습니다']
  },
  {
    type: 'build-it',
    speak: '호텔에 묵습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در هتل اقامت می‌کنم',
    words: ['묵습니다', '에', '호텔'],
    answer: ['호텔에', '묵습니다']
  },
  {
    type: 'build-it',
    speak: '짐을 쌉니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'چمدان می‌بندم',
    words: ['쌉니다', '을', '짐'],
    answer: ['짐을', '쌉니다']
  },
  {
    type: 'build-it',
    speak: '비행기표를 예약합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پرواز رزرو می‌کنم',
    words: ['예약합니다', '를', '비행기표'],
    answer: ['비행기표를', '예약합니다']
  },
  {
    type: 'build-it',
    speak: '지도를 봅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'نقشه را می‌بینم',
    words: ['봅니다', '를', '지도'],
    answer: ['지도를', '봅니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '여권을 잃어버렸습니다',
    question: 'ترجمه را بساز:',
    text: '여권을 잃어버렸습니다',
    words: ['گذرنامه', 'را', 'گم', 'کردم'],
    answer: ['گذرنامه', 'را', 'گم', 'کردم']
  },
  {
    type: 'build-fa',
    speak: '호텔에 묵습니다',
    question: 'ترجمه را بساز:',
    text: '호텔에 묵습니다',
    words: ['در', 'هتل', 'اقامت', 'می‌کنم'],
    answer: ['در', 'هتل', 'اقامت', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '짐을 쌉니다',
    question: 'ترجمه را بساز:',
    text: '짐을 쌉니다',
    words: ['چمدان', 'می‌بندم'],
    answer: ['چمدان', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: '비행기표를 예약합니다',
    question: 'ترجمه را بساز:',
    text: '비행기표를 예약합니다',
    words: ['پرواز', 'رزرو', 'می‌کنم'],
    answer: ['پرواز', 'رزرو', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '지도를 봅니다',
    question: 'ترجمه را بساز:',
    text: '지도를 봅니다',
    words: ['نقشه', 'را', 'می‌بینم'],
    answer: ['نقشه', 'را', 'می‌بینم']
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