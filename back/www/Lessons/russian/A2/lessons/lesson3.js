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

// ===== سوالات درس ۳ - روسی به فارسی (روابط خانوادگی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "родственник" است؟',
    speak: 'родственник',
    options: [
      { text: 'родственник', image: '../../../media/a2/family/relative.png' },
      { text: 'близнец', image: '../../../media/a2/family/twin.png' },
      { text: 'сирота', image: '../../../media/a2/family/orphan.png' },
      { text: 'вдова', image: '../../../media/a2/family/widow.png' }
    ],
    answer: 'родственник'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "близнец" است؟',
    speak: 'близнец',
    options: [
      { text: 'родственник', image: '../../../media/a2/family/relative.png' },
      { text: 'близнец', image: '../../../media/a2/family/twin.png' },
      { text: 'невеста', image: '../../../media/a2/family/bride.png' },
      { text: 'сирота', image: '../../../media/a2/family/orphan.png' }
    ],
    answer: 'близнец'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "сирота" است؟',
    speak: 'сирота',
    options: [
      { text: 'вдова', image: '../../../media/a2/family/widow.png' },
      { text: 'родственник', image: '../../../media/a2/family/relative.png' },
      { text: 'сирота', image: '../../../media/a2/family/orphan.png' },
      { text: 'близнец', image: '../../../media/a2/family/twin.png' }
    ],
    answer: 'сирота'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "вдова" است؟',
    speak: 'вдова',
    options: [
      { text: 'родственник', image: '../../../media/a2/family/relative.png' },
      { text: 'вдова', image: '../../../media/a2/family/widow.png' },
      { text: 'сирота', image: '../../../media/a2/family/orphan.png' },
      { text: 'невеста', image: '../../../media/a2/family/bride.png' }
    ],
    answer: 'вдова'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "невеста" است؟',
    speak: 'невеста',
    options: [
      { text: 'близнец', image: '../../../media/a2/family/twin.png' },
      { text: 'вдова', image: '../../../media/a2/family/widow.png' },
      { text: 'невеста', image: '../../../media/a2/family/bride.png' },
      { text: 'родственник', image: '../../../media/a2/family/relative.png' }
    ],
    answer: 'невеста'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/relative.png',
    options: ['родственник', 'близнец', 'сирота', 'вдова'],
    answer: 'родственник'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/twin.png',
    options: ['родственник', 'близнец', 'невеста', 'сирота'],
    answer: 'близнец'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/orphan.png',
    options: ['вдова', 'родственник', 'сирота', 'близнец'],
    answer: 'сирота'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/widow.png',
    options: ['родственник', 'вдова', 'сирота', 'невеста'],
    answer: 'вдова'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/bride.png',
    options: ['близнец', 'вдова', 'невеста', 'родственник'],
    answer: 'невеста'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'родственник',
    question: 'کدام کلمه را شنیدی؟',
    options: ['родственник', 'близнец', 'сирота', 'вдова'],
    answer: 'родственник'
  },
  {
    type: 'audio',
    speak: 'близнец',
    question: 'کدام کلمه را شنیدی؟',
    options: ['родственник', 'близнец', 'невеста', 'сирота'],
    answer: 'близнец'
  },
  {
    type: 'audio',
    speak: 'сирота',
    question: 'کدام کلمه را شنیدی؟',
    options: ['вдова', 'родственник', 'сирота', 'близнец'],
    answer: 'сирота'
  },
  {
    type: 'audio',
    speak: 'вдова',
    question: 'کدام کلمه را شنیدی؟',
    options: ['родственник', 'вдова', 'сирота', 'невеста'],
    answer: 'вдова'
  },
  {
    type: 'audio',
    speak: 'невеста',
    question: 'کدام کلمه را شنیدی؟',
    options: ['близнец', 'вдова', 'невеста', 'родственник'],
    answer: 'невеста'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'родственник',
    image: '../../../media/a2/family/relative.png',
    meaning: 'خویشاوند'
  },
  {
    type: 'speak',
    word: 'близнец',
    image: '../../../media/a2/family/twin.png',
    meaning: 'دوقلو'
  },
  {
    type: 'speak',
    word: 'сирота',
    image: '../../../media/a2/family/orphan.png',
    meaning: 'یتیم'
  },
  {
    type: 'speak',
    word: 'вдова',
    image: '../../../media/a2/family/widow.png',
    meaning: 'بیوه زن'
  },
  {
    type: 'speak',
    word: 'невеста',
    image: '../../../media/a2/family/bride.png',
    meaning: 'عروس'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Он мой родственник',
    question: 'جمله روسی را بساز:',
    text: 'او خویشاوند من است',
    words: ['мой', 'родственник', 'Он'],
    answer: ['Он', 'мой', 'родственник']
  },
  {
    type: 'build-ru',
    speak: 'Он близнец',
    question: 'جمله روسی را بساز:',
    text: 'او دوقلو است',
    words: ['близнец', 'Он'],
    answer: ['Он', 'близнец']
  },
  {
    type: 'build-ru',
    speak: 'Она сирота',
    question: 'جمله روسی را بساز:',
    text: 'او یتیم است',
    words: ['сирота', 'Она'],
    answer: ['Она', 'сирота']
  },
  {
    type: 'build-ru',
    speak: 'Она вдова',
    question: 'جمله روسی را بساز:',
    text: 'او بیوه است',
    words: ['вдова', 'Она'],
    answer: ['Она', 'вдова']
  },
  {
    type: 'build-ru',
    speak: 'Она невеста',
    question: 'جمله روسی را بساز:',
    text: 'او عروس است',
    words: ['невеста', 'Она'],
    answer: ['Она', 'невеста']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Он мой родственник',
    question: 'ترجمه را بساز:',
    text: 'Он мой родственник',
    words: ['است', 'خویشاوند', 'من', 'او'],
    answer: ['او', 'خویشاوند', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он близнец',
    question: 'ترجمه را بساز:',
    text: 'Он близнец',
    words: ['است', 'دوقلو', 'او'],
    answer: ['او', 'دوقلو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Она сирота',
    question: 'ترجمه را بساز:',
    text: 'Она сирота',
    words: ['است', 'یتیم', 'او'],
    answer: ['او', 'یتیم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Она вдова',
    question: 'ترجمه را بساز:',
    text: 'Она вдова',
    words: ['است', 'بیوه', 'او'],
    answer: ['او', 'بیوه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Она невеста',
    question: 'ترجمه را بساز:',
    text: 'Она невеста',
    words: ['است', 'عروس', 'او'],
    answer: ['او', 'عروس', 'است']
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