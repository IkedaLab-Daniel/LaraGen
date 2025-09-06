import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { SiReact, SiTailwindcss, SiFramer, SiLaravel, SiSupabase } from 'react-icons/si'
import ice from '../assets/ice.jpeg'

const Footer = () => {
  const [repoData, setRepoData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const REPO_OWNER = "IkedaLab-Daniel";
  const REPO_NAME = "LaraGen";

  // Fallback data for when API fails or is rate limited
  const fallbackData = {
    name: "LaraGen",
    description: "AI-powered tool to generate personalized project ideas based on your tech stack and skill level. Built with React, Laravel, and OpenAI.",
    language: "TypeScript",
    license: { name: "MIT License" },
    stargazers_count: 25,
    forks_count: 8,
    open_issues_count: 3,
    html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}`,
    updated_at: new Date().toISOString()
  };

  const fallbackCommits = [
    {
      sha: "fallback1",
      commit: {
        message: "Enhanced stats system with technology tracking",
        author: { date: new Date(Date.now() - 3600000).toISOString() }
      }
    },
    {
      sha: "fallback2", 
      commit: {
        message: "Added floating animations to home page",
        author: { date: new Date(Date.now() - 7200000).toISOString() }
      }
    },
    {
      sha: "fallback3",
      commit: {
        message: "Improved mobile responsiveness",
        author: { date: new Date(Date.now() - 10800000).toISOString() }
      }
    }
  ];

  const fallbackContributors = [
    {
      id: 1,
      login: "IkedaLab-Daniel",
      avatar_url: "/api/placeholder/32/32"
    }
  ];

  // project techs here
  const projectStack = [
    { id: "react", name: "React", icon: SiReact, color: "#61dafb" },
    { id: "tailwind", name: "Tailwind", icon: SiTailwindcss, color: "#38bdf8" },
    { id: "framer", name: "Framer", icon: SiFramer, color: "#0055ff" },
    { id: "laravel", name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
    { id: "supabase", name: "Supabase", icon: SiSupabase, color: "#3ecf8e" }
  ]

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setApiError(null);

        // Function to check response and handle rate limiting
        const handleResponse = async (response, dataType) => {
          if (!response.ok) {
            if (response.status === 403) {
              const rateLimitReset = response.headers.get('X-RateLimit-Reset');
              const resetTime = rateLimitReset ? new Date(rateLimitReset * 1000) : null;
              throw new Error(`GitHub API rate limit exceeded. ${resetTime ? `Resets at ${resetTime.toLocaleTimeString()}` : 'Try again later.'}`);
            } else if (response.status === 404) {
              throw new Error(`Repository not found (${dataType})`);
            } else {
              throw new Error(`Failed to fetch ${dataType}: ${response.status} ${response.statusText}`);
            }
          }
          return response.json();
        };

        // Fetch repository data with timeout
        const fetchWithTimeout = async (url, timeout = 5000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, { 
              signal: controller.signal,
              headers: {
                'Accept': 'application/vnd.github.v3+json'
              }
            });
            clearTimeout(timeoutId);
            return response;
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
              throw new Error('Request timeout - GitHub API is slow');
            }
            throw error;
          }
        };

        // Try to fetch all data with individual error handling
        const promises = [
          // Repository data
          fetchWithTimeout(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`)
            .then(response => handleResponse(response, 'repository'))
            .then(data => setRepoData(data))
            .catch(error => {
              console.warn('Repository data failed:', error.message);
              setRepoData(fallbackData);
            }),

          // Commits data
          fetchWithTimeout(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=3`)
            .then(response => handleResponse(response, 'commits'))
            .then(data => setCommits(Array.isArray(data) ? data : fallbackCommits))
            .catch(error => {
              console.warn('Commits data failed:', error.message);
              setCommits(fallbackCommits);
            }),

          // Contributors data
          fetchWithTimeout(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=5`)
            .then(response => handleResponse(response, 'contributors'))
            .then(data => setContributors(Array.isArray(data) ? data : fallbackContributors))
            .catch(error => {
              console.warn('Contributors data failed:', error.message);
              setContributors(fallbackContributors);
            })
        ];

        // Wait for all promises (they handle their own errors)
        await Promise.allSettled(promises);
        
      } catch (error) {
        console.error('GitHub API Error:', error);
        setApiError(error.message);
        // Set all fallback data
        setRepoData(fallbackData);
        setCommits(fallbackCommits);
        setContributors(fallbackContributors);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num?.toString() || '0';
  };

  // Show loading state or use fallback data if API fails
  const displayData = repoData || fallbackData;
  const displayCommits = commits.length > 0 ? commits : fallbackCommits;
  const displayContributors = contributors.length > 0 ? contributors : fallbackContributors;
  
  // Determine if we should show full data or minimal view
  const showMinimalView = apiError || (!repoData && !loading);

  return (
    <>
      <footer className="w-[95%] md:w-full mx-auto relative z-3 bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16 shadow-md rounded-md">
        {/* API Error Banner */}
        {apiError && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-4 mt-4 rounded"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>GitHub API Issue:</strong> {apiError} - Some data may be limited.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          {showMinimalView ? (
            /* Minimal View - Only Essential Elements */
            <div className="flex flex-col items-center space-y-6">
              {/* Repository Info - Minimal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex gap-1">
                    <motion.img 
                      src={ice}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900">LaraGen</h3>
                    <p className="text-sm text-gray-600">@Ikedalab-Daniel</p>
                  </div>
                </div>

                {/* project tech stack */}
                <motion.div 
                  className="flex gap-2 justify-center"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -2, 0] }}
                >
                  {projectStack.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={tech.id}
                        className="flex flex-col items-center gap-1"
                        initial={{ y: 0 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut",
                          delay: idx * 0.5
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: tech.color }} />
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* GitHub Link */}
                <motion.a
                  href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 4px 2px rgba(36,99,235,0.1)",
                      "0 0 16px 2px rgba(36,99,235,0.3)",
                      "0 0 4px 2px rgba(36,99,235,0.1)"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="inline-flex justify-center items-center px-6 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </motion.a>
              </motion.div>

              {/* Copyright - Minimal */}
              <div className="border-t border-gray-200 pt-6 w-full text-center">
                <span className="text-sm text-gray-600">© 2025 LaraGen</span>
              </div>
            </div>
          ) : (
            /* Full View - All Data Available */
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Repository Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex gap-1">
                      <motion.img 
                        src={ice}
                        className="w-10 h-10 rounded-lg"
                      />
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900">{displayData.name}</h3>
                      <p className="text-sm text-gray-600">@Ikedalab-Daniel</p>
                    </div>
                  </div>

                  {/* project tech stack */}
                  <motion.div 
                    className="flex gap-2"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -2, 0] }}
                  >
                    {projectStack.map((tech, idx) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={tech.id}
                          className="flex flex-col items-center gap-1"
                          initial={{ y: 0 }}
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                            delay: idx * 0.5
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: tech.color }} />
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {displayData.description}
                  </p>
                </motion.div>

                {/* Repository Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-gray-900">Repository Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Stars</span>
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {loading ? "..." : formatNumber(displayData.stargazers_count)}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Forks</span>
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {loading ? "..." : formatNumber(displayData.forks_count)}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Issues</span>
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {loading ? "..." : formatNumber(displayData.open_issues_count)}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Language</span>
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {loading ? "..." : (displayData.language || "N/A")}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Recent Activity & Contributors */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Recent Commits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      {loading ? (
                        [...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-start space-x-3 text-sm">
                            <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                              <div className="h-3 bg-gray-100 rounded animate-pulse w-20"></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        displayCommits.slice(0, 3).map((commit, index) => (
                          <div key={commit.sha} className="flex items-start space-x-3 text-sm">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                            }`}></div>
                            <div>
                              <p className="text-gray-800 line-clamp-2">
                                {commit.commit?.message?.split('\n')[0] || 'Updated repository'}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {formatTimeAgo(commit.commit?.author?.date)}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Top Contributors */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Top Contributors</h4>
                    <div className="flex -space-x-2">
                      {loading ? (
                        [...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white animate-pulse"
                          />
                        ))
                      ) : (
                        displayContributors.slice(0, 5).map((contributor, index) => (
                          <motion.img
                            key={contributor.id}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            title={contributor.login}
                            className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${contributor.login}&size=32&background=6366f1&color=fff`;
                            }}
                          />
                        ))
                      )}
                      {displayContributors.length > 5 && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                          +{displayContributors.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GitHub Link */}
                  <motion.a
                    href={displayData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 0 4px 2px rgba(36,99,235,0.1)",
                        "0 0 16px 2px rgba(36,99,235,0.3)",
                        "0 0 4px 2px rgba(36,99,235,0.1)"
                      ]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    className="w-full flex justify-center items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </motion.a>
                </motion.div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>© 2025 {displayData.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {/* Additional info can go here */}
                </div>
              </div>
            </>
          )}
        </div>
      </footer>
    </>
  )
}

export default Footer