import { useState } from "react"
import { motion } from "framer-motion"
const DualAuthForm = ({ isLogin, setIsLogin}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

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
        <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border boder-white/50"
        >
            {/* toggle tabs */}
            <div className="flex mb-8 p-1 bg-gray-100/80 rounded-2xl">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isLogin
                            ? 'bg-white shadow-lg text-gray-900'
                            : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                    Log In
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        !isLogin
                            ? 'bg-white shadow-lg text-gray-900'
                            : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                    Sign Up
                </button>
            </div>

        </motion.div>
    )
}

export default DualAuthForm