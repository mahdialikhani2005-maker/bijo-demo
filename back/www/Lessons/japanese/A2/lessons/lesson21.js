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

// ===== سوالات درس ۲۱ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ジュース" است؟',
    speak: 'ジュース',
    options: [
      { text: 'ジュース', image: '../../../media/a2/food/juice.png' },
      { text: 'コーヒー', image: '../../../media/a2/food/coffee.png' },
      { text: 'おちゃ', image: '../../../media/a2/food/tea.png' },
      { text: 'スープ', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'ジュース'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "コーヒー" است؟',
    speak: 'コーヒー',
    options: [
      { text: 'ケーキ', image: '../../../media/a2/food/cake.png' },
      { text: 'コーヒー', image: '../../../media/a2/food/coffee.png' },
      { text: 'ジュース', image: '../../../media/a2/food/juice.png' },
      { text: 'おちゃ', image: '../../../media/a2/food/tea.png' }
    ],
    answer: 'コーヒー'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "おちゃ" است؟',
    speak: 'おちゃ',
    options: [
      { text: 'ジュース', image: '../../../media/a2/food/juice.png' },
      { text: 'おちゃ', image: '../../../media/a2/food/tea.png' },
      { text: 'スープ', image: '../../../media/a2/food/soup.png' },
      { text: 'コーヒー', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'おちゃ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "スープ" است؟',
    speak: 'スープ',
    options: [
      { text: 'コーヒー', image: '../../../media/a2/food/coffee.png' },
      { text: 'ジュース', image: '../../../media/a2/food/juice.png' },
      { text: 'おちゃ', image: '../../../media/a2/food/tea.png' },
      { text: 'スープ', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'スープ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ケーキ" است؟',
    speak: 'ケーキ',
    options: [
      { text: 'ケーキ', image: '../../../media/a2/food/cake.png' },
      { text: 'スープ', image: '../../../media/a2/food/soup.png' },
      { text: 'ジュース', image: '../../../media/a2/food/juice.png' },
      { text: 'コーヒー', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'ケーキ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/juice.png',
    options: ['ジュース', 'コーヒー', 'おちゃ', 'スープ'],
    answer: 'ジュース'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/coffee.png',
    options: ['ジュース', 'コーヒー', 'おちゃ', 'ケーキ'],
    answer: 'コーヒー'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/tea.png',
    options: ['ケーキ', 'ジュース', 'おちゃ', 'コーヒー'],
    answer: 'おちゃ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/soup.png',
    options: ['おちゃ', 'コーヒー', 'スープ', 'ジュース'],
    answer: 'スープ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cake.png',
    options: ['ジュース', 'スープ', 'コーヒー', 'ケーキ'],
    answer: 'ケーキ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ジュース',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ジュース', 'コーヒー', 'おちゃ', 'スープ'],
    answer: 'ジュース'
  },
  {
    type: 'audio',
    speak: 'コーヒー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ケーキ', 'コーヒー', 'ジュース', 'おちゃ'],
    answer: 'コーヒー'
  },
  {
    type: 'audio',
    speak: 'おちゃ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ジュース', 'おちゃ', 'スープ', 'コーヒー'],
    answer: 'おちゃ'
  },
  {
    type: 'audio',
    speak: 'スープ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['コーヒー', 'ジュース', 'おちゃ', 'スープ'],
    answer: 'スープ'
  },
  {
    type: 'audio',
    speak: 'ケーキ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ケーキ', 'スープ', 'ジュース', 'コーヒー'],
    answer: 'ケーキ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ジュース',
    image: '../../../media/a2/food/juice.png',
    meaning: 'آبمیوه'
  },
  {
    type: 'speak',
    word: 'コーヒー',
    image: '../../../media/a2/food/coffee.png',
    meaning: 'قهوه'
  },
  {
    type: 'speak',
    word: 'おちゃ',
    image: '../../../media/a2/food/tea.png',
    meaning: 'چای'
  },
  {
    type: 'speak',
    word: 'スープ',
    image: '../../../media/a2/food/soup.png',
    meaning: 'سوپ'
  },
  {
    type: 'speak',
    word: 'ケーキ',
    image: '../../../media/a2/food/cake.png',
    meaning: 'کیک'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ジュースを飲みます',
    question: 'جمله ژاپنی را بساز:',
    text: 'آبمیوه می‌نوشم',
    words: ['ます', '飲み', 'を', 'ジュース'],
    answer: ['ジュース', 'を', '飲み', 'ます']
  },
  {
    type: 'build-it',
    speak: 'コーヒーを飲みます',
    question: 'جمله ژاپنی را بساز:',
    text: 'قهوه می‌نوشم',
    words: ['ます', '飲み', 'を', 'コーヒー'],
    answer: ['コーヒー', 'を', '飲み', 'ます']
  },
  {
    type: 'build-it',
    speak: 'おちゃを飲みます',
    question: 'جمله ژاپنی را بساز:',
    text: 'چای می‌نوشم',
    words: ['ます', '飲み', 'を', 'おちゃ'],
    answer: ['おちゃ', 'を', '飲み', 'ます']
  },
  {
    type: 'build-it',
    speak: 'スープを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'سوپ می‌خورم',
    words: ['ます', '食べ', 'を', 'スープ'],
    answer: ['スープ', 'を', '食べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ケーキを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'کیک می‌خورم',
    words: ['ます', '食べ', 'を', 'ケーキ'],
    answer: ['ケーキ', 'を', '食べ', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ジュースを飲みます',
    question: 'ترجمه را بساز:',
    text: 'ジュースを飲みます',
    words: ['آبمیوه', 'می‌نوشم'],
    answer: ['آبمیوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'コーヒーを飲みます',
    question: 'ترجمه را بساز:',
    text: 'コーヒーを飲みます',
    words: ['قهوه', 'می‌نوشم'],
    answer: ['قهوه', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'おちゃを飲みます',
    question: 'ترجمه را بساز:',
    text: 'おちゃを飲みます',
    words: ['چای', 'می‌نوشم'],
    answer: ['چای', 'می‌نوشم']
  },
  {
    type: 'build-fa',
    speak: 'スープを食べます',
    question: 'ترجمه را بساز:',
    text: 'スープを食べます',
    words: ['سوپ', 'می‌خورم'],
    answer: ['سوپ', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'ケーキを食べます',
    question: 'ترجمه را بساز:',
    text: 'ケーキを食べます',
    words: ['کیک', 'می‌خورم'],
    answer: ['کیک', 'می‌خورم']
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