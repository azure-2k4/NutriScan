/* ─── PRODUCT DATABASE ────────────────────── */
const products = {
  oats:{
    name:'Rolled Oats Original',brand:'GrainCo · Barcode: 8901234567890',
    score:92,badge:'Excellent',badgeClass:'badge-green',scoreClass:'score-green',
    tags:'<span class="tag tag-veg">Vegetarian</span><span class="tag tag-veg">Gluten Free</span><span class="tag tag-sugar">Low Sugar</span>',
    nutrition:[
      {v:'379',l:'Calories (kcal)'},{v:'17g',l:'Protein'},{v:'1g',l:'Sugar'},{v:'7g',l:'Fat'},
      {v:'10g',l:'Fibre'},{v:'66g',l:'Carbs'},{v:'2mg',l:'Sodium'},{v:'None',l:'Additives'}
    ],
    img: 'oat.webp',
    ai:"Excellent choice. Rolled oats are a whole grain powerhouse — high in beta-glucan fibre which helps lower cholesterol and regulate blood sugar. Perfect for your diabetes management goal. Low glycemic index, minimal processing, and no added sugar make this a top-rated breakfast option.",
    alerts:[],
    alts:[{key:'almonds',n:'Roasted Almonds',s:85,icon:'RA',img:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Blueberry Oat Cup',s:89,icon:'BO',img:'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Banana Wheat Flakes',s:79,icon:'BW',img:'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'}]
  },
  yogurt:{
    name:'Greek Yogurt Plain',brand:'DairyCo · Barcode: 8900012345678',
    score:88,badge:'Excellent',badgeClass:'badge-green',scoreClass:'score-green',
    tags:'<span class="tag tag-veg">Vegetarian</span><span class="tag tag-sugar">Low Sugar</span>',
    nutrition:[
      {v:'100',l:'Calories (kcal)'},{v:'10g',l:'Protein'},{v:'4g',l:'Sugar'},{v:'3g',l:'Fat'},
      {v:'0g',l:'Fibre'},{v:'6g',l:'Carbs'},{v:'36mg',l:'Sodium'},{v:'Live',l:'Probiotics'}
    ],
    img: 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&q=80&w=200&h=200',
    ai:"Greek yogurt is an excellent high-protein snack. Rich in probiotics for gut health and calcium for bone strength. The natural sugar (lactose) is moderate and does not spike blood sugar as quickly as added sugars. A great fit for your weight loss and diabetes management goals.",
    alerts:[{type:'warn',text:'Contains dairy — check your allergy settings if lactose intolerant'}],
    alts:[{n:'Coconut Yogurt',s:82,icon:'CY',img:'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Soy Protein Shake',s:78,icon:'SP',img:'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'},{n:'Cottage Cheese',s:85,icon:'CC',img:'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'}]
  },
  chips:{
    name:'Classic Potato Chips',brand:'CrunchBrand · Barcode: 5012345678901',
    score:28,badge:'Avoid',badgeClass:'badge-red',scoreClass:'score-red',
    tags:'<span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">High Fat</span><span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">High Sodium</span>',
    nutrition:[
      {v:'536',l:'Calories (kcal)'},{v:'7g',l:'Protein'},{v:'0.5g',l:'Sugar'},{v:'35g',l:'Fat'},
      {v:'2g',l:'Fibre'},{v:'53g',l:'Carbs'},{v:'570mg',l:'Sodium'},{v:'Yes',l:'Additives'}
    ],
    img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=200&h=200',
    ai:"This product scores very low. Extremely high in saturated fat, sodium, and ultra-processed additives. Offers almost no nutritional benefit. The high sodium content is concerning for blood pressure and the high fat content conflicts directly with your weight loss goal. Not recommended.",
    alerts:[
      {type:'red',text:'Very high sodium — 570mg per serving (24% of daily limit)'},
      {type:'red',text:'High saturated fat — conflicts with weight loss goal'},
      {type:'warn',text:'Contains artificial flavourings and preservatives'}
    ],
    alts:[{n:'Roasted Almonds',s:85,icon:'RA',img:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Popcorn (Air Popped)',s:72,icon:'AP',img:'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'},{n:'Veggie Straws',s:58,icon:'VS',img:'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'}]
  },
  cola:{
    name:'Cola Fizzy Drink',brand:'SodaCo · Barcode: 4901234567890',
    score:15,badge:'Avoid',badgeClass:'badge-red',scoreClass:'score-red',
    tags:'<span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">Very High Sugar</span><span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">No Nutrients</span>',
    nutrition:[
      {v:'140',l:'Calories (kcal)'},{v:'0g',l:'Protein'},{v:'39g',l:'Sugar'},{v:'0g',l:'Fat'},
      {v:'0g',l:'Fibre'},{v:'39g',l:'Carbs'},{v:'45mg',l:'Sodium'},{v:'Yes',l:'Additives'}
    ],
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200&h=200',
    ai:"Critically low score. A 330ml can contains 39g of pure sugar — nearly 10 teaspoons. This is directly contraindicated for your diabetes management goal. Zero nutritional value, causes severe blood sugar spikes, and regular consumption is strongly linked to metabolic syndrome. Avoid completely.",
    alerts:[
      {type:'red',text:'Critically high sugar — 39g per can (78% of recommended daily limit)'},
      {type:'red',text:'Dangerous for diabetes — causes severe blood sugar spikes'},
      {type:'red',text:'Contains phosphoric acid — detrimental to bone density'}
    ],
    alts:[{n:'Plain Sparkling Water',s:98,icon:'SW',img:'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Infused Lemon Water',s:95,icon:'LW',img:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Unsweetened Green Tea',s:90,icon:'GT',img:'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'}]
  },
  granola:{
    name:'Chocolate Granola Bar',brand:'SnackRight · Barcode: 7891234567890',
    score:61,badge:'Moderate',badgeClass:'badge-yellow',scoreClass:'score-yellow',
    tags:'<span class="tag tag-sugar">Moderate Sugar</span><span class="tag tag-veg">Vegetarian</span>',
    nutrition:[
      {v:'210',l:'Calories (kcal)'},{v:'5g',l:'Protein'},{v:'14g',l:'Sugar'},{v:'8g',l:'Fat'},
      {v:'3g',l:'Fibre'},{v:'30g',l:'Carbs'},{v:'95mg',l:'Sodium'},{v:'Some',l:'Additives'}
    ],
    img: 'choco.jpeg',
    ai:"A decent snack option but not ideal for your goals. The chocolate adds flavour but also increases added sugar content. Has some fibre and protein which moderates the blood sugar impact. Occasional consumption is fine, but there are significantly better snack alternatives for diabetes management.",
    alerts:[{type:'warn',text:'Contains 14g of sugar — monitor portion size carefully'},{type:'warn',text:'May contain traces of peanuts — allergen risk'}],
    alts:[{key:'oats',n:'Rolled Oats',s:92,icon:'RO',img:'oat.webp',bg:'var(--emerald-light)',col:'var(--emerald)'},{key:'almonds',n:'Roasted Almonds',s:85,icon:'RA',img:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Fresh Banana',s:88,icon:'FB',img:'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'}]
  },
  almonds:{
    name:'Roasted Almonds (Unsalted)',brand:'NutHouse · Barcode: 3456789012345',
    score:85,badge:'Excellent',badgeClass:'badge-green',scoreClass:'score-green',
    tags:'<span class="tag tag-veg">Vegan</span><span class="tag tag-veg">Gluten Free</span><span class="tag tag-sugar">No Added Sugar</span>',
    nutrition:[
      {v:'580',l:'Calories (kcal)'},{v:'21g',l:'Protein'},{v:'4g',l:'Sugar'},{v:'50g',l:'Fat'},
      {v:'12g',l:'Fibre'},{v:'22g',l:'Carbs'},{v:'1mg',l:'Sodium'},{v:'None',l:'Additives'}
    ],
    img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=200&h=200',
    ai:"Excellent heart-healthy snack. Almonds are rich in monounsaturated fats, vitamin E, magnesium, and fibre. Despite being calorie-dense, they have a low glycemic index and research shows they can improve insulin sensitivity. A 30g serving (about 23 almonds) is the ideal daily portion for your goals.",
    alerts:[{type:'red',text:'Allergen note: cross-contamination with peanuts may occur — check packaging carefully'}],
    alts:[{n:'Cashews (Unsalted)',s:78,icon:'CU',img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'},{n:'Mixed Seeds',s:82,icon:'MS',img:'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Pumpkin Seeds',s:80,icon:'PS',img:'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'}]
  },
  nutella:{
    name:'Nutella Hazelnut Spread',brand:'Ferrero · Barcode: 3017620422003',
    score:18,badge:'Avoid',badgeClass:'badge-red',scoreClass:'score-red',
    tags:'<span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">High Sugar</span><span class="tag tag-sugar" style="background:var(--rose-light);color:var(--rose);">Palm Oil</span>',
    nutrition:[
      {v:'539',l:'Calories (kcal)'},{v:'6.3g',l:'Protein'},{v:'56.3g',l:'Sugar'},{v:'30.9g',l:'Fat'},
      {v:'3.3g',l:'Fibre'},{v:'57.5g',l:'Carbs'},{v:'42mg',l:'Sodium'},{v:'Yes',l:'Additives'}
    ],
    img: 'https://images.unsplash.com/photo-1534432041531-15509930776b?auto=format&fit=crop&q=80&w=200&h=200',
    ai:"This product is very high in sugar and saturated fats. Over 50% of Nutella is pure sugar. The presence of palm oil is also a concern for both heart health and sustainability. For your weight loss goal, this should be avoided or consumed in very small quantities. It causes rapid blood sugar spikes, making it unsuitable for diabetes management.",
    alerts:[
      {type:'red',text:'Very high sugar content — 56g per 100g'},
      {type:'red',text:'Contains Palm Oil — high in saturated fats'},
      {type:'warn',text:'Contains Hazelnuts and Milk — major allergens'}
    ],
    alts:[{n:'Almond Butter',s:82,icon:'AB',img:'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Peanut Butter (Unsweetened)',s:75,icon:'PB',img:'https://images.unsplash.com/photo-1581447100595-3773bc4f0aa9?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'},{n:'Dark Chocolate (85%)',s:68,icon:'DC',img:'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'}]
  },
  kitkat:{
    name:'KitKat Milk Chocolate',brand:'Nestlé · Barcode: 7613032707717',
    score:48,badge:'Moderate',badgeClass:'badge-yellow',scoreClass:'score-yellow',
    tags:'<span class="tag tag-sugar">Moderate Sugar</span><span class="tag tag-veg">Vegetarian</span>',
    nutrition:[
      {v:'215',l:'Calories (kcal)'},{v:'3.1g',l:'Protein'},{v:'21.5g',l:'Sugar'},{v:'11g',l:'Fat'},
      {v:'0.9g',l:'Fibre'},{v:'27.5g',l:'Carbs'},{v:'29mg',l:'Sodium'},{v:'Some',l:'Additives'}
    ],
    img: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33e2d?auto=format&fit=crop&q=80&w=200&h=200',
    ai:"A classic chocolate wafer bar with moderate nutrition profile. While it contains significant added sugar (21.5g per bar), the wafer structure provides some carbohydrates and a small amount of protein. Not ideal for weight loss or diabetes management, but acceptable as an occasional treat. Better options available for snacking.",
    alerts:[{type:'warn',text:'Contains 21.5g sugar per bar — high added sugar content'},{type:'warn',text:'Contains milk and soy — allergen risk'}],
    alts:[{n:'Dark Chocolate (70%)',s:72,icon:'DC',img:'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'},{n:'Granola Bar (Oat)',s:74,icon:'GB',img:'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--amber-light)',col:'var(--amber)'},{n:'Protein Bar',s:80,icon:'PB',img:'https://images.unsplash.com/photo-1590901896967-aa6ff2b24244?auto=format&fit=crop&q=80&w=120&h=120',bg:'var(--emerald-light)',col:'var(--emerald)'}]
  }
};

/* ─── API ───────────────────────────────────── */
const NutriApi = {
  BASE_URL: 'http://localhost:5000',

  headers: () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  },

  async register(userData) {
    const res = await fetch(`${this.BASE_URL}/api/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(userData) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async login(email, password) {
    const res = await fetch(`${this.BASE_URL}/api/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async scanProduct(barcode) {
    const res = await fetch(`${this.BASE_URL}/api/scan/barcode/${barcode}`, { method:'POST', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Product analysis failed');
    return data;
  },

  async getHistory() {
    const res = await fetch(`${this.BASE_URL}/api/scan/history`, { method:'GET', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch history');
    return data;
  },

  async getProfile() {
    const res = await fetch(`${this.BASE_URL}/api/profile`, { method:'GET', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  },

  async getHistoryItem(id) {
    const res = await fetch(`${this.BASE_URL}/api/scan/history/${id}`, { method:'GET', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch scan details');
    return data;
  },

  async exportAdminScans() {
    const res = await fetch(`${this.BASE_URL}/api/admin/export-scans`, { method:'GET', headers:this.headers() });
    if (!res.ok) throw new Error('Failed to export admin scans');
    return await res.blob();
  },

  async getAdminStats() {
    const res = await fetch(`${this.BASE_URL}/api/admin/stats`, { method:'GET', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch admin stats');
    return data;
  },

  async getAdminUsers(limit = 5) {
    const res = await fetch(`${this.BASE_URL}/api/admin/users?limit=${limit}`, { method:'GET', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch admin users');
    return data;
  },

  async getAdminFlagged() {
    const res = await fetch(`${this.BASE_URL}/api/admin/flagged`, { method:'GET', headers:this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch flagged products');
    return data;
  },

  async updateProfile(profileData) {
    const res = await fetch(`${this.BASE_URL}/api/profile`, { method:'PUT', headers:this.headers(), body:JSON.stringify(profileData) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  }
};

/* ═══════════════════════════════════════════════
   MOTION / ANIMATION ENGINE
   ═══════════════════════════════════════════════ */

/* ─── Scroll-reveal (IntersectionObserver) ──── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  document.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
    el.classList.remove('visible');
    revealObserver.observe(el);
  });
}

/* ─── Count-up animation ────────────────────── */
function animateCount(el, target, duration = 1100) {
  const start = performance.now();
  const isFloat = !Number.isInteger(target);
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = target >= 1000
      ? Math.round(val).toLocaleString()
      : isFloat ? val.toFixed(1)
      : Math.round(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ─── Score pop + count-up ──────────────────── */
function animateScore(target, el) {
  const scoreEl = el || document.getElementById('rcScore');
  scoreEl.classList.remove('score-pop');
  void scoreEl.offsetWidth;
  scoreEl.classList.add('score-pop');
  animateCount(scoreEl, target, 800);
}

/* ─── Animate [data-h] bar charts ───────────── */
function animateBars(chartId) {
  const chart = chartId ? document.getElementById(chartId) : null;
  const bars = chart
    ? chart.querySelectorAll('.bar')
    : document.querySelectorAll('.bar');

  bars.forEach((bar, i) => {
    const targetH = bar.dataset.h || bar.style.height;
    bar.style.height = '0';
    setTimeout(() => { bar.style.height = targetH; }, i * 55);
  });
}

/* ─── Nutrition table cell stagger ─────────── */
function animateNtCells() {
  const cells = document.querySelectorAll('#nutritionTable .nt-cell');
  cells.forEach((cell, i) => {
    cell.classList.remove('nt-cell-anim');
    void cell.offsetWidth;
    cell.style.animationDelay = `${i * 45}ms`;
    cell.classList.add('nt-cell-anim');
  });
}

/* ─── Stat card count-ups ───────────────────── */
function animateStatCards(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const raw = parseInt(el.dataset.count || el.textContent.replace(/,/g, ''));
    if (!isNaN(raw)) animateCount(el, raw, 1000 + Math.random() * 300);
  });
}

/* ─── Re-run reveals for freshly shown page ── */
function triggerPageReveal(name) {
  const page = document.getElementById('page-' + name);
  if (!page) return;
  page.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
    el.classList.remove('visible');
    setTimeout(() => revealObserver.observe(el), 20);
  });
}

/* ═══════════════════════════════════════════════
   DATA HELPERS
   ═══════════════════════════════════════════════ */

/* ─── Relative date label ────────────────────── */
function formatRelativeDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString(undefined, { month:'short', day:'numeric' });
}

/* ─── Sidebar recent scans from history data ── */
function updateSidebarFromHistory(items) {
  const container = document.getElementById('sidebarRecent');
  if (!container) return;
  const title = '<div class="sidebar-recent-title">Recent Scans</div>';
  const recent = (items || []).slice(0, 3);
  if (!recent.length) {
    container.innerHTML = title + '<div class="sidebar-empty">No scans yet — search a product to start</div>';
    return;
  }
  const rows = recent.map(item => {
    const fg = item.colorFlag === 'green' ? 'var(--emerald)' : item.colorFlag === 'yellow' ? 'var(--amber)' : 'var(--rose)';
    const bg = item.colorFlag === 'green' ? 'var(--emerald-light)' : item.colorFlag === 'yellow' ? 'var(--amber-light)' : 'var(--rose-light)';
    const abbr = (item.productName || 'XX').substring(0, 2).toUpperCase();
    const short = (item.productName || '').length > 18 ? item.productName.substring(0, 18) + '…' : (item.productName || 'Unknown');
    const date = formatRelativeDate(item.createdAt);
    return `
      <div class="hist-row" onclick="viewHistoryItem('${item._id}')" style="padding:8px 10px;cursor:pointer;">
        <span class="hist-emoji" style="background:${bg};color:${fg};">${abbr}</span>
        <div class="hist-info">
          <div class="hist-name" style="font-size:.78rem;">${short}</div>
          <div class="hist-date">${date}</div>
        </div>
        <span class="hist-score score-${item.colorFlag}">${item.score}</span>
      </div>`;
  }).join('');
  container.innerHTML = title + `<div style="display:flex;flex-direction:column;gap:6px;">${rows}</div>`;
}

/* ─── Sidebar stat cards from history data ───── */
function updateSidebarStats(items) {
  const total = items ? items.length : 0;
  const avg = total > 0 ? Math.round(items.reduce((s, i) => s + (i.score || 0), 0) / total) : 0;
  const redCount = total > 0 ? items.filter(i => i.colorFlag === 'red').length : 0;
  const statTotalEl = document.getElementById('statTotalScans');
  const statAvgEl   = document.getElementById('statAvgScore');
  const statAlertEl = document.getElementById('statAlerts');
  if (statTotalEl) { statTotalEl.dataset.count = total; animateCount(statTotalEl, total, 800); }
  if (statAvgEl)   { statAvgEl.dataset.count   = avg;   avg > 0 ? animateCount(statAvgEl, avg, 900) : (statAvgEl.textContent = '—'); }
  if (statAlertEl) { statAlertEl.dataset.count  = redCount; animateCount(statAlertEl, redCount, 700); }
}

/* ─── History analytics charts from real data ─ */
function updateHistoryAnalytics(items) {
  if (!items) return;
  const total = items.length;
  const green  = items.filter(i => i.colorFlag === 'green').length;
  const yellow = items.filter(i => i.colorFlag === 'yellow').length;
  const red    = items.filter(i => i.colorFlag === 'red').length;

  /* Donut legend values */
  const gEl = document.getElementById('donutGreen');
  const yEl = document.getElementById('donutYellow');
  const rEl = document.getElementById('donutRed');
  if (gEl) gEl.textContent = green;
  if (yEl) yEl.textContent = yellow;
  if (rEl) rEl.textContent = red;

  /* Donut SVG segments (circumference = 2π×60 ≈ 376.99) */
  const C = 376.99;
  const totalNum = document.querySelector('.donut-total-num');
  if (totalNum) totalNum.textContent = total;
  if (total > 0) {
    const gLen = (green  / total) * C;
    const yLen = (yellow / total) * C;
    const rLen = (red    / total) * C;
    const circG = document.querySelector('.donut-seg-green');
    const circY = document.querySelector('.donut-seg-yellow');
    const circR = document.querySelector('.donut-seg-red');
    if (circG) circG.setAttribute('stroke-dasharray', `${gLen.toFixed(1)} ${(C - gLen).toFixed(1)}`);
    if (circY) {
      circY.setAttribute('stroke-dasharray', `${yLen.toFixed(1)} ${(C - yLen).toFixed(1)}`);
      circY.setAttribute('stroke-dashoffset', `-${gLen.toFixed(1)}`);
    }
    if (circR) {
      circR.setAttribute('stroke-dasharray', `${rLen.toFixed(1)} ${(C - rLen).toFixed(1)}`);
      circR.setAttribute('stroke-dashoffset', `-${(gLen + yLen).toFixed(1)}`);
    }
  } else {
    /* No data — reset to empty donut */
    const circG = document.querySelector('.donut-seg-green');
    const circY = document.querySelector('.donut-seg-yellow');
    const circR = document.querySelector('.donut-seg-red');
    [circG, circY, circR].forEach(c => { if (c) c.setAttribute('stroke-dasharray', `0 ${C}`); });
  }

  /* Weekly bar chart — last 6 weeks */
  if (!total) return;
  const now = new Date();
  const weeklyAvgs = Array.from({ length: 6 }, (_, i) => {
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() - (5 - i) * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() - 7);
    const wItems = items.filter(item => {
      const d = new Date(item.createdAt);
      return d >= weekStart && d < weekEnd;
    });
    return wItems.length
      ? Math.round(wItems.reduce((s, it) => s + (it.score || 0), 0) / wItems.length)
      : null;
  });

  const bars = document.querySelectorAll('#histBarChart .bar');
  const vals = document.querySelectorAll('#histBarChart .bar-val');
  weeklyAvgs.forEach((avg, i) => {
    if (!bars[i] || !vals[i]) return;
    if (avg === null) {
      bars[i].dataset.h = '4%';
      bars[i].style.background = 'var(--border)';
      vals[i].textContent = '—';
    } else {
      const h = Math.max(Math.round(avg), 8) + '%';
      bars[i].dataset.h = h;
      bars[i].style.background = avg >= 70 ? 'var(--emerald)' : avg >= 40 ? 'var(--amber)' : 'var(--rose)';
      vals[i].textContent = avg;
    }
  });
  
  /* Update Dashboard Weekly Chart (Latest 7 days) */
  const dashBars = document.querySelectorAll('#dashBarChart .bar');
  const dashVals = document.querySelectorAll('#dashBarChart .bar-val');
  const dashLabels = document.querySelectorAll('#dashBarChart .bar-label');
  
  if (dashBars.length) {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0,0,0,0);
      
      const dayItems = items.filter(it => {
        const itDate = new Date(it.createdAt);
        itDate.setHours(0,0,0,0);
        return itDate.getTime() === d.getTime();
      });
      
      const avg = dayItems.length
        ? Math.round(dayItems.reduce((s, it) => s + (it.score || 0), 0) / dayItems.length)
        : null;
        
      return {
        avg,
        label: d.toLocaleDateString(undefined, { weekday: 'short' })
      };
    });

    last7Days.forEach((day, i) => {
      if (!dashBars[i]) return;
      if (dashLabels[i]) dashLabels[i].textContent = day.label;
      
      if (day.avg === null) {
        dashBars[i].dataset.h = '4%';
        dashBars[i].style.background = 'var(--border)';
        if (dashVals[i]) dashVals[i].textContent = '—';
      } else {
        const h = Math.max(Math.round(day.avg), 8) + '%';
        dashBars[i].dataset.h = h;
        dashBars[i].style.background = day.avg >= 70 ? 'var(--emerald)' : day.avg >= 40 ? 'var(--amber)' : 'var(--rose)';
        if (dashVals[i]) dashVals[i].textContent = day.avg;
      }
    });
  }
}

/* ─── Clear sidebar mock data (not logged in) ── */
function clearSidebarMockData() {
  const sideName   = document.querySelector('.user-name');
  const sideAvatar = document.querySelector('.user-avatar');
  const sideMeta   = document.querySelector('.user-meta');
  const sideBadges = document.querySelector('.user-badges');
  if (sideName)   sideName.textContent   = 'Guest User';
  if (sideAvatar) sideAvatar.textContent = 'G';
  if (sideMeta)   sideMeta.textContent   = 'Not signed in';
  if (sideBadges) sideBadges.innerHTML   = '<span class="demo-mode-badge">Demo Mode</span>';
  const statNums = [
    document.getElementById('statTotalScans'),
    document.getElementById('statAvgScore'),
    document.getElementById('statAlerts')
  ];
  statNums.forEach(el => { if (el) { el.textContent = '—'; el.dataset.count = '0'; } });
  const recentContainer = document.getElementById('sidebarRecent');
  if (recentContainer) {
    recentContainer.innerHTML = '<div class="sidebar-recent-title">Recent Scans</div><div class="sidebar-empty">Sign in to see your scan history</div>';
  }
}

/* ─── Admin page live data ─────────────────────── */
async function refreshAdminPage() {
  try {
    const [statsRes, usersRes] = await Promise.allSettled([
      NutriApi.getAdminStats(),
      NutriApi.getAdminUsers(5)
    ]);

    /* Update stats if API returned them */
    if (statsRes.status === 'fulfilled' && statsRes.value?.data) {
      const s = statsRes.value.data;
      const asNums = document.querySelectorAll('.as-num');
      const asChanges = document.querySelectorAll('.as-change');
      const mapping = [
        { val: s.totalUsers,    change: s.userGrowth    || '+—' },
        { val: s.totalScans,    change: s.scanGrowth    || '+—' },
        { val: s.totalProducts, change: `+${s.newToday || 0} new today` },
        { val: s.flaggedItems,  change: s.flaggedItems > 0 ? 'Needs review' : 'All clear' }
      ];
      mapping.forEach((m, i) => {
        if (asNums[i] && m.val !== undefined) {
          asNums[i].dataset.count = m.val;
          asNums[i].textContent   = m.val.toLocaleString();
        }
        if (asChanges[i] && m.change) asChanges[i].textContent = m.change;
      });
      const lastUpdated = document.getElementById('adminLastUpdated');
      if (lastUpdated) lastUpdated.textContent = 'Last updated: ' + new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    } else {
      /* API unavailable — show demo badge */
      document.getElementById('adminDemoNote')?.classList.add('show');
      const lastUpdated = document.getElementById('adminLastUpdated');
      if (lastUpdated) lastUpdated.textContent = 'Showing demo data';
    }

    /* Update user list if API returned data */
    const usersList = document.getElementById('adminUsersList');
    if (usersRes.status === 'fulfilled' && usersRes.value?.data?.length) {
      const users = usersRes.value.data;
      if (usersList) {
        usersList.innerHTML = users.map(u => `
          <div class="atc-row">
            <span class="atc-name"><span class="status-dot status-active"></span>${u.name || 'Unknown'}</span>
            <span class="atc-meta">${formatRelativeDate(u.createdAt)} · ${u.scanCount || 0} scans</span>
            <button class="action-btn">Manage</button>
          </div>`).join('');
      }
    } else {
      if (usersList) usersList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink3);font-size:.85rem;">No users found</div>';
    }

    /* Flagged list — show empty state if API has no flagged data */
    const flaggedList = document.getElementById('adminFlaggedList');
    if (flaggedList) flaggedList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink3);font-size:.85rem;">No flagged items</div>';

  } catch (err) {
    console.warn('Admin API unavailable');
    document.getElementById('adminDemoNote')?.classList.add('show');
    const lastUpdated = document.getElementById('adminLastUpdated');
    if (lastUpdated) lastUpdated.textContent = 'API unavailable';
    const usersList = document.getElementById('adminUsersList');
    if (usersList) usersList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink3);font-size:.85rem;">Could not load users</div>';
    const flaggedList = document.getElementById('adminFlaggedList');
    if (flaggedList) flaggedList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink3);font-size:.85rem;">Could not load flagged items</div>';
  }
}

/* ═══════════════════════════════════════════════
   PAGE NAVIGATION
   ═══════════════════════════════════════════════ */
function showPage(name) {
  /* Check admin access control */
  if (name === 'admin' && currentUserRole !== 'admin') {
    showToast('Admin access denied. Only administrators can access this page.');
    showPage('dashboard');
    return;
  }

  /* Guest users cannot access history and profile pages */
  if ((name === 'history' || name === 'profile') && !localStorage.getItem('token')) {
    showToast('Please sign in to access this section.');
    showPage('dashboard');
    return;
  }

  /* Logged-in users should not see the landing page */
  if (name === 'landing' && localStorage.getItem('token')) {
    showPage('dashboard');
    return;
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  const btn = document.getElementById('nav-' + name);
  if (btn) btn.classList.add('active');
  window.scrollTo(0, 0);

  /* Page-specific animation triggers */
  setTimeout(() => {
    triggerPageReveal(name);

    if (name === 'dashboard') {
      animateBars('dashBarChart');
      animateStatCards('.stat-num');
      /* In demo mode ensure sidebar shows correct state */
      if (!localStorage.getItem('token')) clearSidebarMockData();
    }
    if (name === 'history') {
      animateBars('histBarChart');
    }
    if (name === 'admin') {
      refreshAdminPage().then(() => {
        animateBars('adminBarChart');
        animateStatCards('.as-num');
      });
    }
  }, 60);
}

/* ═══════════════════════════════════════════════
   DEMO PRODUCT LOADING
   ═══════════════════════════════════════════════ */
let _loadDemoSeq = 0; // race-condition guard
let currentUserRole = null; // track user role for admin access control

async function loadDemo(key) {
  const seq = ++_loadDemoSeq;          // each call gets a unique ticket
  document.body.style.cursor = 'wait';

  /* Step 1 — show local product immediately (instant feedback) */
  const p = products[key];
  if (p) {
    loadLocalProduct(p);
    showPage('dashboard');
    showToast('Analyzing nutrition data...');
  }

  /* Step 2 — if logged in, send the REAL barcode to backend to save scan */
  const token = localStorage.getItem('token');
  const realBarcode = productBarcodes[key];

  if (token && realBarcode) {
    try {
      const res = await NutriApi.scanProduct(realBarcode);
      if (seq !== _loadDemoSeq) return;  // newer call started — discard
      /* If API returns richer data, update the dashboard */
      if (res?.data?.product?.name) {
        updateDashboardUI(res.data);
      }
    } catch (err) {
      /* API failed — local product is already showing, just refresh history */
      console.warn('API scan failed, using local demo data:', err.message);
    }
    /* Refresh sidebar & history regardless of API success/fail */
    setTimeout(() => refreshHistory(), 300);
  } else if (!token) {
    /* Guest user — just show local product, no history needed */
    console.log('Guest user — demo product loaded without saving');
  }

  document.body.style.cursor = 'default';
}

function showResultCard() {
  const empty = document.getElementById('emptyState');
  const card  = document.getElementById('resultCard');
  if (empty) empty.style.display = 'none';
  if (card)  card.style.display  = 'block';
}

function showEmptyState() {
  const empty = document.getElementById('emptyState');
  const card  = document.getElementById('resultCard');
  if (empty) empty.style.display = 'flex';
  if (card)  card.style.display  = 'none';
}

function loadLocalProduct(p) {
  showResultCard();
  document.getElementById('rcName').textContent = p.name;
  document.getElementById('rcBrand').textContent = p.brand;
  document.getElementById('rcTags').innerHTML = p.tags;

  const iconEl = document.getElementById('rcIcon');
  const imgSrc = p.img || p.imageUrl;
  if (imgSrc) {
    iconEl.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" />`;
    iconEl.style.background = 'none';
    iconEl.style.padding = '0';
  } else {
    iconEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
    iconEl.style.background = 'var(--emerald-light)';
    iconEl.style.padding = '12px';
  }

  const scoreEl = document.getElementById('rcScore');
  scoreEl.className = `big-score ${p.scoreClass}`;

  const badgeEl = document.getElementById('rcBadge');
  badgeEl.textContent = p.badge;
  badgeEl.className = `big-badge ${p.badgeClass}`;

  document.getElementById('nutritionTable').innerHTML = p.nutrition
    .map(n => `<div class="nt-cell"><div class="nt-val">${n.v}</div><div class="nt-label">${n.l}</div></div>`)
    .join('');

  document.getElementById('aiText').textContent = p.ai;

  document.getElementById('allergenAlerts').innerHTML = p.alerts
    .map(a => `<div class="alert-row ${a.type === 'warn' ? 'warn' : ''}"><div class="alert-dot ${a.type === 'warn' ? 'warn' : 'red'}"></div><span class="alert-text">${a.text}</span></div>`)
    .join('');

  document.getElementById('altGrid').innerHTML = p.alts
    .map(a => `
      <div class="alt-card" onclick="loadDemo('${a.key || a.n.toLowerCase().split(' ')[0]}')">
        ${a.img
          ? `<div class="alt-icon alt-img"><img src="${a.img}" alt="${a.n}"/></div>`
          : `<div class="alt-icon" style="background:${a.bg};color:${a.col}">${a.icon}</div>`
        }
        <div class="alt-info">
          <div class="alt-name">${a.n}</div>
          <div class="alt-score">Score: ${a.s}</div>
        </div>
      </div>`)
    .join('');

  /* Animate: score pop, nt cell stagger, bar refresh */
  setTimeout(() => {
    animateScore(p.score, scoreEl);
    animateNtCells();
    animateBars('dashBarChart');
  }, 80);
}

/* ─── SEARCH ───────────────────────────────── */
function triggerSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();

  if (!q) {
    showToast('Please enter a product name');
    return;
  }

  console.log('Search query:', q);

  /* 1. Check direct barcode map first (prioritize beautiful demo data for test codes) */
  if (barcodeMap[q]) {
    console.log('Found in barcode map:', q);
    loadDemo(barcodeMap[q]);
    return;
  }

  /* 2. Keyword mapping - check longer matches first */
  const map = {
    'roasted almonds': 'almonds',
    'greek yogurt': 'yogurt',
    'chocolate granola': 'granola',
    'nutella': 'nutella',
    'oats': 'oats',
    'oat': 'oats',
    'yogurt': 'yogurt',
    'yoghurt': 'yogurt',
    'chips': 'chips',
    'chip': 'chips',
    'cola': 'cola',
    'granola': 'granola',
    'almonds': 'almonds',
    'almond': 'almonds',
    'kitkat': 'kitkat',
    'kit kat': 'kitkat'
  };

  /* Check exact match first */
  if (map[q]) {
    console.log('Found exact match:', q, '→', map[q]);
    loadDemo(map[q]);
    return;
  }

  /* Check partial match (longest first to avoid false matches) */
  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const k of sortedKeys) {
    if (q.includes(k)) {
      console.log('Found partial match:', k, '→', map[k]);
      loadDemo(map[k]);
      return;
    }
  }

  /* Not found in demo - try API */
  console.log('Not in demo products, trying API');
  showToast('Searching database...');
  // Give API time to respond
  setTimeout(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast('Product not found. Please log in or try another product.');
    } else {
      showToast('Product not found. Try another search.');
    }
  }, 1400);
}
document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') triggerSearch(); });

/* ─── TAB SWITCHER ─────────────────────────── */
function setTab(el, mode) {
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const input = document.getElementById('searchInput');
  if (mode === 'barcode') { input.placeholder = 'Scanning via camera...'; openScanner(); }
  else if (mode === 'manual') { input.placeholder = 'Manual entry...'; openModal(); }
  else { input.placeholder = 'Product name or barcode...'; }
}

/* ─── BARCODE SCANNER ───────────────────────── */
let scannerCodeReader = null, scannerStream = null, scanActive = false;
const barcodeMap = { '3017620422003':'nutella','8901234567890':'oats','8900012345678':'yogurt','5012345678901':'chips','4901234567890':'cola','7891234567890':'granola','3456789012345':'almonds','7613032707717':'kitkat' };

/* Reverse map: product key → real barcode number */
const productBarcodes = {
  'oats':    '8901234567890',
  'yogurt':  '8900012345678',
  'chips':   '5012345678901',
  'cola':    '4901234567890',
  'granola': '7891234567890',
  'almonds': '3456789012345',
  'nutella': '3017620422003',
  'kitkat':  '7613032707717'
};

function toggleBarcodeRefs() {
  const el = document.getElementById('barcodeRefs');
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}
function openScanner() {
  document.getElementById('scannerOverlay').classList.add('open');
  document.getElementById('scannerError').classList.remove('show');
  document.getElementById('scannerImage').style.display = 'none';
  document.getElementById('scannerVideo').style.display = 'block';
  
  /* Reset manual mode if active */
  document.getElementById('scannerMainSection').style.display = 'flex';
  document.getElementById('scannerManualSection').style.display = 'none';
  document.getElementById('manualBtn').textContent = 'Manual Entry';
  
  setStatus('Scanning — point at a barcode', true);
  startScanner();
}
async function handleBarcodeUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  
  const scannerImg = document.getElementById('scannerImage');
  const scannerVid = document.getElementById('scannerVideo');
  
  /* Show the image in the frame */
  const imgUrl = URL.createObjectURL(file);
  scannerImg.src = imgUrl;
  scannerImg.style.display = 'block';
  scannerVid.style.display = 'none';
  
  setStatus('Analyzing image...', true);
  
  const img = new Image();
  img.src = imgUrl;
  img.onload = async () => {
    try {
      const reader = new ZXing.BrowserMultiFormatReader();
      const result = await reader.decodeFromImageElement(img);
      
      /* Simulate the "Google Lens" scan delay */
      setTimeout(() => {
        onBarcodeDetected(result.getText());
        URL.revokeObjectURL(imgUrl);
      }, 1500);
      
    } catch (err) {
      setTimeout(() => {
        showToast('No barcode found in image. Try a clearer photo.');
        scannerImg.style.display = 'none';
        scannerVid.style.display = 'block';
        setStatus('Scanning — point at a barcode', true);
        URL.revokeObjectURL(imgUrl);
      }, 1000);
    }
  };
}
function closeScanner() {
  scanActive = false;
  document.getElementById('scannerOverlay').classList.remove('open');
  stopCamera();
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
  const first = document.querySelector('.stab');
  if (first) first.classList.add('active');
  document.getElementById('searchInput').placeholder = 'Product name or barcode...';
}
function stopCamera() {
  if (scannerCodeReader) { try { scannerCodeReader.reset(); } catch(e){} scannerCodeReader = null; }
  if (scannerStream) { scannerStream.getTracks().forEach(t => t.stop()); scannerStream = null; }
  document.getElementById('scannerVideo').srcObject = null;
}
function setStatus(text, isDetecting = false, isFound = false) {
  const el = document.getElementById('scannerStatus');
  document.getElementById('scannerStatusText').textContent = text;
  el.className = 'scanner-status';
  if (isFound) el.classList.add('found');
  else if (isDetecting) el.classList.add('detecting');
}
async function startScanner() {
  scanActive = true;
  const video = document.getElementById('scannerVideo');
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal:'environment' }, width: { ideal:1280 }, height: { ideal:720 } } });
    video.srcObject = scannerStream;
    video.play();
    setStatus('Scanning — point at a barcode', true);
  } catch(e) { document.getElementById('scannerError').classList.add('show'); return; }

  // Wait for video to be ready
  await new Promise(resolve => { video.onloadedmetadata = resolve; });

  if (window.ZXing) { useZXing(video); return; }
  if ('BarcodeDetector' in window) { useBarcodeDetector(video); return; }
  setStatus('Camera ready — enter barcode manually', false);
  showManualBarcodePrompt();
}
function useZXing(video) {
  try {
    const hints = new Map();
    const formats = [ZXing.BarcodeFormat.EAN_13,ZXing.BarcodeFormat.EAN_8,ZXing.BarcodeFormat.UPC_A,ZXing.BarcodeFormat.UPC_E,ZXing.BarcodeFormat.CODE_128,ZXing.BarcodeFormat.CODE_39,ZXing.BarcodeFormat.QR_CODE,ZXing.BarcodeFormat.DATA_MATRIX,ZXing.BarcodeFormat.CODABAR];
    hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
    hints.set(ZXing.DecodeHintType.ALSO_INVERTED, true);
    scannerCodeReader = new ZXing.BrowserMultiFormatReader(hints, 200);
    setStatus('ZXing scanner active — hold barcode steady', true);

    // Add test inject button for easier testing
    const testBtn = document.createElement('button');
    testBtn.id = 'testBarcodeBtn';
    testBtn.className = 'btn btn-outline btn-sm';
    testBtn.textContent = 'Test Barcode';
    testBtn.style.position = 'absolute';
    testBtn.style.bottom = '20px';
    testBtn.style.right = '20px';
    testBtn.style.zIndex = '999';
    testBtn.onclick = () => {
      const code = prompt('Enter barcode number to test:\n\n8901234567890 - Oats\n8900012345678 - Yogurt\n5012345678901 - Chips\n4901234567890 - Cola\n7891234567890 - Granola\n3456789012345 - Almonds\n3017620422003 - Nutella');
      if (code) onBarcodeDetected(code.trim());
    };
    const overlay = document.getElementById('scannerOverlay');
    if (overlay) overlay.appendChild(testBtn);

    scannerCodeReader.decodeFromVideoElement(video, (result) => {
      if (scanActive && result) {
        const code = result.getText();
        console.log('Barcode detected:', code);
        onBarcodeDetected(code);
      }
    });
  } catch(e) {
    console.warn('ZXing failed:', e);
    if ('BarcodeDetector' in window) useBarcodeDetector(video);
    else showManualBarcodePrompt();
  }
}
async function useBarcodeDetector(video) {
  try {
    const detector = new BarcodeDetector({ formats:['ean_13','ean_8','upc_a','upc_e','code_128','code_39','qr_code'] });
    setStatus('BarcodeDetector active — hold barcode steady', true);

    // Add test inject button for easier testing
    const testBtn = document.createElement('button');
    testBtn.id = 'testBarcodeBtn';
    testBtn.className = 'btn btn-outline btn-sm';
    testBtn.textContent = 'Test Barcode';
    testBtn.style.position = 'absolute';
    testBtn.style.bottom = '20px';
    testBtn.style.right = '20px';
    testBtn.style.zIndex = '999';
    testBtn.onclick = () => {
      const code = prompt('Enter barcode number to test:\n\n8901234567890 - Oats\n8900012345678 - Yogurt\n5012345678901 - Chips\n4901234567890 - Cola\n7891234567890 - Granola\n3456789012345 - Almonds\n3017620422003 - Nutella');
      if (code) onBarcodeDetected(code.trim());
    };
    const overlay = document.getElementById('scannerOverlay');
    if (overlay) overlay.appendChild(testBtn);

    async function tick() {
      if (!scanActive) return;
      try {
        const bc = await detector.detect(video);
        if (bc && bc.length > 0) {
          console.log('Barcode detected:', bc[0].rawValue);
          onBarcodeDetected(bc[0].rawValue);
          return;
        }
      } catch(e) {
        console.warn('Detection error:', e);
      }
      requestAnimationFrame(tick);
    }
    // Start detection loop immediately when video plays
    if (video.paused) {
      video.play();
    }
    tick();
  } catch(e) {
    console.warn('BarcodeDetector failed:', e);
    showManualBarcodePrompt();
  }
}
async function onBarcodeDetected(code) {
  if (!scanActive) return;
  scanActive = false;
  const flash = document.getElementById('foundFlash');
  flash.classList.add('flash');
  setTimeout(() => flash.classList.remove('flash'), 300);
  /* Prioritize local demo data for test barcodes */
  const key = barcodeMap[code];
  if (key) { closeScanner(); showPage('dashboard'); loadDemo(key); return; }

  try {
    const res = await NutriApi.scanProduct(code);
    // Validate the response has real data (score > 0 and product name)
    if (!res.data || !res.data.product || !res.data.product.name || (res.data.score !== undefined && res.data.score <= 0)) {
      throw new Error('Invalid product data returned');
    }
    closeScanner(); showPage('dashboard');
    updateDashboardUI(res.data);
    refreshHistory();
    showToast(`${res.data.product.name} analyzed successfully`);
  } catch(err) {
    closeScanner();
    showToast('Product not found. Try searching by name or use manual entry.');
    showPage('dashboard');
    showEmptyState();
    document.getElementById('searchInput').value = code;
    scanActive = false;
  }
}
const _scannerHintDefault = '<div class="scanner-hint">Point your camera at any barcode on a food package. Keep it steady — scanning happens automatically.</div>';

function toggleManualMode() {
  const main = document.getElementById('scannerMainSection');
  const manual = document.getElementById('scannerManualSection');
  const btn = document.getElementById('manualBtn');
  const isHidden = manual.style.display === 'none';
  
  manual.style.display = isHidden ? 'block' : 'none';
  main.style.display = isHidden ? 'none' : 'flex';
  btn.textContent = isHidden ? 'Back to Camera' : 'Manual Entry';
  
  if (isHidden) {
    const inp = document.getElementById('manualBarcodeInput');
    if (inp) {
      inp.focus();
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') submitManualBarcode(); }, { once: true });
    }
  }
}
function submitManualBarcode() {
  const inp = document.getElementById('manualBarcodeInput');
  if (inp && inp.value.trim()) onBarcodeDetected(inp.value.trim());
}

/* ─── UPDATE DASHBOARD (live API) ─────────── */
function updateDashboardUI(data) {
  showResultCard();
  const product = data.product;
  const card = document.getElementById('resultCard');

  // Trigger card entrance animation
  card.classList.remove('result-card-enter');
  void card.offsetWidth;
  card.classList.add('result-card-enter');

  document.getElementById('rcName').textContent = product.name || `Unnamed Product (${product.barcode || 'Unknown'})`;
  document.getElementById('rcBrand').textContent = `${product.brand || 'No Brand Info'} · Barcode: ${product.barcode || '--'}`;

  const iconEl = document.getElementById('rcIcon');
  const imgSrc = product.img || product.imageUrl;
  if (imgSrc) {
    iconEl.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" />`;
    iconEl.style.background = 'none';
    iconEl.style.padding = '0';
  } else {
    iconEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
    iconEl.style.background = 'var(--emerald-light)';
    iconEl.style.padding = '12px';
  }

  const scoreEl = document.getElementById('rcScore');
  scoreEl.className = `big-score score-${data.colorFlag || 'yellow'}`;

  const badgeEl = document.getElementById('rcBadge');
  badgeEl.textContent = data.colorFlag === 'green' ? 'Excellent' : data.colorFlag === 'yellow' ? 'Moderate' : 'Avoid';
  badgeEl.className = `big-badge badge-${data.colorFlag || 'yellow'}`;

  const nt = product.nutrition;
  document.getElementById('nutritionTable').innerHTML = `
    <div class="nt-cell"><div class="nt-val">${nt.calories ?? '--'}</div><div class="nt-label">Calories (kcal)</div></div>
    <div class="nt-cell"><div class="nt-val">${nt.protein ?? '--'}g</div><div class="nt-label">Protein</div></div>
    <div class="nt-cell"><div class="nt-val">${nt.sugar ?? '--'}g</div><div class="nt-label">Sugar</div></div>
    <div class="nt-cell"><div class="nt-val">${nt.fat ?? '--'}g</div><div class="nt-label">Fat</div></div>
    <div class="nt-cell"><div class="nt-val">${nt.fibre ?? '--'}g</div><div class="nt-label">Fibre</div></div>
    <div class="nt-cell"><div class="nt-val">${nt.carbohydrates ?? '--'}g</div><div class="nt-label">Carbs</div></div>
    <div class="nt-cell"><div class="nt-val">${nt.sodium ?? '--'}mg</div><div class="nt-label">Sodium</div></div>
    <div class="nt-cell"><div class="nt-val">${product.additives?.length || 0}</div><div class="nt-label">Additives</div></div>`;

  const aiText = document.getElementById('aiText');
  aiText.textContent = data.explanation || 'AI analysis not available.';
  aiText.style.animation = 'none';
  void aiText.offsetWidth;
  aiText.style.animation = 'fadeUp 0.6s ease both';

  const altGrid = document.getElementById('altGrid');
  altGrid.innerHTML = data.alternatives?.length
    ? data.alternatives.map(a => `
      <div class="alt-card" onclick="loadDemo('${a.barcode || a.name}')">
        ${a.imageUrl
          ? `<div class="alt-icon alt-img"><img src="${a.imageUrl}" alt="${a.name}"/></div>`
          : `<div class="alt-icon" style="background:var(--emerald-light);color:var(--emerald)">${(a.name||'?').charAt(0).toUpperCase()}</div>`
        }
        <div class="alt-info">
          <div class="alt-name">${a.name}</div>
          <div class="alt-score">${a.reason || ('Score: ' + (a.score || '—'))}</div>
        </div>
      </div>`).join('')
    : '<p style="font-size:0.8rem;color:var(--ink3);">No alternatives suggested.</p>';

  const alertsEl = document.getElementById('allergenAlerts');
  alertsEl.innerHTML = data.allergenAlerts?.length
    ? data.allergenAlerts.map(a => `<div class="alert-row ${a.severity === 'warn' ? 'warn' : ''}"><div class="alert-dot ${a.severity === 'warn' ? 'warn' : 'red'}"></div><span class="alert-text">${a.message}</span></div>`).join('')
    : '';

  setTimeout(() => {
    animateScore(data.score || 0, scoreEl);
    animateNtCells();
  }, 80);
}

/* ─── HISTORY ──────────────────────────────── */
async function refreshProfile() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await NutriApi.getProfile();
    const profile = res.data;
    const user = profile.userId || {};
    const name = user.name || 'User';

    /* Store user role for admin access control */
    currentUserRole = user.role || null;
    updateAdminNavVisibility();

    const goalMap = {
      'weight_loss':'Weight Loss','muscle_gain':'Muscle Gain',
      'maintenance':'Maintenance','eat_healthier':'Eat Healthier',
      'manage_condition':'Manage Condition',
      'diabetes_management':'Diabetes Management',
      'general_wellness':'General Wellness'
    };

    /* ─── Sidebar ─────────────────────────────── */
    const sideName   = document.querySelector('.user-name');
    const sideAvatar = document.querySelector('.user-avatar');
    const sideMeta   = document.querySelector('.user-meta');
    const sideBadges = document.querySelector('.user-badges');
    if (sideName)   sideName.textContent   = name;
    if (sideAvatar) sideAvatar.textContent = name.charAt(0).toUpperCase();
    if (sideMeta) {
      const goals = (profile.healthGoals || []).map(g => goalMap[g] || g).join(' · ');
      sideMeta.textContent = goals || 'No goals set';
    }
    if (sideBadges) {
      sideBadges.innerHTML = (profile.allergies || [])
        .map(a => `<span class="ubadge">No ${a}</span>`).join('');
    }

    /* ─── Profile Page header ─────────────────── */
    const profDisplayName = document.getElementById('profDisplayName');
    const profEmailLine   = document.getElementById('profEmailLine');
    const profAvatar      = document.getElementById('profAvatar');
    const profChips       = document.getElementById('profChips');
    if (profDisplayName) profDisplayName.textContent = user.name || '—';
    if (profEmailLine)   profEmailLine.textContent   = user.email
      ? `${user.email} · Member since ${new Date(user.createdAt || Date.now()).toLocaleDateString(undefined, { month:'short', year:'numeric' })}`
      : '—';
    if (profAvatar) profAvatar.textContent = name.charAt(0).toUpperCase();
    if (profChips) {
      const chips = [
        ...(profile.healthGoals || []).map(g => goalMap[g] || g),
        ...(profile.dietaryPreferences || [])
      ];
      profChips.innerHTML = chips.length
        ? chips.map(c => `<span class="prof-chip">${c}</span>`).join('')
        : '<span class="prof-chip" style="opacity:.5">No goals set</span>';
    }

    /* ─── Profile form fields ─────────────────── */
    const nameParts = (user.name || '').trim().split(' ');
    const setField  = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    setField('profFirstName', nameParts[0] || '');
    setField('profLastName',  nameParts.slice(1).join(' ') || '');
    setField('profAge',    profile.age    || user.age    || '');
    setField('profGender', profile.gender || user.gender || '');
    setField('profWeight', profile.weight || '');
    setField('profHeight', profile.height || '');

    /* ─── Health goal toggles ─────────────────── */
    const goalToggles = {
      'weight_loss':         0,
      'diabetes_management': 1,
      'muscle_gain':         2,
      'general_wellness':    3
    };
    const toggleRows = document.querySelectorAll('.toggle-group:first-of-type .toggle input');
    (profile.healthGoals || []).forEach(g => {
      const idx = goalToggles[g];
      if (idx !== undefined && toggleRows[idx]) toggleRows[idx].checked = true;
    });

    /* ─── Allergy chips ───────────────────────── */
    const allergyChips = document.querySelectorAll('.allergy-chip');
    allergyChips.forEach(chip => {
      const matched = (profile.allergies || []).some(a =>
        a.toLowerCase() === chip.textContent.trim().toLowerCase()
      );
      chip.classList.toggle('inactive', !matched);
    });

    /* If on landing, redirect to dashboard */
    if (document.getElementById('page-landing').classList.contains('active')) {
      showPage('dashboard');
    }
  } catch (err) {
    console.error('Failed to load profile:', err);
  }
}

async function refreshHistory() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token - user not logged in');
      throw new Error('Not authenticated');
    }

    console.log('Fetching history from API...');
    const data = await NutriApi.getHistory();
    console.log('History data received:', data);

    const items = data.data || [];
    console.log('Items count:', items.length);
    const container = document.querySelector('.history-table');

    if (container) {
      const header = container.querySelector('.ht-header');
      if (!items.length) {
        container.innerHTML = '';
        if (header) container.appendChild(header);
        container.innerHTML += '<div style="padding:20px;text-align:center;color:var(--ink3);font-size:.875rem;">No scans yet — search for a product to get started</div>';
      } else {
        const rows = items.map(item => {
          const fg = item.colorFlag === 'green' ? 'var(--emerald)' : item.colorFlag === 'yellow' ? 'var(--amber)' : 'var(--rose)';
          const bg = item.colorFlag === 'green' ? 'var(--emerald-light)' : item.colorFlag === 'yellow' ? 'var(--amber-light)' : 'var(--rose-light)';
          return `
          <div class="ht-row" onclick="viewHistoryItem('${item._id}')">
            <span class="ht-product">
              <span class="ht-cat-badge" style="background:${bg};color:${fg}">
                ${(item.productName || 'XX').substring(0, 2).toUpperCase()}
              </span>
              ${item.productName || 'Unknown Product'}
            </span>
            <span class="ht-score score-${item.colorFlag}">${item.score}</span>
            <span class="ht-cat">${item.brand || 'N/A'}</span>
            <span class="ht-date">${new Date(item.createdAt).toLocaleDateString(undefined, { month:'short', day:'numeric' })}</span>
            <span><button class="action-btn approve">View</button></span>
          </div>`;
        }).join('');
        container.innerHTML = '';
        if (header) container.appendChild(header);
        container.innerHTML += rows;
      }
    }

    /* Update sidebar recent scans, stats, and analytics charts */
    updateSidebarFromHistory(items);
    updateSidebarStats(items);
    updateHistoryAnalytics(items);

  } catch (err) {
    console.error('Failed to load history - Error details:', err.message, err);
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('User not logged in');
      clearSidebarMockData();
      /* Show sign-in prompt in history table */
      const container = document.querySelector('.history-table');
      if (container) {
        const header = container.querySelector('.ht-header');
        container.innerHTML = '';
        if (header) container.appendChild(header);
        container.innerHTML += '<div style="padding:24px;text-align:center;color:var(--ink3);font-size:.875rem;">Sign in to view your scan history</div>';
      }
      /* Reset donut and analytics to empty */
      updateHistoryAnalytics([]);
    } else {
      console.error('API Error while fetching history. Token exists but API failed:', err.message);
      showToast('Failed to load history. Please try again.');
    }
  }
}

async function viewHistoryItem(id) {
  try {
    showToast('Loading history details...');
    const res = await NutriApi.getHistoryItem(id);
    if (res.success) {
      updateDashboardUI(res.data);
      showPage('dashboard');
    }
  } catch (err) {
    showToast('Failed to load details');
    console.error(err);
  }
}

async function downloadAdminReport() {
  const isHistoryPage = document.getElementById('page-history').classList.contains('active');
  const token = localStorage.getItem('token');
  if (!token) return showToast('Please login to export reports');
  
  showToast('Generating report...');
  
  try {
    if (isHistoryPage) {
      const res = await NutriApi.getHistory();
      const data = res.data;
      if (!data || !data.length) return showToast('No data to export');
      
      const headers = ['Date', 'Product', 'Brand', 'Barcode', 'Score', 'Status'];
      const rows = data.map(item => [
        new Date(item.createdAt).toLocaleDateString(),
        `"${item.productName}"`,
        `"${item.brand || 'N/A'}"`,
        item.barcode,
        item.score,
        item.colorFlag.toUpperCase()
      ]);
      
      let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\r\n"
        + rows.map(e => e.join(",")).join("\r\n");
        
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `NutriScan_History_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const blob = await NutriApi.exportAdminScans();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `nutriscan_admin_export_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
    showToast('Report downloaded successfully');
  } catch (err) {
    showToast('Export failed');
    console.error(err);
  }
}

/* ─── AUTH ─────────────────────────────────── */
async function handleRegister() {
  const name = `${document.getElementById('regFirstName').value} ${document.getElementById('regLastName').value}`.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const age = document.getElementById('regAge').value;
  const gender = document.getElementById('regGender').value;
  const healthGoal = document.getElementById('regGoal').value;
  const allergyChecks = document.querySelectorAll('.reg-allergies input:checked');
  const allergies = Array.from(allergyChecks).map(c => c.value);
  if (!email || !password || !name) return showToast('Please fill all required fields');
  showToast('Creating account...');
  try {
    const data = await NutriApi.register({ name, email, password, age, gender, healthGoal, allergies });
    localStorage.setItem('token', data.token);
    showToast('Account created. Welcome to NutriScan.');
    setTimeout(() => { checkAuth(); refreshProfile(); showPage('dashboard'); }, 1000);
  } catch(err) { showToast(err.message); }
}
async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) return showToast('Please enter your credentials');
  showToast('Signing in...');
  try {
    const data = await NutriApi.login(email, password);
    localStorage.setItem('token', data.token);
    showToast('Signed in successfully');
    setTimeout(() => { checkAuth(); refreshProfile(); showPage('dashboard'); }, 800);
  } catch(err) { showToast(err.message); }
}
function checkAuth() {
  const btn = document.getElementById('nav-register');
  const logoutBtn = document.getElementById('logoutBtn');
  const isLoggedIn = !!localStorage.getItem('token');

  if (btn) btn.style.display = isLoggedIn ? 'none' : 'block';
  if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'block' : 'none';

  /* Reset admin visibility if user is not logged in */
  if (!isLoggedIn) {
    currentUserRole = null;
    updateAdminNavVisibility();
  }
}

