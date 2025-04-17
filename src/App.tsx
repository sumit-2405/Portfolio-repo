import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Database, Globe, GraduationCap, Building2, Phone, MapPin, Instagram, Sun, Moon } from 'lucide-react';

function App() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [techRef, techInView] = useInView({ triggerOnce: true });
  const [educationRef, educationInView] = useInView({ triggerOnce: true });
  const [contactRef, contactInView] = useInView({ triggerOnce: true });
  
  // Dark mode and active section state
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Form reference for EmailJS
  const form = useRef<HTMLFormElement>(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const nameArray = "Hi, I am Sumit Dey".split("");

  // EmailJS Integration
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) {
      console.error('Form reference not found');
      return;
    }

    try {
      const result = await emailjs.sendForm(
        'service_ilu9a0p',
        'template_mhncafi',
        form.current,
        'vXkIpTeTHCEvFXcac'
      );
      
      console.log('EmailJS response:', result);
      alert('Your message has been sent successfully!');
      form.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Section observer for active nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation Bar */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo/Name */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold"
          >
            <span className={darkMode ? 'text-[#64ffda]' : 'text-blue-600'}>Sumit Dey</span>
          </motion.div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'education', 'tech', 'projects', 'contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`capitalize ${activeSection === item ? 
                  (darkMode ? 'text-[#64ffda] font-medium' : 'text-blue-600 font-medium') : 
                  (darkMode ? 'text-gray-300' : 'text-gray-600')}`}
                onClick={() => {
                  document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(item);
                }}
              >
                {item === 'tech' ? 'Tech Stack' : item.replace('-', ' ')}
              </motion.button>
            ))}
          </div>
          
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] to-[#112240] px-4 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="text-center z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-4 text-7xl font-bold"
          >
            {nameArray.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                className="inline-block bg-gradient-to-r from-[#64ffda] via-[#00ff95] to-[#64ffda] bg-clip-text text-transparent"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
          <motion.p 
            className="text-2xl text-[#8892b0] mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Full Stack Developer
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.a 
              href="https://github.com" 
              className="text-[#64ffda] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/sumit-dey-39b9a6181/" 
              className="text-[#64ffda] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/sumit.d_e_y/" 
              className="text-[#64ffda] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a 
              href="mailto:sumitdey9434@gmail.com" 
              className="text-[#64ffda] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Profile" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <div>
              <p className={`leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm a passionate Full Stack Developer with 5 years of experience in building web applications. 
                I specialize in React, Node.js, and modern web technologies. I love creating elegant solutions 
                to complex problems and am always eager to learn new technologies.
              </p>
              <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                projects, or sharing my knowledge through technical blog posts.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        ref={educationRef}
        initial="hidden"
        animate={educationInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Education</h2>
          <div className="space-y-8">
            <motion.div 
              className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <GraduationCap className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bachelor in Technology in Computer Science and Engineering</h3>
                  <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Government College of Engineering and Textile Technology, Serampore</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Building2 size={16} />
                    <span>2022 - 2026</span>
                  </div>
                  <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Currently pursuing B.Tech in Computer Science and Engineering.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech"
        ref={techRef}
        initial="hidden"
        animate={techInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className={`p-6 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Code2 className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Frontend</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>React, TypeScript, Tailwind</p>
            </motion.div>
            <motion.div 
              className={`p-6 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Cpu className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Backend</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Node.js, Express</p>
            </motion.div>
            <motion.div 
              className={`p-6 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Database className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Database</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>MongoDB, PostgreSQL</p>
            </motion.div>
            <motion.div 
              className={`p-6 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Globe className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Languages</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Java, C++, Python</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsRef}
        initial="hidden"
        animate={projectsInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Project 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>E-Commerce Platform</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  A full-featured e-commerce platform built with React, Node.js, and MongoDB.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>React</span>
                    <span className={`px-2 py-1 rounded text-sm ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>Node.js</span>
                  </div>
                  <motion.a 
                    href="#" 
                    className={darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Project 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Task Management App</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  A collaborative task management application with real-time updates.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-sm ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>TypeScript</span>
                    <span className={`px-2 py-1 rounded text-sm ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>Firebase</span>
                  </div>
                  <motion.a 
                    href="#" 
                    className={darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <Mail className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Email</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>sumitdey9434@gmail.com</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                  <Phone className={`w-6 h-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Phone</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>+91 8617088046</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                  <MapPin className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Location</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Kolkata, India</p>
                </div>
              </motion.div>
            </div>
            <form 
              ref={form}
              onSubmit={sendEmail}
              className="space-y-4"
            >
              <motion.div whileHover={{ scale: 1.01 }}>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Your name"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Your email"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Your message"
                  required
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;