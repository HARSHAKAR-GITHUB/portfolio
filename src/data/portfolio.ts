// ─────────────────────────────────────────────
// Harsh Akar — portfolio content config
// Source of truth: HarshAkar_Resume PDF (Oct 2026)
// Empty string ("") = hide that link/action in public UI.
// ─────────────────────────────────────────────

export const site = {
  name: "Harsh Akar",
  role: "Application Security · VAPT · Penetration Testing",
  tagline: "Curiosity, code, and controlled chaos.",
  url: "https://harshakar.dev",
  description:
    "Harsh Akar — Security Engineer & VAPT Analyst with hands-on corporate penetration testing across Web, API, Android, Network, SIEM (Wazuh), and Malware Analysis. Certified Ethical Hacker (CEH), CompTIA CySA+, Security+, Network+, Linux+.",
  status: "Currently testing & exploring",
  location: "Noida, India",
  localTimeNote: "IST",
};

export const contact = {
  email: "harshakar.official@gmail.com",
  github: "https://github.com/Harshakar-official",
  linkedin: "",
  // optional:
  bugcrowd: "",
  tryhackme: "",
  medium: "",
  x: "",
  resumePath: "/Harsh_Akar_Resume.pdf",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Certs", href: "#certs" },
  { label: "Work", href: "#work" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Lab", href: "#lab" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export type Certification = {
  issuer: string;
  title: string;
  code: string;
  badge: string;
  skills: string[];
};

export const certifications: Certification[] = [
  {
    issuer: "CompTIA",
    title: "CySA+ — Cybersecurity Analyst",
    code: "CS0-003",
    badge: "SOC / Analyst",
    skills: ["Vulnerability Management", "Threat Intelligence", "Incident Response", "Security Operations"],
  },
  {
    issuer: "EC-Council",
    title: "Certified Ethical Hacker (CEH)",
    code: "ANSI Accr.",
    badge: "Offensive",
    skills: ["Penetration Testing", "System Hacking", "Attack Vectors", "Network Enumeration"],
  },
  {
    issuer: "CompTIA",
    title: "Security+",
    code: "SY0-701",
    badge: "Foundational",
    skills: ["Threats & Attacks", "Architecture", "Cryptography", "Risk Assessment"],
  },
  {
    issuer: "Quick Heal",
    title: "Certified Malware Analyst",
    code: "QH-CMA",
    badge: "Reverse Eng",
    skills: ["Static & Dynamic Analysis", "Reverse Engineering", "PE Analysis", "Behavioral Triage"],
  },
  {
    issuer: "CompTIA",
    title: "Network+",
    code: "N10-008",
    badge: "Infrastructure",
    skills: ["TCP/IP & Subnetting", "Routing & Switching", "Network Protocols", "Packet Analysis"],
  },
  {
    issuer: "CompTIA",
    title: "Linux+",
    code: "XK0-005",
    badge: "Systems",
    skills: ["Linux Kernel & Architecture", "System Administration", "Security Permissions", "Bash Automation"],
  },
];

export const achievements = [
  { k: "CTF", t: "6th Place (Solo) — QuickHeal LPU CTF 2024", highlight: true },
  { k: "CTF", t: "11th Place — N3on Byte CTF 2023", highlight: true },
  { k: "CTF", t: "150th Place (Solo) — Crew CTF 2023", highlight: false },
  { k: "CTF", t: "164th Place — BDSec CTF 2023", highlight: false },
  { k: "CTF", t: "611th Place (Solo) — Tenable CTF 2023", highlight: false },
  { k: "LAB", t: "Top 2% Globally — TryHackMe", highlight: true },
  { k: "LAB", t: "814th Global Rank — HackTheBox", highlight: true },
];

export type Project = {
  id: string;
  title: string;
  type: string;
  year: string;
  description: string;
  highlights?: string[];
  stack: string[];
  repoUrl: string;
  demoUrl?: string;
  writeupUrl?: string;
  language?: string;
};

export type SecurityTool = {
  name: string;
  language: string;
  description: string;
  url: string;
  tags: string[];
};

export const securityTools: SecurityTool[] = [
  {
    name: "WAFDETECTOR",
    language: "PowerShell",
    description: "Automated Web Application Firewall detection script leveraging fingerprinting and payload response inspection.",
    url: "https://github.com/Harshakar-official/WAFDETECTOR",
    tags: ["PowerShell", "WAF Detection", "Recon"],
  },
  {
    name: "Encoder_decoder",
    language: "Python",
    description: "CLI security utility for rapid Base64, UTF-16, URL, Hex, and ROT13 encoding/decoding during penetration testing.",
    url: "https://github.com/Harshakar-official/Encoder_decoder",
    tags: ["Python", "CLI", "Payload Crafting"],
  },
  {
    name: "AutoMailer-Pro",
    language: "Python",
    description: "Automated bulk email delivery utility with secure Gmail App Password authentication and dynamic recipient templating.",
    url: "https://github.com/Harshakar-official/AutoMailer-Pro",
    tags: ["Python", "Automation", "Security"],
  },
];

export const projects: Project[] = [
  {
    id: "mobile-service-app",
    title: "Mobile Service App",
    type: "Android Application",
    year: "2024",
    description:
      "Native mobile service platform connecting consumers and service providers with dedicated authentication pathways and an interactive UI.",
    highlights: [
      "Dual authentication portals separating consumer and provider experiences",
      "Interactive UI with responsive service discovery and booking flows",
      "Robust role-based access control and secure session architecture",
    ],
    stack: ["Kotlin", "Android SDK", "XML Layouts", "RBAC", "Mobile Security"],
    repoUrl: "https://github.com/Harshakar-official/Mobile_Service_App",
    language: "Kotlin",
  },
  {
    id: "the-chat",
    title: "TheChat — Secure Messenger",
    type: "Real-Time Mobile App",
    year: "2024",
    description:
      "Streamlined real-time instant messaging application built on Firebase with real-time sync, secure authentication, and clean conversational UI.",
    highlights: [
      "Secure Firebase user onboarding, credential management & one-tap signout",
      "Low-latency real-time database listeners for instant message transmission",
      "Clear visual message hierarchy with distinctive sent and received bubbles",
    ],
    stack: ["Kotlin", "Firebase Auth", "Realtime Database", "Android", "Cloud Firestore"],
    repoUrl: "https://github.com/Harshakar-official/TheChat",
    language: "Kotlin",
  },
];

export const toolkit: { category: string; note: string; items: string[] }[] = [
  {
    category: "Web & API Security",
    note: "core pentesting focus",
    items: [
      "Web App Pentesting",
      "REST API Security",
      "OWASP Top 10",
      "OWASP API Top 10",
      "IDOR / BOLA",
      "SQLi / Ghauri / sqlmap",
      "XSS & SSRF",
      "CSRF & CORS",
      "JWT & OAuth Security",
      "Business Logic Flaws",
      "Burp Suite Professional",
      "Postman",
    ],
  },
  {
    category: "Penetration Testing & Recon",
    note: "assessment workflow",
    items: [
      "Nmap & RustScan",
      "Metasploit Framework",
      "ffuf & Feroxbuster",
      "httpx & Subfinder",
      "Amass & waybackurls",
      "Wireshark",
      "John the Ripper / Hashcat",
      "CVSS Risk Scoring",
    ],
  },
  {
    category: "Mobile Application Security",
    note: "Android & OWASP MASVS",
    items: [
      "JADX",
      "MobSF",
      "Frida",
      "APKTool",
      "APK-MITM",
      "Androguard",
      "Quark",
      "Static & Dynamic Analysis",
      "Runtime Instrumentation",
      "OWASP MASVS",
    ],
  },
  {
    category: "SIEM & Security Operations",
    note: "detection & monitoring per resume",
    items: [
      "Wazuh SIEM",
      "SIEM Monitoring",
      "Log Analysis (Linux & Win)",
      "Custom Detection Rules",
      "Alert Triage & Incident Response",
      "Event Correlation",
      "MITRE ATT&CK Mapping",
      "Auditd & Syslog",
      "Windows Event Logs",
    ],
  },
  {
    category: "Reverse Engineering & Malware",
    note: "binary & threat analysis",
    items: [
      "Ghidra",
      "IDA Pro",
      "GDB",
      "x64dbg",
      "Static Malware Analysis",
      "Dynamic Malware Analysis",
      "PE File Reversing",
      "Behavioral Triage",
    ],
  },
  {
    category: "AI & LLM Application Security",
    note: "emerging research & testing",
    items: [
      "Prompt Injection (Direct & Indirect)",
      "Jailbreak Testing",
      "System Prompt Leakage",
      "Sensitive Data Exposure",
      "Insecure Output Handling",
      "LLM API Security",
      "AI Red Teaming",
      "Prompt Engineering",
    ],
  },
  {
    category: "Languages & OS",
    note: "building & automation",
    items: [
      "Python",
      "Bash",
      "Kotlin",
      "Java",
      "C / C++",
      "HTML & CSS",
      "Kali Linux",
      "Parrot OS",
      "Ubuntu",
      "Windows",
      "macOS",
    ],
  },
  {
    category: "Cloud Platforms",
    note: "infrastructure testing",
    items: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)"],
  },
];

