import { motion } from "framer-motion"

const FramerExample = () => {

    return(
        <>
            <h1 className="font-semibold text-4xl text-center m-4">Framer Motion Playground</h1>        
            <div className="p-8 flex justify-center max-w-[1200px] w-screen bg-red-100 mx-auto">
                <motion.button
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20}}
                    animate={{ opacity:1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                >
                    Click Me
                </motion.button>
            </div>
        </>
    )
}

export default FramerExample