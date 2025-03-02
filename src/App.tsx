import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ExternalLink, 
  ChevronRight,
  Code,
  Database,
  Server,
  Briefcase,
  GraduationCap,
  Award,
  User,
  FileCode,
  Home,
  Download,
  ArrowRight,
  Star,
  CheckCircle,
  Coffee,
  Clock,
  Users,
  Zap,
  BookOpen,
  MessageSquare
} from 'lucide-react';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FileCode size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold font-montserrat">
          <span className="gradient-text">Anzer.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              className={`nav-link flex items-center gap-1 ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary flex items-center gap-1">
            <Mail size={18} />
            Contact
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map(link => (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  className={`nav-link flex items-center gap-2 py-2 ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
              <a 
                href="#contact" 
                className="btn btn-primary flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Mail size={18} />
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animated Section Component
const AnimatedSection = ({ id, className, children }: { id: string, className?: string, children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id={id} className={`py-20 ${className || ''}`}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="container mx-auto px-4"
      >
        {children}
      </motion.div>
    </section>
  );
};

// Stats Counter
const StatCounter = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <div className="bg-primary-100 p-4 rounded-full mb-4">
        {icon}
      </div>
      <div className="stat-counter">{value}</div>
      <div className="text-gray-600 text-center">{label}</div>
    </motion.div>
  );
};

