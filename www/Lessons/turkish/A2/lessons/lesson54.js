let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
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
  recognition.lang = 'de-DE';
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

// ===== سوالات درس ۵۴ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Hafen" است؟',
    speak: 'der Hafen',
    options: [
      { text: 'der Hafen', image: '../../../media/a2/travel/port.png' },
      { text: 'der Hafen', image: '../../../media/a2/travel/harbor.png' },
      { text: 'das Tor', image: '../../../media/a2/travel/gate.png' },
      { text: 'die Crew', image: '../../../media/a2/travel/crew.png' }
    ],
    answer: 'der Hafen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Hafen" است؟',
    speak: 'der Hafen',
    options: [
      { text: 'der Hafen', image: '../../../media/a2/travel/port.png' },
      { text: 'der Hafen', image: '../../../media/a2/travel/harbor.png' },
      { text: 'das Terminal', image: '../../../media/a2/travel/terminal.png' },
      { text: 'das Tor', image: '../../../media/a2/travel/gate.png' }
    ],
    answer: 'der Hafen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Terminal" است؟',
    speak: 'das Terminal',
    options: [
      { text: 'die Crew', image: '../../../media/a2/travel/crew.png' },
      { text: 'der Hafen', image: '../../../media/a2/travel/port.png' },
      { text: 'das Terminal', image: '../../../media/a2/travel/terminal.png' },
      { text: 'der Hafen', image: '../../../media/a2/travel/harbor.png' }
    ],
    answer: 'das Terminal'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Tor" است؟',
    speak: 'das Tor',
    options: [
      { text: 'der Hafen', image: '../../../media/a2/travel/harbor.png' },
      { text: 'das Tor', image: '../../../media/a2/travel/gate.png' },
      { text: 'die Crew', image: '../../../media/a2/travel/crew.png' },
      { text: 'der Hafen', image: '../../../media/a2/travel/port.png' }
    ],
    answer: 'das Tor'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Crew" است؟',
    speak: 'die Crew',
    options: [
      { text: 'der Hafen', image: '../../../media/a2/travel/port.png' },
      { text: 'das Terminal', image: '../../../media/a2/travel/terminal.png' },
      { text: 'die Crew', image: '../../../media/a2/travel/crew.png' },
      { text: 'das Tor', image: '../../../media/a2/travel/gate.png' }
    ],
    answer: 'die Crew'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/port.png',
    options: ['der Hafen', 'der Hafen', 'das Tor', 'die Crew'],
    answer: 'der Hafen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/harbor.png',
    options: ['der Hafen', 'der Hafen', 'das Terminal', 'das Tor'],
    answer: 'der Hafen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/terminal.png',
    options: ['die Crew', 'der Hafen', 'das Terminal', 'der Hafen'],
    answer: 'das Terminal'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/gate.png',
    options: ['der Hafen', 'das Tor', 'die Crew', 'der Hafen'],
    answer: 'das Tor'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/crew.png',
    options: ['der Hafen', 'das Terminal', 'die Crew', 'das Tor'],
    answer: 'die Crew'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Hafen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Hafen', 'der Hafen', 'das Tor', 'die Crew'],
    answer: 'der Hafen'
  },
  {
    type: 'audio',
    speak: 'der Hafen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Hafen', 'der Hafen', 'das Terminal', 'das Tor'],
    answer: 'der Hafen'
  },
  {
    type: 'audio',
    speak: 'das Terminal',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Crew', 'der Hafen', 'das Terminal', 'der Hafen'],
    answer: 'das Terminal'
  },
  {
    type: 'audio',
    speak: 'das Tor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Hafen', 'das Tor', 'die Crew', 'der Hafen'],
    answer: 'das Tor'
  },
  {
    type: 'audio',
    speak: 'die Crew',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Hafen', 'das Terminal', 'die Crew', 'das Tor'],
    answer: 'die Crew'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Hafen',
    image: '../../../media/a2/travel/port.png',
    meaning: 'بندر'
  },
  {
    type: 'speak',
    word: 'der Hafen',
    image: '../../../media/a2/travel/harbor.png',
    meaning: 'بندرگاه'
  },
  {
    type: 'speak',
    word: 'das Terminal',
    image: '../../../media/a2/travel/terminal.png',
    meaning: 'ترمینال'
  },
  {
    type: 'speak',
    word: 'das Tor',
    image: '../../../media/a2/travel/gate.png',
    meaning: 'دروازه'
  },
  {
    type: 'speak',
    word: 'die Crew',
    image: '../../../media/a2/travel/crew.png',
    meaning: 'خدمه'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich bin im Hafen',
    question: 'جمله آلمانی را بساز:',
    text: 'من در بندر هستم',
    words: ['Hafen', 'im', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'im', 'Hafen']
  },
  {
    type: 'build-de',
    speak: 'Ich bin im Hafen',
    question: 'جمله آلمانی را بساز:',
    text: 'من در بندرگاه هستم',
    words: ['Hafen', 'im', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'im', 'Hafen']
  },
  {
    type: 'build-de',
    speak: 'Ich bin im Terminal',
    question: 'جمله آلمانی را بساز:',
    text: 'من در ترمینال هستم',
    words: ['Terminal', 'im', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'im', 'Terminal']
  },
  {
    type: 'build-de',
    speak: 'Ich bin am Tor',
    question: 'جمله آلمانی را بساز:',
    text: 'من در دروازه هستم',
    words: ['Tor', 'am', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'am', 'Tor']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe die Crew',
    question: 'جمله آلمانی را بساز:',
    text: 'من خدمه را می‌بینم',
    words: ['Crew', 'die', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'die', 'Crew']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich bin im Hafen',
    question: 'ترجمه را بساز:',
    text: 'Ich bin im Hafen',
    words: ['هستم', 'بندر', 'در', 'من'],
    answer: ['من', 'در', 'بندر', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin im Hafen',
    question: 'ترجمه را بساز:',
    text: 'Ich bin im Hafen',
    words: ['هستم', 'بندرگاه', 'در', 'من'],
    answer: ['من', 'در', 'بندرگاه', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin im Terminal',
    question: 'ترجمه را بساز:',
    text: 'Ich bin im Terminal',
    words: ['هستم', 'ترمینال', 'در', 'من'],
    answer: ['من', 'در', 'ترمینال', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin am Tor',
    question: 'ترجمه را بساز:',
    text: 'Ich bin am Tor',
    words: ['هستم', 'دروازه', 'در', 'من'],
    answer: ['من', 'در', 'دروازه', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe die Crew',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe die Crew',
    words: ['می‌بینم', 'خدمه', 'من'],
    answer: ['من', 'خدمه', 'می‌بینم']
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

  // ===== بخش BUILD DE / FA =====
  if (q.type === 'build-de' || q.type === 'build-fa') {
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

    if (q.type === 'build-de') {
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