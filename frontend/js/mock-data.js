/**
 * JOB NEPAL — Mock Data & Local Data Engine
 * Realistic Nepal Companies, Vacancies, Categories & Locations
 */

const NEPAL_LOCATIONS = [
  "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", 
  "Butwal", "Biratnagar", "Birgunj", "Dharan", "Hetauda", 
  "Nepalgunj", "Dhangadhi", "Janakpur", "Other Nepal locations", "Remote — Nepal"
];

const JOB_CATEGORIES = [
  { id: "it-software", name: "IT & Software", icon: "💻", count: 342 },
  { id: "web-dev", name: "Web Development", icon: "🌐", count: 218 },
  { id: "mobile-dev", name: "Mobile Development", icon: "📱", count: 114 },
  { id: "software-eng", name: "Software Engineering", icon: "⚙️", count: 189 },
  { id: "data-science", name: "Data Science & AI", icon: "📊", count: 86 },
  { id: "cybersecurity", name: "Cybersecurity", icon: "🛡️", count: 42 },
  { id: "networking", name: "Networking & Cloud", icon: "☁️", count: 68 },
  { id: "banking-finance", name: "Banking & Finance", icon: "🏦", count: 195 },
  { id: "accounting", name: "Accounting & Auditing", icon: "🧾", count: 154 },
  { id: "marketing", name: "Marketing & Growth", icon: "📈", count: 130 },
  { id: "sales", name: "Sales & Biz Dev", icon: "🤝", count: 178 },
  { id: "hr", name: "Human Resources", icon: "👥", count: 92 },
  { id: "healthcare", name: "Healthcare & Pharma", icon: "🏥", count: 120 },
  { id: "education", name: "Education & Teaching", icon: "🎓", count: 104 },
  { id: "hospitality", name: "Hospitality & Tourism", icon: "🏨", count: 165 },
  { id: "engineering", name: "Civil & Electrical Eng", icon: "🏗️", count: 140 },
  { id: "ngo-ingo", name: "NGO / INGO & Social", icon: "🌍", count: 88 },
  { id: "customer-service", name: "Customer Service", icon: "🎧", count: 112 },
  { id: "freelancing", name: "Freelancing & Gigs", icon: "⚡", count: 75 },
  { id: "remote", name: "Remote Jobs", icon: "🏠", count: 210 }
];

