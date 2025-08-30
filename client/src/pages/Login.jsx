import { motion } from "framer-motion"
import { ShieldCheck, User, KeyRound, Lock, Fingerprint } from "lucide-react";
import LaragenGIF from '../assets/laragen.gif'


const Login = () => {

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
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 text-indigo-300"
                >
                    <ShieldCheck className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-1/3 left-10 text-indigo-300"
                >
                    <User className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-10 right-1/4 text-indigo-300"
                >
                    <KeyRound className="w-[50px] h-[50px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-1/3 left-1/4 text-indigo-300"
                >
                    <Lock className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-1/2 right-10 text-indigo-300"
                >
                    <Fingerprint className="w-[50px] h-[50px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 text-indigo-300"
                >
                    <img src={LaragenGIF} className="w-[50px] h-[50px] md:w-[200px] md:h-[200px] opacity-[0.15]" />
                </motion.div>
            </div>
        </div>
    )
}

export default Login