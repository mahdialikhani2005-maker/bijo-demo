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

// ===== سوالات درس ۲۶ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "벨트" است؟',
    speak: '벨트',
    options: [
      { text: '벨트', image: '../../../media/a2/clothes/belt.png' },
      { text: '목도리', image: '../../../media/a2/clothes/scarf.png' },
      { text: '장갑', image: '../../../media/a2/clothes/gloves.png' },
      { text: '손목시계', image: '../../../media/a2/clothes/watch.png' }
    ],
    answer: '벨트'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "목도리" است؟',
    speak: '목도리',
    options: [
      { text: '목걸이', image: '../../../media/a2/clothes/necklace.png' },
      { text: '목도리', image: '../../../media/a2/clothes/scarf.png' },
      { text: '벨트', image: '../../../media/a2/clothes/belt.png' },
      { text: '장갑', image: '../../../media/a2/clothes/gloves.png' }
    ],
    answer: '목도리'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "장갑" است؟',
    speak: '장갑',
    options: [
      { text: '벨트', image: '../../../media/a2/clothes/belt.png' },
      { text: '장갑', image: '../../../media/a2/clothes/gloves.png' },
      { text: '손목시계', image: '../../../media/a2/clothes/watch.png' },
      { text: '목도리', image: '../../../media/a2/clothes/scarf.png' }
    ],
    answer: '장갑'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "손목시계" است؟',
    speak: '손목시계',
    options: [
      { text: '목도리', image: '../../../media/a2/clothes/scarf.png' },
      { text: '벨트', image: '../../../media/a2/clothes/belt.png' },
      { text: '장갑', image: '../../../media/a2/clothes/gloves.png' },
      { text: '손목시계', image: '../../../media/a2/clothes/watch.png' }
    ],
    answer: '손목시계'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "목걸이" است؟',
    speak: '목걸이',
    options: [
      { text: '목걸이', image: '../../../media/a2/clothes/necklace.png' },
      { text: '손목시계', image: '../../../media/a2/clothes/watch.png' },
      { text: '벨트', image: '../../../media/a2/clothes/belt.png' },
      { text: '목도리', image: '../../../media/a2/clothes/scarf.png' }
    ],
    answer: '목걸이'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/belt.png',
    options: ['벨트', '목도리', '장갑', '손목시계'],
    answer: '벨트'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/scarf.png',
    options: ['벨트', '목도리', '장갑', '목걸이'],
    answer: '목도리'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/gloves.png',
    options: ['목걸이', '벨트', '장갑', '목도리'],
    answer: '장갑'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/watch.png',
    options: ['장갑', '목도리', '손목시계', '벨트'],
    answer: '손목시계'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/necklace.png',
    options: ['벨트', '손목시계', '목도리', '목걸이'],
    answer: '목걸이'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '벨트',
    question: 'کدام کلمه را شنیدی؟',
    options: ['벨트', '목도리', '장갑', '손목시계'],
    answer: '벨트'
  },
  {
    type: 'audio',
    speak: '목도리',
    question: 'کدام کلمه را شنیدی؟',
    options: ['목걸이', '목도리', '벨트', '장갑'],
    answer: '목도리'
  },
  {
    type: 'audio',
    speak: '장갑',
    question: 'کدام کلمه را شنیدی؟',
    options: ['벨트', '장갑', '손목시계', '목도리'],
    answer: '장갑'
  },
  {
    type: 'audio',
    speak: '손목시계',
    question: 'کدام کلمه را شنیدی؟',
    options: ['목도리', '벨트', '장갑', '손목시계'],
    answer: '손목시계'
  },
  {
    type: 'audio',
    speak: '목걸이',
    question: 'کدام کلمه را شنیدی؟',
    options: ['목걸이', '손목시계', '벨트', '목도리'],
    answer: '목걸이'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '벨트',
    image: '../../../media/a2/clothes/belt.png',
    meaning: 'کمربند'
  },
  {
    type: 'speak',
    word: '목도리',
    image: '../../../media/a2/clothes/scarf.png',
    meaning: 'شال گردن'
  },
  {
    type: 'speak',
    word: '장갑',
    image: '../../../media/a2/clothes/gloves.png',
    meaning: 'دستکش'
  },
  {
    type: 'speak',
    word: '손목시계',
    image: '../../../media/a2/clothes/watch.png',
    meaning: 'ساعت مچی'
  },
  {
    type: 'speak',
    word: '목걸이',
    image: '../../../media/a2/clothes/necklace.png',
    meaning: 'گردنبند'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '벨트를 샀습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'کمربند خریدم',
    words: ['샀습니다', '를', '벨트'],
    answer: ['벨트를', '샀습니다']
  },
  {
    type: 'build-it',
    speak: '목도리를 하고 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'شال گردن پوشیده‌ام',
    words: ['있습니다', '하고', '를', '목도리'],
    answer: ['목도리를', '하고', '있습니다']
  },
  {
    type: 'build-it',
    speak: '장갑을 끼고 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'دستکش پوشیده‌ام',
    words: ['있습니다', '끼고', '을', '장갑'],
    answer: ['장갑을', '끼고', '있습니다']
  },
  {
    type: 'build-it',
    speak: '손목시계를 차고 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ساعت مچی دارم',
    words: ['있습니다', '차고', '를', '손목시계'],
    answer: ['손목시계를', '차고', '있습니다']
  },
  {
    type: 'build-it',
    speak: '목걸이를 하고 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'گردنبند دارم',
    words: ['있습니다', '하고', '를', '목걸이'],
    answer: ['목걸이를', '하고', '있습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '벨트를 샀습니다',
    question: 'ترجمه را بساز:',
    text: '벨트를 샀습니다',
    words: ['کمربند', 'خریدم'],
    answer: ['کمربند', 'خریدم']
  },
  {
    type: 'build-fa',
    speak: '목도리를 하고 있습니다',
    question: 'ترجمه را بساز:',
    text: '목도리를 하고 있습니다',
    words: ['شال گردن', 'پوشیده‌ام'],
    answer: ['شال گردن', 'پوشیده‌ام']
  },
  {
    type: 'build-fa',
    speak: '장갑을 끼고 있습니다',
    question: 'ترجمه را بساز:',
    text: '장갑을 끼고 있습니다',
    words: ['دستکش', 'پوشیده‌ام'],
    answer: ['دستکش', 'پوشیده‌ام']
  },
  {
    type: 'build-fa',
    speak: '손목시계를 차고 있습니다',
    question: 'ترجمه را بساز:',
    text: '손목시계를 차고 있습니다',
    words: ['ساعت مچی', 'دارم'],
    answer: ['ساعت مچی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: '목걸이를 하고 있습니다',
    question: 'ترجمه را بساز:',
    text: '목걸이를 하고 있습니다',
    words: ['گردنبند', 'دارم'],
    answer: ['گردنبند', 'دارم']
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