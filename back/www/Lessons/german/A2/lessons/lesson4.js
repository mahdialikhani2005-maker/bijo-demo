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

// ===== سوالات درس ۴ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Bräutigam" است؟',
    speak: 'der Bräutigam',
    options: [
      { text: 'der Bräutigam', image: '../../../media/a2/family/groom.png' },
      { text: 'der Schwager', image: '../../../media/a2/family/inlaw.png' },
      { text: 'der Stiefvater', image: '../../../media/a2/family/stepfather.png' },
      { text: 'die Stiefschwester', image: '../../../media/a2/family/stepsister.png' }
    ],
    answer: 'der Bräutigam'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Schwager" است؟',
    speak: 'der Schwager',
    options: [
      { text: 'der Bräutigam', image: '../../../media/a2/family/groom.png' },
      { text: 'der Schwager', image: '../../../media/a2/family/inlaw.png' },
      { text: 'die Stiefmutter', image: '../../../media/a2/family/stepmother.png' },
      { text: 'der Stiefvater', image: '../../../media/a2/family/stepfather.png' }
    ],
    answer: 'der Schwager'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Stiefvater" است؟',
    speak: 'der Stiefvater',
    options: [
      { text: 'die Stiefschwester', image: '../../../media/a2/family/stepsister.png' },
      { text: 'der Bräutigam', image: '../../../media/a2/family/groom.png' },
      { text: 'der Stiefvater', image: '../../../media/a2/family/stepfather.png' },
      { text: 'der Schwager', image: '../../../media/a2/family/inlaw.png' }
    ],
    answer: 'der Stiefvater'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Stiefmutter" است؟',
    speak: 'die Stiefmutter',
    options: [
      { text: 'der Schwager', image: '../../../media/a2/family/inlaw.png' },
      { text: 'die Stiefmutter', image: '../../../media/a2/family/stepmother.png' },
      { text: 'die Stiefschwester', image: '../../../media/a2/family/stepsister.png' },
      { text: 'der Bräutigam', image: '../../../media/a2/family/groom.png' }
    ],
    answer: 'die Stiefmutter'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Stiefschwester" است؟',
    speak: 'die Stiefschwester',
    options: [
      { text: 'der Bräutigam', image: '../../../media/a2/family/groom.png' },
      { text: 'der Stiefvater', image: '../../../media/a2/family/stepfather.png' },
      { text: 'die Stiefschwester', image: '../../../media/a2/family/stepsister.png' },
      { text: 'die Stiefmutter', image: '../../../media/a2/family/stepmother.png' }
    ],
    answer: 'die Stiefschwester'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/groom.png',
    options: ['der Bräutigam', 'der Schwager', 'der Stiefvater', 'die Stiefschwester'],
    answer: 'der Bräutigam'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/inlaw.png',
    options: ['der Bräutigam', 'der Schwager', 'die Stiefmutter', 'der Stiefvater'],
    answer: 'der Schwager'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepfather.png',
    options: ['die Stiefschwester', 'der Bräutigam', 'der Stiefvater', 'der Schwager'],
    answer: 'der Stiefvater'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepmother.png',
    options: ['der Schwager', 'die Stiefmutter', 'die Stiefschwester', 'der Bräutigam'],
    answer: 'die Stiefmutter'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepsister.png',
    options: ['der Bräutigam', 'der Stiefvater', 'die Stiefschwester', 'die Stiefmutter'],
    answer: 'die Stiefschwester'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Bräutigam',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bräutigam', 'der Schwager', 'der Stiefvater', 'die Stiefschwester'],
    answer: 'der Bräutigam'
  },
  {
    type: 'audio',
    speak: 'der Schwager',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bräutigam', 'der Schwager', 'die Stiefmutter', 'der Stiefvater'],
    answer: 'der Schwager'
  },
  {
    type: 'audio',
    speak: 'der Stiefvater',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Stiefschwester', 'der Bräutigam', 'der Stiefvater', 'der Schwager'],
    answer: 'der Stiefvater'
  },
  {
    type: 'audio',
    speak: 'die Stiefmutter',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Schwager', 'die Stiefmutter', 'die Stiefschwester', 'der Bräutigam'],
    answer: 'die Stiefmutter'
  },
  {
    type: 'audio',
    speak: 'die Stiefschwester',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Bräutigam', 'der Stiefvater', 'die Stiefschwester', 'die Stiefmutter'],
    answer: 'die Stiefschwester'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Bräutigam',
    image: '../../../media/a2/family/groom.png',
    meaning: 'داماد'
  },
  {
    type: 'speak',
    word: 'der Schwager',
    image: '../../../media/a2/family/inlaw.png',
    meaning: 'خویشاوند سببی'
  },
  {
    type: 'speak',
    word: 'der Stiefvater',
    image: '../../../media/a2/family/stepfather.png',
    meaning: 'پدرخوانده'
  },
  {
    type: 'speak',
    word: 'die Stiefmutter',
    image: '../../../media/a2/family/stepmother.png',
    meaning: 'مادرخوانده'
  },
  {
    type: 'speak',
    word: 'die Stiefschwester',
    image: '../../../media/a2/family/stepsister.png',
    meaning: 'خواهر ناتنی'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Das ist der Bräutigam',
    question: 'جمله آلمانی را بساز:',
    text: 'این داماد است',
    words: ['Bräutigam', 'der', 'ist', 'Das'],
    answer: ['Das', 'ist', 'der', 'Bräutigam']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Schwager',
    question: 'جمله آلمانی را بساز:',
    text: 'این خویشاوند سببی من است',
    words: ['Schwager', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Schwager']
  },
  {
    type: 'build-de',
    speak: 'Das ist mein Stiefvater',
    question: 'جمله آلمانی را بساز:',
    text: 'این پدرخوانده من است',
    words: ['Stiefvater', 'mein', 'ist', 'Das'],
    answer: ['Das', 'ist', 'mein', 'Stiefvater']
  },
  {
    type: 'build-de',
    speak: 'Das ist meine Stiefmutter',
    question: 'جمله آلمانی را بساز:',
    text: 'این مادرخوانده من است',
    words: ['Stiefmutter', 'meine', 'ist', 'Das'],
    answer: ['Das', 'ist', 'meine', 'Stiefmutter']
  },
  {
    type: 'build-de',
    speak: 'Das ist meine Stiefschwester',
    question: 'جمله آلمانی را بساز:',
    text: 'این خواهر ناتنی من است',
    words: ['Stiefschwester', 'meine', 'ist', 'Das'],
    answer: ['Das', 'ist', 'meine', 'Stiefschwester']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Das ist der Bräutigam',
    question: 'ترجمه را بساز:',
    text: 'Das ist der Bräutigam',
    words: ['است', 'داماد', 'این'],
    answer: ['این', 'داماد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Schwager',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Schwager',
    words: ['است', 'خویشاوند سببی', 'من', 'این'],
    answer: ['این', 'خویشاوند سببی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist mein Stiefvater',
    question: 'ترجمه را بساز:',
    text: 'Das ist mein Stiefvater',
    words: ['است', 'پدرخوانده', 'من', 'این'],
    answer: ['این', 'پدرخوانده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist meine Stiefmutter',
    question: 'ترجمه را بساز:',
    text: 'Das ist meine Stiefmutter',
    words: ['است', 'مادرخوانده', 'من', 'این'],
    answer: ['این', 'مادرخوانده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Das ist meine Stiefschwester',
    question: 'ترجمه را بساز:',
    text: 'Das ist meine Stiefschwester',
    words: ['است', 'خواهر ناتنی', 'من', 'این'],
    answer: ['این', 'خواهر ناتنی', 'من', 'است']
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