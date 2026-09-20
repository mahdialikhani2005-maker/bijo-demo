let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
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
  recognition.lang = 'ru-RU';
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

// ===== سوالات درس ۱۶ - روسی به فارسی (حرفه‌ها ۱) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "пилот" است؟',
    speak: 'пилот',
    options: [
      { text: 'пилот', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'медсестра', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'адвокат', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'художник', image: '../../../media/a2/jobs/artist.png' }
    ],
    answer: 'пилот'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "медсестра" است؟',
    speak: 'медсестра',
    options: [
      { text: 'пилот', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'медсестра', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'шеф-повар', image: '../../../media/a2/jobs/chef.png' },
      { text: 'адвокат', image: '../../../media/a2/jobs/lawyer.png' }
    ],
    answer: 'медсестра'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "адвокат" است؟',
    speak: 'адвокат',
    options: [
      { text: 'художник', image: '../../../media/a2/jobs/artist.png' },
      { text: 'пилот', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'адвокат', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'медсестра', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: 'адвокат'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "художник" است؟',
    speak: 'художник',
    options: [
      { text: 'пилот', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'художник', image: '../../../media/a2/jobs/artist.png' },
      { text: 'адвокат', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'шеф-повар', image: '../../../media/a2/jobs/chef.png' }
    ],
    answer: 'художник'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "шеф-повар" است؟',
    speak: 'шеф-повар',
    options: [
      { text: 'медсестра', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'шеф-повар', image: '../../../media/a2/jobs/chef.png' },
      { text: 'художник', image: '../../../media/a2/jobs/artist.png' },
      { text: 'пилот', image: '../../../media/a2/jobs/pilot.png' }
    ],
    answer: 'шеф-повар'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/pilot.png',
    options: ['пилот', 'медсестра', 'адвокат', 'художник'],
    answer: 'пилот'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/nurse.png',
    options: ['пилот', 'медсестра', 'шеф-повар', 'адвокат'],
    answer: 'медсестра'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/lawyer.png',
    options: ['художник', 'пилот', 'адвокат', 'медсестра'],
    answer: 'адвокат'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/artist.png',
    options: ['пилот', 'художник', 'адвокат', 'шеф-повар'],
    answer: 'художник'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/chef.png',
    options: ['медсестра', 'шеф-повар', 'художник', 'пилот'],
    answer: 'шеф-повар'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'пилот',
    question: 'کدام کلمه را شنیدی؟',
    options: ['пилот', 'медсестра', 'адвокат', 'художник'],
    answer: 'пилот'
  },
  {
    type: 'audio',
    speak: 'медсестра',
    question: 'کدام کلمه را شنیدی؟',
    options: ['пилот', 'медсестра', 'шеф-повар', 'адвокат'],
    answer: 'медсестра'
  },
  {
    type: 'audio',
    speak: 'адвокат',
    question: 'کدام کلمه را شنیدی؟',
    options: ['художник', 'пилот', 'адвокат', 'медсестра'],
    answer: 'адвокат'
  },
  {
    type: 'audio',
    speak: 'художник',
    question: 'کدام کلمه را شنیدی؟',
    options: ['пилот', 'художник', 'адвокат', 'шеф-повар'],
    answer: 'художник'
  },
  {
    type: 'audio',
    speak: 'шеф-повар',
    question: 'کدام کلمه را شنیدی؟',
    options: ['медсестра', 'шеф-повар', 'художник', 'пилот'],
    answer: 'шеф-повар'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'пилот',
    image: '../../../media/a2/jobs/pilot.png',
    meaning: 'خلبان'
  },
  {
    type: 'speak',
    word: 'медсестра',
    image: '../../../media/a2/jobs/nurse.png',
    meaning: 'پرستار'
  },
  {
    type: 'speak',
    word: 'адвокат',
    image: '../../../media/a2/jobs/lawyer.png',
    meaning: 'وکیل'
  },
  {
    type: 'speak',
    word: 'художник',
    image: '../../../media/a2/jobs/artist.png',
    meaning: 'هنرمند'
  },
  {
    type: 'speak',
    word: 'шеф-повар',
    image: '../../../media/a2/jobs/chef.png',
    meaning: 'آشپز'
  },

  // ===== بخش ۵: BUILD RU (ساخت جمله روسی) =====
  {
    type: 'build-ru',
    speak: 'Он пилот',
    question: 'جمله روسی را بساز:',
    text: 'او خلبان است',
    words: ['пилот', 'Он'],
    answer: ['Он', 'пилот']
  },
  {
    type: 'build-ru',
    speak: 'Она медсестра',
    question: 'جمله روسی را بساز:',
    text: 'او پرستار است',
    words: ['медсестра', 'Она'],
    answer: ['Она', 'медсестра']
  },
  {
    type: 'build-ru',
    speak: 'Он адвокат',
    question: 'جمله روسی را بساز:',
    text: 'او وکیل است',
    words: ['адвокат', 'Он'],
    answer: ['Он', 'адвокат']
  },
  {
    type: 'build-ru',
    speak: 'Он художник',
    question: 'جمله روسی را بساز:',
    text: 'او هنرمند است',
    words: ['художник', 'Он'],
    answer: ['Он', 'художник']
  },
  {
    type: 'build-ru',
    speak: 'Он шеф-повар',
    question: 'جمله روسی را بساز:',
    text: 'او آشپز است',
    words: ['шеф-повар', 'Он'],
    answer: ['Он', 'шеф-повар']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Он пилот',
    question: 'ترجمه را بساز:',
    text: 'Он пилот',
    words: ['است', 'خلبان', 'او'],
    answer: ['او', 'خلبان', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Она медсестра',
    question: 'ترجمه را بساز:',
    text: 'Она медсестра',
    words: ['است', 'پرستار', 'او'],
    answer: ['او', 'پرستار', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он адвокат',
    question: 'ترجمه را بساز:',
    text: 'Он адвокат',
    words: ['است', 'وکیل', 'او'],
    answer: ['او', 'وکیل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он художник',
    question: 'ترجمه را بساز:',
    text: 'Он художник',
    words: ['است', 'هنرمند', 'او'],
    answer: ['او', 'هنرمند', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Он шеф-повар',
    question: 'ترجمه را بساز:',
    text: 'Он шеф-повар',
    words: ['است', 'آشپز', 'او'],
    answer: ['او', 'آشپز', 'است']
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

  // ===== بخش BUILD RU / FA =====
  if (q.type === 'build-ru' || q.type === 'build-fa') {
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

    if (q.type === 'build-ru') {
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