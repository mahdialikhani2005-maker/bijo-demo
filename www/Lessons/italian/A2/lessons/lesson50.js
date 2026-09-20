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

// ===== سوالات درس ۵۰ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il saggio" است؟',
    speak: 'il saggio',
    options: [
      { text: 'il saggio', image: '../../../media/a2/school/essay.png' },
      { text: 'la tesi', image: '../../../media/a2/school/thesis.png' },
      { text: 'il rapporto', image: '../../../media/a2/school/report.png' },
      { text: 'il progetto', image: '../../../media/a2/school/project.png' }
    ],
    answer: 'il saggio'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la tesi" است؟',
    speak: 'la tesi',
    options: [
      { text: 'il saggio', image: '../../../media/a2/school/essay.png' },
      { text: 'la tesi', image: '../../../media/a2/school/thesis.png' },
      { text: 'il workshop', image: '../../../media/a2/school/workshop.png' },
      { text: 'il rapporto', image: '../../../media/a2/school/report.png' }
    ],
    answer: 'la tesi'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il rapporto" است؟',
    speak: 'il rapporto',
    options: [
      { text: 'il progetto', image: '../../../media/a2/school/project.png' },
      { text: 'il saggio', image: '../../../media/a2/school/essay.png' },
      { text: 'il rapporto', image: '../../../media/a2/school/report.png' },
      { text: 'la tesi', image: '../../../media/a2/school/thesis.png' }
    ],
    answer: 'il rapporto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il progetto" است؟',
    speak: 'il progetto',
    options: [
      { text: 'la tesi', image: '../../../media/a2/school/thesis.png' },
      { text: 'il progetto', image: '../../../media/a2/school/project.png' },
      { text: 'il workshop', image: '../../../media/a2/school/workshop.png' },
      { text: 'il saggio', image: '../../../media/a2/school/essay.png' }
    ],
    answer: 'il progetto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il workshop" است؟',
    speak: 'il workshop',
    options: [
      { text: 'il saggio', image: '../../../media/a2/school/essay.png' },
      { text: 'il rapporto', image: '../../../media/a2/school/report.png' },
      { text: 'il workshop', image: '../../../media/a2/school/workshop.png' },
      { text: 'il progetto', image: '../../../media/a2/school/project.png' }
    ],
    answer: 'il workshop'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/essay.png',
    options: ['il saggio', 'la tesi', 'il rapporto', 'il progetto'],
    answer: 'il saggio'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/thesis.png',
    options: ['il saggio', 'la tesi', 'il workshop', 'il rapporto'],
    answer: 'la tesi'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/report.png',
    options: ['il progetto', 'il saggio', 'il rapporto', 'la tesi'],
    answer: 'il rapporto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/project.png',
    options: ['la tesi', 'il progetto', 'il workshop', 'il saggio'],
    answer: 'il progetto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/workshop.png',
    options: ['il saggio', 'il rapporto', 'il workshop', 'il progetto'],
    answer: 'il workshop'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il saggio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il saggio', 'la tesi', 'il rapporto', 'il progetto'],
    answer: 'il saggio'
  },
  {
    type: 'audio',
    speak: 'la tesi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il saggio', 'la tesi', 'il workshop', 'il rapporto'],
    answer: 'la tesi'
  },
  {
    type: 'audio',
    speak: 'il rapporto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il progetto', 'il saggio', 'il rapporto', 'la tesi'],
    answer: 'il rapporto'
  },
  {
    type: 'audio',
    speak: 'il progetto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tesi', 'il progetto', 'il workshop', 'il saggio'],
    answer: 'il progetto'
  },
  {
    type: 'audio',
    speak: 'il workshop',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il saggio', 'il rapporto', 'il workshop', 'il progetto'],
    answer: 'il workshop'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il saggio',
    image: '../../../media/a2/school/essay.png',
    meaning: 'مقاله'
  },
  {
    type: 'speak',
    word: 'la tesi',
    image: '../../../media/a2/school/thesis.png',
    meaning: 'پایان‌نامه'
  },
  {
    type: 'speak',
    word: 'il rapporto',
    image: '../../../media/a2/school/report.png',
    meaning: 'گزارش'
  },
  {
    type: 'speak',
    word: 'il progetto',
    image: '../../../media/a2/school/project.png',
    meaning: 'پروژه'
  },
  {
    type: 'speak',
    word: 'il workshop',
    image: '../../../media/a2/school/workshop.png',
    meaning: 'کارگاه آموزشی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Scrivo un saggio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک مقاله می‌نویسم',
    words: ['saggio', 'un', 'Scrivo'],
    answer: ['Scrivo', 'un', 'saggio']
  },
  {
    type: 'build-it',
    speak: 'Scrivo una tesi',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک پایان‌نامه می‌نویسم',
    words: ['tesi', 'una', 'Scrivo'],
    answer: ['Scrivo', 'una', 'tesi']
  },
  {
    type: 'build-it',
    speak: 'Scrivo un rapporto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک گزارش می‌نویسم',
    words: ['rapporto', 'un', 'Scrivo'],
    answer: ['Scrivo', 'un', 'rapporto']
  },
  {
    type: 'build-it',
    speak: 'Faccio un progetto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک پروژه انجام می‌دهم',
    words: ['progetto', 'un', 'Faccio'],
    answer: ['Faccio', 'un', 'progetto']
  },
  {
    type: 'build-it',
    speak: 'Vado a un workshop',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من به یک کارگاه آموزشی می‌روم',
    words: ['workshop', 'un', 'a', 'Vado'],
    answer: ['Vado', 'a', 'un', 'workshop']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Scrivo un saggio',
    question: 'ترجمه را بساز:',
    text: 'Scrivo un saggio',
    words: ['می‌نویسم', 'مقاله', 'یک', 'من'],
    answer: ['من', 'یک', 'مقاله', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: 'Scrivo una tesi',
    question: 'ترجمه را بساز:',
    text: 'Scrivo una tesi',
    words: ['می‌نویسم', 'پایان‌نامه', 'یک', 'من'],
    answer: ['من', 'یک', 'پایان‌نامه', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: 'Scrivo un rapporto',
    question: 'ترجمه را بساز:',
    text: 'Scrivo un rapporto',
    words: ['می‌نویسم', 'گزارش', 'یک', 'من'],
    answer: ['من', 'یک', 'گزارش', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: 'Faccio un progetto',
    question: 'ترجمه را بساز:',
    text: 'Faccio un progetto',
    words: ['می‌کنم', 'پروژه', 'یک', 'انجام', 'من'],
    answer: ['من', 'یک', 'پروژه', 'انجام', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Vado a un workshop',
    question: 'ترجمه را بساز:',
    text: 'Vado a un workshop',
    words: ['می‌روم', 'کارگاه آموزشی', 'یک', 'به', 'من'],
    answer: ['من', 'به', 'یک', 'کارگاه آموزشی', 'می‌روم']
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