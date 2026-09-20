let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
  recognition.lang = 'es-ES';
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

// ===== سوالات درس ۱۷ - اسپانیایی به فارسی (حرفه‌ها ۲) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el camarero" است؟',
    speak: 'el camarero',
    options: [
      { text: 'el camarero', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'la camarera', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'el peluquero', image: '../../../media/a2/jobs/barber.png' },
      { text: 'el sastre', image: '../../../media/a2/jobs/tailor.png' }
    ],
    answer: 'el camarero'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la camarera" است؟',
    speak: 'la camarera',
    options: [
      { text: 'el camarero', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'la camarera', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'el carnicero', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'el peluquero', image: '../../../media/a2/jobs/barber.png' }
    ],
    answer: 'la camarera'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el peluquero" است؟',
    speak: 'el peluquero',
    options: [
      { text: 'el sastre', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'el camarero', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'el peluquero', image: '../../../media/a2/jobs/barber.png' },
      { text: 'la camarera', image: '../../../media/a2/jobs/waitress.png' }
    ],
    answer: 'el peluquero'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el sastre" است؟',
    speak: 'el sastre',
    options: [
      { text: 'el camarero', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'el sastre', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'el peluquero', image: '../../../media/a2/jobs/barber.png' },
      { text: 'el carnicero', image: '../../../media/a2/jobs/butcher.png' }
    ],
    answer: 'el sastre'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el carnicero" است؟',
    speak: 'el carnicero',
    options: [
      { text: 'la camarera', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'el carnicero', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'el sastre', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'el camarero', image: '../../../media/a2/jobs/waiter.png' }
    ],
    answer: 'el carnicero'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waiter.png',
    options: ['el camarero', 'la camarera', 'el peluquero', 'el sastre'],
    answer: 'el camarero'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waitress.png',
    options: ['el camarero', 'la camarera', 'el carnicero', 'el peluquero'],
    answer: 'la camarera'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/barber.png',
    options: ['el sastre', 'el camarero', 'el peluquero', 'la camarera'],
    answer: 'el peluquero'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/tailor.png',
    options: ['el camarero', 'el sastre', 'el peluquero', 'el carnicero'],
    answer: 'el sastre'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/butcher.png',
    options: ['la camarera', 'el carnicero', 'el sastre', 'el camarero'],
    answer: 'el carnicero'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el camarero',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el camarero', 'la camarera', 'el peluquero', 'el sastre'],
    answer: 'el camarero'
  },
  {
    type: 'audio',
    speak: 'la camarera',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el camarero', 'la camarera', 'el carnicero', 'el peluquero'],
    answer: 'la camarera'
  },
  {
    type: 'audio',
    speak: 'el peluquero',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el sastre', 'el camarero', 'el peluquero', 'la camarera'],
    answer: 'el peluquero'
  },
  {
    type: 'audio',
    speak: 'el sastre',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el camarero', 'el sastre', 'el peluquero', 'el carnicero'],
    answer: 'el sastre'
  },
  {
    type: 'audio',
    speak: 'el carnicero',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la camarera', 'el carnicero', 'el sastre', 'el camarero'],
    answer: 'el carnicero'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el camarero',
    image: '../../../media/a2/jobs/waiter.png',
    meaning: 'پیشخدمت'
  },
  {
    type: 'speak',
    word: 'la camarera',
    image: '../../../media/a2/jobs/waitress.png',
    meaning: 'پیشخدمت (زن)'
  },
  {
    type: 'speak',
    word: 'el peluquero',
    image: '../../../media/a2/jobs/barber.png',
    meaning: 'آرایشگر'
  },
  {
    type: 'speak',
    word: 'el sastre',
    image: '../../../media/a2/jobs/tailor.png',
    meaning: 'خیاط'
  },
  {
    type: 'speak',
    word: 'el carnicero',
    image: '../../../media/a2/jobs/butcher.png',
    meaning: 'قصاب'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Él es camarero',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او پیشخدمت است',
    words: ['camarero', 'es', 'Él'],
    answer: ['Él', 'es', 'camarero']
  },
  {
    type: 'build-es',
    speak: 'Ella es camarera',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او پیشخدمت (زن) است',
    words: ['camarera', 'es', 'Ella'],
    answer: ['Ella', 'es', 'camarera']
  },
  {
    type: 'build-es',
    speak: 'Él es peluquero',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او آرایشگر است',
    words: ['peluquero', 'es', 'Él'],
    answer: ['Él', 'es', 'peluquero']
  },
  {
    type: 'build-es',
    speak: 'Él es sastre',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او خیاط است',
    words: ['sastre', 'es', 'Él'],
    answer: ['Él', 'es', 'sastre']
  },
  {
    type: 'build-es',
    speak: 'Él es carnicero',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او قصاب است',
    words: ['carnicero', 'es', 'Él'],
    answer: ['Él', 'es', 'carnicero']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Él es camarero',
    question: 'ترجمه را بساز:',
    text: 'Él es camarero',
    words: ['است', 'پیشخدمت', 'او'],
    answer: ['او', 'پیشخدمت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Ella es camarera',
    question: 'ترجمه را بساز:',
    text: 'Ella es camarera',
    words: ['است', 'پیشخدمت', 'زن', 'او'],
    answer: ['او', 'پیشخدمت', 'زن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es peluquero',
    question: 'ترجمه را بساز:',
    text: 'Él es peluquero',
    words: ['است', 'آرایشگر', 'او'],
    answer: ['او', 'آرایشگر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es sastre',
    question: 'ترجمه را بساز:',
    text: 'Él es sastre',
    words: ['است', 'خیاط', 'او'],
    answer: ['او', 'خیاط', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es carnicero',
    question: 'ترجمه را بساز:',
    text: 'Él es carnicero',
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

  // ===== بخش BUILD ES / FA =====
  if (q.type === 'build-es' || q.type === 'build-fa') {
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

    if (q.type === 'build-es') {
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