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

// ===== سوالات درس ۵۶ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "コンピューター" است؟',
    speak: 'コンピューター',
    options: [
      { text: 'コンピューター', image: '../../../media/a2/technology/computer.png' },
      { text: 'キーボード', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'マウス', image: '../../../media/a2/technology/mouse.png' },
      { text: 'インターネット', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: 'コンピューター'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "キーボード" است؟',
    speak: 'キーボード',
    options: [
      { text: 'メール', image: '../../../media/a2/technology/email.png' },
      { text: 'キーボード', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'コンピューター', image: '../../../media/a2/technology/computer.png' },
      { text: 'マウス', image: '../../../media/a2/technology/mouse.png' }
    ],
    answer: 'キーボード'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "マウス" است؟',
    speak: 'マウス',
    options: [
      { text: 'コンピューター', image: '../../../media/a2/technology/computer.png' },
      { text: 'マウス', image: '../../../media/a2/technology/mouse.png' },
      { text: 'インターネット', image: '../../../media/a2/technology/internet.png' },
      { text: 'キーボード', image: '../../../media/a2/technology/keyboard.png' }
    ],
    answer: 'マウス'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "インターネット" است؟',
    speak: 'インターネット',
    options: [
      { text: 'キーボード', image: '../../../media/a2/technology/keyboard.png' },
      { text: 'コンピューター', image: '../../../media/a2/technology/computer.png' },
      { text: 'マウス', image: '../../../media/a2/technology/mouse.png' },
      { text: 'インターネット', image: '../../../media/a2/technology/internet.png' }
    ],
    answer: 'インターネット'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "メール" است؟',
    speak: 'メール',
    options: [
      { text: 'メール', image: '../../../media/a2/technology/email.png' },
      { text: 'インターネット', image: '../../../media/a2/technology/internet.png' },
      { text: 'コンピューター', image: '../../../media/a2/technology/computer.png' },
      { text: 'キーボード', image: '../../../media/a2/technology/keyboard.png' }
    ],
    answer: 'メール'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/computer.png',
    options: ['コンピューター', 'キーボード', 'マウス', 'インターネット'],
    answer: 'コンピューター'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/keyboard.png',
    options: ['コンピューター', 'キーボード', 'マウス', 'メール'],
    answer: 'キーボード'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/mouse.png',
    options: ['メール', 'コンピューター', 'マウス', 'キーボード'],
    answer: 'マウス'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/internet.png',
    options: ['マウス', 'キーボード', 'インターネット', 'コンピューター'],
    answer: 'インターネット'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/email.png',
    options: ['コンピューター', 'インターネット', 'キーボード', 'メール'],
    answer: 'メール'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'コンピューター',
    question: 'کدام کلمه را شنیدی؟',
    options: ['コンピューター', 'キーボード', 'マウス', 'インターネット'],
    answer: 'コンピューター'
  },
  {
    type: 'audio',
    speak: 'キーボード',
    question: 'کدام کلمه را شنیدی؟',
    options: ['メール', 'キーボード', 'コンピューター', 'マウス'],
    answer: 'キーボード'
  },
  {
    type: 'audio',
    speak: 'マウス',
    question: 'کدام کلمه را شنیدی؟',
    options: ['コンピューター', 'マウス', 'インターネット', 'キーボード'],
    answer: 'マウス'
  },
  {
    type: 'audio',
    speak: 'インターネット',
    question: 'کدام کلمه را شنیدی؟',
    options: ['キーボード', 'コンピューター', 'マウス', 'インターネット'],
    answer: 'インターネット'
  },
  {
    type: 'audio',
    speak: 'メール',
    question: 'کدام کلمه را شنیدی؟',
    options: ['メール', 'インターネット', 'コンピューター', 'キーボード'],
    answer: 'メール'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'コンピューター',
    image: '../../../media/a2/technology/computer.png',
    meaning: 'کامپیوتر'
  },
  {
    type: 'speak',
    word: 'キーボード',
    image: '../../../media/a2/technology/keyboard.png',
    meaning: 'صفحه کلید'
  },
  {
    type: 'speak',
    word: 'マウス',
    image: '../../../media/a2/technology/mouse.png',
    meaning: 'موشواره'
  },
  {
    type: 'speak',
    word: 'インターネット',
    image: '../../../media/a2/technology/internet.png',
    meaning: 'اینترنت'
  },
  {
    type: 'speak',
    word: 'メール',
    image: '../../../media/a2/technology/email.png',
    meaning: 'ایمیل'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'コンピューターを使います',
    question: 'جمله ژاپنی را بساز:',
    text: 'کامپیوتر استفاده می‌کنم',
    words: ['ます', '使い', 'を', 'コンピューター'],
    answer: ['コンピューター', 'を', '使い', 'ます']
  },
  {
    type: 'build-it',
    speak: 'キーボードで打ちます',
    question: 'جمله ژاپنی را بساز:',
    text: 'با صفحه کلید تایپ می‌کنم',
    words: ['ます', '打ち', 'で', 'キーボード'],
    answer: ['キーボード', 'で', '打ち', 'ます']
  },
  {
    type: 'build-it',
    speak: 'マウスを動かします',
    question: 'جمله ژاپنی را بساز:',
    text: 'ماوس را حرکت می‌دهم',
    words: ['ます', '動かし', 'を', 'マウス'],
    answer: ['マウス', 'を', '動かし', 'ます']
  },
  {
    type: 'build-it',
    speak: 'インターネットを調べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'اینترنت جستجو می‌کنم',
    words: ['ます', '調べ', 'を', 'インターネット'],
    answer: ['インターネット', 'を', '調べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'メールを送ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'ایمیل می‌فرستم',
    words: ['ます', '送り', 'を', 'メール'],
    answer: ['メール', 'を', '送り', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'コンピューターを使います',
    question: 'ترجمه را بساز:',
    text: 'コンピューターを使います',
    words: ['کامپیوتر', 'استفاده', 'می‌کنم'],
    answer: ['کامپیوتر', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'キーボードで打ちます',
    question: 'ترجمه را بساز:',
    text: 'キーボードで打ちます',
    words: ['با', 'صفحه کلید', 'تایپ', 'می‌کنم'],
    answer: ['با', 'صفحه کلید', 'تایپ', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'マウスを動かします',
    question: 'ترجمه را بساز:',
    text: 'マウスを動かします',
    words: ['ماوس', 'را', 'حرکت', 'می‌دهم'],
    answer: ['ماوس', 'را', 'حرکت', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: 'インターネットを調べます',
    question: 'ترجمه را بساز:',
    text: 'インターネットを調べます',
    words: ['اینترنت', 'جستجو', 'می‌کنم'],
    answer: ['اینترنت', 'جستجو', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'メールを送ります',
    question: 'ترجمه را بساز:',
    text: 'メールを送ります',
    words: ['ایمیل', 'می‌فرستم'],
    answer: ['ایمیل', 'می‌فرستم']
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