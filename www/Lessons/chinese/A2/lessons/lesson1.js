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

// ===== سوالات درس ۱ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "叔叔 / 舅舅" است؟',
    speak: '叔叔 / 舅舅',
    options: [
      { text: '姑姑 / 阿姨', image: '../../../media/a2/family/aunt.png' },
      { text: '叔叔 / 舅舅', image: '../../../media/a2/family/uncle.png' },
      { text: '堂兄弟 / 表兄弟', image: '../../../media/a2/family/cousin.png' },
      { text: '侄子', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: '叔叔 / 舅舅'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "姑姑 / 阿姨" است؟',
    speak: '姑姑 / 阿姨',
    options: [
      { text: '堂兄弟 / 表兄弟', image: '../../../media/a2/family/cousin.png' },
      { text: '姑姑 / 阿姨', image: '../../../media/a2/family/aunt.png' },
      { text: '侄女', image: '../../../media/a2/family/niece.png' },
      { text: '叔叔 / 舅舅', image: '../../../media/a2/family/uncle.png' }
    ],
    answer: '姑姑 / 阿姨'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "堂兄弟 / 表兄弟" است؟',
    speak: '堂兄弟 / 表兄弟',
    options: [
      { text: '叔叔 / 舅舅', image: '../../../media/a2/family/uncle.png' },
      { text: '堂兄弟 / 表兄弟', image: '../../../media/a2/family/cousin.png' },
      { text: '侄子', image: '../../../media/a2/family/nephew.png' },
      { text: '姑姑 / 阿姨', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: '堂兄弟 / 表兄弟'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "侄子" است؟',
    speak: '侄子',
    options: [
      { text: '侄子', image: '../../../media/a2/family/nephew.png' },
      { text: '姑姑 / 阿姨', image: '../../../media/a2/family/aunt.png' },
      { text: '叔叔 / 舅舅', image: '../../../media/a2/family/uncle.png' },
      { text: '堂兄弟 / 表兄弟', image: '../../../media/a2/family/cousin.png' }
    ],
    answer: '侄子'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "侄女" است؟',
    speak: '侄女',
    options: [
      { text: '堂兄弟 / 表兄弟', image: '../../../media/a2/family/cousin.png' },
      { text: '叔叔 / 舅舅', image: '../../../media/a2/family/uncle.png' },
      { text: '侄女', image: '../../../media/a2/family/niece.png' },
      { text: '姑姑 / 阿姨', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: '侄女'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/uncle.png',
    options: ['姑姑 / 阿姨', '叔叔 / 舅舅', '堂兄弟 / 表兄弟', '侄子'],
    answer: '叔叔 / 舅舅'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/aunt.png',
    options: ['叔叔 / 舅舅', '姑姑 / 阿姨', '侄女', '堂兄弟 / 表兄弟'],
    answer: '姑姑 / 阿姨'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/cousin.png',
    options: ['叔叔 / 舅舅', '堂兄弟 / 表兄弟', '侄子', '姑姑 / 阿姨'],
    answer: '堂兄弟 / 表兄弟'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/nephew.png',
    options: ['侄子', '姑姑 / 阿姨', '叔叔 / 舅舅', '堂兄弟 / 表兄弟'],
    answer: '侄子'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/niece.png',
    options: ['堂兄弟 / 表兄弟', '叔叔 / 舅舅', '侄女', '姑姑 / 阿姨'],
    answer: '侄女'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '叔叔 / 舅舅',
    question: 'کدام کلمه را شنیدی؟',
    options: ['叔叔 / 舅舅', '姑姑 / 阿姨', '堂兄弟 / 表兄弟', '侄子'],
    answer: '叔叔 / 舅舅'
  },
  {
    type: 'audio',
    speak: '姑姑 / 阿姨',
    question: 'کدام کلمه را شنیدی؟',
    options: ['堂兄弟 / 表兄弟', '姑姑 / 阿姨', '侄女', '叔叔 / 舅舅'],
    answer: '姑姑 / 阿姨'
  },
  {
    type: 'audio',
    speak: '堂兄弟 / 表兄弟',
    question: 'کدام کلمه را شنیدی؟',
    options: ['叔叔 / 舅舅', '堂兄弟 / 表兄弟', '侄子', '姑姑 / 阿姨'],
    answer: '堂兄弟 / 表兄弟'
  },
  {
    type: 'audio',
    speak: '侄子',
    question: 'کدام کلمه را شنیدی؟',
    options: ['侄子', '姑姑 / 阿姨', '叔叔 / 舅舅', '堂兄弟 / 表兄弟'],
    answer: '侄子'
  },
  {
    type: 'audio',
    speak: '侄女',
    question: 'کدام کلمه را شنیدی؟',
    options: ['堂兄弟 / 表兄弟', '叔叔 / 舅舅', '侄女', '姑姑 / 阿姨'],
    answer: '侄女'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '叔叔 / 舅舅',
    image: '../../../media/a2/family/uncle.png',
    meaning: 'عمو / دایی'
  },
  {
    type: 'speak',
    word: '姑姑 / 阿姨',
    image: '../../../media/a2/family/aunt.png',
    meaning: 'عمه / خاله'
  },
  {
    type: 'speak',
    word: '堂兄弟 / 表兄弟',
    image: '../../../media/a2/family/cousin.png',
    meaning: 'پسرعمو / پسرخاله'
  },
  {
    type: 'speak',
    word: '侄子',
    image: '../../../media/a2/family/nephew.png',
    meaning: 'برادرزاده'
  },
  {
    type: 'speak',
    word: '侄女',
    image: '../../../media/a2/family/niece.png',
    meaning: 'خواهرزاده'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '他是我的叔叔',
    question: 'جمله چینی را بساز:',
    text: 'او عموی من است',
    words: ['叔叔', '我的', '他', '是'],
    answer: ['他', '是', '我的', '叔叔']
  },
  {
    type: 'build-en',
    speak: '她是我的姑姑',
    question: 'جمله چینی را بساز:',
    text: 'او عمه‌ی من است',
    words: ['姑姑', '我的', '她', '是'],
    answer: ['她', '是', '我的', '姑姑']
  },
  {
    type: 'build-en',
    speak: '他是我的堂兄弟',
    question: 'جمله چینی را بساز:',
    text: 'او پسرعموی من است',
    words: ['堂兄弟', '我的', '他', '是'],
    answer: ['他', '是', '我的', '堂兄弟']
  },
  {
    type: 'build-en',
    speak: '他是我的侄子',
    question: 'جمله چینی را بساز:',
    text: 'او برادرزاده‌ی من است',
    words: ['侄子', '我的', '他', '是'],
    answer: ['他', '是', '我的', '侄子']
  },
  {
    type: 'build-en',
    speak: '她是我的侄女',
    question: 'جمله چینی را بساز:',
    text: 'او خواهرزاده‌ی من است',
    words: ['侄女', '我的', '她', '是'],
    answer: ['她', '是', '我的', '侄女']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '他是我的叔叔',
    question: 'ترجمه را بساز:',
    text: '他是我的叔叔',
    words: ['است', 'عموی', 'او', 'من'],
    answer: ['او', 'عموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '她是我的姑姑',
    question: 'ترجمه را بساز:',
    text: '她是我的姑姑',
    words: ['است', 'عمه‌ی', 'او', 'من'],
    answer: ['او', 'عمه‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '他是我的堂兄弟',
    question: 'ترجمه را بساز:',
    text: '他是我的堂兄弟',
    words: ['است', 'پسرعموی', 'او', 'من'],
    answer: ['او', 'پسرعموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '他是我的侄子',
    question: 'ترجمه را بساز:',
    text: '他是我的侄子',
    words: ['است', 'برادرزاده‌ی', 'او', 'من'],
    answer: ['او', 'برادرزاده‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '她是我的侄女',
    question: 'ترجمه را بساز:',
    text: '她是我的侄女',
    words: ['است', 'خواهرزاده‌ی', 'او', 'من'],
    answer: ['او', 'خواهرزاده‌ی', 'من', 'است']
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