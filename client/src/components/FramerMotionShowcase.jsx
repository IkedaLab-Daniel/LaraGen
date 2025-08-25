import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCw, Heart, Star, ChevronDown, Menu, X, Send } from 'lucide-react';

const FramerMotionShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const tabs = [
    'Hover Effects',
    'State Changes',
    'Layout Animations',
    'Complex Interactions',
    'Loading States'
  ];

  const addNotification = () => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message: 'Animation triggered!' }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const cardVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              {notification.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <motion.header 
        className="p-6 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Framer Motion Showcase
          </motion.h1>
          
          {/* Mobile menu button */}
          <motion.button
            className="md:hidden"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="space-y-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === index ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setActiveTab(index);
                      setMobileMenuOpen(false);
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="hidden md:block p-6">
        <div className="max-w-6xl mx-auto">
          <motion.nav 
            className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab}
                className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === index ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </motion.button>
            ))}
          </motion.nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 0 && (
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Hover Scale Card */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Hover Scale</h3>
                      <p className="text-white/70">Scales and rotates on hover</p>
                    </div>
                  </motion.div>

                  {/* Gradient Border Card */}
                  <motion.div
                    variants={itemVariants}
                    className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer overflow-hidden"
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl"
                      variants={{
                        rest: { rotate: 0, scale: 0 },
                        hover: { rotate: 180, scale: 1 }
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="relative z-10 bg-gray-900 rounded-lg p-4 m-1">
                      <h3 className="text-xl font-semibold mb-2">Gradient Border</h3>
                      <p className="text-white/70">Animated gradient border</p>
                    </div>
                  </motion.div>

                  {/* Flip Card */}
                  <motion.div
                    variants={itemVariants}
                    className="relative h-48"
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center cursor-pointer"
                      variants={{
                        rest: { rotateY: 0 },
                        hover: { rotateY: 180 }
                      }}
                      transition={{ duration: 0.6 }}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <h3 className="text-xl font-semibold">Flip Card</h3>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center cursor-pointer"
                      variants={{
                        rest: { rotateY: -180 },
                        hover: { rotateY: 0 }
                      }}
                      transition={{ duration: 0.6 }}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <h3 className="text-xl font-semibold">Flipped!</h3>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Play/Pause Button */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Play/Pause Toggle</h3>
                    <motion.button
                      className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      onClick={() => setIsPlaying(!isPlaying)}
                      whileTap={{ scale: 0.9 }}
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isPlaying ? 'pause' : 'play'}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>

                  {/* Like Button */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Like Animation</h3>
                    <motion.button
                      className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
                      onClick={() => {
                        setLiked(!liked);
                        addNotification();
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={liked ? pulseVariants.pulse : {}}
                    >
                      <motion.div
                        animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart size={24} fill={liked ? "currentColor" : "none"} />
                      </motion.div>
                    </motion.button>
                  </motion.div>

                  {/* Star Rating */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Star Rating</h3>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={() => setRating(star)}
                          whileHover={{ scale: 1.2, rotate: 18 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{ 
                            scale: rating >= star ? 1.1 : 1,
                            rotate: rating >= star ? [0, -10, 10, 0] : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Star 
                            size={20} 
                            fill={rating >= star ? "#fbbf24" : "none"}
                            className={rating >= star ? "text-yellow-400" : "text-white/50"}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Dropdown */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Animated Dropdown</h3>
                    <div className="relative">
                      <motion.button
                        className="flex items-center justify-between w-full px-4 py-3 bg-white/10 rounded-lg"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <span>Select an option</span>
                        <motion.div
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden z-10"
                          >
                            {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
                              <motion.button
                                key={option}
                                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setDropdownOpen(false)}
                                whileHover={{ x: 10 }}
                              >
                                {option}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Staggered List */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Staggered Animation</h3>
                    <motion.div
                      variants={containerVariants}
                      className="space-y-3"
                    >
                      {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item, index) => (
                        <motion.div
                          key={item}
                          variants={itemVariants}
                          className="p-4 bg-white/10 rounded-lg"
                          whileHover={{ x: 20, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 3 && (
                <motion.div 
                  className="grid md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Morphing Shape */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Morphing Shape</h3>
                    <div className="flex justify-center">
                      <motion.div
                        className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400"
                        animate={{
                          borderRadius: ["0%", "50%", "25%", "0%"],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Floating Elements</h3>
                    <div className="relative h-32 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                          animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                          style={{
                            left: `${i * 15}%`,
                            top: '50%'
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 4 && (
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Loading Spinner */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Loading Spinner</h3>
                    <div className="flex justify-center">
                      <motion.div
                        className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Progress Bar */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Progress Bar</h3>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Pulsing Dots */}
                  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Pulsing Dots</h3>
                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="p-6 border-t border-white/10 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.button
            className="flex items-center justify-center mx-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={addNotification}
          >
            <Send size={20} className="mr-2" />
            Trigger Notification
          </motion.button>
          <p className="text-white/60 mt-4">Built with React, Tailwind CSS, and Framer Motion</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default FramerMotionShowcase;