let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
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
  recognition.lang = 'zh-CN';
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

// ===== سوالات درس ۶۰ - چینی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "设备" است؟',
    speak: '设备',
    options: [
      { text: '小工具', image: '../../../media/a2/technology/gadget.png' },
      { text: '设备', image: '../../../media/a2/technology/device.png' },
      { text: '机器人', image: '../../../media/a2/technology/robot.png' },
      { text: '无人机', image: '../../../media/a2/technology/drone.png' }
    ],
    answer: '设备'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "小工具" است؟',
    speak: '小工具',
    options: [
      { text: '设备', image: '../../../media/a2/technology/device.png' },
      { text: '小工具', image: '../../../media/a2/technology/gadget.png' },
      { text: '智能手表', image: '../../../media/a2/technology/smartwatch.png' },
      { text: '机器人', image: '../../../media/a2/technology/robot.png' }
    ],
    answer: '小工具'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "机器人" است؟',
    speak: '机器人',
    options: [
      { text: '无人机', image: '../../../media/a2/technology/drone.png' },
      { text: '设备', image: '../../../media/a2/technology/device.png' },
      { text: '机器人', image: '../../../media/a2/technology/robot.png' },
      { text: '小工具', image: '../../../media/a2/technology/gadget.png' }
    ],
    answer: '机器人'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "无人机" است؟',
    speak: '无人机',
    options: [
      { text: '无人机', image: '../../../media/a2/technology/drone.png' },
      { text: '智能手表', image: '../../../media/a2/technology/smartwatch.png' },
      { text: '小工具', image: '../../../media/a2/technology/gadget.png' },
      { text: '设备', image: '../../../media/a2/technology/device.png' }
    ],
    answer: '无人机'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "智能手表" است؟',
    speak: '智能手表',
    options: [
      { text: '机器人', image: '../../../media/a2/technology/robot.png' },
      { text: '智能手表', image: '../../../media/a2/technology/smartwatch.png' },
      { text: '无人机', image: '../../../media/a2/technology/drone.png' },
      { text: '小工具', image: '../../../media/a2/technology/gadget.png' }
    ],
    answer: '智能手表'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/device.png',
    options: ['小工具', '设备', '机器人', '无人机'],
    answer: '设备'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/gadget.png',
    options: ['设备', '小工具', '智能手表', '机器人'],
    answer: '小工具'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/robot.png',
    options: ['无人机', '设备', '机器人', '小工具'],
    answer: '机器人'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/drone.png',
    options: ['无人机', '智能手表', '小工具', '设备'],
    answer: '无人机'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/smartwatch.png',
    options: ['机器人', '智能手表', '无人机', '小工具'],
    answer: '智能手表'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: '设备',
    question: 'کدام کلمه را شنیدی؟',
    options: ['小工具', '设备', '机器人', '无人机'],
    answer: '设备'
  },
  {
    type: 'audio',
    speak: '小工具',
    question: 'کدام کلمه را شنیدی؟',
    options: ['设备', '小工具', '智能手表', '机器人'],
    answer: '小工具'
  },
  {
    type: 'audio',
    speak: '机器人',
    question: 'کدام کلمه را شنیدی؟',
    options: ['无人机', '设备', '机器人', '小工具'],
    answer: '机器人'
  },
  {
    type: 'audio',
    speak: '无人机',
    question: 'کدام کلمه را شنیدی؟',
    options: ['无人机', '智能手表', '小工具', '设备'],
    answer: '无人机'
  },
  {
    type: 'audio',
    speak: '智能手表',
    question: 'کدام کلمه را شنیدی؟',
    options: ['机器人', '智能手表', '无人机', '小工具'],
    answer: '智能手表'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: '设备',
    image: '../../../media/a2/technology/device.png',
    meaning: 'دستگاه'
  },
  {
    type: 'speak',
    word: '小工具',
    image: '../../../media/a2/technology/gadget.png',
    meaning: 'ابزار دیجیتال'
  },
  {
    type: 'speak',
    word: '机器人',
    image: '../../../media/a2/technology/robot.png',
    meaning: 'ربات'
  },
  {
    type: 'speak',
    word: '无人机',
    image: '../../../media/a2/technology/drone.png',
    meaning: 'پهپاد'
  },
  {
    type: 'speak',
    word: '智能手表',
    image: '../../../media/a2/technology/smartwatch.png',
    meaning: 'ساعت هوشمند'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله چینی) =====
  {
    type: 'build-en',
    speak: '这是设备',
    question: 'جمله چینی را بساز:',
    text: 'این دستگاه است',
    words: ['设备', '这', '是'],
    answer: ['这', '是', '设备']
  },
  {
    type: 'build-en',
    speak: '这是小工具',
    question: 'جمله چینی را بساز:',
    text: 'این ابزار دیجیتال است',
    words: ['小工具', '这', '是'],
    answer: ['这', '是', '小工具']
  },
  {
    type: 'build-en',
    speak: '这是机器人',
    question: 'جمله چینی را بساز:',
    text: 'این ربات است',
    words: ['机器人', '这', '是'],
    answer: ['这', '是', '机器人']
  },
  {
    type: 'build-en',
    speak: '这是无人机',
    question: 'جمله چینی را بساز:',
    text: 'این پهپاد است',
    words: ['无人机', '这', '是'],
    answer: ['这', '是', '无人机']
  },
  {
    type: 'build-en',
    speak: '这是智能手表',
    question: 'جمله چینی را بساز:',
    text: 'این ساعت هوشمند است',
    words: ['智能手表', '这', '是'],
    answer: ['这', '是', '智能手表']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '这是设备',
    question: 'ترجمه را بساز:',
    text: '这是设备',
    words: ['است', 'دستگاه', 'این'],
    answer: ['این', 'دستگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是小工具',
    question: 'ترجمه را بساز:',
    text: '这是小工具',
    words: ['است', 'ابزار دیجیتال', 'این'],
    answer: ['این', 'ابزار دیجیتال', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是机器人',
    question: 'ترجمه را بساز:',
    text: '这是机器人',
    words: ['است', 'ربات', 'این'],
    answer: ['این', 'ربات', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是无人机',
    question: 'ترجمه را بساز:',
    text: '这是无人机',
    words: ['است', 'پهپاد', 'این'],
    answer: ['این', 'پهپاد', 'است']
  },
  {
    type: 'build-fa',
    speak: '这是智能手表',
    question: 'ترجمه را بساز:',
    text: '这是智能手表',
    words: ['است', 'ساعت هوشمند', 'این'],
    answer: ['این', 'ساعت هوشمند', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 تبریک! تمام ۶۰ درس چینی را کامل کردید! 🎉</h2>
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
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