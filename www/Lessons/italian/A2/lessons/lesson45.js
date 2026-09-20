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

// ===== سوالات درس ۴۵ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'operazione" است؟',
    speak: 'l\'operazione',
    options: [
      { text: 'l\'operazione', image: '../../../media/a2/health/surgery.png' },
      { text: 'l\'ambulanza', image: '../../../media/a2/health/ambulance.png' },
      { text: 'la barella', image: '../../../media/a2/health/stretcher.png' },
      { text: 'la sedia a rotelle', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'l\'operazione'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'ambulanza" است؟',
    speak: 'l\'ambulanza',
    options: [
      { text: 'l\'operazione', image: '../../../media/a2/health/surgery.png' },
      { text: 'l\'ambulanza', image: '../../../media/a2/health/ambulance.png' },
      { text: 'il gesso', image: '../../../media/a2/health/cast.png' },
      { text: 'la barella', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'l\'ambulanza'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la barella" است؟',
    speak: 'la barella',
    options: [
      { text: 'la sedia a rotelle', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'l\'operazione', image: '../../../media/a2/health/surgery.png' },
      { text: 'la barella', image: '../../../media/a2/health/stretcher.png' },
      { text: 'l\'ambulanza', image: '../../../media/a2/health/ambulance.png' }
    ],
    answer: 'la barella'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la sedia a rotelle" است؟',
    speak: 'la sedia a rotelle',
    options: [
      { text: 'l\'ambulanza', image: '../../../media/a2/health/ambulance.png' },
      { text: 'la sedia a rotelle', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'il gesso', image: '../../../media/a2/health/cast.png' },
      { text: 'l\'operazione', image: '../../../media/a2/health/surgery.png' }
    ],
    answer: 'la sedia a rotelle'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il gesso" است؟',
    speak: 'il gesso',
    options: [
      { text: 'l\'operazione', image: '../../../media/a2/health/surgery.png' },
      { text: 'la barella', image: '../../../media/a2/health/stretcher.png' },
      { text: 'il gesso', image: '../../../media/a2/health/cast.png' },
      { text: 'la sedia a rotelle', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'il gesso'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/surgery.png',
    options: ['l\'operazione', 'l\'ambulanza', 'la barella', 'la sedia a rotelle'],
    answer: 'l\'operazione'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/ambulance.png',
    options: ['l\'operazione', 'l\'ambulanza', 'il gesso', 'la barella'],
    answer: 'l\'ambulanza'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/stretcher.png',
    options: ['la sedia a rotelle', 'l\'operazione', 'la barella', 'l\'ambulanza'],
    answer: 'la barella'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wheelchair.png',
    options: ['l\'ambulanza', 'la sedia a rotelle', 'il gesso', 'l\'operazione'],
    answer: 'la sedia a rotelle'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cast.png',
    options: ['l\'operazione', 'la barella', 'il gesso', 'la sedia a rotelle'],
    answer: 'il gesso'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'l\'operazione',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'operazione', 'l\'ambulanza', 'la barella', 'la sedia a rotelle'],
    answer: 'l\'operazione'
  },
  {
    type: 'audio',
    speak: 'l\'ambulanza',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'operazione', 'l\'ambulanza', 'il gesso', 'la barella'],
    answer: 'l\'ambulanza'
  },
  {
    type: 'audio',
    speak: 'la barella',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la sedia a rotelle', 'l\'operazione', 'la barella', 'l\'ambulanza'],
    answer: 'la barella'
  },
  {
    type: 'audio',
    speak: 'la sedia a rotelle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ambulanza', 'la sedia a rotelle', 'il gesso', 'l\'operazione'],
    answer: 'la sedia a rotelle'
  },
  {
    type: 'audio',
    speak: 'il gesso',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'operazione', 'la barella', 'il gesso', 'la sedia a rotelle'],
    answer: 'il gesso'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'l\'operazione',
    image: '../../../media/a2/health/surgery.png',
    meaning: 'جراحی'
  },
  {
    type: 'speak',
    word: 'l\'ambulanza',
    image: '../../../media/a2/health/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'la barella',
    image: '../../../media/a2/health/stretcher.png',
    meaning: 'برانکارد'
  },
  {
    type: 'speak',
    word: 'la sedia a rotelle',
    image: '../../../media/a2/health/wheelchair.png',
    meaning: 'صندلی چرخدار'
  },
  {
    type: 'speak',
    word: 'il gesso',
    image: '../../../media/a2/health/cast.png',
    meaning: 'گچ'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Faccio un\'operazione',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من جراحی می‌کنم',
    words: ['operazione', 'un\'', 'Faccio'],
    answer: ['Faccio', 'un\'', 'operazione']
  },
  {
    type: 'build-it',
    speak: 'Vedo un\'ambulanza',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک آمبولانس می‌بینم',
    words: ['ambulanza', 'un\'', 'Vedo'],
    answer: ['Vedo', 'un\'', 'ambulanza']
  },
  {
    type: 'build-it',
    speak: 'Vedo una barella',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک برانکارد می‌بینم',
    words: ['barella', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'barella']
  },
  {
    type: 'build-it',
    speak: 'Vedo una sedia a rotelle',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک صندلی چرخدار می‌بینم',
    words: ['rotelle', 'a', 'sedia', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'sedia', 'a', 'rotelle']
  },
  {
    type: 'build-it',
    speak: 'Vedo un gesso',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک گچ می‌بینم',
    words: ['gesso', 'un', 'Vedo'],
    answer: ['Vedo', 'un', 'gesso']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Faccio un\'operazione',
    question: 'ترجمه را بساز:',
    text: 'Faccio un\'operazione',
    words: ['می‌کنم', 'جراحی', 'یک', 'من'],
    answer: ['من', 'یک', 'جراحی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo un\'ambulanza',
    question: 'ترجمه را بساز:',
    text: 'Vedo un\'ambulanza',
    words: ['می‌بینم', 'آمبولانس', 'یک', 'من'],
    answer: ['من', 'یک', 'آمبولانس', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una barella',
    question: 'ترجمه را بساز:',
    text: 'Vedo una barella',
    words: ['می‌بینم', 'برانکارد', 'یک', 'من'],
    answer: ['من', 'یک', 'برانکارد', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una sedia a rotelle',
    question: 'ترجمه را بساز:',
    text: 'Vedo una sedia a rotelle',
    words: ['می‌بینم', 'صندلی چرخدار', 'یک', 'من'],
    answer: ['من', 'یک', 'صندلی چرخدار', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo un gesso',
    question: 'ترجمه را بساز:',
    text: 'Vedo un gesso',
    words: ['می‌بینم', 'گچ', 'یک', 'من'],
    answer: ['من', 'یک', 'گچ', 'می‌بینم']
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