
import { motion } from "framer-motion";
import { LogIn, UserPlus, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SignInCard = () => {
    
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-xl"
        >
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                Unlock Your Full Potential
            </h3>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Sign in to save your favorite projects, track your progress, and get personalized recommendations tailored just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/auth?mode=login">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                    >
                        <LogIn className="w-4 h-4" />
                        Sign In
                    </motion.button>
                </Link>
                
                <Link to="/auth?mode=signup">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 w-full sm:w-auto"
                    >
                        <UserPlus className="w-4 h-4" />
                        Sign Up
                    </motion.button>
                </Link>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Save Projects</span>
                </div>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Track Progress</span>
                </div>
            </div>
        </motion.div>
    )
}

export default SignInCard