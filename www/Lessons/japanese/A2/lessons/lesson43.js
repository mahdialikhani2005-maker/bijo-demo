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

// ===== سوالات درس ۴۳ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "せき" است؟',
    speak: 'せき',
    options: [
      { text: 'せき', image: '../../../media/a2/health/cough.png' },
      { text: 'ねつ', image: '../../../media/a2/health/fever.png' },
      { text: 'アスピリン', image: '../../../media/a2/health/aspirin.png' },
      { text: 'ちゅうしゃ', image: '../../../media/a2/health/injection.png' }
    ],
    answer: 'せき'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ねつ" است؟',
    speak: 'ねつ',
    options: [
      { text: 'くすり', image: '../../../media/a2/health/medicine.png' },
      { text: 'ねつ', image: '../../../media/a2/health/fever.png' },
      { text: 'せき', image: '../../../media/a2/health/cough.png' },
      { text: 'アスピリン', image: '../../../media/a2/health/aspirin.png' }
    ],
    answer: 'ねつ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "アスピリン" است؟',
    speak: 'アスピリン',
    options: [
      { text: 'せき', image: '../../../media/a2/health/cough.png' },
      { text: 'アスピリン', image: '../../../media/a2/health/aspirin.png' },
      { text: 'ちゅうしゃ', image: '../../../media/a2/health/injection.png' },
      { text: 'ねつ', image: '../../../media/a2/health/fever.png' }
    ],
    answer: 'アスピリン'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "くすり" است؟',
    speak: 'くすり',
    options: [
      { text: 'ねつ', image: '../../../media/a2/health/fever.png' },
      { text: 'せき', image: '../../../media/a2/health/cough.png' },
      { text: 'アスピリン', image: '../../../media/a2/health/aspirin.png' },
      { text: 'くすり', image: '../../../media/a2/health/medicine.png' }
    ],
    answer: 'くすり'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ちゅうしゃ" است؟',
    speak: 'ちゅうしゃ',
    options: [
      { text: 'ちゅうしゃ', image: '../../../media/a2/health/injection.png' },
      { text: 'くすり', image: '../../../media/a2/health/medicine.png' },
      { text: 'せき', image: '../../../media/a2/health/cough.png' },
      { text: 'ねつ', image: '../../../media/a2/health/fever.png' }
    ],
    answer: 'ちゅうしゃ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cough.png',
    options: ['せき', 'ねつ', 'アスピリン', 'ちゅうしゃ'],
    answer: 'せき'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/fever.png',
    options: ['せき', 'ねつ', 'くすり', 'アスピリン'],
    answer: 'ねつ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/aspirin.png',
    options: ['くすり', 'せき', 'アスピリン', 'ねつ'],
    answer: 'アスピリン'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/medicine.png',
    options: ['アスピリン', 'ねつ', 'ちゅうしゃ', 'くすり'],
    answer: 'くすり'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injection.png',
    options: ['せき', 'くすり', 'ねつ', 'ちゅうしゃ'],
    answer: 'ちゅうしゃ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'せき',
    question: 'کدام کلمه را شنیدی؟',
    options: ['せき', 'ねつ', 'アスピリン', 'ちゅうしゃ'],
    answer: 'せき'
  },
  {
    type: 'audio',
    speak: 'ねつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['くすり', 'ねつ', 'せき', 'アスピリン'],
    answer: 'ねつ'
  },
  {
    type: 'audio',
    speak: 'アスピリン',
    question: 'کدام کلمه را شنیدی؟',
    options: ['せき', 'アスピリン', 'ちゅうしゃ', 'ねつ'],
    answer: 'アスピリン'
  },
  {
    type: 'audio',
    speak: 'くすり',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ねつ', 'せき', 'アスピリン', 'くすり'],
    answer: 'くすり'
  },
  {
    type: 'audio',
    speak: 'ちゅうしゃ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ちゅうしゃ', 'くすり', 'せき', 'ねつ'],
    answer: 'ちゅうしゃ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'せき',
    image: '../../../media/a2/health/cough.png',
    meaning: 'سرفه'
  },
  {
    type: 'speak',
    word: 'ねつ',
    image: '../../../media/a2/health/fever.png',
    meaning: 'تب'
  },
  {
    type: 'speak',
    word: 'アスピリン',
    image: '../../../media/a2/health/aspirin.png',
    meaning: 'آسپرین'
  },
  {
    type: 'speak',
    word: 'くすり',
    image: '../../../media/a2/health/medicine.png',
    meaning: 'دارو'
  },
  {
    type: 'speak',
    word: 'ちゅうしゃ',
    image: '../../../media/a2/health/injection.png',
    meaning: 'آمپول'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'せきが出ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'سرفه می‌کنم',
    words: ['ます', '出', 'が', 'せき'],
    answer: ['せき', 'が', '出', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ねつがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'تب دارم',
    words: ['ます', 'あり', 'が', 'ねつ'],
    answer: ['ねつ', 'が', 'あり', 'ます']
  },
  {
    type: 'build-it',
    speak: 'アスピリンを飲みます',
    question: 'جمله ژاپنی را بساز:',
    text: 'آسپرین می‌خورم',
    words: ['ます', '飲み', 'を', 'アスピリン'],
    answer: ['アスピリン', 'を', '飲み', 'ます']
  },
  {
    type: 'build-it',
    speak: 'くすりを飲みます',
    question: 'جمله ژاپنی را بساز:',
    text: 'دارو می‌خورم',
    words: ['ます', '飲み', 'を', 'くすり'],
    answer: ['くすり', 'を', '飲み', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ちゅうしゃをします',
    question: 'جمله ژاپنی را بساز:',
    text: 'آمپول می‌زنم',
    words: ['ます', 'し', 'を', 'ちゅうしゃ'],
    answer: ['ちゅうしゃ', 'を', 'し', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'せきが出ます',
    question: 'ترجمه را بساز:',
    text: 'せきが出ます',
    words: ['سرفه', 'می‌کنم'],
    answer: ['سرفه', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ねつがあります',
    question: 'ترجمه را بساز:',
    text: 'ねつがあります',
    words: ['تب', 'دارم'],
    answer: ['تب', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'アスピリンを飲みます',
    question: 'ترجمه را بساز:',
    text: 'アスピリンを飲みます',
    words: ['آسپرین', 'می‌خورم'],
    answer: ['آسپرین', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'くすりを飲みます',
    question: 'ترجمه را بساز:',
    text: 'くすりを飲みます',
    words: ['دارو', 'می‌خورم'],
    answer: ['دارو', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'ちゅうしゃをします',
    question: 'ترجمه را بساز:',
    text: 'ちゅうしゃをします',
    words: ['آمپول', 'می‌زنم'],
    answer: ['آمپول', 'می‌زنم']
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