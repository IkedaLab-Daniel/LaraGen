import { motion } from "framer-motion"

const Difficulty = ({ selectedDifficulty, setSelectedDifficulty }) => {
  const difficulties = [
        { id: 'easy', label: 'Easy', desc: 'Perfect for beginners', color: 'bg-green-500' },
        { id: 'intermediate', label: 'Intermediate', desc: 'Ready for a challenge', color: 'bg-yellow-500' },
        { id: 'advanced', label: 'Advanced', desc: 'Expert level projects', color: 'bg-red-500' }
    ];

    return(
        <div className="space-y-6 max-w-6xl mx-auto mt-10 w-[95%] md:w-full">
              <h3 className="text-2xl font-bold text-gray-800 text-center">Select Difficulty</h3>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {difficulties.map((difficulty) => (
                    <motion.button
                      key={difficulty.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedDifficulty === difficulty.id
                          ? 'border-blue-400 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${difficulty.color} mr-4`}></div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800">{difficulty.label}</div>
                          <div className="text-sm text-gray-600">{difficulty.desc}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
    )
}

export default Difficulty