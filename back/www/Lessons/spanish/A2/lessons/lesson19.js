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

// ===== سوالات درس ۱۹ - اسپانیایی به فارسی (حرفه‌ها ۴) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el científico" است؟',
    speak: 'el científico',
    options: [
      { text: 'el científico', image: '../../../media/a2/jobs/scientist.png' },
      { text: 'el profesor', image: '../../../media/a2/jobs/professor.png' },
      { text: 'el autor', image: '../../../media/a2/jobs/author.png' },
      { text: 'el poeta', image: '../../../media/a2/jobs/poet.png' }
    ],
    answer: 'el científico'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el profesor" است؟',
    speak: 'el profesor',
    options: [
      { text: 'el científico', image: '../../../media/a2/jobs/scientist.png' },
      { text: 'el profesor', image: '../../../media/a2/jobs/professor.png' },
      { text: 'el músico', image: '../../../media/a2/jobs/musician.png' },
      { text: 'el autor', image: '../../../media/a2/jobs/author.png' }
    ],
    answer: 'el profesor'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el autor" است؟',
    speak: 'el autor',
    options: [
      { text: 'el poeta', image: '../../../media/a2/jobs/poet.png' },
      { text: 'el científico', image: '../../../media/a2/jobs/scientist.png' },
      { text: 'el autor', image: '../../../media/a2/jobs/author.png' },
      { text: 'el profesor', image: '../../../media/a2/jobs/professor.png' }
    ],
    answer: 'el autor'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el poeta" است؟',
    speak: 'el poeta',
    options: [
      { text: 'el científico', image: '../../../media/a2/jobs/scientist.png' },
      { text: 'el poeta', image: '../../../media/a2/jobs/poet.png' },
      { text: 'el autor', image: '../../../media/a2/jobs/author.png' },
      { text: 'el músico', image: '../../../media/a2/jobs/musician.png' }
    ],
    answer: 'el poeta'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el músico" است؟',
    speak: 'el músico',
    options: [
      { text: 'el profesor', image: '../../../media/a2/jobs/professor.png' },
      { text: 'el músico', image: '../../../media/a2/jobs/musician.png' },
      { text: 'el poeta', image: '../../../media/a2/jobs/poet.png' },
      { text: 'el científico', image: '../../../media/a2/jobs/scientist.png' }
    ],
    answer: 'el músico'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/scientist.png',
    options: ['el científico', 'el profesor', 'el autor', 'el poeta'],
    answer: 'el científico'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/professor.png',
    options: ['el científico', 'el profesor', 'el músico', 'el autor'],
    answer: 'el profesor'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/author.png',
    options: ['el poeta', 'el científico', 'el autor', 'el profesor'],
    answer: 'el autor'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/poet.png',
    options: ['el científico', 'el poeta', 'el autor', 'el músico'],
    answer: 'el poeta'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/musician.png',
    options: ['el profesor', 'el músico', 'el poeta', 'el científico'],
    answer: 'el músico'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el científico',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el científico', 'el profesor', 'el autor', 'el poeta'],
    answer: 'el científico'
  },
  {
    type: 'audio',
    speak: 'el profesor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el científico', 'el profesor', 'el músico', 'el autor'],
    answer: 'el profesor'
  },
  {
    type: 'audio',
    speak: 'el autor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el poeta', 'el científico', 'el autor', 'el profesor'],
    answer: 'el autor'
  },
  {
    type: 'audio',
    speak: 'el poeta',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el científico', 'el poeta', 'el autor', 'el músico'],
    answer: 'el poeta'
  },
  {
    type: 'audio',
    speak: 'el músico',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el profesor', 'el músico', 'el poeta', 'el científico'],
    answer: 'el músico'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el científico',
    image: '../../../media/a2/jobs/scientist.png',
    meaning: 'دانشمند'
  },
  {
    type: 'speak',
    word: 'el profesor',
    image: '../../../media/a2/jobs/professor.png',
    meaning: 'استاد'
  },
  {
    type: 'speak',
    word: 'el autor',
    image: '../../../media/a2/jobs/author.png',
    meaning: 'نویسنده'
  },
  {
    type: 'speak',
    word: 'el poeta',
    image: '../../../media/a2/jobs/poet.png',
    meaning: 'شاعر'
  },
  {
    type: 'speak',
    word: 'el músico',
    image: '../../../media/a2/jobs/musician.png',
    meaning: 'نوازنده'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Él es científico',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او دانشمند است',
    words: ['científico', 'es', 'Él'],
    answer: ['Él', 'es', 'científico']
  },
  {
    type: 'build-es',
    speak: 'Él es profesor',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او استاد است',
    words: ['profesor', 'es', 'Él'],
    answer: ['Él', 'es', 'profesor']
  },
  {
    type: 'build-es',
    speak: 'Él es autor',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او نویسنده است',
    words: ['autor', 'es', 'Él'],
    answer: ['Él', 'es', 'autor']
  },
  {
    type: 'build-es',
    speak: 'Él es poeta',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او شاعر است',
    words: ['poeta', 'es', 'Él'],
    answer: ['Él', 'es', 'poeta']
  },
  {
    type: 'build-es',
    speak: 'Él es músico',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او نوازنده است',
    words: ['músico', 'es', 'Él'],
    answer: ['Él', 'es', 'músico']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Él es científico',
    question: 'ترجمه را بساز:',
    text: 'Él es científico',
    words: ['است', 'دانشمند', 'او'],
    answer: ['او', 'دانشمند', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es profesor',
    question: 'ترجمه را بساز:',
    text: 'Él es profesor',
    words: ['است', 'استاد', 'او'],
    answer: ['او', 'استاد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es autor',
    question: 'ترجمه را بساز:',
    text: 'Él es autor',
    words: ['است', 'نویسنده', 'او'],
    answer: ['او', 'نویسنده', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es poeta',
    question: 'ترجمه را بساز:',
    text: 'Él es poeta',
    words: ['است', 'شاعر', 'او'],
    answer: ['او', 'شاعر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es músico',
    question: 'ترجمه را بساز:',
    text: 'Él es músico',
    words: ['است', 'نوازنده', 'او'],
    answer: ['او', 'نوازنده', 'است']
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