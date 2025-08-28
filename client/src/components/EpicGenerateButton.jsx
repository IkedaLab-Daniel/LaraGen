import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, Loader2, Check, Stars, Rocket, Brain } from 'lucide-react';

const EpicGenerateButton = ({ selectedTech = [], selectedDifficulty = '', onGenerate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const isDisabled = selectedTech.length === 0 || !selectedDifficulty;

  const handleClick = async () => {
    if (isDisabled || isLoading) return;
    
    setIsLoading(true);
    setShowParticles(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setShowParticles(false);
      }, 2000);
      
      // Call the parent callback
      if (onGenerate) {
        onGenerate({
          technologies: selectedTech,
          difficulty: selectedDifficulty
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setShowParticles(false);
    }
  };

  // Particle components
  const Particles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: '50%',
            y: '50%'
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: `${50 + (Math.random() - 0.5) * 200}%`,
            y: `${50 + (Math.random() - 0.5) * 200}%`
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: 'easeOut'
          }}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
        />
      ))}
    </div>
  );

  // Success confetti
  const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            scale: 0,
            y: '100%',
            x: `${Math.random() * 100}%`,
            rotate: 0
          }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
            y: '-100%',
            rotate: 360
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: 'easeOut'
          }}
          className={`absolute w-3 h-3 ${
            ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500'][i % 5]
          } rounded`}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full flex justify-center flex-col items-center">
      <motion.button
        onClick={handleClick}
        disabled={isDisabled || isLoading}
        whileHover={!isDisabled && !isLoading ? { 
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        } : {}}
        whileTap={!isDisabled && !isLoading ? { scale: 0.98 } : {}}
        className={`
          relative w-[95%] md:w-full py-5 px-8 rounded-2xl font-bold text-lg overflow-hidden
          transition-all duration-500 border-2
          ${isSuccess 
            ? 'bg-green-500 border-green-400 text-white shadow-green-200' 
            : isDisabled 
              ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 border-transparent text-white shadow-2xl'
          }
        `}
      >
        {/* Animated Background Gradients */}
        {!isDisabled && !isSuccess && (
          <>
            <motion.div
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 blur-xl"
            />
          </>
        )}

        {/* Pulsing Border Effect */}
        {!isDisabled && !isLoading && !isSuccess && (
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(124, 58, 237, 0.7)',
                '0 0 0 15px rgba(124, 58, 237, 0)',
                '0 0 0 0 rgba(124, 58, 237, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute inset-0 rounded-2xl"
          />
        )}

        {/* Button Content */}
        <div className="relative z-10 flex items-center justify-center space-x-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="w-6 h-6" />
                </motion.div>
                <span>Generating Ideas...</span>
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Brain className="w-5 h-5" />
                </motion.div>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-6 h-6" />
                </motion.div>
                <span>Ideas Generated!</span>
                <motion.div
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <Stars className="w-5 h-5" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  animate={!isDisabled ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: !isDisabled ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                >
                  <Rocket className="w-6 h-6" />
                </motion.div>
                <span>Generate Project Ideas</span>
                <motion.div
                  animate={!isDisabled ? {
                    x: [0, 5, 0],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: !isDisabled ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Icons */}
        {!isDisabled && !isLoading && !isSuccess && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                y: [-20, -40, -20],
                x: [0, 10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-2 left-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
            <motion.div
              animate={{
                y: [-20, -40, -20],
                x: [0, -10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
              className="absolute top-2 right-8"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
            </motion.div>
          </div>
        )}

        {/* Particles Effect */}
        <AnimatePresence>
          {showParticles && isLoading && <Particles />}
          {isSuccess && <Confetti />}
        </AnimatePresence>
      </motion.button>

      {/* Selection Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center text-sm text-gray-600"
      >
        {selectedTech.length > 0 && selectedDifficulty ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Ready to generate with {selectedTech.length} technologies • {selectedDifficulty} difficulty</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span>
              {!selectedTech.length ? 'Select technologies' : ''} 
              {!selectedTech.length && !selectedDifficulty ? ' and ' : ''}
              {!selectedDifficulty ? 'Choose difficulty' : ''}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EpicGenerateButton;