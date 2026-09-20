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

// ===== سوالات درس ۴۹ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "성적" است؟',
    speak: '성적',
    options: [
      { text: '성적', image: '../../../media/a2/school/grade.png' },
      { text: '시험', image: '../../../media/a2/school/exam.png' },
      { text: '수업', image: '../../../media/a2/school/lesson.png' },
      { text: '과목', image: '../../../media/a2/school/subject.png' }
    ],
    answer: '성적'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "시험" است؟',
    speak: '시험',
    options: [
      { text: '선생님', image: '../../../media/a2/school/teacher.png' },
      { text: '시험', image: '../../../media/a2/school/exam.png' },
      { text: '성적', image: '../../../media/a2/school/grade.png' },
      { text: '수업', image: '../../../media/a2/school/lesson.png' }
    ],
    answer: '시험'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "수업" است؟',
    speak: '수업',
    options: [
      { text: '성적', image: '../../../media/a2/school/grade.png' },
      { text: '수업', image: '../../../media/a2/school/lesson.png' },
      { text: '선생님', image: '../../../media/a2/school/teacher.png' },
      { text: '시험', image: '../../../media/a2/school/exam.png' }
    ],
    answer: '수업'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "과목" است؟',
    speak: '과목',
    options: [
      { text: '시험', image: '../../../media/a2/school/exam.png' },
      { text: '성적', image: '../../../media/a2/school/grade.png' },
      { text: '수업', image: '../../../media/a2/school/lesson.png' },
      { text: '과목', image: '../../../media/a2/school/subject.png' }
    ],
    answer: '과목'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "선생님" است؟',
    speak: '선생님',
    options: [
      { text: '선생님', image: '../../../media/a2/school/teacher.png' },
      { text: '과목', image: '../../../media/a2/school/subject.png' },
      { text: '성적', image: '../../../media/a2/school/grade.png' },
      { text: '시험', image: '../../../media/a2/school/exam.png' }
    ],
    answer: '선생님'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/grade.png',
    options: ['성적', '시험', '수업', '과목'],
    answer: '성적'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/exam.png',
    options: ['성적', '시험', '수업', '선생님'],
    answer: '시험'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/lesson.png',
    options: ['선생님', '성적', '수업', '시험'],
    answer: '수업'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/subject.png',
    options: ['수업', '시험', '과목', '성적'],
    answer: '과목'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/teacher.png',
    options: ['성적', '과목', '시험', '선생님'],
    answer: '선생님'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '성적',
    question: 'کدام کلمه را شنیدی؟',
    options: ['성적', '시험', '수업', '과목'],
    answer: '성적'
  },
  {
    type: 'audio',
    speak: '시험',
    question: 'کدام کلمه را شنیدی؟',
    options: ['선생님', '시험', '성적', '수업'],
    answer: '시험'
  },
  {
    type: 'audio',
    speak: '수업',
    question: 'کدام کلمه را شنیدی؟',
    options: ['성적', '수업', '과목', '시험'],
    answer: '수업'
  },
  {
    type: 'audio',
    speak: '과목',
    question: 'کدام کلمه را شنیدی؟',
    options: ['시험', '성적', '수업', '과목'],
    answer: '과목'
  },
  {
    type: 'audio',
    speak: '선생님',
    question: 'کدام کلمه را شنیدی؟',
    options: ['선생님', '과목', '성적', '시험'],
    answer: '선생님'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '성적',
    image: '../../../media/a2/school/grade.png',
    meaning: 'نمره'
  },
  {
    type: 'speak',
    word: '시험',
    image: '../../../media/a2/school/exam.png',
    meaning: 'امتحان'
  },
  {
    type: 'speak',
    word: '수업',
    image: '../../../media/a2/school/lesson.png',
    meaning: 'درس'
  },
  {
    type: 'speak',
    word: '과목',
    image: '../../../media/a2/school/subject.png',
    meaning: 'موضوع درسی'
  },
  {
    type: 'speak',
    word: '선생님',
    image: '../../../media/a2/school/teacher.png',
    meaning: 'معلم'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '성적이 좋습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'نمره‌ام خوب است',
    words: ['좋습니다', '이', '성적'],
    answer: ['성적이', '좋습니다']
  },
  {
    type: 'build-it',
    speak: '시험을 봅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'امتحان می‌دهم',
    words: ['봅니다', '을', '시험'],
    answer: ['시험을', '봅니다']
  },
  {
    type: 'build-it',
    speak: '수업이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'درس دارم',
    words: ['있습니다', '이', '수업'],
    answer: ['수업이', '있습니다']
  },
  {
    type: 'build-it',
    speak: '과목은 수학입니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'موضوع درسی ریاضیات است',
    words: ['입니다', '수학', '은', '과목'],
    answer: ['과목은', '수학', '입니다']
  },
  {
    type: 'build-it',
    speak: '선생님이 친절합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'معلم مهربان است',
    words: ['친절합니다', '이', '선생님'],
    answer: ['선생님이', '친절합니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '성적이 좋습니다',
    question: 'ترجمه را بساز:',
    text: '성적이 좋습니다',
    words: ['نمره', 'خوب', 'است'],
    answer: ['نمره', 'خوب', 'است']
  },
  {
    type: 'build-fa',
    speak: '시험을 봅니다',
    question: 'ترجمه را بساز:',
    text: '시험을 봅니다',
    words: ['امتحان', 'می‌دهم'],
    answer: ['امتحان', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: '수업이 있습니다',
    question: 'ترجمه را بساز:',
    text: '수업이 있습니다',
    words: ['درس', 'دارم'],
    answer: ['درس', 'دارم']
  },
  {
    type: 'build-fa',
    speak: '과목은 수학입니다',
    question: 'ترجمه را بساز:',
    text: '과목은 수학입니다',
    words: ['موضوع درسی', 'ریاضیات', 'است'],
    answer: ['موضوع درسی', 'ریاضیات', 'است']
  },
  {
    type: 'build-fa',
    speak: '선생님이 친절합니다',
    question: 'ترجمه را بساز:',
    text: '선생님이 친절합니다',
    words: ['معلم', 'مهربان', 'است'],
    answer: ['معلم', 'مهربان', 'است']
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