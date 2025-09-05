import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import TechChoose from "../components/TechChoose";
import Difficulty from "../components/Difficulty";
import GenerateButton from "../components/GenerateButton";
import Results from "../components/Results";
import Footer from "../components/Footer";
import { Brain, Lightbulb, Rocket, Sparkle, Zap, Star, Code, Cpu, Globe, Database, Layers, Palette } from "lucide-react";

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

    const floatingVariantsAlt = {
        animate: {
            y: [12, -8, 12],
            rotate: [0, -4, 0, 4, 0],
            transition: {
                duration: 7.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const floatingVariantsSlow = {
        animate: {
            y: [-6, 14, -6],
            rotate: [0, 3, 0, -3, 0],
            transition: {
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return(
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen pb-8 md:pb-0">
            {/* animation bg elements*/}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Original floating elements */}
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
                    className="absolute top-[400px] md:top-[50%] right-5 md:right-20 text-blue-300"
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

                {/* Additional floating elements */}
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute top-[150px] md:top-[100px] right-[100px] md:right-[150px] text-purple-300/60"
                >
                    <Star className="w-[40px] h-[40px] md:w-[75px] md:h-[75px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsSlow}
                    animate="animate"
                    className="absolute top-[300px] md:top-[60%] left-[60px] md:left-[100px] text-green-300/60"
                >
                    <Code className="w-[45px] h-[45px] md:w-[80px] md:h-[80px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute bottom-[150px] md:bottom-[200px] right-[40px] md:right-[80px] text-yellow-300/60"
                >
                    <Zap className="w-[38px] h-[38px] md:w-[70px] md:h-[70px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[500px] md:top-[400px] left-[150px] md:left-[250px] text-pink-300/60"
                >
                    <Globe className="w-[42px] h-[42px] md:w-[78px] md:h-[78px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsSlow}
                    animate="animate"
                    className="absolute bottom-[300px] md:bottom-[350px] left-[50px] md:left-[120px] text-cyan-300/60"
                >
                    <Database className="w-[36px] h-[36px] md:w-[68px] md:h-[68px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute top-[600px] md:top-[500px] right-[120px] md:right-[200px] text-indigo-300/60"
                >
                    <Cpu className="w-[44px] h-[44px] md:w-[82px] md:h-[82px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-[400px] md:bottom-[450px] right-[200px] md:right-[350px] text-orange-300/60"
                >
                    <Layers className="w-[39px] h-[39px] md:w-[72px] md:h-[72px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsSlow}
                    animate="animate"
                    className="absolute top-[250px] md:top-[180px] right-[250px] md:right-[400px] text-rose-300/60"
                >
                    <Palette className="w-[41px] h-[41px] md:w-[76px] md:h-[76px]" />
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