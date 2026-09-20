let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
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
  recognition.lang = 'de-DE';
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

// ===== سوالات درس ۵۷ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Bildschirm" است؟',
    speak: 'der Bildschirm',
    options: [
      { text: 'der Bildschirm', image: '../../../media/a2/tech/screen.png' },
      { text: 'der Monitor', image: '../../../media/a2/tech/monitor.png' },
      { text: 'der Drucker', image: '../../../media/a2/tech/printer.png' },
      { text: 'der Scanner', image: '../../../media/a2/tech/scanner.png' }
    ],
    answer: 'der Bildschirm'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Monitor" است؟',
    speak: 'der Monitor',
    options: [
      { text: 'der Bildschirm', image: '../../../media/a2/tech/screen.png' },
      { text: 'der Monitor', image: '../../../media/a2/tech/monitor.png' },
      { text: 'der Lautsprecher', image: '../../../media/a2/tech/speaker.png' },
      { text: 'der Drucker', image: '../../../media/a2/tech/printer.png' }
    ],
    answer: 'der Monitor'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Drucker" است؟',
    speak: 'der Drucker',
    options: [
      { text: 'der Scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'der Bildschirm', image: '../../../media/a2/tech/screen.png' },
      { text: 'der Drucker', image: '../../../media/a2/tech/printer.png' },
      { text: 'der Monitor', image: '../../../media/a2/tech/monitor.png' }
    ],
    answer: 'der Drucker'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Scanner" است؟',
    speak: 'der Scanner',
    options: [
      { text: 'der Monitor', image: '../../../media/a2/tech/monitor.png' },
      { text: 'der Scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'der Lautsprecher', image: '../../../media/a2/tech/speaker.png' },
      { text: 'der Bildschirm', image: '../../../media/a2/tech/screen.png' }
    ],
    answer: 'der Scanner'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Lautsprecher" است؟',
    speak: 'der Lautsprecher',
    options: [
      { text: 'der Bildschirm', image: '../../../media/a2/tech/screen.png' },
      { text: 'der Drucker', image: '../../../media/a2/tech/printer.png' },
      { text: 'der Lautsprecher', image: '../../../media/a2/tech/speaker.png' },
      { text: 'der Scanner', image: '../../../media/a2/tech/scanner.png' }
    ],
    answer: 'der Lautsprecher'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/screen.png',
    options: ['der Bildschirm', 'der Monitor', 'der Drucker', 'der Scanner'],
    answer: 'der Bildschirm'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/monitor.png',
    options: ['der Bildschirm', 'der Monitor', 'der Lautsprecher', 'der Drucker'],
    answer: 'der Monitor'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/printer.png',
    options: ['der Scanner', 'der Bildschirm', 'der Drucker', 'der Monitor'],
    answer: 'der Drucker'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/scanner.png',
    options: ['der Monitor', 'der Scanner', 'der Lautsprecher', 'der Bildschirm'],
    answer: 'der Scanner'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/speaker.png',
    options: ['der Bildschirm', 'der Drucker', 'der Lautsprecher', 'der Scanner'],
    answer: 'der Lautsprecher'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Bildschirm',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bildschirm', 'der Monitor', 'der Drucker', 'der Scanner'],
    answer: 'der Bildschirm'
  },
  {
    type: 'audio',
    speak: 'der Monitor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bildschirm', 'der Monitor', 'der Lautsprecher', 'der Drucker'],
    answer: 'der Monitor'
  },
  {
    type: 'audio',
    speak: 'der Drucker',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Scanner', 'der Bildschirm', 'der Drucker', 'der Monitor'],
    answer: 'der Drucker'
  },
  {
    type: 'audio',
    speak: 'der Scanner',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Monitor', 'der Scanner', 'der Lautsprecher', 'der Bildschirm'],
    answer: 'der Scanner'
  },
  {
    type: 'audio',
    speak: 'der Lautsprecher',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bildschirm', 'der Drucker', 'der Lautsprecher', 'der Scanner'],
    answer: 'der Lautsprecher'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Bildschirm',
    image: '../../../media/a2/tech/screen.png',
    meaning: 'صفحه نمایش'
  },
  {
    type: 'speak',
    word: 'der Monitor',
    image: '../../../media/a2/tech/monitor.png',
    meaning: 'مانیتور'
  },
  {
    type: 'speak',
    word: 'der Drucker',
    image: '../../../media/a2/tech/printer.png',
    meaning: 'چاپگر'
  },
  {
    type: 'speak',
    word: 'der Scanner',
    image: '../../../media/a2/tech/scanner.png',
    meaning: 'اسکنر'
  },
  {
    type: 'speak',
    word: 'der Lautsprecher',
    image: '../../../media/a2/tech/speaker.png',
    meaning: 'بلندگو'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich sehe den Bildschirm',
    question: 'جمله آلمانی را بساز:',
    text: 'من صفحه نمایش را می‌بینم',
    words: ['Bildschirm', 'den', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'den', 'Bildschirm']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe den Monitor',
    question: 'جمله آلمانی را بساز:',
    text: 'من مانیتور را می‌بینم',
    words: ['Monitor', 'den', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'den', 'Monitor']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe den Drucker',
    question: 'جمله آلمانی را بساز:',
    text: 'من چاپگر را می‌بینم',
    words: ['Drucker', 'den', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'den', 'Drucker']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe den Scanner',
    question: 'جمله آلمانی را بساز:',
    text: 'من اسکنر را می‌بینم',
    words: ['Scanner', 'den', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'den', 'Scanner']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe den Lautsprecher',
    question: 'جمله آلمانی را بساز:',
    text: 'من بلندگو را می‌بینم',
    words: ['Lautsprecher', 'den', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'den', 'Lautsprecher']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich sehe den Bildschirm',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe den Bildschirm',
    words: ['می‌بینم', 'صفحه نمایش', 'من'],
    answer: ['من', 'صفحه نمایش', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe den Monitor',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe den Monitor',
    words: ['می‌بینم', 'مانیتور', 'من'],
    answer: ['من', 'مانیتور', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe den Drucker',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe den Drucker',
    words: ['می‌بینم', 'چاپگر', 'من'],
    answer: ['من', 'چاپگر', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe den Scanner',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe den Scanner',
    words: ['می‌بینم', 'اسکنر', 'من'],
    answer: ['من', 'اسکنر', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe den Lautsprecher',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe den Lautsprecher',
    words: ['می‌بینم', 'بلندگو', 'من'],
    answer: ['من', 'بلندگو', 'می‌بینم']
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

  // ===== بخش BUILD DE / FA =====
  if (q.type === 'build-de' || q.type === 'build-fa') {
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

    if (q.type === 'build-de') {
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