let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
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
  recognition.lang = 'it-IT';
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

// ===== سوالات درس ۷ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la tenda" است؟',
    speak: 'la tenda',
    options: [
      { text: 'la tenda', image: '../../../media/a2/house/curtain.png' },
      { text: 'il tappeto', image: '../../../media/a2/house/carpet.png' },
      { text: 'il cuscino', image: '../../../media/a2/house/pillow.png' },
      { text: 'la lampada', image: '../../../media/a2/house/lamp.png' }
    ],
    answer: 'la tenda'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il tappeto" است؟',
    speak: 'il tappeto',
    options: [
      { text: 'la tenda', image: '../../../media/a2/house/curtain.png' },
      { text: 'il tappeto', image: '../../../media/a2/house/carpet.png' },
      { text: 'la coperta', image: '../../../media/a2/house/blanket.png' },
      { text: 'il cuscino', image: '../../../media/a2/house/pillow.png' }
    ],
    answer: 'il tappeto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il cuscino" است؟',
    speak: 'il cuscino',
    options: [
      { text: 'la coperta', image: '../../../media/a2/house/blanket.png' },
      { text: 'la tenda', image: '../../../media/a2/house/curtain.png' },
      { text: 'il cuscino', image: '../../../media/a2/house/pillow.png' },
      { text: 'il tappeto', image: '../../../media/a2/house/carpet.png' }
    ],
    answer: 'il cuscino'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la coperta" است؟',
    speak: 'la coperta',
    options: [
      { text: 'il tappeto', image: '../../../media/a2/house/carpet.png' },
      { text: 'la coperta', image: '../../../media/a2/house/blanket.png' },
      { text: 'la lampada', image: '../../../media/a2/house/lamp.png' },
      { text: 'la tenda', image: '../../../media/a2/house/curtain.png' }
    ],
    answer: 'la coperta'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la lampada" است؟',
    speak: 'la lampada',
    options: [
      { text: 'la tenda', image: '../../../media/a2/house/curtain.png' },
      { text: 'il cuscino', image: '../../../media/a2/house/pillow.png' },
      { text: 'la lampada', image: '../../../media/a2/house/lamp.png' },
      { text: 'la coperta', image: '../../../media/a2/house/blanket.png' }
    ],
    answer: 'la lampada'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/curtain.png',
    options: ['la tenda', 'il tappeto', 'il cuscino', 'la lampada'],
    answer: 'la tenda'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/carpet.png',
    options: ['la tenda', 'il tappeto', 'la coperta', 'il cuscino'],
    answer: 'il tappeto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/pillow.png',
    options: ['la coperta', 'la tenda', 'il cuscino', 'il tappeto'],
    answer: 'il cuscino'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blanket.png',
    options: ['il tappeto', 'la coperta', 'la lampada', 'la tenda'],
    answer: 'la coperta'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/lamp.png',
    options: ['la tenda', 'il cuscino', 'la lampada', 'la coperta'],
    answer: 'la lampada'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la tenda',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tenda', 'il tappeto', 'il cuscino', 'la lampada'],
    answer: 'la tenda'
  },
  {
    type: 'audio',
    speak: 'il tappeto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tenda', 'il tappeto', 'la coperta', 'il cuscino'],
    answer: 'il tappeto'
  },
  {
    type: 'audio',
    speak: 'il cuscino',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la coperta', 'la tenda', 'il cuscino', 'il tappeto'],
    answer: 'il cuscino'
  },
  {
    type: 'audio',
    speak: 'la coperta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il tappeto', 'la coperta', 'la lampada', 'la tenda'],
    answer: 'la coperta'
  },
  {
    type: 'audio',
    speak: 'la lampada',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tenda', 'il cuscino', 'la lampada', 'la coperta'],
    answer: 'la lampada'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la tenda',
    image: '../../../media/a2/house/curtain.png',
    meaning: 'پرده'
  },
  {
    type: 'speak',
    word: 'il tappeto',
    image: '../../../media/a2/house/carpet.png',
    meaning: 'فرش'
  },
  {
    type: 'speak',
    word: 'il cuscino',
    image: '../../../media/a2/house/pillow.png',
    meaning: 'بالش'
  },
  {
    type: 'speak',
    word: 'la coperta',
    image: '../../../media/a2/house/blanket.png',
    meaning: 'پتو'
  },
  {
    type: 'speak',
    word: 'la lampada',
    image: '../../../media/a2/house/lamp.png',
    meaning: 'چراغ'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Questa è la mia tenda',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این پرده من است',
    words: ['tenda', 'mia', 'la', 'è', 'Questa'],
    answer: ['Questa', 'è', 'la', 'mia', 'tenda']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio tappeto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این فرش من است',
    words: ['tappeto', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'tappeto']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio cuscino',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این بالش من است',
    words: ['cuscino', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'cuscino']
  },
  {
    type: 'build-it',
    speak: 'Questa è la mia coperta',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این پتوی من است',
    words: ['coperta', 'mia', 'la', 'è', 'Questa'],
    answer: ['Questa', 'è', 'la', 'mia', 'coperta']
  },
  {
    type: 'build-it',
    speak: 'Questa è la mia lampada',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این چراغ من است',
    words: ['lampada', 'mia', 'la', 'è', 'Questa'],
    answer: ['Questa', 'è', 'la', 'mia', 'lampada']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Questa è la mia tenda',
    question: 'ترجمه را بساز:',
    text: 'Questa è la mia tenda',
    words: ['است', 'پرده', 'من', 'این'],
    answer: ['این', 'پرده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio tappeto',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio tappeto',
    words: ['است', 'فرش', 'من', 'این'],
    answer: ['این', 'فرش', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio cuscino',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio cuscino',
    words: ['است', 'بالش', 'من', 'این'],
    answer: ['این', 'بالش', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questa è la mia coperta',
    question: 'ترجمه را بساز:',
    text: 'Questa è la mia coperta',
    words: ['است', 'پتو', 'من', 'این'],
    answer: ['این', 'پتو', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questa è la mia lampada',
    question: 'ترجمه را بساز:',
    text: 'Questa è la mia lampada',
    words: ['است', 'چراغ', 'من', 'این'],
    answer: ['این', 'چراغ', 'من', 'است']
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

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
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

    if (q.type === 'build-it') {
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