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

// ===== سوالات درس ۵۳ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "가이드" است؟',
    speak: '가이드',
    options: [
      { text: '가이드', image: '../../../media/a2/travel/guide.png' },
      { text: '관광객', image: '../../../media/a2/travel/tourist.png' },
      { text: '기념품', image: '../../../media/a2/travel/souvenir.png' },
      { text: '모험', image: '../../../media/a2/travel/adventure.png' }
    ],
    answer: '가이드'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "관광객" است؟',
    speak: '관광객',
    options: [
      { text: '여행', image: '../../../media/a2/travel/journey.png' },
      { text: '관광객', image: '../../../media/a2/travel/tourist.png' },
      { text: '가이드', image: '../../../media/a2/travel/guide.png' },
      { text: '기념품', image: '../../../media/a2/travel/souvenir.png' }
    ],
    answer: '관광객'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "기념품" است؟',
    speak: '기념품',
    options: [
      { text: '가이드', image: '../../../media/a2/travel/guide.png' },
      { text: '기념품', image: '../../../media/a2/travel/souvenir.png' },
      { text: '모험', image: '../../../media/a2/travel/adventure.png' },
      { text: '관광객', image: '../../../media/a2/travel/tourist.png' }
    ],
    answer: '기념품'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "모험" است؟',
    speak: '모험',
    options: [
      { text: '관광객', image: '../../../media/a2/travel/tourist.png' },
      { text: '가이드', image: '../../../media/a2/travel/guide.png' },
      { text: '기념품', image: '../../../media/a2/travel/souvenir.png' },
      { text: '모험', image: '../../../media/a2/travel/adventure.png' }
    ],
    answer: '모험'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "여행" است؟',
    speak: '여행',
    options: [
      { text: '여행', image: '../../../media/a2/travel/journey.png' },
      { text: '모험', image: '../../../media/a2/travel/adventure.png' },
      { text: '가이드', image: '../../../media/a2/travel/guide.png' },
      { text: '관광객', image: '../../../media/a2/travel/tourist.png' }
    ],
    answer: '여행'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/guide.png',
    options: ['가이드', '관광객', '기념품', '모험'],
    answer: '가이드'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tourist.png',
    options: ['가이드', '관광객', '기념품', '여행'],
    answer: '관광객'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/souvenir.png',
    options: ['여행', '가이드', '기념품', '관광객'],
    answer: '기념품'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/adventure.png',
    options: ['기념품', '관광객', '모험', '가이드'],
    answer: '모험'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/journey.png',
    options: ['가이드', '모험', '관광객', '여행'],
    answer: '여행'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '가이드',
    question: 'کدام کلمه را شنیدی؟',
    options: ['가이드', '관광객', '기념품', '모험'],
    answer: '가이드'
  },
  {
    type: 'audio',
    speak: '관광객',
    question: 'کدام کلمه را شنیدی؟',
    options: ['여행', '관광객', '가이드', '기념품'],
    answer: '관광객'
  },
  {
    type: 'audio',
    speak: '기념품',
    question: 'کدام کلمه را شنیدی؟',
    options: ['가이드', '기념품', '모험', '관광객'],
    answer: '기념품'
  },
  {
    type: 'audio',
    speak: '모험',
    question: 'کدام کلمه را شنیدی؟',
    options: ['관광객', '가이드', '기념품', '모험'],
    answer: '모험'
  },
  {
    type: 'audio',
    speak: '여행',
    question: 'کدام کلمه را شنیدی؟',
    options: ['여행', '모험', '가이드', '관광객'],
    answer: '여행'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '가이드',
    image: '../../../media/a2/travel/guide.png',
    meaning: 'راهنما'
  },
  {
    type: 'speak',
    word: '관광객',
    image: '../../../media/a2/travel/tourist.png',
    meaning: 'گردشگر'
  },
  {
    type: 'speak',
    word: '기념품',
    image: '../../../media/a2/travel/souvenir.png',
    meaning: 'سوغاتی'
  },
  {
    type: 'speak',
    word: '모험',
    image: '../../../media/a2/travel/adventure.png',
    meaning: 'ماجراجویی'
  },
  {
    type: 'speak',
    word: '여행',
    image: '../../../media/a2/travel/journey.png',
    meaning: 'سفر'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '가이드가 안내합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'راهنما راهنمایی می‌کند',
    words: ['안내합니다', '가', '가이드'],
    answer: ['가이드가', '안내합니다']
  },
  {
    type: 'build-it',
    speak: '관광객이 많습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'گردشگران زیاد هستند',
    words: ['많습니다', '이', '관광객'],
    answer: ['관광객이', '많습니다']
  },
  {
    type: 'build-it',
    speak: '기념품을 삽니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'سوغاتی می‌خرم',
    words: ['삽니다', '을', '기념품'],
    answer: ['기념품을', '삽니다']
  },
  {
    type: 'build-it',
    speak: '모험을 좋아합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'ماجراجویی دوست دارم',
    words: ['좋아합니다', '을', '모험'],
    answer: ['모험을', '좋아합니다']
  },
  {
    type: 'build-it',
    speak: '여행을 갑니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'به سفر می‌روم',
    words: ['갑니다', '을', '여행'],
    answer: ['여행을', '갑니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '가이드가 안내합니다',
    question: 'ترجمه را بساز:',
    text: '가이드가 안내합니다',
    words: ['راهنما', 'راهنمایی', 'می‌کند'],
    answer: ['راهنما', 'راهنمایی', 'می‌کند']
  },
  {
    type: 'build-fa',
    speak: '관광객이 많습니다',
    question: 'ترجمه را بساز:',
    text: '관광객이 많습니다',
    words: ['گردشگران', 'زیاد', 'هستند'],
    answer: ['گردشگران', 'زیاد', 'هستند']
  },
  {
    type: 'build-fa',
    speak: '기념품을 삽니다',
    question: 'ترجمه را بساز:',
    text: '기념품을 삽니다',
    words: ['سوغاتی', 'می‌خرم'],
    answer: ['سوغاتی', 'می‌خرم']
  },
  {
    type: 'build-fa',
    speak: '모험을 좋아합니다',
    question: 'ترجمه را بساز:',
    text: '모험을 좋아합니다',
    words: ['ماجراجویی', 'دوست', 'دارم'],
    answer: ['ماجراجویی', 'دوست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: '여행을 갑니다',
    question: 'ترجمه را بساز:',
    text: '여행을 갑니다',
    words: ['به', 'سفر', 'می‌روم'],
    answer: ['به', 'سفر', 'می‌روم']
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