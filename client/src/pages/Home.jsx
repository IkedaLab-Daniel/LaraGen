import { useState } from "react";
import { animate, motion } from "framer-motion";
import Hero from "../components/Hero";
import TechChoose from "../components/TechChoose";
import Difficulty from "../components/Difficulty";
import Footer from "../components/Footer";
import LaragenGIF from '../assets/laragen.gif'
import { Brain, DiffIcon, Lightbulb, Rocket, Sparkle } from "lucide-react";

const Home = () => {
    
    // Shared state
    const [droppedTech, setDroppedTech] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const handleTestState = () => {
        console.log("States:")
        console.log("dropped: ", droppedTech)
        console.log("difficulty:", selectedDifficulty)
    }

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            rotate: [0, 5, 0, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return(
    <div className="home relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen pb-8 md:pb-0">
            {/* animation bg elements*/}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-24 left-10 text-blue-300"
                >
                    <Lightbulb className="w-[50px] h-[50px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[400px] md:top-40 right-5 md:right-20 text-blue-300"
                >
                    <Brain className="w-[50px] h-[50px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-24 md:bottom-40 left-20 text-blue-300"
                >
                    <Rocket className="w-[50px] h-[50px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-60 right-14 md:right-60 text-blue-300"
                >
                    <Sparkle className="w-[50px] h-[50px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-60 right-[10px] md:right-60 text-blue-300"
                >
                    <img src={LaragenGIF} className="w-[50px] h-[50px] md:w-[300px] md:h-[300px] opacity-[0.15]" />
                </motion.div>
            </div>
            <div className="relative">
                <Hero/>
                <TechChoose 
                    droppedTech={droppedTech} 
                    setDroppedTech={setDroppedTech} 
                />
                <Difficulty 
                    selectedDifficulty={selectedDifficulty} 
                    setSelectedDifficulty={setSelectedDifficulty}
                />

                {/* generate idea button */}
                <div className="w-full md:w-6xl md:max-w-6xl flex justify-center mt-10 mx-auto">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.05 }}
                        disabled={droppedTech.length === 0 || selectedDifficulty === ''}
                        className={`bg-blue-500 w-[95%] md:w-full py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center shadow-xl transition-all duration-300 ${droppedTech.length === 0 || selectedDifficulty === ''
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-2xl'
                        }`}
                        onClick={handleTestState}
                    >
                        Generate Project Ideas
                    </motion.button>
                </div>


                <Footer />
            </div>
        </div>
    )
}

export default Home