
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, User, Heart, Calendar, Code, Eye, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../utilities/Toaster';
import { TechIcon } from '../utilities/TechIcons';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'my'
    const [togglingAura, setTogglingAura] = useState(new Set());
    const { user } = useAuth();
    const toast = useToast();

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const endpoint = filter === 'my' && user ? '/my-projects' : '/projects';
            const headers = {};
            
            if (filter === 'my' && user) {
                const token = localStorage.getItem('token');
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                headers
            });

            const data = await response.json();

            if (response.ok) {
                setProjects(filter === 'my' ? data.data : data.data.data);
                setError(null);
            } else {
                setError(data.message || 'Failed to fetch projects');
            }
        } catch (err) {
            setError('Network error while fetching projects');
        } finally {
            setLoading(false);
        }
    };

    const toggleAura = async (projectId) => {
        if (!user) {
            toast.error('Please sign in to give aura');
            return;
        }

        if (togglingAura.has(projectId)) {
            return; // Prevent double clicks
        }

        setTogglingAura(prev => new Set(prev).add(projectId));

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/aura`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Update the project in the list
                setProjects(prevProjects => 
                    prevProjects.map(project => 
                        project.id === projectId 
                            ? { 
                                ...project, 
                                aura_count: data.data.aura_count, 
                                has_aura: data.data.has_aura 
                              }
                            : project
                    )
                );
                
                if (data.data.has_aura) {
                    toast.success('Aura given! ✨');
                } else {
                    toast.info('Aura removed');
                }
            } else {
                toast.error(data.message || 'Failed to toggle aura');
            }
        } catch (error) {
            toast.error('Network error while toggling aura');
        } finally {
            setTogglingAura(prev => {
                const newSet = new Set(prev);
                newSet.delete(projectId);
                return newSet;
            });
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [filter, user]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
                        />
                        <span className="ml-3 text-gray-600">Loading projects...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
            <div className="container mx-auto px-6 py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Project Gallery
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover amazing projects from our community or manage your own saved projects.
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    filter === 'all'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                <Users className="w-4 h-4 inline mr-2" />
                                All Projects
                            </button>
                            {user && (
                                <button
                                    onClick={() => setFilter('my')}
                                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        filter === 'my'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-gray-600 hover:text-blue-600'
                                    }`}
                                >
                                    <User className="w-4 h-4 inline mr-2" />
                                    My Projects
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Error State */}
                    {error && (
                        <motion.div
                            variants={itemVariants}
                            className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Projects Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    layout
                                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-300 group"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    {/* Project Header */}
                                    <div className="mb-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors max-w-[70%]">
                                                {project.name}
                                            </h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                project.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                                project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {project.difficulty === 'beginner' ? 'EASY' : project.difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                        
                                        {project.user && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                <User className="w-3 h-3" />
                                                <span>by {project.user.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{project.estimated_time}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <Code className="w-4 h-4" />
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_stack?.slice(0, 4).map((tech, index) => (
                                                <TechIcon 
                                                    key={index} 
                                                    tech={tech} 
                                                    size="sm" 
                                                    showName={true}
                                                />
                                            ))}
                                            {project.tech_stack?.length > 4 && (
                                                <div className="px-2 py-1 bg-gray-100/80 backdrop-blur-sm text-gray-600 rounded-md text-xs font-medium border border-gray-200/50">
                                                    +{project.tech_stack.length - 4} more
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features Preview */}
                                    <div className="space-y-2 mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                            <Star className="w-4 h-4" />
                                            Key Features
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.features?.slice(0, 3).map((feature, index) => (
                                                <div key={index} className="px-2 py-1 bg-green-50/80 backdrop-blur-sm text-green-700 rounded-md text-xs font-medium border border-green-200/50">
                                                    {feature}
                                                </div>
                                            ))}
                                            {project.features?.length > 3 && (
                                                <div className="px-2 py-1 bg-gray-100/80 backdrop-blur-sm text-gray-600 rounded-md text-xs font-medium border border-gray-200/50">
                                                    +{project.features.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Aura Section */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm font-medium text-gray-600">
                                                {project.aura_count || 0} Aura
                                            </span>
                                        </div>
                                        
                                        {user ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleAura(project.id)}
                                                disabled={togglingAura.has(project.id)}
                                                className={`px-3 w-[50%] py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                                                    project.has_aura
                                                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            >
                                                {togglingAura.has(project.id) ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-3 h-3 border border-current border-t-transparent rounded-full"
                                                    />
                                                ) : (
                                                    <Sparkles className={`w-3 h-3 ${project.has_aura ? 'fill-current' : ''}`} />
                                                )}
                                                {project.has_aura ? 'Aura Given' : 'Give Aura'}
                                            </motion.button>
                                        ) : (
                                            <span className="text-xs text-gray-400">Sign in to give aura</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {!loading && projects.length === 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="text-center py-12"
                        >
                            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                {filter === 'my' ? 'No saved projects yet' : 'No projects found'}
                            </h3>
                            <p className="text-gray-500">
                                {filter === 'my' 
                                    ? 'Start generating projects and save your favorites!' 
                                    : 'Be the first to share a project with the community!'
                                }
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;