let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
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
  recognition.lang = 'ru-RU';
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

// ===== سوالات درس ۱۳ - روسی به فارسی (بناها و سازه‌ها) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "мост" است؟',
    speak: 'мост',
    options: [
      { text: 'мост', image: '../../../media/a2/city/bridge.png' },
      { text: 'площадь', image: '../../../media/a2/city/square.png' },
      { text: 'фонтан', image: '../../../media/a2/city/fountain.png' },
      { text: 'башня', image: '../../../media/a2/city/tower.png' }
    ],
    answer: 'мост'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "площадь" است؟',
    speak: 'площадь',
    options: [
      { text: 'мост', image: '../../../media/a2/city/bridge.png' },
      { text: 'площадь', image: '../../../media/a2/city/square.png' },
      { text: 'замок', image: '../../../media/a2/city/castle.png' },
      { text: 'фонтан', image: '../../../media/a2/city/fountain.png' }
    ],
    answer: 'площадь'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "фонтан" است؟',
    speak: 'фонтан',
    options: [
      { text: 'башня', image: '../../../media/a2/city/tower.png' },
      { text: 'мост', image: '../../../media/a2/city/bridge.png' },
      { text: 'фонтан', image: '../../../media/a2/city/fountain.png' },
      { text: 'площадь', image: '../../../media/a2/city/square.png' }
    ],
    answer: 'фонтан'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "башня" است؟',
    speak: 'башня',
    options: [
      { text: 'мост', image: '../../../media/a2/city/bridge.png' },
      { text: 'башня', image: '../../../media/a2/city/tower.png' },
      { text: 'фонтан', image: '../../../media/a2/city/fountain.png' },
      { text: 'замок', image: '../../../media/a2/city/castle.png' }
    ],
    answer: 'башня'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "замок" است؟',
    speak: 'замок',
    options: [
      { text: 'площадь', image: '../../../media/a2/city/square.png' },
      { text: 'замок', image: '../../../media/a2/city/castle.png' },
      { text: 'башня', image: '../../../media/a2/city/tower.png' },
      { text: 'мост', image: '../../../media/a2/city/bridge.png' }
    ],
    answer: 'замок'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bridge.png',
    options: ['мост', 'площадь', 'фонтан', 'башня'],
    answer: 'мост'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/square.png',
    options: ['мост', 'площадь', 'замок', 'фонтан'],
    answer: 'площадь'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/fountain.png',
    options: ['башня', 'мост', 'фонтан', 'площадь'],
    answer: 'фонтан'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/tower.png',
    options: ['мост', 'башня', 'фонтан', 'замок'],
    answer: 'башня'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/castle.png',
    options: ['площадь', 'замок', 'башня', 'мост'],
    answer: 'замок'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'мост',
    question: 'کدام کلمه را شنیدی؟',
    options: ['мост', 'площадь', 'фонтан', 'башня'],
    answer: 'мост'
  },
  {
    type: 'audio',
    speak: 'площадь',
    question: 'کدام کلمه را شنیدی؟',
    options: ['мост', 'площадь', 'замок', 'фонтан'],
    answer: 'площадь'
  },
  {
    type: 'audio',
    speak: 'фонтан',
    question: 'کدام کلمه را شنیدی؟',
    options: ['башня', 'мост', 'фонтан', 'площадь'],
    answer: 'фонтан'
  },
  {
    type: 'audio',
    speak: 'башня',
    question: 'کدام کلمه را شنیدی؟',
    options: ['мост', 'башня', 'фонтан', 'замок'],
    answer: 'башня'
  },
  {
    type: 'audio',
    speak: 'замок',
    question: 'کدام کلمه را شنیدی؟',
    options: ['площадь', 'замок', 'башня', 'мост'],
    answer: 'замок'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'мост',
    image: '../../../media/a2/city/bridge.png',
    meaning: 'پل'
  },
  {
    type: 'speak',
    word: 'площадь',
    image: '../../../media/a2/city/square.png',
    meaning: 'میدان'
  },
  {
    type: 'speak',
    word: 'фонтан',
    image: '../../../media/a2/city/fountain.png',
    meaning: 'آبنما'
  },
  {
    type: 'speak',
    word: 'башня',
    image: '../../../media/a2/city/tower.png',
    meaning: 'برج'
  },
  {
    type: 'speak',
    word: 'замок',
    image: '../../../media/a2/city/castle.png',
    meaning: 'قلعه'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это мост',
    question: 'جمله روسی را بساز:',
    text: 'این پل است',
    words: ['мост', 'Это'],
    answer: ['Это', 'мост']
  },
  {
    type: 'build-ru',
    speak: 'Это площадь',
    question: 'جمله روسی را بساز:',
    text: 'این میدان است',
    words: ['площадь', 'Это'],
    answer: ['Это', 'площадь']
  },
  {
    type: 'build-ru',
    speak: 'Это фонтан',
    question: 'جمله روسی را بساز:',
    text: 'این آبنما است',
    words: ['фонтан', 'Это'],
    answer: ['Это', 'фонтан']
  },
  {
    type: 'build-ru',
    speak: 'Это башня',
    question: 'جمله روسی را بساز:',
    text: 'این برج است',
    words: ['башня', 'Это'],
    answer: ['Это', 'башня']
  },
  {
    type: 'build-ru',
    speak: 'Это замок',
    question: 'جمله روسی را بساز:',
    text: 'این قلعه است',
    words: ['замок', 'Это'],
    answer: ['Это', 'замок']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это мост',
    question: 'ترجمه را بساز:',
    text: 'Это мост',
    words: ['است', 'پل', 'این'],
    answer: ['این', 'پل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это площадь',
    question: 'ترجمه را بساز:',
    text: 'Это площадь',
    words: ['است', 'میدان', 'این'],
    answer: ['این', 'میدان', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это фонтан',
    question: 'ترجمه را بساز:',
    text: 'Это фонтан',
    words: ['است', 'آبنما', 'این'],
    answer: ['این', 'آبنما', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это башня',
    question: 'ترجمه را بساز:',
    text: 'Это башня',
    words: ['است', 'برج', 'این'],
    answer: ['این', 'برج', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это замок',
    question: 'ترجمه را بساز:',
    text: 'Это замок',
    words: ['است', 'قلعه', 'این'],
    answer: ['این', 'قلعه', 'است']
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

  // ===== بخش BUILD RU / FA =====
  if (q.type === 'build-ru' || q.type === 'build-fa') {
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

    if (q.type === 'build-ru') {
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