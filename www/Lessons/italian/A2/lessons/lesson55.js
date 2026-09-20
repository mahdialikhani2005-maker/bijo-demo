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

// ===== سوالات درس ۵۵ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il visto" است؟',
    speak: 'il visto',
    options: [
      { text: 'il visto', image: '../../../media/a2/travel/visa.png' },
      { text: 'la valuta', image: '../../../media/a2/travel/currency.png' },
      { text: 'la partenza', image: '../../../media/a2/travel/departure.png' },
      { text: 'l\'arrivo', image: '../../../media/a2/travel/arrival.png' }
    ],
    answer: 'il visto'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la valuta" است؟',
    speak: 'la valuta',
    options: [
      { text: 'il visto', image: '../../../media/a2/travel/visa.png' },
      { text: 'la valuta', image: '../../../media/a2/travel/currency.png' },
      { text: 'il cambio', image: '../../../media/a2/travel/exchange.png' },
      { text: 'la partenza', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'la valuta'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il cambio" است؟',
    speak: 'il cambio',
    options: [
      { text: 'l\'arrivo', image: '../../../media/a2/travel/arrival.png' },
      { text: 'il visto', image: '../../../media/a2/travel/visa.png' },
      { text: 'il cambio', image: '../../../media/a2/travel/exchange.png' },
      { text: 'la valuta', image: '../../../media/a2/travel/currency.png' }
    ],
    answer: 'il cambio'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la partenza" است؟',
    speak: 'la partenza',
    options: [
      { text: 'la valuta', image: '../../../media/a2/travel/currency.png' },
      { text: 'la partenza', image: '../../../media/a2/travel/departure.png' },
      { text: 'l\'arrivo', image: '../../../media/a2/travel/arrival.png' },
      { text: 'il visto', image: '../../../media/a2/travel/visa.png' }
    ],
    answer: 'la partenza'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'arrivo" است؟',
    speak: 'l\'arrivo',
    options: [
      { text: 'il visto', image: '../../../media/a2/travel/visa.png' },
      { text: 'il cambio', image: '../../../media/a2/travel/exchange.png' },
      { text: 'l\'arrivo', image: '../../../media/a2/travel/arrival.png' },
      { text: 'la partenza', image: '../../../media/a2/travel/departure.png' }
    ],
    answer: 'l\'arrivo'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/visa.png',
    options: ['il visto', 'la valuta', 'la partenza', 'l\'arrivo'],
    answer: 'il visto'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/currency.png',
    options: ['il visto', 'la valuta', 'il cambio', 'la partenza'],
    answer: 'la valuta'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/exchange.png',
    options: ['l\'arrivo', 'il visto', 'il cambio', 'la valuta'],
    answer: 'il cambio'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/departure.png',
    options: ['la valuta', 'la partenza', 'l\'arrivo', 'il visto'],
    answer: 'la partenza'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/arrival.png',
    options: ['il visto', 'il cambio', 'l\'arrivo', 'la partenza'],
    answer: 'l\'arrivo'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il visto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il visto', 'la valuta', 'la partenza', 'l\'arrivo'],
    answer: 'il visto'
  },
  {
    type: 'audio',
    speak: 'la valuta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il visto', 'la valuta', 'il cambio', 'la partenza'],
    answer: 'la valuta'
  },
  {
    type: 'audio',
    speak: 'il cambio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'arrivo', 'il visto', 'il cambio', 'la valuta'],
    answer: 'il cambio'
  },
  {
    type: 'audio',
    speak: 'la partenza',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la valuta', 'la partenza', 'l\'arrivo', 'il visto'],
    answer: 'la partenza'
  },
  {
    type: 'audio',
    speak: 'l\'arrivo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il visto', 'il cambio', 'l\'arrivo', 'la partenza'],
    answer: 'l\'arrivo'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il visto',
    image: '../../../media/a2/travel/visa.png',
    meaning: 'ویزا'
  },
  {
    type: 'speak',
    word: 'la valuta',
    image: '../../../media/a2/travel/currency.png',
    meaning: 'ارز'
  },
  {
    type: 'speak',
    word: 'il cambio',
    image: '../../../media/a2/travel/exchange.png',
    meaning: 'تبادل'
  },
  {
    type: 'speak',
    word: 'la partenza',
    image: '../../../media/a2/travel/departure.png',
    meaning: 'حرکت'
  },
  {
    type: 'speak',
    word: 'l\'arrivo',
    image: '../../../media/a2/travel/arrival.png',
    meaning: 'ورود'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Ho un visto',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک ویزا دارم',
    words: ['visto', 'un', 'Ho'],
    answer: ['Ho', 'un', 'visto']
  },
  {
    type: 'build-it',
    speak: 'Cambio la valuta',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من ارز عوض می‌کنم',
    words: ['valuta', 'la', 'Cambio'],
    answer: ['Cambio', 'la', 'valuta']
  },
  {
    type: 'build-it',
    speak: 'Faccio un cambio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک تبادل انجام می‌دهم',
    words: ['cambio', 'un', 'Faccio'],
    answer: ['Faccio', 'un', 'cambio']
  },
  {
    type: 'build-it',
    speak: 'La partenza è alle 8',
    question: 'جمله ایتالیایی را بساز:',
    text: 'حرکت ساعت ۸ است',
    words: ['partenza', 'La', '8', 'alle', 'è'],
    answer: ['La', 'partenza', 'è', 'alle', '8']
  },
  {
    type: 'build-it',
    speak: 'L\'arrivo è alle 10',
    question: 'جمله ایتالیایی را بساز:',
    text: 'ورود ساعت ۱۰ است',
    words: ['L\'arrivo', '10', 'alle', 'è'],
    answer: ['L\'arrivo', 'è', 'alle', '10']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ho un visto',
    question: 'ترجمه را بساز:',
    text: 'Ho un visto',
    words: ['دارم', 'ویزا', 'یک', 'من'],
    answer: ['من', 'یک', 'ویزا', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Cambio la valuta',
    question: 'ترجمه را بساز:',
    text: 'Cambio la valuta',
    words: ['می‌کنم', 'ارز', 'عوض', 'من'],
    answer: ['من', 'ارز', 'عوض', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Faccio un cambio',
    question: 'ترجمه را بساز:',
    text: 'Faccio un cambio',
    words: ['می‌کنم', 'تبادل', 'یک', 'انجام', 'من'],
    answer: ['من', 'یک', 'تبادل', 'انجام', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'La partenza è alle 8',
    question: 'ترجمه را بساز:',
    text: 'La partenza è alle 8',
    words: ['است', 'ساعت', '۸', 'حرکت'],
    answer: ['حرکت', 'ساعت', '۸', 'است']
  },
  {
    type: 'build-fa',
    speak: 'L\'arrivo è alle 10',
    question: 'ترجمه را بساز:',
    text: 'L\'arrivo è alle 10',
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