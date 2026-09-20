let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.8;
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
  recognition.lang = 'de-DE';
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

// ===== سوالات درس ۱ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Onkel" است؟',
    speak: 'der Onkel',
    options: [
      { text: 'der Onkel', image: '../../../media/a2/family/uncle.png' },
      { text: 'die Tante', image: '../../../media/a2/family/aunt.png' },
      { text: 'der Cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'der Neffe', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: 'der Onkel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Tante" است؟',
    speak: 'die Tante',
    options: [
      { text: 'der Onkel', image: '../../../media/a2/family/uncle.png' },
      { text: 'die Tante', image: '../../../media/a2/family/aunt.png' },
      { text: 'die Nichte', image: '../../../media/a2/family/niece.png' },
      { text: 'der Cousin', image: '../../../media/a2/family/cousin.png' }
    ],
    answer: 'die Tante'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Cousin" است؟',
    speak: 'der Cousin',
    options: [
      { text: 'der Neffe', image: '../../../media/a2/family/nephew.png' },
      { text: 'der Onkel', image: '../../../media/a2/family/uncle.png' },
      { text: 'der Cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'die Tante', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: 'der Cousin'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Neffe" است؟',
    speak: 'der Neffe',
    options: [
      { text: 'der Cousin', image: '../../../media/a2/family/cousin.png' },
      { text: 'der Neffe', image: '../../../media/a2/family/nephew.png' },
      { text: 'die Nichte', image: '../../../media/a2/family/niece.png' },
      { text: 'der Onkel', image: '../../../media/a2/family/uncle.png' }
    ],
    answer: 'der Neffe'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Nichte" است؟',
    speak: 'die Nichte',
    options: [
      { text: 'der Onkel', image: '../../../media/a2/family/uncle.png' },
      { text: 'die Tante', image: '../../../media/a2/family/aunt.png' },
      { text: 'die Nichte', image: '../../../media/a2/family/niece.png' },
      { text: 'der Cousin', image: '../../../media/a2/family/cousin.png' }
    ],
    answer: 'die Nichte'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/uncle.png',
    options: ['der Onkel', 'die Tante', 'der Cousin', 'der Neffe'],
    answer: 'der Onkel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/aunt.png',
    options: ['der Onkel', 'die Tante', 'die Nichte', 'der Cousin'],
    answer: 'die Tante'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/cousin.png',
    options: ['der Neffe', 'der Onkel', 'der Cousin', 'die Tante'],
    answer: 'der Cousin'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/nephew.png',
    options: ['der Cousin', 'der Neffe', 'die Nichte', 'der Onkel'],
    answer: 'der Neffe'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/niece.png',
    options: ['der Onkel', 'die Tante', 'die Nichte', 'der Cousin'],
    answer: 'die Nichte'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Onkel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Onkel', 'die Tante', 'der Cousin', 'der Neffe'],
    answer: 'der Onkel'
  },
  {
    type: 'audio',
    speak: 'die Tante',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Onkel', 'die Tante', 'die Nichte', 'der Cousin'],
    answer: 'die Tante'
  },
  {
    type: 'audio',
    speak: 'der Cousin',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Neffe', 'der Onkel', 'der Cousin', 'die Tante'],
    answer: 'der Cousin'
  },
  {
    type: 'audio',
    speak: 'der Neffe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Cousin', 'der Neffe', 'die Nichte', 'der Onkel'],
    answer: 'der Neffe'
  },
  {
    type: 'audio',
    speak: 'die Nichte',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Onkel', 'die Tante', 'die Nichte', 'der Cousin'],
    answer: 'die Nichte'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Onkel',
    image: '../../../media/a2/family/uncle.png',
    meaning: 'عمو/دایی'
  },
  {
    type: 'speak',
    word: 'die Tante',
    image: '../../../media/a2/family/aunt.png',
    meaning: 'عمه/خاله'
  },
  {
    type: 'speak',
    word: 'der Cousin',
    image: '../../../media/a2/family/cousin.png',
    meaning: 'پسرعمو/دخترعمو'
  },
  {
    type: 'speak',
    word: 'der Neffe',
    image: '../../../media/a2/family/nephew.png',
    meaning: 'برادرزاده (پسر)'
  },
  {
    type: 'speak',
    word: 'die Nichte',
    image: '../../../media/a2/family/niece.png',
    meaning: 'برادرزاده (دختر)'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Das ist mein Onkel',
    question: 'جمله آلمانی را بساز:',
    text: 'این عموی من است',
    words: ['Onkel', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Onkel']
  },
  {
    type: 'build-de',
    speak: 'Das ist meine Tante',
    question: 'جمله آلمانی را بساز:',
    text: 'این عمه‌ی من است',
    words: ['Tante', 'meine', 'ist', 'Das'],
    answer: ['Das', 'ist', 'meine', 'Tante']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Cousin',
    question: 'جمله آلمانی را بساز:',
    text: 'این پسرعموی من است',
    words: ['Cousin', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Cousin']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Neffe',
    question: 'جمله آلمانی را بساز:',
    text: 'این برادرزاده (پسر) من است',
    words: ['Neffe', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Neffe']
  },
  {
    type: 'build-de',
    speak: 'Das ist meine Nichte',
    question: 'جمله آلمانی را بساز:',
    text: 'این برادرزاده (دختر) من است',
    words: ['Nichte', 'meine', 'ist', 'Das'],
    answer: ['Das', 'ist', 'meine', 'Nichte']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Das ist mein Onkel',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Onkel',
    words: ['است', 'عمو', 'من', 'این'],
    answer: ['این', 'عموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist meine Tante',
    question: 'ترجمه را بساز:',
    text: 'Das ist meine Tante',
    words: ['است', 'عمه', 'من', 'این'],
    answer: ['این', 'عمه‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Cousin',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Cousin',
    words: ['است', 'پسرعمو', 'من', 'این'],
    answer: ['این', 'پسرعموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Neffe',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Neffe',
    words: ['است', 'برادرزاده', 'من', 'این'],
    answer: ['این', 'برادرزاده‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist meine Nichte',
    question: 'ترجمه را بساز:',
    text: 'Das ist meine Nichte',
    words: ['است', 'برادرزاده', 'من', 'این'],
    answer: ['این', 'برادرزاده‌ی', 'من', 'است']
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

  // ===== بخش BUILD DE / FA =====
  if (q.type === 'build-de' || q.type === 'build-fa') {
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

    if (q.type === 'build-de') {
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