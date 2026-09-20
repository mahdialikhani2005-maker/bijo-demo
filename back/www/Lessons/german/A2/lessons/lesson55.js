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

// ===== سوالات درس ۵۵ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "das Visum" است؟',
    speak: 'das Visum',
    options: [
      { text: 'das Visum', image: '../../../media/a2/travel/visa.png' },
      { text: 'die Währung', image: '../../../media/a2/travel/currency.png' },
      { text: 'der Abflug', image: '../../../media/a2/travel/departure.png' },
      { text: 'die Ankunft', image: '../../../media/a2/travel/arrival.png' }
    ],
    answer: 'das Visum'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Währung" است؟',
    speak: 'die Währung',
    options: [
      { text: 'das Visum', image: '../../../media/a2/travel/visa.png' },
      { text: 'die Währung', image: '../../../media/a2/travel/currency.png' },
      { text: 'der Umtausch', image: '../../../media/a2/travel/exchange.png' },
      { text: 'der Abflug', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'die Währung'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Umtausch" است؟',
    speak: 'der Umtausch',
    options: [
      { text: 'die Ankunft', image: '../../../media/a2/travel/arrival.png' },
      { text: 'das Visum', image: '../../../media/a2/travel/visa.png' },
      { text: 'der Umtausch', image: '../../../media/a2/travel/exchange.png' },
      { text: 'die Währung', image: '../../../media/a2/travel/currency.png' }
    ],
    answer: 'der Umtausch'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Abflug" است؟',
    speak: 'der Abflug',
    options: [
      { text: 'die Währung', image: '../../../media/a2/travel/currency.png' },
      { text: 'der Abflug', image: '../../../media/a2/travel/departure.png' },
      { text: 'die Ankunft', image: '../../../media/a2/travel/arrival.png' },
      { text: 'das Visum', image: '../../../media/a2/travel/visa.png' }
    ],
    answer: 'der Abflug'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Ankunft" است؟',
    speak: 'die Ankunft',
    options: [
      { text: 'das Visum', image: '../../../media/a2/travel/visa.png' },
      { text: 'der Umtausch', image: '../../../media/a2/travel/exchange.png' },
      { text: 'die Ankunft', image: '../../../media/a2/travel/arrival.png' },
      { text: 'der Abflug', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'die Ankunft'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/visa.png',
    options: ['das Visum', 'die Währung', 'der Abflug', 'die Ankunft'],
    answer: 'das Visum'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/currency.png',
    options: ['das Visum', 'die Währung', 'der Umtausch', 'der Abflug'],
    answer: 'die Währung'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/exchange.png',
    options: ['die Ankunft', 'das Visum', 'der Umtausch', 'die Währung'],
    answer: 'der Umtausch'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/departure.png',
    options: ['die Währung', 'der Abflug', 'die Ankunft', 'das Visum'],
    answer: 'der Abflug'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/arrival.png',
    options: ['das Visum', 'der Umtausch', 'die Ankunft', 'der Abflug'],
    answer: 'die Ankunft'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'das Visum',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Visum', 'die Währung', 'der Abflug', 'die Ankunft'],
    answer: 'das Visum'
  },
  {
    type: 'audio',
    speak: 'die Währung',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Visum', 'die Währung', 'der Umtausch', 'der Abflug'],
    answer: 'die Währung'
  },
  {
    type: 'audio',
    speak: 'der Umtausch',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Ankunft', 'das Visum', 'der Umtausch', 'die Währung'],
    answer: 'der Umtausch'
  },
  {
    type: 'audio',
    speak: 'der Abflug',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Währung', 'der Abflug', 'die Ankunft', 'das Visum'],
    answer: 'der Abflug'
  },
  {
    type: 'audio',
    speak: 'die Ankunft',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Visum', 'der Umtausch', 'die Ankunft', 'der Abflug'],
    answer: 'die Ankunft'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'das Visum',
    image: '../../../media/a2/travel/visa.png',
    meaning: 'ویزا'
  },
  {
    type: 'speak',
    word: 'die Währung',
    image: '../../../media/a2/travel/currency.png',
    meaning: 'ارز'
  },
  {
    type: 'speak',
    word: 'der Umtausch',
    image: '../../../media/a2/travel/exchange.png',
    meaning: 'تبادل'
  },
  {
    type: 'speak',
    word: 'der Abflug',
    image: '../../../media/a2/travel/departure.png',
    meaning: 'حرکت'
  },
  {
    type: 'speak',
    word: 'die Ankunft',
    image: '../../../media/a2/travel/arrival.png',
    meaning: 'ورود'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe ein Visum',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ویزا دارم',
    words: ['Visum', 'ein', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'ein', 'Visum']
  },
  {
    type: 'build-de',
    speak: 'Ich wechsle die Währung',
    question: 'جمله آلمانی را بساز:',
    text: 'من ارز عوض می‌کنم',
    words: ['Währung', 'die', 'wechsle', 'Ich'],
    answer: ['Ich', 'wechsle', 'die', 'Währung']
  },
  {
    type: 'build-de',
    speak: 'Ich mache einen Umtausch',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک تبادل انجام می‌دهم',
    words: ['Umtausch', 'einen', 'mache', 'Ich'],
    answer: ['Ich', 'mache', 'einen', 'Umtausch']
  },
  {
    type: 'build-de',
    speak: 'Der Abflug ist um 8 Uhr',
    question: 'جمله آلمانی را بساز:',
    text: 'حرکت ساعت ۸ است',
    words: ['Abflug', 'Der', 'Uhr', '8', 'um', 'ist'],
    answer: ['Der', 'Abflug', 'ist', 'um', '8', 'Uhr']
  },
  {
    type: 'build-de',
    speak: 'Die Ankunft ist um 10 Uhr',
    question: 'جمله آلمانی را بساز:',
    text: 'ورود ساعت ۱۰ است',
    words: ['Ankunft', 'Die', 'Uhr', '10', 'um', 'ist'],
    answer: ['Die', 'Ankunft', 'ist', 'um', '10', 'Uhr']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe ein Visum',
    question: 'ترجمه را بساز:',
    text: 'Ich habe ein Visum',
    words: ['دارم', 'ویزا', 'یک', 'من'],
    answer: ['من', 'یک', 'ویزا', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich wechsle die Währung',
    question: 'ترجمه را بساز:',
    text: 'Ich wechsle die Währung',
    words: ['می‌کنم', 'ارز', 'عوض', 'من'],
    answer: ['من', 'ارز', 'عوض', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ich mache einen Umtausch',
    question: 'ترجمه را بساز:',
    text: 'Ich mache einen Umtausch',
    words: ['می‌کنم', 'تبادل', 'یک', 'انجام', 'من'],
    answer: ['من', 'یک', 'تبادل', 'انجام', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Der Abflug ist um 8 Uhr',
    question: 'ترجمه را بساز:',
    text: 'Der Abflug ist um 8 Uhr',
    words: ['است', 'ساعت', '۸', 'حرکت'],
    answer: ['حرکت', 'ساعت', '۸', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Die Ankunft ist um 10 Uhr',
    question: 'ترجمه را بساز:',
    text: 'Die Ankunft ist um 10 Uhr',
    words: ['است', 'ساعت', '۱۰', 'ورود'],
    answer: ['ورود', 'ساعت', '۱۰', 'است']
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