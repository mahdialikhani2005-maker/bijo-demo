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

// ===== سوالات درس ۳۲ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Kleinbus" است؟',
    speak: 'der Kleinbus',
    options: [
      { text: 'der Kleinbus', image: '../../../media/a2/vehicles/van.png' },
      { text: 'der Geländewagen', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'die Limousine', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'das Feuerwehrauto', image: '../../../media/a2/vehicles/firetruck.png' }
    ],
    answer: 'der Kleinbus'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Geländewagen" است؟',
    speak: 'der Geländewagen',
    options: [
      { text: 'der Kleinbus', image: '../../../media/a2/vehicles/van.png' },
      { text: 'der Geländewagen', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'der Krankenwagen', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'die Limousine', image: '../../../media/a2/vehicles/limousine.png' }
    ],
    answer: 'der Geländewagen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Limousine" است؟',
    speak: 'die Limousine',
    options: [
      { text: 'der Krankenwagen', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'der Kleinbus', image: '../../../media/a2/vehicles/van.png' },
      { text: 'die Limousine', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'der Geländewagen', image: '../../../media/a2/vehicles/jeep.png' }
    ],
    answer: 'die Limousine'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Krankenwagen" است؟',
    speak: 'der Krankenwagen',
    options: [
      { text: 'der Geländewagen', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'der Krankenwagen', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'das Feuerwehrauto', image: '../../../media/a2/vehicles/firetruck.png' },
      { text: 'der Kleinbus', image: '../../../media/a2/vehicles/van.png' }
    ],
    answer: 'der Krankenwagen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Feuerwehrauto" است؟',
    speak: 'das Feuerwehrauto',
    options: [
      { text: 'der Kleinbus', image: '../../../media/a2/vehicles/van.png' },
      { text: 'die Limousine', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'das Feuerwehrauto', image: '../../../media/a2/vehicles/firetruck.png' },
      { text: 'der Krankenwagen', image: '../../../media/a2/vehicles/ambulance.png' }
    ],
    answer: 'das Feuerwehrauto'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/van.png',
    options: ['der Kleinbus', 'der Geländewagen', 'die Limousine', 'der Krankenwagen'],
    answer: 'der Kleinbus'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/jeep.png',
    options: ['der Kleinbus', 'der Geländewagen', 'das Feuerwehrauto', 'die Limousine'],
    answer: 'der Geländewagen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/limousine.png',
    options: ['der Krankenwagen', 'der Kleinbus', 'die Limousine', 'der Geländewagen'],
    answer: 'die Limousine'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ambulance.png',
    options: ['der Geländewagen', 'der Krankenwagen', 'das Feuerwehrauto', 'der Kleinbus'],
    answer: 'der Krankenwagen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/firetruck.png',
    options: ['der Kleinbus', 'die Limousine', 'das Feuerwehrauto', 'der Krankenwagen'],
    answer: 'das Feuerwehrauto'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Kleinbus',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kleinbus', 'der Geländewagen', 'die Limousine', 'der Krankenwagen'],
    answer: 'der Kleinbus'
  },
  {
    type: 'audio',
    speak: 'der Geländewagen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kleinbus', 'der Geländewagen', 'das Feuerwehrauto', 'die Limousine'],
    answer: 'der Geländewagen'
  },
  {
    type: 'audio',
    speak: 'die Limousine',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Krankenwagen', 'der Kleinbus', 'die Limousine', 'der Geländewagen'],
    answer: 'die Limousine'
  },
  {
    type: 'audio',
    speak: 'der Krankenwagen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Geländewagen', 'der Krankenwagen', 'das Feuerwehrauto', 'der Kleinbus'],
    answer: 'der Krankenwagen'
  },
  {
    type: 'audio',
    speak: 'das Feuerwehrauto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kleinbus', 'die Limousine', 'das Feuerwehrauto', 'der Krankenwagen'],
    answer: 'das Feuerwehrauto'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Kleinbus',
    image: '../../../media/a2/vehicles/van.png',
    meaning: 'ون'
  },
  {
    type: 'speak',
    word: 'der Geländewagen',
    image: '../../../media/a2/vehicles/jeep.png',
    meaning: 'جیپ'
  },
  {
    type: 'speak',
    word: 'die Limousine',
    image: '../../../media/a2/vehicles/limousine.png',
    meaning: 'لیموزین'
  },
  {
    type: 'speak',
    word: 'der Krankenwagen',
    image: '../../../media/a2/vehicles/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'das Feuerwehrauto',
    image: '../../../media/a2/vehicles/firetruck.png',
    meaning: 'آتش‌نشانی'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich sehe einen Kleinbus',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ون می‌بینم',
    words: ['Kleinbus', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Kleinbus']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Geländewagen',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک جیپ می‌بینم',
    words: ['Geländewagen', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Geländewagen']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe eine Limousine',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک لیموزین می‌بینم',
    words: ['Limousine', 'eine', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'eine', 'Limousine']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Krankenwagen',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک آمبولانس می‌بینم',
    words: ['Krankenwagen', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Krankenwagen']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe ein Feuerwehrauto',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ماشین آتش‌نشانی می‌بینم',
    words: ['Feuerwehrauto', 'ein', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'ein', 'Feuerwehrauto']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Kleinbus',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Kleinbus',
    words: ['می‌بینم', 'ون', 'یک', 'من'],
    answer: ['من', 'یک', 'ون', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Geländewagen',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Geländewagen',
    words: ['می‌بینم', 'جیپ', 'یک', 'من'],
    answer: ['من', 'یک', 'جیپ', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe eine Limousine',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe eine Limousine',
    words: ['می‌بینم', 'لیموزین', 'یک', 'من'],
    answer: ['من', 'یک', 'لیموزین', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Krankenwagen',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Krankenwagen',
    words: ['می‌بینم', 'آمبولانس', 'یک', 'من'],
    answer: ['من', 'یک', 'آمبولانس', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe ein Feuerwehrauto',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe ein Feuerwehrauto',
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