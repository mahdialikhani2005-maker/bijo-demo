let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
  recognition.lang = 'es-ES';
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

// ===== سوالات درس ۴۴ - اسپانیایی به فارسی (زخم‌ها و عفونت‌ها) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la alergia" است؟',
    speak: 'la alergia',
    options: [
      { text: 'la alergia', image: '../../../media/a2/health/allergy.png' },
      { text: 'la infección', image: '../../../media/a2/health/infection.png' },
      { text: 'la lesión', image: '../../../media/a2/health/injury.png' },
      { text: 'la herida', image: '../../../media/a2/health/wound.png' }
    ],
    answer: 'la alergia'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la infección" است؟',
    speak: 'la infección',
    options: [
      { text: 'la alergia', image: '../../../media/a2/health/allergy.png' },
      { text: 'la infección', image: '../../../media/a2/health/infection.png' },
      { text: 'la cicatriz', image: '../../../media/a2/health/scar.png' },
      { text: 'la lesión', image: '../../../media/a2/health/injury.png' }
    ],
    answer: 'la infección'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la lesión" است؟',
    speak: 'la lesión',
    options: [
      { text: 'la herida', image: '../../../media/a2/health/wound.png' },
      { text: 'la alergia', image: '../../../media/a2/health/allergy.png' },
      { text: 'la lesión', image: '../../../media/a2/health/injury.png' },
      { text: 'la infección', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'la lesión'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la herida" است؟',
    speak: 'la herida',
    options: [
      { text: 'la alergia', image: '../../../media/a2/health/allergy.png' },
      { text: 'la herida', image: '../../../media/a2/health/wound.png' },
      { text: 'la lesión', image: '../../../media/a2/health/injury.png' },
      { text: 'la cicatriz', image: '../../../media/a2/health/scar.png' }
    ],
    answer: 'la herida'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la cicatriz" است؟',
    speak: 'la cicatriz',
    options: [
      { text: 'la infección', image: '../../../media/a2/health/infection.png' },
      { text: 'la cicatriz', image: '../../../media/a2/health/scar.png' },
      { text: 'la herida', image: '../../../media/a2/health/wound.png' },
      { text: 'la alergia', image: '../../../media/a2/health/allergy.png' }
    ],
    answer: 'la cicatriz'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/allergy.png',
    options: ['la alergia', 'la infección', 'la lesión', 'la herida'],
    answer: 'la alergia'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/infection.png',
    options: ['la alergia', 'la infección', 'la cicatriz', 'la lesión'],
    answer: 'la infección'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injury.png',
    options: ['la herida', 'la alergia', 'la lesión', 'la infección'],
    answer: 'la lesión'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wound.png',
    options: ['la alergia', 'la herida', 'la lesión', 'la cicatriz'],
    answer: 'la herida'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/scar.png',
    options: ['la infección', 'la cicatriz', 'la herida', 'la alergia'],
    answer: 'la cicatriz'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la alergia',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la alergia', 'la infección', 'la lesión', 'la herida'],
    answer: 'la alergia'
  },
  {
    type: 'audio',
    speak: 'la infección',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la alergia', 'la infección', 'la cicatriz', 'la lesión'],
    answer: 'la infección'
  },
  {
    type: 'audio',
    speak: 'la lesión',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la herida', 'la alergia', 'la lesión', 'la infección'],
    answer: 'la lesión'
  },
  {
    type: 'audio',
    speak: 'la herida',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la alergia', 'la herida', 'la lesión', 'la cicatriz'],
    answer: 'la herida'
  },
  {
    type: 'audio',
    speak: 'la cicatriz',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la infección', 'la cicatriz', 'la herida', 'la alergia'],
    answer: 'la cicatriz'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la alergia',
    image: '../../../media/a2/health/allergy.png',
    meaning: 'حساسیت'
  },
  {
    type: 'speak',
    word: 'la infección',
    image: '../../../media/a2/health/infection.png',
    meaning: 'عفونت'
  },
  {
    type: 'speak',
    word: 'la lesión',
    image: '../../../media/a2/health/injury.png',
    meaning: 'آسیب'
  },
  {
    type: 'speak',
    word: 'la herida',
    image: '../../../media/a2/health/wound.png',
    meaning: 'زخم'
  },
  {
    type: 'speak',
    word: 'la cicatriz',
    image: '../../../media/a2/health/scar.png',
    meaning: 'جای زخم'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Tengo alergia',
    question: 'جمله اسپانیایی را بساز:',
    text: 'من حساسیت دارم',
    words: ['alergia', 'Tengo'],
    answer: ['Tengo', 'alergia']
  },
  {
    type: 'build-es',
    speak: 'Esto es una infección',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک عفونت است',
    words: ['infección', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'infección']
  },
  {
    type: 'build-es',
    speak: 'Esto es una lesión',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک آسیب است',
    words: ['lesión', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'lesión']
  },
  {
    type: 'build-es',
    speak: 'Esto es una herida',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک زخم است',
    words: ['herida', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'herida']
  },
  {
    type: 'build-es',
    speak: 'Esto es una cicatriz',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک جای زخم است',
    words: ['cicatriz', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'cicatriz']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Tengo alergia',
    question: 'ترجمه را بساز:',
    text: 'Tengo alergia',
    words: ['دارم', 'حساسیت', 'من'],
    answer: ['من', 'حساسیت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una infección',
    question: 'ترجمه را بساز:',
    text: 'Esto es una infección',
    words: ['است', 'عفونت', 'یک', 'این'],
    answer: ['این', 'یک', 'عفونت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una lesión',
    question: 'ترجمه را بساز:',
    text: 'Esto es una lesión',
    words: ['است', 'آسیب', 'یک', 'این'],
    answer: ['این', 'یک', 'آسیب', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una herida',
    question: 'ترجمه را بساز:',
    text: 'Esto es una herida',
    words: ['است', 'زخم', 'یک', 'این'],
    answer: ['این', 'یک', 'زخم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una cicatriz',
    question: 'ترجمه را بساز:',
    text: 'Esto es una cicatriz',
    words: ['است', 'جای زخم', 'یک', 'این'],
    answer: ['این', 'یک', 'جای زخم', 'است']
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

  // ===== بخش BUILD ES / FA =====
  if (q.type === 'build-es' || q.type === 'build-fa') {
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

    if (q.type === 'build-es') {
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