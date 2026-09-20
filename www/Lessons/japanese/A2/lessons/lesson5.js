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

// ===== سوالات درس ۵ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "そせん" است؟',
    speak: 'そせん',
    options: [
      { text: 'そせん', image: '../../../media/a2/family/ancestor.png' },
      { text: 'しそん', image: '../../../media/a2/family/descendant.png' },
      { text: 'きょうだい', image: '../../../media/a2/family/sibling.png' },
      { text: 'こんやくしゃ', image: '../../../media/a2/family/fiance.png' }
    ],
    answer: 'そせん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "しそん" است؟',
    speak: 'しそん',
    options: [
      { text: 'こんやくしゃ', image: '../../../media/a2/family/fiancee.png' },
      { text: 'しそん', image: '../../../media/a2/family/descendant.png' },
      { text: 'そせん', image: '../../../media/a2/family/ancestor.png' },
      { text: 'きょうだい', image: '../../../media/a2/family/sibling.png' }
    ],
    answer: 'しそん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "きょうだい" است؟',
    speak: 'きょうだい',
    options: [
      { text: 'そせん', image: '../../../media/a2/family/ancestor.png' },
      { text: 'きょうだい', image: '../../../media/a2/family/sibling.png' },
      { text: 'こんやくしゃ', image: '../../../media/a2/family/fiance.png' },
      { text: 'しそん', image: '../../../media/a2/family/descendant.png' }
    ],
    answer: 'きょうだい'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "こんやくしゃ" (نامزد مرد) است؟',
    speak: 'こんやくしゃ',
    options: [
      { text: 'しそん', image: '../../../media/a2/family/descendant.png' },
      { text: 'そせん', image: '../../../media/a2/family/ancestor.png' },
      { text: 'きょうだい', image: '../../../media/a2/family/sibling.png' },
      { text: 'こんやくしゃ', image: '../../../media/a2/family/fiance.png' }
    ],
    answer: 'こんやくしゃ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "こんやくしゃ" (نامزد زن) است؟',
    speak: 'こんやくしゃ',
    options: [
      { text: 'こんやくしゃ', image: '../../../media/a2/family/fiancee.png' },
      { text: 'きょうだい', image: '../../../media/a2/family/sibling.png' },
      { text: 'そせん', image: '../../../media/a2/family/ancestor.png' },
      { text: 'しそん', image: '../../../media/a2/family/descendant.png' }
    ],
    answer: 'こんやくしゃ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/ancestor.png',
    options: ['そせん', 'しそん', 'きょうだい', 'こんやくしゃ'],
    answer: 'そせん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/descendant.png',
    options: ['そせん', 'しそん', 'きょうだい', 'こんやくしゃ'],
    answer: 'しそん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/sibling.png',
    options: ['こんやくしゃ', 'そせん', 'きょうだい', 'しそん'],
    answer: 'きょうだい'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟ (نامزد مرد)',
    image: '../../../media/a2/family/fiance.png',
    options: ['きょうだい', 'しそん', 'こんやくしゃ', 'そせん'],
    answer: 'こんやくしゃ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟ (نامزد زن)',
    image: '../../../media/a2/family/fiancee.png',
    options: ['そせん', 'こんやくしゃ', 'きょうだい', 'しそん'],
    answer: 'こんやくしゃ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'そせん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['そせん', 'しそん', 'きょうだい', 'こんやくしゃ'],
    answer: 'そせん'
  },
  {
    type: 'audio',
    speak: 'しそん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['こんやくしゃ', 'しそん', 'そせん', 'きょうだい'],
    answer: 'しそん'
  },
  {
    type: 'audio',
    speak: 'きょうだい',
    question: 'کدام کلمه را شنیدی؟',
    options: ['そせん', 'きょうだい', 'こんやくしゃ', 'しそん'],
    answer: 'きょうだい'
  },
  {
    type: 'audio',
    speak: 'こんやくしゃ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['しそん', 'そせん', 'きょうだい', 'こんやくしゃ'],
    answer: 'こんやくしゃ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'そせん',
    image: '../../../media/a2/family/ancestor.png',
    meaning: 'جد/نیاکان'
  },
  {
    type: 'speak',
    word: 'しそん',
    image: '../../../media/a2/family/descendant.png',
    meaning: 'فرزند/نسل'
  },
  {
    type: 'speak',
    word: 'きょうだい',
    image: '../../../media/a2/family/sibling.png',
    meaning: 'خواهر/برادر'
  },
  {
    type: 'speak',
    word: 'こんやくしゃ',
    image: '../../../media/a2/family/fiance.png',
    meaning: 'نامزد (مرد)'
  },
  {
    type: 'speak',
    word: 'こんやくしゃ',
    image: '../../../media/a2/family/fiancee.png',
    meaning: 'نامزد (زن)'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '私のそせんは日本人です',
    question: 'جمله ژاپنی را بساز:',
    text: 'نیاکان من ژاپنی هستند',
    words: ['です', '日本人', 'は', 'そせん', '私の'],
    answer: ['私の', 'そせん', 'は', '日本人', 'です']
  },
  {
    type: 'build-it',
    speak: '私のしそんは学生です',
    question: 'جمله ژاپنی را بساز:',
    text: 'فرزند من دانش‌آموز است',
    words: ['です', '学生', 'は', 'しそん', '私の'],
    answer: ['私の', 'しそん', 'は', '学生', 'です']
  },
  {
    type: 'build-it',
    speak: '私にはきょうだいがいます',
    question: 'جمله ژاپنی را بساز:',
    text: 'من خواهر/برادر دارم',
    words: ['います', 'が', 'きょうだい', '私', 'には'],
    answer: ['私', 'には', 'きょうだい', 'が', 'います']
  },
  {
    type: 'build-it',
    speak: '彼は私のこんやくしゃです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او نامزد من است',
    words: ['です', 'こんやくしゃ', '私の', 'は', '彼'],
    answer: ['彼', 'は', '私の', 'こんやくしゃ', 'です']
  },
  {
    type: 'build-it',
    speak: '彼女は私のこんやくしゃです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او نامزد من است',
    words: ['です', 'こんやくしゃ', '私の', 'は', '彼女'],
    answer: ['彼女', 'は', '私の', 'こんやくしゃ', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '私のそせんは日本人です',
    question: 'ترجمه را بساز:',
    text: '私のそせんは日本人です',
    words: ['نیاکان', 'من', 'ژاپنی', 'هستند'],
    answer: ['نیاکان', 'من', 'ژاپنی', 'هستند']
  },
  {
    type: 'build-fa',
    speak: '私のしそんは学生です',
    question: 'ترجمه را بساز:',
    text: '私のしそんは学生です',
    words: ['فرزند', 'من', 'دانش‌آموز', 'است'],
    answer: ['فرزند', 'من', 'دانش‌آموز', 'است']
  },
  {
    type: 'build-fa',
    speak: '私にはきょうだいがいます',
    question: 'ترجمه را بساز:',
    text: '私にはきょうだいがいます',
    words: ['من', 'خواهر/برادر', 'دارم'],
    answer: ['من', 'خواهر/برادر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: '彼は私のこんやくしゃです',
    question: 'ترجمه را بساز:',
    text: '彼は私のこんやくしゃです',
    words: ['او', 'نامزد', 'من', 'است'],
    answer: ['او', 'نامزد', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼女は私のこんやくしゃです',
    question: 'ترجمه را بساز:',
    text: '彼女は私のこんやくしゃです',
    words: ['او', 'نامزد', 'من', 'است'],
    answer: ['او', 'نامزد', 'من', 'است']
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