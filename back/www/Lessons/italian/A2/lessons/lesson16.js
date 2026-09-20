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

// ===== سوالات درس ۱۶ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il pilota" است؟',
    speak: 'il pilota',
    options: [
      { text: 'il pilota', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'l\'infermiera', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'l\'avvocato', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'lo chef', image: '../../../media/a2/jobs/chef.png' }
    ],
    answer: 'il pilota'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'infermiera" است؟',
    speak: 'l\'infermiera',
    options: [
      { text: 'il pilota', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'l\'infermiera', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'l\'artista', image: '../../../media/a2/jobs/artist.png' },
      { text: 'l\'avvocato', image: '../../../media/a2/jobs/lawyer.png' }
    ],
    answer: 'l\'infermiera'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'avvocato" است؟',
    speak: 'l\'avvocato',
    options: [
      { text: 'lo chef', image: '../../../media/a2/jobs/chef.png' },
      { text: 'il pilota', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'l\'avvocato', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'l\'infermiera', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: 'l\'avvocato'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'artista" است؟',
    speak: 'l\'artista',
    options: [
      { text: 'l\'infermiera', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'l\'artista', image: '../../../media/a2/jobs/artist.png' },
      { text: 'lo chef', image: '../../../media/a2/jobs/chef.png' },
      { text: 'il pilota', image: '../../../media/a2/jobs/pilot.png' }
    ],
    answer: 'l\'artista'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "lo chef" است؟',
    speak: 'lo chef',
    options: [
      { text: 'il pilota', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'l\'avvocato', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'lo chef', image: '../../../media/a2/jobs/chef.png' },
      { text: 'l\'artista', image: '../../../media/a2/jobs/artist.png' }
    ],
    answer: 'lo chef'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/pilot.png',
    options: ['il pilota', 'l\'infermiera', 'l\'avvocato', 'lo chef'],
    answer: 'il pilota'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/nurse.png',
    options: ['il pilota', 'l\'infermiera', 'l\'artista', 'l\'avvocato'],
    answer: 'l\'infermiera'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/lawyer.png',
    options: ['lo chef', 'il pilota', 'l\'avvocato', 'l\'infermiera'],
    answer: 'l\'avvocato'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/artist.png',
    options: ['l\'infermiera', 'l\'artista', 'lo chef', 'il pilota'],
    answer: 'l\'artista'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/chef.png',
    options: ['il pilota', 'l\'avvocato', 'lo chef', 'l\'artista'],
    answer: 'lo chef'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il pilota',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il pilota', 'l\'infermiera', 'l\'avvocato', 'lo chef'],
    answer: 'il pilota'
  },
  {
    type: 'audio',
    speak: 'l\'infermiera',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il pilota', 'l\'infermiera', 'l\'artista', 'l\'avvocato'],
    answer: 'l\'infermiera'
  },
  {
    type: 'audio',
    speak: 'l\'avvocato',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lo chef', 'il pilota', 'l\'avvocato', 'l\'infermiera'],
    answer: 'l\'avvocato'
  },
  {
    type: 'audio',
    speak: 'l\'artista',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'infermiera', 'l\'artista', 'lo chef', 'il pilota'],
    answer: 'l\'artista'
  },
  {
    type: 'audio',
    speak: 'lo chef',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il pilota', 'l\'avvocato', 'lo chef', 'l\'artista'],
    answer: 'lo chef'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il pilota',
    image: '../../../media/a2/jobs/pilot.png',
    meaning: 'خلبان'
  },
  {
    type: 'speak',
    word: 'l\'infermiera',
    image: '../../../media/a2/jobs/nurse.png',
    meaning: 'پرستار'
  },
  {
    type: 'speak',
    word: 'l\'avvocato',
    image: '../../../media/a2/jobs/lawyer.png',
    meaning: 'وکیل'
  },
  {
    type: 'speak',
    word: 'l\'artista',
    image: '../../../media/a2/jobs/artist.png',
    meaning: 'هنرمند'
  },
  {
    type: 'speak',
    word: 'lo chef',
    image: '../../../media/a2/jobs/chef.png',
    meaning: 'آشپز'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Sono un pilota',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من خلبان هستم',
    words: ['pilota', 'un', 'Sono'],
    answer: ['Sono', 'un', 'pilota']
  },
  {
    type: 'build-it',
    speak: 'Sono un\'infermiera',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من پرستار هستم',
    words: ['infermiera', 'un\'', 'Sono'],
    answer: ['Sono', 'un\'', 'infermiera']
  },
  {
    type: 'build-it',
    speak: 'Sono un avvocato',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من وکیل هستم',
    words: ['avvocato', 'un', 'Sono'],
    answer: ['Sono', 'un', 'avvocato']
  },
  {
    type: 'build-it',
    speak: 'Sono un artista',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من هنرمند هستم',
    words: ['artista', 'un', 'Sono'],
    answer: ['Sono', 'un', 'artista']
  },
  {
    type: 'build-it',
    speak: 'Sono uno chef',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من آشپز هستم',
    words: ['chef', 'uno', 'Sono'],
    answer: ['Sono', 'uno', 'chef']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Sono un pilota',
    question: 'ترجمه را بساز:',
    text: 'Sono un pilota',
    words: ['هستم', 'خلبان', 'من'],
    answer: ['من', 'خلبان', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un\'infermiera',
    question: 'ترجمه را بساز:',
    text: 'Sono un\'infermiera',
    words: ['هستم', 'پرستار', 'من'],
    answer: ['من', 'پرستار', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un avvocato',
    question: 'ترجمه را بساز:',
    text: 'Sono un avvocato',
    words: ['هستم', 'وکیل', 'من'],
    answer: ['من', 'وکیل', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono un artista',
    question: 'ترجمه را بساز:',
    text: 'Sono un artista',
    words: ['هستم', 'هنرمند', 'من'],
    answer: ['من', 'هنرمند', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Sono uno chef',
    question: 'ترجمه را بساز:',
    text: 'Sono uno chef',
    words: ['هستم', 'آشپز', 'من'],
    answer: ['من', 'آشپز', 'هستم']
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