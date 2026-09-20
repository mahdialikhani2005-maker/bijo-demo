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

// ===== سوالات درس ۶ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ソファ" است؟',
    speak: 'ソファ',
    options: [
      { text: 'ソファ', image: '../../../media/a2/house/sofa.png' },
      { text: 'れいぞうこ', image: '../../../media/a2/house/fridge.png' },
      { text: 'ようふくいれ', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'かがみ', image: '../../../media/a2/house/mirror.png' }
    ],
    answer: 'ソファ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "れいぞうこ" است؟',
    speak: 'れいぞうこ',
    options: [
      { text: 'ほんだな', image: '../../../media/a2/house/shelf.png' },
      { text: 'れいぞうこ', image: '../../../media/a2/house/fridge.png' },
      { text: 'ソファ', image: '../../../media/a2/house/sofa.png' },
      { text: 'ようふくいれ', image: '../../../media/a2/house/wardrobe.png' }
    ],
    answer: 'れいぞうこ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ようふくいれ" است؟',
    speak: 'ようふくいれ',
    options: [
      { text: 'ソファ', image: '../../../media/a2/house/sofa.png' },
      { text: 'ようふくいれ', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'かがみ', image: '../../../media/a2/house/mirror.png' },
      { text: 'れいぞうこ', image: '../../../media/a2/house/fridge.png' }
    ],
    answer: 'ようふくいれ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かがみ" است؟',
    speak: 'かがみ',
    options: [
      { text: 'れいぞうこ', image: '../../../media/a2/house/fridge.png' },
      { text: 'ソファ', image: '../../../media/a2/house/sofa.png' },
      { text: 'ようふくいれ', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'かがみ', image: '../../../media/a2/house/mirror.png' }
    ],
    answer: 'かがみ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ほんだな" است؟',
    speak: 'ほんだな',
    options: [
      { text: 'ほんだな', image: '../../../media/a2/house/shelf.png' },
      { text: 'かがみ', image: '../../../media/a2/house/mirror.png' },
      { text: 'ソファ', image: '../../../media/a2/house/sofa.png' },
      { text: 'れいぞうこ', image: '../../../media/a2/house/fridge.png' }
    ],
    answer: 'ほんだな'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/sofa.png',
    options: ['ソファ', 'れいぞうこ', 'ようふくいれ', 'かがみ'],
    answer: 'ソファ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/fridge.png',
    options: ['ソファ', 'れいぞうこ', 'ようふくいれ', 'ほんだな'],
    answer: 'れいぞうこ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/wardrobe.png',
    options: ['ほんだな', 'ソファ', 'ようふくいれ', 'れいぞうこ'],
    answer: 'ようふくいれ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/mirror.png',
    options: ['ようふくいれ', 'れいぞうこ', 'かがみ', 'ソファ'],
    answer: 'かがみ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/shelf.png',
    options: ['ソファ', 'かがみ', 'れいぞうこ', 'ほんだな'],
    answer: 'ほんだな'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ソファ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ソファ', 'れいぞうこ', 'ようふくいれ', 'かがみ'],
    answer: 'ソファ'
  },
  {
    type: 'audio',
    speak: 'れいぞうこ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ほんだな', 'れいぞうこ', 'ソファ', 'ようふくいれ'],
    answer: 'れいぞうこ'
  },
  {
    type: 'audio',
    speak: 'ようふくいれ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ソファ', 'ようふくいれ', 'かがみ', 'れいぞうこ'],
    answer: 'ようふくいれ'
  },
  {
    type: 'audio',
    speak: 'かがみ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['れいぞうこ', 'ソファ', 'ようふくいれ', 'かがみ'],
    answer: 'かがみ'
  },
  {
    type: 'audio',
    speak: 'ほんだな',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ほんだな', 'かがみ', 'ソファ', 'れいぞうこ'],
    answer: 'ほんだな'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ソファ',
    image: '../../../media/a2/house/sofa.png',
    meaning: 'مبل'
  },
  {
    type: 'speak',
    word: 'れいぞうこ',
    image: '../../../media/a2/house/fridge.png',
    meaning: 'یخچال'
  },
  {
    type: 'speak',
    word: 'ようふくいれ',
    image: '../../../media/a2/house/wardrobe.png',
    meaning: 'کمد لباس'
  },
  {
    type: 'speak',
    word: 'かがみ',
    image: '../../../media/a2/house/mirror.png',
    meaning: 'آینه'
  },
  {
    type: 'speak',
    word: 'ほんだな',
    image: '../../../media/a2/house/shelf.png',
    meaning: 'قفسه کتاب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '部屋にソファがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'در اتاق مبل وجود دارد',
    words: ['あります', 'が', 'ソファ', '部屋', 'に'],
    answer: ['部屋', 'に', 'ソファ', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: '台所にれいぞうこがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'در آشپزخانه یخچال وجود دارد',
    words: ['あります', 'が', 'れいぞうこ', '台所', 'に'],
    answer: ['台所', 'に', 'れいぞうこ', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: '私の部屋にようふくいれがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'در اتاق من کمد لباس وجود دارد',
    words: ['あります', 'が', 'ようふくいれ', '私の部屋', 'に'],
    answer: ['私の部屋', 'に', 'ようふくいれ', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: '壁にかがみがあります',
    question: 'جمله ژاپنی را بساز:',
    text: 'روی دیوار آینه وجود دارد',
    words: ['あります', 'が', 'かがみ', '壁', 'に'],
    answer: ['壁', 'に', 'かがみ', 'が', 'あります']
  },
  {
    type: 'build-it',
    speak: '本だなに本があります',
    question: 'جمله ژاپنی را بساز:',
    text: 'روی قفسه کتاب کتاب وجود دارد',
    words: ['あります', 'が', '本', '本だな', 'に'],
    answer: ['本だな', 'に', '本', 'が', 'あります']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '部屋にソファがあります',
    question: 'ترجمه را بساز:',
    text: '部屋にソファがあります',
    words: ['در', 'اتاق', 'مبل', 'وجود دارد'],
    answer: ['در', 'اتاق', 'مبل', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '台所にれいぞうこがあります',
    question: 'ترجمه را بساز:',
    text: '台所にれいぞうこがあります',
    words: ['در', 'آشپزخانه', 'یخچال', 'وجود دارد'],
    answer: ['در', 'آشپزخانه', 'یخچال', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '私の部屋にようふくいれがあります',
    question: 'ترجمه را بساز:',
    text: '私の部屋にようふくいれがあります',
    words: ['در', 'اتاق من', 'کمد لباس', 'وجود دارد'],
    answer: ['در', 'اتاق من', 'کمد لباس', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '壁にかがみがあります',
    question: 'ترجمه را بساز:',
    text: '壁にかがみがあります',
    words: ['روی', 'دیوار', 'آینه', 'وجود دارد'],
    answer: ['روی', 'دیوار', 'آینه', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '本だなに本があります',
    question: 'ترجمه را بساز:',
    text: '本だなに本があります',
    words: ['روی', 'قفسه کتاب', 'کتاب', 'وجود دارد'],
    answer: ['روی', 'قفسه کتاب', 'کتاب', 'وجود دارد']
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