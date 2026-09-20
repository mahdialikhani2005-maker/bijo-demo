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

// ===== سوالات درس ۲۹ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "i pantaloncini" است؟',
    speak: 'i pantaloncini',
    options: [
      { text: 'i pantaloncini', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la gonna', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'i calzini', image: '../../../media/a2/clothes/socks.png' },
      { text: 'il pigiama', image: '../../../media/a2/clothes/pajama.png' }
    ],
    answer: 'i pantaloncini'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la gonna" است؟',
    speak: 'la gonna',
    options: [
      { text: 'i pantaloncini', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la gonna', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'la biancheria intima', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'i calzini', image: '../../../media/a2/clothes/socks.png' }
    ],
    answer: 'la gonna'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "i calzini" است؟',
    speak: 'i calzini',
    options: [
      { text: 'il pigiama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'i pantaloncini', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'i calzini', image: '../../../media/a2/clothes/socks.png' },
      { text: 'la gonna', image: '../../../media/a2/clothes/skirt.png' }
    ],
    answer: 'i calzini'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la biancheria intima" است؟',
    speak: 'la biancheria intima',
    options: [
      { text: 'i calzini', image: '../../../media/a2/clothes/socks.png' },
      { text: 'la biancheria intima', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'il pigiama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'i pantaloncini', image: '../../../media/a2/clothes/shorts.png' }
    ],
    answer: 'la biancheria intima'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il pigiama" است؟',
    speak: 'il pigiama',
    options: [
      { text: 'i pantaloncini', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la gonna', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'il pigiama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'la biancheria intima', image: '../../../media/a2/clothes/underwear.png' }
    ],
    answer: 'il pigiama'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/shorts.png',
    options: ['i pantaloncini', 'la gonna', 'i calzini', 'il pigiama'],
    answer: 'i pantaloncini'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/skirt.png',
    options: ['i pantaloncini', 'la gonna', 'la biancheria intima', 'i calzini'],
    answer: 'la gonna'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/socks.png',
    options: ['il pigiama', 'i pantaloncini', 'i calzini', 'la gonna'],
    answer: 'i calzini'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/underwear.png',
    options: ['i calzini', 'la biancheria intima', 'il pigiama', 'i pantaloncini'],
    answer: 'la biancheria intima'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/pajama.png',
    options: ['i pantaloncini', 'la gonna', 'il pigiama', 'la biancheria intima'],
    answer: 'il pigiama'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'i pantaloncini',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i pantaloncini', 'la gonna', 'i calzini', 'il pigiama'],
    answer: 'i pantaloncini'
  },
  {
    type: 'audio',
    speak: 'la gonna',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i pantaloncini', 'la gonna', 'la biancheria intima', 'i calzini'],
    answer: 'la gonna'
  },
  {
    type: 'audio',
    speak: 'i calzini',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il pigiama', 'i pantaloncini', 'i calzini', 'la gonna'],
    answer: 'i calzini'
  },
  {
    type: 'audio',
    speak: 'la biancheria intima',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i calzini', 'la biancheria intima', 'il pigiama', 'i pantaloncini'],
    answer: 'la biancheria intima'
  },
  {
    type: 'audio',
    speak: 'il pigiama',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i pantaloncini', 'la gonna', 'il pigiama', 'la biancheria intima'],
    answer: 'il pigiama'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'i pantaloncini',
    image: '../../../media/a2/clothes/shorts.png',
    meaning: 'شورت'
  },
  {
    type: 'speak',
    word: 'la gonna',
    image: '../../../media/a2/clothes/skirt.png',
    meaning: 'دامن'
  },
  {
    type: 'speak',
    word: 'i calzini',
    image: '../../../media/a2/clothes/socks.png',
    meaning: 'جوراب'
  },
  {
    type: 'speak',
    word: 'la biancheria intima',
    image: '../../../media/a2/clothes/underwear.png',
    meaning: 'لباس زیر'
  },
  {
    type: 'speak',
    word: 'il pigiama',
    image: '../../../media/a2/clothes/pajama.png',
    meaning: 'پیژامه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Indosso i pantaloncini',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من شورت می‌پوشم',
    words: ['pantaloncini', 'i', 'Indosso'],
    answer: ['Indosso', 'i', 'pantaloncini']
  },
  {
    type: 'build-it',
    speak: 'Indosso una gonna',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من دامن می‌پوشم',
    words: ['gonna', 'una', 'Indosso'],
    answer: ['Indosso', 'una', 'gonna']
  },
  {
    type: 'build-it',
    speak: 'Indosso i calzini',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من جوراب می‌پوشم',
    words: ['calzini', 'i', 'Indosso'],
    answer: ['Indosso', 'i', 'calzini']
  },
  {
    type: 'build-it',
    speak: 'Indosso la biancheria intima',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من لباس زیر می‌پوشم',
    words: ['intima', 'biancheria', 'la', 'Indosso'],
    answer: ['Indosso', 'la', 'biancheria', 'intima']
  },
  {
    type: 'build-it',
    speak: 'Indosso il pigiama',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من پیژامه می‌پوشم',
    words: ['pigiama', 'il', 'Indosso'],
    answer: ['Indosso', 'il', 'pigiama']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Indosso i pantaloncini',
    question: 'ترجمه را بساز:',
    text: 'Indosso i pantaloncini',
    words: ['می‌پوشم', 'شورت', 'من'],
    answer: ['من', 'شورت', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso una gonna',
    question: 'ترجمه را بساز:',
    text: 'Indosso una gonna',
    words: ['می‌پوشم', 'دامن', 'یک', 'من'],
    answer: ['من', 'یک', 'دامن', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso i calzini',
    question: 'ترجمه را بساز:',
    text: 'Indosso i calzini',
    words: ['می‌پوشم', 'جوراب', 'من'],
    answer: ['من', 'جوراب', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso la biancheria intima',
    question: 'ترجمه را بساز:',
    text: 'Indosso la biancheria intima',
    words: ['می‌پوشم', 'زیر', 'لباس', 'من'],
    answer: ['من', 'لباس', 'زیر', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso il pigiama',
    question: 'ترجمه را بساز:',
    text: 'Indosso il pigiama',
    words: ['می‌پوشم', 'پیژامه', 'من'],
    answer: ['من', 'پیژامه', 'می‌پوشم']
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