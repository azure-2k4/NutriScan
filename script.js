/* ─── PRODUCT DATABASE ────────────────────── */
const products = {
  oats:{
    icon:'🌾',name:'Rolled Oats Original',brand:'GrainCo · Barcode: 8901234567890',
    score:92,badge:'🟢 Excellent',badgeClass:'badge-green',scoreClass:'score-green',
    tags:'<span class="tag tag-veg">✓ Vegetarian</span><span class="tag tag-veg">✓ Gluten Free</span><span class="tag tag-sugar">⚠ Low Sugar</span>',
    nutrition:[
      {v:'379',l:'Calories (kcal)'},{v:'17g',l:'Protein'},{v:'1g',l:'Sugar'},{v:'7g',l:'Fat'},
      {v:'10g',l:'Fibre'},{v:'66g',l:'Carbs'},{v:'2mg',l:'Sodium'},{v:'No',l:'Additives'}
    ],
    ai:"Excellent choice! Rolled oats are a whole grain powerhouse — high in beta-glucan fibre which helps lower cholesterol and regulate blood sugar. Perfect for your diabetes management goal. Low glycemic index, minimal processing, and no added sugar make this a top-rated breakfast option.",
    alerts:[],
    alts:[{e:'🥜',n:'Roasted Almonds',s:85},{e:'🫐',n:'Blueberry Oat Cup',s:89},{e:'🍌',n:'Banana Wheat Flakes',s:79}]
  },
  yogurt:{
    icon:'🥛',name:'Greek Yogurt Plain',brand:'DairyCo · Barcode: 8900012345678',
    score:88,badge:'🟢 Excellent',badgeClass:'badge-green',scoreClass:'score-green',
    tags:'<span class="tag tag-veg">✓ Vegetarian</span><span class="tag tag-sugar">✓ Low Sugar</span>',
    nutrition:[
      {v:'100',l:'Calories (kcal)'},{v:'10g',l:'Protein'},{v:'4g',l:'Sugar'},{v:'3g',l:'Fat'},
      {v:'0g',l:'Fibre'},{v:'6g',l:'Carbs'},{v:'36mg',l:'Sodium'},{v:'Live',l:'Probiotics'}
    ],
    ai:"Greek yogurt is an excellent high-protein snack. Rich in probiotics for gut health and calcium for bone strength. The natural sugar (lactose) is moderate and doesn't spike blood sugar as quickly as added sugars. A great fit for your weight loss and diabetes management goals.",
    alerts:[{type:'warn',text:'Contains dairy — check your allergy settings if lactose intolerant'}],
    alts:[{e:'🌿',n:'Coconut Yogurt (Vegan)',s:82},{e:'🍓',n:'Soy Protein Shake',s:78},{e:'🫘',n:'Cottage Cheese',s:85}]
  },
  chips:{
    icon:'🍟',name:'Classic Potato Chips',brand:'CrunchBrand · Barcode: 5012345678901',
    score:28,badge:'🔴 Avoid',badgeClass:'badge-red',scoreClass:'score-red',
    tags:'<span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">⚠ High Fat</span><span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">⚠ High Sodium</span>',
    nutrition:[
      {v:'536',l:'Calories (kcal)'},{v:'7g',l:'Protein'},{v:'0.5g',l:'Sugar'},{v:'35g',l:'Fat'},
      {v:'2g',l:'Fibre'},{v:'53g',l:'Carbs'},{v:'570mg',l:'Sodium'},{v:'Yes',l:'Additives'}
    ],
    ai:"This product scores very low. Extremely high in saturated fat, sodium, and ultra-processed additives. Offers almost no nutritional benefit. The high sodium content is concerning for blood pressure and the high fat content conflicts directly with your weight loss goal. Not recommended.",
    alerts:[
      {type:'red',text:'Very high sodium — 570mg per serving (24% of daily limit)'},
      {type:'red',text:'High saturated fat — conflicts with weight loss goal'},
      {type:'warn',text:'Contains artificial flavourings and preservatives'}
    ],
    alts:[{e:'🥜',n:'Roasted Almonds',s:85},{e:'🌽',n:'Popcorn (Air Popped)',s:72},{e:'🥕',n:'Veggie Straws',s:58}]
  },
  cola:{
    icon:'🥤',name:'Cola Fizzy Drink',brand:'SodaCo · Barcode: 4901234567890',
    score:15,badge:'🔴 Avoid',badgeClass:'badge-red',scoreClass:'score-red',
    tags:'<span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">⚠ Very High Sugar</span><span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">⚠ No Nutrients</span>',
    nutrition:[
      {v:'140',l:'Calories (kcal)'},{v:'0g',l:'Protein'},{v:'39g',l:'Sugar'},{v:'0g',l:'Fat'},
      {v:'0g',l:'Fibre'},{v:'39g',l:'Carbs'},{v:'45mg',l:'Sodium'},{v:'Yes',l:'Additives'}
    ],
    ai:"Critically low score. A 330ml can contains 39g of pure sugar — nearly 10 teaspoons. This is directly contraindicated for your diabetes management goal. Zero nutritional value, causes severe blood sugar spikes, and regular consumption is strongly linked to metabolic syndrome. Avoid completely.",
    alerts:[
      {type:'red',text:'Critically high sugar — 39g per can (78% of recommended daily limit)'},
      {type:'red',text:'DANGEROUS for diabetes — causes severe blood sugar spikes'},
      {type:'red',text:'Contains phosphoric acid — detrimental to bone density'}
    ],
    alts:[{e:'💧',n:'Plain Sparkling Water',s:98},{e:'🍋',n:'Infused Lemon Water',s:95},{e:'🫖',n:'Unsweetened Green Tea',s:90}]
  },
  granola:{
    icon:'🍫',name:'Chocolate Granola Bar',brand:'SnackRight · Barcode: 7891234567890',
    score:61,badge:'🟡 Moderate',badgeClass:'badge-yellow',scoreClass:'score-yellow',
    tags:'<span class="tag tag-sugar">⚠ Moderate Sugar</span><span class="tag tag-veg">✓ Vegetarian</span>',
    nutrition:[
      {v:'210',l:'Calories (kcal)'},{v:'5g',l:'Protein'},{v:'14g',l:'Sugar'},{v:'8g',l:'Fat'},
      {v:'3g',l:'Fibre'},{v:'30g',l:'Carbs'},{v:'95mg',l:'Sodium'},{v:'Some',l:'Additives'}
    ],
    ai:"A decent snack option but not ideal for your goals. The chocolate adds flavour but also increases added sugar content. Has some fibre and protein which moderates the blood sugar impact. Occasional consumption is okay, but there are significantly better snack alternatives for diabetes management.",
    alerts:[{type:'warn',text:'Contains 14g of sugar — monitor portion size carefully'},{type:'warn',text:'May contain traces of peanuts — allergen risk for you'}],
    alts:[{e:'🌾',n:'Rolled Oats',s:92},{e:'🥜',n:'Roasted Almonds',s:85},{e:'🍌',n:'Fresh Banana',s:88}]
  },
  almonds:{
    icon:'🥜',name:'Roasted Almonds (Unsalted)',brand:'NutHouse · Barcode: 3456789012345',
    score:85,badge:'🟢 Excellent',badgeClass:'badge-green',scoreClass:'score-green',
    tags:'<span class="tag tag-veg">✓ Vegan</span><span class="tag tag-veg">✓ Gluten Free</span><span class="tag tag-sugar">✓ No Added Sugar</span>',
    nutrition:[
      {v:'580',l:'Calories (kcal)'},{v:'21g',l:'Protein'},{v:'4g',l:'Sugar'},{v:'50g',l:'Fat'},
      {v:'12g',l:'Fibre'},{v:'22g',l:'Carbs'},{v:'1mg',l:'Sodium'},{v:'No',l:'Additives'}
    ],
    ai:"Excellent heart-healthy snack. Almonds are rich in monounsaturated fats, vitamin E, magnesium, and fibre. Despite being calorie-dense, they have a low glycemic index and research shows they can improve insulin sensitivity. A 30g serving (about 23 almonds) is the ideal daily portion for your goals.",
    alerts:[{type:'red',text:'⚠ PEANUT ALLERGY ALERT: Although almonds are tree nuts, cross-contamination may occur in facilities that also process peanuts. Check packaging.'}],
    alts:[{e:'🌰',n:'Cashews (Unsalted)',s:78},{e:'🫐',n:'Mixed Seeds',s:82},{e:'🍃',n:'Pumpkin Seeds',s:80}]
  }
};

