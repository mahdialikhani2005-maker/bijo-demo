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

// ===== سوالات درس ۲۴ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "バター" است؟',
    speak: 'バター',
    options: [
      { text: 'バター', image: '../../../media/a2/food/butter.png' },
      { text: 'チーズ', image: '../../../media/a2/food/cheese.png' },
      { text: 'クリーム', image: '../../../media/a2/food/cream.png' },
      { text: 'ヨーグルト', image: '../../../media/a2/food/yogurt.png' }
    ],
    answer: 'バター'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "チーズ" است؟',
    speak: 'チーズ',
    options: [
      { text: 'アイスクリーム', image: '../../../media/a2/food/icecream.png' },
      { text: 'チーズ', image: '../../../media/a2/food/cheese.png' },
      { text: 'バター', image: '../../../media/a2/food/butter.png' },
      { text: 'クリーム', image: '../../../media/a2/food/cream.png' }
    ],
    answer: 'チーズ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "クリーム" است؟',
    speak: 'クリーム',
    options: [
      { text: 'バター', image: '../../../media/a2/food/butter.png' },
      { text: 'クリーム', image: '../../../media/a2/food/cream.png' },
      { text: 'ヨーグルト', image: '../../../media/a2/food/yogurt.png' },
      { text: 'チーズ', image: '../../../media/a2/food/cheese.png' }
    ],
    answer: 'クリーム'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ヨーグルト" است؟',
    speak: 'ヨーグルト',
    options: [
      { text: 'チーズ', image: '../../../media/a2/food/cheese.png' },
      { text: 'バター', image: '../../../media/a2/food/butter.png' },
      { text: 'クリーム', image: '../../../media/a2/food/cream.png' },
      { text: 'ヨーグルト', image: '../../../media/a2/food/yogurt.png' }
    ],
    answer: 'ヨーグルト'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "アイスクリーム" است؟',
    speak: 'アイスクリーム',
    options: [
      { text: 'アイスクリーム', image: '../../../media/a2/food/icecream.png' },
      { text: 'ヨーグルト', image: '../../../media/a2/food/yogurt.png' },
      { text: 'バター', image: '../../../media/a2/food/butter.png' },
      { text: 'チーズ', image: '../../../media/a2/food/cheese.png' }
    ],
    answer: 'アイスクリーム'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/butter.png',
    options: ['バター', 'チーズ', 'クリーム', 'ヨーグルト'],
    answer: 'バター'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cheese.png',
    options: ['バター', 'チーズ', 'クリーム', 'アイスクリーム'],
    answer: 'チーズ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cream.png',
    options: ['アイスクリーム', 'バター', 'クリーム', 'チーズ'],
    answer: 'クリーム'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/yogurt.png',
    options: ['クリーム', 'チーズ', 'ヨーグルト', 'バター'],
    answer: 'ヨーグルト'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/icecream.png',
    options: ['バター', 'ヨーグルト', 'チーズ', 'アイスクリーム'],
    answer: 'アイスクリーム'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'バター',
    question: 'کدام کلمه را شنیدی؟',
    options: ['バター', 'チーズ', 'クリーム', 'ヨーグルト'],
    answer: 'バター'
  },
  {
    type: 'audio',
    speak: 'チーズ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アイスクリーム', 'チーズ', 'バター', 'クリーム'],
    answer: 'チーズ'
  },
  {
    type: 'audio',
    speak: 'クリーム',
    question: 'کدام کلمه را شنیدی؟',
    options: ['バター', 'クリーム', 'ヨーグルト', 'チーズ'],
    answer: 'クリーム'
  },
  {
    type: 'audio',
    speak: 'ヨーグルト',
    question: 'کدام کلمه را شنیدی؟',
    options: ['チーズ', 'バター', 'クリーム', 'ヨーグルト'],
    answer: 'ヨーグルト'
  },
  {
    type: 'audio',
    speak: 'アイスクリーム',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アイスクリーム', 'ヨーグルト', 'バター', 'チーズ'],
    answer: 'アイスクリーム'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'バター',
    image: '../../../media/a2/food/butter.png',
    meaning: 'کره'
  },
  {
    type: 'speak',
    word: 'チーズ',
    image: '../../../media/a2/food/cheese.png',
    meaning: 'پنیر'
  },
  {
    type: 'speak',
    word: 'クリーム',
    image: '../../../media/a2/food/cream.png',
    meaning: 'خامه'
  },
  {
    type: 'speak',
    word: 'ヨーグルト',
    image: '../../../media/a2/food/yogurt.png',
    meaning: 'ماست'
  },
  {
    type: 'speak',
    word: 'アイスクリーム',
    image: '../../../media/a2/food/icecream.png',
    meaning: 'بستنی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'バターを買います',
    question: 'جمله ژاپنی را بساز:',
    text: 'کره می‌خرم',
    words: ['ます', '買', 'を', 'バター'],
    answer: ['バター', 'を', '買', 'ます']
  },
  {
    type: 'build-it',
    speak: 'チーズが好きです',
    question: 'جمله ژاپنی را بساز:',
    text: 'پنیر دوست دارم',
    words: ['です', '好き', 'が', 'チーズ'],
    answer: ['チーズ', 'が', '好き', 'です']
  },
  {
    type: 'build-it',
    speak: 'クリームを使います',
    question: 'جمله ژاپنی را بساز:',
    text: 'خامه استفاده می‌کنم',
    words: ['ます', '使', 'を', 'クリーム'],
    answer: ['クリーム', 'を', '使', 'います']
  },
  {
    type: 'build-it',
    speak: 'ヨーグルトを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'ماست می‌خورم',
    words: ['ます', '食べ', 'を', 'ヨーグルト'],
    answer: ['ヨーグルト', 'を', '食べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'アイスクリームを食べたいです',
    question: 'جمله ژاپنی را بساز:',
    text: 'بستنی می‌خواهم بخورم',
    words: ['です', 'たい', '食べ', 'を', 'アイスクリーム'],
    answer: ['アイスクリーム', 'を', '食べ', 'たい', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'バターを買います',
    question: 'ترجمه را بساز:',
    text: 'バターを買います',
    words: ['کره', 'می‌خرم'],
    answer: ['کره', 'می‌خرم']
  },
  {
    type: 'build-fa',
    speak: 'チーズが好きです',
    question: 'ترجمه را بساز:',
    text: 'チーズが好きです',
    words: ['پنیر', 'دوست', 'دارم'],
    answer: ['پنیر', 'دوست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'クリームを使います',
    question: 'ترجمه را بساز:',
    text: 'クリームを使います',
    words: ['خامه', 'استفاده', 'می‌کنم'],
    answer: ['خامه', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ヨーグルトを食べます',
    question: 'ترجمه را بساز:',
    text: 'ヨーグルトを食べます',
    words: ['ماست', 'می‌خورم'],
    answer: ['ماست', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'アイスクリームを食べたいです',
    question: 'ترجمه را بساز:',
    text: 'アイスクリームを食べたいです',
    words: ['بستنی', 'می‌خواهم', 'بخورم'],
    answer: ['بستنی', 'می‌خواهم', 'بخورم']
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