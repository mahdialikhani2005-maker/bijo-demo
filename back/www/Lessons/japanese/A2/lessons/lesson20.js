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

// ===== سوالات درس ۲۰ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "はいゆう" است؟',
    speak: 'はいゆう',
    options: [
      { text: 'はいゆう', image: '../../../media/a2/jobs/actor.png' },
      { text: 'じょゆう', image: '../../../media/a2/jobs/actress.png' },
      { text: 'かんとく', image: '../../../media/a2/jobs/director.png' },
      { text: 'せいさくしゃ', image: '../../../media/a2/jobs/producer.png' }
    ],
    answer: 'はいゆう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "じょゆう" است؟',
    speak: 'じょゆう',
    options: [
      { text: 'へんしゅうしゃ', image: '../../../media/a2/jobs/editor.png' },
      { text: 'じょゆう', image: '../../../media/a2/jobs/actress.png' },
      { text: 'はいゆう', image: '../../../media/a2/jobs/actor.png' },
      { text: 'かんとく', image: '../../../media/a2/jobs/director.png' }
    ],
    answer: 'じょゆう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かんとく" است؟',
    speak: 'かんとく',
    options: [
      { text: 'はいゆう', image: '../../../media/a2/jobs/actor.png' },
      { text: 'かんとく', image: '../../../media/a2/jobs/director.png' },
      { text: 'せいさくしゃ', image: '../../../media/a2/jobs/producer.png' },
      { text: 'じょゆう', image: '../../../media/a2/jobs/actress.png' }
    ],
    answer: 'かんとく'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "せいさくしゃ" است؟',
    speak: 'せいさくしゃ',
    options: [
      { text: 'じょゆう', image: '../../../media/a2/jobs/actress.png' },
      { text: 'はいゆう', image: '../../../media/a2/jobs/actor.png' },
      { text: 'かんとく', image: '../../../media/a2/jobs/director.png' },
      { text: 'せいさくしゃ', image: '../../../media/a2/jobs/producer.png' }
    ],
    answer: 'せいさくしゃ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "へんしゅうしゃ" است؟',
    speak: 'へんしゅうしゃ',
    options: [
      { text: 'へんしゅうしゃ', image: '../../../media/a2/jobs/editor.png' },
      { text: 'せいさくしゃ', image: '../../../media/a2/jobs/producer.png' },
      { text: 'はいゆう', image: '../../../media/a2/jobs/actor.png' },
      { text: 'じょゆう', image: '../../../media/a2/jobs/actress.png' }
    ],
    answer: 'へんしゅうしゃ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/actor.png',
    options: ['はいゆう', 'じょゆう', 'かんとく', 'せいさくしゃ'],
    answer: 'はいゆう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/actress.png',
    options: ['はいゆう', 'じょゆう', 'かんとく', 'へんしゅうしゃ'],
    answer: 'じょゆう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/director.png',
    options: ['へんしゅうしゃ', 'はいゆう', 'かんとく', 'じょゆう'],
    answer: 'かんとく'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/producer.png',
    options: ['かんとく', 'じょゆう', 'せいさくしゃ', 'はいゆう'],
    answer: 'せいさくしゃ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/editor.png',
    options: ['はいゆう', 'せいさくしゃ', 'じょゆう', 'へんしゅうしゃ'],
    answer: 'へんしゅうしゃ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'はいゆう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['はいゆう', 'じょゆう', 'かんとく', 'せいさくしゃ'],
    answer: 'はいゆう'
  },
  {
    type: 'audio',
    speak: 'じょゆう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['へんしゅうしゃ', 'じょゆう', 'はいゆう', 'かんとく'],
    answer: 'じょゆう'
  },
  {
    type: 'audio',
    speak: 'かんとく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['はいゆう', 'かんとく', 'せいさくしゃ', 'じょゆう'],
    answer: 'かんとく'
  },
  {
    type: 'audio',
    speak: 'せいさくしゃ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['じょゆう', 'はいゆう', 'かんとく', 'せいさくしゃ'],
    answer: 'せいさくしゃ'
  },
  {
    type: 'audio',
    speak: 'へんしゅうしゃ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['へんしゅうしゃ', 'せいさくしゃ', 'はいゆう', 'じょゆう'],
    answer: 'へんしゅうしゃ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'はいゆう',
    image: '../../../media/a2/jobs/actor.png',
    meaning: 'بازیگر (مرد)'
  },
  {
    type: 'speak',
    word: 'じょゆう',
    image: '../../../media/a2/jobs/actress.png',
    meaning: 'بازیگر (زن)'
  },
  {
    type: 'speak',
    word: 'かんとく',
    image: '../../../media/a2/jobs/director.png',
    meaning: 'کارگردان'
  },
  {
    type: 'speak',
    word: 'せいさくしゃ',
    image: '../../../media/a2/jobs/producer.png',
    meaning: 'تهیه‌کننده'
  },
  {
    type: 'speak',
    word: 'へんしゅうしゃ',
    image: '../../../media/a2/jobs/editor.png',
    meaning: 'ویراستار'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '彼ははいゆうです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او بازیگر است',
    words: ['です', 'はいゆう', '彼', 'は'],
    answer: ['彼', 'は', 'はいゆう', 'です']
  },
  {
    type: 'build-it',
    speak: '彼女はじょゆうです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او بازیگر است',
    words: ['です', 'じょゆう', '彼女', 'は'],
    answer: ['彼女', 'は', 'じょゆう', 'です']
  },
  {
    type: 'build-it',
    speak: '彼はかんとくです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او کارگردان است',
    words: ['です', 'かんとく', '彼', 'は'],
    answer: ['彼', 'は', 'かんとく', 'です']
  },
  {
    type: 'build-it',
    speak: '彼女はせいさくしゃです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او تهیه‌کننده است',
    words: ['です', 'せいさくしゃ', '彼女', 'は'],
    answer: ['彼女', 'は', 'せいさくしゃ', 'です']
  },
  {
    type: 'build-it',
    speak: '彼はへんしゅうしゃです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او ویراستار است',
    words: ['です', 'へんしゅうしゃ', '彼', 'は'],
    answer: ['彼', 'は', 'へんしゅうしゃ', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '彼ははいゆうです',
    question: 'ترجمه را بساز:',
    text: '彼ははいゆうです',
    words: ['او', 'بازیگر', 'است'],
    answer: ['او', 'بازیگر', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼女はじょゆうです',
    question: 'ترجمه را بساز:',
    text: '彼女はじょゆうです',
    words: ['او', 'بازیگر', 'است'],
    answer: ['او', 'بازیگر', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼はかんとくです',
    question: 'ترجمه را بساز:',
    text: '彼はかんとくです',
    words: ['او', 'کارگردان', 'است'],
    answer: ['او', 'کارگردان', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼女はせいさくしゃです',
    question: 'ترجمه را بساز:',
    text: '彼女はせいさくしゃです',
    words: ['او', 'تهیه‌کننده', 'است'],
    answer: ['او', 'تهیه‌کننده', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼はへんしゅうしゃです',
    question: 'ترجمه را بساز:',
    text: '彼はへんしゅうしゃです',
    words: ['او', 'ویراستار', 'است'],
    answer: ['او', 'ویراستار', 'است']
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