/**
 * JOB NEPAL — Core REST API Server (Node.js & Express)
 * Role: REST API, Authentication, Vacancy Management, Application Tracker
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'job_nepal_secure_jwt_secret_2026';

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Can connect to PostgreSQL/MySQL via pg/mysql2)
let users = [
  {
    id: 1,
    email: 'sandeep.adhikari@example.com',
    passwordHash: bcrypt.hashSync('nepal12345', 10),
    role: 'job_seeker',
    name: 'Sandeep Adhikari',
    skills: ['Java', 'Spring Boot', 'Python', 'SQL'],
    location: 'Kathmandu'
  },
  {
    id: 2,
    email: 'recruiting@cotiviti.com.np',
    passwordHash: bcrypt.hashSync('cotiviti123', 10),
    role: 'employer',
    name: 'Cotiviti HR Team',
    companyName: 'Cotiviti Nepal',
    location: 'Hattisar, Kathmandu'
  }
];

let jobs = [
  {
    id: 'job-101',
    title: 'Senior Java Developer',
    company: 'Cotiviti Nepal',
    location: 'Kathmandu',
    workplaceType: 'Hybrid',
    jobType: 'Full Time',
    category: 'Software Engineering',
    salaryFormatted: 'NPR 120,000 – 180,000 / month',
    salaryMin: 120000,
    salaryMax: 180000,
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST API'],
    deadline: '2026-10-25',
    status: 'Active'
  },
  {
    id: 'job-102',
    title: 'Senior Python & AI Engineer',
    company: 'Leapfrog Technology',
    location: 'Kathmandu',
    workplaceType: 'Hybrid',
    jobType: 'Full Time',
    category: 'AI & Machine Learning',
    salaryFormatted: 'NPR 150,000 – 240,000 / month',
    salaryMin: 150000,
    salaryMax: 240000,
    skills: ['Python', 'FastAPI', 'Django', 'PyTorch', 'SQL'],
    deadline: '2026-10-30',
    status: 'Active'
  }
];

let applications = [
  {
    id: 'app-201',
    jobId: 'job-101',
    applicantName: 'Sandeep Adhikari',
    email: 'sandeep.adhikari@example.com',
    status: 'Shortlisted', // Applied -> Viewed -> Shortlisted -> Interview -> Selected / Rejected
    appliedDate: '2026-09-29'
  }
];

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// -----------------------------------------------------------------------------
// Authentication Endpoints
// -----------------------------------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  const { email, password, role, name, mobile, location, skills, companyName, industry } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'Account with this email already exists' });
  }

  const newUser = {
    id: users.length + 1,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role,
    name: name || companyName,
    mobile,
    location,
    skills: skills || [],
    companyName: companyName || null,
    industry: industry || null
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password, role } = req.body;

  const user = users.find(u => (u.email === identifier || u.mobile === identifier));
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials or user not found' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

// -----------------------------------------------------------------------------
// Jobs Endpoints
// -----------------------------------------------------------------------------
app.get('/api/jobs', (req, res) => {
  const { q, location, category, workplaceType, maxSalary } = req.query;

  let result = jobs.filter(j => j.status === 'Active');

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(j => 
      j.title.toLowerCase().includes(query) ||
      j.company.toLowerCase().includes(query) ||
      j.skills.some(s => s.toLowerCase().includes(query))
    );
  }

  if (location && location !== 'all') {
    result = result.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (category) {
    result = result.filter(j => j.category.toLowerCase() === category.toLowerCase());
  }

  if (workplaceType) {
    result = result.filter(j => j.workplaceType === workplaceType);
  }

  if (maxSalary) {
    result = result.filter(j => j.salaryMin <= parseInt(maxSalary));
  }

  res.json({ total: result.length, jobs: result });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

app.post('/api/jobs', authenticateToken, (req, res) => {
  if (req.user.role !== 'employer' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only employers can post vacancies' });
  }

  const newJob = {
    id: 'job-' + Date.now(),
    status: 'Active',
    postedDate: new Date().toISOString().split('T')[0],
    ...req.body
  };

  jobs.unshift(newJob);
  res.status(201).json({ message: 'Job posted successfully', job: newJob });
});

// -----------------------------------------------------------------------------
// Applications Endpoints
// -----------------------------------------------------------------------------
app.post('/api/jobs/:id/apply', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const { applicantName, email, phone, note, skills, experience } = req.body;

  const newApp = {
    id: 'app-' + Date.now(),
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    applicantName,
    email,
    phone,
    note,
    skills: skills || [],
    experience: experience || '2-4 Years',
    status: 'Applied', // Applied -> Viewed -> Shortlisted -> Interview -> Selected / Rejected
    appliedDate: new Date().toISOString().split('T')[0]
  };

  applications.unshift(newApp);
  res.status(201).json({ message: 'Application submitted successfully', application: newApp });
});

app.get('/api/applications', authenticateToken, (req, res) => {
  res.json(applications);
});

app.put('/api/applications/:id/status', authenticateToken, (req, res) => {
  const appItem = applications.find(a => a.id === req.params.id);
  if (!appItem) return res.status(404).json({ error: 'Application not found' });

  const { status, interviewDate } = req.body;
  const validStatuses = ['Applied', 'Viewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid application status' });
  }

  appItem.status = status;
  if (interviewDate) appItem.interviewDate = interviewDate;

  res.json({ message: 'Status updated', application: appItem });
});

// -----------------------------------------------------------------------------
// AI Job Recommendations Endpoint (Section 10)
// -----------------------------------------------------------------------------
app.post('/api/recommendations', (req, res) => {
  const userSkills = (req.body.skills || []).map(s => s.toLowerCase());

  const recommendations = jobs.map(job => {
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const matches = jobSkills.filter(s => userSkills.includes(s));
    const score = Math.round(50 + (matches.length / jobSkills.length) * 48);

    return {
      job,
      matchScore: Math.min(score, 98),
      matchingSkills: matches
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({ recommendations });
});

// -----------------------------------------------------------------------------
// Platform Stats (Admin & Public)
// -----------------------------------------------------------------------------
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalUsers: 95420,
    totalCompanies: 1820,
    totalJobs: jobs.length + 12450,
    totalApplications: applications.length + 340000,
    activeJobs: jobs.filter(j => j.status === 'Active').length,
    placementRate: '98.2%'
  });
});

app.listen(PORT, () => {
  console.log(`[Job Nepal REST API] Server active on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/admin/stats`);
});
