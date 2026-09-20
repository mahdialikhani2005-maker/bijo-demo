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

// ===== سوالات درس ۲۱ - اسپانیایی به فارسی (نوشیدنی‌ها و غذا) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el zumo" است؟',
    speak: 'el zumo',
    options: [
      { text: 'el zumo', image: '../../../media/a2/food/juice.png' },
      { text: 'el café', image: '../../../media/a2/food/coffee.png' },
      { text: 'el té', image: '../../../media/a2/food/tea.png' },
      { text: 'la sopa', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'el zumo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el café" است؟',
    speak: 'el café',
    options: [
      { text: 'el zumo', image: '../../../media/a2/food/juice.png' },
      { text: 'el café', image: '../../../media/a2/food/coffee.png' },
      { text: 'la tarta', image: '../../../media/a2/food/cake.png' },
      { text: 'la sopa', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'el café'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el té" است؟',
    speak: 'el té',
    options: [
      { text: 'la tarta', image: '../../../media/a2/food/cake.png' },
      { text: 'el zumo', image: '../../../media/a2/food/juice.png' },
      { text: 'el té', image: '../../../media/a2/food/tea.png' },
      { text: 'el café', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'el té'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la sopa" است؟',
    speak: 'la sopa',
    options: [
      { text: 'el zumo', image: '../../../media/a2/food/juice.png' },
      { text: 'la sopa', image: '../../../media/a2/food/soup.png' },
      { text: 'el té', image: '../../../media/a2/food/tea.png' },
      { text: 'la tarta', image: '../../../media/a2/food/cake.png' }
    ],
    answer: 'la sopa'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la tarta" است؟',
    speak: 'la tarta',
    options: [
      { text: 'el café', image: '../../../media/a2/food/coffee.png' },
      { text: 'la tarta', image: '../../../media/a2/food/cake.png' },
      { text: 'la sopa', image: '../../../media/a2/food/soup.png' },
      { text: 'el zumo', image: '../../../media/a2/food/juice.png' }
    ],
    answer: 'la tarta'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/juice.png',
    options: ['el zumo', 'el café', 'el té', 'la sopa'],
    answer: 'el zumo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/coffee.png',
    options: ['el zumo', 'el café', 'la tarta', 'la sopa'],
    answer: 'el café'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/tea.png',
    options: ['la tarta', 'el zumo', 'el té', 'el café'],
    answer: 'el té'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/soup.png',
    options: ['el zumo', 'la sopa', 'el té', 'la tarta'],
    answer: 'la sopa'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cake.png',
    options: ['el café', 'la tarta', 'la sopa', 'el zumo'],
    answer: 'la tarta'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el zumo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el zumo', 'el café', 'el té', 'la sopa'],
    answer: 'el zumo'
  },
  {
    type: 'audio',
    speak: 'el café',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el zumo', 'el café', 'la tarta', 'la sopa'],
    answer: 'el café'
  },
  {
    type: 'audio',
    speak: 'el té',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tarta', 'el zumo', 'el té', 'el café'],
    answer: 'el té'
  },
  {
    type: 'audio',
    speak: 'la sopa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el zumo', 'la sopa', 'el té', 'la tarta'],
    answer: 'la sopa'
  },
  {
    type: 'audio',
    speak: 'la tarta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el café', 'la tarta', 'la sopa', 'el zumo'],
    answer: 'la tarta'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el zumo',
    image: '../../../media/a2/food/juice.png',
    meaning: 'آبمیوه'
  },
  {
    type: 'speak',
    word: 'el café',
    image: '../../../media/a2/food/coffee.png',
    meaning: 'قهوه'
  },
  {
    type: 'speak',
    word: 'el té',
    image: '../../../media/a2/food/tea.png',
    meaning: 'چای'
  },
  {
    type: 'speak',
    word: 'la sopa',
    image: '../../../media/a2/food/soup.png',
    meaning: 'سوپ'
  },
  {
    type: 'speak',
    word: 'la tarta',
    image: '../../../media/a2/food/cake.png',
    meaning: 'کیک'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto es un zumo',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک آبمیوه است',
    words: ['zumo', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'zumo']
  },
  {
    type: 'build-es',
    speak: 'Esto es un café',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک قهوه است',
    words: ['café', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'café']
  },
  {
    type: 'build-es',
    speak: 'Esto es un té',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک چای است',
    words: ['té', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'té']
  },
  {
    type: 'build-es',
    speak: 'Esto es una sopa',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک سوپ است',
    words: ['sopa', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'sopa']
  },
  {
    type: 'build-es',
    speak: 'Esto es una tarta',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک کیک است',
    words: ['tarta', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'tarta']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto es un zumo',
    question: 'ترجمه را بساز:',
    text: 'Esto es un zumo',
    words: ['است', 'آبمیوه', 'یک', 'این'],
    answer: ['این', 'یک', 'آبمیوه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un café',
    question: 'ترجمه را بساز:',
    text: 'Esto es un café',
    words: ['است', 'قهوه', 'یک', 'این'],
    answer: ['این', 'یک', 'قهوه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un té',
    question: 'ترجمه را بساز:',
    text: 'Esto es un té',
    words: ['است', 'چای', 'یک', 'این'],
    answer: ['این', 'یک', 'چای', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una sopa',
    question: 'ترجمه را بساز:',
    text: 'Esto es una sopa',
    words: ['است', 'سوپ', 'یک', 'این'],
    answer: ['این', 'یک', 'سوپ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una tarta',
    question: 'ترجمه را بساز:',
    text: 'Esto es una tarta',
    words: ['است', 'کیک', 'یک', 'این'],
    answer: ['این', 'یک', 'کیک', 'است']
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