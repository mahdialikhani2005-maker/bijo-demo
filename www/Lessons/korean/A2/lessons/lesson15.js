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

// ===== سوالات درس ۱۵ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "대사관" است؟',
    speak: '대사관',
    options: [
      { text: '대사관', image: '../../../media/a2/city/embassy.png' },
      { text: '법원', image: '../../../media/a2/city/court.png' },
      { text: '교도소', image: '../../../media/a2/city/jail.png' },
      { text: '공장', image: '../../../media/a2/city/factory.png' }
    ],
    answer: '대사관'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "법원" است؟',
    speak: '법원',
    options: [
      { text: '창고', image: '../../../media/a2/city/warehouse.png' },
      { text: '법원', image: '../../../media/a2/city/court.png' },
      { text: '대사관', image: '../../../media/a2/city/embassy.png' },
      { text: '교도소', image: '../../../media/a2/city/jail.png' }
    ],
    answer: '법원'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "교도소" است؟',
    speak: '교도소',
    options: [
      { text: '대사관', image: '../../../media/a2/city/embassy.png' },
      { text: '교도소', image: '../../../media/a2/city/jail.png' },
      { text: '공장', image: '../../../media/a2/city/factory.png' },
      { text: '법원', image: '../../../media/a2/city/court.png' }
    ],
    answer: '교도소'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "공장" است؟',
    speak: '공장',
    options: [
      { text: '법원', image: '../../../media/a2/city/court.png' },
      { text: '대사관', image: '../../../media/a2/city/embassy.png' },
      { text: '교도소', image: '../../../media/a2/city/jail.png' },
      { text: '공장', image: '../../../media/a2/city/factory.png' }
    ],
    answer: '공장'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "창고" است؟',
    speak: '창고',
    options: [
      { text: '창고', image: '../../../media/a2/city/warehouse.png' },
      { text: '공장', image: '../../../media/a2/city/factory.png' },
      { text: '대사관', image: '../../../media/a2/city/embassy.png' },
      { text: '법원', image: '../../../media/a2/city/court.png' }
    ],
    answer: '창고'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/embassy.png',
    options: ['대사관', '법원', '교도소', '공장'],
    answer: '대사관'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/court.png',
    options: ['대사관', '법원', '교도소', '창고'],
    answer: '법원'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/jail.png',
    options: ['창고', '대사관', '교도소', '법원'],
    answer: '교도소'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/factory.png',
    options: ['교도소', '법원', '공장', '대사관'],
    answer: '공장'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/warehouse.png',
    options: ['대사관', '공장', '법원', '창고'],
    answer: '창고'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '대사관',
    question: 'کدام کلمه را شنیدی؟',
    options: ['대사관', '법원', '교도소', '공장'],
    answer: '대사관'
  },
  {
    type: 'audio',
    speak: '법원',
    question: 'کدام کلمه را شنیدی؟',
    options: ['창고', '법원', '대사관', '교도소'],
    answer: '법원'
  },
  {
    type: 'audio',
    speak: '교도소',
    question: 'کدام کلمه را شنیدی؟',
    options: ['대사관', '교도소', '공장', '법원'],
    answer: '교도소'
  },
  {
    type: 'audio',
    speak: '공장',
    question: 'کدام کلمه را شنیدی؟',
    options: ['법원', '대사관', '교도소', '공장'],
    answer: '공장'
  },
  {
    type: 'audio',
    speak: '창고',
    question: 'کدام کلمه را شنیدی؟',
    options: ['창고', '공장', '대사관', '법원'],
    answer: '창고'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '대사관',
    image: '../../../media/a2/city/embassy.png',
    meaning: 'سفارت'
  },
  {
    type: 'speak',
    word: '법원',
    image: '../../../media/a2/city/court.png',
    meaning: 'دادگاه'
  },
  {
    type: 'speak',
    word: '교도소',
    image: '../../../media/a2/city/jail.png',
    meaning: 'زندان'
  },
  {
    type: 'speak',
    word: '공장',
    image: '../../../media/a2/city/factory.png',
    meaning: 'کارخانه'
  },
  {
    type: 'speak',
    word: '창고',
    image: '../../../media/a2/city/warehouse.png',
    meaning: 'انبار'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '대사관은 어디에 있습니까?',
    question: 'جمله کره‌ای را بساز:',
    text: 'سفارت کجاست؟',
    words: ['있습니까?', '에', '어디', '대사관은'],
    answer: ['대사관은', '어디에', '있습니까?']
  },
  {
    type: 'build-it',
    speak: '법원은 큽니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'دادگاه بزرگ است',
    words: ['큽니다', '은', '법원'],
    answer: ['법원은', '큽니다']
  },
  {
    type: 'build-it',
    speak: '교도소는 멉니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'زندان دور است',
    words: ['멉니다', '는', '교도소'],
    answer: ['교도소는', '멉니다']
  },
  {
    type: 'build-it',
    speak: '공장에서 일합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در کارخانه کار می‌کنم',
    words: ['일합니다', '에서', '공장'],
    answer: ['공장에서', '일합니다']
  },
  {
    type: 'build-it',
    speak: '창고에 물건이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در انبار کالا وجود دارد',
    words: ['있습니다', '이', '물건', '창고에'],
    answer: ['창고에', '물건이', '있습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '대사관은 어디에 있습니까?',
    question: 'ترجمه را بساز:',
    text: '대사관은 어디에 있습니까?',
    words: ['سفارت', 'کجاست؟'],
    answer: ['سفارت', 'کجاست؟']
  },
  {
    type: 'build-fa',
    speak: '법원은 큽니다',
    question: 'ترجمه را بساز:',
    text: '법원은 큽니다',
    words: ['دادگاه', 'بزرگ', 'است'],
    answer: ['دادگاه', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: '교도소는 멉니다',
    question: 'ترجمه را بساز:',
    text: '교도소는 멉니다',
    words: ['زندان', 'دور', 'است'],
    answer: ['زندان', 'دور', 'است']
  },
  {
    type: 'build-fa',
    speak: '공장에서 일합니다',
    question: 'ترجمه را بساز:',
    text: '공장에서 일합니다',
    words: ['در', 'کارخانه', 'کار', 'می‌کنم'],
    answer: ['در', 'کارخانه', 'کار', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '창고에 물건이 있습니다',
    question: 'ترجمه را بساز:',
    text: '창고에 물건이 있습니다',
    words: ['در', 'انبار', 'کالا', 'وجود دارد'],
    answer: ['در', 'انبار', 'کالا', 'وجود دارد']
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