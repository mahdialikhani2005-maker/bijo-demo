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

// ===== سوالات درس ۴۰ - اسپانیایی به فارسی (پدیده‌های جوی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el arcoíris" است؟',
    speak: 'el arcoíris',
    options: [
      { text: 'el arcoíris', image: '../../../media/a2/weather/rainbow.png' },
      { text: 'la brisa', image: '../../../media/a2/weather/breeze.png' },
      { text: 'la inundación', image: '../../../media/a2/weather/flood.png' },
      { text: 'la sequía', image: '../../../media/a2/weather/drought.png' }
    ],
    answer: 'el arcoíris'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la brisa" است؟',
    speak: 'la brisa',
    options: [
      { text: 'el arcoíris', image: '../../../media/a2/weather/rainbow.png' },
      { text: 'la brisa', image: '../../../media/a2/weather/breeze.png' },
      { text: 'el terremoto', image: '../../../media/a2/weather/earthquake.png' },
      { text: 'la inundación', image: '../../../media/a2/weather/flood.png' }
    ],
    answer: 'la brisa'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la inundación" است؟',
    speak: 'la inundación',
    options: [
      { text: 'la sequía', image: '../../../media/a2/weather/drought.png' },
      { text: 'el arcoíris', image: '../../../media/a2/weather/rainbow.png' },
      { text: 'la inundación', image: '../../../media/a2/weather/flood.png' },
      { text: 'la brisa', image: '../../../media/a2/weather/breeze.png' }
    ],
    answer: 'la inundación'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la sequía" است؟',
    speak: 'la sequía',
    options: [
      { text: 'el arcoíris', image: '../../../media/a2/weather/rainbow.png' },
      { text: 'la sequía', image: '../../../media/a2/weather/drought.png' },
      { text: 'la brisa', image: '../../../media/a2/weather/breeze.png' },
      { text: 'el terremoto', image: '../../../media/a2/weather/earthquake.png' }
    ],
    answer: 'la sequía'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el terremoto" است؟',
    speak: 'el terremoto',
    options: [
      { text: 'la inundación', image: '../../../media/a2/weather/flood.png' },
      { text: 'el terremoto', image: '../../../media/a2/weather/earthquake.png' },
      { text: 'la sequía', image: '../../../media/a2/weather/drought.png' },
      { text: 'el arcoíris', image: '../../../media/a2/weather/rainbow.png' }
    ],
    answer: 'el terremoto'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/rainbow.png',
    options: ['el arcoíris', 'la brisa', 'la inundación', 'la sequía'],
    answer: 'el arcoíris'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/breeze.png',
    options: ['el arcoíris', 'la brisa', 'el terremoto', 'la inundación'],
    answer: 'la brisa'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/flood.png',
    options: ['la sequía', 'el arcoíris', 'la inundación', 'la brisa'],
    answer: 'la inundación'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/drought.png',
    options: ['el arcoíris', 'la sequía', 'la brisa', 'el terremoto'],
    answer: 'la sequía'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/earthquake.png',
    options: ['la inundación', 'el terremoto', 'la sequía', 'el arcoíris'],
    answer: 'el terremoto'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el arcoíris',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el arcoíris', 'la brisa', 'la inundación', 'la sequía'],
    answer: 'el arcoíris'
  },
  {
    type: 'audio',
    speak: 'la brisa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el arcoíris', 'la brisa', 'el terremoto', 'la inundación'],
    answer: 'la brisa'
  },
  {
    type: 'audio',
    speak: 'la inundación',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la sequía', 'el arcoíris', 'la inundación', 'la brisa'],
    answer: 'la inundación'
  },
  {
    type: 'audio',
    speak: 'la sequía',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el arcoíris', 'la sequía', 'la brisa', 'el terremoto'],
    answer: 'la sequía'
  },
  {
    type: 'audio',
    speak: 'el terremoto',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la inundación', 'el terremoto', 'la sequía', 'el arcoíris'],
    answer: 'el terremoto'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el arcoíris',
    image: '../../../media/a2/weather/rainbow.png',
    meaning: 'رنگین‌کمان'
  },
  {
    type: 'speak',
    word: 'la brisa',
    image: '../../../media/a2/weather/breeze.png',
    meaning: 'نسیم'
  },
  {
    type: 'speak',
    word: 'la inundación',
    image: '../../../media/a2/weather/flood.png',
    meaning: 'سیل'
  },
  {
    type: 'speak',
    word: 'la sequía',
    image: '../../../media/a2/weather/drought.png',
    meaning: 'خشکسالی'
  },
  {
    type: 'speak',
    word: 'el terremoto',
    image: '../../../media/a2/weather/earthquake.png',
    meaning: 'زلزله'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un arcoíris',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک رنگین‌کمان است',
    words: ['arcoíris', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'arcoíris']
  },
  {
    type: 'build-es',
    speak: 'Esto es una brisa',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک نسیم است',
    words: ['brisa', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'brisa']
  },
  {
    type: 'build-es',
    speak: 'Esto es una inundación',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک سیل است',
    words: ['inundación', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'inundación']
  },
  {
    type: 'build-es',
    speak: 'Esto es una sequía',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک خشکسالی است',
    words: ['sequía', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'sequía']
  },
  {
    type: 'build-es',
    speak: 'Esto es un terremoto',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک زلزله است',
    words: ['terremoto', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'terremoto']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un arcoíris',
    question: 'ترجمه را بساز:',
    text: 'Esto es un arcoíris',
    words: ['است', 'رنگین‌کمان', 'یک', 'این'],
    answer: ['این', 'یک', 'رنگین‌کمان', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una brisa',
    question: 'ترجمه را بساز:',
    text: 'Esto es una brisa',
    words: ['است', 'نسیم', 'یک', 'این'],
    answer: ['این', 'یک', 'نسیم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una inundación',
    question: 'ترجمه را بساز:',
    text: 'Esto es una inundación',
    words: ['است', 'سیل', 'یک', 'این'],
    answer: ['این', 'یک', 'سیل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una sequía',
    question: 'ترجمه را بساز:',
    text: 'Esto es una sequía',
    words: ['است', 'خشکسالی', 'یک', 'این'],
    answer: ['این', 'یک', 'خشکسالی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un terremoto',
    question: 'ترجمه را بساز:',
    text: 'Esto es un terremoto',
    words: ['است', 'زلزله', 'یک', 'این'],
    answer: ['این', 'یک', 'زلزله', 'است']
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