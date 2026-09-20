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

// ===== سوالات درس ۲۷ - اسپانیایی به فارسی (جواهرات) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la pulsera" است؟',
    speak: 'la pulsera',
    options: [
      { text: 'la pulsera', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'el pendiente', image: '../../../media/a2/clothes/earring.png' },
      { text: 'el anillo', image: '../../../media/a2/clothes/ring.png' },
      { text: 'la cadena', image: '../../../media/a2/clothes/chain.png' }
    ],
    answer: 'la pulsera'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el pendiente" است؟',
    speak: 'el pendiente',
    options: [
      { text: 'la pulsera', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'el pendiente', image: '../../../media/a2/clothes/earring.png' },
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' },
      { text: 'el anillo', image: '../../../media/a2/clothes/ring.png' }
    ],
    answer: 'el pendiente'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el anillo" است؟',
    speak: 'el anillo',
    options: [
      { text: 'la cadena', image: '../../../media/a2/clothes/chain.png' },
      { text: 'la pulsera', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'el anillo', image: '../../../media/a2/clothes/ring.png' },
      { text: 'el pendiente', image: '../../../media/a2/clothes/earring.png' }
    ],
    answer: 'el anillo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la cadena" است؟',
    speak: 'la cadena',
    options: [
      { text: 'la pulsera', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'la cadena', image: '../../../media/a2/clothes/chain.png' },
      { text: 'el anillo', image: '../../../media/a2/clothes/ring.png' },
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' }
    ],
    answer: 'la cadena'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la corona" است؟',
    speak: 'la corona',
    options: [
      { text: 'el pendiente', image: '../../../media/a2/clothes/earring.png' },
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' },
      { text: 'la cadena', image: '../../../media/a2/clothes/chain.png' },
      { text: 'la pulsera', image: '../../../media/a2/clothes/bracelet.png' }
    ],
    answer: 'la corona'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bracelet.png',
    options: ['la pulsera', 'el pendiente', 'el anillo', 'la cadena'],
    answer: 'la pulsera'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/earring.png',
    options: ['la pulsera', 'el pendiente', 'la corona', 'el anillo'],
    answer: 'el pendiente'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/ring.png',
    options: ['la cadena', 'la pulsera', 'el anillo', 'el pendiente'],
    answer: 'el anillo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/chain.png',
    options: ['la pulsera', 'la cadena', 'el anillo', 'la corona'],
    answer: 'la cadena'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/crown.png',
    options: ['el pendiente', 'la corona', 'la cadena', 'la pulsera'],
    answer: 'la corona'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la pulsera',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la pulsera', 'el pendiente', 'el anillo', 'la cadena'],
    answer: 'la pulsera'
  },
  {
    type: 'audio',
    speak: 'el pendiente',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la pulsera', 'el pendiente', 'la corona', 'el anillo'],
    answer: 'el pendiente'
  },
  {
    type: 'audio',
    speak: 'el anillo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la cadena', 'la pulsera', 'el anillo', 'el pendiente'],
    answer: 'el anillo'
  },
  {
    type: 'audio',
    speak: 'la cadena',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la pulsera', 'la cadena', 'el anillo', 'la corona'],
    answer: 'la cadena'
  },
  {
    type: 'audio',
    speak: 'la corona',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el pendiente', 'la corona', 'la cadena', 'la pulsera'],
    answer: 'la corona'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la pulsera',
    image: '../../../media/a2/clothes/bracelet.png',
    meaning: 'دستبند'
  },
  {
    type: 'speak',
    word: 'el pendiente',
    image: '../../../media/a2/clothes/earring.png',
    meaning: 'گوشواره'
  },
  {
    type: 'speak',
    word: 'el anillo',
    image: '../../../media/a2/clothes/ring.png',
    meaning: 'حلقه'
  },
  {
    type: 'speak',
    word: 'la cadena',
    image: '../../../media/a2/clothes/chain.png',
    meaning: 'زنجیر'
  },
  {
    type: 'speak',
    word: 'la corona',
    image: '../../../media/a2/clothes/crown.png',
    meaning: 'تاج'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es una pulsera',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک دستبند است',
    words: ['pulsera', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'pulsera']
  },
  {
    type: 'build-es',
    speak: 'Esto es un pendiente',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک گوشواره است',
    words: ['pendiente', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'pendiente']
  },
  {
    type: 'build-es',
    speak: 'Esto es un anillo',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک حلقه است',
    words: ['anillo', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'anillo']
  },
  {
    type: 'build-es',
    speak: 'Esto es una cadena',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک زنجیر است',
    words: ['cadena', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'cadena']
  },
  {
    type: 'build-es',
    speak: 'Esto es una corona',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک تاج است',
    words: ['corona', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'corona']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es una pulsera',
    question: 'ترجمه را بساز:',
    text: 'Esto es una pulsera',
    words: ['است', 'دستبند', 'یک', 'این'],
    answer: ['این', 'یک', 'دستبند', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un pendiente',
    question: 'ترجمه را بساز:',
    text: 'Esto es un pendiente',
    words: ['است', 'گوشواره', 'یک', 'این'],
    answer: ['این', 'یک', 'گوشواره', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un anillo',
    question: 'ترجمه را بساز:',
    text: 'Esto es un anillo',
    words: ['است', 'حلقه', 'یک', 'این'],
    answer: ['این', 'یک', 'حلقه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una cadena',
    question: 'ترجمه را بساز:',
    text: 'Esto es una cadena',
    words: ['است', 'زنجیر', 'یک', 'این'],
    answer: ['این', 'یک', 'زنجیر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una corona',
    question: 'ترجمه را بساز:',
    text: 'Esto es una corona',
    words: ['است', 'تاج', 'یک', 'این'],
    answer: ['این', 'یک', 'تاج', 'است']
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