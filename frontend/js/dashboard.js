/**
 * JOB NEPAL — Dashboard Controller (Job Seeker, Employer & Admin views)
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

let currentRoleView = 'seeker'; // 'seeker' | 'employer' | 'admin'

function initDashboard() {
  const container = document.getElementById('dashboardRoot');
  if (!container) return;

  const currentUser = JSON.parse(localStorage.getItem('jn_current_user') || 'null');
  if (currentUser && currentUser.role) {
    currentRoleView = currentUser.role;
  }

  // Allow URL override ?role=seeker | employer | admin
  const urlParams = new URLSearchParams(window.location.search);
  const qRole = urlParams.get('role');
  if (qRole && ['seeker', 'employer', 'admin'].includes(qRole)) {
    currentRoleView = qRole;
  }

  renderDashboardLayout();
}

function setRoleView(role) {
  currentRoleView = role;
  renderDashboardLayout();
  showToast(`Switched view to ${role.toUpperCase()} dashboard mode`, 'info');
}

function renderDashboardLayout() {
  const container = document.getElementById('dashboardRoot');
  if (!container) return;

  const currentUser = JSON.parse(localStorage.getItem('jn_current_user') || 'null') || {
    name: currentRoleView === 'employer' ? 'Cotiviti HR Team' : (currentRoleView === 'admin' ? 'Nepal Labor Board Admin' : 'Sandeep Adhikari'),
    email: currentRoleView === 'employer' ? 'hr@cotiviti.com.np' : (currentRoleView === 'admin' ? 'admin@jobnepal.gov.np' : 'sandeep.adhikari@example.com'),
    role: currentRoleView
  };

  container.innerHTML = `
    <!-- Top Role Switcher Bar -->
    <div style="background: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 0.65rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem;">
        <span style="font-weight: 700; color: var(--text-muted);">Dashboard View:</span>
        <button class="btn btn-sm ${currentRoleView === 'seeker' ? 'btn-primary' : 'btn-outline'}" onclick="setRoleView('seeker')">
          👤 Job Seeker
        </button>
        <button class="btn btn-sm ${currentRoleView === 'employer' ? 'btn-primary' : 'btn-outline'}" onclick="setRoleView('employer')">
          🏢 Employer
        </button>
        <button class="btn btn-sm ${currentRoleView === 'admin' ? 'btn-crimson' : 'btn-outline'}" onclick="setRoleView('admin')">
          ⚡ Admin
        </button>
      </div>
      <div style="font-size: 0.84rem; color: var(--text-muted);">
        Signed in as: <strong style="color: var(--text-main);">${currentUser.name}</strong> (${currentUser.email})
      </div>
    </div>

    <div class="dashboard-layout">
      <!-- Sidebar Navigation -->
      <aside class="dash-sidebar">
        <div class="dash-user-card">
          <div class="dash-avatar">
            ${currentUser.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div style="font-weight: 700; font-size: 0.95rem;">${currentUser.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">
              ${currentRoleView} Account
            </div>
          </div>
        </div>

        <ul class="dash-nav" id="dashNavList">
          ${getNavItemsForRole(currentRoleView)}
        </ul>

        <div style="margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
          <a href="index.html" class="dash-nav-btn">
            <span>🏠</span> Back to Home
          </a>
          <button onclick="handleLogout()" class="dash-nav-btn" style="color: var(--brand-crimson);">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="dash-content" id="dashTabContent">
        ${getInitialTabContent(currentRoleView)}
      </main>
    </div>
  `;

  bindTabEvents();
}

function getNavItemsForRole(role) {
  if (role === 'seeker') {
    return `
      <li><button class="dash-nav-btn active" data-tab="tab-overview"><span>📊</span> Overview</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-applied"><span>📋</span> Applied Jobs</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-saved"><span>❤️</span> Saved Jobs</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-recommended"><span>🎯</span> Recommended (AI)</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-resume"><span>📄</span> My Resume</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-alerts"><span>🔔</span> Job Alerts</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-messages"><span>💬</span> Messages</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-settings"><span>⚙️</span> Settings</button></li>
    `;
  } else if (role === 'employer') {
    return `
      <li><button class="dash-nav-btn active" data-tab="tab-emp-overview"><span>📊</span> Overview & Metrics</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-emp-jobs"><span>💼</span> Manage Jobs</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-emp-applicants"><span>👥</span> Applicants Tracker</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-emp-interviews"><span>🗓️</span> Interviews</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-emp-profile"><span>🏢</span> Company Profile</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-emp-premium"><span>⭐</span> Premium & Boost</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-emp-messages"><span>💬</span> Messages</button></li>
    `;
  } else {
    // Admin
    return `
      <li><button class="dash-nav-btn active" data-tab="tab-adm-stats"><span>📈</span> Platform Statistics</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-adm-jobs"><span>📋</span> Moderate Jobs</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-adm-users"><span>👥</span> Manage Users</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-adm-companies"><span>🏢</span> Companies</button></li>
      <li><button class="dash-nav-btn" data-tab="tab-adm-payments"><span>💳</span> Payments & Subscriptions</button></li>
    `;
  }
}

function bindTabEvents() {
  const buttons = document.querySelectorAll('.dash-nav-btn[data-tab]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      loadTabContent(targetId);
    });
  });
}

function loadTabContent(tabId) {
  const contentEl = document.getElementById('dashTabContent');
  if (!contentEl) return;

  if (tabId === 'tab-overview') contentEl.innerHTML = renderSeekerOverview();
  else if (tabId === 'tab-applied') contentEl.innerHTML = renderSeekerAppliedJobs();
  else if (tabId === 'tab-saved') contentEl.innerHTML = renderSeekerSavedJobs();
  else if (tabId === 'tab-recommended') contentEl.innerHTML = renderSeekerRecommendedJobs();
  else if (tabId === 'tab-resume') contentEl.innerHTML = renderSeekerResumeSection();
  else if (tabId === 'tab-alerts') contentEl.innerHTML = renderSeekerAlerts();
  else if (tabId === 'tab-messages') contentEl.innerHTML = renderMessagesSection();
  else if (tabId === 'tab-settings') contentEl.innerHTML = renderSeekerSettings();
  
  // Employer Tabs
  else if (tabId === 'tab-emp-overview') contentEl.innerHTML = renderEmployerOverview();
  else if (tabId === 'tab-emp-jobs') contentEl.innerHTML = renderEmployerJobs();
  else if (tabId === 'tab-emp-applicants') contentEl.innerHTML = renderEmployerApplicants();
  else if (tabId === 'tab-emp-interviews') contentEl.innerHTML = renderEmployerInterviews();
  else if (tabId === 'tab-emp-profile') contentEl.innerHTML = renderEmployerProfile();
  else if (tabId === 'tab-emp-premium') contentEl.innerHTML = renderEmployerPremium();
  else if (tabId === 'tab-emp-messages') contentEl.innerHTML = renderMessagesSection();

  // Admin Tabs
  else if (tabId === 'tab-adm-stats') contentEl.innerHTML = renderAdminStats();
  else if (tabId === 'tab-adm-jobs') contentEl.innerHTML = renderAdminJobs();
  else if (tabId === 'tab-adm-users') contentEl.innerHTML = renderAdminUsers();
  else if (tabId === 'tab-adm-companies') contentEl.innerHTML = renderAdminCompanies();
  else if (tabId === 'tab-adm-payments') contentEl.innerHTML = renderAdminPayments();
}

function getInitialTabContent(role) {
  if (role === 'seeker') return renderSeekerOverview();
  if (role === 'employer') return renderEmployerOverview();
  return renderAdminStats();
}

/* ==========================================================================
   Job Seeker Views
   ========================================================================== */
