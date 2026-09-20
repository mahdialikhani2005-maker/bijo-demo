let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
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
  recognition.lang = 'ru-RU';
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

// ===== سوالات درس ۳۳ - روسی به فارسی (وسایل نقلیه آبی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "подводная лодка" است؟',
    speak: 'подводная лодка',
    options: [
      { text: 'подводная лодка', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'паром', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'яхта', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'каноэ', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: 'подводная лодка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "паром" است؟',
    speak: 'паром',
    options: [
      { text: 'подводная лодка', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'паром', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'плот', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'яхта', image: '../../../media/a2/vehicles/yacht.png' }
    ],
    answer: 'паром'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "яхта" است؟',
    speak: 'яхта',
    options: [
      { text: 'каноэ', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'подводная лодка', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'яхта', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'паром', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: 'яхта'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "каноэ" است؟',
    speak: 'каноэ',
    options: [
      { text: 'подводная лодка', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'каноэ', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'яхта', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'плот', image: '../../../media/a2/vehicles/raft.png' }
    ],
    answer: 'каноэ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "плот" است؟',
    speak: 'плот',
    options: [
      { text: 'паром', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'плот', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'каноэ', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'подводная лодка', image: '../../../media/a2/vehicles/submarine.png' }
    ],
    answer: 'плот'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/submarine.png',
    options: ['подводная лодка', 'паром', 'яхта', 'каноэ'],
    answer: 'подводная лодка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ferry.png',
    options: ['подводная лодка', 'паром', 'плот', 'яхта'],
    answer: 'паром'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/yacht.png',
    options: ['каноэ', 'подводная лодка', 'яхта', 'паром'],
    answer: 'яхта'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/canoe.png',
    options: ['подводная лодка', 'каноэ', 'яхта', 'плот'],
    answer: 'каноэ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/raft.png',
    options: ['паром', 'плот', 'каноэ', 'подводная лодка'],
    answer: 'плот'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'подводная лодка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['подводная лодка', 'паром', 'яхта', 'каноэ'],
    answer: 'подводная лодка'
  },
  {
    type: 'audio',
    speak: 'паром',
    question: 'کدام کلمه را شنیدی؟',
    options: ['подводная лодка', 'паром', 'плот', 'яхта'],
    answer: 'паром'
  },
  {
    type: 'audio',
    speak: 'яхта',
    question: 'کدام کلمه را شنیدی؟',
    options: ['каноэ', 'подводная лодка', 'яхта', 'паром'],
    answer: 'яхта'
  },
  {
    type: 'audio',
    speak: 'каноэ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['подводная лодка', 'каноэ', 'яхта', 'плот'],
    answer: 'каноэ'
  },
  {
    type: 'audio',
    speak: 'плот',
    question: 'کدام کلمه را شنیدی؟',
    options: ['паром', 'плот', 'каноэ', 'подводная лодка'],
    answer: 'плот'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'подводная лодка',
    image: '../../../media/a2/vehicles/submarine.png',
    meaning: 'زیردریایی'
  },
  {
    type: 'speak',
    word: 'паром',
    image: '../../../media/a2/vehicles/ferry.png',
    meaning: 'کشتی'
  },
  {
    type: 'speak',
    word: 'яхта',
    image: '../../../media/a2/vehicles/yacht.png',
    meaning: 'قایق تفریحی'
  },
  {
    type: 'speak',
    word: 'каноэ',
    image: '../../../media/a2/vehicles/canoe.png',
    meaning: 'کانو'
  },
  {
    type: 'speak',
    word: 'плот',
    image: '../../../media/a2/vehicles/raft.png',
    meaning: 'قایق بادی'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это подводная лодка',
    question: 'جمله روسی را بساز:',
    text: 'این زیردریایی است',
    words: ['подводная', 'лодка', 'Это'],
    answer: ['Это', 'подводная', 'лодка']
  },
  {
    type: 'build-ru',
    speak: 'Это паром',
    question: 'جمله روسی را بساز:',
    text: 'این کشتی است',
    words: ['паром', 'Это'],
    answer: ['Это', 'паром']
  },
  {
    type: 'build-ru',
    speak: 'Это яхта',
    question: 'جمله روسی را بساز:',
    text: 'این قایق تفریحی است',
    words: ['яхта', 'Это'],
    answer: ['Это', 'яхта']
  },
  {
    type: 'build-ru',
    speak: 'Это каноэ',
    question: 'جمله روسی را بساز:',
    text: 'این کانو است',
    words: ['каноэ', 'Это'],
    answer: ['Это', 'каноэ']
  },
  {
    type: 'build-ru',
    speak: 'Это плот',
    question: 'جمله روسی را بساز:',
    text: 'این قایق بادی است',
    words: ['плот', 'Это'],
    answer: ['Это', 'плот']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это подводная лодка',
    question: 'ترجمه را بساز:',
    text: 'Это подводная лодка',
    words: ['است', 'زیردریایی', 'این'],
    answer: ['این', 'زیردریایی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это паром',
    question: 'ترجمه را بساز:',
    text: 'Это паром',
    words: ['است', 'کشتی', 'این'],
    answer: ['این', 'کشتی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это яхта',
    question: 'ترجمه را بساز:',
    text: 'Это яхта',
    words: ['است', 'قایق تفریحی', 'این'],
    answer: ['این', 'قایق تفریحی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это каноэ',
    question: 'ترجمه را بساز:',
    text: 'Это каноэ',
    words: ['است', 'کانو', 'این'],
    answer: ['این', 'کانو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это плот',
    question: 'ترجمه را بساز:',
    text: 'Это плот',
    words: ['است', 'قایق بادی', 'این'],
    answer: ['این', 'قایق بادی', 'است']
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

  // ===== بخش BUILD RU / FA =====
  if (q.type === 'build-ru' || q.type === 'build-fa') {
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

    if (q.type === 'build-ru') {
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