let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
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
  recognition.lang = 'de-DE';
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

// ===== سوالات درس ۴۸ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "die Universität" است؟',
    speak: 'die Universität',
    options: [
      { text: 'die Universität', image: '../../../media/a2/school/university.png' },
      { text: 'das College', image: '../../../media/a2/school/college.png' },
      { text: 'der Campus', image: '../../../media/a2/school/campus.png' },
      { text: 'das Labor', image: '../../../media/a2/school/laboratory.png' }
    ],
    answer: 'die Universität'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das College" است؟',
    speak: 'das College',
    options: [
      { text: 'die Universität', image: '../../../media/a2/school/university.png' },
      { text: 'das College', image: '../../../media/a2/school/college.png' },
      { text: 'das Wohnheim', image: '../../../media/a2/school/dormitory.png' },
      { text: 'der Campus', image: '../../../media/a2/school/campus.png' }
    ],
    answer: 'das College'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Campus" است؟',
    speak: 'der Campus',
    options: [
      { text: 'das Labor', image: '../../../media/a2/school/laboratory.png' },
      { text: 'die Universität', image: '../../../media/a2/school/university.png' },
      { text: 'der Campus', image: '../../../media/a2/school/campus.png' },
      { text: 'das College', image: '../../../media/a2/school/college.png' }
    ],
    answer: 'der Campus'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Wohnheim" است؟',
    speak: 'das Wohnheim',
    options: [
      { text: 'das College', image: '../../../media/a2/school/college.png' },
      { text: 'das Wohnheim', image: '../../../media/a2/school/dormitory.png' },
      { text: 'das Labor', image: '../../../media/a2/school/laboratory.png' },
      { text: 'die Universität', image: '../../../media/a2/school/university.png' }
    ],
    answer: 'das Wohnheim'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Labor" است؟',
    speak: 'das Labor',
    options: [
      { text: 'die Universität', image: '../../../media/a2/school/university.png' },
      { text: 'der Campus', image: '../../../media/a2/school/campus.png' },
      { text: 'das Labor', image: '../../../media/a2/school/laboratory.png' },
      { text: 'das Wohnheim', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: 'das Labor'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/university.png',
    options: ['die Universität', 'das College', 'der Campus', 'das Labor'],
    answer: 'die Universität'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/college.png',
    options: ['die Universität', 'das College', 'das Wohnheim', 'der Campus'],
    answer: 'das College'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/campus.png',
    options: ['das Labor', 'die Universität', 'der Campus', 'das College'],
    answer: 'der Campus'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dormitory.png',
    options: ['das College', 'das Wohnheim', 'das Labor', 'die Universität'],
    answer: 'das Wohnheim'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/laboratory.png',
    options: ['die Universität', 'der Campus', 'das Labor', 'das Wohnheim'],
    answer: 'das Labor'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'die Universität',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Universität', 'das College', 'der Campus', 'das Labor'],
    answer: 'die Universität'
  },
  {
    type: 'audio',
    speak: 'das College',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Universität', 'das College', 'das Wohnheim', 'der Campus'],
    answer: 'das College'
  },
  {
    type: 'audio',
    speak: 'der Campus',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Labor', 'die Universität', 'der Campus', 'das College'],
    answer: 'der Campus'
  },
  {
    type: 'audio',
    speak: 'das Wohnheim',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das College', 'das Wohnheim', 'das Labor', 'die Universität'],
    answer: 'das Wohnheim'
  },
  {
    type: 'audio',
    speak: 'das Labor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Universität', 'der Campus', 'das Labor', 'das Wohnheim'],
    answer: 'das Labor'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'die Universität',
    image: '../../../media/a2/school/university.png',
    meaning: 'دانشگاه'
  },
  {
    type: 'speak',
    word: 'das College',
    image: '../../../media/a2/school/college.png',
    meaning: 'کالج'
  },
  {
    type: 'speak',
    word: 'der Campus',
    image: '../../../media/a2/school/campus.png',
    meaning: 'محوطه دانشگاه'
  },
  {
    type: 'speak',
    word: 'das Wohnheim',
    image: '../../../media/a2/school/dormitory.png',
    meaning: 'خوابگاه'
  },
  {
    type: 'speak',
    word: 'das Labor',
    image: '../../../media/a2/school/laboratory.png',
    meaning: 'آزمایشگاه'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich gehe zur Universität',
    question: 'جمله آلمانی را بساز:',
    text: 'من به دانشگاه می‌روم',
    words: ['Universität', 'zur', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zur', 'Universität']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zum College',
    question: 'جمله آلمانی را بساز:',
    text: 'من به کالج می‌روم',
    words: ['College', 'zum', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zum', 'College']
  },
  {
    type: 'build-de',
    speak: 'Ich bin auf dem Campus',
    question: 'جمله آلمانی را بساز:',
    text: 'من در محوطه دانشگاه هستم',
    words: ['Campus', 'dem', 'auf', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'auf', 'dem', 'Campus']
  },
  {
    type: 'build-de',
    speak: 'Ich wohne in einem Wohnheim',
    question: 'جمله آلمانی را بساز:',
    text: 'من در یک خوابگاه زندگی می‌کنم',
    words: ['Wohnheim', 'einem', 'in', 'wohne', 'Ich'],
    answer: ['Ich', 'wohne', 'in', 'einem', 'Wohnheim']
  },
  {
    type: 'build-de',
    speak: 'Ich arbeite in einem Labor',
    question: 'جمله آلمانی را بساز:',
    text: 'من در یک آزمایشگاه کار می‌کنم',
    words: ['Labor', 'einem', 'in', 'arbeite', 'Ich'],
    answer: ['Ich', 'arbeite', 'in', 'einem', 'Labor']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich gehe zur Universität',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zur Universität',
    words: ['می‌روم', 'دانشگاه', 'به', 'من'],
    answer: ['من', 'به', 'دانشگاه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zum College',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zum College',
    words: ['می‌روم', 'کالج', 'به', 'من'],
    answer: ['من', 'به', 'کالج', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin auf dem Campus',
    question: 'ترجمه را بساز:',
    text: 'Ich bin auf dem Campus',
    words: ['هستم', 'محوطه دانشگاه', 'در', 'من'],
    answer: ['من', 'در', 'محوطه دانشگاه', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich wohne in einem Wohnheim',
    question: 'ترجمه را بساز:',
    text: 'Ich wohne in einem Wohnheim',
    words: ['زندگی می‌کنم', 'خوابگاه', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'خوابگاه', 'زندگی می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ich arbeite in einem Labor',
    question: 'ترجمه را بساز:',
    text: 'Ich arbeite in einem Labor',
    words: ['کار می‌کنم', 'آزمایشگاه', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'آزمایشگاه', 'کار می‌کنم']
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

  // ===== بخش BUILD DE / FA =====
  if (q.type === 'build-de' || q.type === 'build-fa') {
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

    if (q.type === 'build-de') {
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