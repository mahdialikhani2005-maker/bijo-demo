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

// ===== سوالات درس ۲ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "남편" است؟',
    speak: '남편',
    options: [
      { text: '남편', image: '../../../media/a2/family/husband.png' },
      { text: '아내', image: '../../../media/a2/family/wife.png' },
      { text: '부모님', image: '../../../media/a2/family/parent.png' },
      { text: '할아버지', image: '../../../media/a2/family/grandparent.png' }
    ],
    answer: '남편'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "아내" است؟',
    speak: '아내',
    options: [
      { text: '할머니', image: '../../../media/a2/family/grandparent.png' },
      { text: '아내', image: '../../../media/a2/family/wife.png' },
      { text: '남편', image: '../../../media/a2/family/husband.png' },
      { text: '부모님', image: '../../../media/a2/family/parent.png' }
    ],
    answer: '아내'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "부모님" است؟',
    speak: '부모님',
    options: [
      { text: '남편', image: '../../../media/a2/family/husband.png' },
      { text: '부모님', image: '../../../media/a2/family/parent.png' },
      { text: '할아버지', image: '../../../media/a2/family/grandparent.png' },
      { text: '아내', image: '../../../media/a2/family/wife.png' }
    ],
    answer: '부모님'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "할아버지" است؟',
    speak: '할아버지',
    options: [
      { text: '아내', image: '../../../media/a2/family/wife.png' },
      { text: '남편', image: '../../../media/a2/family/husband.png' },
      { text: '부모님', image: '../../../media/a2/family/parent.png' },
      { text: '할아버지', image: '../../../media/a2/family/grandparent.png' }
    ],
    answer: '할아버지'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "할머니" است؟',
    speak: '할머니',
    options: [
      { text: '할머니', image: '../../../media/a2/family/grandparent.png' },
      { text: '할아버지', image: '../../../media/a2/family/grandparent.png' },
      { text: '남편', image: '../../../media/a2/family/husband.png' },
      { text: '아내', image: '../../../media/a2/family/wife.png' }
    ],
    answer: '할머니'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/husband.png',
    options: ['남편', '아내', '부모님', '할아버지'],
    answer: '남편'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/wife.png',
    options: ['남편', '아내', '부모님', '할머니'],
    answer: '아내'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/parent.png',
    options: ['할머니', '아내', '부모님', '남편'],
    answer: '부모님'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandparent.png',
    options: ['아내', '부모님', '할아버지', '남편'],
    answer: '할아버지'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟ (مادربزرگ)',
    image: '../../../media/a2/family/grandparent.png',
    options: ['할아버지', '할머니', '아내', '부모님'],
    answer: '할머니'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '남편',
    question: 'کدام کلمه را شنیدی؟',
    options: ['남편', '아내', '부모님', '할아버지'],
    answer: '남편'
  },
  {
    type: 'audio',
    speak: '아내',
    question: 'کدام کلمه را شنیدی؟',
    options: ['할머니', '아내', '남편', '부모님'],
    answer: '아내'
  },
  {
    type: 'audio',
    speak: '부모님',
    question: 'کدام کلمه را شنیدی؟',
    options: ['남편', '부모님', '할아버지', '아내'],
    answer: '부모님'
  },
  {
    type: 'audio',
    speak: '할아버지',
    question: 'کدام کلمه را شنیدی؟',
    options: ['아내', '남편', '부모님', '할아버지'],
    answer: '할아버지'
  },
  {
    type: 'audio',
    speak: '할머니',
    question: 'کدام کلمه را شنیدی؟',
    options: ['할머니', '할아버지', '남편', '아내'],
    answer: '할머니'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '남편',
    image: '../../../media/a2/family/husband.png',
    meaning: 'شوهر'
  },
  {
    type: 'speak',
    word: '아내',
    image: '../../../media/a2/family/wife.png',
    meaning: 'همسر (زن)'
  },
  {
    type: 'speak',
    word: '부모님',
    image: '../../../media/a2/family/parent.png',
    meaning: 'والدین'
  },
  {
    type: 'speak',
    word: '할아버지',
    image: '../../../media/a2/family/grandparent.png',
    meaning: 'پدربزرگ'
  },
  {
    type: 'speak',
    word: '할머니',
    image: '../../../media/a2/family/grandparent.png',
    meaning: 'مادربزرگ'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '그분은 제 남편입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'او شوهر من است',
    words: ['입니다', '남편', '제', '그분은'],
    answer: ['그분은', '제', '남편', '입니다']
  },
  {
    type: 'build-it',
    speak: '그분은 제 아내입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'او همسر من است',
    words: ['입니다', '아내', '제', '그분은'],
    answer: ['그분은', '제', '아내', '입니다']
  },
  {
    type: 'build-it',
    speak: '제 부모님은 건강하십니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'والدین من سالم هستند',
    words: ['건강하십니다', '부모님은', '제'],
    answer: ['제', '부모님은', '건강하십니다']
  },
  {
    type: 'build-it',
    speak: '제 할아버지는 친절하십니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پدربزرگ من مهربان است',
    words: ['친절하십니다', '할아버지는', '제'],
    answer: ['제', '할아버지는', '친절하십니다']
  },
  {
    type: 'build-it',
    speak: '제 할머니는 상냥하십니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'مادربزرگ من مهربان است',
    words: ['상냥하십니다', '할머니는', '제'],
    answer: ['제', '할머니는', '상냥하십니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '그분은 제 남편입니다',
    question: 'ترجمه را بساز:',
    text: '그분은 제 남편입니다',
    words: ['او', 'شوهر', 'من', 'است'],
    answer: ['او', 'شوهر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '그분은 제 아내입니다',
    question: 'ترجمه را بساز:',
    text: '그분은 제 아내입니다',
    words: ['او', 'همسر', 'من', 'است'],
    answer: ['او', 'همسر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '제 부모님은 건강하십니다',
    question: 'ترجمه را بساز:',
    text: '제 부모님은 건강하십니다',
    words: ['والدین', 'من', 'سالم', 'هستند'],
    answer: ['والدین', 'من', 'سالم', 'هستند']
  },
  {
    type: 'build-fa',
    speak: '제 할아버지는 친절하십니다',
    question: 'ترجمه را بساز:',
    text: '제 할아버지는 친절하십니다',
    words: ['پدربزرگ', 'من', 'مهربان', 'است'],
    answer: ['پدربزرگ', 'من', 'مهربان', 'است']
  },
  {
    type: 'build-fa',
    speak: '제 할머니는 상냥하십니다',
    question: 'ترجمه را بساز:',
    text: '제 할머니는 상냥하십니다',
    words: ['مادربزرگ', 'من', 'مهربان', 'است'],
    answer: ['مادربزرگ', 'من', 'مهربان', 'است']
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