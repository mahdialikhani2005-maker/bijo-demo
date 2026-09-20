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

// ===== سوالات درس ۸ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Balkon" است؟',
    speak: 'der Balkon',
    options: [
      { text: 'der Balkon', image: '../../../media/a2/house/balcony.png' },
      { text: 'die Garage', image: '../../../media/a2/house/garage.png' },
      { text: 'der Keller', image: '../../../media/a2/house/basement.png' },
      { text: 'der Hof', image: '../../../media/a2/house/yard.png' }
    ],
    answer: 'der Balkon'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Garage" است؟',
    speak: 'die Garage',
    options: [
      { text: 'der Balkon', image: '../../../media/a2/house/balcony.png' },
      { text: 'die Garage', image: '../../../media/a2/house/garage.png' },
      { text: 'der Dachboden', image: '../../../media/a2/house/attic.png' },
      { text: 'der Keller', image: '../../../media/a2/house/basement.png' }
    ],
    answer: 'die Garage'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Keller" است؟',
    speak: 'der Keller',
    options: [
      { text: 'der Hof', image: '../../../media/a2/house/yard.png' },
      { text: 'der Balkon', image: '../../../media/a2/house/balcony.png' },
      { text: 'der Keller', image: '../../../media/a2/house/basement.png' },
      { text: 'die Garage', image: '../../../media/a2/house/garage.png' }
    ],
    answer: 'der Keller'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Dachboden" است؟',
    speak: 'der Dachboden',
    options: [
      { text: 'die Garage', image: '../../../media/a2/house/garage.png' },
      { text: 'der Dachboden', image: '../../../media/a2/house/attic.png' },
      { text: 'der Hof', image: '../../../media/a2/house/yard.png' },
      { text: 'der Balkon', image: '../../../media/a2/house/balcony.png' }
    ],
    answer: 'der Dachboden'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Hof" است؟',
    speak: 'der Hof',
    options: [
      { text: 'der Balkon', image: '../../../media/a2/house/balcony.png' },
      { text: 'der Keller', image: '../../../media/a2/house/basement.png' },
      { text: 'der Hof', image: '../../../media/a2/house/yard.png' },
      { text: 'der Dachboden', image: '../../../media/a2/house/attic.png' }
    ],
    answer: 'der Hof'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/balcony.png',
    options: ['der Balkon', 'die Garage', 'der Keller', 'der Hof'],
    answer: 'der Balkon'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/garage.png',
    options: ['der Balkon', 'die Garage', 'der Dachboden', 'der Keller'],
    answer: 'die Garage'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/basement.png',
    options: ['der Hof', 'der Balkon', 'der Keller', 'die Garage'],
    answer: 'der Keller'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/attic.png',
    options: ['die Garage', 'der Dachboden', 'der Hof', 'der Balkon'],
    answer: 'der Dachboden'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/yard.png',
    options: ['der Balkon', 'der Keller', 'der Hof', 'der Dachboden'],
    answer: 'der Hof'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Balkon',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Balkon', 'die Garage', 'der Keller', 'der Hof'],
    answer: 'der Balkon'
  },
  {
    type: 'audio',
    speak: 'die Garage',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Balkon', 'die Garage', 'der Dachboden', 'der Keller'],
    answer: 'die Garage'
  },
  {
    type: 'audio',
    speak: 'der Keller',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Hof', 'der Balkon', 'der Keller', 'die Garage'],
    answer: 'der Keller'
  },
  {
    type: 'audio',
    speak: 'der Dachboden',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Garage', 'der Dachboden', 'der Hof', 'der Balkon'],
    answer: 'der Dachboden'
  },
  {
    type: 'audio',
    speak: 'der Hof',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Balkon', 'der Keller', 'der Hof', 'der Dachboden'],
    answer: 'der Hof'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Balkon',
    image: '../../../media/a2/house/balcony.png',
    meaning: 'بالکن'
  },
  {
    type: 'speak',
    word: 'die Garage',
    image: '../../../media/a2/house/garage.png',
    meaning: 'گاراژ'
  },
  {
    type: 'speak',
    word: 'der Keller',
    image: '../../../media/a2/house/basement.png',
    meaning: 'زیرزمین'
  },
  {
    type: 'speak',
    word: 'der Dachboden',
    image: '../../../media/a2/house/attic.png',
    meaning: 'اتاق زیرشیروانی'
  },
  {
    type: 'speak',
    word: 'der Hof',
    image: '../../../media/a2/house/yard.png',
    meaning: 'حیاط'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Das ist mein Balkon',
    question: 'جمله آلمانی را بساز:',
    text: 'این بالکن من است',
    words: ['Balkon', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Balkon']
  },
  {
    type: 'build-de',
    speak: 'Das ist meine Garage',
    question: 'جمله آلمانی را بساز:',
    text: 'این گاراژ من است',
    words: ['Garage', 'meine', 'ist', 'Das'],
    answer: ['Das', 'ist', 'meine', 'Garage']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Keller',
    question: 'جمله آلمانی را بساز:',
    text: 'این زیرزمین من است',
    words: ['Keller', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Keller']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Dachboden',
    question: 'جمله آلمانی را بساز:',
    text: 'این اتاق زیرشیروانی من است',
    words: ['Dachboden', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Dachboden']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Hof',
    question: 'جمله آلمانی را بساز:',
    text: 'این حیاط من است',
    words: ['Hof', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Hof']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Das ist mein Balkon',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Balkon',
    words: ['است', 'بالکن', 'من', 'این'],
    answer: ['این', 'بالکن', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist meine Garage',
    question: 'ترجمه را بساز:',
    text: 'Das ist meine Garage',
    words: ['است', 'گاراژ', 'من', 'این'],
    answer: ['این', 'گاراژ', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Keller',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Keller',
    words: ['است', 'زیرزمین', 'من', 'این'],
    answer: ['این', 'زیرزمین', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Dachboden',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Dachboden',
    words: ['است', 'اتاق زیرشیروانی', 'من', 'این'],
    answer: ['این', 'اتاق زیرشیروانی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Hof',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Hof',
    words: ['است', 'حیاط', 'من', 'این'],
    answer: ['این', 'حیاط', 'من', 'است']
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