export type JourneyItem = {
  period: string;
  title: string;
  org: string;
  detail: string;
  tags: string[];
};

export const journey: JourneyItem[] = [
  {
    period: "02/2026 – Present",
    title: "Security Engineer",
    org: "SDET Tech · Noida",
    detail:
      "Conduct web application, API, Android, and network security assessments to validate exploitable vulnerabilities. Perform manual testing across authentication, authorization, session management, input validation, and business logic. Prepare risk-based technical remediation reports and collaborate with engineering teams for retesting.",
    tags: ["VAPT", "Web", "API", "Android", "Network"],
  },
  {
    period: "02/2025 – 02/2026",
    title: "Information Security Engineer (L-2)",
    org: "Codec Networks · Delhi",
    detail:
      "Executed penetration testing and vulnerability assessments across web applications, APIs, Android applications, and network environments. Developed comprehensive technical reports containing reproduction steps, CVSS risk ratings, and remediation recommendations.",
    tags: ["Pentest", "Web", "API", "Android", "Reporting"],
  },
  {
    period: "01/2025 – 02/2025",
    title: "Security Intern",
    org: "Retrace Labs · Remote",
    detail:
      "Assisted with malware analysis on infected systems to investigate suspicious files and malicious behavior. Conducted web application security testing and documented identified vulnerabilities.",
    tags: ["Malware", "Web", "Reverse Eng"],
  },
  {
    period: "10/2022 – 12/2024",
    title: "Security Researcher",
    org: "Bugcrowd · Remote",
    detail:
      "Freelance security researcher performing penetration testing for client engagements, including Smugglerz Inc. and Eazyrides. Investigated potential security weaknesses with Burp Suite and Nmap, submitting findings with impact assessments and remediation guidance.",
    tags: ["Bugcrowd", "Pentesting", "Burp Suite", "Nmap"],
  },
  {
    period: "08/2021 – 07/2025",
    title: "B.Tech Hons. Cyber Security & Blockchain",
    org: "Lovely Professional University (LPU)",
    detail: "Undergraduate degree specialized in cybersecurity defense, offensive testing, cryptographic systems, and blockchain security.",
    tags: ["Education", "Cybersecurity", "Blockchain"],
  },
];

export const exploringNow = [
  "SIEM monitoring & Wazuh custom detection engineering",
  "LLM application security & prompt injection defense",
  "Advanced Android runtime instrumentation with Frida",
  "Automated attack surface discovery scripts",
  "Corporate VAPT methodology refinement & reporting",
];
