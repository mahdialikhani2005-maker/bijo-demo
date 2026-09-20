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

// ===== سوالات درس ۳۰ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Regenschirm" است؟',
    speak: 'der Regenschirm',
    options: [
      { text: 'der Regenschirm', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'die Tasche', image: '../../../media/a2/clothes/bag.png' },
      { text: 'der Rucksack', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'die Handtasche', image: '../../../media/a2/clothes/purse.png' }
    ],
    answer: 'der Regenschirm'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Tasche" است؟',
    speak: 'die Tasche',
    options: [
      { text: 'der Regenschirm', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'die Tasche', image: '../../../media/a2/clothes/bag.png' },
      { text: 'die Brieftasche', image: '../../../media/a2/clothes/wallet.png' },
      { text: 'der Rucksack', image: '../../../media/a2/clothes/backpack.png' }
    ],
    answer: 'die Tasche'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Rucksack" است؟',
    speak: 'der Rucksack',
    options: [
      { text: 'die Handtasche', image: '../../../media/a2/clothes/purse.png' },
      { text: 'der Regenschirm', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'der Rucksack', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'die Tasche', image: '../../../media/a2/clothes/bag.png' }
    ],
    answer: 'der Rucksack'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Brieftasche" است؟',
    speak: 'die Brieftasche',
    options: [
      { text: 'die Tasche', image: '../../../media/a2/clothes/bag.png' },
      { text: 'die Brieftasche', image: '../../../media/a2/clothes/wallet.png' },
      { text: 'die Handtasche', image: '../../../media/a2/clothes/purse.png' },
      { text: 'der Regenschirm', image: '../../../media/a2/clothes/umbrella.png' }
    ],
    answer: 'die Brieftasche'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Handtasche" است؟',
    speak: 'die Handtasche',
    options: [
      { text: 'der Regenschirm', image: '../../../media/a2/clothes/umbrella.png' },
      { text: 'der Rucksack', image: '../../../media/a2/clothes/backpack.png' },
      { text: 'die Handtasche', image: '../../../media/a2/clothes/purse.png' },
      { text: 'die Brieftasche', image: '../../../media/a2/clothes/wallet.png' }
    ],
    answer: 'die Handtasche'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/umbrella.png',
    options: ['der Regenschirm', 'die Tasche', 'der Rucksack', 'die Brieftasche'],
    answer: 'der Regenschirm'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bag.png',
    options: ['der Regenschirm', 'die Tasche', 'die Handtasche', 'der Rucksack'],
    answer: 'die Tasche'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/backpack.png',
    options: ['die Handtasche', 'der Regenschirm', 'der Rucksack', 'die Tasche'],
    answer: 'der Rucksack'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/wallet.png',
    options: ['die Tasche', 'die Brieftasche', 'die Handtasche', 'der Regenschirm'],
    answer: 'die Brieftasche'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/purse.png',
    options: ['der Regenschirm', 'der Rucksack', 'die Handtasche', 'die Brieftasche'],
    answer: 'die Handtasche'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Regenschirm',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Regenschirm', 'die Tasche', 'der Rucksack', 'die Brieftasche'],
    answer: 'der Regenschirm'
  },
  {
    type: 'audio',
    speak: 'die Tasche',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Regenschirm', 'die Tasche', 'die Handtasche', 'der Rucksack'],
    answer: 'die Tasche'
  },
  {
    type: 'audio',
    speak: 'der Rucksack',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Handtasche', 'der Regenschirm', 'der Rucksack', 'die Tasche'],
    answer: 'der Rucksack'
  },
  {
    type: 'audio',
    speak: 'die Brieftasche',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Tasche', 'die Brieftasche', 'die Handtasche', 'der Regenschirm'],
    answer: 'die Brieftasche'
  },
  {
    type: 'audio',
    speak: 'die Handtasche',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Regenschirm', 'der Rucksack', 'die Handtasche', 'die Brieftasche'],
    answer: 'die Handtasche'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Regenschirm',
    image: '../../../media/a2/clothes/umbrella.png',
    meaning: 'چتر'
  },
  {
    type: 'speak',
    word: 'die Tasche',
    image: '../../../media/a2/clothes/bag.png',
    meaning: 'کیف'
  },
  {
    type: 'speak',
    word: 'der Rucksack',
    image: '../../../media/a2/clothes/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: 'die Brieftasche',
    image: '../../../media/a2/clothes/wallet.png',
    meaning: 'کیف پول'
  },
  {
    type: 'speak',
    word: 'die Handtasche',
    image: '../../../media/a2/clothes/purse.png',
    meaning: 'کیف دستی'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe einen Regenschirm',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک چتر دارم',
    words: ['Regenschirm', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Regenschirm']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Tasche',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کیف دارم',
    words: ['Tasche', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Tasche']
  },
  {
    type: 'build-de',
    speak: 'Ich habe einen Rucksack',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کوله پشتی دارم',
    words: ['Rucksack', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Rucksack']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Brieftasche',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کیف پول دارم',
    words: ['Brieftasche', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Brieftasche']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Handtasche',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کیف دستی دارم',
    words: ['Handtasche', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Handtasche']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe einen Regenschirm',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Regenschirm',
    words: ['دارم', 'چتر', 'یک', 'من'],
    answer: ['من', 'یک', 'چتر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Tasche',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Tasche',
    words: ['دارم', 'کیف', 'یک', 'من'],
    answer: ['من', 'یک', 'کیف', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe einen Rucksack',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Rucksack',
    words: ['دارم', 'کوله پشتی', 'یک', 'من'],
    answer: ['من', 'یک', 'کوله پشتی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Brieftasche',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Brieftasche',
    words: ['دارم', 'کیف پول', 'یک', 'من'],
    answer: ['من', 'یک', 'کیف پول', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Handtasche',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Handtasche',
    words: ['دارم', 'کیف دستی', 'یک', 'من'],
    answer: ['من', 'یک', 'کیف دستی', 'دارم']
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