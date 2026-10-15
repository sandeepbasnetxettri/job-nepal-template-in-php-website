-- ==========================================================================
-- JOB NEPAL — Sample Seed Data for Nepal Employment Market
-- ==========================================================================

-- Categories
INSERT INTO categories (name, slug, icon, job_count) VALUES
('IT & Software', 'it-software', '💻', 342),
('Web Development', 'web-dev', '🌐', 218),
('Mobile Development', 'mobile-dev', '📱', 114),
('Software Engineering', 'software-eng', '⚙️', 189),
('AI & Machine Learning', 'ai-machine-learning', '🤖', 86),
('Banking & Finance', 'banking-finance', '🏦', 195),
('Accounting', 'accounting', '🧾', 154),
('Marketing', 'marketing', '📈', 130),
('Healthcare', 'healthcare', '🏥', 120),
('Engineering', 'engineering', '🏗️', 140)
ON CONFLICT (slug) DO NOTHING;

-- Locations
INSERT INTO locations (city, district, province, is_remote_hub) VALUES
('Kathmandu', 'Kathmandu', 'Bagmati', FALSE),
('Lalitpur', 'Lalitpur', 'Bagmati', FALSE),
('Bhaktapur', 'Bhaktapur', 'Bagmati', FALSE),
('Pokhara', 'Kaski', 'Gandaki', FALSE),
('Chitwan', 'Chitwan', 'Bagmati', FALSE),
('Butwal', 'Rupandehi', 'Lumbini', FALSE),
('Biratnagar', 'Morang', 'Koshi', FALSE),
('Birgunj', 'Parsa', 'Madhesh', FALSE),
('Dharan', 'Sunsari', 'Koshi', FALSE),
('Remote — Nepal', 'All Districts', 'Nepal', TRUE)
ON CONFLICT DO NOTHING;

-- Companies
INSERT INTO companies (name, slug, pan_number, industry, website, tagline, about_text, address, city, contact_email, contact_phone, rating) VALUES
('Cotiviti Nepal', 'cotiviti-nepal', '300123456', 'Healthcare IT', 'https://www.cotiviti.com.np', 'Leading Healthcare Analytics & IT', 'American healthcare analytics and payment solutions provider with primary development center in Kathmandu.', 'Hattisar', 'Kathmandu', 'careers-nepal@cotiviti.com', '+977-1-4432100', 4.7),
('Leapfrog Technology', 'leapfrog-tech', '300234567', 'IT & Software', 'https://www.lftechnology.com', 'World-class AI & Software Engineering', 'Product engineering and AI consultancy company engineering high-performance systems for global partners.', 'Dillibazar', 'Kathmandu', 'jobs@lftechnology.com', '+977-1-4428800', 4.8),
('F1Soft International', 'f1soft-intl', '300345678', 'FinTech', 'https://www.f1soft.com', 'Pioneers of Digital Finance in Nepal', 'Nepal leading financial technology conglomerate, creator of digital banking engines and transaction processors.', 'Pulchowk', 'Lalitpur', 'hr@f1soft.com', '+977-1-5444000', 4.6),
('CloudFactory Nepal', 'cloudfactory-nepal', '300456789', 'AI & Data Solutions', 'https://www.cloudfactory.com', 'Building the World AI Workforce', 'Connecting human intelligence with machine learning models for leading global artificial intelligence teams.', 'Bhaisepati', 'Lalitpur', 'recruiting-np@cloudfactory.com', '+977-1-5599800', 4.7)
ON CONFLICT (slug) DO NOTHING;

-- Skills
INSERT INTO skills (name) VALUES
('Java'), ('Spring Boot'), ('Python'), ('FastAPI'), ('Django'),
('JavaScript'), ('React'), ('Node.js'), ('Go'), ('PostgreSQL'),
('Docker'), ('SQL'), ('Machine Learning'), ('Accounting'), ('Digital Marketing')
ON CONFLICT (name) DO NOTHING;
