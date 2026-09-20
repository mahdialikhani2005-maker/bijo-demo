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

// ===== سوالات درس ۱۰ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il termosifone" است؟',
    speak: 'il termosifone',
    options: [
      { text: 'il termosifone', image: '../../../media/a2/house/heater.png' },
      { text: 'il ventilatore', image: '../../../media/a2/house/fan.png' },
      { text: 'il ferro da stiro', image: '../../../media/a2/house/iron.png' },
      { text: 'la scopa', image: '../../../media/a2/house/broom.png' }
    ],
    answer: 'il termosifone'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il ventilatore" است؟',
    speak: 'il ventilatore',
    options: [
      { text: 'il termosifone', image: '../../../media/a2/house/heater.png' },
      { text: 'il ventilatore', image: '../../../media/a2/house/fan.png' },
      { text: 'l\'aspirapolvere', image: '../../../media/a2/house/vacuum.png' },
      { text: 'il ferro da stiro', image: '../../../media/a2/house/iron.png' }
    ],
    answer: 'il ventilatore'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il ferro da stiro" است؟',
    speak: 'il ferro da stiro',
    options: [
      { text: 'la scopa', image: '../../../media/a2/house/broom.png' },
      { text: 'il termosifone', image: '../../../media/a2/house/heater.png' },
      { text: 'il ferro da stiro', image: '../../../media/a2/house/iron.png' },
      { text: 'il ventilatore', image: '../../../media/a2/house/fan.png' }
    ],
    answer: 'il ferro da stiro'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'aspirapolvere" است؟',
    speak: 'l\'aspirapolvere',
    options: [
      { text: 'il ventilatore', image: '../../../media/a2/house/fan.png' },
      { text: 'l\'aspirapolvere', image: '../../../media/a2/house/vacuum.png' },
      { text: 'la scopa', image: '../../../media/a2/house/broom.png' },
      { text: 'il termosifone', image: '../../../media/a2/house/heater.png' }
    ],
    answer: 'l\'aspirapolvere'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la scopa" است؟',
    speak: 'la scopa',
    options: [
      { text: 'il termosifone', image: '../../../media/a2/house/heater.png' },
      { text: 'il ferro da stiro', image: '../../../media/a2/house/iron.png' },
      { text: 'la scopa', image: '../../../media/a2/house/broom.png' },
      { text: 'l\'aspirapolvere', image: '../../../media/a2/house/vacuum.png' }
    ],
    answer: 'la scopa'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/heater.png',
    options: ['il termosifone', 'il ventilatore', 'il ferro da stiro', 'la scopa'],
    answer: 'il termosifone'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/fan.png',
    options: ['il termosifone', 'il ventilatore', 'l\'aspirapolvere', 'il ferro da stiro'],
    answer: 'il ventilatore'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/iron.png',
    options: ['la scopa', 'il termosifone', 'il ferro da stiro', 'il ventilatore'],
    answer: 'il ferro da stiro'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/vacuum.png',
    options: ['il ventilatore', 'l\'aspirapolvere', 'la scopa', 'il termosifone'],
    answer: 'l\'aspirapolvere'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/broom.png',
    options: ['il termosifone', 'il ferro da stiro', 'la scopa', 'l\'aspirapolvere'],
    answer: 'la scopa'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il termosifone',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il termosifone', 'il ventilatore', 'il ferro da stiro', 'la scopa'],
    answer: 'il termosifone'
  },
  {
    type: 'audio',
    speak: 'il ventilatore',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il termosifone', 'il ventilatore', 'l\'aspirapolvere', 'il ferro da stiro'],
    answer: 'il ventilatore'
  },
  {
    type: 'audio',
    speak: 'il ferro da stiro',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la scopa', 'il termosifone', 'il ferro da stiro', 'il ventilatore'],
    answer: 'il ferro da stiro'
  },
  {
    type: 'audio',
    speak: 'l\'aspirapolvere',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il ventilatore', 'l\'aspirapolvere', 'la scopa', 'il termosifone'],
    answer: 'l\'aspirapolvere'
  },
  {
    type: 'audio',
    speak: 'la scopa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il termosifone', 'il ferro da stiro', 'la scopa', 'l\'aspirapolvere'],
    answer: 'la scopa'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il termosifone',
    image: '../../../media/a2/house/heater.png',
    meaning: 'بخاری'
  },
  {
    type: 'speak',
    word: 'il ventilatore',
    image: '../../../media/a2/house/fan.png',
    meaning: 'پنکه'
  },
  {
    type: 'speak',
    word: 'il ferro da stiro',
    image: '../../../media/a2/house/iron.png',
    meaning: 'اتو'
  },
  {
    type: 'speak',
    word: 'l\'aspirapolvere',
    image: '../../../media/a2/house/vacuum.png',
    meaning: 'جاروبرقی'
  },
  {
    type: 'speak',
    word: 'la scopa',
    image: '../../../media/a2/house/broom.png',
    meaning: 'جارو'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Questo è il mio termosifone',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این بخاری من است',
    words: ['termosifone', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'termosifone']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio ventilatore',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این پنکه من است',
    words: ['ventilatore', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'ventilatore']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio ferro da stiro',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این اتو من است',
    words: ['ferro da stiro', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'ferro da stiro']
  },
  {
    type: 'build-it',
    speak: 'Questo è il mio aspirapolvere',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این جاروبرقی من است',
    words: ['aspirapolvere', 'mio', 'il', 'è', 'Questo'],
    answer: ['Questo', 'è', 'il', 'mio', 'aspirapolvere']
  },
  {
    type: 'build-it',
    speak: 'Questa è la mia scopa',
    question: 'جمله ایتالیایی را بساز:',
    text: 'این جارو من است',
    words: ['scopa', 'mia', 'la', 'è', 'Questa'],
    answer: ['Questa', 'è', 'la', 'mia', 'scopa']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Questo è il mio termosifone',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio termosifone',
    words: ['است', 'بخاری', 'من', 'این'],
    answer: ['این', 'بخاری', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio ventilatore',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio ventilatore',
    words: ['است', 'پنکه', 'من', 'این'],
    answer: ['این', 'پنکه', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio ferro da stiro',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio ferro da stiro',
    words: ['است', 'اتو', 'من', 'این'],
    answer: ['این', 'اتو', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questo è il mio aspirapolvere',
    question: 'ترجمه را بساز:',
    text: 'Questo è il mio aspirapolvere',
    words: ['است', 'جاروبرقی', 'من', 'این'],
    answer: ['این', 'جاروبرقی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Questa è la mia scopa',
    question: 'ترجمه را بساز:',
    text: 'Questa è la mia scopa',
    words: ['است', 'جارو', 'من', 'این'],
    answer: ['این', 'جارو', 'من', 'است']
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