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

// ===== سوالات درس ۴۲ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "大脑" است؟',
    speak: '大脑',
    options: [
      { text: '神经', image: '../../../media/a2/health/nerve.png' },
      { text: '大脑', image: '../../../media/a2/health/brain.png' },
      { text: '静脉', image: '../../../media/a2/health/vein.png' },
      { text: '动脉', image: '../../../media/a2/health/artery.png' }
    ],
    answer: '大脑'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "神经" است؟',
    speak: '神经',
    options: [
      { text: '大脑', image: '../../../media/a2/health/brain.png' },
      { text: '神经', image: '../../../media/a2/health/nerve.png' },
      { text: '关节', image: '../../../media/a2/health/joint.png' },
      { text: '静脉', image: '../../../media/a2/health/vein.png' }
    ],
    answer: '神经'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "静脉" است؟',
    speak: '静脉',
    options: [
      { text: '动脉', image: '../../../media/a2/health/artery.png' },
      { text: '大脑', image: '../../../media/a2/health/brain.png' },
      { text: '静脉', image: '../../../media/a2/health/vein.png' },
      { text: '神经', image: '../../../media/a2/health/nerve.png' }
    ],
    answer: '静脉'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "动脉" است؟',
    speak: '动脉',
    options: [
      { text: '动脉', image: '../../../media/a2/health/artery.png' },
      { text: '关节', image: '../../../media/a2/health/joint.png' },
      { text: '神经', image: '../../../media/a2/health/nerve.png' },
      { text: '大脑', image: '../../../media/a2/health/brain.png' }
    ],
    answer: '动脉'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "关节" است؟',
    speak: '关节',
    options: [
      { text: '静脉', image: '../../../media/a2/health/vein.png' },
      { text: '关节', image: '../../../media/a2/health/joint.png' },
      { text: '动脉', image: '../../../media/a2/health/artery.png' },
      { text: '神经', image: '../../../media/a2/health/nerve.png' }
    ],
    answer: '关节'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/brain.png',
    options: ['神经', '大脑', '静脉', '动脉'],
    answer: '大脑'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/nerve.png',
    options: ['大脑', '神经', '关节', '静脉'],
    answer: '神经'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/vein.png',
    options: ['动脉', '大脑', '静脉', '神经'],
    answer: '静脉'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/artery.png',
    options: ['动脉', '关节', '神经', '大脑'],
    answer: '动脉'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/joint.png',
    options: ['静脉', '关节', '动脉', '神经'],
    answer: '关节'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '大脑',
    question: 'کدام کلمه را شنیدی؟',
    options: ['神经', '大脑', '静脉', '动脉'],
    answer: '大脑'
  },
  {
    type: 'audio',
    speak: '神经',
    question: 'کدام کلمه را شنیدی؟',
    options: ['大脑', '神经', '关节', '静脉'],
    answer: '神经'
  },
  {
    type: 'audio',
    speak: '静脉',
    question: 'کدام کلمه را شنیدی؟',
    options: ['动脉', '大脑', '静脉', '神经'],
    answer: '静脉'
  },
  {
    type: 'audio',
    speak: '动脉',
    question: 'کدام کلمه را شنیدی؟',
    options: ['动脉', '关节', '神经', '大脑'],
    answer: '动脉'
  },
  {
    type: 'audio',
    speak: '关节',
    question: 'کدام کلمه را شنیدی؟',
    options: ['静脉', '关节', '动脉', '神经'],
    answer: '关节'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '大脑',
    image: '../../../media/a2/health/brain.png',
    meaning: 'مغز'
  },
  {
    type: 'speak',
    word: '神经',
    image: '../../../media/a2/health/nerve.png',
    meaning: 'عصب'
  },
  {
    type: 'speak',
    word: '静脉',
    image: '../../../media/a2/health/vein.png',
    meaning: 'ورید'
  },
  {
    type: 'speak',
    word: '动脉',
    image: '../../../media/a2/health/artery.png',
    meaning: 'سرخرگ'
  },
  {
    type: 'speak',
    word: '关节',
    image: '../../../media/a2/health/joint.png',
    meaning: 'مفصل'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是大脑',
    question: 'جمله چینی را بساز:',
    text: 'این مغز است',
    words: ['大脑', '这', '是'],
    answer: ['这', '是', '大脑']
  },
  {
    type: 'build-en',
    speak: '这是神经',
    question: 'جمله چینی را بساز:',
    text: 'این عصب است',
    words: ['神经', '这', '是'],
    answer: ['这', '是', '神经']
  },
  {
    type: 'build-en',
    speak: '这是静脉',
    question: 'جمله چینی را بساز:',
    text: 'این ورید است',
    words: ['静脉', '这', '是'],
    answer: ['这', '是', '静脉']
  },
  {
    type: 'build-en',
    speak: '这是动脉',
    question: 'جمله چینی را بساز:',
    text: 'این سرخرگ است',
    words: ['动脉', '这', '是'],
    answer: ['这', '是', '动脉']
  },
  {
    type: 'build-en',
    speak: '这是关节',
    question: 'جمله چینی را بساز:',
    text: 'این مفصل است',
    words: ['关节', '这', '是'],
    answer: ['这', '是', '关节']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是大脑',
    question: 'ترجمه را بساز:',
    text: '这是大脑',
    words: ['است', 'مغز', 'این'],
    answer: ['این', 'مغز', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是神经',
    question: 'ترجمه را بساز:',
    text: '这是神经',
    words: ['است', 'عصب', 'این'],
    answer: ['این', 'عصب', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是静脉',
    question: 'ترجمه را بساز:',
    text: '这是静脉',
    words: ['است', 'ورید', 'این'],
    answer: ['این', 'ورید', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是动脉',
    question: 'ترجمه را بساز:',
    text: '这是动脉',
    words: ['است', 'سرخرگ', 'این'],
    answer: ['این', 'سرخرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是关节',
    question: 'ترجمه را بساز:',
    text: '这是关节',
    words: ['است', 'مفصل', 'این'],
    answer: ['این', 'مفصل', 'است']
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