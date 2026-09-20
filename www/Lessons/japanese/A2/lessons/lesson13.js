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

// ===== سوالات درس ۱۳ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "はし" است؟',
    speak: 'はし',
    options: [
      { text: 'はし', image: '../../../media/a2/city/bridge.png' },
      { text: 'ひろば', image: '../../../media/a2/city/square.png' },
      { text: 'ふんすい', image: '../../../media/a2/city/fountain.png' },
      { text: 'とう', image: '../../../media/a2/city/tower.png' }
    ],
    answer: 'はし'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ひろば" است؟',
    speak: 'ひろば',
    options: [
      { text: 'しろ', image: '../../../media/a2/city/castle.png' },
      { text: 'ひろば', image: '../../../media/a2/city/square.png' },
      { text: 'はし', image: '../../../media/a2/city/bridge.png' },
      { text: 'ふんすい', image: '../../../media/a2/city/fountain.png' }
    ],
    answer: 'ひろば'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ふんすい" است؟',
    speak: 'ふんすい',
    options: [
      { text: 'はし', image: '../../../media/a2/city/bridge.png' },
      { text: 'ふんすい', image: '../../../media/a2/city/fountain.png' },
      { text: 'とう', image: '../../../media/a2/city/tower.png' },
      { text: 'ひろば', image: '../../../media/a2/city/square.png' }
    ],
    answer: 'ふんすい'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "とう" است؟',
    speak: 'とう',
    options: [
      { text: 'ひろば', image: '../../../media/a2/city/square.png' },
      { text: 'はし', image: '../../../media/a2/city/bridge.png' },
      { text: 'ふんすい', image: '../../../media/a2/city/fountain.png' },
      { text: 'とう', image: '../../../media/a2/city/tower.png' }
    ],
    answer: 'とう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "しろ" است؟',
    speak: 'しろ',
    options: [
      { text: 'しろ', image: '../../../media/a2/city/castle.png' },
      { text: 'とう', image: '../../../media/a2/city/tower.png' },
      { text: 'はし', image: '../../../media/a2/city/bridge.png' },
      { text: 'ひろば', image: '../../../media/a2/city/square.png' }
    ],
    answer: 'しろ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bridge.png',
    options: ['はし', 'ひろば', 'ふんすい', 'とう'],
    answer: 'はし'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/square.png',
    options: ['はし', 'ひろば', 'ふんすい', 'しろ'],
    answer: 'ひろば'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/fountain.png',
    options: ['しろ', 'はし', 'ふんすい', 'ひろば'],
    answer: 'ふんすい'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/tower.png',
    options: ['ふんすい', 'ひろば', 'とう', 'はし'],
    answer: 'とう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/castle.png',
    options: ['はし', 'とう', 'ひろば', 'しろ'],
    answer: 'しろ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'はし',
    question: 'کدام کلمه را شنیدی؟',
    options: ['はし', 'ひろば', 'ふんすい', 'とう'],
    answer: 'はし'
  },
  {
    type: 'audio',
    speak: 'ひろば',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しろ', 'ひろば', 'はし', 'ふんすい'],
    answer: 'ひろば'
  },
  {
    type: 'audio',
    speak: 'ふんすい',
    question: 'کدام کلمه را شنیدی؟',
    options: ['はし', 'ふんすい', 'とう', 'ひろば'],
    answer: 'ふんすい'
  },
  {
    type: 'audio',
    speak: 'とう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ひろば', 'はし', 'ふんすい', 'とう'],
    answer: 'とう'
  },
  {
    type: 'audio',
    speak: 'しろ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しろ', 'とう', 'はし', 'ひろば'],
    answer: 'しろ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'はし',
    image: '../../../media/a2/city/bridge.png',
    meaning: 'پل'
  },
  {
    type: 'speak',
    word: 'ひろば',
    image: '../../../media/a2/city/square.png',
    meaning: 'میدان'
  },
  {
    type: 'speak',
    word: 'ふんすい',
    image: '../../../media/a2/city/fountain.png',
    meaning: 'آبنما'
  },
  {
    type: 'speak',
    word: 'とう',
    image: '../../../media/a2/city/tower.png',
    meaning: 'برج'
  },
  {
    type: 'speak',
    word: 'しろ',
    image: '../../../media/a2/city/castle.png',
    meaning: 'قلعه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'この橋は有名です',
    question: 'جمله ژاپنی را بساز:',
    text: 'این پل معروف است',
    words: ['です', '有名', 'は', '橋', 'この'],
    answer: ['この', '橋', 'は', '有名', 'です']
  },
  {
    type: 'build-it',
    speak: 'この広場は広いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'این میدان بزرگ است',
    words: ['です', '広い', 'は', '広場', 'この'],
    answer: ['この', '広場', 'は', '広い', 'です']
  },
  {
    type: 'build-it',
    speak: 'この噴水は綺麗です',
    question: 'جمله ژاپنی را بساز:',
    text: 'این آبنما زیبا است',
    words: ['です', '綺麗', 'は', '噴水', 'この'],
    answer: ['この', '噴水', 'は', '綺麗', 'です']
  },
  {
    type: 'build-it',
    speak: 'この塔は高いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'این برج بلند است',
    words: ['です', '高い', 'は', '塔', 'この'],
    answer: ['この', '塔', 'は', '高い', 'です']
  },
  {
    type: 'build-it',
    speak: 'この城は古いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'این قلعه قدیمی است',
    words: ['です', '古い', 'は', '城', 'この'],
    answer: ['この', '城', 'は', '古い', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'この橋は有名です',
    question: 'ترجمه را بساز:',
    text: 'この橋は有名です',
    words: ['این', 'پل', 'معروف', 'است'],
    answer: ['این', 'پل', 'معروف', 'است']
  },
  {
    type: 'build-fa',
    speak: 'この広場は広いです',
    question: 'ترجمه را بساز:',
    text: 'この広場は広いです',
    words: ['این', 'میدان', 'بزرگ', 'است'],
    answer: ['این', 'میدان', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'この噴水は綺麗です',
    question: 'ترجمه را بساز:',
    text: 'この噴水は綺麗です',
    words: ['این', 'آبنما', 'زیبا', 'است'],
    answer: ['این', 'آبنما', 'زیبا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'この塔は高いです',
    question: 'ترجمه را بساز:',
    text: 'この塔は高いです',
    words: ['این', 'برج', 'بلند', 'است'],
    answer: ['این', 'برج', 'بلند', 'است']
  },
  {
    type: 'build-fa',
    speak: 'この城は古いです',
    question: 'ترجمه را بساز:',
    text: 'この城は古いです',
    words: ['این', 'قلعه', 'قدیمی', 'است'],
    answer: ['این', 'قلعه', 'قدیمی', 'است']
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