# JOB NEPAL 🇳🇵
### *"Find Your Job. Build Your Future."*

A modern, professional, and responsive employment platform designed for job seekers, companies, recruiters, fresh graduates, and tech professionals across Nepal.

---

## 🌟 Key Features

- **Nepal-Focused Search & Filtering:** Filter by Nepal locations (*Kathmandu, Lalitpur, Bhaktapur, Pokhara, Chitwan, Butwal, Biratnagar, Birgunj, Dharan, Remote — Nepal*), monthly salary brackets in NPR, job types, and experience levels.
- **Dedicated Tech Stack Roles:** Direct access to JavaScript, Node.js, Python, Go, and Java vacancies.
- **AI Recommendation Engine:** Calculates candidate matching percentage (*e.g., "85% Match"*) based on skills, experience, and location affinity.
- **Applicant Lifecycle Tracking:** Real-time visual progress stepper:
  $$\text{Applied} \longrightarrow \text{Viewed} \longrightarrow \text{Shortlisted} \longrightarrow \text{Interview} \longrightarrow \text{Selected / Rejected}$$
- **Built-in ATS Resume Builder:** Interactive form with live A4 preview and 1-click PDF download/print.
- **Developer & Community Learning Hub:** Educational directory celebrating open-source creators (*Evan You, Dan Abramov, Rich Harris, Guillermo Rauch, etc.*), instructors (*Wes Bos, Kent C. Dodds, Brad Traversy, etc.*), and W3C web standards leaders.
- **Verified Nepal Companies Directory:** Profiles for *Cotiviti Nepal, Leapfrog Technology, F1Soft International, CloudFactory Nepal, Deerhold, eSewa, Fusemachines*, and *Ncell*.
- **Multi-Role Dashboards:** Seamless switching between Job Seeker, Recruiter/Employer, and Platform Admin control panels.
- **Security & Relational Database:** Full 20-table schema for PostgreSQL/MySQL with password hashing, JWT authentication, and role authorization.

---

## 📁 Project Structure

