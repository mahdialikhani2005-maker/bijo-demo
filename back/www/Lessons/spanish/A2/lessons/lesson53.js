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

// ===== سوالات درس ۵۳ - اسپانیایی به فارسی (گردشگری) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el guía" است؟',
    speak: 'el guía',
    options: [
      { text: 'el guía', image: '../../../media/a2/travel/guide.png' },
      { text: 'el turista', image: '../../../media/a2/travel/tourist.png' },
      { text: 'el recuerdo', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'la aventura', image: '../../../media/a2/travel/adventure.png' }
    ],
    answer: 'el guía'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el turista" است؟',
    speak: 'el turista',
    options: [
      { text: 'el guía', image: '../../../media/a2/travel/guide.png' },
      { text: 'el turista', image: '../../../media/a2/travel/tourist.png' },
      { text: 'el viaje', image: '../../../media/a2/travel/journey.png' },
      { text: 'el recuerdo', image: '../../../media/a2/travel/souvenir.png' }
    ],
    answer: 'el turista'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el recuerdo" است؟',
    speak: 'el recuerdo',
    options: [
      { text: 'la aventura', image: '../../../media/a2/travel/adventure.png' },
      { text: 'el guía', image: '../../../media/a2/travel/guide.png' },
      { text: 'el recuerdo', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'el turista', image: '../../../media/a2/travel/tourist.png' }
    ],
    answer: 'el recuerdo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la aventura" است؟',
    speak: 'la aventura',
    options: [
      { text: 'el guía', image: '../../../media/a2/travel/guide.png' },
      { text: 'la aventura', image: '../../../media/a2/travel/adventure.png' },
      { text: 'el turista', image: '../../../media/a2/travel/tourist.png' },
      { text: 'el viaje', image: '../../../media/a2/travel/journey.png' }
    ],
    answer: 'la aventura'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el viaje" است؟',
    speak: 'el viaje',
    options: [
      { text: 'el recuerdo', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'el viaje', image: '../../../media/a2/travel/journey.png' },
      { text: 'la aventura', image: '../../../media/a2/travel/adventure.png' },
      { text: 'el guía', image: '../../../media/a2/travel/guide.png' }
    ],
    answer: 'el viaje'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/guide.png',
    options: ['el guía', 'el turista', 'el recuerdo', 'la aventura'],
    answer: 'el guía'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tourist.png',
    options: ['el guía', 'el turista', 'el viaje', 'el recuerdo'],
    answer: 'el turista'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/souvenir.png',
    options: ['la aventura', 'el guía', 'el recuerdo', 'el turista'],
    answer: 'el recuerdo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/adventure.png',
    options: ['el guía', 'la aventura', 'el turista', 'el viaje'],
    answer: 'la aventura'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/journey.png',
    options: ['el recuerdo', 'el viaje', 'la aventura', 'el guía'],
    answer: 'el viaje'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el guía',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el guía', 'el turista', 'el recuerdo', 'la aventura'],
    answer: 'el guía'
  },
  {
    type: 'audio',
    speak: 'el turista',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el guía', 'el turista', 'el viaje', 'el recuerdo'],
    answer: 'el turista'
  },
  {
    type: 'audio',
    speak: 'el recuerdo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la aventura', 'el guía', 'el recuerdo', 'el turista'],
    answer: 'el recuerdo'
  },
  {
    type: 'audio',
    speak: 'la aventura',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el guía', 'la aventura', 'el turista', 'el viaje'],
    answer: 'la aventura'
  },
  {
    type: 'audio',
    speak: 'el viaje',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el recuerdo', 'el viaje', 'la aventura', 'el guía'],
    answer: 'el viaje'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el guía',
    image: '../../../media/a2/travel/guide.png',
    meaning: 'راهنما'
  },
  {
    type: 'speak',
    word: 'el turista',
    image: '../../../media/a2/travel/tourist.png',
    meaning: 'گردشگر'
  },
  {
    type: 'speak',
    word: 'el recuerdo',
    image: '../../../media/a2/travel/souvenir.png',
    meaning: 'سوغاتی'
  },
  {
    type: 'speak',
    word: 'la aventura',
    image: '../../../media/a2/travel/adventure.png',
    meaning: 'ماجراجویی'
  },
  {
    type: 'speak',
    word: 'el viaje',
    image: '../../../media/a2/travel/journey.png',
    meaning: 'سفر'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un guía',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک راهنما است',
    words: ['guía', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'guía']
  },
  {
    type: 'build-es',
    speak: 'Esto es un turista',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک گردشگر است',
    words: ['turista', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'turista']
  },
  {
    type: 'build-es',
    speak: 'Esto es un recuerdo',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک سوغاتی است',
    words: ['recuerdo', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'recuerdo']
  },
  {
    type: 'build-es',
    speak: 'Esto es una aventura',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ماجراجویی است',
    words: ['aventura', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'aventura']
  },
  {
    type: 'build-es',
    speak: 'Esto es un viaje',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک سفر است',
    words: ['viaje', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'viaje']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un guía',
    question: 'ترجمه را بساز:',
    text: 'Esto es un guía',
    words: ['است', 'راهنما', 'یک', 'این'],
    answer: ['این', 'یک', 'راهنما', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un turista',
    question: 'ترجمه را بساز:',
    text: 'Esto es un turista',
    words: ['است', 'گردشگر', 'یک', 'این'],
    answer: ['این', 'یک', 'گردشگر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un recuerdo',
    question: 'ترجمه را بساز:',
    text: 'Esto es un recuerdo',
    words: ['است', 'سوغاتی', 'یک', 'این'],
    answer: ['این', 'یک', 'سوغاتی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una aventura',
    question: 'ترجمه را بساز:',
    text: 'Esto es una aventura',
    words: ['است', 'ماجراجویی', 'یک', 'این'],
    answer: ['این', 'یک', 'ماجراجویی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un viaje',
    question: 'ترجمه را بساز:',
    text: 'Esto es un viaje',
    words: ['است', 'سفر', 'یک', 'این'],
    answer: ['این', 'یک', 'سفر', 'است']
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