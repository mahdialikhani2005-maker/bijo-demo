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

// ===== سوالات درس ۳۹ - روسی به فارسی (آب و هوا) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "туман" است؟',
    speak: 'туман',
    options: [
      { text: 'туман', image: '../../../media/a2/weather/fog.png' },
      { text: 'град', image: '../../../media/a2/weather/hail.png' },
      { text: 'снежинка', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'молния', image: '../../../media/a2/weather/lightning.png' }
    ],
    answer: 'туман'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "град" است؟',
    speak: 'град',
    options: [
      { text: 'туман', image: '../../../media/a2/weather/fog.png' },
      { text: 'град', image: '../../../media/a2/weather/hail.png' },
      { text: 'гром', image: '../../../media/a2/weather/thunder.png' },
      { text: 'снежинка', image: '../../../media/a2/weather/snowflake.png' }
    ],
    answer: 'град'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "снежинка" است؟',
    speak: 'снежинка',
    options: [
      { text: 'молния', image: '../../../media/a2/weather/lightning.png' },
      { text: 'туман', image: '../../../media/a2/weather/fog.png' },
      { text: 'снежинка', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'град', image: '../../../media/a2/weather/hail.png' }
    ],
    answer: 'снежинка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "молния" است؟',
    speak: 'молния',
    options: [
      { text: 'туман', image: '../../../media/a2/weather/fog.png' },
      { text: 'молния', image: '../../../media/a2/weather/lightning.png' },
      { text: 'град', image: '../../../media/a2/weather/hail.png' },
      { text: 'гром', image: '../../../media/a2/weather/thunder.png' }
    ],
    answer: 'молния'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "гром" است؟',
    speak: 'гром',
    options: [
      { text: 'снежинка', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'гром', image: '../../../media/a2/weather/thunder.png' },
      { text: 'молния', image: '../../../media/a2/weather/lightning.png' },
      { text: 'туман', image: '../../../media/a2/weather/fog.png' }
    ],
    answer: 'гром'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/fog.png',
    options: ['туман', 'град', 'снежинка', 'молния'],
    answer: 'туман'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/hail.png',
    options: ['туман', 'град', 'гром', 'снежинка'],
    answer: 'град'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/snowflake.png',
    options: ['молния', 'туман', 'снежинка', 'град'],
    answer: 'снежинка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/lightning.png',
    options: ['туман', 'молния', 'град', 'гром'],
    answer: 'молния'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/thunder.png',
    options: ['снежинка', 'гром', 'молния', 'туман'],
    answer: 'гром'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'туман',
    question: 'کدام کلمه را شنیدی؟',
    options: ['туман', 'град', 'снежинка', 'молния'],
    answer: 'туман'
  },
  {
    type: 'audio',
    speak: 'град',
    question: 'کدام کلمه را شنیدی؟',
    options: ['туман', 'град', 'гром', 'снежинка'],
    answer: 'град'
  },
  {
    type: 'audio',
    speak: 'снежинка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['молния', 'туман', 'снежинка', 'град'],
    answer: 'снежинка'
  },
  {
    type: 'audio',
    speak: 'молния',
    question: 'کدام کلمه را شنیدی؟',
    options: ['туман', 'молния', 'град', 'гром'],
    answer: 'молния'
  },
  {
    type: 'audio',
    speak: 'гром',
    question: 'کدام کلمه را شنیدی؟',
    options: ['снежинка', 'гром', 'молния', 'туман'],
    answer: 'гром'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'туман',
    image: '../../../media/a2/weather/fog.png',
    meaning: 'مه'
  },
  {
    type: 'speak',
    word: 'град',
    image: '../../../media/a2/weather/hail.png',
    meaning: 'تگرگ'
  },
  {
    type: 'speak',
    word: 'снежинка',
    image: '../../../media/a2/weather/snowflake.png',
    meaning: 'دانه برف'
  },
  {
    type: 'speak',
    word: 'молния',
    image: '../../../media/a2/weather/lightning.png',
    meaning: 'صاعقه'
  },
  {
    type: 'speak',
    word: 'гром',
    image: '../../../media/a2/weather/thunder.png',
    meaning: 'رعد'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это туман',
    question: 'جمله روسی را بساز:',
    text: 'این مه است',
    words: ['туман', 'Это'],
    answer: ['Это', 'туман']
  },
  {
    type: 'build-ru',
    speak: 'Это град',
    question: 'جمله روسی را بساز:',
    text: 'این تگرگ است',
    words: ['град', 'Это'],
    answer: ['Это', 'град']
  },
  {
    type: 'build-ru',
    speak: 'Это снежинка',
    question: 'جمله روسی را بساز:',
    text: 'این دانه برف است',
    words: ['снежинка', 'Это'],
    answer: ['Это', 'снежинка']
  },
  {
    type: 'build-ru',
    speak: 'Это молния',
    question: 'جمله روسی را بساز:',
    text: 'این صاعقه است',
    words: ['молния', 'Это'],
    answer: ['Это', 'молния']
  },
  {
    type: 'build-ru',
    speak: 'Это гром',
    question: 'جمله روسی را بساز:',
    text: 'این رعد است',
    words: ['гром', 'Это'],
    answer: ['Это', 'гром']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это туман',
    question: 'ترجمه را بساز:',
    text: 'Это туман',
    words: ['است', 'مه', 'این'],
    answer: ['این', 'مه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это град',
    question: 'ترجمه را بساز:',
    text: 'Это град',
    words: ['است', 'تگرگ', 'این'],
    answer: ['این', 'تگرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это снежинка',
    question: 'ترجمه را بساز:',
    text: 'Это снежинка',
    words: ['است', 'دانه برف', 'این'],
    answer: ['این', 'دانه برف', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это молния',
    question: 'ترجمه را بساز:',
    text: 'Это молния',
    words: ['است', 'صاعقه', 'این'],
    answer: ['این', 'صاعقه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это гром',
    question: 'ترجمه را بساز:',
    text: 'Это гром',
    words: ['است', 'رعد', 'این'],
    answer: ['این', 'رعد', 'است']
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