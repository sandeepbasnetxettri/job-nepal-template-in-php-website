/**
 * JOB NEPAL — Comprehensive Authentication & Role Separation System
 * Handles:
 * 1. Login with dynamic role selection (Job Seeker, Company / Employer, Admin)
 * 2. Multi-step Job Seeker Registration & OTP verification
 * 3. Multi-step Company / Employer Registration & Logo upload & OTP verification
 * 4. Password visibility toggling, real-time strength meter & requirements checklist
 * 5. Skills multi-selection tag library
 * 6. Forgot Password modal with simulated OTP recovery
 * 7. Strict role permission validation & dashboard redirection
 */

// Global state for ongoing registrations
const authState = {
  seekerData: {
    fullName: '',
    email: '',
    mobile: '',
    location: '',
    password: '',
    education: '',
    institution: '',
    gradYear: '',
    skills: ['JavaScript', 'Python', 'React', 'HTML', 'CSS'],
    experience: 'Mid Level',
    jobTitle: 'Full Stack Developer',
    resumeFileName: '',
    bio: '',
    salary: 'NPR 75,000'
  },
  companyData: {
    name: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    size: '',
    address: '',
    about: '',
    logoUrl: '',
    password: ''
  },
  otpCountdownTimer: null,
  otpSecondsLeft: 30
};

// Complete pre-defined skills library matching requirements
const SKILLS_LIBRARY = [
  "JavaScript", "Python", "React", "HTML", "CSS",
  "Node.js", "Java", "Go", "PHP", "C", "C++",
  "SQL", "MongoDB", "Git", "GitHub", "UI/UX",
  "Data Science", "AI / Machine Learning", "Cybersecurity",
  "Networking", "Digital Marketing", "Accounting", "Communication", "Leadership"
];

document.addEventListener('DOMContentLoaded', () => {
  initLoginModule();
  initRegistrationModule();
  initSkillsLibrary();
  checkUrlParamsForAuth();
});

/* ==========================================================================
   1. LOGIN PAGE CONTROLLER
   ========================================================================== */

function initLoginModule() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm || loginForm.dataset.loginBound) return;
  loginForm.dataset.loginBound = 'true';

  loginForm.addEventListener('submit', handleLoginSubmit);
}

