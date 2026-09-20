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

// ===== سوالات درس ۸ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "バルコニー" است؟',
    speak: 'バルコニー',
    options: [
      { text: 'バルコニー', image: '../../../media/a2/house/balcony.png' },
      { text: 'ガレージ', image: '../../../media/a2/house/garage.png' },
      { text: 'ちかしつ', image: '../../../media/a2/house/basement.png' },
      { text: 'やねうら', image: '../../../media/a2/house/attic.png' }
    ],
    answer: 'バルコニー'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ガレージ" است؟',
    speak: 'ガレージ',
    options: [
      { text: 'にわ', image: '../../../media/a2/house/yard.png' },
      { text: 'ガレージ', image: '../../../media/a2/house/garage.png' },
      { text: 'バルコニー', image: '../../../media/a2/house/balcony.png' },
      { text: 'ちかしつ', image: '../../../media/a2/house/basement.png' }
    ],
    answer: 'ガレージ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ちかしつ" است؟',
    speak: 'ちかしつ',
    options: [
      { text: 'バルコニー', image: '../../../media/a2/house/balcony.png' },
      { text: 'ちかしつ', image: '../../../media/a2/house/basement.png' },
      { text: 'やねうら', image: '../../../media/a2/house/attic.png' },
      { text: 'ガレージ', image: '../../../media/a2/house/garage.png' }
    ],
    answer: 'ちかしつ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "やねうら" است؟',
    speak: 'やねうら',
    options: [
      { text: 'ガレージ', image: '../../../media/a2/house/garage.png' },
      { text: 'バルコニー', image: '../../../media/a2/house/balcony.png' },
      { text: 'ちかしつ', image: '../../../media/a2/house/basement.png' },
      { text: 'やねうら', image: '../../../media/a2/house/attic.png' }
    ],
    answer: 'やねうら'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "にわ" است؟',
    speak: 'にわ',
    options: [
      { text: 'にわ', image: '../../../media/a2/house/yard.png' },
      { text: 'やねうら', image: '../../../media/a2/house/attic.png' },
      { text: 'バルコニー', image: '../../../media/a2/house/balcony.png' },
      { text: 'ガレージ', image: '../../../media/a2/house/garage.png' }
    ],
    answer: 'にわ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/balcony.png',
    options: ['バルコニー', 'ガレージ', 'ちかしつ', 'やねうら'],
    answer: 'バルコニー'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/garage.png',
    options: ['バルコニー', 'ガレージ', 'ちかしつ', 'にわ'],
    answer: 'ガレージ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/basement.png',
    options: ['にわ', 'バルコニー', 'ちかしつ', 'ガレージ'],
    answer: 'ちかしつ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/attic.png',
    options: ['ちかしつ', 'ガレージ', 'やねうら', 'バルコニー'],
    answer: 'やねうら'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/yard.png',
    options: ['バルコニー', 'やねうら', 'ガレージ', 'にわ'],
    answer: 'にわ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'バルコニー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['バルコニー', 'ガレージ', 'ちかしつ', 'やねうら'],
    answer: 'バルコニー'
  },
  {
    type: 'audio',
    speak: 'ガレージ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['にわ', 'ガレージ', 'バルコニー', 'ちかしつ'],
    answer: 'ガレージ'
  },
  {
    type: 'audio',
    speak: 'ちかしつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['バルコニー', 'ちかしつ', 'やねうら', 'ガレージ'],
    answer: 'ちかしつ'
  },
  {
    type: 'audio',
    speak: 'やねうら',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ガレージ', 'バルコニー', 'ちかしつ', 'やねうら'],
    answer: 'やねうら'
  },
  {
    type: 'audio',
    speak: 'にわ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['にわ', 'やねうら', 'バルコニー', 'ガレージ'],
    answer: 'にわ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'バルコニー',
    image: '../../../media/a2/house/balcony.png',
    meaning: 'بالکن'
  },
  {
    type: 'speak',
    word: 'ガレージ',
    image: '../../../media/a2/house/garage.png',
    meaning: 'گاراژ'
  },
  {
    type: 'speak',
    word: 'ちかしつ',
    image: '../../../media/a2/house/basement.png',
    meaning: 'زیرزمین'
  },
  {
    type: 'speak',
    word: 'やねうら',
    image: '../../../media/a2/house/attic.png',
    meaning: 'اتاق زیرشیروانی'
  },
  {
    type: 'speak',
    word: 'にわ',
    image: '../../../media/a2/house/yard.png',
    meaning: 'حیاط'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '私の家にバルコニーがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'خانه من بالکن دارد',
    words: ['あります', 'が', 'バルコニー', '私の家', 'に'],
    answer: ['私の家', 'に', 'バルコニー', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: '家の隣にガレージがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'کنار خانه گاراژ وجود دارد',
    words: ['あります', 'が', 'ガレージ', '家の隣', 'に'],
    answer: ['家の隣', 'に', 'ガレージ', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: 'ちかしつは暗いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'زیرزمین تاریک است',
    words: ['です', '暗い', 'は', 'ちかしつ'],
    answer: ['ちかしつ', 'は', '暗い', 'です']
  },
  {
    type: 'build-it',
    speak: 'やねうらに古いものがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'در اتاق زیرشیروانی چیزهای قدیمی وجود دارد',
    words: ['あります', 'が', '古いもの', 'やねうら', 'に'],
    answer: ['やねうら', 'に', '古いもの', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: 'にわに花が咲いています',
    question: 'جمله ژاپنی را بساز:',
    text: 'در حیاط گل‌ها شکوفه می‌زنند',
    words: ['います', '咲い', 'が', '花', 'にわ', 'に'],
    answer: ['にわ', 'に', '花', 'が', '咲い', 'ています']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '私の家にバルコニーがあります',
    question: 'ترجمه را بساز:',
    text: '私の家にバルコニーがあります',
    words: ['خانه', 'من', 'بالکن', 'دارد'],
    answer: ['خانه', 'من', 'بالکن', 'دارد']
  },
  {
    type: 'build-fa',
    speak: '家の隣にガレージがあります',
    question: 'ترجمه را بساز:',
    text: '家の隣にガレージがあります',
    words: ['کنار', 'خانه', 'گاراژ', 'وجود دارد'],
    answer: ['کنار', 'خانه', 'گاراژ', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: 'ちかしつは暗いです',
    question: 'ترجمه را بساز:',
    text: 'ちかしつは暗いです',
    words: ['زیرزمین', 'تاریک', 'است'],
    answer: ['زیرزمین', 'تاریک', 'است']
  },
  {
    type: 'build-fa',
    speak: 'やねうらに古いものがあります',
    question: 'ترجمه را بساز:',
    text: 'やねうらに古いものがあります',
    words: ['در', 'اتاق زیرشیروانی', 'چیزهای قدیمی', 'وجود دارد'],
    answer: ['در', 'اتاق زیرشیروانی', 'چیزهای قدیمی', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: 'にわに花が咲いています',
    question: 'ترجمه را بساز:',
    text: 'にわに花が咲いています',
    words: ['در', 'حیاط', 'گل‌ها', 'شکوفه می‌زنند'],
    answer: ['در', 'حیاط', 'گل‌ها', 'شکوفه می‌زنند']
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