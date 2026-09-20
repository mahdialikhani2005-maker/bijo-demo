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

// ===== سوالات درس ۹ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "주전자" است؟',
    speak: '주전자',
    options: [
      { text: '주전자', image: '../../../media/a2/house/kettle.png' },
      { text: '토스터', image: '../../../media/a2/house/toaster.png' },
      { text: '믹서기', image: '../../../media/a2/house/blender.png' },
      { text: '전자레인지', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: '주전자'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "토스터" است؟',
    speak: '토스터',
    options: [
      { text: '식기세척기', image: '../../../media/a2/house/dishwasher.png' },
      { text: '토스터', image: '../../../media/a2/house/toaster.png' },
      { text: '주전자', image: '../../../media/a2/house/kettle.png' },
      { text: '믹서기', image: '../../../media/a2/house/blender.png' }
    ],
    answer: '토스터'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "믹서기" است؟',
    speak: '믹서기',
    options: [
      { text: '주전자', image: '../../../media/a2/house/kettle.png' },
      { text: '믹서기', image: '../../../media/a2/house/blender.png' },
      { text: '전자레인지', image: '../../../media/a2/house/microwave.png' },
      { text: '토스터', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: '믹서기'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "전자레인지" است؟',
    speak: '전자레인지',
    options: [
      { text: '토스터', image: '../../../media/a2/house/toaster.png' },
      { text: '주전자', image: '../../../media/a2/house/kettle.png' },
      { text: '믹서기', image: '../../../media/a2/house/blender.png' },
      { text: '전자레인지', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: '전자레인지'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "식기세척기" است؟',
    speak: '식기세척기',
    options: [
      { text: '식기세척기', image: '../../../media/a2/house/dishwasher.png' },
      { text: '전자레인지', image: '../../../media/a2/house/microwave.png' },
      { text: '주전자', image: '../../../media/a2/house/kettle.png' },
      { text: '토스터', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: '식기세척기'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/kettle.png',
    options: ['주전자', '토스터', '믹서기', '전자레인지'],
    answer: '주전자'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/toaster.png',
    options: ['주전자', '토스터', '믹서기', '식기세척기'],
    answer: '토스터'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blender.png',
    options: ['식기세척기', '주전자', '믹서기', '토스터'],
    answer: '믹서기'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/microwave.png',
    options: ['믹서기', '토스터', '전자레인지', '주전자'],
    answer: '전자레인지'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/dishwasher.png',
    options: ['주전자', '전자레인지', '토스터', '식기세척기'],
    answer: '식기세척기'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '주전자',
    question: 'کدام کلمه را شنیدی؟',
    options: ['주전자', '토스터', '믹서기', '전자레인지'],
    answer: '주전자'
  },
  {
    type: 'audio',
    speak: '토스터',
    question: 'کدام کلمه را شنیدی؟',
    options: ['식기세척기', '토스터', '주전자', '믹서기'],
    answer: '토스터'
  },
  {
    type: 'audio',
    speak: '믹서기',
    question: 'کدام کلمه را شنیدی؟',
    options: ['주전자', '믹서기', '전자레인지', '토스터'],
    answer: '믹서기'
  },
  {
    type: 'audio',
    speak: '전자레인지',
    question: 'کدام کلمه را شنیدی؟',
    options: ['토스터', '주전자', '믹서기', '전자레인지'],
    answer: '전자레인지'
  },
  {
    type: 'audio',
    speak: '식기세척기',
    question: 'کدام کلمه را شنیدی؟',
    options: ['식기세척기', '전자레인지', '주전자', '토스터'],
    answer: '식기세척기'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '주전자',
    image: '../../../media/a2/house/kettle.png',
    meaning: 'کتری'
  },
  {
    type: 'speak',
    word: '토스터',
    image: '../../../media/a2/house/toaster.png',
    meaning: 'توستر'
  },
  {
    type: 'speak',
    word: '믹서기',
    image: '../../../media/a2/house/blender.png',
    meaning: 'مخلوط‌کن'
  },
  {
    type: 'speak',
    word: '전자레인지',
    image: '../../../media/a2/house/microwave.png',
    meaning: 'مایکروویو'
  },
  {
    type: 'speak',
    word: '식기세척기',
    image: '../../../media/a2/house/dishwasher.png',
    meaning: 'ماشین ظرفشویی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '부엌에 주전자가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در آشپزخانه کتری وجود دارد',
    words: ['있습니다', '가', '주전자', '부엌에'],
    answer: ['부엌에', '주전자가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '토스터는 편리합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'توستر کاربردی است',
    words: ['편리합니다', '은', '토스터'],
    answer: ['토스터는', '편리합니다']
  },
  {
    type: 'build-it',
    speak: '믹서기를 사용합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'مخلوط‌کن استفاده می‌کنم',
    words: ['사용합니다', '을', '믹서기'],
    answer: ['믹서기를', '사용합니다']
  },
  {
    type: 'build-it',
    speak: '전자레인지로 데웁니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با مایکروویو گرم می‌کنم',
    words: ['데웁니다', '로', '전자레인지'],
    answer: ['전자레인지로', '데웁니다']
  },
  {
    type: 'build-it',
    speak: '식기세척기는 조용합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ماشین ظرفشویی بی‌صدا است',
    words: ['조용합니다', '은', '식기세척기'],
    answer: ['식기세척기는', '조용합니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '부엌에 주전자가 있습니다',
    question: 'ترجمه را بساز:',
    text: '부엌에 주전자가 있습니다',
    words: ['در', 'آشپزخانه', 'کتری', 'وجود دارد'],
    answer: ['در', 'آشپزخانه', 'کتری', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '토스터는 편리합니다',
    question: 'ترجمه را بساز:',
    text: '토스터는 편리합니다',
    words: ['توستر', 'کاربردی', 'است'],
    answer: ['توستر', 'کاربردی', 'است']
  },
  {
    type: 'build-fa',
    speak: '믹서기를 사용합니다',
    question: 'ترجمه را بساز:',
    text: '믹서기를 사용합니다',
    words: ['مخلوط‌کن', 'استفاده', 'می‌کنم'],
    answer: ['مخلوط‌کن', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '전자레인지로 데웁니다',
    question: 'ترجمه را بساز:',
    text: '전자레인지로 데웁니다',
    words: ['با', 'مایکروویو', 'گرم', 'می‌کنم'],
    answer: ['با', 'مایکروویو', 'گرم', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '식기세척기는 조용합니다',
    question: 'ترجمه را بساز:',
    text: '식기세척기는 조용합니다',
    words: ['ماشین ظرفشویی', 'بی‌صدا', 'است'],
    answer: ['ماشین ظرفشویی', 'بی‌صدا', 'است']
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