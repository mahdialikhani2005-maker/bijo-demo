let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
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
  recognition.lang = 'it-IT';
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

// ===== سوالات درس ۱۲ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'hotel" است؟',
    speak: 'l\'hotel',
    options: [
      { text: 'l\'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'il bar', image: '../../../media/a2/city/cafe.png' },
      { text: 'la panetteria', image: '../../../media/a2/city/bakery.png' },
      { text: 'la macelleria', image: '../../../media/a2/city/butchery.png' }
    ],
    answer: 'l\'hotel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il bar" است؟',
    speak: 'il bar',
    options: [
      { text: 'l\'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'il bar', image: '../../../media/a2/city/cafe.png' },
      { text: 'la farmacia', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'la panetteria', image: '../../../media/a2/city/bakery.png' }
    ],
    answer: 'il bar'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la panetteria" است؟',
    speak: 'la panetteria',
    options: [
      { text: 'la macelleria', image: '../../../media/a2/city/butchery.png' },
      { text: 'l\'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'la panetteria', image: '../../../media/a2/city/bakery.png' },
      { text: 'il bar', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'la panetteria'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la farmacia" است؟',
    speak: 'la farmacia',
    options: [
      { text: 'il bar', image: '../../../media/a2/city/cafe.png' },
      { text: 'la farmacia', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'la macelleria', image: '../../../media/a2/city/butchery.png' },
      { text: 'l\'hotel', image: '../../../media/a2/city/hotel.png' }
    ],
    answer: 'la farmacia'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la macelleria" است؟',
    speak: 'la macelleria',
    options: [
      { text: 'l\'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'la panetteria', image: '../../../media/a2/city/bakery.png' },
      { text: 'la macelleria', image: '../../../media/a2/city/butchery.png' },
      { text: 'la farmacia', image: '../../../media/a2/city/pharmacy.png' }
    ],
    answer: 'la macelleria'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/hotel.png',
    options: ['l\'hotel', 'il bar', 'la panetteria', 'la macelleria'],
    answer: 'l\'hotel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/cafe.png',
    options: ['l\'hotel', 'il bar', 'la farmacia', 'la panetteria'],
    answer: 'il bar'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bakery.png',
    options: ['la macelleria', 'l\'hotel', 'la panetteria', 'il bar'],
    answer: 'la panetteria'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/pharmacy.png',
    options: ['il bar', 'la farmacia', 'la macelleria', 'l\'hotel'],
    answer: 'la farmacia'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/butchery.png',
    options: ['l\'hotel', 'la panetteria', 'la macelleria', 'la farmacia'],
    answer: 'la macelleria'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'l\'hotel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'hotel', 'il bar', 'la panetteria', 'la macelleria'],
    answer: 'l\'hotel'
  },
  {
    type: 'audio',
    speak: 'il bar',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'hotel', 'il bar', 'la farmacia', 'la panetteria'],
    answer: 'il bar'
  },
  {
    type: 'audio',
    speak: 'la panetteria',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la macelleria', 'l\'hotel', 'la panetteria', 'il bar'],
    answer: 'la panetteria'
  },
  {
    type: 'audio',
    speak: 'la farmacia',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il bar', 'la farmacia', 'la macelleria', 'l\'hotel'],
    answer: 'la farmacia'
  },
  {
    type: 'audio',
    speak: 'la macelleria',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'hotel', 'la panetteria', 'la macelleria', 'la farmacia'],
    answer: 'la macelleria'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'l\'hotel',
    image: '../../../media/a2/city/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: 'il bar',
    image: '../../../media/a2/city/cafe.png',
    meaning: 'کافه'
  },
  {
    type: 'speak',
    word: 'la panetteria',
    image: '../../../media/a2/city/bakery.png',
    meaning: 'نانوایی'
  },
  {
    type: 'speak',
    word: 'la farmacia',
    image: '../../../media/a2/city/pharmacy.png',
    meaning: 'داروخانه'
  },
  {
    type: 'speak',
    word: 'la macelleria',
    image: '../../../media/a2/city/butchery.png',
    meaning: 'قصابی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Vado all\'hotel',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من به هتل می‌روم',
    words: ['all\'hotel', 'Vado'],
    answer: ['Vado', 'all\'hotel']
  },
  {
    type: 'build-it',
    speak: 'Vado al bar',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من به کافه می‌روم',
    words: ['bar', 'al', 'Vado'],
    answer: ['Vado', 'al', 'bar']
  },
  {
    type: 'build-it',
    speak: 'Vado alla panetteria',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من به نانوایی می‌روم',
    words: ['panetteria', 'alla', 'Vado'],
    answer: ['Vado', 'alla', 'panetteria']
  },
  {
    type: 'build-it',
    speak: 'Vado alla farmacia',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من به داروخانه می‌روم',
    words: ['farmacia', 'alla', 'Vado'],
    answer: ['Vado', 'alla', 'farmacia']
  },
  {
    type: 'build-it',
    speak: 'Vado alla macelleria',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من به قصابی می‌روم',
    words: ['macelleria', 'alla', 'Vado'],
    answer: ['Vado', 'alla', 'macelleria']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Vado all\'hotel',
    question: 'ترجمه را بساز:',
    text: 'Vado all\'hotel',
    words: ['می‌روم', 'هتل', 'به', 'من'],
    answer: ['من', 'به', 'هتل', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Vado al bar',
    question: 'ترجمه را بساز:',
    text: 'Vado al bar',
    words: ['می‌روم', 'کافه', 'به', 'من'],
    answer: ['من', 'به', 'کافه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Vado alla panetteria',
    question: 'ترجمه را بساز:',
    text: 'Vado alla panetteria',
    words: ['می‌روم', 'نانوایی', 'به', 'من'],
    answer: ['من', 'به', 'نانوایی', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Vado alla farmacia',
    question: 'ترجمه را بساز:',
    text: 'Vado alla farmacia',
    words: ['می‌روم', 'داروخانه', 'به', 'من'],
    answer: ['من', 'به', 'داروخانه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Vado alla macelleria',
    question: 'ترجمه را بساز:',
    text: 'Vado alla macelleria',
    words: ['می‌روم', 'قصابی', 'به', 'من'],
    answer: ['من', 'به', 'قصابی', 'می‌روم']
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

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
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

    if (q.type === 'build-it') {
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