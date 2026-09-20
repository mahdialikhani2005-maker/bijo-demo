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

// ===== سوالات درس ۵۷ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "がめん" است؟',
    speak: 'がめん',
    options: [
      { text: 'がめん', image: '../../../media/a2/technology/screen.png' },
      { text: 'モニター', image: '../../../media/a2/technology/monitor.png' },
      { text: 'プリンター', image: '../../../media/a2/technology/printer.png' },
      { text: 'スピーカー', image: '../../../media/a2/technology/speaker.png' }
    ],
    answer: 'がめん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "モニター" است؟',
    speak: 'モニター',
    options: [
      { text: 'スキャナー', image: '../../../media/a2/technology/scanner.png' },
      { text: 'モニター', image: '../../../media/a2/technology/monitor.png' },
      { text: 'がめん', image: '../../../media/a2/technology/screen.png' },
      { text: 'プリンター', image: '../../../media/a2/technology/printer.png' }
    ],
    answer: 'モニター'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "プリンター" است؟',
    speak: 'プリンター',
    options: [
      { text: 'がめん', image: '../../../media/a2/technology/screen.png' },
      { text: 'プリンター', image: '../../../media/a2/technology/printer.png' },
      { text: 'スピーカー', image: '../../../media/a2/technology/speaker.png' },
      { text: 'モニター', image: '../../../media/a2/technology/monitor.png' }
    ],
    answer: 'プリンター'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "スキャナー" است؟',
    speak: 'スキャナー',
    options: [
      { text: 'モニター', image: '../../../media/a2/technology/monitor.png' },
      { text: 'がめん', image: '../../../media/a2/technology/screen.png' },
      { text: 'プリンター', image: '../../../media/a2/technology/printer.png' },
      { text: 'スキャナー', image: '../../../media/a2/technology/scanner.png' }
    ],
    answer: 'スキャナー'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "スピーカー" است؟',
    speak: 'スピーカー',
    options: [
      { text: 'スピーカー', image: '../../../media/a2/technology/speaker.png' },
      { text: 'スキャナー', image: '../../../media/a2/technology/scanner.png' },
      { text: 'がめん', image: '../../../media/a2/technology/screen.png' },
      { text: 'モニター', image: '../../../media/a2/technology/monitor.png' }
    ],
    answer: 'スピーカー'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/screen.png',
    options: ['がめん', 'モニター', 'プリンター', 'スキャナー'],
    answer: 'がめん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/monitor.png',
    options: ['がめん', 'モニター', 'プリンター', 'スピーカー'],
    answer: 'モニター'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/printer.png',
    options: ['スピーカー', 'がめん', 'プリンター', 'モニター'],
    answer: 'プリンター'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/scanner.png',
    options: ['プリンター', 'モニター', 'スキャナー', 'がめん'],
    answer: 'スキャナー'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/speaker.png',
    options: ['がめん', 'スキャナー', 'モニター', 'スピーカー'],
    answer: 'スピーカー'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'がめん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['がめん', 'モニター', 'プリンター', 'スキャナー'],
    answer: 'がめん'
  },
  {
    type: 'audio',
    speak: 'モニター',
    question: 'کدام کلمه را شنیدی؟',
    options: ['スピーカー', 'モニター', 'がめん', 'プリンター'],
    answer: 'モニター'
  },
  {
    type: 'audio',
    speak: 'プリンター',
    question: 'کدام کلمه را شنیدی؟',
    options: ['がめん', 'プリンター', 'スキャナー', 'モニター'],
    answer: 'プリンター'
  },
  {
    type: 'audio',
    speak: 'スキャナー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['モニター', 'がめん', 'プリンター', 'スキャナー'],
    answer: 'スキャナー'
  },
  {
    type: 'audio',
    speak: 'スピーカー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['スピーカー', 'スキャナー', 'がめん', 'モニター'],
    answer: 'スピーカー'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'がめん',
    image: '../../../media/a2/technology/screen.png',
    meaning: 'صفحه نمایش'
  },
  {
    type: 'speak',
    word: 'モニター',
    image: '../../../media/a2/technology/monitor.png',
    meaning: 'مانیتور'
  },
  {
    type: 'speak',
    word: 'プリンター',
    image: '../../../media/a2/technology/printer.png',
    meaning: 'چاپگر'
  },
  {
    type: 'speak',
    word: 'スキャナー',
    image: '../../../media/a2/technology/scanner.png',
    meaning: 'اسکنر'
  },
  {
    type: 'speak',
    word: 'スピーカー',
    image: '../../../media/a2/technology/speaker.png',
    meaning: 'بلندگو'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'がめんを見ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'صفحه نمایش را می‌بینم',
    words: ['ます', '見', 'を', 'がめん'],
    answer: ['がめん', 'を', '見', 'ます']
  },
  {
    type: 'build-it',
    speak: 'モニターが大きいです',
    question: 'جمله ژاپنی را بساز:',
    text: 'مانیتور بزرگ است',
    words: ['です', '大きい', 'が', 'モニター'],
    answer: ['モニター', 'が', '大きい', 'です']
  },
  {
    type: 'build-it',
    speak: 'プリンターで印刷します',
    question: 'جمله ژاپنی را بساز:',
    text: 'با چاپگر پرینت می‌گیرم',
    words: ['ます', '印刷', 'で', 'プリンター'],
    answer: ['プリンター', 'で', '印刷', 'します']
  },
  {
    type: 'build-it',
    speak: 'スキャナーで読み取ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'با اسکنر اسکن می‌کنم',
    words: ['ます', '読み取り', 'で', 'スキャナー'],
    answer: ['スキャナー', 'で', '読み取り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'スピーカーから音が出ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'از بلندگو صدا پخش می‌شود',
    words: ['ます', '出', 'が', '音', 'から', 'スピーカー'],
    answer: ['スピーカー', 'から', '音', 'が', '出', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'がめんを見ます',
    question: 'ترجمه را بساز:',
    text: 'がめんを見ます',
    words: ['صفحه نمایش', 'را', 'می‌بینم'],
    answer: ['صفحه نمایش', 'را', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'モニターが大きいです',
    question: 'ترجمه را بساز:',
    text: 'モニターが大きいです',
    words: ['مانیتور', 'بزرگ', 'است'],
    answer: ['مانیتور', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'プリンターで印刷します',
    question: 'ترجمه را بساز:',
    text: 'プリンターで印刷します',
    words: ['با', 'چاپگر', 'پرینت', 'می‌گیرم'],
    answer: ['با', 'چاپگر', 'پرینت', 'می‌گیرم']
  },
  {
    type: 'build-fa',
    speak: 'スキャナーで読み取ります',
    question: 'ترجمه را بساز:',
    text: 'スキャナーで読み取ります',
    words: ['با', 'اسکنر', 'اسکن', 'می‌کنم'],
    answer: ['با', 'اسکنر', 'اسکن', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'スピーカーから音が出ます',
    question: 'ترجمه را بساز:',
    text: 'スピーカーから音が出ます',
    words: ['از', 'بلندگو', 'صدا', 'پخش', 'می‌شود'],
    answer: ['از', 'بلندگو', 'صدا', 'پخش', 'می‌شود']
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