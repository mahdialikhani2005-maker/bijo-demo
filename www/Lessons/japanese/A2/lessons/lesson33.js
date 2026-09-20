let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
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
  recognition.lang = 'ja-JP';
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

// ===== سوالات درس ۳۳ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "せんすいかん" است؟',
    speak: 'せんすいかん',
    options: [
      { text: 'せんすいかん', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'フェリー', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'ヨット', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'カヌー', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: 'せんすいかん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "フェリー" است؟',
    speak: 'フェリー',
    options: [
      { text: 'いかだ', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'フェリー', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'せんすいかん', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'ヨット', image: '../../../media/a2/vehicles/yacht.png' }
    ],
    answer: 'フェリー'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ヨット" است؟',
    speak: 'ヨット',
    options: [
      { text: 'せんすいかん', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'ヨット', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'カヌー', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'フェリー', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: 'ヨット'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "カヌー" است؟',
    speak: 'カヌー',
    options: [
      { text: 'フェリー', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'せんすいかん', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'ヨット', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'カヌー', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: 'カヌー'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "いかだ" است؟',
    speak: 'いかだ',
    options: [
      { text: 'いかだ', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'カヌー', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'せんすいかん', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'フェリー', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: 'いかだ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/submarine.png',
    options: ['せんすいかん', 'フェリー', 'ヨット', 'カヌー'],
    answer: 'せんすいかん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/ferry.png',
    options: ['せんすいかん', 'フェリー', 'ヨット', 'いかだ'],
    answer: 'フェリー'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/yacht.png',
    options: ['いかだ', 'せんすいかん', 'ヨット', 'フェリー'],
    answer: 'ヨット'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/canoe.png',
    options: ['ヨット', 'フェリー', 'カヌー', 'せんすいかん'],
    answer: 'カヌー'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/raft.png',
    options: ['せんすいかん', 'カヌー', 'フェリー', 'いかだ'],
    answer: 'いかだ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'せんすいかん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['せんすいかん', 'フェリー', 'ヨット', 'カヌー'],
    answer: 'せんすいかん'
  },
  {
    type: 'audio',
    speak: 'フェリー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['いかだ', 'フェリー', 'せんすいかん', 'ヨット'],
    answer: 'フェリー'
  },
  {
    type: 'audio',
    speak: 'ヨット',
    question: 'کدام کلمه را شنیدی؟',
    options: ['せんすいかん', 'ヨット', 'カヌー', 'フェリー'],
    answer: 'ヨット'
  },
  {
    type: 'audio',
    speak: 'カヌー',
    question: 'کدام کلمه را شنیدی؟',
    options: ['フェリー', 'せんすいかん', 'ヨット', 'カヌー'],
    answer: 'カヌー'
  },
  {
    type: 'audio',
    speak: 'いかだ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['いかだ', 'カヌー', 'せんすいかん', 'フェリー'],
    answer: 'いかだ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'せんすいかん',
    image: '../../../media/a2/vehicles/submarine.png',
    meaning: 'زیردریایی'
  },
  {
    type: 'speak',
    word: 'フェリー',
    image: '../../../media/a2/vehicles/ferry.png',
    meaning: 'کشتی'
  },
  {
    type: 'speak',
    word: 'ヨット',
    image: '../../../media/a2/vehicles/yacht.png',
    meaning: 'قایق تفریحی'
  },
  {
    type: 'speak',
    word: 'カヌー',
    image: '../../../media/a2/vehicles/canoe.png',
    meaning: 'کانو'
  },
  {
    type: 'speak',
    word: 'いかだ',
    image: '../../../media/a2/vehicles/raft.png',
    meaning: 'قایق بادی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'せんすいかんは海に潜ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'زیردریایی در دریا شیرجه می‌زند',
    words: ['ます', '潜り', 'に', '海', 'は', 'せんすいかん'],
    answer: ['せんすいかん', 'は', '海', 'に', '潜り', 'ます']
  },
  {
    type: 'build-it',
    speak: 'フェリーで島に行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'با کشتی به جزیره می‌روم',
    words: ['ます', '行き', 'に', '島', 'で', 'フェリー'],
    answer: ['フェリー', 'で', '島', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'ヨットで航海します',
    question: 'جمله ژاپنی را بساز:',
    text: 'با قایق تفریحی دریانوردی می‌کنم',
    words: ['ます', '航海', 'で', 'ヨット'],
    answer: ['ヨット', 'で', '航海', 'します']
  },
  {
    type: 'build-it',
    speak: 'カヌーを漕ぎます',
    question: 'جمله ژاپنی را بساز:',
    text: 'کانو پارو می‌زنم',
    words: ['ます', '漕ぎ', 'を', 'カヌー'],
    answer: ['カヌー', 'を', '漕ぎ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'いかだで川を渡ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'با قایق بادی از رودخانه عبور می‌کنم',
    words: ['ます', '渡り', 'を', '川', 'で', 'いかだ'],
    answer: ['いかだ', 'で', '川', 'を', '渡り', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'せんすいかんは海に潜ります',
    question: 'ترجمه را بساز:',
    text: 'せんすいかんは海に潜ります',
    words: ['زیردریایی', 'در', 'دریا', 'شیرجه', 'می‌زند'],
    answer: ['زیردریایی', 'در', 'دریا', 'شیرجه', 'می‌زند']
  },
  {
    type: 'build-fa',
    speak: 'フェリーで島に行きます',
    question: 'ترجمه را بساز:',
    text: 'フェリーで島に行きます',
    words: ['با', 'کشتی', 'به', 'جزیره', 'می‌روم'],
    answer: ['با', 'کشتی', 'به', 'جزیره', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'ヨットで航海します',
    question: 'ترجمه را بساز:',
    text: 'ヨットで航海します',
    words: ['با', 'قایق تفریحی', 'دریانوردی', 'می‌کنم'],
    answer: ['با', 'قایق تفریحی', 'دریانوردی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'カヌーを漕ぎます',
    question: 'ترجمه را بساز:',
    text: 'カヌーを漕ぎます',
    words: ['کانو', 'پارو', 'می‌زنم'],
    answer: ['کانو', 'پارو', 'می‌زنم']
  },
  {
    type: 'build-fa',
    speak: 'いかだで川を渡ります',
    question: 'ترجمه را بساز:',
    text: 'いかだで川を渡ります',
    words: ['با', 'قایق بادی', 'از', 'رودخانه', 'عبور', 'می‌کنم'],
    answer: ['با', 'قایق بادی', 'از', 'رودخانه', 'عبور', 'می‌کنم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 レッスンが終わりました！ 🎉</h2>
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