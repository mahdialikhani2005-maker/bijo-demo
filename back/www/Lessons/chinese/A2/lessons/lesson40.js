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

// ===== سوالات درس ۴۰ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "彩虹" است؟',
    speak: '彩虹',
    options: [
      { text: '微风', image: '../../../media/a2/nature/breeze.png' },
      { text: '彩虹', image: '../../../media/a2/nature/rainbow.png' },
      { text: '洪水', image: '../../../media/a2/nature/flood.png' },
      { text: '干旱', image: '../../../media/a2/nature/drought.png' }
    ],
    answer: '彩虹'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "微风" است؟',
    speak: '微风',
    options: [
      { text: '彩虹', image: '../../../media/a2/nature/rainbow.png' },
      { text: '微风', image: '../../../media/a2/nature/breeze.png' },
      { text: '地震', image: '../../../media/a2/nature/earthquake.png' },
      { text: '洪水', image: '../../../media/a2/nature/flood.png' }
    ],
    answer: '微风'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "洪水" است؟',
    speak: '洪水',
    options: [
      { text: '干旱', image: '../../../media/a2/nature/drought.png' },
      { text: '彩虹', image: '../../../media/a2/nature/rainbow.png' },
      { text: '洪水', image: '../../../media/a2/nature/flood.png' },
      { text: '微风', image: '../../../media/a2/nature/breeze.png' }
    ],
    answer: '洪水'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "干旱" است؟',
    speak: '干旱',
    options: [
      { text: '干旱', image: '../../../media/a2/nature/drought.png' },
      { text: '地震', image: '../../../media/a2/nature/earthquake.png' },
      { text: '微风', image: '../../../media/a2/nature/breeze.png' },
      { text: '彩虹', image: '../../../media/a2/nature/rainbow.png' }
    ],
    answer: '干旱'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "地震" است؟',
    speak: '地震',
    options: [
      { text: '洪水', image: '../../../media/a2/nature/flood.png' },
      { text: '地震', image: '../../../media/a2/nature/earthquake.png' },
      { text: '干旱', image: '../../../media/a2/nature/drought.png' },
      { text: '微风', image: '../../../media/a2/nature/breeze.png' }
    ],
    answer: '地震'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/rainbow.png',
    options: ['微风', '彩虹', '洪水', '干旱'],
    answer: '彩虹'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/breeze.png',
    options: ['彩虹', '微风', '地震', '洪水'],
    answer: '微风'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/flood.png',
    options: ['干旱', '彩虹', '洪水', '微风'],
    answer: '洪水'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/drought.png',
    options: ['干旱', '地震', '微风', '彩虹'],
    answer: '干旱'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/earthquake.png',
    options: ['洪水', '地震', '干旱', '微风'],
    answer: '地震'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '彩虹',
    question: 'کدام کلمه را شنیدی؟',
    options: ['微风', '彩虹', '洪水', '干旱'],
    answer: '彩虹'
  },
  {
    type: 'audio',
    speak: '微风',
    question: 'کدام کلمه را شنیدی؟',
    options: ['彩虹', '微风', '地震', '洪水'],
    answer: '微风'
  },
  {
    type: 'audio',
    speak: '洪水',
    question: 'کدام کلمه را شنیدی؟',
    options: ['干旱', '彩虹', '洪水', '微风'],
    answer: '洪水'
  },
  {
    type: 'audio',
    speak: '干旱',
    question: 'کدام کلمه را شنیدی؟',
    options: ['干旱', '地震', '微风', '彩虹'],
    answer: '干旱'
  },
  {
    type: 'audio',
    speak: '地震',
    question: 'کدام کلمه را شنیدی؟',
    options: ['洪水', '地震', '干旱', '微风'],
    answer: '地震'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '彩虹',
    image: '../../../media/a2/nature/rainbow.png',
    meaning: 'رنگین‌کمان'
  },
  {
    type: 'speak',
    word: '微风',
    image: '../../../media/a2/nature/breeze.png',
    meaning: 'نسیم'
  },
  {
    type: 'speak',
    word: '洪水',
    image: '../../../media/a2/nature/flood.png',
    meaning: 'سیل'
  },
  {
    type: 'speak',
    word: '干旱',
    image: '../../../media/a2/nature/drought.png',
    meaning: 'خشکسالی'
  },
  {
    type: 'speak',
    word: '地震',
    image: '../../../media/a2/nature/earthquake.png',
    meaning: 'زلزله'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是彩虹',
    question: 'جمله چینی را بساز:',
    text: 'این رنگین‌کمان است',
    words: ['彩虹', '这', '是'],
    answer: ['这', '是', '彩虹']
  },
  {
    type: 'build-en',
    speak: '这是微风',
    question: 'جمله چینی را بساز:',
    text: 'این نسیم است',
    words: ['微风', '这', '是'],
    answer: ['这', '是', '微风']
  },
  {
    type: 'build-en',
    speak: '这是洪水',
    question: 'جمله چینی را بساز:',
    text: 'این سیل است',
    words: ['洪水', '这', '是'],
    answer: ['这', '是', '洪水']
  },
  {
    type: 'build-en',
    speak: '这是干旱',
    question: 'جمله چینی را بساز:',
    text: 'این خشکسالی است',
    words: ['干旱', '这', '是'],
    answer: ['这', '是', '干旱']
  },
  {
    type: 'build-en',
    speak: '这是地震',
    question: 'جمله چینی را بساز:',
    text: 'این زلزله است',
    words: ['地震', '这', '是'],
    answer: ['这', '是', '地震']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是彩虹',
    question: 'ترجمه را بساز:',
    text: '这是彩虹',
    words: ['است', 'رنگین‌کمان', 'این'],
    answer: ['این', 'رنگین‌کمان', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是微风',
    question: 'ترجمه را بساز:',
    text: '这是微风',
    words: ['است', 'نسیم', 'این'],
    answer: ['این', 'نسیم', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是洪水',
    question: 'ترجمه را بساز:',
    text: '这是洪水',
    words: ['است', 'سیل', 'این'],
    answer: ['این', 'سیل', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是干旱',
    question: 'ترجمه را بساز:',
    text: '这是干旱',
    words: ['است', 'خشکسالی', 'این'],
    answer: ['این', 'خشکسالی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是地震',
    question: 'ترجمه را بساز:',
    text: '这是地震',
    words: ['است', 'زلزله', 'این'],
    answer: ['این', 'زلزله', 'است']
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