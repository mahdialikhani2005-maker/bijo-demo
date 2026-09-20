let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
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
  recognition.lang = 'it-IT';
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

// ===== سوالات درس ۲۸ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "i jeans" است؟',
    speak: 'i jeans',
    options: [
      { text: 'i jeans', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'la giacca', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'il cappotto', image: '../../../media/a2/clothes/coat.png' },
      { text: 'il maglione', image: '../../../media/a2/clothes/sweater.png' }
    ],
    answer: 'i jeans'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la giacca" است؟',
    speak: 'la giacca',
    options: [
      { text: 'i jeans', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'la giacca', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'il gilet', image: '../../../media/a2/clothes/vest.png' },
      { text: 'il cappotto', image: '../../../media/a2/clothes/coat.png' }
    ],
    answer: 'la giacca'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il cappotto" است؟',
    speak: 'il cappotto',
    options: [
      { text: 'il gilet', image: '../../../media/a2/clothes/vest.png' },
      { text: 'i jeans', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'il cappotto', image: '../../../media/a2/clothes/coat.png' },
      { text: 'la giacca', image: '../../../media/a2/clothes/jacket.png' }
    ],
    answer: 'il cappotto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il gilet" است؟',
    speak: 'il gilet',
    options: [
      { text: 'il cappotto', image: '../../../media/a2/clothes/coat.png' },
      { text: 'il gilet', image: '../../../media/a2/clothes/vest.png' },
      { text: 'il maglione', image: '../../../media/a2/clothes/sweater.png' },
      { text: 'i jeans', image: '../../../media/a2/clothes/jeans.png' }
    ],
    answer: 'il gilet'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il maglione" است؟',
    speak: 'il maglione',
    options: [
      { text: 'i jeans', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'la giacca', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'il maglione', image: '../../../media/a2/clothes/sweater.png' },
      { text: 'il cappotto', image: '../../../media/a2/clothes/coat.png' }
    ],
    answer: 'il maglione'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/jeans.png',
    options: ['i jeans', 'la giacca', 'il cappotto', 'il maglione'],
    answer: 'i jeans'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/jacket.png',
    options: ['i jeans', 'la giacca', 'il gilet', 'il cappotto'],
    answer: 'la giacca'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/coat.png',
    options: ['il gilet', 'i jeans', 'il cappotto', 'la giacca'],
    answer: 'il cappotto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/vest.png',
    options: ['il cappotto', 'il gilet', 'il maglione', 'i jeans'],
    answer: 'il gilet'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/sweater.png',
    options: ['i jeans', 'la giacca', 'il maglione', 'il cappotto'],
    answer: 'il maglione'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'i jeans',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i jeans', 'la giacca', 'il cappotto', 'il maglione'],
    answer: 'i jeans'
  },
  {
    type: 'audio',
    speak: 'la giacca',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i jeans', 'la giacca', 'il gilet', 'il cappotto'],
    answer: 'la giacca'
  },
  {
    type: 'audio',
    speak: 'il cappotto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il gilet', 'i jeans', 'il cappotto', 'la giacca'],
    answer: 'il cappotto'
  },
  {
    type: 'audio',
    speak: 'il gilet',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cappotto', 'il gilet', 'il maglione', 'i jeans'],
    answer: 'il gilet'
  },
  {
    type: 'audio',
    speak: 'il maglione',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i jeans', 'la giacca', 'il maglione', 'il cappotto'],
    answer: 'il maglione'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'i jeans',
    image: '../../../media/a2/clothes/jeans.png',
    meaning: 'شلوار جین'
  },
  {
    type: 'speak',
    word: 'la giacca',
    image: '../../../media/a2/clothes/jacket.png',
    meaning: 'ژاکت'
  },
  {
    type: 'speak',
    word: 'il cappotto',
    image: '../../../media/a2/clothes/coat.png',
    meaning: 'کت'
  },
  {
    type: 'speak',
    word: 'il gilet',
    image: '../../../media/a2/clothes/vest.png',
    meaning: 'جلیقه'
  },
  {
    type: 'speak',
    word: 'il maglione',
    image: '../../../media/a2/clothes/sweater.png',
    meaning: 'پلیور'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Indosso i jeans',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من شلوار جین می‌پوشم',
    words: ['jeans', 'i', 'Indosso'],
    answer: ['Indosso', 'i', 'jeans']
  },
  {
    type: 'build-it',
    speak: 'Indosso una giacca',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک ژاکت می‌پوشم',
    words: ['giacca', 'una', 'Indosso'],
    answer: ['Indosso', 'una', 'giacca']
  },
  {
    type: 'build-it',
    speak: 'Indosso un cappotto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کت می‌پوشم',
    words: ['cappotto', 'un', 'Indosso'],
    answer: ['Indosso', 'un', 'cappotto']
  },
  {
    type: 'build-it',
    speak: 'Indosso un gilet',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک جلیقه می‌پوشم',
    words: ['gilet', 'un', 'Indosso'],
    answer: ['Indosso', 'un', 'gilet']
  },
  {
    type: 'build-it',
    speak: 'Indosso un maglione',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک پلیور می‌پوشم',
    words: ['maglione', 'un', 'Indosso'],
    answer: ['Indosso', 'un', 'maglione']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Indosso i jeans',
    question: 'ترجمه را بساز:',
    text: 'Indosso i jeans',
    words: ['می‌پوشم', 'جین', 'شلوار', 'من'],
    answer: ['من', 'شلوار', 'جین', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso una giacca',
    question: 'ترجمه را بساز:',
    text: 'Indosso una giacca',
    words: ['می‌پوشم', 'ژاکت', 'یک', 'من'],
    answer: ['من', 'یک', 'ژاکت', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso un cappotto',
    question: 'ترجمه را بساز:',
    text: 'Indosso un cappotto',
    words: ['می‌پوشم', 'کت', 'یک', 'من'],
    answer: ['من', 'یک', 'کت', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso un gilet',
    question: 'ترجمه را بساز:',
    text: 'Indosso un gilet',
    words: ['می‌پوشم', 'جلیقه', 'یک', 'من'],
    answer: ['من', 'یک', 'جلیقه', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso un maglione',
    question: 'ترجمه را بساز:',
    text: 'Indosso un maglione',
    words: ['می‌پوشم', 'پلیور', 'یک', 'من'],
    answer: ['من', 'یک', 'پلیور', 'می‌پوشم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 درس تمام شد! 🎉</h2>
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