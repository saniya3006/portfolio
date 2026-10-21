// Single source of truth for all portfolio content.

export const profile = {
  name: "Saniya Mehta",
  firstName: "Saniya",
  initials: "SM",
  location: "Pune, Maharashtra, India",
  email: import.meta.env.VITE_CONTACT_EMAIL ?? "saniyameh30@gmail.com",
  resumeUrl:
    import.meta.env.VITE_RESUME_URL ??
    "https://drive.google.com/file/d/1gZ7WZphaL391djGchmsI3dqEQazcbIgm/view",
  resumePdf: "/Saniya_Mehta_Resume.pdf",
  github: "https://github.com/saniya3006",
  linkedin: "https://www.linkedin.com/in/saniya-s-mehta-2001b6389/",
  roles: ["AI / ML Engineer", "Data Pipeline Builder", "Full-Stack Developer", "Blockchain Developer"],
  tagline:
    "Final-year Computer Engineering student and former AI Intern at Tech Mahindra. I work on synthetic data generation, evaluation pipelines, machine learning, and full-stack and blockchain apps.",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { value: 9.19, decimals: 2, suffix: "", label: "SGPA out of 10" },
  { value: 3, decimals: 0, suffix: " mo", label: "AI internship at Tech Mahindra" },
  { value: 7, decimals: 0, suffix: "+", label: "Projects built" },
  { value: 3, decimals: 0, suffix: "", label: "Cloud & Gen AI certifications" },
];

export const about = {
  paragraphs: [
    "I'm a final-year B.E. Computer Engineering student at Bharati Vidyapeeth's College of Engineering for Women, Pune, with a 9.19/10 SGPA.",
    "As an AI Intern at Tech Mahindra, I worked on Project Indus, building synthetic data generation workflows and evaluation pipelines for multilingual AI models.",
    "I like working across the stack: from data preprocessing and model evaluation to Flask and FastAPI backends, React frontends, and Solidity smart contracts. I have a strong foundation in Python, C++, SQL, DSA, OOP and DBMS.",
  ],
  facts: [
    { label: "Based in", value: "Pune, India" },
    { label: "Currently", value: "Final-year B.E." },
    { label: "Focus", value: "AI/ML · Data · SWE" },
    { label: "Work mode", value: "On-site · Hybrid" },
  ],
  interests: ["Multilingual AI", "Data quality", "Model evaluation", "Web3", "AR/VR"],
};

export const experience = [
  {
    role: "Artificial Intelligence Intern",
    company: "Tech Mahindra",
    project: "Project Indus",
    period: "Jan 2026 – Mar 2026",
    location: "Pune, Maharashtra · On-site",
    type: "Internship",
    points: [
      "Built and validated synthetic data generation workflows that supported multilingual AI model training and expanded evaluation data coverage.",
      "Designed and structured AI evaluation datasets, using data quality checks to catch inconsistencies before handoff to the model team.",
      "Configured and validated end-to-end evaluation pipelines for AI training datasets, making evaluation data more consistent and reliable.",
      "Worked with the project team to prepare, validate and organize datasets for multilingual AI model evaluation.",
    ],
    skills: ["Artificial Intelligence", "Synthetic Data", "Evaluation Pipelines", "Data Quality", "Python"],
  },
];

export type ProjectCategory = "ai" | "blockchain" | "fullstack";

export type Project = {
  title: string;
  kind: string;
  badge: string;
  live?: boolean;
  summary: string;
  details: string[];
  stack: string[];
  categories: ProjectCategory[];
  repo?: string;
  demo?: string;
};

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "blockchain", label: "Blockchain" },
  { id: "fullstack", label: "Full-stack" },
];

