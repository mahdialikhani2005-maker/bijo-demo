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

// ===== سوالات درس ۲ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Ehemann" است؟',
    speak: 'der Ehemann',
    options: [
      { text: 'der Ehemann', image: '../../../media/a2/family/husband.png' },
      { text: 'die Ehefrau', image: '../../../media/a2/family/wife.png' },
      { text: 'die Eltern', image: '../../../media/a2/family/parent.png' },
      { text: 'die Großeltern', image: '../../../media/a2/family/grandparent.png' }
    ],
    answer: 'der Ehemann'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Ehefrau" است؟',
    speak: 'die Ehefrau',
    options: [
      { text: 'der Ehemann', image: '../../../media/a2/family/husband.png' },
      { text: 'die Ehefrau', image: '../../../media/a2/family/wife.png' },
      { text: 'das Enkelkind', image: '../../../media/a2/family/grandchild.png' },
      { text: 'die Eltern', image: '../../../media/a2/family/parent.png' }
    ],
    answer: 'die Ehefrau'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Eltern" است؟',
    speak: 'die Eltern',
    options: [
      { text: 'das Enkelkind', image: '../../../media/a2/family/grandchild.png' },
      { text: 'der Ehemann', image: '../../../media/a2/family/husband.png' },
      { text: 'die Eltern', image: '../../../media/a2/family/parent.png' },
      { text: 'die Ehefrau', image: '../../../media/a2/family/wife.png' }
    ],
    answer: 'die Eltern'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Großeltern" است؟',
    speak: 'die Großeltern',
    options: [
      { text: 'die Ehefrau', image: '../../../media/a2/family/wife.png' },
      { text: 'die Großeltern', image: '../../../media/a2/family/grandparent.png' },
      { text: 'das Enkelkind', image: '../../../media/a2/family/grandchild.png' },
      { text: 'der Ehemann', image: '../../../media/a2/family/husband.png' }
    ],
    answer: 'die Großeltern'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Enkelkind" است؟',
    speak: 'das Enkelkind',
    options: [
      { text: 'der Ehemann', image: '../../../media/a2/family/husband.png' },
      { text: 'die Eltern', image: '../../../media/a2/family/parent.png' },
      { text: 'das Enkelkind', image: '../../../media/a2/family/grandchild.png' },
      { text: 'die Großeltern', image: '../../../media/a2/family/grandparent.png' }
    ],
    answer: 'das Enkelkind'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/husband.png',
    options: ['der Ehemann', 'die Ehefrau', 'die Eltern', 'die Großeltern'],
    answer: 'der Ehemann'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/wife.png',
    options: ['der Ehemann', 'die Ehefrau', 'das Enkelkind', 'die Eltern'],
    answer: 'die Ehefrau'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/parent.png',
    options: ['das Enkelkind', 'der Ehemann', 'die Eltern', 'die Ehefrau'],
    answer: 'die Eltern'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandparent.png',
    options: ['die Ehefrau', 'die Großeltern', 'das Enkelkind', 'der Ehemann'],
    answer: 'die Großeltern'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandchild.png',
    options: ['der Ehemann', 'die Eltern', 'das Enkelkind', 'die Großeltern'],
    answer: 'das Enkelkind'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Ehemann',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Ehemann', 'die Ehefrau', 'die Eltern', 'die Großeltern'],
    answer: 'der Ehemann'
  },
  {
    type: 'audio',
    speak: 'die Ehefrau',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Ehemann', 'die Ehefrau', 'das Enkelkind', 'die Eltern'],
    answer: 'die Ehefrau'
  },
  {
    type: 'audio',
    speak: 'die Eltern',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Enkelkind', 'der Ehemann', 'die Eltern', 'die Ehefrau'],
    answer: 'die Eltern'
  },
  {
    type: 'audio',
    speak: 'die Großeltern',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Ehefrau', 'die Großeltern', 'das Enkelkind', 'der Ehemann'],
    answer: 'die Großeltern'
  },
  {
    type: 'audio',
    speak: 'das Enkelkind',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Ehemann', 'die Eltern', 'das Enkelkind', 'die Großeltern'],
    answer: 'das Enkelkind'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Ehemann',
    image: '../../../media/a2/family/husband.png',
    meaning: 'شوهر'
  },
  {
    type: 'speak',
    word: 'die Ehefrau',
    image: '../../../media/a2/family/wife.png',
    meaning: 'همسر'
  },
  {
    type: 'speak',
    word: 'die Eltern',
    image: '../../../media/a2/family/parent.png',
    meaning: 'والدین'
  },
  {
    type: 'speak',
    word: 'die Großeltern',
    image: '../../../media/a2/family/grandparent.png',
    meaning: 'پدربزرگ/مادربزرگ'
  },
  {
    type: 'speak',
    word: 'das Enkelkind',
    image: '../../../media/a2/family/grandchild.png',
    meaning: 'نوه'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Das ist mein Ehemann',
    question: 'جمله آلمانی را بساز:',
    text: 'این شوهر من است',
    words: ['Ehemann', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Ehemann']
  },
  {
    type: 'build-de',
    speak: 'Das ist meine Ehefrau',
    question: 'جمله آلمانی را بساز:',
    text: 'این همسر من است',
    words: ['Ehefrau', 'meine', 'ist', 'Das'],
    answer: ['Das', 'ist', 'meine', 'Ehefrau']
  },
  {
    type: 'build-de',
    speak: 'Das sind meine Eltern',
    question: 'جمله آلمانی را بساز:',
    text: 'این والدین من هستند',
    words: ['Eltern', 'meine', 'sind', 'Das'],
    answer: ['Das', 'sind', 'meine', 'Eltern']
  },
  {
    type: 'build-de',
    speak: 'Das sind meine Großeltern',
    question: 'جمله آلمانی را بساز:',
    text: 'این پدربزرگ و مادربزرگ من هستند',
    words: ['Großeltern', 'meine', 'sind', 'Das'],
    answer: ['Das', 'sind', 'meine', 'Großeltern']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Enkelkind',
    question: 'جمله آلمانی را بساز:',
    text: 'این نوه من است',
    words: ['Enkelkind', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Enkelkind']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Das ist mein Ehemann',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Ehemann',
    words: ['است', 'شوهر', 'من', 'این'],
    answer: ['این', 'شوهر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist meine Ehefrau',
    question: 'ترجمه را بساز:',
    text: 'Das ist meine Ehefrau',
    words: ['است', 'همسر', 'من', 'این'],
    answer: ['این', 'همسر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das sind meine Eltern',
    question: 'ترجمه را بساز:',
    text: 'Das sind meine Eltern',
    words: ['هستند', 'والدین', 'من', 'این'],
    answer: ['این', 'والدین', 'من', 'هستند']
  },
  {
    type: 'build-fa',
    speak: 'Das sind meine Großeltern',
    question: 'ترجمه را بساز:',
    text: 'Das sind meine Großeltern',
    words: ['هستند', 'پدربزرگ و مادربزرگ', 'من', 'این'],
    answer: ['این', 'پدربزرگ و مادربزرگ', 'من', 'هستند']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Enkelkind',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Enkelkind',
    words: ['است', 'نوه', 'من', 'این'],
    answer: ['این', 'نوه', 'من', 'است']
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