let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
  recognition.lang = 'es-ES';
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

// ===== سوالات درس ۹ - اسپانیایی به فارسی (لوازم آشپزخانه) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la tetera" است؟',
    speak: 'la tetera',
    options: [
      { text: 'la tetera', image: '../../../media/a2/house/kettle.png' },
      { text: 'la tostadora', image: '../../../media/a2/house/toaster.png' },
      { text: 'la batidora', image: '../../../media/a2/house/blender.png' },
      { text: 'el microondas', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: 'la tetera'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la tostadora" است؟',
    speak: 'la tostadora',
    options: [
      { text: 'la tetera', image: '../../../media/a2/house/kettle.png' },
      { text: 'la tostadora', image: '../../../media/a2/house/toaster.png' },
      { text: 'el lavavajillas', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'la batidora', image: '../../../media/a2/house/blender.png' }
    ],
    answer: 'la tostadora'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la batidora" است؟',
    speak: 'la batidora',
    options: [
      { text: 'el microondas', image: '../../../media/a2/house/microwave.png' },
      { text: 'la tetera', image: '../../../media/a2/house/kettle.png' },
      { text: 'la batidora', image: '../../../media/a2/house/blender.png' },
      { text: 'la tostadora', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: 'la batidora'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el microondas" است؟',
    speak: 'el microondas',
    options: [
      { text: 'la tetera', image: '../../../media/a2/house/kettle.png' },
      { text: 'el microondas', image: '../../../media/a2/house/microwave.png' },
      { text: 'la tostadora', image: '../../../media/a2/house/toaster.png' },
      { text: 'el lavavajillas', image: '../../../media/a2/house/dishwasher.png' }
    ],
    answer: 'el microondas'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el lavavajillas" است؟',
    speak: 'el lavavajillas',
    options: [
      { text: 'la batidora', image: '../../../media/a2/house/blender.png' },
      { text: 'el microondas', image: '../../../media/a2/house/microwave.png' },
      { text: 'el lavavajillas', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'la tetera', image: '../../../media/a2/house/kettle.png' }
    ],
    answer: 'el lavavajillas'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/kettle.png',
    options: ['la tetera', 'la tostadora', 'la batidora', 'el microondas'],
    answer: 'la tetera'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/toaster.png',
    options: ['la tetera', 'la tostadora', 'el lavavajillas', 'la batidora'],
    answer: 'la tostadora'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blender.png',
    options: ['el microondas', 'la tetera', 'la batidora', 'la tostadora'],
    answer: 'la batidora'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/microwave.png',
    options: ['la tetera', 'el microondas', 'la tostadora', 'el lavavajillas'],
    answer: 'el microondas'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/dishwasher.png',
    options: ['la batidora', 'el microondas', 'el lavavajillas', 'la tetera'],
    answer: 'el lavavajillas'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la tetera',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tetera', 'la tostadora', 'la batidora', 'el microondas'],
    answer: 'la tetera'
  },
  {
    type: 'audio',
    speak: 'la tostadora',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tetera', 'la tostadora', 'el lavavajillas', 'la batidora'],
    answer: 'la tostadora'
  },
  {
    type: 'audio',
    speak: 'la batidora',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el microondas', 'la tetera', 'la batidora', 'la tostadora'],
    answer: 'la batidora'
  },
  {
    type: 'audio',
    speak: 'el microondas',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tetera', 'el microondas', 'la tostadora', 'el lavavajillas'],
    answer: 'el microondas'
  },
  {
    type: 'audio',
    speak: 'el lavavajillas',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la batidora', 'el microondas', 'el lavavajillas', 'la tetera'],
    answer: 'el lavavajillas'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la tetera',
    image: '../../../media/a2/house/kettle.png',
    meaning: 'کتری'
  },
  {
    type: 'speak',
    word: 'la tostadora',
    image: '../../../media/a2/house/toaster.png',
    meaning: 'توستر'
  },
  {
    type: 'speak',
    word: 'la batidora',
    image: '../../../media/a2/house/blender.png',
    meaning: 'مخلوط‌کن'
  },
  {
    type: 'speak',
    word: 'el microondas',
    image: '../../../media/a2/house/microwave.png',
    meaning: 'مایکروویو'
  },
  {
    type: 'speak',
    word: 'el lavavajillas',
    image: '../../../media/a2/house/dishwasher.png',
    meaning: 'ماشین ظرفشویی'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es una tetera',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کتری است',
    words: ['tetera', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'tetera']
  },
  {
    type: 'build-es',
    speak: 'Esto es una tostadora',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک توستر است',
    words: ['tostadora', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'tostadora']
  },
  {
    type: 'build-es',
    speak: 'Esto es una batidora',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک مخلوط‌کن است',
    words: ['batidora', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'batidora']
  },
  {
    type: 'build-es',
    speak: 'Esto es un microondas',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک مایکروویو است',
    words: ['microondas', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'microondas']
  },
  {
    type: 'build-es',
    speak: 'Esto es un lavavajillas',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ماشین ظرفشویی است',
    words: ['lavavajillas', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'lavavajillas']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es una tetera',
    question: 'ترجمه را بساز:',
    text: 'Esto es una tetera',
    words: ['است', 'کتری', 'یک', 'این'],
    answer: ['این', 'یک', 'کتری', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una tostadora',
    question: 'ترجمه را بساز:',
    text: 'Esto es una tostadora',
    words: ['است', 'توستر', 'یک', 'این'],
    answer: ['این', 'یک', 'توستر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una batidora',
    question: 'ترجمه را بساز:',
    text: 'Esto es una batidora',
    words: ['است', 'مخلوط‌کن', 'یک', 'این'],
    answer: ['این', 'یک', 'مخلوط‌کن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un microondas',
    question: 'ترجمه را بساز:',
    text: 'Esto es un microondas',
    words: ['است', 'مایکروویو', 'یک', 'این'],
    answer: ['این', 'یک', 'مایکروویو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un lavavajillas',
    question: 'ترجمه را بساز:',
    text: 'Esto es un lavavajillas',
    words: ['است', 'ظرفشویی', 'ماشین', 'یک', 'این'],
    answer: ['این', 'یک', 'ماشین', 'ظرفشویی', 'است']
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

  // ===== بخش BUILD ES / FA =====
  if (q.type === 'build-es' || q.type === 'build-fa') {
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

    if (q.type === 'build-es') {
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