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

// ===== سوالات درس ۳۱ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "出租车" است؟',
    speak: '出租车',
    options: [
      { text: '船', image: '../../../media/a2/vehicles/boat.png' },
      { text: '出租车', image: '../../../media/a2/vehicles/taxi.png' },
      { text: '摩托车', image: '../../../media/a2/vehicles/motorcycle.png' },
      { text: '直升机', image: '../../../media/a2/vehicles/helicopter.png' }
    ],
    answer: '出租车'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "船" است؟',
    speak: '船',
    options: [
      { text: '出租车', image: '../../../media/a2/vehicles/taxi.png' },
      { text: '船', image: '../../../media/a2/vehicles/boat.png' },
      { text: '卡车', image: '../../../media/a2/vehicles/truck.png' },
      { text: '摩托车', image: '../../../media/a2/vehicles/motorcycle.png' }
    ],
    answer: '船'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "摩托车" است؟',
    speak: '摩托车',
    options: [
      { text: '直升机', image: '../../../media/a2/vehicles/helicopter.png' },
      { text: '出租车', image: '../../../media/a2/vehicles/taxi.png' },
      { text: '摩托车', image: '../../../media/a2/vehicles/motorcycle.png' },
      { text: '船', image: '../../../media/a2/vehicles/boat.png' }
    ],
    answer: '摩托车'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "直升机" است؟',
    speak: '直升机',
    options: [
      { text: '直升机', image: '../../../media/a2/vehicles/helicopter.png' },
      { text: '卡车', image: '../../../media/a2/vehicles/truck.png' },
      { text: '船', image: '../../../media/a2/vehicles/boat.png' },
      { text: '出租车', image: '../../../media/a2/vehicles/taxi.png' }
    ],
    answer: '直升机'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "卡车" است؟',
    speak: '卡车',
    options: [
      { text: '摩托车', image: '../../../media/a2/vehicles/motorcycle.png' },
      { text: '卡车', image: '../../../media/a2/vehicles/truck.png' },
      { text: '直升机', image: '../../../media/a2/vehicles/helicopter.png' },
      { text: '船', image: '../../../media/a2/vehicles/boat.png' }
    ],
    answer: '卡车'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/taxi.png',
    options: ['船', '出租车', '摩托车', '直升机'],
    answer: '出租车'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/boat.png',
    options: ['出租车', '船', '卡车', '摩托车'],
    answer: '船'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/motorcycle.png',
    options: ['直升机', '出租车', '摩托车', '船'],
    answer: '摩托车'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/helicopter.png',
    options: ['直升机', '卡车', '船', '出租车'],
    answer: '直升机'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/truck.png',
    options: ['摩托车', '卡车', '直升机', '船'],
    answer: '卡车'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '出租车',
    question: 'کدام کلمه را شنیدی؟',
    options: ['船', '出租车', '摩托车', '直升机'],
    answer: '出租车'
  },
  {
    type: 'audio',
    speak: '船',
    question: 'کدام کلمه را شنیدی؟',
    options: ['出租车', '船', '卡车', '摩托车'],
    answer: '船'
  },
  {
    type: 'audio',
    speak: '摩托车',
    question: 'کدام کلمه را شنیدی؟',
    options: ['直升机', '出租车', '摩托车', '船'],
    answer: '摩托车'
  },
  {
    type: 'audio',
    speak: '直升机',
    question: 'کدام کلمه را شنیدی؟',
    options: ['直升机', '卡车', '船', '出租车'],
    answer: '直升机'
  },
  {
    type: 'audio',
    speak: '卡车',
    question: 'کدام کلمه را شنیدی؟',
    options: ['摩托车', '卡车', '直升机', '船'],
    answer: '卡车'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '出租车',
    image: '../../../media/a2/vehicles/taxi.png',
    meaning: 'تاکسی'
  },
  {
    type: 'speak',
    word: '船',
    image: '../../../media/a2/vehicles/boat.png',
    meaning: 'قایق'
  },
  {
    type: 'speak',
    word: '摩托车',
    image: '../../../media/a2/vehicles/motorcycle.png',
    meaning: 'موتورسیکلت'
  },
  {
    type: 'speak',
    word: '直升机',
    image: '../../../media/a2/vehicles/helicopter.png',
    meaning: 'بالگرد'
  },
  {
    type: 'speak',
    word: '卡车',
    image: '../../../media/a2/vehicles/truck.png',
    meaning: 'کامیون'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是出租车',
    question: 'جمله چینی را بساز:',
    text: 'این تاکسی است',
    words: ['出租车', '这', '是'],
    answer: ['这', '是', '出租车']
  },
  {
    type: 'build-en',
    speak: '这是船',
    question: 'جمله چینی را بساز:',
    text: 'این قایق است',
    words: ['船', '这', '是'],
    answer: ['这', '是', '船']
  },
  {
    type: 'build-en',
    speak: '这是摩托车',
    question: 'جمله چینی را بساز:',
    text: 'این موتورسیکلت است',
    words: ['摩托车', '这', '是'],
    answer: ['这', '是', '摩托车']
  },
  {
    type: 'build-en',
    speak: '这是直升机',
    question: 'جمله چینی را بساز:',
    text: 'این بالگرد است',
    words: ['直升机', '这', '是'],
    answer: ['这', '是', '直升机']
  },
  {
    type: 'build-en',
    speak: '这是卡车',
    question: 'جمله چینی را بساز:',
    text: 'این کامیون است',
    words: ['卡车', '这', '是'],
    answer: ['这', '是', '卡车']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是出租车',
    question: 'ترجمه را بساز:',
    text: '这是出租车',
    words: ['است', 'تاکسی', 'این'],
    answer: ['این', 'تاکسی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是船',
    question: 'ترجمه را بساز:',
    text: '这是船',
    words: ['است', 'قایق', 'این'],
    answer: ['این', 'قایق', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是摩托车',
    question: 'ترجمه را بساز:',
    text: '这是摩托车',
    words: ['است', 'موتورسیکلت', 'این'],
    answer: ['این', 'موتورسیکلت', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是直升机',
    question: 'ترجمه را بساز:',
    text: '这是直升机',
    words: ['است', 'بالگرد', 'این'],
    answer: ['این', 'بالگرد', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是卡车',
    question: 'ترجمه را بساز:',
    text: '这是卡车',
    words: ['است', 'کامیون', 'این'],
    answer: ['این', 'کامیون', 'است']
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