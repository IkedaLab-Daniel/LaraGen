import { animate, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { createContext, useEffect } from "react";

const ToastContext = createContext();

// ? Toast configs
const TOAST_TYPES = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-50/90',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-600',
        hoverBG: 'hover:bg-green-100'
    }
}

const Toast = ({ toast, onClose }) => {
    const { id, message, type, position } = toast; // destructure data from parent
    const config = TOAST_TYPES[type] || TOAST_TYPES.info;
    const Icon = config.Icon

    // auto dismiss
    useEffect(()=>{
        if (duration > 0){
            const timer = setTimeout(() => onClose(id), duration)
            clearTimeout(timer)
            return
        }
    }, [id, duration, onClose]);

    // f motion variant
    const getAnimationVariants = () => {
        const baseVariants = {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 }
        }
        // > for toaster nofication on top, start animation below going up, vice versa for others
        if (position.include('top')){
            return {
                ...baseVariants,
                initial: { ...baseVariants.initial, y:-50 },
                animate: { ...baseVariants.animate, y:0 },
                exit: { ...baseVariants.exit, y:-50 }
            }
        } else {
            return {
                ...baseVariants,
                initial: { ...baseVariants.initial, y: 50 },
                animate: { ...baseVariants.animate, y: 0 },
                exit: { ...baseVariants.exit, y: 50 }
            }
        }
    };

    return (
        <motion.div
            layout
            variants={getAnimationVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border max-w-md w-full ${config.bgColor} ${config.borderColor} ${config.textColor}`}
        >
            <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
            <span className="font-medium flex-1 text-sm">{message}</span>
            <button
                onClick={() => onClose(id)}
                className={`ml-2 p-1 rounded-full transition-colors ${config.hoverBg} ${config.iconColor}`}
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    )
}

// > Toast container component
const ToastContainer = ({ toasts, removeToast, position = 'top-right' }) => {

    const getPositionClasses = () => {
        const positions = {
            'top-right': 'top-4 right-4',
            'top-left': 'top-4 left-4',
            'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
            'bottom-right': 'bottom-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
        }    
        return positions[position] || positions['top-right']
    }

    return (
        <div className={`fixed z-50 flex flex-col gap-2 ${getPositionClasses()}`}>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => {
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={removeToast}
                     />
                })}
            </AnimatePresence>
        </div>
    )
}