let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
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
  recognition.lang = 'ja-JP';
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

// ===== سوالات درس ۴۲ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "のう" است؟',
    speak: 'のう',
    options: [
      { text: 'のう', image: '../../../media/a2/health/brain.png' },
      { text: 'しんけい', image: '../../../media/a2/health/nerve.png' },
      { text: 'じょうみゃく', image: '../../../media/a2/health/vein.png' },
      { text: 'かんせつ', image: '../../../media/a2/health/joint.png' }
    ],
    answer: 'のう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "しんけい" است؟',
    speak: 'しんけい',
    options: [
      { text: 'どうみゃく', image: '../../../media/a2/health/artery.png' },
      { text: 'しんけい', image: '../../../media/a2/health/nerve.png' },
      { text: 'のう', image: '../../../media/a2/health/brain.png' },
      { text: 'じょうみゃく', image: '../../../media/a2/health/vein.png' }
    ],
    answer: 'しんけい'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "じょうみゃく" است؟',
    speak: 'じょうみゃく',
    options: [
      { text: 'のう', image: '../../../media/a2/health/brain.png' },
      { text: 'じょうみゃく', image: '../../../media/a2/health/vein.png' },
      { text: 'かんせつ', image: '../../../media/a2/health/joint.png' },
      { text: 'しんけい', image: '../../../media/a2/health/nerve.png' }
    ],
    answer: 'じょうみゃく'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "どうみゃく" است؟',
    speak: 'どうみゃく',
    options: [
      { text: 'しんけい', image: '../../../media/a2/health/nerve.png' },
      { text: 'のう', image: '../../../media/a2/health/brain.png' },
      { text: 'じょうみゃく', image: '../../../media/a2/health/vein.png' },
      { text: 'どうみゃく', image: '../../../media/a2/health/artery.png' }
    ],
    answer: 'どうみゃく'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かんせつ" است؟',
    speak: 'かんせつ',
    options: [
      { text: 'かんせつ', image: '../../../media/a2/health/joint.png' },
      { text: 'どうみゃく', image: '../../../media/a2/health/artery.png' },
      { text: 'のう', image: '../../../media/a2/health/brain.png' },
      { text: 'しんけい', image: '../../../media/a2/health/nerve.png' }
    ],
    answer: 'かんせつ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/brain.png',
    options: ['のう', 'しんけい', 'じょうみゃく', 'かんせつ'],
    answer: 'のう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/nerve.png',
    options: ['のう', 'しんけい', 'じょうみゃく', 'どうみゃく'],
    answer: 'しんけい'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/vein.png',
    options: ['どうみゃく', 'のう', 'じょうみゃく', 'しんけい'],
    answer: 'じょうみゃく'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/artery.png',
    options: ['じょうみゃく', 'しんけい', 'かんせつ', 'どうみゃく'],
    answer: 'どうみゃく'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/joint.png',
    options: ['のう', 'どうみゃく', 'しんけい', 'かんせつ'],
    answer: 'かんせつ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'のう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['のう', 'しんけい', 'じょうみゃく', 'かんせつ'],
    answer: 'のう'
  },
  {
    type: 'audio',
    speak: 'しんけい',
    question: 'کدام کلمه را شنیدی؟',
    options: ['どうみゃく', 'しんけい', 'のう', 'じょうみゃく'],
    answer: 'しんけい'
  },
  {
    type: 'audio',
    speak: 'じょうみゃく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['のう', 'じょうみゃく', 'かんせつ', 'しんけい'],
    answer: 'じょうみゃく'
  },
  {
    type: 'audio',
    speak: 'どうみゃく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しんけい', 'のう', 'じょうみゃく', 'どうみゃく'],
    answer: 'どうみゃく'
  },
  {
    type: 'audio',
    speak: 'かんせつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かんせつ', 'どうみゃく', 'のう', 'しんけい'],
    answer: 'かんせつ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'のう',
    image: '../../../media/a2/health/brain.png',
    meaning: 'مغز'
  },
  {
    type: 'speak',
    word: 'しんけい',
    image: '../../../media/a2/health/nerve.png',
    meaning: 'عصب'
  },
  {
    type: 'speak',
    word: 'じょうみゃく',
    image: '../../../media/a2/health/vein.png',
    meaning: 'ورید'
  },
  {
    type: 'speak',
    word: 'どうみゃく',
    image: '../../../media/a2/health/artery.png',
    meaning: 'سرخرگ'
  },
  {
    type: 'speak',
    word: 'かんせつ',
    image: '../../../media/a2/health/joint.png',
    meaning: 'مفصل'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'のうは大事です',
    question: 'جمله ژاپنی را بساز:',
    text: 'مغز مهم است',
    words: ['です', '大事', 'は', 'のう'],
    answer: ['のう', 'は', '大事', 'です']
  },
  {
    type: 'build-it',
    speak: 'しんけいが痛いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'عصب درد دارد',
    words: ['です', '痛い', 'が', 'しんけい'],
    answer: ['しんけい', 'が', '痛い', 'です']
  },
  {
    type: 'build-it',
    speak: 'じょうみゃくが見えます',
    question: 'جمله ژاپنی را بساز:',
    text: 'ورید قابل مشاهده است',
    words: ['ます', '見え', 'が', 'じょうみゃく'],
    answer: ['じょうみゃく', 'が', '見え', 'ます']
  },
  {
    type: 'build-it',
    speak: 'どうみゃくは大切です',
    question: 'جمله ژاپنی را بساز:',
    text: 'سرخرگ مهم است',
    words: ['です', '大切', 'は', 'どうみゃく'],
    answer: ['どうみゃく', 'は', '大切', 'です']
  },
  {
    type: 'build-it',
    speak: 'かんせつが痛いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'مفصل درد دارد',
    words: ['です', '痛い', 'が', 'かんせつ'],
    answer: ['かんせつ', 'が', '痛い', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'のうは大事です',
    question: 'ترجمه را بساز:',
    text: 'のうは大事です',
    words: ['مغز', 'مهم', 'است'],
    answer: ['مغز', 'مهم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'しんけいが痛いです',
    question: 'ترجمه را بساز:',
    text: 'しんけいが痛いです',
    words: ['عصب', 'درد', 'دارد'],
    answer: ['عصب', 'درد', 'دارد']
  },
  {
    type: 'build-fa',
    speak: 'じょうみゃくが見えます',
    question: 'ترجمه را بساز:',
    text: 'じょうみゃくが見えます',
    words: ['ورید', 'قابل', 'مشاهده', 'است'],
    answer: ['ورید', 'قابل', 'مشاهده', 'است']
  },
  {
    type: 'build-fa',
    speak: 'どうみゃくは大切です',
    question: 'ترجمه را بساز:',
    text: 'どうみゃくは大切です',
    words: ['سرخرگ', 'مهم', 'است'],
    answer: ['سرخرگ', 'مهم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'かんせつが痛いです',
    question: 'ترجمه را بساز:',
    text: 'かんせつが痛いです',
    words: ['مفصل', 'درد', 'دارد'],
    answer: ['مفصل', 'درد', 'دارد']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 レッスンが終わりました！ 🎉</h2>
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