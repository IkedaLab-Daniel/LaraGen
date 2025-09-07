
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, User, Calendar, Code, Users, Sparkles, Zap, Palette,
    Globe, Database, Layers, Monitor, Settings, Cpu, Workflow, Target, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../utilities/Toaster';
import { TechIcon } from '../utilities/TechIcons';
import Footer from '../components/Footer';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // ? 'all', 'my'
    const [togglingAura, setTogglingAura] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useAuth();
    const toast = useToast();
    const observerRef = useRef(null);
    const loadingRef = useRef(null);

    const fetchProjects = async (page = 1, isLoadMore = false) => {
        try {
            if (!isLoadMore) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const endpoint = filter === 'my' && user ? '/my-projects' : '/projects';
            const headers = {};
            
            // Always send authorization header if user is logged in
            if (user) {
                const token = localStorage.getItem('token');
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
            }

            const url = new URL(`${import.meta.env.VITE_API_URL}${endpoint}`);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('per_page', '9');

            const response = await fetch(url.toString(), { headers });
            const data = await response.json();

            if (response.ok) {
                const newProjects = filter === 'my' ? data.data : data.data.data;
                const pagination = filter === 'my' ? data.meta : data.data;

                if (isLoadMore) {
                    setProjects(prevProjects => [...prevProjects, ...newProjects]);
                } else {
                    setProjects(newProjects);
                }

                // Check if there are more pages
                setHasMore(pagination.current_page < pagination.last_page);
                setCurrentPage(pagination.current_page);
                setError(null);
            } else {
                setError(data.message || 'Failed to fetch projects');
            }
        } catch (err) {
            setError('Network error while fetching projects');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreProjects = useCallback(() => {
        if (!loadingMore && hasMore) {
            fetchProjects(currentPage + 1, true);
        }
    }, [loadingMore, hasMore, currentPage, filter, user]);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !loadingMore) {
                    loadMoreProjects();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px', // Trigger 100px before reaching the bottom
            }
        );

        // ? Use a timeout to ensure the DOM is rendered
        const timeoutId = setTimeout(() => {
            if (loadingRef.current) {
                observer.observe(loadingRef.current);
            }
        }, 100);

        observerRef.current = observer;

        return () => {
            clearTimeout(timeoutId);
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMoreProjects, hasMore, loadingMore, projects.length]);

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
        // Reset pagination when filter changes
        setCurrentPage(1);
        setHasMore(true);
        setProjects([]);
        fetchProjects(1, false);
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

    const floatingVariants = {
        animate: {
            y: [-8, 12, -8],
            rotate: [0, -3, 0, 3, 0],
            transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatingVariantsAlt = {
        animate: {
            y: [10, -15, 10],
            rotate: [0, 5, 0, -5, 0],
            transition: {
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatingVariantsSlow = {
        animate: {
            y: [-6, 8, -6],
            rotate: [0, -2, 0, 2, 0],
            transition: {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
            }
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
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-6">
            {/* Floating Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-32 right-16 text-blue-300/40"
                >
                    <Star className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[350px] md:top-48 left-8 md:left-16 text-purple-300/40"
                >
                    <Code className="w-[45px] h-[45px] md:w-[80px] md:h-[80px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute bottom-32 md:bottom-48 right-8 md:right-24 text-indigo-300/40"
                >
                    <Globe className="w-[55px] h-[55px] md:w-[90px] md:h-[90px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsSlow}
                    animate="animate"
                    className="absolute bottom-[400px] md:bottom-72 left-12 md:left-32 text-cyan-300/40"
                >
                    <Database className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute top-[500px] md:top-96 right-[60px] md:right-48 text-pink-300/40"
                >
                    <Palette className="w-[50px] h-[50px] md:w-[85px] md:h-[85px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-16 left-[30px] md:left-[200px] text-yellow-300/40"
                >
                    <Zap className="w-[35px] h-[35px] md:w-[65px] md:h-[65px]" />
                </motion.div>
                
                {/* Additional floating elements */}
                <motion.div
                    variants={floatingVariantsSlow}
                    animate="animate"
                    className="absolute top-[200px] md:top-32 left-[50%] text-emerald-300/35"
                >
                    <Layers className="w-[38px] h-[38px] md:w-[75px] md:h-[75px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute top-[600px] md:top-[500px] left-[80px] md:left-[120px] text-orange-300/35"
                >
                    <Monitor className="w-[42px] h-[42px] md:w-[78px] md:h-[78px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-[200px] md:bottom-[300px] right-[120px] md:right-[300px] text-violet-300/35"
                >
                    <Settings className="w-[36px] h-[36px] md:w-[68px] md:h-[68px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsSlow}
                    animate="animate"
                    className="absolute top-[750px] md:top-[650px] right-[20px] md:right-[80px] text-teal-300/35"
                >
                    <Cpu className="w-[44px] h-[44px] md:w-[82px] md:h-[82px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariantsAlt}
                    animate="animate"
                    className="absolute bottom-[300px] md:bottom-[150px] left-[200px] md:left-[350px] text-rose-300/35"
                >
                    <Workflow className="w-[39px] h-[39px] md:w-[72px] md:h-[72px]" />
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[400px] md:top-[250px] right-[200px] md:right-[450px] text-amber-300/35"
                >
                    <Target className="w-[33px] h-[33px] md:w-[62px] md:h-[62px]" />
                </motion.div>
            </div>

            <div className="relative container mx-auto px-3 md:px-6 pt-12 ">
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
                                    className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    {/* Project Content - flex-grow to push footer down */}
                                    <div className="flex-grow">
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
                                                {project.tech_stack?.slice(0, 10).map((tech, index) => (
                                                    <TechIcon 
                                                        key={index} 
                                                        tech={tech} 
                                                        size="sm" 
                                                        showName={true}
                                                    />
                                                ))}
                                                {project.tech_stack?.length > 10 && (
                                                    <div className="px-2 py-1 bg-gray-100/80 backdrop-blur-sm text-gray-600 rounded-md text-xs font-medium border border-gray-200/50">
                                                        +{project.tech_stack.length - 10} more
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
                                    </div>

                                    {/* Aura Section - Always at bottom */}
                                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200 mt-auto">
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
                                                        : 'bg-gray-100 text-purple-600 hover:bg-purple-50 '
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

                    {/* Loading More Indicator */}
                    {loadingMore && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center py-8"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mr-3"
                            />
                            <span className="text-gray-600">Loading more projects...</span>
                        </motion.div>
                    )}

                    {/* End of Results Indicator */}
                    {!loading && !hasMore && projects.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8"
                        >
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <div className="h-px bg-gray-300 flex-1 max-w-32"></div>
                                <span className="text-sm">You've reached the end</span>
                                <div className="h-px bg-gray-300 flex-1 max-w-32"></div>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading trigger for intersection observer */}
                    <div ref={loadingRef} className="h-4"></div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Projects;