let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
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
  recognition.lang = 'ja-JP';
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

// ===== سوالات درس ۱۶ - ژاپنی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "パイロット" است؟',
    speak: 'パイロット',
    options: [
      { text: 'パイロット', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'かんごし', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'べんごし', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'げいじゅつか', image: '../../../media/a2/jobs/artist.png' }
    ],
    answer: 'パイロット'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "かんごし" است؟',
    speak: 'かんごし',
    options: [
      { text: 'シェフ', image: '../../../media/a2/jobs/chef.png' },
      { text: 'かんごし', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'パイロット', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'べんごし', image: '../../../media/a2/jobs/lawyer.png' }
    ],
    answer: 'かんごし'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "べんごし" است؟',
    speak: 'べんごし',
    options: [
      { text: 'パイロット', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'べんごし', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'げいじゅつか', image: '../../../media/a2/jobs/artist.png' },
      { text: 'かんごし', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: 'べんごし'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "げいじゅつか" است؟',
    speak: 'げいじゅつか',
    options: [
      { text: 'かんごし', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'パイロット', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'べんごし', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'げいじゅつか', image: '../../../media/a2/jobs/artist.png' }
    ],
    answer: 'げいじゅつか'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "シェフ" است؟',
    speak: 'シェフ',
    options: [
      { text: 'シェフ', image: '../../../media/a2/jobs/chef.png' },
      { text: 'げいじゅつか', image: '../../../media/a2/jobs/artist.png' },
      { text: 'パイロット', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'かんごし', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: 'シェフ'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/pilot.png',
    options: ['パイロット', 'かんごし', 'べんごし', 'げいじゅつか'],
    answer: 'パイロット'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/nurse.png',
    options: ['パイロット', 'かんごし', 'べんごし', 'シェフ'],
    answer: 'かんごし'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/lawyer.png',
    options: ['シェフ', 'パイロット', 'べんごし', 'かんごし'],
    answer: 'べんごし'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/artist.png',
    options: ['べんごし', 'かんごし', 'げいじゅつか', 'パイロット'],
    answer: 'げいじゅつか'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/chef.png',
    options: ['パイロット', 'げいじゅつか', 'かんごし', 'シェフ'],
    answer: 'シェフ'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'パイロット',
    question: 'کدام کلمه را شنیدی؟',
    options: ['パイロット', 'かんごし', 'べんごし', 'げいじゅつか'],
    answer: 'パイロット'
  },
  {
    type: 'audio',
    speak: 'かんごし',
    question: 'کدام کلمه را شنیدی؟',
    options: ['シェフ', 'かんごし', 'パイロット', 'べんごし'],
    answer: 'かんごし'
  },
  {
    type: 'audio',
    speak: 'べんごし',
    question: 'کدام کلمه را شنیدی؟',
    options: ['パイロット', 'べんごし', 'げいじゅつか', 'かんごし'],
    answer: 'べんごし'
  },
  {
    type: 'audio',
    speak: 'げいじゅつか',
    question: 'کدام کلمه را شنیدی؟',
    options: ['かんごし', 'パイロット', 'べんごし', 'げいじゅつか'],
    answer: 'げいじゅつか'
  },
  {
    type: 'audio',
    speak: 'シェフ',
    question: 'کدام کلمه را شنیدی؟',
    options: ['シェフ', 'げいじゅつか', 'パイロット', 'かんごし'],
    answer: 'シェフ'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'パイロット',
    image: '../../../media/a2/jobs/pilot.png',
    meaning: 'خلبان'
  },
  {
    type: 'speak',
    word: 'かんごし',
    image: '../../../media/a2/jobs/nurse.png',
    meaning: 'پرستار'
  },
  {
    type: 'speak',
    word: 'べんごし',
    image: '../../../media/a2/jobs/lawyer.png',
    meaning: 'وکیل'
  },
  {
    type: 'speak',
    word: 'げいじゅつか',
    image: '../../../media/a2/jobs/artist.png',
    meaning: 'هنرمند'
  },
  {
    type: 'speak',
    word: 'シェフ',
    image: '../../../media/a2/jobs/chef.png',
    meaning: 'آشپز'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ژاپنی) =====
  {
    type: 'build-it',
    speak: '私はパイロットです',
    question: 'جمله ژاپنی را بساز:',
    text: 'من خلبان هستم',
    words: ['です', 'パイロット', '私', 'は'],
    answer: ['私', 'は', 'パイロット', 'です']
  },
  {
    type: 'build-it',
    speak: '彼女はかんごしです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او پرستار است',
    words: ['です', 'かんごし', '彼女', 'は'],
    answer: ['彼女', 'は', 'かんごし', 'です']
  },
  {
    type: 'build-it',
    speak: '彼はべんごしです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او وکیل است',
    words: ['です', 'べんごし', '彼', 'は'],
    answer: ['彼', 'は', 'べんごし', 'です']
  },
  {
    type: 'build-it',
    speak: '彼女はげいじゅつかです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او هنرمند است',
    words: ['です', 'げいじゅつか', '彼女', 'は'],
    answer: ['彼女', 'は', 'げいじゅつか', 'です']
  },
  {
    type: 'build-it',
    speak: '彼はシェフです',
    question: 'جمله ژاپنی را بساز:',
    text: 'او آشپز است',
    words: ['です', 'シェフ', '彼', 'は'],
    answer: ['彼', 'は', 'シェフ', 'です']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: '私はパイロットです',
    question: 'ترجمه را بساز:',
    text: '私はパイロットです',
    words: ['من', 'خلبان', 'هستم'],
    answer: ['من', 'خلبان', 'هستم']
  },
  {
    type: 'build-fa',
    speak: '彼女はかんごしです',
    question: 'ترجمه را بساز:',
    text: '彼女はかんごしです',
    words: ['او', 'پرستار', 'است'],
    answer: ['او', 'پرستار', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼はべんごしです',
    question: 'ترجمه را بساز:',
    text: '彼はべんごしです',
    words: ['او', 'وکیل', 'است'],
    answer: ['او', 'وکیل', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼女はげいじゅつかです',
    question: 'ترجمه را بساز:',
    text: '彼女はげいじゅつかです',
    words: ['او', 'هنرمند', 'است'],
    answer: ['او', 'هنرمند', 'است']
  },
  {
    type: 'build-fa',
    speak: '彼はシェフです',
    question: 'ترجمه را بساز:',
    text: '彼はシェフです',
    words: ['او', 'آشپز', 'است'],
    answer: ['او', 'آشپز', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 レッスンが終わりました！ 🎉</h2>
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

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
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

    if (q.type === 'build-it') {
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