/* ─── PAGE NAVIGATION ──────────────────────── */
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b=>b.classList.remove('active'));
  const page = document.getElementById('page-'+name);
  if(page) page.classList.add('active');
  const btn = document.getElementById('nav-'+name);
  if(btn) btn.classList.add('active');
  window.scrollTo(0,0);
}

/* ─── DEMO PRODUCT LOADING ─────────────────── */
function loadDemo(key){
  const p = products[key];
  if(!p) return;
  document.getElementById('rcIcon').textContent = p.icon;
  document.getElementById('rcName').textContent = p.name;
  document.getElementById('rcBrand').textContent = p.brand;
  document.getElementById('rcTags').innerHTML = p.tags;
  document.getElementById('rcScore').textContent = p.score;
  document.getElementById('rcScore').className = 'big-score '+p.scoreClass;
  const badge = document.getElementById('rcBadge');
  badge.textContent = p.badge;
  badge.className = 'big-badge '+p.badgeClass;
  // Nutrition
  const nt = document.getElementById('nutritionTable');
  nt.innerHTML = p.nutrition.map(n=>`<div class="nt-cell"><div class="nt-val">${n.v}</div><div class="nt-label">${n.l}</div></div>`).join('');
  // AI text
  document.getElementById('aiText').textContent = p.ai;
  // Alerts
  const al = document.getElementById('allergenAlerts');
  al.innerHTML = p.alerts.map(a=>`<div class="alert-row${a.type==='warn'?' warn':''}"><div class="alert-dot ${a.type}"></div><span class="alert-text">${a.text}</span></div>`).join('');
  // Alternatives
  document.getElementById('altGrid').innerHTML = p.alts.map(a=>`<div class="alt-card" onclick="loadDemo('${a.n.toLowerCase().replace(/\s+/g,'').replace(/[^a-z]/g,'')}')"><div class="alt-emoji">${a.e}</div><div class="alt-name">${a.n}</div><div class="alt-score">Score: ${a.s}</div></div>`).join('');

  showPage('dashboard');
  showToast(`🔍 Loaded: ${p.name}`);
}

