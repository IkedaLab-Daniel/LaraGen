import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-[#ffffff00] shadow-md fixed w-full z-50 shadow-blue-100">
                <div className='flex items-center gap-4'>
                    <h1 className="text-xl font-bold">Logo</h1>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <ul className="flex gap-8 items-center h-[100%]">
                        <Link to="/">
                            <li className="hover:text-blue-500 transition-colors cursor-pointer">Home</li>
                        </Link>
                        <Link to="/contents">
                            <li className="hover:text-blue-500 transition-colors cursor-pointer">Contents</li>
                        </Link>
                        <Link to="/login">
                            <li className="hover:text-blue-500 transition-colors cursor-pointer">Log In</li>
                        </Link>
                        <Link to="/signup">
                            <li className="hover:text-blue-500 transition-colors cursor-pointer">Sign Up</li>
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
                            
                            <nav className="p-6">
                                <ul className="space-y-6">
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Link 
                                            to="/" 
                                            onClick={closeMenu}
                                            className="block text-lg hover:text-blue-500 transition-colors"
                                        >
                                            Home
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
                                            className="block text-lg hover:text-blue-500 transition-colors"
                                        >
                                            Contents
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
                                            className="block text-lg hover:text-blue-500 transition-colors"
                                        >
                                            Log In
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
                                            className="block text-lg hover:text-blue-500 transition-colors bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Sign Up
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