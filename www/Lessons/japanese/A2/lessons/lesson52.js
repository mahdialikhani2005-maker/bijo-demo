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

// ===== سوالات درس ۵۲ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "リュックサック" است؟',
    speak: 'リュックサック',
    options: [
      { text: 'リュックサック', image: '../../../media/a2/travel/backpack.png' },
      { text: 'テント', image: '../../../media/a2/travel/tent.png' },
      { text: 'らしんばん', image: '../../../media/a2/travel/compass.png' },
      { text: 'そうがんきょう', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'リュックサック'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "テント" است؟',
    speak: 'テント',
    options: [
      { text: 'にっこうやく', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'テント', image: '../../../media/a2/travel/tent.png' },
      { text: 'リュックサック', image: '../../../media/a2/travel/backpack.png' },
      { text: 'らしんばん', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: 'テント'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "らしんばん" است؟',
    speak: 'らしんばん',
    options: [
      { text: 'リュックサック', image: '../../../media/a2/travel/backpack.png' },
      { text: 'らしんばん', image: '../../../media/a2/travel/compass.png' },
      { text: 'そうがんきょう', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'テント', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'らしんばん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "そうがんきょう" است؟',
    speak: 'そうがんきょう',
    options: [
      { text: 'テント', image: '../../../media/a2/travel/tent.png' },
      { text: 'リュックサック', image: '../../../media/a2/travel/backpack.png' },
      { text: 'らしんばん', image: '../../../media/a2/travel/compass.png' },
      { text: 'そうがんきょう', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'そうがんきょう'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "にっこうやく" است؟',
    speak: 'にっこうやく',
    options: [
      { text: 'にっこうやく', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'そうがんきょう', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'リュックサック', image: '../../../media/a2/travel/backpack.png' },
      { text: 'テント', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'にっこうやく'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['リュックサック', 'テント', 'らしんばん', 'そうがんきょう'],
    answer: 'リュックサック'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['リュックサック', 'テント', 'らしんばん', 'にっこうやく'],
    answer: 'テント'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['にっこうやく', 'リュックサック', 'らしんばん', 'テント'],
    answer: 'らしんばん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['らしんばん', 'テント', 'そうがんきょう', 'リュックサック'],
    answer: 'そうがんきょう'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['リュックサック', 'そうがんきょう', 'テント', 'にっこうやく'],
    answer: 'にっこうやく'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'リュックサック',
    question: 'کدام کلمه را شنیدی؟',
    options: ['リュックサック', 'テント', 'らしんばん', 'そうがんきょう'],
    answer: 'リュックサック'
  },
  {
    type: 'audio',
    speak: 'テント',
    question: 'کدام کلمه را شنیدی؟',
    options: ['にっこうやく', 'テント', 'リュックサック', 'らしんばん'],
    answer: 'テント'
  },
  {
    type: 'audio',
    speak: 'らしんばん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['リュックサック', 'らしんばん', 'そうがんきょう', 'テント'],
    answer: 'らしんばん'
  },
  {
    type: 'audio',
    speak: 'そうがんきょう',
    question: 'کدام کلمه را شنیدی؟',
    options: ['テント', 'リュックサック', 'らしんばん', 'そうがんきょう'],
    answer: 'そうがんきょう'
  },
  {
    type: 'audio',
    speak: 'にっこうやく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['にっこうやく', 'そうがんきょう', 'リュックサック', 'テント'],
    answer: 'にっこうやく'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'リュックサック',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: 'テント',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: 'らしんばん',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: 'そうがんきょう',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: 'にっこうやく',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'リュックサックを背負います',
    question: 'جمله ژاپنی را بساز:',
    text: 'کوله پشتی را بر دوش می‌کشم',
    words: ['ます', '背負い', 'を', 'リュックサック'],
    answer: ['リュックサック', 'を', '背負い', 'ます']
  },
  {
    type: 'build-it',
    speak: 'テントを張ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'چادر برپا می‌کنم',
    words: ['ます', '張り', 'を', 'テント'],
    answer: ['テント', 'を', '張り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'らしんばんで方角を確かめます',
    question: 'جمله ژاپنی را بساز:',
    text: 'با قطب‌نما جهت را بررسی می‌کنم',
    words: ['ます', '確かめ', 'を', '方角', 'で', 'らしんばん'],
    answer: ['らしんばん', 'で', '方角', 'を', '確かめ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'そうがんきょうで見ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'با دوربین دوچشمی نگاه می‌کنم',
    words: ['ます', '見', 'で', 'そうがんきょう'],
    answer: ['そうがんきょう', 'で', '見', 'ます']
  },
  {
    type: 'build-it',
    speak: 'にっこうやくを塗ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'کرم ضدآفتاب می‌زنم',
    words: ['ます', '塗り', 'を', 'にっこうやく'],
    answer: ['にっこうやく', 'を', '塗り', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'リュックサックを背負います',
    question: 'ترجمه را بساز:',
    text: 'リュックサックを背負います',
    words: ['کوله پشتی', 'را', 'بر دوش', 'می‌کشم'],
    answer: ['کوله پشتی', 'را', 'بر دوش', 'می‌کشم']
  },
  {
    type: 'build-fa',
    speak: 'テントを張ります',
    question: 'ترجمه را بساز:',
    text: 'テントを張ります',
    words: ['چادر', 'برپا', 'می‌کنم'],
    answer: ['چادر', 'برپا', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'らしんばんで方角を確かめます',
    question: 'ترجمه را بساز:',
    text: 'らしんばんで方角を確かめます',
    words: ['با', 'قطب‌نما', 'جهت', 'را', 'بررسی', 'می‌کنم'],
    answer: ['با', 'قطب‌نما', 'جهت', 'را', 'بررسی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'そうがんきょうで見ます',
    question: 'ترجمه را بساز:',
    text: 'そうがんきょうで見ます',
    words: ['با', 'دوربین دوچشمی', 'نگاه', 'می‌کنم'],
    answer: ['با', 'دوربین دوچشمی', 'نگاه', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'にっこうやくを塗ります',
    question: 'ترجمه را بساز:',
    text: 'にっこうやくを塗ります',
    words: ['کرم ضدآفتاب', 'می‌زنم'],
    answer: ['کرم ضدآفتاب', 'می‌زنم']
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