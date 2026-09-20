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

// ===== سوالات درس ۳۲ - روسی به فارسی (وسایل نقلیه ۲) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "фургон" است؟',
    speak: 'фургон',
    options: [
      { text: 'фургон', image: '../../../media/a2/vehicles/van.png' },
      { text: 'джип', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'лимузин', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'скорая помощь', image: '../../../media/a2/vehicles/ambulance.png' }
    ],
    answer: 'фургон'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "джип" است؟',
    speak: 'джип',
    options: [
      { text: 'фургон', image: '../../../media/a2/vehicles/van.png' },
      { text: 'джип', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'пожарная машина', image: '../../../media/a2/vehicles/firetruck.png' },
      { text: 'лимузин', image: '../../../media/a2/vehicles/limousine.png' }
    ],
    answer: 'джип'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "лимузин" است؟',
    speak: 'лимузин',
    options: [
      { text: 'скорая помощь', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'фургон', image: '../../../media/a2/vehicles/van.png' },
      { text: 'лимузин', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'джип', image: '../../../media/a2/vehicles/jeep.png' }
    ],
    answer: 'лимузин'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "скорая помощь" است؟',
    speak: 'скорая помощь',
    options: [
      { text: 'фургон', image: '../../../media/a2/vehicles/van.png' },
      { text: 'скорая помощь', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'лимузин', image: '../../../media/a2/vehicles/limousine.png' },
      { text: 'пожарная машина', image: '../../../media/a2/vehicles/firetruck.png' }
    ],
    answer: 'скорая помощь'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "пожарная машина" است؟',
    speak: 'пожарная машина',
    options: [
      { text: 'джип', image: '../../../media/a2/vehicles/jeep.png' },
      { text: 'пожарная машина', image: '../../../media/a2/vehicles/firetruck.png' },
      { text: 'скорая помощь', image: '../../../media/a2/vehicles/ambulance.png' },
      { text: 'фургон', image: '../../../media/a2/vehicles/van.png' }
    ],
    answer: 'пожарная машина'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/van.png',
    options: ['фургон', 'джип', 'лимузин', 'скорая помощь'],
    answer: 'фургон'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/jeep.png',
    options: ['фургон', 'джип', 'пожарная машина', 'лимузин'],
    answer: 'джип'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/limousine.png',
    options: ['скорая помощь', 'фургон', 'лимузин', 'джип'],
    answer: 'лимузин'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ambulance.png',
    options: ['фургон', 'скорая помощь', 'лимузин', 'пожарная машина'],
    answer: 'скорая помощь'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/firetruck.png',
    options: ['джип', 'пожарная машина', 'скорая помощь', 'фургон'],
    answer: 'пожарная машина'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'фургон',
    question: 'کدام کلمه را شنیدی؟',
    options: ['фургон', 'джип', 'лимузин', 'скорая помощь'],
    answer: 'фургон'
  },
  {
    type: 'audio',
    speak: 'джип',
    question: 'کدام کلمه را شنیدی؟',
    options: ['фургон', 'джип', 'пожарная машина', 'лимузин'],
    answer: 'джип'
  },
  {
    type: 'audio',
    speak: 'лимузин',
    question: 'کدام کلمه را شنیدی؟',
    options: ['скорая помощь', 'фургон', 'лимузин', 'джип'],
    answer: 'лимузин'
  },
  {
    type: 'audio',
    speak: 'скорая помощь',
    question: 'کدام کلمه را شنیدی؟',
    options: ['фургон', 'скорая помощь', 'лимузин', 'пожарная машина'],
    answer: 'скорая помощь'
  },
  {
    type: 'audio',
    speak: 'пожарная машина',
    question: 'کدام کلمه را شنیدی؟',
    options: ['джип', 'пожарная машина', 'скорая помощь', 'фургон'],
    answer: 'пожарная машина'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'фургон',
    image: '../../../media/a2/vehicles/van.png',
    meaning: 'ون'
  },
  {
    type: 'speak',
    word: 'джип',
    image: '../../../media/a2/vehicles/jeep.png',
    meaning: 'جیپ'
  },
  {
    type: 'speak',
    word: 'лимузин',
    image: '../../../media/a2/vehicles/limousine.png',
    meaning: 'لیموزین'
  },
  {
    type: 'speak',
    word: 'скорая помощь',
    image: '../../../media/a2/vehicles/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'пожарная машина',
    image: '../../../media/a2/vehicles/firetruck.png',
    meaning: 'آتش‌نشانی'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это фургон',
    question: 'جمله روسی را بساز:',
    text: 'این ون است',
    words: ['фургон', 'Это'],
    answer: ['Это', 'фургон']
  },
  {
    type: 'build-ru',
    speak: 'Это джип',
    question: 'جمله روسی را بساز:',
    text: 'این جیپ است',
    words: ['джип', 'Это'],
    answer: ['Это', 'джип']
  },
  {
    type: 'build-ru',
    speak: 'Это лимузин',
    question: 'جمله روسی را بساز:',
    text: 'این لیموزین است',
    words: ['лимузин', 'Это'],
    answer: ['Это', 'лимузин']
  },
  {
    type: 'build-ru',
    speak: 'Это скорая помощь',
    question: 'جمله روسی را بساز:',
    text: 'این آمبولانس است',
    words: ['скорая', 'помощь', 'Это'],
    answer: ['Это', 'скорая', 'помощь']
  },
  {
    type: 'build-ru',
    speak: 'Это пожарная машина',
    question: 'جمله روسی را بساز:',
    text: 'این آتش‌نشانی است',
    words: ['пожарная', 'машина', 'Это'],
    answer: ['Это', 'пожарная', 'машина']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это фургон',
    question: 'ترجمه را بساز:',
    text: 'Это фургон',
    words: ['است', 'ون', 'این'],
    answer: ['این', 'ون', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это джип',
    question: 'ترجمه را بساز:',
    text: 'Это джип',
    words: ['است', 'جیپ', 'این'],
    answer: ['این', 'جیپ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это лимузин',
    question: 'ترجمه را بساز:',
    text: 'Это лимузин',
    words: ['است', 'لیموزین', 'این'],
    answer: ['این', 'لیموزین', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это скорая помощь',
    question: 'ترجمه را بساز:',
    text: 'Это скорая помощь',
    words: ['است', 'آمبولانس', 'این'],
    answer: ['این', 'آمبولانس', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это пожарная машина',
    question: 'ترجمه را بساز:',
    text: 'Это пожарная машина',
    words: ['است', 'آتش‌نشانی', 'این'],
    answer: ['این', 'آتش‌نشانی', 'است']
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