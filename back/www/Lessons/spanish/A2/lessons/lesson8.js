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

// ===== سوالات درس ۸ - اسپانیایی به فارسی (بخش‌های خانه) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el balcón" است؟',
    speak: 'el balcón',
    options: [
      { text: 'el balcón', image: '../../../media/a2/house/balcony.png' },
      { text: 'el garaje', image: '../../../media/a2/house/garage.png' },
      { text: 'el sótano', image: '../../../media/a2/house/basement.png' },
      { text: 'el ático', image: '../../../media/a2/house/attic.png' }
    ],
    answer: 'el balcón'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el garaje" است؟',
    speak: 'el garaje',
    options: [
      { text: 'el balcón', image: '../../../media/a2/house/balcony.png' },
      { text: 'el garaje', image: '../../../media/a2/house/garage.png' },
      { text: 'el patio', image: '../../../media/a2/house/yard.png' },
      { text: 'el sótano', image: '../../../media/a2/house/basement.png' }
    ],
    answer: 'el garaje'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el sótano" است؟',
    speak: 'el sótano',
    options: [
      { text: 'el ático', image: '../../../media/a2/house/attic.png' },
      { text: 'el balcón', image: '../../../media/a2/house/balcony.png' },
      { text: 'el sótano', image: '../../../media/a2/house/basement.png' },
      { text: 'el garaje', image: '../../../media/a2/house/garage.png' }
    ],
    answer: 'el sótano'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el ático" است؟',
    speak: 'el ático',
    options: [
      { text: 'el balcón', image: '../../../media/a2/house/balcony.png' },
      { text: 'el ático', image: '../../../media/a2/house/attic.png' },
      { text: 'el garaje', image: '../../../media/a2/house/garage.png' },
      { text: 'el patio', image: '../../../media/a2/house/yard.png' }
    ],
    answer: 'el ático'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el patio" است؟',
    speak: 'el patio',
    options: [
      { text: 'el sótano', image: '../../../media/a2/house/basement.png' },
      { text: 'el ático', image: '../../../media/a2/house/attic.png' },
      { text: 'el patio', image: '../../../media/a2/house/yard.png' },
      { text: 'el balcón', image: '../../../media/a2/house/balcony.png' }
    ],
    answer: 'el patio'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/balcony.png',
    options: ['el balcón', 'el garaje', 'el sótano', 'el ático'],
    answer: 'el balcón'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/garage.png',
    options: ['el balcón', 'el garaje', 'el patio', 'el sótano'],
    answer: 'el garaje'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/basement.png',
    options: ['el ático', 'el balcón', 'el sótano', 'el garaje'],
    answer: 'el sótano'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/attic.png',
    options: ['el balcón', 'el ático', 'el garaje', 'el patio'],
    answer: 'el ático'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/yard.png',
    options: ['el sótano', 'el ático', 'el patio', 'el balcón'],
    answer: 'el patio'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el balcón',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el balcón', 'el garaje', 'el sótano', 'el ático'],
    answer: 'el balcón'
  },
  {
    type: 'audio',
    speak: 'el garaje',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el balcón', 'el garaje', 'el patio', 'el sótano'],
    answer: 'el garaje'
  },
  {
    type: 'audio',
    speak: 'el sótano',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el ático', 'el balcón', 'el sótano', 'el garaje'],
    answer: 'el sótano'
  },
  {
    type: 'audio',
    speak: 'el ático',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el balcón', 'el ático', 'el garaje', 'el patio'],
    answer: 'el ático'
  },
  {
    type: 'audio',
    speak: 'el patio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el sótano', 'el ático', 'el patio', 'el balcón'],
    answer: 'el patio'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el balcón',
    image: '../../../media/a2/house/balcony.png',
    meaning: 'بالکن'
  },
  {
    type: 'speak',
    word: 'el garaje',
    image: '../../../media/a2/house/garage.png',
    meaning: 'گاراژ'
  },
  {
    type: 'speak',
    word: 'el sótano',
    image: '../../../media/a2/house/basement.png',
    meaning: 'زیرزمین'
  },
  {
    type: 'speak',
    word: 'el ático',
    image: '../../../media/a2/house/attic.png',
    meaning: 'اتاق زیرشیروانی'
  },
  {
    type: 'speak',
    word: 'el patio',
    image: '../../../media/a2/house/yard.png',
    meaning: 'حیاط'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un balcón',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک بالکن است',
    words: ['balcón', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'balcón']
  },
  {
    type: 'build-es',
    speak: 'Esto es un garaje',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک گاراژ است',
    words: ['garaje', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'garaje']
  },
  {
    type: 'build-es',
    speak: 'Esto es un sótano',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک زیرزمین است',
    words: ['sótano', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'sótano']
  },
  {
    type: 'build-es',
    speak: 'Esto es un ático',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک اتاق زیرشیروانی است',
    words: ['ático', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'ático']
  },
  {
    type: 'build-es',
    speak: 'Esto es un patio',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک حیاط است',
    words: ['patio', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'patio']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un balcón',
    question: 'ترجمه را بساز:',
    text: 'Esto es un balcón',
    words: ['است', 'بالکن', 'یک', 'این'],
    answer: ['این', 'یک', 'بالکن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un garaje',
    question: 'ترجمه را بساز:',
    text: 'Esto es un garaje',
    words: ['است', 'گاراژ', 'یک', 'این'],
    answer: ['این', 'یک', 'گاراژ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un sótano',
    question: 'ترجمه را بساز:',
    text: 'Esto es un sótano',
    words: ['است', 'زیرزمین', 'یک', 'این'],
    answer: ['این', 'یک', 'زیرزمین', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un ático',
    question: 'ترجمه را بساز:',
    text: 'Esto es un ático',
    words: ['است', 'اتاق زیرشیروانی', 'یک', 'این'],
    answer: ['این', 'یک', 'اتاق زیرشیروانی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un patio',
    question: 'ترجمه را بساز:',
    text: 'Esto es un patio',
    words: ['است', 'حیاط', 'یک', 'این'],
    answer: ['این', 'یک', 'حیاط', 'است']
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