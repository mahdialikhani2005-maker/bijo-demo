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

// ===== سوالات درس ۶۰ - عربی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'أي صورة لـ "جهاز"؟',
    speak: 'جهاز',
    options: [
      { text: 'أداة', image: '../../../media/a2/technology/gadget.png' },
      { text: 'جهاز', image: '../../../media/a2/technology/device.png' },
      { text: 'روبوت', image: '../../../media/a2/technology/robot.png' },
      { text: 'طائرة بدون طيّار', image: '../../../media/a2/technology/drone.png' }
    ],
    answer: 'جهاز'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "أداة"؟',
    speak: 'أداة',
    options: [
      { text: 'جهاز', image: '../../../media/a2/technology/device.png' },
      { text: 'أداة', image: '../../../media/a2/technology/gadget.png' },
      { text: 'ساعة ذكية', image: '../../../media/a2/technology/smartwatch.png' },
      { text: 'روبوت', image: '../../../media/a2/technology/robot.png' }
    ],
    answer: 'أداة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "روبوت"؟',
    speak: 'روبوت',
    options: [
      { text: 'طائرة بدون طيّار', image: '../../../media/a2/technology/drone.png' },
      { text: 'جهاز', image: '../../../media/a2/technology/device.png' },
      { text: 'روبوت', image: '../../../media/a2/technology/robot.png' },
      { text: 'أداة', image: '../../../media/a2/technology/gadget.png' }
    ],
    answer: 'روبوت'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "طائرة بدون طيّار"؟',
    speak: 'طائرة بدون طيّار',
    options: [
      { text: 'طائرة بدون طيّار', image: '../../../media/a2/technology/drone.png' },
      { text: 'ساعة ذكية', image: '../../../media/a2/technology/smartwatch.png' },
      { text: 'أداة', image: '../../../media/a2/technology/gadget.png' },
      { text: 'جهاز', image: '../../../media/a2/technology/device.png' }
    ],
    answer: 'طائرة بدون طيّار'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "ساعة ذكية"؟',
    speak: 'ساعة ذكية',
    options: [
      { text: 'روبوت', image: '../../../media/a2/technology/robot.png' },
      { text: 'ساعة ذكية', image: '../../../media/a2/technology/smartwatch.png' },
      { text: 'طائرة بدون طيّار', image: '../../../media/a2/technology/drone.png' },
      { text: 'أداة', image: '../../../media/a2/technology/gadget.png' }
    ],
    answer: 'ساعة ذكية'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/technology/device.png',
    options: ['أداة', 'جهاز', 'روبوت', 'طائرة بدون طيّار'],
    answer: 'جهاز'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/technology/gadget.png',
    options: ['جهاز', 'أداة', 'ساعة ذكية', 'روبوت'],
    answer: 'أداة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/technology/robot.png',
    options: ['طائرة بدون طيّار', 'جهاز', 'روبوت', 'أداة'],
    answer: 'روبوت'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/technology/drone.png',
    options: ['طائرة بدون طيّار', 'ساعة ذكية', 'أداة', 'جهاز'],
    answer: 'طائرة بدون طيّار'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/technology/smartwatch.png',
    options: ['روبوت', 'ساعة ذكية', 'طائرة بدون طيّار', 'أداة'],
    answer: 'ساعة ذكية'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'جهاز',
    question: 'أي كلمة سمعت؟',
    options: ['أداة', 'جهاز', 'روبوت', 'طائرة بدون طيّار'],
    answer: 'جهاز'
  },
  {
    type: 'audio',
    speak: 'أداة',
    question: 'أي كلمة سمعت؟',
    options: ['جهاز', 'أداة', 'ساعة ذكية', 'روبوت'],
    answer: 'أداة'
  },
  {
    type: 'audio',
    speak: 'روبوت',
    question: 'أي كلمة سمعت؟',
    options: ['طائرة بدون طيّار', 'جهاز', 'روبوت', 'أداة'],
    answer: 'روبوت'
  },
  {
    type: 'audio',
    speak: 'طائرة بدون طيّار',
    question: 'أي كلمة سمعت؟',
    options: ['طائرة بدون طيّار', 'ساعة ذكية', 'أداة', 'جهاز'],
    answer: 'طائرة بدون طيّار'
  },
  {
    type: 'audio',
    speak: 'ساعة ذكية',
    question: 'أي كلمة سمعت؟',
    options: ['روبوت', 'ساعة ذكية', 'طائرة بدون طيّار', 'أداة'],
    answer: 'ساعة ذكية'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'جهاز',
    image: '../../../media/a2/technology/device.png',
    meaning: 'دستگاه'
  },
  {
    type: 'speak',
    word: 'أداة',
    image: '../../../media/a2/technology/gadget.png',
    meaning: 'ابزار دیجیتال'
  },
  {
    type: 'speak',
    word: 'روبوت',
    image: '../../../media/a2/technology/robot.png',
    meaning: 'ربات'
  },
  {
    type: 'speak',
    word: 'طائرة بدون طيّار',
    image: '../../../media/a2/technology/drone.png',
    meaning: 'پهپاد'
  },
  {
    type: 'speak',
    word: 'ساعة ذكية',
    image: '../../../media/a2/technology/smartwatch.png',
    meaning: 'ساعت هوشمند'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله عربی) =====
  {
    type: 'build-en',
    speak: 'هذا جهاز',
    question: 'كون الجملة العربية:',
    text: 'این دستگاه است',
    words: ['جهاز', 'هذا'],
    answer: ['هذا', 'جهاز']
  },
  {
    type: 'build-en',
    speak: 'هذه أداة',
    question: 'كون الجملة العربية:',
    text: 'این ابزار دیجیتال است',
    words: ['أداة', 'هذه'],
    answer: ['هذه', 'أداة']
  },
  {
    type: 'build-en',
    speak: 'هذا روبوت',
    question: 'كون الجملة العربية:',
    text: 'این ربات است',
    words: ['روبوت', 'هذا'],
    answer: ['هذا', 'روبوت']
  },
  {
    type: 'build-en',
    speak: 'هذه طائرة بدون طيّار',
    question: 'كون الجملة العربية:',
    text: 'این پهپاد است',
    words: ['طيّار', 'بدون', 'طائرة', 'هذه'],
    answer: ['هذه', 'طائرة', 'بدون', 'طيّار']
  },
  {
    type: 'build-en',
    speak: 'هذه ساعة ذكية',
    question: 'كون الجملة العربية:',
    text: 'این ساعت هوشمند است',
    words: ['ذكية', 'ساعة', 'هذه'],
    answer: ['هذه', 'ساعة', 'ذكية']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'هذا جهاز',
    question: 'ترجمه را بساز:',
    text: 'هذا جهاز',
    words: ['است', 'دستگاه', 'این'],
    answer: ['این', 'دستگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه أداة',
    question: 'ترجمه را بساز:',
    text: 'هذه أداة',
    words: ['است', 'ابزار دیجیتال', 'این'],
    answer: ['این', 'ابزار دیجیتال', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا روبوت',
    question: 'ترجمه را بساز:',
    text: 'هذا روبوت',
    words: ['است', 'ربات', 'این'],
    answer: ['این', 'ربات', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه طائرة بدون طيّار',
    question: 'ترجمه را بساز:',
    text: 'هذه طائرة بدون طيّار',
    words: ['است', 'پهپاد', 'این'],
    answer: ['این', 'پهپاد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه ساعة ذكية',
    question: 'ترجمه را بساز:',
    text: 'هذه ساعة ذكية',
    words: ['است', 'ساعت هوشمند', 'این'],
    answer: ['این', 'ساعت هوشمند', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 تهانينا! لقد أكملت جميع الدروس! 🎉</h2>
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