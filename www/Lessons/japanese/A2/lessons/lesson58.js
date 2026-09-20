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

// ===== سوالات درس ۵۸ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ソフトウェア" است؟',
    speak: 'ソフトウェア',
    options: [
      { text: 'ソフトウェア', image: '../../../media/a2/technology/software.png' },
      { text: 'ハードウェア', image: '../../../media/a2/technology/hardware.png' },
      { text: 'アップデート', image: '../../../media/a2/technology/update.png' },
      { text: 'パスワード', image: '../../../media/a2/technology/password.png' }
    ],
    answer: 'ソフトウェア'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ハードウェア" است؟',
    speak: 'ハードウェア',
    options: [
      { text: 'アカウント', image: '../../../media/a2/technology/account.png' },
      { text: 'ハードウェア', image: '../../../media/a2/technology/hardware.png' },
      { text: 'ソフトウェア', image: '../../../media/a2/technology/software.png' },
      { text: 'アップデート', image: '../../../media/a2/technology/update.png' }
    ],
    answer: 'ハードウェア'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "アップデート" است؟',
    speak: 'アップデート',
    options: [
      { text: 'ソフトウェア', image: '../../../media/a2/technology/software.png' },
      { text: 'アップデート', image: '../../../media/a2/technology/update.png' },
      { text: 'パスワード', image: '../../../media/a2/technology/password.png' },
      { text: 'ハードウェア', image: '../../../media/a2/technology/hardware.png' }
    ],
    answer: 'アップデート'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "パスワード" است؟',
    speak: 'パスワード',
    options: [
      { text: 'ハードウェア', image: '../../../media/a2/technology/hardware.png' },
      { text: 'ソフトウェア', image: '../../../media/a2/technology/software.png' },
      { text: 'アップデート', image: '../../../media/a2/technology/update.png' },
      { text: 'パスワード', image: '../../../media/a2/technology/password.png' }
    ],
    answer: 'パスワード'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "アカウント" است؟',
    speak: 'アカウント',
    options: [
      { text: 'アカウント', image: '../../../media/a2/technology/account.png' },
      { text: 'パスワード', image: '../../../media/a2/technology/password.png' },
      { text: 'ソフトウェア', image: '../../../media/a2/technology/software.png' },
      { text: 'ハードウェア', image: '../../../media/a2/technology/hardware.png' }
    ],
    answer: 'アカウント'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/software.png',
    options: ['ソフトウェア', 'ハードウェア', 'アップデート', 'パスワード'],
    answer: 'ソフトウェア'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/hardware.png',
    options: ['ソフトウェア', 'ハードウェア', 'アップデート', 'アカウント'],
    answer: 'ハードウェア'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/update.png',
    options: ['アカウント', 'ソフトウェア', 'アップデート', 'ハードウェア'],
    answer: 'アップデート'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/password.png',
    options: ['アップデート', 'ハードウェア', 'パスワード', 'ソフトウェア'],
    answer: 'パスワード'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/account.png',
    options: ['ソフトウェア', 'パスワード', 'ハードウェア', 'アカウント'],
    answer: 'アカウント'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ソフトウェア',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ソフトウェア', 'ハードウェア', 'アップデート', 'パスワード'],
    answer: 'ソフトウェア'
  },
  {
    type: 'audio',
    speak: 'ハードウェア',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アカウント', 'ハードウェア', 'ソフトウェア', 'アップデート'],
    answer: 'ハードウェア'
  },
  {
    type: 'audio',
    speak: 'アップデート',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ソフトウェア', 'アップデート', 'パスワード', 'ハードウェア'],
    answer: 'アップデート'
  },
  {
    type: 'audio',
    speak: 'パスワード',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ハードウェア', 'ソフトウェア', 'アップデート', 'パスワード'],
    answer: 'パスワード'
  },
  {
    type: 'audio',
    speak: 'アカウント',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アカウント', 'パスワード', 'ソフトウェア', 'ハードウェア'],
    answer: 'アカウント'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ソフトウェア',
    image: '../../../media/a2/technology/software.png',
    meaning: 'نرم‌افزار'
  },
  {
    type: 'speak',
    word: 'ハードウェア',
    image: '../../../media/a2/technology/hardware.png',
    meaning: 'سخت‌افزار'
  },
  {
    type: 'speak',
    word: 'アップデート',
    image: '../../../media/a2/technology/update.png',
    meaning: 'به‌روزرسانی'
  },
  {
    type: 'speak',
    word: 'パスワード',
    image: '../../../media/a2/technology/password.png',
    meaning: 'رمز عبور'
  },
  {
    type: 'speak',
    word: 'アカウント',
    image: '../../../media/a2/technology/account.png',
    meaning: 'حساب کاربری'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ソフトウェアをインストールします',
    question: 'جمله ژاپنی را بساز:',
    text: 'نرم‌افزار نصب می‌کنم',
    words: ['ます', 'インストール', 'を', 'ソフトウェア'],
    answer: ['ソフトウェア', 'を', 'インストール', 'します']
  },
  {
    type: 'build-it',
    speak: 'ハードウェアを交換します',
    question: 'جمله ژاپنی را بساز:',
    text: 'سخت‌افزار تعویض می‌کنم',
    words: ['ます', '交換', 'を', 'ハードウェア'],
    answer: ['ハードウェア', 'を', '交換', 'します']
  },
  {
    type: 'build-it',
    speak: 'アップデートをします',
    question: 'جمله ژاپنی را بساز:',
    text: 'به‌روزرسانی انجام می‌دهم',
    words: ['ます', 'し', 'を', 'アップデート'],
    answer: ['アップデート', 'を', 'し', 'ます']
  },
  {
    type: 'build-it',
    speak: 'パスワードを変更します',
    question: 'جمله ژاپنی را بساز:',
    text: 'رمز عبور را تغییر می‌دهم',
    words: ['ます', '変更', 'を', 'パスワード'],
    answer: ['パスワード', 'を', '変更', 'します']
  },
  {
    type: 'build-it',
    speak: 'アカウントを作ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'حساب کاربری می‌سازم',
    words: ['ます', '作り', 'を', 'アカウント'],
    answer: ['アカウント', 'を', '作り', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ソフトウェアをインストールします',
    question: 'ترجمه را بساز:',
    text: 'ソフトウェアをインストールします',
    words: ['نرم‌افزار', 'نصب', 'می‌کنم'],
    answer: ['نرم‌افزار', 'نصب', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ハードウェアを交換します',
    question: 'ترجمه را بساز:',
    text: 'ハードウェアを交換します',
    words: ['سخت‌افزار', 'تعویض', 'می‌کنم'],
    answer: ['سخت‌افزار', 'تعویض', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'アップデートをします',
    question: 'ترجمه را بساز:',
    text: 'アップデートをします',
    words: ['به‌روزرسانی', 'انجام', 'می‌دهم'],
    answer: ['به‌روزرسانی', 'انجام', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: 'パスワードを変更します',
    question: 'ترجمه را بساز:',
    text: 'パスワードを変更します',
    words: ['رمز عبور', 'را', 'تغییر', 'می‌دهم'],
    answer: ['رمز عبور', 'را', 'تغییر', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: 'アカウントを作ります',
    question: 'ترجمه را بساز:',
    text: 'アカウントを作ります',
    words: ['حساب کاربری', 'می‌سازم'],
    answer: ['حساب کاربری', 'می‌سازم']
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