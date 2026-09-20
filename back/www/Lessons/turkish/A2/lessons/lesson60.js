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

// ===== سوالات درس ۶۰ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "das Gerät" است؟',
    speak: 'das Gerät',
    options: [
      { text: 'das Gerät', image: '../../../media/a2/tech/device.png' },
      { text: 'das Gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'der Roboter', image: '../../../media/a2/tech/robot.png' },
      { text: 'die Drohne', image: '../../../media/a2/tech/drone.png' }
    ],
    answer: 'das Gerät'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Gadget" است؟',
    speak: 'das Gadget',
    options: [
      { text: 'das Gerät', image: '../../../media/a2/tech/device.png' },
      { text: 'das Gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'die Smartwatch', image: '../../../media/a2/tech/smart-watch.png' },
      { text: 'der Roboter', image: '../../../media/a2/tech/robot.png' }
    ],
    answer: 'das Gadget'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Roboter" است؟',
    speak: 'der Roboter',
    options: [
      { text: 'die Drohne', image: '../../../media/a2/tech/drone.png' },
      { text: 'das Gerät', image: '../../../media/a2/tech/device.png' },
      { text: 'der Roboter', image: '../../../media/a2/tech/robot.png' },
      { text: 'das Gadget', image: '../../../media/a2/tech/gadget.png' }
    ],
    answer: 'der Roboter'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Drohne" است؟',
    speak: 'die Drohne',
    options: [
      { text: 'das Gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'die Drohne', image: '../../../media/a2/tech/drone.png' },
      { text: 'die Smartwatch', image: '../../../media/a2/tech/smart-watch.png' },
      { text: 'das Gerät', image: '../../../media/a2/tech/device.png' }
    ],
    answer: 'die Drohne'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Smartwatch" است؟',
    speak: 'die Smartwatch',
    options: [
      { text: 'das Gerät', image: '../../../media/a2/tech/device.png' },
      { text: 'der Roboter', image: '../../../media/a2/tech/robot.png' },
      { text: 'die Smartwatch', image: '../../../media/a2/tech/smart-watch.png' },
      { text: 'die Drohne', image: '../../../media/a2/tech/drone.png' }
    ],
    answer: 'die Smartwatch'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/device.png',
    options: ['das Gerät', 'das Gadget', 'der Roboter', 'die Drohne'],
    answer: 'das Gerät'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/gadget.png',
    options: ['das Gerät', 'das Gadget', 'die Smartwatch', 'der Roboter'],
    answer: 'das Gadget'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/robot.png',
    options: ['die Drohne', 'das Gerät', 'der Roboter', 'das Gadget'],
    answer: 'der Roboter'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/drone.png',
    options: ['das Gadget', 'die Drohne', 'die Smartwatch', 'das Gerät'],
    answer: 'die Drohne'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/smart-watch.png',
    options: ['das Gerät', 'der Roboter', 'die Smartwatch', 'die Drohne'],
    answer: 'die Smartwatch'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'das Gerät',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Gerät', 'das Gadget', 'der Roboter', 'die Drohne'],
    answer: 'das Gerät'
  },
  {
    type: 'audio',
    speak: 'das Gadget',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Gerät', 'das Gadget', 'die Smartwatch', 'der Roboter'],
    answer: 'das Gadget'
  },
  {
    type: 'audio',
    speak: 'der Roboter',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Drohne', 'das Gerät', 'der Roboter', 'das Gadget'],
    answer: 'der Roboter'
  },
  {
    type: 'audio',
    speak: 'die Drohne',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Gadget', 'die Drohne', 'die Smartwatch', 'das Gerät'],
    answer: 'die Drohne'
  },
  {
    type: 'audio',
    speak: 'die Smartwatch',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Gerät', 'der Roboter', 'die Smartwatch', 'die Drohne'],
    answer: 'die Smartwatch'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'das Gerät',
    image: '../../../media/a2/tech/device.png',
    meaning: 'دستگاه'
  },
  {
    type: 'speak',
    word: 'das Gadget',
    image: '../../../media/a2/tech/gadget.png',
    meaning: 'ابزار'
  },
  {
    type: 'speak',
    word: 'der Roboter',
    image: '../../../media/a2/tech/robot.png',
    meaning: 'ربات'
  },
  {
    type: 'speak',
    word: 'die Drohne',
    image: '../../../media/a2/tech/drone.png',
    meaning: 'پهپاد'
  },
  {
    type: 'speak',
    word: 'die Smartwatch',
    image: '../../../media/a2/tech/smart-watch.png',
    meaning: 'ساعت هوشمند'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe ein Gerät',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک دستگاه دارم',
    words: ['Gerät', 'ein', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'ein', 'Gerät']
  },
  {
    type: 'build-de',
    speak: 'Ich habe ein Gadget',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ابزار دارم',
    words: ['Gadget', 'ein', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'ein', 'Gadget']
  },
  {
    type: 'build-de',
    speak: 'Ich habe einen Roboter',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ربات دارم',
    words: ['Roboter', 'einen', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'einen', 'Roboter']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Drohne',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک پهپاد دارم',
    words: ['Drohne', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Drohne']
  },
  {
    type: 'build-de',
    speak: 'Ich habe eine Smartwatch',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ساعت هوشمند دارم',
    words: ['Smartwatch', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'Smartwatch']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe ein Gerät',
    question: 'ترجمه را بساز:',
    text: 'Ich habe ein Gerät',
    words: ['دارم', 'دستگاه', 'یک', 'من'],
    answer: ['من', 'یک', 'دستگاه', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe ein Gadget',
    question: 'ترجمه را بساز:',
    text: 'Ich habe ein Gadget',
    words: ['دارم', 'ابزار', 'یک', 'من'],
    answer: ['من', 'یک', 'ابزار', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe einen Roboter',
    question: 'ترجمه را بساز:',
    text: 'Ich habe einen Roboter',
    words: ['دارم', 'ربات', 'یک', 'من'],
    answer: ['من', 'یک', 'ربات', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Drohne',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Drohne',
    words: ['دارم', 'پهپاد', 'یک', 'من'],
    answer: ['من', 'یک', 'پهپاد', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe eine Smartwatch',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine Smartwatch',
    words: ['دارم', 'ساعت هوشمند', 'یک', 'من'],
    answer: ['من', 'یک', 'ساعت هوشمند', 'دارم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 تبریک! همه ۶۰ درس آلمانی تمام شد! 🎉</h2>
      <p>امتیاز دریافت‌شده: <b>${finalXP}</b></p>
      <p>🌟 شما ۳۰۰ کلمه آلمانی سطح A2 را یاد گرفتید! 🌟</p>
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