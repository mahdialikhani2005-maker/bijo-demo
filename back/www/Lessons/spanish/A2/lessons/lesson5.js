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

// ===== سوالات درس ۵ - اسپانیایی به فارسی (تبارشناسی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "el antepasado" است؟',
    speak: 'el antepasado',
    options: [
      { text: 'el antepasado', image: '../../../media/a2/family/ancestor.png' },
      { text: 'el descendiente', image: '../../../media/a2/family/descendant.png' },
      { text: 'el hermano', image: '../../../media/a2/family/sibling.png' },
      { text: 'el prometido', image: '../../../media/a2/family/fiance.png' }
    ],
    answer: 'el antepasado'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el descendiente" است؟',
    speak: 'el descendiente',
    options: [
      { text: 'el antepasado', image: '../../../media/a2/family/ancestor.png' },
      { text: 'el descendiente', image: '../../../media/a2/family/descendant.png' },
      { text: 'la prometida', image: '../../../media/a2/family/fiancee.png' },
      { text: 'el hermano', image: '../../../media/a2/family/sibling.png' }
    ],
    answer: 'el descendiente'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el hermano/hermana" است؟',
    speak: 'el hermano',
    options: [
      { text: 'el antepasado', image: '../../../media/a2/family/ancestor.png' },
      { text: 'el prometido', image: '../../../media/a2/family/fiance.png' },
      { text: 'el hermano', image: '../../../media/a2/family/sibling.png' },
      { text: 'el descendiente', image: '../../../media/a2/family/descendant.png' }
    ],
    answer: 'el hermano'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "el prometido" است؟',
    speak: 'el prometido',
    options: [
      { text: 'la prometida', image: '../../../media/a2/family/fiancee.png' },
      { text: 'el hermano', image: '../../../media/a2/family/sibling.png' },
      { text: 'el prometido', image: '../../../media/a2/family/fiance.png' },
      { text: 'el antepasado', image: '../../../media/a2/family/ancestor.png' }
    ],
    answer: 'el prometido'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la prometida" است؟',
    speak: 'la prometida',
    options: [
      { text: 'el prometido', image: '../../../media/a2/family/fiance.png' },
      { text: 'la prometida', image: '../../../media/a2/family/fiancee.png' },
      { text: 'el antepasado', image: '../../../media/a2/family/ancestor.png' },
      { text: 'el descendiente', image: '../../../media/a2/family/descendant.png' }
    ],
    answer: 'la prometida'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/ancestor.png',
    options: ['el antepasado', 'el descendiente', 'el hermano', 'el prometido'],
    answer: 'el antepasado'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/descendant.png',
    options: ['el antepasado', 'la prometida', 'el descendiente', 'el hermano'],
    answer: 'el descendiente'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/sibling.png',
    options: ['el antepasado', 'el prometido', 'el hermano', 'el descendiente'],
    answer: 'el hermano'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/fiance.png',
    options: ['la prometida', 'el hermano', 'el prometido', 'el antepasado'],
    answer: 'el prometido'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/fiancee.png',
    options: ['el prometido', 'la prometida', 'el antepasado', 'el descendiente'],
    answer: 'la prometida'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'el antepasado',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el antepasado', 'el descendiente', 'el hermano', 'el prometido'],
    answer: 'el antepasado'
  },
  {
    type: 'audio',
    speak: 'el descendiente',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el antepasado', 'la prometida', 'el descendiente', 'el hermano'],
    answer: 'el descendiente'
  },
  {
    type: 'audio',
    speak: 'el hermano',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el antepasado', 'el prometido', 'el hermano', 'el descendiente'],
    answer: 'el hermano'
  },
  {
    type: 'audio',
    speak: 'el prometido',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la prometida', 'el hermano', 'el prometido', 'el antepasado'],
    answer: 'el prometido'
  },
  {
    type: 'audio',
    speak: 'la prometida',
    question: 'کدام کلمه را شنیدی؟',
    options: ['el prometido', 'la prometida', 'el antepasado', 'el descendiente'],
    answer: 'la prometida'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'el antepasado',
    image: '../../../media/a2/family/ancestor.png',
    meaning: 'جد / نیا'
  },
  {
    type: 'speak',
    word: 'el descendiente',
    image: '../../../media/a2/family/descendant.png',
    meaning: 'فرزند / نسل بعد'
  },
  {
    type: 'speak',
    word: 'el hermano/hermana',
    image: '../../../media/a2/family/sibling.png',
    meaning: 'خواهر یا برادر'
  },
  {
    type: 'speak',
    word: 'el prometido',
    image: '../../../media/a2/family/fiance.png',
    meaning: 'نامزد (مرد)'
  },
  {
    type: 'speak',
    word: 'la prometida',
    image: '../../../media/a2/family/fiancee.png',
    meaning: 'نامزد (زن)'
  },

  // ===== بخش ۵: BUILD ES (ساخت جمله اسپانیایی) =====
  {
    type: 'build-es',
    speak: 'Él es mi antepasado',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او جد من است',
    words: ['mi', 'antepasado', 'es', 'Él'],
    answer: ['Él', 'es', 'mi', 'antepasado']
  },
  {
    type: 'build-es',
    speak: 'Él es descendiente',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او یک فرزند است',
    words: ['descendiente', 'es', 'Él'],
    answer: ['Él', 'es', 'descendiente']
  },
  {
    type: 'build-es',
    speak: 'Tengo un hermano',
    question: 'جمله اسپانیایی را بساز:',
    text: 'من یک برادر دارم',
    words: ['hermano', 'un', 'Tengo'],
    answer: ['Tengo', 'un', 'hermano']
  },
  {
    type: 'build-es',
    speak: 'Él es mi prometido',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او نامزد (مرد) من است',
    words: ['mi', 'prometido', 'es', 'Él'],
    answer: ['Él', 'es', 'mi', 'prometido']
  },
  {
    type: 'build-es',
    speak: 'Ella es mi prometida',
    question: 'جمله اسپانیایی را بساز:',
    text: 'او نامزد (زن) من است',
    words: ['mi', 'prometida', 'es', 'Ella'],
    answer: ['Ella', 'es', 'mi', 'prometida']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Él es mi antepasado',
    question: 'ترجمه را بساز:',
    text: 'Él es mi antepasado',
    words: ['است', 'جد', 'من', 'او'],
    answer: ['او', 'جد', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Él es descendiente',
    question: 'ترجمه را بساز:',
    text: 'Él es descendiente',
    words: ['است', 'فرزند', 'او'],
    answer: ['او', 'فرزند', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Tengo un hermano',
    question: 'ترجمه را بساز:',
    text: 'Tengo un hermano',
    words: ['دارم', 'برادر', 'یک', 'من'],
    answer: ['من', 'یک', 'برادر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Él es mi prometido',
    question: 'ترجمه را بساز:',
    text: 'Él es mi prometido',
    words: ['است', 'نامزد', 'من', 'او'],
    answer: ['او', 'نامزد', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Ella es mi prometida',
    question: 'ترجمه را بساز:',
    text: 'Ella es mi prometida',
    words: ['است', 'نامزد', 'من', 'او'],
    answer: ['او', 'نامزد', 'من', 'است']
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