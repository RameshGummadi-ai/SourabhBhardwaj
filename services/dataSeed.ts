export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  link?: string;
  pdfUrl?: string;
  abstract?: string;
}

export interface Experience {
  id: string;
  institution: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string[];
  skillsLearned: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demo?: string;
  imageUrl?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string;
  publishedAt?: string;
  views: number;
  likes: number;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  comments?: BlogComment[];
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: "academic" | "achievement" | "course";
  badgeUrl?: string;
}

export interface Lecture {
  id: string;
  title: string;
  venue: string;
  type: "guest" | "youtube";
  category?: string;
  videoUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export const initialPublications: Publication[] = [
  {
    id: "pub-1",
    title: "Uttarakhand’s Groundwater Crisis: A Decadal Data Analysis of Urbanization and Extraction (2009-19)",
    authors: ["Shivam Semwal", "Sourabh Bhardwaj", "Rahul Panday", "Vivek Bhadula", "Isha Bisht"],
    journal: "International Journal of Science, Technology and Management",
    year: 2021,
    doi: "10.5281/zenodo.groundwater",
    abstract: "An analysis of the decadal shift in groundwater availability across Uttarakhand's urban centers, noting statistical correlations between high-density urbanization and rapid aquifer depletion from 2009 to 2019."
  },
  {
    id: "pub-2",
    title: "Data-Driven Analysis of Heart Attack Risk Among Individuals in India",
    authors: ["Vivek Bhadula", "Sourabh Bhardwaj", "Rahul Pandey", "Shivam Semwal", "Isha Bisht"],
    journal: "International Journal of Science, Technology and Management",
    year: 2022,
    doi: "10.5281/zenodo.heartattack",
    abstract: "Applying classification machine learning models to identify predictive risk factors for cardiovascular incidents in the Indian subcontinental demographic, using clinical biomarkers and lifestyle datasets."
  },
  {
    id: "pub-3",
    title: "Comprehensive Analysis of Crime Against Women in India (2017–2024): Fixed-Period and Sublinear Approach",
    authors: ["Isha Bisht", "Sourabh Bhardwaj", "Rahul Pandey", "Rajat Saini", "Shivam Semwal", "Priya Panda"],
    journal: "International Journal of Science, Technology and Management",
    year: 2024,
    doi: "10.5281/zenodo.crimeanalysis",
    abstract: "A mathematical framework utilizing sublinear estimation and regression analysis to interpret longitudinal statistics on reported safety events, providing predictive indicators for regional hotspots."
  },
  {
    id: "pub-4",
    title: "Sustainability Deficit in the Sugar Belt: A 55-Year Longitudinal Analysis of Groundwater Depletion in Western Uttar Pradesh (1966-2020)",
    authors: ["Rajat Saini", "Sourabh Bhardwaj", "Rahul Pandey", "Piyush Rai"],
    journal: "International Journal of Science, Technology and Management",
    year: 2023,
    doi: "10.5281/zenodo.sugarbelt",
    abstract: "Investigating the impact of intensive sugarcane farming on the local water table in Western UP. Computes water recharge-to-extraction ratios across a five-decade baseline."
  },
  {
    id: "pub-5",
    title: "Renewable Energy and CO2 Emissions: Global Analysis",
    authors: ["Piyush Rai", "Sourabh Bhardwaj", "Rahul Pandey", "Rajat Saini", "Priya Kumari"],
    journal: "International Journal of Science, Technology and Management",
    year: 2023,
    doi: "10.5281/zenodo.co2emissions",
    abstract: "A global multi-variable statistical analysis examining the elasticity between clean energy adoption and carbon emission curves across emerging markets and G20 economies."
  },
  {
    id: "pub-6",
    title: "Employment Patterns in India: A Comparative Study of Pre and Post Pandemic (2017-2024)",
    authors: ["Priya Kumari", "Sourabh Bhardwaj", "Rahul Panday", "Rajat Saini", "Piyush Rai"],
    journal: "International Journal of Science, Technology and Management",
    year: 2024,
    doi: "10.5281/zenodo.employment",
    abstract: "Detailing structural changes in formal and informal employment in India post-COVID, tracking the rise of digital gig economy participation and work-from-home shifts."
  },
  {
    id: "pub-7",
    title: "Tourism Trends and Traffic Dynamics in Rishikesh: A Data-Driven Analysis (2000-2024)",
    authors: ["Khushi Payal", "Sourabh Bhardwaj", "Rahul Pandey", "Priya Panda"],
    journal: "International Journal of Science, Technology and Management",
    year: 2024,
    doi: "10.5281/zenodo.rishikesh",
    abstract: "Mapping temporal tourist inflows to gridlocks and waste management challenges in the holy town of Rishikesh, providing analytics models for micro-tourism sustainability."
  },
  {
    id: "pub-8",
    title: "A Study on The Impact of Geographical Location (Hilly vs Plain) On Academic Performance in Uttarakhand (2017-2025)",
    authors: ["Priya Panda", "Sourabh Bhardwaj", "Rahul Pandey", "Khushi Payal"],
    journal: "International Journal of Science, Technology and Management",
    year: 2025,
    doi: "10.5281/zenodo.hillyvsplain",
    abstract: "Correlating geographic constraints like topography, network infrastructure, and travel time to primary educational metrics in rural hills vs urbanized plains in Uttarakhand."
  },
  {
    id: "pub-9",
    title: "Forest Cover Change in Aravalli Region (1987-2023)",
    authors: ["Abhay Singh Rathore", "Sourabh Bhardwaj", "Rahul Pandey", "Sumeet Semwal"],
    journal: "International Journal of Science, Technology and Management",
    year: 2023,
    doi: "10.5281/zenodo.aravalliforest",
    abstract: "Analyzing remote sensing data to identify deforestation rates and urban sprawl encroachments in the sensitive ecological buffer of the Aravalli range over 36 years."
  },
  {
    id: "pub-10",
    title: "Mental Health Trends Among Students from Under Graduation to Post Graduation",
    authors: ["Sumeet Semwal", "Sourabh Bhardwaj", "Rahul Pandey", "Abhay Rathore"],
    journal: "International Journal of Science, Technology and Management",
    year: 2024,
    doi: "10.5281/zenodo.mentalhealth",
    abstract: "A survey-based statistical evaluation monitoring anxiety indicators and scholastic stress across Indian higher education institutions, identifying key indicators for institutional intervention."
  }
];

export const initialExperiences: Experience[] = [
  {
    id: "exp-1",
    institution: "CollegeDekho (Deputed at Dev Bhoomi Uttarakhand University)",
    role: "Assistant Professor",
    period: "Sept 2023 - Present",
    responsibilities: [
      "Deliver lectures on core Data Science topics including Python, Machine Learning, Statistics, and Data Analysis.",
      "Design and update curriculum aligned with industry standards and emerging technologies.",
      "Organizing seminars, workshops, and masterclasses on emerging technologies.",
      "Research: Engaging in research activities, publishing papers in reputed journals, and contributing to the academic community.",
      "Curriculum Development: Assisting in the development and updating of course curricula to ensure they meet current industry standards and academic requirements."
    ]
  },
  {
    id: "exp-2",
    institution: "ABES Engineering College",
    role: "Assistant Professor",
    period: "Aug 2022 - May 2023",
    responsibilities: [
      "Administrative Duties: Participating in departmental and university committees, and contributing to administrative tasks as required.",
      "Conducted training sessions on Data Structures at ABES College.",
      "Mentored students in understanding core concepts and problem-solving techniques.",
      "Strengthened foundational programming skills aligned with industry requirements."
    ]
  },
  {
    id: "exp-3",
    institution: "Lovely Professional University",
    role: "Assistant Professor",
    period: "Jan 2022 - July 2022",
    responsibilities: [
      "Delivered lectures on core computer science subjects, including Data Structures and programming fundamentals.",
      "Assisted in curriculum development and academic planning.",
      "Supported students in developing problem-solving, coding, and analytical skills."
    ]
  },
  {
    id: "exp-4",
    institution: "Sunrise Public School",
    role: "Computer Science Teacher",
    period: "Oct 2019 - Jan 2022",
    responsibilities: [
      "Taught computer science fundamentals and basic programming concepts to students.",
      "Developed lesson plans and delivered engaging classroom sessions.",
      "Supported students in building foundational analytical and logical thinking skills.",
      "Encouraged interactive learning and participation."
    ]
  }
];

export const initialEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Master of Computer Applications (Honours)",
    institution: "Bundelkhand University",
    period: "2017 - 2020",
    details: [
      "Graduated with Honors, specializing in advanced software engineering paradigms and database systems.",
      "Key Subjects: Data Structures, Discrete Mathematics, Theory of Computation, Computer Networks, Object-Oriented Programming."
    ],
    skillsLearned: ["Data Structures", "Discrete Maths", "Theory of Computation", "SQL", "Oracle", "C/C++"]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Science (Mathematics Honours)",
    institution: "University of Delhi",
    period: "2014 - 2017",
    details: [
      "Focused on theoretical and applied mathematics, forming a strong analytical foundation for machine learning algorithms.",
      "Key Subjects: Linear Algebra, Abstract Algebra, Probability & Statistics, Optimization Theory, Real Analysis, Calculus."
    ],
    skillsLearned: ["Linear Algebra", "Abstract Algebra", "Probability", "Statistics", "Optimization Theory", "MATLAB"]
  }
];

