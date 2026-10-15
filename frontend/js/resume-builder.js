/**
 * JOB NEPAL — ADVANCED RESUME BUILDER ENGINE
 * Multi-Template Live A4 Preview, Dynamic Sub-sections, Real-time Auto-Sync,
 * Resume Version System (My Resumes), Multi-Format Export (PDF, DOCX, TXT)
 */

// Default Presets matching Requirement 15
const DEFAULT_RESUME_VERSIONS = [
  {
    id: 'res-soft-dev',
    title: 'Software Developer CV',
    template: 'Modern',
    fullName: 'Full Name',
    professionalTitle: 'Professional Title',
    email: '[EMAIL_ADDRESS]',
    phone: '1234567890',
    location: 'Kathmandu',
    links: [
      { type: 'LinkedIn', url: '' },
      { type: 'GitHub', url: '' },
      { type: 'Portfolio', url: '' }
    ],
    objective: '',
    experience: [
      {
        id: 'exp-1',
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: true,
        responsibilities: ''
      },
      {
        id: 'exp-2',
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        responsibilities: ''
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor in Computer Engineering',
        institution: 'Pulchowk Campus, Tribhuvan University (IOE)',
        location: 'Lalitpur, Nepal',
        startYear: '2018',
        gradYear: '2022',
        gpa: '82.4% (Distinction)'
      }
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'Go', 'Git', 'GitHub', 'SQL', 'PostgreSQL', 'Docker', 'REST APIs'],
    languages: [
      { name: 'Nepali', proficiency: 'Native' },
      { name: 'English', proficiency: 'Professional' },
      { name: 'Hindi', proficiency: 'Conversational' }
    ],
    references: [
      {
        id: 'ref-1',
        name: 'Er. Prakash Sharma',
        position: 'Engineering Director',
        company: 'ABC Technology Pvt. Ltd.',
        email: 'prakash.sharma@abctech.com.np',
        phone: '+977 9851098765'
      }
    ],
    availableUponRequest: false,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'res-data-entry',
    title: 'Data Entry CV',
    template: 'Minimal',
    fullName: 'Sandeep Adhikari',
    professionalTitle: 'Lead Data Entry & Documentation Specialist',
    email: 'sandeep.adhikari@example.com',
    phone: '+977 9841234567',
    location: 'Pokhara',
    links: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/sandeep-adhikari' }
    ],
    objective: 'Detail-oriented and efficient Data Entry Specialist with 3+ years of expertise managing high-volume data operations, digitizing paper archives, database verification, and advanced Microsoft Excel reporting with 99.8% precision.',
    experience: [
      {
        id: 'exp-1',
        role: 'Data Entry & Records Officer',
        company: 'Pokhara Logistics & Trading Pvt. Ltd.',
        location: 'Pokhara, Nepal',
        startDate: 'Mar 2022',
        endDate: 'Present',
        isCurrent: true,
        responsibilities: '• Entered and audited over 1,500 inventory and invoice records daily in ERP database.\n• Created automated Excel Pivot summaries and VLOOKUP reports for warehouse management.\n• Ensured 100% data confidentiality and zero data loss over 2 consecutive fiscal audits.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Computer Application (BCA)',
        institution: 'Prithvi Narayan Campus, Pokhara',
        location: 'Pokhara, Nepal',
        startYear: '2017',
        gradYear: '2021',
        gpa: '3.62 GPA'
      }
    ],
    skills: ['MS Excel (Advanced)', 'MS Word', 'Data Verification', 'ERP Software', 'Typing 65 WPM', 'Google Sheets', 'Database Cleaning', 'Record Keeping'],
    languages: [
      { name: 'Nepali', proficiency: 'Native' },
      { name: 'English', proficiency: 'Professional' }
    ],
    references: [],
    availableUponRequest: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'res-java-dev',
    title: 'Java Developer CV',
    template: 'Professional',
    fullName: 'Sandeep Adhikari',
    professionalTitle: 'Senior Java & Spring Boot Microservices Architect',
    email: 'sandeep.adhikari@example.com',
    phone: '+977 9841234567',
    location: 'Kathmandu',
    links: [
      { type: 'GitHub', url: 'https://github.com/sandeep-np' },
      { type: 'LinkedIn', url: 'https://linkedin.com/in/sandeep-adhikari' }
    ],
    objective: 'Senior Java Developer with 5+ years building enterprise fintech backends, Spring Boot microservices, high-throughput message queues with Kafka, and containerized cloud services in banking and remittance sectors.',
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Java Engineer',
        company: 'Nepal FinTech Innovations',
        location: 'Kathmandu, Nepal',
        startDate: 'Jan 2023',
        endDate: 'Present',
        isCurrent: true,
        responsibilities: '• Engineered core banking transaction processing services using Java 17, Spring Boot, and PostgreSQL.\n• Integrated Kafka event streaming for real-time fraud detection and instant transaction alerts.\n• Designed resilient circuit breakers with Resilience4j achieving 99.98% uptime.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor in Computer Engineering',
        institution: 'Pulchowk Campus, Tribhuvan University (IOE)',
        location: 'Lalitpur, Nepal',
        startYear: '2017',
        gradYear: '2021',
        gpa: '80.5%'
      }
    ],
    skills: ['Java 17/21', 'Spring Boot', 'Spring Cloud', 'PostgreSQL', 'Kafka', 'Redis', 'Docker', 'Kubernetes', 'JUnit / Mockito', 'Maven', 'Microservices'],
    languages: [
      { name: 'Nepali', proficiency: 'Native' },
      { name: 'English', proficiency: 'Professional' }
    ],
    references: [],
    availableUponRequest: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'res-marketing',
    title: 'Marketing CV',
    template: 'Creative',
    fullName: 'Sandeep Adhikari',
    professionalTitle: 'Digital Marketing & Growth Strategist',
    email: 'sandeep.adhikari@example.com',
    phone: '+977 9841234567',
    location: 'Lalitpur',
    links: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/sandeep-adhikari' },
      { type: 'Portfolio', url: 'https://sandeepgrowth.com' }
    ],
    objective: 'Strategic Digital Marketer with 4+ years driving customer acquisition, paid ad performance, SEO organic reach, and brand storytelling across eCommerce and consumer SaaS brands in Nepal and South Asia.',
    experience: [
      {
        id: 'exp-1',
        role: 'Lead Growth & Performance Marketer',
        company: 'BrandPulse Media Nepal',
        location: 'Lalitpur, Nepal',
        startDate: 'Apr 2022',
        endDate: 'Present',
        isCurrent: true,
        responsibilities: '• Scaled monthly inbound qualified leads by 180% via targeted Meta Ads, Google Search, and localized SEO.\n• Managed $60,000+ annual digital ad spend generating an average 4.8x Return on Ad Spend (ROAS).\n• Created viral content campaigns on TikTok and Instagram garnering 2.5M+ organic impressions.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'BBA / Management',
        institution: 'Kathmandu University School of Management (KUSOM)',
        location: 'Lalitpur, Nepal',
        startYear: '2018',
        gradYear: '2022',
        gpa: '3.75 GPA'
      }
    ],
    skills: ['Performance Marketing', 'Google Ads', 'Meta Ads', 'SEO & SEM', 'Google Analytics 4', 'Content Strategy', 'Copywriting', 'Canva', 'Email Marketing'],
    languages: [
      { name: 'Nepali', proficiency: 'Native' },
      { name: 'English', proficiency: 'Fluent' },
      { name: 'Hindi', proficiency: 'Fluent' }
    ],
    references: [],
    availableUponRequest: true,
    updatedAt: new Date().toISOString()
  }
];

// State
let allResumes = [];
let activeResumeId = '';
let resumeData = {};
let currentTemplate = 'Modern';
let previewZoomLevel = 100;

document.addEventListener('DOMContentLoaded', () => {
  initResumeBuilderApp();
});

function initResumeBuilderApp() {
  loadResumesFromStorage();
  bindFormInputs();
  bindObjectiveCounter();
  renderSkillInput();
  renderDynamicForms();
  renderResumePreview();
  updateCompletionIndicator();
  updateActiveResumeBadges();
  initMobileView();
}

/**
 * Storage & Version Management
 */
function loadResumesFromStorage() {
  const stored = localStorage.getItem('jobnepal_resumes_v2');
  if (stored) {
    try {
      allResumes = JSON.parse(stored);
    } catch (e) {
      allResumes = JSON.parse(JSON.stringify(DEFAULT_RESUME_VERSIONS));
    }
  } else {
    allResumes = JSON.parse(JSON.stringify(DEFAULT_RESUME_VERSIONS));
    saveResumesToStorage();
  }

  const activeId = localStorage.getItem('jobnepal_active_resume_id');
  const matched = allResumes.find(r => r.id === activeId);
  if (matched) {
    activeResumeId = matched.id;
    resumeData = matched;
  } else {
    activeResumeId = allResumes[0].id;
    resumeData = allResumes[0];
  }
  currentTemplate = resumeData.template || 'Modern';
}

function saveResumesToStorage() {
  localStorage.setItem('jobnepal_resumes_v2', JSON.stringify(allResumes));
  localStorage.setItem('jobnepal_active_resume_id', activeResumeId);
}

function switchResumeVersion(resumeId) {
  const found = allResumes.find(r => r.id === resumeId);
  if (!found) return;

  activeResumeId = found.id;
  resumeData = found;
  currentTemplate = found.template || 'Modern';
  saveResumesToStorage();

  populateFormFromState();
  renderDynamicForms();
  selectTemplate(currentTemplate, null, false);
  renderResumePreview();
  updateCompletionIndicator();
  updateActiveResumeBadges();
  closeModal('resumesManagerModal');

  if (typeof showToast === 'function') {
    showToast(`Switched to "${found.title}"`, 'info');
  }
}

function createNewResume() {
  const title = prompt('Enter a title for your new resume:', 'New Career Resume');
  if (!title || !title.trim()) return;

  const newId = 'res-' + Date.now();
  const newResume = {
    id: newId,
    title: title.trim(),
    template: 'Modern',
    fullName: resumeData.fullName || 'Your Full Name',
    professionalTitle: 'Professional Title',
    email: resumeData.email || 'your.email@example.com',
    phone: resumeData.phone || '+977 98XXXXXXXX',
    location: 'Kathmandu',
    links: [{ type: 'LinkedIn', url: '' }],
    objective: 'Dedicated professional seeking opportunities to contribute to high-impact projects.',
    experience: [
      {
        id: 'exp-' + Date.now(),
        role: 'Job Title',
        company: 'Company Name',
        location: 'Kathmandu, Nepal',
        startDate: '2023',
        endDate: 'Present',
        isCurrent: true,
        responsibilities: '• Key achievement or daily responsibility.'
      }
    ],
    education: [
      {
        id: 'edu-' + Date.now(),
        degree: 'Bachelor in Computer Engineering',
        institution: 'Tribhuvan University',
        location: 'Kathmandu, Nepal',
        startYear: '2019',
        gradYear: '2023',
        gpa: ''
      }
    ],
    skills: ['Communication', 'Problem Solving', 'Project Management'],
    languages: [{ name: 'Nepali', proficiency: 'Native' }, { name: 'English', proficiency: 'Professional' }],
    references: [],
    availableUponRequest: true,
    updatedAt: new Date().toISOString()
  };

  allResumes.push(newResume);
  switchResumeVersion(newId);
  saveResumesToStorage();
  renderResumesManagerList();
}

