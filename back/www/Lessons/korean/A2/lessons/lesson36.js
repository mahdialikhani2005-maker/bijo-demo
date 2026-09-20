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

// ===== سوالات درس ۳۶ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "강" است؟',
    speak: '강',
    options: [
      { text: '강', image: '../../../media/a2/nature/river.png' },
      { text: '숲', image: '../../../media/a2/nature/forest.png' },
      { text: '사막', image: '../../../media/a2/nature/desert.png' },
      { text: '섬', image: '../../../media/a2/nature/island.png' }
    ],
    answer: '강'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "숲" است؟',
    speak: '숲',
    options: [
      { text: '폭풍', image: '../../../media/a2/nature/storm.png' },
      { text: '숲', image: '../../../media/a2/nature/forest.png' },
      { text: '강', image: '../../../media/a2/nature/river.png' },
      { text: '사막', image: '../../../media/a2/nature/desert.png' }
    ],
    answer: '숲'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "사막" است؟',
    speak: '사막',
    options: [
      { text: '강', image: '../../../media/a2/nature/river.png' },
      { text: '사막', image: '../../../media/a2/nature/desert.png' },
      { text: '섬', image: '../../../media/a2/nature/island.png' },
      { text: '숲', image: '../../../media/a2/nature/forest.png' }
    ],
    answer: '사막'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "섬" است؟',
    speak: '섬',
    options: [
      { text: '숲', image: '../../../media/a2/nature/forest.png' },
      { text: '강', image: '../../../media/a2/nature/river.png' },
      { text: '사막', image: '../../../media/a2/nature/desert.png' },
      { text: '섬', image: '../../../media/a2/nature/island.png' }
    ],
    answer: '섬'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "폭풍" است؟',
    speak: '폭풍',
    options: [
      { text: '폭풍', image: '../../../media/a2/nature/storm.png' },
      { text: '섬', image: '../../../media/a2/nature/island.png' },
      { text: '강', image: '../../../media/a2/nature/river.png' },
      { text: '숲', image: '../../../media/a2/nature/forest.png' }
    ],
    answer: '폭풍'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/river.png',
    options: ['강', '숲', '사막', '섬'],
    answer: '강'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/forest.png',
    options: ['강', '숲', '사막', '폭풍'],
    answer: '숲'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/desert.png',
    options: ['폭풍', '강', '사막', '숲'],
    answer: '사막'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/island.png',
    options: ['사막', '숲', '섬', '강'],
    answer: '섬'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/storm.png',
    options: ['강', '폭풍', '숲', '사막'],
    answer: '폭풍'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '강',
    question: 'کدام کلمه را شنیدی؟',
    options: ['강', '숲', '사막', '섬'],
    answer: '강'
  },
  {
    type: 'audio',
    speak: '숲',
    question: 'کدام کلمه را شنیدی؟',
    options: ['폭풍', '숲', '강', '사막'],
    answer: '숲'
  },
  {
    type: 'audio',
    speak: '사막',
    question: 'کدام کلمه را شنیدی؟',
    options: ['강', '사막', '섬', '숲'],
    answer: '사막'
  },
  {
    type: 'audio',
    speak: '섬',
    question: 'کدام کلمه را شنیدی؟',
    options: ['숲', '강', '사막', '섬'],
    answer: '섬'
  },
  {
    type: 'audio',
    speak: '폭풍',
    question: 'کدام کلمه را شنیدی؟',
    options: ['폭풍', '섬', '강', '숲'],
    answer: '폭풍'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '강',
    image: '../../../media/a2/nature/river.png',
    meaning: 'رودخانه'
  },
  {
    type: 'speak',
    word: '숲',
    image: '../../../media/a2/nature/forest.png',
    meaning: 'جنگل'
  },
  {
    type: 'speak',
    word: '사막',
    image: '../../../media/a2/nature/desert.png',
    meaning: 'بیابان'
  },
  {
    type: 'speak',
    word: '섬',
    image: '../../../media/a2/nature/island.png',
    meaning: 'جزیره'
  },
  {
    type: 'speak',
    word: '폭풍',
    image: '../../../media/a2/nature/storm.png',
    meaning: 'طوفان'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '강에서 수영합니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در رودخانه شنا می‌کنم',
    words: ['수영합니다', '에서', '강'],
    answer: ['강에서', '수영합니다']
  },
  {
    type: 'build-it',
    speak: '숲에서 걷습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'در جنگل پیاده‌روی می‌کنم',
    words: ['걷습니다', '에서', '숲'],
    answer: ['숲에서', '걷습니다']
  },
  {
    type: 'build-it',
    speak: '사막은 덥습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'بیابان گرم است',
    words: ['덥습니다', '은', '사막'],
    answer: ['사막은', '덥습니다']
  },
  {
    type: 'build-it',
    speak: '섬에 갑니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'به جزیره می‌روم',
    words: ['갑니다', '에', '섬'],
    answer: ['섬에', '갑니다']
  },
  {
    type: 'build-it',
    speak: '폭풍이 옵니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'طوفان می‌آید',
    words: ['옵니다', '이', '폭풍'],
    answer: ['폭풍이', '옵니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '강에서 수영합니다',
    question: 'ترجمه را بساز:',
    text: '강에서 수영합니다',
    words: ['در', 'رودخانه', 'شنا', 'می‌کنم'],
    answer: ['در', 'رودخانه', 'شنا', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '숲에서 걷습니다',
    question: 'ترجمه را بساز:',
    text: '숲에서 걷습니다',
    words: ['در', 'جنگل', 'پیاده‌روی', 'می‌کنم'],
    answer: ['در', 'جنگل', 'پیاده‌روی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: '사막은 덥습니다',
    question: 'ترجمه را بساز:',
    text: '사막은 덥습니다',
    words: ['بیابان', 'گرم', 'است'],
    answer: ['بیابان', 'گرم', 'است']
  },
  {
    type: 'build-fa',
    speak: '섬에 갑니다',
    question: 'ترجمه را بساز:',
    text: '섬에 갑니다',
    words: ['به', 'جزیره', 'می‌روم'],
    answer: ['به', 'جزیره', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: '폭풍이 옵니다',
    question: 'ترجمه را بساز:',
    text: '폭풍이 옵니다',
    words: ['طوفان', 'می‌آید'],
    answer: ['طوفان', 'می‌آید']
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