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

// ===== سوالات درس ۵۵ - اسپانیایی به فارسی (مدارک سفر) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el visado" است؟',
    speak: 'el visado',
    options: [
      { text: 'el visado', image: '../../../media/a2/travel/visa.png' },
      { text: 'la moneda', image: '../../../media/a2/travel/currency.png' },
      { text: 'el cambio', image: '../../../media/a2/travel/exchange.png' },
      { text: 'la salida', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'el visado'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la moneda" است؟',
    speak: 'la moneda',
    options: [
      { text: 'el visado', image: '../../../media/a2/travel/visa.png' },
      { text: 'la moneda', image: '../../../media/a2/travel/currency.png' },
      { text: 'la llegada', image: '../../../media/a2/travel/arrival.png' },
      { text: 'el cambio', image: '../../../media/a2/travel/exchange.png' }
    ],
    answer: 'la moneda'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el cambio" است؟',
    speak: 'el cambio',
    options: [
      { text: 'la salida', image: '../../../media/a2/travel/departure.png' },
      { text: 'el visado', image: '../../../media/a2/travel/visa.png' },
      { text: 'el cambio', image: '../../../media/a2/travel/exchange.png' },
      { text: 'la moneda', image: '../../../media/a2/travel/currency.png' }
    ],
    answer: 'el cambio'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la salida" است؟',
    speak: 'la salida',
    options: [
      { text: 'el visado', image: '../../../media/a2/travel/visa.png' },
      { text: 'la salida', image: '../../../media/a2/travel/departure.png' },
      { text: 'la moneda', image: '../../../media/a2/travel/currency.png' },
      { text: 'la llegada', image: '../../../media/a2/travel/arrival.png' }
    ],
    answer: 'la salida'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la llegada" است؟',
    speak: 'la llegada',
    options: [
      { text: 'el cambio', image: '../../../media/a2/travel/exchange.png' },
      { text: 'la llegada', image: '../../../media/a2/travel/arrival.png' },
      { text: 'la salida', image: '../../../media/a2/travel/departure.png' },
      { text: 'el visado', image: '../../../media/a2/travel/visa.png' }
    ],
    answer: 'la llegada'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/visa.png',
    options: ['el visado', 'la moneda', 'el cambio', 'la salida'],
    answer: 'el visado'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/currency.png',
    options: ['el visado', 'la moneda', 'la llegada', 'el cambio'],
    answer: 'la moneda'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/exchange.png',
    options: ['la salida', 'el visado', 'el cambio', 'la moneda'],
    answer: 'el cambio'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/departure.png',
    options: ['el visado', 'la salida', 'la moneda', 'la llegada'],
    answer: 'la salida'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/arrival.png',
    options: ['el cambio', 'la llegada', 'la salida', 'el visado'],
    answer: 'la llegada'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el visado',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el visado', 'la moneda', 'el cambio', 'la salida'],
    answer: 'el visado'
  },
  {
    type: 'audio',
    speak: 'la moneda',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el visado', 'la moneda', 'la llegada', 'el cambio'],
    answer: 'la moneda'
  },
  {
    type: 'audio',
    speak: 'el cambio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la salida', 'el visado', 'el cambio', 'la moneda'],
    answer: 'el cambio'
  },
  {
    type: 'audio',
    speak: 'la salida',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el visado', 'la salida', 'la moneda', 'la llegada'],
    answer: 'la salida'
  },
  {
    type: 'audio',
    speak: 'la llegada',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el cambio', 'la llegada', 'la salida', 'el visado'],
    answer: 'la llegada'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el visado',
    image: '../../../media/a2/travel/visa.png',
    meaning: 'ویزا'
  },
  {
    type: 'speak',
    word: 'la moneda',
    image: '../../../media/a2/travel/currency.png',
    meaning: 'ارز'
  },
  {
    type: 'speak',
    word: 'el cambio',
    image: '../../../media/a2/travel/exchange.png',
    meaning: 'تبادل'
  },
  {
    type: 'speak',
    word: 'la salida',
    image: '../../../media/a2/travel/departure.png',
    meaning: 'حرکت'
  },
  {
    type: 'speak',
    word: 'la llegada',
    image: '../../../media/a2/travel/arrival.png',
    meaning: 'ورود'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un visado',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ویزا است',
    words: ['visado', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'visado']
  },
  {
    type: 'build-es',
    speak: 'Esto es una moneda',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ارز است',
    words: ['moneda', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'moneda']
  },
  {
    type: 'build-es',
    speak: 'Esto es un cambio',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک تبادل است',
    words: ['cambio', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'cambio']
  },
  {
    type: 'build-es',
    speak: 'Esto es una salida',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک حرکت است',
    words: ['salida', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'salida']
  },
  {
    type: 'build-es',
    speak: 'Esto es una llegada',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ورود است',
    words: ['llegada', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'llegada']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un visado',
    question: 'ترجمه را بساز:',
    text: 'Esto es un visado',
    words: ['است', 'ویزا', 'یک', 'این'],
    answer: ['این', 'یک', 'ویزا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una moneda',
    question: 'ترجمه را بساز:',
    text: 'Esto es una moneda',
    words: ['است', 'ارز', 'یک', 'این'],
    answer: ['این', 'یک', 'ارز', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un cambio',
    question: 'ترجمه را بساز:',
    text: 'Esto es un cambio',
    words: ['است', 'تبادل', 'یک', 'این'],
    answer: ['این', 'یک', 'تبادل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una salida',
    question: 'ترجمه را بساز:',
    text: 'Esto es una salida',
    words: ['است', 'حرکت', 'یک', 'این'],
    answer: ['این', 'یک', 'حرکت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una llegada',
    question: 'ترجمه را بساز:',
    text: 'Esto es una llegada',
    words: ['است', 'ورود', 'یک', 'این'],
    answer: ['این', 'یک', 'ورود', 'است']
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