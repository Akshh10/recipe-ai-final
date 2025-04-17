
import React from 'react';
import { OnboardingStep } from '@/types/onboarding';

interface HowItWorksStepProps {
  step: OnboardingStep;
}

const HowItWorksStep = ({ step }: HowItWorksStepProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title}
        </h2>
        <p className="text-forest/80 mb-6">
          {step.description}
        </p>
      </div>

      <div className="w-full h-56 bg-cream/30 rounded-lg mb-12 p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="flex gap-2 mb-6">
            <span className="bg-terracotta/80 text-white px-3 py-1 rounded-full text-sm">Paneer</span>
            <span className="bg-terracotta/80 text-white px-3 py-1 rounded-full text-sm">Onion</span>
            <span className="bg-terracotta/80 text-white px-3 py-1 rounded-full text-sm">Capsicum</span>
          </div>
          
          <div className="w-full max-w-xs bg-white p-3 rounded-lg shadow-sm mb-3 flex">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="ml-3">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="w-full max-w-xs bg-white p-3 rounded-lg shadow-sm flex">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="ml-3">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorksStep;
