// ===== Data format =====
// id, text, subtext, image, images[], imageFirst, options[ {text?, image?} ]
const QUESTIONS = [
  // Test 1: question with image + 3 options
  { id: 1, imageFirst: true, images: ["assets/img/g8/1/q1.png"], text: "पांचवें स्थान पर कौन था?", options: [ { image: "assets/img/g8/1/ch1.png" }, { image: "assets/img/g8/1/ch2.png" }, { image: "assets/img/g8/1/ch3.png" }, { image: "assets/img/g8/1/ch4.png" } ] },
  // Test 2: image-first with 4 options
  { id: 2, text: "यह चादर किस घन से बनती है?", images: ["assets/img/g8/2/q1.png"], options: [  {image: "assets/img/g8/2/ch1.png" }, { image: "assets/img/g8/2/ch2.png" }, { image: "assets/img/g8/2/ch3.png" }, { image: "assets/img/g8/2/ch4.png" } ] },
  // Test 3: options with images (2 options only)
  { id: 3, text: "यह चादर किस घन से बनती है?", images: ["assets/img/g8/3/q1.png"], options: [  {image: "assets/img/g8/3/ch1.png" }, { image: "assets/img/g8/3/ch2.png" }, { image: "assets/img/g8/3/ch3.png" }, { image: "assets/img/g8/3/ch4.png" } ]  },
  // Test 4: question with images + 3 options (mixed text/image)
  { id: 4, text: "यह चादर किस घन से बनती है?", images: ["assets/img/g8/4/q1.png"], options: [  {image: "assets/img/g8/4/ch1.png" }, { image: "assets/img/g8/4/ch2.png" }, { image: "assets/img/g8/4/ch3.png" }, { image: "assets/img/g8/4/ch4.png" } ]  },
  // Test 5: 2 options, images only
  { id: 5, text: "चित्र को देखें और वह पंक्ति पहचानें जिसमें कोई भी वस्तु दोहराई नहीं गई है।", images: ["assets/img/g8/5/q1.png"], options: [ {text: "पंक्ति 1" },{text: "पंक्ति 2" },{text: "पंक्ति 3" },{text: "पंक्ति 4" } ] },
  // Test 6: 4 text-only options, no images
  { id: 6, text: "चित्र को देखें और वह पंक्ति पहचानें जिसमें कोई भी वस्तु दोहराई नहीं गई है।", images: ["assets/img/g8/6/q1.png"], options: [ {text: "पंक्ति 1" },{text: "पंक्ति 2" },{text: "पंक्ति 3" },{text: "पंक्ति 4" } ] },
  // Test 7: imageFirst with multiple images, 3 options
  { id: 7, text: "अगर लड़का हर बार पहला खुला हुआ मौड़ लेता है, तो वह कहां खत्म करेगा?", images: ["assets/img/g8/7/q1.png"], options: [ {text: "Option A" },{text: "Option B" },{text: "Option C" } ]  },
  // Test 8: text-only, 3 options
  { id: 8, text: "अगर लड़का हर बार पहला खुला हुआ मौड़ लेता है, तो वह कहां खत्म करेगा?", images: ["assets/img/g8/8/q1.png"], options: [ {text: "Option A" },{text: "Option B" },{text: "Option C" } ]  },
  // Test 9: text-only, 3 options
  { id: 9, text: "नीचे दी गई शर्तों को पूरा करने वाले विकल्प चुनें ₹155 में दो वस्तुएँ चुनें", images: ["assets/img/g8/9/q1.png"], options: [ {image: "assets/img/g8/9/ch1.png" },{image: "assets/img/g8/9/ch2.png" },{image: "assets/img/g8/9/ch3.png" },{image: "assets/img/g8/9/ch4.png" } ]  },
  // Test 10: text-only, 3 options
  { id: 10, text: "नीचे दी गई शर्तों को पूरा करने वाले विकल्प चुनें ₹300 में दो वस्तुएँ चुनें", images: ["assets/img/g8/10/q1.png"], options: [ {image: "assets/img/g8/10/ch1.png" },{image: "assets/img/g8/10/ch2.png" },{image: "assets/img/g8/10/ch3.png" },{image: "assets/img/g8/10/ch4.png" } ]  },
  // Test 11: text-only, 3 options
  { id: 11, text: "यदि शुक्रवार ‘परसों’ के 3 दिन बाद है, तो ‘कल’ कौन-सा दिन था?", options: [ { text: "गुरुवार" }, { text: "शुक्रवार" }, { text: "रविवार" }, { text: "शनिवार" } ] },
  // Test 12: text-only, 3 options
  { id: 12, text: "जग को छुए बिना इस प्लास्टिक की गेंद को बाहर निकालने के लिए आप क्या इस्तेमाल करेंगे?", images: ["assets/img/g8/12/q1.png"], options: [ {image: "assets/img/g8/12/ch1.png" },{image: "assets/img/g8/12/ch2.png" },{image: "assets/img/g8/12/ch3.png" } ] },
  // Test 13: text-only, 3 options
  { id: 13, text: "ऊपर दिए गए चित्र से संबंधित विकल्प चुनें।", images: ["assets/img/g8/13/q1.png"], options: [ {text: "presence" },{text: "presents" } ] },
  // Test 14: text-only, 3 options
  { id: 14, text: "अगर आप किसी ऐसे सम्मेलन में शामिल हों जिसमें सीखने पर ज़ोर दिया जाता है, तो आप क्या करेंगे?", options: [ { text: "भागीदारी से बचें।" }, { text: "सक्रिय रूप से भाग लें।" }, { text: "परिवार और दोस्तों के साथ समय बिताने के लिए सम्मेलन से जल्दी निकल जाएँ।" },{ text: "नोट्स लें, आराम करें और अच्छा समय बिताएँ।" } ] },
  // Test 15: text-only, 3 options
  { id: 15, text: "बड़ों के बजाय अपने दोस्तों और साथियों के पक्षपाती विचारों को बदलना आसान है। क्यों?", options: [ { text: "क्योंकि बुजुर्ग लोगों के पास कई वर्षों से अपने पक्षपाती विचार थे, जो आमतौर पर उम्र के साथ मजबूत होते जाते हैं।" }, { text: "क्योंकि वृद्ध लोग युवा लोगों से ज़्यादा सख़्त होते हैं।" }, { text: "क्योंकि वृद्ध लोग युवा लोगों की बात नहीं सुनना चाहते।" },{ text: "क्योंकि युवा लोग स्वाभाविक रूप से वृद्ध लोगों की तुलना में कम पक्षपाती हैं।" } ] },
  // Test 16: text-only, 3 options
  { id: 16, text: "फ़ैंटेसी कहानियों में सुपरमैन, कैटवुमन और बैटमैन दिखाते हैं कि महिलाएँ और पुरुष दोनों आकर्षक और शक्तिशाली हो सकते हैं। क्या आप सहमत हैं?", options: [ { text: "हाँ, यह दिखाता है कि महिलाओं और पुरुषों के पास महाशक्तियाँ हो सकती हैं।" }, { text: "हाँ, शक्तिशाली पुरुषों और महिलाओं को दिखाकर ये कहानियाँ लैंगिक समानता को बढ़ावा देती हैं।" }, { text: "नहीं, ये कहानियाँ हमेशा पुरुषों को महिलाओं से अधिक शक्तिशाली दिखाती हैं।" },{ text: "न तो सहमत हूँ, न असहमत।" } ] },
  // Test 17: text-only, 3 options
  { id: 17, text: "स्वेच्छा और दान कार्य निम्नलिखित प्रकार के लक्ष्यों में से किस के उदाहरण हैं?", options: [ { text: "मानवीय लक्ष्यों का उद्देश्य समाज की सेवा करना है।" }, { text: "दूसरों की मदद करें।" }, { text: "रिश्ते के लक्ष्य।" },{ text: "समयबद्ध लक्ष्य।" } ] },
  // Test 18: text-only, 3 options
  { id: 18, text: "जब आप दूसरों के साथ यात्रा कर रहे होते हैं और दूसरों को प्रतीक्षा करते रहते हैं, तो क्या करना उचित है?", options: [ { text: "बहुत ज्यादा चिंता मत करो क्योंकि उन्हें वैसे भी उसका इंतजार करना होगा।" }, { text: "देरी के हकदार महसूस करें क्योंकि आपने सेवा के लिए भुगतान किया था।" }, { text: "बाद में माफी मांगो और माफी मांगो।" },{ text: "उन्हें सूचित करें कि आपको देरी हो सकती है और अनुमति लें।" } ] },
  // Test 19: text-only, 3 options
  { id: 19, text: "एक कागज़ को दिखाए अनुसार मोड़कर छेद किए गए हैं। खोलने पर छेदों का सही पैटर्न किस विकल्प में है?", images: ["assets/img/g8/19/q1.png"],options: [ {image: "assets/img/g8/19/ch1.png" }, { image: "assets/img/g8/19/ch2.png" }, { image: "assets/img/g8/19/ch3.png" } ] },
  // Test 20: text-only, 3 options
  { id: 20, text: "रेलवे स्टेशन से चिड़ियाघर तक सबसे कम स्टेशनों से होकर जाने वाला मार्ग बताइए।", images: ["assets/img/g8/20/q1.png"], options: [  {text: "Railway Station -> Park -> Food Court -> Shopping Malls -> Films -> Zoo" }, { text: "Railway Station -> Park -> Bus Stand -> Church -> Sports Club -> Bus Depot -> Films -> Zoo" }, { text: "Railway Station -> Park -> Medical Shop -> Church -> Sports Club -> Metro Terminal -> Zoo" }, { text: "Railway Station -> Park -> Medical Shop -> Hospital -> Films -> Zoo" } ] }
];

