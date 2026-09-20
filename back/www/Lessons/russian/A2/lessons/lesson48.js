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

// ===== سوالات درس ۴۸ - روسی به فارسی (دانشگاه و مراکز آموزشی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "университет" است؟',
    speak: 'университет',
    options: [
      { text: 'университет', image: '../../../media/a2/school/university.png' },
      { text: 'колледж', image: '../../../media/a2/school/college.png' },
      { text: 'кампус', image: '../../../media/a2/school/campus.png' },
      { text: 'общежитие', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: 'университет'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "колледж" است؟',
    speak: 'колледж',
    options: [
      { text: 'университет', image: '../../../media/a2/school/university.png' },
      { text: 'колледж', image: '../../../media/a2/school/college.png' },
      { text: 'лаборатория', image: '../../../media/a2/school/laboratory.png' },
      { text: 'кампус', image: '../../../media/a2/school/campus.png' }
    ],
    answer: 'колледж'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "кампус" است؟',
    speak: 'кампус',
    options: [
      { text: 'общежитие', image: '../../../media/a2/school/dormitory.png' },
      { text: 'университет', image: '../../../media/a2/school/university.png' },
      { text: 'кампус', image: '../../../media/a2/school/campus.png' },
      { text: 'колледж', image: '../../../media/a2/school/college.png' }
    ],
    answer: 'кампус'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "общежитие" است؟',
    speak: 'общежитие',
    options: [
      { text: 'университет', image: '../../../media/a2/school/university.png' },
      { text: 'общежитие', image: '../../../media/a2/school/dormitory.png' },
      { text: 'колледж', image: '../../../media/a2/school/college.png' },
      { text: 'лаборатория', image: '../../../media/a2/school/laboratory.png' }
    ],
    answer: 'общежитие'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "лаборатория" است؟',
    speak: 'лаборатория',
    options: [
      { text: 'кампус', image: '../../../media/a2/school/campus.png' },
      { text: 'лаборатория', image: '../../../media/a2/school/laboratory.png' },
      { text: 'общежитие', image: '../../../media/a2/school/dormitory.png' },
      { text: 'университет', image: '../../../media/a2/school/university.png' }
    ],
    answer: 'лаборатория'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/university.png',
    options: ['университет', 'колледж', 'кампус', 'общежитие'],
    answer: 'университет'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/college.png',
    options: ['университет', 'колледж', 'лаборатория', 'кампус'],
    answer: 'колледж'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/campus.png',
    options: ['общежитие', 'университет', 'кампус', 'колледж'],
    answer: 'кампус'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dormitory.png',
    options: ['университет', 'общежитие', 'колледж', 'лаборатория'],
    answer: 'общежитие'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/laboratory.png',
    options: ['кампус', 'лаборатория', 'общежитие', 'университет'],
    answer: 'лаборатория'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'университет',
    question: 'کدام کلمه را شنیدی؟',
    options: ['университет', 'колледж', 'кампус', 'общежитие'],
    answer: 'университет'
  },
  {
    type: 'audio',
    speak: 'колледж',
    question: 'کدام کلمه را شنیدی؟',
    options: ['университет', 'колледж', 'лаборатория', 'кампус'],
    answer: 'колледж'
  },
  {
    type: 'audio',
    speak: 'кампус',
    question: 'کدام کلمه را شنیدی؟',
    options: ['общежитие', 'университет', 'кампус', 'колледж'],
    answer: 'кампус'
  },
  {
    type: 'audio',
    speak: 'общежитие',
    question: 'کدام کلمه را شنیدی؟',
    options: ['университет', 'общежитие', 'колледж', 'лаборатория'],
    answer: 'общежитие'
  },
  {
    type: 'audio',
    speak: 'лаборатория',
    question: 'کدام کلمه را شنیدی؟',
    options: ['кампус', 'лаборатория', 'общежитие', 'университет'],
    answer: 'лаборатория'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'университет',
    image: '../../../media/a2/school/university.png',
    meaning: 'دانشگاه'
  },
  {
    type: 'speak',
    word: 'колледж',
    image: '../../../media/a2/school/college.png',
    meaning: 'کالج'
  },
  {
    type: 'speak',
    word: 'кампус',
    image: '../../../media/a2/school/campus.png',
    meaning: 'محوطه دانشگاه'
  },
  {
    type: 'speak',
    word: 'общежитие',
    image: '../../../media/a2/school/dormitory.png',
    meaning: 'خوابگاه'
  },
  {
    type: 'speak',
    word: 'лаборатория',
    image: '../../../media/a2/school/laboratory.png',
    meaning: 'آزمایشگاه'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Это университет',
    question: 'جمله روسی را بساز:',
    text: 'این دانشگاه است',
    words: ['университет', 'Это'],
    answer: ['Это', 'университет']
  },
  {
    type: 'build-ru',
    speak: 'Это колледж',
    question: 'جمله روسی را بساز:',
    text: 'این کالج است',
    words: ['колледж', 'Это'],
    answer: ['Это', 'колледж']
  },
  {
    type: 'build-ru',
    speak: 'Это кампус',
    question: 'جمله روسی را بساز:',
    text: 'این محوطه دانشگاه است',
    words: ['кампус', 'Это'],
    answer: ['Это', 'кампус']
  },
  {
    type: 'build-ru',
    speak: 'Это общежитие',
    question: 'جمله روسی را بساز:',
    text: 'این خوابگاه است',
    words: ['общежитие', 'Это'],
    answer: ['Это', 'общежитие']
  },
  {
    type: 'build-ru',
    speak: 'Это лаборатория',
    question: 'جمله روسی را بساز:',
    text: 'این آزمایشگاه است',
    words: ['лаборатория', 'Это'],
    answer: ['Это', 'лаборатория']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Это университет',
    question: 'ترجمه را بساز:',
    text: 'Это университет',
    words: ['است', 'دانشگاه', 'این'],
    answer: ['این', 'دانشگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это колледж',
    question: 'ترجمه را بساز:',
    text: 'Это колледж',
    words: ['است', 'کالج', 'این'],
    answer: ['این', 'کالج', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это кампус',
    question: 'ترجمه را بساز:',
    text: 'Это кампус',
    words: ['است', 'محوطه دانشگاه', 'این'],
    answer: ['این', 'محوطه دانشگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это общежитие',
    question: 'ترجمه را بساز:',
    text: 'Это общежитие',
    words: ['است', 'خوابگاه', 'این'],
    answer: ['این', 'خوابگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Это лаборатория',
    question: 'ترجمه را بساز:',
    text: 'Это лаборатория',
    words: ['است', 'آزمایشگاه', 'این'],
    answer: ['این', 'آزمایشگاه', 'است']
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