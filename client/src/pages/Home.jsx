import { animate, motion } from "framer-motion";
import Hero from "../components/Hero";
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-10 text-blue-300"
                >
                    <Lightbulb size={80} />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-40 right-20 text-blue-300"
                >
                    <Brain size={80} />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-40 left-20 text-blue-300"
                >
                    <Rocket size={80} />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-60 right-60 text-blue-300"
                >
                    <Sparkle size={80} />
                </motion.div>
            </div>
            <Hero/>
        </div>
    )
}

export default Home