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

// ===== سوالات درس ۴۶ - روسی به فارسی (لوازم مدرسه) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "тетрадь" است؟',
    speak: 'тетрадь',
    options: [
      { text: 'тетрадь', image: '../../../media/a2/school/notebook.png' },
      { text: 'карандаш', image: '../../../media/a2/school/pencil.png' },
      { text: 'линейка', image: '../../../media/a2/school/ruler.png' },
      { text: 'ластик', image: '../../../media/a2/school/eraser.png' }
    ],
    answer: 'тетрадь'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "карандаш" است؟',
    speak: 'карандаш',
    options: [
      { text: 'тетрадь', image: '../../../media/a2/school/notebook.png' },
      { text: 'карандаш', image: '../../../media/a2/school/pencil.png' },
      { text: 'калькулятор', image: '../../../media/a2/school/calculator.png' },
      { text: 'линейка', image: '../../../media/a2/school/ruler.png' }
    ],
    answer: 'карандаш'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "линейка" است؟',
    speak: 'линейка',
    options: [
      { text: 'ластик', image: '../../../media/a2/school/eraser.png' },
      { text: 'тетрадь', image: '../../../media/a2/school/notebook.png' },
      { text: 'линейка', image: '../../../media/a2/school/ruler.png' },
      { text: 'карандаш', image: '../../../media/a2/school/pencil.png' }
    ],
    answer: 'линейка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ластик" است؟',
    speak: 'ластик',
    options: [
      { text: 'тетрадь', image: '../../../media/a2/school/notebook.png' },
      { text: 'ластик', image: '../../../media/a2/school/eraser.png' },
      { text: 'карандаш', image: '../../../media/a2/school/pencil.png' },
      { text: 'калькулятор', image: '../../../media/a2/school/calculator.png' }
    ],
    answer: 'ластик'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "калькулятор" است؟',
    speak: 'калькулятор',
    options: [
      { text: 'линейка', image: '../../../media/a2/school/ruler.png' },
      { text: 'калькулятор', image: '../../../media/a2/school/calculator.png' },
      { text: 'ластик', image: '../../../media/a2/school/eraser.png' },
      { text: 'тетрадь', image: '../../../media/a2/school/notebook.png' }
    ],
    answer: 'калькулятор'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/notebook.png',
    options: ['тетрадь', 'карандаш', 'линейка', 'ластик'],
    answer: 'тетрадь'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/pencil.png',
    options: ['тетрадь', 'карандаш', 'калькулятор', 'линейка'],
    answer: 'карандаш'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/ruler.png',
    options: ['ластик', 'тетрадь', 'линейка', 'карандаш'],
    answer: 'линейка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/eraser.png',
    options: ['тетрадь', 'ластик', 'карандаш', 'калькулятор'],
    answer: 'ластик'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/calculator.png',
    options: ['линейка', 'калькулятор', 'ластик', 'тетрадь'],
    answer: 'калькулятор'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'тетрадь',
    question: 'کدام کلمه را شنیدی؟',
    options: ['тетрадь', 'карандаш', 'линейка', 'ластик'],
    answer: 'тетрадь'
  },
  {
    type: 'audio',
    speak: 'карандаш',
    question: 'کدام کلمه را شنیدی؟',
    options: ['тетрадь', 'карандаш', 'калькулятор', 'линейка'],
    answer: 'карандаш'
  },
  {
    type: 'audio',
    speak: 'линейка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ластик', 'тетрадь', 'линейка', 'карандаш'],
    answer: 'линейка'
  },
  {
    type: 'audio',
    speak: 'ластик',
    question: 'کدام کلمه را شنیدی؟',
    options: ['тетрадь', 'ластик', 'карандаш', 'калькулятор'],
    answer: 'ластик'
  },
  {
    type: 'audio',
    speak: 'калькулятор',
    question: 'کدام کلمه را شنیدی؟',
    options: ['линейка', 'калькулятор', 'ластик', 'тетрадь'],
    answer: 'калькулятор'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'тетрадь',
    image: '../../../media/a2/school/notebook.png',
    meaning: 'دفتر'
  },
  {
    type: 'speak',
    word: 'карандаш',
    image: '../../../media/a2/school/pencil.png',
    meaning: 'مداد'
  },
  {
    type: 'speak',
    word: 'линейка',
    image: '../../../media/a2/school/ruler.png',
    meaning: 'خط‌کش'
  },
  {
    type: 'speak',
    word: 'ластик',
    image: '../../../media/a2/school/eraser.png',
    meaning: 'پاک‌کن'
  },
  {
    type: 'speak',
    word: 'калькулятор',
    image: '../../../media/a2/school/calculator.png',
    meaning: 'ماشین حساب'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это тетрадь',
    question: 'جمله روسی را بساز:',
    text: 'این دفتر است',
    words: ['тетрадь', 'Это'],
    answer: ['Это', 'тетрадь']
  },
  {
    type: 'build-ru',
    speak: 'Это карандаш',
    question: 'جمله روسی را بساز:',
    text: 'این مداد است',
    words: ['карандаш', 'Это'],
    answer: ['Это', 'карандаш']
  },
  {
    type: 'build-ru',
    speak: 'Это линейка',
    question: 'جمله روسی را بساز:',
    text: 'این خط‌کش است',
    words: ['линейка', 'Это'],
    answer: ['Это', 'линейка']
  },
  {
    type: 'build-ru',
    speak: 'Это ластик',
    question: 'جمله روسی را بساز:',
    text: 'این پاک‌کن است',
    words: ['ластик', 'Это'],
    answer: ['Это', 'ластик']
  },
  {
    type: 'build-ru',
    speak: 'Это калькулятор',
    question: 'جمله روسی را بساز:',
    text: 'این ماشین حساب است',
    words: ['калькулятор', 'Это'],
    answer: ['Это', 'калькулятор']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это тетрадь',
    question: 'ترجمه را بساز:',
    text: 'Это тетрадь',
    words: ['است', 'دفتر', 'این'],
    answer: ['این', 'دفتر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это карандаш',
    question: 'ترجمه را بساز:',
    text: 'Это карандаш',
    words: ['است', 'مداد', 'این'],
    answer: ['این', 'مداد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это линейка',
    question: 'ترجمه را بساز:',
    text: 'Это линейка',
    words: ['است', 'خط‌کش', 'این'],
    answer: ['این', 'خط‌کش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это ластик',
    question: 'ترجمه را بساز:',
    text: 'Это ластик',
    words: ['است', 'پاک‌کن', 'این'],
    answer: ['این', 'پاک‌کن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это калькулятор',
    question: 'ترجمه را بساز:',
    text: 'Это калькулятор',
    words: ['است', 'ماشین حساب', 'این'],
    answer: ['این', 'ماشین حساب', 'است']
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