// Testimonial Component
const Testimonial = ({ text, name, role }: { text: string, name: string, role: string }) => {
  return (
    <motion.div 
      variants={fadeIn}
      className="testimonial-card"
    >
      <p className="text-gray-700 mb-6 relative z-10">{text}</p>
      <div className="flex items-center">
        <div className="mr-4 bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
          <Users size={20} className="text-primary-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Ref for scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      {/* Decorative blobs */}
      <div className="blob w-96 h-96 bg-primary-200 top-20 -left-48"></div>
      <div className="blob w-96 h-96 bg-secondary-200 bottom-20 -right-48"></div>
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary-100 filter blur-3xl opacity-60"
        />
        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-secondary-100 filter blur-3xl opacity-60"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <div className="inline-block px-4 py-1 bg-primary-100 rounded-full text-primary-800 font-medium mb-4">
                Backend Developer
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Hi, I'm <span className="gradient-text">Anzer Bin Ubaid</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                Building <span className="highlight">robust</span> backend systems
              </h2>
              <p className="text-gray-600 mb-8 text-lg max-w-lg">
                Passionate about creating scalable and efficient backend solutions with expertise in Node.js, Express, MongoDB, and RESTful APIs.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn btn-primary flex items-center gap-2">
                  <Mail size={18} />
                  Contact Me
                </a>
                <a href="https://drive.google.com/file/d/1UvQ8OHyyjb9ErWeWdP2kxfgZR-qKdUKs/view?usp=drive_link" className="btn btn-outline flex items-center gap-2">
                  <Download size={18} />
                  Download CV
                </a>
              </div>
              <div className="flex mt-8 space-x-4">
                <a href="https://github.com/anzer115" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/anzer-bin-ubaid-108b12297/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:anzer1255ubaid@gmail.com" className="text-gray-700 hover:text-primary-600 transition-colors p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 animate-pulse-slow"></div>
                <img 
                  src="photo.jpg" 
                  alt="Anzer Bin Ubaid" 
                  className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <div className="bg-green-500 rounded-full w-4 h-4 animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-primary-600 transition-colors">
            <ArrowRight size={24} className="transform rotate-90" />
          </a>
        </div>
      </section>

      {/* Stats Section */}
     

      {/* About Section */}
      <AnimatedSection id="about" className="bg-white">
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div variants={fadeInLeft} className="md:w-1/2">
            <h2 className="section-heading">About Me</h2>
            <p className="text-gray-700 mb-6 text-lg">
              I'm a <span className="font-semibold text-primary-700">passionate Backend Developer</span> with a strong foundation in web development technologies. 
              Currently pursuing my B.Tech in ECE at Bharati Vidyapeeth's College of Engineering, New Delhi, 
              I've developed a keen interest in creating efficient and scalable backend solutions.
            </p>
            <p className="text-gray-700 mb-6">
              My experience as a Backend Developer Intern at Nanobios Lab, IIT Bombay has equipped me with 
              practical skills in designing RESTful APIs, managing databases, and collaborating with cross-functional teams.
            </p>
            <p className="text-gray-700 mb-8">
              I'm constantly learning and exploring new technologies to enhance my skills and stay updated with 
              the latest industry trends. My goal is to build innovative solutions that make a positive impact.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                <span className="text-gray-700">Problem Solver</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                <span className="text-gray-700">Team Player</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                <span className="text-gray-700">Fast Learner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                <span className="text-gray-700">Detail Oriented</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInRight} className="md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                variants={fadeIn}
                className="card flex flex-col items-center text-center gradient-border"
                whileHover={{ y: -5 }}
              >
                <Server size={40} className="text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                <p className="text-gray-600">Building robust server-side applications</p>
              </motion.div>
              <motion.div 
                variants={fadeIn}
                className="card flex flex-col items-center text-center gradient-border"
                whileHover={{ y: -5 }}
              >
                <Database size={40} className="text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Database Management</h3>
                <p className="text-gray-600">Designing efficient database structures</p>
              </motion.div>
              <motion.div 
                variants={fadeIn}
                className="card flex flex-col items-center text-center gradient-border"
                whileHover={{ y: -5 }}
              >
                <Code size={40} className="text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">API Development</h3>
                <p className="text-gray-600">Creating scalable RESTful APIs</p>
              </motion.div>
              <motion.div 
                variants={fadeIn}
                className="card flex flex-col items-center text-center gradient-border"
                whileHover={{ y: -5 }}
              >
                <FileCode size={40} className="text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Full Stack</h3>
                <p className="text-gray-600">End-to-end web application development</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience" className="bg-gray-50">
        <h2 className="section-heading">Professional Experience</h2>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <motion.div 
            variants={fadeIn}
            className="card gradient-border"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-primary-700">Backend Developer Intern</h3>
              <div className="flex items-center mt-2 md:mt-0">
                <span className="text-gray-600">Dec '24 – Jan '25</span>
                <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">2 months</span>
              </div>
            </div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Nanobios Lab, Indian Institute of Technology Bombay</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ChevronRight size={20} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span>Designed, developed and integrated scalable RESTful APIs using the Django Rest Framework.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight size={20} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span>Managed backend infrastructure and ensured seamless database operations with MongoDB and MySQL.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight size={20} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span>Collaborated with cross-functional teams to integrate backend services into project workflows.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight size={20} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span>Implemented secure authentication and authorization mechanisms for API endpoints.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight size={20} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span>Optimized database queries and API responses for improved performance.</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h5 className="font-semibold text-gray-700 mb-2">Key Technologies:</h5>
              <div className="flex flex-wrap">
                {['Django', 'Python', 'MongoDB', 'MySQL', 'RESTful APIs', 'Git'].map((tech, index) => (
                  <span key={index} className="skill-tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" className="bg-white">
        <h2 className="section-heading">Technical Skills</h2>
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
              <Code size={24} className="mr-2" />
              Expertise Area
            </h3>
            <div className="flex flex-wrap">
              {['HTML', 'CSS', 'JavaScript', 'EJS', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 
                'Data Structures', 'Algorithms', 'OOP', 'DBMS'].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
              <Code size={24} className="mr-2" />
              Programming Languages
            </h3>
            <div className="flex flex-wrap">
              {['C++', 'Java', 'Python'].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
              <Github size={24} className="mr-2" />
              Version Control
            </h3>
            <div className="flex flex-wrap">
              {['Git', 'GitHub'].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
              <FileCode size={24} className="mr-2" />
              Tools and Technologies
            </h3>
            <div className="flex flex-wrap">
              {['VS Code', 'Turbo C', 'Code Blocks'].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card md:col-span-2 gradient-border" whileHover={{ y: -5 }}>
            <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
              <User size={24} className="mr-2" />
              Soft Skills
            </h3>
            <div className="flex flex-wrap">
              {['Team Management', 'Problem Solving', 'Leadership', 'Adaptability', 'Communication', 'Time Management'].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="bg-gray-50">
        <h2 className="section-heading">Featured Projects</h2>
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeIn} className="project-card gradient-border">
            <div className="relative overflow-hidden">
              <div className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-700 flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                Featured
              </div>
              <img 
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="MeraKiraana Project" 
                className="project-image"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-primary-700">MeraKiraana</h3>
               
              </div>
              <p className="text-gray-600 mb-4">Grocery E-commerce Platform</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Full-stack online store using Express.js, Node.js, MongoDB and Google OAuth</span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Integrated JWT, bcrypt, Razorpay for security and payments</span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Responsive frontend with EJS and TailwindCSS</span>
                </li>
              </ul>
              <div className="flex flex-wrap mt-auto">
                {['Node.js', 'Express', 'MongoDB', 'EJS', 'TailwindCSS'].map((tech, index) => (
                  <span key={index} className="skill-tag text-xs">{tech}</span>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
               
                <a href="https://github.com/anzer115" className="text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1 text-sm font-medium animated-underline">
                  Source Code
                  <Github size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="project-card gradient-border">
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80" 
                alt="Khaatabook Project" 
                className="project-image"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-primary-700">Khaatabook</h3>
               
              </div>
              <p className="text-gray-600 mb-4">A Daily Expense Tracking App</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Daily expense tracking app using Express.js, Node.js, MongoDB</span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Frontend designed with EJS and Tailwind CSS</span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Secure authentication with JWT and Bcrypt</span>
                </li>
              </ul>
              <div className="flex flex-wrap mt-auto">
                {['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt'].map((tech, index) => (
                  <span key={index} className="skill-tag text-xs">{tech}</span>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
               
                <a href="https://github.com/anzer115" className="text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1 text-sm font-medium animated-underline">
                  Source Code
                  <Github size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="project-card gradient-border">
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80" 
                alt="PlankaRO Project" 
                className="project-image"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-primary-700">PlankaRO</h3>
               
              </div>
              <p className="text-gray-600 mb-4">Event Management System</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Full-stack web application for managing events</span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Built with Express.js, Node.js and MongoDB</span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRight size={16} className="text-primary-600 mt-1 mr-1 flex-shrink-0" />
                  <span>Frontend with HTML, CSS, Bootstrap and Tailwind CSS</span>
                </li>
              </ul>
              <div className="flex flex-wrap mt-auto">
                {['Node.js', 'Express', 'MongoDB', 'Bootstrap', 'TailwindCSS'].map((tech, index) => (
                  <span key={index} className="skill-tag text-xs">{tech}</span>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                
                <a href="https://github.com/anzer115" className="text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1 text-sm font-medium animated-underline">
                  Source Code
                  <Github size={16} /> </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        
      </AnimatedSection>

     
      {/* Education Section */}
      <AnimatedSection id="education" className="bg-gray-50">
        <h2 className="section-heading">Education</h2>
        <motion.div variants={staggerContainer}>
          <motion.div variants={fadeIn} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="card gradient-border" whileHover={{ y: -5 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary-700">B.Tech in ECE</h3>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-600">Dec '21 - Jun '25</span>
                  <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">CGPA: 7.9</span>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-700">Bharati Vidyapeeth's College of Engineering, New Delhi</h4>
              <div className="mt-4 text-gray-600">
                <p>Relevant coursework:</p>
                <div className="flex flex-wrap mt-2">
                  {['Data Structures', 'Algorithms', 'Database Management', 'Computer Networks', 'Web Development'].map((course, index) => (
                    <span key={index} className="skill-tag text-xs">{course}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="card gradient-border" whileHover={{ y: -5 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary-700">Class 12 (CBSE)</h3>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-600">2019</span>
                  <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">Percentage: 78.6%</span>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-700">Gregorian Public School, Ernakulam</h4>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="card gradient-border" whileHover={{ y: -5 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary-700">Class 10 (CBSE)</h3>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-gray-600">2017</span>
                  <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">CGPA: 10</span>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-700">Modern Public School, Moradabad</h4>
            </div>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Positions of Responsibility */}
      <AnimatedSection id="responsibilities" className="bg-white">
        <h2 className="section-heading">Leadership Experience</h2>
        <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users size={24} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-700 mb-2">Chairperson</h3>
            <p className="text-gray-700 mb-4">Robotics and Automation Society, IEEE BVCOE</p>
            <p className="text-gray-600 text-sm">Jun '23 - May '24</p>
            
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Briefcase size={24} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-700 mb-2">Department Head</h3>
            <p className="text-gray-700 mb-4">WIEHACK 5.0 | A 36-hour hackathon organized by IEEE BVCOE</p>
            <p className="text-gray-600 text-sm">Apr '24</p>
           
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border" whileHover={{ y: -5 }}>
            <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap size={24} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-700 mb-2">Event Coordinator</h3>
            <p className="text-gray-700 mb-4">Robosoccer, BVEST'23 | The annual technical festival of BVCOE</p>
            <p className="text-gray-600 text-sm">Mar '23</p>
          
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection id="certifications" className="bg-gray-50">
        <h2 className="section-heading">Certifications & Achievements</h2>
        <motion.div variants={staggerContainer} className="space-y-6">
          <motion.div variants={fadeIn} className="card gradient-border flex flex-col md:flex-row md:items-center gap-4" whileHover={{ y: -5 }}>
            <div className="bg-primary-100 p-4 rounded-full">
              <Award size={32} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-700">Certificate of Excellence</h3>
              <p className="text-gray-700">Back-End Domination (Sheryians Coding School)</p>
              <p className="text-gray-600 text-sm mt-1">Jun '24 – Oct '24</p>
              <p className="text-gray-600 mt-2 text-sm">Completed an intensive backend development course with distinction, focusing on Node.js, Express, and MongoDB.</p>
            </div>
            <div className="hidden md:block">
              <a href="https://drive.google.com/file/d/1YGhTDUi0RTulKIws7_zaFbJLEzu9mQo3/view?usp=sharing" className="btn btn-outline">View Certificate</a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border flex flex-col md:flex-row md:items-center gap-4" whileHover={{ y: -5 }}>
            <div className="bg-primary-100 p-4 rounded-full">
              <Award size={32} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-700">Certificate of Completion</h3>
              <p className="text-gray-700">Data Structures in C++ (Coding Ninjas)</p>
              <p className="text-gray-600 text-sm mt-1">Jun '22 – Oct '22</p>
              <p className="text-gray-600 mt-2 text-sm">Mastered advanced data structures and algorithms, implementing complex solutions in C++.</p>
            </div>
            <div className="hidden md:block">
              <a href="https://ninjasfiles.s3.amazonaws.com/certificate_ec80bdd241a03eb5_1e1f06906a47ad87c9b6fd8d657d6122.pdf" className="btn btn-outline">View Certificate</a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="card gradient-border flex flex-col md:flex-row md:items-center gap-4" whileHover={{ y: -5 }}>
            <div className="bg-primary-100 p-4 rounded-full">
              <Award size={32} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-700">Certificate of Achievement, Level-3 Conqueror</h3>
              <p className="text-gray-700">Ninja Slayground 2.0 (Coding Ninjas)</p>
              <p className="text-gray-600 text-sm mt-1">Dec '24</p>
              <p className="text-gray-600 mt-2 text-sm">Achieved Level-3 Conqueror status by solving complex algorithmic challenges in competitive programming.</p>
            </div>
            <div className="hidden md:block">
              <a href="https://media.licdn.com/dms/image/v2/D5622AQEgDKSCU6jGJA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1733756539145?e=1743638400&v=beta&t=2uBrQ2lAb1lpZ6naTbgc343MVzcimsA5Lp6JDJ48t7g" className="btn btn-outline">View Certificate</a>
            </div>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time opportunities.
            Let's build something amazing together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn bg-white text-primary-700 hover:bg-gray-100 shadow-lg flex items-center gap-2">
              <Mail size={18} />
              Get in Touch
            </a>
            <a href="https://drive.google.com/file/d/1UvQ8OHyyjb9ErWeWdP2kxfgZR-qKdUKs/view?usp=drive_link" className="btn bg-transparent border-2 border-white hover:bg-white/10 flex items-center gap-2">
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="bg-white">
        <h2 className="section-heading">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeInLeft}>
            <h3 className="text-2xl font-bold text-primary-700 mb-4">Let's Talk</h3>
            <p className="text-gray-700 mb-6">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </p>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Mail size={24} className="text-primary-600 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <a href="mailto:anzer1255ubaid@gmail.com" className="text-gray-700 hover:text-primary-600 transition-colors">
                    anzer1255ubaid@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Linkedin size={24} className="text-primary-600 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-800">LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/anzer-bin-ubaid-108b12297/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                    linkedin.com/in/anzer-bin-ubaid
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Github size={24} className="text-primary-600 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-800">GitHub</h4>
                  <a href="https://github.com/anzer115" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition-colors">
                    github.com/anzerubaid
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInRight}>
            <div className="card gradient-border">
              <h3 className="text-2xl font-bold text-primary-700 mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" className="contact-input" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" className="contact-input" placeholder="Your Email" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" id="subject" className="contact-input" placeholder="Subject" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={5} className="contact-input" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold font-montserrat">
                <span className="gradient-text">Anzer.dev</span>
              </h2>
              <p className="text-gray-400 mt-2">Backend Developer</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/anzer115" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/anzer-bin-ubaid-108b12297/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:anzer1255ubaid@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Anzer Bin Ubaid. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
          >
            <ArrowRight size={24} className="transform -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;