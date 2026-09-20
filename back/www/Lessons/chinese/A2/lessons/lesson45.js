let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
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
  recognition.lang = 'zh-CN';
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

// ===== سوالات درس ۴۵ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "手术" است؟',
    speak: '手术',
    options: [
      { text: '担架', image: '../../../media/a2/health/stretcher.png' },
      { text: '手术', image: '../../../media/a2/health/surgery.png' },
      { text: '轮椅', image: '../../../media/a2/health/wheelchair.png' },
      { text: '石膏', image: '../../../media/a2/health/cast.png' }
    ],
    answer: '手术'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "担架" است؟',
    speak: '担架',
    options: [
      { text: '手术', image: '../../../media/a2/health/surgery.png' },
      { text: '担架', image: '../../../media/a2/health/stretcher.png' },
      { text: '绷带', image: '../../../media/a2/health/bandage.png' },
      { text: '轮椅', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: '担架'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "轮椅" است؟',
    speak: '轮椅',
    options: [
      { text: '石膏', image: '../../../media/a2/health/cast.png' },
      { text: '手术', image: '../../../media/a2/health/surgery.png' },
      { text: '轮椅', image: '../../../media/a2/health/wheelchair.png' },
      { text: '担架', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: '轮椅'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "石膏" است؟',
    speak: '石膏',
    options: [
      { text: '石膏', image: '../../../media/a2/health/cast.png' },
      { text: '绷带', image: '../../../media/a2/health/bandage.png' },
      { text: '担架', image: '../../../media/a2/health/stretcher.png' },
      { text: '手术', image: '../../../media/a2/health/surgery.png' }
    ],
    answer: '石膏'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "绷带" است؟',
    speak: '绷带',
    options: [
      { text: '轮椅', image: '../../../media/a2/health/wheelchair.png' },
      { text: '绷带', image: '../../../media/a2/health/bandage.png' },
      { text: '石膏', image: '../../../media/a2/health/cast.png' },
      { text: '担架', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: '绷带'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/surgery.png',
    options: ['担架', '手术', '轮椅', '石膏'],
    answer: '手术'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/stretcher.png',
    options: ['手术', '担架', '绷带', '轮椅'],
    answer: '担架'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wheelchair.png',
    options: ['石膏', '手术', '轮椅', '担架'],
    answer: '轮椅'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cast.png',
    options: ['石膏', '绷带', '担架', '手术'],
    answer: '石膏'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/bandage.png',
    options: ['轮椅', '绷带', '石膏', '担架'],
    answer: '绷带'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '手术',
    question: 'کدام کلمه را شنیدی؟',
    options: ['担架', '手术', '轮椅', '石膏'],
    answer: '手术'
  },
  {
    type: 'audio',
    speak: '担架',
    question: 'کدام کلمه را شنیدی؟',
    options: ['手术', '担架', '绷带', '轮椅'],
    answer: '担架'
  },
  {
    type: 'audio',
    speak: '轮椅',
    question: 'کدام کلمه را شنیدی؟',
    options: ['石膏', '手术', '轮椅', '担架'],
    answer: '轮椅'
  },
  {
    type: 'audio',
    speak: '石膏',
    question: 'کدام کلمه را شنیدی؟',
    options: ['石膏', '绷带', '担架', '手术'],
    answer: '石膏'
  },
  {
    type: 'audio',
    speak: '绷带',
    question: 'کدام کلمه را شنیدی؟',
    options: ['轮椅', '绷带', '石膏', '担架'],
    answer: '绷带'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '手术',
    image: '../../../media/a2/health/surgery.png',
    meaning: 'جراحی'
  },
  {
    type: 'speak',
    word: '担架',
    image: '../../../media/a2/health/stretcher.png',
    meaning: 'برانکارد'
  },
  {
    type: 'speak',
    word: '轮椅',
    image: '../../../media/a2/health/wheelchair.png',
    meaning: 'صندلی چرخدار'
  },
  {
    type: 'speak',
    word: '石膏',
    image: '../../../media/a2/health/cast.png',
    meaning: 'گچ'
  },
  {
    type: 'speak',
    word: '绷带',
    image: '../../../media/a2/health/bandage.png',
    meaning: 'بانداژ'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是手术',
    question: 'جمله چینی را بساز:',
    text: 'این جراحی است',
    words: ['手术', '这', '是'],
    answer: ['这', '是', '手术']
  },
  {
    type: 'build-en',
    speak: '这是担架',
    question: 'جمله چینی را بساز:',
    text: 'این برانکارد است',
    words: ['担架', '这', '是'],
    answer: ['这', '是', '担架']
  },
  {
    type: 'build-en',
    speak: '这是轮椅',
    question: 'جمله چینی را بساز:',
    text: 'این صندلی چرخدار است',
    words: ['轮椅', '这', '是'],
    answer: ['这', '是', '轮椅']
  },
  {
    type: 'build-en',
    speak: '这是石膏',
    question: 'جمله چینی را بساز:',
    text: 'این گچ است',
    words: ['石膏', '这', '是'],
    answer: ['这', '是', '石膏']
  },
  {
    type: 'build-en',
    speak: '这是绷带',
    question: 'جمله چینی را بساز:',
    text: 'این بانداژ است',
    words: ['绷带', '这', '是'],
    answer: ['这', '是', '绷带']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是手术',
    question: 'ترجمه را بساز:',
    text: '这是手术',
    words: ['است', 'جراحی', 'این'],
    answer: ['این', 'جراحی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是担架',
    question: 'ترجمه را بساز:',
    text: '这是担架',
    words: ['است', 'برانکارد', 'این'],
    answer: ['این', 'برانکارد', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是轮椅',
    question: 'ترجمه را بساز:',
    text: '这是轮椅',
    words: ['است', 'صندلی چرخدار', 'این'],
    answer: ['این', 'صندلی چرخدار', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是石膏',
    question: 'ترجمه را بساز:',
    text: '这是石膏',
    words: ['است', 'گچ', 'این'],
    answer: ['این', 'گچ', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是绷带',
    question: 'ترجمه را بساز:',
    text: '这是绷带',
    words: ['است', 'بانداژ', 'این'],
    answer: ['این', 'بانداژ', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 درس تمام شد! 🎉</h2>
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
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

    if (q.type === 'build-en') {
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