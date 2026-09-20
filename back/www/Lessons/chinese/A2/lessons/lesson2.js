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

// ===== سوالات درس ۲ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "丈夫" است؟',
    speak: '丈夫',
    options: [
      { text: '妻子', image: '../../../media/a2/family/wife.png' },
      { text: '丈夫', image: '../../../media/a2/family/husband.png' },
      { text: '父母', image: '../../../media/a2/family/parent.png' },
      { text: '祖父母', image: '../../../media/a2/family/grandparent.png' }
    ],
    answer: '丈夫'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "妻子" است؟',
    speak: '妻子',
    options: [
      { text: '丈夫', image: '../../../media/a2/family/husband.png' },
      { text: '妻子', image: '../../../media/a2/family/wife.png' },
      { text: '孙子 / 孙女', image: '../../../media/a2/family/grandchild.png' },
      { text: '父母', image: '../../../media/a2/family/parent.png' }
    ],
    answer: '妻子'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "父母" است؟',
    speak: '父母',
    options: [
      { text: '祖父母', image: '../../../media/a2/family/grandparent.png' },
      { text: '丈夫', image: '../../../media/a2/family/husband.png' },
      { text: '父母', image: '../../../media/a2/family/parent.png' },
      { text: '妻子', image: '../../../media/a2/family/wife.png' }
    ],
    answer: '父母'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "祖父母" است؟',
    speak: '祖父母',
    options: [
      { text: '祖父母', image: '../../../media/a2/family/grandparent.png' },
      { text: '孙子 / 孙女', image: '../../../media/a2/family/grandchild.png' },
      { text: '妻子', image: '../../../media/a2/family/wife.png' },
      { text: '丈夫', image: '../../../media/a2/family/husband.png' }
    ],
    answer: '祖父母'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "孙子 / 孙女" است؟',
    speak: '孙子 / 孙女',
    options: [
      { text: '父母', image: '../../../media/a2/family/parent.png' },
      { text: '孙子 / 孙女', image: '../../../media/a2/family/grandchild.png' },
      { text: '祖父母', image: '../../../media/a2/family/grandparent.png' },
      { text: '妻子', image: '../../../media/a2/family/wife.png' }
    ],
    answer: '孙子 / 孙女'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/husband.png',
    options: ['妻子', '丈夫', '父母', '祖父母'],
    answer: '丈夫'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/wife.png',
    options: ['丈夫', '妻子', '孙子 / 孙女', '父母'],
    answer: '妻子'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/parent.png',
    options: ['祖父母', '丈夫', '父母', '妻子'],
    answer: '父母'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandparent.png',
    options: ['祖父母', '孙子 / 孙女', '妻子', '丈夫'],
    answer: '祖父母'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandchild.png',
    options: ['父母', '孙子 / 孙女', '祖父母', '妻子'],
    answer: '孙子 / 孙女'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '丈夫',
    question: 'کدام کلمه را شنیدی؟',
    options: ['妻子', '丈夫', '父母', '祖父母'],
    answer: '丈夫'
  },
  {
    type: 'audio',
    speak: '妻子',
    question: 'کدام کلمه را شنیدی؟',
    options: ['丈夫', '妻子', '孙子 / 孙女', '父母'],
    answer: '妻子'
  },
  {
    type: 'audio',
    speak: '父母',
    question: 'کدام کلمه را شنیدی؟',
    options: ['祖父母', '丈夫', '父母', '妻子'],
    answer: '父母'
  },
  {
    type: 'audio',
    speak: '祖父母',
    question: 'کدام کلمه را شنیدی؟',
    options: ['祖父母', '孙子 / 孙女', '妻子', '丈夫'],
    answer: '祖父母'
  },
  {
    type: 'audio',
    speak: '孙子 / 孙女',
    question: 'کدام کلمه را شنیدی؟',
    options: ['父母', '孙子 / 孙女', '祖父母', '妻子'],
    answer: '孙子 / 孙女'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '丈夫',
    image: '../../../media/a2/family/husband.png',
    meaning: 'شوهر'
  },
  {
    type: 'speak',
    word: '妻子',
    image: '../../../media/a2/family/wife.png',
    meaning: 'همسر'
  },
  {
    type: 'speak',
    word: '父母',
    image: '../../../media/a2/family/parent.png',
    meaning: 'پدر و مادر'
  },
  {
    type: 'speak',
    word: '祖父母',
    image: '../../../media/a2/family/grandparent.png',
    meaning: 'پدربزرگ / مادربزرگ'
  },
  {
    type: 'speak',
    word: '孙子 / 孙女',
    image: '../../../media/a2/family/grandchild.png',
    meaning: 'نوه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '他是我的丈夫',
    question: 'جمله چینی را بساز:',
    text: 'او شوهر من است',
    words: ['丈夫', '我的', '他', '是'],
    answer: ['他', '是', '我的', '丈夫']
  },
  {
    type: 'build-en',
    speak: '她是我的妻子',
    question: 'جمله چینی را بساز:',
    text: 'او همسر من است',
    words: ['妻子', '我的', '她', '是'],
    answer: ['她', '是', '我的', '妻子']
  },
  {
    type: 'build-en',
    speak: '他们是我的父母',
    question: 'جمله چینی را بساز:',
    text: 'آنها پدر و مادر من هستند',
    words: ['父母', '我的', '他们', '是'],
    answer: ['他们', '是', '我的', '父母']
  },
  {
    type: 'build-en',
    speak: '他们是我的祖父母',
    question: 'جمله چینی را بساز:',
    text: 'آنها پدربزرگ و مادربزرگ من هستند',
    words: ['祖父母', '我的', '他们', '是'],
    answer: ['他们', '是', '我的', '祖父母']
  },
  {
    type: 'build-en',
    speak: '他是我的孙子',
    question: 'جمله چینی را بساز:',
    text: 'او نوه من است',
    words: ['孙子', '我的', '他', '是'],
    answer: ['他', '是', '我的', '孙子']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '他是我的丈夫',
    question: 'ترجمه را بساز:',
    text: '他是我的丈夫',
    words: ['است', 'شوهر', 'او', 'من'],
    answer: ['او', 'شوهر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '她是我的妻子',
    question: 'ترجمه را بساز:',
    text: '她是我的妻子',
    words: ['است', 'همسر', 'او', 'من'],
    answer: ['او', 'همسر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: '他们是我的父母',
    question: 'ترجمه را بساز:',
    text: '他们是我的父母',
    words: ['هستند', 'پدر و مادر', 'آنها', 'من'],
    answer: ['آنها', 'پدر و مادر', 'من', 'هستند']
  },
  {
    type: 'build-fa',
    speak: '他们是我的祖父母',
    question: 'ترجمه را بساز:',
    text: '他们是我的祖父母',
    words: ['هستند', 'پدربزرگ و مادربزرگ', 'آنها', 'من'],
    answer: ['آنها', 'پدربزرگ و مادربزرگ', 'من', 'هستند']
  },
  {
    type: 'build-fa',
    speak: '他是我的孙子',
    question: 'ترجمه را بساز:',
    text: '他是我的孙子',
    words: ['است', 'نوه', 'او', 'من'],
    answer: ['او', 'نوه', 'من', 'است']
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