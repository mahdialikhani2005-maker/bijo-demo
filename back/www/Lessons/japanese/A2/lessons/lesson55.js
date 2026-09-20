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

// ===== سوالات درس ۵۵ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ビザ" است؟',
    speak: 'ビザ',
    options: [
      { text: 'ビザ', image: '../../../media/a2/travel/visa.png' },
      { text: 'つうか', image: '../../../media/a2/travel/currency.png' },
      { text: 'りょうがえ', image: '../../../media/a2/travel/exchange.png' },
      { text: 'しゅっぱつ', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'ビザ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "つうか" است؟',
    speak: 'つうか',
    options: [
      { text: 'とうちゃく', image: '../../../media/a2/travel/arrival.png' },
      { text: 'つうか', image: '../../../media/a2/travel/currency.png' },
      { text: 'ビザ', image: '../../../media/a2/travel/visa.png' },
      { text: 'りょうがえ', image: '../../../media/a2/travel/exchange.png' }
    ],
    answer: 'つうか'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "りょうがえ" است؟',
    speak: 'りょうがえ',
    options: [
      { text: 'ビザ', image: '../../../media/a2/travel/visa.png' },
      { text: 'りょうがえ', image: '../../../media/a2/travel/exchange.png' },
      { text: 'しゅっぱつ', image: '../../../media/a2/travel/departure.png' },
      { text: 'つうか', image: '../../../media/a2/travel/currency.png' }
    ],
    answer: 'りょうがえ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "しゅっぱつ" است؟',
    speak: 'しゅっぱつ',
    options: [
      { text: 'つうか', image: '../../../media/a2/travel/currency.png' },
      { text: 'ビザ', image: '../../../media/a2/travel/visa.png' },
      { text: 'りょうがえ', image: '../../../media/a2/travel/exchange.png' },
      { text: 'しゅっぱつ', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'しゅっぱつ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "とうちゃく" است؟',
    speak: 'とうちゃく',
    options: [
      { text: 'とうちゃく', image: '../../../media/a2/travel/arrival.png' },
      { text: 'しゅっぱつ', image: '../../../media/a2/travel/departure.png' },
      { text: 'ビザ', image: '../../../media/a2/travel/visa.png' },
      { text: 'つうか', image: '../../../media/a2/travel/currency.png' }
    ],
    answer: 'とうちゃく'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/visa.png',
    options: ['ビザ', 'つうか', 'りょうがえ', 'しゅっぱつ'],
    answer: 'ビザ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/currency.png',
    options: ['ビザ', 'つうか', 'りょうがえ', 'とうちゃく'],
    answer: 'つうか'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/exchange.png',
    options: ['とうちゃく', 'ビザ', 'りょうがえ', 'つうか'],
    answer: 'りょうがえ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/departure.png',
    options: ['りょうがえ', 'つうか', 'しゅっぱつ', 'ビザ'],
    answer: 'しゅっぱつ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/arrival.png',
    options: ['ビザ', 'しゅっぱつ', 'りょうがえ', 'とうちゃく'],
    answer: 'とうちゃく'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ビザ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ビザ', 'つうか', 'りょうがえ', 'しゅっぱつ'],
    answer: 'ビザ'
  },
  {
    type: 'audio',
    speak: 'つうか',
    question: 'کدام کلمه را شنیدی؟',
    options: ['とうちゃく', 'つうか', 'ビザ', 'りょうがえ'],
    answer: 'つうか'
  },
  {
    type: 'audio',
    speak: 'りょうがえ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ビザ', 'りょうがえ', 'しゅっぱつ', 'つうか'],
    answer: 'りょうがえ'
  },
  {
    type: 'audio',
    speak: 'しゅっぱつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['つうか', 'ビザ', 'りょうがえ', 'しゅっぱつ'],
    answer: 'しゅっぱつ'
  },
  {
    type: 'audio',
    speak: 'とうちゃく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['とうちゃく', 'しゅっぱつ', 'ビザ', 'つうか'],
    answer: 'とうちゃく'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ビザ',
    image: '../../../media/a2/travel/visa.png',
    meaning: 'ویزا'
  },
  {
    type: 'speak',
    word: 'つうか',
    image: '../../../media/a2/travel/currency.png',
    meaning: 'ارز'
  },
  {
    type: 'speak',
    word: 'りょうがえ',
    image: '../../../media/a2/travel/exchange.png',
    meaning: 'تبدیل ارز'
  },
  {
    type: 'speak',
    word: 'しゅっぱつ',
    image: '../../../media/a2/travel/departure.png',
    meaning: 'حرکت'
  },
  {
    type: 'speak',
    word: 'とうちゃく',
    image: '../../../media/a2/travel/arrival.png',
    meaning: 'ورود'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ビザを申請します',
    question: 'جمله ژاپنی را بساز:',
    text: 'درخواست ویزا می‌دهم',
    words: ['ます', '申請', 'を', 'ビザ'],
    answer: ['ビザ', 'を', '申請', 'します']
  },
  {
    type: 'build-it',
    speak: 'つうかを両替します',
    question: 'جمله ژاپنی را بساز:',
    text: 'ارز تبدیل می‌کنم',
    words: ['ます', '両替', 'を', 'つうか'],
    answer: ['つうか', 'を', '両替', 'します']
  },
  {
    type: 'build-it',
    speak: 'りょうがえをします',
    question: 'جمله ژاپنی را بساز:',
    text: 'تبدیل ارز انجام می‌دهم',
    words: ['ます', 'し', 'を', 'りょうがえ'],
    answer: ['りょうがえ', 'を', 'し', 'ます']
  },
  {
    type: 'build-it',
    speak: 'しゅっぱつは明日です',
    question: 'جمله ژاپنی را بساز:',
    text: 'حرکت فردا است',
    words: ['です', '明日', 'は', 'しゅっぱつ'],
    answer: ['しゅっぱつ', 'は', '明日', 'です']
  },
  {
    type: 'build-it',
    speak: 'とうちゃくは午後です',
    question: 'جمله ژاپنی را بساز:',
    text: 'ورود بعد از ظهر است',
    words: ['です', '午後', 'は', 'とうちゃく'],
    answer: ['とうちゃく', 'は', '午後', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ビザを申請します',
    question: 'ترجمه را بساز:',
    text: 'ビザを申請します',
    words: ['درخواست', 'ویزا', 'می‌دهم'],
    answer: ['درخواست', 'ویزا', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: 'つうかを両替します',
    question: 'ترجمه را بساز:',
    text: 'つうかを両替します',
    words: ['ارز', 'تبدیل', 'می‌کنم'],
    answer: ['ارز', 'تبدیل', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'りょうがえをします',
    question: 'ترجمه را بساز:',
    text: 'りょうがえをします',
    words: ['تبدیل ارز', 'انجام', 'می‌دهم'],
    answer: ['تبدیل ارز', 'انجام', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: 'しゅっぱつは明日です',
    question: 'ترجمه را بساز:',
    text: 'しゅっぱつは明日です',
    words: ['حرکت', 'فردا', 'است'],
    answer: ['حرکت', 'فردا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'とうちゃくは午後です',
    question: 'ترجمه را بساز:',
    text: 'とうちゃくは午後です',
    words: ['ورود', 'بعد از ظهر', 'است'],
    answer: ['ورود', 'بعد از ظهر', 'است']
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