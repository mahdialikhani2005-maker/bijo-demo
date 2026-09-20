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

// ===== سوالات درس ۱۰ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "난로" است؟',
    speak: '난로',
    options: [
      { text: '난로', image: '../../../media/a2/house/heater.png' },
      { text: '선풍기', image: '../../../media/a2/house/fan.png' },
      { text: '다리미', image: '../../../media/a2/house/iron.png' },
      { text: '청소기', image: '../../../media/a2/house/vacuum.png' }
    ],
    answer: '난로'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "선풍기" است؟',
    speak: '선풍기',
    options: [
      { text: '빗자루', image: '../../../media/a2/house/broom.png' },
      { text: '선풍기', image: '../../../media/a2/house/fan.png' },
      { text: '난로', image: '../../../media/a2/house/heater.png' },
      { text: '다리미', image: '../../../media/a2/house/iron.png' }
    ],
    answer: '선풍기'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "다리미" است؟',
    speak: '다리미',
    options: [
      { text: '난로', image: '../../../media/a2/house/heater.png' },
      { text: '다리미', image: '../../../media/a2/house/iron.png' },
      { text: '청소기', image: '../../../media/a2/house/vacuum.png' },
      { text: '선풍기', image: '../../../media/a2/house/fan.png' }
    ],
    answer: '다리미'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "청소기" است؟',
    speak: '청소기',
    options: [
      { text: '선풍기', image: '../../../media/a2/house/fan.png' },
      { text: '난로', image: '../../../media/a2/house/heater.png' },
      { text: '다리미', image: '../../../media/a2/house/iron.png' },
      { text: '청소기', image: '../../../media/a2/house/vacuum.png' }
    ],
    answer: '청소기'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "빗자루" است؟',
    speak: '빗자루',
    options: [
      { text: '빗자루', image: '../../../media/a2/house/broom.png' },
      { text: '청소기', image: '../../../media/a2/house/vacuum.png' },
      { text: '난로', image: '../../../media/a2/house/heater.png' },
      { text: '선풍기', image: '../../../media/a2/house/fan.png' }
    ],
    answer: '빗자루'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/heater.png',
    options: ['난로', '선풍기', '다리미', '청소기'],
    answer: '난로'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/fan.png',
    options: ['난로', '선풍기', '다리미', '빗자루'],
    answer: '선풍기'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/iron.png',
    options: ['빗자루', '난로', '다리미', '선풍기'],
    answer: '다리미'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/vacuum.png',
    options: ['다리미', '선풍기', '청소기', '난로'],
    answer: '청소기'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/broom.png',
    options: ['난로', '청소기', '선풍기', '빗자루'],
    answer: '빗자루'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '난로',
    question: 'کدام کلمه را شنیدی؟',
    options: ['난로', '선풍기', '다리미', '청소기'],
    answer: '난로'
  },
  {
    type: 'audio',
    speak: '선풍기',
    question: 'کدام کلمه را شنیدی؟',
    options: ['빗자루', '선풍기', '난로', '다리미'],
    answer: '선풍기'
  },
  {
    type: 'audio',
    speak: '다리미',
    question: 'کدام کلمه را شنیدی؟',
    options: ['난로', '다리미', '청소기', '선풍기'],
    answer: '다리미'
  },
  {
    type: 'audio',
    speak: '청소기',
    question: 'کدام کلمه را شنیدی؟',
    options: ['선풍기', '난로', '다리미', '청소기'],
    answer: '청소기'
  },
  {
    type: 'audio',
    speak: '빗자루',
    question: 'کدام کلمه را شنیدی؟',
    options: ['빗자루', '청소기', '난로', '선풍기'],
    answer: '빗자루'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '난로',
    image: '../../../media/a2/house/heater.png',
    meaning: 'بخاری'
  },
  {
    type: 'speak',
    word: '선풍기',
    image: '../../../media/a2/house/fan.png',
    meaning: 'پنکه'
  },
  {
    type: 'speak',
    word: '다리미',
    image: '../../../media/a2/house/iron.png',
    meaning: 'اتو'
  },
  {
    type: 'speak',
    word: '청소기',
    image: '../../../media/a2/house/vacuum.png',
    meaning: 'جاروبرقی'
  },
  {
    type: 'speak',
    word: '빗자루',
    image: '../../../media/a2/house/broom.png',
    meaning: 'جارو'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '겨울에 난로를 사용합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در زمستان بخاری استفاده می‌کنم',
    words: ['사용합니다', '을', '난로', '겨울에'],
    answer: ['겨울에', '난로를', '사용합니다']
  },
  {
    type: 'build-it',
    speak: '여름에 선풍기를 사용합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در تابستان پنکه استفاده می‌کنم',
    words: ['사용합니다', '을', '선풍기', '여름에'],
    answer: ['여름에', '선풍기를', '사용합니다']
  },
  {
    type: 'build-it',
    speak: '셔츠를 다리미로 다립니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پیراهن را با اتو اتو می‌کنم',
    words: ['다립니다', '로', '다리미', '셔츠를'],
    answer: ['셔츠를', '다리미로', '다립니다']
  },
  {
    type: 'build-it',
    speak: '청소기로 청소합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با جاروبرقی تمیز می‌کنم',
    words: ['청소합니다', '로', '청소기'],
    answer: ['청소기로', '청소합니다']
  },
  {
    type: 'build-it',
    speak: '빗자루로 청소합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با جارو تمیز می‌کنم',
    words: ['청소합니다', '로', '빗자루'],
    answer: ['빗자루로', '청소합니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '겨울에 난로를 사용합니다',
    question: 'ترجمه را بساز:',
    text: '겨울에 난로를 사용합니다',
    words: ['در', 'زمستان', 'بخاری', 'استفاده', 'می‌کنم'],
    answer: ['در', 'زمستان', 'بخاری', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '여름에 선풍기를 사용합니다',
    question: 'ترجمه را بساز:',
    text: '여름에 선풍기를 사용합니다',
    words: ['در', 'تابستان', 'پنکه', 'استفاده', 'می‌کنم'],
    answer: ['در', 'تابستان', 'پنکه', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '셔츠를 다리미로 다립니다',
    question: 'ترجمه را بساز:',
    text: '셔츠를 다리미로 다립니다',
    words: ['پیراهن', 'را', 'با', 'اتو', 'اتو', 'می‌کنم'],
    answer: ['پیراهن', 'را', 'با', 'اتو', 'اتو', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '청소기로 청소합니다',
    question: 'ترجمه را بساز:',
    text: '청소기로 청소합니다',
    words: ['با', 'جاروبرقی', 'تمیز', 'می‌کنم'],
    answer: ['با', 'جاروبرقی', 'تمیز', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '빗자루로 청소합니다',
    question: 'ترجمه را بساز:',
    text: '빗자루로 청소합니다',
    words: ['با', 'جارو', 'تمیز', 'می‌کنم'],
    answer: ['با', 'جارو', 'تمیز', 'می‌کنم']
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