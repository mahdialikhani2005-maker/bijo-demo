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

// ===== سوالات درس ۳۶ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "かわ" است؟',
    speak: 'かわ',
    options: [
      { text: 'かわ', image: '../../../media/a2/nature/river.png' },
      { text: 'もり', image: '../../../media/a2/nature/forest.png' },
      { text: 'さばく', image: '../../../media/a2/nature/desert.png' },
      { text: 'しま', image: '../../../media/a2/nature/island.png' }
    ],
    answer: 'かわ'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "もり" است؟',
    speak: 'もり',
    options: [
      { text: 'あらし', image: '../../../media/a2/nature/storm.png' },
      { text: 'もり', image: '../../../media/a2/nature/forest.png' },
      { text: 'かわ', image: '../../../media/a2/nature/river.png' },
      { text: 'さばく', image: '../../../media/a2/nature/desert.png' }
    ],
    answer: 'もり'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "さばく" است؟',
    speak: 'さばく',
    options: [
      { text: 'かわ', image: '../../../media/a2/nature/river.png' },
      { text: 'さばく', image: '../../../media/a2/nature/desert.png' },
      { text: 'しま', image: '../../../media/a2/nature/island.png' },
      { text: 'もり', image: '../../../media/a2/nature/forest.png' }
    ],
    answer: 'さばく'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "しま" است؟',
    speak: 'しま',
    options: [
      { text: 'もり', image: '../../../media/a2/nature/forest.png' },
      { text: 'かわ', image: '../../../media/a2/nature/river.png' },
      { text: 'さばく', image: '../../../media/a2/nature/desert.png' },
      { text: 'しま', image: '../../../media/a2/nature/island.png' }
    ],
    answer: 'しま'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "あらし" است؟',
    speak: 'あらし',
    options: [
      { text: 'あらし', image: '../../../media/a2/nature/storm.png' },
      { text: 'しま', image: '../../../media/a2/nature/island.png' },
      { text: 'かわ', image: '../../../media/a2/nature/river.png' },
      { text: 'もり', image: '../../../media/a2/nature/forest.png' }
    ],
    answer: 'あらし'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/river.png',
    options: ['かわ', 'もり', 'さばく', 'しま'],
    answer: 'かわ'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/forest.png',
    options: ['かわ', 'もり', 'さばく', 'あらし'],
    answer: 'もり'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/desert.png',
    options: ['あらし', 'かわ', 'さばく', 'もり'],
    answer: 'さばく'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/island.png',
    options: ['さばく', 'もり', 'しま', 'かわ'],
    answer: 'しま'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/storm.png',
    options: ['かわ', 'あらし', 'もり', 'さばく'],
    answer: 'あらし'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'かわ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かわ', 'もり', 'さばく', 'しま'],
    answer: 'かわ'
  },
  {
    type: 'audio',
    speak: 'もり',
    question: 'کدام کلمه را شنیدی؟',
    options: ['あらし', 'もり', 'かわ', 'さばく'],
    answer: 'もり'
  },
  {
    type: 'audio',
    speak: 'さばく',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かわ', 'さばく', 'しま', 'もり'],
    answer: 'さばく'
  },
  {
    type: 'audio',
    speak: 'しま',
    question: 'کدام کلمه را شنیدی؟',
    options: ['もり', 'かわ', 'さばく', 'しま'],
    answer: 'しま'
  },
  {
    type: 'audio',
    speak: 'あらし',
    question: 'کدام کلمه را شنیدی؟',
    options: ['あらし', 'しま', 'かわ', 'もり'],
    answer: 'あらし'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'かわ',
    image: '../../../media/a2/nature/river.png',
    meaning: 'رودخانه'
  },
  {
    type: 'speak',
    word: 'もり',
    image: '../../../media/a2/nature/forest.png',
    meaning: 'جنگل'
  },
  {
    type: 'speak',
    word: 'さばく',
    image: '../../../media/a2/nature/desert.png',
    meaning: 'بیابان'
  },
  {
    type: 'speak',
    word: 'しま',
    image: '../../../media/a2/nature/island.png',
    meaning: 'جزیره'
  },
  {
    type: 'speak',
    word: 'あらし',
    image: '../../../media/a2/nature/storm.png',
    meaning: 'طوفان'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: 'かわで泳ぎます',
    question: 'جمله ژاپنی را بساز:',
    text: 'در رودخانه شنا می‌کنم',
    words: ['ます', '泳ぎ', 'で', 'かわ'],
    answer: ['かわ', 'で', '泳ぎ', 'ます']
  },
  {
    type: 'build-it',
    speak: 'もりで歩きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'در جنگل پیاده‌روی می‌کنم',
    words: ['ます', '歩き', 'で', 'もり'],
    answer: ['もり', 'で', '歩き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'さばくは暑いです',
    question: 'جمله ژاپنی را بساز:',
    text: 'بیابان گرم است',
    words: ['です', '暑い', 'は', 'さばく'],
    answer: ['さばく', 'は', '暑い', 'です']
  },
  {
    type: 'build-it',
    speak: 'しまに行きます',
    question: 'جمله ژاپنی را بساز:',
    text: 'به جزیره می‌روم',
    words: ['ます', '行き', 'に', 'しま'],
    answer: ['しま', 'に', '行き', 'ます']
  },
  {
    type: 'build-it',
    speak: 'あらしが来ます',
    question: 'جمله ژاپنی را بساز:',
    text: 'طوفان می‌آید',
    words: ['ます', '来', 'が', 'あらし'],
    answer: ['あらし', 'が', '来', 'ます']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'かわで泳ぎます',
    question: 'ترجمه را بساز:',
    text: 'かわで泳ぎます',
    words: ['در', 'رودخانه', 'شنا', 'می‌کنم'],
    answer: ['در', 'رودخانه', 'شنا', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'もりで歩きます',
    question: 'ترجمه را بساز:',
    text: 'もりで歩きます',
    words: ['در', 'جنگل', 'پیاده‌روی', 'می‌کنم'],
    answer: ['در', 'جنگل', 'پیاده‌روی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'さばくは暑いです',
    question: 'ترجمه را بساز:',
    text: 'さばくは暑いです',
    words: ['بیابان', 'گرم', 'است'],
    answer: ['بیابان', 'گرم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'しまに行きます',
    question: 'ترجمه را بساز:',
    text: 'しまに行きます',
    words: ['به', 'جزیره', 'می‌روم'],
    answer: ['به', 'جزیره', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'あらしが来ます',
    question: 'ترجمه را بساز:',
    text: 'あらしが来ます',
    words: ['طوفان', 'می‌آید'],
    answer: ['طوفان', 'می‌آید']
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