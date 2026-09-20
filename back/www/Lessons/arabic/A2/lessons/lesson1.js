let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
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
  recognition.lang = 'en-US';
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
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    if (transcript === targetWord.toLowerCase()) {
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

// ===== سوالات درس ۱ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'uncle کدام است؟',
    speak: 'uncle',
    options: [
      { text: 'aunt', image: '../../../media/a2/family/aunt.png' },
      { text: 'uncle', image: '../../../media/a2/family/uncle.png' },
      { text: 'cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'nephew', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: 'uncle'
  },
  {
    type: 'image',
    question: 'aunt کدام است؟',
    speak: 'aunt',
    options: [
      { text: 'cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'aunt', image: '../../../media/a2/family/aunt.png' },
      { text: 'niece', image: '../../../media/a2/family/niece.png' },
      { text: 'uncle', image: '../../../media/a2/family/uncle.png' }
    ],
    answer: 'aunt'
  },
  {
    type: 'image',
    question: 'cousin کدام است؟',
    speak: 'cousin',
    options: [
      { text: 'uncle', image: '../../../media/a2/family/uncle.png' },
      { text: 'cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'nephew', image: '../../../media/a2/family/nephew.png' },
      { text: 'aunt', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: 'cousin'
  },
  {
    type: 'image',
    question: 'nephew کدام است؟',
    speak: 'nephew',
    options: [
      { text: 'nephew', image: '../../../media/a2/family/nephew.png' },
      { text: 'aunt', image: '../../../media/a2/family/aunt.png' },
      { text: 'uncle', image: '../../../media/a2/family/uncle.png' },
      { text: 'cousin', image: '../../../media/a2/family/cousin.png' }
    ],
    answer: 'nephew'
  },
  {
    type: 'image',
    question: 'niece کدام است؟',
    speak: 'niece',
    options: [
      { text: 'cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'uncle', image: '../../../media/a2/family/uncle.png' },
      { text: 'niece', image: '../../../media/a2/family/niece.png' },
      { text: 'aunt', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: 'niece'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/uncle.png',
    options: ['aunt', 'uncle', 'cousin', 'nephew'],
    answer: 'uncle'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/aunt.png',
    options: ['uncle', 'aunt', 'niece', 'cousin'],
    answer: 'aunt'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/cousin.png',
    options: ['uncle', 'cousin', 'nephew', 'aunt'],
    answer: 'cousin'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/nephew.png',
    options: ['nephew', 'aunt', 'uncle', 'cousin'],
    answer: 'nephew'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/niece.png',
    options: ['cousin', 'uncle', 'niece', 'aunt'],
    answer: 'niece'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'uncle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['uncle', 'aunt', 'cousin', 'nephew'],
    answer: 'uncle'
  },
  {
    type: 'audio',
    speak: 'aunt',
    question: 'کدام کلمه را شنیدی؟',
    options: ['cousin', 'aunt', 'niece', 'uncle'],
    answer: 'aunt'
  },
  {
    type: 'audio',
    speak: 'cousin',
    question: 'کدام کلمه را شنیدی؟',
    options: ['uncle', 'cousin', 'nephew', 'aunt'],
    answer: 'cousin'
  },
  {
    type: 'audio',
    speak: 'nephew',
    question: 'کدام کلمه را شنیدی؟',
    options: ['nephew', 'aunt', 'uncle', 'cousin'],
    answer: 'nephew'
  },
  {
    type: 'audio',
    speak: 'niece',
    question: 'کدام کلمه را شنیدی؟',
    options: ['cousin', 'uncle', 'niece', 'aunt'],
    answer: 'niece'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'uncle',
    image: '../../../media/a2/family/uncle.png',
    meaning: 'عمو/دایی'
  },
  {
    type: 'speak',
    word: 'aunt',
    image: '../../../media/a2/family/aunt.png',
    meaning: 'عمه/خاله'
  },
  {
    type: 'speak',
    word: 'cousin',
    image: '../../../media/a2/family/cousin.png',
    meaning: 'پسرعمو/دخترعمو'
  },
  {
    type: 'speak',
    word: 'nephew',
    image: '../../../media/a2/family/nephew.png',
    meaning: 'برادرزاده'
  },
  {
    type: 'speak',
    word: 'niece',
    image: '../../../media/a2/family/niece.png',
    meaning: 'خواهرزاده'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'He is my uncle',
    question: 'جمله انگلیسی را بساز:',
    text: 'او عموی من است',
    words: ['uncle', 'my', 'is', 'He'],
    answer: ['He', 'is', 'my', 'uncle']
  },
  {
    type: 'build-en',
    speak: 'She is my aunt',
    question: 'جمله انگلیسی را بساز:',
    text: 'او عمه‌ی من است',
    words: ['aunt', 'my', 'is', 'She'],
    answer: ['She', 'is', 'my', 'aunt']
  },
  {
    type: 'build-en',
    speak: 'He is my cousin',
    question: 'جمله انگلیسی را بساز:',
    text: 'او پسرعموی من است',
    words: ['cousin', 'my', 'is', 'He'],
    answer: ['He', 'is', 'my', 'cousin']
  },
  {
    type: 'build-en',
    speak: 'He is my nephew',
    question: 'جمله انگلیسی را بساز:',
    text: 'او برادرزاده‌ی من است',
    words: ['nephew', 'my', 'is', 'He'],
    answer: ['He', 'is', 'my', 'nephew']
  },
  {
    type: 'build-en',
    speak: 'She is my niece',
    question: 'جمله انگلیسی را بساز:',
    text: 'او خواهرزاده‌ی من است',
    words: ['niece', 'my', 'is', 'She'],
    answer: ['She', 'is', 'my', 'niece']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'He is my uncle',
    question: 'ترجمه را بساز:',
    text: 'He is my uncle',
    words: ['است', 'عموی', 'او', 'من'],
    answer: ['او', 'عموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is my aunt',
    question: 'ترجمه را بساز:',
    text: 'She is my aunt',
    words: ['است', 'عمه‌ی', 'او', 'من'],
    answer: ['او', 'عمه‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is my cousin',
    question: 'ترجمه را بساز:',
    text: 'He is my cousin',
    words: ['است', 'پسرعموی', 'او', 'من'],
    answer: ['او', 'پسرعموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is my nephew',
    question: 'ترجمه را بساز:',
    text: 'He is my nephew',
    words: ['است', 'برادرزاده‌ی', 'او', 'من'],
    answer: ['او', 'برادرزاده‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is my niece',
    question: 'ترجمه را بساز:',
    text: 'She is my niece',
    words: ['است', 'خواهرزاده‌ی', 'او', 'من'],
    answer: ['او', 'خواهرزاده‌ی', 'من', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>درس تمام شد 🎉</h2>
      <p>XP دریافت‌شده: <b>${finalXP}</b></p>
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
  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('اشتباه بود! دوباره تلاش کن.');
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
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('اشتباه بود! دوباره تلاش کن.');
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
        <h2>قلب شما تمام شد 💔</h2>
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