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

// ===== سوالات درس ۵۴ - عربی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'أي صورة لـ "ميناء"؟',
    speak: 'ميناء',
    options: [
      { text: 'مرسى', image: '../../../media/a2/travel/port.png' },
      { text: 'ميناء', image: '../../../media/a2/travel/harbor.png' },
      { text: 'محطة', image: '../../../media/a2/travel/terminal.png' },
      { text: 'بوابة', image: '../../../media/a2/travel/gate.png' }
    ],
    answer: 'ميناء'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "مرسى"؟',
    speak: 'مرسى',
    options: [
      { text: 'ميناء', image: '../../../media/a2/travel/harbor.png' },
      { text: 'مرسى', image: '../../../media/a2/travel/port.png' },
      { text: 'طاقم', image: '../../../media/a2/travel/crew.png' },
      { text: 'محطة', image: '../../../media/a2/travel/terminal.png' }
    ],
    answer: 'مرسى'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "محطة"؟',
    speak: 'محطة',
    options: [
      { text: 'بوابة', image: '../../../media/a2/travel/gate.png' },
      { text: 'ميناء', image: '../../../media/a2/travel/harbor.png' },
      { text: 'محطة', image: '../../../media/a2/travel/terminal.png' },
      { text: 'مرسى', image: '../../../media/a2/travel/port.png' }
    ],
    answer: 'محطة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "بوابة"؟',
    speak: 'بوابة',
    options: [
      { text: 'بوابة', image: '../../../media/a2/travel/gate.png' },
      { text: 'طاقم', image: '../../../media/a2/travel/crew.png' },
      { text: 'مرسى', image: '../../../media/a2/travel/port.png' },
      { text: 'ميناء', image: '../../../media/a2/travel/harbor.png' }
    ],
    answer: 'بوابة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "طاقم"؟',
    speak: 'طاقم',
    options: [
      { text: 'محطة', image: '../../../media/a2/travel/terminal.png' },
      { text: 'طاقم', image: '../../../media/a2/travel/crew.png' },
      { text: 'بوابة', image: '../../../media/a2/travel/gate.png' },
      { text: 'مرسى', image: '../../../media/a2/travel/port.png' }
    ],
    answer: 'طاقم'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/travel/harbor.png',
    options: ['مرسى', 'ميناء', 'محطة', 'بوابة'],
    answer: 'ميناء'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/travel/port.png',
    options: ['ميناء', 'مرسى', 'طاقم', 'محطة'],
    answer: 'مرسى'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/travel/terminal.png',
    options: ['بوابة', 'ميناء', 'محطة', 'مرسى'],
    answer: 'محطة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/travel/gate.png',
    options: ['بوابة', 'طاقم', 'مرسى', 'ميناء'],
    answer: 'بوابة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/travel/crew.png',
    options: ['محطة', 'طاقم', 'بوابة', 'مرسى'],
    answer: 'طاقم'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ميناء',
    question: 'أي كلمة سمعت؟',
    options: ['مرسى', 'ميناء', 'محطة', 'بوابة'],
    answer: 'ميناء'
  },
  {
    type: 'audio',
    speak: 'مرسى',
    question: 'أي كلمة سمعت؟',
    options: ['ميناء', 'مرسى', 'طاقم', 'محطة'],
    answer: 'مرسى'
  },
  {
    type: 'audio',
    speak: 'محطة',
    question: 'أي كلمة سمعت؟',
    options: ['بوابة', 'ميناء', 'محطة', 'مرسى'],
    answer: 'محطة'
  },
  {
    type: 'audio',
    speak: 'بوابة',
    question: 'أي كلمة سمعت؟',
    options: ['بوابة', 'طاقم', 'مرسى', 'ميناء'],
    answer: 'بوابة'
  },
  {
    type: 'audio',
    speak: 'طاقم',
    question: 'أي كلمة سمعت؟',
    options: ['محطة', 'طاقم', 'بوابة', 'مرسى'],
    answer: 'طاقم'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ميناء',
    image: '../../../media/a2/travel/harbor.png',
    meaning: 'بندر'
  },
  {
    type: 'speak',
    word: 'مرسى',
    image: '../../../media/a2/travel/port.png',
    meaning: 'بندرگاه'
  },
  {
    type: 'speak',
    word: 'محطة',
    image: '../../../media/a2/travel/terminal.png',
    meaning: 'ترمینال'
  },
  {
    type: 'speak',
    word: 'بوابة',
    image: '../../../media/a2/travel/gate.png',
    meaning: 'دروازه / گیت'
  },
  {
    type: 'speak',
    word: 'طاقم',
    image: '../../../media/a2/travel/crew.png',
    meaning: 'خدمه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله عربی) =====
  {
    type: 'build-en',
    speak: 'هذا ميناء',
    question: 'كون الجملة العربية:',
    text: 'این بندر است',
    words: ['ميناء', 'هذا'],
    answer: ['هذا', 'ميناء']
  },
  {
    type: 'build-en',
    speak: 'هذا مرسى',
    question: 'كون الجملة العربية:',
    text: 'این بندرگاه است',
    words: ['مرسى', 'هذا'],
    answer: ['هذا', 'مرسى']
  },
  {
    type: 'build-en',
    speak: 'هذه محطة',
    question: 'كون الجملة العربية:',
    text: 'این ترمینال است',
    words: ['محطة', 'هذه'],
    answer: ['هذه', 'محطة']
  },
  {
    type: 'build-en',
    speak: 'هذه بوابة',
    question: 'كون الجملة العربية:',
    text: 'این دروازه است',
    words: ['بوابة', 'هذه'],
    answer: ['هذه', 'بوابة']
  },
  {
    type: 'build-en',
    speak: 'هذا طاقم',
    question: 'كون الجملة العربية:',
    text: 'این خدمه است',
    words: ['طاقم', 'هذا'],
    answer: ['هذا', 'طاقم']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'هذا ميناء',
    question: 'ترجمه را بساز:',
    text: 'هذا ميناء',
    words: ['است', 'بندر', 'این'],
    answer: ['این', 'بندر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا مرسى',
    question: 'ترجمه را بساز:',
    text: 'هذا مرسى',
    words: ['است', 'بندرگاه', 'این'],
    answer: ['این', 'بندرگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه محطة',
    question: 'ترجمه را بساز:',
    text: 'هذه محطة',
    words: ['است', 'ترمینال', 'این'],
    answer: ['این', 'ترمینال', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه بوابة',
    question: 'ترجمه را بساز:',
    text: 'هذه بوابة',
    words: ['است', 'دروازه', 'این'],
    answer: ['این', 'دروازه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا طاقم',
    question: 'ترجمه را بساز:',
    text: 'هذا طاقم',
    words: ['است', 'خدمه', 'این'],
    answer: ['این', 'خدمه', 'است']
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