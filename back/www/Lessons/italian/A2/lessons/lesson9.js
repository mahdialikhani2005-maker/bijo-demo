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

// ===== سوالات درس ۹ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il bollitore" است؟',
    speak: 'il bollitore',
    options: [
      { text: 'il bollitore', image: '../../../media/a2/house/kettle.png' },
      { text: 'il tostapane', image: '../../../media/a2/house/toaster.png' },
      { text: 'il frullatore', image: '../../../media/a2/house/blender.png' },
      { text: 'la lavastoviglie', image: '../../../media/a2/house/dishwasher.png' }
    ],
    answer: 'il bollitore'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il tostapane" است؟',
    speak: 'il tostapane',
    options: [
      { text: 'il bollitore', image: '../../../media/a2/house/kettle.png' },
      { text: 'il tostapane', image: '../../../media/a2/house/toaster.png' },
      { text: 'il microonde', image: '../../../media/a2/house/microwave.png' },
      { text: 'il frullatore', image: '../../../media/a2/house/blender.png' }
    ],
    answer: 'il tostapane'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il frullatore" است؟',
    speak: 'il frullatore',
    options: [
      { text: 'la lavastoviglie', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'il bollitore', image: '../../../media/a2/house/kettle.png' },
      { text: 'il frullatore', image: '../../../media/a2/house/blender.png' },
      { text: 'il tostapane', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: 'il frullatore'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il microonde" است؟',
    speak: 'il microonde',
    options: [
      { text: 'il tostapane', image: '../../../media/a2/house/toaster.png' },
      { text: 'il microonde', image: '../../../media/a2/house/microwave.png' },
      { text: 'la lavastoviglie', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'il bollitore', image: '../../../media/a2/house/kettle.png' }
    ],
    answer: 'il microonde'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la lavastoviglie" است؟',
    speak: 'la lavastoviglie',
    options: [
      { text: 'il bollitore', image: '../../../media/a2/house/kettle.png' },
      { text: 'il frullatore', image: '../../../media/a2/house/blender.png' },
      { text: 'la lavastoviglie', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'il microonde', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: 'la lavastoviglie'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/kettle.png',
    options: ['il bollitore', 'il tostapane', 'il frullatore', 'la lavastoviglie'],
    answer: 'il bollitore'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/toaster.png',
    options: ['il bollitore', 'il tostapane', 'il microonde', 'il frullatore'],
    answer: 'il tostapane'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blender.png',
    options: ['la lavastoviglie', 'il bollitore', 'il frullatore', 'il tostapane'],
    answer: 'il frullatore'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/microwave.png',
    options: ['il tostapane', 'il microonde', 'la lavastoviglie', 'il bollitore'],
    answer: 'il microonde'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/dishwasher.png',
    options: ['il bollitore', 'il frullatore', 'la lavastoviglie', 'il microonde'],
    answer: 'la lavastoviglie'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il bollitore',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il bollitore', 'il tostapane', 'il frullatore', 'la lavastoviglie'],
    answer: 'il bollitore'
  },
  {
    type: 'audio',
    speak: 'il tostapane',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il bollitore', 'il tostapane', 'il microonde', 'il frullatore'],
    answer: 'il tostapane'
  },
  {
    type: 'audio',
    speak: 'il frullatore',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la lavastoviglie', 'il bollitore', 'il frullatore', 'il tostapane'],
    answer: 'il frullatore'
  },
  {
    type: 'audio',
    speak: 'il microonde',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il tostapane', 'il microonde', 'la lavastoviglie', 'il bollitore'],
    answer: 'il microonde'
  },
  {
    type: 'audio',
    speak: 'la lavastoviglie',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il bollitore', 'il frullatore', 'la lavastoviglie', 'il microonde'],
    answer: 'la lavastoviglie'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il bollitore',
    image: '../../../media/a2/house/kettle.png',
    meaning: 'کتری'
  },
  {
    type: 'speak',
    word: 'il tostapane',
    image: '../../../media/a2/house/toaster.png',
    meaning: 'توستر'
  },
  {
    type: 'speak',
    word: 'il frullatore',
    image: '../../../media/a2/house/blender.png',
    meaning: 'مخلوط‌کن'
  },
  {
    type: 'speak',
    word: 'il microonde',
    image: '../../../media/a2/house/microwave.png',
    meaning: 'مایکروویو'
  },
  {
    type: 'speak',
    word: 'la lavastoviglie',
    image: '../../../media/a2/house/dishwasher.png',
    meaning: 'ماشین ظرفشویی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Questo è il mio bollitore',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این کتری من است',
    words: ['bollitore', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'bollitore']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio tostapane',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این توستر من است',
    words: ['tostapane', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'tostapane']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio frullatore',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این مخلوط‌کن من است',
    words: ['frullatore', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'frullatore']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio microonde',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این مایکروویو من است',
    words: ['microonde', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'microonde']
  },
  {
    type: 'build-it',
    speak: 'Questa è la mia lavastoviglie',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این ماشین ظرفشویی من است',
    words: ['lavastoviglie', 'mia', 'la', 'è', 'Questa'],
    answer: ['Questa', 'è', 'la', 'mia', 'lavastoviglie']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Questo è il mio bollitore',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio bollitore',
    words: ['است', 'کتری', 'من', 'این'],
    answer: ['این', 'کتری', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio tostapane',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio tostapane',
    words: ['است', 'توستر', 'من', 'این'],
    answer: ['این', 'توستر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio frullatore',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio frullatore',
    words: ['است', 'مخلوط‌کن', 'من', 'این'],
    answer: ['این', 'مخلوط‌کن', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio microonde',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio microonde',
    words: ['است', 'مایکروویو', 'من', 'این'],
    answer: ['این', 'مایکروویو', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questa è la mia lavastoviglie',
    question: 'ترجمه را بساز:',
    text: 'Questa è la mia lavastoviglie',
    words: ['است', 'ماشین ظرفشویی', 'من', 'این'],
    answer: ['این', 'ماشین ظرفشویی', 'من', 'است']
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