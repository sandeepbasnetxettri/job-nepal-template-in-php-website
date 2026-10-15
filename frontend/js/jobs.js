/**
 * JOB NEPAL — Jobs List, Search, Filter & Details Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const isJobsPage = document.getElementById('jobsContainer');
  const isDetailsPage = document.getElementById('jobDetailsContainer');

  if (isJobsPage) {
    initJobsFilterPage();
  }

  if (isDetailsPage) {
    initJobDetailsPage();
  }
});

function initJobsFilterPage() {
  const container = document.getElementById('jobsContainer');
  const resultsCount = document.getElementById('resultsCount');
  const searchInput = document.getElementById('filterKeyword');
  const locationSelect = document.getElementById('filterLocation');
  const salaryRange = document.getElementById('salaryRange');
  const salaryValDisplay = document.getElementById('salaryValDisplay');
  const techPills = document.querySelectorAll('.tech-filter-pill');

  // Parse URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const qKeyword = urlParams.get('q') || '';
  const qLocation = urlParams.get('location') || '';
  const qCategory = urlParams.get('category') || '';
  const qTech = urlParams.get('tech') || '';

  if (searchInput && qKeyword) searchInput.value = qKeyword;
  if (locationSelect && qLocation) locationSelect.value = qLocation;

  function filterAndRender() {
    let jobs = window.JobNepalDB.getJobs();
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const loc = locationSelect ? locationSelect.value : '';
    const maxSalary = salaryRange ? parseInt(salaryRange.value) : 300000;

    // Workplace types checkboxes
    const checkedTypes = Array.from(document.querySelectorAll('input[name="workplace"]:checked')).map(cb => cb.value);
    const checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);

    // Apply filtering
    let filtered = jobs.filter(job => {
      // Keyword match (Title, Company, Skills, Description)
      const matchesKeyword = !keyword || 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.skills.some(s => s.toLowerCase().includes(keyword)) ||
        job.description.toLowerCase().includes(keyword);

      // Location match
      const matchesLocation = !loc || loc === 'all' || 
        job.location.toLowerCase().includes(loc.toLowerCase()) || 
        (loc === 'Remote' && (job.workplaceType === 'Remote' || job.location.includes('Remote')));

      // Workplace type match
      const matchesWorkplace = checkedTypes.length === 0 || checkedTypes.includes(job.workplaceType);

      // Category match
      const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(job.category);

      // Salary filter
      const matchesSalary = !salaryRange || (job.salaryMin <= maxSalary);

      // Tech category query param
      const matchesTech = !qTech || (job.techCategory && job.techCategory.toLowerCase() === qTech.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase() === qTech.toLowerCase());

      return matchesKeyword && matchesLocation && matchesWorkplace && matchesCategory && matchesSalary && matchesTech;
    });

    // Update count
    if (resultsCount) {
      resultsCount.innerText = `Showing ${filtered.length} job vacancies in Nepal`;
    }

    renderJobCards(container, filtered);
  }

  // Bind Listeners
  if (searchInput) searchInput.addEventListener('input', debounce(filterAndRender, 250));
  if (locationSelect) locationSelect.addEventListener('change', filterAndRender);
  if (salaryRange && salaryValDisplay) {
    salaryRange.addEventListener('input', () => {
      salaryValDisplay.innerText = `Up to Rs. ${parseInt(salaryRange.value).toLocaleString()}`;
      filterAndRender();
    });
  }

  document.querySelectorAll('input[name="workplace"], input[name="category"]').forEach(cb => {
    cb.addEventListener('change', filterAndRender);
  });

  techPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      techPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tech = pill.getAttribute('data-tech');
      if (searchInput) {
        searchInput.value = tech === 'all' ? '' : tech;
        filterAndRender();
      }
    });
  });

  // Initial render
  filterAndRender();
}

function renderJobCards(container, jobs) {
  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `
      <div style="background: var(--bg-surface); padding: 3rem 1.5rem; border-radius: var(--radius-lg); text-align: center; border: 1px dashed var(--border-color);">
        <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🔍</span>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No matching jobs found</h3>
        <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">Try adjusting your keyword, resetting location filters, or expanding your salary range.</p>
        <button onclick="window.location.href='jobs.html'" class="btn btn-outline btn-sm">Clear All Filters</button>
      </div>
    `;
    return;
  }

  const savedIds = window.JobNepalDB.getSavedJobIds();
  const currentUser = JSON.parse(localStorage.getItem('jn_current_user') || 'null');
  const userSkills = currentUser ? (currentUser.skills || []) : ["Java", "SQL", "Python"];

  container.innerHTML = jobs.map(job => {
    const isSaved = savedIds.includes(job.id);
    const matchScore = window.JobNepalDB.calculateMatchScore(userSkills, job.skills);

    return `
      <div class="job-card ${job.isFeatured ? 'featured-card' : ''}">
        <div class="company-logo-box">
          ${job.company.substring(0, 2).toUpperCase()}
        </div>

        <div class="job-info-main">
          <div class="job-header-row">
            <h3 class="job-card-title">
              <a href="job-details.html?id=${job.id}">${job.title}</a>
            </h3>
            ${job.isFeatured ? '<span class="badge badge-nepal">★ Featured</span>' : ''}
            <span class="badge badge-indigo">${job.workplaceType}</span>
            <span class="badge badge-success" title="Based on candidate skills profile">${matchScore}% Match</span>
          </div>

          <div class="company-subhead">${job.company}</div>

          <div class="job-meta-row">
            <span class="job-meta-item">📍 ${job.location}</span>
            <span class="job-meta-item">💼 ${job.jobType}</span>
            <span class="job-meta-item">⏱️ ${job.experience}</span>
            <span class="job-meta-item">📅 Apply by ${job.deadline}</span>
          </div>

          <div class="job-skills-tags">
            ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>

        <div class="job-card-actions">
          <div class="job-salary-display">${job.salaryFormatted}</div>
          <div class="job-card-btns">
            <button class="btn-bookmark ${isSaved ? 'active' : ''}" onclick="toggleBookmark('${job.id}', this)" title="Save Job">
              ${isSaved ? '❤️' : '🤍'}
            </button>
            <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">View Details</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleBookmark(jobId, btnElement) {
  const isSaved = window.JobNepalDB.toggleSaveJob(jobId);
  if (btnElement) {
    btnElement.classList.toggle('active', isSaved);
    btnElement.innerHTML = isSaved ? '❤️' : '🤍';
  }
  showToast(isSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks.', 'info');
}

// Job Details Page Renderer
function initJobDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get('id') || 'job-101';
  const job = window.JobNepalDB.getJobById(jobId);

  if (!job) {
    document.getElementById('jobDetailsContainer').innerHTML = `
      <div class="container section-padding" style="text-align: center;">
        <h2>Job vacancy not found</h2>
        <p style="color: var(--text-muted); margin: 1rem 0;">The job post you requested may have expired or was removed.</p>
        <a href="jobs.html" class="btn btn-primary">Browse All Jobs</a>
      </div>
    `;
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem('jn_current_user') || 'null');
  const userSkills = currentUser ? (currentUser.skills || []) : ["Java", "Python", "SQL"];
  const matchScore = window.JobNepalDB.calculateMatchScore(userSkills, job.skills);
  const isSaved = window.JobNepalDB.getSavedJobIds().includes(job.id);

  // Set page title
  document.title = `${job.title} at ${job.company} — Job Nepal`;

  const detailsContainer = document.getElementById('jobDetailsContainer');
  detailsContainer.innerHTML = `
    <div class="details-layout">
      <!-- Main Content -->
      <div class="details-main-card">
        <div class="details-header">
          <div style="display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 1.25rem;">
            <div class="company-logo-box" style="width: 72px; height: 72px; font-size: 1.5rem;">
              ${job.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 6px;">
                <span class="badge badge-primary">${job.category}</span>
                <span class="badge badge-indigo">${job.workplaceType}</span>
                ${job.isFeatured ? '<span class="badge badge-nepal">Featured Post</span>' : ''}
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 4px;">${job.title}</h1>
              <div style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600;">
                <a href="company-details.html?id=${job.companyId}">${job.company}</a> • 📍 ${job.location}
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md);">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Offered Salary</div>
              <div style="font-weight: 700; color: #047857;">${job.salaryFormatted}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Experience</div>
              <div style="font-weight: 700;">${job.experience}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Employment Type</div>
              <div style="font-weight: 700;">${job.jobType}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Deadline</div>
              <div style="font-weight: 700; color: var(--brand-crimson);">${job.deadline}</div>
            </div>
          </div>
        </div>

        <div class="content-block">
          <h3>Job Overview</h3>
          <p style="color: var(--text-muted); font-size: 1.02rem; line-height: 1.7;">${job.description}</p>
        </div>

        <div class="content-block">
          <h3>Key Responsibilities</h3>
          <ul>
            ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div class="content-block">
          <h3>Candidate Requirements</h3>
          <ul>
            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>

        <div class="content-block">
          <h3>Required Skills</h3>
          <div class="job-skills-tags" style="margin-top: 0.5rem;">
            ${job.skills.map(s => `<span class="skill-tag" style="font-size: 0.88rem; padding: 0.35rem 0.8rem;">${s}</span>`).join('')}
          </div>
        </div>

        <div class="content-block">
          <h3>Company Benefits & Perks</h3>
          <ul>
            ${job.benefits.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <!-- Action Bar -->
        <div style="display: flex; gap: 1rem; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1.8rem; margin-top: 2rem;">
          <button onclick="openApplyModal('${job.id}')" class="btn btn-primary btn-lg" style="flex: 1;">
            Apply for this Vacancy
          </button>
          <button class="btn btn-outline btn-lg" onclick="toggleBookmark('${job.id}', this)">
            ${isSaved ? '❤️ Saved' : '🤍 Save Job'}
          </button>
          <button class="btn btn-outline btn-lg" onclick="shareJob('${job.title}', window.location.href)">
            🔗 Share
          </button>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="details-sidebar-card">
        <!-- AI Match Box -->
        <div class="match-score-badge">
          <div class="match-circle">${matchScore}%</div>
          <div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #047857;">AI Match Score</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Matches your registered tech skills & background!</div>
          </div>
        </div>

        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem;">Company Summary</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
            Recognized Nepal corporate recruiter with fast hiring turnaround and verified company profile.
          </p>
          <a href="company-details.html?id=${job.companyId}" class="btn btn-outline btn-sm" style="width: 100%;">
            View Company Profile & Reviews
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color);">

        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem;">Need a Winning Resume?</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.85rem;">
            Use our built-in Nepali resume builder tailored for technical and corporate screening.
          </p>
          <a href="resume-builder.html" class="btn btn-crimson btn-sm" style="width: 100%;">
            Build Free Resume
          </a>
        </div>
      </div>
    </div>
  `;
}

// Modal Application Handling
function openApplyModal(jobId) {
  const job = window.JobNepalDB.getJobById(jobId);
  const currentUser = JSON.parse(localStorage.getItem('jn_current_user') || 'null');

  let modal = document.getElementById('applyModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'applyModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800;">Apply to ${job.company}</h3>
        <button onclick="closeApplyModal()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted);">✕</button>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">
        Applying for: <strong>${job.title}</strong> (${job.location})
      </p>

      <form id="submitAppForm">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" id="appFullName" class="form-control" value="${currentUser ? currentUser.name : ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" id="appEmail" class="form-control" value="${currentUser ? currentUser.email : ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Mobile Number (Nepal)</label>
          <input type="tel" id="appPhone" class="form-control" placeholder="+977 98XXXXXXXX" value="${currentUser ? currentUser.mobile || '' : '+977 98'}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Resume / CV Document</label>
          <input type="file" id="appResumeFile" class="form-control" accept=".pdf,.doc,.docx">
          <span style="font-size: 0.76rem; color: var(--text-muted);">Supported formats: PDF, DOCX (Max 5MB)</span>
        </div>
        <div class="form-group">
          <label class="form-label">Cover Note / Expected Salary (Optional)</label>
          <textarea id="appNote" class="form-control" rows="3" placeholder="Briefly introduce why you are the ideal fit for this role in Nepal..."></textarea>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 1.5rem;">
          <button type="button" onclick="closeApplyModal()" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Application</button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add('active');

  const form = document.getElementById('submitAppForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const app = {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicantName: document.getElementById('appFullName').value,
      email: document.getElementById('appEmail').value,
      phone: document.getElementById('appPhone').value,
      note: document.getElementById('appNote').value,
      location: currentUser ? currentUser.location : "Kathmandu",
      education: currentUser ? currentUser.education : "Bachelor Degree",
      experience: "2-4 Years",
      skills: job.skills.slice(0, 3)
    };

    window.JobNepalDB.addApplication(app);
    closeApplyModal();
    showToast(`Application successfully sent to ${job.company}! Track progress in your Dashboard.`, 'success');
  });
}

function closeApplyModal() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.remove('active');
}

function shareJob(title, url) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(`Link for "${title}" copied to clipboard!`, 'info');
    });
  } else {
    showToast(`Share URL: ${url}`, 'info');
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.toggleBookmark = toggleBookmark;
window.openApplyModal = openApplyModal;
window.closeApplyModal = closeApplyModal;
window.shareJob = shareJob;
