-- ==========================================================================
-- JOB NEPAL — Complete MySQL & phpMyAdmin Database Setup (All-in-One)
-- Platform: "Find Your Job. Build Your Future."
-- Compatibility: MySQL 5.7+, MySQL 8.0+, MariaDB 10.x, phpMyAdmin (XAMPP)
-- ==========================================================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS `job_nepal_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `job_nepal_db`;

-- Disable Foreign Key checks during table creation
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------------
-- Table 1: Users (Authentication & Roles)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `mobile` VARCHAR(50) UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('job_seeker', 'employer', 'admin') NOT NULL DEFAULT 'job_seeker',
    `is_active` TINYINT(1) DEFAULT 1,
    `is_verified` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 2: Job Categories
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `icon` VARCHAR(50) DEFAULT NULL,
    `job_count` INT DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 3: Nepal Locations
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `city` VARCHAR(100) NOT NULL,
    `district` VARCHAR(100) NOT NULL,
    `province` VARCHAR(50) NOT NULL,
    `is_remote_hub` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 4: Companies
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `pan_number` VARCHAR(50) UNIQUE,
    `industry` VARCHAR(100) NOT NULL,
    `website` VARCHAR(255),
    `logo_url` VARCHAR(255),
    `banner_url` VARCHAR(255),
    `tagline` VARCHAR(255),
    `about_text` TEXT,
    `address` VARCHAR(255),
    `city` VARCHAR(100) DEFAULT 'Kathmandu',
    `contact_email` VARCHAR(191),
    `contact_phone` VARCHAR(50),
    `is_verified` TINYINT(1) DEFAULT 1,
    `rating` DECIMAL(2,1) DEFAULT 4.5,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 5: Employers (Recruiters)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `employers`;
CREATE TABLE `employers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `company_id` INT NOT NULL,
    `designation` VARCHAR(100),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 6: Job Seekers
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `job_seekers`;
CREATE TABLE `job_seekers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `current_title` VARCHAR(150),
    `city` VARCHAR(100) DEFAULT 'Kathmandu',
    `profile_summary` TEXT,
    `expected_salary_min` INT,
    `expected_salary_max` INT,
    `is_open_to_work` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 7: Resumes (ATS Formats & CV Uploads)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `resumes`;
CREATE TABLE `resumes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `job_seeker_id` INT NOT NULL,
    `title` VARCHAR(150) NOT NULL DEFAULT 'Standard Technical CV',
    `objective` TEXT,
    `file_path` VARCHAR(255),
    `is_primary` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 8: Skills Master & Mappings
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `job_seeker_skills`;
CREATE TABLE `job_seeker_skills` (
    `job_seeker_id` INT NOT NULL,
    `skill_id` INT NOT NULL,
    `proficiency_level` VARCHAR(30) DEFAULT 'Intermediate',
    PRIMARY KEY (`job_seeker_id`, `skill_id`),
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 9: Education History
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `job_seeker_id` INT NOT NULL,
    `degree` VARCHAR(150) NOT NULL,
    `institution` VARCHAR(200) NOT NULL,
    `start_year` INT,
    `end_year` INT,
    `grade_or_percentage` VARCHAR(50),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 10: Experience History
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `experience`;
CREATE TABLE `experience` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `job_seeker_id` INT NOT NULL,
    `company_name` VARCHAR(200) NOT NULL,
    `job_title` VARCHAR(150) NOT NULL,
    `location` VARCHAR(100),
    `start_date` DATE,
    `end_date` DATE,
    `is_current` TINYINT(1) DEFAULT 0,
    `description` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 11: Jobs / Vacancies
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT NOT NULL,
    `category_id` INT,
    `title` VARCHAR(191) NOT NULL,
    `workplace_type` ENUM('Remote', 'On-site', 'Hybrid') NOT NULL DEFAULT 'On-site',
    `job_type` ENUM('Full Time', 'Part Time', 'Contract', 'Internship') NOT NULL DEFAULT 'Full Time',
    `location_city` VARCHAR(100) NOT NULL DEFAULT 'Kathmandu',
    `salary_min` INT,
    `salary_max` INT,
    `salary_currency` VARCHAR(10) DEFAULT 'NPR',
    `experience_required` VARCHAR(50),
    `education_required` VARCHAR(150),
    `description` TEXT NOT NULL,
    `responsibilities` TEXT,
    `requirements` TEXT,
    `benefits` TEXT,
    `deadline` DATE NOT NULL,
    `is_featured` TINYINT(1) DEFAULT 0,
    `status` ENUM('Active', 'Expired', 'Draft', 'Suspended') DEFAULT 'Active',
    `views_count` INT DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL,
    INDEX `idx_jobs_location` (`location_city`),
    INDEX `idx_jobs_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 12: Job Required Skills Mapping
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `job_skills`;
CREATE TABLE `job_skills` (
    `job_id` INT NOT NULL,
    `skill_id` INT NOT NULL,
    PRIMARY KEY (`job_id`, `skill_id`),
    FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 13: Applications (with complete lifecycle tracking)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `applications`;
CREATE TABLE `applications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `job_id` INT NOT NULL,
    `job_seeker_id` INT NOT NULL,
    `resume_id` INT,
    `cover_note` TEXT,
    `status` ENUM('Applied', 'Viewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected') DEFAULT 'Applied',
    `interview_scheduled_at` DATETIME,
    `interview_platform` VARCHAR(100),
    `applied_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_job_seeker_app` (`job_id`, `job_seeker_id`),
    FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`resume_id`) REFERENCES `resumes`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 14: Saved Jobs (Bookmarks)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `saved_jobs`;
