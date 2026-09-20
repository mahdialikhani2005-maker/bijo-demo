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

// ===== سوالات درس ۳۷ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "폭포" است؟',
    speak: '폭포',
    options: [
      { text: '폭포', image: '../../../media/a2/nature/waterfall.png' },
      { text: '화산', image: '../../../media/a2/nature/volcano.png' },
      { text: '빙하', image: '../../../media/a2/nature/glacier.png' },
      { text: '협곡', image: '../../../media/a2/nature/canyon.png' }
    ],
    answer: '폭포'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "화산" است؟',
    speak: '화산',
    options: [
      { text: '동굴', image: '../../../media/a2/nature/cave.png' },
      { text: '화산', image: '../../../media/a2/nature/volcano.png' },
      { text: '폭포', image: '../../../media/a2/nature/waterfall.png' },
      { text: '빙하', image: '../../../media/a2/nature/glacier.png' }
    ],
    answer: '화산'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "빙하" است؟',
    speak: '빙하',
    options: [
      { text: '폭포', image: '../../../media/a2/nature/waterfall.png' },
      { text: '빙하', image: '../../../media/a2/nature/glacier.png' },
      { text: '협곡', image: '../../../media/a2/nature/canyon.png' },
      { text: '화산', image: '../../../media/a2/nature/volcano.png' }
    ],
    answer: '빙하'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "협곡" است؟',
    speak: '협곡',
    options: [
      { text: '화산', image: '../../../media/a2/nature/volcano.png' },
      { text: '폭포', image: '../../../media/a2/nature/waterfall.png' },
      { text: '동굴', image: '../../../media/a2/nature/cave.png' },
      { text: '협곡', image: '../../../media/a2/nature/canyon.png' }
    ],
    answer: '협곡'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "동굴" است؟',
    speak: '동굴',
    options: [
      { text: '동굴', image: '../../../media/a2/nature/cave.png' },
      { text: '빙하', image: '../../../media/a2/nature/glacier.png' },
      { text: '화산', image: '../../../media/a2/nature/volcano.png' },
      { text: '폭포', image: '../../../media/a2/nature/waterfall.png' }
    ],
    answer: '동굴'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/waterfall.png',
    options: ['폭포', '화산', '빙하', '협곡'],
    answer: '폭포'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/volcano.png',
    options: ['폭포', '화산', '빙하', '동굴'],
    answer: '화산'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/glacier.png',
    options: ['동굴', '폭포', '빙하', '화산'],
    answer: '빙하'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/canyon.png',
    options: ['빙하', '화산', '협곡', '폭포'],
    answer: '협곡'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cave.png',
    options: ['폭포', '협곡', '화산', '동굴'],
    answer: '동굴'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '폭포',
    question: 'کدام کلمه را شنیدی؟',
    options: ['폭포', '화산', '빙하', '협곡'],
    answer: '폭포'
  },
  {
    type: 'audio',
    speak: '화산',
    question: 'کدام کلمه را شنیدی؟',
    options: ['동굴', '화산', '폭포', '빙하'],
    answer: '화산'
  },
  {
    type: 'audio',
    speak: '빙하',
    question: 'کدام کلمه را شنیدی؟',
    options: ['폭포', '빙하', '협곡', '화산'],
    answer: '빙하'
  },
  {
    type: 'audio',
    speak: '협곡',
    question: 'کدام کلمه را شنیدی؟',
    options: ['화산', '폭포', '동굴', '협곡'],
    answer: '협곡'
  },
  {
    type: 'audio',
    speak: '동굴',
    question: 'کدام کلمه را شنیدی؟',
    options: ['동굴', '협곡', '폭포', '화산'],
    answer: '동굴'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '폭포',
    image: '../../../media/a2/nature/waterfall.png',
    meaning: 'آبشار'
  },
  {
    type: 'speak',
    word: '화산',
    image: '../../../media/a2/nature/volcano.png',
    meaning: 'آتشفشان'
  },
  {
    type: 'speak',
    word: '빙하',
    image: '../../../media/a2/nature/glacier.png',
    meaning: 'یخچال طبیعی'
  },
  {
    type: 'speak',
    word: '협곡',
    image: '../../../media/a2/nature/canyon.png',
    meaning: 'دره'
  },
  {
    type: 'speak',
    word: '동굴',
    image: '../../../media/a2/nature/cave.png',
    meaning: 'غار'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '폭포를 봅니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'آبشار را می‌بینم',
    words: ['봅니다', '를', '폭포'],
    answer: ['폭포를', '봅니다']
  },
  {
    type: 'build-it',
    speak: '화산은 위험합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'آتشفشان خطرناک است',
    words: ['위험합니다', '은', '화산'],
    answer: ['화산은', '위험합니다']
  },
  {
    type: 'build-it',
    speak: '빙하는 춥습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'یخچال طبیعی سرد است',
    words: ['춥습니다', '는', '빙하'],
    answer: ['빙하는', '춥습니다']
  },
  {
    type: 'build-it',
    speak: '협곡을 걷습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در دره قدم می‌زنم',
    words: ['걷습니다', '을', '협곡'],
    answer: ['협곡을', '걷습니다']
  },
  {
    type: 'build-it',
    speak: '동굴에 들어갑니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'وارد غار می‌شوم',
    words: ['들어갑니다', '에', '동굴'],
    answer: ['동굴에', '들어갑니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '폭포를 봅니다',
    question: 'ترجمه را بساز:',
    text: '폭포를 봅니다',
    words: ['آبشار', 'را', 'می‌بینم'],
    answer: ['آبشار', 'را', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: '화산은 위험합니다',
    question: 'ترجمه را بساز:',
    text: '화산은 위험합니다',
    words: ['آتشفشان', 'خطرناک', 'است'],
    answer: ['آتشفشان', 'خطرناک', 'است']
  },
  {
    type: 'build-fa',
    speak: '빙하는 춥습니다',
    question: 'ترجمه را بساز:',
    text: '빙하는 춥습니다',
    words: ['یخچال طبیعی', 'سرد', 'است'],
    answer: ['یخچال طبیعی', 'سرد', 'است']
  },
  {
    type: 'build-fa',
    speak: '협곡을 걷습니다',
    question: 'ترجمه را بساز:',
    text: '협곡을 걷습니다',
    words: ['در', 'دره', 'قدم', 'می‌زنم'],
    answer: ['در', 'دره', 'قدم', 'می‌زنم']
  },
  {
    type: 'build-fa',
    speak: '동굴에 들어갑니다',
    question: 'ترجمه را بساز:',
    text: '동굴에 들어갑니다',
    words: ['وارد', 'غار', 'می‌شوم'],
    answer: ['وارد', 'غار', 'می‌شوم']
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