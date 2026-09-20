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

// ===== سوالات درس ۱۴ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il tempio" است؟',
    speak: 'il tempio',
    options: [
      { text: 'il tempio', image: '../../../media/a2/city/temple.png' },
      { text: 'la chiesa', image: '../../../media/a2/city/church.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' },
      { text: 'il santuario', image: '../../../media/a2/city/shrine.png' }
    ],
    answer: 'il tempio'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la chiesa" است؟',
    speak: 'la chiesa',
    options: [
      { text: 'il tempio', image: '../../../media/a2/city/temple.png' },
      { text: 'la chiesa', image: '../../../media/a2/city/church.png' },
      { text: 'la moschea', image: '../../../media/a2/city/mosque.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' }
    ],
    answer: 'la chiesa'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la sinagoga" است؟',
    speak: 'la sinagoga',
    options: [
      { text: 'il santuario', image: '../../../media/a2/city/shrine.png' },
      { text: 'il tempio', image: '../../../media/a2/city/temple.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' },
      { text: 'la chiesa', image: '../../../media/a2/city/church.png' }
    ],
    answer: 'la sinagoga'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la moschea" است؟',
    speak: 'la moschea',
    options: [
      { text: 'la chiesa', image: '../../../media/a2/city/church.png' },
      { text: 'la moschea', image: '../../../media/a2/city/mosque.png' },
      { text: 'il santuario', image: '../../../media/a2/city/shrine.png' },
      { text: 'il tempio', image: '../../../media/a2/city/temple.png' }
    ],
    answer: 'la moschea'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il santuario" است؟',
    speak: 'il santuario',
    options: [
      { text: 'il tempio', image: '../../../media/a2/city/temple.png' },
      { text: 'la sinagoga', image: '../../../media/a2/city/synagogue.png' },
      { text: 'il santuario', image: '../../../media/a2/city/shrine.png' },
      { text: 'la moschea', image: '../../../media/a2/city/mosque.png' }
    ],
    answer: 'il santuario'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/temple.png',
    options: ['il tempio', 'la chiesa', 'la sinagoga', 'il santuario'],
    answer: 'il tempio'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/church.png',
    options: ['il tempio', 'la chiesa', 'la moschea', 'la sinagoga'],
    answer: 'la chiesa'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/synagogue.png',
    options: ['il santuario', 'il tempio', 'la sinagoga', 'la chiesa'],
    answer: 'la sinagoga'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/mosque.png',
    options: ['la chiesa', 'la moschea', 'il santuario', 'il tempio'],
    answer: 'la moschea'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/shrine.png',
    options: ['il tempio', 'la sinagoga', 'il santuario', 'la moschea'],
    answer: 'il santuario'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il tempio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il tempio', 'la chiesa', 'la sinagoga', 'il santuario'],
    answer: 'il tempio'
  },
  {
    type: 'audio',
    speak: 'la chiesa',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il tempio', 'la chiesa', 'la moschea', 'la sinagoga'],
    answer: 'la chiesa'
  },
  {
    type: 'audio',
    speak: 'la sinagoga',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il santuario', 'il tempio', 'la sinagoga', 'la chiesa'],
    answer: 'la sinagoga'
  },
  {
    type: 'audio',
    speak: 'la moschea',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la chiesa', 'la moschea', 'il santuario', 'il tempio'],
    answer: 'la moschea'
  },
  {
    type: 'audio',
    speak: 'il santuario',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il tempio', 'la sinagoga', 'il santuario', 'la moschea'],
    answer: 'il santuario'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il tempio',
    image: '../../../media/a2/city/temple.png',
    meaning: 'معبد'
  },
  {
    type: 'speak',
    word: 'la chiesa',
    image: '../../../media/a2/city/church.png',
    meaning: 'کلیسا'
  },
  {
    type: 'speak',
    word: 'la sinagoga',
    image: '../../../media/a2/city/synagogue.png',
    meaning: 'کنیسه'
  },
  {
    type: 'speak',
    word: 'la moschea',
    image: '../../../media/a2/city/mosque.png',
    meaning: 'مسجد'
  },
  {
    type: 'speak',
    word: 'il santuario',
    image: '../../../media/a2/city/shrine.png',
    meaning: 'زیارتگاه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Vedo un tempio',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک معبد می‌بینم',
    words: ['tempio', 'un', 'Vedo'],
    answer: ['Vedo', 'un', 'tempio']
  },
  {
    type: 'build-it',
    speak: 'Vedo una chiesa',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کلیسا می‌بینم',
    words: ['chiesa', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'chiesa']
  },
  {
    type: 'build-it',
    speak: 'Vedo una sinagoga',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک کنیسه می‌بینم',
    words: ['sinagoga', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'sinagoga']
  },
  {
    type: 'build-it',
    speak: 'Vedo una moschea',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک مسجد می‌بینم',
    words: ['moschea', 'una', 'Vedo'],
    answer: ['Vedo', 'una', 'moschea']
  },
  {
    type: 'build-it',
    speak: 'Vedo un santuario',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من یک زیارتگاه می‌بینم',
    words: ['santuario', 'un', 'Vedo'],
    answer: ['Vedo', 'un', 'santuario']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Vedo un tempio',
    question: 'ترجمه را بساز:',
    text: 'Vedo un tempio',
    words: ['می‌بینم', 'معبد', 'یک', 'من'],
    answer: ['من', 'یک', 'معبد', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una chiesa',
    question: 'ترجمه را بساز:',
    text: 'Vedo una chiesa',
    words: ['می‌بینم', 'کلیسا', 'یک', 'من'],
    answer: ['من', 'یک', 'کلیسا', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una sinagoga',
    question: 'ترجمه را بساز:',
    text: 'Vedo una sinagoga',
    words: ['می‌بینم', 'کنیسه', 'یک', 'من'],
    answer: ['من', 'یک', 'کنیسه', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo una moschea',
    question: 'ترجمه را بساز:',
    text: 'Vedo una moschea',
    words: ['می‌بینم', 'مسجد', 'یک', 'من'],
    answer: ['من', 'یک', 'مسجد', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Vedo un santuario',
    question: 'ترجمه را بساز:',
    text: 'Vedo un santuario',
    words: ['می‌بینم', 'زیارتگاه', 'یک', 'من'],
    answer: ['من', 'یک', 'زیارتگاه', 'می‌بینم']
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