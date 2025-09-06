import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Rocket, Heart, TrendingUp, Calendar } from "lucide-react";
const Hero = () => {
    const [serverStatus, setServerStatus] = useState("pending"); // 'pending', 'up', 'down'
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const checkServer = async () => {
            setServerStatus("pending");
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/api/options`);
                if (res.ok) {
                    setServerStatus("up");
                } else {
                    setServerStatus("down");
                }
            } catch {
                setServerStatus("down");
            }
        };
        checkServer();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const statItems = [
        {
            icon: Rocket,
            value: stats?.total_projects || 0,
            label: "Projects Generated",
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            icon: Users,
            value: stats?.total_users || 0,
            label: "Developers",
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        },
        {
            icon: Heart,
            value: stats?.total_auras || 0,
            label: "Total Auras",
            color: "text-red-500",
            bgColor: "bg-red-50"
        },
        {
            icon: Calendar,
            value: stats?.projects_this_week || 0,
            label: "This Week",
            color: "text-green-500",
            bgColor: "bg-green-50"
        }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return(
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center pt-[140px] md:pt-[140px] h-auto"
        >
            {/* Badge */}
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`inline-flex items-center px-4 py-2 mb-5 md:mb-8 bg-white/70 backdrop-blur-sm border rounded-full shadow-lg ${serverStatus === 'up' ? 'border-blue-200' : serverStatus === 'down' ? 'border-red-300' : 'border-yellow-200'}`}
            >
                <Zap className={`w-4 h-4 mr-2 ${serverStatus === 'up' ? 'text-blue-500' : serverStatus === 'down' ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className="text-sm font-medium">
                    {serverStatus === 'pending' && 'Checking server status...'}
                    {serverStatus === 'up' && 'Server Running'}
                    {serverStatus === 'down' && 'Server Down'}
                </span>
            </motion.div>
            {/* main headline */}
            <motion.div variants={itemVariants} className="text-center">
                <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    Generate {' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Perfect
                    </span>
                    <br/>
                    Project Ideas
                </h1>

                <p className="text-md md:text-2xl text-gray-600 mb-8 max-w-[80vw] md:max-w-3xl mx-auto leading-relaxe lg:max-w-4xl">
                    Choose your tech stack and difficulty level. Our AI will generate personalized project ideas that match your skills and help you grow as a developer.
                </p>
            </motion.div>

            {/* Stats Section */}
            {!statsLoading && stats && (
                <motion.div variants={itemVariants} className="w-auto max-w-5xl mx-auto mb-8">
                    {/* Inline Stats Bar */}
                    <div className="rounded-2xl p-6 md:p-8">
                        <div className="md:flex md:flex-wrap md:justify-center md:items-center gap-x-4 gap-y-10 md:gap-12 grid grid-cols-2">
                            {statItems.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-gray-900">
                                            {formatNumber(stat.value)}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-600 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Popular Technologies */}
                        {stats.top_technologies && stats.top_technologies.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-white/30">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-4 font-medium">Most Popular Technologies</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {stats.top_technologies.slice(0, 5).map((tech, index) => (
                                            <motion.span 
                                                key={tech.name}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                className="relative px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 text-blue-700 text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200 cursor-default"
                                            >
                                                {tech.name}
                                                <span className="ml-2 text-xs opacity-70">({tech.count})</span>
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Hero