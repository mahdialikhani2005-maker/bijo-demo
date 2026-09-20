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

// ===== سوالات درس ۲۷ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ブレスレット" است؟',
    speak: 'ブレスレット',
    options: [
      { text: 'ブレスレット', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'イヤリング', image: '../../../media/a2/clothes/earring.png' },
      { text: 'ゆびわ', image: '../../../media/a2/clothes/ring.png' },
      { text: 'くさり', image: '../../../media/a2/clothes/chain.png' }
    ],
    answer: 'ブレスレット'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "イヤリング" است؟',
    speak: 'イヤリング',
    options: [
      { text: 'かんむり', image: '../../../media/a2/clothes/crown.png' },
      { text: 'イヤリング', image: '../../../media/a2/clothes/earring.png' },
      { text: 'ブレスレット', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'ゆびわ', image: '../../../media/a2/clothes/ring.png' }
    ],
    answer: 'イヤリング'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ゆびわ" است؟',
    speak: 'ゆびわ',
    options: [
      { text: 'ブレスレット', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'ゆびわ', image: '../../../media/a2/clothes/ring.png' },
      { text: 'くさり', image: '../../../media/a2/clothes/chain.png' },
      { text: 'イヤリング', image: '../../../media/a2/clothes/earring.png' }
    ],
    answer: 'ゆびわ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "くさり" است؟',
    speak: 'くさり',
    options: [
      { text: 'イヤリング', image: '../../../media/a2/clothes/earring.png' },
      { text: 'ブレスレット', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'ゆびわ', image: '../../../media/a2/clothes/ring.png' },
      { text: 'くさり', image: '../../../media/a2/clothes/chain.png' }
    ],
    answer: 'くさり'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かんむり" است؟',
    speak: 'かんむり',
    options: [
      { text: 'かんむり', image: '../../../media/a2/clothes/crown.png' },
      { text: 'くさり', image: '../../../media/a2/clothes/chain.png' },
      { text: 'ブレスレット', image: '../../../media/a2/clothes/bracelet.png' },
      { text: 'イヤリング', image: '../../../media/a2/clothes/earring.png' }
    ],
    answer: 'かんむり'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/bracelet.png',
    options: ['ブレスレット', 'イヤリング', 'ゆびわ', 'くさり'],
    answer: 'ブレスレット'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/earring.png',
    options: ['ブレスレット', 'イヤリング', 'ゆびわ', 'かんむり'],
    answer: 'イヤリング'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/ring.png',
    options: ['かんむり', 'ブレスレット', 'ゆびわ', 'イヤリング'],
    answer: 'ゆびわ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/chain.png',
    options: ['ゆびわ', 'イヤリング', 'くさり', 'ブレスレット'],
    answer: 'くさり'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/crown.png',
    options: ['ブレスレット', 'くさり', 'イヤリング', 'かんむり'],
    answer: 'かんむり'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ブレスレット',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ブレスレット', 'イヤリング', 'ゆびわ', 'くさり'],
    answer: 'ブレスレット'
  },
  {
    type: 'audio',
    speak: 'イヤリング',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かんむり', 'イヤリング', 'ブレスレット', 'ゆびわ'],
    answer: 'イヤリング'
  },
  {
    type: 'audio',
    speak: 'ゆびわ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ブレスレット', 'ゆびわ', 'くさり', 'イヤリング'],
    answer: 'ゆびわ'
  },
  {
    type: 'audio',
    speak: 'くさり',
    question: 'کدام کلمه را شنیدی؟',
    options: ['イヤリング', 'ブレスレット', 'ゆびわ', 'くさり'],
    answer: 'くさり'
  },
  {
    type: 'audio',
    speak: 'かんむり',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かんむり', 'くさり', 'ブレスレット', 'イヤリング'],
    answer: 'かんむり'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ブレスレット',
    image: '../../../media/a2/clothes/bracelet.png',
    meaning: 'دستبند'
  },
  {
    type: 'speak',
    word: 'イヤリング',
    image: '../../../media/a2/clothes/earring.png',
    meaning: 'گوشواره'
  },
  {
    type: 'speak',
    word: 'ゆびわ',
    image: '../../../media/a2/clothes/ring.png',
    meaning: 'حلقه'
  },
  {
    type: 'speak',
    word: 'くさり',
    image: '../../../media/a2/clothes/chain.png',
    meaning: 'زنجیر'
  },
  {
    type: 'speak',
    word: 'かんむり',
    image: '../../../media/a2/clothes/crown.png',
    meaning: 'تاج'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ブレスレットを買いました',
    question: 'جمله ژاپنی را بساز:',
    text: 'دستبند خریدم',
    words: ['ました', '買', 'を', 'ブレスレット'],
    answer: ['ブレスレット', 'を', '買', 'ました']
  },
  {
    type: 'build-it',
    speak: 'イヤリングをしています',
    question: 'جمله ژاپنی را بساز:',
    text: 'گوشواره دارم',
    words: ['ます', 'し', 'を', 'イヤリング'],
    answer: ['イヤリング', 'を', 'し', 'ています']
  },
  {
    type: 'build-it',
    speak: 'ゆびわをはめています',
    question: 'جمله ژاپنی را بساز:',
    text: 'حلقه به دست دارم',
    words: ['ます', 'はめ', 'を', 'ゆびわ'],
    answer: ['ゆびわ', 'を', 'はめ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'くさりをつけています',
    question: 'جمله ژاپنی را بساز:',
    text: 'زنجیر بسته‌ام',
    words: ['ます', 'つけ', 'を', 'くさり'],
    answer: ['くさり', 'を', 'つけ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'かんむりをかぶっています',
    question: 'جمله ژاپنی را بساز:',
    text: 'تاج بر سر دارم',
    words: ['ます', 'かぶっ', 'を', 'かんむり'],
    answer: ['かんむり', 'を', 'かぶっ', 'ています']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ブレスレットを買いました',
    question: 'ترجمه را بساز:',
    text: 'ブレスレットを買いました',
    words: ['دستبند', 'خریدم'],
    answer: ['دستبند', 'خریدم']
  },
  {
    type: 'build-fa',
    speak: 'イヤリングをしています',
    question: 'ترجمه را بساز:',
    text: 'イヤリングをしています',
    words: ['گوشواره', 'دارم'],
    answer: ['گوشواره', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'ゆびわをはめています',
    question: 'ترجمه را بساز:',
    text: 'ゆびわをはめています',
    words: ['حلقه', 'به دست', 'دارم'],
    answer: ['حلقه', 'به دست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'くさりをつけています',
    question: 'ترجمه را بساز:',
    text: 'くさりをつけています',
    words: ['زنجیر', 'بسته‌ام'],
    answer: ['زنجیر', 'بسته‌ام']
  },
  {
    type: 'build-fa',
    speak: 'かんむりをかぶっています',
    question: 'ترجمه را بساز:',
    text: 'かんむりをかぶっています',
    words: ['تاج', 'بر سر', 'دارم'],
    answer: ['تاج', 'بر سر', 'دارم']
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