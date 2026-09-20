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

// ===== سوالات درس ۴۹ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "成绩" است؟',
    speak: '成绩',
    options: [
      { text: '考试', image: '../../../media/a2/school/exam.png' },
      { text: '成绩', image: '../../../media/a2/school/grade.png' },
      { text: '课', image: '../../../media/a2/school/lesson.png' },
      { text: '科目', image: '../../../media/a2/school/subject.png' }
    ],
    answer: '成绩'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "考试" است؟',
    speak: '考试',
    options: [
      { text: '成绩', image: '../../../media/a2/school/grade.png' },
      { text: '考试', image: '../../../media/a2/school/exam.png' },
      { text: '老师', image: '../../../media/a2/school/teacher.png' },
      { text: '课', image: '../../../media/a2/school/lesson.png' }
    ],
    answer: '考试'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "课" است؟',
    speak: '课',
    options: [
      { text: '科目', image: '../../../media/a2/school/subject.png' },
      { text: '成绩', image: '../../../media/a2/school/grade.png' },
      { text: '课', image: '../../../media/a2/school/lesson.png' },
      { text: '考试', image: '../../../media/a2/school/exam.png' }
    ],
    answer: '课'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "科目" است؟',
    speak: '科目',
    options: [
      { text: '科目', image: '../../../media/a2/school/subject.png' },
      { text: '老师', image: '../../../media/a2/school/teacher.png' },
      { text: '考试', image: '../../../media/a2/school/exam.png' },
      { text: '成绩', image: '../../../media/a2/school/grade.png' }
    ],
    answer: '科目'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "老师" است؟',
    speak: '老师',
    options: [
      { text: '课', image: '../../../media/a2/school/lesson.png' },
      { text: '老师', image: '../../../media/a2/school/teacher.png' },
      { text: '科目', image: '../../../media/a2/school/subject.png' },
      { text: '考试', image: '../../../media/a2/school/exam.png' }
    ],
    answer: '老师'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/grade.png',
    options: ['考试', '成绩', '课', '科目'],
    answer: '成绩'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/exam.png',
    options: ['成绩', '考试', '老师', '课'],
    answer: '考试'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/lesson.png',
    options: ['科目', '成绩', '课', '考试'],
    answer: '课'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/subject.png',
    options: ['科目', '老师', '考试', '成绩'],
    answer: '科目'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/teacher.png',
    options: ['课', '老师', '科目', '考试'],
    answer: '老师'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '成绩',
    question: 'کدام کلمه را شنیدی؟',
    options: ['考试', '成绩', '课', '科目'],
    answer: '成绩'
  },
  {
    type: 'audio',
    speak: '考试',
    question: 'کدام کلمه را شنیدی؟',
    options: ['成绩', '考试', '老师', '课'],
    answer: '考试'
  },
  {
    type: 'audio',
    speak: '课',
    question: 'کدام کلمه را شنیدی؟',
    options: ['科目', '成绩', '课', '考试'],
    answer: '课'
  },
  {
    type: 'audio',
    speak: '科目',
    question: 'کدام کلمه را شنیدی؟',
    options: ['科目', '老师', '考试', '成绩'],
    answer: '科目'
  },
  {
    type: 'audio',
    speak: '老师',
    question: 'کدام کلمه را شنیدی؟',
    options: ['课', '老师', '科目', '考试'],
    answer: '老师'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '成绩',
    image: '../../../media/a2/school/grade.png',
    meaning: 'نمره'
  },
  {
    type: 'speak',
    word: '考试',
    image: '../../../media/a2/school/exam.png',
    meaning: 'امتحان'
  },
  {
    type: 'speak',
    word: '课',
    image: '../../../media/a2/school/lesson.png',
    meaning: 'درس'
  },
  {
    type: 'speak',
    word: '科目',
    image: '../../../media/a2/school/subject.png',
    meaning: 'موضوع درسی'
  },
  {
    type: 'speak',
    word: '老师',
    image: '../../../media/a2/school/teacher.png',
    meaning: 'معلم'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是成绩',
    question: 'جمله چینی را بساز:',
    text: 'این نمره است',
    words: ['成绩', '这', '是'],
    answer: ['这', '是', '成绩']
  },
  {
    type: 'build-en',
    speak: '这是考试',
    question: 'جمله چینی را بساز:',
    text: 'این امتحان است',
    words: ['考试', '这', '是'],
    answer: ['这', '是', '考试']
  },
  {
    type: 'build-en',
    speak: '这是课',
    question: 'جمله چینی را بساز:',
    text: 'این درس است',
    words: ['课', '这', '是'],
    answer: ['这', '是', '课']
  },
  {
    type: 'build-en',
    speak: '这是科目',
    question: 'جمله چینی را بساز:',
    text: 'این موضوع درسی است',
    words: ['科目', '这', '是'],
    answer: ['这', '是', '科目']
  },
  {
    type: 'build-en',
    speak: '这是老师',
    question: 'جمله چینی را بساز:',
    text: 'این معلم است',
    words: ['老师', '这', '是'],
    answer: ['这', '是', '老师']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是成绩',
    question: 'ترجمه را بساز:',
    text: '这是成绩',
    words: ['است', 'نمره', 'این'],
    answer: ['این', 'نمره', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是考试',
    question: 'ترجمه را بساز:',
    text: '这是考试',
    words: ['است', 'امتحان', 'این'],
    answer: ['این', 'امتحان', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是课',
    question: 'ترجمه را بساز:',
    text: '这是课',
    words: ['است', 'درس', 'این'],
    answer: ['این', 'درس', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是科目',
    question: 'ترجمه را بساز:',
    text: '这是科目',
    words: ['است', 'موضوع درسی', 'این'],
    answer: ['این', 'موضوع درسی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是老师',
    question: 'ترجمه را بساز:',
    text: '这是老师',
    words: ['است', 'معلم', 'این'],
    answer: ['این', 'معلم', 'است']
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