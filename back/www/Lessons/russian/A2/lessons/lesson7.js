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

// ===== سوالات درس ۷ - روسی به فارسی (مبلمان ۲) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "штора" است؟',
    speak: 'штора',
    options: [
      { text: 'штора', image: '../../../media/a2/house/curtain.png' },
      { text: 'ковёр', image: '../../../media/a2/house/carpet.png' },
      { text: 'подушка', image: '../../../media/a2/house/pillow.png' },
      { text: 'одеяло', image: '../../../media/a2/house/blanket.png' }
    ],
    answer: 'штора'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ковёр" است؟',
    speak: 'ковёр',
    options: [
      { text: 'штора', image: '../../../media/a2/house/curtain.png' },
      { text: 'ковёр', image: '../../../media/a2/house/carpet.png' },
      { text: 'лампа', image: '../../../media/a2/house/lamp.png' },
      { text: 'подушка', image: '../../../media/a2/house/pillow.png' }
    ],
    answer: 'ковёр'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "подушка" است؟',
    speak: 'подушка',
    options: [
      { text: 'одеяло', image: '../../../media/a2/house/blanket.png' },
      { text: 'штора', image: '../../../media/a2/house/curtain.png' },
      { text: 'подушка', image: '../../../media/a2/house/pillow.png' },
      { text: 'ковёр', image: '../../../media/a2/house/carpet.png' }
    ],
    answer: 'подушка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "одеяло" است؟',
    speak: 'одеяло',
    options: [
      { text: 'штора', image: '../../../media/a2/house/curtain.png' },
      { text: 'одеяло', image: '../../../media/a2/house/blanket.png' },
      { text: 'ковёр', image: '../../../media/a2/house/carpet.png' },
      { text: 'лампа', image: '../../../media/a2/house/lamp.png' }
    ],
    answer: 'одеяло'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "лампа" است؟',
    speak: 'лампа',
    options: [
      { text: 'подушка', image: '../../../media/a2/house/pillow.png' },
      { text: 'одеяло', image: '../../../media/a2/house/blanket.png' },
      { text: 'лампа', image: '../../../media/a2/house/lamp.png' },
      { text: 'штора', image: '../../../media/a2/house/curtain.png' }
    ],
    answer: 'лампа'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/curtain.png',
    options: ['штора', 'ковёр', 'подушка', 'одеяло'],
    answer: 'штора'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/carpet.png',
    options: ['штора', 'ковёр', 'лампа', 'подушка'],
    answer: 'ковёр'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/pillow.png',
    options: ['одеяло', 'штора', 'подушка', 'ковёр'],
    answer: 'подушка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blanket.png',
    options: ['штора', 'одеяло', 'ковёр', 'лампа'],
    answer: 'одеяло'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/lamp.png',
    options: ['подушка', 'одеяло', 'лампа', 'штора'],
    answer: 'лампа'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'штора',
    question: 'کدام کلمه را شنیدی؟',
    options: ['штора', 'ковёр', 'подушка', 'одеяло'],
    answer: 'штора'
  },
  {
    type: 'audio',
    speak: 'ковёр',
    question: 'کدام کلمه را شنیدی؟',
    options: ['штора', 'ковёр', 'лампа', 'подушка'],
    answer: 'ковёр'
  },
  {
    type: 'audio',
    speak: 'подушка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['одеяло', 'штора', 'подушка', 'ковёр'],
    answer: 'подушка'
  },
  {
    type: 'audio',
    speak: 'одеяло',
    question: 'کدام کلمه را شنیدی؟',
    options: ['штора', 'одеяло', 'ковёр', 'лампа'],
    answer: 'одеяло'
  },
  {
    type: 'audio',
    speak: 'лампа',
    question: 'کدام کلمه را شنیدی؟',
    options: ['подушка', 'одеяло', 'лампа', 'штора'],
    answer: 'лампа'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'штора',
    image: '../../../media/a2/house/curtain.png',
    meaning: 'پرده'
  },
  {
    type: 'speak',
    word: 'ковёр',
    image: '../../../media/a2/house/carpet.png',
    meaning: 'فرش'
  },
  {
    type: 'speak',
    word: 'подушка',
    image: '../../../media/a2/house/pillow.png',
    meaning: 'بالش'
  },
  {
    type: 'speak',
    word: 'одеяло',
    image: '../../../media/a2/house/blanket.png',
    meaning: 'پتو'
  },
  {
    type: 'speak',
    word: 'лампа',
    image: '../../../media/a2/house/lamp.png',
    meaning: 'چراغ'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это штора',
    question: 'جمله روسی را بساز:',
    text: 'این پرده است',
    words: ['штора', 'Это'],
    answer: ['Это', 'штора']
  },
  {
    type: 'build-ru',
    speak: 'Это ковёр',
    question: 'جمله روسی را بساز:',
    text: 'این فرش است',
    words: ['ковёр', 'Это'],
    answer: ['Это', 'ковёр']
  },
  {
    type: 'build-ru',
    speak: 'Это подушка',
    question: 'جمله روسی را بساز:',
    text: 'این بالش است',
    words: ['подушка', 'Это'],
    answer: ['Это', 'подушка']
  },
  {
    type: 'build-ru',
    speak: 'Это одеяло',
    question: 'جمله روسی را بساز:',
    text: 'این پتو است',
    words: ['одеяло', 'Это'],
    answer: ['Это', 'одеяло']
  },
  {
    type: 'build-ru',
    speak: 'Это лампа',
    question: 'جمله روسی را بساز:',
    text: 'این چراغ است',
    words: ['лампа', 'Это'],
    answer: ['Это', 'лампа']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это штора',
    question: 'ترجمه را بساز:',
    text: 'Это штора',
    words: ['است', 'پرده', 'این'],
    answer: ['این', 'پرده', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это ковёр',
    question: 'ترجمه را بساز:',
    text: 'Это ковёр',
    words: ['است', 'فرش', 'این'],
    answer: ['این', 'فرش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это подушка',
    question: 'ترجمه را بساز:',
    text: 'Это подушка',
    words: ['است', 'بالش', 'این'],
    answer: ['این', 'بالش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это одеяло',
    question: 'ترجمه را بساز:',
    text: 'Это одеяло',
    words: ['است', 'پتو', 'این'],
    answer: ['این', 'پتو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это лампа',
    question: 'ترجمه را بساز:',
    text: 'Это лампа',
    words: ['است', 'چراغ', 'این'],
    answer: ['این', 'چراغ', 'است']
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