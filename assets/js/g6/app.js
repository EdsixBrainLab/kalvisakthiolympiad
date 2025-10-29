// ===== Data format =====
// id, text, subtext, image, images[], imageFirst, options[ {text?, image?} ]
const QUESTIONS = [
  // Test 1: question with image + 3 options
  { id: 1, imageFirst: true, images: ["assets/img/g6/1/q1.png"], text: "इनमे से कौन सा दिखाया गया था?", options: [ { image: "assets/img/g6/1/ch1.png" }, { image: "assets/img/g6/1/ch2.png" }, { image: "assets/img/g6/1/ch3.png" }, { image: "assets/img/g6/1/ch4.png" } ] },
  // Test 2: image-first with 4 options
  { id: 2, text: "केंद्र में दिए गए चित्र के समान विकल्प चुनें।", images: ["assets/img/g6/2/q1.png"], options: [  {image: "assets/img/g6/2/ch1.png" }, { image: "assets/img/g6/2/ch2.png" }, { image: "assets/img/g6/2/ch3.png" }, { image: "assets/img/g6/2/ch4.png" } ] },
  // Test 3: options with images (2 options only)
  { id: 3, text: "केंद्र में दिए गए चित्र के समान विकल्प चुनें।", images: ["assets/img/g6/3/q1.png"], options: [  {image: "assets/img/g6/3/ch1.png" }, { image: "assets/img/g6/3/ch2.png" }, { image: "assets/img/g6/3/ch3.png" }, { image: "assets/img/g6/3/ch4.png" } ]  },
  // Test 4: question with images + 3 options (mixed text/image)
  { id: 4, text: "केंद्र में दिए गए चित्र के समान विकल्प चुनें।", images: ["assets/img/g6/4/q1.png"], options: [  {image: "assets/img/g6/4/ch1.png" }, { image: "assets/img/g6/4/ch2.png" }, { image: "assets/img/g6/4/ch3.png" }, { image: "assets/img/g6/4/ch4.png" } ]  },
  // Test 5: 2 options, images only
  { id: 5, text: "हरा गाडी की दिशा कौन सी है?", images: ["assets/img/g6/5/q1.png"], options: [ {image: "assets/img/g6/5/ch1.png" },{image: "assets/img/g6/5/ch2.png" },{image: "assets/img/g6/5/ch3.png" },{image: "assets/img/g6/5/ch4.png" } ] },
  // Test 6: 4 text-only options, no images
  { id: 6, text: " नीला गाडी का स्थान कहाँ है?", images: ["assets/img/g6/6/q1.png"], options: [ {image: "assets/img/g6/6/ch1.png" },{image: "assets/img/g6/6/ch2.png" },{image: "assets/img/g6/6/ch3.png" },{image: "assets/img/g6/6/ch4.png" } ] },
  // Test 7: imageFirst with multiple images, 3 options
  { id: 7, text: "कौन सा ज़्यादा भारी है?", images: ["assets/img/g6/7/q1.png"], options: [ {image: "assets/img/g6/7/ch1.png" },{image: "assets/img/g6/7/ch2.png" },{image: "assets/img/g6/7/ch3.png" } ]  },
  // Test 8: text-only, 3 options
  { id: 8, text: "कौन सा सबसे हल्का है?", images: ["assets/img/g6/8/q1.png"], options: [ {image: "assets/img/g6/8/ch1.png" },{image: "assets/img/g6/8/ch2.png" },{image: "assets/img/g6/8/ch3.png" } ]  },
  // Test 9: text-only, 3 options
  { id: 9, text: "छूटा हुआ टुकड़ा कौन सा है?", images: ["assets/img/g6/9/q1.png"], options: [ {image: "assets/img/g6/9/ch1.png" },{image: "assets/img/g6/9/ch2.png" },{image: "assets/img/g6/9/ch3.png" },{image: "assets/img/g6/9/ch4.png" } ]  },
  // Test 10: text-only, 3 options
  { id: 10, text: "छूटा हुआ टुकड़ा कौन सा है?", images: ["assets/img/g6/10/q1.png"], options: [ {image: "assets/img/g6/10/ch1.png" },{image: "assets/img/g6/10/ch2.png" },{image: "assets/img/g6/10/ch3.png" },{image: "assets/img/g6/10/ch4.png" } ]  },
  // Test 11: text-only, 3 options
  { id: 11, text: "मैं नया होता हूँ तो लंबा होता हूँ और इस्तेमाल होने पर छोटा हो जाता हूँ। मैं कौन हूँ?", options: [ { text: "मोमबत्ती" }, { text: "दीपक का तेल" }, { text: "रबर (इरेज़र)" }, { text: "पेन" } ] },
  // Test 12: text-only, 3 options
  { id: 12, text: "किस विकल्प के बीच में एक समान संबंध है? दस्ताने : हाथ विकल्प ", options: [ { text: "मोच : पैर विकल्प" }, { text: "कमीज : टाई विकल्प" }, { text: "कोट : पॉकेट विकल्प" }, { text: "गर्दन : कॉलर" } ] },
  // Test 13: text-only, 3 options
  { id: 13, text: "चित्र को देखें और परिवहन के नाम को पूरा करने के लिए सही विकल्प चुनें।", images: ["assets/img/g6/13/q1.png"], options: [ {image: "assets/img/g6/13/ch1.png" },{image: "assets/img/g6/13/ch2.png" },{image: "assets/img/g6/13/ch3.png" } ] },
  // Test 14: text-only, 3 options
  { id: 14, text: "बस स्टॉप पर इंतज़ार करते हुए, आप अपना बैग बेंच पर अपने बगल में पर रख देते हैं। एक और व्यक्ति आकर बैठने की जगह ढूँढ़ता है। आप क्या करेंगे?", options: [ { text: "दूर देखो और उस व्यक्ति की उपेक्षा करो।" }, { text: "उन्हें बताएं कि अगर वे सीट चाहते हैं तो उन्हें पहले आना चाहिए था।" }, { text: "चुपचाप अपने बैग को अपनी गोद में रखें।" },{ text: "आँख से संपर्क करें और उस व्यक्ति से पूछें कि क्या वे आपके बैग को अपनी गोद में रखने से पहले बैठना चाहते हैं।" } ] },
  // Test 15: text-only, 3 options
  { id: 15, text: "माता-पिता के साथ शेयर करने के लिए अच्छी खबर है। हालांकि, वे दिन भर व्यस्त रहते थे। रात के खाने की मेज पर, आपकी माँ पूछती है कि आपका दिन कैसे चला गया। आपको क्या जवाब देना चाहिए?", options: [ { text: "उन्हें सुसमाचार बताओ और अगली बार उन्हें और अधिक समझने के लिए कहें।" }, { text: "उन्हें बताएं कि आपके पास बाद में कुछ साझा करने के लिए है।" }, { text: "आप और अपनी भावनाओं को नजरअंदाज करने के लिए उनसे लड़िए।" },{ text: "उन्हें बताएं कि आप उनके साथ कुछ भी साझा नहीं करना चाहते हैं.।" } ] },
  // Test 16: text-only, 3 options
  { id: 16, text: "आप भीड़-भाड़ वाले सुपरमार्केट में हैं और कोई अजनबी आपके सामने यह महसूस किए बिना कट जाता है कि बिलिंग काउंटर के लिए एक कतार है. तुम्हें क्या करना चाहिए?", options: [ { text: "धीरे-धीरे उन्हें एक पंक्ति के बारे में बताएं और उनसे अनुरोध करें कि वे आपके पीछे हो लें।" }, { text: "उन्हें बताओ कि आप वहां पहले खड़े थे।" }, { text: "लाइन को अनदेखा करने के लिए उन्हें डालिए।" },{ text: "दुकान छोड़ दो क्योंकि वे तुम्हें नाराज कर दिया।" } ] },
  // Test 17: text-only, 3 options
  { id: 17, text: "जब आपके दो दोस्त आपस में लड़ रहे हों तो आपको क्या करना चाहिए?", options: [ { text: "लड़ाई में शामिल हो जाओ।" }, { text: "किसी शिक्षक से उन्हें लड़ाई रोकने के लिए कहें।" }, { text: "चुपचाप वहाँ से चले जाओ — वरना आपको परेशानी हो सकती है।" },{ text: "उन्हें लड़ाई रोकने के लिए कहें और समस्या का समाधान ढूँढने में मदद करें।" } ] },
  // Test 18: text-only, 3 options
  { id: 18, text: "जब आपके दोस्त आपकी गलती पर हँसने लगें, तो आप क्या करेंगे?", options: [ { text: "दोस्तों के साथ हँसें और उसे मज़ाक की तरह लें।" }, { text: "हँसकर बात हल्की रखें और अपनी गलती सुधारने की कोशिश करें।" }, { text: "रोती हुई जगह छोड़ दें।" },{ text: "उन्हें विनम्रता से कहें कि मज़ाक न उड़ाएँ, और अपनी गलती सुधारें।" } ] },
  // Test 19: text-only, 3 options
  { id: 19, text: "सभी द्वीपों (आइलैंड्स) को जोड़ने के लिए कम से कम कितने पुलों की आवश्यकता होगी?", images: ["assets/img/g6/19/q1.png"],options: [ { text: "2" }, { text: "3" }, { text: "4" }, { text: "5" } ] },
  // Test 20: text-only, 3 options
  { id: 20, text: "कौन-सा टुकड़ा (पीस) फिट होकर एक वर्ग (स्क्वेयर) बनाएगा?", images: ["assets/img/g6/20/q1.png"], options: [  {image: "assets/img/g6/20/ch1.png" }, { image: "assets/img/g6/20/ch2.png" }, { image: "assets/img/g6/20/ch3.png" }, { image: "assets/img/g6/20/ch4.png" } ] }
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
  target.style.transform = 'scale(1)'; // reset

  const availW = wrap.clientWidth - 24; // guard padding
  const availH = wrap.clientHeight - 24;
  const rect = target.getBoundingClientRect();
  const contentW = rect.width;
  const contentH = rect.height;
  const scale = Math.min(1, Math.max(0.6, Math.min(availW / contentW, availH / contentH)));
  target.style.transform = `scale(${scale})`;
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
    document.getElementById('setName').textContent = 'Grade 6';
    // Hide loader and render first screen
    loader.classList.remove('show');
    render();
    indicate('Images preloaded');
  });
})();