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
                className="grid gap-6 grid-cols-1"
            >
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            variants={itemVariants}
                            layout
                            className="w-[95%] md:w-full mx-auto bg-white/80 backdrop-blue-sm rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                            whileHover={{ y: -5, scale: 1.02 }}
                            onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                        >
                            <div className="space-y-4">
                                {/* project heading here */}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-400">
                                        {project.difficulty}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relax">
                                    {project.description}
                                </p>

                                {/* time */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{project.estimatedTime}</span>
                                </div>

                                {/* key feature preview */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        Key Feature
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {project.features.slice(0,2).map((feature, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                                                {feature}
                                            </span>
                                        ))}
                                        {project.features.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                                + {project.features.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Expand button here  */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full mt-4 py-2 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Code className="w-4 h-4" />
                                    {selectedProject === index ? "Show Less" : "Show More"}
                                </motion.button>

                                {/* expand details */}
                                <AnimatePresence>
                                    {selectedProject === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                                                {/* All Features */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    Complete Feature List
                                                    </h4>
                                                    <ul className="space-y-1">
                                                    {project.features.map((feature, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                        {feature}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                </div>

                                                {/* Learning Outcomes */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-purple-500" />
                                                    Learning Outcomes
                                                    </h4>
                                                    <ul className="space-y-1">
                                                    {project.learningOutcomes.map((outcome, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                                        {outcome}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                </div>

                                                {/* Action Buttons */}
                                                {user ? (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => saveProject(project, index)}
                                                        disabled={savingProject === index}
                                                        className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {savingProject === index ? (
                                                            <>
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                                />
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <BookmarkPlus className="w-4 h-4" />
                                                                Save Project
                                                            </>
                                                        )}
                                                    </motion.button>
                                                ) : (
                                                    <SignInCard />
                                                )}

                                                {/* <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Start Building This Project
                                                </motion.button> */}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Sign In Card for unauthenticated users - shown at bottom */}
            {!user && (
                <motion.div
                    variants={itemVariants}
                    className="w-[95%] md:w-full mx-auto"
                >
                    <SignInCard />
                </motion.div>
            )}
        </motion.div>
    )
}

export default Results