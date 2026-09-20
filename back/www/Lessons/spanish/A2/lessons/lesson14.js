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

// ===== سوالات درس ۱۴ - اسپانیایی به فارسی (مکان‌های مذهبی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el templo" است؟',
    speak: 'el templo',
    options: [
      { text: 'el templo', image: '../../../media/a2/city/temple.png' },
      { text: 'la iglesia', image: '../../../media/a2/city/church.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' },
      { text: 'la mezquita', image: '../../../media/a2/city/mosque.png' }
    ],
    answer: 'el templo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la iglesia" است؟',
    speak: 'la iglesia',
    options: [
      { text: 'el templo', image: '../../../media/a2/city/temple.png' },
      { text: 'la iglesia', image: '../../../media/a2/city/church.png' },
      { text: 'el santuario', image: '../../../media/a2/city/shrine.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' }
    ],
    answer: 'la iglesia'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la sinagoga" است؟',
    speak: 'la sinagoga',
    options: [
      { text: 'la mezquita', image: '../../../media/a2/city/mosque.png' },
      { text: 'el templo', image: '../../../media/a2/city/temple.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' },
      { text: 'la iglesia', image: '../../../media/a2/city/church.png' }
    ],
    answer: 'la sinagoga'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la mezquita" است؟',
    speak: 'la mezquita',
    options: [
      { text: 'el templo', image: '../../../media/a2/city/temple.png' },
      { text: 'la mezquita', image: '../../../media/a2/city/mosque.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' },
      { text: 'el santuario', image: '../../../media/a2/city/shrine.png' }
    ],
    answer: 'la mezquita'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el santuario" است؟',
    speak: 'el santuario',
    options: [
      { text: 'la iglesia', image: '../../../media/a2/city/church.png' },
      { text: 'el santuario', image: '../../../media/a2/city/shrine.png' },
      { text: 'la mezquita', image: '../../../media/a2/city/mosque.png' },
      { text: 'el templo', image: '../../../media/a2/city/temple.png' }
    ],
    answer: 'el santuario'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/temple.png',
    options: ['el templo', 'la iglesia', 'la sinagoga', 'la mezquita'],
    answer: 'el templo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/church.png',
    options: ['el templo', 'la iglesia', 'el santuario', 'la sinagoga'],
    answer: 'la iglesia'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/synagogue.png',
    options: ['la mezquita', 'el templo', 'la sinagoga', 'la iglesia'],
    answer: 'la sinagoga'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/mosque.png',
    options: ['el templo', 'la mezquita', 'la sinagoga', 'el santuario'],
    answer: 'la mezquita'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/shrine.png',
    options: ['la iglesia', 'el santuario', 'la mezquita', 'el templo'],
    answer: 'el santuario'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el templo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el templo', 'la iglesia', 'la sinagoga', 'la mezquita'],
    answer: 'el templo'
  },
  {
    type: 'audio',
    speak: 'la iglesia',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el templo', 'la iglesia', 'el santuario', 'la sinagoga'],
    answer: 'la iglesia'
  },
  {
    type: 'audio',
    speak: 'la sinagoga',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la mezquita', 'el templo', 'la sinagoga', 'la iglesia'],
    answer: 'la sinagoga'
  },
  {
    type: 'audio',
    speak: 'la mezquita',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el templo', 'la mezquita', 'la sinagoga', 'el santuario'],
    answer: 'la mezquita'
  },
  {
    type: 'audio',
    speak: 'el santuario',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la iglesia', 'el santuario', 'la mezquita', 'el templo'],
    answer: 'el santuario'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el templo',
    image: '../../../media/a2/city/temple.png',
    meaning: 'معبد'
  },
  {
    type: 'speak',
    word: 'la iglesia',
    image: '../../../media/a2/city/church.png',
    meaning: 'کلیسا'
  },
  {
    type: 'speak',
    word: 'la sinagoga',
    image: '../../../media/a2/city/synagogue.png',
    meaning: 'کنیسه'
  },
  {
    type: 'speak',
    word: 'la mezquita',
    image: '../../../media/a2/city/mosque.png',
    meaning: 'مسجد'
  },
  {
    type: 'speak',
    word: 'el santuario',
    image: '../../../media/a2/city/shrine.png',
    meaning: 'زیارتگاه'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un templo',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک معبد است',
    words: ['templo', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'templo']
  },
  {
    type: 'build-es',
    speak: 'Esto es una iglesia',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کلیسا است',
    words: ['iglesia', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'iglesia']
  },
  {
    type: 'build-es',
    speak: 'Esto es una sinagoga',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کنیسه است',
    words: ['sinagoga', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'sinagoga']
  },
  {
    type: 'build-es',
    speak: 'Esto es una mezquita',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک مسجد است',
    words: ['mezquita', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'mezquita']
  },
  {
    type: 'build-es',
    speak: 'Esto es un santuario',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک زیارتگاه است',
    words: ['santuario', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'santuario']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un templo',
    question: 'ترجمه را بساز:',
    text: 'Esto es un templo',
    words: ['است', 'معبد', 'یک', 'این'],
    answer: ['این', 'یک', 'معبد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una iglesia',
    question: 'ترجمه را بساز:',
    text: 'Esto es una iglesia',
    words: ['است', 'کلیسا', 'یک', 'این'],
    answer: ['این', 'یک', 'کلیسا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una sinagoga',
    question: 'ترجمه را بساز:',
    text: 'Esto es una sinagoga',
    words: ['است', 'کنیسه', 'یک', 'این'],
    answer: ['این', 'یک', 'کنیسه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una mezquita',
    question: 'ترجمه را بساز:',
    text: 'Esto es una mezquita',
    words: ['است', 'مسجد', 'یک', 'این'],
    answer: ['این', 'یک', 'مسجد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un santuario',
    question: 'ترجمه را بساز:',
    text: 'Esto es un santuario',
    words: ['است', 'زیارتگاه', 'یک', 'این'],
    answer: ['این', 'یک', 'زیارتگاه', 'است']
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