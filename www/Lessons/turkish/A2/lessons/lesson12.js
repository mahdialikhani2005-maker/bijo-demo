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

// ===== سوالات درس ۱۲ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "das Hotel" است؟',
    speak: 'das Hotel',
    options: [
      { text: 'das Hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'das Café', image: '../../../media/a2/city/cafe.png' },
      { text: 'die Bäckerei', image: '../../../media/a2/city/bakery.png' },
      { text: 'die Metzgerei', image: '../../../media/a2/city/butchery.png' }
    ],
    answer: 'das Hotel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Café" است؟',
    speak: 'das Café',
    options: [
      { text: 'das Hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'das Café', image: '../../../media/a2/city/cafe.png' },
      { text: 'die Apotheke', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'die Bäckerei', image: '../../../media/a2/city/bakery.png' }
    ],
    answer: 'das Café'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Bäckerei" است؟',
    speak: 'die Bäckerei',
    options: [
      { text: 'die Metzgerei', image: '../../../media/a2/city/butchery.png' },
      { text: 'das Hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'die Bäckerei', image: '../../../media/a2/city/bakery.png' },
      { text: 'das Café', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'die Bäckerei'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Apotheke" است؟',
    speak: 'die Apotheke',
    options: [
      { text: 'das Café', image: '../../../media/a2/city/cafe.png' },
      { text: 'die Apotheke', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'die Metzgerei', image: '../../../media/a2/city/butchery.png' },
      { text: 'das Hotel', image: '../../../media/a2/city/hotel.png' }
    ],
    answer: 'die Apotheke'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Metzgerei" است؟',
    speak: 'die Metzgerei',
    options: [
      { text: 'das Hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'die Bäckerei', image: '../../../media/a2/city/bakery.png' },
      { text: 'die Metzgerei', image: '../../../media/a2/city/butchery.png' },
      { text: 'die Apotheke', image: '../../../media/a2/city/pharmacy.png' }
    ],
    answer: 'die Metzgerei'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/hotel.png',
    options: ['das Hotel', 'das Café', 'die Bäckerei', 'die Metzgerei'],
    answer: 'das Hotel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/cafe.png',
    options: ['das Hotel', 'das Café', 'die Apotheke', 'die Bäckerei'],
    answer: 'das Café'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bakery.png',
    options: ['die Metzgerei', 'das Hotel', 'die Bäckerei', 'das Café'],
    answer: 'die Bäckerei'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/pharmacy.png',
    options: ['das Café', 'die Apotheke', 'die Metzgerei', 'das Hotel'],
    answer: 'die Apotheke'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/butchery.png',
    options: ['das Hotel', 'die Bäckerei', 'die Metzgerei', 'die Apotheke'],
    answer: 'die Metzgerei'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'das Hotel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Hotel', 'das Café', 'die Bäckerei', 'die Metzgerei'],
    answer: 'das Hotel'
  },
  {
    type: 'audio',
    speak: 'das Café',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Hotel', 'das Café', 'die Apotheke', 'die Bäckerei'],
    answer: 'das Café'
  },
  {
    type: 'audio',
    speak: 'die Bäckerei',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Metzgerei', 'das Hotel', 'die Bäckerei', 'das Café'],
    answer: 'die Bäckerei'
  },
  {
    type: 'audio',
    speak: 'die Apotheke',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Café', 'die Apotheke', 'die Metzgerei', 'das Hotel'],
    answer: 'die Apotheke'
  },
  {
    type: 'audio',
    speak: 'die Metzgerei',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Hotel', 'die Bäckerei', 'die Metzgerei', 'die Apotheke'],
    answer: 'die Metzgerei'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'das Hotel',
    image: '../../../media/a2/city/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: 'das Café',
    image: '../../../media/a2/city/cafe.png',
    meaning: 'کافه'
  },
  {
    type: 'speak',
    word: 'die Bäckerei',
    image: '../../../media/a2/city/bakery.png',
    meaning: 'نانوایی'
  },
  {
    type: 'speak',
    word: 'die Apotheke',
    image: '../../../media/a2/city/pharmacy.png',
    meaning: 'داروخانه'
  },
  {
    type: 'speak',
    word: 'die Metzgerei',
    image: '../../../media/a2/city/butchery.png',
    meaning: 'قصابی'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich gehe ins Hotel',
    question: 'جمله آلمانی را بساز:',
    text: 'من به هتل می‌روم',
    words: ['Hotel', 'ins', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'ins', 'Hotel']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe ins Café',
    question: 'جمله آلمانی را بساز:',
    text: 'من به کافه می‌روم',
    words: ['Café', 'ins', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'ins', 'Café']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zur Bäckerei',
    question: 'جمله آلمانی را بساز:',
    text: 'من به نانوایی می‌روم',
    words: ['Bäckerei', 'zur', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zur', 'Bäckerei']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zur Apotheke',
    question: 'جمله آلمانی را بساز:',
    text: 'من به داروخانه می‌روم',
    words: ['Apotheke', 'zur', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zur', 'Apotheke']
  },
  {
    type: 'build-de',
    speak: 'Ich gehe zur Metzgerei',
    question: 'جمله آلمانی را بساز:',
    text: 'من به قصابی می‌روم',
    words: ['Metzgerei', 'zur', 'gehe', 'Ich'],
    answer: ['Ich', 'gehe', 'zur', 'Metzgerei']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich gehe ins Hotel',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe ins Hotel',
    words: ['می‌روم', 'هتل', 'به', 'من'],
    answer: ['من', 'به', 'هتل', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe ins Café',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe ins Café',
    words: ['می‌روم', 'کافه', 'به', 'من'],
    answer: ['من', 'به', 'کافه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zur Bäckerei',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zur Bäckerei',
    words: ['می‌روم', 'نانوایی', 'به', 'من'],
    answer: ['من', 'به', 'نانوایی', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zur Apotheke',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zur Apotheke',
    words: ['می‌روم', 'داروخانه', 'به', 'من'],
    answer: ['من', 'به', 'داروخانه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Ich gehe zur Metzgerei',
    question: 'ترجمه را بساز:',
    text: 'Ich gehe zur Metzgerei',
    words: ['می‌روم', 'قصابی', 'به', 'من'],
    answer: ['من', 'به', 'قصابی', 'می‌روم']
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