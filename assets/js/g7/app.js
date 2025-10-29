function sanitizeHTML(html) {
  if (!html) return '';
  const tpl = document.createElement('template');
  tpl.innerHTML = html;

  const allowedTags = new Set(['B','I','U','BR','SUB','SUP','IMG']);
  const globalAllowedAttrs = new Set(['id']);                  // NEW: keep id on allowed tags
  const tagAllowedAttrs = { IMG: new Set(['src','alt']) };     // tag-specific attrs

  (function walk(node){
    [...node.children].forEach(el => {
      const tag = el.tagName;
      if (!allowedTags.has(tag)) {
        const text = document.createTextNode(el.textContent || '');
        el.replaceWith(text);
        return;
      }
      [...el.attributes].forEach(attr => {
        const name = attr.name.toLowerCase();
        const ok = globalAllowedAttrs.has(name) || tagAllowedAttrs[tag]?.has(name);
        if (!ok) el.removeAttribute(attr.name);
      });
      if (tag === 'IMG') {
        const src = el.getAttribute('src') || '';
        if (!/^(assets\/img\/|data:image\/|https?:\/\/)/i.test(src)) {
          el.removeAttribute('src');
        }
      }
      walk(el);
    });
  })(tpl.content);

  return tpl.innerHTML;
}


