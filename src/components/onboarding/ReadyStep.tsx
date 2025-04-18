
import React from 'react';
import { OnboardingStep } from '@/types/onboarding';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ReadyStepProps {
  step: OnboardingStep;
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
}

const ReadyStep = ({ step, selectedPlan, onPlanSelect }: ReadyStepProps) => {
  // Updated pricing data
  const plans = [
    {
      name: "Free",
      price: "$0",
      interval: "forever",
      features: ["Basic recipe search", "1 meal option per ingredient", "Save up to 3 favorites"],
    },
    {
      name: "Weekly",
      price: "$1.69",
      interval: "week",
      recommended: true,
      discount: "20% off",
      features: ["Unlimited recipe search", "Unlimited favorites", "Detailed nutritional info", "Weekly meal planner"],
    },
    {
      name: "Quarterly",
      price: "$6.69",
      interval: "3 months",
      discount: "30% off",
      features: ["All Weekly plan features", "Ingredient substitutions", "No ads"],
    },
    {
      name: "Annual",
      price: "$19.99",
      interval: "year",
      discount: "40% off",
      features: ["All Quarterly features", "Priority customer support", "Early access to new features"],
    }
  ];

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title || 'Choose Your Plan'}
        </h2>
        <p className="text-terracotta font-medium text-lg mb-4">
          Subscribe to unlock delicious recipes tailored just for you!
        </p>
      </div>

      <ScrollArea className="w-full h-[400px] pr-4">
        <div className="w-full mb-6 space-y-3">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name || `plan-${index}`}
              className={`w-full p-4 rounded-lg border relative ${
                selectedPlan === plan.name 
                  ? "border-terracotta bg-terracotta/10" 
                  : "border-gray-200"
              } ${plan.recommended ? "border-2" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-terracotta text-white text-xs py-1 px-2 rounded">
                  Recommended
                </div>
              )}
              <div className="flex items-center" onClick={() => onPlanSelect(plan.name || '')}>
                <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                  {selectedPlan === plan.name && (
                    <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{plan.name || `Plan ${index + 1}`}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-lg font-bold">{plan.price || 'Free'}</span>
                    <span className="text-xs ml-1">/{plan.interval || 'month'}</span>
                    {plan.discount && (
                      <span className="ml-2 text-xs bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {plan.features && plan.features.length > 0 && (
                <div className="mt-3 pl-7">
                  <ul className="text-sm">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={`feature-${featureIdx}`} className="mb-1 flex items-center">
                        <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default ReadyStep;
