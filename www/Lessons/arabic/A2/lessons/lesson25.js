let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع ضبط صدا =====
function startRecording(targetWord) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("متصفحك لا يدعم التسجيل الصوتي. يرجى استخدام Chrome.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ar-SA';
  recognition.continuous = false;
  recognition.interimResults = false;

  const recordBtn = document.getElementById('record-btn');
  const statusText = document.getElementById('record-status');

  if (isRecording) {
    recognition.stop();
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 سجّل';
    if (statusText) statusText.textContent = 'انقر للتسجيل';
    return;
  }

  isRecording = true;
  if (recordBtn) recordBtn.textContent = '⏹️ أوقف';
  if (statusText) statusText.textContent = '⏳ جاري الاستماع...';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    const targetClean = targetWord.replace(/\s/g, '');
    const transcriptClean = transcript.replace(/\s/g, '');

    if (transcriptClean === targetClean || transcript.includes(targetWord) || targetWord.includes(transcript)) {
      if (statusText) statusText.textContent = '✅ ممتاز! صحيح! 🎉';
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
      if (statusText) statusText.textContent = '❌ خطأ! حاول مرة أخرى. الكلمة: ' + targetWord;
      if (typeof loseHeart === 'function') {
        loseHeart();
      }
      const heartElement = document.getElementById('heart-count');
      if (heartElement && typeof getHearts === 'function') {
        heartElement.textContent = getHearts();
      }
    }
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 سجّل';
  };

  recognition.onerror = function(event) {
    if (statusText) statusText.textContent = '❌ خطأ: ' + event.error;
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 سجّل';
  };

  recognition.onend = function() {
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 سجّل';
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
      alert('لقد نفدت قلوبك! يرجى الانتظار أو شراء قلوب.');
      window.location.href = '../../../home.html';
    }
  }
};

