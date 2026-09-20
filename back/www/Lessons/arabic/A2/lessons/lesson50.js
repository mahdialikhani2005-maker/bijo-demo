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

// ===== سوالات درس ۵۰ - عربی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'أي صورة لـ "مقال"؟',
    speak: 'مقال',
    options: [
      { text: 'أطروحة', image: '../../../media/a2/school/thesis.png' },
      { text: 'مقال', image: '../../../media/a2/school/essay.png' },
      { text: 'تقرير', image: '../../../media/a2/school/report.png' },
      { text: 'مشروع', image: '../../../media/a2/school/project.png' }
    ],
    answer: 'مقال'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "أطروحة"؟',
    speak: 'أطروحة',
    options: [
      { text: 'مقال', image: '../../../media/a2/school/essay.png' },
      { text: 'أطروحة', image: '../../../media/a2/school/thesis.png' },
      { text: 'ورشة عمل', image: '../../../media/a2/school/workshop.png' },
      { text: 'تقرير', image: '../../../media/a2/school/report.png' }
    ],
    answer: 'أطروحة'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "تقرير"؟',
    speak: 'تقرير',
    options: [
      { text: 'مشروع', image: '../../../media/a2/school/project.png' },
      { text: 'مقال', image: '../../../media/a2/school/essay.png' },
      { text: 'تقرير', image: '../../../media/a2/school/report.png' },
      { text: 'أطروحة', image: '../../../media/a2/school/thesis.png' }
    ],
    answer: 'تقرير'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "مشروع"؟',
    speak: 'مشروع',
    options: [
      { text: 'مشروع', image: '../../../media/a2/school/project.png' },
      { text: 'ورشة عمل', image: '../../../media/a2/school/workshop.png' },
      { text: 'مقال', image: '../../../media/a2/school/essay.png' },
      { text: 'تقرير', image: '../../../media/a2/school/report.png' }
    ],
    answer: 'مشروع'
  },
  {
    type: 'image',
    question: 'أي صورة لـ "ورشة عمل"؟',
    speak: 'ورشة عمل',
    options: [
      { text: 'أطروحة', image: '../../../media/a2/school/thesis.png' },
      { text: 'ورشة عمل', image: '../../../media/a2/school/workshop.png' },
      { text: 'مشروع', image: '../../../media/a2/school/project.png' },
      { text: 'مقال', image: '../../../media/a2/school/essay.png' }
    ],
    answer: 'ورشة عمل'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/school/essay.png',
    options: ['أطروحة', 'مقال', 'تقرير', 'مشروع'],
    answer: 'مقال'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/school/thesis.png',
    options: ['مقال', 'أطروحة', 'ورشة عمل', 'تقرير'],
    answer: 'أطروحة'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/school/report.png',
    options: ['مشروع', 'مقال', 'تقرير', 'أطروحة'],
    answer: 'تقرير'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/school/project.png',
    options: ['مشروع', 'ورشة عمل', 'مقال', 'تقرير'],
    answer: 'مشروع'
  },
  {
    type: 'word',
    question: 'ما هذه الصورة؟',
    image: '../../../media/a2/school/workshop.png',
    options: ['أطروحة', 'ورشة عمل', 'مشروع', 'مقال'],
    answer: 'ورشة عمل'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'مقال',
    question: 'أي كلمة سمعت؟',
    options: ['أطروحة', 'مقال', 'تقرير', 'مشروع'],
    answer: 'مقال'
  },
  {
    type: 'audio',
    speak: 'أطروحة',
    question: 'أي كلمة سمعت؟',
    options: ['مقال', 'أطروحة', 'ورشة عمل', 'تقرير'],
    answer: 'أطروحة'
  },
  {
    type: 'audio',
    speak: 'تقرير',
    question: 'أي كلمة سمعت؟',
    options: ['مشروع', 'مقال', 'تقرير', 'أطروحة'],
    answer: 'تقرير'
  },
  {
    type: 'audio',
    speak: 'مشروع',
    question: 'أي كلمة سمعت؟',
    options: ['مشروع', 'ورشة عمل', 'مقال', 'تقرير'],
    answer: 'مشروع'
  },
  {
    type: 'audio',
    speak: 'ورشة عمل',
    question: 'أي كلمة سمعت؟',
    options: ['أطروحة', 'ورشة عمل', 'مشروع', 'مقال'],
    answer: 'ورشة عمل'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'مقال',
    image: '../../../media/a2/school/essay.png',
    meaning: 'مقاله'
  },
  {
    type: 'speak',
    word: 'أطروحة',
    image: '../../../media/a2/school/thesis.png',
    meaning: 'پایان‌نامه'
  },
  {
    type: 'speak',
    word: 'تقرير',
    image: '../../../media/a2/school/report.png',
    meaning: 'گزارش'
  },
  {
    type: 'speak',
    word: 'مشروع',
    image: '../../../media/a2/school/project.png',
    meaning: 'پروژه'
  },
  {
    type: 'speak',
    word: 'ورشة عمل',
    image: '../../../media/a2/school/workshop.png',
    meaning: 'کارگاه آموزشی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله عربی) =====
  {
    type: 'build-en',
    speak: 'هذا مقال',
    question: 'كون الجملة العربية:',
    text: 'این مقاله است',
    words: ['مقال', 'هذا'],
    answer: ['هذا', 'مقال']
  },
  {
    type: 'build-en',
    speak: 'هذه أطروحة',
    question: 'كون الجملة العربية:',
    text: 'این پایان‌نامه است',
    words: ['أطروحة', 'هذه'],
    answer: ['هذه', 'أطروحة']
  },
  {
    type: 'build-en',
    speak: 'هذا تقرير',
    question: 'كون الجملة العربية:',
    text: 'این گزارش است',
    words: ['تقرير', 'هذا'],
    answer: ['هذا', 'تقرير']
  },
  {
    type: 'build-en',
    speak: 'هذا مشروع',
    question: 'كون الجملة العربية:',
    text: 'این پروژه است',
    words: ['مشروع', 'هذا'],
    answer: ['هذا', 'مشروع']
  },
  {
    type: 'build-en',
    speak: 'هذه ورشة عمل',
    question: 'كون الجملة العربية:',
    text: 'این کارگاه آموزشی است',
    words: ['عمل', 'ورشة', 'هذه'],
    answer: ['هذه', 'ورشة', 'عمل']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'هذا مقال',
    question: 'ترجمه را بساز:',
    text: 'هذا مقال',
    words: ['است', 'مقاله', 'این'],
    answer: ['این', 'مقاله', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه أطروحة',
    question: 'ترجمه را بساز:',
    text: 'هذه أطروحة',
    words: ['است', 'پایان‌نامه', 'این'],
    answer: ['این', 'پایان‌نامه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا تقرير',
    question: 'ترجمه را بساز:',
    text: 'هذا تقرير',
    words: ['است', 'گزارش', 'این'],
    answer: ['این', 'گزارش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذا مشروع',
    question: 'ترجمه را بساز:',
    text: 'هذا مشروع',
    words: ['است', 'پروژه', 'این'],
    answer: ['این', 'پروژه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'هذه ورشة عمل',
    question: 'ترجمه را بساز:',
    text: 'هذه ورشة عمل',
    words: ['است', 'کارگاه آموزشی', 'این'],
    answer: ['این', 'کارگاه آموزشی', 'است']
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