// ---- RUNTIME STATE ----
let idx = 0;                  // current question index
let phase = 'question';       // 'image' | 'question' | 'interlude'
let interludeTargetIdx = null; // upcoming question index during interlude

// ---- HELPERS ----
const $ = (sel) => document.querySelector(sel);
const el = (tag, cls) => { const e = document.createElement(tag); if(cls) e.className = cls; return e; };

function collectAllImageUrls(){
  const set = new Set();
  QUESTIONS.forEach(q => {
    if(q.image) set.add(q.image);
    if(Array.isArray(q.images)) q.images.forEach(u => set.add(u));
    (q.options||[]).forEach(o => { if(o.image) set.add(o.image); });
  });
  return Array.from(set);
}

function preloadAll(urls, onProgress){
  return new Promise(resolve => {
    const total = urls.length;
    if(total === 0){ onProgress?.(0,0,100); resolve(); return; }
    let loaded = 0;
    const tick = () => { loaded++; onProgress?.(loaded, total, Math.round(loaded/total*100)); if(loaded === total) resolve(); };
    urls.forEach(u => { const img = new Image(); img.onload = tick; img.onerror = tick; img.src = u; });
  });
}

function updateHeader(){
  const total = QUESTIONS.length;
  $('#progress').textContent = `Question ${idx+1} / ${total}`;
  const current = QUESTIONS[idx];
  //const pill = $('#phasePill');
  const isTwoPhase = !!current.imageFirst && (current.image || (current.images && current.images.length));
 // pill.textContent = isTwoPhase && phase === 'image' ? 'Images' : 'Question';

  const pct = ((idx) / (total-1 || 1)) * 100; // avoid NaN when total==1
  const bar = $('#progressBar');
  if(bar) bar.style.width = `${pct}%`;
}

