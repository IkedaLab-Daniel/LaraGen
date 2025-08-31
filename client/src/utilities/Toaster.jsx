import { motion, AnimatePresence} from "framer-motion";
import { AlertTriangle, CheckCircle, CircleAlert, Info, X } from "lucide-react";
import { createContext, useEffect, useState, useContext } from "react";

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
    },
    error: {
        icon: CircleAlert,
        bgColor: 'bg-red-50/90',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        iconColor: 'text-red-600',
        hoverBg: 'hover:bg-red-100'
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50/90',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-600',
        hoverBg: 'hover:bg-yellow-100'
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-50/90',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-600',
        hoverBg: 'hover:bg-blue-100'
    }
}

const Toast = ({ toast, onClose }) => {
    const { id, message, type, position } = toast; // destructure data from parent
    const config = TOAST_TYPES[type] || TOAST_TYPES.info;
    const Icon = config.icon

    // auto dismiss
    useEffect(()=>{
        if (toast.duration > 0){
            const timer = setTimeout(() => onClose(id), toast.duration)
            return () => clearTimeout(timer);
        }
    }, [id, toast.duration, onClose]);

    // f motion variant
    const getAnimationVariants = () => {
        const baseVariants = {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 }
        }
        // > for toaster nofication on top, start animation below going up, vice versa for others
    if (position.includes('top')){
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
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={removeToast}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}

// toast provider component
export const ToastProvider = ({
    children,
    position = "top-right",
    defaultDuration = 4000, 
    maxToast = 5
}) => {
    const [toasts, setToasts] = useState([])

    //  > add new toast
    const addToast = (message, type = "info", options = {}) => {
    const id = Date.now() + Math.random();
        const toast = {
            id,
            message,
            type,
            duration: options.duration ?? defaultDuration,
            position,
            ...options
        };

        setToasts((prev) => {
            const newToast = [...prev, toast];
            // ! limit toasts
            return newToast.slice(-maxToast)
        });

        return id;
    }

    // > Remove toast function
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    // > Clear all toasts
    const removeAllToasts = () => {
        setToasts([]);
    };

    // Helper functions for different toast types
    const toast = {
        success: (message, options) => addToast(message, 'success', options),
        error: (message, options) => addToast(message, 'error', options),
        warning: (message, options) => addToast(message, 'warning', options),
        info: (message, options) => addToast(message, 'info', options),
        remove: removeToast,
        removeAll: removeAllToasts
    };

    const value = {
        toasts,
        toast,
        addToast,
        removeToast,
        removeAllToasts
    };

    return (
        <ToastContext.Provider value={value}>
        {children}
        <ToastContainer
            toasts={toasts}
            removeToast={removeToast}
            position={position}
        />
        </ToastContext.Provider>
    );
}

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};

// Export individual components for advanced usage
export { Toast, ToastContainer };