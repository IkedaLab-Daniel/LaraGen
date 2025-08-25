import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MotionShowcase() {
  const [showCards, setShowCards] = useState(true);

  // Variants for container + children
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // delay between child animations
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center to-pink-500 p-6 text-black">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        🚀 Framer Motion Showcase
      </motion.h1>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="outline outline-2 outline-slate-600 px-6 py-3 bg-white text-slate-600 font-semibold rounded-xl shadow-lg mb-8"
        onClick={() => setShowCards((prev) => !prev)}
      >
        {showCards ? "Hide Cards" : "Show Cards"}
      </motion.button>

      {/* Animated container + cards */}
      <AnimatePresence>
        {showCards && (
          <motion.div
            key="cards"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                layout // enables smooth layout transitions
                variants={item}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95, rotate: -1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="outline outline-2 outline-slate-600 p-6 bg-white/20 rounded-2xl shadow-xl backdrop-blur-lg"
              >
                <h2 className="text-xl font-bold mb-2">Card {num}</h2>
                <p className="text-sm opacity-80">
                  This card fades, slides, and animates layout changes.
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
