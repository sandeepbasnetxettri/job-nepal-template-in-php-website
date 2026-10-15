/**
 * JOB NEPAL — Core UI Utilities & Global App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initToasts();
  updateAuthNav();
  initCountrySelector();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('jn_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jn_theme', next);
      themeToggle.innerHTML = next === 'dark' ? '☀️' : '🌙';
      showToast(`Switched to ${next} mode`, 'info');
    });
  }
}

// Mobile Menu
function initMobileMenu() {
  let toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navbar = document.querySelector('.navbar');

  // Auto-inject mobile toggle if missing but navbar exists
  if (!toggleBtn && navbar && navMenu) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-toggle';
    toggleBtn.setAttribute('aria-label', 'Open mobile navigation');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '☰';
    navbar.appendChild(toggleBtn);
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('active');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Reset any legacy inline display style
      navMenu.style.display = '';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          toggleBtn.innerHTML = '☰';
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close when clicking any menu link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Dashboard Sidebar Drawer for Mobile
  const dashTopbar = document.querySelector('.dashboard-topbar');
  const dashSidebar = document.querySelector('.dash-left-sidebar');

  if (dashTopbar && dashSidebar) {
    let dashToggle = dashTopbar.querySelector('.dash-menu-toggle');
    if (!dashToggle) {
      dashToggle = document.createElement('button');
      dashToggle.className = 'dash-menu-toggle';
      dashToggle.setAttribute('aria-label', 'Open dashboard menu');
      dashToggle.innerHTML = '☰';
      dashTopbar.prepend(dashToggle);
    }

    let overlay = document.querySelector('.dash-sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'dash-sidebar-overlay';
      document.body.appendChild(overlay);
    }

    dashToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = dashSidebar.classList.toggle('active');
      overlay.classList.toggle('active', isActive);
      dashToggle.innerHTML = isActive ? '✕' : '☰';
    });

    overlay.addEventListener('click', () => {
      dashSidebar.classList.remove('active');
      overlay.classList.remove('active');
      dashToggle.innerHTML = '☰';
    });

    dashSidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dashSidebar.classList.remove('active');
        overlay.classList.remove('active');
        dashToggle.innerHTML = '☰';
      });
    });
  }
}

// Global Toast System
function initToasts() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = '✓';
  if (type === 'error') icon = '✕';
  if (type === 'warning') icon = '⚠';
  if (type === 'info') icon = 'ℹ';

  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 1.1rem;">${icon}</span>
    <span style="font-size: 0.92rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// Auth State Navbar Indicator
function updateAuthNav() {
  const user = JSON.parse(localStorage.getItem('jn_current_user') || 'null');
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  if (user) {
    navActions.innerHTML = `
      <a href="dashboard.html" class="btn btn-outline btn-sm">
        <span>👤</span> ${user.name ? user.name.split(' ')[0] : 'Dashboard'}
      </a>
      <a href="post-job.html" class="btn btn-crimson btn-sm">Post a Job</a>
      <button id="themeToggle" class="btn btn-ghost btn-sm" aria-label="Toggle theme">🌙</button>
      <button onclick="handleLogout()" class="btn btn-ghost btn-sm" title="Logout">🚪</button>
    `;
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('jn_theme', next);
        themeBtn.innerHTML = next === 'dark' ? '☀️' : '🌙';
      });
    }
  }
}

function handleLogout() {
  localStorage.removeItem('jn_current_user');
  showToast('Logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

// Formatters
function formatNPR(amount) {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
  }).format(amount).replace('NPR', 'Rs.');
}

// Global Country Selector System
const ALL_COUNTRIES = [
  // Top Popular Destinations
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', popular: true },
  { code: 'GLOBAL', name: 'Worldwide / Remote', flag: '🌐', popular: true },
  { code: 'IN', name: 'India', flag: '🇮🇳', popular: true },
  { code: 'AE', name: 'United Arab Emirates (UAE)', flag: '🇦🇪', popular: true },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', popular: true },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', popular: true },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', popular: true },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', popular: true },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', popular: true },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', popular: true },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', popular: true },
  { code: 'US', name: 'United States (USA)', flag: '🇺🇸', popular: true },
  { code: 'GB', name: 'United Kingdom (UK)', flag: '🇬🇧', popular: true },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', popular: true },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', popular: true },

  // Middle East & Gulf
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },

  // Asia & Pacific
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'MO', name: 'Macau', flag: '🇲🇴' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },

  // Europe
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },

  // Americas
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },

  // Africa
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },

  // Central Asia & Caucasus
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' }
];

function initCountrySelector() {
  const dropdownBtn = document.getElementById('countryDropdownBtn');
  const dropdownMenu = document.getElementById('countryDropdownMenu');
  const countryList = document.getElementById('countryList');
  if (!dropdownBtn || !dropdownMenu || !countryList) return;

  const savedCountry = JSON.parse(localStorage.getItem('jn_selected_country') || JSON.stringify(ALL_COUNTRIES[0]));
  updateCountryButton(savedCountry);
  renderCountryList(ALL_COUNTRIES, savedCountry.code);

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
      dropdownBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function updateCountryButton(country) {
  const flagEl = document.getElementById('currentCountryFlag');
  const nameEl = document.getElementById('currentCountryName');
  if (flagEl) flagEl.textContent = country.flag;
  if (nameEl) nameEl.textContent = country.name.split(' (')[0];
}

function renderCountryList(list, activeCode = 'NP') {
  const countryList = document.getElementById('countryList');
  if (!countryList) return;

  if (list.length === 0) {
    countryList.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No countries found</div>`;
    return;
  }

  countryList.innerHTML = list.map(c => `
    <div class="country-item ${c.code === activeCode ? 'selected' : ''}" onclick="selectCountry('${c.code}')">
      <div class="country-item-left">
        <span style="font-size: 1.15rem;">${c.flag}</span>
        <span>${c.name}</span>
      </div>
      ${c.code === activeCode ? '<span style="color: var(--primary); font-weight: 800;">✓</span>' : ''}
    </div>
  `).join('');
}

function toggleCountryDropdown(e) {
  if (e) e.stopPropagation();
  const dropdownBtn = document.getElementById('countryDropdownBtn');
  const dropdownMenu = document.getElementById('countryDropdownMenu');
  if (!dropdownMenu) return;

  const isOpen = dropdownMenu.classList.toggle('show');
  if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (isOpen) {
    const searchInput = document.getElementById('countrySearchInput');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
      const savedCountry = JSON.parse(localStorage.getItem('jn_selected_country') || JSON.stringify(ALL_COUNTRIES[0]));
      renderCountryList(ALL_COUNTRIES, savedCountry.code);
    }
  }
}

function selectCountry(countryCode) {
  const country = ALL_COUNTRIES.find(c => c.code === countryCode) || ALL_COUNTRIES[0];
  localStorage.setItem('jn_selected_country', JSON.stringify(country));
  updateCountryButton(country);

  const dropdownMenu = document.getElementById('countryDropdownMenu');
  if (dropdownMenu) dropdownMenu.classList.remove('show');

  showToast(`Region set to ${country.flag} ${country.name}`, 'success');
}

function filterCountries(query = '') {
  const q = query.toLowerCase().trim();
  const savedCountry = JSON.parse(localStorage.getItem('jn_selected_country') || JSON.stringify(ALL_COUNTRIES[0]));
  const filtered = ALL_COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  renderCountryList(filtered, savedCountry.code);
}

window.showToast = showToast;
window.handleLogout = handleLogout;
window.formatNPR = formatNPR;
window.toggleCountryDropdown = toggleCountryDropdown;
window.selectCountry = selectCountry;
window.filterCountries = filterCountries;
