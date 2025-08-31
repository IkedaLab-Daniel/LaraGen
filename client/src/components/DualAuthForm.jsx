import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Github, User, Mail, EyeOff, Eye, Lock } from "lucide-react";
const DualAuthForm = ({ isLogin, setIsLogin}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
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
        <motion.div
            variants={itemVariants}
            className="w-[90%] md:min-w-[600px] mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-2xl border boder-white/50 "
        >
            {/* toggle tabs */}
            <div className="flex mb-6 p-1 bg-gray-100/80 rounded-2xl">
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
            
            {/* social login here */}
            <motion.div
                variants={itemVariants}
                className="space-y-3 mb-6"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 mb-6"
                >
                    {/* ? GitHub icon marked as deplicated!!?? */}
                    <Github className="w-5 h-5 mr-3" /> 
                    GitHub to be implemented
                </motion.button>

                {/* cool divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white/80 text-gray-500">or continue with email</span>
                    </div>
                </div>

                {/* form inputs */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        {isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0}}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration:0.3 }}
                            >
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

                
            </motion.div>
        </motion.div>
    )
}

export default DualAuthForm