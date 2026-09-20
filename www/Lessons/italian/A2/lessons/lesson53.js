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

// ===== سوالات درس ۵۳ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la guida" است؟',
    speak: 'la guida',
    options: [
      { text: 'la guida', image: '../../../media/a2/travel/guide.png' },
      { text: 'il turista', image: '../../../media/a2/travel/tourist.png' },
      { text: 'il souvenir', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'il viaggio', image: '../../../media/a2/travel/journey.png' }
    ],
    answer: 'la guida'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il turista" است؟',
    speak: 'il turista',
    options: [
      { text: 'la guida', image: '../../../media/a2/travel/guide.png' },
      { text: 'il turista', image: '../../../media/a2/travel/tourist.png' },
      { text: 'l\'avventura', image: '../../../media/a2/travel/adventure.png' },
      { text: 'il souvenir', image: '../../../media/a2/travel/souvenir.png' }
    ],
    answer: 'il turista'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il souvenir" است؟',
    speak: 'il souvenir',
    options: [
      { text: 'il viaggio', image: '../../../media/a2/travel/journey.png' },
      { text: 'la guida', image: '../../../media/a2/travel/guide.png' },
      { text: 'il souvenir', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'il turista', image: '../../../media/a2/travel/tourist.png' }
    ],
    answer: 'il souvenir'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'avventura" است؟',
    speak: 'l\'avventura',
    options: [
      { text: 'il turista', image: '../../../media/a2/travel/tourist.png' },
      { text: 'l\'avventura', image: '../../../media/a2/travel/adventure.png' },
      { text: 'il viaggio', image: '../../../media/a2/travel/journey.png' },
      { text: 'la guida', image: '../../../media/a2/travel/guide.png' }
    ],
    answer: 'l\'avventura'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il viaggio" است؟',
    speak: 'il viaggio',
    options: [
      { text: 'la guida', image: '../../../media/a2/travel/guide.png' },
      { text: 'il souvenir', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'il viaggio', image: '../../../media/a2/travel/journey.png' },
      { text: 'l\'avventura', image: '../../../media/a2/travel/adventure.png' }
    ],
    answer: 'il viaggio'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/guide.png',
    options: ['la guida', 'il turista', 'il souvenir', 'il viaggio'],
    answer: 'la guida'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tourist.png',
    options: ['la guida', 'il turista', 'l\'avventura', 'il souvenir'],
    answer: 'il turista'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/souvenir.png',
    options: ['il viaggio', 'la guida', 'il souvenir', 'il turista'],
    answer: 'il souvenir'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/adventure.png',
    options: ['il turista', 'l\'avventura', 'il viaggio', 'la guida'],
    answer: 'l\'avventura'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/journey.png',
    options: ['la guida', 'il souvenir', 'il viaggio', 'l\'avventura'],
    answer: 'il viaggio'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la guida',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la guida', 'il turista', 'il souvenir', 'il viaggio'],
    answer: 'la guida'
  },
  {
    type: 'audio',
    speak: 'il turista',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la guida', 'il turista', 'l\'avventura', 'il souvenir'],
    answer: 'il turista'
  },
  {
    type: 'audio',
    speak: 'il souvenir',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il viaggio', 'la guida', 'il souvenir', 'il turista'],
    answer: 'il souvenir'
  },
  {
    type: 'audio',
    speak: 'l\'avventura',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il turista', 'l\'avventura', 'il viaggio', 'la guida'],
    answer: 'l\'avventura'
  },
  {
    type: 'audio',
    speak: 'il viaggio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la guida', 'il souvenir', 'il viaggio', 'l\'avventura'],
    answer: 'il viaggio'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la guida',
    image: '../../../media/a2/travel/guide.png',
    meaning: 'راهنما'
  },
  {
    type: 'speak',
    word: 'il turista',
    image: '../../../media/a2/travel/tourist.png',
    meaning: 'گردشگر'
  },
  {
    type: 'speak',
    word: 'il souvenir',
    image: '../../../media/a2/travel/souvenir.png',
    meaning: 'سوغات'
  },
  {
    type: 'speak',
    word: 'l\'avventura',
    image: '../../../media/a2/travel/adventure.png',
    meaning: 'ماجراجویی'
  },
  {
    type: 'speak',
    word: 'il viaggio',
    image: '../../../media/a2/travel/journey.png',
    meaning: 'سفر'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Sono una guida',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک راهنما هستم',
    words: ['guida', 'una', 'Sono'],
    answer: ['Sono', 'una', 'guida']
  },
  {
    type: 'build-it',
    speak: 'Sono un turista',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک گردشگر هستم',
    words: ['turista', 'un', 'Sono'],
    answer: ['Sono', 'un', 'turista']
  },
  {
    type: 'build-it',
    speak: 'Ho un souvenir',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک سوغات دارم',
    words: ['souvenir', 'un', 'Ho'],
    answer: ['Ho', 'un', 'souvenir']
  },
  {
    type: 'build-it',
    speak: 'Amo l\'avventura',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من ماجراجویی را دوست دارم',
    words: ['avventura', 'l\'', 'Amo'],
    answer: ['Amo', 'l\'', 'avventura']
  },
  {
    type: 'build-it',
    speak: 'Faccio un viaggio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک سفر می‌روم',
    words: ['viaggio', 'un', 'Faccio'],
    answer: ['Faccio', 'un', 'viaggio']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Sono una guida',
    question: 'ترجمه را بساز:',
    text: 'Sono una guida',
    words: ['هستم', 'راهنما', 'یک', 'من'],
    answer: ['من', 'یک', 'راهنما', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un turista',
    question: 'ترجمه را بساز:',
    text: 'Sono un turista',
    words: ['هستم', 'گردشگر', 'یک', 'من'],
    answer: ['من', 'یک', 'گردشگر', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ho un souvenir',
    question: 'ترجمه را بساز:',
    text: 'Ho un souvenir',
    words: ['دارم', 'سوغات', 'یک', 'من'],
    answer: ['من', 'یک', 'سوغات', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Amo l\'avventura',
    question: 'ترجمه را بساز:',
    text: 'Amo l\'avventura',
    words: ['دارم', 'ماجراجویی', 'دوست', 'من'],
    answer: ['من', 'ماجراجویی', 'دوست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Faccio un viaggio',
    question: 'ترجمه را بساز:',
    text: 'Faccio un viaggio',
    words: ['می‌روم', 'سفر', 'یک', 'من'],
    answer: ['من', 'یک', 'سفر', 'می‌روم']
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