// ===== سوالات درس ۲۵ - عربی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'أي صورة لـ "توست"؟',
    speak: 'توست',
    options: [
      { text: 'حبوب الإفطار', image: '../../../media/a2/food/cereal.png' },
      { text: 'توست', image: '../../../media/a2/food/toast.png' },
      { text: 'شوفان', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'مربى', image: '../../../media/a2/food/jam.png' }
    ],
    answer: 'توست'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "حبوب الإفطار"؟',
    speak: 'حبوب الإفطار',
    options: [
      { text: 'توست', image: '../../../media/a2/food/toast.png' },
      { text: 'حبوب الإفطار', image: '../../../media/a2/food/cereal.png' },
      { text: 'عسل', image: '../../../media/a2/food/honey.png' },
      { text: 'شوفان', image: '../../../media/a2/food/oatmeal.png' }
    ],
    answer: 'حبوب الإفطار'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "شوفان"؟',
    speak: 'شوفان',
    options: [
      { text: 'مربى', image: '../../../media/a2/food/jam.png' },
      { text: 'توست', image: '../../../media/a2/food/toast.png' },
      { text: 'شوفان', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'حبوب الإفطار', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'شوفان'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "مربى"؟',
    speak: 'مربى',
    options: [
      { text: 'مربى', image: '../../../media/a2/food/jam.png' },
      { text: 'عسل', image: '../../../media/a2/food/honey.png' },
      { text: 'حبوب الإفطار', image: '../../../media/a2/food/cereal.png' },
      { text: 'توست', image: '../../../media/a2/food/toast.png' }
    ],
    answer: 'مربى'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "عسل"؟',
    speak: 'عسل',
    options: [
      { text: 'شوفان', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'عسل', image: '../../../media/a2/food/honey.png' },
      { text: 'مربى', image: '../../../media/a2/food/jam.png' },
      { text: 'حبوب الإفطار', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'عسل'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/toast.png',
    options: ['حبوب الإفطار', 'توست', 'شوفان', 'مربى'],
    answer: 'توست'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/cereal.png',
    options: ['توست', 'حبوب الإفطار', 'عسل', 'شوفان'],
    answer: 'حبوب الإفطار'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/oatmeal.png',
    options: ['مربى', 'توست', 'شوفان', 'حبوب الإفطار'],
    answer: 'شوفان'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/jam.png',
    options: ['مربى', 'عسل', 'حبوب الإفطار', 'توست'],
    answer: 'مربى'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/honey.png',
    options: ['شوفان', 'عسل', 'مربى', 'حبوب الإفطار'],
    answer: 'عسل'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'توست',
    question: 'أي كلمة سمعت؟',
    options: ['حبوب الإفطار', 'توست', 'شوفان', 'مربى'],
    answer: 'توست'
  },
  {
    type: 'audio',
    speak: 'حبوب الإفطار',
    question: 'أي كلمة سمعت؟',
    options: ['توست', 'حبوب الإفطار', 'عسل', 'شوفان'],
    answer: 'حبوب الإفطار'
  },
  {
    type: 'audio',
    speak: 'شوفان',
    question: 'أي كلمة سمعت؟',
    options: ['مربى', 'توست', 'شوفان', 'حبوب الإفطار'],
    answer: 'شوفان'
  },
  {
    type: 'audio',
    speak: 'مربى',
    question: 'أي كلمة سمعت؟',
    options: ['مربى', 'عسل', 'حبوب الإفطار', 'توست'],
    answer: 'مربى'
  },
  {
    type: 'audio',
    speak: 'عسل',
    question: 'أي كلمة سمعت؟',
    options: ['شوفان', 'عسل', 'مربى', 'حبوب الإفطار'],
    answer: 'عسل'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'توست',
    image: '../../../media/a2/food/toast.png',
    meaning: 'نان تست'
  },
  {
    type: 'speak',
    word: 'حبوب الإفطار',
    image: '../../../media/a2/food/cereal.png',
    meaning: 'غلات صبحانه'
  },
  {
    type: 'speak',
    word: 'شوفان',
    image: '../../../media/a2/food/oatmeal.png',
    meaning: 'بلغور جو'
  },
  {
    type: 'speak',
    word: 'مربى',
    image: '../../../media/a2/food/jam.png',
    meaning: 'مربا'
  },
  {
    type: 'speak',
    word: 'عسل',
    image: '../../../media/a2/food/honey.png',
    meaning: 'عسل'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله عربی) =====
  {
    type: 'build-en',
    speak: 'هذا توست',
    question: 'كون الجملة العربية:',
    text: 'این نان تست است',
    words: ['توست', 'هذا'],
    answer: ['هذا', 'توست']
  },
  {
    type: 'build-en',
    speak: 'هذه حبوب الإفطار',
    question: 'كون الجملة العربية:',
    text: 'این غلات صبحانه است',
    words: ['الإفطار', 'حبوب', 'هذه'],
    answer: ['هذه', 'حبوب', 'الإفطار']
  },
  {
    type: 'build-en',
    speak: 'هذا شوفان',
    question: 'كون الجملة العربية:',
    text: 'این بلغور جو است',
    words: ['شوفان', 'هذا'],
    answer: ['هذا', 'شوفان']
  },
  {
    type: 'build-en',
    speak: 'هذا مربى',
    question: 'كون الجملة العربية:',
    text: 'این مربا است',
    words: ['مربى', 'هذا'],
    answer: ['هذا', 'مربى']
  },
  {
    type: 'build-en',
    speak: 'هذا عسل',
    question: 'كون الجملة العربية:',
    text: 'این عسل است',
    words: ['عسل', 'هذا'],
    answer: ['هذا', 'عسل']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'هذا توست',
    question: 'ترجمه را بساز:',
    text: 'هذا توست',
    words: ['است', 'نان تست', 'این'],
    answer: ['این', 'نان تست', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه حبوب الإفطار',
    question: 'ترجمه را بساز:',
    text: 'هذه حبوب الإفطار',
    words: ['است', 'غلات صبحانه', 'این'],
    answer: ['این', 'غلات صبحانه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا شوفان',
    question: 'ترجمه را بساز:',
    text: 'هذا شوفان',
    words: ['است', 'بلغور جو', 'این'],
    answer: ['این', 'بلغور جو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا مربى',
    question: 'ترجمه را بساز:',
    text: 'هذا مربى',
    words: ['است', 'مربا', 'این'],
    answer: ['این', 'مربا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا عسل',
    question: 'ترجمه را بساز:',
    text: 'هذا عسل',
    words: ['است', 'عسل', 'این'],
    answer: ['این', 'عسل', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 انتهى الدرس! 🎉</h2>
      <p>النقاط المكتسبة: <b>${finalXP}</b></p>
      <a href="../index.html">العودة</a>
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
    title.innerText = '🗣️ قل الكلمة';
    content.innerHTML = `
      <div class="speak-card">
        <img src="${q.image}" alt="${q.word}">
        <div class="word-big">${q.word}</div>
        <div class="word-meaning">${q.meaning}</div>
        <button class="audio-btn" onclick="speak('${q.word}')">🔊 تكرار</button>
        <div class="record-area">
          <button id="record-btn" class="record-btn" onclick="startRecording('${q.word}')">🎤 سجّل</button>
          <div id="record-status" class="record-status">انقر للتسجيل</div>
        </div>
        <div class="skip-area">
          <button class="skip-btn" onclick="skipSpeak()">⏭️ تخطّ (بدون نقاط)</button>
        </div>
      </div>
    `;
    return;
  }

  // ===== بخش IMAGE =====
  if (q.type === 'image') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn repeat-btn" onclick="speak('${q.speak}')">🔊 تكرار الصوت</button>
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
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تكرار</button>
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
    title.innerText = q.question;
    content.innerHTML = `
      <p style="margin-bottom:10px;">${q.text}</p>
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تكرار الجملة</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    
    wordBuilder.innerHTML = '';
    optionsBox.innerHTML = '';
    wordBuilder.classList.remove('hidden');
    wordBuilder.classList.remove('ltr', 'rtl');
    optionsBox.classList.remove('ltr', 'rtl');

    if (q.type === 'build-en') {
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
    alert('❌ خطأ! حاول مرة أخرى.');
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
        <h2>💔 لقد نفدت قلوبك!</h2>
        <p>يجب أن تنتظر حتى تعود القلوب.</p>
        <a href="../index.html">العودة</a>
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
    alert('❌ خطأ! حاول مرة أخرى.');
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
        <h2>💔 لقد نفدت قلوبك!</h2>
        <p>يجب أن تنتظر حتى تعود القلوب.</p>
        <a href="../index.html">العودة</a>
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