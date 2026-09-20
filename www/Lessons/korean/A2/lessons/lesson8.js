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

// ===== سوالات درس ۸ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "발코니" است؟',
    speak: '발코니',
    options: [
      { text: '발코니', image: '../../../media/a2/house/balcony.png' },
      { text: '차고', image: '../../../media/a2/house/garage.png' },
      { text: '지하실', image: '../../../media/a2/house/basement.png' },
      { text: '다락방', image: '../../../media/a2/house/attic.png' }
    ],
    answer: '발코니'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "차고" است؟',
    speak: '차고',
    options: [
      { text: '마당', image: '../../../media/a2/house/yard.png' },
      { text: '차고', image: '../../../media/a2/house/garage.png' },
      { text: '발코니', image: '../../../media/a2/house/balcony.png' },
      { text: '지하실', image: '../../../media/a2/house/basement.png' }
    ],
    answer: '차고'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "지하실" است؟',
    speak: '지하실',
    options: [
      { text: '발코니', image: '../../../media/a2/house/balcony.png' },
      { text: '지하실', image: '../../../media/a2/house/basement.png' },
      { text: '다락방', image: '../../../media/a2/house/attic.png' },
      { text: '차고', image: '../../../media/a2/house/garage.png' }
    ],
    answer: '지하실'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "다락방" است؟',
    speak: '다락방',
    options: [
      { text: '차고', image: '../../../media/a2/house/garage.png' },
      { text: '발코니', image: '../../../media/a2/house/balcony.png' },
      { text: '지하실', image: '../../../media/a2/house/basement.png' },
      { text: '다락방', image: '../../../media/a2/house/attic.png' }
    ],
    answer: '다락방'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "마당" است؟',
    speak: '마당',
    options: [
      { text: '마당', image: '../../../media/a2/house/yard.png' },
      { text: '다락방', image: '../../../media/a2/house/attic.png' },
      { text: '발코니', image: '../../../media/a2/house/balcony.png' },
      { text: '차고', image: '../../../media/a2/house/garage.png' }
    ],
    answer: '마당'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/balcony.png',
    options: ['발코니', '차고', '지하실', '다락방'],
    answer: '발코니'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/garage.png',
    options: ['발코니', '차고', '지하실', '마당'],
    answer: '차고'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/basement.png',
    options: ['마당', '발코니', '지하실', '차고'],
    answer: '지하실'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/attic.png',
    options: ['지하실', '차고', '다락방', '발코니'],
    answer: '다락방'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/yard.png',
    options: ['발코니', '다락방', '차고', '마당'],
    answer: '마당'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '발코니',
    question: 'کدام کلمه را شنیدی؟',
    options: ['발코니', '차고', '지하실', '다락방'],
    answer: '발코니'
  },
  {
    type: 'audio',
    speak: '차고',
    question: 'کدام کلمه را شنیدی؟',
    options: ['마당', '차고', '발코니', '지하실'],
    answer: '차고'
  },
  {
    type: 'audio',
    speak: '지하실',
    question: 'کدام کلمه را شنیدی؟',
    options: ['발코니', '지하실', '다락방', '차고'],
    answer: '지하실'
  },
  {
    type: 'audio',
    speak: '다락방',
    question: 'کدام کلمه را شنیدی؟',
    options: ['차고', '발코니', '지하실', '다락방'],
    answer: '다락방'
  },
  {
    type: 'audio',
    speak: '마당',
    question: 'کدام کلمه را شنیدی؟',
    options: ['마당', '다락방', '발코니', '차고'],
    answer: '마당'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '발코니',
    image: '../../../media/a2/house/balcony.png',
    meaning: 'بالکن'
  },
  {
    type: 'speak',
    word: '차고',
    image: '../../../media/a2/house/garage.png',
    meaning: 'گاراژ'
  },
  {
    type: 'speak',
    word: '지하실',
    image: '../../../media/a2/house/basement.png',
    meaning: 'زیرزمین'
  },
  {
    type: 'speak',
    word: '다락방',
    image: '../../../media/a2/house/attic.png',
    meaning: 'اتاق زیرشیروانی'
  },
  {
    type: 'speak',
    word: '마당',
    image: '../../../media/a2/house/yard.png',
    meaning: 'حیاط'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '저희 집에 발코니가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'خانه ما بالکن دارد',
    words: ['있습니다', '가', '발코니', '저희 집에'],
    answer: ['저희 집에', '발코니가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '집 옆에 차고가 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'کنار خانه گاراژ وجود دارد',
    words: ['있습니다', '가', '차고', '집 옆에'],
    answer: ['집 옆에', '차고가', '있습니다']
  },
  {
    type: 'build-it',
    speak: '지하실은 어둡습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'زیرزمین تاریک است',
    words: ['어둡습니다', '은', '지하실'],
    answer: ['지하실은', '어둡습니다']
  },
  {
    type: 'build-it',
    speak: '다락방에 오래된 물건이 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در اتاق زیرشیروانی چیزهای قدیمی وجود دارد',
    words: ['있습니다', '이', '물건', '오래된', '다락방에'],
    answer: ['다락방에', '오래된', '물건이', '있습니다']
  },
  {
    type: 'build-it',
    speak: '마당에 꽃이 피어 있습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در حیاط گل‌ها شکوفه زده‌اند',
    words: ['있습니다', '피어', '이', '꽃', '마당에'],
    answer: ['마당에', '꽃이', '피어', '있습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '저희 집에 발코니가 있습니다',
    question: 'ترجمه را بساز:',
    text: '저희 집에 발코니가 있습니다',
    words: ['خانه', 'ما', 'بالکن', 'دارد'],
    answer: ['خانه', 'ما', 'بالکن', 'دارد']
  },
  {
    type: 'build-fa',
    speak: '집 옆에 차고가 있습니다',
    question: 'ترجمه را بساز:',
    text: '집 옆에 차고가 있습니다',
    words: ['کنار', 'خانه', 'گاراژ', 'وجود دارد'],
    answer: ['کنار', 'خانه', 'گاراژ', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '지하실은 어둡습니다',
    question: 'ترجمه را بساز:',
    text: '지하실은 어둡습니다',
    words: ['زیرزمین', 'تاریک', 'است'],
    answer: ['زیرزمین', 'تاریک', 'است']
  },
  {
    type: 'build-fa',
    speak: '다락방에 오래된 물건이 있습니다',
    question: 'ترجمه را بساز:',
    text: '다락방에 오래된 물건이 있습니다',
    words: ['در', 'اتاق زیرشیروانی', 'چیزهای قدیمی', 'وجود دارد'],
    answer: ['در', 'اتاق زیرشیروانی', 'چیزهای قدیمی', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: '마당에 꽃이 피어 있습니다',
    question: 'ترجمه را بساز:',
    text: '마당에 꽃이 피어 있습니다',
    words: ['در', 'حیاط', 'گل‌ها', 'شکوفه', 'زده‌اند'],
    answer: ['در', 'حیاط', 'گل‌ها', 'شکوفه', 'زده‌اند']
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