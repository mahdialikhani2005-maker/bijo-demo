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

// ===== سوالات درس ۲۱ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il succo" است؟',
    speak: 'il succo',
    options: [
      { text: 'il succo', image: '../../../media/a2/food/juice.png' },
      { text: 'il caffè', image: '../../../media/a2/food/coffee.png' },
      { text: 'il tè', image: '../../../media/a2/food/tea.png' },
      { text: 'la torta', image: '../../../media/a2/food/cake.png' }
    ],
    answer: 'il succo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il caffè" است؟',
    speak: 'il caffè',
    options: [
      { text: 'il succo', image: '../../../media/a2/food/juice.png' },
      { text: 'il caffè', image: '../../../media/a2/food/coffee.png' },
      { text: 'la zuppa', image: '../../../media/a2/food/soup.png' },
      { text: 'il tè', image: '../../../media/a2/food/tea.png' }
    ],
    answer: 'il caffè'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il tè" است؟',
    speak: 'il tè',
    options: [
      { text: 'la torta', image: '../../../media/a2/food/cake.png' },
      { text: 'il succo', image: '../../../media/a2/food/juice.png' },
      { text: 'il tè', image: '../../../media/a2/food/tea.png' },
      { text: 'il caffè', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'il tè'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la zuppa" است؟',
    speak: 'la zuppa',
    options: [
      { text: 'il caffè', image: '../../../media/a2/food/coffee.png' },
      { text: 'la zuppa', image: '../../../media/a2/food/soup.png' },
      { text: 'la torta', image: '../../../media/a2/food/cake.png' },
      { text: 'il succo', image: '../../../media/a2/food/juice.png' }
    ],
    answer: 'la zuppa'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la torta" است؟',
    speak: 'la torta',
    options: [
      { text: 'il succo', image: '../../../media/a2/food/juice.png' },
      { text: 'il tè', image: '../../../media/a2/food/tea.png' },
      { text: 'la torta', image: '../../../media/a2/food/cake.png' },
      { text: 'la zuppa', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'la torta'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/juice.png',
    options: ['il succo', 'il caffè', 'il tè', 'la torta'],
    answer: 'il succo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/coffee.png',
    options: ['il succo', 'il caffè', 'la zuppa', 'il tè'],
    answer: 'il caffè'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/tea.png',
    options: ['la torta', 'il succo', 'il tè', 'il caffè'],
    answer: 'il tè'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/soup.png',
    options: ['il caffè', 'la zuppa', 'la torta', 'il succo'],
    answer: 'la zuppa'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cake.png',
    options: ['il succo', 'il tè', 'la torta', 'la zuppa'],
    answer: 'la torta'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il succo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il succo', 'il caffè', 'il tè', 'la torta'],
    answer: 'il succo'
  },
  {
    type: 'audio',
    speak: 'il caffè',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il succo', 'il caffè', 'la zuppa', 'il tè'],
    answer: 'il caffè'
  },
  {
    type: 'audio',
    speak: 'il tè',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la torta', 'il succo', 'il tè', 'il caffè'],
    answer: 'il tè'
  },
  {
    type: 'audio',
    speak: 'la zuppa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il caffè', 'la zuppa', 'la torta', 'il succo'],
    answer: 'la zuppa'
  },
  {
    type: 'audio',
    speak: 'la torta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il succo', 'il tè', 'la torta', 'la zuppa'],
    answer: 'la torta'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il succo',
    image: '../../../media/a2/food/juice.png',
    meaning: 'آبمیوه'
  },
  {
    type: 'speak',
    word: 'il caffè',
    image: '../../../media/a2/food/coffee.png',
    meaning: 'قهوه'
  },
  {
    type: 'speak',
    word: 'il tè',
    image: '../../../media/a2/food/tea.png',
    meaning: 'چای'
  },
  {
    type: 'speak',
    word: 'la zuppa',
    image: '../../../media/a2/food/soup.png',
    meaning: 'سوپ'
  },
  {
    type: 'speak',
    word: 'la torta',
    image: '../../../media/a2/food/cake.png',
    meaning: 'کیک'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Bevo il succo',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من آبمیوه می‌نوشم',
    words: ['succo', 'il', 'Bevo'],
    answer: ['Bevo', 'il', 'succo']
  },
  {
    type: 'build-it',
    speak: 'Bevo il caffè',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من قهوه می‌نوشم',
    words: ['caffè', 'il', 'Bevo'],
    answer: ['Bevo', 'il', 'caffè']
  },
  {
    type: 'build-it',
    speak: 'Bevo il tè',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من چای می‌نوشم',
    words: ['tè', 'il', 'Bevo'],
    answer: ['Bevo', 'il', 'tè']
  },
  {
    type: 'build-it',
    speak: 'Mangio la zuppa',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من سوپ می‌خورم',
    words: ['zuppa', 'la', 'Mangio'],
    answer: ['Mangio', 'la', 'zuppa']
  },
  {
    type: 'build-it',
    speak: 'Mangio la torta',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من کیک می‌خورم',
    words: ['torta', 'la', 'Mangio'],
    answer: ['Mangio', 'la', 'torta']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Bevo il succo',
    question: 'ترجمه را بساز:',
    text: 'Bevo il succo',
    words: ['می‌نوشم', 'آبمیوه', 'من'],
    answer: ['من', 'آبمیوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'Bevo il caffè',
    question: 'ترجمه را بساز:',
    text: 'Bevo il caffè',
    words: ['می‌نوشم', 'قهوه', 'من'],
    answer: ['من', 'قهوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'Bevo il tè',
    question: 'ترجمه را بساز:',
    text: 'Bevo il tè',
    words: ['می‌نوشم', 'چای', 'من'],
    answer: ['من', 'چای', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio la zuppa',
    question: 'ترجمه را بساز:',
    text: 'Mangio la zuppa',
    words: ['می‌خورم', 'سوپ', 'من'],
    answer: ['من', 'سوپ', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio la torta',
    question: 'ترجمه را بساز:',
    text: 'Mangio la torta',
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