/* ─── SEARCH ───────────────────────────────── */
function triggerSearch(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const map = {oat:'oats',oats:'oats',yogurt:'yogurt',chip:'chips',chips:'chips',cola:'cola',granola:'granola',almond:'almonds',almonds:'almonds',yoghurt:'yogurt'};
  let found = null;
  for(const k of Object.keys(map)){if(q.includes(k)){found=map[k];break;}}
  if(found){loadDemo(found);}
  else if(q){showToast('🤖 Searching database...');setTimeout(()=>{showToast('❌ Product not found. Try manual entry.');},1400);}
  else{showToast('Please enter a product name');}
}
document.getElementById('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')triggerSearch();});

/* ─── TAB SWITCHER ─────────────────────────── */
function setTab(el,mode){
  document.querySelectorAll('.stab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const input = document.getElementById('searchInput');
  if(mode==='barcode'){input.placeholder='Enter barcode number...';}
  else if(mode==='manual'){input.placeholder='Manual entry...';openModal();}
  else{input.placeholder='Product name or barcode...';}
}
/* ─── BARCODE SCANNER ───────────────────────── */
let scannerCodeReader = null;
let scannerStream = null;
let scanActive = false;

// Barcode → product key mapping (demo: map known barcodes to products)
const barcodeMap = {
  '8901234567890': 'oats',
  '8900012345678': 'yogurt',
  '5012345678901': 'chips',
  '4901234567890': 'cola',
  '7891234567890': 'granola',
  '3456789012345': 'almonds',
};

function openScanner(){
  const overlay = document.getElementById('scannerOverlay');
  overlay.classList.add('open');
  document.getElementById('scannerError').classList.remove('show');
  setStatus('Initialising camera…', false);
  startScanner();
}

function closeScanner(){
  scanActive = false;
  document.getElementById('scannerOverlay').classList.remove('open');
  stopCamera();
  // Reset the barcode tab back to name tab visually
  const tabs = document.querySelectorAll('.stab');
  tabs.forEach(t => t.classList.remove('active'));
  if(tabs[0]) tabs[0].classList.add('active');
  document.getElementById('searchInput').placeholder = 'Product name or barcode...';
}

function stopCamera(){
  if(scannerCodeReader){
    try{ scannerCodeReader.reset(); } catch(e){}
    scannerCodeReader = null;
  }
  if(scannerStream){
    scannerStream.getTracks().forEach(t => t.stop());
    scannerStream = null;
  }
  const video = document.getElementById('scannerVideo');
  video.srcObject = null;
}

function setStatus(text, isDetecting=false, isFound=false){
  const el = document.getElementById('scannerStatus');
  const txt = document.getElementById('scannerStatusText');
  txt.textContent = text;
  el.className = 'scanner-status';
  if(isFound) el.classList.add('found');
  else if(isDetecting) el.classList.add('detecting');
}

async function startScanner(){
  scanActive = true;
  const video = document.getElementById('scannerVideo');

  // Request camera
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = scannerStream;
    setStatus('Scanning… point at a barcode', true);
  } catch(err) {
    document.getElementById('scannerError').classList.add('show');
    return;
  }

  // Try ZXing first (best barcode support)
  if(window.ZXing){
    useZXing(video);
    return;
  }

  // Fallback: BarcodeDetector API (Chrome/Edge native)
  if('BarcodeDetector' in window){
    useBarcodeDetector(video);
    return;
  }

  // Last fallback: manual barcode input prompt
  setStatus('Camera ready — enter barcode manually', false);
  showManualBarcodePrompt();
}

