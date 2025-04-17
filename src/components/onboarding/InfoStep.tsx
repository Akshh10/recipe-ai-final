
import React from 'react';
import { ChefHat } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';

interface InfoStepProps {
  step: OnboardingStep;
}

const InfoStep = ({ step }: InfoStepProps) => {
  return (
    <>
      <div className="mb-8 bg-cream/50 p-6 rounded-full">
        <ChefHat className="h-12 w-12 text-terracotta" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title}
        </h2>
        <p className="text-forest/80">
          {step.description}
        </p>
      </div>

      {step.image && (
        <div className="w-full h-56 bg-gray-100 rounded-lg mb-12 overflow-hidden flex items-center justify-center">
          <img 
            src={step.image} 
            alt={step.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </>
  );
};

export default InfoStep;
