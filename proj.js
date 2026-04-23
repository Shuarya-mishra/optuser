const yearData = {
  1: {
    label: 'First Year', desc: 'Build your academic foundation with these essential courses.',
    color: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)',
    subjects: [
      { name: 'Mathematics I', icon: 'sigma', desc: 'Calculus & Linear Algebra', link: 'https://drive.google.com/drive/folders/1SbbVCCwpaEcIVbxNjjuLWWpsFNQKnzZ7' },
      { name: 'Physics', icon: 'atom', desc: 'Mechanics & Thermodynamics', link: 'physics.html' },
      { name: 'Chemistry', icon: 'flask-conical', desc: 'General & Organic Chemistry', link: 'chemistry.html' },
      { name: 'English', icon: 'languages', desc: 'Communication Skills', link: 'english.html' },
      { name: 'Computer Basics', icon: 'monitor', desc: 'Introduction to Computing', link: 'computer-basics.html' },
      { name: 'Engineering Drawing', icon: 'pen-tool', desc: 'Technical Graphics', link: 'engineering-drawing.html' }
    ]
  },
  2: {
    label: 'Second Year', desc: 'Dive deeper into core engineering and science subjects.',
    color: '#c084fc', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)',
    subjects: [
      { name: 'Mathematics II', icon: 'sigma', desc: 'Differential Equations', link: 'math2.html' },
      { name: 'Data Structures', icon: 'database', desc: 'Arrays, Trees & Graphs', link: 'data-structures.html' },
      { name: 'Digital Electronics', icon: 'cpu', desc: 'Logic Gates & Circuits', link: 'digital-electronics.html' },
      { name: 'Object-Oriented Programming', icon: 'code-2', desc: 'Java / C++ Fundamentals', link: 'oop.html' },
      { name: 'Discrete Mathematics', icon: 'grid-3x3', desc: 'Logic & Combinatorics', link: 'discrete-math.html' },
      { name: 'Environmental Science', icon: 'leaf', desc: 'Ecology & Sustainability', link: 'evs.html' }
    ]
  },
  3: {
    label: 'Third Year', desc: 'Explore advanced topics and start building expertise.',
    color: '#6ee7b7', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.25)',
    subjects: [
      { name: 'Operating Systems', icon: 'hard-drive', desc: 'Process & Memory Management', link: 'os.html' },
      { name: 'Database Systems', icon: 'database', desc: 'SQL & Normalization', link: 'dbms.html' },
      { name: 'Computer Networks', icon: 'network', desc: 'Protocols & Architecture', link: 'networks.html' },
      { name: 'Software Engineering', icon: 'file-code-2', desc: 'SDLC & Design Patterns', link: 'software-engineering.html' },
      { name: 'Algorithms', icon: 'git-branch', desc: 'Sorting, Searching & Optimization', link: 'algorithms.html' },
      { name: 'Web Development', icon: 'globe', desc: 'Frontend & Backend Basics', link: 'web-dev.html' }
    ]
  },
  4: {
    label: 'Fourth Year', desc: 'Specialize and prepare for your career ahead.',
    color: '#fdba74', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.25)',
    subjects: [
      { name: 'Machine Learning', icon: 'brain', desc: 'Supervised & Unsupervised Learning', link: 'ml.html' },
      { name: 'Cloud Computing', icon: 'cloud', desc: 'AWS, Azure & Deployment', link: 'cloud.html' },
      { name: 'Cybersecurity', icon: 'shield', desc: 'Encryption & Network Security', link: 'cybersecurity.html' },
      { name: 'Project Management', icon: 'kanban', desc: 'Agile & Scrum Methodologies', link: 'project-management.html' },
      { name: 'Capstone Project', icon: 'rocket', desc: 'Industry-Level Build', link: 'capstone.html' },
      { name: 'Professional Ethics', icon: 'scale', desc: 'Law, IP & Ethics in Tech', link: 'ethics.html' }
    ]
  }
};

function showYear(year) {
  const d = yearData[year];
  document.getElementById('page-home').classList.add('hidden');
  const page = document.getElementById('page-subjects');
  page.classList.remove('hidden');

  const badge = document.getElementById('year-badge');
  badge.textContent = `Year ${year}`;
  badge.style.background = d.bg;
  badge.style.color = d.color;
  badge.style.border = `1px solid ${d.border}`;

  document.getElementById('year-title').textContent = d.label + ' Subjects';
  document.getElementById('year-desc').textContent = d.desc;

  const grid = document.getElementById('subjects-grid');
  grid.innerHTML = '';
  
  d.subjects.forEach((s, i) => {
    // Changed from 'div' to 'a' to make it a clickable link
    const card = document.createElement('a');
    
    // Set the destination URL. If none exists in data, it falls back to '#'
    card.href = s.link || '#';
    
    card.className = 'subject-chip rounded-xl p-5 flex items-start gap-4 slide-in';
    
    // Removed 'cursor:default;' so it shows the pointer hand on hover
    // Added 'text-decoration:none; display:flex;' to maintain layout
    card.style.cssText = `animation-delay:${i * 0.08}s; background:${d.bg}; border:1px solid ${d.border}; text-decoration:none; display:flex;`;
    
    card.innerHTML = `
      <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${d.border};">
        <i data-lucide="${s.icon}" style="width:20px;height:20px;color:${d.color};"></i>
      </div>
      <div>
        <h4 class="font-600 text-base mb-0.5" style="color:#f1f5f9;">${s.name}</h4>
        <p class="text-sm" style="color:#64748b;">${s.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Re-initialize Lucide icons for newly created DOM elements
  lucide.createIcons();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
  document.getElementById('page-subjects').classList.add('hidden');
  document.getElementById('page-home').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Element SDK Initialization
const defaultConfig = {
  main_title: 'Choose Your Academic Year',
  subtitle: 'Select your year to view subjects',
  background_color: '#0f172a',
  text_color: '#f8fafc',
  accent_color: '#fbbf24',
  font_family: 'Fraunces',
  font_size: 16
};

function applyConfig(config) {
  const t = config.main_title || defaultConfig.main_title;
  const s = config.subtitle || defaultConfig.subtitle;
  const bg = config.background_color || defaultConfig.background_color;
  const txt = config.text_color || defaultConfig.text_color;
  const accent = config.accent_color || defaultConfig.accent_color;
  const font = config.font_family || defaultConfig.font_family;
  const size = config.font_size || defaultConfig.font_size;

  document.getElementById('main-title').textContent = t;
  document.getElementById('subtitle').textContent = s;
  document.getElementById('app').style.background = bg;
  document.getElementById('main-title').style.color = txt;

  document.querySelectorAll('.heading-font').forEach(el => {
    el.style.fontFamily = `${font}, Fraunces, serif`;
  });
  document.getElementById('main-title').style.fontSize = `${size * 2.8}px`;
  document.getElementById('subtitle').style.fontSize = `${size * 1.15}px`;
}

// Ensure the Element SDK exists before calling it (prevents errors if running locally without the SDK files)
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.accent_color || defaultConfig.accent_color, set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } }
      ],
      borderables: [],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['main_title', config.main_title || defaultConfig.main_title],
      ['subtitle', config.subtitle || defaultConfig.subtitle]
    ])
  });
}

// Initial icon generation on page load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});