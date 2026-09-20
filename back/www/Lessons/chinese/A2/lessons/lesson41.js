let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
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
  recognition.lang = 'zh-CN';
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

// ===== سوالات درس ۴۱ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "心脏" است؟',
    speak: '心脏',
    options: [
      { text: '骨头', image: '../../../media/a2/health/bone.png' },
      { text: '心脏', image: '../../../media/a2/health/heart.png' },
      { text: '肌肉', image: '../../../media/a2/health/muscle.png' },
      { text: '皮肤', image: '../../../media/a2/health/skin.png' }
    ],
    answer: '心脏'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "骨头" است؟',
    speak: '骨头',
    options: [
      { text: '心脏', image: '../../../media/a2/health/heart.png' },
      { text: '骨头', image: '../../../media/a2/health/bone.png' },
      { text: '血液', image: '../../../media/a2/health/blood.png' },
      { text: '肌肉', image: '../../../media/a2/health/muscle.png' }
    ],
    answer: '骨头'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "肌肉" است؟',
    speak: '肌肉',
    options: [
      { text: '皮肤', image: '../../../media/a2/health/skin.png' },
      { text: '心脏', image: '../../../media/a2/health/heart.png' },
      { text: '肌肉', image: '../../../media/a2/health/muscle.png' },
      { text: '骨头', image: '../../../media/a2/health/bone.png' }
    ],
    answer: '肌肉'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "皮肤" است؟',
    speak: '皮肤',
    options: [
      { text: '皮肤', image: '../../../media/a2/health/skin.png' },
      { text: '血液', image: '../../../media/a2/health/blood.png' },
      { text: '骨头', image: '../../../media/a2/health/bone.png' },
      { text: '心脏', image: '../../../media/a2/health/heart.png' }
    ],
    answer: '皮肤'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "血液" است؟',
    speak: '血液',
    options: [
      { text: '肌肉', image: '../../../media/a2/health/muscle.png' },
      { text: '血液', image: '../../../media/a2/health/blood.png' },
      { text: '皮肤', image: '../../../media/a2/health/skin.png' },
      { text: '骨头', image: '../../../media/a2/health/bone.png' }
    ],
    answer: '血液'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/heart.png',
    options: ['骨头', '心脏', '肌肉', '皮肤'],
    answer: '心脏'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/bone.png',
    options: ['心脏', '骨头', '血液', '肌肉'],
    answer: '骨头'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/muscle.png',
    options: ['皮肤', '心脏', '肌肉', '骨头'],
    answer: '肌肉'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/skin.png',
    options: ['皮肤', '血液', '骨头', '心脏'],
    answer: '皮肤'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/blood.png',
    options: ['肌肉', '血液', '皮肤', '骨头'],
    answer: '血液'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '心脏',
    question: 'کدام کلمه را شنیدی؟',
    options: ['骨头', '心脏', '肌肉', '皮肤'],
    answer: '心脏'
  },
  {
    type: 'audio',
    speak: '骨头',
    question: 'کدام کلمه را شنیدی؟',
    options: ['心脏', '骨头', '血液', '肌肉'],
    answer: '骨头'
  },
  {
    type: 'audio',
    speak: '肌肉',
    question: 'کدام کلمه را شنیدی؟',
    options: ['皮肤', '心脏', '肌肉', '骨头'],
    answer: '肌肉'
  },
  {
    type: 'audio',
    speak: '皮肤',
    question: 'کدام کلمه را شنیدی؟',
    options: ['皮肤', '血液', '骨头', '心脏'],
    answer: '皮肤'
  },
  {
    type: 'audio',
    speak: '血液',
    question: 'کدام کلمه را شنیدی؟',
    options: ['肌肉', '血液', '皮肤', '骨头'],
    answer: '血液'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '心脏',
    image: '../../../media/a2/health/heart.png',
    meaning: 'قلب'
  },
  {
    type: 'speak',
    word: '骨头',
    image: '../../../media/a2/health/bone.png',
    meaning: 'استخوان'
  },
  {
    type: 'speak',
    word: '肌肉',
    image: '../../../media/a2/health/muscle.png',
    meaning: 'عضله'
  },
  {
    type: 'speak',
    word: '皮肤',
    image: '../../../media/a2/health/skin.png',
    meaning: 'پوست'
  },
  {
    type: 'speak',
    word: '血液',
    image: '../../../media/a2/health/blood.png',
    meaning: 'خون'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是心脏',
    question: 'جمله چینی را بساز:',
    text: 'این قلب است',
    words: ['心脏', '这', '是'],
    answer: ['这', '是', '心脏']
  },
  {
    type: 'build-en',
    speak: '这是骨头',
    question: 'جمله چینی را بساز:',
    text: 'این استخوان است',
    words: ['骨头', '这', '是'],
    answer: ['这', '是', '骨头']
  },
  {
    type: 'build-en',
    speak: '这是肌肉',
    question: 'جمله چینی را بساز:',
    text: 'این عضله است',
    words: ['肌肉', '这', '是'],
    answer: ['这', '是', '肌肉']
  },
  {
    type: 'build-en',
    speak: '这是皮肤',
    question: 'جمله چینی را بساز:',
    text: 'این پوست است',
    words: ['皮肤', '这', '是'],
    answer: ['这', '是', '皮肤']
  },
  {
    type: 'build-en',
    speak: '这是血液',
    question: 'جمله چینی را بساز:',
    text: 'این خون است',
    words: ['血液', '这', '是'],
    answer: ['这', '是', '血液']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是心脏',
    question: 'ترجمه را بساز:',
    text: '这是心脏',
    words: ['است', 'قلب', 'این'],
    answer: ['این', 'قلب', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是骨头',
    question: 'ترجمه را بساز:',
    text: '这是骨头',
    words: ['است', 'استخوان', 'این'],
    answer: ['این', 'استخوان', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是肌肉',
    question: 'ترجمه را بساز:',
    text: '这是肌肉',
    words: ['است', 'عضله', 'این'],
    answer: ['این', 'عضله', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是皮肤',
    question: 'ترجمه را بساز:',
    text: '这是皮肤',
    words: ['است', 'پوست', 'این'],
    answer: ['این', 'پوست', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是血液',
    question: 'ترجمه را بساز:',
    text: '这是血液',
    words: ['است', 'خون', 'این'],
    answer: ['این', 'خون', 'است']
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
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

    if (q.type === 'build-en') {
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