function duplicateCurrentResume() {
  const copyTitle = prompt('Title for duplicated resume:', `${resumeData.title} (Copy)`);
  if (!copyTitle || !copyTitle.trim()) return;

  const newId = 'res-' + Date.now();
  const cloned = JSON.parse(JSON.stringify(resumeData));
  cloned.id = newId;
  cloned.title = copyTitle.trim();
  cloned.updatedAt = new Date().toISOString();

  allResumes.push(cloned);
  switchResumeVersion(newId);
  saveResumesToStorage();
  renderResumesManagerList();
  if (typeof showToast === 'function') {
    showToast(`Duplicated into "${copyTitle}"!`, 'success');
  }
}

function renameResume(id) {
  const target = allResumes.find(r => r.id === id);
  if (!target) return;
  const newTitle = prompt('Rename resume title:', target.title);
  if (newTitle && newTitle.trim()) {
    target.title = newTitle.trim();
    if (activeResumeId === id) {
      resumeData.title = newTitle.trim();
      updateActiveResumeBadges();
    }
    saveResumesToStorage();
    renderResumesManagerList();
    if (typeof showToast === 'function') {
      showToast('Resume renamed successfully', 'info');
    }
  }
}

function deleteResume(id) {
  if (allResumes.length <= 1) {
    alert('You must keep at least one resume in your account.');
    return;
  }
  const target = allResumes.find(r => r.id === id);
  if (!confirm(`Are you sure you want to delete "${target ? target.title : 'this resume'}"?`)) return;

  allResumes = allResumes.filter(r => r.id !== id);
  if (activeResumeId === id) {
    activeResumeId = allResumes[0].id;
    resumeData = allResumes[0];
    currentTemplate = resumeData.template || 'Modern';
    populateFormFromState();
    renderDynamicForms();
    selectTemplate(currentTemplate, null, false);
  }
  saveResumesToStorage();
  renderResumesManagerList();
  renderResumePreview();
  updateCompletionIndicator();
  updateActiveResumeBadges();
  if (typeof showToast === 'function') {
    showToast('Resume deleted', 'warning');
  }
}

function updateActiveResumeBadges() {
  const label = document.getElementById('currentResumeTitleBadge');
  if (label) {
    label.textContent = resumeData.title || 'My Resume';
  }
  const tBadge = document.getElementById('selectedTemplateBadge');
  if (tBadge) {
    tBadge.textContent = `Active Template: ${currentTemplate}`;
  }
}

/**
 * Form Binding & Real-Time Sync
 */
function bindFormInputs() {
  populateFormFromState();

  const form = document.getElementById('resumeForm');
  if (!form) return;

  form.addEventListener('input', (e) => {
    triggerAutoSync();
  });

  form.addEventListener('change', (e) => {
    triggerAutoSync();
  });
}

function triggerAutoSync() {
  showSyncBadge('Auto-Syncing ✓', 'syncing');
  syncFormToState();
  renderResumePreview();
  updateCompletionIndicator();

  // Debounced auto-save status transition
  clearTimeout(window._syncDebounce);
  window._syncDebounce = setTimeout(() => {
    resumeData.updatedAt = new Date().toISOString();
    saveResumesToStorage();
    showSyncBadge('Auto-Saved ✓', 'saved');
  }, 600);
}

function showSyncBadge(text, stateClass) {
  const badge = document.getElementById('autoSyncStatusBadge');
  if (!badge) return;
  badge.textContent = text;
  badge.className = `rb-sync-status-badge ${stateClass}`;
}

function syncFormToState() {
  const fName = document.getElementById('resFullName');
  if (fName) resumeData.fullName = fName.value.trim();

  const title = document.getElementById('resTitle');
  if (title) resumeData.professionalTitle = title.value.trim();

  const email = document.getElementById('resEmail');
  if (email) resumeData.email = email.value.trim();

  const phone = document.getElementById('resPhone');
  if (phone) resumeData.phone = phone.value.trim();

  const loc = document.getElementById('resLocation');
  if (loc) resumeData.location = loc.value;

  const obj = document.getElementById('resObjective');
  if (obj) {
    resumeData.objective = obj.value;
    updateObjectiveCounter(obj.value.length);
  }
}

function populateFormFromState() {
  if (document.getElementById('resFullName')) document.getElementById('resFullName').value = resumeData.fullName || '';
  if (document.getElementById('resTitle')) document.getElementById('resTitle').value = resumeData.professionalTitle || '';
  if (document.getElementById('resEmail')) document.getElementById('resEmail').value = resumeData.email || '';
  if (document.getElementById('resPhone')) document.getElementById('resPhone').value = resumeData.phone || '';
  if (document.getElementById('resLocation')) document.getElementById('resLocation').value = resumeData.location || 'Kathmandu';

  const obj = document.getElementById('resObjective');
  if (obj) {
    obj.value = resumeData.objective || '';
    updateObjectiveCounter((resumeData.objective || '').length);
  }
}

function bindObjectiveCounter() {
  const obj = document.getElementById('resObjective');
  if (!obj) return;
  obj.addEventListener('input', () => {
    updateObjectiveCounter(obj.value.length);
  });
}

function updateObjectiveCounter(len) {
  const counter = document.getElementById('objectiveCharCount');
  if (!counter) return;
  counter.textContent = `${len} / 500`;
  if (len > 500) {
    counter.style.color = '#dc2626';
    counter.style.fontWeight = '800';
  } else if (len > 400) {
    counter.style.color = '#d97706';
    counter.style.fontWeight = '700';
  } else {
    counter.style.color = '#64748b';
    counter.style.fontWeight = '500';
  }
}

function applyObjectiveTemplate(type) {
  const templates = {
    software: "Results-driven Software Engineer with 4+ years of hands-on experience building high-scale distributed systems, RESTful microservices, and modern web applications in Nepal and international markets.",
    management: "Proactive Management Professional with extensive background in operational efficiency, team leadership, stakeholder relations, and financial oversight across corporate and banking institutions in Nepal.",
    fresh: "Enthusiastic and motivated Computer Science graduate with strong foundational knowledge in modern software engineering, data structures, algorithms, and agile team collaboration seeking an entry-level development role."
  };
  const text = templates[type];
  if (text) {
    const el = document.getElementById('resObjective');
    if (el) {
      el.value = text;
      resumeData.objective = text;
      triggerAutoSync();
    }
  }
}

/**
 * Dynamic Sub-Sections: Links, Experience, Education, Skills, Languages, References
 */
function renderDynamicForms() {
  renderLinksForm();
  renderExperienceForm();
  renderEducationForm();
  renderSkillTags();
  renderLanguageForm();
  renderReferenceForm();
}

// 1. ONLINE PROFILES / LINKS
function renderLinksForm() {
  const container = document.getElementById('linksContainer');
  if (!container) return;

  if (!resumeData.links || !resumeData.links.length) {
    resumeData.links = [{ type: 'LinkedIn', url: '' }];
  }

  container.innerHTML = resumeData.links.map((link, idx) => `
    <div class="rb-dynamic-row" style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center;">
      <select class="form-control" style="width: 140px; flex-shrink: 0;" onchange="updateLinkType(${idx}, this.value)">
        <option value="LinkedIn" ${link.type === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
        <option value="GitHub" ${link.type === 'GitHub' ? 'selected' : ''}>GitHub</option>
        <option value="Portfolio" ${link.type === 'Portfolio' ? 'selected' : ''}>Portfolio</option>
        <option value="Website" ${link.type === 'Website' ? 'selected' : ''}>Personal Web</option>
      </select>
      <input type="url" class="form-control" placeholder="https://..." value="${escapeHtml(link.url || '')}" oninput="updateLinkUrl(${idx}, this.value)">
      <button type="button" class="btn btn-outline btn-sm" onclick="removeLink(${idx})" title="Remove Link" style="color: #dc2626; border-color: #fca5a5; padding: 6px 10px;">✕</button>
    </div>
  `).join('');
}

function addLink() {
  if (!resumeData.links) resumeData.links = [];
  resumeData.links.push({ type: 'Portfolio', url: '' });
  renderLinksForm();
  triggerAutoSync();
}

function updateLinkType(idx, val) {
  if (resumeData.links && resumeData.links[idx]) {
    resumeData.links[idx].type = val;
    triggerAutoSync();
  }
}

function updateLinkUrl(idx, val) {
  if (resumeData.links && resumeData.links[idx]) {
    resumeData.links[idx].url = val.trim();
    triggerAutoSync();
  }
}

function removeLink(idx) {
  if (resumeData.links && resumeData.links.length > 0) {
    resumeData.links.splice(idx, 1);
    renderLinksForm();
    triggerAutoSync();
  }
}