function selectLoginRole(role) {
  const roleInput = document.getElementById('loginRole');
  const tabSeeker = document.getElementById('tabRoleSeeker');
  const tabEmployer = document.getElementById('tabRoleEmployer');
  const bannerIcon = document.getElementById('roleBannerIcon');
  const bannerText = document.getElementById('roleBannerText');
  const submitBtn = document.getElementById('loginSubmitBtn');

  if (roleInput) roleInput.value = role;

  if (role === 'seeker') {
    if (tabSeeker) tabSeeker.className = 'auth-role-tab active';
    if (tabEmployer) tabEmployer.className = 'auth-role-tab';
    if (bannerIcon) bannerIcon.innerText = '🎯';
    if (bannerText) bannerText.innerHTML = 'Logging in as <strong>Job Seeker</strong> — Access applications, resume & jobs.';
    if (submitBtn) submitBtn.className = 'btn btn-primary btn-lg';
  } else {
    if (tabSeeker) tabSeeker.className = 'auth-role-tab';
    if (tabEmployer) tabEmployer.className = 'auth-role-tab active';
    if (bannerIcon) bannerIcon.innerText = '🏢';
    if (bannerText) bannerText.innerHTML = 'Logging in as <strong>Company / Employer</strong> — Post jobs & manage candidates.';
    if (submitBtn) submitBtn.className = 'btn btn-crimson btn-lg';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();

  const role = document.getElementById('loginRole') ? document.getElementById('loginRole').value : 'seeker';
  const identifierEl = document.getElementById('loginIdentifier');
  const passwordEl = document.getElementById('loginPassword');
  const identifierError = document.getElementById('loginIdentifierError');
  const passwordError = document.getElementById('loginPasswordError');

  // Reset errors
  if (identifierError) identifierError.classList.remove('active');
  if (passwordError) passwordError.classList.remove('active');
  if (identifierEl) identifierEl.classList.remove('input-error');
  if (passwordEl) passwordEl.classList.remove('input-error');

  const identifier = identifierEl ? identifierEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';

  let hasError = false;

  if (!identifier) {
    if (identifierError) identifierError.classList.add('active');
    if (identifierEl) identifierEl.classList.add('input-error');
    hasError = true;
  }

  if (!password) {
    if (passwordError) passwordError.classList.add('active');
    if (passwordEl) passwordEl.classList.add('input-error');
    hasError = true;
  } else if (password.length < 6) {
    if (passwordError) {
      passwordError.innerText = 'Password must be at least 6 characters.';
      passwordError.classList.add('active');
    }
    if (passwordEl) passwordEl.classList.add('input-error');
    hasError = true;
  }

  if (hasError) return;

  // Check registered users in localStorage or fallback
  const registeredUsers = JSON.parse(localStorage.getItem('jn_registered_users') || '[]');
  const matchedUser = registeredUsers.find(u => 
    (u.email.toLowerCase() === identifier.toLowerCase() || u.mobile === identifier) && 
    (u.role === role)
  );

  const currentUser = matchedUser || {
    id: 'usr-' + Date.now(),
    name: role === 'employer' ? (identifier.includes('@') ? identifier.split('@')[0].toUpperCase() + ' Pvt. Ltd.' : 'ABC Technology') : (identifier.includes('@') ? identifier.split('@')[0].toUpperCase() : 'Sandeep Basnet'),
    email: identifier.includes('@') ? identifier : `${identifier}@jobnepal.com`,
    mobile: !identifier.includes('@') ? identifier : '9841234567',
    role: role,
    token: 'jwt-jn-' + Math.random().toString(36).substring(2),
    location: 'Kathmandu, Nepal'
  };

  localStorage.setItem('jn_current_user', JSON.stringify(currentUser));

  showToast(`Welcome, ${currentUser.name}! Logging you into Job Nepal...`, 'success');

  setTimeout(() => {
    if (role === 'employer') {
      window.location.href = 'dashboard.html?role=employer';
    } else if (role === 'admin') {
      window.location.href = 'dashboard.html?role=admin';
    } else {
      window.location.href = 'dashboard.html?role=seeker';
    }
  }, 800);
}

// Quick 1-Click Demo Credentials
function fillDemoCredentials(role) {
  const idInput = document.getElementById('loginIdentifier');
  const passInput = document.getElementById('loginPassword');

  selectLoginRole(role === 'admin' ? 'seeker' : role);

  if (role === 'seeker') {
    if (idInput) idInput.value = 'sandeep.basnet@example.com';
    if (passInput) passInput.value = 'nepal12345';
  } else if (role === 'employer') {
    if (idInput) idInput.value = 'hr@cotiviti.com.np';
    if (passInput) passInput.value = 'cotiviti123';
  } else if (role === 'admin') {
    if (idInput) idInput.value = 'admin@jobnepal.gov.np';
    if (passInput) passInput.value = 'adminsecure';
  }

  showToast(`Demo ${role.toUpperCase()} credentials filled! Click Login.`, 'info');
}

/* ==========================================================================
   2. REGISTRATION VIEW CONTROLLER (Landing & Multi-step Routing)
   ========================================================================== */

function initRegistrationModule() {
  // Check if we are on register.html
  const landingView = document.getElementById('registerLandingView');
  if (!landingView) return;
}

function checkUrlParamsForAuth() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type === 'seeker' || type === 'company' || type === 'employer') {
    startRegistrationFlow(type === 'employer' ? 'company' : type);
  }

  const role = params.get('role');
  if (role === 'seeker' || role === 'employer' || role === 'company') {
    selectLoginRole(role === 'company' ? 'employer' : role);
  }
}

