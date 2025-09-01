import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, LogIn, UserPlus, User, LogOut, ChevronDown, UserCircle, FolderOpen } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../utilities/Toaster'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const currentLocation = useLocation().pathname
    const { user, logout } = useAuth()
    const toast = useToast()
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen)
    }

    const closeUserDropdown = () => {
        setIsUserDropdownOpen(false)
    }

    const handleLogout = () => {
        logout(toast.info)
        closeMenu()
        closeUserDropdown()
    }

    const checkCurrentLocationMatch = (location) => {
        return location === currentLocation;
    }

    return (
        <>
            <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md shadow-md fixed w-full z-[2] shadow-blue-100">
                <div className='flex items-center gap-4'>
                    <h1 className="text-xl font-bold">Logo</h1>
                </div>
                
                <div className="hidden md:block">
                    <ul className="flex gap-8 items-center h-[100%] text-slate-500">
                        <Link to="/">
                            <li className={`hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2 ${checkCurrentLocationMatch('/') ? 'text-blue-600 font-semibold' : ''}`}>
                                <Home className="w-5 h-5" /> Home
                            </li>
                        </Link>
                        <Link to="/contents">
                            <li className={`hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2 ${checkCurrentLocationMatch('/contents') ? 'text-blue-600 font-semibold' : ''}`}>
                                    <BookOpen className="w-5 h-5" /> Contents
                            </li>
                        </Link>
                        
                        {user ? (
                            // ? Authenticated user with dropdown
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleUserDropdown}
                                    className="hidden md:flex md:items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer rounded-lg hover:bg-blue-50"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{user.name}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                <AnimatePresence>
                                    {isUserDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20"
                                        >
                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    onClick={closeUserDropdown}
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <UserCircle className="w-4 h-4" />
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/projects"
                                                    onClick={closeUserDropdown}
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <FolderOpen className="w-4 h-4" />
                                                    My Projects
                                                </Link>
                                                <hr className="my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Log Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            // Non-authenticated user
                            <>
                                <Link to="/auth?mode=login">
                                    <li className={`hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2 ${checkCurrentLocationMatch('/auth') ? 'text-blue-600 font-semibold' : ''}`}>
                                        <LogIn className="w-5 h-5" /> Log In
                                    </li>
                                </Link>
                                <Link to="/auth?mode=signup">
                                    <li className={`hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2 ${checkCurrentLocationMatch('/auth') ? 'text-blue-600 font-semibold' : ''}`}>
                                        <UserPlus className="w-5 h-5" /> Sign Up
                                    </li>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>

                {/* Hamburger Button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        className="block w-6 h-0.5 bg-gray-800 mb-1"
                        animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 6 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="block w-6 h-0.5 bg-gray-800 mb-1"
                        animate={{
                            opacity: isOpen ? 0 : 1
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="block w-6 h-0.5 bg-gray-800"
                        animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? -6 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </button>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMenu}
                        />
                        
                        {/* Sidebar */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 md:hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-lg font-semibold">Menu</h2>
                                <button
                                    onClick={closeMenu}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <nav className="p-6 text-slate-500">
                                <ul className="space-y-6">
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Link 
                                            to="/" 
                                            onClick={closeMenu}
                                            className={`flex text-lg hover:text-blue-500 transition-colors items-center gap-2 ${checkCurrentLocationMatch('/') ? 'text-blue-600 font-semibold' : ''}`}
                                        >
                                            <Home className="w-5 h-5" /> Home
                                        </Link>
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <Link 
                                            to="/contents" 
                                            onClick={closeMenu}
                                            className={`flex text-lg hover:text-blue-500 transition-colors items-center gap-2 ${checkCurrentLocationMatch('/contents') ? 'text-blue-600 font-semibold' : ''}`}
                                        >
                                            <BookOpen className="w-5 h-5" /> Contents
                                        </Link>
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {user ? (
                                            // ? Hide user info on mobile, only show for non-authenticated users
                                            null
                                        ) : (
                                            <Link 
                                                to="/auth?mode=login" 
                                                onClick={closeMenu}
                                                className={`flex text-lg hover:text-blue-500 transition-colors items-center gap-2 ${checkCurrentLocationMatch('/auth') ? 'text-blue-600 font-semibold' : ''}`}
                                            >
                                                <LogIn className="w-5 h-5" /> Log In
                                            </Link>
                                        )}
                                    </motion.li>
                                    
                                    {/* Mobile Profile Link */}
                                    {user && (
                                        <motion.li
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.23 }}
                                        >
                                            <Link 
                                                to="/profile" 
                                                onClick={closeMenu}
                                                className="flex text-lg hover:text-blue-500 transition-colors items-center gap-2"
                                            >
                                                <UserCircle className="w-5 h-5" /> Profile
                                            </Link>
                                        </motion.li>
                                    )}
                                    
                                    {/* Mobile My Projects Link */}
                                    {user && (
                                        <motion.li
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.24 }}
                                        >
                                            <Link 
                                                to="/projects" 
                                                onClick={closeMenu}
                                                className="flex text-lg hover:text-blue-500 transition-colors items-center gap-2"
                                            >
                                                <FolderOpen className="w-5 h-5" /> My Projects
                                            </Link>
                                        </motion.li>
                                    )}
                                    
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        {user ? (
                                            <button
                                                onClick={handleLogout}
                                                className="flex text-lg text-red-600 hover:text-red-700 transition-colors items-center gap-2 w-full"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                Logout
                                            </button>
                                        ) : (
                                            <Link 
                                                to="/auth?mode=signup" 
                                                onClick={closeMenu}
                                                className={`flex text-lg hover:text-blue-500 transition-colors items-center gap-2 ${checkCurrentLocationMatch('/auth') ? 'text-blue-600 font-semibold' : ''}`}
                                            >
                                                <UserPlus className="w-5 h-5" /> Sign Up
                                            </Link>
                                        )}
                                    </motion.li>
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default NavBar