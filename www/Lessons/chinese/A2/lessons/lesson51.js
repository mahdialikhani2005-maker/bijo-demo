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

// ===== سوالات درس ۵۱ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "护照" است؟',
    speak: '护照',
    options: [
      { text: '酒店', image: '../../../media/a2/travel/hotel.png' },
      { text: '护照', image: '../../../media/a2/travel/passport.png' },
      { text: '行李', image: '../../../media/a2/travel/luggage.png' },
      { text: '航班', image: '../../../media/a2/travel/flight.png' }
    ],
    answer: '护照'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "酒店" است؟',
    speak: '酒店',
    options: [
      { text: '护照', image: '../../../media/a2/travel/passport.png' },
      { text: '酒店', image: '../../../media/a2/travel/hotel.png' },
      { text: '地图', image: '../../../media/a2/travel/map.png' },
      { text: '行李', image: '../../../media/a2/travel/luggage.png' }
    ],
    answer: '酒店'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "行李" است؟',
    speak: '行李',
    options: [
      { text: '航班', image: '../../../media/a2/travel/flight.png' },
      { text: '护照', image: '../../../media/a2/travel/passport.png' },
      { text: '行李', image: '../../../media/a2/travel/luggage.png' },
      { text: '酒店', image: '../../../media/a2/travel/hotel.png' }
    ],
    answer: '行李'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "航班" است؟',
    speak: '航班',
    options: [
      { text: '航班', image: '../../../media/a2/travel/flight.png' },
      { text: '地图', image: '../../../media/a2/travel/map.png' },
      { text: '酒店', image: '../../../media/a2/travel/hotel.png' },
      { text: '护照', image: '../../../media/a2/travel/passport.png' }
    ],
    answer: '航班'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "地图" است؟',
    speak: '地图',
    options: [
      { text: '行李', image: '../../../media/a2/travel/luggage.png' },
      { text: '地图', image: '../../../media/a2/travel/map.png' },
      { text: '航班', image: '../../../media/a2/travel/flight.png' },
      { text: '酒店', image: '../../../media/a2/travel/hotel.png' }
    ],
    answer: '地图'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/passport.png',
    options: ['酒店', '护照', '行李', '航班'],
    answer: '护照'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/hotel.png',
    options: ['护照', '酒店', '地图', '行李'],
    answer: '酒店'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/luggage.png',
    options: ['航班', '护照', '行李', '酒店'],
    answer: '行李'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/flight.png',
    options: ['航班', '地图', '酒店', '护照'],
    answer: '航班'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/map.png',
    options: ['行李', '地图', '航班', '酒店'],
    answer: '地图'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '护照',
    question: 'کدام کلمه را شنیدی؟',
    options: ['酒店', '护照', '行李', '航班'],
    answer: '护照'
  },
  {
    type: 'audio',
    speak: '酒店',
    question: 'کدام کلمه را شنیدی؟',
    options: ['护照', '酒店', '地图', '行李'],
    answer: '酒店'
  },
  {
    type: 'audio',
    speak: '行李',
    question: 'کدام کلمه را شنیدی؟',
    options: ['航班', '护照', '行李', '酒店'],
    answer: '行李'
  },
  {
    type: 'audio',
    speak: '航班',
    question: 'کدام کلمه را شنیدی؟',
    options: ['航班', '地图', '酒店', '护照'],
    answer: '航班'
  },
  {
    type: 'audio',
    speak: '地图',
    question: 'کدام کلمه را شنیدی؟',
    options: ['行李', '地图', '航班', '酒店'],
    answer: '地图'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '护照',
    image: '../../../media/a2/travel/passport.png',
    meaning: 'گذرنامه'
  },
  {
    type: 'speak',
    word: '酒店',
    image: '../../../media/a2/travel/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: '行李',
    image: '../../../media/a2/travel/luggage.png',
    meaning: 'چمدان / بار'
  },
  {
    type: 'speak',
    word: '航班',
    image: '../../../media/a2/travel/flight.png',
    meaning: 'پرواز'
  },
  {
    type: 'speak',
    word: '地图',
    image: '../../../media/a2/travel/map.png',
    meaning: 'نقشه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是护照',
    question: 'جمله چینی را بساز:',
    text: 'این گذرنامه است',
    words: ['护照', '这', '是'],
    answer: ['这', '是', '护照']
  },
  {
    type: 'build-en',
    speak: '这是酒店',
    question: 'جمله چینی را بساز:',
    text: 'این هتل است',
    words: ['酒店', '这', '是'],
    answer: ['这', '是', '酒店']
  },
  {
    type: 'build-en',
    speak: '这是行李',
    question: 'جمله چینی را بساز:',
    text: 'این چمدان است',
    words: ['行李', '这', '是'],
    answer: ['这', '是', '行李']
  },
  {
    type: 'build-en',
    speak: '这是航班',
    question: 'جمله چینی را بساز:',
    text: 'این پرواز است',
    words: ['航班', '这', '是'],
    answer: ['这', '是', '航班']
  },
  {
    type: 'build-en',
    speak: '这是地图',
    question: 'جمله چینی را بساز:',
    text: 'این نقشه است',
    words: ['地图', '这', '是'],
    answer: ['这', '是', '地图']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是护照',
    question: 'ترجمه را بساز:',
    text: '这是护照',
    words: ['است', 'گذرنامه', 'این'],
    answer: ['این', 'گذرنامه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是酒店',
    question: 'ترجمه را بساز:',
    text: '这是酒店',
    words: ['است', 'هتل', 'این'],
    answer: ['این', 'هتل', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是行李',
    question: 'ترجمه را بساز:',
    text: '这是行李',
    words: ['است', 'چمدان', 'این'],
    answer: ['این', 'چمدان', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是航班',
    question: 'ترجمه را بساز:',
    text: '这是航班',
    words: ['است', 'پرواز', 'این'],
    answer: ['این', 'پرواز', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是地图',
    question: 'ترجمه را بساز:',
    text: '这是地图',
    words: ['است', 'نقشه', 'این'],
    answer: ['این', 'نقشه', 'است']
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