import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, LogIn, UserPlus } from 'lucide-react'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const currentLocation = useLocation().pathname

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const checkCurrentLocationMatch = (location) => {
        return location === currentLocation;
    }

    return (
        <>
            <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md shadow-md fixed w-full z-[2] shadow-blue-100">
                <div className='flex items-center gap-4'>
                    <h1 className="text-xl font-bold">Logo</h1>
                    <span>{currentLocation}</span>
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
                        <Link to="/login">
                            <li className={`hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2 ${checkCurrentLocationMatch('/login') ? 'text-blue-600 font-semibold' : ''}`}>
                                <LogIn className="w-5 h-5" /> Log In
                            </li>
                        </Link>
                        <Link to="/signup">
                            <li className={`hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2 ${checkCurrentLocationMatch('/signup') ? 'text-blue-600 font-semibold' : ''}`}>
                                <UserPlus className="w-5 h-5" /> Sign Up
                            </li>
                        </Link>
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
                                            className="flex text-lg hover:text-blue-500 transition-colors items-center gap-2"
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
                                            className="flex text-lg hover:text-blue-500 transition-colors items-center gap-2"
                                        >
                                            <BookOpen className="w-5 h-5" /> Contents
                                        </Link>
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Link 
                                            to="/login" 
                                            onClick={closeMenu}
                                            className="flex text-lg hover:text-blue-500 transition-colors items-center gap-2"
                                        >
                                            <LogIn className="w-5 h-5" /> Log In
                                        </Link>
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <Link 
                                            to="/signup" 
                                            onClick={closeMenu}
                                            className="flex text-lg hover:text-blue-500 transition-colors items-center gap-2"
                                        >
                                            <UserPlus className="w-5 h-5" /> Sign Up
                                        </Link>
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