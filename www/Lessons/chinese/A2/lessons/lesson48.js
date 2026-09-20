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

// ===== سوالات درس ۴۸ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "大学" است؟',
    speak: '大学',
    options: [
      { text: '学院', image: '../../../media/a2/school/college.png' },
      { text: '大学', image: '../../../media/a2/school/university.png' },
      { text: '校园', image: '../../../media/a2/school/campus.png' },
      { text: '宿舍', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: '大学'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "学院" است؟',
    speak: '学院',
    options: [
      { text: '大学', image: '../../../media/a2/school/university.png' },
      { text: '学院', image: '../../../media/a2/school/college.png' },
      { text: '实验室', image: '../../../media/a2/school/laboratory.png' },
      { text: '校园', image: '../../../media/a2/school/campus.png' }
    ],
    answer: '学院'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "校园" است؟',
    speak: '校园',
    options: [
      { text: '宿舍', image: '../../../media/a2/school/dormitory.png' },
      { text: '大学', image: '../../../media/a2/school/university.png' },
      { text: '校园', image: '../../../media/a2/school/campus.png' },
      { text: '学院', image: '../../../media/a2/school/college.png' }
    ],
    answer: '校园'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "宿舍" است؟',
    speak: '宿舍',
    options: [
      { text: '宿舍', image: '../../../media/a2/school/dormitory.png' },
      { text: '实验室', image: '../../../media/a2/school/laboratory.png' },
      { text: '大学', image: '../../../media/a2/school/university.png' },
      { text: '学院', image: '../../../media/a2/school/college.png' }
    ],
    answer: '宿舍'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "实验室" است؟',
    speak: '实验室',
    options: [
      { text: '校园', image: '../../../media/a2/school/campus.png' },
      { text: '实验室', image: '../../../media/a2/school/laboratory.png' },
      { text: '学院', image: '../../../media/a2/school/college.png' },
      { text: '大学', image: '../../../media/a2/school/university.png' }
    ],
    answer: '实验室'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/university.png',
    options: ['学院', '大学', '校园', '宿舍'],
    answer: '大学'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/college.png',
    options: ['大学', '学院', '实验室', '校园'],
    answer: '学院'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/campus.png',
    options: ['宿舍', '大学', '校园', '学院'],
    answer: '校园'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dormitory.png',
    options: ['宿舍', '实验室', '大学', '学院'],
    answer: '宿舍'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/laboratory.png',
    options: ['校园', '实验室', '学院', '大学'],
    answer: '实验室'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '大学',
    question: 'کدام کلمه را شنیدی؟',
    options: ['学院', '大学', '校园', '宿舍'],
    answer: '大学'
  },
  {
    type: 'audio',
    speak: '学院',
    question: 'کدام کلمه را شنیدی؟',
    options: ['大学', '学院', '实验室', '校园'],
    answer: '学院'
  },
  {
    type: 'audio',
    speak: '校园',
    question: 'کدام کلمه را شنیدی؟',
    options: ['宿舍', '大学', '校园', '学院'],
    answer: '校园'
  },
  {
    type: 'audio',
    speak: '宿舍',
    question: 'کدام کلمه را شنیدی؟',
    options: ['宿舍', '实验室', '大学', '学院'],
    answer: '宿舍'
  },
  {
    type: 'audio',
    speak: '实验室',
    question: 'کدام کلمه را شنیدی؟',
    options: ['校园', '实验室', '学院', '大学'],
    answer: '实验室'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '大学',
    image: '../../../media/a2/school/university.png',
    meaning: 'دانشگاه'
  },
  {
    type: 'speak',
    word: '学院',
    image: '../../../media/a2/school/college.png',
    meaning: 'کالج'
  },
  {
    type: 'speak',
    word: '校园',
    image: '../../../media/a2/school/campus.png',
    meaning: 'محوطه دانشگاه'
  },
  {
    type: 'speak',
    word: '宿舍',
    image: '../../../media/a2/school/dormitory.png',
    meaning: 'خوابگاه'
  },
  {
    type: 'speak',
    word: '实验室',
    image: '../../../media/a2/school/laboratory.png',
    meaning: 'آزمایشگاه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是大学',
    question: 'جمله چینی را بساز:',
    text: 'این دانشگاه است',
    words: ['大学', '这', '是'],
    answer: ['这', '是', '大学']
  },
  {
    type: 'build-en',
    speak: '这是学院',
    question: 'جمله چینی را بساز:',
    text: 'این کالج است',
    words: ['学院', '这', '是'],
    answer: ['这', '是', '学院']
  },
  {
    type: 'build-en',
    speak: '这是校园',
    question: 'جمله چینی را بساز:',
    text: 'این محوطه دانشگاه است',
    words: ['校园', '这', '是'],
    answer: ['这', '是', '校园']
  },
  {
    type: 'build-en',
    speak: '这是宿舍',
    question: 'جمله چینی را بساز:',
    text: 'این خوابگاه است',
    words: ['宿舍', '这', '是'],
    answer: ['这', '是', '宿舍']
  },
  {
    type: 'build-en',
    speak: '这是实验室',
    question: 'جمله چینی را بساز:',
    text: 'این آزمایشگاه است',
    words: ['实验室', '这', '是'],
    answer: ['这', '是', '实验室']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是大学',
    question: 'ترجمه را بساز:',
    text: '这是大学',
    words: ['است', 'دانشگاه', 'این'],
    answer: ['این', 'دانشگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是学院',
    question: 'ترجمه را بساز:',
    text: '这是学院',
    words: ['است', 'کالج', 'این'],
    answer: ['این', 'کالج', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是校园',
    question: 'ترجمه را بساز:',
    text: '这是校园',
    words: ['است', 'محوطه دانشگاه', 'این'],
    answer: ['این', 'محوطه دانشگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是宿舍',
    question: 'ترجمه را بساز:',
    text: '这是宿舍',
    words: ['است', 'خوابگاه', 'این'],
    answer: ['این', 'خوابگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是实验室',
    question: 'ترجمه را بساز:',
    text: '这是实验室',
    words: ['است', 'آزمایشگاه', 'این'],
    answer: ['این', 'آزمایشگاه', 'است']
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