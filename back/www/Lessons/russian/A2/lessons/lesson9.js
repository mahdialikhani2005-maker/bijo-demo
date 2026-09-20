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

// ===== سوالات درس ۹ - روسی به فارسی (لوازم آشپزخانه) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "чайник" است؟',
    speak: 'чайник',
    options: [
      { text: 'чайник', image: '../../../media/a2/house/kettle.png' },
      { text: 'тостер', image: '../../../media/a2/house/toaster.png' },
      { text: 'блендер', image: '../../../media/a2/house/blender.png' },
      { text: 'микроволновка', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: 'чайник'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "тостер" است؟',
    speak: 'тостер',
    options: [
      { text: 'чайник', image: '../../../media/a2/house/kettle.png' },
      { text: 'тостер', image: '../../../media/a2/house/toaster.png' },
      { text: 'посудомойка', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'блендер', image: '../../../media/a2/house/blender.png' }
    ],
    answer: 'тостер'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "блендер" است؟',
    speak: 'блендер',
    options: [
      { text: 'микроволновка', image: '../../../media/a2/house/microwave.png' },
      { text: 'чайник', image: '../../../media/a2/house/kettle.png' },
      { text: 'блендер', image: '../../../media/a2/house/blender.png' },
      { text: 'тостер', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: 'блендер'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "микроволновка" است؟',
    speak: 'микроволновка',
    options: [
      { text: 'чайник', image: '../../../media/a2/house/kettle.png' },
      { text: 'микроволновка', image: '../../../media/a2/house/microwave.png' },
      { text: 'тостер', image: '../../../media/a2/house/toaster.png' },
      { text: 'посудомойка', image: '../../../media/a2/house/dishwasher.png' }
    ],
    answer: 'микроволновка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "посудомойка" است؟',
    speak: 'посудомойка',
    options: [
      { text: 'блендер', image: '../../../media/a2/house/blender.png' },
      { text: 'микроволновка', image: '../../../media/a2/house/microwave.png' },
      { text: 'посудомойка', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'чайник', image: '../../../media/a2/house/kettle.png' }
    ],
    answer: 'посудомойка'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/kettle.png',
    options: ['чайник', 'тостер', 'блендер', 'микроволновка'],
    answer: 'чайник'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/toaster.png',
    options: ['чайник', 'тостер', 'посудомойка', 'блендер'],
    answer: 'тостер'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blender.png',
    options: ['микроволновка', 'чайник', 'блендер', 'тостер'],
    answer: 'блендер'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/microwave.png',
    options: ['чайник', 'микроволновка', 'тостер', 'посудомойка'],
    answer: 'микроволновка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/dishwasher.png',
    options: ['блендер', 'микроволновка', 'посудомойка', 'чайник'],
    answer: 'посудомойка'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'чайник',
    question: 'کدام کلمه را شنیدی؟',
    options: ['чайник', 'тостер', 'блендер', 'микроволновка'],
    answer: 'чайник'
  },
  {
    type: 'audio',
    speak: 'тостер',
    question: 'کدام کلمه را شنیدی؟',
    options: ['чайник', 'тостер', 'посудомойка', 'блендер'],
    answer: 'тостер'
  },
  {
    type: 'audio',
    speak: 'блендер',
    question: 'کدام کلمه را شنیدی؟',
    options: ['микроволновка', 'чайник', 'блендер', 'тостер'],
    answer: 'блендер'
  },
  {
    type: 'audio',
    speak: 'микроволновка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['чайник', 'микроволновка', 'тостер', 'посудомойка'],
    answer: 'микроволновка'
  },
  {
    type: 'audio',
    speak: 'посудомойка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['блендер', 'микроволновка', 'посудомойка', 'чайник'],
    answer: 'посудомойка'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'чайник',
    image: '../../../media/a2/house/kettle.png',
    meaning: 'کتری'
  },
  {
    type: 'speak',
    word: 'тостер',
    image: '../../../media/a2/house/toaster.png',
    meaning: 'توستر'
  },
  {
    type: 'speak',
    word: 'блендер',
    image: '../../../media/a2/house/blender.png',
    meaning: 'مخلوط‌کن'
  },
  {
    type: 'speak',
    word: 'микроволновка',
    image: '../../../media/a2/house/microwave.png',
    meaning: 'مایکروویو'
  },
  {
    type: 'speak',
    word: 'посудомойка',
    image: '../../../media/a2/house/dishwasher.png',
    meaning: 'ماشین ظرفشویی'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это чайник',
    question: 'جمله روسی را بساز:',
    text: 'این کتری است',
    words: ['чайник', 'Это'],
    answer: ['Это', 'чайник']
  },
  {
    type: 'build-ru',
    speak: 'Это тостер',
    question: 'جمله روسی را بساز:',
    text: 'این توستر است',
    words: ['тостер', 'Это'],
    answer: ['Это', 'тостер']
  },
  {
    type: 'build-ru',
    speak: 'Это блендер',
    question: 'جمله روسی را بساز:',
    text: 'این مخلوط‌کن است',
    words: ['блендер', 'Это'],
    answer: ['Это', 'блендер']
  },
  {
    type: 'build-ru',
    speak: 'Это микроволновка',
    question: 'جمله روسی را بساز:',
    text: 'این مایکروویو است',
    words: ['микроволновка', 'Это'],
    answer: ['Это', 'микроволновка']
  },
  {
    type: 'build-ru',
    speak: 'Это посудомойка',
    question: 'جمله روسی را بساز:',
    text: 'این ماشین ظرفشویی است',
    words: ['посудомойка', 'Это'],
    answer: ['Это', 'посудомойка']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это чайник',
    question: 'ترجمه را بساز:',
    text: 'Это чайник',
    words: ['است', 'کتری', 'این'],
    answer: ['این', 'کتری', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это тостер',
    question: 'ترجمه را بساز:',
    text: 'Это тостер',
    words: ['است', 'توستر', 'این'],
    answer: ['این', 'توستر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это блендер',
    question: 'ترجمه را بساز:',
    text: 'Это блендер',
    words: ['است', 'مخلوط‌کن', 'این'],
    answer: ['این', 'مخلوط‌کن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это микроволновка',
    question: 'ترجمه را بساز:',
    text: 'Это микроволновка',
    words: ['است', 'مایکروویو', 'این'],
    answer: ['این', 'مایکروویو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это посудомойка',
    question: 'ترجمه را بساز:',
    text: 'Это посудомойка',
    words: ['است', 'ظرفشویی', 'ماشین', 'این'],
    answer: ['این', 'ماشین', 'ظرفشویی', 'است']
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