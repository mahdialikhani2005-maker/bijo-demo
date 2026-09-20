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

// ===== سوالات درس ۱۴ - کره‌ای به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "신사" است؟',
    speak: '신사',
    options: [
      { text: '신사', image: '../../../media/a2/city/temple.png' },
      { text: '교회', image: '../../../media/a2/city/church.png' },
      { text: '시나고그', image: '../../../media/a2/city/synagogue.png' },
      { text: '모스크', image: '../../../media/a2/city/mosque.png' }
    ],
    answer: '신사'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "교회" است؟',
    speak: '교회',
    options: [
      { text: '성지', image: '../../../media/a2/city/shrine.png' },
      { text: '교회', image: '../../../media/a2/city/church.png' },
      { text: '신사', image: '../../../media/a2/city/temple.png' },
      { text: '시나고그', image: '../../../media/a2/city/synagogue.png' }
    ],
    answer: '교회'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "시나고그" است؟',
    speak: '시나고그',
    options: [
      { text: '신사', image: '../../../media/a2/city/temple.png' },
      { text: '시나고그', image: '../../../media/a2/city/synagogue.png' },
      { text: '모스크', image: '../../../media/a2/city/mosque.png' },
      { text: '교회', image: '../../../media/a2/city/church.png' }
    ],
    answer: '시나고그'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "모스크" است؟',
    speak: '모스크',
    options: [
      { text: '교회', image: '../../../media/a2/city/church.png' },
      { text: '신사', image: '../../../media/a2/city/temple.png' },
      { text: '시나고그', image: '../../../media/a2/city/synagogue.png' },
      { text: '모스크', image: '../../../media/a2/city/mosque.png' }
    ],
    answer: '모스크'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "성지" است؟',
    speak: '성지',
    options: [
      { text: '성지', image: '../../../media/a2/city/shrine.png' },
      { text: '모스크', image: '../../../media/a2/city/mosque.png' },
      { text: '신사', image: '../../../media/a2/city/temple.png' },
      { text: '교회', image: '../../../media/a2/city/church.png' }
    ],
    answer: '성지'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/temple.png',
    options: ['신사', '교회', '시나고그', '모스크'],
    answer: '신사'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/church.png',
    options: ['신사', '교회', '시나고그', '성지'],
    answer: '교회'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/synagogue.png',
    options: ['성지', '신사', '시나고그', '교회'],
    answer: '시나고그'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/mosque.png',
    options: ['시나고그', '교회', '모스크', '신사'],
    answer: '모스크'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/shrine.png',
    options: ['신사', '모스크', '교회', '성지'],
    answer: '성지'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '신사',
    question: 'کدام کلمه را شنیدی؟',
    options: ['신사', '교회', '시나고그', '모스크'],
    answer: '신사'
  },
  {
    type: 'audio',
    speak: '교회',
    question: 'کدام کلمه را شنیدی؟',
    options: ['성지', '교회', '신사', '시나고그'],
    answer: '교회'
  },
  {
    type: 'audio',
    speak: '시나고그',
    question: 'کدام کلمه را شنیدی؟',
    options: ['신사', '시나고그', '모스크', '교회'],
    answer: '시나고그'
  },
  {
    type: 'audio',
    speak: '모스크',
    question: 'کدام کلمه را شنیدی؟',
    options: ['교회', '신사', '시나고그', '모스크'],
    answer: '모스크'
  },
  {
    type: 'audio',
    speak: '성지',
    question: 'کدام کلمه را شنیدی؟',
    options: ['성지', '모스크', '신사', '교회'],
    answer: '성지'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '신사',
    image: '../../../media/a2/city/temple.png',
    meaning: 'معبد شینتویی'
  },
  {
    type: 'speak',
    word: '교회',
    image: '../../../media/a2/city/church.png',
    meaning: 'کلیسا'
  },
  {
    type: 'speak',
    word: '시나고그',
    image: '../../../media/a2/city/synagogue.png',
    meaning: 'کنیسه'
  },
  {
    type: 'speak',
    word: '모스크',
    image: '../../../media/a2/city/mosque.png',
    meaning: 'مسجد'
  },
  {
    type: 'speak',
    word: '성지',
    image: '../../../media/a2/city/shrine.png',
    meaning: 'زیارتگاه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله کره‌ای) =====
  {
    type: 'build-it',
    speak: '저는 신사에 갔습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'من به معبد شینتویی رفتم',
    words: ['갔습니다', '에', '신사', '저는'],
    answer: ['저는', '신사에', '갔습니다']
  },
  {
    type: 'build-it',
    speak: '그는 교회에 갔습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'او به کلیسا رفت',
    words: ['갔습니다', '에', '교회', '그는'],
    answer: ['그는', '교회에', '갔습니다']
  },
  {
    type: 'build-it',
    speak: '그녀는 시나고그에 갔습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'او به کنیسه رفت',
    words: ['갔습니다', '에', '시나고그', '그녀는'],
    answer: ['그녀는', '시나고그에', '갔습니다']
  },
  {
    type: 'build-it',
    speak: '그는 모스크에 갔습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'او به مسجد رفت',
    words: ['갔습니다', '에', '모스크', '그는'],
    answer: ['그는', '모스크에', '갔습니다']
  },
  {
    type: 'build-it',
    speak: '저는 성지에 갔습니다',
    question: 'جمله کره‌ای را بساز:',
    text: 'من به زیارتگاه رفتم',
    words: ['갔습니다', '에', '성지', '저는'],
    answer: ['저는', '성지에', '갔습니다']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '저는 신사에 갔습니다',
    question: 'ترجمه را بساز:',
    text: '저는 신사에 갔습니다',
    words: ['من', 'به', 'معبد شینتویی', 'رفتم'],
    answer: ['من', 'به', 'معبد شینتویی', 'رفتم']
  },
  {
    type: 'build-fa',
    speak: '그는 교회에 갔습니다',
    question: 'ترجمه را بساز:',
    text: '그는 교회에 갔습니다',
    words: ['او', 'به', 'کلیسا', 'رفت'],
    answer: ['او', 'به', 'کلیسا', 'رفت']
  },
  {
    type: 'build-fa',
    speak: '그녀는 시나고그에 갔습니다',
    question: 'ترجمه را بساز:',
    text: '그녀는 시나고그에 갔습니다',
    words: ['او', 'به', 'کنیسه', 'رفت'],
    answer: ['او', 'به', 'کنیسه', 'رفت']
  },
  {
    type: 'build-fa',
    speak: '그는 모스크에 갔습니다',
    question: 'ترجمه را بساز:',
    text: '그는 모스크에 갔습니다',
    words: ['او', 'به', 'مسجد', 'رفت'],
    answer: ['او', 'به', 'مسجد', 'رفت']
  },
  {
    type: 'build-fa',
    speak: '저는 성지에 갔습니다',
    question: 'ترجمه را بساز:',
    text: '저는 성지에 갔습니다',
    words: ['من', 'به', 'زیارتگاه', 'رفتم'],
    answer: ['من', 'به', 'زیارتگاه', 'رفتم']
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