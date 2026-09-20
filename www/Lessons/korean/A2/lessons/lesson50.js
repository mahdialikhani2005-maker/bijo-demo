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

// ===== سوالات درس ۵۰ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "에세이" است؟',
    speak: '에세이',
    options: [
      { text: '에세이', image: '../../../media/a2/school/essay.png' },
      { text: '논문', image: '../../../media/a2/school/thesis.png' },
      { text: '보고서', image: '../../../media/a2/school/report.png' },
      { text: '프로젝트', image: '../../../media/a2/school/project.png' }
    ],
    answer: '에세이'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "논문" است؟',
    speak: '논문',
    options: [
      { text: '워크숍', image: '../../../media/a2/school/workshop.png' },
      { text: '논문', image: '../../../media/a2/school/thesis.png' },
      { text: '에세이', image: '../../../media/a2/school/essay.png' },
      { text: '보고서', image: '../../../media/a2/school/report.png' }
    ],
    answer: '논문'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "보고서" است؟',
    speak: '보고서',
    options: [
      { text: '에세이', image: '../../../media/a2/school/essay.png' },
      { text: '보고서', image: '../../../media/a2/school/report.png' },
      { text: '프로젝트', image: '../../../media/a2/school/project.png' },
      { text: '논문', image: '../../../media/a2/school/thesis.png' }
    ],
    answer: '보고서'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "프로젝트" است؟',
    speak: '프로젝트',
    options: [
      { text: '논문', image: '../../../media/a2/school/thesis.png' },
      { text: '에세이', image: '../../../media/a2/school/essay.png' },
      { text: '보고서', image: '../../../media/a2/school/report.png' },
      { text: '프로젝트', image: '../../../media/a2/school/project.png' }
    ],
    answer: '프로젝트'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "워크숍" است؟',
    speak: '워크숍',
    options: [
      { text: '워크숍', image: '../../../media/a2/school/workshop.png' },
      { text: '프로젝트', image: '../../../media/a2/school/project.png' },
      { text: '에세이', image: '../../../media/a2/school/essay.png' },
      { text: '논문', image: '../../../media/a2/school/thesis.png' }
    ],
    answer: '워크숍'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/essay.png',
    options: ['에세이', '논문', '보고서', '프로젝트'],
    answer: '에세이'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/thesis.png',
    options: ['에세이', '논문', '보고서', '워크숍'],
    answer: '논문'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/report.png',
    options: ['워크숍', '에세이', '보고서', '논문'],
    answer: '보고서'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/project.png',
    options: ['보고서', '논문', '프로젝트', '에세이'],
    answer: '프로젝트'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/workshop.png',
    options: ['에세이', '프로젝트', '논문', '워크숍'],
    answer: '워크숍'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '에세이',
    question: 'کدام کلمه را شنیدی؟',
    options: ['에세이', '논문', '보고서', '프로젝트'],
    answer: '에세이'
  },
  {
    type: 'audio',
    speak: '논문',
    question: 'کدام کلمه را شنیدی؟',
    options: ['워크숍', '논문', '에세이', '보고서'],
    answer: '논문'
  },
  {
    type: 'audio',
    speak: '보고서',
    question: 'کدام کلمه را شنیدی؟',
    options: ['에세이', '보고서', '프로젝트', '논문'],
    answer: '보고서'
  },
  {
    type: 'audio',
    speak: '프로젝트',
    question: 'کدام کلمه را شنیدی؟',
    options: ['논문', '에세이', '보고서', '프로젝트'],
    answer: '프로젝트'
  },
  {
    type: 'audio',
    speak: '워크숍',
    question: 'کدام کلمه را شنیدی؟',
    options: ['워크숍', '프로젝트', '에세이', '논문'],
    answer: '워크숍'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '에세이',
    image: '../../../media/a2/school/essay.png',
    meaning: 'مقاله'
  },
  {
    type: 'speak',
    word: '논문',
    image: '../../../media/a2/school/thesis.png',
    meaning: 'پایان‌نامه'
  },
  {
    type: 'speak',
    word: '보고서',
    image: '../../../media/a2/school/report.png',
    meaning: 'گزارش'
  },
  {
    type: 'speak',
    word: '프로젝트',
    image: '../../../media/a2/school/project.png',
    meaning: 'پروژه'
  },
  {
    type: 'speak',
    word: '워크숍',
    image: '../../../media/a2/school/workshop.png',
    meaning: 'کارگاه آموزشی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '에세이를 씁니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'مقاله می‌نویسم',
    words: ['씁니다', '를', '에세이'],
    answer: ['에세이를', '씁니다']
  },
  {
    type: 'build-it',
    speak: '논문을 씁니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پایان‌نامه می‌نویسم',
    words: ['씁니다', '을', '논문'],
    answer: ['논문을', '씁니다']
  },
  {
    type: 'build-it',
    speak: '보고서를 제출합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'گزارش تحویل می‌دهم',
    words: ['제출합니다', '를', '보고서'],
    answer: ['보고서를', '제출합니다']
  },
  {
    type: 'build-it',
    speak: '프로젝트를 합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پروژه انجام می‌دهم',
    words: ['합니다', '를', '프로젝트'],
    answer: ['프로젝트를', '합니다']
  },
  {
    type: 'build-it',
    speak: '워크숍에 참가합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در کارگاه آموزشی شرکت می‌کنم',
    words: ['참가합니다', '에', '워크숍'],
    answer: ['워크숍에', '참가합니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '에세이를 씁니다',
    question: 'ترجمه را بساز:',
    text: '에세이를 씁니다',
    words: ['مقاله', 'می‌نویسم'],
    answer: ['مقاله', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: '논문을 씁니다',
    question: 'ترجمه را بساز:',
    text: '논문을 씁니다',
    words: ['پایان‌نامه', 'می‌نویسم'],
    answer: ['پایان‌نامه', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: '보고서를 제출합니다',
    question: 'ترجمه را بساز:',
    text: '보고서를 제출합니다',
    words: ['گزارش', 'تحویل', 'می‌دهم'],
    answer: ['گزارش', 'تحویل', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: '프로젝트를 합니다',
    question: 'ترجمه را بساز:',
    text: '프로젝트를 합니다',
    words: ['پروژه', 'انجام', 'می‌دهم'],
    answer: ['پروژه', 'انجام', 'می‌دهم']
  },
  {
    type: 'build-fa',
    speak: '워크숍에 참가합니다',
    question: 'ترجمه را بساز:',
    text: '워크숍에 참가합니다',
    words: ['در', 'کارگاه آموزشی', 'شرکت', 'می‌کنم'],
    answer: ['در', 'کارگاه آموزشی', 'شرکت', 'می‌کنم']
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