function fitToScreen(){
  const wrap = document.getElementById('fitWrap');
  const target = document.getElementById('fitTarget');
  if(!wrap || !target) return;
  target.style.transform = 'none';
  wrap.classList.remove('scaled');

  const availW = wrap.clientWidth - 24;
  const rect = target.getBoundingClientRect();
  const contentW = rect.width || 1;
  const widthScale = availW / contentW;

  if(widthScale > 1.05 && window.innerWidth > 1400){
    const scale = Math.min(1.2, widthScale);
    target.style.transform = `scale(${scale})`;
    wrap.classList.add('scaled');
  }
}

function renderImages(q){
  const media = $('#mediaBlock');
  media.innerHTML = '';

  const urls = [];
  if(q.image) urls.push(q.image);
  if(q.images?.length) urls.push(...q.images);

  if(!urls.length){ media.classList.add('hidden'); return; }

  const wrapper = el('div');
  wrapper.style.display = 'grid';
  wrapper.style.gap = '10px';
  wrapper.style.width = '100%';
  wrapper.style.placeItems = 'center';

  urls.forEach(src => {
    const img = document.createElement('img');
    img.src = src; img.alt = '';
    img.className = 'img-enter';
    wrapper.appendChild(img);
    requestAnimationFrame(()=>{ img.classList.add('img-enter-active'); });
  });

  media.appendChild(wrapper);
  media.classList.remove('hidden');
}

