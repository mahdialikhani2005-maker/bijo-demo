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

// ===== سوالات درس ۲۸ - اسپانیایی به فارسی (لباس گرم) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "los vaqueros" است؟',
    speak: 'los vaqueros',
    options: [
      { text: 'los vaqueros', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'la chaqueta', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'el abrigo', image: '../../../media/a2/clothes/coat.png' },
      { text: 'el chaleco', image: '../../../media/a2/clothes/vest.png' }
    ],
    answer: 'los vaqueros'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la chaqueta" است؟',
    speak: 'la chaqueta',
    options: [
      { text: 'los vaqueros', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'la chaqueta', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'el suéter', image: '../../../media/a2/clothes/sweater.png' },
      { text: 'el abrigo', image: '../../../media/a2/clothes/coat.png' }
    ],
    answer: 'la chaqueta'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el abrigo" است؟',
    speak: 'el abrigo',
    options: [
      { text: 'el chaleco', image: '../../../media/a2/clothes/vest.png' },
      { text: 'los vaqueros', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'el abrigo', image: '../../../media/a2/clothes/coat.png' },
      { text: 'la chaqueta', image: '../../../media/a2/clothes/jacket.png' }
    ],
    answer: 'el abrigo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el chaleco" است؟',
    speak: 'el chaleco',
    options: [
      { text: 'los vaqueros', image: '../../../media/a2/clothes/jeans.png' },
      { text: 'el chaleco', image: '../../../media/a2/clothes/vest.png' },
      { text: 'la chaqueta', image: '../../../media/a2/clothes/jacket.png' },
      { text: 'el suéter', image: '../../../media/a2/clothes/sweater.png' }
    ],
    answer: 'el chaleco'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el suéter" است؟',
    speak: 'el suéter',
    options: [
      { text: 'el abrigo', image: '../../../media/a2/clothes/coat.png' },
      { text: 'el suéter', image: '../../../media/a2/clothes/sweater.png' },
      { text: 'el chaleco', image: '../../../media/a2/clothes/vest.png' },
      { text: 'los vaqueros', image: '../../../media/a2/clothes/jeans.png' }
    ],
    answer: 'el suéter'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/jeans.png',
    options: ['los vaqueros', 'la chaqueta', 'el abrigo', 'el chaleco'],
    answer: 'los vaqueros'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/jacket.png',
    options: ['los vaqueros', 'la chaqueta', 'el suéter', 'el abrigo'],
    answer: 'la chaqueta'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/coat.png',
    options: ['el chaleco', 'los vaqueros', 'el abrigo', 'la chaqueta'],
    answer: 'el abrigo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/vest.png',
    options: ['los vaqueros', 'el chaleco', 'la chaqueta', 'el suéter'],
    answer: 'el chaleco'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/sweater.png',
    options: ['el abrigo', 'el suéter', 'el chaleco', 'los vaqueros'],
    answer: 'el suéter'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'los vaqueros',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los vaqueros', 'la chaqueta', 'el abrigo', 'el chaleco'],
    answer: 'los vaqueros'
  },
  {
    type: 'audio',
    speak: 'la chaqueta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los vaqueros', 'la chaqueta', 'el suéter', 'el abrigo'],
    answer: 'la chaqueta'
  },
  {
    type: 'audio',
    speak: 'el abrigo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el chaleco', 'los vaqueros', 'el abrigo', 'la chaqueta'],
    answer: 'el abrigo'
  },
  {
    type: 'audio',
    speak: 'el chaleco',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los vaqueros', 'el chaleco', 'la chaqueta', 'el suéter'],
    answer: 'el chaleco'
  },
  {
    type: 'audio',
    speak: 'el suéter',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el abrigo', 'el suéter', 'el chaleco', 'los vaqueros'],
    answer: 'el suéter'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'los vaqueros',
    image: '../../../media/a2/clothes/jeans.png',
    meaning: 'شلوار جین'
  },
  {
    type: 'speak',
    word: 'la chaqueta',
    image: '../../../media/a2/clothes/jacket.png',
    meaning: 'ژاکت'
  },
  {
    type: 'speak',
    word: 'el abrigo',
    image: '../../../media/a2/clothes/coat.png',
    meaning: 'کت'
  },
  {
    type: 'speak',
    word: 'el chaleco',
    image: '../../../media/a2/clothes/vest.png',
    meaning: 'جلیقه'
  },
  {
    type: 'speak',
    word: 'el suéter',
    image: '../../../media/a2/clothes/sweater.png',
    meaning: 'پلیور'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto son vaqueros',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این شلوار جین است',
    words: ['vaqueros', 'son', 'Esto'],
    answer: ['Esto', 'son', 'vaqueros']
  },
  {
    type: 'build-es',
    speak: 'Esto es una chaqueta',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ژاکت است',
    words: ['chaqueta', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'chaqueta']
  },
  {
    type: 'build-es',
    speak: 'Esto es un abrigo',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کت است',
    words: ['abrigo', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'abrigo']
  },
  {
    type: 'build-es',
    speak: 'Esto es un chaleco',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک جلیقه است',
    words: ['chaleco', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'chaleco']
  },
  {
    type: 'build-es',
    speak: 'Esto es un suéter',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک پلیور است',
    words: ['suéter', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'suéter']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto son vaqueros',
    question: 'ترجمه را بساز:',
    text: 'Esto son vaqueros',
    words: ['است', 'شلوار جین', 'این'],
    answer: ['این', 'شلوار جین', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una chaqueta',
    question: 'ترجمه را بساز:',
    text: 'Esto es una chaqueta',
    words: ['است', 'ژاکت', 'یک', 'این'],
    answer: ['این', 'یک', 'ژاکت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un abrigo',
    question: 'ترجمه را بساز:',
    text: 'Esto es un abrigo',
    words: ['است', 'کت', 'یک', 'این'],
    answer: ['این', 'یک', 'کت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un chaleco',
    question: 'ترجمه را بساز:',
    text: 'Esto es un chaleco',
    words: ['است', 'جلیقه', 'یک', 'این'],
    answer: ['این', 'یک', 'جلیقه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un suéter',
    question: 'ترجمه را بساز:',
    text: 'Esto es un suéter',
    words: ['است', 'پلیور', 'یک', 'این'],
    answer: ['این', 'یک', 'پلیور', 'است']
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