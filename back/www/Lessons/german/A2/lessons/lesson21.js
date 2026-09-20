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

// ===== سوالات درس ۲۱ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Saft" است؟',
    speak: 'der Saft',
    options: [
      { text: 'der Saft', image: '../../../media/a2/food/juice.png' },
      { text: 'der Kaffee', image: '../../../media/a2/food/coffee.png' },
      { text: 'der Tee', image: '../../../media/a2/food/tea.png' },
      { text: 'der Kuchen', image: '../../../media/a2/food/cake.png' }
    ],
    answer: 'der Saft'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Kaffee" است؟',
    speak: 'der Kaffee',
    options: [
      { text: 'der Saft', image: '../../../media/a2/food/juice.png' },
      { text: 'der Kaffee', image: '../../../media/a2/food/coffee.png' },
      { text: 'die Suppe', image: '../../../media/a2/food/soup.png' },
      { text: 'der Tee', image: '../../../media/a2/food/tea.png' }
    ],
    answer: 'der Kaffee'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Tee" است؟',
    speak: 'der Tee',
    options: [
      { text: 'der Kuchen', image: '../../../media/a2/food/cake.png' },
      { text: 'der Saft', image: '../../../media/a2/food/juice.png' },
      { text: 'der Tee', image: '../../../media/a2/food/tea.png' },
      { text: 'der Kaffee', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'der Tee'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Suppe" است؟',
    speak: 'die Suppe',
    options: [
      { text: 'der Kaffee', image: '../../../media/a2/food/coffee.png' },
      { text: 'die Suppe', image: '../../../media/a2/food/soup.png' },
      { text: 'der Kuchen', image: '../../../media/a2/food/cake.png' },
      { text: 'der Saft', image: '../../../media/a2/food/juice.png' }
    ],
    answer: 'die Suppe'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Kuchen" است؟',
    speak: 'der Kuchen',
    options: [
      { text: 'der Saft', image: '../../../media/a2/food/juice.png' },
      { text: 'der Tee', image: '../../../media/a2/food/tea.png' },
      { text: 'der Kuchen', image: '../../../media/a2/food/cake.png' },
      { text: 'die Suppe', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'der Kuchen'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/juice.png',
    options: ['der Saft', 'der Kaffee', 'der Tee', 'der Kuchen'],
    answer: 'der Saft'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/coffee.png',
    options: ['der Saft', 'der Kaffee', 'die Suppe', 'der Tee'],
    answer: 'der Kaffee'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/tea.png',
    options: ['der Kuchen', 'der Saft', 'der Tee', 'der Kaffee'],
    answer: 'der Tee'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/soup.png',
    options: ['der Kaffee', 'die Suppe', 'der Kuchen', 'der Saft'],
    answer: 'die Suppe'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cake.png',
    options: ['der Saft', 'der Tee', 'der Kuchen', 'die Suppe'],
    answer: 'der Kuchen'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Saft',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Saft', 'der Kaffee', 'der Tee', 'der Kuchen'],
    answer: 'der Saft'
  },
  {
    type: 'audio',
    speak: 'der Kaffee',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Saft', 'der Kaffee', 'die Suppe', 'der Tee'],
    answer: 'der Kaffee'
  },
  {
    type: 'audio',
    speak: 'der Tee',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kuchen', 'der Saft', 'der Tee', 'der Kaffee'],
    answer: 'der Tee'
  },
  {
    type: 'audio',
    speak: 'die Suppe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kaffee', 'die Suppe', 'der Kuchen', 'der Saft'],
    answer: 'die Suppe'
  },
  {
    type: 'audio',
    speak: 'der Kuchen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Saft', 'der Tee', 'der Kuchen', 'die Suppe'],
    answer: 'der Kuchen'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Saft',
    image: '../../../media/a2/food/juice.png',
    meaning: 'آبمیوه'
  },
  {
    type: 'speak',
    word: 'der Kaffee',
    image: '../../../media/a2/food/coffee.png',
    meaning: 'قهوه'
  },
  {
    type: 'speak',
    word: 'der Tee',
    image: '../../../media/a2/food/tea.png',
    meaning: 'چای'
  },
  {
    type: 'speak',
    word: 'die Suppe',
    image: '../../../media/a2/food/soup.png',
    meaning: 'سوپ'
  },
  {
    type: 'speak',
    word: 'der Kuchen',
    image: '../../../media/a2/food/cake.png',
    meaning: 'کیک'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich trinke Saft',
    question: 'جمله آلمانی را بساز:',
    text: 'من آبمیوه می‌نوشم',
    words: ['Saft', 'trinke', 'Ich'],
    answer: ['Ich', 'trinke', 'Saft']
  },
  {
    type: 'build-de',
    speak: 'Ich trinke Kaffee',
    question: 'جمله آلمانی را بساز:',
    text: 'من قهوه می‌نوشم',
    words: ['Kaffee', 'trinke', 'Ich'],
    answer: ['Ich', 'trinke', 'Kaffee']
  },
  {
    type: 'build-de',
    speak: 'Ich trinke Tee',
    question: 'جمله آلمانی را بساز:',
    text: 'من چای می‌نوشم',
    words: ['Tee', 'trinke', 'Ich'],
    answer: ['Ich', 'trinke', 'Tee']
  },
  {
    type: 'build-de',
    speak: 'Ich esse Suppe',
    question: 'جمله آلمانی را بساز:',
    text: 'من سوپ می‌خورم',
    words: ['Suppe', 'esse', 'Ich'],
    answer: ['Ich', 'esse', 'Suppe']
  },
  {
    type: 'build-de',
    speak: 'Ich esse Kuchen',
    question: 'جمله آلمانی را بساز:',
    text: 'من کیک می‌خورم',
    words: ['Kuchen', 'esse', 'Ich'],
    answer: ['Ich', 'esse', 'Kuchen']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich trinke Saft',
    question: 'ترجمه را بساز:',
    text: 'Ich trinke Saft',
    words: ['می‌نوشم', 'آبمیوه', 'من'],
    answer: ['من', 'آبمیوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'Ich trinke Kaffee',
    question: 'ترجمه را بساز:',
    text: 'Ich trinke Kaffee',
    words: ['می‌نوشم', 'قهوه', 'من'],
    answer: ['من', 'قهوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'Ich trinke Tee',
    question: 'ترجمه را بساز:',
    text: 'Ich trinke Tee',
    words: ['می‌نوشم', 'چای', 'من'],
    answer: ['من', 'چای', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'Ich esse Suppe',
    question: 'ترجمه را بساز:',
    text: 'Ich esse Suppe',
    words: ['می‌خورم', 'سوپ', 'من'],
    answer: ['من', 'سوپ', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Ich esse Kuchen',
    question: 'ترجمه را بساز:',
    text: 'Ich esse Kuchen',
    words: ['می‌خورم', 'کیک', 'من'],
    answer: ['من', 'کیک', 'می‌خورم']
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