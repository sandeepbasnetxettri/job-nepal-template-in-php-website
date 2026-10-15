# Job Nepal — REST API Documentation

Slogan: **"Find Your Job. Build Your Future."**

Base URL: `http://localhost:5000/api`

---

## 1. Authentication

### `POST /auth/register`
Register a candidate or employer account.

**Request Body (Job Seeker):**
```json
{
  "email": "sandeep.adhikari@example.com",
  "password": "secure_password",
  "role": "job_seeker",
  "name": "Sandeep Adhikari",
  "mobile": "+977 9841234567",
  "location": "Kathmandu",
  "skills": ["Java", "Spring Boot", "SQL"],
  "education": "Bachelor in Computer Engineering"
}
```

**Request Body (Employer):**
```json
{
  "email": "careers@cotiviti.com.np",
  "password": "secure_password",
  "role": "employer",
  "companyName": "Cotiviti Nepal Pvt. Ltd.",
  "mobile": "+977-1-4432100",
  "location": "Hattisar, Kathmandu",
  "industry": "Healthcare IT"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Sandeep Adhikari",
    "email": "sandeep.adhikari@example.com",
    "role": "job_seeker"
  }
}
```

### `POST /auth/login`
**Request Body:**
```json
{
  "identifier": "sandeep.adhikari@example.com",
  "password": "secure_password",
  "role": "job_seeker"
}
```

---

## 2. Job Vacancies

### `GET /jobs`
Filter and list vacancies.
- Query Parameters: `q`, `location`, `category`, `workplaceType`, `maxSalary`
- Example: `/api/jobs?q=Java&location=Kathmandu&maxSalary=200000`

### `GET /jobs/:id`
Retrieve full vacancy details, company bio, responsibilities, requirements, and benefits.

### `POST /jobs` *(Requires Employer Token)*
Publish a new vacancy into the Nepal job registry.

---

## 3. Applications & Workflow

### `POST /jobs/:id/apply`
Submit application to a company.
```json
{
  "applicantName": "Sandeep Adhikari",
  "email": "sandeep.adhikari@example.com",
  "phone": "+977 9841234567",
  "note": "Looking forward to contributing to healthcare analytics.",
  "skills": ["Java", "Spring Boot", "PostgreSQL"],
  "experience": "4 Years"
}
```

### `PUT /applications/:id/status` *(Requires Employer Token)*
Updates the candidate lifecycle:
- Statuses: `Applied` → `Viewed` → `Shortlisted` → `Interview` → `Selected` / `Rejected`
```json
{
  "status": "Interview",
  "interviewDate": "2026-10-12 at 2:00 PM (Zoom)"
}
```

---

## 4. AI Matching & Recommendations

### `POST /recommendations`
Calculates candidate match score percentage:
```json
{
  "skills": ["Python", "Django", "SQL"],
  "location": "Kathmandu",
  "experience_years": 3
}
```
**Response:**
```json
{
  "recommendations": [
    {
      "job": { "title": "Senior Python & AI Engineer", "company": "Leapfrog Technology" },
      "matchScore": 92,
      "matchingSkills": ["python", "django", "sql"]
    }
  ]
}
```
