import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Clock, Star, Code, CheckCircle, Target, ExternalLink, AlertTriangle, Heart, BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../utilities/Toaster";
import SignInCard from "./SignInCard";

const Results = ({ results }) => {
    const [selectedProject, setSelectedProject] = useState(null)
    const [savingProject, setSavingProject] = useState(null)
    const { user } = useAuth()
    const toast = useToast()
    let projects = [];
    if (results && results.data && results.data.projects && Array.isArray(results.data.projects.projects)) {
        projects = results.data.projects.projects;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    const debugProject = () => {
        console.log(projects)
        console.log(results)
    }

    const saveProject = async (project, index) => {
        if (!user) {
            toast.error('Please sign in to save projects');
            return;
        }

        setSavingProject(index);
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: project.name,
                    description: project.description,
                    features: project.features,
                    estimated_time: project.estimatedTime,
                    learning_outcomes: project.learningOutcomes,
                    difficulty: project.difficulty || results?.data?.request_difficulty || 'intermediate',
                    tech_stack: results?.data?.requested_techs || [],
                    is_public: true
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Project saved successfully! 🎉');
            } else {
                toast.error(data.message || 'Failed to save project');
            }
        } catch (error) {
            toast.error('Network error while saving project');
        } finally {
            setSavingProject(null);
        }
    };

    // Check if fallback was used
    const isFallback = results?.data?.is_fallback;
    const fallbackReason = results?.data?.fallback_reason;

    // Error handling
    if (results && results.error) {
        return (
            <div className="w-full max-w-6xl mx-auto py-12 text-center text-red-500 text-lg">
                {results.error}
            </div>
        );
    }

    return(
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl mx-auto py-6 px-0 space-y-8"
        >
            {/* Heading stuffs */}
            <motion.div
                variants={itemVariants}
                className="text-center space-y-4 w-[95%] mx-auto"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-400 rounded-full md:flex items-center justify-center hidden">
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 
                        className="text-3xl font-bold text-gray-800"
                        onClick={debugProject()}
                    >
                        Recommended Projects
                    </h2>
                </div>
                {/* subtitle here */}
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Based on your selected tech stack, here are personalized project recommendations to help you build real-world experience and advance your skills.
                </p>
            </motion.div>

            {/* main project grid */}
            <motion.div
                variants={containerVariants}
                className="grid gap-6 grid-cols-1 lg:grid-cols-2"
            >
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            variants={itemVariants}
                            layout
                            className="w-[95%] md:w-full mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {/* Project Header - Always Visible */}
                            <div className="p-6 space-y-4">
                                {/* Project Title & Difficulty */}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        project.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                        project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {project.difficulty === 'beginner' ? 'Easy' : project.difficulty}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Time & Tech Preview */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{project.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Code className="w-4 h-4" />
                                        <span>{project.features.length} features</span>
                                    </div>
                                </div>

                                {/* Quick Features Preview */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        Key Features
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {project.features.slice(0,3).map((feature, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                                                {feature}
                                            </span>
                                        ))}
                                        {project.features.length > 3 && (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProject(selectedProject === index ? null : index);
                                                }}
                                                className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md text-xs hover:shadow-lg transition-all duration-300"
                                            >
                                                + {project.features.length - 3} more
                                            </motion.button>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons - Always Visible */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(selectedProject === index ? null : index);
                                        }}
                                        className="flex-1 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Target className="w-4 h-4" />
                                        View Details
                                    </motion.button>
                                    
                                    {user ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                saveProject(project, index);
                                            }}
                                            disabled={savingProject === index}
                                            className="px-4 py-2 bg-yellow-200 rounded-lg font-medium border border-yellow-600 text-yellow-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {savingProject === index ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                <BookmarkPlus className="w-4 h-4" />
                                            )}
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
                                            disabled
                                        >
                                            <Heart className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            {/* Expandable Details Section */}
                            <AnimatePresence>
                                {selectedProject === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-100"
                                    >
                                        <div className="p-6 space-y-5">
                                            {/* Complete Features */}
                                            <div className="bg-white/60 rounded-xl p-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    Complete Feature List
                                                </h4>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {project.features.map((feature, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-start gap-2 text-sm text-gray-700 bg-white/80 rounded-lg p-2"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                                            {feature}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Learning Outcomes */}
                                            <div className="bg-white/60 rounded-xl p-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-purple-500" />
                                                    What You'll Learn
                                                </h4>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {project.learningOutcomes.map((outcome, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.1 + 0.2 }}
                                                            className="flex items-start gap-2 text-sm text-gray-700 bg-white/80 rounded-lg p-2"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                                            {outcome}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Save Project Button for Non-Authenticated Users */}
                                            {!user && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <SignInCard />
                                                </motion.div>
                                            )}

                                            {/* Close Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedProject(null)}
                                                className="w-full py-2 bg-white/80 text-gray-600 rounded-lg font-medium hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200"
                                            >
                                                <motion.div
                                                    animate={{ rotate: selectedProject === index ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    ▲
                                                </motion.div>
                                                Close Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Fallback notification if applicable */}
            {isFallback && (
                <motion.div
                    variants={itemVariants}
                    className="w-[95%] md:w-full mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3"
                >
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-yellow-800 font-medium">Using Fallback Ideas</p>
                        <p className="text-xs text-yellow-700">{fallbackReason || 'API service temporarily unavailable'}</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Results