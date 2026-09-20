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

// ===== سوالات درس ۴۲ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il cervello" است؟',
    speak: 'il cervello',
    options: [
      { text: 'il cervello', image: '../../../media/a2/body/brain.png' },
      { text: 'il nervo', image: '../../../media/a2/body/nerve.png' },
      { text: 'la vena', image: '../../../media/a2/body/vein.png' },
      { text: 'l\'articolazione', image: '../../../media/a2/body/joint.png' }
    ],
    answer: 'il cervello'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il nervo" است؟',
    speak: 'il nervo',
    options: [
      { text: 'il cervello', image: '../../../media/a2/body/brain.png' },
      { text: 'il nervo', image: '../../../media/a2/body/nerve.png' },
      { text: 'l\'arteria', image: '../../../media/a2/body/artery.png' },
      { text: 'la vena', image: '../../../media/a2/body/vein.png' }
    ],
    answer: 'il nervo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la vena" است؟',
    speak: 'la vena',
    options: [
      { text: 'l\'articolazione', image: '../../../media/a2/body/joint.png' },
      { text: 'il cervello', image: '../../../media/a2/body/brain.png' },
      { text: 'la vena', image: '../../../media/a2/body/vein.png' },
      { text: 'il nervo', image: '../../../media/a2/body/nerve.png' }
    ],
    answer: 'la vena'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'arteria" است؟',
    speak: 'l\'arteria',
    options: [
      { text: 'il nervo', image: '../../../media/a2/body/nerve.png' },
      { text: 'l\'arteria', image: '../../../media/a2/body/artery.png' },
      { text: 'l\'articolazione', image: '../../../media/a2/body/joint.png' },
      { text: 'il cervello', image: '../../../media/a2/body/brain.png' }
    ],
    answer: 'l\'arteria'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'articolazione" است؟',
    speak: 'l\'articolazione',
    options: [
      { text: 'il cervello', image: '../../../media/a2/body/brain.png' },
      { text: 'la vena', image: '../../../media/a2/body/vein.png' },
      { text: 'l\'articolazione', image: '../../../media/a2/body/joint.png' },
      { text: 'l\'arteria', image: '../../../media/a2/body/artery.png' }
    ],
    answer: 'l\'articolazione'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/brain.png',
    options: ['il cervello', 'il nervo', 'la vena', 'l\'articolazione'],
    answer: 'il cervello'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/nerve.png',
    options: ['il cervello', 'il nervo', 'l\'arteria', 'la vena'],
    answer: 'il nervo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/vein.png',
    options: ['l\'articolazione', 'il cervello', 'la vena', 'il nervo'],
    answer: 'la vena'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/artery.png',
    options: ['il nervo', 'l\'arteria', 'l\'articolazione', 'il cervello'],
    answer: 'l\'arteria'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/joint.png',
    options: ['il cervello', 'la vena', 'l\'articolazione', 'l\'arteria'],
    answer: 'l\'articolazione'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il cervello',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cervello', 'il nervo', 'la vena', 'l\'articolazione'],
    answer: 'il cervello'
  },
  {
    type: 'audio',
    speak: 'il nervo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cervello', 'il nervo', 'l\'arteria', 'la vena'],
    answer: 'il nervo'
  },
  {
    type: 'audio',
    speak: 'la vena',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'articolazione', 'il cervello', 'la vena', 'il nervo'],
    answer: 'la vena'
  },
  {
    type: 'audio',
    speak: 'l\'arteria',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il nervo', 'l\'arteria', 'l\'articolazione', 'il cervello'],
    answer: 'l\'arteria'
  },
  {
    type: 'audio',
    speak: 'l\'articolazione',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cervello', 'la vena', 'l\'articolazione', 'l\'arteria'],
    answer: 'l\'articolazione'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il cervello',
    image: '../../../media/a2/body/brain.png',
    meaning: 'مغز'
  },
  {
    type: 'speak',
    word: 'il nervo',
    image: '../../../media/a2/body/nerve.png',
    meaning: 'عصب'
  },
  {
    type: 'speak',
    word: 'la vena',
    image: '../../../media/a2/body/vein.png',
    meaning: 'ورید'
  },
  {
    type: 'speak',
    word: 'l\'arteria',
    image: '../../../media/a2/body/artery.png',
    meaning: 'سرخرگ'
  },
  {
    type: 'speak',
    word: 'l\'articolazione',
    image: '../../../media/a2/body/joint.png',
    meaning: 'مفصل'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Ho un cervello',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک مغز دارم',
    words: ['cervello', 'un', 'Ho'],
    answer: ['Ho', 'un', 'cervello']
  },
  {
    type: 'build-it',
    speak: 'Ho un nervo',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک عصب دارم',
    words: ['nervo', 'un', 'Ho'],
    answer: ['Ho', 'un', 'nervo']
  },
  {
    type: 'build-it',
    speak: 'Ho una vena',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک ورید دارم',
    words: ['vena', 'una', 'Ho'],
    answer: ['Ho', 'una', 'vena']
  },
  {
    type: 'build-it',
    speak: 'Ho un\'arteria',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک سرخرگ دارم',
    words: ['arteria', 'un\'', 'Ho'],
    answer: ['Ho', 'un\'', 'arteria']
  },
  {
    type: 'build-it',
    speak: 'Ho un\'articolazione',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک مفصل دارم',
    words: ['articolazione', 'un\'', 'Ho'],
    answer: ['Ho', 'un\'', 'articolazione']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ho un cervello',
    question: 'ترجمه را بساز:',
    text: 'Ho un cervello',
    words: ['دارم', 'مغز', 'یک', 'من'],
    answer: ['من', 'یک', 'مغز', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho un nervo',
    question: 'ترجمه را بساز:',
    text: 'Ho un nervo',
    words: ['دارم', 'عصب', 'یک', 'من'],
    answer: ['من', 'یک', 'عصب', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho una vena',
    question: 'ترجمه را بساز:',
    text: 'Ho una vena',
    words: ['دارم', 'ورید', 'یک', 'من'],
    answer: ['من', 'یک', 'ورید', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho un\'arteria',
    question: 'ترجمه را بساز:',
    text: 'Ho un\'arteria',
    words: ['دارم', 'سرخرگ', 'یک', 'من'],
    answer: ['من', 'یک', 'سرخرگ', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ho un\'articolazione',
    question: 'ترجمه را بساز:',
    text: 'Ho un\'articolazione',
    words: ['دارم', 'مفصل', 'یک', 'من'],
    answer: ['من', 'یک', 'مفصل', 'دارم']
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