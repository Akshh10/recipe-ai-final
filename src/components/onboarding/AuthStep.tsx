
import React from 'react';
import { Motion, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Lock, Globe } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';

interface AuthStepProps {
  step: OnboardingStep;
  onShowAuth: (type: "login" | "signup") => void;
}

const AuthStep = ({ step, onShowAuth }: AuthStepProps) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-cream/50 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-terracotta" />
          </div>
        </div>
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title}
        </h2>
        <p className="text-forest/80 mb-6">
          {step.description}
        </p>
      </div>

      <div className="space-y-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6 border-2 border-terracotta/80 text-forest hover:bg-terracotta/10"
            onClick={() => onShowAuth("signup")}
          >
            <User className="h-4 w-4" />
            <span>Create Account</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => onShowAuth("login")}
          >
            <Lock className="h-4 w-4" />
            <span>Log In</span>
          </Button>
        </motion.div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">or continue with</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => onShowAuth("signup")}
          >
            <Phone className="h-4 w-4" />
            <span>Phone</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => onShowAuth("signup")}
          >
            <Globe className="h-4 w-4" />
            <span>Google</span>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default AuthStep;
