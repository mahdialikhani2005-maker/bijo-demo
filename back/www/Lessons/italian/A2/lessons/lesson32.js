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

// ===== سوالات درس ۳۲ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il furgone" است؟',
    speak: 'il furgone',
    options: [
      { text: 'il furgone', image: '../../../media/a2/vehicles/van.png' },
      { text: 'la jeep', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'la limousine', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'il camion dei pompieri', image: '../../../media/a2/vehicles/firetruck.png' }
    ],
    answer: 'il furgone'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la jeep" است؟',
    speak: 'la jeep',
    options: [
      { text: 'il furgone', image: '../../../media/a2/vehicles/van.png' },
      { text: 'la jeep', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'l\'ambulanza', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'la limousine', image: '../../../media/a2/vehicles/limousine.png' }
    ],
    answer: 'la jeep'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la limousine" است؟',
    speak: 'la limousine',
    options: [
      { text: 'l\'ambulanza', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'il furgone', image: '../../../media/a2/vehicles/van.png' },
      { text: 'la limousine', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'la jeep', image: '../../../media/a2/vehicles/jeep.png' }
    ],
    answer: 'la limousine'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'ambulanza" است؟',
    speak: 'l\'ambulanza',
    options: [
      { text: 'la jeep', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'l\'ambulanza', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'il camion dei pompieri', image: '../../../media/a2/vehicles/firetruck.png' },
      { text: 'il furgone', image: '../../../media/a2/vehicles/van.png' }
    ],
    answer: 'l\'ambulanza'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il camion dei pompieri" است؟',
    speak: 'il camion dei pompieri',
    options: [
      { text: 'il furgone', image: '../../../media/a2/vehicles/van.png' },
      { text: 'la limousine', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'il camion dei pompieri', image: '../../../media/a2/vehicles/firetruck.png' },
      { text: 'l\'ambulanza', image: '../../../media/a2/vehicles/ambulance.png' }
    ],
    answer: 'il camion dei pompieri'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/van.png',
    options: ['il furgone', 'la jeep', 'la limousine', 'l\'ambulanza'],
    answer: 'il furgone'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/jeep.png',
    options: ['il furgone', 'la jeep', 'il camion dei pompieri', 'la limousine'],
    answer: 'la jeep'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/limousine.png',
    options: ['l\'ambulanza', 'il furgone', 'la limousine', 'la jeep'],
    answer: 'la limousine'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ambulance.png',
    options: ['la jeep', 'l\'ambulanza', 'il camion dei pompieri', 'il furgone'],
    answer: 'l\'ambulanza'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/firetruck.png',
    options: ['il furgone', 'la limousine', 'il camion dei pompieri', 'l\'ambulanza'],
    answer: 'il camion dei pompieri'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il furgone',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il furgone', 'la jeep', 'la limousine', 'l\'ambulanza'],
    answer: 'il furgone'
  },
  {
    type: 'audio',
    speak: 'la jeep',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il furgone', 'la jeep', 'il camion dei pompieri', 'la limousine'],
    answer: 'la jeep'
  },
  {
    type: 'audio',
    speak: 'la limousine',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ambulanza', 'il furgone', 'la limousine', 'la jeep'],
    answer: 'la limousine'
  },
  {
    type: 'audio',
    speak: 'l\'ambulanza',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la jeep', 'l\'ambulanza', 'il camion dei pompieri', 'il furgone'],
    answer: 'l\'ambulanza'
  },
  {
    type: 'audio',
    speak: 'il camion dei pompieri',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il furgone', 'la limousine', 'il camion dei pompieri', 'l\'ambulanza'],
    answer: 'il camion dei pompieri'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il furgone',
    image: '../../../media/a2/vehicles/van.png',
    meaning: 'ون'
  },
  {
    type: 'speak',
    word: 'la jeep',
    image: '../../../media/a2/vehicles/jeep.png',
    meaning: 'جیپ'
  },
  {
    type: 'speak',
    word: 'la limousine',
    image: '../../../media/a2/vehicles/limousine.png',
    meaning: 'لیموزین'
  },
  {
    type: 'speak',
    word: 'l\'ambulanza',
    image: '../../../media/a2/vehicles/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'il camion dei pompieri',
    image: '../../../media/a2/vehicles/firetruck.png',
    meaning: 'آتش‌نشانی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Vedo un furgone',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک ون می‌بینم',
    words: ['furgone', 'un', 'Vedo'],
    answer: ['Vedo', 'un', 'furgone']
  },
  {
    type: 'build-it',
    speak: 'Vedo una jeep',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک جیپ می‌بینم',
    words: ['jeep', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'jeep']
  },
  {
    type: 'build-it',
    speak: 'Vedo una limousine',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک لیموزین می‌بینم',
    words: ['limousine', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'limousine']
  },
  {
    type: 'build-it',
    speak: 'Vedo un\'ambulanza',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک آمبولانس می‌بینم',
    words: ['ambulanza', 'un\'', 'Vedo'],
    answer: ['Vedo', 'un\'', 'ambulanza']
  },
  {
    type: 'build-it',
    speak: 'Vedo un camion dei pompieri',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک ماشین آتش‌نشانی می‌بینم',
    words: ['pompieri', 'dei', 'camion', 'un', 'Vedo'],
    answer: ['Vedo', 'un', 'camion', 'dei', 'pompieri']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Vedo un furgone',
    question: 'ترجمه را بساز:',
    text: 'Vedo un furgone',
    words: ['می‌بینم', 'ون', 'یک', 'من'],
    answer: ['من', 'یک', 'ون', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una jeep',
    question: 'ترجمه را بساز:',
    text: 'Vedo una jeep',
    words: ['می‌بینم', 'جیپ', 'یک', 'من'],
    answer: ['من', 'یک', 'جیپ', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una limousine',
    question: 'ترجمه را بساز:',
    text: 'Vedo una limousine',
    words: ['می‌بینم', 'لیموزین', 'یک', 'من'],
    answer: ['من', 'یک', 'لیموزین', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo un\'ambulanza',
    question: 'ترجمه را بساز:',
    text: 'Vedo un\'ambulanza',
    words: ['می‌بینم', 'آمبولانس', 'یک', 'من'],
    answer: ['من', 'یک', 'آمبولانس', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo un camion dei pompieri',
    question: 'ترجمه را بساز:',
    text: 'Vedo un camion dei pompieri',
    words: ['می‌بینم', 'آتش‌نشانی', 'ماشین', 'یک', 'من'],
    answer: ['من', 'یک', 'ماشین', 'آتش‌نشانی', 'می‌بینم']
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