const SAMPLE_COMPANIES = [
  {
    id: "cotiviti-nepal",
    name: "Cotiviti Nepal",
    tagline: "Leading Healthcare Analytics & IT",
    logoText: "CN",
    industry: "Healthcare IT",
    location: "Hattisar, Kathmandu",
    website: "https://www.cotiviti.com.np",
    vacanciesCount: 14,
    rating: 4.6,
    description: "Cotiviti Nepal is an American healthcare informatics and IT enterprise providing high-tier scalable data solutions with a premier campus in Kathmandu.",
    contact: { email: "careers-nepal@cotiviti.com", phone: "+977-1-4432100" }
  },
  {
    id: "leapfrog-tech",
    name: "Leapfrog Technology",
    tagline: "World-class AI & Software Engineering",
    logoText: "LF",
    industry: "IT & Software",
    location: "Dillibazar, Kathmandu",
    website: "https://www.lftechnology.com",
    vacanciesCount: 19,
    rating: 4.8,
    description: "Leapfrog partners with high-growth technology innovators worldwide to engineer intelligent software, AI models, and cloud products.",
    contact: { email: "jobs@lftechnology.com", phone: "+977-1-4428800" }
  },
  {
    id: "f1soft-intl",
    name: "F1Soft International",
    tagline: "Pioneers of Digital Finance in Nepal",
    logoText: "F1",
    industry: "FinTech",
    location: "Pulchowk, Lalitpur",
    website: "https://www.f1soft.com",
    vacanciesCount: 11,
    rating: 4.5,
    description: "F1Soft is Nepal's leading fintech conglomerate, building eSewa, mobile banking solutions for 50+ commercial banks, and secure transaction highways.",
    contact: { email: "hr@f1soft.com", phone: "+977-1-5444000" }
  },
  {
    id: "cloudfactory-nepal",
    name: "CloudFactory Nepal",
    tagline: "Building the World's Data and AI Workforce",
    logoText: "CF",
    industry: "AI & Data Solutions",
    location: "Bhaisepati, Lalitpur",
    website: "https://www.cloudfactory.com",
    vacanciesCount: 8,
    rating: 4.7,
    description: "CloudFactory combines human intelligence with artificial intelligence to power machine learning for leading global AI companies.",
    contact: { email: "recruiting-np@cloudfactory.com", phone: "+977-1-5599800" }
  },
  {
    id: "deerhold-nepal",
    name: "Deerhold Nepal",
    tagline: "Enterprise Software & Analytics",
    logoText: "DH",
    industry: "IT & Software",
    location: "Sifal, Kathmandu",
    website: "https://www.deerhold.com",
    vacanciesCount: 6,
    rating: 4.5,
    description: "Deerhold delivers enterprise software solutions, data engineering, and digital transformation for healthcare and enterprise clients worldwide.",
    contact: { email: "nepal-hr@deerhold.com", phone: "+977-1-4478900" }
  },
  {
    id: "esewa-fonepay",
    name: "eSewa Payment Service",
    tagline: "Nepal's First & Largest Digital Wallet",
    logoText: "eS",
    industry: "FinTech & Payments",
    location: "Pulchowk, Lalitpur",
    website: "https://esewa.com.np",
    vacanciesCount: 9,
    rating: 4.6,
    description: "eSewa is the premier digital wallet in Nepal, empowering millions of citizens and businesses with frictionless financial connectivity.",
    contact: { email: "careers@esewa.com.np", phone: "+977-1-5970000" }
  },
  {
    id: "fusemachines",
    name: "Fusemachines Nepal",
    tagline: "Democratizing Artificial Intelligence",
    logoText: "FM",
    industry: "AI & Machine Learning",
    location: "Kamalpokhari, Kathmandu",
    website: "https://fusemachines.com",
    vacanciesCount: 7,
    rating: 4.7,
    description: "Fusemachines is an AI solutions provider and education pioneer transforming organizations with advanced machine intelligence and data pipelines.",
    contact: { email: "hr-nepal@fusemachines.com", phone: "+977-1-4412233" }
  },
  {
    id: "ncell-axiata",
    name: "Ncell Axiata",
    tagline: "Connecting Nepal with Next-Gen Telecom",
    logoText: "NC",
    industry: "Telecommunications",
    location: "Lainchaur, Kathmandu",
    website: "https://www.ncell.com.np",
    vacanciesCount: 5,
    rating: 4.4,
    description: "Ncell is one of Nepal's largest private telecom network providers offering nation-wide 4G coverage, broadband, and enterprise connectivity.",
    contact: { email: "recruitment@ncell.com.np", phone: "+977-1-4000100" }
  }
];

