import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';

const GenerateButton = ({ selectedTech = [], selectedDifficulty = '', onGenerate }) => {
    const [isLoading, setIsLoading] = useState(false);
  
    const isDisabled = selectedTech.length === 0 || !selectedDifficulty;

    const handleClick = async () => {
        if (isDisabled || isLoading) return;
    
        setIsLoading(true);
        try {
            if (onGenerate) {
                await onGenerate({
                    technologies: selectedTech,
                    difficulty: selectedDifficulty
                });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }   
    };

    return (
        <div className="w-full flex flex-col items-center space-y-4">
            <motion.button
                onClick={handleClick}
                disabled={isDisabled || isLoading}
                whileHover={!isDisabled ? { scale: 1.02 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                className={`
                    group relative w-full max-w-md px-8 py-4 rounded-xl font-medium text-lg
                    transition-all duration-300 ease-out
                    ${isDisabled 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    }
                `}
        >
            <div className="flex items-center justify-center space-x-3">
                {isLoading ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Loader2 className="w-5 h-5" />
                        </motion.div>
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate Ideas</span>
                        <motion.div
                            animate={!isDisabled ? { x: [0, 4, 0] } : {}}
                            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </>
                )}
            </div>

            {/* > Subtle hover effect */}
            {!isDisabled && (
            <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
            />
                )}
            </motion.button>

            {/* > Status indicator here */}
            <div className="text-center">
                {isDisabled ? (
                    <p className="text-sm text-gray-500">
                    {selectedTech.length === 0 && !selectedDifficulty 
                        ? 'Select technologies and difficulty level'
                        : selectedTech.length === 0 
                            ? 'Select at least one technology'
                            : 'Choose a difficulty level'
                    }
                    </p>
                ) : (
                    <p className="text-sm text-gray-600">
                        Ready with <span className="font-medium">{selectedTech.length}</span> technologies • <span className="font-medium capitalize">{selectedDifficulty}</span> level
                    </p>
                )}
            </div>
        </div>
    );
};

export default GenerateButton;
