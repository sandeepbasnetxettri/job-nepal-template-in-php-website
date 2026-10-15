# 🇳🇵 JOB NEPAL — Master Project Documentation Reference
> Complete file-by-file specification, microservice inventory, database schema, and operational guide for Job Nepal.

For the full authoritative manual and installation guide, refer to the root [README.md](file:///c:/xampp/htdocs/job%20nepal/README.md).

---

## 📁 System Component Catalog

### 1. Root Scripts & Entry Point
- [index.html](file:///c:/xampp/htdocs/job%20nepal/index.html): Immediate redirect to [frontend/index.html](file:///c:/xampp/htdocs/job%20nepal/frontend/index.html).
- [verify-all-links.js](file:///c:/xampp/htdocs/job%20nepal/verify-all-links.js): Scans 26 HTML files in `frontend/` to confirm all internal asset and navigation links exist.
- [verify-user-links.js](file:///c:/xampp/htdocs/job%20nepal/verify-user-links.js): Recursively scans both `frontend/` and `frontend/job-seeker/` (37 HTML files total) with 0 broken links.

---

### 2. Frontend Subsystem (`/frontend`)
- **Discovery**: [index.html](file:///c:/xampp/htdocs/job%20nepal/frontend/index.html), [jobs.html](file:///c:/xampp/htdocs/job%20nepal/frontend/jobs.html), [job-details.html](file:///c:/xampp/htdocs/job%20nepal/frontend/job-details.html), [companies.html](file:///c:/xampp/htdocs/job%20nepal/frontend/companies.html), [company-details.html](file:///c:/xampp/htdocs/job%20nepal/frontend/company-details.html).
- **Authentication**: [login.html](file:///c:/xampp/htdocs/job%20nepal/frontend/login.html), [register.html](file:///c:/xampp/htdocs/job%20nepal/frontend/register.html), [job-seeker-login.html](file:///c:/xampp/htdocs/job%20nepal/frontend/job-seeker-login.html), [employer-login.html](file:///c:/xampp/htdocs/job%20nepal/frontend/employer-login.html), [job-seeker-register.html](file:///c:/xampp/htdocs/job%20nepal/frontend/job-seeker-register.html), [company-register.html](file:///c:/xampp/htdocs/job%20nepal/frontend/company-register.html).
- **Candidate Hub**: [profile.html](file:///c:/xampp/htdocs/job%20nepal/frontend/profile.html), [resume-builder.html](file:///c:/xampp/htdocs/job%20nepal/frontend/resume-builder.html), [applied-jobs.html](file:///c:/xampp/htdocs/job%20nepal/frontend/applied-jobs.html), [saved-jobs.html](file:///c:/xampp/htdocs/job%20nepal/frontend/saved-jobs.html), [recommended-jobs.html](file:///c:/xampp/htdocs/job%20nepal/frontend/recommended-jobs.html), [job-alerts.html](file:///c:/xampp/htdocs/job%20nepal/frontend/job-alerts.html), [application-status.html](file:///c:/xampp/htdocs/job%20nepal/frontend/application-status.html).
- **Employer Hub**: [post-job.html](file:///c:/xampp/htdocs/job%20nepal/frontend/post-job.html), [employer-dashboard.html](file:///c:/xampp/htdocs/job%20nepal/frontend/employer-dashboard.html).
- **Shared & Community**: [dashboard.html](file:///c:/xampp/htdocs/job%20nepal/frontend/dashboard.html), [messages.html](file:///c:/xampp/htdocs/job%20nepal/frontend/messages.html), [career.html](file:///c:/xampp/htdocs/job%20nepal/frontend/career.html), [tech-learning.html](file:///c:/xampp/htdocs/job%20nepal/frontend/tech-learning.html), [settings.html](file:///c:/xampp/htdocs/job%20nepal/frontend/settings.html), [layout-template.html](file:///c:/xampp/htdocs/job%20nepal/frontend/layout-template.html).
- **Job Seeker Dedicated Directory**: [frontend/job-seeker/](file:///c:/xampp/htdocs/job%20nepal/frontend/job-seeker/).
- **Components**: [frontend/components/header.html](file:///c:/xampp/htdocs/job%20nepal/frontend/components/header.html), [frontend/components/footer.html](file:///c:/xampp/htdocs/job%20nepal/frontend/components/footer.html).
- **Design System**: [frontend/css/style.css](file:///c:/xampp/htdocs/job%20nepal/frontend/css/style.css), [frontend/css/login.css](file:///c:/xampp/htdocs/job%20nepal/frontend/css/login.css).
- **JavaScript Engines**: [app.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/app.js), [auth.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/auth.js), [jobs.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/jobs.js), [dashboard.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/dashboard.js), [resume-builder.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/resume-builder.js), [mock-data.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/mock-data.js), [login.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/login.js), [register.js](file:///c:/xampp/htdocs/job%20nepal/frontend/js/register.js).

---

### 3. Backend Microservices (`/backend`)
1. **Node.js REST Service** ([backend/node/server.js](file:///c:/xampp/htdocs/job%20nepal/backend/node/server.js)): Port 5000, JWT auth, application pipeline, vacancies CRUD.
2. **Python AI Engine** ([backend/python/app.py](file:///c:/xampp/htdocs/job%20nepal/backend/python/app.py)): Port 5001, Flask ML, multi-vector skill matching (50% skills, 20% exp, 15% loc, 15% edu).
3. **Go Search Service** ([backend/go/main.go](file:///c:/xampp/htdocs/job%20nepal/backend/go/main.go)): Port 5002, in-memory concurrency search with sub-millisecond query response.
4. **Java Enterprise Service** ([backend/java/JobNepalApplication.java](file:///c:/xampp/htdocs/job%20nepal/backend/java/JobNepalApplication.java)): Statutory audit verifier enforcing Nepal Labor Act 2074 minimum monthly wage limits.

---

### 4. Database Persistence Layer (`/database`)
1. [mysql_job_nepal.sql](file:///c:/xampp/htdocs/job%20nepal/database/mysql_job_nepal.sql): Complete 21-table MySQL/phpMyAdmin setup with foreign keys and seed records.
2. [schema.sql](file:///c:/xampp/htdocs/job%20nepal/database/schema.sql): ANSI SQL / PostgreSQL relational DDL definition.
3. [seed.sql](file:///c:/xampp/htdocs/job%20nepal/database/seed.sql): Initial data insertion statements.

---

### 5. Documentation & Uploads
- [docs/API.md](file:///c:/xampp/htdocs/job%20nepal/docs/API.md): Endpoint reference and sample JSON payloads.
- [docs/ARCHITECTURE.md](file:///c:/xampp/htdocs/job%20nepal/docs/ARCHITECTURE.md): Multi-tier architectural specifications.
- [uploads/resumes/](file:///c:/xampp/htdocs/job%20nepal/uploads/resumes/): Directory for candidate resumes.
