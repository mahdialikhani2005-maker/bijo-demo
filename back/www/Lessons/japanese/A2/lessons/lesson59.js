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

// ===== سوالات درس ۵۹ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ダウンロード" است؟',
    speak: 'ダウンロード',
    options: [
      { text: 'ダウンロード', image: '../../../media/a2/technology/download.png' },
      { text: 'アップロード', image: '../../../media/a2/technology/upload.png' },
      { text: 'ストリーミング', image: '../../../media/a2/technology/stream.png' },
      { text: 'ビデオ', image: '../../../media/a2/technology/video.png' }
    ],
    answer: 'ダウンロード'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "アップロード" است؟',
    speak: 'アップロード',
    options: [
      { text: 'オーディオ', image: '../../../media/a2/technology/audio.png' },
      { text: 'アップロード', image: '../../../media/a2/technology/upload.png' },
      { text: 'ダウンロード', image: '../../../media/a2/technology/download.png' },
      { text: 'ストリーミング', image: '../../../media/a2/technology/stream.png' }
    ],
    answer: 'アップロード'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ストリーミング" است؟',
    speak: 'ストリーミング',
    options: [
      { text: 'ダウンロード', image: '../../../media/a2/technology/download.png' },
      { text: 'ストリーミング', image: '../../../media/a2/technology/stream.png' },
      { text: 'ビデオ', image: '../../../media/a2/technology/video.png' },
      { text: 'アップロード', image: '../../../media/a2/technology/upload.png' }
    ],
    answer: 'ストリーミング'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ビデオ" است؟',
    speak: 'ビデオ',
    options: [
      { text: 'アップロード', image: '../../../media/a2/technology/upload.png' },
      { text: 'ダウンロード', image: '../../../media/a2/technology/download.png' },
      { text: 'ストリーミング', image: '../../../media/a2/technology/stream.png' },
      { text: 'ビデオ', image: '../../../media/a2/technology/video.png' }
    ],
    answer: 'ビデオ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "オーディオ" است؟',
    speak: 'オーディオ',
    options: [
      { text: 'オーディオ', image: '../../../media/a2/technology/audio.png' },
      { text: 'ビデオ', image: '../../../media/a2/technology/video.png' },
      { text: 'ダウンロード', image: '../../../media/a2/technology/download.png' },
      { text: 'アップロード', image: '../../../media/a2/technology/upload.png' }
    ],
    answer: 'オーディオ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/download.png',
    options: ['ダウンロード', 'アップロード', 'ストリーミング', 'ビデオ'],
    answer: 'ダウンロード'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/upload.png',
    options: ['ダウンロード', 'アップロード', 'ストリーミング', 'オーディオ'],
    answer: 'アップロード'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/stream.png',
    options: ['オーディオ', 'ダウンロード', 'ストリーミング', 'アップロード'],
    answer: 'ストリーミング'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/video.png',
    options: ['ストリーミング', 'アップロード', 'ビデオ', 'ダウンロード'],
    answer: 'ビデオ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/audio.png',
    options: ['ダウンロード', 'ビデオ', 'アップロード', 'オーディオ'],
    answer: 'オーディオ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ダウンロード',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ダウンロード', 'アップロード', 'ストリーミング', 'ビデオ'],
    answer: 'ダウンロード'
  },
  {
    type: 'audio',
    speak: 'アップロード',
    question: 'کدام کلمه را شنیدی؟',
    options: ['オーディオ', 'アップロード', 'ダウンロード', 'ストリーミング'],
    answer: 'アップロード'
  },
  {
    type: 'audio',
    speak: 'ストリーミング',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ダウンロード', 'ストリーミング', 'ビデオ', 'アップロード'],
    answer: 'ストリーミング'
  },
  {
    type: 'audio',
    speak: 'ビデオ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['アップロード', 'ダウンロード', 'ストリーミング', 'ビデオ'],
    answer: 'ビデオ'
  },
  {
    type: 'audio',
    speak: 'オーディオ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['オーディオ', 'ビデオ', 'ダウンロード', 'アップロード'],
    answer: 'オーディオ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ダウンロード',
    image: '../../../media/a2/technology/download.png',
    meaning: 'دانلود'
  },
  {
    type: 'speak',
    word: 'アップロード',
    image: '../../../media/a2/technology/upload.png',
    meaning: 'آپلود'
  },
  {
    type: 'speak',
    word: 'ストリーミング',
    image: '../../../media/a2/technology/stream.png',
    meaning: 'پخش زنده'
  },
  {
    type: 'speak',
    word: 'ビデオ',
    image: '../../../media/a2/technology/video.png',
    meaning: 'ویدیو'
  },
  {
    type: 'speak',
    word: 'オーディオ',
    image: '../../../media/a2/technology/audio.png',
    meaning: 'صوت'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'ファイルをダウンロードします',
    question: 'جمله ژاپنی را بساز:',
    text: 'فایل را دانلود می‌کنم',
    words: ['ます', 'ダウンロード', 'を', 'ファイル'],
    answer: ['ファイル', 'を', 'ダウンロード', 'します']
  },
  {
    type: 'build-it',
    speak: '写真をアップロードします',
    question: 'جمله ژاپنی را بساز:',
    text: 'عکس را آپلود می‌کنم',
    words: ['ます', 'アップロード', 'を', '写真'],
    answer: ['写真', 'を', 'アップロード', 'します']
  },
  {
    type: 'build-it',
    speak: 'ストリーミングで見ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'با پخش زنده تماشا می‌کنم',
    words: ['ます', '見', 'で', 'ストリーミング'],
    answer: ['ストリーミング', 'で', '見', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ビデオを撮ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'ویدیو ضبط می‌کنم',
    words: ['ます', '撮り', 'を', 'ビデオ'],
    answer: ['ビデオ', 'を', '撮り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'オーディオを聞きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'صوت گوش می‌دهم',
    words: ['ます', '聞き', 'を', 'オーディオ'],
    answer: ['オーディオ', 'を', '聞き', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'ファイルをダウンロードします',
    question: 'ترجمه را بساز:',
    text: 'ファイルをダウンロードします',
    words: ['فایل', 'را', 'دانلود', 'می‌کنم'],
    answer: ['فایل', 'را', 'دانلود', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '写真をアップロードします',
    question: 'ترجمه را بساز:',
    text: '写真をアップロードします',
    words: ['عکس', 'را', 'آپلود', 'می‌کنم'],
    answer: ['عکس', 'را', 'آپلود', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ストリーミングで見ます',
    question: 'ترجمه را بساز:',
    text: 'ストリーミングで見ます',
    words: ['با', 'پخش زنده', 'تماشا', 'می‌کنم'],
    answer: ['با', 'پخش زنده', 'تماشا', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ビデオを撮ります',
    question: 'ترجمه را بساز:',
    text: 'ビデオを撮ります',
    words: ['ویدیو', 'ضبط', 'می‌کنم'],
    answer: ['ویدیو', 'ضبط', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'オーディオを聞きます',
    question: 'ترجمه را بساز:',
    text: 'オーディオを聞きます',
    words: ['صوت', 'گوش', 'می‌دهم'],
    answer: ['صوت', 'گوش', 'می‌دهم']
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