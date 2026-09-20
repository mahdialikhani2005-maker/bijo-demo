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

// ===== سوالات درس ۹ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "水壶" است؟',
    speak: '水壶',
    options: [
      { text: '烤面包机', image: '../../../media/a2/house/toaster.png' },
      { text: '水壶', image: '../../../media/a2/house/kettle.png' },
      { text: '搅拌机', image: '../../../media/a2/house/blender.png' },
      { text: '微波炉', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: '水壶'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "烤面包机" است؟',
    speak: '烤面包机',
    options: [
      { text: '水壶', image: '../../../media/a2/house/kettle.png' },
      { text: '烤面包机', image: '../../../media/a2/house/toaster.png' },
      { text: '洗碗机', image: '../../../media/a2/house/dishwasher.png' },
      { text: '搅拌机', image: '../../../media/a2/house/blender.png' }
    ],
    answer: '烤面包机'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "搅拌机" است؟',
    speak: '搅拌机',
    options: [
      { text: '微波炉', image: '../../../media/a2/house/microwave.png' },
      { text: '水壶', image: '../../../media/a2/house/kettle.png' },
      { text: '搅拌机', image: '../../../media/a2/house/blender.png' },
      { text: '烤面包机', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: '搅拌机'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "微波炉" است؟',
    speak: '微波炉',
    options: [
      { text: '微波炉', image: '../../../media/a2/house/microwave.png' },
      { text: '洗碗机', image: '../../../media/a2/house/dishwasher.png' },
      { text: '烤面包机', image: '../../../media/a2/house/toaster.png' },
      { text: '水壶', image: '../../../media/a2/house/kettle.png' }
    ],
    answer: '微波炉'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "洗碗机" است؟',
    speak: '洗碗机',
    options: [
      { text: '搅拌机', image: '../../../media/a2/house/blender.png' },
      { text: '洗碗机', image: '../../../media/a2/house/dishwasher.png' },
      { text: '微波炉', image: '../../../media/a2/house/microwave.png' },
      { text: '烤面包机', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: '洗碗机'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/kettle.png',
    options: ['烤面包机', '水壶', '搅拌机', '微波炉'],
    answer: '水壶'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/toaster.png',
    options: ['水壶', '烤面包机', '洗碗机', '搅拌机'],
    answer: '烤面包机'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blender.png',
    options: ['微波炉', '水壶', '搅拌机', '烤面包机'],
    answer: '搅拌机'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/microwave.png',
    options: ['微波炉', '洗碗机', '烤面包机', '水壶'],
    answer: '微波炉'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/dishwasher.png',
    options: ['搅拌机', '洗碗机', '微波炉', '烤面包机'],
    answer: '洗碗机'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '水壶',
    question: 'کدام کلمه را شنیدی؟',
    options: ['烤面包机', '水壶', '搅拌机', '微波炉'],
    answer: '水壶'
  },
  {
    type: 'audio',
    speak: '烤面包机',
    question: 'کدام کلمه را شنیدی؟',
    options: ['水壶', '烤面包机', '洗碗机', '搅拌机'],
    answer: '烤面包机'
  },
  {
    type: 'audio',
    speak: '搅拌机',
    question: 'کدام کلمه را شنیدی؟',
    options: ['微波炉', '水壶', '搅拌机', '烤面包机'],
    answer: '搅拌机'
  },
  {
    type: 'audio',
    speak: '微波炉',
    question: 'کدام کلمه را شنیدی؟',
    options: ['微波炉', '洗碗机', '烤面包机', '水壶'],
    answer: '微波炉'
  },
  {
    type: 'audio',
    speak: '洗碗机',
    question: 'کدام کلمه را شنیدی؟',
    options: ['搅拌机', '洗碗机', '微波炉', '烤面包机'],
    answer: '洗碗机'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '水壶',
    image: '../../../media/a2/house/kettle.png',
    meaning: 'کتری'
  },
  {
    type: 'speak',
    word: '烤面包机',
    image: '../../../media/a2/house/toaster.png',
    meaning: 'توستر'
  },
  {
    type: 'speak',
    word: '搅拌机',
    image: '../../../media/a2/house/blender.png',
    meaning: 'مخلوط‌کن'
  },
  {
    type: 'speak',
    word: '微波炉',
    image: '../../../media/a2/house/microwave.png',
    meaning: 'مایکروویو'
  },
  {
    type: 'speak',
    word: '洗碗机',
    image: '../../../media/a2/house/dishwasher.png',
    meaning: 'ماشین ظرفشویی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是水壶',
    question: 'جمله چینی را بساز:',
    text: 'این کتری است',
    words: ['水壶', '这', '是'],
    answer: ['这', '是', '水壶']
  },
  {
    type: 'build-en',
    speak: '这是烤面包机',
    question: 'جمله چینی را بساز:',
    text: 'این توستر است',
    words: ['烤面包机', '这', '是'],
    answer: ['这', '是', '烤面包机']
  },
  {
    type: 'build-en',
    speak: '这是搅拌机',
    question: 'جمله چینی را بساز:',
    text: 'این مخلوط‌کن است',
    words: ['搅拌机', '这', '是'],
    answer: ['这', '是', '搅拌机']
  },
  {
    type: 'build-en',
    speak: '这是微波炉',
    question: 'جمله چینی را بساز:',
    text: 'این مایکروویو است',
    words: ['微波炉', '这', '是'],
    answer: ['这', '是', '微波炉']
  },
  {
    type: 'build-en',
    speak: '这是洗碗机',
    question: 'جمله چینی را بساز:',
    text: 'این ماشین ظرفشویی است',
    words: ['洗碗机', '这', '是'],
    answer: ['这', '是', '洗碗机']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是水壶',
    question: 'ترجمه را بساز:',
    text: '这是水壶',
    words: ['است', 'کتری', 'این'],
    answer: ['این', 'کتری', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是烤面包机',
    question: 'ترجمه را بساز:',
    text: '这是烤面包机',
    words: ['است', 'توستر', 'این'],
    answer: ['این', 'توستر', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是搅拌机',
    question: 'ترجمه را بساز:',
    text: '这是搅拌机',
    words: ['است', 'مخلوط‌کن', 'این'],
    answer: ['این', 'مخلوط‌کن', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是微波炉',
    question: 'ترجمه را بساز:',
    text: '这是微波炉',
    words: ['است', 'مایکروویو', 'این'],
    answer: ['این', 'مایکروویو', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是洗碗机',
    question: 'ترجمه را بساز:',
    text: '这是洗碗机',
    words: ['است', 'ماشین ظرفشویی', 'این'],
    answer: ['این', 'ماشین ظرفشویی', 'است']
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