export const initialCertifications: Certification[] = [
  { id: "cert-jrf", title: "Junior Research Fellowship (JRF)", issuer: "UGC / NTA", year: 2022, type: "achievement" },
  { id: "cert-net", title: "National Eligibility Test (NET)", issuer: "UGC / NTA", year: 2022, type: "achievement" },
  { id: "cert-gate-1", title: "GATE CSIT (Computer Science & IT) - score: Qualified", issuer: "IIT Bombay", year: 2021, type: "achievement" },
  { id: "cert-gate-2", title: "GATE CSIT (Computer Science & IT) - score: Qualified", issuer: "IIT Roorkee", year: 2026, type: "achievement" },
  { id: "cert-gate-3", title: "GATE DSAI (Data Science & Artificial Intelligence) - score: Qualified", issuer: "IIT Roorkee", year: 2026, type: "achievement" },
  
  // NPTEL SWAYAM
  { id: "course-1", title: "Introduction to Probability & Statistics", issuer: "NPTEL (IIT Madras)", year: 2022, type: "course" },
  { id: "course-2", title: "Artificial Intelligence - Search Methods for Problem Solving", issuer: "NPTEL (IIT Madras)", year: 2022, type: "course" },
  { id: "course-3", title: "Introduction to Machine Learning", issuer: "NPTEL (IIT Madras)", year: 2023, type: "course" },
  { id: "course-4", title: "Python For Data Science", issuer: "NPTEL (IIT Madras)", year: 2023, type: "course" },
  { id: "course-5", title: "Data Science Using Python", issuer: "SWAYAM (Aligarh Muslim University)", year: 2023, type: "course" },
  { id: "course-6", title: "Data Analytics with Python", issuer: "NPTEL (IIT Roorkee)", year: 2024, type: "course" }
];