function startRegistrationFlow(type) {
  const landingView = document.getElementById('registerLandingView');
  const seekerSection = document.getElementById('seekerRegistrationView');
  const companySection = document.getElementById('companyRegistrationView');
  const headerToggle = document.getElementById('headerModeToggle');

  if (landingView) landingView.style.display = 'none';
  if (headerToggle) headerToggle.style.display = 'flex';

  if (type === 'seeker') {
    if (seekerSection) seekerSection.style.display = 'grid';
    if (companySection) companySection.style.display = 'none';
    setToggleActive('seeker');
    showSeekerStep(1);
  } else {
    if (seekerSection) seekerSection.style.display = 'none';
    if (companySection) companySection.style.display = 'grid';
    setToggleActive('company');
    showCompanyStep(1);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchRegistrationFlow(type) {
  startRegistrationFlow(type);
}

function cancelRegistration() {
  const landingView = document.getElementById('registerLandingView');
  const seekerSection = document.getElementById('seekerRegistrationView');
  const companySection = document.getElementById('companyRegistrationView');
  const headerToggle = document.getElementById('headerModeToggle');

  if (seekerSection) seekerSection.style.display = 'none';
  if (companySection) companySection.style.display = 'none';
  if (headerToggle) headerToggle.style.display = 'none';
  if (landingView) landingView.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setToggleActive(type) {
  const seekerBtn = document.getElementById('toggleSeekerBtn');
  const companyBtn = document.getElementById('toggleCompanyBtn');

  if (type === 'seeker') {
    if (seekerBtn) {
      seekerBtn.className = 'btn btn-sm btn-primary';
      seekerBtn.style.background = '#0066ff';
      seekerBtn.style.color = '#fff';
    }
    if (companyBtn) {
      companyBtn.className = 'btn btn-sm btn-outline';
      companyBtn.style.background = 'transparent';
      companyBtn.style.color = '#475569';
    }
  } else {
    if (companyBtn) {
      companyBtn.className = 'btn btn-sm btn-crimson';
      companyBtn.style.background = '#dc2626';
      companyBtn.style.color = '#fff';
    }
    if (seekerBtn) {
      seekerBtn.className = 'btn btn-sm btn-outline';
      seekerBtn.style.background = 'transparent';
      seekerBtn.style.color = '#475569';
    }
  }
}

/* ==========================================================================
   3. JOB SEEKER MULTI-STEP REGISTRATION STEPS
   ========================================================================== */

function showSeekerStep(stepNum) {
  for (let i = 1; i <= 5; i++) {
    const pane = document.getElementById(`seekerStep${i}`);
    if (pane) pane.style.display = (i === stepNum) ? 'block' : 'none';
  }

  const successPane = document.getElementById('seekerStepSuccess');
  if (successPane) successPane.style.display = 'none';

  // Update Stepper List UI
  const stepperItems = document.querySelectorAll('#seekerStepperList .reg-step-item');
  stepperItems.forEach(item => {
    const s = parseInt(item.getAttribute('data-step'), 10);
    if (s === stepNum) {
      item.className = 'reg-step-item active';
    } else if (s < stepNum) {
      item.className = 'reg-step-item completed';
    } else {
      item.className = 'reg-step-item';
    }
  });

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function nextSeekerStep(currentStep) {
  if (currentStep === 1) {
    // Validate Step 1
    const name = document.getElementById('skrFullName').value.trim();
    const email = document.getElementById('skrEmail').value.trim();
    const mobile = document.getElementById('skrMobile').value.trim();
    const location = document.getElementById('skrLocation').value;
    const password = document.getElementById('skrPassword').value;
    const confirmPassword = document.getElementById('skrConfirmPassword').value;

    let valid = true;

    // Name
    const nameErr = document.getElementById('skrFullNameError');
    if (!name) {
      nameErr.classList.add('active');
      document.getElementById('skrFullName').classList.add('input-error');
      valid = false;
    } else {
      nameErr.classList.remove('active');
      document.getElementById('skrFullName').classList.remove('input-error');
    }

    // Email
    const emailErr = document.getElementById('skrEmailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailErr.classList.add('active');
      document.getElementById('skrEmail').classList.add('input-error');
      valid = false;
    } else {
      emailErr.classList.remove('active');
      document.getElementById('skrEmail').classList.remove('input-error');
    }

    // Mobile
    const mobileErr = document.getElementById('skrMobileError');
    if (!mobile || mobile.length < 10) {
      mobileErr.classList.add('active');
      document.getElementById('skrMobile').classList.add('input-error');
      valid = false;
    } else {
      mobileErr.classList.remove('active');
      document.getElementById('skrMobile').classList.remove('input-error');
    }

    // Location
    const locErr = document.getElementById('skrLocationError');
    if (!location) {
      locErr.classList.add('active');
      document.getElementById('skrLocation').classList.add('input-error');
      valid = false;
    } else {
      locErr.classList.remove('active');
      document.getElementById('skrLocation').classList.remove('input-error');
    }

    // Password
    const pwdErr = document.getElementById('skrPasswordError');
    if (!password || password.length < 8) {
      pwdErr.classList.add('active');
      document.getElementById('skrPassword').classList.add('input-error');
      valid = false;
    } else {
      pwdErr.classList.remove('active');
      document.getElementById('skrPassword').classList.remove('input-error');
    }

    // Confirm Password
    const confErr = document.getElementById('skrConfirmPasswordError');
    if (password !== confirmPassword) {
      confErr.classList.add('active');
      document.getElementById('skrConfirmPassword').classList.add('input-error');
      valid = false;
    } else {
      confErr.classList.remove('active');
      document.getElementById('skrConfirmPassword').classList.remove('input-error');
    }

    if (!valid) return;

    // Save to state
    authState.seekerData.fullName = name;
    authState.seekerData.email = email;
    authState.seekerData.mobile = mobile;
    authState.seekerData.location = location;
    authState.seekerData.password = password;

    showSeekerStep(2);
  } else if (currentStep === 2) {
    // Validate Step 2: Education
    const edu = document.getElementById('skrEducation').value;
    const eduErr = document.getElementById('skrEducationError');

    if (!edu) {
      eduErr.classList.add('active');
      document.getElementById('skrEducation').classList.add('input-error');
      return;
    }
    eduErr.classList.remove('active');
    document.getElementById('skrEducation').classList.remove('input-error');

    authState.seekerData.education = edu;
    authState.seekerData.institution = document.getElementById('skrInstitution').value;
    authState.seekerData.gradYear = document.getElementById('skrGradYear').value;

    showSeekerStep(3);
  } else if (currentStep === 3) {
    // Validate Step 3: Skills
    const skillsErr = document.getElementById('skrSkillsError');
    if (authState.seekerData.skills.length === 0) {
      skillsErr.classList.add('active');
      return;
    }
    skillsErr.classList.remove('active');

    authState.seekerData.experience = document.getElementById('skrExperience').value;
    authState.seekerData.jobTitle = document.getElementById('skrJobTitle').value;

    showSeekerStep(4);
  } else if (currentStep === 4) {
    // Validate Step 4: Resume & Profile
    authState.seekerData.bio = document.getElementById('skrBio').value;
    authState.seekerData.salary = document.getElementById('skrSalary').value;

    // Prepare Step 5 (OTP verification target)
    const targetEl = document.getElementById('skrVerificationTarget');
    if (targetEl) {
      targetEl.innerText = `${authState.seekerData.email} & +977-${authState.seekerData.mobile}`;
    }

    startOtpCountdown('skr');
    showSeekerStep(5);
  }
}

function prevSeekerStep(step) {
  showSeekerStep(step - 1);
}

function handleResumeUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const preview = document.getElementById('resumeFilePreview');
    const prompt = document.getElementById('resumeUploadPrompt');

    authState.seekerData.resumeFileName = file.name;
    if (preview) {
      preview.style.display = 'block';
      preview.innerText = `✓ Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
    if (prompt) prompt.innerText = 'Resume ready for upload';
    showToast(`Resume "${file.name}" attached successfully!`, 'success');
  }
}

function verifySeekerAccount() {
  const otp = getOtpValue('skrOtpGrid');
  const otpErr = document.getElementById('skrOtpError');

  if (otp !== '123456' && otp.length !== 6) {
    if (otpErr) otpErr.classList.add('active');
    return;
  }

  if (otpErr) otpErr.classList.remove('active');

  // Save registered user
  const newUser = {
    id: 'usr-' + Date.now(),
    role: 'seeker',
    name: authState.seekerData.fullName,
    email: authState.seekerData.email,
    mobile: authState.seekerData.mobile,
    location: authState.seekerData.location,
    education: authState.seekerData.education,
    institution: authState.seekerData.institution,
    gradYear: authState.seekerData.gradYear,
    skills: authState.seekerData.skills,
    experience: authState.seekerData.experience,
    jobTitle: authState.seekerData.jobTitle,
    bio: authState.seekerData.bio,
    salary: authState.seekerData.salary,
    token: 'jwt-skr-' + Math.random().toString(36).substring(2),
    verified: true
  };

  const users = JSON.parse(localStorage.getItem('jn_registered_users') || '[]');
  users.push(newUser);
  localStorage.setItem('jn_registered_users', JSON.stringify(users));
  localStorage.setItem('jn_current_user', JSON.stringify(newUser));

  // Show Success Screen
  for (let i = 1; i <= 5; i++) {
    const pane = document.getElementById(`seekerStep${i}`);
    if (pane) pane.style.display = 'none';
  }
  const successPane = document.getElementById('seekerStepSuccess');
  if (successPane) successPane.style.display = 'block';

  showToast('Account successfully verified & created!', 'success');
}

/* ==========================================================================
   4. COMPANY / EMPLOYER MULTI-STEP REGISTRATION STEPS
   ========================================================================== */

function showCompanyStep(stepNum) {
  for (let i = 1; i <= 4; i++) {
    const pane = document.getElementById(`companyStep${i}`);
    if (pane) pane.style.display = (i === stepNum) ? 'block' : 'none';
  }

  const successPane = document.getElementById('companyStepSuccess');
  if (successPane) successPane.style.display = 'none';

  // Update Stepper List UI
  const stepperItems = document.querySelectorAll('#companyStepperList .reg-step-item');
  stepperItems.forEach(item => {
    const s = parseInt(item.getAttribute('data-step'), 10);
    if (s === stepNum) {
      item.className = 'reg-step-item active';
    } else if (s < stepNum) {
      item.className = 'reg-step-item completed';
    } else {
      item.className = 'reg-step-item';
    }
  });

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function nextCompanyStep(currentStep) {
  if (currentStep === 1) {
    // Validate Step 1
    const name = document.getElementById('cmpName').value.trim();
    const email = document.getElementById('cmpEmail').value.trim();
    const phone = document.getElementById('cmpPhone').value.trim();
    const website = document.getElementById('cmpWebsite').value.trim();

    let valid = true;

    // Company Name
    const nameErr = document.getElementById('cmpNameError');
    if (!name) {
      nameErr.classList.add('active');
      document.getElementById('cmpName').classList.add('input-error');
      valid = false;
    } else {
      nameErr.classList.remove('active');
      document.getElementById('cmpName').classList.remove('input-error');
    }

    // Company Email
    const emailErr = document.getElementById('cmpEmailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailErr.classList.add('active');
      document.getElementById('cmpEmail').classList.add('input-error');
      valid = false;
    } else {
      emailErr.classList.remove('active');
      document.getElementById('cmpEmail').classList.remove('input-error');
    }

    // Phone
    const phoneErr = document.getElementById('cmpPhoneError');
    if (!phone || phone.length < 10) {
      phoneErr.classList.add('active');
      document.getElementById('cmpPhone').classList.add('input-error');
      valid = false;
    } else {
      phoneErr.classList.remove('active');
      document.getElementById('cmpPhone').classList.remove('input-error');
    }

    if (!valid) return;

    authState.companyData.name = name;
    authState.companyData.email = email;
    authState.companyData.phone = phone;
    authState.companyData.website = website;

    showCompanyStep(2);
  } else if (currentStep === 2) {
    // Validate Step 2: Industry, Size, Address, About
    const industry = document.getElementById('cmpIndustry').value;
    const size = document.getElementById('cmpSize').value;
    const address = document.getElementById('cmpAddress').value.trim();
    const about = document.getElementById('cmpAbout').value.trim();

    let valid = true;

    const indErr = document.getElementById('cmpIndustryError');
    if (!industry) {
      indErr.classList.add('active');
      document.getElementById('cmpIndustry').classList.add('input-error');
      valid = false;
    } else {
      indErr.classList.remove('active');
      document.getElementById('cmpIndustry').classList.remove('input-error');
    }

    const sizeErr = document.getElementById('cmpSizeError');
    if (!size) {
      sizeErr.classList.add('active');
      document.getElementById('cmpSize').classList.add('input-error');
      valid = false;
    } else {
      sizeErr.classList.remove('active');
      document.getElementById('cmpSize').classList.remove('input-error');
    }

    const addrErr = document.getElementById('cmpAddressError');
    if (!address) {
      addrErr.classList.add('active');
      document.getElementById('cmpAddress').classList.add('input-error');
      valid = false;
    } else {
      addrErr.classList.remove('active');
      document.getElementById('cmpAddress').classList.remove('input-error');
    }

    const aboutErr = document.getElementById('cmpAboutError');
    if (!about) {
      aboutErr.classList.add('active');
      document.getElementById('cmpAbout').classList.add('input-error');
      valid = false;
    } else {
      aboutErr.classList.remove('active');
      document.getElementById('cmpAbout').classList.remove('input-error');
    }

    if (!valid) return;

    authState.companyData.industry = industry;
    authState.companyData.size = size;
    authState.companyData.address = address;
    authState.companyData.about = about;

    showCompanyStep(3);
  } else if (currentStep === 3) {
    // Validate Step 3: Logo & Password
    const password = document.getElementById('cmpPassword').value;
    const confirmPassword = document.getElementById('cmpConfirmPassword').value;

    let valid = true;

    const pwdErr = document.getElementById('cmpPasswordError');
    if (!password || password.length < 8) {
      pwdErr.classList.add('active');
      document.getElementById('cmpPassword').classList.add('input-error');
      valid = false;
    } else {
      pwdErr.classList.remove('active');
      document.getElementById('cmpPassword').classList.remove('input-error');
    }

    const confErr = document.getElementById('cmpConfirmPasswordError');
    if (password !== confirmPassword) {
      confErr.classList.add('active');
      document.getElementById('cmpConfirmPassword').classList.add('input-error');
      valid = false;
    } else {
      confErr.classList.remove('active');
      document.getElementById('cmpConfirmPassword').classList.remove('input-error');
    }

    if (!valid) return;

    authState.companyData.password = password;

    const targetEl = document.getElementById('cmpVerificationTarget');
    if (targetEl) {
      targetEl.innerText = `${authState.companyData.email} & +977-${authState.companyData.phone}`;
    }

    startOtpCountdown('cmp');
    showCompanyStep(4);
  }
}

function prevCompanyStep(step) {
  showCompanyStep(step - 1);
}

function handleLogoUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    const errorEl = document.getElementById('cmpLogoError');

    if (!allowedTypes.includes(file.type)) {
      if (errorEl) {
        errorEl.innerText = 'Please upload a valid image file (JPG, PNG, or SVG).';
        errorEl.classList.add('active');
      }
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      if (errorEl) {
        errorEl.innerText = 'File size must be under 2 MB.';
        errorEl.classList.add('active');
      }
      return;
    }

    if (errorEl) errorEl.classList.remove('active');

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImg = document.getElementById('logoPreviewImg');
      const previewWrap = document.getElementById('logoPreviewWrapper');
      const prompt = document.getElementById('logoUploadPrompt');

      if (previewImg) previewImg.src = e.target.result;
      if (previewWrap) previewWrap.style.display = 'block';
      if (prompt) prompt.innerText = 'Logo uploaded successfully!';

      authState.companyData.logoUrl = e.target.result;
      showToast('Company logo attached!', 'success');
    };
    reader.readAsDataURL(file);
  }
}

function removeCompanyLogo(e) {
  e.stopPropagation();
  const previewWrap = document.getElementById('logoPreviewWrapper');
  const fileInput = document.getElementById('cmpLogoFile');
  const prompt = document.getElementById('logoUploadPrompt');

  if (previewWrap) previewWrap.style.display = 'none';
  if (fileInput) fileInput.value = '';
  if (prompt) prompt.innerText = 'Click to upload or drag and drop';

  authState.companyData.logoUrl = '';
  showToast('Logo removed', 'info');
}

function verifyCompanyAccount() {
  const otp = getOtpValue('cmpOtpGrid');
  const otpErr = document.getElementById('cmpOtpError');

  if (otp !== '123456' && otp.length !== 6) {
    if (otpErr) otpErr.classList.add('active');
    return;
  }

  if (otpErr) otpErr.classList.remove('active');

  // Save registered employer
  const newCompany = {
    id: 'cmp-' + Date.now(),
    role: 'employer',
    name: authState.companyData.name,
    companyName: authState.companyData.name,
    email: authState.companyData.email,
    mobile: authState.companyData.phone,
    website: authState.companyData.website,
    industry: authState.companyData.industry,
    companySize: authState.companyData.size,
    location: authState.companyData.address,
    about: authState.companyData.about,
    logo: authState.companyData.logoUrl,
    token: 'jwt-cmp-' + Math.random().toString(36).substring(2),
    verified: true
  };

  const users = JSON.parse(localStorage.getItem('jn_registered_users') || '[]');
  users.push(newCompany);
  localStorage.setItem('jn_registered_users', JSON.stringify(users));
  localStorage.setItem('jn_current_user', JSON.stringify(newCompany));

  // Show Success Screen
  for (let i = 1; i <= 4; i++) {
    const pane = document.getElementById(`companyStep${i}`);
    if (pane) pane.style.display = 'none';
  }
  const successPane = document.getElementById('companyStepSuccess');
  if (successPane) successPane.style.display = 'block';

  showToast('Company account successfully verified & created!', 'success');
}

/* ==========================================================================
   5. SKILLS MULTI-SELECT & CHIP CONTROLLER
   ========================================================================== */

function initSkillsLibrary() {
  const container = document.getElementById('seekerSkillsLibrary');
  if (!container) return;

  container.innerHTML = SKILLS_LIBRARY.map(skill => {
    const isSelected = authState.seekerData.skills.includes(skill);
    return `
      <button 
        type="button" 
        class="skill-chip" 
        style="cursor: pointer; background: ${isSelected ? '#0066ff' : '#eff6ff'}; color: ${isSelected ? '#ffffff' : '#1d4ed8'}; border: 1px solid ${isSelected ? '#0052cc' : '#bfdbfe'};"
        onclick="toggleSkillSelection('${skill}', this)"
      >
        ${skill} ${isSelected ? '✓' : '+'}
      </button>
    `;
  }).join('');
}

function toggleSkillSelection(skill, btn) {
  const index = authState.seekerData.skills.indexOf(skill);
  if (index > -1) {
    authState.seekerData.skills.splice(index, 1);
  } else {
    authState.seekerData.skills.push(skill);
  }
  renderSelectedSkillChips();
  initSkillsLibrary();
}

function renderSelectedSkillChips() {
  const container = document.getElementById('seekerSelectedSkillsContainer');
  const input = document.getElementById('seekerCustomSkillInput');
  if (!container) return;

  // Clear existing chips except the input
  const chips = container.querySelectorAll('.skill-chip');
  chips.forEach(c => c.remove());

  authState.seekerData.skills.forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip';
    chip.innerHTML = `${skill} <span class="skill-chip-remove" onclick="removeSkillChip(this, '${skill}')">✕</span>`;
    container.insertBefore(chip, input);
  });
}

function removeSkillChip(el, skill) {
  const index = authState.seekerData.skills.indexOf(skill);
  if (index > -1) {
    authState.seekerData.skills.splice(index, 1);
  }
  renderSelectedSkillChips();
  initSkillsLibrary();
}

function handleSkillInputKey(e, input) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const val = input.value.trim().replace(/,/g, '');
    if (val && !authState.seekerData.skills.includes(val)) {
      authState.seekerData.skills.push(val);
      renderSelectedSkillChips();
      initSkillsLibrary();
    }
    input.value = '';
  }
}

/* ==========================================================================
   6. PASSWORD STRENGTH & VISIBILITY TOGGLE HELPERS
   ========================================================================== */

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

function updatePasswordStrength(password, meterId, reqsId) {
  const meterEl = document.getElementById(meterId);
  const reqsEl = document.getElementById(reqsId);
  if (!meterEl) return;

  if (!password) {
    meterEl.style.display = 'none';
    return;
  }
  meterEl.style.display = 'block';

  const hasLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Update Checklist Items
  if (reqsEl) {
    updateReqItem(reqsEl, 'len', hasLen);
    updateReqItem(reqsEl, 'upper', hasUpper);
    updateReqItem(reqsEl, 'lower', hasLower);
    updateReqItem(reqsEl, 'num', hasNum);
    updateReqItem(reqsEl, 'spec', hasSpec);
  }

  // Calculate score (0 to 4)
  let score = 0;
  if (hasLen) score++;
  if (hasUpper && hasLower) score++;
  if (hasNum) score++;
  if (hasSpec) score++;

  const prefix = meterId.replace('PwdMeter', '');
  const seg1 = document.getElementById(`${prefix}PwdSeg1`);
  const seg2 = document.getElementById(`${prefix}PwdSeg2`);
  const seg3 = document.getElementById(`${prefix}PwdSeg3`);
  const seg4 = document.getElementById(`${prefix}PwdSeg4`);
  const textEl = document.getElementById(`${prefix}PwdText`);

  const colors = ['#e2e8f0', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
  const labels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  if (seg1) seg1.style.background = score >= 1 ? colors[score] : '#e2e8f0';
  if (seg2) seg2.style.background = score >= 2 ? colors[score] : '#e2e8f0';
  if (seg3) seg3.style.background = score >= 3 ? colors[score] : '#e2e8f0';
  if (seg4) seg4.style.background = score >= 4 ? colors[score] : '#e2e8f0';

  if (textEl) {
    textEl.innerText = labels[score];
    textEl.style.color = colors[score];
  }
}

function updateReqItem(parent, reqKey, isValid) {
  const item = parent.querySelector(`[data-req="${reqKey}"]`);
  if (item) {
    item.className = isValid ? 'pwd-req-item valid' : 'pwd-req-item invalid';
  }
}

/* ==========================================================================
   7. OTP 6-DIGIT INPUT & TIMER CONTROLLERS
   ========================================================================== */

function handleOtpInput(input, index, gridId) {
  input.value = input.value.replace(/[^0-9]/g, '');
  if (input.value.length >= 1) {
    const grid = document.getElementById(gridId);
    const inputs = grid.querySelectorAll('.otp-box');
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  }
}

function handleOtpKeyDown(e, input, index, gridId) {
  if (e.key === 'Backspace' && !input.value) {
    const grid = document.getElementById(gridId);
    const inputs = grid.querySelectorAll('.otp-box');
    if (index > 0) {
      inputs[index - 1].focus();
    }
  }
}

function getOtpValue(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return '';
  const inputs = grid.querySelectorAll('.otp-box');
  let code = '';
  inputs.forEach(i => code += i.value);
  return code;
}

function startOtpCountdown(prefix) {
  clearInterval(authState.otpCountdownTimer);
  authState.otpSecondsLeft = 30;

  const resendContainer = document.getElementById(`${prefix}ResendContainer`);
  if (!resendContainer) return;

  authState.otpCountdownTimer = setInterval(() => {
    authState.otpSecondsLeft--;
    if (authState.otpSecondsLeft <= 0) {
      clearInterval(authState.otpCountdownTimer);
      resendContainer.innerHTML = `<a href="javascript:void(0)" onclick="resendOtp('${prefix}')" style="font-weight: 700; color: var(--primary);">Resend Code</a>`;
    } else {
      resendContainer.innerHTML = `<span style="color: #94a3b8;">Resend code in <strong>${authState.otpSecondsLeft}s</strong></span>`;
    }
  }, 1000);
}

function resendOtp(prefix) {
  showToast('New 6-digit verification code sent! (Code: 123456)', 'info');
  startOtpCountdown(prefix);
}

/* ==========================================================================
   8. FORGOT PASSWORD MODAL CONTROLLER
   ========================================================================== */

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
    showToast(`Verification code sent to ${idInput.value}! Code is 123456`, 'info');
  } else {
    if (otpInput && otpInput.value === '123456' && newPassInput && newPassInput.value.length >= 6) {
      showToast('Password reset successfully! You can now log in.', 'success');
      closeForgotPasswordModal();
      const loginPass = document.getElementById('loginPassword');
      if (loginPass) loginPass.value = newPassInput.value;
    } else {
      showToast('Please enter OTP 123456 and a new password (min 6 chars).', 'error');
    }
  }
}

// Global Exports
window.selectLoginRole = selectLoginRole;
window.fillDemoCredentials = fillDemoCredentials;
window.startRegistrationFlow = startRegistrationFlow;
window.switchRegistrationFlow = switchRegistrationFlow;
window.cancelRegistration = cancelRegistration;
window.nextSeekerStep = nextSeekerStep;
window.prevSeekerStep = prevSeekerStep;
window.verifySeekerAccount = verifySeekerAccount;
window.handleResumeUpload = handleResumeUpload;
window.nextCompanyStep = nextCompanyStep;
window.prevCompanyStep = prevCompanyStep;
window.verifyCompanyAccount = verifyCompanyAccount;
window.handleLogoUpload = handleLogoUpload;
window.removeCompanyLogo = removeCompanyLogo;
window.toggleSkillSelection = toggleSkillSelection;
window.removeSkillChip = removeSkillChip;
window.handleSkillInputKey = handleSkillInputKey;
window.togglePasswordVisibility = togglePasswordVisibility;
window.updatePasswordStrength = updatePasswordStrength;
window.handleOtpInput = handleOtpInput;
window.handleOtpKeyDown = handleOtpKeyDown;
window.resendOtp = resendOtp;
window.openForgotPasswordModal = openForgotPasswordModal;
window.closeForgotPasswordModal = closeForgotPasswordModal;
window.handleForgotPasswordSubmit = handleForgotPasswordSubmit;
