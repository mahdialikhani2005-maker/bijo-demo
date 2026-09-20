let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
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
  recognition.lang = 'ko-KR';
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

// ===== سوالات درس ۳۳ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "잠수함" است؟',
    speak: '잠수함',
    options: [
      { text: '잠수함', image: '../../../media/a2/vehicles/submarine.png' },
      { text: '페리', image: '../../../media/a2/vehicles/ferry.png' },
      { text: '요트', image: '../../../media/a2/vehicles/yacht.png' },
      { text: '카누', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: '잠수함'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "페리" است؟',
    speak: '페리',
    options: [
      { text: '뗏목', image: '../../../media/a2/vehicles/raft.png' },
      { text: '페리', image: '../../../media/a2/vehicles/ferry.png' },
      { text: '잠수함', image: '../../../media/a2/vehicles/submarine.png' },
      { text: '요트', image: '../../../media/a2/vehicles/yacht.png' }
    ],
    answer: '페리'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "요트" است؟',
    speak: '요트',
    options: [
      { text: '잠수함', image: '../../../media/a2/vehicles/submarine.png' },
      { text: '요트', image: '../../../media/a2/vehicles/yacht.png' },
      { text: '카누', image: '../../../media/a2/vehicles/canoe.png' },
      { text: '페리', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: '요트'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "카누" است؟',
    speak: '카누',
    options: [
      { text: '페리', image: '../../../media/a2/vehicles/ferry.png' },
      { text: '잠수함', image: '../../../media/a2/vehicles/submarine.png' },
      { text: '요트', image: '../../../media/a2/vehicles/yacht.png' },
      { text: '카누', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: '카누'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "뗏목" است؟',
    speak: '뗏목',
    options: [
      { text: '뗏목', image: '../../../media/a2/vehicles/raft.png' },
      { text: '카누', image: '../../../media/a2/vehicles/canoe.png' },
      { text: '잠수함', image: '../../../media/a2/vehicles/submarine.png' },
      { text: '페리', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: '뗏목'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/submarine.png',
    options: ['잠수함', '페리', '요트', '카누'],
    answer: '잠수함'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ferry.png',
    options: ['잠수함', '페리', '요트', '뗏목'],
    answer: '페리'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/yacht.png',
    options: ['뗏목', '잠수함', '요트', '페리'],
    answer: '요트'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/canoe.png',
    options: ['요트', '페리', '카누', '잠수함'],
    answer: '카누'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/raft.png',
    options: ['잠수함', '카누', '페리', '뗏목'],
    answer: '뗏목'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '잠수함',
    question: 'کدام کلمه را شنیدی؟',
    options: ['잠수함', '페리', '요트', '카누'],
    answer: '잠수함'
  },
  {
    type: 'audio',
    speak: '페리',
    question: 'کدام کلمه را شنیدی؟',
    options: ['뗏목', '페리', '잠수함', '요트'],
    answer: '페리'
  },
  {
    type: 'audio',
    speak: '요트',
    question: 'کدام کلمه را شنیدی؟',
    options: ['잠수함', '요트', '카누', '페리'],
    answer: '요트'
  },
  {
    type: 'audio',
    speak: '카누',
    question: 'کدام کلمه را شنیدی؟',
    options: ['페리', '잠수함', '요트', '카누'],
    answer: '카누'
  },
  {
    type: 'audio',
    speak: '뗏목',
    question: 'کدام کلمه را شنیدی؟',
    options: ['뗏목', '카누', '잠수함', '페리'],
    answer: '뗏목'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '잠수함',
    image: '../../../media/a2/vehicles/submarine.png',
    meaning: 'زیردریایی'
  },
  {
    type: 'speak',
    word: '페리',
    image: '../../../media/a2/vehicles/ferry.png',
    meaning: 'کشتی'
  },
  {
    type: 'speak',
    word: '요트',
    image: '../../../media/a2/vehicles/yacht.png',
    meaning: 'قایق تفریحی'
  },
  {
    type: 'speak',
    word: '카누',
    image: '../../../media/a2/vehicles/canoe.png',
    meaning: 'کانو'
  },
  {
    type: 'speak',
    word: '뗏목',
    image: '../../../media/a2/vehicles/raft.png',
    meaning: 'قایق بادی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '잠수함은 바다에 잠깁니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'زیردریایی در دریا شیرجه می‌زند',
    words: ['잠깁니다', '에', '바다', '은', '잠수함'],
    answer: ['잠수함은', '바다에', '잠깁니다']
  },
  {
    type: 'build-it',
    speak: '페리로 섬에 갑니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با کشتی به جزیره می‌روم',
    words: ['갑니다', '에', '섬', '로', '페리'],
    answer: ['페리로', '섬에', '갑니다']
  },
  {
    type: 'build-it',
    speak: '요트로 항해합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با قایق تفریحی دریانوردی می‌کنم',
    words: ['항해합니다', '로', '요트'],
    answer: ['요트로', '항해합니다']
  },
  {
    type: 'build-it',
    speak: '카누를 저어요',
    question: 'جمله کره‌ای را بساز:',
    text: 'کانو پارو می‌زنم',
    words: ['저어요', '를', '카누'],
    answer: ['카누를', '저어요']
  },
  {
    type: 'build-it',
    speak: '뗏목으로 강을 건넙니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با قایق بادی از رودخانه عبور می‌کنم',
    words: ['건넙니다', '을', '강', '으로', '뗏목'],
    answer: ['뗏목으로', '강을', '건넙니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '잠수함은 바다에 잠깁니다',
    question: 'ترجمه را بساز:',
    text: '잠수함은 바다에 잠깁니다',
    words: ['زیردریایی', 'در', 'دریا', 'شیرجه', 'می‌زند'],
    answer: ['زیردریایی', 'در', 'دریا', 'شیرجه', 'می‌زند']
  },
  {
    type: 'build-fa',
    speak: '페리로 섬에 갑니다',
    question: 'ترجمه را بساز:',
    text: '페리로 섬에 갑니다',
    words: ['با', 'کشتی', 'به', 'جزیره', 'می‌روم'],
    answer: ['با', 'کشتی', 'به', 'جزیره', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: '요트로 항해합니다',
    question: 'ترجمه را بساز:',
    text: '요트로 항해합니다',
    words: ['با', 'قایق تفریحی', 'دریانوردی', 'می‌کنم'],
    answer: ['با', 'قایق تفریحی', 'دریانوردی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '카누를 저어요',
    question: 'ترجمه را بساز:',
    text: '카누를 저어요',
    words: ['کانو', 'پارو', 'می‌زنم'],
    answer: ['کانو', 'پارو', 'می‌زنم']
  },
  {
    type: 'build-fa',
    speak: '뗏목으로 강을 건넙니다',
    question: 'ترجمه را بساز:',
    text: '뗏목으로 강을 건넙니다',
    words: ['با', 'قایق بادی', 'از', 'رودخانه', 'عبور', 'می‌کنم'],
    answer: ['با', 'قایق بادی', 'از', 'رودخانه', 'عبور', 'می‌کنم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 레슨이 끝났습니다! 🎉</h2>
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