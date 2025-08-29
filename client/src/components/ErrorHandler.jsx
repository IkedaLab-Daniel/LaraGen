import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw, X, Wifi, WifiOff } from 'lucide-react';

const ErrorHandler = ({ error, onRetry, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
    }
  }, [error]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss && onDismiss(), 300);
  };

  const getErrorIcon = () => {
    if (error?.type === 'network') return WifiOff;
    if (error?.type === 'timeout') return RefreshCw;
    return AlertTriangle;
  };

  const getErrorMessage = () => {
    if (error?.type === 'network') {
      return {
        title: "Connection Issue",
        message: "Unable to reach the server. Please check your internet connection."
      };
    }
    if (error?.type === 'timeout') {
      return {
        title: "Request Timeout",
        message: "The request is taking longer than expected. Please try again."
      };
    }
    if (error?.type === 'validation') {
      return {
        title: "Invalid Input",
        message: error.message || "Please check your selections and try again."
      };
    }
    return {
      title: "Something went wrong",
      message: error?.message || "An unexpected error occurred. Please try again."
    };
  };

  const ErrorIcon = getErrorIcon();
  const { title, message } = getErrorMessage();

  return (
    <AnimatePresence>
      {isVisible && error && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            opacity: { duration: 0.2 }
          }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4"
        >
          <div className="bg-white/95 backdrop-blur-lg border border-red-100 rounded-2xl shadow-2xl shadow-red-500/10 overflow-hidden">
            {/* Error type indicator bar */}
            <div className="h-1 bg-gradient-to-r from-red-400 to-red-500" />
            
            <div className="p-6">
              {/* Header with icon and close button */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                      <ErrorIcon className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Error message */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {message}
              </p>

              {/* Action buttons */}
              <div className="flex items-center space-x-3">
                {onRetry && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onRetry}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDismiss}
                  className="px-4 py-2.5 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  Dismiss
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast-style error for less critical errors
const ErrorToast = ({ error, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss && onDismiss(), 300);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss && onDismiss(), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && error && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-6 right-6 z-50 max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-md border border-orange-200 rounded-xl shadow-xl shadow-orange-500/10 overflow-hidden">
            <div className="h-0.5 bg-gradient-to-r from-orange-400 to-orange-500" />
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium">
                    {error.message || "Something went wrong"}
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Demo component showing both error types
const ErrorHandlerDemo = () => {
  const [mainError, setMainError] = useState(null);
  const [toastError, setToastError] = useState(null);

  const triggerNetworkError = () => {
    setMainError({
      type: 'network',
      message: 'Failed to connect to the server.'
    });
  };

  const triggerValidationError = () => {
    setMainError({
      type: 'validation',
      message: 'Please select at least one technology and difficulty level.'
    });
  };

  const triggerToastError = () => {
    setToastError({
      message: 'Unable to save your preferences.'
    });
  };

  const handleRetry = () => {
    console.log('Retrying...');
    setMainError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Error Handler Demo
        </h1>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={triggerNetworkError}
            className="w-full px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Trigger Network Error
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={triggerValidationError}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors duration-200"
          >
            Trigger Validation Error
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={triggerToastError}
            className="w-full px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors duration-200"
          >
            Trigger Toast Error
          </motion.button>
        </div>
      </div>

      <ErrorHandler
        error={mainError}
        onRetry={handleRetry}
        onDismiss={() => setMainError(null)}
      />
      
      <ErrorToast
        error={toastError}
        onDismiss={() => setToastError(null)}
      />
    </div>
  );
};

export default ErrorHandlerDemo;
export { ErrorHandler, ErrorToast };