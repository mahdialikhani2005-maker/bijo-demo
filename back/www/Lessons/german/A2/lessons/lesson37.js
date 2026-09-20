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

// ===== سوالات درس ۳۷ - آلمانی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "der Wasserfall" است؟',
    speak: 'der Wasserfall',
    options: [
      { text: 'der Wasserfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'der Vulkan', image: '../../../media/a2/nature/volcano.png' },
      { text: 'der Gletscher', image: '../../../media/a2/nature/glacier.png' },
      { text: 'die Höhle', image: '../../../media/a2/nature/cave.png' }
    ],
    answer: 'der Wasserfall'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Vulkan" است؟',
    speak: 'der Vulkan',
    options: [
      { text: 'der Wasserfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'der Vulkan', image: '../../../media/a2/nature/volcano.png' },
      { text: 'die Schlucht', image: '../../../media/a2/nature/canyon.png' },
      { text: 'der Gletscher', image: '../../../media/a2/nature/glacier.png' }
    ],
    answer: 'der Vulkan'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "der Gletscher" است؟',
    speak: 'der Gletscher',
    options: [
      { text: 'die Schlucht', image: '../../../media/a2/nature/canyon.png' },
      { text: 'der Wasserfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'der Gletscher', image: '../../../media/a2/nature/glacier.png' },
      { text: 'der Vulkan', image: '../../../media/a2/nature/volcano.png' }
    ],
    answer: 'der Gletscher'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Schlucht" است؟',
    speak: 'die Schlucht',
    options: [
      { text: 'der Vulkan', image: '../../../media/a2/nature/volcano.png' },
      { text: 'die Schlucht', image: '../../../media/a2/nature/canyon.png' },
      { text: 'die Höhle', image: '../../../media/a2/nature/cave.png' },
      { text: 'der Wasserfall', image: '../../../media/a2/nature/waterfall.png' }
    ],
    answer: 'die Schlucht'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "die Höhle" است؟',
    speak: 'die Höhle',
    options: [
      { text: 'der Wasserfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'der Gletscher', image: '../../../media/a2/nature/glacier.png' },
      { text: 'die Höhle', image: '../../../media/a2/nature/cave.png' },
      { text: 'die Schlucht', image: '../../../media/a2/nature/canyon.png' }
    ],
    answer: 'die Höhle'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/waterfall.png',
    options: ['der Wasserfall', 'der Vulkan', 'der Gletscher', 'die Schlucht'],
    answer: 'der Wasserfall'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/volcano.png',
    options: ['der Wasserfall', 'der Vulkan', 'die Höhle', 'der Gletscher'],
    answer: 'der Vulkan'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/glacier.png',
    options: ['die Schlucht', 'der Wasserfall', 'der Gletscher', 'der Vulkan'],
    answer: 'der Gletscher'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/canyon.png',
    options: ['der Vulkan', 'die Schlucht', 'die Höhle', 'der Wasserfall'],
    answer: 'die Schlucht'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cave.png',
    options: ['der Wasserfall', 'der Gletscher', 'die Höhle', 'die Schlucht'],
    answer: 'die Höhle'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'der Wasserfall',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Wasserfall', 'der Vulkan', 'der Gletscher', 'die Schlucht'],
    answer: 'der Wasserfall'
  },
  {
    type: 'audio',
    speak: 'der Vulkan',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Wasserfall', 'der Vulkan', 'die Höhle', 'der Gletscher'],
    answer: 'der Vulkan'
  },
  {
    type: 'audio',
    speak: 'der Gletscher',
    question: 'کدام کلمه را شنیدی؟',
    options: ['die Schlucht', 'der Wasserfall', 'der Gletscher', 'der Vulkan'],
    answer: 'der Gletscher'
  },
  {
    type: 'audio',
    speak: 'die Schlucht',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Vulkan', 'die Schlucht', 'die Höhle', 'der Wasserfall'],
    answer: 'die Schlucht'
  },
  {
    type: 'audio',
    speak: 'die Höhle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['der Wasserfall', 'der Gletscher', 'die Höhle', 'die Schlucht'],
    answer: 'die Höhle'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'der Wasserfall',
    image: '../../../media/a2/nature/waterfall.png',
    meaning: 'آبشار'
  },
  {
    type: 'speak',
    word: 'der Vulkan',
    image: '../../../media/a2/nature/volcano.png',
    meaning: 'آتشفشان'
  },
  {
    type: 'speak',
    word: 'der Gletscher',
    image: '../../../media/a2/nature/glacier.png',
    meaning: 'یخچال طبیعی'
  },
  {
    type: 'speak',
    word: 'die Schlucht',
    image: '../../../media/a2/nature/canyon.png',
    meaning: 'دره'
  },
  {
    type: 'speak',
    word: 'die Höhle',
    image: '../../../media/a2/nature/cave.png',
    meaning: 'غار'
  },

  // ===== بخش ۵: BUILD DE (ساخت جمله آلمانی) =====
  {
    type: 'build-de',
    speak: 'Ich sehe einen Wasserfall',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک آبشار می‌بینم',
    words: ['Wasserfall', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Wasserfall']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Vulkan',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک آتشفشان می‌بینم',
    words: ['Vulkan', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Vulkan']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe einen Gletscher',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک یخچال طبیعی می‌بینم',
    words: ['Gletscher', 'einen', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'einen', 'Gletscher']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe eine Schlucht',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک دره می‌بینم',
    words: ['Schlucht', 'eine', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'eine', 'Schlucht']
  },
  {
    type: 'build-de',
    speak: 'Ich sehe eine Höhle',
    question: 'جمله آلمانی را بساز:',
    text: 'من یک غار می‌بینم',
    words: ['Höhle', 'eine', 'sehe', 'Ich'],
    answer: ['Ich', 'sehe', 'eine', 'Höhle']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Wasserfall',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Wasserfall',
    words: ['می‌بینم', 'آبشار', 'یک', 'من'],
    answer: ['من', 'یک', 'آبشار', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Vulkan',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Vulkan',
    words: ['می‌بینم', 'آتشفشان', 'یک', 'من'],
    answer: ['من', 'یک', 'آتشفشان', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe einen Gletscher',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe einen Gletscher',
    words: ['می‌بینم', 'یخچال طبیعی', 'یک', 'من'],
    answer: ['من', 'یک', 'یخچال طبیعی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe eine Schlucht',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe eine Schlucht',
    words: ['می‌بینم', 'دره', 'یک', 'من'],
    answer: ['من', 'یک', 'دره', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Ich sehe eine Höhle',
    question: 'ترجمه را بساز:',
    text: 'Ich sehe eine Höhle',
    words: ['می‌بینم', 'غار', 'یک', 'من'],
    answer: ['من', 'یک', 'غار', 'می‌بینم']
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