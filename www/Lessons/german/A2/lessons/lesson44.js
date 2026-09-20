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

// ===== سوالات درس ۴۴ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "die Allergie" است؟',
    speak: 'die Allergie',
    options: [
      { text: 'die Allergie', image: '../../../media/a2/health/allergy.png' },
      { text: 'die Infektion', image: '../../../media/a2/health/infection.png' },
      { text: 'die Verletzung', image: '../../../media/a2/health/injury.png' },
      { text: 'die Narbe', image: '../../../media/a2/health/scar.png' }
    ],
    answer: 'die Allergie'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Infektion" است؟',
    speak: 'die Infektion',
    options: [
      { text: 'die Allergie', image: '../../../media/a2/health/allergy.png' },
      { text: 'die Infektion', image: '../../../media/a2/health/infection.png' },
      { text: 'die Wunde', image: '../../../media/a2/health/wound.png' },
      { text: 'die Verletzung', image: '../../../media/a2/health/injury.png' }
    ],
    answer: 'die Infektion'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Verletzung" است؟',
    speak: 'die Verletzung',
    options: [
      { text: 'die Narbe', image: '../../../media/a2/health/scar.png' },
      { text: 'die Allergie', image: '../../../media/a2/health/allergy.png' },
      { text: 'die Verletzung', image: '../../../media/a2/health/injury.png' },
      { text: 'die Infektion', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'die Verletzung'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Wunde" است؟',
    speak: 'die Wunde',
    options: [
      { text: 'die Infektion', image: '../../../media/a2/health/infection.png' },
      { text: 'die Wunde', image: '../../../media/a2/health/wound.png' },
      { text: 'die Narbe', image: '../../../media/a2/health/scar.png' },
      { text: 'die Allergie', image: '../../../media/a2/health/allergy.png' }
    ],
    answer: 'die Wunde'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Narbe" است؟',
    speak: 'die Narbe',
    options: [
      { text: 'die Allergie', image: '../../../media/a2/health/allergy.png' },
      { text: 'die Verletzung', image: '../../../media/a2/health/injury.png' },
      { text: 'die Narbe', image: '../../../media/a2/health/scar.png' },
      { text: 'die Wunde', image: '../../../media/a2/health/wound.png' }
    ],
    answer: 'die Narbe'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/allergy.png',
    options: ['die Allergie', 'die Infektion', 'die Verletzung', 'die Narbe'],
    answer: 'die Allergie'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/infection.png',
    options: ['die Allergie', 'die Infektion', 'die Wunde', 'die Verletzung'],
    answer: 'die Infektion'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injury.png',
    options: ['die Narbe', 'die Allergie', 'die Verletzung', 'die Infektion'],
    answer: 'die Verletzung'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wound.png',
    options: ['die Infektion', 'die Wunde', 'die Narbe', 'die Allergie'],
    answer: 'die Wunde'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/scar.png',
    options: ['die Allergie', 'die Verletzung', 'die Narbe', 'die Wunde'],
    answer: 'die Narbe'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'die Allergie',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Allergie', 'die Infektion', 'die Verletzung', 'die Narbe'],
    answer: 'die Allergie'
  },
  {
    type: 'audio',
    speak: 'die Infektion',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Allergie', 'die Infektion', 'die Wunde', 'die Verletzung'],
    answer: 'die Infektion'
  },
  {
    type: 'audio',
    speak: 'die Verletzung',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Narbe', 'die Allergie', 'die Verletzung', 'die Infektion'],
    answer: 'die Verletzung'
  },
  {
    type: 'audio',
    speak: 'die Wunde',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Infektion', 'die Wunde', 'die Narbe', 'die Allergie'],
    answer: 'die Wunde'
  },
  {
    type: 'audio',
    speak: 'die Narbe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Allergie', 'die Verletzung', 'die Narbe', 'die Wunde'],
    answer: 'die Narbe'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'die Allergie',
    image: '../../../media/a2/health/allergy.png',
    meaning: 'حساسیت'
  },
  {
    type: 'speak',
    word: 'die Infektion',
    image: '../../../media/a2/health/infection.png',
    meaning: 'عفونت'
  },
  {
    type: 'speak',
    word: 'die Verletzung',
    image: '../../../media/a2/health/injury.png',
    meaning: 'آسیب'
  },
  {
    type: 'speak',
    word: 'die Wunde',
    image: '../../../media/a2/health/wound.png',
    meaning: 'زخم'
  },
  {
    type: 'speak',
    word: 'die Narbe',
    image: '../../../media/a2/health/scar.png',
    meaning: 'جای زخم'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe eine Allergie',
    question: 'جمله آلمانی را بساز:',
    text: 'من حساسیت دارم',
    words: ['Allergie', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Allergie']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Infektion',
    question: 'جمله آلمانی را بساز:',
    text: 'من عفونت دارم',
    words: ['Infektion', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Infektion']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Verletzung',
    question: 'جمله آلمانی را بساز:',
    text: 'من آسیب دارم',
    words: ['Verletzung', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Verletzung']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Wunde',
    question: 'جمله آلمانی را بساز:',
    text: 'من زخم دارم',
    words: ['Wunde', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Wunde']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Narbe',
    question: 'جمله آلمانی را بساز:',
    text: 'من جای زخم دارم',
    words: ['Narbe', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Narbe']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe eine Allergie',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Allergie',
    words: ['دارم', 'حساسیت', 'یک', 'من'],
    answer: ['من', 'یک', 'حساسیت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Infektion',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Infektion',
    words: ['دارم', 'عفونت', 'یک', 'من'],
    answer: ['من', 'یک', 'عفونت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Verletzung',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Verletzung',
    words: ['دارم', 'آسیب', 'یک', 'من'],
    answer: ['من', 'یک', 'آسیب', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Wunde',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Wunde',
    words: ['دارم', 'زخم', 'یک', 'من'],
    answer: ['من', 'یک', 'زخم', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Narbe',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Narbe',
    words: ['دارم', 'جای زخم', 'یک', 'من'],
    answer: ['من', 'یک', 'جای زخم', 'دارم']
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