// ===== Data format =====
// id, text, subtext, image, images[], imageFirst, options[ {text?, image?} ]
const QUESTIONS = [
  // Test 1: question with image + 3 options
  { id: 1, imageFirst: true, images: ["assets/img/g7/1/q1.png"], text: "तीसरे स्थान पर कौन था?", options: [ { image: "assets/img/g7/1/ch1.png" }, { image: "assets/img/g7/1/ch2.png" }, { image: "assets/img/g7/1/ch3.png" }, { image: "assets/img/g7/1/ch4.png" } ] },
  // Test 2: image-first with 4 options
  { id: 2, text: "जब यह चादर एक घन में बदल जाती है तो <img id='imcimg' src='assets/img/g7/2/sq1.png'/> के विपरीत क्या होता है?", images: ["assets/img/g7/2/q1.png"], options: [  {image: "assets/img/g7/2/ch1.png" }, { image: "assets/img/g7/2/ch2.png" }, { image: "assets/img/g7/2/ch3.png" }, { image: "assets/img/g7/2/ch4.png" } ] },
  // Test 3: options with images (2 options only)
  { id: 3, text: "जब यह चादर एक घन में बदल जाती है तो <img id='imcimg' src='assets/img/g7/3/sq1.png'/> के विपरीत क्या होता है?", images: ["assets/img/g7/3/q1.png"], options: [  {image: "assets/img/g7/3/ch1.png" }, { image: "assets/img/g7/3/ch2.png" }, { image: "assets/img/g7/3/ch3.png" }, { image: "assets/img/g7/3/ch4.png" } ]  },
  // Test 4: question with images + 3 options (mixed text/image)
  { id: 4, text: "जब यह चादर एक घन में बदल जाती है तो <img id='imcimg' src='assets/img/g7/4/sq1.png'/> के विपरीत क्या होता है?", images: ["assets/img/g7/4/q1.png"], options: [  {image: "assets/img/g7/4/ch1.png" }, { image: "assets/img/g7/4/ch2.png" }, { image: "assets/img/g7/4/ch3.png" }, { image: "assets/img/g7/4/ch4.png" } ]  },
  // Test 5: 2 options, images only
  { id: 5, text: "वह कौन सा सही टुकड़ा है जो तस्वीर को पूरा करता है?", images: ["assets/img/g7/5/q1.png"], options: [ {image: "assets/img/g7/5/ch1.png" },{image: "assets/img/g7/5/ch2.png" },{image: "assets/img/g7/5/ch3.png" } ] },
  // Test 6: 4 text-only options, no images
  { id: 6, text: "वह कौन सा सही टुकड़ा है जो तस्वीर को पूरा करता है?", images: ["assets/img/g7/6/q1.png"], options: [ {image: "assets/img/g7/6/ch1.png" },{image: "assets/img/g7/6/ch2.png" },{image: "assets/img/g7/6/ch3.png" } ] },
  // Test 7: imageFirst with multiple images, 3 options
  { id: 7, text: "दिए गए जोड़ों का निरीक्षण करें। वेन आरेख में वस्तु कहां होगी?", images: ["assets/img/g7/7/q1.png"], options: [ {image: "assets/img/g7/7/ch1.png" },{image: "assets/img/g7/7/ch2.png" } ]  },
  // Test 8: text-only, 3 options
  { id: 8, text: "दिए गए जोड़ों का निरीक्षण करें। वेन आरेख में वस्तु कहां होगी?", images: ["assets/img/g7/8/q1.png"], options: [ {image: "assets/img/g7/8/ch1.png" },{image: "assets/img/g7/8/ch2.png" } ]  },
  // Test 9: text-only, 3 options
  { id: 9, text: "अगर लड़का हर बार पहला खुला हुआ मौड़ लेता है, तो वह कहां खत्म करेगा?", images: ["assets/img/g7/9/q1.png"], options: [ {text: "Option A" },{text: "Option B" },{text: "Option C" } ]  },
  // Test 10: text-only, 3 options
  { id: 10, text: "अगर लड़का हर बार पहला खुला हुआ मौड़ लेता है, तो वह कहां खत्म करेगा?", images: ["assets/img/g7/10/q1.png"], options: [ {text: "Option A" },{text: "Option B" },{text: "Option C" } ]  },
  // Test 11: text-only, 3 options
  { id: 11, text: "एक घड़ी 30 मिनट धीमी चल रही है और समय 5:00 PM दिखाती है। अब से 30 मिनट बाद सही समय क्या होगा?", options: [ { text: "5:30 PM" }, { text: "6:00 PM" }, { text: "6:30 PM" }, { text: "5:00 PM" } ] },
  // Test 12: text-only, 3 options
  { id: 12, text: "किस विकल्प का नीचे दिए गए विकल्प के समान संबंध है? सीमा : देश विकल्प", options: [ { text: "पेन : कैप विकल्प " }, { text: "नियंत्रण : विकल्प" }, { text: "कप : प्लेट विकल्प  " }, { text: " फ़्रेम (F): फोटो" } ] },
  // Test 13: text-only, 3 options
  { id: 13, text: "चित्र को देखें और सही शब्द बनाने के लिए गायब अक्षर पहचानें।", images: ["assets/img/g7/13/q1.png"], options: [ {image: "assets/img/g7/13/ch1.png" },{image: "assets/img/g7/13/ch2.png" },{image: "assets/img/g7/13/ch3.png" } ] },
  // Test 14: text-only, 3 options
  { id: 14, text: "सच बोलना क्यों ज़रूरी है?", options: [ { text: "सच बोलने से एक व्यक्ति को निडर होने में मदद मिलती है।" }, { text: "सच बोलना झूठ बोलने से बेहतर है।" }, { text: "सत्य होने की आवश्यकता नहीं है; हर कोई झूठ बोलता है।" },{ text: "सत्य होना शक्ति और साहस की निशानी है।" } ] },
  // Test 15: text-only, 3 options
  { id: 15, text: "आपको क्या लगता है कि जब माता-पिता कुछ हासिल करने के लिए एक बच्चे को चुनिंदा तरीके से उपहार देने का चुनाव करते हैं, तो वे क्या बताना चाहते हैं?", options: [ { text: "उस उपहार को मुफ्त नहीं दिया जाता है।" }, { text: "कि बच्चे जो चाहें मांग सकते हैं।" }, { text: "यह उपहार बहुत कम दिया जाना चाहिए।" },{ text: "यह उपहार केवल उन लोगों को दिया जाना चाहिए जो उनके योग्य हैं।" } ] },
  // Test 16: text-only, 3 options
  { id: 16, text: "आपका दोस्त आमतौर पर स्कूल के बाद आपके साथ घर जाने के लिए आपका इंतज़ार करता है। लेकिन एक दिन वह बिना इंतज़ार किए चला जाता है। आप क्या करेंगे?", options: [ { text: "जैसे ही संभव हो, पता करें कि वह बिना इंतज़ार किए क्यों चला गया और क्या वह ठीक है।" }, { text: "अगले दिन स्कूल में इस बारे में दोस्त से पूछें।" }, { text: "इंतज़ार न करने पर दोस्त से लड़ें।" },{ text: "चुपचाप दोस्ती तोड़ दें।" } ] },
  // Test 17: text-only, 3 options
  { id: 17, text: "जब कोई अनजाने में आपको चोट पहुँचाए, तो आपको क्या करना चाहिए?", options: [ { text: "उन्हें माफ कर दें। जब आप बेहतर/शांत महसूस करें, तब उन्हें बताएँ कि आपको कैसा लगा।" }, { text: "उनसे बात करना बंद कर दें।" }, { text: "उनसे रिश्ते में दूरी बनाए रखें।" },{ text: "उनके बारे में दूसरों से शिकायत करें।" } ] },
  // Test 18: text-only, 3 options
  { id: 18, text: "एक टीम में काम करने' का क्या अर्थ है?", options: [ { text: "दूसरों की बातों से सहमत होना।" }, { text: "जब नेता बोलता है तो चुप रहना।" }, { text: "सदस्यों के साथ सहयोग करना।" },{ text: "एक लक्ष्य के लिए काम करना।" } ] },
  // Test 19: text-only, 3 options
  { id: 19, text: "नीचे दिखाए गए साए (शैडो) को बनाने के लिए आपको कौन-सा हाथ का इशारा (हैंड जेस्चर) करना होगा?", images: ["assets/img/g7/19/q1.png"],options: [ {image: "assets/img/g7/19/ch1.png" }, { image: "assets/img/g7/19/ch2.png" }, { image: "assets/img/g7/19/ch3.png" } ] },
  // Test 20: text-only, 3 options
  { id: 20, text: "एक कागज़ को दिखाए अनुसार मोड़कर छेद किए गए हैं। खोलने पर छेदों का सही पैटर्न किस विकल्प में है?", images: ["assets/img/g7/20/q1.png"], options: [  {image: "assets/img/g7/20/ch1.png" }, { image: "assets/img/g7/20/ch2.png" }, { image: "assets/img/g7/20/ch3.png" } ] }
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
  
  
// NEW: parse <img> in text/subtext
[q.text, q.subtext].forEach(html => {
  if (!html) return;
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  tpl.content.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    if(src) set.add(src);  
  });
});
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

  const rect = target.getBoundingClientRect();
  if(!rect.width || !rect.height) return;

  const availW = Math.max(0, wrap.clientWidth - 24);
  const availH = Math.max(0, wrap.clientHeight - 24);
  if(!availW || !availH) return;

  const widthScale = availW / rect.width;
  const heightScale = availH / rect.height;
  const downscale = Math.min(widthScale, heightScale);

  if(downscale < 0.999){
    target.style.transform = `scale(${downscale})`;
    wrap.classList.add('scaled');
    return;
  }

  const upscale = Math.min(widthScale, heightScale, 1.12);
  if(upscale > 1.02){
    target.style.transform = `scale(${upscale})`;
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
    img.alt = '';
    img.addEventListener('load', fitToScreen, { once: true });
    img.src = src;
    img.className = 'img-enter';
    wrapper.appendChild(img);
    requestAnimationFrame(()=>{ img.classList.add('img-enter-active'); });
  });

  media.appendChild(wrapper);
  media.classList.remove('hidden');
  requestAnimationFrame(fitToScreen);
}