function renderSeekerOverview() {
  const apps = window.JobNepalDB.getApplications();
  const saved = window.JobNepalDB.getSavedJobIds();
  const jobs = window.JobNepalDB.getJobs();

  return `
    <div>
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.7rem; font-weight: 800; margin-bottom: 4px;">Welcome back, Sandeep! 🇳🇵</h2>
        <p style="color: var(--text-muted);">Here is an overview of your active applications and recommended tech roles in Nepal.</p>
      </div>

      <!-- Quick Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2.2rem;">
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Applied Vacancies</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--primary); margin: 6px 0;">${apps.length}</div>
          <div style="font-size: 0.78rem; color: var(--success); font-weight: 600;">1 Scheduled Interview</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Saved Bookmarks</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--brand-crimson); margin: 6px 0;">${saved.length}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Jobs you bookmarked</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Resume Profile</div>
          <div style="font-size: 2rem; font-weight: 800; color: #10b981; margin: 6px 0;">90%</div>
          <div style="font-size: 0.78rem; color: var(--success); font-weight: 600;">Profile Complete</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Profile Views</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-indigo); margin: 6px 0;">28</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Viewed by Nepal Recruiters</div>
        </div>
      </div>

      <!-- Recent Applications Tracker -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.8rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="font-size: 1.2rem; font-weight: 800;">Recent Applications & Status</h3>
          <button onclick="document.querySelector('[data-tab=\\'tab-applied\\']').click()" class="btn btn-outline btn-sm">View All</button>
        </div>
        ${renderApplicationCardsSnippet(apps.slice(0, 2))}
      </div>

      <!-- Recommended Jobs Widget -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.8rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1.25rem;">Top AI Matches for Your Skills</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${jobs.slice(0, 2).map(j => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md);">
              <div>
                <a href="job-details.html?id=${j.id}" style="font-weight: 700; color: var(--text-main); font-size: 1.05rem;">${j.title}</a>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${j.company} • 📍 ${j.location} • ${j.salaryFormatted}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-success">92% Match</span>
                <a href="job-details.html?id=${j.id}" class="btn btn-primary btn-sm">Apply</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSeekerAppliedJobs() {
  const apps = window.JobNepalDB.getApplications();
  return `
    <div>
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.6rem; font-weight: 800;">My Job Applications</h2>
        <p style="color: var(--text-muted);">Track your application lifecycle in real-time across recruiters in Nepal.</p>
      </div>

      ${apps.length === 0 ? `
        <div style="background: var(--bg-surface); padding: 3rem; text-align: center; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <p style="color: var(--text-muted); margin-bottom: 1rem;">You have not applied for any jobs yet.</p>
          <a href="jobs.html" class="btn btn-primary">Search Vacancies</a>
        </div>
      ` : renderApplicationCardsSnippet(apps)}
    </div>
  `;
}

function renderApplicationCardsSnippet(apps) {
  const steps = ["Applied", "Viewed", "Shortlisted", "Interview", "Selected"];

  return apps.map(app => {
    const currentIndex = steps.indexOf(app.status);
    const activeIdx = currentIndex !== -1 ? currentIndex : (app.status === 'Rejected' ? 4 : 0);

    return `
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.4rem; margin-bottom: 1rem; background: var(--bg-surface);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">
              <a href="job-details.html?id=${app.jobId}">${app.jobTitle}</a>
            </h4>
            <div style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">
              ${app.company} • Applied on ${app.appliedDate}
            </div>
          </div>
          <span class="badge ${app.status === 'Shortlisted' ? 'badge-primary' : (app.status === 'Interview' ? 'badge-success' : 'badge-subtle')}">
            Status: ${app.status}
          </span>
        </div>

        ${app.interviewDate ? `
          <div style="margin-top: 0.8rem; background: var(--success-light); color: #047857; padding: 0.6rem 0.9rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600;">
            📅 Scheduled Interview: ${app.interviewDate}
          </div>
        ` : ''}

        <!-- Status Stepper Bar: Applied → Viewed → Shortlisted → Interview → Selected / Rejected -->
        <div class="status-tracker">
          ${steps.map((step, idx) => {
            let stateClass = '';
            if (idx < activeIdx) stateClass = 'completed';
            else if (idx === activeIdx) stateClass = 'active';

            return `
              <div class="status-step ${stateClass}">
                <div class="step-node">${idx < activeIdx ? '✓' : (idx + 1)}</div>
                <div class="step-label">${step}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderSeekerSavedJobs() {
  const savedIds = window.JobNepalDB.getSavedJobIds();
  const allJobs = window.JobNepalDB.getJobs();
  const savedJobs = allJobs.filter(j => savedIds.includes(j.id));

  return `
    <div>
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.6rem; font-weight: 800;">Saved Vacancies (${savedJobs.length})</h2>
        <p style="color: var(--text-muted);">Jobs you have bookmarked to review or apply for later.</p>
      </div>

      ${savedJobs.length === 0 ? `
        <div style="background: var(--bg-surface); padding: 3rem; text-align: center; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <p style="color: var(--text-muted); margin-bottom: 1rem;">No saved jobs yet.</p>
          <a href="jobs.html" class="btn btn-primary">Browse Jobs</a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${savedJobs.map(job => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.35rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 4px;">
                  <a href="job-details.html?id=${job.id}">${job.title}</a>
                </h3>
                <div style="font-size: 0.88rem; color: var(--text-muted);">${job.company} • 📍 ${job.location} • 💼 ${job.jobType}</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #047857; margin-top: 6px;">${job.salaryFormatted}</div>
              </div>
              <div style="display: flex; gap: 10px;">
                <button onclick="window.JobNepalDB.toggleSaveJob('${job.id}'); loadTabContent('tab-saved'); showToast('Removed from saved', 'info');" class="btn btn-outline btn-sm">Remove</button>
                <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">Apply Now</a>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function renderSeekerRecommendedJobs() {
  const jobs = window.JobNepalDB.getJobs();
  return `
    <div>
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.6rem; font-weight: 800;">Recommended Jobs (Python ML Engine) 🎯</h2>
        <p style="color: var(--text-muted);">
          Calculated using skills, experience, location, and application history.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${jobs.map((job, idx) => {
          const matchPercent = 95 - (idx * 4);
          return `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                  <h3 style="font-size: 1.15rem; font-weight: 700;"><a href="job-details.html?id=${job.id}">${job.title}</a></h3>
                  <span class="badge badge-success">${matchPercent}% Match</span>
                </div>
                <div style="font-size: 0.88rem; color: var(--text-muted);">${job.company} • 📍 ${job.location} • ${job.jobType}</div>
                <div style="display: flex; gap: 6px; margin-top: 8px;">
                  ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
              </div>
              <div>
                <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">View Vacancy</a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderSeekerResumeSection() {
  return `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">My Resume & CV Profile</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Create, preview and export your professional resume tailored for Nepali employers.</p>

      <div style="border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 2rem; text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📄</div>
        <h4 style="font-weight: 700;">Standard Technical CV (Updated 2026)</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Format: ATS-Compliant PDF • Ready for Instant Applications</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <a href="resume-builder.html" class="btn btn-primary btn-sm">Open Resume Builder</a>
          <button onclick="window.print()" class="btn btn-outline btn-sm">Print / Download PDF</button>
        </div>
      </div>
    </div>
  `;
}

function renderSeekerAlerts() {
  return `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Job Alerts & Notifications</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Get notified whenever new matching jobs are published in Nepal.</p>

      <div class="form-group">
        <label class="form-label">Alert Keyword / Skill</label>
        <input type="text" class="form-control" value="Java, Spring Boot, Python, React">
      </div>
      <div class="form-group">
        <label class="form-label">Target Location</label>
        <select class="form-control">
          <option>Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur)</option>
          <option>Remote — Nepal</option>
          <option>Pokhara</option>
          <option>All Nepal</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Notification Frequency</label>
        <select class="form-control">
          <option>Instant (As soon as job is approved)</option>
          <option>Daily Digest (8:00 AM)</option>
          <option>Weekly Summary</option>
        </select>
      </div>
      <button onclick="showToast('Job Alert settings saved!', 'success')" class="btn btn-primary">Save Alert Preferences</button>
    </div>
  `;
}

function renderSeekerSettings() {
  const user = JSON.parse(localStorage.getItem('jn_current_user') || '{}');
  return `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); max-width: 680px;">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Account Settings</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Manage your contact info, skills, and password security.</p>

      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" id="setUserName" class="form-control" value="${user.name || 'Sandeep Adhikari'}">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-control" value="${user.email || 'sandeep@example.com'}" disabled>
      </div>
      <div class="form-group">
        <label class="form-label">Location in Nepal</label>
        <input type="text" id="setUserLoc" class="form-control" value="${user.location || 'Kathmandu'}">
      </div>
      <div class="form-group">
        <label class="form-label">Technical Skills (Comma separated)</label>
        <input type="text" id="setUserSkills" class="form-control" value="${(user.skills || ['Java', 'Spring Boot', 'Python', 'SQL']).join(', ')}">
      </div>
      <button onclick="saveAccountSettings()" class="btn btn-primary">Update Profile</button>
    </div>
  `;
}

function saveAccountSettings() {
  const user = JSON.parse(localStorage.getItem('jn_current_user') || '{}');
  const name = document.getElementById('setUserName').value;
  const loc = document.getElementById('setUserLoc').value;
  const skills = document.getElementById('setUserSkills').value.split(',').map(s => s.trim()).filter(Boolean);

  user.name = name;
  user.location = loc;
  user.skills = skills;
  localStorage.setItem('jn_current_user', JSON.stringify(user));

  showToast('Profile information successfully updated!', 'success');
  renderDashboardLayout();
}

/* ==========================================================================
   Employer Views
   ========================================================================== */
function renderEmployerOverview() {
  const apps = window.JobNepalDB.getApplications();
  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.7rem; font-weight: 800; margin-bottom: 4px;">Employer Dashboard — Cotiviti Nepal</h2>
          <p style="color: var(--text-muted);">Manage your job vacancies, candidate applications, and hiring pipeline.</p>
        </div>
        <a href="post-job.html" class="btn btn-crimson">+ Post New Vacancy</a>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Active Vacancies</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--primary); margin: 6px 0;">6</div>
          <div style="font-size: 0.78rem; color: var(--success); font-weight: 600;">All approved & live</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Total Applicants</div>
          <div style="font-size: 2rem; font-weight: 800; color: #10b981; margin: 6px 0;">${apps.length + 42}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Received this month</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Shortlisted</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-indigo); margin: 6px 0;">14</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Pending interview</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Interviews Conducted</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--warning); margin: 6px 0;">8</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">2 offers pending</div>
        </div>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.8rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1.25rem;">Candidate Pipeline Tracker</h3>
        ${renderEmployerApplicantsTable(apps)}
      </div>
    </div>
  `;
}

function renderEmployerJobs() {
  const jobs = window.JobNepalDB.getJobs();
  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.6rem; font-weight: 800;">Manage Posted Vacancies</h2>
          <p style="color: var(--text-muted);">Active, drafts, and past job openings for your organization.</p>
        </div>
        <a href="post-job.html" class="btn btn-primary btn-sm">+ Post Vacancy</a>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-color); background: var(--bg-subtle);">
              <th style="padding: 1rem;">Job Title</th>
              <th style="padding: 1rem;">Category</th>
              <th style="padding: 1rem;">Location</th>
              <th style="padding: 1rem;">Applicants</th>
              <th style="padding: 1rem;">Status</th>
              <th style="padding: 1rem;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${jobs.map(job => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 1rem; font-weight: 700;">
                  <a href="job-details.html?id=${job.id}">${job.title}</a>
                </td>
                <td style="padding: 1rem; color: var(--text-muted);">${job.category}</td>
                <td style="padding: 1rem; color: var(--text-muted);">${job.location}</td>
                <td style="padding: 1rem; font-weight: 700; color: var(--primary);">12 Applicants</td>
                <td style="padding: 1rem;"><span class="badge badge-success">Active</span></td>
                <td style="padding: 1rem;">
                  <div style="display: flex; gap: 6px;">
                    <a href="job-details.html?id=${job.id}" class="btn btn-outline btn-sm">View</a>
                    <button onclick="showToast('Job boosted for 7 days!', 'success')" class="btn btn-crimson btn-sm">⚡ Boost</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderEmployerApplicants() {
  const apps = window.JobNepalDB.getApplications();
  return `
    <div>
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.6rem; font-weight: 800;">Candidate Applications</h2>
        <p style="color: var(--text-muted);">Review resumes, adjust status, and schedule candidate interviews.</p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.4rem;">
        ${renderEmployerApplicantsTable(apps)}
      </div>
    </div>
  `;
}

function renderEmployerApplicantsTable(apps) {
  if (apps.length === 0) {
    return `<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No applicants yet.</p>`;
  }

  return `
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-color); background: var(--bg-subtle);">
            <th style="padding: 0.85rem;">Candidate</th>
            <th style="padding: 0.85rem;">Position</th>
            <th style="padding: 0.85rem;">Experience & Skills</th>
            <th style="padding: 0.85rem;">Location</th>
            <th style="padding: 0.85rem;">Status Workflow</th>
            <th style="padding: 0.85rem;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${apps.map(app => `
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.85rem;">
                <div style="font-weight: 700;">${app.applicantName}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${app.email}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${app.phone}</div>
              </td>
              <td style="padding: 0.85rem; font-weight: 600;">${app.jobTitle}</td>
              <td style="padding: 0.85rem;">
                <div>${app.experience || '3 Years'}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${(app.skills || []).join(', ')}</div>
              </td>
              <td style="padding: 0.85rem; color: var(--text-muted);">${app.location || 'Kathmandu'}</td>
              <td style="padding: 0.85rem;">
                <select onchange="updateCandidateStatus('${app.id}', this.value)" class="form-control" style="padding: 0.35rem 0.6rem; font-size: 0.85rem;">
                  <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
                  <option value="Viewed" ${app.status === 'Viewed' ? 'selected' : ''}>Viewed</option>
                  <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                  <option value="Interview" ${app.status === 'Interview' ? 'selected' : ''}>Interview</option>
                  <option value="Selected" ${app.status === 'Selected' ? 'selected' : ''}>Selected</option>
                  <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                </select>
              </td>
              <td style="padding: 0.85rem;">
                <button onclick="scheduleInterviewPrompt('${app.id}', '${app.applicantName}')" class="btn btn-outline btn-sm">Schedule</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function updateCandidateStatus(appId, newStatus) {
  window.JobNepalDB.updateApplicationStatus(appId, newStatus);
  showToast(`Candidate status updated to: ${newStatus}`, 'success');
}

function scheduleInterviewPrompt(appId, name) {
  const dateStr = prompt(`Schedule interview for ${name}:\nEnter Date & Time (e.g., 2026-10-12 at 3:00 PM via Zoom):`, "2026-10-12 at 2:00 PM (Zoom)");
  if (dateStr) {
    const apps = window.JobNepalDB.getApplications();
    const app = apps.find(a => a.id === appId);
    if (app) {
      app.status = 'Interview';
      app.interviewDate = dateStr;
      localStorage.setItem('jn_applications', JSON.stringify(apps));
      showToast(`Interview scheduled with ${name} for ${dateStr}! Notification sent.`, 'success');
      renderDashboardLayout();
    }
  }
}

function renderEmployerInterviews() {
  return `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Scheduled Interviews</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Upcoming technical rounds and manager interactions.</p>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700; font-size: 1.05rem;">Sandeep Adhikari — Senior Java Developer</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">📅 Monday, Oct 6, 2026 • 2:00 PM – 3:00 PM (NPT)</div>
            <div style="font-size: 0.85rem; color: var(--primary);">Platform: Zoom Video Meeting</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Starting Zoom interview room...', 'info')">Join Room</button>
        </div>
      </div>
    </div>
  `;
}

function renderEmployerProfile() {
  return `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); max-width: 720px;">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Company Profile Information</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">This information will be displayed to thousands of job seekers in Nepal.</p>

      <div class="form-group">
        <label class="form-label">Company Legal Name</label>
        <input type="text" class="form-control" value="Cotiviti Nepal Pvt. Ltd.">
      </div>
      <div class="form-group">
        <label class="form-label">Industry</label>
        <input type="text" class="form-control" value="Healthcare IT & Analytics">
      </div>
      <div class="form-group">
        <label class="form-label">Registered Office Location</label>
        <input type="text" class="form-control" value="Hattisar, Kathmandu, Nepal">
      </div>
      <div class="form-group">
        <label class="form-label">Website URL</label>
        <input type="url" class="form-control" value="https://www.cotiviti.com.np">
      </div>
      <div class="form-group">
        <label class="form-label">Company Bio / About</label>
        <textarea class="form-control" rows="4">Cotiviti Nepal delivers high-tier healthcare analytics, payment accuracy solutions, and scalable enterprise technology engineering from Kathmandu.</textarea>
      </div>
      <button onclick="showToast('Company profile updated!', 'success')" class="btn btn-primary">Save Company Profile</button>
    </div>
  `;
}

function renderEmployerPremium() {
  return `
    <div>
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.6rem; font-weight: 800;">Premium Recruitment Services</h2>
        <p style="color: var(--text-muted);">Attract 5x more qualified candidates across Nepal with recruitment boost packages.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.8rem;">
          <span class="badge badge-primary">Standard</span>
          <h3 style="font-size: 1.3rem; margin: 0.8rem 0;">Free Postings</h3>
          <div style="font-size: 1.7rem; font-weight: 800; margin-bottom: 1rem;">Rs. 0</div>
          <ul style="color: var(--text-muted); font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
            <li>✓ Post up to 5 job vacancies</li>
            <li>✓ Standard listing for 30 days</li>
            <li>✓ Basic applicant tracking</li>
          </ul>
          <button class="btn btn-outline" style="width: 100%;" disabled>Current Active Tier</button>
        </div>

        <div style="background: var(--bg-surface); border: 2px solid var(--brand-crimson); border-radius: var(--radius-lg); padding: 1.8rem; position: relative;">
          <span class="badge badge-nepal" style="position: absolute; top: -12px; right: 20px;">Popular in Nepal</span>
          <span class="badge badge-nepal">Featured Boost</span>
          <h3 style="font-size: 1.3rem; margin: 0.8rem 0;">Pro Recruiter</h3>
          <div style="font-size: 1.7rem; font-weight: 800; color: var(--brand-crimson); margin-bottom: 1rem;">Rs. 4,999 <span style="font-size: 0.9rem; color: var(--text-muted);">/ job</span></div>
          <ul style="color: var(--text-muted); font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
            <li>✓ Top placement in Featured Jobs banner</li>
            <li>✓ Highlighted Crimson Badge</li>
            <li>✓ Instant email alert to 15,000+ matching candidates</li>
            <li>✓ Candidate resume search access</li>
          </ul>
          <button onclick="showToast('Simulated payment gateway: eSewa / Khalti connected!', 'success')" class="btn btn-crimson" style="width: 100%;">Upgrade via eSewa / Fonepay</button>
        </div>
      </div>
    </div>
  `;
}

function renderMessagesSection() {
  return `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); height: 500px; display: grid; grid-template-columns: 240px 1fr;">
      <div style="border-right: 1px solid var(--border-color); padding: 1rem;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem;">Direct Messages</h4>
        <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: var(--radius-md); cursor: pointer;">
          <div style="font-weight: 700; font-size: 0.9rem;">Cotiviti Hiring Team</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Thank you for applying...</div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem;">
        <div>
          <div style="font-weight: 700; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem;">
            Conversation with Cotiviti Hiring Team
          </div>
          <div style="background: var(--bg-subtle); padding: 0.85rem; border-radius: var(--radius-md); max-width: 450px; font-size: 0.9rem;">
            Namaste Sandeep! We reviewed your profile and Java experience. We would love to schedule a technical chat for Monday. Please confirm your availability.
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="chatMsgInput" class="form-control" placeholder="Type your response...">
          <button onclick="sendMockChat()" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  `;
}

function sendMockChat() {
  const input = document.getElementById('chatMsgInput');
  if (input && input.value.trim()) {
    showToast('Message sent to recruiter!', 'success');
    input.value = '';
  }
}

/* ==========================================================================
   Admin Views
   ========================================================================== */
function renderAdminStats() {
  return `
    <div>
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.7rem; font-weight: 800; margin-bottom: 4px;">Platform Admin Control Panel 🇳🇵</h2>
        <p style="color: var(--text-muted);">Comprehensive system overview, moderation, metrics, and Nepal employment registry.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Total Registered Users</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: var(--primary); margin: 6px 0;">95,420</div>
          <div style="font-size: 0.78rem; color: var(--success); font-weight: 600;">+1,250 this week</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Verified Companies</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: #10b981; margin: 6px 0;">1,840</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">98% PAN verified</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Active Job Vacancies</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: var(--accent-indigo); margin: 6px 0;">12,450</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Across 14 Nepal districts</div>
        </div>
        <div style="background: var(--bg-surface); padding: 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Total Applications</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: var(--brand-crimson); margin: 6px 0;">340,890</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Platform lifetime</div>
        </div>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.8rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1.25rem;">Recent Moderation Requests</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">All newly posted vacancies are checked for Nepal Labor Act compliance and verified salary brackets.</p>
      </div>
    </div>
  `;
}

function renderAdminJobs() {
  const jobs = window.JobNepalDB.getJobs();
  return `
    <div>
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem;">Moderate Job Vacancies</h2>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.4rem;">
        ${jobs.map(j => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid var(--border-color);">
            <div>
              <strong>${j.title}</strong> — ${j.company} (📍 ${j.location})
            </div>
            <div style="display: flex; gap: 8px;">
              <span class="badge badge-success">Approved</span>
              <button onclick="showToast('Job listing hidden for review', 'warning')" class="btn btn-outline btn-sm">Flag / Suspend</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAdminUsers() {
  return `
    <div>
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem;">Registered Candidates & Role Management</h2>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem;">
        <p style="color: var(--text-muted);">Admin can view seeker profiles, suspend accounts, and audit authentication tokens.</p>
      </div>
    </div>
  `;
}

function renderAdminCompanies() {
  const companies = window.JobNepalDB.getCompanies();
  return `
    <div>
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem;">Verified Nepal Companies (${companies.length})</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
        ${companies.map(c => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md);">
            <div style="font-weight: 700; font-size: 1.05rem;">${c.name}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">${c.industry} • ${c.location}</div>
            <div style="font-size: 0.85rem; color: var(--primary); margin-top: 6px;">${c.vacanciesCount} Open Vacancies</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAdminPayments() {
  return `
    <div style="background: var(--bg-surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Subscription & Payment Gateway Audits</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Integration logs with eSewa, Khalti, and Fonepay merchant accounts.</p>
      <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-family: monospace; font-size: 0.85rem;">
        [2026-10-01 08:30:12] eSewa Merchant Gateway: Status 200 OK | Rs. 4,999 received from Cotiviti Nepal for Featured Job Boost #101
      </div>
    </div>
  `;
}

window.setRoleView = setRoleView;
window.loadTabContent = loadTabContent;
window.updateCandidateStatus = updateCandidateStatus;
window.scheduleInterviewPrompt = scheduleInterviewPrompt;
window.sendMockChat = sendMockChat;
window.saveAccountSettings = saveAccountSettings;
