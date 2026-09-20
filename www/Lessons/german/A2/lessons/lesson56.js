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

// ===== سوالات درس ۵۶ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Computer" است؟',
    speak: 'der Computer',
    options: [
      { text: 'der Computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'die Tastatur', image: '../../../media/a2/tech/keyboard.png' },
      { text: 'die Maus', image: '../../../media/a2/tech/mouse.png' },
      { text: 'die E-Mail', image: '../../../media/a2/tech/email.png' }
    ],
    answer: 'der Computer'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Tastatur" است؟',
    speak: 'die Tastatur',
    options: [
      { text: 'der Computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'die Tastatur', image: '../../../media/a2/tech/keyboard.png' },
      { text: 'das Internet', image: '../../../media/a2/tech/internet.png' },
      { text: 'die Maus', image: '../../../media/a2/tech/mouse.png' }
    ],
    answer: 'die Tastatur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Maus" است؟',
    speak: 'die Maus',
    options: [
      { text: 'die E-Mail', image: '../../../media/a2/tech/email.png' },
      { text: 'der Computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'die Maus', image: '../../../media/a2/tech/mouse.png' },
      { text: 'die Tastatur', image: '../../../media/a2/tech/keyboard.png' }
    ],
    answer: 'die Maus'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Internet" است؟',
    speak: 'das Internet',
    options: [
      { text: 'die Tastatur', image: '../../../media/a2/tech/keyboard.png' },
      { text: 'das Internet', image: '../../../media/a2/tech/internet.png' },
      { text: 'die E-Mail', image: '../../../media/a2/tech/email.png' },
      { text: 'der Computer', image: '../../../media/a2/tech/computer.png' }
    ],
    answer: 'das Internet'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die E-Mail" است؟',
    speak: 'die E-Mail',
    options: [
      { text: 'der Computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'die Maus', image: '../../../media/a2/tech/mouse.png' },
      { text: 'die E-Mail', image: '../../../media/a2/tech/email.png' },
      { text: 'das Internet', image: '../../../media/a2/tech/internet.png' }
    ],
    answer: 'die E-Mail'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/computer.png',
    options: ['der Computer', 'die Tastatur', 'die Maus', 'die E-Mail'],
    answer: 'der Computer'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/keyboard.png',
    options: ['der Computer', 'die Tastatur', 'das Internet', 'die Maus'],
    answer: 'die Tastatur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/mouse.png',
    options: ['die E-Mail', 'der Computer', 'die Maus', 'die Tastatur'],
    answer: 'die Maus'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/internet.png',
    options: ['die Tastatur', 'das Internet', 'die E-Mail', 'der Computer'],
    answer: 'das Internet'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/email.png',
    options: ['der Computer', 'die Maus', 'die E-Mail', 'das Internet'],
    answer: 'die E-Mail'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Computer',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Computer', 'die Tastatur', 'die Maus', 'die E-Mail'],
    answer: 'der Computer'
  },
  {
    type: 'audio',
    speak: 'die Tastatur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Computer', 'die Tastatur', 'das Internet', 'die Maus'],
    answer: 'die Tastatur'
  },
  {
    type: 'audio',
    speak: 'die Maus',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die E-Mail', 'der Computer', 'die Maus', 'die Tastatur'],
    answer: 'die Maus'
  },
  {
    type: 'audio',
    speak: 'das Internet',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Tastatur', 'das Internet', 'die E-Mail', 'der Computer'],
    answer: 'das Internet'
  },
  {
    type: 'audio',
    speak: 'die E-Mail',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Computer', 'die Maus', 'die E-Mail', 'das Internet'],
    answer: 'die E-Mail'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Computer',
    image: '../../../media/a2/tech/computer.png',
    meaning: 'کامپیوتر'
  },
  {
    type: 'speak',
    word: 'die Tastatur',
    image: '../../../media/a2/tech/keyboard.png',
    meaning: 'صفحه کلید'
  },
  {
    type: 'speak',
    word: 'die Maus',
    image: '../../../media/a2/tech/mouse.png',
    meaning: 'موشواره'
  },
  {
    type: 'speak',
    word: 'das Internet',
    image: '../../../media/a2/tech/internet.png',
    meaning: 'اینترنت'
  },
  {
    type: 'speak',
    word: 'die E-Mail',
    image: '../../../media/a2/tech/email.png',
    meaning: 'ایمیل'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe einen Computer',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کامپیوتر دارم',
    words: ['Computer', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Computer']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Tastatur',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک صفحه کلید دارم',
    words: ['Tastatur', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Tastatur']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Maus',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک موشواره دارم',
    words: ['Maus', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Maus']
  },
  {
    type: 'build-de',
    speak: 'Ich habe Internet',
    question: 'جمله آلمانی را بساز:',
    text: 'من اینترنت دارم',
    words: ['Internet', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'Internet']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine E-Mail',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ایمیل دارم',
    words: ['E-Mail', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'E-Mail']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe einen Computer',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Computer',
    words: ['دارم', 'کامپیوتر', 'یک', 'من'],
    answer: ['من', 'یک', 'کامپیوتر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Tastatur',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Tastatur',
    words: ['دارم', 'صفحه کلید', 'یک', 'من'],
    answer: ['من', 'یک', 'صفحه کلید', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Maus',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Maus',
    words: ['دارم', 'موشواره', 'یک', 'من'],
    answer: ['من', 'یک', 'موشواره', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe Internet',
    question: 'ترجمه را بساز:',
    text: 'Ich habe Internet',
    words: ['دارم', 'اینترنت', 'من'],
    answer: ['من', 'اینترنت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine E-Mail',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine E-Mail',
    words: ['دارم', 'ایمیل', 'یک', 'من'],
    answer: ['من', 'یک', 'ایمیل', 'دارم']
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