// 2. PRIMARY WORK EXPERIENCE
function renderExperienceForm() {
  const container = document.getElementById('experienceContainer');
  if (!container) return;

  if (!resumeData.experience) resumeData.experience = [];

  if (resumeData.experience.length === 0) {
    container.innerHTML = `
      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 8px; padding: 1.25rem; text-align: center; color: #64748b;">
        <div style="font-size: 1.5rem; margin-bottom: 4px;">💼</div>
        <p style="font-size: 0.88rem; margin-bottom: 8px;">No work experiences added yet.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="addExperience()">+ Add First Experience</button>
      </div>
    `;
    return;
  }

  container.innerHTML = resumeData.experience.map((exp, idx) => `
    <div class="rb-item-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 6px;">
        <span style="font-weight: 700; font-size: 0.9rem; color: var(--primary);">#${idx + 1} Experience: ${escapeHtml(exp.role || 'New Role')}</span>
        <button type="button" class="btn btn-outline btn-sm" onclick="removeExperience(${idx})" style="color: #dc2626; border-color: #fca5a5; padding: 2px 8px; font-size: 0.75rem;">Delete</button>
      </div>

      <div class="form-row-2col" style="margin-bottom: 8px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Job Title *</label>
          <input type="text" class="form-control" placeholder="e.g. Software Developer" value="${escapeHtml(exp.role || '')}" oninput="updateExperienceField(${idx}, 'role', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Company Name *</label>
          <input type="text" class="form-control" placeholder="e.g. ABC Technology Pvt. Ltd." value="${escapeHtml(exp.company || '')}" oninput="updateExperienceField(${idx}, 'company', this.value)">
        </div>
      </div>

      <div class="form-row-2col" style="margin-bottom: 8px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Location</label>
          <input type="text" class="form-control" placeholder="e.g. Kathmandu, Nepal" value="${escapeHtml(exp.location || '')}" oninput="updateExperienceField(${idx}, 'location', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Start & End Dates</label>
          <div style="display: flex; gap: 6px;">
            <input type="text" class="form-control" placeholder="Jan 2024" value="${escapeHtml(exp.startDate || '')}" oninput="updateExperienceField(${idx}, 'startDate', this.value)" style="width: 50%;">
            <input type="text" class="form-control" placeholder="Present" value="${escapeHtml(exp.endDate || '')}" ${exp.isCurrent ? 'disabled' : ''} oninput="updateExperienceField(${idx}, 'endDate', this.value)" id="expEnd_${idx}" style="width: 50%;">
          </div>
        </div>
      </div>

      <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" id="currPos_${idx}" ${exp.isCurrent ? 'checked' : ''} onchange="toggleCurrentPosition(${idx}, this.checked)">
        <label for="currPos_${idx}" style="font-size: 0.82rem; font-weight: 600; color: #475569; cursor: pointer;">I currently work in this role</label>
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.8rem;">Responsibilities & Key Achievements</label>
        <textarea class="form-control" rows="3" placeholder="• Developed web applications\n• Built REST APIs\n• Worked with Python and JavaScript" oninput="updateExperienceField(${idx}, 'responsibilities', this.value)">${escapeHtml(exp.responsibilities || '')}</textarea>
      </div>
    </div>
  `).join('');
}

function addExperience() {
  if (!resumeData.experience) resumeData.experience = [];
  resumeData.experience.push({
    id: 'exp-' + Date.now(),
    role: '',
    company: '',
    location: 'Kathmandu, Nepal',
    startDate: '',
    endDate: 'Present',
    isCurrent: true,
    responsibilities: '• '
  });
  renderExperienceForm();
  triggerAutoSync();
}

function updateExperienceField(idx, field, val) {
  if (resumeData.experience && resumeData.experience[idx]) {
    resumeData.experience[idx][field] = val;
    triggerAutoSync();
  }
}

function toggleCurrentPosition(idx, isChecked) {
  if (resumeData.experience && resumeData.experience[idx]) {
    resumeData.experience[idx].isCurrent = isChecked;
    if (isChecked) {
      resumeData.experience[idx].endDate = 'Present';
    }
    renderExperienceForm();
    triggerAutoSync();
  }
}

function removeExperience(idx) {
  if (resumeData.experience) {
    resumeData.experience.splice(idx, 1);
    renderExperienceForm();
    triggerAutoSync();
  }
}

// 3. EDUCATION & DEGREE
function renderEducationForm() {
  const container = document.getElementById('educationContainer');
  if (!container) return;

  if (!resumeData.education) resumeData.education = [];

  if (resumeData.education.length === 0) {
    container.innerHTML = `
      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 8px; padding: 1.25rem; text-align: center; color: #64748b;">
        <div style="font-size: 1.5rem; margin-bottom: 4px;">🎓</div>
        <p style="font-size: 0.88rem; margin-bottom: 8px;">No education history added yet.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="addEducation()">+ Add First Degree</button>
      </div>
    `;
    return;
  }

  container.innerHTML = resumeData.education.map((edu, idx) => `
    <div class="rb-item-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 6px;">
        <span style="font-weight: 700; font-size: 0.9rem; color: var(--primary);">#${idx + 1} Degree: ${escapeHtml(edu.degree || 'Degree')}</span>
        <button type="button" class="btn btn-outline btn-sm" onclick="removeEducation(${idx})" style="color: #dc2626; border-color: #fca5a5; padding: 2px 8px; font-size: 0.75rem;">Delete</button>
      </div>

      <div class="form-row-2col" style="margin-bottom: 8px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Degree / Field of Study *</label>
          <input type="text" list="degreeSuggestions" class="form-control" placeholder="e.g. Bachelor in Computer Engineering" value="${escapeHtml(edu.degree || '')}" oninput="updateEducationField(${idx}, 'degree', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Institution / College *</label>
          <input type="text" class="form-control" placeholder="e.g. Pulchowk Campus, TU (IOE)" value="${escapeHtml(edu.institution || '')}" oninput="updateEducationField(${idx}, 'institution', this.value)">
        </div>
      </div>

      <div class="form-row-2col" style="margin-bottom: 8px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Location</label>
          <input type="text" class="form-control" placeholder="e.g. Lalitpur, Nepal" value="${escapeHtml(edu.location || '')}" oninput="updateEducationField(${idx}, 'location', this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.8rem;">Start & Graduation Year</label>
          <div style="display: flex; gap: 6px;">
            <input type="text" class="form-control" placeholder="2018" value="${escapeHtml(edu.startYear || '')}" oninput="updateEducationField(${idx}, 'startYear', this.value)" style="width: 50%;">
            <input type="text" class="form-control" placeholder="2022" value="${escapeHtml(edu.gradYear || '')}" oninput="updateEducationField(${idx}, 'gradYear', this.value)" style="width: 50%;">
          </div>
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.8rem;">GPA / Percentage / Honors (Optional)</label>
        <input type="text" class="form-control" placeholder="e.g. 82.4% Distinction or 3.8 GPA" value="${escapeHtml(edu.gpa || '')}" oninput="updateEducationField(${idx}, 'gpa', this.value)">
      </div>
    </div>
  `).join('');
}

function addEducation() {
  if (!resumeData.education) resumeData.education = [];
  resumeData.education.push({
    id: 'edu-' + Date.now(),
    degree: '',
    institution: '',
    location: 'Kathmandu, Nepal',
    startYear: '',
    gradYear: '',
    gpa: ''
  });
  renderEducationForm();
  triggerAutoSync();
}

function updateEducationField(idx, field, val) {
  if (resumeData.education && resumeData.education[idx]) {
    resumeData.education[idx][field] = val;
    triggerAutoSync();
  }
}

function removeEducation(idx) {
  if (resumeData.education) {
    resumeData.education.splice(idx, 1);
    renderEducationForm();
    triggerAutoSync();
  }
}

// 4. TECHNICAL SKILLS & TOOLS TAGS
function renderSkillInput() {
  const input = document.getElementById('skillTagInput');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkillFromInput(input.value);
      input.value = '';
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.trim()) {
      addSkillFromInput(input.value);
      input.value = '';
    }
  });
}

function addSkillFromInput(rawVal) {
  const items = rawVal.split(',').map(s => s.trim()).filter(Boolean);
  if (!resumeData.skills) resumeData.skills = [];
  items.forEach(item => {
    if (!resumeData.skills.includes(item)) {
      resumeData.skills.push(item);
    }
  });
  renderSkillTags();
  triggerAutoSync();
}

function addSuggestedSkill(skill) {
  if (!resumeData.skills) resumeData.skills = [];
  if (!resumeData.skills.includes(skill)) {
    resumeData.skills.push(skill);
    renderSkillTags();
    triggerAutoSync();
  }
}

function removeSkill(idx) {
  if (resumeData.skills) {
    resumeData.skills.splice(idx, 1);
    renderSkillTags();
    triggerAutoSync();
  }
}

function renderSkillTags() {
  const container = document.getElementById('skillTagsList');
  if (!container) return;

  if (!resumeData.skills || resumeData.skills.length === 0) {
    container.innerHTML = '<span style="font-size: 0.8rem; color: #94a3b8; font-style: italic;">No skills added yet. Type above and press Enter or comma.</span>';
    return;
  }

  container.innerHTML = resumeData.skills.map((skill, idx) => `
    <span class="rb-skill-tag" style="display: inline-flex; align-items: center; gap: 6px; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 4px 10px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;">
      ${escapeHtml(skill)}
      <button type="button" onclick="removeSkill(${idx})" style="background: none; border: none; cursor: pointer; color: #0284c7; font-weight: bold; font-size: 0.85rem; line-height: 1; padding: 0;" title="Remove ${escapeHtml(skill)}">×</button>
    </span>
  `).join('');
}

// 5. LANGUAGES
function renderLanguageForm() {
  const container = document.getElementById('languagesContainer');
  if (!container) return;

  if (!resumeData.languages) resumeData.languages = [];

  if (resumeData.languages.length === 0) {
    container.innerHTML = `
      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 8px; padding: 1rem; text-align: center; color: #64748b;">
        <p style="font-size: 0.85rem; margin-bottom: 6px;">No languages added.</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="addLanguage()">+ Add Language</button>
      </div>
    `;
    return;
  }

  container.innerHTML = resumeData.languages.map((lang, idx) => `
    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
      <input type="text" class="form-control" placeholder="Language (e.g. Nepali)" value="${escapeHtml(lang.name || '')}" oninput="updateLanguageName(${idx}, this.value)" style="flex: 1;">
      <select class="form-control" style="width: 150px; flex-shrink: 0;" onchange="updateLanguageProficiency(${idx}, this.value)">
        <option value="Native" ${lang.proficiency === 'Native' ? 'selected' : ''}>Native</option>
        <option value="Fluent" ${lang.proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
        <option value="Professional" ${lang.proficiency === 'Professional' ? 'selected' : ''}>Professional</option>
        <option value="Intermediate" ${lang.proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
        <option value="Basic" ${lang.proficiency === 'Basic' ? 'selected' : ''}>Basic</option>
      </select>
      <button type="button" class="btn btn-outline btn-sm" onclick="removeLanguage(${idx})" style="color: #dc2626; border-color: #fca5a5; padding: 6px 10px;">✕</button>
    </div>
  `).join('');
}

function addLanguage() {
  if (!resumeData.languages) resumeData.languages = [];
  resumeData.languages.push({ name: '', proficiency: 'Professional' });
  renderLanguageForm();
  triggerAutoSync();
}

function updateLanguageName(idx, val) {
  if (resumeData.languages && resumeData.languages[idx]) {
    resumeData.languages[idx].name = val;
    triggerAutoSync();
  }
}

function updateLanguageProficiency(idx, val) {
  if (resumeData.languages && resumeData.languages[idx]) {
    resumeData.languages[idx].proficiency = val;
    triggerAutoSync();
  }
}

