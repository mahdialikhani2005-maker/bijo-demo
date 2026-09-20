let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
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
  recognition.lang = 'it-IT';
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

// ===== سوالات درس ۶۰ - ایتالیایی به فارسی (فناوری) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il dispositivo" است؟',
    speak: 'il dispositivo',
    options: [
      { text: 'il dispositivo', image: '../../../media/a2/tech/device.png' },
      { text: 'il gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'il robot', image: '../../../media/a2/tech/robot.png' },
      { text: 'il drone', image: '../../../media/a2/tech/drone.png' }
    ],
    answer: 'il dispositivo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il gadget" است؟',
    speak: 'il gadget',
    options: [
      { text: 'il dispositivo', image: '../../../media/a2/tech/device.png' },
      { text: 'il gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'lo smartwatch', image: '../../../media/a2/tech/smartwatch.png' },
      { text: 'il drone', image: '../../../media/a2/tech/drone.png' }
    ],
    answer: 'il gadget'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il robot" است؟',
    speak: 'il robot',
    options: [
      { text: 'il dispositivo', image: '../../../media/a2/tech/device.png' },
      { text: 'il gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'il robot', image: '../../../media/a2/tech/robot.png' },
      { text: 'lo smartwatch', image: '../../../media/a2/tech/smartwatch.png' }
    ],
    answer: 'il robot'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il drone" است؟',
    speak: 'il drone',
    options: [
      { text: 'il dispositivo', image: '../../../media/a2/tech/device.png' },
      { text: 'il drone', image: '../../../media/a2/tech/drone.png' },
      { text: 'il robot', image: '../../../media/a2/tech/robot.png' },
      { text: 'il gadget', image: '../../../media/a2/tech/gadget.png' }
    ],
    answer: 'il drone'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "lo smartwatch" است؟',
    speak: 'lo smartwatch',
    options: [
      { text: 'il dispositivo', image: '../../../media/a2/tech/device.png' },
      { text: 'il gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'il drone', image: '../../../media/a2/tech/drone.png' },
      { text: 'lo smartwatch', image: '../../../media/a2/tech/smartwatch.png' }
    ],
    answer: 'lo smartwatch'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/device.png',
    options: ['il dispositivo', 'il gadget', 'il robot', 'il drone'],
    answer: 'il dispositivo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/gadget.png',
    options: ['il dispositivo', 'il gadget', 'lo smartwatch', 'il drone'],
    answer: 'il gadget'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/robot.png',
    options: ['il dispositivo', 'il gadget', 'il robot', 'lo smartwatch'],
    answer: 'il robot'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/drone.png',
    options: ['il dispositivo', 'il drone', 'il robot', 'il gadget'],
    answer: 'il drone'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/smartwatch.png',
    options: ['il dispositivo', 'il gadget', 'il drone', 'lo smartwatch'],
    answer: 'lo smartwatch'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il dispositivo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il dispositivo', 'il gadget', 'il robot', 'il drone'],
    answer: 'il dispositivo'
  },
  {
    type: 'audio',
    speak: 'il gadget',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il dispositivo', 'il gadget', 'lo smartwatch', 'il drone'],
    answer: 'il gadget'
  },
  {
    type: 'audio',
    speak: 'il robot',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il dispositivo', 'il gadget', 'il robot', 'lo smartwatch'],
    answer: 'il robot'
  },
  {
    type: 'audio',
    speak: 'il drone',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il dispositivo', 'il drone', 'il robot', 'il gadget'],
    answer: 'il drone'
  },
  {
    type: 'audio',
    speak: 'lo smartwatch',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il dispositivo', 'il gadget', 'il drone', 'lo smartwatch'],
    answer: 'lo smartwatch'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il dispositivo',
    image: '../../../media/a2/tech/device.png',
    meaning: 'دستگاه'
  },
  {
    type: 'speak',
    word: 'il gadget',
    image: '../../../media/a2/tech/gadget.png',
    meaning: 'گجت / ابزار'
  },
  {
    type: 'speak',
    word: 'il robot',
    image: '../../../media/a2/tech/robot.png',
    meaning: 'ربات'
  },
  {
    type: 'speak',
    word: 'il drone',
    image: '../../../media/a2/tech/drone.png',
    meaning: 'پهپاد'
  },
  {
    type: 'speak',
    word: 'lo smartwatch',
    image: '../../../media/a2/tech/smartwatch.png',
    meaning: 'ساعت هوشمند'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Ho un dispositivo',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک دستگاه دارم',
    words: ['dispositivo', 'un', 'Ho'],
    answer: ['Ho', 'un', 'dispositivo']
  },
  {
    type: 'build-it',
    speak: 'Compro un gadget',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک گجت می‌خرم',
    words: ['gadget', 'un', 'Compro'],
    answer: ['Compro', 'un', 'gadget']
  },
  {
    type: 'build-it',
    speak: 'Il robot è intelligente',
    question: 'جمله ایتالیایی را بساز:',
    text: 'ربات باهوش است',
    words: ['intelligente', 'è', 'robot', 'Il'],
    answer: ['Il', 'robot', 'è', 'intelligente']
  },
  {
    type: 'build-it',
    speak: 'Il drone vola',
    question: 'جمله ایتالیایی را بساز:',
    text: 'پهپاد پرواز می‌کند',
    words: ['vola', 'drone', 'Il'],
    answer: ['Il', 'drone', 'vola']
  },
  {
    type: 'build-it',
    speak: 'Indosso lo smartwatch',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من ساعت هوشمند را می‌پوشم',
    words: ['smartwatch', 'lo', 'Indosso'],
    answer: ['Indosso', 'lo', 'smartwatch']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ho un dispositivo',
    question: 'ترجمه را بساز:',
    text: 'Ho un dispositivo',
    words: ['دارم', 'دستگاه', 'یک', 'من'],
    answer: ['من', 'یک', 'دستگاه', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Compro un gadget',
    question: 'ترجمه را بساز:',
    text: 'Compro un gadget',
    words: ['می‌خرم', 'گجت', 'یک', 'من'],
    answer: ['من', 'یک', 'گجت', 'می‌خرم']
  },
  {
    type: 'build-fa',
    speak: 'Il robot è intelligente',
    question: 'ترجمه را بساز:',
    text: 'Il robot è intelligente',
    words: ['است', 'باهوش', 'ربات'],
    answer: ['ربات', 'باهوش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Il drone vola',
    question: 'ترجمه را بساز:',
    text: 'Il drone vola',
    words: ['می‌کند', 'پرواز', 'پهپاد'],
    answer: ['پهپاد', 'پرواز', 'می‌کند']
  },
  {
    type: 'build-fa',
    speak: 'Indosso lo smartwatch',
    question: 'ترجمه را بساز:',
    text: 'Indosso lo smartwatch',
    words: ['می‌پوشم', 'را', 'هوشمند', 'ساعت', 'من'],
    answer: ['من', 'ساعت', 'هوشمند', 'را', 'می‌پوشم']
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