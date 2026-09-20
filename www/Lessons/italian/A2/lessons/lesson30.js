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

// ===== سوالات درس ۳۰ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'ombrello" است؟',
    speak: 'l\'ombrello',
    options: [
      { text: 'l\'ombrello', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'la borsa', image: '../../../media/a2/clothes/bag.png' },
      { text: 'lo zaino', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'la borsetta', image: '../../../media/a2/clothes/purse.png' }
    ],
    answer: 'l\'ombrello'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la borsa" است؟',
    speak: 'la borsa',
    options: [
      { text: 'l\'ombrello', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'la borsa', image: '../../../media/a2/clothes/bag.png' },
      { text: 'il portafoglio', image: '../../../media/a2/clothes/wallet.png' },
      { text: 'lo zaino', image: '../../../media/a2/clothes/backpack.png' }
    ],
    answer: 'la borsa'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "lo zaino" است؟',
    speak: 'lo zaino',
    options: [
      { text: 'la borsetta', image: '../../../media/a2/clothes/purse.png' },
      { text: 'l\'ombrello', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'lo zaino', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'la borsa', image: '../../../media/a2/clothes/bag.png' }
    ],
    answer: 'lo zaino'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il portafoglio" است؟',
    speak: 'il portafoglio',
    options: [
      { text: 'la borsa', image: '../../../media/a2/clothes/bag.png' },
      { text: 'il portafoglio', image: '../../../media/a2/clothes/wallet.png' },
      { text: 'la borsetta', image: '../../../media/a2/clothes/purse.png' },
      { text: 'l\'ombrello', image: '../../../media/a2/clothes/umbrella.png' }
    ],
    answer: 'il portafoglio'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la borsetta" است؟',
    speak: 'la borsetta',
    options: [
      { text: 'l\'ombrello', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'lo zaino', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'la borsetta', image: '../../../media/a2/clothes/purse.png' },
      { text: 'il portafoglio', image: '../../../media/a2/clothes/wallet.png' }
    ],
    answer: 'la borsetta'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/umbrella.png',
    options: ['l\'ombrello', 'la borsa', 'lo zaino', 'il portafoglio'],
    answer: 'l\'ombrello'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bag.png',
    options: ['l\'ombrello', 'la borsa', 'la borsetta', 'lo zaino'],
    answer: 'la borsa'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/backpack.png',
    options: ['la borsetta', 'l\'ombrello', 'lo zaino', 'la borsa'],
    answer: 'lo zaino'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/wallet.png',
    options: ['la borsa', 'il portafoglio', 'la borsetta', 'l\'ombrello'],
    answer: 'il portafoglio'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/purse.png',
    options: ['l\'ombrello', 'lo zaino', 'la borsetta', 'il portafoglio'],
    answer: 'la borsetta'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'l\'ombrello',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ombrello', 'la borsa', 'lo zaino', 'il portafoglio'],
    answer: 'l\'ombrello'
  },
  {
    type: 'audio',
    speak: 'la borsa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ombrello', 'la borsa', 'la borsetta', 'lo zaino'],
    answer: 'la borsa'
  },
  {
    type: 'audio',
    speak: 'lo zaino',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la borsetta', 'l\'ombrello', 'lo zaino', 'la borsa'],
    answer: 'lo zaino'
  },
  {
    type: 'audio',
    speak: 'il portafoglio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la borsa', 'il portafoglio', 'la borsetta', 'l\'ombrello'],
    answer: 'il portafoglio'
  },
  {
    type: 'audio',
    speak: 'la borsetta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ombrello', 'lo zaino', 'la borsetta', 'il portafoglio'],
    answer: 'la borsetta'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'l\'ombrello',
    image: '../../../media/a2/clothes/umbrella.png',
    meaning: 'چتر'
  },
  {
    type: 'speak',
    word: 'la borsa',
    image: '../../../media/a2/clothes/bag.png',
    meaning: 'کیف'
  },
  {
    type: 'speak',
    word: 'lo zaino',
    image: '../../../media/a2/clothes/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: 'il portafoglio',
    image: '../../../media/a2/clothes/wallet.png',
    meaning: 'کیف پول'
  },
  {
    type: 'speak',
    word: 'la borsetta',
    image: '../../../media/a2/clothes/purse.png',
    meaning: 'کیف دستی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Ho un ombrello',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک چتر دارم',
    words: ['ombrello', 'un', 'Ho'],
    answer: ['Ho', 'un', 'ombrello']
  },
  {
    type: 'build-it',
    speak: 'Ho una borsa',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کیف دارم',
    words: ['borsa', 'una', 'Ho'],
    answer: ['Ho', 'una', 'borsa']
  },
  {
    type: 'build-it',
    speak: 'Ho uno zaino',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کوله پشتی دارم',
    words: ['zaino', 'uno', 'Ho'],
    answer: ['Ho', 'uno', 'zaino']
  },
  {
    type: 'build-it',
    speak: 'Ho un portafoglio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کیف پول دارم',
    words: ['portafoglio', 'un', 'Ho'],
    answer: ['Ho', 'un', 'portafoglio']
  },
  {
    type: 'build-it',
    speak: 'Ho una borsetta',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کیف دستی دارم',
    words: ['borsetta', 'una', 'Ho'],
    answer: ['Ho', 'una', 'borsetta']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ho un ombrello',
    question: 'ترجمه را بساز:',
    text: 'Ho un ombrello',
    words: ['دارم', 'چتر', 'یک', 'من'],
    answer: ['من', 'یک', 'چتر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho una borsa',
    question: 'ترجمه را بساز:',
    text: 'Ho una borsa',
    words: ['دارم', 'کیف', 'یک', 'من'],
    answer: ['من', 'یک', 'کیف', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho uno zaino',
    question: 'ترجمه را بساز:',
    text: 'Ho uno zaino',
    words: ['دارم', 'کوله پشتی', 'یک', 'من'],
    answer: ['من', 'یک', 'کوله پشتی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho un portafoglio',
    question: 'ترجمه را بساز:',
    text: 'Ho un portafoglio',
    words: ['دارم', 'کیف پول', 'یک', 'من'],
    answer: ['من', 'یک', 'کیف پول', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho una borsetta',
    question: 'ترجمه را بساز:',
    text: 'Ho una borsetta',
    words: ['دارم', 'کیف دستی', 'یک', 'من'],
    answer: ['من', 'یک', 'کیف دستی', 'دارم']
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