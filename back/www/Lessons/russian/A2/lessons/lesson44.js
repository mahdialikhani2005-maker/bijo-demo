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

// ===== سوالات درس ۴۴ - روسی به فارسی (زخم‌ها و عفونت‌ها) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "аллергия" است؟',
    speak: 'аллергия',
    options: [
      { text: 'аллергия', image: '../../../media/a2/health/allergy.png' },
      { text: 'инфекция', image: '../../../media/a2/health/infection.png' },
      { text: 'травма', image: '../../../media/a2/health/injury.png' },
      { text: 'рана', image: '../../../media/a2/health/wound.png' }
    ],
    answer: 'аллергия'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "инфекция" است؟',
    speak: 'инфекция',
    options: [
      { text: 'аллергия', image: '../../../media/a2/health/allergy.png' },
      { text: 'инфекция', image: '../../../media/a2/health/infection.png' },
      { text: 'шрам', image: '../../../media/a2/health/scar.png' },
      { text: 'травма', image: '../../../media/a2/health/injury.png' }
    ],
    answer: 'инфекция'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "травма" است؟',
    speak: 'травма',
    options: [
      { text: 'рана', image: '../../../media/a2/health/wound.png' },
      { text: 'аллергия', image: '../../../media/a2/health/allergy.png' },
      { text: 'травма', image: '../../../media/a2/health/injury.png' },
      { text: 'инфекция', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'травма'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "рана" است؟',
    speak: 'рана',
    options: [
      { text: 'аллергия', image: '../../../media/a2/health/allergy.png' },
      { text: 'рана', image: '../../../media/a2/health/wound.png' },
      { text: 'травма', image: '../../../media/a2/health/injury.png' },
      { text: 'шрам', image: '../../../media/a2/health/scar.png' }
    ],
    answer: 'рана'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "шрам" است؟',
    speak: 'шрам',
    options: [
      { text: 'инфекция', image: '../../../media/a2/health/infection.png' },
      { text: 'шрам', image: '../../../media/a2/health/scar.png' },
      { text: 'рана', image: '../../../media/a2/health/wound.png' },
      { text: 'аллергия', image: '../../../media/a2/health/allergy.png' }
    ],
    answer: 'шрам'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/allergy.png',
    options: ['аллергия', 'инфекция', 'травма', 'рана'],
    answer: 'аллергия'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/infection.png',
    options: ['аллергия', 'инфекция', 'шрам', 'травма'],
    answer: 'инфекция'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injury.png',
    options: ['рана', 'аллергия', 'травма', 'инфекция'],
    answer: 'травма'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wound.png',
    options: ['аллергия', 'рана', 'травма', 'шрам'],
    answer: 'рана'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/scar.png',
    options: ['инфекция', 'шрам', 'рана', 'аллергия'],
    answer: 'шрам'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'аллергия',
    question: 'کدام کلمه را شنیدی؟',
    options: ['аллергия', 'инфекция', 'травма', 'рана'],
    answer: 'аллергия'
  },
  {
    type: 'audio',
    speak: 'инфекция',
    question: 'کدام کلمه را شنیدی؟',
    options: ['аллергия', 'инфекция', 'шрам', 'травма'],
    answer: 'инфекция'
  },
  {
    type: 'audio',
    speak: 'травма',
    question: 'کدام کلمه را شنیدی؟',
    options: ['рана', 'аллергия', 'травма', 'инфекция'],
    answer: 'травма'
  },
  {
    type: 'audio',
    speak: 'рана',
    question: 'کدام کلمه را شنیدی؟',
    options: ['аллергия', 'рана', 'травма', 'шрам'],
    answer: 'рана'
  },
  {
    type: 'audio',
    speak: 'шрам',
    question: 'کدام کلمه را شنیدی؟',
    options: ['инфекция', 'шрам', 'рана', 'аллергия'],
    answer: 'шрам'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'аллергия',
    image: '../../../media/a2/health/allergy.png',
    meaning: 'حساسیت'
  },
  {
    type: 'speak',
    word: 'инфекция',
    image: '../../../media/a2/health/infection.png',
    meaning: 'عفونت'
  },
  {
    type: 'speak',
    word: 'травма',
    image: '../../../media/a2/health/injury.png',
    meaning: 'آسیب'
  },
  {
    type: 'speak',
    word: 'рана',
    image: '../../../media/a2/health/wound.png',
    meaning: 'زخم'
  },
  {
    type: 'speak',
    word: 'шрам',
    image: '../../../media/a2/health/scar.png',
    meaning: 'جای زخم'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'У меня аллергия',
    question: 'جمله روسی را بساز:',
    text: 'من حساسیت دارم',
    words: ['аллергия', 'меня', 'У'],
    answer: ['У', 'меня', 'аллергия']
  },
  {
    type: 'build-ru',
    speak: 'Это инфекция',
    question: 'جمله روسی را بساز:',
    text: 'این عفونت است',
    words: ['инфекция', 'Это'],
    answer: ['Это', 'инфекция']
  },
  {
    type: 'build-ru',
    speak: 'Это травма',
    question: 'جمله روسی را بساز:',
    text: 'این آسیب است',
    words: ['травма', 'Это'],
    answer: ['Это', 'травма']
  },
  {
    type: 'build-ru',
    speak: 'Это рана',
    question: 'جمله روسی را بساز:',
    text: 'این زخم است',
    words: ['рана', 'Это'],
    answer: ['Это', 'рана']
  },
  {
    type: 'build-ru',
    speak: 'Это шрам',
    question: 'جمله روسی را بساز:',
    text: 'این جای زخم است',
    words: ['шрам', 'Это'],
    answer: ['Это', 'шрам']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'У меня аллергия',
    question: 'ترجمه را بساز:',
    text: 'У меня аллергия',
    words: ['دارم', 'حساسیت', 'من'],
    answer: ['من', 'حساسیت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Это инфекция',
    question: 'ترجمه را بساز:',
    text: 'Это инфекция',
    words: ['است', 'عفونت', 'این'],
    answer: ['این', 'عفونت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это травма',
    question: 'ترجمه را بساز:',
    text: 'Это травма',
    words: ['است', 'آسیب', 'این'],
    answer: ['این', 'آسیب', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это рана',
    question: 'ترجمه را بساز:',
    text: 'Это рана',
    words: ['است', 'زخم', 'این'],
    answer: ['این', 'زخم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это шрам',
    question: 'ترجمه را بساز:',
    text: 'Это шрам',
    words: ['است', 'جای زخم', 'این'],
    answer: ['این', 'جای زخم', 'است']
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