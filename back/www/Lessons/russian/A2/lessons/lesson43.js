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

// ===== سوالات درس ۴۳ - روسی به فارسی (بیماری‌ها و داروها) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "кашель" است؟',
    speak: 'кашель',
    options: [
      { text: 'кашель', image: '../../../media/a2/health/cough.png' },
      { text: 'лихорадка', image: '../../../media/a2/health/fever.png' },
      { text: 'аспирин', image: '../../../media/a2/health/aspirin.png' },
      { text: 'лекарство', image: '../../../media/a2/health/medicine.png' }
    ],
    answer: 'кашель'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "лихорадка" است؟',
    speak: 'лихорадка',
    options: [
      { text: 'кашель', image: '../../../media/a2/health/cough.png' },
      { text: 'лихорадка', image: '../../../media/a2/health/fever.png' },
      { text: 'укол', image: '../../../media/a2/health/injection.png' },
      { text: 'аспирин', image: '../../../media/a2/health/aspirin.png' }
    ],
    answer: 'лихорадка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "аспирин" است؟',
    speak: 'аспирин',
    options: [
      { text: 'лекарство', image: '../../../media/a2/health/medicine.png' },
      { text: 'кашель', image: '../../../media/a2/health/cough.png' },
      { text: 'аспирин', image: '../../../media/a2/health/aspirin.png' },
      { text: 'лихорадка', image: '../../../media/a2/health/fever.png' }
    ],
    answer: 'аспирин'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "лекарство" است؟',
    speak: 'лекарство',
    options: [
      { text: 'кашель', image: '../../../media/a2/health/cough.png' },
      { text: 'лекарство', image: '../../../media/a2/health/medicine.png' },
      { text: 'аспирин', image: '../../../media/a2/health/aspirin.png' },
      { text: 'укол', image: '../../../media/a2/health/injection.png' }
    ],
    answer: 'лекарство'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "укол" است؟',
    speak: 'укол',
    options: [
      { text: 'лихорадка', image: '../../../media/a2/health/fever.png' },
      { text: 'укол', image: '../../../media/a2/health/injection.png' },
      { text: 'лекарство', image: '../../../media/a2/health/medicine.png' },
      { text: 'кашель', image: '../../../media/a2/health/cough.png' }
    ],
    answer: 'укол'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cough.png',
    options: ['кашель', 'лихорадка', 'аспирин', 'лекарство'],
    answer: 'кашель'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/fever.png',
    options: ['кашель', 'лихорадка', 'укол', 'аспирин'],
    answer: 'лихорадка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/aspirin.png',
    options: ['лекарство', 'кашель', 'аспирин', 'лихорадка'],
    answer: 'аспирин'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/medicine.png',
    options: ['кашель', 'лекарство', 'аспирин', 'укол'],
    answer: 'лекарство'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injection.png',
    options: ['лихорадка', 'укол', 'лекарство', 'кашель'],
    answer: 'укол'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'кашель',
    question: 'کدام کلمه را شنیدی؟',
    options: ['кашель', 'лихорадка', 'аспирин', 'лекарство'],
    answer: 'кашель'
  },
  {
    type: 'audio',
    speak: 'лихорадка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['кашель', 'лихорадка', 'укол', 'аспирин'],
    answer: 'лихорадка'
  },
  {
    type: 'audio',
    speak: 'аспирин',
    question: 'کدام کلمه را شنیدی؟',
    options: ['лекарство', 'кашель', 'аспирин', 'лихорадка'],
    answer: 'аспирин'
  },
  {
    type: 'audio',
    speak: 'лекарство',
    question: 'کدام کلمه را شنیدی؟',
    options: ['кашель', 'лекарство', 'аспирин', 'укол'],
    answer: 'лекарство'
  },
  {
    type: 'audio',
    speak: 'укол',
    question: 'کدام کلمه را شنیدی؟',
    options: ['лихорадка', 'укол', 'лекарство', 'кашель'],
    answer: 'укол'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'кашель',
    image: '../../../media/a2/health/cough.png',
    meaning: 'سرفه'
  },
  {
    type: 'speak',
    word: 'лихорадка',
    image: '../../../media/a2/health/fever.png',
    meaning: 'تب'
  },
  {
    type: 'speak',
    word: 'аспирин',
    image: '../../../media/a2/health/aspirin.png',
    meaning: 'آسپرین'
  },
  {
    type: 'speak',
    word: 'лекарство',
    image: '../../../media/a2/health/medicine.png',
    meaning: 'دارو'
  },
  {
    type: 'speak',
    word: 'укол',
    image: '../../../media/a2/health/injection.png',
    meaning: 'آمپول'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'У меня кашель',
    question: 'جمله روسی را بساز:',
    text: 'من سرفه دارم',
    words: ['кашель', 'меня', 'У'],
    answer: ['У', 'меня', 'кашель']
  },
  {
    type: 'build-ru',
    speak: 'У меня лихорадка',
    question: 'جمله روسی را بساز:',
    text: 'من تب دارم',
    words: ['лихорадка', 'меня', 'У'],
    answer: ['У', 'меня', 'лихорадка']
  },
  {
    type: 'build-ru',
    speak: 'Это аспирин',
    question: 'جمله روسی را بساز:',
    text: 'این آسپرین است',
    words: ['аспирин', 'Это'],
    answer: ['Это', 'аспирин']
  },
  {
    type: 'build-ru',
    speak: 'Это лекарство',
    question: 'جمله روسی را بساز:',
    text: 'این دارو است',
    words: ['лекарство', 'Это'],
    answer: ['Это', 'лекарство']
  },
  {
    type: 'build-ru',
    speak: 'Это укол',
    question: 'جمله روسی را بساز:',
    text: 'این آمپول است',
    words: ['укол', 'Это'],
    answer: ['Это', 'укол']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'У меня кашель',
    question: 'ترجمه را بساز:',
    text: 'У меня кашель',
    words: ['دارم', 'سرفه', 'من'],
    answer: ['من', 'سرفه', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'У меня лихорадка',
    question: 'ترجمه را بساز:',
    text: 'У меня лихорадка',
    words: ['دارم', 'تب', 'من'],
    answer: ['من', 'تب', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Это аспирин',
    question: 'ترجمه را بساز:',
    text: 'Это аспирин',
    words: ['است', 'آسپرین', 'این'],
    answer: ['این', 'آسپرین', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это лекарство',
    question: 'ترجمه را بساز:',
    text: 'Это лекарство',
    words: ['است', 'دارو', 'این'],
    answer: ['این', 'دارو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это укол',
    question: 'ترجمه را بساز:',
    text: 'Это укол',
    words: ['است', 'آمپول', 'این'],
    answer: ['این', 'آمپول', 'است']
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