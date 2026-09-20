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

// ===== سوالات درس ۳۷ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "たき" است؟',
    speak: 'たき',
    options: [
      { text: 'たき', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'かざん', image: '../../../media/a2/nature/volcano.png' },
      { text: 'ひょうが', image: '../../../media/a2/nature/glacier.png' },
      { text: 'きょうこく', image: '../../../media/a2/nature/canyon.png' }
    ],
    answer: 'たき'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かざん" است؟',
    speak: 'かざん',
    options: [
      { text: 'どうくつ', image: '../../../media/a2/nature/cave.png' },
      { text: 'かざん', image: '../../../media/a2/nature/volcano.png' },
      { text: 'たき', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'ひょうが', image: '../../../media/a2/nature/glacier.png' }
    ],
    answer: 'かざん'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ひょうが" است؟',
    speak: 'ひょうが',
    options: [
      { text: 'たき', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'ひょうが', image: '../../../media/a2/nature/glacier.png' },
      { text: 'きょうこく', image: '../../../media/a2/nature/canyon.png' },
      { text: 'かざん', image: '../../../media/a2/nature/volcano.png' }
    ],
    answer: 'ひょうが'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "きょうこく" است؟',
    speak: 'きょうこく',
    options: [
      { text: 'かざん', image: '../../../media/a2/nature/volcano.png' },
      { text: 'たき', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'どうくつ', image: '../../../media/a2/nature/cave.png' },
      { text: 'きょうこく', image: '../../../media/a2/nature/canyon.png' }
    ],
    answer: 'きょうこく'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "どうくつ" است؟',
    speak: 'どうくつ',
    options: [
      { text: 'どうくつ', image: '../../../media/a2/nature/cave.png' },
      { text: 'ひょうが', image: '../../../media/a2/nature/glacier.png' },
      { text: 'かざん', image: '../../../media/a2/nature/volcano.png' },
      { text: 'たき', image: '../../../media/a2/nature/waterfall.png' }
    ],
    answer: 'どうくつ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/waterfall.png',
    options: ['たき', 'かざん', 'ひょうが', 'きょうこく'],
    answer: 'たき'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/volcano.png',
    options: ['たき', 'かざん', 'ひょうが', 'どうくつ'],
    answer: 'かざん'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/glacier.png',
    options: ['どうくつ', 'たき', 'ひょうが', 'かざん'],
    answer: 'ひょうが'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/canyon.png',
    options: ['ひょうが', 'かざん', 'きょうこく', 'たき'],
    answer: 'きょうこく'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cave.png',
    options: ['たき', 'きょうこく', 'かざん', 'どうくつ'],
    answer: 'どうくつ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'たき',
    question: 'کدام کلمه را شنیدی؟',
    options: ['たき', 'かざん', 'ひょうが', 'きょうこく'],
    answer: 'たき'
  },
  {
    type: 'audio',
    speak: 'かざん',
    question: 'کدام کلمه را شنیدی؟',
    options: ['どうくつ', 'かざん', 'たき', 'ひょうが'],
    answer: 'かざん'
  },
  {
    type: 'audio',
    speak: 'ひょうが',
    question: 'کدام کلمه را شنیدی؟',
    options: ['たき', 'ひょうが', 'きょうこく', 'かざん'],
    answer: 'ひょうが'
  },
  {
    type: 'audio',
    speak: 'きょうこく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かざん', 'たき', 'どうくつ', 'きょうこく'],
    answer: 'きょうこく'
  },
  {
    type: 'audio',
    speak: 'どうくつ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['どうくつ', 'きょうこく', 'たき', 'かざん'],
    answer: 'どうくつ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'たき',
    image: '../../../media/a2/nature/waterfall.png',
    meaning: 'آبشار'
  },
  {
    type: 'speak',
    word: 'かざん',
    image: '../../../media/a2/nature/volcano.png',
    meaning: 'آتشفشان'
  },
  {
    type: 'speak',
    word: 'ひょうが',
    image: '../../../media/a2/nature/glacier.png',
    meaning: 'یخچال طبیعی'
  },
  {
    type: 'speak',
    word: 'きょうこく',
    image: '../../../media/a2/nature/canyon.png',
    meaning: 'دره'
  },
  {
    type: 'speak',
    word: 'どうくつ',
    image: '../../../media/a2/nature/cave.png',
    meaning: 'غار'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'たきを見ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'آبشار را می‌بینم',
    words: ['ます', '見', 'を', 'たき'],
    answer: ['たき', 'を', '見', 'ます']
  },
  {
    type: 'build-it',
    speak: 'かざんは危ないです',
    question: 'جمله ژاپنی را بساز:',
    text: 'آتشفشان خطرناک است',
    words: ['です', '危ない', 'は', 'かざん'],
    answer: ['かざん', 'は', '危ない', 'です']
  },
  {
    type: 'build-it',
    speak: 'ひょうがは寒いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'یخچال طبیعی سرد است',
    words: ['です', '寒い', 'は', 'ひょうが'],
    answer: ['ひょうが', 'は', '寒い', 'です']
  },
  {
    type: 'build-it',
    speak: 'きょうこくを歩きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'در دره قدم می‌زنم',
    words: ['ます', '歩き', 'を', 'きょうこく'],
    answer: ['きょうこく', 'を', '歩き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'どうくつに入ります',
    question: 'جمله ژاپنی را بساز:',
    text: 'وارد غار می‌شوم',
    words: ['ます', '入り', 'に', 'どうくつ'],
    answer: ['どうくつ', 'に', '入り', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'たきを見ます',
    question: 'ترجمه را بساز:',
    text: 'たきを見ます',
    words: ['آبشار', 'را', 'می‌بینم'],
    answer: ['آبشار', 'را', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'かざんは危ないです',
    question: 'ترجمه را بساز:',
    text: 'かざんは危ないです',
    words: ['آتشفشان', 'خطرناک', 'است'],
    answer: ['آتشفشان', 'خطرناک', 'است']
  },
  {
    type: 'build-fa',
    speak: 'ひょうがは寒いです',
    question: 'ترجمه را بساز:',
    text: 'ひょうがは寒いです',
    words: ['یخچال طبیعی', 'سرد', 'است'],
    answer: ['یخچال طبیعی', 'سرد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'きょうこくを歩きます',
    question: 'ترجمه را بساز:',
    text: 'きょうこくを歩きます',
    words: ['در', 'دره', 'قدم', 'می‌زنم'],
    answer: ['در', 'دره', 'قدم', 'می‌زنم']
  },
  {
    type: 'build-fa',
    speak: 'どうくつに入ります',
    question: 'ترجمه را بساز:',
    text: 'どうくつに入ります',
    words: ['وارد', 'غار', 'می‌شوم'],
    answer: ['وارد', 'غار', 'می‌شوم']
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