/* ─── Update admin nav visibility based on user role ─── */
function updateAdminNavVisibility() {
  const adminBtn = document.getElementById('nav-admin');
  if (!adminBtn) return;

  const isAdmin = currentUserRole === 'admin';
  adminBtn.style.display = isAdmin ? 'block' : 'none';
}

/* ─── PROFILE SAVE ────────────────────────────── */
async function saveProfile() {
  const token = localStorage.getItem('token');
  if (!token) return showToast('Please sign in to save changes');
  const profileData = {
    age:    document.getElementById('profAge')?.value    || undefined,
    gender: document.getElementById('profGender')?.value || undefined,
    weight: document.getElementById('profWeight')?.value || undefined,
    height: document.getElementById('profHeight')?.value || undefined
  };
  // Remove undefined keys
  Object.keys(profileData).forEach(k => profileData[k] === undefined && delete profileData[k]);
  showToast('Saving profile...');
  try {
    await NutriApi.updateProfile(profileData);
    showToast('Profile updated successfully');
    refreshProfile();
  } catch (err) {
    showToast(err.message || 'Failed to save profile');
  }
}
function logout() {
  localStorage.removeItem('token');
  currentUserRole = null;
  updateAdminNavVisibility();
  checkAuth();

  /* Clear all user data from UI */
  clearSidebarMockData();

  /* Clear dashboard product card */
  showEmptyState();

  /* Clear history table */
  const historyContainer = document.querySelector('.history-table');
  if (historyContainer) {
    const header = historyContainer.querySelector('.ht-header');
    historyContainer.innerHTML = '';
    if (header) historyContainer.appendChild(header);
    historyContainer.innerHTML += '<div style="padding:24px;text-align:center;color:var(--ink3);font-size:.875rem;">Sign in to view your scan history</div>';
  }

  /* Reset analytics charts */
  updateHistoryAnalytics([]);

  /* Clear profile form fields - both text inputs and text content */
  const profileFields = ['profFirstName', 'profLastName', 'profAge', 'profGender', 'profWeight', 'profHeight'];
  profileFields.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.tagName === 'INPUT') {
      el.value = '';
    }
  });

  /* Clear profile display sections */
  const displayFields = ['profDisplayName', 'profEmailLine'];
  displayFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });

  /* Clear profile chips */
  const profChips = document.getElementById('profChips');
  if (profChips) {
    profChips.innerHTML = '<span class="prof-chip" style="opacity:.5">No goals set</span>';
  }

  /* Clear profile avatar and health goals checkboxes */
  const profAvatar = document.getElementById('profAvatar');
  if (profAvatar) profAvatar.textContent = 'G';

  /* Clear all health goal toggles */
  document.querySelectorAll('.toggle-group:first-of-type .toggle input').forEach(checkbox => {
    checkbox.checked = false;
  });

  /* Clear allergy chips */
  document.querySelectorAll('.allergy-chip').forEach(chip => {
    chip.classList.add('inactive');
  });

  showPage('landing');
}

