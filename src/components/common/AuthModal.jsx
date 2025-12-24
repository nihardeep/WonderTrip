import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, LogIn } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 p-1 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 text-center">
                    {/* Icon/Illustration */}
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserPlus className="w-8 h-8 text-purple-600" />
                    </div>

                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                        Join the Adventure
                    </h3>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Please create a profile or sign in to your account to create your own unique AI trip.
                    </p>

                    <div className="space-y-3">
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full justify-center bg-purple-600 hover:bg-purple-700 text-white"
                            size="lg"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Sign In
                        </Button>

                        <Button
                            onClick={() => navigate('/signup')}
                            variant="outline"
                            className="w-full justify-center border-2"
                            size="lg"
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Create Account
                        </Button>
                    </div>

                    <p className="mt-6 text-xs text-gray-400">
                        Join our community of creators and travelers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