export const initialLectures: Lecture[] = [
  { id: "lect-1", title: "Industry 4.0: An Overview", venue: "ABES Engineering College", type: "guest" },
  { id: "lect-2", title: "How to Build Resume", venue: "Adarsh Mahila Mahavidyalaya", type: "guest" },
  
  // YouTube videos (Embed IDs or categories)
  { id: "yt-1", title: "Group Theory: Subgroups, Cosets & Lagrange Theorem", venue: "YouTube", type: "youtube", category: "Group Theory", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "yt-2", title: "Graph Theory: Breadth First Search & Dijkstra's Algorithm", venue: "YouTube", type: "youtube", category: "Graph Theory", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "yt-3", title: "Computer Networks: TCP/IP Layer vs OSI Reference Model", venue: "YouTube", type: "youtube", category: "Computer Networks", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "yt-4", title: "Discrete Structures: Hasse Diagrams & Lattices", venue: "YouTube", type: "youtube", category: "Discrete Structures", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Groundwater Depletion Predictor",
    description: "An interactive Machine Learning web app displaying time-series projections of aquifer drawdown in the Himalayan foothill basins, based on urban expansion metrics.",
    techStack: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "Matplotlib"],
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-2",
    title: "AI-Powered Academic Curriculum Planner",
    description: "A NLP-based semantic analyzer matching university syllabus outlines with industry job postings to highlight skills gaps and recommend learning units.",
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Gemini API"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "AI in Higher Education: Transforming Classrooms in 2026",
    slug: "ai-in-education",
    excerpt: "Exploring the strategic integration of Large Language Models (LLMs) and custom GPT agents in engineering curricula. Learn how professors are grading smarter and engaging students.",
    content: `
# AI in Higher Education: Transforming Classrooms in 2026

Artificial Intelligence (AI) is no longer a futuristic buzzword in academic hallways. In 2026, it is actively reshaping how computer science and data science curricula are delivered. From personalized AI tutoring assistants to automated code evaluation systems, the academic landscape is undergoing a massive shift.

## 1. Collaborative Learning with LLMs
Students today use generative models to debug their code in real time. Rather than replacing critical thinking, when mentored correctly, AI acts as an active helper. 

> "AI should not write the code; it should be the conversational partner that probes the student to think deeper about algorithmic complexity."

## 2. Dynamic Curriculum Design
With industries changing at breakneck speeds, curriculum designers must adapt. We are using semantic embedding analysis to compare syllabus outputs with job boards, generating automated course updates for subjects like **Machine Learning** and **Data Structures**.

## 3. The Future of Grading
With modern AI grading assistants, professors can provide rich, personalized feedback on essays and coding styling guidelines, leaving more hours open for direct research mentorship.
`,
    category: "AI & Education",
    tags: ["Artificial Intelligence", "Curriculum Development", "Mentorship"],
    status: "published",
    createdAt: "2026-06-20T10:00:00Z",
    publishedAt: "2026-06-20T10:00:00Z",
    views: 145,
    likes: 42,
    featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "AI in Higher Education: Classroom Transformation - Sourabh Bhardwaj",
    seoDescription: "An exploration of LLMs, automatic grading, and semantic syllabus updates in engineering colleges by Sourabh Bhardwaj.",
    comments: [
      { id: "c1", authorName: "Prof. Amit Verma", authorEmail: "amit@dbuu.ac.in", content: "Outstanding insights, Sourabh. The shift to dynamic curriculum mapping is highly required.", createdAt: "2026-06-21T12:00:00Z" }
    ]
  },
  {
    id: "blog-2",
    title: "Demystifying Statistical Learning: From Linear Regression to Deep Neural Nets",
    slug: "statistical-learning-demystified",
    excerpt: "A structured walkthrough bridging the gap between undergraduate mathematics (linear algebra/probability) and state-of-the-art deep learning architectures.",
    content: `
# Demystifying Statistical Learning: Mathematics to Deep Learning

Many aspiring data scientists jump directly to coding \`model.fit()\` without understanding the underlying math. But data science is simply applied statistics and linear algebra.

## The Pillars of Data Science Math
1. **Linear Algebra:** Vector spaces, projections, and Eigenvalue Decomposition are the absolute backbone of Principal Component Analysis (PCA) and deep layers.
2. **Probability & Statistics:** Bayesian inferences, random variables, and expectation-maximization are what make modern classification algorithms tick.
3. **Multivariate Calculus:** Partial derivatives and gradients are required to implement gradient descent optimizations.

By grounding your studies in core mathematical modules, you prepare yourself to solve genuine industry challenges rather than just repeating template code.
`,
    category: "Data Science",
    tags: ["Mathematics", "Machine Learning", "Statistics"],
    status: "published",
    createdAt: "2026-06-24T14:00:00Z",
    publishedAt: "2026-06-24T14:00:00Z",
    views: 92,
    likes: 28,
    featuredImage: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Learn Statistical Learning: Math to Deep Learning - Sourabh Bhardwaj",
    seoDescription: "Bridging mathematics and deep neural network concepts for data science students.",
    comments: []
  }
];