CREATE TABLE `saved_jobs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `job_seeker_id` INT NOT NULL,
    `job_id` INT NOT NULL,
    `saved_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_seeker_saved` (`job_seeker_id`, `job_id`),
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 15: Job Alerts
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `job_alerts`;
CREATE TABLE `job_alerts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `job_seeker_id` INT NOT NULL,
    `keyword` VARCHAR(150),
    `category_id` INT,
    `city` VARCHAR(100),
    `frequency` VARCHAR(20) DEFAULT 'Daily',
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 16: Messages (Candidate <-> Recruiter Chat)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `sender_id` INT NOT NULL,
    `receiver_id` INT NOT NULL,
    `job_id` INT,
    `message_text` TEXT NOT NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `sent_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 17: Notifications
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 18: Subscriptions & Pricing
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE `subscriptions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT NOT NULL,
    `plan_name` VARCHAR(100) NOT NULL,
    `price_npr` INT NOT NULL,
    `featured_job_credits` INT DEFAULT 0,
    `starts_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `expires_at` DATETIME NOT NULL,
    `status` VARCHAR(20) DEFAULT 'Active',
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 19: Payments (eSewa / Khalti / Fonepay)
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT,
    `user_id` INT,
    `transaction_uuid` VARCHAR(100) UNIQUE NOT NULL,
    `payment_gateway` ENUM('eSewa', 'Khalti', 'Fonepay', 'BankTransfer') NOT NULL,
    `amount_npr` DECIMAL(10, 2) NOT NULL,
    `purpose` VARCHAR(100) NOT NULL,
    `status` ENUM('Pending', 'Success', 'Failed', 'Refunded') DEFAULT 'Success',
    `gateway_response` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------------
-- Table 20: Reviews & Ratings
-- --------------------------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
    `review_title` VARCHAR(150),
    `review_text` TEXT NOT NULL,
    `is_verified_employee` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable Foreign Key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================================================
-- SEED DATA INSERTIONS (Nepal Employment Market)
-- ==========================================================================

-- 1. Insert Categories
INSERT IGNORE INTO `categories` (`id`, `name`, `slug`, `icon`, `job_count`) VALUES
(1, 'IT & Software', 'it-software', '💻', 342),
(2, 'Web Development', 'web-dev', '🌐', 218),
(3, 'Mobile Development', 'mobile-dev', '📱', 114),
(4, 'Software Engineering', 'software-eng', '⚙️', 189),
(5, 'AI & Machine Learning', 'ai-machine-learning', '🤖', 86),
(6, 'Banking & Finance', 'banking-finance', '🏦', 195),
(7, 'Accounting & Auditing', 'accounting', '🧾', 154),
(8, 'Marketing & Growth', 'marketing', '📈', 130),
(9, 'Healthcare & Pharma', 'healthcare', '🏥', 120),
(10, 'Civil & Electrical Eng', 'engineering', '🏗️', 140),
(11, 'NGO / INGO & Social', 'ngo-ingo', '🌍', 88),
(12, 'Hospitality & Tourism', 'hospitality', '🏨', 165);

-- 2. Insert Nepal Locations
INSERT IGNORE INTO `locations` (`id`, `city`, `district`, `province`, `is_remote_hub`) VALUES
(1, 'Kathmandu', 'Kathmandu', 'Bagmati', 0),
(2, 'Lalitpur', 'Lalitpur', 'Bagmati', 0),
(3, 'Bhaktapur', 'Bhaktapur', 'Bagmati', 0),
(4, 'Pokhara', 'Kaski', 'Gandaki', 0),
(5, 'Chitwan', 'Chitwan', 'Bagmati', 0),
(6, 'Butwal', 'Rupandehi', 'Lumbini', 0),
(7, 'Biratnagar', 'Morang', 'Koshi', 0),
(8, 'Birgunj', 'Parsa', 'Madhesh', 0),
(9, 'Dharan', 'Sunsari', 'Koshi', 0),
(10, 'Remote — Nepal', 'All Districts', 'Nepal', 1);

-- 3. Insert Verified Nepal Companies
INSERT IGNORE INTO `companies` (`id`, `name`, `slug`, `pan_number`, `industry`, `website`, `tagline`, `about_text`, `address`, `city`, `contact_email`, `contact_phone`, `rating`) VALUES
(1, 'Cotiviti Nepal', 'cotiviti-nepal', '300123456', 'Healthcare IT', 'https://www.cotiviti.com.np', 'Leading Healthcare Analytics & IT', 'American healthcare analytics and payment solutions provider with premier campus in Kathmandu.', 'Hattisar', 'Kathmandu', 'careers-nepal@cotiviti.com', '+977-1-4432100', 4.7),
(2, 'Leapfrog Technology', 'leapfrog-tech', '300234567', 'IT & Software', 'https://www.lftechnology.com', 'World-class AI & Software Engineering', 'Product engineering and AI consultancy company engineering high-performance systems for global clients.', 'Dillibazar', 'Kathmandu', 'jobs@lftechnology.com', '+977-1-4428800', 4.8),
(3, 'F1Soft International', 'f1soft-intl', '300345678', 'FinTech', 'https://www.f1soft.com', 'Pioneers of Digital Finance in Nepal', 'Nepal leading financial technology conglomerate, creator of digital banking engines and transaction processors.', 'Pulchowk', 'Lalitpur', 'hr@f1soft.com', '+977-1-5444000', 4.6),
(4, 'CloudFactory Nepal', 'cloudfactory-nepal', '300456789', 'AI & Data Solutions', 'https://www.cloudfactory.com', 'Building the World AI Workforce', 'Connecting human intelligence with machine learning models for leading global artificial intelligence teams.', 'Bhaisepati', 'Lalitpur', 'recruiting-np@cloudfactory.com', '+977-1-5599800', 4.7),
(5, 'Deerhold Nepal', 'deerhold-nepal', '300567890', 'IT & Software', 'https://www.deerhold.com', 'Enterprise Software & Analytics', 'Deerhold delivers enterprise software solutions, data engineering, and digital transformation for healthcare and tech clients worldwide.', 'Sifal', 'Kathmandu', 'nepal-hr@deerhold.com', '+977-1-4478900', 4.5);

-- 4. Insert Skills
INSERT IGNORE INTO `skills` (`name`) VALUES
('Java'), ('Spring Boot'), ('Python'), ('FastAPI'), ('Django'),
('JavaScript'), ('TypeScript'), ('React'), ('Node.js'), ('Express'),
('Go'), ('PostgreSQL'), ('MySQL'), ('Docker'), ('Kubernetes'),
('Redis'), ('Kafka'), ('AWS'), ('Machine Learning'), ('FinTech');

-- 5. Insert Demo Users (Candidate, Recruiter, Admin)
INSERT IGNORE INTO `users` (`id`, `email`, `mobile`, `password_hash`, `role`, `is_active`, `is_verified`) VALUES
(1, 'sandeep.adhikari@example.com', '9841234567', '$2b$10$w8gZ01/5eU2qEaHk9zPqe.mQYgG1mU6xWq5qCj0oW6q5qCj0oW6q5', 'job_seeker', 1, 1),
(2, 'recruiting@cotiviti.com.np', '9851122334', '$2b$10$w8gZ01/5eU2qEaHk9zPqe.mQYgG1mU6xWq5qCj0oW6q5qCj0oW6q5', 'employer', 1, 1),
(3, 'admin@jobnepal.gov.np', '9801122334', '$2b$10$w8gZ01/5eU2qEaHk9zPqe.mQYgG1mU6xWq5qCj0oW6q5qCj0oW6q5', 'admin', 1, 1);

-- 6. Insert Candidate Profile
INSERT IGNORE INTO `job_seekers` (`user_id`, `full_name`, `current_title`, `city`, `profile_summary`, `expected_salary_min`, `expected_salary_max`) VALUES
(1, 'Sandeep Basnet', 'Senior Full-Stack & Python / Java Engineer', 'Kathmandu', 'Passionate Software Engineer with 4+ years of experience building high-scale distributed backend systems, REST APIs, and microservices in Python and Java.', 120000, 200000);

-- 7. Insert Sample Vacancies
INSERT IGNORE INTO `jobs` (`id`, `company_id`, `category_id`, `title`, `workplace_type`, `job_type`, `location_city`, `salary_min`, `salary_max`, `description`, `responsibilities`, `requirements`, `benefits`, `deadline`, `is_featured`, `status`) VALUES
(1, 1, 1, 'Senior Java & Spring Boot Engineer', 'On-site', 'Full Time', 'Kathmandu', 150000, 220000, 'Cotiviti Nepal is seeking a Senior Java Engineer to lead healthcare analytics platforms.', 'Design and implement Spring Boot microservices, optimize SQL queries in PostgreSQL.', '4+ years experience in Java and Spring Boot. Strong grasp of REST APIs and Docker.', 'Provident Fund, CIT matching, executive healthcare coverage, subsidized cafeteria.', '2026-10-25', 1, 'Active'),
(2, 2, 1, 'Senior Python & AI Engineer', 'Hybrid', 'Full Time', 'Kathmandu', 140000, 200000, 'Leapfrog Technology is looking for an experienced Python Engineer to lead AI integration and high-performance backend APIs.', 'Build REST APIs with FastAPI and Django, integrate LLMs and RAG architectures.', '4+ years experience in Python, FastAPI, Docker, and PostgreSQL.', 'Top-tier MacBook Pro equipment, learning allowance, annual retreat.', '2026-10-30', 1, 'Active'),
(3, 3, 2, 'Full Stack JavaScript Developer', 'On-site', 'Full Time', 'Lalitpur', 90000, 140000, 'Join F1Soft International to engineer secure web platforms powering mobile payment gateways across Nepal.', 'Develop responsive UI in React.js and backend in Node.js/Express.', '2+ years experience in React, Node.js, Express, and MongoDB.', 'Dashain festival bonus, subsidized meals, health insurance.', '2026-10-20', 0, 'Active'),
(4, 4, 4, 'Senior Go / Golang Backend Engineer', 'Remote', 'Full Time', 'Remote — Nepal', 160000, 250000, 'CloudFactory is seeking a Go engineer to build real-time distributed systems coordinating AI workforce tasks.', 'Engineer high-concurrency microservices in Go with Kafka and gRPC.', '3+ years experience with Go, distributed systems, and PostgreSQL.', '100% Remote flexibility across Nepal, home office setup allowance NPR 50,000.', '2026-10-28', 1, 'Active');

-- 8. Insert Applications
INSERT IGNORE INTO `applications` (`job_id`, `job_seeker_id`, `status`, `interview_scheduled_at`, `interview_platform`) VALUES
(1, 1, 'Interview', '2026-10-06 14:00:00', 'Zoom Meeting ID: 849 2039 1192'),
(2, 1, 'Shortlisted', NULL, NULL);

-- Confirmation message
SELECT 'Database job_nepal_db successfully initialized with all 20 tables and seed data!' AS Status;
