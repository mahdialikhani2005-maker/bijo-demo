let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
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
  recognition.lang = 'de-DE';
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

// ===== سوالات درس ۴۹ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "die Note" است؟',
    speak: 'die Note',
    options: [
      { text: 'die Note', image: '../../../media/a2/school/grade.png' },
      { text: 'die Prüfung', image: '../../../media/a2/school/exam.png' },
      { text: 'die Lektion', image: '../../../media/a2/school/lesson.png' },
      { text: 'der Lehrer', image: '../../../media/a2/school/teacher.png' }
    ],
    answer: 'die Note'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Prüfung" است؟',
    speak: 'die Prüfung',
    options: [
      { text: 'die Prüfung', image: '../../../media/a2/school/exam.png' },
      { text: 'das Fach', image: '../../../media/a2/school/subject.png' },
      { text: 'die Note', image: '../../../media/a2/school/grade.png' },
      { text: 'die Lektion', image: '../../../media/a2/school/lesson.png' }
    ],
    answer: 'die Prüfung'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Lektion" است؟',
    speak: 'die Lektion',
    options: [
      { text: 'der Lehrer', image: '../../../media/a2/school/teacher.png' },
      { text: 'die Lektion', image: '../../../media/a2/school/lesson.png' },
      { text: 'die Prüfung', image: '../../../media/a2/school/exam.png' },
      { text: 'die Note', image: '../../../media/a2/school/grade.png' }
    ],
    answer: 'die Lektion'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "das Fach" است؟',
    speak: 'das Fach',
    options: [
      { text: 'das Fach', image: '../../../media/a2/school/subject.png' },
      { text: 'die Note', image: '../../../media/a2/school/grade.png' },
      { text: 'die Prüfung', image: '../../../media/a2/school/exam.png' },
      { text: 'der Lehrer', image: '../../../media/a2/school/teacher.png' }
    ],
    answer: 'das Fach'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Lehrer" است؟',
    speak: 'der Lehrer',
    options: [
      { text: 'die Lektion', image: '../../../media/a2/school/lesson.png' },
      { text: 'der Lehrer', image: '../../../media/a2/school/teacher.png' },
      { text: 'das Fach', image: '../../../media/a2/school/subject.png' },
      { text: 'die Prüfung', image: '../../../media/a2/school/exam.png' }
    ],
    answer: 'der Lehrer'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/grade.png',
    options: ['die Note', 'die Prüfung', 'die Lektion', 'der Lehrer'],
    answer: 'die Note'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/exam.png',
    options: ['die Prüfung', 'das Fach', 'die Note', 'die Lektion'],
    answer: 'die Prüfung'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/lesson.png',
    options: ['der Lehrer', 'die Lektion', 'die Prüfung', 'die Note'],
    answer: 'die Lektion'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/subject.png',
    options: ['das Fach', 'die Note', 'die Prüfung', 'der Lehrer'],
    answer: 'das Fach'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/teacher.png',
    options: ['die Lektion', 'der Lehrer', 'das Fach', 'die Prüfung'],
    answer: 'der Lehrer'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'die Note',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Note', 'die Prüfung', 'die Lektion', 'der Lehrer'],
    answer: 'die Note'
  },
  {
    type: 'audio',
    speak: 'die Prüfung',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Prüfung', 'das Fach', 'die Note', 'die Lektion'],
    answer: 'die Prüfung'
  },
  {
    type: 'audio',
    speak: 'die Lektion',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Lehrer', 'die Lektion', 'die Prüfung', 'die Note'],
    answer: 'die Lektion'
  },
  {
    type: 'audio',
    speak: 'das Fach',
    question: 'کدام کلمه را شنیدی؟',
    options: ['das Fach', 'die Note', 'die Prüfung', 'der Lehrer'],
    answer: 'das Fach'
  },
  {
    type: 'audio',
    speak: 'der Lehrer',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Lektion', 'der Lehrer', 'das Fach', 'die Prüfung'],
    answer: 'der Lehrer'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'die Note',
    image: '../../../media/a2/school/grade.png',
    meaning: 'نمره'
  },
  {
    type: 'speak',
    word: 'die Prüfung',
    image: '../../../media/a2/school/exam.png',
    meaning: 'امتحان'
  },
  {
    type: 'speak',
    word: 'die Lektion',
    image: '../../../media/a2/school/lesson.png',
    meaning: 'درس'
  },
  {
    type: 'speak',
    word: 'das Fach',
    image: '../../../media/a2/school/subject.png',
    meaning: 'موضوع درسی'
  },
  {
    type: 'speak',
    word: 'der Lehrer',
    image: '../../../media/a2/school/teacher.png',
    meaning: 'معلم'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich habe eine gute Note',
    question: 'جمله آلمانی را بساز:',
    text: 'من نمره خوبی دارم',
    words: ['Note', 'gute', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'eine', 'gute', 'Note']
  },
  {
    type: 'build-de',
    speak: 'Ich habe heute eine Prüfung',
    question: 'جمله آلمانی را بساز:',
    text: 'من امروز امتحان دارم',
    words: ['heute', 'Prüfung', 'eine', 'habe', 'Ich'],
    answer: ['Ich', 'habe', 'heute', 'eine', 'Prüfung']
  },
  {
    type: 'build-de',
    speak: 'Ich lerne meine Lektion',
    question: 'جمله آلمانی را بساز:',
    text: 'من درس‌ام را می‌خوانم',
    words: ['Lektion', 'meine', 'lerne', 'Ich'],
    answer: ['Ich', 'lerne', 'meine', 'Lektion']
  },
  {
    type: 'build-de',
    speak: 'Mathe ist mein Lieblingsfach',
    question: 'جمله آلمانی را بساز:',
    text: 'ریاضی موضوع مورد علاقه من است',
    words: ['Lieblingsfach', 'mein', 'ist', 'Mathe'],
    answer: ['Mathe', 'ist', 'mein', 'Lieblingsfach']
  },
  {
    type: 'build-de',
    speak: 'Der Lehrer ist nett',
    question: 'جمله آلمانی را بساز:',
    text: 'معلم مهربان است',
    words: ['Lehrer', 'ist', 'nett', 'Der'],
    answer: ['Der', 'Lehrer', 'ist', 'nett']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich habe eine gute Note',
    question: 'ترجمه را بساز:',
    text: 'Ich habe eine gute Note',
    words: ['دارم', 'نمره', 'خوبی', 'یک', 'من'],
    answer: ['من', 'یک', 'نمره', 'خوبی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich habe heute eine Prüfung',
    question: 'ترجمه را بساز:',
    text: 'Ich habe heute eine Prüfung',
    words: ['دارم', 'امتحان', 'امروز', 'من'],
    answer: ['من', 'امروز', 'امتحان', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Ich lerne meine Lektion',
    question: 'ترجمه را بساز:',
    text: 'Ich lerne meine Lektion',
    words: ['می‌خوانم', 'درس', 'را', 'من'],
    answer: ['من', 'درس', 'را', 'می‌خوانم']
  },
  {
    type: 'build-fa',
    speak: 'Mathe ist mein Lieblingsfach',
    question: 'ترجمه را بساز:',
    text: 'Mathe ist mein Lieblingsfach',
    words: ['است', 'مورد علاقه', 'ریاضی', 'موضوع', 'من'],
    answer: ['ریاضی', 'موضوع', 'مورد علاقه', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Der Lehrer ist nett',
    question: 'ترجمه را بساز:',
    text: 'Der Lehrer ist nett',
    words: ['است', 'مهربان', 'معلم'],
    answer: ['معلم', 'مهربان', 'است']
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

  // ===== بخش BUILD DE / FA =====
  if (q.type === 'build-de' || q.type === 'build-fa') {
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

    if (q.type === 'build-de') {
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