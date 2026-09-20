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

// ===== سوالات درس ۴۶ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "das Heft" است؟',
    speak: 'das Heft',
    options: [
      { text: 'das Heft', image: '../../../media/a2/school/notebook.png' },
      { text: 'der Bleistift', image: '../../../media/a2/school/pencil.png' },
      { text: 'das Lineal', image: '../../../media/a2/school/ruler.png' },
      { text: 'der Taschenrechner', image: '../../../media/a2/school/calculator.png' }
    ],
    answer: 'das Heft'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Bleistift" است؟',
    speak: 'der Bleistift',
    options: [
      { text: 'das Heft', image: '../../../media/a2/school/notebook.png' },
      { text: 'der Bleistift', image: '../../../media/a2/school/pencil.png' },
      { text: 'der Radiergummi', image: '../../../media/a2/school/eraser.png' },
      { text: 'das Lineal', image: '../../../media/a2/school/ruler.png' }
    ],
    answer: 'der Bleistift'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Lineal" است؟',
    speak: 'das Lineal',
    options: [
      { text: 'der Taschenrechner', image: '../../../media/a2/school/calculator.png' },
      { text: 'das Heft', image: '../../../media/a2/school/notebook.png' },
      { text: 'das Lineal', image: '../../../media/a2/school/ruler.png' },
      { text: 'der Bleistift', image: '../../../media/a2/school/pencil.png' }
    ],
    answer: 'das Lineal'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Radiergummi" است؟',
    speak: 'der Radiergummi',
    options: [
      { text: 'der Bleistift', image: '../../../media/a2/school/pencil.png' },
      { text: 'der Radiergummi', image: '../../../media/a2/school/eraser.png' },
      { text: 'der Taschenrechner', image: '../../../media/a2/school/calculator.png' },
      { text: 'das Heft', image: '../../../media/a2/school/notebook.png' }
    ],
    answer: 'der Radiergummi'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Taschenrechner" است؟',
    speak: 'der Taschenrechner',
    options: [
      { text: 'das Heft', image: '../../../media/a2/school/notebook.png' },
      { text: 'das Lineal', image: '../../../media/a2/school/ruler.png' },
      { text: 'der Taschenrechner', image: '../../../media/a2/school/calculator.png' },
      { text: 'der Radiergummi', image: '../../../media/a2/school/eraser.png' }
    ],
    answer: 'der Taschenrechner'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/notebook.png',
    options: ['das Heft', 'der Bleistift', 'das Lineal', 'der Taschenrechner'],
    answer: 'das Heft'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/pencil.png',
    options: ['das Heft', 'der Bleistift', 'der Radiergummi', 'das Lineal'],
    answer: 'der Bleistift'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/ruler.png',
    options: ['der Taschenrechner', 'das Heft', 'das Lineal', 'der Bleistift'],
    answer: 'das Lineal'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/eraser.png',
    options: ['der Bleistift', 'der Radiergummi', 'der Taschenrechner', 'das Heft'],
    answer: 'der Radiergummi'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/calculator.png',
    options: ['das Heft', 'das Lineal', 'der Taschenrechner', 'der Radiergummi'],
    answer: 'der Taschenrechner'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'das Heft',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Heft', 'der Bleistift', 'das Lineal', 'der Taschenrechner'],
    answer: 'das Heft'
  },
  {
    type: 'audio',
    speak: 'der Bleistift',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Heft', 'der Bleistift', 'der Radiergummi', 'das Lineal'],
    answer: 'der Bleistift'
  },
  {
    type: 'audio',
    speak: 'das Lineal',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Taschenrechner', 'das Heft', 'das Lineal', 'der Bleistift'],
    answer: 'das Lineal'
  },
  {
    type: 'audio',
    speak: 'der Radiergummi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bleistift', 'der Radiergummi', 'der Taschenrechner', 'das Heft'],
    answer: 'der Radiergummi'
  },
  {
    type: 'audio',
    speak: 'der Taschenrechner',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Heft', 'das Lineal', 'der Taschenrechner', 'der Radiergummi'],
    answer: 'der Taschenrechner'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'das Heft',
    image: '../../../media/a2/school/notebook.png',
    meaning: 'دفتر'
  },
  {
    type: 'speak',
    word: 'der Bleistift',
    image: '../../../media/a2/school/pencil.png',
    meaning: 'مداد'
  },
  {
    type: 'speak',
    word: 'das Lineal',
    image: '../../../media/a2/school/ruler.png',
    meaning: 'خط‌کش'
  },
  {
    type: 'speak',
    word: 'der Radiergummi',
    image: '../../../media/a2/school/eraser.png',
    meaning: 'پاک‌کن'
  },
  {
    type: 'speak',
    word: 'der Taschenrechner',
    image: '../../../media/a2/school/calculator.png',
    meaning: 'ماشین حساب'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe ein Heft',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک دفتر دارم',
    words: ['Heft', 'ein', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'ein', 'Heft']
  },
  {
    type: 'build-de',
    speak: 'Ich habe einen Bleistift',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک مداد دارم',
    words: ['Bleistift', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Bleistift']
  },
  {
    type: 'build-de',
    speak: 'Ich habe ein Lineal',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک خط‌کش دارم',
    words: ['Lineal', 'ein', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'ein', 'Lineal']
  },
  {
    type: 'build-de',
    speak: 'Ich habe einen Radiergummi',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک پاک‌کن دارم',
    words: ['Radiergummi', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Radiergummi']
  },
  {
    type: 'build-de',
    speak: 'Ich habe einen Taschenrechner',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ماشین حساب دارم',
    words: ['Taschenrechner', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Taschenrechner']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe ein Heft',
    question: 'ترجمه را بساز:',
    text: 'Ich habe ein Heft',
    words: ['دارم', 'دفتر', 'یک', 'من'],
    answer: ['من', 'یک', 'دفتر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe einen Bleistift',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Bleistift',
    words: ['دارم', 'مداد', 'یک', 'من'],
    answer: ['من', 'یک', 'مداد', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe ein Lineal',
    question: 'ترجمه را بساز:',
    text: 'Ich habe ein Lineal',
    words: ['دارم', 'خط‌کش', 'یک', 'من'],
    answer: ['من', 'یک', 'خط‌کش', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe einen Radiergummi',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Radiergummi',
    words: ['دارم', 'پاک‌کن', 'یک', 'من'],
    answer: ['من', 'یک', 'پاک‌کن', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe einen Taschenrechner',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Taschenrechner',
    words: ['دارم', 'ماشین حساب', 'یک', 'من'],
    answer: ['من', 'یک', 'ماشین حساب', 'دارم']
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