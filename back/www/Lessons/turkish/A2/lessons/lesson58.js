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

// ===== سوالات درس ۵۸ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "die Software" است؟',
    speak: 'die Software',
    options: [
      { text: 'die Software', image: '../../../media/a2/tech/software.png' },
      { text: 'die Hardware', image: '../../../media/a2/tech/hardware.png' },
      { text: 'das Update', image: '../../../media/a2/tech/update.png' },
      { text: 'das Passwort', image: '../../../media/a2/tech/password.png' }
    ],
    answer: 'die Software'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Hardware" است؟',
    speak: 'die Hardware',
    options: [
      { text: 'die Software', image: '../../../media/a2/tech/software.png' },
      { text: 'die Hardware', image: '../../../media/a2/tech/hardware.png' },
      { text: 'der Account', image: '../../../media/a2/tech/account.png' },
      { text: 'das Update', image: '../../../media/a2/tech/update.png' }
    ],
    answer: 'die Hardware'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Update" است؟',
    speak: 'das Update',
    options: [
      { text: 'das Passwort', image: '../../../media/a2/tech/password.png' },
      { text: 'die Software', image: '../../../media/a2/tech/software.png' },
      { text: 'das Update', image: '../../../media/a2/tech/update.png' },
      { text: 'die Hardware', image: '../../../media/a2/tech/hardware.png' }
    ],
    answer: 'das Update'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Passwort" است؟',
    speak: 'das Passwort',
    options: [
      { text: 'die Hardware', image: '../../../media/a2/tech/hardware.png' },
      { text: 'das Passwort', image: '../../../media/a2/tech/password.png' },
      { text: 'der Account', image: '../../../media/a2/tech/account.png' },
      { text: 'die Software', image: '../../../media/a2/tech/software.png' }
    ],
    answer: 'das Passwort'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Account" است؟',
    speak: 'der Account',
    options: [
      { text: 'die Software', image: '../../../media/a2/tech/software.png' },
      { text: 'das Update', image: '../../../media/a2/tech/update.png' },
      { text: 'der Account', image: '../../../media/a2/tech/account.png' },
      { text: 'das Passwort', image: '../../../media/a2/tech/password.png' }
    ],
    answer: 'der Account'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/software.png',
    options: ['die Software', 'die Hardware', 'das Update', 'das Passwort'],
    answer: 'die Software'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/hardware.png',
    options: ['die Software', 'die Hardware', 'der Account', 'das Update'],
    answer: 'die Hardware'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/update.png',
    options: ['das Passwort', 'die Software', 'das Update', 'die Hardware'],
    answer: 'das Update'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/password.png',
    options: ['die Hardware', 'das Passwort', 'der Account', 'die Software'],
    answer: 'das Passwort'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/account.png',
    options: ['die Software', 'das Update', 'der Account', 'das Passwort'],
    answer: 'der Account'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'die Software',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Software', 'die Hardware', 'das Update', 'das Passwort'],
    answer: 'die Software'
  },
  {
    type: 'audio',
    speak: 'die Hardware',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Software', 'die Hardware', 'der Account', 'das Update'],
    answer: 'die Hardware'
  },
  {
    type: 'audio',
    speak: 'das Update',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Passwort', 'die Software', 'das Update', 'die Hardware'],
    answer: 'das Update'
  },
  {
    type: 'audio',
    speak: 'das Passwort',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Hardware', 'das Passwort', 'der Account', 'die Software'],
    answer: 'das Passwort'
  },
  {
    type: 'audio',
    speak: 'der Account',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Software', 'das Update', 'der Account', 'das Passwort'],
    answer: 'der Account'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'die Software',
    image: '../../../media/a2/tech/software.png',
    meaning: 'نرم‌افزار'
  },
  {
    type: 'speak',
    word: 'die Hardware',
    image: '../../../media/a2/tech/hardware.png',
    meaning: 'سخت‌افزار'
  },
  {
    type: 'speak',
    word: 'das Update',
    image: '../../../media/a2/tech/update.png',
    meaning: 'به‌روزرسانی'
  },
  {
    type: 'speak',
    word: 'das Passwort',
    image: '../../../media/a2/tech/password.png',
    meaning: 'رمز عبور'
  },
  {
    type: 'speak',
    word: 'der Account',
    image: '../../../media/a2/tech/account.png',
    meaning: 'حساب کاربری'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe eine Software',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک نرم‌افزار دارم',
    words: ['Software', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Software']
  },
  {
    type: 'build-de',
    speak: 'Ich habe Hardware',
    question: 'جمله آلمانی را بساز:',
    text: 'من سخت‌افزار دارم',
    words: ['Hardware', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'Hardware']
  },
  {
    type: 'build-de',
    speak: 'Ich mache ein Update',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک به‌روزرسانی انجام می‌دهم',
    words: ['Update', 'ein', 'mache', 'Ich'],
    answer: ['Ich', 'mache', 'ein', 'Update']
  },
  {
    type: 'build-de',
    speak: 'Ich habe ein Passwort',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک رمز عبور دارم',
    words: ['Passwort', 'ein', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'ein', 'Passwort']
  },
  {
    type: 'build-de',
    speak: 'Ich habe einen Account',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک حساب کاربری دارم',
    words: ['Account', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Account']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe eine Software',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Software',
    words: ['دارم', 'نرم‌افزار', 'یک', 'من'],
    answer: ['من', 'یک', 'نرم‌افزار', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe Hardware',
    question: 'ترجمه را بساز:',
    text: 'Ich habe Hardware',
    words: ['دارم', 'سخت‌افزار', 'من'],
    answer: ['من', 'سخت‌افزار', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich mache ein Update',
    question: 'ترجمه را بساز:',
    text: 'Ich mache ein Update',
    words: ['می‌کنم', 'به‌روزرسانی', 'یک', 'انجام', 'من'],
    answer: ['من', 'یک', 'به‌روزرسانی', 'انجام', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe ein Passwort',
    question: 'ترجمه را بساز:',
    text: 'Ich habe ein Passwort',
    words: ['دارم', 'رمز عبور', 'یک', 'من'],
    answer: ['من', 'یک', 'رمز عبور', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe einen Account',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Account',
    words: ['دارم', 'حساب کاربری', 'یک', 'من'],
    answer: ['من', 'یک', 'حساب کاربری', 'دارم']
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