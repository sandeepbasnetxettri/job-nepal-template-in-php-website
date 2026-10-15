/**
 * JOB NEPAL — Dedicated Login Page Controller (js/login.js)
 * Clean, production-ready JavaScript for the login workflow
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoginModule();
  parseLoginUrlParams();
});

let currentLoginRole = 'seeker'; // 'seeker' | 'employer'

/**
 * Initialize event listeners
 */
function initLoginModule() {
  const form = document.getElementById('loginForm');
  if (form && !form.dataset.loginBound) {
    form.dataset.loginBound = 'true';
    form.addEventListener('submit', handleLoginSubmit);
  }

  // Clear errors on user input
  const idInput = document.getElementById('loginIdentifier');
  const passInput = document.getElementById('loginPassword');

  if (idInput && !idInput.dataset.inputBound) {
    idInput.dataset.inputBound = 'true';
    idInput.addEventListener('input', () => {
      document.getElementById('loginIdentifierError')?.classList.remove('active');
      idInput.classList.remove('input-error');
    });
  }

  if (passInput && !passInput.dataset.inputBound) {
    passInput.dataset.inputBound = 'true';
    passInput.addEventListener('input', () => {
      document.getElementById('loginPasswordError')?.classList.remove('active');
      passInput.classList.remove('input-error');
    });
  }
}

/**
 * Handle role tab selection
 * @param {'seeker' | 'employer'} role 
 */
function selectLoginRole(role) {
  currentLoginRole = role;

  const roleInput = document.getElementById('loginRole');
  const tabSeeker = document.getElementById('tabRoleSeeker');
  const tabEmployer = document.getElementById('tabRoleEmployer');
  const banner = document.getElementById('roleInfoBanner');
  const bannerIcon = document.getElementById('roleBannerIcon');
  const bannerText = document.getElementById('roleBannerText');
  const submitBtn = document.getElementById('loginSubmitBtn');

  if (roleInput) roleInput.value = role;

  if (role === 'seeker') {
    if (tabSeeker) tabSeeker.className = 'auth-role-tab active';
    if (tabEmployer) tabEmployer.className = 'auth-role-tab';
    if (banner) banner.className = 'role-info-banner';
    if (bannerIcon) bannerIcon.innerText = '🎯';
    if (bannerText) bannerText.innerHTML = 'Logging in as <strong>Job Seeker</strong> — Access applications, resume & jobs.';
    if (submitBtn) {
      submitBtn.className = 'btn btn-primary btn-login-submit';
      submitBtn.style.background = '';
    }
  } else {
    if (tabSeeker) tabSeeker.className = 'auth-role-tab';
    if (tabEmployer) tabEmployer.className = 'auth-role-tab active';
    if (banner) banner.className = 'role-info-banner employer-mode';
    if (bannerIcon) bannerIcon.innerText = '🏢';
    if (bannerText) bannerText.innerHTML = 'Logging in as <strong>Company / Employer</strong> — Post vacancies & review CVs.';
    if (submitBtn) {
      submitBtn.className = 'btn btn-crimson btn-login-submit employer-submit';
      submitBtn.style.background = '';
    }
  }
}

/**
 * Handle login form submission
 */
