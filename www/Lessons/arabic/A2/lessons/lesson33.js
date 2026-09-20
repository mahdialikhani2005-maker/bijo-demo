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

// ===== سوالات درس ۳۳ - عربی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'أي صورة لـ "غواصة"؟',
    speak: 'غواصة',
    options: [
      { text: 'عبّارة', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'غواصة', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'يخت', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'زورق', image: '../../../media/a2/vehicles/canoe.png' }
    ],
    answer: 'غواصة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "عبّارة"؟',
    speak: 'عبّارة',
    options: [
      { text: 'غواصة', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'عبّارة', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'طوافة', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'يخت', image: '../../../media/a2/vehicles/yacht.png' }
    ],
    answer: 'عبّارة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "يخت"؟',
    speak: 'يخت',
    options: [
      { text: 'زورق', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'غواصة', image: '../../../media/a2/vehicles/submarine.png' },
      { text: 'يخت', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'عبّارة', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: 'يخت'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "زورق"؟',
    speak: 'زورق',
    options: [
      { text: 'زورق', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'طوافة', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'عبّارة', image: '../../../media/a2/vehicles/ferry.png' },
      { text: 'غواصة', image: '../../../media/a2/vehicles/submarine.png' }
    ],
    answer: 'زورق'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "طوافة"؟',
    speak: 'طوافة',
    options: [
      { text: 'يخت', image: '../../../media/a2/vehicles/yacht.png' },
      { text: 'طوافة', image: '../../../media/a2/vehicles/raft.png' },
      { text: 'زورق', image: '../../../media/a2/vehicles/canoe.png' },
      { text: 'عبّارة', image: '../../../media/a2/vehicles/ferry.png' }
    ],
    answer: 'طوافة'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/vehicles/submarine.png',
    options: ['عبّارة', 'غواصة', 'يخت', 'زورق'],
    answer: 'غواصة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/vehicles/ferry.png',
    options: ['غواصة', 'عبّارة', 'طوافة', 'يخت'],
    answer: 'عبّارة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/vehicles/yacht.png',
    options: ['زورق', 'غواصة', 'يخت', 'عبّارة'],
    answer: 'يخت'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/vehicles/canoe.png',
    options: ['زورق', 'طوافة', 'عبّارة', 'غواصة'],
    answer: 'زورق'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/vehicles/raft.png',
    options: ['يخت', 'طوافة', 'زورق', 'عبّارة'],
    answer: 'طوافة'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'غواصة',
    question: 'أي كلمة سمعت؟',
    options: ['عبّارة', 'غواصة', 'يخت', 'زورق'],
    answer: 'غواصة'
  },
  {
    type: 'audio',
    speak: 'عبّارة',
    question: 'أي كلمة سمعت؟',
    options: ['غواصة', 'عبّارة', 'طوافة', 'يخت'],
    answer: 'عبّارة'
  },
  {
    type: 'audio',
    speak: 'يخت',
    question: 'أي كلمة سمعت؟',
    options: ['زورق', 'غواصة', 'يخت', 'عبّارة'],
    answer: 'يخت'
  },
  {
    type: 'audio',
    speak: 'زورق',
    question: 'أي كلمة سمعت؟',
    options: ['زورق', 'طوافة', 'عبّارة', 'غواصة'],
    answer: 'زورق'
  },
  {
    type: 'audio',
    speak: 'طوافة',
    question: 'أي كلمة سمعت؟',
    options: ['يخت', 'طوافة', 'زورق', 'عبّارة'],
    answer: 'طوافة'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'غواصة',
    image: '../../../media/a2/vehicles/submarine.png',
    meaning: 'زیردریایی'
  },
  {
    type: 'speak',
    word: 'عبّارة',
    image: '../../../media/a2/vehicles/ferry.png',
    meaning: 'کشتی'
  },
  {
    type: 'speak',
    word: 'يخت',
    image: '../../../media/a2/vehicles/yacht.png',
    meaning: 'قایق تفریحی'
  },
  {
    type: 'speak',
    word: 'زورق',
    image: '../../../media/a2/vehicles/canoe.png',
    meaning: 'کانو'
  },
  {
    type: 'speak',
    word: 'طوافة',
    image: '../../../media/a2/vehicles/raft.png',
    meaning: 'قایق بادی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله عربی) =====
  {
    type: 'build-en',
    speak: 'هذه غواصة',
    question: 'كون الجملة العربية:',
    text: 'این زیردریایی است',
    words: ['غواصة', 'هذه'],
    answer: ['هذه', 'غواصة']
  },
  {
    type: 'build-en',
    speak: 'هذه عبّارة',
    question: 'كون الجملة العربية:',
    text: 'این کشتی است',
    words: ['عبّارة', 'هذه'],
    answer: ['هذه', 'عبّارة']
  },
  {
    type: 'build-en',
    speak: 'هذا يخت',
    question: 'كون الجملة العربية:',
    text: 'این قایق تفریحی است',
    words: ['يخت', 'هذا'],
    answer: ['هذا', 'يخت']
  },
  {
    type: 'build-en',
    speak: 'هذا زورق',
    question: 'كون الجملة العربية:',
    text: 'این کانو است',
    words: ['زورق', 'هذا'],
    answer: ['هذا', 'زورق']
  },
  {
    type: 'build-en',
    speak: 'هذه طوافة',
    question: 'كون الجملة العربية:',
    text: 'این قایق بادی است',
    words: ['طوافة', 'هذه'],
    answer: ['هذه', 'طوافة']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'هذه غواصة',
    question: 'ترجمه را بساز:',
    text: 'هذه غواصة',
    words: ['است', 'زیردریایی', 'این'],
    answer: ['این', 'زیردریایی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه عبّارة',
    question: 'ترجمه را بساز:',
    text: 'هذه عبّارة',
    words: ['است', 'کشتی', 'این'],
    answer: ['این', 'کشتی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا يخت',
    question: 'ترجمه را بساز:',
    text: 'هذا يخت',
    words: ['است', 'قایق تفریحی', 'این'],
    answer: ['این', 'قایق تفریحی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا زورق',
    question: 'ترجمه را بساز:',
    text: 'هذا زورق',
    words: ['است', 'کانو', 'این'],
    answer: ['این', 'کانو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه طوافة',
    question: 'ترجمه را بساز:',
    text: 'هذه طوافة',
    words: ['است', 'قایق بادی', 'این'],
    answer: ['این', 'قایق بادی', 'است']
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