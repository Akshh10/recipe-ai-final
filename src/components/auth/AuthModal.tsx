
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Login from './Login';
import Signup from './Signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialView }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-heading font-bold text-forest">
            {view === 'login' ? 'Welcome Back!' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        {view === 'login' ? (
          <Login onToggleView={() => setView('signup')} onSuccess={onClose} />
        ) : (
          <Signup onToggleView={() => setView('login')} onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