function renderQuestion(q){
  // Question
  const qt = $('#questionText');
  const qs = $('#questionSub');
  qt.innerHTML = sanitizeHTML(q.text || '');
  qt.classList.toggle('hidden', !q.text);
  qs.innerHTML = sanitizeHTML(q.subtext || '');
  qs.classList.toggle('hidden', !q.subtext);

  qt.querySelectorAll('img').forEach(img => img.addEventListener('load', fitToScreen, { once: true }));
  qs.querySelectorAll('img').forEach(img => img.addEventListener('load', fitToScreen, { once: true }));

  // If image exists and not in image-first phase, show it above question
  if(!q.imageFirst && (q.image || (q.images && q.images.length))){ renderImages(q); }
  else { $('#mediaBlock').classList.add('hidden'); }

  // Choices
  const choices = $('#choices');
  choices.innerHTML = '';
  const opts = (q.options || []).slice(0,4);
  const textOnly = opts.length > 0 && opts.every(opt => !opt.image);
  choices.classList.toggle('text-only', textOnly);
  const labels = ['A','B','C','D'];
  opts.forEach((opt, i) => {
    const row = el('div','choice');
    const lab = el('div','label');
    lab.textContent = labels[i];
    row.appendChild(lab);

    const content = el('div','content');
    /*const optname = el('div','optname');
    optname.textContent = `Option ${labels[i]}`;
    content.appendChild(optname);*/

    if(opt.image){
      const img = document.createElement('img');
      img.alt='';
      img.addEventListener('load', fitToScreen, { once: true });
      img.src = opt.image;
      content.appendChild(img);
    }
    if(opt.text){ const span = el('div','text'); span.textContent = opt.text; content.appendChild(span); }

    row.appendChild(content);
    choices.appendChild(row);
  });

  // Animate in question & choices (staggered)
  requestAnimationFrame(() => {
    const items = [qt, qs, ...choices.children].filter(node => !node.classList.contains('hidden'));
    items.forEach((node, i) => {
      node.classList.add('fade-up');
      setTimeout(() => node.classList.add('fade-up-active'), 60 + i*70);
      setTimeout(() => node.classList.remove('fade-up','fade-up-active'), 700);
    });
  });

  requestAnimationFrame(fitToScreen);
}

function render(){
  const q = QUESTIONS[idx];

  // INTERLUDE PHASE
  if(phase === 'interlude'){
    const il = document.getElementById('interlude');
    const title = document.getElementById('interludeTitle');
    const badge = document.getElementById('interludeBadge');
    const meta = document.getElementById('interludeMeta');

    document.getElementById('cardInner')?.classList.remove('media-only');
    $('#mediaBlock').classList.remove('media-only');

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
  const cardInner = document.getElementById('cardInner');
  const mediaBlock = $('#mediaBlock');

  if(twoPhase && phase === 'image'){
    const imageCount = (q.image ? 1 : 0) + (Array.isArray(q.images) ? q.images.length : 0);
    const centerMedia = imageCount === 1;
    cardInner?.classList.toggle('media-only', centerMedia);
    mediaBlock?.classList.toggle('media-only', centerMedia);
    renderImages(q);
    $('#questionBlock').classList.add('hidden');
  } else {
    cardInner?.classList.remove('media-only');
    mediaBlock?.classList.remove('media-only');
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
    document.getElementById('setName').textContent = 'Grade 7';
    // Hide loader and render first screen
    loader.classList.remove('show');
    render();
    indicate('Images preloaded');
  });
})();