export const projects: Project[] = [
  {
    title: "ReliefChain",
    kind: "Blockchain · Full-stack",
    badge: "Live",
    live: true,
    summary:
      "A blockchain-based tracker for disaster-relief campaigns, donations and fund allocations, with transparent on-chain records.",
    details: [
      "Tracks relief campaigns, donations and fund allocations through transparent, tamper-evident on-chain records.",
      "Solidity smart contracts with access control, transaction verification, campaign management and fund-allocation validation.",
      "FastAPI + Web3.py backend connecting the contracts to a React frontend.",
    ],
    stack: ["Solidity", "Ethereum", "Hardhat", "FastAPI", "React", "Web3.py"],
    categories: ["blockchain", "fullstack"],
    repo: "https://github.com/saniya3006/saniya3006-ReliefChain-Blockchain-Based-Disaster-Relief-Fund-Tracker",
    demo: "https://saniya3006-relief-chain-blockchain.vercel.app",
  },
  {
    title: "AICHAIN",
    kind: "AI · Blockchain",
    badge: "Prototype",
    summary:
      "An AI-powered content provenance registry that gives each registered image a verifiable Digital Content Passport.",
    details: [
      "Combines a probabilistic AI-generated-image estimate, SHA-256 file hashing and an Ethereum smart contract.",
      "The AI model gives an estimate, the hash proves byte-exact file identity, and the blockchain stores a timestamped provenance record.",
      "Designed to be honest about its limits: it never claims the blockchain detects AI content or that registration proves truth.",
    ],
    stack: ["AI Detection", "SHA-256", "Solidity", "JavaScript"],
    categories: ["ai", "blockchain"],
    repo: "https://github.com/saniya3006/AICHAIN",
  },
  {
    title: "ImageSleuth AI",
    kind: "AI · Image Forensics",
    badge: "Python",
    summary:
      "An offline image-forensics tool that surfaces tampering indicators for human examiners to investigate.",
    details: [
      "Records a SHA-256 fingerprint of the uploaded bytes before any analysis and compares it against a reference hash.",
      "Extracts and explains EXIF metadata, and runs Error Level Analysis and keypoint-based copy-move detection.",
      "Exploratory noise, edge and channel views, with a downloadable PDF report. Runs fully offline.",
    ],
    stack: ["Python", "Computer Vision", "ELA", "EXIF"],
    categories: ["ai"],
    repo: "https://github.com/saniya3006/ImageSleuth-AI",
  },
  {
    title: "BlockVote: Decentralized E-Voting",
    kind: "Blockchain · dApp",
    badge: "33 tests",
    summary:
      "A blockchain e-voting dApp with admin and voter workflows, MetaMask integration and live result charts.",
    details: [
      "Solidity 0.8.24 voting contract developed and deployed with Hardhat (local node and Sepolia testnet).",
      "React 18 + Vite + Tailwind frontend using ethers.js v6 and MetaMask, with Recharts for live results.",
      "33 automated tests with 100% line and 98% branch coverage.",
    ],
    stack: ["Solidity", "Hardhat", "React", "ethers.js", "Tailwind"],
    categories: ["blockchain", "fullstack"],
    repo: "https://github.com/saniya3006/Blockchain-E-Voting-System",
  },
  {
    title: "TrendCart",
    kind: "Full-stack",
    badge: "Flask",
    summary: "An e-commerce trend and inventory system built with Flask REST APIs and CSV-based persistence.",
    details: [
      "Full-stack inventory management system using Flask, REST APIs and CSV-based data persistence.",
      "Product and order management, inventory tracking, search and filtering, and dashboard analytics.",
    ],
    stack: ["Python", "Flask", "REST API", "JavaScript", "HTML/CSS"],
    categories: ["fullstack"],
  },
  {
    title: "Diabetes Prediction System",
    kind: "Machine Learning",
    badge: "Streamlit",
    summary:
      "ML models (Logistic Regression, Random Forest, KNN) that predict diabetes risk, deployed with Streamlit.",
    details: [
      "Trained and compared Logistic Regression, Random Forest and KNN classifiers.",
      "Data preprocessing, imputation, feature scaling, 5-fold cross-validation and model evaluation.",
      "Deployed as an interactive Streamlit app.",
    ],
    stack: ["scikit-learn", "pandas", "Streamlit"],
    categories: ["ai"],
  },
  {
    title: "AI-Driven AR/VR Therapy",
    kind: "Final-year project",
    badge: "In progress",
    summary:
      "An AI-driven AR/VR application for trauma and phobia therapy with customizable immersive exposure scenarios.",
    details: [
      "Customizable immersive exposure scenarios with adaptive user interactions.",
      "Designing the system architecture and exploring AI-based personalization that adapts the environment in real time.",
    ],
    stack: ["AR/VR", "AI Personalization", "System Design"],
    categories: ["ai"],
  },
];

export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "C++", "SQL", "JavaScript", "Solidity"],
  },
  {
    id: "ai",
    label: "AI / Data",
    items: ["scikit-learn", "pandas", "Data Preprocessing", "Model Evaluation", "Synthetic Data Generation"],
  },
  {
    id: "core",
    label: "Core CS",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
  {
    id: "tools",
    label: "Frameworks & Tools",
    items: ["Flask", "FastAPI", "React", "Hardhat", "Streamlit", "Git & GitHub", "Jupyter", "VS Code", "Excel"],
  },
];

export const techMarquee = [
  "Python", "C++", "SQL", "JavaScript", "Solidity", "pandas", "scikit-learn", "Flask",
  "FastAPI", "React", "Hardhat", "Ethereum", "Web3.py", "Streamlit", "Jupyter", "Git",
];

export const education = [
  {
    school: "Bharati Vidyapeeth's College of Engineering for Women, Pune",
    degree: "Bachelor of Engineering, Computer Engineering",
    period: "2023 – 2027",
    score: "SGPA 9.19 / 10",
    note: "Coursework: DSA, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering",
  },
  {
    school: "Rotary English Medium School, Khed",
    degree: "Class XII (CBSE), Science",
    period: "2022 – 2023",
    score: "70.20%",
  },
  {
    school: "Rotary English Medium School, Khed",
    degree: "Class X (CBSE)",
    period: "2020 – 2021",
    score: "89.66%",
  },
];

export const certifications = [
  { title: "OCI 2025 Certified Generative AI Professional", issuer: "Oracle" },
  { title: "OCI 2025 Foundations Associate", issuer: "Oracle" },
  { title: "AWS Academy Graduate: Generative AI Foundations", issuer: "Amazon Web Services" },
];
