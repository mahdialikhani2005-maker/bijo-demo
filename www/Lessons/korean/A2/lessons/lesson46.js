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

// ===== سوالات درس ۴۶ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "공책" است؟',
    speak: '공책',
    options: [
      { text: '공책', image: '../../../media/a2/school/notebook.png' },
      { text: '연필', image: '../../../media/a2/school/pencil.png' },
      { text: '자', image: '../../../media/a2/school/ruler.png' },
      { text: '지우개', image: '../../../media/a2/school/eraser.png' }
    ],
    answer: '공책'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "연필" است؟',
    speak: '연필',
    options: [
      { text: '계산기', image: '../../../media/a2/school/calculator.png' },
      { text: '연필', image: '../../../media/a2/school/pencil.png' },
      { text: '공책', image: '../../../media/a2/school/notebook.png' },
      { text: '자', image: '../../../media/a2/school/ruler.png' }
    ],
    answer: '연필'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "자" است؟',
    speak: '자',
    options: [
      { text: '공책', image: '../../../media/a2/school/notebook.png' },
      { text: '자', image: '../../../media/a2/school/ruler.png' },
      { text: '지우개', image: '../../../media/a2/school/eraser.png' },
      { text: '연필', image: '../../../media/a2/school/pencil.png' }
    ],
    answer: '자'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "지우개" است؟',
    speak: '지우개',
    options: [
      { text: '연필', image: '../../../media/a2/school/pencil.png' },
      { text: '공책', image: '../../../media/a2/school/notebook.png' },
      { text: '자', image: '../../../media/a2/school/ruler.png' },
      { text: '지우개', image: '../../../media/a2/school/eraser.png' }
    ],
    answer: '지우개'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "계산기" است؟',
    speak: '계산기',
    options: [
      { text: '계산기', image: '../../../media/a2/school/calculator.png' },
      { text: '지우개', image: '../../../media/a2/school/eraser.png' },
      { text: '공책', image: '../../../media/a2/school/notebook.png' },
      { text: '연필', image: '../../../media/a2/school/pencil.png' }
    ],
    answer: '계산기'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/notebook.png',
    options: ['공책', '연필', '자', '지우개'],
    answer: '공책'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/pencil.png',
    options: ['공책', '연필', '자', '계산기'],
    answer: '연필'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/ruler.png',
    options: ['계산기', '공책', '자', '연필'],
    answer: '자'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/eraser.png',
    options: ['자', '연필', '지우개', '공책'],
    answer: '지우개'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/calculator.png',
    options: ['공책', '계산기', '연필', '자'],
    answer: '계산기'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '공책',
    question: 'کدام کلمه را شنیدی؟',
    options: ['공책', '연필', '자', '지우개'],
    answer: '공책'
  },
  {
    type: 'audio',
    speak: '연필',
    question: 'کدام کلمه را شنیدی؟',
    options: ['계산기', '연필', '공책', '자'],
    answer: '연필'
  },
  {
    type: 'audio',
    speak: '자',
    question: 'کدام کلمه را شنیدی؟',
    options: ['공책', '자', '지우개', '연필'],
    answer: '자'
  },
  {
    type: 'audio',
    speak: '지우개',
    question: 'کدام کلمه را شنیدی؟',
    options: ['연필', '공책', '자', '지우개'],
    answer: '지우개'
  },
  {
    type: 'audio',
    speak: '계산기',
    question: 'کدام کلمه را شنیدی؟',
    options: ['계산기', '지우개', '공책', '연필'],
    answer: '계산기'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '공책',
    image: '../../../media/a2/school/notebook.png',
    meaning: 'دفتر'
  },
  {
    type: 'speak',
    word: '연필',
    image: '../../../media/a2/school/pencil.png',
    meaning: 'مداد'
  },
  {
    type: 'speak',
    word: '자',
    image: '../../../media/a2/school/ruler.png',
    meaning: 'خط‌کش'
  },
  {
    type: 'speak',
    word: '지우개',
    image: '../../../media/a2/school/eraser.png',
    meaning: 'پاک‌کن'
  },
  {
    type: 'speak',
    word: '계산기',
    image: '../../../media/a2/school/calculator.png',
    meaning: 'ماشین حساب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '공책을 삽니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'دفتر می‌خرم',
    words: ['삽니다', '을', '공책'],
    answer: ['공책을', '삽니다']
  },
  {
    type: 'build-it',
    speak: '연필로 씁니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با مداد می‌نویسم',
    words: ['씁니다', '로', '연필'],
    answer: ['연필로', '씁니다']
  },
  {
    type: 'build-it',
    speak: '자로 선을 긋습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با خط‌کش خط می‌کشم',
    words: ['긋습니다', '을', '선', '로', '자'],
    answer: ['자로', '선을', '긋습니다']
  },
  {
    type: 'build-it',
    speak: '지우개로 지웁니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با پاک‌کن پاک می‌کنم',
    words: ['지웁니다', '로', '지우개'],
    answer: ['지우개로', '지웁니다']
  },
  {
    type: 'build-it',
    speak: '계산기를 사용합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ماشین حساب استفاده می‌کنم',
    words: ['사용합니다', '을', '계산기'],
    answer: ['계산기를', '사용합니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '공책을 삽니다',
    question: 'ترجمه را بساز:',
    text: '공책을 삽니다',
    words: ['دفتر', 'می‌خرم'],
    answer: ['دفتر', 'می‌خرم']
  },
  {
    type: 'build-fa',
    speak: '연필로 씁니다',
    question: 'ترجمه را بساز:',
    text: '연필로 씁니다',
    words: ['با', 'مداد', 'می‌نویسم'],
    answer: ['با', 'مداد', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: '자로 선을 긋습니다',
    question: 'ترجمه را بساز:',
    text: '자로 선을 긋습니다',
    words: ['با', 'خط‌کش', 'خط', 'می‌کشم'],
    answer: ['با', 'خط‌کش', 'خط', 'می‌کشم']
  },
  {
    type: 'build-fa',
    speak: '지우개로 지웁니다',
    question: 'ترجمه را بساز:',
    text: '지우개로 지웁니다',
    words: ['با', 'پاک‌کن', 'پاک', 'می‌کنم'],
    answer: ['با', 'پاک‌کن', 'پاک', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '계산기를 사용합니다',
    question: 'ترجمه را بساز:',
    text: '계산기를 사용합니다',
    words: ['ماشین حساب', 'استفاده', 'می‌کنم'],
    answer: ['ماشین حساب', 'استفاده', 'می‌کنم']
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