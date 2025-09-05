import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../utilities/Toaster';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const handleCallback = () => {
            const success = searchParams.get('success');
            const error = searchParams.get('error');
            const token = searchParams.get('token');
            const userBase64 = searchParams.get('user');
            const errorMessage = searchParams.get('message');

            if (success === 'true' && token && userBase64) {
                try {
                    // Decode user data
                    const userData = JSON.parse(atob(userBase64));
                    
                    // Login user
                    login(userData, token);
                    
                    // Show success message
                    toast.success(`Welcome back, ${userData.name}! Successfully signed in with GitHub.`, {
                        duration: 4000
                    });
                    
                    // Redirect to home after a short delay
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 2000);
                } catch (err) {
                    console.error('Error parsing callback data:', err);
                    toast.error('Authentication data error. Please try again.');
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 2000);
                }
            } else if (error === 'true') {
                // Handle error
                toast.error(errorMessage || 'GitHub authentication failed. Please try again.');
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 3000);
            } else {
                // Invalid callback
                toast.error('Invalid authentication callback.');
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 2000);
            }
        };

        handleCallback();
    }, [searchParams, navigate, login, toast]);

    const success = searchParams.get('success') === 'true';
    const error = searchParams.get('error') === 'true';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50 text-center max-w-md w-full mx-4"
            >
                {success && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-4">You've been authenticated successfully. Redirecting...</p>
                    </>
                )}

                {error && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
                        >
                            <XCircle className="w-8 h-8 text-red-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
                        <p className="text-gray-600 mb-4">
                            {searchParams.get('message') || 'Something went wrong. Please try again.'}
                        </p>
                    </>
                )}

                {!success && !error && (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center"
                        >
                            <Loader2 className="w-8 h-8 text-blue-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h2>
                        <p className="text-gray-600 mb-4">Please wait while we complete your authentication.</p>
                    </>
                )}

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                />
            </motion.div>
        </div>
    );
};

export default AuthCallback;
