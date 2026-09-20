let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
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
  recognition.lang = 'zh-CN';
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

// ===== سوالات درس ۱۶ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "飞行员" است؟',
    speak: '飞行员',
    options: [
      { text: '护士', image: '../../../media/a2/jobs/nurse.png' },
      { text: '飞行员', image: '../../../media/a2/jobs/pilot.png' },
      { text: '律师', image: '../../../media/a2/jobs/lawyer.png' },
      { text: '艺术家', image: '../../../media/a2/jobs/artist.png' }
    ],
    answer: '飞行员'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "护士" است؟',
    speak: '护士',
    options: [
      { text: '飞行员', image: '../../../media/a2/jobs/pilot.png' },
      { text: '护士', image: '../../../media/a2/jobs/nurse.png' },
      { text: '厨师', image: '../../../media/a2/jobs/chef.png' },
      { text: '律师', image: '../../../media/a2/jobs/lawyer.png' }
    ],
    answer: '护士'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "律师" است؟',
    speak: '律师',
    options: [
      { text: '艺术家', image: '../../../media/a2/jobs/artist.png' },
      { text: '飞行员', image: '../../../media/a2/jobs/pilot.png' },
      { text: '律师', image: '../../../media/a2/jobs/lawyer.png' },
      { text: '护士', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: '律师'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "艺术家" است؟',
    speak: '艺术家',
    options: [
      { text: '艺术家', image: '../../../media/a2/jobs/artist.png' },
      { text: '厨师', image: '../../../media/a2/jobs/chef.png' },
      { text: '护士', image: '../../../media/a2/jobs/nurse.png' },
      { text: '飞行员', image: '../../../media/a2/jobs/pilot.png' }
    ],
    answer: '艺术家'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "厨师" است؟',
    speak: '厨师',
    options: [
      { text: '律师', image: '../../../media/a2/jobs/lawyer.png' },
      { text: '厨师', image: '../../../media/a2/jobs/chef.png' },
      { text: '艺术家', image: '../../../media/a2/jobs/artist.png' },
      { text: '护士', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: '厨师'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/pilot.png',
    options: ['护士', '飞行员', '律师', '艺术家'],
    answer: '飞行员'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/nurse.png',
    options: ['飞行员', '护士', '厨师', '律师'],
    answer: '护士'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/lawyer.png',
    options: ['艺术家', '飞行员', '律师', '护士'],
    answer: '律师'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/artist.png',
    options: ['艺术家', '厨师', '护士', '飞行员'],
    answer: '艺术家'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/chef.png',
    options: ['律师', '厨师', '艺术家', '护士'],
    answer: '厨师'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '飞行员',
    question: 'کدام کلمه را شنیدی؟',
    options: ['护士', '飞行员', '律师', '艺术家'],
    answer: '飞行员'
  },
  {
    type: 'audio',
    speak: '护士',
    question: 'کدام کلمه را شنیدی؟',
    options: ['飞行员', '护士', '厨师', '律师'],
    answer: '护士'
  },
  {
    type: 'audio',
    speak: '律师',
    question: 'کدام کلمه را شنیدی؟',
    options: ['艺术家', '飞行员', '律师', '护士'],
    answer: '律师'
  },
  {
    type: 'audio',
    speak: '艺术家',
    question: 'کدام کلمه را شنیدی؟',
    options: ['艺术家', '厨师', '护士', '飞行员'],
    answer: '艺术家'
  },
  {
    type: 'audio',
    speak: '厨师',
    question: 'کدام کلمه را شنیدی؟',
    options: ['律师', '厨师', '艺术家', '护士'],
    answer: '厨师'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '飞行员',
    image: '../../../media/a2/jobs/pilot.png',
    meaning: 'خلبان'
  },
  {
    type: 'speak',
    word: '护士',
    image: '../../../media/a2/jobs/nurse.png',
    meaning: 'پرستار'
  },
  {
    type: 'speak',
    word: '律师',
    image: '../../../media/a2/jobs/lawyer.png',
    meaning: 'وکیل'
  },
  {
    type: 'speak',
    word: '艺术家',
    image: '../../../media/a2/jobs/artist.png',
    meaning: 'هنرمند'
  },
  {
    type: 'speak',
    word: '厨师',
    image: '../../../media/a2/jobs/chef.png',
    meaning: 'آشپز'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '他是飞行员',
    question: 'جمله چینی را بساز:',
    text: 'او خلبان است',
    words: ['飞行员', '他', '是'],
    answer: ['他', '是', '飞行员']
  },
  {
    type: 'build-en',
    speak: '他是护士',
    question: 'جمله چینی را بساز:',
    text: 'او پرستار است',
    words: ['护士', '他', '是'],
    answer: ['他', '是', '护士']
  },
  {
    type: 'build-en',
    speak: '他是律师',
    question: 'جمله چینی را بساز:',
    text: 'او وکیل است',
    words: ['律师', '他', '是'],
    answer: ['他', '是', '律师']
  },
  {
    type: 'build-en',
    speak: '他是艺术家',
    question: 'جمله چینی را بساز:',
    text: 'او هنرمند است',
    words: ['艺术家', '他', '是'],
    answer: ['他', '是', '艺术家']
  },
  {
    type: 'build-en',
    speak: '他是厨师',
    question: 'جمله چینی را بساز:',
    text: 'او آشپز است',
    words: ['厨师', '他', '是'],
    answer: ['他', '是', '厨师']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '他是飞行员',
    question: 'ترجمه را بساز:',
    text: '他是飞行员',
    words: ['است', 'خلبان', 'او'],
    answer: ['او', 'خلبان', 'است']
  },
  {
    type: 'build-fa',
    speak: '他是护士',
    question: 'ترجمه را بساز:',
    text: '他是护士',
    words: ['است', 'پرستار', 'او'],
    answer: ['او', 'پرستار', 'است']
  },
  {
    type: 'build-fa',
    speak: '他是律师',
    question: 'ترجمه را بساز:',
    text: '他是律师',
    words: ['است', 'وکیل', 'او'],
    answer: ['او', 'وکیل', 'است']
  },
  {
    type: 'build-fa',
    speak: '他是艺术家',
    question: 'ترجمه را بساز:',
    text: '他是艺术家',
    words: ['است', 'هنرمند', 'او'],
    answer: ['او', 'هنرمند', 'است']
  },
  {
    type: 'build-fa',
    speak: '他是厨师',
    question: 'ترجمه را بساز:',
    text: '他是厨师',
    words: ['است', 'آشپز', 'او'],
    answer: ['او', 'آشپز', 'است']
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
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

    if (q.type === 'build-en') {
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