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

// ===== سوالات درس ۲۱ - عربی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'أي صورة لـ "عصير"؟',
    speak: 'عصير',
    options: [
      { text: 'قهوة', image: '../../../media/a2/food/coffee.png' },
      { text: 'عصير', image: '../../../media/a2/food/juice.png' },
      { text: 'شاي', image: '../../../media/a2/food/tea.png' },
      { text: 'شوربة', image: '../../../media/a2/food/soup.png' }
    ],
    answer: 'عصير'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "قهوة"؟',
    speak: 'قهوة',
    options: [
      { text: 'عصير', image: '../../../media/a2/food/juice.png' },
      { text: 'قهوة', image: '../../../media/a2/food/coffee.png' },
      { text: 'كعكة', image: '../../../media/a2/food/cake.png' },
      { text: 'شاي', image: '../../../media/a2/food/tea.png' }
    ],
    answer: 'قهوة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "شاي"؟',
    speak: 'شاي',
    options: [
      { text: 'شوربة', image: '../../../media/a2/food/soup.png' },
      { text: 'عصير', image: '../../../media/a2/food/juice.png' },
      { text: 'شاي', image: '../../../media/a2/food/tea.png' },
      { text: 'قهوة', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'شاي'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "شوربة"؟',
    speak: 'شوربة',
    options: [
      { text: 'شوربة', image: '../../../media/a2/food/soup.png' },
      { text: 'كعكة', image: '../../../media/a2/food/cake.png' },
      { text: 'قهوة', image: '../../../media/a2/food/coffee.png' },
      { text: 'عصير', image: '../../../media/a2/food/juice.png' }
    ],
    answer: 'شوربة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "كعكة"؟',
    speak: 'كعكة',
    options: [
      { text: 'شاي', image: '../../../media/a2/food/tea.png' },
      { text: 'كعكة', image: '../../../media/a2/food/cake.png' },
      { text: 'شوربة', image: '../../../media/a2/food/soup.png' },
      { text: 'قهوة', image: '../../../media/a2/food/coffee.png' }
    ],
    answer: 'كعكة'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/juice.png',
    options: ['قهوة', 'عصير', 'شاي', 'شوربة'],
    answer: 'عصير'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/coffee.png',
    options: ['عصير', 'قهوة', 'كعكة', 'شاي'],
    answer: 'قهوة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/tea.png',
    options: ['شوربة', 'عصير', 'شاي', 'قهوة'],
    answer: 'شاي'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/soup.png',
    options: ['شوربة', 'كعكة', 'قهوة', 'عصير'],
    answer: 'شوربة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/food/cake.png',
    options: ['شاي', 'كعكة', 'شوربة', 'قهوة'],
    answer: 'كعكة'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'عصير',
    question: 'أي كلمة سمعت؟',
    options: ['قهوة', 'عصير', 'شاي', 'شوربة'],
    answer: 'عصير'
  },
  {
    type: 'audio',
    speak: 'قهوة',
    question: 'أي كلمة سمعت؟',
    options: ['عصير', 'قهوة', 'كعكة', 'شاي'],
    answer: 'قهوة'
  },
  {
    type: 'audio',
    speak: 'شاي',
    question: 'أي كلمة سمعت؟',
    options: ['شوربة', 'عصير', 'شاي', 'قهوة'],
    answer: 'شاي'
  },
  {
    type: 'audio',
    speak: 'شوربة',
    question: 'أي كلمة سمعت؟',
    options: ['شوربة', 'كعكة', 'قهوة', 'عصير'],
    answer: 'شوربة'
  },
  {
    type: 'audio',
    speak: 'كعكة',
    question: 'أي كلمة سمعت؟',
    options: ['شاي', 'كعكة', 'شوربة', 'قهوة'],
    answer: 'كعكة'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'عصير',
    image: '../../../media/a2/food/juice.png',
    meaning: 'آبمیوه'
  },
  {
    type: 'speak',
    word: 'قهوة',
    image: '../../../media/a2/food/coffee.png',
    meaning: 'قهوه'
  },
  {
    type: 'speak',
    word: 'شاي',
    image: '../../../media/a2/food/tea.png',
    meaning: 'چای'
  },
  {
    type: 'speak',
    word: 'شوربة',
    image: '../../../media/a2/food/soup.png',
    meaning: 'سوپ'
  },
  {
    type: 'speak',
    word: 'كعكة',
    image: '../../../media/a2/food/cake.png',
    meaning: 'کیک'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله عربی) =====
  {
    type: 'build-en',
    speak: 'هذا عصير',
    question: 'كون الجملة العربية:',
    text: 'این آبمیوه است',
    words: ['عصير', 'هذا'],
    answer: ['هذا', 'عصير']
  },
  {
    type: 'build-en',
    speak: 'هذه قهوة',
    question: 'كون الجملة العربية:',
    text: 'این قهوه است',
    words: ['قهوة', 'هذه'],
    answer: ['هذه', 'قهوة']
  },
  {
    type: 'build-en',
    speak: 'هذا شاي',
    question: 'كون الجملة العربية:',
    text: 'این چای است',
    words: ['شاي', 'هذا'],
    answer: ['هذا', 'شاي']
  },
  {
    type: 'build-en',
    speak: 'هذه شوربة',
    question: 'كون الجملة العربية:',
    text: 'این سوپ است',
    words: ['شوربة', 'هذه'],
    answer: ['هذه', 'شوربة']
  },
  {
    type: 'build-en',
    speak: 'هذه كعكة',
    question: 'كون الجملة العربية:',
    text: 'این کیک است',
    words: ['كعكة', 'هذه'],
    answer: ['هذه', 'كعكة']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'هذا عصير',
    question: 'ترجمه را بساز:',
    text: 'هذا عصير',
    words: ['است', 'آبمیوه', 'این'],
    answer: ['این', 'آبمیوه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه قهوة',
    question: 'ترجمه را بساز:',
    text: 'هذه قهوة',
    words: ['است', 'قهوه', 'این'],
    answer: ['این', 'قهوه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا شاي',
    question: 'ترجمه را بساز:',
    text: 'هذا شاي',
    words: ['است', 'چای', 'این'],
    answer: ['این', 'چای', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه شوربة',
    question: 'ترجمه را بساز:',
    text: 'هذه شوربة',
    words: ['است', 'سوپ', 'این'],
    answer: ['این', 'سوپ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه كعكة',
    question: 'ترجمه را بساز:',
    text: 'هذه كعكة',
    words: ['است', 'کیک', 'این'],
    answer: ['این', 'کیک', 'است']
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