# Job Nepal — System Architecture & Modular Stack

Tagline: **"Find Your Job. Build Your Future."**

## Architecture Diagram

```
+---------------------------------------------------------------+
|                      Frontend Clients                         |
|   HTML5 / CSS3 / Vanilla JS (Responsive, Dark Mode, Toasts)  |
+-------------------------------+-------------------------------+
                                |
               REST API & Reverse Proxy (HTTP/JSON)
                                |
        +-----------------------+-----------------------+
        |                       |                       |
        v                       v                       v
+----------------+      +----------------+      +----------------+
|    Node.js     |      |    Python      |      |      Go        |
|  Express Core  |      |  AI Matcher    |      |  Search Engine |
|  Auth, JWT,    |<---->|  Flask/ML      |      |  In-Memory     |
|  Applications, |      |  (85% Score)   |      |  (<1ms query)  |
|  Vacancies     |      +----------------+      +----------------+
+-------+--------+
        |
        | Enterprise Audit & Compliance
        v
+----------------+
|     Java       |
| Spring/Core    |
| Labor Act 2074 |
+-------+--------+
        |
        v
+---------------------------------------------------------------+
|                      Relational Database                      |
|                 PostgreSQL / MySQL (20 Tables)                |
+---------------------------------------------------------------+
```

## Service Breakdown

1. **Frontend (`frontend/`)**:
   - Modern semantic HTML5, pure CSS design system, and modular JavaScript.
   - Built-in LocalStorage synchronization allowing instant offline and client-side testing, plus full REST API fallback connectivity.
   - Live A4 ATS Resume Builder with dynamic preview and PDF print styling.

2. **Node.js REST Service (`backend/node/`)**:
   - Primary gateway for User Authentication, JWT issuance, and Application status workflow (`Applied → Viewed → Shortlisted → Interview → Selected / Rejected`).

3. **Python AI Engine (`backend/python/`)**:
   - Microservice executing skills vector matching and Jaccard distance calculation between candidate profiles and job requirements.

4. **Go Microservice (`backend/go/`)**:
   - Ultra-fast concurrency search engine handling high throughput query filtering.

5. **Java Enterprise Service (`backend/java/`)**:
   - Enterprise audit verification ensuring salary listings comply with statutory Nepal Labor Act wage standards.

6. **Relational Database (`database/schema.sql`)**:
   - 20 normalized relational tables: `users`, `job_seekers`, `employers`, `companies`, `jobs`, `applications`, `resumes`, `skills`, `education`, `experience`, `saved_jobs`, `job_alerts`, `messages`, `notifications`, `payments`, `subscriptions`, `categories`, `locations`, `reviews`.
