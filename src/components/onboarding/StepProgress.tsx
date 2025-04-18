
import React from 'react';
import { motion } from 'framer-motion';

interface StepProgressProps {
  steps: number;
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  // Make sure steps is defined and is a positive number
  const stepsCount = typeof steps === 'number' && steps > 0 ? steps : 1;
  // Ensure currentStep is in a valid range
  const validCurrentStep = typeof currentStep === 'number' && currentStep >= 0 ? 
    Math.min(currentStep, stepsCount - 1) : 0;
  
  return (
    <motion.div 
      className="flex gap-2 mb-8 justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Create an array with the correct length and map over it */}
      {Array.from({ length: stepsCount }).map((_, index) => (
        <motion.div
          key={index}
          className={`h-1.5 rounded-full ${
            index <= validCurrentStep ? "bg-terracotta" : "bg-gray-200"
          }`}
          initial={{ width: "0.5rem" }}
          animate={{ 
            width: index === validCurrentStep ? "2.5rem" : "1rem",
            opacity: index === validCurrentStep ? 1 : 0.7
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </motion.div>
  );
};

export default StepProgress;
