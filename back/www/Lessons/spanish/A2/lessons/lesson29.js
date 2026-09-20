let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
  recognition.lang = 'es-ES';
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

// ===== سوالات درس ۲۹ - اسپانیایی به فارسی (لباس تابستانی و زیر) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "los pantalones cortos" است؟',
    speak: 'los pantalones cortos',
    options: [
      { text: 'los pantalones cortos', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la falda', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'los calcetines', image: '../../../media/a2/clothes/socks.png' },
      { text: 'la ropa interior', image: '../../../media/a2/clothes/underwear.png' }
    ],
    answer: 'los pantalones cortos'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la falda" است؟',
    speak: 'la falda',
    options: [
      { text: 'los pantalones cortos', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la falda', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'el pijama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'los calcetines', image: '../../../media/a2/clothes/socks.png' }
    ],
    answer: 'la falda'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "los calcetines" است؟',
    speak: 'los calcetines',
    options: [
      { text: 'la ropa interior', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'los pantalones cortos', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'los calcetines', image: '../../../media/a2/clothes/socks.png' },
      { text: 'la falda', image: '../../../media/a2/clothes/skirt.png' }
    ],
    answer: 'los calcetines'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la ropa interior" است؟',
    speak: 'la ropa interior',
    options: [
      { text: 'los pantalones cortos', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la ropa interior', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'la falda', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'el pijama', image: '../../../media/a2/clothes/pajama.png' }
    ],
    answer: 'la ropa interior'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el pijama" است؟',
    speak: 'el pijama',
    options: [
      { text: 'los calcetines', image: '../../../media/a2/clothes/socks.png' },
      { text: 'el pijama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'la ropa interior', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'los pantalones cortos', image: '../../../media/a2/clothes/shorts.png' }
    ],
    answer: 'el pijama'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/shorts.png',
    options: ['los pantalones cortos', 'la falda', 'los calcetines', 'la ropa interior'],
    answer: 'los pantalones cortos'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/skirt.png',
    options: ['los pantalones cortos', 'la falda', 'el pijama', 'los calcetines'],
    answer: 'la falda'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/socks.png',
    options: ['la ropa interior', 'los pantalones cortos', 'los calcetines', 'la falda'],
    answer: 'los calcetines'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/underwear.png',
    options: ['los pantalones cortos', 'la ropa interior', 'la falda', 'el pijama'],
    answer: 'la ropa interior'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/pajama.png',
    options: ['los calcetines', 'el pijama', 'la ropa interior', 'los pantalones cortos'],
    answer: 'el pijama'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'los pantalones cortos',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los pantalones cortos', 'la falda', 'los calcetines', 'la ropa interior'],
    answer: 'los pantalones cortos'
  },
  {
    type: 'audio',
    speak: 'la falda',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los pantalones cortos', 'la falda', 'el pijama', 'los calcetines'],
    answer: 'la falda'
  },
  {
    type: 'audio',
    speak: 'los calcetines',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la ropa interior', 'los pantalones cortos', 'los calcetines', 'la falda'],
    answer: 'los calcetines'
  },
  {
    type: 'audio',
    speak: 'la ropa interior',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los pantalones cortos', 'la ropa interior', 'la falda', 'el pijama'],
    answer: 'la ropa interior'
  },
  {
    type: 'audio',
    speak: 'el pijama',
    question: 'کدام کلمه را شنیدی؟',
    options: ['los calcetines', 'el pijama', 'la ropa interior', 'los pantalones cortos'],
    answer: 'el pijama'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'los pantalones cortos',
    image: '../../../media/a2/clothes/shorts.png',
    meaning: 'شورت'
  },
  {
    type: 'speak',
    word: 'la falda',
    image: '../../../media/a2/clothes/skirt.png',
    meaning: 'دامن'
  },
  {
    type: 'speak',
    word: 'los calcetines',
    image: '../../../media/a2/clothes/socks.png',
    meaning: 'جوراب'
  },
  {
    type: 'speak',
    word: 'la ropa interior',
    image: '../../../media/a2/clothes/underwear.png',
    meaning: 'لباس زیر'
  },
  {
    type: 'speak',
    word: 'el pijama',
    image: '../../../media/a2/clothes/pajama.png',
    meaning: 'پیژامه'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Esto son pantalones cortos',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این شورت است',
    words: ['pantalones', 'cortos', 'son', 'Esto'],
    answer: ['Esto', 'son', 'pantalones', 'cortos']
  },
  {
    type: 'build-es',
    speak: 'Esto es una falda',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک دامن است',
    words: ['falda', 'una', 'es', 'Esto'],
    answer: ['Esto', 'es', 'una', 'falda']
  },
  {
    type: 'build-es',
    speak: 'Esto son calcetines',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این جوراب است',
    words: ['calcetines', 'son', 'Esto'],
    answer: ['Esto', 'son', 'calcetines']
  },
  {
    type: 'build-es',
    speak: 'Esto es ropa interior',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این لباس زیر است',
    words: ['ropa', 'interior', 'es', 'Esto'],
    answer: ['Esto', 'es', 'ropa', 'interior']
  },
  {
    type: 'build-es',
    speak: 'Esto es un pijama',
    question: 'جمله اسپانیایی را بساز:',
    text: 'این یک پیژامه است',
    words: ['pijama', 'un', 'es', 'Esto'],
    answer: ['Esto', 'es', 'un', 'pijama']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Esto son pantalones cortos',
    question: 'ترجمه را بساز:',
    text: 'Esto son pantalones cortos',
    words: ['است', 'شورت', 'این'],
    answer: ['این', 'شورت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es una falda',
    question: 'ترجمه را بساز:',
    text: 'Esto es una falda',
    words: ['است', 'دامن', 'یک', 'این'],
    answer: ['این', 'یک', 'دامن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto son calcetines',
    question: 'ترجمه را بساز:',
    text: 'Esto son calcetines',
    words: ['است', 'جوراب', 'این'],
    answer: ['این', 'جوراب', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es ropa interior',
    question: 'ترجمه را بساز:',
    text: 'Esto es ropa interior',
    words: ['است', 'زیر', 'لباس', 'این'],
    answer: ['این', 'لباس', 'زیر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Esto es un pijama',
    question: 'ترجمه را بساز:',
    text: 'Esto es un pijama',
    words: ['است', 'پیژامه', 'یک', 'این'],
    answer: ['این', 'یک', 'پیژامه', 'است']
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

  // ===== بخش BUILD ES / FA =====
  if (q.type === 'build-es' || q.type === 'build-fa') {
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

    if (q.type === 'build-es') {
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