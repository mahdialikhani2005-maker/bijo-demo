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

// ===== سوالات درس ۵۰ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "论文" است؟',
    speak: '论文',
    options: [
      { text: '毕业论文', image: '../../../media/a2/school/thesis.png' },
      { text: '论文', image: '../../../media/a2/school/essay.png' },
      { text: '报告', image: '../../../media/a2/school/report.png' },
      { text: '项目', image: '../../../media/a2/school/project.png' }
    ],
    answer: '论文'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "毕业论文" است؟',
    speak: '毕业论文',
    options: [
      { text: '论文', image: '../../../media/a2/school/essay.png' },
      { text: '毕业论文', image: '../../../media/a2/school/thesis.png' },
      { text: '研讨会', image: '../../../media/a2/school/workshop.png' },
      { text: '报告', image: '../../../media/a2/school/report.png' }
    ],
    answer: '毕业论文'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "报告" است؟',
    speak: '报告',
    options: [
      { text: '项目', image: '../../../media/a2/school/project.png' },
      { text: '论文', image: '../../../media/a2/school/essay.png' },
      { text: '报告', image: '../../../media/a2/school/report.png' },
      { text: '毕业论文', image: '../../../media/a2/school/thesis.png' }
    ],
    answer: '报告'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "项目" است؟',
    speak: '项目',
    options: [
      { text: '项目', image: '../../../media/a2/school/project.png' },
      { text: '研讨会', image: '../../../media/a2/school/workshop.png' },
      { text: '论文', image: '../../../media/a2/school/essay.png' },
      { text: '报告', image: '../../../media/a2/school/report.png' }
    ],
    answer: '项目'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "研讨会" است؟',
    speak: '研讨会',
    options: [
      { text: '毕业论文', image: '../../../media/a2/school/thesis.png' },
      { text: '研讨会', image: '../../../media/a2/school/workshop.png' },
      { text: '项目', image: '../../../media/a2/school/project.png' },
      { text: '论文', image: '../../../media/a2/school/essay.png' }
    ],
    answer: '研讨会'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/essay.png',
    options: ['毕业论文', '论文', '报告', '项目'],
    answer: '论文'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/thesis.png',
    options: ['论文', '毕业论文', '研讨会', '报告'],
    answer: '毕业论文'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/report.png',
    options: ['项目', '论文', '报告', '毕业论文'],
    answer: '报告'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/project.png',
    options: ['项目', '研讨会', '论文', '报告'],
    answer: '项目'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/workshop.png',
    options: ['毕业论文', '研讨会', '项目', '论文'],
    answer: '研讨会'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '论文',
    question: 'کدام کلمه را شنیدی؟',
    options: ['毕业论文', '论文', '报告', '项目'],
    answer: '论文'
  },
  {
    type: 'audio',
    speak: '毕业论文',
    question: 'کدام کلمه را شنیدی؟',
    options: ['论文', '毕业论文', '研讨会', '报告'],
    answer: '毕业论文'
  },
  {
    type: 'audio',
    speak: '报告',
    question: 'کدام کلمه را شنیدی؟',
    options: ['项目', '论文', '报告', '毕业论文'],
    answer: '报告'
  },
  {
    type: 'audio',
    speak: '项目',
    question: 'کدام کلمه را شنیدی؟',
    options: ['项目', '研讨会', '论文', '报告'],
    answer: '项目'
  },
  {
    type: 'audio',
    speak: '研讨会',
    question: 'کدام کلمه را شنیدی؟',
    options: ['毕业论文', '研讨会', '项目', '论文'],
    answer: '研讨会'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '论文',
    image: '../../../media/a2/school/essay.png',
    meaning: 'مقاله'
  },
  {
    type: 'speak',
    word: '毕业论文',
    image: '../../../media/a2/school/thesis.png',
    meaning: 'پایان‌نامه'
  },
  {
    type: 'speak',
    word: '报告',
    image: '../../../media/a2/school/report.png',
    meaning: 'گزارش'
  },
  {
    type: 'speak',
    word: '项目',
    image: '../../../media/a2/school/project.png',
    meaning: 'پروژه'
  },
  {
    type: 'speak',
    word: '研讨会',
    image: '../../../media/a2/school/workshop.png',
    meaning: 'کارگاه آموزشی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是论文',
    question: 'جمله چینی را بساز:',
    text: 'این مقاله است',
    words: ['论文', '这', '是'],
    answer: ['这', '是', '论文']
  },
  {
    type: 'build-en',
    speak: '这是毕业论文',
    question: 'جمله چینی را بساز:',
    text: 'این پایان‌نامه است',
    words: ['毕业论文', '这', '是'],
    answer: ['这', '是', '毕业论文']
  },
  {
    type: 'build-en',
    speak: '这是报告',
    question: 'جمله چینی را بساز:',
    text: 'این گزارش است',
    words: ['报告', '这', '是'],
    answer: ['这', '是', '报告']
  },
  {
    type: 'build-en',
    speak: '这是项目',
    question: 'جمله چینی را بساز:',
    text: 'این پروژه است',
    words: ['项目', '这', '是'],
    answer: ['这', '是', '项目']
  },
  {
    type: 'build-en',
    speak: '这是研讨会',
    question: 'جمله چینی را بساز:',
    text: 'این کارگاه آموزشی است',
    words: ['研讨会', '这', '是'],
    answer: ['这', '是', '研讨会']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是论文',
    question: 'ترجمه را بساز:',
    text: '这是论文',
    words: ['است', 'مقاله', 'این'],
    answer: ['این', 'مقاله', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是毕业论文',
    question: 'ترجمه را بساز:',
    text: '这是毕业论文',
    words: ['است', 'پایان‌نامه', 'این'],
    answer: ['این', 'پایان‌نامه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是报告',
    question: 'ترجمه را بساز:',
    text: '这是报告',
    words: ['است', 'گزارش', 'این'],
    answer: ['این', 'گزارش', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是项目',
    question: 'ترجمه را بساز:',
    text: '这是项目',
    words: ['است', 'پروژه', 'این'],
    answer: ['این', 'پروژه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是研讨会',
    question: 'ترجمه را بساز:',
    text: '这是研讨会',
    words: ['است', 'کارگاه آموزشی', 'این'],
    answer: ['این', 'کارگاه آموزشی', 'است']
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