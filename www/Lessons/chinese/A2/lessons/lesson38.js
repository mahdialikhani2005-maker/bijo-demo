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

// ===== سوالات درس ۳۸ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "海滩" است؟',
    speak: '海滩',
    options: [
      { text: '海岸', image: '../../../media/a2/nature/coast.png' },
      { text: '海滩', image: '../../../media/a2/nature/beach.png' },
      { text: '波浪', image: '../../../media/a2/nature/wave.png' },
      { text: '潮汐', image: '../../../media/a2/nature/tide.png' }
    ],
    answer: '海滩'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "海岸" است؟',
    speak: '海岸',
    options: [
      { text: '海滩', image: '../../../media/a2/nature/beach.png' },
      { text: '海岸', image: '../../../media/a2/nature/coast.png' },
      { text: '悬崖', image: '../../../media/a2/nature/cliff.png' },
      { text: '波浪', image: '../../../media/a2/nature/wave.png' }
    ],
    answer: '海岸'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "波浪" است؟',
    speak: '波浪',
    options: [
      { text: '潮汐', image: '../../../media/a2/nature/tide.png' },
      { text: '海滩', image: '../../../media/a2/nature/beach.png' },
      { text: '波浪', image: '../../../media/a2/nature/wave.png' },
      { text: '海岸', image: '../../../media/a2/nature/coast.png' }
    ],
    answer: '波浪'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "潮汐" است؟',
    speak: '潮汐',
    options: [
      { text: '潮汐', image: '../../../media/a2/nature/tide.png' },
      { text: '悬崖', image: '../../../media/a2/nature/cliff.png' },
      { text: '海岸', image: '../../../media/a2/nature/coast.png' },
      { text: '海滩', image: '../../../media/a2/nature/beach.png' }
    ],
    answer: '潮汐'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "悬崖" است؟',
    speak: '悬崖',
    options: [
      { text: '波浪', image: '../../../media/a2/nature/wave.png' },
      { text: '悬崖', image: '../../../media/a2/nature/cliff.png' },
      { text: '潮汐', image: '../../../media/a2/nature/tide.png' },
      { text: '海岸', image: '../../../media/a2/nature/coast.png' }
    ],
    answer: '悬崖'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/beach.png',
    options: ['海岸', '海滩', '波浪', '潮汐'],
    answer: '海滩'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/coast.png',
    options: ['海滩', '海岸', '悬崖', '波浪'],
    answer: '海岸'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/wave.png',
    options: ['潮汐', '海滩', '波浪', '海岸'],
    answer: '波浪'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/tide.png',
    options: ['潮汐', '悬崖', '海岸', '海滩'],
    answer: '潮汐'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cliff.png',
    options: ['波浪', '悬崖', '潮汐', '海岸'],
    answer: '悬崖'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '海滩',
    question: 'کدام کلمه را شنیدی؟',
    options: ['海岸', '海滩', '波浪', '潮汐'],
    answer: '海滩'
  },
  {
    type: 'audio',
    speak: '海岸',
    question: 'کدام کلمه را شنیدی؟',
    options: ['海滩', '海岸', '悬崖', '波浪'],
    answer: '海岸'
  },
  {
    type: 'audio',
    speak: '波浪',
    question: 'کدام کلمه را شنیدی؟',
    options: ['潮汐', '海滩', '波浪', '海岸'],
    answer: '波浪'
  },
  {
    type: 'audio',
    speak: '潮汐',
    question: 'کدام کلمه را شنیدی؟',
    options: ['潮汐', '悬崖', '海岸', '海滩'],
    answer: '潮汐'
  },
  {
    type: 'audio',
    speak: '悬崖',
    question: 'کدام کلمه را شنیدی؟',
    options: ['波浪', '悬崖', '潮汐', '海岸'],
    answer: '悬崖'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '海滩',
    image: '../../../media/a2/nature/beach.png',
    meaning: 'ساحل'
  },
  {
    type: 'speak',
    word: '海岸',
    image: '../../../media/a2/nature/coast.png',
    meaning: 'خط ساحلی'
  },
  {
    type: 'speak',
    word: '波浪',
    image: '../../../media/a2/nature/wave.png',
    meaning: 'موج'
  },
  {
    type: 'speak',
    word: '潮汐',
    image: '../../../media/a2/nature/tide.png',
    meaning: 'جزر و مد'
  },
  {
    type: 'speak',
    word: '悬崖',
    image: '../../../media/a2/nature/cliff.png',
    meaning: 'صخره'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是海滩',
    question: 'جمله چینی را بساز:',
    text: 'این ساحل است',
    words: ['海滩', '这', '是'],
    answer: ['这', '是', '海滩']
  },
  {
    type: 'build-en',
    speak: '这是海岸',
    question: 'جمله چینی را بساز:',
    text: 'این خط ساحلی است',
    words: ['海岸', '这', '是'],
    answer: ['这', '是', '海岸']
  },
  {
    type: 'build-en',
    speak: '这是波浪',
    question: 'جمله چینی را بساز:',
    text: 'این موج است',
    words: ['波浪', '这', '是'],
    answer: ['这', '是', '波浪']
  },
  {
    type: 'build-en',
    speak: '这是潮汐',
    question: 'جمله چینی را بساز:',
    text: 'این جزر و مد است',
    words: ['潮汐', '这', '是'],
    answer: ['这', '是', '潮汐']
  },
  {
    type: 'build-en',
    speak: '这是悬崖',
    question: 'جمله چینی را بساز:',
    text: 'این صخره است',
    words: ['悬崖', '这', '是'],
    answer: ['这', '是', '悬崖']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是海滩',
    question: 'ترجمه را بساز:',
    text: '这是海滩',
    words: ['است', 'ساحل', 'این'],
    answer: ['این', 'ساحل', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是海岸',
    question: 'ترجمه را بساز:',
    text: '这是海岸',
    words: ['است', 'خط ساحلی', 'این'],
    answer: ['این', 'خط ساحلی', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是波浪',
    question: 'ترجمه را بساز:',
    text: '这是波浪',
    words: ['است', 'موج', 'این'],
    answer: ['این', 'موج', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是潮汐',
    question: 'ترجمه را بساز:',
    text: '这是潮汐',
    words: ['است', 'جزر و مد', 'این'],
    answer: ['این', 'جزر و مد', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是悬崖',
    question: 'ترجمه را بساز:',
    text: '这是悬崖',
    words: ['است', 'صخره', 'این'],
    answer: ['این', 'صخره', 'است']
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