/* ── ZXing scanner ── */
function useZXing(video){
  try{
    const hints = new Map();
    const formats = [
      ZXing.BarcodeFormat.EAN_13,
      ZXing.BarcodeFormat.EAN_8,
      ZXing.BarcodeFormat.UPC_A,
      ZXing.BarcodeFormat.UPC_E,
      ZXing.BarcodeFormat.CODE_128,
      ZXing.BarcodeFormat.CODE_39,
      ZXing.BarcodeFormat.QR_CODE,
      ZXing.BarcodeFormat.DATA_MATRIX,
    ];
    hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true);

    scannerCodeReader = new ZXing.BrowserMultiFormatReader(hints, 400);

    scannerCodeReader.decodeFromVideoElement(video, (result, err) => {
      if(!scanActive) return;
      if(result){
        onBarcodeDetected(result.getText());
      }
    });
  } catch(e){
    // ZXing failed, try native
    if('BarcodeDetector' in window) useBarcodeDetector(video);
    else showManualBarcodePrompt();
  }
}

/* ── Native BarcodeDetector API ── */
async function useBarcodeDetector(video){
  const detector = new BarcodeDetector({
    formats: ['ean_13','ean_8','upc_a','upc_e','code_128','code_39','qr_code']
  });

  async function tick(){
    if(!scanActive) return;
    try{
      const barcodes = await detector.detect(video);
      if(barcodes.length > 0){
        onBarcodeDetected(barcodes[0].rawValue);
        return;
      }
    } catch(e){}
    requestAnimationFrame(tick);
  }
  video.addEventListener('play', tick, {once:true});
}

