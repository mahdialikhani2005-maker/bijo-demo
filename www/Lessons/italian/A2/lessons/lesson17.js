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

// ===== سوالات درس ۱۷ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il cameriere" است؟',
    speak: 'il cameriere',
    options: [
      { text: 'il cameriere', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'la cameriera', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'il barbiere', image: '../../../media/a2/jobs/barber.png' },
      { text: 'il macellaio', image: '../../../media/a2/jobs/butcher.png' }
    ],
    answer: 'il cameriere'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la cameriera" است؟',
    speak: 'la cameriera',
    options: [
      { text: 'il cameriere', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'la cameriera', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'il sarto', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'il barbiere', image: '../../../media/a2/jobs/barber.png' }
    ],
    answer: 'la cameriera'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il barbiere" است؟',
    speak: 'il barbiere',
    options: [
      { text: 'il macellaio', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'il cameriere', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'il barbiere', image: '../../../media/a2/jobs/barber.png' },
      { text: 'la cameriera', image: '../../../media/a2/jobs/waitress.png' }
    ],
    answer: 'il barbiere'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il sarto" است؟',
    speak: 'il sarto',
    options: [
      { text: 'la cameriera', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'il sarto', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'il macellaio', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'il cameriere', image: '../../../media/a2/jobs/waiter.png' }
    ],
    answer: 'il sarto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il macellaio" است؟',
    speak: 'il macellaio',
    options: [
      { text: 'il cameriere', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'il barbiere', image: '../../../media/a2/jobs/barber.png' },
      { text: 'il macellaio', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'il sarto', image: '../../../media/a2/jobs/tailor.png' }
    ],
    answer: 'il macellaio'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waiter.png',
    options: ['il cameriere', 'la cameriera', 'il barbiere', 'il macellaio'],
    answer: 'il cameriere'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waitress.png',
    options: ['il cameriere', 'la cameriera', 'il sarto', 'il barbiere'],
    answer: 'la cameriera'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/barber.png',
    options: ['il macellaio', 'il cameriere', 'il barbiere', 'la cameriera'],
    answer: 'il barbiere'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/tailor.png',
    options: ['la cameriera', 'il sarto', 'il macellaio', 'il cameriere'],
    answer: 'il sarto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/butcher.png',
    options: ['il cameriere', 'il barbiere', 'il macellaio', 'il sarto'],
    answer: 'il macellaio'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il cameriere',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cameriere', 'la cameriera', 'il barbiere', 'il macellaio'],
    answer: 'il cameriere'
  },
  {
    type: 'audio',
    speak: 'la cameriera',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cameriere', 'la cameriera', 'il sarto', 'il barbiere'],
    answer: 'la cameriera'
  },
  {
    type: 'audio',
    speak: 'il barbiere',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il macellaio', 'il cameriere', 'il barbiere', 'la cameriera'],
    answer: 'il barbiere'
  },
  {
    type: 'audio',
    speak: 'il sarto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la cameriera', 'il sarto', 'il macellaio', 'il cameriere'],
    answer: 'il sarto'
  },
  {
    type: 'audio',
    speak: 'il macellaio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il cameriere', 'il barbiere', 'il macellaio', 'il sarto'],
    answer: 'il macellaio'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il cameriere',
    image: '../../../media/a2/jobs/waiter.png',
    meaning: 'پیشخدمت'
  },
  {
    type: 'speak',
    word: 'la cameriera',
    image: '../../../media/a2/jobs/waitress.png',
    meaning: 'پیشخدمت (زن)'
  },
  {
    type: 'speak',
    word: 'il barbiere',
    image: '../../../media/a2/jobs/barber.png',
    meaning: 'آرایشگر'
  },
  {
    type: 'speak',
    word: 'il sarto',
    image: '../../../media/a2/jobs/tailor.png',
    meaning: 'خیاط'
  },
  {
    type: 'speak',
    word: 'il macellaio',
    image: '../../../media/a2/jobs/butcher.png',
    meaning: 'قصاب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Sono un cameriere',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من پیشخدمت هستم',
    words: ['cameriere', 'un', 'Sono'],
    answer: ['Sono', 'un', 'cameriere']
  },
  {
    type: 'build-it',
    speak: 'Sono una cameriera',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من پیشخدمت (زن) هستم',
    words: ['cameriera', 'una', 'Sono'],
    answer: ['Sono', 'una', 'cameriera']
  },
  {
    type: 'build-it',
    speak: 'Sono un barbiere',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من آرایشگر هستم',
    words: ['barbiere', 'un', 'Sono'],
    answer: ['Sono', 'un', 'barbiere']
  },
  {
    type: 'build-it',
    speak: 'Sono un sarto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من خیاط هستم',
    words: ['sarto', 'un', 'Sono'],
    answer: ['Sono', 'un', 'sarto']
  },
  {
    type: 'build-it',
    speak: 'Sono un macellaio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من قصاب هستم',
    words: ['macellaio', 'un', 'Sono'],
    answer: ['Sono', 'un', 'macellaio']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Sono un cameriere',
    question: 'ترجمه را بساز:',
    text: 'Sono un cameriere',
    words: ['هستم', 'پیشخدمت', 'من'],
    answer: ['من', 'پیشخدمت', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono una cameriera',
    question: 'ترجمه را بساز:',
    text: 'Sono una cameriera',
    words: ['هستم', 'پیشخدمت (زن)', 'من'],
    answer: ['من', 'پیشخدمت (زن)', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un barbiere',
    question: 'ترجمه را بساز:',
    text: 'Sono un barbiere',
    words: ['هستم', 'آرایشگر', 'من'],
    answer: ['من', 'آرایشگر', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un sarto',
    question: 'ترجمه را بساز:',
    text: 'Sono un sarto',
    words: ['هستم', 'خیاط', 'من'],
    answer: ['من', 'خیاط', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un macellaio',
    question: 'ترجمه را بساز:',
    text: 'Sono un macellaio',
    words: ['هستم', 'قصاب', 'من'],
    answer: ['من', 'قصاب', 'هستم']
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