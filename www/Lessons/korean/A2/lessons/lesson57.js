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

// ===== سوالات درس ۵۷ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "화면" است؟',
    speak: '화면',
    options: [
      { text: '화면', image: '../../../media/a2/technology/screen.png' },
      { text: '모니터', image: '../../../media/a2/technology/monitor.png' },
      { text: '프린터', image: '../../../media/a2/technology/printer.png' },
      { text: '스피커', image: '../../../media/a2/technology/speaker.png' }
    ],
    answer: '화면'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "모니터" است؟',
    speak: '모니터',
    options: [
      { text: '스캐너', image: '../../../media/a2/technology/scanner.png' },
      { text: '모니터', image: '../../../media/a2/technology/monitor.png' },
      { text: '화면', image: '../../../media/a2/technology/screen.png' },
      { text: '프린터', image: '../../../media/a2/technology/printer.png' }
    ],
    answer: '모니터'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "프린터" است؟',
    speak: '프린터',
    options: [
      { text: '화면', image: '../../../media/a2/technology/screen.png' },
      { text: '프린터', image: '../../../media/a2/technology/printer.png' },
      { text: '스피커', image: '../../../media/a2/technology/speaker.png' },
      { text: '모니터', image: '../../../media/a2/technology/monitor.png' }
    ],
    answer: '프린터'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "스캐너" است؟',
    speak: '스캐너',
    options: [
      { text: '모니터', image: '../../../media/a2/technology/monitor.png' },
      { text: '화면', image: '../../../media/a2/technology/screen.png' },
      { text: '프린터', image: '../../../media/a2/technology/printer.png' },
      { text: '스캐너', image: '../../../media/a2/technology/scanner.png' }
    ],
    answer: '스캐너'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "스피커" است؟',
    speak: '스피커',
    options: [
      { text: '스피커', image: '../../../media/a2/technology/speaker.png' },
      { text: '스캐너', image: '../../../media/a2/technology/scanner.png' },
      { text: '화면', image: '../../../media/a2/technology/screen.png' },
      { text: '모니터', image: '../../../media/a2/technology/monitor.png' }
    ],
    answer: '스피커'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/screen.png',
    options: ['화면', '모니터', '프린터', '스캐너'],
    answer: '화면'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/monitor.png',
    options: ['화면', '모니터', '프린터', '스피커'],
    answer: '모니터'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/printer.png',
    options: ['스피커', '화면', '프린터', '모니터'],
    answer: '프린터'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/scanner.png',
    options: ['프린터', '모니터', '스캐너', '화면'],
    answer: '스캐너'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/speaker.png',
    options: ['화면', '스캐너', '모니터', '스피커'],
    answer: '스피커'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '화면',
    question: 'کدام کلمه را شنیدی؟',
    options: ['화면', '모니터', '프린터', '스캐너'],
    answer: '화면'
  },
  {
    type: 'audio',
    speak: '모니터',
    question: 'کدام کلمه را شنیدی؟',
    options: ['스피커', '모니터', '화면', '프린터'],
    answer: '모니터'
  },
  {
    type: 'audio',
    speak: '프린터',
    question: 'کدام کلمه را شنیدی؟',
    options: ['화면', '프린터', '스캐너', '모니터'],
    answer: '프린터'
  },
  {
    type: 'audio',
    speak: '스캐너',
    question: 'کدام کلمه را شنیدی؟',
    options: ['모니터', '화면', '프린터', '스캐너'],
    answer: '스캐너'
  },
  {
    type: 'audio',
    speak: '스피커',
    question: 'کدام کلمه را شنیدی؟',
    options: ['스피커', '스캐너', '화면', '모니터'],
    answer: '스피커'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '화면',
    image: '../../../media/a2/technology/screen.png',
    meaning: 'صفحه نمایش'
  },
  {
    type: 'speak',
    word: '모니터',
    image: '../../../media/a2/technology/monitor.png',
    meaning: 'مانیتور'
  },
  {
    type: 'speak',
    word: '프린터',
    image: '../../../media/a2/technology/printer.png',
    meaning: 'چاپگر'
  },
  {
    type: 'speak',
    word: '스캐너',
    image: '../../../media/a2/technology/scanner.png',
    meaning: 'اسکنر'
  },
  {
    type: 'speak',
    word: '스피커',
    image: '../../../media/a2/technology/speaker.png',
    meaning: 'بلندگو'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '화면을 봅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'صفحه نمایش را می‌بینم',
    words: ['봅니다', '을', '화면'],
    answer: ['화면을', '봅니다']
  },
  {
    type: 'build-it',
    speak: '모니터가 큽니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'مانیتور بزرگ است',
    words: ['큽니다', '가', '모니터'],
    answer: ['모니터가', '큽니다']
  },
  {
    type: 'build-it',
    speak: '프린터로 출력합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با چاپگر پرینت می‌گیرم',
    words: ['출력합니다', '로', '프린터'],
    answer: ['프린터로', '출력합니다']
  },
  {
    type: 'build-it',
    speak: '스캐너로 스캔합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با اسکنر اسکن می‌کنم',
    words: ['스캔합니다', '로', '스캐너'],
    answer: ['스캐너로', '스캔합니다']
  },
  {
    type: 'build-it',
    speak: '스피커에서 소리가 납니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'از بلندگو صدا پخش می‌شود',
    words: ['납니다', '소리가', '에서', '스피커'],
    answer: ['스피커에서', '소리가', '납니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '화면을 봅니다',
    question: 'ترجمه را بساز:',
    text: '화면을 봅니다',
    words: ['صفحه نمایش', 'را', 'می‌بینم'],
    answer: ['صفحه نمایش', 'را', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: '모니터가 큽니다',
    question: 'ترجمه را بساز:',
    text: '모니터가 큽니다',
    words: ['مانیتور', 'بزرگ', 'است'],
    answer: ['مانیتور', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: '프린터로 출력합니다',
    question: 'ترجمه را بساز:',
    text: '프린터로 출력합니다',
    words: ['با', 'چاپگر', 'پرینت', 'می‌گیرم'],
    answer: ['با', 'چاپگر', 'پرینت', 'می‌گیرم']
  },
  {
    type: 'build-fa',
    speak: '스캐너로 스캔합니다',
    question: 'ترجمه را بساز:',
    text: '스캐너로 스캔합니다',
    words: ['با', 'اسکنر', 'اسکن', 'می‌کنم'],
    answer: ['با', 'اسکنر', 'اسکن', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '스피커에서 소리가 납니다',
    question: 'ترجمه را بساز:',
    text: '스피커에서 소리가 납니다',
    words: ['از', 'بلندگو', 'صدا', 'پخش', 'می‌شود'],
    answer: ['از', 'بلندگو', 'صدا', 'پخش', 'می‌شود']
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