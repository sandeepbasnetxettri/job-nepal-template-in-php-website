-- ==========================================================================
-- JOB NEPAL — Relational Database Schema (PostgreSQL / MySQL compatible)
-- Platform: "Find Your Job. Build Your Future."
-- ==========================================================================

-- 1. Users Table (Core Authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    mobile VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('job_seeker', 'employer', 'admin')),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Job Categories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    job_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Nepal Locations Table
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    province VARCHAR(50) NOT NULL,
    is_remote_hub BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    slug VARCHAR(191) NOT NULL UNIQUE,
    pan_number VARCHAR(50) UNIQUE,
    industry VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    banner_url VARCHAR(255),
    tagline VARCHAR(255),
    about_text TEXT,
    address VARCHAR(255),
    city VARCHAR(100) DEFAULT 'Kathmandu',
    contact_email VARCHAR(191),
    contact_phone VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 4.5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Employers Table (Profiles linked to Users)
CREATE TABLE IF NOT EXISTS employers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    designation VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Job Seekers Table
CREATE TABLE IF NOT EXISTS job_seekers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    current_title VARCHAR(150),
    city VARCHAR(100) DEFAULT 'Kathmandu',
    profile_summary TEXT,
    expected_salary_min INT,
    expected_salary_max INT,
    is_open_to_work BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL DEFAULT 'Standard Technical CV',
    objective TEXT,
    file_path VARCHAR(255),
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Skills Master & Seeker Skills Mapping
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS job_seeker_skills (
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    skill_id INT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(30) DEFAULT 'Intermediate',
    PRIMARY KEY (job_seeker_id, skill_id)
);

-- 9. Education History
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    degree VARCHAR(150) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    start_year INT,
    end_year INT,
    grade_or_percentage VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Experience History
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Jobs Vacancies Table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id),
    title VARCHAR(191) NOT NULL,
    workplace_type VARCHAR(20) NOT NULL CHECK (workplace_type IN ('Remote', 'On-site', 'Hybrid')),
    job_type VARCHAR(30) NOT NULL CHECK (job_type IN ('Full Time', 'Part Time', 'Contract', 'Internship')),
    location_city VARCHAR(100) NOT NULL DEFAULT 'Kathmandu',
    salary_min INT,
    salary_max INT,
    salary_currency VARCHAR(10) DEFAULT 'NPR',
    experience_required VARCHAR(50),
    education_required VARCHAR(150),
    description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    requirements TEXT NOT NULL,
    benefits TEXT,
    deadline DATE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Draft', 'Suspended')),
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Job Required Skills Mapping
CREATE TABLE IF NOT EXISTS job_skills (
    job_id INT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id INT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, skill_id)
);

-- 13. Applications Table (with full status tracker)
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    resume_id INT REFERENCES resumes(id),
    cover_note TEXT,
    status VARCHAR(30) DEFAULT 'Applied' CHECK (status IN ('Applied', 'Viewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected')),
    interview_scheduled_at TIMESTAMP WITH TIME ZONE,
    interview_platform VARCHAR(100),
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_id, job_seeker_id)
);

-- 14. Saved Jobs (Bookmarks)
CREATE TABLE IF NOT EXISTS saved_jobs (
    id SERIAL PRIMARY KEY,
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    job_id INT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_seeker_id, job_id)
);

-- 15. Job Alerts Table
CREATE TABLE IF NOT EXISTS job_alerts (
    id SERIAL PRIMARY KEY,
    job_seeker_id INT NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    keyword VARCHAR(150),
    category_id INT REFERENCES categories(id),
    city VARCHAR(100),
    frequency VARCHAR(20) DEFAULT 'Daily',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Messages Table (Candidate <-> Employer direct chat)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs(id),
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(191) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Subscriptions & Premium Plans
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    price_npr INT NOT NULL,
    featured_job_credits INT DEFAULT 0,
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active'
);

-- 19. Payments Table (eSewa / Khalti / Fonepay integration)
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id),
    user_id INT REFERENCES users(id),
    transaction_uuid VARCHAR(100) UNIQUE NOT NULL,
    payment_gateway VARCHAR(30) NOT NULL CHECK (payment_gateway IN ('eSewa', 'Khalti', 'Fonepay', 'BankTransfer')),
    amount_npr DECIMAL(10, 2) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Success' CHECK (status IN ('Pending', 'Success', 'Failed', 'Refunded')),
    gateway_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. Reviews & Ratings Table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_title VARCHAR(150),
    review_text TEXT NOT NULL,
    is_verified_employee BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location_city);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_seeker ON applications(job_seeker_id);
