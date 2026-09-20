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

// ===== سوالات درس ۲۳ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la bistecca" است؟',
    speak: 'la bistecca',
    options: [
      { text: 'la bistecca', image: '../../../media/a2/food/steak.png' },
      { text: 'il gambero', image: '../../../media/a2/food/shrimp.png' },
      { text: 'l\'aragosta', image: '../../../media/a2/food/lobster.png' },
      { text: 'il granchio', image: '../../../media/a2/food/crab.png' }
    ],
    answer: 'la bistecca'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il gambero" است؟',
    speak: 'il gambero',
    options: [
      { text: 'la bistecca', image: '../../../media/a2/food/steak.png' },
      { text: 'il gambero', image: '../../../media/a2/food/shrimp.png' },
      { text: 'l\'ostrica', image: '../../../media/a2/food/oyster.png' },
      { text: 'l\'aragosta', image: '../../../media/a2/food/lobster.png' }
    ],
    answer: 'il gambero'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'aragosta" است؟',
    speak: 'l\'aragosta',
    options: [
      { text: 'il granchio', image: '../../../media/a2/food/crab.png' },
      { text: 'la bistecca', image: '../../../media/a2/food/steak.png' },
      { text: 'l\'aragosta', image: '../../../media/a2/food/lobster.png' },
      { text: 'il gambero', image: '../../../media/a2/food/shrimp.png' }
    ],
    answer: 'l\'aragosta'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'ostrica" است؟',
    speak: 'l\'ostrica',
    options: [
      { text: 'il gambero', image: '../../../media/a2/food/shrimp.png' },
      { text: 'l\'ostrica', image: '../../../media/a2/food/oyster.png' },
      { text: 'il granchio', image: '../../../media/a2/food/crab.png' },
      { text: 'la bistecca', image: '../../../media/a2/food/steak.png' }
    ],
    answer: 'l\'ostrica'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il granchio" است؟',
    speak: 'il granchio',
    options: [
      { text: 'la bistecca', image: '../../../media/a2/food/steak.png' },
      { text: 'l\'aragosta', image: '../../../media/a2/food/lobster.png' },
      { text: 'il granchio', image: '../../../media/a2/food/crab.png' },
      { text: 'l\'ostrica', image: '../../../media/a2/food/oyster.png' }
    ],
    answer: 'il granchio'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/steak.png',
    options: ['la bistecca', 'il gambero', 'l\'aragosta', 'il granchio'],
    answer: 'la bistecca'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/shrimp.png',
    options: ['la bistecca', 'il gambero', 'l\'ostrica', 'l\'aragosta'],
    answer: 'il gambero'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/lobster.png',
    options: ['il granchio', 'la bistecca', 'l\'aragosta', 'il gambero'],
    answer: 'l\'aragosta'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/oyster.png',
    options: ['il gambero', 'l\'ostrica', 'il granchio', 'la bistecca'],
    answer: 'l\'ostrica'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/crab.png',
    options: ['la bistecca', 'l\'aragosta', 'il granchio', 'l\'ostrica'],
    answer: 'il granchio'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la bistecca',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la bistecca', 'il gambero', 'l\'aragosta', 'il granchio'],
    answer: 'la bistecca'
  },
  {
    type: 'audio',
    speak: 'il gambero',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la bistecca', 'il gambero', 'l\'ostrica', 'l\'aragosta'],
    answer: 'il gambero'
  },
  {
    type: 'audio',
    speak: 'l\'aragosta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il granchio', 'la bistecca', 'l\'aragosta', 'il gambero'],
    answer: 'l\'aragosta'
  },
  {
    type: 'audio',
    speak: 'l\'ostrica',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il gambero', 'l\'ostrica', 'il granchio', 'la bistecca'],
    answer: 'l\'ostrica'
  },
  {
    type: 'audio',
    speak: 'il granchio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la bistecca', 'l\'aragosta', 'il granchio', 'l\'ostrica'],
    answer: 'il granchio'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la bistecca',
    image: '../../../media/a2/food/steak.png',
    meaning: 'استیک'
  },
  {
    type: 'speak',
    word: 'il gambero',
    image: '../../../media/a2/food/shrimp.png',
    meaning: 'میگو'
  },
  {
    type: 'speak',
    word: 'l\'aragosta',
    image: '../../../media/a2/food/lobster.png',
    meaning: 'خرچنگ'
  },
  {
    type: 'speak',
    word: 'l\'ostrica',
    image: '../../../media/a2/food/oyster.png',
    meaning: 'صدف'
  },
  {
    type: 'speak',
    word: 'il granchio',
    image: '../../../media/a2/food/crab.png',
    meaning: 'خرچنگ دریایی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Mangio una bistecca',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک استیک می‌خورم',
    words: ['bistecca', 'una', 'Mangio'],
    answer: ['Mangio', 'una', 'bistecca']
  },
  {
    type: 'build-it',
    speak: 'Mangio un gambero',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک میگو می‌خورم',
    words: ['gambero', 'un', 'Mangio'],
    answer: ['Mangio', 'un', 'gambero']
  },
  {
    type: 'build-it',
    speak: 'Mangio un\'aragosta',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک خرچنگ می‌خورم',
    words: ['aragosta', 'un\'', 'Mangio'],
    answer: ['Mangio', 'un\'', 'aragosta']
  },
  {
    type: 'build-it',
    speak: 'Mangio un\'ostrica',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک صدف می‌خورم',
    words: ['ostrica', 'un\'', 'Mangio'],
    answer: ['Mangio', 'un\'', 'ostrica']
  },
  {
    type: 'build-it',
    speak: 'Mangio un granchio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک خرچنگ دریایی می‌خورم',
    words: ['granchio', 'un', 'Mangio'],
    answer: ['Mangio', 'un', 'granchio']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Mangio una bistecca',
    question: 'ترجمه را بساز:',
    text: 'Mangio una bistecca',
    words: ['می‌خورم', 'استیک', 'یک', 'من'],
    answer: ['من', 'یک', 'استیک', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio un gambero',
    question: 'ترجمه را بساز:',
    text: 'Mangio un gambero',
    words: ['می‌خورم', 'میگو', 'یک', 'من'],
    answer: ['من', 'یک', 'میگو', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio un\'aragosta',
    question: 'ترجمه را بساز:',
    text: 'Mangio un\'aragosta',
    words: ['می‌خورم', 'خرچنگ', 'یک', 'من'],
    answer: ['من', 'یک', 'خرچنگ', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio un\'ostrica',
    question: 'ترجمه را بساز:',
    text: 'Mangio un\'ostrica',
    words: ['می‌خورم', 'صدف', 'یک', 'من'],
    answer: ['من', 'یک', 'صدف', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio un granchio',
    question: 'ترجمه را بساز:',
    text: 'Mangio un granchio',
    words: ['می‌خورم', 'خرچنگ دریایی', 'یک', 'من'],
    answer: ['من', 'یک', 'خرچنگ دریایی', 'می‌خورم']
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