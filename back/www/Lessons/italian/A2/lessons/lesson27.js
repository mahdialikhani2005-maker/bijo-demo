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

// ===== سوالات درس ۲۷ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il braccialetto" است؟',
    speak: 'il braccialetto',
    options: [
      { text: 'il braccialetto', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'l\'orecchino', image: '../../../media/a2/clothes/earring.png' },
      { text: 'l\'anello', image: '../../../media/a2/clothes/ring.png' },
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' }
    ],
    answer: 'il braccialetto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'orecchino" است؟',
    speak: 'l\'orecchino',
    options: [
      { text: 'il braccialetto', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'l\'orecchino', image: '../../../media/a2/clothes/earring.png' },
      { text: 'la catena', image: '../../../media/a2/clothes/chain.png' },
      { text: 'l\'anello', image: '../../../media/a2/clothes/ring.png' }
    ],
    answer: 'l\'orecchino'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'anello" است؟',
    speak: 'l\'anello',
    options: [
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' },
      { text: 'il braccialetto', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'l\'anello', image: '../../../media/a2/clothes/ring.png' },
      { text: 'l\'orecchino', image: '../../../media/a2/clothes/earring.png' }
    ],
    answer: 'l\'anello'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la catena" است؟',
    speak: 'la catena',
    options: [
      { text: 'l\'anello', image: '../../../media/a2/clothes/ring.png' },
      { text: 'la catena', image: '../../../media/a2/clothes/chain.png' },
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' },
      { text: 'il braccialetto', image: '../../../media/a2/clothes/bracelet.png' }
    ],
    answer: 'la catena'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la corona" است؟',
    speak: 'la corona',
    options: [
      { text: 'il braccialetto', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'l\'orecchino', image: '../../../media/a2/clothes/earring.png' },
      { text: 'la corona', image: '../../../media/a2/clothes/crown.png' },
      { text: 'la catena', image: '../../../media/a2/clothes/chain.png' }
    ],
    answer: 'la corona'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bracelet.png',
    options: ['il braccialetto', 'l\'orecchino', 'l\'anello', 'la corona'],
    answer: 'il braccialetto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/earring.png',
    options: ['il braccialetto', 'l\'orecchino', 'la catena', 'l\'anello'],
    answer: 'l\'orecchino'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/ring.png',
    options: ['la corona', 'il braccialetto', 'l\'anello', 'l\'orecchino'],
    answer: 'l\'anello'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/chain.png',
    options: ['l\'anello', 'la catena', 'la corona', 'il braccialetto'],
    answer: 'la catena'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/crown.png',
    options: ['il braccialetto', 'l\'orecchino', 'la corona', 'la catena'],
    answer: 'la corona'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il braccialetto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il braccialetto', 'l\'orecchino', 'l\'anello', 'la corona'],
    answer: 'il braccialetto'
  },
  {
    type: 'audio',
    speak: 'l\'orecchino',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il braccialetto', 'l\'orecchino', 'la catena', 'l\'anello'],
    answer: 'l\'orecchino'
  },
  {
    type: 'audio',
    speak: 'l\'anello',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la corona', 'il braccialetto', 'l\'anello', 'l\'orecchino'],
    answer: 'l\'anello'
  },
  {
    type: 'audio',
    speak: 'la catena',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'anello', 'la catena', 'la corona', 'il braccialetto'],
    answer: 'la catena'
  },
  {
    type: 'audio',
    speak: 'la corona',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il braccialetto', 'l\'orecchino', 'la corona', 'la catena'],
    answer: 'la corona'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il braccialetto',
    image: '../../../media/a2/clothes/bracelet.png',
    meaning: 'دستبند'
  },
  {
    type: 'speak',
    word: 'l\'orecchino',
    image: '../../../media/a2/clothes/earring.png',
    meaning: 'گوشواره'
  },
  {
    type: 'speak',
    word: 'l\'anello',
    image: '../../../media/a2/clothes/ring.png',
    meaning: 'حلقه'
  },
  {
    type: 'speak',
    word: 'la catena',
    image: '../../../media/a2/clothes/chain.png',
    meaning: 'زنجیر'
  },
  {
    type: 'speak',
    word: 'la corona',
    image: '../../../media/a2/clothes/crown.png',
    meaning: 'تاج'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Indosso un braccialetto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک دستبند می‌بندم',
    words: ['braccialetto', 'un', 'Indosso'],
    answer: ['Indosso', 'un', 'braccialetto']
  },
  {
    type: 'build-it',
    speak: 'Indosso un orecchino',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک گوشواره می‌بندم',
    words: ['orecchino', 'un', 'Indosso'],
    answer: ['Indosso', 'un', 'orecchino']
  },
  {
    type: 'build-it',
    speak: 'Indosso un anello',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک حلقه می‌بندم',
    words: ['anello', 'un', 'Indosso'],
    answer: ['Indosso', 'un', 'anello']
  },
  {
    type: 'build-it',
    speak: 'Indosso una catena',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک زنجیر می‌بندم',
    words: ['catena', 'una', 'Indosso'],
    answer: ['Indosso', 'una', 'catena']
  },
  {
    type: 'build-it',
    speak: 'Indosso una corona',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک تاج می‌بندم',
    words: ['corona', 'una', 'Indosso'],
    answer: ['Indosso', 'una', 'corona']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Indosso un braccialetto',
    question: 'ترجمه را بساز:',
    text: 'Indosso un braccialetto',
    words: ['می‌بندم', 'دستبند', 'یک', 'من'],
    answer: ['من', 'یک', 'دستبند', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso un orecchino',
    question: 'ترجمه را بساز:',
    text: 'Indosso un orecchino',
    words: ['می‌بندم', 'گوشواره', 'یک', 'من'],
    answer: ['من', 'یک', 'گوشواره', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso un anello',
    question: 'ترجمه را بساز:',
    text: 'Indosso un anello',
    words: ['می‌بندم', 'حلقه', 'یک', 'من'],
    answer: ['من', 'یک', 'حلقه', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso una catena',
    question: 'ترجمه را بساز:',
    text: 'Indosso una catena',
    words: ['می‌بندم', 'زنجیر', 'یک', 'من'],
    answer: ['من', 'یک', 'زنجیر', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso una corona',
    question: 'ترجمه را بساز:',
    text: 'Indosso una corona',
    words: ['می‌بندم', 'تاج', 'یک', 'من'],
    answer: ['من', 'یک', 'تاج', 'می‌بندم']
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