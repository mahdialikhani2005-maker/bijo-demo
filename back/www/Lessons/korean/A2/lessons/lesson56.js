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

// ===== سوالات درس ۵۶ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "컴퓨터" است؟',
    speak: '컴퓨터',
    options: [
      { text: '컴퓨터', image: '../../../media/a2/technology/computer.png' },
      { text: '키보드', image: '../../../media/a2/technology/keyboard.png' },
      { text: '마우스', image: '../../../media/a2/technology/mouse.png' },
      { text: '인터넷', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: '컴퓨터'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "키보드" است؟',
    speak: '키보드',
    options: [
      { text: '이메일', image: '../../../media/a2/technology/email.png' },
      { text: '키보드', image: '../../../media/a2/technology/keyboard.png' },
      { text: '컴퓨터', image: '../../../media/a2/technology/computer.png' },
      { text: '마우스', image: '../../../media/a2/technology/mouse.png' }
    ],
    answer: '키보드'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "마우스" است؟',
    speak: '마우스',
    options: [
      { text: '컴퓨터', image: '../../../media/a2/technology/computer.png' },
      { text: '마우스', image: '../../../media/a2/technology/mouse.png' },
      { text: '인터넷', image: '../../../media/a2/technology/internet.png' },
      { text: '키보드', image: '../../../media/a2/technology/keyboard.png' }
    ],
    answer: '마우스'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "인터넷" است؟',
    speak: '인터넷',
    options: [
      { text: '키보드', image: '../../../media/a2/technology/keyboard.png' },
      { text: '컴퓨터', image: '../../../media/a2/technology/computer.png' },
      { text: '마우스', image: '../../../media/a2/technology/mouse.png' },
      { text: '인터넷', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: '인터넷'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "이메일" است؟',
    speak: '이메일',
    options: [
      { text: '이메일', image: '../../../media/a2/technology/email.png' },
      { text: '인터넷', image: '../../../media/a2/technology/internet.png' },
      { text: '컴퓨터', image: '../../../media/a2/technology/computer.png' },
      { text: '키보드', image: '../../../media/a2/technology/keyboard.png' }
    ],
    answer: '이메일'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/computer.png',
    options: ['컴퓨터', '키보드', '마우스', '인터넷'],
    answer: '컴퓨터'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/keyboard.png',
    options: ['컴퓨터', '키보드', '마우스', '이메일'],
    answer: '키보드'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/mouse.png',
    options: ['이메일', '컴퓨터', '마우스', '키보드'],
    answer: '마우스'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/internet.png',
    options: ['마우스', '키보드', '인터넷', '컴퓨터'],
    answer: '인터넷'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/email.png',
    options: ['컴퓨터', '인터넷', '키보드', '이메일'],
    answer: '이메일'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '컴퓨터',
    question: 'کدام کلمه را شنیدی؟',
    options: ['컴퓨터', '키보드', '마우스', '인터넷'],
    answer: '컴퓨터'
  },
  {
    type: 'audio',
    speak: '키보드',
    question: 'کدام کلمه را شنیدی؟',
    options: ['이메일', '키보드', '컴퓨터', '마우스'],
    answer: '키보드'
  },
  {
    type: 'audio',
    speak: '마우스',
    question: 'کدام کلمه را شنیدی؟',
    options: ['컴퓨터', '마우스', '인터넷', '키보드'],
    answer: '마우스'
  },
  {
    type: 'audio',
    speak: '인터넷',
    question: 'کدام کلمه را شنیدی؟',
    options: ['키보드', '컴퓨터', '마우스', '인터넷'],
    answer: '인터넷'
  },
  {
    type: 'audio',
    speak: '이메일',
    question: 'کدام کلمه را شنیدی؟',
    options: ['이메일', '인터넷', '컴퓨터', '키보드'],
    answer: '이메일'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '컴퓨터',
    image: '../../../media/a2/technology/computer.png',
    meaning: 'کامپیوتر'
  },
  {
    type: 'speak',
    word: '키보드',
    image: '../../../media/a2/technology/keyboard.png',
    meaning: 'صفحه کلید'
  },
  {
    type: 'speak',
    word: '마우스',
    image: '../../../media/a2/technology/mouse.png',
    meaning: 'موشواره'
  },
  {
    type: 'speak',
    word: '인터넷',
    image: '../../../media/a2/technology/internet.png',
    meaning: 'اینترنت'
  },
  {
    type: 'speak',
    word: '이메일',
    image: '../../../media/a2/technology/email.png',
    meaning: 'ایمیل'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '컴퓨터를 사용합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'کامپیوتر استفاده می‌کنم',
    words: ['사용합니다', '를', '컴퓨터'],
    answer: ['컴퓨터를', '사용합니다']
  },
  {
    type: 'build-it',
    speak: '키보드로 칩니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با صفحه کلید تایپ می‌کنم',
    words: ['칩니다', '로', '키보드'],
    answer: ['키보드로', '칩니다']
  },
  {
    type: 'build-it',
    speak: '마우스를 움직입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ماوس را حرکت می‌دهم',
    words: ['움직입니다', '을', '마우스'],
    answer: ['마우스를', '움직입니다']
  },
  {
    type: 'build-it',
    speak: '인터넷을 검색합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'اینترنت جستجو می‌کنم',
    words: ['검색합니다', '을', '인터넷'],
    answer: ['인터넷을', '검색합니다']
  },
  {
    type: 'build-it',
    speak: '이메일을 보냅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ایمیل می‌فرستم',
    words: ['보냅니다', '을', '이메일'],
    answer: ['이메일을', '보냅니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '컴퓨터를 사용합니다',
    question: 'ترجمه را بساز:',
    text: '컴퓨터를 사용합니다',
    words: ['کامپیوتر', 'استفاده', 'می‌کنم'],
    answer: ['کامپیوتر', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '키보드로 칩니다',
    question: 'ترجمه را بساز:',
    text: '키보드로 칩니다',
    words: ['با', 'صفحه کلید', 'تایپ', 'می‌کنم'],
    answer: ['با', 'صفحه کلید', 'تایپ', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '마우스를 움직입니다',
    question: 'ترجمه را بساز:',
    text: '마우스를 움직입니다',
    words: ['ماوس', 'را', 'حرکت', 'می‌دهم'],
    answer: ['ماوس', 'را', 'حرکت', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: '인터넷을 검색합니다',
    question: 'ترجمه را بساز:',
    text: '인터넷을 검색합니다',
    words: ['اینترنت', 'جستجو', 'می‌کنم'],
    answer: ['اینترنت', 'جستجو', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '이메일을 보냅니다',
    question: 'ترجمه را بساز:',
    text: '이메일을 보냅니다',
    words: ['ایمیل', 'می‌فرستم'],
    answer: ['ایمیل', 'می‌فرستم']
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