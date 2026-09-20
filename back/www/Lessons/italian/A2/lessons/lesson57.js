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

// ===== سوالات درس ۵۷ - ایتالیایی به فارسی (فناوری) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "lo schermo" است؟',
    speak: 'lo schermo',
    options: [
      { text: 'lo schermo', image: '../../../media/a2/tech/screen.png' },
      { text: 'il monitor', image: '../../../media/a2/tech/monitor.png' },
      { text: 'la stampante', image: '../../../media/a2/tech/printer.png' },
      { text: 'lo scanner', image: '../../../media/a2/tech/scanner.png' }
    ],
    answer: 'lo schermo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il monitor" است؟',
    speak: 'il monitor',
    options: [
      { text: 'lo schermo', image: '../../../media/a2/tech/screen.png' },
      { text: 'il monitor', image: '../../../media/a2/tech/monitor.png' },
      { text: 'l\'altoparlante', image: '../../../media/a2/tech/speaker.png' },
      { text: 'la stampante', image: '../../../media/a2/tech/printer.png' }
    ],
    answer: 'il monitor'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la stampante" است؟',
    speak: 'la stampante',
    options: [
      { text: 'lo scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'il monitor', image: '../../../media/a2/tech/monitor.png' },
      { text: 'la stampante', image: '../../../media/a2/tech/printer.png' },
      { text: 'lo schermo', image: '../../../media/a2/tech/screen.png' }
    ],
    answer: 'la stampante'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "lo scanner" است؟',
    speak: 'lo scanner',
    options: [
      { text: 'lo scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'la stampante', image: '../../../media/a2/tech/printer.png' },
      { text: 'l\'altoparlante', image: '../../../media/a2/tech/speaker.png' },
      { text: 'il monitor', image: '../../../media/a2/tech/monitor.png' }
    ],
    answer: 'lo scanner'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'altoparlante" است؟',
    speak: 'l\'altoparlante',
    options: [
      { text: 'lo schermo', image: '../../../media/a2/tech/screen.png' },
      { text: 'lo scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'l\'altoparlante', image: '../../../media/a2/tech/speaker.png' },
      { text: 'la stampante', image: '../../../media/a2/tech/printer.png' }
    ],
    answer: 'l\'altoparlante'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/screen.png',
    options: ['lo schermo', 'il monitor', 'la stampante', 'lo scanner'],
    answer: 'lo schermo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/monitor.png',
    options: ['lo schermo', 'il monitor', 'l\'altoparlante', 'la stampante'],
    answer: 'il monitor'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/printer.png',
    options: ['lo scanner', 'il monitor', 'la stampante', 'lo schermo'],
    answer: 'la stampante'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/scanner.png',
    options: ['lo scanner', 'la stampante', 'l\'altoparlante', 'il monitor'],
    answer: 'lo scanner'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/speaker.png',
    options: ['lo schermo', 'lo scanner', 'l\'altoparlante', 'la stampante'],
    answer: 'l\'altoparlante'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'lo schermo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lo schermo', 'il monitor', 'la stampante', 'lo scanner'],
    answer: 'lo schermo'
  },
  {
    type: 'audio',
    speak: 'il monitor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lo schermo', 'il monitor', 'l\'altoparlante', 'la stampante'],
    answer: 'il monitor'
  },
  {
    type: 'audio',
    speak: 'la stampante',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lo scanner', 'il monitor', 'la stampante', 'lo schermo'],
    answer: 'la stampante'
  },
  {
    type: 'audio',
    speak: 'lo scanner',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lo scanner', 'la stampante', 'l\'altoparlante', 'il monitor'],
    answer: 'lo scanner'
  },
  {
    type: 'audio',
    speak: 'l\'altoparlante',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lo schermo', 'lo scanner', 'l\'altoparlante', 'la stampante'],
    answer: 'l\'altoparlante'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'lo schermo',
    image: '../../../media/a2/tech/screen.png',
    meaning: 'صفحه نمایش'
  },
  {
    type: 'speak',
    word: 'il monitor',
    image: '../../../media/a2/tech/monitor.png',
    meaning: 'مانیتور'
  },
  {
    type: 'speak',
    word: 'la stampante',
    image: '../../../media/a2/tech/printer.png',
    meaning: 'چاپگر'
  },
  {
    type: 'speak',
    word: 'lo scanner',
    image: '../../../media/a2/tech/scanner.png',
    meaning: 'اسکنر'
  },
  {
    type: 'speak',
    word: 'l\'altoparlante',
    image: '../../../media/a2/tech/speaker.png',
    meaning: 'بلندگو'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Lo schermo è grande',
    question: 'جمله ایتالیایی را بساز:',
    text: 'صفحه نمایش بزرگ است',
    words: ['grande', 'è', 'schermo', 'Lo'],
    answer: ['Lo', 'schermo', 'è', 'grande']
  },
  {
    type: 'build-it',
    speak: 'Il monitor è nuovo',
    question: 'جمله ایتالیایی را بساز:',
    text: 'مانیتور جدید است',
    words: ['nuovo', 'è', 'monitor', 'Il'],
    answer: ['Il', 'monitor', 'è', 'nuovo']
  },
  {
    type: 'build-it',
    speak: 'La stampante è rotta',
    question: 'جمله ایتالیایی را بساز:',
    text: 'چاپگر خراب است',
    words: ['rotta', 'è', 'stampante', 'La'],
    answer: ['La', 'stampante', 'è', 'rotta']
  },
  {
    type: 'build-it',
    speak: 'Lo scanner funziona',
    question: 'جمله ایتالیایی را بساز:',
    text: 'اسکنر کار می‌کند',
    words: ['funziona', 'scanner', 'Lo'],
    answer: ['Lo', 'scanner', 'funziona']
  },
  {
    type: 'build-it',
    speak: 'L\'altoparlante è forte',
    question: 'جمله ایتالیایی را بساز:',
    text: 'بلندگو بلند است',
    words: ['forte', 'è', 'altoparlante', 'L\''],
    answer: ['L\'', 'altoparlante', 'è', 'forte']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Lo schermo è grande',
    question: 'ترجمه را بساز:',
    text: 'Lo schermo è grande',
    words: ['است', 'بزرگ', 'نمایش', 'صفحه'],
    answer: ['صفحه', 'نمایش', 'بزرگ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Il monitor è nuovo',
    question: 'ترجمه را بساز:',
    text: 'Il monitor è nuovo',
    words: ['است', 'جدید', 'مانیتور'],
    answer: ['مانیتور', 'جدید', 'است']
  },
  {
    type: 'build-fa',
    speak: 'La stampante è rotta',
    question: 'ترجمه را بساز:',
    text: 'La stampante è rotta',
    words: ['است', 'خراب', 'چاپگر'],
    answer: ['چاپگر', 'خراب', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Lo scanner funziona',
    question: 'ترجمه را بساز:',
    text: 'Lo scanner funziona',
    words: ['می‌کند', 'کار', 'اسکنر'],
    answer: ['اسکنر', 'کار', 'می‌کند']
  },
  {
    type: 'build-fa',
    speak: 'L\'altoparlante è forte',
    question: 'ترجمه را بساز:',
    text: 'L\'altoparlante è forte',
    words: ['است', 'بلند', 'بلندگو'],
    answer: ['بلندگو', 'بلند', 'است']
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