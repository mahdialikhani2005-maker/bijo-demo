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

// ===== سوالات درس ۱۷ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Kellner" است؟',
    speak: 'der Kellner',
    options: [
      { text: 'der Kellner', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'die Kellnerin', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'der Friseur', image: '../../../media/a2/jobs/barber.png' },
      { text: 'der Metzger', image: '../../../media/a2/jobs/butcher.png' }
    ],
    answer: 'der Kellner'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Kellnerin" است؟',
    speak: 'die Kellnerin',
    options: [
      { text: 'der Kellner', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'die Kellnerin', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'der Schneider', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'der Friseur', image: '../../../media/a2/jobs/barber.png' }
    ],
    answer: 'die Kellnerin'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Friseur" است؟',
    speak: 'der Friseur',
    options: [
      { text: 'der Metzger', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'der Kellner', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'der Friseur', image: '../../../media/a2/jobs/barber.png' },
      { text: 'die Kellnerin', image: '../../../media/a2/jobs/waitress.png' }
    ],
    answer: 'der Friseur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Schneider" است؟',
    speak: 'der Schneider',
    options: [
      { text: 'die Kellnerin', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'der Schneider', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'der Metzger', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'der Kellner', image: '../../../media/a2/jobs/waiter.png' }
    ],
    answer: 'der Schneider'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Metzger" است؟',
    speak: 'der Metzger',
    options: [
      { text: 'der Kellner', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'der Friseur', image: '../../../media/a2/jobs/barber.png' },
      { text: 'der Metzger', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'der Schneider', image: '../../../media/a2/jobs/tailor.png' }
    ],
    answer: 'der Metzger'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waiter.png',
    options: ['der Kellner', 'die Kellnerin', 'der Friseur', 'der Metzger'],
    answer: 'der Kellner'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waitress.png',
    options: ['der Kellner', 'die Kellnerin', 'der Schneider', 'der Friseur'],
    answer: 'die Kellnerin'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/barber.png',
    options: ['der Metzger', 'der Kellner', 'der Friseur', 'die Kellnerin'],
    answer: 'der Friseur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/tailor.png',
    options: ['die Kellnerin', 'der Schneider', 'der Metzger', 'der Kellner'],
    answer: 'der Schneider'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/butcher.png',
    options: ['der Kellner', 'der Friseur', 'der Metzger', 'der Schneider'],
    answer: 'der Metzger'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Kellner',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kellner', 'die Kellnerin', 'der Friseur', 'der Metzger'],
    answer: 'der Kellner'
  },
  {
    type: 'audio',
    speak: 'die Kellnerin',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kellner', 'die Kellnerin', 'der Schneider', 'der Friseur'],
    answer: 'die Kellnerin'
  },
  {
    type: 'audio',
    speak: 'der Friseur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Metzger', 'der Kellner', 'der Friseur', 'die Kellnerin'],
    answer: 'der Friseur'
  },
  {
    type: 'audio',
    speak: 'der Schneider',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Kellnerin', 'der Schneider', 'der Metzger', 'der Kellner'],
    answer: 'der Schneider'
  },
  {
    type: 'audio',
    speak: 'der Metzger',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Kellner', 'der Friseur', 'der Metzger', 'der Schneider'],
    answer: 'der Metzger'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Kellner',
    image: '../../../media/a2/jobs/waiter.png',
    meaning: 'پیشخدمت'
  },
  {
    type: 'speak',
    word: 'die Kellnerin',
    image: '../../../media/a2/jobs/waitress.png',
    meaning: 'پیشخدمت (زن)'
  },
  {
    type: 'speak',
    word: 'der Friseur',
    image: '../../../media/a2/jobs/barber.png',
    meaning: 'آرایشگر'
  },
  {
    type: 'speak',
    word: 'der Schneider',
    image: '../../../media/a2/jobs/tailor.png',
    meaning: 'خیاط'
  },
  {
    type: 'speak',
    word: 'der Metzger',
    image: '../../../media/a2/jobs/butcher.png',
    meaning: 'قصاب'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich bin Kellner',
    question: 'جمله آلمانی را بساز:',
    text: 'من پیشخدمت هستم',
    words: ['Kellner', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'Kellner']
  },
  {
    type: 'build-de',
    speak: 'Ich bin Kellnerin',
    question: 'جمله آلمانی را بساز:',
    text: 'من پیشخدمت (زن) هستم',
    words: ['Kellnerin', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'Kellnerin']
  },
  {
    type: 'build-de',
    speak: 'Ich bin Friseur',
    question: 'جمله آلمانی را بساز:',
    text: 'من آرایشگر هستم',
    words: ['Friseur', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'Friseur']
  },
  {
    type: 'build-de',
    speak: 'Ich bin Schneider',
    question: 'جمله آلمانی را بساز:',
    text: 'من خیاط هستم',
    words: ['Schneider', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'Schneider']
  },
  {
    type: 'build-de',
    speak: 'Ich bin Metzger',
    question: 'جمله آلمانی را بساز:',
    text: 'من قصاب هستم',
    words: ['Metzger', 'bin', 'Ich'],
    answer: ['Ich', 'bin', 'Metzger']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich bin Kellner',
    question: 'ترجمه را بساز:',
    text: 'Ich bin Kellner',
    words: ['هستم', 'پیشخدمت', 'من'],
    answer: ['من', 'پیشخدمت', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin Kellnerin',
    question: 'ترجمه را بساز:',
    text: 'Ich bin Kellnerin',
    words: ['هستم', 'پیشخدمت (زن)', 'من'],
    answer: ['من', 'پیشخدمت (زن)', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin Friseur',
    question: 'ترجمه را بساز:',
    text: 'Ich bin Friseur',
    words: ['هستم', 'آرایشگر', 'من'],
    answer: ['من', 'آرایشگر', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin Schneider',
    question: 'ترجمه را بساز:',
    text: 'Ich bin Schneider',
    words: ['هستم', 'خیاط', 'من'],
    answer: ['من', 'خیاط', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Ich bin Metzger',
    question: 'ترجمه را بساز:',
    text: 'Ich bin Metzger',
    words: ['هستم', 'قصاب', 'من'],
    answer: ['من', 'قصاب', 'هستم']
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