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

// ===== سوالات درس ۸ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "阳台" است؟',
    speak: '阳台',
    options: [
      { text: '车库', image: '../../../media/a2/house/garage.png' },
      { text: '阳台', image: '../../../media/a2/house/balcony.png' },
      { text: '地下室', image: '../../../media/a2/house/basement.png' },
      { text: '阁楼', image: '../../../media/a2/house/attic.png' }
    ],
    answer: '阳台'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "车库" است؟',
    speak: '车库',
    options: [
      { text: '阳台', image: '../../../media/a2/house/balcony.png' },
      { text: '车库', image: '../../../media/a2/house/garage.png' },
      { text: '院子', image: '../../../media/a2/house/yard.png' },
      { text: '地下室', image: '../../../media/a2/house/basement.png' }
    ],
    answer: '车库'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "地下室" است؟',
    speak: '地下室',
    options: [
      { text: '阁楼', image: '../../../media/a2/house/attic.png' },
      { text: '阳台', image: '../../../media/a2/house/balcony.png' },
      { text: '地下室', image: '../../../media/a2/house/basement.png' },
      { text: '车库', image: '../../../media/a2/house/garage.png' }
    ],
    answer: '地下室'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "阁楼" است؟',
    speak: '阁楼',
    options: [
      { text: '阁楼', image: '../../../media/a2/house/attic.png' },
      { text: '院子', image: '../../../media/a2/house/yard.png' },
      { text: '车库', image: '../../../media/a2/house/garage.png' },
      { text: '阳台', image: '../../../media/a2/house/balcony.png' }
    ],
    answer: '阁楼'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "院子" است؟',
    speak: '院子',
    options: [
      { text: '地下室', image: '../../../media/a2/house/basement.png' },
      { text: '院子', image: '../../../media/a2/house/yard.png' },
      { text: '阁楼', image: '../../../media/a2/house/attic.png' },
      { text: '阳台', image: '../../../media/a2/house/balcony.png' }
    ],
    answer: '院子'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/balcony.png',
    options: ['车库', '阳台', '地下室', '阁楼'],
    answer: '阳台'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/garage.png',
    options: ['阳台', '车库', '院子', '地下室'],
    answer: '车库'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/basement.png',
    options: ['阁楼', '阳台', '地下室', '车库'],
    answer: '地下室'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/attic.png',
    options: ['阁楼', '院子', '车库', '阳台'],
    answer: '阁楼'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/yard.png',
    options: ['地下室', '院子', '阁楼', '阳台'],
    answer: '院子'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '阳台',
    question: 'کدام کلمه را شنیدی؟',
    options: ['车库', '阳台', '地下室', '阁楼'],
    answer: '阳台'
  },
  {
    type: 'audio',
    speak: '车库',
    question: 'کدام کلمه را شنیدی؟',
    options: ['阳台', '车库', '院子', '地下室'],
    answer: '车库'
  },
  {
    type: 'audio',
    speak: '地下室',
    question: 'کدام کلمه را شنیدی؟',
    options: ['阁楼', '阳台', '地下室', '车库'],
    answer: '地下室'
  },
  {
    type: 'audio',
    speak: '阁楼',
    question: 'کدام کلمه را شنیدی؟',
    options: ['阁楼', '院子', '车库', '阳台'],
    answer: '阁楼'
  },
  {
    type: 'audio',
    speak: '院子',
    question: 'کدام کلمه را شنیدی؟',
    options: ['地下室', '院子', '阁楼', '阳台'],
    answer: '院子'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '阳台',
    image: '../../../media/a2/house/balcony.png',
    meaning: 'بالکن'
  },
  {
    type: 'speak',
    word: '车库',
    image: '../../../media/a2/house/garage.png',
    meaning: 'گاراژ'
  },
  {
    type: 'speak',
    word: '地下室',
    image: '../../../media/a2/house/basement.png',
    meaning: 'زیرزمین'
  },
  {
    type: 'speak',
    word: '阁楼',
    image: '../../../media/a2/house/attic.png',
    meaning: 'اتاق زیرشیروانی'
  },
  {
    type: 'speak',
    word: '院子',
    image: '../../../media/a2/house/yard.png',
    meaning: 'حیاط'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是阳台',
    question: 'جمله چینی را بساز:',
    text: 'این بالکن است',
    words: ['阳台', '这', '是'],
    answer: ['这', '是', '阳台']
  },
  {
    type: 'build-en',
    speak: '这是车库',
    question: 'جمله چینی را بساز:',
    text: 'این گاراژ است',
    words: ['车库', '这', '是'],
    answer: ['这', '是', '车库']
  },
  {
    type: 'build-en',
    speak: '这是地下室',
    question: 'جمله چینی را بساز:',
    text: 'این زیرزمین است',
    words: ['地下室', '这', '是'],
    answer: ['这', '是', '地下室']
  },
  {
    type: 'build-en',
    speak: '这是阁楼',
    question: 'جمله چینی را بساز:',
    text: 'این اتاق زیرشیروانی است',
    words: ['阁楼', '这', '是'],
    answer: ['这', '是', '阁楼']
  },
  {
    type: 'build-en',
    speak: '这是院子',
    question: 'جمله چینی را بساز:',
    text: 'این حیاط است',
    words: ['院子', '这', '是'],
    answer: ['这', '是', '院子']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是阳台',
    question: 'ترجمه را بساز:',
    text: '这是阳台',
    words: ['است', 'بالکن', 'این'],
    answer: ['این', 'بالکن', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是车库',
    question: 'ترجمه را بساز:',
    text: '这是车库',
    words: ['است', 'گاراژ', 'این'],
    answer: ['این', 'گاراژ', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是地下室',
    question: 'ترجمه را بساز:',
    text: '这是地下室',
    words: ['است', 'زیرزمین', 'این'],
    answer: ['این', 'زیرزمین', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是阁楼',
    question: 'ترجمه را بساز:',
    text: '这是阁楼',
    words: ['است', 'اتاق زیرشیروانی', 'این'],
    answer: ['این', 'اتاق زیرشیروانی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是院子',
    question: 'ترجمه را بساز:',
    text: '这是院子',
    words: ['است', 'حیاط', 'این'],
    answer: ['این', 'حیاط', 'است']
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