function renderQuestion(q){
  // Question
  const qt = $('#questionText');
  const qs = $('#questionSub');
  qt.textContent = q.text || '';
  qt.classList.toggle('hidden', !q.text);
  qs.textContent = q.subtext || '';
  qs.classList.toggle('hidden', !q.subtext);

  // If image exists and not in image-first phase, show it above question
  if(!q.imageFirst && (q.image || (q.images && q.images.length))){ renderImages(q); }
  else { $('#mediaBlock').classList.add('hidden'); }

  // Choices
  const choices = $('#choices');
  choices.innerHTML = '';
  const labels = ['A','B','C','D'];
  (q.options || []).slice(0,4).forEach((opt, i) => {
    const row = el('div','choice');
    const lab = el('div','label');
    lab.textContent = labels[i];
    row.appendChild(lab);

    const content = el('div','content');
    /*const optname = el('div','optname');
    optname.textContent = `Option ${labels[i]}`;
    content.appendChild(optname);*/

    if(opt.image){ const img = document.createElement('img'); img.src = opt.image; img.alt=''; content.appendChild(img); }
    if(opt.text){ const span = el('div','text'); span.textContent = opt.text; content.appendChild(span); }

    row.appendChild(content);
    choices.appendChild(row);
  });

  // Animate in question & choices (staggered)
  requestAnimationFrame(() => {
    const items = [qt, ...choices.children];
    items.forEach((node, i) => {
      node.classList.add('fade-up');
      setTimeout(() => node.classList.add('fade-up-active'), 60 + i*70);
      setTimeout(() => node.classList.remove('fade-up','fade-up-active'), 700);
    });
  });
}

function render(){
  const q = QUESTIONS[idx];

  // INTERLUDE PHASE
  if(phase === 'interlude'){
    const il = document.getElementById('interlude');
    const title = document.getElementById('interludeTitle');
    const badge = document.getElementById('interludeBadge');
    const meta = document.getElementById('interludeMeta');

    const target = interludeTargetIdx;
    if(target != null && target < QUESTIONS.length){
      title.textContent = `Get ready for Question ${target+1}`;
      badge.textContent = `Next: Q ${target+1}`;
      meta.innerHTML = 'Press <strong>Next</strong> to continue';
    } else {
      title.textContent = 'End of Set';
      badge.textContent = 'Completed';
      meta.textContent = 'You have reached the last question.';
    }

    $('#mediaBlock').classList.add('hidden');
    $('#questionBlock').classList.add('hidden');
    il.classList.add('show');
    updateHeader();
    fitToScreen();
    return;
  }

  // Otherwise hide interlude
  document.getElementById('interlude').classList.remove('show');

  // Decide if we are in an image-only phase
  const twoPhase = !!q.imageFirst && (q.image || (q.images && q.images.length));
  if(twoPhase && phase === 'image'){
    renderImages(q);
    $('#questionBlock').classList.add('hidden');
  } else {
    $('#mediaBlock').classList.add('hidden');
    $('#questionBlock').classList.remove('hidden');
    renderQuestion(q);
  }

  updateHeader();

  // Passive preload next question's images
  const upcoming = QUESTIONS[idx+1];
  if(upcoming){
    const preload = [];
    if(upcoming.image) preload.push(upcoming.image);
    if(upcoming.images) preload.push(...upcoming.images);
    (upcoming.options||[]).forEach(o=>{ if(o.image) preload.push(o.image); });
    preload.forEach(src => { const i = new Image(); i.src = src; });
  }

  fitToScreen();
}

