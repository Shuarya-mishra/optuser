const BASE_PRICE = 29;
const DISCOUNT_PERCENT = 6;
let promoApplied = false;

const VALID_PROMOS = ['SAVE6', 'DISCOUNT6', 'GET6OFF'];

function applyPromo() {
  const input = document.getElementById('promoInput');
  const msg = document.getElementById('promoMsg');
  const code = input.value.trim().toUpperCase();

  if (promoApplied) {
    showMsg(msg, 'Promo already applied!', 'text-yellow-400');
    return;
  }
  if (!code) {
    showMsg(msg, 'Please enter a promo code', 'text-red-400');
    return;
  }
  if (!VALID_PROMOS.includes(code)) {
    showMsg(msg, 'Invalid promo code. Try again.', 'text-red-400');
    input.value = '';
    return;
  }

  promoApplied = true;
  const discounted = (BASE_PRICE * (1 - DISCOUNT_PERCENT / 100)).toFixed(2);

  document.getElementById('originalPrice').classList.add('hidden');
  document.getElementById('discountedPrice').textContent = '₹' + discounted;
  document.getElementById('discountedPrice').classList.remove('hidden');
  document.getElementById('strikePrice').textContent = '₹' + BASE_PRICE;
  document.getElementById('strikePrice').classList.remove('hidden');
  document.getElementById('discountBadge').classList.remove('hidden');
  document.getElementById('stepAmount').textContent = '₹' + discounted;

  input.disabled = true;
  input.classList.add('opacity-50');
  document.getElementById('promoBtn').textContent = 'Applied ✓';
  document.getElementById('promoBtn').classList.replace('bg-indigo-500', 'bg-emerald-600');
  document.getElementById('promoBtn').classList.replace('hover:bg-indigo-600', 'hover:bg-emerald-700');
  document.getElementById('promoBtn').disabled = true;

  showMsg(msg, '🎉 6% discount applied! You save ₹' + (BASE_PRICE - discounted).toFixed(2), 'text-emerald-400');
  showToast('Promo code applied successfully!');
}

function showMsg(el, text, colorClass) {
  el.textContent = text;
  el.className = 'text-sm mt-2 ' + colorClass;
  el.classList.remove('hidden');
}

function showToast(text) {
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.remove('hidden');
  t.classList.add('toast-show');
  setTimeout(() => { t.classList.add('hidden'); t.classList.remove('toast-show'); }, 3000);
}

// Element SDK
const defaultConfig = {
  page_title: 'Complete Your Payment',
  price_label: '₹29',
  instructions_text: 'Scan the QR code below to pay',
  background_color: '#0f0f1a',
  surface_color: '#1a1a2e',
  text_color: '#e2e8f0',
  primary_action_color: '#6366f1',
  secondary_action_color: '#2AABEE',
  font_family: 'DM Sans',
  font_size: 16
};

function applyConfig(config) {
  const c = { ...defaultConfig, ...config };
  document.getElementById('pageTitle').textContent = c.page_title;
  document.getElementById('instrText').textContent = c.instructions_text;

  const app = document.getElementById('app');
  app.style.background = `linear-gradient(135deg, ${c.background_color} 0%, ${c.surface_color} 50%, ${c.background_color} 100%)`;

  document.querySelectorAll('.text-white, h1, h3').forEach(el => {
    if (el.id === 'pageTitle' || el.tagName === 'H1' || el.tagName === 'H3') el.style.color = c.text_color;
  });

  const font = c.font_family + ', sans-serif';
  document.body.style.fontFamily = font;

  const base = c.font_size || 16;
  document.getElementById('pageTitle').style.fontSize = (base * 2) + 'px';
  document.getElementById('instrText').style.fontSize = (base * 0.9) + 'px';
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['page_title', config.page_title || defaultConfig.page_title],
      ['price_label', config.price_label || defaultConfig.price_label],
      ['instructions_text', config.instructions_text || defaultConfig.instructions_text]
    ])
  });
}

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});