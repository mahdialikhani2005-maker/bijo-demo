let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
  recognition.lang = 'es-ES';
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

// ===== سوالات درس ۵۲ - اسپانیایی به فارسی (تجهیزات سفر) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la mochila" است؟',
    speak: 'la mochila',
    options: [
      { text: 'la mochila', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la tienda de campaña', image: '../../../media/a2/travel/tent.png' },
      { text: 'la brújula', image: '../../../media/a2/travel/compass.png' },
      { text: 'los prismáticos', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'la mochila'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la tienda de campaña" است؟',
    speak: 'la tienda de campaña',
    options: [
      { text: 'la mochila', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la tienda de campaña', image: '../../../media/a2/travel/tent.png' },
      { text: 'la crema solar', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'la brújula', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: 'la tienda de campaña'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la brújula" است؟',
    speak: 'la brújula',
    options: [
      { text: 'los prismáticos', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'la mochila', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la brújula', image: '../../../media/a2/travel/compass.png' },
      { text: 'la tienda de campaña', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'la brújula'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "los prismáticos" است؟',
    speak: 'los prismáticos',
    options: [
      { text: 'la mochila', image: '../../../media/a2/travel/backpack.png' },
      { text: 'los prismáticos', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'la tienda de campaña', image: '../../../media/a2/travel/tent.png' },
      { text: 'la crema solar', image: '../../../media/a2/travel/sunscreen.png' }
    ],
    answer: 'los prismáticos'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la crema solar" است؟',
    speak: 'la crema solar',
    options: [
      { text: 'la brújula', image: '../../../media/a2/travel/compass.png' },
      { text: 'la crema solar', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'los prismáticos', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'la mochila', image: '../../../media/a2/travel/backpack.png' }
    ],
    answer: 'la crema solar'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['la mochila', 'la tienda de campaña', 'la brújula', 'los prismáticos'],
    answer: 'la mochila'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['la mochila', 'la tienda de campaña', 'la crema solar', 'la brújula'],
    answer: 'la tienda de campaña'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['los prismáticos', 'la mochila', 'la brújula', 'la tienda de campaña'],
    answer: 'la brújula'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['la mochila', 'los prismáticos', 'la tienda de campaña', 'la crema solar'],
    answer: 'los prismáticos'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['la brújula', 'la crema solar', 'los prismáticos', 'la mochila'],
    answer: 'la crema solar'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la mochila',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la mochila', 'la tienda de campaña', 'la brújula', 'los prismáticos'],
    answer: 'la mochila'
  },
  {
    type: 'audio',
    speak: 'la tienda de campaña',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la mochila', 'la tienda de campaña', 'la crema solar', 'la brújula'],
    answer: 'la tienda de campaña'
  },
  {
    type: 'audio',
    speak: 'la brújula',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los prismáticos', 'la mochila', 'la brújula', 'la tienda de campaña'],
    answer: 'la brújula'
  },
  {
    type: 'audio',
    speak: 'los prismáticos',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la mochila', 'los prismáticos', 'la tienda de campaña', 'la crema solar'],
    answer: 'los prismáticos'
  },
  {
    type: 'audio',
    speak: 'la crema solar',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la brújula', 'la crema solar', 'los prismáticos', 'la mochila'],
    answer: 'la crema solar'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la mochila',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: 'la tienda de campaña',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: 'la brújula',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: 'los prismáticos',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: 'la crema solar',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es una mochila',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کوله پشتی است',
    words: ['mochila', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'mochila']
  },
  {
    type: 'build-es',
    speak: 'Esto es una tienda de campaña',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک چادر است',
    words: ['tienda', 'de', 'campaña', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'tienda', 'de', 'campaña']
  },
  {
    type: 'build-es',
    speak: 'Esto es una brújula',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک قطب‌نما است',
    words: ['brújula', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'brújula']
  },
  {
    type: 'build-es',
    speak: 'Esto son prismáticos',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این دوربین دوچشمی است',
    words: ['prismáticos', 'son', 'Esto'],
    answer: ['Esto', 'son', 'prismáticos']
  },
  {
    type: 'build-es',
    speak: 'Esto es una crema solar',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کرم ضدآفتاب است',
    words: ['crema', 'solar', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'crema', 'solar']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es una mochila',
    question: 'ترجمه را بساز:',
    text: 'Esto es una mochila',
    words: ['است', 'کوله پشتی', 'یک', 'این'],
    answer: ['این', 'یک', 'کوله پشتی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una tienda de campaña',
    question: 'ترجمه را بساز:',
    text: 'Esto es una tienda de campaña',
    words: ['است', 'چادر', 'یک', 'این'],
    answer: ['این', 'یک', 'چادر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una brújula',
    question: 'ترجمه را بساز:',
    text: 'Esto es una brújula',
    words: ['است', 'قطب‌نما', 'یک', 'این'],
    answer: ['این', 'یک', 'قطب‌نما', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto son prismáticos',
    question: 'ترجمه را بساز:',
    text: 'Esto son prismáticos',
    words: ['است', 'دوربین دوچشمی', 'این'],
    answer: ['این', 'دوربین دوچشمی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una crema solar',
    question: 'ترجمه را بساز:',
    text: 'Esto es una crema solar',
    words: ['است', 'کرم ضدآفتاب', 'یک', 'این'],
    answer: ['این', 'یک', 'کرم ضدآفتاب', 'است']
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

  // ===== بخش BUILD ES / FA =====
  if (q.type === 'build-es' || q.type === 'build-fa') {
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

    if (q.type === 'build-es') {
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