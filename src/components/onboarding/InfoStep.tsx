
import React from 'react';
import { ChefHat } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';
import { motion } from 'framer-motion';

interface InfoStepProps {
  step: OnboardingStep;
}

const InfoStep = ({ step }: InfoStepProps) => {
  return (
    <>
      <div className="relative mb-8">
        <motion.div 
          className="bg-cream/50 p-6 rounded-full relative z-10 flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChefHat className="h-12 w-12 text-terracotta" />
        </motion.div>
        <motion.p 
          className="absolute -bottom-4 text-center w-full font-medium text-terracotta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Taste the Magic
        </motion.p>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title}
        </h2>
        <p className="text-forest/80">
          {step.description}
        </p>
      </div>

      <motion.div 
        className="w-full h-64 rounded-lg mb-8 overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Delicious Indian food"
          className="object-cover w-full h-full"
        />
      </motion.div>
    </>
  );
};

export default InfoStep;
