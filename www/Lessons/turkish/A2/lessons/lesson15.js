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

// ===== سوالات درس ۱۵ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "die Botschaft" است؟',
    speak: 'die Botschaft',
    options: [
      { text: 'die Botschaft', image: '../../../media/a2/city/embassy.png' },
      { text: 'das Gericht', image: '../../../media/a2/city/court.png' },
      { text: 'das Gefängnis', image: '../../../media/a2/city/jail.png' },
      { text: 'das Lagerhaus', image: '../../../media/a2/city/warehouse.png' }
    ],
    answer: 'die Botschaft'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Gericht" است؟',
    speak: 'das Gericht',
    options: [
      { text: 'die Botschaft', image: '../../../media/a2/city/embassy.png' },
      { text: 'das Gericht', image: '../../../media/a2/city/court.png' },
      { text: 'die Fabrik', image: '../../../media/a2/city/factory.png' },
      { text: 'das Gefängnis', image: '../../../media/a2/city/jail.png' }
    ],
    answer: 'das Gericht'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Gefängnis" است؟',
    speak: 'das Gefängnis',
    options: [
      { text: 'das Lagerhaus', image: '../../../media/a2/city/warehouse.png' },
      { text: 'die Botschaft', image: '../../../media/a2/city/embassy.png' },
      { text: 'das Gefängnis', image: '../../../media/a2/city/jail.png' },
      { text: 'das Gericht', image: '../../../media/a2/city/court.png' }
    ],
    answer: 'das Gefängnis'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Fabrik" است؟',
    speak: 'die Fabrik',
    options: [
      { text: 'das Gericht', image: '../../../media/a2/city/court.png' },
      { text: 'die Fabrik', image: '../../../media/a2/city/factory.png' },
      { text: 'das Lagerhaus', image: '../../../media/a2/city/warehouse.png' },
      { text: 'die Botschaft', image: '../../../media/a2/city/embassy.png' }
    ],
    answer: 'die Fabrik'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Lagerhaus" است؟',
    speak: 'das Lagerhaus',
    options: [
      { text: 'die Botschaft', image: '../../../media/a2/city/embassy.png' },
      { text: 'das Gefängnis', image: '../../../media/a2/city/jail.png' },
      { text: 'das Lagerhaus', image: '../../../media/a2/city/warehouse.png' },
      { text: 'die Fabrik', image: '../../../media/a2/city/factory.png' }
    ],
    answer: 'das Lagerhaus'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/embassy.png',
    options: ['die Botschaft', 'das Gericht', 'das Gefängnis', 'das Lagerhaus'],
    answer: 'die Botschaft'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/court.png',
    options: ['die Botschaft', 'das Gericht', 'die Fabrik', 'das Gefängnis'],
    answer: 'das Gericht'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/jail.png',
    options: ['das Lagerhaus', 'die Botschaft', 'das Gefängnis', 'das Gericht'],
    answer: 'das Gefängnis'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/factory.png',
    options: ['das Gericht', 'die Fabrik', 'das Lagerhaus', 'die Botschaft'],
    answer: 'die Fabrik'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/warehouse.png',
    options: ['die Botschaft', 'das Gefängnis', 'das Lagerhaus', 'die Fabrik'],
    answer: 'das Lagerhaus'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'die Botschaft',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Botschaft', 'das Gericht', 'das Gefängnis', 'das Lagerhaus'],
    answer: 'die Botschaft'
  },
  {
    type: 'audio',
    speak: 'das Gericht',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Botschaft', 'das Gericht', 'die Fabrik', 'das Gefängnis'],
    answer: 'das Gericht'
  },
  {
    type: 'audio',
    speak: 'das Gefängnis',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Lagerhaus', 'die Botschaft', 'das Gefängnis', 'das Gericht'],
    answer: 'das Gefängnis'
  },
  {
    type: 'audio',
    speak: 'die Fabrik',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Gericht', 'die Fabrik', 'das Lagerhaus', 'die Botschaft'],
    answer: 'die Fabrik'
  },
  {
    type: 'audio',
    speak: 'das Lagerhaus',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Botschaft', 'das Gefängnis', 'das Lagerhaus', 'die Fabrik'],
    answer: 'das Lagerhaus'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'die Botschaft',
    image: '../../../media/a2/city/embassy.png',
    meaning: 'سفارت'
  },
  {
    type: 'speak',
    word: 'das Gericht',
    image: '../../../media/a2/city/court.png',
    meaning: 'دادگاه'
  },
  {
    type: 'speak',
    word: 'das Gefängnis',
    image: '../../../media/a2/city/jail.png',
    meaning: 'زندان'
  },
  {
    type: 'speak',
    word: 'die Fabrik',
    image: '../../../media/a2/city/factory.png',
    meaning: 'کارخانه'
  },
  {
    type: 'speak',
    word: 'das Lagerhaus',
    image: '../../../media/a2/city/warehouse.png',
    meaning: 'انبار'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich gehe zur Botschaft',
    question: 'جمله آلمانی را بساز:',
    text: 'من به سفارت می‌روم',
    words: ['Botschaft', 'zur', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zur', 'Botschaft']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zum Gericht',
    question: 'جمله آلمانی را بساز:',
    text: 'من به دادگاه می‌روم',
    words: ['Gericht', 'zum', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zum', 'Gericht']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zum Gefängnis',
    question: 'جمله آلمانی را بساز:',
    text: 'من به زندان می‌روم',
    words: ['Gefängnis', 'zum', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zum', 'Gefängnis']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zur Fabrik',
    question: 'جمله آلمانی را بساز:',
    text: 'من به کارخانه می‌روم',
    words: ['Fabrik', 'zur', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zur', 'Fabrik']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zum Lagerhaus',
    question: 'جمله آلمانی را بساز:',
    text: 'من به انبار می‌روم',
    words: ['Lagerhaus', 'zum', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zum', 'Lagerhaus']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich gehe zur Botschaft',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zur Botschaft',
    words: ['می‌روم', 'سفارت', 'به', 'من'],
    answer: ['من', 'به', 'سفارت', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zum Gericht',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zum Gericht',
    words: ['می‌روم', 'دادگاه', 'به', 'من'],
    answer: ['من', 'به', 'دادگاه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zum Gefängnis',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zum Gefängnis',
    words: ['می‌روم', 'زندان', 'به', 'من'],
    answer: ['من', 'به', 'زندان', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zur Fabrik',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zur Fabrik',
    words: ['می‌روم', 'کارخانه', 'به', 'من'],
    answer: ['من', 'به', 'کارخانه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zum Lagerhaus',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zum Lagerhaus',
    words: ['می‌روم', 'انبار', 'به', 'من'],
    answer: ['من', 'به', 'انبار', 'می‌روم']
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