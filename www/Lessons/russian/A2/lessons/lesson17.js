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

// ===== سوالات درس ۱۷ - روسی به فارسی (حرفه‌ها ۲) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "официант" است؟',
    speak: 'официант',
    options: [
      { text: 'официант', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'официантка', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'парикмахер', image: '../../../media/a2/jobs/barber.png' },
      { text: 'портной', image: '../../../media/a2/jobs/tailor.png' }
    ],
    answer: 'официант'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "официантка" است؟',
    speak: 'официантка',
    options: [
      { text: 'официант', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'официантка', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'мясник', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'парикмахер', image: '../../../media/a2/jobs/barber.png' }
    ],
    answer: 'официантка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "парикмахер" است؟',
    speak: 'парикмахер',
    options: [
      { text: 'портной', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'официант', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'парикмахер', image: '../../../media/a2/jobs/barber.png' },
      { text: 'официантка', image: '../../../media/a2/jobs/waitress.png' }
    ],
    answer: 'парикмахер'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "портной" است؟',
    speak: 'портной',
    options: [
      { text: 'официант', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'портной', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'парикмахер', image: '../../../media/a2/jobs/barber.png' },
      { text: 'мясник', image: '../../../media/a2/jobs/butcher.png' }
    ],
    answer: 'портной'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "мясник" است؟',
    speak: 'мясник',
    options: [
      { text: 'официантка', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'мясник', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'портной', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'официант', image: '../../../media/a2/jobs/waiter.png' }
    ],
    answer: 'мясник'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waiter.png',
    options: ['официант', 'официантка', 'парикмахер', 'портной'],
    answer: 'официант'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waitress.png',
    options: ['официант', 'официантка', 'мясник', 'парикмахер'],
    answer: 'официантка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/barber.png',
    options: ['портной', 'официант', 'парикмахер', 'официантка'],
    answer: 'парикмахер'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/tailor.png',
    options: ['официант', 'портной', 'парикмахер', 'мясник'],
    answer: 'портной'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/butcher.png',
    options: ['официантка', 'мясник', 'портной', 'официант'],
    answer: 'мясник'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'официант',
    question: 'کدام کلمه را شنیدی؟',
    options: ['официант', 'официантка', 'парикмахер', 'портной'],
    answer: 'официант'
  },
  {
    type: 'audio',
    speak: 'официантка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['официант', 'официантка', 'мясник', 'парикмахер'],
    answer: 'официантка'
  },
  {
    type: 'audio',
    speak: 'парикмахер',
    question: 'کدام کلمه را شنیدی؟',
    options: ['портной', 'официант', 'парикмахер', 'официантка'],
    answer: 'парикмахер'
  },
  {
    type: 'audio',
    speak: 'портной',
    question: 'کدام کلمه را شنیدی؟',
    options: ['официант', 'портной', 'парикмахер', 'мясник'],
    answer: 'портной'
  },
  {
    type: 'audio',
    speak: 'мясник',
    question: 'کدام کلمه را شنیدی؟',
    options: ['официантка', 'мясник', 'портной', 'официант'],
    answer: 'мясник'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'официант',
    image: '../../../media/a2/jobs/waiter.png',
    meaning: 'پیشخدمت'
  },
  {
    type: 'speak',
    word: 'официантка',
    image: '../../../media/a2/jobs/waitress.png',
    meaning: 'پیشخدمت (زن)'
  },
  {
    type: 'speak',
    word: 'парикмахер',
    image: '../../../media/a2/jobs/barber.png',
    meaning: 'آرایشگر'
  },
  {
    type: 'speak',
    word: 'портной',
    image: '../../../media/a2/jobs/tailor.png',
    meaning: 'خیاط'
  },
  {
    type: 'speak',
    word: 'мясник',
    image: '../../../media/a2/jobs/butcher.png',
    meaning: 'قصاب'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Он официант',
    question: 'جمله روسی را بساز:',
    text: 'او پیشخدمت است',
    words: ['официант', 'Он'],
    answer: ['Он', 'официант']
  },
  {
    type: 'build-ru',
    speak: 'Она официантка',
    question: 'جمله روسی را بساز:',
    text: 'او پیشخدمت (زن) است',
    words: ['официантка', 'Она'],
    answer: ['Она', 'официантка']
  },
  {
    type: 'build-ru',
    speak: 'Он парикмахер',
    question: 'جمله روسی را بساز:',
    text: 'او آرایشگر است',
    words: ['парикмахер', 'Он'],
    answer: ['Он', 'парикмахер']
  },
  {
    type: 'build-ru',
    speak: 'Он портной',
    question: 'جمله روسی را بساز:',
    text: 'او خیاط است',
    words: ['портной', 'Он'],
    answer: ['Он', 'портной']
  },
  {
    type: 'build-ru',
    speak: 'Он мясник',
    question: 'جمله روسی را بساز:',
    text: 'او قصاب است',
    words: ['мясник', 'Он'],
    answer: ['Он', 'мясник']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Он официант',
    question: 'ترجمه را بساز:',
    text: 'Он официант',
    words: ['است', 'پیشخدمت', 'او'],
    answer: ['او', 'پیشخدمت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Она официантка',
    question: 'ترجمه را بساز:',
    text: 'Она официантка',
    words: ['است', 'پیشخدمت', 'زن', 'او'],
    answer: ['او', 'پیشخدمت', 'زن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он парикмахер',
    question: 'ترجمه را بساز:',
    text: 'Он парикмахер',
    words: ['است', 'آرایشگر', 'او'],
    answer: ['او', 'آرایشگر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он портной',
    question: 'ترجمه را بساز:',
    text: 'Он портной',
    words: ['است', 'خیاط', 'او'],
    answer: ['او', 'خیاط', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он мясник',
    question: 'ترجمه را بساز:',
    text: 'Он мясник',
    words: ['است', 'قصاب', 'او'],
    answer: ['او', 'قصاب', 'است']
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