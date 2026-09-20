let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
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
  recognition.lang = 'zh-CN';
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

// ===== سوالات درس ۳ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "亲戚" است؟',
    speak: '亲戚',
    options: [
      { text: '双胞胎', image: '../../../media/a2/family/twin.png' },
      { text: '亲戚', image: '../../../media/a2/family/relative.png' },
      { text: '孤儿', image: '../../../media/a2/family/orphan.png' },
      { text: '寡妇', image: '../../../media/a2/family/widow.png' }
    ],
    answer: '亲戚'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "双胞胎" است؟',
    speak: '双胞胎',
    options: [
      { text: '亲戚', image: '../../../media/a2/family/relative.png' },
      { text: '双胞胎', image: '../../../media/a2/family/twin.png' },
      { text: '新娘', image: '../../../media/a2/family/bride.png' },
      { text: '孤儿', image: '../../../media/a2/family/orphan.png' }
    ],
    answer: '双胞胎'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "孤儿" است؟',
    speak: '孤儿',
    options: [
      { text: '寡妇', image: '../../../media/a2/family/widow.png' },
      { text: '亲戚', image: '../../../media/a2/family/relative.png' },
      { text: '孤儿', image: '../../../media/a2/family/orphan.png' },
      { text: '双胞胎', image: '../../../media/a2/family/twin.png' }
    ],
    answer: '孤儿'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "寡妇" است؟',
    speak: '寡妇',
    options: [
      { text: '寡妇', image: '../../../media/a2/family/widow.png' },
      { text: '新娘', image: '../../../media/a2/family/bride.png' },
      { text: '双胞胎', image: '../../../media/a2/family/twin.png' },
      { text: '亲戚', image: '../../../media/a2/family/relative.png' }
    ],
    answer: '寡妇'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "新娘" است؟',
    speak: '新娘',
    options: [
      { text: '孤儿', image: '../../../media/a2/family/orphan.png' },
      { text: '新娘', image: '../../../media/a2/family/bride.png' },
      { text: '寡妇', image: '../../../media/a2/family/widow.png' },
      { text: '双胞胎', image: '../../../media/a2/family/twin.png' }
    ],
    answer: '新娘'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/relative.png',
    options: ['双胞胎', '亲戚', '孤儿', '寡妇'],
    answer: '亲戚'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/twin.png',
    options: ['亲戚', '双胞胎', '新娘', '孤儿'],
    answer: '双胞胎'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/orphan.png',
    options: ['寡妇', '亲戚', '孤儿', '双胞胎'],
    answer: '孤儿'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/widow.png',
    options: ['寡妇', '新娘', '双胞胎', '亲戚'],
    answer: '寡妇'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/bride.png',
    options: ['孤儿', '新娘', '寡妇', '双胞胎'],
    answer: '新娘'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '亲戚',
    question: 'کدام کلمه را شنیدی؟',
    options: ['双胞胎', '亲戚', '孤儿', '寡妇'],
    answer: '亲戚'
  },
  {
    type: 'audio',
    speak: '双胞胎',
    question: 'کدام کلمه را شنیدی؟',
    options: ['亲戚', '双胞胎', '新娘', '孤儿'],
    answer: '双胞胎'
  },
  {
    type: 'audio',
    speak: '孤儿',
    question: 'کدام کلمه را شنیدی؟',
    options: ['寡妇', '亲戚', '孤儿', '双胞胎'],
    answer: '孤儿'
  },
  {
    type: 'audio',
    speak: '寡妇',
    question: 'کدام کلمه را شنیدی؟',
    options: ['寡妇', '新娘', '双胞胎', '亲戚'],
    answer: '寡妇'
  },
  {
    type: 'audio',
    speak: '新娘',
    question: 'کدام کلمه را شنیدی？',
    options: ['孤儿', '新娘', '寡妇', '双胞胎'],
    answer: '新娘'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '亲戚',
    image: '../../../media/a2/family/relative.png',
    meaning: 'خویشاوند'
  },
  {
    type: 'speak',
    word: '双胞胎',
    image: '../../../media/a2/family/twin.png',
    meaning: 'دوقلو'
  },
  {
    type: 'speak',
    word: '孤儿',
    image: '../../../media/a2/family/orphan.png',
    meaning: 'یتیم'
  },
  {
    type: 'speak',
    word: '寡妇',
    image: '../../../media/a2/family/widow.png',
    meaning: 'بیوه زن'
  },
  {
    type: 'speak',
    word: '新娘',
    image: '../../../media/a2/family/bride.png',
    meaning: 'عروس'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '他是我的亲戚',
    question: 'جمله چینی را بساز:',
    text: 'او خویشاوند من است',
    words: ['亲戚', '我的', '他', '是'],
    answer: ['他', '是', '我的', '亲戚']
  },
  {
    type: 'build-en',
    speak: '他们是双胞胎',
    question: 'جمله چینی را بساز:',
    text: 'آنها دوقلو هستند',
    words: ['双胞胎', '他们', '是'],
    answer: ['他们', '是', '双胞胎']
  },
  {
    type: 'build-en',
    speak: '他是孤儿',
    question: 'جمله چینی را بساز:',
    text: 'او یتیم است',
    words: ['孤儿', '他', '是'],
    answer: ['他', '是', '孤儿']
  },
  {
    type: 'build-en',
    speak: '她是寡妇',
    question: 'جمله چینی را بساز:',
    text: 'او بیوه است',
    words: ['寡妇', '她', '是'],
    answer: ['她', '是', '寡妇']
  },
  {
    type: 'build-en',
    speak: '她是新娘',
    question: 'جمله چینی را بساز:',
    text: 'او عروس است',
    words: ['新娘', '她', '是'],
    answer: ['她', '是', '新娘']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '他是我的亲戚',
    question: 'ترجمه را بساز:',
    text: '他是我的亲戚',
    words: ['است', 'خویشاوند', 'او', 'من'],
    answer: ['او', 'خویشاوند', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '他们是双胞胎',
    question: 'ترجمه را بساز:',
    text: '他们是双胞胎',
    words: ['هستند', 'دوقلو', 'آنها'],
    answer: ['آنها', 'دوقلو', 'هستند']
  },
  {
    type: 'build-fa',
    speak: '他是孤儿',
    question: 'ترجمه را بساز:',
    text: '他是孤儿',
    words: ['است', 'یتیم', 'او'],
    answer: ['او', 'یتیم', 'است']
  },
  {
    type: 'build-fa',
    speak: '她是寡妇',
    question: 'ترجمه را بساز:',
    text: '她是寡妇',
    words: ['است', 'بیوه', 'او'],
    answer: ['او', 'بیوه', 'است']
  },
  {
    type: 'build-fa',
    speak: '她是新娘',
    question: 'ترجمه را بساز:',
    text: '她是新娘',
    words: ['است', 'عروس', 'او'],
    answer: ['او', 'عروس', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 درس تمام شد! 🎉</h2>
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
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

    if (q.type === 'build-en') {
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