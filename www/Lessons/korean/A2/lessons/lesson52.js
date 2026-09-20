let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
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
  recognition.lang = 'ko-KR';
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

// ===== سوالات درس ۵۲ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "배낭" است؟',
    speak: '배낭',
    options: [
      { text: '배낭', image: '../../../media/a2/travel/backpack.png' },
      { text: '텐트', image: '../../../media/a2/travel/tent.png' },
      { text: '나침반', image: '../../../media/a2/travel/compass.png' },
      { text: '쌍안경', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: '배낭'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "텐트" است؟',
    speak: '텐트',
    options: [
      { text: '선크림', image: '../../../media/a2/travel/sunscreen.png' },
      { text: '텐트', image: '../../../media/a2/travel/tent.png' },
      { text: '배낭', image: '../../../media/a2/travel/backpack.png' },
      { text: '나침반', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: '텐트'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "나침반" است؟',
    speak: '나침반',
    options: [
      { text: '배낭', image: '../../../media/a2/travel/backpack.png' },
      { text: '나침반', image: '../../../media/a2/travel/compass.png' },
      { text: '쌍안경', image: '../../../media/a2/travel/binoculars.png' },
      { text: '텐트', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: '나침반'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "쌍안경" است؟',
    speak: '쌍안경',
    options: [
      { text: '텐트', image: '../../../media/a2/travel/tent.png' },
      { text: '배낭', image: '../../../media/a2/travel/backpack.png' },
      { text: '나침반', image: '../../../media/a2/travel/compass.png' },
      { text: '쌍안경', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: '쌍안경'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "선크림" است؟',
    speak: '선크림',
    options: [
      { text: '선크림', image: '../../../media/a2/travel/sunscreen.png' },
      { text: '쌍안경', image: '../../../media/a2/travel/binoculars.png' },
      { text: '배낭', image: '../../../media/a2/travel/backpack.png' },
      { text: '텐트', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: '선크림'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['배낭', '텐트', '나침반', '쌍안경'],
    answer: '배낭'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['배낭', '텐트', '나침반', '선크림'],
    answer: '텐트'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['선크림', '배낭', '나침반', '텐트'],
    answer: '나침반'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['나침반', '텐트', '쌍안경', '배낭'],
    answer: '쌍안경'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['배낭', '쌍안경', '텐트', '선크림'],
    answer: '선크림'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '배낭',
    question: 'کدام کلمه را شنیدی؟',
    options: ['배낭', '텐트', '나침반', '쌍안경'],
    answer: '배낭'
  },
  {
    type: 'audio',
    speak: '텐트',
    question: 'کدام کلمه را شنیدی؟',
    options: ['선크림', '텐트', '배낭', '나침반'],
    answer: '텐트'
  },
  {
    type: 'audio',
    speak: '나침반',
    question: 'کدام کلمه را شنیدی؟',
    options: ['배낭', '나침반', '쌍안경', '텐트'],
    answer: '나침반'
  },
  {
    type: 'audio',
    speak: '쌍안경',
    question: 'کدام کلمه را شنیدی؟',
    options: ['텐트', '배낭', '나침반', '쌍안경'],
    answer: '쌍안경'
  },
  {
    type: 'audio',
    speak: '선크림',
    question: 'کدام کلمه را شنیدی؟',
    options: ['선크림', '쌍안경', '배낭', '텐트'],
    answer: '선크림'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '배낭',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: '텐트',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: '나침반',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: '쌍안경',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: '선크림',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '배낭을 멥니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'کوله پشتی را بر دوش می‌کشم',
    words: ['멥니다', '을', '배낭'],
    answer: ['배낭을', '멥니다']
  },
  {
    type: 'build-it',
    speak: '텐트를 칩니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'چادر برپا می‌کنم',
    words: ['칩니다', '를', '텐트'],
    answer: ['텐트를', '칩니다']
  },
  {
    type: 'build-it',
    speak: '나침반으로 방향을 확인합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با قطب‌نما جهت را بررسی می‌کنم',
    words: ['확인합니다', '을', '방향', '으로', '나침반'],
    answer: ['나침반으로', '방향을', '확인합니다']
  },
  {
    type: 'build-it',
    speak: '쌍안경으로 봅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'با دوربین دوچشمی نگاه می‌کنم',
    words: ['봅니다', '으로', '쌍안경'],
    answer: ['쌍안경으로', '봅니다']
  },
  {
    type: 'build-it',
    speak: '선크림을 바릅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'کرم ضدآفتاب می‌زنم',
    words: ['바릅니다', '을', '선크림'],
    answer: ['선크림을', '바릅니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '배낭을 멥니다',
    question: 'ترجمه را بساز:',
    text: '배낭을 멥니다',
    words: ['کوله پشتی', 'را', 'بر دوش', 'می‌کشم'],
    answer: ['کوله پشتی', 'را', 'بر دوش', 'می‌کشم']
  },
  {
    type: 'build-fa',
    speak: '텐트를 칩니다',
    question: 'ترجمه را بساز:',
    text: '텐트를 칩니다',
    words: ['چادر', 'برپا', 'می‌کنم'],
    answer: ['چادر', 'برپا', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '나침반으로 방향을 확인합니다',
    question: 'ترجمه را بساز:',
    text: '나침반으로 방향을 확인합니다',
    words: ['با', 'قطب‌نما', 'جهت', 'را', 'بررسی', 'می‌کنم'],
    answer: ['با', 'قطب‌نما', 'جهت', 'را', 'بررسی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '쌍안경으로 봅니다',
    question: 'ترجمه را بساز:',
    text: '쌍안경으로 봅니다',
    words: ['با', 'دوربین دوچشمی', 'نگاه', 'می‌کنم'],
    answer: ['با', 'دوربین دوچشمی', 'نگاه', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '선크림을 바릅니다',
    question: 'ترجمه را بساز:',
    text: '선크림을 바릅니다',
    words: ['کرم ضدآفتاب', 'می‌زنم'],
    answer: ['کرم ضدآفتاب', 'می‌زنم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 레슨이 끝났습니다! 🎉</h2>
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