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

// ===== سوالات درس ۶ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "소파" است؟',
    speak: '소파',
    options: [
      { text: '소파', image: '../../../media/a2/house/sofa.png' },
      { text: '냉장고', image: '../../../media/a2/house/fridge.png' },
      { text: '옷장', image: '../../../media/a2/house/wardrobe.png' },
      { text: '거울', image: '../../../media/a2/house/mirror.png' }
    ],
    answer: '소파'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "냉장고" است؟',
    speak: '냉장고',
    options: [
      { text: '책장', image: '../../../media/a2/house/shelf.png' },
      { text: '냉장고', image: '../../../media/a2/house/fridge.png' },
      { text: '소파', image: '../../../media/a2/house/sofa.png' },
      { text: '옷장', image: '../../../media/a2/house/wardrobe.png' }
    ],
    answer: '냉장고'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "옷장" است؟',
    speak: '옷장',
    options: [
      { text: '소파', image: '../../../media/a2/house/sofa.png' },
      { text: '옷장', image: '../../../media/a2/house/wardrobe.png' },
      { text: '거울', image: '../../../media/a2/house/mirror.png' },
      { text: '냉장고', image: '../../../media/a2/house/fridge.png' }
    ],
    answer: '옷장'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "거울" است؟',
    speak: '거울',
    options: [
      { text: '냉장고', image: '../../../media/a2/house/fridge.png' },
      { text: '소파', image: '../../../media/a2/house/sofa.png' },
      { text: '옷장', image: '../../../media/a2/house/wardrobe.png' },
      { text: '거울', image: '../../../media/a2/house/mirror.png' }
    ],
    answer: '거울'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "책장" است؟',
    speak: '책장',
    options: [
      { text: '책장', image: '../../../media/a2/house/shelf.png' },
      { text: '거울', image: '../../../media/a2/house/mirror.png' },
      { text: '소파', image: '../../../media/a2/house/sofa.png' },
      { text: '냉장고', image: '../../../media/a2/house/fridge.png' }
    ],
    answer: '책장'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/sofa.png',
    options: ['소파', '냉장고', '옷장', '거울'],
    answer: '소파'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/fridge.png',
    options: ['소파', '냉장고', '옷장', '책장'],
    answer: '냉장고'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/wardrobe.png',
    options: ['책장', '소파', '옷장', '냉장고'],
    answer: '옷장'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/mirror.png',
    options: ['옷장', '냉장고', '거울', '소파'],
    answer: '거울'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/shelf.png',
    options: ['소파', '거울', '냉장고', '책장'],
    answer: '책장'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '소파',
    question: 'کدام کلمه را شنیدی؟',
    options: ['소파', '냉장고', '옷장', '거울'],
    answer: '소파'
  },
  {
    type: 'audio',
    speak: '냉장고',
    question: 'کدام کلمه را شنیدی؟',
    options: ['책장', '냉장고', '소파', '옷장'],
    answer: '냉장고'
  },
  {
    type: 'audio',
    speak: '옷장',
    question: 'کدام کلمه را شنیدی؟',
    options: ['소파', '옷장', '거울', '냉장고'],
    answer: '옷장'
  },
  {
    type: 'audio',
    speak: '거울',
    question: 'کدام کلمه را شنیدی؟',
    options: ['냉장고', '소파', '옷장', '거울'],
    answer: '거울'
  },
  {
    type: 'audio',
    speak: '책장',
    question: 'کدام کلمه را شنیدی؟',
    options: ['책장', '거울', '소파', '냉장고'],
    answer: '책장'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '소파',
    image: '../../../media/a2/house/sofa.png',
    meaning: 'مبل'
  },
  {
    type: 'speak',
    word: '냉장고',
    image: '../../../media/a2/house/fridge.png',
    meaning: 'یخچال'
  },
  {
    type: 'speak',
    word: '옷장',
    image: '../../../media/a2/house/wardrobe.png',
    meaning: 'کمد لباس'
  },
  {
    type: 'speak',
    word: '거울',
    image: '../../../media/a2/house/mirror.png',
    meaning: 'آینه'
  },
  {
    type: 'speak',
    word: '책장',
    image: '../../../media/a2/house/shelf.png',
    meaning: 'قفسه کتاب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '방에 소파가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در اتاق مبل وجود دارد',
    words: ['있습니다', '가', '소파', '방에'],
    answer: ['방에', '소파가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '부엌에 냉장고가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در آشپزخانه یخچال وجود دارد',
    words: ['있습니다', '가', '냉장고', '부엌에'],
    answer: ['부엌에', '냉장고가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '제 방에 옷장이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در اتاق من کمد لباس وجود دارد',
    words: ['있습니다', '이', '옷장', '제 방에'],
    answer: ['제 방에', '옷장이', '있습니다']
  },
  {
    type: 'build-it',
    speak: '벽에 거울이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی دیوار آینه وجود دارد',
    words: ['있습니다', '이', '거울', '벽에'],
    answer: ['벽에', '거울이', '있습니다']
  },
  {
    type: 'build-it',
    speak: '책장에 책이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'روی قفسه کتاب کتاب وجود دارد',
    words: ['있습니다', '이', '책', '책장에'],
    answer: ['책장에', '책이', '있습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '방에 소파가 있습니다',
    question: 'ترجمه را بساز:',
    text: '방에 소파가 있습니다',
    words: ['در', 'اتاق', 'مبل', 'وجود دارد'],
    answer: ['در', 'اتاق', 'مبل', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '부엌에 냉장고가 있습니다',
    question: 'ترجمه را بساز:',
    text: '부엌에 냉장고가 있습니다',
    words: ['در', 'آشپزخانه', 'یخچال', 'وجود دارد'],
    answer: ['در', 'آشپزخانه', 'یخچال', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '제 방에 옷장이 있습니다',
    question: 'ترجمه را بساز:',
    text: '제 방에 옷장이 있습니다',
    words: ['در', 'اتاق من', 'کمد لباس', 'وجود دارد'],
    answer: ['در', 'اتاق من', 'کمد لباس', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '벽에 거울이 있습니다',
    question: 'ترجمه را بساز:',
    text: '벽에 거울이 있습니다',
    words: ['روی', 'دیوار', 'آینه', 'وجود دارد'],
    answer: ['روی', 'دیوار', 'آینه', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '책장에 책이 있습니다',
    question: 'ترجمه را بساز:',
    text: '책장에 책이 있습니다',
    words: ['روی', 'قفسه کتاب', 'کتاب', 'وجود دارد'],
    answer: ['روی', 'قفسه کتاب', 'کتاب', 'وجود دارد']
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