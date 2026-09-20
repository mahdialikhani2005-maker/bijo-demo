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

// ===== سوالات درس ۵۲ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "背包" است؟',
    speak: '背包',
    options: [
      { text: '帐篷', image: '../../../media/a2/travel/tent.png' },
      { text: '背包', image: '../../../media/a2/travel/backpack.png' },
      { text: '指南针', image: '../../../media/a2/travel/compass.png' },
      { text: '双筒望远镜', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: '背包'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "帐篷" است؟',
    speak: '帐篷',
    options: [
      { text: '背包', image: '../../../media/a2/travel/backpack.png' },
      { text: '帐篷', image: '../../../media/a2/travel/tent.png' },
      { text: '防晒霜', image: '../../../media/a2/travel/sunscreen.png' },
      { text: '指南针', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: '帐篷'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "指南针" است؟',
    speak: '指南针',
    options: [
      { text: '双筒望远镜', image: '../../../media/a2/travel/binoculars.png' },
      { text: '背包', image: '../../../media/a2/travel/backpack.png' },
      { text: '指南针', image: '../../../media/a2/travel/compass.png' },
      { text: '帐篷', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: '指南针'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "双筒望远镜" است؟',
    speak: '双筒望远镜',
    options: [
      { text: '双筒望远镜', image: '../../../media/a2/travel/binoculars.png' },
      { text: '防晒霜', image: '../../../media/a2/travel/sunscreen.png' },
      { text: '帐篷', image: '../../../media/a2/travel/tent.png' },
      { text: '背包', image: '../../../media/a2/travel/backpack.png' }
    ],
    answer: '双筒望远镜'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "防晒霜" است؟',
    speak: '防晒霜',
    options: [
      { text: '指南针', image: '../../../media/a2/travel/compass.png' },
      { text: '防晒霜', image: '../../../media/a2/travel/sunscreen.png' },
      { text: '双筒望远镜', image: '../../../media/a2/travel/binoculars.png' },
      { text: '帐篷', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: '防晒霜'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['帐篷', '背包', '指南针', '双筒望远镜'],
    answer: '背包'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['背包', '帐篷', '防晒霜', '指南针'],
    answer: '帐篷'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['双筒望远镜', '背包', '指南针', '帐篷'],
    answer: '指南针'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['双筒望远镜', '防晒霜', '帐篷', '背包'],
    answer: '双筒望远镜'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['指南针', '防晒霜', '双筒望远镜', '帐篷'],
    answer: '防晒霜'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '背包',
    question: 'کدام کلمه را شنیدی؟',
    options: ['帐篷', '背包', '指南针', '双筒望远镜'],
    answer: '背包'
  },
  {
    type: 'audio',
    speak: '帐篷',
    question: 'کدام کلمه را شنیدی؟',
    options: ['背包', '帐篷', '防晒霜', '指南针'],
    answer: '帐篷'
  },
  {
    type: 'audio',
    speak: '指南针',
    question: 'کدام کلمه را شنیدی؟',
    options: ['双筒望远镜', '背包', '指南针', '帐篷'],
    answer: '指南针'
  },
  {
    type: 'audio',
    speak: '双筒望远镜',
    question: 'کدام کلمه را شنیدی؟',
    options: ['双筒望远镜', '防晒霜', '帐篷', '背包'],
    answer: '双筒望远镜'
  },
  {
    type: 'audio',
    speak: '防晒霜',
    question: 'کدام کلمه را شنیدی؟',
    options: ['指南针', '防晒霜', '双筒望远镜', '帐篷'],
    answer: '防晒霜'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '背包',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: '帐篷',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: '指南针',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: '双筒望远镜',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: '防晒霜',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是背包',
    question: 'جمله چینی را بساز:',
    text: 'این کوله پشتی است',
    words: ['背包', '这', '是'],
    answer: ['这', '是', '背包']
  },
  {
    type: 'build-en',
    speak: '这是帐篷',
    question: 'جمله چینی را بساز:',
    text: 'این چادر است',
    words: ['帐篷', '这', '是'],
    answer: ['这', '是', '帐篷']
  },
  {
    type: 'build-en',
    speak: '这是指南针',
    question: 'جمله چینی را بساز:',
    text: 'این قطب‌نما است',
    words: ['指南针', '这', '是'],
    answer: ['这', '是', '指南针']
  },
  {
    type: 'build-en',
    speak: '这是双筒望远镜',
    question: 'جمله چینی را بساز:',
    text: 'این دوربین دوچشمی است',
    words: ['双筒望远镜', '这', '是'],
    answer: ['这', '是', '双筒望远镜']
  },
  {
    type: 'build-en',
    speak: '这是防晒霜',
    question: 'جمله چینی را بساز:',
    text: 'این کرم ضدآفتاب است',
    words: ['防晒霜', '这', '是'],
    answer: ['这', '是', '防晒霜']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是背包',
    question: 'ترجمه را بساز:',
    text: '这是背包',
    words: ['است', 'کوله پشتی', 'این'],
    answer: ['این', 'کوله پشتی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是帐篷',
    question: 'ترجمه را بساز:',
    text: '这是帐篷',
    words: ['است', 'چادر', 'این'],
    answer: ['این', 'چادر', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是指南针',
    question: 'ترجمه را بساز:',
    text: '这是指南针',
    words: ['است', 'قطب‌نما', 'این'],
    answer: ['این', 'قطب‌نما', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是双筒望远镜',
    question: 'ترجمه را بساز:',
    text: '这是双筒望远镜',
    words: ['است', 'دوربین دوچشمی', 'این'],
    answer: ['این', 'دوربین دوچشمی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是防晒霜',
    question: 'ترجمه را بساز:',
    text: '这是防晒霜',
    words: ['است', 'کرم ضدآفتاب', 'این'],
    answer: ['این', 'کرم ضدآفتاب', 'است']
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