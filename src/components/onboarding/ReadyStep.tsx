
import React from 'react';
import { OnboardingStep } from '@/types/onboarding';

interface ReadyStepProps {
  step: OnboardingStep;
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
}

const ReadyStep = ({ step, selectedPlan, onPlanSelect }: ReadyStepProps) => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title}
        </h2>
        <p className="text-forest/80 mb-2">
          {step.description}
        </p>
      </div>

      <div className="w-full mb-6">
        {step.plans?.map((plan) => (
          <div 
            key={plan.name}
            className={`w-full p-4 mb-3 rounded-lg border relative ${
              selectedPlan === plan.name 
                ? "border-terracotta bg-terracotta/10" 
                : "border-gray-200"
            } ${plan.recommended ? "border-2" : ""}`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-terracotta text-white text-xs py-1 px-2 rounded">
                Recommended
              </div>
            )}
            <div className="flex items-center" onClick={() => onPlanSelect(plan.name)}>
              <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                {selectedPlan === plan.name && (
                  <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{plan.name}</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-lg font-bold">{plan.price}</span>
                  <span className="text-xs ml-1">/{plan.interval}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pl-7">
              <ul className="text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-1 flex items-center">
                    <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReadyStep;
