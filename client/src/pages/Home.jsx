import { animate, motion } from "framer-motion";
import Hero from "../components/Hero";
import TechChoose from "../components/TechChoose";
import { Brain, Lightbulb, Rocket, Sparkle } from "lucide-react";

const Home = () => {

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
        <div className="home bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
            {/* animation bg elements*/}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
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
                    className="absolute top-[300px] md:top-40 right-5 md:right-20 text-blue-300"
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
            </div>
            <Hero/>
            <TechChoose />
        </div>
    )
}

export default Home