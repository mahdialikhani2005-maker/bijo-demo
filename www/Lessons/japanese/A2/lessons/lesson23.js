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

// ===== سوالات درس ۲۳ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ステーキ" است؟',
    speak: 'ステーキ',
    options: [
      { text: 'ステーキ', image: '../../../media/a2/food/steak.png' },
      { text: 'エビ', image: '../../../media/a2/food/shrimp.png' },
      { text: 'ロブスター', image: '../../../media/a2/food/lobster.png' },
      { text: 'カキ', image: '../../../media/a2/food/oyster.png' }
    ],
    answer: 'ステーキ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "エビ" است؟',
    speak: 'エビ',
    options: [
      { text: 'カニ', image: '../../../media/a2/food/crab.png' },
      { text: 'エビ', image: '../../../media/a2/food/shrimp.png' },
      { text: 'ステーキ', image: '../../../media/a2/food/steak.png' },
      { text: 'ロブスター', image: '../../../media/a2/food/lobster.png' }
    ],
    answer: 'エビ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ロブスター" است؟',
    speak: 'ロブスター',
    options: [
      { text: 'ステーキ', image: '../../../media/a2/food/steak.png' },
      { text: 'ロブスター', image: '../../../media/a2/food/lobster.png' },
      { text: 'カキ', image: '../../../media/a2/food/oyster.png' },
      { text: 'エビ', image: '../../../media/a2/food/shrimp.png' }
    ],
    answer: 'ロブスター'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "カキ" است؟',
    speak: 'カキ',
    options: [
      { text: 'エビ', image: '../../../media/a2/food/shrimp.png' },
      { text: 'ステーキ', image: '../../../media/a2/food/steak.png' },
      { text: 'ロブスター', image: '../../../media/a2/food/lobster.png' },
      { text: 'カキ', image: '../../../media/a2/food/oyster.png' }
    ],
    answer: 'カキ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "カニ" است؟',
    speak: 'カニ',
    options: [
      { text: 'カニ', image: '../../../media/a2/food/crab.png' },
      { text: 'カキ', image: '../../../media/a2/food/oyster.png' },
      { text: 'ステーキ', image: '../../../media/a2/food/steak.png' },
      { text: 'エビ', image: '../../../media/a2/food/shrimp.png' }
    ],
    answer: 'カニ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/steak.png',
    options: ['ステーキ', 'エビ', 'ロブスター', 'カキ'],
    answer: 'ステーキ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/shrimp.png',
    options: ['ステーキ', 'エビ', 'ロブスター', 'カニ'],
    answer: 'エビ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/lobster.png',
    options: ['カニ', 'ステーキ', 'ロブスター', 'エビ'],
    answer: 'ロブスター'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/oyster.png',
    options: ['ロブスター', 'エビ', 'カキ', 'ステーキ'],
    answer: 'カキ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/crab.png',
    options: ['ステーキ', 'カキ', 'エビ', 'カニ'],
    answer: 'カニ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ステーキ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ステーキ', 'エビ', 'ロブスター', 'カキ'],
    answer: 'ステーキ'
  },
  {
    type: 'audio',
    speak: 'エビ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['カニ', 'エビ', 'ステーキ', 'ロブスター'],
    answer: 'エビ'
  },
  {
    type: 'audio',
    speak: 'ロブスター',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ステーキ', 'ロブスター', 'カキ', 'エビ'],
    answer: 'ロブスター'
  },
  {
    type: 'audio',
    speak: 'カキ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['エビ', 'ステーキ', 'ロブスター', 'カキ'],
    answer: 'カキ'
  },
  {
    type: 'audio',
    speak: 'カニ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['カニ', 'カキ', 'ステーキ', 'エビ'],
    answer: 'カニ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ステーキ',
    image: '../../../media/a2/food/steak.png',
    meaning: 'استیک'
  },
  {
    type: 'speak',
    word: 'エビ',
    image: '../../../media/a2/food/shrimp.png',
    meaning: 'میگو'
  },
  {
    type: 'speak',
    word: 'ロブスター',
    image: '../../../media/a2/food/lobster.png',
    meaning: 'خرچنگ'
  },
  {
    type: 'speak',
    word: 'カキ',
    image: '../../../media/a2/food/oyster.png',
    meaning: 'صدف'
  },
  {
    type: 'speak',
    word: 'カニ',
    image: '../../../media/a2/food/crab.png',
    meaning: 'خرچنگ دریایی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ステーキを食べたいです',
    question: 'جمله ژاپنی را بساز:',
    text: 'استیک می‌خواهم بخورم',
    words: ['です', 'たい', '食べ', 'を', 'ステーキ'],
    answer: ['ステーキ', 'を', '食べ', 'たい', 'です']
  },
  {
    type: 'build-it',
    speak: 'エビが好きです',
    question: 'جمله ژاپنی را بساز:',
    text: 'میگو دوست دارم',
    words: ['です', '好き', 'が', 'エビ'],
    answer: ['エビ', 'が', '好き', 'です']
  },
  {
    type: 'build-it',
    speak: 'ロブスターは高いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'خرچنگ گران است',
    words: ['です', '高い', 'は', 'ロブスター'],
    answer: ['ロブスター', 'は', '高い', 'です']
  },
  {
    type: 'build-it',
    speak: 'カキを食べました',
    question: 'جمله ژاپنی را بساز:',
    text: 'صدف خوردم',
    words: ['ました', '食べ', 'を', 'カキ'],
    answer: ['カキ', 'を', '食べ', 'ました']
  },
  {
    type: 'build-it',
    speak: 'カニを食べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'خرچنگ دریایی می‌خورم',
    words: ['ます', '食べ', 'を', 'カニ'],
    answer: ['カニ', 'を', '食べ', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ステーキを食べたいです',
    question: 'ترجمه را بساز:',
    text: 'ステーキを食べたいです',
    words: ['استیک', 'می‌خواهم', 'بخورم'],
    answer: ['استیک', 'می‌خواهم', 'بخورم']
  },
  {
    type: 'build-fa',
    speak: 'エビが好きです',
    question: 'ترجمه را بساز:',
    text: 'エビが好きです',
    words: ['میگو', 'دوست', 'دارم'],
    answer: ['میگو', 'دوست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'ロブスターは高いです',
    question: 'ترجمه را بساز:',
    text: 'ロブスターは高いです',
    words: ['خرچنگ', 'گران', 'است'],
    answer: ['خرچنگ', 'گران', 'است']
  },
  {
    type: 'build-fa',
    speak: 'カキを食べました',
    question: 'ترجمه را بساز:',
    text: 'カキを食べました',
    words: ['صدف', 'خوردم'],
    answer: ['صدف', 'خوردم']
  },
  {
    type: 'build-fa',
    speak: 'カニを食べます',
    question: 'ترجمه را بساز:',
    text: 'カニを食べます',
    words: ['خرچنگ دریایی', 'می‌خورم'],
    answer: ['خرچنگ دریایی', 'می‌خورم']
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