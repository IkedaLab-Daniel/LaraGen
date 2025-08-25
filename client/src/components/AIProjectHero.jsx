import React, { useState, useEffect } from 'react';
import { Sparkles, Code, Zap, ArrowRight, Bot, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIProjectHero = () => {
  // Default tech stacks for rotation
  const techStacks = [
    "React",
    "Vue",
    "Angular",
    "Laravel",
    "Node.js",
    "Python",
    "Django",
    "Flask",
    "Spring Boot",
    "Ruby on Rails"
  ];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentStack, setCurrentStack] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStack((prev) => (prev + 1) % techStacks.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)`,
        }}
      />
      
      {/* Floating Orbs with Motion */}
      <motion.div 
        className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={floatingAnimation}
      />
      <motion.div 
        className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
      />
      <motion.div 
        className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
      />

  {/* Grid Pattern */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        
        {/* Floating Icons */}
        <motion.div 
          className="absolute top-32 left-1/4"
          animate={{ 
            y: [-10, 10, -10], 
            rotate: [0, 10, 0, -10, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Code className="w-8 h-8 text-cyan-400 opacity-60" />
        </motion.div>
        <motion.div 
          className="absolute top-48 right-1/4"
          animate={{ 
            y: [10, -10, 10], 
            scale: [1, 1.2, 1],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        >
          <Sparkles className="w-6 h-6 text-purple-400 opacity-60" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/6"
          animate={{ 
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        >
          <Layers className="w-10 h-10 text-pink-400 opacity-40" />
        </motion.div>

        {/* Hero Badge */}
        <motion.div 
          className="inline-flex items-center px-4 py-2 mb-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium"
          variants={fadeInUp}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Bot className="w-4 h-4 mr-2 text-cyan-400" />
          AI-Powered Project Discovery
          <Sparkles className="w-4 h-4 ml-2 text-purple-400" />
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400 mb-6 leading-tight">
          Build Your Next
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Big Project
          </span>
        </h1>

        {/* Subtitle with rotating tech stacks */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl leading-relaxed">
          Tell us your tech stack and let our AI suggest personalized projects that match your skills
        </p>
        
        <div className="text-lg text-cyan-300 mb-12 font-mono">
          Perfect for: <span className="text-white font-bold transition-all duration-500">
            {techStacks[currentStack]}
          </span> developers
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-6 items-center mb-16">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-white text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center">
              Start Building
              <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
          </button>
          
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300">
            See Examples
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            { icon: Zap, title: "Instant Suggestions", desc: "Get project ideas in seconds" },
            { icon: Code, title: "Stack-Specific", desc: "Tailored to your technologies" },
            { icon: Sparkles, title: "AI-Powered", desc: "Smart recommendations" }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <feature.icon className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
          {[ 
            { number: "10K+", label: "Projects Generated" },
            { number: "50+", label: "Tech Stacks" },
            { number: "95%", label: "Success Rate" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIProjectHero;