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

// ===== سوالات درس ۲۲ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "피자" است؟',
    speak: '피자',
    options: [
      { text: '피자', image: '../../../media/a2/food/pizza.png' },
      { text: '파스타', image: '../../../media/a2/food/pasta.png' },
      { text: '샐러드', image: '../../../media/a2/food/salad.png' },
      { text: '샌드위치', image: '../../../media/a2/food/sandwich.png' }
    ],
    answer: '피자'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "파스타" است؟',
    speak: '파스타',
    options: [
      { text: '햄버거', image: '../../../media/a2/food/burger.png' },
      { text: '파스타', image: '../../../media/a2/food/pasta.png' },
      { text: '피자', image: '../../../media/a2/food/pizza.png' },
      { text: '샐러드', image: '../../../media/a2/food/salad.png' }
    ],
    answer: '파스타'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "샐러드" است؟',
    speak: '샐러드',
    options: [
      { text: '피자', image: '../../../media/a2/food/pizza.png' },
      { text: '샐러드', image: '../../../media/a2/food/salad.png' },
      { text: '샌드위치', image: '../../../media/a2/food/sandwich.png' },
      { text: '파스타', image: '../../../media/a2/food/pasta.png' }
    ],
    answer: '샐러드'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "샌드위치" است؟',
    speak: '샌드위치',
    options: [
      { text: '파스타', image: '../../../media/a2/food/pasta.png' },
      { text: '피자', image: '../../../media/a2/food/pizza.png' },
      { text: '샐러드', image: '../../../media/a2/food/salad.png' },
      { text: '샌드위치', image: '../../../media/a2/food/sandwich.png' }
    ],
    answer: '샌드위치'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "햄버거" است؟',
    speak: '햄버거',
    options: [
      { text: '햄버거', image: '../../../media/a2/food/burger.png' },
      { text: '샌드위치', image: '../../../media/a2/food/sandwich.png' },
      { text: '피자', image: '../../../media/a2/food/pizza.png' },
      { text: '파스타', image: '../../../media/a2/food/pasta.png' }
    ],
    answer: '햄버거'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/pizza.png',
    options: ['피자', '파스타', '샐러드', '샌드위치'],
    answer: '피자'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/pasta.png',
    options: ['피자', '파스타', '샐러드', '햄버거'],
    answer: '파스타'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/salad.png',
    options: ['햄버거', '피자', '샐러드', '파스타'],
    answer: '샐러드'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/sandwich.png',
    options: ['샐러드', '파스타', '샌드위치', '피자'],
    answer: '샌드위치'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/burger.png',
    options: ['피자', '샌드위치', '파스타', '햄버거'],
    answer: '햄버거'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '피자',
    question: 'کدام کلمه را شنیدی؟',
    options: ['피자', '파스타', '샐러드', '샌드위치'],
    answer: '피자'
  },
  {
    type: 'audio',
    speak: '파스타',
    question: 'کدام کلمه را شنیدی؟',
    options: ['햄버거', '파스타', '피자', '샐러드'],
    answer: '파스타'
  },
  {
    type: 'audio',
    speak: '샐러드',
    question: 'کدام کلمه را شنیدی؟',
    options: ['피자', '샐러드', '샌드위치', '파스타'],
    answer: '샐러드'
  },
  {
    type: 'audio',
    speak: '샌드위치',
    question: 'کدام کلمه را شنیدی؟',
    options: ['파스타', '피자', '샐러드', '샌드위치'],
    answer: '샌드위치'
  },
  {
    type: 'audio',
    speak: '햄버거',
    question: 'کدام کلمه را شنیدی؟',
    options: ['햄버거', '샌드위치', '피자', '파스타'],
    answer: '햄버거'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '피자',
    image: '../../../media/a2/food/pizza.png',
    meaning: 'پیتزا'
  },
  {
    type: 'speak',
    word: '파스타',
    image: '../../../media/a2/food/pasta.png',
    meaning: 'پاستا'
  },
  {
    type: 'speak',
    word: '샐러드',
    image: '../../../media/a2/food/salad.png',
    meaning: 'سالاد'
  },
  {
    type: 'speak',
    word: '샌드위치',
    image: '../../../media/a2/food/sandwich.png',
    meaning: 'ساندویچ'
  },
  {
    type: 'speak',
    word: '햄버거',
    image: '../../../media/a2/food/burger.png',
    meaning: 'برگر'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '피자를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پیتزا می‌خورم',
    words: ['먹습니다', '를', '피자'],
    answer: ['피자를', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '파스타를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'پاستا می‌خورم',
    words: ['먹습니다', '를', '파스타'],
    answer: ['파스타를', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '샐러드를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'سالاد می‌خورم',
    words: ['먹습니다', '를', '샐러드'],
    answer: ['샐러드를', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '샌드위치를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ساندویچ می‌خورم',
    words: ['먹습니다', '를', '샌드위치'],
    answer: ['샌드위치를', '먹습니다']
  },
  {
    type: 'build-it',
    speak: '햄버거를 먹습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'برگر می‌خورم',
    words: ['먹습니다', '를', '햄버거'],
    answer: ['햄버거를', '먹습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '피자를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '피자를 먹습니다',
    words: ['پیتزا', 'می‌خورم'],
    answer: ['پیتزا', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '파스타를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '파스타를 먹습니다',
    words: ['پاستا', 'می‌خورم'],
    answer: ['پاستا', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '샐러드를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '샐러드를 먹습니다',
    words: ['سالاد', 'می‌خورم'],
    answer: ['سالاد', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '샌드위치를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '샌드위치를 먹습니다',
    words: ['ساندویچ', 'می‌خورم'],
    answer: ['ساندویچ', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: '햄버거를 먹습니다',
    question: 'ترجمه را بساز:',
    text: '햄버거를 먹습니다',
    words: ['برگر', 'می‌خورم'],
    answer: ['برگر', 'می‌خورم']
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