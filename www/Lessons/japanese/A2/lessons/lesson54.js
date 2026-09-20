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

// ===== سوالات درس ۵۴ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "みなと" است؟',
    speak: 'みなと',
    options: [
      { text: 'みなと', image: '../../../media/a2/travel/harbor.png' },
      { text: 'さんばし', image: '../../../media/a2/travel/pier.png' },
      { text: 'ターミナル', image: '../../../media/a2/travel/terminal.png' },
      { text: 'ゲート', image: '../../../media/a2/travel/gate.png' }
    ],
    answer: 'みなと'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "さんばし" است؟',
    speak: 'さんばし',
    options: [
      { text: 'クルー', image: '../../../media/a2/travel/crew.png' },
      { text: 'さんばし', image: '../../../media/a2/travel/pier.png' },
      { text: 'みなと', image: '../../../media/a2/travel/harbor.png' },
      { text: 'ターミナル', image: '../../../media/a2/travel/terminal.png' }
    ],
    answer: 'さんばし'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ターミナル" است؟',
    speak: 'ターミナル',
    options: [
      { text: 'みなと', image: '../../../media/a2/travel/harbor.png' },
      { text: 'ターミナル', image: '../../../media/a2/travel/terminal.png' },
      { text: 'ゲート', image: '../../../media/a2/travel/gate.png' },
      { text: 'さんばし', image: '../../../media/a2/travel/pier.png' }
    ],
    answer: 'ターミナル'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ゲート" است؟',
    speak: 'ゲート',
    options: [
      { text: 'さんばし', image: '../../../media/a2/travel/pier.png' },
      { text: 'みなと', image: '../../../media/a2/travel/harbor.png' },
      { text: 'ターミナル', image: '../../../media/a2/travel/terminal.png' },
      { text: 'ゲート', image: '../../../media/a2/travel/gate.png' }
    ],
    answer: 'ゲート'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "クルー" است؟',
    speak: 'クルー',
    options: [
      { text: 'クルー', image: '../../../media/a2/travel/crew.png' },
      { text: 'ゲート', image: '../../../media/a2/travel/gate.png' },
      { text: 'みなと', image: '../../../media/a2/travel/harbor.png' },
      { text: 'さんばし', image: '../../../media/a2/travel/pier.png' }
    ],
    answer: 'クルー'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/harbor.png',
    options: ['みなと', 'さんばし', 'ターミナル', 'ゲート'],
    answer: 'みなと'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/pier.png',
    options: ['みなと', 'さんばし', 'ターミナル', 'クルー'],
    answer: 'さんばし'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/terminal.png',
    options: ['クルー', 'みなと', 'ターミナル', 'さんばし'],
    answer: 'ターミナル'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/gate.png',
    options: ['ターミナル', 'さんばし', 'ゲート', 'みなと'],
    answer: 'ゲート'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/crew.png',
    options: ['みなと', 'ゲート', 'さんばし', 'クルー'],
    answer: 'クルー'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'みなと',
    question: 'کدام کلمه را شنیدی؟',
    options: ['みなと', 'さんばし', 'ターミナル', 'ゲート'],
    answer: 'みなと'
  },
  {
    type: 'audio',
    speak: 'さんばし',
    question: 'کدام کلمه را شنیدی؟',
    options: ['クルー', 'さんばし', 'みなと', 'ターミナル'],
    answer: 'さんばし'
  },
  {
    type: 'audio',
    speak: 'ターミナル',
    question: 'کدام کلمه را شنیدی؟',
    options: ['みなと', 'ターミナル', 'ゲート', 'さんばし'],
    answer: 'ターミナル'
  },
  {
    type: 'audio',
    speak: 'ゲート',
    question: 'کدام کلمه را شنیدی؟',
    options: ['さんばし', 'みなと', 'ターミナル', 'ゲート'],
    answer: 'ゲート'
  },
  {
    type: 'audio',
    speak: 'クルー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['クルー', 'ゲート', 'みなと', 'さんばし'],
    answer: 'クルー'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'みなと',
    image: '../../../media/a2/travel/harbor.png',
    meaning: 'بندر'
  },
  {
    type: 'speak',
    word: 'さんばし',
    image: '../../../media/a2/travel/pier.png',
    meaning: 'اسکله'
  },
  {
    type: 'speak',
    word: 'ターミナル',
    image: '../../../media/a2/travel/terminal.png',
    meaning: 'ترمینال'
  },
  {
    type: 'speak',
    word: 'ゲート',
    image: '../../../media/a2/travel/gate.png',
    meaning: 'دروازه'
  },
  {
    type: 'speak',
    word: 'クルー',
    image: '../../../media/a2/travel/crew.png',
    meaning: 'خدمه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'みなとに着きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'به بندر می‌رسم',
    words: ['ます', '着き', 'に', 'みなと'],
    answer: ['みなと', 'に', '着き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'さんばしに船が停まっています',
    question: 'جمله ژاپنی را بساز:',
    text: 'کشتی در اسکله پهلو گرفته است',
    words: ['ます', '停まっ', 'が', '船', 'に', 'さんばし'],
    answer: ['さんばし', 'に', '船', 'が', '停まっ', 'ています']
  },
  {
    type: 'build-it',
    speak: 'ターミナルで待ちます',
    question: 'جمله ژاپنی را بساز:',
    text: 'در ترمینال منتظر می‌مانم',
    words: ['ます', '待ち', 'で', 'ターミナル'],
    answer: ['ターミナル', 'で', '待ち', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ゲートを通ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'از دروازه عبور می‌کنم',
    words: ['ます', '通り', 'を', 'ゲート'],
    answer: ['ゲート', 'を', '通り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'クルーが親切です',
    question: 'جمله ژاپنی را بساز:',
    text: 'خدمه مهربان هستند',
    words: ['です', '親切', 'が', 'クルー'],
    answer: ['クルー', 'が', '親切', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'みなとに着きます',
    question: 'ترجمه را بساز:',
    text: 'みなとに着きます',
    words: ['به', 'بندر', 'می‌رسم'],
    answer: ['به', 'بندر', 'می‌رسم']
  },
  {
    type: 'build-fa',
    speak: 'さんばしに船が停まっています',
    question: 'ترجمه را بساز:',
    text: 'さんばしに船が停まっています',
    words: ['کشتی', 'در', 'اسکله', 'پهلو', 'گرفته', 'است'],
    answer: ['کشتی', 'در', 'اسکله', 'پهلو', 'گرفته', 'است']
  },
  {
    type: 'build-fa',
    speak: 'ターミナルで待ちます',
    question: 'ترجمه را بساز:',
    text: 'ターミナルで待ちます',
    words: ['در', 'ترمینال', 'منتظر', 'می‌مانم'],
    answer: ['در', 'ترمینال', 'منتظر', 'می‌مانم']
  },
  {
    type: 'build-fa',
    speak: 'ゲートを通ります',
    question: 'ترجمه را بساز:',
    text: 'ゲートを通ります',
    words: ['از', 'دروازه', 'عبور', 'می‌کنم'],
    answer: ['از', 'دروازه', 'عبور', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'クルーが親切です',
    question: 'ترجمه را بساز:',
    text: 'クルーが親切です',
    words: ['خدمه', 'مهربان', 'هستند'],
    answer: ['خدمه', 'مهربان', 'هستند']
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