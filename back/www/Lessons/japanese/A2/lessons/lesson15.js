let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
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
  recognition.lang = 'ja-JP';
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

// ===== سوالات درس ۱۵ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "たいしかん" است؟',
    speak: 'たいしかん',
    options: [
      { text: 'たいしかん', image: '../../../media/a2/city/embassy.png' },
      { text: 'さいばんしょ', image: '../../../media/a2/city/court.png' },
      { text: 'けいむしょ', image: '../../../media/a2/city/jail.png' },
      { text: 'こうじょう', image: '../../../media/a2/city/factory.png' }
    ],
    answer: 'たいしかん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "さいばんしょ" است؟',
    speak: 'さいばんしょ',
    options: [
      { text: 'そうこ', image: '../../../media/a2/city/warehouse.png' },
      { text: 'さいばんしょ', image: '../../../media/a2/city/court.png' },
      { text: 'たいしかん', image: '../../../media/a2/city/embassy.png' },
      { text: 'けいむしょ', image: '../../../media/a2/city/jail.png' }
    ],
    answer: 'さいばんしょ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "けいむしょ" است؟',
    speak: 'けいむしょ',
    options: [
      { text: 'たいしかん', image: '../../../media/a2/city/embassy.png' },
      { text: 'けいむしょ', image: '../../../media/a2/city/jail.png' },
      { text: 'こうじょう', image: '../../../media/a2/city/factory.png' },
      { text: 'さいばんしょ', image: '../../../media/a2/city/court.png' }
    ],
    answer: 'けいむしょ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "こうじょう" است؟',
    speak: 'こうじょう',
    options: [
      { text: 'さいばんしょ', image: '../../../media/a2/city/court.png' },
      { text: 'たいしかん', image: '../../../media/a2/city/embassy.png' },
      { text: 'けいむしょ', image: '../../../media/a2/city/jail.png' },
      { text: 'こうじょう', image: '../../../media/a2/city/factory.png' }
    ],
    answer: 'こうじょう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "そうこ" است؟',
    speak: 'そうこ',
    options: [
      { text: 'そうこ', image: '../../../media/a2/city/warehouse.png' },
      { text: 'こうじょう', image: '../../../media/a2/city/factory.png' },
      { text: 'たいしかん', image: '../../../media/a2/city/embassy.png' },
      { text: 'さいばんしょ', image: '../../../media/a2/city/court.png' }
    ],
    answer: 'そうこ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/embassy.png',
    options: ['たいしかん', 'さいばんしょ', 'けいむしょ', 'こうじょう'],
    answer: 'たいしかん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/court.png',
    options: ['たいしかん', 'さいばんしょ', 'けいむしょ', 'そうこ'],
    answer: 'さいばんしょ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/jail.png',
    options: ['そうこ', 'たいしかん', 'けいむしょ', 'さいばんしょ'],
    answer: 'けいむしょ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/factory.png',
    options: ['けいむしょ', 'さいばんしょ', 'こうじょう', 'たいしかん'],
    answer: 'こうじょう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/warehouse.png',
    options: ['たいしかん', 'こうじょう', 'さいばんしょ', 'そうこ'],
    answer: 'そうこ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'たいしかん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['たいしかん', 'さいばんしょ', 'けいむしょ', 'こうじょう'],
    answer: 'たいしかん'
  },
  {
    type: 'audio',
    speak: 'さいばんしょ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['そうこ', 'さいばんしょ', 'たいしかん', 'けいむしょ'],
    answer: 'さいばんしょ'
  },
  {
    type: 'audio',
    speak: 'けいむしょ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['たいしかん', 'けいむしょ', 'こうじょう', 'さいばんしょ'],
    answer: 'けいむしょ'
  },
  {
    type: 'audio',
    speak: 'こうじょう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['さいばんしょ', 'たいしかん', 'けいむしょ', 'こうじょう'],
    answer: 'こうじょう'
  },
  {
    type: 'audio',
    speak: 'そうこ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['そうこ', 'こうじょう', 'たいしかん', 'さいばんしょ'],
    answer: 'そうこ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'たいしかん',
    image: '../../../media/a2/city/embassy.png',
    meaning: 'سفارت'
  },
  {
    type: 'speak',
    word: 'さいばんしょ',
    image: '../../../media/a2/city/court.png',
    meaning: 'دادگاه'
  },
  {
    type: 'speak',
    word: 'けいむしょ',
    image: '../../../media/a2/city/jail.png',
    meaning: 'زندان'
  },
  {
    type: 'speak',
    word: 'こうじょう',
    image: '../../../media/a2/city/factory.png',
    meaning: 'کارخانه'
  },
  {
    type: 'speak',
    word: 'そうこ',
    image: '../../../media/a2/city/warehouse.png',
    meaning: 'انبار'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '大使館はどこですか？',
    question: 'جمله ژاپنی را بساز:',
    text: 'سفارت کجاست؟',
    words: ['ですか？', 'どこ', 'は', '大使館'],
    answer: ['大使館', 'は', 'どこ', 'ですか？']
  },
  {
    type: 'build-it',
    speak: '裁判所は大きいです',
    question: 'جمله ژاپنی را بساز:',
    text: 'دادگاه بزرگ است',
    words: ['です', '大きい', 'は', '裁判所'],
    answer: ['裁判所', 'は', '大きい', 'です']
  },
  {
    type: 'build-it',
    speak: '刑務所は遠いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'زندان دور است',
    words: ['です', '遠い', 'は', '刑務所'],
    answer: ['刑務所', 'は', '遠い', 'です']
  },
  {
    type: 'build-it',
    speak: '工場で働いています',
    question: 'جمله ژاپنی را بساز:',
    text: 'در کارخانه کار می‌کنم',
    words: ['います', '働い', 'で', '工場'],
    answer: ['工場', 'で', '働い', 'ています']
  },
  {
    type: 'build-it',
    speak: '倉庫に商品があります',
    question: 'جمله ژاپنی را بساز:',
    text: 'در انبار کالا وجود دارد',
    words: ['あります', 'が', '商品', '倉庫', 'に'],
    answer: ['倉庫', 'に', '商品', 'が', 'あります']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '大使館はどこですか？',
    question: 'ترجمه را بساز:',
    text: '大使館はどこですか？',
    words: ['سفارت', 'کجاست؟'],
    answer: ['سفارت', 'کجاست؟']
  },
  {
    type: 'build-fa',
    speak: '裁判所は大きいです',
    question: 'ترجمه را بساز:',
    text: '裁判所は大きいです',
    words: ['دادگاه', 'بزرگ', 'است'],
    answer: ['دادگاه', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: '刑務所は遠いです',
    question: 'ترجمه را بساز:',
    text: '刑務所は遠いです',
    words: ['زندان', 'دور', 'است'],
    answer: ['زندان', 'دور', 'است']
  },
  {
    type: 'build-fa',
    speak: '工場で働いています',
    question: 'ترجمه را بساز:',
    text: '工場で働いています',
    words: ['در', 'کارخانه', 'کار', 'می‌کنم'],
    answer: ['در', 'کارخانه', 'کار', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '倉庫に商品があります',
    question: 'ترجمه را بساز:',
    text: '倉庫に商品があります',
    words: ['در', 'انبار', 'کالا', 'وجود دارد'],
    answer: ['در', 'انبار', 'کالا', 'وجود دارد']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 レッスンが終わりました！ 🎉</h2>
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