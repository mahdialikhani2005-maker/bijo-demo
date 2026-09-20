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

// ===== سوالات درس ۴۷ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "じてん" است؟',
    speak: 'じてん',
    options: [
      { text: 'じてん', image: '../../../media/a2/school/dictionary.png' },
      { text: 'ひゃっかじてん', image: '../../../media/a2/school/encyclopedia.png' },
      { text: 'ちず', image: '../../../media/a2/school/atlas.png' },
      { text: 'らしんばん', image: '../../../media/a2/school/compass.png' }
    ],
    answer: 'じてん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ひゃっかじてん" است؟',
    speak: 'ひゃっかじてん',
    options: [
      { text: 'ぶんどき', image: '../../../media/a2/school/protractor.png' },
      { text: 'ひゃっかじてん', image: '../../../media/a2/school/encyclopedia.png' },
      { text: 'じてん', image: '../../../media/a2/school/dictionary.png' },
      { text: 'ちず', image: '../../../media/a2/school/atlas.png' }
    ],
    answer: 'ひゃっかじてん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ちず" است؟',
    speak: 'ちず',
    options: [
      { text: 'じてん', image: '../../../media/a2/school/dictionary.png' },
      { text: 'ちず', image: '../../../media/a2/school/atlas.png' },
      { text: 'らしんばん', image: '../../../media/a2/school/compass.png' },
      { text: 'ひゃっかじてん', image: '../../../media/a2/school/encyclopedia.png' }
    ],
    answer: 'ちず'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "らしんばん" است؟',
    speak: 'らしんばん',
    options: [
      { text: 'ひゃっかじてん', image: '../../../media/a2/school/encyclopedia.png' },
      { text: 'じてん', image: '../../../media/a2/school/dictionary.png' },
      { text: 'ちず', image: '../../../media/a2/school/atlas.png' },
      { text: 'らしんばん', image: '../../../media/a2/school/compass.png' }
    ],
    answer: 'らしんばん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ぶんどき" است؟',
    speak: 'ぶんどき',
    options: [
      { text: 'ぶんどき', image: '../../../media/a2/school/protractor.png' },
      { text: 'らしんばん', image: '../../../media/a2/school/compass.png' },
      { text: 'じてん', image: '../../../media/a2/school/dictionary.png' },
      { text: 'ちず', image: '../../../media/a2/school/atlas.png' }
    ],
    answer: 'ぶんどき'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dictionary.png',
    options: ['じてん', 'ひゃっかじてん', 'ちず', 'らしんばん'],
    answer: 'じてん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/encyclopedia.png',
    options: ['じてん', 'ひゃっかじてん', 'ちず', 'ぶんどき'],
    answer: 'ひゃっかじてん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/atlas.png',
    options: ['ぶんどき', 'じてん', 'ちず', 'ひゃっかじてん'],
    answer: 'ちず'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/compass.png',
    options: ['ちず', 'ひゃっかじてん', 'らしんばん', 'じてん'],
    answer: 'らしんばん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/protractor.png',
    options: ['じてん', 'らしんばん', 'ちず', 'ぶんどき'],
    answer: 'ぶんどき'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'じてん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['じてん', 'ひゃっかじてん', 'ちず', 'らしんばん'],
    answer: 'じてん'
  },
  {
    type: 'audio',
    speak: 'ひゃっかじてん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ぶんどき', 'ひゃっかじてん', 'じてん', 'ちず'],
    answer: 'ひゃっかじてん'
  },
  {
    type: 'audio',
    speak: 'ちず',
    question: 'کدام کلمه را شنیدی؟',
    options: ['じてん', 'ちず', 'らしんばん', 'ひゃっかじてん'],
    answer: 'ちず'
  },
  {
    type: 'audio',
    speak: 'らしんばん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ひゃっかじてん', 'じてん', 'ちず', 'らしんばん'],
    answer: 'らしんばん'
  },
  {
    type: 'audio',
    speak: 'ぶんどき',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ぶんどき', 'らしんばん', 'じてん', 'ちず'],
    answer: 'ぶんどき'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'じてん',
    image: '../../../media/a2/school/dictionary.png',
    meaning: 'فرهنگ لغت'
  },
  {
    type: 'speak',
    word: 'ひゃっかじてん',
    image: '../../../media/a2/school/encyclopedia.png',
    meaning: 'دایره‌المعارف'
  },
  {
    type: 'speak',
    word: 'ちず',
    image: '../../../media/a2/school/atlas.png',
    meaning: 'اطلس'
  },
  {
    type: 'speak',
    word: 'らしんばん',
    image: '../../../media/a2/school/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: 'ぶんどき',
    image: '../../../media/a2/school/protractor.png',
    meaning: 'نقاله'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'じてんを引きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'فرهنگ لغت را جستجو می‌کنم',
    words: ['ます', '引き', 'を', 'じてん'],
    answer: ['じてん', 'を', '引き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ひゃっかじてんで調べます',
    question: 'جمله ژاپنی را بساز:',
    text: 'در دایره‌المعارف جستجو می‌کنم',
    words: ['ます', '調べ', 'で', 'ひゃっかじてん'],
    answer: ['ひゃっかじてん', 'で', '調べ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ちずを見ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'اطلس را می‌بینم',
    words: ['ます', '見', 'を', 'ちず'],
    answer: ['ちず', 'を', '見', 'ます']
  },
  {
    type: 'build-it',
    speak: 'らしんばんを使います',
    question: 'جمله ژاپنی را بساز:',
    text: 'قطب‌نما استفاده می‌کنم',
    words: ['ます', '使い', 'を', 'らしんばん'],
    answer: ['らしんばん', 'を', '使い', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ぶんどきで角度を測ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'با نقاله زاویه اندازه می‌گیرم',
    words: ['ます', '測り', 'を', '角度', 'で', 'ぶんどき'],
    answer: ['ぶんどき', 'で', '角度', 'を', '測り', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'じてんを引きます',
    question: 'ترجمه را بساز:',
    text: 'じてんを引きます',
    words: ['فرهنگ لغت', 'را', 'جستجو', 'می‌کنم'],
    answer: ['فرهنگ لغت', 'را', 'جستجو', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ひゃっかじてんで調べます',
    question: 'ترجمه را بساز:',
    text: 'ひゃっかじてんで調べます',
    words: ['در', 'دایره‌المعارف', 'جستجو', 'می‌کنم'],
    answer: ['در', 'دایره‌المعارف', 'جستجو', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ちずを見ます',
    question: 'ترجمه را بساز:',
    text: 'ちずを見ます',
    words: ['اطلس', 'را', 'می‌بینم'],
    answer: ['اطلس', 'را', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'らしんばんを使います',
    question: 'ترجمه را بساز:',
    text: 'らしんばんを使います',
    words: ['قطب‌نما', 'استفاده', 'می‌کنم'],
    answer: ['قطب‌نما', 'استفاده', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'ぶんどきで角度を測ります',
    question: 'ترجمه را بساز:',
    text: 'ぶんどきで角度を測ります',
    words: ['با', 'نقاله', 'زاویه', 'اندازه', 'می‌گیرم'],
    answer: ['با', 'نقاله', 'زاویه', 'اندازه', 'می‌گیرم']
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