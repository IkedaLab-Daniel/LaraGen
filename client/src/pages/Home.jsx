import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import TechChoose from "../components/TechChoose";
import Difficulty from "../components/Difficulty";
import GenerateButton from "../components/GenerateButton";
import Results from "../components/Results";
import Footer from "../components/Footer";
import LaragenGIF from '../assets/laragen.gif'
import { Brain, Lightbulb, Rocket, Sparkle } from "lucide-react";

const Home = () => {
    
    // Shared state
    const [droppedTech, setDroppedTech] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [results, setResults] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleGenerate = async ({ technologies, difficulty }) => {
        try {
            const response = await fetch(`${apiUrl}/generate-ideas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    techs: technologies.map(t => t.name),
                    difficulty
                })
            });
            console.log(`${apiUrl}/generate-ideas`)
            const data = await response.json();
            console.log(data)
            setResults(data);
        } catch (err) {
            setResults({ error: "Failed to fetch project ideas." });
            console.log(`call: ${apiUrl}/generate-ideas`)
        }
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
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen pb-8 md:pb-0">
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

                {/* Generate Button */}
                <div className="w-full max-w-4xl mt-10 mx-auto px-6">
                    <GenerateButton
                        selectedTech={droppedTech}
                        selectedDifficulty={selectedDifficulty}
                        onGenerate={handleGenerate}
                    />
                </div>
                {results && (
                    <Results results={results} />
                )}
                <Footer />
            </div>
        </div>
    )
}

export default Home