const INITIAL_JOBS = [
  {
    id: "job-101",
    title: "Senior Java Developer",
    companyId: "cotiviti-nepal",
    company: "Cotiviti Nepal",
    location: "Kathmandu",
    workplaceType: "Hybrid",
    jobType: "Full Time",
    category: "Software Engineering",
    techCategory: "Java",
    experience: "3-5 Years",
    education: "Bachelor in Computer Engineering / CS / IT",
    salaryMin: 120000,
    salaryMax: 180000,
    salaryFormatted: "NPR 120,000 – 180,000 / month",
    postedDate: "2026-09-28",
    deadline: "2026-10-25",
    isFeatured: true,
    skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Docker", "REST API"],
    description: "Cotiviti Nepal is seeking a Senior Java Developer to design, build, and optimize high-throughput medical analytics pipelines and enterprise microservices.",
    responsibilities: [
      "Architect and implement RESTful microservices using Spring Boot and Java 21",
      "Optimize relational queries and database schemas in PostgreSQL",
      "Collaborate with US-based product managers and local DevOps squads",
      "Ensure unit test coverage above 85% with JUnit and Mockito"
    ],
    requirements: [
      "3+ years of professional experience in enterprise Java and Spring Boot",
      "Solid understanding of concurrency, caching (Redis), and distributed design",
      "Familiarity with containerization (Docker, Kubernetes) and CI/CD pipelines",
      "Excellent communication and problem-solving skills"
    ],
    benefits: [
      "Competitive salary with bi-annual performance bonus",
      "Comprehensive medical insurance covering employee and direct family",
      "Flexible hybrid schedule (2 days office, 3 days remote)",
      "Daily catered lunch and subsidized gym memberships"
    ]
  },
  {
    id: "job-102",
    title: "Senior Python & AI Engineer",
    companyId: "leapfrog-tech",
    company: "Leapfrog Technology",
    location: "Kathmandu",
    workplaceType: "Hybrid",
    jobType: "Full Time",
    category: "AI & Machine Learning",
    techCategory: "Python",
    experience: "4-6 Years",
    education: "Bachelor or Master in CS / IT / Mathematics",
    salaryMin: 150000,
    salaryMax: 240000,
    salaryFormatted: "NPR 150,000 – 240,000 / month",
    postedDate: "2026-09-29",
    deadline: "2026-10-30",
    isFeatured: true,
    skills: ["Python", "FastAPI", "Django", "PyTorch", "OpenAI / LLMs", "SQL"],
    description: "Leapfrog Technology is looking for an experienced Python Engineer to lead AI integration and high-performance backend APIs for international clients.",
    responsibilities: [
      "Build high-performance REST APIs with FastAPI and Django",
      "Integrate Large Language Models (LLM) and retrieval augmented generation (RAG)",
      "Design scalable background task workflows using Celery and Redis",
      "Mentor junior software engineers and conduct code reviews"
    ],
    requirements: [
      "4+ years building production applications in Python",
      "Hands-on experience with FastAPI, Django, and async programming",
      "Working knowledge of AI/ML libraries, embeddings, and vector databases",
      "Proficient with Git, Docker, and AWS / GCP services"
    ],
    benefits: [
      "Provident fund & Gratuity as per Nepal Labor Act",
      "Learning allowance for certifications and books",
      "Annual international team retreat",
      "Top-tier MacBook Pro equipment provided"
    ]
  },
  {
    id: "job-103",
    title: "Full Stack JavaScript Developer",
    companyId: "f1soft-intl",
    company: "F1Soft International",
    location: "Lalitpur",
    workplaceType: "On-site",
    jobType: "Full Time",
    category: "Web Development",
    techCategory: "JavaScript",
    experience: "2-4 Years",
    education: "BSc. CSIT / BCA / BE",
    salaryMin: 90000,
    salaryMax: 140000,
    salaryFormatted: "NPR 90,000 – 140,000 / month",
    postedDate: "2026-09-30",
    deadline: "2026-10-20",
    isFeatured: false,
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB"],
    description: "Join F1Soft International to engineer secure web platforms powering mobile payment gateways and bank merchant portals across Nepal.",
    responsibilities: [
      "Develop responsive and accessible frontend applications in React.js",
      "Build secure RESTful APIs using Node.js, Express, and TypeScript",
      "Implement bank-grade cryptographic authentication and input sanitization",
      "Participate in agile sprint ceremonies"
    ],
    requirements: [
      "2+ years experience in full-stack JavaScript (React & Node.js)",
      "Proficiency with modern ES6+, TypeScript, and state management (Zustand/Redux)",
      "Solid knowledge of web security (CSRF, XSS, JWT)",
      "Bachelor's degree in Computer Science or equivalent field"
    ],
    benefits: [
      "CIT (Citizen Investment Trust) contribution matching",
      "Annual festival allowance (Dashain bonus)",
      "Subsidized cafeteria and cafeteria allowances",
      "Health insurance including OPD and IPD"
    ]
  },
  {
    id: "job-104",
    title: "Senior Go / Golang Backend Engineer",
    companyId: "cloudfactory-nepal",
    company: "CloudFactory Nepal",
    location: "Remote — Nepal",
    workplaceType: "Remote",
    jobType: "Full Time",
    category: "Software Engineering",
    techCategory: "Go",
    experience: "3-5 Years",
    education: "Bachelor in Computer Science or related",
    salaryMin: 160000,
    salaryMax: 250000,
    salaryFormatted: "NPR 160,000 – 250,000 / month",
    postedDate: "2026-09-25",
    deadline: "2026-10-28",
    isFeatured: true,
    skills: ["Go", "Golang", "gRPC", "Microservices", "Kafka", "PostgreSQL", "Docker"],
    description: "CloudFactory is seeking a high-caliber Go engineer to build real-time distributed systems coordinating tens of thousands of human-in-the-loop AI tasks.",
    responsibilities: [
      "Engineer ultra-fast microservices in Golang with high concurrency",
      "Implement streaming data pipelines with Apache Kafka and gRPC",
      "Monitor telemetry, distributed tracing, and system health in Grafana",
      "Refactor legacy services into modern event-driven architecture"
    ],
    requirements: [
      "3+ years building resilient backend systems with Go",
      "Deep understanding of Goroutines, channels, memory management, and profiling",
      "Strong understanding of relational SQL and NoSQL storage",
      "Demonstrated ability to work autonomously in remote environments"
    ],
    benefits: [
      "100% Remote flexibility anywhere within Nepal",
      "Home office setup stipend (NPR 50,000)",
      "Generous paid annual leave + public holidays",
      "Wellness and wellness stipend"
    ]
  },
  {
    id: "job-105",
    title: "Senior Node.js Backend Developer",
    companyId: "esewa-fonepay",
    company: "eSewa Payment Service",
    location: "Lalitpur",
    workplaceType: "Hybrid",
    jobType: "Full Time",
    category: "IT & Software",
    techCategory: "Node.js",
    experience: "3-5 Years",
    education: "Bachelor in Engineering / Computer Application",
    salaryMin: 110000,
    salaryMax: 170000,
    salaryFormatted: "NPR 110,000 – 170,000 / month",
    postedDate: "2026-09-27",
    deadline: "2026-10-22",
    isFeatured: false,
    skills: ["Node.js", "Express", "TypeScript", "Redis", "MySQL", "Socket.io"],
    description: "Work on eSewa's transaction engine processing millions of digital transactions everyday for utilities, flights, QR payments, and peer transfers.",
    responsibilities: [
      "Develop highly available Node.js transaction microservices",
      "Integrate bank switch APIs and telecommunication gateways",
      "Implement idempotent API endpoints and distributed locks using Redis",
      "Analyze latency logs and optimize database indexes"
    ],
    requirements: [
      "3+ years professional experience building REST/WebSocket APIs with Node.js",
      "Strong database design skills in MySQL or PostgreSQL",
      "Understanding of transactional ACID guarantees and race conditions",
      "Good familiarity with Linux command line and Git"
    ],
    benefits: [
      "Attractive festival bonus & performance incentives",
      "Accidental and medical insurance coverage",
      "Continuous training and conference sponsorships",
      "Subsidized internet connection"
    ]
  },
  {
    id: "job-106",
    title: "Senior Chartered Accountant (Audit & Finance)",
    companyId: "ncell-axiata",
    company: "Ncell Axiata",
    location: "Kathmandu",
    workplaceType: "On-site",
    jobType: "Full Time",
    category: "Accounting",
    techCategory: "Accounting",
    experience: "3-6 Years",
    education: "CA (ICAN / ICAI / ACCA)",
    salaryMin: 130000,
    salaryMax: 190000,
    salaryFormatted: "NPR 130,000 – 190,000 / month",
    postedDate: "2026-09-26",
    deadline: "2026-10-18",
    isFeatured: false,
    skills: ["ICAN", "ACCA", "Financial Audit", "Taxation (Nepal IRD)", "SAP ERP", "Tally"],
    description: "Ncell is hiring a Chartered Accountant to manage corporate tax filings, internal financial controls, and statutory audits in compliance with Nepal laws.",
    responsibilities: [
      "Lead corporate statutory audits and quarterly financial closes",
      "Ensure compliance with Inland Revenue Department (IRD) Nepal tax regulations",
      "Supervise accounting transactions in SAP ERP system",
      "Prepare monthly cash flow and EBITDA reports for executive leadership"
    ],
    requirements: [
      "Qualified CA from ICAN or ICAI or member of ACCA",
      "3+ years post-qualification experience in corporate finance or audit firms",
      "In-depth knowledge of Nepal Income Tax Act, VAT Act, and NFRS standards",
      "High attention to detail and analytical proficiency"
    ],
    benefits: [
      "Executive corporate health coverage",
      "Fuel allowance and vehicle subsidy options",
      "Mobile phone and unlimited voice/data connection",
      "Substantial annual performance incentives"
    ]
  },
  {
    id: "job-107",
    title: "Digital Marketing & Growth Officer",
    companyId: "esewa-fonepay",
    company: "eSewa Payment Service",
    location: "Pokhara",
    workplaceType: "On-site",
    jobType: "Full Time",
    category: "Marketing",
    techCategory: "Marketing",
    experience: "1-3 Years",
    education: "Bachelor in BBA / BIM / Mass Communication",
    salaryMin: 45000,
    salaryMax: 70000,
    salaryFormatted: "NPR 45,000 – 70,000 / month",
    postedDate: "2026-10-01",
    deadline: "2026-10-24",
    isFeatured: false,
    skills: ["Digital Marketing", "SEO", "Facebook Ads", "Google Ads", "Content Writing"],
    description: "Drive adoption of digital payments in Gandaki province. Coordinate with local merchant associations and craft localized promotional campaigns.",
    responsibilities: [
      "Execute digital campaigns across Meta, TikTok, and Google Ads",
      "Build relationships with merchant hubs and universities in Pokhara",
      "Track ROAS and customer acquisition cost across regional promotions",
      "Organize offline merchant activation events"
    ],
    requirements: [
      "1-3 years experience in growth marketing or social media advertising in Nepal",
      "Fluent in Nepali and English with good copywriting skills",
      "Familiarity with Google Analytics 4 and Meta Business Manager",
      "Must reside in or be willing to relocate to Pokhara"
    ],
    benefits: [
      "Travel and field allowances",
      "Mobile & communication allowance",
      "Medical insurance",
      "Fast career progression track"
    ]
  },
  {
    id: "job-108",
    title: "Data Science & ML Associate",
    companyId: "fusemachines",
    company: "Fusemachines Nepal",
    location: "Kathmandu",
    workplaceType: "Hybrid",
    jobType: "Full Time",
    category: "Data Science",
    techCategory: "Python",
    experience: "1-3 Years",
    education: "BSc in CS / Mathematics / Statistics",
    salaryMin: 80000,
    salaryMax: 130000,
    salaryFormatted: "NPR 80,000 – 130,000 / month",
    postedDate: "2026-09-24",
    deadline: "2026-10-19",
    isFeatured: false,
    skills: ["Python", "Pandas", "Scikit-Learn", "SQL", "Tableau", "Machine Learning"],
    description: "Join Fusemachines' data science lab to develop predictive models, clean and structure large customer datasets, and generate actionable BI dashboards.",
    responsibilities: [
      "Build exploratory data analysis pipelines in Jupyter and Pandas",
      "Train classification and regression models using Scikit-Learn and LightGBM",
      "Develop interactive dashboards in Tableau and Streamlit",
      "Present findings to cross-functional engineering teams"
    ],
    requirements: [
      "1+ years experience in Python-based data analytics and modeling",
      "Strong background in linear algebra, probability, and SQL queries",
      "Experience with Git and collaborative notebooks",
      "Eager to learn modern Deep Learning frameworks"
    ],
    benefits: [
      "Access to Fusemachines AI education fellowship library",
      "Mentorship from US-based Principal Data Scientists",
      "Hybrid work schedule",
      "Medical and accidental insurance"
    ]
  }
];

class JobNepalDataStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem("jn_jobs")) {
      localStorage.setItem("jn_jobs", JSON.stringify(INITIAL_JOBS));
    }
    if (!localStorage.getItem("jn_companies")) {
      localStorage.setItem("jn_companies", JSON.stringify(SAMPLE_COMPANIES));
    }
    if (!localStorage.getItem("jn_saved_jobs")) {
      localStorage.setItem("jn_saved_jobs", JSON.stringify(["job-101"]));
    }
    if (!localStorage.getItem("jn_applications")) {
      const sampleApplications = [
        {
          id: "app-201",
          jobId: "job-101",
          jobTitle: "Senior Java Developer",
          company: "Cotiviti Nepal",
          applicantName: "Sandeep Adhikari",
          email: "sandeep.adhikari@example.com",
          phone: "+977 9841234567",
          location: "Kathmandu",
          education: "B.E. Computer Engineering, Pulchowk Campus",
          experience: "4 Years",
          skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "REST API"],
          resumeUrl: "#",
          appliedDate: "2026-09-29",
          status: "Shortlisted", // Applied -> Viewed -> Shortlisted -> Interview -> Selected / Rejected
          interviewDate: "2026-10-06 at 2:00 PM (Zoom)"
        },
        {
          id: "app-202",
          jobId: "job-102",
          jobTitle: "Senior Python & AI Engineer",
          company: "Leapfrog Technology",
          applicantName: "Sandeep Adhikari",
          email: "sandeep.adhikari@example.com",
          phone: "+977 9841234567",
          location: "Kathmandu",
          education: "B.E. Computer Engineering, Pulchowk Campus",
          experience: "4 Years",
          skills: ["Python", "FastAPI", "Django", "SQL"],
          resumeUrl: "#",
          appliedDate: "2026-09-30",
          status: "Viewed"
        }
      ];
      localStorage.setItem("jn_applications", JSON.stringify(sampleApplications));
    }
  }

  getJobs() {
    return JSON.parse(localStorage.getItem("jn_jobs") || "[]");
  }

  getJobById(id) {
    const jobs = this.getJobs();
    return jobs.find(j => j.id === id);
  }

  saveJob(job) {
    const jobs = this.getJobs();
    jobs.unshift(job);
    localStorage.setItem("jn_jobs", JSON.stringify(jobs));
    return job;
  }

  getCompanies() {
    return JSON.parse(localStorage.getItem("jn_companies") || "[]");
  }

  getCompanyById(id) {
    const companies = this.getCompanies();
    return companies.find(c => c.id === id);
  }

  getSavedJobIds() {
    return JSON.parse(localStorage.getItem("jn_saved_jobs") || "[]");
  }

  toggleSaveJob(jobId) {
    let saved = this.getSavedJobIds();
    if (saved.includes(jobId)) {
      saved = saved.filter(id => id !== jobId);
    } else {
      saved.push(jobId);
    }
    localStorage.setItem("jn_saved_jobs", JSON.stringify(saved));
    return saved.includes(jobId);
  }

  getApplications() {
    return JSON.parse(localStorage.getItem("jn_applications") || "[]");
  }

  addApplication(application) {
    const apps = this.getApplications();
    const newApp = {
      id: "app-" + Date.now(),
      status: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      ...application
    };
    apps.unshift(newApp);
    localStorage.setItem("jn_applications", JSON.stringify(apps));
    return newApp;
  }

  updateApplicationStatus(appId, newStatus) {
    const apps = this.getApplications();
    const target = apps.find(a => a.id === appId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem("jn_applications", JSON.stringify(apps));
      return target;
    }
    return null;
  }

  /**
   * Recommendation Algorithm (Content-based candidate skill matching)
   */
  calculateMatchScore(userSkills = [], jobSkills = []) {
    if (!userSkills.length || !jobSkills.length) return 70;
    const normalizedUser = userSkills.map(s => s.toLowerCase().trim());
    const matches = jobSkills.filter(s => normalizedUser.includes(s.toLowerCase().trim()));
    const ratio = matches.length / jobSkills.length;
    // Normalized score between 55% and 98%
    const score = Math.round(55 + (ratio * 43));
    return Math.min(score, 98);
  }
}

const db = new JobNepalDataStore();
window.JobNepalDB = db;
