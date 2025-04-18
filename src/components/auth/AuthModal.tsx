import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Login from './Login';
import Signup from './Signup';
import PhoneVerification from './PhoneVerification';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'login' | 'signup' | 'phone' | 'google';
}

const AuthModal = ({ isOpen, onClose, initialView }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'signup' | 'phone' | 'google'>(initialView);

  const handleGoogleAuth = () => {
    // In a real app, this would trigger Google OAuth flow
    console.log("Google authentication triggered");
    onClose();
    return null; // Add this to fix the ReactNode error
  };

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Welcome Back!';
      case 'signup':
        return 'Create Account';
      case 'phone':
        return 'Phone Verification';
      case 'google':
        return 'Google Sign In';
      default:
        return 'Authentication';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-heading font-bold text-forest">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        {view === 'login' && (
          <Login
            onToggleView={() => setView('signup')} 
            onSuccess={onClose}
            onPhoneAuth={() => setView('phone')}
            onGoogleAuth={() => setView('google')}
          />
        )}
        
        {view === 'signup' && (
          <Signup 
            onToggleView={() => setView('login')} 
            onSuccess={onClose}
            onPhoneAuth={() => setView('phone')}
            onGoogleAuth={() => setView('google')}
          />
        )}
        
        {view === 'phone' && (
          <PhoneVerification 
            onSuccess={onClose} 
            onBack={() => setView(initialView === 'phone' ? 'signup' : initialView)}
          />
        )}
        
        {view === 'google' && handleGoogleAuth()}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
