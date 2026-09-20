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

// ===== سوالات درس ۴۵ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "しゅじゅつ" است؟',
    speak: 'しゅじゅつ',
    options: [
      { text: 'しゅじゅつ', image: '../../../media/a2/health/surgery.png' },
      { text: 'しょくせん', image: '../../../media/a2/health/stretcher.png' },
      { text: 'くるまいす', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'ギプス', image: '../../../media/a2/health/cast.png' }
    ],
    answer: 'しゅじゅつ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "しょくせん" است؟',
    speak: 'しょくせん',
    options: [
      { text: 'ほうたい', image: '../../../media/a2/health/bandage.png' },
      { text: 'しょくせん', image: '../../../media/a2/health/stretcher.png' },
      { text: 'しゅじゅつ', image: '../../../media/a2/health/surgery.png' },
      { text: 'くるまいす', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'しょくせん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "くるまいす" است؟',
    speak: 'くるまいす',
    options: [
      { text: 'しゅじゅつ', image: '../../../media/a2/health/surgery.png' },
      { text: 'くるまいす', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'ギプス', image: '../../../media/a2/health/cast.png' },
      { text: 'しょくせん', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'くるまいす'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ギプス" است؟',
    speak: 'ギプス',
    options: [
      { text: 'しょくせん', image: '../../../media/a2/health/stretcher.png' },
      { text: 'しゅじゅつ', image: '../../../media/a2/health/surgery.png' },
      { text: 'くるまいす', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'ギプス', image: '../../../media/a2/health/cast.png' }
    ],
    answer: 'ギプス'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ほうたい" است؟',
    speak: 'ほうたい',
    options: [
      { text: 'ほうたい', image: '../../../media/a2/health/bandage.png' },
      { text: 'ギプス', image: '../../../media/a2/health/cast.png' },
      { text: 'しゅじゅつ', image: '../../../media/a2/health/surgery.png' },
      { text: 'しょくせん', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'ほうたい'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/surgery.png',
    options: ['しゅじゅつ', 'しょくせん', 'くるまいす', 'ギプス'],
    answer: 'しゅじゅつ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/stretcher.png',
    options: ['しゅじゅつ', 'しょくせん', 'くるまいす', 'ほうたい'],
    answer: 'しょくせん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wheelchair.png',
    options: ['ほうたい', 'しゅじゅつ', 'くるまいす', 'しょくせん'],
    answer: 'くるまいす'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cast.png',
    options: ['くるまいす', 'しょくせん', 'ギプス', 'しゅじゅつ'],
    answer: 'ギプス'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/bandage.png',
    options: ['しゅじゅつ', 'ギプス', 'しょくせん', 'ほうたい'],
    answer: 'ほうたい'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'しゅじゅつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しゅじゅつ', 'しょくせん', 'くるまいす', 'ギプス'],
    answer: 'しゅじゅつ'
  },
  {
    type: 'audio',
    speak: 'しょくせん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ほうたい', 'しょくせん', 'しゅじゅつ', 'くるまいす'],
    answer: 'しょくせん'
  },
  {
    type: 'audio',
    speak: 'くるまいす',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しゅじゅつ', 'くるまいす', 'ギプス', 'しょくせん'],
    answer: 'くるまいす'
  },
  {
    type: 'audio',
    speak: 'ギプス',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しょくせん', 'しゅじゅつ', 'くるまいす', 'ギプス'],
    answer: 'ギプス'
  },
  {
    type: 'audio',
    speak: 'ほうたい',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ほうたい', 'ギプス', 'しゅじゅつ', 'しょくせん'],
    answer: 'ほうたい'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'しゅじゅつ',
    image: '../../../media/a2/health/surgery.png',
    meaning: 'جراحی'
  },
  {
    type: 'speak',
    word: 'しょくせん',
    image: '../../../media/a2/health/stretcher.png',
    meaning: 'برانکارد'
  },
  {
    type: 'speak',
    word: 'くるまいす',
    image: '../../../media/a2/health/wheelchair.png',
    meaning: 'صندلی چرخدار'
  },
  {
    type: 'speak',
    word: 'ギプス',
    image: '../../../media/a2/health/cast.png',
    meaning: 'گچ'
  },
  {
    type: 'speak',
    word: 'ほうたい',
    image: '../../../media/a2/health/bandage.png',
    meaning: 'بانداژ'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'しゅじゅつをします',
    question: 'جمله ژاپنی را بساز:',
    text: 'جراحی می‌کنم',
    words: ['ます', 'し', 'を', 'しゅじゅつ'],
    answer: ['しゅじゅつ', 'を', 'し', 'ます']
  },
  {
    type: 'build-it',
    speak: 'しょくせんに寝ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'روی برانکارد دراز می‌کشم',
    words: ['ます', '寝', 'に', 'しょくせん'],
    answer: ['しょくせん', 'に', '寝', 'ます']
  },
  {
    type: 'build-it',
    speak: 'くるまいすに座ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'روی صندلی چرخدار می‌نشینم',
    words: ['ます', '座り', 'に', 'くるまいす'],
    answer: ['くるまいす', 'に', '座り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ギプスをしています',
    question: 'جمله ژاپنی را بساز:',
    text: 'گچ دارم',
    words: ['ます', 'し', 'を', 'ギプス'],
    answer: ['ギプス', 'を', 'し', 'ています']
  },
  {
    type: 'build-it',
    speak: 'ほうたいを巻きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'بانداژ می‌بندم',
    words: ['ます', '巻き', 'を', 'ほうたい'],
    answer: ['ほうたい', 'を', '巻き', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'しゅじゅつをします',
    question: 'ترجمه را بساز:',
    text: 'しゅじゅつをします',
    words: ['جراحی', 'می‌کنم'],
    answer: ['جراحی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'しょくせんに寝ます',
    question: 'ترجمه را بساز:',
    text: 'しょくせんに寝ます',
    words: ['روی', 'برانکارد', 'دراز', 'می‌کشم'],
    answer: ['روی', 'برانکارد', 'دراز', 'می‌کشم']
  },
  {
    type: 'build-fa',
    speak: 'くるまいすに座ります',
    question: 'ترجمه را بساز:',
    text: 'くるまいすに座ります',
    words: ['روی', 'صندلی چرخدار', 'می‌نشینم'],
    answer: ['روی', 'صندلی چرخدار', 'می‌نشینم']
  },
  {
    type: 'build-fa',
    speak: 'ギプスをしています',
    question: 'ترجمه را بساز:',
    text: 'ギプスをしています',
    words: ['گچ', 'دارم'],
    answer: ['گچ', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'ほうたいを巻きます',
    question: 'ترجمه را بساز:',
    text: 'ほうたいを巻きます',
    words: ['بانداژ', 'می‌بندم'],
    answer: ['بانداژ', 'می‌بندم']
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