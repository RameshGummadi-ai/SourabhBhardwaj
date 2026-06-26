"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  BookOpen,
  Phone,
  Search,
  Filter,
  ArrowUpDown,
  GraduationCap,
  Award,
  Video,
  Send,
  Linkedin,
  Mail,
  Flame,
  Briefcase,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  BookMarked
} from "lucide-react";
import StatCounter from "@/components/StatCounter";
import PublicationCard from "@/components/PublicationCard";
import {
  getPublications,
  getExperiences,
  getEducation,
  getCertifications,
  getLectures,
  getProjects,
  saveMessage,
  Publication,
  Experience,
  Education as EduType,
  Certification,
  Lecture,
  Project
} from "@/services/db";

export default function HomePage() {
  // Database States
  const [publications, setPublications] = useState<Publication[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<EduType[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [selectedYtCategory, setSelectedYtCategory] = useState<string>("All");

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isFlipped, setIsFlipped] = useState(false);

  // Course Preview Popup State
  const [previewCert, setPreviewCert] = useState<string | null>(null);

  useEffect(() => {
    // Load all data from DB (mock or firebase)
    Promise.all([
      getPublications(),
      getExperiences(),
      getEducation(),
      getCertifications(),
      getLectures(),
      getProjects()
    ]).then(([pubs, exps, edus, certs, lecs, projs]) => {
      setPublications(pubs);
      setExperiences(exps);
      setEducation(edus);
      setCertifications(certs);
      setLectures(lecs);
      setProjects(projs);
    });
  }, []);

  // Filter & Sort publications
  const filteredPublications = publications
    .filter(pub => {
      const matchQuery = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.authors.some(auth => auth.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchYear = selectedYear === "all" || pub.year.toString() === selectedYear;
      return matchQuery && matchYear;
    })
    .sort((a, b) => {
      return sortBy === "newest" ? b.year - a.year : a.year - b.year;
    });

  // Get unique publication years for filter
  const pubYears = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);

  // Filter lectures
  const guestLectures = lectures.filter(l => l.type === "guest");
  const youtubeLectures = lectures.filter(l => l.type === "youtube");
  const ytCategories = ["All", ...Array.from(new Set(youtubeLectures.map(l => l.category || "")))].filter(Boolean);

  const filteredYtLectures = selectedYtCategory === "All"
    ? youtubeLectures
    : youtubeLectures.filter(l => l.category === selectedYtCategory);

  // Handle Contact Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    try {
      await saveMessage(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="pt-20 space-y-24 md:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none -z-15 overflow-hidden">
          <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary-500/10 blur-[80px] animate-float" />
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-accent-500/10 blur-[100px] animate-float-delayed" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-550/10 dark:bg-primary-950/40 text-primary-650 dark:text-primary-400 text-xs font-semibold"
            >
              <Flame className="h-4 w-4 animate-bounce" />
              <span>GATE & NET Qualified Educator</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Hi, I am <br />
              <span className="gradient-text">Sourabh Bhardwaj</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300"
            >
              Assistant Professor | Data Analyst | AI Researcher
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm italic text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 border-l-4 border-accent-500 pl-4 py-1"
            >
              &ldquo;Transforming Data into Insights and Education into Innovation.&rdquo;
            </motion.blockquote>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/10 dark:shadow-none hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </a>
              <a
                href="#research"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 hover:border-primary-500 transition-colors"
              >
                <BookOpen className="h-4 w-4 text-primary-500" />
                <span>View Publications</span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Contact Me</span>
              </a>
            </motion.div>
          </div>

          {/* Profile Photo Card with premium 3D flip effect */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full"
            >
              {/* Outer spin ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 via-accent-500 to-secondary-500 animate-spin-slow opacity-75 blur-[2px]" style={{ animationDuration: "12s" }} />
              
              {/* Flippable Card Container */}
              <div 
                className="absolute inset-2 cursor-pointer rounded-full overflow-hidden"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative rounded-full"
                >
                  {/* Front Face (Photo) */}
                  <div 
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center border-4 border-white/20 dark:border-slate-800 overflow-hidden shadow-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/Sourabh_photo.jpeg" 
                      alt="Sourabh Bhardwaj" 
                      className="w-full h-full object-cover"
                    />
                    {/* Visual Overlay hint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end pb-8 pt-4 px-4 text-center">
                      <p className="text-white font-bold text-base leading-tight">Sourabh Bhardwaj</p>
                      <p className="text-[9px] text-primary-400 font-semibold uppercase tracking-wider mt-0.5">Hover or tap to flip</p>
                    </div>
                  </div>

                  {/* Back Face (Details) */}
                  <div 
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    className="absolute inset-0 rounded-full bg-white dark:bg-slate-950 flex flex-col items-center justify-center border-4 border-white/20 dark:border-slate-800 p-6 text-center shadow-2xl"
                  >
                    <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-primary-500 border border-slate-200 dark:border-slate-800 shadow-md">
                      <GraduationCap className="h-9 w-9" />
                    </div>
                    <div className="text-center mt-3 px-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">Sourabh Bhardwaj</h3>
                      <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-1">Data Analyst & AI Mentor</p>
                      <div className="flex flex-col gap-1 mt-3">
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-mono font-semibold">
                          GATE & NET Certified
                        </span>
                        <span className="text-[8px] text-slate-450 uppercase tracking-widest font-mono">
                          6+ Years Teaching
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 hidden md:block">
          <div className="glass-panel py-6 px-8 rounded-3xl grid grid-cols-5 text-center gap-4 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
            <div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                <StatCounter value={6} suffix="+" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Teaching Years</div>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                <StatCounter value={10} suffix="+" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Publications</div>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                <span>GATE</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Qualified</div>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                <span>NET</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Qualified</div>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                <span>AI</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mentor</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Bio Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Academician & Guide</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Professional Profile</h2>
            </div>
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                As an Assistant Professor and AI Researcher, my career is dedicated to bridging the gap between mathematical foundations and modern data science practices. I design structured IT curriculums and mentor students through rigorous algorithm analysis, programming methodologies, and statistical modeling.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">
                  <div className="font-bold text-slate-900 dark:text-white">Curriculum Designer</div>
                  <div className="text-slate-500 mt-0.5">Syllabus Mapping</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">
                  <div className="font-bold text-slate-900 dark:text-white">Research Guide</div>
                  <div className="text-slate-500 mt-0.5">Journal Guidance</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl col-span-2">
                  <div className="font-bold text-slate-900 dark:text-white">AI & Data Science Mentor</div>
                  <div className="text-slate-500 mt-0.5">Machine Learning, NLP & statistics training</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Career Journey Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-secondary-500" />
              Career Timeline
            </h3>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Bullet */}
                  <span className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-white dark:border-slate-950 ${
                    index === 0 ? "bg-primary-500 animate-ping" : "bg-slate-300 dark:bg-slate-800"
                  }`} />
                  <span className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-white dark:border-slate-950 ${
                    index === 0 ? "bg-primary-500" : "bg-slate-300 dark:bg-slate-800"
                  }`} />

                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-primary-550 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-2 py-0.5 rounded">
                      {exp.period}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {exp.role} — <span className="text-slate-600 dark:text-slate-350">{exp.institution}</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {exp.responsibilities[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED EXPERIENCE SECTION */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-50/50 dark:bg-slate-950/20 py-16 rounded-3xl border border-slate-100 dark:border-slate-900/40">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Professional Journey</span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-12">Detailed Academic Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-850 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{exp.role}</h3>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">{exp.period}</span>
                </div>
                <h4 className="text-sm font-semibold text-primary-650 dark:text-primary-400">{exp.institution}</h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 list-disc list-inside">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="leading-relaxed">{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EDUCATION SECTION */}
      <section id="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary-500">Qualifications</span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-12">Academic Pedigree</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={edu.id}
              className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-850 text-left space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary-50 dark:bg-secondary-950/45 text-secondary-600 rounded-2xl shadow-inner">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{edu.degree}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{edu.institution} ({edu.period})</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                {edu.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {edu.skillsLearned.map(skill => (
                  <span key={skill} className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SKILLS SECTION */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Expertise</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Technical & Soft Skills</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Tech skills */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Technical Capabilities</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Python", val: 95 },
                { name: "Machine Learning", val: 90 },
                { name: "Artificial Intelligence", val: 85 },
                { name: "Deep Learning & NLP", val: 80 },
                { name: "Data Structures & C/C++", val: 90 },
                { name: "SQL & DBMS", val: 85 },
                { name: "Statistics & Probability", val: 90 },
                { name: "R Programming", val: 75 }
              ].map(tech => (
                <div key={tech.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{tech.name}</span>
                    <span className="text-primary-500">{tech.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft skills */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Professional Competencies</h3>
            <div className="space-y-4">
              {[
                { name: "Mentoring & Research Guidance", desc: "Supervising undergraduate and postgraduate students on research methodology and journal writing." },
                { name: "Curriculum Development", desc: "Crafting structured academic syllabi aligned with dynamic IT and Data Science job markets." },
                { name: "Leadership & Collaboration", desc: "Managing departmental duties, workshop scheduling, and technical youth festivals." },
                { name: "Critical Analytical Thinking", desc: "Translating statistical complexities into simple pedagogical constructs for student understanding." }
              ].map(skill => (
                <div key={skill.name} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/40 p-4 rounded-2xl">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{skill.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESEARCH PUBLICATIONS SECTION */}
      <section id="research" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Research & Journals</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Research Publications</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Search, filter, and review peer-reviewed journal papers guided and co-authored by Sourabh.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 border border-slate-200 dark:border-slate-850 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search paper title or co-author..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto justify-end">
            {/* Year filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-1.5 px-3 outline-none text-slate-800 dark:text-slate-100"
              >
                <option value="all">All Years</option>
                {pubYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Sort filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                className="bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-1.5 px-3 outline-none text-slate-800 dark:text-slate-100"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Publications Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPublications.length > 0 ? (
              filteredPublications.map(pub => (
                <PublicationCard key={pub.id} publication={pub} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-16 text-center text-slate-500"
              >
                No publications found matching your search.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 7. CERTIFICATIONS & ACHIEVEMENTS */}
      <section id="certifications" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-50/50 dark:bg-slate-950/20 py-16 rounded-3xl border border-slate-100 dark:border-slate-900/40">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Achievements</span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-12">Badges & Achievements</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {certifications.filter(c => c.type === "achievement").map((cert) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={cert.id}
              className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center text-primary-650 dark:text-primary-400">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{cert.title}</h3>
                <p className="text-[10px] text-slate-500">{cert.issuer} ({cert.year})</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. SWAYAM / NPTEL COURSES */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary-500">Professional Courses</span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-12">NPTEL & SWAYAM Certifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {certifications.filter(c => c.type === "course").map((cert) => (
            <div key={cert.id} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <span className="bg-secondary-50 dark:bg-secondary-950/40 text-secondary-650 dark:text-secondary-400 text-[10px] font-semibold px-2 py-0.5 rounded">
                  {cert.issuer}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{cert.title}</h3>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900 mt-4 pt-3">
                <span className="text-xs text-slate-500">Year: {cert.year}</span>
                <button
                  onClick={() => setPreviewCert(cert.title)}
                  className="flex items-center gap-1 text-[10px] font-bold text-primary-500 hover:underline"
                >
                  <span>Preview Certificate</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate preview modal */}
        <AnimatePresence>
          {previewCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCert(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-850 space-y-6 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Course Completed</h3>
                  <p className="text-sm text-slate-500 mt-2">{previewCert}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 p-4 rounded-xl text-xs text-slate-500">
                  <p>Certified by IIT Madras / NPTEL (SWAYAM Portal).</p>
                  <p className="mt-1 font-mono">Status: Verified Academic Record</p>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-xl font-bold hover:bg-primary-650 dark:hover:bg-primary-400 dark:hover:text-white transition-colors text-sm"
                >
                  Close Preview
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 9. GUEST LECTURES */}
      <section id="guest-lectures" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Outreach</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Invited Guest Lectures</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {guestLectures.map(lec => (
            <div key={lec.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-850 flex gap-4 items-start">
              <div className="p-3 bg-primary-100 dark:bg-primary-950/40 text-primary-600 rounded-2xl">
                <BookMarked className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">&ldquo;{lec.title}&rdquo;</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{lec.venue}</p>
                <span className="inline-block mt-2 bg-slate-100 dark:bg-slate-900 text-slate-500 text-[10px] font-mono px-2 py-0.5 rounded">Invited Speaker</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. YOUTUBE LECTURES GALLERY */}
      <section id="youtube-lectures" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-50/50 dark:bg-slate-950/20 py-16 rounded-3xl border border-slate-100 dark:border-slate-900/40">
        <span className="text-xs font-bold uppercase tracking-wider text-red-500">Video Tutorials</span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-6">YouTube Lectures & Classrooms</h2>
        
        {/* Category toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ytCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedYtCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedYtCategory === cat
                  ? "bg-red-655 text-white bg-red-600"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-350"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-6xl mx-auto">
          {filteredYtLectures.map(video => (
            <div key={video.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
              {/* Fake thumbnail/embed placeholder */}
              <div className="relative aspect-video bg-slate-200 dark:bg-slate-900 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-red-500 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">Tutorial</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-mono font-semibold text-primary-500 uppercase">{video.category}</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight line-clamp-2">{video.title}</h3>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Prof. Sourabh</span>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-0.5 text-red-500 font-bold hover:underline"
                  >
                    <span>Watch</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. PROJECTS SECTION */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Development</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Research Projects & Tools</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {projects.map(proj => (
            <div key={proj.id} className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-850 flex flex-col justify-between h-full shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-900">
                {proj.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
                    <Briefcase className="h-12 w-12 text-slate-400" />
                  </div>
                )}
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{proj.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.techStack.map(stack => (
                    <span key={stack} className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-900/60 flex gap-4 text-xs font-semibold">
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-primary-500"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. RESEARCH GUIDANCE SECTION */}
      <section id="guidance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-50/50 dark:bg-slate-950/20 py-16 rounded-3xl border border-slate-100 dark:border-slate-900/40">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary-500">Supervision</span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-12">Academic Guidance & Mentorship</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Guided Thesis Papers</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Supervising B.Tech and MCA student research on regional environmental issues (Uttarakhand groundwater analysis, crop sustainability mapping, Aravalli forest canopy metrics) and medical informatics datasets.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Student Research Groups</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fostering technical analysis teams. Guiding students in applying statistical ML frameworks (Random Forests, XGBoost, sublinear approximations) to solve complex demographic risk curves in cardiovascular and safety studies.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Mentorship Workshops</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Conducting monthly masterclasses on resume parsing optimizations, preparing engineering candidates for technical recruitment interviews, and hosting national eligibility (GATE & NET) training panels.
            </p>
          </div>
        </div>
      </section>

      {/* 13. CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Contact</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Reach Out</h2>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                Whether you are a student looking for research guidance, a scholar proposing collaboration, or an institution hosting a technical workshop, feel free to send a message.
              </p>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-primary-500">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Academic Email</div>
                  <a href="mailto:Sourabh7796@gmail.com" className="text-sm font-bold text-slate-900 dark:text-white hover:underline">
                    Sourabh7796@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-secondary-500">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Phone Helpline</div>
                  <a href="tel:+919891605943" className="text-sm font-bold text-slate-900 dark:text-white hover:underline">
                    +91 9891605943
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-350 hover:bg-primary-600 hover:text-white transition-colors w-fit"
              >
                <Linkedin className="h-4 w-4 text-blue-500" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-850 text-left">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs focus:border-primary-500 text-slate-800 dark:text-slate-100"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs focus:border-primary-500 text-slate-800 dark:text-slate-100"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs focus:border-primary-500 text-slate-800 dark:text-slate-100"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs focus:border-primary-500 text-slate-800 dark:text-slate-100"
                      placeholder="Subject of message"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs resize-none focus:border-primary-500 text-slate-800 dark:text-slate-100"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-primary-500/25 disabled:opacity-50 text-xs"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitStatus === "sending" ? "Sending..." : "Send Message"}</span>
                </button>

                {submitStatus === "success" && (
                  <p className="text-xs font-semibold text-emerald-500 text-center mt-2">
                    Thank you! Your message was sent successfully and saved to the database.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-xs font-semibold text-red-500 text-center mt-2">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