/* ─── FAV ──────────────────────────────────── */
function toggleFav(btn) {
  if (!btn.classList.contains('saved')) {
    btn.textContent = 'Saved';
    btn.classList.add('saved');
    showToast('Added to favourites');
  } else {
    btn.textContent = 'Save';
    btn.classList.remove('saved');
    showToast('Removed from favourites');
  }
}

/* ─── MODAL ─────────────────────────────────── */
function openModal() { document.getElementById('modalOverlay').classList.add('open'); }
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

/* ─── TOAST ─────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─── FILTER TABS ────────────────────────────── */
document.querySelectorAll('.fh-filter').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.fh-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ─── DIAGNOSTIC FUNCTION ──────────────────────── */
function diagnoseApp() {
  console.log('=== NUTRISCAN DIAGNOSTIC ===');
  const token = localStorage.getItem('token');
  console.log('Token exists:', !!token);
  console.log('Token value:', token ? token.substring(0, 20) + '...' : 'None');
  console.log('Current user role:', currentUserRole || 'None');
  console.log('Is logged in:', !!token);
  console.log('API Base URL:', NutriApi.BASE_URL);

  /* Try to fetch history to see what happens */
  if (token) {
    console.log('Attempting to fetch history...');
    NutriApi.getHistory().then(res => {
      console.log('History API Response:', res);
    }).catch(err => {
      console.error('History API Error:', err.message);
    });
  } else {
    console.log('No token - cannot fetch history');
  }

  console.log('=== END DIAGNOSTIC ===');
}

/* ─── INIT ───────────────────────────────────── */
window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  checkAuth();
  updateAdminNavVisibility();

  if (token) {
    showPage('dashboard');
    refreshProfile();
    refreshHistory();
  } else {
    showPage('landing');
    clearSidebarMockData();
  }

  initReveal();

  /* Animate landing page hero card bars */
  setTimeout(() => {
    document.querySelectorAll('.hero-card .nb-fill').forEach(el => {
      const w = el.style.width;
      el.style.width = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = w; }));
    });
  }, 600);

  /* Dashboard bars on first load */
  setTimeout(() => animateBars('dashBarChart'), 120);
});