function handleLoginSubmit(e) {
  e.preventDefault();

  const idInput = document.getElementById('loginIdentifier');
  const passInput = document.getElementById('loginPassword');
  const idError = document.getElementById('loginIdentifierError');
  const passError = document.getElementById('loginPasswordError');

  const identifier = idInput ? idInput.value.trim() : '';
  const password = passInput ? passInput.value : '';

  let hasError = false;

  if (!identifier) {
    if (idError) idError.classList.add('active');
    if (idInput) idInput.classList.add('input-error');
    hasError = true;
  }

  if (!password) {
    if (passError) {
      passError.innerText = 'Please enter your password.';
      passError.classList.add('active');
    }
    if (passInput) passInput.classList.add('input-error');
    hasError = true;
  } else if (password.length < 6) {
    if (passError) {
      passError.innerText = 'Password must be at least 6 characters.';
      passError.classList.add('active');
    }
    if (passInput) passInput.classList.add('input-error');
    hasError = true;
  }

  if (hasError) return;

  // Check stored registered accounts
  const registeredUsers = JSON.parse(localStorage.getItem('jn_registered_users') || '[]');
  const matchedUser = registeredUsers.find(u => 
    (u.email?.toLowerCase() === identifier.toLowerCase() || u.mobile === identifier) && 
    (u.role === currentLoginRole)
  );

  const currentUser = matchedUser || {
    id: (currentLoginRole === 'employer' ? 'cmp-' : 'usr-') + Date.now(),
    name: currentLoginRole === 'employer' 
      ? (identifier.includes('@') ? identifier.split('@')[0].toUpperCase() + ' Pvt. Ltd.' : 'ABC Technology')
      : (identifier.includes('@') ? identifier.split('@')[0].toUpperCase() : 'Sandeep Basnet'),
    email: identifier.includes('@') ? identifier : `${identifier}@jobnepal.com`,
    mobile: !identifier.includes('@') ? identifier : '9841234567',
    role: currentLoginRole,
    token: 'jwt-jn-' + Math.random().toString(36).substring(2),
    location: 'Kathmandu, Nepal'
  };

  localStorage.setItem('jn_current_user', JSON.stringify(currentUser));

  // Trigger feedback
  if (typeof showToast === 'function') {
    showToast(`Welcome, ${currentUser.name}! Logging you in...`, 'success');
  }

  // Redirect to respective dashboard
  setTimeout(() => {
    if (currentLoginRole === 'employer') {
      window.location.href = 'dashboard.html?role=employer';
    } else {
      window.location.href = 'dashboard.html?role=seeker';
    }
  }, 750);
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    btn.innerText = '🙈';
    btn.setAttribute('aria-label', 'Hide password');
  } else {
    input.type = 'password';
    btn.innerText = '👁️';
    btn.setAttribute('aria-label', 'Show password');
  }
}

/**
 * Quick 1-Click Demo autofill
 */
function fillDemoCredentials(role) {
  const idInput = document.getElementById('loginIdentifier');
  const passInput = document.getElementById('loginPassword');

  if (role === 'seeker') {
    selectLoginRole('seeker');
    if (idInput) idInput.value = 'sandeep.basnet@example.com';
    if (passInput) passInput.value = 'nepal12345';
  } else if (role === 'employer') {
    selectLoginRole('employer');
    if (idInput) idInput.value = 'hr@cotiviti.com.np';
    if (passInput) passInput.value = 'cotiviti123';
  } else if (role === 'admin') {
    selectLoginRole('seeker');
    if (idInput) idInput.value = 'admin@jobnepal.gov.np';
    if (passInput) passInput.value = 'adminsecure';
  }

  if (typeof showToast === 'function') {
    showToast(`Demo ${role.toUpperCase()} credentials filled! Click Login.`, 'info');
  }
}

/**
 * Parse URL query parameters on load
 */
function parseLoginUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role');
  if (role === 'seeker' || role === 'employer' || role === 'company') {
    selectLoginRole(role === 'company' ? 'employer' : role);
  }
}

/**
 * Forgot password modal handlers
 */
function openForgotPasswordModal() {
  const modal = document.getElementById('forgotPasswordModal');
  if (modal) modal.classList.add('active');
}

function closeForgotPasswordModal() {
  const modal = document.getElementById('forgotPasswordModal');
  if (modal) modal.classList.remove('active');
}

function handleForgotPasswordSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById('resetIdentifier');
  const otpSection = document.getElementById('resetOtpSection');
  const submitBtn = document.getElementById('resetSubmitBtn');
  const otpInput = document.getElementById('resetOtpInput');
  const newPassInput = document.getElementById('resetNewPassword');

  if (otpSection && otpSection.style.display === 'none') {
    otpSection.style.display = 'block';
    submitBtn.innerText = 'Reset & Update Password';
    if (typeof showToast === 'function') {
      showToast(`Verification code sent to ${idInput.value}! Code is 123456`, 'info');
    }
  } else {
    if (otpInput && otpInput.value === '123456' && newPassInput && newPassInput.value.length >= 6) {
      if (typeof showToast === 'function') {
        showToast('Password reset successfully! You can now log in.', 'success');
      }
      closeForgotPasswordModal();
      const loginPass = document.getElementById('loginPassword');
      if (loginPass) loginPass.value = newPassInput.value;
    } else {
      if (typeof showToast === 'function') {
        showToast('Please enter OTP 123456 and a new password (min 6 chars).', 'error');
      }
    }
  }
}

// Window global exports
window.selectLoginRole = selectLoginRole;
window.handleLoginSubmit = handleLoginSubmit;
window.togglePasswordVisibility = togglePasswordVisibility;
window.fillDemoCredentials = fillDemoCredentials;
window.openForgotPasswordModal = openForgotPasswordModal;
window.closeForgotPasswordModal = closeForgotPasswordModal;
window.handleForgotPasswordSubmit = handleForgotPasswordSubmit;
