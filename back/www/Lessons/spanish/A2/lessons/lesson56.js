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

// ===== سوالات درس ۵۶ - اسپانیایی به فارسی (کامپیوتر) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el ordenador" است؟',
    speak: 'el ordenador',
    options: [
      { text: 'el ordenador', image: '../../../media/a2/technology/computer.png' },
      { text: 'el teclado', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'el ratón', image: '../../../media/a2/technology/mouse.png' },
      { text: 'internet', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: 'el ordenador'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el teclado" است؟',
    speak: 'el teclado',
    options: [
      { text: 'el ordenador', image: '../../../media/a2/technology/computer.png' },
      { text: 'el teclado', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'el correo electrónico', image: '../../../media/a2/technology/email.png' },
      { text: 'el ratón', image: '../../../media/a2/technology/mouse.png' }
    ],
    answer: 'el teclado'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el ratón" است؟',
    speak: 'el ratón',
    options: [
      { text: 'el ordenador', image: '../../../media/a2/technology/computer.png' },
      { text: 'el teclado', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'el ratón', image: '../../../media/a2/technology/mouse.png' },
      { text: 'internet', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: 'el ratón'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "internet" است؟',
    speak: 'internet',
    options: [
      { text: 'el ordenador', image: '../../../media/a2/technology/computer.png' },
      { text: 'internet', image: '../../../media/a2/technology/internet.png' },
      { text: 'el ratón', image: '../../../media/a2/technology/mouse.png' },
      { text: 'el correo electrónico', image: '../../../media/a2/technology/email.png' }
    ],
    answer: 'internet'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el correo electrónico" است؟',
    speak: 'el correo electrónico',
    options: [
      { text: 'el teclado', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'el correo electrónico', image: '../../../media/a2/technology/email.png' },
      { text: 'el ratón', image: '../../../media/a2/technology/mouse.png' },
      { text: 'el ordenador', image: '../../../media/a2/technology/computer.png' }
    ],
    answer: 'el correo electrónico'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/computer.png',
    options: ['el ordenador', 'el teclado', 'el ratón', 'internet'],
    answer: 'el ordenador'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/keyboard.png',
    options: ['el ordenador', 'el teclado', 'el correo electrónico', 'el ratón'],
    answer: 'el teclado'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/mouse.png',
    options: ['el ordenador', 'el teclado', 'el ratón', 'internet'],
    answer: 'el ratón'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/internet.png',
    options: ['el ordenador', 'internet', 'el ratón', 'el correo electrónico'],
    answer: 'internet'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/email.png',
    options: ['el teclado', 'el correo electrónico', 'el ratón', 'el ordenador'],
    answer: 'el correo electrónico'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el ordenador',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el ordenador', 'el teclado', 'el ratón', 'internet'],
    answer: 'el ordenador'
  },
  {
    type: 'audio',
    speak: 'el teclado',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el ordenador', 'el teclado', 'el correo electrónico', 'el ratón'],
    answer: 'el teclado'
  },
  {
    type: 'audio',
    speak: 'el ratón',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el ordenador', 'el teclado', 'el ratón', 'internet'],
    answer: 'el ratón'
  },
  {
    type: 'audio',
    speak: 'internet',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el ordenador', 'internet', 'el ratón', 'el correo electrónico'],
    answer: 'internet'
  },
  {
    type: 'audio',
    speak: 'el correo electrónico',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el teclado', 'el correo electrónico', 'el ratón', 'el ordenador'],
    answer: 'el correo electrónico'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el ordenador',
    image: '../../../media/a2/technology/computer.png',
    meaning: 'کامپیوتر'
  },
  {
    type: 'speak',
    word: 'el teclado',
    image: '../../../media/a2/technology/keyboard.png',
    meaning: 'صفحه کلید'
  },
  {
    type: 'speak',
    word: 'el ratón',
    image: '../../../media/a2/technology/mouse.png',
    meaning: 'موشواره'
  },
  {
    type: 'speak',
    word: 'internet',
    image: '../../../media/a2/technology/internet.png',
    meaning: 'اینترنت'
  },
  {
    type: 'speak',
    word: 'el correo electrónico',
    image: '../../../media/a2/technology/email.png',
    meaning: 'ایمیل'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un ordenador',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کامپیوتر است',
    words: ['ordenador', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'ordenador']
  },
  {
    type: 'build-es',
    speak: 'Esto es un teclado',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک صفحه کلید است',
    words: ['teclado', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'teclado']
  },
  {
    type: 'build-es',
    speak: 'Esto es un ratón',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک موشواره است',
    words: ['ratón', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'ratón']
  },
  {
    type: 'build-es',
    speak: 'Esto es internet',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این اینترنت است',
    words: ['internet', 'es', 'Esto'],
    answer: ['Esto', 'es', 'internet']
  },
  {
    type: 'build-es',
    speak: 'Esto es un correo electrónico',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک ایمیل است',
    words: ['correo', 'electrónico', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'correo', 'electrónico']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un ordenador',
    question: 'ترجمه را بساز:',
    text: 'Esto es un ordenador',
    words: ['است', 'کامپیوتر', 'یک', 'این'],
    answer: ['این', 'یک', 'کامپیوتر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un teclado',
    question: 'ترجمه را بساز:',
    text: 'Esto es un teclado',
    words: ['است', 'صفحه کلید', 'یک', 'این'],
    answer: ['این', 'یک', 'صفحه کلید', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un ratón',
    question: 'ترجمه را بساز:',
    text: 'Esto es un ratón',
    words: ['است', 'موشواره', 'یک', 'این'],
    answer: ['این', 'یک', 'موشواره', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es internet',
    question: 'ترجمه را بساز:',
    text: 'Esto es internet',
    words: ['است', 'اینترنت', 'این'],
    answer: ['این', 'اینترنت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un correo electrónico',
    question: 'ترجمه را بساز:',
    text: 'Esto es un correo electrónico',
    words: ['است', 'ایمیل', 'یک', 'این'],
    answer: ['این', 'یک', 'ایمیل', 'است']
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