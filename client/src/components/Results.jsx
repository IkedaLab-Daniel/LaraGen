import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Clock, Code, CheckCircle, Target, AlertTriangle, BookmarkPlus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../utilities/Toaster";
import SignInCard from "./SignInCard";

const Results = ({ results }) => {
    const [savingProject, setSavingProject] = useState(null)
    const [savedProjects, setSavedProjects] = useState(new Set())
    const { user } = useAuth()
    const toast = useToast()
    let projects = [];
    if (results && results.data && results.data.projects && Array.isArray(results.data.projects.projects)) {
        projects = results.data.projects.projects;
    }

    // Reset saved projects when new results are generated
    useEffect(() => {
        setSavedProjects(new Set());
    }, [results]);

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

        // Check if project is already saved
        if (savedProjects.has(index)) {
            toast.info('Project already saved!');
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
                // Mark project as saved
                setSavedProjects(prev => new Set(prev).add(index));
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
                            className={`w-[95%] md:w-full mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-300 group overflow-hidden relative ${
                                savedProjects.has(index) 
                                    ? 'border-green-300 ring-2 ring-green-200' 
                                    : 'border-blue-100 hover:shadow-2xl'
                            }`}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {/* Saved Badge */}
                            {savedProjects.has(index) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg z-10"
                                >
                                    <Check className="w-3 h-3" />
                                    Saved
                                </motion.div>
                            )}

                            {/* Complete Project Card */}
                            <div className="p-6 space-y-6">
                                {/* Project Header */}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Time & Feature Count */}
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium">{project.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Code className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium">{project.features.length} features</span>
                                    </div>
                                </div>

                                {/* Complete Features */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
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
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-start gap-2 text-sm text-gray-700 bg-white/80 rounded-lg p-3 shadow-sm"
                                            >
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                                {feature}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Learning Outcomes */}
                                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
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
                                                transition={{ delay: idx * 0.05 + 0.2 }}
                                                className="flex items-start gap-2 text-sm text-gray-700 bg-white/80 rounded-lg p-3 shadow-sm"
                                            >
                                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                                {outcome}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {user ? (
                                    <motion.button
                                        whileHover={!savedProjects.has(index) ? { scale: 1.05 } : {}}
                                        whileTap={!savedProjects.has(index) ? { scale: 0.95 } : {}}
                                        onClick={() => saveProject(project, index)}
                                        disabled={savingProject === index || savedProjects.has(index)}
                                        className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                            savedProjects.has(index)
                                                ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-default'
                                                : savingProject === index
                                                ? 'bg-blue-400 text-white cursor-not-allowed opacity-75'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                                        }`}
                                    >
                                        {savingProject === index ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Saving Project...
                                            </>
                                        ) : savedProjects.has(index) ? (
                                            <>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </motion.div>
                                                Project Saved!
                                            </>
                                        ) : (
                                            <>
                                                <BookmarkPlus className="w-4 h-4" />
                                                Save Project
                                            </>
                                        )}
                                    </motion.button>
                                ) : (
                                    <div className="space-y-3">
                                        <SignInCard />
                                    </div>
                                )}
                            </div>
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