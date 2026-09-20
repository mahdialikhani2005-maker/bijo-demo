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

// ===== سوالات درس ۱۳ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "die Brücke" است؟',
    speak: 'die Brücke',
    options: [
      { text: 'die Brücke', image: '../../../media/a2/city/bridge.png' },
      { text: 'der Platz', image: '../../../media/a2/city/square.png' },
      { text: 'der Brunnen', image: '../../../media/a2/city/fountain.png' },
      { text: 'das Schloss', image: '../../../media/a2/city/castle.png' }
    ],
    answer: 'die Brücke'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Platz" است؟',
    speak: 'der Platz',
    options: [
      { text: 'die Brücke', image: '../../../media/a2/city/bridge.png' },
      { text: 'der Platz', image: '../../../media/a2/city/square.png' },
      { text: 'der Turm', image: '../../../media/a2/city/tower.png' },
      { text: 'der Brunnen', image: '../../../media/a2/city/fountain.png' }
    ],
    answer: 'der Platz'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Brunnen" است؟',
    speak: 'der Brunnen',
    options: [
      { text: 'das Schloss', image: '../../../media/a2/city/castle.png' },
      { text: 'die Brücke', image: '../../../media/a2/city/bridge.png' },
      { text: 'der Brunnen', image: '../../../media/a2/city/fountain.png' },
      { text: 'der Platz', image: '../../../media/a2/city/square.png' }
    ],
    answer: 'der Brunnen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Turm" است؟',
    speak: 'der Turm',
    options: [
      { text: 'der Platz', image: '../../../media/a2/city/square.png' },
      { text: 'der Turm', image: '../../../media/a2/city/tower.png' },
      { text: 'das Schloss', image: '../../../media/a2/city/castle.png' },
      { text: 'die Brücke', image: '../../../media/a2/city/bridge.png' }
    ],
    answer: 'der Turm'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Schloss" است؟',
    speak: 'das Schloss',
    options: [
      { text: 'die Brücke', image: '../../../media/a2/city/bridge.png' },
      { text: 'der Brunnen', image: '../../../media/a2/city/fountain.png' },
      { text: 'das Schloss', image: '../../../media/a2/city/castle.png' },
      { text: 'der Turm', image: '../../../media/a2/city/tower.png' }
    ],
    answer: 'das Schloss'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bridge.png',
    options: ['die Brücke', 'der Platz', 'der Brunnen', 'das Schloss'],
    answer: 'die Brücke'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/square.png',
    options: ['die Brücke', 'der Platz', 'der Turm', 'der Brunnen'],
    answer: 'der Platz'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/fountain.png',
    options: ['das Schloss', 'die Brücke', 'der Brunnen', 'der Platz'],
    answer: 'der Brunnen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/tower.png',
    options: ['der Platz', 'der Turm', 'das Schloss', 'die Brücke'],
    answer: 'der Turm'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/castle.png',
    options: ['die Brücke', 'der Brunnen', 'das Schloss', 'der Turm'],
    answer: 'das Schloss'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'die Brücke',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Brücke', 'der Platz', 'der Brunnen', 'das Schloss'],
    answer: 'die Brücke'
  },
  {
    type: 'audio',
    speak: 'der Platz',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Brücke', 'der Platz', 'der Turm', 'der Brunnen'],
    answer: 'der Platz'
  },
  {
    type: 'audio',
    speak: 'der Brunnen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Schloss', 'die Brücke', 'der Brunnen', 'der Platz'],
    answer: 'der Brunnen'
  },
  {
    type: 'audio',
    speak: 'der Turm',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Platz', 'der Turm', 'das Schloss', 'die Brücke'],
    answer: 'der Turm'
  },
  {
    type: 'audio',
    speak: 'das Schloss',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Brücke', 'der Brunnen', 'das Schloss', 'der Turm'],
    answer: 'das Schloss'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'die Brücke',
    image: '../../../media/a2/city/bridge.png',
    meaning: 'پل'
  },
  {
    type: 'speak',
    word: 'der Platz',
    image: '../../../media/a2/city/square.png',
    meaning: 'میدان'
  },
  {
    type: 'speak',
    word: 'der Brunnen',
    image: '../../../media/a2/city/fountain.png',
    meaning: 'آبنما'
  },
  {
    type: 'speak',
    word: 'der Turm',
    image: '../../../media/a2/city/tower.png',
    meaning: 'برج'
  },
  {
    type: 'speak',
    word: 'das Schloss',
    image: '../../../media/a2/city/castle.png',
    meaning: 'قلعه'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich sehe eine Brücke',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک پل می‌بینم',
    words: ['Brücke', 'eine', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'eine', 'Brücke']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Platz',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک میدان می‌بینم',
    words: ['Platz', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Platz']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Brunnen',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک آبنما می‌بینم',
    words: ['Brunnen', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Brunnen']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Turm',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک برج می‌بینم',
    words: ['Turm', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Turm']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe ein Schloss',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک قلعه می‌بینم',
    words: ['Schloss', 'ein', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'ein', 'Schloss']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich sehe eine Brücke',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe eine Brücke',
    words: ['می‌بینم', 'پل', 'یک', 'من'],
    answer: ['من', 'یک', 'پل', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Platz',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Platz',
    words: ['می‌بینم', 'میدان', 'یک', 'من'],
    answer: ['من', 'یک', 'میدان', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Brunnen',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Brunnen',
    words: ['می‌بینم', 'آبنما', 'یک', 'من'],
    answer: ['من', 'یک', 'آبنما', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Turm',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Turm',
    words: ['می‌بینم', 'برج', 'یک', 'من'],
    answer: ['من', 'یک', 'برج', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe ein Schloss',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe ein Schloss',
    words: ['می‌بینم', 'قلعه', 'یک', 'من'],
    answer: ['من', 'یک', 'قلعه', 'می‌بینم']
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