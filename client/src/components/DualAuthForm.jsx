import { useState, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Github, User, Mail, EyeOff, Eye, Lock, ArrowRight, CircleAlert } from "lucide-react";
import { useToast } from "../utilities/Toaster";
import { Navigate } from "react-router-dom";
const DualAuthForm = ({ isLogin, setIsLogin}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const apiURL = import.meta.env.VITE_API_URL;

    // Get toast functions from the utility
    const toast = useToast();

    // redirections
    const redirectToHome = () => {
        toast.info("Redirecting to homepage...");
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try{
            let endpoint = isLogin ? "/login" : "/register";
            let payload = isLogin
                ? {email: formData.email, password: formData.password}
                : {name: formData.name, email: formData.email, password: formData.password}
            const res = await fetch(`${apiURL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            const data = await res.json();

            if (!res.ok){
                setError(data.message || "Authentication failed");
                toast.error(data.message || "Authentication failed");
            } else {
                localStorage.setItem("token", data.token)
                console.log("Auth success:", data)

                // Show success toast with personalized message
                const successMessage = isLogin 
                    ? `Welcome back, ${data.user?.name || 'User'}!`
                    : `Account created successfully! Welcome, ${data.user?.name || 'User'}!`;
                
                toast.success(successMessage, {
                    duration: 4000 // Custom duration for success message
                });
                
                // Clear form
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                
                // Redirect after showing success toast
                setTimeout(() => {
                    redirectToHome();
                }, 1500);
            }

        } catch (err){
            // Ensure error is a string, not an Error object
            let errorMessage = "Network Error";
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === "string") {
                errorMessage = err;
            }
            setError(errorMessage);
            toast.error(errorMessage);
        }
        setIsLoading(false)
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const changeForm = (isLogin) => {
        setIsLogin(isLogin)
        setError(null)
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
                    onClick={() => changeForm(true)}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isLogin
                            ? 'bg-white shadow-lg text-gray-900'
                            : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                    Log In
                </button>
                <button
                    onClick={() => changeForm(false)}
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
                        {!isLogin && (
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
            
                <AnimatePresence mode="wait">
                    {!isLogin && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                            required={!isLogin}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>

                {/* Error display */}
                {error && (
                    <div className="border border-red-600 rounded-md p-4 bg-red-100 flex justify-center items-center gap-1">
                        <CircleAlert className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-600">{error}</span>
                    </div>
                )}
                
                {/* Forgot Password (Login only) */}
                {isLogin && (
                    <div className="text-right">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                        >
                            {/* display despite not working */}
                            Forgot password?
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                    <>
                        <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                    ) : (
                    <>
                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        <ArrowRight className="w-5 h-5" />
                    </>
                    )}
                </motion.button>
            </motion.div>

            {/* Footer Link */}
            <motion.div
                variants={itemVariants}
                className="text-center mt-6"
            >
                <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors duration-200"
                >
                    {isLogin ? 'Sign up' : 'Sign in'}
                </button>
                </p>
            </motion.div>
        </motion.div>
    )
}

export default DualAuthForm