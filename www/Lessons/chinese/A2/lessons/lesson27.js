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

// ===== سوالات درس ۲۷ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "手镯" است؟',
    speak: '手镯',
    options: [
      { text: '耳环', image: '../../../media/a2/clothes/earring.png' },
      { text: '手镯', image: '../../../media/a2/clothes/bracelet.png' },
      { text: '戒指', image: '../../../media/a2/clothes/ring.png' },
      { text: '链子', image: '../../../media/a2/clothes/chain.png' }
    ],
    answer: '手镯'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "耳环" است؟',
    speak: '耳环',
    options: [
      { text: '手镯', image: '../../../media/a2/clothes/bracelet.png' },
      { text: '耳环', image: '../../../media/a2/clothes/earring.png' },
      { text: '皇冠', image: '../../../media/a2/clothes/crown.png' },
      { text: '戒指', image: '../../../media/a2/clothes/ring.png' }
    ],
    answer: '耳环'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "戒指" است؟',
    speak: '戒指',
    options: [
      { text: '链子', image: '../../../media/a2/clothes/chain.png' },
      { text: '手镯', image: '../../../media/a2/clothes/bracelet.png' },
      { text: '戒指', image: '../../../media/a2/clothes/ring.png' },
      { text: '耳环', image: '../../../media/a2/clothes/earring.png' }
    ],
    answer: '戒指'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "链子" است؟',
    speak: '链子',
    options: [
      { text: '链子', image: '../../../media/a2/clothes/chain.png' },
      { text: '皇冠', image: '../../../media/a2/clothes/crown.png' },
      { text: '耳环', image: '../../../media/a2/clothes/earring.png' },
      { text: '手镯', image: '../../../media/a2/clothes/bracelet.png' }
    ],
    answer: '链子'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "皇冠" است؟',
    speak: '皇冠',
    options: [
      { text: '戒指', image: '../../../media/a2/clothes/ring.png' },
      { text: '皇冠', image: '../../../media/a2/clothes/crown.png' },
      { text: '链子', image: '../../../media/a2/clothes/chain.png' },
      { text: '耳环', image: '../../../media/a2/clothes/earring.png' }
    ],
    answer: '皇冠'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bracelet.png',
    options: ['耳环', '手镯', '戒指', '链子'],
    answer: '手镯'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/earring.png',
    options: ['手镯', '耳环', '皇冠', '戒指'],
    answer: '耳环'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/ring.png',
    options: ['链子', '手镯', '戒指', '耳环'],
    answer: '戒指'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/chain.png',
    options: ['链子', '皇冠', '耳环', '手镯'],
    answer: '链子'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/crown.png',
    options: ['戒指', '皇冠', '链子', '耳环'],
    answer: '皇冠'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '手镯',
    question: 'کدام کلمه را شنیدی؟',
    options: ['耳环', '手镯', '戒指', '链子'],
    answer: '手镯'
  },
  {
    type: 'audio',
    speak: '耳环',
    question: 'کدام کلمه را شنیدی؟',
    options: ['手镯', '耳环', '皇冠', '戒指'],
    answer: '耳环'
  },
  {
    type: 'audio',
    speak: '戒指',
    question: 'کدام کلمه را شنیدی؟',
    options: ['链子', '手镯', '戒指', '耳环'],
    answer: '戒指'
  },
  {
    type: 'audio',
    speak: '链子',
    question: 'کدام کلمه را شنیدی؟',
    options: ['链子', '皇冠', '耳环', '手镯'],
    answer: '链子'
  },
  {
    type: 'audio',
    speak: '皇冠',
    question: 'کدام کلمه را شنیدی؟',
    options: ['戒指', '皇冠', '链子', '耳环'],
    answer: '皇冠'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '手镯',
    image: '../../../media/a2/clothes/bracelet.png',
    meaning: 'دستبند'
  },
  {
    type: 'speak',
    word: '耳环',
    image: '../../../media/a2/clothes/earring.png',
    meaning: 'گوشواره'
  },
  {
    type: 'speak',
    word: '戒指',
    image: '../../../media/a2/clothes/ring.png',
    meaning: 'حلقه'
  },
  {
    type: 'speak',
    word: '链子',
    image: '../../../media/a2/clothes/chain.png',
    meaning: 'زنجیر'
  },
  {
    type: 'speak',
    word: '皇冠',
    image: '../../../media/a2/clothes/crown.png',
    meaning: 'تاج'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是手镯',
    question: 'جمله چینی را بساز:',
    text: 'این دستبند است',
    words: ['手镯', '这', '是'],
    answer: ['这', '是', '手镯']
  },
  {
    type: 'build-en',
    speak: '这是耳环',
    question: 'جمله چینی را بساز:',
    text: 'این گوشواره است',
    words: ['耳环', '这', '是'],
    answer: ['这', '是', '耳环']
  },
  {
    type: 'build-en',
    speak: '这是戒指',
    question: 'جمله چینی را بساز:',
    text: 'این حلقه است',
    words: ['戒指', '这', '是'],
    answer: ['这', '是', '戒指']
  },
  {
    type: 'build-en',
    speak: '这是链子',
    question: 'جمله چینی را بساز:',
    text: 'این زنجیر است',
    words: ['链子', '这', '是'],
    answer: ['这', '是', '链子']
  },
  {
    type: 'build-en',
    speak: '这是皇冠',
    question: 'جمله چینی را بساز:',
    text: 'این تاج است',
    words: ['皇冠', '这', '是'],
    answer: ['这', '是', '皇冠']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是手镯',
    question: 'ترجمه را بساز:',
    text: '这是手镯',
    words: ['است', 'دستبند', 'این'],
    answer: ['این', 'دستبند', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是耳环',
    question: 'ترجمه را بساز:',
    text: '这是耳环',
    words: ['است', 'گوشواره', 'این'],
    answer: ['این', 'گوشواره', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是戒指',
    question: 'ترجمه را بساز:',
    text: '这是戒指',
    words: ['است', 'حلقه', 'این'],
    answer: ['این', 'حلقه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是链子',
    question: 'ترجمه را بساز:',
    text: '这是链子',
    words: ['است', 'زنجیر', 'این'],
    answer: ['این', 'زنجیر', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是皇冠',
    question: 'ترجمه را بساز:',
    text: '这是皇冠',
    words: ['است', 'تاج', 'این'],
    answer: ['این', 'تاج', 'است']
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