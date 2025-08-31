import DualAuthForm from "../components/DualAuthForm";
import { motion } from "framer-motion"
import { ShieldCheck, User, KeyRound, Lock, Fingerprint, Zap } from "lucide-react";
import LaragenGIF from '../assets/laragen.gif'
import { useState } from "react";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true)

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

    // > Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
        }
    };

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
            <div className="relative min-h-screen flex items-center justify-center">
                <motion.div
                    variants={containerVariants}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full shadow-lg">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span>Cool Badge Badge</span>
                    </div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-gray-99 mb-2"
                    >
                        {isLogin ? 'Welcome Back' : 'Join the Community'}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="px-8 md:px-0 mb-4 text-gray-600 text-center"
                    >
                        {isLogin
                            ? 'Sign In to continue generating AMAZINNGG projects'
                            : 'Create an account to start building incredible projects'
                        }
                    </motion.p>
                    {/* Auth form component */}
                    <DualAuthForm 
                        isLogin = {isLogin}
                        setIsLogin = {setIsLogin}
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Login