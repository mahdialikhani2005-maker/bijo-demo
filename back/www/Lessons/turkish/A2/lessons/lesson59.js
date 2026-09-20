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

// ===== سوالات درس ۵۹ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Download" است؟',
    speak: 'der Download',
    options: [
      { text: 'der Download', image: '../../../media/a2/tech/download.png' },
      { text: 'der Upload', image: '../../../media/a2/tech/upload.png' },
      { text: 'der Stream', image: '../../../media/a2/tech/stream.png' },
      { text: 'das Video', image: '../../../media/a2/tech/video.png' }
    ],
    answer: 'der Download'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Upload" است؟',
    speak: 'der Upload',
    options: [
      { text: 'der Download', image: '../../../media/a2/tech/download.png' },
      { text: 'der Upload', image: '../../../media/a2/tech/upload.png' },
      { text: 'das Audio', image: '../../../media/a2/tech/audio.png' },
      { text: 'der Stream', image: '../../../media/a2/tech/stream.png' }
    ],
    answer: 'der Upload'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Stream" است؟',
    speak: 'der Stream',
    options: [
      { text: 'das Video', image: '../../../media/a2/tech/video.png' },
      { text: 'der Download', image: '../../../media/a2/tech/download.png' },
      { text: 'der Stream', image: '../../../media/a2/tech/stream.png' },
      { text: 'der Upload', image: '../../../media/a2/tech/upload.png' }
    ],
    answer: 'der Stream'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Video" است؟',
    speak: 'das Video',
    options: [
      { text: 'der Upload', image: '../../../media/a2/tech/upload.png' },
      { text: 'das Video', image: '../../../media/a2/tech/video.png' },
      { text: 'das Audio', image: '../../../media/a2/tech/audio.png' },
      { text: 'der Download', image: '../../../media/a2/tech/download.png' }
    ],
    answer: 'das Video'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Audio" است؟',
    speak: 'das Audio',
    options: [
      { text: 'der Download', image: '../../../media/a2/tech/download.png' },
      { text: 'der Stream', image: '../../../media/a2/tech/stream.png' },
      { text: 'das Audio', image: '../../../media/a2/tech/audio.png' },
      { text: 'das Video', image: '../../../media/a2/tech/video.png' }
    ],
    answer: 'das Audio'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/download.png',
    options: ['der Download', 'der Upload', 'der Stream', 'das Video'],
    answer: 'der Download'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/upload.png',
    options: ['der Download', 'der Upload', 'das Audio', 'der Stream'],
    answer: 'der Upload'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/stream.png',
    options: ['das Video', 'der Download', 'der Stream', 'der Upload'],
    answer: 'der Stream'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/video.png',
    options: ['der Upload', 'das Video', 'das Audio', 'der Download'],
    answer: 'das Video'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/audio.png',
    options: ['der Download', 'der Stream', 'das Audio', 'das Video'],
    answer: 'das Audio'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Download',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Download', 'der Upload', 'der Stream', 'das Video'],
    answer: 'der Download'
  },
  {
    type: 'audio',
    speak: 'der Upload',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Download', 'der Upload', 'das Audio', 'der Stream'],
    answer: 'der Upload'
  },
  {
    type: 'audio',
    speak: 'der Stream',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Video', 'der Download', 'der Stream', 'der Upload'],
    answer: 'der Stream'
  },
  {
    type: 'audio',
    speak: 'das Video',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Upload', 'das Video', 'das Audio', 'der Download'],
    answer: 'das Video'
  },
  {
    type: 'audio',
    speak: 'das Audio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Download', 'der Stream', 'das Audio', 'das Video'],
    answer: 'das Audio'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Download',
    image: '../../../media/a2/tech/download.png',
    meaning: 'دانلود'
  },
  {
    type: 'speak',
    word: 'der Upload',
    image: '../../../media/a2/tech/upload.png',
    meaning: 'آپلود'
  },
  {
    type: 'speak',
    word: 'der Stream',
    image: '../../../media/a2/tech/stream.png',
    meaning: 'پخش زنده'
  },
  {
    type: 'speak',
    word: 'das Video',
    image: '../../../media/a2/tech/video.png',
    meaning: 'ویدیو'
  },
  {
    type: 'speak',
    word: 'das Audio',
    image: '../../../media/a2/tech/audio.png',
    meaning: 'صوت'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich mache einen Download',
    question: 'جمله آلمانی را بساز:',
    text: 'من دانلود می‌کنم',
    words: ['Download', 'einen', 'mache', 'Ich'],
    answer: ['Ich', 'mache', 'einen', 'Download']
  },
  {
    type: 'build-de',
    speak: 'Ich mache einen Upload',
    question: 'جمله آلمانی را بساز:',
    text: 'من آپلود می‌کنم',
    words: ['Upload', 'einen', 'mache', 'Ich'],
    answer: ['Ich', 'mache', 'einen', 'Upload']
  },
  {
    type: 'build-de',
    speak: 'Ich schaue einen Stream',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک پخش زنده می‌بینم',
    words: ['Stream', 'einen', 'schaue', 'Ich'],
    answer: ['Ich', 'schaue', 'einen', 'Stream']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe ein Video',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک ویدیو می‌بینم',
    words: ['Video', 'ein', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'ein', 'Video']
  },
  {
    type: 'build-de',
    speak: 'Ich höre Audio',
    question: 'جمله آلمانی را بساز:',
    text: 'من صوت گوش می‌دهم',
    words: ['Audio', 'höre', 'Ich'],
    answer: ['Ich', 'höre', 'Audio']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich mache einen Download',
    question: 'ترجمه را بساز:',
    text: 'Ich mache einen Download',
    words: ['می‌کنم', 'دانلود', 'یک', 'من'],
    answer: ['من', 'یک', 'دانلود', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ich mache einen Upload',
    question: 'ترجمه را بساز:',
    text: 'Ich mache einen Upload',
    words: ['می‌کنم', 'آپلود', 'یک', 'من'],
    answer: ['من', 'یک', 'آپلود', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ich schaue einen Stream',
    question: 'ترجمه را بساز:',
    text: 'Ich schaue einen Stream',
    words: ['می‌بینم', 'پخش زنده', 'یک', 'من'],
    answer: ['من', 'یک', 'پخش زنده', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe ein Video',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe ein Video',
    words: ['می‌بینم', 'ویدیو', 'یک', 'من'],
    answer: ['من', 'یک', 'ویدیو', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich höre Audio',
    question: 'ترجمه را بساز:',
    text: 'Ich höre Audio',
    words: ['می‌دهم', 'صوت', 'گوش', 'من'],
    answer: ['من', 'صوت', 'گوش', 'می‌دهم']
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