function next(){
  const cur = QUESTIONS[idx];
  const twoPhase = !!cur.imageFirst && (cur.image || (cur.images && cur.images.length));

  // If on image phase, reveal the question (no slide)
  if(phase === 'image' && twoPhase){
    phase = 'question';
    render();
    indicate('Question shown');
    return;
  }

  // Show interlude before changing question
  if(phase !== 'interlude'){
    if(idx < QUESTIONS.length - 1){
      interludeTargetIdx = idx + 1; phase = 'interlude'; render(); indicate(`Next: Q ${interludeTargetIdx+1} ready`);
    } else { interludeTargetIdx = null; phase = 'interlude'; render(); indicate('End of set'); }
    return;
  }

  // From interlude -> slide in next question
  if(interludeTargetIdx != null){
    slideTransition('next', () => {
      idx = interludeTargetIdx; interludeTargetIdx = null; phase = QUESTIONS[idx].imageFirst ? 'image' : 'question';
      render();
    });
  }
}

function prev(){
  const cur = QUESTIONS[idx];
  const twoPhase = !!cur.imageFirst && (cur.image || (cur.images && cur.images.length));

  if(phase === 'question' && twoPhase){ phase = 'image'; render(); indicate('Images shown'); return; }

  if(idx > 0){
    slideTransition('prev', () => {
      idx--; phase = QUESTIONS[idx].imageFirst ? 'image' : 'question';
      render();
    });
    indicate(`Back to Q ${idx}`);
  }
}

function toggleFullscreen(){
  const de = document.documentElement;
  if (!document.fullscreenElement) { de.requestFullscreen?.(); }
  else { document.exitFullscreen?.(); }
}

function indicate(msg){
  const card = document.querySelector('.display-card');
  card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');

  const t = document.getElementById('toast'); if(!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(indicate._timer); indicate._timer = setTimeout(()=> t.classList.remove('show'), 900);
}

function slideTransition(dir, mutate){
  const inner = document.getElementById('cardInner');
  if(!inner){ mutate(); return; }

  // Exit phase
  const exitClass = dir === 'next' ? 'slide-exit-left' : 'slide-exit-right';
  const exitActive = exitClass + '-active';
  inner.classList.remove('slide-enter-left','slide-enter-left-active','slide-enter-right','slide-enter-right-active');
  inner.classList.add(exitClass);
  requestAnimationFrame(() => inner.classList.add(exitActive));

  const onExit = () => {
    inner.removeEventListener('transitionend', onExit);
    mutate(); // state change + render

    // Enter phase
    const enterClass = dir === 'next' ? 'slide-enter-right' : 'slide-enter-left';
    const enterActive = enterClass + '-active';
    inner.classList.remove(exitClass, exitActive);
    inner.classList.add(enterClass);
    requestAnimationFrame(() => inner.classList.add(enterActive));
    inner.addEventListener('transitionend', function onEnter(){
      inner.removeEventListener('transitionend', onEnter);
      inner.classList.remove(enterClass, enterActive);
    });
  };
  inner.addEventListener('transitionend', onExit);
}

// Wire up
document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.getElementById('fsBtn').addEventListener('click', toggleFullscreen);
window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' '){ next(); }
  if(e.key === 'ArrowLeft'){ prev(); }
  if(e.key.toLowerCase?.() === 'f'){ toggleFullscreen(); }
});
window.addEventListener('resize', fitToScreen);

// Ensure header height variable matches actual height
const headerEl = document.querySelector('header');
function syncHeaderHeight(){
  document.documentElement.style.setProperty('--header-h', headerEl.getBoundingClientRect().height + 'px');
}
window.addEventListener('resize', syncHeaderHeight);
syncHeaderHeight();

// Boot with preloader
(function boot(){
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loadBar');
  const pctEl = document.getElementById('loadPct');
  const cntEl = document.getElementById('loadCount');
  const totEl = document.getElementById('loadTotal');

  const urls = collectAllImageUrls();
  if(totEl) totEl.textContent = urls.length;

  preloadAll(urls, (loaded, total, pct) => {
    if(bar) bar.style.width = pct + '%';
    if(pctEl) pctEl.textContent = pct + '%';
    if(cntEl) cntEl.textContent = loaded;
  }).then(() => {
    // Determine starting phase
    const q0 = QUESTIONS[0];
    phase = q0 && q0.imageFirst && (q0.image || (q0.images && q0.images.length)) ? 'image' : 'question';
    document.getElementById('setName').textContent = 'Grade 8';
    // Hide loader and render first screen
    loader.classList.remove('show');
    render();
    indicate('Images preloaded');
  });
})();