function removeLanguage(idx) {
  if (resumeData.languages) {
    resumeData.languages.splice(idx, 1);
    renderLanguageForm();
    triggerAutoSync();
  }
}

// 6. REFERENCES
function renderReferenceForm() {
  const container = document.getElementById('referencesContainer');
  const chk = document.getElementById('chkAvailableUponRequest');
  if (chk) {
    chk.checked = !!resumeData.availableUponRequest;
  }

  if (!container) return;
  if (!resumeData.references) resumeData.references = [];

  if (resumeData.availableUponRequest) {
    container.innerHTML = `
      <div style="background: #f1f5f9; border-radius: 6px; padding: 0.85rem; font-size: 0.84rem; color: #475569; font-style: italic;">
        ✓ "References available upon request" option is enabled. Custom contact references below are hidden in preview.
      </div>
    `;
    return;
  }

  if (resumeData.references.length === 0) {
    container.innerHTML = `
      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 8px; padding: 1rem; text-align: center; color: #64748b;">
        <p style="font-size: 0.85rem; margin-bottom: 6px;">No specific references added yet.</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="addReference()">+ Add Reference</button>
      </div>
    `;
    return;
  }

  container.innerHTML = resumeData.references.map((ref, idx) => `
    <div class="rb-item-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; font-size: 0.85rem; color: var(--primary);">#${idx + 1} Reference</span>
        <button type="button" class="btn btn-outline btn-sm" onclick="removeReference(${idx})" style="color: #dc2626; border-color: #fca5a5; padding: 2px 6px; font-size: 0.72rem;">Delete</button>
      </div>
      <div class="form-row-2col" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Full Name" value="${escapeHtml(ref.name || '')}" oninput="updateReferenceField(${idx}, 'name', this.value)">
        <input type="text" class="form-control" placeholder="Position (e.g. Engineering Director)" value="${escapeHtml(ref.position || '')}" oninput="updateReferenceField(${idx}, 'position', this.value)">
      </div>
      <div class="form-row-2col">
        <input type="text" class="form-control" placeholder="Company / Organization" value="${escapeHtml(ref.company || '')}" oninput="updateReferenceField(${idx}, 'company', this.value)">
        <input type="text" class="form-control" placeholder="Email / Phone" value="${escapeHtml(ref.email || '')}" oninput="updateReferenceField(${idx}, 'email', this.value)">
      </div>
    </div>
  `).join('');
}

function toggleAvailableUponRequest(isChecked) {
  resumeData.availableUponRequest = isChecked;
  renderReferenceForm();
  triggerAutoSync();
}

function addReference() {
  if (!resumeData.references) resumeData.references = [];
  resumeData.availableUponRequest = false;
  resumeData.references.push({
    id: 'ref-' + Date.now(),
    name: '',
    position: '',
    company: '',
    email: '',
    phone: ''
  });
  renderReferenceForm();
  triggerAutoSync();
}

function updateReferenceField(idx, field, val) {
  if (resumeData.references && resumeData.references[idx]) {
    resumeData.references[idx][field] = val;
    triggerAutoSync();
  }
}

function removeReference(idx) {
  if (resumeData.references) {
    resumeData.references.splice(idx, 1);
    renderReferenceForm();
    triggerAutoSync();
  }
}

/**
 * Resume Completion Indicator
 */
function updateCompletionIndicator() {
  const checks = [
    { key: 'Full Name', valid: !!(resumeData.fullName && resumeData.fullName.trim()), fieldId: 'resFullName' },
    { key: 'Email', valid: !!(resumeData.email && resumeData.email.includes('@')), fieldId: 'resEmail' },
    { key: 'Mobile', valid: !!(resumeData.phone && resumeData.phone.trim()), fieldId: 'resPhone' },
    { key: 'Location', valid: !!(resumeData.location && resumeData.location.trim()), fieldId: 'resLocation' },
    { key: 'Career Objective', valid: !!(resumeData.objective && resumeData.objective.trim().length > 20), fieldId: 'resObjective' },
    { key: 'Experience', valid: !!(resumeData.experience && resumeData.experience.length > 0 && resumeData.experience[0].role), fieldId: 'experienceContainer' },
    { key: 'Education', valid: !!(resumeData.education && resumeData.education.length > 0 && resumeData.education[0].degree), fieldId: 'educationContainer' },
    { key: 'Technical Skills', valid: !!(resumeData.skills && resumeData.skills.length >= 3), fieldId: 'skillTagInput' },
    { key: 'Languages', valid: !!(resumeData.languages && resumeData.languages.length > 0 && resumeData.languages[0].name), fieldId: 'languagesContainer' },
    { key: 'References', valid: !!(resumeData.availableUponRequest || (resumeData.references && resumeData.references.length > 0)), fieldId: 'referencesContainer' }
  ];

  const completed = checks.filter(c => c.valid).length;
  const percentage = Math.round((completed / checks.length) * 100);

  const textElem = document.getElementById('resumeCompletionText');
  if (textElem) {
    textElem.textContent = `Resume Completion: ${percentage}%`;
  }
  const barElem = document.getElementById('resumeCompletionBar');
  if (barElem) {
    barElem.style.width = `${percentage}%`;
    if (percentage >= 80) barElem.style.background = '#10b981';
    else if (percentage >= 50) barElem.style.background = '#0066ff';
    else barElem.style.background = '#f59e0b';
  }

  const listElem = document.getElementById('completionChecklist');
  if (listElem) {
    listElem.innerHTML = checks.map(c => `
      <div style="font-size: 0.8rem; color: ${c.valid ? '#166534' : '#64748b'}; display: flex; align-items: center; gap: 6px;">
        <span>${c.valid ? '✓' : '○'}</span>
        <span style="${c.valid ? 'font-weight: 600;' : ''}">${c.key}</span>
      </div>
    `).join('');
  }

  // Store first incomplete field for Complete Resume button
  const firstIncomplete = checks.find(c => !c.valid);
  window._nextIncompleteFieldId = firstIncomplete ? firstIncomplete.fieldId : null;
}

function completeResumeGuide() {
  if (window._nextIncompleteFieldId) {
    const el = document.getElementById(window._nextIncompleteFieldId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
      if (typeof showToast === 'function') {
        showToast('Navigated to next recommended section!', 'info');
      }
    }
  } else {
    if (typeof showToast === 'function') {
      showToast('🎉 Your resume is 100% complete and ready for applications!', 'success');
    }
  }
}

/**
 * Template Selection & Rendering
 */
