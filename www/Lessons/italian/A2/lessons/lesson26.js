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

// ===== سوالات درس ۲۶ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la cintura" است؟',
    speak: 'la cintura',
    options: [
      { text: 'la cintura', image: '../../../media/a2/clothes/belt.png' },
      { text: 'la sciarpa', image: '../../../media/a2/clothes/scarf.png' },
      { text: 'i guanti', image: '../../../media/a2/clothes/gloves.png' },
      { text: 'la collana', image: '../../../media/a2/clothes/necklace.png' }
    ],
    answer: 'la cintura'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la sciarpa" است؟',
    speak: 'la sciarpa',
    options: [
      { text: 'la cintura', image: '../../../media/a2/clothes/belt.png' },
      { text: 'la sciarpa', image: '../../../media/a2/clothes/scarf.png' },
      { text: 'l\'orologio', image: '../../../media/a2/clothes/watch.png' },
      { text: 'i guanti', image: '../../../media/a2/clothes/gloves.png' }
    ],
    answer: 'la sciarpa'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "i guanti" است؟',
    speak: 'i guanti',
    options: [
      { text: 'la collana', image: '../../../media/a2/clothes/necklace.png' },
      { text: 'la cintura', image: '../../../media/a2/clothes/belt.png' },
      { text: 'i guanti', image: '../../../media/a2/clothes/gloves.png' },
      { text: 'la sciarpa', image: '../../../media/a2/clothes/scarf.png' }
    ],
    answer: 'i guanti'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'orologio" است؟',
    speak: 'l\'orologio',
    options: [
      { text: 'i guanti', image: '../../../media/a2/clothes/gloves.png' },
      { text: 'l\'orologio', image: '../../../media/a2/clothes/watch.png' },
      { text: 'la collana', image: '../../../media/a2/clothes/necklace.png' },
      { text: 'la cintura', image: '../../../media/a2/clothes/belt.png' }
    ],
    answer: 'l\'orologio'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la collana" است؟',
    speak: 'la collana',
    options: [
      { text: 'la cintura', image: '../../../media/a2/clothes/belt.png' },
      { text: 'la sciarpa', image: '../../../media/a2/clothes/scarf.png' },
      { text: 'la collana', image: '../../../media/a2/clothes/necklace.png' },
      { text: 'l\'orologio', image: '../../../media/a2/clothes/watch.png' }
    ],
    answer: 'la collana'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/belt.png',
    options: ['la cintura', 'la sciarpa', 'i guanti', 'l\'orologio'],
    answer: 'la cintura'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/scarf.png',
    options: ['la cintura', 'la sciarpa', 'la collana', 'i guanti'],
    answer: 'la sciarpa'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/gloves.png',
    options: ['la collana', 'la cintura', 'i guanti', 'la sciarpa'],
    answer: 'i guanti'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/watch.png',
    options: ['i guanti', 'l\'orologio', 'la collana', 'la cintura'],
    answer: 'l\'orologio'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/necklace.png',
    options: ['la cintura', 'la sciarpa', 'la collana', 'l\'orologio'],
    answer: 'la collana'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la cintura',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la cintura', 'la sciarpa', 'i guanti', 'l\'orologio'],
    answer: 'la cintura'
  },
  {
    type: 'audio',
    speak: 'la sciarpa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la cintura', 'la sciarpa', 'la collana', 'i guanti'],
    answer: 'la sciarpa'
  },
  {
    type: 'audio',
    speak: 'i guanti',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la collana', 'la cintura', 'i guanti', 'la sciarpa'],
    answer: 'i guanti'
  },
  {
    type: 'audio',
    speak: 'l\'orologio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i guanti', 'l\'orologio', 'la collana', 'la cintura'],
    answer: 'l\'orologio'
  },
  {
    type: 'audio',
    speak: 'la collana',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la cintura', 'la sciarpa', 'la collana', 'l\'orologio'],
    answer: 'la collana'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la cintura',
    image: '../../../media/a2/clothes/belt.png',
    meaning: 'کمربند'
  },
  {
    type: 'speak',
    word: 'la sciarpa',
    image: '../../../media/a2/clothes/scarf.png',
    meaning: 'شال'
  },
  {
    type: 'speak',
    word: 'i guanti',
    image: '../../../media/a2/clothes/gloves.png',
    meaning: 'دستکش'
  },
  {
    type: 'speak',
    word: 'l\'orologio',
    image: '../../../media/a2/clothes/watch.png',
    meaning: 'ساعت مچی'
  },
  {
    type: 'speak',
    word: 'la collana',
    image: '../../../media/a2/clothes/necklace.png',
    meaning: 'گردنبند'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Indosso la cintura',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من کمربند می‌بندم',
    words: ['cintura', 'la', 'Indosso'],
    answer: ['Indosso', 'la', 'cintura']
  },
  {
    type: 'build-it',
    speak: 'Indosso la sciarpa',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من شال می‌پوشم',
    words: ['sciarpa', 'la', 'Indosso'],
    answer: ['Indosso', 'la', 'sciarpa']
  },
  {
    type: 'build-it',
    speak: 'Indosso i guanti',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من دستکش می‌پوشم',
    words: ['guanti', 'i', 'Indosso'],
    answer: ['Indosso', 'i', 'guanti']
  },
  {
    type: 'build-it',
    speak: 'Indosso l\'orologio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من ساعت مچی می‌بندم',
    words: ['orologio', 'l\'', 'Indosso'],
    answer: ['Indosso', 'l\'', 'orologio']
  },
  {
    type: 'build-it',
    speak: 'Indosso la collana',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من گردنبند می‌بندم',
    words: ['collana', 'la', 'Indosso'],
    answer: ['Indosso', 'la', 'collana']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Indosso la cintura',
    question: 'ترجمه را بساز:',
    text: 'Indosso la cintura',
    words: ['می‌بندم', 'کمربند', 'من'],
    answer: ['من', 'کمربند', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso la sciarpa',
    question: 'ترجمه را بساز:',
    text: 'Indosso la sciarpa',
    words: ['می‌پوشم', 'شال', 'من'],
    answer: ['من', 'شال', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso i guanti',
    question: 'ترجمه را بساز:',
    text: 'Indosso i guanti',
    words: ['می‌پوشم', 'دستکش', 'من'],
    answer: ['من', 'دستکش', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso l\'orologio',
    question: 'ترجمه را بساز:',
    text: 'Indosso l\'orologio',
    words: ['می‌بندم', 'ساعت مچی', 'من'],
    answer: ['من', 'ساعت مچی', 'می‌بندم']
  },
  {
    type: 'build-fa',
    speak: 'Indosso la collana',
    question: 'ترجمه را بساز:',
    text: 'Indosso la collana',
    words: ['می‌بندم', 'گردنبند', 'من'],
    answer: ['من', 'گردنبند', 'می‌بندم']
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