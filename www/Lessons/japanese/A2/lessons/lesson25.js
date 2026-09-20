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

// ===== سوالات درس ۲۵ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "トースト" است؟',
    speak: 'トースト',
    options: [
      { text: 'トースト', image: '../../../media/a2/food/toast.png' },
      { text: 'シリアル', image: '../../../media/a2/food/cereal.png' },
      { text: 'オートミール', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'ジャム', image: '../../../media/a2/food/jam.png' }
    ],
    answer: 'トースト'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "シリアル" است؟',
    speak: 'シリアル',
    options: [
      { text: 'はちみつ', image: '../../../media/a2/food/honey.png' },
      { text: 'シリアル', image: '../../../media/a2/food/cereal.png' },
      { text: 'トースト', image: '../../../media/a2/food/toast.png' },
      { text: 'オートミール', image: '../../../media/a2/food/oatmeal.png' }
    ],
    answer: 'シリアル'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "オートミール" است؟',
    speak: 'オートミール',
    options: [
      { text: 'トースト', image: '../../../media/a2/food/toast.png' },
      { text: 'オートミール', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'ジャム', image: '../../../media/a2/food/jam.png' },
      { text: 'シリアル', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'オートミール'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ジャム" است؟',
    speak: 'ジャム',
    options: [
      { text: 'シリアル', image: '../../../media/a2/food/cereal.png' },
      { text: 'トースト', image: '../../../media/a2/food/toast.png' },
      { text: 'オートミール', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'ジャム', image: '../../../media/a2/food/jam.png' }
    ],
    answer: 'ジャム'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "はちみつ" است؟',
    speak: 'はちみつ',
    options: [
      { text: 'はちみつ', image: '../../../media/a2/food/honey.png' },
      { text: 'ジャム', image: '../../../media/a2/food/jam.png' },
      { text: 'トースト', image: '../../../media/a2/food/toast.png' },
      { text: 'シリアル', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'はちみつ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/toast.png',
    options: ['トースト', 'シリアル', 'オートミール', 'ジャム'],
    answer: 'トースト'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cereal.png',
    options: ['トースト', 'シリアル', 'オートミール', 'はちみつ'],
    answer: 'シリアル'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/oatmeal.png',
    options: ['はちみつ', 'トースト', 'オートミール', 'シリアル'],
    answer: 'オートミール'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/jam.png',
    options: ['オートミール', 'シリアル', 'ジャム', 'トースト'],
    answer: 'ジャム'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/honey.png',
    options: ['トースト', 'ジャム', 'シリアル', 'はちみつ'],
    answer: 'はちみつ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'トースト',
    question: 'کدام کلمه را شنیدی؟',
    options: ['トースト', 'シリアル', 'オートミール', 'ジャム'],
    answer: 'トースト'
  },
  {
    type: 'audio',
    speak: 'シリアル',
    question: 'کدام کلمه را شنیدی؟',
    options: ['はちみつ', 'シリアル', 'トースト', 'オートミール'],
    answer: 'シリアル'
  },
  {
    type: 'audio',
    speak: 'オートミール',
    question: 'کدام کلمه را شنیدی؟',
    options: ['トースト', 'オートミール', 'ジャム', 'シリアル'],
    answer: 'オートミール'
  },
  {
    type: 'audio',
    speak: 'ジャム',
    question: 'کدام کلمه را شنیدی؟',
    options: ['シリアル', 'トースト', 'オートミール', 'ジャム'],
    answer: 'ジャム'
  },
  {
    type: 'audio',
    speak: 'はちみつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['はちみつ', 'ジャム', 'トースト', 'シリアル'],
    answer: 'はちみつ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'トースト',
    image: '../../../media/a2/food/toast.png',
    meaning: 'نان تست'
  },
  {
    type: 'speak',
    word: 'シリアル',
    image: '../../../media/a2/food/cereal.png',
    meaning: 'غلات صبحانه'
  },
  {
    type: 'speak',
    word: 'オートミール',
    image: '../../../media/a2/food/oatmeal.png',
    meaning: 'بلغور جو'
  },
  {
    type: 'speak',
    word: 'ジャム',
    image: '../../../media/a2/food/jam.png',
    meaning: 'مربا'
  },
  {
    type: 'speak',
    word: 'はちみつ',
    image: '../../../media/a2/food/honey.png',
    meaning: 'عسل'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'トーストを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'نان تست می‌خورم',
    words: ['ます', '食べ', 'を', 'トースト'],
    answer: ['トースト', 'を', '食べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'シリアルを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'غلات صبحانه می‌خورم',
    words: ['ます', '食べ', 'を', 'シリアル'],
    answer: ['シリアル', 'を', '食べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'オートミールを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'بلغور جو می‌خورم',
    words: ['ます', '食べ', 'を', 'オートミール'],
    answer: ['オートミール', 'を', '食べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ジャムをトーストに塗ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'روی نان تست مربا می‌مالم',
    words: ['ます', '塗り', 'に', 'トースト', 'を', 'ジャム'],
    answer: ['ジャム', 'を', 'トースト', 'に', '塗り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'はちみつを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'عسل می‌خورم',
    words: ['ます', '食べ', 'を', 'はちみつ'],
    answer: ['はちみつ', 'を', '食べ', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'トーストを食べます',
    question: 'ترجمه را بساز:',
    text: 'トーストを食べます',
    words: ['نان تست', 'می‌خورم'],
    answer: ['نان تست', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'シリアルを食べます',
    question: 'ترجمه را بساز:',
    text: 'シリアルを食べます',
    words: ['غلات صبحانه', 'می‌خورم'],
    answer: ['غلات صبحانه', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'オートミールを食べます',
    question: 'ترجمه را بساز:',
    text: 'オートミールを食べます',
    words: ['بلغور جو', 'می‌خورم'],
    answer: ['بلغور جو', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'ジャムをトーストに塗ります',
    question: 'ترجمه را بساز:',
    text: 'ジャムをトーストに塗ります',
    words: ['روی', 'نان تست', 'مربا', 'می‌مالم'],
    answer: ['روی', 'نان تست', 'مربا', 'می‌مالم']
  },
  {
    type: 'build-fa',
    speak: 'はちみつを食べます',
    question: 'ترجمه را بساز:',
    text: 'はちみつを食べます',
    words: ['عسل', 'می‌خورم'],
    answer: ['عسل', 'می‌خورم']
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