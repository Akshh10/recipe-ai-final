
import React from 'react';
import { ChefHat } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';
import { motion } from 'framer-motion';

interface InfoStepProps {
  step: OnboardingStep;
}

const InfoStep = ({ step }: InfoStepProps) => {
  if (!step) {
    return null;
  }
  
  return (
    <>
      <div className="relative mb-12">
        <motion.div 
          className="bg-cream/50 p-6 rounded-full relative z-10 flex items-center justify-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChefHat className="h-12 w-12 text-terracotta" />
        </motion.div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-medium text-terracotta text-xl">Culinary Magic</p>
          <p className="text-forest/80 text-sm mt-1">Where Every Ingredient Tells a Story</p>
        </motion.div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title || 'Welcome'}
        </h2>
        <p className="text-forest/80">
          {step.description || 'Getting started with cooking made easy'}
        </p>
      </div>

      <motion.div 
        className="w-full h-64 rounded-lg mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img 
          src="/lovable-uploads/9206668c-8621-49b8-8f74-ee00efce0300.png"
          alt="Delicious gourmet dish"
          className="object-cover w-full h-full"
        />
      </motion.div>
    </>
  );
};

export default InfoStep;