function selectTemplate(templateName, element, notify = true) {
  currentTemplate = templateName;
  resumeData.template = templateName;

  document.querySelectorAll('.template-pill, .template-card-choice').forEach(el => {
    if (el.dataset.template === templateName || el.textContent.trim().toLowerCase().includes(templateName.toLowerCase())) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  const badge = document.getElementById('selectedTemplateBadge');
  if (badge) {
    badge.textContent = `Active Template: ${templateName}`;
  }

  renderResumePreview();
  saveResumesToStorage();

  if (notify && typeof showToast === 'function') {
    showToast(`Switched design to "${templateName}" template`, 'info');
  }
}

function renderResumePreview() {
  const container = document.getElementById('resumeLivePreview');
  if (!container) return;

  let html = '';
  switch (currentTemplate) {
    case 'Professional':
      html = renderProfessionalTemplate(resumeData);
      break;
    case 'Creative':
      html = renderCreativeTemplate(resumeData);
      break;
    case 'Minimal':
      html = renderMinimalTemplate(resumeData);
      break;
    case 'Executive':
      html = renderExecutiveTemplate(resumeData);
      break;
    case 'Modern':
    default:
      html = renderModernTemplate(resumeData);
      break;
  }

  container.innerHTML = html;

  // Also update full-screen modal preview if open
  const modalContainer = document.getElementById('modalResumeLivePreview');
  if (modalContainer) {
    modalContainer.innerHTML = html;
  }
}

/**
 * TEMPLATE 1: MODERN
 * Blue accents, modern typography, skill cards, timeline experience
 */
function renderModernTemplate(d) {
  const accent = '#0066FF';
  return `
    <div class="resume-sheet-content modern-template" style="color: #1e293b; font-family: 'Inter', -apple-system, sans-serif; line-height: 1.5; font-size: 9.5pt;">
      <!-- Header -->
      <div style="border-bottom: 2.5px solid ${accent}; padding-bottom: 12pt; margin-bottom: 14pt;">
        <h1 style="font-size: 20pt; font-weight: 800; color: #0f172a; margin: 0 0 2pt 0; text-transform: capitalize;">${escapeHtml(d.fullName || 'Your Full Name')}</h1>
        <div style="font-size: 11pt; font-weight: 700; color: ${accent}; margin-bottom: 6pt;">${escapeHtml(d.professionalTitle || 'Job Title')}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 10pt; font-size: 8.5pt; color: #64748b;">
          ${d.email ? `<span>📧 ${escapeHtml(d.email)}</span>` : ''}
          ${d.phone ? `<span>📱 ${escapeHtml(d.phone)}</span>` : ''}
          ${d.location ? `<span>📍 ${escapeHtml(d.location)}, Nepal</span>` : ''}
          ${(d.links || []).filter(l => l.url).map(l => `<span>🔗 <a href="${escapeHtml(l.url)}" target="_blank" style="color: ${accent}; text-decoration: none;">${escapeHtml(l.type)}</a></span>`).join('')}
        </div>
      </div>

      <!-- Career Objective -->
      ${d.objective ? `
        <div style="margin-bottom: 13pt;">
          <h2 style="font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 3pt; margin: 0 0 5pt 0;">Career Objective</h2>
          <p style="margin: 0; color: #334155; line-height: 1.5;">${escapeHtml(d.objective)}</p>
        </div>
      ` : ''}

      <!-- Work Experience -->
      ${(d.experience && d.experience.length) ? `
        <div style="margin-bottom: 13pt;">
          <h2 style="font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 3pt; margin: 0 0 8pt 0;">Work Experience</h2>
          ${d.experience.map(exp => `
            <div style="margin-bottom: 8pt; position: relative;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
                <div style="font-weight: 700; font-size: 9.5pt; color: #0f172a;">
                  ${escapeHtml(exp.role || '')} — <span style="color: ${accent};">${escapeHtml(exp.company || '')}</span>
                </div>
                <div style="font-size: 8pt; color: #64748b; font-weight: 600;">
                  ${escapeHtml(exp.startDate || '')} – ${escapeHtml(exp.endDate || '')}
                </div>
              </div>
              ${exp.location ? `<div style="font-size: 8pt; color: #64748b; margin-bottom: 2pt;">📍 ${escapeHtml(exp.location)}</div>` : ''}
              ${renderBulletList(exp.responsibilities)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${(d.education && d.education.length) ? `
        <div style="margin-bottom: 13pt;">
          <h2 style="font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 3pt; margin: 0 0 6pt 0;">Education & Degree</h2>
          ${d.education.map(edu => `
            <div style="margin-bottom: 6pt;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
                <div style="font-weight: 700; font-size: 9.2pt; color: #0f172a;">${escapeHtml(edu.degree || '')}</div>
                <div style="font-size: 8pt; color: #64748b;">${escapeHtml(edu.startYear || '')} – ${escapeHtml(edu.gradYear || '')}</div>
              </div>
              <div style="font-size: 8.5pt; color: ${accent}; font-weight: 600;">${escapeHtml(edu.institution || '')}${edu.location ? ` | ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa ? `<div style="font-size: 8pt; color: #475569;">Score / Grade: <strong>${escapeHtml(edu.gpa)}</strong></div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Technical Skills & Tools -->
      ${(d.skills && d.skills.length) ? `
        <div style="margin-bottom: 13pt;">
          <h2 style="font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 3pt; margin: 0 0 6pt 0;">Technical Skills & Tools</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 4pt;">
            ${d.skills.map(s => `
              <span style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #0f172a; padding: 2px 7px; border-radius: 4px; font-size: 8pt; font-weight: 600;">${escapeHtml(s)}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Languages & References Two-Column Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14pt;">
        ${(d.languages && d.languages.length) ? `
          <div>
            <h2 style="font-size: 9.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 2pt; margin: 0 0 4pt 0;">Languages</h2>
            <div style="font-size: 8.5pt; color: #334155; line-height: 1.4;">
              ${d.languages.map(l => `<div><strong>${escapeHtml(l.name)}</strong>: <span style="color: #64748b;">${escapeHtml(l.proficiency)}</span></div>`).join('')}
            </div>
          </div>
        ` : '<div></div>'}

        <div>
          <h2 style="font-size: 9.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: ${accent}; border-bottom: 1px solid #e2e8f0; padding-bottom: 2pt; margin: 0 0 4pt 0;">References</h2>
          <div style="font-size: 8.5pt; color: #334155; line-height: 1.4;">
            ${d.availableUponRequest || !d.references || !d.references.length ? `
              <span style="color: #64748b; font-style: italic;">Available upon request.</span>
            ` : d.references.map(r => `
              <div style="margin-bottom: 4pt;">
                <strong>${escapeHtml(r.name)}</strong> — ${escapeHtml(r.position)}<br>
                <span style="color: #64748b;">${escapeHtml(r.company)}${r.email ? ` | ${escapeHtml(r.email)}` : ''}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TEMPLATE 2: PROFESSIONAL
 * Traditional professional CV layout suitable for corporate, banking, office jobs
 */
function renderProfessionalTemplate(d) {
  const navy = '#0f2942';
  return `
    <div class="resume-sheet-content professional-template" style="color: #1e293b; font-family: 'Times New Roman', Georgia, serif; line-height: 1.45; font-size: 10pt;">
      <!-- Centered Traditional Header -->
      <div style="text-align: center; border-bottom: 2px solid ${navy}; padding-bottom: 10pt; margin-bottom: 12pt;">
        <h1 style="font-size: 22pt; font-weight: bold; color: ${navy}; margin: 0 0 2pt 0; letter-spacing: 0.5px;">${escapeHtml(d.fullName || 'Your Full Name')}</h1>
        <div style="font-size: 10.5pt; font-style: italic; color: #475569; margin-bottom: 5pt; font-family: sans-serif;">${escapeHtml(d.professionalTitle || 'Job Title')}</div>
        <div style="font-size: 8.5pt; color: #475569; display: flex; justify-content: center; flex-wrap: wrap; gap: 8pt; font-family: sans-serif;">
          ${d.location ? `<span>${escapeHtml(d.location)}, Nepal</span>` : ''}
          ${d.phone ? `<span>• Tel: ${escapeHtml(d.phone)}</span>` : ''}
          ${d.email ? `<span>• Email: ${escapeHtml(d.email)}</span>` : ''}
          ${(d.links || []).filter(l => l.url).map(l => `<span>• ${escapeHtml(l.type)}: <a href="${escapeHtml(l.url)}" target="_blank" style="color: ${navy}; text-decoration: underline;">${escapeHtml(l.url.replace(/^https?:\/\//, ''))}</a></span>`).join('')}
        </div>
      </div>

      <!-- Professional Summary -->
      ${d.objective ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: ${navy}; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 4pt 0;">Professional Summary</h2>
          <p style="margin: 0; text-align: justify; line-height: 1.5;">${escapeHtml(d.objective)}</p>
        </div>
      ` : ''}

      <!-- Work Experience -->
      ${(d.experience && d.experience.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: ${navy}; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">Professional Experience</h2>
          ${d.experience.map(exp => `
            <div style="margin-bottom: 8pt;">
              <div style="display: flex; justify-content: space-between; font-weight: bold;">
                <span>${escapeHtml(exp.role || '')}</span>
                <span>${escapeHtml(exp.startDate || '')} – ${escapeHtml(exp.endDate || '')}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-style: italic; color: #334155; font-size: 9.5pt; margin-bottom: 2pt;">
                <span>${escapeHtml(exp.company || '')}</span>
                <span>${escapeHtml(exp.location || '')}</span>
              </div>
              ${renderBulletList(exp.responsibilities)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education History -->
      ${(d.education && d.education.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: ${navy}; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">Education & Credentials</h2>
          ${d.education.map(edu => `
            <div style="margin-bottom: 6pt;">
              <div style="display: flex; justify-content: space-between; font-weight: bold;">
                <span>${escapeHtml(edu.degree || '')}</span>
                <span>${escapeHtml(edu.startYear || '')} – ${escapeHtml(edu.gradYear || '')}</span>
              </div>
              <div style="color: #334155; font-style: italic; font-size: 9.5pt;">${escapeHtml(edu.institution || '')}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa ? `<div style="font-size: 8.5pt; color: #475569;">Graduation Standing: ${escapeHtml(edu.gpa)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Core Competencies -->
      ${(d.skills && d.skills.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: ${navy}; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 4pt 0;">Core Competencies & Tools</h2>
          <p style="margin: 0; line-height: 1.5; font-size: 9.5pt;">${d.skills.map(escapeHtml).join(' • ')}</p>
        </div>
      ` : ''}

      <!-- Languages & References -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14pt;">
        <div>
          <h2 style="font-size: 10pt; font-weight: bold; text-transform: uppercase; color: ${navy}; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 4pt 0;">Languages</h2>
          <div style="font-size: 9pt;">
            ${(d.languages || []).map(l => `<div><strong>${escapeHtml(l.name)}</strong> (${escapeHtml(l.proficiency)})</div>`).join('')}
          </div>
        </div>

        <div>
          <h2 style="font-size: 10pt; font-weight: bold; text-transform: uppercase; color: ${navy}; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 4pt 0;">References</h2>
          <div style="font-size: 9pt;">
            ${d.availableUponRequest || !d.references || !d.references.length ? `
              <span style="font-style: italic; color: #64748b;">Furnished upon request</span>
            ` : d.references.map(r => `
              <div><strong>${escapeHtml(r.name)}</strong>, ${escapeHtml(r.position)} - ${escapeHtml(r.company)}</div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TEMPLATE 3: CREATIVE
 * Modern creative layout with visual sections, colored accents, and bold typography
 */
function renderCreativeTemplate(d) {
  const royal = '#2563eb';
  return `
    <div class="resume-sheet-content creative-template" style="color: #0f172a; font-family: 'Poppins', 'Segoe UI', sans-serif; line-height: 1.5; font-size: 9.5pt;">
      <!-- Vibrant Header Banner -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; padding: 16pt 18pt; border-radius: 6px; margin-bottom: 14pt;">
        <h1 style="font-size: 21pt; font-weight: 800; margin: 0 0 2pt 0; letter-spacing: 0.5px;">${escapeHtml(d.fullName || 'Your Full Name')}</h1>
        <div style="font-size: 11pt; color: #bfdbfe; font-weight: 600; margin-bottom: 8pt;">${escapeHtml(d.professionalTitle || 'Creative Specialist')}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 12pt; font-size: 8.5pt; color: #e0f2fe;">
          ${d.email ? `<span>✉️ ${escapeHtml(d.email)}</span>` : ''}
          ${d.phone ? `<span>📞 ${escapeHtml(d.phone)}</span>` : ''}
          ${d.location ? `<span>📍 ${escapeHtml(d.location)}, Nepal</span>` : ''}
          ${(d.links || []).filter(l => l.url).map(l => `<span>🌐 <a href="${escapeHtml(l.url)}" target="_blank" style="color: #ffffff; text-decoration: underline;">${escapeHtml(l.type)}</a></span>`).join('')}
        </div>
      </div>

      <!-- About Me -->
      ${d.objective ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: 800; color: ${royal}; text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin: 0 0 4pt 0;">
            <span style="display: inline-block; width: 6px; height: 12px; background: ${royal}; border-radius: 2px;"></span>
            About Me / Career Vision
          </h2>
          <p style="margin: 0; color: #334155;">${escapeHtml(d.objective)}</p>
        </div>
      ` : ''}

      <!-- Experience Section -->
      ${(d.experience && d.experience.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: 800; color: ${royal}; text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin: 0 0 6pt 0;">
            <span style="display: inline-block; width: 6px; height: 12px; background: ${royal}; border-radius: 2px;"></span>
            Experience & Achievements
          </h2>
          ${d.experience.map(exp => `
            <div style="margin-bottom: 8pt; border-left: 2px solid #bfdbfe; padding-left: 10pt;">
              <div style="display: flex; justify-content: space-between; font-weight: 700;">
                <span style="color: #0f172a;">${escapeHtml(exp.role || '')}</span>
                <span style="font-size: 8pt; color: #2563eb; background: #eff6ff; padding: 1px 6px; border-radius: 4px;">${escapeHtml(exp.startDate || '')} - ${escapeHtml(exp.endDate || '')}</span>
              </div>
              <div style="font-size: 8.5pt; color: #475569; font-weight: 600; margin-bottom: 2pt;">${escapeHtml(exp.company || '')} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</div>
              ${renderBulletList(exp.responsibilities)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education & Degree -->
      ${(d.education && d.education.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: 800; color: ${royal}; text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin: 0 0 6pt 0;">
            <span style="display: inline-block; width: 6px; height: 12px; background: ${royal}; border-radius: 2px;"></span>
            Education & Academic Credentials
          </h2>
          ${d.education.map(edu => `
            <div style="margin-bottom: 6pt; border-left: 2px solid #bfdbfe; padding-left: 10pt;">
              <div style="font-weight: 700; color: #0f172a;">${escapeHtml(edu.degree || '')} (${escapeHtml(edu.startYear || '')} - ${escapeHtml(edu.gradYear || '')})</div>
              <div style="font-size: 8.5pt; color: ${royal};">${escapeHtml(edu.institution || '')}${edu.location ? ` • ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa ? `<div style="font-size: 8pt; color: #64748b;">${escapeHtml(edu.gpa)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Skills Badges -->
      ${(d.skills && d.skills.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: 800; color: ${royal}; text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin: 0 0 6pt 0;">
            <span style="display: inline-block; width: 6px; height: 12px; background: ${royal}; border-radius: 2px;"></span>
            Design & Tech Capabilities
          </h2>
          <div style="display: flex; flex-wrap: wrap; gap: 5pt;">
            ${d.skills.map(s => `
              <span style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-weight: 600; padding: 2px 8px; border-radius: 6px; font-size: 8pt;">${escapeHtml(s)}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Languages & References Two-Column -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14pt;">
        <div>
          <h2 style="font-size: 9.5pt; font-weight: 800; color: ${royal}; text-transform: uppercase; margin: 0 0 4pt 0;">Languages</h2>
          <div style="font-size: 8.5pt;">
            ${(d.languages || []).map(l => `<div><strong>${escapeHtml(l.name)}</strong>: ${escapeHtml(l.proficiency)}</div>`).join('')}
          </div>
        </div>

        <div>
          <h2 style="font-size: 9.5pt; font-weight: 800; color: ${royal}; text-transform: uppercase; margin: 0 0 4pt 0;">References</h2>
          <div style="font-size: 8.5pt;">
            ${d.availableUponRequest || !d.references || !d.references.length ? `
              <span style="color: #64748b; font-style: italic;">References available upon request</span>
            ` : d.references.map(r => `
              <div><strong>${escapeHtml(r.name)}</strong> — ${escapeHtml(r.position)} (${escapeHtml(r.company)})</div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TEMPLATE 4: MINIMAL
 * Simple, clean, highly readable one-page resume with minimal decoration
 */
function renderMinimalTemplate(d) {
  return `
    <div class="resume-sheet-content minimal-template" style="color: #111827; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.45; font-size: 9.5pt;">
      <!-- Ultra-Clean Header -->
      <div style="margin-bottom: 14pt;">
        <h1 style="font-size: 22pt; font-weight: 800; color: #111827; margin: 0 0 2pt 0; letter-spacing: -0.5px;">${escapeHtml(d.fullName || 'Your Full Name')}</h1>
        <div style="font-size: 10.5pt; color: #4b5563; font-weight: 500; margin-bottom: 4pt;">${escapeHtml(d.professionalTitle || 'Professional Title')}</div>
        <div style="font-size: 8.5pt; color: #6b7280; display: flex; flex-wrap: wrap; gap: 8pt;">
          ${d.location ? `<span>${escapeHtml(d.location)}, Nepal</span>` : ''}
          ${d.phone ? `<span>${escapeHtml(d.phone)}</span>` : ''}
          ${d.email ? `<span>${escapeHtml(d.email)}</span>` : ''}
          ${(d.links || []).filter(l => l.url).map(l => `<a href="${escapeHtml(l.url)}" target="_blank" style="color: #111827; text-decoration: underline;">${escapeHtml(l.type)}</a>`).join('')}
        </div>
      </div>

      <!-- Objective -->
      ${d.objective ? `
        <div style="margin-bottom: 12pt;">
          <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 3pt;">Objective</div>
          <p style="margin: 0; color: #374151;">${escapeHtml(d.objective)}</p>
        </div>
      ` : ''}

      <!-- Experience -->
      ${(d.experience && d.experience.length) ? `
        <div style="margin-bottom: 12pt;">
          <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 6pt;">Experience</div>
          ${d.experience.map(exp => `
            <div style="margin-bottom: 8pt;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: #111827;">
                <span>${escapeHtml(exp.role || '')}, ${escapeHtml(exp.company || '')}</span>
                <span style="font-size: 8pt; color: #6b7280; font-weight: 400;">${escapeHtml(exp.startDate || '')} – ${escapeHtml(exp.endDate || '')}</span>
              </div>
              ${renderBulletList(exp.responsibilities)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${(d.education && d.education.length) ? `
        <div style="margin-bottom: 12pt;">
          <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 6pt;">Education</div>
          ${d.education.map(edu => `
            <div style="margin-bottom: 5pt;">
              <div style="display: flex; justify-content: space-between; font-weight: 600;">
                <span>${escapeHtml(edu.degree || '')}</span>
                <span style="font-size: 8pt; color: #6b7280;">${escapeHtml(edu.startYear || '')} – ${escapeHtml(edu.gradYear || '')}</span>
              </div>
              <div style="font-size: 8.5pt; color: #4b5563;">${escapeHtml(edu.institution || '')}${edu.gpa ? ` • ${escapeHtml(edu.gpa)}` : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Skills -->
      ${(d.skills && d.skills.length) ? `
        <div style="margin-bottom: 12pt;">
          <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 4pt;">Skills & Expertise</div>
          <div style="font-size: 9pt; color: #374151;">${d.skills.map(escapeHtml).join('  /  ')}</div>
        </div>
      ` : ''}

      <!-- Languages & References -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14pt;">
        <div>
          <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 3pt;">Languages</div>
          <div style="font-size: 8.5pt; color: #374151;">
            ${(d.languages || []).map(l => `${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})`).join(', ')}
          </div>
        </div>

        <div>
          <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 3pt;">References</div>
          <div style="font-size: 8.5pt; color: #374151;">
            ${d.availableUponRequest || !d.references || !d.references.length ? `
              Available upon request
            ` : d.references.map(r => `${escapeHtml(r.name)} (${escapeHtml(r.position)}, ${escapeHtml(r.company)})`).join('; ')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TEMPLATE 5: EXECUTIVE
 * Premium executive-style layout for experienced professionals and managers
 */
function renderExecutiveTemplate(d) {
  const emerald = '#065f46';
  return `
    <div class="resume-sheet-content executive-template" style="color: #1f2937; font-family: 'Georgia', serif; line-height: 1.5; font-size: 9.5pt;">
      <!-- Executive Header -->
      <div style="border-bottom: 2px solid ${emerald}; padding-bottom: 12pt; margin-bottom: 14pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
          <div>
            <h1 style="font-size: 22pt; font-weight: bold; color: ${emerald}; margin: 0 0 2pt 0; letter-spacing: 0.5px;">${escapeHtml(d.fullName || 'Your Full Name')}</h1>
            <div style="font-size: 11pt; color: #374151; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(d.professionalTitle || 'Executive Officer')}</div>
          </div>
          <div style="text-align: right; font-size: 8.5pt; color: #4b5563; font-family: sans-serif;">
            ${d.location ? `<div>${escapeHtml(d.location)}, Nepal</div>` : ''}
            ${d.phone ? `<div>${escapeHtml(d.phone)}</div>` : ''}
            ${d.email ? `<div>${escapeHtml(d.email)}</div>` : ''}
          </div>
        </div>
        ${(d.links && d.links.length) ? `
          <div style="margin-top: 6pt; font-size: 8.5pt; font-family: sans-serif; display: flex; gap: 10pt;">
            ${d.links.filter(l => l.url).map(l => `<a href="${escapeHtml(l.url)}" target="_blank" style="color: ${emerald}; text-decoration: none; font-weight: 600;">${escapeHtml(l.type)}: ${escapeHtml(l.url.replace(/^https?:\/\//, ''))}</a>`).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Executive Profile Summary -->
      ${d.objective ? `
        <div style="background: #f0fdf4; border-left: 3px solid ${emerald}; padding: 8pt 10pt; margin-bottom: 12pt; border-radius: 0 4px 4px 0;">
          <h2 style="font-size: 9.5pt; font-weight: bold; text-transform: uppercase; color: ${emerald}; margin: 0 0 3pt 0; font-family: sans-serif;">Executive Profile</h2>
          <p style="margin: 0; color: #1e293b; line-height: 1.5; font-size: 9.5pt;">${escapeHtml(d.objective)}</p>
        </div>
      ` : ''}

      <!-- Leadership & Work Experience -->
      ${(d.experience && d.experience.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: bold; text-transform: uppercase; color: ${emerald}; border-bottom: 1px solid #d1d5db; padding-bottom: 2pt; margin: 0 0 6pt 0; font-family: sans-serif;">Leadership & Professional Experience</h2>
          ${d.experience.map(exp => `
            <div style="margin-bottom: 8pt;">
              <div style="display: flex; justify-content: space-between; font-weight: bold; color: #111827;">
                <span>${escapeHtml(exp.role || '')}</span>
                <span style="font-size: 8.5pt; color: #4b5563; font-family: sans-serif;">${escapeHtml(exp.startDate || '')} – ${escapeHtml(exp.endDate || '')}</span>
              </div>
              <div style="font-size: 9pt; color: ${emerald}; font-weight: 600; margin-bottom: 2pt;">${escapeHtml(exp.company || '')}${exp.location ? `, ${escapeHtml(exp.location)}` : ''}</div>
              ${renderBulletList(exp.responsibilities)}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education & Qualifications -->
      ${(d.education && d.education.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: bold; text-transform: uppercase; color: ${emerald}; border-bottom: 1px solid #d1d5db; padding-bottom: 2pt; margin: 0 0 6pt 0; font-family: sans-serif;">Education & Advanced Qualifications</h2>
          ${d.education.map(edu => `
            <div style="margin-bottom: 5pt;">
              <div style="display: flex; justify-content: space-between; font-weight: bold;">
                <span>${escapeHtml(edu.degree || '')}</span>
                <span style="font-size: 8.5pt; color: #4b5563; font-family: sans-serif;">${escapeHtml(edu.startYear || '')} – ${escapeHtml(edu.gradYear || '')}</span>
              </div>
              <div style="font-size: 9pt; color: #374151;">${escapeHtml(edu.institution || '')}${edu.gpa ? ` | Standing: ${escapeHtml(edu.gpa)}` : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Executive Skills -->
      ${(d.skills && d.skills.length) ? `
        <div style="margin-bottom: 12pt;">
          <h2 style="font-size: 10pt; font-weight: bold; text-transform: uppercase; color: ${emerald}; border-bottom: 1px solid #d1d5db; padding-bottom: 2pt; margin: 0 0 4pt 0; font-family: sans-serif;">Core Competencies</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 4pt; font-family: sans-serif;">
            ${d.skills.map(s => `
              <span style="background: #f3f4f6; color: #1f2937; border: 1px solid #e5e7eb; padding: 2px 7px; border-radius: 3px; font-size: 8pt; font-weight: 600;">${escapeHtml(s)}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Languages & Endorsements -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14pt;">
        <div>
          <h2 style="font-size: 9.5pt; font-weight: bold; text-transform: uppercase; color: ${emerald}; border-bottom: 1px solid #d1d5db; padding-bottom: 2pt; margin: 0 0 4pt 0; font-family: sans-serif;">Languages</h2>
          <div style="font-size: 8.5pt; font-family: sans-serif;">
            ${(d.languages || []).map(l => `<div><strong>${escapeHtml(l.name)}</strong>: ${escapeHtml(l.proficiency)}</div>`).join('')}
          </div>
        </div>

        <div>
          <h2 style="font-size: 9.5pt; font-weight: bold; text-transform: uppercase; color: ${emerald}; border-bottom: 1px solid #d1d5db; padding-bottom: 2pt; margin: 0 0 4pt 0; font-family: sans-serif;">Professional References</h2>
          <div style="font-size: 8.5pt; font-family: sans-serif;">
            ${d.availableUponRequest || !d.references || !d.references.length ? `
              <span style="color: #6b7280; font-style: italic;">Executive references available upon request</span>
            ` : d.references.map(r => `
              <div><strong>${escapeHtml(r.name)}</strong>, ${escapeHtml(r.position)} (${escapeHtml(r.company)})</div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBulletList(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return '';
  return `
    <ul style="padding-left: 14pt; margin: 3pt 0 4pt 0; font-size: 8.8pt; line-height: 1.45; color: #334155;">
      ${lines.map(line => {
    const cleaned = line.replace(/^[•\-\*]\s*/, '');
    return `<li style="margin-bottom: 1.5pt;">${escapeHtml(cleaned)}</li>`;
  }).join('')}
    </ul>
  `;
}

/**
 * Zoom Controls for Live Preview Sheet
 */
function setPreviewZoom(zoom) {
  previewZoomLevel = zoom;
  const sheet = document.getElementById('resumeLivePreview');
  const viewport = document.querySelector('.resume-a4-viewport');
  const scalerWrap = document.getElementById('resumeSheetScalerWrap');
  if (sheet) {
    let scale = 1;
    if (zoom === 'fit') {
      if (viewport) {
        const padding = window.innerWidth <= 640 ? 16 : 36;
        const availWidth = Math.max(260, viewport.clientWidth - padding);
        scale = Math.min(1.05, Math.max(0.32, availWidth / 794));
      }
    } else {
      const numericZoom = parseFloat(zoom) || 100;
      scale = numericZoom / 100;
    }

    sheet.style.transform = `scale(${scale})`;
    sheet.style.transformOrigin = 'top left';

    if (scalerWrap) {
      const naturalHeight = Math.max(1123, sheet.scrollHeight || sheet.offsetHeight || 1123);
      scalerWrap.style.width = `${Math.round(794 * scale)}px`;
      scalerWrap.style.height = `${Math.round(naturalHeight * scale)}px`;
    }
  }
  document.querySelectorAll('.zoom-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.zoom === String(zoom));
  });
}

/**
 * Universal Workspace View Controls (PC & Mobile Responsive)
 * Supports 'editor', 'preview', and 'split' (side-by-side on desktop)
 */
let currentWorkspaceView = window.innerWidth > 900 ? 'split' : 'editor';
let currentMobileView = 'editor';

function initMobileView() {
  if (window.innerWidth <= 900) {
    setWorkspaceView('editor');
  } else {
    setWorkspaceView('split');
  }
  window.addEventListener('resize', handleResponsiveResize);
  setTimeout(() => {
    setPreviewZoom('fit');
  }, 100);
}

function handleResponsiveResize() {
  if (window.innerWidth <= 900) {
    if (currentWorkspaceView === 'split') {
      setWorkspaceView('editor');
    } else {
      setWorkspaceView(currentWorkspaceView);
    }
  } else {
    setWorkspaceView(currentWorkspaceView);
  }

  if (previewZoomLevel === 'fit') {
    setPreviewZoom('fit');
  }
}

function setWorkspaceView(view) {
  if (window.innerWidth <= 900 && view === 'split') {
    view = 'editor';
  }
  currentWorkspaceView = view;
  currentMobileView = view === 'preview' ? 'preview' : 'editor';

  const editorCard = document.querySelector('.rb-editor-card');
  const previewCol = document.querySelector('.rb-preview-column');
  const workspaceGrid = document.querySelector('.rb-main-workspace-grid');
  const tabBtnEditor = document.getElementById('tabBtnEditor');
  const tabBtnPreview = document.getElementById('tabBtnPreview');
  const tabBtnSplit = document.getElementById('tabBtnSplit');
  const floatingIcon = document.getElementById('rbFloatingIcon');
  const floatingLabel = document.getElementById('rbFloatingLabel');

  // Update tabs active state
  if (tabBtnEditor) tabBtnEditor.classList.toggle('active', view === 'editor');
  if (tabBtnPreview) tabBtnPreview.classList.toggle('active', view === 'preview');
  if (tabBtnSplit) tabBtnSplit.classList.toggle('active', view === 'split');

  if (view === 'preview') {
    if (editorCard) editorCard.style.display = 'none';
    if (previewCol) {
      previewCol.style.display = 'flex';
      renderResumePreview();
      setTimeout(() => setPreviewZoom('fit'), 50);
    }
    if (workspaceGrid) {
      workspaceGrid.classList.remove('view-editor-only', 'view-split');
      workspaceGrid.classList.add('view-preview-only');
    }
    if (floatingIcon) floatingIcon.textContent = '✏️';
    if (floatingLabel) floatingLabel.textContent = 'Edit Details';
    if (workspaceGrid && window.innerWidth <= 900) {
      window.scrollTo({ top: workspaceGrid.offsetTop - 70, behavior: 'smooth' });
    }
  } else if (view === 'editor') {
    if (editorCard) editorCard.style.display = 'block';
    if (previewCol) previewCol.style.display = 'none';
    if (workspaceGrid) {
      workspaceGrid.classList.remove('view-preview-only', 'view-split');
      workspaceGrid.classList.add('view-editor-only');
    }
    if (floatingIcon) floatingIcon.textContent = '👁️';
    if (floatingLabel) floatingLabel.textContent = 'Live A4 Preview';
    if (workspaceGrid && window.innerWidth <= 900) {
      window.scrollTo({ top: workspaceGrid.offsetTop - 70, behavior: 'smooth' });
    }
  } else {
    // 'split' view (Side-by-Side on PC desktop screens > 900px)
    if (editorCard) editorCard.style.display = 'block';
    if (previewCol) {
      previewCol.style.display = 'flex';
      renderResumePreview();
      setTimeout(() => setPreviewZoom('fit'), 50);
    }
    if (workspaceGrid) {
      workspaceGrid.classList.remove('view-editor-only', 'view-preview-only');
      workspaceGrid.classList.add('view-split');
    }
    if (floatingIcon) floatingIcon.textContent = '👁️';
    if (floatingLabel) floatingLabel.textContent = 'Live A4 Preview';
  }
}

// Backward-compatible alias
function setMobileWorkspaceView(view) {
  setWorkspaceView(view);
}

function toggleMobileView() {
  if (currentWorkspaceView === 'editor') {
    setWorkspaceView('preview');
  } else {
    setWorkspaceView('editor');
  }
}

/**
 * Top Resume Actions: Save, Preview Modal, Share Modal, My Resumes Modal, Print, Downloads
 */
function saveCurrentResume() {
  syncFormToState();
  resumeData.updatedAt = new Date().toISOString();
  saveResumesToStorage();
  showSyncBadge('Saved ✓', 'saved');
  if (typeof showToast === 'function') {
    showToast(`✓ Resume "${resumeData.title}" saved to your Job Nepal account!`, 'success');
  }
}

// 1. FULL-SCREEN PREVIEW MODAL
function openFullScreenPreview() {
  renderResumePreview();
  openModal('fullScreenPreviewModal');
  setTimeout(() => {
    const modalSheet = document.getElementById('modalResumeLivePreview');
    const modalWrap = document.getElementById('modalResumeSheetScalerWrap');
    const modalBody = modalSheet ? modalSheet.closest('.rb-modal-body') : null;
    if (modalSheet && modalBody) {
      const padding = window.innerWidth <= 640 ? 16 : 48;
      const availWidth = Math.max(260, modalBody.clientWidth - padding);
      const scale = Math.min(1.0, Math.max(0.32, availWidth / 794));
      modalSheet.style.transform = `scale(${scale})`;
      modalSheet.style.transformOrigin = 'top left';
      if (modalWrap) {
        const naturalHeight = Math.max(1123, modalSheet.scrollHeight || modalSheet.offsetHeight || 1123);
        modalWrap.style.width = `${Math.round(794 * scale)}px`;
        modalWrap.style.height = `${Math.round(naturalHeight * scale)}px`;
      }
    }
  }, 60);
}

// 2. SHARE MODAL
function openShareModal() {
  const modal = document.getElementById('shareResumeModal');
  if (!modal) return;

  const slug = (resumeData.fullName ? resumeData.fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'candidate') + '-' + resumeData.id;
  const shareUrl = `https://jobnepal.com/cv/${slug}`;

  const input = document.getElementById('shareResumeUrlInput');
  if (input) input.value = shareUrl;

  const qrBox = document.getElementById('shareQrCodeBox');
  if (qrBox) {
    qrBox.innerHTML = `
      <div style="background: #ffffff; padding: 10px; display: inline-block; border-radius: 8px; border: 1px solid #e2e8f0;">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(shareUrl)}" alt="Resume QR" width="140" height="140" style="display: block;">
      </div>
      <div style="font-size: 0.75rem; color: #64748b; margin-top: 6px;">Scan to view verified CV on mobile</div>
    `;
  }

  openModal('shareResumeModal');
}

function copyShareUrl() {
  const input = document.getElementById('shareResumeUrlInput');
  if (!input) return;
  navigator.clipboard.writeText(input.value).then(() => {
    if (typeof showToast === 'function') {
      showToast('Copied resume link to clipboard!', 'success');
    }
  }).catch(() => {
    input.select();
    document.execCommand('copy');
    if (typeof showToast === 'function') {
      showToast('Copied link!', 'success');
    }
  });
}

function shareViaSocial(platform) {
  const input = document.getElementById('shareResumeUrlInput');
  const url = encodeURIComponent(input ? input.value : window.location.href);
  const text = encodeURIComponent(`Check out my professional resume on Job Nepal: ${resumeData.fullName} (${resumeData.professionalTitle})`);

  let targetUrl = '';
  if (platform === 'whatsapp') {
    targetUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
  } else if (platform === 'linkedin') {
    targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  } else if (platform === 'email') {
    targetUrl = `mailto:?subject=${encodeURIComponent(resumeData.fullName + ' - Professional CV')}&body=${text}%0A%0A${url}`;
  }

  if (targetUrl) {
    window.open(targetUrl, '_blank', 'width=600,height=500');
  }
}

// 3. MY RESUMES MANAGER MODAL
function openResumesManager() {
  renderResumesManagerList();
  openModal('resumesManagerModal');
}

function renderResumesManagerList() {
  const list = document.getElementById('myResumesListContainer');
  if (!list) return;

  list.innerHTML = allResumes.map(r => {
    const isActive = r.id === activeResumeId;
    return `
      <div class="rb-manager-card ${isActive ? 'active-version' : ''}" style="background: ${isActive ? '#eff6ff' : '#ffffff'}; border: 1.5px solid ${isActive ? '#0066ff' : '#e2e8f0'}; border-radius: 8px; padding: 1rem; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="font-size: 1rem; color: #0f172a;">${escapeHtml(r.title)}</strong>
            ${isActive ? '<span class="badge badge-primary" style="font-size: 0.7rem;">Active</span>' : ''}
            <span class="badge" style="font-size: 0.7rem; background: #e2e8f0; color: #475569;">${escapeHtml(r.template || 'Modern')}</span>
          </div>
          <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">
            ${escapeHtml(r.fullName || '')} • ${escapeHtml(r.professionalTitle || '')}
          </div>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${!isActive ? `<button class="btn btn-primary btn-sm" onclick="switchResumeVersion('${r.id}')">Switch</button>` : ''}
          <button class="btn btn-outline btn-sm" onclick="renameResume('${r.id}')" title="Rename">✏️ Rename</button>
          <button class="btn btn-outline btn-sm" onclick="duplicateSpecificResume('${r.id}')" title="Duplicate">📋 Duplicate</button>
          ${allResumes.length > 1 ? `<button class="btn btn-outline btn-sm" onclick="deleteResume('${r.id}')" style="color: #dc2626; border-color: #fca5a5;" title="Delete">🗑️</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function duplicateSpecificResume(id) {
  const target = allResumes.find(r => r.id === id);
  if (!target) return;
  const newId = 'res-' + Date.now();
  const cloned = JSON.parse(JSON.stringify(target));
  cloned.id = newId;
  cloned.title = `${target.title} (Copy)`;
  cloned.updatedAt = new Date().toISOString();
  allResumes.push(cloned);
  saveResumesToStorage();
  renderResumesManagerList();
  if (typeof showToast === 'function') {
    showToast(`Duplicated "${target.title}"!`, 'success');
  }
}

// 4. PRINT & EXPORTS
function printOrDownloadPDF() {
  document.querySelectorAll('.rb-download-menu').forEach(m => m.style.display = 'none');

  if (typeof showToast === 'function') {
    showToast('✓ Preparing your 100% Free ATS Resume for download/print...', 'info');
  }

  const originalTitle = document.title;
  const safeName = (resumeData.fullName ? resumeData.fullName.trim().replace(/\s+/g, '_') : 'Job_Nepal') + '_CV';
  document.title = safeName;

  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

const downloadAsPDF = printOrDownloadPDF;

function downloadAsWord() {
  document.querySelectorAll('.rb-download-menu').forEach(m => m.style.display = 'none');
  const fileName = (resumeData.fullName ? resumeData.fullName.trim().replace(/\s+/g, '_') : 'Resume') + '_CV.docx';

  const previewEl = document.getElementById('resumeLivePreview');
  const innerHtml = previewEl ? previewEl.innerHTML : '';

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${escapeHtml(resumeData.fullName || 'Resume')}</title>
      <style>
        @page { size: 8.5in 11in; margin: 1in; }
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.45; color: #1e293b; }
      </style>
    </head>
    <body>
      ${innerHtml}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], { type: 'application/msword;charset=utf-8' });
  triggerFileDownload(blob, fileName);
  if (typeof showToast === 'function') {
    showToast('✓ Downloaded 100% Free editable Word document (.docx)!', 'success');
  }
}

function downloadAsText() {
  document.querySelectorAll('.rb-download-menu').forEach(m => m.style.display = 'none');
  const fileName = (resumeData.fullName ? resumeData.fullName.trim().replace(/\s+/g, '_') : 'Resume') + '_CV.txt';

  let txt = '';
  txt += `${(resumeData.fullName || 'RESUME').toUpperCase()}\n`;
  if (resumeData.professionalTitle) txt += `${resumeData.professionalTitle}\n`;
  const contactParts = [
    resumeData.email,
    resumeData.phone,
    resumeData.location ? `${resumeData.location}, Nepal` : null
  ].filter(Boolean);
  if (contactParts.length) txt += `${contactParts.join(' | ')}\n`;
  if (resumeData.links && resumeData.links.length) {
    txt += resumeData.links.filter(l => l.url).map(l => `${l.type}: ${l.url}`).join(' | ') + '\n';
  }
  txt += '='.repeat(64) + '\n\n';

  if (resumeData.objective) {
    txt += 'CAREER OBJECTIVE\n' + '-'.repeat(40) + '\n';
    txt += `${resumeData.objective}\n\n`;
  }

  if (resumeData.experience && resumeData.experience.length) {
    txt += 'WORK EXPERIENCE\n' + '-'.repeat(40) + '\n';
    resumeData.experience.forEach(exp => {
      txt += `${exp.role || ''} - ${exp.company || ''}\n`;
      txt += `${[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}${exp.location ? ' | ' + exp.location : ''}\n`;
      if (exp.responsibilities) {
        exp.responsibilities.split('\n').forEach(line => {
          if (line.trim()) txt += `  ${line.trim()}\n`;
        });
      }
      txt += '\n';
    });
  }

  if (resumeData.education && resumeData.education.length) {
    txt += 'EDUCATION & CREDENTIALS\n' + '-'.repeat(40) + '\n';
    resumeData.education.forEach(edu => {
      txt += `${edu.degree || ''}\n`;
      txt += `${edu.institution || ''} (${[edu.startYear, edu.gradYear].filter(Boolean).join(' - ')})\n`;
      if (edu.gpa) txt += `  Grade/Standing: ${edu.gpa}\n`;
      txt += '\n';
    });
  }

  if (resumeData.skills && resumeData.skills.length) {
    txt += 'TECHNICAL SKILLS & TOOLS\n' + '-'.repeat(40) + '\n';
    txt += `${resumeData.skills.join(', ')}\n\n`;
  }

  if (resumeData.languages && resumeData.languages.length) {
    txt += 'LANGUAGES\n' + '-'.repeat(40) + '\n';
    txt += resumeData.languages.map(l => `${l.name} (${l.proficiency})`).join(', ') + '\n\n';
  }

  txt += 'REFERENCES\n' + '-'.repeat(40) + '\n';
  if (resumeData.availableUponRequest || !resumeData.references || !resumeData.references.length) {
    txt += 'Available upon request.\n';
  } else {
    resumeData.references.forEach(r => {
      txt += `${r.name}, ${r.position} - ${r.company}\n`;
      if (r.email || r.phone) txt += `  ${[r.email, r.phone].filter(Boolean).join(' | ')}\n`;
    });
  }

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  triggerFileDownload(blob, fileName);
  if (typeof showToast === 'function') {
    showToast('Downloaded clean Plain Text resume (.txt)!', 'success');
  }
}

// 5. MODAL HELPERS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Global outside-click closing for modals and dropdowns
window.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('rb-modal-overlay')) {
    e.target.style.display = 'none';
    document.body.style.overflow = '';
  }
  if (!e.target.closest('.rb-download-dropdown')) {
    document.querySelectorAll('.rb-download-menu').forEach(m => m.style.display = 'none');
  }
});

function toggleDownloadDropdown(event, menuId = 'downloadCvMenu') {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const isCurrentlyOpen = menu.style.display === 'block';
  document.querySelectorAll('.rb-download-menu').forEach(m => m.style.display = 'none');
  menu.style.display = isCurrentlyOpen ? 'none' : 'block';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function triggerFileDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Window Exports
window.selectTemplate = selectTemplate;
window.saveCurrentResume = saveCurrentResume;
window.printOrDownloadPDF = printOrDownloadPDF;
window.downloadAsPDF = downloadAsPDF;
window.downloadAsWord = downloadAsWord;
window.downloadAsText = downloadAsText;
window.openFullScreenPreview = openFullScreenPreview;
window.openShareModal = openShareModal;
window.copyShareUrl = copyShareUrl;
window.shareViaSocial = shareViaSocial;
window.openResumesManager = openResumesManager;
window.switchResumeVersion = switchResumeVersion;
window.createNewResume = createNewResume;
window.duplicateCurrentResume = duplicateCurrentResume;
window.duplicateSpecificResume = duplicateSpecificResume;
window.renameResume = renameResume;
window.deleteResume = deleteResume;
window.completeResumeGuide = completeResumeGuide;
window.applyObjectiveTemplate = applyObjectiveTemplate;
window.addLink = addLink;
window.updateLinkType = updateLinkType;
window.updateLinkUrl = updateLinkUrl;
window.removeLink = removeLink;
window.addExperience = addExperience;
window.updateExperienceField = updateExperienceField;
window.toggleCurrentPosition = toggleCurrentPosition;
window.removeExperience = removeExperience;
window.addEducation = addEducation;
window.updateEducationField = updateEducationField;
window.removeEducation = removeEducation;
window.addSkillFromInput = addSkillFromInput;
window.addSuggestedSkill = addSuggestedSkill;
window.removeSkill = removeSkill;
window.addLanguage = addLanguage;
window.updateLanguageName = updateLanguageName;
window.updateLanguageProficiency = updateLanguageProficiency;
window.removeLanguage = removeLanguage;
window.addReference = addReference;
window.updateReferenceField = updateReferenceField;
window.toggleAvailableUponRequest = toggleAvailableUponRequest;
window.removeReference = removeReference;
window.toggleDownloadDropdown = toggleDownloadDropdown;
window.setPreviewZoom = setPreviewZoom;
window.setWorkspaceView = setWorkspaceView;
window.setMobileWorkspaceView = setMobileWorkspaceView;
window.toggleMobileView = toggleMobileView;
window.openModal = openModal;
window.closeModal = closeModal;
