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

// ===== سوالات درس ۱۲ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ホテル" است؟',
    speak: 'ホテル',
    options: [
      { text: 'ホテル', image: '../../../media/a2/city/hotel.png' },
      { text: 'カフェ', image: '../../../media/a2/city/cafe.png' },
      { text: 'パンや', image: '../../../media/a2/city/bakery.png' },
      { text: 'くすりや', image: '../../../media/a2/city/pharmacy.png' }
    ],
    answer: 'ホテル'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "カフェ" است؟',
    speak: 'カフェ',
    options: [
      { text: 'にくや', image: '../../../media/a2/city/butchery.png' },
      { text: 'カフェ', image: '../../../media/a2/city/cafe.png' },
      { text: 'ホテル', image: '../../../media/a2/city/hotel.png' },
      { text: 'パンや', image: '../../../media/a2/city/bakery.png' }
    ],
    answer: 'カフェ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "パンや" است؟',
    speak: 'パンや',
    options: [
      { text: 'ホテル', image: '../../../media/a2/city/hotel.png' },
      { text: 'パンや', image: '../../../media/a2/city/bakery.png' },
      { text: 'くすりや', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'カフェ', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'パンや'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "くすりや" است؟',
    speak: 'くすりや',
    options: [
      { text: 'カフェ', image: '../../../media/a2/city/cafe.png' },
      { text: 'ホテル', image: '../../../media/a2/city/hotel.png' },
      { text: 'パンや', image: '../../../media/a2/city/bakery.png' },
      { text: 'くすりや', image: '../../../media/a2/city/pharmacy.png' }
    ],
    answer: 'くすりや'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "にくや" است؟',
    speak: 'にくや',
    options: [
      { text: 'にくや', image: '../../../media/a2/city/butchery.png' },
      { text: 'くすりや', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'ホテル', image: '../../../media/a2/city/hotel.png' },
      { text: 'カフェ', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'にくや'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/hotel.png',
    options: ['ホテル', 'カフェ', 'パンや', 'くすりや'],
    answer: 'ホテル'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/cafe.png',
    options: ['ホテル', 'カフェ', 'パンや', 'にくや'],
    answer: 'カフェ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bakery.png',
    options: ['にくや', 'ホテル', 'パンや', 'カフェ'],
    answer: 'パンや'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/pharmacy.png',
    options: ['パンや', 'カフェ', 'くすりや', 'ホテル'],
    answer: 'くすりや'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/butchery.png',
    options: ['ホテル', 'くすりや', 'カフェ', 'にくや'],
    answer: 'にくや'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ホテル',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ホテル', 'カフェ', 'パンや', 'くすりや'],
    answer: 'ホテル'
  },
  {
    type: 'audio',
    speak: 'カフェ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['にくや', 'カフェ', 'ホテル', 'パンや'],
    answer: 'カフェ'
  },
  {
    type: 'audio',
    speak: 'パンや',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ホテル', 'パンや', 'くすりや', 'カフェ'],
    answer: 'パンや'
  },
  {
    type: 'audio',
    speak: 'くすりや',
    question: 'کدام کلمه را شنیدی؟',
    options: ['カフェ', 'ホテル', 'パンや', 'くすりや'],
    answer: 'くすりや'
  },
  {
    type: 'audio',
    speak: 'にくや',
    question: 'کدام کلمه را شنیدی؟',
    options: ['にくや', 'くすりや', 'ホテル', 'カフェ'],
    answer: 'にくや'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ホテル',
    image: '../../../media/a2/city/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: 'カフェ',
    image: '../../../media/a2/city/cafe.png',
    meaning: 'کافه'
  },
  {
    type: 'speak',
    word: 'パンや',
    image: '../../../media/a2/city/bakery.png',
    meaning: 'نانوایی'
  },
  {
    type: 'speak',
    word: 'くすりや',
    image: '../../../media/a2/city/pharmacy.png',
    meaning: 'داروخانه'
  },
  {
    type: 'speak',
    word: 'にくや',
    image: '../../../media/a2/city/butchery.png',
    meaning: 'قصابی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '私はホテルに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'من به هتل می‌روم',
    words: ['ます', '行き', 'に', 'ホテル', '私', 'は'],
    answer: ['私', 'は', 'ホテル', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: '私はカフェに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'من به کافه می‌روم',
    words: ['ます', '行き', 'に', 'カフェ', '私', 'は'],
    answer: ['私', 'は', 'カフェ', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: '私はパンやに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'من به نانوایی می‌روم',
    words: ['ます', '行き', 'に', 'パンや', '私', 'は'],
    answer: ['私', 'は', 'パンや', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: '私はくすりやに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'من به داروخانه می‌روم',
    words: ['ます', '行き', 'に', 'くすりや', '私', 'は'],
    answer: ['私', 'は', 'くすりや', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: '私はにくやに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'من به قصابی می‌روم',
    words: ['ます', '行き', 'に', 'にくや', '私', 'は'],
    answer: ['私', 'は', 'にくや', 'に', '行き', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '私はホテルに行きます',
    question: 'ترجمه را بساز:',
    text: '私はホテルに行きます',
    words: ['من', 'به', 'هتل', 'می‌روم'],
    answer: ['من', 'به', 'هتل', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: '私はカフェに行きます',
    question: 'ترجمه را بساز:',
    text: '私はカフェに行きます',
    words: ['من', 'به', 'کافه', 'می‌روم'],
    answer: ['من', 'به', 'کافه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: '私はパンやに行きます',
    question: 'ترجمه را بساز:',
    text: '私はパンやに行きます',
    words: ['من', 'به', 'نانوایی', 'می‌روم'],
    answer: ['من', 'به', 'نانوایی', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: '私はくすりやに行きます',
    question: 'ترجمه را بساز:',
    text: '私はくすりやに行きます',
    words: ['من', 'به', 'داروخانه', 'می‌روم'],
    answer: ['من', 'به', 'داروخانه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: '私はにくやに行きます',
    question: 'ترجمه را بساز:',
    text: '私はにくやに行きます',
    words: ['من', 'به', 'قصابی', 'می‌روم'],
    answer: ['من', 'به', 'قصابی', 'می‌روم']
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