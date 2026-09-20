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

// ===== سوالات درس ۱۱ - اسپانیایی به فارسی (مکان‌های شهر) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el banco" است؟',
    speak: 'el banco',
    options: [
      { text: 'el banco', image: '../../../media/a2/city/bank.png' },
      { text: 'la biblioteca', image: '../../../media/a2/city/library.png' },
      { text: 'el cine', image: '../../../media/a2/city/cinema.png' },
      { text: 'el museo', image: '../../../media/a2/city/museum.png' }
    ],
    answer: 'el banco'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la biblioteca" است؟',
    speak: 'la biblioteca',
    options: [
      { text: 'el banco', image: '../../../media/a2/city/bank.png' },
      { text: 'la biblioteca', image: '../../../media/a2/city/library.png' },
      { text: 'el restaurante', image: '../../../media/a2/city/restaurant.png' },
      { text: 'el cine', image: '../../../media/a2/city/cinema.png' }
    ],
    answer: 'la biblioteca'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el cine" است؟',
    speak: 'el cine',
    options: [
      { text: 'el museo', image: '../../../media/a2/city/museum.png' },
      { text: 'el banco', image: '../../../media/a2/city/bank.png' },
      { text: 'el cine', image: '../../../media/a2/city/cinema.png' },
      { text: 'la biblioteca', image: '../../../media/a2/city/library.png' }
    ],
    answer: 'el cine'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el museo" است؟',
    speak: 'el museo',
    options: [
      { text: 'el banco', image: '../../../media/a2/city/bank.png' },
      { text: 'el museo', image: '../../../media/a2/city/museum.png' },
      { text: 'el cine', image: '../../../media/a2/city/cinema.png' },
      { text: 'el restaurante', image: '../../../media/a2/city/restaurant.png' }
    ],
    answer: 'el museo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el restaurante" است؟',
    speak: 'el restaurante',
    options: [
      { text: 'la biblioteca', image: '../../../media/a2/city/library.png' },
      { text: 'el museo', image: '../../../media/a2/city/museum.png' },
      { text: 'el restaurante', image: '../../../media/a2/city/restaurant.png' },
      { text: 'el banco', image: '../../../media/a2/city/bank.png' }
    ],
    answer: 'el restaurante'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bank.png',
    options: ['el banco', 'la biblioteca', 'el cine', 'el museo'],
    answer: 'el banco'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/library.png',
    options: ['el banco', 'la biblioteca', 'el restaurante', 'el cine'],
    answer: 'la biblioteca'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/cinema.png',
    options: ['el museo', 'el banco', 'el cine', 'la biblioteca'],
    answer: 'el cine'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/museum.png',
    options: ['el banco', 'el museo', 'el cine', 'el restaurante'],
    answer: 'el museo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/restaurant.png',
    options: ['la biblioteca', 'el museo', 'el restaurante', 'el banco'],
    answer: 'el restaurante'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el banco',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el banco', 'la biblioteca', 'el cine', 'el museo'],
    answer: 'el banco'
  },
  {
    type: 'audio',
    speak: 'la biblioteca',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el banco', 'la biblioteca', 'el restaurante', 'el cine'],
    answer: 'la biblioteca'
  },
  {
    type: 'audio',
    speak: 'el cine',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el museo', 'el banco', 'el cine', 'la biblioteca'],
    answer: 'el cine'
  },
  {
    type: 'audio',
    speak: 'el museo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el banco', 'el museo', 'el cine', 'el restaurante'],
    answer: 'el museo'
  },
  {
    type: 'audio',
    speak: 'el restaurante',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la biblioteca', 'el museo', 'el restaurante', 'el banco'],
    answer: 'el restaurante'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el banco',
    image: '../../../media/a2/city/bank.png',
    meaning: 'بانک'
  },
  {
    type: 'speak',
    word: 'la biblioteca',
    image: '../../../media/a2/city/library.png',
    meaning: 'کتابخانه'
  },
  {
    type: 'speak',
    word: 'el cine',
    image: '../../../media/a2/city/cinema.png',
    meaning: 'سینما'
  },
  {
    type: 'speak',
    word: 'el museo',
    image: '../../../media/a2/city/museum.png',
    meaning: 'موزه'
  },
  {
    type: 'speak',
    word: 'el restaurante',
    image: '../../../media/a2/city/restaurant.png',
    meaning: 'رستوران'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un banco',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک بانک است',
    words: ['banco', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'banco']
  },
  {
    type: 'build-es',
    speak: 'Esto es una biblioteca',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کتابخانه است',
    words: ['biblioteca', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'biblioteca']
  },
  {
    type: 'build-es',
    speak: 'Esto es un cine',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک سینما است',
    words: ['cine', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'cine']
  },
  {
    type: 'build-es',
    speak: 'Esto es un museo',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک موزه است',
    words: ['museo', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'museo']
  },
  {
    type: 'build-es',
    speak: 'Esto es un restaurante',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک رستوران است',
    words: ['restaurante', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'restaurante']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un banco',
    question: 'ترجمه را بساز:',
    text: 'Esto es un banco',
    words: ['است', 'بانک', 'یک', 'این'],
    answer: ['این', 'یک', 'بانک', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una biblioteca',
    question: 'ترجمه را بساز:',
    text: 'Esto es una biblioteca',
    words: ['است', 'کتابخانه', 'یک', 'این'],
    answer: ['این', 'یک', 'کتابخانه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un cine',
    question: 'ترجمه را بساز:',
    text: 'Esto es un cine',
    words: ['است', 'سینما', 'یک', 'این'],
    answer: ['این', 'یک', 'سینما', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un museo',
    question: 'ترجمه را بساز:',
    text: 'Esto es un museo',
    words: ['است', 'موزه', 'یک', 'این'],
    answer: ['این', 'یک', 'موزه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un restaurante',
    question: 'ترجمه را بساز:',
    text: 'Esto es un restaurante',
    words: ['است', 'رستوران', 'یک', 'این'],
    answer: ['این', 'یک', 'رستوران', 'است']
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