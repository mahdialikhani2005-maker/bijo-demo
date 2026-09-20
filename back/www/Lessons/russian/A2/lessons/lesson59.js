let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
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
  recognition.lang = 'ru-RU';
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

// ===== سوالات درس ۵۹ - روسی به فارسی (اینترنت) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "загрузка" است؟',
    speak: 'загрузка',
    options: [
      { text: 'загрузка', image: '../../../media/a2/technology/download.png' },
      { text: 'выгрузка', image: '../../../media/a2/technology/upload.png' },
      { text: 'потоковое вещание', image: '../../../media/a2/technology/stream.png' },
      { text: 'видео', image: '../../../media/a2/technology/video.png' }
    ],
    answer: 'загрузка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "выгрузка" است؟',
    speak: 'выгрузка',
    options: [
      { text: 'загрузка', image: '../../../media/a2/technology/download.png' },
      { text: 'выгрузка', image: '../../../media/a2/technology/upload.png' },
      { text: 'аудио', image: '../../../media/a2/technology/audio.png' },
      { text: 'видео', image: '../../../media/a2/technology/video.png' }
    ],
    answer: 'выгрузка'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "потоковое вещание" است؟',
    speak: 'потоковое вещание',
    options: [
      { text: 'загрузка', image: '../../../media/a2/technology/download.png' },
      { text: 'выгрузка', image: '../../../media/a2/technology/upload.png' },
      { text: 'потоковое вещание', image: '../../../media/a2/technology/stream.png' },
      { text: 'аудио', image: '../../../media/a2/technology/audio.png' }
    ],
    answer: 'потоковое вещание'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "видео" است؟',
    speak: 'видео',
    options: [
      { text: 'загрузка', image: '../../../media/a2/technology/download.png' },
      { text: 'видео', image: '../../../media/a2/technology/video.png' },
      { text: 'потоковое вещание', image: '../../../media/a2/technology/stream.png' },
      { text: 'аудио', image: '../../../media/a2/technology/audio.png' }
    ],
    answer: 'видео'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "аудио" است؟',
    speak: 'аудио',
    options: [
      { text: 'загрузка', image: '../../../media/a2/technology/download.png' },
      { text: 'выгрузка', image: '../../../media/a2/technology/upload.png' },
      { text: 'видео', image: '../../../media/a2/technology/video.png' },
      { text: 'аудио', image: '../../../media/a2/technology/audio.png' }
    ],
    answer: 'аудио'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/download.png',
    options: ['загрузка', 'выгрузка', 'потоковое вещание', 'видео'],
    answer: 'загрузка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/upload.png',
    options: ['загрузка', 'выгрузка', 'аудио', 'видео'],
    answer: 'выгрузка'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/stream.png',
    options: ['загрузка', 'выгрузка', 'потоковое вещание', 'аудио'],
    answer: 'потоковое вещание'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/video.png',
    options: ['загрузка', 'видео', 'потоковое вещание', 'аудио'],
    answer: 'видео'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/audio.png',
    options: ['загрузка', 'выгрузка', 'видео', 'аудио'],
    answer: 'аудио'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'загрузка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['загрузка', 'выгрузка', 'потоковое вещание', 'видео'],
    answer: 'загрузка'
  },
  {
    type: 'audio',
    speak: 'выгрузка',
    question: 'کدام کلمه را شنیدی؟',
    options: ['загрузка', 'выгрузка', 'аудио', 'видео'],
    answer: 'выгрузка'
  },
  {
    type: 'audio',
    speak: 'потоковое вещание',
    question: 'کدام کلمه را شنیدی؟',
    options: ['загрузка', 'выгрузка', 'потоковое вещание', 'аудио'],
    answer: 'потоковое вещание'
  },
  {
    type: 'audio',
    speak: 'видео',
    question: 'کدام کلمه را شنیدی؟',
    options: ['загрузка', 'видео', 'потоковое вещание', 'аудио'],
    answer: 'видео'
  },
  {
    type: 'audio',
    speak: 'аудио',
    question: 'کدام کلمه را شنیدی؟',
    options: ['загрузка', 'выгрузка', 'видео', 'аудио'],
    answer: 'аудио'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'загрузка',
    image: '../../../media/a2/technology/download.png',
    meaning: 'دانلود'
  },
  {
    type: 'speak',
    word: 'выгрузка',
    image: '../../../media/a2/technology/upload.png',
    meaning: 'آپلود'
  },
  {
    type: 'speak',
    word: 'потоковое вещание',
    image: '../../../media/a2/technology/stream.png',
    meaning: 'پخش زنده'
  },
  {
    type: 'speak',
    word: 'видео',
    image: '../../../media/a2/technology/video.png',
    meaning: 'ویدیو'
  },
  {
    type: 'speak',
    word: 'аудио',
    image: '../../../media/a2/technology/audio.png',
    meaning: 'صوت'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это загрузка',
    question: 'جمله روسی را بساز:',
    text: 'این دانلود است',
    words: ['загрузка', 'Это'],
    answer: ['Это', 'загрузка']
  },
  {
    type: 'build-ru',
    speak: 'Это выгрузка',
    question: 'جمله روسی را بساز:',
    text: 'این آپلود است',
    words: ['выгрузка', 'Это'],
    answer: ['Это', 'выгрузка']
  },
  {
    type: 'build-ru',
    speak: 'Это потоковое вещание',
    question: 'جمله روسی را بساز:',
    text: 'این پخش زنده است',
    words: ['потоковое', 'вещание', 'Это'],
    answer: ['Это', 'потоковое', 'вещание']
  },
  {
    type: 'build-ru',
    speak: 'Это видео',
    question: 'جمله روسی را بساز:',
    text: 'این ویدیو است',
    words: ['видео', 'Это'],
    answer: ['Это', 'видео']
  },
  {
    type: 'build-ru',
    speak: 'Это аудио',
    question: 'جمله روسی را بساز:',
    text: 'این صوت است',
    words: ['аудио', 'Это'],
    answer: ['Это', 'аудио']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это загрузка',
    question: 'ترجمه را بساز:',
    text: 'Это загрузка',
    words: ['است', 'دانلود', 'این'],
    answer: ['این', 'دانلود', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это выгрузка',
    question: 'ترجمه را بساز:',
    text: 'Это выгрузка',
    words: ['است', 'آپلود', 'این'],
    answer: ['این', 'آپلود', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это потоковое вещание',
    question: 'ترجمه را بساز:',
    text: 'Это потоковое вещание',
    words: ['است', 'پخش زنده', 'این'],
    answer: ['این', 'پخش زنده', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это видео',
    question: 'ترجمه را بساز:',
    text: 'Это видео',
    words: ['است', 'ویدیو', 'این'],
    answer: ['این', 'ویدیو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это аудио',
    question: 'ترجمه را بساز:',
    text: 'Это аудио',
    words: ['است', 'صوت', 'این'],
    answer: ['این', 'صوت', 'است']
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

  // ===== بخش BUILD RU / FA =====
  if (q.type === 'build-ru' || q.type === 'build-fa') {
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

    if (q.type === 'build-ru') {
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