/* ── On barcode detected ── */
function onBarcodeDetected(code){
  if(!scanActive) return;
  scanActive = false; // prevent double-fire

  // Flash green on the scan window
  const flash = document.getElementById('foundFlash');
  flash.classList.add('flash');
  setTimeout(()=> flash.classList.remove('flash'), 300);

  setStatus(`✓ Barcode: ${code}`, false, true);
  showToast(`📦 Barcode detected: ${code}`);

  setTimeout(()=>{
    closeScanner();
    // Look up the barcode in our map
    const key = barcodeMap[code];
    if(key){
      loadDemo(key);
      showToast(`✅ Product found for barcode ${code}!`);
    } else {
      // Unknown barcode — show in search input and try text search
      document.getElementById('searchInput').value = code;
      showPage('dashboard');
      showToast(`🔍 Barcode ${code} — not in demo DB. Try a known barcode.`);
      // Show a hint of known barcodes
      setTimeout(()=> showToast('💡 Try: 8901234567890 (Oats) or 4901234567890 (Cola)'), 3000);
    }
  }, 600);
}

/* ── Fallback: show manual barcode entry in scanner footer ── */
function showManualBarcodePrompt(){
  const footer = document.querySelector('.scanner-footer');
  footer.innerHTML = `
    <div class="scanner-hint" style="margin-bottom:4px;">Camera scanning unavailable in this browser.<br>Enter barcode manually:</div>
    <div style="display:flex;gap:8px;width:100%;max-width:320px;">
      <input id="manualBarcodeInput" style="flex:1;padding:11px 14px;border-radius:8px;border:1.5px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:white;font-size:.9rem;font-family:var(--font-body);outline:none;" placeholder="e.g. 8901234567890" type="number"/>
      <button onclick="submitManualBarcode()" style="padding:11px 18px;border-radius:8px;background:var(--emerald);color:white;border:none;font-weight:600;cursor:pointer;font-family:var(--font-body);">Go</button>
    </div>
    <div class="scanner-hint" style="font-size:.72rem;margin-top:2px;">Demo barcodes: 8901234567890 · 4901234567890 · 5012345678901</div>
  `;
  const input = document.getElementById('manualBarcodeInput');
  if(input) input.addEventListener('keydown', e=>{ if(e.key==='Enter') submitManualBarcode(); });
}

function submitManualBarcode(){
  const input = document.getElementById('manualBarcodeInput');
  if(!input) return;
  const code = input.value.trim();
  if(code) onBarcodeDetected(code);
}

/* ─── AUTH ─────────────────────────────────── */
function handleRegister(){showToast('✅ Account created! Redirecting...');setTimeout(()=>showPage('dashboard'),800);}
function handleLogin(){showToast('✅ Signed in!');setTimeout(()=>showPage('dashboard'),600);}

/* ─── FAV ──────────────────────────────────── */
function toggleFav(btn){
  if(btn.textContent.includes('☆')){btn.textContent='★ Saved';btn.style.background='var(--emerald-light)';btn.style.color='var(--emerald)';showToast('❤️ Added to favourites!');}
  else{btn.textContent='☆ Save';btn.style.background='';btn.style.color='';showToast('Removed from favourites');}
}

/* ─── MODAL ─────────────────────────────────── */
function openModal(){document.getElementById('modalOverlay').classList.add('open');}
function closeModal(){document.getElementById('modalOverlay').classList.remove('open');}
document.getElementById('modalOverlay').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal();});



/* ─── TOAST ─────────────────────────────────── */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'),2800);
}

/* ─── FILTER TABS ────────────────────────────── */
document.querySelectorAll('.fh-filter').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.fh-filter').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
  });
});