```
job-nepal/
│
├── frontend/
│   ├── index.html              # Homepage with hero, search, stats, categories, featured jobs
│   ├── jobs.html               # Find jobs page with dynamic sidebar filters
│   ├── job-details.html        # Job details, requirements, benefits & apply modal
│   ├── companies.html          # Verified Nepali companies directory & search
│   ├── company-details.html    # Company profile, open vacancies & reviews
│   ├── post-job.html           # Recruiter vacancy posting form
│   ├── login.html              # Account type selector & sign-in
│   ├── job-seeker-login.html   # Dedicated candidate login
│   ├── employer-login.html     # Dedicated employer login
│   ├── register.html           # Job seeker & employer registration
│   ├── dashboard.html          # Seeker, Employer & Admin dashboards
│   ├── profile.html            # Candidate profile, skills & experience editor
│   ├── resume-builder.html     # Built-in resume builder with live A4 preview
│   ├── applied-jobs.html       # Applied jobs status tracking & withdrawal
│   ├── saved-jobs.html         # Saved bookmarked jobs & quick apply
│   ├── recommended-jobs.html   # AI match engine & skill fit breakdowns
│   ├── job-alerts.html         # Custom keyword, salary & location alert rules
│   ├── messages.html           # Recruiter chat messenger with interactive threads
│   ├── application-status.html # Visual lifecycle recruitment pipeline tracker
│   ├── career.html             # CV tips, interview guides & 2026 salary benchmarks
│   ├── settings.html           # Security, 2FA, salary preferences & privacy
│   ├── job-seeker/             # Dedicated Job Seeker Portal
│   │   ├── index.html          # Job seeker portal entry / dashboard
│   │   ├── dashboard.html      # Seeker dashboard overview
│   │   ├── profile.html        # Profile, skills & experience editor
│   │   ├── resume-builder.html # Live ATS resume builder
│   │   ├── applied-jobs.html   # Applied vacancies & status
│   │   ├── saved-jobs.html     # Saved & bookmarked positions
│   │   ├── recommended-jobs.html # AI match recommendations
│   │   ├── job-alerts.html     # Custom keyword & salary alerts
│   │   ├── messages.html       # Recruiter chat messenger
│   │   ├── application-status.html # Visual recruitment pipeline
│   │   ├── career.html         # Career guides & salary benchmarks
│   │   └── settings.html       # Security, 2FA & preferences
│   ├── css/
│   │   └── style.css           # Modern design system, animations, dark mode
│   └── js/
│       ├── app.js              # Theme toggle, toast alerts, mobile navigation
│       ├── auth.js             # Registration, login, roles & session manager
│       ├── jobs.js             # Search filtering, bookmarking & apply workflow
│       ├── dashboard.js        # Multi-role dashboard engine & status updater
│       ├── resume-builder.js   # Dynamic resume state, A4 renderer & PDF export
│       └── mock-data.js        # Seed database, local storage store & AI score engine
│
├── backend/
│   ├── node/                   # Express REST API (Auth, JWT, Vacancies, Applications)
│   │   ├── package.json
│   │   └── server.js
│   ├── python/                 # AI / Job Matching microservice (Flask / ML)
│   │   ├── requirements.txt
│   │   └── app.py
│   ├── go/                     # High-performance in-memory search engine
│   │   └── main.go
│   └── java/                   # Enterprise compliance & Labor Act verification
│       └── JobNepalApplication.java
│
├── database/
│   ├── schema.sql              # Relational schema (20 PostgreSQL / MySQL tables)
│   └── seed.sql                # Initial seed data for Nepal employers & jobs
│
├── uploads/
│   └── resumes/                # Directory for candidate CV uploads
│
├── docs/
│   ├── API.md                  # Complete REST API endpoint reference
│   └── ARCHITECTURE.md         # Microservice architecture and data flow
│
├── index.html                  # Root entry redirect to frontend/index.html
└── README.md
```

---

## 🚀 How to Run Locally

### 1. View Frontend via XAMPP or Any Web Browser
Because you are located in `c:\xampp\htdocs\job nepal\`:
1. Start **Apache** in your XAMPP Control Panel.
2. Open your browser and navigate to:
   ```
   http://localhost/job%20nepal/
   ```
   Or directly open `c:\xampp\htdocs\job nepal\frontend\index.html` in any modern web browser.
3. The frontend is fully functional out-of-the-box with client-side reactive storage, bookmarking, job filtering, application submission, resume printing, and mock authentication with 1-click demo logins!

### 2. Run the Node.js REST API (Optional)
```bash
cd "c:\xampp\htdocs\job nepal\backend\node"
npm install
npm start
```
*API will be active at: `http://localhost:5000/api`*

### 3. Run the Python AI Recommendation Engine (Optional)
```bash
cd "c:\xampp\htdocs\job nepal\backend\python"
pip install -r requirements.txt
python app.py
```
*AI service will be active at: `http://localhost:5001/api/ai/recommend`*

### 4. Run the Go Search Worker (Optional)
```bash
cd "c:\xampp\htdocs\job nepal\backend\go"
go run main.go
```
*Go service will be active at: `http://localhost:5002/api/go/search`*

---

## 👥 Demo Accounts (One-Click Logins)

On the [Login Page](file:///c:/xampp/htdocs/job%20nepal/frontend/login.html), quick demo auto-fill buttons are provided:
- **Job Seeker:** `sandeep.adhikari@example.com` / `nepal12345`
- **Employer:** `recruiting@cotiviti.com.np` / `cotiviti123`
- **Admin:** `admin@jobnepal.gov.np` / `adminsecure`

---

## 📜 License
Developed for Nepal's growing technology and employment ecosystem. Licensed under the MIT License.
