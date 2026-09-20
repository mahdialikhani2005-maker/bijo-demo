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

// ===== سوالات درس ۲۵ - ایتالیایی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "il toast" است؟',
    speak: 'il toast',
    options: [
      { text: 'il toast', image: '../../../media/a2/food/toast.png' },
      { text: 'i cereali', image: '../../../media/a2/food/cereal.png' },
      { text: 'il porridge', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'il miele', image: '../../../media/a2/food/honey.png' }
    ],
    answer: 'il toast'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "i cereali" است؟',
    speak: 'i cereali',
    options: [
      { text: 'il toast', image: '../../../media/a2/food/toast.png' },
      { text: 'i cereali', image: '../../../media/a2/food/cereal.png' },
      { text: 'la marmellata', image: '../../../media/a2/food/jam.png' },
      { text: 'il porridge', image: '../../../media/a2/food/oatmeal.png' }
    ],
    answer: 'i cereali'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il porridge" است؟',
    speak: 'il porridge',
    options: [
      { text: 'il miele', image: '../../../media/a2/food/honey.png' },
      { text: 'il toast', image: '../../../media/a2/food/toast.png' },
      { text: 'il porridge', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'i cereali', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'il porridge'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la marmellata" است؟',
    speak: 'la marmellata',
    options: [
      { text: 'i cereali', image: '../../../media/a2/food/cereal.png' },
      { text: 'la marmellata', image: '../../../media/a2/food/jam.png' },
      { text: 'il miele', image: '../../../media/a2/food/honey.png' },
      { text: 'il toast', image: '../../../media/a2/food/toast.png' }
    ],
    answer: 'la marmellata'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "il miele" است؟',
    speak: 'il miele',
    options: [
      { text: 'il toast', image: '../../../media/a2/food/toast.png' },
      { text: 'il porridge', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'il miele', image: '../../../media/a2/food/honey.png' },
      { text: 'la marmellata', image: '../../../media/a2/food/jam.png' }
    ],
    answer: 'il miele'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/toast.png',
    options: ['il toast', 'i cereali', 'il porridge', 'il miele'],
    answer: 'il toast'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cereal.png',
    options: ['il toast', 'i cereali', 'la marmellata', 'il porridge'],
    answer: 'i cereali'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/oatmeal.png',
    options: ['il miele', 'il toast', 'il porridge', 'i cereali'],
    answer: 'il porridge'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/jam.png',
    options: ['i cereali', 'la marmellata', 'il miele', 'il toast'],
    answer: 'la marmellata'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/honey.png',
    options: ['il toast', 'il porridge', 'il miele', 'la marmellata'],
    answer: 'il miele'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'il toast',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il toast', 'i cereali', 'il porridge', 'il miele'],
    answer: 'il toast'
  },
  {
    type: 'audio',
    speak: 'i cereali',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il toast', 'i cereali', 'la marmellata', 'il porridge'],
    answer: 'i cereali'
  },
  {
    type: 'audio',
    speak: 'il porridge',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il miele', 'il toast', 'il porridge', 'i cereali'],
    answer: 'il porridge'
  },
  {
    type: 'audio',
    speak: 'la marmellata',
    question: 'کدام کلمه را شنیدی؟',
    options: ['i cereali', 'la marmellata', 'il miele', 'il toast'],
    answer: 'la marmellata'
  },
  {
    type: 'audio',
    speak: 'il miele',
    question: 'کدام کلمه را شنیدی؟',
    options: ['il toast', 'il porridge', 'il miele', 'la marmellata'],
    answer: 'il miele'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'il toast',
    image: '../../../media/a2/food/toast.png',
    meaning: 'نان تست'
  },
  {
    type: 'speak',
    word: 'i cereali',
    image: '../../../media/a2/food/cereal.png',
    meaning: 'غلات صبحانه'
  },
  {
    type: 'speak',
    word: 'il porridge',
    image: '../../../media/a2/food/oatmeal.png',
    meaning: 'بلغور جو'
  },
  {
    type: 'speak',
    word: 'la marmellata',
    image: '../../../media/a2/food/jam.png',
    meaning: 'مربا'
  },
  {
    type: 'speak',
    word: 'il miele',
    image: '../../../media/a2/food/honey.png',
    meaning: 'عسل'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ایتالیایی) =====
  {
    type: 'build-it',
    speak: 'Mangio il toast',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من نان تست می‌خورم',
    words: ['toast', 'il', 'Mangio'],
    answer: ['Mangio', 'il', 'toast']
  },
  {
    type: 'build-it',
    speak: 'Mangio i cereali',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من غلات صبحانه می‌خورم',
    words: ['cereali', 'i', 'Mangio'],
    answer: ['Mangio', 'i', 'cereali']
  },
  {
    type: 'build-it',
    speak: 'Mangio il porridge',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من بلغور جو می‌خورم',
    words: ['porridge', 'il', 'Mangio'],
    answer: ['Mangio', 'il', 'porridge']
  },
  {
    type: 'build-it',
    speak: 'Mangio la marmellata',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من مربا می‌خورم',
    words: ['marmellata', 'la', 'Mangio'],
    answer: ['Mangio', 'la', 'marmellata']
  },
  {
    type: 'build-it',
    speak: 'Mangio il miele',
    question: 'جمله ایتالیایی را بساز:',
    text: 'من عسل می‌خورم',
    words: ['miele', 'il', 'Mangio'],
    answer: ['Mangio', 'il', 'miele']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Mangio il toast',
    question: 'ترجمه را بساز:',
    text: 'Mangio il toast',
    words: ['می‌خورم', 'نان تست', 'من'],
    answer: ['من', 'نان تست', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio i cereali',
    question: 'ترجمه را بساز:',
    text: 'Mangio i cereali',
    words: ['می‌خورم', 'غلات صبحانه', 'من'],
    answer: ['من', 'غلات صبحانه', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio il porridge',
    question: 'ترجمه را بساز:',
    text: 'Mangio il porridge',
    words: ['می‌خورم', 'بلغور جو', 'من'],
    answer: ['من', 'بلغور جو', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio la marmellata',
    question: 'ترجمه را بساز:',
    text: 'Mangio la marmellata',
    words: ['می‌خورم', 'مربا', 'من'],
    answer: ['من', 'مربا', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'Mangio il miele',
    question: 'ترجمه را بساز:',
    text: 'Mangio il miele',
    words: ['می‌خورم', 'عسل', 'من'],
    answer: ['من', 'عسل', 'می‌خورم']
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