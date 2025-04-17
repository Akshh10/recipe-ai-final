
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
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-forest mb-4">
          {step.title}
        </h2>
        <p className="text-terracotta font-medium text-lg mb-4">
          Subscribe to unlock delicious recipes tailored just for you!
        </p>
      </div>

      <ScrollArea className="w-full h-[400px] pr-4">
        <div className="w-full mb-6 space-y-3">
          {/* Updated plan options with new pricing */}
          <motion.div 
            key="free-plan"
            className={`w-full p-4 rounded-lg border relative ${
              selectedPlan === "Free" 
                ? "border-terracotta bg-terracotta/10" 
                : "border-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center" onClick={() => onPlanSelect("Free")}>
              <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                {selectedPlan === "Free" && (
                  <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Free</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-lg font-bold">₹0</span>
                  <span className="text-xs ml-1">/forever</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pl-7">
              <ul className="text-sm">
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Basic recipe search
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  1 meal option per ingredient
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Save up to 3 favorites
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            key="weekly-plan"
            className={`w-full p-4 rounded-lg border-2 relative ${
              selectedPlan === "Weekly" 
                ? "border-terracotta bg-terracotta/10" 
                : "border-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-terracotta text-white text-xs py-1 px-2 rounded">
              Recommended
            </div>
            <div className="flex items-center" onClick={() => onPlanSelect("Weekly")}>
              <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                {selectedPlan === "Weekly" && (
                  <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Weekly</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-lg font-bold">₹169</span>
                  <span className="text-xs ml-1">/week</span>
                  <span className="ml-2 text-xs bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full">Save 20%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pl-7">
              <ul className="text-sm">
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Unlimited recipe search
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Unlimited favorites
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Detailed nutritional info
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Weekly meal planner
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            key="quarterly-plan"
            className={`w-full p-4 rounded-lg border relative ${
              selectedPlan === "Quarterly" 
                ? "border-terracotta bg-terracotta/10" 
                : "border-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center" onClick={() => onPlanSelect("Quarterly")}>
              <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                {selectedPlan === "Quarterly" && (
                  <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Quarterly</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-lg font-bold">₹449</span>
                  <span className="text-xs ml-1">/3 months</span>
                  <span className="ml-2 text-xs bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full">Save 30%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pl-7">
              <ul className="text-sm">
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  All Weekly plan features
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Ingredient substitutions
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  No ads
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            key="annual-plan"
            className={`w-full p-4 rounded-lg border relative ${
              selectedPlan === "Annual" 
                ? "border-terracotta bg-terracotta/10" 
                : "border-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center" onClick={() => onPlanSelect("Annual")}>
              <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                {selectedPlan === "Annual" && (
                  <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Annual</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-lg font-bold">₹1299</span>
                  <span className="text-xs ml-1">/year</span>
                  <span className="ml-2 text-xs bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full">Save 40%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pl-7">
              <ul className="text-sm">
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  All Quarterly features
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Priority customer support
                </li>
                <li className="mb-1 flex items-center">
                  <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                  Early access to new features
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </ScrollArea>
    </>
  );
};

export default ReadyStep;
