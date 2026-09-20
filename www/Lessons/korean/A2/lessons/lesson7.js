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

// ===== سوالات درس ۷ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "커튼" است؟',
    speak: '커튼',
    options: [
      { text: '커튼', image: '../../../media/a2/house/curtain.png' },
      { text: '양탄자', image: '../../../media/a2/house/carpet.png' },
      { text: '베개', image: '../../../media/a2/house/pillow.png' },
      { text: '담요', image: '../../../media/a2/house/blanket.png' }
    ],
    answer: '커튼'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "양탄자" است؟',
    speak: '양탄자',
    options: [
      { text: '램프', image: '../../../media/a2/house/lamp.png' },
      { text: '양탄자', image: '../../../media/a2/house/carpet.png' },
      { text: '커튼', image: '../../../media/a2/house/curtain.png' },
      { text: '베개', image: '../../../media/a2/house/pillow.png' }
    ],
    answer: '양탄자'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "베개" است؟',
    speak: '베개',
    options: [
      { text: '커튼', image: '../../../media/a2/house/curtain.png' },
      { text: '베개', image: '../../../media/a2/house/pillow.png' },
      { text: '담요', image: '../../../media/a2/house/blanket.png' },
      { text: '양탄자', image: '../../../media/a2/house/carpet.png' }
    ],
    answer: '베개'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "담요" است؟',
    speak: '담요',
    options: [
      { text: '양탄자', image: '../../../media/a2/house/carpet.png' },
      { text: '커튼', image: '../../../media/a2/house/curtain.png' },
      { text: '베개', image: '../../../media/a2/house/pillow.png' },
      { text: '담요', image: '../../../media/a2/house/blanket.png' }
    ],
    answer: '담요'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "램프" است؟',
    speak: '램프',
    options: [
      { text: '램프', image: '../../../media/a2/house/lamp.png' },
      { text: '담요', image: '../../../media/a2/house/blanket.png' },
      { text: '커튼', image: '../../../media/a2/house/curtain.png' },
      { text: '양탄자', image: '../../../media/a2/house/carpet.png' }
    ],
    answer: '램프'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/curtain.png',
    options: ['커튼', '양탄자', '베개', '담요'],
    answer: '커튼'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/carpet.png',
    options: ['커튼', '양탄자', '베개', '램프'],
    answer: '양탄자'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/pillow.png',
    options: ['램프', '커튼', '베개', '양탄자'],
    answer: '베개'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blanket.png',
    options: ['베개', '양탄자', '담요', '커튼'],
    answer: '담요'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/lamp.png',
    options: ['커튼', '담요', '양탄자', '램프'],
    answer: '램프'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '커튼',
    question: 'کدام کلمه را شنیدی؟',
    options: ['커튼', '양탄자', '베개', '담요'],
    answer: '커튼'
  },
  {
    type: 'audio',
    speak: '양탄자',
    question: 'کدام کلمه را شنیدی؟',
    options: ['램프', '양탄자', '커튼', '베개'],
    answer: '양탄자'
  },
  {
    type: 'audio',
    speak: '베개',
    question: 'کدام کلمه را شنیدی؟',
    options: ['커튼', '베개', '담요', '양탄자'],
    answer: '베개'
  },
  {
    type: 'audio',
    speak: '담요',
    question: 'کدام کلمه را شنیدی؟',
    options: ['양탄자', '커튼', '베개', '담요'],
    answer: '담요'
  },
  {
    type: 'audio',
    speak: '램프',
    question: 'کدام کلمه را شنیدی؟',
    options: ['램프', '담요', '커튼', '양탄자'],
    answer: '램프'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '커튼',
    image: '../../../media/a2/house/curtain.png',
    meaning: 'پرده'
  },
  {
    type: 'speak',
    word: '양탄자',
    image: '../../../media/a2/house/carpet.png',
    meaning: 'فرش'
  },
  {
    type: 'speak',
    word: '베개',
    image: '../../../media/a2/house/pillow.png',
    meaning: 'بالش'
  },
  {
    type: 'speak',
    word: '담요',
    image: '../../../media/a2/house/blanket.png',
    meaning: 'پتو'
  },
  {
    type: 'speak',
    word: '램프',
    image: '../../../media/a2/house/lamp.png',
    meaning: 'چراغ'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '창문에 커튼이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی پنجره پرده وجود دارد',
    words: ['있습니다', '이', '커튼', '창문에'],
    answer: ['창문에', '커튼이', '있습니다']
  },
  {
    type: 'build-it',
    speak: '바닥에 양탄자가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی زمین فرش وجود دارد',
    words: ['있습니다', '가', '양탄자', '바닥에'],
    answer: ['바닥에', '양탄자가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '침대에 베개가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی تخت بالش وجود دارد',
    words: ['있습니다', '가', '베개', '침대에'],
    answer: ['침대에', '베개가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '침대에 담요가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی تخت پتو وجود دارد',
    words: ['있습니다', '가', '담요', '침대에'],
    answer: ['침대에', '담요가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '책상에 램프가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی میز چراغ وجود دارد',
    words: ['있습니다', '가', '램프', '책상에'],
    answer: ['책상에', '램프가', '있습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '창문에 커튼이 있습니다',
    question: 'ترجمه را بساز:',
    text: '창문에 커튼이 있습니다',
    words: ['روی', 'پنجره', 'پرده', 'وجود دارد'],
    answer: ['روی', 'پنجره', 'پرده', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '바닥에 양탄자가 있습니다',
    question: 'ترجمه را بساز:',
    text: '바닥에 양탄자가 있습니다',
    words: ['روی', 'زمین', 'فرش', 'وجود دارد'],
    answer: ['روی', 'زمین', 'فرش', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '침대에 베개가 있습니다',
    question: 'ترجمه را بساز:',
    text: '침대에 베개가 있습니다',
    words: ['روی', 'تخت', 'بالش', 'وجود دارد'],
    answer: ['روی', 'تخت', 'بالش', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '침대에 담요가 있습니다',
    question: 'ترجمه را بساز:',
    text: '침대에 담요가 있습니다',
    words: ['روی', 'تخت', 'پتو', 'وجود دارد'],
    answer: ['روی', 'تخت', 'پتو', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '책상에 램프가 있습니다',
    question: 'ترجمه را بساز:',
    text: '책상에 램프가 있습니다',
    words: ['روی', 'میز', 'چراغ', 'وجود دارد'],
    answer: ['روی', 'میز', 'چراغ', 'وجود دارد']
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