let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
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
  recognition.lang = 'ru-RU';
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

// ===== سوالات درس ۵۶ - روسی به فارسی (کامپیوتر) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "компьютер" است؟',
    speak: 'компьютер',
    options: [
      { text: 'компьютер', image: '../../../media/a2/technology/computer.png' },
      { text: 'клавиатура', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'мышь', image: '../../../media/a2/technology/mouse.png' },
      { text: 'интернет', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: 'компьютер'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "клавиатура" است؟',
    speak: 'клавиатура',
    options: [
      { text: 'компьютер', image: '../../../media/a2/technology/computer.png' },
      { text: 'клавиатура', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'электронная почта', image: '../../../media/a2/technology/email.png' },
      { text: 'мышь', image: '../../../media/a2/technology/mouse.png' }
    ],
    answer: 'клавиатура'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "мышь" است؟',
    speak: 'мышь',
    options: [
      { text: 'компьютер', image: '../../../media/a2/technology/computer.png' },
      { text: 'клавиатура', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'мышь', image: '../../../media/a2/technology/mouse.png' },
      { text: 'интернет', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: 'мышь'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "интернет" است؟',
    speak: 'интернет',
    options: [
      { text: 'компьютер', image: '../../../media/a2/technology/computer.png' },
      { text: 'интернет', image: '../../../media/a2/technology/internet.png' },
      { text: 'мышь', image: '../../../media/a2/technology/mouse.png' },
      { text: 'электронная почта', image: '../../../media/a2/technology/email.png' }
    ],
    answer: 'интернет'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "электронная почта" است؟',
    speak: 'электронная почта',
    options: [
      { text: 'клавиатура', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'электронная почта', image: '../../../media/a2/technology/email.png' },
      { text: 'мышь', image: '../../../media/a2/technology/mouse.png' },
      { text: 'компьютер', image: '../../../media/a2/technology/computer.png' }
    ],
    answer: 'электронная почта'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/computer.png',
    options: ['компьютер', 'клавиатура', 'мышь', 'интернет'],
    answer: 'компьютер'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/keyboard.png',
    options: ['компьютер', 'клавиатура', 'электронная почта', 'мышь'],
    answer: 'клавиатура'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/mouse.png',
    options: ['компьютер', 'клавиатура', 'мышь', 'интернет'],
    answer: 'мышь'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/internet.png',
    options: ['компьютер', 'интернет', 'мышь', 'электронная почта'],
    answer: 'интернет'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/email.png',
    options: ['клавиатура', 'электронная почта', 'мышь', 'компьютер'],
    answer: 'электронная почта'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'компьютер',
    question: 'کدام کلمه را شنیدی؟',
    options: ['компьютер', 'клавиатура', 'мышь', 'интернет'],
    answer: 'компьютер'
  },
  {
    type: 'audio',
    speak: 'клавиатура',
    question: 'کدام کلمه را شنیدی؟',
    options: ['компьютер', 'клавиатура', 'электронная почта', 'мышь'],
    answer: 'клавиатура'
  },
  {
    type: 'audio',
    speak: 'мышь',
    question: 'کدام کلمه را شنیدی؟',
    options: ['компьютер', 'клавиатура', 'мышь', 'интернет'],
    answer: 'мышь'
  },
  {
    type: 'audio',
    speak: 'интернет',
    question: 'کدام کلمه را شنیدی؟',
    options: ['компьютер', 'интернет', 'мышь', 'электронная почта'],
    answer: 'интернет'
  },
  {
    type: 'audio',
    speak: 'электронная почта',
    question: 'کدام کلمه را شنیدی؟',
    options: ['клавиатура', 'электронная почта', 'мышь', 'компьютер'],
    answer: 'электронная почта'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'компьютер',
    image: '../../../media/a2/technology/computer.png',
    meaning: 'کامپیوتر'
  },
  {
    type: 'speak',
    word: 'клавиатура',
    image: '../../../media/a2/technology/keyboard.png',
    meaning: 'صفحه کلید'
  },
  {
    type: 'speak',
    word: 'мышь',
    image: '../../../media/a2/technology/mouse.png',
    meaning: 'موشواره'
  },
  {
    type: 'speak',
    word: 'интернет',
    image: '../../../media/a2/technology/internet.png',
    meaning: 'اینترنت'
  },
  {
    type: 'speak',
    word: 'электронная почта',
    image: '../../../media/a2/technology/email.png',
    meaning: 'ایمیل'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это компьютер',
    question: 'جمله روسی را بساز:',
    text: 'این کامپیوتر است',
    words: ['компьютер', 'Это'],
    answer: ['Это', 'компьютер']
  },
  {
    type: 'build-ru',
    speak: 'Это клавиатура',
    question: 'جمله روسی را بساز:',
    text: 'این صفحه کلید است',
    words: ['клавиатура', 'Это'],
    answer: ['Это', 'клавиатура']
  },
  {
    type: 'build-ru',
    speak: 'Это мышь',
    question: 'جمله روسی را بساز:',
    text: 'این موشواره است',
    words: ['мышь', 'Это'],
    answer: ['Это', 'мышь']
  },
  {
    type: 'build-ru',
    speak: 'Это интернет',
    question: 'جمله روسی را بساز:',
    text: 'این اینترنت است',
    words: ['интернет', 'Это'],
    answer: ['Это', 'интернет']
  },
  {
    type: 'build-ru',
    speak: 'Это электронная почта',
    question: 'جمله روسی را بساز:',
    text: 'این ایمیل است',
    words: ['электронная', 'почта', 'Это'],
    answer: ['Это', 'электронная', 'почта']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это компьютер',
    question: 'ترجمه را بساز:',
    text: 'Это компьютер',
    words: ['است', 'کامپیوتر', 'این'],
    answer: ['این', 'کامپیوتر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это клавиатура',
    question: 'ترجمه را بساز:',
    text: 'Это клавиатура',
    words: ['است', 'صفحه کلید', 'این'],
    answer: ['این', 'صفحه کلید', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это мышь',
    question: 'ترجمه را بساز:',
    text: 'Это мышь',
    words: ['است', 'موشواره', 'این'],
    answer: ['این', 'موشواره', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это интернет',
    question: 'ترجمه را بساز:',
    text: 'Это интернет',
    words: ['است', 'اینترنت', 'این'],
    answer: ['این', 'اینترنت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это электронная почта',
    question: 'ترجمه را بساز:',
    text: 'Это электронная почта',
    words: ['است', 'ایمیل', 'این'],
    answer: ['این', 'ایمیل', 'است']
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

  // ===== بخش BUILD RU / FA =====
  if (q.type === 'build-ru' || q.type === 'build-fa') {
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

    if (q.type === 'build-ru') {
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