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

// ===== سوالات درس ۳۳ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "das U-Boot" است؟',
    speak: 'das U-Boot',
    options: [
      { text: 'das U-Boot', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'die Fähre', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'die Yacht', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'das Kanu', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: 'das U-Boot'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Fähre" است؟',
    speak: 'die Fähre',
    options: [
      { text: 'das U-Boot', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'die Fähre', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'das Floß', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'die Yacht', image: '../../../media/a2/vehicles/yacht.png' }
    ],
    answer: 'die Fähre'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Yacht" است؟',
    speak: 'die Yacht',
    options: [
      { text: 'das Kanu', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'das U-Boot', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'die Yacht', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'die Fähre', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: 'die Yacht'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Kanu" است؟',
    speak: 'das Kanu',
    options: [
      { text: 'die Fähre', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'das Kanu', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'das Floß', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'das U-Boot', image: '../../../media/a2/vehicles/submarine.png' }
    ],
    answer: 'das Kanu'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Floß" است؟',
    speak: 'das Floß',
    options: [
      { text: 'das U-Boot', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'die Yacht', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'das Floß', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'das Kanu', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: 'das Floß'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/submarine.png',
    options: ['das U-Boot', 'die Fähre', 'die Yacht', 'das Kanu'],
    answer: 'das U-Boot'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ferry.png',
    options: ['das U-Boot', 'die Fähre', 'das Floß', 'die Yacht'],
    answer: 'die Fähre'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/yacht.png',
    options: ['das Kanu', 'das U-Boot', 'die Yacht', 'die Fähre'],
    answer: 'die Yacht'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/canoe.png',
    options: ['die Fähre', 'das Kanu', 'das Floß', 'das U-Boot'],
    answer: 'das Kanu'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/raft.png',
    options: ['das U-Boot', 'die Yacht', 'das Floß', 'das Kanu'],
    answer: 'das Floß'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'das U-Boot',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das U-Boot', 'die Fähre', 'die Yacht', 'das Kanu'],
    answer: 'das U-Boot'
  },
  {
    type: 'audio',
    speak: 'die Fähre',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das U-Boot', 'die Fähre', 'das Floß', 'die Yacht'],
    answer: 'die Fähre'
  },
  {
    type: 'audio',
    speak: 'die Yacht',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Kanu', 'das U-Boot', 'die Yacht', 'die Fähre'],
    answer: 'die Yacht'
  },
  {
    type: 'audio',
    speak: 'das Kanu',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Fähre', 'das Kanu', 'das Floß', 'das U-Boot'],
    answer: 'das Kanu'
  },
  {
    type: 'audio',
    speak: 'das Floß',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das U-Boot', 'die Yacht', 'das Floß', 'das Kanu'],
    answer: 'das Floß'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'das U-Boot',
    image: '../../../media/a2/vehicles/submarine.png',
    meaning: 'زیردریایی'
  },
  {
    type: 'speak',
    word: 'die Fähre',
    image: '../../../media/a2/vehicles/ferry.png',
    meaning: 'کشتی'
  },
  {
    type: 'speak',
    word: 'die Yacht',
    image: '../../../media/a2/vehicles/yacht.png',
    meaning: 'قایق تفریحی'
  },
  {
    type: 'speak',
    word: 'das Kanu',
    image: '../../../media/a2/vehicles/canoe.png',
    meaning: 'کانو'
  },
  {
    type: 'speak',
    word: 'das Floß',
    image: '../../../media/a2/vehicles/raft.png',
    meaning: 'قایق بادی'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich sehe ein U-Boot',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک زیردریایی می‌بینم',
    words: ['U-Boot', 'ein', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'ein', 'U-Boot']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe eine Fähre',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کشتی می‌بینم',
    words: ['Fähre', 'eine', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'eine', 'Fähre']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe eine Yacht',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک قایق تفریحی می‌بینم',
    words: ['Yacht', 'eine', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'eine', 'Yacht']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe ein Kanu',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک کانو می‌بینم',
    words: ['Kanu', 'ein', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'ein', 'Kanu']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe ein Floß',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک قایق بادی می‌بینم',
    words: ['Floß', 'ein', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'ein', 'Floß']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich sehe ein U-Boot',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe ein U-Boot',
    words: ['می‌بینم', 'زیردریایی', 'یک', 'من'],
    answer: ['من', 'یک', 'زیردریایی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe eine Fähre',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe eine Fähre',
    words: ['می‌بینم', 'کشتی', 'یک', 'من'],
    answer: ['من', 'یک', 'کشتی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe eine Yacht',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe eine Yacht',
    words: ['می‌بینم', 'قایق تفریحی', 'یک', 'من'],
    answer: ['من', 'یک', 'قایق تفریحی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe ein Kanu',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe ein Kanu',
    words: ['می‌بینم', 'کانو', 'یک', 'من'],
    answer: ['من', 'یک', 'کانو', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe ein Floß',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe ein Floß',
    words: ['می‌بینم', 'قایق بادی', 'یک', 'من'],
    answer: ['من', 'یک', 'قایق بادی', 'می‌بینم']
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